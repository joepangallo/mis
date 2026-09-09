/* ===== s34c ===== */
PROSE.s34c = `
<span class="eyebrow">Section 3&ndash;4c</span>
<h2>Deciding well: what to ask before you move</h2>
<p class="lede">Renting an infrastructure takes an afternoon and a card. That speed is the appeal and the difficulty: a decision that once took months now takes minutes, so the thinking moves elsewhere.</p>

<h3>The bill nobody was watching</h3>
<p>A small software company ran a translation application. It sent text to another company&rsquo;s service, reaching it with an <b>interface key</b> &mdash; a short secret string identifying the paying customer on every request.</p>
<p>Its usual spend was US$1,500 a month. Then one six-week bill came to US$450,000: somebody had apparently stolen the key and requested nineteen billion characters, all charged to the key holder, because that is what a key is for.</p>
<p>A quieter case sits beside it. A startup doubled its users and expanded its rented infrastructure without cost management. Resources were over-provisioned, nothing was monitored, and the cost went unnoticed until the bill came. Nothing was stolen; nobody was watching.</p>
<p>Read both against the five characteristics. Three did the damage, and all three were sold as benefits.</p>
<ul class="keys">
<li><b>On-demand self-service</b> &mdash; resources arrive without negotiation, and so without anybody inside the organization approving the spending.</li>
<li><b>Rapid elasticity</b> &mdash; capacity scales instantly, so a runaway stream of requests meets no ceiling that owned machines would impose.</li>
<li><b>Measured service</b> &mdash; the meter runs for whoever presents the credential, never asking whether the business wanted the work done.</li>
</ul>
<p>The advice is vigilance, not avoidance, and the five defences are management, not technology: monitor cost as it is spent, review allocations, alert on anomalies, teach cost awareness, and read the fine print first.</p>

<div class="activity" data-activity="decRunaway"></div>

<h3>Ten questions to put to a provider</h3>
<p>A prior decision comes first: which applications, services or data should move at all. No single provider meets every need.</p>
<p>For each candidate the chapter lists ten criteria. Treat them as questions to carry into a meeting: one you cannot phrase as a question is one you will not ask.</p>
<ul class="list-tight">
<li><b>Availability</b> &mdash; what uptime is promised, and what happens in the hours it is not met</li>
<li><b>Reliability</b> &mdash; what is backed up, and how fast you could reach it</li>
<li><b>Scalability</b> &mdash; whether your peaks and your three-year volumes are absorbed</li>
<li><b>Viability</b> &mdash; what it would cost you if this provider stopped trading</li>
<li><b>Security</b> &mdash; how data is protected, and whether access can be evidenced</li>
<li><b>Privacy</b> &mdash; who may see records, and under what conditions</li>
<li><b>Compliance</b> &mdash; whether your sector's duties permit where the data would sit</li>
<li><b>Diversity of offerings</b> &mdash; whether one relationship covers what you will need next</li>
<li><b>Openness</b> &mdash; how you would get terabytes back out, how long, at what charge</li>
<li><b>Cost</b> &mdash; the true figure once licences, power, facilities and staff are counted</li>
</ul>

<div class="activity" data-activity="decCriteria"></div>

<h3>What an agreement actually promises</h3>
<p>Not even the largest providers escape hardware failures, programming errors or outages, so the question is not whether one happens but what was arranged for the day it does.</p>
<p>The <b>service-level agreement</b> is meant to answer that: a contract specifying service levels such as uptime, with warranties and disaster recovery. It reads like a guarantee and is not one.</p>
<ul class="keys">
<li><b>It does not guarantee availability</b> &mdash; it promises levels and refunds when missed, settling disputes after the fact.</li>
<li><b>A refund is not compensation</b> &mdash; refunds cover fees paid, never business lost while the service was down.</li>
<li><b>Self-service cuts both ways</b> &mdash; doing it yourself is an advantage until something breaks, because help is not guaranteed.</li>
<li><b>The customer still has to plan</b> &mdash; organizations take precautions, including replicating the infrastructure in more than one location.</li>
</ul>

<h3>Sharing a building you cannot see</h3>
<p>Security, privacy and compliance follow from one fact: a public cloud is shared, with different companies running different applications on the same hardware.</p>
<ul class="keys">
<li><b>You cannot say where the data physically are</b> &mdash; resources are pooled and assigned dynamically, so you never know which machine holds the records.</li>
<li><b>Auditing who touched the data is very hard</b> &mdash; possibly impossible, and knowing who reached a record is often the substance of an obligation.</li>
</ul>
<p>Control is the other half. In a rented infrastructure control over data is reduced, legal rights fewer, and providers may be required to hand records to law enforcement. Firms holding medical records often keep those in their own building.</p>
<p>None of that moves the duty. Renting the machines does not rent out the obligation, and three families of rule reach the customer rather than the provider.</p>
<ul class="keys">
<li><b>Financial reporting duties</b> are law, and they require an organization to show that the records behind its published figures were controlled and have not been altered.</li>
<li><b>Health information duties</b> are also law, and they permit cloud use while requiring a written agreement with the provider and specified safeguards, so the arrangement is conditional rather than forbidden.</li>
<li><b>Payment card rules</b> are an industry standard rather than legislation, enforced through the contract with the card networks, which is a different kind of pressure with a similar effect.</li>
</ul>
<p>The manager's question is therefore never whether the provider is compliant. It is which of the customer's own obligations the provider can evidence, and what the contract says when a regulator asks.</p>

<h3>Getting out again</h3>
<p>Openness, or interoperability, is noticed last and felt hardest. Providers store data differently, which makes moving between them extremely difficult and can lock a company in. Their tools make moving easier &mdash; inward.</p>
<p>The second force is physical. Moving terabytes takes real time on the bandwidth available, and providers charge for transfers in or out. A weekend of copying becomes months, with an invoice attached.</p>
<p class="takeaway">Ask the exit question at the beginning, while you still have leverage. Once the data are large and the applications built around one provider, the cost of leaving stops being a choice and becomes a fact.</p>

<div class="activity" data-activity="decQuiz"></div>

<p>Five new organizations, none of them real, ask you to use this vocabulary cold.</p>

<div class="activity" data-activity="decApply"></div>

<h3>What it actually costs</h3>
<p>Metered billing shows what each part costs. Owned equipment tells you nothing comparable: a server in a cupboard costs the same busy or idle.</p>
<p>The chapter will not claim the metered bill is smaller; there is considerable disagreement over whether the cloud is ultimately cheaper. The comparison is unfair one way: the rented figure is exact, the in-house figure is not.</p>
<ul class="keys">
<li><b>The machine itself</b> &mdash; the element every quick comparison includes, its price divided by the years it should last.</li>
<li><b>Software licences</b> &mdash; for the operating system and database engine, which under an infrastructure service stay yours.</li>
<li><b>Electricity</b> &mdash; counted twice: the machine draws power, and the cooling draws power to remove the heat.</li>
<li><b>The facility</b> &mdash; this machine&rsquo;s share of floor space, power distribution, cooling and physical security.</li>
<li><b>The staff</b> &mdash; the fraction who install, patch, monitor, back up and replace it, usually the largest figure and least written down.</li>
</ul>
<p>One game developer moved back out of a public cloud into equipment it owned. Build the in-house figure on the hypothetical sheet below; every number is invented.</p>

<div class="activity" data-activity="decCost"></div>

<p class="takeaway">Nobody signs up for a runaway bill, an unaffordable migration or an outage with no plan. They sign up for something quick and cheap, postponing the questions that would have surfaced all three.</p>

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
        {t: "Switch it on and watch the first bill, since real numbers teach more than a contract does.", ok: false, out: "Real numbers do teach, but the first bill arrives only after a whole billing period of usage has already happened. That is exactly the interval in which the chapter&rsquo;s company ran up a charge hundreds of times its normal size, and the interval it had no way of seeing into."},
        {t: "Ask the provider to cap the account so that overspending is impossible, and treat the matter as settled.", ok: false, out: "A spending cap is a useful control where a provider offers one, and it is worth having. Treating it as the whole answer skips four of the chapter&rsquo;s five recommendations, and a cap set high enough not to interrupt normal work is still high enough to hurt."},
        {t: "Have the finance team approve every individual request the service receives.", ok: false, out: "This would defeat the arrangement entirely. On-demand self-service is what makes the service worth using, and a metered service may handle thousands of requests an hour; the chapter&rsquo;s answer is oversight of the pattern, not approval of each event."},
        {t: "Read the terms first: how usage is charged, what happens when usage is not yours, and what the firm may be liable for.", ok: true, out: "Right. Reading the fine print is the one item on the chapter&rsquo;s list that has to happen before the service is running, because it is the only moment when you can still decline the arrangement. It is also where you find out whether requests made on a stolen credential are billable to you, which is the question the chapter&rsquo;s case turned on."}
      ]
    },
    {
      situation: "Three months in, a manager asks what the service has cost so far this quarter. Producing the answer takes two days, because somebody has to open the provider&rsquo;s console, export the usage and add it up by hand. What is the missing practice?",
      opts: [
        {t: "Nothing important. A monthly total is enough oversight for a service of this size.", ok: false, out: "That is precisely the reasoning behind the chapter&rsquo;s second case, where a growing startup let costs escalate unnoticed until the monthly bill arrived. A monthly total tells you what already happened; it cannot tell you about it while you could still act."},
        {t: "Switch to a provider whose invoices are simpler to read.", ok: false, out: "Invoice formatting is not the problem here. The firm has no view of usage between invoices whatever their layout, and changing provider to solve a monitoring gap replaces a small piece of work with a migration."},
        {t: "Cost monitoring, so that spending is visible while it is happening rather than reconstructed afterwards.", ok: true, out: "Right. The chapter puts cost monitoring tools first for this reason: a figure that takes two days to assemble will be assembled rarely, and a cost nobody looks at is a cost nobody manages. This is the practice whose absence produced the chapter&rsquo;s second case."},
        {t: "Have the engineering lead estimate the monthly spend from memory at each management meeting.", ok: false, out: "An estimate from memory is the thing cost monitoring exists to replace. It will be roughly right while usage is steady, which is the only period in which nobody needed it, and roughly right is exactly the wrong answer during an anomaly."}
      ]
    },
    {
      situation: "Over a weekend, usage rises to many times its normal level and stays there. Nobody at the firm notices until the invoice appears eighteen days later. What should have been in place?",
      opts: [
        {t: "A standing monthly review meeting where usage is examined alongside the other operating costs.", ok: false, out: "A monthly review is worth having and belongs to a different strategy, reviewing resource allocations. As a detector it is too slow: a monthly cycle can let an anomaly run for most of a billing period, which is roughly the interval that produced the chapter&rsquo;s case."},
        {t: "Budget alerts set to fire on an anomaly, so the pattern raises a flag on the day it starts.", ok: true, out: "Right. This is the third of the chapter&rsquo;s five strategies, and it is the one that shortens the exposure. Cost monitoring makes spending visible to whoever looks; an alert removes the requirement that somebody happens to be looking on a Saturday."},
        {t: "A request to the provider to refund the unusual usage, since the firm did not authorise it.", ok: false, out: "The meter recorded real requests made with a valid credential, which is what a metered service bills for. The company in the chapter&rsquo;s case was left pleading for help and leniency rather than exercising a right, which is the difference between a remedy and a favour."},
        {t: "A larger prepayment to the provider, so that a spike is absorbed without an unexpected invoice.", ok: false, out: "Prepaying changes when the money leaves rather than whether it is spent. The firm would still lose the same amount, and it would lose it without ever receiving the invoice that was the only signal anything had happened."}
      ]
    },
    {
      situation: "The investigation finishes. The credential had been readable in a place a departed contractor could still reach, and separately about half the capacity the firm was paying for had been provisioned for a product launch that never happened. What does the chapter&rsquo;s list say the firm still owes itself?",
      opts: [
        {t: "Both a regular review of what is provisioned and cost awareness across the teams.", ok: true, out: "Right, because the two failures have different causes and different owners. One failure was a credential and the other was capacity nobody revisited, and the chapter&rsquo;s five strategies cover both: regular review of resource allocations catches the idle capacity, and educating teams on cost awareness with a culture of accountability addresses the gap between whoever provisions a resource and whoever pays for it."},
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
        "A promise of certain service levels, with refunds or discounts when they are missed",
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
        "Software as a service, since they want finished applications to use",
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
