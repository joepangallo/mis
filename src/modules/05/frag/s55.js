/* ===== s55 ===== */
PROSE.s55 = `
<span class="eyebrow">Application supplement 5&ndash;5</span>
<h2>Turning this chapter into the written analysis</h2>
<p class="lede">An observation is not a diagnosis. A firm can count forum threads, reply times and marketplace commission and still hold nothing anybody can act on, because a figure never says which pressure produced it. This supplement practises the move from counted evidence to one recommendation, in the order a written analysis has to make it.</p>

<div class="callout info"><b>What this section is.</b> It is an application supplement rather than a textbook objective. It teaches no new framework, and it assumes you have worked through the previous section. Everything here runs on a hypothetical firm, and it solves no graded case for you.</div>

<h3>The shape of the deliverable</h3>
<p>The written analysis this course asks for is fixed, and knowing its shape in advance is half the work. Four things have to be in it, and each one fails in a predictable way.</p>
<ol class="steps">
<li><b>Rate all five forces on the firm.</b> All five, including the ones that turn out to be weak, and each with the evidence that made you rate it that way.</li>
<li><b>Find at least two places in the value chain where technology could create an advantage.</b> Two genuinely different activities, not one activity described twice.</li>
<li><b>Recommend exactly one initiative.</b> One. With what it changes, what it costs, and what you would measure afterwards to know whether it worked.</li>
<li><b>Write a comparison of 150 to 200 words against a company you choose.</b> Not a profile of that company: a lesson drawn back to the firm you are advising.</li>
</ol>
<p>The firm below is hypothetical and every figure attached to it is invented. Take the case first; the explanation after it reads as the debrief of what you have just tried.</p>

<div class="activity" data-activity="anaCase"></div>

<h3>What this chapter supplies to the frameworks</h3>
<p>Each decision asked for the same two moves: name the pressure an observation belongs to, then say where in the firm a fix would land. A symptom is not a force. Five ideas from this chapter make that translation for you.</p>
<ul class="keys">
<li><b>Network effects and accumulated participation</b> raise a barrier to entry that a challenger cannot buy, which is why a community, a review corpus or a knowledge base is a strategic asset rather than a marketing channel.</li>
<li><b>A platform that carries your customers is a supplier</b> whose power grows with every order it handles, because it lends you its audience and keeps the relationship attached to itself.</li>
<li><b>Reviews and public complaint move information to the buyer</b>, so buyer power rises even when nothing about the product or the price has changed at all.</li>
<li><b>Internal knowledge tools sit in technology development</b>, because what they change is how quickly and how well the firm can produce the next thing rather than how it sells the last one.</li>
<li><b>Coordination cost is a value-chain cost</b>, so nine days of waiting for an answer is an operations and technology development problem with a number attached, not a complaint about meetings.</li>
</ul>

<h3>Working the evidence yourself</h3>
<p>Naming the mapping is the point, and the naming has to start from something counted. That is the step readers skip, and the only one that produces facts somebody else can check. The sheet below holds one year of the firm's support channels.</p>

<div class="activity" data-activity="anaFormula"></div>

<p>A resolution rate and a staff-hour total tell you where the effort is going. They do not tell you which channel makes customers wait, which leaves work unfinished, or which one the firm does not control. Those are questions for the records themselves.</p>

<div class="activity" data-activity="anaSql"></div>

<h3>What separates a strong version from a weak one</h3>
<p>The difference at each step is small, repeatable, and visible to anybody reading the two side by side.</p>
<div class="tbl-wrap"><table class="tbl">
<thead><tr><th>Step</th><th>Weak version</th><th>Stronger version</th></tr></thead>
<tbody>
<tr><td><b>Gather</b></td><td>&ldquo;Our social media presence needs work.&rdquo;</td><td>Median hours to first reply on each channel, beside two named competitors.</td></tr>
<tr><td><b>Rate</b></td><td>&ldquo;Customers are very active online.&rdquo;</td><td>&ldquo;Buyer power is high: buyers arrive having read reviews, and switching costs them nothing.&rdquo;</td></tr>
<tr><td><b>Locate</b></td><td>&ldquo;We need a better digital strategy.&rdquo;</td><td>&ldquo;The loss is in service and in technology development, and here is the figure for each.&rdquo;</td></tr>
<tr><td><b>Recommend</b></td><td>Three initiatives, none of them costed.</td><td>One initiative, with what it changes, what it costs and how you would tell.</td></tr>
</tbody>
</table></div>

<div class="activity" data-activity="anaSim"></div>

<h3>The comparison summary</h3>
<p>The last piece is short and is where most of the marks are quietly lost. Three things make it work: pick a comparison with a real similarity or a real contrast, name what that company does differently in the vocabulary of the frameworks, and end on what your firm should therefore do or deliberately refuse to do.</p>
<p class="takeaway">A summary that spends its two hundred words admiring somebody else has answered a different question. Every sentence should be recoverable as advice to the firm in front of you.</p>

<div class="activity" data-activity="anaReady"></div>
`;

