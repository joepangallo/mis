# Module 1 — Managing in the Digital World

`../module-01-managing-in-the-digital-world.html` is a **single self-contained page**: all CSS,
all JavaScript, and all activity data are inlined, so it opens straight from a file, a flash
drive, or any static host with no network access and no build step for the reader.

Do not hand-edit that file. It is generated. Edit the sources here and rebuild.

## Layout

| File | What it holds |
|---|---|
| `module.css` | The whole design system: theme tokens (beige base, dark toggle), layout, and every activity component. |
| `engine.js` | The runtime. Turns each activity data object into a working widget, tracks mastery, and stores progress in the reader's browser only. |
| `shell.json` | The page chrome written as prose: title, hero, objectives, "how to use this page", the glossary and final-challenge intros, and the closing note. |
| `frag/<section>.js` | One file per lesson section. Assigns `PROSE.<id>` (the lesson HTML) and any number of `ACT.<key>` activity objects. |
| `frag/glossary.js` | `GLOSSARY` — every chapter term with a plain-language definition and an example. |
| `frag/final.js` | `FINAL` — the twenty-five-situation closing challenge, tagged by objective. |
| `build.mjs` | Assembles everything into the output page, and writes a JavaScript-free summary of every activity into the page as it goes. |
| `check.mjs` | Structural, schema, and hygiene checks. Run it after every build. |
| `make-pdf.mjs` | Strips the scripts and applies print typography, producing the source for the printable companion. |

## Rebuild

```sh
node src/build.mjs        # writes ../module-01-managing-in-the-digital-world.html
node src/check.mjs        # verifies the result
```

The printable companion is a separate render of the same page with the scripts removed, so what
prints is the lesson plus every activity's answer summary, the vocabulary, and the challenge key:

```sh
node src/make-pdf.mjs ../module-01-managing-in-the-digital-world.html /tmp/print.html
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless --disable-gpu \
  --run-all-compositor-stages-before-draw --virtual-time-budget=15000 --no-pdf-header-footer \
  --print-to-pdf="../module-01-managing-in-the-digital-world.pdf" "file:///tmp/print.html"
```

Check the result for the three defects that actually occur: HTML entities leaking into the text,
missing glyphs printing as boxes, and half-empty pages where a tall card refused to split. The
print stylesheet already keeps the small units atomic (a list item, a question, a glossary entry,
a table row) and lets the big containers break, which is what keeps the page count honest.

`build.mjs` fails loudly on the mistakes that actually happen: an activity defined but never
mounted in the prose, a mount that names an activity with no data, or the same activity mounted
twice. `check.mjs` goes further and validates every activity against its schema — four options
and four explanations per quiz question, exactly one strong choice per decision step, every sort
item pointing at a declared bucket, and so on — then scans the built page for anything that must
never ship in student-facing material.

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
