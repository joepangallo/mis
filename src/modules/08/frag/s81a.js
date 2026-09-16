/* Chapter 8 lesson and activity data. Rebuild with node src/build.mjs --module=modules/08. */
PROSE.s81a = "\n<span class=\"eyebrow\">Objective 8.1 · Part 1</span><h2>Core business processes</h2>\n<p class=\"lede\">When you order a book online and it arrives two days later, you do not wonder which department checked your card, which one found the book on a shelf, or which one printed the label. You care that the right book arrived at the right price. The work still had to be divided among departments, and you still judged the whole thing as one event.</p>\n<h3>Customers buy outcomes, not departments</h3>\n<p>Companies are traditionally organized around five functional areas: marketing and sales, supply chain management, manufacturing and operations, accounting and finance, and human resources. Each owns well-defined functions such as sales forecasting, procuring raw materials and components, planning and budgeting, or recruiting and training. Drawn on a chart, they look like five independent silos.</p>\n<p>They are not independent. Most business processes cross the boundaries of those functions, so it helps managers to think in processes seen from a customer’s point of view rather than in departments. Three such processes are common to most organizations, and you should be able to name them before anyone mentions software:</p>\n<ul class=\"keys\"><li><b>Order-to-cash</b> covers everything from a customer’s order to the money landing in your bank account.</li><li><b>Procure-to-pay</b> covers acquiring goods from outside vendors, from negotiating terms to settling the vendor’s invoice.</li><li><b>Make-to-stock and make-to-order</b> cover producing the goods, and differ over whether production waits for an order.</li></ul>\n<h3>Order-to-cash: from a stranger to settled cash</h3>\n<p>Selling products or services is the main way a business generates revenue, so this is the process that pays for the others. At a large online retailer you create an account, add items to a cart, enter shipping and billing information, and submit the order. The seller confirms your address, checks your card, assembles and ships the order, and charges you.</p>\n<p>How long each step takes depends on the sale. A convenience store sale runs in seconds, and several of the subprocesses are not needed at all — creating a customer record, for one — although the clerk may still ask for a ZIP code. A large business-to-business order can take months or years and involve many more steps. The sequence itself is stubbornly similar. Put it in order before you read on.</p>\n<div class=\"activity\" data-activity=\"procOrder\"></div>\n<p>Each subprocess exists because something can go wrong without it, and the position of a step matters as much as the list:</p>\n<ul class=\"keys\"><li><b>Create a customer record</b> so later shipments, invoices, and disputes all attach to one identifiable buyer.</li><li><b>Check creditworthiness</b> before you promise anything, because goods shipped to a bad payer are a loss rather than a sale.</li><li><b>Create the order</b> to fix what was bought, at what price, and on which delivery terms.</li><li><b>Check and allocate stock</b> so that two orders are not promised the same unit on the same shelf.</li><li><b>Pick, pack, and ship</b> accurately, since a wrong item comes back as a return, a refund, and a dispute.</li><li><b>Prepare and send the invoice</b> promptly, because the clock on collection does not start until the bill arrives.</li><li><b>Collect the payment</b> to close the transaction, which is the step that finally turns all this work into cash.</li></ul>\n<p>An ineffective order-to-cash process is expensive in ordinary ways. Manual input of order information causes errors, and so do suboptimal picking and shipping. Those errors turn into a high rate of disputes to resolve, collection that drags, and eventually customers who defect. An effective one creates customer satisfaction, speeds up collection, and feeds clean inputs into business intelligence and machine learning applications.</p>\n<h3>Procure-to-pay: the same transaction from the other side</h3>\n<p>To sell anything, you first have to buy something. A large retailer manages tens of thousands of suppliers, places purchase orders, receives the products, allocates warehouse space, receives and pays invoices, and handles the disputes that follow. Those activities together are the procure-to-pay process.</p>\n<p>It has five subprocesses, and each one is a place where money leaks when it is handled loosely:</p>\n<ul class=\"keys\"><li><b>Negotiate price and terms</b> first, because everything downstream is priced by the agreement you sign here.</li><li><b>Issue the purchase order</b> so the vendor holds a written, numbered commitment to ship against.</li><li><b>Receive the goods</b> and record what actually arrived, not what the paperwork said would arrive.</li><li><b>Receive the invoice</b> and match it against the purchase order and the receipt before approving it.</li><li><b>Settle the payment</b> on the agreed terms, which is how a vendor decides whether to favor you next time.</li></ul>\n<p>Run this badly and error rates rise in purchase order and invoice processing, while the firm fails to develop close relationships with preferred vendors. Cost per transaction climbs, disputes multiply, and the most favorable conditions go to somebody else. Run it well and you obtain better conditions, reduce transaction costs, and earn the goodwill that comes from filling your own customers’ orders on time. Sort the work below into the process it belongs to.</p>\n<div class=\"activity\" data-activity=\"procSort\"></div>\n<h3>Make-to-stock and make-to-order: push and pull</h3>\n<p>The third core process produces the goods. In the <b>make-to-stock</b> process, goods are produced based on forecasts and stocked in a warehouse, and customer orders are then filled from inventory. This is a push-based approach: you build first and push the product out to buyers. Mass-produced goods such as television sets and home appliances are typically made this way.</p>\n<p>In the <b>make-to-order</b> process, raw materials, subcomponents, and accessories are still procured based on forecasts, but actual manufacturing does not start until an order is received; in extreme cases, even design and engineering wait. This is a pull-based approach, and it suits highly customizable or expensive low-volume goods such as custom furniture or commercial aircraft. The steps differ:</p>\n<ul class=\"keys\"><li><b>Make-to-stock runs</b> procure inputs, schedule production, produce, run quality control, and stock the finished product.</li><li><b>Make-to-order runs</b> process the sales order, design and engineer, procure inputs, schedule, produce, inspect, and ship.</li><li><b>What waits for the order</b> separates them: make-to-stock fills orders from inventory already in the warehouse, while make-to-order waits for the order before manufacturing starts.</li></ul>\n<h3>Where one firm’s sale is another firm’s purchase</h3>\n<p>Together, these core processes create supply chains. A supply chain resembles a river: raw materials start at the source and move downstream toward the end customer, transformed at each step. The term names the whole collection of companies and processes involved, from extracting raw materials through intermediate components to final production and delivery.</p>\n<p>Here is the part worth remembering. Within a supply chain, one company’s sales-related processes overlap with the downstream company’s procurement-related processes. The same shipment is order-to-cash on one side of the loading dock and procure-to-pay on the other. Two firms, two processes, one event.</p>\n<div class=\"activity\" data-activity=\"procCase\"></div>\n<p>The word “chain” is a little misleading. Companies procure from many upstream suppliers, who work with their own suppliers in turn, and downstream the products move to many different customers, so the flow is better described as a supply network. Because they depend on a steady source of key supplies, most companies seek long-term business-to-business relationships with a limited number of carefully selected suppliers rather than one-time deals, and they assess those suppliers on trustworthiness, commitment, and viability as well as on price and quality.</p>\n<p class=\"takeaway\">Learn the three processes as sequences, not as lists. A step performed out of position — shipping before the credit check, allocating stock before the order exists — costs real money. And the process that ends at your loading dock starts again as somebody else’s.</p>\n";

