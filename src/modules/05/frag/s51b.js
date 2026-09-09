/* ===== s51b ===== */
PROSE.s51b = `
<span class="eyebrow">Section 5&ndash;1b</span>
<h2>Inside the firewall: intranets, portals, and search</h2>
<p class="lede">The previous section ended on a coordination problem that turned out to be a knowledge problem. This section is about the machinery firms build for that: a private web, a search engine that can read it, and a portal that lets an employee serve themselves.</p>

<h3>A private web, behind the firewall</h3>
<p>An <b>intranet</b> is a private network built with web technologies, used to move proprietary information securely inside one organization. It looks and behaves like an ordinary website. The difference is that its pages sit behind the company firewall, so only authorised people reach them with a browser.</p>
<p>Modern intranets build each employee a page rather than serving everyone the same one, which turns one site into several thousand.</p>
<ul class="keys">
<li><b>The look and the data are shared</b>, so every page is drawn from the same underlying systems and nobody maintains a separate copy for each department.</li>
<li><b>What differs is entitlement</b>, following the principles of least permission and least privilege: somebody in human resources sees payroll and hiring figures, and somebody in the workshop does not.</li>
<li><b>The filtering happens at assembly</b>, so the restricted data is absent from the page rather than present and hidden, which is a meaningful difference when a laptop is lost.</li>
</ul>
<p>That worked while everyone was in the building. Since they are not, most firms let employees reach the intranet through a <b>virtual private network</b>, which carries the connection across the public internet inside an encrypted tunnel and delivers it through the firewall. Once connected, a laptop in a hotel behaves as though it were plugged in at the office.</p>
<p>Put the steps of that journey in order, because the order is what makes the arrangement secure rather than merely convenient.</p>

<div class="activity" data-activity="netOrder"></div>

<h3>Three things a corporate intranet is actually for</h3>
<p>The chapter names three benefits, and each one replaces a specific older practice rather than adding a new capability.</p>
<ul class="keys">
<li><b>Real-time access to information</b> replaces the paper document that had to be updated, reprinted and redistributed every time anything changed, which meant several versions were always in circulation at once.</li>
<li><b>Enterprise search</b> replaces knowing who to ask, by retrieving content across internal documents, databases, applications and cloud storage that a public search engine cannot see at all.</li>
<li><b>Collaboration</b> replaces sending work back and forth, by letting one person revise a shared drawing or document and put the updated version where the next person will look for it.</li>
</ul>
<p>The chapter's example of the first is an aircraft manufacturer distributing company news as multimedia over its own intranet, so employees see releases as they happen instead of waiting for a printed bulletin. Its example of the third is the same firm, sharing three-dimensional models of aircraft components between engineers at different sites and cutting product development time as a result.</p>

<h3>Why enterprise search is a different problem</h3>
<p>Searching the public web and searching a company are not the same task, and the chapter is explicit about why. Internal content sits in different languages, on different servers, in databases and applications rather than on pages, and increasingly in cloud storage a firm does not own.</p>
<p>A public search engine also has millions of pages linking to each other, which is most of how it decides what is important. A company has no such signal. The result is that as an intranet grows, the information in it becomes harder to find rather than easier, which is precisely the point at which employees give up and ask a colleague instead.</p>

<h3>The portal, and the cost of a paper form</h3>
<p>Intranets also carry <b>employee portals</b>, which support <b>employee self-service</b>: administering benefits, managing a retirement plan, submitting the ordinary human resources paperwork of a working life.</p>
<p>The chapter's figures for one form are worth carrying around, because each channel costs roughly an order of magnitude less than the one before it.</p>
<ul class="keys">
<li><b>On paper</b> the chapter puts processing at roughly twenty to thirty dollars a form, most of it the time of somebody re-keying what an employee already wrote.</li>
<li><b>Through a telephone system</b> that falls to a few dollars, which is a large saving and still involves a conversation somebody has to be paid to have.</li>
<li><b>Through intranet self-service</b> it falls to a few cents, at which point an employee filing about fifteen transactions a year stops being an administrative cost at all.</li>
<li><b>Errors fall as well</b>, because templates are managed centrally so nobody submits last year's version, and entries are checked as they are typed rather than after filing.</li>
</ul>

<div class="activity" data-activity="netCase"></div>

<h3>The social intranet</h3>
<p>Traditional intranets let a small group with editorial rights publish, and everyone else read. <b>Social intranets</b> let every user create and update content and connect to whoever wrote it, which is the same shift the next section describes happening on the public web.</p>
<p>Match five ordinary complaints to the capability that actually answers each one, and notice how often the complaint names a symptom rather than the thing that would fix it.</p>

<div class="activity" data-activity="netMatch"></div>

<p class="takeaway">An intranet is not a website with a password. It is the firm's attempt to hold its own knowledge in one authoritative place, reachable from anywhere, visible only to the people entitled to it, and findable once it is there. Every one of those four requirements is where a real deployment fails.</p>

<div class="activity" data-activity="netQuiz"></div>
`;

