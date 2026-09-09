/* ===== s54 ===== */
PROSE.s54 = `
<span class="eyebrow">Application supplement 5&ndash;4</span>
<h2>Collaboration read through the five forces and the value chain</h2>
<p class="lede">You now know what every tool in this chapter does. That is worth almost nothing on its own. A manager who can list collaboration technologies and a manager who can say which competitive pressure each one relieves are doing different jobs, and only the second one is doing analysis.</p>

<div class="callout info"><b>What this section is.</b> It is an application supplement rather than a textbook objective. It teaches no new framework and assumes you have already met the five competitive forces and the value chain in the strategy chapter. Every firm in it is hypothetical, and it solves no graded case for you.</div>

<h3>The two frameworks, in one list each</h3>
<p>The five forces describe the pressure on a firm's profitability from outside it. A force is not good or bad; it is high or low, and the analyst's job is to say which and on what evidence.</p>
<ul class="keys">
<li><b>Rivalry among existing competitors</b> is pressure from the firms already selling what you sell, into the market you are already in.</li>
<li><b>Threat of new entrants</b> is how easily somebody who is not yet competing could start, which is a question about barriers rather than about anybody in particular.</li>
<li><b>Threat of substitutes</b> is a customer meeting the same need another way entirely, without buying from anybody in your industry.</li>
<li><b>Bargaining power of buyers</b> is your customers' leverage over your price and your terms, including how cheaply they can leave.</li>
<li><b>Bargaining power of suppliers</b> is the leverage held by whoever supplies your inputs, and access to customers is an input like any other.</li>
</ul>
<p>The value chain answers the other half of the question: not what is pressing on the firm, but where inside it value is actually created. Five primary activities carry the product, and four support activities carry the firm.</p>
<ul class="keys">
<li><b>Inbound logistics, operations and outbound logistics</b> are the physical spine: getting inputs in, turning them into something, and getting the result to the customer.</li>
<li><b>Marketing and sales, and service</b> are the customer-facing pair, covering everything that persuades somebody to buy and everything that happens once they have.</li>
<li><b>Firm infrastructure</b> is the shared capability every other activity draws on, including planning, finance, legal and the systems that hold the firm together.</li>
<li><b>Human resource management, technology development and procurement</b> are the three remaining supports: finding and keeping people, improving how the firm makes things, and buying what it needs.</li>
</ul>
<p>A recommendation that does not land in one of those nine is a recommendation nobody can act on.</p>
<p>Both are worth practising outside this module too. A companion page, <a href="five-forces-and-value-chain.html">Five Forces and the Value Chain &mdash; a working review</a>, turns them into a rater, an evidence sort, an investment simulator and three case studies.</p>

<h3>Which force does each tool move?</h3>
<p>Take the forces one at a time. For each, the chain runs the same way: what the force is, what in this chapter moves it, what evidence you would need to claim that, and what a firm can actually do about it.</p>

<div class="activity" data-activity="strDiagram"></div>

<p>The move that matters is the last one in each chain, and it is where most analyses stop too early. Naming a force is a diagnosis. Naming the evidence is what makes the diagnosis contestable, which is the only reason anybody should believe it.</p>

<div class="activity" data-activity="strMatch"></div>

<h3>Where does the work actually land?</h3>
<p>A force tells you what is pressing on the firm. It does not tell you where to do anything about it. That is the value chain's job, and this chapter's technologies land in a surprisingly narrow part of it.</p>
<ul class="keys">
<li><b>Marketing and sales and service</b> take most of the customer-facing tools, because reviews, public replies, viral campaigns and listening centres all act on somebody who is buying or has bought.</li>
<li><b>Technology development</b> takes the internal knowledge tools, because a wiki, a shared design workspace and an engineering forum all change how fast the firm can produce the next thing.</li>
<li><b>Human resource management</b> takes the portal, the self-service form and the professional network, because all three change what employing somebody costs and how the firm finds them.</li>
<li><b>Firm infrastructure</b> takes the intranet, enterprise search and the retention rules, because those are the shared capabilities every other activity draws on rather than work anybody does.</li>
</ul>
<p>Place ten of the chapter's tools yourself, and pay attention to the two that could plausibly sit in more than one activity.</p>

<div class="activity" data-activity="strSort"></div>

<h3>The whole move, on one firm</h3>
<p>Diagnosis, location and recommendation together, on a hypothetical firm facing a real kind of pressure. This is the shape the written analysis takes, compressed into three decisions.</p>

<div class="activity" data-activity="strCase"></div>

<p>One warning before the next section. Every claim in this supplement is an argument rather than a fact about the chapter.</p>
<p>That a wiki sits in technology development, or that a network effect raises an entry barrier, is a reading you are being taught to construct and should be prepared to defend. The evidence line in each chain exists because a reading is only as good as what supports it.</p>
<p class="takeaway">A technology is not a strategy, and neither is a framework. The analysis is the join: this observation, therefore this force, therefore this place in the value chain, therefore this one thing to do. Everything in this module has been building the middle two steps, because they are the ones people skip.</p>

<div class="activity" data-activity="strQuiz"></div>

<p>Before moving to the written deliverable, check honestly whether you could make each of these moves unaided.</p>

<div class="activity" data-activity="strReady"></div>
`;

