/* ===== s23a ===== */
PROSE.s23a = `
<span class="eyebrow">Section 2&ndash;3a</span>
<h2>Innovation and what it is worth</h2>
<p class="lede">Ask most people what innovation means and they will describe a product &mdash; a better phone, something you could hold up on a stage. That answer is one tenth of the picture, and this section is about the other nine tenths.</p>

<h3>Inventing something is not the same as innovating</h3>
<p>For organizations, <b>innovation</b> means creating new products, processes or services that return value to the organization. In contrast to merely <i>inventing</i>, innovation involves realizing the value. A brilliant idea in a notebook is an invention; it becomes an innovation when it earns money, saves money, or wins a customer who would have gone elsewhere.</p>
<div class="callout warn"><p><b>Being the leader is not protection.</b> Companies that lead their markets or own strong brands often find it hard to react to new trends. Cisco&rsquo;s former chief executive predicted that almost half of today&rsquo;s leading businesses might not see the next decade. Leading a market and reacting to a change in it are not the same job.</p></div>

<h3>Two sizes of innovation</h3>
<p>Not every innovation redraws an industry. The chapter sorts them by how new the underlying technology is and by what happens to whatever came before.</p>
<ul class="keys">
<li><b>Incremental innovation</b> &mdash; enhancing or upgrading an existing product, service or process. The chapter calls it the most common form, because it works with what a firm already sells.</li>
<li><b>Radical innovation</b> &mdash; also called <b>disruptive innovation</b>, it uses a markedly new technology to reach new customer segments or give existing customers significantly greater benefits, eventually marginalizing what came before.</li>
</ul>
<p>Sort a handful of real changes into the two piles.</p>

<div class="activity" data-activity="invSort"></div>

<p>Three questions separate them in a live case. Is the technology markedly new, or is this a faster version of the same machine? Does the benefit reach segments the old product never served? And is the older product eventually marginalized, or does it keep selling in a better version?</p>
<p>The chapter lists nineteen radical innovations beside what each displaced: digital photography against chemical, online retailing against brick-and-mortar, smartphones against MP3 players and dedicated navigation. Three things in that list are easy to read past.</p>
<ul class="keys">
<li><b>The chain does not stop</b> &mdash; compact discs displaced cassettes, streaming displaced discs, and smartphones displaced MP3 players, so today&rsquo;s radical innovation becomes a future entry in the right-hand column.</li>
<li><b>Displaced is not deleted</b> &mdash; the heading says displaced <i>or marginalized</i>, and pairs such as distance education against classroom education describe a shift in share rather than an extinction.</li>
<li><b>Not every entry is a computer</b> &mdash; automobiles displaced horses and airplanes displaced trains, because what makes an innovation radical is what it does to a market, not whether it is digital.</li>
</ul>

<h3>Why &ldquo;we built a better product&rdquo; is a fragile plan</h3>
<p>When people hear innovation they think of innovative products and services &mdash; and products, even radical ones, are easily copied. Companies from Apple to Dyson end up in lawsuits defending them, which is an expensive way to hold an advantage.</p>
<p>Successful organizations add other kinds: new ways of earning revenue, or entirely new business models. Keeley and colleagues set out ten distinct places a company can innovate &mdash; profit model, network, structure, process, product performance, product system, service, channel, brand and customer engagement. Open each and read its examples.</p>

<div class="activity" data-activity="invExplore"></div>

<div class="callout exam"><p><b>Count the rows.</b> Product performance &mdash; the new-and-better-product row most people mean by the word &mdash; is one entry out of ten. The other nine change how money is made, whose capabilities are borrowed, how the firm is organized, how work gets done, what the offering is bundled with, and what the relationship feels like.</p></div>

<p>Four pairs get confused constantly, and keeping them apart is most of the skill.</p>
<ul class="keys">
<li><b>Product performance against product system</b> &mdash; Dyson differentiates a single product; Microsoft bundled individual office programs into one suite.</li>
<li><b>Channel against network</b> &mdash; Nespresso partners with hotels to reach customers; Lego uses <b>open innovation</b> to borrow other people&rsquo;s ideas.</li>
<li><b>Brand against customer engagement</b> &mdash; Virgin positions a name across industries; Apple ties customers into an ecosystem they stay inside.</li>
<li><b>Profit model against process</b> &mdash; Microsoft changed how revenue arrives by selling 365 by subscription; Toyota changed how the thing is produced with lean production.</li>
</ul>

<div class="activity" data-activity="invMatch"></div>

<div class="activity" data-activity="invQuiz1"></div>

<h3>Combining types is what makes an advantage stick</h3>
<p>Because product innovations are copied easily, companies combine several types at once. Apple&rsquo;s designs have been widely imitated, yet rivals struggle to copy its product system and customer engagement innovations together. Dell challenged established manufacturers by combining profit model innovation &mdash; collecting money before building &mdash; with built-to-order process innovation and online channel innovation.</p>
<p class="takeaway">A rival who copies your product has copied one row of ten; a rival who wants several rows at once has to rebuild the company, which is why combinations outlast clever products.</p>

<h3>Where information systems come in</h3>
<p>Two display technologies show what redeploying an existing capability looks like, and the difference between them is the whole point.</p>
<ul class="keys">
<li><b>Augmented reality</b> layers computer-generated information on top of what somebody is actually looking at, so a technician sees the schematic over the machine rather than beside it.</li>
<li><b>A virtual reality headset</b> replaces the view entirely with a generated environment, which is why architects use one to walk a client through a building that has not been built.</li>
</ul>

<p>Most of these innovations are enabled by information systems, and several would be impossible without one.</p>
<ul class="keys">
<li><b>Airbnb</b> &mdash; a platform-based model like this could not exist without the internet, because its entire job is connecting two groups who would never find each other.</li>
<li><b>Uber</b> &mdash; surge pricing needs real-time analysis and prediction of traffic and demand, and the model needs the mobile devices riders and drivers already carry.</li>
<li><b>Manufacturers</b> &mdash; robotics and the Industrial Internet of Things bring efficiency, quality and flexibility, letting firms mass-produce customized products.</li>
</ul>
<p>So a firm often has to deploy state-of-the-art technology, or redeploy what it has in a clever new way. Continually upgrading older systems instead buys, at best, a short-lived edge.</p>

<div class="activity" data-activity="invQuiz2"></div>
`;

