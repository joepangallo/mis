/* ===== s21d ===== */
PROSE.s21d = `
<span class="eyebrow">Section 2&ndash;1d</span>
<h2>How to compete: strategy, resources, and the value chain</h2>
<p class="lede">The five forces say where the pressure comes from, never what to do about it. This section is the other half: how a firm chooses what to be good at, and which systems pay.</p>

<h3>Choosing a generic strategy</h3>
<p>To earn superior returns a firm must position itself against the five forces. Figure 2.12 asks two questions: is the differentiating attribute <b>low cost</b> or <b>uniqueness</b>, and is the market focus <b>narrow</b> or <b>broad</b>?</p>
<ul class="keys">
<li><b>Low-cost leadership strategy</b> &mdash; the organization offers the best prices in its industry on its goods and services, as Walmart does.</li>
<li><b>Differentiation strategy</b> &mdash; the organization provides better products or services than competitors, as Porsche, Nordstrom and IBM do, so the customer pays for something rivals lack.</li>
<li><b>Best-cost provider strategy</b> &mdash; a middle position offering reasonably good quality at competitive prices, as Dell does, where the quadrants overlap.</li>
</ul>
<p>Either attribute can be aimed broadly or focused on one segment, as Apple did in home and educational computers, giving the figure five types. Place a few firms on the grid.</p>

<div class="activity" data-activity="vchStrategy"></div>

<div class="callout warn"><p><b>A chosen middle is not the same as no middle.</b> A firm that never said whether it competes on price or uniqueness has no test for the next proposal, so the budget goes to whoever argues best.</p></div>

<h3>Resources and capabilities: the second lens</h3>
<p>Position tells the market what to expect; it does not make the firm able to deliver. Whichever strategy it pursues, a firm needs resources or capabilities superior to its rivals&rsquo;.</p>
<ul class="keys">
<li><b>Resources</b> &mdash; specific assets used to achieve cost or product differentiation, such as proprietary technology, brand equity or a loyal customer base.</li>
<li><b>Capabilities</b> &mdash; the ability to leverage those resources in the marketplace, such as design quality: something a firm does, not something it owns.</li>
<li><b>Distinctive competencies</b> &mdash; what resources and capabilities produce together, such as innovation, agility or quality, and what makes a product valuable relative to competitors.</li>
<li><b>Superior value creation</b> &mdash; the aim of the whole chain, reached when a firm provides products at lower cost or with differentiated benefits.</li>
</ul>
<p>Figure 2.13 draws the sequence: resources and capabilities feed competencies, which produce a cost or differentiation advantage. An asset nobody uses well never becomes a competency, and anything a rival can order this afternoon is not superior. Several of Figure 2.14&rsquo;s eight sources are informational, so systems often sit inside the resources themselves.</p>

<div class="activity" data-activity="vchQuiz1"></div>

<h3>Analyzing the value chain</h3>
<p>Think of an organization as one input/output process: supplies are bought and brought in, integrated into products it markets, sells and distributes, with service after the sale. That set of activities is the <b>value chain</b>, and employees can add value at any point along it.</p>
<p><b>Value chain analysis</b> determines where value is added and what costs are incurred doing so. Draw the chain, find each area&rsquo;s costs and their drivers, then decide which activities to optimize &mdash; only then is naming a system reasonable.</p>
<p>The chain has two halves. <b>Primary activities</b> run left to right as a flow a product passes through; <b>support activities</b> are bands underneath, serving every stage.</p>
<ul class="keys">
<li><b>Inbound logistics</b> (primary) &mdash; receiving what was purchased, before any of it is sellable.</li>
<li><b>Operations</b> (primary) &mdash; integrating supplies into the products and services customers buy.</li>
<li><b>Outbound logistics</b> (primary) &mdash; distributing the finished product or service to the customer.</li>
<li><b>Sales and marketing</b> (primary) &mdash; making customers aware and giving them a reason to choose it.</li>
<li><b>Service</b> (primary) &mdash; looking after the customer once the sale has been made.</li>
<li><b>Administration and firm infrastructure</b> (support) &mdash; running the organization, billable to no single product.</li>
<li><b>Human resources</b> (support) &mdash; who is hired, trained and scheduled to do the work above.</li>
<li><b>Product research and development, technology, and systems development</b> (support) &mdash; improving the product and building the systems.</li>
<li><b>Procurement</b> (support) &mdash; the buying decision itself, not the physical receiving of goods.</li>
</ul>
<p>Built for manufacturing, the model fits services: a hotel&rsquo;s inbound logistics include reservations. Some firms lack logistics activities entirely. Build a chain and see.</p>

<div class="activity" data-activity="vchChain"></div>

<h3>The role of information systems in the chain</h3>
<p>Figure 2.15 lays supply chain and customer relationship management across the whole flow and puts a private cloud beneath the support bands.</p>
<p>Name a proposed system by the activity it improves. &ldquo;A better app&rdquo; cannot be argued about; &ldquo;a system that cuts the cost driver in inbound logistics&rdquo; can be costed, funded or refused.</p>

<div class="activity" data-activity="vchSort"></div>

<h3>The technology/strategy fit</h3>
<p>If money grew on trees a firm would build every system it could imagine. In reality it buys only those adding the most value &mdash; ones that automate and learn <i>and</i> carry strategic value. That test is <b>business/IT alignment</b>.</p>
<p>A firm pursuing low-cost leadership probably does not want a system that differentiates its products on high quality, because it values investments that drive costs down. Two qualifications stop that becoming a thoughtless rule.</p>
<ul class="keys">
<li><b>Strategic necessity</b> &mdash; an investment the organization must make to survive, whether or not it matches the overall strategy.</li>
<li><b>The change comes with the system</b> &mdash; a significant implementation needs matching change in processes, roles, culture and mindset.</li>
</ul>
<p>Underneath it all is a floor: a system is only as effective as the business model it serves, and bad business models are not overcome by good systems.</p>

<div class="activity" data-activity="vchOrder"></div>

<p class="takeaway">Position first, then the resources that make it deliverable, then the value chain activity where a system would pay, then the alignment test a proposal must survive.</p>

<div class="activity" data-activity="vchQuiz2"></div>

<div class="callout"><p><b>Practise both frameworks.</b> A companion page, <a href="five-forces-and-value-chain.html">Five Forces and the Value Chain &mdash; a working review</a>, turns the two models into work: interactive diagrams, a force-by-force rater, an evidence sort, a budgeted investment simulator and three case studies.</p></div>
`;

