/* ===== s34c ===== */
PROSE.s34c = `
<span class="eyebrow">Section 3&ndash;4c</span>
<h2>Deciding well: what to ask before you move</h2>
<p class="lede">Renting an infrastructure can be arranged in an afternoon, with a card, a web page and nobody&rsquo;s signature. That speed is the appeal, and it is also the difficulty: a decision that once took months of meetings now takes minutes, so the thinking has to happen somewhere else. This section is that thinking &mdash; the chapter&rsquo;s own cautionary case, the questions worth putting to a provider before depending on one, and the honest argument about what any of it costs.</p>

<h3>The bill nobody was watching</h3>
<p>The chapter introduces cloud computing with a warning rather than a sales pitch, and the warning is worth taking seriously precisely because nobody in it does anything obviously foolish.</p>
<p>A small software company &mdash; the chapter deliberately does not name it, and neither will this page &mdash; ran a translation application. It did not own the translation engine. Its application sent text out to another company&rsquo;s service and received the translated text back, reaching that service with an <b>interface key</b>: a short secret string that identifies the paying customer on every single request.</p>
<p>The company&rsquo;s usual spend was around US$1,500 a month. Then one bill, covering roughly six weeks, came to about US$450,000. According to the founders, somebody appeared to have stolen the key and used it to request nineteen billion characters of translation. Every one of those characters was charged to the company that owned the key, because charging the key holder is exactly what the key is for. The budget the company had built its year around was gone, and it was left asking the provider for leniency.</p>
<p>The chapter sets a second, quieter case beside it. A startup doubled its user base and expanded its rented infrastructure to keep up, but never put cost management practices in place while it was growing. Resources were over-provisioned, there was no real-time monitoring, and the rising cost went unnoticed until the monthly bill arrived. Nothing was stolen in that one. It was simply nobody&rsquo;s job to look.</p>
<p>Read both cases against the five characteristics from the earlier sections and the mechanism is plain. Three of them are doing the damage, and all three are features that were sold as benefits.</p>
<ul class="keys">
<li><b>On-demand self-service</b> &mdash; resources can be obtained without negotiating with anybody, which also means they can be obtained without anybody inside the organization approving the spending.</li>
<li><b>Rapid elasticity</b> &mdash; capacity scales up almost instantly and often automatically, so a runaway stream of requests meets no ceiling of the kind a room full of owned machines would have imposed.</li>
<li><b>Measured service</b> &mdash; the meter runs for whoever presents the credential, and it never asks whether the work being requested is work the business actually wanted done.</li>
</ul>
<p>That is why the chapter&rsquo;s conclusion is about vigilance rather than avoidance. Cloud computing offers scalability and flexibility, and without proper oversight a company can quickly find itself facing financial trouble that threatens its operations and its growth. The five defences it recommends are ordinary management practices rather than technical measures, which is the part worth noticing.</p>
<ol class="steps">
<li><b>Put cost monitoring tools in place</b>, so that what is being spent is visible while it is being spent rather than only when the billing period closes.</li>
<li><b>Review resource allocations regularly</b>, because the second case was not an attack at all: it was capacity that made sense once and was never revisited.</li>
<li><b>Set budget alerts</b> that fire on anomalies, so an unusual pattern raises a flag on the day it starts instead of the day the invoice arrives.</li>
<li><b>Educate teams on cost awareness</b> and build a culture of accountability, since the person who provisions a resource in seconds is rarely the person who later reads the bill.</li>
<li><b>Read the fine print</b> to know what you are getting into and what you may be liable for, which is the only one of the five that has to happen before anything is switched on.</li>
</ol>
<p>One thread ties this back several sections. The thing stolen in the first case was an interface key of exactly the kind shown earlier sitting inside a request, in plain readable text, where anything able to see the request can see it too. The security failure and the spending failure were one event, not two.</p>
<p>The exercise below walks a hypothetical firm through four moments where one of those five defences was the thing that was missing. The firm is invented; only the shape of the failure is the chapter&rsquo;s.</p>

<div class="activity" data-activity="decRunaway"></div>

<h3>Ten questions to put to a provider</h3>
<p>Before any criterion matters there is a prior decision, and the chapter states it first: <b>which applications, services or data should move at all</b>. That is not one answer but many, because there is typically no single provider that can meet all of an organization&rsquo;s needs. Organizations end up partnering with several, choosing an infrastructure, a platform or a finished application for each need and combining public and private arrangements, for the plain reason that no one solution fits everything.</p>
<p>Once something is a candidate to move, the chapter lists the long-term, strategic issues management should weigh when comparing public providers. There are ten of them. They are easier to use as questions than as a row of nouns, because a criterion you cannot phrase as a question is one you will not actually ask.</p>
<div class="tbl-wrap"><table class="tbl">
<thead><tr><th>Criterion</th><th>The question it makes you ask</th><th>What a weak answer sounds like</th></tr></thead>
<tbody>
<tr><td><b>Availability</b></td><td>What uptime is promised, and how would we keep trading during the hours it is missed?</td><td>&ldquo;They are one of the biggest providers in the world, so they do not go down.&rdquo;</td></tr>
<tr><td><b>Reliability</b></td><td>What backups are taken of the servers and the storage, and will we have enough bandwidth to reach large amounts of our own data?</td><td>&ldquo;It is all in the cloud, so presumably it is backed up.&rdquo;</td></tr>
<tr><td><b>Scalability</b></td><td>Can this provider carry our storage and transaction volumes as they are now and as we expect them to be?</td><td>&ldquo;It is the cloud. Scaling is what it does.&rdquo;</td></tr>
<tr><td><b>Viability</b></td><td>If this provider stopped trading, what would it cost us in money and time to stand everything up somewhere else?</td><td>&ldquo;They have plenty of investors, so that will not happen.&rdquo;</td></tr>
<tr><td><b>Security</b></td><td>How is our data protected from outside intruders, and how would we audit who has reached it?</td><td>&ldquo;Their website says security is their highest priority.&rdquo;</td></tr>
<tr><td><b>Privacy</b></td><td>How is the privacy of the people whose records these are protected once the records sit on shared hardware?</td><td>&ldquo;It is our account, so nobody else can see any of it.&rdquo;</td></tr>
<tr><td><b>Compliance</b></td><td>Does storing this particular data here satisfy the duties that apply to our industry and to the places we operate in?</td><td>&ldquo;The provider has a compliance page, so we are covered.&rdquo;</td></tr>
<tr><td><b>Diversity of offerings</b></td><td>Can one provider cover what we need now and what we will need next, or are we about to manage several relationships?</td><td>&ldquo;We will pick the best tool for each job and sort the rest out later.&rdquo;</td></tr>
<tr><td><b>Openness</b></td><td>If we wanted to leave in three years, how would the data get out, how long would that take and what would the transfer be charged at?</td><td>&ldquo;We would just copy it across.&rdquo;</td></tr>
<tr><td><b>Cost</b></td><td>What does the metered bill actually cover, and what does the same work truly cost us when we do it ourselves?</td><td>&ldquo;The monthly figure is less than we paid for the server.&rdquo;</td></tr>
</tbody>
</table></div>
<p>Those ten are not a checklist invented for this page. They are the chapter&rsquo;s direct answer to the third question its opening case asked the reader: what factors should organizations consider when building on infrastructure provided in the cloud. The rest of this section is the discussion behind four of them &mdash; availability, security, openness and cost &mdash; because those are where the chapter has most to say and where managers most often go wrong.</p>

<div class="activity" data-activity="decCriteria"></div>

<h3>What an agreement actually promises</h3>
<p>Availability is where most organizations start, and the chapter is blunt about it. As examples from the largest public providers have shown, not even they are immune from problems: a hardware failure, a programming error, or a network outage somewhere in between. The useful question is therefore not whether an outage will happen but what the customer has arranged for the day it does.</p>
<p>The instrument that is supposed to answer that is the <b>service-level agreement</b>: a contract specifying the level of service to be provided in terms of performance, measured for instance as uptime, along with warranties, disaster recovery and so on. It reads like a guarantee. It is not one, and the chapter says so plainly.</p>
<ul class="keys">
<li><b>It does not guarantee that resources will be available</b> &mdash; it promises certain service levels and provides refunds or discounts when those promises are missed, which makes it mostly a way of settling disputes once something has already gone wrong.</li>
<li><b>A refund is not compensation</b> &mdash; refunds and discounts normally cover only the fees paid for the service, and can never offset the opportunity cost of the business lost while the service was unavailable.</li>
<li><b>Self-service cuts both ways</b> &mdash; doing everything yourself is an advantage until something breaks, because help is not always guaranteed to be there, so support arrangements matter most for the applications the organization cannot trade without.</li>
<li><b>The customer still has to plan</b> &mdash; being caught by a negative event is usually too costly in lost business or goodwill, so organizations are expected to take their own precautions, including replicating their cloud-based infrastructure in more than one location.</li>
</ul>
<p>The chapter then insists on a counterpoint, and leaving it out would make the criticism dishonest. An organization also has to ask how well it could hold that uptime itself, and at what cost. Often the honest answer is that even when a provider misses its promised levels, it still delivers better uptime than a poorly managed operation in the organization&rsquo;s own building would have. Neither arrangement is safe by default. One of them simply puts the failure somewhere you cannot walk to.</p>
<p>The usual resolution in practice is a hybrid one: keep certain applications in-house and move others to the public cloud. That is the same answer the previous section arrived at from the other direction, and it is worth noticing that the chapter reaches it twice by two different routes.</p>

<h3>Sharing a building you cannot see</h3>
<p>Security, privacy and compliance are three separate criteria that get discussed together because they all follow from one structural fact. A public cloud is, by definition, shared: different companies running different applications on the same hardware.</p>
<p>Two consequences follow, and neither is a criticism of any particular provider.</p>
<ul class="keys">
<li><b>You cannot say exactly where the data physically are</b> &mdash; resources are pooled and assigned dynamically, so a customer rents capacity without knowing which machine in which building holds its records at any given moment.</li>
<li><b>Auditing who has touched the data is extremely difficult</b> &mdash; the chapter goes as far as saying it may be impossible, which matters because knowing who reached a record is often the entire substance of an obligation.</li>
</ul>
<p>Control is the other half of it. With an infrastructure of its own a company has complete control over its own data. That control is reduced in a rented one, organizations have fewer legal rights over data stored in the cloud, and providers may be asked to hand data held on their servers to law enforcement, leaving the customer with little say in the matter.</p>
<p>The weight of this falls hardest on organizations holding sensitive records &mdash; the chapter names medical and legal work &mdash; which is why some of them keep precisely those records in their own building while renting everything else.</p>
<p>Compliance needs care in the other direction. The chapter names rules on financial reporting, rules on the handling of health information, and an industry standard for card payments as examples of duties an organization may have to satisfy. What matters for a decision is the shape of such a duty rather than its name.</p>
<ul class="keys">
<li><b>Duties of this kind are not universal</b> &mdash; requirements apply in particular industries and particular jurisdictions, so the first question is which of them reach this organization and this data at all.</li>
<li><b>They can decide geography</b> &mdash; a duty may dictate where records are permitted to sit physically, which is one reason some providers let a customer specify the geographic region its resources are drawn from.</li>
<li><b>A provider cannot answer them on your behalf</b> &mdash; whether an arrangement satisfies a duty is a question for the organization&rsquo;s own advisers rather than for a marketing page, and the accountability stays with the organization either way.</li>
</ul>

<h3>Getting out again</h3>
<p>Openness, sometimes called interoperability, is the criterion noticed last and felt hardest. Most providers use different infrastructures and different ways of storing data, which makes moving data between them extremely difficult and can leave a company locked in to whichever provider it happened to start with. The chapter makes a dry observation worth repeating: providers do offer tools to make moving data easier &mdash; into their own infrastructure.</p>
<p>A second force is physical rather than commercial. Moving terabytes from one provider to another takes real time on whatever bandwidth exists, and providers often charge for transferring data into or out of their infrastructure. A migration that was budgeted as a weekend of copying can turn out to be months of transfer with an invoice of its own attached.</p>
<p class="takeaway">Ask the exit question at the beginning, while you still have the leverage to negotiate the answer. Once the data are large and the applications are built around one provider&rsquo;s way of doing things, the cost of leaving stops being a choice and becomes a fact.</p>

<div class="activity" data-activity="decQuiz"></div>

<p>The chapter&rsquo;s own case teaches the vocabulary. Five new organizations, none of them real and none of them the one above, ask you to use it cold: pick the service model, name the pressure, or judge the migration before you read why.</p>

<div class="activity" data-activity="decApply"></div>

<h3>What it actually costs</h3>
<p>The upside is real and easy to state. Under a metered model an organization pays for the resources it uses and can scale up or down as it needs to, which gives it control over what is being consumed and unusual transparency about what each part of the infrastructure costs. Owned equipment tells you nothing comparable. A server in a cupboard costs the same on a busy day as on an idle one, and no invoice ever breaks that down for you.</p>
<p>What the chapter refuses to do is claim the metered bill is smaller. Its own words are that there is considerable disagreement over whether moving to the public cloud is ultimately cheaper than maintaining an infrastructure of your own. It also explains why the argument never settles, and that explanation is the most useful thing in this section.</p>
<p>The comparison is unfair in one specific direction. The rented figure is exact, because the monthly cost of a rented server is a number printed on a bill. The in-house figure usually is not, because many organizations do not know what it truly costs to run a comparable server of their own once everything is counted.</p>
<ul class="keys">
<li><b>The machine itself</b> &mdash; the one element nearly every quick comparison includes, usually as a purchase price divided by however many years somebody expects the machine to last.</li>
<li><b>Software licences</b> &mdash; for the operating system, the database engine and anything else the machine has to run, which under an infrastructure service remain the customer&rsquo;s responsibility.</li>
<li><b>Electricity</b> &mdash; counted twice over, because the machine draws power to do the work and the cooling draws power again to remove the heat that work produced.</li>
<li><b>The facility</b> &mdash; the share of floor space, power distribution, cooling plant and physical security that this one machine occupies inside a building somebody has to pay for.</li>
<li><b>The staff</b> &mdash; the fraction of the people who install, patch, monitor, back up and eventually replace it, often the largest of the five figures and the one least likely to have been written down anywhere.</li>
</ul>
<p>Work the comparison honestly and it may still come out either way. The chapter names one company, the online game developer Zynga, that moved out of a public cloud and back into an infrastructure it owned. Read that as one company reaching one conclusion about its own workload at one moment, not as evidence about the general case &mdash; which is exactly what the chapter&rsquo;s own sentence about considerable disagreement concedes.</p>
<p>Two consequences are worth carrying away. Using rented capacity only for periods of peak demand is a genuinely sensible arrangement, and the chapter notes that it adds another layer of complexity to the operation, so somebody has to run it and that somebody costs money too. And moving to a rented infrastructure shifts the cost structure towards operational expenditure, which changes the organization&rsquo;s financial model rather than merely changing where its invoices come from.</p>
<p>The exercise below builds the in-house figure one element at a time, which is what an analyst has to do before any comparison means anything at all. It is a hypothetical sheet: every figure in it is invented for practice.</p>

<div class="activity" data-activity="decCost"></div>

<p>The chapter&rsquo;s own conclusion is that there are various issues to consider and that each organization must make informed choices about how to harness what the cloud offers while minimizing the drawbacks. That is not a dodge. It is the honest shape of the decision: ten criteria, no single provider that answers all of them well, and a hybrid arrangement waiting at the end of most of the arguments.</p>
<p class="takeaway">Nobody signs up for a runaway bill, a migration they cannot afford, or an outage they have no plan for. They sign up for something quick and cheap, and postpone the questions that would have surfaced all three.</p>

<div class="activity" data-activity="decReady"></div>
`;