ACT.invSort = {
  kind: "sort",
  label: "Sort",
  title: "Radical or incremental?",
  how: "Each situation below is a generic, hypothetical example written for practice, with no real company named; drop it into the bucket the chapter&rsquo;s definitions call for, then read why it belongs there.",
  objective: "2.3",
  buckets: [
    { id: "radical", name: "Radical innovation", hint: "markedly new technology, new segments or far greater benefits, and the old product ends up marginalized or replaced" },
    { id: "incr", name: "Incremental innovation", hint: "an existing product, service, or process is enhanced or upgraded" }
  ],
  items: [
    {
      t: "A camera maker stops using film and chemical developing altogether, and records the image on a sensor as data instead.",
      b: "radical",
      why: "This is the chapter&rsquo;s own first pair: digital photography displaced chemical photography. The technology underneath is markedly different, not a better version of the same thing, and the older technology was pushed aside rather than improved."
    },
    {
      t: "A phone maker ships this year&rsquo;s model with a longer-lasting battery and a slightly brighter screen.",
      b: "incr",
      why: "Enhancing or upgrading an existing product is the definition of incremental innovation, and the chapter notes this is the most common form. Nothing about the technology is markedly new, and last year&rsquo;s phone is not marginalized so much as superseded by its own successor."
    },
    {
      t: "Sales of dedicated satellite navigation units collapse because one device already in the customer&rsquo;s pocket does the same job alongside everything else.",
      b: "radical",
      why: "The chapter pairs smartphones with MP3 players and dedicated GPS navigation as displaced technologies. A general-purpose device absorbing a single-purpose one is the marginalize-or-replace pattern in its clearest form."
    },
    {
      t: "Page layout that once required a print shop&rsquo;s specialist equipment and specialist operators is done on ordinary computers on ordinary desks.",
      b: "radical",
      why: "Desktop publishing against traditional publishing is one of the chapter&rsquo;s pairs. The work reached people who were never going to buy typesetting equipment, which is exactly the access-new-customer-segments half of the definition."
    },
    {
      t: "A grocery chain rewrites its checkout software so each scan completes a fraction of a second faster.",
      b: "incr",
      why: "The process already exists and is being upgraded, so this is incremental. It may well be worth doing, because saved seconds at every lane add up, but no new technology and no new customer segment is involved."
    },
    {
      t: "Aerial filming that used to require a helicopter, a pilot, and an airfield is done with a small flying camera launched from the ground.",
      b: "radical",
      why: "The chapter lists camera drones as displacing helicopters for aerial filming and photography. The cost and skill barrier falls far enough to bring in customers who could never have chartered a helicopter."
    },
    {
      t: "A manufacturer builds a part by adding material layer upon layer instead of cutting the shape out of a solid block.",
      b: "radical",
      why: "3D printing against CNC milling is one of the chapter&rsquo;s pairs. Adding material and removing material are opposite principles, so this is a markedly different technology rather than a faster version of the old one."
    },
    {
      t: "A notebook computer maker releases a model that is thinner than last year&rsquo;s and starts up more quickly.",
      b: "incr",
      why: "Thinner and faster is an upgrade to an existing product, so it is incremental. Note the contrast with the chapter&rsquo;s own table, where tablets appear as a radical innovation that marginalized notebook computers as a category."
    },
    {
      t: "A brokerage lets customers place their own trades through a website instead of telephoning a broker who advises them and charges a full commission.",
      b: "radical",
      why: "Online stock brokerage against full-service stock brokerage is one of the chapter&rsquo;s pairs. The service reaches investors who were never worth a full-service broker&rsquo;s time, and it changes what the customer is paying for."
    },
    {
      t: "A university records its existing lectures on video so students already enrolled in those classes can rewatch them later.",
      b: "incr",
      why: "This upgrades a service that already exists for the same students, so it is incremental. The chapter&rsquo;s radical entry is distance education against classroom education, which is different: it serves students who were never going to be in the room at all."
    }
  ]
};

