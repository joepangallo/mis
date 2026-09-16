/* Chapter 8 lesson and activity data. Rebuild with node src/build.mjs --module=modules/08. */
PROSE.s81b = "\n<span class=\"eyebrow\">Objective 8.1 · Part 2</span><h2>The value chain, and value systems between firms</h2>\n<p class=\"lede\">A business process crosses departments, so somebody has to say which department does the work and which one makes the work possible. The value chain is that map. Once you can place an activity on it, you can say what a system is actually for, and who feels it on a Tuesday afternoon when that system is wrong.</p>\n<h3>Core activities and support activities</h3>\n<p>A <b>value chain</b> is the set of an organization’s activities that add value to the end product, with information flowing through the functional areas that carry the business processes. The framework splits those activities in two, and that split is the whole point of it.</p>\n<p><b>Core activities</b> are performed by the functional areas that process inputs and produce outputs. <b>Support activities</b> are the activities that enable the core ones to take place. A shipping clerk moves a box toward a customer. A recruiter does not, but without the recruiter there is no clerk.</p>\n<p>Five core activities run left to right across the framework, in this order:</p>\n<ul class=\"keys\"><li><b>Inbound logistics</b> receives and stocks the raw materials, parts, and products arriving from suppliers and shippers.</li><li><b>Operations and manufacturing</b> transforms those stocked inputs into outputs, through order processing or the assembly of finished goods.</li><li><b>Outbound logistics</b> mirrors inbound logistics and handles distribution: picking, packaging, and shipping the finished end product.</li><li><b>Marketing and sales</b> covers presales work, including marketing literature, communication with customers, and the pricing of goods.</li><li><b>Customer service</b> covers post-sales work, from order status and invoices through repairs, questions, and tracked service requests.</li></ul>\n<p>That last group is worth naming carefully: <b>customer service activities</b> are a family of work rather than one desk. The split from marketing and sales is a timing split, not a topic split. Both groups talk to customers all day. Marketing and sales activities happen before the money changes hands; customer service begins once it has. A new price list is presales work; a question about an order that already arrived is post-sales work.</p>\n<div class=\"activity\" data-activity=\"chainDiagram\"></div>\n<h3>The five that make the five possible</h3>\n<p>Support activities sit beneath the whole core row, which is why the framework draws them as layers under all of it rather than as steps in a line. Each one answers a different question about how the core work gets done at all.</p>\n<ul class=\"keys\"><li><b>Administration</b> orchestrates day-to-day operations through the processes and decisions that span organizational functions and levels.</li><li><b>Firm infrastructure</b> is the buildings, machinery, and IS infrastructure components that everything else is implemented on top of.</li><li><b>Human resources</b> covers employee management: hiring, interview scheduling, payroll, and benefits, because primary activities need people.</li><li><b>Technology development</b> is the design, selection, and development of the applications that support the primary business activities.</li><li><b>Procurement</b> receives, approves, and processes requests for goods and services, then coordinates the actual purchase of them.</li></ul>\n<h3>Two placements people get wrong</h3>\n<p>The first is procurement against inbound logistics. Buying is not receiving. Procurement approves the request, combines it with other departments’ requests to earn a volume discount, and places the purchase order, so it is a support activity. Inbound logistics opens the crate, counts what came, and stocks it, so it is a core activity. The same box of parts touches both, a week apart.</p>\n<p>The second is firm infrastructure against technology development. Technology development is where an application gets designed, selected, and built. Firm infrastructure is the buildings, machinery, and network the finished application runs on. Neither of them is an application serving a customer: once the order entry screen goes live, the work it carries belongs to a core activity.</p>\n<div class=\"activity\" data-activity=\"chainSort\"></div>\n<h3>Value systems: where one chain ends, the next begins</h3>\n<p>Information can be streamlined inside one company and across company boundaries too. When firms connect their internal value chains so that information flows from one chain into the next, the result is a <b>value system</b>. Three firms in a row form one; add suppliers, partners, and consumers and it grows complicated quickly.</p>\n<p>A supply chain moves physical goods the way a river moves water, from a source toward a destination. A value system moves information along the same course, and its upstream and downstream information flows are named for who produced the information, not for the direction the paperwork travels:</p>\n<ul class=\"keys\"><li><b>Upstream information flow</b> is information a company receives from another organization standing further back along the value system, such as the confirmations and shipping notices a supplier sends it.</li><li><b>Downstream information flow</b> is information a company produces itself and sends along to the next organization in line, such as the delivery dates it passes to a distributor or a retailer.</li></ul>\n<p>A company in the middle does both. It receives information from its supplier, processes that information through its own value chain, and passes information downstream to its distributors and customers. Any information feeding into a company’s value chain counts as part of the value system, whether its source is another chain or an end consumer.</p>\n<div class=\"activity\" data-activity=\"chainCase\"></div>\n<p class=\"takeaway\">Ask two questions of any activity, and of any system that carries it. Does it process inputs into outputs the customer eventually receives, or does it make that work possible? And does the information it runs on come from inside this company or from somebody else’s chain? Those two answers place almost anything on the map.</p>\n";