ACT.decRunaway = {
  kind: "sim",
  label: "Decide",
  title: "Four moments in a runaway bill",
  how: "Work the four decisions in order, and after each one read every outcome, including the ones for the options you did not pick.",
  objective: "3.4",
  intro: "A hypothetical practice situation, built on the shape of the chapter&rsquo;s own cautionary case rather than on any real company. You look after operations at a small analytics firm that has just started sending work to an outside provider&rsquo;s metered service. Four moments arrive over the following year, and each one maps onto one of the chapter&rsquo;s five prevention strategies.",
  steps: [
    {
      situation: "Nothing is switched on yet. The engineering lead has an account ready and asks whether there is anything to do before the first request goes out. What matters most right now?",
      opts: [
        {t: "Read the terms first: how usage is charged, what happens when usage is not yours, and what the firm may be liable for.", ok: true, out: "Right. Reading the fine print is the one item on the chapter&rsquo;s list that has to happen before the service is running, because it is the only moment when you can still decline the arrangement. It is also where you find out whether requests made on a stolen credential are billable to you, which is the question the chapter&rsquo;s case turned on."},
        {t: "Switch it on and watch the first bill, since real numbers teach more than a contract does.", ok: false, out: "Real numbers do teach, but the first bill arrives only after a whole billing period of usage has already happened. That is exactly the interval in which the chapter&rsquo;s company ran up a charge hundreds of times its normal size, and the interval it had no way of seeing into."},
        {t: "Ask the provider to cap the account so that overspending is impossible, and treat the matter as settled.", ok: false, out: "A spending cap is a useful control where a provider offers one, and it is worth having. Treating it as the whole answer skips four of the chapter&rsquo;s five recommendations, and a cap set high enough not to interrupt normal work is still high enough to hurt."},
        {t: "Have the finance team approve every individual request the service receives.", ok: false, out: "This would defeat the arrangement entirely. On-demand self-service is what makes the service worth using, and a metered service may handle thousands of requests an hour; the chapter&rsquo;s answer is oversight of the pattern, not approval of each event."}
      ]
    },
    {
      situation: "Three months in, a manager asks what the service has cost so far this quarter. Producing the answer takes two days, because somebody has to open the provider&rsquo;s console, export the usage and add it up by hand. What is the missing practice?",
      opts: [
        {t: "Cost monitoring, so that spending is visible while it is happening rather than reconstructed afterwards.", ok: true, out: "Right. The chapter puts cost monitoring tools first for this reason: a figure that takes two days to assemble will be assembled rarely, and a cost nobody looks at is a cost nobody manages. This is the practice whose absence produced the chapter&rsquo;s second case."},
        {t: "Nothing important. A monthly total is enough oversight for a service of this size.", ok: false, out: "That is precisely the reasoning behind the chapter&rsquo;s second case, where a growing startup let costs escalate unnoticed until the monthly bill arrived. A monthly total tells you what already happened; it cannot tell you about it while you could still act."},
        {t: "Switch to a provider whose invoices are simpler to read.", ok: false, out: "Invoice formatting is not the problem here. The firm has no view of usage between invoices whatever their layout, and changing provider to solve a monitoring gap replaces a small piece of work with a migration."},
        {t: "Have the engineering lead estimate the monthly spend from memory at each management meeting.", ok: false, out: "An estimate from memory is the thing cost monitoring exists to replace. It will be roughly right while usage is steady, which is the only period in which nobody needed it, and roughly right is exactly the wrong answer during an anomaly."}
      ]
    },
    {
      situation: "Over a weekend, usage rises to many times its normal level and stays there. Nobody at the firm notices until the invoice appears eighteen days later. What should have been in place?",
      opts: [
        {t: "Budget alerts set to fire on an anomaly, so the pattern raises a flag on the day it starts.", ok: true, out: "Right. This is the third of the chapter&rsquo;s five strategies, and it is the one that shortens the exposure. Cost monitoring makes spending visible to whoever looks; an alert removes the requirement that somebody happens to be looking on a Saturday."},
        {t: "A standing monthly review meeting where usage is examined alongside the other operating costs.", ok: false, out: "A monthly review is worth having and belongs to a different strategy, reviewing resource allocations. As a detector it is too slow: a monthly cycle can let an anomaly run for most of a billing period, which is roughly the interval that produced the chapter&rsquo;s case."},
        {t: "A request to the provider to refund the unusual usage, since the firm did not authorise it.", ok: false, out: "The meter recorded real requests made with a valid credential, which is what a metered service bills for. The company in the chapter&rsquo;s case was left pleading for help and leniency rather than exercising a right, which is the difference between a remedy and a favour."},
        {t: "A larger prepayment to the provider, so that a spike is absorbed without an unexpected invoice.", ok: false, out: "Prepaying changes when the money leaves rather than whether it is spent. The firm would still lose the same amount, and it would lose it without ever receiving the invoice that was the only signal anything had happened."}
      ]
    },
    {
      situation: "The investigation finishes. The credential had been readable in a place a departed contractor could still reach, and separately about half the capacity the firm was paying for had been provisioned for a product launch that never happened. What does the chapter&rsquo;s list say the firm still owes itself?",
      opts: [
        {t: "Both a regular review of what is provisioned and cost awareness across the teams, because the two failures have different causes and different owners.", ok: true, out: "Right. One failure was a credential and the other was capacity nobody revisited, and the chapter&rsquo;s five strategies cover both: regular review of resource allocations catches the idle capacity, and educating teams on cost awareness with a culture of accountability addresses the gap between whoever provisions a resource and whoever pays for it."},
        {t: "A security review only. The unused capacity is a finance matter and belongs on a different agenda.", ok: false, out: "Splitting them is how the second one survives. The chapter&rsquo;s own second case involved no attacker at all, only over-provisioned resources and no monitoring, and it produced the same result: money leaving the business without anybody deciding that it should."},
        {t: "A move back to machines the firm owns, since a metered service has proved too dangerous to use.", ok: false, out: "The chapter draws no such conclusion. Owned machines would replace a visible metered bill with the fixed costs and idle capacity of objective 3.3, and the firm would still have had a credential where a contractor could read it."},
        {t: "A stricter approval process for new services, so that no team can start using a provider without sign-off.", ok: false, out: "Sign-off before the first use is worth having and overlaps with reading the fine print. It does nothing about either failure here, though: both happened long after the service was approved, and neither would have been prevented by an extra signature at the start."}
      ]
    }
  ]
};