ACT.strDiagram = {
  kind: "diagram",
  label: "Framework",
  title: "The five forces, one at a time, with this chapter's evidence",
  how: "Step through each force; the chain reads as what the force is, what moves it, what evidence would support the claim, and what a firm can do. The situations are generic rather than any particular company.",
  objective: "5.4",
  models: [
    {
      id: "entrants",
      name: "Threat of new entrants",
      site: "How hard is it for somebody new to start competing with you?",
      boxes: [
        {c: "a", t: "What it is", w: "The cost and difficulty of entering"},
        {c: "b", t: "What moves it here", w: "Cloud tools, and network effects"},
        {c: "c", t: "Evidence to look for", w: "Entrants launching without capital"},
        {c: "d", t: "What a firm can do", w: "Build what an entrant cannot copy"}
      ],
      points: [
        "Cloud-based collaboration tools raise this threat against you. A competitor now assembles a distributed team with free software and no premises, so the coordination capability you spent years building is available on a subscription.",
        "Network effects push the other way and are the strongest barrier in this chapter. A community, a review corpus or an internal knowledge base grows more valuable with every participant, and a new entrant starts at zero on all three.",
        "The evidence is concrete: how many competitors appeared in the last two years, what they needed to start, and how long a new customer waits before your accumulated reviews or community become the reason they choose you."
      ]
    },
    {
      id: "buyers",
      name: "Bargaining power of buyers",
      site: "How much can your customers push you on price and terms?",
      boxes: [
        {c: "a", t: "What it is", w: "Customers' leverage over you"},
        {c: "b", t: "What moves it here", w: "Reviews, comparison, public complaint"},
        {c: "c", t: "Evidence to look for", w: "Price sensitivity and switching"},
        {c: "d", t: "What a firm can do", w: "Compete on what is not comparable"}
      ],
      points: [
        "Social media raises buyer power, and this is the force this chapter moves furthest. Buyers arrive having read what other buyers said, and a complaint from one of them reaches an audience that used to require a broadcaster.",
        "The subtler shift is that the buyer's information is now better than the seller's account of itself. A product page written by the firm competes with a hundred owners describing what actually happened.",
        "The evidence is in the returns log, the abandonment rate, what proportion of buyers arrive from a comparison or a review, and how quickly a public complaint changes anybody's behaviour."
      ]
    },
    {
      id: "suppliers",
      name: "Bargaining power of suppliers",
      site: "How much leverage do the people you depend on have over you?",
      boxes: [
        {c: "a", t: "What it is", w: "Leverage held by your inputs"},
        {c: "b", t: "What moves it here", w: "Platforms, and the labour market"},
        {c: "c", t: "Evidence to look for", w: "Share of business through one channel"},
        {c: "d", t: "What a firm can do", w: "Own a relationship you can keep"}
      ],
      points: [
        "The platform that carries your customers is a supplier, and an unusually powerful one. It lends you its audience, keeps the relationship, sets the commission, and can change either without negotiating.",
        "Crowdsourcing and open source cut the other way by reducing what a specialist supplier can charge. A labelling agency, a stock photography library or a proprietary software vendor each faces an alternative that did not exist.",
        "The evidence is the share of revenue arriving through any single channel, what that channel keeps, whether the firm holds the customer's contact details, and what the switching cost would be if terms changed tomorrow."
      ]
    },
    {
      id: "subs",
      name: "Threat of substitutes",
      site: "What else could your customer do instead of buying from anybody in your industry?",
      boxes: [
        {c: "a", t: "What it is", w: "A different way to meet the need"},
        {c: "b", t: "What moves it here", w: "Peer production and free tools"},
        {c: "c", t: "Evidence to look for", w: "Customers meeting the need elsewhere"},
        {c: "d", t: "What a firm can do", w: "Sell what the substitute cannot"}
      ],
      points: [
        "This is the force people most often misidentify. A cheaper rival is rivalry; a customer meeting the same need by another route entirely is a substitute, and peer production is very good at creating those.",
        "A community that answers each other's questions substitutes for paid support. A free encyclopaedia substituted for a purchased one. A crowd that labels images substitutes for a service firm that employed people to do it.",
        "The evidence is where the need is being met now: forum threads answering what your support desk used to, or a free tool covering the work a purchase used to cover, counted rather than asserted."
      ]
    },
    {
      id: "rivalry",
      name: "Rivalry among existing competitors",
      site: "How hard are the firms already in your industry competing, and on what?",
      boxes: [
        {c: "a", t: "What it is", w: "Pressure from firms like yours"},
        {c: "b", t: "What moves it here", w: "Speed, visibility, and response"},
        {c: "c", t: "Evidence to look for", w: "How fast rivals answer, and where"},
        {c: "d", t: "What a firm can do", w: "Change the basis, not just the pace"}
      ],
      points: [
        "Collaboration tools raise rivalry by compressing cycles. When a competitor can convene the right people in an hour and ship a change in a week, matching them is now part of competing rather than an ambition.",
        "Visibility is the other half. Every rival's response time, tone and failures are public, so customers compare service on evidence they can read rather than on reputation.",
        "The evidence is a comparison anybody can gather in an afternoon: how long each competitor takes to answer a public complaint, on which channels, and what a customer sees when they look for each firm by name."
      ]
    }
  ]
};

