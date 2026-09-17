/* Chapter 7 lesson and activity data. Rebuild with node src/build.mjs --module=modules/07. */
PROSE.s72b = "\n<span class=\"eyebrow\">Objective 7.2 · Part 2</span><h2>Reporting, dashboards, and asking what if</h2>\n<p class=\"lede\">The chief operating officer of Fairmount Provisions describes his job in one sentence: keep forty depots delivering on time without paying overtime to do it. He wants one screen he can read in the thirty seconds before a call. Six departments have sent him twelve candidate tiles, and six will fit. Which six you choose decides whether he ever opens it again.</p>\n<h3>Three usage models on one screen</h3>\n<p><b>Visualization</b> is the display of complex data relationships using a variety of graphical methods, so that a manager grasps the result of an analysis quickly. A <b>digital dashboard</b> is the everyday case: key performance indicators and other summary information, presented to the people who decide things.</p>\n<p>To give a decision maker the greatest benefit, a dashboard supports three usage models at once. A screen carrying only the first of them is a report with rounded corners. Read them as three different jobs:</p>\n<ul class=\"keys\"><li><b>Push reporting</b> sends the summary whether or not he asks for it, in the highly aggregated form an executive can scan for trends.</li><li><b>Exception reporting and alerts</b> tell him what needs attention right now, usually with conditional formatting doing the pointing for him.</li><li><b>Pull reporting</b> lets him drill down into an aggregate, or run his own self-service query, without filing a request with an analyst.</li></ul>\n<p>Notice what the third one does to your week. Without it, every follow-up question arrives as an email to you and comes back a day later. Drilling from profit by state into the one city actually carrying it is a thirty-second job for the executive holding the mouse.</p>\n<div class=\"activity\" data-activity=\"dashSort\"></div>\n<h3>The design elements, and what they can hide</h3>\n<p>Dashboards use maps, charts, sparklines and graphics shaped like traffic lights, thermometers or speedometers, because a shape is read faster than a figure. <b>Visual analytics</b> pushes that further, combining analysis techniques with interactive visualizations so that a person's knack for making sense of noisy data and a machine's capacity to retrieve and compute are used together rather than separately.</p>\n<p>Read faster also means wrong faster. Three chart habits mislead honest readers, and all three survive a review because every number underneath them is correct:</p>\n<ul class=\"keys\"><li><b>A truncated axis</b> starts the scale at 92% rather than zero, so a one-point dip in on-time delivery is drawn as a collapse.</li><li><b>A share without its base</b> reports that returns hit 40% of orders at a depot, omitting that the depot shipped five orders that day.</li><li><b>An average over a mix</b> reports a fleet-wide 96% on-time rate while two depots sit at 78% and thirty-eight quietly cover for them.</li></ul>\n<p>The defence is not a better chart. It is asking, every time, where the axis starts, what the denominator is, and what the average is averaging over.</p>\n<h3>The model behind the screen</h3>\n<p>A dashboard shows you what happened. A <b>decision support system</b> lets you interrogate what might. The chapter defines it as an interactive decision aid that uses <b>models</b> to manipulate data, and a model is just the formula: average past sales, adjust for the season, and that adjustment rule is the model.</p>\n<p>Fairmount's courier contract is up for renewal, and its model is one line: margin = drops × (price − cost per drop) − fixed costs. Fixed costs run $340,000 a quarter, a drop costs $29.00 to make, and the contract on the table is 52,000 drops. The board wants $440,000 of margin out of it.</p>\n<p>That single line answers four different questions, and the four have names worth keeping:</p>\n<ul class=\"keys\"><li><b>What-if analysis</b> makes a hypothetical change to one input and shows how the result moves when everything else holds.</li><li><b>Sensitivity analysis</b> weighs the input values by how likely each one is to occur, so probability becomes part of the answer.</li><li><b>Goal seeking</b> fixes the end state you want and works out how an input parameter has to change to reach it.</li><li><b>Optimisation</b> finds the best balance between parameters inside the constraints the business is actually operating under.</li></ul>\n<p>Same formula, four questions. Walk each of them through the contract before you price it.</p>\n<div class=\"activity\" data-activity=\"dashDiagram\"></div>\n<p>The chapter is blunt about the limit. A decision support system handles relatively simple analyses of structured data, and human judgement is still needed for the final decision. It computes; it does not decide. It is also only as honest as the input it holds still, which is the trap in the case below.</p>\n<div class=\"activity\" data-activity=\"dashCase\"></div>\n<h3>A screen nobody acts on</h3>\n<p>Value does not come from the dashboard. It comes from somebody changing what they do because of it. A screen that is accurate, refreshed hourly and never opened has returned nothing on what it cost to build, and the build was not cheap.</p>\n<p>Two questions tell you early whether that is the screen you are making. Ask them before the first tile is designed:</p>\n<ul class=\"keys\"><li><b>Whose decision is this?</b> A dashboard is built for one person's job, so a tile that belongs on the marketing manager's screen does not belong on an operations executive's.</li><li><b>What would change?</b> Name the action a red tile triggers this week, because a tile nobody can attach an action to is decoration and its alerts get ignored within a month.</li></ul>\n<p class=\"takeaway\">Push tells him that things are fine, exception tells him what is not, and pull lets him find out why without asking you. Behind all three sits one formula, and the four ways of asking it are only as honest as the number the model is quietly holding still.</p>\n";

