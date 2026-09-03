/* ===== s33b ===== */
PROSE.s33b = `
<span class="eyebrow">Section 3&ndash;3b</span>
<h2>Storage, spikes, energy, and the need to move fast</h2>
<p class="lede">The section before this one explained why equipment stops being good enough long before it stops working. This one takes the other pressures on the chapter&rsquo;s diagram, and not one of them is about age. Data accumulates and is never thrown away. Demand arrives in bursts. One upgrade produces two electricity bills. Experiments need equipment before anybody knows whether the experiment is worth running. And artificial intelligence asks for a class of machine most organizations have never bought.</p>

<p>Read the five as one argument rather than five separate complaints. Each of them describes a way in which owning your own infrastructure forces a decision at the moment you have the least information. Buy for the peak and you own idle machines. Buy for the average and you fail on the busiest day. Buy before the experiment and you may be buying for a service nobody wants. Hold on to that sentence, because it is the whole reason the next objective exists.</p>

<div class="activity" data-activity="drvDrivers"></div>

<h3>The data keeps arriving, and nothing is thrown away</h3>
<p>The first pressure is simply volume. Organizations now collect and analyze very large amounts of data for business intelligence, for machine learning and artificial intelligence, and for other purposes such as compliance. The amount that feels like enough keeps rising, because it is judged against what competitors are doing with their data rather than against any fixed requirement.</p>

<p>The chapter gives two ordinary examples of where the volume comes from, and neither one involves anything exotic.</p>
<ul class="keys">
<li><b>Watching the website</b> &mdash; an organization can analyze each visitor&rsquo;s actions on its own site in order to improve how that site performs, which means recording something about every click rather than only about every sale.</li>
<li><b>Reading everything else</b> &mdash; organizations increasingly run machine learning and artificial intelligence algorithms over structured and unstructured material drawn from media reports, social media, customer support calls and other sources.</li>
</ul>

<p>Now look at what capturing all of that actually costs, because it is three things and most people budget for one. It requires ever more storage space. It requires ever more powerful computing hardware, because the data have to be worked through and not merely held. And it requires <b>database management systems</b> for managing and analyzing what has been kept, which is software somebody has to license, configure and run.</p>

<p>The same story runs along the wires. Internet bandwidth grew enormously during the dot-com boom, which allowed organizations to deliver richer and far more bandwidth-hungry content, and the chapter names video services such as YouTube and the films streamed by Netflix as creating the need for more bandwidth again.</p>

<div class="callout info">
<p><b>The chapter&rsquo;s name for this: a vicious circle.</b> Enhanced capabilities enable new applications, and those new applications in turn require a certain level of capability in both the data and the communications infrastructure. Each round of improvement manufactures the demand for the next one.</p>
<p>If that shape looks familiar, it should. It is the same loop as the hardware-and-software treadmill in the previous section, drawn with storage and bandwidth in place of processors and operating systems. Recognizing the shape is worth more than either example, because it tells you that a purchase which ends the problem does not exist.</p>
</div>

<h3>Demand does not arrive evenly</h3>
<p>The second pressure is timing. Demands for computing resources fluctuate, which leaves an organization with either too few resources at some moments or, far more often, too many idle resources most of the time. According to estimates the chapter reports &mdash; and it attributes them only to estimates, with no source of its own &mdash; as many as seven organizational infrastructures in every ten run at only about a fifth of their capacity.</p>

<p>Read that as the upper end of a range rather than as a typical figure. The chapter gives a ceiling and not an average, so the honest sentence is that as many as seven in ten may be running that far below capacity, not that a typical one is.</p>

<p>That sounds like bad purchasing until you notice the constraint underneath it. Capacity is bought in whole units. A server is a whole server, a rack is a whole rack, and a room is a whole room, so the size you buy has to cover the busiest hour of the year rather than the average hour. Everything above the average is the price of being available on the day it matters.</p>

<p>The chapter&rsquo;s example of the busiest hour is seasonal. Companies engaged in or supporting business-to-consumer electronic commerce &mdash; it names Amazon and FedEx &mdash; face large spikes in demand in the pre-holiday season in December, and need increased capacity to handle them.</p>

<div class="callout exam">
<p><b>The one sentence to carry into the cloud section.</b> The chapter puts the asymmetry plainly: while it is relatively easy to hire temporary staff to handle an increase in orders, it is typically not that easy to make quick changes to the information systems infrastructure based on changing needs.</p>
<p>People can be added for a season and released afterwards. A server room cannot. Every argument in the next objective is a way of making infrastructure behave more like the temporary staff and less like the building.</p>
</div>

<p>Growth is the same problem stretched over years instead of weeks, and it is where the diminishing space on the chapter&rsquo;s diagram actually appears: equipment accumulates while the room holding it does not. For an organization whose customer or user base is expanding, the facilities have to grow along with the computing needs, and the chapter uses the ordinary case of a company that outgrew a friend&rsquo;s garage and now operates somewhere upward of two dozen major data centers.</p>

<p>Three separate costs make that growth painful, and only the first is obvious.</p>
<ul class="keys">
<li><b>Money</b> &mdash; renting additional facilities is expensive, and building them is far more expensive still, so the decision competes with everything else the organization might do with the same funds.</li>
<li><b>Time</b> &mdash; significant time is needed for locating the right facilities, negotiating the contracts, and then setting up the hardware and software inside them, none of which can be compressed by wanting it more.</li>
<li><b>Commitment</b> &mdash; long-term contracts limit the flexibility to scale the infrastructure back down in periods of lower demand, so a decision made in a good year is still being paid for in a bad one.</li>
</ul>

<div class="activity" data-activity="drvQuiz1"></div>

<h3>One upgrade, two electricity bills</h3>
<p>The third pressure is energy, and the reason it deserves a heading of its own is that the cost arrives twice. As computers process data they consume electricity. Various components, the processor and the power supply among them, turn part of that electricity into heat, which is why most computers contain several fans. So more powerful hardware needs more energy to do the work, and at the same time needs more energy to be cooled while doing it.</p>

<p>The chapter offers a snapshot of the quantities involved, and the snapshot is worth reading for its ratios rather than its digits.</p>
<ul class="keys">
<li><b>One desktop machine</b> &mdash; the chapter puts it between forty and a hundred and seventy watts while idling, rising to three hundred watts or more when it is working under full load.</li>
<li><b>One rack of servers</b> &mdash; a single rack in a data center can easily consume fifteen to seventeen kilowatts, which the chapter compares to the electricity needed by more than ten homes.</li>
<li><b>A room full of racks</b> &mdash; that comparison is the durable part, and it is why a data center is discussed as an electrical facility with computers in it rather than as a large office.</li>
</ul>

<div class="callout warn">
<p><b>Read the rack figure as a floor, not a ceiling.</b> Those kilowatt figures predate the current generation of machines built for artificial intelligence work, which the chapter itself describes only two subsections later. Racks assembled for that kind of processing draw materially more than the chapter&rsquo;s number. Keep the household comparison, which still teaches the right intuition, and treat the number as the chapter&rsquo;s snapshot rather than as a current specification.</p>
</div>

<p>Why is this a management question rather than a facilities one? Because of multiplication. You may never notice one personal computer on a household electricity bill, but an organization running hundreds or thousands of them is in a different position entirely. The chapter adds an unwelcome observation: power consumption and heat emissions continue to rise as manufacturers pack more processing power into servers, often without providing much improvement in energy efficiency. Power and cooling are, in its words, significant cost factors.</p>

<h3>Moving fast, and why that is an infrastructure problem</h3>
<p>The fourth pressure is the only one that comes from strategy rather than from equipment, and it is the reason this subsection sits in an infrastructure chapter at all. Modern organizations have to innovate constantly to stay abreast of the competition. Rather than building the business around the competencies they happen to have, they are pushed to take an <b>outside-in approach</b>: start from the jobs current and future customers are trying to get done, then work back to a solution.</p>

<p>Being ahead of competitors requires speed, so traditional ways of developing a product or service will not hold up over time. The chapter therefore points at an agile mindset borrowed from the startup world, and names one approach in particular.</p>
<ul class="keys">
<li><b>Lean startup methodology</b> &mdash; an approach built on rapid cycles of devising new solutions and developing minimum viable products, so that whether a solution has the desired effect can be tested quickly rather than argued about.</li>
<li><b>Minimum viable product</b> &mdash; the smallest version of a solution that real users can actually try, built to produce an answer cheaply rather than to be the finished thing.</li>
<li><b>The consequence for infrastructure</b> &mdash; such experiments often need a different kind of infrastructure from the one the organization already runs, and that infrastructure has to be decided on before any answer exists.</li>
</ul>

<p>The chapter states the conclusion directly: it makes little sense to invest time and money into infrastructure changes before even knowing whether the experiment will be a success. It then gives two examples that are deliberately unglamorous.</p>
<ul class="keys">
<li><b>The mobile application</b> &mdash; there is little sense in purchasing a quantity of hardware and installing web servers to support an app without knowing whether the market will accept it, or how much demand there would be to meet.</li>
<li><b>The analytics project</b> &mdash; there is equally little sense in purchasing new workstations to run a piece of large-scale data analysis before anyone knows whether the analysis will produce the results it was expected to produce.</li>
</ul>

<p>This is a strategy argument wearing technical clothes, which is what makes it the cleanest link back to the previous module. If competitive position now depends on how quickly an organization can learn from a real attempt, then anything that slows an attempt down is a competitive problem, and a procurement cycle is exactly such a thing.</p>

<div class="activity" data-activity="drvCapacity"></div>

<h3>Artificial intelligence asks for a different machine</h3>
<p>The fifth pressure is the newest one on the chapter&rsquo;s diagram. <b>AI infrastructure</b> is the hardware and software used to support artificial intelligence work, and the chapter&rsquo;s claim is that it has special requirements &mdash; that it is not ordinary computing bought in larger quantities.</p>

<p>The reason is the shape of the work. Training a model means processing very large amounts of data efficiently, which takes an enormous quantity of arithmetic. Because of the nature of that arithmetic, training generally does not run on the traditional processors a business already owns; it runs on graphics processors or tensor processors, which the chapter says are not normally part of a traditional infrastructure. The requirements in processing, storage and analysis differ vastly from ordinary business workloads.</p>

<p>Four consequences follow for whoever has to write the budget, and each one is a place where an estimate built from last year&rsquo;s prices will be wrong.</p>
<ul class="keys">
<li><b>Unit price</b> &mdash; the chapter prices a single widely used training processor in the region of twenty-five thousand US dollars and its successor a little above that. Set that beside the comparison table this module worked through under the previous objective, where a personal computer reaches five thousand dollars and a workstation ten thousand: one such processor costs several times the dearest personal computer and more than twice a workstation, and a training rig needs many of them.</li>
<li><b>Quantity and time</b> &mdash; researchers estimated that training an early version of a well-known generative model might have taken more than a month running on a thousand such processors at once.</li>
<li><b>Storage</b> &mdash; the storage requirements, in capacity and also in speed, often exceed those of traditional systems, so the usual disks are wrong on two counts rather than one.</li>
<li><b>People</b> &mdash; the data scientists doing the work draw on particular machine learning libraries and frameworks, which is a hiring and training cost sitting behind the hardware cost.</li>
</ul>

<div class="callout warn">
<p><b>Handle the very large figures with care.</b> Prices for these processors move constantly and street prices diverge sharply from list prices, so treat the chapter&rsquo;s numbers as a snapshot that fixes the order of magnitude and nothing finer.</p>
<p>The chapter also reports that the company it calls Facebook, whose corporate parent renamed itself Meta in 2021, would build data centers with computing power equivalent to hundreds of thousands of these processors. That was an announced plan rather than a finished building, and this module says so rather than reporting it as an accomplished fact.</p>
<p>What survives all of that qualification is the shape of the argument, and the shape is what you are being taught: this work needs different silicon, at a unit price far above a business machine, in quantities that only make sense to own if you intend to train continuously.</p>
</div>

<p>The chapter&rsquo;s bottom line for a manager is short. For an organization new to this kind of work, an AI infrastructure means large costs together with real development and integration difficulties, which is precisely the situation in which renting rather than buying deserves a hearing.</p>

<div class="activity" data-activity="drvQuiz2"></div>

<h3>Five pressures, one shape</h3>
<p>Put them side by side and the same structure appears in every one, which is the reason to learn them together rather than as a list to be memorized.</p>
<ol class="steps">
<li><b>Each one is continuous</b> &mdash; data keeps arriving, demand keeps moving, energy keeps being consumed, competitors keep experimenting, and none of that stops when a purchase order is signed.</li>
<li><b>Each one forces a commitment early</b> &mdash; capacity, facilities, contracts and specialized hardware all have to be chosen before the information that would settle the choice is available.</li>
<li><b>Each one punishes both directions</b> &mdash; too much capacity is money sitting idle, too little is a service that fails, and there is no single figure that is safe in both a quiet March and a busy December.</li>
</ol>

<p>Before moving on, test whether you can spot which pressure is at work from the symptom alone. That is the skill the rest of this module keeps asking for, because a manager is almost never told which driver they are looking at.</p>

<div class="activity" data-activity="drvSort"></div>

<h3>Where the chapter goes next</h3>
<p>The chapter closes this objective with its own transition, and it is worth reading as a question rather than a summary. Given all of these issues, organizations have been looking for ways to manage their infrastructure that enhance flexibility and agility while reducing costs. The next objective is the answer the industry settled on.</p>

<p class="takeaway">Every driver in this section is a mismatch between how fast a business need changes and how slowly an owned infrastructure can change with it.</p>

<p class="takeaway">That is why the next objective is not about better machines. It is about somebody else owning them.</p>
`;

