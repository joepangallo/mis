/* ===== s32d ===== */
PROSE.s32d = `
<span class="eyebrow">Section 3&ndash;2d</span>
<h2>Networks: how machines share</h2>
<p class="lede">Everything in the three sections before this one sits still. A machine, the software that drives it, a pile of stored data: none of them is worth much alone. The chapter is blunt about it &mdash; taken alone, each individual piece of technology has little value, and it is through connecting the different pieces that business value can be realized. This section is about the connecting, and it turns out to need only three things.</p>

<h3>Why anything has to be connected at all</h3>
<p>An organization runs on a great many separate pieces: servers and mainframes, personal computers and mobile devices, storage devices, even the systems that control the temperature of a room. The chapter&rsquo;s own illustration of why connecting them matters is the one worth keeping. The best-performing database in the world would be useless if the people and the applications that depend on its data could not reach it.</p>
<p>One reason information systems became as powerful as they did is precisely this ability to interconnect. Three consequences follow from it, and the chapter states all three plainly rather than leaving them to be inferred.</p>
<ul class="keys">
<li><b>Stored data becomes reachable</b> &mdash; a database nobody can get to is an expense rather than an asset, so the connection is what turns a store of records into something the organization can actually use.</li>
<li><b>People can work together</b> &mdash; interconnection lets constituents inside the organization and constituents outside it communicate and collaborate, which is why the same technology ends up serving employees and outside partners alike.</li>
<li><b>New kinds of business become possible</b> &mdash; the chapter&rsquo;s own claim is that many innovative business models would not exist without the internet, so connection changes what a company can sell and not merely how quickly it works.</li>
</ul>
<p>Connection is not a feature bolted onto a system, then. For a great many organizations it is the system, which is why it is worth knowing exactly what a connection requires.</p>

<h3>A network is a conversation, with equipment instead of people</h3>
<p>Start with something you already do without thinking. When you speak to someone, you form a message in your head and then <b>code</b> it into a form that can travel, which for a voice means sounds. The message is <b>transmitted</b> along a pathway, in this case the air between you. The other person receives it and <b>decodes</b> it, using ears and a brain. Three moves: code, send, decode.</p>
<p>A computer network does exactly that with equipment. <b>Computer networking</b> is the sharing of data or services. A source produces a message, the message is encoded so that it can travel, it moves along a communication channel, and a receiver decodes it so the destination can understand it. Because the shape of the thing is the same, the requirements are the same, and the chapter names three of them.</p>
<ul class="keys">
<li><b>Something to share</b> &mdash; a sender and a receiver, which the chapter calls a source and a destination, that genuinely have a message between them; with nothing to share there is nothing for any equipment to do.</li>
<li><b>A pathway</b> &mdash; the <b>transmission media</b>, meaning the physical route the data actually travels, whether that is a cable running through a wall or a radio signal crossing a room.</li>
<li><b>Rules both sides follow</b> &mdash; <b>protocols</b>, which define the procedures that different computers follow when they transmit and receive data, so that whatever arrives can be interpreted at the far end.</li>
</ul>
<p>The chapter makes the third requirement concrete with a job search. Imagine you are graduating and want work in France, so you write to employers there. One of them replies by email with everything you asked about its hiring process. The first requirement is met, because there is information to share. The second is met, because the internet carried it. But the reply is written in French, and you do not read French.</p>
<p>Nothing failed. The message was composed, sent and delivered intact, and it is still useless, because if the message is not understood by the receiver there is no communication. What is missing is an agreed language, and the agreed language is the protocol. You and the employer settle on English, and only then does the exchange do any work.</p>
<p class="takeaway">Arrival is not communication. Two systems can be wired together perfectly and share nothing at all, because agreeing on the wire is not the same as agreeing on the language.</p>
<p>The three requirements are worth being able to state in the chapter&rsquo;s own words, because most network failures you will ever be asked about are one of the three going missing.</p>

<div class="activity" data-activity="netRequire"></div>

<h3>What is actually being sent, and how much of it</h3>
<p>Human communication is made of words. Computer communication is made of <b>bits</b>, the smallest unit of data a computer uses. Virtually any content can travel this way &mdash; a document, a photograph, a recording, a film &mdash; and as far as the network is concerned the only difference between them is how many bits there are. That number varies far more than most people expect, which is why some things appear instantly and others crawl.</p>
<p>The chapter gives four comparisons, and reading them together is more useful than memorising any one of them.</p>
<ul class="keys">
<li><b>A customer&rsquo;s address</b> &mdash; only a few thousand bytes, which is part of why a system can move millions of customer records around at night without anybody noticing it happened.</li>
<li><b>A page of text</b> &mdash; roughly fourteen thousand bytes, still small enough that its size is almost never the reason a page is slow to appear on a screen.</li>
<li><b>A publication-quality photograph</b> &mdash; possibly more than two hundred million bytes, which is more than ten thousand pages of text standing behind a single image.</li>
<li><b>A design file</b> &mdash; an architectural drawing or a manufacturing plant layout can run to several billion bytes, which is why engineering firms think about their connections in a way that offices sending letters never have to.</li>
</ul>
<p>The capacity of the path is the other half of the story. <b>Bandwidth</b> is the transmission capacity of a computer or a communications channel, measured in bits per second or in multiples of it, and it describes how much data can reliably be carried over the medium in one second. A network inside a building typically carries between a hundred million and a thousand million bits per second, which is usually far more than the connection leaving that building can manage.</p>

<h3>Why one file takes eight seconds and the same file takes a day</h3>
<p>The chapter takes a single file &mdash; a forty-five minute high-definition video, about one gigabyte &mdash; and asks how long it takes to arrive over six different connections. The tiers are the chapter&rsquo;s own, and they are anchored to an older broadband market, so read the ratios between the rows rather than treating any one label as current.</p>

<div class="tbl-wrap"><table class="tbl">
<thead><tr><th>Connection</th><th>Time the chapter gives for one gigabyte</th></tr></thead>
<tbody>
<tr><td><b>Dial-up telephone modem</b></td><td>More than a day and a half</td></tr>
<tr><td><b>Regular cable or DSL</b></td><td>About two hours and thirteen minutes</td></tr>
<tr><td><b>High-speed cable or DSL</b></td><td>About nine minutes</td></tr>
<tr><td><b>Fourth-generation mobile</b></td><td>About five minutes</td></tr>
<tr><td><b>Fifth-generation mobile</b></td><td>About twenty-seven seconds</td></tr>
<tr><td><b>Gigabit fiber</b></td><td>About eight seconds</td></tr>
</tbody>
</table></div>

<p>One arithmetic sentence explains the entire table, and it is the part that will still be true when every figure above has been overtaken: <b>time equals size divided by rate</b>. The file never changed. Only the capacity of the path did, and a path a thousand times wider finishes the job in a thousandth of the time.</p>
<p>There is one conversion to settle first, because storage is counted in bytes while networks are rated in bits. A byte is eight bits, so a gigabyte, being a thousand megabytes, is eight thousand megabits. That single number is why the exercise below divides eight thousand by a connection&rsquo;s rate in megabits per second and gets an answer in seconds.</p>
<ol class="steps">
<li><b>Put both sides into the same unit.</b> Convert the file from bytes into bits, which for one gigabyte means eight thousand megabits, because a byte holds eight bits.</li>
<li><b>Divide the size by the rate.</b> Megabits divided by megabits per second leaves seconds, which is the answer anybody actually asked for.</li>
<li><b>Turn the answer into something a person can act on.</b> Seconds are precise and useless in a meeting; divide by sixty for minutes, and by sixty again for hours.</li>
</ol>
<p>The sheet below lists the six connections with the capacity that produces each of the chapter&rsquo;s times. Write one formula for the first row and it is applied down the column, exactly the way a filled-down formula behaves in a real spreadsheet.</p>

<div class="activity" data-activity="netTransfer"></div>

<p>Two things in that column are worth pausing over. The first is that no judgment entered anywhere: the same three symbols produced a day and a half and produced eight seconds, so a claim about how long a transfer will take is checkable rather than arguable. The second is that the last column is simply the first two read backwards. A connection roughly eighteen thousand times faster finishes in roughly an eighteen-thousandth of the time, because that is what division does.</p>
<p>This is also the arithmetic behind a common and expensive mistake. A business that plans to move large files between sites every night, and buys the connection it needs for ordinary office traffic, has not bought a slow network; it has bought a network that cannot finish before morning. The size of the thing being moved and the capacity of the path have to be decided together, and neither number means much without the other.</p>
<p>Try the requirements, the bits and the arithmetic together before moving on to who is at each end of the wire.</p>

<div class="activity" data-activity="netQuiz1"></div>

<h3>Three roles: server, client, and peer</h3>
<p>Machines on a network are not equals by default. The chapter gives them three roles, and the only thing separating those roles is the direction in which requests travel.</p>
<ul class="keys">
<li><b>A server</b> &mdash; any computer on the network that makes access to files, printing, communications and other services available to the network&rsquo;s users, as the section on hardware described. Servers only provide services.</li>
<li><b>A client</b> &mdash; any computer, or any software application such as a mail program on a laptop, that uses the services a server provides. Clients only request services, and a client usually has one user while many users share the server it talks to.</li>
<li><b>A peer</b> &mdash; any computer that may both request and provide services, so the same machine can be a client at one moment of the day and a server at another.</li>
</ul>
<p>Once you accept that the work can happen somewhere other than the desk, the machine on the desk can become very small. <b>Thin clients</b> are microcomputers with minimal memory, storage and processing capabilities, and they use <b>desktop virtualization</b> to give a worker a virtual desktop environment that is really running on a server elsewhere.</p>
<p>The reasons an organization does this are practical rather than technical. There are fewer copies of software to license and maintain, and it is easier to satisfy the strict privacy and data protection duties that apply in some industries and jurisdictions, because nothing of consequence is stored on the box the user actually touches. A terminal holding no data is a terminal that cannot lose any.</p>
<p>Which roles a network hands out is also what gives the network its name, and the chapter names two arrangements.</p>
<ul class="split">
<li><b>Client-server networks</b> &mdash; servers and clients have defined roles, and this is the typical business arrangement; with company networks and internet access everywhere, almost everyone at work is inside one whether they think about it or not.</li>
<li><b>Peer-to-peer networks</b> &mdash; any computer or device on the network can provide services as well as request them, which is what you find in small offices and homes, where no machine is set aside to serve the others.</li>
</ul>
<p class="takeaway">Ask of any machine on a network whether it answers requests, makes them, or does both. That one question sorts servers from clients from peers, and it names the network at the same time.</p>

<h3>Networks come in sizes, and the size is really a distance</h3>
<p>Networks are commonly classified by size, by the distance they cover and by their structure. The three the chapter treats as the common ones are separated by nothing more complicated than how far apart the two ends are, which makes them much easier to keep straight than the abbreviations suggest.</p>

<div class="tbl-wrap"><table class="tbl">
<thead><tr><th>Type</th><th>What it is used for</th><th>How far it reaches</th></tr></thead>
<tbody>
<tr><td><b>Personal area network</b><br><span class="mini">PAN</span></td><td>Wireless communication between one person&rsquo;s devices, using technologies such as Bluetooth</td><td>Under ten meters</td></tr>
<tr><td><b>Local area network</b><br><span class="mini">LAN</span></td><td>Sharing data, software applications or other resources between several users</td><td>Typically within a building</td></tr>
<tr><td><b>Wide area network</b><br><span class="mini">WAN</span></td><td>Connecting multiple local area networks, often with ownership and management distributed among several parties</td><td>From several buildings to a city to worldwide</td></tr>
</tbody>
</table></div>

<p>The wide area network is the elastic one, and the chapter gives its middle cases names. A wide area network spanning several buildings on one site is a <b>campus area network</b>; one covering the area of a city is a <b>metropolitan area network</b>; and the largest of them all is the worldwide network the next section takes apart. Notice the phrase about distributed ownership: once a network leaves your buildings, parts of the path belong to other organizations, which is a management problem as much as a technical one.</p>
<p>The pathway can be radio rather than cable. A <b>wireless local area network</b>, almost always called a <b>Wi-Fi network</b>, is a local area network built on high-frequency radio-wave technology. Organizations install them to connect mobile devices, and wherever running a cable would be impractical or impossible; the ease of installation is why they became normal in offices and homes, and why public ones can now be found almost anywhere.</p>
<p>The chapter also flags fifth-generation mobile networks as promising for many applications, and particularly for large numbers of connected devices, because they offer extremely low latency and high transmission speed. Latency is the delay before a response begins, as distinct from how much can be carried once it does, and it is the measure that matters when a machine is waiting on an answer before it acts.</p>
<p>Pair each type with what it is for and how far it reaches; the distances are the part that does the work.</p>

<div class="activity" data-activity="netTypes"></div>

<p>One last pass over the roles, the arrangements and the sizes before the next section takes the largest wide area network of all apart.</p>

<div class="activity" data-activity="netQuiz2"></div>
`;

