/* ===== s51a ===== */
PROSE.s51a = `
<span class="eyebrow">Section 5&ndash;1a</span>
<h2>Why collaboration became a strategic problem</h2>
<p class="lede">Nobody needs a textbook to tell them that people at work talk to each other. What is worth a chapter is why that talking became a competitive matter: the right people for a problem are almost never in the same building, and assembling them anyway is now something a firm either does well or loses money on.</p>

<h3>The problem is assembling, not talking</h3>
<p>To stay competitive an organization has to bring together the right combination of people &mdash; the knowledge, the skills, the information and the authority to actually decide &mdash; quickly and repeatedly.</p>
<p>The traditional answer was the <b>task force</b>: a temporary work group with a finite task and a life cycle, pulled together to solve something the existing departments could not. Task forces still exist, and they are slow. Structure and logistics get in the way of people trying to get anything done.</p>
<p>So organizations increasingly build <b>virtual teams</b> instead: members drawn from different geographic areas, assembled as needed for a particular project. Membership is fluid. Teams form and disband, size moves up and down, and one person may sit on several at once.</p>
<p>Two examples from the chapter show how ordinary this has become, and neither of them is a technology company doing something clever.</p>
<ul class="keys">
<li><b>Software development</b> routinely puts the programmers in one country, the project managers in another and the testers in a third, working on one release.</li>
<li><b>Health care</b> assembles dieticians, physicians, surgeons, pharmacists and social workers from different cities to coordinate the care of a single patient.</li>
<li><b>What both share</b> is that the specialist a problem needs is no longer limited to whoever happens to practise or program nearby.</li>
</ul>

<h3>The tools come in three families</h3>
<p>The chapter groups collaboration tools into three categories, and the grouping is more useful than it looks, because each family answers a different question about a team.</p>
<ul class="keys">
<li><b>Electronic communication tools</b> carry verbal and written information and move files between people &mdash; instant messaging, email, voice mail, blogs, wikis and ordinary websites.</li>
<li><b>Electronic conferencing tools</b> support richer interaction than a message can carry, such as screen sharing and videoconferencing, where the point is watching something together.</li>
<li><b>Collaboration management tools</b> run the group itself rather than the conversation: electronic calendars, knowledge management systems, intranets and shared online document systems.</li>
</ul>
<p>Sort nine everyday tools into those three families, and notice how often the family you would have guessed is the wrong one.</p>

<div class="activity" data-activity="colSort"></div>

<h3>Same time, or not; same place, or not</h3>
<p>The distinction that actually decides which tool to reach for is not the family. It is time. <b>Synchronous</b> communication is coordinated in time &mdash; a call, a live chat, a videoconference &mdash; and <b>asynchronous</b> communication is not, which covers email, texting and a discussion board.</p>
<p>Meetings of virtual teams take the form of <b>virtual meetings</b> and can run either way. When time matters, because a deadline is close or a customer is angry, synchronous media are usually better: every hour of delay is process inefficiency or a dissatisfied customer, and both are expensive.</p>
<p>Cross time with place and you get the four modes collaboration software is built to serve. Step through them and read what each one costs and buys.</p>

<div class="activity" data-activity="colDiagram"></div>

<p>Collaboration software grew out of <b>groupware</b>, the class of software that lets people work together more effectively, and the first mainstream product of that kind appeared in 1989.</p>
<p>What has changed since is the price rather than the idea. Most of these capabilities are now free to anyone with a connected device, so the interesting question moved from whether a firm can afford them to whether it can get anybody to use them.</p>

<h3>The cost of getting the mode wrong</h3>
<p>Choosing synchronous when asynchronous would do wastes people. Choosing asynchronous when a decision is urgent wastes days. The case below puts numbers on both, for a hypothetical firm.</p>

<div class="activity" data-activity="colCase"></div>

<h3>Videoconferencing, from a theme park to a laptop</h3>
<p>Video calling was demonstrated to theme-park audiences in the 1960s and then took about thirty years to matter. What changed was the shopping list.</p>
<ul class="keys">
<li><b>Desktop videoconferencing</b> needs four things: a <b>webcam</b>, a microphone and speakers, the software, and a connection fast enough to carry it.</li>
<li><b>Most laptops arrive with three of the four</b>, and the software is generally free, so the marginal cost of one more meeting is close to nothing.</li>
<li><b>Dedicated room systems still exist</b>, and the chapter prices high-end installations in the hundreds of thousands of dollars, which is a capital purchase rather than a download.</li>
</ul>
<p>That gap is this chapter in one line. A capability that used to require a budget request now requires only a decision.</p>
<p class="takeaway">Collaboration became strategic when it stopped being expensive. Once anybody can assemble the right people from anywhere, the firms that still cannot are losing to the ones that can, and losing on speed rather than on cost.</p>
<p>Three questions on the vocabulary and the judgement before you move on.</p>

<div class="activity" data-activity="colQuiz"></div>
`;

