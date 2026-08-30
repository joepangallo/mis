/* ===== s12a ===== */
PROSE.s12a = `
<span class="eyebrow">Section 1&ndash;2a</span>
<h2>What an information system actually is</h2>
<p class="lede">Ask most people what an information system is and they point at the computers. The chapter means something wider and far more exact, and the rest of the course rests on it: an <b>information system (IS)</b> is the combination of people and information technology that creates, collects, processes, stores, and distributes useful data. Every clause in that sentence is load-bearing, so take it apart before you use it.</p>

<h3>Take the definition apart, clause by clause</h3>
<p><b>People and information technology.</b> The people half is not politeness. The chapter is blunt about it: many of today&rsquo;s technologies operate autonomously, but they do not build themselves and they do not exist for their own sake &mdash; they are created to serve a useful purpose for people.</p>
<p>A server humming in a closet, with nobody deciding what it should do and nobody acting on what it produces, has the technology half and nothing else, so it does not meet the definition.</p>
<p><b>Creates, collects, processes, stores, and distributes.</b> Those five verbs are the job description, and a working system does all five. Watch them run in order.</p>
<ol class="steps">
<li><b>Creates</b> &mdash; tap your card at a store and the register creates a record of the sale.</li>
<li><b>Collects</b> &mdash; the network collects that record into a central system.</li>
<li><b>Processes</b> &mdash; software processes those records into the day&rsquo;s totals.</li>
<li><b>Stores</b> &mdash; a database stores the result, so it outlives the moment it was made.</li>
<li><b>Distributes</b> &mdash; a report distributes it to a manager who decides what to reorder.</li>
</ol>
<p>Drop any one verb and the chain breaks: data that are created but never distributed help nobody, and data that are distributed but never processed are just noise arriving faster.</p>
<p><b>Useful data.</b> The word <b>useful</b> is the tell. Any information system involves data that are useful for someone, somewhere &mdash; and often for more than one someone at the same time. The chapter offers three examples.</p>
<ul class="list-tight">
<li>Transactional data are useful for businesses, which is why a store keeps every single sale.</li>
<li>Status updates in your news feed on Facebook are useful for your friends and for Facebook itself &mdash; one post, two audiences.</li>
<li>Scores in a computer game are useful for the player and for the game developers alike.</li>
</ul>
<p>So whenever you evaluate a system in this course, the first question is: useful to whom, for what decision?</p>
<p>One naming note so the vocabulary never trips you up. The same phrase, <b>information systems</b>, also names the field &mdash; the people who develop, use, manage, and study these systems in organizations. Different schools and companies call that field management information systems, business information systems, computer information systems, or simply systems. Same subject.</p>

<div class="activity" data-activity="isdFill"></div>

<h3>The technology half: hardware, software, telecommunications networks</h3>
<p><b>Information technology (IT)</b> includes hardware, software, and telecommunications networks. Three parts, no more and no fewer.</p>
<ul class="keys">
<li><b>Hardware</b> is physical computer equipment &mdash; a computer, a tablet, a printer &mdash; along with components like a computer monitor or a keyboard. It has grown well past the desktop to include a variety of other input and output devices such as sensors, cameras, and actuators, which is why a thermostat and a warehouse robot arm both count as hardware.</li>
<li><b>Software</b> is a program or set of programs that tell the computer to perform certain tasks. Software is how an organization gets its business processes and its competitive strategy out of hardware, because it supplies the hardware with instructions on what processing functions to perform. Two identical laptops running different software run two different companies.</li>
<li><b>Telecommunications networks</b> are a group of two or more computer systems linked together with communications equipment. Networks allow computers to share data and services, and that sharing is what enables the global collaboration, communication, and commerce we see today &mdash; without it every system is an island holding data no one else can reach.</li>
</ul>
<p>Hardware is easier to place once you know what it replaced. Before the first computers &mdash; which worked on a mechanical basis using punch cards &mdash; the work ran on physical artifacts.</p>
<ul class="list-tight">
<li>Almost all business and government information systems consisted of file folders, filing cabinets, and document repositories.</li>
<li>A calculating device such as an abacus or a slide rule did the arithmetic.</li>
</ul>
<p>Those filing cabinets were real information systems. Computer hardware replaced those physical artifacts and gave us technologies to input and process data and output useful information. The purpose never changed; only the machinery did.</p>
<div class="callout info"><p><b>IS or IT?</b> Traditionally the term information technology referred to the hardware, software, and networking components of an information system. That difference is shrinking, and many people now use IS and IT synonymously. When a question forces the contrast, use the strict reading: IT is the technology, while an IS is that technology together with people, aimed at producing useful data.</p></div>

<div class="activity" data-activity="isdQuiz1"></div>

<h3>Data: the root and the purpose of every information system</h3>
<p>The definition begins and ends with data, so start there. Unformatted data, or simply <b>data</b>, are raw symbols, such as characters and numbers. They have no meaning in and of themselves and are of little value until processed.</p>
<p>The chapter&rsquo;s test case is the string 465889727. If someone asked you what it meant or stood for, you could not tell them &mdash; not because you lack a skill, but because there is nothing there to know.</p>
<p>Because everything downstream is built out of these symbols, the old adage garbage in, garbage out applies to data as well. That is why <b>data quality</b> is a key consideration in assessing whether data are reliable for making decisions. It consists of five named parts, and the plain reading of each is worth having in front of you.</p>
<ul class="keys">
<li><b>Completeness</b> &mdash; are any values missing? A customer file with blank zip codes cannot answer a question about shipping regions, no matter how many rows it has.</li>
<li><b>Accuracy</b> &mdash; do the values match reality? A mistyped price is worse than a missing one, because a wrong number still looks trustworthy.</li>
<li><b>Timeliness</b> &mdash; are the values current enough for this decision? Last quarter&rsquo;s inventory count cannot tell a store manager what is on the shelf tonight.</li>
<li><b>Validity</b> &mdash; do the values take the form they are supposed to take? A birth date recorded as 30/30/2001 is not a date at all, so nothing can safely compute an age from it.</li>
<li><b>Consistency</b> &mdash; do the values agree across the places they are stored? If two systems hold different addresses for the same customer, at least one is wrong and nothing in the data tells you which.</li>
</ul>
<p class="takeaway">A system is only ever as trustworthy as the symbols it starts with.</p>

<h3>Information: the same data, plus context</h3>
<p>Data can be formatted, organized, or processed to make them useful, and when that happens they are transformed into <b>information</b>, which is a representation of reality that can help answer questions about who, what, where, and when. Watch it happen to those same nine symbols.</p>
<ol class="steps">
<li>Present them as 465-88-9727, and the grouping alone looks familiar.</li>
<li>Add that they sit in a certain database, in John Doe&rsquo;s record.</li>
<li>Add a field labeled SSN, and now you might rightly surmise that the number is the Social Security number of someone named John Doe.</li>
</ol>
<p>Nothing about the digits changed. Contextual cues, such as a label, are what turn data into information that is familiar and useful to the reader.</p>
<p>The chapter&rsquo;s second example is closer to your phone. A raw list of all the transactions you made over the course of a month in a peer-to-peer mobile payment system such as Venmo would be fairly useless data &mdash; a wall of names and amounts in whatever order they happened.</p>
<p>A table that divided those same payments into two categories, sent and received, would be incredibly useful information: you could manage a monthly budget with it and make better decisions about your finances over time. Without information systems, it would be difficult to transform raw data into useful information at all.</p>

<h3>Knowledge: the part that lives in a person</h3>
<p>Information still sits on a screen, and a screen decides nothing. To actually use information, something else is required. <b>Knowledge</b> is the ability to understand information, form opinions, and make decisions or predictions based on the information. The chapter gives the word two faces.</p>
<ul class="keys">
<li><b>An ability a person brings in</b> &mdash; you must have knowledge to be aware that only one Social Security number can uniquely identify each individual, because the database never told you that; you brought it with you.</li>
<li><b>A body of governing procedures</b> &mdash; guidelines or rules used to organize or manipulate data to make them suitable for a given task, such as the rule that two records sharing one SSN are either the same person or an error.</li>
</ul>
<p>Both faces live in a person, not in a file.</p>

<div class="tbl-wrap"><table class="tbl">
<thead><tr><th></th><th>Data</th><th>Information</th><th>Knowledge</th></tr></thead>
<tbody>
<tr><td><b>Example</b></td><td>465889727</td><td>465-88-9727</td><td>465-88-9727 &rarr; John Doe</td></tr>
<tr><td><b>What it is</b></td><td>Raw symbols</td><td>Formatted data</td><td>Data relationships</td></tr>
<tr><td><b>Meaning</b></td><td>???</td><td>SSN</td><td>SSN &rarr; unique person</td></tr>
</tbody>
</table></div>

<div class="callout exam"><p><b>The one distinction to get right.</b> Data are raw symbols. Information is data given form and context so that it answers who, what, where, and when. Knowledge is the ability to understand that information and act on it. The trap is usually a middle option that sounds like the top one: a well-formatted, clearly labeled, freshly generated report is still information, however impressive it looks. It becomes knowledge only inside someone who can read it, judge what it means, and decide.</p></div>

<div class="activity" data-activity="isdDiagram"></div>

<div class="activity" data-activity="isdSort"></div>

<h3>Systems integration: making the pieces speak to each other</h3>
<p>Hardware, software, and networking components evolve rapidly, which makes the ability to tie everything together ever more important. Two chapter terms name that work.</p>
<ul class="keys">
<li><b>Internetworking</b> is connecting host computers and their networks together to form even larger networks, like the internet.</li>
<li><b>Systems integration</b> is connecting separate and often modular information systems and data, using technologies such as APIs, to improve business processes and decision making.</li>
</ul>
<p>Integration is also why the tidy question &ldquo;what kind of system is this?&rdquo; often has no tidy answer any more. Ten to 15 years ago it would have been typical to see systems that fell cleanly into one category, and two developments since then blurred the lines.</p>
<ul class="list-tight">
<li>Today many organizations have replaced stand-alone systems with enterprise systems that span the entire organization.</li>
<li>With internetworking and systems integration in play, it is difficult to say that any given information system fits into only one category.</li>
</ul>
<p>Systems integration also sits on the chapter&rsquo;s list of skills IS professionals need, described there as connectivity, compatibility, and integrating subsystems and systems.</p>

<div class="activity" data-activity="isdQuiz2"></div>

<div class="callout tip"><p>If you keep one thing from this section, keep the shape of the definition: people and information technology (hardware, software, telecommunications networks) doing five things &mdash; create, collect, process, store, distribute &mdash; to data, so that what comes out is useful to someone. Every system named in the rest of the chapter is a variation on that single sentence.</p></div>
`;