ACT.netOrder = {
  kind: "order",
  label: "Sequence",
  title: "How an employee reaches the intranet from a hotel room",
  intro: "A salesperson opens their laptop in a hotel and loads the company's benefits page. Put the steps in the order they actually happen.",
  how: "Drag the steps into order; each one explains why it sits where it does, and the security of the whole arrangement depends on the sequence.",
  objective: "5.1",
  steps: [
    {t: "The laptop opens a virtual private network connection", why: "Nothing is requested yet. The first move is establishing the tunnel, because the intranet is not reachable from the public internet at all."},
    {t: "The employee authenticates, and an encrypted tunnel forms across the internet", why: "The public internet still carries the traffic. What changes is that its contents are unreadable to anything between the hotel and the company."},
    {t: "The tunnelled traffic arrives at the corporate firewall", why: "The firewall is the boundary. Traffic arriving through the tunnel is treated as internal; the same request arriving without one would be refused here."},
    {t: "The request reaches the intranet server inside the corporate network", why: "Only now is the employee, in effect, inside the building. The server sees a request from the internal network rather than from a hotel."},
    {t: "The server identifies the employee and their job function", why: "Modern intranets build a page per person rather than serving one page to everyone, so it has to know who is asking before it can decide what to assemble."},
    {t: "A page is assembled containing only the data that person may see", why: "Least permission and least privilege applied in practice: the underlying data is shared, and the payroll figures a human resources employee sees are simply absent from a warehouse supervisor's copy."}
  ]
};

