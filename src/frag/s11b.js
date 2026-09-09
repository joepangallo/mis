/* ===== s11b ===== */
PROSE.s11b = `
<span class="eyebrow">Section 1&ndash;1b</span>
<h2>Digital density and the digital future</h2>
<p class="lede">Twenty years ago, driving to work left no record. The same drive today throws off tire pressure, engine temperature, position, and how hard you braked, poolable with a million other drivers&rsquo; readings. The activity did not change; the connected data it produces did.</p>
<p>Two conditions set that up.</p>
<ul class="keys">
<li><b>Information technologies became pervasive</b> &mdash; used throughout society rather than locked in a computer room, so the technology sits inside ordinary activity.</li>
<li><b>Innovation keeps accelerating</b> &mdash; radical innovations displace whole industries, which is how drones reached farms and film sets within a few years.</li>
</ul>
<p>The result is an exponential rise in <b>digital density</b>: the amount of connected data per unit of activity, where every unit generates more connected data and enables new value-added interactions and business models. The chapter builds it in three moves &mdash; connections, data, interactions.</p>
<div class="callout tip"><b>Read that as a ratio, not a total.</b> Not how much data exists, but how much one unit of activity produces. A cash sale of a hammer in 2004 recorded one thing: a hammer left.</div>

<div class="activity" data-activity="ddDensityDiagram"></div>

<h3>Connections: anything physical can join the digital world</h3>
<p>Connections once ran between people, organizations, or computers. Today almost any element of the physical world, <b>things</b> included, joins the digital realm. The first enabler is the mobile phone, kept within reach around the clock and, in the developing world, leapfrogging the PC entirely.</p>
<ul class="keys">
<li><b>Mobile apps</b> &mdash; companies must build these programs, each performing one well-defined function, because the customer visit moved onto the phone.</li>
<li><b>Micro-moments</b> &mdash; interaction happens less in long desktop sessions and more in the instants when someone instinctively picks up a device to buy, know, do, or go.</li>
</ul>
<p>The second enabler is the <b>Internet of Things (IoT)</b>: a network of physical objects that automatically share data over the internet &mdash; a tire with a pressure sensor, a smart meter, a cow with an injectable ID chip.</p>
<p>Sensors worn on a person are <b>wearable technologies</b> &mdash; clothing or accessories with electronics built in, such as a smartwatch, recording movement and heart rate alongside light, orientation and altitude. Logging that about yourself to improve health or performance is the <b>quantified self</b>.</p>
<p>It runs on <b>sensors</b>, devices that detect, record, and report changes in the physical environment. Cheaper sensors and better radios are why, already in 2008, more devices were connected to the internet than there were people on earth.</p>
<p>The same technology arrives under other names: <b>smart home technologies</b>, or <b>home automation</b>, and the <b>Industrial Internet of Things (IIoT)</b> in manufacturing. Open each connecting technology below and read all four facets.</p>

<div class="activity" data-activity="ddEnablers"></div>

<h3>Data: what the connections leave behind</h3>
<p>All of that generates <b>Big Data</b>: extremely large and complex datasets, defined by three characteristics.</p>
<ul class="keys">
<li><b>Volume</b> &mdash; the datasets are extremely large, because connected things report constantly rather than when asked.</li>
<li><b>Variety</b> &mdash; many types of data arrive at once, from a sensor reading to a paragraph of opinion.</li>
<li><b>Velocity</b> &mdash; data are collected and analyzed at ever-increasing rates, so the window for acting keeps shrinking.</li>
</ul>
<p>Social media added a flood of <b>unstructured</b> data, text nobody designed to fit a spreadsheet column. Storage keeps getting cheaper, so organizations hold it in the cloud and analyze it there.</p>
<p>Volume is not virtue: garbage in, garbage out. <b>Data quality</b> asks whether data are reliable enough to decide on, in five tests &mdash; completeness, accuracy, timeliness, validity, consistency.</p>
<p class="takeaway">A report built on stale readings does not fail loudly; it quietly recommends the wrong thing.</p>
<p>Three questions on connections and data.</p>

<div class="activity" data-activity="ddQuiz1"></div>

<h3>Interactions: connected data becomes a business model</h3>
<p>Connections and data together enable new value-added interactions, because value now comes from data rather than headcount: Airbnb and Nvidia create it with a fraction of the workforce GE or Ford needed.</p>
<p>Continuous sensor input paired with machine learning and <b>artificial intelligence (AI)</b>, using information technologies to simulate human intelligence, makes sense of those streams and drives <b>robotics</b>, the use of robots for manual tasks. Two patterns recur.</p>
<ul class="keys">
<li><b>The network effect</b> &mdash; a network is worth more as more people use it, which is how Uber and Airbnb disrupted established industries: riders come for drivers, drivers come for riders.</li>
<li><b>Servitization</b> &mdash; a firm shifts from selling a product to providing it as a service, so sensors let Michelin sell tires by usage and stay responsible for them.</li>
</ul>
<p class="takeaway">Data once improved efficiency; connected data now lets firms anticipate change and personalize offerings.</p>

<h3>The API economy</h3>
<p><b>APIs (application programming interfaces)</b> are intermediaries that let software components exchange data or functionality over common web protocols, so a provider opens part of itself without anyone needing to know its inner workings. Think of a power socket: a standard interface delivering electricity you use without knowing how it was made.</p>
<ul class="keys">
<li><b>Providers gain revenue and reach</b> &mdash; Stripe processes payments for companies from Target to Lyft, on infrastructure none of them built.</li>
<li><b>Users build on functionality they never wrote</b> &mdash; Lyft pulls maps from Google Maps, and when Stripe changes inside, the interface holds still.</li>
</ul>
<p>Match each term below with its definition.</p>

<div class="activity" data-activity="ddVocab"></div>

<h3>Digital density and the workforce</h3>
<p>Employees increasingly use their own devices and familiar software for work, not just for email but for enterprise systems. <b>BYOD</b> (bring your own device) worries managers over security, compliance, and support costs, though it can raise productivity and retention.</p>
<p>Innovations now reach the consumer marketplace first and organizations second: the <b>consumerization of IT</b>. Knowing how to operate a computer and common applications is <b>computer literacy</b>, which can decide whether a person is employed at all.</p>
<p><b>Computer fluency</b> goes further: independently learning new technologies as they emerge and assessing their impact. Literacy gets you in the door; fluency sets you apart later.</p>

<div class="activity" data-activity="ddQuiz2"></div>
`;

