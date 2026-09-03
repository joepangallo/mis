// export.test.mjs — the "Export my work" Markdown format.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import '../helpers.js';

const H = globalThis.HWHelpers;

function model() {
  const rows = Array.from({ length: 230 }, (_, i) => [String(i), i % 3 === 0 ? null : `name|${i}`]).slice(0, 200);
  return {
    title: 'Week 1 · Chapter 1 · Excel and SQLite Projects',
    name: 'Ada Lovelace',
    exportedAt: '2026-09-02T09:41:00',
    exercises: [
      { id: '1-34', title: 'Spreadsheet Application: Ticket Sales at Campus Travel', steps: [
        { label: 'notice', workspaces: [{ id: 'a1-34-notice', tool: 'text', text: 'The median, because one big sale skews the mean.' }] },
      ] },
      { id: '1-35', title: 'Database Application: Frequent Fliers', steps: [
        { label: '1', workspaces: [{ id: 't1-35-1', tool: 'terminal', command: 'python load_data.py chapter-01/data/FrequentFliers.txt frequent_fliers campus_travel.db', record: { kind: 'terminal', ts: '2026-09-02T09:40:00', cmd: 'python load_data.py chapter-01/data/FrequentFliers.txt frequent_fliers campus_travel.db', stdout: "Loaded 43 rows into 'frequent_fliers'\nCREATE TABLE frequent_fliers (\n  zip INTEGER\n)\n", stderr: '', exit: null } }] },
        { label: '3', workspaces: [{ id: 'a1-35-3', tool: 'text', text: '' }] },
        { label: '5a', workspaces: [{ id: 's1-35-5a', tool: 'sql', text: 'SELECT id, name FROM t;', record: { kind: 'sql', ts: '2026-09-02T09:40:30', source: 'SELECT id, name FROM t;', statements: 1, items: [{ type: 'result', k: 1, columns: ['id', 'name'], rows, total: 230 }], error: null } }] },
        { label: '5b', workspaces: [{ id: 's1-35-5b', tool: 'sql', text: 'SELECT 2;', record: null }] },
        { label: '5c', workspaces: [{ id: 's1-35-5c', tool: 'sql', text: '   ', record: null }] },
        { label: '6', workspaces: [{ id: 's1-35-6', tool: 'sql', text: 'UPDATE t SET x = 1;\nSELEC 1;', record: { kind: 'sql', ts: '2026-09-02T09:40:40', source: 'UPDATE t SET x = 1;\nSELEC 1;', statements: 1, items: [{ type: 'message', level: 'ok', text: 'OK · 6 rows changed' }], error: { statement: 2, message: 'near "SELEC": syntax error', remaining: 'SELEC 1;' } } }] },
        { label: '7', workspaces: [{ id: 's1-35-7', tool: 'sql', text: 'SELECT 9;', record: { kind: 'sql', ts: '2026-09-02T09:40:50', source: 'SELECT 8;', statements: 1, items: [{ type: 'result', k: 1, columns: ['8'], rows: [['8']], total: 1 }], error: null } }] },
        { label: 'explore', workspaces: [{ id: 'p1-35-explore', tool: 'python', snippet: 'print(1)', record: null }] },
      ] },
    ],
    transcript: [{ cmd: 'help', stdout: 'Commands: …\n', stderr: '', exit: null }, { cmd: 'python load_data.py', stdout: '', stderr: 'usage: load_data.py\n', exit: 2 }],
    python: { text: "print('<b>')", record: { kind: 'python', ts: '2026-09-02T09:41:00', source: "print('<b>')", stdout: '<b>\n', stderr: '', error: null, notes: [] } },
    databases: [{ path: 'campus_travel.db', tables: [{ name: 'frequent_fliers', rows: 43, sql: 'CREATE TABLE frequent_fliers (\n  zip INTEGER\n)' }] }],
    databaseNote: null,
  };
}

test('export markdown has the title, name, date and one section per exercise, step and workspace', () => {
  const md = H.exportMarkdown(model());
  assert.ok(md.startsWith('# Week 1 · Chapter 1 · Excel and SQLite Projects\n\nStudent: Ada Lovelace\nExported: 2026-09-02 09:41\n'));
  assert.ok(md.includes('## 1-34 · Spreadsheet Application: Ticket Sales at Campus Travel'));
  assert.ok(md.includes('## 1-35 · Database Application: Frequent Fliers'));
  assert.ok(md.includes('### Step notice — Written answer (a1-34-notice)\n\n```\nThe median, because one big sale skews the mean.\n```'));
  assert.ok(md.includes('### Step 1 — Terminal (t1-35-1)\n\n```\n$ python load_data.py chapter-01/data/FrequentFliers.txt frequent_fliers campus_travel.db\n```'));
  assert.ok(md.includes("Loaded 43 rows into 'frequent_fliers'"));
  assert.ok(md.includes('### Step 5a — SQL (s1-35-5a)\n\n```sql\nSELECT id, name FROM t;\n```'));
  assert.ok(md.includes('### Step explore — Python (p1-35-explore)\n\n```python\nprint(1)\n```\n\n_(see the Python cell section below)_'));
  assert.ok(md.endsWith('\n'));
  assert.doesNotMatch(md, /\n{3,}/, 'no triple blank lines');
});