ACT.netCase = {
  kind: "case",
  label: "Mini case",
  title: "Sixty thousand forms a year",
  how: "Read the brief and the exhibit, then take the three decisions in order; the employer and every figure attached to it are hypothetical and were invented for this exercise.",
  objective: "5.1",
  brief: "A hospital group employs about four thousand people across six sites. Its human resources paperwork is still filed on paper and re-keyed by a central team, and the group is considering an employee portal that would let staff file it themselves. A consultant has produced one page of figures. The board wants to know whether this is an efficiency project or something larger. The employer is hypothetical and every figure attached to it is invented.",
  facts: [
    {k: "The employer", v: "A hospital group of roughly four thousand staff across six sites"},
    {k: "How paperwork is filed now", v: "On paper, posted internally, and re-keyed by a central administration team"},
    {k: "What is proposed", v: "An employee portal on the existing intranet, with self-service forms"},
    {k: "Who objects", v: "Ward managers, who say clinical staff will not use a computer for paperwork"},
    {k: "The decision", v: "Whether the portal is worth funding, and on what grounds"}
  ],
  exhibit: {
    name: "Exhibit A &middot; One year of human resources paperwork",
    caption: "What the consultant counted, with the group's own figures beside the chapter's cost illustration. Every figure here is invented for practice and none of it is reported data.",
    headers: ["Line", "Today, on paper", "With an employee portal"],
    rows: [
      ["Transactions filed per employee per year", "15", "15"],
      ["Total transactions per year", "60,000", "60,000"],
      ["Processing cost per transaction", "US$24", "US$0.15"],
      ["Forms returned because the wrong version was used", "3,100", "None; templates are held centrally"],
      ["Forms returned for an entry error", "5,400", "Checked as the employee types"],
      ["Average days from filing to confirmation", "9", "Under 1"]
    ]
  },
  questions: [
    {
      q: "The finance director says the case rests on the cost per transaction. What does the rest of the exhibit add that the cost line does not?",
      opts: [
        "Nothing material; the other lines are consequences of the same processing cost",
        "The returned forms, which are rework the cost line has already counted once",
        "Eight and a half thousand returned forms and eight lost days, none of it in that cost",
        "The transaction count, which is what makes the per-transaction saving worth having"
      ],
      a: 2,
      why: [
        "Treating the other lines as consequences of the cost line is how a business case ends up too small. Rework and delay are separate quantities, and they fall on different people.",
        "The returned forms are indeed rework, and the exhibit prices processing per transaction rather than per attempt, so a form filed three times is not counted three times anywhere in that line.",
        "Correct. Roughly eight and a half thousand forms a year come back for a wrong version or a mistyped entry, and confirmation takes nine days. Neither appears in the per-transaction cost, and both land on staff rather than on the administration budget.",
        "The volume does matter, and multiplying it by the cost is exactly the calculation the finance director already made. The question is what that calculation leaves out."
      ]
    },
    {
      q: "The ward managers say clinical staff will not use a computer for paperwork. What does the chapter suggest about that objection?",
      opts: [
        "It is a culture and access question that decides the outcome, so it is answered before the build",
        "It is resistance to change, and the portal should be made mandatory on a fixed date",
        "It is unfounded, because self-service is easier than paper for everybody involved",
        "It is a training issue, so the budget should carry a training allowance and proceed"
      ],
      a: 0,
      why: [
        "Correct. The chapter is blunt that providing a tool and hoping people use it is not enough, and that the conditions for adoption are a management problem rather than a technical one. Where a nurse can reach a machine mid-shift is part of that.",
        "A mandate produces filed forms and does not produce adoption. It also converts a solvable design question into a grievance, which is the most expensive way to learn what the objection actually was.",
        "Self-service is easier for somebody at a desk with a browser open. Whether it is easier for somebody who has no desk is precisely the thing the ward managers are reporting, and dismissing it discards the best information available.",
        "Training helps and it is not the objection. The managers are describing access and working conditions, and a training budget aimed at a device availability problem buys nothing."
      ]
    },
    {
      q: "The board asks whether this is only an efficiency project. What is the strongest case that it is not?",
      opts: [
        "It reduces the administration team, which changes the shape of the organization permanently",
        "It gives every employee a personalised entry point the firm controls and can extend",
        "It moves the group onto web technology, which every competing employer already uses",
        "It removes nine days of delay, which staff will notice more than the money saved"
      ],
      a: 1,
      why: [
        "Headcount reduction is the most visible consequence and still an efficiency argument, only expressed as people rather than as dollars. It is also the version of the case most likely to make adoption harder.",
        "Correct. The portal is a per-person, permission-aware entry point that the firm owns. Once it exists, real-time access to information, enterprise search and internal collaboration all have somewhere to live, which is a capability rather than a saving.",
        "Matching what other employers have is not a benefit. It is the sort of reasoning the chapter warns against, where a feature list quietly becomes the justification.",
        "The delay reduction is genuine and welcome, and it is still the same efficiency argument measured in days rather than dollars. It describes the current process running faster, not the group being able to do something new."
      ]
    }
  ],
  debrief: "The per-transaction saving is the easiest number to produce and the least interesting. The rework and the nine-day wait are costs the finance line never counted, and they fall on clinical staff rather than on the administration budget. The ward managers' objection is not noise either: it is the adoption condition the chapter spends its third objective on, arriving early enough to design around. And the strategic case is not the money at all. It is that a permission-aware personal entry point, once built, is where search, news and internal collaboration can then be put, which is why the chapter treats an intranet as infrastructure rather than as a project."
};

