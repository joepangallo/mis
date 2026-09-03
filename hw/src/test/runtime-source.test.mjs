// runtime-source.test.mjs — invariants of runtime.js that are cheaper to prove by reading the source than by
// driving a browser, and that a well-meaning edit would otherwise silently undo. Each one is a regression: the
// behaviour it protects was a real bug on a real page.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import '../helpers.js';
import { SRC_DIR } from '../build.mjs';

const H = globalThis.HWHelpers;

const RUNTIME = readFileSync(join(SRC_DIR, 'runtime.js'), 'utf8');
const LINES = RUNTIME.split('\n');
// comments talk about the very patterns these tests forbid, so scan code only
const CODE = LINES.map((l) => l.replace(/^\s*\/\/.*$/, ''));
const linesMatching = (re) => CODE.map((text, i) => ({ n: i + 1, text })).filter((l) => re.test(l.text));

// A view can be defined over a cross join whose row count is astronomically larger than the file that defines it.
// COUNT(*) on such a view runs on the main thread on every panel refresh and froze the page for good, because the
// database that defines the view was already saved. Every count must be behind a "this is a real table" guard.
test('runtime.js never counts the rows of anything that is not a table', () => {
  const counts = linesMatching(/COUNT\(\*\)/);
  assert.ok(counts.length > 0, 'the Tables list and Browse both count rows — the scan found no COUNT(*) at all');
  for (const line of counts) {
    const context = CODE.slice(Math.max(0, line.n - 13), line.n).join('\n');
    assert.match(
      context,
      /type\s*!==\s*'table'|isRealTable\(/,
      `runtime.js:${line.n} counts rows with no preceding "is this a table" guard: ${line.text.trim()}`,
    );
  }
});

test('the Tables list asks sqlite_master for the type and renders views without a count', () => {
  assert.match(RUNTIME, /type IN \('table','view'\)/, 'listTables must read the type alongside the name');
  assert.match(RUNTIME, /if \(t\.type !== 'table'\) \{ t\.rows = null; return; \}/, 'a view must be left with rows === null');
  assert.match(RUNTIME, /t\.rows === null \? '' :/, 'a null row count must render as no count, not as "null rows"');
  assert.match(RUNTIME, /class: 'pill', text: 'view'/, 'a view must be marked with the view pill');
  // one gate, used by the Tables list, Browse and the DROP TABLE note
  assert.match(RUNTIME, /function isRealTable\(db, name\)/);
  assert.match(RUNTIME, /if \(isRealTable\(db, name\)\) \{ try \{ total = Number/, 'Browse must not count a view');
  assert.match(RUNTIME, /if \(target && isRealTable\(db, target\)\) \{/, 'the DROP TABLE note must not count a view');
});

// PAGE.files is a plain JSON object, so a bare PAGE.files[name] also resolves Object.prototype's own members:
// `ls constructor`, `cat toString` and `ls __proto__` behaved as if such a file existed.
test('every PAGE.files lookup is an own-property lookup', () => {
  for (const line of linesMatching(/PAGE\.files\s*\[/)) {
    assert.match(
      line.text,
      /hasFile\(/,
      `runtime.js:${line.n} indexes PAGE.files directly, so inherited names resolve: ${line.text.trim()}`,
    );
  }
  assert.match(RUNTIME, /function hasFile\(path\) \{ return Object\.prototype\.hasOwnProperty\.call\(PAGE\.files, path\); \}/);
  assert.match(RUNTIME, /var embeddedCache = Object\.create\(null\)/, 'the byte cache must not inherit from Object.prototype either');
});

// #dbNameNotice sits in the panel and the status line scrolls away with the toolbar. A refusal branch that set
// only one of the two left the previous refusal's reason standing beside the new one.
test('every "Open a .db file…" refusal sets the status and the panel notice to the same text', () => {
  const first = CODE.findIndex((l) => l.includes('function openDbChosen'));
  const last = CODE.findIndex((l, i) => i > first && l.includes('function resetDatabase'));
  assert.ok(first > 0 && last > first, 'openDbChosen was not found in runtime.js');
  const open = CODE.slice(first, last);
  for (let i = 0; i < open.length; i += 1) {
    if (!/setStatus\(/.test(open[i]) || /'Opening |'Opened /.test(open[i])) continue;
    const near = open.slice(Math.max(0, i - 2), i + 3).join('\n');
    assert.match(near, /refuseDb\(|showDbNotice\(/, `a refusal sets the status without the notice: ${open[i].trim()}`);
  }
  const openText = open.join('\n');
  assert.match(RUNTIME, /function refuseDb\(reason\) \{ var text = H\.unusableDb\(reason\); setStatus\(text, 'bad'\); showDbNotice\(text, 'bad', 'bad'\); \}/);
  for (const call of ['refuseDb(\'larger than \'', 'refuseDb(chk.reason)', 'refuseDb(\'the file is empty\')']) {
    assert.ok(openText.includes(call), `openDbChosen no longer refuses through ${call}`);
  }
});

// Download with no database writes the "No database yet" line into the panel notice. Nothing used to take it away,
// so after the import the panel read "No database yet" above a Tables list showing 43 rows.
test('the "No database yet" notice is withdrawn once the database exists', () => {
  assert.match(RUNTIME, /if \(noticeKind === 'nodb' && dbExists\(selectedDb\)\) hideDbNotice\(\);/);
  assert.match(RUNTIME, /showDbNotice\(NO_DB_TEXT, 'warn', 'nodb'\)/, 'Download must tag its notice so refreshDbUi can retire it');
});

// The file:// localStorage bucket is shared with every other local page the browser has ever opened, so the set of
// keys this page touches is a contract (DOM-CONTRACT.md §6), not an implementation detail. verify-browser.mjs
// asserts that every live key matches /^hw-week1-chapter-\d+-v1(:db)?$/ — which holds only because the probe's
// removeItem sits in a finally.
test('the runtime touches only KEYS.main, KEYS.db and KEYS.probe, and never clear()', () => {
  assert.deepEqual(Object.keys(H.storageKeys(1)).sort(), ['db', 'main', 'probe']);
  assert.deepEqual(H.storageKeys(2), { main: 'hw-week1-chapter-2-v1', db: 'hw-week1-chapter-2-v1:db', probe: 'hw-week1-chapter-2-v1:probe' });
  const calls = [...RUNTIME.matchAll(/localStorage\.(\w+)\(([^)]*)\)/g)];
  assert.ok(calls.length >= 8, `expected the persistence code to be found, saw ${calls.length} localStorage calls`);
  for (const [whole, method, args] of calls) {
    assert.ok(['setItem', 'getItem', 'removeItem'].includes(method), `runtime.js calls localStorage.${method}()`);
    assert.match(args.trim(), /^KEYS\.(main|db|probe)\b/, `a localStorage call names a key outside KEYS: ${whole}`);
  }
  assert.doesNotMatch(RUNTIME, /localStorage\.clear\s*\(/);
});

test('the bucket probe is removed again in a finally, so it never persists', () => {
  const first = CODE.findIndex((l) => l.includes('function bucketFull()'));
  assert.ok(first > 0, 'bucketFull() was not found in runtime.js');
  const body = CODE.slice(first, first + 6).join('\n');
  assert.match(body, /setItem\(KEYS\.probe/, 'bucketFull must be the one writer of the probe key');
  assert.match(body, /finally \{[^}]*removeItem\(KEYS\.probe\)/, 'the probe removal must sit in a finally, not on the success path');
  // and it is the ONLY probe write on the page
  assert.equal([...RUNTIME.matchAll(/setItem\(KEYS\.probe/g)].length, 1);
});

// Counting a view would evaluate it, and a view over a cartesian product is unbounded — the export follows the
// same rule as the Tables list and Browse.
test('the export lists a view by name with no row count', () => {
  const model = {
    title: 'T', student: '', exportedAt: '2026-09-02 09:41', exercises: [], transcript: [], python: null,
    databases: [{ path: 'mileage.db', tables: [
      { name: 'airlines', type: 'table', rows: 4, sql: 'CREATE TABLE airlines(x)' },
      { name: 'huge', type: 'view', rows: null, sql: 'CREATE VIEW huge AS SELECT 1' },
    ] }],
  };
  const md = H.exportMarkdown(model);
  assert.match(md, /- \*\*airlines\*\* — 4 rows/);
  assert.match(md, /- \*\*huge\*\* — view/);
  assert.doesNotMatch(md, /\*\*huge\*\* — \d/);
});
