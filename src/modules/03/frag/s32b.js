/* ===== s32b ===== */
PROSE.s32b = `
<span class="eyebrow">Section 3&ndash;2b</span>
<h2>Hardware: the machines and the things that are not computers</h2>
<p class="lede">Everything a business does with technology finally happens on a physical object somebody bought and plugged in. That object is the first component of an infrastructure, and the one people underestimate, because half of it looks nothing like a computer.</p>

<h3>What hardware is, and why one kind is never enough</h3>
<p><b>Hardware</b> is the physical machinery of an information system: the computers running the applications and databases an organization needs to process transactions and analyze business data.</p>
<p>Business activities make different demands, so a company deliberately buys several kinds of machine. The chapter names six classes &mdash; its own sentence announces six and lists five, adding mobile devices afterwards.</p>
<ul class="keys">
<li><b>Personal computer</b> &mdash; used for personal and small-business computing, serving one person, and the reference point other classes get described against.</li>
<li><b>Workstation</b> &mdash; a single-user machine for medical, engineering or animation work, with the processor and video hardware that rendering three-dimensional models needs.</li>
<li><b>Server</b> &mdash; any computer on a network making files, printing and other services available to that network&rsquo;s users, optimized for a thousand or more at once.</li>
<li><b>Mainframe</b> &mdash; the central computing system of a major organization, serving ten thousand simultaneous users, built for availability and mission-critical transaction processing.</li>
<li><b>Supercomputer</b> &mdash; the most powerful and expensive class, up to twenty times a mainframe, bought for massive scientific problems and typically not used by businesses.</li>
<li><b>Mobile device</b> &mdash; tablets and smartphones, no longer a convenience beside the infrastructure but part of it, because real work now happens on them.</li>
</ul>
<p>Pair each class with what it was optimized for; that outlasts any price figure.</p>

<div class="activity" data-activity="hwClasses"></div>

<h3>Servers, because almost everything you use is one</h3>
<p>What makes a server a server is not its shape. Many people reach it at once, so it carries more processing, memory and disk than a single-user machine, and is built for reliability and fast network connectivity.</p>
<p>Servers differ in what one request costs them. An informational website hands every visitor content it prepared once. A social network builds a different page for each visitor. Email, print and file servers serve no pages at all.</p>
<p class="takeaway">Two identical-looking sites can cost wildly different sums to run: one hands out something prepared earlier, the other builds something new for everyone who asks.</p>

<div class="activity" data-activity="hwQuiz1"></div>

<h3>The computers nobody calls computers</h3>
<p>Everything so far has a screen and a user. Most computing in a modern economy has neither.</p>
<ul class="keys">
<li><b>Embedded system</b> &mdash; a computer built to do one set of tasks well, inside something nobody calls a computer: a media player, a traffic light.</li>
<li><b>Programmable logic controller</b> &mdash; a specialized device automating machines and processes, in settings as different as a factory and a ski lift.</li>
<li><b>Sensor</b> &mdash; an input technology measuring the physical world, reporting temperature, pressure, vibration or proximity in real time rather than waiting to be told.</li>
<li><b>Input and output devices</b> &mdash; an input device gets data in, such as a mouse or a dock scanner; an output device presents results, such as a monitor.</li>
</ul>
<p>Sensors are why this category exploded. The <b>Internet of Things</b> is a vast network of interconnected physical devices collecting and sharing data, often in enormous volumes.</p>
<p>Wire that reporting tightly enough to control something and it earns a name. A <b>cyber-physical system</b> integrates computing with physical processes, coordinating software, sensors and machinery closely enough to run on its own.</p>

<div class="callout warn">
<p><b>Why these are harder to protect.</b> They are densely interconnected, that interconnection creates vulnerabilities, and failures land in the physical world. A failed web page is an inconvenience; a failed controller opens a valve.</p>
</div>

<p>Sort these devices into three families before the vocabulary blurs.</p>

<div class="activity" data-activity="hwSort"></div>

<h3>Tags, and the chip a budget turns on</h3>
<p><b>Radio frequency identification</b>, or RFID, moves data by electromagnetic field between a reader and a small <b>RFID tag</b> on an object. Against a bar code it needs no line of sight, holds more data, and reads at a distance.</p>
<ul class="keys">
<li><b>Passive tags</b> &mdash; a few cents each, no battery, readable from several feet, which suits anything shipped in bulk.</li>
<li><b>Active tags</b> &mdash; several dollars each, carrying a battery, readable from hundreds of feet, which suits containers worth the cost.</li>
</ul>
<p>Inside the box, the processor is where one proposal stops being interchangeable with another. A <b>central processing unit</b> is versatile and handles instructions in sequence, each result feeding the next &mdash; right for a formula waiting on the cell above.</p>
<p>A <b>graphics processing unit</b> runs thousands of small cores on many pieces of data at once, because every pixel can be worked out without knowing its neighbours. Training a model has that same parallel shape.</p>
<ul class="keys">
<li><b>Tensor processing units</b> &mdash; built by large providers to speed the matrix calculations that dominate deep learning, beating general graphics hardware.</li>
<li><b>Field-programmable gate arrays</b> &mdash; processors reconfigurable after manufacture, so an unusual calculation reshapes the hardware rather than waiting for a chip.</li>
<li><b>Neuromorphic chips</b> &mdash; designs modelled on the human brain, aimed at energy efficiency and speed for artificial-intelligence work rather than general throughput.</li>
</ul>
<p>Training models is not a proposal to buy more of the machines you already own.</p>

<div class="activity" data-activity="hwProcessors"></div>

<p>Application software never talks to this hardware directly. It talks to the system software, which talks to the machine.</p>
<p class="takeaway">Name the machine and you have named the constraint: how many people it serves at once, whether it does one job or any job, and whether it works in sequence or in parallel.</p>

<div class="activity" data-activity="hwQuiz2"></div>
`;

