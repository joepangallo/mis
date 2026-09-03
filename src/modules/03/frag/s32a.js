/* ===== s32a ===== */
PROSE.s32a = `
<span class="eyebrow">Section 3&ndash;2a</span>
<h2>Why infrastructure is a management question</h2>
<p class="lede">A city works because of things almost nobody looks at: pipes under the road, cables under the pavement, a power station somewhere outside town. You notice them on the day one of them stops. Organizations have the same layer underneath them, made of machines and programs and wire instead of concrete, and this module is about that layer &mdash; what it is made of, why it never stays finished, and who ends up paying for it.</p>

<h3>Infrastructure is the part you only see when it breaks</h3>
<p>Start with the ordinary meaning of the word. A city&rsquo;s infrastructure is the shared foundation everything else is built on. You do not lay your own roads when you open a shop; you rely on the ones already there, and your shop is only ever as good as they are.</p>
<p>An organization&rsquo;s technology works the same way. The <b>information systems infrastructure</b> is the shared foundation of machines, programs, storage and connections that every application in the company runs on. No single department owns it, everyone depends on it, and most of the time nobody thinks about it at all.</p>
<p>That last part is exactly why it is a management question and not a purely technical one. Decisions about a foundation are made once and lived with for years, they are expensive to reverse, and they quietly settle what the business is able to attempt later. Somebody who cannot name the parts cannot judge a proposal about them.</p>

<h3>The companies you know for something else</h3>
<p>The chapter opens with a handful of companies nearly everybody in the developed world can name, and it names each one for the product you would think of first: Apple for its laptops, phones and tablets, Microsoft for its operating system and productivity software, Facebook for its social network, Google for its search engine.</p>
<p>Then it points out how little that captures. Google also works on driverless cars and other technologies, on life sciences, on investment capital, and on space exploration through its investments in SpaceX. Many of those ventures, in the chapter&rsquo;s own phrase, did not fall neatly under a search engine company, and billions of dollars were going into research projects that investors did not always view favourably.</p>
<p>The answer was structural. A holding company called <b>Alphabet</b> was created, placing around a dozen companies under one umbrella &mdash; the robotics business Intrinsic, the life sciences company Verily, the autonomous driving company Waymo, and the others the chapter groups as the &ldquo;Other Bets&rdquo; &mdash; so that financial reporting now shows where revenue is generated and where investments in new ideas are being made.</p>
<p>Then comes the sentence this whole module hangs from. Beyond the holding company itself, what unites those very different businesses is <b>the need for a reliable and high-performing information systems infrastructure</b>. A robotics company and a search engine have almost nothing in common except that neither of them works if the machines underneath it do not.</p>
<p>The chapter reports the scale of what Google built for itself, and two things in that report should be read differently.</p>
<ul class="keys">
<li><b>The count is a snapshot</b> &mdash; the chapter gives a number of data center locations across a number of countries in the opening case and a different, smaller figure later on, so read it as a few dozen major sites spread over many countries rather than as an exact tally that will still be right next year.</li>
<li><b>The reason is not a snapshot</b> &mdash; those sites exist so that people all over the world get a fast and reliable answer, and speed and reliability at that scale are bought with buildings, electricity and network capacity rather than with clever programming alone.</li>
</ul>

<h3>Selling the thing you had to build anyway</h3>
<p>Having built that foundation for its own products, Google now rents it to other organizations as <b>cloud computing</b> services, ranging from basic computing, storage and networking through to analytics, artificial intelligence and security. Module 2 gave this move a name &mdash; a capability built for internal use turned into something customers pay for &mdash; and here it is again, down in the plumbing.</p>
<p>The chapter is careful to say that Google is not alone in doing this, and equally careful to say that not everybody does it. That contrast is the most useful part of the whole case.</p>
<ul class="keys">
<li><b>Rented out</b> &mdash; Google, Microsoft with Azure and Amazon with Amazon Web Services each built a high-performing, reliable infrastructure to support their own operating model, and now capitalize on that investment by selling capacity on it to everybody else.</li>
<li><b>Kept in-house</b> &mdash; Apple uses its data centers only to host services for users of the Apple ecosystem, and the company that owns the Facebook app, whose corporate parent renamed itself Meta in 2021, uses its own only to power that social network and its generative artificial intelligence models.</li>
<li><b>The judgment underneath</b> &mdash; either choice can be the right one, because renting your foundation out turns a cost into revenue, but it also turns you into a supplier with customers, outages and support obligations that you did not have the week before.</li>
</ul>
<p>The chapter closes the case by asking the student three questions. They are worth writing down, because they turn out to be the map of this entire module.</p>
<ol class="steps">
<li><b>How does a company benefit from a well-functioning infrastructure?</b> That is objective 3.2 &mdash; the five components and what each one contributes &mdash; which is the rest of this section and the five sections that follow it.</li>
<li><b>Why would companies use cloud computing?</b> That is objective 3.3 and the first half of objective 3.4: what goes wrong when you own the foundation yourself, and what renting somebody else&rsquo;s actually fixes.</li>
<li><b>What should an organization consider when it builds on infrastructure provided by somebody else?</b> That is the second half of objective 3.4, where the module stops describing the cloud and starts asking what to establish before signing anything.</li>
</ol>

<div class="activity" data-activity="infQuiz1"></div>

<h3>The five parts, named once</h3>
<p>This objective takes the infrastructure apart into five components and then walks them in order. You are not expected to understand them yet; the point of naming them here is that from now on every unfamiliar thing in this module is one of these five, or a decision about one of these five.</p>
<ul class="keys">
<li><b>Hardware</b> &mdash; the physical machines that run the applications and databases an organization needs, from the phone in a pocket to the racks of servers that answer everybody at once.</li>
<li><b>System software</b> &mdash; the programs that control the basic operations of those machines, so that an application can ask for something to be saved without knowing what kind of disk is fitted.</li>
<li><b>Storage</b> &mdash; the place data stays when the day ends and the power goes off, which is a different question from where it is being used while somebody is working on it.</li>
<li><b>Networking</b> &mdash; the sharing of data or services between machines, which is what turns five separate pieces of equipment into something an organization can actually use.</li>
<li><b>Data centers</b> &mdash; the dedicated space the equipment lives in, with the power, the cooling and the physical security that keep it running, because all of that has to be bought by somebody.</li>
</ul>
<p>Those five are easier to hold onto if you follow one ordinary request through them. The diagram takes each component in turn and shows what it is, what its single job is, where it appears when you tap a button to place an order, and what you notice on the day it is missing.</p>

<div class="activity" data-activity="infStack"></div>

<h3>What a well-run infrastructure is actually worth</h3>
<p>The objective opens with a claim about value, and it names three different kinds. Two of them you already met in Module 2, so they get one clause each here rather than a re-teaching.</p>
<ul class="keys">
<li><b>Efficiency</b> &mdash; the extent to which goals are accomplished faster, at lower cost, or with relatively little time and effort, which is the value most people assume technology is for and the easiest of the three to measure.</li>
<li><b>Effectiveness</b> &mdash; the extent to which goals and tasks are accomplished well, which is a different question and often a more valuable one, since a process can be fast and still produce the wrong result.</li>
<li><b>Agility</b> &mdash; the ability to change what the organization does and to change it quickly, which the chapter says computing, storage and networking increasingly deliver, and which is the newest of the three arguments.</li>
</ul>
<p>Agility is the one worth slowing down on, because it is the reason so much of this module is about renting rather than owning. Efficiency and effectiveness both ask how well you are doing the work you already do. Agility asks a different question: how fast could you do something else instead.</p>
<p>The chapter attributes the rising importance of agility to increasing <b>digital density</b> &mdash; more of the world, and more of every business process in it, now existing as data that something can act on. The denser that gets, the more often the answer to a business problem turns out to be a technology decision, and the more it costs to be slow at making them.</p>
<p class="takeaway">Efficiency is doing today&rsquo;s work faster, effectiveness is doing it well, and agility is being able to do tomorrow&rsquo;s work at all. An infrastructure decision usually trades one against another, which is why it belongs to a manager rather than only to a technician.</p>

<h3>Why this is your problem even if you never touch a server</h3>
<p>The chapter puts its own answer to that in a box aimed squarely at students who do not intend to work in technology, and its argument runs in four beats. They are worth taking seriously rather than reading past, because each one describes a specific thing that goes wrong when a manager does not have this vocabulary.</p>

<div class="activity" data-activity="infWhy"></div>

<p>Notice which of the four does the most work. The first says the subject is unavoidable, the second says it makes you easier to work with, and the fourth says it protects you personally. The third is the one that reaches back into Module 2.</p>
<p>Businesses able to make use of cloud services, connected devices and artificial intelligence infrastructure are better placed to innovate and to respond when their market moves. The chapter&rsquo;s warning is that without this material you might simply overlook how technology could be used strategically at all, and you cannot recommend a move you are unable to picture.</p>

<div class="activity" data-activity="infQuiz2"></div>

<h3>Where this section hands you on</h3>
<p>The rest of objective 3.2 walks the five components in the order they were named. Hardware comes first, because everything else is a program running on a machine somewhere; then system software, then storage, then two full sections on networking, because the internet and the World Wide Web are large enough to need them; then the buildings, and the two arrangements that put the whole foundation to work for employees and for business partners.</p>
<p>After that the module changes its question twice. Objective 3.3 asks why an infrastructure you own never stays finished, and objective 3.4 asks what changes when you rent one instead. Keep the case in this section in view while you read them: a company whose foundation was so good that other organizations started paying to use it.</p>
<div class="callout tip">
<b class="tagline">The habit worth forming now</b>
<p>Every time this module introduces something new, ask which of the five components it belongs to and which of the three values it is supposed to deliver. Those two questions turn a list of unfamiliar words into a small number of recurring decisions, and they are the same two questions a manager asks when somebody arrives with a proposal and a price.</p>
</div>
`;

