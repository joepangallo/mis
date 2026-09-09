/* ===== s32f ===== */
PROSE.s32f = `
<span class="eyebrow">Section 3&ndash;2f</span>
<h2>Intranets, extranets, and where the machines live</h2>
<p class="lede">The last two sections built the web out of parts, all of them indifferent to who is asking. This section adds the two decisions that turn that machinery into a business: who is let in, and where the machines sit.</p>

<h3>The same website, with a lock on the door</h3>
<p>A company publishes pages anybody can read. Now picture a second set only staff can open: this month&rsquo;s announcements, Friday&rsquo;s training, the health-cover form. What changed is who is let in.</p>
<p>An <b>intranet</b> looks and acts like a public website and uses the same software, hardware and networking, but adds authentication, firewalls or both, so proprietary data is viewable only by authorized users. Five common uses:</p>
<ul class="keys">
<li><b>Disseminating corporate information</b> &mdash; announcements and policies published once, so nobody works from a copy emailed round last spring.</li>
<li><b>Employee training</b> &mdash; courses staff work through on their own schedule, reachable from every desk but not publicly.</li>
<li><b>Project management</b> &mdash; plans, schedules and status, where every member sees the same version at the same moment.</li>
<li><b>Collaboration</b> &mdash; shared documents and discussions letting different departments work on one thing rather than separately.</li>
<li><b>Employee self-service</b> &mdash; portals where staff handle their own benefits and retirement plans rather than asking an office.</li>
</ul>
<p>An intranet reachable only from a desk fails the staff who are elsewhere, so companies let employees use a <b>virtual private network</b>, or VPN, to connect securely while travelling. The internet is a road anyone may drive on; the VPN is an armoured van.</p>

<div class="activity" data-activity="orgQuiz1"></div>

<h3>Extranets: letting a partner in, deliberately</h3>
<p>An intranet does nothing for the companies a business depends on &mdash; the supplier who must know what to ship, the distributor who needs prices. Not employees, so the intranet excludes them; not the public, so the public site is useless.</p>
<p>An <b>extranet</b> is a private part of the internet cordoned off from ordinary users, letting two or more firms do business together. Only authorized users reach it, after logging on with an ordinary browser. Crossing public infrastructure, it often uses VPNs to secure the transmission.</p>
<p>Work through the diagram one arrangement at a time.</p>

<div class="activity" data-activity="orgArch"></div>

<h3>What an extranet is actually worth</h3>
<p>The chapter gives seven reasons a company builds one. Four carry most of the weight.</p>
<ul class="keys">
<li><b>Timeliness and accuracy</b> &mdash; communications improve sharply, cutting misunderstandings inside the firm and with partners.</li>
<li><b>Current information, centrally managed</b> &mdash; little business information is static, and one managed copy cuts out-of-date versions stored elsewhere.</li>
<li><b>Automated transactions</b> &mdash; moving orders, confirmations and invoices through a system rather than people cuts cost and cycle time.</li>
<li><b>Real-time data for management</b> &mdash; transactions arrive as they happen, so activity is tracked without awaiting a monthly summary.</li>
</ul>
<p>A fifth is a single point of data entry. Most errors between two companies come from one fact typed twice: two chances to be wrong, and no way to tell which is right.</p>
<p>The chapter&rsquo;s summary table never mentions technology. The three differ by focus, content, users and access: unrestricted for anyone connected, restricted to authorized employees, restricted to authorized partners.</p>
<p class="takeaway">The question is always answered by naming the reader, never by comparing products.</p>

<div class="activity" data-activity="orgSort"></div>

<h3>Where the machines actually live</h3>
<p>Large organizations need thousands of servers &mdash; a parcel carrier routing packages, a store tracking orders, a game developer logging every player action, a company training artificial-intelligence models &mdash; so they set aside dedicated space.</p>
<p>That space is a <b>data center</b>, covering everything from one server room behind an office to a warehouse-sized building. Processing that much data takes great power, plus air-conditioning to hold equipment at its optimal temperature, so one upgrade buys two bills.</p>
<p>Concentrating everything in one place helps with managing, repairing, upgrading and securing it. Choosing the place is a trade-off: firms balance protection from earthquakes and hurricanes against proximity to users, which reduces latency. The safest ground is rarely the nearest.</p>

<h3>Availability, and what five-nines means in minutes</h3>
<p>Almost any business today is an e-business, so reaching data reliably is a key concern. Data-intensive organizations aim for <b>five-nines availability</b>: 99.999 percent, or five minutes of downtime a year &mdash; not per outage, but the whole budget for twelve months.</p>
<p>That reaches into the building: components swappable while the service runs, and a facility with connectivity, floor space, energy, cooling and security. Data centers are modular so they can expand.</p>

<h3>One facility, described</h3>
<p>The chapter describes a parcel carrier&rsquo;s facilities in Atlanta and Mahwah as a shopping list.</p>
<ul class="keys">
<li><b>Its own electricity</b> &mdash; each site is self-sufficient and runs two days on power it generates itself if outside supply fails.</li>
<li><b>Cooling on the scale of a neighbourhood</b> &mdash; each needs air-conditioning capacity equalling 2,000 homes.</li>
<li><b>Water, and backup water</b> &mdash; cooling falls back on 600,000 gallons of chilled water, with backup wells if the mains fail.</li>
<li><b>A building designed against weather</b> &mdash; walls rated for 200-mile-per-hour winds, and raised floors against flooding.</li>
</ul>
<p>All of it is bought before a single request is served, and all of it prevents something rather than producing anything. Most organizations instead rent space for their servers in a <b>collocation facility</b>, a data center run by a third party for several customers. The tenant owns its machines but stops buying the building, power and cooling.</p>
<p>Work the siting and running decisions in order.</p>

<div class="activity" data-activity="orgSiting"></div>

<div class="callout tip"><b class="tagline">Where this is heading</b> Almost none of that spending was computing. Every item is something a cloud customer stops buying.</div>

<div class="activity" data-activity="orgQuiz2"></div>
`;

