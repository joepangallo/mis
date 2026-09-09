/* ===== s32c ===== */
PROSE.s32c = `
<span class="eyebrow">Section 3&ndash;2c</span>
<h2>System software and storage</h2>
<p class="lede">A machine full of hardware does nothing on its own. Something must tell the drive to save the file, and it cannot be the spreadsheet, which has no idea what machine it is running on.</p>

<h3>The software that runs the machine, not the work</h3>
<p>Sort every program into two piles. One holds the software the computer was bought for: the word processor, the browser. The other makes that pile possible. <b>System software</b> is the collection of programs controlling the basic operations of computer hardware.</p>
<p>Its most prominent kind is the <b>operating system</b> &mdash; Windows 11, macOS and Ubuntu Linux on computers, Android and iOS on phones. Its job is coordination, and it has four things to coordinate.</p>
<ul class="keys">
<li><b>Hardware components</b> &mdash; the parts inside the machine, such as processor and monitor, which cannot be aware of each other on their own.</li>
<li><b>Peripherals</b> &mdash; devices attached to the computer, such as a printer, which is why any application can print without knowing every printer made.</li>
<li><b>Application software</b> &mdash; the programs a person opens, which ask the operating system for what they need instead of reaching for hardware.</li>
<li><b>Users</b> &mdash; the people giving instructions, whose clicks and keystrokes must become something the electronics can act on.</li>
</ul>
<p>That order is the shape of the machine: user, application, operating system, hardware. The diagram redraws the relationship three ways.</p>

<div class="activity" data-activity="sysCoordinator"></div>

<h3>One layer, many machines</h3>
<p>The operating system provides a common layer over different devices, so applications are built for each operating system rather than each computer model. A firm whose customers own hundreds of laptop models writes a handful of versions.</p>
<p>Underneath, the differences still have to be handled. <b>Device drivers</b> let a computer communicate with particular hardware: a small program for one make and model. A printer released years after your operating system works because a driver arrived.</p>
<p>Operating systems are often written in <b>assembly language</b>, a very low-level language that lets a computer operate quickly and efficiently, and which the system exists to keep out of sight. What you see instead is a <b>graphical user interface</b>, taking instructions through pictures, icons and menus rather than typed commands.</p>

<h3>Code somebody else already wrote</h3>
<p>A solid infrastructure also includes <b>frameworks and libraries</b>: collections of prewritten code such as NodeJS, JQuery, React and TensorFlow. They buy an organization three things.</p>
<ul class="keys">
<li><b>Development time</b> &mdash; work already solved by somebody else is reused, which is how a small team ships something substantial in weeks.</li>
<li><b>Reach across platforms</b> &mdash; some frameworks build applications that run on several platforms, so a firm does not pay twice to reach two audiences.</li>
<li><b>Specialized capability</b> &mdash; libraries for work such as machine learning put techniques within reach of teams that could not write them.</li>
</ul>
<p>Choosing a framework is also choosing a dependency: it shortens the build and ties you to somebody else&rsquo;s decisions about what to keep supporting.</p>

<div class="activity" data-activity="sysQuiz1"></div>

<h3>Storage, and the three kinds of data</h3>
<p>Storing and retrieving data is the other half of the job, and the amount held grows every year. Some industries must keep records &mdash; email included &mdash; long after anyone needed them.</p>
<ul class="keys">
<li><b>Operational data</b> &mdash; data used for managing business processes and for analysis; what the business is running on right now.</li>
<li><b>Backup data</b> &mdash; short-term copies used to recover from a system-related disaster, frequently overwritten as newer backups are taken.</li>
<li><b>Archival data</b> &mdash; long-term copies kept for compliance and reporting rather than for any current operational use.</li>
</ul>
<p>Four requirements separate them: <b>timeliness</b>, <b>access speed</b>, <b>searchability</b> and <b>life span</b>. Operational data must be current, immediate and searchable. Backups must be recent and restorable. Archives are read rarely and must simply last.</p>
<p>The medium follows. Operational data sits on fast disk, or on flash where speed is critical, as in machine learning. Backups go somewhere secure but quick to restore. Archives go to magnetic tape.</p>
<p>Tape is chosen for its weaknesses. Data is written sequentially, so access is slow and contents are not quickly searchable. In exchange it lasts up to 30 years, costs very little, and is removable.</p>

<div class="callout warn"><p><b>A caution the chapter leaves out.</b> Archives are lost far more often because nothing can still read them &mdash; the format abandoned, the last drive dead &mdash; than because the tape decayed.</p></div>

<p>Sort a set of situations by which type of data is in front of you.</p>

<div class="activity" data-activity="sysMedia"></div>

<h3>Files, folders, and a hierarchy that is not really there</h3>
<p>Within most computers, digital information is organized using files and folders. Three terms carry that structure.</p>
<ul class="keys">
<li><b>File</b> &mdash; a block of data storing specific content, such as a document, image or spreadsheet, and the unit people name and move.</li>
<li><b>Folder</b> &mdash; a grouping of related files, also called a directory, though strictly the folder is the graphical element representing it.</li>
<li><b>Root directory</b> &mdash; the top of the tree, typically the drive itself, from which subdirectories branch, each holding files and further directories.</li>
</ul>
<p>But this is a <i>logical</i> arrangement only. One file may be scattered across many places on the drive, and two files in the same folder on screen may sit nowhere near each other.</p>
<p class="takeaway">Almost everything here is one idea in different clothes: put a layer in between, and the thing above it stops having to know how the thing below it works.</p>

<p>Four questions on storage requirements and on how data is arranged.</p>

<div class="activity" data-activity="sysQuiz2"></div>

<p>Then check what you could explain without looking.</p>

<div class="activity" data-activity="sysReady"></div>
`;

