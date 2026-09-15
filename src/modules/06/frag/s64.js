/* Chapter 6 lesson and activity data. Rebuild with node src/build.mjs --module=modules/06. */
PROSE.s64 = "\n<span class=\"eyebrow\">Application supplement 6.4</span><h2>Data through the five forces and value chain</h2>\n<p class=\"lede\">A well-managed database can improve a business, but the strategic explanation must say how. Porter's five forces examine industry pressure on profitability. The value chain examines how a firm configures and connects the activities that create value. Together they connect a data initiative to a business reason.</p>\n<div class=\"callout info\"><b>Application supplement.</b> This section applies frameworks from the strategy material to Chapter 6. It is not an additional textbook learning objective. Every business situation below is hypothetical, and each proposed competitive effect is an argument to test against evidence.</div>\n<h3>Define the business before rating the forces</h3>\n<p>Specify an industry, geography, customer group, and offering. For a regional delivery firm, another regional delivery firm may be a rival, while customer self-pickup may be a substitute. Changing the boundary changes which comparisons are meaningful. Do not begin by assigning a force to every software feature.</p>\n<p>Examine all five forces, even when some seem weak. Use a pressure rating such as low, moderate, or high and give the conditions supporting it:</p>\n<ul class=\"keys\"><li><b>Rivalry among existing competitors</b> concerns competition within the industry, including price pressure and costly attempts to win customers from current rivals.</li><li><b>Threat of new entrants</b> concerns how readily additional firms could compete, given entry barriers and access to necessary capabilities.</li><li><b>Threat of substitutes</b> concerns a different way customers can meet the underlying need, placing a limit on what the industry can charge.</li><li><b>Bargaining power of buyers</b> concerns customers' leverage over price and terms, shaped by alternatives, concentration, and switching conditions.</li><li><b>Bargaining power of suppliers</b> concerns input providers' leverage, including essential data or software suppliers when credible replacements are difficult.</li></ul>\n<div class=\"activity\" data-activity=\"forceDiagram\"></div>\n<p>Data can pull in opposite directions. Widely available cloud tools may lower entry costs; accumulated, relevant information combined with effective processes may be harder to reproduce. A customer-facing comparison tool can strengthen buyer leverage even when it also helps the seller collect demand data. State whose position changes and why.</p>\n<h3>Locate the work that creates value</h3>\n<p>Porter's value chain distinguishes five primary activities and four support activities. Classify an initiative by the business work it improves. The same database can serve several activities, and the same activity can depend on several technologies. Naming a system does not complete the classification.</p>\n<p>The primary activities follow the offering and the customer. Their roles remain useful in service businesses even where no physical factory exists:</p>\n<ul class=\"keys\"><li><b>Inbound logistics</b> handles received inputs, while <b>operations</b> transforms inputs into the product or performs the core service work.</li><li><b>Outbound logistics</b> delivers completed output, while <b>marketing and sales</b> helps customers discover, choose, and purchase the offering.</li><li><b>Service</b> sustains the offering's value after purchase, including support, repair, and handling a return with the relevant history available.</li></ul>\n<p>The support activities enable work across that primary chain. They are more than background overhead:</p>\n<ul class=\"keys\"><li><b>Firm infrastructure</b> includes general management, planning, and finance; the phrase does not simply mean an organization's computer hardware.</li><li><b>Human resource management</b> recruits, develops, and manages people, while <b>technology development</b> improves products, processes, and know-how.</li><li><b>Procurement</b> sources and purchases inputs. Selecting a supplier belongs here; receiving that supplier's shipment belongs to inbound logistics.</li></ul>\n<div class=\"activity\" data-activity=\"forceExplore\"></div>\n<p>A shared product identifier can connect receiving, order fulfillment, and returns. The benefit may come from the handoffs: fewer mistaken substitutions, fewer canceled orders, and less repeated investigation. Explain those connections instead of assigning the entire initiative to “IT” and leaving the operating mechanism unstated.</p>\n<div class=\"activity\" data-activity=\"forceSort\"></div>\n<h3>Make an argument the reader can check</h3>\n<p>A useful analysis separates observed conditions from proposed actions and hoped-for effects. “Supplier power is high because one proprietary feed is essential and replacement takes months” describes dependence. “Document and test an alternative data feed” proposes a response. “Reduce migration time” names an outcome to measure. None of those statements establishes success in advance.</p>\n<p>Two value-chain opportunities should describe genuinely different work. A supplier-selection report and a supplier-negotiation report both belong to procurement. Comparing supplier selection with receipt reconciliation identifies procurement and inbound logistics. That distinction helps a manager assign owners and avoid counting the same benefit twice.</p>\n<div class=\"activity\" data-activity=\"forceCase\"></div>\n<p class=\"mini\">Framework basis: Michael Porter, <i>Competitive Advantage</i> (1985), and the Harvard Business School Institute for Strategy and Competitiveness explanations of the five forces and value chain. The chapter supplies the data-management concepts; the situations and proposed responses are instructional applications.</p>\n<p>For more practice with the frameworks, open the <a href=\"five-forces-and-value-chain.html\">Five Forces and Value Chain workshop</a>. Use the evidence-first method here when returning to its industry ratings and investment decisions.</p>\n<p class=\"takeaway\">Connect an external pressure to specific work inside the firm, then explain how improved data could change the outcome. Keep observed evidence, analytical interpretation, and expected benefit distinct.</p>\n";

