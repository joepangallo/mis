/* ===== s45c ===== */
PROSE.s45c = `
<span class="eyebrow">Section 4&ndash;5c</span>
<h2>Card-not-present: chargebacks, screening, and fraud signals</h2>
<p class="lede">Two people are nervous in every online sale. The buyer is sending a card number to a seller they may know nothing about. The seller is taking one from somebody they cannot see. This section is the seller&rsquo;s half of that worry.</p>

<h3>Authorization is not identification</h3>
<p>Every card transaction is authorized by the issuer. Be exact about what that answer contains.</p>
<p class="takeaway">Authorization means the card was not reported lost or stolen. It does not mean the person placing the order is the cardholder.</p>
<p>In a <b>card-not-present</b> sale there is no imprint and no signature, so nothing establishes identity. One protection is time: the transaction date is the shipping date, which leaves a day or more to check. Sell a download and the window is gone.</p>
<p>Another is the <b>card security code</b>, the three-digit number on the back of the card and deliberately kept out of the magnetic stripe. A match implies the buyer held the card. Card company rules forbid storing it.</p>

<h3>Signals, scores, and the cost of being wrong</h3>
<p>A fraud-screening service turns an order into a <b>risk score</b>, and the merchant decides what that number is worth. The chapter names the variables it weighs.</p>
<ul class="keys">
<li><b>Address and telephone agreement</b> &mdash; whether shipping address, billing address and phone number match what the issuer holds.</li>
<li><b>Timing</b> &mdash; the hour the order arrived, read against the time zone the customer appears to be in.</li>
<li><b>Transaction volume</b> &mdash; how much is being bought, set against what this shop and this buyer normally do.</li>
<li><b>Network address</b> &mdash; the customer&rsquo;s address on the network and the geographic location it resolves to.</li>
</ul>
<p>The chapter also passes on one card network&rsquo;s published indicators; it names Visa. Two groups concern appearance: meaningless email strings at free providers, and addresses that disagree, reach high-risk destinations, or misspell street names.</p>
<p>The third is pattern: orders larger than usual, several of the same item, mostly big-ticket goods, repeated orders on one card, several cards shipping to one address, and overnight delivery, which shortens the seller&rsquo;s window.</p>
<p class="takeaway">None of these is a test. Each moves a score, and most describe enormous numbers of ordinary customers. The cost of refusing a real buyer &mdash; the sale, the margin, the customer &mdash; belongs beside the cost of fraud.</p>
<p>Below are single facts about one order. Decide which way each moves the score.</p>

<div class="activity" data-activity="rskSort"></div>

<h3>What a chargeback takes</h3>
<p>When a cardholder disputes a transaction the merchant is financially responsible, and issuers typically charge it back. The chapter counts that loss carefully, because sellers count only the first item.</p>
<ul class="keys">
<li><b>The transaction amount</b> &mdash; the money for the sale is pulled back, which is the loss most sellers think of first.</li>
<li><b>The merchandise</b> &mdash; the goods have already shipped and are rarely recovered, so the item goes with the payment.</li>
<li><b>The processing costs</b> &mdash; the fees paid to move the money are not returned when the sale is unwound.</li>
<li><b>The chargeback fee</b> &mdash; the bank charges for handling the dispute, and a high rate can raise fees further or close the merchant account.</li>
</ul>
<p>Minimizing chargebacks is therefore a first-order concern. Several common causes are not crime at all: unclear policies, vague descriptions, shipping terms nobody can find and prices in an unexpected currency. Those are answered by rewriting a store, not by screening a buyer.</p>

<h3>Two fears at one counter</h3>
<p>Screening also works better the more the checkout collects, and every extra field sends shoppers away without buying. The shopper on the other side has fears of their own.</p>
<p>An online customer hands much personal information to a sometimes unknown merchant. The chapter&rsquo;s advice to them lists what a store must get right.</p>
<div class="tbl-wrap"><table class="tbl">
<thead><tr><th>What a careful buyer checks</th><th>Why it matters</th></tr></thead>
<tbody>
<tr><td>The encryption indicator, before anything sensitive is sent</td><td>Card details should not travel in the clear</td></tr>
<tr><td>The privacy policy</td><td>It says what the seller may do with your data</td></tr>
<tr><td>The refund and shipping terms</td><td>They decide what happens when the parcel is wrong</td></tr>
<tr><td>Records, email and statements</td><td>An error is caught by whoever reads them</td></tr>
</tbody>
</table></div>

<p>The case below puts the apparatus on one morning of orders; the shop and its figures are invented.</p>

<div class="activity" data-activity="rskCase"></div>

<h3>When a signal fires</h3>
<p>The chapter offers two responses and no third: call the customer to verify the order, which it grants can be awkward for privacy, or reject it outright. A shop that does neither is guessing.</p>
<p>There is a market for help: fintech providers sell fraud detection, payment security, identity verification and regulatory compliance. A manager choosing among them weighs those against cost and ease of integration.</p>
<p>The simulation below follows one invented order to the change it eventually forces.</p>

<div class="activity" data-activity="rskSim"></div>

<h3>Two failures, two remedies</h3>
<p>The chapter&rsquo;s security feature follows a ticketing company through a bad year. Attribution matters: the customer figure it reports came from the group advertising the stolen data, and the antitrust matter was still before the courts.</p>
<ul class="keys">
<li><b>A breach of the records</b> &mdash; attackers took contact details, ticket sales and card data out of a database, which is a question about how data is stored, reached and monitored.</li>
<li><b>A takeover of the account</b> &mdash; attackers entered customer accounts and moved tickets out, which is a question about how a person proves they are the account holder.</li>
</ul>
<p>A shop that answers only one of those has answered half.</p>

<div class="activity" data-activity="rskQuiz"></div>
`;

