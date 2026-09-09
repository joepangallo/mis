/* ===== s33a ===== */
PROSE.s33a = `
<span class="eyebrow">Section 3&ndash;3a</span>
<h2>Why infrastructure goes out of date</h2>
<p class="lede">Nothing in the last six sections wears out like a delivery van. A server that has run six years faultlessly is still a working machine, and still the wrong machine. That gap &mdash; between equipment that works and equipment that is enough &mdash; is this objective.</p>

<h3>What obsolescence actually means</h3>
<p>Obtaining, operating, maintaining and upgrading an infrastructure is a tremendous challenge, and one clause makes it a management problem: especially when these tasks are not part of the core business. A clinic treats people; it does not want to be deciding when to replace three hundred computers.</p>
<p>The everyday sense is wrong. A thing is obsolete not because it is broken but because what it can do has fallen behind what is needed. The requirement moved out from under it.</p>
<p class="takeaway">Ask what the organization can no longer do, not what has failed. Obsolescence is a capability gap, and a fleet with a perfect maintenance record can have an enormous one.</p>

<h3>Generations of computing</h3>
<p>Shifts in computing eras came from fundamental changes in how the technology worked, and each is a <b>generation of computing</b>: vacuum tubes, transistors, integrated circuits, cheap multimedia computers, widespread internet access, mobile connectivity, and now artificial intelligence and quantum computing.</p>
<p>Put the shifts in order. The chain of era names is the clue: mainframe, personal, interpersonal, internetworking, cloud.</p>

<div class="activity" data-activity="obsGenerations"></div>

<p>Now the same list, with a different question: what each generation let an organization do that it could not do before.</p>

<div class="activity" data-activity="obsMatch"></div>

<h3>Moore&rsquo;s law, and what it is not</h3>
<p>In 1965 Gordon Moore, a cofounder of Intel, hypothesized that transistor counts on a chip would double at regular intervals, naming no period. That became <b>Moore&rsquo;s law</b>. The first processor held a few thousand transistors; current ones hold billions.</p>
<p>The word &ldquo;law&rdquo; does the damage, inviting students to treat a business trend as physics. Four qualifications keep it usable.</p>
<ul class="keys">
<li><b>It is an empirical observation</b> &mdash; nothing in physics requires the doubling; the industry partly treated it as a roadmap it agreed to hit.</li>
<li><b>The interval was restated</b> &mdash; the original described roughly annual doubling; the two-year figure came from a later revision.</li>
<li><b>The pace has slowed</b> &mdash; the chapter half concedes it, saying gains are now shaped by technological and economic limits, not engineering alone.</li>
<li><b>Gains increasingly come from parallelism</b> &mdash; from more cores working at the same time, rather than one core running proportionally faster each year.</li>
</ul>
<p>What survives is the shape. Capability per dollar has risen relentlessly for decades, so a machine bought five years ago competes against something far more capable at the same price &mdash; and nothing has to break for that to cost something.</p>

<h3>Faster cycles, and devices nobody chose</h3>
<p>Rising capability is both blessing and curse: it enables applications that were impossible before, and forces managers to keep deciding when to upgrade. Two pressures make the timing harder.</p>
<ul class="keys">
<li><b>Cycles have shortened sharply</b> &mdash; managers traditionally planned on five years; manufacturers now release new devices every six to twelve months.</li>
<li><b>Consumerization of IT</b> &mdash; devices people choose for themselves arrive at work, and the organization must integrate, secure and support equipment it never chose.</li>
</ul>
<p>The second is governance dressed as hardware: the organization carries every consequence of a device it never bought.</p>

<div class="activity" data-activity="obsQuiz1"></div>

<h3>Software gets old too, and takes the hardware with it</h3>
<p>Each new generation of application software promises better performance and more features, using the increased hardware power. That promise arrives with three strings attached.</p>
<ul class="keys">
<li><b>New operating systems often require new hardware</b> &mdash; a newer system offers a richer feature set, but only on machines meeting its requirements.</li>
<li><b>Older applications may stop working</b> &mdash; older application software may be incompatible with the new operating system, so upgrading one program strands another.</li>
<li><b>The productivity gain is a claim, not a receipt</b> &mdash; upgrades may raise productivity and often do not; the cost is incurred either way.</li>
</ul>
<p>Some ageing is deliberate. <b>Planned obsolescence</b> means designing a product to last only a certain life span: unserviceable components force a whole device to be replaced, and older software may be unable to open newer file formats, or support simply ends.</p>
<p>Mainstream support for Windows 10 ended in October 2025, with paid security updates for a limited period and a successor carrying strict hardware requirements. Nothing about those machines changed that day; the terms for using them did.</p>

<div class="callout warn"><b>Why an upgrade is a project, not a purchase.</b> Two costs run at once: the hardware and software, which is the number in the proposal, and the time to upgrade hundreds or thousands of computers, which is usually larger and rarely argued about.</div>

<h3>The treadmill, and the bill it leaves outside</h3>
<p>Put the halves together and they form a loop. More powerful hardware <b>enables</b> more powerful software; more powerful software then <b>requires</b> more powerful hardware. Nobody need act in bad faith; together they never stop turning.</p>
<p>The loop also has a cost on nobody&rsquo;s invoice. Rapid hardware obsolescence is expensive for the environment, in resources to manufacture new systems and dispose of old ones &mdash; a thread picked up later under green computing.</p>
<p>Seven pressures point at one building: obsolescence, diminishing space, expanding storage, rising energy use, fluctuating demand, the need for agility, and <b>AI infrastructure</b> &mdash; the specialized processors and unusually large, fast storage model-building needs.</p>

<div class="activity" data-activity="obsDrivers"></div>

<p class="takeaway">An infrastructure is not bought once. It is rented from the future in instalments, and obsolescence falls due whether or not anything has broken.</p>

<div class="activity" data-activity="obsQuiz2"></div>
`;