ACT.decCriteria = {
  kind: "sort",
  label: "Sort",
  title: "Which criterion is this question testing?",
  how: "Each question below is one a manager might put to a provider. Place it under the criterion it is really testing; the organizations described are hypothetical.",
  objective: "3.4",
  buckets: [
    {id: "avail", name: "Availability and reliability", hint: "will it be running, what is backed up, and how do we keep trading on the day it is not"},
    {id: "grow", name: "Scalability and viability", hint: "can the provider grow with us, and will the provider still be there in a few years"},
    {id: "spc", name: "Security, privacy and compliance", hint: "who can reach the data, whose duties apply to it, and where may it physically sit"},
    {id: "reach", name: "Diversity of offerings and openness", hint: "how many providers must we manage, and how hard would it be to leave one"},
    {id: "cost", name: "Cost", hint: "what the meter shows, set against what the same work truly costs us"}
  ],
  items: [
    {t: "What uptime is promised for this service, and what will we be doing during the hours that promise is not met?", b: "avail", why: "Availability is the primary concern for most organizations, and the chapter notes that not even the largest public providers are immune from hardware failures, programming errors or network outages. Because of that it expects the customer to plan ahead and replicate its cloud-based infrastructure in different locations."},
    {t: "What backups are taken of the servers and storage, and will there be enough bandwidth for us to reach large amounts of our data quickly?", b: "avail", why: "These are two of the three questions the chapter tells organizations to examine when judging whether an application can be moved: the promised uptime, the backups made to servers and storage, and whether sufficient bandwidth will be provided for large amounts of data."},
    {t: "Our transaction volume triples every December. Can this provider absorb that, and the volumes we expect to reach in three years?", b: "grow", why: "Scalability is one of the biggest promises of cloud computing, yet the chapter warns that not every provider will meet every organization&rsquo;s demands, so the evaluation has to cover both current and future needs in storage and transaction volume."},
    {t: "If this provider were to stop trading, what would it cost us in money and time to set up somewhere else and move everything across?", b: "grow", why: "That is viability: the stability of the provider in the long run. The chapter lists the repercussions precisely as the costs and efforts of setting up a new infrastructure, migrating applications and transferring the data to it."},
    {t: "How is our data protected from outside intruders, and how would we ever establish who had access to a particular record?", b: "spc", why: "The first half is the chapter&rsquo;s security question. The second half is its structural warning: because a public cloud is shared among different companies on the same hardware, auditing who has access to the data is extremely difficult, if not impossible."},
    {t: "May the records of the people we serve be held on machines outside this country, given the duties our sector works under?", b: "spc", why: "This is privacy and compliance together. The chapter treats compliance duties as applying in particular industries and jurisdictions, and notes that some providers allow a customer to specify geographic areas for exactly this kind of requirement."},
    {t: "Will one provider cover the services we need now and the ones we will need next, or are we about to manage several separate relationships?", b: "reach", why: "Diversity of offerings is about the management burden: a larger number and diversity of providers is more difficult to manage, so many organizations prefer to deal with fewer providers that can meet all their needs."},
    {t: "How would we get several terabytes back out again if a better offer arrived, how long would that take, and what would the transfer be charged at?", b: "reach", why: "That is openness. Providers use different infrastructures and different ways to store data, which makes migration extremely difficult and produces lock-in, and bandwidth plus the charges providers levy for moving data into or out of their infrastructure make it slow and expensive as well."},
    {t: "The rented figure is on the invoice. What does the same machine truly cost us once licences, electricity, the facility and the staff are counted?", b: "cost", why: "This is the cost comparison the chapter calls hard. Calculating the monthly cost of a rented server is easy, while many organizations do not know what a comparable server of their own costs once the machine, the licence fees, the electricity, the data center and the staff are all included."},
    {t: "If we rent capacity only for our few peak weeks each year, who actually operates that arrangement and what does the extra complexity cost us?", b: "cost", why: "The chapter raises exactly this balance: using a cloud infrastructure only for periods of peak demand is sensible, and, needless to say, it adds another layer of complexity to the IT operations, which is a cost like any other."}
  ]
};

