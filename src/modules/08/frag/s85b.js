/* Chapter 8 lesson and activity data. Rebuild with node src/build.mjs --module=modules/08. */
PROSE.s85b = "\n<span class=\"eyebrow\">Objective 8.5 · Part 2</span><h2>CRM in practice, and where it goes wrong</h2>\n<p class=\"lede\">You have been on the receiving end of these systems for years. The birthday discount, the email that arrives an hour after you abandon a full cart, the ad that names the thing you looked at once — each one is software acting on a record of you. This part turns the system around and looks at it from the inside: what it changes about the work, what it lets a firm conclude about a person, and where that crosses a line.</p>\n<h3>What changes for the people using it</h3>\n<p>Sales force automation supports the day-to-day work of selling: order processing and tracking, accounts, contacts, opportunities, and a record of each customer’s history and preferences. The change people notice first is less paperwork. The change that matters more is that the work stops living in one person’s head, so it can be handed over, reviewed, and taught.</p>\n<p>Without an integrated view of the pipeline, two salespeople in the same firm can chase the same contract without knowing it. In a company with thousands of sales staff spread across several countries, nobody discovers that by walking down the hall.</p>\n<p>The same record serves five people differently:</p>\n<ul class=\"keys\"><li><b>A salesperson</b> loses fewer hours to paperwork and can hand an account over without its history walking out the door.</li><li><b>A sales manager</b> sees each person’s pipeline, the ratio of orders to calls, the cost of acquiring a customer, and where deals stall.</li><li><b>A marketing manager</b> learns which channel and which message a segment actually answered, and can route a new lead to the right salesperson.</li><li><b>A new hire</b> is trained against the record rather than against whatever the person who left happened to remember.</li><li><b>A customer</b> stops repeating the same account number to three different people in one afternoon.</li></ul>\n<h3>First-contact resolution is a workload number</h3>\n<p>The help desk and the call center have widened into something else. A <b>customer engagement center</b> handles service requests, complaints, returns and information requests across whichever channel the customer prefers — the phone, the web, a self-service page, the firm’s social accounts — rather than making everyone queue in one line. Adding a channel is the easy part. Ending cases is the part that has to be measured.</p>\n<p>A service desk reports two figures that look related and are not. Contacts handled counts how much work came through the door. <b>First-contact resolution</b> counts how often a case ended on the first try.</p>\n<p>The second one multiplies. An unresolved case does not go away. It returns as a second contact, and that contact often produces a third. Ending a case the first time removes the follow-ups as well as the call. Hiring another agent adds capacity to the queue and leaves the arrivals exactly where they were.</p>\n<p>This is why a chatbot placed in front of a desk can make the number worse. Give it something to answer from — a knowledge base, account status, the order record — and it closes cases itself or hands a person a case already understood. Give it nothing, and it collects a name and a problem and passes both along: one more contact per case, none of them resolved.</p>\n<p>Three “service improvements” move work without ending any of it:</p>\n<ul class=\"keys\"><li><b>A new channel with nothing behind it</b> gives the customer a second place to ask the question nobody has answered yet.</li><li><b>A faster greeting</b> shortens the wait before the same case is escalated, which the caller experiences as one more hold.</li><li><b>A deflection target</b> can be met by making a person harder to reach, which comes back later as an angrier second contact.</li></ul>\n<div class=\"activity\" data-activity=\"crmliveCase\"></div>\n<h3>Buy the capability, not the logo</h3>\n<p>Enterprise software splits roughly two ways. Broad suites cover finance, people, manufacturing and customer work in one place, trading some fit for that coverage. Specialists do one job very well — campaign management, supply planning, a small firm’s sales pipeline — and leave you to connect them to everything else.</p>\n<p>Which names sit in the front rank moves around, so read a system by what it does. Two capabilities now cut across all of them. Analytical tools model customer behavior — segments, retention, price sensitivity — and deliver the result to managers as dashboards. Generative tools help tailor the message to a new lead and shorten the time before a customer hears back.</p>\n<p>Four questions separate a capability you need from a demonstration you enjoyed:</p>\n<ul class=\"keys\"><li><b>Which processes must it run?</b> Name them as processes your firm already performs, not as features from the vendor’s list.</li><li><b>Whose data does it need?</b> A model of customer demand runs on order history, and somebody has to keep that history clean.</li><li><b>What does the learning curve cost?</b> Familiar interfaces and tight integration with daily tools cut training time, which is a real line in the budget.</li><li><b>What happens to the output?</b> A forecast nobody is accountable for acting on is a report, not a capability.</li></ul>\n<h3>What a firm may conclude about you</h3>\n<p>Firms want what the chapter calls a <b>360-degree view</b> of the customer. They tie together what you handed over — the loyalty sign-up, the address, purchase and contact history, clicks on the site — with what is publicly posted on your social profiles. Machine learning then merges the records it judges to belong to the same person. Everything the firm concludes from that merged record rests on the match being right.</p>\n<p>The chapter is blunt that not everyone views this positively. The two objections are that it invades customer privacy and that it makes coercive selling easier. A profile built from past behavior can file you in a category you would take exception to, and it keeps you there until something contradicts it.</p>\n<p>Personalization also has a ceiling. The chapter offers Amazon’s recommendations as its example of personal service that works, and a message you can trace back to something you actually bought is easy to accept. Somewhere past that the message knows too much. <b>Over-personalization</b> is the point where a tailored message stops being service the customer welcomes and becomes surveillance they resent, and it backfires on the firm that paid for it.</p>\n<p>Before acting on something the system inferred, ask four things:</p>\n<ul class=\"keys\"><li><b>Would the customer recognize where this came from?</b> A purchase they made reads very differently from a profile assembled about them.</li><li><b>What happens when the inference is wrong?</b> Someone has to be able to correct it, and being wrong should cost the customer little.</li><li><b>Does this serve the customer or only the sale?</b> Answering the question they asked is not the same as pricing them.</li><li><b>Would you say it out loud?</b> A sentence that would be strange spoken by a clerk in a shop is strange in an email.</li></ul>\n<p><b>Social media monitoring</b> sits on the same line. The firm identifies and assesses the volume and sentiment of what is being said about it, its products and its brand. Most customers will never fill in a survey, but they will post when they are delighted or furious.</p>\n<p>Then it has to decide whether to speak. Stepping into a discussion to answer a product question nobody else has answered is service. Praising your own product while appearing to be an ordinary customer is deception, and the chapter names it as such. That is why social work needs written policy: when to step in, how many posts to answer, and who the firm says it is when it speaks.</p>\n<div class=\"activity\" data-activity=\"crmliveSort\"></div>\n<p class=\"takeaway\">Judge a customer system by two questions. Does it end cases, or only move them? And could you explain to the customer, in their own words, how the firm came to know that?</p>\n<div class=\"activity\" data-activity=\"crmliveSelfcheck\"></div>\n";

