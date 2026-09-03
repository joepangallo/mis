// zip.mjs — deterministic pure-Node zip writer/reader (no dependencies).
// Entries are sorted by name, stamped with one fixed DOS date/time, deflated with a fixed level, and
// written without data descriptors, so the same inputs always produce the same bytes.
import { deflateRawSync, inflateRawSync, crc32 } from 'node:zlib';

// 2026-01-01 00:00:00 in MS-DOS packed form (the year is >= 1980, so the field is valid).
export const FIXED_DOS_DATE = ((2026 - 1980) << 9) | (1 << 5) | 1;
export const FIXED_DOS_TIME = 0;
const UNIX_FILE_ATTRS = (0o100644 << 16) >>> 0; // -rw-r--r-- when a unix unzip restores permissions

function u16(n) { const b = Buffer.alloc(2); b.writeUInt16LE(n, 0); return b; }
function u32(n) { const b = Buffer.alloc(4); b.writeUInt32LE(n >>> 0, 0); return b; }

export function normaliseEntryName(name) {
  const n = String(name).replace(/\\/g, '/').replace(/^\/+/, '');
  if (!n || n.split('/').some((seg) => seg === '' || seg === '.' || seg === '..')) throw new Error(`zip: bad entry name "${name}"`);
  return n;
}

// entries: [{ name, data: Buffer | Uint8Array | string }] → Buffer
export function createZip(entries) {
  const list = entries.map((e) => ({ name: normaliseEntryName(e.name), data: Buffer.isBuffer(e.data) ? e.data : Buffer.from(e.data) }));
  const seen = new Set();
  for (const e of list) { if (seen.has(e.name)) throw new Error(`zip: duplicate entry ${e.name}`); seen.add(e.name); }
  list.sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0));

  const locals = [];
  const centrals = [];
  let offset = 0;
  for (const e of list) {
    const nameBuf = Buffer.from(e.name, 'utf8');
    const crc = crc32(e.data) >>> 0;
    let method = 8;
    let payload = deflateRawSync(e.data, { level: 9 });
    if (payload.length >= e.data.length) { method = 0; payload = e.data; }
    const flags = 0x0800; // UTF-8 names
    const local = Buffer.concat([
      u32(0x04034b50), u16(20), u16(flags), u16(method), u16(FIXED_DOS_TIME), u16(FIXED_DOS_DATE),
      u32(crc), u32(payload.length), u32(e.data.length), u16(nameBuf.length), u16(0), nameBuf, payload,
    ]);
    const central = Buffer.concat([
      u32(0x02014b50), u16(0x031e), u16(20), u16(flags), u16(method), u16(FIXED_DOS_TIME), u16(FIXED_DOS_DATE),
      u32(crc), u32(payload.length), u32(e.data.length), u16(nameBuf.length), u16(0), u16(0), u16(0), u16(0),
      u32(UNIX_FILE_ATTRS), u32(offset), nameBuf,
    ]);
    locals.push(local);
    centrals.push(central);
    offset += local.length;
  }
  const cd = Buffer.concat(centrals);
  const eocd = Buffer.concat([u32(0x06054b50), u16(0), u16(0), u16(list.length), u16(list.length), u32(cd.length), u32(offset), u16(0)]);
  return Buffer.concat([...locals, cd, eocd]);
}

// Read the central directory back: [{ name, size, compressedSize, crc, method, offset }]
export function listZip(buf) {
  const b = Buffer.isBuffer(buf) ? buf : Buffer.from(buf);
  let eocd = -1;
  for (let i = b.length - 22; i >= Math.max(0, b.length - 22 - 65535); i--) { if (b.readUInt32LE(i) === 0x06054b50) { eocd = i; break; } }
  if (eocd < 0) throw new Error('zip: no end-of-central-directory record');
  const count = b.readUInt16LE(eocd + 10);
  let p = b.readUInt32LE(eocd + 16);
  const out = [];
  for (let i = 0; i < count; i++) {
    if (b.readUInt32LE(p) !== 0x02014b50) throw new Error('zip: bad central directory entry');
    const method = b.readUInt16LE(p + 10);
    const crc = b.readUInt32LE(p + 16);
    const compressedSize = b.readUInt32LE(p + 20);
    const size = b.readUInt32LE(p + 24);
    const nlen = b.readUInt16LE(p + 28);
    const xlen = b.readUInt16LE(p + 30);
    const clen = b.readUInt16LE(p + 32);
    const offset = b.readUInt32LE(p + 42);
    const name = b.toString('utf8', p + 46, p + 46 + nlen);
    out.push({ name, size, compressedSize, crc, method, offset });
    p += 46 + nlen + xlen + clen;
  }
  return out;
}

// Extract one entry's bytes (used by tests and check.mjs to compare CRCs and contents).
export function readZipEntry(buf, name) {
  const b = Buffer.isBuffer(buf) ? buf : Buffer.from(buf);
  const entry = listZip(b).find((e) => e.name === name);
  if (!entry) throw new Error(`zip: no entry ${name}`);
  const p = entry.offset;
  if (b.readUInt32LE(p) !== 0x04034b50) throw new Error('zip: bad local header');
  const nlen = b.readUInt16LE(p + 26);
  const xlen = b.readUInt16LE(p + 28);
  const start = p + 30 + nlen + xlen;
  const payload = b.subarray(start, start + entry.compressedSize);
  const data = entry.method === 8 ? inflateRawSync(payload) : Buffer.from(payload);
  if ((crc32(data) >>> 0) !== entry.crc) throw new Error(`zip: CRC mismatch for ${name}`);
  return data;
}