ACT.chainDiagram = {
  "kind": "diagram",
  "label": "Interactive diagram",
  "title": "Walk the value chain, then leave the building",
  "objective": "8.1",
  "how": "Select each tab to see a different view of the framework. Read the boxes left to right, then the notes beneath them.",
  "models": [
    {
      "id": "0",
      "name": "The core row",
      "site": "Five activities that process inputs and produce outputs, in order.",
      "boxes": [
        {
          "t": "Inbound logistics",
          "w": "Receives and stocks arriving parts",
          "c": "a"
        },
        {
          "t": "Operations and manufacturing",
          "w": "Turns stocked inputs into outputs",
          "c": "a"
        },
        {
          "t": "Outbound logistics",
          "w": "Distributes the finished product",
          "c": "a"
        },
        {
          "t": "Marketing and sales",
          "w": "Presales: literature, contact, pricing",
          "c": "a"
        },
        {
          "t": "Customer service",
          "w": "Post-sales: status, invoices, repairs",
          "c": "a"
        }
      ],
      "points": [
        "Outbound logistics mirrors inbound logistics: the same picking, counting and paperwork, pointed the other way.",
        "The line between marketing and sales and customer service is the sale itself, not the subject of the conversation."
      ]
    },
    {
      "id": "1",
      "name": "The support layers",
      "site": "Five activities that enable the core row, drawn as layers beneath all of it.",
      "boxes": [
        {
          "t": "Administration",
          "w": "Decisions spanning functions and levels",
          "c": "b"
        },
        {
          "t": "Firm infrastructure",
          "w": "Buildings, machinery, IS components",
          "c": "b"
        },
        {
          "t": "Human resources",
          "w": "Hiring, scheduling, payroll, benefits",
          "c": "b"
        },
        {
          "t": "Technology development",
          "w": "Designing and selecting applications",
          "c": "b"
        },
        {
          "t": "Procurement",
          "w": "Approving requests, placing orders",
          "c": "b"
        }
      ],
      "points": [
        "A support layer is drawn beneath the whole core row because it enables the primary activities rather than performing one.",
        "Human resources is support work by definition: no primary activity happens without the people hired to perform it."
      ]
    },
    {
      "id": "2",
      "name": "One purchase, both halves",
      "site": "Follow a single box of parts and watch it cross the core and support line twice.",
      "boxes": [
        {
          "t": "Procurement",
          "w": "Support: approves and places the order",
          "c": "b"
        },
        {
          "t": "Inbound logistics",
          "w": "Core: receives the crate and stocks it",
          "c": "a"
        },
        {
          "t": "Operations and manufacturing",
          "w": "Core: builds the parts into product",
          "c": "a"
        },
        {
          "t": "Firm infrastructure",
          "w": "Support: the network under all of it",
          "c": "b"
        }
      ],
      "points": [
        "Procurement and inbound logistics handle the same parts about a week apart; buying them is not receiving them.",
        "Technology development wrote the receiving screen and firm infrastructure runs it, but neither one stocks a shelf."
      ]
    },
    {
      "id": "3",
      "name": "Three chains, one value system",
      "site": "Information leaves one company's chain and enters the next one's.",
      "boxes": [
        {
          "t": "Supplier’s value chain",
          "w": "Sends confirmations and shipping notices",
          "c": "c"
        },
        {
          "t": "Your value chain",
          "w": "Receives upstream, processes, sends downstream",
          "c": "a"
        },
        {
          "t": "Customer’s value chain",
          "w": "Receives your invoice and delivery data",
          "c": "c"
        },
        {
          "t": "Value system",
          "w": "The boundary drawn around all three",
          "c": "d"
        }
      ],
      "points": [
        "Information arriving from the supplier is an upstream flow; information sent to the customer is a downstream flow.",
        "The company in the middle does both: it receives from its supplier, processes the information, then passes it downstream."
      ]
    }
  ]
};

