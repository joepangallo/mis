/* Chapter 7 lesson and activity data. Rebuild with node src/build.mjs --module=modules/07. */
PROSE.s75 = "\n<span class=\"eyebrow\">Objective 7.5 · Application 7.5</span><h2>Decision systems through the five forces and the value chain</h2>\n<p class=\"lede\">You can now say what descriptive, diagnostic, predictive and prescriptive analytics do, and what a model, an agent, a knowledge system and a map of layers are for. That is a description. A manager is paid for the step after it: naming the pressure the firm is actually under, saying which decision system relieves it, and admitting what no system can do.</p>\n<div class=\"callout info\"><b>Application supplement.</b> This section applies two frameworks you met earlier in the course to this chapter’s material. It is not one of the chapter’s own objectives and it introduces no new framework. Fairmount Provisions — a regional food and household goods distributor with 40 depots and 1,100 staff, selling to independent grocers, school kitchens and restaurants — is hypothetical, and every figure used for practice here is invented.</div>\n<h3>The two frameworks, in the course’s words</h3>\n<p>The five forces describe the pressure on a firm’s profits from outside the firm. A force is not good or bad. It is strong or weak, and your job is to say which, and on what evidence.</p>\n<ul class=\"keys\"><li><b>Rivalry among existing competitors</b> is the contest among sellers already inside your industry, showing up in price, distribution and service.</li><li><b>Threat of new entrants</b> is the chance that firms not competing with you today will start tomorrow, bringing added capacity and lower prices.</li><li><b>Threat of substitutes</b> is a different kind of product or service meeting the same underlying need, usually from an industry you do not monitor.</li><li><b>Bargaining power of buyers</b> is your customers’ ability to push back on price, quality and terms, through concentration or the ease of leaving.</li><li><b>Bargaining power of suppliers</b> is the ability of whoever supplies an input to set the terms, and it reaches you as cost rather than as lost sales.</li></ul>\n<p>The value chain asks a different question. Not what presses on the firm, but where inside it the work would land. Five primary activities carry the product, over four support bands that carry the firm.</p>\n<ul class=\"keys\"><li><b>Inbound logistics, operations and outbound logistics</b> are the spine: receiving inputs, turning them into the product, and delivering the result.</li><li><b>Sales and marketing, and service</b> are the customer-facing pair, covering the reason to buy and everything that happens after the money moves.</li><li><b>Procurement and technology development</b> are two of the four supports: the buying decision itself, and building the systems the rest of the chain runs on.</li><li><b>Human resources, and administration and firm infrastructure</b> are the other two: who is hired, trained and rostered, and the planning, finance and general management that belong to no single product.</li></ul>\n<p>Nine activities, then, and a recommendation that does not land on one of them is a recommendation nobody can act on.</p>\n<div class=\"activity\" data-activity=\"forceDiagram\"></div>\n<h3>Two confusions worth settling now</h3>\n<p>The first is substitutes against new entrants. Look at what the customer ends up with. If they bought the same thing from somebody new, that is entry. If they stopped buying it at all and met the need another way, that is a substitute.</p>\n<p>Whether the seller owns a warehouse or a fleet is not the test. A wholesaler renting racking and third-party couriers by the month is still an entrant, because a grocer ends up with the same case packs. A caterer plating meals for a school district is a substitute, because that district now orders no ingredients from anybody.</p>\n<p>The second confusion is about suppliers. A supplier is not only a firm that sends invoices. Anything the work depends on is an input, and that includes people.</p>\n<ul class=\"keys\"><li><b>Skilled people leaving</b> is supplier power when the rate for a replacement rises, because labor is an input the firm has to buy.</li><li><b>A sole approved manufacturer</b> holds the same kind of power when it raises its minimum drop size and moves you from weekly delivery to every second week.</li><li><b>Buying nobody can see whole</b> hands power away by default, because a firm that cannot state what 40 depots purchase in total never uses the leverage it already has.</li></ul>\n<p>Calling the first of those a human-resources problem is the common mistake. Human resources is the support band where you do something about it, through pay, rostering and mentoring. Supplier power is what it is: an input whose price is set by somebody else.</p>\n<p>The chapter’s own worry sits underneath. When the depot manager with 31 years of it retires, the tacit knowledge leaves along with the labor, and the chapter is blunt that recognizing, storing and sharing exactly that tacit part is a knowledge management system’s primary objective, and a standing challenge.</p>\n<div class=\"activity\" data-activity=\"forceSort\"></div>\n<h3>What a decision system changes, and what it does not</h3>\n<p>Each family of system in this chapter lands on particular activities, and reaches a force through them.</p>\n<ul class=\"keys\"><li><b>Business intelligence and dashboards</b> land on administration and firm infrastructure, because what they change is how fast ordinary decisions get made.</li><li><b>Forecasting and prescriptive models</b> land on the spine, where chilled stock is held, vans are loaded and a week-31 shortage either happens or does not.</li><li><b>Generative tools and agents</b> land mostly on sales and marketing and on service, since drafting and answering customers is where the work is.</li><li><b>Knowledge management</b> lands on human resources and technology development, because best practice has to be captured, kept current and put where the next person will find it.</li><li><b>A geographic information system</b> adds location as a dimension, so it lands where distance costs money: outbound logistics, and the planning that chooses a depot site.</li></ul>\n<p>Now the limit, and it is the part a board mishears. A decision system that works improves this firm’s decisions inside the industry it is already in. It does not by itself change that industry’s structure. Ship the week-31 forecast and the region still holds the same distributors, entry is as cheap as it was, and the caterer is doing whatever it was doing before.</p>\n<p>The software, meanwhile, is for sale to everybody. The course’s test of rivalry asks whether anything in your offer is hard for a rival to imitate, and a package on general sale is the easiest thing of all to copy: a rival buys the same forecasting package next quarter and stands where you stand.</p>\n<p>The chapter says as much in its own words — having the right tools is not sufficient, because it takes data literacy and human judgment to turn an insight into a decision. So test a claimed advantage by asking what a rival would actually need to reproduce it.</p>\n<ul class=\"keys\"><li><b>The data</b> comes first: 2,400 deliveries somebody labeled against an agreed meaning of “late”, which is slower work than making the deliveries.</li><li><b>The process</b> comes second, because a forecast nobody loads the vans from is a number on a screen rather than a decision.</li><li><b>The people</b> come third: dispatchers who know which chef will accept a substitution hold the tacit part a rival cannot license.</li></ul>\n<p>An advantage that survives all three questions is worth promising to a board. Anything that does not is a purchase, and should be argued as one.</p>\n<div class=\"activity\" data-activity=\"forceCase\"></div>\n<p class=\"takeaway\">Name the force from the evidence, land the system on one of the nine activities, and claim only what it can do: move one distributor’s decisions inside a structure that stays exactly where it was.</p>\n";

