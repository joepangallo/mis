/* Chapter 8 lesson and activity data. Rebuild with node src/build.mjs --module=modules/08. */
PROSE.s87 = "\n<span class=\"eyebrow\">Application 8.7</span><h2>Recommend one enterprise-systems initiative</h2>\n<p class=\"lede\">A manager does not approve a system. A manager approves a change in how the work gets done, at a price, with a date on which somebody says whether it worked. This closing application turns the whole chapter into one recommendation you could defend in a meeting.</p>\n<div class=\"callout info\"><b>Application supplement.</b> Every firm, figure, and quote below is hypothetical and invented for practice. The section applies Chapter 8's vocabulary and ordinary cost reasoning to a decision a manager really faces; it is not one of the chapter's own objectives.</div>\n<h3>Name the problem as a process failure</h3>\n<p>\"We need an ERP\" is not a problem. It is a purchase. A problem statement says what goes wrong, to whom, how often, and what it costs. Written the other way, the same situation reads: purchasing and the shop floor keep separate on-hand figures, so we promised stock we did not have on 168 of 2,400 orders last quarter, at about $310 each in expedited freight and credits.</p>\n<p>That sentence does real work. It points at the order-to-cash process rather than at a department to blame. It describes the rocks in the river, two standalone applications holding the same inventory data, reentered by hand, drifting apart. And it can be checked. Anyone may go and count the 168.</p>\n<h3>Name the system and the component</h3>\n<p>Managers approve things they can price, and a class of software has no price. The chapter gives you a ladder of precision, and each rung narrows what you are actually asking for:</p>\n<ul class=\"keys\"><li><b>Enterprise system</b> names the class: one integrated suite of applications sharing a single company-wide database.</li><li><b>ERP core component</b> names the internal half, meaning financial management, operations management, or human resource management.</li><li><b>ERP extended component</b> names the outward half, supply chain management upstream and customer relationship management downstream.</li><li><b>Module</b> names the piece you actually switch on, selected and implemented as the business needs it.</li><li><b>Configuration</b> names the setup work: the rules, tables, and identifiers that make a module match your firm.</li></ul>\n<p>Configuration is not customization, and the difference is money. Customization means new code, or direct changes to the vanilla version, and those changes have to be reprogrammed when the next release arrives. Ask for configured vanilla modules wherever the work allows it.</p>\n<h3>Price the whole thing, not the licence</h3>\n<p>The quoted subscription is the smallest number in the file. The chapter names the two costs everybody underestimates: configuring the system, and training, which it calls the most overlooked and poorly budgeted expense in the plan.</p>\n<p>A year-one figure a finance committee can trust adds up at least these lines:</p>\n<ul class=\"keys\"><li><b>Licence or subscription</b> pays for the software itself, up front on your own servers or per user in the cloud.</li><li><b>Configuration labour</b> pays the analysts and consultants who settle thousands of decisions about tables, identifiers, and business rules.</li><li><b>Integration</b> pays for the interfaces to whatever you are not replacing, which is where custom work quietly accumulates.</li><li><b>Training and change management</b> pays to teach people a new interface and a new set of business processes together.</li><li><b>Recurring cost</b> pays for the years after this one, when subscription fees and internal support continue without a project.</li></ul>\n<p>Then warn them about the first month. Companies often see a sharp drop in productivity right after go-live, while experienced people work slowly in an unfamiliar system. Say so in advance. Otherwise the earliest numbers look like failure and the project loses its sponsor in week three.</p>\n<div class=\"activity\" data-activity=\"planCase\"></div>\n<h3>Say what would make it fail</h3>\n<p>The chapter's four recommendations for a successful implementation are also four ways to fail. Read them backwards, add the warning the chapter gives separately about customization, and the risk section writes itself:</p>\n<ul class=\"keys\"><li><b>No executive sponsor</b> is the failure most often blamed, because nobody can authorize the process changes the software assumes.</li><li><b>Advice taken from the vendor alone</b> risks a contract written around what a salesperson understood about your work.</li><li><b>Thin training</b> leaves people running the old process inside a new screen, so the promised benefit misses the numbers.</li><li><b>A single-department team</b> misses requirements end users could have named, and alienates the people who must use it.</li><li><b>Heavy customization</b> buys a fit today and an expensive upgrade later, since those changes are rebuilt at each release.</li></ul>\n<p>Name what you give up, too. Adopting your industry's best practices can leave you running the same process as every competitor. If one of your processes is genuinely an advantage, say which one, and say why you are protecting it from the standard configuration.</p>\n<div class=\"activity\" data-activity=\"planSim\"></div>\n<h3>Choose the evidence before the work starts</h3>\n<p>Pick the measure now, while you can still be wrong in public. Fix the baseline: 70 failed stock promises per 1,000 orders this quarter. Fix the denominator, so a slow quarter cannot be mistaken for improvement. Fix the target and the date: under 30 per 1,000, reviewed twelve weeks after go-live.</p>\n<p>Write the decision rule beside it. If the number does not move, what happens then? Name the guardrails as well, such as on-time shipment, order accuracy, and days to close the books. A headline number that improves while a guardrail collapses has not earned the next round of spending.</p>\n<div class=\"activity\" data-activity=\"planSelfcheck\"></div>\n<p class=\"takeaway\">A recommendation a manager can approve names a process failure with a count, one component of one system, the whole year-one cost and what recurs after it, the ways the work could fail, and the single number that will settle the argument on a date you set in advance.</p>\n";