ACT.invExplore = {
  kind: "explore",
  label: "Explore",
  title: "Six of the ten types up close",
  how: "None of these six changes the product itself, which is why they slip past a reader who hears the word innovation and pictures a better gadget; open each card and read all four panels.",
  objective: "2.3",
  labels: ["What it changes", "The chapter&rsquo;s examples", "Why it gets missed", "What a rival would have to copy"],
  items: [
    {
      icon: "PRO",
      name: "Profit model innovation",
      sub: "How the money arrives",
      what: "Finding novel ways of generating revenues from offerings, so what changes is the shape of the payment rather than the thing being paid for.",
      real: "Dropbox using a freemium approach, Microsoft offering 365 on a subscription basis, and GE selling &ldquo;thrust as a service&rdquo;, a phrase that names the move from charging for a thing to charging for what the thing delivers.",
      absent: "It gets missed because the product on the table looks identical before and after. A subscription version of a program is the same program; only the invoice has changed, and invoices are not what people photograph.",
      why: "Not the pricing page, which any competitor can rewrite in an afternoon, but the cash flow, the contracts, and the customer agreements that let a firm be paid in a different shape and at a different time than before."
    },
    {
      icon: "NET",
      name: "Network innovation",
      sub: "Whose capabilities you borrow",
      what: "Harnessing the capabilities and strengths of others, so the firm stops treating its own payroll as the boundary of what it can do.",
      real: "GlaxoSmithKline and Lego using open innovation to source new product or service ideas, Netflix running contests to improve its movie recommendation algorithm, and luxury hotels partnering with fashion designers.",
      absent: "It gets missed because the credit lands on the finished product. When an outside contest produces a better recommendation algorithm, the customer experiences a better algorithm and never sees the contest.",
      why: "Not the announcement of an open call or a contest, which is easy to imitate, but the partners and outside contributors who choose to show up, because a competitor copying the announcement starts with an empty room."
    },
    {
      icon: "STR",
      name: "Structure innovation",
      sub: "How talent and assets are arranged",
      what: "Using the company&rsquo;s talent and assets in innovative ways, so the same people and the same equipment are organized to produce something the usual arrangement could not.",
      real: "Southwest Airlines focusing on one aircraft type, and Google allowing employees to use up to 20 percent of work time for personal projects.",
      absent: "It gets missed because it is invisible from outside the building. A passenger boarding a flight cannot see that every aircraft in the fleet is the same model, even though that single decision reaches maintenance, spare parts, and crew training.",
      why: "Not a feature but an arrangement: matching a single-aircraft-type fleet would mean retiring the other models a rival already owns, has trained crews on, and stocks parts for."
    },
    {
      icon: "CHA",
      name: "Channel innovation",
      sub: "How the offering reaches you",
      what: "Using innovative ways to connect offerings with customers, so the encounter happens somewhere the category has not traditionally been sold.",
      real: "Niketown offering immersive experiences, and Nespresso partnering with hotels and airlines, so that in both cases the customer meets the offering somewhere other than a conventional store.",
      absent: "It gets missed because the product itself is unchanged, so nothing about it looks new. The innovation is the meeting place, and customers rarely think of a meeting place as an invention.",
      why: "Not the product but the route to the customer, and that route is assembled one negotiated partnership at a time, so a rival has to win each hotel and each airline rather than announce a policy."
    },
    {
      icon: "BRA",
      name: "Brand innovation",
      sub: "What the name stands for",
      what: "Positioning the brand in innovative ways, so the name itself carries an expectation that competing names do not.",
      real: "The Virgin family of brands, and German discount grocer Aldi&rsquo;s Trader Joe&rsquo;s markets, which carry a name of their own rather than the parent grocer&rsquo;s.",
      absent: "It gets missed because branding is often filed under advertising rather than innovation, and because the result is a feeling in the customer&rsquo;s head rather than an object you can put on a table.",
      why: "Not the name but what the name has come to mean, which is the accumulated result of everything done under it, so a competitor with a budget can buy attention faster than it can buy that association."
    },
    {
      icon: "CUS",
      name: "Customer engagement innovation",
      sub: "What the relationship feels like",
      what: "Developing meaningful connections with customers, so the relationship continues between purchases instead of ending at the till.",
      real: "Swarm encouraging users to frequently &ldquo;check in&rdquo; to places, and Apple tying customers to its ecosystem.",
      absent: "It gets missed because it produces no line on a product specification. Nothing on a specification sheet explains why a customer inside an ecosystem weighs one replacement against everything else already owned.",
      why: "Not the hardware, which the chapter says has already been imitated: the design and functionality of Apple&rsquo;s products have been widely copied, yet other companies find it difficult to copy its product system innovations or its customer engagement innovations."
    }
  ]
};