ACT.rskSort = {
  kind: "sort",
  label: "Sort",
  title: "Which way does this move the score?",
  how: "Place each single fact about an order under what it does to a risk score; the orders described are invented for practice.",
  objective: "4.5",
  buckets: [
    {id: "up", name: "Raises the risk score", hint: "moves the order toward a call or a hold, without proving anything about anybody"},
    {id: "down", name: "Lowers the risk score", hint: "makes the order look more like the ordinary customers this shop already has"},
    {id: "flat", name: "Tells you nothing on its own", hint: "true of fraud and of very large numbers of honest buyers alike"}
  ],
  items: [
    {t: "Four orders today on four different cards, all delivering to one address", b: "up", why: "A single stolen card explains one order. Several cards converging on one delivery address in a short period is among the transaction patterns the chapter lists, and it is a shape ordinary households do not produce."},
    {t: "Overnight delivery requested on a large order from a first-time buyer", b: "up", why: "Fast shipping shortens the window the merchant has to verify anything and moves resellable goods quickly. It is also a service that impatient legitimate buyers pay extra for every day of the week."},
    {t: "Billing address in one country, shipping address in another, with a misspelled street name", b: "up", why: "The chapter names shipments to high-risk destinations and misspellings of common words or street names together. Neither settles anything: people travel, forward parcels to family, and mistype their own street."},
    {t: "Six of the same lens ordered at once, more than the shop usually sells in a month", b: "up", why: "Orders larger than normal and multiple items of the same type are both listed patterns, because quantity is easier to resell. A rental company placing a genuine order looks exactly the same."},
    {t: "The buyer&rsquo;s network address resolves to a country the shop rarely ships to", b: "up", why: "The customer&rsquo;s network address and its geographic location are among the variables a screening service weighs. Travellers, expatriates and anyone using a privacy service produce the same reading, so treat it as a nudge."},
    {t: "The delivery address is a hotel in a city the buyer does not live in", b: "up", why: "The chapter&rsquo;s figure shows a shipment to a public location as one of the flags an analyst notices. Professionals working away from home have parcels sent to hotels constantly, so it raises the score and settles nothing."},
    {t: "A meaningless string at a free mail provider, with nothing else unusual about the order", b: "up", why: "The published indicators name exactly this: a handle of meaningless characters at a free provider. It nudges the score up and does no more than that, because an enormous number of ordinary people pick a handle that means nothing to a stranger."},
    {t: "The card security code entered with the order matches", b: "down", why: "The code is not stored in the magnetic stripe, so a match implies somebody had the physical card in hand. That lowers the score without answering the question, because a stolen card is also a card in hand."},
    {t: "The buyer has ordered four times in two years and never disputed a charge", b: "down", why: "History with your own shop is one of the few signals that is about this person rather than about the shape of this order. It still cannot rule out an account somebody else has taken over."},
    {t: "Shipping address, billing address and telephone number all match the issuer&rsquo;s records", b: "down", why: "That match is the first variable the chapter lists for a screening service, and it genuinely lowers the score. It is also the easiest of the variables for a determined fraudster to satisfy."},
    {t: "The card issuer authorized the transaction", b: "flat", why: "Authorization means the card was not reported lost or stolen. It is not evidence about who is placing the order, so it belongs on neither side of a fraud score."},
    {t: "The shopper spent eleven minutes reading the shipping policy before checking out", b: "flat", why: "It feels reassuring, and it is not one of the variables a screening service weighs. Time on a page tells you about interest in the terms, not about who owns the card."}
  ]
};

