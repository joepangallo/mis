# Module 1 — Managing in the Digital World

`../module-01-managing-in-the-digital-world.html` is a **single self-contained page**: all CSS,
all JavaScript, and all activity data are inlined, so it opens straight from a file, a flash
drive, or any static host with no network access and no build step for the reader.

Do not hand-edit that file. It is generated. Edit the sources here and rebuild.

## Layout

| File | What it holds |
|---|---|
| `module.css` | The whole design system: theme tokens (beige base, dark toggle), layout, and every activity component. |
| `engine.js` | The runtime. Turns each activity data object into a working widget, tracks completion, and stores progress in the reader's browser only. Correctness remains visible inside graded activities. |
| `shell.json` | The page chrome written as prose: title, hero, objectives, "how to use this page", the glossary and final-challenge intros, and the closing note. |
| `frag/<section>.js` | One file per lesson section. Assigns `PROSE.<id>` (the lesson HTML) and any number of `ACT.<key>` activity objects. |
| `frag/glossary.js` | `GLOSSARY` — every chapter term with a plain-language definition and an example. |
| `frag/final.js` | `FINAL` — the twenty-five-situation closing challenge, tagged by objective. |
| `module.manifest.json` | The exact release inventory: ordered sections, activity keys and kind counts, glossary terms, and final distribution. |
| `provenance.json` | Source policy and fragment/objective-to-source mapping. It records the chapter core, Porter supplement, and official privacy-law sources. |
| `build.mjs` | Assembles everything into the output page, and writes a JavaScript-free summary of every activity into the page as it goes. |
| `check.mjs` | Fresh-build comparison plus provenance, inventory, schema, accessibility, readability, offline, and hygiene checks. Run it after every build. |
| `make-pdf.mjs` | Strips the scripts and applies print typography, producing the source for the printable companion. |
| `check-pdf.mjs` | Uses Poppler to verify PDF text, hygiene, page size, static-answer coverage, glyphs, and sparse pages. |

## Rebuild

```sh
node src/build.mjs        # writes ../module-01-managing-in-the-digital-world.html
node src/check.mjs        # verifies the result
node src/check.mjs --release  # also requires local chapter + forbidden-term files
```

The printable companion is a separate render of the same page with the scripts removed, so what
prints is the lesson plus every activity's answer summary, the vocabulary, and the challenge key:

```sh
node src/make-pdf.mjs ../module-01-managing-in-the-digital-world.html /tmp/print.html
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless --disable-gpu \
  --run-all-compositor-stages-before-draw --virtual-time-budget=15000 --no-pdf-header-footer \
  --print-to-pdf="../module-01-managing-in-the-digital-world.pdf" "file:///tmp/print.html"
node src/check-pdf.mjs ../module-01-managing-in-the-digital-world.pdf
```

`check-pdf.mjs` catches HTML entities leaking into text, missing glyphs printing as boxes, hygiene
leaks, missing static answers, and sparse pages. A release still includes visual review of rendered
page images, because automated text checks cannot judge clipping or awkward visual breaks. The print
stylesheet keeps small units atomic and lets large containers split.

`build.mjs` validates mounts before touching the deliverable, then writes atomically. `check.mjs`
independently builds to a temporary file and byte-compares it with the committed page, checks every
activity and static fallback exactly once, enforces the manifest and provenance maps, validates
nonempty and distinct schema content, and scans for network references and student-facing leaks.

## Source boundaries

Objectives 1.1–1.4, their vocabulary, and factual cases come from the local Chapter 1 PDF. The
strategy material is deliberately labeled an **application supplement** and cites the Porter works
listed by the chapter; it is not presented as a fifth textbook learning objective. Hypothetical
practice conditions must say that they are hypothetical and must not invent a named real-seeming
company or purported real-world statistic. Current-law qualifications belong in `provenance.json`
and must use official sources.

## Adding or changing an activity

1. Add the object to the right `frag/*.js` file, following the schema its neighbours use.
2. Mount it in that file's `PROSE` string, on its own line, at the point in the reading where it
   belongs: `<div class="activity" data-activity="yourKey"></div>`
3. Rebuild and re-check.

Activity keys are prefixed per section (`dw`, `dd`, `isd`, `ppl`, `org`, `dual`, `eth`, `str`) so
two sections can never collide.

## Activity kinds

`quiz` · `sort` · `match` · `order` · `fill` · `explore` · `diagram` · `sim` · `selfcheck`

Every kind renders a complete answer summary into the page for readers without JavaScript, so the
page stays usable — and printable — with scripting off.