ACT.netMatch = {
  kind: "match",
  label: "Match",
  title: "The complaint, and the capability that answers it",
  how: "Pair each complaint with the capability that addresses its actual cause rather than its symptom; every pair explains itself once matched.",
  objective: "5.1",
  pairs: [
    {
      l: "Three versions of the safety procedure are in circulation and nobody knows which is current",
      r: "Real-time access to one authoritative document",
      why: "The chapter's first intranet benefit exists for exactly this. A paper document has to be updated, reprinted and redistributed, so older copies keep working; one page updated in place has no older copies."
    },
    {
      l: "We know somebody here has solved this before, but not who or where they wrote it down",
      r: "Enterprise search across documents, databases and applications",
      why: "This is the problem enterprise search is built for, and why it differs from web search: the content sits in internal systems and cloud storage rather than on linked public pages."
    },
    {
      l: "Two engineers are emailing revisions of the same drawing back and forth",
      r: "A shared workspace where the revised file replaces the old one",
      why: "The chapter's collaboration example: one engineer revises and uploads, the next works from what is there, and the round trip disappears along with the question of whose copy is current."
    },
    {
      l: "Staff cannot reach any of this while working away from the office",
      r: "A virtual private network into the corporate network",
      why: "Availability, not content. The private network carries an encrypted connection through the firewall so a remote laptop can use resources as though it were inside the building."
    },
    {
      l: "Only the communications team can publish, so most of what we know never gets written down",
      r: "A social intranet where any employee can create and update content",
      why: "A traditional intranet grants editorial rights to a few people, which caps how much of the organization's knowledge can ever reach it. A social intranet removes the cap and connects readers to whoever wrote the page."
    },
    {
      l: "It takes nine days to confirm a change of hours, and half the forms come back",
      r: "An employee portal with self-service forms",
      why: "Self-service moves the filing to the person who has the facts, checks entries as they are typed, and holds one central template so the wrong version cannot be submitted."
    }
  ]
};

ACT.netQuiz = {
  kind: "quiz",
  label: "Check",
  title: "Intranets, portals, and search",
  how: "Three questions on what this machinery is and is not; every option explains itself, including the ones you did not pick.",
  objective: "5.1",
  questions: [
    {
      q: "What actually makes an intranet an intranet, rather than a website with a login?",
      opts: [
        "It runs on hardware the company owns rather than on rented cloud infrastructure",
        "It carries only internal information, and never anything a customer could also see",
        "It is written by employees rather than by a communications department",
        "It is built with web technologies and sits behind the firewall, reachable only by authorised users"
      ],
      a: 3,
      why: [
        "Ownership of the hardware is not the definition. The chapter describes intranets integrating cloud resources, and a private network can perfectly well run on infrastructure the firm rents.",
        "What the content is about does not decide the category. A firm may publish the same product information internally and externally; where it sits relative to the firewall is what differs.",
        "Who writes the content distinguishes a social intranet from a traditional one. Both are intranets, so this cannot be what makes something an intranet in the first place.",
        "Correct. The chapter defines an intranet as a private network using web technologies for the secure transmission of proprietary information, with the pages behind the firewall so only authorised users reach them."
      ]
    },
    {
      q: "Why can a company not simply run a public web search engine over its own content?",
      opts: [
        "Public engines refuse to index content that sits behind a firewall for legal reasons",
        "Internal content is in too many languages for a public engine's ranking to work",
        "Internal content sits in databases and applications, with no links to rank it by",
        "Public engines update too slowly for information that changes several times a day"
      ],
      a: 2,
      why: [
        "The obstacle is practical rather than legal: content behind a firewall is not reachable by an outside crawler at all, and there is no refusal involved.",
        "Multiple languages are one of the difficulties the chapter names, and a public engine handles many languages routinely. It is not what makes the problem different in kind.",
        "Correct. The chapter contrasts the two directly: enterprise search must retrieve from documents, databases, applications and cloud storage, none of which is a linked page, so the signal a web engine ranks by does not exist.",
        "Freshness matters and it is not the distinguishing difficulty. A public engine can recrawl frequently; what it cannot do is see inside a database or an internal application."
      ]
    },
    {
      q: "A firm computes its portal business case as fifteen transactions times four thousand staff times the saving per transaction. What is the most important thing that calculation leaves out?",
      opts: [
        "The cost of building and running the portal, which offsets the annual saving",
        "The rework and the delay, which fall on employees rather than on the administration budget",
        "The employees who will not use it, who reduce the volume the saving applies to",
        "The training and change work, which the chapter says decides whether it is adopted"
      ],
      a: 1,
      why: [
        "A business case that omits the build cost is incomplete, and every reader already knows to ask for it. It is the expected omission rather than the interesting one.",
        "Correct. Forms returned for a wrong version or a mistyped entry are counted nowhere in a per-transaction figure, and neither is the wait for confirmation. Both are real costs, and both land on staff rather than on the department doing the arithmetic.",
        "Partial adoption does reduce the realised saving, and it is a reason to discount the estimate rather than something the estimate structurally cannot see.",
        "Change work decides whether the saving arrives at all, which makes it a risk to the whole case. The question asks what the calculation leaves out of the benefit, and rework and delay are benefits it never counted."
      ]
    }
  ]
};