ACT.rskCase = {
  kind: "case",
  label: "Mini case",
  title: "Five orders, one morning",
  how: "Read the brief and the exhibit, then make the three decisions; the shop, the buyers, the orders and every figure below are invented for practice.",
  objective: "4.5",
  brief: "You run a two-person shop selling professional camera equipment online. Orders leave the next afternoon, which gives you about a day to check anything that looks wrong. Five orders are pending this morning, the screening service has flagged three of them, and the goods on the table are worth more than a week of margin. You decide which ones ship.",
  facts: [
    {k: "What the shop sells", v: "Professional camera bodies, lenses and lighting"},
    {k: "Average order", v: "About US$1,600, at roughly twelve percent margin"},
    {k: "Loss on a chargeback", v: "The sale, the goods, the processing costs and a fee"},
    {k: "If the rate runs high", v: "The bank can raise fees or close the merchant account"},
    {k: "Verification window", v: "Orders leave the next afternoon, so about a day to check"},
    {k: "Repeat buyers", v: "Close to half of revenue; a refused regular rarely returns"}
  ],
  exhibit: {
    name: "Exhibit A &middot; This morning&rsquo;s pending orders",
    caption: "Five orders waiting on one morning. The shop, the buyers, the addresses and every figure here are invented for practice.",
    headers: ["Order", "Value", "Billing vs shipping", "Email", "Shipping", "Other detail"],
    rows: [
      ["A-101", "US$2,950", "Differ; ships to a hotel two states away", "First name and surname at a studio domain", "Overnight", "Returning buyer, five past orders, called ahead about a location shoot"],
      ["A-102", "US$310", "Match", "Surname at a free provider", "Standard", "Third small order this month from the same regular"],
      ["A-103", "US$1,240", "Match", "Surname and initials at a free provider", "Standard", "Fourth order today, each on a different card, all to this address"],
      ["A-104", "US$620", "Match", "A six-character string at a free provider", "Standard", "First order, one item, residential address"],
      ["A-105", "US$1,890", "Differ; marked as a gift to another surname", "First name and surname at a work domain", "Two-day", "Buyer has ordered each spring since two years ago"]
    ]
  },
  questions: [
    {
      q: "Which order should the shop hold this morning for a verification call before anything ships?",
      opts: [
        "A-101, because the goods go to a hotel on overnight service and the addresses differ",
        "A-103, because four cards in one day are shipping to a single address",
        "A-104, because the email address is a meaningless string at a free provider",
        "A-105, because the surname on the delivery address is not the buyer&rsquo;s"
      ],
      a: 1,
      why: [
        "Every feature here has an innocent reading, and this buyer supplied one before ordering: a returning customer shooting on location. Holding it risks refusing exactly the customer the shop most wants.",
        "Correct. One card can be stolen; four different cards converging on one delivery address in a day is the pattern the chapter names, and it is the only signal this morning that nothing else explains.",
        "Plenty of legitimate customers use free providers and choose a handle that means nothing to a stranger. This moves a score slightly and settles nothing by itself.",
        "Gifts ship under other people&rsquo;s names constantly, and this buyer has a two-year history with the shop. Treated as proof, this indicator would refuse a great deal of ordinary business."
      ]
    },
    {
      q: "The issuer authorized all five of these orders this morning. What has the shop actually learned?",
      opts: [
        "That the cards were not reported lost or stolen when the request was made",
        "That the person placing each order is the cardholder named on the card",
        "That the shop cannot be charged back for any of these five transactions",
        "That the card security code matched and the buyer was holding the physical card"
      ],
      a: 0,
      why: [
        "Correct. Authorization confirms that the card has not been reported lost or stolen and that the charge can be made; it says nothing whatever about who is typing the number.",
        "This is the misreading the chapter warns about most plainly. There is no imprint and no signature in a card-not-present order, so identity is never established by the authorization.",
        "Authorization does not settle liability. In a disputed card-not-present sale the merchant carries the loss, which is why the amount, the goods, the processing costs and the fee all land here.",
        "The security code is a separate check, and a match does suggest the card was in somebody&rsquo;s hand. A card in a thief&rsquo;s hand produces a matching code just as readily."
      ]
    },
    {
      q: "The shop considers refusing any order that matches one published indicator. What would that rule cost this business?",
      opts: [
        "Very little, since a card network published the indicators for exactly this purpose",
        "Four of the five orders here, most of them from customers who would have paid",
        "Only the chargeback fees the shop would otherwise pay on disputed orders",
        "Nothing measurable, because refused buyers usually come back and order again later"
      ],
      a: 1,
      why: [
        "The network publishes them as signals that move a score, not as tests. Applied as a rule they refuse the many ordinary customers who happen to share the same features.",
        "Correct. Mismatched addresses, a meaningless free-provider address, overnight shipping and a gift delivery flag four of these five orders, and three of those four read as ordinary customers whose refusal costs the sale, the margin and the buyer.",
        "Fees are the smallest number in the arithmetic. A refused genuine order costs the whole sale now and that customer&rsquo;s future orders as well.",
        "A refused buyer is far more likely to order from a competitor and remember why. The chapter&rsquo;s advice is to verify a doubtful order or reject it deliberately, not to refuse blind."
      ]
    }
  ],
  debrief: "This was card-not-present risk compressed into one morning. Authorization proves only that a card was not reported lost or stolen, indicators move a score rather than settle a question, and every refusal carries a cost of its own. The order that looked worst had an explanation waiting; the one that mattered was a pattern across orders rather than a feature of any single one."
};

