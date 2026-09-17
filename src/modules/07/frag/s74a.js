/* Chapter 7 lesson and activity data. Rebuild with node src/build.mjs --module=modules/07. */
PROSE.s74a = "\n<span class=\"eyebrow\">Objective 7.4 · Part 1</span><h2>Knowledge management: what leaves when people do</h2>\n<p class=\"lede\">Fairmount Provisions, the hypothetical distributor these practice cases use, runs forty depots and employs 1,100 staff. Your longest-serving depot manager retires in five months. He carries thirty-one years of knowing which chef will accept a substitution, which one will cancel the standing order, and which one will tell every other kitchen in the district. None of that is in a database. None of it can be forecast by a model. This section is about what an organization can actually do before he walks out.</p>\n<h3>Data, information, and the assets in between</h3>\n<p>Recall the ladder from the first chapter. <b>Data</b> are raw, unformatted symbols such as characters and numbers. <b>Information</b> is data that has been formatted, organized or processed so that it is useful to people. <b>Knowledge</b> is what you need in order to understand the relationships between separate pieces of information.</p>\n<p><b>Knowledge management</b> is the set of processes an organization uses to gain the greatest value from its knowledge assets. There is no universal agreement on the term, and that is not your problem to fix. What matters is knowing what counts as an asset.</p>\n<p>The chapter counts two different sorts of thing as an asset, the second broader than most students expect, and gives two reasons to care:</p>\n<ul class=\"keys\"><li><b>What people carry</b> covers skills, routines, practices, principles, formulas, methods, heuristics and the intuitions built by doing a job for years.</li><li><b>The artifacts that record it</b> covers databases, manuals, reference works, textbooks, diagrams, displays, computer files, proposals and plans.</li><li><b>Why a company bothers</b> is that knowledge assets, properly used, improve its efficiency, its effectiveness and eventually its profitability.</li><li><b>Why the subject is urgent now</b> is retirement: as a large generation of staff leaves, firms are using these systems to capture what goes with them.</li></ul>\n<h3>The line between explicit and tacit</h3>\n<p><b>Explicit knowledge assets</b> reflect knowledge that can be documented, archived and codified, often with the help of information systems. Much of what sits in a database management system is explicit.</p>\n<p><b>Tacit knowledge assets</b> are the processes and procedures located in a person's mind for performing a particular task well. They are often the organization's real best practices, meaning the procedures widely accepted as the most effective or most efficient way to do something. Identifying them and keeping them accurate and available to everyone remains a significant challenge.</p>\n<p>Carry one sentence out of this section. A knowledge management system holds an explicit asset as a record, and handles a tacit one mostly by connecting people. It can hold a torque setting of 42 newton metres outright. For the chef, what it holds is a recording, a mentoring pairing, and a note of whose afternoon to interrupt.</p>\n<p>Sort ten of this distributor's knowledge assets before you read any further.</p>\n<div class=\"activity\" data-activity=\"kmSort\"></div>\n<h3>The system is a collection of tools, not a product</h3>\n<p>A <b>knowledge management system</b> is typically not a single technology. It is a collection of technology-based tools assembled so that tacit and explicit assets can be generated, stored, shared and managed.</p>\n<p>Two families of tool do that work, and a system missing either one fails in a way you can predict from here:</p>\n<ul class=\"keys\"><li><b>Communication technologies</b> such as email, corporate intranets, collaboration software and instant messaging are how knowledge moves between people.</li><li><b>Storage and retrieval systems</b> such as wikis and database management systems are where knowledge waits while nobody is asking for it.</li></ul>\n<p>The benefits the chapter claims are ordinary business ones: enhanced innovation and creativity, improved customer service, shorter product development, streamlined operations, enhanced employee retention and improved organizational performance. Retention belongs on that list for a reason. People leave jobs where the same problem has to be solved from scratch every time.</p>\n<p>The four challenges will be more useful to you than the benefits, because you meet them roughly in this order:</p>\n<ul class=\"keys\"><li><b>Getting employee buy-in</b> comes first, because sharing costs the contributor an afternoon and pays somebody else, so participation has to be valued and rewarded.</li><li><b>Focusing too much on technology</b> means choosing a tool before deciding what knowledge is needed, why it is needed and who is likely to have it.</li><li><b>Forgetting the goal</b> means a deployment tied to no specific business objective, which drifts into a filing exercise nobody will fund twice.</li><li><b>Overload and obsolescence</b> is the late one: knowledge erodes like any other asset, so updating, amending and removing have to be continuous.</li></ul>\n<p>One requirement runs underneath all four. The system has to be easy to use for retrieving knowledge, not only for entering it. A base that is pleasant to write into and painful to search gets written into once, and then falls into disarray.</p>\n<h3>Who actually holds what</h3>\n<p>The people using the system sit in different departments, do different jobs, and are spread around a building, a city or the world. The chapter calls each person or group an island, set apart by things like geography, job focus, expertise and age. Someone on one island is usually working on a problem someone on another island already solved. Finding that person is the hard part.</p>\n<p><b>Social network analysis</b> maps people's contacts to discover connections, and to expose the missing links sometimes called <b>structural holes</b>. It finds the groups who work together, the people who do not collaborate but should, and the experts on a subject. An organization chart shows none of this, because it records who reports to whom rather than who talks to whom.</p>\n<p>Two different people fall out of that map, and telling them apart is the whole exercise:</p>\n<ul class=\"keys\"><li><b>The connector</b> holds the most working relationships, which makes that person the fastest route into a group and a single point of failure inside it.</li><li><b>The bridge</b> may hold fewer relationships but is the only one with ties on both sides of a structural hole, so the hole opens when that person leaves.</li></ul>\n<p>Lose the connector and a group slows down while it re-routes. Lose the bridge and two halves of a company that were already solving the same problem twice stop hearing about each other at all. The two need not be the same person, which is why this gets measured rather than guessed.</p>\n<p>Collecting knowledge into a repository is only half the job; it then has to reach people. <b>Knowledge portals</b> are customized web front ends onto that repository, and the audience decides the plumbing: an intranet for employees, an extranet for suppliers, the open internet for the public. A national food and drug regulator publishing recall notices and drug trial status runs exactly that kind of portal.</p>\n<div class=\"activity\" data-activity=\"kmCase\"></div>\n<p>Before you move on to maps, check that you can say each of these without looking back.</p>\n<div class=\"activity\" data-activity=\"kmSelfcheck\"></div>\n<p class=\"takeaway\">Explicit assets are a storage problem and tacit assets are a people problem, and the second one has a deadline you do not control. Ask what knowledge is needed, why, and who has it, before anyone chooses a tool.</p>\n";

