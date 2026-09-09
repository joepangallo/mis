/* ===== s41c ===== */
PROSE.s41c = `
<span class="eyebrow">Section 4&ndash;1c</span>
<h2>Fintech: money without the middle</h2>
<p class="lede">Buying something online is only half a transaction. The other half is the money: how it leaves one account, how long it takes to arrive, and who takes a slice on the way. This section is about the firms that rebuilt that half, and about what they did not rebuild.</p>

<h3>One service, done very well</h3>
<p><b>Fintech</b> is the chapter&rsquo;s word for innovative technologies that transform financial services. In plainer terms it is software doing a job a bank used to do. The chapter credits it with accelerating electronic commerce three ways: simpler online payments, easier financing for online sellers, and new products such as digital wallets and peer-to-peer payments.</p>
<p>One structural difference explains most of what follows. A traditional bank offers a wide range of services under one roof &mdash; an account, a card, a loan, somewhere to invest. A fintech firm typically takes one of those and does it very well.</p>
<p>Depth in one service lets a young firm compete with an institution a century old. Narrowness obliges its customers to hold several relationships instead of one. The chapter&rsquo;s own categories all follow that shape.</p>
<ul class="keys">
<li><b>Crowdfunding platforms</b> &mdash; many small backers fund one project directly, instead of one lender deciding on everybody&rsquo;s behalf.</li>
<li><b>Online-only banks</b> &mdash; everyday accounts, cards and transfers run entirely through an app, with no branch anywhere behind them.</li>
<li><b>Mobile payment processors</b> &mdash; a phone or a small reader becomes a way for almost any seller to accept cards.</li>
<li><b>Peer-to-peer lenders</b> &mdash; people with money to lend are matched against people who want to borrow it.</li>
<li><b>Small-business lenders</b> &mdash; credit for firms too small or too quick-moving for a traditional commercial loan process.</li>
<li><b>Digital investment managers</b> &mdash; a portfolio built and rebalanced by software from a short questionnaire about goals.</li>
</ul>

<div class="activity" data-activity="finExplore"></div>

<p>A seventh belongs beside those six: artificial intelligence giving investment advice or managing a portfolio, which applies the same move to judgement rather than to paperwork. Firm names are left out on purpose. Companies of this kind are bought, merged and renamed often, and the category outlives the brand.</p>

<h3>Cutting out the middle, again</h3>
<p>Section 4&ndash;1a introduced <b>disintermediation</b>: reaching customers directly by removing the middle, as an airline does by selling a seat on its own site rather than through an agent. Fintech is that same move, aimed at financial intermediaries instead of wholesalers and retailers.</p>
<p>An online-only bank has no branch network standing between it and the customer. A direct investing app has no broker taking the order. The intermediary is not talked into charging less. It is taken out of the path, and what replaces it costs almost nothing to run one more time.</p>
<p>So electronic commerce is no longer only trade. It once meant firms buying from firms and consumers buying from firms. It now takes in the financial transaction itself &mdash; banking, brokerage, lending, investment &mdash; and most major banks and investment firms provide those services online as well.</p>

<h3>Expectations do not stay where they were set</h3>
<p>Fintech improves the experience of paying, which is the visible effect. The quieter one is that it resets what a customer counts as normal. Once money moves between two people in seconds, a two-day wait somewhere else stops reading as ordinary and starts reading as a fault.</p>
<p>Expectations set in one industry are then applied to every other. Somebody who splits a restaurant bill instantly on a phone brings that standard to an insurer, a landlord and a payroll department, none of which ever competed with a payments app and all of which are now measured against one.</p>

<div class="activity" data-activity="finFill"></div>

<p class="takeaway">A bank sells breadth. A fintech firm sells depth. Almost every argument in this section is really about which of the two a particular customer needs at a particular moment.</p>

<p>One of those narrow firms is worth naming because the phrase recurs. <b>Peer-to-peer lending</b> matches people with money to lend against people who want to borrow it, so the platform underwrites nothing and takes a fee for the introduction.</p>

<h3>Four money jobs in one small business</h3>
<p>Strip a small trading business down and its money handling is four separate jobs. They feel like one job because a single bank account has always covered all four of them.</p>
<ul class="keys">
<li><b>Taking payment in person</b> &mdash; a card tapped at a stall, which needs a reader, an account to settle into and a fee per sale.</li>
<li><b>Taking payment online</b> &mdash; a checkout that works on a phone and accepts money from somebody the seller will never meet.</li>
<li><b>Financing stock</b> &mdash; borrowing now to buy in bulk against sales that will not arrive for weeks, judged on the business rather than the owner.</li>
<li><b>Parking a surplus</b> &mdash; putting cash that is not needed this month somewhere it earns a return and stays reachable.</li>
</ul>
<p>For each of those four there is now a specialist that does only that job. Splitting them buys a better price or a faster settlement on at least one. It also buys four logins, four fee schedules and four sets of records that somebody has to reconcile into one picture.</p>
<p>The questions underneath do not move either. Whoever holds the money is regulated by somebody, a balance is protected under some scheme or under none, and a lending decision made by software is still a lending decision. The business below is invented and its figures with it.</p>

<div class="activity" data-activity="finCase"></div>

<p>Three last checks on the vocabulary before the chapter turns from moving money to protecting it.</p>

<div class="activity" data-activity="finQuiz"></div>
`;

