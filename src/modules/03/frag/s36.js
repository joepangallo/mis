/* ===== s36 ===== */
PROSE.s36 = `
<span class="eyebrow">Application supplement &middot; 3&ndash;6</span>
<h2>The internet as a business tool</h2>
<p class="lede">Everything in this section has already appeared somewhere in this module: the internet, the web, intranets and extranets, the copies of pages held near users, the interfaces that let one application ask another a question. What the chapter never does is set those pieces side by side and ask the plain business question &mdash; what does a company actually use all of this for? The answer is three things, and telling them apart comes down to one decision, taken by a person rather than by a machine.</p>

<div class="callout info"><b>How this supplement relates to the chapter.</b> Chapter 3 teaches each of these parts where it belongs, as infrastructure. This supplement reassembles them around the audience being served, because that is the shape the course&rsquo;s own objective takes: using internet technology for electronic commerce, for communicating with employees, and for working with business partners. It is a labeled application supplement rather than a textbook learning objective, it adds no claim the chapter does not already make, and every organization used for practice in it is hypothetical and invented.</div>

<h3>Three jobs, one set of parts</h3>
<p>Begin with the fact that makes this genuinely confusing rather than merely new. A browser asking a server for a page behaves in exactly the same way whether the person reading it is a shopper, a member of staff, or a supplier&rsquo;s dispatcher. Same request, same protocol, same page arriving. The technology has no opinion about who is at the other end of it.</p>
<p>What differs is who is authorized, and that is a decision somebody in the organization has to take before any system can enforce it. The chapter&rsquo;s comparison of the internet, an intranet and an extranet, which you met earlier in this module, separates the three by focus, content, users and access rather than by what they are built from. Read that table again and it turns out to be a table of audiences.</p>
<p>Those audiences are the three jobs, and they are worth naming plainly before anything is built for them.</p>
<ul class="keys">
<li><b>Selling to customers</b> &mdash; general, public content that anyone with an internet connection may read, which is the arrangement the chapter calls the internet, and which almost every organization now depends on to take money at all.</li>
<li><b>Communicating with employees</b> &mdash; specific, corporate and proprietary content restricted to authorized employees, which is the arrangement the chapter calls an intranet, and which quietly replaced an enormous amount of paper.</li>
<li><b>Working with business partners</b> &mdash; communications between two or more firms doing business together, restricted to authorized partners, which is the arrangement the chapter calls an extranet and carries over the public internet.</li>
</ul>
<p>Three audiences, one technology, one decision. Everything that follows is a consequence of that, including the expensive mistakes at the end of the section.</p>

<h3>Selling to customers: almost any business is an e-business</h3>
<p>The chapter states it without qualification: today, almost any business can be considered an e-business. That sentence is stronger than it first looks, because it does not say almost any business sells online. It says the business now runs on its data being reachable &mdash; and once that is true, the wire and the server are part of the trading position whether or not one item is ever bought on the site.</p>
<p>A hypothetical example makes the range obvious. A veterinary practice that publishes nothing but its address, its opening hours and a booking form has still put its bookings on the internet. When that page fails to load on a Monday morning, appointments are not made and the money is not taken. Data are the lifeblood of almost all organizations, so reliably accessing them is a key concern, which is the chapter&rsquo;s reason for caring about availability at all.</p>
<p>Four demands follow from that, and every one of them was taught earlier in this module as a piece of infrastructure rather than as a commercial requirement. Assembled, they are what selling over the internet actually asks of a company.</p>
<ul class="keys">
<li><b>Answering while the customer is still there</b> &mdash; operational data for a site where response time is of the essence belongs on fast disk-based storage, and on flash-based storage where access speed is of crucial importance, because a page that arrives late has already lost the sale.</li>
<li><b>Surviving the busiest fortnight of the year</b> &mdash; firms engaged in or supporting business-to-consumer electronic commerce meet a large spike in demand before the December holidays, and the capacity that felt generous in March is what decides how that fortnight goes.</li>
<li><b>Closing the distance</b> &mdash; the greater the geographical distance between a user and the server holding the content, the longer that content takes to arrive, which is the delay a network of servers holding copies in several locations exists to remove.</li>
<li><b>Being available at all</b> &mdash; organizations that depend on trading electronically strive for the highest availability of their hardware, storage and networking components, and the five-nines target the chapter describes leaves just over five minutes of downtime in a year.</li>
</ul>
<p>Notice what kind of decisions those are. Not one of them is a marketing decision, and not one of them can be taken after the campaign has been booked. For a business selling over the internet the shopfront <i>is</i> the infrastructure, which is the whole of the chapter&rsquo;s argument for why a manager should care about plumbing.</p>

<div class="activity" data-activity="bizQuiz1"></div>

<h3>Communicating with employees: the inside of the building, from anywhere</h3>
<p>The second audience is the organization&rsquo;s own staff, and the arrangement built for them is the intranet you met earlier: the same web technologies, secured with authentication techniques, firewalls, or both, so that proprietary material is visible only to authorized users. What is worth adding here is not the definition but the accounting &mdash; what each internal use replaced, and why the replacement costs less.</p>
<p>The chapter names five internal uses. Read them as a column of things that somebody used to do by hand.</p>
<div class="tbl-wrap"><table class="tbl">
<thead><tr><th>Internal use</th><th>What it replaces</th><th>What changes as a result</th></tr></thead>
<tbody>
<tr><td><b>Disseminating corporate information</b></td><td>A notice sent round the building and kept in whichever copy each person happened to save</td><td>One current copy in one place, so arguments about what the policy says stop happening</td></tr>
<tr><td><b>Employee training</b></td><td>Scheduling everybody into a room on a day that suits almost nobody</td><td>Staff work through the material from any desk, on their own schedule</td></tr>
<tr><td><b>Project management</b></td><td>Status reported upward, rewritten, and then redistributed downward</td><td>Every member of the project sees the same plan and the same state at the same moment</td></tr>
<tr><td><b>Collaboration</b></td><td>Documents mailed back and forth between departments and buildings</td><td>People in different places work on one thing rather than on parallel copies of it</td></tr>
<tr><td><b>Employee self-service</b></td><td>A form completed by a member of staff and then keyed in by somebody in an office</td><td>The work moves to the person who already knows the answer, and one keystroke disappears</td></tr>
</tbody>
</table></div>
<p>Only the last row saves money you could point at in a budget, and it is the row to hold on to, because the same move reappears in the next audience. Nothing there was automated. A step was deleted, because the person who held the information was finally allowed to record it directly.</p>
<p>Then there is the question of where the employee is standing. An intranet reachable only from a desk inside the building serves a workforce that is increasingly not inside the building, so most companies let employees use a virtual private network to connect securely to the intranet while travelling or working from home.</p>
<p>The audience has not changed there; only the road has. It is the same promise the cloud characteristic called broad network access makes when it says a service is available from almost anywhere and from almost any web-enabled device &mdash; the same internal material, on whatever device the person happens to have with them.</p>

<h3>Working with partners: the second keystroke</h3>
<p>The third audience is the other companies the organization depends on: the supplier who has to know what to ship, the haulier who has to know what to collect, the laboratory running the samples. They are not employees, so the intranet is shut to them. They are not the public, so the public site tells them nothing they need. The chapter&rsquo;s answer is the extranet &mdash; a private part of the internet reachable by authorized business partners after logging on, and usually secured with a tunnel.</p>
<p>The interesting part is not the arrangement itself but the failure it removes. Follow one hypothetical order through two companies that share nothing, and watch where the cost appears.</p>
<ol class="steps">
<li><b>The buyer records the order.</b> A purchasing clerk enters the quantities into the buyer&rsquo;s own system, which becomes one authoritative record, and emails a copy of it across to the supplier.</li>
<li><b>The supplier records it again.</b> Somebody at the supplier reads that email and types the same quantities into a different system, creating a second record that merely resembles the first one.</li>
<li><b>The buyer changes something.</b> A quantity is revised and a second email goes out, so the supplier&rsquo;s record is now a version behind, and nothing in either system says which of the two numbers counts.</li>
<li><b>The goods arrive.</b> The disagreement surfaces in the receiving bay, the most expensive place in either company to find it, and settling it costs a phone call, a credit note, and sometimes a second lorry.</li>
</ol>
<p>Nobody in that story was careless. The error was manufactured by step two, and step two exists only because two firms keep separate copies of one fact. The chapter&rsquo;s name for removing it is a single point of data entry, from which data can be updated on disparate corporate computing platforms without having to be reentered &mdash; and the benefit that sounds clerical is the one that turns up in the accounts.</p>
<p>Three more of the chapter&rsquo;s partner benefits are worth reading as business outcomes rather than as features of a product.</p>
<ul class="keys">
<li><b>Automating business transactions</b> &mdash; moving orders, confirmations and invoices through a system rather than through people reduces processing costs and cycle times, which is to say both the money spent and the time spent waiting.</li>
<li><b>Real-time data for management</b> &mdash; because transactions arrive as they happen, management can obtain real-time data with which to track and analyze business activities, instead of waiting for a summary written after the month it describes.</li>
<li><b>Central management of documents</b> &mdash; one managed copy reduces the number of versions in circulation and the amount of out-of-date information stored in various places, which matters most when the other reader works for a different firm.</li>
</ul>
<p>There is a version of this same relationship with the people taken out of it altogether. An interface between applications lets one organization&rsquo;s system use a service another organization provides, without knowing how that service is produced, by passing agreed values and receiving an answer back. A shared web area lets two firms read one record; an interface lets their two systems do it unattended. The principle is identical &mdash; an agreed shape, one authoritative answer &mdash; with the browser and the clerk removed.</p>
<p>The situations below are all hypothetical and invented. Sort each one by the audience it is really serving, because that is the decision that settles everything else about it.</p>

<div class="activity" data-activity="bizSort"></div>

<h3>Getting the audience wrong</h3>
<p>In practice the wrong answer here is almost never a technology. It is publishing to the wrong audience, and there are three familiar ways of doing that, each of which looks like a shortcut on the day it is taken.</p>
<ul class="keys">
<li><b>Internal material on the public site</b> &mdash; usually done to avoid the trouble of managing accounts, and it works right up until somebody notices that proprietary content has become general content and cannot be called back.</li>
<li><b>Obscurity mistaken for restriction</b> &mdash; an unlinked page that no search engine has indexed is still reachable by anyone holding the address, which is why the chapter treats authentication and firewalls, rather than not being linked to, as what makes content private.</li>
<li><b>Partners handed employee access</b> &mdash; the quickest way to let an outside firm see one schedule is to give it a staff login, and doing so grants that firm everything else an employee can reach along with it.</li>
</ul>
<p>Each of those is a decision about people wearing a technical costume. That is precisely why the person who should be answering it is somebody who understands the business rather than somebody who understands the servers.</p>
<p>Work the four decisions below in order, and read every outcome before moving on &mdash; including the outcomes of the choices you did not make.</p>

<div class="activity" data-activity="bizSim"></div>

<h3>Reading it back to the objective</h3>
<p>The course objective this supplement serves has three clauses, and each one now has an arrangement, a set of demands on the infrastructure, and a question that decides which of the three you are in. That is the whole of it, and it fits in one table.</p>
<div class="tbl-wrap"><table class="tbl">
<thead><tr><th>The use</th><th>The arrangement</th><th>What the infrastructure has to deliver</th><th>The question that settles it</th></tr></thead>
<tbody>
<tr><td><b>Electronic commerce</b></td><td>The public internet</td><td>Fast storage, capacity that survives the peak, copies held near the customer, and availability</td><td>Would we be content for a stranger to read this?</td></tr>
<tr><td><b>Communicating with employees</b></td><td>An intranet, reached from outside through a secured tunnel</td><td>Authentication, one current copy of everything, and reach to wherever the staff actually are</td><td>Is this reader on our payroll or our membership roll?</td></tr>
<tr><td><b>Working with partners</b></td><td>An extranet, or an interface between the two firms&rsquo; systems</td><td>One authoritative record both firms work from, and transactions that arrive as they happen</td><td>Is this a firm we have agreed to do business with, and what exactly may it see?</td></tr>
</tbody>
</table></div>
<p class="takeaway">One set of web technologies, three audiences, separated by who is authorized &mdash; and the separation is drawn by a manager naming the reader, not by a product being purchased.</p>
<p>One last pass over the three uses before the module closes.</p>

<div class="activity" data-activity="bizQuiz2"></div>
`;