ACT.obsGenerations = {
  kind: "order",
  label: "Sequence",
  title: "The generations of computing, in order",
  how: "Put the seven shifts into the order the chapter gives them, then read why each one sits where it does.",
  objective: "3.3",
  intro: "Do not try to recall the years. Each shift ends one era and opens the next, and the chain of era names carries you through: mainframe, personal, interpersonal, internetworking, cloud. Work out which technology could only have come after which, and the sequence assembles itself.",
  steps: [
    {
      t: "Vacuum tubes. The mainframe era begins, and the machines named ENIAC and UNIVAC are developed.",
      why: "This is the first generation because it is the first working answer to the filing-cabinet problem. The machines are enormous, few, and operated by specialists, which is exactly what a mainframe era means: the computer is a facility that an organization visits rather than a tool anyone holds."
    },
    {
      t: "Transistors. The mainframe era expands, and UNIVAC is updated with the new components.",
      why: "Nothing about the role of the computer changes here, which is why it expands the era rather than ending it. Transistors do the same switching job as a vacuum tube while being smaller, cooler and far more reliable, so an organization can afford more computing than before without rethinking what computing is for."
    },
    {
      t: "Integrated circuits. The mainframe era ends and the personal computer era begins; the IBM 360 arrives with a general-purpose operating system, and the microprocessor revolution brings Intel, Microsoft, Apple, the IBM PC and MS-DOS.",
      why: "Putting many components onto one chip is what makes a computer small and cheap enough to sit on a desk, so this is the shift that moves computing out of the machine room. Notice the general-purpose operating system in the same row: the moment hardware becomes plentiful, the layer that hides it becomes valuable."
    },
    {
      t: "Multimedia and low-cost personal computers. The personal computer era ends and the interpersonal computing era begins, with high-speed microprocessors and networks, high-capacity storage, and low-cost integrated video, audio and data.",
      why: "Once machines are cheap and connected to one another, the interesting thing is no longer the machine but what passes between people using them. The era name says so: interpersonal computing follows personal computing because you need the personal machines to exist first."
    },
    {
      t: "Widespread internet accessibility. The interpersonal computing era ends and the internetworking era begins, with access to the internet from a broad variety of devices while prices keep dropping and performance keeps expanding.",
      why: "This is the point at which the value of a machine starts to depend mostly on what it can reach. Local networks connected colleagues; widespread internet access connects an organization to everyone else, which is the precondition for every business use in the last section of this module."
    },
    {
      t: "Ubiquitous mobile connectivity. Powerful mobile devices arrive and the cloud computing era begins, alongside Big Data, the Internet of Things and social networking.",
      why: "Connectivity stops being something you sit down to use and starts following the person, which is what makes renting computing sensible: if the device is small and always connected, the heavy work can happen somewhere else. That is the whole premise of the objective after this one."
    },
    {
      t: "Artificial intelligence and quantum computing, with the rapid rise of generative AI algorithms.",
      why: "This row is the current shift rather than a finished period, which is why it has no start year in the chapter. It matters for infrastructure because it changes what an organization has to supply: different processors, different storage, and skills that a traditional technology department may not have."
    }
  ]
};

