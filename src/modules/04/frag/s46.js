/* ===== s46 ===== */
PROSE.s46 = `
<span class="eyebrow">Application supplement 4&ndash;6</span>
<h2>The ecosystem behind a storefront, and the store on the street</h2>
<p class="lede">Putting something on sale online is not one decision but four: where the store lives, where customers come from, how the money moves, and who packs the box. This section takes them in order, then walks into a physical shop the same technologies reached.</p>

<div class="card"><p><b>Application supplement.</b> This section assembles the chapter&rsquo;s own Technology Today and Industry Analysis features, which sit outside the two learning objectives the supplied chapter carries. It is practice with chapter material, not a further objective.</p></div>

<h3>Four layers behind a storefront</h3>
<p>Competition and customer expectations have both risen, and almost nobody answers them alone. The chapter describes an ecosystem of key players supplying the infrastructure for online sales, payments and logistics &mdash; four layers, in the order a seller meets them.</p>
<ul class="keys">
<li><b>Storefront platform</b> &mdash; software that creates and manages the store itself, ranging from intuitive tools aimed at small and medium businesses to customizable stores that slot into a website a company already runs.</li>
<li><b>Marketplace</b> &mdash; somebody else&rsquo;s shopfront, which lends a seller an existing customer base and technology and connects a new listing with millions of shoppers on the day it goes up.</li>
<li><b>Payment provider</b> &mdash; the layer that takes the money: a widely trusted first mover, an integration a developer can shape, card readers for a small counter, or one-touch checkout on a phone.</li>
<li><b>Fulfillment provider</b> &mdash; warehousing, stock, shipping and returns handled by an outside firm, offering speed and scale without the upfront investment of a building and the staff to run it.</li>
</ul>
<p>Notice what each layer leaves standing. A platform builds the store but brings nobody to it, which is hardest for a fledgling business. A marketplace fills that gap, and rents it.</p>

<div class="activity" data-activity="ecoExplore"></div>

<p>Selling also requires having something to sell. Sourcing marketplaces, weighted heavily towards business-to-business trade, exist for that half of the problem: access to manufacturers, suppliers and markets abroad.</p>
<p>Nobody buys all four layers at once, and the order matters. The case below puts that sequence to a hypothetical maker of hand-thrown tableware who sells at craft fairs; the business and its figures are invented for practice.</p>

<div class="activity" data-activity="ecoCase"></div>

<h3>The store on the street</h3>
<p>Now the shop you can walk into. Decades ago, large chains installed computerized point-of-sale inventory systems: a bar code scan captures the sale and deducts the item from stock, so the retailer sees in real time what to reorder.</p>
<p>Two things follow from that scan. Checkout gets quicker and shelves run empty less often, which customers feel as satisfaction rather than as a system. Every later change moved the scan.</p>
<ul class="split">
<li>Self-checkout, saving time and labour cost</li>
<li>Scanning into the cart, paying at the counter</li>
<li>Tags read by radio at a distance</li>
<li>A store that watches the shelf instead</li>
</ul>
<p>A Swiss grocer built the second: customers scan into the cart, then pay at the counter. The third totals a full cart in about a second with no scanning, but only where an item is worth the cost of a tag.</p>
<p>The fourth skips tags entirely. Radar and computer vision detect what a customer takes off the shelf; the customer taps a card to enter, then leaves.</p>
<p>Payment changed on the shop floor too, in three directions.</p>
<ul class="keys">
<li><b>Multi-factor authorization</b> &mdash; more than one proof of who is paying, drawn from a card, phone, code, signature, fingerprint or face.</li>
<li><b>Chip and touchless cards</b> &mdash; the card carries a small processor rather than only a magnetic stripe, and it no longer has to be handed over or swiped.</li>
<li><b>Near-field communication</b> &mdash; the customer&rsquo;s phone and the retailer&rsquo;s terminal talk across a few centimetres, and the amount goes to the payment method already stored on the phone.</li>
</ul>
<p>Three journeys are worth setting side by side: a customer through such a store, the same customer online, and the case where the two meet. Each has a moment where the retailer learns, and one where it loses the sale.</p>

<div class="activity" data-activity="ecoDiagram"></div>

<h3>What the shop still has to answer</h3>
<p>That third journey has a name. In showrooming, a customer examines a product in person, then leaves to order it online for less. Storefronts cost billions to build and maintain, an online seller carries no such cost, and the store never recoups it.</p>
<p>Two large chains named in the chapter encouraged the comparison rather than fighting it: browse the shelves, check prices online, and they will match the price and add personal service, keeping the customer and selling something else alongside.</p>
<p>Other in-store technology pushes the same way. Fitting rooms use augmented reality to show how an item would look or to suggest something to go with it, and small radio beacons hand a shopper an offer while the goods are in front of them.</p>
<p>The chapter closes with three questions rather than answers. How can technology help a physical retailer compete with an online seller? How should it answer the criticism that tags track purchasing habits too closely? And how does a store avoid feeling sterile as people are replaced?</p>
<p class="takeaway">Every technology here moves work somewhere: to the customer, to a supplier, or to a sensor. The decision is not whether the work moves, but what the store puts in the place it left.</p>

<div class="activity" data-activity="ecoQuiz"></div>
`;