ACT.sysCoordinator = {
  kind: "diagram",
  label: "Interactive diagram",
  title: "What the operating system sits between",
  how: "Pick a view to see the same relationship from a different angle: who talks to whom, why one layer covers many machines, and what a single drag of the mouse actually starts.",
  objective: "3.2",
  models: [
    {
      id: "coordinator",
      name: "The operating system as coordinator",
      site: "The centre of the machine, where every request from a person eventually arrives",
      boxes: [
        {c: "a", t: "Users", w: "Clicks, keystrokes and gestures"},
        {c: "b", t: "Application software", w: "The word processor or accounting package the work is done in"},
        {c: "c", t: "Operating system", w: "Coordinates all four of the things around it"},
        {c: "d", t: "Hardware and peripherals", w: "Processor, monitor, drives, printers"}
      ],
      points: [
        "The chapter&rsquo;s figure draws the operating system as a circle encompassing everything else, with arrows flowing between it and users, application software, hardware components and peripherals.",
        "Nothing in the outer ring communicates with anything else in the outer ring. An application does not talk to a printer; it asks the operating system, which knows how to reach the printer.",
        "That is why a <b>peripheral</b> only has to be understood once. Add a printer and every application on the machine can print, because printing was never the application&rsquo;s job.",
        "It also explains a familiar frustration: when one program cannot see a device, the fault is usually in the coordinating layer or its <b>device driver</b> rather than in the program complaining about it."
      ]
    },
    {
      id: "layer",
      name: "One common layer, many machines",
      site: "The join between software that is written once and hardware that comes in hundreds of shapes",
      boxes: [
        {c: "a", t: "Applications", w: "Written for an operating system, not for a model of computer"},
        {c: "b", t: "Operating system", w: "The common layer, plus a driver for each device"},
        {c: "c", t: "Many different machines", w: "Desktops, laptops and everything else running that system"}
      ],
      points: [
        "The chapter&rsquo;s second figure stacks applications on top of the operating system with a double-headed arrow between them, then three arrows down to three different machines.",
        "The sentence to remember: the operating system provides a common layer for different underlying devices so that applications only have to be developed for different operating systems rather than for each different computer model.",
        "The arrow between applications and the operating system points both ways because the traffic runs both ways: the application asks, and the system reports back what happened.",
        "<b>Device drivers</b> are what make the bottom arrows possible. Each one teaches the common layer to communicate with one particular device, so hardware variety is absorbed in one place instead of in every program."
      ]
    },
    {
      id: "drag",
      name: "One gesture, a long sequence underneath",
      site: "The chapter&rsquo;s own example: copying a file from a flash drive to a hard disk",
      boxes: [
        {c: "a", t: "You drag an icon", w: "Point, click, drop it on the hard disk"},
        {c: "b", t: "The graphical interface", w: "Turns the gesture into an instruction"},
        {c: "c", t: "The operating system", w: "Issues the complex set of coded instructions"},
        {c: "d", t: "The hardware", w: "Bits and bytes move from one device to the other"}
      ],
      points: [
        "A <b>graphical user interface</b> lets you send instructions by selecting or manipulating pictures, icons and menus, which is the only part of this sequence you ever see.",
        "Underlying the icons and the simple dragging is a complex set of coded instructions telling the electronic components that a set of bits and bytes is being transferred from the flash drive to a location on the internal hard disk.",
        "The chapter&rsquo;s challenge is a good one: imagine typing that whole set of instructions every time you wanted to copy a file. The interface is not decoration; it is the reason the machine is usable without training.",
        "The same hiding happens one level down, where the system is often written in <b>assembly language</b> and is designed to insulate you from it &mdash; the layer exists so that nobody above it has to learn the language below it."
      ]
    }
  ]
};

