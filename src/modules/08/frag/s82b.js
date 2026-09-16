/* Chapter 8 lesson and activity data. Rebuild with node src/build.mjs --module=modules/08. */
PROSE.s82b = "\n<span class=\"eyebrow\">Objective 8.2 · Part 2</span><h2>Internally and externally focused systems</h2>\n<p class=\"lede\">A purchase order leaves your building and arrives somewhere else as a sales order. The document did not change. What changed is who has to agree with it. That question — who has to agree — is what separates an internally focused system from an externally focused one, and it is not the same question as where the software runs.</p>\n<h3>Inside the firm, information accumulates</h3>\n<p><b>Internally focused systems</b> support functional areas, business processes, and decision making within an organization. Picture the work as a series of links in a chain. At each link, people add value through the work they perform, and new, useful information is generated as a by-product of doing it.</p>\n<p>Follow one order. Order entry creates the order record. Fulfillment reads that record and produces a packing list. Shipping reads the packing list and produces the invoice. Information begins accumulating at the point of entry and travels forward. Nobody retypes it, and each step inherits what the step before it settled.</p>\n<p>Four things about that flow matter more than they look:</p>\n<ul class=\"keys\"><li><b>Every link adds information</b>, which is why the invoice ends up knowing more about the order than order entry ever did.</li><li><b>Every link trusts the one before it</b>, so a wrong address typed at order entry is printed, packed, and then shipped.</li><li><b>Everyone who must agree works here</b> — sales, the warehouse, accounting — all of them inside one organization’s boundary.</li><li><b>Managers read the same trail</b>, which is why an internally focused system supports decision making and not only the work itself.</li></ul>\n<h3>Across the boundary, somebody else has to agree</h3>\n<p><b>Externally focused systems</b> streamline communications and coordinate business processes with customers, suppliers, business partners, and others operating outside the organization’s boundaries. A system that communicates across those boundaries is called an <b>interorganizational system</b>. Its purpose is to move information out of one company’s operations and into another’s.</p>\n<p>Those flows run two directions. Upstream, supply chain management applications integrate the value chains of business partners, coordinating suppliers, production, and distribution. Downstream, customer relationship management applications handle promoting and selling, service after the sale, and long-term relationships. Later sections take each of them apart.</p>\n<p>Where the server sits does not decide any of this. A payroll package hosted by an outside vendor is still internally focused, because the only people who must agree on a paycheck work for you. A terminal bolted to your own loading dock that confirms receipts into a supplier’s system is externally focused, because the supplier has to accept what it says.</p>\n<div class=\"activity\" data-activity=\"scopeSort\"></div>\n<h3>A firm needs both</h3>\n<p>Internally focused systems serve internal operations across the whole organization very well. They are not necessarily designed to carry information past the firm’s boundaries, and global networks of suppliers and customers make that gap expensive. Component parts are made on one continent, fabricated on a second, and assembled and shipped to customers everywhere.</p>\n<p>Customers also have more options than they used to. They want products customized to their own needs and they expect a higher level of service, and if you cannot deliver it a competitor will. Sharing information across the boundary is how a firm adapts quickly: if buyers begin demanding an extra component, the sales system can pass that signal straight to component suppliers, and the change gets managed instead of discovered.</p>\n<div class=\"activity\" data-activity=\"scopeExplore\"></div>\n<h3>Packaged or custom</h3>\n<p><b>Packaged software</b>, also called off-the-shelf software, is written by third-party vendors for the needs of many different users and organizations. It suits standardized, repetitive tasks such as word processing, payroll, or preparing taxes. It can be quite cost effective, because the vendor spreads development cost across everyone who buys it.</p><p><b>Custom software</b> is designed and developed exclusively for one organization and can accommodate that firm’s particular needs. It costs much more, because the firm bears all of it — time, money, and people. When something changes, the firm maintains the change itself. With packaged software the vendor makes the change and distributes a new version.</p>\n<p>Either route raises a question about the work itself first, and the chapter gives that question a name. <b>Business process management</b> is a systematic, structured approach in which people critically examine, rethink, and redesign business processes to achieve dramatic improvements in something measurable, such as quality, cycle time, or cost. It is not steady incremental improvement; it is radical redesign, and the chapter warns that adopting an industry’s best practices can cost a firm the unique processes its advantage rested on.</p>\n<p>So the question a manager actually answers is narrower than it first sounds:</p>\n<ul class=\"keys\"><li><b>Can the package meet the requirement?</b> If it can, the argument is usually over, because somebody else already paid to build it.</li><li><b>If it cannot, what is the gap worth?</b> Run a cost–benefit analysis on the custom route rather than settling it by preference.</li><li><b>Who carries the next change?</b> A vendor spreads a new release across its whole customer base; a custom build has exactly one customer to fund it.</li><li><b>Is the process genuinely unique?</b> Unique to the firm can justify custom work, while merely familiar to the firm cannot, and habit is easy to mistake for advantage.</li><li><b>What will the redesign itself cost?</b> Rethinking a process is a project in its own right, so that effort belongs in the estimate beside the software rather than after it.</li></ul>\n<div class=\"activity\" data-activity=\"scopeCase\"></div>\n<h3>What integration makes possible, it also makes visible</h3>\n<p>The chapter stops here to raise an ethical question, and it belongs exactly here. Everything that makes an enterprise system valuable — one repository, one record, one coherent view of a thing — works just as well when the thing being viewed is a person.</p><p>This is the question of <b>data consolidation</b>: bringing records that used to sit apart into one place, where they can be read together. The chapter treats the gain and the cost as one subject, because a single view of a person is produced by exactly the move that makes a single view of an order possible.</p>\n<p>The chapter’s first example is Amazon, which consolidated buyers and sellers into one source for household goods, electronics, books, media, reading devices, and digital assistants. The benefits are genuine: convenience, purchase from any device, and integration across products and services. Shopping history and buying preferences are used to help you find what you want.</p>\n<p>The chapter then adds a wearable that monitored activity levels, health, body composition, and even emotional state, with that data kept apart from the shopping account by design — and notes that insurance companies had already begun working out how to harness such information. Its second example is Tencent’s WeChat, used in China to message, book medical appointments, pay utility bills, order food, and take payment as a shopkeeper.</p>\n<p>Access to WeChat can be restricted: for a censorship violation, for being connected with the “wrong” people, or for reasons inside the platform’s own algorithms that are never explained. For a person locked out, “everything” becomes almost nothing. The chapter ends with two open questions rather than answers, and with the trade-off sitting under both of them:</p>\n<ul class=\"keys\"><li><b>What must a firm weigh</b> when it offers everything, from selling household goods to monitoring somebody’s health and emotional state?</li><li><b>How far should legislation go</b> in regulating how consolidated personal data may be used, given how much power sits with the consolidator?</li><li><b>Consolidation cuts both ways</b>, trading convenience against narrower consumer choice, exposure of private information, and the cost of being on the wrong side of it.</li></ul>\n<p class=\"takeaway\">Ask who has to agree, and the internal-or-external question answers itself. Ask what the record needs in order to do the work, and the ethical question gets easier as well — the field you collected because collecting it was easy is the one you will have trouble explaining later.</p>\n";