ACT.isdFill = {
  kind: "fill",
  label: "Complete it",
  title: "Rebuild the two definitions word for word",
  how: "Choose the option that makes each sentence match the chapter's definition exactly.",
  objective: "1.2",
  blanks: [
    {before: "An information system is the combination of people and ",
     after: " that creates, collects, processes, stores, and distributes useful data.",
     choices: ["computer hardware", "information technology", "business processes"],
     a: 1,
     why: "The definition pairs people with information technology as a whole. Hardware is only one of IT's three parts, and business processes are what the system supports, not a component of it."},
    {before: "Information technology includes hardware, software, and ",
     after: ".",
     choices: ["databases", "operating systems", "telecommunications networks"],
     a: 2,
     why: "An operating system is itself software, and a database is something software manages and hardware stores, so neither is a separate component. The third named component of IT is the telecommunications networks that link systems together."},
    {before: "A program or set of programs that tell the computer to perform certain tasks is ",
     after: ".",
     choices: ["hardware", "software", "a telecommunications network"],
     a: 1,
     why: "Hardware is the physical equipment; the instructions telling that equipment which processing functions to perform are software."},
    {before: "A group of two or more computer systems linked together with communications equipment is ",
     after: ".",
     choices: ["a telecommunications network", "an information system", "systems integration"],
     a: 0,
     why: "An information system would also need people and useful data, and systems integration is the work of connecting separate systems, not the linked equipment itself."},
    {before: "Physical computer equipment such as a computer, tablet, or printer, plus components like a monitor or keyboard, is ",
     after: ".",
     choices: ["software", "hardware", "information"],
     a: 1,
     why: "Hardware is the physical equipment, and the chapter extends it to sensors, cameras, and actuators as well as traditional computer components."},
    {before: "An information system creates, collects, processes, stores, and distributes data that are ",
     after: " for someone, somewhere.",
     choices: ["useful", "accurate", "timely"],
     a: 0,
     why: "Accuracy and timeliness are two of the five parts of data quality, which is a separate idea; the word in the definition itself is useful, as in transactional data that are useful for businesses and game scores that are useful for the player and the developers alike."}
  ]
};

