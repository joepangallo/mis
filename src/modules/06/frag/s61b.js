/* Chapter 6 lesson and activity data. Rebuild with node src/build.mjs --module=modules/06. */
PROSE.s61b = "\n<span class=\"eyebrow\">Objective 6.1 · Part 2</span><h2>Data flows and responsible stewardship</h2>\n<p class=\"lede\">A delivery address can pass through a checkout form, an order system, a warehouse application, a carrier, and a support screen. Understanding each handoff helps explain why a correct address at checkout can become an incorrect label at dispatch.</p>\n<h3>Trace the handoffs</h3>\n<p><b>Data flows</b> are the movement and transformation of data within and between systems. Sources include point-of-sale terminals, transaction processing systems, web forms, mobile applications, and Internet of Things sensors. A useful map records what moves, who owns each step, how quickly it moves, and how errors are reported.</p>\n<p>The chapter's flow has four broad stages. A business can revisit these stages repeatedly as data is reused:</p>\n<ul class=\"keys\"><li><b>Capture</b> records the event at its source, including the identifier, time, and context needed to interpret it later.</li><li><b>Transform</b> extracts records, cleans errors, validates values, standardizes formats, and may aggregate or enrich the result.</li><li><b>Store</b> places the data in a repository suited to transactions, reporting, flexible documents, or raw analytical material.</li><li><b>Use</b> supplies a transaction, report, recommendation, or other decision whose value depends on the earlier stages.</li></ul>\n<div class=\"activity\" data-activity=\"flowDiagram\"></div>\n<h3>Three failures that look similar</h3>\n<p>A <b>data silo</b> exists when useful data is isolated in a department or system and cannot readily support other work. <b>Data duplication</b> is unnecessary repetition of the same fact. <b>Data inconsistency</b> occurs when records, formats, or meanings conflict. Copying every silo into one storage location can preserve all three problems.</p>\n<p>Suppose dispatch writes an address correction in a spreadsheet while support reads the original order. The inaccessible correction is a silo problem. Maintaining the address in both places creates duplication. Showing two destinations for the same shipment creates inconsistency. Diagnosis matters because each symptom calls for a different part of the remedy.</p>\n<p>Use concrete controls at the handoff rather than assuming the next team will notice:</p>\n<ul class=\"keys\"><li><b>Shared identifiers</b> let systems agree which order, customer, or product a record describes before combining its attributes.</li><li><b>Validation rules</b> reject or flag implausible values; their meaning must fit the event, because a planned delivery can legitimately be in the future.</li><li><b>Documented transformations</b> preserve the meaning of dates, units, status codes, and missing values when formats change.</li><li><b>Exception ownership</b> gives a named team responsibility for repairing rejected records and communicating the correction downstream.</li></ul>\n<div class=\"activity\" data-activity=\"flowSort\"></div>\n<h3>Ethics follows the data</h3>\n<p>The chapter treats ethical data handling as an organizational responsibility. Its five pillars are ownership, transparency, privacy, intention, and outcomes. These ask whose interests are involved, whether people understand the flow, how exposure is limited, why data is collected, and what consequences its use actually creates.</p>\n<p>Collecting more does not automatically make a decision better. Precise location histories may be excessive when neighborhood-level demand would answer a planning question. Public posts may lack context or originate from bots; a screenshot can preserve a disclosure after deletion. Assess origin and meaning before treating social activity as evidence of customer demand.</p>\n<div class=\"activity\" data-activity=\"flowCase\"></div>\n<p>Security also includes accidental exposure, application mistakes, and unavailable systems. Centralizing data can make access rules easier to administer while increasing the consequences of a failure. Limit access by job, record important changes, and verify that authorized staff can recover needed data when normal service is interrupted.</p>\n<h3>Keep the failure path visible</h3><p>A flow diagram should show what happens when a record cannot proceed. If a carrier rejects an address, record the rejection and notify the team responsible for correction. Repeatedly retrying an invalid value may create noise without moving the shipment. Quietly dropping the record can make a dashboard look healthier than operations actually are.</p><p>Track the source identifier, time, rejected field, reason, and next owner. This gives the team enough context to investigate while avoiding unnecessary copies of sensitive details. When a correction is approved, verify that downstream systems receive it and that the original problem is not reintroduced by the next batch.</p><p>Transparency also helps employees make sensible decisions. A support screen that labels a status as updated yesterday prevents a worker from presenting it as a live carrier location. Clear freshness information is useful even when a faster integration cannot yet be justified.</p><p class=\"takeaway\">A trustworthy flow preserves meaning and purpose from source to decision. A faster pipeline carrying conflicting or excessive data can make the original problem spread faster.</p>\n<div class=\"activity\" data-activity=\"flowOrder\"></div>";

