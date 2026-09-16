/* Chapter 8 lesson and activity data. Rebuild with node src/build.mjs --module=modules/08. */
PROSE.s84a = "\n<span class=\"eyebrow\">Objective 8.4 · Part 1</span><h2>Supply networks, B2B, and the bullwhip effect</h2>\n<p class=\"lede\">A shopper buys one extra package of paper towels. Six weeks later a chemical plant four steps away schedules an unplanned weekend shift. Nobody along that route behaved foolishly. This section explains how a small change at the customer end turns into a large change at the raw-material end, and what firms exchange to keep it small.</p>\n<h3>Where the network fans out</h3>\n<p>Earlier in this chapter the supply chain stopped at a single loading dock, where a seller and a buyer recorded one shipment under two process names, order-to-cash and procure-to-pay. That join is the unit of everything below. This objective is about what a few hundred of those joins build when you look at them together.</p>\n<p>The further out you look, the more firms are involved. A producer buys subassemblies from its Tier 1 suppliers, who buy components from Tier 2, who buy raw materials from Tier 3. The sourcing diagram for one product can start with five firms at the outer edge feeding four, feeding three, feeding a single plant.</p>\n<p>Depth is the easy part. What makes the structure behave unlike a line is the shape of the links between one tier and the next:</p>\n<ul class=\"keys\"><li><b>Each supplier feeds several customers</b>, so one small producer’s output ends up inside more than one component and more than one finished product.</li><li><b>Each firm buys from several suppliers</b>, which is why a purchasing manager works a list of vendors rather than following a single line backwards.</li><li><b>The downstream side fans out as well</b>, because finished products go to many distributors, retailers, and end customers rather than to one waiting buyer.</li><li><b>Nobody sees much past their own tier</b>, because a firm deals with the suppliers it contracts with and rarely knows who supplies them.</li></ul>\n<div class=\"activity\" data-activity=\"netwDiagram\"></div>\n<p>Those links are many-to-many rather than one-to-one, so the interrelated parties moving these materials are described more accurately as a <b>supply network</b> than as a chain. The distinction is practical rather than cosmetic.</p>\n<p>In a line, one supplier’s fire stops one product. In a network it can stop several at once, and a producer often does not learn that two of its product families share a Tier 3 firm until the shipment fails to arrive.</p>\n<h3>Exchanging the data</h3>\n<p>Transactions conducted electronically between businesses in a supply network, with no end consumer involved, are <b>business-to-business electronic commerce</b>. They carry proprietary information. An order for a particular component can hint at what a firm is about to build, so the channel has to be private as well as quick.</p>\n<p>Three mechanisms do most of that work:</p>\n<ul class=\"keys\"><li><b>Electronic data interchange (EDI)</b> is computer-to-computer communication with no human intervention, following standards set by recognized standards bodies.</li><li><b>XML</b> uses tags to label the data inside a document, so the receiving application reads a number as an item number rather than a quantity.</li><li><b>Portals</b> are access points through which a screened business partner reaches secured information held inside another firm, usually across an extranet.</li></ul>\n<p>EDI once ran over dedicated telecommunication networks that only large corporations could afford. The internet made the same exchange economical, so small and mid-sized firms can now take part. That lowered the cost of the line.</p>\n<p>The larger saving is elsewhere. When both applications agree on what each field means, a purchase order can enter the seller’s system without a person reading it and typing it again. Nobody rekeys, so nobody mistypes, and the order is ready the minute it arrives.</p>\n<div class=\"activity\" data-activity=\"netwSim\"></div>\n<h3>The bullwhip effect</h3>\n<p>Every firm that forecasts demand adds a safety buffer so it does not run out of stock. That is sensible in isolation. The problem is that forecast errors and safety stocks multiply as they move up the network, so a small fluctuation in demand for a finished product becomes a large fluctuation in demand for the parts and raw materials farther upstream.</p>\n<p>The image is a bullwhip. A tiny flick of the wrist at the handle produces a large movement at the far end. That is the <b>bullwhip effect</b>, and its cause deserves to be stated precisely.</p>\n<p class=\"takeaway\">The amplification is caused by information, not by anyone behaving irrationally. Each tier reacts to its own order book, because that is the only demand it can see. No tier upstream is looking at what customers actually bought.</p>\n<p>Two remedies follow directly from that diagnosis:</p>\n<ul class=\"keys\"><li><b>Integrated business processes</b> let a firm coordinate the whole network so each tier plans against consumption instead of against orders.</li><li><b>Simulation</b> with machine learning algorithms lets a firm model the effect of a demand change before committing production capacity.</li></ul>\n<div class=\"activity\" data-activity=\"netwCase\"></div>\n<p>Read the exhibit in that case before you read the questions, and add up each column. When every column reaches the same four-week total, the argument is not about how much anybody bought. It is about when.</p>\n<p class=\"takeaway\">Firms invest in supply network relationships and B2B exchange because a shared, timely demand signal is cheaper than the inventory each tier would otherwise hold to protect itself from the tier below.</p>\n";

