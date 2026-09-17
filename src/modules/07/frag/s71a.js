/* Chapter 7 lesson and activity data. Rebuild with node src/build.mjs --module=modules/07. */
PROSE.s71a = "\n<span class=\"eyebrow\">Objective 7.1 · Part 1</span><h2>Four kinds of analytics, and which can act on its own</h2>\n<p class=\"lede\">Eight requests land on your desk in your first week at Fairmount Provisions, an invented regional distributor of food and household goods running forty depots and eleven hundred staff. Not one of them says what kind of analysis it wants. Each describes a problem and stops. Before you can build anything you have to know which of four questions a request is actually asking, because the four need different tools, different budgets and different amounts of human judgement afterwards.</p>\n<h3>Four questions, in the order a decision maker asks them</h3>\n<p>Business analytics answers four questions about the same business, and the chapter arranges them as a continuum. Each one takes you a step further from the record and a step closer to the action.</p>\n<ul class=\"keys\"><li><b>Descriptive analytics</b> summarizes and describes past data to establish what happened, and it is the foundation the other three are built on.</li><li><b>Diagnostic analytics</b> looks for the correlations or causal relationships inside past data, so that a mistake is not repeated or a success is.</li><li><b>Predictive analytics</b> forecasts a likely future outcome, such as the sales of one product in one region over the next quarter.</li><li><b>Prescriptive analytics</b> analyzes the possible scenarios and recommends the best course of action, and at its far end takes that action itself.</li></ul>\n<p>The chapter's own examples are deliberately ordinary. A sales manager wants the sales of one product in one period by one salesperson, which is descriptive. Understanding the seasonality of demand, or the demographics of the buyers, explains why a launch succeeded or failed, which is diagnostic.</p>\n<p>Sorting an inbox is not a vocabulary exercise, because the department that wrote the request almost never uses any of these four words. Ask instead where the answer lives: in a month that has finished, in a relationship inside that month, in a month that has not happened yet, or in an action somebody has to take tonight.</p>\n<p>Getting it wrong is expensive in an unglamorous way. A request filed under the wrong kind is built with the wrong tool and then built again, so the firm pays for a build nobody uses. The four builds costed later in this section average $64,500, and finance prices a misfile across all eight requests at about $60,000.</p>\n<div class=\"activity\" data-activity=\"kindsSort\"></div>\n<h3>Where the human stands, and where one does not</h3>\n<p>Descriptive and diagnostic analytics both look backwards. They give a detailed picture of the current state of the business, and the chapter is blunt that this provides only limited input into a decision. You know what happened and why, and you still have to decide.</p>\n<p>Predictive analytics provides more input by naming what is likely. Even then, human input remains essential for determining the best course of action. A demand forecast does not say how much marketing budget to allocate against it, how many pallets to order, or which customer to call first.</p>\n<p>Prescriptive analytics is the only one of the four that reaches the action, and it does so in two quite different ways. Each of the two carries a failure worth naming beside it.</p>\n<ul class=\"keys\"><li><b>Decision support</b> hands a manager a recommended course of action, which that manager can accept, amend or refuse.</li><li><b>Decision automation</b> takes the human out of the loop and lets the system act on its own recommendation.</li><li><b>A prediction nobody acts on</b> changes nothing, which is why a forecast is usually paired with a decision about what to do with it.</li><li><b>An automated decision with a weak model behind it</b> repeats that model's mistakes at scale, politely, and under your company's name.</li></ul>\n<p>The chapter's example of the automated end is a ride-hailing service that combines predictive and prescriptive analytics to set its own fares. The price rises on its own when demand is predicted to increase, after a concert or during bad weather, which in theory pulls more drivers to where that demand is.</p>\n<p>Notice what the automation did not remove. Somebody chose that fares should follow predicted demand, chose how far they may move, and answers for it when the rule embarrasses the company. Automating a decision moves the human earlier in the process rather than deleting them.</p>\n<div class=\"activity\" data-activity=\"kindsMatch\"></div>\n<h3>What a data-driven organization actually is</h3>\n<p>Organizations that make decisions which can be backed up with verifiable data are called <b>data-driven organizations</b>. The research the chapter cites finds them measurably more productive and profitable, better able to respond to ongoing threats and opportunities, and better able to plan for the future.</p>\n<p>There is a second effect that will reach you sooner than the profit figure. When data backs a decision, the decision can be pushed lower into the organization. A depot manager holding a reliable forecast does not have to escalate, which frees senior management time for the decisions only that level can make.</p>\n<p>Having the right tools is not sufficient. Three things have to be true besides the software, and a company missing any of them owns an expensive system and little else.</p>\n<ul class=\"keys\"><li><b>Integrated information</b> has to exist, because the missing figure is usually sitting already in disconnected spreadsheets, reports and databases.</li><li><b>Data literacy</b>, the ability to organize, analyze and communicate with data, is a skill every business user needs rather than the analysts' private specialism.</li><li><b>Judgement and creativity</b> are what translate an insight into an action, since no analysis on its own decides what the company should do next.</li></ul>\n<h3>The weather these decisions get made in</h3>\n<p>External factors create opportunities and threats in the same movement, and the chapter insists on that pairing because managers tend to file each factor under one heading or the other.</p>\n<ul class=\"keys\"><li><b>Globalization</b> opens new markets to compete in while exposing the firm to new competitors and to geopolitical turmoil.</li><li><b>Consumer access to information</b> through social media and mobile devices makes switching to a competitor easier than it has ever been.</li><li><b>Regulation</b>, such as the Sarbanes-Oxley Act that followed large corporate and banking failures, adds reporting requirements a firm must satisfy.</li><li><b>Shorter product life cycles</b> force companies to develop new products faster and to answer changing conditions quickly.</li></ul>\n<p>With pressure to reduce costs, money goes to the systems that pay back the most, and pay it back soonest. These tools return quickly for three plain reasons: they put the right information in front of the right person in time to react, they leverage the enterprise systems already paid for, and they help retain the most profitable customers.</p>\n<h3>What the systems themselves cost to run</h3>\n<p>There is one more cost, and the chapter files it as a sustainability question rather than a line on an invoice. AI is genuinely useful for sustainability, an approach sometimes called Green-by-AI: predicting energy demand, tuning building lighting and heating, optimizing traffic flows and transit routes, and cutting waste in agriculture through more precise use of seed, fertilizer and water.</p>\n<p>The same systems carry a footprint of their own, and it is not a small one.</p>\n<ul class=\"keys\"><li><b>Energy</b> is consumed in tremendous amounts by training and running these models, and by generative models most of all.</li><li><b>Carbon</b> depends on what powers the data center, so the same model is not equally clean in every location.</li><li><b>Water and waste heat</b> matter because data centers need large volumes of water for cooling and give off heat.</li><li><b>Raw materials and e-waste</b> arrive at both ends, in producing the processors and again in disposing of them.</li></ul>\n<p>The answer the chapter describes, Green-in-AI, tries to shrink that footprint without losing the performance that makes the green applications work. Smaller language models trained on smaller, more specific data sets need fewer resources and may do better on a narrow task. Statistical techniques can cut model size or make training more efficient. Renewable power and more efficient processors relieve some of what is left.</p>\n<p>Bring that back to your inbox. The four kinds do not cost the same to run, and here the expensive ones are the ones that run without you. A monthly summary reads records you already keep. A model that issues a loading plan for forty depots retrains and runs every night, and its bill arrives every night too.</p>\n<div class=\"activity\" data-activity=\"kindsCase\"></div>\n<p class=\"takeaway\">Ask what the answer will change before asking which tool produces it. Descriptive, diagnostic and predictive work all end at a person who still has to decide; prescriptive work is the one that recommends, and at its far end acts. The further along that line you build, the more the system costs to run and the more of your judgement has to be spent before it starts rather than after.</p>\n";