ACT.drvDrivers = {
  kind: "explore",
  label: "Explore",
  title: "The five pressures, one card at a time",
  how: "Open each card and read all four panels; the panels are the same four questions asked of every driver, which is what makes them comparable.",
  objective: "3.3",
  labels: ["What the driver is", "Where it shows up", "What it costs you", "The move it argues for"],
  items: [
    {
      icon: "DATA",
      name: "Expanding storage",
      sub: "More data, kept for longer",
      what: "More data are captured for business intelligence, for machine learning and artificial intelligence, and for purposes such as compliance, and the amount that feels sufficient is judged against what competitors do with theirs.",
      real: "An organization analyzes what every visitor does on its own website in order to improve how the site performs, and runs algorithms over structured and unstructured material from media reports, social media and customer support calls.",
      absent: "Three costs rather than one: storage space, more powerful computing hardware to work through the data, and database management systems to manage and analyze what has been kept. Richer content raises the bandwidth bill alongside them.",
      why: "No single purchase closes this, because the chapter&rsquo;s vicious circle keeps turning &mdash; enhanced capability enables new applications, and the new applications require more capability again."
    },
    {
      icon: "PEAK",
      name: "Fluctuating demand",
      sub: "Sized for the busiest hour",
      what: "Demand for computing resources rises and falls, which leaves an organization either short of resources at some moments or, far more often, holding idle resources most of the time.",
      real: "Firms engaged in or supporting business-to-consumer electronic commerce meet a large spike before the December holidays; the chapter names Amazon and FedEx as its examples of who feels it.",
      absent: "The chapter reports an estimate that as many as seven infrastructures in ten run at only about a fifth of their capacity. Growing costs again in money, in the time needed to locate facilities and negotiate contracts, and in long contracts that prevent scaling back down.",
      why: "Its sharpest sentence sits here: it is relatively easy to hire temporary staff for a busy season, and typically not easy to make quick changes to an infrastructure."
    },
    {
      icon: "WATT",
      name: "Expanding consumption",
      sub: "One upgrade, two bills",
      what: "Processing data consumes electricity, and components such as the processor and the power supply convert part of it into heat that then has to be removed by cooling.",
      real: "The chapter&rsquo;s snapshot has an ordinary desktop machine drawing tens of watts while idling and passing three hundred under load, and a single rack of servers using as much electricity as more than ten homes.",
      absent: "More powerful hardware needs more energy to run and, at the same time, more energy to cool, so a single upgrade produces two increases on the same bill rather than one.",
      why: "For an organization with hundreds or thousands of machines this stops being a curiosity, particularly since the chapter notes that power and heat keep rising as more processing is packed in without much gain in efficiency."
    },
    {
      icon: "AGILE",
      name: "The need for agility",
      sub: "Deciding before you know",
      what: "Competing now means innovating constantly and working outside-in from the jobs customers are trying to get done, in rapid cycles rather than in long project plans.",
      real: "The lean startup approach builds a minimum viable product, the smallest version real users can try, to find out quickly whether a solution has the effect it was meant to have.",
      absent: "Experiments often need a different kind of infrastructure from the one already running, and committing to it means spending before any answer exists about acceptance or about how much demand there would be.",
      why: "This is a strategy argument rather than a technical one, which makes it the cleanest link back to the previous module: how quickly an organization can learn is itself a competitive position."
    },
    {
      icon: "AI",
      name: "AI infrastructure",
      sub: "A different class of machine",
      what: "The hardware and software used to support artificial intelligence work, which the chapter presents as having requirements of its own rather than being ordinary computing bought in larger quantities.",
      real: "Training generally does not run on the traditional processors a business already owns; it runs on graphics processors or tensor processors, which the chapter says are not normally part of a traditional infrastructure.",
      absent: "A unit price several times that of the dearest personal computer in the chapter&rsquo;s own comparison table, and more than twice that of a workstation, together with storage that has to be both larger and faster than usual and people who work with particular machine learning libraries and frameworks.",
      why: "The chapter is blunt about the result for a newcomer &mdash; large costs plus development and integration difficulties &mdash; which is exactly the situation where renting rather than owning deserves a hearing."
    }
  ]
};

