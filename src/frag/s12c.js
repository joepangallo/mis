/* ===== s12c ===== */
PROSE.s12c = `
<span class="eyebrow">Section 1&ndash;2c</span>
<h2>Information systems inside an organization</h2>
<p class="lede">Information systems do not exist in a vacuum; they are built and used inside a context, and that context is almost always an organization. It is the last piece of the definition.</p>

<p>Organizations put information systems in place for four blunt reasons, and not one of them is &ldquo;because the technology is new.&rdquo;</p>
<ul class="keys">
<li><b>To become more productive and profitable</b> &mdash; the system must pay for itself in work or money.</li>
<li><b>To gain competitive advantage</b> &mdash; it does something rivals cannot, or does it faster.</li>
<li><b>To reach more customers</b> &mdash; a website reaches anyone with a browser.</li>
<li><b>To improve customer service</b> &mdash; answering a question faster is its own reason.</li>
</ul>
<p>None of those motives is unique to business: the same four hold for professional, social, religious, educational, and governmental organizations, and for industries from medical to legal to manufacturing.</p>

<div class="callout info">
<p><b>A government example, not a Silicon Valley one.</b> The U.S. Internal Revenue Service launched its own website for exactly those reasons. Roughly <b>220,000 users</b> visited in the first 24 hours and <b>more than one million</b> in the first week &mdash; before the address had even been officially announced. Facebook.com and WSJ.com now take millions of visitors a day.</p>
</div>

<h3>One company, three questions</h3>
<p>People at different heights in a company need different kinds of information.</p>
<ul class="keys">
<li><b>A cashier</b> &mdash; she needs the price of the item in her hand right now, because a customer is waiting.</li>
<li><b>Her store manager</b> &mdash; he needs to know which items ran out last week across the store, so next week&rsquo;s order is right.</li>
<li><b>A senior leader</b> &mdash; she needs to know whether a store in a new state will pay for itself.</li>
</ul>
<p>Same data, three questions &mdash; and the catalogue below sorts largely by which question a system answers.</p>

<div class="activity" data-activity="orgLevels"></div>

<h3>The catalogue: major categories of information systems</h3>
<p>Read the middle column first: the category names are only labels for the job described there.</p>

<div class="tbl-wrap"><table class="tbl">
<thead><tr><th>Category of system</th><th>Purpose</th><th>Sample application</th></tr></thead>
<tbody>
<tr><td><b>Transaction processing system</b> (TPS)</td><td>Processes day-to-day business event data at the operational level of the organization</td><td>Grocery checkout register on a network; student registration</td></tr>
<tr><td><b>Management information system</b> (MIS)</td><td>Produces detailed information to help manage a firm or part of a firm</td><td>Inventory management and planning; student enrollment management</td></tr>
<tr><td><b>Decision support system</b> (DSS)</td><td>Provides analysis tools and access to databases to support quantitative decision making</td><td>Product demand forecasting; loan and investment analysis</td></tr>
<tr><td><b>Intelligent system</b></td><td>Emulates or enhances human capabilities</td><td>Analyzing bank loan applications; self-driving cars; Siri, Alexa, ChatGPT, Gemini</td></tr>
<tr><td><b>Business intelligence system</b></td><td>Analyzes Big Data to better understand various aspects of a business</td><td>Online analytical processing (OLAP); data visualization</td></tr>
<tr><td><b>Office automation system</b> (personal productivity software)</td><td>Supports a wide range of predefined day-to-day work activities of individuals and small groups</td><td>Word processor, spreadsheet, presentation software, email client</td></tr>
<tr><td><b>Collaboration system</b></td><td>Enables people to communicate, collaborate, and coordinate with each other</td><td>Email system with an automated, shared calendar</td></tr>
<tr><td><b>Knowledge management system</b></td><td>Enables the generation, storage, sharing, and management of knowledge assets</td><td>Knowledge portal for common questions</td></tr>
<tr><td><b>Social software</b></td><td>Facilitates collaboration and knowledge sharing</td><td>A social network connecting colleagues and friends</td></tr>
<tr><td><b>Geographic information system</b> (GIS)</td><td>Creates, stores, analyzes, and manages geographically referenced data</td><td>Route planning system</td></tr>
<tr><td><b>Functional area information system</b></td><td>Supports the activities within a specific functional area of the firm</td><td>Planning system for personnel training and work assignments</td></tr>
<tr><td><b>Customer relationship management</b> (CRM)</td><td>Supports interaction between the firm and its customers</td><td>Sales force automation; lead generation</td></tr>
<tr><td><b>Enterprise resource planning</b> (ERP)</td><td>Supports and integrates all facets of the business, including planning, manufacturing, sales, and marketing</td><td>Financial, operations, and human resource management</td></tr>
<tr><td><b>Supply chain management</b> (SCM)</td><td>Supports the coordination of suppliers, product or service production, and distribution</td><td>Procurement planning</td></tr>
<tr><td><b>Electronic commerce system</b></td><td>Enables customers to buy goods and services from a firm&rsquo;s website</td><td>Amazon, eBay, Nordstrom.com</td></tr>
<tr><td><b>Mobile app</b></td><td>Performs a well-defined function, typically on a mobile device</td><td>Instagram, Snapchat, WhatsApp, Office Mobile, Google Pay, Lyft</td></tr>
</tbody>
</table></div>

<p>The transaction processing system is the foundation. Besides processing customer transactions efficiently, it generates a tremendous amount of data the firm can learn from, and two everyday examples show it.</p>
<ul>
<li>Your grocery store scans bar codes at the register, then prints discount coupons on the back of the receipt for products related to what you just bought.</li>
<li>Amazon processes thousands of transactions an hour from around the world, feeding large data warehouses that are analyzed to produce purchase recommendations for future customers.</li>
</ul>
<p>TPS data are then sorted and organized to support managerial decision making &mdash; most often through a management information system &mdash; and they also feed decision support, intelligent, business intelligence, and knowledge management systems, social software, geographic information systems, and functional area information systems.</p>

<div class="activity" data-activity="orgMatch"></div>

<div class="activity" data-activity="orgQuiz1"></div>

<h3>Why the boxes leak</h3>
<p>Ten to 15 years ago it was typical to see a system that fell cleanly into one of these categories. Three developments ended that.</p>
<ul class="keys">
<li><b>Enterprise systems</b> &mdash; many organizations replaced stand-alone systems with ones that span the entire organization.</li>
<li><b>Internetworking</b> &mdash; connecting host computers and their networks into larger networks, the internet being the giant example, let systems reach each other.</li>
<li><b>Systems integration</b> &mdash; connecting separate, often modular systems and their data using technologies such as APIs, to improve business processes and decision making, stitched the pieces into one flow.</li>
</ul>
<p>Many systems no longer sit in the building at all; they live in the cloud, reached through a browser when needed.</p>
<p>So a modern system usually spans several categories at once: collecting data from across the firm and from customers, integrating it from diverse sources, and presenting it to busy decision makers with tools to analyze it.</p>
<p>Customer relationship management, supply chain management, and enterprise resource planning are the clearest cases &mdash; each carries so many features and data types that it refuses to sit in one row. The categories still matter, because they name the goals, features, and functions a system delivers.</p>

<div class="callout tip">
<p><b>How to use the catalogue.</b> Do not ask &ldquo;what category is this product?&rdquo; Ask &ldquo;what job needs doing?&rdquo; Recording an event, summarizing events for a manager, and modeling a decision are three different jobs. Name the job; the category follows.</p>
</div>

<div class="activity" data-activity="orgPick"></div>

<h3>Organizing the IS function</h3>
<p>The people who run technology inside a company are the <b>IS function</b>, and their old reputation was earned. Old-school IS personnel held three beliefs about their own job.</p>
<ul>
<li>They owned and controlled the computing resources, so any change was theirs to grant or refuse.</li>
<li>They knew better than users what those users needed.</li>
<li>Their job was to tell users what they could and could not do.</li>
</ul>
<p>Early IS departments carried huge backlogs and delivered systems that were over budget, late, hard to use, and unreliable.</p>

<p>Technology became too pervasive for that to survive. Fast-paced competition forced firms to treat IS as an enabler that streamlines business processes, improves customer service, and connects stakeholders inside and outside the company. Many organizations also realized that some of the best ideas for solving business problems come from the employees using the system.</p>
<p>So IS units moved into a <b>consulting relationship</b> with their users, built on four habits.</p>
<ul class="keys">
<li><b>Reach out first</b> &mdash; they seek user input instead of waiting for complaints.</li>
<li><b>Change fast</b> &mdash; they modify systems at a moment&rsquo;s notice to meet a need.</li>
<li><b>Welcome ideas</b> &mdash; they celebrate new ideas rather than explaining why they will not work.</li>
<li><b>Hand over ownership</b> &mdash; they treat the technology and the information as belonging to the customer, and they build <b>help desks, hotlines, information centers, and training centers</b> to support them.</li>
</ul>
<p class="takeaway">A firm is unproductive when IS staff and everyone else are at odds and remarkably productive when they work hand in hand: technology is potentially the great lever, but it works best when people use it together rather than against each other.</p>

<h3>The pervasiveness of technology</h3>
<p>Technology is now entrenched within the business units themselves &mdash; accounting, sales, marketing &mdash; so the seam between the technology and the business is hard to find.</p>
<p>In many organizations, especially those using agile approaches such as <b>scrum</b>, the builders and managers of a system spend most of their time out in the business unit with its users, often permanently placed there with an office, desk, phone, and PC. Systems staff commonly have education, training, and experience in information systems <b>and</b> in the functional area the system supports, such as finance.</p>
<p>Because systems are used so broadly, IS personnel often have <b>dual-reporting relationships</b>, reporting both to the central IS group and to the business function they serve. Firms want the benefits of decentralizing the IS function, but they are not willing &mdash; and not able &mdash; to forgo the benefits of centralizing it, so they try to hold both at once and keep a coordinating centre alongside the local staff.</p>
<ul class="keys">
<li><b>What decentralization buys</b> &mdash; flexibility, adaptability, and systems responsiveness, because builders sit beside users.</li>
<li><b>What centralization buys</b> &mdash; coordination, economies of scale, compatibility, and connectivity firm-wide.</li>
<li><b>Why central planning survives</b> &mdash; some centralized planning still has to exist, to achieve economies of scale in acquiring and developing systems and to keep systems integration and enterprise networking coherent.</li>
</ul>
<p>The clock is speeding up too: IS departments once thought in five-year time frames, but new devices now arrive every 6&ndash;18 months, so firms need people who understand the technology side and the business side at once. That is why how information systems are managed matters no matter which career you choose.</p>

<h3>When things go wrong: technology addiction</h3>
<div class="callout warn">
<p>Beginning in <b>2018</b>, online gaming was designated by health experts as a real, diagnosable addiction. The numbers are blunt.</p>
<ul>
<li>Average adults consume more than <b>11 hours</b> of media a day.</li>
<li>Fifty percent of 18- to 24-year-olds check their phone within five minutes of waking up.</li>
<li>A third of 25- to 34-year-olds open social media sites or apps more than ten times a day.</li>
<li>A majority of adolescents already claim to be addicted to technology, and too much screen time can affect memory and lead to a decline in academic performance.</li>
<li>The average human attention span has fallen from <b>12 seconds</b> at the turn of this century to <b>8 seconds</b> &mdash; less than a goldfish.</li>
<li>University of Pennsylvania researchers have shown that social media use decreases overall health and well-being.</li>
</ul>
<p>The mechanism is chemical: <b>dopamine</b>, the brain chemical associated with pleasure, is released when we are stimulated, and the hit from a like or a status update can have the same addicting effect as drugs like cocaine or heroin. Being plugged in constantly also leaves the brain hyper-aroused, so we walk around in a constant state of distraction.</p>
<p>There is a bright side: younger generations, immersed in this technology their whole lives, may be better able to adjust and adapt. The suggested fixes are unglamorous.</p>
<ul class="split">
<li>Start by turning the gadgets off for a while each day.</li>
<li>Improve your overall health, which helps as well: eat right, stay hydrated, and work out regularly.</li>
<li>Get enough sleep, and do not fall asleep to Netflix or Instagram.</li>
</ul>
</div>

<div class="activity" data-activity="orgQuiz2"></div>
`;