ACT.planCase = {
  "kind": "case",
  "label": "Mini case",
  "title": "One budget, three proposals",
  "objective": "8.7",
  "how": "Read the brief, the facts, and the exhibit. Each decision is settled by arithmetic you can do on the figures shown, not by which proposal sounds most ambitious.",
  "brief": "Northbrook Fixtures is a hypothetical maker of commercial shelving that ships about 2,400 orders a quarter. Purchasing and the shop floor keep separate on-hand figures, so sales keeps promising stock the plant does not have. The board approved $180,000 for year one and will fund one initiative.",
  "facts": [
    { "k": "Orders last quarter", "v": "2,400" },
    { "k": "Orders promised without stock", "v": "168, or 7% of orders" },
    { "k": "Cost of one failed promise", "v": "$310 in expedited freight and credits" },
    { "k": "Approved year-one budget", "v": "$180,000" },
    { "k": "Proposal B recurring cost", "v": "$31,000 a year after year one" }
  ],
  "exhibit": {
    "name": "Three proposals, priced across year one",
    "caption": "Invented figures for this practice case only.",
    "headers": ["Proposal", "Licence or subscription", "Configuration and integration", "Training and change", "Year-one total"],
    "rows": [
      ["A. Replace the full ERP suite", "$60,000", "$150,000", "$45,000", "$255,000"],
      ["B. Configure the operations component", "$18,000", "$52,000", "$26,000", "$96,000"],
      ["C. Add marketing automation", "$24,000", "$9,000", "$6,000", "$39,000"]
    ]
  },
  "questions": [
    {
      "q": "Which proposal is ruled out by arithmetic before anyone argues its merits?",
      "opts": [
        "Proposal C, because $39,000 buys too little to matter here.",
        "Proposal B, because $96,000 plus $31,000 recurring breaks the budget.",
        "Proposal A, because its $255,000 year-one total exceeds the budget.",
        "No proposal, since each licence line alone fits inside $180,000."
      ],
      "a": 2,
      "why": [
        "Proposal C costs the least of the three, and a low price on its own disqualifies nothing.",
        "Ninety-six thousand plus thirty-one thousand is $127,000, which still sits below the approved $180,000.",
        "Two hundred fifty-five thousand exceeds $180,000 by $75,000, so the board cannot fund it as quoted.",
        "Reading the licence column by itself hides configuration, integration, and training, which is where Proposal A breaks."
      ]
    },
    {
      "q": "Proposal B is the one you will recommend. Which figure belongs in the paper the finance committee reads?",
      "opts": [
        "The $18,000 subscription, since the other lines are internal project work.",
        "The $96,000 year-one total, with the $31,000 recurring figure beside it.",
        "The $52,000 configuration line, since it is the largest single item.",
        "The $70,000 of licence and configuration, with training absorbed later."
      ],
      "a": 1,
      "why": [
        "Configuration, integration, and training are real cash costs, not free work absorbed by existing staff.",
        "Year-one total plus the recurring line tells the committee what it approves now and what follows.",
        "Naming the largest line by itself understates the year-one commitment by $44,000 and omits the recurring cost.",
        "Training and change management is the expense the chapter says gets left out of the budget most often."
      ]
    },
    {
      "q": "If Proposal B cuts failed stock promises from 7% to 3% of 2,400 quarterly orders, what quarterly saving should you claim at $310 each?",
      "opts": [
        "$22,320, the cost of the failed promises that still remain.",
        "$52,080, the cost of every failed promise in the quarter.",
        "$7,440, the cost of one percentage point of failed promises.",
        "$29,760, the cost of the 96 failed promises now avoided."
      ],
      "a": 3,
      "why": [
        "Twenty-two thousand three hundred twenty is what the remaining 72 failures still cost every quarter.",
        "Fifty-two thousand eighty assumes each failure disappears, but the estimate leaves 3% of orders failing.",
        "Seven thousand four hundred forty covers a single percentage point, and the estimate moves four of them.",
        "Seven percent of 2,400 is 168 and three percent is 72; 96 avoided failures at $310 is $29,760."
      ]
    }
  ],
  "debrief": "Arithmetic settles most of this. Proposal A exceeds the budget as quoted. The honest figure for Proposal B is $96,000 in year one and $31,000 a year afterwards. The estimated benefit is about $29,760 a quarter, or $119,040 a year, against a problem costing roughly $208,320 a year today. Those are estimates of avoided cost, not cash in hand, and they hold only while the configuration actually changes how purchasing and the plant record stock."
};

