/* Chapter 7 lesson and activity data. Rebuild with node src/build.mjs --module=modules/07. */
PROSE.s76 = "\n<span class=\"eyebrow\">Objective 7.6 · Application 7.6</span><h2>Recommend one analytics initiative</h2>\n<p class=\"lede\">Nobody approves analytics. A manager approves a change to a decision that is currently going wrong, at a price that recurs every year, with a date on which somebody says whether it worked. This closing application turns the whole chapter into one recommendation you could defend in a meeting.</p>\n<div class=\"callout info\"><b>Application supplement.</b> Fairmount Provisions and every figure below are hypothetical and invented for practice. The section applies Chapter 7's vocabulary and ordinary cost reasoning to a decision a manager really faces; it is not one of the chapter's own objectives.</div>\n<h3>Name the decision, not the software</h3>\n<p>\"We need a forecasting platform\" is a purchase, not a problem. A problem statement names the decision that goes wrong, who makes it, how often, and what one failure costs. Written that way, the same situation reads: the weekly chilled replenishment order for the twelve East depots ran short 96 times in 624 orders last year, at about $1,150 each in emergency transfers and credits.</p>\n<p>That sentence does real work. It names a decision that repeats, which is the chapter's own test for a machine learning candidate: repetitive, and settled by data rather than judgement. It can be checked, because anyone may go and count the 96. And it prices the problem at roughly $110,400 a year, which is the yearly loss every cost in your proposal gets weighed against.</p>\n<h3>Say which of the four questions you are asking</h3>\n<p>Next, say what the system would actually have to produce, and put that on the decision-making continuum. The four kinds are not four brands of one thing. Three end at a person who still has to decide; only the fourth reaches the action, and only sometimes.</p>\n<ul class=\"keys\"><li><b>Descriptive</b> summarises what already happened, and it is where every other kind of analysis has to start.</li><li><b>Diagnostic</b> looks for correlations or causes in past data, so a mistake is not repeated or a success is.</li><li><b>Predictive</b> forecasts a likely future outcome, and a person still decides what to do about the forecast.</li><li><b>Prescriptive</b> recommends the best course of action, and at its far end takes the human out of the loop.</li></ul>\n<p>Then write your own sentence out in full: predict the pallets of chilled stock each East depot will sell next week, so the buyer's Thursday order is placed against a forecast rather than last week's figure. That is predictive analytics feeding a human decision. Say so plainly. A board that believes it approved automation and received a forecast will feel misled by month three.</p>\n<h3>The trap: accurate and useless</h3>\n<p>Here is the failure that survives a workflow followed stage by stage to the letter. A model can be measured honestly, on records it has never seen, report a fine accuracy, and still be worth nothing, because nobody does anything differently when it is right.</p>\n<p>So ask the question out loud. Who reads this number, on what day, and what do they do differently because of it? If sales already telephones every account on the churn list, the score changes no action at all, and the running cost has bought a tile on a dashboard. A prediction with no decision attached is a hobby.</p>\n<div class=\"activity\" data-activity=\"planCase\"></div>\n<h3>Price what recurs, not what you sign</h3>\n<p>The quoted licence is the smallest number in the file and the only one anybody remembers afterwards. A model is not bought once. It is kept, fed and repaired.</p>\n<p>A three-year figure a finance committee can trust adds up at least these lines:</p>\n<ul class=\"keys\"><li><b>Data you do not already hold</b> is paid for in every year it is used, and an hourly regional weather feed is bought again in each of them.</li><li><b>Acquiring and cleaning</b> often takes months, and organizations are regularly surprised by how much of the data turns out to be unusable.</li><li><b>Labelling</b> pays for the ground truth a supervised model learns from, and for checking that those labels are actually right.</li><li><b>Retraining and monitoring</b> pays for the years after launch, when performance is re-evaluated and the model is refitted as conditions change.</li><li><b>Changing the work</b> pays to alter the process, retrain the buyers, and put the forecast where the order is actually placed.</li></ul>\n<p>That last line is where analytics projects die quietly. A forecast emailed at six in the evening to a buyer who places the order at two in the afternoon is a correct answer delivered too late to be used.</p>\n<h3>Say what would make it fail</h3>\n<p>Write the risks into the paper before somebody else writes them down for you. The list is short and unglamorous, and every item on it is cheaper to prevent than to explain:</p>\n<ul class=\"keys\"><li><b>A threshold set afterwards</b> lets the bar slide down to whatever the model happened to score, so the test proves nothing.</li><li><b>Accuracy measured on training rows</b> reports a wonderful number that says nothing about the weeks the model has never seen.</li><li><b>Inherited bias</b> means the model learns what past decisions contained rather than what was right, and then repeats it at scale.</li><li><b>A prediction read as a fact</b> hides the error rate, and every error left in it reaches somebody under your company's name.</li><li><b>Oversight left unpriced</b> hides the cheapest question in the proposal, which is what a reviewer costs against the errors that reviewer catches.</li></ul>\n<p>Price that last one in the same paragraph. Where an agent picks the customer remedy, a reviewer standing at that step costs about $18,000 a year and catches nine wrong remedies in ten, against errors that cost $2,400 apiece. Written that way, the argument is arithmetic rather than temperament.</p>\n<div class=\"activity\" data-activity=\"planSim\"></div>\n<h3>Fix the evidence before the work starts</h3>\n<p>Pick the measure now, while you can still be wrong in public. Fix the baseline: 15.4 shortfalls per 100 weekly chilled orders. Fix the denominator, so a mild summer is not mistaken for improvement. Fix the target and the date: under 6 per 100, reviewed twenty-six weeks after the forecast reaches the buyers.</p>\n<p>Set the performance bar in the same breath, and set it before you have seen a result. A dispatch team that refuses a lateness tool below 85% accuracy has done this correctly. Name your buyers' bar while the number is still hypothetical, then name the guardrails, because a shortfall figure that falls while chilled write-offs double has only moved the loss.</p>\n<p>Last, write the decision rule. If the number has not moved by week twenty-six, what happens: retrain, revert to the old order sheet, or stop? A project with no stopping condition does not end. It only gets quieter.</p>\n<div class=\"activity\" data-activity=\"planSelfcheck\"></div>\n<p class=\"takeaway\">A recommendation a manager can approve names a decision that is going wrong and how often, states which of the four questions the system answers and who acts on the answer, prices the years after the first one, lists the ways it fails, and fixes a baseline, a target and a date before anyone writes a line of code.</p>\n";

