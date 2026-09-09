/* ===== s52a ===== */
PROSE.s52a = `
<span class="eyebrow">Section 5&ndash;2a</span>
<h2>The web that answers back</h2>
<p class="lede">Everything in the first half of this chapter is a firm talking to itself. This half is about what happened when the web stopped being a broadcast, and the people a company used to talk at started producing the content about it.</p>

<h3>One change, and everything downstream of it</h3>
<p>Until the early 2000s the web was treated as a one-way medium. Some organizations made content; everybody else consumed it. The chapter calls that arrangement Web 1.0, and it holds a strict line between the two roles.</p>
<p><b>Web 2.0</b> names the dynamic applications that broke the line. They let people collaborate and share online, which turns a user from a consumer of content into a creator of it. The chapter's own comparison is the sharpest one available: a television network's site carries what the network made, while a video-sharing site carries <b>user-generated content</b> and would be empty without it.</p>
<p>The same contrast holds for reference material, and businesses adopted the pattern almost immediately once they saw what it bought them.</p>
<ul class="keys">
<li><b>Reference works changed hands</b>: a traditional encyclopaedia commissions professionally researched articles, while an online one is written and edited by its own readers, and the chapter notes the older publisher stopped printing in 2012.</li>
<li><b>Retailers took the cheapest version of the deal</b>, adding customer reviews to product pages and gaining a channel for customers, better decisions for the next shopper, and more traffic, without writing any of it.</li>
<li><b>Platform businesses took the whole premise</b>, matching people who have something with people who want it, which leaves the platform owning no inventory and producing no content.</li>
</ul>
<p>Sort eight postures into the era each belongs to, using the shift the chapter tabulates.</p>

<div class="activity" data-activity="webSort"></div>

<h3>Social media is the part of Web 2.0 that matters here</h3>
<p>Applications that embody the collaborative and sharing values of Web 2.0 are classed as <b>social media</b>, or social software: they let people communicate, interact and collaborate. That is the whole category, and it is broader than the handful of large sites people picture.</p>
<p>What follows from that is societal rather than technical, and the chapter names three shifts.</p>
<ul class="keys">
<li><b>How people look for information</b> changed: a network of acquaintances is now consulted where a reference work used to be, which is a change in whose judgement is trusted.</li>
<li><b>What people treat as private</b> shifted markedly, and the chapter is unsentimental about the consequences of publishing without considering who eventually reads it.</li>
<li><b>Every conversation now generates data</b>, which the platforms use and which the organizations operating on those platforms increasingly use as well.</li>
</ul>

<h3>The workplace inherited the expectations</h3>
<p>The people who grew up on these tools now work. The chapter reports a set of changed expectations that has more to do with employment than with software.</p>
<ul class="keys">
<li><b>A portfolio career instead of a single long job</b>, which changes how long a firm has to capture what an employee knows before they take it somewhere else.</li>
<li><b>Loaning talent rather than being a resource</b>, a shift in self-description that shows up in what people expect to be consulted about.</li>
<li><b>Working across the old boundaries</b>, so that a firm collaborates with customers and partners with rivals rather than treating industry lines as walls.</li>
</ul>
<p>The managerial consequence is concrete. A firm that blocks social tools at work will find that people route around the block or take a job somewhere that does not have one. Whether that is fair is a separate question from whether it is true.</p>

<div class="activity" data-activity="webCase"></div>

<h3>What is still a forecast</h3>
<p>Two ideas in this chapter have not arrived, and it is worth being precise about which parts have.</p>
<p>The <b>semantic web</b> is a set of design principles that would let computers index pages by meaning rather than by keywords, so a search for what eats penguins returns an answer rather than pages containing three words.</p>
<p>Search engines ask <b>webmasters</b> to add structured markup for exactly this reason, and one large engine's knowledge panels are a visible result. The full vision remains largely unrealized, and may stay that way on grounds of complexity, feasibility and privacy.</p>
<p><b>Web 3.0</b> is contested even as a term. Some frame it around mobility, some around context &mdash; content filtered by time, location and activity &mdash; and some around artificial intelligence extending what the web can do. Treat it as a set of competing forecasts rather than a description of anything.</p>
<p class="takeaway">The shift that matters is not technical. When the audience became the authors, a firm lost its monopoly on what is said about it, and gained a source of labour, content and judgement it does not employ. Every remaining section of this chapter is a consequence of that one trade.</p>

<div class="activity" data-activity="webFill"></div>

<p>Three questions on the era, the vocabulary and the forecasts before you move on.</p>

<div class="activity" data-activity="webQuiz"></div>
`;

