/* ===== s16 ===== */
PROSE.s16 = `
<span class="eyebrow">Application supplement &middot; 1&ndash;6</span>
<h2>Using AI to improve business workflows</h2>

<p class="lede">Imagine two regional chains subscribing to the same generative AI assistant on the same day. One hands it the work and stops checking; the other decides, task by task, where the system drafts and where a person still signs. Same subscription, different <b>method</b>. This supplemental section is about that method.</p>

<div class="callout info"><b>How this supplement relates to the chapter.</b> The AI material below is the chapter&rsquo;s own, but it is spread through the chapter rather than gathered into one of the four learning objectives: the chapter opens on OpenAI and ChatGPT and defines GenAI there, carries the <i>GenAI As a Companion and Not a Replacement</i> box, lists the intelligent system among the categories of organizational information systems, and sets a prompting exercise among its end-of-chapter material. What this section adds is a <b>method</b> &mdash; a repeatable way to decide where AI belongs in a piece of work. The method, not the AI itself, is the supplemental part, which is why it appears here as a labeled supplement rather than as a fifth chapter learning objective.</div>

<h3>What generative AI actually is</h3>

<p>Start with the chapter&rsquo;s definition, because most workplace arguments about AI are really arguments about what the thing is. <b>GenAI</b> is a type of artificial intelligence that learns patterns, relationships, natural language and problem-solving capabilities from existing datasets.</p>

<p>Four parts of that sentence do the work, and each explains a behavior you will meet later.</p>

<ul class="keys">
<li><b>Learned from existing datasets</b> &mdash; many existing GenAI systems were trained on freely available content from the internet, discussion boards, social media and other sources, so what a system knows was gathered outside your organization rather than from its records.</li>
<li><b>Generative</b> &mdash; the system creates new content from what it learned in response to a user prompt, which is why the same question asked two ways comes back as two different answers.</li>
<li><b>A transformer architecture</b> &mdash; the design that encodes and captures the relationships among all of the training data in order to create relevant output, and the source of the last word in ChatGPT, which stands for chatbot generative pre-trained transformer.</li>
<li><b>Tuned system by system</b> &mdash; all of these systems are good at general tasks such as summarizing text, classifying data and natural language, while Claude is considered better for software development and ChatGPT is considered a very good generalist, so picking the system is itself a business decision.</li>
</ul>

<p>The adoption numbers explain why this question arrived at work so suddenly. ChatGPT was the first commercially available GenAI system for general users, released in November 2022 by OpenAI. It gained one million users after only a month, and by January 2023 the user base had grown to 100 million. Competitors followed, among them Google&rsquo;s Gemini, Microsoft&rsquo;s Copilot and Anthropic&rsquo;s Claude.</p>

<h3>Where AI sits among the systems already covered</h3>

<p>The chapter does not treat AI as a separate universe. In its table of the system categories organizations use, AI is the <b>intelligent system</b>, whose stated purpose is to emulate or enhance human capabilities, with sample applications including an AI system for analyzing bank loan applications, self-driving cars, Siri, Alexa, ChatGPT and Gemini.</p>

<p>Reading it beside its neighbors in that table shows what is different about it.</p>

<ul class="keys">
<li><b>A transaction processing system</b> &mdash; processes day-to-day business event data at the operational level, such as a grocery store checkout register connected to a network, so it records events without judging them.</li>
<li><b>A management information system</b> &mdash; produces detailed information to help manage a firm or part of a firm, such as an inventory management and planning system, so it reports on events already captured.</li>
<li><b>A decision support system</b> &mdash; provides analysis tools and access to databases to support quantitative decision making, such as demand forecasting, so a person still decides.</li>
<li><b>An intelligent system</b> &mdash; emulates or enhances human capabilities, a larger claim than the other three make, because it takes on part of the judgment rather than only supplying the numbers underneath.</li>
</ul>

<p class="takeaway">An intelligent system does not replace the systems around it &mdash; it works on data those systems captured, so analyzing a bank loan application still depends on that application having been recorded somewhere first.</p>

<div class="activity" data-activity="aiQuiz1"></div>

<h3>Companion, not replacement</h3>

<p>The chapter states the governing principle plainly: many organizations, educators and those in industry believe that GenAI should serve as a <b>knowledge companion and not a knowledge replacement</b>.</p>

<p>The argument behind it is about credibility rather than effort. If you ask the system to do the work for you, then you have made yourself irrelevant &mdash; it might create an output, but you would have no credible way of knowing whether that output is correct or even reasonable. If you ask for assistance and you retain control of the decision, you have made yourself more valuable. In one line: the system should augment the human, not replace the human.</p>

<p>Nothing in the subscription decides which of those two outcomes an organization gets, which is why this is a design question rather than a purchase: the workflow built around the subscription decides it.</p>

<h3>A method for deciding where AI belongs in a workflow</h3>

<p>Applying that principle needs a sequence you can repeat on any piece of work, because &ldquo;use AI&rdquo; is not a decision and &ldquo;ban AI&rdquo; is not one either. Four steps, in this order.</p>

<ol class="steps">
<li><b>Name the task and where it sits</b> &mdash; one specific task, not a department, and the value chain activity it belongs to, because a proposal that opens with the technology has skipped the diagnosis.</li>
<li><b>Choose the mode</b> &mdash; augment, automate, or leave it alone &mdash; and say which one out loud, because the three lead to different designs, different costs and different ways of going wrong.</li>
<li><b>Place the human decision point</b> wherever being wrong is expensive, since the cost of an error, not the difficulty of the task, decides whether a person has to sign.</li>
<li><b>Commit to a measure and a date</b>, naming the number that should move and when you will look at it, which is the same discipline the previous supplement asked of any IT recommendation.</li>
</ol>

<p>The second step is the one people skip, so the three modes are worth separating carefully.</p>

<ul class="keys">
<li><b>Augment</b> &mdash; the system drafts, ranks or summarizes and a person decides, which suits work where a starting point saves real time but the judgment still matters, such as a difficult supplier email.</li>
<li><b>Automate</b> &mdash; the system acts on its own inside limits you defined in advance, which suits high-volume, low-stakes, reversible work, such as sorting arriving messages by topic.</li>
<li><b>Leave it alone</b> &mdash; the task stays entirely human because the stakes or the sensitivity are too high, such as a decision about one named employee, or anything requiring information you will not send outside the company.</li>
</ul>

<div class="activity" data-activity="aiMethod"></div>

<p>Most workplace disagreements about AI are really disagreements about which mode a task belongs in.</p>

<div class="activity" data-activity="aiMode"></div>

<h3>Output quality follows input quality</h3>

<p>The chapter&rsquo;s prompting exercise puts this as the old data adage: <b>garbage in, garbage out</b> holds for GenAI as well, and it holds twice over. The quality of the responses depends on the quality of the training data, which you do not control. Beyond that, no matter how high the quality of the training data, these tools are unlikely to give you the best response unless you craft a good prompt, which you do control.</p>

<p>The chapter&rsquo;s own pair of prompts shows what a better prompt changes. The weak one is &ldquo;Write an email to a customer.&rdquo; The strong one is &ldquo;Write a short, polite email to a customer who received the wrong item, offering a replacement and a discount.&rdquo;</p>

<p>Three things moved between the two, and the chapter names all three.</p>

<ul class="split">
<li><b>Specificity about the task</b> &mdash; the wrong item, and what is being offered to fix it.</li>
<li><b>Tone and format</b> &mdash; short, and polite, rather than left to chance.</li>
<li><b>Audience</b> &mdash; a customer who has already been let down once.</li>
</ul>

<p class="takeaway">Investing the time to carefully craft a prompt might be worth the effort, which is why the prompt for a recurring business task is written once, reviewed, and reused rather than retyped from memory.</p>

<h3>What goes wrong</h3>

<p>Four failures account for most of the damage, and each has a matching control that belongs inside the workflow rather than in a policy document nobody opens.</p>

<div class="activity" data-activity="aiRisks"></div>

<p>The third deserves a note, because it connects this section to ground already covered. Handing a customer list, an employee record or an unreleased contract to an outside system is not only an AI question &mdash; it is an information privacy question of exactly the kind Objective 1.4 raises about what a person must reveal and who may then reach it.</p>

<div class="callout warn"><b>Accountability does not transfer.</b> A person still owns the decision, so &ldquo;the system suggested it&rdquo; is not an explanation a customer, a regulator or a manager can accept. The reasoning is the chapter&rsquo;s own: if you have no credible way of knowing whether an output is correct or even reasonable, you cannot defend whatever decision you built on top of it.</div>

<h3>The method applied to a hypothetical practice situation</h3>

<p>Return to the practice grocer from the previous supplement, a hypothetical regional chain of grocery and household-goods stores facing a members-only warehouse club that has entered some of its local markets. Four further conditions exist only for this practice situation.</p>

<ul>
<li>Customer service answers a few hundred emailed complaints a week, and each reply takes about a quarter of an hour because every one starts from a blank screen.</li>
<li>Most of those complaints fall into four familiar categories, so the same few paragraphs get rewritten from scratch every day by different people.</li>
<li>A small number report a food-safety concern or an injury, and those have to reach a store manager the same day they arrive.</li>
<li>Nobody has written down what a good reply looks like, so quality depends on which agent happened to open the message.</li>
</ul>

<p>Now run the four steps against it, in order.</p>

<ol class="steps">
<li><b>The task</b> is drafting the first version of a routine complaint reply, which sits in the value chain&rsquo;s service activity, and it is deliberately not &ldquo;improve customer service.&rdquo;</li>
<li><b>The mode is augment</b>, because editing a draft is far faster than facing a blank screen, while a wrong promise about a refund still costs a customer relationship.</li>
<li><b>The human decision point</b> sits immediately before sending, and a routing rule moves anything mentioning illness or injury to a manager untouched, because that is where being wrong is most expensive.</li>
<li><b>The measure</b> is average time to first reply, paired with the share of drafts rewritten completely, both read on a date fixed in advance rather than whenever the numbers look flattering.</li>
</ol>

<div class="activity" data-activity="aiWorkflow"></div>

<h3>From knowledge workers to learning workers</h3>

<p>The chapter ends its discussion of knowledge workers on a forward-looking claim rather than a warning. Many leaders believe that any efficiencies gained will actually allow knowledge workers to become more creative with their time, leading to better outcomes, and the lines between knowledge workers and manual workers are blurring because almost every organization now uses information technologies or systems to support nearly every part of its business.</p>

<p>Where that leaves an individual is the chapter&rsquo;s own conclusion: while almost every worker can now be considered a knowledge worker, workers of the future need to become <b>learning workers</b>, because not the knowledge itself but the knowledge of how to learn will be of primary importance.</p>

<p>The demand side agrees. AI and machine learning sit among the hot skills the chapter tabulates for the next decade, and it reports, citing the Bureau of Labor Statistics, an increased need for IS managers as organizations embrace cloud computing, cybersecurity and artificial intelligence.</p>

<div class="activity" data-activity="aiQuiz2"></div>
`;