ACT.isdQuiz1 = {
  kind: "quiz",
  label: "Check yourself",
  title: "The definition and its technology components",
  how: "Pick the best answer, then read every explanation, including the ones for options you did not choose.",
  objective: "1.2",
  questions: [
    {q: "Which statement matches the chapter's definition of an <b>information system</b>?",
     opts: [
       "A computer program that stores and retrieves an organization's records.",
       "The hardware, software, and telecommunications networks an organization owns.",
       "The combination of people and information technology that creates, collects, processes, stores, and distributes useful data.",
       "The department that maintains an organization's computers and user accounts."
     ],
     a: 2,
     why: [
       "That describes a piece of software, which is one part of the information technology half of an information system. It leaves out the people, the hardware the program runs on, the network it uses, and the useful data that is the point of the whole thing. It would be right if the question had asked what software is.",
       "That is the chapter's definition of information technology, not of an information system. Add the people and the useful data the system produces and you would have the IS definition.",
       "Correct, and it is the chapter's wording exactly: two halves (people and information technology), five verbs (creates, collects, processes, stores, distributes), and an ending that names the output as useful data.",
       "The chapter does note that information systems is also used to name the field of people who develop, use, manage, and study these systems, so this is a real part of the IS world. But a support department is a group of people doing a job, not the system itself."
     ]},
    {q: "A hospital installs a small sensor that reads a patient's heart rate and passes each reading over the hospital's wireless link to a monitoring program running on a server in another building. Which part of that description is <b>hardware</b>?",
     opts: [
       "The monitoring program that reads each number and raises an alarm.",
       "The sensor on the patient and the server that receives the readings.",
       "The wireless link connecting the patient's floor to the other building.",
       "The heart-rate readings the sensor produces."
     ],
     a: 1,
     why: [
       "A program is software: a set of programs that tell the computer what processing functions to perform. It runs on hardware but is not hardware itself.",
       "Correct. Hardware is physical computer equipment, and the chapter explicitly extends it beyond traditional computer components to input and output devices such as sensors, cameras, and actuators. A server is physical equipment too.",
       "That is a telecommunications network: two or more computer systems linked together with communications equipment. The equipment carrying the link is physical, but what the option names is the connection between systems, which the chapter counts as the third IT component rather than as hardware.",
       "Readings are data, the raw symbols the system creates and collects. They are what the hardware produces, not the hardware."
     ]},
    {q: "The chapter says the difference between IS and IT is shrinking and that many people use the terms synonymously. What distinction does it still draw between them?",
     opts: [
       "Information technology is what an organization buys from vendors; an information system is what it develops itself.",
       "Information technology is technology used by consumers; an information system is technology used inside businesses.",
       "Information technology is the newer term, and it has replaced information system in modern organizations.",
       "Information technology is the hardware, software, and networks; an information system adds people and produces useful data."
     ],
     a: 3,
     why: [
       "Where a technology came from has nothing to do with the definitions. A purchased payroll package and an in-house one are both software, and both sit inside an information system that also has people and data.",
       "The chapter draws no consumer-versus-business line here. Its own examples of useful data include a personal news feed and scores in a computer game right alongside business transactional data.",
       "This has the history backwards. Information technology is the older, narrower term for the hardware, software, and networking components; the two terms are now often used interchangeably, but neither replaced the other.",
       "Correct. Traditionally IT named the hardware, software, and networking components of an information system, while the IS definition wraps those components together with people and points them at producing useful data."
     ]}
  ]
};