ACT.crmliveCase = {
  "kind": "case",
  "label": "Mini case",
  "title": "Where the service-desk budget goes",
  "objective": "8.5",
  "how": "Study the hypothetical desk and its invented figures. Make all three decisions to unlock the debrief, and read the explanation under every option.",
  "brief": "A hypothetical parts distributor runs a six-person service desk, and cases arrive faster than the desk closes them. A vendor has quoted four improvements. The budget is fixed at $60,000 for the year, and all four together come to $98,000, so something has to be left on the table.",
  "facts": [
    { "k": "Cases opened each month", "v": "3,000" },
    { "k": "First-contact resolution", "v": "60%" },
    { "k": "Each unresolved case", "v": "Produces 2 more contacts" },
    { "k": "Desk capacity", "v": "6 agents, 700 contacts each a month" },
    { "k": "Budget", "v": "$60,000 for the year" }
  ],
  "exhibit": {
    "name": "The four quotes",
    "caption": "Invented figures for this practice case only.",
    "headers": ["Option", "Cost for the year", "Effect"],
    "rows": [
      ["Hire a seventh agent", "$52,000", "Capacity rises by 700 contacts a month"],
      ["Knowledge base in the agent console", "$20,000", "First-contact resolution rises to 75%"],
      ["Chatbot that takes details and routes", "$18,000", "One extra contact per case, resolves none"],
      ["Call-back instead of hold", "$8,000", "Removes 300 repeat calls a month"]
    ]
  },
  "questions": [
    {
      "q": "Today the desk takes 3,000 cases and 2,400 follow-up contacts, or 5,400 a month, against a capacity of 4,200. Which single purchase removes the most contacts from that 5,400?",
      "opts": [
        "The seventh agent, because 700 more contacts a month get handled.",
        "The chatbot, because every case starts with it instead of an agent.",
        "The knowledge base, because 450 fewer cases produce follow-ups.",
        "The call-back queue, because 300 repeat calls a month disappear."
      ],
      "a": 2,
      "why": [
        "Capacity is not arrival. The seventh agent handles more of the same 5,400 contacts; none of them stop happening.",
        "It adds a contact to every case and ends none of them, so the monthly total climbs by 3,000.",
        "Resolution rises from 60% to 75%, so 450 fewer cases each produce two follow-ups: 900 contacts removed.",
        "This one is real and it is cheap, but 300 contacts is a third of what raising resolution removes."
      ]
    },
    {
      "q": "The desk buys the knowledge base and the call-back queue for $28,000 together, and the exhibit’s two effects do not overlap. Where do monthly contacts land?",
      "opts": [
        "At 4,200, exactly what six agents handle in a month.",
        "At 4,900, still about 700 contacts beyond what six agents handle.",
        "At 5,100, so the backlog shrinks slightly and then resumes growing.",
        "At 5,700, because two new steps add handling time to each case."
      ],
      "a": 0,
      "why": [
        "Resolution takes 5,400 down to 4,500, the call-back queue removes 300 more, and 4,200 is exactly capacity.",
        "4,900 is the capacity a seventh agent would buy, not what these two changes do to arrivals.",
        "5,100 counts the call-back queue by itself and leaves out the 900 contacts that resolution removes.",
        "Neither purchase adds a step for the customer. The chatbot is the option in this exhibit that would."
      ]
    },
    {
      "q": "That leaves $32,000 unspent, and the vendor offers the routing chatbot for $18,000 of it. What do you do?",
      "opts": [
        "Buy it, because a budget left unspent gets cut in the next planning round.",
        "Leave it until answers sit behind it, since routing alone adds contacts.",
        "Buy it and drop the call-back queue, so the spend stays tidy.",
        "Buy it, because a second channel lifts the satisfaction score."
      ],
      "a": 1,
      "why": [
        "Spending the rest to protect next year's budget buys 3,000 extra contacts a month, which is a poor trade.",
        "Connected to the knowledge base and the order record, it would close cases instead of announcing them.",
        "The call-back queue removes 300 contacts and the chatbot adds 3,000, so that swap moves the desk backwards.",
        "A satisfaction score measures a feeling about a channel; the workload number is what says whether cases ended."
      ]
    }
  ],
  "debrief": "The largest line item would have eaten most of the budget and left the arrivals untouched. The two cheap changes took 1,200 contacts a month out of the queue for $28,000, which lands the desk exactly on the capacity six agents already have. The chatbot, the one purchase the desk could still afford, is the one it should refuse until there is something behind it: resolution is a multiplier on workload, and capacity is not."
};

