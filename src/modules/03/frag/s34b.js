/* ===== s34b ===== */
PROSE.s34b = `
<span class="eyebrow">Section 3&ndash;4b</span>
<h2>Service models and kinds of cloud</h2>
<p class="lede">&ldquo;We moved to the cloud&rdquo; describes two decisions. The first is how much of the machinery you hand over. The second is whose building it sits in, and who else is renting beside you.</p>

<h3>Renting covers three very different deals</h3>
<p>You could rent a bare plot and build on it, rent an empty flat where the wiring is somebody else&rsquo;s problem, or take a hotel room.</p>
<p>All three are renting. What separates them is how much work is already done and how much you may still change. Cloud computing divides on that line, into three <b>service models</b>.</p>
<ul class="keys">
<li><b>Infrastructure as a service</b> &mdash; you manage the operating system and everything above it, licences included; the provider stops at hardware.</li>
<li><b>Platform as a service</b> &mdash; you manage your application and nothing beneath; the operating system, web server and database engine arrive running.</li>
<li><b>Software as a service</b> &mdash; you manage settings and data, because even the application is maintained by somebody else.</li>
</ul>

<h3>Infrastructure as a service</h3>
<p>In <b>infrastructure as a service</b>, or IaaS, only processing, storage and networking are provided. You choose the operating system, configure it, and track your own licences. It gives the most control and leaves the most work, so setup costs are high.</p>
<p>The chapter&rsquo;s example is Amazon Web Services, where a customer picks computing power, memory, operating system and storage. Netflix moved there to convert films into the formats different devices need.</p>

<h3>Platform as a service</h3>
<p>In <b>platform as a service</b>, or PaaS, customers run their own applications, built with the provider&rsquo;s tools, with limited control beneath. The operating system, web server, database management system and tools arrive installed and updated, so no licences are bought for them. The example is Microsoft Azure.</p>

<div class="callout info"><p><b>Serverless computing</b> goes further. On a platform such as AWS Lambda the customer supplies small functions that assemble into an application; the service manages and scales the platform, charging for the time those functions run. The servers have not gone anywhere &mdash; the customer never meets one.</p></div>

<h3>Software as a service</h3>
<p>In <b>software as a service</b>, or SaaS, the customer uses only applications delivered over a cloud infrastructure: no machine to choose, no operating system to patch, limited settings to configure.</p>
<p>You used it today: email such as Gmail, storage such as Dropbox, collaboration such as Slack and Zoom, suites such as Google Docs, business applications such as Salesforce. It deploys most easily, and the price is configurability.</p>
<p>Sort real arrangements into the three models.</p>

<div class="activity" data-activity="svcSort"></div>

<h3>The line that decides everything</h3>
<p>Learners go wrong memorizing which brand belongs to which model; brands move, and providers sell all three. The durable test is <b>what do my people still look after on Monday morning?</b> Three things catch people out.</p>
<ul class="keys">
<li><b>No rung takes away your data or decisions</b> &mdash; which records exist, who may see them and what they mean is still your problem.</li>
<li><b>Higher is not better</b> &mdash; less work and less control, and which matters depends on whether the thing is distinctive work or plumbing.</li>
<li><b>An organization sits on several rungs</b> &mdash; finished applications for office work, a platform for developers, raw machines for one awkward package.</li>
</ul>
<p class="takeaway">Handing over a layer hands over the labour of running it and the freedom to change it in one movement. You cannot take one half without the other.</p>

<div class="activity" data-activity="svcMatch"></div>

<p>Are the three separate in your mind?</p>

<div class="activity" data-activity="svcQuiz1"></div>

<h3>Public, private, and the mixture most organizations reach</h3>
<p>The second decision is whose cloud it is. One word underneath needs defining: <b>scalability</b> is the ability to adapt to increases or decreases in demand for processing or data storage &mdash; a promise to test, not to assume from the word &ldquo;cloud&rdquo;.</p>
<ul class="keys">
<li><b>Public cloud</b> &mdash; services any party can use pay-per-use, suiting work that must scale fast and firms without capital or staff.</li>
<li><b>Private cloud</b> &mdash; internal to one organization, still self-service from a shared pool and billed to departments, but under its own control.</li>
<li><b>Hybrid cloud</b> &mdash; some applications in-house and others public, where firms arrive once they stop seeking a single answer.</li>
</ul>
<p>The private cloud is most often misunderstood. It balances supply and demand across departments and gives control, but does not free the organization from managing a cloud infrastructure: somebody still owns the building, power and machines, and it is you.</p>
<p>Private buys control and pays in money and effort; public buys speed and pays in standardization. Four signals say which an application belongs in.</p>
<ul class="keys">
<li><b>Demand that swings hard without warning</b> &mdash; points public, because capacity that grows and shrinks in minutes is what pooled rented equipment does.</li>
<li><b>A rule about where data may sit</b> &mdash; points private, because policy or an industry duty may require records on your own machines.</li>
<li><b>No capital and no technical staff</b> &mdash; points public, since a private cloud is equipment bought up front and then run.</li>
<li><b>Equipment already bought and idle</b> &mdash; points private, because pooling what you own recovers value paid for.</li>
</ul>

<div class="activity" data-activity="svcQuiz2"></div>

<h3>Two choices, taken together</h3>
<p>A service model says how far up the stack somebody else is responsible; a kind of cloud says whose machines those are. They are independent, so a firm can rent applications publicly and still run a platform in its own building.</p>
<p>No single provider meets every need, so firms partner with several. Ask three questions of one application at a time: what must we still change, is this distinctive work or plumbing, and where may this data sit?</p>

<div class="activity" data-activity="svcSim"></div>
`;