test('results become markdown tables capped at 200 rows with a "more rows" line; NULL and pipes are handled', () => {
  const md = H.exportMarkdown(model());
  assert.ok(md.includes('**Result 1 · 230 rows**\n\n| id | name |\n|---|---|\n| 0 | NULL |\n| 1 | name\\|1 |'));
  assert.ok(md.includes('… 30 more rows'));
  const tableLines = md.split('\n').filter((l) => /^\| \d+ \| /.test(l));
  assert.equal(tableLines.length, 200);
});

test('an unused optional box reads "optional — not attempted", never "no answer"', () => {
  const md = H.exportMarkdown({
    title: 'T', name: '', exportedAt: '2026-09-02T09:41:00',
    exercises: [{ id: '2-37', title: 'x', steps: [{ label: '4', workspaces: [
      { id: 's2-37-4', tool: 'sql', text: '', record: null },
      { id: 's2-37-4b', tool: 'sql', optional: true, text: '', record: null },
      { id: 'a2-37-4', tool: 'text', optional: true, text: '' },
    ] }] }],
    transcript: [], python: { text: '', record: null }, databases: null, databaseNote: '_(no database yet)_',
  });
  assert.ok(md.includes('### Step 4 (optional) — SQL (s2-37-4b)\n\n_(optional — not attempted)_'), md.slice(0, 400));
  assert.ok(md.includes('### Step 4 (optional) — Written answer (a2-37-4)\n\n_(optional — not attempted)_'));
  // a required empty box still reads "no answer"
  assert.ok(md.includes('### Step 4 — SQL (s2-37-4)\n\n_(no answer)_'));
});

test('empty, never-run, stale and failed boxes are labelled honestly', () => {
  const md = H.exportMarkdown(model());
  assert.ok(md.includes('### Step 3 — Written answer (a1-35-3)\n\n_(no answer)_'));
  assert.ok(md.includes('### Step 5b — SQL (s1-35-5b)\n\n```sql\nSELECT 2;\n```\n\n_(written but never run — press Run before exporting)_'));
  assert.ok(md.includes('### Step 5c — SQL (s1-35-5c)\n\n_(no answer)_'));
  assert.ok(md.includes('_(this result is from an earlier version of the box — press Run again to refresh it)_'));
  assert.ok(md.includes('OK · 6 rows changed\n\n**Statement 2 failed: near "SELEC": syntax error. Statement 1 was applied; the rest was not run:**\n\n```sql\nSELEC 1;\n```'));
});

test('terminal transcript, Python cell and database sections', () => {
  const md = H.exportMarkdown(model());
  assert.ok(md.includes('## Terminal transcript\n\n```\n$ help\nCommands: …\n$ python load_data.py\nusage: load_data.py\nexit status 2\n```'));
  assert.ok(md.includes("## Python cell\n\n```python\nprint('<b>')\n```\n\nOutput (") && md.includes('```\n<b>\n```'));
  assert.ok(md.includes('## Database at export time\n\n### campus_travel.db\n\n- **frequent_fliers** — 43 rows\n\n```sql\nCREATE TABLE frequent_fliers (\n  zip INTEGER\n)\n```'));
});

test('the export never carries locations or local paths and handles the no-database cases', () => {
  const md = H.exportMarkdown(model());
  assert.doesNotMatch(md, /file:\/\/|\/Users\/|C:\\|location\./);
  const none = H.exportMarkdown({ ...model(), databases: null, databaseNote: '_(no database yet)_', transcript: [], python: { text: '', record: null } });
  assert.ok(none.includes('## Terminal transcript\n\n_(nothing has been run in the Terminal)_'));
  assert.ok(none.includes('## Python cell\n\n_(empty)_'));
  assert.ok(none.includes('## Database at export time\n\n_(no database yet)_'));
  const unrun = H.exportMarkdown({ ...model(), python: { text: 'print(2)', record: null } });
  assert.ok(unrun.includes('_(written but never run — press Run Python before exporting)_'));
  const noname = H.exportMarkdown({ ...model(), name: '' });
  assert.ok(noname.includes('Student: _(no name entered)_'));
});
