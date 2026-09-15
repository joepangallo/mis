/* Chapter 6 lesson and activity data. Rebuild with node src/build.mjs --module=modules/06. */
PROSE.s62c = "\n<span class=\"eyebrow\">Objective 6.2 · Part 3</span><h2>Queries that answer business questions</h2>\n<p class=\"lede\">Which orders arrived late, and which supplier supplied the affected products? The answer is stored across related records. This section turns a business question into a query you can run, then asks whether the resulting evidence supports the decision.</p>\n<h3>Capture, retrieve, present</h3>\n<p>A <b>form</b> provides fields through which a person can enter or change data. Good forms show required information and understandable validation messages. Much data also arrives automatically from checkout systems and sensors. Whichever channel captures it, the same business meanings and quality controls should apply.</p>\n<p>A <b>query</b> requests data from a database. <b>Structured Query Language (SQL)</b> expresses that request in a language used with relational systems. A <b>report</b> organizes results for people to read. A <b>report generator</b> helps create that presentation, sometimes through a visual interface. Changing a chart cannot repair a query that selected the wrong records.</p>\n<p>Use a precise question before writing SQL. “Find problems” leaves the analyst to invent a definition. “Show order identifiers and delay days for completed orders delayed by more than two days, largest delay first” specifies the fields, population, condition, and ordering. That is enough to check whether the result is correct.</p>\n<p>Four clauses handle the first kind of request. Read them as instructions about a table:</p>\n<ul class=\"keys\"><li><b>SELECT</b> names the columns or expressions to return, so the result includes the information needed for the decision.</li><li><b>FROM</b> identifies the table containing the records, such as Orders rather than the separate Customers table.</li><li><b>WHERE</b> limits the rows to those meeting a condition, such as delay_days greater than two.</li><li><b>ORDER BY</b> arranges the results, with DESC placing the largest numeric values first for a priority list.</li></ul>\n<p>For example, <code>SELECT order_id, delay_days FROM orders WHERE delay_days &gt; 2 ORDER BY delay_days DESC</code> returns the late-order priority list from the practice data below. Select only the fields a recipient needs. The query does not need customer contact details to show which order identifiers require investigation.</p>\n<h3>Join for context and group for a pattern</h3>\n<p>A <b>JOIN</b> combines related rows through matching keys. The practice tables link each order's supplier_id to the supplier record. Prefixing columns with table aliases, such as <code>o.supplier_id</code> and <code>s.supplier_id</code>, makes the relationship explicit. Matching unrelated numeric columns can produce plausible-looking but meaningless results.</p>\n<p><b>GROUP BY</b> groups records for a summary. <code>COUNT(*)</code> counts rows in each group; <code>SUM</code> totals a numeric expression; <code>AVG</code> computes an average. Name calculated results with <code>AS</code> so a reader can tell what each column means. Always establish what one row represents before counting it.</p>\n<div class=\"activity\" data-activity=\"querySql\"></div>\n<h3>Choose the report for the decision</h3>\n<p>The chapter distinguishes recurring monitoring from investigations. Several categories can overlap: a key-indicator report can also run on a schedule. Choose the defining purpose when matching the examples, rather than assuming every real report fits only one category.</p>\n<ul class=\"keys\"><li><b>Scheduled reports</b> arrive at predefined intervals, such as a daily fulfillment summary sent each morning.</li><li><b>Key-indicator reports</b> summarize critical performance measures, such as on-time delivery and cost per order against targets.</li><li><b>Exception reports</b> highlight out-of-range situations, such as shipments more than two days late.</li><li><b>Drill-down reports</b> reveal supporting detail, such as the orders behind a branch's unusually high late-delivery rate.</li><li><b>Ad hoc queries</b> answer unplanned questions, such as a manager's one-time request about a disrupted delivery route.</li></ul>\n<div class=\"activity\" data-activity=\"queryMatch\"></div>\n<div class=\"activity\" data-activity=\"queryCase\"></div>\n<h3>A result needs an interpretation</h3><p>Suppose a join returns more rows than the original order table. That may be correct when each order has several lines, but it changes what COUNT counts. Before describing the result as number of orders, confirm whether each row now represents an order or an order-product occurrence. The database can execute a mistaken question perfectly.</p><p>Missing data deserves similar attention. An absent delivery timestamp may mean the parcel is still traveling, the carrier feed is delayed, or the event failed to load. It should not silently become proof of an on-time delivery. Ask the process owner what the missing value means and document the treatment in the report.</p><p>The practice lab provides small complete tables so you can inspect every result. In larger work, retain the same habit through sample records, reconciled totals, and explicit definitions of included and excluded events.</p><p class=\"takeaway\">A query is useful when its result answers a defined question. Explain the row meaning, denominator, period, and limitations before turning the result into a recommendation.</p>\n";