ACT.anaCase = {
  kind: "case",
  label: "Mini case",
  title: "Four offices, one retiring generation, and a public that reviews you",
  how: "Read the brief and the exhibit, then take the three decisions in order; the practice and every figure attached to it are hypothetical and were invented for this exercise.",
  objective: "5.5",
  brief: "A regional architecture and engineering practice of seventy staff works from four offices, deliberately, because that is where its specialists live. Project teams are assembled across offices for every job. Three things arrived at once this year: a national practice opened an office in its region, a third of its senior engineers reach retirement age within two years, and clients have begun choosing consultants from a public directory that carries reviews. The practice is hypothetical and every figure attached to it is invented.",
  facts: [
    {k: "The firm", v: "A regional architecture and engineering practice, seventy staff, four offices"},
    {k: "How work is done", v: "Project teams assembled across offices for every job"},
    {k: "What arrived this year", v: "A national competitor in the region, and a reviewed public directory"},
    {k: "What arrives next", v: "A third of senior engineers reaching retirement age within two years"},
    {k: "The ask", v: "One initiative, with what it changes, what it costs and what to measure"}
  ],
  exhibit: {
    name: "Exhibit A &middot; Five things the partners can count",
    caption: "What a month of measurement produced, with what ignoring each one would cost. Every figure here is invented for practice and none of it is reported data.",
    headers: ["What the partners counted", "This year", "What ignoring it costs"],
    rows: [
      ["Median days to answer a cross-office technical question", "4.5 days, against 0.5 within an office", "Project time bought and not used"],
      ["Detailing decisions re-derived because nobody found the earlier one", "62 in twelve months", "Senior time spent twice on one answer"],
      ["Share of new enquiries citing the public directory", "41 percent, up from 6 percent", "Selection happening before any contact"],
      ["Median days to respond to a directory review", "11 days; the national competitor takes 1", "A visible comparison on a public page"],
      ["Senior engineers reaching retirement age within two years", "9 of 27", "Knowledge leaving with no copy of it"]
    ]
  },
  questions: [
    {
      q: "A national competitor opened in the region and clients now choose from a reviewed directory. Which is the more significant force change, and why?",
      opts: [
        "The competitor, since a national practice can undercut a regional one on price",
        "The directory, since it moved the selection decision to before any contact happens",
        "Neither; both are rivalry, and the practice should treat them as one problem",
        "The competitor, since rivalry tends to dominate the other forces in professional services"
      ],
      a: 1,
      why: [
        "A larger competitor is real pressure and is the familiar kind. Price is also not established anywhere in the exhibit, so treating it as the mechanism is an assumption rather than a finding.",
        "Correct. The directory raises buyer power by moving information to the client's side: forty-one percent of enquiries now arrive after a comparison the practice was not present for. That is a structural change, and the competitor is one more entry on a page the client already reads.",
        "Collapsing the two loses the distinction that makes the analysis useful. One is a firm competing with you; the other changed how every firm gets chosen, including the new one.",
        "Nothing establishes a dominant force in advance, and asserting one is the move this module warns against. The rating has to come from the evidence in front of you."
      ]
    },
    {
      q: "The four-and-a-half day answer time and the sixty-two re-derived decisions. Where do those land, and are they one problem or two?",
      opts: [
        "One problem in operations: both are project delivery running slower than it should",
        "Two problems in one activity: both sit in technology development, at different scales",
        "Two problems in two activities: coordination in operations, knowledge in technology development",
        "One problem in human resource management, since both are about how staff work"
      ],
      a: 2,
      why: [
        "Calling both operations captures the delay and loses the second one entirely. Re-deriving a decision is not slow delivery; it is work being done that had already been done.",
        "Both do touch how well the firm produces the next thing, and treating them as one activity hides that they need different fixes: one is about reaching a person, the other about reaching a record.",
        "Correct. Waiting four and a half days for a colleague is a coordination cost in delivery, and re-deriving a decision sixty-two times is knowledge the firm holds and cannot reach. Two activities, two figures, and the analysis needs at least two areas anyway.",
        "Human resource management covers recruiting, developing and administering people. Neither figure is about employment terms, and filing both here would put the recommendation where nobody could act on it."
      ]
    },
    {
      q: "The partners can fund one initiative. Which recommendation is best supported by this exhibit?",
      opts: [
        "Answer directory reviews within a day, since the competitor comparison is visible",
        "Capture detailing decisions as they are made, before nine seniors retire",
        "Open a fifth office in the competitor's city, to defend the region directly",
        "Run all cross-office questions through a daily scheduled videoconference"
      ],
      a: 1,
      why: [
        "This is cheap, fast, visibly behind a competitor, and worth doing. It is also a service fix that changes nothing about the two largest structural risks, and the brief asks for the one initiative rather than the easiest.",
        "Correct. It answers the sixty-two re-derived decisions and the nine retirements at once, it is the only option addressing something the practice cannot recover once it is gone, and it lands in technology development where the firm's ability to produce the next project is decided.",
        "A fifth office is a large capital commitment answering rivalry with scale, which is the dimension a national practice is better placed to win. Nothing in the exhibit supports it.",
        "A daily meeting compresses the four-and-a-half day wait and spends seventy people's time on questions that mostly concern two of them, and it does nothing about the answers being lost afterwards."
      ]
    }
  ],
  debrief: "The exhibit is arranged so the loudest event is not the most important one. A national competitor is visible and rivalrous; the directory quietly moved selection to before the practice is ever contacted, which is buyer power and the larger change. The two internal figures are deliberately separable, because the deliverable asks for at least two value-chain areas and they are genuinely different: reaching a person, and reaching a record. And the recommendation follows from what is irreversible. Review response time can be fixed next month and any time after that; nine retirements cannot be undone, which is what makes knowledge capture the one initiative this evidence supports."
};

