/* Chapter 8 lesson and activity data. Rebuild with node src/build.mjs --module=modules/08. */
PROSE.s84b = "\n<span class=\"eyebrow\">Objective 8.4 · Part 2</span><h2>Planning, execution, visibility, and the ledger question</h2>\n<p class=\"lede\">A supply chain management system does not run on good intentions. It runs on plans somebody wrote down, on flows somebody keeps moving, on numbers somebody can see, and on data somebody actually captured. This section takes those four in order, and it ends with the technology that gets promised the most and, on its own, delivers the least.</p>\n<h3>Plans first, then motion</h3>\n<p><b>Supply chain planning</b> is the development of resource plans that support producing goods and services efficiently and effectively. It happens before anything moves. Each planning process ends in a named plan the rest of the chain works from, and those plans are interconnected: change the demand forecast and the sourcing plan changes with it.</p>\n<p>Planning modules generally support four processes, and each one produces a document you can point to:</p>\n<ul class=\"keys\"><li><b>Demand planning and forecasting</b> examines historical data, promotions, and point-of-sale figures to produce the overall demand forecast.</li><li><b>Distribution planning</b> works out how finished goods reach distributors and customers, including warehousing, invoicing, and collection, and produces the transportation plan.</li><li><b>Production scheduling</b> coordinates materials, equipment, labor, testing, and packaging into a workable sequence, and produces the production plan.</li><li><b>Inventory and safety stock planning</b> balances holding costs against the service level you promised, and produces the sourcing plan with its supplier terms.</li></ul>\n<p>The forecast horizon follows the stability of the data. When historical demand is steady, plans can cover a longer period. When demand jumps around, the window has to narrow, because a long plan built on unstable history is a confident guess. Planning also never finishes. As new data arrives, the plans are updated.</p>\n<p>Two well-known arrangements live or die on how good that shared signal is. <b>Just-in-time</b> ordering sizes each order so parts arrive exactly when production needs them, which keeps almost nothing in storage but leaves no cushion when a delivery slips. Under <b>vendor-managed inventory</b> the supplier watches your stock levels and sales data and refills your shelf itself, against service levels the two of you negotiated in advance. Both hand a partner more of your data, and both stop working the moment that data goes stale.</p>\n<h3>Execution moves three flows</h3>\n<p><b>Supply chain execution</b> puts the planning into motion. It is the collaboration of suppliers, producers, distributors, and customers, and it manages three flows at once. Watch the direction of each one, because direction is where the distinction usually gets lost.</p>\n<p>Each flow carries something different along the same chain:</p>\n<ul class=\"keys\"><li><b>Product flow</b> moves goods from supplier to production, on to distribution, and finally to the person who consumes them.</li><li><b>Information flow</b> moves orders, fulfillment records, billing, and delivery status, and it travels up or down the chain as needed.</li><li><b>Financial flow</b> moves payments and the terms attached to them, including payment schedules and ownership of goods held on consignment.</li></ul>\n<p>Product flow is the one that surprises people. Goods mostly travel one way, but an effective system also supports <b>reverse logistics</b>, the processes for receiving products back from the point of consumption. Returns, refunds, replacements, recycling, and the proper disposal of hazardous material all run backwards along the same chain. A high-volume online retailer such as Amazon has to handle that flow cheaply, or returns eat the margin on the original sale.</p>\n<p>Information flow has one goal worth naming: removing paper. When orders, fulfillment, billing, and consolidation are shared electronically, the saving is not just paperwork but time and money. Because the data sits in a central database, every partner reads the same current numbers.</p>\n<p>Partners reach that data through named front doors, and the naming is what students reverse. A portal is named for who walks through it, not for who owns it:</p>\n<ul class=\"keys\"><li><b>Supplier portals</b> are owned by the buying company and automate what it does with its many suppliers, from registering interest through ordering and payment.</li><li><b>Customer portals</b> are owned by the selling company and let its business customers review products, enter orders, and get service on what they already bought.</li><li><b>Business-to-business marketplaces</b> are run by a third party instead, bringing many buyers and many sellers together rather than serving one firm.</li></ul>\n<div class=\"activity\" data-activity=\"scmSort\"></div>\n<h3>Efficiency against effectiveness</h3>\n<p><b>Supply chain effectiveness</b> is the extent to which your supply activities meet the requirements of the external partners involved. <b>Supply chain efficiency</b> is the extent to which you optimize the use of resources in those activities. Chasing one alone produces either excessive cost or unmet needs, so the design is a set of trade-offs in procurement, production, and transportation.</p>\n<p>The trade-off shows up as concrete choices, and your competitive strategy decides which side you lean toward:</p>\n<ul class=\"split\"><li><b>Leaning effective</b> means more inventory, multiple sources, general-purpose plants with spare capacity, more warehouses, and faster delivery.</li><li><b>Leaning efficient</b> means a single source, less inventory, special-purpose plants with little slack, fewer warehouses, and longer delivery times.</li></ul>\n<p>A low-cost provider leans efficient. A firm competing on superior customer service leans effective. The system lets you price the trade one component at a time. If a hurricane threatens a shipment, you can simulate the delay, then decide whether air freight, a temporary second supplier, or a substitute part costs less than the contract penalty for missing the promised date.</p>\n<div class=\"activity\" data-activity=\"scmMatch\"></div>\n<h3>Sustainability inside the same decisions</h3>\n<p>Green supply chain management applies the same areas you already know: green planning, green procurement, green distribution, and green logistics. Products can be engineered at the planning stage to use recycled material or to be recyclable at the end of their life. Better demand and supply planning cuts excess production.</p>\n<p>Procurement can favor sustainable sources or give suppliers an incentive to change. Shipping can use cardboard rather than Styrofoam, reuse packaging, run alternative-fuel vehicles, or group shipments so fewer trips are needed. Nike is the chapter's example, aiming to double its business while halving its impact by sourcing reclaimed materials and using digital knitting and 3D printing to cut waste.</p>\n<p>The structural point matters more than the examples. A green choice is usually an inventory, sourcing, or routing choice. It lands in the same modules and gets measured with the same indicators as every other supply decision.</p>\n<h3>Seeing the chain, then scoring it</h3>\n<p><b>Supply chain visibility</b> is the ability to track products as they move and to foresee external events. Knowing where a shipment sits lets you expedite it and keep a sale. Knowing where a supplier's factory sits lets you ask whether an approaching typhoon will reach it. Some firms even track when key suppliers' labor contracts expire. Sharing at that level takes real trust between partners.</p>\n<p>Sensors make visibility affordable. Telematics units report truck position, temperature and humidity sensors confirm that sensitive goods stayed in range, and a tamper alert can fire on its own. <b>Supply chain analytics</b> then uses key performance indicators to monitor sourcing, planning, production, and distribution, so a purchasing manager can name the supplier who keeps missing promised dates and spread the next order across two.</p>\n<h3>The ledger question</h3>\n<p>A <b>blockchain</b> is a distributed ledger on which transactions are recorded as linked blocks across many computers, which makes an existing record hard to alter after it is written. Two supply chain applications get the most attention: smart contracts, which execute a transfer automatically once a condition is met, and tracing a product back to its source, such as diamonds from mine to store or produce from farm to shelf.</p>\n<p>The chapter then spends a long paragraph on what the ledger does not fix:</p>\n<ul class=\"keys\"><li><b>Trust moves rather than disappears</b>, because instead of trusting people you now trust software that is harder to read than a person.</li><li><b>Hand-keyed entries stay as good as the person keying them</b>, so a grower using a forbidden pesticide can still file an honest-looking record.</li><li><b>Automatic capture moves the trust again</b>, because you are then relying on the sensor manufacturer and the software vendor, and virtually no software is free of bugs.</li><li><b>Irreversibility cuts both ways</b>, since an executed transaction cannot be undone and there is no middleman left to appeal to.</li><li><b>Smart contracts still need auditing</b>, and reviewing code is considerably harder than reviewing a policy written in plain English.</li></ul>\n<p class=\"takeaway\">Say this one out loud before the case: a ledger cannot supply a field nobody captured. If the farm identifier was never recorded at the collection point, writing that same gap to a tamper-resistant chain makes the gap permanent, not visible. Garbage in, garbage out survives every new technology.</p>\n<div class=\"activity\" data-activity=\"scmCase\"></div>\n";

