/* ===== s35 ===== */
PROSE.s35 = `<span class="eyebrow">Application supplement &middot; 3&ndash;5</span>
<h2>Where the data itself lives: databases and SQLite</h2>

<p class="lede">Everything in this module so far has been about the container: the machines, the software that drives them, the wire between them, and the room they sit in. None of it says anything about the thing all of it exists to hold. An organization&rsquo;s records are the part that cannot simply be bought again after a bad day. This supplement follows the data itself, from a folder of files to a stored set of records you can question.</p>

<div class="callout info"><b>How this supplement relates to the chapter.</b> The chapter keeps brushing against databases without ever stopping on them. It defines a server as a machine that provides others with access to databases. It says web servers often assemble a page by pulling data out of a database at the moment the page is requested. It counts database management systems among the costs that growing data drives up, and then names them again as a licence the platform service model quietly removes. This section gathers those scattered mentions into one place and carries them as far as reading a stored table and asking it a question. It is a labeled supplement rather than a textbook objective, and it prepares for the database work the course does separately in SQLite rather than replacing it.</div>

<h3>What the chapter already told you about data</h3>

<p>Four sentences, spread across four different sections of the chapter, hold most of what a manager needs. Read together they make an argument the chapter itself never quite assembles.</p>

<ul class="keys">
<li><b>A server is defined by the fact that it serves data</b> &mdash; the chapter describes that class of computer as one built to give many users at once their websites, their applications and their access to databases, which is why it is optimized for connections rather than for one person&rsquo;s screen.</li>
<li><b>Web pages are often built out of a database as you ask for them</b> &mdash; the page that arrives was not sitting on a disk in that form, because a program queried stored records and assembled the page around the result.</li>
<li><b>Keeping data is a running cost rather than a purchase</b> &mdash; the chapter says that capturing more data demands more storage space, more powerful computing hardware, and database management systems to manage and analyse whatever has been kept.</li>
<li><b>Renting a platform removes the licence, not the design</b> &mdash; on the platform service model the provider supplies and updates the database software, and the chapter names that licence as one of the things the customer no longer has to buy.</li>
</ul>

<p>Put those four together and the shape appears. Data is kept once, on a machine built to serve it; other programs ask that machine for what they need; and the arrangement costs money continuously, in space, in electricity and in software. What the chapter never says is why data is kept that way rather than in files, which is where this supplement starts.</p>

<h3>Why a pile of files eventually fails</h3>

<p>The earlier section on system software and storage described files and folders: a file is a block of data holding specific content, and folders group related files into a tree. For documents that works beautifully. It fails, quietly and expensively, the moment several people have to record the same kind of fact.</p>

<p>Take a hypothetical community music school that lends instruments to its learners. Three members of staff each keep a spreadsheet of loans. Nothing about that is unreasonable: every file is small, readable, and belongs to the person who made it. The trouble starts with the first question that spans them.</p>

<ul class="keys">
<li><b>The same fact ends up stored more than once</b> &mdash; a learner&rsquo;s name and address are typed into whichever file the person on shift happened to open, so a correction made in one of them never reaches the others.</li>
<li><b>Nothing decides which copy is authoritative</b> &mdash; when two files disagree about how many instruments are out, no rule settles it, and the disagreement is resolved by whoever sounds more certain rather than by evidence.</li>
<li><b>The shape of a record becomes a matter of habit</b> &mdash; one file writes a date as a word and another as digits, one gains a column in March that the others never get, and a heading that meant one thing in the autumn means something slightly different by the spring.</li>
<li><b>Questions that span the files cannot really be asked</b> &mdash; counting a year of loans means opening every file and adding by hand, which is work nobody repeats often enough to notice when a total comes out wrong.</li>
</ul>

<p>A <b>database</b> is the answer to exactly that failure, and it is worth defining in those terms rather than as a piece of software you install. A database is one stored, shared set of records that everyone reads and writes, held in a declared shape, and asked questions of instead of copied. The program that keeps it is a <b>database management system</b>: it enforces the shape, lets many people work at once without overwriting each other, and answers the questions.</p>

<p>The difference from a file is that shape. A file is a block of content whose meaning lives in the head of whoever made it. A <b>table</b> is a declared shape: named columns, each holding one kind of value, and one row for each thing the table is about. Because the shape is declared rather than assumed, the system can refuse a record that does not fit &mdash; a loan with no borrower, or a second row claiming an identifier that already belongs to another row.</p>

<div class="activity" data-activity="dbQuiz1"></div>

<h3>How to read a stored table</h3>

<p>A table has only two directions and both of them are ordinary, which is why a table is easier to read than most people expect on first meeting one.</p>

<ul class="keys">
<li><b>A row is one of the things the table is about</b> &mdash; one loan, one learner, one payment, recorded once, with a value in every column that applies to it.</li>
<li><b>A column is one kind of fact</b> &mdash; every value in it means the same thing and is the same kind of thing, which is exactly what makes it possible to filter on it, sort by it, or total it.</li>
<li><b>A key is the column that identifies the row</b> &mdash; a value no two rows may share, so that one record can be referred to from elsewhere with no ambiguity about which one is meant.</li>
<li><b>A relationship is a column that names a row in another table</b> &mdash; a loan carries a learner identifier rather than a learner&rsquo;s name, so the name is stored once and borrowed by every loan that needs it.</li>
</ul>

<p>That last one is the move the files could not make. Correct a name on the learner&rsquo;s own row and every loan is correct the same instant, because no loan ever held a copy of it in the first place.</p>

<p>Asking a table something is then three separate decisions, and keeping them separate is most of the skill:</p>

<ol class="steps">
<li><b>Which rows?</b> Every condition in the question &mdash; still out, this term, longer than a month &mdash; narrows the set of rows before anything else is allowed to happen.</li>
<li><b>Which columns?</b> A question rarely wants a whole record. Naming the columns you actually need is what turns a screen of data into an answer somebody can read aloud.</li>
<li><b>Rows, or a summary of rows?</b> How many, how much and on average are not questions about rows at all. They collapse many rows into a single value for each group.</li>
</ol>

<p>The language that writes those decisions down is <b>SQL</b>, the structured query language, and it is broadly the same language whichever database system you meet. Each decision has its own word, and reading them in this order makes a query far less mysterious than it looks:</p>

<ul class="keys">
<li><b>FROM</b> names the table the rows come from, and so decides what is being counted before anything else in the query happens at all.</li>
<li><b>WHERE</b> keeps only the rows that satisfy a condition, and because it runs before any total exists it silently determines every number that follows.</li>
<li><b>SELECT</b> names the columns that come back, and a calculation such as sessions booked minus sessions attended can be one of them, given a name of its own.</li>
<li><b>GROUP BY</b> collapses the surviving rows into one row for each distinct value, which is what lets a count or a sum report per category instead of per record.</li>
<li><b>HAVING</b> filters those grouped rows, and it exists because WHERE has already finished its work by the time any total has been calculated.</li>
<li><b>ORDER BY and LIMIT</b> sort the result and keep only the first few rows, which together answer anything phrased as the busiest, the longest, or the worst three.</li>
</ul>

<p>Here is one whole query over a table of lesson sign-ups: <code>SELECT Learner, Fee FROM signups WHERE Term = 'Spring' ORDER BY Fee DESC</code>. Read it as four decisions in a row. The rows come from the sign-up table; only spring sign-ups survive; two columns come back, the learner and the fee; and the result arrives dearest first. Nothing in it names a particular learner, which is why the same query still works after another hundred sign-ups arrive.</p>

<p>Before writing one yourself it is worth being deliberate about the order of thinking, because a query that runs is not the same thing as a query that answers the question you were asked.</p>

<div class="activity" data-activity="dbShape"></div>

<h3>Asking one table a question</h3>

<p>The table below records lesson sign-ups at that same hypothetical music school. Everything in it is invented for practice, every person named included. Each row is one sign-up, carrying the learner, the instrument, the level, the term, how many sessions were booked, how many were attended, and the fee.</p>

<p>Write a query for each question and run it. Any query that returns the right answer is accepted rather than only the wording that happened to be expected, so there is more than one way through. When a query cannot run, the page says why in plain language, which teaches more than an empty result would.</p>

<div class="activity" data-activity="dbRows"></div>

<p>Notice what the second question needed. The number of missed sessions is not stored anywhere; it is worked out from two columns at the moment you ask. Storing it as well would create a third value that can disagree with the other two, which is the trouble with the files all over again in miniature. Facts that can be derived are generally derived rather than kept.</p>

<h3>Questions no single row can answer</h3>

<p>Everything so far returned rows that already existed. Two kinds of question do not work that way, and between them they cover most of what management actually asks for.</p>

<ul class="keys">
<li><b>Summaries ask about groups rather than records</b> &mdash; how many loans per instrument, or how long the average loan runs, produce one line for each group and no underlying rows at all.</li>
<li><b>Joins ask about facts that were deliberately kept apart</b> &mdash; who the borrower is and what they borrowed are two different kinds of fact living in two tables, and a join matches them on the value they share.</li>
<li><b>Filters can apply before or after the grouping</b> &mdash; keeping only the loans still out is a condition on rows, while keeping only the instruments borrowed more than once is a condition on a total that does not exist until the grouping has finished.</li>
</ul>

<p>The two tables below belong to the same hypothetical school, and again every member and every loan in them is invented. One holds a row for each member, with the town they live in and the date they joined; the other holds a row for each loan, carrying a member identifier rather than a name.</p>

<div class="activity" data-activity="dbGroups"></div>

<p>The last questions are the ones worth sitting with. Neither answer exists in any row: the count for each town is assembled at the moment of asking, out of records that were never entered with towns in mind. That is the practical difference between a set of files and a database &mdash; files answer the questions they were built for, and a database answers questions nobody had thought of when the records were written.</p>

<h3>What renting takes off your hands, and what stays yours</h3>

<p>The service models earlier in this module decide who installs and patches the database software. They do not decide who is responsible for the data, and that confusion is what this section exists to prevent.</p>

<ol class="steps">
<li><b>Infrastructure as a service.</b> You are given processing, storage and networking, and everything above that is yours: the operating system, the database software, its licence, its updates and its backups.</li>
<li><b>Platform as a service.</b> The provider supplies and updates the platform, database management system included, so the licence and the patching stop being your problem. The chapter names that saving explicitly.</li>
<li><b>Software as a service.</b> You use a finished application, so you choose settings and you own the records inside it, and nothing underneath is visible to you at all.</li>
</ol>

<p>What none of the three takes away is the design. Which records exist, how they relate to one another, what has to be unique, what a column is allowed to contain, and which questions the store must be able to answer are decisions about the organization rather than about the software. A rented platform will hold whatever shape you give it, including a poor one, and will hold it very reliably indeed.</p>

<div class="activity" data-activity="dbQuiz2"></div>

<h3>The hand-off to SQLite</h3>

<p>Everything above is about reading. Building is the other half, and it is where the course goes next. <b>SQLite</b> is a database system that keeps an entire database in a single ordinary file and runs inside the program using it, with no separate server to install or keep running. That makes it an unusually honest place to learn, because nothing between you and the data is hidden behind an administrator.</p>

<p>The queries on this page are the same language you will write there. What changes is that you will also decide what the tables are: which things deserve a table of their own, which column identifies a row, and which questions the design has to answer on the day somebody finally asks. Creating a database application in SQLite is the course&rsquo;s own separate work, and this supplement is the bridge to it rather than a substitute for it.</p>

<p class="takeaway">The container can be rented; the meaning cannot. Somebody in the organization still has to know what a record is, which is why a section about tables belongs in a module about machines.</p>

<div class="callout exam"><b class="tagline">What to carry out of this section</b>One stored set of records, one home for each fact, and questions asked of the store rather than answers copied out of it. If you can say which rows a claim rests on and which columns it reads, you can defend it. If the claim arrived as a file somebody mailed you, all you can do is repeat it.</div>`;