ACT.orgLevels = {
  kind: "diagram",
  label: "Interactive diagram",
  title: "Which class of system serves which kind of work",
  how: "Pick a layer of work to see what happens there, what the people there need to know, and which class of system serves them.",
  objective: "1.2",
  models: [
    {
      id: "ops",
      name: "Operational level",
      site: "The people who run the day, one event at a time",
      boxes: [
        {c: "a", t: "An event happens", w: "A customer checks out; a student registers"},
        {c: "b", t: "A TPS records it", w: "Scanner, register, registration screen"},
        {c: "c", t: "The data are stored", w: "Every layer above lives on this"}
      ],
      points: [
        "A <b>transaction processing system</b> processes day-to-day business event data at the operational level of the organization &mdash; the grocery checkout register connected to a network is the classic case.",
        "The person using it is not making a strategic decision; they are recording something that just happened, accurately and fast.",
        "The by-product is the real prize: a TPS generates a tremendous amount of data the firm can use to learn about customers and changing product trends.",
        "Skip this layer and nothing above it can work, because there is no record of what actually occurred."
      ]
    },
    {
      id: "mgr",
      name: "Managerial level",
      site: "Managers running a department or a store week to week",
      boxes: [
        {c: "a", t: "TPS data pile up", w: "Thousands of recorded events"},
        {c: "b", t: "An MIS organizes them", w: "Detailed reports on the unit"},
        {c: "c", t: "A manager acts", w: "Reorder, restaff, reschedule"}
      ],
      points: [
        "A <b>management information system</b> produces detailed information to help manage a firm or part of a firm &mdash; an inventory management and planning system, or student enrollment management.",
        "TPS data are sorted and organized to support managerial decision making, and the MIS is the most common system doing that work.",
        "The question changes from &ldquo;what happened just now?&rdquo; to &ldquo;what has been happening across my whole area, and what should I change?&rdquo;",
        "Alongside it sits the <b>functional area information system</b>, which supports the activities within one specific functional area of the firm &mdash; a planning system for personnel training and work assignments, for instance."
      ]
    },
    {
      id: "exec",
      name: "Analysis level",
      site: "The people modeling a choice before the company commits to it",
      boxes: [
        {c: "a", t: "Decision support system", w: "Models a specific choice"},
        {c: "b", t: "Business intelligence system", w: "Analyzes Big Data"},
        {c: "c", t: "Intelligent system", w: "Emulates human capability"}
      ],
      points: [
        "A <b>decision support system</b> provides analysis tools and access to databases to support quantitative decision making &mdash; product demand forecasting, or loan and investment analysis.",
        "A <b>business intelligence system</b> analyzes Big Data to better understand various aspects of a business, using online analytical processing (OLAP) and data visualization.",
        "An <b>intelligent system</b> emulates or enhances human capabilities: analyzing bank loan applications, self-driving cars, Siri, Alexa, ChatGPT, Gemini.",
        "Modern systems are built to present integrated data to busy decision makers along with the tools to manipulate and analyze those data."
      ]
    },
    {
      id: "span",
      name: "Systems that span every level",
      site: "Enterprise systems that refuse to sit on one floor",
      boxes: [
        {c: "a", t: "ERP", w: "Integrates all facets of the business"},
        {c: "b", t: "CRM", w: "Firm to customer"},
        {c: "c", t: "SCM", w: "Suppliers to production to delivery"},
        {c: "d", t: "E-commerce", w: "Selling from the firm&rsquo;s website"}
      ],
      points: [
        "<b>Enterprise resource planning</b> supports and integrates all facets of the business, including planning, manufacturing, sales, and marketing, so it touches the clerk and the chief executive on the same day.",
        "<b>Customer relationship management</b> supports interaction between the firm and its customers, through things like sales force automation and lead generation.",
        "<b>Supply chain management</b> supports the coordination of suppliers, product or service production, and distribution &mdash; procurement planning is the everyday example.",
        "These three cannot be filed under one category, which is exactly the point: many organizations replaced stand-alone systems with enterprise systems that span the whole organization."
      ]
    }
  ]
};