ACT.webSort = {
  kind: "sort",
  label: "Sort",
  title: "Which era does each posture belong to?",
  how: "Sort each posture into the era the chapter's comparison places it in; the reason appears as soon as you drop it.",
  objective: "5.2",
  buckets: [
    {id: "one", name: "Web 1.0 posture", hint: "A strict line between the few who create content and the many who consume it."},
    {id: "two", name: "Web 2.0 posture", hint: "The line is gone: users create, share and connect, and the site depends on them doing so."}
  ],
  items: [
    {t: "A broadcaster's site carrying only what the broadcaster produced", b: "one", why: "The chapter's own example of the older arrangement: the organization supplies the content and the audience receives it, which is the whole of the relationship."},
    {t: "A video site whose catalogue was uploaded by its viewers", b: "two", why: "User-generated content in its purest form. Remove the users and there is no product left, which is exactly what distinguishes this from a broadcaster's site."},
    {t: "Professionally researched articles commissioned and paid for by a publisher", b: "one", why: "Expertise bought in advance and published outward. The chapter contrasts this directly with an encyclopaedia its own readers write."},
    {t: "An encyclopaedia article edited by anyone who reads it", b: "two", why: "The community both produces and corrects the content, which is peer production and the reason the chapter treats it as the defining Web 2.0 case."},
    {t: "Finding information by searching for keywords yourself", b: "one", why: "The chapter's shift table pairs search with recommendation. Searching alone is the earlier posture, where the user does all the locating."},
    {t: "Finding a restaurant because people you know recommended it", b: "two", why: "Receiving and giving recommendations is the later half of that same pair, and it makes other people rather than an index the route to information."},
    {t: "A site whose content only its technical staff can change", b: "one", why: "The chapter summarises the older era as one where technically skilled people ruled, because publishing required them."},
    {t: "A retailer's product page carrying reviews written by its customers", b: "two", why: "The firm supplies the catalogue and its customers supply the judgement. The chapter names this as a business deliberately incorporating Web 2.0 into its model."}
  ]
};