ACT.aiMethod = {
  kind: "diagram",
  label: "Interactive diagram",
  title: "The four steps, one at a time",
  how: "Pick a step to redraw it: what the step produces, how to tell you have done it properly, and the mistake that step exists to prevent.",
  objective: "1.6",
  models: [
    {
      id: "task",
      name: "Name the task",
      site: "Step one - one specific piece of work, placed in one value chain activity",
      boxes: [
        {c: "a", t: "Too broad to act on", w: "Use AI in customer service"},
        {c: "b", t: "The actual task", w: "Draft the first reply to a routine complaint"},
        {c: "c", t: "Where it sits", w: "Service - after the sale, keeping the customer whole"},
        {c: "d", t: "What this buys you", w: "Something narrow enough to measure"}
      ],
      points: [
        "<b>What the step produces</b> - a single task written as a verb and an object, plus the value chain activity it belongs to. Drafting a complaint reply is a task; improving customer service is a wish.",
        "<b>How to tell you did it properly</b> - you can say who does the task today, how often it happens, and how long one instance takes. If you cannot, you have named a department rather than a task.",
        "<b>The mistake it prevents</b> - buying a tool and then hunting for somewhere to put it. A proposal that opens with the technology has skipped the diagnosis, which is the same failure the previous supplement warned about for any IT recommendation.",
        "<b>Why the activity matters</b> - naming it keeps the project in the right department and tells you whose numbers should move. A drafting aid in service will not show up in procurement's results no matter how well it works."
      ]
    },
    {
      id: "mode",
      name: "Choose the mode",
      site: "Step two - augment, automate, or leave it alone",
      boxes: [
        {c: "a", t: "Augment", w: "System drafts or ranks, a person decides"},
        {c: "b", t: "Automate", w: "System acts inside limits set in advance"},
        {c: "c", t: "Leave it alone", w: "Stakes or sensitivity too high to hand over"},
        {c: "d", t: "The deciding question", w: "What does one wrong answer cost?"}
      ],
      points: [
        "<b>What the step produces</b> - one word, chosen deliberately and written down, because augment, automate and leave it alone produce three completely different designs from the same subscription.",
        "<b>Augment</b> fits work where a strong starting point saves real time but the judgment still matters. This is the chapter's principle in operational form: the system augments the human rather than replacing the human.",
        "<b>Automate</b> fits work that is high in volume, low in stakes, and reversible, such as sorting arriving messages by topic. The limits have to be written before launch, because an automated task nobody bounded will eventually meet a case its designer never imagined.",
        "<b>Leave it alone</b> is a real answer, not a failure of nerve. A decision about one named employee, or anything that would require sending information out of the company that should not leave it, stays with a person."
      ]
    },
    {
      id: "checkpoint",
      name: "Place the human decision point",
      site: "Step three - where a person signs before anything becomes real",
      boxes: [
        {c: "a", t: "Cheap to be wrong", w: "Reversible, small, easily corrected"},
        {c: "b", t: "Expensive to be wrong", w: "Money, safety, reputation, a person's record"},
        {c: "c", t: "The checkpoint", w: "Sits just before the irreversible act"},
        {c: "d", t: "What the reviewer needs", w: "Time to look, and a reason to bother"}
      ],
      points: [
        "<b>What the step produces</b> - a named place in the workflow where a person reviews and approves, and a named person who does it. A checkpoint with no owner is a diagram, not a control.",
        "<b>How to place it</b> - sort the possible errors by what they cost rather than by how likely they are. Difficulty is not the test; a simple task with an expensive failure still needs a signature.",
        "<b>Make the review real</b> - give the reviewer enough time and enough information to disagree. A person clicking approve on forty drafts an hour is not a control, and everyone in the process knows it.",
        "<b>The mistake it prevents</b> - the drift the chapter describes, where people ask the system to do everything for them. Keeping the decision is exactly what keeps the person more valuable than the tool."
      ]
    },
    {
      id: "measure",
      name: "Set the measure and the date",
      site: "Step four - the number that should move, and when you will look",
      boxes: [
        {c: "a", t: "The number", w: "Average time to first reply"},
        {c: "b", t: "The counter-number", w: "Drafts rewritten from scratch"},
        {c: "c", t: "The date", w: "Fixed before launch, not after"},
        {c: "d", t: "The decision waiting", w: "Keep it, change it, or stop it"}
      ],
      points: [
        "<b>What the step produces</b> - one sentence naming a number and a date, so the initiative can be judged rather than merely defended. This is the same commitment the previous supplement required of any recommendation put to a board.",
        "<b>Always pair the numbers</b> - a speed measure alone rewards fast bad work. Pairing time to first reply with the share of drafts rewritten from scratch stops anyone from claiming a win that customers would not recognize.",
        "<b>Fix the date in advance</b> - a review date chosen after results arrive is not a review, because whoever proposed the initiative gets to pick the week that flatters it.",
        "<b>Name the possible outcomes now</b> - keep, change, or stop, with the third one genuinely available. An initiative that cannot be stopped was never really being tested."
      ]
    }
  ]
};

