/* ===== s53a ===== */
PROSE.s53a = `
<span class="eyebrow">Section 5&ndash;3a</span>
<h2>Making it work inside a company</h2>
<p class="lede">Every tool in the last three sections is available, cheap and proven somewhere. Most internal deployments of them fail anyway. This section is about why, and it is the part of the chapter that separates people who can name a technology from people who can introduce one.</p>

<h3>The tool is necessary and nowhere near sufficient</h3>
<p>The chapter's position is blunt: technology is a critical success factor, and it is not the only component. Change management decides the outcome. Providing the tools and hoping employees use them for the intended purpose is not a plan, and management has to make sure people know the tools exist, what they are for, and what the rules around them are.</p>
<p>Because these applications run on social interaction, information sharing and network effects, corporate culture matters more here than for almost any other class of system. A culture of knowledge sharing, trust and honest feedback makes them work. A culture without those three does not fail to adopt the tool; it adopts the tool and produces nothing.</p>

<h3>What the web proves, and what it does not</h3>
<p>The first trap the chapter names has a name of its own: the enterprise is not the web. Applications that succeeded publicly did so over many years and under conditions a firm does not have.</p>
<p>Two of those conditions are worth spelling out, because both are invisible from outside.</p>
<ul class="keys">
<li><b>Public participation is voluntary</b>, and people join because they want to, whereas nobody inside an organization can be made to contribute anything worth reading.</li>
<li><b>Seamless collaboration usually is not</b>: good encyclopaedia articles rest on long arguments behind the scenes, and many open source projects let anyone suggest a change while letting only a few apply one.</li>
</ul>

<h3>Four factors that decide the outcome</h3>
<p>The chapter lists a set of caveats to weigh before deploying. Four of them account for most real failures, and each one shows up as a recognisable complaint rather than as an announcement.</p>
<ul class="keys">
<li><b>Culture</b> is the first, because open communication does not sit comfortably inside rigid hierarchies built on control, and self-expression cannot be mandated into existence.</li>
<li><b>Critical mass</b> is the second, because these tools depend on network effects and a small user base never reaches the point where participating repays the effort of participating.</li>
<li><b>Technological inertia</b> is the third, because people do not switch tools until they see a real, tangible benefit, and familiarity is itself a benefit they already have.</li>
<li><b>Security</b> is the fourth, because any application that increases sharing increases exposure, and a firm has to weigh collaboration against protecting intellectual property and meeting its reporting obligations.</li>
</ul>
<p>Sort eight complaints into the factor each is evidence of. The complaints are the form these problems actually take when somebody reports them.</p>

<div class="activity" data-activity="adpSort"></div>

<h3>The other four, which arrive later</h3>
<p>The remaining factors tend to appear after a pilot has gone well, which is exactly what makes them dangerous.</p>
<ul class="keys">
<li><b>Organizational context</b> means the work should choose the tool: ask what objective you are trying to meet before deciding what to install, rather than setting up a wiki and hoping.</li>
<li><b>Organizational hierarchies</b> matter because a pilot runs inside one department, and an organization-wide deployment needs changes to culture, process and often the hierarchy itself.</li>
<li><b>The generation gap</b> is a tendency rather than a rule: a workforce accustomed to interactive online environments raises the odds of adoption, and senior members may not see the point at all.</li>
<li><b>Technological integration</b> decides whether the tool joins the firm's existing systems or simply becomes one more place somebody has to remember to look.</li>
</ul>

<p>Scale changes which of these bites hardest. A small firm can carry a weak culture on personal relationships and will struggle to reach critical mass at all, because there are not enough people for participation to repay itself. A large firm has the numbers and has the hierarchy, the inertia and the compliance obligations that come with them.</p>
<p>Walk a rollout through four decisions, in the order they actually arrive rather than the order a plan puts them in.</p>

<div class="activity" data-activity="adpSim"></div>

<p>Now the same problem seen from the other end, a year after the tool went in. The question is no longer what to do first; it is what the participation figures are actually telling you.</p>

<div class="activity" data-activity="adpCase"></div>

<p class="takeaway">Ask three questions before any internal social tool is bought. What specific work does this serve? Will enough of the right people use it to pass critical mass? And what new exposure does it create that somebody is accountable for? A deployment that cannot answer all three has not been designed, only purchased.</p>

<div class="activity" data-activity="adpQuiz"></div>
`;

