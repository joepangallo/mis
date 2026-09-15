/* Chapter 6 lesson and activity data. Rebuild with node src/build.mjs --module=modules/06. */
PROSE.s63 = "\n<span class=\"eyebrow\">Objective 6.3</span><h2>Big data, document stores, and data lakes</h2>\n<p class=\"lede\">A delivery fleet produces order records, vehicle locations, sensor messages, repair notes, and camera footage. The information does not all have the same structure or arrive at the same speed. Choosing how to manage it begins with the question the organization wants to answer.</p>\n<h3>Distinguish the three Vs</h3>\n<p><b>Big data</b> refers to data whose scale, diversity, or speed creates substantial management and analysis challenges. Chapter 6 emphasizes three characteristics: <b>volume</b>, <b>variety</b>, and <b>velocity</b>. They describe different constraints. A large archive is not necessarily fast-moving, and a small stream can require an extremely fast response.</p>\n<p>The fleet provides an example of each characteristic. Identify which requirement is doing the work:</p>\n<ul class=\"keys\"><li><b>Volume</b> concerns the amount accumulated, such as retaining years of recordings across a large number of vehicles.</li><li><b>Variety</b> concerns different forms and meanings, such as combining numeric readings, nested event messages, text, images, and audio.</li><li><b>Velocity</b> concerns the rate of arrival and required use, such as reacting to a sensor alert before equipment damage occurs.</li></ul>\n<p>These characteristics do not guarantee useful insight. More data can include more noise, gaps, duplicated events, or biased coverage. An analyst must ask how the data was generated and whether it represents the people or situations the decision concerns. Large datasets can produce very precise answers to poorly chosen questions.</p>\n<div class=\"activity\" data-activity=\"bigSort\"></div>\n<h3>Recognize the structure</h3>\n<p><b>Structured data</b> follows a defined organization, such as an order table with consistent typed columns. <b>Semistructured data</b> has identifiable elements without requiring every record to contain the same fields; a JSON event is an example. <b>Unstructured data</b>, such as free text or a recording, does not fit a predefined tabular business schema.</p>\n<p>Unstructured does not mean meaningless or devoid of all internal structure. An image has a file format, and a support note has language. The point is that their business meaning needs additional interpretation before a conventional query can compare them as quantities, dates, or categories.</p>\n<h3>Use flexible documents deliberately</h3>\n<p><b>Non-relational databases</b>, often called <b>NoSQL</b> or “not only SQL,” use models beyond conventional relational tables. A <b>document data store</b> holds records as documents, often using JSON-like structures. A customer order document can nest contact information, shipping details, and an array of items.</p>\n<p>A later document might add delivery instructions without requiring that field in every older document. Flexibility helps when record structures evolve, but it does not remove the need for data modeling. Applications and database capabilities must still enforce required values, valid meanings, appropriate access, and consistency where the business needs them.</p>\n<p>Choose a model by its access patterns and requirements. Relational systems are not inherently unable to scale or handle flexible data, and NoSQL products are not interchangeable. The chapter's useful comparison concerns design tradeoffs; it should not become a rule that large means NoSQL or that tables mean small.</p>\n<div class=\"activity\" data-activity=\"bigDiagram\"></div>\n<h3>Preserve raw material without losing control</h3>\n<p>A <b>data lake</b> stores structured, semistructured, and unstructured data in original formats for later processing and analysis. A warehouse typically organizes and transforms data for defined analytical uses before loading. In a lake, analysts can apply transformations when retrieving data for a particular question.</p>\n<p>Scalable storage can preserve material for advanced analytics, machine learning, and other work. <b>Distributed computing</b> divides storage or processing across multiple machines; the chapter names Apache Hadoop as one framework associated with big-data processing. This is a capability category, not a requirement that every organization install a particular framework.</p>\n<p>A lake becomes a <b>data swamp</b> when poor documentation and governance make its contents hard to discover, interpret, or trust. These controls preserve its usefulness:</p>\n<ul class=\"keys\"><li><b>Catalog and origin</b> identify the source, owner, capture time, units, and transformations associated with each dataset.</li><li><b>Quality and access</b> expose missing or suspect values and limit use of sensitive information to appropriate purposes.</li><li><b>Retention and review</b> connect continued storage to an identified need and retire data when keeping it is no longer justified.</li></ul>\n<div class=\"activity\" data-activity=\"bigCase\"></div>\n<p>The chapter's smart-city and automotive examples connect data to physical outcomes: less wasted energy, better routing, maintenance, and new mobility services. Judge an application using an outcome such as energy per occupied hour or unplanned downtime. A predicted benefit should be tested; a high sensor count alone shows neither savings nor fairness.</p>\n<h3>Ask what would change the architecture choice</h3><p>Collect a small sample and state the decision before selecting a repository. Then test the assumptions that would make a different design preferable:</p><ul class=\"keys\"><li><b>Access pattern</b> asks whether the application usually retrieves a whole event document or joins small facts across many events and entities.</li><li><b>Consistency need</b> asks which records must change together and what happens if two users see different states at the same time.</li><li><b>Analytical purpose</b> asks whether users need a defined recurring metric or permission to explore raw material for several different approved questions.</li><li><b>Operating capability</b> asks whether the team can maintain the chosen system, explain failures, and recover useful information when a component becomes unavailable.</li></ul><p class=\"takeaway\">Fit the repository to the data and workload, then preserve context, quality, and responsible use. Big data creates opportunity when an organization can turn it into a defensible action.</p>\n";

