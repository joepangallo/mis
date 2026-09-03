// codec-hardening.test.mjs — regression tests for the helper changes of the round-1 fixes:
// strict persistence codec, stored-output caps, the save fallback, the db-store merge, verbatim export
// spacing, sql/terminal notes, and the command / source matching used to attach records to workspaces.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import '../helpers.js';

const H = globalThis.HWHelpers;
const TS = '2026-09-02T10:00:00Z';
const okSql = { kind: 'sql', ts: TS, source: 'SELECT 1;', statements: 1, items: [{ type: 'result', k: 1, columns: ['a'], rows: [[1]], total: 1 }], error: null };

test('storableRecord is strict: anything that is not the array/object it must be yields null', () => {
  assert.ok(H.storableRecord(okSql), 'the well-formed record survives');
  const bad = [
    { ...okSql, items: [{ type: 'result', k: 1, columns: 'notarray', rows: [], total: 0 }] },
    { ...okSql, items: [{ type: 'result', k: 1, columns: ['a'], rows: [5], total: 1 }] },
    { ...okSql, items: [{ type: 'result', k: 1, columns: ['a'], rows: 'x', total: 1 }] },
    { ...okSql, items: [{ type: 'weird' }] },
    { ...okSql, items: [null] },
    { ...okSql, items: 'x' },
    { ...okSql, error: 'boom' },
    { ...okSql, notes: 'oops' },
    { kind: 'python', ts: TS, source: '', stdout: '', stderr: '', error: null, notes: 'oops' },
    { kind: 'python', ts: TS, source: '', stdout: '', stderr: '', error: { text: 'E', frames: 'nope' }, notes: [] },
    { kind: 'python', ts: TS, source: '', stdout: '', stderr: '', error: { text: 'E', frames: [7] }, notes: [] },
    { kind: 'python', ts: TS, source: '', stdout: '', stderr: '', error: 'E', notes: [] },
    { kind: 'terminal', ts: TS, cmd: 'x', stdout: '', stderr: '', exit: null, notes: 'no' },
    { kind: 'nope' },
    null, 'string', 42, [],
  ];
  bad.forEach((rec, i) => assert.equal(H.storableRecord(rec), null, `case ${i}`));
  // odd but harmless values are coerced, not rejected
  const t = H.storableRecord({ kind: 'terminal', ts: TS, cmd: 'x', stdout: 'o', stderr: '', exit: { a: 1 } });
  assert.equal(t.exit, null, 'an object exit code becomes null');
  assert.deepEqual(t.notes, []);
  const s = H.storableRecord({ ...okSql, items: [], error: { statement: '2', message: 'm', remaining: 'r' }, notes: [1, 'two'] });
  assert.deepEqual(s.error, { statement: 2, message: 'm', remaining: 'r' });
  assert.deepEqual(s.notes, ['1', 'two']);
  const r = H.storableRecord({ ...okSql, items: [{ type: 'result', k: '1', columns: [1, 2], rows: [[null, new Uint8Array(2)]], total: 'x' }] });
  assert.deepEqual(r.items[0], { type: 'result', k: 1, columns: ['1', '2'], total: 0, rows: [[null, '⟨blob 2 bytes⟩']] });
});

test('decodeState drops a malformed record and keeps everything else', () => {
  const json = JSON.stringify({ v: 1, name: 'N', texts: { a: 'kept' }, python: null, selectedDb: 'x.db',
    transcript: [{ cmd: 'x', stdout: '', stderr: '', exit: { a: 1 }, ts: null, notes: ['n'] }, 'junk', { cmd: 'y', notes: 'bad' }],
    outputs: { good: okSql, bad: { ...okSql, items: [{ type: 'result', k: 1, columns: 'notarray', rows: [], total: 0 }] }, py: { kind: 'python', ts: TS, notes: 'oops' } } });
  const s = H.decodeState(json);
  assert.equal(s.name, 'N');
  assert.deepEqual(Object.keys(s.outputs), ['good']);
  assert.equal(s.transcript.length, 2);
  assert.equal(s.transcript[0].exit, null);
  assert.deepEqual(s.transcript[0].notes, ['n']);
  assert.deepEqual(s.transcript[1].notes, []);
  assert.deepEqual(H.decodeState(H.encodeState(s)).transcript, s.transcript, 'notes round-trip');
});