ACT.isdDiagram = {
  kind: "diagram",
  label: "Interactive diagram",
  title: "From raw symbols to a working system",
  how: "Select each stage to see what it contains and what has to be added to reach the next one.",
  objective: "1.2",
  models: [
    {id: "data", name: "Data", site: "Raw symbols, carrying no meaning yet",
     boxes: [
       {c: "a", t: "465889727", w: "Nine characters"},
       {c: "b", t: "No label", w: "Nothing states what it is"},
       {c: "c", t: "No answer", w: "You cannot say what it stands for"}
     ],
     points: [
       "<b>Data</b> are raw symbols, such as characters and numbers, and they have no meaning in and of themselves.",
       "Data are of little value until processed, which is why the chapter calls them the root rather than the result.",
       "<b>Data quality</b> decides whether they are reliable enough to make decisions on: completeness, accuracy, timeliness, validity, and consistency.",
       "Garbage in, garbage out &mdash; every later stage inherits whatever defects are in the symbols."
     ]},
    {id: "information", name: "Information", site: "Formatted data that answers who, what, where, and when",
     boxes: [
       {c: "a", t: "465-88-9727", w: "Formatted"},
       {c: "b", t: "Field: SSN", w: "A label supplies context"},
       {c: "c", t: "Record: John Doe", w: "It now points at someone"}
     ],
     points: [
       "<b>Information</b> is a representation of reality that helps answer questions about who, what, where, and when.",
       "Data become information when they are formatted, organized, or processed &mdash; the digits themselves never changed.",
       "Contextual cues, such as a label, are what make data familiar and useful to a reader.",
       "The month of payments split into <b>sent</b> and <b>received</b> is the same move: useless list in, usable budget table out."
     ]},
    {id: "knowledge", name: "Knowledge", site: "The ability to understand information and act on it",
     boxes: [
       {c: "a", t: "SSN to person", w: "A relationship, not a value"},
       {c: "b", t: "One number, one person", w: "A governing rule"},
       {c: "c", t: "Decide or predict", w: "Approve, flag, or reject"}
     ],
     points: [
       "<b>Knowledge</b> is the ability to understand information, form opinions, and make decisions or predictions from it.",
       "You need knowledge to be aware that only one Social Security number can uniquely identify each individual.",
       "Knowledge is also a body of governing procedures &mdash; guidelines or rules &mdash; used to organize or manipulate data for a given task.",
       "It is the only stage that lives in a person rather than in a file, which is why the people half of the IS definition is not optional."
     ]},
    {id: "system", name: "The whole system", site: "People plus information technology, producing useful data",
     boxes: [
       {c: "a", t: "People", w: "Build, manage, and use it"},
       {c: "b", t: "Hardware", w: "Equipment, sensors, actuators"},
       {c: "c", t: "Software", w: "Instructions for the hardware"},
       {c: "d", t: "Networks", w: "Two or more systems linked"}
     ],
     points: [
       "These four together make an <b>information system</b> that creates, collects, processes, stores, and distributes useful data.",
       "The three technology boxes are exactly what the chapter means by <b>information technology</b>: hardware, software, telecommunications networks.",
       "<b>Systems integration</b> connects separate, often modular systems and their data using technologies such as APIs, so the boxes of different systems can work as one.",
       "Useful means useful to somebody: transactional data serve the business, a news feed serves your friends and the platform, game scores serve the player and the developers."
     ]}
  ]
};