ACT.aiQuiz1 = {
  kind: "quiz",
  label: "Check yourself",
  title: "What the technology is, and where it fits",
  how: "Three questions on the chapter's own account of GenAI and on where it sits among the systems organizations already run.",
  objective: "1.6",
  questions: [
    {
      q: "In the term generative AI, what does the word generative refer to?",
      opts: [
        "The system creates new content from what it learned in its training data, in response to a user prompt",
        "The system generates its own training data rather than depending on datasets collected by people",
        "The system generates a profit for the organization that deploys it, which is why it is worth buying",
        "The system generates its answer by retrieving the closest ready-made response stored during training"
      ],
      a: 0,
      why: [
        "Correct. The generative aspect is the ability to create new content based on what the system learned from its training data in response to a prompt, rather than retrieving a stored answer.",
        "This inverts where the data comes from. Many of these systems were trained on freely available content from the internet, discussion boards, social media and other sources - material people created, not material the system produced for itself.",
        "Return on investment is a reason an organization might buy a system, and it is a genuine test any system has to pass, but it is not what the word generative describes. The word names how the output is produced.",
        "Retrieval is the opposite of what the word names. The chapter describes a system creating new content from what it learned in response to a prompt, rather than selecting a stored answer that was written out in advance."
      ]
    },
    {
      q: "In the chapter's table of the categories of information systems used in organizations, which category do ChatGPT, Gemini, Siri and self-driving cars appear under?",
      opts: [
        "Transaction processing system, because these systems handle enormous volumes of day-to-day events",
        "Decision support system, because they provide analysis tools that support quantitative decision making",
        "Intelligent system, whose stated purpose is to emulate or enhance human capabilities",
        "Business intelligence system, because they analyze Big Data to understand aspects of a business"
      ],
      a: 2,
      why: [
        "A transaction processing system handles day-to-day business event data at the operational level, the grocery checkout register being the chapter's example. Volume is not the test; recording business events as they happen is.",
        "A decision support system supplies analysis tools and access to databases for quantitative decision making, such as demand forecasting. That is close, and the difference matters: it hands a person numbers rather than emulating the judgment itself.",
        "Correct. The chapter lists the intelligent system as the category that emulates or enhances human capabilities, with an AI system for analyzing bank loan applications, self-driving cars, Siri, Alexa, ChatGPT and Gemini as its sample applications.",
        "A business intelligence system analyzes Big Data to better understand aspects of a business, with analytical processing and data visualization as its examples. It reports on the business, whereas an intelligent system stands in for a human capability."
      ]
    },
    {
      q: "A manager says a routine report is now written entirely by the assistant, with nobody reading it before it circulates. On the chapter's reasoning, what is the specific problem?",
      opts: [
        "Circulating the report costs the organization more than it saves, so the return on investment is negative",
        "Nobody can say whether the output is correct or even reasonable, so the manager has made the role irrelevant",
        "The assistant works faster than the manager, which means the role is genuinely no longer needed at all",
        "The report should have been produced by a management information system, which is the category built for reporting"
      ],
      a: 1,
      why: [
        "Cost is a fair question to ask about any system, and it is not the chapter's objection here. The objection stands even if the arrangement is cheap, because the problem is that nobody can vouch for what goes out.",
        "Correct. Asking the system to do the work for you leaves no credible way of knowing whether the output is correct or even reasonable, which is the chapter's reason for calling the arrangement a knowledge replacement.",
        "Speed is the reason people reach for these tools, so it is not the flaw. The chapter's argument is that retaining control of the decision is what makes a person more valuable, not what makes them slower.",
        "Naming the right system category does not rescue an unreviewed output, and a reporting system would face the same objection. The failure here is the missing human decision point, not the choice of software."
      ]
    }
  ]
};

