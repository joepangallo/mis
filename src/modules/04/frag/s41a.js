/* ===== s41a ===== */
PROSE.s41a = `
<span class="eyebrow">Section 4&ndash;1a</span>
<h2>What electronic commerce actually is</h2>
<p class="lede">Most people meet electronic commerce as a shopping site. The definition is wider and older than that, and the wider version explains why a business changes shape when it starts selling online.</p>

<h3>It started with the data, not the shopping</h3>
<p>In 1948 the United States Air Force in Europe was flying supplies into Berlin around the clock. The cargo mattered, and so did the information about it: what a shipment held, where it was, and when it would land.</p>
<p>To move that information the operation devised standard universal codes and sent them by teletype. Transactions between organizations became electronic there, in a records problem, decades before anybody bought anything from a web page.</p>
<p>The modern definition keeps that shape. <b>Electronic commerce</b> is electronic transactions over digital networks: the exchange of goods, services and money among firms, between firms and their customers, and between customers. Four parts of that sentence each do work.</p>
<ul class="keys">
<li><b>Electronic transactions</b> &mdash; the agreement, the money and the record all move as data rather than as paper handed across a counter.</li>
<li><b>Over digital networks</b> &mdash; the two parties never have to be in the same place, or awake at the same hour, for the exchange to complete.</li>
<li><b>Goods, services and money</b> &mdash; what is exchanged may be a physical object, something delivered entirely as data, or the payment itself.</li>
<li><b>Among firms, with customers, between customers</b> &mdash; all three directions are inside the definition, so one private seller trading with one private buyer counts.</li>
</ul>

<h3>More than the moment of payment</h3>
<p>Notice what the definition does not say: it does not say buying. Electronic commerce covers what leads up to a purchase and the service that follows it: a buyer who cannot find a specification never reaches the payment step. Sort the nine moments below into the part of the arc each belongs to.</p>

<div class="activity" data-activity="ecSort"></div>

<h3>Cutting out the middleman</h3>
<p>The internet and the web then widened all of that, and selling to individual consumers became practical. The web changed how firms create and capture value: a producer that once needed somebody else to reach buyers could now reach them itself, which broke business models that had been stable for a century.</p>
<p><b>Disintermediation</b> is the name for that: cutting out the middleman &mdash; the wholesalers and retailers that traditionally sat between a producer and its customers &mdash; and reaching customers directly. Airlines selling seats on their own sites are one example, and direct-to-consumer brands are another.</p>
<p>Selling direct is not the only outcome. Many producers who leave a wholesaler behind list inside an <b>electronic marketplace</b> instead &mdash; a shared venue such as Amazon or Etsy, where many sellers reach many buyers and an almost limitless range of services can be offered. It supplies the reach and charges for it.</p>
<p>Compare the three arrangements below, and watch who is carrying the cost of reaching the customer in each one.</p>

<div class="activity" data-activity="ecDiagram"></div>

<p>Whichever arrangement a producer ends up in, the middleman&rsquo;s work does not disappear along with the middleman. It moves, and a distributor usually does more than its invoice suggests.</p>
<ul class="keys">
<li><b>Reach</b> &mdash; it already sells to hundreds of shops, so a product arrives in front of buyers the producer has never met.</li>
<li><b>Stock and delivery</b> &mdash; it holds goods, consolidates orders and ships in bulk, which costs far less per unit than posting single parcels.</li>
<li><b>Money and risk</b> &mdash; it pays on invoice and carries the loss when a shop pays late or not at all, so the producer is not financing the sale.</li>
<li><b>Returns and questions</b> &mdash; it absorbs damaged goods, replacements and the enquiries that follow a sale, none of which reach the producer at all.</li>
</ul>
<p>Every one of those is work, and disintermediation hands it to the producer along with the margin. The case below is a hypothetical workshop weighing exactly that move, with invented figures.</p>

<div class="activity" data-activity="ecCase"></div>

<h3>Why an online presence stopped being optional</h3>
<p>Two properties explain why an online presence became a strategic necessity for most companies, and neither of them is about fashion.</p>
<ul class="keys">
<li><b>Market reach</b> &mdash; a site is open to anyone who can reach it, so the market is no longer only the people who can travel to a building.</li>
<li><b>Scalability</b> &mdash; serving the thousandth visitor costs far less than serving the first, so growth need not mean a matching increase in premises and staff.</li>
</ul>
<p>Neither property says the online route is cheaper to run. It is a different way to reach a market, and it arrives carrying all of the work the earlier list described.</p>
<p class="takeaway">Electronic commerce is not the payment. It is every electronic step from the first comparison to the last replacement, and disintermediation moves all of those steps &mdash; not only the margin &mdash; onto whoever now stands closest to the customer.</p>
<p>Three questions to test the definition, the term and the arc before you move on.</p>

<div class="activity" data-activity="ecQuiz"></div>
`;

