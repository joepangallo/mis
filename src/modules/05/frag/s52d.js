/* ===== s52d ===== */
PROSE.s52d = `
<span class="eyebrow">Section 5&ndash;2d</span>
<h2>Connecting at scale</h2>
<p class="lede">The last of the chapter's four jobs is connection, and it is the one with the largest strategic consequences. Collaboration changes what a firm's own people can do together. Connection changes who counts as the firm's people at all, and it introduces the single mechanism that decides who wins these markets.</p>

<h3>Networks, professional and internal</h3>
<p><b>Social networking</b> builds <b>social online communities</b> where people with a broad and diverse set of interests meet, communicate and collaborate. Professional networks do the same for careers, letting people post a profile, ask for expert advice and be approached about work.</p>
<p>Enterprise social networks bring the format inside a company, and the chapter names why they look so familiar. <b>Consumerization of information technology</b> is the pattern where a product designed for the consumer market arrives at work, because that is what people already know how to use.</p>
<p>The three kinds are worth keeping apart, because a firm's reason for being on each one differs.</p>
<ul class="keys">
<li><b>A general-interest network</b> is where a firm meets its customers and the wider public, gets feedback on what it sells, and maintains a brand image it does not fully control.</li>
<li><b>A professional network</b> is a labour market: profiles, expert advice and approaches about work, which makes it a recruiting channel before it is anything else.</li>
<li><b>An enterprise network</b> is private to one organization, and it exists to connect employees to each other and to what colleagues already know.</li>
</ul>

<h3>The effect that decides everything</h3>
<p>What makes these markets behave strangely is the <b>network effect</b>. Each additional member makes the service more valuable to every existing member, so growth feeds itself and a leader becomes very hard to dislodge.</p>
<p>The chapter's counter-example matters just as much. The network that was largest before the current one declined until it barely ranked, which is the same effect running in reverse: value falls with every departure, and the falling value causes the next one.</p>
<p>Sort eight situations by whether the effect is working for the firm, against it, or is not the mechanism at all.</p>

<div class="activity" data-activity="socSort"></div>

<h3>Making something spread on purpose</h3>
<p><b>Viral marketing</b> uses the same mechanism to spread brand awareness, by making content people choose to pass on. The term was coined to describe marketing driven by word of mouth, in the way a real virus moves through the contacts somebody already has.</p>
<p>The chapter's principles for it are unglamorous, and each one has a matching way of being broken.</p>
<ul class="keys">
<li><b>Do something unexpected</b>, because a viewer who can predict the rest of the piece from its first seconds has no reason to show it to anybody.</li>
<li><b>Make people feel something</b>, since a purely informative piece is passed on by nobody, however accurate and however well made it is.</li>
<li><b>Make sequels</b>, because an audience assembled once and never given anything else is an audience the firm has spent and thrown away.</li>
<li><b>Allow sharing and easy distribution</b>, and <b>never restrict access</b>, because a registration wall stops the mechanism at the first hand-off and leaves nothing to spread.</li>
</ul>
<p>The chapter's own founding example is an email service that added a single line advertising itself to the bottom of every message its users sent, and bought twelve million subscribers for a fraction of what advertising would have cost.</p>

<div class="activity" data-activity="socMatch"></div>

<h3>Social, local, mobile</h3>
<p>Where connection meets a phone that knows where it is, the chapter uses the shorthand <b>social-local-mobile</b>: reviews written by other customers, a device aware of its own position, and a local business willing to pay to reach somebody standing nearby and hungry.</p>
<p>The review platform in that example never wrote a review or took a photograph. It holds what its users wrote, and that is enough to make it the thing people consult before choosing where to eat, and enough to sell an advertisement to the restaurant next door.</p>
<p>The chapter's closing industry shows the same shape at a larger scale. Travel was booked through a few large online agencies, which had themselves displaced the high-street agent. A newer set of platforms then let people rent out their own homes and drive their own cars, and both rest on ratings that make a stranger worth trusting.</p>
<p>Neither of those platforms owns a room or a vehicle. Each owns the review corpus and the audience, which turns out to be worth more than the assets, and that is the observation the strategy supplement is built on.</p>

<div class="activity" data-activity="socCase"></div>

<h3>What connection costs</h3>
<p>Two consequences are worth naming before the next section, because both land on people rather than on firms.</p>
<ul class="keys">
<li><b>Feeds are assembled by algorithms</b> predicting what will hold attention, which quietly filters out material conflicting with a user's existing views and produces what critics call a filter bubble.</li>
<li><b>Clickbait exists because attention is the product</b>, so a headline is written to be clicked rather than to be accurate, and the article behind it routinely fails to deliver what the headline promised.</li>
</ul>
<p class="takeaway">Connection changes who counts as the firm's people: the volunteers maintaining code it runs on, the crowd labelling its data, the customers writing its product pages, the strangers whose ratings make its platform usable. None of them is employed, and all of them are load-bearing.</p>

<div class="activity" data-activity="socQuiz"></div>
`;