ACT.decQuiz = {
  kind: "quiz",
  label: "Check yourself",
  title: "Agreements, exposure, and getting out again",
  how: "Four options, one best answer; read every explanation, including the ones for options you did not choose. Any organization described is hypothetical.",
  objective: "3.4",
  questions: [
    {
      q: "A provider&rsquo;s agreement promises a very high uptime figure and pays a discount whenever that figure is missed. What has the customer actually obtained?",
      opts: [
        "A guarantee that the resources will be available, which can be enforced if they are not",
        "A promise of certain service levels together with refunds or discounts when they are missed, which works mostly as a way of resolving disputes",
        "Protection against the business lost during an outage, since the discount is calculated from the revenue affected",
        "A reason to stop planning for outages, because responsibility for uptime has now moved to the provider"
      ],
      a: 1,
      why: [
        "The chapter is explicit that such agreements do not guarantee the availability of resources. A commitment with a penalty attached is a different instrument from a guarantee, and confusing the two is what leaves an organization with no plan.",
        "Correct. The chapter describes service-level agreements as promising certain service levels and providing refunds or discounts if the promises are not met, which makes them mostly a vehicle for resolving conflicts in case of problems.",
        "Refunds and discounts normally cover only the fees paid for the service. They can never offset the opportunity costs arising from lost business, which is usually the larger figure by a wide margin.",
        "This is the conclusion the chapter warns against. Because being affected by a negative event is often too costly in lost business or goodwill, organizations are expected to plan ahead and replicate their cloud-based infrastructure in different locations."
      ]
    },
    {
      q: "In the chapter&rsquo;s cautionary case, an enormous volume of work was requested using a credential that did not belong to the requester. Which feature of the arrangement turned that into a financial event of that size?",
      opts: [
        "Broad network access, because the account could be reached from anywhere and from almost any web-enabled device, which is what put it within reach of somebody it did not belong to",
        "Resource pooling, because the customer&rsquo;s work was running on hardware shared with other companies",
        "Measured service together with rapid elasticity: the meter runs for whoever presents the credential, and capacity rose to meet every request without a ceiling",
        "On-demand self-service by itself, because the account could be opened without negotiating with the provider"
      ],
      a: 2,
      why: [
        "Broad network access explains how the service was reachable, which is true of every cloud service and of the ones that never produce a surprise bill. Reachability alone does not decide what anything costs.",
        "Resource pooling explains where the work physically ran and why the customer could not say which machine held it. Nothing about sharing hardware makes a request more expensive than it would otherwise be.",
        "Correct. Metering is what makes usage billable to whoever holds the credential, and elasticity is what let the requested volume actually be served rather than refused, so the two together convert a stolen key into a bill hundreds of times the usual size.",
        "Self-service explains how quickly the arrangement could be set up in the first place, and it is genuinely part of why nobody had to approve the spending. It does not explain why nineteen billion characters of work were served and charged."
      ]
    },
    {
      q: "A hypothetical research institute holds several terabytes with one provider and is offered better terms by another. Its analysts budget a weekend for the move. Which criterion is about to correct them, and why?",
      opts: [
        "Viability, because the real question is whether the new provider will still be trading in three years",
        "Openness, because providers store data differently, and bandwidth limits plus transfer charges make moving very large volumes slow and expensive",
        "Scalability, because the new provider may not be able to hold the volume the institute expects to accumulate over the next few years, and a second migration would cost more than this one",
        "Availability, because the institute cannot work while its data are in transit between the two providers"
      ],
      a: 1,
      why: [
        "Viability is a real criterion and worth asking about before signing anything, but it concerns whether the provider survives rather than what makes this particular migration difficult.",
        "Correct. Most providers use different infrastructures and different ways to store data, which makes migrating between them extremely difficult, and the chapter adds that bandwidth and data transmission costs limit it further because providers often charge for moving data into or out of their infrastructure.",
        "Scalability concerns whether a provider can meet current and future demands for storage and transaction volume. It says nothing about the cost or the duration of the move itself.",
        "Working around a transition is a genuine operational problem, but it is a consequence of the migration rather than the criterion that predicts how long and how expensive the migration will be."
      ]
    },
    {
      q: "A hypothetical clinic is told by a provider that its patient records will be completely secure and fully compliant in the provider&rsquo;s public cloud. What does the chapter say the clinic still cannot obtain there?",
      opts: [
        "Encryption of the records, which is unavailable on any shared infrastructure",
        "Knowledge of exactly where the data physically sit, together with a workable way to audit who has reached them",
        "Any protection at all from outside intruders, because the hardware is shared with other companies",
        "The freedom to keep some records in its own building, because a provider agreement has to cover all of an organization&rsquo;s data"
      ],
      a: 1,
      why: [
        "Nothing in the chapter says protective measures are unavailable in a shared infrastructure. The difficulty it identifies is about location and auditing, not about whether the data can be protected in transit or at rest.",
        "Correct. Because a public cloud is shared among different companies with different applications on the same hardware, it is impossible for organizations to know exactly where the data are physically located, and auditing who has access is extremely difficult if not impossible.",
        "This overstates the chapter considerably. It treats security as a question to put to the provider, not as something that cannot exist in a public cloud, and providers are described as being well aware of these concerns.",
        "The chapter recommends the opposite. Organizations are expected to weigh which applications and data to move and which to keep in-house, and it names medical and legal work as fields where that judgment matters most."
      ]
    }
  ]
};

