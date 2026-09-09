/* ===== s34d ===== */
PROSE.s34d = `
<span class="eyebrow">Section 3&ndash;4d</span>
<h2>What the cloud made possible</h2>
<p class="lede">Once capacity could be summoned in minutes and dropped again, impractical arrangements became ordinary: software assembled from blocks, many machines aimed at one problem, content kept near its readers, and a push to use less power.</p>

<h3>One program that does everything</h3>
<p>The traditional way to build business software was one large program holding every feature: a <b>monolithic application</b>, built as a single unit with the entire code in one base.</p>
<ul class="keys">
<li><b>Everything ships together</b> &mdash; one build, one test and one installation cover the whole application, simpler than coordinating a dozen pieces.</li>
<li><b>Everything changes together</b> &mdash; altering one feature means rebuilding the whole program, so a small change carries the risk of the entire system.</li>
</ul>
<p>The second is why a monolith is hard to adapt: the part you want to change is bolted to every part you do not.</p>

<h3>Building out of blocks instead</h3>
<p>The alternative is to assemble a program rather than write one. A <b>modular architecture</b> means choosing the building blocks best suited to a need and connecting them through APIs, like a model made of Lego.</p>
<p>A <b>packaged business capability</b>, or PBC, is one such block performing a well-specified function such as processing payments, itself made of smaller <b>microservices</b>. Vendors offer competing blocks, so a firm picks best of breed.</p>

<div class="callout info"><p><b>Why you do not care how the oil gets changed.</b> Somebody else changes your car&rsquo;s oil. All that matters is the expected quality and cost, not the tools. An interface is that agreement written down for software.</p></div>

<p>Uber built driver management, trip management, billing and payments as separate components joined by APIs, so each could change when its process did. But modularity demands expertise to plan the architecture, select components from thousands, and orchestrate them.</p>
<p class="takeaway">Modularity moves the difficulty rather than removing it: less code to write, far more to choose and connect.</p>

<div class="activity" data-activity="advQuiz1"></div>

<h3>Many small machines, one enormous problem</h3>
<p>Some organizations need more performance than an ordinary arrangement supplies, usually to simulate events that are expensive, dangerous or impossible to stage.</p>
<ul class="keys">
<li><b>Crash and design simulation</b> &mdash; manufacturers simulate crashes and test designs for vibration and wind noise before metal is bent.</li>
<li><b>Research modelling</b> &mdash; laboratories model neutron transport inside nuclear reactors and study climate scenarios.</li>
<li><b>Earth science</b> &mdash; earthquake simulation, where the alternative is waiting for the real event.</li>
</ul>
<p>The obvious answer is a supercomputer, and it fails twice. Some simulations take a year even on one, and the fastest cost more than US$200 million &mdash; a purchase price that is not the total cost of ownership, which also carries staff and facilities.</p>
<p><b>Grid computing</b> is the third answer: combining many smaller, independent, networked computers, often ordinary desktops, into one system solving problems only supercomputers could. Large tasks break into chunks that individual machines complete.</p>

<div class="callout exam"><p><b>The line to remember.</b> Grid and cloud both use distributed resources, which is why they get confused. In a grid they go to a single large problem; a cloud serves many customers doing many things.</p></div>

<p>Reassemble the argument in order; a grid is a last answer, not a first one.</p>

<div class="activity" data-activity="advOrder"></div>

<h3>When the computers are inside a moving object</h3>

<div class="callout warn"><p><b>Car hacking.</b> A modern vehicle holds many control units &mdash; small computers running engine, airbags, steering and braking &mdash; coupled through a maze of networks, plus Bluetooth and Wi-Fi.</p>
<p>Researchers have repeatedly broken in. The reason is not clever attackers: a vehicle holds a tremendous amount of code, most from many vendors, so no manufacturer understands every vulnerability it ships.</p></div>


<h3>Keeping the content near the people who want it</h3>
<p>Distance costs time: the further a user is from the server holding the content, the longer it takes. A <b>content delivery network</b> answers that with servers in many geographical locations storing copies of particular websites, so the closest one answers each request.</p>
<p>These became <b>edge computing</b>, where storage and processing move to the edges of the network to minimize latency, with less traffic and lower cost.</p>
<ol class="steps">
<li><b>Annoying</b> &mdash; latency spoils a home assistant, because a pause before every answer turns a conversation into a wait.</li>
<li><b>Impractical</b> &mdash; automated stock trading becomes impossible, since the point is acting before somebody slower does.</li>
<li><b>Dangerous</b> &mdash; autonomous vehicles become impossible, because a car cannot wait for a round trip across a continent.</li>
<li><b>Fatal</b> &mdash; a patient in an internet-connected EKG vest, where the delay can result in life or death.</li>
</ol>
<p>Pair each arrangement with the problem it answers.</p>

<div class="activity" data-activity="advMatch"></div>

<h3>Using less power to do the same work</h3>
<p>Organizations act on energy for two reasons: scrutiny over their contribution to climate change, and savings on energy, water, waste and carbon taxes. <b>Green computing</b> covers both &mdash; using computing resources more efficiently, and using information systems to cut environmental impacts elsewhere.</p>
<ul class="keys">
<li><b>Virtualization</b> &mdash; several computing environments on one machine, consolidating barely used servers onto a few well-used ones, cutting power and cooling.</li>
<li><b>Shared provider infrastructure</b> &mdash; the cloud is argued to cut consumption, because one provider&rsquo;s infrastructure is shared rather than idling everywhere.</li>
<li><b>Power management</b> &mdash; software recovering the energy wasted by desktops idling overnight, invisible until measured.</li>
<li><b>Printing less</b> &mdash; discouraging staff from printing emails and documents cuts paper waste.</li>
</ul>
<p>Retiring equipment is the forgotten part. Old machines cannot go to landfill and must be wiped of user data; specialist firms resell them or dismantle them to recycle materials and handle hazardous waste.</p>
<p>The cards set all four trends side by side, with what each asks in return.</p>

<div class="activity" data-activity="advExplore"></div>

<p>One last check across the four trends and the security box.</p>

<div class="activity" data-activity="advQuiz2"></div>
`;

