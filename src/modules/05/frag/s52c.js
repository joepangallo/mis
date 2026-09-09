/* ===== s52c ===== */
PROSE.s52c = `
<span class="eyebrow">Section 5&ndash;2c</span>
<h2>Collaborating at scale</h2>
<p class="lede">The last two jobs on the chapter's list are the ones with the largest strategic consequences. Collaboration is several people working the same problem at once. Connection is what happens when a firm can reach a crowd, and the crowd can reach back.</p>

<h3>The cloud made collaboration ordinary</h3>
<p>Sharing a document used to mean emailing it and hoping. <b>Cloud-based collaboration tools</b> removed the round trip: a file lives in one place, syncs to every device, and several people work the current version rather than their own copy. Cloud productivity suites go further and put the software itself in the browser.</p>
<p>That sounds like an unmixed good, and the chapter is careful to price both sides. The benefits and the risks fall in four places, and a firm rarely notices a risk until the day it arrives.</p>
<p>One of the four deserves saying plainly before you sort them. A cloud tool needs a live connection, so the work stops when the connection does, and the firm has traded a problem it could fix for one it can only wait out.</p>

<div class="activity" data-activity="conSort"></div>

<p>The category is wider than a shared folder. The chapter's own list runs from single-purpose tools to suites that mirror an offline office.</p>
<ul class="keys">
<li><b>Single-purpose services</b> cover one job well &mdash; a spreadsheet, a presentation, a project board, a notes and task list, or a place to store and share files.</li>
<li><b>Integrated suites</b> pull document sharing, editing and videoconferencing into one product, which is how a firm ends up with a technology strategy it did not write.</li>
<li><b>A content management system</b> lets people publish, edit, version and retrieve digital content without a technical department, which is why a product manager can correct a description directly.</li>
<li><b>A learning management system</b> applies the same idea to teaching: content, assessment, enrolment and grades, and increasingly discussion and group work as well.</li>
</ul>

<p>What makes a content management system more than a publishing tool is the permission model. Roles decide who may create, who may edit and who may only read, which is how a firm lets a hundred people maintain its content without any of them being able to break it.</p>
<p>The same platforms then carry intranet and extranet sites, shared workspaces, to-do lists, discussion boards and alerts, which is how a system bought to run a website ends up running the collaboration around it.</p>

<h3>Work done by people a firm does not employ</h3>
<p><b>Collective intelligence</b> is the idea that a distributed group holding divergent information and expertise can outperform individual experts. The chapter takes it from a book on the wisdom of crowds, and the word doing the work in that definition is divergent: a group that all knows the same thing is just one expert repeated.</p>
<p><b>Peer production</b> is what collective intelligence looks like when it makes something: goods or services created by self-organizing communities, where the outcome depends on incremental contributions and anyone can improve it.</p>
<p>Firms reach for this deliberately as well. <b>Open innovation</b> is the practice of pulling external stakeholders into a firm's own research and development, forming ad hoc networks that reach past the people on its payroll.</p>
<p>Three arrangements in the chapter run on that principle, and they are not interchangeable.</p>
<ul class="keys">
<li><b>Open source software</b> is built and maintained by volunteers worldwide, and firms participate to influence its direction, to audit code they depend on, and to build goodwill in a community they draw from.</li>
<li><b>Wikis</b> let anyone create, edit or delete content, with every prior version retained so vandalism can be reverted and disputes can be argued in the open rather than in private.</li>
<li><b>Crowdsourcing</b> distributes small, self-contained pieces of work called <b>human intelligence tasks</b> &mdash; tagging an image, fixing a title, transcribing audio &mdash; to whoever will take them, usually for a few cents each.</li>
</ul>
<p>Compare all three side by side, because the differences decide which one a firm can actually use for a given problem.</p>

<div class="activity" data-activity="conDiagram"></div>

<p>The chapter is honest about what peer production costs, and names three failures that are structural rather than accidental.</p>
<ul class="keys">
<li><b>Coverage inherits its contributors</b>, so an open encyclopaedia is uneven in exactly the places its volunteer base is thin, and its known bias runs in a particular direction.</li>
<li><b>Interested parties edit their own entries</b>, which means politicians, companies and other subjects of interest quietly improve the record about themselves.</li>
<li><b>Editing wars break out</b>, where contributors repeatedly undo one another, which is the visible form of a disagreement no editor is empowered to settle.</li>
</ul>
<p>The chapter's advice is to treat such a source as a starting point and check what it cites, which is advice about every peer-produced source rather than about one site.</p>

<div class="activity" data-activity="conCase"></div>

<p class="takeaway">Peer production is the cheapest labour a firm will ever find and the least controllable. It cannot be commissioned, it cannot be hurried, and what it produces belongs to the composition of whoever turned up &mdash; which is why the next section is about the arrangements where a firm keeps more of the say.</p>

<div class="activity" data-activity="conQuiz"></div>
`;