ACT.orgQuiz1 = {
  kind: "quiz",
  label: "Check yourself",
  title: "Intranets and the private tunnel into them",
  how: "Four options, one best answer; read every explanation, including the ones for the options you did not choose.",
  objective: "3.2",
  questions: [
    {
      q: "A company&rsquo;s public site and its internal staff site look almost identical and were built by the same team with the same tools. What, according to the chapter, actually makes the second one an intranet?",
      opts: [
        "It runs on proprietary software written for internal use, rather than on the ordinary web technologies the public site uses",
        "It uses authentication techniques, firewalls, or both, so that proprietary data inside the corporate network can be viewed only by authorized users",
        "It is stored on a separate machine, and keeping the two sets of pages on different servers is what makes one of them internal",
        "It contains information about employees rather than about products, and the subject matter of the content is what decides the category"
      ],
      a: 1,
      why: [
        "The chapter says the opposite in as many words: an intranet uses the same software, hardware and networking technologies as a publicly accessible website. Nothing has to be rewritten to make a site internal.",
        "Correct. An intranet looks and acts just like a publicly accessible website and uses the same technologies to transmit and display data, but it adds authentication techniques and/or firewalls so that the data can be viewed only by authorized users.",
        "Separate machines are common and often sensible, but a second server with no access control on it is simply a second public site. Where the pages sit is not what restricts who may read them.",
        "Subject matter is a good clue and a poor rule. A public site can carry a staff directory quite legitimately, and the chapter&rsquo;s summary table separates the three arrangements by users and access rather than by topic."
      ]
    },
    {
      q: "An organization puts benefit elections, retirement-plan changes and other human-resources tasks on its intranet so that staff complete them themselves. What is the chapter&rsquo;s name for this use, and what is the point of it?",
      opts: [
        "Collaboration, because several people in different departments now work on the same record at the same time",
        "Disseminating corporate information, because publishing the current benefit rules in one place is the substance of what has been built",
        "Employee self-service through employee portals, which lets staff administer benefits and similar human-resources applications for themselves",
        "Project management, because enrolment runs to a deadline and the intranet is tracking progress towards it"
      ],
      a: 2,
      why: [
        "Collaboration is a separate use the chapter lists, and it means shared work on a common document or discussion. Here each person is completing their own record, and nobody else is meant to touch it.",
        "The rules almost certainly are published alongside the forms, which makes this tempting. Dissemination is one-way publication, though, and the distinctive thing here is that the employee changes something rather than reads something.",
        "Correct. The chapter lists enabling employee self-service for administering benefits, managing retirement plans, or other human-resources-based applications through employee portals as one of the standard uses of an intranet.",
        "Project management is another of the chapter&rsquo;s listed uses, and it covers plans, schedules and the status of work in progress. An annual deadline does not turn a form into a project."
      ]
    },
    {
      q: "Employees increasingly work from home and while travelling, and they need the intranet. Why does the chapter say companies use a virtual private network rather than simply publishing the intranet on the open web behind a password?",
      opts: [
        "Because a VPN lets employees connect securely to the company&rsquo;s intranet from the road or from home, keeping the traffic protected while it crosses public infrastructure",
        "Because a VPN makes the intranet faster, and the speed of the connection is what stops remote staff from using the site",
        "Because an intranet cannot technically be reached from outside the building, so a VPN is what makes the pages exist for a remote worker at all",
        "Because publishing on the open web would require rewriting the intranet in different software, which a VPN avoids having to do"
      ],
      a: 0,
      why: [
        "Correct. The chapter says increases in employee mobility mean the intranet must be accessible from anywhere, so most companies allow employees to use VPNs to connect securely to the intranet while on the road or working from home.",
        "A tunnel adds work at both ends rather than removing it, so speed is not the argument. The problem being solved is that the path between the employee and the office is public, not that it is slow.",
        "The site is perfectly reachable in a technical sense, which is exactly the danger. The VPN is chosen so that reachable does not mean reachable by everyone, not because remote access is otherwise impossible.",
        "No rewriting is involved either way. An intranet already uses the same software, hardware and networking technologies as a public site; what a VPN changes is who can get to it and how the traffic travels."
      ]
    }
  ]
};