ACT.scmSort = {
  "kind": "sort",
  "label": "Classify",
  "title": "Which flow is moving, and which way",
  "objective": "8.4",
  "how": "Choose the best category for every item, then check your reasoning. You can revise and try again.",
  "buckets": [
    {
      "id": "prod",
      "name": "Product flow",
      "hint": "Physical goods moving between supplier, production, distribution, and the consumer."
    },
    {
      "id": "info",
      "name": "Information flow",
      "hint": "Orders, fulfillment, billing, and status, travelling up or down the chain."
    },
    {
      "id": "fin",
      "name": "Financial flow",
      "hint": "Payments and the terms attached to them, including schedules and ownership."
    }
  ],
  "items": [
    {
      "t": "A truck of raw steel leaves the supplier's yard for the assembly plant",
      "b": "prod",
      "why": "Goods moving from supplier to production is the forward direction of product flow."
    },
    {
      "t": "A pallet of defective units is collected from a store and shipped back",
      "b": "prod",
      "why": "Receiving product back from the point of consumption is reverse logistics, and it is still product flow."
    },
    {
      "t": "Worn units are recovered after their service life so the metal can be recycled",
      "b": "prod",
      "why": "Recovering material to recapture value runs backwards along the chain and remains a movement of goods."
    },
    {
      "t": "A replacement unit is shipped to a customer who received a damaged one",
      "b": "prod",
      "why": "Shipping replacements is part of handling returns, which supply chain execution has to support."
    },
    {
      "t": "A purchase order is transmitted into the supplier's system with no paper involved",
      "b": "info",
      "why": "Order processing shared electronically is exactly the paperless information flow the chapter describes."
    },
    {
      "t": "A carrier posts a delivery status update that the buyer can read",
      "b": "info",
      "why": "Delivery status updates are named as information flow, and this one travels back toward the buyer."
    },
    {
      "t": "A humidity reading from a sensor inside a trailer reaches the warehouse",
      "b": "info",
      "why": "Sensor data about the condition of a shipment is information moving along the chain, not goods."
    },
    {
      "t": "Next quarter's demand forecast is shared with a component supplier",
      "b": "info",
      "why": "Supply network collaboration works by moving forecast data between partners so each can plan."
    },
    {
      "t": "The distributor pays the producer for a shipment that was delivered last month",
      "b": "fin",
      "why": "Payments travel upstream from consumption toward the supplier, which is the financial flow."
    },
    {
      "t": "A payment posts automatically into a supplier's account through the banking link",
      "b": "fin",
      "why": "Linkages to electronic banking let payments flow automatically into the accounts of members along the chain."
    },
    {
      "t": "The terms covering goods held on consignment are recorded for both partners",
      "b": "fin",
      "why": "Consignment and ownership information is listed in the chapter as part of the financial flow."
    }
  ]
};

