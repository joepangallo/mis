/* Chapter 7 lesson and activity data. Rebuild with node src/build.mjs --module=modules/07. */
PROSE.s71b = "\n<span class=\"eyebrow\">Objective 7.1 · Part 2</span><h2>The decision-making continuum</h2>\n<p class=\"lede\">Fairmount Provisions is a hypothetical regional distributor of food and household goods: 40 depots, 1,100 staff, selling to independent grocers, school kitchens and restaurants. In week 31 its East depots ran short of chilled stock, and three school-kitchen contracts went elsewhere. Nobody was surprised by the shortage. It happens every year. What failed was a staging figure set in January and never looked at again.</p>\n<h3>Planning stopped being an annual event</h3>\n<p>Organizations used to lack the data and the tools to plan continuously. A strategic plan was agreed for a cycle, say a year. Managers then built budgets for their part of it and spent the year executing them.</p>\n<p>Those budgets were backward looking. They rested on historical data rather than on a clear understanding of current conditions and forecasts of future trends. While the pace of change stayed slow, that was adequate.</p>\n<p>It is not adequate now. In a <b>continuous planning process</b>, an organization keeps monitoring and analyzing its data and its business processes. Those results lead to adjustments in how the organization is managed, and the same results are reflected in updates to its plans.</p>\n<p>The chapter draws that as a circle of four stages: manage leads to plan, plan leads to monitor, monitor leads to analyze, and analyze leads back to manage. Each stage has an ordinary job at a distributor.</p>\n<ul class=\"keys\"><li><b>Manage</b> is real-time management: tonight's trucks get loaded and this week's calls get made while the week is still running.</li><li><b>Plan</b> updates and adjusts the plans themselves, which is where the week-31 staging figure should have been revised in June rather than defended in August.</li><li><b>Monitor</b> tracks the business processes, which here means pallets shipped, pallets short, and orders a depot could not fill.</li><li><b>Analyze</b> compares actual performance against the goal, turning the distance between what was staged and what was needed into a number.</li></ul>\n<p>The loop runs on timely and accurate insight drawn from relevant data. Fairmount had the data and worked the gap out every year. What never happened is the second half of that sentence: the result was never reflected in an update to the plan, and three contracts is what the missing step cost.</p>\n<h3>A second question, about the decision itself</h3>\n<p>The continuum in the chapter's own heading runs from what happened, to why, to what will happen, to what should be done, and Part 1 of this objective worked through it. A second question is worth asking before any of those tools gets scoped, and it is about the decision rather than the analysis.</p>\n<p>Ask how much of the procedure can be written down in advance, before the situation arrives. Answers fall into three shapes.</p>\n<ul class=\"keys\"><li><b>Structured decisions</b> have procedures that can be specified ahead of time, so they can be programmed into operational systems and made with little human involvement.</li><li><b>Semistructured decisions</b> have part of their procedure specified in advance, but not far enough to yield one specific recommendation, so judgment and expertise finish the job.</li><li><b>Unstructured decisions</b> have few or no procedures that can be specified in advance, because the problem is complex and nonroutine and its consequences reach the whole organization.</li></ul>\n<p>At Fairmount all three sit on one Tuesday. A depot reorders chilled milk when the case count falls below its reorder point. A planner decides how many extra pallets to stage in the East for week 31. The board decides whether to serve school kitchens at all.</p>\n<div class=\"activity\" data-activity=\"contSort\"></div>\n<h3>The shape belongs to the decision, not the decider</h3>\n<p>Here is the mistake worth spending a paragraph on. The three shapes do line up loosely with organizational levels: structured decisions cluster at the operational level, semistructured ones at the managerial level, unstructured ones at the executive level. That is a tendency, not a definition.</p>\n<p>The test is the decision. Ask whether the procedure for this situation can be written down before the situation arrives, and whether anyone can check the answer afterwards.</p>\n<p>The same words change shape as they change hands. How much chilled stock do we need is structured for a depot supervisor ordering Tuesday's milk against a reorder point, with a shelf anyone can walk over and count. Asked of nine depots across a peak week seven weeks out, no reorder point covers it.</p>\n<p>Credit behaves the same way. A clerk checking whether an order fits under an account's limit is applying a rule. A director deciding whether to raise that limit for a school district mid-contract is not.</p>\n<p>Two practical consequences follow from where a decision sits.</p>\n<ul class=\"keys\"><li><b>Seniority follows the decision</b>, because the less of a procedure can be written down, the higher in the organization the call travels.</li><li><b>The available help changes</b> with it, since a system can decide only where the procedure is known and the outcome is checkable.</li></ul>\n<div class=\"activity\" data-activity=\"contMatch\"></div>\n<h3>What kind of help is possible</h3>\n<p>Where a decision sits settles what a system can honestly offer it. The chapter's own figure makes the point from the other side: descriptive, diagnostic and predictive analytics all run through human input before a decision is made, and only prescriptive analytics splits into decision support and decision automation.</p>\n<ul class=\"keys\"><li><b>Automate it</b> where the procedure is known and the result is checkable, which is how a reorder rule or an automatic price runs unattended.</li><li><b>Support it</b> where part of the procedure is known, with a forecast, a what-if run or a ranked list that a person then acts on.</li><li><b>Inform it</b> where no procedure exists, by assembling the evidence for an argument that somebody senior still has to have.</li></ul>\n<p>The chapter's example of an automated decision is a ride-hailing service whose fares rise on their own when demand is predicted to rise, with no person in the loop. Notice what makes that possible: the rule can be written down, and the outcome is measurable within the hour.</p>\n<p>Support is the honest offer in the middle. Forecasting that the East region needs 1,240 pallets in week 31 does not order them, and a planner who reads that number may still stage fewer and answer for the difference.</p>\n<p>At the unstructured end a system gathers evidence and stops. It can show what the school-kitchen contracts earned and how their margins moved. It cannot tell the board whether to keep them.</p>\n<p class=\"takeaway\">Classify the decision before you scope the system. A structured decision can be handed a rule, a semistructured one a forecast, and an unstructured one nothing better than good evidence.</p>\n<p>Now run one week through both questions at once, with the figures Fairmount actually had.</p>\n<div class=\"activity\" data-activity=\"contCase\"></div>\n<p class=\"takeaway\">Two questions settle most of this. Can the procedure be written down in advance, and can anybody check the answer afterwards? Yes to both buys automation, yes to one buys support, and no to both buys a better-informed argument.</p>\n";