ACT.decCost = {
  kind: "formula",
  label: "Spreadsheet",
  title: "Build the in-house figure before you compare it",
  how: "Type one formula for row 2 in each column, then run it; the formula is applied down every row the way a filled-down formula behaves in a real sheet.",
  objective: "3.4",
  headers: ["Cost element", "Cost per year", "In the quick comparison?", "Cost per month", "Counted per month", "Full cost so far, per month"],
  data: [
    ["The server itself, spread over the years it is expected to last", 2400, "yes", "", "", ""],
    ["Licences for the operating system and the database engine", 1800, "no", "", "", ""],
    ["Electricity to run the machine and to cool it again", 1200, "no", "", "", ""],
    ["Share of the facility: floor space, power distribution, cooling plant", 2100, "no", "", "", ""],
    ["Share of the staff who install, patch, monitor and replace it", 3600, "no", "", "", ""]
  ],
  tasks: [
    {
      column: 3,
      prompt: "Column D: put every element on the same footing as a monthly rented bill by turning the yearly figure into a monthly one.",
      placeholder: "=B2/12",
      expect: "=B2/12",
      note: "Every figure in this sheet is invented for practice.",
      hint: "One arithmetic step is enough. Take the yearly cost in column B and divide it by the number of months in a year.",
      explain: "Comparisons are only possible between figures covering the same period. A rented bill arrives monthly, so the owned costs have to be expressed monthly before either number means anything next to the other."
    },
    {
      column: 4,
      prompt: "Column E: show only what a quick comparison would have counted. Where column C says yes, show that element&rsquo;s monthly figure; otherwise show zero.",
      placeholder: "=IF(C2=\"yes\", B2/12, 0)",
      expect: "=IF(C2=\"yes\", B2/12, 0)",
      hint: "You need a test and two results. Compare the text in column C against the word yes, and return the monthly figure when it matches and zero when it does not.",
      explain: "Only the first row survives, which is the whole problem. A comparison built on the purchase price of the machine alone is being made against a rented bill that already includes the licences, the power, the building and the people."
    },
    {
      column: 5,
      prompt: "Column F: accumulate the full monthly cost as you go down the list, so the last row shows what this one machine truly costs each month.",
      placeholder: "=SUM($B$2:B2)/12",
      expect: "=SUM($B$2:B2)/12",
      hint: "Total a range that starts pinned at the first row and grows as the formula fills down, then convert that yearly total to a monthly one.",
      explain: "The final row is several times the figure the quick comparison produced. That gap is the chapter&rsquo;s point exactly: the rented number is known precisely and the owned number usually is not, so the two are rarely being compared on equal terms."
    }
  ]
};

