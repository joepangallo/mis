/* ===== s34a ===== */
PROSE.s34a = `
<span class="eyebrow">Section 3&ndash;4a</span>
<h2>Renting instead of owning</h2>
<p class="lede">The two sections before this one were a list of the costs of ownership: machines that age, software that stops being supported, data that piles up, demand that spikes before the holidays, and a power bill that arrives whether or not anybody used the equipment. This section is the answer the industry settled on. Stop owning most of it, and buy the service instead.</p>

<h3>Nobody actually wants a mail server</h3>
<p>The chapter opens this objective from the manager&rsquo;s side rather than the technology&rsquo;s. Running an infrastructure is hard because hardware and software keep evolving, because the demand for storage and for network bandwidth keeps rising, and because the cost of the energy underneath all of it rises too. An organization also needs dedicated staff to support the equipment, and that is a further cost on top of the equipment itself.</p>
<p>Then comes the sentence that stings. Managing an information systems infrastructure is often <b>not among an organization&rsquo;s core competencies</b>, so other organizations may simply be better at doing it. A hospital is good at medicine and a bank is good at credit. Neither one set out to become good at cooling a room full of machines.</p>
<p>There is a second problem in any organization old enough to have bought equipment twice. The infrastructure has grown over the years, one purchase at a time, so it ends up fragmented and difficult to consolidate. Meanwhile efficiency, effectiveness and agility are what the firm actually competes on, and those need a flexible, scalable infrastructure rather than an accumulation of past decisions.</p>
<p>Out of that the chapter names the shift this whole objective rests on. Over the past decades there has been <b>a shift away from thinking about developing and maintaining the infrastructure toward thinking about what services the infrastructure should deliver</b>. Its own illustration is the one everybody recognises: people and organizations want to <i>use email</i>. Nobody ever wanted to purchase an email server and then deal with its administration, its maintenance, its storage and its energy consumption.</p>
<p>Four consequences follow from that shift, and the chapter states each of them plainly.</p>
<ul class="keys">
<li><b>Buy or rent rather than build</b> &mdash; organizations increasingly obtain their applications from other parties and assume that those applications will work, instead of constructing and maintaining everything themselves.</li>
<li><b>Except where the system is the advantage</b> &mdash; the exception the chapter names is the highly specialized system that helps a firm gain or sustain competitive advantage, and it points to Amazon and Dell as companies that build such systems for themselves.</li>
<li><b>The infrastructure still decides what is possible</b> &mdash; even when rented, it determines how quickly new systems can be implemented and how well they will run, so handing over the lower levels frees attention rather than ending responsibility.</li>
<li><b>Customers notice before the finance department does</b> &mdash; any lack of robustness or integration is immediately noticed by customers and other stakeholders, and the chapter names the price as lost business, lost trust and lost goodwill.</li>
</ul>

<div class="callout tip">
<b class="tagline">This is Module 2&rsquo;s argument, applied to plumbing</b>
Rent the commodity, build the differentiator. A system any competitor could order this afternoon is not what makes a company different, so owning it wins nothing. A system that encodes what this firm knows and rivals do not is worth building and worth keeping. Most of what follows in this objective is that one distinction turned into a purchasing policy.
</div>

<h3>What cloud computing actually is</h3>
<p>Two technical advances made the rest possible. Internet bandwidth grew large enough to carry real work across it, and virtualization matured enough to let one physical machine host many separate computing environments. The word itself is not technical at all: the chapter says flatly that <b>the cloud is a metaphor for the internet</b>, which is why every diagram of it is drawn as a cloud with arrows going in and coming out.</p>

<div class="callout exam">
<p><b>The definition worth learning word for word.</b> It is not the chapter&rsquo;s own wording. The chapter quotes the definition published by the United States National Institute of Standards and Technology, the federal standards body whose formulation the rest of the industry settled on.</p>
<p>It is worth learning as that body wrote it. Cloud computing is &ldquo;a model for enabling ubiquitous, convenient, on-demand network access to a shared pool of configurable computing resources (e.g., networks, servers, storage, applications, and services) that can be rapidly provisioned and released with minimal management effort or service provider interaction.&rdquo;</p>
<p>Read it as four promises. You can reach it from anywhere. You can have it when you ask. The resources are shared rather than yours. And you can start and stop without a negotiation.</p>
</div>

<p>Notice what the definition says is being rented: networks, servers, storage, applications and services. That is the same component list this module walked through under objective 3.2, which is the honest way to understand the cloud. It is not a new kind of computing. It is the same five components, in somebody else&rsquo;s building, billed by use.</p>
<p>Three pieces of vocabulary carry the money side of that definition, and a manager needs all three.</p>
<ul class="keys">
<li><b>Utility computing</b> &mdash; the model cloud computing uses: renting processing, data storage or networking from an outside provider on an as-needed basis and paying only for what is actually used, the way a household pays for electricity.</li>
<li><b>Capital expenditure</b> &mdash; money spent up front to own equipment, committed once, years before anybody can know whether the amount of capacity purchased turned out to be the right amount.</li>
<li><b>Operational expenditure</b> &mdash; money spent continuously to use a service, rising and falling with what the business actually did that month, and approved as a running cost rather than as a purchase.</li>
</ul>
<p>The chapter&rsquo;s summary of the financial effect is one clause long: cloud computing helps transform infrastructure costs <b>from a capital expenditure to an operational expenditure</b>. That sounds like accounting trivia and is not. It changes which budget the money leaves, who has to approve it, and how far in advance the decision has to be made. It also converts a fixed cost, paid whether or not the capacity was used, into a variable one that follows the work.</p>

<div class="activity" data-activity="cldQuiz1"></div>

<h3>Two companies the chapter follows</h3>
<p>The first one built the market. Having assembled an immense infrastructure &mdash; in information technology and in logistics both &mdash; to support its own online store, <b>Amazon</b> decided to use those resources to generate additional revenue. Individuals and organizations can now rent storage space and computing time from it on an as-needed basis. That is the same move the chapter used to open the chapter: a company selling the capability it had to build anyway.</p>
<p>The second is the chapter&rsquo;s fullest cloud case. As <b>Airbnb</b> grew popular with travelers around the world, it found itself limited by the constraints imposed by its original service provider. Moving to a rented infrastructure let it obtain two hundred servers without negotiating service contracts and without committing to a minimum level of usage.</p>
<p>The chapter is careful to say what the alternative would have demanded. Scaling that flexibly would have been close to impossible in a data center of its own, because of both the time and the money needed to acquire that many machines &mdash; and, as the chapter asks, at the time who knew whether the business would actually take off?</p>
<p>That question is where the argument stops being about technology. With its own equipment the company would have had to add capacity <b>in chunks</b>, because you cannot buy a third of a server. Capacity therefore moves in steps while demand moves as a curve, the two lines cross each other constantly, and two gaps open that are never both closed at once.</p>
<ul class="keys">
<li><b>Capacity above demand</b> &mdash; equipment that was purchased, powered, cooled and staffed while doing nothing, which is the underused capacity the chapter estimates as many as seven infrastructures in ten are carrying.</li>
<li><b>Demand above capacity</b> &mdash; customers arriving at a system that cannot serve all of them, which costs an order today and may cost the customer for good.</li>
</ul>
<p>Rented capacity closes both gaps by following the demand line instead of stepping past it. The chapter draws that as two panels side by side, and it is worth walking through one panel at a time before reading anything else about the cloud.</p>

<div class="activity" data-activity="cldCurves"></div>

<p>The same reasoning is why the chapter says cloud computing has become a popular way of building an infrastructure for artificial intelligence. Those workloads fluctuate hard &mdash; heavy resource needs while a model is being trained, much lighter needs while it is merely being used &mdash; and the specialized hardware they want is expensive to own and idle between training runs. Renting a spike is cheaper than owning one.</p>

<h3>The five characteristics</h3>
<p>The chapter says the cloud model has several unique and essential characteristics that distinguish it from an in-house infrastructure. Five are named, they are quoted from the same national standards definition as the wording above, and they are worth learning as a set rather than one at a time.</p>
<ul class="keys">
<li><b>On-demand self-service</b> &mdash; a customer obtains resources in a buffet-style fashion as they are needed, without lengthy negotiations and in many cases without any human interaction with the provider.</li>
<li><b>Rapid elasticity</b> &mdash; resources are scaled up or down almost instantaneously and often automatically, in step with what the organization&rsquo;s users are actually doing.</li>
<li><b>Broad network access</b> &mdash; the services are reached over the internet, so they are available from almost anywhere and from almost any web-enabled device.</li>
<li><b>Resource pooling</b> &mdash; the provider manages many distributed resources and assigns them dynamically to many customers, so a customer rents capacity without knowing or controlling which machine supplied it.</li>
<li><b>Measured service</b> &mdash; usage is monitored and the customer pays for what it used, which turns the fixed costs of an infrastructure into variable costs that are easy to track and monitor.</li>
</ul>
<p>Every one of those reads as an advantage, and every one of them has a failure mode that the chapter also describes elsewhere. Open the cards below and read all four panels of each characteristic, especially the last one.</p>

<div class="activity" data-activity="cldFive"></div>

<p>Now read the same list a second way and it stops being a brochure. Each characteristic is an answer to a specific problem raised in the two sections before this one, which is exactly why the chapter puts the list here rather than at the start of the chapter.</p>
<p>Pairing them off is not decoration. Naming the problem a characteristic solves is what stops an organization from paying for a capability it has no use for, and it is the fastest way to tell a real reason for moving from a fashionable one.</p>

<div class="activity" data-activity="cldMatch"></div>

<h3>What renting does not do</h3>
<p>Two things survive the move, and the rest of this objective is about both of them. The work of choosing, integrating and managing services stays with the customer, so the technology function changes shape rather than disappearing. And the meter that makes measured service attractive keeps running whether or not anybody in the organization is reading it.</p>
<p class="takeaway">Owning means paying in advance for a guess about capacity. Renting means paying afterwards for what actually happened &mdash; which is better arithmetic and a worse habit, because a cost nobody approved in advance is a cost nobody is necessarily watching.</p>

<div class="activity" data-activity="cldQuiz2"></div>
`;