ACT.contSort = {
  "kind": "sort",
  "label": "Sort",
  "title": "How much of the procedure can be written down first?",
  "objective": "7.1",
  "how": "Drop each decision into the shape it actually has, then check. Ignore who makes it and ask what could be specified in advance.",
  "buckets": [
    {
      "id": "str",
      "name": "Structured",
      "hint": "The procedure can be written down before the situation arrives, and the answer can be checked afterwards."
    },
    {
      "id": "semi",
      "name": "Semistructured",
      "hint": "Part of the procedure is known, but not far enough to name one answer. Judgment finishes it."
    },
    {
      "id": "uns",
      "name": "Unstructured",
      "hint": "Few or no procedures can be specified in advance. The problem is complex, nonroutine and far-reaching."
    }
  ],
  "items": [
    {
      "t": "Reordering chilled milk at Depot 12 when the case count falls below its reorder point",
      "b": "str",
      "why": "The rule exists before the situation does, so the system can raise the order and a supervisor only confirms it."
    },
    {
      "t": "Holding an order that would push an account past its agreed credit limit",
      "b": "str",
      "why": "The limit and the balance are both already in the system, so the check is a written rule with a checkable result."
    },
    {
      "t": "Applying the agreed volume discount once a grocer's order passes its contracted case count",
      "b": "str",
      "why": "Both the threshold and the discount were agreed in advance, so the system applies them and the invoice shows the result."
    },
    {
      "t": "Deciding how many extra chilled pallets to stage in the East for week 31",
      "b": "semi",
      "why": "A forecast narrows the range, but somebody still weighs spoilage against a stockout and picks the number."
    },
    {
      "t": "Setting next quarter's promotional allowance for the restaurant accounts",
      "b": "semi",
      "why": "Past response rates guide the figure, yet no procedure turns them into one defensible amount, so judgment closes it."
    },
    {
      "t": "Choosing which depots get Saturday overtime when volume runs above plan",
      "b": "semi",
      "why": "The volume figures are known and the rule is not, so cost, fatigue and customer promises get traded off by a manager."
    },
    {
      "t": "Deciding whether to keep serving school kitchens after losing three contracts",
      "b": "uns",
      "why": "No procedure covers it, the answer reaches pricing, routing and staffing, and nobody can check it before the fact."
    },
    {
      "t": "Deciding whether to lease seasonal cold storage or build a tenth East depot",
      "b": "uns",
      "why": "The problem is nonroutine and the consequences run for years, so the figures inform the argument rather than settle it."
    },
    {
      "t": "Deciding whether to merge the North and South regions under one manager",
      "b": "uns",
      "why": "Few procedures can be specified ahead of a change this complex, and its effects reach across the whole organization."
    }
  ]
};