ACT.planSim = {
  "kind": "sim",
  "label": "Decision walkthrough",
  "title": "Build the recommendation, one step at a time",
  "objective": "8.7",
  "how": "Write the recommendation in order, from the problem statement to the evidence plan. Choose at each step and read what the choice costs you before moving on.",
  "intro": "You have twenty minutes with the operations director and one page to fill. The hypothetical figures are the ones from the mini case.",
  "steps": [
    {
      "situation": "You have one opening sentence. Which one do you write?",
      "opts": [
        {
          "t": "We need a modern ERP suite to replace the plant's ageing systems before the next financial year.",
          "ok": false,
          "out": "This names a purchase, not a problem. The first question back is what it is for, and you start the conversation over."
        },
        {
          "t": "Our order data is a mess and the shop-floor staff keep entering the wrong numbers into it.",
          "ok": false,
          "out": "Blame lands on people rather than on the two systems holding the same inventory data, and nobody can price a complaint."
        },
        {
          "t": "Purchasing and the plant hold different stock figures, so we over-promised on 168 orders.",
          "ok": true,
          "out": "A process failure with a count attached. It points at order-to-cash, it can be verified, and a skeptical reader can still follow it."
        }
      ]
    },
    {
      "situation": "Now name what you are asking the company to buy. Which phrasing goes on the page?",
      "opts": [
        {
          "t": "The ERP's operations management component, with purchasing and the plant on one stock record.",
          "ok": true,
          "out": "A component and the business rule it enforces. A vendor can quote it, and the reader can see what changes on Monday."
        },
        {
          "t": "An enterprise system that integrates every business process across the company on one database.",
          "ok": false,
          "out": "That is the class of software, not a purchase. Nobody can quote it, scope it, or schedule it from this sentence."
        },
        {
          "t": "A custom program that copies stock figures between the two systems every night.",
          "ok": false,
          "out": "Two masters survive, the copy is a shift out of date, and you now own code that must be rewritten at each release."
        }
      ]
    },
    {
      "situation": "Finance asks what it costs. Which answer do you give?",
      "opts": [
        {
          "t": "$18,000 a year for the subscription, which is the figure the vendor quoted us at the demonstration.",
          "ok": false,
          "out": "The licence is the smallest line. Configuration, integration, and training arrive later as surprises, and surprises cost sponsors."
        },
        {
          "t": "It pays for itself inside a year, so the exact cost matters less than the delay does.",
          "ok": false,
          "out": "A payback claim with no cost behind it cannot be audited, and the committee has no figure to approve."
        },
        {
          "t": "$96,000 in year one for licence, configuration, integration and training, then $31,000 a year.",
          "ok": true,
          "out": "One number to approve now and one to plan around. Nothing in the second year arrives as an unbudgeted request."
        }
      ]
    },
    {
      "situation": "The committee asks what would make this fail. What goes in the recommendation?",
      "opts": [
        {
          "t": "Little can go wrong, since the vendor's best-practice modules are proven across this industry.",
          "ok": false,
          "out": "Industry best practices smooth an implementation; they do not supply a sponsor, trained users or a team. The chapter's failure list starts with weak sponsorship."
        },
        {
          "t": "A named sponsor, outside advice, trained users, and a cross-department team.",
          "ok": true,
          "out": "The chapter's four recommendations, read backwards as the four ways this fails, each with someone accountable for it."
        },
        {
          "t": "A risk register will be opened after go-live, once the real problems have begun to appear.",
          "ok": false,
          "out": "Risks named after go-live cannot change the plan. The training budget is already spent or already missing by then."
        }
      ]
    },
    {
      "situation": "Last question on the page: how will anyone know whether it worked?",
      "opts": [
        {
          "t": "Failed stock promises per 1,000 orders, from a baseline of 70, reviewed twelve weeks out.",
          "ok": true,
          "out": "Baseline, denominator, and date are fixed before the work starts, so the review can go either way honestly."
        },
        {
          "t": "The plant managers will report back on whether the new screens feel faster than the old ones.",
          "ok": false,
          "out": "Impressions run high in the weeks after training and cannot separate a real gain from a quiet quarter."
        },
        {
          "t": "We will settle on a measure once the first full quarter of figures has come in after go-live.",
          "ok": false,
          "out": "A measure chosen after the results arrive will be the one that flatters them, and everyone in the room knows it."
        }
      ]
    }
  ]
};