ACT.planCase = {
  "kind": "case",
  "label": "Mini case",
  "title": "One budget, three proposals",
  "objective": "7.6",
  "how": "Read the brief, the facts and the exhibit, and use the section you have just read. Every decision here is settled by the figures shown, by the kind of question a proposal answers, or by the decision it changes — never by which one sounds most advanced.",
  "brief": "Fairmount Provisions is a hypothetical regional food and household goods distributor running forty depots. The board has funded one analytics initiative, up to $180,000 across three years, and has named its priority: the East depots must stop running short of chilled stock.",
  "facts": [
    { "k": "Decision under review", "v": "The weekly chilled replenishment order for the twelve East depots" },
    { "k": "Times that order ran short last year", "v": "96 of 624, or 15.4 per 100" },
    { "k": "Cost of one shortfall", "v": "$1,150 in emergency transfers and customer credits" },
    { "k": "Cost of the problem each year", "v": "About $110,400" },
    { "k": "Approved for one initiative", "v": "$180,000 across three years" }
  ],
  "exhibit": {
    "name": "Three proposals, priced to build and to keep",
    "caption": "Invented figures for this practice case only.",
    "headers": ["Proposal", "Kind of analytics", "Build, year one", "Running cost each year", "Decision it changes"],
    "rows": [
      ["A. Weekly chilled write-off report, by product line and by day", "Descriptive", "$24,000", "$9,000", "None named; it is read and filed"],
      ["B. Week-ahead chilled demand forecast for each East depot", "Predictive", "$86,000", "$29,000", "The buyer's Thursday pallet order"],
      ["C. Churn score for every restaurant account", "Predictive", "$54,000", "$38,000", "None named; sales calls them all anyway"]
    ]
  },
  "questions": [
    {
      "q": "The shortfalls cost about $110,400 a year. What is that figure for in the paper?",
      "opts": [
        "It is the yearly loss every cost in the proposal gets weighed against.",
        "It is the saving the board can expect in the first year the forecast runs.",
        "It is the money the board has approved for the initiative over three years.",
        "It is proof that the shortfalls are the largest single loss in the East."
      ],
      "a": 0,
      "why": [
        "96 shortfalls at $1,150 prices the problem, and a fix costing more than the problem is not a fix.",
        "A forecast removes some of the shortfalls, not all of them, so the saving is the smaller number.",
        "The board approved $180,000 for the initiative; $110,400 is what the problem costs it each year.",
        "Nothing in the facts or the exhibit compares the East shortfalls with any other loss in the region."
      ]
    },
    {
      "q": "Proposal C scores 91% on accounts it has never seen. Proposal B lands within one pallet 78% of the time. Why is C still the weaker recommendation?",
      "opts": [
        "Because the accuracy was measured on the rows the model learned from.",
        "Because sales already calls every one of those accounts, score or no score.",
        "Because a forecast of orders beats a forecast of customer behaviour.",
        "Because churn is a diagnostic question that this proposal answers as prediction."
      ],
      "a": 1,
      "why": [
        "That would be a real defect, but the stem measures C on accounts the model had not seen.",
        "Nobody acts differently when the score is right, so an accurate model buys no change at all.",
        "The kind of analytics does not rank proposals; the decision each one changes is what ranks them.",
        "Asking which accounts will stop ordering next quarter is a forecast, so predictive is the correct label."
      ]
    },
    {
      "q": "Proposal B forecasts the pallets each East depot will sell, and the buyer then places Thursday's order. Which label is right?",
      "opts": [
        "Prescriptive, because the forecast is what settles how many pallets get ordered.",
        "Prescriptive, because an output that changes an action has reached the action.",
        "Predictive, because it forecasts sales and the buyer still decides the order.",
        "Diagnostic, because it explains why the East depots have been running short."
      ],
      "a": 2,
      "why": [
        "The forecast is a sales number rather than an order quantity, and the buyer turns one into the other.",
        "The first three kinds all reach an action through a person, which is what decision support means.",
        "A forecast of a future outcome, with a human choosing the response, is the chapter's predictive case.",
        "Diagnostic analytics looks backwards for causes, and a week-ahead number is a forecast instead."
      ]
    },
    {
      "q": "Proposal B's row shows $29,000 a year to run. What is that money buying?",
      "opts": [
        "The $86,000 build, spread evenly across the three years the board approved.",
        "Analyst time the depots already pay for, so it is not really a new cost.",
        "Very little in year one, because a new model needs little attention at first.",
        "Bought data, retraining and monitoring, and the change to how buyers order."
      ],
      "a": 3,
      "why": [
        "Spreading the build across three years renames it; the $86,000 is already quoted on its own line.",
        "A cost another budget carries is still a cost of this initiative, and hiding it is how year two surprises everyone.",
        "A live model is re-evaluated and retrained from the first year, because conditions start changing the day it deploys.",
        "External data, retraining, monitoring and the change to the work all recur, which is what a running cost is."
      ]
    }
  ],
  "debrief": "Three years of Proposal B costs $86,000 to build and $29,000 a year to keep, which is $173,000. If shortfalls fall from 15.4 per 100 to under 6, that is about 59 fewer shortfalls a year at $1,150 each, roughly $67,850 a year or $203,550 over the same three years. The margin is real, and thinner still because the first year's saving is part of a year rather than all of it, which is exactly why the baseline, the target and the review date go on paper before anyone starts. Proposal C is the more accurate model and the weaker recommendation, because nobody changes what they do when it is right."
};