ACT.contMatch = {
  "kind": "match",
  "label": "Match",
  "title": "The decision and the help it can actually take",
  "objective": "7.1",
  "how": "Match each question on the desk to the kind of help the shape of that decision allows, then check. Read why each pairing fits.",
  "pairs": [
    {
      "l": "How many cases of chilled milk go to Depot 12 on Tuesday?",
      "r": "A reorder rule the depot system runs unattended",
      "why": "The procedure is writable and the shelf checks it within a day, so this decision can be automated outright."
    },
    {
      "l": "How many chilled pallets will the East region need in week 31?",
      "r": "A pallet-count forecast the planner orders against",
      "why": "Predicting the quantity is the system's part; deciding how much to stage against that number stays with a person."
    },
    {
      "l": "Why did three Tuesday delivery windows slip in the same March week?",
      "r": "An account of what moved together in the past",
      "why": "The event has already happened and the question is the relationship inside it, which informs a decision rather than making one."
    },
    {
      "l": "Which restaurant accounts are likely to stop ordering next quarter?",
      "r": "A ranked list of the accounts most at risk",
      "why": "A model can name the accounts, but what to offer each one is a judgment the sales director still has to make."
    },
    {
      "l": "What delivery surcharge should each account be quoted tonight?",
      "r": "A price set and sent with no person in between",
      "why": "Fuel, route and vehicle costs are all inputs to a rule, so the action itself can be taken automatically."
    },
    {
      "l": "Should Fairmount keep serving school kitchens at all?",
      "r": "Evidence assembled for an argument at board level",
      "why": "No procedure produces this answer, so the most a system offers is the margin history behind the board's call."
    }
  ]
};