ACT.flowDiagram = {
  "kind": "diagram",
  "label": "Interactive diagram",
  "title": "Trace one shipment through three uses",
  "objective": "6.1",
  "how": "Select each tab to trace a different model. Read the connections and the explanation beneath it.",
  "models": [
    {
      "id": "0",
      "name": "Fulfillment",
      "site": "Operational records must arrive in time to ship.",
      "boxes": [
        {
          "t": "Capture",
          "w": "Customer submits address",
          "c": "a"
        },
        {
          "t": "Validate",
          "w": "Check required fields",
          "c": "b"
        },
        {
          "t": "Store",
          "w": "Record order and destination",
          "c": "c"
        },
        {
          "t": "Use",
          "w": "Produce carrier label",
          "c": "d"
        }
      ],
      "points": [
        "Keep the order identifier through every handoff so a correction reaches the right shipment.",
        "A rejected address needs a visible correction process; silently dropping it is not validation."
      ]
    },
    {
      "id": "1",
      "name": "Performance reporting",
      "site": "Combine shipment history to understand delays.",
      "boxes": [
        {
          "t": "Extract",
          "w": "Orders and carrier events",
          "c": "a"
        },
        {
          "t": "Transform",
          "w": "Reconcile IDs and time zones",
          "c": "b"
        },
        {
          "t": "Store",
          "w": "Historical warehouse",
          "c": "c"
        },
        {
          "t": "Use",
          "w": "Late-delivery report",
          "c": "d"
        }
      ],
      "points": [
        "A missing carrier event must not be silently classified as an on-time delivery.",
        "Document the time at which the report was refreshed before comparing it with live operations."
      ]
    },
    {
      "id": "2",
      "name": "Service",
      "site": "Make a useful status visible to authorized employees.",
      "boxes": [
        {
          "t": "Capture",
          "w": "Carrier reports exception",
          "c": "a"
        },
        {
          "t": "Transform",
          "w": "Translate status code",
          "c": "b"
        },
        {
          "t": "Store",
          "w": "Attach event to order",
          "c": "c"
        },
        {
          "t": "Use",
          "w": "Support explains next action",
          "c": "d"
        }
      ],
      "points": [
        "The customer needs an understandable status, not an unexplained carrier code.",
        "Restrict sensitive address details to people who need them for the task."
      ]
    }
  ]
};

ACT.flowSort = {
  "kind": "sort",
  "label": "Classify",
  "title": "Diagnose the broken handoff",
  "objective": "6.1",
  "how": "Choose the best category for every item, then check your reasoning. You can revise and try again.",
  "buckets": [
    {
      "id": "silo",
      "name": "Silo",
      "hint": "The needed record is isolated."
    },
    {
      "id": "dup",
      "name": "Duplication",
      "hint": "A fact is unnecessarily maintained in several places."
    },
    {
      "id": "inc",
      "name": "Inconsistency",
      "hint": "The representations or meanings conflict."
    }
  ],
  "items": [
    {
      "t": "Support cannot access the dispatch correction log.",
      "b": "silo",
      "why": "The immediate problem is access to information held by another function."
    },
    {
      "t": "Five systems separately maintain the same supplier phone number.",
      "b": "dup",
      "why": "The unnecessary copies create several places that must be maintained."
    },
    {
      "t": "Sales counts bookings while finance labels only paid orders as sales.",
      "b": "inc",
      "why": "The same label refers to different business events."
    },
    {
      "t": "Two records show different addresses for customer C18.",
      "b": "inc",
      "why": "The representations conflict even before choosing which one is authoritative."
    },
    {
      "t": "A purchased division keeps customer history in an inaccessible application.",
      "b": "silo",
      "why": "The history exists but cannot support the combined organization’s work."
    },
    {
      "t": "Each monthly export includes another editable copy of the customer name.",
      "b": "dup",
      "why": "Editable repetition creates avoidable maintenance and correction work."
    }
  ]
};

