/* Chapter 6 lesson and activity data. Rebuild with node src/build.mjs --module=modules/06. */
PROSE.s62d = "\n<span class=\"eyebrow\">Objective 6.2 · Part 4</span><h2>From transactions to data warehouses</h2>\n<p class=\"lede\">Checkout needs to reserve one customer's items now. A regional manager needs to compare sales, returns, and promotions over two years. Both use business data, but they place different demands on its organization, freshness, and processing.</p>\n<h3>Run the business and study the business</h3>\n<p><b>Operational systems</b> support the current state of business activity. <b>Online transaction processing (OLTP)</b> handles many concurrent transactions, often involving small, defined reads and updates. Processing an order, issuing a receipt, or updating a delivery address are examples. Fast responses and reliable changes matter to the person waiting.</p>\n<p><b>Informational systems</b> support analysis and decision making using historical or point-in-time data. A manager may compare branches, investigate customer groups, or evaluate a promotion. <b>Online analytical processing (OLAP)</b> supports examining summarized data from different perspectives. The question often spans many records rather than changing one current transaction.</p>\n<p>The chapter contrasts their design priorities. Use the workload, rather than the job title of the person asking, to classify the need:</p>\n<ul class=\"keys\"><li><b>Operational work</b> reads and changes current records through narrow requests, such as confirming that the last available item can be reserved.</li><li><b>Informational work</b> integrates and compares records across time or business areas, such as finding which promotions produced profitable repeat purchases.</li><li><b>Freshness requirements</b> depend on the decision; yesterday's data may support trend analysis while being too old to stop an active fraudulent payment.</li><li><b>Resource contention</b> can arise when broad analysis shares resources with checkout; separating workloads is one way to protect responsiveness.</li></ul>\n<div class=\"activity\" data-activity=\"wareSort\"></div>\n<h3>Build an integrated analytical history</h3>\n<p>A <b>data warehouse</b> integrates data from multiple operational systems and other sources for analysis and reporting. It can combine orders, returns, inventory, and external context in a consistent historical repository. Its value comes from reliable integration and access, not simply from being a large database.</p>\n<p><b>Extraction, transformation, and loading (ETL)</b> is a common process for preparing warehouse data. Extraction retrieves source records. Transformation cleans and reshapes them according to shared meanings. Loading puts the prepared results into the destination. The process needs checks that make missing, repeated, and rejected records visible.</p>\n<p><b>Data cleansing</b> detects and corrects inaccurate or inconsistent data, or removes unsuitable records under a documented rule. Converting a clearly specified date format is different from guessing whether 04/05 means April 5 or May 4. Preserve source context and quarantine uncertain values for review.</p>\n<div class=\"activity\" data-activity=\"wareOrder\"></div>\n<h3>Design choices follow the use</h3>\n<p>Operational models often normalize data to reduce update problems. Warehouse designers may use <b>denormalization</b>, deliberately combining or repeating selected data to make recurring analytical queries easier or faster. This tradeoff should be managed, documented, and evaluated against the actual workload rather than treated as an exception to caring about quality.</p>\n<p>A warehouse generally preserves historical records and adds new data over time. That does not mean errors must remain forever: controlled corrections and updated interpretations may still be needed. Similarly, analytical work does not universally lock out transactions. The chapter's central distinction is purpose and workload; implementations differ.</p>\n<p>A <b>data mart</b> is an analytical collection limited to a particular business area or user group. A finance mart may draw a relevant subset from a shared warehouse. Its narrower scope can simplify access, but incompatible departmental definitions can recreate silos even when every team uses modern tools.</p>\n<p>Ask these questions when choosing the refresh and access arrangements:</p>\n<ul class=\"keys\"><li><b>Decision deadline</b> establishes how much delay is acceptable, and should be justified by the action the user must take.</li><li><b>Historical coverage</b> establishes the periods and events needed, including refunds and corrections rather than sales alone.</li><li><b>Shared definitions</b> establish which metrics mean the same thing across divisions and which differences need explicit labels.</li><li><b>Access scope</b> establishes which users need aggregated measures and which genuinely need identifiable transaction details.</li></ul>\n<div class=\"activity\" data-activity=\"wareCase\"></div>\n<h3>Reconcile the load</h3><p>If a source sends one thousand transactions, the destination should account for accepted records, deliberate exclusions, and unresolved exceptions. A successful job status only says the process completed its programmed steps. It does not establish that the intended business history arrived completely or that a repeated batch did not count the same events twice.</p><p>Keep source identifiers and load records so a discrepancy can be traced and corrected.</p><p class=\"takeaway\">Match storage, integration, and refresh timing to the decision. A warehouse brings together analytical history; it does not replace every operational system.</p>\n";