ACT.svcSort = {
  kind: "sort",
  label: "Sort",
  title: "Which service model is this?",
  how: "Place each arrangement under the service model it describes, then read why it belongs there. Some are the chapter&rsquo;s own examples; the ones marked as practice situations are hypothetical and no real organization is being described.",
  objective: "3.4",
  buckets: [
    {id: "iaas", name: "Infrastructure as a service", hint: "Processing, storage and networking are provided; the customer chooses the operating system and manages everything above it, licences included"},
    {id: "paas", name: "Platform as a service", hint: "The operating system, web server, database engine and tools arrive running; the customer controls its own application and little else"},
    {id: "saas", name: "Software as a service", hint: "The customer uses only the finished application, with no control over the infrastructure and limited ability to configure it"}
  ],
  items: [
    {t: "A streaming company rents raw computing capacity, chooses the operating systems that run on it, and uses it to convert films into the many formats different devices need.", b: "iaas", why: "This is the chapter&rsquo;s Netflix example. Only processing, storage and networking were bought; every layer above them, starting with the operating system, is still the company&rsquo;s own responsibility."},
    {t: "A customer selects computing power, memory, operating system and storage from a provider&rsquo;s control panel and builds most of its infrastructure there rather than in a room of its own.", b: "iaas", why: "Choosing the operating system is the giveaway. That choice exists in exactly one model, because in the other two the provider has already made it and will not let the customer change it."},
    {t: "A practice situation: a hypothetical architecture firm needs one licensed design package that runs on a specific older operating system, and needs control of the machine image it sits on.", b: "iaas", why: "A requirement about the operating system itself can be met only where the customer still chooses it, and the licence for the design package stays the firm&rsquo;s to manage in this model."},
    {t: "A team deploys software its own developers wrote onto a rented platform built with the provider&rsquo;s tools, and nobody on the team has ever installed or patched a database engine.", b: "paas", why: "The customer controls the application and has limited or no control over the infrastructure underneath, and the provider manages the functioning and the updating of the platform. That is the definition."},
    {t: "Small, specific functions are run by the provider on demand, assembled into an application, and billed for the time they actually run, with no machine ever set up by the customer.", b: "paas", why: "This is serverless computing, which the chapter presents as a current trend within the platform model: the platform is still provided, and the customer has simply stopped seeing even the machine."},
    {t: "A practice situation: a hypothetical charity has two developers who wrote a booking application, and wants the provider to keep the web server and database engine current while the booking rules stay the charity&rsquo;s own.", b: "paas", why: "The booking rules are the application, which the charity keeps; the web server and database management system are the platform, which the provider runs. The line falls exactly where the platform model draws it."},
    {t: "Staff open a web-based email service through a browser, and nobody in the building has ever installed, patched or updated a mail server.", b: "saas", why: "The chapter names web-based email as its first example of the model. The customer uses only the application and has no knowledge of or control over the infrastructure beneath it."},
    {t: "A firm keeps shared documents in a hosted storage service and sends large files through a hosted transfer service, having bought no equipment for either.", b: "saas", why: "Document storage services are among the chapter&rsquo;s own examples of the model, and nothing about the arrangement gives the firm a machine, an operating system or a platform to look after."},
    {t: "A practice situation: a hypothetical sales team logs in to a hosted customer-records application, can rename fields and add users, but cannot change how the application works.", b: "saas", why: "Limited ability to control or configure application-specific settings is precisely what the chapter says distinguishes this model. The team manages its settings and its data, and nothing else."}
  ]
};