ACT.cldQuiz1 = {
  kind: "quiz",
  label: "Check yourself",
  title: "The shift, the definition, and the money",
  how: "Four options, one best answer; every organization described here is hypothetical, and only companies the chapter itself names are real, so read every explanation including the ones you did not pick.",
  objective: "3.4",
  questions: [
    {
      q: "Which statement best captures the shift the chapter says has taken place over the past decades?",
      opts: [
        "Organizations have moved from buying applications to writing their own, because writing software has become cheaper than purchasing it",
        "Organizations have moved from thinking about developing and maintaining the infrastructure toward thinking about what services that infrastructure should deliver",
        "Organizations have concluded that the infrastructure no longer affects how quickly new systems can be built, so it can safely be left to somebody else",
        "Organizations have moved every system to outside providers, including the specialized ones that make them different from their rivals"
      ],
      a: 1,
      why: [
        "The chapter describes the opposite direction of travel: organizations increasingly buy or rent applications rather than building them, and assume that those applications will work.",
        "Correct. That is the chapter&rsquo;s own sentence, and its illustration is that people want to use email rather than to purchase an email server and deal with its administration, maintenance, storage and energy consumption.",
        "The chapter says the reverse in the same passage: the infrastructure determines how quickly new systems can be implemented and how well they will function, whoever happens to own the equipment.",
        "The chapter names an explicit exception. Highly specialized systems that help a firm gain or sustain competitive advantage are the ones organizations still build for themselves, and it names Amazon and Dell as examples."
      ]
    },
    {
      q: "A hypothetical publisher stops replacing its servers every few years and instead rents processing and storage from an outside provider, paying only for what it uses. Which description of the change matches the chapter?",
      opts: [
        "It has adopted a utility computing model, and its infrastructure costs move from a capital expenditure to an operational expenditure",
        "It has adopted resource pooling, which is the chapter&rsquo;s term for the arrangement in which a customer pays according to usage",
        "It has eliminated its infrastructure costs, because nothing is being purchased and therefore nothing appears in the budget",
        "It has converted a variable cost into a fixed one, because a monthly bill is more predictable than an occasional large purchase"
      ],
      a: 0,
      why: [
        "Correct. Utility computing is renting processing, storage or networking from an external provider on an as-needed basis and paying only for what is actually used, and the chapter says cloud computing helps transform infrastructure costs from a capital expenditure into an operational expenditure.",
        "Resource pooling is a real characteristic, but it describes the provider assigning distributed resources dynamically to many customers. Paying according to usage is measured service, and the financial model behind it is utility computing.",
        "The costs have changed shape rather than vanished. They now arrive monthly instead of every few years, and the chapter&rsquo;s point about metering is precisely that a running cost still has to be managed.",
        "This reverses the chapter&rsquo;s claim. Buying equipment is the fixed cost, incurred whether or not the capacity was used; renting produces variable costs that rise and fall with the work that actually ran."
      ]
    },
    {
      q: "A hypothetical logistics firm has one system no competitor can match: a routing engine built on years of its own delivery data. Following the chapter&rsquo;s reasoning about what to rent and what to build, what should it do?",
      opts: [
        "Rent the routing engine from a provider, since the chapter recommends buying or renting applications rather than building them",
        "Build everything itself, because a firm with one distinctive system should keep control of its whole infrastructure",
        "Keep building the routing engine while renting the ordinary infrastructure beneath it, because the exception the chapter names is the specialized system that gains or sustains advantage",
        "Sell the routing engine to competitors, because the chapter&rsquo;s opening case is a company that turned the infrastructure it built for itself into a revenue stream, and the same move is open to this firm"
      ],
      a: 2,
      why: [
        "The chapter&rsquo;s buy-or-rent advice comes with an exception attached in the same sentence, and this system is the exception: it is the specialized capability that helps the firm gain or sustain competitive advantage.",
        "Nothing in the argument requires that. Turning over the lower levels of the infrastructure is described as what allows a business to focus on the applications that make it different, so owning the routing engine is compatible with renting the machines under it.",
        "Correct. Organizations buy or rent rather than build, except for the highly specialized systems that help gain or sustain competitive advantage, and renting the commodity underneath is what frees the attention to keep improving the part that matters.",
        "The chapter reports that some firms monetized infrastructure they had already built, which is a description of what happened rather than advice. Selling a rival the capability that distinguishes you is the opposite of the argument being made."
      ]
    }
  ]
};

