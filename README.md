# Management Information Systems — course modules

Interactive, self-contained study modules for an introductory information systems course.

## Modules

| Module | Page | Covers |
|---|---|---|
| 1 | [`module-01-managing-in-the-digital-world.html`](module-01-managing-in-the-digital-world.html) | Chapter 1 Objectives 1.1–1.4: the digital world and digital density · what an information system is · the dual nature of IS in organizational success and failure · computer ethics, privacy and intellectual property · plus three clearly labeled application supplements: Porter&rsquo;s strategy frameworks, deciding where AI belongs in a business workflow, and the chapter&rsquo;s concepts expressed as runnable code |
| 2 | [`module-02-enabling-strategy-through-information-systems.html`](module-02-enabling-strategy-through-information-systems.html) | Chapter 2 Objectives 2.1&ndash;2.3: decision-making levels and functional areas &middot; automating, organizational learning and strategy &middot; the five competitive forces &middot; generic strategies, resources and the value chain &middot; business and revenue models, platforms and network effects &middot; innovation &middot; plus four application supplements: AI in the strategy workflow, an analyst&rsquo;s toolkit of **runnable** spreadsheet and SQL exercises, strategy as code, and a closing rehearsal that runs the whole analysis as one deliverable |
| 3 | [`module-03-information-systems-infrastructure.html`](module-03-information-systems-infrastructure.html) | Chapter 3 Objectives 3.2&ndash;3.4: what an IS infrastructure is made of &mdash; hardware, system software and storage &middot; networks, and how the internet and the web actually carry a request &middot; intranets, extranets and data centres &middot; why infrastructure ages, and the pressures that force it to change &middot; cloud computing, its characteristics and its service models &middot; plus two clearly labeled application supplements: where the data itself lives, bridging to the course&rsquo;s SQLite work, and the internet as a business tool |
| 4 | [`module-04-electronic-commerce-and-fintech.html`](module-04-electronic-commerce-and-fintech.html) | Chapter 4 Objectives 4.1 and 4.5: what electronic commerce is, the electronic marketplace and disintermediation &middot; business-to-consumer, business-to-business, consumer-to-consumer and e-government trade &middot; fintech and what it displaces &middot; payment services, mobile and peer-to-peer payment &middot; cryptocurrency, the blockchain, and what a trusted middleman was actually for &middot; card-not-present risk, chargebacks, risk scores and the cost of a false decline &middot; consumer protection, online sales tax and intellectual property including digital rights management &middot; plus two clearly labeled application supplements: the platform, payment and fulfillment ecosystem behind a storefront together with the technology answering back on the shop floor, and a rehearsal that turns the chapter into a written strategy analysis. **This module set the reading density the others were later brought to** &mdash; a mini case study in every section, and prose that exists to arm the activity after it rather than to substitute for it |
| 5 | [`module-05-collaboration-and-social-media.html`](module-05-collaboration-and-social-media.html) | Chapter 5 Objectives 5.1&ndash;5.3, arranged around the chapter&rsquo;s own four jobs &mdash; communicate, cooperate, collaborate, connect: why organizational communication and collaboration is strategic, with virtual teams, synchronous against asynchronous work, and the three families of collaboration tools &middot; intranets, employee portals, enterprise search and self-service &middot; the shift from Web 1.0 to Web 2.0 and user-generated content &middot; blogs, microblogging, instant messaging and live video &middot; media sharing, tagging, geotagging, social bookmarking and cataloging &middot; cloud collaboration, content and learning management systems, collective intelligence, wikis, open source, open innovation and crowdsourcing &middot; social and professional networks, consumerization, network effects, viral marketing and social-local-mobile &middot; the organizational conditions that decide whether an internal social tool is adopted &middot; the downsides, from fabricated reviews and crowdfunding failures to a complaint going viral, and the crisis playbook &middot; plus two clearly labeled application supplements: **the whole chapter read through Porter&rsquo;s five forces and the value chain**, and a rehearsal of the written strategy analysis this course asks for. Built at Module 4&rsquo;s case-led density, with a mini case study in every section |