ACT.procOrder = {
  "kind": "order",
  "label": "Sequence",
  "title": "Order-to-cash, start to finish",
  "objective": "8.1",
  "how": "Move the subprocesses into the correct sequence using the arrow controls, then check. Read why each one sits where it does.",
  "steps": [
    {
      "t": "Create the customer record.",
      "why": "The buyer has to be identifiable before anything can be promised, shipped, or billed to them."
    },
    {
      "t": "Check the customer’s creditworthiness.",
      "why": "Deciding whether this buyer can pay belongs before you commit goods, not after they are gone."
    },
    {
      "t": "Create the order.",
      "why": "The order fixes what was bought, at what price, and on what terms for everyone downstream."
    },
    {
      "t": "Check and allocate stock.",
      "why": "Reserving specific items stops two orders from being promised the same unit on the shelf."
    },
    {
      "t": "Pick, pack, and ship.",
      "why": "Allocated stock can be picked, and only a picked order can be packed and dispatched."
    },
    {
      "t": "Prepare and send the invoice.",
      "why": "The bill describes goods that have actually shipped, which is why it follows dispatch."
    },
    {
      "t": "Collect the payment.",
      "why": "Cash closes the process, and the collection clock does not start until the invoice is out."
    }
  ]
};

ACT.procSort = {
  "kind": "sort",
  "label": "Classify",
  "title": "Which core process is this?",
  "objective": "8.1",
  "how": "Choose the best process for every item, then check your reasoning. You can revise and try again.",
  "buckets": [
    {
      "id": "o2c",
      "name": "Order-to-cash",
      "hint": "Selling to a customer and collecting the money."
    },
    {
      "id": "p2p",
      "name": "Procure-to-pay",
      "hint": "Buying from a vendor and settling the invoice."
    },
    {
      "id": "mto",
      "name": "Make-to-order",
      "hint": "Producing goods after a customer order arrives."
    }
  ],
  "items": [
    {
      "t": "Check a buyer’s creditworthiness before a shipment is promised.",
      "b": "o2c",
      "why": "Screening the customer protects a sale that has not yet been delivered or billed."
    },
    {
      "t": "Pick, pack, and ship items from the shelf on a confirmed sales order.",
      "b": "o2c",
      "why": "Fulfilling an accepted customer order sits in the middle of order-to-cash."
    },
    {
      "t": "Send the invoice and chase the balance until the cash arrives.",
      "b": "o2c",
      "why": "Invoicing and collecting the payment are the last two subprocesses of order-to-cash."
    },
    {
      "t": "Negotiate the price and terms that will apply to a vendor’s parts.",
      "b": "p2p",
      "why": "Negotiating terms with an external vendor is the first procure-to-pay subprocess."
    },
    {
      "t": "Issue a purchase order to a vendor for 400 replacement motors.",
      "b": "p2p",
      "why": "A purchase order is the buying firm’s written commitment to an outside supplier."
    },
    {
      "t": "Match a vendor’s invoice to the goods received, then release payment.",
      "b": "p2p",
      "why": "Receiving the invoice and settling it are the closing steps of procure-to-pay."
    },
    {
      "t": "Hold design and engineering until a signed customer order arrives.",
      "b": "mto",
      "why": "Waiting for the order before engineering is the extreme form of a pull-based approach."
    },
    {
      "t": "Inputs are bought against a forecast, but assembly waits for an order.",
      "b": "mto",
      "why": "Forecast-driven inputs with order-driven manufacturing is exactly the make-to-order pattern."
    },
    {
      "t": "Schedule a production run for one buyer’s configured machine.",
      "b": "mto",
      "why": "Production is scheduled around a specific existing order rather than a stock target."
    }
  ]
};