ACT.cldCurves = {
  kind: "diagram",
  label: "Interactive diagram",
  title: "Capacity against demand, two ways",
  how: "Step through the owned picture, then the rented one, then the two gaps between them; the gaps are where the money is, so read that panel last and slowly.",
  objective: "3.4",
  models: [
    {
      id: "inhouse",
      name: "In-house infrastructure",
      site: "The left panel of the chapter&rsquo;s comparison: a stepped capacity line drawn over a demand line that keeps crossing it",
      boxes: [
        {c: "a", t: "Forecast", w: "Guess next year&rsquo;s busiest hour"},
        {c: "b", t: "Buy in chunks", w: "Capacity arrives as whole machines"},
        {c: "c", t: "Wait", w: "Weeks to deliver, days to configure"},
        {c: "d", t: "Live with it", w: "Until the next purchase is approved"}
      ],
      points: [
        "Capacity can only be added in <b>chunks</b>, because a server is not divisible. Whatever the forecast says the business needs, the purchase is rounded up to whole machines, and the rounding is paid for in full.",
        "Between purchases the capacity line is flat while demand carries on moving, so the relationship between what the organization has and what it needs is wrong in one direction or the other almost all of the time.",
        "The chapter notes that servers and other elements of an infrastructure typically take several weeks to be delivered and days or weeks to configure, because system software, databases and applications all have to be installed and set up.",
        "Scaling back down is the part people forget. Owned equipment cannot be handed back, and where facilities are rented instead the long-term contracts limit the flexibility to shrink when demand falls."
      ]
    },
    {
      id: "cloud",
      name: "Cloud infrastructure",
      site: "The right panel: one capacity line that closely follows the demand line instead of stepping past it",
      boxes: [
        {c: "a", t: "Ask", w: "A control panel, not a negotiation"},
        {c: "b", t: "Receive", w: "Minutes rather than weeks"},
        {c: "c", t: "Track demand", w: "Up and down, often automatically"},
        {c: "d", t: "Release", w: "Stop paying when the work stops"}
      ],
      points: [
        "The chapter&rsquo;s case is the travel platform that obtained two hundred servers without needing to negotiate service contracts or commit to minimum usage, which is what the first two boxes look like in practice.",
        "Because resources can be scaled up or down almost instantaneously and often automatically, the capacity line can be kept just above what is needed to keep users satisfied rather than far above it or below it.",
        "There is no purchase to approve before an experiment, which is why the same chapter argues it makes little sense to invest in infrastructure changes before knowing whether the experiment will succeed at all.",
        "The release step is the one with no counterpart in the owned picture. Capacity that is given back stops being billed, so a quiet month costs less than a busy one instead of costing the same."
      ]
    },
    {
      id: "gaps",
      name: "The two gaps",
      site: "The two shaded areas in the left panel, which between them carry the entire economic argument for renting",
      boxes: [
        {c: "a", t: "Gap one", w: "Capacity above demand"},
        {c: "b", t: "The bill for it", w: "Purchase, power, cooling, staff, all idle"},
        {c: "c", t: "Gap two", w: "Demand above capacity"},
        {c: "d", t: "The bill for it", w: "Orders not taken, customers not served"}
      ],
      points: [
        "The first gap is visible in the accounts and invisible to customers. Equipment that was bought, powered, cooled, insured and staffed while doing nothing is the underused capacity the chapter estimates as many as seven infrastructures in ten are carrying.",
        "The second gap is the reverse: invisible in the accounts and extremely visible to customers, because nothing on an invoice records the order that was never placed by somebody who gave up waiting.",
        "Both gaps come from the same cause, which is why closing one by buying more equipment simply widens the other. Capacity that moves in steps cannot follow demand that moves as a curve.",
        "This is the sentence to carry out of the section: with a traditional in-house infrastructure the organization ends up either holding unused resources or being unable to satisfy its users, and adding capacity in chunks is what forces that choice."
      ]
    }
  ]
};