ACT.netRequire = {
  kind: "fill",
  label: "Complete it",
  title: "The three requirements, in the chapter&rsquo;s own words",
  how: "Choose the wording the chapter uses in each sentence; the explanation appears once you pick, and it says what the other choices would actually have described.",
  objective: "3.2",
  blanks: [
    {
      before: "Computer networking is ",
      after: ", which is why a connection carrying nothing anybody wants is not doing any work.",
      choices: ["the sharing of data or services", "the cabling installed between buildings", "the speed at which data travels"],
      a: 0,
      why: "The chapter defines computer networking as the sharing of data or services, which keeps the definition about purpose rather than equipment. Cabling is only the second requirement, the pathway, and a network can use radio instead of any cable at all. Speed is bandwidth, which describes how well the sharing goes rather than what the sharing is."
    },
    {
      before: "The first requirement is a sender and a receiver &mdash; a source and a destination &mdash; that ",
      after: ".",
      choices: ["have something to share", "are the same make of machine", "are in the same building"],
      a: 0,
      why: "A message has to exist before anything can carry it, which is why the chapter states this requirement first. Machines of entirely different makes exchange data constantly, because that is what the third requirement, an agreed protocol, exists to make possible. Being in the same building describes a local area network, which is one type of network rather than a condition every network has to meet."
    },
    {
      before: "The second requirement is ",
      after: ", such as a cable, to send the message along.",
      choices: ["a pathway or transmission medium", "a protocol agreed by both sides", "a server that stores the message"],
      a: 0,
      why: "The transmission media are the physical pathway, cable or wireless, used to transmit data, and the chapter lists them second because a message with nowhere to go is going nowhere. A protocol is the third requirement, and it governs interpretation rather than travel. A server is a role a machine can play, not a requirement of a network: two peers with no server between them are still a network."
    },
    {
      before: "The third requirement is ",
      after: " governing communication between senders and receivers.",
      choices: ["rules or protocols", "enough bandwidth", "a shared physical medium"],
      a: 0,
      why: "Protocols define the procedures that different computers follow when they transmit and receive data, which is what makes an arriving message interpretable. Bandwidth decides how long a transfer takes and never decides whether it can be understood. A shared physical medium restates the second requirement, and the chapter is careful to keep the pathway and the rules apart precisely because a message can have the first without the second."
    },
    {
      before: "In the chapter&rsquo;s example the reply arrives intact but in a language the reader cannot decode, which shows that ",
      after: ".",
      choices: ["if the message is not understood by the receiver, there is no communication", "the pathway must have failed somewhere along the route", "the sender never really encoded the message at all"],
      a: 0,
      why: "This is the chapter&rsquo;s own sentence, and it is the whole reason protocols are named as a separate requirement rather than assumed. The pathway plainly worked, because the email arrived complete and on time, so blaming the route misreads a delivery success as a delivery failure. The sender did encode the message, and encoded it perfectly well in French; the encoding and the decoding simply did not match."
    }
  ]
};