ACT.forceDiagram = {
  "kind": "diagram",
  "label": "Interactive diagram",
  "title": "Two frameworks over one distributor",
  "objective": "7.5",
  "how": "Select each tab to trace a different view of the same hypothetical firm. Read the boxes, then the explanation beneath them.",
  "models": [
    {
      "id": "0",
      "name": "The five forces",
      "site": "Where the pressure on a distributor’s margin comes from, read from outside the firm. The five are a set rather than a sequence, so the order of the boxes carries no meaning.",
      "boxes": [
        {
          "t": "Threat of new entrants",
          "w": "Firms not distributing here today that could start tomorrow",
          "c": "a"
        },
        {
          "t": "Bargaining power of suppliers",
          "w": "Whoever supplies an input, including the people you hire",
          "c": "b"
        },
        {
          "t": "Rivalry among existing competitors",
          "w": "Distributors already selling the same case packs to the same buyers",
          "c": "c"
        },
        {
          "t": "Bargaining power of buyers",
          "w": "Grocers, school districts and restaurants pushing back on terms",
          "c": "b"
        },
        {
          "t": "Threat of substitutes",
          "w": "A different kind of thing meeting the same underlying need",
          "c": "d"
        }
      ],
      "points": [
        "Each force is rated strong or weak on evidence rather than judged good or bad. Two distributors working the same region can face the same five forces and be squeezed by different ones.",
        "The two that get confused are entry and substitution. An entrant sells what you sell; a substitute sells something that makes what you sell unnecessary.",
        "Analytics does not change which forces exist. It changes how quickly you can tell which one the evidence in front of you belongs to."
      ]
    },
    {
      "id": "1",
      "name": "The value chain",
      "site": "Where inside the firm a decision system would land, once a force has been named. The five boxes group the nine activities rather than replacing them.",
      "boxes": [
        {
          "t": "The spine",
          "w": "Inbound logistics, operations, outbound logistics",
          "c": "a"
        },
        {
          "t": "Customer-facing",
          "w": "Sales and marketing, then service after the sale",
          "c": "b"
        },
        {
          "t": "Buying and building",
          "w": "Procurement and technology development",
          "c": "c"
        },
        {
          "t": "The people",
          "w": "Human resources: hiring, training and rostering",
          "c": "d"
        },
        {
          "t": "Running the firm",
          "w": "Administration and firm infrastructure: planning, finance, general management",
          "c": "a"
        }
      ],
      "points": [
        "Procurement is the buying decision; inbound logistics is the physical receiving of what was bought. One purchasing record covering 40 depots belongs to the first of those.",
        "Five primary activities sit over four support bands, so a proposal has nine places to land and has to name one of them.",
        "A model is built in technology development, which is almost never the activity it improves. Name the activity its output changes, not the one that builds it."
      ]
    },
    {
      "id": "2",
      "name": "Evidence to force to system",
      "site": "One worked chain, starting from the week 31 stockout the board would not let go of.",
      "boxes": [
        {
          "t": "Evidence",
          "w": "East depots short in week 31; 3 school-kitchen contracts lost",
          "c": "a"
        },
        {
          "t": "Force",
          "w": "Rivalry, decided on reliability rather than on price",
          "c": "b"
        },
        {
          "t": "Activity",
          "w": "The spine: knowing the chilled position and loading against it",
          "c": "c"
        },
        {
          "t": "System",
          "w": "A week-31 pallet forecast, and a loading plan that acts on it",
          "c": "d"
        }
      ],
      "points": [
        "Reverse the chain to test it. If the forecast were switched off tonight, would the next 3 contracts have any reason to stay? If not, the system was never answering that force.",
        "Rivalry is answered here by moving the contest off price. A distributor whose chilled stock is genuinely there does not have to discount to hold a school kitchen.",
        "The chain stops at one firm. Ship it and the region has the same distributors, entry is as easy as it was, and a caterer plating meals is unaffected either way."
      ]
    }
  ]
};

