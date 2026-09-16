/* Chapter 8 lesson and activity data. Rebuild with node src/build.mjs --module=modules/08. */
PROSE.s83a = "\n<span class=\"eyebrow\">Objective 8.3 · Part 1</span><h2>ERP core and extended components</h2>\n<p class=\"lede\">A customer calls a distributor and asks one question: can you ship 900 units by the 12th, and what will they cost? Answering it takes the warehouse, the production schedule, and the customer's unpaid balance. In a company running three separate systems that is three phone calls and most of an afternoon. An enterprise resource planning system exists so that it is one screen.</p>\n<h3>What integration actually means</h3>\n<p>An <b>enterprise resource planning (ERP)</b> system replaces standalone applications with modules built on a common database and similar application interfaces, serving the entire enterprise rather than portions of it. Data sitting on older legacy systems is converted into one large, central repository.</p>\n<p>Do not read too much into two of the three words. <b>Resource</b> and <b>planning</b> are partly misnomers, inherited from the manufacturing planning packages these systems grew out of; they do far more than plan or manage resources. The word carrying the meaning is <b>enterprise</b>.</p>\n<p>Integration is not several copies of a figure kept in step by a nightly job. It is one record, written once, read by every module that needs it. Inventory data is available not only to inbound logistics and operations but also to accounting, sales, purchasing, and customer service.</p>\n<p>That difference shows up in ordinary work rather than in the architecture diagram:</p>\n<ul class=\"keys\"><li><b>One version of a figure</b> means the quantity sales quotes and the quantity the warehouse picks are the same number.</li><li><b>A central repository</b> gives personnel accurate, up-to-date information without waiting on a nightly export between two systems.</li><li><b>A shared interface</b> keeps screen layouts and menus comparable across modules, so a transfer between departments is not a retraining project.</li><li><b>Configuration, not copying</b> adapts packaged software to how this company works, since the same product is sold to many different companies.</li></ul>\n<h3>The three core components</h3>\n<p><b>ERP core components</b> support the important internal activities of the organization for producing its products and services. The chapter names three of them, and each one owns a different kind of record.</p>\n<ul class=\"keys\"><li><b>Financial management</b> supports accounting, financial reporting, performance management, and corporate governance, including credit limits, billing, and incoming payments.</li><li><b>Operations management</b> simplifies, standardizes, and automates inbound and outbound logistics, product development, manufacturing, and sales and service.</li><li><b>Human resource management</b> supports recruitment, assignment tracking, performance reviews, payroll, and the regulatory requirements that come with employing people.</li></ul>\n<p>The three are not equals in the value chain. Operations management enables the core value chain activities, which are the making and the moving of the product. Financial management and human resource management are associated with the activities that support those core activities.</p>\n<div class=\"activity\" data-activity=\"erpcoreSort\"></div>\n<h3>Extended components face outward</h3>\n<p><b>ERP extended components</b> support the primary external activities of the organization, meaning the work of dealing with suppliers and customers. The chapter names two: supply chain management and customer relationship management. Each gets its own treatment later in the chapter.</p>\n<p>Supply chain management faces the supplier side of the business: what is coming, from whom, and when. Customer relationship management faces the buyer side: who this customer is, what they have bought, and what they have complained about. Both write into the same central database the core modules read.</p>\n<p>A short test tells you which side of the picture a module belongs on. Ask who outside the company has to see the record before the process can finish:</p>\n<ul class=\"keys\"><li><b>Nobody outside</b> needs to see it, so the record belongs to a core component such as payroll or the ledger.</li><li><b>A supplier</b> has to see it or supply it, which puts the record on the supply chain management side of the system.</li><li><b>A customer</b> is the other party to the history being kept, which places the record in customer relationship management.</li></ul>\n<div class=\"activity\" data-activity=\"erpcoreMatch\"></div>\n<h3>Where the price quotation lives</h3>\n<p>Here is the placement most students get wrong, so learn it deliberately. A <b>price quotation</b> is an operations management function. The chapter files it with the sales and warehouse operations that component covers, not with financial management and not with customer relationship management.</p>\n<p>The reason sits in what a quote actually is. A quote is a promise about what your company can allocate, build, and deliver, at a price it can honor. It is an operations question wearing a sales hat. Sales carries the quote to the customer; operations is what makes the quote true.</p>\n<p>The order-to-cash process at a wholesale distributor splits cleanly once you read it that way:</p>\n<ul class=\"keys\"><li><b>Operations management</b> handles price quotation, stock allocation, picking, packing, and shipping, which are sales and warehouse operations.</li><li><b>Financial management</b> handles the credit limit check, the billing, and the processing of the incoming payment.</li></ul>\n<p>Notice that the two components interleave inside one process. An order does not pass from operations to finance once and stop; it crosses back and forth between them. That is the argument for a shared database, stated in a single process.</p>\n<p>A real application is usually mixed. The screen a sales representative opens to build a quote may look like a sales tool, carry customer history in from the extended components, and price the line out of operations. One screen can still draw on several modules, because the records behind its fields are owned in different places.</p>\n<p>One further warning, about names. Vendors preconfigure their modules into industry solutions and then label them as they please, so the same function can appear under two different names in two systems. Work out what a module does with the data before trusting what it is called.</p>\n<div class=\"activity\" data-activity=\"erpcoreCase\"></div>\n<p class=\"takeaway\">Sort by the record, not by the job title of the person holding the phone. Core components own what happens inside the company, extended components own what crosses its edge, and the price quotation is an operations promise no matter who delivers it.</p>\n";

