/* Chapter 8 lesson and activity data. Rebuild with node src/build.mjs --module=modules/08. */
PROSE.s85a = "\n<span class=\"eyebrow\">Objective 8.5 · Part 1</span><h2>CRM strategy and its components</h2>\n<p class=\"lede\">With the changes the web introduced, in most industries a company’s competition is simply a mouse click away. A disappointed customer usually does not complain first. They leave, and the alternative is already open in another tab. That is why keeping the customer you have is generally worth more than closing the sale in front of you.</p>\n<h3>Keeping a customer is worth more than the next sale</h3>\n<p>In today’s highly competitive markets, customers hold the balance of power. If the service they receive disappoints them, they have many alternatives readily available. The reverse is also true. When a company satisfies its customers and solves their problems, those customers become less price sensitive. Leveraging and managing the relationship is as important as developing the product.</p>\n<p>Marketing researchers have found that winning back a customer who has gone elsewhere can cost many times what it costs to keep a current one satisfied. So companies work the relationship in three directions at once:</p>\n<ul class=\"keys\"><li><b>Widen</b> means attracting new customers, which is the expensive direction and the one most firms think of first.</li><li><b>Lengthen</b> means keeping existing profitable customers satisfied so the relationship continues instead of quietly ending.</li><li><b>Deepen</b> means transforming a minor customer into a profitable one by selling more of what actually fits them.</li></ul>\n<p>Customers are not only end consumers. In business-to-business trade the customer is another company, and B2B commerce is many times larger than the business-to-consumer kind. To work any of the three directions, a company has to know who its customers are and weigh each one’s <b>customer lifetime value</b>, the worth of the whole relationship rather than of this month’s order. Deepening a minor customer pays only when that figure says the effort is worth it.</p>\n<h3>CRM is a strategy, not a purchase</h3>\n<p>A <b>customer relationship management (CRM)</b> system supports that work, and the chapter is blunt about what CRM is. It is not simply a technology but a corporate-level strategy to create and maintain lasting relationships with customers, through reliable systems, processes, and procedures, by concentrating on downstream information flows. Downstream means toward the customer.</p>\n<p>Applications focused downstream have three objectives: attract potential customers, create customer loyalty, and portray a positive corporate image. Installed software delivers none of those on its own. A successful CRM strategy requires enterprise-wide changes:</p>\n<ul class=\"keys\"><li><b>Policies and business processes</b> have to reflect a customer-focused culture rather than a poster in the break room.</li><li><b>Customer service</b> needs key metrics that measure quality and satisfaction, plus process changes that improve the experience.</li><li><b>Employee training</b> has to give marketing, sales, and support one consistent focus on service and satisfaction.</li><li><b>Data collection, analysis, and sharing</b> must cover prospecting, sales, and support so the whole experience is tracked and shared.</li></ul>\n<p>There is a prior question too. Does this company need a comprehensive CRM system at all? The closer an organization sits to the end customer, and the larger its number of customers, the more value a CRM system provides. The strategy also has to weigh the ethical and privacy concerns of the customer data it collects.</p>\n<h3>The four components, and the job each one does</h3>\n<p>A comprehensive CRM system comprises four primary components. Read each as a job to be done, and notice that all four depend on one integrated system capturing data from retail stores, websites, social media, call centers, and the other channels a company uses.</p>\n<ul class=\"keys\"><li><b>Sales force automation</b> supports day-to-day selling: tracking opportunities, managing the sales pipeline, processing and tracking orders.</li><li><b>Marketing automation</b> manages campaigns and nurtures leads, deciding who is contacted, with which offer, and how often.</li><li><b>Customer service and support</b> handles cases and supplies knowledge bases, so an issue can be resolved on first contact.</li><li><b>Analysis and reporting</b> studies customer behavior and perceptions of quality, price, and satisfaction to segment customers and monitor performance.</li></ul>\n<div class=\"activity\" data-activity=\"crmSort\"></div>\n<h3>Choose by the job, not by the job title</h3>\n<p>Students reliably sort these four by who does the work, and that is the wrong cut. A marketing manager may be the first person to notice that two representatives are quoting the same buyer. The job is still pipeline visibility, so the component is sales force automation. The title of the person who noticed tells you nothing.</p>\n<p>Read the symptom instead, and ask what work would fix it:</p>\n<ul class=\"split\"><li>Two reps unknowingly chase one account: the pipeline is not shared, so this is sales force automation.</li><li>A customer who opted out receives the offer anyway: the send list is built wrong, so this is marketing automation.</li><li>Nobody can name the customers about to leave: nothing segments them, so this is analysis and reporting.</li></ul>\n<div class=\"activity\" data-activity=\"crmMatch\"></div>\n<h3>One customer, one record</h3>\n<p>Every component above assumes the company can find the customer. When the same buyer sits on file twice, once from the web store and once from a call center, each component degrades in its own way. Sales sees half a pipeline. Marketing mails the same person twice. Service opens a case without the history. Analysis counts one good customer as two ordinary ones.</p>\n<div class=\"activity\" data-activity=\"crmCase\"></div>\n<p class=\"takeaway\">CRM is the strategy; the four components are how that strategy shows up in somebody’s afternoon. Pick the component by the job that needs doing, and give it one record of the customer to work from.</p>\n";