ACT.ecoExplore = {
  kind: "explore",
  label: "Explore",
  title: "The four layers, one at a time",
  how: "Open each layer and read all four facets before moving on; the sellers described in them are hypothetical.",
  objective: "4.6",
  labels: ["What it gives you", "What it costs you", "What it does not solve", "When to add it"],
  items: [
    {
      icon: "STORE",
      name: "Storefront platform",
      sub: "the store itself",
      what: "Pages, a catalogue, a cart and a checkout you did not have to build, on tools ranging from intuitive ones for small and medium businesses to customizable stores that fit an existing website.",
      real: "A running fee and a cut of each sale, plus the work of operating a shop that is genuinely yours to operate.",
      absent: "Nobody arrives because the store exists. Attracting customers to the site remains entirely your problem, and it is hardest for a business nobody knows yet.",
      why: "First, as soon as you want somewhere of your own to send people, and a customer list you keep rather than borrow."
    },
    {
      icon: "REACH",
      name: "Marketplace",
      sub: "somebody else&rsquo;s crowd",
      what: "An existing customer base and technology, connecting a listing with millions of shoppers on the day it goes up rather than in the year it takes to build an audience.",
      real: "A larger share of every sale, and a buyer who belongs to the marketplace rather than to you.",
      absent: "It does not make you findable among everything else listed there, and it does not hand you a relationship you can sell into again next season.",
      why: "When the store is ready but the traffic is not, or when a new product needs testing in front of demand that already exists."
    },
    {
      icon: "PAY",
      name: "Payment provider",
      sub: "the money moving",
      what: "Checkout that shoppers already trust: a widely accepted first mover, integrations shaped to fit a site, card readers for a small counter, or one-touch checkout on a phone.",
      real: "A percentage of each transaction, and a dependence on somebody else&rsquo;s rules about disputes, holds and account standing.",
      absent: "It does not judge whether a transaction is genuine, and it does not remove the merchant&rsquo;s exposure when a cardholder later disputes the sale.",
      why: "Before the first sale. Of the four layers this is the one no online seller gets to postpone."
    },
    {
      icon: "SHIP",
      name: "Third-party fulfillment",
      sub: "warehousing, packing, returns",
      what: "Warehousing, stock handling, shipping and returns run by a firm that already has the buildings, the vans and the people standing by.",
      real: "A fee for each unit stored and shipped, and much less direct contact with how the parcel actually arrives.",
      absent: "It does not fix a product people do not want, and it does not take your name off a delivery that turns up late or broken.",
      why: "When packing has outgrown the space and the hours available &mdash; the chapter&rsquo;s image of a successful seller outgrowing the garage."
    }
  ]
};

