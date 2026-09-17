/* Chapter 7 lesson and activity data. Rebuild with node src/build.mjs --module=modules/07. */
PROSE.s73b = "\n<span class=\"eyebrow\">Objective 7.3 &middot; Part 2</span><h2>Agents, oversight, and governing the use of it</h2>\n<p class=\"lede\">Fairmount Provisions, the invented food and household goods distributor running through this module, logs 300 order exceptions a quarter: short deliveries, damaged cases, wrong substitutions. Two people read each one, look up the account, choose a remedy and write to the customer. It takes them most of a week. Software can now run that whole sequence unattended. The interesting question is not whether it can. It is where a person stands in it, and who answers when it goes wrong.</p>\n<h3>From a prompt to a goal</h3>\n<p>Most of the tools in the previous part return a one-shot response. You write a prompt, you get one answer, and then you do the next thing yourself. A <b>generative AI agent</b> is a system that autonomously completes a multi-step task from a goal. You describe the outcome you want. It works out the steps.</p>\n<p>The chapter names the pieces that make that possible. Read them against the exception queue above and each one has an obvious job to do.</p>\n<ul class=\"keys\"><li><b>Memory</b> holds what happened in past interactions, such as how three similar damaged-case claims were settled last month.</li><li><b>Planning and reasoning</b> breaks the goal into steps and sequences them: read, look up, decide, draft, send.</li><li><b>Tools</b> are the databases, the business software and the other models it reaches through their application programming interfaces, or APIs.</li><li><b>Execution</b> is the part that does it, writing the email, sending it, and logging it against the account.</li></ul>\n<p>Four features separate an agent from a basic tool. The first two rows change what you hand over and what comes back. The last two change what your job is.</p>\n<div class=\"tbl-wrap\"><table class=\"tbl\">\n<thead><tr><th>Feature</th><th>Basic tool</th><th>Agent</th></tr></thead>\n<tbody>\n<tr><td><b>Input</b></td><td>A prompt</td><td>A goal or objective</td></tr>\n<tr><td><b>Output</b></td><td>One response, then it stops</td><td>A multi-step plan, and the actions</td></tr>\n<tr><td><b>Autonomy</b></td><td>None</td><td>Medium to high</td></tr>\n<tr><td><b>Integration</b></td><td>Rare</td><td>Common: APIs, tools, the web</td></tr>\n</tbody>\n</table></div>\n<p>Integration is what turns a wrong sentence into a wrong action. A tool that drafts a bad email costs you the two seconds it takes to delete it. An agent that sends one has already spent your money, under your letterhead, politely, in writing.</p>\n<p>So designing an agent is less about writing prompts and more about mapping the process you already run, planning the integrations, testing and overseeing the result, and designing how a person interacts with it. The role shifts from prompt engineer to agent designer.</p>\n<div class=\"activity\" data-activity=\"agentSim\"></div>\n<h3>Oversight costs money, and so does going without it</h3>\n<p>Put the agent on all 300 of those exceptions and let it choose remedies with a prediction model that tests at 88% accuracy. It acts on every one, so every model error reaches a customer: 12% of 300 is 36 wrong remedies a quarter, at roughly $2,400 each in wrongly issued credit, redelivery and lost goodwill. $86,400, if nothing catches them.</p>\n<p>Now fund one reviewer. Where you seat that reviewer changes both what they cost you and what they catch. The figures below are invented for one hypothetical quarter, but the shape they make is the lesson.</p>\n<div class=\"tbl-wrap\"><table class=\"tbl\">\n<thead><tr><th>Reviewer sits</th><th>Reviewer cost</th><th>Caught</th><th>Damage through</th><th>Total</th></tr></thead>\n<tbody>\n<tr><td>Nowhere</td><td>$0</td><td>0%</td><td>$86,400</td><td><b>$86,400</b></td></tr>\n<tr><td>After Read</td><td>$34,000</td><td>40%</td><td>$51,840</td><td><b>$85,840</b></td></tr>\n<tr><td>After Look up</td><td>$30,000</td><td>55%</td><td>$38,880</td><td><b>$68,880</b></td></tr>\n<tr><td>After Decide</td><td>$18,000</td><td>90%</td><td>$8,640</td><td><b>$26,640</b></td></tr>\n<tr><td>After Draft</td><td>$26,000</td><td>95%</td><td>$4,320</td><td><b>$30,320</b></td></tr>\n</tbody>\n</table></div>\n<p>Two of those rows lose at every level of accuracy. A gate placed before the machine has made its judgement loses twice over: everything has to pass through it, and there is nothing yet to check. Reading raw exceptions costs the most and catches the least, and moving that reviewer one step later is both cheaper and better, so neither early seat is ever the answer.</p>\n<p>Running with no gate wins only while the damage stays under $20,000 a quarter. Below that, an $18,000 reviewer costs more than the nine tenths of it they would stop. Nine wrong remedies are enough to pass $20,000. This quarter produced thirty-six, so here the unattended option is not a saving but an unbilled liability.</p>\n<p>The live question, then, is which of the two later positions wins. Above roughly 78% accuracy, reviewing the decision is enough. Below it, so much is going wrong that reading the finished draft is worth paying more per item for. How much oversight to buy is a function of how reliable the machine is.</p>\n<p>Gates cost a second currency too. Every one of them slows the answer to the customer down, and that bill never arrives in a form anyone files. The chapter's own rule outlives the objection: a person reviews and approves the output before it is used, above all where the stakes are high.</p>\n<h3>What the chapter says can go wrong</h3>\n<p>Oversight earns its money because of a specific list of failures rather than a general unease. The chapter names six of them, and because they fail in different ways they need different controls.</p>\n<ul class=\"keys\"><li><b>Inaccuracy and hallucination</b> means output that is wrong or nonsensical, delivered in the same confident register as everything else.</li><li><b>Lack of transparency</b> means the system is a black box, so nobody can say how or why a response was produced.</li><li><b>Bias and fairness</b> follows from training data that leans heavily towards one part of the world and one language.</li><li><b>Confidentiality and data leakage</b> happens when the prompts and responses of users are reused to improve the model itself.</li><li><b>Overreliance</b> produces complacency and deskilling, because people stop checking a tool that is usually right.</li><li><b>Legal and ethical concerns</b> cover copyright, plagiarism out of the training data, and disinformation spread by malicious actors.</li></ul>\n<p>The people who build these systems bolt guardrails on to block certain kinds of output, and the chapter is honest that this amounts to a bandage rather than a cure. Sort the complaints below into the failure each one actually is, because the fix differs every time.</p>\n<div class=\"activity\" data-activity=\"agentSort\"></div>\n<h3>Deployment, cost and governance</h3>\n<p>The deployment model you choose sets the ceiling on some of those risks. A public tool may feed your input back into training. A tool embedded through an API inside your own application stays limited to what it was trained on. Retrieval adds your own records to the prompt. Fine-tuning buys a voice and a domain, periodically, at real expense.</p>\n<p>The chapter is blunt that none of this is free, and it counts four kinds of cost. Read them before approving anything, because the third one is what this whole section is about.</p>\n<ul class=\"keys\"><li><b>Time</b> goes into training, prompting and waiting for output, which rules these tools out of some time-critical work.</li><li><b>Money</b> covers subscriptions and metered API calls, and fine-tuning or an internal model runs into millions of dollars.</li><li><b>Errors</b> cost you twice over: what it takes to find and fix them, and what it costs when nobody finds them.</li><li><b>Environment</b> is paid in energy, raw materials and electronic waste as the computing demand behind these systems keeps climbing.</li></ul>\n<p>Governance is how an organization holds all of that to its own values and its own regulators. The chapter names four mechanisms, and each one answers a different risk from the list above.</p>\n<ul class=\"keys\"><li><b>Prompt engineering guidelines</b> train staff, supply standard templates, and forbid confidential data in prompts to public tools.</li><li><b>Access controls</b> limit which roles may use the tool, and audit usage for unusual patterns or policy breaches.</li><li><b>Human-in-the-loop review</b> requires a person to approve output before it is used, above all in high-stakes situations.</li><li><b>Data and model governance</b> tracks what data is used for what, and classifies it by whether it may be entered at all.</li></ul>\n<p>Access control has a known failure mode worth naming. Staff determined to use these tools will find a workaround, and the workaround is usually a free public tool, which raises the risk instead of lowering it.</p>\n<h3>A voice that is not who it claims to be</h3>\n<p>The same technology that drafts your emails also fabricates media. A <b>deepfake</b> is deep learning plus fake: software maps and learns facial features, swaps faces and audio, and turns real footage into something else entirely. Voices can be cloned and synthesised into saying whatever the faker wants said.</p>\n<p>This is not theoretical. Attackers cloned the voice of a chief executive of a company in the United Kingdom and used it in a wire transfer scam that took about US$220,000.</p>\n<p>Early fakes were easy to spot by their glitches. Modern ones set a generator against a discriminator until the discriminator can no longer tell, which means &ldquo;it sounded real&rdquo; has stopped being evidence of anything. So stop listening to the voice and read the shape of the request instead.</p>\n<ul class=\"keys\"><li><b>Urgency</b> compresses the window until there is no time left to check anything, which is the entire point of it.</li><li><b>An unusual channel</b> moves a payment decision onto a phone call when it normally lives in a written approval process.</li><li><b>An unverifiable reason</b> explains away the step you would otherwise take, such as a missing laptop at an airport.</li><li><b>A request for secrecy</b> keeps the one colleague who would recognise the scam out of the conversation entirely.</li></ul>\n<p>The defence costs nothing. Hang up, and ring back on a number you looked up yourself. The attacker controls the call they placed, not the call you place.</p>\n<h3>Who answers for it</h3>\n<p>One principle survives every deployment model in this chapter. A business answers for what its own systems tell its customers. A tribunal has already rejected the argument that a chatbot is a separate legal entity, and made the company honour a policy the chatbot had invented.</p>\n<p>Read that alongside the reviewer table. Automation moved the work. It did not move the accountability, and it multiplied the rate at which one error can be repeated under your name.</p>\n<div class=\"activity\" data-activity=\"agentCase\"></div>\n<p class=\"takeaway\">An agent takes a goal rather than a prompt, and then it acts. Decide where the person stands before it goes live: buy oversight at the point where the machine's judgement first becomes something a human can read in seconds, and remember whose name is on the letter.</p>\n";