ACT.orgMatch = {
  kind: "match",
  label: "Match",
  title: "System type to the job it does",
  how: "Pair each category of information system with the purpose it serves inside an organization.",
  objective: "1.2",
  pairs: [
    {l: "Transaction processing system", r: "Processes day-to-day business event data at the operational level of the organization", why: "The checkout register that scans bar codes is the standard example, and the data it captures feed nearly every other system."},
    {l: "Decision support system", r: "Provides analysis tools and access to databases to support quantitative decision making", why: "Product demand forecasting and loan or investment analysis are the sample applications: numbers in, modeled answer out."},
    {l: "Knowledge management system", r: "Enables the generation, storage, sharing, and management of knowledge assets", why: "The everyday form is a knowledge portal where people find answers to common questions instead of asking a colleague again."},
    {l: "Geographic information system", r: "Creates, stores, analyzes, and manages geographically referenced data", why: "Data with a location attached behaves differently from ordinary data, which is why route planning gets its own category."},
    {l: "Customer relationship management", r: "Supports interaction between the firm and its customers", why: "Sales force automation and lead generation live here; the direction of travel is outward, from the firm to the buyer."},
    {l: "Supply chain management", r: "Supports the coordination of suppliers, product or service production, and distribution", why: "This one points the other way, upstream toward the people who supply the firm, with procurement planning as the sample application."},
    {l: "Office automation system", r: "Supports a wide range of predefined day-to-day work activities of individuals and small groups", why: "Word processing, spreadsheets, presentation software, and an email client are personal productivity tools, not enterprise systems."},
    {l: "Electronic commerce system", r: "Enables customers to buy goods and services from a firm&rsquo;s website", why: "Amazon, eBay, and Nordstrom.com are the named examples; the system exists to complete a purchase, not to analyze one."}
  ]
};