ACT.kmSort = {
  "kind": "sort",
  "label": "Sort",
  "title": "Can it be written down, or does it walk out?",
  "objective": "7.4",
  "how": "Drop each knowledge asset into the kind it is, then check. Read why each one lands where it does.",
  "buckets": [
    {
      "id": "exp",
      "name": "Explicit knowledge asset",
      "hint": "Can be documented, archived and codified. Much of what a database management system holds."
    },
    {
      "id": "tac",
      "name": "Tacit knowledge asset",
      "hint": "Lives in a person's mind as how to perform a task well. Judgement, timing, relationships."
    }
  ],
  "items": [
    {
      "t": "The torque setting for a refrigeration compressor bolt: 42 newton metres",
      "b": "exp",
      "why": "One value, the same for everybody who reads it. Put it in the manual and the asset is captured."
    },
    {
      "t": "How a depot manager talks a chef out of cancelling a standing order",
      "b": "tac",
      "why": "Judgement and timing held in one head. No form captures which chef will accept a substitution and which will not."
    },
    {
      "t": "The list of postcodes that defines each delivery zone",
      "b": "exp",
      "why": "Codified already, and probably in three incompatible places, so the work here is governance rather than capture."
    },
    {
      "t": "The written procedure for a cold-chain temperature breach",
      "b": "exp",
      "why": "A documented procedure is the definition of an explicit asset, whatever judgement went into drafting it."
    },
    {
      "t": "Knowing which depot will quietly absorb a late pallet without a phone call",
      "b": "tac",
      "why": "Built out of years of favours between managers, and recorded nowhere that a new manager could read."
    },
    {
      "t": "The order history for every school-kitchen account",
      "b": "exp",
      "why": "Records held in a database management system are explicit, and available to anybody with access to them."
    },
    {
      "t": "The sense that a customer is leaving, three calls before anyone says so",
      "b": "tac",
      "why": "A pattern read from tone and timing that the person noticing it usually cannot fully explain to you."
    },
    {
      "t": "The safety data sheet for a cleaning chemical",
      "b": "exp",
      "why": "The document exists, is archived, and says the same thing to every reader who opens it."
    },
    {
      "t": "How a dispatcher rebuilds a round when two drivers call in sick",
      "b": "tac",
      "why": "The rules of thumb live in the dispatcher's head and shift with weather, traffic and which customers complain."
    },
    {
      "t": "The supplier contract terms for frozen goods",
      "b": "exp",
      "why": "Contracts are recorded artifacts, so finding them is a retrieval problem rather than a capture problem."
    }
  ]
};