ACT.forceDiagram = {
  "kind": "diagram",
  "label": "Interactive diagram",
  "title": "Follow the data mechanism through each force",
  "objective": "6.4",
  "how": "Select each tab to trace a different model. Read the connections and the explanation beneath it.",
  "models": [
    {
      "id": "0",
      "name": "Rivalry among existing competitors",
      "site": "Pressure from firms already competing in the defined industry.",
      "boxes": [
        {
          "t": "Condition",
          "w": "Several delivery firms offer comparable service and repeatedly compete on price.",
          "c": "a"
        },
        {
          "t": "Data initiative",
          "w": "Analyze fulfillment failures to improve reliability at an acceptable cost.",
          "c": "b"
        },
        {
          "t": "Evidence",
          "w": "Compare price competition, switching patterns, and competitor service levels.",
          "c": "c"
        }
      ],
      "points": [
        "A dashboard can improve a response to rivalry without reducing rivalry itself.",
        "Treat the proposed response as an analytical hypothesis; verify the actual effect and its cost."
      ]
    },
    {
      "id": "1",
      "name": "Threat of new entrants",
      "site": "The ease with which additional firms can enter the industry.",
      "boxes": [
        {
          "t": "Condition",
          "w": "A new operator can rent common software, but building reliable delivery history and local coverage takes time.",
          "c": "a"
        },
        {
          "t": "Data initiative",
          "w": "Use reliable operating history to improve service while assessing how easily entrants could reproduce it.",
          "c": "b"
        },
        {
          "t": "Evidence",
          "w": "Examine entry costs, access to customers, distribution, and time to build capabilities.",
          "c": "c"
        }
      ],
      "points": [
        "Buying a widely available database is not by itself a durable entry barrier.",
        "Treat the proposed response as an analytical hypothesis; verify the actual effect and its cost."
      ]
    },
    {
      "id": "2",
      "name": "Threat of substitutes",
      "site": "Pressure from a different way to satisfy the underlying customer need.",
      "boxes": [
        {
          "t": "Condition",
          "w": "Customers may collect orders themselves instead of paying for delivery.",
          "c": "a"
        },
        {
          "t": "Data initiative",
          "w": "Use demand and route records to design a delivery service whose convenience earns its price.",
          "c": "b"
        },
        {
          "t": "Evidence",
          "w": "Study why customers choose self-pickup, what it costs them, and what would make them switch.",
          "c": "c"
        }
      ],
      "points": [
        "Another delivery firm in the defined industry is a rival; self-pickup is a different solution.",
        "Treat the proposed response as an analytical hypothesis; verify the actual effect and its cost."
      ]
    },
    {
      "id": "3",
      "name": "Bargaining power of buyers",
      "site": "Customers’ ability to negotiate price, quality, or terms.",
      "boxes": [
        {
          "t": "Condition",
          "w": "A few large business customers account for much of revenue and can change providers cheaply.",
          "c": "a"
        },
        {
          "t": "Data initiative",
          "w": "Use consistent customer records to improve service and understand the economics of retaining accounts.",
          "c": "b"
        },
        {
          "t": "Evidence",
          "w": "Check concentration, switching costs, credible alternatives, and demands for concessions.",
          "c": "c"
        }
      ],
      "points": [
        "Personalized messages alone do not prove that customers have lost bargaining power.",
        "Treat the proposed response as an analytical hypothesis; verify the actual effect and its cost."
      ]
    },
    {
      "id": "4",
      "name": "Bargaining power of suppliers",
      "site": "Input providers’ ability to influence prices and terms.",
      "boxes": [
        {
          "t": "Condition",
          "w": "A routing-data provider controls a critical input and migration requires costly record conversion.",
          "c": "a"
        },
        {
          "t": "Data initiative",
          "w": "Maintain documented IDs, exportable history, and tested migration procedures.",
          "c": "b"
        },
        {
          "t": "Evidence",
          "w": "Examine viable alternative providers, dependency, switching effort, and contract restrictions.",
          "c": "c"
        }
      ],
      "points": [
        "An unreliable supplier is not necessarily powerful if it can be replaced cheaply.",
        "Treat the proposed response as an analytical hypothesis; verify the actual effect and its cost."
      ]
    }
  ]
};