ACT.finExplore = {
  kind: "explore",
  label: "Explore",
  title: "Six narrow firms, four questions each",
  how: "Open each card and read all four panels; the same four questions are asked of every category, which is what makes them comparable, and no real company is named.",
  objective: "4.1",
  labels: ["What it does", "Who it displaces", "What it does not solve", "Why it can be cheaper"],
  items: [
    {
      icon: "FUND",
      name: "Crowdfunding platforms",
      sub: "Many small backers, one project",
      what: "Lets a project raise money from a large number of small contributors, each deciding for themselves, instead of from one institution deciding on behalf of many.",
      real: "The lender or investor who would otherwise have assessed the project and committed other people&rsquo;s money to it, along with the meetings that assessment required.",
      absent: "It does not judge whether the project can actually be delivered. Backers carry that risk themselves, and a funded project is not a finished one.",
      why: "The platform runs one listing process and one payment flow for every campaign, so the cost of administering a single deal is spread across all of them."
    },
    {
      icon: "BANK",
      name: "Online-only banks",
      sub: "An account with no branch",
      what: "Provides everyday banking &mdash; holding money, moving it, and a card to spend it with &mdash; through an app, with no counter anywhere to walk up to.",
      real: "The branch network, and with it the premises, the staff and the local opening hours that used to be how a customer reached their own money.",
      absent: "Anything that still wants a physical presence: paying in cash, or a conversation with somebody who has the authority to make an exception for you.",
      why: "Premises and branch staff are among a traditional bank&rsquo;s largest fixed costs, and an app serves one more customer at close to no extra cost."
    },
    {
      icon: "TAP",
      name: "Mobile payment processors",
      sub: "Card acceptance for a stall",
      what: "Turns an ordinary phone or a small reader into a way of accepting card payments, so a seller can take a card without a contract negotiated in advance.",
      real: "The bank arrangement and the fixed terminal that once stood between a small seller and the ability to accept anything other than cash.",
      absent: "The fee on each sale, which is often above a large retailer&rsquo;s negotiated rate; the convenience is paid for out of a slice of every transaction.",
      why: "Signing up is automated and the hardware is inexpensive, so the processor spends almost nothing acquiring a seller who may take only a few payments a week."
    },
    {
      icon: "PEER",
      name: "Peer-to-peer lenders",
      sub: "Savers lending to borrowers",
      what: "Matches people who have money to lend against people who want to borrow it and prices the loan, taking a fee for running the match rather than lending its own funds.",
      real: "The bank in the middle, which traditionally took deposits at one rate, lent that money out at a higher one, and kept the difference.",
      absent: "Default. If a borrower stops paying, the loss falls on the people who funded that particular loan rather than on an institution absorbing it.",
      why: "There is no branch, no deposit base to fund and a credit decision made largely by software, so the gap between what a lender earns and a borrower pays can be narrower."
    },
    {
      icon: "LEND",
      name: "Small-business lenders",
      sub: "Credit judged on trading data",
      what: "Lends to small firms, often deciding from trading records such as card takings and sales history rather than from a long written application and a meeting.",
      real: "The commercial loan officer, and the weeks of assessment a small borrower used to sit through for an amount the bank considered marginal.",
      absent: "The cost of borrowing for a risky business. A fast decision is not a cheap one, and speed is frequently priced into the rate.",
      why: "The assessment runs automatically against data the business already generates, so a small loan stops being uneconomic to underwrite."
    },
    {
      icon: "ADVISE",
      name: "Digital investment managers",
      sub: "A portfolio run by software",
      what: "Builds and rebalances an investment portfolio from a few answers about goals and tolerance for loss, and increasingly uses artificial intelligence to advise or to manage it.",
      real: "The human adviser whose time made small portfolios uneconomic to serve, together with the annual review appointment that came with the relationship.",
      absent: "Market risk, and anything about the customer that the questionnaire did not think to ask about in the first place.",
      why: "One model serves every account at once, so the extra cost of managing one more portfolio is close to nothing."
    }
  ]
};