ACT.aiMode = {
  kind: "sort",
  label: "Sort",
  title: "Augment, automate, or keep it human?",
  how: "Place each task from the hypothetical practice grocer in the mode it belongs to, judging by what one wrong answer would cost.",
  objective: "1.6",
  buckets: [
    {id: "augment", name: "Augment", hint: "the system drafts, ranks or summarizes and a person decides before anything is acted on"},
    {id: "automate", name: "Automate", hint: "the system acts on its own inside limits set in advance - high volume, low stakes, reversible"},
    {id: "human", name: "Keep human-only", hint: "the stakes or the sensitivity are too high, so the task stays entirely with a person"}
  ],
  items: [
    {t: "Writing the first version of a reply to a routine emailed complaint, which an agent edits before sending", b: "augment", why: "A blank screen is the expensive part and a wrong promise is the expensive risk, so the system supplies the start and the agent keeps the send."},
    {t: "Condensing a long supplier contract into a one-page brief a buyer reads before negotiating", b: "augment", why: "The summary saves hours of reading, but a missed clause changes what the buyer agrees to, so a person reads the passages that matter before the meeting."},
    {t: "Turning a week of register data into a plain-language summary a store manager then interprets", b: "augment", why: "Describing what moved is drafting work; deciding what to do about it is judgment, and the manager keeps that half of the task."},
    {t: "Suggesting three headline options for the weekly circular, from which the marketing lead picks one", b: "augment", why: "Options are cheap and choosing is the decision, so producing candidates for a named person to choose among is the textbook shape of augmentation."},
    {t: "Sorting arriving customer messages into topic folders so the right team opens them first", b: "automate", why: "It is high volume, low stakes and reversible - a message filed under the wrong topic is refiled in seconds, which is exactly when acting without a reviewer is worth it."},
    {t: "Sending an acknowledgement that a message arrived, with a reference number and an expected reply time", b: "automate", why: "The content is fixed and factual, nothing is being promised about the outcome, and the cost of sending one to a duplicate message is close to nothing."},
    {t: "Renaming and filing arriving supplier invoices by vendor and date into a shared folder", b: "automate", why: "This is repetitive clerical work with an obvious right answer and an easy correction, so a defined rule can run it without anyone reviewing each file."},
    {t: "Deciding which of two employees is promoted when their managers disagree", b: "human", why: "The stakes for the person are high, the decision is hard to reverse, and it rests on judgment about people that a manager has to be able to explain and own."},
    {t: "Writing the letter that tells a long-standing produce supplier the chain is ending the relationship", b: "human", why: "It is a consequential business decision in a relationship built over years, and the person accountable for ending it should be the person who words it."},
    {t: "Reviewing employees' medical leave notes to propose next week's staffing", b: "human", why: "The information is sensitive enough that sending it to an outside system is itself the harm, which makes this an information privacy question before it is an efficiency question."}
  ]
};