ACT.scmMatch = {
  "kind": "match",
  "label": "Match",
  "title": "Who owns this problem?",
  "objective": "8.4",
  "how": "Match each complaint to the process that owns it, then check. Read why each pairing fits.",
  "pairs": [
    {
      "l": "Nobody can say how many units the stores will want in March",
      "r": "Planning · demand planning and forecasting",
      "why": "Forecasting anticipated demand from historical data, promotions, and point-of-sale figures is the first planning process."
    },
    {
      "l": "Stockouts keep happening on the one part with a long lead time",
      "r": "Planning · inventory and safety stock planning",
      "why": "Setting safety stock balances holding cost against the promised service level, and it ends in the sourcing plan."
    },
    {
      "l": "No one has decided which warehouse serves which region",
      "r": "Planning · distribution planning",
      "why": "Deciding how products reach distributors and customers, with warehousing and delivery, is distribution planning."
    },
    {
      "l": "Customers who mail an item back wait five weeks for a refund",
      "r": "Execution · reverse logistics within product flow",
      "why": "Receiving goods back from the point of consumption and crediting accounts is execution, not a forecasting failure."
    },
    {
      "l": "The buyer cannot tell where a container is sitting right now",
      "r": "Visibility · tracking shipments as they move",
      "why": "Visibility is the ability to track products in transit and to foresee external events that threaten them."
    },
    {
      "l": "Two suppliers keep missing promised dates and nobody spotted the pattern",
      "r": "Analytics · key performance indicators by supplier",
      "why": "Analytics monitors sourcing, planning, production, and distribution so a manager can act on a pattern."
    }
  ]
};