ACT.cldFive = {
  kind: "explore",
  label: "Explore",
  title: "The five characteristics, benefit and failure mode together",
  how: "Open each card and read all four panels; the fourth panel is what the same characteristic looks like when nobody is managing it, which is the half most descriptions leave out.",
  objective: "3.4",
  labels: ["The chapter&rsquo;s definition", "What it looks like in practice", "Why owning could not do this", "What it looks like when nobody is watching"],
  items: [
    {
      icon: "SELF",
      name: "On-demand self-service",
      sub: "Getting resources without asking a person",
      what: "Users can access cloud resources in a buffet-style fashion on an as-needed basis without lengthy negotiations with the service provider, and in many cases with no human interaction with the provider at all.",
      real: "The chapter&rsquo;s example is a customer who needs only a payment card for billing and can then set up server instances or expand storage through a web-based control panel, which is what makes an experiment possible this afternoon.",
      absent: "Obtaining equipment used to begin with a supplier, a quotation and a contract, so the earliest an idea could be tested was measured in weeks. The negotiation, not the technology, was usually the slow part.",
      why: "The same door is open to everybody who holds an account. Resources can be created that nobody approved, forgotten by the person who created them, and billed every month afterwards to a company that no longer knows what they are for."
    },
    {
      icon: "SCALE",
      name: "Rapid elasticity",
      sub: "Capacity that follows the work",
      what: "In a cloud environment, computing resources can be scaled up or down almost instantaneously and often automatically, based on what users need at that moment.",
      real: "The chapter&rsquo;s case is the pre-holiday surge: there is no need to purchase expensive equipment in advance for a spike that may never materialize, and if it does materialize the resources can be obtained instantly in almost any quantity.",
      absent: "Servers typically take several weeks to be delivered and days or weeks to be configured, because system software, databases and application software all have to be installed and set up before anything runs on them.",
      why: "Capacity that grows automatically will also grow automatically for work that should not be happening. The mechanism does not ask whether the demand is legitimate, only whether there is more of it than there was a minute ago."
    },
    {
      icon: "REACH",
      name: "Broad network access",
      sub: "Reachable from wherever the work is",
      what: "Because cloud services are accessed over the internet, they are accessible from almost anywhere and from almost any web-enabled device.",
      real: "The chapter describes real-time management of business processes: an application can be reached whenever it is needed and from any location, so a knowledge worker can respond to something urgent without first travelling back to an office.",
      absent: "An application on a machine inside one building is reachable inside that building. Everything else &mdash; the private tunnel, the remote desktop, the laptop carried home &mdash; was an arrangement bolted on to work around that limit.",
      why: "A service reachable from anywhere is reachable by anyone holding a credential for it. The question of who may come in moves from the door of a building, which the organization controls, to an account, which it can only manage."
    },
    {
      icon: "POOL",
      name: "Resource pooling",
      sub: "Somebody else&rsquo;s machines, assigned as needed",
      what: "Rather than renting space or time on one specific physical machine, providers manage multiple distributed resources that are dynamically assigned to many customers according to their needs, so the customer rents a resource with no knowledge or control of how it is provided or where it is located.",
      real: "The chapter notes that providers often do allow a geographic area to be specified: a company may want its resources near its customers to reduce response latency, or its storage held in a particular region to satisfy data protection duties.",
      absent: "An organization sizing its own equipment has to size it for its own busiest hour, and every other organization does the same, which leaves a great deal of machinery standing mostly idle across all of them at once.",
      why: "You cannot say exactly where the data physically sits, which is uncomfortable when a duty about where records may be held applies to your industry or your region. The default is convenient; the exception has to be asked for."
    },
    {
      icon: "METER",
      name: "Measured service",
      sub: "Paying for what actually ran",
      what: "Providers monitor usage and customers pay only for what they use, with different resources metered differently &mdash; server instances charged by the hour according to their computing power, memory and operating system, or storage charged by the volume held and moved.",
      real: "For the customer, the fixed costs associated with an infrastructure become variable costs that are easy to track and monitor, which is the same transformation the chapter describes as moving from a capital to an operational expenditure.",
      absent: "An owned machine costs the same on its busiest day and its quietest one. There is no meter to read, so there is also no way to discover from the bill that half the capacity has not been touched since it was installed.",
      why: "The meter runs whether or not anybody is reading it. An invoice is the first place an unnoticed mistake becomes visible, and by the time it is visible the resources have already been consumed and charged for."
    }
  ]
};