ACT.strMatch = {
  kind: "match",
  label: "Match",
  title: "The observation, and the force it is evidence of",
  how: "Pair each observation with the force it belongs to; every pair explains itself once matched, including why the neighbouring force is the wrong answer.",
  objective: "5.4",
  pairs: [
    {
      l: "A competitor launched last year with a distributed team, free collaboration tools and no premises",
      r: "Threat of new entrants: the cost of entering fell",
      why: "The capability that used to require capital is now a subscription, so the barrier protecting incumbents has come down. Note this is about somebody arriving, not about how hard the firms already present are competing."
    },
    {
      l: "Buyers arrive having read other customers' reviews and compared prices before they contact you",
      r: "Bargaining power of buyers: information moved to their side",
      why: "The customer now knows the market before the conversation starts, which is leverage. It would be rivalry only if the pressure came from what a competitor did rather than from what the buyer knows."
    },
    {
      l: "The marketplace carrying most of your orders raised its commission again this year",
      r: "Bargaining power of suppliers: a channel you depend on",
      why: "The platform supplies your access to customers, which makes it an input, and its power grows with the share of your revenue it carries. Concentration in one channel is the whole of the problem."
    },
    {
      l: "Two competitors answer public complaints within the hour, and yours take three days",
      r: "Rivalry among existing competitors: the basis of competition shifted",
      why: "Firms already in the industry are competing on a dimension that used to be invisible. Nobody new arrived and nothing was substituted; the same players changed what they compete on."
    },
    {
      l: "A free package maintained by volunteers now does most of what your paid product does",
      r: "Threat of substitutes: another way to meet the same need",
      why: "The customer's need is met without buying from anybody in your industry, which is what makes it a substitute rather than a rival. Peer production is unusually good at producing these."
    },
    {
      l: "Every additional member makes the incumbent platform more useful, and almost nobody leaves",
      r: "A barrier to entry the incumbent never had to build",
      why: "The network effect is doing the work of a moat. It was not purchased or engineered, it strengthens with use, and a challenger has to overcome it before its product is even compared."
    }
  ]
};

