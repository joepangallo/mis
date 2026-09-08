/* ===== s45d ===== */
PROSE.s45d = `
<span class="eyebrow">Section 4&ndash;5d</span>
<h2>Legal ground: consumers, tax, and intellectual property</h2>
<p class="lede">A storefront anybody can reach also reaches into places whose rules you have never read. The chapter picks out three issues that follow, and this section walks each to the question it puts to a small seller.</p>

<h3>Three issues, and one standing caution</h3>
<p>The chapter names consumer protection, taxation of online purchases, and intellectual property as the three that matter most, especially for digital products. Non-compliance brings penalties and damages customer relationships.</p>
<p>One caution stands over all of it. Particulars differ by jurisdiction and they change, so what follows is the shape of each obligation. Whether a duty reaches your business is a question for somebody qualified.</p>

<h3>Selling to somebody who cannot touch the goods</h3>
<p>Offline a customer picks the thing up. Online that interaction is missing, so the buyer leans on what the seller says. The chapter puts transparency and accuracy at the centre of this.</p>
<p>Two duties come up in most places, in the chapter&rsquo;s account.</p>
<ul class="keys">
<li><b>A clear return and refund policy</b> &mdash; written so an ordinary reader understands it, and displayed prominently rather than buried three clicks down.</li>
<li><b>No deceptive practice</b> &mdash; false advertising and misleading claims about a product&rsquo;s quality, benefits or price are commonly prohibited, whatever the seller intended.</li>
</ul>
<p>Compliance keeps you out of trouble, but the chapter&rsquo;s reason for going further is commercial. Its example is a retailer whose generous returns cost a great deal in reverse logistics and raise revenue anyway.</p>
<p>Then the borderless part. The chapter reports an attempt to harmonize these rules across the European Union, while in the United States fraudulent practices sit with a federal trade regulator and other matters sit at state level.</p>
<p>Because many of these rules apply based on where the <b>customer</b> is, not where the seller sits, many sellers write one policy to the strictest set they expect to meet.</p>

<div class="activity" data-activity="lawCase"></div>

<h3>Where a tax can attach</h3>
<p>The trigger column the studio just read has a name behind it. Online sales were once treated like mail order: tax was collected only from customers in a state where the business had substantial presence, so firms chose home bases offering effectively tax-free shopping.</p>
<p>The chapter reports that a 2018 Supreme Court ruling changed that shape. States may collect from sellers with no physical location once certain sales thresholds are reached, known as economic nexus. Tracking volume and collecting the tax becomes the seller&rsquo;s work.</p>
<p>Crossing a border makes it harder again, and three patterns are worth holding.</p>
<ul class="keys">
<li><b>A duty can follow the buyer home</b> &mdash; a customer ordering from abroad may owe use tax in their own state on what they bought.</li>
<li><b>Arrival can trigger a charge</b> &mdash; a customer outside the country pays no sales tax to that country, yet may owe tax or an import duty when the shipment lands.</li>
<li><b>Digital products slip through</b> &mdash; the movement of a download is difficult to track, and the chapter notes that the tax revenue is easily lost.</li>
</ul>

<h3>Owning content, and not borrowing it by accident</h3>
<p>Ownership of content and trademarks is, in the chapter&rsquo;s phrase, a virtual minefield. It runs in two directions, and sellers usually think about only one.</p>
<ul class="keys">
<li><b>Do not infringe</b> &mdash; posting product photographs without permission, or putting somebody else&rsquo;s trademarked name inside your own domain, are the chapter&rsquo;s examples.</li>
<li><b>Settle ownership in advance</b> &mdash; when a third party builds content for your site, agree who will own the copyright before the work starts.</li>
<li><b>Protect your own</b> &mdash; copyright notices and the like, because property nobody manages can mean lost revenue, brand dilution or legal action.</li>
</ul>
<p>The chapter closes with a housekeeping instruction that is easy to skip: state your jurisdiction clearly, and comply with it.</p>

<div class="activity" data-activity="lawSort"></div>

<h3>Locks on a file</h3>
<p>Digital media copy perfectly and cost nothing to pass on, a problem publishers took to a technical answer. <b>Digital rights management</b> is a technological solution letting publishers control their digital media to discourage, limit or prevent illegal copying.</p>
<p>The restrictions cover which devices will play the media, how many devices it plays on, and how many times it can be played.</p>
<p>Content sold without them is often watermarked instead. A <b>digital watermark</b> is an electronic version of the mark on paper currency, and the chapter&rsquo;s example is a purchased music file carrying the buyer&rsquo;s email address, so an illegal copy traces to its buyer.</p>

<div class="activity" data-activity="lawMatch"></div>

<h3>The argument, kept even</h3>
<p>Both sides are worth stating plainly, and the chapter settles nothing.</p>
<ul class="split">
<li>The industry says the restrictions minimize sales losses from unauthorized duplication.</li>
<li>Critics rename it digital restriction management and call enforcement arbitrary.</li>
<li>They add that it infringes existing consumer rights and stifles innovation.</li>
<li>Activation and device limits inconvenience honest buyers, as on a new computer.</li>
<li>That inconvenience, critics argue, can breed the piracy it was built to stop.</li>
<li>And sellers who dropped the restrictions entirely have been very successful.</li>
</ul>
<p class="takeaway">Legal ground is not a wall you hit once. It is a set of questions that attach to where your customer is, what you sold them, and whose work is on the page &mdash; and most answers begin with finding out.</p>

<div class="activity" data-activity="lawQuiz"></div>
`;