ACT.crmliveSort = {
  "kind": "sort",
  "label": "Sort",
  "title": "Service or surveillance",
  "objective": "8.5",
  "how": "Put each use of customer data on the side you could defend to the customer. Every item carries the detail that decides it, and the explanation names that detail.",
  "buckets": [
    {
      "id": "expect",
      "name": "Service the customer would welcome",
      "hint": "The customer would recognize where the data came from and read the action as the firm doing its job."
    },
    {
      "id": "cross",
      "name": "Surveillance the customer would object to",
      "hint": "The action rests on a guess the customer never sees, or hides who is speaking, and they have no way to question it or put it right."
    }
  ],
  "items": [
    {
      "t": "The agent sees the caller’s last three orders while the call is still going",
      "b": "expect",
      "why": "Those orders were placed with this firm. Having them on screen is the reason the caller does not have to recite an account history to a stranger."
    },
    {
      "t": "A reminder that the filter on the model they bought is due for replacement",
      "b": "expect",
      "why": "It uses the purchase they made, answers a need they already have, and can be switched off. Nothing is inferred beyond the product record."
    },
    {
      "t": "An email from the retailer an hour after they left an item in the cart on that same site",
      "b": "expect",
      "why": "They began this purchase on this firm’s own site, so the message answers something they started, and nothing new was gathered about them. The version that crosses is the same item chasing them across unrelated sites for a fortnight."
    },
    {
      "t": "Two accounts merged into one record by a matching model, with staff able to undo a wrong match",
      "b": "expect",
      "why": "It uses the firm’s own records and spares a returning customer from starting over. The match is still a guess, and a wrong merge shows one person another person’s history, which is exactly why the undo is what keeps this on the welcome side."
    },
    {
      "t": "A reply under the firm’s own name to a public product question nobody has answered",
      "b": "expect",
      "why": "The chapter tells a firm to step into a discussion when a customer asks a product question and no other customer answers. Saying who is speaking is what separates this from posing as an ordinary customer."
    },
    {
      "t": "A churn score that opens the call with a retention discount instead of the fault they phoned about",
      "b": "cross",
      "why": "Predicting who might leave is ordinary analytical CRM, and the prediction runs on their own history. What crosses is aiming the call at the sale before the customer has said what went wrong."
    },
    {
      "t": "A higher price shown to a shopper whose profile suggests they can pay it",
      "b": "cross",
      "why": "The inference is about the person’s means rather than about the product, and they were never asked. This is the coercive selling the chapter warns that CRM can make easier."
    },
    {
      "t": "A low-value label from past purchases that routes their calls to the slowest queue",
      "b": "cross",
      "why": "A profile built on past behavior has filed them in a category they would take exception to, and nothing they do today gets them back out of it."
    },
    {
      "t": "Staff praising their own product in a forum while appearing to be ordinary customers",
      "b": "cross",
      "why": "The chapter separates grassroots marketing from posing as a casual conversation partner. Here the reader is being deceived about who is talking to them."
    }
  ]
};

