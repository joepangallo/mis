# DOM contract — Week 1 homework pages

What `build.mjs` renders and what `runtime.js` adds at run time. `verify-browser.mjs`, `check.mjs` and the
reviewers can rely on every id, class, attribute and state listed here. Anything not listed is an
implementation detail that may change.

## 1. Page skeleton (built at build time, in this order)

| Element | Notes |
|---|---|
| `a.skip[href="#main"]` | first focusable element |
| `noscript > p.no-script` | |
| `header.hero > .wrap` | `span.eyebrow` = `Week 1 · Chapter N`, the page's only `h1`, `div.lede` (content `lede` html), `div.chips[role=list][aria-label="At a glance"] > span.chip[role=listitem]` ×4, then `p.print-name` "Student: " + `span#printName` — `display:none` on screen, shown by the print stylesheet; the runtime fills it at `beforeprint` / Print with the name field's value or `(no name entered)` |
| `div.toolbar[role=toolbar] > .wrap.toolbar-inner` | `label.name-field > input#studentName[type=text]`; `span#saveStatus.save-status[role=status][aria-live=polite]` (gets `.is-warn` / `.is-bad`; `.is-tick` while it shows the routine save tick) containing `span.status-text` and, after a Clear, `button.status-action` "Undo" — the status has a full-width row of its own under the name field and the buttons (CSS `order`; the DOM order name → status → buttons is what a screen reader hears), so every message is readable in full and the toolbar keeps one height (`--toolbar-h`); `button#downloadDbBtn` (label `Download <the selected db's name as #dbName shows it>`, always enabled; the file it saves is always the basename); `button#openDbBtn[data-engine-button]` + `input#openDbInput[type=file][hidden]`; `button#exportBtn[data-engine-button]`; `button#printBtn` |
| `main#main[tabindex=-1] > .wrap` | everything below |
| `section.card.how#how` | "How this page works" |
| `section.card.exercise#ex-<exerciseId>[data-exercise=<id>][data-kind=spreadsheet\|database][aria-labelledby]` | one per exercise; spreadsheet exercises come first, then the Database panel, then database exercises |
| `section.card.db-panel#database` | the Database panel (section 3) — always immediately before the first database exercise |
| `section.card#grading` | `table.tbl` (caption "Points per exercise", `th[scope=col]`) from `handout.grading` **plus a final `Total per exercise` row** (the sum), then `handout.gradingNotes` html — the same `gradingTable()` the printed handout uses |
| `section.card#unstuck` | `content.unstuck` entries (chapter-specific) followed by the handout's shared browser-edition `handout.unstuck` entries; list entries render as `dl.unstuck > dt + dd`, html strings verbatim; omitted only when both are empty |
| `footer.page-foot` | `Week 1 · Chapter N · version <handout.version>` |
| `script` ×3 (inline, in this order) | `window.HW_PAGE = {…}` (escaped JSON), helpers.js, runtime.js |

Head: `<title>Week 1 · Chapter N · Excel and SQLite Projects</title>`, inline `<style>` (page.css), then exactly two
external `<script src>` tags (sql.js loader, Pyodide loader), each with `integrity="sha384-…"` and
`crossorigin="anonymous"`, values taken verbatim from `cdn.json`.

### Exercise card internals

`span.section-label` → `h2#ex-<id>-title` → `h3` Scenario → content html → `h3` Data → html → `h3` Steps →
`ol.steps` → `h3` Submit → html → optional `h3` "One thing to notice" + `exercise.notice` html + a second
`ol.steps` holding any step whose label is exactly `notice`.

Each step: `li.step#step-<exerciseId>-<label>[data-step=<label>]` (+ `.is-optional`) →
`span.step-label` (`.is-word` when the label is not `\d+[a-z]?`; a numeric label starts with a visually hidden
`span.sr-only` "Step " so its accessible text is "Step 5a" — no `aria-label`, which ARIA prohibits on a plain span) +
`div.step-body` (content html, then for each workspace in order: its `div.expect[role=list][aria-label="What to
expect"] > span[role=listitem]` chips (if any) followed by its workspace block).

### Workspace blocks

