// Week 1 · Chapter 3 — Excel and SQLite Projects (student-facing content).
// Source of truth: the Week 1 handout. Wording is preserved; only what the
// browser medium changes has been rewritten (see SPEC.md "Content rules").
// This chapter has no tabular step content, so schema.mjs's table() helper is
// not referenced here.

const pythonStarter = [
  'import sqlite3',
  "conn = sqlite3.connect('chapter-03/employees.db')",
  "for row in conn.execute('SELECT office, COUNT(*) FROM employees GROUP BY office ORDER BY 2 DESC, 1'):",
  '    print(row)',
  'conn.close()',
  '',
].join('\n');

const exploreSnippet = [
  'import sqlite3',
  "conn = sqlite3.connect('chapter-03/employees.db')",
  "for row in conn.execute('SELECT expertise, COUNT(*) FROM employees GROUP BY expertise ORDER BY 2 DESC, 1'):",
  '    print(row)',
  'conn.close()',
  '',
].join('\n');

export default {
  id: 'chapter-3',
  week: 1,
  chapter: 3,
  title: 'Excel and SQLite Projects',
  lede:
    '<p>Two exercises. The first is a spreadsheet lookup done in Excel. The second is a knowledge database done in SQLite, ' +
    'and the database runs right here on this page — there is nothing to install. <code>employees.db</code> is already open ' +
    'in the Database panel below; when you are done, download it and export your work.</p>',
  primaryDb: 'chapter-03/employees.db',
  seedDb: 'chapter-03/employees.db',
  messages: {
    noDb: 'No database yet — Reset database (at the foot of the Database panel) restores the original employees.db',
    // this page has no import: the database lives in the chapter-03 folder, and Python must open it by that path
    wrongName: 'Use the path chapter-03/employees.db in your code, or pick the file here.',
  },
  filesShown: ['chapter-03/data/frequentflier2.xlsx', 'chapter-03/employees.db', 'chapter-03/data/employees.csv'],
  pythonStarter,
  confirmTexts: {
    reset:
      'This restores the original 24-row employees.db and discards your ALTER TABLE change. ' +
      'Download employees.db first if you want to keep it.',
    clear:
      'This clears your name, every answer box, every result, the terminal, the Python cell and your saved employees.db ' +
      'from this browser. Export my work and Download employees.db first if you want to keep them.',
    replace:
      'Replace the database on this page with the file you chose? The current employees.db is lost unless you Download it first.',
  },
  exercises: [
    {
      id: '3-40',
      kind: 'spreadsheet',
      title: 'Spreadsheet Application: Tracking Frequent-Flier Mileage',
      scenario:
        '<p>The mileage figures for the quarter have arrived from the airlines, but they came as a separate list keyed by ' +
        'frequent-flier number rather than by name. You need one sheet that shows each customer alongside their miles.</p>',
      data:
        '<p><code>chapter-03/data/frequentflier2.xlsx</code> — two worksheets. <strong>Customers</strong> has 43 customers ' +
        'with an empty <strong>Miles Flown</strong> column. <strong>Miles Flown</strong> has 43 frequent-flier numbers with ' +
        'their mileage, in a different order. The workbook is in your Week 1 folder; you can also download it from the ' +
        '<a href="#database">Files list</a> further down this page.</p>',
      submit:
        '<p><code>frequentflier2.xlsx</code> with your formulas, the summary figures, the Status column, and the conditional ' +
        'formatting in place. Your written answers go in the boxes on this page and are included when you Export my work.</p>',
      steps: [
        {
          label: '1',
          html:
            '<p>Open the workbook. Look at both sheets and identify the column they have in common. That shared column is ' +
            'what makes the lookup possible.</p>',
        },
        {
          label: '2',
          html:
            '<p>On the Customers sheet, fill the Miles Flown column using <code>VLOOKUP</code> (or <code>XLOOKUP</code>) ' +
            'against the Miles Flown sheet. Use an absolute reference for the lookup range so the formula fills down ' +
            'correctly, and ask for an exact match — the last argument must be <code>FALSE</code> (or <code>0</code>).</p>',
        },
        {
          label: '3',
          html:
            '<p>Confirm every row found a match. Wrap your formula in <code>IFERROR</code> to display <code>Not found</code> ' +
            'instead of <code>#N/A</code>, then check that the phrase appears nowhere in the column.</p>',
        },
        {
          label: '4',
          html:
            '<p>Below the data, add these summary figures, each with a formula:</p>' +
            '<ul>' +
            '<li>total miles flown by all customers</li>' +
            '<li>average miles per customer</li>' +
            '<li>highest and lowest mileage</li>' +
            '<li>the count of customers who flew more than 5,000 miles (use <code>COUNTIF</code>)</li>' +
            '</ul>',
        },
        {
          label: '5',
          html:
            '<p>Add a column headed <strong>Status</strong> that shows <code>Gold</code> for 7,500 miles or more, ' +
            '<code>Silver</code> for 5,000 to 7,499, and <code>Standard</code> below 5,000. Use nested <code>IF</code> ' +
            'statements or <code>IFS</code>.</p>',
        },
        {
          label: '6',
          html: '<p>Apply conditional formatting to the Miles Flown column so that Gold-level values stand out.</p>',
        },
        {
          label: '7',
          html: '<p>Sort the customers by miles flown, highest first, and identify the top five.</p>',
        },
        {
          label: '8',
          html:
            '<p>Answer in two or three sentences: Campus Travel wants to offer a bonus to its top tier. Based on your ' +
            'Status column, roughly what share of customers would qualify, and is that the right size for a rewards tier?</p>',
          workspaces: [{ tool: 'text', id: 'a3-40-8', rows: 4 }],
        },
      ],
    },
    {
      id: '3-41',
      kind: 'database',
      title: 'Database Application: Building a Knowledge Database',
      scenario:
        '<p>Campus Travel has offices in four towns. When a customer calls with a detailed question about a particular ' +
        'airline — its baggage rules, its upgrade policy, its alliance partners — whoever picks up the phone needs to find ' +
        'the colleague who actually knows that airline. Right now that means asking around. You are going to turn the staff ' +
        'directory into a searchable knowledge database, so the question “who here knows British Airways?” is a query ' +
        'rather than a group email.</p>',
      data:
        '<p><code>chapter-03/employees.db</code> — a ready-made SQLite database with an <code>employees</code> table: 24 ' +
        'staff members, each with a last name, first name, office, area of expertise, and home phone number. This page has ' +
        'already opened it for you — it is the database shown in the <a href="#database">Database panel</a>. ' +
        '(<code>chapter-03/data/employees.csv</code> holds the same data as text. If you break employees.db, ' +
        '<strong>Reset database</strong> restores it; rebuilding with <code>load_data.py</code> replaces the table and ' +
        'removes any column you added in step 5.)</p>',
      submit:
        '<p><code>employees.db</code> with your changes — press <strong>Download employees.db</strong> in the toolbar — ' +
        'plus <code>ch3-queries.md</code>, which <strong>Export my work</strong> writes for you, containing every query with ' +
        'its result, your answers to steps 3, 5, and 6, and your best attempt at step 4.</p>',
      steps: [
        {
          label: '1',
          html:
            '<p>In the <a href="#database">Database panel</a>, click <strong>Structure</strong> on the ' +
            '<code>employees</code> table to see how the table is built, then <strong>Browse</strong> to see the 24 ' +
            'employees. This is the same “is the data really there?” check you would do in any database tool.</p>',
        },
        {
          label: '2',
          html:
            '<p>Write and run a query for each of the following, each in its own SQL box. Each box keeps its SQL and its ' +
            'last result, and both go into your export.</p>',
        },
        {
          label: '2a',
          html:
            '<p>Every employee whose expertise is British Airways, showing first name, last name, office, and phone ' +
            'number, sorted by last name.</p>',
          workspaces: [{ tool: 'sql', id: 's3-41-2a', expect: ['7 rows'], placeholder: '-- 2a', starter: '' }],
        },
        {
          label: '2b',
          html: '<p>A count of employees per office, largest office first.</p>',
          workspaces: [{ tool: 'sql', id: 's3-41-2b', expect: ['4 rows', 'Pullman 12'], placeholder: '-- 2b', starter: '' }],
        },
        {
          label: '2c',
          html: '<p>A count of employees per area of expertise.</p>',
          workspaces: [{ tool: 'sql', id: 's3-41-2c', expect: ['4 rows'], placeholder: '-- 2c', starter: '' }],
        },
        {
          label: '2d',
          html: '<p>Everyone in the Pullman office, sorted by expertise then last name.</p>',
          workspaces: [{ tool: 'sql', id: 's3-41-2d', expect: ['12 rows'], placeholder: '-- 2d', starter: '' }],
        },
        {
          label: '2e',
          html:
            '<p>Every employee whose expertise is Delta or Continental, in a single query. Use <code>IN</code> rather ' +
            'than two conditions joined by <code>OR</code>.</p>',
          workspaces: [{ tool: 'sql', id: 's3-41-2e', expect: ['10 rows'], placeholder: '-- 2e', starter: '' }],
        },
        {
          label: '2f',
          html:
            '<p>A breakdown of expertise within the Pullman office — which airlines are covered there, and by how many ' +
            'people.</p>',
          workspaces: [{ tool: 'sql', id: 's3-41-2f', expect: ['4 rows'], placeholder: '-- 2f', starter: '' }],
        },
        {
          label: '3',
          html:
            '<p>Now the question the knowledge database exists to answer. A customer calls the Lewiston office with a ' +
            'detailed British Airways question. Write one query that returns the people who could take that call, and ' +
            'write two or three sentences explaining what your result tells you about staffing at that office. The query ' +
            'goes in the SQL box; your sentences go in the answer box under it.</p>',
          workspaces: [
            {
              tool: 'sql',
              id: 's3-41-3',
              expect: ['one query', 'then 2–3 sentences about staffing at that office'],
              placeholder: '-- 3',
              starter: '',
            },
            { tool: 'text', id: 'a3-41-3', rows: 4 },
          ],
        },
        {
          label: '4',
          html:
            '<p>Find the coverage gaps. Write a query that shows which office/expertise combinations do <em>not</em> exist ' +
            '— that is, for each office, which of the four airlines nobody there covers. A <code>CROSS JOIN</code> of the ' +
            'distinct offices and the distinct expertise values, with a <code>LEFT JOIN</code> back to ' +
            '<code>employees</code> and a <code>WHERE ... IS NULL</code>, will get you there. This is the hardest query in ' +
            'the assignment; attempt it seriously even if you do not finish it.</p>',
          workspaces: [{ tool: 'sql', id: 's3-41-4', expect: ['4 rows'], placeholder: '-- 4', starter: '' }],
        },
        {
          label: '5',
          html:
            '<p>The table has no primary key, and two employees could share a name. Write an <code>ALTER TABLE</code> ' +
            'statement that adds an <code>employee_id</code> column, then explain in one or two sentences why a table like ' +
            'this should have had one from the start. After you run it, click <strong>Structure</strong> in the Database ' +
            'panel to confirm the column is there — your downloaded <code>employees.db</code> will include it.</p>',
          workspaces: [
            {
              tool: 'sql',
              id: 's3-41-5',
              expect: ['employee_id appears in Structure', 'then 1–2 sentences'],
              placeholder: '-- 5',
              starter: '',
            },
            { tool: 'text', id: 'a3-41-5', rows: 3 },
          ],
        },
        {
          label: '6',
          html:
            '<p>Write two or three sentences on the following: this database makes it easy to find who knows what. What ' +
            'does it <em>not</em> capture that a real knowledge management system would need? Think about how expertise is ' +
            'recorded here, and who decides what goes in that column.</p>',
          workspaces: [{ tool: 'text', id: 'a3-41-6', rows: 4 }],
        },
        {
          label: 'explore',
          optional: true,
          html:
            '<p><strong>Optional — the same kind of question, asked from Python.</strong> This code opens ' +
            '<code>employees.db</code>, counts the staff for each area of expertise, and prints one line per airline. It ' +
            'only reads the file; it changes nothing. Put it in the Python cell in the Database panel and press ' +
            '<strong>Run Python</strong>. Compare the output with your result from 2c.</p>',
          workspaces: [{ tool: 'python', id: 'p3-41-explore', snippet: exploreSnippet }],
        },
      ],
    },
  ],
};