ACT.orgArch = {
  kind: "diagram",
  label: "Interactive diagram",
  title: "Three arrangements, drawn one at a time",
  how: "Step through the public site, the intranet and the extranet, and watch where the boundary moves in each one.",
  objective: "3.2",
  models: [
    {
      id: "publicsite",
      name: "Public website",
      site: "The baseline: one server, one browser, and no question about who is asking",
      boxes: [
        {c: "a", t: "Who asks", w: "Anyone with an internet connection"},
        {c: "b", t: "The path", w: "The public internet, unrestricted"},
        {c: "c", t: "The check", w: "None &mdash; the content is meant for everyone"},
        {c: "d", t: "What is reached", w: "A web server holding general, public content"}
      ],
      points: [
        "This is the arrangement the previous section described, and the chapter&rsquo;s summary table puts it first: external communications, general public content, anyone with an internet connection, public and not restricted.",
        "There is no authentication step because there is nothing to protect. Everything published here has already been decided to be public, which is what makes the arrangement simple.",
        "It is the right design for products, opening hours, job openings and anything else the organization wants a stranger, and a search engine, to find.",
        "The other two arrangements are this one plus a decision about who is authorized. Nothing else about the technology changes, which is the point the whole section rests on."
      ]
    },
    {
      id: "intranet",
      name: "Intranet, reached over a VPN",
      site: "One organization&rsquo;s own network, used from a desk inside it and from a laptop anywhere else",
      boxes: [
        {c: "a", t: "Who asks", w: "A corporate client outside the local network"},
        {c: "b", t: "The path", w: "The public internet, crossed inside a VPN tunnel"},
        {c: "c", t: "The check", w: "A firewall at the edge of the corporate network"},
        {c: "d", t: "What is reached", w: "The server holding the internal site and its data"}
      ],
      points: [
        "Inside the building the picture is simpler still: a client on the local network reaches the same server directly, with no tunnel and no crossing of the internet at all.",
        "That simplest form is worth remembering on its own. Communications take place only within the confines of organizational boundaries and do not travel across the internet, so nothing is exposed to be intercepted.",
        "The <b>VPN</b> exists only because people move. It carries the outside client&rsquo;s traffic across public infrastructure to the firewall, so that working from home reaches the same server as working from a desk.",
        "The <b>firewall</b> is where the organization&rsquo;s boundary is drawn. Everything inside it is corporate and proprietary content for authorized employees; everything outside it has to be let through deliberately."
      ]
    },
    {
      id: "extranet",
      name: "Extranet, between two firms",
      site: "Two separate corporate networks, joined across the public internet for as long as the business relationship lasts",
      boxes: [
        {c: "a", t: "Who asks", w: "A client on the supplier&rsquo;s own network"},
        {c: "b", t: "First boundary", w: "The supplier&rsquo;s own firewall"},
        {c: "c", t: "The path", w: "The public internet, crossed inside a VPN tunnel"},
        {c: "d", t: "What is reached", w: "The partner&rsquo;s firewall, and behind it the server and data"}
      ],
      points: [
        "Two firewalls appear here rather than one, because there are now two organizations and each defends its own boundary. Neither company is inside the other.",
        "The partner logs on to the company&rsquo;s extranet website using an ordinary <b>web browser</b>. Nothing unusual is installed on the partner&rsquo;s machine, which is a large part of why extranets are practical between firms that share no technology.",
        "Because the arrangement uses the public and normally insecure internet infrastructure to connect two or more business partners, it often uses a VPN to secure the transmission of proprietary information between them.",
        "The content is genuinely on the web, and it is still private. Only authorized users reach it after logging on, which is how the chapter&rsquo;s table can call an extranet external communication and private, restricted access at the same time."
      ]
    }
  ]
};