ACT.infStack = {
  kind: "diagram",
  label: "Interactive diagram",
  title: "The five components, and one ordinary request passing through them",
  how: "Pick a component to see what it is, what its single job is, where it appears when somebody taps a button to place an order, and what you notice when it is missing.",
  objective: "3.2",
  models: [
    {
      id: "hardware",
      name: "Hardware",
      site: "The physical machines, from the phone in a pocket to the racks in a locked room",
      boxes: [
        {c: "a", t: "What it is", w: "The machines that run the applications and databases"},
        {c: "b", t: "Its one job", w: "Doing the computing work itself"},
        {c: "c", t: "In an ordinary order", w: "Your phone, and the machine that answers it"},
        {c: "d", t: "Missing", w: "There is nothing for anything else to happen on"}
      ],
      points: [
        "Organizations carry out hundreds or thousands of different activities, so they need several different <b>types</b> of computer to support them. A machine sized for one designer is not the machine that serves ten thousand customers at the same moment.",
        "Hardware is where the spending is most visible, which is also why it is where the arguments start. It wears out, it is bought in whole units, and it has to be paid for whether or not it is busy.",
        "A good deal of the hardware in a modern organization is not a computer in any form an ordinary person would recognise &mdash; the small controllers that start and stop a production line, or the sensors reporting a temperature every few seconds.",
        "Section 3&ndash;2b takes this apart properly, from the classes of computer up through the specialised processors that explain why an artificial intelligence project carries a different budget line from an ordinary one."
      ]
    },
    {
      id: "systemsoftware",
      name: "System software",
      site: "The layer sitting between an application and the machine it happens to be running on",
      boxes: [
        {c: "a", t: "What it is", w: "Programs controlling the basic operations of the hardware"},
        {c: "b", t: "Its one job", w: "Letting software be written once, not per machine"},
        {c: "c", t: "In an ordinary order", w: "The operating system handing the app the screen"},
        {c: "d", t: "Missing", w: "Every program needs rewriting for every model of machine"}
      ],
      points: [
        "Application software does not talk to hardware directly. It asks the system software, and the system software talks to the machine, which is why one version of a program can run on equipment built by different manufacturers.",
        "The <b>operating system</b> is the most prominent kind of system software, coordinating the hardware components, the attached devices, the application software and the users all at once.",
        "This is the first appearance of an idea the whole module keeps reusing: put a common layer in the middle, and the things above it stop having to know anything about the things below it.",
        "Section 3&ndash;2c covers it, together with the reason a company&rsquo;s software eventually stops working on hardware that still switches on perfectly well."
      ]
    },
    {
      id: "storage",
      name: "Storage",
      site: "Where data stays once the power is off and the working day is over",
      boxes: [
        {c: "a", t: "What it is", w: "The place records are kept rather than used"},
        {c: "b", t: "Its one job", w: "Keeping data available for as long as it is needed"},
        {c: "c", t: "In an ordinary order", w: "The record of the order, still there tomorrow"},
        {c: "d", t: "Missing", w: "The organization forgets everything overnight"}
      ],
      points: [
        "Memory inside a running machine holds whatever is in use at this instant; storage is what survives the machine being switched off, and an organization needs far more of the second than of the first.",
        "Not all stored data has the same job. Today&rsquo;s live records, a nightly copy taken in case something fails, and records kept for years differ in how fast they must be reachable, how searchable they need to be, and how long they must last.",
        "Storage is the component that grows without anybody deciding to grow it. Nobody chooses to have more data; it accumulates as a by-product of operating, and the cost follows it.",
        "Section 3&ndash;2c covers storage alongside system software, because the choice of medium follows directly from what a given pile of data is actually for."
      ]
    },
    {
      id: "networking",
      name: "Networking",
      site: "The path from one machine to another, whether across a room or across the world",
      boxes: [
        {c: "a", t: "What it is", w: "The sharing of data or services between machines"},
        {c: "b", t: "Its one job", w: "Making the other four components reachable"},
        {c: "c", t: "In an ordinary order", w: "Everything between your tap and the answer"},
        {c: "d", t: "Missing", w: "Each machine becomes an island with a screen"}
      ],
      points: [
        "Taken alone, each individual piece of technology has little value; it is through connecting the different pieces that business value is realized. The best-performing database ever built is useless if the people who need it cannot reach it.",
        "A network needs three things and no fewer: two parties with something to share, a pathway between them, and rules that both sides follow. Remove any one of the three and nothing has been communicated.",
        "This is the component the internet and the World Wide Web belong to, which is why it needs two full sections rather than one, and why more of this module&rsquo;s vocabulary lives here than anywhere else.",
        "Sections 3&ndash;2d and 3&ndash;2e cover it, from what a network is at all up to how an address typed into a browser turns into a page in front of you."
      ]
    },
    {
      id: "datacenters",
      name: "Data centers",
      site: "The room or the building around all of the above, with its power and its cooling",
      boxes: [
        {c: "a", t: "What it is", w: "Dedicated space set aside for the infrastructure"},
        {c: "b", t: "Its one job", w: "Keeping the equipment running, cool and secure"},
        {c: "c", t: "In an ordinary order", w: "The building the answering machine stands in"},
        {c: "d", t: "Missing", w: "Equipment that overheats, loses power or walks away"}
      ],
      points: [
        "Equipment gathered in one place is easier to manage, repair, upgrade, power, cool and physically secure than the same equipment scattered through the cupboards of a dozen offices.",
        "The range of sizes is enormous, from a single room with one server in it to a purpose-built facility the size of a warehouse with its own generators and its own cooling plant.",
        "This is the component people forget, and it is the one that decides whether the other four are actually available at eight in the morning on the busiest day of the year.",
        "Section 3&ndash;2f covers it, along with the two arrangements &mdash; a private area for employees and a shared one for business partners &mdash; that put the finished foundation to work."
      ]
    }
  ]
};