ACT.anaFormula = {
  kind: "formula",
  label: "Spreadsheet",
  title: "Turn raw channel counts into evidence",
  how: "Type one formula for row 2 in each column and run it; it is applied down every row the way a filled-down formula behaves in a real sheet. The channels and figures belong to the hypothetical practice and are invented.",
  objective: "5.5",
  headers: ["Channel", "Enquiries received", "Resolved by other customers", "Resolved by staff", "Staff minutes per resolution", "Community resolution rate", "Staff hours used", "Priority?"],
  data: [
    ["User forum", 11400, 9600, 1800, 22, "", "", ""],
    ["Live chat", 4200, 0, 4200, 14, "", "", ""],
    ["Marketplace questions", 2600, 0, 2600, 19, "", "", ""],
    ["Social network page", 3100, 0, 3100, 26, "", "", ""]
  ],
  tasks: [
    {
      column: 5,
      prompt: "Column F: what share of each channel's enquiries were resolved by other customers rather than by staff? Give it as a percentage, rounded to one decimal place.",
      placeholder: "=ROUND(C2/B2*100,1)",
      expect: "=ROUND(C2/B2*100,1)",
      note: "Every figure in this sheet is invented for practice.",
      hint: "Divide the community resolutions in column C by the enquiries in column B, multiply by 100 to make it a percentage, then round the result to one decimal place.",
      explain: "One channel resolves most of its own volume and the other three resolve none. That single ratio is the whole argument for treating a community as an asset rather than as a channel, and it is the number a competitor without one cannot produce."
    },
    {
      column: 6,
      prompt: "Column G: how many staff hours did each channel actually consume? Multiply the staff resolutions by the minutes each one took, and convert to hours.",
      placeholder: "=ROUND(D2*E2/60,1)",
      expect: "=ROUND(D2*E2/60,1)",
      hint: "Multiply the staff-resolved count in column D by the minutes per resolution in column E, divide by sixty to turn minutes into hours, then round to one decimal place.",
      explain: "Now the two columns disagree, and the disagreement is the finding. The forum takes by far the most enquiries and consumes the fewest staff hours of any channel here, while the page the firm controls least consumes the most."
    },
    {
      column: 7,
      prompt: "Column H: mark any channel that consumes more than eight hundred staff hours for review, and mark the rest as held. Column G holds your own answer rather than sheet data, so work the hours out again inside this formula.",
      placeholder: "=IF(D2*E2/60>800,\"Review\",\"Hold\")",
      expect: "=IF(D2*E2/60>800,\"Review\",\"Hold\")",
      hint: "You need a test and two results. Work the staff hours out inside the test itself, multiplying the staff-resolved count in column D by the minutes in column E and dividing by sixty, then compare that against eight hundred.",
      explain: "A flag is a decision rule written down, which is the honest way to use a threshold. Notice what it selects: three channels for review, and the one that carries the most enquiries is not among them, which is the opposite of what enquiry volume alone would have told you."
    }
  ]
};