ACT.sysMedia = {
  kind: "sort",
  label: "Sort",
  title: "Which kind of data is this, and where does it belong?",
  how: "Place each situation with the type of data it describes, then read why the requirements push it onto that medium. Every organization here is a hypothetical practice situation.",
  objective: "3.2",
  buckets: [
    {id: "operational", name: "Operational data", hint: "used for managing business processes or for analysis; needed now, fast, and searchable"},
    {id: "backup", name: "Backup data", hint: "short-term copies for recovering from a disaster, frequently overwritten by newer ones"},
    {id: "archival", name: "Archival data", hint: "long-term copies kept for compliance and reporting, rarely read but required to last"}
  ],
  items: [
    {t: "The stock figure a shopping site reads the instant a customer adds an item to a basket", b: "operational", why: "This is data used for managing a business process as it happens, and response time is of the essence, so it belongs on hard drives or on flash-based storage such as solid-state drives."},
    {t: "Customer records and transaction data that staff query all day from a database", b: "operational", why: "The chapter puts transaction-processing data and customer data in databases on disk-based storage media, because hard drives offer high access speeds for data that is frequently accessed."},
    {t: "Business documents, images and company brochures that employees open during the working day", b: "operational", why: "Not all operational data sits in a database. The chapter names business documents, images and brochures as operational content stored as files, still on fast disk because people are waiting for them."},
    {t: "The large volume of varied data a machine learning project reads over and over while training a model", b: "operational", why: "The chapter says AI and machine learning require fast storage to analyze vast quantities of different data, which is exactly the case flash-based storage exists for."},
    {t: "Last night&rsquo;s complete copy of the order system, written to a secure location in case this morning&rsquo;s server fails", b: "backup", why: "This is a short-term copy made to recover from a system-related disaster. Keeping it on hard drives enables quick recovery without slowing the company&rsquo;s operations."},
    {t: "A completely redundant second set of systems, held ready so that business continues seamlessly if the primary systems fail", b: "backup", why: "The chapter describes redundant systems as the strongest form of the same idea: the copy exists so operations continue, so its whole value is in being recent and fast to bring up."},
    {t: "A copy that tomorrow&rsquo;s copy will overwrite, because what matters about it is that it is recent", b: "backup", why: "Backups are frequently overwritten with newer backups, which is what separates them from archives; their life span requirement is short by design rather than by neglect."},
    {t: "Internal email from several years ago that nobody expects to open, but that the organization must be able to produce if it is ever asked", b: "archival", why: "The chapter&rsquo;s own example of archival data is old internal email, kept for compliance and reporting and stored long-term on magnetic tape rather than on working systems."},
    {t: "Records written sequentially to low-cost removable media and taken to a secure site some distance away", b: "archival", why: "Sequential writing, very low cost and removability are the properties the chapter gives magnetic tape, and removability is what lets the archive be both expandable and stored remotely."},
    {t: "A store of finished records that is slow to read and cannot be searched quickly, and where nobody minds", b: "archival", why: "Slow access and poor searchability would be disqualifying for operational data. For an archive they are an acceptable trade for a life span measured in years at a very low cost."}
  ]
};

