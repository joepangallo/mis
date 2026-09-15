FINAL = {
  "title": "Make the data decision",
  "how": "Answer every question, then score. These are hypothetical transfer situations. Results identify objectives to revisit; nothing is submitted.",
  "questions": [
    {
      "obj": "6.1",
      "q": "A gym’s membership records are accurate but reach the entry gate a day after renewals. Which data requirement fails?",
      "opts": [
        "The records lack sufficient historical volume.",
        "The data is too late for the entry decision.",
        "The gym has too many different data types.",
        "The renewal is a long-term strategic decision."
      ],
      "a": 1,
      "why": [
        "Historical volume does not resolve the delay between renewal and the immediate entry decision.",
        "A correct renewal is ineffective when it reaches the gate after the member needs access.",
        "Different data types may require transformation, but the stated failure concerns delivery timing.",
        "Admitting a currently entitled member is an operational decision about today’s access."
      ]
    },
    {
      "obj": "6.1",
      "q": "A manager studies six months of bookings to allocate next quarter’s staff budget. Which decision level best fits?",
      "opts": [
        "Operational execution of a single booking.",
        "Strategic selection of an entirely new industry.",
        "Tactical allocation of resources within the business.",
        "Data storage without a managerial decision."
      ],
      "a": 2,
      "why": [
        "The question spans future staffing resources rather than completing one current customer transaction.",
        "The manager is not changing the business’s long-term direction or entering another industry.",
        "The medium-term allocation of staff resources fits the tactical decision level.",
        "The manager uses stored records to make an explicit resource-allocation decision."
      ]
    },
    {
      "obj": "6.1",
      "q": "Two departments both use the label active customer but apply different eligibility rules. What must be resolved first?",
      "opts": [
        "Agree the definitions and label their differences.",
        "Increase the storage allocation for both departments.",
        "Choose a brighter chart color for each department.",
        "Copy both lists more frequently to a shared folder."
      ],
      "a": 0,
      "why": [
        "Shared meaning is required before counts can be compared or integrated responsibly.",
        "More storage keeps the conflicting definitions without making the resulting metrics comparable.",
        "Different chart colors cannot explain which people each department counts as active.",
        "Frequent copying transfers the disagreement more quickly without resolving the definition."
      ]
    },
    {
      "obj": "6.1",
      "q": "A city can plan bus frequency with aggregated passenger counts. What best supports responsible use?",
      "opts": [
        "Retain identifiable travel histories for potential later uses.",
        "Give every employee access to the raw journey logs.",
        "Treat a larger archive as evidence of better service.",
        "Use the needed counts and define access and retention."
      ],
      "a": 3,
      "why": [
        "Possible future usefulness does not by itself justify identifiable histories for this stated task.",
        "Broad employee access increases exposure without establishing a need tied to service planning.",
        "Archive size measures collection rather than whether riders receive an improved service.",
        "The defined decision can use aggregated counts with controls appropriate to that purpose."
      ]
    },
    {
      "obj": "6.2",
      "q": "A product catalog page displays the selected item using a reusable template. What provides its changing content?",
      "opts": [
        "A separate manually authored HTML file for every purchase.",
        "A query retrieves the selected product’s stored attributes.",
        "A warehouse must replace every current product record.",
        "The browser creates the product price without stored data."
      ],
      "a": 1,
      "why": [
        "Manual files are unnecessary when a template can use attributes retrieved for the selected product.",
        "A database query supplies product details that the template presents to the customer.",
        "A warehouse is not required to replace the operational catalog for this page request.",
        "Prices need an authoritative source rather than being invented by the display layer."
      ]
    },
    {
      "obj": "6.2",
      "q": "A student can enroll in several courses, and each course has many students. What relationship is present?",
      "opts": [
        "One-to-one, because every student has a unique ID.",
        "One-to-many, with no relationship in the reverse direction.",
        "Many-to-many, recorded through an enrollment table.",
        "No relationship, because the entities have different names."
      ],
      "a": 2,
      "why": [
        "A unique identifier does not restrict how many courses the student can take.",
        "Both sides permit multiple related instances, so the relationship is many-to-many.",
        "Enrollment records represent each student-course pairing and can hold relationship facts such as a grade.",
        "Different entity names do not prevent the business from relating their records."
      ]
    },
    {
      "obj": "6.2",
      "q": "Several invoices belong to customer C7. Which repetition is expected in a sound model?",
      "opts": [
        "C7 appears as a foreign key on several invoices.",
        "C7’s current address is edited independently on every invoice.",
        "Two customer rows share C7 as their declared primary key.",
        "An invoice uses a random customer identifier with no match."
      ],
      "a": 0,
      "why": [
        "Many invoices can legitimately reference the same customer through a repeated foreign-key value.",
        "Independent current-address copies invite inconsistency; historical invoice addresses would have a different stated meaning.",
        "A declared primary key must distinguish rows rather than identify two customer records identically.",
        "An enforced required relationship should not accept a reference to a nonexistent customer."
      ]
    },
    {
      "obj": "6.2",
      "q": "A shipping system drops the leading zero from postal code 02110. Which design choice is most appropriate?",
      "opts": [
        "Store it as a rounded measurement with two decimals.",
        "Remove the code because numeric fields cannot contain zeros.",
        "Use the number of deliveries as the postal-code field.",
        "Represent the code as text rather than an arithmetic quantity."
      ],
      "a": 3,
      "why": [
        "A postal code identifies a place and is not a measurement requiring rounding.",
        "Zero is valid in both text and numbers; the issue is preserving identifier formatting.",
        "Delivery counts describe a different fact and cannot substitute for a location identifier.",
        "Text preserves meaningful leading zeros because no arithmetic is required on the identifier."
      ]
    },
    {
      "obj": "6.2",
      "q": "An organization writes quantity must be positive in a data dictionary. What additional step makes the rule operational?",
      "opts": [
        "Print the dictionary with a larger heading.",
        "Enforce validation in the relevant data-entry paths.",
        "Copy negative quantities into a separate product name.",
        "Remove the quantity field from all business reports."
      ],
      "a": 1,
      "why": [
        "Typography may help readers, but it does not cause invalid records to be rejected.",
        "A documented policy needs actual validation where records enter or change in the system.",
        "Moving an invalid quantity into a name obscures the error and changes field meaning.",
        "Hiding a field in reports leaves invalid stored data available to other processes."
      ]
    },
    {
      "obj": "6.2",
      "q": "Each enrollment row repeats the instructor’s current office, and some rows now disagree. Which change addresses the update problem?",
      "opts": [
        "Create a second editable copy of the entire enrollment file.",
        "Sort enrollment rows by office before every report.",
        "Store current instructor details once and reference the instructor.",
        "Replace instructor IDs with office numbers in all enrollments."
      ],
      "a": 2,
      "why": [
        "Another editable copy adds places where office changes can become inconsistent again.",
        "Sorting changes presentation without changing how many copies require a coordinated update.",
        "Normalization gives the current office a clear home while relationships preserve enrollment context.",
        "An office is a mutable attribute and may not uniquely identify one instructor."
      ]
    },
    {
      "obj": "6.2",
      "q": "Two divisions disagree whether the same supplier appears in their purchasing systems. Who must lead resolution of its shared meaning?",
      "opts": [
        "Accountable business owners supported by the data team.",
        "The storage vendor acting without business input.",
        "Each division independently editing the other division’s data.",
        "The report designer choosing the shortest supplier name."
      ],
      "a": 0,
      "why": [
        "MDM requires agreement about identity and responsibility that technical matching alone cannot supply.",
        "A vendor cannot determine business identity and definitions without accountable organizational input.",
        "Uncoordinated cross-editing can create new conflicts and does not establish authoritative ownership.",
        "Name length is not evidence that two records represent the same supplier."
      ]
    },
    {
      "obj": "6.2",
      "q": "An analyst needs customer names alongside orders. What makes the join meaningful?",
      "opts": [
        "Matching whatever numeric columns happen to exist.",
        "Combining every customer with every order to show coverage.",
        "Sorting both tables alphabetically before combining rows.",
        "Matching the order’s customer reference to the customer key."
      ],
      "a": 3,
      "why": [
        "Unrelated numeric values can coincide without representing a legitimate business relationship.",
        "Every possible pairing invents customer-order relationships and inflates results beyond the source records.",
        "Alphabetical position is unstable and does not identify which customer placed an order.",
        "The defined key relationship connects the correct order to its customer’s descriptive details."
      ]
    },
    {
      "obj": "6.2",
      "q": "A manager wants only service cases open more than seven days. Which SQL clause expresses that filter?",
      "opts": [
        "ORDER BY to rename the selected fields.",
        "WHERE to restrict rows using the age condition.",
        "FROM to multiply the age of every case.",
        "SELECT to change stored case-closing dates."
      ],
      "a": 1,
      "why": [
        "ORDER BY arranges results and does not by itself restrict which cases are returned.",
        "WHERE selects the rows meeting the stated condition before they are presented.",
        "FROM identifies the source relation and does not perform the requested age filter.",
        "A SELECT retrieval does not change the stored dates of the source cases."
      ]
    },
    {
      "obj": "6.2",
      "q": "A dashboard shows a high return rate; the manager opens the transactions behind that rate. What is this?",
      "opts": [
        "A new transaction reserving inventory for an order.",
        "A scheduled report defined only by its delivery time.",
        "A drill-down from the summary into supporting detail.",
        "A data-type conversion that removes all return records."
      ],
      "a": 2,
      "why": [
        "The manager is investigating existing results rather than executing a new inventory transaction.",
        "The defining action is opening detail, not receiving a report at a predefined interval.",
        "Drill-down exposes the records or lower-level detail behind a summarized performance measure.",
        "The action neither changes field types nor removes source records from the system."
      ]
    },
    {
      "obj": "6.2",
      "q": "A travel site confirms a booking while many customers reserve other trips. What workload best fits?",
      "opts": [
        "OLTP handling concurrent current transactions.",
        "Historical OLAP examining ten years of travel trends.",
        "MDM negotiating what the company calls a traveler.",
        "A data lake cataloging raw photographs for research."
      ],
      "a": 0,
      "why": [
        "The site makes defined reads and updates to current booking records for concurrent users.",
        "Long-term travel analysis differs from processing the current reservation the customer is making.",
        "Definition agreement supports good systems but is not the booking-processing workload itself.",
        "Photograph storage is unrelated to committing this current reservation and its availability change."
      ]
    },
    {
      "obj": "6.2",
      "q": "A warehouse load maps two source date formats to an agreed format before insertion. Which ETL stage is that?",
      "opts": [
        "Extraction that retrieves the unchanged source rows.",
        "Loading that appends the already prepared result.",
        "Presentation that draws a chart from the results.",
        "Transformation that standardizes the meaning and format."
      ],
      "a": 3,
      "why": [
        "Extraction obtains source records; the described change happens after retrieving them.",
        "Loading writes prepared data to the destination rather than defining the conversion described.",
        "Chart presentation occurs after preparation and does not describe this source-format mapping.",
        "Transformation prepares data for the destination, including agreed conversions and quality checks."
      ]
    },
    {
      "obj": "6.2",
      "q": "Finance needs a limited analytical subset of a company’s integrated history. Which concept fits?",
      "opts": [
        "A live form for replacing every customer address.",
        "A data mart for the finance decision-support needs.",
        "An ungoverned archive with no defined business users.",
        "A duplicate primary key shared by all financial records."
      ],
      "a": 1,
      "why": [
        "A data-entry form supports record changes rather than providing a scoped analytical collection.",
        "A mart limits analytical scope to the relevant users and business questions.",
        "An undefined archive lacks the intended scope and governance of the requested resource.",
        "Shared duplicate primary keys would undermine identity instead of organizing finance’s analytical data."
      ]
    },
    {
      "obj": "6.3",
      "q": "A camera archive is large, but the urgent problem is reacting to alerts within one second. Which V names the deadline?",
      "opts": [
        "Variety of formats in the saved footage.",
        "Volume of the archive accumulated over years.",
        "Velocity of arrival and required use.",
        "The count of entities in the relational model."
      ],
      "a": 2,
      "why": [
        "Different formats concern variety, whereas the question highlights how quickly an action must occur.",
        "Archive size concerns volume, while the urgent constraint is the response time.",
        "Velocity includes the speed required to process and use data before the decision expires.",
        "Entity counts describe model structure rather than the three-V response-time characteristic."
      ]
    },
    {
      "obj": "6.3",
      "q": "An event document has named fields, a nested sensor object, and optional comments. Which description fits best?",
      "opts": [
        "Semistructured data with identifiable but flexible elements.",
        "A rigid row requiring every future event to match exactly.",
        "Meaningless data because its fields can be optional.",
        "A scheduled report defined by a weekly delivery time."
      ],
      "a": 0,
      "why": [
        "Named elements and nesting provide structure while optional fields permit variation across records.",
        "The described optional and nested fields do not require a fixed relational row shape.",
        "Flexibility does not eliminate meaning, though the field definitions still need governance.",
        "The question describes a record format rather than when a report is delivered."
      ]
    },
    {
      "obj": "6.3",
      "q": "A team chooses a document store for evolving order documents. What responsibility remains?",
      "opts": [
        "Prohibit any change in optional fields after launch.",
        "Treat every nested record as a separate physical server.",
        "Assume the product label proves every query will be faster.",
        "Define required fields, business rules, and access."
      ],
      "a": 3,
      "why": [
        "The reason for the design includes controlled evolution rather than banning every optional-field change.",
        "Nested structure describes document organization and does not imply a separate machine per element.",
        "Performance depends on the workload and implementation rather than the database category alone.",
        "Flexible documents still need coherent meanings, validation, and appropriate protection for their uses."
      ]
    },
    {
      "obj": "6.3",
      "q": "A team wants raw recordings, event messages, and tables for future approved analyses. Which option fits?",
      "opts": [
        "An undocumented folder granting unrestricted access to everyone.",
        "A governed data lake retaining the original formats.",
        "A form that overwrites each old value with the latest one.",
        "A rule that discards all records without numeric columns."
      ],
      "a": 1,
      "why": [
        "An undocumented unrestricted collection loses interpretability and increases exposure rather than meeting the need responsibly.",
        "A lake can preserve different original formats while a catalog and access controls maintain usability.",
        "Overwriting old values removes the historical material the team wants to preserve.",
        "Discarding nonnumeric content defeats the request to retain recordings and event messages."
      ]
    },
    {
      "obj": "6.3",
      "q": "Thousands of raw datasets have no owners, units, or source descriptions. What is the primary concern?",
      "opts": [
        "The warehouse has become too thoroughly normalized.",
        "The organization has solved its master-data conflicts.",
        "The lake is becoming difficult to interpret and trust.",
        "The data must be accurate because its volume is high."
      ],
      "a": 2,
      "why": [
        "The problem is missing governance and context, not evidence of excessive relational normalization.",
        "Missing owners and descriptions indicate unresolved management problems rather than completed coordination.",
        "A data swamp emerges when people cannot reliably discover and interpret the stored material.",
        "A large number of records cannot establish their meaning, origin, or accuracy."
      ]
    },
    {
      "obj": "6.4",
      "q": "Several firms already sell comparable subscriptions in the defined market and cut prices repeatedly. Which force is most directly evidenced?",
      "opts": [
        "Rivalry among existing competitors.",
        "The threat of future entrants only.",
        "The bargaining power of input suppliers.",
        "Technology development within the firm."
      ],
      "a": 0,
      "why": [
        "The observed behavior concerns price competition among firms already participating in the industry.",
        "Future entry concerns firms not yet competing and the barriers they would face.",
        "Input supplier leverage requires evidence about providers of resources to the focal firms.",
        "Technology development is a value-chain activity rather than one of the five outside forces."
      ]
    },
    {
      "obj": "6.4",
      "q": "A tutoring company loses demand because learners use self-study materials. Within a paid tutoring industry boundary, what does this illustrate?",
      "opts": [
        "A second branch of the same tutor is a supplier.",
        "The company’s employee records are a new entrant.",
        "Self-study is necessarily another identical tutoring firm.",
        "A substitute meets the underlying need differently."
      ],
      "a": 3,
      "why": [
        "A branch is not identified as an input provider merely because demand changes.",
        "Employee records are internal resources rather than firms entering the tutoring industry.",
        "Self-study changes how the need is met rather than providing another identical tutor.",
        "Learners can meet part of the learning need through a different approach."
      ]
    },
    {
      "obj": "6.4",
      "q": "A small group of clients controls most sales and can switch providers cheaply. Which pressure does this support?",
      "opts": [
        "Low rivalry proved by the presence of customer records.",
        "High buyer power supported by concentration and alternatives.",
        "High supplier power because clients purchase the final service.",
        "Low entry threat because client names are stored in tables."
      ],
      "a": 1,
      "why": [
        "Customer records do not establish how intensely existing providers compete with one another.",
        "Concentrated buyers with credible low-cost alternatives have leverage over price and terms.",
        "These clients buy the focal firm’s offering; input suppliers occupy a different role.",
        "The storage model for names does not establish barriers to entering the industry."
      ]
    },
    {
      "obj": "6.4",
      "q": "A specialist data provider is hard to replace because converting historical records takes months. Which response targets the dependence?",
      "opts": [
        "Add a second copy of its logo to reports.",
        "Judge the relationship only by last week’s uptime.",
        "Document exports and test migration to a credible alternative.",
        "Classify the provider as a buyer of the firm’s service."
      ],
      "a": 2,
      "why": [
        "Branding changes do not affect whether the firm can move away from the provider.",
        "Uptime measures service performance but does not measure replacement feasibility or switching cost.",
        "Tested portability and a viable alternative directly address the costly switching condition described.",
        "The provider supplies an essential input rather than buying the focal firm’s offering."
      ]
    },
    {
      "obj": "6.4",
      "q": "An analyst claims a purchased database prevents new firms entering. What evidence is most needed?",
      "opts": [
        "Barriers competitors cannot readily reproduce or acquire.",
        "The number of colors in the database vendor’s dashboard.",
        "The count of internal reports printed last month.",
        "A list of every employee who has a database login."
      ],
      "a": 0,
      "why": [
        "Entry barriers concern the difficulty of assembling a viable competing business, not merely owning software.",
        "Dashboard appearance does not establish difficulty or cost for an entrant to compete.",
        "Internal report counts do not demonstrate an obstacle confronting prospective competing firms.",
        "Login counts describe use within the company rather than barriers facing new firms."
      ]
    },
    {
      "obj": "6.4",
      "q": "Supplier selection uses price and quality histories; warehouse receiving scans the delivered items. Which activities are these?",
      "opts": [
        "Both are marketing and sales because products are involved.",
        "Both are service because suppliers provide a service.",
        "Inbound logistics first and procurement second.",
        "Procurement first and inbound logistics second."
      ],
      "a": 3,
      "why": [
        "Product involvement does not turn purchasing and receiving work into customer acquisition activities.",
        "Service in the value chain concerns maintaining customer value rather than every purchased service.",
        "Selection and purchasing precede physical receipt, so these two classifications are reversed.",
        "Procurement sources inputs, while inbound logistics handles their receipt and movement into the business."
      ]
    },
    {
      "obj": "6.5",
      "q": "A project releases $4,000 of estimated staff time per month and costs $1,000 monthly to operate. What is the careful interpretation?",
      "opts": [
        "It guarantees $4,000 of additional cash every month.",
        "It estimates $3,000 net capacity value, subject to realization.",
        "It eliminates the need to examine any one-time setup cost.",
        "It proves that the industry’s competitive rivalry has disappeared."
      ],
      "a": 1,
      "why": [
        "Staff time becomes cash benefit only when costs fall or additional valuable output results.",
        "Subtracting operating cost gives the estimate, while actual economic value still requires evidence.",
        "A recurring measure does not eliminate separate implementation costs from the investment decision.",
        "An internal efficiency estimate does not establish a change in industry competitive structure."
      ]
    },
    {
      "obj": "6.5",
      "q": "A pilot reduced total support hours during a month with fewer orders. What comparison best tests improvement?",
      "opts": [
        "Number of stored records in the new database.",
        "Number of meetings held during the implementation.",
        "Support hours per comparable order, with accuracy checked.",
        "The vendor’s forecast repeated as the observed result."
      ],
      "a": 2,
      "why": [
        "Stored record counts do not adjust for workload or establish that service became more efficient.",
        "Meeting counts describe activity rather than a measured improvement in the business process.",
        "A consistent denominator and an accuracy guardrail help evaluate whether the process actually improved.",
        "A forecast remains an expectation until the pilot’s outcomes provide supporting evidence."
      ]
    },
    {
      "obj": "6.5",
      "q": "Two proposed benefits are supplier selection and supplier negotiation. What should an analyst notice when asked for two distinct value-chain areas?",
      "opts": [
        "They both belong to procurement in the stated example.",
        "They must be two activities because two reports are used.",
        "They belong to service because a supplier serves the firm.",
        "They cannot use data because purchasing is a support activity."
      ],
      "a": 0,
      "why": [
        "Both tasks concern sourcing and purchasing inputs; two tools do not create two activity categories.",
        "The count of reports does not determine how the underlying business work is classified.",
        "After-sale service to the firm’s customers differs from sourcing inputs from its suppliers.",
        "Support activities can use data and create value just as primary activities can."
      ]
    },
    {
      "obj": "6.5",
      "q": "A pilot improves processing speed but increases incorrect shipments. Which rollout decision fits an explicit accuracy guardrail?",
      "opts": [
        "Expand immediately because a faster process is the stated goal.",
        "Stop recording shipment errors until the pilot period finishes.",
        "Count errors as a marketing opportunity without investigation.",
        "Investigate the errors and correct the cause before expansion."
      ],
      "a": 3,
      "why": [
        "Speed is not sufficient when the agreed guardrail requires maintaining correct shipment outcomes.",
        "Stopping measurement hides a material adverse outcome and prevents an informed rollout decision.",
        "Reframing errors does not resolve the operational failure or its cost to customers.",
        "A breached guardrail requires investigation and correction before extending the affected process."
      ]
    }
  ]
};