ACT.kindsSort = {
  "kind": "sort",
  "label": "Sort",
  "title": "Eight departments, four kinds of question",
  "objective": "7.1",
  "how": "Drop each request into the kind of analysis it needs, then check. Read why each one lands where it does.",
  "buckets": [
    {
      "id": "desc",
      "name": "Descriptive",
      "hint": "What happened. Summarizing and describing data about a period that has closed."
    },
    {
      "id": "diag",
      "name": "Diagnostic",
      "hint": "Why it happened. Correlations or causal relationships inside data about the past."
    },
    {
      "id": "pred",
      "name": "Predictive",
      "hint": "What will happen. A forecast of a likely future outcome, for a person to act on."
    },
    {
      "id": "pres",
      "name": "Prescriptive",
      "hint": "What to do. A recommended course of action, and sometimes the action itself."
    }
  ],
  "items": [
    {
      "t": "Break Depot 12's 9,400 kilos of chilled write-offs out by product line and by weekday",
      "b": "desc",
      "why": "It asks for last month's figures arranged in a more useful shape, which is a summary and nothing more."
    },
    {
      "t": "Rank last year's 2,300 customers by gross margin and show the top quartile",
      "b": "desc",
      "why": "A ranking of what already happened is still a summary, and the size of the data set does not change the kind of question."
    },
    {
      "t": "Account for three depots' Tuesday delivery windows all slipping in the same March week",
      "b": "diag",
      "why": "Account for it is a request for the relationship behind an event that has already happened."
    },
    {
      "t": "Account for fuel cost per drop rising 14% in the South while it fell 4% in the North",
      "b": "diag",
      "why": "Both numbers are already known and quoted in the request; what is wanted is the reason for the gap between them."
    },
    {
      "t": "Tell supply planning the pallet count the East depots will need in week 31",
      "b": "pred",
      "why": "A quantity for a week that has not happened yet is a forecast, and a planner still decides what to order against it."
    },
    {
      "t": "Name the restaurant accounts most likely to stop ordering from us next quarter",
      "b": "pred",
      "why": "Most likely and next quarter put this in the future; deciding what to offer those accounts is the human's part."
    },
    {
      "t": "Set tonight's loading plan for all 40 depots each morning, with no planner touching it",
      "b": "pres",
      "why": "It asks for the course of action itself, taken automatically, which is decision automation rather than decision support."
    },
    {
      "t": "Quote each account a courier rate from the competitor's price and our van costs, automatically",
      "b": "pres",
      "why": "A recommended action generated and then executed with nobody in between is prescriptive analytics at its automated end; a recommendation a manager signs off first is prescriptive too, and stops at decision support."
    }
  ]
};