ACT.invMatch = {
  kind: "match",
  label: "Match",
  title: "Ten changes, ten types of innovation",
  how: "Pair each type with the change it describes; every change here is one of the chapter&rsquo;s own examples, and the explanation names the company it came from.",
  objective: "2.3",
  pairs: [
    { l: "Profit model innovation", r: "A file-storage service gives a basic account away for nothing and charges for the extra capacity heavier users need", why: "This is Dropbox&rsquo;s freemium approach. The storage service is not what changed; the way revenue is generated from it is." },
    { l: "Network innovation", r: "A toy company invites people outside the firm to submit ideas for new products instead of relying only on its own designers", why: "Lego and GlaxoSmithKline are the chapter&rsquo;s open innovation examples, and the point is harnessing the capabilities and strengths of others." },
    { l: "Structure innovation", r: "An airline flies a single type of aircraft, so crews, spare parts, and maintenance all serve one machine", why: "Southwest Airlines is the example, and it is structural because it changes how the company&rsquo;s talent and assets are arranged rather than what it sells." },
    { l: "Process innovation", r: "A clothing retailer compresses the path from first design to clothes on the sales floor down to three weeks", why: "Zara is the example. The garments are ordinary garments; the primary process used to produce and deliver them is what was changed." },
    { l: "Product performance innovation", r: "A glassmaker develops a cover glass tough enough to be marketed as unbreakable", why: "Corning&rsquo;s Gorilla Glass is the example, and it is the classic case of creating a novel product or differentiating an existing one." },
    { l: "Product system innovation", r: "Separate word processing, spreadsheet, and presentation programs are sold together as a single suite", why: "Microsoft bundling individual office programs into 365 is the example, and bundling complementary offerings is what defines this type." },
    { l: "Service innovation", r: "A menswear retailer lets customers buy free pressing of their garments for life", why: "Men&rsquo;s Wearhouse is the example. The suit is unchanged; what surrounds and supports the purchase is what enhances its value." },
    { l: "Channel innovation", r: "A coffee-machine maker places its product with hotels and airlines so travellers meet it far from any store", why: "Nespresso is the example, and the innovation is the route to the customer rather than anything about the coffee or the machine." },
    { l: "Brand innovation", r: "A German discount grocer owns a chain of markets that trade under a completely separate name", why: "Aldi&rsquo;s Trader Joe&rsquo;s markets are the chapter&rsquo;s example of positioning a brand in an innovative way." },
    { l: "Customer engagement innovation", r: "A device maker ties customers into an ecosystem, so each purchase makes sense mainly in relation to the ones already made", why: "Apple is the example, and the chapter notes rivals find this far harder to copy than the design and functionality of the products themselves." }
  ]
};