ACT.decReady = {
  kind: "selfcheck",
  label: "Self-check",
  title: "Could you actually run this decision?",
  how: "Rate each statement honestly; anything you cannot do yet has a pointer to the exact place in this section to reread.",
  objective: "3.4",
  items: [
    {t: "I can retell the chapter&rsquo;s cautionary case and name the three cloud characteristics that turned a stolen credential into a bill of that size.", hint: "The opening of this section, through to the list of the three characteristics that were doing the damage."},
    {t: "I can list the five things the chapter recommends to prevent a runaway bill, and say which one has to happen before anything is switched on.", hint: "The numbered defences immediately after the two cases; the last of the five is the one that has to come first in time."},
    {t: "I can name the ten criteria for evaluating a provider and turn at least six of them into a question I would actually ask.", hint: "The table of criteria, questions and weak answers, in the part of the section on what to put to a provider."},
    {t: "I can explain what a service-level agreement does and does not promise, and why a refund is not the same as compensation.", hint: "The section on what an agreement actually promises, especially the first two items in the list there."},
    {t: "I can state the chapter&rsquo;s counterpoint about in-house uptime without it sounding like an argument against ever renting anything.", hint: "The paragraph after that list, where the chapter compares a missed promise against a poorly managed operation of your own."},
    {t: "I can say why an organization cannot know exactly where its data physically sit in a public cloud, and what that makes difficult.", hint: "The section on sharing a building you cannot see, where pooling and auditing are set side by side."},
    {t: "I can explain lock-in to somebody who assumes moving providers is a weekend of copying.", hint: "The section on getting out again: different ways of storing data, bandwidth, and charges for transferring data out."},
    {t: "I can list the five elements of the true in-house cost of one server and say which of them a quick comparison usually leaves out.", hint: "The list in the closing part of the section, and the sheet that follows it."}
  ]
};

