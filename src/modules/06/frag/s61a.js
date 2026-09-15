/* Chapter 6 lesson and activity data. Rebuild with node src/build.mjs --module=modules/06. */
PROSE.s61a = "\n<span class=\"eyebrow\">Objective 6.1 · Part 1</span><h2>Data as a strategic asset</h2>\n<p class=\"lede\">A customer pays for the last item shown online. The warehouse cannot find it. The payment succeeded, but the business failed to keep its promise. Chapter 6 starts with this dependency: reliable transactions require reliable data, and the same records can help managers improve the next decision.</p>\n<h3>A transaction leaves evidence</h3>\n<p>A transaction is a business event, such as a purchase, refund, payment, or inventory adjustment. It consumes existing data and creates new data. Checkout reads a product price and an available quantity, records the order, and changes what can be promised to the next customer. A customer-service interaction can also generate useful transaction records.</p>\n<p>A <b>data-driven organization</b> incorporates data into business processes and uses the resulting evidence to inform decisions. Collecting information is only the beginning. Somebody must know what a record means, whether it is current enough, and which action should follow from it. A dashboard nobody acts on creates little value.</p>\n<p>The chapter separates three levels of decisions. Keep the decision horizon in view:</p>\n<ul class=\"keys\"><li><b>Operational decisions</b> concern today's work, such as reserving available stock for an order or assigning a courier to a delivery.</li><li><b>Tactical decisions</b> allocate resources over a medium horizon, such as adjusting staffing across stores using several weeks of demand.</li><li><b>Strategic decisions</b> concern longer-term direction, such as entering a new market after studying demand, capabilities, and competitive conditions.</li></ul>\n<div class=\"activity\" data-activity=\"assetSort\"></div>\n<h3>Timely and accurate are separate tests</h3>\n<p>Accurate data correctly represents the event or entity. Timely data reaches a decision before the opportunity to act disappears. Yesterday's inventory can be perfectly accurate about yesterday and unsuitable for a promise made now. A live sensor can transmit quickly while reporting the wrong temperature because it is miscalibrated.</p>\n<p>The chapter identifies four operational benefits when both tests are met. These are outcomes to measure, rather than features to buy:</p>\n<ul class=\"keys\"><li><b>Reduce errors</b> by capturing a barcode once and validating the result, instead of asking several employees to retype the same product code.</li><li><b>Accelerate decisions</b> by delivering reliable stock or delivery status while a worker can still change the outcome.</li><li><b>Improve efficiency</b> by finding bottlenecks and scheduling labor, inventory, or equipment where actual demand requires it.</li><li><b>Improve customer satisfaction</b> by making credible promises and resolving problems with enough context to avoid repeated explanations.</li></ul>\n<p>These benefits can reinforce one another. Fewer inventory errors can mean fewer refunds, less support work, and more customers willing to return. They can also conflict: an extra verification step may slow checkout while preventing an expensive mistake. Evaluate the whole process and the cost of being wrong.</p>\n<div class=\"activity\" data-activity=\"assetCase\"></div>\n<h3>Connect the record to competitive performance</h3>\n<p>Consider the value chain before choosing a system. Receiving stock belongs to inbound logistics; getting an order to its customer belongs to outbound logistics. Sharing a reliable quantity connects those activities. Handling the cancellation belongs to service. A single data defect can therefore create work in several places.</p>\n<p>Porter's five forces describe competitive pressure. Existing sellers offering more reliable pickup are evidence about rivalry. Buyers comparing alternatives easily can strengthen buyer power. An inventory database may improve the retailer's response to those pressures, but installing one does not establish that the industry has become less competitive.</p>\n<p>Ask what a rival would need to copy the improvement. Widely available software alone may produce parity. Reliable historical records, well-designed processes, trained staff, and relationships that improve the data may be harder to reproduce together. The business capability matters more than the number of records stored.</p>\n<div class=\"activity\" data-activity=\"assetMatch\"></div>\n<h3>Use a baseline that can survive a comparison</h3><p>A baseline describes performance before a change. Record both the result and the amount of work behind it. Twenty corrections out of two hundred records means something different from twenty out of twenty thousand. Compare similar periods and explain changes in product mix, staffing, or demand that could influence the result.</p><p>A pilot should connect the data improvement to a specific action. Faster inventory updates help only if the ordering process uses them before promising stock. A manager can test that connection by tracing canceled orders and checking whether the available quantity had reached checkout when each promise was made.</p><p>Separate two useful checks during that review:</p><ul class=\"keys\"><li><b>Freshness check</b> compares the time of the stock event with the time its updated quantity reached the ordering process.</li><li><b>Outcome check</b> follows the resulting promise to fulfillment, cancellation, or correction so a technical improvement can be connected to customer experience.</li></ul><p class=\"takeaway\">Follow one event from capture to action. Identify the decision, the required freshness, the potential error, and a measurable business consequence before describing the data as an asset.</p>\n";