ACT.strSort = {
  kind: "sort",
  label: "Sort",
  title: "Where in the value chain does each tool do its work?",
  how: "Place each tool in the activity where the work actually happens; two of these could argue for a second home, and the reason says which and why.",
  objective: "5.4",
  buckets: [
    {id: "mkt", name: "Marketing and sales", hint: "Everything that acts on somebody deciding whether to buy."},
    {id: "svc", name: "Service", hint: "Everything that acts on somebody who has already bought."},
    {id: "tech", name: "Technology development", hint: "Everything that changes how fast or how well the firm can produce the next thing."},
    {id: "hr", name: "Human resource management", hint: "Everything that changes what employing people costs, or how the firm finds them."},
    {id: "infra", name: "Firm infrastructure", hint: "Shared capability every other activity draws on, rather than work anybody does."}
  ],
  items: [
    {t: "Customer reviews published on your own product pages", b: "mkt", why: "They act before the purchase, on somebody deciding. A review also helps an existing owner, and the value the firm captures is the next sale, which is what places it here."},
    {t: "A viral campaign built so that people pass it on", b: "mkt", why: "Brand awareness spread through a network is promotion by another mechanism. The network effect is how it travels; the activity it belongs to is unchanged."},
    {t: "A live chat window staffed by support agents", b: "svc", why: "It engages somebody who already owns the product and has a problem with it, which is the definition of the service activity."},
    {t: "A social media listening centre that catches complaints early", b: "svc", why: "Its purpose is answering a customer before a problem spreads. It also produces business intelligence, which is a genuine second use and a by-product rather than the reason it exists."},
    {t: "An engineering wiki holding problems the firm has already solved", b: "tech", why: "It changes how quickly the firm can produce the next design, which is technology development. Nobody buys anything because of it and no customer ever sees it."},
    {t: "A shared workspace where engineers revise the same design file", b: "tech", why: "The chapter's own example cut product development cycle time, which is the clearest statement of what this activity is for."},
    {t: "An employee portal for benefits, leave and payroll self-service", b: "hr", why: "It changes the cost of administering employment. The saving is real and lands in a support activity, which is why it never shows up in the price of the product."},
    {t: "A professional network used to find and approach candidates", b: "hr", why: "Recruiting is human resource management, and the network changes both the reach of a search and what it costs to run one."},
    {t: "An intranet with enterprise search across every internal system", b: "infra", why: "It is not work anybody does; it is a capability every other activity draws on, which is exactly what firm infrastructure means."},
    {t: "Retention and access rules for collaboration channels, for compliance", b: "infra", why: "Governance sits in infrastructure alongside legal, finance and planning. It enables the other activities to operate safely rather than producing anything itself."}
  ]
};