ACT.bigSort = {
  "kind": "sort",
  "label": "Classify",
  "title": "Name the dominant data challenge",
  "objective": "6.3",
  "how": "Choose the best category for every item, then check your reasoning. You can revise and try again.",
  "buckets": [
    {
      "id": "vol",
      "name": "Volume",
      "hint": "The amount of data to retain or process."
    },
    {
      "id": "var",
      "name": "Variety",
      "hint": "Different structures, formats, or meanings."
    },
    {
      "id": "vel",
      "name": "Velocity",
      "hint": "Arrival rate or the deadline for a response."
    }
  ],
  "items": [
    {
      "t": "Ten years of footage must be kept available for analysis.",
      "b": "vol",
      "why": "The highlighted requirement concerns accumulated storage and processing scale."
    },
    {
      "t": "Combine invoice rows, driver notes, and camera recordings.",
      "b": "var",
      "why": "The highlighted problem is integrating different representations and meanings."
    },
    {
      "t": "A temperature alert must trigger action within seconds.",
      "b": "vel",
      "why": "The deadline for use is the defining challenge even if each message is small."
    },
    {
      "t": "The archive grows from one thousand to one billion events.",
      "b": "vol",
      "why": "The amount grows without any stated change in formats or response deadline."
    },
    {
      "t": "Different devices emit event documents with different fields.",
      "b": "var",
      "why": "The challenge is accommodating changing structures across sources."
    },
    {
      "t": "A burst of messages arrives faster than the queue can be processed.",
      "b": "vel",
      "why": "The arrival rate exceeds the system’s processing rate."
    }
  ]
};