ACT.chainSort = {
  "kind": "sort",
  "label": "Classify",
  "title": "Put each job on the right activity",
  "objective": "8.1",
  "how": "Choose the value chain activity that owns each job, then check your reasoning. You can revise and try again.",
  "buckets": [
    {
      "id": "inb",
      "name": "Inbound logistics",
      "hint": "Core: receiving and stocking what physically arrives."
    },
    {
      "id": "msl",
      "name": "Marketing and sales",
      "hint": "Core: presales literature, contact, and pricing."
    },
    {
      "id": "csv",
      "name": "Customer service",
      "hint": "Core: post-sales help, after the money has changed hands."
    },
    {
      "id": "prc",
      "name": "Procurement",
      "hint": "Support: approving requests and placing the purchase order."
    },
    {
      "id": "tdv",
      "name": "Technology development",
      "hint": "Support: designing, selecting, and building applications."
    },
    {
      "id": "inf",
      "name": "Firm infrastructure",
      "hint": "Support: buildings, machinery, and IS components underneath."
    }
  ],
  "items": [
    {
      "t": "Scanning 40 pallets at the dock and updating on-hand counts",
      "b": "inb",
      "why": "Receiving arriving goods and stocking them is the core inbound activity, whatever software records it."
    },
    {
      "t": "Combining three departments’ purchase orders to earn a volume discount",
      "b": "prc",
      "why": "Procurement accumulates requests and consolidates them so the business can negotiate; it buys rather than receives."
    },
    {
      "t": "Approving a request for 4,000 more shipping labels",
      "b": "prc",
      "why": "Approving and processing a request for goods is procurement, a support activity, not the later receipt."
    },
    {
      "t": "Unwrapping the crate of shipping labels and stocking it",
      "b": "inb",
      "why": "The same labels are received here, which is core work, a week after procurement placed the order."
    },
    {
      "t": "Writing the code for the new order status page",
      "b": "tdv",
      "why": "Designing and developing an application is technology development, no matter which activity later uses it."
    },
    {
      "t": "Comparing two packaged order entry products before implementing one",
      "b": "tdv",
      "why": "Selecting packaged software sits inside technology development; procurement places the order once the choice is made."
    },
    {
      "t": "Replacing the warehouse network switches the scanners depend on",
      "b": "inf",
      "why": "Machinery and IS infrastructure components that other activities run on are firm infrastructure work."
    },
    {
      "t": "Installing terminals and cabling in the new packing hall",
      "b": "inf",
      "why": "Buildings and the equipment implemented in them facilitate both primary and support activities."
    },
    {
      "t": "Publishing the new price list before the season opens",
      "b": "msl",
      "why": "Pricing of goods and marketing literature are presales activities, performed before anyone has bought."
    },
    {
      "t": "Answering a question about an invoice for an order delivered last week",
      "b": "csv",
      "why": "The sale already happened, so this is post-sales contact and belongs to customer service."
    }
  ]
};