ACT.cldMatch = {
  kind: "match",
  label: "Match",
  title: "Each characteristic and the problem it answers",
  how: "Pair each of the five characteristics with the infrastructure problem from the previous objective that it is answering; the explanation names where that problem was raised.",
  objective: "3.4",
  pairs: [
    {
      l: "On-demand self-service",
      r: "Equipment that took weeks to arrive, with locating facilities and negotiating contracts happening before that, so an idea sat a quarter away from being tested",
      why: "The chapter lists significant time for locating the right facilities, contract negotiations and setting up hardware and software among the reasons growth hurts. Self-service removes the negotiation entirely, which is why an experiment can start the same day."
    },
    {
      l: "Rapid elasticity",
      r: "Demand that spikes before the holidays and falls away afterwards, against capacity that can only be purchased in fixed chunks",
      why: "This is the demand-fluctuation problem in its clearest form: firms supporting consumer electronic commerce face large spikes in the pre-holiday season, and equipment bought for the spike is idle for the rest of the year."
    },
    {
      l: "Broad network access",
      r: "Work that no longer happens at one desk, because people travel, work away from the office, and bring their own devices into the organization",
      why: "Mobility and the consumerization of information technology were raised as drivers of infrastructure change. A service reachable from any web-enabled device answers them without the organization owning the device in question."
    },
    {
      l: "Resource pooling",
      r: "Machines standing mostly idle, because every organization sized its own equipment for its own busiest hour and then waited for that hour",
      why: "The chapter reports an estimate that as many as seven infrastructures in ten run at only about a fifth of their capacity. Pooling is what allows one provider&rsquo;s machines to be busy for somebody at almost any moment, which is where the saving comes from."
    },
    {
      l: "Measured service",
      r: "A large sum committed up front for capacity, plus the power and the cooling to run it, incurred whether or not the work ever arrived",
      why: "Rising energy costs and the capital cost of equipment were both named as pressures on the infrastructure. Metering is what converts those fixed costs into variable ones that follow the work, and it is what makes the spending visible at all."
    }
  ]
};