| 6 | [`module-06-managing-data-and-business-intelligence.html`](module-06-managing-data-and-business-intelligence.html) | Chapter 6 Objectives 6.1–6.3: strategic data and data flows · quality, ethics, and governance · relational tables, keys, relationships, normalization, and master data management · runnable SQL and business reports · OLTP, warehouses, ETL, and data marts · big data, document stores, and data lakes · two application supplements covering **all five Porter forces and all nine value-chain activities**, followed by one scoped data initiative. Nine sections, 30 interactive activities, 58 glossary terms, and a 32-question final challenge. HTML edition; no PDF companion generated yet. |

**Reading density is a deliberate, measured property.** Every section runs roughly 800&ndash;1,000 words of
prose with no paragraph over about 65 words and a quarter to a third of the body in lists, so the first
activity arrives early and no unbroken stretch of reading runs long. Modules 1&ndash;3 were originally
two to four times that and were retrofitted to it; Module 4 established it.

Each module ships as **one HTML file with nothing external** — no CDN, no fonts, no scripts, no
network of any kind. Open it from a hard drive, a flash drive, or any static host and it works.
Modules 1–5 also have a print-ready PDF companion carrying the same lesson plus every answer.

## What is in a module

- **Lesson prose** written for a reader with no business or computing background: define the idea,
  then name it, then give an example they already recognise.
- **Interactive activities** inline with the reading, not bolted on at the end — mini case studies,
  multiple choice, classification, matching, sequencing, cloze, reveal cards, tabbed diagrams,
  branching decision scenarios, and self-checks. On every question **each option explains itself**,
  including the ones the reader did not choose.
- **A searchable glossary** of the chapter vocabulary, filterable by objective.
- **A closing challenge** of situations rather than definitions, scored per objective so a weak area
  is visible instead of averaged into a single number.
- **Saved completion progress** kept in the reader's own browser. Nothing is submitted, transmitted,
  or collected. Answers reset on reload so every attempt is fresh; the completion record persists
  until the reader clears it. Graded activities still show correctness separately.
- **A complete JavaScript-free layer.** With scripting off, the page still reads as a full lesson
  with every activity summarised and answered, which is also what makes it printable.

## Working on a module

Pages are generated. Edit the sources in `src/`, never the built HTML — see
[`src/README.md`](src/README.md) for the layout, the activity schemas, and the build and check
commands.

```sh
node src/build.mjs                      # regenerate Module 1
node src/check.mjs                      # freshness, provenance, schema, accessibility, readability, hygiene

node src/build.mjs --module=modules/02  # regenerate Module 2
node src/check.mjs --module=modules/02  # the same checks against Module 2

node src/build.mjs --module=modules/03  # regenerate Module 3
node src/check.mjs --module=modules/03  # the same checks against Module 3

node src/build.mjs --module=modules/04  # regenerate Module 4
node src/check.mjs --module=modules/04  # the same checks against Module 4

node src/build.mjs --module=modules/05  # regenerate Module 5
node src/check.mjs --module=modules/05  # the same checks against Module 5

node src/build.mjs --module=modules/06  # regenerate Module 6
node src/check.mjs --module=modules/06  # the same checks against Module 6
```

One generator serves every module. Module 1's sources sit directly in `src/`; each later module gets
`src/modules/<id>/` with its own `frag/`, `shell.json`, `sections.json`, manifest and provenance,
while the design system, the activity runtime and the build and check scripts are shared. Adding a
module means adding that directory, not copying the generator.

Two activity kinds actually execute what the reader types &mdash; a spreadsheet formula evaluator and
a SQL SELECT engine, both running in the page with no network and no library. Each covers what the
chapter teaches and refuses clearly when asked for anything outside it.

A third kind carries Module 4: the **mini case study**. A short brief, a strip of facts, an exhibit of
figures the reader has to actually read, two or three decisions an analyst would really have to make,
and a debrief that stays shut until every decision is answered &mdash; so the point of the case is
worked out rather than read first.

`check.mjs` is the guard rail. Besides validating every activity against its schema, it fails the
build on the mistakes that matter here: an activity defined but never placed, a paragraph that has
grown into a wall, a section with no lists or one drowning in them, a list with no lead-in
sentence, and any school name, course code, local file path, or assessment-specific term reaching a
student-facing page.

`src/module.manifest.json` freezes the expected sections, activity keys and kinds, glossary terms,
and final-question distribution. `src/provenance.json` states which source supports each fragment:
Objectives 1.1–1.4 trace to the local textbook chapter, the visibly labeled strategy supplement uses
the Porter works cited there, and current privacy-law qualifications use official sources. Practice
situations are labeled as hypothetical rather than presented as reported company facts.