ACT.bizQuiz1 = {
  kind: "quiz",
  label: "Check yourself",
  title: "Selling over the internet, and what it demands underneath",
  how: "Four options, one best answer; read every explanation, including the ones for the options you did not choose.",
  objective: "3.6",
  questions: [
    {
      q: "A hypothetical veterinary practice takes no payments on its website and sells nothing there. Its owner says the practice is therefore not an e-business and does not need to think about availability. Which reading matches the chapter?",
      opts: [
        "Almost any business can be considered an e-business, so the real question is what happens to the practice on a morning when its data are not reachable",
        "The owner is right, because being an e-business means selling goods or services over the internet and the practice does neither",
        "The practice becomes an e-business only once it accepts card payment on the site, since a completed transaction is what makes trading electronic",
        "The distinction does not matter, because availability targets apply to organizations large enough to run a data center of their own"
      ],
      a: 0,
      why: [
        "Correct. The chapter says that today almost any business can be considered an e-business, and that because data are the lifeblood of almost all organizations, reliably accessing those data is a key concern rather than an optional refinement.",
        "This reads e-business as a synonym for online retailing, which is narrower than the chapter&rsquo;s claim. The practice&rsquo;s bookings, records and opening information already depend on the same infrastructure a retailer&rsquo;s orders depend on.",
        "Payment is one thing a site can do, not the thing that makes a business dependent on the internet. A booking form that stops working costs the practice appointments long before any card is presented.",
        "Availability is about whether the organization can reach and be reached, and the chapter attaches it to being data-intensive rather than to owning a facility. A small practice renting everything still loses the morning when the pages do not load."
      ]
    },
    {
      q: "A hypothetical ticket seller&rsquo;s pages take several seconds to appear while a customer sits waiting, and the delay is in reading the records the page is built from. Which of the chapter&rsquo;s storage decisions is at stake?",
      opts: [
        "Archival storage, since these records are being kept for the long term and it is the archive the customer is really waiting on while the assistant apologizes for the delay",
        "Backup storage, since the recovery copy is what would be read if the main records were slow to answer",
        "Operational data belongs on fast disk-based storage where response time is of the essence, and on flash-based storage where access speed is of crucial importance",
        "None of these, because the delay a customer experiences is decided by bandwidth rather than by where the records are kept"
      ],
      a: 2,
      why: [
        "Archival data are long-term copies held for compliance and reporting, typically on tape, where data sit sequentially so access is slow and not quickly searchable. That is the wrong medium for anything a person is waiting on.",
        "Backup data are short-term copies for recovering from a disaster, and the chapter&rsquo;s reason for keeping them on hard drives is quick recovery. They are not the copy a page is built from during normal trading.",
        "Correct. The chapter puts operational data on disk-based media precisely because hard drives offer high access speeds where response time matters, and names an e-commerce site as its example, with flash used where speed is crucial.",
        "Bandwidth is the capacity of the pathway, and widening it does not help when the time is being spent reading a record before anything is sent. The two delays have different causes and different remedies."
      ]
    },
    {
      q: "A hypothetical gift retailer&rsquo;s site is slow for two separate reasons: everybody arrives at once in the fortnight before the holidays, and customers on another continent wait noticeably longer than customers at home. Which pairing matches the chapter&rsquo;s account?",
      opts: [
        "Both are capacity problems at heart, so one larger server at the retailer&rsquo;s own site answers the seasonal slowness and the overseas delay together, and no second arrangement is needed",
        "Both are distance problems, since a network carrying more traffic behaves like a longer one",
        "The seasonal slowness is a bandwidth shortage and the overseas delay is a storage shortage",
        "The seasonal slowness is a demand fluctuation answered by capacity that can grow and shrink; the overseas delay is distance, answered by copies of the content held near those users"
      ],
      a: 3,
      why: [
        "A larger server does nothing about distance. The overseas customer is waiting on transmission across a long path, and that wait is unchanged by how quickly the far end could have replied.",
        "Congestion and distance both add delay, but the chapter treats them separately: one is demand exceeding capacity in a fortnight, the other is the geographical gap between a user and the server holding the content.",
        "Neither label fits. The December problem is a fluctuation in demand rather than a fixed shortage, and the overseas delay is caused by the length of the path, not by where the records are stored.",
        "Correct. The chapter treats the pre-holiday spike as a demand fluctuation, and treats distance as its own cause of latency answered by a network of servers in various geographical locations holding copies, the nearest one delivering the content."
      ]
    }
  ]
};