ACT.socSort = {
  kind: "sort",
  label: "Sort",
  title: "Is the network effect the mechanism here?",
  how: "Sort each situation by what the network effect is doing in it; two of these look like the effect and are something else entirely.",
  objective: "5.2",
  buckets: [
    {id: "for", name: "Working for the firm", hint: "Each additional participant is making the firm's own service more valuable."},
    {id: "against", name: "Working against the firm", hint: "The same mechanism running in reverse, or running in a rival's favour."},
    {id: "not", name: "Not the network effect", hint: "Something real is happening and participation is not what is causing it."}
  ],
  items: [
    {t: "Every new reviewer makes a firm's product pages more useful to the next shopper", b: "for", why: "The definition applied directly: each additional participant raises the value of the service for everybody already using it, and the firm did not write any of it."},
    {t: "A user forum answers most support questions, and answers accumulate year on year", b: "for", why: "Participation compounds into an asset. A competitor starting today has the same software and none of the nine years of answers, which is what makes this hard to copy."},
    {t: "Members leave a declining network, which makes it less worth staying on", b: "against", why: "The chapter's counter-example: value falls with every departure, and the falling value causes the next one. The mechanism is identical and the sign is reversed."},
    {t: "A rival platform's community grows, so your customers increasingly compare you there", b: "against", why: "The effect is real and it is happening to somebody else's asset. Growth on a rival's platform moves buyers to a venue where the firm does not set the terms."},
    {t: "An internal directory has four completed profiles, so nobody bothers to complete a fifth", b: "against", why: "Below critical mass the effect works against the tool: too little participation to be worth consulting, so it never gains the participation that would make it worth consulting."},
    {t: "A firm's advertising budget doubles and its brand awareness rises", b: "not", why: "Awareness bought directly is not participation compounding. Stop paying and it decays, which is exactly what a network-effect asset does not do."},
    {t: "A supplier raises its prices, so the firm's margin falls across every channel", b: "not", why: "This is bargaining power acting on cost, and no user's participation is involved anywhere in it. The frameworks section is where this one belongs."},
    {t: "A firm's product is cheaper to make this year because component prices fell", b: "not", why: "A cost movement in a supply market. It changes the firm's economics and has nothing to do with how many people use anything."}
  ]
};

ACT.socMatch = {
  kind: "match",
  label: "Match",
  title: "The viral principle, and the failure that breaks it",
  how: "Pair each of the chapter's principles with the mistake that defeats it; every pair explains itself once matched.",
  objective: "5.2",
  pairs: [
    {
      l: "The video is competent, on-message, and exactly what a viewer expected from the first frame",
      r: "Do something unexpected",
      why: "Predictability is fatal to sharing. Passing something on is a small social risk, and nobody takes it for material the recipient could have guessed."
    },
    {
      l: "The piece is accurate, informative, and leaves the viewer feeling nothing at all",
      r: "Make people feel something",
      why: "Information travels through search; feeling travels through people. A piece that provokes nothing gets watched and not forwarded, which ends the chain."
    },
    {
      l: "One excellent piece runs, gathers an audience, and is never followed by anything",
      r: "Make sequels",
      why: "An audience assembled once and then abandoned is a cost the firm paid and did not collect on. The chapter lists sequels precisely because campaigns stop here."
    },
    {
      l: "Watching requires an email address and a confirmation link first",
      r: "Never restrict access to the content",
      why: "The gate breaks the mechanism at the first hand-off: the person who would have passed it on now has nothing to pass except a form."
    },
    {
      l: "The content lives on a platform with no way to embed it or send it to anybody",
      r: "Allow sharing and easy distribution",
      why: "Every extra step between wanting to share and having shared costs a proportion of the people who intended to, which compounds against you at each hop."
    },
    {
      l: "The campaign runs as paid advertisements sent to a purchased list of addresses",
      r: "Not viral marketing at all",
      why: "Reach the firm buys directly is advertising. Viral marketing spends the network's own connections instead, which is why its cost per person reached keeps falling."
    }
  ]
};