ACT.finFill = {
  kind: "fill",
  label: "Complete it",
  title: "The five load-bearing sentences",
  how: "Choose the wording that matches the chapter in each sentence; the explanation appears once you pick, and it says what the other choices actually describe.",
  objective: "4.1",
  blanks: [
    {
      before: "The chapter&rsquo;s term for innovative technologies transforming financial services is ",
      after: ", and its effect on electronic commerce was to simplify online payments, streamline financing for sellers, and add products such as digital wallets.",
      choices: ["e-government","fintech","the electronic marketplace"],
      a: 1,
      why: "Fintech is the chapter&rsquo;s own word, and it names the technologies rather than any one company. E-government is the use of information systems to give citizens and organizations access to public services, which is a different form of electronic commerce. The electronic marketplace is the space where offerings meet buyers, not the technology reshaping financial services."
    },
    {
      before: "Whereas a traditional bank provides a wide range of services, a fintech company typically ",
      after: ".",
      choices: ["offers every one of the same services more cheaply","sells its service through the banks it competes with","focuses on one service and does it very well"],
      a: 2,
      why: "That single sentence is the structural difference the section is built on, and it explains both the depth these firms reach and the number of relationships their customers end up holding. Matching a bank service for service would make the firm a bank, which is the opposite of the pattern. Selling through the incumbent describes a supplier relationship rather than a competitor bypassing one."
    },
    {
      before: "Just as the internet let firms bypass wholesalers and retailers, fintech firms bypass traditional financial intermediaries and reach consumers directly. That move is ",
      after: ", the idea section 4&ndash;1a applied to goods, now applied to money.",
      choices: ["disintermediation", "social commerce", "consumer-to-consumer trade"],
      a: 0,
      why: "Disintermediation is cutting out the middle and reaching the customer directly, which is exactly what an online-only bank or a direct investing app does. Social commerce is selling through social platforms, an area electronic commerce spread into rather than a change in the chain. Consumer-to-consumer trade describes who the two parties are, not whether an intermediary was removed."
    },
    {
      before: "Electronic commerce today reaches beyond business-to-business and business-to-consumer trade to take in ",
      after: ", with most major banks and investment firms providing those services online.",
      choices: ["advertising, branding and market research","shipping, warehousing and returns handling","banking, brokerage, lending and investment"],
      a: 2,
      why: "The chapter widens the definition to the financial transaction itself, which is why fintech sits inside this objective at all. Shipping and warehousing are logistics that support a sale rather than transactions conducted online in their own right. Advertising and research are activities around the sale, and the chapter treats them as events leading up to a purchase."
    },
    {
      before: "Fintech services enhance the customer experience and also ",
      after: ", which is why a wait that felt ordinary a few years ago can now read as a fault.",
      choices: ["reduce how many transactions people make","reshape what customers expect on ease and speed","settle the regulatory questions underneath"],
      a: 1,
      why: "The chapter names ease of payment and speed as the expectations these services shape, and an expectation set in one industry is then carried into every other. Volumes have risen rather than fallen as paying became easier, so the second choice reverses the effect. Regulation is untouched by any of this: who may hold money and on what terms is decided elsewhere."
    }
  ]
};