ACT.netTransfer = {
  kind: "formula",
  label: "Spreadsheet",
  title: "How long does one gigabyte take?",
  how: "Type one formula for row 2 in each column and run it; it is applied to every row the way a filled-down formula behaves in a real sheet.",
  objective: "3.2",
  headers: [
    "Connection",
    "Capacity in megabits per second",
    "Seconds for one gigabyte",
    "Minutes for one gigabyte",
    "Times faster than the modem"
  ],
  data: [
    ["Dial-up telephone modem", 0.056, "", "", ""],
    ["Regular cable or DSL", 1, "", "", ""],
    ["High-speed cable or DSL", 15, "", "", ""],
    ["Fourth-generation mobile", 25, "", "", ""],
    ["Fifth-generation mobile", 300, "", "", ""],
    ["Gigabit fiber", 1000, "", "", ""]
  ],
  tasks: [
    {
      column: 2,
      prompt: "Column C: how many seconds does one gigabyte take on each connection? One gigabyte is 8000 megabits and column B holds megabits per second. Round to the nearest whole second.",
      note: "The capacities in column B are the round figures that reproduce the times the chapter gives; the chapter itself states the times rather than the rates.",
      placeholder: "=ROUND(8000/B2, 0)",
      expect: "=ROUND(8000/B2, 0)",
      hint: "Divide the size by the rate. The size is the same eight thousand megabits on every row, and the rate is the cell beside it in column B.",
      explain: "That is the whole table in one formula: time equals size divided by rate. Notice the first row runs to more than a hundred thousand seconds, which is where the chapter&rsquo;s day and a half comes from."
    },
    {
      column: 3,
      prompt: "Column D: the same answer expressed in minutes, rounded to one decimal place.",
      note: "Build this from column B rather than from column C. This sheet does not keep the values you filled in a previous column, so each formula has to stand on its own.",
      placeholder: "=ROUND(8000/B2/60, 1)",
      expect: "=ROUND(8000/B2/60, 1)",
      hint: "Sixty seconds make a minute, so carry out the same division as before and then divide that result by sixty, rounding at the end rather than in the middle.",
      explain: "Rounding at the end rather than partway through keeps the small rows honest: the fiber row is a fraction of a minute, and rounding it to whole minutes would have reported zero and hidden the answer."
    },
    {
      column: 4,
      prompt: "Column E: how many times faster than the dial-up modem in row 2 is each connection? Round to the nearest whole number.",
      note: "The modem row must stay the modem row as the formula fills down, which is what the dollar signs in a reference are for.",
      placeholder: "=ROUND(B2/$B$2, 0)",
      expect: "=ROUND(B2/$B$2, 0)",
      hint: "One half of the division moves down the column with the row, and the other half has to be pinned so it keeps pointing at the modem in cell B2.",
      explain: "This column is the two before it read backwards. A connection roughly eighteen thousand times faster finishes in roughly an eighteen-thousandth of the time, and that relationship holds no matter what a typical connection happens to cost this year."
    }
  ]
};