For a local release, `node src/check.mjs --release` additionally requires the gitignored chapter PDF
and `src/forbidden.local.txt`; `node src/check-pdf.mjs --module=modules/NN --release <pdf>` applies the
same fail-closed rule to the printable companion. GitHub Actions runs the ordinary check against the
committed generated page of **every** module, one matrix job each, so a stale build or structural drift
cannot merge unnoticed in any of them.

## Review game

**Every game lives in [`games/`](games).** Each is one self-contained HTML file with its
contract test beside it, and each links back up to the reading it covers. The three review boards are
described separately in this file because each serves a different part of the course: this one covers
Modules 1 to 3, **Strategy frameworks review game** narrows to the two frameworks, and **Module 6
review game** covers Chapter 6 and is the one two to four people can play against each other.
**Decision Engine**, described below, is not a review board at all &mdash; it is where Chapter 7 is
taught rather than revised.

[`games/modules-1-3-jeopardy.html`](games/modules-1-3-jeopardy.html) is a two-round Jeopardy board covering
Modules 1 to 3, for use once the reading is done rather than instead of it. Like the modules it is one
self-contained file with no CDN, no fonts, no scripts and no network of any kind, and it inherits the
theme the reader last set on a module page.

- **Round one, $200&ndash;$1,000 &mdash; what the terms mean.** Parts and people, the catalogue of
  systems, the digital world, ethics and consequences, and infrastructure parts.
- **Round two, Double Jeopardy, $400&ndash;$2,000 &mdash; what you do with them.** Competitive forces,
  the value chain, generic strategies and business models, cloud service models and the pressures that
  push an organization toward them, and **the shape of the written framework analysis itself** &mdash;
  rating all five forces, at least two genuinely distinct value chain areas, exactly one recommended
  initiative, the word band on the comparison, and the measure and timeframe that make a
  recommendation checkable later.
- **Final Jeopardy** is business/IT alignment, which is what the whole analysis is in service of.

Every clue is tagged with the course objectives it serves and the module to reread on a miss, so the
results screen reports **per objective** rather than as one number, and says plainly that objectives 6,
10 and 11 are not on the board because Modules 1&ndash;3 do not teach them. Each revealed answer carries
a sentence saying why it is that term and not the one next to it.

The board teaches the shape of the graded deliverable, never its wording: no case name, no institution,
no course code. `games/modules-1-3-jeopardy.test.mjs` enforces that alongside the board contract &mdash; two
5&times;5 rounds with round two worth double, answers phrased as questions, no duplicated clue or answer,
every clue tagged and every covered objective actually asked about, and every link resolving to a file
that exists.

```sh
node --test games/modules-1-3-jeopardy.test.mjs
```

The other two boards in `games/` follow the same pattern: one narrowed to the two strategy frameworks and
playable without having read Modules 1 and 3, under **Strategy frameworks review game** below, and one
covering Module 6 that **two to four people can play against each other on one screen**, under
**Module 6 review game**.

## Strategy frameworks workshop

[`five-forces-and-value-chain.html`](five-forces-and-value-chain.html) is a standalone, deep
treatment of the two frameworks the written analysis is built on. Module 2 introduces them inside the
chapter; this page is where a reader goes to actually practise them. Like the modules and the review
game it is one self-contained file with no CDN, no fonts, no scripts and no network of any kind, and
it inherits the theme the reader last set on a module page.

Eleven sections, seven of them graded activities tracked by a counter in the header:

- **Up close** &mdash; an interactive five-force diagram and a nine-activity value chain map. Selecting
  a force gives its definition, the conditions that make it strong, what the internet did to it, the
  systems that answer it, and the force it is most often confused with. Selecting an activity gives its
  definition, its reading in a service business, its cost drivers and the systems that typically pay there.
- **Rate an industry** &mdash; five situations (a campus coffee shop, a regional airline, an industrial
  fastener supplier, a subscription film service, a regional grocery chain), each rated on twenty driver
  sliders phrased so that higher always means more pressure. Bars and bands update live, the strongest
  force is named, a single maximum driver inside a merely moderate force is flagged, and a comparison
  puts the reader&rsquo;s reading beside an analyst&rsquo;s with the reasoning for every row. Between them
  the five situations make each of the five forces the strongest one somewhere.
