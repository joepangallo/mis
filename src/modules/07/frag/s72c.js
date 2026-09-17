/* Chapter 7 lesson and activity data. Rebuild with node src/build.mjs --module=modules/07. */
PROSE.s72c = "\n<span class=\"eyebrow\">Objective 7.2 · Part 3</span><h2>Patterns in data nobody labelled</h2>\n<p class=\"lede\">A clustering run finished overnight on the Fairmount Provisions customer list and produced three groups. It labelled them 0, 1 and 2. That is the whole of what it has to say. Nobody told the algorithm what to look for, and there is nobody to ask what it found. The structure is the machine's work. The meaning, and the decision that follows from it, are yours.</p>\n<h3>Labelled data, and data with no answers attached</h3>\n<p><b>Machine learning</b> lets computers learn from data without being explicitly programmed, and improve as they are exposed to more of it. It uses <b>algorithms</b>, which are step-by-step procedures or rules, to find patterns in large amounts of structured or unstructured data. The chapter splits it three ways, and the split turns on what you hand the algorithm to start with.</p>\n<p><b>Supervised learning</b> is trained on labelled examples, which the chapter calls the <b>ground truth</b>. Hand it deliveries already marked late or on time and it learns which attributes separate the two, then classifies a delivery it has never seen. <b>Unsupervised learning</b> is handed no labels at all. It is asked to find structure, and structure is all it gives back.</p>\n<p>The two differ at every point of the job, not only at the input:</p>\n<ul class=\"keys\"><li><b>What goes in</b> is a labelled data set for supervised learning, while unsupervised learning takes the rows exactly as they came off the system.</li><li><b>What it is for</b> is classifying and predicting a new case, where unsupervised learning is there to help you understand the data you already hold.</li><li><b>What comes out</b> is a prediction from supervised learning, and from unsupervised learning a set of patterns and relationships with no meaning attached.</li><li><b>What you do</b> for supervised work is define and validate the training; for unsupervised work it is to validate and interpret the groups it produced.</li></ul>\n<p>A third type is worth naming once. <b>Reinforcement learning</b> learns through trial and error in a changing environment, chasing a strategy that maximises rewards over time. That is how a dynamic pricing scheme or a building's heating gets tuned, and it is not what this section is about.</p>\n<h3>Three jobs, and the techniques they need</h3>\n<p>Three things landed on your desk this week with no answer key attached: a question about which products move together, a fuel card file finance believes is fine, and that clustering run. Each one needs a different unsupervised technique, and the chapter names a fourth that is association discovery run over time.</p>\n<ul class=\"keys\"><li><b>Clustering</b> groups records that have similar values for their attributes, which is how a customer list turns into segments.</li><li><b>Anomaly detection</b> is a variant of clustering pointed the other way, hunting the outliers: the records that resemble nothing else in the set.</li><li><b>Association discovery</b> finds items that turn up on the same transaction, which a grocer knows as market basket analysis.</li><li><b>Sequence discovery</b> runs the same idea over time, answering what a customer buys next rather than what they buy alongside.</li></ul>\n<p>Each pays for itself somewhere different. A bank runs anomaly detection over its transactions to find unusual patterns that may be fraud. A turbine manufacturer runs it over vibration readings to replace a part before it fails. Neither one was told in advance what an unusual reading looks like.</p>\n<div class=\"activity\" data-activity=\"unlabSort\"></div>\n<h3>Support and confidence, and why a rule needs both</h3>\n<p>An association rule carries two numbers. <b>Support</b> is how often the combination shows up across all the transactions analysed, and it tells you whether the rule is big enough to bother with. <b>Confidence</b> is the share of the transactions holding the first item that also hold the second, and it tells you how reliable the rule is.</p>\n<p>The chapter's stock illustration is coffee and sugar: the pair occurs in 20% of transactions, and 80% of transactions containing coffee also contain sugar. Both figures are counted off one particular file, so the same pair of items reads differently on a different file.</p>\n<p>Here is that arithmetic run on twenty orders from the Fairmount independent restaurant trade. Coffee is on ten of the twenty. Eight orders hold coffee and sugar together, so support is 40%. Eight of the ten coffee orders also hold sugar, so confidence is 80%. Merchandising will not move a depot pick-face for anything under 20% support and 75% confidence, because below that the disruption costs more than the rule is worth.</p>\n<p>Rules fail that bar in two opposite ways, and a third thing changes when you read a rule backwards:</p>\n<ul class=\"keys\"><li><b>High confidence on tiny support</b> is true and worthless. Saffron to cooking oil is 100% confident and stands on the one order in twenty holding saffron.</li><li><b>High support on low confidence</b> is common and unreliable. Cooking oil to chicken turns up on 30% of the orders but holds only two times in three.</li><li><b>Direction moves one number</b> and not the other. Chicken to cooking oil is the same 30% support, because support counts the orders holding both, yet its confidence is 100%.</li></ul>\n<div class=\"activity\" data-activity=\"unlabCase\"></div>\n<h3>What the output does not tell you</h3>\n<p>Now back to the three groups. The algorithm built them from order frequency, order value and distance from a depot. One orders 14.2 times a month at $310 an order, with 96% of it inside 8km of a depot. One orders 1.4 times a month at $4,830, mostly more than 40km out. The third orders 5.1 times a month at $890, every Monday and Thursday.</p>\n<p>Read those three lines and you can name them: small kitchens topping up almost daily, bulk buyers on a monthly cycle a long way out, and the core twice-weekly trade. Not one of those phrases is in the data. They are in your knowledge of the trade, and the algorithm has none of that.</p>\n<p>The same limit runs through all three jobs, so hold it as one rule rather than three separate cautions:</p>\n<ul class=\"keys\"><li><b>A cluster is not a name.</b> The run returns group 0, 1 and 2, and a person supplies the reading that makes any of them worth acting on.</li><li><b>A rule is not a cause.</b> Support and confidence count co-occurrence, and neither number says which item moved the other, or whether a third thing moved both.</li><li><b>An outlier is not a verdict.</b> A detector surfaces the rows that fit nothing, and a person decides whether that is a scheme, a shift pattern or a broken meter.</li></ul>\n<p>What these algorithms find rests purely on statistical relationships, which is why the chapter puts the interpretation in human hands. Acting on a pattern means supplying what the data does not contain: why it is there, and whether moving the shelf will change the basket or merely rearrange the walk to it.</p>\n<div class=\"activity\" data-activity=\"unlabMatch\"></div>\n<p class=\"takeaway\">Unsupervised learning is given data with no answers attached, finds structure in it, and stops. Support says whether a rule is big enough to bother with, confidence says whether it holds, and neither of them says that one thing caused the other. The naming, the judgement and the consequence stay with you.</p>\n";