ACT.advQuiz1 = {
  kind: "quiz",
  label: "Check yourself",
  title: "Monoliths, blocks, and what an interface promises",
  how: "Four options, one best answer; every organization described here is a hypothetical example written for practice, and every company named is one the chapter names, so read all four explanations including the ones you did not choose.",
  objective: "3.4",
  questions: [
    {
      q: "A hypothetical distributor runs its whole ordering system as one large program containing every feature it needs. Which pair of consequences does the chapter attach to that design?",
      opts: [
        "It is difficult to develop, test and deploy, which is precisely why organizations began assembling software from separate blocks",
        "It is relatively easy to develop, test and deploy, and correspondingly inflexible and very difficult to adapt to changing business or user needs",
        "It cannot be hosted on rented infrastructure, because providers run applications that have been split into separate components",
        "It costs less to run than a modular equivalent, because a single code base consumes less storage and network capacity than many blocks would"
      ],
      a: 1,
      why: [
        "The chapter says the opposite about building it: because the entire application code sits in a single code base, a monolithic application is relatively easy to develop, test and deploy. The difficulty arrives later, when the thing has to change.",
        "Correct. The chapter grants the monolith its advantage and then names the price. The same single code base that makes the application easy to build and ship makes it inflexible and very difficult to adapt to changing business or user needs.",
        "Nothing about a single code base prevents it from running on rented infrastructure. The infrastructure service model described earlier in this objective rents an operating system upward and lets the customer run whatever it likes on top.",
        "Storage and network capacity are not the comparison the chapter draws, and it says nothing about a monolith being cheaper to run. The trade-off it names is ease of building set against the ability to change."
      ]
    },
    {
      q: "A hypothetical clinic buys a component that handles patient billing and connects it to the rest of its systems through an interface. In the chapter&rsquo;s vocabulary, what has it bought, and what is that component built from?",
      opts: [
        "A packaged business capability, which on a technical level is composed of smaller blocks called microservices",
        "A microservice, which is composed of several packaged business capabilities working together",
        "A monolithic application, because billing is a complete piece of software in its own right",
        "A grid, because the work of producing each bill is distributed across many networked machines"
      ],
      a: 0,
      why: [
        "Correct. A packaged business capability is an individual building block designed to perform a well-specified business function, such as processing payments or managing orders, and the chapter says such capabilities are composed on a technical level of smaller building blocks referred to as microservices.",
        "The relationship runs the other way around. Microservices are the smaller parts that a packaged business capability is assembled from, not the larger thing assembled out of capabilities.",
        "A monolithic application contains every feature the system needs inside one code base. A component bought to perform one well-specified function and connected through an interface is the opposite arrangement.",
        "Grid computing combines many small computers to attack a single large computation. Producing a bill is ordinary business work, not a calculation that has to be divided across machines."
      ]
    },
    {
      q: "The chapter explains interfaces by comparing them to having someone else change your car&rsquo;s oil. What is that comparison actually teaching?",
      opts: [
        "That the cheapest supplier is usually adequate, since the same task produces the same result wherever it is carried out",
        "That what matters is the service arriving at the expected quality and cost, while how the provider does the work is not the customer&rsquo;s concern",
        "That specialist work belongs in-house, because a customer cannot judge whether an outside provider did the job properly",
        "That a modular approach removes the need for planning, since each provider takes responsibility for its own block"
      ],
      a: 1,
      why: [
        "Price is not what the comparison turns on. The chapter lists a dealership, an independent garage, an oil-change service and a friend as equally acceptable, which is a statement about the agreed result rather than about cost alone.",
        "Correct. The chapter says all that matters is that the service will be provided at the expected level of quality and cost, and that you typically do not care if different providers do things differently or use different tools. That is exactly what an interface promises between two pieces of software.",
        "The chapter argues the reverse. Its starting sentence is that you cannot be an expert in everything, so it is probably more effective to have the work done by someone who is.",
        "Planning is precisely what a modular approach demands. The chapter warns that it takes tremendous effort and expertise to plan the architecture, select the right components from hundreds or thousands available, and orchestrate and deploy them."
      ]
    }
  ]
};