ACT.conSort = {
  kind: "sort",
  label: "Sort",
  title: "Where does each consequence of cloud collaboration land?",
  how: "Each statement is a benefit or a risk of cloud-based collaboration tools; put it in the domain where it lands, using the chapter's four categories.",
  objective: "5.2",
  buckets: [
    {id: "it", name: "Information technology", hint: "Consequences for the technology function itself: what it has to build, run and control."},
    {id: "org", name: "Organization", hint: "Consequences for how the tools spread through a workforce and what happens when they are misunderstood."},
    {id: "comp", name: "Competition", hint: "Consequences for how fast the firm can move against rivals, and what rivals might obtain."},
    {id: "upg", name: "Upgrade cycles", hint: "Consequences of the fact that somebody else decides when the software changes."}
  ],
  items: [
    {t: "Costs and risks fall, because the tools already exist and are cheap to deploy", b: "it", why: "The chapter's benefit for the technology function: a preexisting web-based tool avoids the cost and the risk of building an equivalent in house."},
    {t: "The firm loses control of its data and of service quality to the provider", b: "it", why: "The matching risk. Data and tools sit on somebody else's servers, so both availability and the handling of the data become somebody else's decision."},
    {t: "The tools are easy enough to use that they spread through the workforce quickly", b: "org", why: "The chapter's organizational benefit, and the reason these tools arrive without a project: people adopt them because they already know how."},
    {t: "There is little documentation, training or support when something goes wrong", b: "org", why: "The matching organizational risk. Tools that arrived without a project also arrived without anybody responsible for them when they fail."},
    {t: "Product cycles speed up and the firm can answer a rival's move quickly", b: "comp", why: "The competitive benefit: these tools are more efficient than email and legacy collaboration, which shortens the time between deciding and doing."},
    {t: "Security and compliance rules are hard to enforce, raising the risk of exposure", b: "comp", why: "The competitive risk, and the one the chapter puts most sharply: sensitive material moves outside the firm's controls, and industrial espionage becomes easier."},
    {t: "Nobody has to buy or install a software upgrade ever again", b: "upg", why: "The benefit of somebody else running the software: upgrades stop being a purchase, a project, and a compatibility problem."},
    {t: "Features can change without notice, breaking how people worked yesterday", b: "upg", why: "The matching risk, and the one firms consistently underestimate. The provider's roadmap is now part of the firm's technology strategy whether it agreed to that or not."}
  ]
};

ACT.conDiagram = {
  kind: "diagram",
  label: "Compare",
  title: "Three ways to get work from people you do not employ",
  how: "Step through the three arrangements; they run on the same principle and are not interchangeable, and the notes under each say when it can actually be used.",
  objective: "5.2",
  models: [
    {
      id: "oss",
      name: "Open source software",
      site: "Volunteers build and maintain something everyone can use, including firms that contributed nothing.",
      boxes: [
        {c: "a", t: "Someone publishes a first version", w: "Usually to solve their own problem"},
        {c: "b", t: "Developers join the project", w: "Looking for interesting work"},
        {c: "c", t: "Contributions are reviewed", w: "Often only committers may merge"},
        {c: "d", t: "Anyone may use the result", w: "Including firms that gave nothing"}
      ],
      points: [
        "A firm participates to steer the direction of software it depends on, to audit source code it is trusting, and to build standing in a community it recruits from.",
        "It is the least open of the three in one specific way: many projects let anyone propose a change and let only a few actually apply it.",
        "It cannot be commissioned. A firm can contribute and cannot decide what the project will do, which makes it unusable for anything the firm must control."
      ]
    },
    {
      id: "wiki",
      name: "Wikis and peer production",
      site: "A community writes and corrects a shared body of content, with every version kept.",
      boxes: [
        {c: "a", t: "Anyone may create or edit", w: "No editorial gatekeeper"},
        {c: "b", t: "Every version is retained", w: "In a database behind the pages"},
        {c: "c", t: "Bad edits are reverted", w: "And argued over in the open"},
        {c: "d", t: "Quality rises with participation", w: "And inherits who participates"}
      ],
      points: [
        "The retained history is the whole mechanism. Vandalism is cheap to undo, which is why open editing survives contact with the public at all.",
        "Inside a firm this is how an internal knowledge repository gets written by the people who know things rather than by whoever was assigned to document them.",
        "It inherits the composition of its contributors, so uneven coverage and systematic bias are structural rather than accidental, and both need checking against other sources."
      ]
    },
    {
      id: "crowd",
      name: "Crowdsourcing micro-tasks",
      site: "A firm splits work into small self-contained tasks and pays whoever completes them.",
      boxes: [
        {c: "a", t: "Work is split into small tasks", w: "Each one easy for a person"},
        {c: "b", t: "Tasks are posted to a marketplace", w: "With a price attached, often cents"},
        {c: "c", t: "Anyone may take one", w: "Using time they were not selling"},
        {c: "d", t: "Results return, and are paid for", w: "Quality checked by the requester"}
      ],
      points: [
        "This is the one a firm can actually commission, because it is paid work with a specification, and it is the one that displaces a category of employment.",
        "It only fits tasks a person finds easy and a computer finds hard, and that are small enough to describe completely: tagging an image, fixing a title, transcribing a clip.",
        "Quality control is the requester's problem and the largest hidden cost. Work arrives from people with no context, so the checking has to be designed before the tasks are posted."
      ]
    }
  ]
};

