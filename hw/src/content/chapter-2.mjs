// Week 1 · Chapter 2 — content for the browser edition of the application
// exercises. Prose only: the runtime never reads this file; build.mjs renders
// it into week-1-chapter-2.html and into the printable handout.
//
// Wording follows the handout (Application-Exercises-Week-1.pdf) step for
// step; only what the medium changes has been rewritten (DB Browser for
// SQLite → the SQL boxes and the Database panel on this page).

import { table } from '../schema.mjs';

const schemaTables = [
  table({
    caption: 'airlines',
    head: ['Column', 'Type', 'Notes'],
    rows: [
      ['airline_id', 'INTEGER', 'primary key'],
      ['airline_name', 'TEXT', 'required, and no two airlines may share a name'],
      ['alliance', 'TEXT', 'e.g. Star Alliance, SkyTeam, Oneworld'],
    ],
  }),
  table({
    caption: 'customers',
    head: ['Column', 'Type', 'Notes'],
    rows: [
      ['customer_id', 'INTEGER', 'primary key'],
      ['last_name', 'TEXT', 'required'],
      ['first_name', 'TEXT', 'required'],
      ['phone_number', 'TEXT', ''],
      ['frequent_flier_number', 'TEXT', 'no two customers may share one'],
      ['airline_id', 'INTEGER', 'foreign key referencing airlines'],
    ],
  }),
  table({
    caption: 'flights',
    head: ['Column', 'Type', 'Notes'],
    rows: [
      ['flight_id', 'INTEGER', 'primary key'],
      ['customer_id', 'INTEGER', 'foreign key referencing customers'],
      ['flight_date', 'TEXT', 'store as YYYY-MM-DD'],
      ['origin', 'TEXT', 'three-letter airport code'],
      ['destination', 'TEXT', 'three-letter airport code'],
      ['miles', 'INTEGER', 'required, and must be greater than zero'],
    ],
  }),
].join('');

const step2Starter = [
  '-- Run this box as often as you like. The three DROP lines clear the old',
  '-- tables first: flights before customers before airlines, because flights',
  '-- points at customers and customers points at airlines.',
  'DROP TABLE IF EXISTS flights;',
  'DROP TABLE IF EXISTS customers;',
  'DROP TABLE IF EXISTS airlines;',
  '',
  '-- Your three CREATE TABLE statements go here, airlines first.',
  '',
].join('\n');

const step4Starter = [
  '-- One INSERT that should fail. Run it and read the error message.',
  '-- Testing the foreign key? Put this line above your INSERT:',
  '-- PRAGMA foreign_keys = ON;',
  '-- Cleaning up a row that got in? Run the DELETE on its own, or above',
  '-- the INSERT: nothing below a failing statement is run.',
  '',
].join('\n');

const exploreSnippet = [
  '# Optional: Python can add many rows at once with executemany().',
  '# This writes to scratch.db, a separate practice file. It never touches',
  '# mileage.db, so nothing you built for 2-37 changes.',
  'import sqlite3',
  "conn = sqlite3.connect('scratch.db')",
  "conn.execute('DROP TABLE IF EXISTS airports')",
  "conn.execute('CREATE TABLE airports (code TEXT PRIMARY KEY, city TEXT)')",
  'rows = [',
  "    ('PUW', 'Pullman'),",
  "    ('SEA', 'Seattle'),",
  "    ('LHR', 'London Heathrow'),",
  ']',
  "conn.executemany('INSERT INTO airports VALUES (?, ?)', rows)",
  'conn.commit()',
  "for row in conn.execute('SELECT * FROM airports ORDER BY code'):",
  '    print(row)',
  'conn.close()',
  '',
].join('\n');