- **Sort the evidence** &mdash; eight observations from a bookshop, none of which name a force, assigned
  and then explained both ways: why it is that force, and which one it is usually mistaken for.
- **Fund an initiative** &mdash; a costed value chain and six proposals against a fixed budget and a
  stated strategy. The panel keeps score on committed capital, annual benefit, payback, strategy fit and
  whether anything in the portfolio answers the force actually squeezing the firm; switching the strategy
  re-scores every proposal, which is business/IT alignment made arithmetic.
- **Place the system** &mdash; nine systems into nine activities, including the two that catch everybody:
  procurement against inbound logistics, and a human resources system whose saving lands in operations.
- **Case studies** &mdash; three hypothetical firms (a commercial print shop, an independent hotel, a cleaning
  contractor) that cannot be answered with one framework. Each carries a brief, a strip of facts, a costed chain
  as an exhibit, and three decisions: which force is doing the damage, which activity can answer it, and what to
  commit to. The debrief on each case stays shut until every decision is made, then gives the reasoning and a
  model written answer. Between them the three teach that the symptom is not the force, that the largest cost is
  rarely the target, and that the activity owning the system and the activity owning the saving often differ.
- **Build the analysis** &mdash; a guided writer that checks the *shape* of what the reader produces
  (a force named exactly, evidence carrying a number, two genuinely different areas, exactly one concrete
  initiative, a measure and a date) and assembles a copyable summary as they type.
- **Self-check** &mdash; ten situations rather than definitions, every option explaining itself, scored
  per topic rather than as one number.
- **Reference** &mdash; the vocabulary of both frameworks, filterable.

It teaches the shape of a written framework analysis and never its wording: no case name, no institution,
no course code. `five-forces-and-value-chain.test.mjs` enforces that alongside the content contract
&mdash; five forces with four drivers each, an analyst note that cannot contradict the band its own
numbers produce, a simulator that can be solved but not by buying everything, two strategies that
genuinely disagree, every placement covering the chain exactly once, correct answers spread across all
four positions, and every link resolving to a file that exists.

```sh
node --test five-forces-and-value-chain.test.mjs
```

## Strategy frameworks quiz

[`five-forces-and-value-chain-quiz.html`](five-forces-and-value-chain-quiz.html) is thirty questions on
the same two frameworks, **marked the moment an answer is chosen**. It is the fastest way to find out
whether the workshop actually stuck. Like the workshop it is one self-contained file with no CDN, no
fonts, no scripts and no network of any kind, and it inherits the theme the reader last set on a module
page.

- **Six topics of five questions**, in the order the analysis is built: name the force &middot; diagnose
  from evidence &middot; place it on the chain &middot; the classic confusions &middot; which system
  answers it &middot; turn it into a recommendation.
- **Immediate feedback, and every option explains itself.** Choosing marks the answer at once and opens
  all four explanations, so the three options nobody chose still teach something. Under them sits the one
  sentence worth keeping whether the answer was right or wrong.
- **The first choice is the one that counts** &mdash; there is no going back and no penalty, which is the
  only arrangement under which the score means anything.
- **Situations rather than definitions.** Every question is a firm with a problem: a self-storage yard, a
  translation agency, a calibration laboratory, a boutique hotel. All of them are invented, and the page
  says so.
- **Results per topic and per course objective**, then every missed question reprinted with the answer,
  the reason, and what you chose instead &mdash; plus a retry that runs only those. Best percentage is
  kept in the browser, and only a complete run of all thirty can set it.
- **Keyboard throughout:** 1 to 4 chooses, Enter or the right arrow moves on.

It teaches the shape of a written framework analysis and never its wording: no case name, no institution,
no course code. `five-forces-and-value-chain-quiz.test.mjs` enforces that alongside the question
contract &mdash; thirty questions in six topics of five, four distinct options each carrying its own
explanation, an explanation of the right answer that confirms it and wrong ones that never do, correct
answers spread across all four positions and only rarely the longest option, both frameworks and all
nine value chain activities actually asked about, only the four course objectives these frameworks
serve, and every link resolving to a file that exists.

```sh
node --test five-forces-and-value-chain-quiz.test.mjs
```

## Strategy frameworks review game