ACT.netTypes = {
  kind: "match",
  label: "Match",
  title: "Which network, over what distance",
  how: "Pair each kind of network with what the chapter says it is for and how far it reaches; the explanation names what makes each one distinct.",
  objective: "3.2",
  pairs: [
    {
      l: "Personal area network",
      r: "Wireless communication between one person&rsquo;s own devices, using technologies such as Bluetooth, over a range under ten meters",
      why: "This is the smallest of the types and the one most people use without ever calling it a network: a phone and a set of headphones, or a laptop and a wireless keyboard on the same desk."
    },
    {
      l: "Local area network",
      r: "Sharing data, software applications and other resources between several users, typically within a single building",
      why: "This is the ordinary office or home network. Its capacity is usually far higher than the connection leaving the building, which is why moving a large file to a colleague upstairs feels instant and sending it to another site does not."
    },
    {
      l: "Wide area network",
      r: "Connecting multiple local area networks over a large physical distance, often with ownership and management distributed among several parties",
      why: "The distributed ownership is the part that matters managerially: once the path leaves your buildings, some of it belongs to other organizations, so availability is partly somebody else&rsquo;s decision."
    },
    {
      l: "Campus area network",
      r: "A wide area network spanning several buildings belonging to one organization on a single site",
      why: "It is the middle case between one building and a city. A hospital group whose clinic, laboratory and administration buildings share one site is the ordinary example."
    },
    {
      l: "Metropolitan area network",
      r: "A wide area network covering the area of a city",
      why: "Larger than a site and smaller than a country, this is the scale of a transit authority connecting stations, depots and a control room across one urban area."
    },
    {
      l: "Wireless local area network",
      r: "A local area network built on high-frequency radio-wave technology instead of cable, also called a Wi-Fi network",
      why: "The reach is the same as a wired local network; only the pathway changed. Organizations install them for mobile devices and wherever running a cable is impractical, and the ease of installation is why public ones are now almost everywhere."
    },
    {
      l: "Fifth-generation mobile network",
      r: "A mobile network offering extremely low latency and high transmission speed, which the chapter flags as promising for large numbers of connected devices",
      why: "Latency is the delay before a response begins, which is a different measure from capacity. It is the one that matters when a machine has to wait for an answer before it acts on something physical."
    }
  ]
};