ACT.crmSort = {
  "kind": "sort",
  "label": "Sort",
  "title": "Which component does this job belong to?",
  "objective": "8.5",
  "how": "Place each job in the CRM component whose work it is. Judge by the job, not by whose desk it lands on.",
  "buckets": [
    {
      "id": "sfa",
      "name": "Sales force automation",
      "hint": "The day-to-day work of moving a deal from an opportunity to an order."
    },
    {
      "id": "mktg",
      "name": "Marketing automation",
      "hint": "Deciding who is contacted, with which offer, and how often."
    },
    {
      "id": "svc",
      "name": "Customer service and support",
      "hint": "Handling a case the customer has already opened."
    },
    {
      "id": "anly",
      "name": "Analysis and reporting",
      "hint": "Measuring customers as a population rather than one at a time."
    }
  ],
  "items": [
    {
      "t": "Show every rep which accounts already carry an open quote",
      "b": "sfa",
      "why": "A shared view of the pipeline is what stops two people bidding for the same contract unbeknownst to each other."
    },
    {
      "t": "Track one opportunity from first contact through the closed order",
      "b": "sfa",
      "why": "Order processing and tracking, and managing accounts and opportunities, are the fundamental sales processes SFA automates."
    },
    {
      "t": "Run a six-week campaign and drop anyone who has opted out",
      "b": "mktg",
      "why": "Managing campaigns is marketing automation, and the contact preference has to be honored where the send list is built."
    },
    {
      "t": "Follow up with a lead who downloaded a guide but has not asked to buy",
      "b": "mktg",
      "why": "Nurturing a lead that is not ready to buy is exactly the work marketing automation exists to do."
    },
    {
      "t": "Answer a billing question on the first call without a transfer",
      "b": "svc",
      "why": "First-call resolution is case handling: addressing the issue during the first contact saves cost and raises satisfaction."
    },
    {
      "t": "Publish a searchable article so agents answer a repeat issue the same way",
      "b": "svc",
      "why": "Providing knowledge bases is named as customer service work, and it makes repeat answers consistent."
    },
    {
      "t": "Group customers by what each is worth over a lifetime",
      "b": "anly",
      "why": "Segmenting customers by value is analysis, not selling, and it tells the other components where to spend effort."
    },
    {
      "t": "Report which service failures pulled satisfaction scores down last month",
      "b": "anly",
      "why": "Analyzing customer perceptions of quality and satisfaction in order to monitor performance is reporting work."
    }
  ]
};

ACT.crmMatch = {
  "kind": "match",
  "label": "Match",
  "title": "A symptom and the component that addresses it",
  "objective": "8.5",
  "how": "Match each business symptom to the CRM component whose job it is, then check. Read why each pairing fits.",
  "pairs": [
    {
      "l": "Two reps quote the same buyer different prices in one week",
      "r": "Sales force automation",
      "why": "An integrated view of the pipeline shows the account already has an open opportunity before a second quote goes out."
    },
    {
      "l": "A customer who unsubscribed last month gets the promotion again",
      "r": "Marketing automation",
      "why": "The campaign decides who is contacted, so the opt-out has to be respected where the send list is assembled."
    },
    {
      "l": "A caller repeats the whole story to a third agent and still has no fix",
      "r": "Customer service and support",
      "why": "Case handling and a knowledge base carry the history and the answer, so the issue can close on first contact."
    },
    {
      "l": "Nobody can say which customers are quietly worth the most",
      "r": "Analysis and reporting",
      "why": "Segmenting customers and monitoring performance is what turns stored interactions into a lifetime-value picture."
    }
  ]
};