ACT.scopeSort = {
  "kind": "sort",
  "label": "Classify",
  "title": "Which side of the boundary is this?",
  "objective": "8.2",
  "how": "Place each system or situation in the better category, then check your reasoning. You can revise and try again.",
  "buckets": [
    {
      "id": "int",
      "name": "Internally focused",
      "hint": "Everyone who has to agree works for the same organization."
    },
    {
      "id": "ext",
      "name": "Externally focused",
      "hint": "A customer, supplier, or partner outside the firm has to agree."
    }
  ],
  "items": [
    {
      "t": "A cloud payroll service run by an outside vendor calculates each paycheck.",
      "b": "int",
      "why": "The vendor hosts the software, but the only people who must agree on a paycheck work here."
    },
    {
      "t": "A terminal on your own loading dock confirms each receipt into the supplier’s system.",
      "b": "ext",
      "why": "The hardware is yours; the party that has to accept the confirmation is a separate company."
    },
    {
      "t": "Order entry hands an order to fulfillment, which prints a packing list.",
      "b": "int",
      "why": "Two departments of one firm pass work along the same internal chain."
    },
    {
      "t": "A customer signs in to check the status of their own open order.",
      "b": "ext",
      "why": "The customer sits outside the boundary, so the system is coordinating across it."
    },
    {
      "t": "Next month’s demand forecast is shared with a contract manufacturer.",
      "b": "ext",
      "why": "The forecast exists to change another company’s production plan, which makes it interorganizational."
    },
    {
      "t": "Accounting raises an invoice from the shipment record the dock created.",
      "b": "int",
      "why": "One department reuses information another department generated inside the same organization."
    },
    {
      "t": "An employee updates their own tax withholding on a self-service page.",
      "b": "int",
      "why": "Self-service looks outward, but an employee is inside the firm’s boundary."
    },
    {
      "t": "A supplier submits an invoice through your purchasing portal.",
      "b": "ext",
      "why": "You own the portal, and a separate organization still has to agree on the amount."
    }
  ]
};