ACT.orgQuiz1 = {
  kind: "quiz",
  label: "Check yourself",
  title: "Naming the right class of system",
  how: "Four options, one best answer; read every explanation, including the ones for answers you did not choose.",
  objective: "1.2",
  questions: [
    {
      q: "A grocery store&rsquo;s checkout lane scans bar codes as items are rung up, and the register is connected to the store network. Which category of information system is that register?",
      opts: [
        "A management information system, because the store uses the register data to manage the store",
        "A transaction processing system, because it processes day-to-day business event data at the operational level",
        "A business intelligence system, because the scanned data are later analyzed for product trends",
        "An office automation system, because it is a predefined day-to-day work activity performed by one employee"
      ],
      a: 1,
      why: [
        "A management information system produces detailed information to help manage a firm or part of a firm, such as an inventory management and planning system. It consumes the register&rsquo;s data; it is not the register. Change the question to &lsquo;which system tells the manager what to reorder?&rsquo; and this becomes correct.",
        "Correct. The register captures a business event as it happens at the operational level, which is the definition of a transaction processing system. The coupons printed on the back of the receipt are a bonus built on that same captured data.",
        "A business intelligence system analyzes Big Data to better understand aspects of the business, using tools like OLAP and data visualization. That analysis happens downstream, on data the TPS generated. This would be right if the question described the analytics team studying years of scanner data.",
        "An office automation system is personal productivity software &mdash; word processor, spreadsheet, presentation software, email client &mdash; supporting an individual&rsquo;s or small group&rsquo;s own work activities. A cashier ringing up a customer is processing a company transaction, not doing personal desk work."
      ]
    },
    {
      q: "A classmate says: &ldquo;Categories like TPS and DSS are obsolete. Nobody uses those labels anymore.&rdquo; What is the accurate correction?",
      opts: [
        "They are right: organizations replaced categorized systems with enterprise systems, so the labels no longer describe anything real",
        "The labels are exact if you go by a product&rsquo;s main feature, so a modern system still belongs in a single row of the table",
        "The labels still name the goals, features, and functions a system delivers, even though one modern system usually spans several of them",
        "The labels described systems a company housed itself; cloud systems are described instead by the vendor and the subscription plan"
      ],
      a: 2,
      why: [
        "Enterprise systems that span the organization did replace many stand-alone systems, which is why it is hard to say a system fits only one category. But the categories did not stop describing the work; they stopped being mutually exclusive. This would be right only if the categories had been abandoned, and they have not.",
        "This is the opposite error. Ten to 15 years ago it was typical to see systems that fell cleanly into one category, but internetworking and systems integration ended that: customer relationship management, supply chain management, and enterprise resource planning carry so many features and data types that no single row holds them. Naming a main feature hides the other jobs the system is doing.",
        "Correct. Understanding the categories lets you see the myriad approaches, goals, features, and functions of modern systems, even though modern systems tend to span several categories at once.",
        "Where a system runs and what job it does are separate questions. Many systems are no longer housed within organizations but sit in the cloud and are reached through a browser when needed, and they still process transactions, support decisions, or manage customer relationships. Hosting changes who maintains the servers, not the category of work."
      ]
    },
    {
      q: "An analytics team wants to study several years of purchase history to understand emerging product trends. Where do those data come from, and which class of system does the analysis?",
      opts: [
        "Managers type the monthly figures in by hand, and a management information system does the analysis",
        "The data are generated by transaction processing systems and analyzed by a business intelligence system",
        "The data come from the company&rsquo;s office automation software, and a collaboration system does the analysis",
        "The data come from the company&rsquo;s e-commerce website, and a customer relationship management system does the analysis"
      ],
      a: 1,
      why: [
        "Managers do read MIS output, but they are not the data source. Transaction processing systems generate the raw event data automatically as business happens, which is why the volume is large enough to be worth analyzing at all.",
        "Correct. A TPS generates a tremendous amount of data as it processes transactions &mdash; Amazon feeds thousands of transactions per hour into large data warehouses &mdash; and a business intelligence system analyzes that Big Data to better understand the business.",
        "Office automation software is word processing, spreadsheets, presentations, and email for individuals and small groups, and a collaboration system provides email, shared calendars, and threaded discussions. Neither one is where years of company purchase data live.",
        "An e-commerce system is a real source of transaction data, but a firm with physical stores captures far more at the register, and CRM supports interaction with customers rather than large-scale trend analysis. This would be closer for a purely online retailer studying its own customer relationships."
      ]
    }
  ]
};