ACT.sysQuiz1 = {
  kind: "quiz",
  label: "Check yourself",
  title: "System software, drivers, and the common layer",
  how: "Four options, one best answer; read every explanation, including the ones for options you did not choose.",
  objective: "3.2",
  questions: [
    {
      q: "A colleague says the accounting package on her laptop &ldquo;talks to the hard drive when it saves.&rdquo; What does the chapter&rsquo;s account of system software say is actually happening?",
      opts: [
        "She is right, because application software reaches the hardware directly and the operating system is only there to manage the screen, the keyboard and the mouse while the application gets on with the work",
        "The accounting package asks the operating system, which is the system software controlling the basic operations of the hardware, and the operating system reaches the drive",
        "The accounting package writes to the drive itself, and the operating system checks afterwards that the file arrived intact",
        "The hard drive requests work from whichever application is open, so the package responds rather than instructs"
      ],
      a: 1,
      why: [
        "The operating system does manage the screen and the mouse, but it does far more than that. Reading from and writing to a storage device is one of the tasks the chapter lists as performed by the operating system itself.",
        "Correct. System software is the collection of programs that control the basic operations of computer hardware, and the operating system coordinates the interaction between hardware components, peripherals, application software and users, so the save request travels through it.",
        "If applications wrote to hardware themselves, every application would need to understand every make of drive. Verifying afterwards is not the arrangement; the operating system does the writing, not the inspecting.",
        "Hardware does not request work from applications. A drive is a device the operating system reaches on behalf of whatever asked, which is why one program cannot seize a device from another."
      ]
    },
    {
      q: "A hypothetical print shop buys a printer model released long after the operating systems on its computers were written, and the printer works. Which piece of the chapter&rsquo;s account explains that, and what is assembly language doing in the same story?",
      opts: [
        "A device driver lets the computer communicate with that particular piece of hardware, and the operating system is written in assembly language so that nobody else has to be",
        "The graphical user interface recognizes the printer visually, and assembly language is the language users type instructions in when the interface cannot help",
        "The printer contains its own operating system that replaces the computer&rsquo;s for the duration of the job, and assembly language is what applications are written in",
        "Frameworks and libraries supply the printing code to each application, and assembly language is a kind of storage medium used while a document waits"
      ],
      a: 0,
      why: [
        "Correct. Device drivers allow the computer to communicate with various different hardware devices, and the chapter says operating systems are often written in assembly language, a very low-level language, with the system designed to insulate you from it and make operations unobtrusive.",
        "A graphical user interface enables you to send instructions by selecting or manipulating pictures, icons and menus. It is how a person addresses the machine, not how the machine identifies an unfamiliar device.",
        "Nothing in the chapter puts a replacement operating system inside a peripheral, and assembly language is described as the language operating systems are often written in rather than the language of applications.",
        "Frameworks and libraries are collections of prewritten code that reduce development time and help applications run on different platforms; they are not a substitute for a driver, and assembly language is a programming language rather than a medium."
      ]
    },
    {
      q: "A development team proposes building its new application on a widely used framework instead of writing everything itself. What does the chapter say frameworks and libraries provide, and what should the manager also notice?",
      opts: [
        "They provide finished applications the firm can rebrand, so the manager should notice that the product will look like competitors&rsquo; products",
        "They provide the operating system functions the application needs, so the manager should notice that the firm no longer needs to license an operating system",
        "They provide collections of prewritten code that cut development time and help an application run on different platforms, so the manager should notice the firm is taking on a dependency",
        "They provide faster access to the hardware by going round the operating system, so the manager should notice that the application will need a device driver of its own for every machine it is installed on"
      ],
      a: 2,
      why: [
        "A framework is a set of building blocks rather than a finished product, and the chapter describes it as supporting the development and operation of applications rather than as something to rebrand.",
        "Frameworks sit above the operating system rather than replacing it. An application built on a framework still runs on an operating system, and the licensing question is untouched by the choice.",
        "Correct. The chapter says frameworks and libraries offer collections of prewritten code, helping to reduce development time, enable building applications that run on different platforms, or develop machine learning models &mdash; and reusing somebody else&rsquo;s code means depending on their future decisions.",
        "Nothing bypasses the operating system in this account; applications reach hardware through it. Drivers belong to devices rather than to applications, so a framework choice does not create one."
      ]
    }
  ]
};