ACT.bizSort = {
  kind: "sort",
  label: "Sort",
  title: "Which audience is this really serving?",
  how: "Place each situation with the use it serves. Every organization below is a hypothetical practice situation, and each one states the conditions you need in order to decide.",
  objective: "3.6",
  buckets: [
    {id: "customers", name: "Selling to customers", hint: "general, public content that anyone with an internet connection may read, with access public and not restricted"},
    {id: "employees", name: "Communicating with employees", hint: "specific, corporate and proprietary content, restricted to authorized employees or members, with access private and restricted"},
    {id: "partners", name: "Working with partners", hint: "communications between two or more firms doing business together, restricted to authorized business partners"}
  ],
  items: [
    {t: "A hypothetical bakery publishes its product range, its opening hours and an order form that anybody who finds the site can use", b: "customers", why: "General, public content readable by anyone with an internet connection, with access public and not restricted &mdash; the chapter&rsquo;s own description of the internet, and the reason nothing goes here that the bakery would not tell a stranger."},
    {t: "A hypothetical dairy cooperative gives each of its two haulage contractors a login to see tomorrow&rsquo;s collection schedule and confirm the volumes lifted today", b: "partners", why: "Two firms using the internet to do business together, reachable only by authorized business partners after logging on. The confirmation is also the single point of data entry that spares both sides from keying the same volume twice."},
    {t: "Staff at a hypothetical building society open a page from their own desks and enrol in this year&rsquo;s health cover without sending a form to anybody", b: "employees", why: "Employee self-service through a portal is one of the five internal uses the chapter names for an intranet, and the content is proprietary and restricted to authorized employees."},
    {t: "A hypothetical bus operator publishes its timetable for any passenger to check, and the pages are copied to servers in several regions so they load quickly wherever the passenger is", b: "customers", why: "Public content plus a content delivery network, which the chapter describes as the way to reduce the delay caused by geographical distance. The copies change how fast the public is served, not who is served."},
    {t: "A hypothetical seed laboratory posts every test result it produces into an area that its two client growers can read the moment the result exists", b: "partners", why: "Content whose focus is communication between business partners, private and restricted to authorized partners, and an example of the real-time visibility the chapter lists among the benefits of working this way."},
    {t: "Shift supervisors at a hypothetical parcel depot read the week&rsquo;s safety notices and finish a required training module from any depot in the country", b: "employees", why: "Two of the chapter&rsquo;s named intranet uses at once, disseminating corporate information and employee training, both restricted to the organization&rsquo;s own staff wherever in the country they are working."},
    {t: "A hypothetical museum lets a visitor reserve a timed entry from home at eleven at night, weeks before arriving", b: "customers", why: "The museum sells nothing on the page beyond a place in a queue, and it is still trading electronically: almost any business can be considered an e-business, and the booking is taken from a member of the public with no account and no prior relationship."},
    {t: "Site surveyors at a hypothetical engineering firm open the internal drawing archive from a hotel, through a secured tunnel, rather than from the office", b: "employees", why: "A virtual private network changes where the employee is standing, not who the audience is. The chapter treats the tunnel as the way an intranet reaches a mobile workforce, and the content remains internal."},
    {t: "A hypothetical grain merchant&rsquo;s system asks a haulier&rsquo;s system directly for a delivery slot and receives an answer, with nobody at either firm involved", b: "partners", why: "This is the machine-to-machine version of the same partner relationship: a service consumer uses a provider&rsquo;s service without knowing how it is produced, by passing agreed values. The browser and the clerk are gone; the audience is not."}
  ]
};

