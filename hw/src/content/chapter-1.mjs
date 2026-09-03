// Week 1 · Chapter 1 — exercise content for the browser edition.
// Prose only: build.mjs renders it into week-1-chapter-1.html at build time.
// Workspace ids are the canonical ids shared with the solutions SQL for this chapter
// (`-- @step <id>` blocks) and with expected/chapter-1.json (verification actions).

import { table } from '../schema.mjs';

const IMPORT_CMD = 'python load_data.py chapter-01/data/FrequentFliers.txt frequent_fliers campus_travel.db';
const REIMPORT_CMD = IMPORT_CMD + ' --text-columns zip frequent_flier_number';

export default {
  id: 'chapter-1',
  week: 1,
  chapter: 1,
  title: 'Excel and SQLite Projects',
  lede: '<p>Two exercises from Chapter 1. Exercise 1-34 is a spreadsheet exercise done in Excel. '
    + 'Exercise 1-35 is a database exercise done right here on this page: the database engine (SQLite) '
    + 'and the small Python import script both run inside your browser, so there is nothing to install. '
    + 'Your written answers go in the boxes on this page.</p>',
  primaryDb: 'campus_travel.db',
  seedDb: null,
  messages: {
    noDb: 'No database yet — run the import in 1-35 step 1, or press the button.',
    afterReset: 'Database removed — run the import in 1-35 step 1 to recreate it',
    // One button in the empty Tables list that runs exactly the step-1 command, so a student who opens the page
    // and wants to see the data does not have to find the step first. The transcript and the printed schema are
    // the same either way, and step 1 still asks them to read what it prints.
    noDbAction: { label: 'Load the data (runs 1-35 step 1)', ws: 't1-35-1' },
  },
  filesShown: ['chapter-01/data/TicketSales.csv', 'chapter-01/data/FrequentFliers.txt'],
  pythonStarter: "import sqlite3\nconn = sqlite3.connect('campus_travel.db')\nfor row in conn.execute('SELECT airline, COUNT(*) FROM frequent_fliers GROUP BY airline'):\n    print(row)\nconn.close()\n",
  confirmTexts: {
    reset: 'This removes campus_travel.db from this page. Your SQL and written answers stay. '
      + 'Download campus_travel.db first if you want to keep it. To start again, re-run the import in 1-35 step 1.',
    clear: 'This clears everything this page has saved in this browser: your name, every SQL box, your written answers, '
      + 'the Terminal transcript, the Python cell and campus_travel.db. '
      + 'Export my work and Download campus_travel.db first if you want to keep them.',
    replace: 'Replace the database on this page with the file you chose? The current campus_travel.db will be discarded — '
      + 'Download it first if you want to keep it.',
  },
  // Chapter-specific "Getting unstuck" entry (rendered with the shared browser-edition entries).
  unstuck: [
    ['The misspelling came back',
      'The re-import in step 4 rebuilds the table from the text file; run your step-6 UPDATE again.'],
  ],
  exercises: [
    {
      id: '1-34',
      kind: 'spreadsheet',
      title: 'Spreadsheet Application: Ticket Sales at Campus Travel',
      scenario: '<p>You are the office manager at Campus Travel. Your salespeople have logged every ticket sale for the '
        + 'first quarter, and you need a summary of the quarter for the regional manager.</p>',
      data: '<p><code>chapter-01/data/TicketSales.csv</code> — 35 sales, each with a date, a salesperson, a destination, '
        + 'and a number of tickets sold. Four label cells near the bottom of the sheet are waiting for your answers. '
        + 'The file is in your Week 1 folder, and it is also in the Files list on this page if you need another copy.</p>',
      steps: [
        {
          label: '1',
          html: '<p>Open <code>TicketSales.csv</code> in Excel and immediately save it as <code>TicketSales.xlsx</code>. '
            + 'Working in <code>.xlsx</code> means your formulas and formatting survive; a <code>.csv</code> file keeps neither.</p>',
        },
        {
          label: '2',
          html: '<p>Fill in the four summary cells next to the labels already in the sheet, using a formula in each one — '
            + 'not a number you worked out yourself:</p>'
            + table({
              caption: 'The four summary cells and the function each one uses',
              head: ['Label', 'Function to use'],
              rows: [
                ['Total Tickets Sold', 'SUM'],
                ['Most Tickets Sold', 'MAX'],
                ['Least Tickets Sold', 'MIN'],
                ['Average Number of Tickets Sold', 'AVERAGE'],
              ],
            }),
        },
        {
          label: '3',
          html: '<p>Format the <strong>Date Sold</strong> column as a date and widen every column so no value is cut off '
            + 'or showing as <code>####</code>.</p>',
        },
        {
          label: '4',
          html: '<p>Add a summary table on the same sheet, to the right of the data, showing total tickets sold by each '
            + 'salesperson. Use <code>SUMIF</code> (or a PivotTable if you prefer). List the six salespeople and their totals.</p>',
        },
        {
          label: '5',
          html: '<p>Add a second summary table showing total tickets sold to each destination, again with '
            + '<code>SUMIF</code> or a PivotTable.</p>',
        },
        {
          label: '6',
          html: '<p>Build a bar chart from your salesperson summary. Give it a title that says what it shows, and label the axes.</p>',
        },
        {
          label: '7',
          html: '<p>Sort the sales data by <strong>Salesperson</strong> (A to Z), then by <strong>Date Sold</strong> (oldest first). '
            + 'Be careful to sort the data rows only — do not drag the summary label rows into the sort.</p>',
        },
        {
          label: 'notice',
          html: '<p>Two or three sentences: which average would the regional manager actually want, and why?</p>',
          workspaces: [{ tool: 'text', id: 'a1-34-notice', rows: 4 }],
        },
      ],
      submit: '<p><code>TicketSales.xlsx</code>, with formulas intact. '
        + 'Your written answers go in the boxes on this page and are included when you Export my work.</p>',
      notice: '<p>Your <code>AVERAGE</code> will not be a whole number. Think about what a fractional ticket means, and whether '
        + '“average tickets per sale” is the number the regional manager actually wants, or whether '
        + '“average tickets per salesperson per month” would tell them more. You will be asked about this kind of '
        + 'distinction all term.</p>',
    },
    {
      id: '1-35',
      kind: 'database',
      title: 'Database Application: Tracking Frequent-Flier Miles at Campus Travel',
      scenario: '<p>Campus Travel keeps its frequent-flier customer list in a text file that gets passed around by email. '
        + 'Every time someone wants an answer — how many customers request kosher meals, which airline has the most enrolled '
        + 'customers — they scroll through the file by hand. You are going to put it in a database so those questions can be '
        + 'answered with a query instead.</p>',
      data: '<p><code>chapter-01/data/FrequentFliers.txt</code> — 43 customers, tab-delimited (each value is separated from '
        + 'the next by a tab character), with name, address, city, state, ZIP, phone, frequent-flier number, airline, meal '
        + 'category, and seating preference.</p>'
        + '<p>This page starts with no database. Step 1 creates <code>campus_travel.db</code>; from then on the '
        + '<a href="#database">Database panel</a> shows it, and the Download button in the toolbar saves it to your computer.</p>',
      steps: [
        {
          label: '1',
          html: '<p>In the Terminal, run the import below. Read the schema it prints — it is part of your export. '
            + 'You should see 43 rows loaded into a table called <code>frequent_fliers</code>.</p>'
            + '<p>The script that does the importing, <code>load_data.py</code>, has a View button in the Files list. '
            + 'Read its comments: you are expected to understand roughly what it is doing, not to have written it.</p>',
          workspaces: [{ tool: 'terminal', id: 't1-35-1', command: IMPORT_CMD, expect: ['Loaded 43 rows'] }],
        },
        {
          label: '2',
          html: '<p>In the <a href="#database">Database panel</a>, click <strong>Browse</strong> on <code>frequent_fliers</code> '
            + 'and confirm the customers are there. This is the same “did the import work” check you would do in Access.</p>',
        },
        {
          label: '3',
          html: '<p>Look carefully at the column types the script chose. <code>zip</code> came in as <code>INTEGER</code>. '
            + 'In one or two sentences, explain why that is a poor choice for ZIP codes in general, even though it happens to '
            + 'cause no damage with this particular data. (Hint: think about a customer in Boston, ZIP 02134.)</p>',
          workspaces: [{ tool: 'text', id: 'a1-35-3', rows: 3 }],
        },
        {
          label: '4',
          html: '<p>Re-import the file, this time forcing the identifier columns to text. In the Terminal, run the command '
            + 'below, then confirm in the printed schema that both columns are now <code>TEXT</code>. '
            + 'Each import rebuilds the table from the text file, so anything you change in the database later '
            + '(step 6) is undone if you run an import again.</p>',
          workspaces: [{ tool: 'terminal', id: 't1-35-4', command: REIMPORT_CMD, expect: ['Loaded 43 rows', 'zip TEXT'] }],
        },
        {
          label: '5',
          html: '<p>In the SQL boxes below, write and run a query for each of the following. '
            + 'Each box keeps its query and its result, and both go into your export.</p>',
        },
        {
          label: '5a',
          html: '<p>Every customer who requests a vegan meal, showing first name, last name, and airline, sorted by last name.</p>',
          workspaces: [{ tool: 'sql', id: 's1-35-5a', expect: ['13 rows'], placeholder: '-- 5a', starter: '' }],
        },
        {
          label: '5b',
          html: '<p>A count of customers in each meal category, highest count first. Your result should have four rows.</p>',
          workspaces: [{ tool: 'sql', id: 's1-35-5b', expect: ['4 rows'], placeholder: '-- 5b', starter: '' }],
        },
        {
          label: '5c',
          html: '<p>A count of customers per airline, highest first.</p>',
          workspaces: [{ tool: 'sql', id: 's1-35-5c', expect: ['4 rows'], placeholder: '-- 5c', starter: '' }],
        },
        {
          label: '5d',
          html: '<p>Every customer in the state of Idaho who prefers a window seat, showing name, city, and phone number.</p>',
          workspaces: [{ tool: 'sql', id: 's1-35-5d', expect: ['1 row'], placeholder: '-- 5d', starter: '' }],
        },
        {
          label: '5e',
          html: '<p>A count of customers per seating preference.</p>',
          workspaces: [{ tool: 'sql', id: 's1-35-5e', expect: ['3 rows'], placeholder: '-- 5e', starter: '' }],
        },
        {
          label: '6',
          html: '<p>Query (e) exposes a data-quality problem: one of the seating values is misspelled in the source file, '
            + 'and it appears in 6 rows. Find it, then fix it in the database with an <code>UPDATE</code> statement. '
            + 'Re-run query (e) to confirm the fix. Put both the <code>UPDATE</code> statement and the re-run of query (e) '
            + 'in this box, so the corrected result is saved with it.</p>',
          workspaces: [{
            tool: 'sql', id: 's1-35-6', expect: ['OK · 6 rows changed', '3 rows again'],
            placeholder: '-- 6: the UPDATE, then query (e) again', starter: '',
          }],
        },
        {
          label: '7',
          html: '<p>Write one query of your own that answers a question a Campus Travel manager would plausibly ask, '
            + 'using <code>GROUP BY</code>. State the question in plain English above the SQL: put your question on the '
            + 'first line as a SQL comment (<code>-- Which city …?</code>) and the query underneath.</p>',
          workspaces: [{
            tool: 'sql', id: 's1-35-7', expect: ['starts with a -- comment'],
            placeholder: '-- Your question, in plain English?\nSELECT …', starter: '',
          }],
        },
        {
          label: 'explore',
          optional: true,
          html: '<p><strong>Optional — read the same database from Python.</strong> Everything on this page is a normal '
            + 'SQLite file, so Python can open it too. This snippet only reads; it does not change your database. '
            + 'Put it in the Python cell and press Run Python, then try changing the column it groups by.</p>',
          workspaces: [{
            tool: 'python', id: 'p1-35-explore',
            snippet: "import sqlite3\nconn = sqlite3.connect('campus_travel.db')\nfor row in conn.execute('SELECT state, COUNT(*) FROM frequent_fliers GROUP BY state'):\n    print(row)\nconn.close()\n",
          }],
        },
      ],
      submit: '<p><code>campus_travel.db</code> (use Download in the toolbar), plus <code>ch1-queries.md</code>, made by '
        + 'Export my work — it contains the printed schema, your answer to step 3, every query with its result, and your '
        + 'step-7 question and query.</p>',
    },
  ],
};