ACT.chainCase = {
  "kind": "case",
  "label": "Mini case",
  "title": "One crate of hinges, six activities",
  "objective": "8.1",
  "how": "Study the hypothetical case and its invented figures. Make every decision to unlock the debrief; read the explanation for each option.",
  "brief": "Pelham Grove Cabinetry is a hypothetical cabinet maker. A crate of 1,800 hinges arrived with the wrong screw pitch. Nobody checked the pitch at the dock, so 240 cabinets were built with those hinges and 155 of them shipped. Doors began sagging within a week, and the cost of one missed check showed up in six different places at once.",
  "facts": [
    {
      "k": "Defective hinges received",
      "v": "1,800"
    },
    {
      "k": "Cabinets built with them",
      "v": "240"
    },
    {
      "k": "Cabinets already shipped",
      "v": "155"
    },
    {
      "k": "Service calls in week one",
      "v": "61"
    }
  ],
  "exhibit": {
    "name": "Where the money went",
    "caption": "Invented practice figures for this case only.",
    "headers": [
      "Value chain activity",
      "What it had to do",
      "Cost"
    ],
    "rows": [
      [
        "Inbound logistics",
        "Recount and quarantine 1,800 hinges",
        "$1,400"
      ],
      [
        "Operations and manufacturing",
        "Rebuild 85 cabinets still on the floor",
        "$10,200"
      ],
      [
        "Outbound logistics",
        "Ship replacement doors to 155 homes",
        "$7,750"
      ],
      [
        "Customer service",
        "Handle 61 calls and book service visits",
        "$4,880"
      ],
      [
        "Procurement",
        "Re-source the hinges with a second supplier",
        "$2,100"
      ],
      [
        "Technology development",
        "Add a pitch field to the receiving screen",
        "$1,600"
      ]
    ]
  },
  "questions": [
    {
      "q": "The crate was accepted at the dock without anyone checking the screw pitch. Which activity owns that missed check?",
      "opts": [
        "Procurement, because it chose this supplier and placed the purchase order for the hinges",
        "Technology development, because it built the receiving application the dock crew works in",
        "Inbound logistics, because receiving and stocking arriving parts is its core work",
        "Firm infrastructure, because it maintains the scanners and the network used at the dock"
      ],
      "a": 2,
      "why": [
        "Procurement buys the hinges and negotiates the terms, but it does not open the crate or inspect it.",
        "Technology development builds the application; the check itself is performed by the activity that receives the goods.",
        "Inbound logistics receives and stocks arriving parts, so verifying what actually arrived belongs to it.",
        "Firm infrastructure supplies the machinery and network, not the decision to accept a delivery onto the shelf."
      ]
    },
    {
      "q": "Add up the exhibit: the six rows total $27,930. How much of that landed on core activities rather than support ones?",
      "opts": [
        "$27,930, because every row traces back to the same defective hinges",
        "$24,230, the total of the four core rows in the exhibit",
        "$3,700, the total of the two rows that enable the other work",
        "$22,830, the three rows that physically handled a finished cabinet"
      ],
      "a": 1,
      "why": [
        "Tracing every cost to one root cause does not turn a support activity into a core activity.",
        "Inbound logistics, operations, outbound logistics, and customer service are the core rows, totaling $24,230.",
        "Procurement and technology development are the support rows, so $3,700 is the support total, not the core one.",
        "This drops inbound logistics, which recounted and quarantined the hinges and is itself a core activity."
      ]
    },
    {
      "q": "Pelham Grove wants every pitch failure found at its dock to reach the supplier group that can correct the next run. Which change builds the value system link Pelham Grove needs?",
      "opts": [
        "Have the buyer telephone the supplier’s sales desk after every delivery arrives",
        "Keep the receiving inspection results in a spreadsheet on the receiving team’s shared drive",
        "Ask the supplier to send its own inspection certificate with every crate it ships",
        "Feed the receiving inspection results straight into the supplier’s own quality system"
      ],
      "a": 3,
      "why": [
        "A call reaches one person at a sales desk, so nothing lands in the supplier’s own records for its quality group to work from.",
        "A shared drive keeps the information inside this company’s own chain, where the supplier cannot act on it.",
        "That flow runs the other way, telling Pelham Grove what the supplier checked instead of telling the supplier what arrived wrong.",
        "Information produced here and fed into another company’s chain is what links two value chains into a value system, and it lands where the supplier’s quality group can act on it."
      ]
    }
  ],
  "debrief": "One defect, six activities, $27,930. The cost did not stay where the mistake happened, because a value chain passes work forward: a hinge accepted at the dock becomes a rebuilt cabinet, a second shipment, and a service call. Most of the money landed on core activities that were processing inputs into outputs, while the changes that prevent a repeat sit in the support activities beneath them."
};