ACT.adpSort = {
  kind: "sort",
  label: "Sort",
  title: "Which factor is this complaint evidence of?",
  how: "Each line is a complaint somebody actually makes; sort it into the factor the chapter would attribute it to.",
  objective: "5.3",
  buckets: [
    {id: "cult", name: "Culture", hint: "Open sharing sits badly with hierarchy and control, and participation cannot be ordered into existence."},
    {id: "mass", name: "Critical mass", hint: "The tool needs enough participants before it repays the effort of participating."},
    {id: "inert", name: "Technological inertia", hint: "People will not move to something new without a benefit they can actually feel."},
    {id: "sec", name: "Security", hint: "Wider sharing means wider exposure, and somebody has to carry that risk."}
  ],
  items: [
    {t: "Nobody posts a question, because asking one in public looks like not knowing your job", b: "cult", why: "This is culture in the chapter's exact sense: the tool works and the environment punishes the behaviour it depends on. No feature fixes it."},
    {t: "Managers approve every post before it appears, so discussion has stopped", b: "cult", why: "Open communication colliding with a control-based hierarchy. The chapter is explicit that social applications do not do well inside rigid top-down structures."},
    {t: "I looked for a colleague's expertise and only four people had filled in a profile", b: "mass", why: "The value of a directory rises with how many people are in it. Below a threshold there is nothing to find, so nobody comes back, so there is still nothing to find."},
    {t: "The forum has thirty members across a firm of two thousand, and nothing new this month", b: "mass", why: "Straightforward critical mass. The chapter notes that smaller organizations often cannot reach the participation that makes these tools valuable at all."},
    {t: "We already have email for this, and email works fine for what I do", b: "inert", why: "The chapter's definition of inertia: people do not switch unless they see a real, tangible benefit, and the incumbent tool has the advantage of being already understood."},
    {t: "It duplicates three things I use, so learning it buys me nothing I do not have", b: "inert", why: "Also inertia, and the chapter points out this is common with social applications precisely because they bundle chat, messaging and posting that people already do elsewhere."},
    {t: "A supplier's pricing was posted in an open channel that contractors can read", b: "sec", why: "Exposure created by the sharing itself. The chapter's warning is that any application increasing data sharing necessarily increases the risk of a breach."},
    {t: "Our auditors want to know how we would produce a record of who approved what", b: "sec", why: "The compliance half of the same factor. The chapter names a financial-reporting statute for this reason: collaboration tools can quietly move decisions somewhere nobody can evidence them."}
  ]
};