ACT.contCase = {
  "kind": "case",
  "label": "Mini case",
  "title": "Week 31, seven weeks out",
  "objective": "7.1",
  "how": "Study the hypothetical case and its invented figures. Make every decision to unlock the debrief; read the explanation for each option.",
  "brief": "Fairmount Provisions is a hypothetical regional food and household goods distributor with 40 depots and 1,100 staff. It is week 24. The East region ran short of chilled stock in week 31 last year, three school-kitchen contracts went elsewhere, and the board has said plainly that it must not happen again. Three decisions now sit on one desk, and they are not the same shape.",
  "facts": [
    {
      "k": "East region",
      "v": "9 of the 40 depots"
    },
    {
      "k": "Standing plan for week 31",
      "v": "1,000 chilled pallets, set each January"
    },
    {
      "k": "Today",
      "v": "Week 24, seven weeks out"
    },
    {
      "k": "Week-31 review",
      "v": "Staged against needed, written up every October"
    },
    {
      "k": "Board instruction",
      "v": "The week-31 shortage must not repeat"
    }
  ],
  "exhibit": {
    "name": "Week 31 in the East, three years running",
    "caption": "Invented practice figures for this case only. Pallets short is needed minus staged.",
    "headers": [
      "Week 31 in the East",
      "Pallets staged",
      "Pallets needed",
      "Pallets short",
      "School-kitchen orders unfilled"
    ],
    "rows": [
      [
        "Two years ago",
        "1,000",
        "1,120",
        "120",
        "4"
      ],
      [
        "Last year",
        "1,000",
        "1,180",
        "180",
        "9"
      ],
      [
        "This year, forecast",
        "1,000 as planned",
        "1,240",
        "240",
        "not yet known"
      ]
    ]
  },
  "questions": [
    {
      "q": "Week 31 is seven weeks out. The January figure of 1,000 pallets is still the figure, and the October review already put last year's shortfall at 180. Which stage of the continuous planning loop has failed?",
      "opts": [
        "Manage, because the depots are still loading trucks and filling orders nightly.",
        "Plan, because the January figure is never revised as evidence arrives.",
        "Monitor, because nobody counts the pallets a depot could not put on a truck.",
        "Analyze, because the shortfall is never set against what the plan assumed."
      ],
      "a": 1,
      "why": [
        "Managing is happening: the trucks load every night. The loop breaks where the week's evidence should change a plan.",
        "The analysis reached the planners and stopped there, which is the backward-looking budget the chapter describes.",
        "The exhibit records pallets staged, pallets needed and orders unfilled across three years, so the tracking is being done.",
        "The October review already sets the gap against the plan and prints it as a number; what is missing is anything acting on it."
      ]
    },
    {
      "q": "A Depot 12 supervisor orders chilled milk for Tuesday against a reorder point the depot system already holds, and Wednesday's shelf count shows whether the quantity was right. Where does that decision sit?",
      "opts": [
        "Semistructured, because demand at a depot varies from one Tuesday to the next.",
        "Unstructured, because last year's week-31 shortage is still being argued over.",
        "Semistructured, because the supervisor, not the system, signs off the order.",
        "Structured, because the procedure exists first and the result is checkable."
      ],
      "a": 3,
      "why": [
        "Variation in demand does not remove a procedure; a reorder point is written precisely to absorb that variation.",
        "A regional shortage changes what the planner stages, and it leaves the depot's own reorder rule intact for Tuesday.",
        "Who signs the order is not the test. The test is whether the procedure could be written down before Tuesday arrived.",
        "The procedure exists before the situation does, and the shelf shows within a day whether the quantity was right."
      ]
    },
    {
      "q": "Supply planning asks what sounds like the same question for all nine East depots across week 31. What has changed?",
      "opts": [
        "It is no longer structured, since no reorder point covers a peak week.",
        "Nothing has changed, since both questions ask how much chilled stock to order.",
        "It is now unstructured, since the shortage reaches contracts the whole firm depends on.",
        "It is now an executive decision, since a regional planner outranks a depot supervisor."
      ],
      "a": 0,
      "why": [
        "The same words describe a different decision: seven weeks out, across nine depots, with no procedure to apply.",
        "Scale and timing decide whether a procedure exists, and that is exactly what this second question measures.",
        "Week 31 comes round every year and a forecast already narrows it, which puts this in the semistructured middle.",
        "Seniority follows the decision rather than defining it, and a regional planner is not the executive level anyway."
      ]
    },
    {
      "q": "The board asks whether Fairmount should keep serving school kitchens. What can an analytics team honestly offer that decision?",
      "opts": [
        "A pricing rule that reprices the contracts whenever chilled costs move.",
        "A week-31 demand forecast, which settles how much the region should stage.",
        "A margin history for the contracts, and no recommendation past it.",
        "A tuned reorder point that stops the East depots running short in peak weeks."
      ],
      "a": 2,
      "why": [
        "Automatic repricing is a structured decision of its own and does not answer whether to serve the segment at all.",
        "The forecast sizes the staging decision seven weeks out; it says nothing about keeping these customers.",
        "No procedure produces this answer, so a system informs the argument and the board still makes the call.",
        "Tuning the reorder point improves execution of a decision the board has not yet agreed to keep making."
      ]
    }
  ],
  "debrief": "Two questions, one week. The loop failed at plan: the pallets were counted, the 180-pallet gap was written up, and the January figure of 1,000 stood anyway. The three decisions on the desk sit in three different places, so they take three different kinds of help: a reorder rule at the depot, a forecast for the planner, and nothing better than evidence for the board."
};