ACT.unlabSort = {
  "kind": "sort",
  "label": "Sort",
  "title": "Which technique does this job need?",
  "objective": "7.2",
  "how": "Drop each job into the technique it needs, then check. The test is what the data arrived with: answers attached, or nothing.",
  "buckets": [
    {
      "id": "clus",
      "name": "Clustering",
      "hint": "Unsupervised. Group the records that resemble each other."
    },
    {
      "id": "anom",
      "name": "Anomaly detection",
      "hint": "Unsupervised. Find the records that resemble nothing else."
    },
    {
      "id": "assoc",
      "name": "Association and sequence discovery",
      "hint": "Unsupervised. What turns up together, and what turns up next."
    },
    {
      "id": "sup",
      "name": "Supervised learning",
      "hint": "Trained on labelled examples, then asked about a new case."
    }
  ],
  "items": [
    {
      "t": "Grouping 4,100 customer accounts by order value, order frequency and distance",
      "b": "clus",
      "why": "No column says what any group is. The algorithm sorts records by similar attribute values and stops there."
    },
    {
      "t": "Picking out the fuel card fills that look like nothing else on the file",
      "b": "anom",
      "why": "Anomaly detection hunts outliers, meaning data points that differ from the others around them."
    },
    {
      "t": "Counting how often chicken and cooking oil leave on the same order",
      "b": "assoc",
      "why": "Items bought together on one transaction is market basket analysis, the classic association discovery job."
    },
    {
      "t": "Predicting a late delivery from 2,400 deliveries already marked late or on time",
      "b": "sup",
      "why": "The marked outcomes are the ground truth, so the algorithm learns the relationship from labelled examples."
    },
    {
      "t": "Learning which claims are fraudulent from 900 an auditor has already judged",
      "b": "sup",
      "why": "Somebody attached the answer to every row first, which makes this supervised work rather than anomaly detection."
    },
    {
      "t": "Watching a chiller for a vibration reading unlike anything else the log holds, with no failure ever recorded on it",
      "b": "anom",
      "why": "With no recorded failure to learn from, nothing is labelled, so the only signal is a reading that resembles no other."
    },
    {
      "t": "Finding, in order history nobody has labelled, what a kitchen tends to buy two months after a fryer",
      "b": "assoc",
      "why": "An association discovered over time is sequence discovery, the sibling technique that asks what comes next."
    },
    {
      "t": "Splitting the forty depots into groups nobody defined in advance",
      "b": "clus",
      "why": "Grouping related records on similar values with no target variable in mind is exactly clustering."
    },
    {
      "t": "Sorting arriving email into legitimate and unwanted using known examples of both",
      "b": "sup",
      "why": "The chapter's spam filter is trained on messages already known to be one or the other."
    }
  ]
};