ACT.adpSim = {
  kind: "sim",
  label: "Walkthrough",
  title: "Rolling out an internal social platform",
  intro: "You have been asked to introduce an enterprise social network at a firm of about two thousand people. Four decisions, in the order they actually arrive.",
  how: "Choose at each step; every option shows what it would lead to, including the ones you did not take. The firm is hypothetical.",
  objective: "5.3",
  steps: [
    {
      situation: "The chief executive has seen a demonstration and wants it deployed. What do you do first?",
      opts: [
        {t: "Deploy it to everybody at once, so critical mass is reached immediately", ok: false, out: "Accounts are not participation. You reach the headcount without reaching critical mass, and you spend the one moment of attention the rollout gets on a tool nobody has a reason to open."},
        {t: "Run a pilot in the most enthusiastic department and expand from there", ok: false, out: "A reasonable second step and a poor first one. A pilot with no stated objective produces a happy department and no evidence, and the chapter warns that a pilot's success rarely survives contact with the whole organization."},
        {t: "Find the specific work it should serve, and name what would count as success", ok: true, out: "Right. The chapter calls this organizational context: the work-related need should drive the choice of tool. Naming the objective first is also what gives you something to measure later, instead of counting logins."},
        {t: "Write the acceptable-use policy, so the rules exist before anybody posts", ok: false, out: "The policy is genuinely needed and it is not the first move. Written before you know what the tool is for, it tends to prohibit rather than enable, which sets the tone for everything after."}
      ]
    },
    {
      situation: "The pilot in one department worked well. Rolling out to the whole firm has stalled: two thousand accounts, and around one in twelve posts anything. What is happening?",
      opts: [
        {t: "The pilot department was self-selected, and the firm as a whole has no such culture", ok: true, out: "Right. This is the chapter's warning in full: department-led pilots work, and organization-wide deployment needs changes in culture and process that a pilot never tested. What you measured was the department, not the tool."},
        {t: "The tool is inadequate, so evaluate two alternatives and choose a better one", ok: false, out: "Replacing the tool restarts the same experiment with the same conditions. Nothing you have observed points at the software, and a second rollout after a failed one is much harder to get attention for."},
        {t: "Participation is a training problem, so run hands-on sessions in every location and office", ok: false, out: "Training turns people who cannot use it into people who can, and the pilot already showed that people can. The stall is about reasons to post, which no session supplies."},
        {t: "Set a posting target for each team, and report on it monthly", ok: false, out: "You will hit the target and learn nothing. The chapter's point that people cannot be forced to participate usefully is exactly this: a quota produces compliance posts that make the channel less worth reading."}
      ]
    },
    {
      situation: "You discover that most of the useful discussion is happening in a messaging tool a team installed themselves, which is not connected to anything.",
      opts: [
        {t: "Block it, since unapproved tools create exposure the firm has not assessed", ok: false, out: "The exposure is real, and blocking it moves the conversation somewhere you cannot see rather than back to the platform. The chapter's observation about people routing around bans applies inside the firm as much as outside it."},
        {t: "Ignore it, since the official platform is the one being measured", ok: false, out: "Then your measurement is now actively misleading, and the firm is running two systems of record with no connection between them, which is the compliance problem waiting to be discovered."},
        {t: "Migrate the team onto the official platform and close the other tool", ok: false, out: "This is the answer that looks decisive. You would be moving a working conversation onto a platform that has already failed to attract one, without changing anything about why."},
        {t: "Treat it as evidence of what the work needs, and integrate rather than ban it", ok: true, out: "Right. It is the clearest signal available about what people actually need, and the chapter's integration point applies: a tool that does not join the firm's existing systems becomes another place to look, which is what your official platform has become."}
      ]
    },
    {
      situation: "Legal asks how the firm would produce a record of a decision made in a channel, and who can read what.",
      opts: [
        {t: "Restrict the platform to non-sensitive discussion, and say so in the policy", ok: false, out: "A rule nobody can apply in the moment. People do not classify a conversation before having it, and the sensitive material arrives inside an ordinary thread rather than announcing itself."},
        {t: "Answer it now with retention, access and export rules, before wider use", ok: true, out: "Right. The chapter puts security and compliance on the list of factors precisely so this arrives before the material does. Retention and access decided early are policy; decided after a request, they are an incident."},
        {t: "Point out that email carries the same exposure and has never been questioned", ok: false, out: "Comparably true and not an answer. Email retention is usually a solved problem at this kind of firm, which is the difference legal is pointing at rather than overlooking."},
        {t: "Defer it until adoption improves, since the question is theoretical at low usage", ok: false, out: "Deferring it means the rules will be written after there is material to apply them to, which is the worst moment to decide what should have been kept."}
      ]
    }
  ]
};

