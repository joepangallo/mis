/* Chapter 8 lesson and activity data. Rebuild with node src/build.mjs --module=modules/08. */
PROSE.s86 = "\n<span class=\"eyebrow\">Application 8.6</span><h2>Enterprise systems through the five forces and the value chain</h2>\n<p class=\"lede\">You can now say what an ERP, an SCM system and a CRM system do. That is a description. A manager is paid for the next step: naming the pressure the firm is actually under, and saying which system relieves it. This section is that step.</p>\n<div class=\"callout info\"><b>Application supplement.</b> This section applies two frameworks you met earlier in the course to this chapter’s material. It is not one of the chapter’s own objectives and it introduces no new framework. Every firm, order book and figure in it is hypothetical, invented for practice.</div>\n<h3>The two frameworks, in the course’s words</h3>\n<p>The five forces describe the pressure on a firm’s profits from outside it. A force is not good or bad. It is strong or weak, and your job is to say which, and on what evidence.</p>\n<ul class=\"keys\"><li><b>Rivalry among existing competitors</b> is the contest among sellers already inside your industry, showing up in price, distribution and service.</li><li><b>Threat of new entrants</b> is the chance that firms not competing with you today will start tomorrow, bringing added capacity.</li><li><b>Threat of substitutes</b> is a different kind of product or service meeting the same underlying need, usually from an industry you do not watch.</li><li><b>Bargaining power of buyers</b> is your customers’ ability to push back on your terms, through concentration or the ease of walking away.</li><li><b>Bargaining power of suppliers</b> is the ability of whoever supplies your inputs to decide how the relationship runs, and it reaches you as cost.</li></ul>\n<p>The value chain answers a different question. Not what presses on the firm, but where inside it value is created. Five primary activities carry the product, and five support activities carry the firm.</p>\n<ul class=\"keys\"><li><b>Inbound logistics, operations and outbound logistics</b> are the spine: receiving inputs, turning them into the product, and delivering the result.</li><li><b>Marketing and sales, and service</b> are the customer-facing pair, covering the reason to buy and everything that happens after the money moves.</li><li><b>Procurement and technology development</b> are two of the five supports: deciding what to buy and on what terms, and building the applications the primary work runs on.</li><li><b>Human resources</b> is a third, covering hiring, interview scheduling, payroll and benefits, because no primary activity happens without the people who perform it.</li><li><b>Administration and firm infrastructure</b> are the remaining two, and the framework counts them separately: decisions that span functions and levels, and the buildings, machinery and networks the rest is implemented on.</li></ul>\n<p>A recommendation that does not land on one of those ten activities is a recommendation nobody can act on.</p>\n<div class=\"activity\" data-activity=\"forceDiagram\"></div>\n<h3>Two confusions worth settling now</h3>\n<p>The first is substitutes against new entrants. Look at what the customer ends up with. If they stopped buying the product at all and met the need another way, that is a substitute. If they bought the same product from somebody new, that is entry.</p>\n<p>Whether the seller owns a factory is not the test. A newcomer renting capacity by the month is still an entrant if it ships what you ship. A well-funded firm selling something that makes your product unnecessary is a substitute, however it is built.</p>\n<p>The second confusion is about suppliers. A supplier is not only a firm that sends invoices. Anything your work depends on is an input, and that includes people.</p>\n<ul class=\"keys\"><li><b>Skilled employees leaving</b> is supplier power when the rate for a replacement rises, because labor is an input the firm has to buy.</li><li><b>A sole approved supplier</b> holds the same kind of power when it shortens payment terms mid-contract and you hold no priced alternative.</li><li><b>Buying nobody can see whole</b> hands power away by default, because a firm that cannot state what it purchases in total never uses the leverage it already has.</li></ul>\n<p>Calling the first of those a human-resources problem is the common mistake. Human resources is where you do something about it. Supplier power is what it is.</p>\n<div class=\"activity\" data-activity=\"forceSort\"></div>\n<h3>The chapter already argued all five, without the word</h3>\n<p>Read the chapter’s account of the age of the customer with the framework in hand. In a few consecutive sentences it argues every one of the five forces, and it never once says the word “force”.</p>\n<ul class=\"keys\"><li><b>Barriers to entry fell</b> when the internet freed customers from buying locally, which is the threat of new entrants rising.</li><li><b>Digital substitutes</b> replaced or marginalized many products, which is substitution rather than a new competitor arriving in your industry.</li><li><b>Buyer power increased</b> because a customer can find prices, reviews and a competitor’s stock in seconds and leave over a small difference.</li><li><b>Employees, an important source of supply</b>, gained mobility and therefore power, which is supplier power showing up in the labor market.</li><li><b>Competitors can predict your next move</b> from the information they hold, which sharpens rivalry among firms already selling what you sell.</li></ul>\n<p>That is the reading skill this section teaches. Evidence almost never arrives labeled with the force it belongs to.</p>\n<h3>What an enterprise system changes, and what it does not</h3>\n<p>Each of the three system families lands on particular activities, and through those activities it touches particular forces.</p>\n<ul class=\"keys\"><li><b>ERP</b> lands on the support activities and the internal spine, so its usual target is cost and the speed of ordinary decisions.</li><li><b>SCM</b> lands on inbound and outbound logistics and on procurement, so it moves supplier terms, delivery reliability and stock held.</li><li><b>CRM</b> lands on marketing and sales and on service, so it is the family aimed most directly at the bargaining power of buyers.</li></ul>\n<p>Now the limit. A system that works improves this firm’s position inside the industry it is already in. It does not by itself change the industry’s structure. After your CRM ships there are still the same rivals, entry is still as easy or as hard as it was, and any substitute is doing whatever it was doing before.</p>\n<p>What changed is how much of that pressure lands on you rather than on the firm next door. The distinction decides what you promise. “This will cut the credits we issue and give three concentrated buyers a reason to stay” can be tested in a quarter. “This will make our industry less competitive” is not a claim at all.</p>\n<div class=\"activity\" data-activity=\"forceCase\"></div>\n<p class=\"takeaway\">Name the force from the evidence, land the work on a named activity, and claim only what a system can do: move one firm’s position inside a structure that stays exactly where it was.</p>\n";