ACT.webCase = {
  kind: "case",
  label: "Mini case",
  title: "Should the customers be allowed to write?",
  how: "Read the brief and the exhibit, then take the three decisions in order; the firm and every figure attached to it are hypothetical and were invented for this exercise.",
  objective: "5.2",
  brief: "A specialist outdoor equipment retailer sells through a catalogue site it writes entirely itself. Its product descriptions are careful and its returns rate is high, because customers buy boots and tents that turn out to be wrong for them. A proposal on the table would add customer reviews and photographs to every product page. The marketing director is against it. The firm is hypothetical and every figure attached to it is invented.",
  facts: [
    {k: "The firm", v: "A specialist retailer of outdoor clothing and camping equipment"},
    {k: "How its pages are written now", v: "Entirely in-house, by two staff writers working from supplier data"},
    {k: "The problem", v: "A high returns rate, concentrated in fit and suitability rather than in faults"},
    {k: "The proposal", v: "Customer reviews and photographs on every product page"},
    {k: "The objection", v: "The marketing director expects negative reviews to cost sales"}
  ],
  exhibit: {
    name: "Exhibit A &middot; What the returns log says",
    caption: "Twelve months of returns, grouped by the reason the customer gave. Every figure here is invented for practice and none of it is reported data.",
    headers: ["Reason given for the return", "Share of returns", "What the product page said"],
    rows: [
      ["Sizing ran small or large for this brand", "34 percent", "The supplier's size chart, unedited"],
      ["Not suitable for the conditions the buyer had in mind", "26 percent", "A general description of the product's purpose"],
      ["Heavier or bulkier than expected", "17 percent", "A weight in grams, with nothing to compare it to"],
      ["Colour differed from the photograph", "12 percent", "One supplier photograph on a white background"],
      ["Faulty or damaged", "6 percent", "Not a description problem"],
      ["Changed their mind", "5 percent", "Not a description problem"]
    ]
  },
  questions: [
    {
      q: "The exhibit is a returns log. What is the argument for reading it as an argument about reviews?",
      opts: [
        "Returns are expensive, and reviews are the cheapest way to reduce any cost",
        "Nearly nine in ten returns come from information the firm's own writers cannot supply",
        "Customers who return an item are the most likely to write a review afterwards",
        "A high returns rate signals poor products, which reviews would help the firm identify"
      ],
      a: 1,
      why: [
        "Cost alone does not point at a solution. Plenty of expensive problems are not fixed by reviews, and the exhibit is doing more work than establishing that returns cost money.",
        "Correct. Sizing against other brands, suitability for particular conditions, real bulk and real colour are all things an owner knows and a staff writer working from supplier data does not. That is eighty-nine percent of returns.",
        "There may well be a relationship, and it cuts the wrong way for this argument: reviews written mostly by disappointed buyers would be the marketing director's case rather than the proposal's.",
        "Only six percent of returns are faults. The log describes a description problem rather than a quality problem, and reading it as the latter misses what it is showing."
      ]
    },
    {
      q: "The marketing director says negative reviews will cost sales. What is the strongest response the chapter supports?",
      opts: [
        "Negative reviews can be removed, so the risk is manageable with a moderation policy",
        "Negative reviews are rare enough on specialist products that the risk is small",
        "A larger body of reviews helps buyers choose better, and that is what draws visitors",
        "Buyers discount reviews heavily, so their effect on sales in either direction is slight"
      ],
      a: 2,
      why: [
        "Removing unfavourable reviews is the practice the chapter treats as undermining trust in review systems altogether, and it destroys the credibility that makes the good reviews worth anything.",
        "Nothing supports this, and a firm whose returns are driven by fit and suitability should expect a substantial minority of disappointed owners to say so.",
        "Correct. The chapter's account of a retailer adding reviews is that a larger number of reviews helps other customers make better decisions and attracts more visitors to the site, which is the return the firm is buying.",
        "Treating reviews as ignored would remove the benefit along with the risk. The whole proposal rests on buyers acting on what other buyers report."
      ]
    },
    {
      q: "What should the firm expect to have to do that it does not do today?",
      opts: [
        "Monitor and respond to what appears on its own pages, as a continuing cost",
        "Employ more staff writers, because review pages need more editorial oversight",
        "Verify each reviewer's purchase, since unverified reviews carry no weight with buyers",
        "Reduce the returns window, since better information should mean fewer legitimate returns"
      ],
      a: 0,
      why: [
        "Correct. The chapter is explicit that a page carrying user content is not free to run: it has to be watched and answered, and the firm has to decide where the line between unwelcome and unacceptable sits before anything appears on it.",
        "More writers is the opposite of what the proposal does. The point is that owners supply the information the writers cannot, so the writing load falls rather than rises.",
        "Verification raises trust and is a design choice rather than a requirement. Plenty of review systems run without it, and the chapter's concern is with reviews that are deliberately fabricated rather than merely unverified.",
        "Shortening the returns window punishes customers for a problem the firm created and would not follow from better information. It also has nothing to do with reviews."
      ]
    }
  ],
  debrief: "The returns log is the evidence, and it says the firm's own writers cannot produce the information its buyers need: how a brand's sizing compares, whether a tent suits particular conditions, how heavy something really feels. Owners know all of it. That is the trade Web 2.0 offers a business, stated exactly: you get content, judgement and traffic you did not pay for, and you give up control over what is said on your own pages. The marketing director's fear is real and is priced into the deal rather than avoidable, and the continuing cost of the arrangement is not the reviews themselves but the watching and answering they oblige the firm to do."
};