ACT.bizSim = {
  kind: "sim",
  label: "Decide",
  title: "Four requests in one week",
  how: "Work the four decisions in order, and after each one compare every outcome before moving on.",
  objective: "3.6",
  intro: "A hypothetical practice situation. You have taken over systems and communications at an invented regional food cooperative that sells produce boxes to the public, employs about forty people across three sites, and works with two haulage contractors. Four requests land in your first week. Each one looks like a technology question and is really a question about which audience is being served.",
  steps: [
    {
      situation: "The membership secretary wants the annual report, the monthly member notices and the compulsory food-handling training module put on the public website, so that members can always find them and nobody has to manage accounts.",
      opts: [
        {t: "Put them behind authentication as an intranet for authorized members, and leave the public site to the catalogue.", ok: true, out: "Right. Same web technologies, different audience, different access rule: internal communications, specific and proprietary content, authorized users, private and restricted. Notice that you decided this by naming the reader, not by comparing products &mdash; which is what makes it a management decision rather than a technical one."},
        {t: "Publish them on the public site as asked, since nobody outside the cooperative would go looking for member notices.", ok: false, out: "The chapter treats authentication and firewalls, not the unlikelihood of being found, as what makes content private. Member notices and a training module are proprietary content, and once they are public they are readable by any competitor, any journalist and any search engine, permanently and without your knowing."},
        {t: "Publish them on the public site but leave them unlinked from the menu, so only members who were sent the address can reach them.", ok: false, out: "An unlinked page is exactly the third kind of content the chapter puts in the deep web: invisible to a search engine and reachable by anyone holding the address. It is one forwarded email away from being fully public, and nothing in the arrangement will tell you when that happens."},
        {t: "Issue every member an account on the extranet the cooperative already runs with its two haulage contractors.", ok: false, out: "It would work on the day, and it dissolves the boundary you will later be asked to audit. The chapter defines an extranet&rsquo;s users as authorized business partners; putting several hundred members inside it gives them the partner content too, and leaves you unable to say who may see the collection schedules."}
      ]
    },
    {
      situation: "The public produce-box shop runs at a steady level for most of the year. In the fortnight before the December holidays orders run several times higher, and last year the site was slow enough that customers abandoned their baskets. The equipment currently sits in a room at the main site.",
      opts: [
        {t: "Move the public shop onto rented capacity that grows and shrinks with demand, and serve the pages and images from copies held near customers.", ok: true, out: "Right, and note that it is two answers to two different problems. Capacity that can grow and shrink answers the seasonal fluctuation the chapter describes for December electronic commerce; copies held in several geographical locations answer the delay caused by distance. Neither one fixes the other."},
        {t: "Buy a second server sized for the December fortnight and keep it in the room with the first.", ok: false, out: "This is the demand-fluctuation problem the chapter describes, met in the most expensive way available. Capacity bought in whole units leaves idle resources for most of the year, and what you have actually purchased, permanently, is a fortnight. It may be the only option if you must own the equipment, but it should be chosen knowingly."},
        {t: "Ask customers to place their holiday orders earlier in the season so the load is spread out.", ok: false, out: "This asks the customer to solve the cooperative&rsquo;s capacity problem, and most of them will simply buy elsewhere in the fortnight when they were going to buy anyway. For a business selling over the internet the site is the shop, and telling shoppers to come at a quieter time is closing the door at the busiest hour."},
        {t: "Reduce the size of the product photographs so that each page is smaller.", ok: false, out: "It genuinely helps, and it is not enough. Smaller pages reduce the bytes each visitor pulls but not the number of visitors arriving at once, so the peak still exceeds what the room can serve. It is also a poor trade for a business whose product is food that people buy by looking at it."}
      ]
    },
    {
      situation: "The two haulage contractors currently receive collection schedules by email and retype them into their own systems. Twice this year a lorry arrived for a volume that had been revised after the email went out, and both times the cooperative and the contractor each produced a document proving they were right.",
      opts: [
        {t: "Give both contractors access to the schedule where it is maintained, and let them confirm the lifted volume in the same place.", ok: true, out: "Right. This is the chapter&rsquo;s single point of data entry, from which data can be updated on disparate corporate computing platforms without being reentered. One record exists, so there is nothing left for the two firms to disagree about, and management gets real-time data on what was actually lifted rather than a reconciliation after the fact."},
        {t: "Send the schedule twice, once as an email and once as an attached spreadsheet, so each contractor can check one against the other.", ok: false, out: "Two copies do not settle a disagreement; they create a third version and a new question about which one is authoritative. The chapter&rsquo;s benefit is the removal of the reentry, not better documentation of it, and every extra copy is another thing that can be a version behind."},
        {t: "Publish the collection schedule on the public site so the contractors can always see the current version.", ok: false, out: "It does make the schedule current, and it also tells every competitor what this cooperative moves, from where, and on which days. The content&rsquo;s focus is communication between business partners, and the chapter makes that category private and restricted for exactly this reason."},
        {t: "Require both contractors to telephone the depot each morning to confirm the day&rsquo;s volumes before loading.", ok: false, out: "A call is simply a third place for the number to be transcribed, and it adds a person to a process that is failing because of people copying figures. It also produces nothing management can track or analyze, since the confirmation exists only in somebody&rsquo;s memory of the conversation."}
      ]
    },
    {
      situation: "Six delivery drivers and two field buyers are almost never at a desk. They need the week&rsquo;s notices, the compulsory training module, and a way to file expense claims from wherever they happen to be.",
      opts: [
        {t: "Let them reach the same internal pages the office staff use, over a secured tunnel from whatever device they carry.", ok: true, out: "Right. Increases in employee mobility are the chapter&rsquo;s own reason for virtual private networks: staff connect securely to the intranet while travelling or working away from the office. The audience did not change, so the arrangement should not either &mdash; only the road into it is different."},
        {t: "Email the notices out weekly and have the drivers post paper expense forms back to the office.", ok: false, out: "This is precisely the arrangement the intranet replaced. Notices sit in eight separate mailboxes with no way to tell who is reading a superseded one, and every posted form is a keystroke for somebody in an office &mdash; the work that employee self-service was named for removing."},
        {t: "Publish the notices and the training module on the public site and accept expense claims by email, since these people are outside the building anyway.", ok: false, out: "Being outside the building is a location, not an audience. The chapter separates these arrangements by who is authorized, and a driver in a lay-by is still an employee, so putting internal material in front of the general public to reach eight of them is a large exposure for a small convenience."},
        {t: "Give each of them a laptop with a copy of the internal pages stored on it, so no connection is needed at all.", ok: false, out: "A copy taken on Monday is wrong by Tuesday. The chapter&rsquo;s observation that very little information in business is static is the whole reason internal communication moved onto web technologies in the first place, and eight stored copies recreate exactly the problem one current copy was there to solve."}
      ]
    }
  ]
};