ACT.advOrder = {
  kind: "order",
  label: "Sequence",
  title: "Why a grid, and how the work gets divided",
  how: "Put the six stages into the order the chapter&rsquo;s own argument runs, then read why each one sits where it does.",
  objective: "3.4",
  intro: "A hypothetical materials research group needs a simulation that would take far longer than it can wait on any machine it already owns. Two answers get ruled out before the chapter reaches grid computing, and the ruling out is the part worth following, because it explains what a grid is actually for.",
  steps: [
    {
      t: "The work is stated: one simulation, far too large for the machines the organization already owns to finish in a useful time.",
      why: "Grid computing answers a particular shape of problem, so the shape has to be named first. The chapter&rsquo;s own cases are crash simulation, reactor and climate modelling, and earthquake simulation, each of them a single large calculation rather than many small unrelated ones."
    },
    {
      t: "A supercomputer is considered, and speed alone turns out not to settle the question, because some complex simulations take a year or longer to calculate even on a supercomputer.",
      why: "This is the step most people skip. Buying the fastest available machine does not automatically make the problem tractable, so the organization cannot treat raw performance as the whole answer before it has looked at the size of its own task."
    },
    {
      t: "Cost rules the purchase out. The fastest supercomputers can cost more than US$200 million, and the purchase price does not represent the total cost of ownership, which also carries personnel, facilities, storage and software.",
      why: "The chapter separates the sticker price from the running commitment on purpose. A machine also needs people who can operate it, somewhere to put it, storage to feed it and software to run on it, and an organization needing it only occasionally cannot justify any of that."
    },
    {
      t: "The historical fallback is named and found wanting: rent time on somebody else&rsquo;s supercomputer, or simply decide not to solve the problem.",
      why: "This is the state of affairs grid computing improved on, and the second half of it is the honest one. The chapter says organizations sometimes decided not to solve the problem at all, which is what an unaffordable capability actually costs a research programme."
    },
    {
      t: "The large computing task is broken into small chunks, each of which can be completed on its own.",
      why: "Divisibility is the precondition, not an afterthought. If the pieces cannot be worked on independently then handing them to separate machines gains nothing, which is why not every heavy calculation is a candidate for this treatment."
    },
    {
      t: "The chunks are distributed to a large number of smaller, independent, networked computers, often ordinary desktop machines, and the completed pieces are combined into the finished result.",
      why: "This is the definition itself: combining the computing power of many smaller networked computers into a cohesive system able to solve problems that only supercomputers could previously solve. Note that the resources are all aimed at one problem, which is what separates a grid from a cloud."
    }
  ]
};