ACT.colSort = {
  kind: "sort",
  label: "Sort",
  title: "Which family does each tool belong to?",
  how: "Put each tool into the category the chapter places it in; the reason appears as soon as you drop it, whether you were right or not.",
  objective: "5.1",
  buckets: [
    {id: "comm", name: "Electronic communication tools", hint: "Carry verbal and written information, and move files and content between people."},
    {id: "conf", name: "Electronic conferencing tools", hint: "Support information sharing and rich interaction, where the point is doing something together in the moment."},
    {id: "mgmt", name: "Collaboration management tools", hint: "Facilitate meetings and manage the group's activity rather than carrying the conversation itself."}
  ],
  items: [
    {t: "Email", b: "comm", why: "The chapter's first example of a communication tool: it conveys written information and carries attachments, and it does nothing to manage the group sending them."},
    {t: "Voice mail", b: "comm", why: "A recorded verbal message waiting for its recipient. It is the oldest asynchronous tool most workplaces still run, and it belongs with the other message carriers."},
    {t: "A public wiki page", b: "comm", why: "The chapter lists wikis with blogs and static websites as communication tools, because their job is conveying content. That they are jointly written is a fact about how the content arrives, not about what the tool is for."},
    {t: "Screen sharing", b: "conf", why: "Nothing is conveyed that could have been written down instead. The value is that two people are looking at the same thing at the same moment and can point at it."},
    {t: "Videoconferencing", b: "conf", why: "The richest interaction in the chapter's list: tone, expression and the ability to interrupt, none of which survives a written message."},
    {t: "A live customer chat window", b: "conf", why: "Instant messaging appears in both of the first two families, and a live chat with an agent sits on the conferencing side because it is a real-time exchange rather than a message left to be collected."},
    {t: "A shared electronic calendar", b: "mgmt", why: "It carries no content at all. Its whole function is arranging when the group can be in the same place, which is managing the collaboration rather than conducting it."},
    {t: "A knowledge management system", b: "mgmt", why: "It organises what the organization already knows so somebody can find it later. That is group activity management, and the chapter files it here rather than with the message carriers."},
    {t: "A shared online document system", b: "mgmt", why: "One authoritative copy that several people can work on is a way of managing an activity. The chapter groups these with intranets and calendars for exactly that reason."}
  ]
};