ACT.planSim = {
  "kind": "sim",
  "label": "Decision walkthrough",
  "title": "Build the recommendation, one line at a time",
  "objective": "7.6",
  "how": "Write the recommendation in order, from the problem statement to the evidence plan. Choose at each step and read what the choice costs you before moving on.",
  "intro": "You have twenty minutes with the chief operating officer and one page to fill. The hypothetical figures are the ones from the mini case.",
  "steps": [
    {
      "situation": "You have one opening sentence for the board paper. Which one do you write?",
      "opts": [
        {
          "t": "Fairmount needs a modern demand-planning platform in the East before next summer.",
          "ok": false,
          "out": "This names a purchase. The first question back is what it is for, and you begin the conversation again with less time left."
        },
        {
          "t": "The weekly chilled order for twelve East depots ran short 96 times in 624.",
          "ok": true,
          "out": "A repeated decision, with a count and a denominator. Anyone in the room may go and check it, which is what makes it approvable."
        },
        {
          "t": "Chilled availability in the East has been unacceptable for two years running.",
          "ok": false,
          "out": "An adjective standing in for a figure. Nobody can price unacceptable, and nobody can tell later whether it improved."
        }
      ]
    },
    {
      "situation": "Now say what the system would actually produce. Which line goes on the page?",
      "opts": [
        {
          "t": "An artificial intelligence capability for supply planning across all forty depots.",
          "ok": false,
          "out": "A class of technology, scoped to the whole company. It cannot be quoted, staffed or finished, and it gets cut in review."
        },
        {
          "t": "A dashboard of last week's chilled sales by depot and by product line.",
          "ok": false,
          "out": "That is descriptive analytics, summarising the week that has gone. It answers a different question from the one the board asked."
        },
        {
          "t": "A predicted pallet count for each East depot on Wednesday, for Thursday's order.",
          "ok": true,
          "out": "Predictive analytics, with the day, the unit and the human decision it feeds all named in a single sentence."
        }
      ]
    },
    {
      "situation": "Finance asks what it costs. Which answer do you give?",
      "opts": [
        {
          "t": "$86,000 to build it, which is the quote the analytics team has already prepared.",
          "ok": false,
          "out": "The build is the part that ends. The weather feed, the retraining and the monitoring recur, and next year they arrive as a surprise."
        },
        {
          "t": "$86,000 to build and $29,000 a year to run, so $173,000 over three years.",
          "ok": true,
          "out": "One number to approve now and one to plan around. Nothing in the second year arrives as an unbudgeted request."
        },
        {
          "t": "Less than the shortfalls cost us, so the exact figure matters less than the delay.",
          "ok": false,
          "out": "A payback claim with no cost behind it cannot be audited, and the committee is left with nothing it can actually approve."
        }
      ]
    },
    {
      "situation": "The board asks what would make this fail. What goes in the paper?",
      "opts": [
        {
          "t": "A bar set after the result, accuracy off training rows, a forecast nobody uses.",
          "ok": true,
          "out": "Three failures named while there is still time to design against them, rather than explained afterwards."
        },
        {
          "t": "Little can go wrong here: the data is ours and the method is well understood.",
          "ok": false,
          "out": "Owning the data does not set a threshold, clean the records, or put the forecast in front of the buyer before the order goes."
        },
        {
          "t": "We will open a risk log once the model is live and the first misses start to appear.",
          "ok": false,
          "out": "Risks named after launch cannot change the plan. By then the threshold is whatever the model happened to score."
        }
      ]
    },
    {
      "situation": "Last line on the page: how will anyone know whether it worked?",
      "opts": [
        {
          "t": "The model's accuracy on the held-back weeks, reported to the board each month.",
          "ok": false,
          "out": "Accuracy describes the model, not the shortfalls. A forecast can be right every week while the order is still placed the old way."
        },
        {
          "t": "The East buyers will tell us in the spring whether the forecast has helped them.",
          "ok": false,
          "out": "Impressions run high after training, and they cannot separate a real gain from a mild summer and a quiet quarter."
        },
        {
          "t": "Shortfalls per 100 weekly chilled orders, from 15.4 to under 6 by week 26.",
          "ok": true,
          "out": "Baseline, denominator, target and date, all fixed before the build, so the review can honestly go either way."
        }
      ]
    }
  ]
};