ACT.agentSim = {
  "kind": "sim",
  "label": "Decision walkthrough",
  "title": "Stand the agent up, and decide where you stand in it",
  "objective": "7.3",
  "how": "Work the four decisions in order and read what each one costs. Fairmount Provisions and every figure here are invented for practice; the reasoning is what transfers.",
  "steps": [
    {
      "situation": "Customer operations wants the 300 exceptions a quarter handled without a clerk driving every step. The work is: pull the exception out of the order system, fetch the account and its terms, choose a remedy, write the customer email, send it and log it. What do you commission?",
      "opts": [
        {
          "t": "A chat tool the two clerks paste each exception into, one step at a time",
          "out": "That is a one-shot tool. It returns a response and stops, so the clerks still do the looking up, the sending and the logging, and the week of work stays a week."
        },
        {
          "t": "An agent given the goal, with API access to the order and customer systems",
          "ok": true,
          "out": "Right. A goal goes in, a multi-step plan and the actions come out, and the integration is what makes it possible. It also means every remedy it picks becomes an action, which is what the rest of this walkthrough is about."
        },
        {
          "t": "A longer prompt template with the account history pasted in by hand each time",
          "out": "A better prompt is still a prompt. Autonomy stays at none and integration stays rare, so nothing about the week of clerical work actually changes."
        },
        {
          "t": "A prediction model that scores each exception and leaves the rest to the clerks",
          "out": "That is a model, not an agent. It produces a number rather than a plan, it reaches nothing through an API, and no email gets written by it."
        }
      ]
    },
    {
      "situation": "The agent goes live choosing remedies from a model that tests at 88% accuracy. That is 36 wrong remedies a quarter at about $2,400 each, or $86,400 of damage if nothing catches them. You can fund one reviewer, seated at one point in the pipeline, or none at all. Which seat do you expect to leave the smallest total bill, counting the reviewer and the damage that still gets through?",
      "opts": [
        {
          "t": "Nowhere. Let the agent read, look up, decide, draft and send unattended",
          "out": "Free to staff, and $86,400 of wrong remedies reach customers. Unattended autonomy is not a saving. It is an unbilled liability that arrives politely, in writing, under your name."
        },
        {
          "t": "After Read, so a person sees every raw exception before the agent starts",
          "out": "$34,000 of reviewer and only 40% caught, for $85,840 all in. The most expensive gate and the least effective one: everything passes through it and there is nothing yet to check."
        },
        {
          "t": "After Look up, with the account and its terms already on screen",
          "out": "$30,000 and 55% caught, for $68,880. Better, because the account is visible, but the remedy has not been chosen yet, so you are checking inputs rather than judgement."
        },
        {
          "t": "After Decide, on the chosen remedy, before anything has been written",
          "ok": true,
          "out": "$18,000 and 90% caught, for $26,640. The cheapest total on the board. The error is a wrong remedy, and this is the first moment it exists in a form a person can read in seconds."
        },
        {
          "t": "After Draft, on the finished customer email",
          "out": "$26,000 and 95% caught, for $30,320. It catches slightly more, because a finished email shows drafting mistakes too, but reading one takes longer and the drafting effort on the bad ones is already spent."
        }
      ]
    },
    {
      "situation": "A year on, nobody has retrained the model and its accuracy has slipped to 70%. That is 90 wrong remedies a quarter, or $216,000 of damage unchecked. Reviewer costs have not changed. Which placement is cheapest now, counting the reviewer and what still escapes?",
      "opts": [
        {
          "t": "Leave it where it is, after Decide: $18,000 of reviewer plus $21,600 that escapes, or $39,600",
          "out": "Reasonable, and no longer the cheapest. At 90 errors a quarter the tenth that slips past a decision review costs more than the extra reviewer time a draft review needs."
        },
        {
          "t": "Move it to after Draft: $26,000 of reviewer plus $10,800 that escapes, or $36,800",
          "ok": true,
          "out": "Right. Below roughly 78% accuracy the thorough gate wins, because the volume of error grew faster than the reviewer's bill. How much oversight to buy depends on how reliable the machine is."
        },
        {
          "t": "Move it to after Look up, to catch problems earlier in the sequence",
          "out": "Earlier is not better here. The remedy has not been chosen yet, so 45% still escapes: $30,000 of reviewer plus $97,200 of damage, or $127,200."
        },
        {
          "t": "Drop the gate and rewrite the customer apology template instead",
          "out": "That treats the wording as the problem. Ninety wrong remedies at $2,400 is $216,000 a quarter, and a beautifully worded wrong credit is still a wrong credit."
        }
      ]
    },
    {
      "situation": "At 4:50pm on a Friday the accounts payable clerk takes a call. It is the chief financial officer's voice: her accent, the way she trails off, the cold she has had all week. She is at an airport with no laptop, a supplier will not release a chilled shipment without $180,000 inside twenty minutes, and she asks the clerk not to loop anyone in because it is embarrassing. The clerk comes to you.",
      "opts": [
        {
          "t": "Release the payment. Twenty years of hearing someone speak is evidence enough",
          "out": "The voice is the part an attacker can make perfect. Faked audio has already been used to clone a chief executive's voice in the United Kingdom and take about US$220,000 by wire transfer."
        },
        {
          "t": "Ask her something personal she alone would know, then release the payment",
          "out": "Whoever is behind a cloned voice has done their research, and they are still on the line they chose. A challenge question tests knowledge, not the channel the request arrived on."
        },
        {
          "t": "End the call and ring her back on the number in the internal directory",
          "ok": true,
          "out": "Right. The attacker controls the call they placed, not the call you place. If it really is her she answers and is mildly irritated, which is a cheap outcome at $180,000."
        },
        {
          "t": "Email her for written confirmation and pay if she replies within the hour",
          "out": "An attacker able to place that call may hold the mailbox as well. A reply inside the hour proves the mailbox answered, which is not the same as proving she did."
        }
      ]
    }
  ]
};

