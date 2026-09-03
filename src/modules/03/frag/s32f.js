/* ===== s32f ===== */
PROSE.s32f = `
<span class="eyebrow">Section 3&ndash;2f</span>
<h2>Intranets, extranets, and where the machines live</h2>
<p class="lede">The last two sections built the web out of parts: a browser asking, a server answering, an address that finds the right machine. Every one of those parts is indifferent to who is asking. This section adds the two decisions that turn that indifferent machinery into something a business can run on &mdash; who is allowed in, which turns one technology into three different tools, and where the machines physically sit, which is about weather, electricity and distance as much as about computing.</p>

<h3>The same website, with a lock on the door</h3>
<p>Start with something you have already used. A company publishes pages anybody can read: what it sells, where its offices are, how to apply for a job. Now picture the same company publishing a second set of pages that only its own staff can open &mdash; this month&rsquo;s announcements, the training you have to finish by Friday, the form for changing your health cover. Nothing about the technology has changed. What changed is who is let in.</p>
<p>That second set of pages has a name. An <b>intranet</b> looks and acts just like a publicly accessible website and uses the same software, hardware and networking technologies to transmit and display data, but it uses authentication techniques, firewalls, or both, to secure proprietary data held inside the corporate network so that the data can be viewed only by authorized users.</p>
<p>The plainest version never touches the public internet at all. In the simplest form of an intranet, communications take place only within the confines of organizational boundaries and do not travel across the internet &mdash; which is one reason an intranet can carry material a company would not put on the open web under any circumstances.</p>
<p>The chapter names five things organizations use intranets for. None of them is exotic; they are ordinary office work, moved onto web pages.</p>
<ul class="keys">
<li><b>Disseminating corporate information</b> &mdash; announcements, policies and reference material published once, in one place, so that nobody is working from a copy that was emailed round the building last spring.</li>
<li><b>Employee training</b> &mdash; courses and materials staff work through on their own schedule, which is only practical if the material is reachable from every desk without also being reachable by the public.</li>
<li><b>Project management</b> &mdash; the plans, schedules and current status of work in progress, kept where every member of the project sees the same version at the same moment.</li>
<li><b>Collaboration</b> &mdash; the shared documents and discussions that let people in different departments and different buildings work on one thing together rather than separately and in parallel.</li>
<li><b>Employee self-service</b> &mdash; portals where staff administer their own benefits, manage retirement plans and handle other human-resources tasks themselves, instead of asking somebody in an office to do it on their behalf.</li>
</ul>
<p>The last of those is worth pausing on, because it is where an intranet usually pays for itself. Every benefit election a person makes for themselves is a form that nobody has to receive, read, key in and file. The work does not disappear; it moves to the person who already knows the answer.</p>

<h3>Reaching the inside from outside</h3>
<p>An intranet that only works from a desk in the building has an obvious problem: a growing share of the people who need it are not in the building. Increases in employee mobility mean an intranet has to be reachable from anywhere, and the answer is not to put it on the open web and hope a password is enough.</p>
<p>Instead, most companies let employees use a <b>virtual private network</b>, or VPN, to connect securely to the company&rsquo;s intranet while travelling or working from home. Picture the public internet as a road anybody may drive on and the VPN as an armoured van moving along it. The route is public and the contents are not, and anyone watching the road sees a van rather than what is inside it.</p>
<p>Before the architecture, check the two ideas you have just met.</p>

<div class="activity" data-activity="orgQuiz1"></div>

<h3>Extranets: letting a partner in, deliberately</h3>
<p>An intranet solves the problem of your own staff. It does nothing at all for the other companies you depend on, and a modern business depends on a great many: the supplier who has to know what to ship next week, the distributor who needs current prices, the laboratory running your samples. Those people are not employees, so they cannot be inside the intranet. They are also not the general public, so the public site tells them nothing they need.</p>
<p>The arrangement built for them is an <b>extranet</b>, which can be regarded as a private part of the internet cordoned off from ordinary users, and which enables two or more firms to use the internet to do business together. Although the content is on the web, only authorized users can reach it after logging on to the company&rsquo;s extranet website, which they do with an ordinary web browser rather than with special software.</p>
<p>Because an extranet uses the public &mdash; and normally insecure &mdash; internet infrastructure to connect two or more business partners, it often uses VPNs to ensure the secured transmission of proprietary information between them. Same road, same armoured van, a different passenger.</p>
<p>The chapter draws both arrangements. Work through the diagram one at a time and notice how few parts there are, and how much of the design is simply deciding where the boundary goes.</p>

<div class="activity" data-activity="orgArch"></div>

<h3>One technology, three arrangements</h3>
<p>The chapter summarises the whole distinction in a single table, and it is worth reading carefully, because none of the four columns mentions technology. The internet, an intranet and an extranet differ by what they are for, what is on them, who may use them and how access is controlled &mdash; not by what they are built from.</p>

<div class="tbl-wrap"><table class="tbl">
<thead><tr><th>Arrangement</th><th>Focus</th><th>Type of content</th><th>Users</th><th>Access</th></tr></thead>
<tbody>
<tr><td><b>Internet</b></td><td>External communications</td><td>General, public content</td><td>Anyone with an internet connection</td><td>Public and not restricted</td></tr>
<tr><td><b>Intranet</b></td><td>Internal communications</td><td>Specific, corporate and proprietary content</td><td>Authorized employees</td><td>Private and restricted</td></tr>
<tr><td><b>Extranet</b></td><td>External communications</td><td>Communications between business partners</td><td>Authorized business partners</td><td>Private and restricted</td></tr>
</tbody>
</table></div>

<p>Read down the Users column and the design decision appears on its own. Anyone, then authorized employees, then authorized business partners. That is the whole difference, and it is an organizational question rather than a technical one: somebody has to decide which category a person falls into before any system can enforce it.</p>
<p class="takeaway">One set of web technologies, three audiences, separated by who is authorized &mdash; which is why the question &ldquo;should this be an intranet or an extranet?&rdquo; is always answered by naming the reader, never by comparing products.</p>

<div class="activity" data-activity="orgSort"></div>

<h3>What an extranet is actually worth</h3>
<p>Knowing what an extranet is does not tell you why a company would build one. The chapter gives seven reasons, and they are the clearest passage in the book on using technology to work with other firms, so they are worth having in full.</p>
<ul class="keys">
<li><b>Timeliness and accuracy</b> &mdash; extranets can dramatically improve the timeliness and accuracy of communications, reducing the potential for misunderstandings inside the organization as well as with business partners and customers.</li>
<li><b>Keeping changing information current</b> &mdash; in business very little information is static, so it must be continually updated and disseminated as it changes, and an extranet is a cost-effective, global medium over which proprietary information can be distributed.</li>
<li><b>Central management of documents</b> &mdash; one managed copy reduces the number of versions in circulation and the amount of out-of-date information stored in various places throughout the organization.</li>
<li><b>A workable level of security on a public path</b> &mdash; security is still considered better on proprietary networks, but the chapter&rsquo;s judgment is that the internet can be used as a relatively secure medium for doing business.</li>
<li><b>Automating business transactions</b> &mdash; moving orders, confirmations and invoices through a system rather than through people reduces both processing costs and cycle times, which is to say both the money and the waiting.</li>
<li><b>A single point of data entry</b> &mdash; extranets reduce errors by giving data one place to be entered, from which it can be updated on disparate corporate computing platforms without having to be reentered anywhere.</li>
<li><b>Real-time data for management</b> &mdash; because the transactions arrive as they happen, management can obtain real-time data with which to track and analyze business activities rather than waiting for a monthly summary.</li>
</ul>
<p>The sixth of those is the one that surprises people, so hold on to it. Most errors between two companies are not caused by carelessness; they are caused by the same fact being typed in twice. A quantity entered by the supplier and reentered by the buyer is two chances to be wrong and no way of knowing which copy is right. Removing the second keystroke removes the disagreement, and that is why a benefit that sounds clerical shows up in the accounts.</p>

<h3>Where the machines actually live</h3>
<p>Everything so far has been about arrangements of software. Underneath all of it there are physical machines in a physical room, and once an organization has enough of them, that room becomes a management problem in its own right. Large organizations need hundreds, or even thousands, of servers, and the chapter gives four very different reasons why.</p>
<ul class="keys">
<li><b>Moving things</b> &mdash; a parcel carrier such as UPS needs tremendous amounts of computing power simply to route and track packages as they cross a network of vehicles and depots.</li>
<li><b>Selling things</b> &mdash; an online store such as Zappos needs to provide product information to shoppers and to track customer orders from the moment one is placed until it arrives.</li>
<li><b>Watching what players do</b> &mdash; a game developer such as Epic Games needs to track each and every action users take in a game as popular as Fortnite, which is an enormous number of very small records.</li>
<li><b>Training models</b> &mdash; a company such as OpenAI needs the computing power to train its latest generative artificial intelligence models, which is a different and far heavier demand again.</li>
</ul>
<p>Because the hardware and storage grow quickly, companies typically set aside dedicated space for their infrastructure components. That dedicated space is a <b>data center</b>, and the word covers an enormous range: such facilities run from a single dedicated server room at the back of an office to buildings the size of a large warehouse.</p>
<p>Two practical facts follow immediately, and neither is about computing. Storing and processing massive amounts of data requires a great deal of power, and it also requires air-conditioning to keep the equipment running within its optimal temperature range, which helps increase the life span of the equipment. So one upgrade buys two bills: the electricity the machines draw, and the electricity the cooling draws to remove the heat they produce.</p>
<p>Putting everything in one place is a deliberate choice rather than an accident of history. Keeping the infrastructure in one location helps in managing, repairing, upgrading and securing the equipment &mdash; one set of spare parts, one set of doors, one place to send an engineer at three in the morning.</p>
<p>Choosing which location, though, is a genuine trade-off with no clean answer. Organizations go to great lengths selecting locations that strike the optimal balance between protection from the elements, such as earthquakes or hurricanes, and proximity to the customers or users, in order to reduce latency. Distance costs time, and the safest ground is rarely the ground nearest the people you serve.</p>

<h3>Availability, and what five-nines means in minutes</h3>
<p>Today, almost any business can be considered an e-business. Data are the lifeblood of almost all organizations, so reliably accessing those data is a key concern &mdash; especially for data-intensive organizations, which the chapter illustrates with a range running from e-commerce companies through logistics companies to government agencies.</p>
<p>Such organizations strive for the highest level of availability of their hardware, storage and networking components, often reaching for <b>five-nines availability</b>: 99.999 percent, which translates into just over five minutes of downtime per year. Do the arithmetic slowly, because the number is easy to nod at and hard to believe. Five minutes is not five minutes per outage. It is the entire budget for every failure, every upgrade and every mistake across twelve months.</p>
<p>A target that severe reaches past the computers and into the building. The chapter separates what it demands of the parts from what it demands of the facility around them.</p>
<ul class="keys">
<li><b>Demands on individual components</b> &mdash; being able to swap a failed hard drive or another part quickly, so that a failure becomes a repair carried out while the service is still running rather than an outage.</li>
<li><b>Demands on the facility as a whole</b> &mdash; connectivity, floor space, provision of energy and cooling, and physical security, because a working server in a room with no power and no air conditioning is not available to anybody.</li>
<li><b>Demands on the design for tomorrow</b> &mdash; data centers need to be modular so they can be expanded easily as needs change, since a facility that cannot grow forces the whole decision to be made again in three years.</li>
</ul>

<h3>One facility, described</h3>
<p>Abstractions about availability become concrete very fast when you look at what a high-availability facility actually contains. The chapter describes the parcel carrier&rsquo;s data centers in Atlanta, Georgia and Mahwah, New Jersey as prime examples, and the details are worth reading as a list of things somebody had to buy.</p>
<ul class="keys">
<li><b>Its own electricity</b> &mdash; the data centers are self-sufficient, and each one can operate for up to two days on power it generates itself if the supply from outside fails entirely.</li>
<li><b>Cooling on the scale of a neighbourhood</b> &mdash; the power is needed not only for the computers but for air-conditioning, and each facility needs air-conditioning capacity equalling that of more than 2,000 homes.</li>
<li><b>Water, and then backup water</b> &mdash; if power fails, cooling is provided using more than 600,000 gallons of chilled water, and the facilities even have backup wells in case the municipal water supply should fail.</li>
<li><b>A building designed against weather</b> &mdash; the buildings are designed to withstand winds of 200 miles per hour, and raised floors protect the equipment from flooding.</li>
</ul>
<p>Read that list again as a bill rather than as a boast. Generators, fuel, chillers, wells, engineered walls and raised floors are all bought before a single customer request has been served, and they are all bought in order to prevent something rather than to produce something.</p>
<p>There is an alternative, and it is the one most organizations take. Rather than building any of that, an organization can rent space for its own servers in a <b>collocation facility</b> &mdash; a data center managed by a third party that rents out space to several organizational customers. The tenant still buys, owns and manages its own machines. What it stops buying is the building, the power, the cooling and the physical security around them.</p>
<p>The decisions below are the ones somebody has to make before any of this exists. Work them in order.</p>

<div class="activity" data-activity="orgSiting"></div>

<div class="callout tip"><b class="tagline">Where this is heading</b> Notice what the facility in that example actually spent its money on: generators, chillers, water, walls, floors, guards, spare parts and room to expand. Almost none of it is computing. Every item on that list is something a cloud customer stops buying, and that observation &mdash; not any argument about technology &mdash; is what the next objective is really about.</div>

<p>One last pass over the vocabulary of this section before the infrastructure starts aging.</p>

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
        {t: "Treat it as a genuine trade-off between protection from the elements and proximity to users for lower latency, and decide it alongside power, cooling, connectivity, security and room to expand", ok: true, out: "Right. The chapter says organizations go to great lengths selecting locations that strike the optimal balance between protection from the elements, such as earthquakes or hurricanes, and proximity to the customers or users in order to reduce latency. Neither consideration outranks the other in advance, which is why the facility requirements have to be weighed in the same conversation."},
        {t: "Choose the inland site automatically, because once a connection is fast enough distance no longer affects anything the user notices", ok: false, out: "Distance still costs time. That is precisely why the chapter names proximity to customers and users as a siting consideration in its own right, and it is the same physical fact that later justifies putting copies of content nearer to the people requesting it."},
        {t: "Choose the coastal site automatically, because reducing delay for users is the only difference a customer will ever perceive", ok: false, out: "Latency is real, but a flooded facility is not slow, it is unavailable, and the chapter treats availability as the key concern for a data-intensive organization. A site that is fast on most days and absent on the worst day has not solved the problem."},
        {t: "Decide it on land price alone, since the two sites are equally priced today and the cost of the building will dominate everything else", ok: false, out: "The two sites are already equally priced, so this rule does not even separate them. It also ignores the running costs the chapter emphasises &mdash; power, cooling and the consequences of downtime &mdash; which continue for as long as the facility does."}
      ]
    },
    {
      situation: "The design brief doubles the number of servers. The facilities manager proposes keeping the existing air-conditioning, arguing that the machines have their own fans and that cooling is a comfort item rather than an operating requirement.",
      opts: [
        {t: "Reject it: processing that volume of data requires lots of power and also requires air-conditioning to hold the equipment within its optimal temperature range, which helps increase the life span of the equipment", ok: true, out: "Right. The chapter ties the two together explicitly. Heat is not a side effect to be tolerated; running outside the optimal range shortens the life of the hardware, so an upgrade that doubles the machines has quietly doubled a cooling requirement as well."},
        {t: "Accept it, because cooling capacity only has to be increased once the equipment actually begins to fail in service", ok: false, out: "By the time components fail, the damage is already paid for. The chapter presents cooling as what keeps equipment inside its optimal range and therefore extends its life, which makes it a preventive cost rather than a repair triggered by a failure."},
        {t: "Accept it, but move the servers further apart inside the room so the existing air-conditioning has less work to do", ok: false, out: "Spreading equipment out uses more floor space, which the chapter lists among the facility&rsquo;s own requirements, and it does not remove any heat from the room. The total energy going in still has to come out as heat somewhere."},
        {t: "Defer it, on the grounds that electricity is a running cost and running costs are decided after the facility is built", ok: false, out: "Provision of energy and cooling is one of the demands the chapter places on the data center overall, alongside connectivity, floor space and security. Treating it as an afterthought is how a facility ends up unable to power the equipment it was built to hold."}
      ]
    },
    {
      situation: "The cooperative&rsquo;s dispatch system now runs continuously, and the board asks what a five-nines availability target would actually commit it to.",
      opts: [
        {t: "Just over five minutes of unavailability in an entire year, covering every failure, upgrade and mistake, which constrains both the components and the building around them", ok: true, out: "Right. Five-nines means 99.999 percent availability, which the chapter translates into just over five minutes of downtime per year. That budget forces the specific demands it lists: parts such as hard drives that can be swapped quickly, and a facility with the connectivity, floor space, energy, cooling and security to keep running while that happens."},
        {t: "Five minutes of unavailability per incident, after which the service is expected to be restored", ok: false, out: "This is the most common misreading and it makes the target sound comfortable. The chapter&rsquo;s figure is annual, so the whole year&rsquo;s worth of interruptions has to fit inside the same five minutes."},
        {t: "A promise that no individual component will fail during the year, which is what the additional nines are counting", ok: false, out: "Availability is not the absence of failure. The chapter&rsquo;s own requirement is being able to swap a failed hard drive or other part quickly, which assumes components will fail and asks that the service survive it."},
        {t: "A target about the speed of the service rather than its availability, since users judge a system by how quickly it responds", ok: false, out: "Response time matters and the chapter discusses it under latency, but availability answers a different question: whether the system can be reached at all. A fast system nobody can open is unavailable."}
      ]
    },
    {
      situation: "Finally, the board compares building a facility of its own against renting space for its servers in a data center run by a third party that also rents to other organizations.",
      opts: [
        {t: "Recognize the second option as a collocation facility: the cooperative still owns and manages its own servers, but stops paying for the building, the power, the cooling and the physical security", ok: true, out: "Right. The chapter defines a collocation facility as a data center managed by a third party that rents out space to multiple organizational customers. It is a change in what you own around the machines, not in who owns the machines, and that distinction is what makes it a different decision from renting computing itself."},
        {t: "Treat the two as identical in substance, since the servers are the same machines running the same software in both cases", ok: false, out: "The machines are indeed the same, which is what makes this tempting. Everything around them differs, though, and the chapter&rsquo;s facility example is a list of exactly those surroundings: generated power, chilled water, engineered walls and raised floors."},
        {t: "Reject renting on the grounds that high availability can only be reached in a facility the organization has built and controls itself", ok: false, out: "The chapter presents collocation as a straightforward alternative rather than a compromise, and a shared facility built for many tenants may well exceed what a single small organization could justify building alone."},
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