ACT.hwClasses = {
  kind: "match",
  label: "Match",
  title: "Six classes, six things they are optimized for",
  how: "Pair each class of computer with what the chapter says it is built to be good at; the explanations say what each pairing rules out as well as what it rules in.",
  objective: "3.2",
  pairs: [
    {
      l: "Personal computer",
      r: "Personal computing and small business computing, for one person at a time",
      why: "This is the chapter&rsquo;s reference machine, and the whole comparison table is really a description of how the other five differ from it. Its defining limit is the single user, not its speed."
    },
    {
      l: "Workstation",
      r: "Visualizing and rendering three-dimensional models for a single demanding user",
      why: "Medical, engineering, architectural, animation and graphics work all need a fast processor, large memory and advanced video hardware. The user count stays at one, which is why it is not a server however expensive it gets."
    },
    {
      l: "Server",
      r: "Access by many concurrent users, with high reliability and fast network connectivity",
      why: "The chapter defines a server by what it does for a network rather than by its size, and by the fact that many people reach it at once. That is what buys it more processing power, memory and storage than a single-user machine."
    },
    {
      l: "Mainframe",
      r: "High availability, heavy shared use and security for mission-critical transaction processing",
      why: "This is the main, central computing system of a major organization, the machine the chapter reaches for when ten thousand or more users depend on the same records and the work cannot stop."
    },
    {
      l: "Supercomputer",
      r: "Massive scientific problems that no ordinary machine could finish in a useful time",
      why: "It is the most expensive and most powerful class, and the chapter says plainly that business organizations typically do not use one. It is bought for a problem, not for a workload."
    },
    {
      l: "Mobile device",
      r: "One person&rsquo;s work, done on a handheld machine that travels with them",
      why: "Tablets and smartphones are in the table because they became part of the infrastructure rather than an accessory beside it, supporting today&rsquo;s working arrangements as well as personal use."
    }
  ]
};

