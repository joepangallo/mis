/* ===== s47 ===== */
PROSE.s47 = `
<span class="eyebrow">Application supplement 4&ndash;7</span>
<h2>Turning this chapter into an analysis</h2>
<p class="lede">An observation is not a diagnosis. A firm can count abandoned baskets, disputed payments and marketplace commission and still hold nothing anybody can act on, because a figure never says which pressure produced it. This supplement practises the move from counted evidence to one recommendation.</p>

<div class="callout info"><b>What this section is.</b> It is an application supplement rather than a textbook objective: it teaches no new framework, and it assumes you have already met the five competitive forces and the value chain. Everything here runs on a hypothetical firm, and it solves no graded case for you.</div>

<h3>The firm you are advising</h3>
<p>The firm below is hypothetical and every figure attached to it is invented. It is a regional supplier of laboratory and workshop consumables &mdash; gloves, glassware, abrasives, safety kit &mdash; that has sold on account against a purchase order for thirty years, to schools, clinics and small workshops.</p>
<p>Eighteen months ago it added a public website that takes cards, and a listing on a large marketplace. Take the case first. The explanation after it reads as the debrief of what you have just tried.</p>

<div class="activity" data-activity="anaCase"></div>

<h3>What this chapter supplies to the frameworks</h3>
<p>Each decision asked for the same two moves: name the pressure an observation belongs to, then say where in the firm a fix would land. A symptom is not a force. Six ideas from this chapter make that translation for you.</p>
<ul class="keys">
<li><b>Disintermediation</b> &mdash; when a maker sells direct to the end customer an intermediary disappears, which changes the threat of new entrants and the bargaining power of buyers rather than merely adding a channel.</li>
<li><b>Selling through a marketplace</b> &mdash; the marketplace lends you its customers and keeps the relationship, which makes it a supplier whose power over you grows with every order it carries.</li>
<li><b>Cart abandonment and checkout friction</b> &mdash; the point where a visitor stops is a marketing and outbound logistics problem inside the value chain, and payment choice sits in the same place.</li>
<li><b>Chargebacks, screening and false declines</b> &mdash; disputes are a service and operations cost, and the screening that reduces them turns paying customers away, so the same activity has a revenue side.</li>
<li><b>Compliance across jurisdictions</b> &mdash; consumer protection duties, tax obligations and intellectual property all sit in firm infrastructure, and that cost grows with every place the firm now reaches.</li>
<li><b>Showrooming</b> &mdash; price transparency turns a trade counter into a display case for a cheaper seller, which is buyer power acting on a firm that has already paid for the building.</li>
</ul>

<h3>Working the evidence yourself</h3>
<p>Naming the mapping is the point, and the naming has to start from something counted. That is the step readers skip, and the only one that produces facts somebody else can check. The sheet below holds the four channels the supplier sells through.</p>

<div class="activity" data-activity="anaFormula"></div>

<p>A conversion rate and a revenue figure tell you where the money is. They do not tell you what the marketplace listing leaves once its commission is taken, or where the disputes are concentrated. Those are questions for the order records, and this chapter gives you every reason to ask them.</p>

<div class="activity" data-activity="anaSql"></div>

<h3>The method, in four steps</h3>
<p>The analysis itself is short. Almost all of the difficulty lies in doing each step properly rather than in knowing what the steps are.</p>
<ol class="steps">
<li><b>Gather the evidence.</b> Collect what can be counted: prices, visits, orders, disputes, the fee each channel takes, the share of revenue each one carries.</li>
<li><b>Name the pressure.</b> Say which force is acting and on which side of the firm. The framework earns its keep here or nowhere.</li>
<li><b>Locate the fix.</b> Put the pressure somewhere in the value chain, because that is what turns a diagnosis into a place where work can actually be done.</li>
<li><b>Recommend one thing.</b> Say what it changes, what it costs, and what you would watch afterwards to know whether it worked.</li>
</ol>
<p>What separates a strong version of each step from a weak one is small and repeatable, which is why the two are worth seeing side by side.</p>
<div class="tbl-wrap"><table class="tbl">
<thead><tr><th>Step</th><th>Weak version</th><th>Stronger version</th></tr></thead>
<tbody>
<tr><td><b>Gather</b></td><td>&ldquo;Online competition is intense.&rdquo;</td><td>The delivered price of one comparable case of gloves, set beside your own list price.</td></tr>
<tr><td><b>Name</b></td><td>&ldquo;Customers are leaving the basket.&rdquo;</td><td>&ldquo;Buyer power is high, because comparing prices costs the customer nothing.&rdquo;</td></tr>
<tr><td><b>Locate</b></td><td>&ldquo;We need better technology.&rdquo;</td><td>&ldquo;The loss happens at checkout: marketing and sales, and outbound logistics.&rdquo;</td></tr>
<tr><td><b>Recommend</b></td><td>Three initiatives, none of them costed.</td><td>One initiative, with what it changes, what it costs and how you would tell.</td></tr>
</tbody>
</table></div>

<div class="activity" data-activity="anaSim"></div>

<h3>The comparison summary</h3>
<p>The last piece is a short written comparison, 150 to 200 words, against a company you choose. It is not a profile of that company. It is a lesson drawn back to the firm you are advising.</p>
<p>Three things make it work: pick a comparison with a real similarity or a real contrast; name what that company does differently in the vocabulary of the frameworks; and end on what your firm should therefore do, or deliberately refuse to do.</p>
<p class="takeaway">A summary that spends its 200 words admiring somebody else has answered a different question. Every sentence should be recoverable as advice to the firm in front of you.</p>

<div class="activity" data-activity="anaReady"></div>
`;