ACT.lawCase = {
  kind: "case",
  label: "Mini case",
  title: "Three new places, one small studio",
  how: "Read the brief and the exhibit, then take the three decisions in order; the studio, the regions and every condition in the exhibit are invented for practice.",
  objective: "4.5",
  brief: "Two people run a studio that sells sheet music. The same arrangement goes out either as a printed score in an envelope or as a download, and the buyer chooses which. Orders have just started arriving from three regions the studio has never sold into before, and neither partner knows what selling there commits them to. Nothing has gone wrong yet.",
  facts: [
    {k: "What it sells", v: "One catalogue of arrangements, as printed scores or as downloads"},
    {k: "Who runs it", v: "Two people, with no lawyer and no accountant on retainer"},
    {k: "Home base", v: "One region, where it has sold and collected tax for years"},
    {k: "What is new", v: "Orders from three regions where it has no presence at all"},
    {k: "What each region says", v: "Past our trigger level you collect our tax, presence or not"},
    {k: "What is at stake", v: "Penalties and refunds a studio this size cannot absorb"}
  ],
  exhibit: {
    name: "Exhibit A &middot; the three new regions",
    caption: "Invented conditions, written for practice. Each region here collects from any seller past its trigger level, with or without a presence there. Nothing describes any real place&rsquo;s law, and none of these figures is reported data.",
    headers: ["Region", "Return window buyers there expect", "Sales past that region&rsquo;s trigger level?", "Format ordered"],
    rows: [
      ["Region One", "14 days, no reason needed", "No, well under it", "Printed score"],
      ["Region Two", "30 days, no reason needed", "Yes, crossed in March", "Printed score"],
      ["Region Three", "14 days for goods, nothing stated for files", "Yes, crossed in June", "Download"]
    ]
  },
  questions: [
    {
      q: "Sales into which regions can create a duty to collect tax this year, although the studio has no presence in any of the three?",
      opts: [
        "Regions Two and Three, where the exhibit shows the trigger level passed",
        "Region One alone, where the exhibit shows the shortest return window",
        "Region Three alone, where the exhibit shows the order arriving as a download",
        "No region at all, since no office or warehouse of the studio sits in any of them"
      ],
      a: 0,
      why: [
        "Correct. Both of those rows carry a yes in the trigger column, and passing that level is the condition each region says creates the duty, whatever the studio does or does not own there.",
        "Region One is the row sitting under its trigger, so it is the one place the duty has not attached. A return window is what buyers expect of a policy, and it settles nothing about tax.",
        "Format changes how the order is delivered, not whether a threshold was passed. Region Three does qualify, but it qualifies on its trigger row, and Region Two qualifies beside it on the same column.",
        "Owning a building somewhere is the older test, and the exhibit is deliberately built to defeat it. Two of these regions record a threshold crossed, which is enough on its own terms."
      ]
    },
    {
      q: "The Region Three order in the exhibit is a download rather than a parcel. What does that change?",
      opts: [
        "The tax question disappears, because nothing physically crosses a border",
        "Nothing at all changes, since a file and a parcel are handled identically",
        "Delivery stops being a shipping problem; the tax question gets harder",
        "The buyer loses any expectation of a refund, because a file cannot be posted back"
      ],
      a: 2,
      why: [
        "The chapter says close to the opposite about digital products: their movement is difficult to track, so the tax revenue is easily lost rather than never owed in the first place.",
        "Format changes real things here. The envelope needs a carrier and a customs declaration, while the download needs neither and arrives before anybody could inspect anything.",
        "Correct. The file removes the shipping step and the border formalities that come with it, and leaves the harder half standing: an obligation can still attach where the buyer is, and nobody can watch a download cross anything.",
        "Refund expectations do not vanish with the packaging. The chapter treats clear return and refund terms as a general duty, and many sellers offer a window on files as well."
      ]
    },
    {
      q: "The partners want to act this week. What should the studio actually do next?",
      opts: [
        "Copy the refund and tax wording from a larger seller into their own storefront",
        "Ask somebody qualified in each region what applies, and write the answer down",
        "Wait for the first complaint, then deal with whichever region it comes from",
        "Stop selling into the two regions whose conditions look complicated"
      ],
      a: 1,
      why: [
        "A larger seller&rsquo;s wording was written for its own footprint and its own advice. Copying it transfers none of that reasoning while still binding the studio to whatever it now promises.",
        "Correct. The particulars differ by jurisdiction and they change, so the reliable move is to find out from somebody qualified in that place rather than guess, and to record what was decided so the next order is not a fresh argument.",
        "A complaint is a slow and expensive detector. By the time one arrives the studio has been trading under terms it never checked, and the repair now comes with an unhappy customer attached.",
        "Withdrawing is a legitimate business choice and sometimes the right one, but it answers a different question. It also gives up revenue the studio may well keep once it knows what the region asks."
      ]
    }
  ],
  debrief: "One column did most of the work. The trigger, not the address, decided where tax could attach, and the studio owns nothing in either region that crossed it. The download changed the delivery and made the tax harder to see without making it go away, and the widest return window in the exhibit is the one a single policy has to clear. The threshold rule has a name in the chapter, and the next stretch of reading supplies it."
};