ACT.hwSort = {
  kind: "sort",
  label: "Sort",
  title: "General-purpose computer, special-purpose device, or input and output",
  how: "Place each piece of hardware in the family the chapter puts it in. Every situation described here is a hypothetical practice situation, and each one states the conditions you need.",
  objective: "3.2",
  buckets: [
    {
      id: "general",
      name: "General-purpose computer",
      hint: "one of the six classes: it runs whatever software is installed on it, and the classes differ mainly in scale and in how many people it serves"
    },
    {
      id: "special",
      name: "Special-purpose device",
      hint: "built into something else to do one job for years, usually with no screen, no keyboard and nobody sitting at it"
    },
    {
      id: "io",
      name: "Input or output device",
      hint: "it does not do the deciding; its job is getting data into a system, or getting a result out to a person"
    }
  ],
  items: [
    {
      t: "A machine in the back room of a hypothetical online shop that holds the product catalogue and answers a thousand shoppers at once",
      b: "general",
      why: "This is the chapter&rsquo;s server: a computer on a network making access to files and services available to many concurrent users, which is what buys it the extra processing power, memory and reliability."
    },
    {
      t: "The central system of a hypothetical insurer, used simultaneously by ten thousand staff for transaction processing and never permitted to stop",
      b: "general",
      why: "Ten thousand simultaneous users on mission-critical transaction processing is the chapter&rsquo;s description of a mainframe, optimized for high availability, heavy shared use and security."
    },
    {
      t: "The machine a hypothetical animation studio buys so one artist can render three-dimensional scenes",
      b: "general",
      why: "A workstation is still a general-purpose computer serving one user; what separates it from an ordinary desktop is the processor, memory and video hardware needed for visualization and rendering."
    },
    {
      t: "The handheld a hypothetical delivery driver uses to receive the day&rsquo;s jobs, record what was delivered and take payment",
      b: "general",
      why: "Mobile devices are the sixth class in the chapter&rsquo;s table, and this one is doing organizational work rather than personal work, which is exactly why the chapter counts them as infrastructure."
    },
    {
      t: "The computer inside a media player that will only ever play discs and that nobody will ever install other software on",
      b: "special",
      why: "This is the chapter&rsquo;s definition of an embedded system: designed to perform one specific set of tasks effectively, inside a product nobody thinks of as a computer."
    },
    {
      t: "A small unit at a hypothetical resort that starts, stops and speeds up a ski lift according to a fixed control program",
      b: "special",
      why: "The chapter names ski lifts alongside manufacturing plants when it defines a programmable logic controller, a specialized device used to automate machines and processes."
    },
    {
      t: "The unit built into a car that manages engine performance and is never used for anything else",
      b: "special",
      why: "Controlling engine performance is one of the chapter&rsquo;s own examples of an embedded system. The giveaway is that the task set is fixed at manufacture rather than chosen later by a user."
    },
    {
      t: "A touch screen on a self-service ordering kiosk in a hypothetical cafe",
      b: "io",
      why: "The chapter lists touch screens with mice and cameras as input devices. It gathers what a person wants and passes it on; the machine behind it does the processing and the deciding."
    },
    {
      t: "A printer in a hypothetical warehouse producing the list of items a picker must collect",
      b: "io",
      why: "Printers are one of the chapter&rsquo;s output devices, and this is the moment a system&rsquo;s decision becomes something a person can act on. Nothing is being computed by the printer itself."
    },
    {
      t: "A small unit clamped to a motor in a hypothetical plant that measures vibration and reports it continuously to a maintenance system",
      b: "io",
      why: "This is a sensor, which the chapter treats as an input technology: it measures vibration in the physical environment and supplies that information in real time to something else that decides."
    },
    {
      t: "A reader mounted in a doorway at a hypothetical depot that picks up identifiers from tags on passing cartons and hands them to the stock system",
      b: "io",
      why: "The reader&rsquo;s entire job is getting data into a system without anyone typing or aiming a scanner, which is what an input device does. The Internet of Things widened this category rather than creating a new one."
    }
  ]
};