ACT.anaCase = {
  kind: "case",
  label: "Mini case",
  title: "Two new channels, one initiative",
  how: "Read the brief and the exhibit, then take the three decisions in order; the supplier and every figure attached to it are hypothetical, invented for this exercise.",
  objective: "4.7",
  brief: "A regional supplier of laboratory and workshop consumables has sold gloves, glassware, abrasives and safety kit for thirty years, almost all of it on account against a purchase order. Eighteen months ago it added a public website that takes cards and a listing on a large marketplace. Both channels sell, and both carry costs, risks and duties the account book never had. The owners can fund one initiative this year. The firm is hypothetical and its figures are invented.",
  facts: [
    {k: "The firm", v: "A regional supplier of laboratory and workshop consumables"},
    {k: "Sells to", v: "Schools, clinics, repair shops and small manufacturers"},
    {k: "Sells through", v: "Account orders, a trade counter, its own website, a marketplace listing"},
    {k: "What changed", v: "The two online channels are eighteen months old"},
    {k: "The ask", v: "One initiative, with what it changes and what it costs"}
  ],
  exhibit: {
    name: "Exhibit A &middot; The first full year on the new channels",
    caption: "Five things the owners can count, with the figure each one produced. Every figure here is invented for practice.",
    headers: ["What the owners counted", "This year", "What ignoring it costs"],
    rows: [
      ["Cardholder disputes on website orders", "9 of 552 orders, against 4 of 1,305 on the marketplace", "Fees, lost goods, and a bank that reprices the account"],
      ["Website baskets abandoned before payment", "68 in every 100 started", "Traffic the supplier has already paid for produces no order"],
      ["What the marketplace keeps from each order it carries", "15 percent, against under 3 percent on the firm&rsquo;s own channels", "Growth arrives in the channel that pays back least"],
      ["Places goods are now delivered to and tax may be owed", "14 jurisdictions, against 2 before the website opened", "Compliance work grows quietly with every new place"],
      ["Revenue still placed on account or over the trade counter", "72 percent of the year&rsquo;s total", "A year spent on the 28 percent that is newest"]
    ]
  },
  questions: [
    {
      q: "The maker whose gloves the supplier has distributed for years opens its own website and sells the same cases direct to the same schools. What should the analysis call this?",
      opts: [
        "Rivalry among distributors, since a competing wholesaler undercut the firm",
        "Disintermediation: a supplier now reaches the end customer directly",
        "A substitute product, since the schools are buying a different kind of glove",
        "Buyer power, since the schools have negotiated a lower price this year"
      ],
      a: 1,
      why: [
        "Rivalry is pressure from firms selling the same goods into the same market, and nothing here says another distributor took the order rather than the maker itself.",
        "Correct. The maker has cut out the middle of the chain and now reaches the end customer itself, which is disintermediation, and it raises the threat of new entrants against this firm.",
        "A substitute meets the same need with a different product, such as a washable coat instead of a disposable one. The same case of gloves by another route is not a substitute.",
        "Buyer power would show as price pressure from the schools themselves. Here the price they face moved because a new seller appeared, not because they bargained for it."
      ]
    },
    {
      q: "Sixty-eight of every hundred website baskets are abandoned before payment. Where in the value chain would a fix for that actually land?",
      opts: [
        "Inbound logistics, because stock has to arrive before anybody can order it",
        "Procurement, because better buying terms would let the firm post lower prices",
        "Marketing and sales with outbound logistics, where checkout and delivery sit",
        "Human resource management, because counter staff need training in online service"
      ],
      a: 2,
      why: [
        "Stock availability is a real cause of lost sales, but it stops the order before a basket exists rather than at the moment payment is asked for and the visitor walks away.",
        "Procurement decides what goods cost the firm. It can move a list price over months, and it does nothing for a visitor who has already chosen an item and then stopped.",
        "Correct. The basket is abandoned at the checkout, so the fix lives where the offer, the payment options and the delivery promise are made: marketing and sales, and outbound logistics.",
        "Training matters at the trade counter, and it is a genuine support activity, but nobody at the counter ever meets the website visitor who leaves without paying."
      ]
    },
    {
      q: "The owners can fund one initiative this year. Which should the analysis recommend, given the evidence in the exhibit?",
      opts: [
        "Rebuild the website, join a second marketplace and add a loyalty scheme together",
        "Match the cheapest marketplace price on every consumable the firm lists online",
        "Buy fraud screening and set it to refuse anything the risk score marks unusual",
        "Move account reordering onto the firm&rsquo;s own site, at agreed prices, on invoice"
      ],
      a: 3,
      why: [
        "Three initiatives at once is the commonest weak recommendation. It hides which pressure is being answered, it resists costing, and afterwards no result can be attributed to any of the three.",
        "Matching a marketplace price on light, postable goods means competing on ground the entrant chose, against a cost base built for a depot, a counter and a delivery van.",
        "Screening set to refuse anything unusual trades one cost for another. Nine disputes in a year is a small number, and a hard threshold declines paying customers whose orders merely look odd.",
        "Correct. It defends the seventy-two percent the firm still holds against a maker selling direct, and an invoiced reorder carries no marketplace commission and no card dispute."
      ]
    }
  ],
  debrief: "Every decision here made the same move: refuse the symptom, name the pressure, then place it in the value chain before recommending anything. The strongest recommendation was not the most technical one. It was the one aimed at the pressure the evidence actually showed, on ground the firm already holds, and it can be stated with a cost attached."
};

