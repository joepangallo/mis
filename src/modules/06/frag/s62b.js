/* Chapter 6 lesson and activity data. Rebuild with node src/build.mjs --module=modules/06. */
PROSE.s62b = "\n<span class=\"eyebrow\">Objective 6.2 · Part 2</span><h2>Normalization and master data</h2>\n<p class=\"lede\">An instructor changes a phone number. If that number appears beside every student's grade, a single correction becomes hundreds of edits. The chapter uses this kind of repetition to explain normalization, then extends the problem across departments through master data management.</p>\n<h3>Store a fact where it belongs</h3>\n<p><b>Normalization</b> organizes relational tables so attributes describe the appropriate entity or relationship and unnecessary duplication is reduced. Separating Students, Courses, Instructors, Teaching, and Grades lets a phone number live with the instructor while a student's grade belongs with the relevant enrollment.</p>\n<p>The purpose is reliable maintenance. A table that repeats an instructor's contact information on every grade row can show several different phone numbers after an incomplete update. It can also make adding a new instructor awkward before anyone has enrolled. Removing the last enrollment should not erase the instructor's existence.</p>\n<p>The same pattern appears in a business order file. Separate current master records from facts specific to the transaction:</p>\n<ul class=\"keys\"><li><b>Customers</b> stores the current customer name and contact details once per customer identifier, so corrections have a clear home.</li><li><b>Products</b> stores shared product descriptions and current catalog information once per product identifier, rather than beside every sale.</li><li><b>Orders</b> records order-level facts such as the date and the customer reference, which apply to the purchase as a whole.</li><li><b>OrderLines</b> records quantity and agreed unit price for each line, preserving what happened in that particular transaction.</li></ul>\n<div class=\"activity\" data-activity=\"cleanSort\"></div>\n<h3>Repetition is not always a mistake</h3>\n<p>Repeated foreign-key values are how relationships work. Two orders from customer C1 should both reference C1. A price agreed last month is a different fact from today's catalog price. A shipping address preserved on a completed order may be a historical snapshot, while the customer table holds the current contact address.</p>\n<p>Ask whether two fields represent the same fact at the same time and for the same purpose. If they do, independently editing both is risky. If they describe different events or times, merging them can destroy meaning. Normalization is not an instruction to delete every repeated string.</p>\n<p>The database approach brings several related advantages over applications that each maintain separate files:</p>\n<ul class=\"keys\"><li><b>Consistency and quality</b> improve when shared rules and authoritative records reduce opportunities for conflicting updates.</li><li><b>Access and standards</b> become easier to coordinate when fields have common definitions and permissions are managed deliberately.</li><li><b>Program–data independence</b> separates application logic from data management, reducing some maintenance work when applications evolve.</li><li><b>Development productivity</b> improves when new applications can reuse established structures and validation instead of inventing another private file.</li></ul>\n<p>These are potential advantages, not automatic guarantees. A centralized database can contain bad data, and incompatible schema changes can still break applications. Governance, testing, and appropriate access remain necessary. The key benefit is a shared place to manage the problem consistently.</p>\n<div class=\"activity\" data-activity=\"cleanCase\"></div>\n<h3>Agree on the actors across systems</h3>\n<p><b>Master data</b> describes core actors and things shared across business processes, such as customers, suppliers, products, and employees. <b>Master data management (MDM)</b> coordinates their identity, definitions, quality, and authoritative representation across organizational units. It is principally a management responsibility supported by technology.</p>\n<p>Marketing may call an interested prospect a customer while accounting reserves the word for someone who has purchased. Neither definition has to disappear. The organization can define prospect and purchasing customer separately, document the relationship, and label reports accordingly. Copying both lists into one server does not settle the disagreement.</p>\n<p>After a merger, matching names alone can incorrectly merge two different suppliers. Assign an accountable data owner, establish matching and conflict rules, and send uncertain matches for review. Track how corrections reach dependent systems so the next synchronization does not restore an obsolete value.</p>\n<div class=\"activity\" data-activity=\"cleanOrder\"></div>\n<h3>Choose an authoritative source</h3><p>When two systems disagree, “take the newest value” is not always a valid rule. A recent import can contain an old address, while an earlier verified correction may be more reliable. Record where the value originated, who verified it, and which process is authorized to change it.</p><p>Define how unresolved conflicts are handled rather than letting each report choose silently. The resulting queue is useful evidence about integration quality, workload, and whether the shared definition needs revision.</p><p>Keep the correction process accountable through two records:</p><ul class=\"keys\"><li><b>Decision record</b> identifies the approved value, the reason for choosing it, and the owner who resolved the conflict.</li><li><b>Distribution record</b> shows which dependent systems received the correction and which still need attention before their reports can be reconciled.</li></ul><p class=\"takeaway\">Normalization organizes facts within a model. MDM coordinates shared meaning and identity across the organization. Both reduce avoidable inconsistency, and neither can replace agreement about what the data represents.</p>\n";