ACT.ddDensityDiagram = {
  kind: "diagram",
  label: "Interactive diagram",
  title: "One idea, four angles",
  how: "Pick a driver to redraw the diagram; each model is the same digital-density story told from a different starting point.",
  objective: "1.1",
  models: [
    {
      id: "conn",
      name: "Connections",
      site: "Anything physical can now be wired into the digital world.",
      boxes: [
        {c: "a", t: "Mobile devices", w: "Within reach 24/7"},
        {c: "b", t: "Sensors", w: "Detect, record, report"},
        {c: "c", t: "IoT and IIoT", w: "Things share data on their own"},
        {c: "d", t: "Wearables", w: "The body reports in"}
      ],
      points: [
        "The old picture connected people, organizations, or computers; the new one connects <b>things</b> too, from a tire with a pressure sensor to a cow with an injectable ID chip.",
        "Cheaper <b>sensors</b>, better chips, and wireless radios are what made connecting objects affordable instead of theoretical.",
        "Phones stay within reach around the clock, so customer contact arrives in <b>micro-moments</b> rather than long desktop sessions.",
        "On a factory floor the same idea is the <b>Industrial Internet of Things</b>, where information technology and operations technology converge."
      ]
    },
    {
      id: "data",
      name: "Data",
      site: "Every connection leaves a record behind, and records pile up fast.",
      boxes: [
        {c: "a", t: "Volume", w: "Extremely large datasets"},
        {c: "b", t: "Variety", w: "Many different types"},
        {c: "c", t: "Velocity", w: "Collected and analyzed faster"},
        {c: "d", t: "Data quality", w: "Fit to decide on?"}
      ],
      points: [
        "<b>Big Data</b> is the chapter's name for extremely large and complex datasets high in volume, variety, and velocity.",
        "Social media poured in <b>unstructured</b> data, such as opinions about a product posted on blogs and networks.",
        "Storage got cheap and moved to the <b>cloud</b>, so keeping the data is rarely the constraint; making sense of it is.",
        "More data is not better data: <b>data quality</b> means completeness, accuracy, timeliness, validity, and consistency."
      ]
    },
    {
      id: "inter",
      name: "Interactions",
      site: "Connected data becomes a different way of doing business.",
      boxes: [
        {c: "a", t: "Network effect", w: "More users, more value"},
        {c: "b", t: "APIs", w: "Use someone else's system"},
        {c: "c", t: "Servitization", w: "Sensors sell it by usage"},
        {c: "d", t: "Value from data", w: "Small headcount, large value"}
      ],
      points: [
        "The <b>network effect</b> means a network gets more valuable as more people use it, which is how Uber and Airbnb disrupted established industries.",
        "<b>APIs</b> let a company borrow functionality it never built; Lyft takes payments through Stripe and maps through Google.",
        "Sensors monitoring performance, temperature, or mileage turn a product into a service, which is how Bridgestone and Michelin can sell tires by usage while staying responsible for how the tires perform.",
        "Value now comes from data rather than headcount: digital-world firms reached the top with 2,500 to 35,000 employees."
      ]
    },
    {
      id: "work",
      name: "Workforce",
      site: "The same shift, arriving in your job description.",
      boxes: [
        {c: "a", t: "BYOD", w: "Your device, real work"},
        {c: "b", t: "Consumerization of IT", w: "Consumer first, work second"},
        {c: "c", t: "Computer literacy", w: "Use the tool you know"},
        {c: "d", t: "Computer fluency", w: "Learn the next tool"}
      ],
      points: [
        "<b>BYOD</b> means employees use personal devices for work that now reaches into customer relationship management and other enterprise systems.",
        "In the <b>consumerization of IT</b>, innovations reach shoppers first and organizations second, so managers must keep evaluating consumer technology.",
        "<b>Computer literacy</b>, knowing how to use a computer and certain applications, is now assumed rather than impressive.",
        "<b>Computer fluency</b> is independently learning new technologies as they emerge and assessing their impact on your work and life."
      ]
    }
  ]
};