ACT.anaSim = {
  kind: "sim",
  label: "Decide",
  title: "From evidence to one recommendation",
  how: "Work the four decisions in order and read every outcome afterwards, including the ones you did not choose; the supplier is hypothetical and its figures are invented.",
  objective: "4.7",
  intro: "You are writing the analysis for the hypothetical consumables supplier. The four moments below are where this piece of work usually goes wrong, and the weaker options are the mistakes people actually make rather than obviously silly ones.",
  steps: [
    {
      situation: "You have a week with the supplier&rsquo;s records before you write anything. What do you come back with?",
      opts: [
        {t: "Delivered competitor prices, basket abandonment, dispute counts, channel fees and the revenue split", ok: true, out: "Right. Each of these can be counted, each attaches to a force or to a value-chain activity, and each can be checked by somebody who doubts you. Evidence is what separates an analysis from an opinion."},
        {t: "A written summary of what the counter staff and the sales reps believe is going wrong", ok: false, out: "Staff judgement is worth having and will help you read the numbers later. On its own a list of beliefs cannot be checked, and it tends to describe the day rather than locate a pressure."},
        {t: "A review of the marketplace storefront, noting every feature the firm&rsquo;s own site lacks", ok: false, out: "This produces a feature list, and a feature list quietly becomes the recommendation. You end up proposing technology because a rival has it rather than because a force demands it."},
        {t: "The whole order file exported, so that nothing at all is left out of the analysis", ok: false, out: "Completeness is not evidence. Without a question in mind you cannot tell which columns matter, and the work stalls in the data rather than in the argument you were asked for."}
      ]
    },
    {
      situation: "Your first draft says: visitors leave the site before paying, and the maker now sells the same cases direct. What is missing?",
      opts: [
        {t: "It names no force. Say which pressure each of those two observations is evidence of", ok: true, out: "Right. As drafted the sentence describes the day. Naming buyer power and disintermediation, and placing abandonment inside the value chain, is what lets a reader argue with you and what makes a recommendation follow from something."},
        {t: "Nothing. It states two observed facts, and an analysis should stay close to its evidence", ok: false, out: "Staying close to the evidence is right, but an analysis is more than the evidence. A description that names no pressure gives the reader nowhere to go and no way to test whether you are correct."},
        {t: "A stronger opening claim, such as calling this an existential threat to the firm", ok: false, out: "Force of language is not force in the framework sense. Escalating the wording adds urgency without adding a diagnosis, and it makes the whole piece harder to trust."},
        {t: "More figures, so add the abandonment share and the dispute count to that sentence", ok: false, out: "More numbers in the same sentence still leave it a description. The figures belong in the evidence; the sentence exists to say which pressure they are evidence of."}
      ]
    },
    {
      situation: "You have three candidate initiatives you like, and the brief asks for one. What do you write?",
      opts: [
        {t: "One initiative, with the force it answers, what it costs, and what you would watch", ok: true, out: "Right. A single recommendation can be costed, argued and later judged. The other two can be named in a sentence as deliberately not chosen, which is itself an analytical move rather than a hedge."},
        {t: "All three, ranked in order, so the owners can pick whichever suits the budget", ok: false, out: "Ranking looks generous and quietly hands the decision back to the reader. It also hides which pressure you were answering, and no single option ever gets costed properly."},
        {t: "The most ambitious of the three, since a bolder call shows a firmer grasp", ok: false, out: "Ambition is not a criterion. The recommendation has to answer the pressure the evidence showed, and a bold initiative aimed at the wrong force is worse than a modest one aimed at the right one."},
        {t: "A new customer application, because the marketplace has one and the firm does not", ok: false, out: "This is technology with no force behind it. If you cannot say which pressure the application relieves and where it sits in the value chain, the reader has no reason to accept it."}
      ]
    },
    {
      situation: "The last piece is a comparison of 150 to 200 words against a company you choose. Which draft does the work?",
      opts: [
        {t: "Name what that company does differently, then what the firm should do or refuse", ok: true, out: "Right. The comparison exists to produce a lesson for the firm you are advising. Naming the difference in the vocabulary of the frameworks is what makes it a lesson rather than a story about somebody else."},
        {t: "A short profile of the company, its history, its scale and its best-known work", ok: false, out: "This is the commonest failure of the whole piece. It reads well and says nothing about the supplier, and by the end the reader knows more about a company nobody asked you to advise."},
        {t: "A list of every difference between the two firms, so nothing relevant is left out", ok: false, out: "Length is not coverage. Most differences do not bear on the pressure you diagnosed, and burying the one that matters among twenty that do not is how a reader misses your point."},
        {t: "An argument that the firm should copy the company as closely as its budget allows", ok: false, out: "Copying ignores what your own evidence said about this firm, which holds ground the comparison company may not hold at all. A lesson is not an instruction to imitate."}
      ]
    }
  ]
};