ACT.dbQuiz1 = {
  kind: "quiz",
  label: "Check yourself",
  title: "Files, records, and what a database actually changes",
  how: "Four options, one best answer; read every explanation, including the ones for options you did not choose.",
  objective: "3.5",
  questions: [
    {
      q: "Two of the hypothetical music school&rsquo;s spreadsheets disagree about how many instruments are out on loan. A volunteer proposes settling it by declaring one of the three files the master copy. What is the strongest objection?",
      opts: [
        "Nothing is wrong with the idea, because declaring a master copy is exactly what a database does, only without needing any software",
        "The other two files still exist and are still being edited, so the totals part again the first time somebody records a loan in the wrong one",
        "Spreadsheets cannot store dates reliably, so the same disagreement would return in a different form within a term or two",
        "A single master file would be too large for one person to keep up to date, so the work has to stay divided across the three files"
      ],
      a: 1,
      why: [
        "A database does something stronger than nominate a favourite copy: it removes the other copies, so there is nowhere else for a loan to be recorded. A nominated file is a convention, and a convention only holds while everybody remembers it.",
        "Correct. The problem is not which file is trusted but that three places can accept a record. As long as the other two remain open on somebody&rsquo;s screen, the school is one distracted afternoon away from the same disagreement.",
        "Spreadsheets handle dates perfectly well. The inconsistency in the files came from three people typing them differently, which is a question of who may write where rather than of what the software can store.",
        "Size is not the difficulty here; a year of instrument loans would be a small file by any measure. The cost of the arrangement is inconsistency between copies, and dividing the work is what created it."
      ]
    },
    {
      q: "In the school&rsquo;s loan records, every loan carries a member identifier rather than the member&rsquo;s name. Why is it arranged that way?",
      opts: [
        "An identifier occupies less storage space than a name, and storage is the constraint that shapes how tables are designed",
        "A query cannot compare text, so a numbered identifier is required before two tables can be matched at all",
        "The name is a fact about the member, so it is stored once on the member&rsquo;s row and every loan simply refers to it",
        "Typing a name onto every loan would take longer, and saving that typing is the reason the tables were split"
      ],
      a: 2,
      why: [
        "The space saved is trivial and would not justify the extra table. Facts are separated for correctness, and the join you pay for afterwards is the price of that correctness rather than a saving.",
        "Queries compare text quite happily, and plenty of tables are matched on text columns. The trouble with matching on a name is that two members may share one, not that the language cannot do it.",
        "Correct. One fact, one home. Correcting a spelling on the member&rsquo;s row makes every loan correct at once, because no loan ever contained a copy that could fall out of step with it.",
        "It does save typing, but that is a side effect rather than the reason. Even with perfect typists, copying the name onto every loan creates as many chances to disagree as there are loans."
      ]
    },
    {
      q: "The chapter says web servers often assemble a page by retrieving data from a database as the request arrives. What follows from that for someone managing the site?",
      opts: [
        "The finished page already sits on the server&rsquo;s disk in the form the visitor sees, and the database holds only a spare copy of it",
        "What the visitor sees is produced from stored records at the moment of asking, so a slow or unavailable database is a slow or unavailable site",
        "The site cannot be copied to servers nearer the visitor, because the records behind it can exist in one location only",
        "The database matters for internal reporting, while the public site is a separate system fed by an overnight export"
      ],
      a: 1,
      why: [
        "For a page assembled on request there is no such stored copy: the layout is stored, but the prices, the availability and the names are fetched and dropped in as the page is built for that visitor.",
        "Correct. The page is a view of the records, made on demand, so the quality of the records is the quality of the page and the availability of the store is the availability of the site.",
        "Copies of content can certainly be pushed closer to visitors, which is what the earlier section on content delivery networks described. What travels is usually the parts that do not change per visitor.",
        "This describes one possible arrangement rather than the one the chapter names. When the page is assembled from a query at request time, the public site and the store are the same system by definition."
      ]
    }
  ]
};