ACT.drvQuiz1 = {
  kind: "quiz",
  label: "Check yourself",
  title: "Volume and timing",
  how: "Four options, one best answer; read every explanation, including the ones for options you did not choose.",
  objective: "3.3",
  questions: [
    {
      q: "The chapter calls the relationship between capability and data a vicious circle. What does it mean by that?",
      opts: [
        "Data volumes grow at a steady annual rate, so capacity planning is a matter of extending a straight line far enough into the future and buying whatever the line says the fifth year will need",
        "Storage becomes cheaper faster than data volumes rise, so the circle closes itself and no management decision is required",
        "Enhanced capabilities enable new applications, and those applications then demand more capability again, so each round of improvement creates the demand for the next",
        "Organizations collect data they have no use for, so the circle is broken simply by deciding to collect less of it"
      ],
      a: 2,
      why: [
        "A straight line would make this an ordinary budgeting exercise, and the chapter&rsquo;s worry is precisely that it is not one. Growth here is driven by what new capability makes possible, which arrives in steps rather than at a predictable rate.",
        "Falling unit prices are real and they do not close the circle, because the chapter names three costs rather than one: space, more powerful hardware to process the data, and database management systems to manage and analyze it.",
        "Correct. Enhanced capabilities enable new applications, which in turn require a certain level of capability in both the data and the communications infrastructure &mdash; the same shape as the hardware-and-software loop in the previous section.",
        "Some collection is certainly wasteful, but the chapter&rsquo;s examples are not: analyzing every visitor&rsquo;s actions to improve a website, and reading unstructured material from support calls and media, are uses that produce the volume on purpose."
      ]
    },
    {
      q: "A hypothetical county records office runs its own servers. Its technology lead reports that the machines are busy for a few hours a week and close to idle the rest of the time, and asks whether that means the equipment was bought badly. What does the chapter&rsquo;s treatment of demand fluctuation say?",
      opts: [
        "It is the ordinary consequence of owning capacity that has to cover the busiest hour, and the chapter estimates that as many as seven infrastructures in ten do the same",
        "It means the machines were oversized, and a correctly specified purchase would have produced steady high utilization through the whole week",
        "It means the office should move other work onto the machines whether or not that work is needed, so that the investment is seen to be used",
        "Utilization is not a meaningful measure for owned equipment, because the money was spent once and does not change according to how busy the machines are on any given afternoon"
      ],
      a: 0,
      why: [
        "Correct. Capacity is bought in whole units and has to cover the peak, so everything above the average hour is the price of being available on the day it matters; the chapter&rsquo;s own estimate describes exactly this pattern across organizations generally.",
        "This assumes a size exists that is right for both the quiet hours and the busy ones, and that is the assumption the chapter denies. Sizing for steady high utilization means being short of capacity every time demand rises above it.",
        "Manufacturing work to justify a purchase raises utilization on a report and adds cost in reality. The chapter is describing a structural mismatch between fixed capacity and variable demand, not a presentation problem.",
        "The money was spent once, and it was spent on something that is now depreciating, drawing power and being cooled whether or not it is busy. That is why idle capacity is treated as a cost rather than as a neutral fact."
      ]
    },
    {
      q: "A hypothetical parcel depot handles its December surge by hiring temporary staff, but its systems slow to a crawl in the very same weeks. Which reading matches the chapter&rsquo;s account of why the two problems are not equally easy to solve?",
      opts: [
        "Software slows under load in a way that hardware does not, so the depot needs a different application rather than more capacity",
        "Temporary staff cost less than equipment, so the depot should hire more people and ask them to work around the slow systems",
        "The depot should have signed a longer equipment contract, because a long-term commitment is what persuades a supplier to make additional capacity available quickly when the December weeks arrive",
        "It is relatively easy to hire temporary staff to handle an increase in orders, and typically not that easy to make quick changes to the infrastructure based on changing needs"
      ],
      a: 3,
      why: [
        "Applications certainly differ in how well they cope with load, and that is a separate question from the one the chapter is asking here. Its point is about how quickly each kind of resource can be added, not about software quality.",
        "Cost is not what separates the two cases in the chapter&rsquo;s argument; speed of adjustment is. People can also work around a slow system only up to the moment the system stops responding at all.",
        "Long-term contracts do the opposite in the chapter&rsquo;s account: they limit the flexibility to scale the infrastructure back down in periods of lower demand, which is listed as one of the costs of growth rather than a remedy.",
        "Correct. That asymmetry is the chapter&rsquo;s own sentence and the best single justification for the cloud material that follows, because every idea in the next objective is a way of making infrastructure adjust at the speed staffing already does."
      ]
    }
  ]
};