ACT.ecoCase = {
  kind: "case",
  label: "Mini case",
  title: "A potter decides how to go online",
  how: "Read the brief and the exhibit, then work the three decisions; the business, the routes and every figure below are hypothetical and invented for practice.",
  objective: "4.6",
  brief: "A potter makes hand-thrown tableware alone and sells it at craft fairs six weekends a year. Demand at the last two fairs outran what she brought. She wants to sell between fairs, has no customer list beyond a notebook of names, and packs every box herself at the kitchen table. She has to choose a route online before the next making season starts.",
  facts: [
    {k: "Made each month", v: "About 90 pieces, by one person"},
    {k: "Sold at fairs", v: "Around 60 pieces a month across the season"},
    {k: "Average price", v: "US$38 a piece"},
    {k: "Packing", v: "About 12 minutes a piece, boxed and labelled"},
    {k: "Breakage in transit", v: "Roughly 1 shipped piece in 20"}
  ],
  exhibit: {
    name: "Exhibit A &middot; four routes online",
    caption: "Four routes the potter is weighing, side by side. Every figure here is invented for practice rather than reported from any real seller or platform.",
    headers: ["Route", "Customers reached", "Fee taken per sale", "Who owns the customer", "Who packs"],
    rows: [
      ["Her own storefront on a platform", "Only the people she brings herself", "About 3% plus a monthly fee", "She does, with the email list", "She does"],
      ["A listing on a large marketplace", "Millions already shopping there", "About 15% of each sale", "The marketplace does", "She does, or the marketplace for a further fee"],
      ["Both together", "Both, and fair regulars land on the store", "Around 9% blended across the mix", "Split, and she keeps the store side", "She does, until volume outgrows the table"],
      ["Craft fairs only", "Whoever walks past the stall", "Stall rent, near 8% of takings", "She does, but face to face only", "Nobody: the buyer carries it home"]
    ]
  },
  questions: [
    {
      q: "She wants more sales than the fairs produce, without renting out her whole customer base permanently. Reading the exhibit, which route does it actually favour?",
      opts: [
        "Craft fairs only, because no platform stands between her and the buyer",
        "The marketplace listing alone, because that row reaches the most people",
        "Her own storefront alone, because that row keeps the customer relationship",
        "Both together, because one row supplies reach and the other keeps the list"
      ],
      a: 3,
      why: [
        "Nothing in that row is untrue: no platform sits between her and the buyer, and she keeps every name she meets. The customers-reached cell is what settles it, since only whoever walks past the stall six weekends a year can buy, which is the shortfall she is trying to fix.",
        "Reach without ownership is the marketplace bargain, and taken alone it hands the buyer to somebody else at the highest fee in the exhibit. It answers her sales problem and worsens the one she named about her customer base.",
        "The storefront row keeps the relationship, which is what she asked to protect, but its customers-reached cell says only the people she brings. That is the layer&rsquo;s known gap: a platform builds a store and brings nobody to it.",
        "Correct. The marketplace supplies the customer base the store cannot, while the store keeps a list she owns and converts the fair regulars, and the blended fee sits between the two rows rather than at either extreme."
      ]
    },
    {
      q: "Within a week of listing, marketplace orders arrive from people who have never heard of her. In the chapter&rsquo;s terms, what has she rented, and what does the marketplace keep?",
      opts: [
        "It lends warehouse space, and keeps the right to set her prices",
        "It lends a payment provider, and keeps the tax duty on each sale",
        "It lends its customer base and technology, and keeps the buyer",
        "It lends her reputation with shoppers, and keeps a share of stock"
      ],
      a: 2,
      why: [
        "Storage is a fulfillment service, which a marketplace may sell separately but is not what a listing itself provides. Pricing also stays with the seller here, so both halves of this option describe something other than the bargain she just made.",
        "A marketplace does route the payment, but the payment layer is a distinct part of the ecosystem, and a duty to collect tax attaches to the transaction and the jurisdiction rather than being handed over with a listing.",
        "Correct. The chapter describes marketplaces as lending an existing customer base and technology; the seller gets instant connection to shoppers, and the buying relationship stays with the marketplace rather than transferring to her.",
        "Reputation is a real benefit of listing somewhere trusted, but it is a by-product rather than the thing rented, and the marketplace takes a share of the sale price, not a share of the pieces she has made."
      ]
    },
    {
      q: "In the months between fairs, online orders settle at roughly 85 a month. At what moment does paying a third party to warehouse, pack and ship stop being an added cost and become the only way to grow?",
      opts: [
        "When the packing hours have started eating the hours she makes work in",
        "When a provider quotes a fee below what her own boxes and tape cost",
        "When she passes the monthly order count a provider treats as a minimum",
        "When breakages rise, since a warehouse packs more carefully than she can"
      ],
      a: 0,
      why: [
        "Correct. At twelve minutes a piece, 85 orders is about seventeen hours of packing a month, two full working days taken from the only person who can make the product. Fulfillment stops competing with her margin and starts competing with her output, which is the chapter&rsquo;s point about sellers outgrowing the garage.",
        "Comparing the fee against packaging materials leaves out the labour, which is the expensive part here and the part that cannot be bought back. On that comparison alone a third party will almost never look worth paying for.",
        "A provider&rsquo;s minimum tells her when she is allowed to buy the service, not when she needs it. Eligibility is a supplier&rsquo;s rule; the decision belongs to what her own hours are being spent on.",
        "Fewer breakages would be a genuine benefit and worth pricing, but it is an improvement to a service she is already delivering. It does not change what limits her growth, which is the time one person has."
      ]
    }
  ],
  debrief: "The exhibit looks like a fee comparison and is really a comparison of reach, ownership and time. Platforms build a store and bring nobody; marketplaces lend a customer base and keep the buyer; fulfillment converts hours back into making. That is the chapter&rsquo;s ecosystem read from the seller&rsquo;s side, and the same three columns apply well beyond tableware."
};