ACT.netwDiagram = {
  "kind": "diagram",
  "label": "Interactive diagram",
  "title": "Trace the network, not the line",
  "objective": "8.4",
  "how": "Select each tab to trace a different view of the same firms. Read the boxes, then the notes beneath them.",
  "models": [
    {
      "id": "0",
      "name": "Tiers of suppliers",
      "site": "Each tier further out holds more firms than the one ahead of it.",
      "boxes": [
        {
          "t": "Tier 3",
          "w": "Raw materials from many small producers",
          "c": "a"
        },
        {
          "t": "Tier 2",
          "w": "Components built from those materials",
          "c": "b"
        },
        {
          "t": "Tier 1",
          "w": "Subassemblies sold to the producer",
          "c": "c"
        },
        {
          "t": "Producer",
          "w": "The firm that faces the end customer",
          "c": "d"
        }
      ],
      "points": [
        "Five Tier 3 firms can feed four Tier 2 firms, which feed three Tier 1 firms, which feed one producer. Those are many-to-many links, not one firm per tier in a straight line.",
        "Because the links fan out at every level, “chain” understates the structure; supply network describes the same firms more accurately."
      ]
    },
    {
      "id": "1",
      "name": "Goods down, orders up",
      "site": "Two flows run in opposite directions through the same firms.",
      "boxes": [
        {
          "t": "Goods",
          "w": "Move downstream toward the end customer",
          "c": "a"
        },
        {
          "t": "Orders",
          "w": "Move upstream toward raw materials",
          "c": "b"
        },
        {
          "t": "Returns",
          "w": "Move back upstream as reverse logistics",
          "c": "c"
        },
        {
          "t": "Status",
          "w": "Delivery updates travel in both directions",
          "c": "d"
        }
      ],
      "points": [
        "A shopper buying one unit sends no goods anywhere. It sends an order signal that every tier upstream then has to interpret for itself.",
        "Upstream names the supplier side and downstream names the customer side, so the same firm is downstream of its suppliers and upstream of its own buyers."
      ]
    },
    {
      "id": "2",
      "name": "Where two firms overlap",
      "site": "One firm’s sale is the next firm’s purchase.",
      "boxes": [
        {
          "t": "Seller",
          "w": "Runs order-to-cash and ships the goods",
          "c": "a"
        },
        {
          "t": "Document",
          "w": "One order, two sets of records",
          "c": "b"
        },
        {
          "t": "Buyer",
          "w": "Runs procure-to-pay and receives the goods",
          "c": "c"
        },
        {
          "t": "Match",
          "w": "Invoice, receipt and payment must agree",
          "c": "d"
        }
      ],
      "points": [
        "The seller’s order-to-cash process and the buyer’s procure-to-pay process describe the same events from opposite sides of one invoice.",
        "When the two firms exchange the same structured document, neither side retypes what the other already recorded, so neither side mistypes it."
      ]
    }
  ]
};