ACT.ecCase = {
  kind: "case",
  label: "Mini case",
  title: "Sell direct, or keep the distributor?",
  how: "Read the brief and the exhibit, then take the three decisions in order; the workshop is invented for this exercise and every figure in it was made up for practice.",
  objective: "4.1",
  brief: "A two-person workshop makes one product, a hand-built bicycle pannier, and sells every unit to a single distributor that resells to bike shops. A developer has offered to build the workshop an online store of its own. The owners have to decide whether to sell direct as well, and they have one quarter of figures to reason from. The workshop is hypothetical.",
  facts: [
    {k: "The product", v: "One item, hand-built to order in small batches"},
    {k: "Route to market today", v: "Every unit goes to one distributor, which resells to bike shops"},
    {k: "What the distributor absorbs", v: "Stock, bulk shipping, invoicing, late payment, damaged goods, shop enquiries"},
    {k: "Who the workshop hears from", v: "The distributor only; it has never spoken to a rider"},
    {k: "The decision", v: "Open a direct online store alongside the distributor, or leave things as they are"}
  ],
  exhibit: {
    name: "Exhibit A &middot; One pannier, two routes",
    caption: "Per-unit economics for a single quarter, side by side. Every figure here is invented for practice and none of it is reported data.",
    headers: ["Line", "Through the distributor", "Selling direct"],
    rows: [
      ["Price the workshop receives", "US$48", "US$95"],
      ["Packing and shipping", "US$3 on a shared pallet", "US$11 per parcel"],
      ["Payment handling fee", "None; paid on invoice", "US$2.85 per order"],
      ["Returns and replacements", "Absorbed by the distributor", "US$4 averaged per unit"],
      ["Answering buyer questions", "Absorbed by the shops", "US$6 of staff time per unit"],
      ["Units sold last quarter", "410", "None; the store does not exist yet"]
    ]
  },
  questions: [
    {
      q: "Which comparison on the exhibit actually decides this, rather than merely looking decisive?",
      opts: [
        "The two prices received, since the direct figure is nearly double the other one",
        "The price received minus every cost listed in the same column, for both columns",
        "The packing and shipping line, since it is the cost that rises the most",
        "The payment handling fee, since it is a cost the workshop does not pay today"
      ],
      a: 1,
      why: [
        "The headline price is the most visible figure here and the least informative, because the distributor column pays for work that the direct column has to buy separately.",
        "Correct. Two lines in the distributor column read as absorbed rather than as zero, so the routes only become comparable once every cost in each column is taken off the price that column earns.",
        "Packing and shipping does rise, from a share of a pallet to single parcels, but it is one line among several and settles nothing on its own.",
        "The handling fee is genuinely new to the workshop, and it is also the smallest of the direct costs, so treating it as the deciding figure misreads the exhibit."
      ]
    },
    {
      q: "The owners agree the fully costed margin is better direct. What does disintermediating transfer to the workshop along with that margin?",
      opts: [
        "The distributor&rsquo;s work as well &mdash; stock, parcels, chasing payment, returns, questions",
        "The distributor&rsquo;s existing relationships with the bike shops that stock the product",
        "The risk of damage in transit, which now sits with the shipping carrier instead",
        "The distributor&rsquo;s buying data, which transfers with the account when it closes"
      ],
      a: 0,
      why: [
        "Correct. Every line the exhibit marks as absorbed is a task somebody still has to perform, and after the change that somebody is the workshop, which is most of why the margin is larger.",
        "Shop relationships belong to the distributor and do not travel. Selling direct reaches a different buyer entirely, and the shops may well treat the new store as competition.",
        "A carrier does take on some transit risk, but the workshop still replaces the damaged pannier and still answers the rider who received it, whatever the carrier eventually pays.",
        "The distributor has never shared its buying data, and an ended contract does not oblige it to. That data is precisely what the workshop has been missing all along."
      ]
    },
    {
      q: "Set the money aside. What does the direct route give the workshop that it has never had before?",
      opts: [
        "A lower cost of getting a single pannier into a buyer&rsquo;s hands than today",
        "Contact with the riders themselves, and a record of what they ask for",
        "Freedom from the fees that come with taking payment online",
        "An assurance that the total volume sold each quarter will rise"
      ],
      a: 1,
      why: [
        "Shipping single parcels costs the workshop more per unit than a share of a pallet did, so the cost of one delivery moves in the wrong direction here.",
        "Correct. The facts note that the workshop has never spoken to a rider; selling direct produces both the relationship and a record of what buyers want, and no distributor invoice contains either.",
        "Taking payment online adds a fee rather than removing one, and the exhibit prices it at a small but real amount on every direct order the workshop takes.",
        "Nothing here promises more units. The last row of the exhibit says the direct volume is untested, which is the largest unknown in the whole decision."
      ]
    }
  ],
  debrief: "This is disintermediation in miniature. Removing the middleman moves its margin to the producer and its work along with it, so an honest comparison prices both columns fully and then asks whether the direct volume even exists. What the workshop gains that no distributor ever gave it is the customer relationship and the data attached to it, which is the deeper reason an online presence became a strategic necessity rather than a cost saving."
};