ACT.bigDiagram = {
  "kind": "diagram",
  "label": "Interactive diagram",
  "title": "Compare three homes for fleet data",
  "objective": "6.3",
  "how": "Select each tab to trace a different model. Read the connections and the explanation beneath it.",
  "models": [
    {
      "id": "0",
      "name": "Relational transaction database",
      "site": "Reliable orders and related entities.",
      "boxes": [
        {
          "t": "Orders",
          "w": "Defined typed records",
          "c": "a"
        },
        {
          "t": "Relationships",
          "w": "Keys connect customer and lines",
          "c": "b"
        },
        {
          "t": "Workload",
          "w": "Current reads and updates",
          "c": "c"
        }
      ],
      "points": [
        "Useful for the structured transaction model taught earlier.",
        "Design constraints and workload performance explicitly; the label alone is insufficient."
      ]
    },
    {
      "id": "1",
      "name": "Document data store",
      "site": "Flexible nested event records.",
      "boxes": [
        {
          "t": "Document",
          "w": "Vehicle and event identifier",
          "c": "a"
        },
        {
          "t": "Nested data",
          "w": "Sensor readings and optional context",
          "c": "b"
        },
        {
          "t": "Workload",
          "w": "Retrieve the event as a unit",
          "c": "c"
        }
      ],
      "points": [
        "A new optional field can appear without making every document identical.",
        "Define required identifiers and units so flexible records remain interpretable."
      ]
    },
    {
      "id": "2",
      "name": "Data lake",
      "site": "Preserve varied raw inputs for later analysis.",
      "boxes": [
        {
          "t": "Sources",
          "w": "Tables, JSON, notes, footage",
          "c": "a"
        },
        {
          "t": "Storage",
          "w": "Retain original formats",
          "c": "b"
        },
        {
          "t": "Analysis",
          "w": "Transform for a defined question",
          "c": "c"
        }
      ],
      "points": [
        "Catalog owner, origin, access, retention, and meaning before records become hard to find.",
        "A lake complements transaction and analytical systems rather than replacing their business rules."
      ]
    }
  ]
};

ACT.bigCase = {
  "kind": "case",
  "label": "Mini case",
  "title": "The sensor archive nobody trusts",
  "objective": "6.3",
  "how": "Study the hypothetical case and its invented figures. Make every decision to unlock the debrief; read the explanation for each option.",
  "brief": "A hypothetical fleet stores raw temperature messages in a data lake. Some vehicles report Celsius and others Fahrenheit, but several feeds omit units. Managers want a maintenance model. The archive also includes driver location histories retained without a defined analytical purpose.",
  "facts": [
    {
      "k": "Raw input",
      "v": "Mixed sensor messages"
    },
    {
      "k": "Missing context",
      "v": "Some temperature units"
    },
    {
      "k": "Extra data",
      "v": "Long-term driver location histories"
    }
  ],
  "exhibit": {
    "name": "Evidence to use",
    "caption": "Invented practice data for this case only.",
    "headers": [
      "Feed",
      "Reading",
      "Documented unit"
    ],
    "rows": [
      [
        "Vehicle group A",
        "40",
        "Celsius"
      ],
      [
        "Vehicle group B",
        "104",
        "Fahrenheit"
      ],
      [
        "Vehicle group C",
        "40",
        "Unknown"
      ]
    ]
  },
  "questions": [
    {
      "q": "What should happen before combining the temperatures?",
      "opts": [
        "Average every number as if the units match.",
        "Delete all readings above forty as sensor errors.",
        "Rename the lake to describe it as a warehouse.",
        "Recover units and quarantine records still uncertain."
      ],
      "a": 3,
      "why": [
        "The average combines incompatible scales and creates a result with no consistent meaning.",
        "A threshold cannot be interpreted correctly until the measurement units are known.",
        "Changing the repository’s name does not restore missing measurement context or quality.",
        "Recover source context, convert known units consistently, and make unresolved records visible."
      ]
    },
    {
      "q": "Which action best addresses the location histories?",
      "opts": [
        "Keep them because the storage price is low.",
        "Review purpose, access, and retention with an owner.",
        "Publish them so other teams can invent a use.",
        "Count them as evidence the model is accurate."
      ],
      "a": 1,
      "why": [
        "Low storage cost does not establish an appropriate purpose or acceptable consequences.",
        "Responsible management asks what the data is for and who may use it.",
        "Wider distribution increases exposure before a legitimate need and appropriate controls are defined.",
        "A larger record count cannot establish accuracy when relevance and quality remain unresolved."
      ]
    }
  ],
  "debrief": "Forty Celsius and 104 Fahrenheit describe the same temperature, while a bare forty is ambiguous. Raw storage preserves possibilities, but usable analysis requires restored context and governance. The location history requires its own purpose assessment rather than being justified by the sensor project."
};