ACT.vchStrategy = {
  kind: "match",
  label: "Match",
  title: "Generic strategies and the situations that suit them",
  how: "Each situation below is a generic, hypothetical one written for practice, with no real company named. Pair it with the general type of strategy in Figure 2.12 that fits it.",
  objective: "2.1",
  pairs: [
    {
      l: "Overall low-cost leadership",
      r: "A company selling everyday goods to nearly every kind of buyer, whose customers choose a store mainly on price",
      why: "A low-cost leadership strategy means offering the best prices in the industry on goods and/or services, and the chapter names Walmart as the example. The market is broad and the differentiating attribute is cost."
    },
    {
      l: "Broad differentiation",
      r: "A company whose buyers come from many different segments and who pay for products or services that are better than the alternatives",
      why: "A differentiation strategy means trying to provide better products or services than competitors, as Porsche, Nordstrom, and IBM do, and here the differentiation is aimed broadly at many different types of consumers."
    },
    {
      l: "Focused differentiation",
      r: "A company that deliberately serves one segment of buyers and gives that segment higher quality than anyone else offers it",
      why: "The chapter describes exactly this width of differentiation: Apple focused for many years on high-quality computers for the home and educational markets rather than aiming at every buyer."
    },
    {
      l: "Focused low-cost leadership",
      r: "A company competing on price, but only inside one narrow slice of the market rather than across the whole industry",
      why: "Figure 2.12 names this as one of the five general types, in the narrow-market and low-cost quadrant. The chapter names no company for it, so you have to recognize it by its position rather than by an example."
    },
    {
      l: "Best-cost provider strategy",
      r: "A company offering reasonably good quality at competitive prices, sitting on purpose between the price players and the premium ones",
      why: "This is the middle-of-the-road strategy the chapter describes, with Dell as the example, and the figure places it at the center where all the quadrants overlap."
    }
  ]
};