ACT.sysQuiz2 = {
  kind: "quiz",
  label: "Check yourself",
  title: "Storage requirements, media, and the shape of a file system",
  how: "Four options each, with an explanation for every one, including the options you rejected.",
  objective: "3.2",
  questions: [
    {
      q: "A hypothetical charity is told to &ldquo;buy faster storage&rdquo; for everything it keeps. Which four requirements does the chapter use to separate the three types of data, and why does the instruction fail?",
      opts: [
        "Cost, security, ownership and location, and the instruction fails because faster storage is harder to secure",
        "Timeliness, access speed, searchability and life span, and the instruction fails because archives need life span rather than speed",
        "Volume, format, department and vendor, and the instruction fails because different departments buy different equipment",
        "Accuracy, completeness, timeliness and relevance, and the instruction fails because speed cannot improve data quality"
      ],
      a: 1,
      why: [
        "Cost and security are real concerns and cost is precisely why tape is used for archives, but these are not the four requirements the chapter names for distinguishing the three types of data.",
        "Correct. The chapter distinguishes operational, backup and archival data by their requirements in terms of timeliness, access speed, searchability and life span, and archival data is defined by a long life span at low cost rather than by speed.",
        "These describe how equipment gets purchased rather than what the data needs. The chapter&rsquo;s categories are about purpose, and purpose is what decides the medium.",
        "Accuracy, completeness and relevance are qualities of information rather than the storage requirements this section names, although the closing observation about speed and quality is sound."
      ]
    },
    {
      q: "Which arrangement matches what the chapter says about matching each type of data to a physical medium?",
      opts: [
        "Operational data on magnetic tape because it is written continuously, backups on flash storage, and archives on hard drives so they stay searchable",
        "Everything on flash-based storage, because a slow read is a business risk wherever it happens",
        "Operational data in databases or files on hard drives or flash storage, backups on hard drives for quick recovery, and archives on magnetic tape",
        "Operational data on hard drives, backups written to the same drives to keep recovery simple, and archives deleted once they stop being read"
      ],
      a: 2,
      why: [
        "This reverses the media. Data is stored sequentially on tape, so access can be very slow and the contents are not quickly searchable, which is why the chapter reserves tape for archives.",
        "Buying the fastest medium for data nobody reads is the waste the three categories exist to prevent, and the chapter reserves flash for situations where access speed is of crucial importance.",
        "Correct. The chapter stores operational data in databases or files on disk-based or flash storage, notes that storing backup data on hard drives enables quick recovery without slowing operations, and archives data no longer used operationally on magnetic tape.",
        "A backup on the same drive as the live data disappears with it in the failure it was meant to survive, and archives are kept precisely because they may still be required for compliance and reporting."
      ]
    },
    {
      q: "A manager assumes that because two documents sit in the same folder on screen, they are stored next to each other on the disk. What is the chapter&rsquo;s correction, and why does it matter?",
      opts: [
        "The folder structure is a logical organization; the data is not physically organized the same way on the drive, which is another case of a layer hiding the machine",
        "The folder structure is physical, and moving a file between folders therefore moves it across the disk surface",
        "Folders exist only in the operating system&rsquo;s memory and vanish when the machine is switched off, so nothing about them is stored at all",
        "Folders are the same thing as directories in every respect, so the question has no answer worth giving"
      ],
      a: 0,
      why: [
        "Correct. The chapter is explicit that although you can access data using files and folders, the data is not physically organized the same way on the drive, and that gap is the same abstraction the operating system performs everywhere else.",
        "This is the belief being corrected. Dragging a file between folders changes where it appears in the hierarchy, and says nothing about where its contents physically sit.",
        "The hierarchy persists across restarts, since a drive that forgot its own structure would lose access to everything on it. What is logical is the arrangement, not its permanence.",
        "The two words are close but not identical: the chapter says a folder is strictly a graphical element representing a directory, and in any case the physical question still has a definite answer."
      ]
    },
    {
      q: "What does the chapter mean by the root directory, and what follows from a hierarchy shaped that way?",
      opts: [
        "The folder that holds the operating system itself, which is why deleting anything inside it stops the machine from starting and why ordinary users are kept out of it",
        "The oldest folder on the drive, from which every later folder inherits its settings and permissions",
        "The top of the tree, typically the drive itself, from which subdirectories branch out and each directory can hold both files and other directories",
        "A hidden folder used by the archive process, which is why ordinary users never encounter it"
      ],
      a: 2,
      why: [
        "System files usually do live somewhere below the root, but that is not what the word names. The root is the starting position of the whole tree, whatever happens to be stored in it.",
        "Age has nothing to do with it, and the chapter does not describe folders as inheriting settings from one another. The root is defined by position in the hierarchy, not by history.",
        "Correct. The chapter says that akin to a tree, the root directory, typically the hard drive, is at the top and subdirectories branch out, with each directory able to contain files as well as other directories.",
        "The root is the most visible location on a drive rather than a hidden one, and archiving is about moving data to different media rather than about a special folder."
      ]
    }
  ]
};

