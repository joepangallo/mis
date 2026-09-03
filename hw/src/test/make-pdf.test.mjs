// make-pdf.test.mjs — the pure validators (pdfChecks / pdfFindings / stepSnippet / squash / parseArgs). No Chrome.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { pdfChecks, pdfFindings, stepSnippet, squash, parseArgs, STEP_SNIPPET_CHARS, SPARSE_PAGE_CHARS } from '../make-pdf.mjs';

// A minimal content set whose text we can render into a synthetic "PDF text".
const chapters = [{
  chapter: 1,
  exercises: [{
    id: '1-35', title: 'Database Application: Frequent Fliers',
    steps: [
      { label: '1', html: '<p>Import the file with <code>load_data.py</code> and read the schema it prints back to you.</p>', workspaces: [{ tool: 'terminal', id: 't', command: 'python load_data.py chapter-01/data/FrequentFliers.txt frequent_fliers campus_travel.db', expect: ['Loaded 43 rows'] }] },
      { label: '5a', html: '<p>Every customer whose meal is Vegan, sorted by last name.</p>', workspaces: [{ tool: 'sql', id: 's', expect: ['13 rows'] }] },
      { label: 'explore', html: '<p>Optional.</p>', workspaces: [{ tool: 'python', id: 'p', snippet: 'import sqlite3\nconn = sqlite3.connect("x")\n' }] },
    ],
  }],
  unstuck: [['My import printed nothing', 'Check the file name and try again.']],
}];
const handout = { version: '2026-09-02', grading: [['Data imported correctly', 15], ['Written answers show reasoning', 20]], unstuck: [['input() is not available', 'Put the value in your code instead.']] };

// The text pdftotext would produce from a good handout (whitespace-padded, line-wrapped like -layout).
function goodText() {
  return [
    'Week 1 Application Exercises · version 2026-09-02',
    'Chapter 1',
    'Exercise 1-35 · Database Application: Frequent Fliers',
    'Import the file with load_data.py and read the schema it prints back to you.',
    'expect: Loaded 43 rows',
    '$ python load_data.py chapter-01/data/FrequentFliers.txt frequent_fliers campus_travel.db',
    'Every customer whose meal is Vegan, sorted by last name.',
    'expect: 13 rows',
    'Optional.',
    'import sqlite3',
    'My import printed nothing',
    'input() is not available',
    'What to hand in',
    'Data imported correctly                                    15',
    'Written answers show reasoning                             20',
  ].join('\n');
}
const info = { pages: 4, size: '612 x 792 pts (letter)' };
const pageTexts = ['a'.repeat(200), 'b'.repeat(200), 'c'.repeat(200), 'd'.repeat(200)];

test('squash removes all whitespace; stepSnippet takes the opening prose and skips tables', () => {
  assert.equal(squash('a  b\tc\nd'), 'abcd');
  assert.equal(stepSnippet('<p>Import the file with <code>load_data.py</code>.</p>'), 'Import the file with load_data.py.');
  assert.ok(stepSnippet('<table><caption>Summary cells</caption><tr><td>x</td></tr></table>').startsWith('Summary cells'));
  assert.ok(stepSnippet('<p>' + 'x'.repeat(200) + '</p>').length === STEP_SNIPPET_CHARS);
});

test('pdfChecks passes a good handout and names every check', () => {
  const checks = pdfChecks({ info, text: goodText(), pageTexts, chapters, handout, html: '<h1>ok</h1>' });
  assert.deepEqual(checks.flatMap((c) => c.findings), []);
  for (const name of ['Letter page size', 'every exercise title', 'a "Chapter N" heading per chapter', "every step's opening text", 'every expect chip, terminal command and Python snippet', 'every Getting-unstuck question', '"What to hand in"', 'grading rows', 'version', 'no sparse pages']) {
    assert.ok(checks.some((c) => c.name === name), name);
  }
});

test('a handout missing one step\'s text fails "every step\'s opening text" (the hidden-steps regression)', () => {
  const text = goodText().replace('Every customer whose meal is Vegan, sorted by last name.', '');
  const f = pdfFindings({ info, text, pageTexts, chapters, handout, html: null });
  assert.ok(f.some((e) => /1-35 step 5a:.*missing/.test(e)), f.join(' | '));
});

test('the other negatives still fire: page size, chip, command, snippet, unstuck, version, grading, sparse', () => {
  const bad = (mut) => pdfFindings({ info, ...mut, pageTexts, chapters, handout, html: null });
  assert.ok(bad({ info: { pages: 4, size: '595 x 842 pts (A4)' }, text: goodText() }).some((e) => /page size/.test(e)));
  assert.ok(bad({ text: goodText().replace('Loaded 43 rows', 'x') }).some((e) => /chip "Loaded 43 rows" missing/.test(e)));
  assert.ok(bad({ text: goodText().replace('python load_data.py chapter-01/data/FrequentFliers.txt frequent_fliers campus_travel.db', 'python x') }).some((e) => /terminal command .* missing/.test(e)));
  assert.ok(bad({ text: goodText().replace('import sqlite3', 'nope') }).some((e) => /Python snippet line .* missing/.test(e)));
  assert.ok(bad({ text: goodText().replace('My import printed nothing', 'x') }).some((e) => /Getting unstuck entry .* missing/.test(e)));
  assert.ok(bad({ text: goodText().replace('version 2026-09-02', 'version 2000-01-01') }).some((e) => /version 2026-09-02 missing/.test(e)));
  assert.ok(bad({ text: goodText().replace(/Written answers show reasoning\s+20/, 'Written answers show reasoning') }).some((e) => /not followed by its points \(20\)/.test(e)));
  assert.ok(pdfFindings({ info, text: goodText(), pageTexts: [...pageTexts, 'x'], chapters, handout, html: null }).some((e) => new RegExp(`is sparse`).test(e)));
  assert.ok(SPARSE_PAGE_CHARS > 0);
});

test('parseArgs understands the options and rejects unknown ones', () => {
  const o = parseArgs(['--html', 'x.html', '--out', 'y.pdf', '--keep']);
  assert.ok(o.html.endsWith('/x.html'));
  assert.ok(o.out.endsWith('/y.pdf'));
  assert.equal(o.keep, true);
  const c = parseArgs(['--check', 'z.pdf']);
  assert.ok(c.check.endsWith('/z.pdf'));
  assert.throws(() => parseArgs(['--nope']), /unknown option/);
  assert.throws(() => parseArgs(['--html']), /needs a value/);
});