ACT.isdSort = {
  kind: "sort",
  label: "Sort",
  title: "Data, information, or knowledge?",
  how: "Place each item in the bucket that matches what it is at that moment, not what it could eventually become.",
  objective: "1.2",
  buckets: [
    {id: "data", name: "Data", hint: "raw, unformatted symbols with no meaning attached"},
    {id: "information", name: "Information", hint: "formatted or organized so it answers who, what, where, when"},
    {id: "knowledge", name: "Knowledge", hint: "understanding, rules, and the ability to decide"}
  ],
  items: [
    {t: "The string 465889727, with no label and nothing around it", b: "data",
     why: "These are raw symbols, and the chapter's whole point is that you cannot say what they mean or stand for."},
    {t: "465-88-9727 stored in a field named SSN inside John Doe's record", b: "information",
     why: "Formatting plus a label plus a record is exactly the context that turns the same digits into a representation of reality."},
    {t: "Being aware that only one Social Security number can uniquely identify each individual", b: "knowledge",
     why: "No database supplied that; it is the understanding a person brings, and it is what lets someone spot a duplicate as an error."},
    {t: "A list of every payment you sent and received last month, in the order they happened", b: "data",
     why: "The chapter calls exactly this a fairly useless list until it is organized, because nothing about the order answers a question you care about."},
    {t: "That same month of payments shown in a table split into sent and received", b: "information",
     why: "Dividing the transactions into categories is the formatting step, and the chapter calls the result incredibly useful for managing a budget."},
    {t: "Your conclusion, after reading that table, that you should stop paying for weeknight delivery", b: "knowledge",
     why: "Forming an opinion and making a decision based on information is the chapter's definition of knowledge."},
    {t: "The value 98.6 arriving from a thermometer sensor with no label attached", b: "data",
     why: "A number produced by real equipment measuring a real body is still a raw symbol until something says what it is a measurement of."},
    {t: "A chart line reading Temperature 98.6 F, taken 3:14 p.m.", b: "information",
     why: "The label and the timestamp answer what and when, which is precisely the work information does."},
    {t: "The standing rule that any temperature above 100.4 F must be reported to a physician", b: "knowledge",
     why: "The chapter describes knowledge as a body of governing procedures, such as guidelines or rules, used to make data suitable for a task."},
    {t: "The characters a barcode scanner sends to the register when an item is scanned", b: "data",
     why: "The scanner creates raw symbols; software has to process them against a product file before anyone learns a price or a product name."}
  ]
};