ACT.ecDiagram = {
  kind: "diagram",
  label: "Compare",
  title: "Three routes from producer to customer",
  how: "Step through the three arrangements and read the notes under each; the roles are generic rather than any particular company.",
  objective: "4.1",
  models: [
    {
      id: "chain",
      name: "The chain before the web",
      site: "Each step buys from the one before it, adds a margin, and sells on.",
      boxes: [
        {c: "a", t: "Producer", w: "Makes the product"},
        {c: "b", t: "Wholesaler", w: "Buys in bulk, holds stock"},
        {c: "c", t: "Retailer", w: "Sells in ones and twos"},
        {c: "d", t: "Customer", w: "Known only to the retailer"}
      ],
      points: [
        "Each intermediary is paid for something real: reach, storage, credit and the work of selling in small quantities.",
        "The producer&rsquo;s own selling cost is low, because the two middlemen carry the cost of reaching the customer.",
        "The producer learns almost nothing about the buyer, since every conversation happens two steps away from it.",
        "Margin is lost at each handover, which is the figure that makes selling direct look attractive."
      ]
    },
    {
      id: "direct",
      name: "Disintermediated",
      site: "The producer sells straight to the customer over its own site.",
      boxes: [
        {c: "a", t: "Producer", w: "Makes, markets, ships, supports"},
        {c: "d", t: "Customer", w: "Buys from the producer itself"}
      ],
      points: [
        "Disintermediation removes the intermediaries and their margin, and hands the producer everything they were doing.",
        "The cost of reaching the customer now sits with the producer, as advertising, parcels, returns and support.",
        "In exchange the producer gains the relationship and the data, which the longer chain never allowed it.",
        "The chapter&rsquo;s examples are airlines selling seats on their own sites and the rise of direct-to-consumer brands."
      ]
    },
    {
      id: "platform",
      name: "Re-intermediated",
      site: "A different intermediary takes the place of the old one.",
      boxes: [
        {c: "a", t: "Producer", w: "Makes and ships the product"},
        {c: "b", t: "Online marketplace", w: "Finds the buyer, takes a cut"},
        {c: "d", t: "Customer", w: "Buys inside the marketplace"}
      ],
      points: [
        "The marketplace performs the old intermediary&rsquo;s function &mdash; reach and trust &mdash; and charges a fee for it.",
        "The producer still packs and ships, but the buyer arrives through somebody else&rsquo;s front door.",
        "Removing one middleman often installs another, because the work of finding buyers does not vanish with the wholesaler.",
        "Whether this is the better deal depends on the fee set against what reaching those buyers alone would cost."
      ]
    }
  ]
};