ACT.obsMatch = {
  kind: "match",
  label: "Match",
  title: "Each generation and what it made possible",
  how: "Pair each defining technology with the change it produced for organizations, then read why the pairing holds.",
  objective: "3.3",
  pairs: [
    {
      l: "Vacuum tubes",
      r: "Rooms of file folders begin to be replaced by a machine that can store records and find them again",
      why: "The chapter frames the first generation against what came before it: filing cabinets, difficult retrieval, and knowledge that walked out of the door with the employee who held it. The first computers were a solution to a storage and retrieval problem, not a productivity gadget."
    },
    {
      l: "Transistors",
      r: "The same computing work is done by smaller, cooler and more reliable parts, so organizations can afford more of it",
      why: "This is the generation that changes the economics without changing the concept. More reliable components mean less downtime and more machines within reach of a normal budget, which is why the chapter records the era as expanding rather than ending."
    },
    {
      l: "Integrated circuits",
      r: "Computing leaves the machine room: a computer becomes something a department, and then a person, can own",
      why: "Packing many components onto a single chip is what made a computer small and cheap enough to be personal. The general-purpose operating system in the same row is the other half of the change, because ordinary owners need a layer that hides the hardware from them."
    },
    {
      l: "Multimedia and low-cost personal computers",
      r: "Machines become cheap enough to be everywhere and capable enough to carry video, audio and data together",
      why: "Cheap capable machines plus networks are what turn computing from something you do alone into something you do with other people, which is why the chapter names the era that follows interpersonal computing."
    },
    {
      l: "Widespread internet accessibility",
      r: "The value of a machine starts to depend on what it can reach rather than on what it holds",
      why: "Once the internet is broadly available from many kinds of device, an organization is reachable by anyone and can reach anyone, which is the foundation of every business use of the internet this module discusses later."
    },
    {
      l: "Ubiquitous mobile connectivity",
      r: "Computing follows the person, and the heavy work starts moving to somewhere else that is always reachable",
      why: "The chapter puts the beginning of the cloud computing era in this same row for exactly that reason. A small device that is always connected does not need to hold the capability itself, which is the argument the next objective develops in full."
    },
    {
      l: "Artificial intelligence and quantum computing",
      r: "The infrastructure question changes shape, because the new work needs different processors, different storage and different skills",
      why: "This is the only row that is still open, and the chapter lists it as a current shift rather than a completed period. It reappears in the next section as one of the seven drivers, since an organization new to this work faces large costs and integration challenges."
    }
  ]
};