ACT.dbShape = {
  kind: "order",
  label: "Sequence",
  title: "From a business question to a query you can trust",
  how: "Put the five steps into the order that produces an answer to the question actually asked, then read why each one sits where it does.",
  objective: "3.5",
  intro: "The hardest part of querying is not the words. It is resisting the urge to start typing before the question has been stated precisely enough to be answered. These five steps are the same discipline the earlier modules asked for when turning evidence into a claim.",
  steps: [
    {
      t: "State the question in ordinary business words, and name the decision the answer feeds. &ldquo;Which instruments are out right now, and who has them?&rdquo; is a question; &ldquo;have a look at the loans&rdquo; is not.",
      why: "A query can only be as precise as the sentence behind it. Naming the decision the answer serves is what stops you producing a screen of rows that is technically correct and useless, because nobody can act on it."
    },
    {
      t: "Find where the fact is stored: which table has one row for each thing the question is about, and which other table holds the extra detail the question also mentions.",
      why: "The question mentions instruments and people, and those are two different kinds of thing. The table you count from is the one whose rows are the units being asked about, which here is loans rather than members."
    },
    {
      t: "Decide which rows. Every condition in the question &mdash; still out, this term, longer than a month &mdash; has to be written down as a filter before anything is counted.",
      why: "The filter runs before any total exists, so whatever it excludes is missing from every number that follows. Most confidently wrong answers were produced by a filter that nobody went back and read."
    },
    {
      t: "Decide what comes back: the rows themselves with the columns the question mentions, or one summary value for each group when the question asks how many, how much, or how long on average.",
      why: "Choosing rows and choosing columns are separate decisions, and summarising is a third. A question about loans per town does not want the loans at all; it wants one line per town, which is a different result rather than a different layout."
    },
    {
      t: "Run it, then read the result back against the original question and satisfy yourself that it answers that question rather than a neighbouring one.",
      why: "A query that runs is not a query that is right. The commonest failure is a clean answer to a slightly different question &mdash; every loan rather than every loan still out &mdash; and only rereading the question catches it."
    }
  ]
};