ACT.netQuiz1 = {
  kind: "quiz",
  label: "Check yourself",
  title: "Requirements, bits, and the arithmetic",
  how: "Four options, one best answer; read every explanation, including the ones for the options you did not choose.",
  objective: "3.2",
  questions: [
    {
      q: "The chapter says business value comes from connecting the pieces rather than from the pieces themselves. Which statement is the chapter&rsquo;s own reason for that claim?",
      opts: [
        "A network costs more than the machines it joins together, so it deserves the larger share of management attention",
        "Taken alone each piece of technology has little value: the best database in the world is useless if the people who depend on it cannot reach it",
        "A network is the one part of an infrastructure that keeps working when an individual machine fails, so it is what the organization actually depends on",
        "A network removes the need to keep data in any one place, because anything wanted can be requested from wherever it happens to be"
      ],
      a: 1,
      why: [
        "Relative cost is not the chapter&rsquo;s argument, and it would be a weak one, since a network is usually a small fraction of what an organization spends on its machines and its software.",
        "Correct. The chapter states that taken alone each individual piece of technology has little value, and its own illustration is that the best-performing database would be useless if it could not be accessed by the people or applications throughout the organization that depend on the data.",
        "Some networks are built to survive the loss of a machine, but plenty are not, and a network is quite capable of failing on its own. Resilience is a design choice rather than a property of being connected.",
        "Connecting machines does not remove the need to store anything. The data still has to sit somewhere, on somebody&rsquo;s storage, and the network only changes who can reach it from where."
      ]
    },
    {
      q: "A hypothetical architecture practice and a hypothetical insurance office both report that transfers to a second site are slow. The practice is sending design files; the office is sending pages of text and customer records. What does the chapter&rsquo;s comparison of content sizes suggest about the two complaints?",
      opts: [
        "The two complaints describe the same problem, because bandwidth affects every kind of content in exactly the same way once it has been reduced to bits travelling over the same wire",
        "The office should be affected more, because a large number of small items takes longer than one large item regardless of the total quantity involved",
        "The practice is moving files of several billion bytes while the office is moving items of a few thousand, so the same connection is doing work that differs by orders of magnitude",
        "Neither complaint can be about the network, because all content is reduced to bits and bits travel at the same speed on any medium"
      ],
      a: 2,
      why: [
        "Bandwidth does apply to every kind of content, which is exactly why the amount of content decides the outcome. Two workloads that differ by a factor of a million on the same connection are not the same problem.",
        "The chapter&rsquo;s comparison is about total quantity, not about how it is packaged. A few thousand bytes remain a few thousand bytes whether they arrive as one item or several.",
        "Correct. The chapter puts a customer&rsquo;s address at a few thousand bytes and a computer-aided design file at several gigabytes, and since time equals size divided by rate, the same rate produces wildly different waits.",
        "Reducing everything to bits is what makes the sizes comparable rather than what makes them equal. The medium also matters, which is the entire content of the connection-speed table."
      ]
    },
    {
      q: "A hypothetical training centre is told that upgrading from a one megabit per second connection to gigabit fiber will help &ldquo;a little&rdquo; with a one gigabyte video. Using the chapter&rsquo;s own comparison, what should it actually expect?",
      opts: [
        "A change of roughly a thousandfold, turning a transfer of more than two hours into a matter of seconds",
        "A modest improvement, because the size of the file is the main thing determining how long a transfer takes",
        "Almost no improvement, because bandwidth describes capacity rather than speed and the two are unrelated",
        "No change worth having, because a video takes as long to transfer as it takes to watch, its length being fixed"
      ],
      a: 0,
      why: [
        "Correct. Time equals size divided by rate, so multiplying the rate by a thousand divides the time by a thousand: the chapter&rsquo;s own table takes the same one gigabyte from about two hours and thirteen minutes down to about eight seconds.",
        "Size is only half of the calculation. Holding the file constant and changing the rate is precisely the comparison the chapter&rsquo;s table makes, and it changes the answer by orders of magnitude.",
        "Bandwidth is defined as how much data can reliably be transmitted over the medium in one second, which is what makes an estimate of the time possible in the first place.",
        "Transfer time and playing time have nothing to do with each other. The forty-five minute video in the chapter&rsquo;s example arrives in eight seconds over fiber and takes more than a day over a modem."
      ]
    }
  ]
};