ACT.anaSql = {
  kind: "sql",
  label: "Database",
  title: "Ask the records this chapter's questions",
  how: "Write a SELECT for each question and run it; any query returning the right answer is accepted. These twelve rows are one week pulled from the log, not the year the spreadsheet totals, so the counts are small and the ratios will not match it. The practice and its channels are hypothetical.",
  objective: "5.5",
  tables: {
    posts: { rows: [
      {id: 101, channel: "forum",         topic: "Setup question",     hours_to_reply: 0.4,  staff_minutes: 0,  resolved: "yes"},
      {id: 102, channel: "forum",         topic: "Detailing query",    hours_to_reply: 1.2,  staff_minutes: 25, resolved: "yes"},
      {id: 103, channel: "forum",         topic: "Project write-up",   hours_to_reply: 2.0,  staff_minutes: 0,  resolved: "yes"},
      {id: 104, channel: "live chat",     topic: "Fee enquiry",        hours_to_reply: 0.1,  staff_minutes: 9,  resolved: "yes"},
      {id: 105, channel: "live chat",     topic: "Document request",   hours_to_reply: 0.2,  staff_minutes: 16, resolved: "yes"},
      {id: 106, channel: "marketplace",   topic: "Scope question",     hours_to_reply: 6.5,  staff_minutes: 12, resolved: "yes"},
      {id: 107, channel: "marketplace",   topic: "Missing drawing",    hours_to_reply: 9.0,  staff_minutes: 18, resolved: "no"},
      {id: 108, channel: "social page",   topic: "Public complaint",   hours_to_reply: 14.0, staff_minutes: 35, resolved: "no"},
      {id: 109, channel: "social page",   topic: "Delay complaint",    hours_to_reply: 21.0, staff_minutes: 40, resolved: "yes"},
      {id: 110, channel: "forum",         topic: "Materials help",     hours_to_reply: 0.6,  staff_minutes: 0,  resolved: "yes"},
      {id: 111, channel: "marketplace",   topic: "Programme question", hours_to_reply: 7.5,  staff_minutes: 10, resolved: "no"},
      {id: 112, channel: "social page",   topic: "Praise for a job",   hours_to_reply: 5.0,  staff_minutes: 5,  resolved: "yes"}
    ]},
    channels: { rows: [
      {channel: "forum",       owns_relationship: "the practice",   staff_rate: 36},
      {channel: "live chat",   owns_relationship: "the practice",   staff_rate: 30},
      {channel: "marketplace", owns_relationship: "the marketplace", staff_rate: 45},
      {channel: "social page", owns_relationship: "the platform",    staff_rate: 42}
    ]}
  },
  tasks: [
    {
      prompt: "List the topic and the hours to first reply for every post on the forum.",
      expect: "SELECT topic, hours_to_reply FROM posts WHERE channel = 'forum'",
      hint: "Name the two columns after SELECT, then narrow the rows with WHERE on the channel column. A text value goes inside quotes.",
      explain: "Choosing columns and choosing rows are separate decisions. Read the result and the pattern is already there: forum replies arrive in under two hours, and three of the four consumed no staff time at all."
    },
    {
      prompt: "How many staff minutes did each channel consume this week? Show the largest first.",
      expect: "SELECT channel, SUM(staff_minutes) AS minutes FROM posts GROUP BY channel ORDER BY minutes DESC",
      hint: "Collapse the rows to one per channel with GROUP BY, total the minutes inside SELECT, give that total a name with AS, then sort by that name downwards.",
      explain: "Grouping turns a list of posts into a description of the channels. The channel with the most posts is not the one consuming the most staff time, which is the first sign that post counts are a poor way to judge a channel."
    },
    {
      prompt: "Which channels left more than one post unresolved? Show the channel and how many.",
      expect: "SELECT channel, COUNT(*) AS unresolved FROM posts WHERE resolved = 'no' GROUP BY channel HAVING COUNT(*) > 1",
      hint: "Filter to the unresolved posts first, then group by channel. The condition about how many there were has to come after the grouping, which is what HAVING is for.",
      explain: "WHERE filters rows and HAVING filters groups, because at the WHERE stage nothing has been counted yet. The answer also says where unfinished work accumulates, which is on a channel somebody else owns."
    },
    {
      prompt: "What did each channel cost the practice in staff time? Show the channel, the minutes, and the cost, most expensive first.",
      expect: "SELECT p.channel, SUM(p.staff_minutes) AS minutes, SUM(p.staff_minutes * c.staff_rate / 60) AS staff_cost FROM posts p JOIN channels c ON p.channel = c.channel GROUP BY p.channel ORDER BY staff_cost DESC",
      hint: "The hourly rate lives on the channels table and the minutes live on the posts table, so join them on the channel name. The calculation goes inside the SUM, and both results need names with AS.",
      explain: "This answer exists in neither table. Minutes sit on one and the rate sits on the other, and only the join shows that the most expensive channel is also the slowest to reply and the one where the practice does not own the relationship. The same table records who does own it, which is the supplier-power half of the story."
    }
  ]
};