ACT.aiRisks = {
  kind: "explore",
  label: "Explore",
  title: "Four ways this goes wrong",
  how: "Open each failure and read all four facets before moving on - the workplace illustrations belong to the hypothetical practice grocer, and the control matters as much as the risk.",
  objective: "1.6",
  labels: ["What the failure is", "What it looks like at work", "What it costs when nobody checks", "The control that belongs in the workflow"],
  items: [
    {
      icon: "HALL",
      name: "Hallucination",
      sub: "Fluent, confident, and wrong",
      what: "GenAI can make mistakes called hallucinations. The chapter's example is asking a system about the only survivor of the sinking of the Titanic: early models would gladly describe that survivor, which is a hallucination, because there were more than 700 survivors.",
      real: "A drafted reply cites a return window the chain does not offer, or a contract summary describes a delivery term that appears nowhere in the contract. Nothing in the writing signals which sentences were invented, because the invented ones read exactly like the rest.",
      absent: "The wrong return window reaches a few hundred customers, and honoring it costs money the chain never agreed to spend. Worse, staff begin treating every output as checked, because it has been right often enough to earn trust it did not earn.",
      why: "Someone who already knows the answer verifies the checkable parts - prices, dates, policies, names - before anything leaves the building. The working rule is the chapter's: if you have no way to judge whether an output is reasonable, you are not in a position to use it."
    },
    {
      icon: "BIAS",
      name: "Inherited bias",
      sub: "The training data shows through",
      what: "GenAI output can be biased if the datasets used to train the model are biased. The chapter is careful here: that does not mean a human would not be biased as well, but quality system outputs rely on quality system inputs, and the inputs came from outside your organization.",
      real: "Draft job descriptions consistently favor one kind of background, or suggested replies are noticeably warmer to some customers than others, because the patterns in the training material carried through into the output.",
      absent: "A slanted pattern gets applied at machine scale and with an appearance of neutrality, which makes it harder to spot and harder to argue with than one manager's slanted judgment would have been.",
      why: "Review outputs in batches rather than one at a time, because a pattern is invisible in a single sample and obvious across fifty. Keep the tasks where bias is most damaging, such as hiring and discipline, in the human-only mode."
    },
    {
      icon: "DATA",
      name: "Sensitive data leaving",
      sub: "An outside system is still outside",
      what: "Most of these systems are services run by another company. Pasting a customer list, an employee record, or an unreleased contract into a prompt hands that information to an outside party, which is an information privacy question of exactly the kind Objective 1.4 raises.",
      real: "An agent pastes an entire complaint thread, including the customer's address and card details, so the draft reply will have the full context. Nothing about the interface suggests that anything unusual just happened.",
      absent: "Information a customer revealed for one purpose is now held somewhere they never agreed to, which is the accessibility and property side of the same privacy problem, and no efficiency gain compensates for it.",
      why: "Write down what may go into a prompt and what must be removed first, then design the workflow so the redacted version is the easy path. A rule that depends on each person remembering it under time pressure is not a control."
    },
    {
      icon: "ACCT",
      name: "Accountability",
      sub: "The decision is still yours",
      what: "Responsibility does not move to the vendor when the draft comes from a system. Whoever sends, approves, or acts on an output owns the consequence, and owes an explanation of it to a customer, a colleague, or a regulator.",
      real: "A refund is issued on terms nobody at the chain authorized, and when the finance manager asks who approved it, the answer offered is that the system suggested it and it looked right at the time.",
      absent: "The organization cannot say who decided, so it cannot correct the process that produced the decision. Errors repeat because there is nobody whose job it was to catch them.",
      why: "Every automated or augmented step names an accountable person, and that name is recorded with the output. This is what makes keeping the decision valuable rather than merely cautious - the person who can explain the decision is the person worth employing."
    }
  ]
};