ACT.crmCase = {
  "kind": "case",
  "label": "Mini case",
  "title": "The buyer who is on file twice",
  "objective": "8.5",
  "how": "Study the hypothetical case and its invented figures. Make every decision to unlock the debrief; read the explanation for each option.",
  "brief": "Northgate Paper is a hypothetical wholesaler. One buyer, a small café group, was entered once by the web store and once by a call-center agent who spelled the name differently. Nobody has looked at the two records side by side until now, and the sales team is preparing a renewal quote.",
  "facts": [
    {
      "k": "Duplicate records",
      "v": "1 buyer, 2 customer IDs"
    },
    {
      "k": "Channels holding data",
      "v": "Web store, call center, sales spreadsheet"
    },
    {
      "k": "Open quotes on the account",
      "v": "2, priced $1.10 apart per case"
    },
    {
      "k": "History an agent can see",
      "v": "Whichever single record they opened"
    }
  ],
  "exhibit": {
    "name": "The two records, side by side",
    "caption": "Invented practice figures for this case only.",
    "headers": [
      "Past 12 months",
      "Record A",
      "Record B",
      "Combined"
    ],
    "rows": [
      [
        "Orders placed",
        "18",
        "11",
        "29"
      ],
      [
        "Revenue",
        "$41,200",
        "$26,800",
        "$68,000"
      ],
      [
        "Segment it falls in",
        "Mid",
        "Small",
        "Top"
      ],
      [
        "Promotional mailings sent",
        "6",
        "6",
        "12"
      ],
      [
        "Service cases closed",
        "4",
        "3",
        "7"
      ]
    ]
  },
  "questions": [
    {
      "q": "Treating Record A and Record B as two customers hides what?",
      "opts": [
        "That the sales team quotes a lower price than the web store does.",
        "That one buyer spent $68,000 and sits in the top segment.",
        "That the call center closed more cases than the sales team did.",
        "That the buyer placed fewer orders this year than it did last year."
      ],
      "a": 1,
      "why": [
        "The case shows two open quotes $1.10 apart but never says which channel set either price.",
        "Adding $41,200 and $26,800 gives $68,000 over 29 orders, so a top account is being read as two smaller ones.",
        "Seven closed cases across the two records says nothing about which team handled the greater workload.",
        "No prior-year figures appear in the exhibit, so a year-over-year decline cannot be read from it at all."
      ]
    },
    {
      "q": "Which change gives every channel one view of this buyer?",
      "opts": [
        "Merge the records under one customer ID every channel reads.",
        "Email the sales spreadsheet to the call center every Monday morning.",
        "Ask the buyer to route new orders through the web store instead.",
        "Print a monthly report listing records with similar names."
      ],
      "a": 0,
      "why": [
        "One identifier that the web store, call center, and sales team all read gives each of them the same account.",
        "A weekly copy still leaves two records, and the copy is stale the moment either channel takes an order.",
        "Steering the buyer to one channel leaves the two existing records in place, and buyers pick their own channel.",
        "A report names the duplicates for a person to read while orders and quotes keep posting to two accounts."
      ]
    },
    {
      "q": "The merge is done. Which statement about it is defensible?",
      "opts": [
        "A single record makes this account profitable by itself.",
        "A single record removes the need for customer-service metrics and training.",
        "A single record decides which of the two prices the buyer receives.",
        "A single record is one change; policy and training still follow."
      ],
      "a": 3,
      "why": [
        "Seeing the whole account does not change what the buyer is charged or what it costs to serve them.",
        "Customer-focused metrics and consistent training are part of the strategy, not chores the record retires.",
        "Pricing is a policy decision; the merged record shows both quotes but does not choose between them.",
        "An enterprise-wide strategy also changes policies, service metrics, training, and how data is collected and shared."
      ]
    }
  ],
  "debrief": "Two records looked like a data-entry annoyance. They cost Northgate a top customer's attention: 29 orders and $68,000 read as two ordinary accounts, 12 mailings to one buyer, and an agent seeing half the service history. One record fixes the view. It does not price the account, train the staff, or set the metrics, and that remaining work is the rest of the CRM strategy."
};