ACT.flowCase = {
  "kind": "case",
  "label": "Mini case",
  "title": "The warehouse can see too much",
  "objective": "6.1",
  "how": "Study the hypothetical case and its invented figures. Make every decision to unlock the debrief; read the explanation for each option.",
  "brief": "A hypothetical delivery company copies its complete customer file to an outside routing partner. The partner needs a delivery address and contact channel, but the export also includes customer-support notes. The operations manager wants to keep the convenient export because it has never generated an error message.",
  "facts": [
    {
      "k": "Required",
      "v": "Destination and delivery contact"
    },
    {
      "k": "Extra",
      "v": "Free-text support notes"
    },
    {
      "k": "Owner",
      "v": "Operations controls the export"
    }
  ],
  "exhibit": {
    "name": "Evidence to use",
    "caption": "Invented practice data for this case only.",
    "headers": [
      "Export field",
      "Routing purpose"
    ],
    "rows": [
      [
        "Delivery address",
        "Choose destination"
      ],
      [
        "Contact number",
        "Resolve delivery access"
      ],
      [
        "Support notes",
        "No defined routing use"
      ]
    ]
  },
  "questions": [
    {
      "q": "Which change most directly applies purpose limitation?",
      "opts": [
        "Add all historical orders to the same export.",
        "Give the routing partner a newer reporting tool.",
        "Remove every field that identifies a shipment.",
        "Export the fields needed for the routing task."
      ],
      "a": 3,
      "why": [
        "History increases exposure without a stated need for the routing decision described here.",
        "A reporting tool changes presentation, while the excessive fields remain in the export.",
        "Shipment identification is needed to match the route result back to the correct delivery.",
        "Limit the dataset to the defined task and document why each remaining field is needed."
      ]
    },
    {
      "q": "Which evidence should determine whether the revised flow works?",
      "opts": [
        "Fewer exposed fields and stable delivery success.",
        "More downloads of the full customer history.",
        "A larger total number of retained customer notes.",
        "A shorter export filename on the partner server."
      ],
      "a": 0,
      "why": [
        "This checks both the reduction in unnecessary exposure and the business outcome the flow serves.",
        "More downloads expand distribution and do not show that routing has improved.",
        "Keeping more notes does not evaluate whether the partner needs them for routing.",
        "The filename does not establish appropriate access, purpose, or successful delivery."
      ]
    }
  ],
  "debrief": "A working export is not necessarily an appropriate export. Define the purpose, minimize fields, control access and retention, and check downstream outcomes. Security and ethics apply across the partner boundary because the business remains responsible for how its workflows use customer information."
};

ACT.flowOrder = {
  "kind": "order",
  "label": "Sequence",
  "title": "Repair the flow before adding another dashboard",
  "objective": "6.1",
  "how": "Move the steps into a defensible sequence using the arrow controls, then check.",
  "steps": [
    {
      "t": "Identify the decision and the source records it needs.",
      "why": "Purpose determines which records and freshness are relevant."
    },
    {
      "t": "Agree identifiers, definitions, access, and owners.",
      "why": "People must resolve meaning and responsibility before automating the handoff."
    },
    {
      "t": "Validate and transform a sample, keeping rejected records visible.",
      "why": "A pilot exposes problems without silently treating failures as good data."
    },
    {
      "t": "Deliver the result and compare the business outcome with its baseline.",
      "why": "Measure whether the change helps the actual decision and preserves appropriate access."
    }
  ]
};