ACT.strCase = {
  kind: "case",
  label: "Mini case",
  title: "The forum turned out to be the moat",
  how: "Read the brief and the exhibit, then take the three decisions in order; the firm and every figure attached to it are hypothetical and were invented for this exercise.",
  objective: "5.4",
  brief: "A small firm sells electronics kits to hobbyists and has run a busy user forum for nine years, where owners answer each other's questions and publish their own projects. A large consumer electronics manufacturer has just launched a near-identical kit at two-thirds the price, with a support telephone line and no community. The small firm's owners are deciding how to respond. The firm is hypothetical and every figure attached to it is invented.",
  facts: [
    {k: "The firm", v: "A small maker of electronics kits for hobbyists, twenty-two staff"},
    {k: "What it also runs", v: "A user forum, nine years old, where owners answer each other"},
    {k: "What changed", v: "A large manufacturer launched a near-identical kit at two-thirds the price"},
    {k: "What the competitor has", v: "Scale, distribution, and a support telephone line"},
    {k: "What the competitor lacks", v: "Any community, and nine years of accumulated answers"}
  ],
  exhibit: {
    name: "Exhibit A &middot; What the forum does, counted",
    caption: "A year of forum activity beside the firm's own support and sales figures. Every figure here is invented for practice and none of it is reported data.",
    headers: ["What was counted", "Figure", "What it would have cost otherwise"],
    rows: [
      ["Questions answered by other owners, not by staff", "11,400", "About US$228,000 in support time"],
      ["Questions that reached the firm's own support desk", "1,900", "Already paid for in staff time"],
      ["Project write-ups published by owners", "640", "Content the firm did not write"],
      ["New buyers who cite the forum as the reason they chose the kit", "38 percent", "Acquisition the firm did not pay for"],
      ["Threads answering a question asked more than five times", "2,050", "A support cost that never recurs"],
      ["Owners who have posted at least once", "17 percent of buyers", "The participation the rest depends on"]
    ]
  },
  questions: [
    {
      q: "The competitor is larger, cheaper and better distributed. Which force is the forum actually acting on?",
      opts: [
        "The threat of new entrants, because it is a barrier a challenger has to overcome",
        "Rivalry, because it is how the firm differentiates against a direct competitor",
        "Buyer power, because owners who post are less price-sensitive than those who do not",
        "The threat of substitutes, because the forum substitutes for the firm's own support"
      ],
      a: 0,
      why: [
        "Correct. The forum is a network-effect asset that grows with participation and cannot be bought or built quickly. That is a barrier to entry, and it explains why a larger, cheaper competitor is not automatically going to win.",
        "Differentiation against this competitor is what the forum does today, and framing it as rivalry misses why it works. A rival can match a feature; nine years of accumulated answers is not a feature.",
        "Nothing in the exhibit measures the price sensitivity of contributors, and inventing that relationship to reach buyer power is exactly the unsupported move this supplement warns against.",
        "The forum does absorb support work, and a substitute is something the customer uses instead of buying from the industry at all. Here it is part of what they bought."
      ]
    },
    {
      q: "Where in the value chain does the forum do its work? The exhibit supports more than one answer.",
      opts: [
        "Service only, since almost all of the counted activity is answering questions",
        "Marketing and sales only, since it is what thirty-eight percent of buyers cite",
        "Service and marketing and sales, because it both resolves and persuades",
        "Firm infrastructure, since it is a shared capability the whole firm draws on"
      ],
      a: 2,
      why: [
        "Service is where most of the volume sits and it accounts for only part of the value. Stopping there would miss the acquisition line entirely, which is the larger commercial number.",
        "The acquisition effect is real and it is the smaller half of what the exhibit shows. Eleven thousand answered questions is service work by any definition.",
        "Correct. The exhibit deliberately holds two things: support work the firm did not pay for, and acquisition it did not pay for. An honest analysis names both, and the assessment asks for at least two areas for this reason.",
        "Infrastructure is capability every activity draws on, such as the intranet or the governance rules. The forum does specific customer-facing work, so it belongs with the activities that do it."
      ]
    },
    {
      q: "The owners can fund one initiative. Which recommendation follows from the analysis rather than from the panic?",
      opts: [
        "Cut the kit price to match the competitor, and absorb the margin loss",
        "Invest in the forum's participation, since seventeen percent carries everything",
        "Add a support telephone line, so the firm matches the competitor's offer",
        "Advertise the community heavily, so more buyers hear about it before choosing"
      ],
      a: 1,
      why: [
        "Price is the dimension the competitor chose because it wins there. Meeting it spends the firm's margin on a fight it is structurally placed to lose, and it does nothing to the asset the analysis identified.",
        "Correct. Every number in the exhibit rests on the seventeen percent who post, which makes participation the single point of failure and the only input that compounds. It answers the force the analysis named rather than the competitor's move.",
        "A telephone line copies the competitor's weaker substitute for what the firm already has, adds fixed cost, and would reduce forum participation by removing the reason to post.",
        "Promotion converts an existing asset into more sales and does nothing to strengthen it. It is also the recommendation most likely to be chosen because it feels active, which is why it is worth naming as declined."
      ]
    }
  ],
  debrief: "Three moves, in order, and none of them optional. The observation is a cheaper competitor. The force is not rivalry, which is where instinct goes, but the threat of new entrants, because what protects this firm is a network-effect asset a challenger cannot buy. The location is two value-chain activities rather than one, since the exhibit measures both support absorbed and buyers acquired. And the recommendation follows from the force: strengthen the thing that compounds, rather than matching a price on a dimension chosen by somebody with more scale. Notice that the analysis also names what it declined and why, which is an analytical move rather than a hedge."
};