ACT.anaFormula = {
  kind: "formula",
  label: "Spreadsheet",
  title: "Turn raw channel counts into evidence",
  how: "Type one formula for row 2 in each column and run it; it is applied down every row the way a filled-down formula behaves in a real sheet. The channels and figures belong to the hypothetical supplier and are invented.",
  objective: "4.7",
  headers: ["Channel", "Visitors", "Orders", "Average order value", "Disputed orders", "Conversion rate", "Revenue", "Look at this channel?"],
  data: [
    ["Own website", 18000, 552, 78, 9, "", "", ""],
    ["Marketplace listing", 26100, 1305, 61, 4, "", "", ""],
    ["Account orders", 1250, 400, 340, 1, "", "", ""],
    ["Trade counter", 9800, 3430, 54, 0, "", "", ""]
  ],
  tasks: [
    {
      column: 5,
      prompt: "Column F: what share of the people who arrived actually ordered? Give it as a percentage, rounded to one decimal place.",
      placeholder: "=ROUND(C2/B2*100,1)",
      expect: "=ROUND(C2/B2*100,1)",
      note: "Every figure in this sheet is invented for practice.",
      hint: "Divide the orders in column C by the visitors in column B, multiply by 100 to make it a percentage, then round the result to one decimal place.",
      explain: "A count of orders says nothing on its own, because the channels are not the same size. The ratio is what lets you compare them, and it is the first number an analysis of checkout friction has to put on the page."
    },
    {
      column: 6,
      prompt: "Column G: work out what each channel actually brought in, by multiplying the orders by the average order value.",
      placeholder: "=C2*D2",
      expect: "=C2*D2",
      hint: "One multiplication is enough. Take the order count in column C and multiply it by the average order value in column D.",
      explain: "Now the two columns disagree, and the disagreement is the finding. The marketplace takes more than twice as many orders as the website, and the account book takes the fewest orders of any channel here, yet the account book brings in more money than both new channels together."
    },
    {
      column: 7,
      prompt: "Column H: mark any channel with more than five disputed orders for a closer look, and mark the rest as clear.",
      placeholder: "=IF(E2>5,\"Look\",\"Clear\")",
      expect: "=IF(E2>5,\"Look\",\"Clear\")",
      hint: "You need a test and two results. Compare the disputed-order count in column E against five, then return one word when the test passes and another when it does not.",
      explain: "A flag is a decision rule written down, which is the honest way to use a threshold. Notice that it selects a channel to examine rather than a customer to refuse: the same logic applied to individual orders is what produces false declines."
    }
  ]
};