ACT.forceExplore = {
  "kind": "explore",
  "label": "Explore",
  "title": "Explore all nine value-chain activities",
  "objective": "6.4",
  "how": "Open each activity and inspect its definition, data example, measure, and common confusion.",
  "labels": [
    "Business work",
    "Data in action",
    "Outcome to measure",
    "Check the boundary"
  ],
  "items": [
    {
      "icon": "1",
      "name": "Inbound logistics",
      "sub": "Primary activity",
      "what": "Receiving and handling inputs.",
      "real": "Barcode records reconcile deliveries to expected stock.",
      "absent": "Count receipt discrepancies per 1,000 units.",
      "why": "Receiving the shipment differs from selecting its supplier."
    },
    {
      "icon": "2",
      "name": "Operations",
      "sub": "Primary activity",
      "what": "Transforming inputs into the product or service.",
      "real": "Sensor and job records guide equipment maintenance.",
      "absent": "Track unplanned downtime per operating hour.",
      "why": "For a service business, this is the core work that delivers the service."
    },
    {
      "icon": "3",
      "name": "Outbound logistics",
      "sub": "Primary activity",
      "what": "Storing and distributing completed output to customers.",
      "real": "Order and carrier records improve dispatch and delivery promises.",
      "absent": "Track on-time deliveries and cost per shipment.",
      "why": "Dispatching finished orders differs from receiving purchased inputs."
    },
    {
      "icon": "4",
      "name": "Marketing and sales",
      "sub": "Primary activity",
      "what": "Helping customers find, choose, and buy the offering.",
      "real": "Consistent customer records support relevant campaigns.",
      "absent": "Measure profitable conversions within the defined audience.",
      "why": "Fewer duplicate contacts is useful, but sales outcomes test business value."
    },
    {
      "icon": "5",
      "name": "Service",
      "sub": "Primary activity",
      "what": "Maintaining or enhancing value after the sale.",
      "real": "A joined order history helps staff resolve a return.",
      "absent": "Measure first-contact resolution and repeat contacts.",
      "why": "One case can use many tables while still improving a single activity."
    },
    {
      "icon": "6",
      "name": "Firm infrastructure",
      "sub": "Support activity",
      "what": "General management, planning, finance, and organization-wide control.",
      "real": "Shared metric definitions reconcile management reports.",
      "absent": "Track reconciliation time and unresolved definition disputes.",
      "why": "Firm infrastructure here is broader than computer servers and networks."
    },
    {
      "icon": "7",
      "name": "Human resource management",
      "sub": "Support activity",
      "what": "Recruiting, developing, and managing the workforce.",
      "real": "Accurate employee and skills records support training plans.",
      "absent": "Track time to competence and records requiring correction.",
      "why": "The classification follows the workforce task rather than the software name."
    },
    {
      "icon": "8",
      "name": "Technology development",
      "sub": "Support activity",
      "what": "Improving products, processes, and underlying know-how.",
      "real": "Engineering analyzes failure records to improve a design.",
      "absent": "Measure repeat defect rates after a validated design change.",
      "why": "Using a sensor in production is not automatically technology development."
    },
    {
      "icon": "9",
      "name": "Procurement",
      "sub": "Support activity",
      "what": "Sourcing and purchasing the inputs the organization needs.",
      "real": "Supplier master data and performance history support sourcing decisions.",
      "absent": "Track sourcing cycle time and total evaluated purchasing cost.",
      "why": "Negotiating and selecting suppliers differs from physically receiving goods."
    }
  ]
};