ACT.socCase = {
  kind: "case",
  label: "Mini case",
  title: "The platform that owns nothing",
  how: "Read the brief and the exhibit, then take the three decisions in order; both firms and every figure attached to them are hypothetical and were invented for this exercise.",
  objective: "5.2",
  brief: "A regional serviced-apartment company owns and lets ninety furnished flats in one city. A platform that owns no property at all now lists about two thousand rooms in the same city, taken from people letting their own homes, and its listings are ranked by guest ratings. The company's board wants to know what it is actually competing against. Both firms are hypothetical and every figure attached to them is invented.",
  facts: [
    {k: "The company", v: "A regional serviced-apartment operator with ninety furnished flats in one city"},
    {k: "What it owns", v: "The buildings, the furniture, the cleaning contracts and the staff"},
    {k: "The platform", v: "Lists around two thousand rooms in the same city and owns none of them"},
    {k: "What the platform owns", v: "The listings, the guest ratings and the audience that reads them"},
    {k: "The question", v: "What the company is actually competing against, and what it should do"}
  ],
  exhibit: {
    name: "Exhibit A &middot; The two ways to add a room in this city",
    caption: "What it takes each business to make one more room available, and what happens to it afterwards. Every figure here is invented for practice.",
    headers: ["Line", "The serviced-apartment company", "The platform"],
    rows: [
      ["Cost to add one more room", "About US$140,000 to buy and furnish", "None; somebody else lists their own"],
      ["Time to add one more room", "Six to nine months", "About twenty minutes"],
      ["Who carries the room if it stays empty", "The company", "The person who listed it"],
      ["Guest reviews held about the city's stock", "410, about its own flats only", "31,000, about everybody's"],
      ["What a guest compares before booking", "One operator's photographs", "Two thousand listings ranked by rating"],
      ["Share of the company's bookings arriving via the platform", "38 percent, up from nothing three years ago", "-"]
    ]
  },
  questions: [
    {
      q: "The board describes the platform as a competitor with two thousand rooms. What is wrong with that description?",
      opts: [
        "The platform holds no rooms; it is a venue, and the company is already selling inside it",
        "The platform's rooms are lower quality, so the two are not competing for the same guest",
        "The platform's rooms come and go, so counting them overstates how large it really is",
        "The platform is larger than two thousand rooms once other cities are counted in"
      ],
      a: 0,
      why: [
        "Correct. Two thousand independent hosts compete with the company; the platform competes with nobody and takes a share of everybody. Thirty-eight percent of the company's own bookings already arrive through it, which a description of it as a rival cannot account for.",
        "Quality varies in both directions and nothing here measures it. Assuming the platform's stock is worse is the comfortable answer rather than the supported one.",
        "Availability fluctuates for both, and it changes the effective size of the venue rather than what kind of thing the venue is.",
        "Scale in other cities is irrelevant to a board deciding about this one, and it makes the same category error at a larger number."
      ]
    },
    {
      q: "Adding a room costs the company about a hundred and forty thousand dollars and the platform nothing. What does that difference mean strategically?",
      opts: [
        "The company should sell flats and become a platform, since the economics are better",
        "The company is at a permanent cost disadvantage and cannot compete on price",
        "Supply on the platform can expand faster than demand, so the company cannot outbuild it",
        "The platform is more profitable per room, since it has no capital tied up in property"
      ],
      a: 2,
      why: [
        "Becoming a platform means starting a network from zero against an incumbent with thirty-one thousand ratings, which is the hardest possible entry. The economics are better for whoever already has the network.",
        "The company owns assets that produce rent and a service standard it controls, and neither is a disadvantage. Cost per room is only a disadvantage if price is the dimension it chooses to fight on.",
        "Correct. The constraint on the platform's supply is how many people feel like listing, not capital or construction, so it can add a thousand rooms in a season. No amount of building keeps pace, which rules out capacity as a response.",
        "Profitability per room is plausible and unmeasured here, and it describes the platform's business rather than telling the company what to do about it."
      ]
    },
    {
      q: "Thirty-one thousand guest ratings sit on the platform and four hundred and ten sit with the company. What follows?",
      opts: [
        "The company should ask its own guests to leave ratings on the platform instead",
        "The company should not attempt to build a rival review corpus from ninety flats",
        "The company should dispute unfair ratings, since each one carries more weight at its scale",
        "The company should list every flat on the platform, since that is where guests are comparing"
      ],
      a: 1,
      why: [
        "This grows the platform's asset with the company's own guests, deepening exactly the dependence the exhibit is describing. It is the most common version of this mistake.",
        "Correct. Ninety flats cannot generate a corpus that competes with everybody's, so a rival review site is a fight the company loses by arithmetic. The useful moves are elsewhere: what it can promise that an individual host cannot.",
        "Disputing individual ratings is housekeeping. It matters at the margin and does not touch a difference of two orders of magnitude.",
        "Listing everywhere raises occupancy and raises the platform's share of the company's bookings, so it is a revenue decision that makes the strategic position worse rather than better."
      ]
    }
  ],
  debrief: "The board's framing was the error, and every decision followed from correcting it. A platform that owns nothing is not a competitor with two thousand rooms; it is the venue in which the company is already selling thirty-eight percent of its own nights. Its supply expands at the speed people feel like listing, so capacity is not a defence, and its ratings corpus is two orders of magnitude larger, so review volume is not one either. What that leaves is what a network-effect asset cannot supply: a standard a guest can rely on without reading anything, which is the argument the strategy supplement will ask you to make properly."
};