ACT.isdQuiz2 = {
  kind: "quiz",
  label: "Check yourself",
  title: "The distinction that gets tested most",
  how: "Answer, then read all four explanations, because the wrong options here are the ones students actually pick.",
  objective: "1.2",
  questions: [
    {q: "A fitness band records the value <b>72</b> every ten seconds and stores each one with no label attached. At that moment, what is the value 72?",
     opts: [
       "Information, because the band captured the value and wrote it to storage, and being held in a system is what makes a number information.",
       "Data, because it is a raw symbol that carries no meaning until something formats, organizes, or processes it.",
       "Knowledge, because the band acts on the value to decide when to buzz your wrist, and acting on a number is what knowledge means.",
       "Information, because 72 sits in the normal heart-rate range, so a reader can work out its meaning without a label."
     ],
     a: 1,
     why: [
       "Storing something changes where it lives, not what it is. Data become information when they are formatted, organized, or processed, and none of those has happened here; a stored value with no label is still data.",
       "Correct. Unformatted data are raw symbols such as characters and numbers, with no meaning in and of themselves and little value until processed. That is precisely the state of an unlabeled 72.",
       "An automated threshold is a rule applied to data, not knowledge in the chapter's sense. Knowledge is the ability to understand information, form opinions, and make decisions or predictions from it, so it needs a person who can judge what the reading means.",
       "This is the most tempting wrong answer, because you personally can guess what 72 means. But the chapter is explicit that contextual cues, such as a label, are needed to turn data into information. Attach the label heart rate, in beats per minute, at 2:15 p.m., and the same value becomes information."
     ]},
    {q: "The chapter contrasts a raw month of peer-to-peer payment transactions with a table that divides the same payments into sent and received. Which reading matches the chapter?",
     opts: [
       "The raw list is data and the table is information, because sorting them into categories gives them a form a person can use.",
       "Both are information, because both are records of payments that really happened.",
       "The raw list is information and the table is knowledge, because the table can be used to make budgeting decisions.",
       "The raw list is data and the table is knowledge, because the app processed the transactions to build it."
     ],
     a: 0,
     why: [
       "Correct. The chapter calls the raw list fairly useless data and the categorized table incredibly useful information, and the only thing that changed between them is organization.",
       "Being true does not make something information. Truth is a data-quality question (accuracy); the data-versus-information question is about whether the values have been given form and context.",
       "Half right and half wrong, which is what makes it tempting. The raw list has no organization at all, so it is data, not information. And a table cannot be knowledge: knowledge is the ability to understand the table and decide, which lives in the person reading it.",
       "Processing is how data become information, not how they become knowledge. The app can produce the table all by itself; it cannot form the opinion that your delivery spending is too high."
     ]},
    {q: "Which of these is <b>knowledge</b> in the chapter's sense?",
     opts: [
       "The nine digits 465889727, with nothing attached to them.",
       "The value 465-88-9727 sitting in a field labeled SSN in John Doe's record.",
       "Understanding that a Social Security number identifies exactly one person, so two records sharing one must be the same person or an error.",
       "A printed report listing every customer's Social Security number beside their account balance."
     ],
     a: 2,
     why: [
       "That is the chapter's example of data: raw symbols you cannot interpret. It would become information the moment a label and a record put it in context.",
       "That is information: formatted data with contextual cues that answer who and what. It is one step short of knowledge, which is the step most students skip.",
       "Correct. Knowledge is the ability to understand information, form opinions, and make decisions or predictions from it, and it also covers governing rules such as one number, one person, used to organize or manipulate data for a task.",
       "That is a lot of information at once, cleanly formatted and labeled, but volume and polish are not knowledge. The report becomes knowledge only in a person who can read it, judge what it means, and act &mdash; flagging a duplicate, catching an error, approving a loan."
     ]}
  ]
};