ACT.querySql = {
  "kind": "sql",
  "label": "SQL lab",
  "title": "Investigate the late orders",
  "objective": "6.2",
  "how": "Write and run a SELECT for each task. Any query returning the required result is accepted. These records are hypothetical. The offline practice engine supports SELECT queries; it is not a full SQLite application.",
  "tables": {
    "orders": {
      "rows": [
        {
          "order_id": 501,
          "supplier_id": "S1",
          "delay_days": 4,
          "amount": 120
        },
        {
          "order_id": 502,
          "supplier_id": "S2",
          "delay_days": 0,
          "amount": 80
        },
        {
          "order_id": 503,
          "supplier_id": "S1",
          "delay_days": 3,
          "amount": 200
        },
        {
          "order_id": 504,
          "supplier_id": "S3",
          "delay_days": 1,
          "amount": 90
        },
        {
          "order_id": 505,
          "supplier_id": "S2",
          "delay_days": 0,
          "amount": 150
        },
        {
          "order_id": 506,
          "supplier_id": "S3",
          "delay_days": 5,
          "amount": 60
        }
      ]
    },
    "suppliers": {
      "rows": [
        {
          "supplier_id": "S1",
          "supplier_name": "North",
          "replacement_weeks": 8
        },
        {
          "supplier_id": "S2",
          "supplier_name": "Central",
          "replacement_weeks": 1
        },
        {
          "supplier_id": "S3",
          "supplier_name": "South",
          "replacement_weeks": 3
        }
      ]
    }
  },
  "tasks": [
    {
      "prompt": "Show order_id and delay_days for delays above 2 days, largest delay first.",
      "expect": "SELECT order_id, delay_days FROM orders WHERE delay_days > 2 ORDER BY delay_days DESC",
      "hint": "Use WHERE to filter rows, then ORDER BY delay_days DESC.",
      "explain": "Orders 506, 501, and 503 meet the condition, with delays of 5, 4, and 3 days. A list makes the immediate exceptions visible."
    },
    {
      "prompt": "Show order_id and supplier_name for orders delayed more than 2 days, ordered by order_id ascending.",
      "expect": "SELECT o.order_id, s.supplier_name FROM orders o JOIN suppliers s ON o.supplier_id = s.supplier_id WHERE o.delay_days > 2 ORDER BY o.order_id",
      "hint": "Join orders o to suppliers s using supplier_id. Select the name from s.",
      "explain": "The join adds North to orders 501 and 503, and South to order 506. This adds context without replacing the order-level facts."
    },
    {
      "prompt": "For each supplier_id, show COUNT(*) AS order_count and AVG(delay_days) AS avg_delay, sorted by supplier_id.",
      "expect": "SELECT supplier_id, COUNT(*) AS order_count, AVG(delay_days) AS avg_delay FROM orders GROUP BY supplier_id ORDER BY supplier_id",
      "hint": "GROUP BY supplier_id makes one result row per supplier. Give both aggregates their requested aliases.",
      "explain": "Each supplier has two orders. Average delays are 3.5 days for S1, 0 for S2, and 3 for S3. These small samples suggest follow-up; they do not prove a long-term supplier ranking."
    }
  ]
};