ACT.obsDrivers = {
  kind: "diagram",
  label: "Interactive diagram",
  title: "The seven pressures, and the loop underneath them",
  how: "Open each view: the first is the map of what pushes an infrastructure to change, and the second is the mechanism that keeps it pushing.",
  objective: "3.3",
  models: [
    {
      id: "drivers",
      name: "The seven drivers",
      site: "Seven arrows pointing inward at one building, which stands for the organization and its data center",
      boxes: [
        {c: "a", t: "Space and storage", w: "Diminishing space and expanding storage"},
        {c: "b", t: "Consumption and demand", w: "Expanding consumption and fluctuating demand"},
        {c: "c", t: "Obsolescence", w: "Hardware and software falling behind what is needed"},
        {c: "d", t: "Agility and AI", w: "The need to move fast and the need for AI infrastructure"}
      ],
      points: [
        "The arrows all point inward, and that is the argument of the figure: none of these pressures is generated inside the organization, yet every one of them lands on it and has to be paid for by it.",
        "<b>Increasing obsolescence</b> is this section&rsquo;s subject. Hardware and software investments stop being current faster than they stop working, so the decision to replace is never forced by a failure.",
        "<b>Diminishing space</b> and <b>expanding storage</b> are the growth pressures: more data retained every year, and more equipment holding it inside a room that does not grow.",
        "<b>Expanding consumption</b> is the electricity pressure, and it is the one the label hides. More powerful machines draw more power to work and then more power again to be cooled, so the same upgrade appears twice on the same bill.",
        "<b>Fluctuating demand</b> is the shape pressure. The work does not arrive evenly, so capacity bought for the peak is idle the rest of the time and capacity bought for the average fails at the peak.",
        "<b>Need for agility</b> and <b>AI infrastructure</b> are the two that most directly argue for renting rather than owning, and both are taken up in the next section and then answered in the objective after it."
      ]
    },
    {
      id: "treadmill",
      name: "The upgrade treadmill",
      site: "Two arrows forming a closed loop between hardware and software, each one labelled with what it does to the other",
      boxes: [
        {c: "a", t: "Powerful hardware", w: "A more capable machine becomes available"},
        {c: "b", t: "Enables", w: "Software can now do things it could not do before"},
        {c: "c", t: "Powerful software", w: "The next release is built to use that capability"},
        {c: "d", t: "Requires", w: "So it will not run acceptably on the older machines"}
      ],
      points: [
        "Read it as a circle rather than a line. There is no first cause and no end: each side of the loop is a sensible decision that makes the other side inevitable.",
        "Nobody in the loop is behaving badly. A vendor that writes software making full use of a capable machine is doing its job, and a manager who wants the new capabilities is doing hers.",
        "The loop is why obsolescence arrives on a schedule the organization did not set. The trigger is a release somewhere else, not a fault in anything the organization owns.",
        "The same shape appears again with data: richer content and more analysis require more storage and more bandwidth, which make richer content possible, which the chapter calls a vicious circle.",
        "It leaves a cost outside the accounts altogether, in the resources needed to manufacture the new equipment and to dispose of the old, which is where green computing enters later in this module."
      ]
    }
  ]
};