test('stored stdout/stderr/error texts are capped at OUTPUT_CAP keeping the tail, with a head marker', () => {
  assert.equal(H.OUTPUT_CAP, 200 * 1024);
  const big = Array.from({ length: 450000 }, (_, i) => `line number ${i}`).join('\n');
  const py = H.storableRecord({ kind: 'python', ts: TS, source: '', stdout: big, stderr: big, error: { text: big, frames: [] }, notes: [] });
  for (const s of [py.stdout, py.stderr, py.error.text]) {
    assert.equal(s.length, H.OUTPUT_CAP);
    assert.ok(s.startsWith(H.DROPPED_MARKER));
    assert.ok(s.endsWith('line number 449999'), 'the end of the run is what is kept');
  }
  const term = H.storableRecord({ kind: 'terminal', ts: TS, cmd: 'python loud.py', stdout: big, stderr: '', exit: null });
  assert.equal(term.stdout.length, H.OUTPUT_CAP);
  const sql = H.storableRecord({ ...okSql, items: [], error: { statement: 1, message: 'm', remaining: big } });
  assert.equal(sql.error.remaining.length, H.OUTPUT_CAP);
  assert.equal(H.capText('short', 10), 'short');
  const capped = H.capText('x'.repeat(100) + 'END', 40);
  assert.equal(capped.length, 40);
  assert.ok(capped.startsWith(H.DROPPED_MARKER) && capped.endsWith('END'));
  // worst case: two python records (stdout + stderr + error text) + two terminal records + the transcript ≈ 1.9 M chars
  assert.ok(H.encodeState({ outputs: { python: py, terminal: term, 'p1-35-explore': py, 't1-35-1': term }, transcript: [{ cmd: 'x', stdout: big, stderr: '', exit: null }] }).length < 2.5 * 1024 * 1024, 'the main key stays below the ~5 M-char localStorage quota');
});

test('slimState drops the Python/Terminal records first, then every output; the status names the fix', () => {
  const state = { name: 'N', texts: { a: 'x' }, outputs: { 's1-35-5a': okSql, python: { kind: 'python', ts: TS }, terminal: { kind: 'terminal', ts: TS }, 't1-35-1': { kind: 'terminal', ts: TS }, 'p1-35-explore': { kind: 'python', ts: TS } }, transcript: [] };
  const l1 = H.slimState(state, 1);
  assert.deepEqual(Object.keys(l1.state.outputs), ['s1-35-5a']);
  assert.deepEqual(l1.dropped.sort(), ['p1-35-explore', 'python', 't1-35-1', 'terminal']);
  assert.equal(l1.state.name, 'N');
  assert.deepEqual(state.outputs['s1-35-5a'], okSql, 'the original state is not mutated');
  const l2 = H.slimState(state, 2);
  assert.deepEqual(l2.state.outputs, {});
  assert.equal(l2.dropped.length, 5);
  assert.match(H.saveFallbackStatus(1), /Python and Terminal outputs are too big.*Clear under the Python cell/);
  assert.match(H.saveFallbackStatus(2), /results are too big.*Clear on the largest result box/);
  assert.equal(H.saveFallbackStatus(3), H.SAVE_FAILED);
  assert.match(H.SAVE_FAILED, /Export my work before closing/);
});

test('encodeDbStore carries the previously saved copy of a db that is skipped for size', () => {
  const small = new Uint8Array([1, 2, 3]);
  const big = new Uint8Array(30);
  const prev = JSON.stringify({ 'big.db': 'OLDCOPY=', 'gone.db': 'X' });
  const enc = H.encodeDbStore([['small.db', small], ['big.db', big]], 8, prev);
  assert.deepEqual(JSON.parse(enc.json), { 'small.db': 'AQID', 'big.db': 'OLDCOPY=' });
  assert.deepEqual(enc.skipped, [{ path: 'big.db', bytes: 30 }]);
  assert.deepEqual(enc.kept, ['big.db']);
  const none = H.encodeDbStore([['big.db', big]], 8, null);
  assert.deepEqual(JSON.parse(none.json), {});
  assert.deepEqual(none.kept, []);
  const junk = H.encodeDbStore([['big.db', big]], 8, 'not json');
  assert.deepEqual(JSON.parse(junk.json), {});
  assert.equal(H.tooLargeToSave(2.2 * 1024 * 1024, true), 'Database too large to auto-save (2.2 MB) — use Download; the copy saved after your last successful run is kept');
  assert.equal(H.tooLargeToSave(4 * 1024 * 1024, false), 'Database too large to auto-save (4.0 MB) — use Download');
});

