/* ===== s36 ===== */
PROSE.s36 = `
<span class="eyebrow">Application supplement &middot; 3&ndash;6</span>
<h2>The internet as a business tool</h2>
<p class="lede">Every part of this section has appeared already. What the chapter never does is set them side by side and ask what a company uses all of it for. The answer is three things, told apart by one decision a person takes.</p>

<h3>Three jobs, one set of parts</h3>
<p>A browser asking for a page behaves identically whether the reader is a shopper, a member of staff or a supplier&rsquo;s dispatcher. The technology has no opinion about who is at the other end. What differs is who is authorized &mdash; a decision somebody takes before any system enforces it.</p>
<ul class="keys">
<li><b>Selling to customers</b> &mdash; general, public content anyone connected may read, which the chapter calls the internet.</li>
<li><b>Communicating with employees</b> &mdash; specific, proprietary content restricted to authorized employees, which the chapter calls an intranet.</li>
<li><b>Working with business partners</b> &mdash; communications between firms doing business together, restricted to authorized partners: an extranet.</li>
</ul>

<h3>Selling to customers: almost any business is an e-business</h3>
<p>The chapter says almost any business today can be considered an <b>e-business</b>. That is stronger than it looks: not that almost any business sells online, but that it runs on its data being reachable.</p>
<p>A hypothetical veterinary practice publishing only its address, hours and a booking form has put its bookings on the internet. When that page fails on Monday morning, appointments are not made and money is not taken.</p>
<ul class="keys">
<li><b>Answering while the customer is there</b> &mdash; operational data belongs on fast disk, or flash where speed is crucial, because a late page loses the sale.</li>
<li><b>Surviving the busiest fortnight</b> &mdash; consumer commerce spikes before December, and the capacity that felt generous in March decides how it goes.</li>
<li><b>Closing the distance</b> &mdash; the further a user is from the server, the longer content takes; copies held in several locations remove it.</li>
<li><b>Being available at all</b> &mdash; firms trading electronically strive for the highest availability, and five-nines leaves five minutes of downtime a year.</li>
</ul>
<p>None of those is a marketing decision, and none can be taken after the campaign is booked. For a business selling online, the shopfront <i>is</i> the infrastructure.</p>

<div class="activity" data-activity="bizQuiz1"></div>

<h3>Communicating with employees</h3>
<p>The second audience is the organization&rsquo;s own staff, served by the intranet: the same web technologies, secured with authentication, firewalls or both. What is worth adding is what each internal use replaced.</p>
<p>Disseminating corporate information replaces a notice kept in whichever copy each person saved. Training replaces scheduling everybody into a room. Project management replaces status reported upward and redistributed down. Collaboration replaces documents mailed between buildings. Self-service replaces a form completed by staff and keyed in by an office.</p>
<p>Only the last saves money you could point at. Nothing was automated: a step was deleted, because the person holding the information could record it directly.</p>
<p>An intranet reachable only from a desk fails a workforce increasingly elsewhere, so employees use a virtual private network to connect securely while travelling. The audience has not changed; only the road.</p>

<h3>Working with partners: the second keystroke</h3>
<p>The third audience is the companies the organization depends on. Not employees, so the intranet is shut; not the public, so the public site is useless. The answer is the extranet: a private part of the internet reachable by authorized partners after logging on.</p>
<p>Follow one hypothetical order through two companies that share nothing.</p>
<ol class="steps">
<li><b>The buyer records the order</b> &mdash; a clerk enters quantities into the buyer&rsquo;s system, creating an authoritative record, then emails a copy.</li>
<li><b>The supplier records it again</b> &mdash; somebody types the same quantities into another system, creating a second record that merely resembles the first.</li>
<li><b>The buyer changes something</b> &mdash; a quantity is revised, a second email goes out, and the supplier is a version behind, with nothing saying which counts.</li>
<li><b>The goods arrive</b> &mdash; the disagreement surfaces in the receiving bay, the most expensive place to find it, costing a credit note and sometimes a second lorry.</li>
</ol>
<p>Nobody was careless. Step two manufactured the error, and exists only because two firms keep separate copies of one fact. The chapter&rsquo;s name for removing it is a single point of data entry, from which data updates across disparate platforms without being reentered.</p>
<p>There is a version with the people removed. An interface lets one firm&rsquo;s system use a service another provides by passing agreed values and receiving an answer. A shared area lets two firms read one record; an interface lets their systems do it unattended.</p>
<p>Every situation below is hypothetical. Sort each by the audience it really serves.</p>

<div class="activity" data-activity="bizSort"></div>

<h3>Getting the audience wrong</h3>
<p>The wrong answer here is almost never a technology. It is publishing to the wrong audience, and there are three familiar ways.</p>
<ul class="keys">
<li><b>Internal material on the public site</b> &mdash; done to avoid managing accounts, and it works until proprietary content is public and cannot be recalled.</li>
<li><b>Obscurity mistaken for restriction</b> &mdash; an unindexed page is still reachable by anyone with the address, which is why authentication makes content private.</li>
<li><b>Partners handed employee access</b> &mdash; the quickest way to show an outside firm one schedule grants it everything an employee can reach.</li>
</ul>
<p>Work the four decisions below in order, reading every outcome, including those you rejected.</p>

<div class="activity" data-activity="bizSim"></div>

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
        {t: "Buy a second server sized for the December fortnight and keep it in the room with the first.", ok: false, out: "This is the demand-fluctuation problem the chapter describes, met in the most expensive way available. Capacity bought in whole units leaves idle resources for most of the year, and what you have actually purchased, permanently, is a fortnight. It may be the only option if you must own the equipment, but it should be chosen knowingly."},
        {t: "Ask customers to place their holiday orders earlier in the season so the load is spread out.", ok: false, out: "This asks the customer to solve the cooperative&rsquo;s capacity problem, and most of them will simply buy elsewhere in the fortnight when they were going to buy anyway. For a business selling over the internet the site is the shop, and telling shoppers to come at a quieter time is closing the door at the busiest hour."},
        {t: "Reduce the size of the product photographs so that each page is smaller.", ok: false, out: "It genuinely helps, and it is not enough. Smaller pages reduce the bytes each visitor pulls but not the number of visitors arriving at once, so the peak still exceeds what the room can serve. It is also a poor trade for a business whose product is food that people buy by looking at it."},
        {t: "Move the public shop onto rented capacity that grows and shrinks with demand.", ok: true, out: "Right, and serve the pages and images from copies held near customers. Note that it is two answers to two different problems. Capacity that can grow and shrink answers the seasonal fluctuation the chapter describes for December electronic commerce; copies held in several geographical locations answer the delay caused by distance. Neither one fixes the other."}
      ]
    },
    {
      situation: "The two haulage contractors currently receive collection schedules by email and retype them into their own systems. Twice this year a lorry arrived for a volume that had been revised after the email went out, and both times the cooperative and the contractor each produced a document proving they were right.",
      opts: [
        {t: "Send the schedule twice, once as an email and once as an attached spreadsheet, so each contractor can check one against the other.", ok: false, out: "Two copies do not settle a disagreement; they create a third version and a new question about which one is authoritative. The chapter&rsquo;s benefit is the removal of the reentry, not better documentation of it, and every extra copy is another thing that can be a version behind."},
        {t: "Publish the collection schedule on the public site so the contractors can always see the current version.", ok: false, out: "It does make the schedule current, and it also tells every competitor what this cooperative moves, from where, and on which days. The content&rsquo;s focus is communication between business partners, and the chapter makes that category private and restricted for exactly this reason."},
        {t: "Give both contractors access to the schedule where it is maintained, and let them confirm the lifted volume in the same place.", ok: true, out: "Right. This is the chapter&rsquo;s single point of data entry, from which data can be updated on disparate corporate computing platforms without being reentered. One record exists, so there is nothing left for the two firms to disagree about, and management gets real-time data on what was actually lifted rather than a reconciliation after the fact."},
        {t: "Require both contractors to telephone the depot each morning to confirm the day&rsquo;s volumes before loading.", ok: false, out: "A call is simply a third place for the number to be transcribed, and it adds a person to a process that is failing because of people copying figures. It also produces nothing management can track or analyze, since the confirmation exists only in somebody&rsquo;s memory of the conversation."}
      ]
    },
    {
      situation: "Six delivery drivers and two field buyers are almost never at a desk. They need the week&rsquo;s notices, the compulsory training module, and a way to file expense claims from wherever they happen to be.",
      opts: [
        {t: "Email the notices out weekly and have the drivers post paper expense forms back to the office.", ok: false, out: "This is precisely the arrangement the intranet replaced. Notices sit in eight separate mailboxes with no way to tell who is reading a superseded one, and every posted form is a keystroke for somebody in an office &mdash; the work that employee self-service was named for removing."},
        {t: "Let them reach the same internal pages the office staff use, over a secured tunnel from whatever device they carry.", ok: true, out: "Right. Increases in employee mobility are the chapter&rsquo;s own reason for virtual private networks: staff connect securely to the intranet while travelling or working away from the office. The audience did not change, so the arrangement should not either &mdash; only the road into it is different."},
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