ACT.conCase = {
  kind: "case",
  label: "Mini case",
  title: "Forty thousand untagged photographs",
  how: "Read the brief and the exhibit, then take the three decisions in order; the archive and every figure attached to it are hypothetical and were invented for this exercise.",
  objective: "5.2",
  brief: "A regional newspaper group has digitised forty thousand photographs from its own archive. None of them carries a usable description, so none can be found, and the group cannot license what it cannot find. Three routes have been proposed: two staff researchers, a crowdsourcing marketplace, or opening the archive to readers on a wiki. The group is hypothetical and every figure attached to it is invented.",
  facts: [
    {k: "The holding", v: "Forty thousand digitised photographs from a regional newspaper archive"},
    {k: "The problem", v: "No usable descriptions, so nothing in the archive can be found or licensed"},
    {k: "What a good record needs", v: "Subject, place, approximate date, and the names of anyone identifiable"},
    {k: "Who knows the answers", v: "Local readers, for the places and many of the people; nobody at the group"},
    {k: "The three routes", v: "Two staff researchers, a crowdsourcing marketplace, or a public wiki"}
  ],
  exhibit: {
    name: "Exhibit A &middot; The three routes, costed",
    caption: "What each route would produce on the group's own estimates. Every figure here is invented for practice and none of it is reported data.",
    headers: ["Line", "Two staff researchers", "Crowdsourcing marketplace", "Public reader wiki"],
    rows: [
      ["Cost to describe all forty thousand", "US$96,000 in salary", "US$4,400 in task fees", "US$9,000 to build and moderate"],
      ["Time to complete", "About 14 months", "About 6 weeks", "Open-ended; never finishes"],
      ["Can identify the subject in the picture", "Sometimes, from the caption files", "Rarely; no local knowledge", "Often; readers were there"],
      ["Can supply place and approximate date", "Usually", "From visual clues only", "Usually, and corrects errors"],
      ["Errors found in a sample of 200", "6", "31", "22 at first, 4 after other readers edited"],
      ["Who owns the resulting descriptions", "The group", "The group", "Negotiable, and not automatic"]
    ]
  },
  questions: [
    {
      q: "The crowdsourcing route is cheapest by a wide margin and has the worst error rate. What explains both at once?",
      opts: [
        "Marketplace workers are less careful, because the payment per task is very small",
        "The task needs local knowledge, which the marketplace cannot supply at any price",
        "The photographs are too old for anybody to identify without the original caption files",
        "The group specified the task badly, and a better specification would fix the errors"
      ],
      a: 1,
      why: [
        "Payment shapes effort at the margin, and it cannot buy something the worker does not have. Doubling the fee does not make a distant worker recognise a street they have never seen.",
        "Correct. Crowdsourcing fits tasks that are easy for any person and hard for a computer. Naming a local street in 1974 is easy only for a person who was there, which is why the price and the error rate move together.",
        "Readers manage it often, according to the same exhibit, so age is not what is stopping identification. What differs between the routes is who is looking.",
        "A sharper specification helps with what is describable from the image and cannot conjure knowledge the worker does not hold. The mismatch is in the task, not the wording."
      ]
    },
    {
      q: "The wiki route shows errors falling from twenty-two to four once other readers had edited. Which mechanism is that?",
      opts: [
        "Moderation, since paid moderators removed the incorrect descriptions",
        "The network effect, since more readers made the archive more valuable to each of them",
        "Peer production, where incremental contributions correct each other over time",
        "Version history, which let the group roll back to a description that was right"
      ],
      a: 2,
      why: [
        "Moderators handle abuse and vandalism, and the exhibit describes readers correcting readers. The cost line budgets for moderation without making it the mechanism.",
        "The network effect describes value rising with participation and would explain why readers keep coming. It does not explain why a specific wrong date became a right one.",
        "Correct. Peer production is exactly this: the result depends on incremental contributions, and anyone can improve what somebody else produced, which is how open editing converges rather than degrades.",
        "Retained history makes correction safe, so a bad edit can be undone. Rolling back does not create the better description that replaced the wrong one."
      ]
    },
    {
      q: "The board wants the archive described and owned outright within the financial year. What does the exhibit imply?",
      opts: [
        "The wiki route, since it alone produces descriptions with accurate local detail",
        "The crowdsourcing route, since only it completes inside the year at a defensible cost",
        "A combination, with crowdsourcing for what an image shows and readers for local detail",
        "The staff route, since it is the only one that meets both requirements as stated"
      ],
      a: 3,
      why: [
        "The wiki produces the best local descriptions, never finishes, and leaves ownership to be negotiated. It fails both of the board's constraints, however good its output is.",
        "Crowdsourcing does finish inside the year, and it fails on quality for the fields that matter: subject, place and date are precisely what it cannot supply.",
        "A combination is the strongest answer to the underlying problem and does not satisfy the board's own constraints, because the reader half neither completes nor transfers ownership.",
        "Correct. Fourteen months is uncomfortable and the other two routes fail a stated requirement outright. The honest conclusion is that the board's constraints, not the routes, are what needs revisiting."
      ]
    }
  ],
  debrief: "The exhibit is arranged so the cheapest option is the worst fit, and the reason is the chapter's own rule about crowdsourcing: it suits tasks that are easy for any person and hard for a computer. Identifying a local street in an old photograph is easy only for somebody who was there, so the marketplace cannot do it at any price. The wiki reaches exactly those people and gives up completion and ownership to do it, which peer production always does. The last decision matters most: two of the three routes fail a constraint the board set rather than a test the analysis applied, and saying so is part of the analysis."
};