ACT.bizQuiz2 = {
  kind: "quiz",
  label: "Check yourself",
  title: "Three uses, one technology",
  how: "Four options, one best answer; the explanations are where the distinctions live, so read all four.",
  objective: "3.6",
  questions: [
    {
      q: "According to the chapter, what actually separates the internet, an intranet and an extranet from one another?",
      opts: [
        "The software and networking technologies each is built from, since the three arrangements use different products",
        "Whether the traffic crosses the public internet, since intranet traffic stays inside the organization and extranet traffic does not",
        "Who is authorized to see the content, since the three carry different content for different audiences under different access rules",
        "Which department owns the pages, since internal pages belong with human resources and partner pages belong with purchasing"
      ],
      a: 2,
      why: [
        "The chapter says the opposite: an intranet uses the same software, hardware and networking technologies as a publicly accessible website. Nothing in the comparison table mentions a product at all.",
        "This is nearly true and still unreliable. The simplest form of an intranet does stay within organizational boundaries, but most companies let employees reach the intranet over a tunnel across the public internet, so the route cannot be the divider.",
        "Correct. The chapter&rsquo;s table separates the three by focus, type of content, users and access: public content for anyone with a connection, corporate and proprietary content for authorized employees, and partner communications for authorized business partners.",
        "Ownership inside the organization is a question of who maintains the pages, not of who may read them. Two arrangements owned by the same department can still face entirely different audiences."
      ]
    },
    {
      q: "A hypothetical cannery gives its two ingredient suppliers a shared area in which to confirm each shipment as it leaves. Its operations manager notices she no longer waits for a monthly summary to know what is in transit. Which of the chapter&rsquo;s stated benefits is she describing?",
      opts: [
        "Central management of documents, which reduces the number of versions in circulation and the amount of out-of-date information stored around the organization",
        "Management can obtain real-time data with which to track and analyze business activities",
        "Automating business transactions, which reduces processing costs and cycle times",
        "The internet can be used as a relatively secure medium over which to do business with another firm"
      ],
      a: 1,
      why: [
        "That benefit is about which copy of a document is the current one. It is real and it is not what changed here: the manager&rsquo;s complaint was about when she learned something, not about which version she was reading.",
        "Correct. The chapter lists exactly this among the benefits of working with partners this way, and it follows from the transactions arriving as they happen rather than being gathered up and reported afterwards.",
        "Automation lowers what each transaction costs and how long it takes to complete. That is a benefit of the same arrangement, but the manager described visibility of activity rather than cheaper or faster processing.",
        "Security is the chapter&rsquo;s judgment that the public internet can carry this traffic acceptably, which is a precondition for the arrangement existing at all rather than the improvement the manager noticed."
      ]
    },
    {
      q: "A hypothetical wholesaler&rsquo;s system asks a courier&rsquo;s system for a delivery slot and receives one back, with nobody at either firm involved. How is this best described, and how does it relate to the shared partner area the two firms already use?",
      opts: [
        "It is a content delivery arrangement, since the courier is supplying content to the wholesaler across a distance",
        "It is a form of intranet, because the two systems are communicating privately rather than publicly",
        "It replaces the shared partner area entirely, since once two machines exchange the figures directly there is nothing left for a person to log in and read, and the web area can be switched off",
        "It is an interface between applications: one program uses another&rsquo;s service by passing agreed values, without knowing how the result is produced"
      ],
      a: 3,
      why: [
        "A content delivery network holds copies of a site closer to its users to reduce the delay caused by distance. Nothing here is about distance, and the courier is answering a question rather than serving a stored page.",
        "An intranet serves an organization&rsquo;s own authorized employees. These are two separate firms, which is what makes the relationship a partner arrangement no matter how private the exchange is.",
        "The two do different jobs. A shared area lets people at both firms read and confirm records; an interface lets their systems exchange a specific answer unattended, and most partnerships end up using both.",
        "Correct. The chapter defines an interface between applications as letting a service consumer use a service provider&rsquo;s service without having to know how the underlying service is created, by passing pre-specified values and receiving the requested service back."
      ]
    }
  ]
};