ACT.unlabCase = {
  "kind": "case",
  "label": "Mini case",
  "title": "Twenty orders, and one pick-face to move",
  "objective": "7.2",
  "how": "Study the hypothetical case and its invented figures. Make every decision to unlock the debrief; read the explanation for each option.",
  "brief": "Fairmount Provisions lays out its depot pick-faces on habit. Merchandising wants them rearranged around what actually travels together, and has counted twenty orders from the independent restaurant trade. A rule reads first item to second, so chicken to cooking oil means orders holding chicken also hold cooking oil. Moving one pick-face costs a week of disruption in the depot.",
  "facts": [
    {
      "k": "Orders analysed",
      "v": "20, from independent restaurants"
    },
    {
      "k": "Merchandising's bar",
      "v": "20% support and 75% confidence, both required"
    },
    {
      "k": "How a rule reads",
      "v": "First item to second, one direction at a time"
    },
    {
      "k": "What is on the table",
      "v": "One pick-face moved, and a line for the board"
    }
  ],
  "exhibit": {
    "name": "Rules counted off the twenty orders",
    "caption": "Invented practice figures for this case only.",
    "headers": [
      "If the order holds",
      "It also holds",
      "Support",
      "Confidence"
    ],
    "rows": [
      [
        "Sugar",
        "Coffee",
        "40%",
        "89%"
      ],
      [
        "Coffee",
        "Sugar",
        "40%",
        "80%"
      ],
      [
        "Coffee",
        "Paper cups",
        "35%",
        "70%"
      ],
      [
        "Chicken",
        "Cooking oil",
        "30%",
        "100%"
      ],
      [
        "Cooking oil",
        "Chicken",
        "30%",
        "67%"
      ],
      [
        "Flour",
        "Cooking oil",
        "20%",
        "80%"
      ],
      [
        "Saffron",
        "Cooking oil",
        "5%",
        "100%"
      ]
    ]
  },
  "questions": [
    {
      "q": "Merchandising has budget to move one pick-face. Which of these four rules clears both bars?",
      "opts": [
        "Coffee to paper cups, at 35% support and 70% confidence on ten coffee orders.",
        "Cooking oil to chicken, at 30% support and 67% confidence on nine oil orders.",
        "Chicken to cooking oil, at 30% support and 100% confidence.",
        "Saffron to cooking oil, at 5% support and 100% confidence."
      ],
      "a": 2,
      "why": [
        "Seven of the ten coffee orders also hold paper cups, so 70% confidence falls under the 75% bar.",
        "The pair is common enough, yet it holds only two times in three, well under the bar.",
        "Six of the twenty orders hold both, and every order holding chicken holds cooking oil too.",
        "Confidence could not be higher, and yet 5% support means the rule rests on one order."
      ]
    },
    {
      "q": "Chicken to cooking oil reads 30% support and 100% confidence. Cooking oil to chicken reads 30% support and 67% confidence. Why does one figure move and not the other?",
      "opts": [
        "Support counts the orders holding both; confidence divides by the first item's count.",
        "Confidence is counted across all twenty orders, while support divides by the count of the first item.",
        "Cooking oil sells on fewer orders than chicken does, which pulls the second figure down.",
        "The two rules were counted over different samples drawn from the same twenty orders."
      ],
      "a": 0,
      "why": [
        "Six orders hold both, so support is 30% either way; the denominator is six or nine.",
        "That swaps the two: support is the figure counted over every transaction, and confidence is the one with only the first item's orders underneath.",
        "Cooking oil is on nine of the orders and chicken on six, so the premise is backwards.",
        "Both figures come off the same twenty orders, and nothing was sampled or split here."
      ]
    },
    {
      "q": "Saffron to cooking oil shows 100% confidence, as high as the exhibit goes. What should merchandising do with it?",
      "opts": [
        "Move the pick-face, because a rule that holds every time is as reliable as rules get.",
        "Move the pick-face just in the depots that happen to stock saffron.",
        "Treat it as evidence that buying saffron drives a restaurant to buy cooking oil.",
        "Leave the pick-faces alone, because that 100% stands on one order in twenty."
      ],
      "a": 3,
      "why": [
        "One out of one is 100%, which is arithmetic rather than a pattern worth a week of disruption.",
        "Narrowing the rule adds no orders to it, so the support behind it is still a single transaction.",
        "Confidence measures co-occurrence in the file and says nothing about what drove either purchase.",
        "Saffron is on one of the twenty orders, so support is 5% and the rule is a coincidence."
      ]
    },
    {
      "q": "Merchandising drafts a line for the board: shelving coffee beside sugar will lift sugar sales, because 80% of coffee orders already include it. What is wrong with the sentence?",
      "opts": [
        "Nothing at all, since coffee to sugar clears both bars at 40% support and 80% confidence.",
        "Both figures count co-occurrence in past orders; neither shows coffee moving sugar.",
        "The rule should be read the other way, since sugar to coffee is a stronger 89%.",
        "Support of 40% is too thin to carry a claim about a change in future sales."
      ],
      "a": 1,
      "why": [
        "Clearing both bars makes a rule worth acting on; it does not turn a count into a cause.",
        "Association discovery finds correlations among sets of items, and a correlation is a count, not a mechanism.",
        "Reading the rule from sugar changes the confidence figure but leaves the causal claim just as unsupported.",
        "Forty per cent is double merchandising's bar, so the weakness in the sentence lies elsewhere."
      ]
    }
  ],
  "debrief": "Of the four rules put to you, one cleared both bars: chicken to cooking oil, 30% support and 100% confidence. Three more on the exhibit clear it too, coffee and sugar in either direction and flour to cooking oil, which is the ordinary result. A bar narrows the field; it does not pick the winner, and the week of disruption is the same whichever pick-face moves. The 100% on saffron bought nothing, because it stood on a single order. And the rule you act on still says nothing about why oil follows chicken out of the door, which is the question the board asks next."
};