test('sameCommand ignores the interpreter alias, spacing and quoting; sameSource ignores trailing whitespace and blank lines', () => {
  const cmd = 'python load_data.py chapter-01/data/FrequentFliers.txt frequent_fliers campus_travel.db';
  assert.equal(H.sameCommand(cmd, 'python3 load_data.py chapter-01/data/FrequentFliers.txt frequent_fliers campus_travel.db'), true);
  assert.equal(H.sameCommand(cmd, '  py   load_data.py  "chapter-01/data/FrequentFliers.txt" frequent_fliers campus_travel.db '), true);
  assert.equal(H.sameCommand(cmd, 'python load_data.py chapter-01/data/FrequentFliers.txt frequent_fliers campustravel.db'), false);
  assert.equal(H.sameCommand(cmd, 'python load_data.py chapter-01/data/FrequentFliers.txt frequent_fliers campus_travel.db --text-columns zip'), false);
  assert.equal(H.sameCommand('ls', 'ls'), true);
  assert.equal(H.sameCommand('ls', 'ls chapter-01'), false);
  assert.equal(H.sameCommand('', ''), false);
  assert.equal(H.sameSource('import sqlite3\nprint(1)\n', 'import sqlite3   \r\n\r\nprint(1)'), true);
  assert.equal(H.sameSource('    print(1)', 'print(1)'), false, 'indentation is meaning in Python');
  assert.equal(H.normaliseSource(null), '');
});

test('transcript text keeps the file-sync notes after the exit line, so the export is unchanged', () => {
  const t = H.transcriptText([{ cmd: 'python load_data.py x t campus_travel.db', stdout: 'Loaded 43 rows\n', stderr: '', exit: null, notes: ['Created campus_travel.db'] }]);
  assert.equal(t, '$ python load_data.py x t campus_travel.db\nLoaded 43 rows\nCreated campus_travel.db');
  assert.equal(H.transcriptText([{ cmd: 'help', stdout: 'x', stderr: 'e', exit: 2, notes: ['n'] }]), '$ help\nx\ne\nexit status 2\nn');
});

test('export: blank lines inside a written answer or a SQL box are verbatim; the COMMIT note follows the failure headline', () => {
  const model = {
    title: 'T', name: 'N', exportedAt: TS, transcript: [], python: { text: '', record: null }, databases: null, databaseNote: '_(no database yet)_',
    exercises: [{ id: '1-35', title: 'X', steps: [
      { label: '3', workspaces: [{ id: 'a1-35-3', tool: 'text', text: 'first\n\n\n\nsecond' }] },
      { label: '5a', workspaces: [{ id: 's1-35-5a', tool: 'sql', text: '-- q\n\n\n\nSELECT 1;', record: { ...okSql, source: '-- q\n\n\n\nSELECT 1;' } }] },
      { label: '6', workspaces: [{ id: 's1-35-6', tool: 'sql', text: 'BEGIN; SELECT * FROM nope;', record: { kind: 'sql', ts: TS, source: 'BEGIN; SELECT * FROM nope;', statements: 1, items: [{ type: 'message', level: 'ok', text: 'OK' }], error: { statement: 2, message: 'no such table: nope', remaining: 'SELECT * FROM nope;' }, notes: [H.COMMIT_NOTE] } }] },
      { label: '7', workspaces: [{ id: 's1-35-7', tool: 'sql', text: '-- only a comment', record: { ...okSql, items: [], source: '-- only a comment' } }] },
    ] }],
  };
  const md = H.exportMarkdown(model);
  assert.ok(md.includes('```\nfirst\n\n\n\nsecond\n```'), 'written answer verbatim');
  assert.ok(md.includes('```sql\n-- q\n\n\n\nSELECT 1;\n```'), 'sql verbatim');
  const err = md.indexOf('**Statement 2 failed');
  const note = md.indexOf(H.COMMIT_NOTE);
  assert.ok(err > 0 && note > err, 'the commit note comes after the failure headline');
  assert.ok(md.includes('_(no output)_\n\n## Terminal transcript'), 'a no-output record is followed by a blank line');
  assert.doesNotMatch(md.replace(/```[\s\S]*?```/g, 'FENCE'), /\n{3,}/, 'no triple newlines outside fences');
});