ACT.netQuiz2 = {
  kind: "quiz",
  label: "Check yourself",
  title: "Roles, arrangements, and distances",
  how: "Three situations rather than definitions; every option is explained, including the ones that describe something real but different.",
  objective: "3.2",
  questions: [
    {
      q: "In a hypothetical two-person design studio each computer can open files kept on the other, and neither machine is set aside to serve. In a hypothetical accounting firm, thirty desks open files kept on one machine that answers all of them and asks nothing of anybody. How does the chapter classify the two?",
      opts: [
        "Both are client-server networks, because in each case a machine is answering requests for files",
        "The studio is a peer-to-peer network and the firm is a client-server network, because a peer both requests and provides while servers and clients have defined roles",
        "The studio is a client-server network with two servers, and the firm is peer-to-peer because thirty machines are sharing one resource between them",
        "Neither can be classified until it is known whether the connections are wired or wireless"
      ],
      a: 1,
      why: [
        "Answering a request is not enough to make a machine a server in the chapter&rsquo;s sense. A server provides services and does not request them, whereas each studio machine does both, which is the definition of a peer.",
        "Correct. The chapter defines a peer as any computer that may both request and provide services, and puts peer-to-peer arrangements in small offices and homes; client-server networks are those in which servers and clients have defined roles, and they are the typical business arrangement.",
        "This reverses both cases. Two machines that each provide and request are peers, not servers, and thirty clients depending on one provider is the textbook picture of a client-server network.",
        "The medium is a separate question from the roles. A wired network and a wireless one can each be arranged as client-server or as peer-to-peer, because the two decisions are independent."
      ]
    },
    {
      q: "A hypothetical call centre is choosing between three hundred ordinary desktop computers and three hundred thin clients running desktop virtualization. Which statement matches the chapter?",
      opts: [
        "Thin clients cost less because they are smaller and simpler, but each one still needs its own installed copy of every application the centre uses, so the whole saving is confined to the purchase price of the hardware",
        "Thin clients remove the need for a network, because a stripped-down machine runs its software locally without asking anything of a server",
        "Thin clients are a kind of peer, because the desktop each one displays is assembled from the other terminals on the floor",
        "Thin clients have minimal memory, storage and processing of their own, and desktop virtualization runs each worker&rsquo;s desktop on a server instead, which cuts licensing and maintenance cost and keeps the data off the desk"
      ],
      a: 3,
      why: [
        "The licensing and maintenance saving is the chapter&rsquo;s stated reason for the arrangement, precisely because the software is not installed three hundred times. Confining the benefit to hardware misses the larger half of it.",
        "The opposite is true. A thin client is almost entirely dependent on the network, because the environment the worker sees is running on a server somewhere else and reaching it is the only thing the terminal does.",
        "A peer both requests and provides services. These terminals only request, and they request from a server rather than from each other, which makes the arrangement client-server.",
        "Correct. Thin clients are microcomputers with minimal memory, storage and processing capabilities, and the chapter says they use desktop virtualization to provide workers with a virtual desktop environment, helping reduce costs for software licensing or maintenance and comply with stringent privacy and data protection requirements."
      ]
    },
    {
      q: "A hypothetical hospital group has a network inside each of its three buildings on one site, a further network joining those three buildings together, and a wireless link between a nurse&rsquo;s tablet and the scanner clipped to her belt. Which three types has it just described?",
      opts: [
        "A wide area network in each building, a metropolitan area network joining them, and a wireless local area network between the tablet and the scanner",
        "A personal area network in each building, a local area network joining them, and a wide area network between the tablet and the scanner",
        "A local area network in each building, a campus area network joining them, and a personal area network between the tablet and the scanner",
        "Three local area networks and nothing else, because everything described sits inside one organization on one site"
      ],
      a: 2,
      why: [
        "A wide area network covers a large physical distance and connects local networks, so it cannot be what sits inside a single building, and a metropolitan area network is specifically one covering the area of a city rather than one site.",
        "This inverts the distances. A personal area network reaches under ten meters, which is nowhere near a building, and a wide area network spans far more than the gap between a nurse and her own belt.",
        "Correct. A network typically within a building is a local area network; a wide area network spanning several buildings on one site is what the chapter calls a campus area network; and wireless communication between one person&rsquo;s devices under ten meters is a personal area network.",
        "Ownership is not what classifies a network. The chapter classifies by size, distance covered and structure, and on those measures the link to the belt scanner and the link between buildings are plainly different from the network inside one building."
      ]
    }
  ]
};
