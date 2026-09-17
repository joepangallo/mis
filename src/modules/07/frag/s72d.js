/* Chapter 7 lesson and activity data. Rebuild with node src/build.mjs --module=modules/07. */
PROSE.s72d = "\n<span class=\"eyebrow\">Objective 7.2 · Part 4</span><h2>The machine learning workflow, end to end</h2>\n<p class=\"lede\">Fairmount Provisions has a data scientist for two quarters and a chief executive who wants something that knows a delivery is going to be late before it is. The parts that decide whether that works are not hers. What problem to point it at, what data to feed it, what the word late even means, and whether the result is good enough to put in front of a customer: those are yours, because they need the trade rather than the statistics.</p>\n<h3>A vision step, four stages, and arrows that run backwards</h3>\n<p>A machine learning project opens by defining the AI vision and then runs through four main stages, and going back a stage is an ordinary part of the process rather than a failure. The chapter draws two dashed arrows for exactly that reason: one from the model stage back to the data, and one from deployment back to the problem.</p>\n<p>Here is the whole workflow, and what each stage is for:</p>\n<ul class=\"keys\"><li><b>Define the AI vision</b> asks what the organization is trying to achieve with any of this, before a single use case has been named or costed.</li><li><b>Problem</b> identifies candidate use cases, assesses each one for value and feasibility, and prioritises them. The accuracy bar is set here, in advance.</li><li><b>Data</b> acquires the records, cleans and prepares them, labels them, then splits them into a set to train on and a set held back to test with.</li><li><b>Model</b> selects an algorithm, trains it, validates it and tests it, which normally runs relatively quickly, and is also where you may learn the problem is not solvable this way at all.</li><li><b>Deployment</b> puts the model into an app or a process, trains the people using it, then monitors, retrains and maintains it as conditions change.</li></ul>\n<p>The data scientist owns model selection and training. You own the problem, the data sources, the quality standard, the meaning of the label, the resources, and the decision at the end. Data scientists are hired for statistics; they are rarely hired for knowing your depots.</p>\n<div class=\"activity\" data-activity=\"flowOrder\"></div>\n<h3>Garbage in, garbage out</h3>\n<p>Acquiring and cleaning the data is where the months go, and organizations are regularly surprised by how many. Fairmount's raw extract is wrong in six specific ways, and what survives the clean-up is the 2,400 labelled deliveries the model is built on. Every fix is a decision somebody has to defend later.</p>\n<p>Four of them are worth learning as a set, because in each one the tempting answer is the wrong one:</p>\n<ul class=\"keys\"><li><b>180 records with no arrival timestamp</b> get dropped, because filling them with a depot average would invent the very fact the label is made of.</li><li><b>412 exact duplicates</b>, left by a January file imported twice, get removed, since duplicated rows add weight to one month rather than adding information.</li><li><b>97 records showing minus four hours</b> get dropped, because an impossible value is a broken record rather than an extreme one, almost certainly a clock or a time zone.</li><li><b>The September week a hurricane shut two depots</b> stays in the file, flagged as a disruption, because deleting those deliveries teaches the model a world in which severe weather does not happen.</li></ul>\n<p>Then the data has to be labelled. For supervised learning the label is the ground truth, and everything the model learns, it learns from that definition. At Fairmount, late means the van arrived after the promised window closed, recorded by the same clock in every depot and dependent on nobody's opinion.</p>\n<p>Two easier definitions were on the table and both are traps. Late as whatever the driver marked on the handheld teaches the model which drivers are strict. Late as whatever the customer complained about teaches it who complains, since most late deliveries generate no complaint at all.</p>\n<h3>The number you are allowed to quote</h3>\n<p>Some records train the model and the rest are held back, so the model can be tested on data it has never seen. Seventy to eighty percent for training is the usual balance. Fairmount trained on 1,800 records and held back 600.</p>\n<p>Skip the split and something strange happens: the accuracy goes up. A model tested on the rows it memorised reports a wonderful number, and it is not lying. It is answering a different question. How well do you remember what I showed you is not the same question as how well will you do on Monday, and only the second one is a forecast.</p>\n<div class=\"activity\" data-activity=\"flowCase\"></div>\n<h3>A prediction, not a fact</h3>\n<p>The percentage at the bottom of a test is an average, and averaging is what hides the interesting part. Overall accuracy counts a missed late delivery and a false alarm as the same event. A missed late delivery is a customer nobody warned. A false alarm is a van re-sequenced for nothing. They do not cost the same.</p>\n<p>So the setting that decides how readily the tool cries late is not a technical choice. Push it one way and you catch more genuine misses and waste more vans. Push it the other way and you waste fewer vans and warn fewer customers. Somebody has to price that trade, and it is not the data scientist.</p>\n<p>Three habits follow from all of this, and they are the difference between a tool dispatch trusts and one they quietly stop opening:</p>\n<ul class=\"keys\"><li><b>Quote the held-back number</b> to anyone making a decision on it, and say out loud how many unseen records that estimate is resting on.</li><li><b>Show the error table beside the percentage</b>, because the two kinds of mistake land on different people and only the table tells you how many of each you get.</li><li><b>Set the bar before training</b>, in writing, so the result is measured against a promise made in advance rather than against your relief at having a result.</li></ul>\n<div class=\"activity\" data-activity=\"flowSort\"></div>\n<h3>What the data already believes</h3>\n<p>Bias in these systems is usually inherited rather than installed. A model learns the patterns in its training data, and any inequity in that data is reproduced in the output, sometimes amplified. Nobody has to write a discriminatory rule for a discriminatory result to arrive.</p>\n<p>The chapter's case is a diagnostic assistant trained on more than 15,000 medical records. It tested well, then performed noticeably worse for rural, minority and lower-income patients, because the records came from large urban hospitals serving a narrow slice of the population. An audit found the gap. The file had held it all along.</p>\n<p>The repair is not simple either. Gathering records from a wider range of clinics and regions would improve fairness, and would also collect sensitive data from people who may not know it is being used or may not have consented. Reducing bias and protecting privacy pull against each other, which is why training data is an ethical question and not only a technical one.</p>\n<p>Fairmount met a smaller version of the same problem. Someone proposed predicting which depot managers deserve promotion, using twelve years of appraisal records. The data exists, which is the trap. The file records who was promoted before, not who deserved it, so the model would learn whatever those old decisions contained and hand it back with a percentage attached.</p>\n<p class=\"takeaway\">Two sentences carry this section. Accuracy measured on the data a model was fitted to is not evidence it works on new cases, and a model's output is a prediction with an error rate rather than a fact. The split, the held-back test, the error table and the bar set in advance all exist to keep those two sentences true.</p>\n";