ACT.forceSort = {
  "kind": "sort",
  "label": "Sort",
  "title": "Seven entries from one quarter",
  "objective": "7.5",
  "how": "Seven things that happened to a hypothetical distributor in one quarter. Put each under the force it is evidence of, then check and read why.",
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
      "t": "Two distributors that have worked this region for a decade matched our 4 percent case-price cut inside 10 days, and nobody’s volume moved.",
      "b": "rivalry",
      "why": "Firms already inside the industry, matching a move within days. The discount went straight to customers, which is what rivalry does to an industry’s margin."
    },
    {
      "t": "Eight school districts hold 38 percent of our chilled volume, and every one of them asked at its last renewal for a named delivery window at no extra charge.",
      "b": "buyers",
      "why": "Concentration is buyer power. It works at every renewal whether or not any one of them actually leaves, because both sides know what leaving would cost us."
    },
    {
      "t": "Thirty-four independent grocers formed a buying group and now negotiate one price list covering all of them.",
      "b": "buyers",
      "why": "The same shops that had no leverage individually bought themselves concentration. Nothing about the product changed; the terms are simply set by one negotiator now."
    },
    {
      "t": "Four of our 7 dispatch schedulers left inside a year, and the agency rate for a replacement rose from 41 to 52 dollars an hour.",
      "b": "suppliers",
      "why": "Labor is an input the firm buys. When the replacement rate rises because the people can move, that is supplier power, not a staffing inconvenience."
    },
    {
      "t": "Our largest ambient-goods manufacturer raised its minimum drop size and moved us from weekly delivery to every second week.",
      "b": "suppliers",
      "why": "A large share of what we resell comes from this one firm, and its terms changed on its own schedule. This force shows up in the cost line rather than in lost sales."
    },
    {
      "t": "An online-only wholesaler that was not trading last year rents racking and third-party couriers by the month, and has quoted 9 of our grocers.",
      "b": "entrants",
      "why": "The grocer would end up with the same case packs from a firm new to this business. Renting rather than owning changes the balance sheet, not the label."
    },
    {
      "t": "Two school districts closed their cook-from-scratch kitchens and buy plated meals from a catering contractor, so they order no ingredients at all.",
      "b": "substitutes",
      "why": "The customer met the need a different way and left the category. Cutting case prices cannot reach a district that has stopped buying ingredients from anybody."
    }
  ]
};