ACT.hwProcessors = {
  kind: "explore",
  label: "Explore",
  title: "Four kinds of processor, and what choosing one commits you to",
  how: "Open each card and read all four panels; the last card sets the families against each other, which is where the reason for all this specialization becomes visible.",
  objective: "3.2",
  labels: ["What it is", "The kind of work it suits", "The example that makes it click", "What it means for a budget"],
  items: [
    {
      icon: "SEQ",
      name: "Central processing unit",
      sub: "The general-purpose processor",
      what: "The processor that performs a computer&rsquo;s calculations, built for versatility across a very wide range of operations, which is why it sat at the heart of server architecture for decades.",
      real: "Sequential work, where instructions and results depend on one another, which the chapter says describes most traditional software.",
      absent: "Recalculating a spreadsheet, where a formula may need the answer from the cell above it before it can run at all, so nothing is gained by having a thousand helpers standing idle.",
      why: "It is the default line in almost every hardware budget, and for transaction processing, reporting and ordinary business applications it is also the correct one. Nothing here needs a special case."
    },
    {
      icon: "PAR",
      name: "Graphics processing unit",
      sub: "Thousands of small cores working at once",
      what: "A processor optimized for parallel processing, performing the same operation on very many pieces of data simultaneously using thousands of small cores.",
      real: "Work that splits into many identical, independent pieces, where no piece has to wait for another piece&rsquo;s answer before it can start.",
      absent: "Rendering an image, where determining the colour value and intensity of one pixel needs nothing from the surrounding pixels, so every pixel can be handled at the same moment.",
      why: "Faster training times made these a staple of machine-learning infrastructure, which means a modelling project buys different hardware than a database project and should be costed separately from the start."
    },
    {
      icon: "FIT",
      name: "Tensor processing unit",
      sub: "Custom-built for one shape of calculation",
      what: "A processor developed by large providers and custom-designed to optimize the tensor computations that dominate deep learning, using a matrix-based architecture.",
      real: "The narrow band of work it was designed around, where the chapter reports it outperforming general graphics hardware on specific tasks.",
      absent: "The provider&rsquo;s own language models, processed in batches on hardware the same provider designed, and then rented out to customers doing work of a similar shape.",
      why: "You are unlikely to buy one; you rent time on it. That is the first place in this module where owning and renting stop being equivalent choices, and the cloud sections pick the thread up."
    },
    {
      icon: "SHAPE",
      name: "Reconfigurable and experimental silicon",
      sub: "Gate arrays, brain-inspired chips, whole wafers",
      what: "Three further steps along the same road: field-programmable gate arrays offering customizable hardware acceleration, neuromorphic chips inspired by the brain&rsquo;s architecture, and wafer-scale engines integrating vast numbers of cores.",
      real: "Work specialized enough that no general processor fits it well, or constrained enough by electricity that ordinary hardware is uneconomic to run.",
      absent: "A team with one unusual calculation reshaping a gate array around that calculation, rather than waiting for a chip that no manufacturer has any reason to build.",
      why: "These are research and niche lines rather than standing budget items, but they are the reason to ask what a proposal actually runs on instead of assuming every machine is priced alike."
    },
    {
      icon: "VS",
      name: "The four compared",
      sub: "Why specialization keeps increasing",
      what: "A progression from general-purpose processors toward increasingly specialized hardware, which the chapter presents as the industry&rsquo;s response to the escalating demands of machine learning and generative artificial intelligence.",
      real: "Every step trades flexibility for performance on a narrower band of work, which is a bargain worth making only when the work is both demanding and predictable.",
      absent: "The same chip family that renders video games became standard for training models, because the underlying calculation had the same independent, repeated shape in both cases.",
      why: "The manager&rsquo;s version of this whole box is one question: does this project run on the machines we already buy, or on a different kind of machine at a different price? The answer changes the number before anyone negotiates."
    }
  ]
};