ACT.orgPick = {
  kind: "sim",
  label: "Decide",
  title: "Choosing the right system for the problem in front of you",
  how: "You are the new operations manager at a 16-store regional grocery chain; pick the class of system that actually solves each problem.",
  objective: "1.2",
  intro: "Leadership has money to spend and a list of complaints. Your job is not to name a vendor &mdash; it is to name the kind of system each complaint calls for.",
  steps: [
    {
      situation: "Checkout is slow and every store rings sales on a standalone register that never talks to the network, so nobody outside the store knows what sold today.",
      opts: [
        {t: "Install networked checkout registers that scan bar codes and record each sale &mdash; a transaction processing system", ok: true, out: "Right. This processes day-to-day business event data at the operational level, and it fixes the deeper problem: the chain finally has a record of what actually happened, which every other system will need."},
        {t: "Buy a business intelligence system so leadership can analyze store performance", ok: false, out: "A business intelligence system analyzes Big Data to understand the business &mdash; but there is no Big Data yet. Nothing is capturing the transactions. You would be buying a telescope before there is anything in the sky."},
        {t: "Give each store manager spreadsheet and email software to track daily sales", ok: false, out: "That is office automation: personal productivity software supporting one person&rsquo;s day-to-day work. It would produce 22 hand-typed, inconsistent files instead of one automatic, reliable stream of transaction data."}
      ]
    },
    {
      situation: "Transactions are now captured, but the regional manager still cannot tell which stores are about to run out of which products until a shelf is already empty.",
      opts: [
        {t: "Add an inventory management and planning system that turns the transaction data into detailed stock reports &mdash; a management information system", ok: true, out: "Right. A management information system produces detailed information to help manage a firm or part of a firm, and inventory management and planning is its textbook application. The raw events become something a manager can act on."},
        {t: "Launch an e-commerce site so customers can order out-of-stock items online", ok: false, out: "An electronic commerce system enables customers to buy goods and services from the firm&rsquo;s website. Useful someday, but it does not tell your manager what is running low &mdash; it just moves the empty shelf online."},
        {t: "Roll out a collaboration system so store managers can email each other about shortages", ok: false, out: "A collaboration system enables people to communicate, collaborate, and coordinate &mdash; email with a shared calendar. It helps them talk about the problem; it does not produce the detailed stock information they would be talking about."}
      ]
    },
    {
      situation: "Finance must decide whether to borrow money to build a 23rd store, and wants to model demand and repayment under three different economic scenarios before committing.",
      opts: [
        {t: "Give finance analysis tools and database access so they can model the forecast &mdash; a decision support system", ok: true, out: "Right. A decision support system provides analysis tools and access to databases to support quantitative decision making; product demand forecasting and loan and investment analysis are exactly its sample applications."},
        {t: "Pull the answer out of the transaction processing system, since it holds all the sales data", ok: false, out: "The TPS holds the raw record of what already happened, and it is the input you need &mdash; but it processes events, it does not model futures. Data alone is not a forecast."},
        {t: "Search the company knowledge portal for what the firm did last time it expanded", ok: false, out: "A knowledge management system enables the generation, storage, sharing, and management of knowledge assets, so a portal of past answers is genuinely useful context. It just cannot run three quantitative scenarios against current demand data."}
      ]
    },
    {
      situation: "Suppliers keep shipping late, two trucks arrive at the same dock at once, and produce spoils while a store two towns over has none.",
      opts: [
        {t: "Put in a system that coordinates suppliers, production, and distribution, starting with procurement planning &mdash; supply chain management", ok: true, out: "Right. Supply chain management supports the coordination of suppliers, product or service production, and distribution. The problem is upstream of the customer, so the system has to be upstream too."},
        {t: "Deploy customer relationship management so shoppers get told when produce is unavailable", ok: false, out: "CRM supports interaction between the firm and its customers &mdash; sales force automation, lead generation. It points downstream, toward the buyer. It would communicate the failure rather than prevent it."},
        {t: "Deploy a geographic information system to plan better delivery routes", ok: false, out: "A geographic information system creates, stores, analyzes, and manages geographically referenced data, and route planning is its sample application, so this genuinely helps a truck get somewhere efficiently. It still does not coordinate suppliers, procurement, and distribution as a whole."}
      ]
    }
  ]
};

