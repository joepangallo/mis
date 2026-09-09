/* ===== s41b ===== */
PROSE.s41b = `
<span class="eyebrow">Section 4&ndash;1b</span>
<h2>Who is on each side of the transaction</h2>
<p class="lede">Electronic commerce is usually sorted into types, and the sorting rule is simpler than it looks: name who stands on each side of the exchange. Not the website, not the product, not the size of the order. This section works through the types the chapter names, and through the cases where the obvious answer is the wrong one.</p>

<h3>Naming the two sides</h3>
<p>The convention is a pair of letters with a &ldquo;to&rdquo; between them. The first letter is the side that sells or provides. The second is the side that buys or receives. The chapter names three types built on that pattern.</p>
<ul class="keys">
<li><b>Business-to-consumer (B2C)</b> &mdash; transactions between businesses and their customers, which covers online retailing, the sale of digital products, and streaming services.</li>
<li><b>Business-to-business (B2B)</b> &mdash; transactions among businesses, such as a manufacturer trading over the web with its suppliers, with no end consumer in the exchange.</li>
<li><b>Consumer-to-consumer (C2C)</b> &mdash; transactions between people who are not necessarily working together, such as one person buying memorabilia from another through an auction site.</li>
</ul>

<h3>When neither side is a business</h3>
<p>Some exchanges have no firm on either side. One person sells to another person, both of them are consumers, and the transaction is C2C.</p>
<p>The marketplace hosting them is doing something else. It is not the seller. It runs a <b>platform business model</b>: it enables transactions between other parties and takes a fee for that service. The goods on offer are not its goods.</p>
<p>A fourth category sits outside all three, because it involves services neither sold by nor to companies. <b>E-government</b> is the use of information systems to give citizens, organizations and other government agencies information about public services, and to let them interact with the government.</p>

<div class="activity" data-activity="typMatch"></div>

<p>Notice what the naming rule does not use. It says nothing about the size of the order, the technology behind the checkout, or whether the seller owns a warehouse. Two sides, named. That is the whole test.</p>
<p>The chapter&rsquo;s e-government examples are worth reading slowly, because each one replaces a counter, a queue or a paper form.</p>
<ul class="keys">
<li><b>Internet tax filing</b> &mdash; the most recognizable service of the group, and one that saves resources in both time and paper.</li>
<li><b>Identity card applications</b> &mdash; the application is submitted online rather than in person at a counter during opening hours.</li>
<li><b>Municipal services</b> &mdash; the everyday business of a city, requested and tracked through the city&rsquo;s own systems.</li>
<li><b>Electronic voting</b> &mdash; casting a ballot through a system rather than on paper, where a jurisdiction has chosen to offer it.</li>
<li><b>Public data access</b> &mdash; electronic access to government data that anybody may read and use for their own purposes.</li>
<li><b>Services to organizations</b> &mdash; filings and reporting offered online to businesses and to other government agencies.</li>
</ul>
<p>The chapter&rsquo;s own summary table lists three types. The fourth row below is e-government, which the chapter defines in the paragraph beside that table rather than inside it.</p>
<div class="tbl-wrap"><table class="tbl">
<thead><tr><th>Type</th><th>Description</th><th>Example</th></tr></thead>
<tbody>
<tr><td><b>Business-to-consumer (B2C)</b></td><td>Transactions between businesses and their customers</td><td>A person buys a book from an online retailer.</td></tr>
<tr><td><b>Business-to-business (B2B)</b></td><td>Transactions among businesses</td><td>A manufacturer trades over the web with its suppliers.</td></tr>
<tr><td><b>Consumer-to-consumer (C2C)</b></td><td>Transactions between people not necessarily working together</td><td>A person buys memorabilia from another person through an auction site.</td></tr>
<tr><td><b>E-government</b></td><td>Information about public services, and interaction with government</td><td>A resident files a tax return through a government system.</td></tr>
</tbody>
</table></div>
<p>Those rows are easy to read and easy to misapply, which is what the sorting exercise is for. Every organization named in it is invented.</p>

<div class="activity" data-activity="typSort"></div>

<h3>Where the money actually is</h3>
<p>Two channel names cut across all four directions. <b>Mobile commerce</b> is any of this conducted from a phone or tablet, and <b>social commerce</b> is trade that runs through a social platform, where the recommendation and the purchase sit in the same place.</p>
<p>Most people meet electronic commerce as B2C, because that is the part of it they can see. By revenue it is the smaller half, and not by a little. B2B is the largest form of all, because a great many firms trade with other firms and never with a consumer.</p>
<p>The chapter reports 2022 figures for United States manufacturers&rsquo; electronic-commerce shipments and for wholesalers&rsquo; electronic-commerce sales, each measured in trillions of dollars. Learn the ordering rather than the digits: business-to-business volume dwarfs the consumer-facing volume, and a figure like that is a snapshot of one year.</p>
<p>The second thing to carry away is that one firm is rarely one type. Take a consumer-facing company &mdash; the chapter&rsquo;s example is a clothing and home furnishing retailer &mdash; and follow a single product through it.</p>
<ol class="steps">
<li>It <b>sources raw materials</b> from a range of specialized suppliers, and every one of those purchases is business to business.</li>
<li>It <b>sells the finished product</b> to a distributor or a wholesaler, which is business to business a second time.</li>
<li>Or it <b>sells that product directly</b> to the end consumer, and only this last step is business to consumer.</li>
</ol>
<p>The shopper sees the last step and assumes it is the business. The steps before it were larger, and they were the other type. The case below is built on that mismatch, inside an invented company.</p>

<div class="activity" data-activity="typCase"></div>

<p>Two boundaries do most of the damage. A consumer-facing brand can be on the buying side of a business-to-business purchase, and a marketplace can host a consumer-to-consumer sale without ever being a party to it.</p>

<p class="takeaway">Ask who is on each side before you ask anything else. The type is a fact about the two parties, not about the storefront they happened to meet on.</p>

<div class="activity" data-activity="typQuiz"></div>
`;