ACT.infWhy = {
  kind: "explore",
  label: "Explore",
  title: "Four reasons this is not somebody else&rsquo;s subject",
  how: "Open each card and read all four panels; the third card is the one that connects this chapter back to the strategy material in Module 2.",
  objective: "3.2",
  labels: ["The claim, in one line", "What it looks like in an ordinary week", "What skipping it costs you", "What it lets you do"],
  items: [
    {
      icon: "BASE",
      name: "The foundation",
      sub: "It sits under nearly everything the organization does",
      what: "The information systems infrastructure forms the foundation of almost all organizational activities, from managing customer relationships and supply chains through to supporting decision-making and innovation.",
      real: "Every ordinary thing you do at work rests on it: a customer record that loads, a report that runs, a file a colleague in another building can open, a payment that clears while somebody is still standing at the counter.",
      absent: "Without a grasp of hardware, software, networks and data management, the chapter says, a future business leader risks missing critical opportunities or making uninformed decisions &mdash; and that sentence is aimed at business students rather than at technologists.",
      why: "It lets you treat an infrastructure proposal as a business proposal: what does this let us do, what does it stop us doing, and what happens to the business on the day it is not working."
    },
    {
      icon: "TALK",
      name: "The shared language",
      sub: "You will have to talk to technical people, and they to you",
      what: "Whether you are working on a marketing campaign, developing a new product or improving an internal process, you will have to collaborate with the people who run the technology.",
      real: "Somebody tells you the delay is a network issue, or that the request needs another server, or that the data is in the cloud. Each of those sentences means something specific, and each one has a cost and a timescale attached to it.",
      absent: "Not being able to speak the language of infrastructure produces misunderstandings in both directions. You cannot state what you actually need, and you cannot tell a genuine constraint from a convenient one.",
      why: "The chapter&rsquo;s claim is that understanding terms such as servers, cloud computing, cybersecurity and databases enables clear communication, reduces misunderstandings and achieves better outcomes. It is also the cheapest of the four to act on."
    },
    {
      icon: "EDGE",
      name: "The opportunities",
      sub: "Where this chapter reaches back into strategy",
      what: "Businesses able to make use of cloud services, the Internet of Things and artificial intelligence infrastructure are better positioned to innovate and to respond to changes in their market.",
      real: "A competitor tries four ideas in the time it takes you to buy the equipment for one, because it rented its foundation instead of buying it and simply stopped paying for the three experiments that did not work.",
      absent: "Without foundational knowledge of information systems, the chapter warns, you might overlook how technology can be used strategically to drive efficiency, customer satisfaction and growth. Nobody recommends a move they cannot picture.",
      why: "This is the hinge back to Module 2. Competitive advantage was the question there; here you learn what the answers are physically made of, and which parts of them a company would have to own rather than rent."
    },
    {
      icon: "SELF",
      name: "The personal skill",
      sub: "The same knowledge, turned on your own life",
      what: "Individuals manage personal data across several devices, rely on storage they do not own, and face security threats such as phishing and identity theft.",
      real: "Your photographs sit on somebody else&rsquo;s machines under an agreement you did not read, and your bank sends you a message that may or may not have come from your bank.",
      absent: "Not knowing how data is stored, transmitted and protected leaves you unable to tell which of those situations is safe, which is merely irritating, and which is the one that will take a year to undo.",
      why: "The chapter&rsquo;s conclusion is that this is not just a technical skill but a core life and business competency, one that supports smarter leadership, innovation and resilience in an increasingly digital world."
    }
  ]
};