ACT.invQuiz1 = {
  kind: "quiz",
  label: "Check yourself",
  title: "Innovation, radical and incremental",
  how: "Four options, one best answer; every situation here that names no company is a generic hypothetical written for practice, and every named company comes from the chapter, so read every explanation, including the ones for options you did not pick.",
  objective: "2.3",
  questions: [
    {
      q: "A research team designs a working prototype of a new kind of battery, publishes the design, and the company then shelves it. By the chapter&rsquo;s definition, what does the company have?",
      opts: [
        "An innovation, because a new product was successfully created and demonstrated",
        "An invention, because innovation requires that the new thing return value to the organization",
        "A radical innovation, because the underlying technology is markedly different from existing batteries",
        "An incremental innovation, because the design improves on batteries the company already sells"
      ],
      a: 1,
      why: [
        "Creating and demonstrating something new is real work, but the chapter draws the line elsewhere: innovation involves creating new products, processes, or services that return value to the organization. A shelved prototype has returned nothing yet.",
        "Correct. The chapter contrasts innovation with merely inventing new products, services, or processes, and says innovation involves realizing the value. Until the design earns money, saves money, or wins a customer, the company has an invention.",
        "The technology may well be markedly different, which is half of the radical definition, but the other half is that it reaches new customer segments or delivers significantly greater benefits and eventually marginalizes what came before. A shelved design reaches nobody.",
        "This would fit if the design were an upgrade the company shipped to its existing customers, since incremental innovation means enhancing or upgrading existing products, services, or processes. Nothing here was shipped or upgraded."
      ]
    },
    {
      q: "Which of the following best matches the chapter&rsquo;s definition of a radical innovation?",
      opts: [
        "A software vendor releases an annual update with a redesigned menu and faster file handling",
        "A manufacturer negotiates lower prices from its suppliers, passes part of the saving on to customers, and takes a share of the market from a rival that could not match the new price",
        "A device using a markedly different technology serves customers the old product never reached, and the old product is eventually marginalized",
        "A company spends more on research than any of its competitors in the same industry"
      ],
      a: 2,
      why: [
        "A redesigned menu and faster file handling enhance an existing product, which the chapter defines as incremental innovation and calls the most common form. Useful, and genuinely innovation, but not radical.",
        "Cheaper supplies can improve competitiveness through cost, and the chapter does say advantage may come through cost or differentiation, but nothing here involves a markedly new or different technology or a displaced product.",
        "Correct. Radical innovations use a markedly new or different technology to access new customer segments or provide significantly greater benefits to existing customers, and eventually marginalize or replace existing products or services.",
        "Research spending is an input, not an outcome. The chapter measures innovation by the value returned to the organization, so a large budget that produces nothing customers use has not produced innovation of any size."
      ]
    },
    {
      q: "The chapter&rsquo;s table pairs compact discs with cassettes and records, then pairs music downloading and streaming with compact discs and music stores. What does that sequence illustrate?",
      opts: [
        "That a technology which displaced an older one can itself be displaced later, so innovation is a chain, not a finish line",
        "That the chapter regards the compact disc as an incremental improvement on the cassette rather than a radical innovation",
        "That displacement moves slowly enough for the leading firm in each round to move into the technology that replaces it",
        "That a radical innovation displaces a technology from its own industry, since one recorded-music format gave way to the next"
      ],
      a: 0,
      why: [
        "Correct. The compact disc appears in the table first as a radical innovation and later in the displaced column, and smartphones then displace the MP3 players that displaced it, which is why leading today guarantees nothing about the next round.",
        "The table lists compact discs in the left-hand column, among the radical innovations, precisely because they used a markedly different technology and marginalized cassettes and records rather than improving them.",
        "The table records what replaced what and says nothing about the incumbent making the jump. The chapter points the other way, noting that market leaders and strong brands often find it difficult to react appropriately to new trends.",
        "The same table pairs smartphones with dedicated GPS navigation, automobiles with horses, and 3D printing with CNC milling, so the displaced technology frequently sits in a different industry from the innovation that displaced it."
      ]
    }
  ]
};