ACT.ddEnablers = {
  kind: "explore",
  label: "Explore",
  title: "The technologies doing the connecting",
  how: "Open each card and read all four facets; the fourth one is the part students usually skip.",
  objective: "1.1",
  labels: ["What it is", "Where you already see it", "Why it matters", "The catch"],
  items: [
    {
      icon: "IOT",
      name: "Internet of Things",
      sub: "Connections",
      what: "A network of a broad range of physical objects that can automatically share data over the internet. The word automatically is the point: no person types the reading in.",
      real: "A tire that reports its own pressure, a smart meter your utility reads remotely, an injectable ID chip in a cow, a thermostat you adjust from a parking lot.",
      absent: "It is the reason a unit of activity generates data at all. Already in 2008, more devices were connected to the internet than there were people living on earth.",
      why: "Connecting an object is now the easy part. Analyzing the enormous, often unstructured data that results poses tremendous challenges for organizations."
    },
    {
      icon: "SEN",
      name: "Sensors",
      sub: "Connections",
      what: "Devices that can detect, record, and report changes in the physical environment, such as temperature, movement, light, moisture, or heart rate.",
      real: "Road surfaces that trigger dynamic speed limits when ice is likely, sensors reporting open parking spaces or traffic flow, soil-moisture sensors on golf courses.",
      absent: "Decreasing sensor costs, plus advances in chips and wireless radios, are what turned the Internet of Things from an idea into an affordable build.",
      why: "A sensor reports; it does not judge. A miscalibrated sensor sends confident wrong numbers downstream, which is the data-quality problem in physical form."
    },
    {
      icon: "WEAR",
      name: "Wearable technologies",
      sub: "Connections",
      what: "Clothing or accessories that incorporate electronic technologies, such as the Apple Watch, Samsung's Galaxy Watch, or the Google Pixel Watch.",
      real: "A smartwatch extending your phone by showing notifications and giving quick access to phone functions, or a Fitbit worn passively all day.",
      absent: "Their sensors record physiological data such as body movements or heart rate and environmental data such as ambient light, orientation, or altitude.",
      why: "They enable the quantified self, the logging of all aspects of daily life including moods and physiological states, which is the most personal data a system can hold."
    },
    {
      icon: "AI",
      name: "Artificial intelligence",
      sub: "Interactions",
      what: "Using information technologies to simulate human intelligence, typically working alongside machine learning algorithms.",
      real: "The software layer inside connected products: continuous sensor input paired with machine learning is what the chapter credits for advances in robotics, from self-parking cars to autonomous mining trucks.",
      absent: "Without it the streams from connected things are just volume. AI is what lets organizations anticipate changes, coordinate resources, and personalize offerings.",
      why: "Its output inherits the quality of its input. Garbage in, garbage out applies here at enormous scale and without any obvious warning sign."
    },
    {
      icon: "ROB",
      name: "Robotics",
      sub: "Interactions",
      what: "The use of robots to perform manual tasks, which the chapter treats as a direct result of sensors and AI advancing together.",
      real: "Autonomous Caterpillar mining trucks already in use, self-parking systems sold in many vehicles, self-driving cars and trucks in active testing.",
      absent: "It shows how connections and data become physical action: continuous sensor input paired with machine learning is what enables the advances.",
      why: "Machines taking over manual tasks is part of why the chapter argues that computer fluency, not one fixed skill, is what protects a career."
    },
    {
      icon: "PRNT",
      name: "3D printing",
      sub: "Digital to physical",
      what: "Creating physical three-dimensional objects from digital models by successively adding thin layers of material.",
      real: "Prototypes and manufactured parts that traditionally were drilled, cut, or milled out of a solid piece of material.",
      absent: "Traditional machining can leave up to 90 percent of a slab as scrap, while additive printing builds only the object itself.",
      why: "Better, faster, cheaper printers also make counterfeit goods quick and inexpensive to produce, deceiving buyers and causing intellectual property losses."
    }
  ]
};

