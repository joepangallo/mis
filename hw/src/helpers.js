/* helpers.js — pure helpers shared by runtime.js (inlined into every student page)
   and by `node --test` (import '../helpers.js' then read globalThis.HWHelpers).
   No DOM, no Date.now() except where a caller passes a timestamp in, no HTML strings.
   Loaded as a plain script (IIFE); also sets module.exports when running under Node/CJS. */
(function (root, factory) {
  'use strict';
  var api = factory();
  root.HWHelpers = api;
  if (typeof module === 'object' && module && module.exports) module.exports = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  // ---- constants (the only place these numbers live) -------------------------------------
  var ROW_CAP = 500;                   // rows rendered per result table
  var CELL_CAP = 2000;                 // characters rendered per cell before an ellipsis
  var STORED_ROW_CAP = 200;            // rows kept per result in localStorage and in the export
  var BROWSE_ROWS = 50;                // rows shown by the Database panel's Browse
  var TRANSCRIPT_CAP = 200 * 1024;     // characters kept in the terminal transcript
  var OUTPUT_CAP = 200 * 1024;         // characters kept per stored stdout/stderr/error text (python + terminal records)
  var DROPPED_MARKER = '… (earlier output dropped)\n';
  var DB_MAX_BYTES = 8 * 1024 * 1024;  // open-and-check rule: larger files are refused
  var DB_AUTOSAVE_MAX_B64 = 2 * 1024 * 1024; // a db whose base64 is longer than this is not auto-saved
  var TEXT_SAVE_DEBOUNCE_MS = 250;
  var PYTHON_ROOT = '/home/pyodide/week1';
  var CHANGE_KEYWORDS = { INSERT: true, UPDATE: true, DELETE: true, REPLACE: true };
  var EXPORT_NAMES = { 1: 'ch1-queries.md', 2: 'ch2-database.md', 3: 'ch3-queries.md' };

  var PIP_MESSAGE = 'pip is not available in the browser version. Everything this assignment needs (sqlite3, csv) is already installed. To import an .xlsx file, use a locally installed Python 3.';
  var HELP_TEXT = [
    'Commands: python <script> [args...]   run a Python script (also: python3, py)',
    '          ls [folder]                  list files',
    '          cat <file>                   show a text file',
    '          pwd                          show the working folder',
    '          clear                        empty this transcript',
    '          help                         this list'
  ].join('\n');
  var HELP_ONE_LINE = 'Try: python <script> [args...], ls, cat <file>, pwd, clear, help';
  var INPUT_ERROR = 'input() is not available on this page. Put the value directly in your code instead.';
  var JOURNAL_WARNING = 'Warning: a database connection was left open with unsaved changes; close it with conn.close(). The database file was not updated from this run.';
  var COMMIT_NOTE = 'Your script left a transaction open; it was committed so the changes are saved.';
  var NOTHING_TO_RUN = 'Write the SQL first.';
  var SAVE_FAILED = 'Could not save in this browser — Export my work before closing.';
  // The file:// localStorage bucket is one ~5 M-char store shared by every local page: when even a one-character
  // probe write fails, the page's own record is not the problem and the "too large" texts would blame the wrong thing.
  var STORAGE_FULL = 'This browser’s local storage is full (it is shared by every local web page you have opened). Export my work and Download your database now; Clear my work on pages you have finished to free space.';
  // What the page says when the main record no longer fits: level 1 dropped the Python/Terminal outputs, level 2 every output.
  var SAVE_FALLBACK = {
    1: 'The Python and Terminal outputs are too big to keep — your text and SQL results still save. Press Clear under the Python cell, or type clear in the Terminal, to fix this.',
    2: 'The results are too big to keep — your text still saves. Press Clear on the largest result box to fix this.'
  };

  // ---- small utilities ----------------------------------------------------------------
  function basename(path) { var s = String(path || ''); var i = s.lastIndexOf('/'); return i < 0 ? s : s.slice(i + 1); }
  function dirname(path) { var s = String(path || ''); var i = s.lastIndexOf('/'); return i < 0 ? '' : s.slice(0, i); }
  function slug(name) {
    var s = String(name == null ? '' : name).trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
    return s || 'student';
  }
  // Download names: keep the student's file name (campus_travel.db must stay campus_travel.db — slug() would
  // break the hand-in) but strip path separators, Windows-forbidden characters and control characters.
  function safeFileName(name, fallback) {
    var s = String(name == null ? '' : name).replace(/[\\/:*?"<>|]/g, '_').replace(/[\u0000-\u001f\u007f]/g, '').replace(/^\.+/, '').trim();
    return s || fallback || 'database.db';
  }
  function humanBytes(n) {
    n = Number(n) || 0;
    if (n < 1024) return n + ' B';
    if (n < 1024 * 1024) return (n / 1024).toFixed(n < 10240 ? 1 : 0) + ' KB';
    return (n / (1024 * 1024)).toFixed(1) + ' MB';
  }
  function plural(n, one, many) { return n === 1 ? one : (many || one + 's'); }
  function pad2(n) { return (n < 10 ? '0' : '') + n; }
  function splitLines(text) { return String(text == null ? '' : text).split(/\r\n|\r|\n/); }
  function bytesEqual(a, b) {
    if (a === b) return true;
    if (!a || !b || a.length !== b.length) return false;
    for (var i = 0; i < a.length; i++) if (a[i] !== b[i]) return false;
    return true;
  }
  function isUint8(x) { return x instanceof Uint8Array; }

  // ---- shlex-style tokenizer ------------------------------------------------------------
  // 'it''s' and "a \"b\"" are honoured; a backslash outside quotes escapes the next character;
  // an unterminated quote runs to the end of the line (lenient, like a student would expect).
  function tokenize(line) {
    var tokens = [], cur = '', has = false, i = 0, s = String(line == null ? '' : line), q = null;
    while (i < s.length) {
      var ch = s[i];
      if (q === "'") { if (ch === "'") { q = null; } else { cur += ch; } i++; continue; }
      if (q === '"') {
        if (ch === '\\' && i + 1 < s.length && (s[i + 1] === '"' || s[i + 1] === '\\')) { cur += s[i + 1]; i += 2; continue; }
        if (ch === '"') { q = null; } else { cur += ch; } i++; continue;
      }
      if (ch === "'" || ch === '"') { q = ch; has = true; i++; continue; }
      if (ch === '\\' && i + 1 < s.length) { cur += s[i + 1]; has = true; i += 2; continue; }
      if (ch === ' ' || ch === '\t' || ch === '\n' || ch === '\r') { if (has) { tokens.push(cur); cur = ''; has = false; } i++; continue; }
      cur += ch; has = true; i++;
    }
    if (has) tokens.push(cur);
    return tokens;
  }

  // ---- terminal command classification ---------------------------------------------------
  function parseCommand(line) {
    var tokens = tokenize(line);
    if (!tokens.length) return { kind: 'empty', tokens: tokens };
    var cmd = tokens[0];
    if (cmd === 'python' || cmd === 'python3' || cmd === 'py') {
      if (tokens.length === 1) return { kind: 'python-usage', tokens: tokens };
      if (tokens[1] === '-m' && (tokens[2] === 'pip' || tokens[2] === 'pip3')) return { kind: 'pip', tokens: tokens };
      if (tokens[1].charAt(0) === '-') return { kind: 'python-flag', tokens: tokens, flag: tokens[1] };
      return { kind: 'python', tokens: tokens, script: tokens[1], argv: tokens.slice(1) };
    }
    if (cmd === 'pip' || cmd === 'pip3') return { kind: 'pip', tokens: tokens };
    if (cmd === 'ls' || cmd === 'dir') return { kind: 'ls', tokens: tokens, path: tokens[1] || '.' };
    if (cmd === 'cat' || cmd === 'type') return tokens[1] ? { kind: 'cat', tokens: tokens, path: tokens[1] } : { kind: 'cat-usage', tokens: tokens };
    if (cmd === 'pwd') return { kind: 'pwd', tokens: tokens };
    if (cmd === 'help') return { kind: 'help', tokens: tokens };
    if (cmd === 'clear' || cmd === 'cls') return { kind: 'clear', tokens: tokens };
    return { kind: 'unknown', tokens: tokens, name: cmd };
  }
  function commandNotFound(name) { return 'command not found: ' + name + '\n' + HELP_ONE_LINE; }
  // Two terminal lines mean the same command when their tokens agree; for python runs the interpreter alias
  // (python / python3 / py) and the spacing/quoting are ignored, so `python3 load_data.py …` still counts as step 1.
  function sameCommand(a, b) {
    var pa = parseCommand(a), pb = parseCommand(b);
    if (pa.kind === 'empty' || pb.kind === 'empty') return false;
    if (pa.kind === 'python' && pb.kind === 'python') return JSON.stringify(pa.argv) === JSON.stringify(pb.argv);
    return JSON.stringify(pa.tokens) === JSON.stringify(pb.tokens);
  }
  // Whitespace-normalised Python source (CRLF → LF, trailing spaces and blank lines dropped; indentation kept).
  function normaliseSource(code) {
    return String(code == null ? '' : code).replace(/\r\n?/g, '\n').split('\n')
      .map(function (l) { return l.replace(/\s+$/, ''); }).filter(function (l) { return l.trim() !== ''; }).join('\n');
  }
  function sameSource(a, b) { return normaliseSource(a) === normaliseSource(b); }

  // Resolve a terminal path against the virtual Week 1 root. Returns null when it escapes the root.
  function resolveVirtualPath(path) {
    var p = String(path == null ? '.' : path).replace(/\\/g, '/');
    if (p.indexOf(PYTHON_ROOT) === 0) p = p.slice(PYTHON_ROOT.length);
    if (p.charAt(0) === '/') p = p.slice(1);
    var parts = p.split('/'), out = [];
    for (var i = 0; i < parts.length; i++) {
      var seg = parts[i];
      if (seg === '' || seg === '.') continue;
      if (seg === '..') { if (!out.length) return null; out.pop(); continue; }
      out.push(seg);
    }
    return out.join('/');
  }

  // ---- SQL text helpers -----------------------------------------------------------------
  function stripLeadingComments(sql) {
    var s = String(sql == null ? '' : sql), i = 0;
    for (;;) {
      var m = /^\s+/.exec(s.slice(i)); if (m) i += m[0].length;
      if (s.startsWith('--', i)) { var nl = s.indexOf('\n', i); if (nl < 0) return ''; i = nl + 1; continue; }
      if (s.startsWith('/*', i)) { var end = s.indexOf('*/', i + 2); if (end < 0) return ''; i = end + 2; continue; }
      return s.slice(i);
    }
  }
  function firstKeyword(sql) {
    var m = /^([A-Za-z_][A-Za-z0-9_]*)/.exec(stripLeadingComments(sql));
    return m ? m[1].toUpperCase() : '';
  }
  function isChangeKeyword(kw) { return Object.prototype.hasOwnProperty.call(CHANGE_KEYWORDS, String(kw || '').toUpperCase()); }
  function unquoteIdent(raw) {
    if (!raw) return '';
    var c = raw.charAt(0);
    if (c === '"') return raw.slice(1, -1).replace(/""/g, '"');
    if (c === '`') return raw.slice(1, -1).replace(/``/g, '`');
    if (c === '[') return raw.slice(1, -1);
    return raw;
  }
  var IDENT = '("(?:[^"]|"")+"|`(?:[^`]|``)+`|\\[[^\\]]+\\]|[A-Za-z_][A-Za-z0-9_$]*)';
  var DROP_RE = new RegExp('^DROP\\s+TABLE\\s+(?:IF\\s+EXISTS\\s+)?(?:' + IDENT + '\\s*\\.\\s*)?' + IDENT, 'i');
  // 'DROP TABLE IF EXISTS main."flights"' → 'flights'; anything else → null
  function dropTableTarget(sql) {
    var m = DROP_RE.exec(stripLeadingComments(sql));
    return m ? unquoteIdent(m[2]) : null;
  }
  function quoteIdent(name) { return '"' + String(name).replace(/"/g, '""') + '"'; }
  function isSqliteHeader(bytes) {
    if (!bytes) return false;
    if (bytes.length === 0) return true;
    if (bytes.length < 100) return false;
    var magic = 'SQLite format 3';
    for (var i = 0; i < magic.length; i++) if (bytes[i] !== magic.charCodeAt(i)) return false;
    return bytes[15] === 0;
  }
  // The statement-number rule: a prepare-time error is thrown from the iterator's next() BEFORE
  // the body runs (statement `started + 1` failed); a step-time error is thrown inside the body
  // (statement `started` failed).
  function failingStatementNumber(started, insideBody) { return insideBody ? started : started + 1; }
  function errorHeadline(k, message) {
    var applied = k <= 1 ? 'No earlier statements were applied' : (k === 2 ? 'Statement 1 was applied' : 'Statements 1–' + (k - 1) + ' were applied');
    return 'Statement ' + k + ' failed: ' + message + '. ' + applied + '; the rest was not run:';
  }
  function changedMessage(n) { return 'OK · ' + n + ' ' + plural(n, 'row', 'rows') + ' changed'; }
  function droppedMessage(name, n) { return 'Dropped ' + name + ' (' + n + ' ' + plural(n, 'row', 'rows') + ')'; }
  function resultHeading(k, total) { return 'Result ' + k + ' · ' + total + ' ' + plural(total, 'row', 'rows'); }
  function showingFirst(total, cap) { return 'showing first ' + cap + ' of ' + total; }

  // ---- cell formatting -------------------------------------------------------------------
  function formatCell(value) {
    if (value === null || value === undefined) return null;
    if (isUint8(value)) return '⟨blob ' + value.length + ' bytes⟩';
    return prim(value);
  }
  function truncateCell(text, cap) {
    cap = cap || CELL_CAP;
    var s = prim(text);
    return s.length > cap ? s.slice(0, cap) + '…' : s;
  }

  // ---- base64 (chunked so 300 KB+ files round-trip without call-stack limits) ---------------
  function bytesToBase64(bytes) {
    var out = '', chunk = 0x8000;
    for (var i = 0; i < bytes.length; i += chunk) out += String.fromCharCode.apply(null, bytes.subarray(i, Math.min(i + chunk, bytes.length)));
    if (typeof btoa === 'function') return btoa(out);
    return Buffer.from(out, 'binary').toString('base64');
  }
  function base64ToBytes(b64) {
    var bin = typeof atob === 'function' ? atob(b64) : Buffer.from(b64, 'base64').toString('binary');
    var u = new Uint8Array(bin.length);
    for (var i = 0; i < bin.length; i++) u[i] = bin.charCodeAt(i);
    return u;
  }

  // ---- transcript -------------------------------------------------------------------------
  // Keep the TAIL of an oversize text (the end of a run is what the student needs to read), with a head marker.
  function capText(text, cap) {
    cap = cap || OUTPUT_CAP;
    var s = prim(text);
    if (s.length <= cap) return s;
    return DROPPED_MARKER + s.slice(s.length - Math.max(0, cap - DROPPED_MARKER.length));
  }
  function stringList(list) { return Array.isArray(list) ? list.map(prim) : []; }
  function entrySize(e) { return prim(e.cmd).length + prim(e.stdout).length + prim(e.stderr).length + stringList(e.notes).join('').length + 24; }
  function exitLine(code) {
    if (code === null || code === undefined) return null;
    if (typeof code === 'string') return code;
    if (typeof code === 'number') return code === 0 ? null : 'exit status ' + code;
    if (typeof code === 'boolean') return code ? 'exit status 1' : null;
    return prim(code) || null;
  }
  // Drop the oldest entries until the transcript fits; a single oversize entry loses its head.
  function capTranscript(entries, cap) {
    cap = cap || TRANSCRIPT_CAP;
    var list = entries.slice(), total = 0, i;
    for (i = 0; i < list.length; i++) total += entrySize(list[i]);
    while (list.length > 1 && total > cap) total -= entrySize(list.shift());
    if (list.length === 1 && total > cap) {
      var e = Object.assign({}, list[0]);
      var over = total - cap;
      e.stdout = DROPPED_MARKER + prim(e.stdout).slice(over + DROPPED_MARKER.length);
      list[0] = e;
    }
    return list;
  }
  // The transcript as text: command, stdout, stderr, exit line, then the page's file-sync notes (same text as
  // before the notes moved out of stderr on screen, so the export is unchanged).
  function transcriptText(entries) {
    var lines = [];
    for (var i = 0; i < entries.length; i++) {
      var e = entries[i];
      lines.push('$ ' + prim(e.cmd));
      if (e.stdout) lines.push(prim(e.stdout).replace(/\n$/, ''));
      if (e.stderr) lines.push(prim(e.stderr).replace(/\n$/, ''));
      var x = exitLine(e.exit); if (x) lines.push(x);
      var notes = stringList(e.notes);
      for (var n = 0; n < notes.length; n++) lines.push(notes[n]);
    }
    return lines.join('\n');
  }

  // ---- python tracebacks ------------------------------------------------------------------
  // frames: [[filename, lineno, name, line], ...] as produced by the page's Python prelude
  function filterFrames(frames) {
    var out = [];
    for (var i = 0; i < (frames || []).length; i++) {
      var f = frames[i], fn = Array.isArray(f) ? prim(f[0]) : '';
      if (!Array.isArray(f)) continue;
      if (fn.indexOf('/lib/') === 0 || (fn.charAt(0) === '<' && fn !== '<cell>')) continue;
      out.push(f);
    }
    return out;
  }
  function formatTraceback(errorText, frames) {
    var kept = filterFrames(frames), lines = [];
    if (kept.length) {
      lines.push('Traceback (most recent call last):');
      for (var i = 0; i < kept.length; i++) {
        var f = kept[i];
        lines.push('  File "' + prim(f[0]) + '", line ' + safeInt(f[1]) + ', in ' + (prim(f[2]) || '<module>'));
        if (f[3]) lines.push('    ' + prim(f[3]).trim());
      }
    }
    lines.push(prim(errorText) || 'Error');
    return lines.join('\n');
  }

  // ---- timestamps -------------------------------------------------------------------------
  function formatTimestamp(iso) {
    var d = new Date(typeof iso === 'string' || typeof iso === 'number' ? iso : NaN);
    if (isNaN(d.getTime())) return 'earlier';
    var day = d.toLocaleDateString(undefined, { weekday: 'short' });
    var time = d.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' });
    return day + ' ' + time;
  }
  function formatDateTime(iso) {
    var d = new Date(typeof iso === 'string' || typeof iso === 'number' ? iso : NaN);
    if (isNaN(d.getTime())) return prim(iso);
    return d.getFullYear() + '-' + pad2(d.getMonth() + 1) + '-' + pad2(d.getDate()) + ' ' + pad2(d.getHours()) + ':' + pad2(d.getMinutes());
  }
  function restoredCaption(iso) { return 'Result from ' + formatTimestamp(iso) + ' — Run again to refresh'; }

  // ---- persistence codec --------------------------------------------------------------------
  function storageKeys(chapter) {
    var main = 'hw-week1-chapter-' + chapter + '-v1';
    // probe: a one-character write that is removed again immediately, used only to tell "the whole bucket is
    // full" (every local page shares it) from "this page's own record is too big". It never persists.
    return { main: main, db: main + ':db', probe: main + ':probe' };
  }
  function emptyState() { return { v: 1, name: '', texts: {}, python: null, transcript: [], outputs: {}, selectedDb: null }; }
  function isPlainObject(x) { return !!x && typeof x === 'object' && !Array.isArray(x); }
  // Every value read back from localStorage goes through prim(): a string is itself, a number/boolean/bigint is
  // stringified, anything else — including an object whose toString is not callable ({"toString":1}), on which
  // String()/Number() THROW — becomes ''. The codec must never throw on a value another local page wrote.
  function prim(x) {
    if (typeof x === 'string') return x;
    if (x === null || x === undefined) return '';
    if (typeof x === 'number' || typeof x === 'boolean' || typeof x === 'bigint') return String(x);
    return '';
  }
  function safeInt(x) {
    if (typeof x !== 'number' && typeof x !== 'string' && typeof x !== 'boolean') return 0;
    var n = Number(x); return isFinite(n) ? Math.trunc(n) : 0;
  }
  // Result items → a strictly shaped copy, or null when anything is not the array/object it must be. A record
  // that comes back from localStorage (a bucket every local page shares) must never be able to throw in a renderer.
  function cloneResultItems(items, rowCap) {
    if (!Array.isArray(items)) return null;
    var out = [];
    for (var i = 0; i < items.length; i++) {
      var it = items[i];
      if (!isPlainObject(it)) return null;
      if (it.type === 'result') {
        if (!Array.isArray(it.columns) || !Array.isArray(it.rows)) return null;
        var rows = [];
        var src = it.rows.slice(0, rowCap);
        for (var r = 0; r < src.length; r++) {
          if (!Array.isArray(src[r])) return null;
          rows.push(src[r].map(function (v) { var f = formatCell(v); return f === null ? null : truncateCell(f, CELL_CAP); }));
        }
        out.push({ type: 'result', k: safeInt(it.k), columns: it.columns.map(prim), total: safeInt(it.total), rows: rows });
      } else if (it.type === 'message') {
        out.push({ type: 'message', level: typeof it.level === 'string' ? it.level : 'ok', text: prim(it.text) });
      } else {
        return null;
      }
    }
    return out;
  }
  function storableExit(x) { return typeof x === 'number' || typeof x === 'string' ? x : null; }
  function storableFrames(frames) {
    if (frames == null) return [];
    if (!Array.isArray(frames)) return null;
    var out = [];
    for (var i = 0; i < frames.length; i++) {
      var f = frames[i];
      if (!Array.isArray(f)) return null;
      out.push([prim(f[0]), safeInt(f[1]), prim(f[2]), prim(f[3])]);
    }
    return out;
  }
  // Make a record safe to persist and safe to render: rows capped, texts capped, strings only, arrays where
  // arrays are expected — anything malformed yields null (encode/decode drop it).
  function storableRecord(rec) {
    if (!isPlainObject(rec)) return null;
    var ts = prim(rec.ts) || null;
    if (rec.kind === 'sql') {
      var items = cloneResultItems(rec.items == null ? [] : rec.items, STORED_ROW_CAP);
      if (items === null) return null;
      if (rec.error != null && !isPlainObject(rec.error)) return null;
      if (rec.notes != null && !Array.isArray(rec.notes)) return null;
      return { kind: 'sql', ts: ts, source: prim(rec.source), statements: safeInt(rec.statements), items: items,
        error: rec.error ? { statement: safeInt(rec.error.statement), message: capText(rec.error.message, OUTPUT_CAP), remaining: capText(rec.error.remaining, OUTPUT_CAP) } : null,
        notes: stringList(rec.notes) };
    }
    if (rec.kind === 'terminal') {
      if (rec.notes != null && !Array.isArray(rec.notes)) return null;
      return { kind: 'terminal', ts: ts, cmd: prim(rec.cmd), stdout: capText(rec.stdout, OUTPUT_CAP), stderr: capText(rec.stderr, OUTPUT_CAP), exit: storableExit(rec.exit), notes: stringList(rec.notes) };
    }
    if (rec.kind === 'python') {
      if (rec.error != null && !isPlainObject(rec.error)) return null;
      if (rec.notes != null && !Array.isArray(rec.notes)) return null;
      var frames = rec.error ? storableFrames(rec.error.frames) : [];
      if (frames === null) return null;
      return { kind: 'python', ts: ts, source: prim(rec.source), stdout: capText(rec.stdout, OUTPUT_CAP), stderr: capText(rec.stderr, OUTPUT_CAP),
        error: rec.error ? { text: capText(rec.error.text, OUTPUT_CAP), frames: frames } : null,
        notes: stringList(rec.notes) };
    }
    return null;
  }
  // A transcript entry whose cmd is not a string was never written by this page: dropped (null).
  function storableEntry(e) {
    if (!isPlainObject(e) || typeof e.cmd !== 'string') return null;
    return { cmd: e.cmd, stdout: prim(e.stdout), stderr: prim(e.stderr), exit: storableExit(e.exit), ts: typeof e.ts === 'string' ? e.ts : null, notes: stringList(e.notes) };
  }
  // storableRecord / storableEntry inside a try/catch: one poisoned value costs its own record, never the restore.
  function safeRecord(rec) { try { return storableRecord(rec); } catch (e) { return null; } }
  function safeEntry(e) { try { return storableEntry(e); } catch (err) { return null; } }
  var POISON_KEY = '__proto__';
  function encodeState(state) {
    var s = emptyState();
    s.name = prim(state.name);
    s.python = state.python == null ? null : prim(state.python);
    s.selectedDb = state.selectedDb == null ? null : prim(state.selectedDb);
    var k;
    for (k in state.texts || {}) if (Object.prototype.hasOwnProperty.call(state.texts, k) && k !== POISON_KEY) s.texts[k] = prim(state.texts[k]);
    for (k in state.outputs || {}) if (Object.prototype.hasOwnProperty.call(state.outputs, k) && k !== POISON_KEY) { var r = safeRecord(state.outputs[k]); if (r) s.outputs[k] = r; }
    s.transcript = capTranscript((Array.isArray(state.transcript) ? state.transcript : []).map(safeEntry).filter(Boolean), TRANSCRIPT_CAP);
    return JSON.stringify(s);
  }
  function decodeState(json) {
    var s = emptyState();
    if (!json) return s;
    var raw;
    try { raw = JSON.parse(json); } catch (e) { return s; }
    if (!isPlainObject(raw)) return s;
    s.name = typeof raw.name === 'string' ? raw.name : '';
    s.python = typeof raw.python === 'string' ? raw.python : null;
    s.selectedDb = typeof raw.selectedDb === 'string' ? raw.selectedDb : null;
    var k;
    // name and texts first (the student's own words), then every output on its own — a record another local page
    // damaged is dropped alone (safeRecord), so a poisoned value can never empty the boxes above it
    if (isPlainObject(raw.texts)) for (k in raw.texts) if (k !== POISON_KEY && typeof raw.texts[k] === 'string') s.texts[k] = raw.texts[k];
    if (isPlainObject(raw.outputs)) for (k in raw.outputs) { if (k === POISON_KEY) continue; var r = safeRecord(raw.outputs[k]); if (r && r.ts) s.outputs[k] = r; }
    if (Array.isArray(raw.transcript)) s.transcript = raw.transcript.map(safeEntry).filter(Boolean);
    return s;
  }
  // A smaller copy of the state for when the main key no longer fits: level 1 drops every Python/Terminal
  // record (the big free-text outputs), level 2 drops every output. Returns { state, dropped: [keys] }.
  function slimState(state, level) {
    var out = Object.assign({}, state, { outputs: {} }), dropped = [];
    for (var k in state.outputs || {}) {
      if (!Object.prototype.hasOwnProperty.call(state.outputs, k)) continue;
      var rec = state.outputs[k];
      var drop = level >= 2 || !rec || rec.kind === 'python' || rec.kind === 'terminal';
      if (drop) dropped.push(k); else out.outputs[k] = rec;
    }
    return { state: out, dropped: dropped };
  }
  function saveFallbackStatus(level) { return SAVE_FALLBACK[level] || SAVE_FAILED; }
  // Which status a failed write earns: when the bucket itself is full (a one-character probe write failed too) the
  // honest message is STORAGE_FULL; the "too big" / fallback texts are for a record that really exceeds the caps.
  function chooseSaveStatus(bucketFull, level) { return bucketFull ? STORAGE_FULL : saveFallbackStatus(level); }
  function chooseDbSaveStatus(bucketFull, bytes, kept) { return bucketFull ? STORAGE_FULL : tooLargeToSave(bytes, kept); }
  // entries: [[path, Uint8Array], ...] → JSON of {path: base64}. A db whose base64 exceeds maxB64 is skipped, but
  // when prevJson (the value currently saved) holds that path, its earlier copy is carried over unchanged so the
  // last good save is never deleted. Returns {json, skipped:[{path, bytes}], kept:[paths carried over]}.
  function encodeDbStore(entries, maxB64, prevJson) {
    maxB64 = maxB64 || DB_AUTOSAVE_MAX_B64;
    var obj = {}, skipped = [], kept = [];
    var prev = {};
    if (prevJson) { try { var p = JSON.parse(prevJson); if (isPlainObject(p)) prev = p; } catch (e) { prev = {}; } }
    for (var i = 0; i < entries.length; i++) {
      var path = entries[i][0], bytes = entries[i][1];
      if (!bytes || !bytes.length) continue;
      var b64 = bytesToBase64(bytes);
      if (b64.length > maxB64) {
        skipped.push({ path: path, bytes: bytes.length });
        if (typeof prev[path] === 'string' && prev[path].length) { obj[path] = prev[path]; kept.push(path); }
        continue;
      }
      obj[path] = b64;
    }
    return { json: JSON.stringify(obj), skipped: skipped, kept: kept };
  }
  // A store path is any relative path the Python file system can hold (spaces and unicode included — a student's
  // Python may create "my db.db"); refused: absolute paths, "..", backslashes and control characters.
  function isStorePath(path) {
    var p = String(path);
    if (!p || p.length > 500 || p.charAt(0) === '/' || /[\\\u0000-\u001f\u007f]/.test(p)) return false;
    var parts = p.split('/');
    for (var i = 0; i < parts.length; i++) if (parts[i] === '' || parts[i] === '.' || parts[i] === '..') return false;
    return true;
  }
  // decodeDbStore → [[path, bytes], …]; the array also carries `.dropped` (the keys that were refused or did not
  // decode) so the page can say which saved database it could not bring back instead of silently losing it.
  function decodeDbStore(json) {
    var out = [];
    out.dropped = [];
    if (!json) return out;
    var raw;
    try { raw = JSON.parse(json); } catch (e) { return out; }
    if (!isPlainObject(raw)) return out;
    for (var path in raw) {
      if (!Object.prototype.hasOwnProperty.call(raw, path)) continue;
      if (typeof raw[path] !== 'string' || !isStorePath(path)) { out.dropped.push(String(path).slice(0, 80)); continue; }
      try { out.push([path, base64ToBytes(raw[path])]); } catch (e) { out.dropped.push(path); }
    }
    return out;
  }

  // ---- markdown export ------------------------------------------------------------------------
  function mdCell(v) {
    var s = v === null || v === undefined ? 'NULL' : String(v);
    return s.replace(/\\/g, '\\\\').replace(/\|/g, '\\|').replace(/\r?\n/g, ' ');
  }
  function markdownTable(columns, rows, cap) {
    cap = cap || STORED_ROW_CAP;
    var lines = ['| ' + columns.map(mdCell).join(' | ') + ' |', '|' + columns.map(function () { return '---'; }).join('|') + '|'];
    var shown = rows.slice(0, cap);
    for (var i = 0; i < shown.length; i++) lines.push('| ' + shown[i].map(mdCell).join(' | ') + ' |');
    return lines.join('\n');
  }
  function fence(lang, text) {
    var body = String(text == null ? '' : text).replace(/\s+$/, '');
    var ticks = '```';
    while (body.indexOf(ticks) >= 0) ticks += '`';
    return ticks + (lang || '') + '\n' + body + '\n' + ticks;
  }
  function recordMarkdown(rec) {
    if (!rec) return [];
    var out = [];
    if (rec.kind === 'sql') {
      out.push('Result (' + formatTimestamp(rec.ts) + '):');
      out.push('');
      if (!rec.items.length && !rec.error) { out.push('_(no output)_'); out.push(''); }
      for (var i = 0; i < rec.items.length; i++) {
        var it = rec.items[i];
        if (it.type === 'result') {
          out.push('**' + resultHeading(it.k, it.total) + '**');
          out.push('');
          out.push(markdownTable(it.columns, it.rows, STORED_ROW_CAP));
          if (it.total > it.rows.length) out.push('… ' + (it.total - it.rows.length) + ' more rows');
          out.push('');
        } else {
          out.push(it.text);
          out.push('');
        }
      }
      if (rec.error) {
        out.push('**' + errorHeadline(rec.error.statement, rec.error.message) + '**');
        out.push('');
        if (rec.error.remaining) { out.push(fence('sql', rec.error.remaining)); out.push(''); }
      }
      var sqlNotes = stringList(rec.notes);
      for (var sn = 0; sn < sqlNotes.length; sn++) { out.push(sqlNotes[sn]); out.push(''); }
    } else if (rec.kind === 'terminal') {
      out.push('Output (' + formatTimestamp(rec.ts) + '):');
      out.push('');
      out.push(fence('', transcriptText([rec])));
      out.push('');
    } else if (rec.kind === 'python') {
      out.push('Output (' + formatTimestamp(rec.ts) + '):');
      out.push('');
      var body = [];
      if (rec.stdout) body.push(rec.stdout.replace(/\n$/, ''));
      if (rec.stderr) body.push(rec.stderr.replace(/\n$/, ''));
      if (rec.error) body.push(formatTraceback(rec.error.text, rec.error.frames));
      for (var n = 0; n < (rec.notes || []).length; n++) body.push(rec.notes[n]);
      out.push(fence('', body.join('\n') || '(no output)'));
      out.push('');
    }
    return out;
  }
  function toolLabel(tool) {
    return { sql: 'SQL', text: 'Written answer', terminal: 'Terminal', python: 'Python' }[tool] || tool;
  }
  // model: { title, name, exportedAt, exercises:[{id,title,steps:[{label,workspaces:[{id,tool,text,command,snippet,record}]}]}],
  //          transcript:[entries], python:{text, record}, databases:[{path, tables:[{name, rows, sql}]}] | null, databaseNote }
  function exportMarkdown(model) {
    var L = [];
    L.push('# ' + model.title);
    L.push('');
    L.push('Student: ' + (model.name ? model.name : '_(no name entered)_'));
    L.push('Exported: ' + formatDateTime(model.exportedAt));
    L.push('');
    (model.exercises || []).forEach(function (ex) {
      L.push('## ' + ex.id + (ex.title ? ' · ' + ex.title : ''));
      L.push('');
      (ex.steps || []).forEach(function (step) {
        (step.workspaces || []).forEach(function (ws) {
          L.push('### Step ' + step.label + (ws.optional ? ' (optional)' : '') + ' — ' + toolLabel(ws.tool) + ' (' + ws.id + ')');
          L.push('');
          // an untouched optional box is not a missing answer
          var empty = ws.optional ? '_(optional — not attempted)_' : '_(no answer)_';
          if (ws.tool === 'sql') {
            var t = String(ws.text || '');
            if (!t.trim()) { L.push(empty); L.push(''); return; }
            L.push(fence('sql', t)); L.push('');
            if (!ws.record) { L.push('_(written but never run — press Run before exporting)_'); L.push(''); return; }
            if (ws.record.source !== undefined && ws.record.source !== t) { L.push('_(this result is from an earlier version of the box — press Run again to refresh it)_'); L.push(''); }
            L.push.apply(L, recordMarkdown(ws.record));
          } else if (ws.tool === 'text') {
            var a = String(ws.text || '');
            if (!a.trim()) { L.push(empty); } else { L.push(fence('', a)); }
            L.push('');
          } else if (ws.tool === 'terminal') {
            L.push(fence('', '$ ' + (ws.command || ''))); L.push('');
            if (ws.record) L.push.apply(L, recordMarkdown(ws.record)); else { L.push('_(not run yet — put the command in the Terminal and press Run)_'); L.push(''); }
          } else if (ws.tool === 'python') {
            L.push(fence('python', ws.snippet || '')); L.push('');
            if (ws.record) L.push.apply(L, recordMarkdown(ws.record)); else { L.push('_(see the Python cell section below)_'); L.push(''); }
          }
        });
      });
    });
    L.push('## Terminal transcript');
    L.push('');
    L.push((model.transcript || []).length ? fence('', transcriptText(model.transcript)) : '_(nothing has been run in the Terminal)_');
    L.push('');
    L.push('## Python cell');
    L.push('');
    var py = model.python || {};
    if (String(py.text || '').trim()) { L.push(fence('python', py.text)); L.push(''); } else { L.push('_(empty)_'); L.push(''); }
    if (py.record) L.push.apply(L, recordMarkdown(py.record)); else if (String(py.text || '').trim()) { L.push('_(written but never run — press Run Python before exporting)_'); L.push(''); }
    L.push('## Database at export time');
    L.push('');
    if (!model.databases || !model.databases.length) {
      L.push(model.databaseNote || '_(no database yet)_');
      L.push('');
    } else {
      model.databases.forEach(function (db) {
        L.push('### ' + db.path);
        L.push('');
        if (!db.tables.length) { L.push('_(no tables)_'); L.push(''); return; }
        db.tables.forEach(function (t) {
          // a view is listed by name only: counting it would evaluate the view (unbounded for a cartesian product)
          L.push('- **' + t.name + '** — ' + (t.type === 'view' || t.rows === null || t.rows === undefined ? 'view' : t.rows + ' ' + plural(t.rows, 'row', 'rows')));
          L.push('');
          L.push(fence('sql', t.sql || ''));
          L.push('');
        });
      });
    }
    // No global blank-line collapse: the student's text inside a fence is exported verbatim.
    return L.join('\n').replace(/\s+$/, '') + '\n';
  }
  function exportFileName(chapter) { return EXPORT_NAMES[chapter] || ('ch' + chapter + '-queries.md'); }
  // Count sql workspaces that hold SQL but have no result yet (for the pre-export status line).
  function countUnrun(workspaces, texts, outputs) {
    var n = 0;
    for (var i = 0; i < workspaces.length; i++) {
      var w = workspaces[i];
      if (w.tool !== 'sql') continue;
      var t = texts[w.id];
      if (t && t.trim() && !outputs[w.id]) n++;
    }
    return n;
  }
  function exportingStatus(unrun) {
    return unrun ? 'Exporting… ' + unrun + ' ' + (unrun === 1 ? 'box has' : 'boxes have') + ' SQL but no result yet.' : 'Exporting…';
  }

  // ---- notices ------------------------------------------------------------------------------
  // The wrong-name notice: "You created campustravel.db, but the SQL boxes on this page use campus_travel.db." plus the
  // page's advice (chapter 1 re-runs an import; chapters 2 and 3 have none, so their content supplies its own line).
  // Both arguments are store paths (relative to the Week 1 folder). Names are shown as file names unless the two
  // share one — then the paths tell them apart ("employees.db in the Week 1 folder" vs "chapter-03/employees.db").
  var WRONG_NAME_ADVICE = 'Re-run the import with the exact name, or pick the file here.';
  function describeDbPath(path) { return dirname(path) ? String(path) : basename(path) + ' in the Week 1 folder'; }
  function wrongNameNotice(created, primary, advice) {
    var collide = basename(created) === basename(primary);
    var c = collide ? describeDbPath(created) : basename(created);
    var p = collide ? String(primary) : basename(primary);
    return 'You created ' + c + ', but the SQL boxes on this page use ' + p + '. ' + (advice || WRONG_NAME_ADVICE);
  }
  // What the Database panel calls a db: its file name, or — when another db in the store has the same name — its path
  // the way the Files tree shows it ("chapter-03/employees.db" / "Week 1/employees.db").
  function dbDisplayName(path, paths) {
    var b = basename(path);
    for (var i = 0; i < (paths || []).length; i++) if (paths[i] !== path && basename(paths[i]) === b) return dirname(path) ? String(path) : 'Week 1/' + b;
    return b;
  }
  // The selector's option text (short, so the row fits a 390 px viewport): "mileage.db (this page)".
  function dbOptionLabel(path, isPrimary, exists) {
    if (!isPrimary) return String(path);
    return path + (exists ? ' (this page)' : ' (this page — not created yet)');
  }
  function tooLargeToSave(bytes, kept) {
    return 'Database too large to auto-save (' + (bytes / (1024 * 1024)).toFixed(1) + ' MB) — use Download' +
      (kept ? '; the copy saved after your last successful run is kept' : '');
  }
  function unusableDb(reason) { return 'That file is not a usable SQLite database (' + reason + ').'; }
  var SAVED_DB_UNUSABLE = 'Saved database could not be opened — Reset database to start over.';
  var SAVED_WORK_UNREADABLE = 'Your saved work could not be read — this page starts from a blank state. Your database is unaffected.';
  function uncommittedNote(name) {
    return 'Your connection to ' + name + ' still had uncommitted changes when your code ended; they were rolled back. Call conn.commit() before your code ends to keep them.';
  }
  // A connection the page could not close (a -journal is still on disk after the run): nothing was rolled back yet.
  function stillOpenNote(name) {
    return 'Your connection to ' + name + ' is still open with unsaved changes — other runs will see \'database is locked\' until your code calls conn.close() (or you reload the page).';
  }
  function clearedStatus(label) { return 'Cleared ' + label; }
  function undoRefusedStatus(label) { var s = label + ' has new work — Clear it first to undo'; return s.charAt(0).toUpperCase() + s.slice(1); }
  // SQLite has not loaded (offline, CDN mismatch): the saved copy of a database is handed out unchecked, and a
  // database Python wrote in the meantime waits for the check instead of being reported as unusable.
  function savedCopyDownloaded(name) { return 'Downloaded ' + name + ' (saved copy — SQLite has not loaded yet, so it was not checked)'; }
  function savedCopyWaiting(name, loading) { return 'Your saved ' + name + ' will appear once SQLite loads' + (loading ? '' : ' — press Retry SQLite'); }
  function fsPendingNote(path) { return path + ' was written; it will be checked as soon as SQLite loads.'; }
  function fsPendingRejected(path, reason) { return path + ' was written but is not a usable SQLite database (' + reason + '); it was not kept.'; }

  return {
    ROW_CAP: ROW_CAP, CELL_CAP: CELL_CAP, STORED_ROW_CAP: STORED_ROW_CAP, BROWSE_ROWS: BROWSE_ROWS, TRANSCRIPT_CAP: TRANSCRIPT_CAP, OUTPUT_CAP: OUTPUT_CAP,
    DROPPED_MARKER: DROPPED_MARKER,
    DB_MAX_BYTES: DB_MAX_BYTES, DB_AUTOSAVE_MAX_B64: DB_AUTOSAVE_MAX_B64, TEXT_SAVE_DEBOUNCE_MS: TEXT_SAVE_DEBOUNCE_MS, PYTHON_ROOT: PYTHON_ROOT,
    PIP_MESSAGE: PIP_MESSAGE, HELP_TEXT: HELP_TEXT, HELP_ONE_LINE: HELP_ONE_LINE, INPUT_ERROR: INPUT_ERROR, JOURNAL_WARNING: JOURNAL_WARNING,
    COMMIT_NOTE: COMMIT_NOTE, NOTHING_TO_RUN: NOTHING_TO_RUN, SAVED_DB_UNUSABLE: SAVED_DB_UNUSABLE, SAVED_WORK_UNREADABLE: SAVED_WORK_UNREADABLE,
    SAVE_FAILED: SAVE_FAILED, STORAGE_FULL: STORAGE_FULL,
    prim: prim, basename: basename, dirname: dirname, slug: slug, safeFileName: safeFileName, isStorePath: isStorePath, humanBytes: humanBytes, plural: plural, splitLines: splitLines, bytesEqual: bytesEqual,
    tokenize: tokenize, parseCommand: parseCommand, commandNotFound: commandNotFound, resolveVirtualPath: resolveVirtualPath,
    sameCommand: sameCommand, normaliseSource: normaliseSource, sameSource: sameSource,
    stripLeadingComments: stripLeadingComments, firstKeyword: firstKeyword, isChangeKeyword: isChangeKeyword, dropTableTarget: dropTableTarget,
    quoteIdent: quoteIdent, isSqliteHeader: isSqliteHeader, failingStatementNumber: failingStatementNumber, errorHeadline: errorHeadline,
    changedMessage: changedMessage, droppedMessage: droppedMessage, resultHeading: resultHeading, showingFirst: showingFirst,
    formatCell: formatCell, truncateCell: truncateCell, bytesToBase64: bytesToBase64, base64ToBytes: base64ToBytes,
    exitLine: exitLine, capText: capText, capTranscript: capTranscript, transcriptText: transcriptText, filterFrames: filterFrames, formatTraceback: formatTraceback,
    formatTimestamp: formatTimestamp, formatDateTime: formatDateTime, restoredCaption: restoredCaption,
    storageKeys: storageKeys, emptyState: emptyState, storableRecord: storableRecord, encodeState: encodeState, decodeState: decodeState,
    slimState: slimState, saveFallbackStatus: saveFallbackStatus, chooseSaveStatus: chooseSaveStatus, chooseDbSaveStatus: chooseDbSaveStatus,
    encodeDbStore: encodeDbStore, decodeDbStore: decodeDbStore,
    markdownTable: markdownTable, fence: fence, exportMarkdown: exportMarkdown, exportFileName: exportFileName, countUnrun: countUnrun, exportingStatus: exportingStatus,
    WRONG_NAME_ADVICE: WRONG_NAME_ADVICE, describeDbPath: describeDbPath, wrongNameNotice: wrongNameNotice, dbDisplayName: dbDisplayName, dbOptionLabel: dbOptionLabel,
    tooLargeToSave: tooLargeToSave, unusableDb: unusableDb, uncommittedNote: uncommittedNote, stillOpenNote: stillOpenNote, clearedStatus: clearedStatus, undoRefusedStatus: undoRefusedStatus,
    savedCopyDownloaded: savedCopyDownloaded, savedCopyWaiting: savedCopyWaiting, fsPendingNote: fsPendingNote, fsPendingRejected: fsPendingRejected
  };
});