ACT.lawSort = {
  kind: "sort",
  label: "Sort",
  title: "Which of the three issues is this?",
  how: "Drop each situation into the issue it raises first; every seller and situation described here is hypothetical.",
  objective: "4.5",
  buckets: [
    {id: "cp", name: "Consumer protection", hint: "what the buyer is told, what they are shown, and what they may undo"},
    {id: "tax", name: "Tax", hint: "what is owed on a sale, to whom, and what happens once a line is crossed"},
    {id: "ip", name: "Intellectual property", hint: "who owns the work, the mark or the file, and what the owner may control"}
  ],
  items: [
    {t: "A returns page most readers will not find before they buy", b: "cp", why: "The chapter asks for policies that are clear, understandable and prominently displayed. A policy that exists but hides fails the display half, which is the half a buyer actually relies on."},
    {t: "A description promising a benefit the item does not deliver", b: "cp", why: "Misleading claims about quality, benefits or price are the deceptive practices the chapter says are commonly prohibited. Being sincerely mistaken does not move it out of this bucket."},
    {t: "A price shown as a reduction from an amount nobody was charged", b: "cp", why: "This is a misleading claim about price rather than a dispute over ownership or a duty owed to a treasury, which is what keeps it here instead of in either neighbour."},
    {t: "Keeping a running total of what has been sold into each region", b: "tax", why: "Economic nexus turns volume into a duty, so the counting exists because a threshold might be crossed. The chapter is explicit that this tracking burden lands on the seller."},
    {t: "A parcel held on arrival until the buyer settles a charge at home", b: "tax", why: "The chapter describes a buyer abroad paying no sales tax to the seller&rsquo;s country while still owing tax or an import duty at home. It looks like a delivery problem and is not one."},
    {t: "Choosing where to put a warehouse partly for what it means at checkout", b: "tax", why: "Substantial presence used to decide who had to collect, so the location of a building was a tax decision dressed as a logistics one. The chapter reports that a 2018 ruling narrowed how well that works."},
    {t: "A download whose movement between countries nobody can trace", b: "tax", why: "The chapter raises this as a taxation difficulty: the product moves invisibly and the revenue is easily lost. The same file being easy to copy is a separate issue, and it belongs one bucket over."},
    {t: "Agreeing in writing, before work starts, who will own a freelancer&rsquo;s pages", b: "ip", why: "The chapter tells sellers to settle copyright with third parties who develop content for the site. Left unsettled it becomes a dispute about ownership, not about what a customer was told."},
    {t: "Putting a copyright notice on the studio&rsquo;s own catalogue photographs", b: "ip", why: "Protecting your own property is the half sellers forget. The chapter warns that failing to manage it proactively can mean lost revenue, brand dilution or legal action."},
    {t: "A bought album that plays on a phone but not on the buyer&rsquo;s new laptop", b: "ip", why: "Device limits are digital rights management, a rights holder controlling its own media. Critics argue it is really a consumer rights matter, which is exactly why it sits so close to the line."}
  ]
};

