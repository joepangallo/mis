// Week 1 Application Exercises — handout front matter, back matter and grading
// table (browser edition). Student-facing text: HTML strings only (h2/h3, p,
// ul, table). The build supplies the page skeleton and the single <h1>;
// nothing here is executed in the browser.

import { table as sharedTable, escapeHtml as esc } from '../schema.mjs';

export const version = '2026-09-02';


function code(s) {
  return `<code>${esc(s)}</code>`;
}

// Caption and head are plain text; cells carry markup (code()), so they go to
// schema.mjs's table() as { html } cells.
function table({ caption, head, rows }) {
  return sharedTable({ caption, head, rows: rows.map((r) => r.map((c) => ({ html: c }))) });
}

// The five graded criteria. They sum to 100. The build renders the table (with
// its "Total per exercise" row) on every student page and in the printed
// handout from this one list, followed by gradingNotes.
export const grading = [
  ['Data imported correctly, row counts confirmed', 15],
  ['Formulas and queries produce correct results', 40],
  ['Formulas used where a formula was asked for (not typed-in values)', 15],
  ['Formatting, sorting, charts, and labeling', 10],
  ['Written answers show reasoning, not just a restated result', 20],
];

const exercisesTable = table({
  caption: 'The six exercises',
  head: ['Chapter', 'Spreadsheet exercise (Excel)', 'Database exercise (on the page)'],
  rows: [
    [
      '1',
      `1-34 Ticket Sales at Campus Travel — ${code('TicketSales.csv')}`,
      `1-35 Tracking Frequent-Flier Miles at Campus Travel — ${code('FrequentFliers.txt')}`,
    ],
    [
      '2',
      `2-36 Valuing Information Systems — ${code('TCO.csv')}`,
      '2-37 Designing the Frequent-Flier Database — no data file; you create it',
    ],
    [
      '3',
      `3-40 Tracking Frequent-Flier Mileage — ${code('frequentflier2.xlsx')}`,
      `3-41 Building a Knowledge Database — ${code('employees.db')}`,
    ],
  ],
});