ACT.unlabMatch = {
  "kind": "match",
  "label": "Match",
  "title": "What the algorithm found, and what a person calls it",
  "objective": "7.2",
  "how": "Match each output to the reading a person has to supply for it, then check. Read why each pairing fits.",
  "pairs": [
    {
      "l": "14.2 orders a month, $310 an order, 96% within 8km of a depot",
      "r": "Small kitchens topping up almost daily",
      "why": "Frequent, small and close in. The cost here is the number of stops, not the size of any one of them."
    },
    {
      "l": "1.4 orders a month, $4,830 an order, 71% more than 40km out",
      "r": "Bulk buyers on a monthly cycle, a long way out",
      "why": "Rare, large and distant. Miss the cycle and you miss a month of that customer's revenue entirely."
    },
    {
      "l": "5.1 orders a month, $890 an order, every Monday and Thursday",
      "r": "The core twice-weekly trade",
      "why": "Predictable and mid-sized. This is the backbone the route plan is built around and the group to protect."
    },
    {
      "l": "Three fills of 179 litres at $248.00 between 01:40 and 02:30, under a $250 approval limit",
      "r": "A record that resembles nothing else on the file",
      "why": "No tank takes 537 litres in fifty minutes, and every fill stops two dollars under the $250 limit."
    },
    {
      "l": "Chicken and cooking oil on the same order, 30% of the time",
      "r": "Two items that travel together",
      "why": "A count of items appearing on one transaction is association discovery, and 30% is its support."
    },
    {
      "l": "A fryer bought in March, filtered oil ordered in May",
      "r": "One purchase that follows another over time",
      "why": "Associations spread across months are sequence discovery, which answers what a customer buys next."
    }
  ]
};