ACT.forceDiagram = {
  "kind": "diagram",
  "label": "Interactive diagram",
  "title": "Two frameworks over one firm",
  "objective": "8.6",
  "how": "Select each tab to trace a different view. Read the boxes, then the explanation beneath them.",
  "models": [
    {
      "id": "0",
      "name": "The five forces",
      "site": "Where the pressure on a firm’s profit comes from, viewed from outside the firm.",
      "boxes": [
        {
          "t": "Threat of new entrants",
          "w": "Firms not in this business today that could start tomorrow",
          "c": "a"
        },
        {
          "t": "Bargaining power of suppliers",
          "w": "Whoever supplies an input, including the people you hire",
          "c": "b"
        },
        {
          "t": "Rivalry among existing competitors",
          "w": "The firms already selling what you sell to the same buyers",
          "c": "c"
        },
        {
          "t": "Bargaining power of buyers",
          "w": "Customers pushing back on price, quality and terms",
          "c": "b"
        },
        {
          "t": "Threat of substitutes",
          "w": "A different kind of thing meeting the same underlying need",
          "c": "d"
        }
      ],
      "points": [
        "Each force is rated strong or weak on evidence, not judged good or bad. Two firms in one industry can face the same five forces and still be squeezed by different ones.",
        "The two that get confused sit opposite each other here. An entrant sells your product; a substitute sells a different product that makes yours unnecessary."
      ]
    },
    {
      "id": "1",
      "name": "The value chain",
      "site": "Where inside the firm the work would actually land, once a force has been named.",
      "boxes": [
        {
          "t": "Primary flow",
          "w": "Inbound logistics, operations, outbound logistics",
          "c": "a"
        },
        {
          "t": "Customer-facing",
          "w": "Marketing and sales, then service after the sale",
          "c": "b"
        },
        {
          "t": "Buying and building",
          "w": "Procurement and technology development",
          "c": "c"
        },
        {
          "t": "The people",
          "w": "Human resources: hiring, payroll and benefits",
          "c": "d"
        },
        {
          "t": "Running the firm",
          "w": "Administration and firm infrastructure, counted as two",
          "c": "a"
        }
      ],
      "points": [
        "Procurement is the buying decision; inbound logistics is the physical receiving of what was bought. Systems that consolidate spend belong to the first, not the second.",
        "In a service business the primary flow still exists, but operations is often the service being performed rather than anything physical being moved.",
        "Five core activities and five supports make ten places work can land. Administration and firm infrastructure are two separate supports rather than one, so a recommendation has to say which of them it means."
      ]
    },
    {
      "id": "2",
      "name": "Force to activity to system",
      "site": "One worked chain, for a hypothetical firm whose strongest force is buyer power.",
      "boxes": [
        {
          "t": "Evidence",
          "w": "Three accounts hold 79 of 110 open contracts",
          "c": "a"
        },
        {
          "t": "Force",
          "w": "Bargaining power of buyers, not rivalry",
          "c": "b"
        },
        {
          "t": "Activity",
          "w": "Marketing and sales, and service after the sale",
          "c": "c"
        },
        {
          "t": "System",
          "w": "A customer record those accounts would lose by leaving",
          "c": "d"
        }
      ],
      "points": [
        "Reverse the chain to test it. If the system were removed, would those 3 accounts regain the leverage they held at the last renewal? If the answer is no, the system was not answering that force.",
        "The chain stops at one firm. Ship it and the industry still has the same competitors, the same barriers and the same substitutes as before."
      ]
    }
  ]
};

