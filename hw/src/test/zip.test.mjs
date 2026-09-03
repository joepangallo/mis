// zip.test.mjs — the deterministic pure-Node zip writer/reader.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, writeFileSync, rmSync, existsSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { randomBytes } from 'node:crypto';
import { crc32 } from 'node:zlib';
import { createZip, listZip, readZipEntry, normaliseEntryName, FIXED_DOS_DATE, FIXED_DOS_TIME } from '../zip.mjs';

const UNZIP = '/usr/bin/unzip';
const entries = () => [
  { name: 'Week 1/b.txt', data: 'hello\n'.repeat(100) },
  { name: 'Week 1/a.bin', data: randomBytesFixed(4096) },
  { name: 'Week 1/chapter-01/data/x.csv', data: Buffer.from('a,b\n1,2\n') },
  { name: 'empty.txt', data: '' },
];
// deterministic "random" (incompressible) bytes so two test runs make the same zip
function randomBytesFixed(n) { let x = 12345; const b = Buffer.alloc(n); for (let i = 0; i < n; i++) { x = (x * 1103515245 + 12345) & 0x7fffffff; b[i] = x >> 16; } return b; }

test('createZip is byte-deterministic and sorts entries', () => {
  const a = createZip(entries());
  const b = createZip([...entries()].reverse());
  assert.ok(a.equals(b));
  assert.deepEqual(listZip(a).map((e) => e.name), ['Week 1/a.bin', 'Week 1/b.txt', 'Week 1/chapter-01/data/x.csv', 'empty.txt']);
  assert.equal(FIXED_DOS_TIME, 0);
  assert.equal(FIXED_DOS_DATE, ((2026 - 1980) << 9) | (1 << 5) | 1);
});

test('entries round-trip through readZipEntry with matching CRCs; incompressible data is stored', () => {
  const zip = createZip(entries());
  const list = listZip(zip);
  for (const e of entries()) {
    const data = Buffer.isBuffer(e.data) ? e.data : Buffer.from(e.data);
    const back = readZipEntry(zip, normaliseEntryName(e.name));
    assert.ok(back.equals(data), e.name);
    const meta = list.find((x) => x.name === normaliseEntryName(e.name));
    assert.equal(meta.crc, crc32(data) >>> 0);
    assert.equal(meta.size, data.length);
  }
  assert.equal(list.find((x) => x.name === 'Week 1/a.bin').method, 0, 'stored');
  assert.equal(list.find((x) => x.name === 'Week 1/b.txt').method, 8, 'deflated');
  assert.throws(() => readZipEntry(zip, 'nope'), /no entry/);
});

test('rejects duplicate names, absolute/relative escapes and empty names', () => {
  assert.throws(() => createZip([{ name: 'a', data: '1' }, { name: 'a', data: '2' }]), /duplicate/);
  assert.throws(() => createZip([{ name: '../x', data: '1' }]), /bad entry name/);
  assert.throws(() => createZip([{ name: 'a/./b', data: '1' }]), /bad entry name/);
  assert.throws(() => createZip([{ name: '', data: '1' }]), /bad entry name/);
  assert.equal(normaliseEntryName('/Week 1\\x.txt'), 'Week 1/x.txt');
});

test('a corrupted payload fails the CRC check on read', () => {
  const zip = Buffer.from(createZip([{ name: 'a.txt', data: 'x'.repeat(200) }]));
  const meta = listZip(zip)[0];
  const nlen = zip.readUInt16LE(meta.offset + 26);
  zip[meta.offset + 30 + nlen + 2] ^= 0xff;
  assert.throws(() => readZipEntry(zip, 'a.txt'), /CRC mismatch|invalid|unexpected/i);
});

test('unzip -l lists the entries and unzip -t reports no errors', { skip: !existsSync(UNZIP) }, () => {
  const dir = mkdtempSync(join(tmpdir(), 'hw-zip-'));
  try {
    const p = join(dir, 't.zip');
    writeFileSync(p, createZip(entries()));
    const listing = execFileSync(UNZIP, ['-l', p]).toString();
    for (const e of entries()) assert.ok(listing.includes(normaliseEntryName(e.name)), e.name);
    assert.match(listing, /01-01-2026 00:00/, 'fixed DOS timestamp');
    const t = execFileSync(UNZIP, ['-t', p]).toString();
    assert.match(t, /No errors detected/);
  } finally { rmSync(dir, { recursive: true, force: true }); }
});