ACT.aiWorkflow = {
  kind: "sim",
  label: "Decide",
  title: "Redesigning one workflow at the practice grocer",
  how: "Work the four decisions in this hypothetical situation; after each one, compare every outcome before continuing.",
  objective: "1.6",
  intro: "This is a hypothetical practice case. The regional grocer's customer service team answers a few hundred emailed complaints a week, each reply starts from a blank screen, most messages fall into four familiar categories, and a small number report a food-safety concern or an injury. Leadership has bought a GenAI subscription and wants to know what to do with it. You are the analyst in the room.",
  steps: [
    {
      situation: "First decision: what exactly is the task? Everyone in the room has a different sentence for it, and the sentence you choose determines everything downstream.",
      opts: [
        {t: "Roll the assistant out to the whole customer service team and let each agent find their own uses for it", ok: false, out: "This names no task, so there is nothing to design and nothing to measure. Ten agents will invent ten different practices, the sensitive messages will be handled inconsistently, and in six months nobody will be able to say whether it helped."},
        {t: "Drafting the first version of a reply to a routine complaint, a task in the service activity of the value chain", ok: true, out: "Right. It is one task, stated as a verb and an object, placed in a value chain activity. You can already say who does it, how often it happens, and how long one instance takes, which is exactly what the later steps need."},
        {t: "Improving customer satisfaction, since that is the outcome leadership actually cares about", ok: false, out: "That is the outcome you hope for, not the task you would change. Nothing about it tells you what a person would stop doing, so it cannot be assigned a mode, a checkpoint, or an honest measure."}
      ]
    },
    {
      situation: "Second decision: the mode. Drafting a reply is repetitive, the four familiar categories cover most messages, and a wrong promise about a refund or a return costs a customer relationship.",
      opts: [
        {t: "Automate it - the system writes the reply and sends it, since the categories are familiar and the volume is high", ok: false, out: "Volume and familiarity argue for speed, and the cost of an error argues louder. An unreviewed reply can promise a refund the chain never offered, and the customer has already read it before anyone at the chain has. This is the arrangement the chapter calls a knowledge replacement."},
        {t: "Augment it - the system drafts, the agent edits and sends", ok: true, out: "Correct, and for the stated reason: the drafting is the slow part and the promise is the risky part, so the system takes the first and the agent keeps the second. This is the chapter's principle made operational - the system augments the human rather than replacing the human."},
        {t: "Leave it alone - complaint replies touch customers, so no system should be near them", ok: false, out: "Leave it alone is a legitimate mode, and it is the wrong one here. It is reserved for stakes or sensitivity high enough that no review makes the risk acceptable. A routine complaint reply that a person reads before sending does not meet that bar, and refusing the help costs the team real hours for no reduction in risk."}
      ]
    },
    {
      situation: "Third decision: the human decision point. Most messages are routine, but a small number report a food-safety concern or an injury, and those have to reach a store manager the same day.",
      opts: [
        {t: "One rule for everything: an agent reads and approves every draft before it is sent", ok: false, out: "The universal review is the right instinct and an incomplete design. It treats a spoiled-product report exactly like a late-delivery complaint, so the message that needed a manager today sits in the same queue as everything else and is answered politely rather than escalated."},
        {t: "Approve in batches at the end of each day, so agents can review many drafts quickly", ok: false, out: "This turns the checkpoint into a formality. A reviewer moving through forty drafts to finish the day is not really deciding, and the urgent messages have now waited a full day on top of it - the review exists on the diagram but not in practice."},
        {t: "An agent approves every draft before sending, and a routing rule sends anything mentioning illness or injury to a store manager undrafted", ok: true, out: "Right on both counts. The checkpoint sits immediately before the irreversible act, and the cases where being wrong is most expensive are pulled out of the automated path entirely rather than being handled a little more carefully inside it."}
      ]
    },
    {
      situation: "Fourth decision: leadership asks how the chain will know whether this worked, and by when.",
      opts: [
        {t: "Ask the agents in a few months whether the assistant has made their work easier", ok: false, out: "Their experience is worth hearing and it is not a measure. It arrives at a date nobody set, it says nothing about what customers received, and a team that knows leadership funded the tool is being asked to judge the decision its managers already made."},
        {t: "Track average time to first reply, and the share of drafts agents rewrote from scratch, both read at a review date fixed now", ok: true, out: "That is the full shape. One number should improve, the second guards against the first improving for the wrong reason, and the date is set before anyone has seen results. The honest possible outcomes - keep it, change it, stop it - are all still available at that review."},
        {t: "Count how many drafts the system produced each week, which shows how much work it is doing", ok: false, out: "This measures activity rather than results. Output volume rises simply because the tool is switched on, and it would keep rising even if every draft were rewritten from scratch and every customer were annoyed by the reply that arrived."}
      ]
    }
  ]
};