ACT.vchQuiz1 = {
  kind: "quiz",
  label: "Check yourself",
  title: "Strategy, resources, and capabilities",
  how: "Four options, one best answer; read every explanation, including the ones for the answers you did not pick. Any company described in a question is hypothetical unless the chapter names it.",
  objective: "2.1",
  questions: [
    {
      q: "Which description matches the best-cost provider strategy as the chapter presents it?",
      opts: [
        "Offering the best prices in the industry on goods and/or services, the way the chapter describes Walmart",
        "Providing products or services of reasonably good quality at competitive prices, the way the chapter describes Dell",
        "Providing better products or services than competitors and aiming them at one segment of consumers, as Apple did in home and educational computers",
        "Providing better products or services than competitors and aiming them broadly at many different types of consumers rather than at one segment"
      ],
      a: 1,
      why: [
        "That is the low-cost leadership strategy, whose whole promise is price. It occupies the low-cost end of the horizontal axis rather than the center of the figure, and the chapter names Walmart for it.",
        "Correct. The chapter calls this a middle-of-the-road strategy, names Dell as the example, and Figure 2.12 places the best-cost provider at the center where all four quadrants overlap.",
        "That is focused differentiation: the differentiating attribute is uniqueness and the market focus is narrow. Quality is aimed at one segment rather than balanced against price for everybody.",
        "That is broad differentiation. It shares the uniqueness end of the axis with focused differentiation and differs only in how wide the market is, so neither one describes a company balancing quality against price. The chapter names Porsche, Nordstrom, and IBM for differentiation without saying which width each pursues."
      ]
    },
    {
      q: "Which of these is a capability rather than a resource, as the chapter defines the two words?",
      opts: [
        "Proprietary technology the company owns and no competitor can use",
        "Brand equity built up with customers over many years",
        "Efficient operations, meaning the company runs its processes better than others do",
        "A loyal and established customer base that keeps returning"
      ],
      a: 2,
      why: [
        "Proprietary technology is one of the chapter&rsquo;s own examples of a resource: a specific asset the organization holds and uses to achieve cost or product differentiation.",
        "Brand equity is also listed as a resource. It is something the organization possesses, and possessing it says nothing yet about how well the organization puts it to work.",
        "Correct. Capabilities reflect the organization&rsquo;s ability to leverage its resources in the marketplace, and the chapter offers design quality and efficient operations as the examples.",
        "A loyal and established customer base is the third resource the chapter lists. Turning that base into repeat revenue would be a capability; having the base is an asset."
      ]
    },
    {
      q: "A company holds years of purchase data and a well-known brand, but no department can agree on how to use either, and nothing the company does with them is better than what rivals do. What does the chapter&rsquo;s framework say about its position?",
      opts: [
        "It already has a sustained competitive advantage, because owning data and a brand is what the chapter means by resources",
        "It has resources but not the capabilities to leverage them, so no distinctive competency and no advantage follows yet",
        "It has capabilities but no resources, since knowing about customers counts as ability rather than as an asset",
        "It has achieved superior value creation, because customers can recognize the brand more easily than they recognize rivals"
      ],
      a: 1,
      why: [
        "Resources alone do not finish the chain. The organization must have resources and/or capabilities superior to those of its competitors, and superiority is judged by what reaches the market, not by what sits in the building.",
        "Correct. Capabilities are the ability to leverage resources in the marketplace; without them the resources never become distinctive competencies, and Figure 2.13 runs from competencies to a cost or differentiation advantage to a sustained advantage.",
        "This reverses the two definitions. Data and a brand are assets the organization holds, which makes them resources; the ability to use them well would be the capability that is missing here.",
        "Superior value creation occurs when an organization can provide products at a lower cost or with superior, differentiated benefits to the customer. Recognition without a better cost or a better benefit does not meet that definition."
      ]
    }
  ]
};