[`games/five-forces-and-value-chain-jeopardy.html`](games/five-forces-and-value-chain-jeopardy.html) is a second
Jeopardy board, playable without having read Modules 1 and 3. It is deliberately **two things and nothing
else**: the five competitive forces, and the five primary activities of the value chain together with what
sits inside each one. Fifty clues over two boards plus a Final Jeopardy capstone.

- **Round one, $200&ndash;$1,000 &mdash; naming each part.** The five forces by name; the conditions that
  make a force strong (barriers to entry, switching costs, buyer concentration, product differentiation,
  flat or shrinking demand); the five primary activities by name; then **Inside Inbound Logistics** and
  **Inside Operations**.
- **Round two, Double Jeopardy, $400&ndash;$2,000 &mdash; reading them from evidence.** **Which Force Is
  It?** is built entirely on the five near-misses &mdash; rival against substitute, entrant against rival,
  a demanding buyer against a crowded market, the supplier whose power lands in the cost line. **The Same
  Chain in a Hotel** asks the five activities again in a service business. Then **Inside Outbound
  Logistics**, **Inside Sales and Marketing** and **Inside Service**.
- **Half the board is those five `Inside` categories** &mdash; 25 of the 50 tiles. Each asks for what is
  actually in one activity: the cost drivers it is judged on (idling between stops, half-empty vehicles,
  a failed first delivery) and the systems that answer them (route optimisation, proof of delivery).
  Knowing that outbound logistics exists is not the same as knowing that sixty percent of its bill is
  drivers idling between stops.
- **Final Jeopardy** is the cost driver, which is what every one of those activities was opened up for.
- **Deliberately off the board:** the four support activities &mdash; firm infrastructure, human
  resources, technology development and procurement &mdash; along with the generic strategies, business
  and revenue models, and the shape of the written analysis, all of which this board used to carry. The
  intro says so in as many words and sends the reader to the workshop for them.
- **A part named in round one is often asked again in round two, on purpose** &mdash; recognition first,
  then recall from evidence. What the test forbids is the same answer twice inside one round, or a
  round-two clue that simply reprints its round-one definition.

Every clue is tagged with the course objectives it serves and the part of the workshop to go back to on a
miss, so the results screen reports **per objective** rather than as one number. Each revealed answer
carries a sentence saying why it is that term and not the one next to it.
`games/five-forces-and-value-chain-jeopardy.test.mjs` enforces the board contract and the narrowing
together &mdash; two 5&times;5 rounds with round two worth double, answers phrased as questions, all five
forces both named in round one and diagnosable in round two, all five primary activities named, one
`Inside` category per activity that never answers with the activity's own name, **no support activity as
an answer anywhere**, no generic-strategy or written-analysis vocabulary left behind, every clue tagged,
and every workshop link resolving to an anchor that still exists.

```sh
node --test games/five-forces-and-value-chain-jeopardy.test.mjs
```

## Module 6 review game &mdash; up to four players

[`games/module-06-jeopardy.html`](games/module-06-jeopardy.html) is a third Jeopardy board, covering Module 6 and
**playable by one to four people on one screen**. Fifty-one clues over two boards plus a Final Jeopardy
capstone, self-contained on the same terms as everything else here.

- **Round one, $200&ndash;$1,000 &mdash; what the terms mean.** Data as an asset and the three failures that
  look alike, the parts of a table and its keys, reading an ERD in both directions, the SQL clauses, and
  the three Vs.
- **Round two, Double Jeopardy, $400&ndash;$2,000 &mdash; what you do with them.** Diagnose which data failure
  you are actually looking at, name the report a manager is asking for, choose where the data should live,
  read competitive pressure from evidence, and **the shape of a recommendation somebody could fund** &mdash;
  why two reports are not two value chain activities, what a comparison needs before a drop in hours counts
  as an improvement, why released staff time is not yet a cash saving, and the decision rule that says in
  advance what would stop a pilot.
- **Final Jeopardy** is the business capability, which is the chapter&rsquo;s answer to why two firms can buy
  the identical database and get different results.

**What the extra players change.** With one player it behaves like the other two boards: reveal, grade
yourself, no penalty for a miss, and a personal best kept in the browser. With two to four, the number keys
**1**&ndash;**4** are the buzzers and **0** is &ldquo;nobody has it&rdquo;; the printed answer stays hidden until
the clue is settled, so a steal is worth something; a wrong answer costs the tile&rsquo;s value and reopens
the clue to whoever has not tried it; a correct answer takes control of the board; Double Jeopardy opens
with the player in last place; and Final Jeopardy takes each wager privately in turn before one clue goes
to the whole table. The objective and section breakdowns report **the table**, not any one player &mdash;
a clue counts as answered if anybody got it, because what the group could not reach between them is what
is worth reteaching.