ACT.anaSim = {
  kind: "sim",
  label: "Walkthrough",
  title: "Writing the analysis, decision by decision",
  intro: "You have the practice's records and a week before the partners expect a document. Four decisions, in the order they arrive.",
  how: "Choose at each step; every option shows what it would lead to, including the ones you did not take. The firm is hypothetical.",
  objective: "5.5",
  steps: [
    {
      situation: "You have a week with the practice's records before you write anything. What do you come back with?",
      opts: [
        {t: "A written summary of what the four office heads believe is going wrong", ok: false, out: "Their judgement is worth having and will help you read the numbers later. On its own a list of beliefs cannot be checked, and it tends to describe the month rather than locate a pressure."},
        {t: "A review of the national competitor's website and brochures, noting every service the practice lacks", ok: false, out: "This produces a feature list, and a feature list quietly becomes the recommendation. You end up proposing work because a rival advertises it rather than because a force demands it."},
        {t: "Every project file exported, so nothing at all is left out of the analysis", ok: false, out: "Completeness is not evidence. Without a question in mind you cannot tell which figures matter, and the work stalls in the data rather than in the argument you were asked for."},
        {t: "Reply times by channel, re-derived decisions, directory share, and the retirement profile", ok: true, out: "Right. Each of these can be counted, each attaches to a force or to a value-chain activity, and each can be checked by somebody who doubts you. Evidence is what separates an analysis from an opinion."}
      ]
    },
    {
      situation: "Your first draft says: cross-office questions take four and a half days, and clients now choose from a directory. What is missing?",
      opts: [
        {t: "Nothing. It states two observed facts, and an analysis should stay close to its evidence", ok: false, out: "Staying close to the evidence is right, and an analysis is more than the evidence. A description that names no pressure gives the reader nowhere to go and no way to test whether you are correct."},
        {t: "It names no force. Say which pressure each observation is evidence of", ok: true, out: "Right. As drafted the sentence describes the year. Naming buyer power and placing the coordination cost inside the value chain is what lets a reader argue with you and what makes a recommendation follow from something."},
        {t: "A stronger opening claim, such as calling this an existential threat to the practice", ok: false, out: "Force of language is not force in the framework sense. Escalating the wording adds urgency without adding a diagnosis, and it makes the whole piece harder to trust."},
        {t: "More figures, so add the re-derived decisions and the retirement count to that sentence", ok: false, out: "More numbers in the same sentence still leave it a description. The figures belong in the evidence; the sentence exists to say which pressure they are evidence of."}
      ]
    },
    {
      situation: "You have three candidate initiatives you like, and the brief asks for one. What do you write?",
      opts: [
        {t: "All three, ranked in order, so the partners can pick whichever suits the budget", ok: false, out: "Ranking looks generous and quietly hands the decision back to the reader. It also hides which pressure you were answering, and no single option ever gets costed properly."},
        {t: "The most ambitious of the three, since a bolder call shows a firmer grasp", ok: false, out: "Ambition is not a criterion. The recommendation has to answer the pressure the evidence showed, and a bold initiative aimed at the wrong force is worse than a modest one aimed at the right one."},
        {t: "One initiative, with the force it answers, what it costs, and what you would watch", ok: true, out: "Right. A single recommendation can be costed, argued and later judged. The other two can be named in a sentence as deliberately not chosen, which is itself an analytical move rather than a hedge."},
        {t: "A new collaboration platform, because the national competitor is known to use one", ok: false, out: "This is technology with no force behind it. If you cannot say which pressure the platform relieves and where it sits in the value chain, the reader has no reason to accept it."}
      ]
    },
    {
      situation: "The last piece is a comparison of 150 to 200 words against a company you choose. Which draft does the work?",
      opts: [
        {t: "Name what that company does differently, then what the practice should do or refuse", ok: true, out: "Right. The comparison exists to produce a lesson for the firm you are advising. Naming the difference in the vocabulary of the frameworks is what makes it a lesson rather than a story about somebody else."},
        {t: "A short profile of the company, its history, its scale and its best-known work", ok: false, out: "This is the commonest failure of the whole piece. It reads well and says nothing about the practice, and by the end the reader knows more about a company nobody asked you to advise."},
        {t: "A list of every difference between the two firms, so nothing relevant is left out", ok: false, out: "Length is not coverage. Most differences do not bear on the pressure you diagnosed, and burying the one that matters among twenty that do not is how a reader misses your point."},
        {t: "An argument that the practice should copy the company as closely as its budget allows", ok: false, out: "Copying ignores what your own evidence said about this firm, which holds ground the comparison company may not hold at all. A lesson is not an instruction to imitate."}
      ]
    }
  ]
};