ACT.vchChain = {
  kind: "diagram",
  label: "Interactive diagram",
  title: "The value chain, one half at a time",
  how: "Step through the primary activities, then the support activities, then the places information systems add value along the chain.",
  objective: "2.1",
  models: [
    {
      id: "primary",
      name: "Primary activities",
      site: "The flow a product travels, from arriving supplies to the customer after the sale",
      boxes: [
        {c: "a", t: "Supplies come in", w: "Inbound logistics"},
        {c: "b", t: "Inputs become the product", w: "Operations"},
        {c: "c", t: "The product goes out and is sold", w: "Outbound logistics, sales and marketing"},
        {c: "d", t: "The buyer is looked after", w: "Service"}
      ],
      points: [
        "Think of the organization as a big input/output process: supplies are purchased and brought in, integrated into products and services, marketed, sold, and distributed to customers, with customer service provided after the sale.",
        "The five primary activities the chapter names in Figure 2.15 are <b>inbound logistics</b>, <b>operations</b>, <b>outbound logistics</b>, <b>sales and marketing</b>, and <b>service</b>, drawn in that order and connected by arrows.",
        "The model was initially created to focus on manufacturing, but it also applies to service industries, sometimes with different activities being performed &mdash; in a hotel, inbound logistics covers receiving supplies and handling reservations, while operations covers checking guests in or out, cleaning rooms, and preparing breakfast.",
        "Some organizations may lack inbound and/or outbound logistics entirely, and different activities may be classified differently, so the chain is a tool for identifying and analyzing what a particular organization actually does."
      ]
    },
    {
      id: "support",
      name: "Support activities",
      site: "The bands drawn underneath the whole flow, because they serve every stage rather than one",
      boxes: [
        {c: "a", t: "Administration and firm infrastructure", w: "Running the organization as a whole"},
        {c: "b", t: "Human resources", w: "Hiring, training, and scheduling people"},
        {c: "c", t: "Product R and D, technology, systems development", w: "Improving the product and building the systems"},
        {c: "d", t: "Procurement", w: "Choosing suppliers and terms"}
      ],
      points: [
        "Figure 2.15 draws these as layers beneath the primary flow rather than as steps inside it &mdash; administration and firm infrastructure at the top, then human resources, then product research and development, technology, and systems development, then procurement &mdash; which is the visual way of saying that their payoff appears spread across all five primary activities instead of in one of them.",
        "Whereas the primary activities may differ from one organization to another, the chapter notes that the supporting activities are likely to resemble those of other organizations.",
        "<b>Procurement</b> is the decision about whom to buy from and on what terms; <b>inbound logistics</b> is what happens to the goods after that decision is made. Filing one under the other sends a recommendation to the wrong department.",
        "The figure shows these bands supported by a private cloud and computer-aided design systems, and names a financial decision support system, an employee self-service portal, and a supply chain management system alongside them."
      ]
    },
    {
      id: "systems",
      name: "Where information systems add value",
      site: "The analysis that decides which system to fund, and the systems the figure places along the chain",
      boxes: [
        {c: "a", t: "Draw the chain", w: "Every activity where value is or should be added"},
        {c: "b", t: "Find the costs", w: "And the factors that drive or move them"},
        {c: "c", t: "Choose what to optimize", w: "Performance, cost, advantage"},
        {c: "d", t: "Name the system by its activity", w: "Not by the technology it uses"}
      ],
      points: [
        "Because information systems can automate and optimize many activities along the value chain, using them has become one of the primary ways that organizations improve their value chains.",
        "Many organizations use the internet to connect businesses with one another electronically so that they can exchange orders, invoices, and receipts online in real time, which removes waiting from the seams between activities.",
        "Organizations use various social media such as blogs, X, or Instagram to connect with their customers, and Figure 2.15 shows supply chain management and customer relationship management systems, along with the website, Facebook, and X, laid across the primary flow.",
        "Value chain analysis is the process of analyzing an organization&rsquo;s activities to determine where value is added to products and/or services and what costs are incurred for doing so &mdash; which is why the costs come before the shopping."
      ]
    }
  ]
};