`games/module-06-jeopardy.test.mjs` enforces the board contract and the multiplayer rules together &mdash; two
5&times;5 rounds with round two worth double, answers phrased as questions, all five report types and all
five forces asked, every clue tagged, every section bucket carrying real weight, buzzer keys bounded by the
roster, player names rendered as text and never as markup, wagers clamped to the wagering player&rsquo;s own
score and never shown to the players still to wager, and no element with an id sitting inside a panel the
engine rebuilds between games.

```sh
node --test games/module-06-jeopardy.test.mjs
```

## Chapter 7 learning game

[`games/decision-engine.html`](games/decision-engine.html) is the one page here that **teaches a chapter
instead of revising it**. It is an eight-quarter management game: you run the analytics, artificial
intelligence and knowledge programme of an invented distributor, and every mechanic in it *is* a piece of
Chapter 7 rather than a question about one. Self-contained on the same terms as everything else &mdash; no
CDN, no fonts, no network &mdash; and it inherits the theme the reader last set on a module page.

**Every question marks itself the moment you answer it** — right or wrong, the reasoning underneath, the
points it was worth, and the controls locked so the first answer is the one that counts. The score in the
top bar moves as you work. That is the same rhythm as the intro's try-it card and the same rule as the
strategy quiz, and it is the answer to *how am I being assessed*: you never make ten choices before
finding out how the first one went. Cash, trust and capability still move behind the scenes and are
reported in each quarter's results as consequences, but they are **not** in the top bar, because three
numbers that do not decide the ending read as three more things you are being marked on.

**It opens with one decision rather than an explanation.** The first thing on the screen is a single
request from a regional manager and four buttons; press one and the game tells you why that was or was
not the right kind of analysis. That is the whole mechanic, played before a word of scenario. The
scenario, the four meters and the coverage notes are folded away behind one disclosure for whoever wants
them. Inside a quarter the order is the same: **&ldquo;Quarter 3 of 8 &mdash; choose six tiles for an
executive's dashboard, then work a pricing model with sliders&rdquo;** comes before the briefing, a
numbered *What to do on this screen* comes before the field manual, and the commit button carries a badge
saying what is still outstanding that turns green when it is done.

The design rule is that a concept the reader could be *told* is instead something they have to *do*, and
getting it wrong costs cash, trust or capability rather than a mark:

- **Q1, the inbox** &mdash; eight departmental requests, none of which says what it wants, sorted into
  descriptive, diagnostic, predictive and prescriptive, then two of them chosen to build against a
  priority the board has stated. Misfiling one buys rework that reappears in Q5.
- **Q2, the cube** &mdash; a real 4&times;4&times;4 cube with two measures. Slicing, dicing, drilling down
  and rolling up are the controls, not the vocabulary, and the CFO&rsquo;s questions cannot be answered
  without using them. **The region that sells the most chilled is not the one that earns the most on it**,
  so the measure you pick changes the answer. Queries take four seconds off a disk until you pay to move
  the cube into memory.
- **Q3, the dashboard and the model** &mdash; six tiles out of twelve for an executive with a stated job,
  then a **working** decision support model: what-if, sensitivity, goal seeking and a constrained optimum,
  all from one formula. The goal-seek answer hits the target and the probability-weighted expectation
  misses it, and the volume it assumed is one the demand curve will not give you.
- **Q4, unlabelled data** &mdash; support and confidence counted live off twenty printed orders, so a rule
  with 100% confidence and 5% support is something the reader watches happen. Support reads the same in
  both directions and confidence does not. Plus an anomaly with two decoys, and three clusters an
  algorithm produced and cannot name.
- **Q5, the model** &mdash; the whole workflow, and the accuracy at the end is **computed from the
  decisions** rather than announced. Training on all the data is allowed, reports a wonderful number, and
  the deployment reveals the real one. What the model is worth then decides Q7.
- **Q6, generative AI** &mdash; three jobs whose right answers are three *different* rungs of the
  deployment ladder, and each choice returns the answer that choice actually produces, including a
  confident invented returns policy. Then governance, and a draft in which three of five sentences are
  fabricated.