ACT.advMatch = {
  kind: "match",
  label: "Match",
  title: "Which arrangement answers which problem",
  how: "Pair each arrangement from this section with the problem it exists to solve; the explanations name the chapter&rsquo;s own reasoning for each pairing.",
  objective: "3.4",
  pairs: [
    {
      l: "Modular architecture",
      r: "An application that has to change often is built as one unit, so every small change carries the whole system with it",
      why: "The chapter presents modular architectures as the answer to the monolith&rsquo;s inflexibility: choose the blocks best suited to a particular need and connect them, rather than holding every feature in one code base."
    },
    {
      l: "Packaged business capability",
      r: "A well-specified business function such as processing payments would otherwise have to be written from scratch inside your own application",
      why: "That is the definition: an individual building block designed to perform a well-specified business function, with processing payments and managing orders as the chapter&rsquo;s two examples."
    },
    {
      l: "Microservices",
      r: "Even a single business capability is too large to replace in one piece, so it is assembled from smaller parts each doing one narrow job",
      why: "The chapter says a packaged business capability is composed on a technical level of smaller building blocks referred to as microservices, which is what makes a capability adjustable from the inside."
    },
    {
      l: "Best-of-breed selection",
      r: "Several vendors offer a block for the same function, and their strengths and prices differ",
      why: "The chapter notes that you can typically find capabilities offered by different vendors, allowing you to choose the one that best meets current or future needs."
    },
    {
      l: "Connecting blocks through APIs",
      r: "Software written by different people, often at different companies, has to work together without either side knowing how the other is built",
      why: "This is the oil-change comparison in software form: what matters is the service arriving at the expected quality and cost, not whether the provider does things differently or uses different tools."
    },
    {
      l: "Grid computing",
      r: "A single large problem needs more computing power than the organization can justify buying, and would take too long on the machines it owns",
      why: "The chapter reaches grid computing only after ruling out a supercomputer on cost and on total cost of ownership, and it stresses that the pooled resources are aimed at one problem."
    },
    {
      l: "Content delivery network",
      r: "Users far from the one server holding the content wait noticeably longer for it to arrive",
      why: "The chapter names distance itself as the cause, and answers it with servers in various geographical locations holding copies, the closest one delivering the content."
    },
    {
      l: "Edge computing",
      r: "A round trip to a distant central location is too slow for work that has to react immediately",
      why: "Edge computing is what content delivery networks evolved into: not only storage but also processing moves to the edges of the network in order to minimize latency, which is what a vehicle or a monitoring device needs."
    },
    {
      l: "Virtualization",
      r: "A room full of servers each uses a small fraction of its capacity while drawing power and needing cooling",
      why: "The chapter gives virtualization as its first green computing tactic, consolidating many underutilized machines onto far fewer and cutting both the energy bill and the carbon footprint."
    },
    {
      l: "IT asset disposition",
      r: "Retired equipment cannot simply go to a landfill, and may still hold user data when it leaves the building",
      why: "The chapter says drives must be wiped, and describes third-party vendors that wipe them and then either refurbish and resell the equipment or dismantle it to recycle materials and dispose of hazardous waste."
    }
  ]
};