ACT.cldQuiz2 = {
  kind: "quiz",
  label: "Check yourself",
  title: "Characteristics, chunks, and the two gaps",
  how: "Three questions on the mechanics of renting capacity; every organization described is a hypothetical practice situation, and each option explains itself whether or not you chose it.",
  objective: "3.4",
  questions: [
    {
      q: "A hypothetical seed supplier needs about four times its usual computing capacity for six weeks each spring and its ordinary capacity for the rest of the year. Which characteristic addresses that most directly, and why?",
      opts: [
        "On-demand self-service, because the extra capacity can be obtained through a control panel without negotiating with anybody at the provider",
        "Resource pooling, because the provider holds distributed resources that many customers draw on as their needs change",
        "Rapid elasticity, because resources scale up and down almost instantaneously and often automatically, where purchased equipment takes weeks to arrive and days to configure",
        "Broad network access, because the supplier&rsquo;s staff can reach the extra capacity from anywhere and from any web-enabled device, which is what makes the spring arrangement workable at all"
      ],
      a: 2,
      why: [
        "Self-service describes how the resources are obtained rather than how they grow and shrink. It genuinely helps here, but the question is about capacity following a seasonal curve, which is a different characteristic.",
        "Pooling is the precondition that makes spare capacity available to be assigned, and it is present. It does not describe the speed of the change or the fact that the capacity is given back in June.",
        "Correct. The chapter contrasts equipment that takes several weeks to deliver and days or weeks to configure with a cloud environment where resources scale up or down almost instantaneously and often automatically, and it uses a seasonal surge to make the point.",
        "Broad network access explains who can reach a service and from where. The supplier&rsquo;s problem is the size of the capacity in March compared with October, not the location of the people using it."
      ]
    },
    {
      q: "The chapter presents measured service as a benefit. What is the same characteristic&rsquo;s cost?",
      opts: [
        "The meter runs whether or not anybody is reading it, so a cost that nobody is monitoring can grow until the invoice makes it visible",
        "Metering obliges the customer to commit to a minimum level of usage for the length of the contract",
        "Metering means the provider decides which physical machine the work runs on and where that machine is located",
        "Metering prevents capacity from being reduced again once it has been increased, because the meter is set at the higher level"
      ],
      a: 0,
      why: [
        "Correct. Measured service transforms fixed costs into variable ones that are easy to track and monitor, but tracking has to be done by somebody; the chapter&rsquo;s own cautionary case is what happens when nobody does it.",
        "This is the opposite of what the chapter describes. A cloud customer can typically obtain resources without committing to minimum usage, which is exactly what it credits for the travel platform&rsquo;s expansion.",
        "That is resource pooling, not measured service. It is a genuine consequence of renting, but it concerns where the work runs rather than how the customer is charged for it.",
        "Releasing resources and having the charge fall is the point of the model. Metering records what was used in each period, so a reduction in usage appears in the next bill rather than being locked out."
      ]
    },
    {
      q: "The chapter draws a stepped in-house capacity line beside a cloud capacity line that follows demand. What are the two gaps in the in-house picture, and why does each one cost money?",
      opts: [
        "Capacity above demand and capacity above budget, which are both forms of overspending, one on equipment and one on the staff to run it",
        "Capacity above demand and demand above capacity: one is equipment being paid for while idle, the other is business the system cannot serve",
        "Demand above capacity and demand above forecast, which are both planning failures rather than problems with the infrastructure itself",
        "Capacity above demand and demand above capacity, though only the first has a cost, because unserved demand usually returns later"
      ],
      a: 1,
      why: [
        "Only one of these is a gap in the figure. Staffing is a real cost of ownership, and the chapter names it, but the two shaded areas in the diagram are both about the distance between capacity and demand.",
        "Correct. With a traditional in-house infrastructure an organization ends up either holding unused resources or being unable to satisfy its users, and the two shaded areas in the chapter&rsquo;s figure are those two situations.",
        "A better forecast narrows the gaps but cannot close them, because capacity that arrives in whole machines cannot trace a demand curve however good the forecast is. The problem is the shape of the supply, not the quality of the guess.",
        "The second gap has the larger and less visible cost. Nothing on an invoice records an order that was never placed by a customer who gave up waiting, and the chapter treats unsatisfied demand as a real loss rather than a delay."
      ]
    }
  ]
};