ACT.hwQuiz1 = {
  kind: "quiz",
  label: "Check yourself",
  title: "Classes of computer, and what a server is for",
  how: "Four options, one best answer; read every explanation, including the ones for options you did not choose.",
  objective: "3.2",
  questions: [
    {
      q: "The chapter&rsquo;s sentence introducing the classes of computer says there are six and then names five. Which class does that sentence leave out, and how can you tell it belongs?",
      opts: [
        "The mobile device, which the sentence adds afterwards and which the chapter&rsquo;s own comparison table carries as a sixth row",
        "The embedded system, which is a computer built into another product and so ought to be counted among the general classes",
        "The workstation, which is easily mistaken for a personal computer and is the class most often dropped from such lists",
        "Nothing is left out, because the chapter counts the personal computer and the notebook computer as two separate classes"
      ],
      a: 0,
      why: [
        "Correct. The sentence names personal computer, workstation, server, mainframe and supercomputer, then adds mobile devices as an afterthought; the table settles it by listing six rows, mobile devices among them.",
        "Embedded systems are real and important, but the chapter deliberately places them outside the six general classes, under hardware that is not a general-purpose computer at all.",
        "The workstation is named explicitly in that sentence and has its own row in the table, with its own definition about rendering three-dimensional models for a single user.",
        "The chapter treats personal computers and notebook computers together in one class, both used for personal and small business computing, so splitting them does not produce the missing sixth."
      ]
    },
    {
      q: "A hypothetical national parcel carrier keeps its billing and consignment records on one central system that ten thousand staff use simultaneously and that is not permitted to stop. A consultant suggests buying a supercomputer instead. What does the chapter&rsquo;s comparison say?",
      opts: [
        "A supercomputer fits, because it is the most powerful class available and this is the carrier&rsquo;s most demanding system",
        "A mainframe fits, because it is optimized for high availability, heavy shared use and security",
        "Several servers fit better than either, since the chapter describes servers as the class that handles more than a thousand simultaneous users",
        "The two classes are interchangeable at this scale, since the table describes both as serving anywhere from one user to many"
      ],
      a: 1,
      why: [
        "Power is not the axis here. The chapter says supercomputers are used primarily for massive scientific problems and typically not by business organizations; buying one would spend a fortune on the wrong strength.",
        "Correct. Ten thousand simultaneous users on records that cannot go down is precisely the mainframe description: the main central computing system of a major organization, optimized for availability, shared use and security, and the chapter&rsquo;s machine for mission-critical transaction processing.",
        "The figure is right and the conclusion is not. Servers do serve a thousand or more users, but the chapter reserves enterprise-wide transaction processing at this scale and this availability requirement for the mainframe.",
        "The table gives supercomputers one to many users and mainframes ten thousand and more, and it gives them entirely different typical uses, so they are not interchangeable in either direction."
      ]
    },
    {
      q: "Two hypothetical sites look the same to a visitor. One is a public library&rsquo;s opening-hours page, identical for everyone. The other is a member portal that assembles a different page for each person out of that person&rsquo;s own records. Why does the chapter treat these as different requirements?",
      opts: [
        "Because the second must be a mainframe, since building a page for each person counts as mission-critical transaction processing",
        "Because the first is an output device and the second is a general-purpose computer, which is the distinction the chapter draws whenever a machine hands something out rather than working something out",
        "Because the first hands out content prepared once, while the second does fresh work for every request, so the two differ in processing power, network connectivity and software",
        "Because the second is a server and the first is not, since a machine handing out an unchanged file provides no service to the network"
      ],
      a: 2,
      why: [
        "Nothing in the situation says the records cannot go down or that ten thousand people use them at once. The chapter&rsquo;s dynamic-page example is an ordinary web server, not a mainframe.",
        "Output devices are monitors, printers and speakers. Neither of these machines is one, and the difference the chapter is drawing is between two kinds of server rather than between hardware families.",
        "Correct. The chapter contrasts servers that display the same static pages for every visitor with servers that create pages dynamically from each user&rsquo;s request, and says these have different requirements in processing power, network connectivity and software.",
        "Both are servers. The chapter&rsquo;s definition is any computer on a network making access to files, printing, communications or other services available to users, and handing out a page is exactly that."
      ]
    }
  ]
};