ACT.agentSort = {
  "kind": "sort",
  "label": "Sort",
  "title": "Which failure is this, really?",
  "objective": "7.3",
  "how": "Drop each complaint into the risk the chapter would file it under, then check. The control that fixes it is different in every bucket, which is why the filing matters.",
  "buckets": [
    {
      "id": "halluc",
      "name": "Inaccuracy and hallucination",
      "hint": "Confidently wrong output. The system has no representation of true."
    },
    {
      "id": "opaque",
      "name": "Lack of transparency",
      "hint": "A black box. Nobody can say how or why that answer appeared."
    },
    {
      "id": "bias",
      "name": "Bias and fairness",
      "hint": "Whatever was in the training data comes back out of the model."
    },
    {
      "id": "leak",
      "name": "Confidentiality and data leakage",
      "hint": "What was typed in may end up improving somebody else's model."
    },
    {
      "id": "over",
      "name": "Overreliance",
      "hint": "People stop checking, and the skill to check quietly erodes."
    },
    {
      "id": "legal",
      "name": "Legal and ethical concerns",
      "hint": "Copyright, plagiarism from training data, and deliberate disinformation."
    }
  ],
  "items": [
    {
      "t": "The agent quotes a returns window the company has never offered, in one fluent paragraph.",
      "b": "halluc",
      "why": "Nothing in the system knows whether an output is correct, so a plausible sentence and a true one look identical."
    },
    {
      "t": "A depot summary names a supplier that appears nowhere in the documents it was given.",
      "b": "halluc",
      "why": "The stochastic step in generating a response can produce content with no basis in the input, which is a hallucination."
    },
    {
      "t": "A refused credit claim goes to arbitration and nobody can reconstruct why that remedy was chosen.",
      "b": "opaque",
      "why": "These models are effectively a black box, which rules them out wherever the output has to be explained."
    },
    {
      "t": "Asked which factors drove a refusal, the people who built the system cannot say either.",
      "b": "opaque",
      "why": "Even the creators cannot trace how a particular response was produced, so there is no explanation available to give."
    },
    {
      "t": "Draft supplier profiles read fluently for one region and thinly for most of the world.",
      "b": "bias",
      "why": "Training text skews to the global north and to English, so under-represented sources yield noticeably weaker output."
    },
    {
      "t": "Screening language repeats a preference already sitting in years of old hiring notes.",
      "b": "bias",
      "why": "Any bias inherent in the training data is likely to be reproduced by the model that learned from it."
    },
    {
      "t": "A manager pastes the unsigned distribution contract into a free public tool to summarise it.",
      "b": "leak",
      "why": "Providers often use prompts and responses to tweak their models, so that text can become training data."
    },
    {
      "t": "A clerk includes a customer's full account and payment details in a prompt, to save time.",
      "b": "leak",
      "why": "Personal data entered into a public tool can leave the company's control along with the prompt that carried it."
    },
    {
      "t": "Dispatch has stopped sanity-checking the agent's remedies because it is usually right.",
      "b": "over",
      "why": "Taking output at face value is exactly the complacency the chapter warns about, and it is how errors reach customers."
    },
    {
      "t": "Two years in, nobody on the team can still write the exception letter unaided.",
      "b": "over",
      "why": "Deskilling is the slower half of overreliance: the ability to check the tool erodes while you depend on it."
    },
    {
      "t": "A marketing paragraph turns out to reproduce wording from a source in the training data.",
      "b": "legal",
      "why": "It is often uncertain whether output is new or copied, which raises a real copyright infringement risk."
    },
    {
      "t": "Someone outside the company circulates a fabricated announcement about it, complete with a convincing quotation.",
      "b": "legal",
      "why": "These tools are used by malicious actors to spread disinformation, which the chapter names as an ethical concern."
    }
  ]
};

