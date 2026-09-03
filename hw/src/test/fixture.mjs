// fixture.mjs — a small, valid content set + a consistent instructor dir for the unit tests and for
// stub runs of check.mjs / verify-browser.mjs. Not a test file (the glob is *.test.mjs).
// The SQL in the fixture's solutions really runs against the shipped Week 1 data, so a page built from
// this fixture can be driven end to end exactly like the real pages.
import { writeFileSync, mkdirSync, copyFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { table } from '../schema.mjs';
import { ALLOW_LIST, DEFAULTS } from '../build.mjs';

const P = (s) => `<p>${s}</p>`;

export function makeHandout() {
  return {
    version: '2026-09-02',
    front: '<h2>Before you start</h2><p>A laptop or Chromebook with a current Chrome or Edge. Your student Microsoft 365 account includes Excel.</p>',
    back: '<h2>What to hand in</h2><p>Chapter1.zip = TicketSales.xlsx · campus_travel.db · ch1-queries.md (made by Export my work)</p>',
    grading: [['Every required step attempted', 40], ['Results match the data', 40], ['Written answers are specific', 20]],
    unstuck: [['input() is not available', 'Put the value directly in your code instead.']],
  };
}

export function makeChapter1() {
  return {
    id: 'chapter-1', week: 1, chapter: 1,
    title: 'Excel and SQLite Projects',
    lede: P('Fixture chapter one.'),
    primaryDb: 'campus_travel.db', seedDb: null,
    filesShown: ['chapter-01/data/TicketSales.csv', 'chapter-01/data/FrequentFliers.txt'],
    pythonStarter: "import sqlite3\nconn = sqlite3.connect('campus_travel.db')\nprint(conn.execute('SELECT COUNT(*) FROM frequent_fliers').fetchone())\nconn.close()\n",
    confirmTexts: { reset: 'Reset campus_travel.db?', clear: 'Clear everything on this page?', replace: 'Replace campus_travel.db?' },
    messages: { noDb: 'No database yet — run the import in 1-35 step 1', afterReset: 'Database removed — run the import in 1-35 step 1 to recreate it' },
    unstuck: [['The misspelling came back', 'Run your step-6 UPDATE again.']],
    exercises: [
      {
        id: '1-34', kind: 'spreadsheet', title: 'Spreadsheet Application: Ticket Sales at Campus Travel',
        scenario: P('Scenario.'), data: P('Open <code>TicketSales.csv</code>.'), submit: P('Your written answers go in the boxes on this page and are included when you Export my work.'),
        notice: P('Which average would the regional manager actually want?'),
        steps: [
          { label: '1', html: P('Open the file.') },
          { label: '2', html: table({ caption: 'Summary cells', head: ['Label', 'Formula'], rows: [['Total', '=SUM(D2:D36)'], ['Most', '=MAX(D2:D36)']] }) + P('Fill the cells.') },
          { label: 'notice', html: P('Two or three sentences.'), workspaces: [{ tool: 'text', id: 'a1-34-notice', rows: 4 }] },
        ],
      },
      {
        id: '1-35', kind: 'database', title: 'Database Application: Frequent Fliers',
        scenario: P('Scenario.'), data: P('<code>FrequentFliers.txt</code> is tab-delimited.'), submit: P('Hand in campus_travel.db and ch1-queries.md.'),
        steps: [
          { label: '1', html: P('Import the file. Read the schema it prints.'), workspaces: [{ tool: 'terminal', id: 't1-35-1', command: 'python load_data.py chapter-01/data/FrequentFliers.txt frequent_fliers campus_travel.db', expect: ['Loaded 43 rows'] }] },
          { label: '2', html: P('In the <a href="#database">Database panel</a>, click Browse.') },
          { label: '3', html: P('Which column type surprises you?'), workspaces: [{ tool: 'text', id: 'a1-35-3', rows: 3 }] },
          { label: '5a', html: P('Vegan customers sorted by last name.'), workspaces: [{ tool: 'sql', id: 's1-35-5a', expect: ['13 rows'], placeholder: '-- 5a' }] },
          { label: '6', html: P('Fix the misspelling and re-run (e).'), workspaces: [{ tool: 'sql', id: 's1-35-6', expect: ['OK · 6 rows changed', '3 rows again'], starter: '' }] },
          { label: 'explore', optional: true, html: P('Read the table from Python.'), workspaces: [{ tool: 'python', id: 'p1-35-explore', snippet: "import sqlite3\nconn = sqlite3.connect('campus_travel.db')\nprint(conn.execute('SELECT COUNT(*) FROM frequent_fliers').fetchone())\nconn.close()\n" }] },
        ],
      },
    ],
  };
}

export function makeChapter2() {
  return {
    id: 'chapter-2', week: 1, chapter: 2,
    title: 'Excel and SQLite Projects',
    lede: P('Fixture chapter two.'),
    primaryDb: 'mileage.db', seedDb: null,
    filesShown: ['chapter-02/data/TCO.csv'],
    pythonStarter: "import sqlite3\nconn = sqlite3.connect('mileage.db')\nfor row in conn.execute(\"SELECT name FROM sqlite_master WHERE type='table'\"):\n    print(row)\nconn.close()\n",
    confirmTexts: { reset: 'Reset mileage.db?', clear: 'Clear everything on this page?', replace: 'Replace mileage.db?' },
    messages: {
      noDb: 'No database yet — your first successful CREATE TABLE in 2-37 step 2 creates mileage.db',
      afterReset: 'Database removed — run 2-37 step 2 again to recreate it',
      wrongName: 'Give the file the exact name mileage.db, or pick it here.',
      sideDbs: { 'scratch.db': 'scratch.db is the separate practice file from the optional Python step; the SQL boxes still use mileage.db.' },
    },
    exercises: [
      {
        id: '2-36', kind: 'spreadsheet', title: 'Spreadsheet Application: Total Cost of Ownership',
        scenario: P('Scenario.'), data: P('Open <code>TCO.csv</code>.'), submit: P('Your written answers go in the boxes on this page and are included when you Export my work.'),
        steps: [{ label: '1', html: P('Total each row.') }, { label: '5', html: P('Why not type N/A?'), workspaces: [{ tool: 'text', id: 'a2-36-5', rows: 3 }] }],
      },
      {
        id: '2-37', kind: 'database', title: 'Database Application: Designing the Frequent-Flier Database',
        scenario: P('Scenario.'), data: P('The page’s database is mileage.db; your first successful CREATE TABLE creates it.'), submit: P('Hand in mileage.db and ch2-database.md.'),
        steps: [
          { label: '2', html: P('Create the three tables.'), workspaces: [{ tool: 'sql', id: 's2-37-2', starter: 'DROP TABLE IF EXISTS flights;\nDROP TABLE IF EXISTS customers;\nDROP TABLE IF EXISTS airlines;\n', expect: ['3 tables in the Database panel'] }] },
          { label: '3', html: P('Insert the data.'), workspaces: [{ tool: 'sql', id: 's2-37-3', expect: ['after any re-run of step 2, run this box again'] }] },
          { label: '4', html: P('One failing statement per Run.'), workspaces: [{ tool: 'sql', id: 's2-37-4', expect: ['1 INSERT'] }, { tool: 'text', id: 'a2-37-4', rows: 3 }, { tool: 'sql', id: 's2-37-4b', optional: true }] },
          { label: '5b', html: P('Total miles per customer.'), workspaces: [{ tool: 'sql', id: 's2-37-5b', expect: ['one row per customer', 'the customer with no flights shows 0, not missing'] }] },
          { label: 'explore', optional: true, html: P('executemany into scratch.db.'), workspaces: [{ tool: 'python', id: 'p2-37-explore', snippet: "import sqlite3\nconn = sqlite3.connect('scratch.db')\nconn.execute('CREATE TABLE IF NOT EXISTS t(x)')\nconn.commit()\nconn.close()\n" }] },
        ],
      },
    ],
  };
}

export function makeChapter3() {
  return {
    id: 'chapter-3', week: 1, chapter: 3,
    title: 'Excel and SQLite Projects',
    lede: P('Fixture chapter three.'),
    primaryDb: 'chapter-03/employees.db', seedDb: 'chapter-03/employees.db',
    filesShown: ['chapter-03/employees.db', 'chapter-03/data/frequentflier2.xlsx'],
    pythonStarter: "import sqlite3\nconn = sqlite3.connect('chapter-03/employees.db')\nfor row in conn.execute('SELECT office, COUNT(*) FROM employees GROUP BY office'):\n    print(row)\nconn.close()\n",
    confirmTexts: { reset: 'This restores the original 24-row employees.db and discards your ALTER TABLE change.', clear: 'Clear everything on this page?', replace: 'Replace employees.db?' },
    exercises: [
      {
        id: '3-40', kind: 'spreadsheet', title: 'Spreadsheet Application: Mileage Report',
        scenario: P('Scenario.'), data: P('Open <code>frequentflier2.xlsx</code>.'), submit: P('Your written answers go in the boxes on this page and are included when you Export my work.'),
        steps: [{ label: '8', html: P('What did you notice?'), workspaces: [{ tool: 'text', id: 'a3-40-8', rows: 3 }] }],
      },
      {
        id: '3-41', kind: 'database', title: 'Database Application: Knowledge Database',
        scenario: P('Scenario.'), data: P('employees.db is already on this page.'), submit: P('Hand in employees.db and ch3-queries.md.'),
        steps: [
          { label: '2a', html: P('British Airways experts.'), workspaces: [{ tool: 'sql', id: 's3-41-2a', expect: ['7 rows'] }] },
          { label: '3', html: P('The Lewiston call.'), workspaces: [{ tool: 'sql', id: 's3-41-3', expect: ['one query', 'then 2–3 sentences about staffing at that office'] }, { tool: 'text', id: 'a3-41-3', rows: 4 }] },
          { label: '5', html: P('Add a primary key.'), workspaces: [{ tool: 'sql', id: 's3-41-5', expect: ['employee_id appears in Structure'] }, { tool: 'text', id: 'a3-41-5', rows: 3 }] },
          { label: 'explore', optional: true, html: P('Python view.'), workspaces: [{ tool: 'python', id: 'p3-41-explore', snippet: "import sqlite3\nconn = sqlite3.connect('chapter-03/employees.db')\nprint(conn.execute('SELECT COUNT(*) FROM employees').fetchone())\nconn.close()\n" }] },
        ],
      },
    ],
  };
}

export function makeChapters() { return [makeChapter1(), makeChapter2(), makeChapter3()]; }

// Solutions with @step / @alt markers that run against the real shipped data.
export const SOLUTIONS = {
  1: `-- fixture solutions, chapter 1
-- @step s1-35-5a
-- (a) Vegan customers.  Expect 13 rows.
SELECT first_name, last_name, airline
FROM frequent_fliers
WHERE meal_category = 'Vegan'
ORDER BY last_name;

-- @step s1-35-6
UPDATE frequent_fliers SET seating_area = 'Emergency Exit' WHERE seating_area = 'Emgerency Exit';
SELECT seating_area, COUNT(*) AS customers FROM frequent_fliers GROUP BY seating_area ORDER BY customers DESC;

-- @alt 1-35-7-example
SELECT city, COUNT(*) AS customers FROM frequent_fliers GROUP BY city ORDER BY customers DESC;
`,
  2: `-- fixture solutions, chapter 2
-- @step s2-37-2
DROP TABLE IF EXISTS flights;
DROP TABLE IF EXISTS customers;
DROP TABLE IF EXISTS airlines;
CREATE TABLE airlines (airline_id INTEGER PRIMARY KEY, airline_name TEXT NOT NULL UNIQUE);
CREATE TABLE customers (customer_id INTEGER PRIMARY KEY, last_name TEXT NOT NULL, frequent_flier_number TEXT UNIQUE, airline_id INTEGER REFERENCES airlines(airline_id));
CREATE TABLE flights (flight_id INTEGER PRIMARY KEY, customer_id INTEGER REFERENCES customers(customer_id), miles INTEGER NOT NULL CHECK (miles > 0));

-- @step s2-37-3
INSERT INTO airlines VALUES (1, 'American Airlines'), (2, 'British Airways');
INSERT INTO customers VALUES (1, 'Nauman', 'FF742971', 2), (2, 'Looney', 'FF401419', 1), (3, 'Baker', 'FF219608', 1);
INSERT INTO flights VALUES (1, 1, 228), (2, 1, 4783), (3, 2, 1519), (4, 2, 1121);

-- @step s2-37-4-check
INSERT INTO flights (customer_id, miles) VALUES (1, -5);

-- @step s2-37-4-cleanup
DELETE FROM flights WHERE customer_id = 999;

-- @step s2-37-5b
SELECT c.last_name, COALESCE(SUM(f.miles), 0) AS total_miles
FROM customers c LEFT JOIN flights f ON f.customer_id = c.customer_id
GROUP BY c.customer_id, c.last_name
ORDER BY total_miles DESC;
`,
  3: `-- fixture solutions, chapter 3
-- @step s3-41-2a
SELECT firstname, lastname, office, home_phone FROM employees WHERE expertise = 'British Airways' ORDER BY lastname;

-- @step s3-41-3
SELECT firstname, lastname, office, home_phone FROM employees WHERE office = 'Lewiston' AND expertise = 'British Airways';
-- 0 rows.

-- @step s3-41-5
ALTER TABLE employees ADD COLUMN employee_id INTEGER;
UPDATE employees SET employee_id = rowid;

-- @alt 3-41-5-rebuild
CREATE TABLE employees_new (employee_id INTEGER PRIMARY KEY, lastname TEXT);
`,
};

// No '/home/': the terminal's `pwd` prints /home/pyodide/week1 (the in-browser MEMFS root) and the whole
// transcript is exported, so that exclusion is false the moment a student runs pwd. The real host-path
// exclusions below, and doExport's location./file:// scan, are what actually hold.
const EXCLUDES = ['file://', '/Users/', 'C:\\'];
// check.mjs requires every python workspace snippet and every pythonStarter to be driven verbatim, so the
// fixture's expected scripts read them from the fixture's own chapters rather than repeating them.
const FIXTURE_CHAPTERS = makeChapters();
export const PY_STARTERS = Object.fromEntries(FIXTURE_CHAPTERS.map((c) => [c.chapter, c.pythonStarter]));
export const PY_SNIPPETS = Object.fromEntries(FIXTURE_CHAPTERS.flatMap((c) => c.exercises.flatMap((ex) => (ex.steps || []).flatMap((st) => (st.workspaces || []).filter((w) => w.tool === 'python').map((w) => [w.id, w.snippet])))));

export const EXPECTED = {
  1: {
    chapter: 1, page: 'week-1-chapter-1.html',
    actions: [
      { terminal: 'python load_data.py chapter-01/data/FrequentFliers.txt frequent_fliers campus_travel.db', expect: { stdoutIncludes: ["Loaded 43 rows into 'frequent_fliers'", 'zip INTEGER'] } },
      { tables: { frequent_fliers: 43 } },
      { sql: 's1-35-5a', block: 's1-35-5a', expect: { results: [{ rows: 13, cell: [0, 1, 'Baker'] }] } },
      { sql: 's1-35-6', block: 's1-35-6', expect: { changed: 6, results: [{ rows: 3, cell: [2, 0, 'Emergency Exit'] }] } },
      { downloadDb: true, expect: { sqlite3: [['SELECT COUNT(*) FROM frequent_fliers', '43'], ["SELECT COUNT(*) FROM frequent_fliers WHERE seating_area = 'Emgerency Exit'", '0']] } },
      // the page's pythonStarter, which this fixture also uses as p1-35-explore's snippet: check.mjs requires
      // every python snippet and every pythonStarter to be driven VERBATIM by a python action
      { python: PY_STARTERS[1], expect: { stdoutIncludes: ['(43,)'] } },
      { export: true, expect: { includes: ['## 1-34', '## 1-35', 'Loaded 43 rows', 'Emergency Exit', 'Terminal transcript', 'Python cell', 'Database at export time'], excludes: EXCLUDES } },
      { reload: true, expect: { restored: ['s1-35-5a', 's1-35-6'], tables: { frequent_fliers: 43 } } },
      { reset: true, expect: { tables: {} } },
      { xssCanary: true },
      { offline: true },
    ],
  },
  2: {
    chapter: 2, page: 'week-1-chapter-2.html',
    actions: [
      { tables: {} },
      { sql: 's2-37-2', block: 's2-37-2', expect: { tables: { airlines: 0, customers: 0, flights: 0 } } },
      { sql: 's2-37-3', block: 's2-37-3', expect: { tables: { airlines: 2, customers: 3, flights: 4 } } },
      { sql: 's2-37-4', block: 's2-37-4-check', expect: { errorIncludes: 'CHECK constraint failed: miles > 0' } },
      { sql: 's2-37-4', block: 's2-37-4-cleanup', expect: { changed: 0, tables: { airlines: 2, customers: 3, flights: 4 } } },
      { sql: 's2-37-5b', block: 's2-37-5b', expect: { results: [{ rows: 3, cell: [2, 0, 'Baker'] }] } },
      { python: PY_STARTERS[2], expect: { stdoutIncludes: ["('airlines',)", "('flights',)"] } },
      { python: PY_SNIPPETS['p2-37-explore'] },
      { downloadDb: true, expect: { sqlite3: [['SELECT COUNT(*) FROM flights', '4'], ['PRAGMA foreign_key_check', '']] } },
      { export: true, expect: { includes: ['## 2-36', '## 2-37', 'CREATE TABLE flights', 'Baker', 'Database at export time'], excludes: EXCLUDES } },
      { reload: true, expect: { restored: ['s2-37-2', 's2-37-3', 's2-37-4', 's2-37-5b'], tables: { airlines: 2, customers: 3, flights: 4 } } },
      { reset: true, expect: { tables: {} } },
      { xssCanary: true },
      { offline: true },
    ],
  },
  3: {
    chapter: 3, page: 'week-1-chapter-3.html',
    actions: [
      { tables: { employees: 24 } },
      { sql: 's3-41-2a', block: 's3-41-2a', expect: { results: [{ rows: 7, cell: [0, 1, 'Boyd'] }] } },
      { sql: 's3-41-3', block: 's3-41-3', expect: { results: [{ rows: 0 }] } },
      { sql: 's3-41-5', block: 's3-41-5', expect: { changed: 24, tables: { employees: 24 } } },
      { downloadDb: true, expect: { sqlite3: [['SELECT COUNT(*) FROM employees', '24'], ['SELECT MAX(employee_id) FROM employees', '24']] } },
      { export: true, expect: { includes: ['## 3-40', '## 3-41', 'Boyd', 'employee_id', 'CREATE TABLE employees'], excludes: EXCLUDES } },
      { reload: true, expect: { restored: ['s3-41-2a', 's3-41-3', 's3-41-5'], tables: { employees: 24 } } },
      { python: PY_SNIPPETS['p3-41-explore'], expect: { stdoutIncludes: ['(24,)'] } },
      { python: PY_STARTERS[3], expect: { stdoutIncludes: ["('Pullman', 12)"] } },
      { reset: true, expect: { tables: { employees: 24 } } },
      { xssCanary: true },
      { offline: true },
    ],
  },
};

// Write `chapter-N.mjs` + `handout.mjs` (as JSON default exports) into dir.
export function writeContentDir(dir, chapters = makeChapters(), handout = makeHandout()) {
  mkdirSync(dir, { recursive: true });
  for (const c of chapters) writeFileSync(join(dir, `${c.id}.mjs`), `export default ${JSON.stringify(c, null, 1)};\n`);
  writeFileSync(join(dir, 'handout.mjs'), `export default ${JSON.stringify(handout, null, 1)};\n`);
  return dir;
}

// Write solutions-chN.sql + expected/chapter-N.json (+ two small docs) into dir.
export function writeInstructorDir(dir, chapters = [1, 2, 3]) {
  mkdirSync(join(dir, 'expected'), { recursive: true });
  for (const n of chapters) {
    writeFileSync(join(dir, `solutions-ch${n}.sql`), SOLUTIONS[n]);
    writeFileSync(join(dir, 'expected', `chapter-${n}.json`), JSON.stringify(EXPECTED[n], null, 2) + '\n');
  }
  writeFileSync(join(dir, 'README-INSTRUCTOR.md'), '# fixture instructor notes\n');
  writeFileSync(join(dir, 'ANSWER-KEY.md'), '# fixture answer key\n');
  return dir;
}

// A week dir with the 7 allow-listed files copied from the real Week 1 folder plus a placeholder PDF.
export function writeWeekDir(dir, { pdf = true, source = DEFAULTS.weekDir } = {}) {
  for (const rel of ALLOW_LIST) {
    const src = join(source, rel);
    if (!existsSync(src)) throw new Error(`fixture: ${src} is missing`);
    mkdirSync(join(dir, rel, '..'), { recursive: true });
    copyFileSync(src, join(dir, rel));
  }
  if (pdf) writeFileSync(join(dir, 'Application-Exercises-Week-1.pdf'), '%PDF-1.4\n% fixture placeholder, not a real handout\n');
  return dir;
}