ACT.ecSort = {
  kind: "sort",
  label: "Sort",
  title: "Where in the arc does each moment sit?",
  how: "Place each moment in the part of the arc it belongs to; the buyers and sellers described are generic examples rather than real firms.",
  objective: "4.1",
  buckets: [
    {id: "before", name: "Before the sale", hint: "everything that helps a buyer decide, up to the moment of commitment"},
    {id: "during", name: "The transaction itself", hint: "the exchange of commitment and money, and the record that closes it"},
    {id: "after", name: "After the sale", hint: "everything the seller still owes the buyer once the money has moved"}
  ],
  items: [
    {t: "Comparing the specifications of two models side by side on a seller&rsquo;s site", b: "before", why: "Comparison is where most purchases are won or lost, and the definition covers it: electronic commerce includes the events leading up to a purchase, not only the purchase."},
    {t: "An email reminding a shopper about the basket they left without paying", b: "before", why: "The basket was abandoned, so no sale has happened. The reminder is an attempt to finish a purchase that is still ahead of the buyer rather than behind them."},
    {t: "A price quotation sent to a business buyer who asked what 200 units would cost", b: "before", why: "A quotation is an offer, not a sale. It is one of the pre-purchase events the definition covers, and a great deal of selling between organizations happens at this step."},
    {t: "The card network authorizing the amount as the buyer pays", b: "during", why: "Authorization is the moment the money is committed. It is the narrow event most people mean by electronic commerce, and it is the smallest part of the whole arc."},
    {t: "The order confirmation the buyer receives seconds later", b: "during", why: "The confirmation is the record that closes the exchange. The boundary is genuinely close here, so read it as the receipt belonging to the transaction rather than as later service."},
    {t: "A notice that the parcel has left the depot and will arrive on Thursday", b: "after", why: "Delivery tracking is service after the sale. The money has already moved, and the seller is now keeping a promise rather than trying to win one."},
    {t: "A printable label for returning an item that did not fit", b: "after", why: "Returns are the clearest post-sale obligation, and an awkward one is a common reason a buyer does not come back, which is why sellers treat returns as part of commerce."},
    {t: "A registration page for the two-year warranty on a repaired item", b: "after", why: "Warranty registration happens once the item is owned, and it exists to serve the buyer later on, which places it firmly on the far side of the sale."},
    {t: "A review left three weeks after delivery", b: "after", why: "The review is written long after the money moved, and it then feeds the comparison step of the next buyer, which is how the arc loops back to its own beginning."}
  ]
};

ACT.ecQuiz = {
  kind: "quiz",
  label: "Check yourself",
  title: "Definition, disintermediation, and the whole arc",
  how: "Four options, one best answer; read every explanation, including those for the options you did not choose, and treat any company described as hypothetical.",
  objective: "4.1",
  questions: [
    {
      q: "The chapter dates the foundations of electronic transactions between businesses to a 1948 airlift. What is the point of starting there?",
      opts: [
        "It was the first time goods were ordered and paid for without the two parties meeting",
        "The information about the cargo mattered as much as the cargo itself",
        "The military built the first computer network, which businesses later borrowed for trade",
        "Air freight made long-distance trade practical, which is what commerce had been waiting for"
      ],
      a: 1,
      why: [
        "Buying at a distance long predates 1948. Letters, telegrams and travelling agents had done it for centuries without any of it being electronic in the sense used here.",
        "Correct. The operation realised that what was in a shipment, where it had got to and when it would arrive mattered as much as the shipment, and devised standard universal codes to send those data by teletype.",
        "The airlift used teletype rather than a computer network. The internet arrived decades later and widened electronic commerce rather than founding it.",
        "Air freight matters to logistics, but the chapter is making a point about the data describing the cargo, not about the speed at which the cargo itself moved."
      ]
    },
    {
      q: "A regional airline closes its agency accounts and sells every seat through its own site. Which description fits what has happened?",
      opts: [
        "Re-intermediation: a different intermediary has taken the place of the old one",
        "An electronic marketplace: many sellers now trade seats inside one shared venue",
        "Disintermediation: the intermediary is gone and its work moves to the airline",
        "Scalability: the airline can serve more passengers without adding more staff"
      ],
      a: 2,
      why: [
        "Re-intermediation is what happens when a producer lists on a large marketplace instead. Here nobody new has taken up position between the airline and the passenger.",
        "An electronic marketplace hosts many sellers in one venue. The airline&rsquo;s own site offers only its own seats, which is a narrower arrangement than that.",
        "Correct. Cutting out the traditional intermediary and reaching customers directly is disintermediation, and the chapter names airlines selling direct as a prime example; the agents&rsquo; work now belongs to the airline.",
        "Scalability is one reason an online presence is attractive rather than a name for this change, and serving more passengers is not what removing the agents did."
      ]
    },
    {
      q: "A furniture maker&rsquo;s site publishes specifications, takes orders, tracks deliveries and issues return labels. The owner says only the payment step counts as electronic commerce. Why is that too narrow?",
      opts: [
        "Because the electronic record is the test, so tracking is inside it and returns are not",
        "Because a site with several functions counts as an electronic marketplace instead",
        "Because the payment step is run by a payment service rather than by the maker",
        "Because the definition also covers what leads up to a purchase and what follows it"
      ],
      a: 3,
      why: [
        "The site does record the tracking, but what the site logs is not the boundary. A return label the maker issues sits inside the definition just as firmly as the tracking page does.",
        "An electronic marketplace is a venue where many sellers offer to many buyers. One maker running one site does not become one by adding functions to it.",
        "Who operates the payment step is a separate question, and it would not narrow the definition even if an outside service handled every transaction on the site.",
        "Correct. Electronic commerce includes the events leading up to a purchase and the customer service after the sale, so the specifications, the tracking and the return labels are all inside it."
      ]
    }
  ]
};