ACT.colDiagram = {
  kind: "diagram",
  label: "Compare",
  title: "Four modes of group interaction",
  how: "Step through the four combinations of time and place; each one is a real arrangement with its own tools, its own costs and its own failure mode.",
  objective: "5.1",
  models: [
    {
      id: "sts",
      name: "Same time, same place",
      site: "Everyone is in one room, and the technology is in the room with them.",
      boxes: [
        {c: "a", t: "Everyone free at once", w: "And able to reach one building"},
        {c: "b", t: "Electronic meeting room", w: "Shared screen, shared display"},
        {c: "c", t: "The argument happens live", w: "Objections raised and answered"},
        {c: "d", t: "Decision recorded", w: "Written down before anyone leaves"}
      ],
      points: [
        "The fastest way to close a genuine disagreement, because objections are answered in the moment rather than in a reply tomorrow.",
        "The most expensive mode by a wide margin once travel is counted, and the cost falls on people rather than on equipment.",
        "Its failure mode is the meeting that did not need to be a meeting: an hour of several salaries spent on something an email would have settled."
      ]
    },
    {
      id: "sdp",
      name: "Same time, different places",
      site: "A synchronous distributed meeting: the clock is shared, the building is not.",
      boxes: [
        {c: "a", t: "A decision is urgent", w: "Waiting a day would cost something"},
        {c: "b", t: "Videoconference or call", w: "Everyone joins from where they are"},
        {c: "c", t: "Live discussion", w: "Tone and interruption survive"},
        {c: "d", t: "Decision, then a written note", w: "Because nobody shared the room"}
      ],
      points: [
        "This is the mode that replaced most business travel, and the one the chapter says a virtual team lives in when a deadline is close.",
        "Time zones are the hidden cost. A meeting convenient in three places is unpleasant in the fourth, and that seat is where attendance quietly stops.",
        "Its failure mode is a decision nobody wrote down, because the shared room that used to produce minutes was never there."
      ]
    },
    {
      id: "dts",
      name: "Different times, same place",
      site: "An electronic meeting facility used as a home base, worked on in shifts.",
      boxes: [
        {c: "a", t: "Work continues in shifts", w: "Not everyone is present at once"},
        {c: "b", t: "A shared room or board", w: "State is left where it stands"},
        {c: "c", t: "Each shift picks it up", w: "Reads what the last one left"},
        {c: "d", t: "Progress without a meeting", w: "Nobody waited for anybody"}
      ],
      points: [
        "The least discussed of the four and the most familiar in practice: a shift handover, a laboratory bench, a design board a team walks past.",
        "It buys continuity without coordination, which is exactly what a firm wants when the work is continuous and the people are not.",
        "Its failure mode is context that lived in somebody's head, so the next shift repeats the reasoning instead of the work."
      ]
    },
    {
      id: "dtp",
      name: "Different times, different places",
      site: "The virtual team in its purest form, and the mode most of this chapter is about.",
      boxes: [
        {c: "a", t: "Members across time zones", w: "No shared hour worth using"},
        {c: "b", t: "Discussion board, email, wiki", w: "Everything asynchronous"},
        {c: "c", t: "Each contributes when able", w: "The record is the meeting"},
        {c: "d", t: "Work moves around the clock", w: "Handed on rather than paused"}
      ],
      points: [
        "The only arrangement that lets a firm use expertise wherever it happens to be, which is the reason virtual teams exist at all.",
        "It is also the slowest to resolve a real disagreement, because every exchange costs a full turnaround rather than a sentence.",
        "Its failure mode is a question posted on a Friday afternoon in one time zone and answered on a Tuesday in another, with the deadline in between."
      ]
    }
  ]
};