ACT.procCase = {
  "kind": "case",
  "label": "Mini case",
  "title": "The credit check that ran a day late",
  "objective": "8.1",
  "how": "Study the hypothetical case and its invented figures. Make every decision to unlock the debrief; read the explanation for each option.",
  "brief": "Ridgeway Kitchen Works builds stainless prep tables for restaurants. To shorten delivery times, the shipping desk began picking and shipping every order the afternoon it arrived and running the credit check the following morning. The same desk also began setting stock aside as soon as a salesperson phoned an order in, before the order itself was created. Sales rose. Ninety days later, the accounting clerk brought the collections report to the operations meeting.",
  "facts": [
    {
      "k": "What changed",
      "v": "Credit check moved to the day after shipping"
    },
    {
      "k": "Last quarter",
      "v": "200 orders, 42 of them shipped before the check"
    },
    {
      "k": "Average invoice",
      "v": "$5,200"
    },
    {
      "k": "Decision",
      "v": "Keep the faster sequence or restore the old one"
    }
  ],
  "exhibit": {
    "name": "Last quarter, by sequence",
    "caption": "Invented figures for this hypothetical case only. Unpaid value is counted at the $5,200 average invoice.",
    "headers": [
      "Measure",
      "Credit checked first",
      "Shipped first, checked later"
    ],
    "rows": [
      [
        "Orders",
        "158",
        "42"
      ],
      [
        "Unpaid after 90 days",
        "2",
        "9"
      ],
      [
        "Unpaid share of those orders",
        "1.3%",
        "21.4%"
      ],
      [
        "Value unpaid, at the average invoice",
        "$10,400",
        "$46,800"
      ],
      [
        "Average days to collect",
        "27",
        "58"
      ]
    ]
  },
  "questions": [
    {
      "q": "Unpaid orders ran 2 of 158 in the first column and 9 of 42 in the second, or 1.3% against 21.4%. Which statement explains why?",
      "opts": [
        "Collection was slower in the second column, at 58 days instead of 27.",
        "The second column contains 42 orders against 158 in the first.",
        "The credit check ran after the goods had already shipped.",
        "Both columns were invoiced at the same $5,200 average."
      ],
      "a": 2,
      "why": [
        "Slower collection is a second symptom of the same change, not the reason an invoice goes unpaid.",
        "Comparing 2 of 158 with 9 of 42 already corrects for the different number of orders in each column.",
        "A check that runs after the shipment cannot stop it, so a buyer over the limit keeps the goods.",
        "A figure shared by both columns cannot explain why the two columns turned out so differently."
      ]
    },
    {
      "q": "A table body is pulled from stock and set aside for a buyer who has not yet submitted an order. What does that do to the next real order for the same item?",
      "opts": [
        "It can be refused as out of stock while nothing has been sold.",
        "It is charged a higher price because the inventory now looks scarce.",
        "It is invoiced twice, once for the table body and once for its top.",
        "It moves into the procure-to-pay queue instead of the order-to-cash queue."
      ],
      "a": 0,
      "why": [
        "Stock allocated to an order that does not exist is unavailable to one that does, so a paying customer is turned away.",
        "Price comes from the terms agreed on the order, not from an internal allocation of a shelf item.",
        "One shipment produces one invoice; setting stock aside does not duplicate the billing document.",
        "Procure-to-pay covers buying from outside vendors, and reserving your own stock is not a purchase."
      ]
    },
    {
      "q": "Ridgeway buys its stainless sheet from a mill. The same shipment appears in both firms’ records. Which pairing describes it?",
      "opts": [
        "It is procure-to-pay for the mill and order-to-cash for Ridgeway.",
        "It is order-to-cash for both firms, because goods and cash each move.",
        "It is procure-to-pay for both firms, because each one settles an invoice.",
        "It is order-to-cash for the mill and procure-to-pay for Ridgeway."
      ],
      "a": 3,
      "why": [
        "This reverses the two sides, since the seller is the party collecting and the buyer is the party paying.",
        "Just one firm is collecting cash on this shipment; the other one is releasing it instead.",
        "Just one firm pays for this shipment, and the other is the party issuing the invoice.",
        "The mill is selling and collecting, while Ridgeway is purchasing and paying for the same goods."
      ]
    }
  ],
  "debrief": "Two lessons sit in this case. The position of a subprocess is part of the process: a credit check that runs after the truck leaves protects nobody, and stock allocated before an order exists blocks a sale that is real. And the same transaction wears two names, because the mill’s order-to-cash is Ridgeway’s procure-to-pay. That overlap is exactly where one firm’s supply chain joins the next one’s."
};