ACT.agentCase = {
  "kind": "case",
  "label": "Mini case",
  "title": "The quarter the agent ran alone",
  "objective": "7.3",
  "how": "Study the hypothetical quarter and its invented figures. Make every decision to unlock the debrief, and read the explanation attached to each option.",
  "brief": "Fairmount Provisions is a hypothetical distributor. It ran the exception agent for one full quarter with no review gate anywhere in the pipeline, on a model that tested at 88% accuracy. The quarter has closed, the bills are in, and the board wants four questions answered before it funds anything else.",
  "facts": [
    {
      "k": "Exceptions handled",
      "v": "300 in the quarter, every one acted on"
    },
    {
      "k": "Model accuracy",
      "v": "88%, measured on held-back test data"
    },
    {
      "k": "Review gate in place",
      "v": "None. The agent read, decided, drafted and sent"
    },
    {
      "k": "Cost of one wrong remedy",
      "v": "About $2,400 in credit, redelivery and goodwill"
    },
    {
      "k": "Decision on the table",
      "v": "Fund a reviewer, or run the next quarter the same way"
    }
  ],
  "exhibit": {
    "name": "What each reviewer position would have cost",
    "caption": "Invented figures for this hypothetical quarter only.",
    "headers": [
      "Where the reviewer sits",
      "Reviewer cost",
      "Caught",
      "Damage through",
      "Total"
    ],
    "rows": [
      [
        "Nowhere",
        "$0",
        "0%",
        "$86,400",
        "$86,400"
      ],
      [
        "After Read",
        "$34,000",
        "40%",
        "$51,840",
        "$85,840"
      ],
      [
        "After Look up",
        "$30,000",
        "55%",
        "$38,880",
        "$68,880"
      ],
      [
        "After Decide",
        "$18,000",
        "90%",
        "$8,640",
        "$26,640"
      ],
      [
        "After Draft",
        "$26,000",
        "95%",
        "$4,320",
        "$30,320"
      ]
    ]
  },
  "questions": [
    {
      "q": "Reading the exhibit, how much more did the ungated quarter cost than the cheapest reviewer position would have?",
      "opts": [
        "Nothing extra, because no reviewer was hired and no salary was ever paid out.",
        "$18,000, which is the reviewer bill the company avoided by not staffing a gate.",
        "$59,760, the gap between $86,400 of damage and the $26,640 best total.",
        "$86,400, since a reviewer would have caught every dollar of that damage."
      ],
      "a": 2,
      "why": [
        "No reviewer was hired, but 36 wrong remedies still went out and the company still paid for them.",
        "That is the price of the gate, not the price of skipping it, and it leaves the damage side out.",
        "Correct. Skipping oversight saved an $18,000 bill and bought $86,400 of damage in exchange.",
        "No position catches everything. Even the best gate lets about a tenth of the wrong remedies through."
      ]
    },
    {
      "q": "A customer disputes a credit the agent issued, and the company replies that the system chose it. Who is accountable to that customer?",
      "opts": [
        "Fairmount does: a business answers for what its automated systems tell a customer.",
        "The software supplier does, because the remedy came out of a licensed tool.",
        "Nobody does, because the agent acted inside the authority it was granted here.",
        "The two clerks do, since the exception queue has been their responsibility for years."
      ],
      "a": 0,
      "why": [
        "Correct. A tribunal has already rejected the claim that a chatbot is a separate legal entity.",
        "A licence does not transfer responsibility for what your company publishes to your own customers.",
        "Delegating a decision delegates the work and leaves the accountability exactly where it was.",
        "The deployment removed them from the loop, so they cannot answer for a decision they never saw."
      ]
    },
    {
      "q": "The board asks why the agent chose redelivery over a credit in the disputed case. What is the honest answer?",
      "opts": [
        "The training data can be re-read to show which past cases produced that choice.",
        "The prompt log holds the reasoning the model followed on the way to the remedy.",
        "A fine-tuned model would have recorded its own reasons beside each remedy it chose.",
        "Nobody can reconstruct it, so work that needs explaining needs another tool."
      ],
      "a": 3,
      "why": [
        "Inspecting training data does not reveal how one particular response was generated out of it.",
        "A log stores the prompt and the output, not a chain of reasoning the system never kept.",
        "Fine-tuning changes the domain and the tone of the output; it does not make a model explainable.",
        "Correct. These systems are a black box, so any use that requires an explanation has to be rethought."
      ]
    },
    {
      "q": "Which single governance mechanism does this exhibit argue for most directly?",
      "opts": [
        "Access controls, limiting which roles inside the company can reach the agent.",
        "Human-in-the-loop review, seated where the agent's judgement first becomes readable.",
        "Prompt guidelines, so that every exception is described to the agent in a standard form.",
        "Data classification, keeping customer account details out of any public tool."
      ],
      "a": 1,
      "why": [
        "Access control limits who may use the tool and does nothing about a remedy the tool gets wrong.",
        "Correct. The exhibit prices review positions, and the cheapest total sits right after the decision.",
        "Better prompts improve the quality of output, but the exhibit measures what an unreviewed error costs.",
        "Classification protects confidentiality, which is a real risk and not the one this exhibit prices."
      ]
    }
  ],
  "debrief": "The quarter spent $86,400 on wrong remedies to avoid an $18,000 reviewer, and the company still owned every sentence the agent sent under its name. Autonomy moved the work; it did not move the accountability. Buy oversight at the step where the machine's judgement first becomes something a person can read, and remember that the amount worth buying rises as the model's accuracy falls."
};