ACT.flowOrder = {
  "kind": "order",
  "label": "Sequence",
  "title": "The workflow, in the order it runs",
  "objective": "7.2",
  "how": "Put the nine steps into the order a machine learning project actually runs them, then check. Read why each one has to sit where it does.",
  "steps": [
    {
      "t": "Define the AI vision: what is the organization trying to achieve with any of this?",
      "why": "Nothing downstream can be prioritised until somebody has said what the organization wants out of AI at all."
    },
    {
      "t": "Identify, assess and prioritise the candidate use cases, and set the accuracy bar.",
      "why": "The bar has to exist before a result does, or it quietly becomes whatever number the model happened to reach."
    },
    {
      "t": "Acquire the data, from inside the organization and from outside it.",
      "why": "Feasibility was assessed on paper; this is where you find out what the records actually contain."
    },
    {
      "t": "Clean and prepare it: standardise formats, remove duplicates, drop impossible values.",
      "why": "Combining source systems produces two formats for one fact, and a model treats those as two different facts."
    },
    {
      "t": "Label it, so every record carries the outcome the model is meant to learn.",
      "why": "Supervised learning needs ground truth, and a label has to be observable the same way in every record."
    },
    {
      "t": "Split the records into a training set and a test set held back.",
      "why": "The test set has to be separated before training, or afterwards there is nothing the model has not already seen."
    },
    {
      "t": "Select an algorithm, train it, and validate it.",
      "why": "This is the data scientist's stage, and on prepared data it normally runs quickly beside the months of cleaning."
    },
    {
      "t": "Test it on the held-back records, then decide: deploy, go back a stage, or stop.",
      "why": "Only a number from unseen records answers the question anyone actually asked, which is about next week."
    },
    {
      "t": "Deploy it into the process, then monitor, retrain and maintain it.",
      "why": "Routes, customers and weather change, so a model that was accurate in March drifts by September."
    }
  ]
};

