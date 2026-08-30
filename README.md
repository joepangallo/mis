# Management Information Systems — course modules

Interactive, self-contained study modules for an introductory information systems course.

## Modules

| Module | Page | Covers |
|---|---|---|
| 1 | [`module-01-managing-in-the-digital-world.html`](module-01-managing-in-the-digital-world.html) | The digital world and digital density · what an information system is · the dual nature of IS in organizational success and failure · computer ethics, privacy and intellectual property · Porter's Five Forces and the value chain |

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
- **Saved progress** kept in the reader's own browser. Nothing is submitted, transmitted, or
  collected. Answers reset on reload so every attempt is fresh; the mastery record persists until
  the reader clears it.
- **A complete JavaScript-free layer.** With scripting off, the page still reads as a full lesson
  with every activity summarised and answered, which is also what makes it printable.

## Working on a module

Pages are generated. Edit the sources in `src/`, never the built HTML — see
[`src/README.md`](src/README.md) for the layout, the activity schemas, and the build and check
commands.

```sh
node src/build.mjs     # regenerate the page
node src/check.mjs     # structure, schema, readability and hygiene checks
```

`check.mjs` is the guard rail. Besides validating every activity against its schema, it fails the
build on the mistakes that matter here: an activity defined but never placed, a paragraph that has
grown into a wall, a section with no lists or one drowning in them, a list with no lead-in
sentence, and any school name, course code, local file path, or assessment-specific term reaching a
student-facing page.

## Course materials

The textbook chapter, syllabus, and assessment documents are deliberately **not** in this
repository — see [`.gitignore`](.gitignore) for why. Keep them beside the working copy.