ACT.kmCase = {
  "kind": "case",
  "label": "Mini case",
  "title": "Five months' notice",
  "objective": "7.4",
  "how": "Study the hypothetical case and its invented figures. Make every decision to unlock the debrief; read the explanation for each option.",
  "brief": "Fairmount Provisions is a hypothetical regional food and household goods distributor: forty depots, 1,100 staff, selling to independent grocers, school kitchens and restaurants. Its longest-serving depot manager retires in five months after thirty-one years. He has agreed to be recorded. The other eleven depot managers regard the knowledge base as extra admin and have contributed nothing to it.",
  "facts": [
    {
      "k": "Notice period",
      "v": "Five months, and the date is not yours to move"
    },
    {
      "k": "What he carries",
      "v": "Thirty-one years of which chefs accept a substitution"
    },
    {
      "k": "Who has agreed",
      "v": "One depot manager out of twelve"
    },
    {
      "k": "The stated goal",
      "v": "Hold his district's accounts through the handover"
    },
    {
      "k": "What you already have",
      "v": "A wiki running for years, an intranet page, twelve interview hours, a named successor"
    }
  ],
  "exhibit": {
    "name": "Social network analysis of the eleven remaining depot managers",
    "caption": "Invented practice figures for this case only. A tie between the two groups is counted at both of its ends.",
    "headers": [
      "Manager",
      "Depot group",
      "Working relationships",
      "Ties across to the other group"
    ],
    "rows": [
      [
        "Alvarez",
        "North",
        "3",
        "0"
      ],
      [
        "Boone",
        "North",
        "3",
        "0"
      ],
      [
        "Cho",
        "North",
        "5",
        "0"
      ],
      [
        "Devlin",
        "North",
        "3",
        "0"
      ],
      [
        "Ellis",
        "North",
        "4",
        "0"
      ],
      [
        "Kaur",
        "North",
        "4",
        "2"
      ],
      [
        "Sandoval",
        "South",
        "2",
        "0"
      ],
      [
        "Tan",
        "South",
        "2",
        "0"
      ],
      [
        "Ubeda",
        "South",
        "4",
        "1"
      ],
      [
        "Vance",
        "South",
        "3",
        "0"
      ],
      [
        "Whitfield",
        "South",
        "3",
        "1"
      ]
    ]
  },
  "questions": [
    {
      "q": "One manager has agreed to be recorded and eleven have not. Which challenge does that fact describe?",
      "opts": [
        "Forgetting the goal, since nobody has written down what the base is for.",
        "Focusing too much on technology, since the wiki was picked before the problem was understood.",
        "Getting employee buy-in, since a base one person writes into is a cupboard.",
        "Overload and obsolescence, since entries go stale faster than anybody prunes them."
      ],
      "a": 2,
      "why": [
        "The goal is on the fact strip and it is specific: hold his district's accounts through the handover.",
        "The wiki has run for years and was not picked for this, and no tool is what keeps eleven managers out of it.",
        "Sharing costs the contributor an afternoon and pays somebody else, so participation has to be valued and rewarded.",
        "This one arrives later, once a base has filled up and nobody has been pruning what went stale."
      ]
    },
    {
      "q": "What should the twelve interview hours and the successor's time with him produce?",
      "opts": [
        "Recorded conversations and paired shifts, because judgement resists codification.",
        "A completed template in the knowledge base, signed off before his final working day.",
        "An export of his entire mailbox, indexed so that the wiki can search it.",
        "A forecast fitted to past orders that reproduces the calls he would make."
      ],
      "a": 0,
      "why": [
        "Tacit assets are not handed over as documents, so capture means mentoring and recorded conversation.",
        "A template collects what he can already articulate, which is the part that was least at risk.",
        "Mail is an artifact of decisions, not the reasoning behind them, and searching it finds neither.",
        "A model fitted to order records predicts outcomes; it does not hold the reasoning he applies."
      ]
    },
    {
      "q": "Eighteen months on the base holds 2,900 entries, and the delivery-zone postcode list appears in three versions. Which challenge is this?",
      "opts": [
        "Getting employee buy-in, since three versions show three managers refused to cooperate.",
        "Focusing too much on technology, since the wiki permitted three pages of one name.",
        "Forgetting the goal, since the base was tied to no stated business objective at all.",
        "Overload and obsolescence, since knowledge goes stale unless somebody prunes it."
      ],
      "a": 3,
      "why": [
        "Three versions are evidence of enthusiastic contribution, which is the opposite of a participation problem.",
        "The software permitted it, but the missing thing is an owner who prunes rather than a feature.",
        "The goal was stated on the fact strip. What is missing is the continuous work of keeping the contents true.",
        "Knowledge goes stale like any other asset, and an unpruned base stops being trusted or used."
      ]
    },
    {
      "q": "Which manager's departure would leave the northern and southern depots with no working route to each other?",
      "opts": [
        "Cho, who holds five working relationships, more than any other manager here.",
        "Kaur, whose two cross-group ties are both of the ties between the groups.",
        "Ubeda, whose four relationships include one of the ties crossing between groups.",
        "Whitfield, whose three relationships include a tie crossing between the two groups."
      ],
      "a": 1,
      "why": [
        "The connector, and all five of those relationships sit inside the northern group already.",
        "Four cross-group ends are counted, so the two ties are Kaur to Ubeda and Kaur to Whitfield.",
        "One end of a cross-group tie, and the other end of it is Kaur, who also holds the second tie.",
        "Removing this manager closes one cross-group tie and leaves the other, which still runs through Kaur."
      ]
    }
  ],
  "debrief": "Two of those decisions named a challenge, and the pair of them bracket a knowledge base's whole life: buy-in is what stops it filling, and obsolescence is what drains the value out of it once it has. The last question is the one people get wrong. Cho holds five working relationships and Kaur holds four, and it is Kaur whose departure leaves two halves of a company unable to reach each other. No organization chart would have shown you either of them."
};