ACT.aiQuiz2 = {
  kind: "quiz",
  label: "Check yourself",
  title: "Method, prompts, and failures",
  how: "Three questions on deciding the mode, writing the prompt, and owning what the system produces.",
  objective: "1.6",
  questions: [
    {
      q: "The practice grocer wants the system to file arriving supplier invoices by vendor and date into a shared folder, with no person reviewing each one. Which mode is that, and is it defensible?",
      opts: [
        "Augment, and defensible, because a person will eventually open the folder and notice anything filed wrongly",
        "Automate, and defensible, because the work is high in volume, low in stakes, and a misfiled invoice is corrected in seconds",
        "Automate, and indefensible, because a task without a human checkpoint has replaced the human rather than augmenting them",
        "Keep human-only, and defensible, because invoices are financial records and financial records need a signature"
      ],
      a: 1,
      why: [
        "Augment means a person decides on each item before it is acted on, and nobody is deciding here. A later chance to notice a mistake is not the same as a review standing between the system and the action.",
        "Correct. Automate is the right mode exactly when volume is high, stakes are low, and errors are cheap to reverse, and filing a document by vendor and date meets all three of those conditions.",
        "This applies the companion principle too widely. The chapter's concern is with handing over decisions you cannot vouch for, not with clerical steps whose only possible error is an easily corrected filing mistake.",
        "Financial records do need controls, and the payment decision is where the signature belongs. Naming the file is not the payment decision, so treating the two the same wastes the reviewer's attention on the harmless half."
      ]
    },
    {
      q: "The chapter contrasts a weak prompt - Write an email to a customer - with a stronger one - Write a short, polite email to a customer who received the wrong item, offering a replacement and a discount. What changed between them?",
      opts: [
        "The prompt became longer, and longer prompts reliably produce better output than shorter ones",
        "The prompt named the system it was written for, so the request was matched to that system's strengths",
        "The prompt became more specific about the task, clearer about tone and format, and better informed about the audience",
        "The prompt corrected the training data, which is the underlying cause of a weak response"
      ],
      a: 2,
      why: [
        "Length happens to increase here, and it is a side effect rather than the cause. Padding a vague request with more words leaves it just as vague, which is why the exercise names specific improvements instead of a word count.",
        "Choosing a suitable system is a real decision, since these systems are tuned differently, but naming a product inside the prompt is not one of the improvements the exercise describes. Nothing in the strong prompt mentions any product.",
        "Correct. Those are the three improvements the exercise names, and you can see each one in the strong prompt: the wrong item and the offer, short and polite, and a customer who has already been let down.",
        "A prompt cannot reach the training data, which is the half of garbage in, garbage out that you do not control. That is precisely why the exercise concentrates on the half you do control."
      ]
    },
    {
      q: "An agent sends a drafted reply that promises a refund on terms the chain does not offer. Asked about it, the agent says the system produced the wording and it looked reasonable. What does the chapter's reasoning say about this?",
      opts: [
        "The vendor is answerable for the error, because the vendor's system produced the incorrect wording",
        "The agent still owns the decision, because sending an output you cannot vouch for is the choice that caused the harm",
        "The error proves the task was in the wrong mode, so the reply should have been sent without any review",
        "The error is unavoidable, because these systems make mistakes called hallucinations and no workflow can reduce them"
      ],
      a: 1,
      why: [
        "Buying a service does not transfer responsibility for how you use it, and the customer received the promise from the chain rather than from the vendor. The chain has to honor or explain what it sent.",
        "Correct. The person who sends an output owns the decision built on it, which is the chapter's reason for saying that retaining control of decision making is what makes a person more valuable.",
        "Removing the review would make this failure more frequent rather than less, since nothing would stand between an invented refund term and the customer. The mode was right; the checkpoint was not treated seriously.",
        "Hallucinations are real and a workflow can absolutely limit their reach, which is the whole point of verifying checkable claims such as prices, dates and policies before anything is sent."
      ]
    }
  ]
};