ACT.anaSql = {
  kind: "sql",
  label: "Database",
  title: "Ask the order records the chapter&rsquo;s questions",
  how: "Write a SELECT for each question and run it; any query returning the right answer is accepted. These eleven rows are one week pulled from the order file, not the year the spreadsheet totals, so the counts are small and the ratios will not match it. The supplier, its orders and its fees are hypothetical.",
  objective: "4.7",
  tables: {
    orders: { rows: [
      {id: 101, channel: "website",     item: "Nitrile gloves, case",   total: 62,  disputed: "no"},
      {id: 102, channel: "marketplace", item: "Safety goggles, ten",    total: 44,  disputed: "no"},
      {id: 103, channel: "website",     item: "Digital calipers",       total: 84,  disputed: "no"},
      {id: 104, channel: "account",     item: "Fume hood filters",      total: 380, disputed: "no"},
      {id: 105, channel: "marketplace", item: "Cutting fluid, five l",  total: 72,  disputed: "no"},
      {id: 106, channel: "website",     item: "Pipette tip refills",    total: 96,  disputed: "yes"},
      {id: 107, channel: "marketplace", item: "Abrasive discs, fifty",  total: 58,  disputed: "no"},
      {id: 108, channel: "account",     item: "Glassware restock",      total: 310, disputed: "no"},
      {id: 109, channel: "marketplace", item: "Bench matting roll",     total: 91,  disputed: "yes"},
      {id: 110, channel: "website",     item: "Lab coats, pack of 25",  total: 58,  disputed: "yes"},
      {id: 111, channel: "marketplace", item: "Thread gauge set",       total: 85,  disputed: "no"}
    ]},
    channels: { rows: [
      {channel: "website",     fee_percent: 2.5, owns_customer: "the supplier"},
      {channel: "marketplace", fee_percent: 15,  owns_customer: "the marketplace"},
      {channel: "account",     fee_percent: 2.9, owns_customer: "the supplier"}
    ]}
  },
  tasks: [
    {
      prompt: "List the item and the total for every order that came through the marketplace listing.",
      expect: "SELECT item, total FROM orders WHERE channel = 'marketplace'",
      hint: "Name the two columns after SELECT, then narrow the rows with WHERE on the channel column. A text value goes inside quotes.",
      explain: "Choosing columns and choosing rows are separate decisions. Read the result and the pattern is already visible: the marketplace carries small, light goods, which is exactly what an entrant can post cheaply."
    },
    {
      prompt: "How much revenue did each channel produce in this week? Show the largest first.",
      expect: "SELECT channel, SUM(total) AS revenue FROM orders GROUP BY channel ORDER BY revenue DESC",
      hint: "Collapse the rows to one per channel with GROUP BY, total the amounts inside SELECT, give that total a name with AS, then sort by that name downwards.",
      explain: "Grouping turns a list of orders into a description of the channels. The account book carries the fewest orders and the most money, and the marketplace does the reverse, which is the first hint that order counts are a poor way to judge a channel."
    },
    {
      prompt: "Which channels carried more than one disputed order? Show the channel and how many disputes it carried.",
      expect: "SELECT channel, COUNT(*) AS disputes FROM orders WHERE disputed = 'yes' GROUP BY channel HAVING COUNT(*) > 1",
      hint: "Filter to the disputed orders first, then group by channel. The condition about how many disputes there were has to come after the grouping, which is what HAVING is for.",
      explain: "WHERE filters rows and HAVING filters groups, because at the WHERE stage nothing has been counted yet. The answer also tells you where any screening effort should be aimed, and where it would only cost you good customers."
    },
    {
      prompt: "What does each channel leave the supplier after its fee? Show the channel, the gross total and the amount left once the fee is taken, best first.",
      expect: "SELECT o.channel, SUM(o.total) AS gross, SUM(o.total - o.total * c.fee_percent / 100) AS net FROM orders o JOIN channels c ON o.channel = c.channel GROUP BY o.channel ORDER BY net DESC",
      hint: "The fee lives on the channels table and the amounts live on the orders table, so join them on the channel name. The calculation goes inside the SUM, and both results need names with AS.",
      explain: "This answer exists in neither table. The order totals sit on one and the fee sits on the other, and only the join shows the marketplace handing back fifteen percent of every order while the firm&rsquo;s own channels hand back under three. In this week it grossed fifty more than the website and kept five. The same table records who keeps the customer relationship, which is the supplier-power half of the story."
    }
  ]
};