export default {
  id: 'chapter-2',
  week: 1,
  chapter: 2,
  title: 'Excel and SQLite Projects',
  lede:
    '<p>Two exercises. In 2-36 you build a total-cost-of-ownership model in Excel. ' +
    'In 2-37 you design a three-table frequent-flier database from scratch: the ' +
    '<code>CREATE TABLE</code> statements, the test data, the constraint tests and the ' +
    'queries all run in the SQL boxes on this page, and the database file you build is ' +
    'yours to download.</p>',
  primaryDb: 'mileage.db',
  seedDb: null,
  messages: {
    noDb: 'No database yet — your first successful CREATE TABLE in 2-37 step 2 creates mileage.db',
    afterReset: 'Database removed — run 2-37 step 2 again to recreate it',
    // this page has no import to re-run: a Python file with the wrong name just needs the right one
    wrongName: 'Give the file the exact name mileage.db, or pick it here.',
    // the optional step writes scratch.db on purpose — an information note, not the wrong-name warning
    sideDbs: { 'scratch.db': 'scratch.db is the separate practice file from the optional Python step; the SQL boxes still use mileage.db.' },
  },
  filesShown: ['chapter-02/data/TCO.csv'],
  pythonStarter:
    '# Read-only look at your database. Run it after step 3 of 2-37,\n' +
    '# when mileage.db has tables in it.\n' +
    'import sqlite3\n' +
    "conn = sqlite3.connect('mileage.db')\n" +
    "for row in conn.execute('SELECT airline_name, alliance FROM airlines ORDER BY airline_name'):\n" +
    '    print(row)\n' +
    'conn.close()\n',
  confirmTexts: {
    reset:
      'This deletes mileage.db — the tables and test data you built in 2-37 — so the page ' +
      'starts with no database again. Download mileage.db first if you want to keep it.',
    clear:
      'This erases everything you typed on this page (your written answers, your SQL, the ' +
      'terminal and the Python cell) and deletes mileage.db from this browser. Export my ' +
      'work and Download mileage.db first if you want to keep them.',
    replace:
      'Replace the database on this page with the file you chose? The tables and test data ' +
      'now in mileage.db will be lost unless you Download them first.',
  },
  // Chapter-specific "Getting unstuck" entry (rendered with the shared browser-edition entries).
  unstuck: [
    ['UNIQUE constraint failed: airlines.airline_id',
      'You re-ran the step-3 <code>INSERT</code> box on rows that are already in the tables. Run step 2 first — it ' +
      'rebuilds the three tables from empty — then run step 3 again.'],
  ],
  exercises: [
    {
      id: '2-36',
      kind: 'spreadsheet',
      title: 'Spreadsheet Application: Valuing Information Systems',
      scenario:
        '<p>Your organization runs a main campus, two branch campuses, and two small stations. ' +
        'You have been handed the annual cost of the network infrastructure broken out by site ' +
        'and by category, and asked to work out the total cost of ownership so leadership can ' +
        'decide where consolidation would save the most money.</p>',
      data:
        '<p><code>chapter-02/data/TCO.csv</code> — nine cost categories down the side, five sites ' +
        'across the top. Some cells are empty on purpose: not every site has every cost. The file ' +
        'is in your Week 1 folder, and you can also download it from the Files list further down ' +
        'this page.</p>',
      submit:
        '<p><code>TCO.xlsx</code>, with formulas and both charts. Your written answers go in the ' +
        'boxes on this page and are included when you Export my work.</p>',
      steps: [
        { label: '1', html: '<p>Open the file in Excel and save it as <code>TCO.xlsx</code>.</p>' },
        {
          label: '2',
          html:
            '<p>Fill in the <strong>TOTAL</strong> column so each cost category shows its total ' +
            'across all five sites.</p>',
        },
        {
          label: '3',
          html:
            '<p>Fill in the <strong>TOTAL</strong> row so each site shows its total across all ' +
            'nine categories.</p>',
        },
        {
          label: '4',
          html:
            '<p>Put the grand total in the cell where that row and column meet. Then check your ' +
            'work: the sum of the row totals and the sum of the column totals must be the same ' +
            'number. If they are not, you have missed a cell.</p>',
        },
        {
          label: '5',
          html:
            '<p>The empty cells matter. <code>SUM</code> treats a blank as zero, which is what you ' +
            'want here. In one sentence, say what would go wrong if those blanks held the text ' +
            '<code>"N/A"</code> instead.</p>',
          workspaces: [
            {
              tool: 'text',
              id: 'a2-36-5',
              rows: 3,
              label: 'Step 5 — what would go wrong if the blanks held "N/A"?',
            },
          ],
        },
        {
          label: '6',
          html:
            '<p>Format every currency cell with a dollar sign, thousands separators, and no ' +
            'decimal places.</p>',
        },
        {
          label: '7',
          html:
            '<p>Add a column headed <strong>% of Total</strong> showing what share of the grand ' +
            'total each cost category represents. Use an absolute reference (<code>$</code>) for ' +
            'the grand total so the formula fills down correctly, and format the column as a ' +
            'percentage with one decimal place.</p>',
        },
        {
          label: '8',
          html: '<p>Sort the cost categories from most expensive to least expensive.</p>',
        },
        {
          label: '9',
          html: '<p>Build a pie chart of cost by category and a column chart of cost by site.</p>',
        },
        {
          label: '10',
          html:
            '<p>Write two or three sentences answering: <strong>which single category dominates ' +
            'this budget, and what does that suggest about where consolidation would actually ' +
            'save money?</strong> Support your answer with your own numbers.</p>',
          workspaces: [
            {
              tool: 'text',
              id: 'a2-36-10',
              rows: 5,
              label: 'Step 10 — which category dominates, and where would consolidation save money?',
            },
          ],
        },
      ],
    },
    {
      id: '2-37',
      kind: 'database',
      title: 'Database Application: Designing the Frequent-Flier Database',
      scenario:
        '<p>In Chapter 1 you loaded the frequent-flier list into a single flat table, which is ' +
        'exactly how it arrived. That table repeats the airline name on every row that uses it, ' +
        'and offers no place to record an individual flight. Campus Travel now wants to track ' +
        'actual mileage, so the design has to change. You will build the database from scratch ' +
        'this time, writing the <code>CREATE TABLE</code> statements yourself.</p>',
      data:
        '<p>None supplied — you are designing the structure and entering a small amount of test ' +
        'data of your own. This page starts with no database. Its database is ' +
        '<code>mileage.db</code>: the first time a <code>CREATE TABLE</code> in step 2 succeeds, ' +
        'the page makes the file and the <a href="#database">Database panel</a> starts listing ' +
        'your tables. Until then the panel and the Download button say there is no database yet.</p>',
      submit:
        '<p><code>mileage.db</code> (press <strong>Download mileage.db</strong> in the toolbar), ' +
        'plus <code>ch2-database.md</code>, made by <strong>Export my work</strong>, which contains ' +
        'your <code>CREATE TABLE</code> statements, your failed-insert evidence from step 4, all ' +
        'five queries with results, and your step-6 paragraph. Your written answers go in the ' +
        'boxes on this page and are included when you Export my work.</p>',
      steps: [
        {
          label: '1',
          html:
            '<p>This page’s database is <code>mileage.db</code>. There is nothing to create by ' +
            'hand: your first successful <code>CREATE TABLE</code> statement in step 2 creates ' +
            'it. Open the <a href="#database">Database panel</a> now and notice that it is empty; ' +
            'come back to it after each step to watch the tables and their row counts appear.</p>',
        },
        {
          label: '2',
          html:
            '<p>In the SQL box below, write <code>CREATE TABLE</code> statements for three tables:</p>' +
            schemaTables +
            '<p>Use <code>PRIMARY KEY</code>, <code>NOT NULL</code>, <code>UNIQUE</code>, ' +
            '<code>CHECK</code>, and <code>FOREIGN KEY</code> where the notes call for them. ' +
            'Create <code>airlines</code> first, then <code>customers</code>, then ' +
            '<code>flights</code>, because each one refers to the one before it.</p>' +
            '<p>Keep the three <code>DROP TABLE IF EXISTS</code> lines at the top of the box ' +
            '(<code>flights</code>, then <code>customers</code>, then <code>airlines</code>). ' +
            'Re-running this box rebuilds the three tables from empty, so if you change it later, ' +
            'run step 3 again afterwards. Your finished <code>CREATE TABLE</code> statements stay in ' +
            'this box and go into <code>ch2-database.md</code> when you Export my work.</p>',
          workspaces: [
            {
              tool: 'sql',
              id: 's2-37-2',
              expect: ['3 tables in the Database panel', '0 rows each until step 3'],
              placeholder: '-- 2: DROP TABLE IF EXISTS … then three CREATE TABLE statements',
              starter: step2Starter,
            },
          ],
        },
        {
          label: '3',
          html:
            '<p>Insert 4 airlines, 6 customers spread across those airlines, and at least 15 ' +
            'flights spread across those customers, using <code>INSERT INTO</code>. Make the data ' +
            'plausible — real airline names, real airport codes, dates within the last year. ' +
            'Include one customer who has enrolled but has not flown yet — you will need them in ' +
            'step 5b. That customer can be one of the six, or a seventh.</p>' +
            '<p>Insert the airlines first, then the customers, then the flights, in the same order ' +
            'you created the tables. After each Run, check the row counts in the ' +
            '<a href="#database">Database panel</a> and click <strong>Browse</strong> on a table ' +
            'to see the rows.</p>' +
            '<p>To run this box again — for example after adding the customer who has not flown — ' +
            'run step 2 first (it empties the three tables), then this box. Run on its own it stops ' +
            'at <code>UNIQUE constraint failed</code>, because the rows are already there.</p>',
          workspaces: [
            {
              tool: 'sql',
              id: 's2-37-3',
              expect: [
                '4 airlines',
                'at least 6 customers',
                'at least 15 flights',
                'after any re-run of step 2, run this box again',
              ],
              placeholder: '-- 3: INSERT INTO airlines …, customers …, flights …',
              starter: '',
            },
          ],
        },
        {
          label: '4',
          html:
            '<p>Prove your constraints work. Write an <code>INSERT</code> that should fail, run ' +
            'it, and record the error message SQLite gives you. Then say in one sentence which ' +
            'constraint stopped it and why that is a good thing. Good candidates: a flight with ' +
            '<code>miles</code> of <code>-100</code>, a second customer with a frequent-flier ' +
            'number already in use, or a flight pointing at a <code>customer_id</code> that does ' +
            'not exist.</p>' +
            '<p>One failing statement per Run — the page stops at the first error. Keep the one ' +
            'you are writing about in this box. The error message is saved with the box and goes ' +
            'into your export; the sentence goes in the written-answer box underneath.</p>' +
            '<p><strong>Note:</strong> SQLite does not enforce foreign keys unless you turn them ' +
            'on. If your “failing” insert did not fail, it is now in your table. Add ' +
            '<code>PRAGMA foreign_keys = ON;</code> above the <code>INSERT</code> and delete the ' +
            'stray row (<code>DELETE FROM flights WHERE customer_id = 999;</code>) before moving ' +
            'on. Put the <code>DELETE</code> on its own Run, or above the <code>INSERT</code> — ' +
            'anything below a failing statement never runs. Each Run opens your database fresh, ' +
            'so the <code>PRAGMA</code> line must be in the same box as the <code>INSERT</code> ' +
            'it protects.</p>' +
            '<p>The optional second box is for one more failing <code>INSERT</code> if you want to ' +
            'test a second constraint — the same rules apply.</p>' +
            '<p>This is the step that separates designs; take it seriously even if it takes a ' +
            'few tries.</p>',
          workspaces: [
            {
              tool: 'sql',
              id: 's2-37-4',
              expect: ['1 INSERT', 'the output is an error message, not a result'],
              placeholder: '-- 4: one INSERT that should fail',
              starter: step4Starter,
            },
            {
              tool: 'text',
              id: 'a2-37-4',
              rows: 3,
              label: 'Step 4 — which constraint stopped it, and why is that a good thing?',
            },
            {
              tool: 'sql',
              id: 's2-37-4b',
              optional: true,
              label: 'Optional second failing INSERT (step 4)',
              placeholder: '-- 4 (optional): a second INSERT that should fail',
              starter: '',
            },
          ],
        },
        { label: '5', html: '<p>Write and run these queries:</p>' },
        {
          label: '5a',
          html:
            '<p>Every customer with the name of their airline, using a <code>JOIN</code>. Sort by ' +
            'last name.</p>',
          workspaces: [
            {
              tool: 'sql',
              id: 's2-37-5a',
              expect: ['one row per customer', 'airline name, not airline_id'],
              placeholder: '-- 5a',
              starter: '',
            },
          ],
        },
        {
          label: '5b',
          html:
            '<p>Total miles flown by each customer, most miles first. Use <code>JOIN</code>, ' +
            '<code>GROUP BY</code>, and <code>SUM</code>. Include customers with no flights at ' +
            'all — that will require a <code>LEFT JOIN</code>.</p>',
          workspaces: [
            {
              tool: 'sql',
              id: 's2-37-5b',
              expect: ['one row per customer', 'the customer with no flights shows 0, not missing'],
              placeholder: '-- 5b',
              starter: '',
            },
          ],
        },
        {
          label: '5c',
          html: '<p>Total miles flown on each airline.</p>',
          workspaces: [
            {
              tool: 'sql',
              id: 's2-37-5c',
              expect: ['4 rows'],
              placeholder: '-- 5c',
              starter: '',
            },
          ],
        },
        {
          label: '5d',
          html:
            '<p>Every flight over 1,000 miles, showing the customer’s name, the date, the ' +
            'route, and the mileage.</p>',
          workspaces: [
            {
              tool: 'sql',
              id: 's2-37-5d',
              expect: ['flights over 1,000 miles only', 'name, date, route, miles'],
              placeholder: '-- 5d',
              starter: '',
            },
          ],
        },
        {
          label: '5e',
          html: '<p>The single customer who has flown the most miles.</p>',
          workspaces: [
            {
              tool: 'sql',
              id: 's2-37-5e',
              expect: ['1 row'],
              placeholder: '-- 5e',
              starter: '',
            },
          ],
        },
        {
          label: '6',
          html:
            '<p>Compare this design with the flat table from Exercise 1-35. In one short ' +
            'paragraph, name <strong>two specific things this three-table design lets you do that ' +
            'the flat table could not, and one thing that got harder</strong>.</p>',
          workspaces: [
            {
              tool: 'text',
              id: 'a2-37-6',
              rows: 6,
              label: 'Step 6 — two things this design lets you do, and one thing that got harder',
            },
          ],
        },
        {
          label: 'explore',
          optional: true,
          html:
            '<p><strong>Optional.</strong> Python can add many rows at once with ' +
            '<code>executemany()</code>. This example writes to a separate practice file, ' +
            '<code>scratch.db</code>, never to <code>mileage.db</code>, so nothing you built for ' +
            '2-37 changes. Put it in the Python cell and press Run Python. Afterwards the ' +
            '<a href="#database">Database panel</a> lists <code>scratch.db</code> as a second file; ' +
            'leave <code>mileage.db</code> selected for the SQL boxes.</p>',
          workspaces: [{ tool: 'python', id: 'p2-37-explore', snippet: exploreSnippet }],
        },
      ],
    },
  ],
};