ACT.forceSort = {
  "kind": "sort",
  "label": "Sort",
  "title": "Read one order book",
  "objective": "8.6",
  "how": "Six entries from the order book of a hypothetical maker of hydraulic hose assemblies. Put each one under the force it is evidence of, then check and read why.",
  "buckets": [
    {
      "id": "rivalry",
      "name": "Rivalry among existing competitors",
      "hint": "Firms already in this industry, selling what you sell"
    },
    {
      "id": "buyers",
      "name": "Bargaining power of buyers",
      "hint": "Customers dictating price, quality or terms"
    },
    {
      "id": "suppliers",
      "name": "Bargaining power of suppliers",
      "hint": "Whoever supplies an input, including people"
    },
    {
      "id": "entrants",
      "name": "Threat of new entrants",
      "hint": "Somebody new selling the same product"
    },
    {
      "id": "substitutes",
      "name": "Threat of substitutes",
      "hint": "The same need met another way entirely"
    }
  ],
  "items": [
    {
      "t": "Two competitors that have sold assemblies here for years matched our 6 percent price cut within 9 days.",
      "b": "rivalry",
      "why": "Firms already inside the industry, matching a move within days. Volume did not grow, so the discount went straight to customers."
    },
    {
      "t": "Three accounts hold 62 of our 90 open contracts, and each renewal now demands 30 days of free replacement.",
      "b": "buyers",
      "why": "Concentration is buyer power. It works at every renewal whether or not any of the three actually leaves."
    },
    {
      "t": "Four of our 7 application engineers left in a year, and the agency rate for a replacement rose from 78 to 95 dollars an hour.",
      "b": "suppliers",
      "why": "Labor is an input the firm buys. When the rate rises because the people can move, that is supplier power rather than a staffing inconvenience."
    },
    {
      "t": "Our single approved fitting supplier shortened payment terms from 45 days to 15 and raised prices mid-contract.",
      "b": "suppliers",
      "why": "One source, a large share of cost, and terms set on their schedule. This force usually shows up in the cost line rather than in lost sales."
    },
    {
      "t": "A machine shop that has never sold hose assemblies rented a nearby unit and quoted 3 of our accounts for the same work.",
      "b": "entrants",
      "why": "The customer would end up with the same product from somebody new. That is entry, and it was entry before the shop won anything."
    },
    {
      "t": "Eleven accounts stopped ordering hose assemblies and now specify a sealed electric actuator that uses no hose at all.",
      "b": "substitutes",
      "why": "The customer met the need another way and left the category. Cutting hose prices cannot reach a buyer who is no longer buying hose."
    }
  ]
};