ACT.forceCase = {
  "kind": "case",
  "label": "Mini case",
  "title": "One more system, and what it can be promised to do",
  "objective": "7.5",
  "how": "Study the hypothetical case and its invented figures. Make every decision to unlock the debrief; read the explanation for each option.",
  "brief": "Fairmount Provisions is the hypothetical distributor from the course’s decision game: 40 depots, 1,100 staff, selling to independent grocers, school kitchens and restaurants. The board will fund one more decision system next year, and it wants the case argued in forces and activities rather than in features.",
  "facts": [
    {
      "k": "Week 31",
      "v": "East depots short of chilled stock; 3 school-kitchen contracts moved to a ten-year competitor"
    },
    {
      "k": "Late-delivery model",
      "v": "2,400 labeled deliveries; dispatch will use it at 85 percent accuracy or better"
    },
    {
      "k": "Order exceptions",
      "v": "300 a quarter, handled by 2 people, at 2,400 dollars of damage per wrong remedy"
    },
    {
      "k": "Dispatch schedulers",
      "v": "4 of 7 left in a year; agency rate up from 41 to 52 dollars an hour"
    },
    {
      "k": "New this year",
      "v": "An online-only wholesaler renting racking and couriers by the month"
    }
  ],
  "exhibit": {
    "name": "Chilled volume by customer group, last year",
    "caption": "Shares are last year’s, before the week-31 losses. Invented practice figures for this hypothetical distributor only.",
    "headers": [
      "Customer group",
      "Share of chilled volume",
      "Asked for at last renewal"
    ],
    "rows": [
      [
        "8 school districts",
        "38%",
        "A named delivery window at no extra charge"
      ],
      [
        "61 restaurants",
        "26%",
        "Nothing; orders still placed by phone"
      ],
      [
        "Buying group of 34 grocers",
        "21%",
        "One price list covering all 34 shops"
      ],
      [
        "Grocers outside the buying group",
        "15%",
        "Nothing; small weekly orders as before"
      ]
    ]
  },
  "questions": [
    {
      "q": "In week 31 the East depots ran short and 3 school-kitchen contracts moved to a distributor that has supplied this region for ten years. No district asked for a discount or a change of terms first; each simply moved. Which force is that?",
      "opts": [
        "Bargaining power of buyers, since school districts set the terms at every renewal",
        "Threat of substitutes, since the districts found another way to feed the students",
        "Threat of new entrants, since the work went to a firm that was new to this region",
        "Rivalry, since the work went to a distributor already selling here for ten years"
      ],
      "a": 3,
      "why": [
        "Those districts do dictate terms at renewal, but this loss was decided by a missed delivery and a competitor standing ready to take it.",
        "A substitute would mean the districts stopped buying ingredients entirely. They kept buying, from another firm in the same industry.",
        "The winner had supplied this region for ten years, so it is not a firm that arrived from outside the industry this year.",
        "A firm already inside the industry took customers who buy the same case packs, and the contest was settled on reliability rather than price."
      ]
    },
    {
      "q": "Two things happened in the same month: an online-only wholesaler renting racking and couriers quoted 9 of your grocers, and 2 school districts closed their kitchens for a caterer delivering plated meals. Label them.",
      "opts": [
        "Substitute for the wholesaler, entrant for the caterer, by which of them arrived here this year",
        "New entrants for both, because each of them took orders that used to be placed with us",
        "Entrant for the wholesaler, substitute for the caterer, by what each buyer ends up holding",
        "Substitutes for both, because cutting our case prices would win back neither of them"
      ],
      "a": 2,
      "why": [
        "Both labels are reversed, and arrival date is not the test. Look at what each buyer ends up holding: case packs, or meals instead of ingredients.",
        "The districts did not buy case packs from somebody new. They stopped buying ingredients at all, which is a different force.",
        "The grocers end up with the same case packs from a firm new to this business, and the districts end up with meals instead.",
        "A price cut failing to reach either of them is consistent with both labels, so it cannot tell the two situations apart."
      ]
    },
    {
      "q": "Four of the 7 dispatch schedulers left inside a year and the agency rate for a replacement rose from 41 to 52 dollars an hour. Which of the five forces does that evidence belong to?",
      "opts": [
        "Supplier power, because labor is an input this firm has to buy at the market rate",
        "None of them; it is a human-resources matter, because it concerns hiring and pay",
        "Rivalry, because competing distributors are bidding for the same dispatch schedulers",
        "Bargaining power of buyers, because customers now wait longer for a confirmed slot"
      ],
      "a": 0,
      "why": [
        "Anything the work depends on is an input, and a rising replacement rate is a supplier setting part of your cost.",
        "Human resources is the support band where you respond to it, through pay and rostering. Naming the force is a separate step.",
        "Rivalry describes firms competing for the same buyers, not the same staff; competing for staff is what makes labor a strong supplier.",
        "Slower confirmations are a consequence of the departures, not evidence of what customers are able to extract from you."
      ]
    },
    {
      "q": "The week-31 forecast and the loading plan ship and work. A rival buys the same forecasting package next quarter. What does it still not have?",
      "opts": [
        "A way to forecast at all, because the method behind ours has not been published",
        "Our 2,400 labeled deliveries, our meaning of late, and staff who act on it",
        "A region to sell into, because entry here is closed to distributors from outside",
        "Enough vans to use it, because a forecast is worth nothing without spare capacity"
      ],
      "a": 1,
      "why": [
        "The package is sold to anybody who wants it, and the modeling method behind it is ordinary rather than secret.",
        "Software can be bought; a labeled history, an agreed definition and the habit of loading vans against it cannot.",
        "Nothing in the record closes this region, and a rival distributor has been selling here for a decade already.",
        "Fleet size is not what the forecast contributes, and a fleet can be leased in weeks while a labeled history cannot be bought at any speed."
      ]
    }
  ],
  "debrief": "Read as evidence, the quarter splits cleanly: a lost contract was rivalry, a buying group was buyer power, the agency rate was supplier power, and only the closed kitchens were a substitute. The forecast answers the first of those by moving the contest off price, and it lands on the spine of the chain. What it does not do is redraw the industry. The same distributors trade here next year, the wholesaler can still rent racking by the month, and the caterer keeps plating meals — with Fairmount holding a labeled history, an agreed definition and a dispatch habit that the package on its own does not carry."
};