ACT.decApply = {
  kind: "quiz",
  label: "Apply it",
  title: "Five decisions you have not seen before",
  how: "Each question drops you into a different, invented organization mid-decision. Any organization described is hypothetical.",
  objective: "3.4",
  questions: [
    {
      q: "A four-person architecture firm wants shared project boards, file storage and e-signature for contracts, with no interest in writing or customizing any software themselves. Which service model fits what they are actually asking for?",
      opts: [
        "Software as a service, since they want finished applications to use, not infrastructure or a platform to build on",
        "Infrastructure as a service, since it gives them the most control over how the applications run",
        "Platform as a service, since it lets them build exactly the workflow they want",
        "None of the three; a firm this size should keep everything on its own office server"
      ],
      a: 0,
      why: [
        "Correct. Project boards, storage and e-signature are complete applications delivered over the internet; the firm wants to use them, not to manage the machines or the platform underneath them.",
        "Control over how applications run is exactly what this firm has no interest in. Infrastructure as a service would hand them a set of virtual machines to administer, which is more responsibility than four people asked for.",
        "Nothing here asks to build a custom workflow. A platform to develop on solves a problem this firm does not have; they want to sign in and use existing software.",
        "Size is not the deciding factor. Even a very small firm can reasonably run entirely on finished cloud applications rather than maintaining a server at all."
      ]
    },
    {
      q: "A mobile game studio's servers sit mostly idle, then strain under ten times the normal traffic for the first week after every major update, then fall quiet again. Which pressure on their infrastructure is this, most precisely?",
      opts: [
        "Rising energy costs, since more players means more electricity drawn by the servers",
        "Obsolescence, since the hardware clearly cannot keep up with a growing player base",
        "Demand fluctuation, since capacity has to be sized for a spike that does not last",
        "Growing storage needs, since more players generate more data to keep"
      ],
      a: 2,
      why: [
        "Energy cost would rise during the spike, but that is a consequence of the real pressure, not the pressure itself, and it says nothing about why capacity is hard to plan for.",
        "Obsolescence is hardware falling behind over time regardless of traffic. This studio's problem repeats on a predictable weekly pattern around each release, which is a sizing problem, not an aging one.",
        "Correct. The studio faces short, sharp spikes it has to be ready for without paying to keep that much capacity running the other fifty weeks of the year, which is exactly the fluctuating-demand pressure the chapter describes.",
        "Storage would grow steadily as data accumulates. A spike that rises and falls within a week is about processing and network capacity in the moment, not about how much has been saved up."
      ]
    },
    {
      q: "A regional accounting firm plans to move several years of client records to a new provider over a single weekend, and has budgeted for the new provider's fees but nothing else. What is most likely to go wrong?",
      opts: [
        "The new provider is likely to be less reliable, since switching providers tends to increase the chance of downtime",
        "The volume of data will make the transfer itself slow and possibly costly, a fact the weekend budget does not account for",
        "Client records cannot legally be moved between providers without a court order",
        "Nothing is likely to go wrong, since fees are the only real cost a migration of this kind involves"
      ],
      a: 1,
      why: [
        "Reliability is a property of the provider chosen, not a consequence of switching itself; nothing here suggests the new provider is less dependable.",
        "Correct. Providers store and structure data differently, and bandwidth limits plus transfer charges make moving a large volume slow and often expensive &mdash; a cost this budget never priced in.",
        "No such requirement exists in general; moving business records between commercial providers is a contractual and technical matter, not one that needs judicial approval.",
        "This ignores exactly the cost the scenario is testing. Fees are one line item; the data transfer itself is frequently the larger and less visible one."
      ]
    },
    {
      q: "A boutique hotel-booking platform owns its own servers, sized to handle the single weekend each year when a local festival triples normal traffic. The rest of the year, most of that capacity sits unused. What does this tell you about the fit between the cost model and the workload?",
      opts: [
        "It fits well, since owning hardware is generally the cheaper option once a company can afford the upfront cost",
        "It fits poorly; a metered, elastic arrangement would charge mostly for the one busy weekend, not for capacity idle all year",
        "It fits poorly, but only because the servers should be replaced on a faster schedule than this company follows",
        "It fits well, since owning the hardware means the company fully controls every machine during the busy weekend"
      ],
      a: 1,
      why: [
        "Ownership is not cheaper by default; a fixed asset sized for one weekend a year is paid for in full whether it is used or idle, which is precisely the mismatch here.",
        "Correct. Rapid elasticity and a measured, pay-for-what-you-use model exist for exactly this kind of workload: capacity that is needed briefly and would otherwise sit idle almost all year.",
        "Replacement frequency is a separate question from utilization. A brand-new server sized this way would sit idle just as often as an old one.",
        "Control during the festival is not what is being asked. The company already controls its own hardware today; the problem is what that control costs the other fifty-one weeks of the year."
      ]
    },
    {
      q: "An environmental testing lab has written its own image-analysis software for soil samples and runs it in intense bursts a few times a month. It wants to stop maintaining physical servers, but still needs to install and configure its own software stack. Which service model matches that?",
      opts: [
        "Software as a service, since the lab wants to stop managing hardware of any kind entirely",
        "Platform as a service, since the lab would be handed a ready-made analysis application to run",
        "None of the three fit well, since custom-written software cannot run in a rented arrangement",
        "Infrastructure as a service, since it removes the hardware while leaving the software up to the lab"
      ],
      a: 3,
      why: [
        "Wanting to stop managing hardware is necessary but not sufficient here: software as a service would hand the lab someone else's finished application, and this lab has already written its own.",
        "The lab already has its analysis software; it is not looking for one to be provided. A platform to develop on also usually constrains how software is built, which is not what a bursty, already-written workload needs.",
        "Custom software runs routinely on rented infrastructure; this is one of the most common uses of the cloud in fields with bursty, specialized computing needs.",
        "Correct. Infrastructure as a service supplies the computing, storage and networking while leaving the operating system and everything installed on it to the customer, which is exactly the fit for software the lab already wrote and wants to keep running its own way."
      ]
    }
  ]
};