ACT.wareSort = {
  "kind": "sort",
  "label": "Classify",
  "title": "Which workload are you designing for?",
  "objective": "6.2",
  "how": "Choose the best category for every item, then check your reasoning. You can revise and try again.",
  "buckets": [
    {
      "id": "op",
      "name": "Operational / OLTP",
      "hint": "Process current transactions and narrow updates."
    },
    {
      "id": "in",
      "name": "Informational / analysis",
      "hint": "Study integrated, historical, or aggregated results."
    }
  ],
  "items": [
    {
      "t": "Reserve the final seat while a customer checks out.",
      "b": "op",
      "why": "The system must make a reliable change to current availability."
    },
    {
      "t": "Compare two years of route profitability and cancellation rates.",
      "b": "in",
      "why": "The question spans historical records and combines performance measures."
    },
    {
      "t": "Correct the destination on an order that has not shipped.",
      "b": "op",
      "why": "This modifies a current transaction rather than analyzing a historical pattern."
    },
    {
      "t": "Study repeat purchasing after three different promotions.",
      "b": "in",
      "why": "The question compares outcomes over groups and time."
    },
    {
      "t": "Record receipt of a supplier’s delivery.",
      "b": "op",
      "why": "The event updates the organization’s current inventory state."
    },
    {
      "t": "Compare quarterly purchasing costs across all divisions.",
      "b": "in",
      "why": "The analysis integrates data from organizational units over a period."
    }
  ]
};

ACT.wareOrder = {
  "kind": "order",
  "label": "Sequence",
  "title": "Build a trustworthy daily load",
  "objective": "6.2",
  "how": "Move the steps into a defensible sequence using the arrow controls, then check.",
  "steps": [
    {
      "t": "Extract orders and refunds with source IDs and timestamps.",
      "why": "Keep enough context to identify the origin and meaning of each record."
    },
    {
      "t": "Transform formats, reconcile definitions, and flag invalid records.",
      "why": "Agreement on meaning must precede trustworthy aggregation across systems."
    },
    {
      "t": "Load accepted records and record the rejected-record counts.",
      "why": "A visible exception count prevents silent data loss from appearing as success."
    },
    {
      "t": "Reconcile totals and publish the refresh time with the report.",
      "why": "Users need both completeness checks and the freshness of the result."
    }
  ]
};

ACT.wareCase = {
  "kind": "case",
  "label": "Mini case",
  "title": "Fast checkout, slow quarterly analysis",
  "objective": "6.2",
  "how": "Study the hypothetical case and its invented figures. Make every decision to unlock the debrief; read the explanation for each option.",
  "brief": "A hypothetical retailer runs checkout and its two-year promotion analysis on the same resources. Checkout slows during the analyst’s query. The marketing team can work with yesterday’s data, but the fraud team needs signals during payment. Management proposes moving every decision to one nightly report.",
  "facts": [
    {
      "k": "Marketing tolerance",
      "v": "One day"
    },
    {
      "k": "Fraud tolerance",
      "v": "During payment"
    },
    {
      "k": "Current symptom",
      "v": "Checkout slows during broad analysis"
    }
  ],
  "exhibit": {
    "name": "Evidence to use",
    "caption": "Invented practice data for this case only.",
    "headers": [
      "Need",
      "Required timing"
    ],
    "rows": [
      [
        "Promotion comparison",
        "Next-day analysis acceptable"
      ],
      [
        "Payment fraud decision",
        "Before payment completes"
      ]
    ]
  },
  "questions": [
    {
      "q": "Which approach fits the promotion analysis?",
      "opts": [
        "Run it after every scan on checkout resources.",
        "Replace historical records with today’s stock table.",
        "Publish a nightly warehouse for marketing analysis.",
        "Remove refunds to make the current query shorter."
      ],
      "a": 2,
      "why": [
        "Running broad analysis more often can worsen the contention already affecting checkout.",
        "Current stock does not preserve the sales and promotion history needed for comparison.",
        "Separating this workload and accepting a daily refresh fits the stated decision deadline.",
        "Removing refunds changes the question and can overstate the value of promotions."
      ]
    },
    {
      "q": "Why must the fraud requirement be handled separately?",
      "opts": [
        "A daily batch cannot act before payment completes.",
        "Fraud detection mainly supports a long-term strategy review.",
        "A warehouse cannot store any payment-related information.",
        "The marketing deadline automatically applies to all users."
      ],
      "a": 0,
      "why": [
        "The payment decision expires before the nightly load, so it needs sufficiently timely signals.",
        "This example concerns a current payment decision with an immediate operational deadline.",
        "The limitation is freshness for the action, not a universal prohibition on payment data.",
        "Different decisions have different deadlines even when they use related source records."
      ]
    }
  ],
  "debrief": "A warehouse is appropriate for the tolerant historical workload, while the payment decision requires a timely operational path. Separating these needs avoids buying freshness where it adds little value and avoids accepting delay where it defeats the purpose."
};