ACT.orgQuiz2 = {
  kind: "quiz",
  label: "Check yourself",
  title: "The IS function, and what it costs us",
  how: "Three questions on how technology staff are organized inside a firm and on the human side of being always connected.",
  objective: "1.2",
  questions: [
    {
      q: "Which description matches the service-oriented mindset that replaced the old-school IS department?",
      opts: [
        "IS personnel own and control the computing resources and tell users what they may and may not do with them",
        "IS personnel act as consultants, seek user input before complaints arrive, and run help desks, hotlines, and training centers",
        "IS personnel step back entirely, so each business unit buys and runs whatever technology it wants with no central coordination",
        "IS personnel wait for users to bring in systems complaints, then work through that queue in the order the complaints arrived"
      ],
      a: 1,
      why: [
        "This is the old-school mindset precisely: IS believed it owned the computing resources and knew better than users. It came bundled with huge backlogs and systems that were over budget, late, and hard to use. It is what the service orientation replaced.",
        "Correct. Personnel in many IS units took on a consulting relationship with users, reaching out proactively, modifying systems quickly, and building help desks, hotlines, information centers, and training centers to support them.",
        "Serving users is not the same as abandoning coordination. Even organizations that decentralize technology decisions still need centralized or centrally coordinated staff for economies of scale, systems integration, and enterprise networking.",
        "This is the reactive posture the service orientation replaced. Service-oriented units reach out to their internal customers and proactively seek their input and needs rather than waiting for customers to come in with complaints, and they modify systems at a moment&rsquo;s notice to meet a need. Working a complaint queue in arrival order is how the old project backlogs grew."
      ]
    },
    {
      q: "Firms increasingly place systems people inside business units with a desk, a phone, and a dual-reporting relationship. Why do they still keep centralized IS staff as well?",
      opts: [
        "Because business units are not permitted to make technology decisions of their own",
        "Because a central group costs less than embedded staff, so firms are gradually ending the embedded arrangement",
        "Because centralization delivers the flexibility, adaptability, and responsiveness that decentralization cannot",
        "Because centralization preserves coordination, economies of scale, compatibility, and connectivity across the whole firm"
      ],
      a: 3,
      why: [
        "Business units make plenty of technology decisions &mdash; that is the whole point of decentralizing and of embedding systems staff alongside users. The tension is about coordination, not permission.",
        "Cost is not the driver described, and the embedded arrangement is expanding rather than ending: systems personnel are often permanently placed in the business unit, frequently with training in both IS and the functional area they support.",
        "This swaps the two lists. Flexibility, adaptability, and systems responsiveness are the benefits of decentralization. Centralization buys something different, which is why firms want both at once.",
        "Correct. Organizations want decentralization&rsquo;s flexibility, adaptability, and responsiveness, but they will not forgo centralization&rsquo;s coordination, economies of scale, compatibility, and connectivity &mdash; so they keep a centrally coordinated IS staff."
      ]
    },
    {
      q: "Which statement matches the evidence in the technology-addiction discussion above?",
      opts: [
        "Average adults consume more than 11 hours of media a day, and the average human attention span has fallen from 12 seconds to 8",
        "Half of 18- to 24-year-olds open social media more than ten times a day, and a third of 25- to 34-year-olds check their phone on waking",
        "The dopamine released by a like or a status update works through a different mechanism than addictive drugs do",
        "Younger generations are the group least able to adjust, precisely because they have been immersed in technology their whole lives"
      ],
      a: 0,
      why: [
        "Correct. Both figures are reported: more than 11 hours of media consumption a day for the average adult, and an attention span that dropped from 12 seconds at the turn of the century to 8 &mdash; less than a goldfish.",
        "The two age groups and the two behaviors are swapped. Fifty percent of 18- to 24-year-olds checked their phone within five minutes of waking up, and a third of 25- to 34-year-olds visited social media sites or used mobile apps more than ten times a day.",
        "The argument is the opposite: dopamine is released when we are stimulated, and the hit from a like, a status update, or a piece of gossip can have the same addicting effect on the body as drugs like cocaine or heroin.",
        "This inverts the one hopeful note. Because younger generations have been immersed in the technology their entire lives, they may be better able to adjust and adapt, developing a feel for their limits &mdash; even though a majority of adolescents already claim to be addicted."
      ]
    }
  ]
};