ACT.kindsMatch = {
  "kind": "match",
  "label": "Match",
  "title": "What arrives, and what has to be there to use it",
  "objective": "7.1",
  "how": "Match each thing on the left to the kind of analysis that produced it, or to what the organization has to supply itself. Then check, and read why each pairing holds.",
  "pairs": [
    {
      "l": "A table of last month's write-offs broken out by product line and weekday",
      "r": "Descriptive analytics",
      "why": "Past data arranged and summarized, with nothing explained, forecast or decided in it."
    },
    {
      "l": "The reason three depots' Tuesday windows slipped in the same March week",
      "r": "Diagnostic analytics",
      "why": "Still about the past, but about the relationships inside it rather than the totals."
    },
    {
      "l": "A pallet count for week 31, a week that has not arrived yet",
      "r": "Predictive analytics",
      "why": "A forecast of a likely future outcome, handed to a planner who still places the order."
    },
    {
      "l": "Tonight's loading plan for 40 depots, issued without a planner",
      "r": "Prescriptive analytics",
      "why": "The action itself, produced and executed with nobody standing between the analysis and the trucks."
    },
    {
      "l": "Every buyer and depot manager here able to organize, analyze and communicate with data",
      "r": "Data literacy",
      "why": "The chapter treats this as a skill for every business user, not only for the analysts."
    },
    {
      "l": "Deciding what to offer the accounts a model flagged as at risk",
      "r": "Human judgement and creativity",
      "why": "Insight becomes action only when a person decides what the organization will actually do about it."
    }
  ]
};