ACT.dbRows = {
  kind: "sql",
  label: "Database",
  title: "Question one table",
  how: "Write a SELECT for each question and run it. Any query that returns the right answer is accepted, so there is more than one correct way through.",
  objective: "3.5",
  tables: {
    signups: { rows: [
      {RecordID: "R-01", Learner: "Adaeze Nwosu",   Instrument: "Violin",   Level: "beginner",     Term: "Autumn", Sessions: 10, Attended: 9,  Fee: 120},
      {RecordID: "R-02", Learner: "Tomas Ferreira", Instrument: "Cello",    Level: "intermediate", Term: "Autumn", Sessions: 10, Attended: 4,  Fee: 150},
      {RecordID: "R-03", Learner: "Wren Halloway",  Instrument: "Violin",   Level: "beginner",     Term: "Autumn", Sessions: 10, Attended: 10, Fee: 120},
      {RecordID: "R-04", Learner: "Ines Barreto",   Instrument: "Trumpet",  Level: "advanced",     Term: "Autumn", Sessions: 8,  Attended: 7,  Fee: 180},
      {RecordID: "R-05", Learner: "Otis Lindgren",  Instrument: "Flute",    Level: "beginner",     Term: "Spring", Sessions: 12, Attended: 5,  Fee: 140},
      {RecordID: "R-06", Learner: "Priya Vellani",  Instrument: "Violin",   Level: "intermediate", Term: "Spring", Sessions: 12, Attended: 11, Fee: 160},
      {RecordID: "R-07", Learner: "Adaeze Nwosu",   Instrument: "Clarinet", Level: "beginner",     Term: "Spring", Sessions: 12, Attended: 12, Fee: 130},
      {RecordID: "R-08", Learner: "Tomas Ferreira", Instrument: "Cello",    Level: "intermediate", Term: "Spring", Sessions: 12, Attended: 3,  Fee: 150},
      {RecordID: "R-09", Learner: "Ines Barreto",   Instrument: "Trumpet",  Level: "advanced",     Term: "Spring", Sessions: 8,  Attended: 8,  Fee: 180},
      {RecordID: "R-10", Learner: "Wren Halloway",  Instrument: "Flute",    Level: "beginner",     Term: "Spring", Sessions: 12, Attended: 6,  Fee: 140}
    ]}
  },
  tasks: [
    {
      prompt: "List the learner and the instrument for every sign-up at the beginner level.",
      expect: "SELECT Learner, Instrument FROM signups WHERE Level = 'beginner'",
      hint: "Name the two columns after SELECT, then narrow the rows with WHERE on the Level column. A text value goes in quotes.",
      explain: "SELECT chooses the columns and WHERE chooses the rows. They are two independent decisions, and confusing them is the most common early mistake: asking for fewer columns never removes a row."
    },
    {
      prompt: "Show every sign-up with the learner, the instrument, and the number of sessions missed, with the worst attendance first.",
      expect: "SELECT Learner, Instrument, Sessions - Attended AS Missed FROM signups ORDER BY Missed DESC",
      hint: "A calculation can be a column. Subtract one stored column from the other inside SELECT, give the result a name with AS, then sort by that name in descending order.",
      explain: "Missed sessions are nowhere in the table; they are worked out as the query runs. Naming the calculation with AS is what lets ORDER BY refer to it, and it also gives the reader a heading that says what the number means."
    },
    {
      prompt: "Which instruments does the school actually teach? List each one once.",
      expect: "SELECT DISTINCT Instrument FROM signups",
      hint: "Selecting the instrument column alone returns one row per sign-up, so several rows repeat. One keyword after SELECT collapses the duplicates.",
      explain: "DISTINCT answers a question about the set of values rather than about the records. It is the smallest example of the difference between listing rows and describing them, which is what grouping does at greater scale."
    },
    {
      prompt: "Name the three most expensive sign-ups, showing the learner, the instrument and the fee.",
      expect: "SELECT Learner, Instrument, Fee FROM signups ORDER BY Fee DESC LIMIT 3",
      hint: "There is no condition to test here. Sort the whole table by fee from high to low, then keep only the first few rows.",
      explain: "Questions phrased as the worst three or the busiest five are a sort followed by a cut, not a filter. Nobody could have written a WHERE for this, because the threshold depends on the data rather than on the question."
    }
  ]
};