ACT.infQuiz1 = {
  kind: "quiz",
  label: "Check yourself",
  title: "The case underneath the case",
  how: "Four options, one best answer; read every explanation, including the ones for the options you did not choose, since that is where the confusions get named.",
  objective: "3.2",
  questions: [
    {
      q: "The chapter describes a group of businesses that runs from search to robotics to life sciences to autonomous driving. Beyond the holding company itself, what does the chapter say unites them?",
      opts: [
        "A single shared product line, since each of the companies is ultimately a way of selling advertising against search results",
        "The need for a reliable and high-performing information systems infrastructure, which every one of them depends on",
        "A common set of customers, because the same people encounter each of the group&rsquo;s businesses in the course of a week",
        "Nothing beyond common ownership, since the chapter presents the restructuring as a purely financial arrangement"
      ],
      a: 1,
      why: [
        "Advertising revenue is real, but the chapter&rsquo;s own list of driverless cars, life sciences, investment capital and space exploration is precisely the point that these ventures did not fall neatly under a search engine company.",
        "Correct. The chapter states that beyond the holding company, what unites the different companies under the umbrella is the need for a reliable and high-performing information systems infrastructure.",
        "The customers barely overlap at all. A buyer of industrial robots, a health researcher and a person running a search are not one market, which is part of why a holding company was needed in the first place.",
        "The restructuring did change financial reporting, showing where revenue is generated and where investments in new ideas are made, but the chapter names the shared infrastructure specifically as the thing lying under all of them."
      ]
    },
    {
      q: "Every company named in the opening case operates large data centers. The chapter still draws a contrast between two groups of them. What is the contrast?",
      opts: [
        "Some run facilities of their own while the others rent all of their capacity from a third party",
        "Some build facilities in many countries while the others keep all of their equipment inside one country",
        "Some rent capacity on their infrastructure to other organizations, while the others use theirs only to run their own services",
        "Some use their facilities for artificial intelligence work while the others use theirs only to store records"
      ],
      a: 2,
      why: [
        "Every company in the case operates infrastructure of its own. The case is about what each of them then does with that infrastructure, not about which of them bothered to build one.",
        "The chapter does describe one company&rsquo;s sites as spread across many countries, but it never sorts the companies by geography, and a single-country footprint is not the distinction being drawn.",
        "Correct. Google, Microsoft with Azure and Amazon with Amazon Web Services capitalize on the investment by selling capacity, while Apple hosts services only for users of its own ecosystem and the owner of the Facebook app powers only that social network and its generative artificial intelligence models.",
        "Artificial intelligence appears on both sides of the contrast, among the services sold to other organizations and among the workloads a company runs on its own machines, so it cannot be what separates the two groups."
      ]
    },
    {
      q: "A manager at a hypothetical distribution company argues that because infrastructure produces nothing a customer ever buys, the right goal is always to spend as little on it as possible. Which reply does the chapter best support?",
      opts: [
        "Agree, because the chapter treats infrastructure spending as overhead to be squeezed wherever a business can get away with it",
        "Agree, but only for companies selling physical goods, since the chapter limits its argument to firms whose product is itself digital",
        "Disagree, because the chapter argues that an organization should aim to own the largest infrastructure it can afford, on the grounds that owned capacity is the only capacity that can be relied on",
        "Disagree, because the infrastructure creates value through efficiency, effectiveness and increasingly agility, and some firms sell the foundation they had to build anyway"
      ],
      a: 3,
      why: [
        "The chapter opens this objective by saying that computing, storage and networking technologies create value, and it spends its entire opening case on companies for which the infrastructure is central rather than incidental.",
        "The argument is not limited by industry. The chapter&rsquo;s later examples run from a parcel carrier&rsquo;s facilities to an electronics factory in which sensors and controllers automate three-quarters of the production process, and it says that almost any business today is an electronic business.",
        "Nothing in the chapter recommends owning as much as possible. The objectives that follow are largely about why owning is difficult and expensive, and about when renting somebody else&rsquo;s foundation is the better answer.",
        "Correct. The lead-in says these technologies create value by enabling efficiency and effectiveness and increasingly by enabling agility, and the case shows several firms turning the infrastructure they built for themselves into a service that other organizations pay to use."
      ]
    }
  ]
};