ACT.strQuiz = {
  kind: "quiz",
  label: "Check",
  title: "Forces, activities, and the join between them",
  how: "Three questions on using the frameworks rather than reciting them; every option explains itself, including the ones you did not pick.",
  objective: "5.4",
  questions: [
    {
      q: "A firm writes: our customers are very active on social media, so buyer power is high. What is wrong with it?",
      opts: [
        "Nothing, since customer visibility on social media is what raises buyer power",
        "Social media activity is a substitutes question rather than a buyer-power question",
        "Activity is not leverage; the claim needs evidence that buyers can act on the firm",
        "Buyer power should be rated against industry averages rather than in absolute terms"
      ],
      a: 2,
      why: [
        "Visibility contributes to buyer power and does not constitute it. The sentence as written would be equally true of a firm whose customers cannot switch, which is where the reasoning fails.",
        "The observation is about the firm's own customers, so it is not a substitute question. Misfiling it would replace one unsupported claim with another.",
        "Correct. Buyer power is leverage: the ability to push on price or terms, or to leave. Evidence would be switching rates, price sensitivity, or a public complaint that visibly changed the firm's behaviour, none of which is in that sentence.",
        "Comparison against an industry is useful context and does not fix an unsupported claim. A claim with no evidence is unsupported at any benchmark."
      ]
    },
    {
      q: "Which pairing of force and value-chain activity is the strongest fit?",
      opts: [
        "High buyer power, answered by better inbound logistics from key suppliers",
        "High threat of substitutes, answered by more spending on human resource management",
        "High supplier power from one platform, answered by owning the customer relationship",
        "High rivalry, answered by improving procurement terms on components"
      ],
      a: 2,
      why: [
        "Inbound logistics governs how materials reach the firm and does nothing about customers' leverage. This is the shape of error where the recommendation lands in an unrelated activity.",
        "Substitutes describe customers meeting a need elsewhere, and hiring more people does not address that. A response would have to change what the firm offers or what it costs.",
        "Correct. A platform holding your customers is a powerful supplier, and the response is to build a relationship the platform does not intermediate, which is marketing and sales work aimed squarely at the force identified.",
        "Cheaper components help margin and can support a price move. As a general answer to rivalry it names an activity without saying what dimension of competition is being contested."
      ]
    },
    {
      q: "Why does the analysis insist on locating the fix in a specific value-chain activity?",
      opts: [
        "Because the framework requires every recommendation to reference a named activity",
        "Because it converts a diagnosis into a place where work can be assigned and measured",
        "Because forces describe the industry, and activities describe the individual firm",
        "Because a recommendation in a support activity is cheaper than one in a primary activity"
      ],
      a: 1,
      why: [
        "Satisfying a framework is not a reason to do anything. If naming the activity added nothing, the requirement would be ceremony.",
        "Correct. A force says what is pressing on the firm; an activity says where somebody can be given the work, what it will cost and what to measure afterwards. Without that a recommendation cannot be acted on or judged.",
        "The distinction between industry-level and firm-level analysis is real and is a description of what the two frameworks cover rather than a reason to combine them.",
        "Cost varies enormously in both, and this chapter contains cheap primary-activity changes and expensive infrastructure ones. Nothing about the category predicts the price."
      ]
    }
  ]
};

ACT.strReady = {
  kind: "selfcheck",
  label: "Ready?",
  title: "Can you make the three moves unaided?",
  how: "Rate each statement honestly; anything you cannot do yet has a pointer back to the part of this module to reread.",
  objective: "5.4",
  items: [
    {t: "I can name all five forces and say what each one is pressure from, without looking.", hint: "Go back to the two-paragraph refresher at the top of this section, and to the framework walkthrough that follows it."},
    {t: "I can name the nine value-chain activities and tell a primary one from a support one.", hint: "Go back to the second paragraph of this section, and to the sort that places ten tools across five of the activities."},
    {t: "I can explain why a network effect is an entry barrier rather than a form of rivalry.", hint: "Go back to the first panel of the framework walkthrough, and to the last pair in the matching exercise."},
    {t: "I can explain why a platform that carries your customers counts as a supplier.", hint: "Go back to the supplier panel of the framework walkthrough, and to the third pair in the matching exercise."},
    {t: "I can tell an observation from a force, and say what evidence would turn one into the other.", hint: "Go back to the evidence line in each panel of the walkthrough, and to the first question of the closing check."},
    {t: "I can take one observation and carry it through force, activity and recommendation in order.", hint: "Go back to the mini case, whose three decisions are exactly those three moves in sequence."}
  ]
};
