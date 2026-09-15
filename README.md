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

[`modules-1-3-jeopardy.html`](modules-1-3-jeopardy.html) is a two-round Jeopardy board covering
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
no course code. `modules-1-3-jeopardy.test.mjs` enforces that alongside the board contract &mdash; two
5&times;5 rounds with round two worth double, answers phrased as questions, no duplicated clue or answer,
every clue tagged and every covered objective actually asked about, and every link resolving to a file
that exists.

```sh
node --test modules-1-3-jeopardy.test.mjs
```

A second board, narrowed to the two strategy frameworks and playable without having read
Modules 1 and 3, is described under **Strategy frameworks review game** below.

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

[`five-forces-and-value-chain-jeopardy.html`](five-forces-and-value-chain-jeopardy.html) is a second
Jeopardy board, this one narrowed to the two frameworks and playable without having read Modules 1 and 3.
Fifty clues over two boards plus a Final Jeopardy capstone, self-contained on the same terms as
everything else here.

- **Round one, $200&ndash;$1,000 &mdash; what the terms mean.** The five forces by name, the five primary
  activities, the four support bands and cost drivers, what actually makes a force strong (barriers,
  switching costs, concentration, integration, and what the internet did to all of them), and the
  strategy vocabulary the recommendation is judged against.
- **Round two, Double Jeopardy, $400&ndash;$2,000 &mdash; what you do with them.** Diagnose the pressure
  from a situation, name the activity that owns the problem, untangle the five confusions that change
  what a firm buys, match a system to the force it answers, and **the shape of the written analysis
  itself**.
- **Final Jeopardy** is business and IT alignment, which is what both frameworks are ultimately for.
- **A term defined in round one is often diagnosed again in round two, on purpose** &mdash; recognition
  first, then recall from evidence. What the test forbids is the same answer twice inside one round, or
  a round-two clue that simply reprints its round-one definition.

Every clue is tagged with the course objectives it serves and the topic to go back to on a miss, so the
results screen reports **per objective** rather than as one number, and the intro says plainly which
objectives two strategy frameworks cannot honestly claim. Each revealed answer carries a sentence saying
why it is that term and not the one next to it. `five-forces-and-value-chain-jeopardy.test.mjs` enforces
the board contract &mdash; two 5&times;5 rounds with round two worth double, answers phrased as questions,
all five forces both named in round one and diagnosable in round two, all nine value chain activities
named, every clue tagged, every topic bucket carrying real weight, and every link resolving to a file
that exists.

```sh
node --test five-forces-and-value-chain-jeopardy.test.mjs
```

## Practice final

[`practice-final.html`](practice-final.html) is a practice paper in the shape of the exam it prepares
for and with none of its questions: thirty-three questions in a 16&ndash;14&ndash;3 split, mixing multiple
choice, matching, written answers and a case, with a different firm in every scenario. It is **the questions and nothing else** &mdash; no
objective tags, no coverage tables, no shape checklist, no weighting &mdash; because a practice paper is
for sitting, not for reading about.

It keeps only what a reader needs to sit it and hand it in: a name field, boxes that save as you type, a
word counter on the closing recommendation, an export, and a printable layout that says in words which
option was chosen. `practice-final.test.mjs` enforces both halves of that &mdash; the shape it shares
with the real paper, and the scaffolding it must not have, including a test that fails if any multiple
choice stem is copied from the exam or the case reuses the same firm, which it checks whenever the exam
is present beside it.

```sh
node --test practice-final.test.mjs
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
