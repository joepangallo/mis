# Management Information Systems — course modules

Interactive, self-contained study modules for an introductory information systems course.

## Modules

| Module | Page | Covers |
|---|---|---|
| 1 | [`module-01-managing-in-the-digital-world.html`](module-01-managing-in-the-digital-world.html) | Chapter 1 Objectives 1.1–1.4: the digital world and digital density · what an information system is · the dual nature of IS in organizational success and failure · computer ethics, privacy and intellectual property · plus three clearly labeled application supplements: Porter&rsquo;s strategy frameworks, deciding where AI belongs in a business workflow, and the chapter&rsquo;s concepts expressed as runnable code |
| 2 | [`module-02-enabling-strategy-through-information-systems.html`](module-02-enabling-strategy-through-information-systems.html) | Chapter 2 Objectives 2.1&ndash;2.3: decision-making levels and functional areas &middot; automating, organizational learning and strategy &middot; the five competitive forces &middot; generic strategies, resources and the value chain &middot; business and revenue models, platforms and network effects &middot; innovation &middot; plus four application supplements: AI in the strategy workflow, an analyst&rsquo;s toolkit of **runnable** spreadsheet and SQL exercises, strategy as code, and a closing rehearsal that runs the whole analysis as one deliverable |
| 3 | [`module-03-information-systems-infrastructure.html`](module-03-information-systems-infrastructure.html) | Chapter 3 Objectives 3.2&ndash;3.4: what an IS infrastructure is made of &mdash; hardware, system software and storage &middot; networks, and how the internet and the web actually carry a request &middot; intranets, extranets and data centres &middot; why infrastructure ages, and the pressures that force it to change &middot; cloud computing, its characteristics and its service models &middot; plus two clearly labeled application supplements: where the data itself lives, bridging to the course&rsquo;s SQLite work, and the internet as a business tool |

Each module ships as **one HTML file with nothing external** — no CDN, no fonts, no scripts, no
network of any kind. Open it from a hard drive, a flash drive, or any static host and it works.
A print-ready PDF companion sits beside it carrying the same lesson plus every answer.

## What is in a module

- **Lesson prose** written for a reader with no business or computing background: define the idea,
  then name it, then give an example they already recognise.
- **Interactive activities** inline with the reading, not bolted on at the end — multiple choice,
  classification, matching, sequencing, cloze, reveal cards, tabbed diagrams, branching decision
  scenarios, and self-checks. On every question **each option explains itself**, including the ones
  the reader did not choose.
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
```

One generator serves every module. Module 1's sources sit directly in `src/`; each later module gets
`src/modules/<id>/` with its own `frag/`, `shell.json`, `sections.json`, manifest and provenance,
while the design system, the activity runtime and the build and check scripts are shared. Adding a
module means adding that directory, not copying the generator.

Two activity kinds actually execute what the reader types &mdash; a spreadsheet formula evaluator and
a SQL SELECT engine, both running in the page with no network and no library. Each covers what the
chapter teaches and refuses clearly when asked for anything outside it.

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

## Course materials

The textbook chapter, syllabus, and assessment documents are deliberately **not** in this
repository — see [`.gitignore`](.gitignore) for why. Keep them beside the working copy.