ACT.dbGroups = {
  kind: "sql",
  label: "Database",
  title: "Two tables, and questions about groups",
  how: "Each question needs either a join, a grouping, or both; run each query and compare the result with what the question actually asked for.",
  objective: "3.5",
  tables: {
    members: { rows: [
      {MemberID: "M1", Name: "Adaeze Nwosu",   Town: "Fairmount", JoinedOn: "2024-09-14"},
      {MemberID: "M2", Name: "Tomas Ferreira", Town: "Ashbury",   JoinedOn: "2025-01-08"},
      {MemberID: "M3", Name: "Wren Halloway",  Town: "Fairmount", JoinedOn: "2025-03-22"},
      {MemberID: "M4", Name: "Ines Barreto",   Town: "Kingsmere", JoinedOn: "2023-10-02"},
      {MemberID: "M5", Name: "Otis Lindgren",  Town: "Ashbury",   JoinedOn: "2025-06-11"},
      {MemberID: "M6", Name: "Priya Vellani",  Town: "Fairmount", JoinedOn: "2026-01-19"}
    ]},
    loans: { rows: [
      {LoanID: "L-01", MemberID: "M1", Instrument: "Violin",   Status: "out",      Weeks: 6},
      {LoanID: "L-02", MemberID: "M2", Instrument: "Cello",    Status: "returned", Weeks: 12},
      {LoanID: "L-03", MemberID: "M3", Instrument: "Violin",   Status: "returned", Weeks: 6},
      {LoanID: "L-04", MemberID: "M1", Instrument: "Clarinet", Status: "returned", Weeks: 4},
      {LoanID: "L-05", MemberID: "M4", Instrument: "Violin",   Status: "out",      Weeks: 3},
      {LoanID: "L-06", MemberID: "M5", Instrument: "Trumpet",  Status: "out",      Weeks: 5},
      {LoanID: "L-07", MemberID: "M2", Instrument: "Violin",   Status: "returned", Weeks: 10},
      {LoanID: "L-08", MemberID: "M6", Instrument: "Cello",    Status: "out",      Weeks: 2},
      {LoanID: "L-09", MemberID: "M4", Instrument: "Trumpet",  Status: "returned", Weeks: 7},
      {LoanID: "L-10", MemberID: "M3", Instrument: "Flute",    Status: "returned", Weeks: 9}
    ]}
  },
  tasks: [
    {
      prompt: "Which instruments are out at the moment, and who has them? Show the member&rsquo;s name and the instrument.",
      expect: "SELECT m.Name, l.Instrument FROM loans l JOIN members m ON l.MemberID = m.MemberID WHERE l.Status = 'out'",
      hint: "The instrument and the status live on the loan, while the name lives on the member. Match the two tables on the identifier they share, then filter on the status.",
      explain: "A join puts related rows from two tables side by side on a matching value. Notice that the name is stored once and borrowed by the query, which is precisely why correcting it in one place corrects every answer."
    },
    {
      prompt: "How many times has each instrument been loaned? Show the most borrowed first.",
      expect: "SELECT Instrument, COUNT(*) AS Loans FROM loans GROUP BY Instrument ORDER BY Loans DESC",
      hint: "This one needs no join, because both columns it uses are already on the loans table. Collapse the rows to one per instrument, then count what fell into each group.",
      explain: "Grouping turns a list of events into a description of them. The result has one row per instrument and none of the original loans, which is the clearest illustration that a summary is a different answer rather than a tidier one."
    },
    {
      prompt: "Which instruments have been borrowed more than once? Show the instrument and the number of loans, busiest first.",
      expect: "SELECT Instrument, COUNT(*) AS Loans FROM loans GROUP BY Instrument HAVING COUNT(*) > 1 ORDER BY Loans DESC",
      hint: "The condition is about a count, and the count does not exist until after the grouping has happened. That is the job WHERE cannot do.",
      explain: "WHERE filters rows and HAVING filters groups. Putting the count condition in WHERE fails because at that stage nothing has been counted yet, and the distinction becomes intuitive once you read a query in execution order rather than in writing order."
    },
    {
      prompt: "How many loans has each town produced? Show the busiest town first.",
      expect: "SELECT m.Town, COUNT(*) AS Loans FROM loans l JOIN members m ON l.MemberID = m.MemberID GROUP BY m.Town ORDER BY Loans DESC",
      hint: "The town is on the member and the loans are on the loan table, so join first and then group by the town column from the joined table.",
      explain: "This answer exists in neither table. Nobody recorded a town against a loan, yet the question is answerable because the two facts were stored in a way that lets them be brought together on demand."
    },
    {
      prompt: "For loans that have already come back, how long did they run on average?",
      expect: "SELECT AVG(Weeks) AS AvgWeeks FROM loans WHERE Status = 'returned'",
      hint: "Filter to the returned loans first, then apply the function that averages a column. With no grouping, the whole filtered table is treated as one group.",
      explain: "The filter decides the answer here as much as the function does: including loans that are still out would average an unfinished length against finished ones. An average is only as honest as the set of rows underneath it."
    }
  ]
};