ACT.orgSort = {
  kind: "sort",
  label: "Sort",
  title: "Internet, intranet, or extranet?",
  how: "Place each item using the chapter&rsquo;s four dimensions: focus, type of content, users, and access. Situations that are not the chapter&rsquo;s own are hypothetical practice situations, and each states the conditions you need.",
  objective: "3.2",
  buckets: [
    {id: "internet", name: "Internet", hint: "external communications, general and public content, anyone with an internet connection, public and not restricted"},
    {id: "intranet", name: "Intranet", hint: "internal communications, specific corporate and proprietary content, authorized employees, private and restricted"},
    {id: "extranet", name: "Extranet", hint: "external communications between business partners, authorized business partners, private and restricted"}
  ],
  items: [
    {t: "External communications carrying general, public content, open to anyone with an internet connection", b: "internet", why: "This is the chapter&rsquo;s own summary row. All four dimensions point outward, and no authorization step exists because nothing here was meant to be withheld."},
    {t: "Internal communications carrying specific, corporate and proprietary content for authorized employees", b: "intranet", why: "The chapter&rsquo;s intranet row. The content is proprietary and the users are on the payroll, so access is private and restricted even though the technology is ordinary web technology."},
    {t: "External communications between business partners, restricted to authorized business partners", b: "extranet", why: "The chapter&rsquo;s extranet row, and the one that catches people out: the focus is external, like the public internet, but the access is private and restricted, like an intranet."},
    {t: "A page describing the company&rsquo;s products and where its offices are, which the company wants search engines to find", b: "internet", why: "Wanting to be found is the giveaway. This is general, public content aimed at anyone with a connection, and adding a login to it would defeat its only purpose."},
    {t: "The required safety training every member of staff must complete, published where the public cannot reach it", b: "intranet", why: "Employee training is one of the five intranet uses the chapter lists, and the audience is authorized employees, which is what makes the access private and restricted."},
    {t: "In a hypothetical practice situation, a live order-status screen a component supplier logs in to see, so it knows what to ship next week", b: "extranet", why: "The supplier is neither an employee nor the general public. This is two firms using the internet to do business together, with the partner logging on through an ordinary browser."},
    {t: "A form on which employees change their own benefit elections and retirement-plan choices", b: "intranet", why: "This is employee self-service through an employee portal, the intranet use the chapter singles out, and only people on the payroll may have an election to change."},
    {t: "In a hypothetical practice situation, a shared price list that two firms maintain together so that neither has to email a spreadsheet to the other", b: "extranet", why: "A single shared copy between two companies is the extranet benefit of central document management and a single point of data entry, avoiding the versions problem entirely."},
    {t: "A careers page inviting applications from people who do not work for the organization yet", b: "internet", why: "The intended reader is by definition not an employee, so restricting it to authorized employees would make it useless. It is public content with an external focus."},
    {t: "In a hypothetical practice situation, a hospital&rsquo;s directory of which clinicians are on call tonight, visible only after signing in with a work account", b: "intranet", why: "Internal communication, proprietary content, authorized employees only. The sign-in is the authentication technique the chapter names as one of the two ways an intranet is secured."},
    {t: "In a hypothetical practice situation, a manufacturer gives an outside haulage firm a login so that the haulier can update delivery dates directly in the manufacturer&rsquo;s system", b: "extranet", why: "The haulier is an authorized business partner rather than an employee, and letting it enter the data once, at source, is exactly the single point of data entry the chapter describes."},
    {t: "In a hypothetical practice situation, a public help article the company deliberately publishes so that customers can solve a common problem without telephoning", b: "internet", why: "The whole value depends on customers finding it unaided, which means anyone with an internet connection has to be able to read it. That is public, unrestricted access."}
  ]
};

