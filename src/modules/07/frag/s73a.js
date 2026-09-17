/* Chapter 7 lesson and activity data. Rebuild with node src/build.mjs --module=modules/07. */
PROSE.s73a = "\n<span class=\"eyebrow\">Objective 7.3 · Part 1</span><h2>How generative AI actually gets used</h2>\n<p class=\"lede\">A depot supervisor at Fairmount Provisions has a customer on the phone about fourteen cases of chilled product that arrived warm. She types the question into a free chat tool and gets an answer in two seconds: returns accepted within 30 days, no documentation needed, credit to the original payment method. It is fluent, confident and entirely invented. The real policy is 72 hours with a photograph of the temperature logger. Nobody had told the tool the policy, so it wrote the one that sounded most likely.</p>\n<h3>What the machine is actually doing</h3>\n<p>The models in the previous objective were tied to their data. An algorithm that predicts which passengers will miss a flight will not work for a different airline, let alone for an operator of high-speed trains, because the source systems and the data are different. That is why those algorithms are called <b>narrow AI</b>.</p>\n<p><b>Generative AI</b> is a type of artificial intelligence that creates new content — text, images, audio — based on the data it was trained on. A <b>large language model</b> is the text version of that idea. It is fed tremendous amounts of writing and learns the semantic and syntactic relationships between words, structures and themes.</p>\n<p>Asked a question, it analyses your prompt, works out the likelihood of the words that could come next, and selects one according to those probabilities. Then it does the same thing again on the text it has just written. It is autocomplete on an extraordinary scale.</p>\n<p>Four consequences follow from that description, and each of them matters more than the machinery does:</p>\n<ul class=\"keys\"><li><b>It does not understand</b> the text, but works from statistical patterns learned in training rather than from any notion of what is true.</li><li><b>The sampling is random</b>, which is what makes the output feel human rather than mechanical, and also makes it less predictable run to run.</li><li><b>The output is novel</b> and unstructured — a paragraph, an image, a summary — where narrow AI returned a classification or a predicted number.</li><li><b>One model does many jobs</b> across domains it was never built for, adapting to new tasks with limited additional input and no retraining.</li></ul>\n<h3>What companies actually do with it</h3>\n<p>The use cases in the chapter are ordinary long before they are exotic. Most of the value sits in work somebody is already doing by hand, at their desk, this afternoon.</p>\n<ul class=\"keys\"><li><b>Routine tasks</b> cover writing emails, drafting meeting notes, filling in forms, and translating between languages.</li><li><b>Summarising documents</b> condenses reports and presentations, and gives a first read of legal documents or financial statements.</li><li><b>Content creation</b> produces drafts, curates external content, standardises job descriptions, and analyses requests for proposal to prepare bids.</li><li><b>Code generation</b> completes, analyses and debugs code, which quietly shortens the work of building everything else on this list.</li><li><b>Customer interaction support</b> drafts responses and personal follow-ups, and runs the chatbots a customer meets before any person.</li><li><b>Strategic planning</b> produces project plans, competitive analyses and idea generation, where the point is a starting draft rather than a verdict.</li></ul>\n<p>Four benefits sit underneath all of that: productivity and efficiency gains, innovation and ideation support, personalization at scale, and cost savings through automation. The first two are the obvious ones. Summarising a customer's file, or documenting a call automatically, gives back the time a person was spending on it.</p>\n<p>Personalization at scale is the one worth pausing on. It means individual advice, recommendations or replies for every customer without massively increasing customer-facing staff. A garden retailer answering planting questions and a distributor answering substitution questions are the same idea, which is why the next decision is not academic.</p>\n<h3>The deployment ladder is a menu, not a ranking</h3>\n<p>Deciding a job is worth doing is the easy half. The second half is how the tool reaches your company, and that is a question of <b>cost and control</b> rather than a technical one. The chapter gives five deployment models. Cheapest first:</p>\n<ul class=\"keys\"><li><b>A public tool, as it comes</b> is free or near it, opened in a browser, and whatever an employee types into it may become training data.</li><li><b>The same model inside your own application</b>, reached through the provider's interface, puts the capability in your software but leaves the answers limited to the training data.</li><li><b>Retrieval over your own systems</b> augments the prompt with relevant records fetched from your knowledge base, so the answer carries your facts and your live figures.</li><li><b>A model fine-tuned on your examples</b> is customised with prompt-and-answer pairs for a domain or a house voice, and is expensive enough to redo only periodically.</li><li><b>A model of your own, from scratch</b> gives maximum privacy and control, and is out of reach for all but the largest organizations under strict regulation.</li></ul>\n<div class=\"activity\" data-activity=\"genOrder\"></div>\n<p>What each rung buys is narrow and specific. Embedding buys placement and nothing else, so the answers stay generic. Retrieval buys facts, including the ones that changed this morning. Fine-tuning buys a voice or a domain, held steady across thousands of items, but it freezes what it learned on the day it learned it. Building your own buys privacy.</p>\n<p>The costs are real, and the subscription line is only the visible part of them. An enterprise subscription runs in the region of $25 per user per month, and usage through a programming interface is billed by the volume of text going in and coming out. Fine-tuning, or building a model internally, runs between $5 million and $20 million where the aim is to transform a business model.</p>\n<p>Three further costs get left off the business case:</p>\n<ul class=\"keys\"><li><b>Time</b> matters because a model with reasoning capabilities can take long enough to answer that it stops being usable in a live customer conversation.</li><li><b>Errors</b> cost what it takes to detect them, what it takes to fix them, and again for the ones nobody detects at all.</li><li><b>The environment</b> absorbs the training and running of these models as demand for energy and raw materials, and eventually as electronic waste.</li></ul>\n<p>Those costs are why one industry forecast, made in 2024, expected 30 percent of generative AI projects to be abandoned by the end of 2025 — largely because companies could not translate the use into a financial benefit they could point at.</p>\n<div class=\"activity\" data-activity=\"genSort\"></div>\n<h3>Three jobs, three different answers</h3>\n<p>Fairmount has three jobs on the table and they are not the same kind of job. One needs a fact the company owns and keeps revising. One needs ordinary friendly English and nothing else. One needs a voice held identically across 4,300 entries. The rung that is right for one of them is money burnt on another.</p>\n<div class=\"activity\" data-activity=\"genCase\"></div>\n<h3>Plausible is not accurate</h3>\n<p>Now back to the supervisor and the warm chilled product. The tool did not malfunction. It was asked what a returns policy says, it had never been shown Fairmount's returns policy, and it produced what a returns policy usually looks like. That is the system working as described.</p>\n<p>A <b>hallucination</b> is an inaccurate or nonsensical response produced that way. It arrives in the same register as everything else — no hedge, no tell, no change of tone — which is exactly what makes it dangerous. People believe output that is coherent and plausible, and this output is reliably coherent and plausible.</p>\n<p>Fabrications have shapes worth learning to recognise. In one page of company copy that nobody had checked, three sentences were invented:</p>\n<ul class=\"keys\"><li><b>A flattering statistic</b> claimed an on-time delivery rate of 99.4% every quarter since 2019, precise enough that the decimal point did the persuading.</li><li><b>A regulation</b> claimed a temperature-controlled logistics licence under a federal rule number that does not exist, renewed annually.</li><li><b>An award</b> claimed distributor of the year from a trade body that gave no such prize, the sort of line a customer repeats in their own marketing.</li></ul>\n<p>The test is not whether a sentence sounds right. It is whether you can check it in thirty seconds against your own records. \"We operate 40 depots\" survives that test. The other three do not — and the company owns every sentence its tools send out under its name.</p>\n<p class=\"takeaway\">A generative model produces plausible text, and plausibility is not accuracy: a confident answer can be wholly invented, which is how these systems work rather than a defect that one product has fixed. Pick the rung the job needs — placement, facts, voice or privacy — because each one buys a different thing at a very different price.</p>\n";