ACT.assetSort = {
  "kind": "sort",
  "label": "Classify",
  "title": "Which decision does the data support?",
  "objective": "6.1",
  "how": "Choose the best category for every item, then check your reasoning. You can revise and try again.",
  "buckets": [
    {
      "id": "op",
      "name": "Operational",
      "hint": "Run the current transaction or daily process."
    },
    {
      "id": "ta",
      "name": "Tactical",
      "hint": "Allocate resources and improve performance over the coming weeks or months."
    },
    {
      "id": "st",
      "name": "Strategic",
      "hint": "Choose the longer-term direction of the organization."
    }
  ],
  "items": [
    {
      "t": "Reserve two available units for a paid order.",
      "b": "op",
      "why": "The decision changes the current state of one transaction."
    },
    {
      "t": "Rebalance next month’s labor budget across three branches.",
      "b": "ta",
      "why": "A manager is allocating resources over a medium horizon."
    },
    {
      "t": "Evaluate whether to enter the equipment rental market.",
      "b": "st",
      "why": "Entering a market changes the firm’s longer-term direction."
    },
    {
      "t": "Issue a replacement after confirming a damaged shipment.",
      "b": "op",
      "why": "The record supports an immediate customer-service decision."
    },
    {
      "t": "Compare campaign results before setting next quarter’s mix.",
      "b": "ta",
      "why": "This changes the resource mix within an existing strategy."
    },
    {
      "t": "Choose whether a new service business fits the firm’s capabilities.",
      "b": "st",
      "why": "The question changes what business the organization will pursue."
    }
  ]
};

ACT.assetCase = {
  "kind": "case",
  "label": "Mini case",
  "title": "The last item was already gone",
  "objective": "6.1",
  "how": "Study the hypothetical case and its invented figures. Make every decision to unlock the debrief; read the explanation for each option.",
  "brief": "A hypothetical retailer shares products across its store and website. Store sales reach the website in an overnight file. Managers want more advertising because online orders are flat, but customer support reports cancellations after payment. You have one week of invented records to decide where to investigate first.",
  "facts": [
    {
      "k": "Refresh",
      "v": "Inventory synchronized nightly"
    },
    {
      "k": "Customer promise",
      "v": "Same-day pickup"
    },
    {
      "k": "Scope",
      "v": "One week; the same 1,000 online orders"
    }
  ],
  "exhibit": {
    "name": "Evidence to use",
    "caption": "Invented practice data for this case only.",
    "headers": [
      "Measure",
      "Count"
    ],
    "rows": [
      [
        "Online orders",
        "1,000"
      ],
      [
        "Unavailable after payment",
        "80"
      ],
      [
        "Repeat contacts about those cancellations",
        "120"
      ]
    ]
  },
  "questions": [
    {
      "q": "Which mismatch most directly explains the cancellations?",
      "opts": [
        "Advertising reaches too few potential customers.",
        "Stock data arrives too late for the promise.",
        "The product catalog needs more descriptive fields.",
        "The weekly report groups orders too broadly."
      ],
      "a": 1,
      "why": [
        "Advertising may increase demand, but it does not reconcile sold stock with availability.",
        "The overnight delay lets checkout promise units that store customers already purchased.",
        "Descriptions can aid selection, but the evidence identifies availability rather than product confusion.",
        "Report grouping may affect analysis, but it cannot itself explain stock sold earlier."
      ]
    },
    {
      "q": "Which first measure best evaluates a stock synchronization pilot?",
      "opts": [
        "Total visits to the retailer’s website.",
        "Number of product fields stored per item.",
        "Share of paid orders canceled for no stock.",
        "Number of staff opening the weekly report."
      ],
      "a": 2,
      "why": [
        "Visits measure traffic and can rise while fulfillment errors continue at the same rate.",
        "More fields do not establish that available quantities reach checkout at the right time.",
        "This outcome measures the specific failure, using paid orders as the denominator.",
        "Report use measures adoption, whereas the pilot must improve the customer promise."
      ]
    }
  ],
  "debrief": "The stock-out cancellation rate is 80 divided by 1,000, or 8%. A synchronization pilot should test whether that failure falls while checking checkout reliability and operating cost. The numbers identify a candidate mechanism; they do not prove that a particular vendor will fix it."
};

ACT.assetMatch = {
  "kind": "match",
  "label": "Match",
  "title": "Turn a benefit into a measure",
  "objective": "6.1",
  "how": "Match each idea to its example, then check. Read why each pairing fits.",
  "pairs": [
    {
      "l": "Reduced entry errors",
      "r": "Corrections per 1,000 captured records",
      "why": "Use a consistent denominator so a quieter week cannot masquerade as improvement."
    },
    {
      "l": "Faster decisions",
      "r": "Minutes from a stock event to an updated promise",
      "why": "Measure the delay at the decision point, not just server processing speed."
    },
    {
      "l": "Operational efficiency",
      "r": "Staff minutes per fulfilled order",
      "why": "Relate resources consumed to completed work rather than total system use."
    },
    {
      "l": "Customer satisfaction",
      "r": "Share of resolved cases followed by a positive rating",
      "why": "An outcome from the customer is more informative than a count of dashboards."
    }
  ]
};