ACT.drvCapacity = {
  kind: "sim",
  label: "Decide",
  title: "One year of capacity decisions",
  how: "Work the four decisions in order, and after each one read every outcome rather than only the one you chose.",
  objective: "3.3",
  intro: "A hypothetical practice situation. You are the operations manager of an invented regional food bank network that runs its scheduling, inventory and volunteer systems on machines in a room at its own warehouse. Nothing here describes a real organization, and each situation states the conditions you need in order to reason about it.",
  steps: [
    {
      situation: "Deliveries and volunteer sign-ups run at a steady level for ten months of the year. In the fortnight around the winter holidays, traffic to the sign-up system runs roughly eight times higher, and last year the system was unusable for two of those days. Servers are bought whole, and the smallest useful step up is a machine that would carry the December load on its own. You are keeping the equipment in your own building. What do you buy?",
      opts: [
        {t: "Buy the machine sized for the December peak, and accept that it will be lightly used for most of the year.", ok: true, out: "Right, and notice how uncomfortable the right answer is. Capacity is bought in whole units, so owning means choosing between idle resources most of the time and too few resources at the peak. What you are really buying is the two worst days, which is exactly the pattern behind the chapter&rsquo;s estimate that as many as seven infrastructures in ten run at only about a fifth of their capacity."},
        {t: "Buy for the average level of demand and ask volunteers to try again later during the December fortnight.", ok: false, out: "This trades a known cost for an unknown one. The days you would be failing on are the days the organization exists for, and the failure is invisible in the budget while the idle machine is visible in it. Sizing for the average means being short every time demand rises above the average, which is most of December."},
        {t: "Commission a more careful forecast so that a single capacity figure can be found that fits the whole year.", ok: false, out: "No such figure exists, and looking for it misreads the driver. This is fluctuating demand rather than a forecasting error: the shape of the year has a spike in it, and a forecast that describes the spike accurately still leaves you choosing between covering it and not covering it."}
      ]
    },
    {
      situation: "Your analytics volunteer wants to keep a record of every interaction with the sign-up system, not just completed sign-ups, so that the network can work out where people give up. Separately, some of the network&rsquo;s records must be retained for several years to satisfy requirements that apply to organizations of this kind in its jurisdiction. What do you put in the plan?",
      opts: [
        {t: "Add disk capacity, since storage is the cheapest part of any system and the rest of the plan is unaffected.", ok: false, out: "Storage space is only the first of the three costs the chapter names. Keeping the data is not the same as being able to ask it anything, and a pile of records nobody can query will produce neither the analysis nor the compliance answer you kept it for."},
        {t: "Plan for storage space, for enough computing power to work through the data, and for a database management system to manage and analyze what is kept.", ok: true, out: "Right. That is the chapter&rsquo;s own list, and the second and third items are the ones people leave out. Processing capacity is what turns a stored record into an answer, and the database software that makes the records searchable is a licence, a configuration and a running cost of its own."},
        {t: "Record only completed sign-ups, and delete anything older than the current month to keep the volume flat.", ok: false, out: "That deletes the abandoned sign-ups, which are the entire subject of the analysis, and it also collides with the retention requirement stated in the situation. Volume can be managed, but not by discarding the two categories of record you were specifically told to keep."}
      ]
    },
    {
      situation: "The plan doubles the processing power in the warehouse room. Your finance lead has already added the extra electricity that the new machines are rated to draw. The facilities manager reads the plan and says the energy line is still short. Who is right, and why?",
      opts: [
        {t: "Finance is right; the rated draw of the machines is the whole of the additional energy cost.", ok: false, out: "This is the mistake the chapter is written to prevent. The rated draw covers doing the work and not removing the heat that doing the work produces, and in a room rather than on a desk that heat has to be taken out by equipment which draws power of its own."},
        {t: "The facilities manager is right, because more powerful hardware needs more energy to run and, at the same time, more energy to cool.", ok: true, out: "Right. One upgrade produces two increases on the same bill. The chapter spells out the mechanism: components such as the processor and the power supply generate heat, cooling has to remove it, and the cooling is itself a consumer of electricity. It also warns that packing more processing into servers often arrives without much improvement in efficiency."},
        {t: "The facilities manager is right, but only because electricity prices rise every year, so any energy figure written in advance will be too low.", ok: false, out: "Price inflation is a real budgeting risk and it is not the chapter&rsquo;s argument here. The second cost would appear even if the tariff never moved, because it comes from the physics of the room rather than from the market for electricity."}
      ]
    },
    {
      situation: "A board member proposes a volunteer-matching app that would pair skills to shifts automatically. Nobody knows whether volunteers would use it. A consultant recommends buying servers now, sized for the demand the app would generate if it succeeded, so that success is not wasted. What is the chapter&rsquo;s position?",
      opts: [
        {t: "Buy the servers now, because an app that succeeds and then fails under load has lost its chance and equipment is cheap next to that risk.", ok: false, out: "This is the reasoning the agility material rejects. The chapter says plainly that it makes little sense to invest time and money in infrastructure changes before even knowing whether the experiment will be a success, and its own example is buying hardware and web servers for an app whose acceptance and demand are both unknown."},
        {t: "Build the smallest version real volunteers can actually try, run it on capacity you have not committed to, and decide about equipment once there is an answer.", ok: true, out: "Right. That is a minimum viable product inside the lean startup approach: rapid cycles that produce an answer cheaply. The infrastructure argument follows from it &mdash; the experiment may need a different kind of infrastructure entirely, and committing to that before the answer exists spends money on a question rather than on a result."},
        {t: "Drop the idea, since an organization that cannot fund the success case should not begin the experiment.", ok: false, out: "That treats the whole cost of success as the entry price of asking the question, which is the same error as the first option seen from the other side. The point of a small testable version is that the question can be answered for far less than the answer is worth."}
      ]
    }
  ]
};

