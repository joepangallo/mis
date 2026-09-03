// verify-browser.test.mjs — the pure, Chrome-free pieces of the browser driver: the request allow-list,
// the download picker, parseArgs, the XSS canary and the reporter.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { parseArgs, isAllowedRequest, pickDownload, makeReporter, CANARY, DEFAULT_CHROME, exportSection, exportResultRows, PROBE_SQL, PROBE_TABLE, markerFor } from '../verify-browser.mjs';
import { PROBE_KINDS } from '../check.mjs';
import '../helpers.js';

const H = globalThis.HWHelpers;

const cdn = { sqljs: { base: 'https://cdn.jsdelivr.net/npm/sql.js@1.14.2/dist/' }, pyodide: { base: 'https://cdn.jsdelivr.net/pyodide/v314.0.6/full/' } };

test('isAllowedRequest allows only file:/about:/blob:/data: and the two CDN bases — never a socket or another host', () => {
  assert.equal(isAllowedRequest('file:///Users/x/week-1-chapter-1.html', cdn), true);
  assert.equal(isAllowedRequest('about:blank', cdn), true);
  assert.equal(isAllowedRequest('blob:null/abc', cdn), true);
  assert.equal(isAllowedRequest('data:text/js,1', cdn), true);
  assert.equal(isAllowedRequest('https://cdn.jsdelivr.net/npm/sql.js@1.14.2/dist/sql-wasm.wasm', cdn), true);
  assert.equal(isAllowedRequest('https://cdn.jsdelivr.net/pyodide/v314.0.6/full/pyodide.asm.wasm', cdn), true);
  assert.equal(isAllowedRequest('https://evil.example/x.js', cdn), false);
  assert.equal(isAllowedRequest('ws://127.0.0.1:9/', cdn), false);
  assert.equal(isAllowedRequest('wss://evil.example/x', cdn), false);
  assert.equal(isAllowedRequest('ws-handshake:42', cdn), false);
});

// `//host/x` in an attribute resolves to file://host/x on a file:// page — an SMB/UNC fetch off this machine
// that the old /^file:/ prefix test waved through.
test('a file: URL counts only when its host is empty', () => {
  assert.equal(isAllowedRequest('file:///Users/x/Week%201/week-1-chapter-1.html', cdn), true);
  assert.equal(isAllowedRequest('file://localhost/Users/x/page.html', cdn), true, 'the URL parser drops a localhost host — the same machine');
  assert.equal(isAllowedRequest('file://evil.example/share/x.png', cdn), false);
  assert.equal(isAllowedRequest('FILE://EVIL.example/x', cdn), false);
  assert.equal(isAllowedRequest('file://[', cdn), false, 'an unparseable file: URL is not waved through');
});

test('pickDownload returns the first completed record at or after the click index (never a stale same-named one)', () => {
  const downloads = [
    { name: 'employees.db', state: 'completed', filePath: '/d/employees.db' },   // 0: an earlier download, now overwritten
    { name: 'ch1-queries.md', state: 'completed', filePath: '/d/ch1-queries.md' },
    { name: 'employees.db', state: 'begin', filePath: null },                    // 2: this click's download, not done yet
  ];
  // before the click at index 2, the stale record is the only completed one; scoping to start=2 must ignore it
  assert.equal(pickDownload(downloads, 'employees.db', 0), downloads[0]);
  assert.equal(pickDownload(downloads, 'employees.db', 2), null, 'the begin-state record does not count as completed');
  downloads[2].state = 'completed';
  assert.equal(pickDownload(downloads, 'employees.db', 2), downloads[2], 'once complete, the click\'s own record is returned');
  assert.equal(pickDownload(downloads, 'nope.db', 0), null);
});

test('the XSS canary payloads carry the executable-looking markup the assertions render as text', () => {
  assert.match(CANARY.table, /onerror=window\.__xss=1/);
  assert.match(CANARY.column, /<\/td><td onclick=x>/);
  assert.match(CANARY.value, /onerror=window\.__xss=2/);
  assert.match(CANARY.python, /onerror=window\.__xss=3/);
  assert.equal(CANARY.terminal, 'echo <b>');
});

test('parseArgs: chapters, chrome, budget, flags; rejects bad input', () => {
  const o = parseArgs(['--chapter', '1,3', '--budget', '600', '--keep']);
  assert.deepEqual(o.chapters, [1, 3]);
  assert.equal(o.budget, 600);
  assert.equal(o.keep, true);
  assert.deepEqual(parseArgs([]).chapters, [1, 2, 3], 'default is all three chapters');
  assert.equal(parseArgs([]).chrome, DEFAULT_CHROME);
  assert.throws(() => parseArgs(['--chapter', 'x']), /bad chapter/);
  assert.throws(() => parseArgs(['--budget', '0']), /--budget needs seconds/);
  assert.throws(() => parseArgs(['--nope']), /unknown option/);
});