ACT.crmliveSelfcheck = {
  "kind": "selfcheck",
  "label": "Self-check",
  "title": "Could you run this conversation without the page?",
  "objective": "8.5",
  "how": "Rate each statement honestly; anything you cannot do yet has a pointer to the exact place in this section to reread.",
  "items": [
    {
      "t": "I can explain why first-contact resolution removes more work than the one contact it resolves.",
      "hint": "Follow an unresolved case through the workload paragraphs: it returns, and the return often produces another contact."
    },
    {
      "t": "I can say what has to sit behind a chatbot before it improves a service desk’s numbers.",
      "hint": "The paragraph on chatbots names the three things it answers from, and what it does when it has none of them."
    },
    {
      "t": "I can name three things sales force automation changes about a salesperson’s and a sales manager’s week.",
      "hint": "The five-item list under the first heading, which walks the same record past five different people."
    },
    {
      "t": "I can describe the 360-degree view and say which of its pieces the customer handed over.",
      "hint": "The opening of the last section, where the sign-up, the purchase history and the clicks sit beside the public profiles."
    },
    {
      "t": "I can state the two objections the chapter records against CRM and what it means for personalization to backfire.",
      "hint": "The two paragraphs after the 360-degree view: privacy, coercive selling, and the point where a message knows too much."
    },
    {
      "t": "I can put four questions to a proposed use of customer data before I would approve it.",
      "hint": "The four-item list before the social monitoring paragraph: where it came from, being wrong, who it serves, saying it aloud."
    },
    {
      "t": "I can say where social monitoring stops being service and becomes deception.",
      "hint": "The closing paragraph of the section, on answering an unanswered question versus posing as an ordinary customer."
    }
  ]
};