ACT.typCase = {
  kind: "case",
  label: "Mini case",
  title: "Four revenue streams, one website",
  how: "Read the brief and the exhibit, then take the three decisions in order; the company and every figure in it are invented for practice.",
  objective: "4.1",
  brief: "Ridgehollow Roasterworks is a hypothetical company used here for practice. It builds coffee-roasting equipment and earns money four ways through one website: a shop for home roasters, contract supply to cafe chains, a resale area where owners sell used machines to each other, and an equipment contract with a community college district&rsquo;s kitchens. The founder wants to know which of the four the company actually runs on, and whether one website can serve them all.",
  facts: [
    {k: "Online shop", v: "Home roasters buy a single machine and accessories directly."},
    {k: "Cafe contracts", v: "Chains order production roasters under a supply agreement."},
    {k: "Resale area", v: "Owners list used machines to each other; the company takes a fee."},
    {k: "College kitchens", v: "A community college district buys and restocks equipment."},
    {k: "One storefront", v: "All four streams run through the same catalog and checkout."}
  ],
  exhibit: {
    name: "Exhibit A &middot; one year of trading",
    caption: "The four streams side by side. Every figure here is invented for practice and none of it is reported data.",
    headers: ["Revenue stream", "Orders in the year", "Average order value", "Revenue to the company"],
    rows: [
      ["Online shop, home roasters", "4,120", "US$310", "US$1,277,200"],
      ["Contract supply, cafe chains", "24", "US$152,000", "US$3,648,000"],
      ["Resale area, owner to owner", "1,450", "US$240", "US$52,200 in fees"],
      ["College kitchens, district contract", "30", "US$8,100", "US$243,000"]
    ]
  },
  questions: [
    {
      q: "The resale area carries the company&rsquo;s branding and sits one click from the shop, so shoppers treat it as part of the store. Which type are those transactions, and what is the company doing there?",
      opts: [
        "C2C, with the company running a platform that enables the sale and charges a fee",
        "B2C, because the used machines reach ordinary consumers through the company&rsquo;s own storefront and branding",
        "B2B, because the sellers are equipment owners rather than ordinary shoppers",
        "Not electronic commerce at all, since the company sells nothing of its own there"
      ],
      a: 0,
      why: [
        "Correct. Both parties are individuals, so the exchange is consumer to consumer, and the company&rsquo;s role is the platform business model: it enables the transaction and earns a fee for doing so.",
        "The branding belongs to the company, but the seller does not. A consumer on each side makes this consumer to consumer, whoever designed the page it happens on.",
        "Business to business needs an organization on both sides. Two machine owners trading with each other are consumers here, however much equipment they happen to own.",
        "Money moves over a digital network in exchange for goods, which is electronic commerce by the chapter&rsquo;s definition, and the fee the company keeps is real revenue."
      ]
    },
    {
      q: "Look at the exhibit as a whole. Which stream carries the most revenue, and how does that sit beside what the chapter reports about the types?",
      opts: [
        "The online shop, since it wrote by far the largest number of orders across the year",
        "The cafe-chain contracts, on the fewest orders of the four",
        "The resale area, because it moved more machines than either contract stream did",
        "The college kitchens, since public buyers commit to the largest yearly totals"
      ],
      a: 1,
      why: [
        "Order count and revenue are different measurements. The shop wrote by far the most orders and still earned roughly a third of what the cafe contracts brought in.",
        "Correct. Two dozen contract orders outearn every other stream combined, which is the chapter&rsquo;s finding in miniature: business-to-business trade is the largest form by revenue.",
        "The resale area moved a great many machines, but the company keeps only a listing fee from each one, which leaves it the smallest of the four streams.",
        "The college contract is real business-to-business revenue and it is steady, yet the exhibit puts it at a small fraction of what the cafe chains spent."
      ]
    },
    {
      q: "The founder plans one identical storefront for all four streams: the same catalog, the same checkout, the same card payment at the end. What does that decision cost the company most?",
      opts: [
        "Nothing that can be measured, since every buyer wants a fast checkout above everything else",
        "The resale area, which cannot function without a card payment at its checkout",
        "The college contract, which is too small a share of revenue to design around",
        "The stream earning the most, whose buyers work by purchase order"
      ],
      a: 3,
      why: [
        "Speed matters to a home buyer choosing one machine. A chain buying two dozen roasters a year is working to a budget cycle and an approval process instead.",
        "The resale area does need a payment path, and card payment suits it well, because the amounts involved are close to ordinary retail purchases.",
        "Share of revenue is not the same as fit. The district buys on a purchase order much as the chains do, so one design decision serves or fails both of them.",
        "Correct. The cafe contracts earn the most and behave the least like retail: negotiated prices, purchase orders and invoices rather than a card typed into a checkout."
      ]
    }
  ],
  debrief: "Four streams, one company, and four different answers &mdash; while the website stayed the same in every one of them. The type is decided by who stands on each side: two organizations, an organization and a consumer, or two consumers with a platform in between. The stream that looked least like a shop carried most of the money, which is the chapter&rsquo;s point about business-to-business trade at the scale of one firm."
};