ACT.planSelfcheck = {
  "kind": "selfcheck",
  "label": "Readiness check",
  "title": "Does your recommendation have every part?",
  "objective": "7.6",
  "how": "Hold your own one-page recommendation beside this list. Mark what you can defend without notes, and use each hint on what you cannot.",
  "items": [
    {
      "t": "I name a decision that is going wrong, and how often it goes wrong.",
      "hint": "Reread your first sentence. If it names a tool before it names a repeated decision, write it again with a count."
    },
    {
      "t": "I say which of the four kinds of analytics this initiative is.",
      "hint": "Descriptive says what happened, diagnostic why, predictive what will happen, prescriptive what to do about it."
    },
    {
      "t": "I name the person who acts differently, on what day, because of the output.",
      "hint": "A model nobody acts on is worth nothing however accurate it is. Name the buyer, the shift and the order it changes."
    },
    {
      "t": "I give a build cost and the running cost that follows it every year.",
      "hint": "Add the data you buy each year, the cleaning and labelling, the retraining and monitoring, and the change to the work."
    },
    {
      "t": "I set the performance threshold before anyone has seen a result.",
      "hint": "Write down the accuracy below which your users will keep doing it by eye, while that number is still hypothetical."
    },
    {
      "t": "I say how the model was tested, and on which records.",
      "hint": "Accuracy measured on the rows the model learned from is not evidence. Quote the score on data it has never seen."
    },
    {
      "t": "I state a baseline, a denominator, a target and a review date.",
      "hint": "A measure chosen after the results arrive settles nothing. Fix all four before the build, not after go-live."
    },
    {
      "t": "I name the guardrails that must not get worse while the headline number improves.",
      "hint": "Chilled write-off kilos and the average cost of a shortfall are the two that would hide a loss here."
    },
    {
      "t": "I price the human oversight against the cost of the errors it catches.",
      "hint": "A reviewer costs a fixed amount a year; each mistake that reaches a customer costs its own amount. Show the arithmetic."
    },
    {
      "t": "I write the decision rule for the day the number has not moved.",
      "hint": "Retrain, revert, or stop. A project with no stopping condition does not end, it only gets quieter."
    }
  ]
};