ACT.genOrder = {
  "kind": "order",
  "label": "Order",
  "title": "The deployment ladder, least control to most",
  "objective": "7.3",
  "how": "Drag the five deployment models into order, from the one that gives you the least control over the answer to the one that gives you the most, then check. Cost climbs in the same direction.",
  "steps": [
    {
      "t": "A public tool, as it comes",
      "why": "Free or near it. You control the prompt and nothing else, and what an employee types may become training data."
    },
    {
      "t": "The same model embedded in your own application",
      "why": "Reached through the provider's interface. You now control where the capability sits, but the answers still come only from the training data."
    },
    {
      "t": "Retrieval-augmented generation over your own knowledge base",
      "why": "The prompt is augmented with records fetched from your systems, so you control the facts in the answer without changing the model at all."
    },
    {
      "t": "A model fine-tuned on your own prompt-and-answer pairs",
      "why": "Customising a pre-trained model gives you control of the domain and the voice, but it is costly, so it is done periodically and cannot carry live data."
    },
    {
      "t": "A model you train yourself, from scratch",
      "why": "Maximum privacy and control over everything, at technical demands and costs that rule it out for all but the largest regulated organizations."
    }
  ]
};

ACT.genSort = {
  "kind": "sort",
  "label": "Sort",
  "title": "Which rung does this job actually need?",
  "objective": "7.3",
  "how": "Drop each job onto the cheapest deployment model that can actually do it, then check. Read why each one lands where it does — the ladder is a menu, not a ranking.",
  "buckets": [
    {
      "id": "pub",
      "name": "Public tool, as it comes",
      "hint": "Free or near it. Generic language, no company fact, nothing confidential in the prompt."
    },
    {
      "id": "api",
      "name": "Embedded in your own app",
      "hint": "Reached through the provider's interface. The capability moves; the knowledge does not."
    },
    {
      "id": "rag",
      "name": "Retrieval over your systems",
      "hint": "The prompt is augmented with records fetched live from your own knowledge base."
    },
    {
      "id": "tune",
      "name": "Fine-tuned on your examples",
      "hint": "Prompt-and-answer pairs teach a domain or a house voice. Costly, periodic, frozen."
    },
    {
      "id": "own",
      "name": "Your own model, from scratch",
      "hint": "Maximum privacy and control, at costs almost no organization can carry."
    }
  ],
  "items": [
    {
      "t": "A friendly two-line apology for a late delivery, with the specifics added by a person",
      "b": "pub",
      "why": "Generic language with no confidential input and no company fact in the answer is the one thing a public tool is genuinely best at."
    },
    {
      "t": "What the chilled returns policy says today, after March's revision",
      "b": "rag",
      "why": "The answer exists, is written down, and changes, so the prompt has to be augmented with the current document before it is sent."
    },
    {
      "t": "Rewriting 4,300 catalogue entries in the house voice the catalogue has used for twenty years",
      "b": "tune",
      "why": "Style held at volume, with stable facts and nothing live, is the textbook case for customising a model with prompt-and-answer pairs."
    },
    {
      "t": "Turning a page of bullet points into a paragraph for the trade newsletter",
      "b": "pub",
      "why": "Nothing in the request is confidential and nothing in the answer is a company fact, so paying to move it up the ladder buys nothing."
    },
    {
      "t": "A summarise-this-thread button inside the order-notes screen clerks already use",
      "b": "api",
      "why": "The capability has to live inside your own software, but the summary needs only the text on the screen, not a record from anywhere else."
    },
    {
      "t": "How much this school district has ordered so far this year, asked in plain English",
      "b": "rag",
      "why": "The figure sits in your own systems and moves daily, which is precisely what retrieval was invented to feed into a prompt."
    },
    {
      "t": "Drafting help for 1,100 staff without them leaving the internal system they log into",
      "b": "api",
      "why": "Embedding through the provider's interface puts generic drafting inside your application; the answers are still limited to the training data."
    },
    {
      "t": "Warranty wording in the legal team's exact register, on thousands of documents a year",
      "b": "tune",
      "why": "A particular tone applied at volume, where the facts are stable, is what fine-tuning is for; prompting will not hold it across thousands."
    },
    {
      "t": "Case histories a regulator forbids from leaving the organization's own hardware",
      "b": "own",
      "why": "Maximum privacy and control is the one thing building your own model buys, and it is reserved for large organizations under strict regulation."
    },
    {
      "t": "A reply that quotes the account's last two credit claims back to the customer",
      "b": "rag",
      "why": "The account history lives in your customer records, so it has to be fetched and handed to the model alongside the prompt."
    }
  ]
};