ACT.rskSim = {
  kind: "sim",
  label: "Decide",
  title: "One order, from arrival to the fix",
  how: "Work the four decisions in the order the supplier faced them, and read every outcome afterwards, including the ones you did not choose.",
  objective: "4.5",
  intro: "A hypothetical supplier sells replacement parts for commercial refrigeration units online. One order arrives on a Tuesday evening and is still causing trouble two months later. Nothing here is a real company, a real buyer or a real dispute.",
  steps: [
    {
      situation: "A US$3,100 order for two compressor control units arrives at ten in the evening. Billing and shipping addresses differ, the buyer has asked for overnight delivery, and the screening service returns a middling score. Nothing can leave the building before tomorrow afternoon. What do you do first?",
      opts: [
        {t: "Decline the order. Two published indicators are present and the amount is well above average.", ok: false, out: "Two indicators are two signals, not a finding. Both of them describe large numbers of legitimate buyers, and the refusal costs the sale, the margin and probably the customer, who orders somewhere else tonight."},
        {t: "Ship it tonight to protect the delivery promise, and watch the account for a dispute.", ok: false, out: "This spends the only advantage the supplier had. The window exists precisely because the goods have not moved yet; once they have, the exposure is the amount, the merchandise, the processing costs and the fee."},
        {t: "Use the shipping window: check the security code, find earlier orders, and call the buyer.", ok: true, out: "Right. The transaction date is the date the goods ship, so a physical order comes with a verification window that a download would not have had. Spend it on the security-code result, this buyer&rsquo;s earlier orders and the number on the order; the chapter&rsquo;s two responses are to verify or to reject."},
        {t: "Ask the buyer to email photographs of the card and an identity document before anything ships.", ok: false, out: "That creates a file of sensitive images the supplier must now protect, and card rules already forbid keeping the security code. A call to the number on the order answers the same question and keeps nothing."}
      ]
    },
    {
      situation: "Nobody answers the call. An hour later the buyer emails an apology, confirms the order, and explains that the delivery address is a site office they are working out of this month. The security code matched, and two earlier orders sit under the same name. There is an hour to the shipping deadline.",
      opts: [
        {t: "Ship the order, and note on the record what was checked and what the buyer said.", ok: true, out: "Right. The email comes from the address the order supplied, so it confirms the order rather than the cardholder; what carries this call is the matching security code and two earlier orders under the same name. Refusing here would be a false decline."},
        {t: "Refuse anyway, because the addresses still differ and the shipping is still overnight.", ok: false, out: "The indicators have not changed, but what the supplier knows has. Refusing on a signal that is now explained is the reflex that loses good customers while leaving the fraud problem exactly where it was."},
        {t: "Ship only once the buyer changes the delivery address to match the billing address.", ok: false, out: "Nothing reaches a site office that way, and the buyer has already given a reason the supplier was able to check. It is a rule that looks strict, costs sales, and stops nobody who can simply order elsewhere."},
        {t: "Ship, and store the security code with the order so the next one clears faster.", ok: false, out: "Shipping is the right call; keeping the code is not. Card company rules prohibit merchants from storing it, and a stored code is worth more to an attacker than this order ever was."}
      ]
    },
    {
      situation: "Seven weeks later a chargeback arrives, and it is not fraud. The buyer says the control units were not the version shown on the product page and that they could not find how to return them inside the supplier&rsquo;s window. The money, the goods, the processing costs and a fee are all gone.",
      opts: [
        {t: "Write the loss off quietly, since a dispute this old is not worth the paperwork.", ok: false, out: "Writing it off keeps the loss and throws away the information. A supplier that never records why disputes happen cannot tell description problems from card fraud, and will keep buying the wrong remedy."},
        {t: "Block this buyer and refuse every future order with mismatched addresses.", ok: false, out: "The buyer here is a real customer with a complaint about the goods. Blocking them punishes the one person in the story who paid, and the address rule would refuse many more like them."},
        {t: "Ask the screening service why its risk score did not catch this order.", ok: false, out: "There was nothing there for it to catch. Screening estimates whether the cardholder authorized the purchase; it has no view at all of whether the product page described what shipped."},
        {t: "Answer the dispute with the order record, and log what actually caused it.", ok: true, out: "Right. Answer it with the record and the product page as it stood. The reason is the useful part: this dispute was produced by a product page and a returns window, not by a stolen card. The log is what tells you that once there are ten of them."}
      ]
    },
    {
      situation: "The supplier reviews a year of disputes. Roughly two thirds read like this one: descriptions, returns and shipping terms. The rest are card fraud. There is budget for one change this quarter. What gets it?",
      opts: [
        {t: "Buy a stricter screening tier and hold every order the score puts above the middle.", ok: false, out: "This buys more of a defence the supplier already has, aimed at the smaller share of its losses, and every extra hold adds delay and false declines for customers who were going to pay."},
        {t: "Rewrite the product pages, the returns window and the shipping terms on the site.", ok: true, out: "Right. The chapter is explicit that unclear store policies, product descriptions, shipping terms and currencies cause chargebacks and can be minimized through good web store design. Put them where a buyer sees them before paying: two thirds of this supplier&rsquo;s losses live there."},
        {t: "Require a verification call before shipping any order above a set value.", ok: false, out: "Calls are a reasonable tool for a doubtful order, and the chapter recommends them there. As a blanket rule they slow every large sale, irritate good customers, and still say nothing about the descriptions."},
        {t: "Stop shipping to any delivery address that does not match the billing address.", ok: false, out: "Gifts, offices, workshops and travelling buyers all fail that rule. It turns a signal into a policy, refusing a great deal of ordinary business to prevent a fraction of one third of the losses."}
      ]
    }
  ]
};