ACT.dashSort = {
  "kind": "sort",
  "label": "Sort",
  "title": "Twelve tiles, three usage models, one screen",
  "objective": "7.2",
  "how": "Drop each candidate tile into the usage model it serves, or keep it off the screen entirely, then check. Six of the twelve belong on his screen. Read why each one lands where it does.",
  "buckets": [
    {
      "id": "push",
      "name": "Push reporting",
      "hint": "Arrives whether or not he asks. Highly aggregated indicators and trends."
    },
    {
      "id": "exception",
      "name": "Exception reporting and alerts",
      "hint": "Says what needs attention now, usually with conditional formatting pointing at it."
    },
    {
      "id": "pull",
      "name": "Pull reporting",
      "hint": "He drills down or runs his own query, without going through an analyst."
    },
    {
      "id": "off",
      "name": "Keep it off his screen",
      "hint": "Real data at the wrong grain, the wrong age, or for somebody else's job."
    }
  ],
  "items": [
    {
      "t": "On-time delivery rate by depot against target, this week",
      "b": "push",
      "why": "The single number his job is measured on, aggregated to the level he manages, arriving whether or not he asks."
    },
    {
      "t": "Lanes that missed their delivery window twice running, flagged red",
      "b": "exception",
      "why": "Conditional formatting doing the pointing. Without a tile like this the screen only ever tells him things are fine."
    },
    {
      "t": "A depot map he can click into one depot's day",
      "b": "pull",
      "why": "Drill-down from the aggregate to the detail behind it, which is how he finds out where without filing a request."
    },
    {
      "t": "Fill rate as a thirteen-week sparkline",
      "b": "push",
      "why": "A direction of travel is a different fact from this week's value, and a sparkline carries it in the space of a line."
    },
    {
      "t": "Overtime hours against budget by depot, over-budget bars in red",
      "b": "exception",
      "why": "The constraint in his brief, formatted so the depots that broke it stand out instead of all forty being listed."
    },
    {
      "t": "A box where he types any depot and date range to total spoilage",
      "b": "pull",
      "why": "A self-service ad hoc query, which is how he answers the question the dashboard designer did not anticipate."
    },
    {
      "t": "A table of every driver's full twelve-month shift history",
      "b": "off",
      "why": "Detail without aggregation and nothing to interrogate, so it is neither a summary nor a drill path. That depth belongs one click behind a tile, not on one."
    },
    {
      "t": "A live feed of all 90,000 delivery scans",
      "b": "off",
      "why": "Not aggregated. An executive screen exists so information arrives summarised, and a raw feed is the opposite of that."
    },
    {
      "t": "Last year's audited profit and loss statement",
      "b": "off",
      "why": "Accurate and important, at the wrong grain and the wrong age for a decision he has to make this week."
    },
    {
      "t": "Delivery volume by postcode as a fourteen-slice pie chart",
      "b": "off",
      "why": "Fourteen slices cannot be compared by eye, so this graphic is read slower than the table of numbers it replaced."
    },
    {
      "t": "Email campaign click-through by customer segment",
      "b": "off",
      "why": "Somebody's real tile, but not his. A dashboard is built for one decision maker's job, and this is the marketing manager's."
    },
    {
      "t": "A share price ticker",
      "b": "off",
      "why": "The firm is privately held, so the tile would be blank, and a listed firm's ticker still would not change his week."
    }
  ]
};