ACT.vchSort = {
  kind: "sort",
  label: "Sort",
  title: "Which primary activity does this system improve?",
  how: "Each proposed system below is hypothetical; place it in the primary activity it would strengthen, using the chapter&rsquo;s own mapping of the value chain onto a hotel.",
  objective: "2.1",
  buckets: [
    {id: "inbound", name: "Inbound logistics", hint: "in a hotel, receiving supplies and handling reservations"},
    {id: "operations", name: "Operations", hint: "in a hotel, checking guests in or out, cleaning rooms, preparing breakfast"},
    {id: "outbound", name: "Outbound logistics", hint: "in a hotel, work that might be performed by the catering or event service"},
    {id: "marketing", name: "Sales and marketing", hint: "in a hotel, promoting it and attracting business meetings and conventions"},
    {id: "service", name: "Service", hint: "in a hotel, the activities after the guest has left, such as resolving complaints"}
  ],
  items: [
    {t: "A reservation system that records each booking as it is made and holds the right room for the right night", b: "inbound", why: "The chapter puts handling reservations in inbound logistics for a hotel, alongside receiving supplies, because a booking is an input that arrives and has to be held until it is used."},
    {t: "A delivery portal where linen and food suppliers confirm what will reach the loading dock tomorrow morning", b: "inbound", why: "Receiving supplies is the other half of inbound logistics in the chapter&rsquo;s hotel example, and this system manages what arrives rather than who was chosen to send it."},
    {t: "A housekeeping tablet that routes cleaners room by room and marks each room ready for the next guest", b: "operations", why: "Cleaning rooms is named as a day-to-day operations activity, because a clean and ready room is part of the product the guest is buying."},
    {t: "A check-in screen that issues a key card without the guest waiting in line at the front desk", b: "operations", why: "Checking guests in or out is listed under operations for a hotel, since it is part of turning inputs into the service the customer receives."},
    {t: "A catering scheduler that assigns staff, food, and equipment to each function the hotel&rsquo;s event service delivers", b: "outbound", why: "The chapter says outbound logistics activities in a hotel might be performed by the hotel&rsquo;s catering or event service, so a system that plans those functions belongs here rather than under room operations."},
    {t: "A tracking system that follows each event order from the kitchen to the room where the function is being held", b: "outbound", why: "Outbound logistics is the half of the flow that gets the finished offering to the customer, and in the chapter&rsquo;s hotel example that work sits with the catering or event service."},
    {t: "A campaign tool that measures which advertisement brought more convention organizers to the booking page", b: "marketing", why: "Attracting business meetings and conventions is listed under sales and marketing for a hotel, and measuring what attracts them is part of the same activity."},
    {t: "A pipeline tracker showing which large organizations are choosing a host city next year so the sales team can approach them", b: "marketing", why: "Promoting the hotel and pursuing group business is sales and marketing, because the work is creating awareness and a reason to choose this hotel."},
    {t: "A complaint log that registers each issue a departed guest reports and tracks it until it is resolved", b: "service", why: "The chapter names registering or resolving guest complaints as customer service activities performed after the guest has left."},
    {t: "A follow-up system that flags a guest whose last stay went badly so the next stay is handled with extra care", b: "service", why: "Looking after the customer after the sale is the service activity, and this system acts on a past stay rather than on the current one."}
  ]
};

ACT.vchOrder = {
  kind: "order",
  label: "Sequence",
  title: "From competitive forces to a funded system",
  how: "Put the eight steps of a full analysis into the order the chapter builds them, from the industry outside to the money inside.",
  objective: "2.1",
  intro: "Each step narrows the question the next one answers. Run them out of order and you end up with a technology looking for a problem.",
  steps: [
    {
      t: "Analyze the competitive forces in the industry to see where the pressure on profit is actually coming from.",
      why: "Given that every industry is different, organizations need to analyze the competitive forces within their industry to better understand where to focus their resources, so this comes before any choice about how to compete."
    },
    {
      t: "Choose the position the company will compete from: low-cost leadership, differentiation, or the best-cost provider middle, broad or focused.",
      why: "To achieve superior returns, a company positions itself within its industry to counter the effects of the five forces, and that position is what everything afterwards has to serve."
    },
    {
      t: "Take stock of the resources and capabilities the company holds, and ask whether they are superior to those of competitors.",
      why: "No matter which generic strategy is chosen, the organization must have resources and/or capabilities superior to those of its competitors in order to gain or sustain a competitive advantage."
    },
    {
      t: "Draw the value chain, fleshing out each activity, function, and process where value is or should be added and where performance can be improved.",
      why: "The chapter makes drawing the chain the first move of value chain analysis, because an activity nobody has written down cannot be measured or improved."
    },
    {
      t: "Determine the costs within each area of the diagram, along with the factors that drive those costs or cause them to fluctuate.",
      why: "Costing comes second in value chain analysis, and knowing the driver behind a cost is what separates a number you can act on from a number you can only report."
    },
    {
      t: "Decide which activities need to be optimized to improve performance, cut costs, and ultimately gain or sustain competitive advantage.",
      why: "This is the third step of value chain analysis and the first moment at which naming a system is reasonable, because now the target activity is known."
    },
    {
      t: "Test the candidate system against the strategy, keeping the ones that match and setting aside the ones that do not, unless the investment is a strategic necessity.",
      why: "Organizations try to maximize business/IT alignment and in most cases do not want systems that fail to match the strategy, though a strategic necessity is something the organization must do to survive regardless."
    },
    {
      t: "Plan the organizational change that has to accompany the system, then take the proposal for funding with its value stated plainly.",
      why: "Merely implementing a system is not sufficient; there must be commensurate, significant organizational change, and most companies are willing to spend only when they can see clear, significant value."
    }
  ]
};