ACT.planSelfcheck = {
  "kind": "selfcheck",
  "label": "Readiness check",
  "title": "Does your recommendation have every part?",
  "objective": "8.7",
  "how": "Hold your own one-page recommendation beside this list. Mark what you can defend without notes, and use each hint on what you cannot.",
  "items": [
    {
      "t": "I state the problem as a process failure with a count, not as missing software.",
      "hint": "Reread your first sentence. If it names a product before it names a broken process, write it again."
    },
    {
      "t": "I name the system, the component, and the module I am asking for.",
      "hint": "Work down the chapter's levels: enterprise system, then core or extended component, then the module itself."
    },
    {
      "t": "I separate configuration from customization in my own proposal.",
      "hint": "Configuration sets rules, tables, and identifiers; customization writes code that must be rebuilt at the next release."
    },
    {
      "t": "I give a year-one total and the recurring cost that follows it.",
      "hint": "Add licence, configuration, integration, training, and change management, then state next year's figure on its own line."
    },
    {
      "t": "I name the ways this implementation fails and who prevents each one.",
      "hint": "Turn the four success factors around: sponsorship, outside expertise, thorough training, and a multidisciplinary team."
    },
    {
      "t": "I state a baseline, a denominator, a target, and a review date.",
      "hint": "A measure chosen after the results arrive settles nothing. Write all four down before go-live, not after."
    },
    {
      "t": "I name the guardrails that must not get worse while the headline number improves.",
      "hint": "On-time shipment, order accuracy, and the time taken to close the books are the usual three."
    },
    {
      "t": "I say what the firm gives up by adopting its industry's best practices.",
      "hint": "If one process is genuinely a source of advantage, name it and say why it is being protected."
    }
  ]
};