test('makeReporter counts failures and records details', () => {
  const R = makeReporter(true);
  R.check('a', true);
  R.check('b', false, 'because');
  assert.equal(R.failed(), 1);
  assert.equal(R.results.length, 2);
  assert.equal(R.results[1].detail, 'because');
});


// --- reading the exported .md the way a grader does ----------------------------------------------
// The export is the graded artefact. Every `includes` string in expected/chapter-N.json is satisfied by text
// that is there whether or not a box was ever RUN, so doExport reads each box's own section instead.
const EXPORT_SAMPLE = [
  '# Week 1 · Chapter 1 · Excel and SQLite Projects',
  '',
  'Student: Verification Driver',
  'Exported: 2026-09-02 09:41',
  '',
  '## 1-35',
  '',
  '### Step 5a — SQL (s1-35-5a)',
  '',
  '```sql',
  'SELECT * FROM frequent_fliers;',
  '```',
  '',
  'Result (Tue 9:41 AM):',
  '',
  '**Result 1 · 2 rows**',
  '',
  '| first_name | last_name |',
  '|---|---|',
  '| Amy | Baker |',
  '| Ken | Choi |',
  '',
  '### Step 6 — SQL (s1-35-6)',
  '',
  '```sql',
  'UPDATE frequent_fliers SET seating_area = 1;',
  '```',
  '',
  '_(written but never run — press Run before exporting)_',
  '',
  '## Terminal transcript',
  '',
].join('\n');

test('exportSection isolates one box, and exportResultRows reads the table under its result heading', () => {
  const a = exportSection(EXPORT_SAMPLE, '### Step 5a — SQL (s1-35-5a)');
  assert.ok(a && a.includes('**Result 1 · 2 rows**'));
  assert.ok(!a.includes('written but never run'), 'the next box\'s marker must not bleed into this section');
  const b = exportSection(EXPORT_SAMPLE, '### Step 6 — SQL (s1-35-6)');
  assert.ok(b.includes('_(written but never run'));
  assert.equal(exportSection(EXPORT_SAMPLE, '### Step 9 — SQL (nope)'), null);

  const got = exportResultRows(a, H.resultHeading(1, 2));
  assert.deepEqual(got.rows, [['Amy', 'Baker'], ['Ken', 'Choi']]);
  assert.equal(exportResultRows(a, H.resultHeading(1, 13)), null, 'a wrong row count finds no table');
  assert.equal(exportResultRows(b, H.resultHeading(1, 2)), null, 'an unrun box has no result table');
  // a zero-row result exports the header and separator and no data rows
  const zero = '**' + H.resultHeading(1, 0) + '**\n\n| office |\n|---|\n\nnext';
  assert.deepEqual(exportResultRows(zero, H.resultHeading(1, 0)).rows, []);
});

test('the probe SQL covers every spec\'d behaviour PROBE_KINDS names', () => {
  for (const k of PROBE_KINDS) assert.equal(typeof PROBE_SQL[k], 'string', k);
  assert.match(PROBE_SQL.rowCap, /WITH RECURSIVE/, 'more rows than ROW_CAP');
  assert.match(PROBE_SQL.rowCap, /x < 600/);
  assert.ok(600 > H.ROW_CAP);
  assert.match(PROBE_SQL.cellCap, /zeroblob\(1300\)/, '2 x 1300 = 2,600 characters, past CELL_CAP');
  assert.ok(2600 > H.CELL_CAP);
  assert.equal(PROBE_SQL.emptyBox, '');
  assert.match(PROBE_SQL.openTransaction, /^BEGIN;/);
  assert.ok(PROBE_SQL.openTransactionCleanup.includes(`DROP TABLE ${PROBE_TABLE}`));
  assert.match(PROBE_SQL.syntaxError, /SELECT 1 AS ok;\nSELEC 2;/, 'statement 1 runs, statement 2 fails at prepare time');
  // the statement number the probe asserts is the spec's rule for a prepare-time error: started + 1
  assert.equal(H.failingStatementNumber(1, false), 2);
});

test('markerFor gives every written-answer box its own reload marker', () => {
  assert.notEqual(markerFor('a1-34-notice'), markerFor('a1-35-3'));
  assert.ok(markerFor('a1-35-3').startsWith('a1-35-3 · '));
});