ACT.forceCase = {
  "kind": "case",
  "label": "Mini case",
  "title": "Which system answers the pressure?",
  "objective": "8.6",
  "how": "Study the hypothetical case and its invented figures. Make every decision to unlock the debrief; read the explanation for each option.",
  "brief": "A hypothetical maker of chilled sauces runs one plant and one depot with 90 staff. Five firms have sold into this market for a decade. Revenue is flat, a 3 percent price cut last year moved no volume, and the board will fund exactly one system this year.",
  "facts": [
    {
      "k": "Competitors",
      "v": "4, all trading here for 10 years or more"
    },
    {
      "k": "Price cut last year",
      "v": "3 percent across the range; volume unchanged, and no rival matched it"
    },
    {
      "k": "Chilled sauce volume through the 3 chains",
      "v": "Steady, and their shelf space is unchanged"
    },
    {
      "k": "Delivery credits issued",
      "v": "41,000 dollars, none explained to the customer"
    },
    {
      "k": "Line supervisor agency rate",
      "v": "Up from 24 to 31 dollars an hour"
    }
  ],
  "exhibit": {
    "name": "Order book, last four quarters",
    "caption": "Invented practice figures for this hypothetical firm only.",
    "headers": [
      "Customer",
      "Share of orders",
      "Asked for at last renewal"
    ],
    "rows": [
      [
        "Grocery chain A",
        "38%",
        "4 percent price cut plus free re-delivery"
      ],
      [
        "Grocery chain B",
        "27%",
        "Weekly delivery at no extra charge"
      ],
      [
        "Grocery chain C",
        "19%",
        "Renewed flat, wants daily stock reporting"
      ],
      [
        "58 independent shops",
        "16%",
        "Nothing; orders placed by phone as before"
      ]
    ]
  },
  "questions": [
    {
      "q": "On this evidence, which force is taking the most margin out of this firm?",
      "opts": [
        "Rivalry, because 5 firms sell the same sauces and price is the move everyone reaches for",
        "Substitutes, because a 3 percent cut moved no volume whatever last year",
        "Buyer power, because 3 chains hold 84 percent of orders and set renewal terms",
        "New entrants, because the 58 independent shops could be served by a newcomer"
      ],
      "a": 2,
      "why": [
        "Five long-standing sellers make rivalry real, but no rival matched the cut and this firm’s own volume never moved. The contest between sellers is not what sets the terms at renewal.",
        "A cut that moves no volume can signal substitution, but category volume through the 3 chains is steady and their shelf space is unchanged. Nobody has met the need another way.",
        "Three concentrated accounts, each arriving at renewal with a demand the firm absorbs, is buyer power. It operates whether or not any of them leaves.",
        "Nothing in the evidence names a firm that was not selling here last year. The pressure described is arriving from existing customers, not from a newcomer."
      ]
    },
    {
      "q": "Which proposal best answers the force you named?",
      "opts": [
        "A finance module that closes the month in 2 days instead of the 9 it takes now",
        "A customer portal holding each chain’s order history, standing orders and credits",
        "A supplier portal consolidating jar, label and pallet buying across both sites",
        "A warehouse scanner rollout so pallets are counted at the door rather than by hand"
      ],
      "a": 1,
      "why": [
        "A faster close is real value and belongs to administration and firm infrastructure, but it changes nothing about what a chain demands at the next renewal.",
        "It gives a concentrated buyer something to lose by leaving: their own history, standing orders and a credit record that can be explained at renewal.",
        "Consolidating purchases answers supplier power, which is present in the agency rate. That is the second-strongest force here, not the one taking the margin.",
        "Counting pallets accurately is inbound logistics housekeeping. It reduces write-offs and never reaches the customer who is dictating the terms."
      ]
    },
    {
      "q": "The portal ships and works as intended. What has actually changed?",
      "opts": [
        "The industry became less competitive, because one firm now holds better information",
        "Buyer power is gone for every firm selling chilled sauces into those 3 chains",
        "Rivalry fell, because 4 competitors have now lost those accounts to this firm",
        "This firm’s position improved inside a structure that is where it was"
      ],
      "a": 3,
      "why": [
        "Better information inside one firm is not a change to the industry. The number of sellers, the ease of entry and the substitute are all where they were.",
        "The three chains still hold most of the orders and can still take them elsewhere. What changed is the cost of doing so, and only with this supplier.",
        "Rivalry is a property of the industry rather than of one quarter’s results. Winning share is the contest continuing, not the contest weakening.",
        "An enterprise system moves one firm’s position within a structure it does not redraw. That is the honest version of the promise to make to a board."
      ]
    }
  ],
  "debrief": "The symptom was price and the force was concentration. A cut aimed at rivalry moved nothing, because the pressure was arriving from 3 buyers rather than from 5 sellers. The portal lands on marketing and sales and on service, and it earns back credits nobody could explain. What it does not do is redraw the industry: the same 5 firms compete next year, on the same terms, with this one holding a record its customers would have to abandon."
};