ACT.colCase = {
  kind: "case",
  label: "Mini case",
  title: "Nine days to answer one question",
  how: "Read the brief and the exhibit, then take the three decisions in order; the firm and every figure attached to it are hypothetical and were invented for this exercise.",
  objective: "5.1",
  brief: "A mid-sized industrial equipment maker builds one product line with an engineering group split across three countries, chosen deliberately because that is where the specialists are. A customer has asked for a change to a pump housing. The answer needs a materials engineer, a manufacturing lead and a cost analyst, none of whom share an office or a working day. The last similar question took nine days. The firm is hypothetical and its figures are invented.",
  facts: [
    {k: "The firm", v: "A mid-sized maker of industrial pumps and their housings"},
    {k: "Where the expertise sits", v: "Materials in one country, manufacturing in a second, cost analysis in a third"},
    {k: "The question", v: "Can the housing be changed as the customer asked, and at what cost"},
    {k: "How it is handled today", v: "Emailed round the group, with each reply waiting for the next working day"},
    {k: "What is at stake", v: "The customer is holding an order open while the answer is produced"}
  ],
  exhibit: {
    name: "Exhibit A &middot; How the last nine days were spent",
    caption: "The same question, tracked through one round of email. Every figure here is invented for practice and none of it is reported data.",
    headers: ["Stage", "Working time used", "Waiting time used"],
    rows: [
      ["Materials engineer reads and replies", "40 minutes", "1 day"],
      ["Manufacturing lead reads, asks a clarifying question", "25 minutes", "2 days"],
      ["Materials engineer answers the clarification", "15 minutes", "1 day"],
      ["Cost analyst prices the change", "70 minutes", "3 days"],
      ["Someone assembles the three replies into an answer", "35 minutes", "1 day"],
      ["Total", "3 hours 5 minutes", "8 days"]
    ]
  },
  questions: [
    {
      q: "The exhibit separates working time from waiting time. What does that separation tell the firm?",
      opts: [
        "The engineers are slow, so the fix is to set a reply deadline on internal email",
        "The delay is turnaround, not effort, so the fix is a mode change rather than more effort",
        "The cost analyst is the bottleneck, so that role should be duplicated in each country",
        "The question was too complex for email, so it should have gone to a formal task force"
      ],
      a: 1,
      why: [
        "Three hours of work spread over nine days is not slowness. A reply deadline would compress the waiting a little and would not touch the thing producing it, which is that every exchange costs a full turnaround.",
        "Correct. Three hours of actual work took nine days because the medium is asynchronous and the question needed several rounds. Anything that removes rounds, or removes the wait inside a round, attacks the real cause.",
        "The cost analyst waited longest, but pricing could not begin until the first two had agreed what was being priced. Duplicating that role removes the last wait and leaves the two before it untouched.",
        "A task force is the slow traditional answer the chapter contrasts virtual teams against. Standing one up adds structure and logistics to a question that three people could settle in twenty minutes."
      ]
    },
    {
      q: "The engineering manager proposes one scheduled videoconference with all three specialists instead of the email round. What is the honest cost of that choice?",
      opts: [
        "It removes the record, since a live discussion produces nothing anybody can look up later",
        "It requires the dedicated room system the firm has not budgeted for this year",
        "It moves the work to a synchronous tool, which the chapter treats as the weaker choice",
        "It needs an hour that works in three time zones, and someone pays for that in their evening"
      ],
      a: 3,
      why: [
        "A live meeting does lose the automatic written trail, and that is a real risk worth managing with a written summary. It is not a cost the firm pays in money or in goodwill, which is what the question is asking about.",
        "Desktop videoconferencing needs a webcam, a microphone, software and a connection, all of which a laptop already has. The expensive room systems the chapter prices are a separate category of purchase.",
        "The chapter treats synchronous and asynchronous as suited to different situations rather than ranking them. When a deadline is close, it says synchronous media are usually the better fit.",
        "Correct. A synchronous meeting across three time zones has no hour that is convenient everywhere, so somebody joins outside their working day. That cost is real, it is unevenly distributed, and it is why attendance quietly decays."
      ]
    },
    {
      q: "Suppose the change turns out to be routine and this same question arrives roughly twice a month. What does that change about the recommendation?",
      opts: [
        "Nothing, because the mode that suits a question does not depend on how often it arrives",
        "It argues for a recurring meeting, so the three specialists are already booked together",
        "It argues for writing down the answer once, so most future questions skip the specialists",
        "It argues for hiring a fourth specialist who can answer all three parts alone"
      ],
      a: 2,
      why: [
        "Frequency changes the arithmetic completely. A one-off question is worth interrupting people for; a question that recurs twice a month is worth engineering out of existence.",
        "A standing meeting is a real improvement over waiting for email, and it still spends three salaries on every instance of a question that has already been answered before.",
        "Correct. A recurring question is a knowledge problem wearing a coordination problem's clothes. Recording the reasoning where the next person can find it is what the chapter's collaboration management tools are for, and it is the answer the next section develops.",
        "One person who covers materials, manufacturing and costing is not a realistic hire, and the whole reason this team is distributed is that each specialism sits where its specialists are."
      ]
    }
  ],
  debrief: "Three hours of work took nine days, and no individual was slow. The delay came from the mode: an asynchronous medium multiplied by several rounds of clarification. That is the chapter's point about time being the distinction that matters. Notice also where the case ended up. A synchronous meeting fixes one instance and costs somebody their evening; writing the answer down once fixes every future instance and costs nothing after the first. Coordination problems that recur are almost always knowledge problems, which is exactly why the next section is about intranets and search rather than about meetings."
};