ACT.adpCase = {
  kind: "case",
  label: "Mini case",
  title: "A wiki nobody writes in",
  how: "Read the brief and the exhibit, then take the three decisions in order; the manufacturer and every figure attached to it are hypothetical and were invented for this exercise.",
  objective: "5.3",
  brief: "A manufacturer of specialist pumps has run an internal wiki for a year, intended to hold the knowledge its engineers keep re-deriving. Fourteen months from now a third of its engineering staff reach retirement age. The wiki has plenty of readers and almost no writers, and the head of engineering wants to know whether to persist. The firm is hypothetical and every figure attached to it is invented.",
  facts: [
    {k: "The firm", v: "A manufacturer of specialist pumps, around six hundred staff"},
    {k: "The tool", v: "An internal wiki, running for twelve months"},
    {k: "Why it was built", v: "To hold engineering knowledge that is currently in people's heads"},
    {k: "What is coming", v: "A third of engineering staff reach retirement age within fourteen months"},
    {k: "What is observed", v: "Many readers, very few writers, and almost nothing added by senior engineers"}
  ],
  exhibit: {
    name: "Exhibit A &middot; Twelve months of the wiki",
    caption: "Participation broken down three ways. Every figure here is invented for practice and none of it is reported data.",
    headers: ["Group", "Share of staff", "Read at least monthly", "Wrote or edited at least once"],
    rows: [
      ["Engineers with under 5 years of service", "31 percent", "88 percent", "44 percent"],
      ["Engineers with 5 to 20 years", "39 percent", "71 percent", "12 percent"],
      ["Engineers with over 20 years", "30 percent", "52 percent", "3 percent"],
      ["Pages created in the whole year", "-", "-", "218"],
      ["Pages edited by somebody other than the author", "-", "-", "31"],
      ["Pages describing a problem already solved once", "-", "-", "9"]
    ]
  },
  questions: [
    {
      q: "Writing falls sharply with length of service. What is the weakest explanation of that pattern?",
      opts: [
        "Longer-serving engineers are less comfortable with this style of tool",
        "Longer-serving engineers hold the knowledge that being asked for is their standing",
        "Longer-serving engineers have less unstructured time than newer staff do",
        "Longer-serving engineers are unconvinced that writing it down will change anything"
      ],
      a: 0,
      why: [
        "Correct as the weakest. It is the first explanation people reach for, the chapter presents the generation gap as a tendency rather than a rule, and this group reads the wiki at fifty-two percent, so comfort with the tool is evidently not the barrier.",
        "This is the strongest of the four and the hardest to say aloud. Where being the person who knows something is a source of standing, writing it down is a loss, and no amount of usability work touches that.",
        "Plausible and testable. Senior engineers are typically the most interrupted people in the building, and a contribution model that assumes spare time will select against them.",
        "Also plausible, and it is the chapter's inertia argument: people do not adopt a new practice until they can see a tangible benefit from having done so."
      ]
    },
    {
      q: "Only thirty-one of two hundred and eighteen pages were edited by anybody other than their author. Why does that matter?",
      opts: [
        "It shows the pages were accurate enough that no correction was needed",
        "It shows the wiki is being used as a filing cabinet rather than as peer production",
        "It shows the version history is not being used, so the tool is misconfigured",
        "It shows most pages are outside the areas other engineers work in"
      ],
      a: 1,
      why: [
        "Nothing establishes accuracy here. Unedited could mean correct, unread by anyone who knew better, or not worth the trouble of correcting, and the exhibit cannot distinguish them.",
        "Correct. Peer production depends on incremental contributions that improve on each other, which is what makes a wiki more than a document store. Pages that nobody touches after publication are documents in a different container.",
        "History is what makes editing safe rather than what makes it happen. The tool is working; the behaviour it exists to support is not occurring.",
        "Possible for some pages and it would not explain a rate this low across an engineering group whose work overlaps heavily by design."
      ]
    },
    {
      q: "Given the retirements coming, what should the head of engineering do?",
      opts: [
        "Persist and promote it harder, since awareness is what limits contribution",
        "Close it and commission written handover documents from each retiring engineer",
        "Keep it, and make capture part of the work rather than something done afterwards",
        "Replace it with an enterprise social network, which senior staff may find easier"
      ],
      a: 2,
      why: [
        "Promotion addresses awareness, and eighty-eight percent of the newest group already read it, so awareness is not the constraint. This is the response that feels active and changes nothing.",
        "Handover documents produce a burst of material written by people leaving, with nobody left to correct it and no habit that survives them. It also abandons the readership the wiki has genuinely built.",
        "Correct. Both the sort and the walkthrough point the same way: participation follows from the work rather than from exhortation. Capture attached to closing a job, and to the nine pages that recorded a re-solved problem, gives writing a reason that outlasts the campaign.",
        "Changing the tool restarts the same experiment under the same conditions. Nothing observed here implicates the software, and the reading figures suggest the wiki is fine at being read."
      ]
    }
  ],
  debrief: "Reading is high and writing is not, which is the shape almost every internal knowledge tool takes. The exhibit points at incentives rather than at software: contribution falls exactly where knowledge is a source of standing and where interruptions are heaviest, and the thirty-one edited pages say peer production is not happening even among the people who do write. The nine pages recording an already-solved problem are the most useful line in the exhibit, because they are the only measured evidence of the benefit the wiki was built for. Fix the reason to write, attach it to work people are already doing, and measure the thing the tool exists to produce rather than the activity around it."
};