ACT.hwQuiz2 = {
  kind: "quiz",
  label: "Check yourself",
  title: "Devices, tags, and processors",
  how: "Three questions on the hardware that is not a general-purpose computer; each explanation says what the wrong option genuinely describes.",
  objective: "3.2",
  questions: [
    {
      q: "A hypothetical dairy installs small units that start and stop its bottling conveyors according to a fixed control program. None of them has a screen or a keyboard, and no one will install anything else on them. What does the chapter call these, and what separates them from the computers in the office?",
      opts: [
        "Servers, because they make a service available to the other machines on the plant network and are reached by many devices at once",
        "Input devices, because they take signals from the line and act on them, which is what the chapter says an input device does",
        "Embedded systems, because any computer without a screen is by definition embedded inside the product it controls",
        "Programmable logic controllers, which are specialized devices used to automate machines and processes"
      ],
      a: 3,
      why: [
        "A server provides files, printing, communications and other services to users of a network. These units are controlling machinery, and nobody is requesting anything from them.",
        "An input device supplies data to a computer and stops there. These units decide and act, which is the difference between reading a sensor and running a conveyor.",
        "The absence of a screen is not the test. Embedded systems sit inside a consumer product such as a media player or a traffic light; the chapter gives control of machines and processes, including ski lifts, its own name.",
        "Correct. The chapter defines programmable logic controllers as specialized computing devices used to automate machines and processes, in environments from manufacturing plants to ski lifts. That fixed job, rather than running whatever software someone installs, is what separates them."
      ]
    },
    {
      q: "A hypothetical equipment yard wants to locate trailers parked across a site several hundred feet wide, and separately wants to identify low-value cartons as they pass through a doorway. What does the chapter&rsquo;s account of tags suggest?",
      opts: [
        "Active tags for the trailers, because they carry a battery and can be read from hundreds of feet, and passive tags for the cartons, because they cost a few cents and need only a few feet",
        "Passive tags throughout, because they cost a fraction of the alternative and the real difference between the two kinds is how long they survive being knocked about rather than how far away they can be read",
        "Active tags throughout, because using a single kind of tag simplifies the readers and the extra cost per tag is trivial at any volume",
        "Bar codes for both, because the chapter presents tags as a replacement that has not actually arrived in practice"
      ],
      a: 0,
      why: [
        "Correct. The chapter gives passive tags a range of up to several feet at a cost starting from a few cents, and active tags a battery, a cost upward of several dollars and a range of hundreds of feet, which matches the two requirements exactly.",
        "Durability is not the distinction the chapter draws. Passive tags simply cannot be read from hundreds of feet, so the trailers across the yard would go unlocated however many tags were bought.",
        "Cost is not trivial when the tagged item is a low-value carton. Several dollars a tag against a few cents is the whole reason the chapter describes two kinds instead of one.",
        "The chapter actually claims tags are rapidly replacing bar codes, and this module softens that rather than reversing it. The doorway requirement alone rules bar codes out, since they need line of sight and hand scanning."
      ]
    },
    {
      q: "Why, according to the chapter, did hardware built for rendering images turn out to suit the training of machine-learning models?",
      opts: [
        "Because graphics hardware runs instructions one after another faster than a general-purpose processor does, and training a model is mostly one long chain of steps each of which waits for the one before it",
        "Because models are stored as images, so the hardware that displays pictures is also the hardware that can read them",
        "Because graphics hardware carries far more memory than a general processor, and memory is the binding constraint when training a model",
        "Because both jobs consist largely of the same calculation repeated over many pieces of data that do not depend on one another, so thousands of small cores can work at the same time"
      ],
      a: 3,
      why: [
        "This reverses the chapter&rsquo;s argument. Sequential processing is what the central processing unit is designed for, and the point about training is precisely that it does not have to happen in sequence.",
        "Models are not stored as images, and nothing in the chapter suggests they are. The resemblance is in the shape of the calculation, not in the shape of the data.",
        "Memory matters, but it is not the explanation the chapter gives. Its account rests on parallelism: thousands of cores each doing an independent piece of the same work.",
        "Correct. Determining the colour value and intensity of a pixel is independent of the surrounding pixels, and the matrix and vector calculations underneath deep learning are independent in the same way, which is why parallel hardware suits both."
      ]
    }
  ]
};