ACT.advExplore = {
  kind: "explore",
  label: "Explore",
  title: "The four trends, and what each one asks for in return",
  how: "Open each card and read all four panels; the third panel is the one worth lingering over, because it names what the arrangement costs rather than what it saves.",
  objective: "3.4",
  labels: ["The idea in one line", "What it looks like in practice", "What it demands in return", "The limit worth knowing"],
  items: [
    {
      icon: "BLOCK",
      name: "Modular architectures",
      sub: "Assembling software rather than writing it",
      what: "Building software by choosing individual blocks best suited to a particular need and connecting them through interfaces, in place of one large program holding every feature in a single code base.",
      real: "A system whose ordering, inventory, customer and payment functions are separate packaged business capabilities, each chosen from whichever vendor suits it best, and each replaceable without disturbing the others.",
      absent: "Tremendous effort and expertise to plan the architecture, to select the right components from hundreds or thousands of available blocks, and to orchestrate and deploy them so they work as one thing.",
      why: "The chapter says the integration can be extremely complex and time-consuming, and well beyond the means of small enterprises, so modularity is not automatically the cheaper road for a small organization."
    },
    {
      icon: "GRID",
      name: "Grid computing",
      sub: "Many small machines, one large problem",
      what: "Combining the computing power of a large number of smaller, independent, networked computers into a cohesive system able to solve problems that previously needed a supercomputer.",
      real: "A crash, reactor or earthquake simulation broken into small chunks, each completed by an ordinary machine somewhere on the network and returned to be combined with the rest.",
      absent: "A problem that genuinely divides into independent chunks, and a population of machines whose spare capacity can be borrowed without disrupting whatever else those machines are doing.",
      why: "It is not a general substitute for renting infrastructure. The resources in a grid are typically applied to a single large problem, whereas cloud resources serve many separate customers doing many separate things."
    },
    {
      icon: "NEAR",
      name: "Content delivery and edge computing",
      sub: "Moving the work closer to the person",
      what: "Keeping copies of content on servers in several geographical locations so the nearest one answers a request, and then moving processing as well as storage out towards the edges of the network.",
      real: "A page or a video that arrives promptly for viewers on three continents because each of them is served from a machine a few hundred miles away, a process normally unnoticed by the viewer.",
      absent: "Somewhere to hold the copies and a way to keep them current, plus the judgement to decide which work has to happen near the user and which can afford a round trip to the centre.",
      why: "Distance is the constraint it removes, not capacity. An application that is slow because of its own design, or because its origin is overloaded, is not repaired by holding copies nearer to anybody."
    },
    {
      icon: "WATT",
      name: "Green computing",
      sub: "Doing the same work with less power",
      what: "Using computing resources more efficiently in order to reduce environmental impacts, and using information systems to reduce negative environmental impacts elsewhere in the organization.",
      real: "Consolidating underused servers through virtualization, shifting work to a shared provider, managing power on idle desktops, printing less, and routing retired equipment through a specialist rather than a skip.",
      absent: "A decision about when equipment is retired, and a process that wipes user data from every machine before it leaves the building, whether it is resold, refurbished or dismantled.",
      why: "The chapter credits shared cloud infrastructure with lower energy use while describing an enormous new demand for computing power to train models, and it does not reconcile the two claims."
    }
  ]
};