ACT.lawMatch = {
  kind: "match",
  label: "Match",
  title: "Which issue does this situation raise?",
  how: "Pair each situation with the issue it raises first, then read why the neighbouring issue is not the answer; every business described is hypothetical.",
  objective: "4.5",
  pairs: [
    {
      l: "The refund terms sit three clicks deep behind a collapsed menu at the foot of the page",
      r: "Consumer protection",
      why: "The chapter asks for return and refund terms that are clear and prominently displayed, so burying them is the failure even when the wording itself is generous. Nothing here turns on who owns the page, which would be the intellectual property question instead."
    },
    {
      l: "Sales into a region where the seller has no office or warehouse pass that region&rsquo;s trigger level",
      r: "Tax",
      why: "This is economic nexus in the chapter&rsquo;s account: crossing a sales threshold can create a duty to collect with no physical presence at all. Its neighbour, consumer protection, follows the buyer&rsquo;s location rather than a volume of sales."
    },
    {
      l: "A supplier&rsquo;s product photograph is lifted onto the storefront without asking",
      r: "Copyright",
      why: "Copyright covers the photograph as a work somebody made, and posting product images without permission is the chapter&rsquo;s own example. The neighbouring issue is trademark, which covers a name or mark identifying a business rather than the content itself."
    },
    {
      l: "A new store domain is registered with another firm&rsquo;s brand name inside it",
      r: "Trademark",
      why: "Trademark protects the identifier rather than the content, and the chapter names a trademarked name in a domain as its example. Copying that same firm&rsquo;s photographs would be the copyright half of the identical mistake."
    },
    {
      l: "A music file sold with no restrictions at all carries the buyer&rsquo;s email address inside it",
      r: "Digital watermark",
      why: "The chapter describes content sold without restrictions being marked this way so that an illegal copy traces back to the person who bought it. Digital rights management is the neighbour, and the difference is the whole point: restrictions try to prevent a copy, while a mark only says where an existing copy came from."
    }
  ]
};