ACT.socQuiz = {
  kind: "quiz",
  label: "Check",
  title: "Networks, spread, and what they cost",
  how: "Three questions on the mechanism behind connection; every option explains itself, including the ones you did not pick.",
  objective: "5.2",
  questions: [
    {
      q: "A firm rolls out an internal social network and staff complain it is clumsy compared with what they use at home. What does the chapter call that pressure?",
      opts: [
        "Technological inertia, since people will not adopt a tool without a tangible benefit",
        "A generation gap, since younger staff hold higher expectations than older colleagues",
        "A critical mass problem, since too few colleagues have joined for it to feel useful",
        "Consumerization, where consumer products set the usability benchmark for internal tools"
      ],
      a: 3,
      why: [
        "Inertia is refusing to move at all. These staff have moved and are reporting that the destination compares badly, which is a different complaint with a different remedy.",
        "A gap describes differing comfort with these tools across a workforce. Here everybody agrees on the comparison, which is the opposite of a gap.",
        "Thin participation makes a social tool feel useless rather than clumsy, and the complaint described is about the tool itself.",
        "Correct. The chapter names this directly: applications designed for the consumer marketplace make inroads into organizational settings, and users judge an internal tool against what they already use."
      ]
    },
    {
      q: "Why is a large social network so hard for a well-funded new competitor to displace?",
      opts: [
        "Each additional member makes the incumbent more valuable to every existing member",
        "Members would lose the content they have already posted if they switched",
        "The incumbent can outspend a new entrant on advertising and acquisition",
        "The engineering required to run at that scale is difficult to replicate"
      ],
      a: 0,
      why: [
        "Correct. The chapter attributes the leader's position to the network effect: as it grew it became more attractive to join, and a rival has to overcome that self-reinforcement rather than any particular feature.",
        "Losing posted content is a real friction and a small one. The chapter's example of a collapsed network shows members leaving despite everything they had posted there.",
        "Spending follows the position rather than producing it, and the chapter's counter-example was prominent and well funded when it declined.",
        "Scale engineering is a solvable problem. What a competitor cannot buy is a reason for the first million members to be there."
      ]
    },
    {
      q: "What is the chapter's point about the review platform in its social-local-mobile example?",
      opts: [
        "It succeeded because it was early, and being early is what network effects reward",
        "It owns no reviews or photographs of its own, and holding what users wrote is enough",
        "It is more accurate than its rivals because it verifies the reviews it publishes",
        "Its advantage is location awareness, which its competitors were slow to add"
      ],
      a: 1,
      why: [
        "Timing helps a network effect start and does not explain why the position holds. Plenty of early networks were displaced, including the one the chapter names.",
        "Correct. The platform produced none of the content it profits from. It holds what its users wrote, which is what makes it the thing people consult and what lets it sell advertising to the businesses being reviewed.",
        "The chapter records criticism of how reviews are handled rather than a claim of superior verification, so this reverses what it actually says.",
        "Location awareness is part of the shorthand and is available to every competitor with a phone app, so it cannot be what distinguishes this one."
      ]
    }
  ]
};