ACT.advQuiz2 = {
  kind: "quiz",
  label: "Check yourself",
  title: "Grids, distance, vehicles, and watts",
  how: "Four questions across the whole section; every organization described is a hypothetical example written for practice, and each explanation says what the option you did not pick would actually describe.",
  objective: "3.4",
  questions: [
    {
      q: "A hypothetical university research group splits one very large simulation into thousands of small pieces and has hundreds of ordinary networked desktop machines complete them. How does the chapter separate this from cloud computing?",
      opts: [
        "Both use distributed resources, but the resources in a grid are typically applied to a single large problem, whereas a cloud serves many separate customers and purposes",
        "A grid uses machines the organization owns itself, whereas a cloud uses machines belonging to somebody else",
        "A grid is a way of storing data across many machines, whereas a cloud is a way of processing it",
        "There is no real difference between them, because grid computing is simply the earlier name for what is now sold as cloud computing, and the change of word marked a change of marketing"
      ],
      a: 0,
      why: [
        "Correct. The chapter says that similar to cloud computing, grid computing makes use of distributed resources, but that in contrast to cloud computing the resources in a grid are typically applied to a single large problem.",
        "Ownership is not the line the chapter draws, and a grid can be assembled from machines belonging to several organizations or contributed by volunteers. What the machines are aimed at is the distinguishing feature.",
        "Grid computing is defined as combining computing power to solve problems that previously required a supercomputer, which is processing rather than a way of storing data across machines.",
        "The chapter sets the two side by side precisely in order to separate them, and it defines cloud computing separately as renting configurable resources on demand with minimal management effort."
      ]
    },
    {
      q: "The chapter&rsquo;s security box argues that vehicle manufacturers cannot know every vulnerability in their own vehicles. What reason does it give?",
      opts: [
        "Because attackers work faster than manufacturers can test, so any list of known vulnerabilities is out of date before it is finished",
        "Because a modern vehicle contains a tremendous amount of programming code, most of it supplied by a broad range of outside vendors",
        "Because the control units in a vehicle are not connected to one another, so a fault in one cannot be traced from another",
        "Because vehicles are tested for safety rather than for security, and that testing is carried out by regulators rather than by manufacturers"
      ],
      a: 1,
      why: [
        "The chapter says the opposite about speed. A successful break-in typically is not easy and often requires several researchers several months, which is why some observers regard the danger as more hype than reality.",
        "Correct. The chapter states that there is a tremendous amount of programming code in modern vehicles and that most of this code comes from a broad range of vendors, making it virtually impossible for manufacturers to understand all potential vulnerabilities.",
        "The box describes the control units as coupled together through a maze of networks, alongside Bluetooth for hands-free calling and sometimes a passenger hotspot, so connection is part of the problem rather than absent from it.",
        "Testing regimes are not what the box discusses. Its recommendation is that component vendors standardize approaches, share information and secure supply chains against tampering and counterfeit parts."
      ]
    },
    {
      q: "A hypothetical museum streams video to visitors on three continents from a single server in one country, and distant viewers wait noticeably longer for it to start. Which arrangement does the chapter offer, and why does it work?",
      opts: [
        "A content delivery network, because copies held in several locations let the nearest one answer",
        "A private cloud, because owning the infrastructure gives the museum direct control over how quickly the video is delivered",
        "Grid computing, because dividing the video among many small machines lets them deliver the pieces in parallel",
        "A faster connection at the museum&rsquo;s own server, because the delay comes from the capacity of that connection rather than from distance"
      ],
      a: 0,
      why: [
        "Correct. The chapter says the larger the geographical distance between a user and the web server hosting the content, the longer transmission takes, and that a content delivery network reduces this latency with servers in various geographical locations holding copies, the closest one delivering the content.",
        "A private cloud changes who owns and controls the machines, and the chapter values it for customizability and control. It does nothing about the distance between one location and a viewer on another continent.",
        "Grid computing applies many machines to a single large computation. Delivering a video to a distant viewer is a transmission problem, not a calculation that can be divided into chunks.",
        "Capacity at the origin can matter, and the chapter treats bandwidth as a real constraint elsewhere. The cause it names for this particular delay is the distance itself, which is why the remedy is to move copies closer rather than to widen one connection."
      ]
    },
    {
      q: "A hypothetical charity runs forty servers in its own building, each using a small fraction of its capacity, and wants to cut both its power bill and its environmental impact. Which tactic does the chapter name first, and what does it do?",
      opts: [
        "Power management software, which stops individual machines idling overnight and so reduces the load on every server in the room",
        "Virtualization, which runs several separate computing environments on one physical machine so underused servers can be consolidated onto a few well-used ones",
        "Printing less, since paper waste is the largest environmental cost that an organization of this kind carries",
        "Disposing of the least used servers immediately, since equipment that is doing almost nothing still draws power and still has to be cooled, and costs more to keep than it would cost to replace"
      ],
      a: 1,
      why: [
        "Power management software is one of the chapter&rsquo;s tactics and does recover energy wasted by machines left idling or on standby overnight. It is aimed at individual desktops rather than at a room of servers each running well below capacity.",
        "Correct. The chapter says organizations can save large amounts of money on power and cooling by using virtualization to replace many individual servers with far fewer machines, and notes that computing resources in organizations are often very much underutilized.",
        "Printing less is a genuine tactic on the chapter&rsquo;s list, but it addresses paper waste rather than the power and cooling drawn by underused servers, and the chapter makes no claim that paper is the largest cost.",
        "Retirement is a decision the chapter treats carefully rather than quickly. Companies cannot just send retired equipment to a landfill, drives must be wiped of user data, and usable machines are refurbished or dismantled for recycling and safe disposal."
      ]
    }
  ]
};