ACT.erpcoreSort = {
  "kind": "sort",
  "label": "Sort",
  "title": "Which component owns the record?",
  "objective": "8.3",
  "how": "Drop each job into the component that owns the record it depends on, then check. Read why each one lands where it does.",
  "buckets": [
    {
      "id": "fin",
      "name": "Financial management",
      "hint": "Core. Accounting, credit, billing, payments, corporate governance."
    },
    {
      "id": "ops",
      "name": "Operations management",
      "hint": "Core. Logistics, manufacturing, warehouse, sales and service operations."
    },
    {
      "id": "hr",
      "name": "Human resource management",
      "hint": "Core. Hiring, assignments, reviews, payroll, employment rules."
    },
    {
      "id": "ext",
      "name": "Extended components",
      "hint": "Outward facing. Supply chain management and customer relationship management."
    }
  ],
  "items": [
    {
      "t": "Quoting a price for 900 units",
      "b": "ops",
      "why": "A quote promises what can be allocated and delivered, so price quotation sits in operations management."
    },
    {
      "t": "Checking whether a buyer is under their credit limit",
      "b": "fin",
      "why": "The credit limit lives on the customer account, which financial management maintains along with billing."
    },
    {
      "t": "Allocating stock to a confirmed order",
      "b": "ops",
      "why": "Stock allocation is a warehouse operation and part of the operations side of order-to-cash."
    },
    {
      "t": "Sending the invoice after the truck leaves",
      "b": "fin",
      "why": "Billing is a financial management module, even though the shipment that triggered it was an operations event."
    },
    {
      "t": "Recording time and attendance for a packing shift",
      "b": "hr",
      "why": "Time and attendance feeds payroll, and workforce records are human resource management's responsibility."
    },
    {
      "t": "Scheduling next month's production run",
      "b": "ops",
      "why": "Production planning for make-to-stock and make-to-order work is supported by the operations management component."
    },
    {
      "t": "Running payroll and administering benefits",
      "b": "hr",
      "why": "Payroll and benefits administration are named directly as human resource management processes."
    },
    {
      "t": "Sharing a delivery forecast with a parts supplier",
      "b": "ext",
      "why": "The supplier sits outside the company, which makes this supply chain management, an extended component."
    },
    {
      "t": "Keeping a buyer's complaint history across channels",
      "b": "ext",
      "why": "Interaction history with a customer belongs to customer relationship management, the other extended component."
    },
    {
      "t": "Posting the quarter's results for the annual report",
      "b": "fin",
      "why": "Financial reporting and corporate governance are listed under the financial management core component."
    }
  ]
};

ACT.erpcoreMatch = {
  "kind": "match",
  "label": "Match",
  "title": "The question and the module that can answer it",
  "objective": "8.3",
  "how": "Match each business question to the component holding the record that answers it, then check. Read why each pairing fits.",
  "pairs": [
    {
      "l": "Can we promise 900 units by the 12th?",
      "r": "Operations management",
      "why": "Free stock and the production schedule live here, which is why a quote is an operations promise."
    },
    {
      "l": "Is this buyer close to their credit limit?",
      "r": "Financial management",
      "why": "The credit limit and the unpaid balance sit on the customer account that financial management maintains."
    },
    {
      "l": "Who is scheduled to staff the packing line Saturday?",
      "r": "Human resource management",
      "why": "Scheduling the workforce and tracking assignments are named as human resource management processes."
    },
    {
      "l": "When does the supplier's next shipment of housings arrive?",
      "r": "Supply chain management",
      "why": "The record belongs to a party outside the company, so it sits in the supplier-facing extended component."
    },
    {
      "l": "What went wrong on this buyer's last two orders?",
      "r": "Customer relationship management",
      "why": "Complaint and interaction history with a customer is the buyer-facing extended component's record."
    }
  ]
};