ACT.genCase = {
  "kind": "case",
  "label": "Mini case",
  "title": "Three jobs, one budget",
  "objective": "7.3",
  "how": "Study the hypothetical case and its invented figures. Make every decision to unlock the debrief; read the explanation for each option, including the ones you did not choose.",
  "brief": "Generative AI arrived at Fairmount Provisions, a hypothetical regional distributor, the way it arrives everywhere: a supervisor started using a free chat tool to answer customers and nobody mentioned it for four months. Three jobs are now on the table, and they are not the same kind of job. Every figure below is invented for this case.",
  "facts": [
    {
      "k": "Job one",
      "v": "Answer a customer's chilled returns question correctly, from the policy revised in March and held only in Fairmount's internal document system"
    },
    {
      "k": "Job two",
      "v": "Write a friendly two-line apology for a late delivery, forty times a day"
    },
    {
      "k": "Job three",
      "v": "Rewrite 4,300 catalogue entries in the house voice, which has not changed in twenty years"
    },
    {
      "k": "What the costs mean",
      "v": "Each figure is a year of standing that rung up, whatever number of jobs run on it"
    },
    {
      "k": "Decision on the table",
      "v": "One deployment model per job, or one model for all three"
    }
  ],
  "exhibit": {
    "name": "What each rung costs Fairmount for a year",
    "caption": "Invented practice figures for this case only.",
    "headers": [
      "Deployment model",
      "Cost for a year"
    ],
    "rows": [
      [
        "A public chat tool, as it comes",
        "free"
      ],
      [
        "The same model embedded in our own app",
        "$40,000"
      ],
      [
        "Retrieval over our own systems",
        "$180,000"
      ],
      [
        "A model fine-tuned on our own examples",
        "$900,000"
      ],
      [
        "Our own model, trained from scratch",
        "$8,000,000"
      ]
    ]
  },
  "questions": [
    {
      "q": "The supervisor asked the public tool about the chilled returns policy and was told, confidently, that returns run 30 days with no documentation. The real policy is 72 hours with a photograph. What happened?",
      "opts": [
        "It was trained on an old copy of the Fairmount policy document and repeated that.",
        "It had never been shown the policy and wrote the one that sounded likeliest.",
        "The prompt was too short for it to find the right section of the policy.",
        "Its guardrails stripped out the part of the answer carrying the real conditions."
      ],
      "a": 1,
      "why": [
        "The policy has never left Fairmount's own document system, so no copy of it, old or current, was ever in the training data.",
        "It predicts words that fit the prompt, and a plausible returns policy is what fits when the real one is unknown.",
        "Length was not the problem; the tool had no route to the document at all, so no prompt would have reached it.",
        "Guardrails suppress categories of output, and none of them would trim a returns window from 72 hours to 30 days."
      ]
    },
    {
      "q": "Which is the cheapest deployment that answers the returns question correctly, and what does it cost Fairmount for a year?",
      "opts": [
        "Embedding the model in Fairmount's own app, at $40,000, since it then reads company records.",
        "A model fine-tuned on Fairmount's documents, at $900,000, because it learns the policy itself.",
        "Fairmount's own model, at $8,000,000, because a customer-facing answer needs that much control.",
        "Retrieval over Fairmount's systems, at $180,000, with the live policy fetched into the prompt."
      ],
      "a": 3,
      "why": [
        "Moving a model behind your own interface does not give it your records; the answers stay as generic as they were.",
        "Tuning teaches the policy as it stood on the day of the run, so it would answer with the pre-March version.",
        "It would answer correctly and cost forty-four times what a retrieval step charges for the same sentence.",
        "The model supplies the language and your own systems supply the facts, which is the case retrieval was built for."
      ]
    },
    {
      "q": "Customer service wants the two-line apology forty times a day, with the specifics added by a person afterwards. Which is the cheapest rung that can do the job, and what does it add to the year's budget?",
      "opts": [
        "The public tool, free, because the request holds no company fact and nothing confidential.",
        "Retrieval, at $180,000, so that each apology can name what went wrong on that account.",
        "Fine-tuning, at $900,000, so that forty apologies a day land in one steady register.",
        "Fairmount's own model, at $8,000,000, because text sent to customers deserves full control."
      ],
      "a": 0,
      "why": [
        "Generic friendly English with nothing confidential in the prompt is the task a public tool handles well for nothing.",
        "Retrieval earns its cost where the facts are the point; here a person adds the facts afterwards anyway.",
        "That is $900,000 for a sentence a free tool writes now, and tuned output here comes out blander than before.",
        "Eight million dollars for two lines of apology is what over-engineering a use case looks like on an invoice."
      ]
    },
    {
      "q": "An analyst proposes running all three jobs on one fine-tuned model to keep things simple. What does that cost, and what breaks?",
      "opts": [
        "It costs $2,700,000, because each of the three jobs needs a separate tuning run.",
        "It costs $1,080,000, because the apologies would still have to run on the public tool.",
        "It costs $900,000, and the returns answer goes stale between tuning runs.",
        "It costs $900,000 and holds, since tuning covers policy, voice and plain language at once."
      ],
      "a": 2,
      "why": [
        "The figure is the cost of standing the rung up for a year, not a charge levied once per job.",
        "That is the total for doing it properly — free, plus $180,000, plus $900,000 — not for this proposal.",
        "It is cheaper than the right answer and still wrong, because tuning cannot carry data that changed in March.",
        "Tuning can hold a voice, but the returns policy is live data, and a frozen impression of it is not the policy."
      ]
    }
  ],
  "debrief": "Three jobs, three rungs, and the expensive one was right only once. Retrieval earns its $180,000 where the facts are the point and the facts keep changing. Fine-tuning earns its $900,000 where a voice has to hold across 4,300 entries that nobody is revising. The apology, which needs no company fact at all, is the job a free public tool does best. Reading the ladder as a ranking is how the budget disappears and the returns answer goes stale at the same time."
};