ACT.ddVocab = {
  kind: "match",
  label: "Match",
  title: "The vocabulary of digital density",
  how: "Pair each term with the chapter's definition, then read the note to see what separates it from its nearest neighbor.",
  objective: "1.1",
  pairs: [
    {l: "Digital density", r: "The amount of connected data per unit of activity", why: "It is a ratio, not a total: the same trip or sale now generates far more connected data than it once did."},
    {l: "Internet of Things (IoT)", r: "A network of a broad range of physical objects that can automatically share data over the internet", why: "Automatically is the key word; a person emailing a photo is not the Internet of Things."},
    {l: "Sensors", r: "Devices that can detect, record, and report changes in the physical environment", why: "Falling sensor costs plus better chips and wireless radios are what made the Internet of Things practical."},
    {l: "Quantified self", r: "The logging of all aspects of one's daily life to improve health and performance", why: "Activity trackers such as the Fitbit are designed to be worn passively so the logging never has to be started."},
    {l: "Micro-moments", r: "The instinctive moments when a person picks up a mobile device to buy, know, do, or go", why: "They replaced the long, well-defined desktop session as the typical shape of a customer interaction."},
    {l: "Network effect", r: "The value of a network increases with the number of other users", why: "It explains why Uber and Airbnb could disrupt established industries so quickly once they had critical mass."},
    {l: "APIs", r: "Intermediaries that let different software components exchange data or functionality over common web protocols", why: "Like a power socket, an API delivers a service in a standard format without exposing how it is produced."},
    {l: "Big Data", r: "Extremely large and complex datasets of high volume, variety, and velocity", why: "Volume alone is not the definition; variety means many different types of data and velocity means data collected and analyzed at ever-increasing rates."}
  ]
};