ACT.erpcoreCase = {
  "kind": "case",
  "label": "Mini case",
  "title": "One phone call, two modules",
  "objective": "8.3",
  "how": "Study the hypothetical case and its invented figures. Make every decision to unlock the debrief; read the explanation for each option.",
  "brief": "Rockfield Bearing Supply is a hypothetical wholesale distributor. On the 4th, a buyer calls asking for 900 units of part FB-70 delivered by the 12th, on open account, billed after shipment. The representative has to answer both halves of that request before quoting anything.",
  "facts": [
    {
      "k": "Enquiry",
      "v": "900 units of FB-70 by the 12th"
    },
    {
      "k": "Working days before the 12th",
      "v": "7, at 90 units produced per day"
    },
    {
      "k": "Terms requested",
      "v": "Open account, billed after shipment"
    },
    {
      "k": "Decision on the table",
      "v": "Quote it, refuse it, or quote it with a condition"
    }
  ],
  "exhibit": {
    "name": "What the system shows",
    "caption": "Invented practice figures for this case only.",
    "headers": [
      "Figure",
      "Amount"
    ],
    "rows": [
      [
        "Units on hand",
        "540"
      ],
      [
        "Units already allocated to other orders",
        "180"
      ],
      [
        "Units the line can make in 7 days",
        "630"
      ],
      [
        "Quoted price per unit",
        "$12.50"
      ],
      [
        "Credit limit on the account",
        "$15,000"
      ],
      [
        "Unpaid balance on the account",
        "$6,400"
      ]
    ]
  },
  "questions": [
    {
      "q": "How many units can Rockfield promise for delivery by the 12th?",
      "opts": [
        "360 units, because a promise covers the free stock sitting in the warehouse today.",
        "540 units, because that is the quantity the inventory record shows on hand right now.",
        "990 units, because 360 free units plus 630 made in seven days are available.",
        "1,170 units, because the 540 units on hand plus 630 from production is the total supply."
      ],
      "a": 2,
      "why": [
        "Free stock on its own ignores the 630 units the line can add before the delivery date.",
        "The 540 on hand includes 180 units already allocated elsewhere, so that figure overstates the supply.",
        "540 less the 180 allocated leaves 360 free, and seven days at 90 units adds 630.",
        "This double-counts the 180 units already promised to other buyers, overstating what is actually free."
      ]
    },
    {
      "q": "The order prices out at $11,250 and will be charged to the same account. What does financial management say?",
      "opts": [
        "It clears, because the $15,000 credit limit sits above the $11,250 order value.",
        "It stops, because $8,600 of credit remains against an $11,250 order.",
        "It clears, because the $6,400 balance is billed separately from this new order.",
        "It stops, because the $12.50 unit price is above what this account usually pays."
      ],
      "a": 1,
      "why": [
        "A credit limit applies to total exposure on the account, not to one order read in isolation.",
        "Subtracting the $6,400 balance from the $15,000 limit leaves $8,600, which is $2,650 short of the order.",
        "Open-account orders add to the same balance, so an unpaid invoice reduces what this order can draw.",
        "Nothing in the record ties a unit price to the credit decision; total exposure is what matters here."
      ]
    },
    {
      "q": "Which component owns the price quotation the representative is about to send?",
      "opts": [
        "Customer relationship management, since a quotation is part of the buyer's interaction history.",
        "Financial management, since a quotation commits the company to a price and a payment.",
        "Human resource management, since the representative writing the quotation is on the payroll.",
        "Operations management, since a quotation promises stock and capacity the company can deliver."
      ],
      "a": 3,
      "why": [
        "The history is stored there, but the quotation itself is placed under operations management.",
        "Financial management checks credit, bills, and takes payment; the quotation is an operations module.",
        "Payroll records the representative as an employee and has no bearing on pricing an order.",
        "A quote promises what can be allocated and shipped, which is exactly why it lives here."
      ]
    }
  ],
  "debrief": "Operations answered the date and financial answered the terms, and neither answer was usable alone. The honest quote is 900 units by the 12th with a deposit, a partial shipment, or a raised limit, because 990 units are available but only $8,600 of credit is. One shared record made that a single call rather than an afternoon of them."
};