ACT.svcMatch = {
  kind: "match",
  label: "Match",
  title: "The responsibility ladder",
  how: "Pair each arrangement with the honest description of what your own organization is still responsible for under it.",
  objective: "3.4",
  pairs: [
    {l: "Owning the infrastructure outright", r: "You look after every layer, from the electricity and the cooling up to the application your staff log in to", why: "With no provider anywhere in the picture, the facility, the hardware, the operating system, the platform, the application and the data are all in-house work, which is the arrangement objective 3.3 spent two sections describing the cost of."},
    {l: "Infrastructure as a service", r: "You manage the operating system and everything above it, licences included, while the provider stops at the hardware", why: "Only the basic capabilities of processing, storage and networking are provided, so the customer has the most control over the resources &mdash; and managing software licences remains the customer&rsquo;s responsibility."},
    {l: "Platform as a service", r: "You manage your own application and nothing beneath it, because the operating system, web server and database engine are the provider&rsquo;s to run and update", why: "The customer runs its own applications, typically designed with the provider&rsquo;s tools, and has limited or no control over the underlying infrastructure; platform licences and platform updates both move to the provider."},
    {l: "Software as a service", r: "You manage your settings and your data, and nothing else, because the application itself is maintained and updated for you", why: "The customer uses only the application, has no knowledge of or control over the infrastructure, and typically has only a limited ability to configure application-specific settings. It is the easiest model to deploy for exactly that reason."},
    {l: "Serverless computing", r: "You supply individual functions and never set up a machine at all, and you are charged for the time those functions actually run", why: "The chapter presents this as a new trend designed to free users from having to set up virtual machines: the service takes care of all management of the underlying platform and enables continuous scaling, billed by usage time."}
  ]
};

ACT.svcQuiz1 = {
  kind: "quiz",
  label: "Check yourself",
  title: "Telling the three service models apart",
  how: "Four options, one best answer; read every explanation, including the ones for options you did not choose.",
  objective: "3.4",
  questions: [
    {
      q: "A hypothetical logistics firm rents computing capacity, installs an operating system of its own choosing on it, and runs its warehouse software on top. It is surprised to find it must still account for the operating system licences. Which model is this, and is the surprise justified?",
      opts: [
        "Platform as a service, and the surprise is justified, because the provider supplies the platform and should therefore supply the licences that come with it",
        "Infrastructure as a service, and the surprise is not justified, because only processing, storage and networking are provided",
        "Software as a service, and the surprise is justified, because a rented application should arrive with everything it needs to run already paid for",
        "Infrastructure as a service, and the surprise is justified, because renting hardware from a provider transfers the cost of anything installed on that hardware to the provider"
      ],
      a: 1,
      why: [
        "The platform model does remove platform licences, which is what makes this tempting, but the firm chose and installed its own operating system. That choice does not exist in the platform model, where the operating system arrives already running.",
        "Correct. In infrastructure as a service only the basic capabilities of processing, storage and networking are provided, the customer therefore has the most control over the resources, and managing software licences is still the responsibility of the customer.",
        "Nothing here resembles software as a service. The firm is running its own warehouse software on an operating system it selected, which means it is managing layers that this model would have removed entirely.",
        "The model is identified correctly, and this is the closest wrong answer for that reason. The reasoning fails: renting a machine buys you the machine, not permission to run licensed software on it, and the chapter says so explicitly."
      ]
    },
    {
      q: "A hypothetical insurer wants its own developers&rsquo; software running in production without anyone on staff installing or patching an operating system or a database engine, and without buying licences for either. Which model does the chapter describe for this?",
      opts: [
        "Infrastructure as a service, because the insurer is running software it wrote itself and therefore needs the greatest possible control over the resources",
        "Software as a service, because the insurer wants an application to run without maintaining anything, which is what this model exists to provide",
        "Platform as a service, because the provider supplies the operating system, web server and database management system",
        "A private cloud, because software written in-house has to run on infrastructure the organization owns and controls itself"
      ],
      a: 2,
      why: [
        "This model gives the most control, but control is not what the insurer asked for. It asked to stop looking after operating systems and database engines, and that is exactly the work this model leaves with the customer.",
        "The insurer does want to maintain nothing, which makes this look right, but the application is its own. Software as a service supplies the provider&rsquo;s application, so there would be nowhere for the insurer&rsquo;s code to run.",
        "Correct. Customers run their own applications on tools the provider supplies, they have control over the applications but limited or no control over the underlying infrastructure, and they avoid buying licences for the web servers&rsquo; operating systems or the database management systems.",
        "A private cloud is an answer to a different question, about whose machines these are rather than how much of the stack is provided. Software written in-house can run perfectly well on rented capacity, and often does."
      ]
    },
    {
      q: "Why does the chapter describe software as a service as typically the easiest model to deploy, and what does that ease cost the customer?",
      opts: [
        "It is easiest because the customer maintains and updates nothing at all, and the cost is configurability, since what can be adjusted in the application is typically limited",
        "It is easiest because it is the cheapest of the three models, and the cost is reliability, since a shared application is more likely to fail than one the customer runs itself",
        "It is easiest because the customer keeps control of the operating system, and the cost is the licences, which the customer must continue to purchase",
        "It is easiest because it removes the need to keep any data at all, and the cost is that reports have to be requested from the provider each time"
      ],
      a: 0,
      why: [
        "Correct. The customer does not have to worry about maintaining or updating the software, the underlying platform or the hardware infrastructure, and typically has only limited ability to control or configure application-specific settings.",
        "Cost is a separate question the chapter treats under evaluating providers, and it does not rank the models by price. Nor does it claim that a shared application fails more often; availability is a criterion to examine, not a property of the model.",
        "This describes infrastructure as a service, where the customer does keep the operating system and its licences. In software as a service there is no operating system in the customer&rsquo;s hands to keep.",
        "The data is emphatically still the customer&rsquo;s, and the model changes nothing about which records exist or what they mean. Only settings and data remain the customer&rsquo;s to manage, which is a small list but not an empty one."
      ]
    }
  ]
};