ACT.drvQuiz2 = {
  kind: "quiz",
  label: "Check yourself",
  title: "Energy, agility, and a different machine",
  how: "Three questions on the last three pressures; every option carries its own explanation, so read the ones you rejected too.",
  objective: "3.3",
  questions: [
    {
      q: "Why does the chapter say that more powerful hardware raises the energy bill twice rather than once?",
      opts: [
        "Because electricity is charged at a higher rate for commercial than for domestic use, so the same consumption costs an organization more than it would cost a household",
        "Because the components draw more electricity while they work and, as they work, convert part of it into heat that has to be removed by cooling equipment drawing electricity of its own",
        "Because a more powerful machine runs continuously at its maximum rating rather than idling between tasks the way an older machine did",
        "Because heat shortens the life of components, so the second cost is replacing hardware early rather than paying for more energy"
      ],
      a: 1,
      why: [
        "Tariffs do differ between kinds of customer, and that is not the doubling the chapter describes. Its second cost appears on the same tariff as the first, because it comes from what happens inside the room rather than from how the electricity is priced.",
        "Correct. Components such as the processor and the power supply generate heat, most computers run fans to control temperature, and in a data center the cooling is a substantial consumer in its own right &mdash; so one upgrade produces two increases.",
        "Utilization does affect consumption, which is why the chapter quotes an idle figure and a loaded figure for a desktop machine. But a machine that idles still has to be cooled when it is busy, so this does not explain a second, separate cost.",
        "Early replacement is a genuine consequence of running hardware hot, and it is a hardware cost rather than an energy one. The chapter&rsquo;s doubling is about energy in both halves: energy to compute and energy to cool."
      ]
    },
    {
      q: "A hypothetical arts council is deciding whether to build an online booking service. Its adviser recommends starting with the smallest version real users can try, on capacity the council has not committed to buying. Which of the chapter&rsquo;s ideas is that, and what is the infrastructure argument behind it?",
      opts: [
        "Planned obsolescence, since the first version is deliberately designed to be discarded, which is how a product life span is managed",
        "A pilot study, which the chapter recommends only for projects too large to fund in a single step, since ordinary projects should be fully specified before any equipment is chosen",
        "An argument about cost alone, since the smallest version is the cheapest one available and the chapter treats cost as the only criterion for how to begin",
        "The lean startup approach and a minimum viable product: rapid cycles produce an answer cheaply, before any infrastructure has been committed to a service nobody may want"
      ],
      a: 3,
      why: [
        "Planned obsolescence is the previous section&rsquo;s term for a product designed by its manufacturer to last only a certain life span. A minimum viable product is built by you, to answer a question, and it is kept if the answer is good.",
        "The chapter does not treat this as a special case for large projects. Its argument is that speed of learning is now a competitive requirement, which makes a full specification before any real test the slower and riskier path.",
        "Cost is part of it and not the whole of it. The reason for starting small is that the experiment produces information about acceptance and demand, and that information is what the later spending decision actually needs.",
        "Correct. The lean startup approach runs rapid cycles of devising solutions and building minimum viable products to test whether they have the desired effect, and the infrastructure consequence is the chapter&rsquo;s own: do not buy for a demand nobody has measured."
      ]
    },
    {
      q: "A hypothetical veterinary network wants to train a model on its own case records. Which description matches the chapter&rsquo;s account of what an AI infrastructure requires?",
      opts: [
        "Processors of a kind not normally part of a traditional infrastructure, storage that differs in both capacity and speed, and people who work with particular libraries and frameworks",
        "The same processors as ordinary business computing, simply a great many more of them, because the difference between training a model and running a payroll lies in the quantity of the work rather than in its kind",
        "Mainly additional network bandwidth, because training work is limited chiefly by how quickly data can be moved between an organization&rsquo;s sites",
        "No special equipment at all once the work is rented, because renting removes the technical differences along with the ownership"
      ],
      a: 0,
      why: [
        "Correct. The chapter names all three: graphics or tensor processors rather than traditional ones, storage requirements that exceed traditional systems in capacity and speed, and data scientists drawing on specific machine learning libraries and frameworks.",
        "This is the assumption the chapter sets out to correct. It says training typically does not take place on traditional processors at all, and that the requirements for processing, storage and analysis differ vastly from ordinary workloads.",
        "Moving data matters, and it is not what the chapter identifies as the distinguishing requirement. The distinguishing requirement is the arithmetic itself, which is why a different class of processor appears rather than a faster link.",
        "Renting changes who owns and who maintains the equipment; it does not change what the work needs. A rented AI environment is still built on the specialized processors and faster storage, which is a large part of why it is priced the way it is."
      ]
    }
  ]
};