export const front = [
  '<p>You will work through six exercises. Three of them are spreadsheet exercises done in Excel. Three of them are database exercises done in SQLite, a database engine that runs from a single file — and in this edition, that file lives inside a web page in your browser. Where data has to move from a text file into a database, a short Python script does the importing, and it runs in the browser too.</p>',
  '<p>Everything you need is in this folder. Each chapter has its own page: open it in your browser and the instructions, the SQL boxes, the Terminal, and your database are all there. You do not need the textbook to complete these exercises, you do not need Microsoft Access, and you do not need to install anything.</p>',
  exercisesTable,
  '<p>Each exercise is worth 100 points and all six are graded the same way; the table is at the end of this handout.</p>',

  '<h2>Before you start: setting up</h2>',
  '<p>You need two things.</p>',
  '<ul>',
  '<li><strong>A laptop or Chromebook with a current Chrome or Edge.</strong> Firefox and Safari should also work; phones and iPads are not supported for the database exercises. You need internet access the first time each page is opened, so that the page can download its database engine — and, the first time you use it, Python.</li>',
  '<li><strong>Excel</strong> for the spreadsheet exercises. Your student Microsoft 365 account includes Excel. LibreOffice Calc or Google Sheets will also work for every spreadsheet exercise here.</li>',
  '</ul>',
  '<p>Python and DB Browser for SQLite are now optional fallbacks: nothing here asks you to install them. If you would rather work outside the browser, or a page cannot download its engine where you are, DB Browser for SQLite (<a href="https://sqlitebrowser.org/">sqlitebrowser.org</a>) opens the same <code>.db</code> files the pages make, and Python 3 (<a href="https://www.python.org/downloads/">python.org/downloads</a>) runs <code>load_data.py</code> from a terminal window exactly as the page does. Both are free and run on Windows, macOS, and Linux.</p>',

  '<h2>Folder layout</h2>',
  '<p>Unzip the starter files into a folder called <code>Week 1</code>. You should have:</p>',
  '<ul class="file-tree">',
  '<li><code>Week 1/</code>',
  '<ul>',
  '<li><code>week-1-chapter-1.html</code> — the Chapter 1 page (Exercises 1-34 and 1-35)</li>',
  '<li><code>week-1-chapter-2.html</code> — the Chapter 2 page (Exercises 2-36 and 2-37)</li>',
  '<li><code>week-1-chapter-3.html</code> — the Chapter 3 page (Exercises 3-40 and 3-41)</li>',
  '<li><code>load_data.py</code></li>',
  '<li><code>chapter-01/</code><ul><li><code>data/TicketSales.csv</code></li><li><code>data/FrequentFliers.txt</code></li></ul></li>',
  '<li><code>chapter-02/</code><ul><li><code>data/TCO.csv</code></li></ul></li>',
  '<li><code>chapter-03/</code><ul><li><code>data/frequentflier2.xlsx</code></li><li><code>data/employees.csv</code></li><li><code>employees.db</code></li></ul></li>',
  '</ul>',
  '</li>',
  '</ul>',
  '<p>The three <code>.html</code> files are the homework pages, one per chapter; this handout is in the folder as a PDF as well. The data files are also built into each page — the Files list in the Database panel shows the same tree, with a Download button on every file — so a page keeps working if it is moved on its own. The copies in the folder are the ones you open in Excel.</p>',

  '<h2>How the pages work</h2>',
  '<p>Open a chapter’s page in your browser. At the top is a box for your name and a row of buttons. Below that comes the spreadsheet exercise, then the Database panel, then the database exercise, with the grading table and a Getting unstuck list at the end. Nothing is uploaded: the page downloads a small database engine the first time it opens and after that does all of its work on your computer.</p>',
  '<p>Every SQL step has its own box with a Run SQL button. Each time you press Run, the page opens your database file, runs your SQL from top to bottom, and saves the file again. The results appear under the box and stay there, so what you see is what Export my work will write out. The Database panel lists every table with its row count and updates after every run; Browse shows the first rows of a table and Structure shows how it was created — the same “did the import work” check you would do in any database tool.</p>',
  '<p>The Terminal in the Database panel is where <code>load_data.py</code> runs, with the same command you would type in a terminal window on your own computer. A step that needs it shows the command next to a button that puts it in the Terminal for you; you press Run and read what it prints.</p>',
  '<p>Your work and your database are kept inside this browser on this computer. They are not kept if you use a different browser or computer, and any other local web page opened in this browser can see them, so on a shared computer: Export, Download, then Clear my work before you leave.</p>',
  '<p>Three buttons in the toolbar matter for handing in. Download gives you your <code>.db</code> file. Export my work writes the document you hand in — your name, every box with its result, the Terminal transcript, and a summary of your database — so press Run on every box before you export. Print / Save PDF makes a paper copy for your own notes. Reset database and Clear my work are at the bottom of the Database panel, and both ask before they do anything.</p>',

  '<h2>Where Python comes in</h2>',
  '<p>Python appears in two places on the pages, and only the first is required.</p>',
  '<h3>load_data.py</h3>',
  '<p>This one script replaces the Access import wizard. You give it three things — a data file, a name for the table, and the database file to put it in — and it creates the table and loads every row:</p>',
  '<p><code>python load_data.py &lt;data file&gt; &lt;table name&gt; &lt;database file&gt;</code></p>',
  '<p>It reads the header row, converts each heading into a safe column name (<code>Meal Category</code> becomes <code>meal_category</code>), inspects the values to decide whether each column should be <code>INTEGER</code>, <code>REAL</code>, or <code>TEXT</code>, creates the table, and inserts the rows. Then it prints the schema it built and the row count so you can confirm the import before you write a query. You run it in the page’s Terminal; the first time, the page downloads Python (about 12 MB, once) and shows its progress — later runs are quick. Press View next to <code>load_data.py</code> in the Files list and read the comments: you are expected to understand roughly what it is doing, not to have written it.</p>',
  '<h3>The Python cell</h3>',
  '<p>Each page also has one Python cell, for exploring on your own. It starts with a few lines that read your database with Python’s <code>sqlite3</code> module and print what they find; nothing graded asks you to write Python. Two things are different from Python on your own computer: <code>input()</code> is not available on the page — put the value directly in your code instead — and there is no <code>pip</code>. Everything the assignment needs (<code>sqlite3</code>, <code>csv</code>) is already there. Importing an <code>.xlsx</code> file needs openpyxl, which means a locally installed Python 3; no exercise requires it.</p>',
].join('\n');

const handInTable = table({
  caption: 'One zip per chapter',
  head: ['Zip', 'Contents'],
  rows: [
    [
      code('Chapter1.zip'),
      `${code('TicketSales.xlsx')} · ${code('campus_travel.db')} · ${code('ch1-queries.md')} (made by Export my work)`,
    ],
    [
      code('Chapter2.zip'),
      `${code('TCO.xlsx')} · ${code('mileage.db')} · ${code('ch2-database.md')} (made by Export my work)`,
    ],
    [
      code('Chapter3.zip'),
      `${code('frequentflier2.xlsx')} · ${code('employees.db')} · ${code('ch3-queries.md')} (made by Export my work)`,
    ],
  ],
});