ACT.colQuiz = {
  kind: "quiz",
  label: "Check",
  title: "Teams, modes, and tools",
  how: "Three questions on the vocabulary and the judgement; every option explains itself, including the ones you did not pick.",
  objective: "5.1",
  questions: [
    {
      q: "What distinguishes a virtual team from a traditional task force, in the chapter's terms?",
      opts: [
        "A virtual team has no manager, so decisions are made by the members themselves",
        "A virtual team is drawn from different locations and its membership stays fluid",
        "A virtual team is permanent, while a task force disbands once its task is finished",
        "A virtual team uses video, while a task force meets in a conference room"
      ],
      a: 1,
      why: [
        "Nothing in the chapter removes the manager. Virtual teams have the same authority structures as anything else; what changes is where the members physically are.",
        "Correct. The chapter defines a virtual team by geographic spread and by fluid membership: teams form and disband as needed, size fluctuates, and people join and leave as the work requires.",
        "This inverts the definition. The task force is the temporary form with a finite life cycle, and virtual teams are described as even more dynamic than that, not less.",
        "The medium follows from the spread rather than defining it. A distributed team could work almost entirely by discussion board and would still be a virtual team."
      ]
    },
    {
      q: "A support team must resolve an outage affecting a customer right now. Which mode fits, and why?",
      opts: [
        "Asynchronous, because a written trail matters most when a customer is affected",
        "Asynchronous, because it lets each specialist contribute without waiting for the others",
        "Synchronous, because delay itself is the cost when a deadline or a customer is waiting",
        "Synchronous, because rich media convey more information per minute than writing does"
      ],
      a: 2,
      why: [
        "The written record is genuinely valuable and can be produced afterwards in a few minutes. Choosing the slower medium to obtain it means the customer pays for the paperwork.",
        "Letting people contribute independently is exactly what asynchronous work is good for, and it is the wrong strength here, because every round of clarification costs a full turnaround.",
        "Correct. The chapter's rule is about the cost of delay: when time is of the essence, delays create process inefficiencies or dissatisfied customers, so synchronous media are better suited.",
        "Richness is a real advantage of conferencing tools and it is not the deciding factor here. A very rich discussion held tomorrow is still held tomorrow."
      ]
    },
    {
      q: "A firm buys a room videoconferencing system for each of its four offices and reports that collaboration has not improved. What does the chapter suggest went wrong?",
      opts: [
        "The equipment answers only one of the four modes, and most of the work sits in the others",
        "Room systems are outdated, and desktop videoconferencing has replaced them entirely",
        "Four offices are too few for a network effect, so the systems went unused",
        "Videoconferencing is a conferencing tool, and collaboration needs communication tools"
      ],
      a: 0,
      why: [
        "Correct. A room system serves a scheduled synchronous meeting between fixed locations. The work of a distributed team is spread across all four modes, and much of it is asynchronous, which no amount of video equipment touches.",
        "Desktop videoconferencing is cheaper and adequate for most meetings, and dedicated systems still exist for reasons of quality and reliability. The problem here is what the purchase covers rather than which kind it was.",
        "Network effects matter for social tools whose value depends on how many colleagues participate. A meeting between two offices works perfectly well with two offices.",
        "The three families are not ranked, and collaboration draws on all of them. Buying only from one family is closer to the problem, but the mode analysis is what explains the disappointment."
      ]
    }
  ]
};