ACT.sysReady = {
  kind: "selfcheck",
  label: "Self-check",
  title: "Can you explain this section without the page in front of you?",
  how: "Rate each statement honestly; anything you cannot do yet has a pointer to the exact place in this section to reread.",
  objective: "3.2",
  items: [
    {t: "I can define system software and say what separates it from the applications a business chooses.", hint: "The opening of the section, where every program is sorted into two piles."},
    {t: "I can name the four things an operating system coordinates and give an example of each.", hint: "The list of hardware components, peripherals, application software and users, just after the definition of the operating system."},
    {t: "I can explain why software ships in one version for each operating system rather than one version for each computer model.", hint: "The common-layer paragraphs, and the second view in the interactive diagram."},
    {t: "I can say what a device driver does and why a printer released after the operating system still works.", hint: "The paragraph on drivers, immediately after the common-layer argument."},
    {t: "I can explain what assembly language is and why the operating system is designed to keep it away from me.", hint: "The last paragraph before the section on what the operating system does unnoticed."},
    {t: "I can name the four requirements that separate operational, backup and archival data.", hint: "The section on three kinds of data, plus the table that reads down the columns."},
    {t: "I can match each of the three data types to the medium the chapter puts it on, and justify the match.", hint: "The list matching data to media, and the paragraph on why tape&rsquo;s weaknesses are acceptable for archives."},
    {t: "I can explain why an archive can be lost even when the tape itself is perfectly readable.", hint: "The highlighted caution after the paragraph on magnetic tape."},
    {t: "I can say what the root directory is and why the folder hierarchy is described as logical rather than physical.", hint: "The closing section on files and folders, and the correction at the end of it."}
  ]
};