ACT.typSort = {
  kind: "sort",
  label: "Sort",
  title: "Who is on each side here?",
  how: "Place each transaction under the type it belongs to; every organization described is a hypothetical example.",
  objective: "4.1",
  buckets: [
    {id: "b2c", name: "Business to consumer", hint: "a firm on the selling side, an end consumer on the buying side"},
    {id: "b2b", name: "Business to business", hint: "an organization on both sides, with no end consumer in the exchange"},
    {id: "c2c", name: "Consumer to consumer", hint: "a person on each side, whoever hosts the page they meet on"},
    {id: "egov", name: "E-government", hint: "public services and interaction with government, delivered by information system"}
  ],
  items: [
    {t: "A student pays the monthly charge for a streaming subscription.", b: "b2c", why: "Streaming services are one of the chapter&rsquo;s own examples of business-to-consumer commerce: a firm on one side, an end consumer on the other."},
    {t: "A shopper buys a novel as a download rather than as a printed copy.", b: "b2c", why: "The sale of digital products is business to consumer for the same reason a physical delivery is. What changes is the shipping, not who the two parties are."},
    {t: "A parent orders school shoes from a retailer&rsquo;s website for home delivery.", b: "b2c", why: "This is the case everybody pictures first, and it is worth keeping as a reference point: a business selling to the person who will actually use the goods."},
    {t: "A bakery orders forty sacks of flour through its mill&rsquo;s ordering site.", b: "b2b", why: "Both sides are firms and the flour goes into something the bakery will sell, so no end consumer appears anywhere in this exchange."},
    {t: "An office manager buys twelve desk chairs from a well-known consumer retailer&rsquo;s website.", b: "b2b", why: "The site was designed for shoppers, but the type follows the parties rather than the design. A firm buying chairs for its own operations is on the business side."},
    {t: "A city buys a licence for the software that runs its permit desk.", b: "b2b", why: "A public body appears here, which tempts people toward e-government. E-government names the services a government provides, not the purchases it makes from vendors."},
    {t: "A manufacturer&rsquo;s suppliers sign in to a portal to confirm delivery dates.", b: "b2b", why: "This is the chapter&rsquo;s own illustration of business-to-business commerce, and it shows that the category covers the events around a purchase, not just the payment."},
    {t: "Someone sells a used bicycle to a stranger through an auction site that charges a fee.", b: "c2c", why: "The fee makes the host a business, but the host is not a party to the sale. Two consumers are, so the transaction is consumer to consumer."},
    {t: "A retiree sells garden tools to a neighbor through a local listings site.", b: "c2c", why: "Neither side is a firm and the two are not working together, which is exactly how the chapter describes consumer-to-consumer commerce."},
    {t: "A resident renews a driving licence on a state website.", b: "egov", why: "A citizen is interacting with government about a public service, which is the definition of e-government rather than a purchase of goods."},
    {t: "A household files its tax return through the tax authority&rsquo;s online system.", b: "egov", why: "Internet tax filing is the chapter&rsquo;s most recognizable e-government example, and it saves resources in both time and paper."},
    {t: "An agency publishes its spending records for anyone to download.", b: "egov", why: "Providing electronic access to public government data is listed by the chapter as e-government, even though nobody buys or sells anything at all."}
  ]
};