ACT.infQuiz2 = {
  kind: "quiz",
  label: "Check yourself",
  title: "Five components, three kinds of value",
  how: "Four options, one best answer; every situation naming no real company is a hypothetical written for practice, and every explanation says what the option would have described if it were right.",
  objective: "3.2",
  questions: [
    {
      q: "A hypothetical accounting firm lists its technology as the laptops and servers it owns, the operating systems running on them, the disks its records sit on, and the wiring and wireless equipment connecting them all. Which of the chapter&rsquo;s five components has been left off the list?",
      opts: [
        "Nothing has been left off, because those four descriptions cover all five components between them",
        "Data centers, meaning the dedicated space that houses the equipment and supplies its power, cooling and physical security",
        "Storage, because disks belong to hardware and the chapter means something different by storage",
        "Networking, because cables and wireless equipment are hardware rather than a network"
      ],
      a: 1,
      why: [
        "Four of the five are indeed present &mdash; hardware, system software, storage and networking &mdash; but the chapter names a fifth component, and it is the one that is a place rather than a thing.",
        "Correct. The five components are hardware, system software, storage, networking and data centers, and the space itself counts because power, cooling and physical security are decisions somebody has to make and pay for.",
        "The disks are on the list and storage is exactly what they are for. Storage is a separate component because what the data is for decides which medium it belongs on, not because disks somehow stop being physical.",
        "Cables and wireless equipment are physical, but the chapter counts networking as its own component because the value lies in the connection rather than in the parts, and this inventory does mention them."
      ]
    },
    {
      q: "The chapter says computing, storage and networking create value by enabling efficiency and effectiveness, and increasingly by enabling agility. What does the third of those add that the first two do not?",
      opts: [
        "The ability to carry out the current work at a lower cost for each unit than competitors manage",
        "The ability to carry out the current work to a higher standard, so that fewer results have to be corrected",
        "The ability to change what the organization does, and to change it quickly",
        "The ability to keep the current work running without interruption through an unusually busy period"
      ],
      a: 2,
      why: [
        "Accomplishing goals faster, at lower cost or with relatively little time and effort is efficiency, which is the first of the two the chapter already had and which Module 2 defined.",
        "Accomplishing goals and tasks well is effectiveness, the second of the two the chapter already had. Agility is not a measure of how good the output is.",
        "Correct. Efficiency is about doing the current work faster and more cheaply and effectiveness about doing it well, whereas agility is about being able to change course quickly, which is why the chapter ties its rising importance to increasing digital density.",
        "Staying available under load is a genuine requirement and the module returns to it more than once, but that describes reliability rather than the capacity to do something different."
      ]
    },
    {
      q: "The chapter gives four reasons a business student should understand the infrastructure. Which one is the reason that connects this chapter back to competitive strategy?",
      opts: [
        "That people who can make use of cloud services, connected devices and AI infrastructure are better placed to innovate",
        "That the infrastructure is the foundation of almost all organizational activity",
        "That understanding the vocabulary makes conversations with technical colleagues clearer, so that a manager is not obliged to accept a recommendation simply because it was explained in words nobody else in the room understood",
        "That the same knowledge protects your own privacy, devices and personal data"
      ],
      a: 0,
      why: [
        "Correct. The chapter says businesses able to leverage cloud services, the Internet of Things and artificial intelligence infrastructure are better positioned to innovate and respond to market changes, and that without this knowledge you might overlook how technology can be used strategically.",
        "This is the chapter&rsquo;s first reason and it is perfectly true, but it argues that the subject is unavoidable rather than that it is a source of advantage over anybody else.",
        "This is the second reason, about communicating with technical teams and reducing misunderstandings. It makes you better at working with a plan somebody else has proposed rather than better at seeing one.",
        "This is the fourth reason, the personal one, about managing your own data and recognising threats such as phishing. Valuable, but it concerns you rather than the organization&rsquo;s position in its market."
      ]
    }
  ]
};