ACT.invQuiz2 = {
  kind: "quiz",
  label: "Check yourself",
  title: "Ten types, combinations, and the systems underneath",
  how: "Three questions on where a company can innovate and on why information systems keep turning up in the answer; the manager quoted in the first one is hypothetical, while every company named is one the chapter names.",
  objective: "2.3",
  questions: [
    {
      q: "A manager says: &ldquo;Our innovation strategy is simple. We build the best product in the category and defend the patents.&rdquo; What is the strongest objection the chapter supports?",
      opts: [
        "Competitive advantage comes from being the low-cost producer, so a strategy built on the best product aims at the wrong target",
        "Product performance is one of ten types of innovation, and products can easily be copied, so a product-only strategy is risky",
        "Improving an existing product does not count as innovation, so defending a product line is not an innovation strategy at all",
        "Innovation is the responsibility of the research department, so a manager outside it should not be setting an innovation strategy"
      ],
      a: 1,
      why: [
        "The chapter says the opposite about the target: innovation is key for organizations attempting to gain or sustain competitive advantage, be it through cost or differentiation. Building the best product is a legitimate aim; leaning on it alone is the problem.",
        "Correct. The chapter warns that innovative products or services, even radical innovations, can easily be copied and that focusing only on them is a dangerous path, which is why it presents ten types rather than one.",
        "Enhancing or upgrading an existing product, service, or process is incremental innovation, which the chapter calls the most common form of innovation. The weakness in this plan is its narrowness, not that improvement fails to count.",
        "Nothing in the chapter confines innovation to a research department. Profit model, structure, channel, and customer engagement innovations sit with the parts of the business that set pricing, organization, routes to market, and relationships."
      ]
    },
    {
      q: "The chapter describes Dell challenging established computer manufacturers by collecting money before building the product, building to order, and selling online rather than in stores. Which types of innovation are those three, in that order?",
      opts: [
        "Brand, service, and network innovation",
        "Product performance, product system, and service innovation",
        "Profit model, process, and channel innovation",
        "Structure, customer engagement, and brand innovation"
      ],
      a: 2,
      why: [
        "Brand innovation positions the name in a new way, service innovation supports and enhances the offering, and network innovation harnesses the strengths of others. None of the three describes when cash is collected, how a machine is assembled, or where it is sold.",
        "These three are all about the offering itself: novel or differentiated products, bundles of complementary offerings, and support around the sale. Dell&rsquo;s changes were to its finances, its assembly, and its route to market.",
        "Correct. Collecting money before building is a profit model innovation, the built-to-order model is a process innovation, and selling online rather than in stores is a channel innovation, and the chapter presents the combination as the reason it could challenge incumbents.",
        "Structure innovation rearranges talent and assets, customer engagement builds an ongoing relationship, and brand innovation repositions the name. Dell may have done these too, but they are not the three changes described here."
      ]
    },
    {
      q: "Why does the chapter say Uber&rsquo;s surge pricing illustrates the link between innovation and information systems?",
      opts: [
        "Because riders and drivers carry mobile devices, which is the dependency the chapter attaches to surge pricing",
        "Because the feature depends on real-time analysis and prediction of traffic conditions and demand, so with no system there is no feature",
        "Because surge pricing raises revenue, which is the measure the chapter uses to judge whether an innovation succeeded",
        "Because a business model built on mobile devices is inherently harder for competitors to copy than one built on physical stores"
      ],
      a: 1,
      why: [
        "Mobile devices are the chapter&rsquo;s condition for Uber&rsquo;s business model existing at all, not for surge pricing in particular. Surge pricing is tied to something narrower: real-time analysis and prediction of traffic and demand.",
        "Correct. The chapter states that Uber could not implement surge pricing without real-time analysis and prediction of traffic conditions and demand for services, just as its business model could not exist without the mobile devices riders and drivers carry.",
        "Revenue matters, since innovation is defined as returning value to the organization, but the chapter raises surge pricing to show a capability that only an information system can supply, not to score its profitability.",
        "The chapter argues nearly the reverse elsewhere: information systems are frequently bought from vendors and rivals can copy them, so a mobile business model carries no built-in protection."
      ]
    }
  ]
};