ACT.netwSim = {
  "kind": "sim",
  "label": "Decision walkthrough",
  "title": "Run one tier through a demand blip",
  "objective": "8.4",
  "how": "Choose an action at each stage of this hypothetical quarter. Read every outcome, including the ones you did not choose.",
  "intro": "You run a hypothetical distributor in the middle of a supply network. A retail chain orders from you and a plant supplies you. In a normal week the retailer orders 400 units, you order 400 units from the plant, and you hold 200 units of safety stock.",
  "steps": [
    {
      "situation": "Week 1. The retailer’s order arrives at 560 units instead of the usual 400. Your own order to the plant is due today.",
      "opts": [
        {
          "t": "Order 720 units so you cover the rise and refill your own shelf.",
          "ok": false,
          "out": "A 40 percent jump in the order you received becomes an 80 percent jump one tier up, on a change nobody has explained yet."
        },
        {
          "t": "Ask the retailer how many units it sold last week before you order.",
          "ok": true,
          "out": "It sold 432 units and put 128 on its own shelves. The order rose 40 percent; real demand rose 8 percent."
        },
        {
          "t": "Order 560 units to match exactly what the retailer has asked you for.",
          "ok": false,
          "out": "You pass the retailer’s own stocking decision straight up the network as though it were customer demand."
        },
        {
          "t": "Order 400 units and ship the extra 160 out of your safety stock.",
          "ok": false,
          "out": "Safety stock falls from 200 units to 40, and you still cannot say what next week will look like."
        }
      ]
    },
    {
      "situation": "You now know shoppers bought 432 units. Your safety stock is back at 200 and the plant needs eight days of notice. What do you send the plant?",
      "opts": [
        {
          "t": "Order 432 units and leave the plant to work out the reason itself.",
          "ok": false,
          "out": "The plant sees an unexplained 8 percent rise, adds a buffer of its own, and the amplification carries on upstream."
        },
        {
          "t": "Order 560 units, because the retailer may repeat last week’s larger order.",
          "ok": false,
          "out": "You would build 128 units nobody has bought, against a possibility the sales figure already gives you grounds to reject."
        },
        {
          "t": "Order 400 units, because one busy week is not a change in demand.",
          "ok": false,
          "out": "Sales are running 32 units a week above 400, so your safety stock drains by 32 units every week."
        },
        {
          "t": "Order 432 units and tell the plant that 128 of the jump was shelf stock.",
          "ok": true,
          "out": "Your order tracks consumption, and the tier above you receives the same explanation that you were given."
        }
      ]
    },
    {
      "situation": "Sales settle at about 440 units a week and your forecasts are now accurate to within 2 percent. Finance asks why you still hold 200 units of safety stock.",
      "opts": [
        {
          "t": "Keep the 200 units: forecasts do not predict a closed loading dock.",
          "ok": true,
          "out": "A buffer absorbs forecast error and supply failure alike. Three weeks later a storm shuts the plant’s dock for three days, about 189 units at 63 a day, and the buffer covers it."
        },
        {
          "t": "Cut the buffer to zero, since an accurate signal removes the need to guess.",
          "ok": false,
          "out": "The signal tells you what shoppers bought last week. It cannot tell you when a truck fails to arrive."
        },
        {
          "t": "Cut the buffer to zero and ask the plant to hold the same stock for you.",
          "ok": false,
          "out": "The units still exist, but they now sit eight days away from the customer who is waiting for them."
        },
        {
          "t": "Raise the buffer to 900 units so that the question does not come back.",
          "ok": false,
          "out": "Two weeks of cover ties up capital, and rebuilding it makes your own orders lumpy for the plant to read."
        }
      ]
    },
    {
      "situation": "Week 12. The retailer plans a two-week promotion and expects to sell 700 units a week while it runs.",
      "opts": [
        {
          "t": "Wait for the larger orders to arrive and react to them as they come.",
          "ok": false,
          "out": "You would learn about the promotion during its first week, and the plant would learn during its second."
        },
        {
          "t": "Raise the standing buffer to cover any promotion the retailer might run.",
          "ok": false,
          "out": "A permanent buffer for an occasional event costs storage in every week of the year, promotion or not."
        },
        {
          "t": "Get the dates and volume now, and build 520 units before it starts.",
          "ok": true,
          "out": "The gap is 260 units a week for two weeks. Planned in advance it is production; discovered late it is a shortage."
        },
        {
          "t": "Ask the retailer to spread the promotion across its normal weekly orders.",
          "ok": false,
          "out": "Spreading a real 520-unit requirement over ordinary weeks guarantees empty shelves while the promotion is running."
        }
      ]
    }
  ]
};