ACT.kmSelfcheck = {
  "kind": "selfcheck",
  "label": "Self-check",
  "title": "Say these out loud before the next section",
  "objective": "7.4",
  "how": "Answer each one from memory, then open the hint to check yourself. Anything you cannot say is worth rereading above.",
  "items": [
    {
      "t": "Say in one line each what data, information and knowledge are.",
      "hint": "Raw unformatted symbols; data formatted or processed so people can use it; what you need to understand the relationships between pieces of information."
    },
    {
      "t": "Give the test that separates an explicit knowledge asset from a tacit one.",
      "hint": "Can it be documented, archived and codified? If instead it is how to perform a task well, held in a person's mind, it is tacit."
    },
    {
      "t": "Name the two families of technology a knowledge management system is assembled from.",
      "hint": "Communication technologies such as email, intranets, collaboration software and instant messaging; storage and retrieval such as wikis and database management systems."
    },
    {
      "t": "List the four challenges of deploying a knowledge management system.",
      "hint": "Employee buy-in, focusing too much on technology, forgetting the goal, and knowledge overload and obsolescence."
    },
    {
      "t": "Explain what social network analysis finds that an organization chart cannot.",
      "hint": "Who actually talks to whom: the connectors, and the structural holes where two parts of a firm solve the same problem twice."
    },
    {
      "t": "Say how the connector differs from the bridge, and what each one's departure costs.",
      "hint": "The connector holds the most ties inside a group; the bridge holds the only ties across a gap, and may hold fewer overall."
    },
    {
      "t": "Describe what a knowledge portal is for and who it can be pointed at.",
      "hint": "A customized front end onto the repository: employees over an intranet, suppliers over an extranet, the public over the internet."
    }
  ]
};