ACT.ecoDiagram = {
  kind: "diagram",
  label: "Compare",
  title: "Three journeys past the same shelf",
  how: "Step through each journey and read the points beneath it, watching for where the retailer learns something and where it loses the sale; the sellers pictured are hypothetical.",
  objective: "4.6",
  models: [
    {
      id: "instore",
      name: "A customer through a store with point-of-sale technology",
      site: "The scan is the moment the system learns that anything happened at all.",
      boxes: [
        {c: "a", t: "Walks in", w: "Nothing recorded yet; the shelf is doing the selling"},
        {c: "b", t: "Picks up the item", w: "Stock still reads whatever the last scan left"},
        {c: "c", t: "Scans at the counter", w: "Sale captured, item deducted, reorder signal raised"},
        {c: "d", t: "Taps to pay", w: "Terminal and phone settle against a stored method"}
      ],
      points: [
        "The retailer learns at the scan and not before it, so everything earlier in this journey is invisible to the inventory system.",
        "It can intervene at the shelf and at the counter, which is why staff, offers and impulse goods are placed at exactly those two spots.",
        "It loses the sale before the journey starts, when the item is not on the shelf. Reducing that is what real-time tracking was installed to do.",
        "Self-checkout and scan-into-the-cart move the scan earlier or onto the customer; a checkout-free store moves the learning moment to the shelf itself."
      ]
    },
    {
      id: "online",
      name: "The same customer online",
      site: "Every step is recorded, and every step is also a place to leave.",
      boxes: [
        {c: "a", t: "Arrives from a search", w: "The seller pays for that arrival one way or another"},
        {c: "b", t: "Fills a cart", w: "Recorded, and abandoned more often than not"},
        {c: "c", t: "Checkout", w: "The payment provider takes the sensitive part"},
        {c: "d", t: "Fulfillment", w: "Somebody else may pack the box being judged"}
      ],
      points: [
        "The retailer learns at every step, including the steps where nothing was bought, which is the sharpest difference from the aisle.",
        "It can intervene during checkout, which is why the number of fields asked for there is a commercial decision and not a technical one.",
        "It loses the sale in the cart: the chapter reports that more than half of online shopping carts are abandoned before payment.",
        "The parcel is the only physical contact in the whole journey, and it is the layer most often handed to a third party."
      ]
    },
    {
      id: "showroom",
      name: "Showrooming",
      site: "The store pays for the moment that convinces the customer to buy elsewhere.",
      boxes: [
        {c: "a", t: "Examines the goods", w: "In person, in the aisle, at the store&rsquo;s expense"},
        {c: "b", t: "Checks prices on a phone", w: "Comparing against sellers with no storefront to fund"},
        {c: "c", t: "Orders elsewhere", w: "The cost of the building is never recouped"}
      ],
      points: [
        "The retailer learns nothing at all here unless a member of staff asks, which is why the human element keeps reappearing in this argument.",
        "It can intervene only while the customer is still standing there, so the window is minutes long rather than days.",
        "It loses the sale at the phone, having already paid for the display, the space and the person who answered the question.",
        "Two large chains named in the chapter answer at the middle box instead: invite the comparison, match the price while the customer is still in the aisle, and sell something else alongside."
      ]
    }
  ]
};