ACT.cleanSort = {
  "kind": "sort",
  "label": "Classify",
  "title": "Put each fact in the right table",
  "objective": "6.2",
  "how": "Choose the best category for every item, then check your reasoning. You can revise and try again.",
  "buckets": [
    {
      "id": "cu",
      "name": "Customers",
      "hint": "Current facts describing the customer."
    },
    {
      "id": "pr",
      "name": "Products",
      "hint": "Shared current catalog facts."
    },
    {
      "id": "or",
      "name": "Orders",
      "hint": "Facts about an order as a whole."
    },
    {
      "id": "li",
      "name": "OrderLines",
      "hint": "Facts about an individual line within an order."
    }
  ],
  "items": [
    {
      "t": "Current customer contact number",
      "b": "cu",
      "why": "Contact information describes the customer rather than a particular purchased item."
    },
    {
      "t": "Current product description",
      "b": "pr",
      "why": "The description is shared across purchases of that product."
    },
    {
      "t": "Date the order was placed",
      "b": "or",
      "why": "One ordering date applies to the entire purchase in this model."
    },
    {
      "t": "Quantity of P12 purchased on line 2 of order 501",
      "b": "li",
      "why": "Quantity describes the specific order-product occurrence."
    },
    {
      "t": "Agreed unit price on line 2 of order 501",
      "b": "li",
      "why": "The sale price is historical transaction evidence, not today’s catalog price."
    },
    {
      "t": "Current customer display name",
      "b": "cu",
      "why": "A stable customer key lets the current name be maintained in one place."
    }
  ]
};

ACT.cleanCase = {
  "kind": "case",
  "label": "Mini case",
  "title": "The price that rewrote last month",
  "objective": "6.2",
  "how": "Study the hypothetical case and its invented figures. Make every decision to unlock the debrief; read the explanation for each option.",
  "brief": "A hypothetical equipment seller keeps only today’s price in Products. Its monthly revenue report joins old order quantities to that current price. After a price change, last month’s revenue appears to grow even though no additional sale took place. Finance suspects the database refresh.",
  "facts": [
    {
      "k": "Old sale",
      "v": "10 units at $20 each"
    },
    {
      "k": "Current price",
      "v": "$25 per unit"
    },
    {
      "k": "Report method",
      "v": "Quantity multiplied by current catalog price"
    }
  ],
  "exhibit": {
    "name": "Evidence to use",
    "caption": "Invented practice data for this case only.",
    "headers": [
      "Method",
      "Reported revenue"
    ],
    "rows": [
      [
        "Use the original agreed price",
        "$200"
      ],
      [
        "Use today’s catalog price",
        "$250"
      ]
    ]
  },
  "questions": [
    {
      "q": "Which fact is missing from the stored transaction?",
      "opts": [
        "The current product description.",
        "The agreed price on the order line.",
        "The customer’s current phone number.",
        "The latest warehouse refresh time."
      ],
      "a": 1,
      "why": [
        "The product description does not establish the amount the customer agreed to pay.",
        "Keeping the agreed unit price preserves the economic fact of that historical sale.",
        "A phone number helps contact the buyer but cannot reconstruct the sale amount.",
        "A refresh timestamp explains freshness, whereas the missing fact is the historical price."
      ]
    },
    {
      "q": "Why is keeping both prices reasonable?",
      "opts": [
        "Normalization requires two copies of each product.",
        "Different reports are allowed to invent different totals.",
        "The fields describe different facts at different times.",
        "The duplicate values will improve customer identity."
      ],
      "a": 2,
      "why": [
        "Normalization does not require copying every product; it separates facts according to meaning.",
        "Reports must explain their measures rather than invent totals to match departmental preferences.",
        "The current offer and the agreed historical sale price have distinct meanings and owners.",
        "Prices do not identify customers, so repeating them cannot repair an identity problem."
      ]
    }
  ],
  "debrief": "The report overstates this sale by $50, or 25% of the actual $200. The solution is to preserve the transaction’s agreed price, not to stop updating the catalog. A sound data model distinguishes current master data from historically meaningful event data."
};

ACT.cleanOrder = {
  "kind": "order",
  "label": "Sequence",
  "title": "Reconcile suppliers after a merger",
  "objective": "6.2",
  "how": "Move the steps into a defensible sequence using the arrow controls, then check.",
  "steps": [
    {
      "t": "Agree what identifies a supplier and who owns the shared definition.",
      "why": "This is a managerial decision about identity and responsibility."
    },
    {
      "t": "Profile both source lists and flag possible duplicates or conflicts.",
      "why": "Examine actual data quality before designing automatic matching rules."
    },
    {
      "t": "Review uncertain matches and assign shared supplier identifiers.",
      "why": "A similar name is evidence for review, not proof of identical organizations."
    },
    {
      "t": "Publish mappings and monitor corrections across dependent systems.",
      "why": "MDM continues after the initial merge because new records and changes keep arriving."
    }
  ]
};