ACT.lawQuiz = {
  kind: "quiz",
  label: "Check yourself",
  title: "Location, thresholds, and a fight nobody won",
  how: "Four options, one best answer; read every explanation, including the ones for options you did not choose. Any seller described is hypothetical.",
  objective: "4.5",
  questions: [
    {
      q: "Why do many online sellers write one policy to the strictest standard they expect to meet, rather than a different policy for each place they ship to?",
      opts: [
        "Because a federal regulator requires a single national policy from every online seller",
        "Because many of these rules follow where the buyer is, not where the seller is",
        "Because a strict policy lowers the cost of returns and reduces refund requests",
        "Because penalties can come from the strictest region and from nowhere else"
      ],
      a: 1,
      why: [
        "The chapter describes a federal trade regulator handling fraudulent business practices while other matters are handled at state level, which is a division of authority rather than a demand for one national policy.",
        "Correct. Many consumer protection rules apply based on the location of the consumer, whether or not the business has a presence there, so a single policy pitched at the strictest expected standard is cheaper to run than one policy per region.",
        "A generous policy usually raises the cost of returns rather than lowering it. The chapter&rsquo;s own example accepts high reverse logistics costs in exchange for revenue over a longer horizon.",
        "Exposure is not limited to one strict region. The difficulty the chapter describes is precisely that rules can attach through the buyer&rsquo;s location, so several sets may apply at once."
      ]
    },
    {
      q: "A seller has no office, staff or warehouse in a region, and this year its sales into that region pass the level that region uses as a trigger. What does the chapter report changed in 2018?",
      opts: [
        "Sellers became liable for tax in every region their website can be viewed from",
        "Physical presence stopped being the only thing that can create a duty to collect",
        "Online sales were reclassified as mail order, which set the threshold rule aside",
        "The duty to collect moved from the seller to the buyer once a threshold was crossed"
      ],
      a: 1,
      why: [
        "Being reachable is not the test. The chapter describes thresholds measured on sales into a place, which is a quantity somebody can count rather than the mere availability of a website.",
        "Correct. The chapter reports a 2018 Supreme Court ruling under which states may collect from online sellers with no physical location once certain sales thresholds are reached, and calls that economic nexus. Particulars differ by jurisdiction and change, so a seller confirms them locally.",
        "Mail order is the older treatment the chapter describes, under which collection followed substantial presence. The ruling moved away from that arrangement rather than restoring it.",
        "Buyers can owe use tax in some of the situations the chapter describes, but this change runs the other way: it places the tracking and the collecting on the seller."
      ]
    },
    {
      q: "How does the chapter leave the argument about digital rights management?",
      opts: [
        "Settled for the industry, since the restrictions demonstrably cut illegal copying",
        "Settled for the critics, since sellers without restrictions have done well",
        "Open, with a claim on each side: fewer illegal copies against real inconvenience",
        "Beside the point, since watermarking already traces a copy back to its buyer"
      ],
      a: 2,
      why: [
        "The chapter records the industry&rsquo;s claim that these restrictions minimize sales losses from unauthorized duplication, but it reports that as an argument rather than as a demonstrated result.",
        "Critics do point to successful sellers of unrestricted content, and the chapter includes that. It is one of several claims on that side, not a verdict the chapter hands down.",
        "Correct. The chapter sets the industry&rsquo;s case about unauthorized duplication beside the critics&rsquo; case about arbitrary enforcement, consumer rights, stifled innovation and device limits that inconvenience honest buyers, and it chooses between them nowhere.",
        "Watermarking is what the chapter describes for content sold without those restrictions, so it is the alternative under discussion rather than a reason the disagreement stops mattering."
      ]
    }
  ]
};