ACT.ecoQuiz = {
  kind: "quiz",
  label: "Check yourself",
  title: "The chapter&rsquo;s three closing questions",
  how: "Four options, one best answer; read every explanation, including those for options you did not choose, and treat any store described as hypothetical.",
  objective: "4.6",
  questions: [
    {
      q: "A hypothetical chain finds customers examining goods in its aisles and then ordering the same items online for less. Which response matches the one the chapter describes as working?",
      opts: [
        "Match the online price at the counter and add service a screen cannot give",
        "Ask floor staff to discourage customers from comparing prices on their phones",
        "Reduce the range to items that online sellers tend not to stock at all",
        "Close the quieter branches and move that part of the budget into the website"
      ],
      a: 0,
      why: [
        "Correct. The chapter names retailers that embraced showrooming by inviting customers to browse and compare, then holding the sale with price matching and superior personal service, and selling additional products alongside it.",
        "Policing the phone treats the customer as the problem and removes the one advantage the store has left, which is that the customer is physically present and can be helped in the aisle.",
        "Narrowing the range is a real strategy in some categories, but it concedes the comparison rather than answering it, and it shrinks the reason a customer came into the building.",
        "Shifting budget online abandons the storefront the chapter says has already been paid for, and it puts the chain into direct price competition with sellers that never had that cost."
      ]
    },
    {
      q: "Privacy advocates object that tags read by radio let a retailer track purchasing habits closely. Which response addresses the objection rather than restating it?",
      opts: [
        "Note that the readings never leave the retailer&rsquo;s own systems and databases",
        "Say what is collected, offer a genuine opt-out, and kill the tag at the till",
        "Store the readings under a customer number instead of the shopper&rsquo;s name",
        "Explain that the tags exist to keep the shelves stocked, not to watch anyone"
      ],
      a: 1,
      why: [
        "Keeping data in-house is confidentiality, not consent. The objection is about a retailer building a record of somebody&rsquo;s habits, and that record is built whether or not anyone outside the company sees it.",
        "Correct. Disclosure, a real choice and deactivating the tag when the customer leaves the store together answer what is collected, whether the shopper agreed, and how long the tracking can continue.",
        "A number rather than a name makes the record pseudonymous, not anonymous: purchases still accumulate against one shopper, and a loyalty account or a card ties that number back to a person.",
        "Stating a purpose is not a control. An intention can be sincere and the data still be retained, combined with other records, or used later for something the shopper was never told about."
      ]
    },
    {
      q: "A hypothetical grocer replaces staffed counters with self-checkout and cuts floor staff. Sales hold, but shoppers call the place sterile. What does the chapter&rsquo;s third question ask the grocer to weigh?",
      opts: [
        "Whether the machines are quick enough to justify what the change cost",
        "Whether competing grocers have removed a similar number of counter staff",
        "Which moments customers actually want a person for, and staffing those",
        "Whether the savings are large enough to fund a further round of automation"
      ],
      a: 2,
      why: [
        "Speed was the original case for self-checkout and the machines here are presumably delivering it. The complaint is not about how long the queue takes, so a faster machine leaves it entirely unaddressed.",
        "What rivals have done sets a benchmark for cost, not for the experience in this store. Matching another grocer&rsquo;s staffing says nothing about which of these shoppers wanted help and did not get it.",
        "Correct. The chapter asks how a store avoids becoming too sterile as the human element is replaced, which is a question about placing people where they are wanted rather than about removing or restoring them wholesale.",
        "Funding more automation answers a finance question with the same move that produced the complaint, and it treats the savings as the goal rather than as one input into the decision."
      ]
    }
  ]
};