ACT.scopeExplore = {
  "kind": "explore",
  "label": "Explore",
  "title": "Six pieces of an enterprise systems decision, side by side",
  "objective": "8.2",
  "how": "Open each one and inspect what it does, who has to agree with it, what its absence costs, and where readers go wrong.",
  "labels": [
    "What it does",
    "Who has to agree",
    "What its absence costs",
    "Where readers go wrong"
  ],
  "items": [
    {
      "icon": "1",
      "name": "Internally focused system",
      "sub": "Inside the boundary",
      "what": "Supports functional areas, business processes, and decision making within the organization.",
      "real": "Departments of the same firm: sales, the warehouse, accounting.",
      "absent": "The same order is retyped three times and the three copies disagree by Friday.",
      "why": "Renting it from a hosting vendor does not move it across the boundary."
    },
    {
      "icon": "2",
      "name": "Externally focused system",
      "sub": "Across the boundary",
      "what": "Streamlines communication and coordinates processes with customers, suppliers, and partners outside the firm.",
      "real": "Another organization, which can refuse what your record says.",
      "absent": "Staff rekey the other side’s documents, and both sides reconcile by phone.",
      "why": "Readers treat an interorganizational system as a different thing; it is another name for this one."
    },
    {
      "icon": "3",
      "name": "Upstream link to suppliers",
      "sub": "Supply chain side",
      "what": "Integrates the value chains of business partners to coordinate supply, production, and distribution.",
      "real": "Suppliers, each with their own schedule and their own suppliers to protect.",
      "absent": "A change in demand reaches the parts maker weeks late, as a shortage.",
      "why": "It coordinates a partner’s plan; it does not hand you control of it."
    },
    {
      "icon": "4",
      "name": "Downstream link to customers",
      "sub": "Customer side",
      "what": "Concentrates on promoting and selling, on service after the sale, and on long-term relationships.",
      "real": "Customers, who can simply buy elsewhere when a promise is missed.",
      "absent": "Four departments each know a different fragment of the same unhappy customer.",
      "why": "Downstream is about the customer relationship, not about who loads the carton."
    },
    {
      "icon": "5",
      "name": "Packaged software",
      "sub": "Bought, not built",
      "what": "Written by third-party vendors for many organizations doing standardized, repetitive tasks.",
      "real": "The vendor’s other customers, whose requirements also shaped the product.",
      "absent": "The firm pays to build something thousands of other firms already run.",
      "why": "It is cheap per buyer because development cost is spread, not because the work is easy."
    },
    {
      "icon": "6",
      "name": "Custom software",
      "sub": "Built for one firm",
      "what": "Designed and developed exclusively for one organization and its particular requirements.",
      "real": "Nobody but you, which is the whole point and also the whole bill.",
      "absent": "A process the firm competes on is forced into a shape built for everyone.",
      "why": "Every later change is yours to fund, because no vendor is spreading it."
    }
  ]
};