ACT.anaReady = {
  kind: "selfcheck",
  label: "Ready?",
  title: "Could you write the analysis now?",
  how: "Rate each statement honestly; anything you cannot do yet has a pointer back to the part of this module to reread.",
  objective: "4.7",
  items: [
    {t: "I can name which force a described symptom belongs to, instead of repeating the symptom in different words.", hint: "Go back to the list of what this chapter supplies to the frameworks, just after the mini case."},
    {t: "I can explain why selling through a marketplace is a supplier-power question and not merely a channel choice.", hint: "Go back to the second item in that same list, and to the fee and ownership columns in the database exercise."},
    {t: "I can place cart abandonment, checkout friction and payment choice in the right part of the value chain.", hint: "Go back to the mapping list, and to the second decision in the mini case."},
    {t: "I can say what a chargeback costs a merchant and why a harder screening threshold has a cost of its own.", hint: "Go back to the section of this module on card-not-present risk, and to the third decision in the mini case."},
    {t: "I can turn raw channel counts into the two or three ratios an analysis actually argues from.", hint: "Go back to the spreadsheet exercise under working the evidence yourself."},
    {t: "I can state one recommendation with what it changes, what it costs, and how I would know whether it worked.", hint: "Go back to the four-step method and to the third decision in the walkthrough that follows it."}
  ]
};
