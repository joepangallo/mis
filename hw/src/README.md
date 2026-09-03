# Week 1 homework pages — generator and checks

Maintainer-side tooling for the three browser-based homework pages (`hw/Week 1/week-1-chapter-{1,2,3}.html`),
the printable handout and the two zips. Nothing in `hw/src/` is shipped to students. Zero npm dependencies:
everything runs on Node 24 (`node`), headless Chrome, `/usr/bin/sqlite3` and poppler (`pdfinfo`, `pdftotext`).

## Files

| File | Role |
|---|---|
| `all.mjs` | the whole sequence below in one command (`node hw/src/all.mjs [--skip-browser] [--chrome PATH]`): stops at the first failure and exits with its code. |
| `build.mjs` | content + runtime + css + the 7 embedded files → 3 student pages, handout print HTML, 2 zips. Exports every assembly function; `main()` only when run directly. |
| `schema.mjs` | `table({caption, head, rows})` (accessible table markup for content), `validate(content, {allowedFiles})`, `validateHandout(handout)`, `collectWorkspaces(content)`, hygiene regexes. |
| `zip.mjs` | deterministic pure-Node zip writer/reader (sorted entries, fixed DOS timestamp 2026-01-01 00:00, deflate level 9 or store, `zlib.crc32`). `createZip`, `listZip`, `readZipEntry`. |
| `cdn.json` | the three pinned URLs + sha384 hashes (+ bases, sizes, the two help links). The only external resources a page may touch. |
| `page.css` | design system (tokens copied from `../../src/module.css`), workspace/output/terminal/panel styles, print stylesheet. |
| `helpers.js` | pure helpers shared by the page and `node --test` (IIFE → `window.HWHelpers` / `module.exports`): tokenizer, SQL keyword/DROP parsing, statement-number rule, base64, header check, transcript cap, persistence codec, markdown export, all caps/constants. |
| `runtime.js` | the in-page runtime (IIFE, plain script): sql.js + Pyodide loading with SRI/integrity, the statement loop, the Database panel, terminal, Python cell, persistence, export, Start over. No HTML strings — every node is built with `h()` and `textContent`. |
| `DOM-CONTRACT.md` | every id / class / data-attribute / state the page renders, the localStorage shapes, `HW_PAGE`, how a driver sets text, clicks and polls. `verify-browser.mjs` relies on nothing else. |
| `content/chapter-{1,2,3}.mjs`, `content/handout.mjs` | the exercises (see schema) and the handout front/back matter, version constant, grading table. |
| `check.mjs` | zero-dep static checks: freshness, determinism, zips (listing + CRC), hygiene, DOM rules, `HW_PAGE`, CDN pins, external URLs, a11y basics, workspace ids, the instructor contract. Exports every check (the tests reuse `parseSolutionBlocks`, `expectedConsistencyFindings`, …). |
| `verify-browser.mjs` | headless Chrome (CDP, zero-dep) end-to-end run of the real pages driven by `instructor/expected/chapter-N.json` + the `@step` blocks of `instructor/solutions-chN.sql`. |
| `make-pdf.mjs` | print HTML → PDF with headless Chrome, validated with `pdfinfo`/`pdftotext` before it may replace the shipped handout. |
| `test/*.test.mjs` | `node --test` unit tests: `helpers`, `schema`, `build` (assembly + determinism), `zip`, `export` (markdown format), `check` (the checker's helpers + an end-to-end run against the fixture), `expected` (@step ⇄ expected ⇄ content consistency), `codec-hardening` (the strict persistence codec, stored-output caps, the save fallback, the db-store merge, verbatim export spacing, command/source matching), and the Chrome-free halves of the two drivers — `make-pdf` (the PDF validators) and `verify-browser` (request allow-list, download picker, `parseArgs`, the XSS canary, the reporter). `runtime-source` holds the source assertions that keep `runtime.js` and `DOM-CONTRACT.md` from drifting apart: no `COUNT(*)` outside the `isRealTable()` gate, own-property `PAGE.files` lookups, one refusal text for status and notice, the withdrawn "No database yet" notice, only the three `KEYS.*` and never `clear()`, the probe removed in a `finally`, and the export's countless view line. `test/fixture.mjs` is a small valid content set + consistent instructor dir used by the tests and by stub runs. |

## Commands

Run from the repo root (`/Users/joepangallo/keiser/mis`) or from `hw/` — every script resolves its defaults from
its own location, so the cwd does not matter (the `node --test` glob is the one thing that is cwd-relative).

**One command does the whole thing, in the only order that works:**

```bash
node hw/src/all.mjs            # [--skip-browser] [--chrome PATH]; stops at the first failure, exits with its code
```

which runs, in this order:

```bash
cd /Users/joepangallo/keiser/mis/hw
node src/build.mjs                         # 1. pages + print HTML + zips (the zips carry the PDF currently on disk)
node src/check.mjs                         # 2. static checks: freshness, hygiene, DOM rules, HW_PAGE, CDN, a11y, ids, contract, zips
node --test 'src/test/*.test.mjs'          # 3. unit tests (helpers, schema, build assembly, zip, export, expected/@step)
node src/verify-browser.mjs                # 4. the REAL pages in headless Chrome with the solutions (≈ 15 s warm, minutes cold)
node src/make-pdf.mjs                      # 5. regenerate Week 1/Application-Exercises-Week-1.pdf (validated before it is written)
node src/build.mjs --zip-only              # 6. the starter zip must be rebuilt: it embeds the PDF, and Chrome PDFs are never byte-stable
node src/check.mjs                         # 7. the zips on disk match their sources again
```

Why this order: the PDF is printed from the same content the pages are built from, so it is regenerated after the
pages have been proven to work (4), and the starter zip is rebuilt after the PDF (6) because `check.mjs` compares the
zip's PDF entry against the file in `Week 1/` by CRC — a zip built before the print is reported stale. On a machine
with no PDF yet, `all.mjs` bootstraps with `build.mjs --no-zip` + `make-pdf.mjs` first (a plain `build.mjs`
refuses to zip without the PDF). Individual steps can still be run by hand, e.g.
`node hw/src/build.mjs --no-zip --print-out /tmp/hw-print/handout.html` followed by
`node hw/src/make-pdf.mjs --html /tmp/hw-print/handout.html` (identical to letting make-pdf assemble the print HTML itself).

Every tool exits `0` on success, `1` when a check/assertion failed and `2` for an environment problem (missing
Chrome, poppler, content, pages or scripts). `check.mjs` and `verify-browser.mjs` print one `PASS`/`FAIL` line per
check; `--json FILE` writes the same list as JSON.

### Options

- `build.mjs`: `--content-dir`, `--out-dir`, `--week-dir` (source of the embedded files and the PDF),
  `--instructor-dir`, `--zip-dir`, `--print-out FILE`, `--no-zip`, `--zip-only`, `--quiet`. Outputs go only to
  `hw/Week 1/*.html`, the `--print-out` path and the two zips in `hw/`. A plain `node hw/src/build.mjs` does pages +
  zips in one go and fails if the PDF is missing.
- `check.mjs`: `--content-dir`, `--pages-dir` (default `hw/Week 1`), `--week-dir`, `--instructor-dir`, `--zip-dir`
  (default `hw/`), `--no-zip` (skip the zip checks, e.g. before the first `--zip-only`), `--json FILE`, `--quiet`
  (only failures).
- `verify-browser.mjs`: `--chapter N` (repeatable or `1,3`; default all three), `--chrome PATH` (default
  `$CHROME` or `/Applications/Google Chrome.app/Contents/MacOS/Google Chrome`), `--keep` (keep the scratch dir:
  profile, downloads, exports, `verify-results.json`), `--pages-dir` (default `hw/Week 1`), `--instructor-dir`
  (default `hw/instructor`), `--scratch DIR`, `--budget SECONDS` (total, default 1500), `--json FILE`.
- `make-pdf.mjs`: `--html FILE` (print HTML to use instead of assembling it), `--out FILE` (default
  `hw/Week 1/Application-Exercises-Week-1.pdf`), `--chrome PATH`, `--content-dir`, `--week-dir`, `--scratch DIR`,
  `--keep`, `--check PDF` (validate an existing PDF only; nothing is written).

Determinism: no `Date` is used at build time, entries are sorted, the zip timestamp is fixed — building twice
gives byte-identical pages and zips (the PDF itself is never byte-stable; the zip stores whatever PDF is on disk,
and `check.mjs` flags a zip whose PDF entry no longer matches the file in `Week 1/`).

### Working against a stub instead of the real content

`test/fixture.mjs` can write a complete stand-in tree; every tool takes directory options:

```bash
node -e "import('./hw/src/test/fixture.mjs').then(f => { f.writeContentDir('/tmp/stub/content'); f.writeInstructorDir('/tmp/stub/instructor'); f.writeWeekDir('/tmp/stub/week'); })"
node hw/src/build.mjs --content-dir /tmp/stub/content --week-dir /tmp/stub/week --instructor-dir /tmp/stub/instructor --out-dir /tmp/stub/pages --zip-dir /tmp/stub
node hw/src/check.mjs --content-dir /tmp/stub/content --week-dir /tmp/stub/week --instructor-dir /tmp/stub/instructor --pages-dir /tmp/stub/pages --zip-dir /tmp/stub
node hw/src/verify-browser.mjs --pages-dir /tmp/stub/pages --instructor-dir /tmp/stub/instructor
```

## Content schema (contract)

See `SPEC` §"Content schema" for the full shape. Summary of what `validate()` enforces:

- top level: `id` (`chapter-N`, must agree with `chapter`), `week`, `chapter`, `title`, `lede` (html), `primaryDb`
  (relative `.db` path), `seedDb` (null or an embedded `.db` path whose bytes seed `primaryDb`), `filesShown`
  (embedded paths highlighted in Files), `pythonStarter`, `confirmTexts {reset, clear, replace}`, `exercises[]`.
  Optional: `messages` — the short per-chapter UI strings the runtime shows, all optional: `noDb` (the "No database
  yet — …" line of the Tables list / Download), `afterReset` (the status after Reset database; default `Database reset
  to the original <name>` for a seeded page, else `Database removed — run the import again to recreate it`),
  `wrongName` (the advice sentence of the wrong-name notice; default `Re-run the import with the exact name, or pick
  the file here.`), `sideDbs` (`{ '<path>': '<note>' }` — a db one of the page's own steps creates on purpose, e.g.
  chapter 2's `scratch.db`, gets this information note instead of the wrong-name warning; may not name `primaryDb`);
  `exportName` (defaults to `ch1-queries.md` / `ch2-database.md` / `ch3-queries.md`), `unstuck` (html string,
  `[{q, a}]` or `[[q, a], …]` — rendered before the handout's shared `unstuck` entries in the page's "Getting
  unstuck" card).
- exercise: `id`, `kind` (`spreadsheet` | `database`), `title`, `scenario`, `data`, `submit` (html), optional
  `notice` (html), `steps[]` (labels unique per exercise). Spreadsheet exercises may only carry `text` workspaces.
- step: `label` (`'1'`, `'5a'`, or a word such as `notice` / `explore`), `html`, optional `optional: true`,
  optional `workspaces[]`. A step labelled `notice` renders inside the "One thing to notice" section after Submit.
- workspace: `tool` ∈ `sql | text | terminal | python`, `id` (`[a-z][a-z0-9-]*`, unique across the page),
  `expect: [chips]` optional, `optional: true` optional (a sql box that need not be driven, e.g. `s2-37-4b`);
  `sql`: `starter`, `placeholder`; `text`: `rows`; `terminal`: `command` (required); `python`: `snippet`
  (required). `s3-41-3` may not carry a chip matching `/\d+\s*rows?/`.
- every `<table>` in any html carries `<caption>` and `th scope="col"` (use `table()`); hygiene regexes
  (`/keiser/i`, `/\bCGS\s*3300\b/i`, `/\/Users\//`, `/answer key/i`, `/instructor/i`, `/micropip|pypi|pythonhosted/i`)
  must not match any string.
- `handout.mjs`: `{ version: 'YYYY-MM-DD', front, back, grading: [[criterion, points], …], gradingNotes?, unstuck? }`.
  `back` must contain the "What to hand in" section (`make-pdf.mjs` checks for it) and must **not** render the grading
  table itself: the build renders `gradingTable(grading)` (the rows plus a "Total per exercise" row computed from the
  sum) followed by `gradingNotes` on every student page (`#grading`) and in the print HTML right after `back`, so the
  page table and the handout table are identical by construction. `unstuck` (`[[symptom, advice], …]`, both html) is
  the shared browser-edition "Getting unstuck" list: every page renders it in `#unstuck` after the chapter's own
  `content.unstuck` entries; the print renders it after the grading section (chapter entries print inside their
  chapter as "Getting unstuck · Chapter N"). Print order: front → chapters → back → grading → unstuck → footer.

## expected.json / @step contract (instructor side)

`instructor/solutions-chN.sql` is split into blocks by marker lines:

- `-- @step <id>` starts a block that `verify-browser.mjs` pastes into a SQL box and runs with one press of Run.
  Exactly one block per required sql workspace, named after the workspace (`s1-35-5a`), except chapter 2 step 4,
  which is driven in parts named `s2-37-4-<part>` (`-check`, `-unique`, `-fk-nopragma`, `-fk-pragma`,
  `-orphan-check`, `-cleanup`) into the single box `s2-37-4`.
- `-- @alt <id>` starts reference material that is never driven (`1-35-7-example-2`, `3-41-5-rebuild`, …).
- A block runs from its marker to the next marker or the end of the file; comment lines inside a block are part
  of it (step 7's question comment is deliberately the first line). Each Run opens the database fresh, so a block
  must be self-contained (a PRAGMA lives in the block it protects).

`instructor/expected/chapter-N.json` is `{ "chapter": N, "page": "week-1-chapter-N.html", "actions": [ … ] }`,
executed in order. Exactly one kind key per action:

| Action | Drives | `expect` |
|---|---|---|
| `{"terminal": "<command>"}` | the page's Terminal | `stdoutIncludes: [...]`, `stderrIncludes: [...]`, `exit: "…"`; without `stderrIncludes` a traceback on stderr fails, without `exit` an exit line fails (the runtime's file-sync notes such as `Created campus_travel.db` are allowed on stderr) |
| `{"sql": "<wsId>", "block": "<blockId>"}` | pastes the block into the box, presses Run | `results: [{rows, cell: [r, c, value]}]` (k-th `Result k · n rows` heading, rendered rows = min(n, 500), the `0 rows` cell for n = 0, one spot cell compared as text), `errorIncludes` (state must be `error`, message must name the statement and what was applied), `changed: n` (`OK · n rows changed`), `messageIncludes`, `tables` (subset, see below) |
| `{"tables": {name: rows}}` | reads the Tables list | exact: the panel lists exactly these tables with these counts; `{}` = no tables |
| `{"downloadDb": true}` | clicks Download | the real file: SQLite header, `sqlite3: [[sql, expectedStdout], …]` run with `/usr/bin/sqlite3` (skipped with a warning if absent) |
| `{"export": true}` | clicks Export my work | the real `.md`: `includes`, `excludes`, plus: starts with the title/student line, never mentions `location.`/`file://`, carries the SQL of every box driven so far |
| `{"reload": true}` | `Page.reload` | `restored: [wsIds]` (each `#out-<id>` is `data-state="restored"` with the "Result from … — Run again to refresh" caption and the box text is what was driven), `tables`/`structure` (subset); also asserts localStorage holds only `hw-week1-chapter-*-v1[:db]` keys. Optional `corrupt: [wsIds]` — before the reload, replaces those stored records with a malformed shape (as another local page on the shared `file://` origin could); after the reload each named `#out-<id>` must be `idle` (dropped, not rendered), a marker typed into a text box must survive, and there must be no uncaught exception and no "could not be read" status |
| `{"python": "<code>"}` | the Python cell | `stdoutIncludes`, `stderrIncludes`, `errorIncludes` (state `error`), `notesInclude`/`notesExclude`, `tables`/`structure` |
| `{"reset": true}` | Reset database (confirm auto-accepted, its text must equal `confirmTexts.reset`) | `tables`/`structure` (subset — `structure: {table: {includes, excludes}}` clicks Structure and reads `#dbDetail`, e.g. chapter 3's reset must `exclude` `employee_id` to prove the seed really came back, while its reload must `include` it to prove the ALTER persisted) |
| `{"cancel": "reset"|"clear"|"openDb"}` | clicks the button, answers `confirm()` **false** | the confirm text equals `confirmTexts.{reset|clear|replace}`, status is exactly `Cancelled — nothing changed`, and Tables, localStorage keys and every box are unchanged |
| `{"openDb": "sqlite"|"text"}` | Open a .db file… with a real file (`DOM.setFileInputFiles` + a `change` event — `Page.fileChooserOpened` does not fire for a programmatic click under headless) | `sqlite`: a valid `/usr/bin/sqlite3`-built file opens (status `Opened <file> as <name>`, its table appears, no notice); `text`: a non-SQLite file is refused with a **one-line** reason (no integrity dump) in the status and the notice, and the current database is kept. Confirm(replace) is shown only when a database already exists. `statusIncludes` overrides the expected reason substring |
| `{"clear": true}` | Clear my work (confirm = `confirmTexts.clear`) | both of this page's keys are `removeItem`d (never `clear()`), a sibling `hw-week1-*` key survives, and the page is back to its starting state (name empty, every box its starter, every output idle, transcript empty, seed db for chapter 3); `tables`/`structure` |
| `{"print": true}` | fills a text box and the last required SQL box with long content and prints with `Page.printToPDF` | the printed PDF text carries the last line of a 10-paragraph answer and of a 23-line SQL box (the print mirrors, filled at `beforeprint`), hides the toolbar (`Print / Save PDF`) and the Run-button shortcut hint, and keeps the exercise headings (skipped with a WARN if `pdftotext` is absent) |
| `{"xssCanary": true}` | the last sql box (or `"ws"`): `CREATE TABLE "<img src=x onerror=window.__xss=1>"("</td><td onclick=x>" TEXT)`, INSERT `<img … __xss=2>`, SELECT, Browse, Structure, Python `print('<img … __xss=3>')`, terminal `echo <b>`, then DROP TABLE | `window.__xss === undefined`, every literal rendered as text, no `<img>` element anywhere, the DROP note |
| `{"offline": true}` (last) | a NEW target with `Network.setBlockedURLs(['*cdn.jsdelivr.net*'])` set before navigating | `#engineSqlite[data-state=error]` with "SQLite could not be downloaded … press Retry … Offline alternative", Retry visible, no exception; a Python command in the Terminal reports the honest Python-download failure; then the CDN is **unblocked and both Retry buttons are pressed** — SQLite and Python must reach `ready` (the loader tags are re-inserted) and a SQL box and the Python cell must run |

`tables` semantics: a top-level `{"tables": …}` action is exact; `expect.tables` inside another action is a subset
("these tables show these counts"); an empty map always means "no tables".

Every Run additionally asserts the busy contract: `data-state="running"`, `html[aria-busy=true]` and every
`[data-engine-button]` disabled, read synchronously in the same evaluate as the click. The first Python action on
a page gets 120 s (cold Pyodide download); every other step 60 s; the whole run has `--budget` seconds.

The unit test `test/expected.test.mjs` (and `check.mjs`'s "contract" line) asserts, per chapter: every required sql
workspace (not optional, not in an optional step) has exactly one `@step` block — or, for a `<ws>-<part>` family,
that the family is driven exactly once per part into `<ws>`; every block an action names exists and is `@step`,
not `@alt`; every `@step` block is driven exactly once; a chip of the form `N row(s)…` equals
`expect.results[0].rows` and a chip `OK · N rows changed` equals `expect.changed` on single-block actions; every
terminal workspace's command is driven at least once; exactly one `xssCanary`; `offline` is present once and last.

## Verification matrix

| What is proven | Where | How |
|---|---|---|
| Content schema, hygiene, ids unique, chips rule, table markup | `test/schema.test.mjs`, `check.mjs` | `validate()` on the real chapters + fixture; 16 rejection cases |
| Helpers: tokenizer, base64 (300 KB), SQLite header, first keyword, DROP target, statement-number rule, caps, transcript cap, codecs, export markdown | `test/helpers.test.mjs`, `test/export.test.mjs` | pure functions via `globalThis.HWHelpers` |
| `runtime.js` never calls `localStorage.clear()` | `check.mjs` | source scan of `runtime.js` |
| The runtime writes only `KEYS.main`/`.db`/`.probe`, the probe is removed in a `finally`, and no `COUNT(*)` escapes the `isRealTable()` gate | `test/runtime-source.test.mjs` | source assertions on `runtime.js` (mutation-tested against a deliberately broken copy) |
| The runtime leaves only its own keys behind (the probe never persists) | `verify-browser.mjs` | `reload` asserts every live key matches `/^hw-week1-chapter-\d+-v1(:db)?$/`; `clear` asserts a sibling `hw-week1-*` key survives |
| Persistence hardening: a malformed stored record (non-array `columns`/`rows`/`items`/`frames`/`notes`, non-object `error`) is dropped, never rendered; stdout/stderr/error texts capped at 200 KB per record; the quota fallback drops Python/Terminal records first, then every output; a db skipped for size keeps its last saved copy; export keeps blank lines verbatim and prints the COMMIT note after the failure; `python3 …` still counts as the step's command | `test/codec-hardening.test.mjs` | pure functions via `globalThis.HWHelpers` |
| Build is deterministic; `HW_PAGE` has no `<`, only the allowed keys, the 7 files decode byte-equal; SRI tags; one h1; ids once | `test/build.test.mjs`, `check.mjs` | build twice to a temp dir and byte-compare; `pageFindings()` |
| Zips: byte-deterministic, expected entries, CRCs, `unzip -l`/`-t`, no student page in the instructor zip | `test/zip.test.mjs`, `test/build.test.mjs`, `check.mjs` | pure-Node reader + `/usr/bin/unzip` |
| Pages on disk are fresh; zips on disk match their sources | `check.mjs` | rebuild in memory and byte-compare; per-entry CRC (the PDF entry against the PDF on disk) |
| DOM rules (no innerHTML/outerHTML/insertAdjacentHTML/document.write/eval/new Function), no `Date` in the build | `check.mjs` | source scan |
| No external URL beyond the two CDN bases and the help hosts | `check.mjs` | URL scan of pages and print HTML |
| a11y basics: lang, one h1, heading order, labelled controls, `type=button`, `aria-live` outputs, captions/scope, skip link, `:focus-visible` | `check.mjs` | HTML scan |
| @step ⇄ expected ⇄ content consistency | `test/expected.test.mjs`, `check.mjs` | `expectedConsistencyFindings()` |
| The real pages work: import, every solution query with row counts and spot cells, constraint errors, `changed` counts, Tables, real `.db` download (scoped to the click) read by `sqlite3`, real `.md` export, reload restores (incl. a malformed stored record dropped, not fatal), Reset really restores (structure), the ALTER persists (structure), Cancel/Open-a-.db (valid + rejected)/Clear, the uncommitted-change and wrong-name notes, `input()` refused, a print PDF keeps long answers, offline failure **and Retry-to-ready for both engines**, request allow-list **incl. WebSocket handshakes**, no alert/prompt, no uncaught exceptions | `verify-browser.mjs` | headless Chrome over CDP from `file://`, one Chrome per run |
| PDF text on disk is fresh: the shipped handout (also the zip's copy) carries the current version and every exercise title | `check.mjs` | `pdftotext -layout` (a visible WARN when poppler is absent); catches a handout printed before the last content change |
| PDF: Letter, every exercise title, "What to hand in", grading rows, version, hygiene (text + html), no unrendered entities, no missing glyphs, no sparse pages | `make-pdf.mjs` | `pdfinfo` + `pdftotext -layout` (whitespace-normalised) |

What is **not** checked automatically: visual layout (use the manual checklist), print appearance of the student
pages, Firefox/Safari (Chrome/Edge is the supported target), phones/iPads (unsupported by design).

## Runtime behaviour worth knowing (decisions)

- **Every Run opens the database fresh** from the stored bytes, runs the box, `COMMIT`s any transaction the
  script left open (with a note), exports and stores the bytes. Earlier statements of a failing script are kept
  (autocommit) — the error says so and shows the un-run tail.
- The **Tables list is always reopened from stored bytes**, never from a used connection (`db.export()`
  closes/reopens and resets `PRAGMA foreign_keys`).
- **Python runs in a fresh namespace** (`runpy.run_path` / `exec` into a new dict, then `gc.collect()`), so an
  un-closed `sqlite3` connection is closed (and its transaction rolled back) at the end of the run. Because that
  rollback is silent, the prelude wraps `sqlite3.connect` (a `Connection` subclass as the default `factory`) and
  reports every connection that still had `in_transaction` when the run ended — or that the student closed
  without committing — as the note *Your connection to campus_travel.db still had uncommitted changes when your
  code ended; they were rolled back. Call conn.commit() before your code ends to keep them.* A connection stashed
  somewhere persistent still leaves a `-journal` in MEMFS; the page then warns and does not copy that db back.
- The store → FS sync before a Python run removes stale `-journal`/`-wal` files before rewriting a db.
- File-sync notes after a terminal run (`Created campus_travel.db`, `Updated campus_travel.db`, the journal
  warning, the wrong-name notice, the uncommitted-changes note) are stored as the entry's `notes` and rendered as
  `div.term-note` in the note colour (they used to be appended to stderr and looked like an error); the export's
  transcript text is unchanged — `transcriptText()` prints them after the exit line.
- **The statement loop's COMMIT note** (`Your script left a transaction open; it was committed …`) lives in the
  record's `notes`, rendered after the failure headline, so a failing script never reads "it was committed" above
  "Statement 3 failed".
- **Three storage keys, and the third never persists.** `H.storageKeys(N)` returns
  `hw-week1-chapter-N-v1` (the main record), `…-v1:db` (path → base64) and `…-v1:probe`. The probe is a
  one-character write that `bucketFull()` makes and removes again in a `finally`; it exists only to tell "the
  whole `file://` bucket is full" (every local page shares one ~5 M-char bucket, so the space may have been
  taken by a sibling page) from "this page's own record is too big", because the honest advice differs — free
  space elsewhere, or clear a big output here (`H.chooseSaveStatus` / `H.chooseDbSaveStatus` pick between
  `STORAGE_FULL` and the "too large" texts). Nothing is ever read back from the probe key. `Clear my work`
  removes all three and never calls `localStorage.clear()`; because the probe is gone by the time any check
  runs, `verify-browser.mjs`'s key scan (`/^hw-week1-chapter-\d+-v1(:db)?$/`) still sees only two.
- **Persistence is strict and capped.** `storableRecord()` rejects any record whose `items`/`columns`/`rows`/
  `frames`/`notes` are not arrays (or whose `error` is not an object) — the file:// localStorage bucket is shared
  with every other local page, so corrupted JSON is in the threat model; every restored output renders inside its
  own try/catch; `restoreState()` itself is wrapped in `init()` and the `:db` key is read independently, so a bad
  main record can never leave the engine strip stuck or cost the database. Python/Terminal stdout, stderr and error
  texts are capped at 200 KB per stored record (tail kept, `… (earlier output dropped)` head marker) so one loud
  loop cannot push the main key past the ~5 M-char quota; if it still does not fit, `saveState()` retries with the
  Python/Terminal records dropped, then with every output dropped, and the status reads *Saved partly · …* with
  the fix (Clear under the Python cell / `clear` in the Terminal / Clear the largest result box). Only when even
  that fails does it say *Could not save in this browser — Export my work before closing.*
- **Db auto-save never deletes the last good copy.** `encodeDbStore(entries, cap, prevJson)` carries a skipped
  (over-cap) db's previously saved base64 forward, and a thrown `setItem` is retried once with the largest db
  replaced by its saved copy; the status says *… the copy saved after your last successful run is kept*.
- **The initial SQLite load runs under the busy mutex** (`withEngine(ensureSql)` in `init()`), so Reset, Clear,
  Open and Export are disabled until the engine and the localStorage restore have settled; Reset and Clear also
  discard any restore still pending (`pendingDbRestore = []`), so a "removed" database cannot come back when the
  engine finishes loading. Retry runs under the same mutex. The saved `selectedDb` is applied once the restore has
  run (only if that file exists).
- **Retry re-fetches a failed loader.** A `<script>` tag that failed at page open (offline) is never re-requested
  by the browser, so `ensureSql()`/`ensurePy()` inject a fresh tag with the same `src`/`integrity`/`crossorigin`
  when the loader function is missing. The CDN-mismatch text is reserved for a hash-pinned download that was
  rejected while the file is reachable; a runtime that arrived but did not start says so. A Pyodide failure that
  names a dynamically imported module (the browser caches that failed import for the life of the page, so no
  later `loadPyodide()` can succeed) — or a second consecutive failure with the files reachable — turns the button
  into **Reload page** (`flush()` + `location.reload()`, the work is saved) and says so.
- **Clear has Undo.** A box's Clear (and the Python cell's) keeps the cleared text and stored record in memory and
  shows *Cleared step 5a — Undo* in the status line (a programmatic `value = ''` empties the browser's undo stack);
  Undo restores the text and re-renders the record as `restored`. The offer stands 60 s or until the next real
  status message. No `confirm()` — the spec reserves it for Reset / Clear my work / Replace.
- **Editors auto-grow in CSS** (`field-sizing: content`; the JS `autoSize()` is only the fallback, re-run on
  `resize`, with `overflow-y: auto` so a zoom or rotation can never hide a line). **Printing uses mirrors:** every
  editor has a sibling `pre.print-text` filled from the textarea at `beforeprint`/Print, and the print stylesheet
  shows the mirror instead of the textarea — a form control cannot fragment across pages and re-wraps at print
  width, which clipped long answers. Cards are no longer `break-inside: avoid` (a card taller than a page left the
  previous page empty); steps still are. `pre.file-view` wraps in print.
- **Live regions are quiet.** No "Saving…"; the *Saved locally* tick is re-announced at most every 10 s; the
  Tables list is not a live region (it is re-rendered after every run); idle outputs and `#terminalStatus` stay in
  the tree (empty, zero height) so their first "Running…" / "Downloading Python…" is announced; `#dbNameNotice` is
  unhidden before its text is set. Buttons that repeat per box/table/file carry distinguishing `aria-label`s (*Run
  SQL for step 5a*, *Browse frequent_fliers*, *Download the starter file load_data.py*, *Put the step 1 command in
  the terminal*, *Retry SQLite* / *Retry Python*); step labels use a visually hidden "Step " prefix and the chip
  rows are `role=list` — ARIA prohibits `aria-label` on a plain span/div. The focus ring on the dark terminal row is
  the prompt colour (`#9ed0f2`, 10:1) and the terminal input's border is `#837868` (3.5:1).
- **`input()`** raises a RuntimeError (Pyodide's default would call `window.prompt`).
- stdout/stderr capture uses `setStdout({write})` with a streaming `TextDecoder` and a Python-side flush in
  `finally` — `batched` would hold a trailing partial line and prepend it to the next run.
- `argv` is passed with `pyodide.toPy()`; the JS side never builds Python source from student strings.
- The failure message for a CDN mismatch says "tell your professor" (the spec's literal "instructor" would trip
  the student-page hygiene rule, which is the stricter, structural constraint).
- `pwd` prints the real MEMFS path (`/home/pyodide/week1`), which is what `os.getcwd()` returns too.
- **`COUNT(*)` never runs on a VIEW — one gate, three call sites.** A view can be defined over a join whose row
  count is astronomically larger than the 8 MB file that defines it, and the count runs on the main thread, so one
  student-created view would freeze the page *permanently*: the database defining the view is already saved and
  comes back on the next load. `isRealTable(db, name)` (`sqlite_master.type === 'table'`, everything wrapped) is
  the single gate, and every count goes through it:
  - the **Tables list** — a view gets a `view` pill and an empty count cell;
  - **Browse** — the `LIMIT`ed read still shows the view's rows; only the `· first n of N` total is suppressed, so
    the heading reads just `Browse <name>`;
  - the **`DROP TABLE` pre-count** in the statement loop, which was the one the first views pass missed. The count
    ran *before* the drop, so `DROP TABLE <someview>` would hang the page even though SQLite would then reject the
    statement. A DROP aimed at a view now produces no `Dropped n rows` note.

  The export follows the same rule: `- **name** — view` in place of a row count. Structure works on both and also
  prints the table's indexes.
- **Chapter-specific messages.** `messages.noDb` (chapter 1: "run the import in 1-35 step 1"; chapter 2: "your first
  successful CREATE TABLE in 2-37 step 2 creates mileage.db"; chapter 3: "Reset database … restores the original
  employees.db"), `messages.afterReset` ("run the import in 1-35 step 1 to recreate it" / "run 2-37 step 2 again to
  recreate it" / the seeded default) and `messages.wrongName` (chapter 2 "Give the file the exact name mileage.db, or
  pick it here.", chapter 3 "Use the path chapter-03/employees.db in your code, or pick the file here.") exist because
  "run the import" is wrong advice on two of the three pages. The wrong-name notice shows paths instead of file names
  when the two share a name ("You created employees.db in the Week 1 folder, but the SQL boxes on this page use
  chapter-03/employees.db"), and the Database panel's heading / Download label switch to the path in that case too.
  Chapter 2's optional `executemany` step writes `scratch.db` on purpose, so `messages.sideDbs` turns that one
  creation into an information note (`.notice.info`) instead of a warning. The "No database yet" notice that Download
  shows before a database exists is hidden again by the next panel refresh once the database is there.
- **The toolbar status line has a row of its own** (full width, under the name field and the buttons, via CSS `order`
  so the DOM order stays name → status → buttons): every status message — the export count, the no-database line,
  the save warnings — is readable in full instead of ending in an ellipsis, and the toolbar keeps one height
  (`--toolbar-h`, also the scroll padding) whether the message is short or long.
- **Result and Browse tables grow to their content** (`width:max-content; min-width:100%`, `overflow-wrap:break-word`,
  `min-width:6ch` / `max-width:32rem` per cell) and `.out-scroll` scrolls sideways; a column is never narrower than its
  longest word (an 11-column `SELECT *` used to wrap `last_nam|e` at 1280 px and one character per line at 390 px),
  while a 2,000-character cell still wraps at 32rem. In print the table is 100% wide again and cells wrap anywhere.
- **Keyboard focus is parked during a run.** Disabling the activated engine button would drop focus to `<body>` (up to
  two minutes on a cold Python download, with Tab restarting from the skip link); `setBusy()` moves focus to the
  button's progress element (the box's output, `#terminalStatus`, `#pythonOutput`, the engine item for Retry) with
  `tabindex=-1` + `preventScroll`, and returns it to the button when the run ends unless the student moved it.
- **Print:** the `Week 1 · Chapter N · version …` line is a running footer in the bottom page margin (`@page
  @bottom-center{content:var(--print-foot)}`, the variable set per page by `build.mjs`; `footer.page-foot` is hidden in
  print), so it can never be orphaned on a page of its own; the student's name prints under the hero (`p.print-name`,
  filled at `beforeprint`); word labels (Notice / Explore) print black like the numeric ones; and steps, boxes, code
  blocks and results may break across pages (prose paragraphs, content tables, message lines and table rows stay
  whole, `thead` repeats) — the old `li{break-inside:avoid}` moved whole steps and left up to 75 % of a page blank.
- Word-labelled steps (`notice`, `explore`) render their box labels as "Your answer" / "SQL" rather than "… for step
  notice", and the label pill never wraps mid-word (`minmax(44px, max-content)` label column).
- The database selector is shown whenever more than one option exists, where the options are every existing
  `.db` plus the page's primary path even when it does not exist yet (so the wrong-name notice's "pick the file
  here" has something to pick).

## Gotchas

- A `</script>` or `<!--` inside an inline script terminates it: `build.mjs` refuses to inline helpers/runtime
  containing either, and `HW_PAGE` is serialised with `<` → `<`. (`helpers.js` legitimately contains the
  text `python <script> [args...]` in its help string — `check.mjs` counts inline scripts at line starts.)
- `hw/src/` has no `package.json`, so `helpers.js` is CommonJS under Node and a plain script in the page; ESM
  code does `import './helpers.js'` and reads `globalThis.HWHelpers`.
- Chrome's `file://` localStorage is one bucket shared by every local page ever opened: the runtime only ever
  writes/removes its own three keys (`hw-week1-chapter-N-v1`, `…:db`, and the transient `…:probe`) and never
  calls `clear()`.
- Pyodide 314 fetches its lock file, stdlib zip and wasm from `indexURL` **without** SRI (pinned by the immutable
  versioned path only). Accepted residual risk; the two loader scripts and the sql.js wasm are hash-pinned.
- `getRowsModified()` is stale after DDL; the runtime uses a `SELECT total_changes()` delta instead.
- A `<script src>` tag that failed (page opened offline) stays failed: `typeof initSqlJs`/`loadPyodide` is
  `undefined` for the life of the page unless a new tag is inserted (Retry does that, with the same SRI hash).
- Pyodide's `loadPyodide()` imports `pyodide.asm.mjs` dynamically; a failed dynamic import is cached by the
  browser's module map, so after that failure every later `loadPyodide()` on the same page rejects with the same
  "Failed to fetch dynamically imported module" even with the network back — only a reload recovers. A failure of
  the lock file alone (fetched before the import) does retry fine; the runtime tells the two apart by the message.
- `field-sizing: content` ignores the `rows` attribute, so the text boxes carry `style="--rows:N"` and the CSS
  turns it into a `min-height`.
- `@page` margin boxes (`@bottom-center{content:…}`) render in Chrome/Edge ≥ 131 (headless too), and `var()` set on
  `:root` resolves inside them — that is how the running footer gets its per-chapter text. Firefox and Safari print
  no footer line (the hero still says "Week 1 · Chapter N"). `content` there must be a CSS string: `cssString()` in
  build.mjs escapes it and refuses `</style`.
- Chrome's focus fixup is lazy: right after `btn.disabled = true`, `document.activeElement` still reads the button;
  focus lands on `<body>` at the next render. Park focus explicitly (do not test for `<body>` first).
- `break-after: avoid` on a grid item (the step label) makes Chrome chain the whole `ol.steps` into one unbreakable
  block and push it to the next page; keep break rules on block children of the step body instead.
- The Pyodide download is ~12 MB; in a fresh headless profile the first Python action takes 5–90 s depending on
  the connection (`verify-browser.mjs` allows 120 s).
- `--headless --print-to-pdf` sometimes leaves Chrome running after the file is written; `make-pdf.mjs` waits for
  the file to stop growing and then kills the process.
- `Page.printToPDF` fires the page's `beforeprint` handler itself, so the print mirrors are filled before the PDF is
  rendered — `verify-browser.mjs`'s `print` action need not dispatch it. "Export my work" appears in the how-card
  prose as well as the toolbar button, so the toolbar-hidden check keys on the toolbar-only "Print / Save PDF".
- `Page.fileChooserOpened`/`Page.setInterceptFileChooserDialog` do **not** fire for a programmatic `.click()` under
  `--headless=new`; drive Open a .db file… by resolving `#openDbInput` and calling `DOM.setFileInputFiles` + a `change`
  event (the documented DOM-contract path).
- Chrome overwrites a download of the same name in the download dir (no ` (1)` suffix), so `verify-browser.mjs` matches
  a download to the click that started it (records created at or after the click index only) — never the stale record.
- Node 24: `node --test <directory>` fails; use the quoted glob `node --test 'hw/src/test/*.test.mjs'`.
- In zsh the exit status of a piped command is `$pipestatus[1]`, not `$PIPESTATUS[0]` — run the checkers without
  a pipe when the exit code matters.
- Old zips made with `zip -X` carry directory entries (`Week 1/`); `check.mjs` reports them as unexpected until the
  zips are regenerated with `build.mjs --zip-only`.

## Threat model (short)

The page is the student's own trust domain: student SQL/Python already has full page access, so the only things
that matter are (1) nothing instructor-only is ever embedded (`HW_PAGE` carries files, ids and short UI strings
only; `check.mjs` verifies the file set equals the allow-list and the key set is closed), (2) content coming back
from the engines (table names, cell values, tracebacks, terminal echo) is rendered as text — the XSS canary in
`verify-browser.mjs` proves it on every page, (3) restored/opened `.db` bytes go through size + header +
`PRAGMA quick_check` before use, (4) no network beyond the two pinned CDN bases (`verify-browser.mjs` records every
request URL and fails on anything else), no uploads, no analytics, (5) the instructor zip refuses to contain a
student page and the student zip contains exactly the allow-listed files, the three pages and the PDF.

## Manual smoke checklist (a real browser, 5 minutes)

1. Open a page from disk; the SQLite strip turns green; Tables shows the seed (ch3) or the "No database yet" line.
2. Chapter 1: step 1's "Put this command in the terminal" → Run → `Loaded 43 rows` and the table appears.
3. Run 5a; reload; the result comes back with the "Result from …" caption; the table count survives.
4. Export my work → open the `.md`; Download the `.db` → open it in DB Browser for SQLite.
5. Reset database (cancel, then accept); Clear my work; confirm both dialogs say the page-specific text.
6. Print / Save PDF → every box and output is fully visible, nothing clipped; the name prints under the title and
   every page ends with the `Week 1 · Chapter N · version …` footer (no page holds only the footer).

## Embargo rule

`hw/instructor/` (answer key, solutions, expected scripts) never ships to students: it is only ever zipped into
`Week1InstructorMaterials.zip`, and `build.mjs` refuses to put a student page into that zip. The student zip
contains exactly the 7 allow-listed files, the three pages and the PDF. Student pages and the handout contain no
school name, course code, local path, "answer key" or "instructor" (enforced by `schema.mjs`, `check.mjs` and
`make-pdf.mjs`).

- **The empty Tables list carries a one-click loader.** A student who opens chapter 1 sees an empty database and,
  before this, had to find exercise 1-35 step 1, put its command in the Terminal and press Run. `messages.noDbAction`
  ({label, ws}) adds a button to that empty state which runs *the same command the step shows* — the schema it prints,
  the transcript and the export are identical either way, and step 1 still asks the student to read the output.
  `schema.mjs` refuses a `noDbAction` whose `ws` is not a terminal workspace on the same page, so the button can never
  run a command the page does not already display. Only chapter 1 sets it: chapter 2's database is created by the
  student's own `CREATE TABLE`, and chapter 3's is seeded from the starter file (Reset database restores it).