ACT.ddQuiz1 = {
  kind: "quiz",
  label: "Check yourself",
  title: "Connections and data",
  how: "Choose the best answer, then read every explanation, including the ones for options you did not pick.",
  objective: "1.1",
  questions: [
    {
      q: "A ride-hailing trip today produces route data, driver and rider ratings, payment records, and map corrections. The same trip by taxi in 2004 produced a paper receipt. Which chapter term names that change?",
      opts: [
        "The digital divide, because the two trips rely on different levels of technology",
        "Digital density, because each unit of activity now generates far more connected data",
        "The network effect, because many more riders joined the service over those years",
        "Big Data, because a trip record is an extremely large and complex dataset"
      ],
      a: 1,
      why: [
        "The digital divide is the gap in which those with access to information systems hold great advantages over those without. It would be right for a question comparing this rider to someone with no computer access or skills at all.",
        "Correct. Digital density is the amount of connected data per unit of activity, and here the unit of activity is identical while the connected data around it multiplied.",
        "The network effect is the rise in a network's value as more users join. That is true of ride-hailing, but it describes value from many users, not how much data a single trip creates.",
        "Big Data names the datasets that result, defined by high volume, variety, and velocity. One trip's records are not Big Data; the pooled records of millions of trips are."
      ]
    },
    {
      q: "A dairy farm gives each cow an injectable ID chip that automatically uploads the animal's location and health readings. In the chapter's vocabulary, this is an example of:",
      opts: [
        "The Internet of Things, because a physical object automatically shares data over the internet",
        "The Industrial Internet of Things, because the animals are part of a production operation",
        "Wearable technology, because the chip travels on the animal all day",
        "The quantified self, because everything about the cow's day is being logged"
      ],
      a: 0,
      why: [
        "Correct. The chapter uses the cow with an injectable ID chip as one of its own examples of a thing on the Internet of Things: a physical object automatically sharing data over the internet.",
        "The Industrial Internet of Things is the chapter's term for IoT technologies used in manufacturing, where information technology converges with operations technology. Sensors on an assembly line would fit; livestock in a field does not.",
        "Wearable technologies are clothing or accessories that incorporate electronic technologies, such as an Apple Watch or a Fitbit. This option would be right if the device were worn as an accessory rather than implanted.",
        "The quantified self is a person logging all aspects of their own daily life to improve their health and performance. The defining feature is self-tracking by a person, not a farm tracking an animal."
      ]
    },
    {
      q: "Which set of characteristics does the chapter use to define Big Data?",
      opts: [
        "Completeness, accuracy, timeliness, validity, and consistency",
        "Volume, veracity, and value",
        "High volume, variety, and velocity",
        "Cloud storage, machine learning, and unstructured social media posts"
      ],
      a: 2,
      why: [
        "Those five are the chapter's definition of data quality, which is how you judge whether data are reliable enough to decide on. They describe the fitness of data, not its scale.",
        "Veracity and value appear in other popular lists of data attributes and veracity is a genuine concern, but the chapter's three characteristics are volume, variety, and velocity.",
        "Correct. Big Data is described as extremely large and complex datasets of high volume, variety (many different types of data), and velocity (collected and analyzed at ever-increasing rates).",
        "Those three are things the chapter associates with Big Data &mdash; cloud computing stores it, machine learning helps make sense of it, social posts supply unstructured input &mdash; but they are sources and tools, not the characteristics that define it."
      ]
    }
  ]
};