ACT.scopeCase = {
  "kind": "case",
  "label": "Mini case",
  "title": "Crestmill decides what to buy and what to build",
  "objective": "8.2",
  "how": "Study the hypothetical firm and its invented figures. Make every decision to unlock the debrief; read the explanation for each option.",
  "brief": "Crestmill Cabinetry is a hypothetical 140-person maker of built-to-order kitchens. It runs payroll on ordinary rules and prices every job from a cut list measured in the customer’s own home. Its single IT analyst has been asked to recommend software for both processes inside a five-year budget of $400,000.",
  "facts": [
    {
      "k": "Staff",
      "v": "140 employees, one IT analyst, no in-house developers"
    },
    {
      "k": "Payroll",
      "v": "Standard rules, ordinary pay types, 26 runs a year"
    },
    {
      "k": "Quoting",
      "v": "9 steps, measured on site, priced from a per-job cut list"
    },
    {
      "k": "Budget",
      "v": "$400,000 across five years, covering both processes"
    }
  ],
  "exhibit": {
    "name": "Quoting software over five years",
    "caption": "Invented figures for this hypothetical firm only.",
    "headers": [
      "Line item",
      "Packaged suite",
      "Custom build"
    ],
    "rows": [
      [
        "Year 1 software cost",
        "$84,000",
        "$310,000"
      ],
      [
        "Upkeep per year, years 2-5",
        "$21,000",
        "$15,000"
      ],
      [
        "Internal staff time per year",
        "0.2 analyst ($18,000)",
        "0.5 developer ($52,000)"
      ],
      [
        "Fit to the 9-step quoting process",
        "Covers 6 steps",
        "Covers 9 steps"
      ]
    ]
  },
  "questions": [
    {
      "q": "Which of the two processes is the stronger candidate for packaged software?",
      "opts": [
        "Quoting, because every kitchen is measured and priced on its own.",
        "Payroll, because its rules are standard and repeat each period.",
        "Both, because one vendor contract is simpler to administer.",
        "Neither, until the five-year budget is raised above $400,000."
      ],
      "a": 1,
      "why": [
        "Quoting is the process unique to this firm, which is exactly where a package tends to fit badly.",
        "Standardized, repetitive tasks are what packaged software is written for, and the vendor spreads its development cost.",
        "Administrative convenience is real, but it cannot make a standard package fit a one-of-a-kind pricing process.",
        "The budget constrains the choice; it does not change which process is standardized and which is unique."
      ]
    },
    {
      "q": "Using the exhibit, what does the custom build cost Crestmill across the five years?",
      "opts": [
        "$310,000",
        "$370,000",
        "$570,000",
        "$630,000"
      ],
      "a": 3,
      "why": [
        "That is only the year-one build; four years of upkeep and five years of staff time are still owed.",
        "This adds the four upkeep years to the build but leaves out five years of developer time.",
        "This counts the build and the staff time but drops four years of upkeep at $15,000 each.",
        "The build of $310,000 plus $60,000 of upkeep plus $260,000 of staff time comes to $630,000."
      ]
    },
    {
      "q": "Withholding rules change in the middle of the year. What does each route mean for that change?",
      "opts": [
        "With a packaged payroll the vendor ships the update; a custom build is Crestmill’s to change.",
        "With a packaged payroll Crestmill edits the vendor’s code; a custom build is updated by the vendor.",
        "Either route leaves the update to Crestmill, since withholding is a legal matter, not a software one.",
        "Either route leaves the update to a vendor, since payroll rules are maintained outside the firm."
      ],
      "a": 0,
      "why": [
        "The vendor makes the change and distributes a new version; a custom application is maintained internally.",
        "This reverses both halves: buyers do not rewrite vendor code, and nobody ships releases for a custom build.",
        "A legal change still has to be programmed by somebody, and a packaged vendor does that work for its customers.",
        "Custom software has no vendor behind it, so its owner funds and writes every rule change itself."
      ]
    }
  ],
  "debrief": "Two processes, two answers. Payroll is standardized and repetitive, which is what packaged software is written for, and the vendor carries every rule change. Quoting is where Crestmill differs from its competitors, and the package covers only 6 of its 9 steps — but the custom route costs $630,000 over five years, more than the whole budget. The honest recommendation buys payroll, buys the quoting package, and treats the three uncovered steps as the next decision rather than as a reason to spend money the firm does not have."
};