ACT.dashDiagram = {
  "kind": "diagram",
  "label": "Interactive diagram",
  "title": "One formula, asked four ways",
  "objective": "7.2",
  "how": "Select each tab to see the same contract model asked a different question. Read the boxes left to right, then the notes beneath them.",
  "models": [
    {
      "id": "0",
      "name": "What-if analysis",
      "site": "Change one input, hold everything else still, and watch the result move.",
      "boxes": [
        {
          "t": "Held still",
          "w": "Price $44.00 and 52,000 drops",
          "c": "a"
        },
        {
          "t": "Moved",
          "w": "Cost per drop $29.00 to $32.20",
          "c": "b"
        },
        {
          "t": "Read off",
          "w": "The margin the model now returns",
          "c": "c"
        },
        {
          "t": "Answer here",
          "w": "$273,600, down $166,400",
          "c": "d"
        }
      ],
      "points": [
        "An 18% fuel rise adds $3.20 to the cost of a drop. Across 52,000 drops that is $166,400 of margin gone, from one input nobody controls.",
        "What-if tells you which inputs the answer is actually made of. Move one and watch nothing happen, and you can stop worrying about that one."
      ]
    },
    {
      "id": "1",
      "name": "Sensitivity analysis",
      "site": "Weigh each possible input value by how likely it really is, then read the expected result.",
      "boxes": [
        {
          "t": "Held still",
          "w": "Price $44.00 and 52,000 drops",
          "c": "a"
        },
        {
          "t": "Weighted",
          "w": "Fuel 30% up, 50% flat, 20% down",
          "c": "b"
        },
        {
          "t": "Read off",
          "w": "Each margin times its probability",
          "c": "c"
        },
        {
          "t": "Answer here",
          "w": "$401,000, not the $440,000 on paper",
          "c": "d"
        }
      ],
      "points": [
        "The scenario everybody quotes is the middle one, and it is only half likely. Weighting all three gives $401,000, which is $39,000 under the board's target.",
        "This is what sensitivity analysis is for: how likely an input is forms part of the answer rather than context printed beside it."
      ]
    },
    {
      "id": "2",
      "name": "Goal seeking",
      "site": "Fix the end state you want and run the model backwards to the input that produces it.",
      "boxes": [
        {
          "t": "Held still",
          "w": "Cost $29.00 and 52,000 drops",
          "c": "a"
        },
        {
          "t": "Fixed",
          "w": "The $440,000 margin the board wants",
          "c": "b"
        },
        {
          "t": "Solved for",
          "w": "The price per drop that gets there",
          "c": "c"
        },
        {
          "t": "Answer here",
          "w": "$44.00, which is $15.00 over cost",
          "c": "d"
        }
      ],
      "points": [
        "$440,000 of target plus $340,000 of fixed cost is $780,000 of contribution. Over 52,000 drops that is $15.00 a drop above the $29.00 it costs to make one.",
        "Look at what this one holds still. It assumes 52,000 drops at a price that helps decide how many drops you win, and the case below takes that apart."
      ]
    },
    {
      "id": "3",
      "name": "Optimisation",
      "site": "Find the best balance between the parameters, inside the constraints you are actually under.",
      "boxes": [
        {
          "t": "Constraints",
          "w": "Fleet carries 62,000 drops, rival quotes $47.00",
          "c": "a"
        },
        {
          "t": "Linked",
          "w": "Each $1.00 of price costs about 3,700 drops",
          "c": "b"
        },
        {
          "t": "Searched",
          "w": "Every price inside both limits",
          "c": "c"
        },
        {
          "t": "Answer here",
          "w": "$43.00, worth $385,200 a quarter",
          "c": "d"
        }
      ],
      "points": [
        "Below about $40.25 the fleet fills before the demand does, so the extra volume a lower price buys cannot be carried anyway. That is a constraint, not a preference.",
        "Above $43.00 each further dollar of price costs more drops than it earns. Optimisation is that balance, not the maximum of any one parameter."
      ]
    }
  ]
};