ACT.finCase = {
  kind: "case",
  label: "Mini case",
  title: "Four jobs, one bank account, one evening to decide",
  how: "Read the brief and Exhibit A, then take the three decisions in order; the business is invented for practice and every figure in the exhibit is invented with it.",
  objective: "4.1",
  brief: "Wrenfield Honey is a hypothetical two-person business that packs honey from local beekeepers and sells it at weekend markets and through a small website. Every payment it takes and every bill it pays runs through one ordinary business bank account. Trade is growing, a bulk purchase of this year&rsquo;s honey falls due in eight weeks, and about US$4,000 sits idle most months. The pair have been told to look at specialist services, and they have one evening to decide what to change.",
  facts: [
    {k: "The business", v: "Two people, hypothetical, packing and selling honey"},
    {k: "Money job one", v: "Taking card payments in person at weekend markets"},
    {k: "Money job two", v: "Taking card payments through the website"},
    {k: "Money job three", v: "Financing a bulk purchase of honey"},
    {k: "Money job four", v: "Parking a cash surplus of about US$4,000"},
    {k: "Today", v: "All four run through a single business bank account"}
  ],
  exhibit: {
    name: "Exhibit A &middot; the bank against a specialist, job by job",
    caption: "Every figure here is invented for practice and none is quoted from a real provider; each job appears twice, once as the bank offers it and once as a specialist offers it.",
    headers: ["Job and provider", "Cost", "When the money arrives", "What it does not do"],
    rows: [
      ["In person &middot; the bank", "US$25 a month, plus 1.9% of each sale", "Three working days", "Supply a reader that runs away from a power socket"],
      ["In person &middot; specialist", "No monthly fee, plus 2.6% of each sale", "Next working day", "Help much when a customer disputes a sale"],
      ["Online &middot; the bank", "US$40 a month, plus 1.8% of each sale", "Three working days", "Give a checkout page the site can simply drop in"],
      ["Online &middot; specialist", "No monthly fee, plus 2.9% of each sale", "Two working days", "Cover a card used without its owner&rsquo;s consent"],
      ["Honey purchase &middot; the bank", "9% a year, decision in about ten weeks", "On drawdown after signing", "Reach a decision before the supplier&rsquo;s deadline"],
      ["Honey purchase &middot; specialist", "14% a year, decision in two days", "Two days after approval", "Reprice the loan once trading improves"],
      ["Surplus &middot; the bank", "Pays 0.1% a year on the balance", "Available the same day", "Earn a return worth the paperwork"],
      ["Surplus &middot; specialist", "Pays 3.4% a year on the balance", "Two working days to withdraw", "Sit under the same protections as a bank balance"]
    ]
  },
  questions: [
    {
      q: "Reading Exhibit A, which of the four jobs does the specialist clearly win, and on what grounds?",
      opts: [
        "The surplus, because a much higher advertised rate on a balance is a plain gain",
        "In-person cards, because a smaller share of each sale is taken by the specialist",
        "Financing, because the bank&rsquo;s decision lands after the supplier&rsquo;s deadline",
        "Online cards, because the money reaches the account on the same working day"
      ],
      a: 2,
      why: [
        "The rate on the idle balance is genuinely better and probably worth taking, but 3.4% against 0.1% on about US$4,000 comes to roughly US$130 across a whole year, and the last column raises a protection question the bank balance does not have.",
        "Read the cost column again. The specialist takes 2.6% of each sale against the bank&rsquo;s 1.9%, so it is dearer per sale; what it removes is the monthly fee, which is a different argument entirely.",
        "Correct. The bank is cheaper on rate and useless on timing: a decision in about ten weeks cannot fund a purchase due in eight, so the dearer option is the only one that does the job at all.",
        "Exhibit A shows two working days against the bank&rsquo;s three. That is an improvement of one day, which is worth having and is nowhere near the difference between a purchase happening and not happening."
      ]
    },
    {
      q: "The pair decide to move all four jobs to four different specialists. What have they taken on that the single account did not carry?",
      opts: [
        "Four sets of records that must be reconciled into one view of the business",
        "Higher charges on all four of the jobs at once, since specialist pricing runs above a bank&rsquo;s",
        "A regulator for the first time, because specialist providers are supervised",
        "The loss of card acceptance at the weekend markets where they trade"
      ],
      a: 0,
      why: [
        "Correct. Fintech firms are narrow by design, so four strong services means four logins, four fee schedules and four statements, and in a two-person business somebody spends an evening making them agree with each other.",
        "Exhibit A does not show that. The specialist is dearer per sale and dearer on the loan, and cheaper on monthly fees and better on the return paid on cash, so the direction differs from job to job.",
        "Financial providers of this kind already operate under supervision, so no new exposure appears here. What does need checking is which scheme, if any, protects a balance that is held outside a bank account.",
        "Nothing about the move stops them taking cards at a market, and the in-person specialist exists precisely to make card acceptance easy for a stall. The cost of the move is administrative rather than operational."
      ]
    },
    {
      q: "One of the pair says the move means the business no longer has to think about any of this. Which reply is right?",
      opts: [
        "Automation across the four services means that the monthly bookkeeping now takes care of itself",
        "The providers take on the tax duties along with the payments they process",
        "The narrower each provider is, the fewer records the business has to keep",
        "Reconciling the four services and the rules about who holds the money are still theirs"
      ],
      a: 3,
      why: [
        "Each service will report its own activity cleanly enough. None of them sees the other three, so the single view of the business that a lender or a tax return needs still has to be assembled by somebody or by a tool bought for the purpose.",
        "A payment processor moves money and reports what it moved. What is owed, to whom and where follows from the business and the places it sells into, and that obligation stays with the owners throughout.",
        "Narrow providers keep excellent records of their own slice and none at all of anybody else&rsquo;s, so the number of records the business has to hold goes up when four services replace one account.",
        "Correct. Fintech changed where each job is done and how fast the money moves. It did not remove the reconciling, and it did not answer whether any scheme protects a balance held outside a bank, which is a question for somebody qualified in this jurisdiction."
      ]
    }
  ],
  debrief: "This is disintermediation with a price on it. On three jobs the bank is adequate and the specialist buys a small improvement; on the fourth the bank&rsquo;s product does not exist inside the time available, and that is where a narrow firm earns its place. What splitting costs is coherence: four depth relationships instead of one breadth relationship, with the reconciling and the regulatory questions left exactly where they always were."
};