ACT.vchQuiz2 = {
  kind: "quiz",
  label: "Check yourself",
  title: "The value chain and the technology/strategy fit",
  how: "Three questions on locating work in the value chain and on deciding whether a system deserves the money. The firms described are hypothetical; only the chapter&rsquo;s own examples name real companies.",
  objective: "2.1",
  questions: [
    {
      q: "A hotel is deciding where an employee self-service portal for scheduling and time off belongs on its value chain. Where does it sit?",
      opts: [
        "Operations, because scheduling decides who is available to clean rooms and serve breakfast",
        "Human resources, a support activity, because it serves the staffing of every stage rather than one stage",
        "Inbound logistics, because staff time is one of the inputs the hotel receives and consumes",
        "Service, because the portal exists to serve the people who work at the hotel"
      ],
      a: 1,
      why: [
        "Operations covers the day-to-day activities of checking guests in or out, cleaning rooms, and preparing breakfast. Scheduling touches operations, but it touches the other primary activities just as much, which is the signature of a support activity.",
        "Correct. Human resources is one of the support bands Figure 2.15 draws beneath the whole flow, and the figure lists an employee self-service portal among the systems it places on that chain.",
        "Inbound logistics is about goods and, in a hotel, reservations arriving and being handled. Treating employees as arriving inventory stretches the definition past the one the chapter uses.",
        "Service in the value chain means looking after the paying customer after the sale, such as registering or resolving guest complaints. The word service in ordinary speech is broader than the activity the model names."
      ]
    },
    {
      q: "A firm pursuing overall low-cost leadership is offered a system that would help it differentiate its products on high quality, and the system genuinely automates work and produces useful learning. What does the chapter say the firm should conclude?",
      opts: [
        "Fund it, because a system that automates work and produces learning has already justified itself",
        "Fund it, because a company that can differentiate on quality should abandon a low-cost position",
        "Probably decline it, because organizations do not want systems that fail to match the strategy even when they offer automating and learning benefits",
        "Declare it a strategic necessity, because any system a competitor might also buy is something the firm has to have in order to stay level, whatever it does or does not do for the strategy"
      ],
      a: 2,
      why: [
        "Automating and learning benefits are real but not sufficient. Organizations are constrained by time and money to acquire only the systems that add the most value, meaning those that automate and learn and also carry strategic value.",
        "Nothing in the situation says the low-cost position was wrong. A single system offer is a weak reason to abandon a position the company has aligned its costs, suppliers, and customer promise around.",
        "Correct. The chapter says an organization probably does not want a system that differentiates products on high quality when its strategy is overall low-cost leadership, because a low-cost leader values the investments that drive costs down.",
        "A strategic necessity is something the organization must do to survive, not a label for any purchase a competitor might also make. Applying it this loosely would let it excuse every proposal on the table."
      ]
    },
    {
      q: "Which statement about implementing a new information system matches the chapter?",
      opts: [
        "A well-chosen system can carry a weak business model, which is why the system decision matters more than the model",
        "Implementing the system is the hard part, so processes, roles, and culture can be left as they are afterwards",
        "Any significant implementation needs commensurate organizational change, and the system can be only as effective as the business model it serves",
        "Change the processes, roles, and culture only after the system has run long enough to show where it falls short, since reorganizing first would be premature"
      ],
      a: 2,
      why: [
        "The chapter states the reverse: an information system can be only as effective as the business model that it serves, and bad business models cannot be overcome by good information systems.",
        "This inverts the caution. Merely choosing and implementing new or innovative systems is not sufficient to gain or sustain competitive advantage, and the change in processes, roles, culture, and mindset is part of the work rather than an afterthought.",
        "Correct. Both cautions are stated: significant implementations require commensurate, significant organizational change, and a system can be only as effective as the business model it serves.",
        "The chapter puts the change alongside the implementation rather than after it: in any significant implementation there must be commensurate, significant organizational change, and waiting leaves the system dropped into an organization that still works the old way."
      ]
    }
  ]
};