ACT.kindsCase = {
  "kind": "case",
  "label": "Mini case",
  "title": "Eight requests, funding for two",
  "objective": "7.1",
  "how": "Study the hypothetical case and its invented figures. Make every decision to unlock the debrief; read the explanation for each option.",
  "brief": "Fairmount Provisions is a hypothetical regional distributor of food and household goods. Eight departments have sent the new analytics team a request apiece, and there is funding for two of them this quarter. The board has named one priority in writing: the East depots ran short of chilled stock in week 31 and three school-kitchen contracts went with it.",
  "facts": [
    {
      "k": "The firm",
      "v": "40 depots, 1,100 staff, selling to grocers, school kitchens and restaurants"
    },
    {
      "k": "What went wrong",
      "v": "East depots ran short of chilled stock in week 31; three contracts lost"
    },
    {
      "k": "On the desk",
      "v": "Eight requests, none of which names a kind of analysis"
    },
    {
      "k": "Budget",
      "v": "Two builds this quarter; a misfile buys a build nobody uses, about $60,000"
    }
  ],
  "exhibit": {
    "name": "Four of the eight, costed",
    "caption": "Invented practice figures for this case only; the four builds average $64,500.",
    "headers": [
      "Request",
      "Build",
      "To run for a year"
    ],
    "rows": [
      [
        "Write-offs by product line and weekday",
        "$18,000",
        "$2,000"
      ],
      [
        "Why three Tuesday delivery windows slipped",
        "$26,000",
        "$3,000"
      ],
      [
        "Pallet count the East depots need in week 31",
        "$64,000",
        "$14,000"
      ],
      [
        "Nightly loading plan for all 40 depots",
        "$150,000",
        "$41,000"
      ]
    ]
  },
  "questions": [
    {
      "q": "Supply planning wants the pallet count the East depots will need in week 31 this year. What kind of analysis is that, and what happens to its answer?",
      "opts": [
        "Descriptive, and the answer is a summary of what week 31 did last year.",
        "Diagnostic, and the answer explains a shortage the planners already lived through.",
        "Predictive, and the answer is a forecast a planner still orders against.",
        "Prescriptive, and the answer is a purchase order the system raises itself."
      ],
      "a": 2,
      "why": [
        "Week 31 has not happened yet this year, so there is nothing here to summarize.",
        "The request does not ask why the shortage recurs; it asks how large it will be.",
        "A quantity for a week still in the future is a forecast, and a person places the order.",
        "Nothing in the request asks the system to act, since supply planning intends to order against the number."
      ]
    },
    {
      "q": "Transport wants tonight's loading plan set each morning for all 40 depots, from demand and available trucks, with no planner touching it. Where does that sit?",
      "opts": [
        "Prescriptive analytics at its far end, where the decision is automated.",
        "Predictive analytics, because the plan is built from a forecast of tonight's demand.",
        "Descriptive analytics, because the demand figures describe what depots have used.",
        "Diagnostic analytics, because the plan answers why week 31 went wrong."
      ],
      "a": 0,
      "why": [
        "The plan is the action itself, issued with no planner standing in the loop.",
        "A demand forecast feeds this, but what was asked for is the plan, not the number.",
        "Describing past usage is an input here rather than the loading plan transport asked for.",
        "Explaining the shortage is diagnostic work, and this request asks for tonight's trucks instead."
      ]
    },
    {
      "q": "The board's priority is that the week 31 stockout must not recur. Which pair of builds answers it?",
      "opts": [
        "The write-off breakdown and the Tuesday window explanation, so the depots improve.",
        "The customer margin ranking and the fuel gap explanation, so the work funds itself.",
        "The Tuesday window explanation and the automatic courier quote, for a quick return.",
        "The week 31 pallet forecast and the nightly loading plan, in that order."
      ],
      "a": 3,
      "why": [
        "Both look backwards at periods that have already closed, and the board asked about a week that has not arrived.",
        "Useful work, but neither of the two touches the chilled stockout the board named as its priority.",
        "The courier quote prices a different problem, and one diagnostic report will not stop a stockout.",
        "Forecast the shortage, then act on the forecast, because a prediction nobody acts on changes nothing."
      ]
    },
    {
      "q": "Finance sees that the loading plan costs $41,000 a year to run while the write-off report costs $2,000. Which explanation holds up?",
      "opts": [
        "The report was scoped too narrowly, so its running cost is understated.",
        "The plan retrains and runs nightly, and that consumes energy every night.",
        "The plan needs a second database, because forecasts cannot sit beside past records.",
        "The plan needs an analyst on duty to sign off each night's trucks."
      ],
      "a": 1,
      "why": [
        "Nothing in the case suggests the report was mis-scoped; the two jobs simply differ in kind.",
        "Training and running a model consumes energy continuously, which is the cost the chapter raises.",
        "Forecasts are stored beside the records they were built from, so storage is not what drives this bill.",
        "Transport asked for a plan no planner touches, so an overnight reviewer is not part of the design."
      ]
    }
  ],
  "debrief": "The two builds that answer the board form a chain: forecast the week 31 shortage, then act on the forecast when the trucks are loaded. The other six are real work. Four of them ask about periods that have already closed. The remaining two do look forward, to the restaurant accounts at risk and to courier rates quoted automatically, but neither touches the chilled stockout the board named. Notice the price of moving along the continuum, too, since the automated plan costs roughly three times the forecast to run and keeps costing it every night."
};