ACT.obsQuiz1 = {
  kind: "quiz",
  label: "Check yourself",
  title: "Obsolescence, Moore&rsquo;s law and shortening cycles",
  how: "Four options, one best answer; read every explanation, including the ones for options you did not choose.",
  objective: "3.3",
  questions: [
    {
      q: "A hypothetical veterinary practice is told its computers are fine because none of them has failed in four years. What is the chapter&rsquo;s objection to that reasoning?",
      opts: [
        "Equipment becomes unreliable at a predictable age, so a fixed four-year replacement cycle removes the need for judgment",
        "Obsolescence is measured against what the organization now needs to do",
        "Obsolescence applies to software rather than hardware, so the age of the machines is not the relevant question at all",
        "The practice has not depreciated the equipment correctly, so the replacement decision is really an accounting matter"
      ],
      a: 1,
      why: [
        "Age and reliability are related but they are not the argument here. The chapter never claims machines fail on a schedule, and a replacement rule set by the calendar would still miss the reason for replacing them.",
        "Correct. The chapter describes accelerating obsolescence of hardware and software investments, driven by advances that enable business processes which were not previously possible. The gap is between capability and requirement, so a fault-free fleet can be badly obsolete.",
        "Both age. The chapter devotes one part of this objective to hardware obsolescence and the next to software obsolescence, and its central figure shows each one forcing the other along.",
        "How the asset is carried in the accounts changes the timing of a cost, not the capability of the machine. A fully depreciated computer that does everything required is not obsolete, and a new one that cannot run the software is."
      ]
    },
    {
      q: "A student reads that transistor counts have doubled at regular intervals for decades and concludes that computing power is guaranteed to keep doubling. Which correction does the chapter&rsquo;s own wording support?",
      opts: [
        "The doubling describes storage capacity rather than transistor counts, so the conclusion applies to the size of disks instead of to the speed of processors, and the student has read a real observation against the wrong quantity",
        "The prediction was made for a fixed number of years and then expired, so nothing follows from it about any period after that",
        "It is a prediction about how many transistors fit on a chip, and it stopped being reported once chips passed a billion transistors",
        "It is an observation rather than a physical law, and its gains are now limited by technological and economic factors"
      ],
      a: 3,
      why: [
        "The prediction concerned the number of transistors on a chip. Storage capacity has its own history, and this module treats growing storage as one of the seven separate drivers rather than as the same claim.",
        "The chapter says the opposite about the term: when the prediction was made, it was not limited to any specified period of time. What has changed is the pace, not an expiry date somebody wrote down.",
        "Transistor counts are still reported, and the chapter uses exactly that comparison as its evidence, from a couple of thousand on the first processor to billions on current ones.",
        "Correct. The chapter itself says that, given technological and economic limitations, today&rsquo;s gains in computing power are increasingly realized by adding more cores that perform tasks in parallel, which is a very different statement from a guarantee."
      ]
    },
    {
      q: "The technology manager of a hypothetical staffing agency has always planned equipment on a five-year horizon and finds it no longer works. Which two pressures does the chapter name beyond the underlying advance in capability?",
      opts: [
        "Shorter release cycles, with new versions of devices every six to twelve months, and the consumerization of IT bringing employees&rsquo; own devices into the infrastructure",
        "Longer vendor contracts and a shortage of technical staff, which together stretch every upgrade well beyond the window it was planned for and leave the fleet part-new and part-old for years at a time",
        "Rising energy prices and shrinking floor space, which make each replacement cycle more expensive than the one before it",
        "Falling equipment prices and improving reliability, which together make a five-year plan unnecessarily cautious"
      ],
      a: 0,
      why: [
        "Correct. The chapter names exactly these two beyond the capability trend: manufacturers now release new versions of devices every six to twelve months where managers once thought in terms of about five years, and consumerization means integrating users&rsquo; own mobile devices.",
        "Staffing and contract length are real difficulties, but they are not the two factors the chapter identifies here, and neither of them explains why the planning horizon itself has to shrink.",
        "Energy and space are genuinely on the chapter&rsquo;s list of seven drivers, and they are covered in the next section. They are pressures on the infrastructure rather than reasons the replacement cycle has shortened.",
        "Prices falling and reliability improving would argue for a longer horizon, not a shorter one, which is the opposite of the situation the manager is describing."
      ]
    }
  ]
};