ACT.drvSort = {
  kind: "sort",
  label: "Sort",
  title: "Which pressure is at work here?",
  how: "Every situation below is an invented practice case rather than a real organization; drop each one into the driver the chapter&rsquo;s definitions call for, then read why it belongs there.",
  objective: "3.3",
  buckets: [
    {id: "storage", name: "Expanding storage", hint: "the volume of data being captured and kept is what is growing, and it drags hardware and database software along behind it"},
    {id: "demand", name: "Fluctuating demand", hint: "the need is uneven over time, so owned capacity ends up either idle or short"},
    {id: "energy", name: "Expanding consumption", hint: "the cost being described is electricity, whether for running the machines or for cooling them"},
    {id: "agility", name: "The need for agility", hint: "a commitment has to be made before anybody knows whether the idea works or how much demand it would attract"},
    {id: "ai", name: "AI infrastructure", hint: "the requirement is a different class of processor, storage or skill from ordinary business computing"}
  ],
  items: [
    {
      t: "A hypothetical museum starts recording every interaction with its online catalogue in order to improve the catalogue, and finds it now needs a more capable database system to ask questions of what it has kept.",
      b: "storage",
      why: "This is the chapter&rsquo;s own website example, and it shows the driver&rsquo;s full cost. Capturing more produces three needs rather than one: space to keep it, processing power to work through it, and a database management system to manage and analyze it."
    },
    {
      t: "A hypothetical broadcaster replaces its audio archive with high-resolution video and discovers that the links between its editing rooms are now the slowest part of the working day.",
      b: "storage",
      why: "The chapter treats richer content and the bandwidth it demands as the same driver seen along the wires: capability enabled bandwidth-hungry content, and the content then demanded more bandwidth again."
    },
    {
      t: "A hypothetical examinations board sees traffic to its results system rise sharply on two mornings a year and sit close to zero for the rest of it.",
      b: "demand",
      why: "Owned capacity has to cover the busiest morning, which leaves it idle the rest of the year. This is the seasonal spike the chapter describes for December shopping, moved to a different calendar but structurally identical."
    },
    {
      t: "A hypothetical charity signs a three-year agreement for machines and space to support a fundraising campaign, and cannot reduce the commitment when the campaign finishes.",
      b: "demand",
      why: "The chapter lists this among the costs of growth: long-term contracts limit the flexibility to scale the infrastructure back down in times of lower demand, so a decision made at the peak is still being paid for afterwards."
    },
    {
      t: "A hypothetical laboratory doubles the number of processors in its server room and finds that its air conditioning can no longer hold the room within its temperature range.",
      b: "energy",
      why: "One upgrade, two increases. The processors draw more electricity to do the work and turn part of it into heat, and the cooling that removes the heat is a separate consumer that also has to grow."
    },
    {
      t: "A hypothetical accountancy firm running several hundred desktop machines notices that the line growing fastest in its accounts this year is the electricity bill rather than the hardware budget.",
      b: "energy",
      why: "The chapter makes exactly this point about scale: one personal computer is invisible on a household bill, but for an organization with hundreds or thousands of them, rising energy cost becomes a major issue in its own right."
    },
    {
      t: "A hypothetical transit authority wants to try a trip-planning tool with a few hundred riders before deciding whether to build it properly.",
      b: "agility",
      why: "This is a minimum viable product inside the lean startup approach: build the smallest version real users can try, in order to learn quickly whether it has the desired effect before committing to an infrastructure for it."
    },
    {
      t: "A hypothetical publisher is asked to approve the purchase of analytics workstations for a study whose usefulness nobody has yet been able to demonstrate.",
      b: "agility",
      why: "The chapter&rsquo;s second worked example is this one almost exactly: there is little sense in buying new workstations to run analytics before anyone knows whether the analytics will produce the expected results."
    },
    {
      t: "A hypothetical insurer discovers that training a model on its own claim records will not run usefully on the ordinary servers it already owns.",
      b: "ai",
      why: "Training generally does not take place on traditional processors. It runs on graphics or tensor processors that the chapter says are not normally part of a traditional infrastructure, which is why the existing fleet cannot simply be reused."
    },
    {
      t: "A hypothetical geology institute is told that the storage its modelling work needs must be not only larger than what it runs today but also considerably faster.",
      b: "ai",
      why: "The chapter is specific that storage requirements for this work exceed traditional systems in capacity and in speed, so ordinary disks are the wrong answer on two counts rather than one."
    }
  ]
};