ACT.dashCase = {
  "kind": "case",
  "label": "Mini case",
  "title": "Price the courier contract",
  "objective": "7.2",
  "how": "Study the hypothetical case and its invented figures. Make every decision to unlock the debrief; read the explanation for each option.",
  "brief": "Fairmount Provisions is an invented regional distributor of food and household goods. Its courier contract is up for renewal at 52,000 drops a quarter. Fixed costs run $340,000 a quarter, each drop costs $29.00 to make, and the board wants $440,000 of quarterly margin out of the deal. Nobody knows what fuel will do next.",
  "facts": [
    {
      "k": "The model",
      "v": "margin = drops × (price − cost per drop) − fixed costs"
    },
    {
      "k": "Fixed costs",
      "v": "$340,000 a quarter"
    },
    {
      "k": "Contract on the table",
      "v": "52,000 drops a quarter"
    },
    {
      "k": "Cost of making a drop",
      "v": "$29.00 at today's fuel price"
    },
    {
      "k": "Board's margin target",
      "v": "$440,000 a quarter"
    }
  ],
  "exhibit": {
    "name": "What the model returns at $44.00 a drop",
    "caption": "Invented practice figures. Each margin is 52,000 drops × (price − cost per drop) − $340,000.",
    "headers": [
      "Fuel scenario",
      "Cost per drop",
      "How likely",
      "Quarterly margin"
    ],
    "rows": [
      [
        "Fuel rises 18%",
        "$32.20",
        "30%",
        "$273,600"
      ],
      [
        "Fuel unchanged",
        "$29.00",
        "50%",
        "$440,000"
      ],
      [
        "Fuel falls 6%",
        "$27.95",
        "20%",
        "$494,600"
      ]
    ]
  },
  "questions": [
    {
      "q": "Goal seeking. Fuel holds, so a drop costs $29.00, and the contract runs 52,000 drops. What price per drop lands exactly on the board's $440,000?",
      "opts": [
        "$35.54, which covers the $29.00 cost plus all of the $340,000 of fixed cost.",
        "$37.46, which covers the $29.00 cost plus the $440,000 the board wants.",
        "$44.00, which covers the cost, the fixed costs and the target together.",
        "$52.00, which clears the $440,000 target with room to spare."
      ],
      "a": 2,
      "why": [
        "This price covers the cost of the drops and the fixed costs and nothing else, leaving the target unfunded.",
        "This adds the target to the cost but forgets the $340,000 of fixed cost, which has to be earned first.",
        "$440,000 of target plus $340,000 of fixed cost is $780,000 of contribution, which over 52,000 drops is $15.00 a drop above cost.",
        "At $52.00 the model returns $856,000, which clears the target instead of landing on it, and goal seeking asks for the input that hits the number."
      ]
    },
    {
      "q": "Sensitivity. At $44.00 a drop and the same 52,000 drops, weighted by how likely each fuel scenario is, what margin should you expect?",
      "opts": [
        "$401,000, weighting each scenario's margin by the chance it happens.",
        "$440,000, the margin unchanged fuel returns and the likeliest single outcome.",
        "$402,733, the plain average of the three scenario margins in the exhibit.",
        "$273,600, the margin if fuel rises, because a plan should assume the worst."
      ],
      "a": 0,
      "why": [
        "Thirty per cent of $273,600, half of $440,000 and a fifth of $494,600 add up to $401,000.",
        "The likeliest outcome is still only half likely, so quoting it ignores the other half of the picture.",
        "A plain average treats the 20% scenario as though it were as likely as the 50% one.",
        "Planning on the worst case understates the expectation by $127,400 and would price the contract out of reach."
      ]
    },
    {
      "q": "Volume answers to price: at $44.00 the contract wins about 48,100 drops, not the 52,000 the goal seek held still. What does that mismatch tell you?",
      "opts": [
        "The demand relationship must be wrong, because a signed contract makes the volume a fact.",
        "Raise the price to the rival's $47.00 ceiling, since fatter margins cover the missing drops.",
        "Nothing important, because goal seeking solves for an input rather than for a volume.",
        "It held still a number that price itself decides, so its answer was unreachable."
      ],
      "a": 3,
      "why": [
        "Nothing is signed yet: 52,000 drops is the volume on the table, and the price you quote is what decides it.",
        "At $47.00 the same relationship leaves 37,000 drops and $326,000 of margin, so a fatter margin on fewer drops is worse.",
        "The mismatch is the whole finding, not a detail: goal seeking solved for price while holding still a volume that price decides.",
        "A model is only as honest as what it holds still, and this one held still an output of its own input."
      ]
    },
    {
      "q": "Optimisation. With volume answering to price and a drop still costing $29.00, $40.00 wins the fleet's full 62,000 drops and $43.00 wins 51,800. Which do you quote?",
      "opts": [
        "$40.00, because filling the fleet's 62,000 drops spreads the fixed costs widest.",
        "$43.00, because $385,200 of margin beats the $342,000 that $40.00 returns.",
        "$40.00, because the lower price keeps a rival from taking the contract away.",
        "Neither, because the fleet limit caps what this contract can earn either way."
      ],
      "a": 1,
      "why": [
        "62,000 drops at $11.00 of contribution is $682,000, which leaves $342,000 once fixed costs come out.",
        "51,800 drops at $14.00 of contribution is $725,200, and $385,200 after the $340,000 of fixed cost.",
        "Both prices sit well under the rival's $47.00 quote, so that argument does not separate the two.",
        "The fleet limit binds below about $40.25 only; above it the demand relationship is what caps volume."
      ]
    }
  ],
  "debrief": "Every answer above came out of one line of arithmetic, asked a different way. The figure to carry out of here is the gap: $44.00 hits the board's $440,000 exactly on paper, and the probability-weighted expectation is $401,000, which is $39,000 short. A plan built on the middle scenario is wrong half the time, and in three cases out of ten it is wrong in the expensive direction. No amount of computation catches that. A person has to notice what the model is holding still."
};