ACT.obsQuiz2 = {
  kind: "quiz",
  label: "Check yourself",
  title: "Software obsolescence and the loop it belongs to",
  how: "Three situations on the second half of this section; every option explains itself, including the three you do not pick.",
  objective: "3.3",
  questions: [
    {
      q: "A hypothetical community college learns that the operating system on its lab machines will stop receiving mainstream support, that paid extended security updates are available for a limited period afterwards, and that the successor version has strict hardware requirements. Which concept does the chapter use for this?",
      opts: [
        "Consumerization of IT, since the decision about which system to run has effectively moved outside the organization and is now being made by the people who supply the devices staff already use at home",
        "A generation of computing, since a change of operating system is one of the fundamental shifts in how computing technologies work",
        "Planned obsolescence, in which a product is designed to last a certain life span and withdrawn support forces a decision the machines themselves would never have forced",
        "Fluctuating demand, since the pressure on the college arrives at a specific date rather than evenly across the year"
      ],
      a: 2,
      why: [
        "Consumerization concerns employees&rsquo; own devices arriving at work and having to be integrated. Here the college chose and owns the machines; what it does not control is how long the vendor keeps supporting them.",
        "A generation of computing is a fundamental change in the way computing technologies work, such as the move from vacuum tubes to transistors. A new version of an operating system is an ordinary product release inside one generation.",
        "Correct. The chapter gives ceasing support for a product as one of its two examples of planned obsolescence, alongside older software that cannot open newer file formats, and notes that this effectively forces users to switch.",
        "Fluctuating demand is about the volume of work arriving unevenly, which the next section covers. A support deadline is a date, not a spike in the amount of work the machines are being asked to do."
      ]
    },
    {
      q: "A hypothetical publisher notices that every hardware purchase is justified by software that will not run on the old machines, and every software upgrade is justified by capabilities the new machines made available. A director asks whether someone is manipulating them. What does the chapter&rsquo;s figure actually describe?",
      opts: [
        "A loop in which more powerful hardware enables more powerful software, which in turn requires more powerful hardware, with each step a reasonable decision on its own",
        "A misunderstanding, because hardware capability and software capability advance quite independently of one another and any apparent link between the two is a coincidence of timing rather than a mechanism",
        "A purchasing failure, which disappears once the organization buys hardware and software from the same vendor under one agreement",
        "A financing question, since the pattern stops mattering as soon as the equipment is leased rather than bought outright"
      ],
      a: 0,
      why: [
        "Correct. The chapter draws two arrows: powerful hardware enables powerful software, and powerful software requires powerful hardware. Naming it as a loop is what lets a manager plan for it rather than be surprised by each turn.",
        "They plainly do not advance independently, which is the entire content of the figure. New operating systems use new processor architectures, and older applications may not run on them at all.",
        "Buying from one vendor changes who sends the invoices. It does not change the fact that a more capable machine invites more demanding software, which then makes the previous machines inadequate.",
        "Leasing changes how the cost is spread over time, and it may make replacement easier to schedule, but the equipment still has to be replaced on the same cycle for the same reason."
      ]
    },
    {
      q: "A hypothetical charity is deciding whether to replace six hundred aging computers and is comparing the vendor quotation against doing nothing. Which cost does the chapter say organizations most often leave out of that comparison?",
      opts: [
        "The purchase price of the software licences, which is normally quoted separately from the hardware and easily overlooked",
        "The time and resources needed to carry out the upgrade across every machine",
        "The cost of retraining every member of staff, which the chapter treats as the single largest component of any upgrade",
        "The interest forgone on the money spent, since the comparison should be made against leaving the funds invested"
      ],
      a: 1,
      why: [
        "Licence costs are part of the quoted cost of hardware and software, and they are visible in the proposal. The chapter separates the visible purchase from the invisible labour precisely because the second is the one that gets missed.",
        "Correct. The chapter counts both costs for hardware and software and the time and resources needed for upgrading tens, hundreds or thousands of computers, and it is the second that scales with the size of the fleet.",
        "Training genuinely matters and often accompanies a major change, but the chapter does not single it out as the largest component, and an upgrade to a familiar system may need very little of it.",
        "The opportunity cost of the money is a legitimate part of any investment appraisal, and it is not the omission the chapter is pointing at in this passage."
      ]
    }
  ]
};