- **Q7, the agent** &mdash; one human review gate placed in a five-step pipeline, priced against the
  errors it catches. No gate is never cheapest and a gate before the machine has judged is never cheapest,
  but **which of the two later positions wins depends on the accuracy you produced in Q5**.
- **Q8, ground truth** &mdash; a map whose layers all start switched off, where the best site on density is
  the one inside the floodplain; quantities against densities; a knowledge network with a connector and a
  bridge who are different people; and explicit against tacit knowledge.

Results are reported **per chapter objective 7.1&ndash;7.4** with a Solid/Shaky/Reread verdict, followed by
every decision that cost something and why, and a chain of what each quarter handed the next. The intro
names the five course objectives a single chapter can honestly claim and the six it cannot, including why
objective 11 is not one of them even though Q3 teaches what a decision support system does. Every
organization, person and figure is invented; the one real company named appears once, inside a card marked
as the chapter&rsquo;s own example.

The onboarding is under test too, because it took two rounds of feedback to get right: the try-it card
must come before any panel of prose, the intro must stay under 240 words before the fold, every quarter
must state its job in one sentence above the briefing, and every *what to do* line must actually tell the
reader to do something.

`games/decision-engine.test.mjs` loads the page against a DOM stub and then **recomputes every number the
game asserts** &mdash; the cube answers off the raw arrays, the four DSS analyses off the model, support and
confidence off the baskets, model accuracy off the workflow choices, and the cost of every review gate at
every reachable accuracy. So a tuned constant that quietly breaks a lesson fails the build: if the same
region ever won on both measures, if the expected margin ever cleared the target, if running the agent
unattended were ever the cheapest option, or if anybody but the bridge could split the knowledge network,
the test says so.

```sh
node --test games/decision-engine.test.mjs
```

## Practice midterm

[`practice-midterm.html`](practice-midterm.html) is a practice paper in the shape of the exam it
prepares for and with none of its questions: thirty-three questions in a 16&ndash;14&ndash;3 split, mixing multiple
choice, matching, written answers and a case, with a different firm in every scenario. It is **the questions and nothing else** &mdash; no
objective tags, no coverage tables, no shape checklist, no weighting &mdash; because a practice paper is
for sitting, not for reading about.

It keeps only what a reader needs to sit it and hand it in: a name field, boxes that save as you type, a
word counter on the closing recommendation, an export, and a printable layout that says in words which
option was chosen. `practice-midterm.test.mjs` enforces both halves of that &mdash; the shape it shares
with the real paper, and the scaffolding it must not have, including a test that fails if any multiple
choice stem is copied from the exam or the case reuses the same firm, which it checks whenever the exam
is present beside it.

```sh
node --test practice-midterm.test.mjs
```

## Practice case studies

`practice-case-study/` holds full-length practice analyses in the shape of a written framework study &mdash;
scenario, four tasks, two deliverables &mdash; for readers who have finished Module 2 and the workshop above.
Each is one self-contained HTML file that saves the reader&rsquo;s work in their own browser, counts the words
in the summary, exports a plain-text file with every answer in order, and prints cleanly.

- [`practice-case-study.html`](practice-case-study/practice-case-study.html) &mdash; **Riverside Professional
  Development**, a training provider whose certifications are being met a different way. Built so that one force
  clearly dominates.
- [`practice-case-harbor-and-pine.html`](practice-case-study/practice-case-harbor-and-pine.html) &mdash;
  **Harbor &amp; Pine Garden Centers**, fourteen garden centres losing share while their own stores cannot see
  each other&rsquo;s stock. Built so that **two** forces are defensible as the strongest, which moves the mark
  onto the argument rather than the label. Adds a live shape checklist &mdash; all five forces addressed, a
  strongest one named, two genuinely different activities, one concrete initiative traced back to a force, a
  measure with a date, and the summary inside its word band &mdash; and links back to the workshop and Module 2.

Both firms are invented, say so on the page, and share no detail with any assessment. Instructor grading notes
sit beside each page and are **gitignored deliberately**, so a model answer cannot reach a student repository by
a careless `git add`.

## Course materials

The textbook chapter, syllabus, and assessment documents are deliberately **not** in this
repository — see [`.gitignore`](.gitignore) for why. Keep them beside the working copy.