ACT.finQuiz = {
  kind: "quiz",
  label: "Check yourself",
  title: "Breadth, depth, and who got removed",
  how: "Four options, one best answer; read every explanation, including those for the options you did not choose, and note that any business described is hypothetical.",
  objective: "4.1",
  questions: [
    {
      q: "A customer compares a large bank with a firm that does nothing but process card payments. Which difference is the one the chapter draws between them?",
      opts: [
        "The bank is supervised by regulators, while a payments specialist answers to nobody at all",
        "The bank covers a wide range of services; the specialist covers one and does it well",
        "The specialist works with businesses, while the bank looks after private individuals",
        "The specialist is a smaller bank, offering the same range of services to fewer customers"
      ],
      a: 1,
      why: [
        "Both are supervised, and the chapter draws no such line. Regulation varies by activity and jurisdiction, which is a real question for a business, but it is not what separates a bank from a narrow firm here.",
        "Correct. Breadth against depth is the structural difference the chapter states, and nearly everything else about fintech follows from it, including why customers end up holding several relationships.",
        "Plenty of specialist firms serve consumers directly, and banks serve businesses of every size. Who the customer is does not distinguish the two, and the chapter names categories on both sides of that line.",
        "A narrow firm is not a miniature bank. It aims to serve very large numbers of customers with a single service done well, so what marks it out is the range it offers rather than the size of its customer base."
      ]
    },
    {
      q: "An investing app lets a customer buy shares directly from a phone, with no broker taking the order. Which idea from this chapter does that illustrate?",
      opts: [
        "Consumer-to-consumer commerce, because the trade happens between two private individuals",
        "Digital investment management, since software rather than an adviser picks the holdings",
        "Business-to-business commerce, since the app and the exchange are both firms",
        "Disintermediation, since a step in the chain is removed rather than made cheaper"
      ],
      a: 3,
      why: [
        "Consumer-to-consumer trade describes people transacting with each other, as on an online auction site. The customer here is dealing through a firm, and the counterparty is a market rather than a neighbour.",
        "That category covers a portfolio a service builds and rebalances for the customer from a short questionnaire. Here the customer chooses the trade, and what the app takes out of the path is the broker.",
        "The customer is an individual buying for themselves, which makes this business-to-consumer. Firms are certainly involved in the plumbing, but the transaction the question describes ends with a consumer.",
        "Correct. The chapter presents fintech as disintermediation applied to money: an intermediary is taken out of the path, exactly as an airline selling its own seats removes a travel agent."
      ]
    },
    {
      q: "A furniture retailer&rsquo;s customers have begun complaining that its refunds take three working days, though its policy has not changed in years. What best explains the complaints?",
      opts: [
        "Expectations set by instant payment services are now applied to every other industry",
        "The retailer has been disintermediated by a manufacturer selling directly to those customers",
        "Refunds of this kind became a consumer-protection matter for the first time this year",
        "Three working days is unusually slow by the standards of card refunds generally"
      ],
      a: 0,
      why: [
        "Correct. The chapter notes that fintech services shape expectations on ease and speed, and those expectations do not stay in the industry that set them; the retailer is being measured against a payments app.",
        "Disintermediation would show up as lost sales to a direct seller, not as complaints about the speed of a refund from a purchase the retailer did make. Nothing here says a competitor removed it from the chain.",
        "Consumer protection in electronic commerce is long established rather than new, and a rule change would alter the policy or the deadline itself rather than produce complaints about an unchanged practice.",
        "Card refunds commonly take a few days to appear, so this figure is not unusual within its own industry. The point is that customers are comparing it with a faster industry instead of with its peers."
      ]
    }
  ]
};