ACT.svcQuiz2 = {
  kind: "quiz",
  label: "Check yourself",
  title: "Public, private, and what each one really buys",
  how: "Four options, one best answer; every explanation is worth reading, because the wrong answers here are the ones people act on.",
  objective: "3.4",
  questions: [
    {
      q: "A hypothetical local charity has no capital to spend on equipment and no technical staff, but needs a service that can grow quickly if a campaign succeeds. Which kind of cloud does the chapter point to, and why?",
      opts: [
        "A private cloud, because a charity handling donor details needs the control and privacy that only its own machines can provide",
        "Neither kind, because a charity of that size should buy a single server outright and avoid a recurring bill altogether",
        "A hybrid arrangement, because splitting the work between owned and rented capacity is the safest starting position for an organization with no experience",
        "A public cloud, because its services can be used by any interested party on a pay-per-use basis and it suits applications that need rapid scalability"
      ],
      a: 3,
      why: [
        "A private cloud does give a high degree of control and privacy, but it does not free an organization from managing an infrastructure &mdash; and this charity has neither the capital to build one nor the staff to run it.",
        "Buying a server outright is the arrangement with the largest capital cost and the least ability to grow, which is the opposite of what a campaign that may or may not succeed calls for.",
        "Hybrid is what many organizations settle on, which is why this sounds sensible, but it means running both arrangements at once. An organization with no technical staff has taken on the harder half rather than avoided it.",
        "Correct. Services in a public cloud can be used by any interested party on a pay-per-use basis, and the chapter recommends it for applications needing rapid scalability and for organizations with insufficient capital or other resources to build or expand an infrastructure."
      ]
    },
    {
      q: "A hypothetical manufacturer builds a private cloud so its departments can provision servers from a shared internal pool in minutes. Its finance director expects the infrastructure management work to disappear. What does the chapter say?",
      opts: [
        "The expectation is wrong: a private cloud still leaves the organization managing the infrastructure, though it does give real customizability and control",
        "The expectation is right, because self-service provisioning and a utility billing model are what define a cloud, and both remove the underlying management work",
        "The expectation is right for the machines but wrong for the network, since networking is the one layer a private cloud cannot pool across departments",
        "The expectation is wrong, because a private cloud is simply a public cloud with a contract that restricts who else may use the same equipment"
      ],
      a: 0,
      why: [
        "Correct. The chapter is explicit that a private cloud provides self-service access on a utility computing model but does not free the organization from the issues of managing the infrastructure; what it buys is customizability, flexibility and control over its data and applications.",
        "Self-service access and metered billing are genuinely present in a private cloud, which is what makes the reasoning attractive. They change who requests capacity and how it is charged internally, not who has to keep the equipment running.",
        "Networking is not a special case here, and a private cloud can pool network resources like any other. The management work that remains covers every layer the organization still owns, not one of them.",
        "This confuses the two kinds. A private cloud is internal to the organization and owned by the client; the public cloud is owned by the service provider and open to any interested party on a pay-per-use basis."
      ]
    },
    {
      q: "What does the chapter mean by scalability, and what follows from that definition when choosing a provider?",
      opts: [
        "The number of machines a provider owns, which follows directly from how large the provider is, so the largest provider is the appropriate choice",
        "The speed at which data can be moved from one provider to another, so the organization should choose whichever provider transfers data fastest",
        "The ability to adapt to increases or decreases in demand for processing or data storage",
        "The ability of an application to serve users in more than one country, so it matters to international organizations and not to local ones"
      ],
      a: 2,
      why: [
        "Provider size is not the definition, and it is a poor proxy for the thing that matters. What an organization needs to know is whether capacity moves with its own demand, which is a question about the service it is buying.",
        "That is closer to openness, which the chapter treats separately as a question about moving between providers and the cost of transferring large volumes out. It is a real criterion, but it is not this one.",
        "Correct. The chapter defines scalability as the ability to adapt to increases or decreases in demand for processing or data storage, and because it is claimed rather than guaranteed it belongs on the list of things a customer examines about a provider.",
        "Serving several countries is a matter of where resources are located and which rules apply to them, which the chapter treats under resource pooling and under compliance. Scalability is about volume of demand, not geography."
      ]
    }
  ]
};