ACT.orgSiting = {
  kind: "sim",
  label: "Decide",
  title: "Siting and running a facility",
  how: "Work the four decisions in order, and compare every outcome before moving on, including the outcomes of the options you did not choose.",
  objective: "3.2",
  intro: "A hypothetical practice situation; no real organization is being described. You advise a growing logistics cooperative that has outgrown the server room behind its dispatch office. It now needs somewhere proper to put its machines, and four decisions have to be made before anything is built or rented.",
  steps: [
    {
      situation: "Two candidate sites cost the same. One sits inland on stable ground, far from any concentration of the cooperative&rsquo;s customers. The other sits close to the largest group of customers but on an exposed coast. The board wants a rule for choosing.",
      opts: [
        {t: "Choose the inland site automatically, because once a connection is fast enough distance no longer affects anything the user notices", ok: false, out: "Distance still costs time. That is precisely why the chapter names proximity to customers and users as a siting consideration in its own right, and it is the same physical fact that later justifies putting copies of content nearer to the people requesting it."},
        {t: "Treat it as a genuine trade-off, and settle it with the rest of the facility requirements", ok: true, out: "Right. The trade-off is between protection from the elements and proximity to users for lower latency. The chapter says organizations go to great lengths selecting locations that strike the optimal balance between protection from the elements, such as earthquakes or hurricanes, and proximity to the customers or users in order to reduce latency. Neither consideration outranks the other in advance, which is why power, cooling, connectivity, security and room to expand have to be weighed in the same conversation."},
        {t: "Choose the coastal site automatically, because reducing delay for users is the only difference a customer will ever perceive", ok: false, out: "Latency is real, but a flooded facility is not slow, it is unavailable, and the chapter treats availability as the key concern for a data-intensive organization. A site that is fast on most days and absent on the worst day has not solved the problem."},
        {t: "Decide it on land price alone, since the two sites are equally priced today and the cost of the building will dominate everything else", ok: false, out: "The two sites are already equally priced, so this rule does not even separate them. It also ignores the running costs the chapter emphasises &mdash; power, cooling and the consequences of downtime &mdash; which continue for as long as the facility does."}
      ]
    },
    {
      situation: "The design brief doubles the number of servers. The facilities manager proposes keeping the existing air-conditioning, arguing that the machines have their own fans and that cooling is a comfort item rather than an operating requirement.",
      opts: [
        {t: "Accept it, because cooling capacity only has to be increased once the equipment actually begins to fail in service", ok: false, out: "By the time components fail, the damage is already paid for. The chapter presents cooling as what keeps equipment inside its optimal range and therefore extends its life, which makes it a preventive cost rather than a repair triggered by a failure."},
        {t: "Accept it, but move the servers further apart inside the room so the existing air-conditioning has less work to do", ok: false, out: "Spreading equipment out uses more floor space, which the chapter lists among the facility&rsquo;s own requirements, and it does not remove any heat from the room. The total energy going in still has to come out as heat somewhere."},
        {t: "Defer it, on the grounds that electricity is a running cost and running costs are decided after the facility is built", ok: false, out: "Provision of energy and cooling is one of the demands the chapter places on the data center overall, alongside connectivity, floor space and security. Treating it as an afterthought is how a facility ends up unable to power the equipment it was built to hold."},
        {t: "Reject it: doubling the machines doubles the power drawn and the heat to be removed", ok: true, out: "Right. Processing that volume of data requires lots of power, and it also requires air-conditioning to hold the equipment within its optimal temperature range, which helps increase the life span of the equipment. The chapter ties the two together explicitly. Heat is not a side effect to be tolerated; running outside the optimal range shortens the life of the hardware, so an upgrade that doubles the machines has quietly doubled a cooling requirement as well."}
      ]
    },
    {
      situation: "The cooperative&rsquo;s dispatch system now runs continuously, and the board asks what a five-nines availability target would actually commit it to.",
      opts: [
        {t: "Just over five minutes of unavailability in an entire year, covering every failure and every upgrade", ok: true, out: "Right. That budget covers mistakes too, and it constrains both the components and the building around them. Five-nines means 99.999 percent availability, which the chapter translates into just over five minutes of downtime per year. That budget forces the specific demands it lists: parts such as hard drives that can be swapped quickly, and a facility with the connectivity, floor space, energy, cooling and security to keep running while that happens."},
        {t: "Five minutes of unavailability per incident, after which the service is expected to be restored", ok: false, out: "This is the most common misreading and it makes the target sound comfortable. The chapter&rsquo;s figure is annual, so the whole year&rsquo;s worth of interruptions has to fit inside the same five minutes."},
        {t: "A promise that no individual component will fail during the year, which is what the additional nines are counting", ok: false, out: "Availability is not the absence of failure. The chapter&rsquo;s own requirement is being able to swap a failed hard drive or other part quickly, which assumes components will fail and asks that the service survive it."},
        {t: "A target about the speed of the service rather than its availability, since users judge a system by how quickly it responds", ok: false, out: "Response time matters and the chapter discusses it under latency, but availability answers a different question: whether the system can be reached at all. A fast system nobody can open is unavailable."}
      ]
    },
    {
      situation: "Finally, the board compares building a facility of its own against renting space for its servers in a data center run by a third party that also rents to other organizations.",
      opts: [
        {t: "Treat the two as identical in substance, since the servers are the same machines running the same software in both cases", ok: false, out: "The machines are indeed the same, which is what makes this tempting. Everything around them differs, though, and the chapter&rsquo;s facility example is a list of exactly those surroundings: generated power, chilled water, engineered walls and raised floors."},
        {t: "Reject renting on the grounds that high availability can only be reached in a facility the organization has built and controls itself", ok: false, out: "The chapter presents collocation as a straightforward alternative rather than a compromise, and a shared facility built for many tenants may well exceed what a single small organization could justify building alone."},
        {t: "Recognize the second option as a collocation facility, and rent the space rather than build it", ok: true, out: "Right. The cooperative still owns and manages its own servers, but stops paying for the building, the power, the cooling and the physical security. The chapter defines a collocation facility as a data center managed by a third party that rents out space to multiple organizational customers. It is a change in what you own around the machines, not in who owns the machines, and that distinction is what makes it a different decision from renting computing itself."},
        {t: "Choose renting on the grounds that it removes the cooperative&rsquo;s responsibility for its servers and for the data on them", ok: false, out: "Renting space is not renting responsibility. In a collocation facility the tenant still owns, manages, patches and repairs its own servers; what the third party manages is the room they stand in."}
      ]
    }
  ]
};