ACT.rskQuiz = {
  kind: "quiz",
  label: "Check yourself",
  title: "Chargebacks, screening, and false declines",
  how: "Four options, one best answer; read every explanation, including those for the options you did not choose. Any shop described is hypothetical.",
  objective: "4.5",
  questions: [
    {
      q: "An order is charged back to a hypothetical shop. Beyond the money for the sale, what else does the chapter say the merchant loses?",
      opts: [
        "The processing costs only, since the goods are returned to the seller",
        "The tax already remitted on the sale and the cost of the shipping label",
        "Nothing further, because the card issuer absorbs the merchandise loss",
        "The merchandise, the processing costs, and a chargeback fee"
      ],
      a: 3,
      why: [
        "Disputed goods usually do not come back, and even when they do the sale, the fee and the processing costs are gone. Treating a chargeback as a return understates it badly.",
        "Tax and postage are real costs, but they are not the list the chapter gives, and naming them misses the fee and the merchandise that make a chargeback expensive.",
        "The merchant is financially responsible for a disputed transaction, which is exactly why issuers charge it back to the merchant rather than absorbing the loss themselves.",
        "Correct. The chapter lists four losses at once, and adds that a high chargeback rate can bring higher bank fees or the closure of the merchant account."
      ]
    },
    {
      q: "A hypothetical shop adds five more fields to its checkout so the screening service has more to weigh. What does the chapter say it should expect?",
      opts: [
        "Better screening with no effect on how many shoppers finish the checkout",
        "Better screening and more abandoned carts, to be weighed against each other",
        "Weaker screening, because the extra fields give a determined fraudster more to imitate",
        "No change either way, since screening rests on the network address alone"
      ],
      a: 1,
      why: [
        "Lengthy checkout is one of the reasons the chapter gives for cart abandonment, alongside security concerns and comparison shopping. More fields is not a free improvement.",
        "Correct. The chapter says screening works best when the merchant collects as much data as possible, and that doing so may lead some customers to abandon their carts.",
        "Extra fields do not weaken a score; more variables generally sharpen it. The cost of collecting them is paid in abandoned carts rather than in accuracy.",
        "The network address is one variable among several, listed beside address agreement, timing and transaction volume. No screening service rests on that one alone."
      ]
    },
    {
      q: "A hypothetical seller decides to refuse every order whose billing and shipping addresses differ. What is the predictable result?",
      opts: [
        "Gift orders, office deliveries and travelling buyers are refused along with some fraud",
        "Fraud attempts fall and the refused orders turn out to be almost entirely fraudulent",
        "Chargebacks fall to almost nothing, because mismatched addresses cause most disputed transactions",
        "Nothing measurable changes, since the screening service already weighs the whole order"
      ],
      a: 0,
      why: [
        "Correct. An address mismatch raises a score and describes a great deal of ordinary business, so each refusal costs the sale, the margin and usually the customer as well.",
        "The rule cannot separate the two, because it never looks at anything else. It refuses the fraud that happens to match and every honest buyer who matches too.",
        "The chapter attributes many chargebacks to unclear policies, product descriptions, shipping terms and currencies. An address rule does nothing whatever about those.",
        "A hard rule overrides the score rather than joining it. Once orders are refused before the number is even read, the service&rsquo;s weighing decides nothing."
      ]
    }
  ]
};