ACT.typMatch = {
  kind: "match",
  label: "Match",
  title: "What actually distinguishes each one",
  how: "Match each term to the thing that really separates it from its neighbors, then read why the boundary sits where it does.",
  objective: "4.1",
  pairs: [
    {
      l: "Business-to-consumer (B2C)",
      r: "A firm on the selling side and an end consumer on the buying side",
      why: "This is the part of electronic commerce most people can see, which is why it gets mistaken for the whole of it. Online retailing, digital products and streaming services all sit here."
    },
    {
      l: "Business-to-business (B2B)",
      r: "An organization on both sides, with no end consumer involved",
      why: "The chapter calls this by far the largest form by revenue, and it is invisible to shoppers. A manufacturer trading over the web with its suppliers is the standard case."
    },
    {
      l: "Consumer-to-consumer (C2C)",
      r: "A person on each side, not necessarily working together",
      why: "The test is the two parties, not the venue. An auction sale between two individuals stays consumer to consumer however large and commercial the site hosting it is."
    },
    {
      l: "E-government",
      r: "Information about public services, and interaction with government",
      why: "This one is defined by what a public body provides rather than by who buys from whom. A government purchasing software from a vendor is trading business to business instead."
    },
    {
      l: "Platform business model",
      r: "Enabling other parties to transact, and earning a fee for it",
      why: "This names the host&rsquo;s role rather than the type of transaction. A marketplace can run a platform under consumer-to-consumer sales without owning any of the goods on it."
    }
  ]
};

ACT.typQuiz = {
  kind: "quiz",
  label: "Check yourself",
  title: "Reading the two sides correctly",
  how: "Four options, one best answer; read every explanation, including the ones for options you did not choose. Any organization described is hypothetical.",
  objective: "4.1",
  questions: [
    {
      q: "How do business-to-consumer and business-to-business commerce compare in revenue, according to the chapter?",
      opts: [
        "B2C is larger, because far more people shop online than there are businesses to trade with",
        "The two are close, since most firms sell to consumers and to businesses alike",
        "B2B is the larger of the two by a wide margin",
        "The chapter offers no comparison, because the two are measured on different bases"
      ],
      a: 2,
      why: [
        "Shopper numbers are not revenue. A great many firms trade with other firms and never with a consumer, and their orders are far larger than a household&rsquo;s.",
        "Many consumer-facing firms do trade both ways, which is true and useful, but it says nothing about the relative size of the two totals.",
        "Correct. The chapter treats business-to-business commerce as by far the largest form by revenue, and reports United States shipment and wholesale figures in the trillions for 2022.",
        "The chapter does compare them, and gives figures for a single year to do it. Those figures are a snapshot, which is a reason to learn the ordering rather than the digits."
      ]
    },
    {
      q: "A county buys accounting software from a vendor and, in the same week, opens a site where residents can pay property bills. Which types are these two things?",
      opts: [
        "Both are e-government, because a public body is one of the parties in each of them",
        "The software purchase is business to business; the payment site is e-government",
        "The software purchase is e-government; the payment site is business to consumer",
        "Neither is electronic commerce, because no physical goods change hands here"
      ],
      a: 1,
      why: [
        "The presence of a government body does not settle the type. E-government names the services a government provides to citizens and organizations, not every purchase it makes.",
        "Correct. Buying software puts an organization on each side, which is business to business, while the payment site provides a public service and interaction with government.",
        "This reverses both halves. A purchase from a vendor is trade between organizations, and residents paying a public bill are interacting with government rather than shopping.",
        "The chapter&rsquo;s definition covers the exchange of goods, services and money over digital networks, and software and payments are services traded exactly that way."
      ]
    },
    {
      q: "A marketplace lets private owners list secondhand goods to other private buyers, charges its sellers a fee, holds the buyer&rsquo;s money until delivery, and never owns any of the goods. How should its transactions and its own role be described?",
      opts: [
        "C2C transactions, with the marketplace running a platform business model",
        "B2C transactions, since the marketplace is the party collecting payment from the buyer",
        "B2B transactions, because the sellers are paying fees to the marketplace as a business",
        "C2C transactions in which the marketplace is one of the two parties"
      ],
      a: 0,
      why: [
        "Correct. Both parties to the sale are individuals, so the exchange is consumer to consumer, and the host earns a fee for enabling it rather than for selling anything.",
        "Collecting the payment is a service the marketplace performs. The goods belong to the seller throughout, and that seller is another consumer rather than a firm.",
        "A fee paid by a seller is a business arrangement with the host, but the transaction being classified is the sale of goods between two people.",
        "A party to the sale would own the goods and carry the risk attached to them. Enabling the sale and holding the money briefly is a different role entirely."
      ]
    }
  ]
};