ACT.orgQuiz2 = {
  kind: "quiz",
  label: "Check yourself",
  title: "Facilities, availability, and the alternative",
  how: "Three questions on where the machines live and what keeping them running demands; every explanation says what the option it describes would really be.",
  objective: "3.2",
  questions: [
    {
      q: "What does the chapter mean by a data center, and how large is one?",
      opts: [
        "A building of at least warehouse size, since anything smaller is a server room and is not managed as a facility",
        "Dedicated space set aside for an organization&rsquo;s infrastructure components, ranging from a single server room to a building the size of a large warehouse",
        "The collection of servers an organization owns, wherever those machines physically happen to be located",
        "A facility operated by a third party in which organizations rent space rather than building anything of their own, which is what the word has meant since renting became the usual arrangement"
      ],
      a: 1,
      why: [
        "Size is the one thing the chapter refuses to fix. It gives a range precisely so that a single dedicated server room counts, which matters because most organizations start there.",
        "Correct. The chapter says companies typically set aside dedicated space for their infrastructure components, and that such data centers can range in size from a single dedicated server room to buildings the size of a large warehouse.",
        "Scattered machines are what a data center replaces. The reason for gathering them is stated plainly: keeping the infrastructure in one location helps in managing, repairing, upgrading and securing the equipment.",
        "That describes a collocation facility, which the chapter offers as an alternative to building one. A data center may be your own or somebody else&rsquo;s, and the definition does not turn on who owns the walls."
      ]
    },
    {
      q: "A manager says the organization has reached five-nines availability because its main server has not failed since it was installed eighteen months ago. What is wrong with the reasoning?",
      opts: [
        "Nothing is wrong, because an unbroken run is the strongest possible evidence that the availability target has been met",
        "Availability is measured component by component, so a single server can never be described using a figure that belongs to the facility as a whole, and the two numbers should not be compared",
        "Five-nines describes response time rather than uptime, so an unbroken run says nothing about whether the target was reached",
        "Availability covers whether the service can be reached at all, which depends on connectivity, energy, cooling and security as much as on the server itself"
      ],
      a: 3,
      why: [
        "An unbroken run of one machine is encouraging and is not the measure. The chapter attaches availability to the hardware, storage and networking components together, and to the data center overall.",
        "The chapter does place demands on individual components, such as swapping a failed drive quickly, so component-level requirements are real. The target itself is about the service being reachable, which no single part can deliver alone.",
        "Response time is a separate concern, discussed under latency and proximity to users. Five-nines is 99.999 percent availability, which the chapter translates directly into just over five minutes of downtime per year.",
        "Correct. The chapter ties the target to hardware, storage and networking components together and to the facility&rsquo;s connectivity, floor space, energy, cooling and security, so a healthy server proves only that one of those has held."
      ]
    },
    {
      q: "The chapter lists the parcel carrier&rsquo;s self-generated power, its chilled-water reserves, its wind-rated buildings and its raised floors. What is the managerial lesson that leads directly into the next objective?",
      opts: [
        "That reliable infrastructure is bought mostly outside computing, which is exactly the set of costs an organization stops carrying when it rents capacity instead of owning it",
        "That any organization needing reliable systems should expect to build a facility of this kind for itself before it can operate safely, and should treat the cost as the price of being taken seriously",
        "That the largest risk to a data center is severe weather, so siting decisions can be settled by weather records alone",
        "That equipment failure is the main cause of downtime, so the answer is to buy more reliable individual machines"
      ],
      a: 0,
      why: [
        "Correct. Generators, cooling, water, engineered walls and raised floors are all bought to prevent interruption rather than to compute anything, and shedding that whole category of spending is the economic argument the cloud material rests on.",
        "The chapter offers the facility as a prime example of high availability, not as a template. It immediately names renting space in a collocation facility as the alternative most organizations take.",
        "Weather is one half of the siting balance and proximity to users for lower latency is the other, and the chapter insists on both. A decision made on weather records alone has ignored everything the users experience.",
        "Component reliability matters, which is why the chapter asks that a failed drive be swappable quickly. But it treats failure as expected and survivable, and it puts connectivity, energy, cooling and security beside the machines as equal requirements."
      ]
    }
  ]
};