ACT.adpQuiz = {
  kind: "quiz",
  label: "Check",
  title: "Why internal deployments fail",
  how: "Three questions on the conditions that decide adoption; every option explains itself, including the ones you did not pick.",
  objective: "5.3",
  questions: [
    {
      q: "What does the chapter mean when it says the enterprise is not the web?",
      opts: [
        "Corporate networks cannot run the same software that public platforms run on",
        "Public success took years under conditions of voluntary participation a firm lacks",
        "Public platforms are consumer products, and enterprises need enterprise products",
        "Public platforms are unmoderated, whereas a firm must moderate what employees post"
      ],
      a: 1,
      why: [
        "The software runs perfectly well inside a firm, and much of it is sold for exactly that. The obstacle is not technical.",
        "Correct. The chapter's argument is about conditions: public platforms grew over many years, people join because they want to, and behind apparently seamless collaboration sit long arguments and restricted commit rights.",
        "Enterprise editions exist and buying one changes nothing about participation. The chapter's caution applies to enterprise products as much as to consumer ones.",
        "Public platforms moderate heavily, and moderation is a real difference in degree rather than the point being made about why success does not transfer."
      ]
    },
    {
      q: "A firm installs a wiki and asks staff to use it for whatever they find useful. Which caveat does that violate?",
      opts: [
        "Critical mass, since a general-purpose tool spreads participation too thinly",
        "Technological integration, since a tool with no stated purpose connects to nothing",
        "Organizational context, since the work should determine the tool rather than the reverse",
        "Culture, since staff will not contribute without an explicit instruction to do so"
      ],
      a: 2,
      why: [
        "Thin participation is a likely consequence rather than the error itself. Critical mass describes what happens next, not what was done wrong.",
        "Integration is about joining existing systems, and a tool with a clear purpose can be just as unintegrated as one without.",
        "Correct. The chapter says implementation should be driven by a specific usage context, and warns in these words against setting up a wiki and hoping employees use it for the right purpose.",
        "Culture is about whether people can share safely, not about whether they were told to. An instruction produces posts rather than contribution."
      ]
    },
    {
      q: "Why does the chapter say organization-wide rollouts need senior sponsorship in a way pilots do not?",
      opts: [
        "Because they require changes to culture, process, and often the hierarchy itself",
        "Because a firm-wide licence costs more than a departmental one and needs approval",
        "Because senior managers are the least likely group to adopt the tool voluntarily",
        "Because the security and compliance questions only arise at organizational scale"
      ],
      a: 0,
      why: [
        "Correct. The chapter says organization-wide implementations typically need changes in culture and processes and often the flattening of hierarchies, which is a magnitude of change that requires active senior involvement.",
        "Budget approval is real and routine. The chapter is describing a change too large for a department to make rather than a purchase too large for one to fund.",
        "Senior adoption is a separate observation the chapter also makes. It is a reason sponsorship is hard to obtain rather than the reason it is needed.",
        "Those questions arise as soon as sensitive material is posted, which can happen in a pilot of twenty people on its first day."
      ]
    }
  ]
};