ACT.webFill = {
  kind: "fill",
  label: "Complete",
  title: "The vocabulary of the evolving web",
  how: "Choose the term that completes each sentence; each blank explains why the other options do not fit.",
  objective: "5.2",
  blanks: [
    {
      before: "Content created and uploaded by a site's own visitors, rather than by the organization running the site, is ",
      after: ", and a video-sharing site would have nothing to show without it.",
      choices: ["peer production", "user-generated content", "collective intelligence", "crowdsourcing"],
      a: 1,
      why: "Peer production and collective intelligence describe how a community produces something jointly, and crowdsourcing is work a firm distributes and usually pays for. This term is simply about who created the content."
    },
    {
      before: "Applications that let people communicate, interact and collaborate, embodying the collaborative and sharing values of the later web, are called ",
      after: ", which is a whole category rather than a handful of large sites.",
      choices: ["social media", "electronic conferencing tools", "employee portals", "content management systems"],
      a: 0,
      why: "The other three are specific tools from earlier in the chapter. This term is the category that covers them when their defining feature is social participation."
    },
    {
      before: "A set of design principles intended to let computers index pages by meaning rather than by keywords is the ",
      after: ", which the chapter describes as largely unrealized.",
      choices: ["contextual web", "knowledge graph", "semantic web", "social web"],
      a: 2,
      why: "A knowledge graph is one search engine's partial implementation of the idea, and the contextual web is one proposed reading of what comes next. The design principles themselves have their own name."
    },
    {
      before: "The person responsible for creating and maintaining a site's pages, and the person search engines ask to add structured markup, is the ",
      after: ", which is a role rather than a technology.",
      choices: ["systems analyst", "webmaster", "content manager", "knowledge officer"],
      a: 1,
      why: "The chapter names this role specifically when it explains how the semantic web would have to be built: page by page, by the people who maintain them."
    },
    {
      before: "The label given to the next wave of internet technologies, variously framed around mobility, context or artificial intelligence, is ",
      after: ", and the chapter treats it as a forecast rather than a description.",
      choices: ["Web 3.0", "Web 2.0", "the social web", "the mobile web"],
      a: 0,
      why: "Web 2.0 has already happened and is the era this section describes. The other two name single aspects of what various people expect the next wave to be about."
    }
  ]
};

ACT.webQuiz = {
  kind: "quiz",
  label: "Check",
  title: "Eras, categories, and forecasts",
  how: "Three questions on what actually changed and what has not yet; every option explains itself, including the ones you did not pick.",
  objective: "5.2",
  questions: [
    {
      q: "A firm says it has adopted Web 2.0 because it redesigned its site and added a news feed it writes itself. What is wrong with that claim?",
      opts: [
        "Nothing, provided the feed is updated frequently enough to count as dynamic",
        "The site is still one-way, since the firm creates and the visitors consume",
        "A news feed is a communication tool, and Web 2.0 requires conferencing tools",
        "The claim needs a social network account before the firm can make it"
      ],
      a: 1,
      why: [
        "Frequency of publication was never the distinction. A daily bulletin and a monthly one are both the organization talking and the audience listening.",
        "Correct. The shift the chapter describes is in who creates the content. A redesigned site with a firm-written feed keeps the strict line between creator and consumer that defines the earlier era.",
        "The three families of collaboration tools belong to the first half of the chapter and do not classify eras. A conferencing tool used one-way would be just as one-way.",
        "Presence on a particular platform is not the test. A firm could run reviews, a community forum and a wiki entirely on its own site and have changed the relationship completely."
      ]
    },
    {
      q: "Which statement about the semantic web is accurate as the chapter describes it?",
      opts: [
        "It has replaced keyword search at the major engines, which now index by meaning",
        "It was abandoned because privacy regulation made structured markup unworkable",
        "It is largely unrealized, though structured markup has produced visible results",
        "It is a proprietary standard that one search engine developed and then published"
      ],
      a: 2,
      why: [
        "Keyword matching remains the foundation of web search. Meaning-based indexing is the ambition, and the chapter is careful to say the vision has not been reached.",
        "Privacy is named as one of the reasons the full vision may never be realized, alongside complexity and feasibility. Nothing was abandoned, and markup is in wide use.",
        "Correct. The chapter calls the semantic web largely unrealized while pointing at what has worked: engines encourage structured markup, and one engine's knowledge panels show computers getting closer to the meaning of a page.",
        "The idea was proposed by one of the inventors of the web as a set of open design principles, not developed inside a company as a proprietary standard."
      ]
    },
    {
      q: "A manufacturer bans social media on company devices to protect productivity. What does the chapter suggest will follow?",
      opts: [
        "Productivity will rise, since the chapter treats social tools as a distraction at work",
        "Staff will route around the ban or leave, and the firm loses the tools' benefits too",
        "Nothing will change, because work accounts are separate from personal accounts",
        "The firm will need a written policy before the ban can be enforced at all"
      ],
      a: 1,
      why: [
        "The chapter makes no such claim. It treats these tools as a source of culture, customer relationships, recruitment and competitive insight, which is why banning them is not a free choice.",
        "Correct. The chapter says people will find creative workarounds or move to an employer that does not have the ban, and that embracing these tools is argued to be good for business as well as for retention.",
        "The chapter's concern is precisely that the separation does not hold: people use whichever tools they are used to, which is the consumerization the later sections describe.",
        "A written policy is good practice and is a matter of how a ban is implemented. It says nothing about what happens once it is."
      ]
    }
  ]
};