ACT.svcSim = {
  kind: "sim",
  label: "Decide",
  title: "Choosing a model and a kind, one application at a time",
  how: "Work the four decisions in order, and after each one read every outcome before moving on, including the ones you did not choose.",
  objective: "3.4",
  intro: "Four hypothetical practice situations, invented for this exercise; no real organization is described in any of them. In each case ask the three questions from the section: what must we still be able to change, is this work distinctive or is it plumbing, and where is this data allowed to sit.",
  steps: [
    {
      situation: "A hypothetical veterinary group with six clinics needs email, shared documents and video meetings for its staff. It employs nobody technical, and none of this work is what makes the group different from any other veterinary practice. What should it rent?",
      opts: [
        {t: "Infrastructure as a service: rent machines and install mail, file and meeting software on them.", ok: false, out: "This would work and it would be a poor use of the group&rsquo;s money. Renting at this level leaves the operating system, the licences, the installation and the patching with a customer that has nobody to do any of it, in exchange for control over software that six veterinary clinics have no reason to customize."},
        {t: "Platform as a service: rent a platform and have someone build the group a mail and document system on it.", ok: false, out: "The platform model is for running an application you have and want to keep. Commissioning one that already exists in mature form, and then owning it forever, converts a solved problem into a permanent development project."},
        {t: "Software as a service: rent the finished applications rather than run them.", ok: true, out: "Right. What is left to manage is accounts, settings and the records inside them. This is plumbing rather than distinctive work, so the group should hand over as much of it as possible. Web-based email, document storage and collaboration software are three of the chapter&rsquo;s own examples of the model, and it is the easiest to deploy precisely because nothing has to be maintained or updated by the customer."},
        {t: "A private cloud: buy equipment and pool it across the six clinics so each one can provision what it needs.", ok: false, out: "A private cloud is the largest commitment on the table. It is capital expenditure, it is owned by the client, and the chapter is explicit that it does not free an organization from the work of managing the infrastructure &mdash; work this group has no one to do."}
      ]
    },
    {
      situation: "A hypothetical university research team has written its own analysis software and needs it available to collaborators. Nobody on the team wants to patch an operating system or a database engine, and the team has no licence budget. The software itself is ordinary code that any current platform can run.",
      opts: [
        {t: "Platform as a service, so the team looks after only its own application.", ok: true, out: "Right. The operating system, the web server and the database engine are all provided. The team controls its application and has limited or no control over the infrastructure underneath, which is exactly what it asked for. Because the computing platform is provided, it also avoids buying licences for the web servers&rsquo; operating systems and for the database management system, and the provider manages the platform&rsquo;s updates."},
        {t: "Infrastructure as a service, so the team can guarantee its software will run by choosing the machine and the operating system itself.", ok: false, out: "The guarantee is real, but it is being bought with the exact work the team said it would not do. Choosing the operating system means installing, configuring, patching and licensing it, which is why the chapter pairs this model&rsquo;s flexibility with relatively high setup costs."},
        {t: "Software as a service, because a research team should use an existing analysis application rather than maintaining one of its own.", ok: false, out: "That may be sound advice about research, and it is not an answer to the question asked. The team has written the software; software as a service supplies the provider&rsquo;s application, so there is nowhere in this model for the team&rsquo;s own code to live."},
        {t: "Serverless computing, because it removes machines entirely and charges only for the time functions run.", ok: false, out: "Serverless is a real option within the platform model and would suit work that arrives in short bursts. It asks the team to restructure its software into small individual functions first, which is a rewrite nobody has asked for and which the situation gives no reason to want."}
      ]
    },
    {
      situation: "A hypothetical film archive digitises old reels using a specialised package that runs only on an older operating system, and its work arrives in unpredictable bursts: nothing for a month, then thousands of hours at once. It has the licence for the package already.",
      opts: [
        {t: "Platform as a service, because the archive should let the provider handle the operating system and stop worrying about it.", ok: false, out: "That is usually good advice and here it is impossible. The platform model supplies the operating system already running and does not let the customer specify an older version, so the archive&rsquo;s one indispensable package would have nowhere to run."},
        {t: "Buy a machine outright and run it in the archive&rsquo;s own building, since the work is specialised and the software is already licensed.", ok: false, out: "Owning removes the rental bill and reintroduces every problem objective 3.3 described. Capacity would be sized for either the quiet month or the burst: idle equipment most of the year, or a queue when the reels arrive."},
        {t: "Software as a service, choosing whichever hosted digitisation application is closest to the package the archive uses today.", ok: false, out: "This throws away a licence the archive already owns and a workflow built around it, in exchange for an application it cannot configure beyond the provider&rsquo;s settings. The chapter&rsquo;s point about limited configurability is exactly the risk here."},
        {t: "Infrastructure as a service in a public cloud: rent capacity as the bursts arrive.", ok: true, out: "Right, and the archive installs the older operating system and the package on it. A requirement about the operating system itself can be met only in the model where the customer still chooses it, and the licence stays the archive&rsquo;s to manage, which it already holds. Renting publicly means the idle month costs nothing, which is the whole answer to work that arrives in bursts."}
      ]
    },
    {
      situation: "A hypothetical city transit authority runs two things: a journey planner whose traffic multiplies whenever the weather turns, and a fare-card records system holding personal details that internal rules say must stay on machines the authority controls. A board member insists on one arrangement for both.",
      opts: [
        {t: "Everything in a public cloud, since a capable provider can secure the fare-card data as well as the authority can.", ok: false, out: "The provider may well be more capable, and that is not what the constraint says. An internal rule requiring the data to stay on controlled machines is a decision about control and location, and the chapter treats where data physically sits as a genuine limit rather than a technical detail."},
        {t: "A hybrid arrangement: the journey planner on rented capacity, the fare-card records in-house.", ok: true, out: "Right. The records stay on the authority&rsquo;s own controlled infrastructure, and the chapter describes this as what organizations often choose &mdash; certain applications in-house while others move to the public cloud. There is typically no single provider that meets all of an organization&rsquo;s needs, and the two applications here are asking for opposite things: elasticity for one, control for the other."},
        {t: "Everything in a private cloud, so the authority controls both applications and can still provision capacity on demand internally.", ok: false, out: "This satisfies the fare-card rule and strands the journey planner. Internal pooling can only redistribute equipment the authority has already bought, so the weather-driven surge still has to be paid for in advance and sits idle the rest of the time."},
        {t: "Everything as rented finished applications, so neither system needs any infrastructure decision at all.", ok: false, out: "Neither system fits. The fare-card rule is about where data sits, which this model settles in the provider&rsquo;s favour, and a journey planner built around one city&rsquo;s network is distinctive work rather than something to buy off a shelf."}
      ]
    }
  ]
};