ACT.dbQuiz2 = {
  kind: "quiz",
  label: "Check yourself",
  title: "Who is responsible for the data",
  how: "Each question is about where responsibility sits rather than about syntax; read every explanation before moving on.",
  objective: "3.5",
  questions: [
    {
      q: "A hypothetical town archive moves its catalogue onto a rented platform, where the provider supplies and updates the database software. Which statement is accurate?",
      opts: [
        "The archive no longer has to decide what counts as a catalogue record or which questions the catalogue must be able to answer, because a rented platform arrives with both of those already settled",
        "The archive keeps paying the database licence but gives up control of how the catalogue is designed",
        "The archive stops buying and patching the database software, and still decides which records exist, how they relate, what must be unique, and which questions the catalogue has to answer",
        "A rented platform cannot host a catalogue, because a catalogue needs database software the archive installs on its own machines"
      ],
      a: 2,
      why: [
        "A platform supplies a general-purpose place to keep records. It has no view about what an archive record ought to contain, and it will accept an incoherent design as readily as a good one.",
        "This has the trade-off backwards. The platform model is defined by the licence and the platform maintenance moving to the provider, and design was never something the provider held.",
        "Correct. The licence, the patching and the underlying machines move to the provider; the meaning of the data does not move anywhere, because it was never a technical question in the first place.",
        "Hosting a catalogue is ordinary platform work. Nothing about a catalogue requires locally installed software, which is why so many organizations run this kind of store on rented platforms."
      ]
    },
    {
      q: "A hypothetical youth theatre runs its booking system on the infrastructure service model. Who is responsible for the database software it depends on?",
      opts: [
        "The theatre, because that model supplies processing, storage and networking, and everything from the operating system upward is the customer&rsquo;s to install, licence and patch",
        "The provider, because supplying storage necessarily includes supplying the software that organizes what is stored",
        "Neither, because on that model the database runs as a shared service used by every customer on the same machines",
        "The theatre for the software and the provider for the data held inside it, which is the division of responsibility that this service model was designed around and the reason it costs less than the alternative"
      ],
      a: 0,
      why: [
        "Correct. The chapter describes that model as providing only the basic capabilities of processing, storage and networking, which is also why it says the customer keeps the most control and keeps responsibility for managing software licences.",
        "Storage in this sense means space and the machines that hold it. Organizing what goes into that space is exactly the work the customer takes on in exchange for the extra control.",
        "That describes a shared service somebody else operates, which is a different model. Here the customer receives raw capacity and decides what runs on it.",
        "The split is the other way round in one half and wrong in the other: the customer runs the software, and the data inside it is the customer&rsquo;s responsibility on every one of the three models."
      ]
    },
    {
      q: "A hypothetical dental practice proposes recording far more detail about every appointment so that it can analyse patterns later. Which cost picture matches what the chapter says?",
      opts: [
        "A single one-off cost, since the records are captured by staff who are already there and stored on machines the practice already owns",
        "A rise in storage only, because processing and software costs are fixed regardless of how much data is kept",
        "A rise in bandwidth only, because the extra detail has to travel between the practice and wherever it is stored",
        "More storage space, more capable hardware to process the data, and database software to manage and analyse it &mdash; three running costs from one decision"
      ],
      a: 3,
      why: [
        "The capture is close to free and the keeping is not. Data recorded once has to be stored, backed up, moved and eventually archived for as long as the practice keeps it, which is a commitment rather than a purchase.",
        "Storage is the visible cost and rarely the only one. Analysing a much larger set of records needs hardware that can work through it, which is why the chapter names the two together.",
        "Bandwidth does grow with richer content, and the chapter makes that point about video. It is one strand of the story rather than the whole of it, and the practice would still be paying to keep and process everything it sent.",
        "Correct. The chapter states it plainly: capturing more data requires ever more storage space, ever more powerful computing hardware, and database management systems to manage and analyse it. Deciding to record something is deciding to pay for it repeatedly."
      ]
    }
  ]
};