ACT.forceSort = {
  "kind": "sort",
  "label": "Classify",
  "title": "Place the work, not the technology",
  "objective": "6.4",
  "how": "Choose the best category for every item, then check your reasoning. You can revise and try again.",
  "buckets": [
    {
      "id": "0",
      "name": "Inbound logistics",
      "hint": "Receiving and handling inputs."
    },
    {
      "id": "1",
      "name": "Operations",
      "hint": "Transforming inputs into the product or service."
    },
    {
      "id": "2",
      "name": "Outbound logistics",
      "hint": "Storing and distributing completed output to customers."
    },
    {
      "id": "3",
      "name": "Marketing and sales",
      "hint": "Helping customers find, choose, and buy the offering."
    },
    {
      "id": "4",
      "name": "Service",
      "hint": "Maintaining or enhancing value after the sale."
    },
    {
      "id": "5",
      "name": "Firm infrastructure",
      "hint": "General management, planning, finance, and organization-wide control."
    },
    {
      "id": "6",
      "name": "Human resource management",
      "hint": "Recruiting, developing, and managing the workforce."
    },
    {
      "id": "7",
      "name": "Technology development",
      "hint": "Improving products, processes, and underlying know-how."
    },
    {
      "id": "8",
      "name": "Procurement",
      "hint": "Sourcing and purchasing the inputs the organization needs."
    }
  ],
  "items": [
    {
      "t": "Barcode records reconcile deliveries to expected stock.",
      "b": "0",
      "why": "Receiving the shipment differs from selecting its supplier."
    },
    {
      "t": "Sensor and job records guide equipment maintenance.",
      "b": "1",
      "why": "For a service business, this is the core work that delivers the service."
    },
    {
      "t": "Order and carrier records improve dispatch and delivery promises.",
      "b": "2",
      "why": "Dispatching finished orders differs from receiving purchased inputs."
    },
    {
      "t": "Consistent customer records support relevant campaigns.",
      "b": "3",
      "why": "Fewer duplicate contacts is useful, but sales outcomes test business value."
    },
    {
      "t": "A joined order history helps staff resolve a return.",
      "b": "4",
      "why": "One case can use many tables while still improving a single activity."
    },
    {
      "t": "Shared metric definitions reconcile management reports.",
      "b": "5",
      "why": "Firm infrastructure here is broader than computer servers and networks."
    },
    {
      "t": "Accurate employee and skills records support training plans.",
      "b": "6",
      "why": "The classification follows the workforce task rather than the software name."
    },
    {
      "t": "Engineering analyzes failure records to improve a design.",
      "b": "7",
      "why": "Using a sensor in production is not automatically technology development."
    },
    {
      "t": "Supplier master data and performance history support sourcing decisions.",
      "b": "8",
      "why": "Negotiating and selecting suppliers differs from physically receiving goods."
    }
  ]
};

ACT.forceCase = {
  "kind": "case",
  "label": "Mini case",
  "title": "A delivery firm chooses its first move",
  "objective": "6.4",
  "how": "Study the hypothetical case and its invented figures. Make every decision to unlock the debrief; read the explanation for each option.",
  "brief": "A hypothetical regional delivery firm competes with several similar providers. Customers can also collect purchases themselves. Three large customers negotiate discounts. One essential route-data supplier requires a costly migration, and new delivery entrants can rent common software but still need local operating capacity.",
  "facts": [
    {
      "k": "Industry",
      "v": "Regional delivery for local retailers"
    },
    {
      "k": "Buyer concentration",
      "v": "Three accounts supply 60% of revenue"
    },
    {
      "k": "Supplier dependence",
      "v": "Route-data migration estimated at four months"
    }
  ],
  "exhibit": {
    "name": "Evidence to use",
    "caption": "Invented practice data for this case only.",
    "headers": [
      "Observation",
      "Operational issue"
    ],
    "rows": [
      [
        "Supplier records use inconsistent IDs",
        "Comparing input alternatives is slow"
      ],
      [
        "Carrier events use inconsistent order IDs",
        "Support cannot find delivery history"
      ]
    ]
  },
  "questions": [
    {
      "q": "Which pair correctly classifies two outside pressures?",
      "opts": [
        "Other delivery firms are substitutes; self-pickup is rivalry.",
        "Other delivery firms are rivals; self-pickup is a substitute.",
        "Large customers are suppliers; the data provider is a buyer.",
        "A support delay is entry; a duplicate record is rivalry."
      ],
      "a": 1,
      "why": [
        "The defined industry includes delivery providers, while self-pickup is a different solution.",
        "Competitors within the stated industry are rivals; self-pickup meets the need differently.",
        "Roles follow who buys the firm’s offering and who supplies its inputs.",
        "Internal data symptoms do not by themselves identify forces acting on the industry."
      ]
    },
    {
      "q": "Which pair identifies two distinct value-chain opportunities?",
      "opts": [
        "Select suppliers and negotiate terms with those same suppliers.",
        "Send campaign emails and choose the audience for those emails.",
        "Improve procurement comparisons and resolve service cases faster.",
        "Track delivery dispatch and schedule the same delivery dispatch."
      ],
      "a": 2,
      "why": [
        "Both tasks concern sourcing and purchasing inputs, so both sit within procurement.",
        "Both tasks support reaching and converting customers within marketing and sales.",
        "Supplier comparison improves procurement, while joined delivery histories help after-sale service.",
        "These descriptions concern the same outbound-logistics workflow rather than two distinct activities."
      ]
    }
  ],
  "debrief": "The case contains evidence about all five forces, but ratings still need a stated boundary and justification. Its internal symptoms expose different value-chain opportunities. The next step is to choose one response, estimate its cost, and test a measurable outcome rather than claim that a database eliminates competitive pressure."
};