ACT.scmCase = {
  "kind": "case",
  "label": "Mini case",
  "title": "The jar that cannot name its farm",
  "objective": "8.4",
  "how": "Study the hypothetical case and its invented figures. Make every decision to unlock the debrief; read the explanation for each option.",
  "brief": "Verdano Spice Works is a hypothetical importer that sells ground turmeric labelled single-origin. A retailer now wants the farm behind any jar identified within 24 hours. Today that trace takes 48 working hours and stalls at the collection point, where a co-op clerk writes down only the number of bags received.",
  "facts": [
    {
      "k": "Trace time today",
      "v": "48 working hours"
    },
    {
      "k": "Retailer requirement",
      "v": "24 hours"
    },
    {
      "k": "Slowest step",
      "v": "Farm collection point"
    },
    {
      "k": "Recorded there",
      "v": "Bag count, no farm identifier"
    },
    {
      "k": "Proposal on the table",
      "v": "Put all four steps on a shared ledger"
    }
  ],
  "exhibit": {
    "name": "Where a lot can be traced",
    "caption": "Invented practice figures for this case only.",
    "headers": [
      "Step",
      "Identifier recorded",
      "How it is captured",
      "Hours to look up"
    ],
    "rows": [
      [
        "Farm collection point",
        "Bag count only",
        "Handwritten by a co-op clerk",
        "36"
      ],
      [
        "Mill",
        "Lot number",
        "Keyed by the mill operator",
        "8"
      ],
      [
        "Port warehouse",
        "Container number",
        "Barcode scan",
        "2"
      ],
      [
        "Retail distribution center",
        "Case number",
        "Barcode scan",
        "2"
      ]
    ]
  },
  "questions": [
    {
      "q": "Verdano puts all four steps on a shared ledger exactly as they are recorded today. What does that do for the single-origin claim?",
      "opts": [
        "It settles the claim, because ledger entries are resilient against tampering once written.",
        "It proves the claim, because the mill's lot number identifies the farm behind each bag.",
        "It leaves the claim unproven, because no step records which farm a bag came from.",
        "It weakens the claim, because a distributed ledger holds transactions rather than text fields such as a farm name."
      ],
      "a": 2,
      "why": [
        "A tamper-resistant record of incomplete facts is still incomplete; resilience is not the same as completeness.",
        "A lot number names the batch the mill ground, and nothing in the record ties that batch to one farm.",
        "Correct. The field was never captured anywhere, so no ledger can supply it. Garbage in, garbage out.",
        "Ledgers can carry such fields perfectly well; the gap here is that nobody writes a farm name down."
      ]
    },
    {
      "q": "Verdano can fund one change this quarter. Which one moves the 48-hour trace toward the 24-hour requirement?",
      "opts": [
        "Issue each farm a code and have the collection point scan it onto every bag.",
        "Re-scan the container at the port a second time on the day it arrives.",
        "Ask the mill operator to key the lot number into a second spreadsheet too.",
        "Add a search tool at the retail distribution center so its case lookup takes one hour."
      ],
      "a": 0,
      "why": [
        "Correct. The 36 of the 48 hours sit in the handwritten step, and a scanned code fixes speed and the missing field together.",
        "The port step already resolves in 2 hours, so a second scan there barely moves a 48-hour trace.",
        "A duplicate of a lot number the mill already keys adds clerical work and leaves the 36 hours untouched.",
        "That would leave 36 plus 8 plus 2 plus 1, which is 47 of the 48 hours still sitting in the trace."
      ]
    },
    {
      "q": "Six weeks after go-live, a clerk writes the wrong lot weight to the shared ledger. What is Verdano's position?",
      "opts": [
        "The network reverses the incorrect block automatically once another partner disputes it.",
        "The partner who wrote the entry may edit it if the correction is prompt.",
        "A middleman appointed by the ledger settles the dispute and restores the earlier value.",
        "The wrong entry stands on the chain, and Verdano has no middleman to appeal to."
      ],
      "a": 3,
      "why": [
        "Once a transaction is executed there is no built-in reversal, whatever the other partners think of it.",
        "Irreversibility is the design goal; an entry editable after the fact would not be resilient against tampering.",
        "Eliminating the trusted middleman is the selling point, so no appointed party exists to restore a value.",
        "Correct. Irreversibility is the named drawback: once a transaction is executed there is no way to reverse it."
      ]
    }
  ],
  "debrief": "Two of Verdano's three problems are data-capture problems and the third is a governance problem. A ledger makes an existing record hard to alter after it is written, but it cannot invent a farm identifier nobody wrote down, and it cannot take an entry back once it is in. Fix the capture at the collection point first, then decide whether an irreversible record is what the business actually wants."
};