ACT.anaReady = {
  kind: "selfcheck",
  label: "Ready?",
  title: "Could you write the analysis now?",
  how: "Rate each statement honestly; anything you cannot do yet has a pointer back to the part of this module to reread.",
  objective: "5.5",
  items: [
    {t: "I can rate all five forces on a firm, including the ones that turn out to be weak, with evidence for each.", hint: "Go back to the framework walkthrough in the previous section, and to the first decision of this section's mini case."},
    {t: "I can name two genuinely different value-chain activities rather than describing one activity twice.", hint: "Go back to the second decision of the mini case, and to the sort that places ten tools across five activities."},
    {t: "I can explain why a platform that carries a firm's customers counts as a powerful supplier.", hint: "Go back to the list of what this chapter supplies to the frameworks, and to the last database exercise, whose join shows who owns each relationship."},
    {t: "I can turn raw channel counts into the two or three ratios an analysis actually argues from.", hint: "Go back to the spreadsheet exercise under working the evidence yourself."},
    {t: "I can state one recommendation with what it changes, what it costs, and how I would know whether it worked.", hint: "Go back to the third decision of the walkthrough, and to the strong-against-weak table above it."},
    {t: "I can write a comparison that ends in advice to my own firm rather than in a profile of somebody else.", hint: "Go back to the closing paragraphs on the comparison summary, and to the fourth decision of the walkthrough."}
  ]
};