ACT.flowCase = {
  "kind": "case",
  "label": "Mini case",
  "title": "Two accuracies, one model",
  "objective": "7.2",
  "how": "Study the hypothetical case and its invented figures. Make every decision to unlock the debrief; read the explanation for each option.",
  "brief": "Fairmount Provisions is a hypothetical regional distributor with 40 depots. Before any model existed, its dispatch team agreed they would use a late-delivery tool only if it is right 85% of the time or better; below that they would keep judging by eye. The data scientist has now trained the model twice and brought you both results.",
  "facts": [
    {
      "k": "Labelled deliveries",
      "v": "2,400, of which 22% arrived after their window closed"
    },
    {
      "k": "Bar set in advance",
      "v": "85% accuracy, agreed with dispatch before training began"
    },
    {
      "k": "First run",
      "v": "Trained and tested on all 2,400 records: 99% accurate"
    },
    {
      "k": "Second run",
      "v": "Trained on 1,800, tested on the 600 held back: 82% accurate"
    },
    {
      "k": "What an error costs",
      "v": "A miss is an unwarned customer; a false alarm is a van re-sequenced for nothing"
    }
  ],
  "exhibit": {
    "name": "The second run, on the 600 held-back deliveries",
    "caption": "Invented practice figures for this hypothetical case only.",
    "headers": [
      "600 held-back deliveries",
      "Model said late",
      "Model said on time"
    ],
    "rows": [
      [
        "Really was late (132)",
        "65 caught",
        "67 missed"
      ],
      [
        "Really was on time (468)",
        "41 false alarms",
        "427 cleared correctly"
      ],
      [
        "Column total",
        "106 flagged",
        "494 left alone"
      ]
    ]
  },
  "questions": [
    {
      "q": "The first run reported 99% accuracy. What is that number actually measuring?",
      "opts": [
        "How well it repeats the 2,400 rows it was fitted to, which is not a forecast.",
        "How well the model will do on next week's deliveries once dispatch starts using it.",
        "How clean the file was after the duplicate and timestamp problems had been repaired.",
        "How well the file's 22% late rate matches the rate the depots actually run at."
      ],
      "a": 0,
      "why": [
        "Tested on the rows it learned from, a model reports its memory rather than its future performance.",
        "A forecast has to come from records the model has never seen, and this run held none back.",
        "Cleaning happened before training, and it is not what an accuracy score measures at all.",
        "That asks whether the file is representative, while accuracy counts how often the model's calls turned out right."
      ]
    },
    {
      "q": "The honest run came in at 82% against a bar of 85%. What should the project owner do?",
      "opts": [
        "Deploy it anyway, since 82% beats a dispatcher guessing from experience and memory.",
        "Go back to the data for another pass, since 82% misses the bar but not by much.",
        "Lower the bar to 80%, since the model is built and the quarter has already been spent.",
        "Stop the project, since one run under the agreed bar shows this cannot be done with data."
      ],
      "a": 1,
      "why": [
        "The bar was a promise to dispatch, and deploying under it breaks the promise that made the tool usable.",
        "This is what the dashed arrow from model back to data is drawn for: more data, better labels, another pass.",
        "Moving the bar after seeing the result turns a standard into whatever number the model reached.",
        "Stopping is a legitimate outcome, but a single run three points under the bar has not shown the problem is unsolvable."
      ]
    },
    {
      "q": "Dispatch asks how many genuinely late deliveries the tool would have warned them about. What do you tell them?",
      "opts": [
        "492 of 600, which is how many calls the model got right across the whole test.",
        "106 of 600, which is the number of deliveries the model decided to flag as late.",
        "65 of 132, because the other 67 late deliveries were called on time.",
        "132 of 600, since that is how many deliveries in the test really did arrive late."
      ],
      "a": 2,
      "why": [
        "That figure counts every correct call, including 427 on-time deliveries nobody needed warning about.",
        "106 is what the model flagged, and 41 of those flags were vans that would have arrived on time.",
        "Of 132 genuinely late deliveries the model caught 65, which is a little under half of them.",
        "132 is how many were late in truth, not how many the model managed to warn anybody about."
      ]
    },
    {
      "q": "The tool can be tuned to flag more deliveries as late, catching more misses and raising more false alarms. Whose call is that?",
      "opts": [
        "The data scientist's, because she is the person who selects and tunes the algorithm.",
        "Nobody's, because the setting with the highest overall accuracy is the one to use.",
        "The algorithm's, because the training data already fixes where the cut-off has to sit.",
        "The business's, because a missed warning and a wasted van cost different amounts."
      ],
      "a": 3,
      "why": [
        "She can move the setting, but she cannot price what each kind of mistake costs the company.",
        "Overall accuracy averages the two errors together as though they were interchangeable, and they are not.",
        "Nothing in the data says which mistake costs more, so the cut-off is chosen by people rather than discovered.",
        "Whoever carries the cost of each error decides how the tool is set, which makes this a business call."
      ]
    }
  ],
  "debrief": "The same model produced 99% and 82%, and only the second number is about deliveries nobody has made yet. Underneath that 82% sits the real news: of 132 genuinely late deliveries the tool caught 65 and missed 67, while raising 41 false alarms. The single percentage hid both counts, which is why the error table belongs on the slide beside it."
};