| tool | markup |
|---|---|
| `sql` | `div.ws.ws-sql[.is-optional]#ws-<id>[data-ws=<id>][data-tool=sql][data-optional=true when optional]` → `label.ws-label[for=<id>]` (the workspace's `label` if it has one, else "SQL for step 5a"; "SQL" on a word-labelled step; "Optional SQL for step 4" for an optional box) → **`textarea#<id>.editor.sql-editor[data-ws-text]`** (starter text as its content, `placeholder`) → `pre.print-text[data-print-for=<id>][aria-hidden=true]` (print mirror, see below) → `div.ws-actions` → `button.btn.run[data-action=run-sql][data-ws=<id>][data-engine-button][aria-label="Run SQL for step 5a"]` "Run SQL", `button.btn.ghost[data-action=clear-sql][data-ws=<id>][aria-label="Clear the SQL for step 5a"]` "Clear", `span.shortcut` → **`div.output#out-<id>[data-output=<id>][data-state=idle][aria-live=polite]`** |
| `text` | `div.ws.ws-text[.is-optional]#ws-<id>[data-ws=<id>][data-tool=text][data-optional=true when optional]` → `label.ws-label[for=<id>]` (the workspace's `label` if it has one, else "Your answer for step 3"; "Your answer" on a word-labelled step such as `notice`) → **`textarea#<id>.editor.text-editor[data-ws-text][rows=N][style="--rows:N"]`** → `pre.print-text[data-print-for=<id>]` |
| `terminal` | **`div.ws.ws-ref.ws-terminal#<id>[data-ws=<id>][data-tool=terminal]`** → `span.ws-label` → `pre.cmd > code` (the exact command) → `button.btn.ghost[data-action=put-terminal][data-ws=<id>][aria-label="Put the step 1 command in the terminal"]` |
| `python` | **`div.ws.ws-ref.ws-python#<id>[data-ws=<id>][data-tool=python]`** → `span.ws-label` → `pre.snippet > code` → `button.btn.ghost[data-action=put-python][data-ws=<id>][aria-label="Put the explore step code in the Python cell"]` |

Invariant: **exactly one element per workspace has `id` equal to the workspace id** (the textarea for `sql`/`text`,
the wrapper for `terminal`/`python`). Every wrapper also carries `data-ws`. Accessible names use "step 5a" for
numeric labels and "the notice step" for word labels, and an optional box is named "the optional box in step 4" (the
Put-this… buttons refer to the page's single Terminal / Python cell and always read "Put the step 1 command in the
terminal" / "Put the explore step code in the Python cell", never the optional-box wording), so
**no two buttons on a page share an accessible name and no two boxes in one step share a visible label** (check.mjs
enforces both). A second box in one step (the optional `s2-37-4b`) carries its own `label` in content; the Files-list
Download buttons read "Download the starter file <name>" so they never collide with the toolbar's "Download <name>".

**Editors and print.** `textarea.editor` grows with its content through CSS `field-sizing: content` (Chrome/Edge
≥ 123); where that is unsupported the runtime sets an inline `height` on input and on a debounced `resize`, and
`overflow-y: auto` guarantees a scrollbar in any case. Every editor (each `sql`/`text` box and `#pythonCode`)
has a sibling **`pre.print-text[data-print-for=<textarea id>]`** that is `display:none` on screen; at
`beforeprint` (and in Print / Save PDF) the runtime copies the textarea's value into it with `textContent`, and the
print stylesheet hides the textareas and shows the mirrors — a `<pre>` re-wraps at print width and fragments
across pages, a form control does neither. A driver that wants to print can dispatch `beforeprint` itself.

**Print layout.** The `Week 1 · Chapter N · version …` line prints as a running footer on every page through
`@page { @bottom-center { content: var(--print-foot) } }` (Chrome/Edge ≥ 131); `build.mjs` sets `--print-foot` on
`:root` in a second inline `<style>` and `footer.page-foot` is hidden in print, so the footer can never sit alone on
a last page. `p.print-name` prints under the hero chips. Steps, boxes, code blocks and results may break across pages
(prose paragraphs, content tables, message lines and table rows stay whole; `thead` repeats on every page of a long
result; labels and headings keep the block that follows them); `.step-label.is-word` prints black-on-white like the
numeric labels.

## 2. Database panel (`section#database`)

```
span.section-label
h2#database-title            "Your database: " span#dbName        ← the SELECTED db's file name, or its path ("chapter-03/employees.db" / "Week 1/employees.db") when another db in the store has the same file name (#downloadDbBtn reads "Download <the same text>"; the downloaded file is always the basename)
div.engine#engineStrip
  div.engine-item#engineSqlite[data-state=loading|ready|error]   strong (title) · span.engine-detail · button[data-engine-button] "Retry SQLite" (hidden unless error)
  div.engine-item#enginePython[data-state=idle|loading|ready|error]   same shape; ready title = "Python ready · 3.14"; the button reads "Retry Python", or "Reload page" (flush + location.reload) when a retry cannot succeed on this page (see §10)
div.db-select-row#dbSelectRow[hidden]   label[for=dbSelect] + select#dbSelect   ← shown only when >1 option; options = every existing db path, plus the primary path even when it does not exist yet; option text = "<path> (this page)" / "<path> (this page — not created yet)" for the primary, the bare path otherwise (the row wraps and the select shrinks, so it fits a 390 px viewport)
p.notice#dbNameNotice[role=status][hidden]   (.warn | .bad | .info)  unhidden first, text set on the next task (so it is announced). Kinds: the no-database line (`messages.noDb`, shown by Download with no database and hidden again by the next panel refresh once the database exists) · the wrong-name notice (`H.wrongNameNotice(created, primary, messages.wrongName)`) · an information note for a db named in `messages.sideDbs` (chapter 2's scratch.db) · the unusable-file / unreadable-save notice (.bad)
h3 Tables
div.db-tables#dbTables                  (no live region: it is re-rendered after every run)
  div.db-table-row[data-table=<name>]  span.name · span.pill "view" (views only) · span.count "43 rows" (EMPTY for a view: a view over a cross join can hold astronomically more rows than the file that defines it, so nothing on the page ever counts one — Browse on a view likewise shows "Browse <v>" with no " · first n of m") · button[data-action=browse][data-table][aria-label="Browse <name>"] · button[data-action=structure][data-table][aria-label="Structure of <name>"]
  | div.db-empty                       message when there is no database / no tables / engine not loaded; `.is-error` (red) for a real failure
  |   span                              the message text
  |   button.btn.small.db-empty-action[data-action=load-data][data-engine-button]   only when the chapter sets
  |                                     messages.noDbAction AND the selected database is the page's primary one.
  |                                     One click = putInTerminal(action.ws) + runTerminal(that workspace's command),
  |                                     i.e. exactly the command the step already shows. Chapter 1 only.
div.db-detail#dbDetail
  div.output#dbDetailOutput[data-state=done|error]   .out-head ("Browse <t> · first 50 of n" | "Structure of <t>") + .out-scroll>table.result | pre.out-code | .out-msg.error
h3 Terminal
div.terminal#terminal[data-state=idle|running|done|error]
  div.transcript#terminalTranscript[role=log][aria-live=polite]
    div.term-entry[data-entry=N]   div.term-cmd "$ <command>" · div.term-stdout · div.term-stderr · div.term-exit ("exit status N" or the sys.exit string) · div.term-note ×n (file-sync notes: "Created campus_travel.db", "Updated …", the journal warning, the wrong-name notice, the uncommitted-changes note — note colour, never stderr)
  div.term-status#terminalStatus[aria-live=polite]   "Downloading Python (about 12 MB, one time)…" / "Running…" / "" (stays rendered at zero height while empty, so the live region exists before its first text lands)
  div.term-row   span.prompt "$" · label.sr-only[for=terminalInput] · input#terminalInput[type=text] · button#terminalRunBtn[data-engine-button] "Run"
h3 Python
div.ws.ws-pycell#pythonCell
  label.ws-label[for=pythonCode] · textarea#pythonCode.editor.code-editor[data-ws-text] (pythonStarter as content) · pre.print-text[data-print-for=pythonCode]
  div.ws-actions  button#pythonRunBtn.btn.run[data-engine-button] "Run Python" · button#pythonClearBtn "Clear" · span.shortcut
  div.output#pythonOutput[data-output=python][data-state][aria-live=polite]
h3 Files
p.mini
ul.file-tree#files   li > span.file-folder "Week 1/" > ul … (folders nest; files:)
  li > div.file-row[data-file=<path>](.is-current when in filesShown)  span.file-name · span.file-size · span.file-actions > button[data-action=download-file][data-path][aria-label="Download <name>"] · button[data-action=view-file][data-path][aria-expanded][aria-label="View <name>" → "Hide <name>"] (load_data.py only)
       pre.file-view[data-path][hidden]   (load_data.py only; filled with textContent on View)
div.danger-zone#startOver   h3 "Start over" · p · div.danger-actions > button#resetDbBtn.btn.danger[data-engine-button] · button#clearWorkBtn.btn.danger[data-engine-button]
```

## 3. Output states

`data-state` on `#out-<id>`, `#pythonOutput`, `#terminal` and `#dbDetailOutput`:

| value | meaning |
|---|---|
| `idle` | nothing has run (also after Clear) — the output is empty and collapsed to zero height by CSS but stays in the accessibility tree, so its first "Running…" is announced |
| `running` | set **synchronously** by every Run handler before its first `await`, together with `html[aria-busy=true]` and every `[data-engine-button]` disabled |
| `done` | the run finished (SQL: no statement failed and at least one statement ran; Python cell: no exception; terminal: the command was processed, whatever the script's exit status) |
| `error` | SQL: a statement failed **or** nothing to run ("Write the SQL first."); Python cell: the code raised; terminal: the engine itself failed (Python could not load); Open/Browse/Structure: the file could not be read |
| `restored` | rendered from the stored record — on page load from localStorage, or after **Undo** of a Clear; first child is `div.out-caption` = `Result from <weekday> <time> — Run again to refresh`. Never appears after Run. |

Output children (all built with `h()` + `textContent`):

- `div.out-msg.running` "Running…"
- `div.out-head` — `Result k · n rows` (+ ` · showing first 500 of n` when capped; restored outputs show ` · showing first 200 of n`)
- `div.out-scroll > table.result` — sr-only `caption`, `thead th[scope=col]`, `tbody tr > td` (`td.null` "NULL", `td.empty` "0 rows" spanning all columns); cells longer than 2,000 chars end in `…`
- `div.out-msg.ok` — `OK` or `OK · n rows changed` (only for INSERT/UPDATE/DELETE/REPLACE)
- `div.out-msg.note` — `Dropped <table> (n rows)` (in statement order); Python notes (`Created x.db`, `Updated x.db`, the journal warning, the wrong-name notice `You created campustravel.db, but the SQL boxes on this page use campus_travel.db. <messages.wrongName>` — paths instead of names when the two share a file name — or the `messages.sideDbs` note for a db a step creates on purpose, `Your connection to <db> still had uncommitted changes when your code ended; they were rolled back. Call conn.commit() before your code ends to keep them.`)
- `div.out-msg.error` — `Statement k failed: <sqlite message>. Statements 1–(k-1) were applied; the rest was not run:` (k=2: `Statement 1 was applied`; k=1: `No earlier statements were applied`) followed by `pre.out-code` with the trimmed remaining SQL; or `Write the SQL first.`; or an engine message
- `div.out-msg.note` **after** the error block — the record's trailing notes: `Your script left a transaction open; it was committed so the changes are saved.` (so a failing script reads "Statement 3 failed …" before "it was committed")
- Python cell: `pre.out-text` (stdout), `pre.out-text.stderr` (stderr, then the filtered traceback), `div.out-msg.note` ×n, or `div.out-msg.ok` "Finished with no output."

Clear (a SQL box's Clear, `#pythonClearBtn`) empties the box and its output, sets `data-state=idle`, and — when
there was anything to lose — shows `#saveStatus` = `Cleared step 5a` / `Cleared the Python cell` with an
`button.status-action` "Undo" that restores the text and re-renders the stored record as `restored`; the offer
stands for 60 s or until the next real status message.

## 4. Driving the page (what verify-browser.mjs does)

```js
// set a box
el.value = text; el.dispatchEvent(new Event('input', { bubbles: true }));
// run it
document.querySelector('[data-action="run-sql"][data-ws="s1-35-5a"]').click();   // then poll #out-s1-35-5a[data-state] for done|error
document.getElementById('terminalInput').value = cmd; document.getElementById('terminalRunBtn').click();  // poll #terminal[data-state]
document.getElementById('pythonCode').value = code; document.getElementById('pythonRunBtn').click();      // poll #pythonOutput[data-state]
document.querySelector('#dbTables [data-table="frequent_fliers"] .count').textContent   // "43 rows"
document.getElementById('downloadDbBtn').click();   // Browser.setDownloadBehavior first; file name = basename of the selected db
document.getElementById('exportBtn').click();       // downloads ch1-queries.md / ch2-database.md / ch3-queries.md
document.getElementById('resetDbBtn').click();      // confirm() with HW_PAGE.confirmTexts.reset  → cancel ⇒ #saveStatus "Cancelled — nothing changed"
document.getElementById('clearWorkBtn').click();    // confirm() with HW_PAGE.confirmTexts.clear
document.getElementById('openDbBtn').click();       // confirm() with confirmTexts.replace only when a db exists; then #openDbInput receives the file (DOM.setFileInputFiles + a 'change' event works)
```

The page never calls `alert()` or `prompt()`; `confirm()` is called only by Reset database, Clear my work and
Open a .db file…. A first Python action can take up to ~2 minutes on a cold cache (120 s budget).

Ctrl/⌘+Enter in a SQL box or the Python cell runs it; Enter in the terminal input runs the command.

## 5. Busy contract

While any engine operation is in flight (the initial SQLite load at page open, SQL run, terminal command, Python
run, Pyodide download, a Retry, Reset, Clear, Open): `document.documentElement` has `aria-busy="true"` and every
`[data-engine-button]` is `disabled` (Run SQL ×n, terminal Run, Run Python, both Retry buttons, Open a .db file…,
Export my work, Reset database, Clear my work). Download, Print, Clear-box, Put-this…, Browse, Structure, View
stay enabled. A click that arrives while busy is ignored with `#saveStatus` = `Wait for the current run to
finish.` (or `Wait for SQLite to finish loading.` during the initial load) and no state change. Because the
initial load holds the mutex, Reset / Clear / Open cannot run before the saved database has been restored (and
both Reset and Clear also discard any restore still pending). **Keyboard focus during a run:** disabling the
activated engine button would drop focus to `<body>` (Chrome does this lazily at the next render), so the runtime
parks focus on that button's progress element for the run — a box's `#out-<id>` ("Running…"), `#terminalStatus`
("Downloading Python…" / "Running…"), `#pythonOutput`, the `.engine-item` for a Retry, `#saveStatus` for Open /
Reset / Clear — giving it `tabindex="-1"` and focusing it with `preventScroll`; when the busy state ends, focus goes
back to the button unless the student moved it meanwhile.

## 6. localStorage (origin `file://` is shared by every local page — only these three keys are ever written, and only two of them persist)

- `hw-week1-chapter-N-v1` — JSON:
  ```json
  { "v": 1, "name": "…", "texts": { "<wsId>": "…" }, "python": "cell text or null",
    "transcript": [ { "cmd": "…", "stdout": "…", "stderr": "…", "exit": null | 2 | "message", "ts": "ISO" } ],
    "outputs": { "<sqlWsId>": SqlRecord, "<terminalWsId>": TerminalRecord, "<pythonWsId>": PythonRecord, "terminal": TerminalRecord, "python": PythonRecord },
    "selectedDb": "campus_travel.db" }
  ```
  - `SqlRecord = { kind:"sql", ts, source, statements, items:[ {type:"result", k, columns:[…], rows:[[…]] (≤200, cells stringified/truncated, null kept), total} | {type:"message", level:"ok"|"note", text} ], error: null | {statement, message, remaining}, notes:[…] }` (`notes` = the COMMIT note, rendered after the error)
  - `TerminalRecord = { kind:"terminal", ts, cmd, stdout, stderr, exit, notes:[…] }` — stored under `terminal` and under every terminal workspace whose `command` is the same command (interpreter alias `python`/`python3`/`py`, spacing and quoting ignored — `H.sameCommand`)
  - `PythonRecord = { kind:"python", ts, source, stdout, stderr, error: null | {text, frames:[[file, line, name, code]]}, notes:[…] }` — stored under `python` and under every python workspace whose `snippet` equals the cell text after whitespace normalisation (CRLF, trailing spaces and blank lines ignored — `H.sameSource`)
  - transcript entries carry `notes:[…]` too (the file-sync notes; `H.transcriptText` prints them after the exit line, so the export text is unchanged).
  - **Caps and strictness.** `stdout`, `stderr`, `error.text`/`error.remaining` are capped at 200 KB per stored record (the tail is kept, with the head marker `… (earlier output dropped)`); the transcript is capped at 200 KB (oldest entries dropped). The codec (`H.storableRecord`) is strict: a record whose `items`, `columns`, `rows`, a row, `frames` or `notes` is not an array — or whose `error` is not an object — is dropped on both encode and decode, and every restored record is rendered inside its own try/catch, so a corrupted value written by another local page can never stop the restore or the engine load.
  - text saves debounced 250 ms; the whole record is written synchronously after every run; flushed on `pagehide` / hidden `visibilitychange`. **If the main key no longer fits** the quota, it is re-written with the Python/Terminal records dropped, then with every output dropped (`H.slimState`); `#saveStatus` then reads `Saved partly · <what was dropped and how to fix it>` instead of `Saved locally`, and only when even that fails `Could not save in this browser — Export my work before closing.`
- `hw-week1-chapter-N-v1:db` — JSON `{ "<relative path>": "<base64 of the .db>" }`, written synchronously after every run that changed a database. A db whose base64 exceeds 2 MB is skipped **but its previously saved copy is carried over unchanged** (`#saveStatus`: `Database too large to auto-save (n MB) — use Download; the copy saved after your last successful run is kept`); if the write itself throws, the largest db is likewise replaced by its saved copy and the write retried once. The `:db` key is read independently of the main key on load. Restored bytes go through the open-and-check rule (≤ 8 MB, `SQLite format 3\0` header, `PRAGMA quick_check` = ok) once sql.js is ready; failures show `Saved database could not be opened — Reset database to start over.` The saved `selectedDb` is applied once the restore has run (only if that file exists).
- `hw-week1-chapter-N-v1:probe` — **never observable.** `H.storageKeys()` returns it as `probe`, and `bucketFull()`
  is its only writer: a one-character `setItem` under it answers "is the whole shared bucket full, or is only this
  page's own record too big?" (the two deserve different advice), and a `finally` removes it again before the call
  returns. It carries no data, survives no turn of the event loop, and is written only on a save that already
  failed. A driver can therefore assert that every live key matches `/^hw-week1-chapter-\d+-v1(:db)?$/` — as
  `verify-browser.mjs` does — and that assertion holds precisely because the `finally` always runs.
- Clear my work → `removeItem` on exactly these three keys (never `clear()`), then the page returns to its starting state (seed db restored for chapter 3). The probe is removed for tidiness only; a `setItem` that threw left nothing behind.

## 7. `window.HW_PAGE`

```js
{ id: 'chapter-1', chapter: 1, version: '2026-09-02',
  primaryDb: 'campus_travel.db', seedDb: null,
  workspaces: [ { id, tool, stepLabel, exerciseId, command? (terminal), snippet? (python), starter? (sql), optional? (true when the box or its step is optional) } ],   // page order
  files: { '<relative path>': { kind: 'text' | 'base64', body } },   // exactly the 7 allow-listed files
  cdn: { sqljs: { version, base, loader:{url,integrity,bytes}, wasm:{url,integrity,bytes} }, pyodide: { version, base, loader:{…} } },
  pythonStarter: '…', confirmTexts: { reset, clear, replace },
  messages: { noDb: 'No database yet — run the import in 1-35 step 1, or press the button.',  // Tables list / Download with no database
              noDbAction: { label: 'Load the data (runs 1-35 step 1)', ws: 't1-35-1' } | null,  // the button above
              afterReset: 'Database removed — run the import in 1-35 step 1 to recreate it',   // status after Reset database
              wrongName: 'Re-run the import with the exact name, or pick the file here.',     // advice sentence of the wrong-name notice
              sideDbs: {} },                                                                   // chapter 2: { 'scratch.db': '<information note>' }
  exportName: 'ch1-queries.md' }
```
Every `messages` key is always present (build.mjs fills the defaults: `afterReset` = `Database reset to the original
<name>` for a seeded page, else `Database removed — run the import again to recreate it`). Serialised with `<` → `<`
(and U+2028/2029 escaped); contains no prose beyond the confirm/message strings.

## 8. Status-line strings (`#saveStatus`)

`Your work saves in this browser as you type.` · `Saved locally · 9:41 AM` (strong + time; never "Saving…" —
the tick is re-announced at most every 10 s) · `Saved partly · <fallback text>` (outputs dropped to fit, see §6) ·
`Cancelled — nothing changed` · `Exporting… 2 boxes have SQL but no result yet.` / `Exporting…` ·
`Exported ch1-queries.md[ — n boxes have SQL but no result yet]` · `Downloaded <name>` · `Opened <file> as <name>` ·
`Database too large to auto-save (n MB) — use Download[; the copy saved after your last successful run is kept]` ·
`That file is not a usable SQLite database (<reason>).` ·
`Saved database could not be opened — Reset database to start over.` ·
`Your saved work could not be read — this page starts from a blank state. Your database is unaffected.` · `<messages.noDb>` ·
`<messages.afterReset>` (chapter 1 `Database removed — run the import in 1-35 step 1 to recreate it`, chapter 2 `Database removed — run 2-37 step 2 again to recreate it`, chapter 3 `Database reset to the original employees.db`) ·
`Work cleared — this page is back to its starting state` · `Wait for the current run to finish.` /
`Wait for SQLite to finish loading.` · `Command ready — press Run in the Terminal` · `Code ready — press Run Python` ·
`Cleared step 5a` / `Cleared the Python cell` (+ Undo button) · `Restored step 5a` / `Restored the Python cell` ·
`Could not save in this browser — Export my work before closing.`

## 9. Export file (`ch1-queries.md` / `ch2-database.md` / `ch3-queries.md`)

`# Week 1 · Chapter N · Excel and SQLite Projects` → `Student: …` → `Exported: YYYY-MM-DD HH:MM` → per exercise
`## <exerciseId> · <title>` → per workspace `### Step <label> — SQL|Written answer|Terminal|Python (<wsId>)` (an optional
box reads `### Step <label> (optional) — …`) with the text in a fence (```sql / ```python / plain) and the stored record
(`Result (Tue 9:41 AM):` + markdown tables ≤ 200 rows + `… n more rows`, or fenced text) · `_(no answer)_` (a required
empty box) / `_(optional — not attempted)_` (an untouched optional box) · `_(written but never run — press Run before exporting)_` ·
`_(this result is from an earlier version of the box — press Run again to refresh it)_` → `## Terminal transcript` →
`## Python cell` → `## Database at export time` → `### <path>` → `- **table** — n rows` + ```sql fence per table
(a **view** is listed `- **name** — view`, with no count: counting one would evaluate the view, which is unbounded
over a cartesian product — the same rule the Tables list and Browse follow).
Never contains `location.*`, `file://` or a local path.

## 10. Python environment (inside the page)

Files live at `/home/pyodide/week1/<relative path>`, cwd = `/home/pyodide/week1`. `input()` raises
`RuntimeError('input() is not available on this page. Put the value directly in your code instead.')`.
Scripts run via `_hw.run_script(path, argv)` (fresh `__main__` namespace through `runpy.run_path`), cells via
`_hw.run_cell(code)` (fresh namespace, source file name `<cell>`); both return
`('ok'|'exit'|'error', code-or-message, frames, [db names with uncommitted changes])` and flush stdout/stderr in
`finally`. Tracebacks keep only frames whose file does not start with `/lib/` or `<` (plus `<cell>`).

`sqlite3.connect` is wrapped by the prelude (default `factory` = a `sqlite3.Connection` subclass): every
connection opened during a run is remembered, and one that still has `in_transaction` when the run ends — or when
the student closes it without committing — puts its database name into the 4th element, which the page renders as
the note `Your connection to <db> still had uncommitted changes when your code ended; they were rolled back. Call
conn.commit() before your code ends to keep them.` (the rollback itself is the end-of-run `gc.collect()` closing
the connection; a connection stashed somewhere persistent still leaves a `-journal` and gets the journal warning).

**Loading failures.** A loader `<script>` that failed when the page opened is re-fetched by Retry through a new
tag with the same `src`, `integrity` and `crossorigin`. The CDN-mismatch message appears only when a hash-pinned
download was rejected while the file is reachable; a runtime that arrived but did not start says so instead. A
Pyodide failure whose message names a dynamically imported module (the browser caches that failed import for the
life of the page) — or a second consecutive failure with the files reachable — turns the button into
"Reload page" (`flush()` + `location.reload()`, the work is saved) with a message that says so. Retry runs under
the busy mutex like every other engine operation.