ACT.queryMatch = {
  "kind": "match",
  "label": "Match",
  "title": "Choose the report’s defining purpose",
  "objective": "6.2",
  "how": "Match each idea to its example, then check. Read why each pairing fits.",
  "pairs": [
    {
      "l": "Scheduled report",
      "r": "The standard order summary delivered every morning",
      "why": "The defining feature here is the recurring delivery schedule."
    },
    {
      "l": "Key-indicator report",
      "r": "A panel of the business’s agreed critical metrics",
      "why": "The defining feature is the selection of measures critical to goals."
    },
    {
      "l": "Exception report",
      "r": "A list restricted to deliveries beyond the allowed delay",
      "why": "The defining feature is highlighting observations outside an accepted range."
    },
    {
      "l": "Drill-down report",
      "r": "The order details beneath a selected branch total",
      "why": "The defining feature is moving from a summary to its supporting detail."
    },
    {
      "l": "Ad hoc query",
      "r": "A one-time investigation of yesterday’s road closure",
      "why": "The defining feature is an unplanned information need rather than routine reporting."
    }
  ]
};

ACT.queryCase = {
  "kind": "case",
  "label": "Mini case",
  "title": "A supplier is blamed too quickly",
  "objective": "6.2",
  "how": "Study the hypothetical case and its invented figures. Make every decision to unlock the debrief; read the explanation for each option.",
  "brief": "A hypothetical manager sees ten late orders associated with supplier A and five associated with supplier B. She plans to move all purchasing to B. An analyst asks for the total completed orders and checks that both counts cover the same period and use the same definition of late.",
  "facts": [
    {
      "k": "Period",
      "v": "Same month"
    },
    {
      "k": "Late",
      "v": "More than two days past promise"
    },
    {
      "k": "Decision",
      "v": "Whether to investigate or switch"
    }
  ],
  "exhibit": {
    "name": "Evidence to use",
    "caption": "Invented practice data for this case only.",
    "headers": [
      "Supplier",
      "Late orders",
      "All completed orders"
    ],
    "rows": [
      [
        "A",
        "10",
        "1,000"
      ],
      [
        "B",
        "5",
        "50"
      ]
    ]
  },
  "questions": [
    {
      "q": "Which supplier has the higher observed late rate?",
      "opts": [
        "A, because ten late orders exceed five.",
        "Both, because each has at least one delay.",
        "B, because five of fifty is ten percent.",
        "Neither, because supplier identifiers are text."
      ],
      "a": 2,
      "why": [
        "The count ignores exposure: supplier A handled many more orders during the same period.",
        "Both had delays, but their denominators produce very different observed failure rates.",
        "B has a 10% late rate, compared with A’s 1% in this exhibit.",
        "Identifier types do not prevent counting orders or calculating rates for each supplier."
      ]
    },
    {
      "q": "What should the manager do before claiming supplier power has changed?",
      "opts": [
        "Treat the rate as proof that alternatives are unavailable.",
        "Examine alternatives, switching costs, and contract terms.",
        "Classify every late shipment as a new entrant threat.",
        "Replace all supplier records with the lower count."
      ],
      "a": 1,
      "why": [
        "A late rate measures performance, not the number or feasibility of alternative suppliers.",
        "Supplier power concerns dependence and bargaining options, so these conditions must be investigated.",
        "A delivery failure concerns an existing relationship and does not demonstrate ease of entry.",
        "Replacing records erases evidence and leaves the economic dependence question unanswered."
      ]
    }
  ],
  "debrief": "The observed rates reverse the impression created by raw counts. Even so, neither rate establishes why deliveries were late or whether changing supplier is economical. Good analysis separates a performance signal from a causal conclusion and from a five-forces claim."
};