ACT.flowSort = {
  "kind": "sort",
  "label": "Sort",
  "title": "Fact, prediction, or somebody's decision?",
  "objective": "7.2",
  "how": "Drop each line into what it really is, then check. Read why each one lands where it does.",
  "buckets": [
    {
      "id": "fact",
      "name": "A fact the systems recorded",
      "hint": "Observed and written down. Checkable against a scan, a clock, or the file itself."
    },
    {
      "id": "pred",
      "name": "A prediction with an error rate",
      "hint": "The model's output. Right most of the time, and wrong a known share of the time."
    },
    {
      "id": "call",
      "name": "A judgement somebody has to make",
      "hint": "No algorithm settles it. A person decides, and that person owns the consequence."
    }
  ],
  "items": [
    {
      "t": "The van scanned this drop at 4:12 p.m., eleven minutes after the window closed.",
      "b": "fact",
      "why": "The scan and the promised window are both recorded, so this is checkable rather than estimated."
    },
    {
      "t": "Tomorrow's school-kitchen run has a 71% chance of missing its window.",
      "b": "pred",
      "why": "A probability from a model is an estimate carrying the model's error rate, not a statement about tomorrow."
    },
    {
      "t": "Dispatch will not use a tool that is right less than 85% of the time.",
      "b": "call",
      "why": "Where the bar sits depends on what the team is prepared to act on, which no algorithm can compute."
    },
    {
      "t": "412 rows in the January file are exact duplicates of other rows.",
      "b": "fact",
      "why": "Duplicate detection reads the file as it stands and reports what is there, with nothing inferred."
    },
    {
      "t": "Of tomorrow's 210 drops, the model expects 37 to miss their window.",
      "b": "pred",
      "why": "A count produced by the model carries its error rate, so some of those 37 vans will arrive on time."
    },
    {
      "t": "Late means the van arrived after the promised window closed.",
      "b": "call",
      "why": "Ground truth is defined by people, and two reasonable definitions would train two different models."
    },
    {
      "t": "Two depots were shut for three days by a hurricane last September.",
      "b": "fact",
      "why": "The closure happened and is recorded, which is why that week stays in the file rather than being deleted."
    },
    {
      "t": "This account is likely to cancel its standing order within two months.",
      "b": "pred",
      "why": "A likelihood about a future event is a forecast, and the account may well renew instead."
    },
    {
      "t": "We would rather re-sequence vans for nothing than leave a customer unwarned.",
      "b": "call",
      "why": "Pricing the two kinds of error against each other is a business judgement, and it is what sets the threshold."
    },
    {
      "t": "The appraisal file records who was promoted, not who deserved it.",
      "b": "fact",
      "why": "It truthfully describes what the data contains, and it is why a promotion model would inherit old decisions."
    }
  ]
};