// Getting unstuck — browser edition. [symptom, advice]; both HTML. Exported so
// that build.mjs renders the same list on every student page (after the
// chapter's own entries) and after the back matter of the printed handout.
// Chapter-specific entries (chapter 1's "The misspelling came back") live in
// that chapter's content, not here.
export const unstuck = [
  [
    'The page says SQLite (or Python) could not be downloaded',
    'the page needs an internet connection the first time it opens. Check your connection, then press Retry. If it says the file on the CDN does not match this page’s build, tell your professor; until it is fixed, DB Browser for SQLite with the files in the Files list is the offline alternative.',
  ],
  [
    'The first Python run is slow',
    'the page is downloading Python (about 12 MB), once. Wait until the Database panel says “Python ready”; later runs take a moment, not a minute. Do not reload the page while it is downloading.',
  ],
  [
    'no such table',
    'the import has not been run in this browser yet, you pressed Reset database, or your import wrote to a differently named <code>.db</code> file (for example <code>campustravel.db</code> when the boxes use <code>campus_travel.db</code>). Run the import again with the exact command from the step, or pick the right file in the Database panel.',
  ],
  [
    'table already exists',
    'your <code>CREATE TABLE</code> has already run once. Put <code>DROP TABLE IF EXISTS</code> above it, as Exercise 2-37 step 2 shows, and run the box again.',
  ],
  [
    'Every query suddenly returns 0 rows',
    'you re-ran step 2 of Exercise 2-37, which rebuilds the three tables from empty. Run your step 3 <code>INSERT</code>s again.',
  ],
  [
    'no such column',
    'the importer cleaned the names: <code>Meal Category</code> became <code>meal_category</code>. Click Structure in the Database panel to see the exact column names.',
  ],
  [
    'A query returns nothing',
    'check your text is spelled and capitalised exactly as it is in the data (Browse the table). <code>WHERE expertise = \'British airways\'</code> matches nothing; <code>\'British Airways\'</code> matches seven people. <code>WHERE expertise LIKE \'british%\'</code> is a way to sidestep this while you are exploring. If the spelling is right, an empty result is still a result: it means nobody matches, and saying so is a legitimate answer.',
  ],
  [
    'My work is gone',
    'your work lives in this browser on this computer. A different browser, a different computer, a private window, or clearing the browser’s site data starts you from a blank page. Export my work and Download your <code>.db</code> often, and always before you leave a shared computer — then Clear my work.',
  ],
  [
    'I opened the .db somewhere else',
    'Download gives you a standard SQLite file: DB Browser for SQLite opens it, and so does Python’s <code>sqlite3</code>. To bring a file back into the page, use Open a .db file… in the toolbar.',
  ],
  [
    'input() is not available',
    'the page cannot pause Python to ask you for keyboard input. Put the value directly in your code instead.',
  ],
  [
    'My Python INSERT, UPDATE or DELETE did not stick',
    'Python’s <code>sqlite3</code> holds changes in a transaction until you call <code>conn.commit()</code>. When your code ends without it, the change is rolled back and the page says so under the output. Put <code>conn.commit()</code> before <code>conn.close()</code> at the end of your code. The SQL boxes do not have this problem: every Run saves the file.',
  ],
  [
    'You have broken your database',
    'Reset database, at the bottom of the Database panel, puts it back the way it started: chapter 3 restores the original <code>employees.db</code>, and chapters 1 and 2 remove the file so you can build it again. Nothing is lost; the source data files are never modified.',
  ],
];

export const back = [
  '<h2>What to hand in</h2>',
  '<p>Create one folder per chapter, put the finished files for that chapter in it, and zip each folder on its own:</p>',
  handInTable,
  '<p>Upload each zip to the matching Excel and SQLite Projects item for Week 1.</p>',
  '<p>The <code>.db</code> file comes from the Download button in the page’s toolbar. The <code>.md</code> document comes from Export my work: it holds your name, the schema printed in the Terminal, every query with its result, and your written answers, which go in the boxes on the page — so press Run on every box before you export, and open the file to check it shows your results before you zip it.</p>',
  '<p>Save your spreadsheets as <code>.xlsx</code>, not <code>.csv</code> — a <code>.csv</code> file cannot hold a formula, and formulas are most of what is being graded. Submit the <code>.db</code> files themselves, not screenshots of them.</p>',
].join('\n');

// Rendered under the grading table, on the pages and in the handout.
export const gradingNotes = '<p>Two notes on grading. A spreadsheet where the right number was typed into the cell by hand scores zero on the formula line even though the number is correct — the formula is the skill. And the written answers are worth a fifth of the grade; a one-line answer that restates the number you just calculated will not earn them.</p>';

export default { version, front, back, grading, gradingNotes, unstuck };