ACT.ddQuiz2 = {
  kind: "quiz",
  label: "Check yourself",
  title: "Interactions, APIs, and the workforce",
  how: "Choose the best answer, then read all four explanations so the near-miss options stop looking attractive.",
  objective: "1.1",
  questions: [
    {
      q: "Airbnb becomes more useful to travelers as more hosts list on it, and more useful to hosts as more travelers search it. The chapter's name for this is:",
      opts: [
        "Economies of scale, because Airbnb's cost per booking falls as the company grows",
        "The consumerization of IT, because ordinary consumers supply the rooms",
        "The network effect, because a network's value rises with the number of other users",
        "Servitization, because Airbnb provides a service rather than selling a product"
      ],
      a: 2,
      why: [
        "Economies of scale is about a company's own costs per unit falling as volume rises. That may well be true here, but it says nothing about the value each user gets from other users.",
        "The consumerization of IT is the pattern of technologies appearing in the consumer marketplace before organizations adopt them. It describes where a technology shows up first, not why a platform gains value as it fills up.",
        "Correct. The network effect is the notion that the value of a network, or of a tool or application based on a network, increases with the number of other users, and the chapter names Uber and Airbnb as examples.",
        "Servitization is the shift from selling physical products to providing them as services, as when Bridgestone and Michelin sell tires by usage. Airbnb never sold the room as a product to begin with."
      ]
    },
    {
      q: "Lyft handles payments by connecting to Stripe's API and shows maps by connecting to Google Maps' API. Using the chapter's power-socket analogy, what does an API give the company that uses it?",
      opts: [
        "A copy of the provider's software that Lyft can host and modify on its own servers",
        "A direct connection into the provider's database so Lyft can query the provider's tables",
        "Ownership of the data the provider processes on Lyft's behalf",
        "Access to the provider's functionality through a standard interface"
      ],
      a: 3,
      why: [
        "That describes licensing software to run yourself, which is exactly what an API lets a company avoid. If Stripe handed over its code, Lyft would inherit the job of running payments reliably and securely.",
        "APIs are intermediaries that exchange data or functionality over common web communication protocols, and they deliberately hide the provider's internal structure. Direct table access would break that, since Stripe rewrites its internals without API users noticing.",
        "Using an API is consuming someone else's service, not acquiring their data. The chapter frames the value as two-sided: the provider gains revenue and reach, the user gains functionality it did not have to build.",
        "Correct. Like a power socket, the API supplies the service in a standardized format while the user stays ignorant of how it is produced, which is why Stripe can change its systems and Lyft notices nothing."
      ]
    },
    {
      q: "An employee is fast with the payroll application she has used for six years, but when the company replaces it she waits to be trained rather than exploring it on her own. In the chapter's terms:",
      opts: [
        "She is computer fluent but not computer literate",
        "She is computer literate but not computer fluent",
        "She is an information have-not, because she cannot use the replacement system without being trained",
        "Neither term applies, because literacy and fluency describe an organization's technology rather than one employee's skills"
      ],
      a: 1,
      why: [
        "This reverses the two terms. Fluency is the broader ability and is defined as learning new technologies independently, so it cannot exist without the basic skills that literacy names.",
        "Correct. Computer literacy is knowing how to use a computer and certain applications, which she clearly has; computer fluency is independently learning new technologies as they emerge and assessing their impact, which is exactly what she is not doing.",
        "Information have-nots are people with limited or no computer access or skills, contrasted with information haves who have almost unlimited access to information. Waiting for training on one new system is not the same as having no access or skills at all.",
        "Both terms describe a person, not a system: literacy is knowing how to use a computer and certain applications, and fluency is that person independently learning new technologies as they emerge and judging their impact on her work and life."
      ]
    }
  ]
};