ACT.netwCase = {
  "kind": "case",
  "label": "Mini case",
  "title": "One hundred extra units",
  "objective": "8.4",
  "how": "Study the hypothetical chain and its invented figures. Make every decision to unlock the debrief, and read the explanation for each option.",
  "brief": "A hypothetical four-tier chain moves one household product: shoppers buy from a store, the store orders from a distributor, the distributor orders from a plant, and the plant orders resin from a supplier. In a settled week every tier moves 1,000 units. In week 2 shoppers buy 100 units more than usual, and each tier then orders against its own order book rather than against what shoppers bought.",
  "facts": [
    {
      "k": "Tiers",
      "v": "Shoppers, store, distributor, plant"
    },
    {
      "k": "Settled week",
      "v": "1,000 units at every tier"
    },
    {
      "k": "The event",
      "v": "Shoppers bought 100 extra units in week 2"
    },
    {
      "k": "Plant line",
      "v": "Runs 1,400 units a week before overtime"
    }
  ],
  "exhibit": {
    "name": "Weekly units, by tier",
    "caption": "Invented practice figures for this case only. Every column covers the same four weeks.",
    "headers": [
      "Week",
      "Units bought by shoppers",
      "Store orders",
      "Distributor orders",
      "Plant orders"
    ],
    "rows": [
      [
        "1",
        "1,000",
        "1,000",
        "1,000",
        "1,000"
      ],
      [
        "2",
        "1,100",
        "1,300",
        "1,600",
        "2,000"
      ],
      [
        "3",
        "1,000",
        "800",
        "500",
        "200"
      ],
      [
        "4",
        "1,000",
        "1,000",
        "1,000",
        "900"
      ]
    ]
  },
  "questions": [
    {
      "q": "In week 2, how large was the change in the plant’s order compared with the change in what shoppers bought?",
      "opts": [
        "About twice as large: the plant ordered 200 extra units that week.",
        "Exactly the same as the shoppers: the plant ordered 100 extra units that week.",
        "Ten times as large: the plant ordered 1,000 extra units that week.",
        "Half as large: the plant ordered 50 extra units that week."
      ],
      "a": 2,
      "why": [
        "Doubling would be an order of 1,200 units, and the exhibit records 2,000 units in week 2.",
        "Matching the shoppers would be an order of 1,100 units, which is what a shared signal would have produced.",
        "Shoppers bought 100 more than the settled 1,000, while the plant ordered 1,000 more than its settled 1,000.",
        "A smaller swing upstream than downstream would be the bullwhip running backwards, and no tier cut its order in week 2."
      ]
    },
    {
      "q": "Add up all four weeks in each column of the exhibit. What do the totals show?",
      "opts": [
        "The plant ordered roughly 900 units more than shoppers bought in total.",
        "Every tier ordered 4,100 units in total, so only the timing differed.",
        "The store absorbed the swing and ordered fewer units than shoppers bought.",
        "The four columns differ by a few hundred units once the weeks are added."
      ],
      "a": 1,
      "why": [
        "The plant totals 1,000 plus 2,000 plus 200 plus 900, which is 4,100 units, the same as the shoppers.",
        "Shoppers, store, distributor and plant each total 4,100 units, so the four-week quantity never changed.",
        "The store totals 1,000 plus 1,300 plus 800 plus 1,000, which matches the 4,100 units shoppers bought.",
        "Adding the distributor column gives 1,000 plus 1,600 plus 500 plus 1,000, which is 4,100, like the rest."
      ]
    },
    {
      "q": "The plant runs 1,400 units a week before overtime. Which change addresses the cause of its swing rather than a symptom?",
      "opts": [
        "Add a second shift so a 2,000-unit week can be produced on time.",
        "Hold 2,000 finished units at the plant as a standing cushion.",
        "Ask the distributor to give the plant three days more notice of each order.",
        "Give the plant weekly access to the store’s units-sold figures."
      ],
      "a": 3,
      "why": [
        "Capacity for the peak leaves the line idle in week 3, when the order falls to 200 units.",
        "A cushion that size costs storage every week and still leaves the plant reacting to distorted orders.",
        "More notice makes a 2,000-unit order easier to schedule, but the number itself is still built from the tier below.",
        "The plant would see the 100-unit change instead of the 1,000-unit change, which is where the distortion starts."
      ]
    }
  ],
  "debrief": "The four-week totals are identical at 4,100 units, so nobody over-bought. What moved was timing, and it moved because each tier could see only the orders placed by the tier below it. Capacity and cushions absorb the swing at cost; sharing the shopper figure removes the reason for it."
};