ACT.conQuiz = {
  kind: "quiz",
  label: "Check",
  title: "Cloud tools, crowds, and what they can be asked for",
  how: "Three questions on the mechanisms behind collaboration at scale; every option explains itself, including the ones you did not pick.",
  objective: "5.2",
  questions: [
    {
      q: "A firm standardises on a cloud productivity suite and cancels its own software licences. Which of the chapter's risks has it accepted along with the saving?",
      opts: [
        "That the provider decides when features change",
        "That the tools will be harder to use than the software they replaced",
        "That staff will need more training than the previous suite required",
        "That the annual cost will rise once the introductory pricing period ends"
      ],
      a: 0,
      why: [
        "Correct. The chapter's upgrade-cycle entry has a benefit and a matching risk: nobody buys upgrades any more, and in exchange the provider's roadmap becomes part of the firm's technology strategy, changing without notice whether it agreed or not.",
        "Ease of use is the chapter's organizational benefit rather than a risk, and it is why these tools spread through a workforce without a project behind them.",
        "The chapter's organizational risk is the opposite: little documentation, training or support exists, precisely because the tools are easy enough that nobody planned for any.",
        "Price increases are a genuine commercial risk of any subscription and are not among the four consequences the chapter tabulates."
      ]
    },
    {
      q: "What does collective intelligence actually require, in the chapter's account of it?",
      opts: [
        "A large enough group that individual mistakes cancel out across the whole",
        "A group whose members hold divergent information and expertise",
        "A moderator able to settle disagreements the group cannot resolve itself",
        "Members who are volunteers, since paid contributors distort the outcome"
      ],
      a: 1,
      why: [
        "Size helps and is not the condition. A very large group that all knows the same thing is one expert repeated many times, and it makes the same mistake in unison.",
        "Correct. The chapter's definition turns on divergence: distributed groups with a divergent range of information and expertise can outperform individual experts, which is where the advantage comes from.",
        "Wikis work with no such authority, and the chapter describes editing wars as what happens when nobody is empowered to settle a dispute. It is a known cost rather than a requirement.",
        "Crowdsourcing pays its contributors and is one of the chapter's examples of harnessing the crowd. Payment changes who turns up rather than whether the mechanism works."
      ]
    },
    {
      q: "A publisher wants a crowdsourcing marketplace to write summaries of its specialist legal titles. Why is that a poor fit?",
      opts: [
        "Summarising is creative work, and marketplaces handle only mechanical tasks",
        "The task is too large to be paid for at the rates these marketplaces use",
        "The task is not one a person can do easily without expertise the crowd lacks",
        "The publisher would lose copyright in summaries written by outside contributors"
      ],
      a: 2,
      why: [
        "The line is not creative against mechanical. Plenty of judgement-based micro-tasks work well, and plenty of mechanical ones do not fit for other reasons.",
        "Cost would follow from the size of the job and the chapter's constraint is about the nature of the task, not its price. A well-matched task stays cheap at volume.",
        "Correct. The chapter's rule is that these are tasks humans solve easily and computers find hard. Summarising specialist legal writing is hard for almost every human too, so the crowd cannot supply it at any rate.",
        "Ownership is set by the marketplace's terms and is a contractual matter rather than the reason the work would come back unusable."
      ]
    }
  ]
};
