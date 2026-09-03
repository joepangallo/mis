#!/usr/bin/env node
// build.mjs — content + runtime + css + embedded allow-list files → the three student pages,
// the handout print HTML (to --print-out) and the two deterministic zips. Zero dependencies.
//
//   node hw/src/build.mjs                       # pages → hw/Week 1/, zips → hw/ (needs the PDF on disk)
//   node hw/src/build.mjs --no-zip --print-out /tmp/x/handout.html
//   node hw/src/build.mjs --zip-only            # after make-pdf.mjs regenerated the PDF
//   node hw/src/build.mjs --content-dir DIR --out-dir DIR --week-dir DIR --instructor-dir DIR --zip-dir DIR
//
// Every assembly function is exported; main() runs only when this file is invoked directly.
import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync, statSync } from 'node:fs';
import { dirname, join, resolve, basename } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { validate, validateHandout, collectWorkspaces, escapeHtml, gradingTable, normaliseUnstuck } from './schema.mjs';
import { createZip } from './zip.mjs';
import './helpers.js';

const H = globalThis.HWHelpers;

export const SRC_DIR = dirname(fileURLToPath(import.meta.url));
export const HW_DIR = resolve(SRC_DIR, '..');
export const DEFAULTS = Object.freeze({
  contentDir: join(SRC_DIR, 'content'),
  weekDir: join(HW_DIR, 'Week 1'),
  instructorDir: join(HW_DIR, 'instructor'),
  outDir: join(HW_DIR, 'Week 1'),
  zipDir: HW_DIR,
});
// The ONLY files embedded in the pages and shipped in the starter zip, relative to Week 1/.
export const ALLOW_LIST = Object.freeze([
  'chapter-01/data/FrequentFliers.txt',
  'chapter-01/data/TicketSales.csv',
  'chapter-02/data/TCO.csv',
  'chapter-03/data/employees.csv',
  'chapter-03/data/frequentflier2.xlsx',
  'chapter-03/employees.db',
  'load_data.py',
].sort());
export const TEXT_FILE = /\.(py|txt|csv)$/i;
export const PDF_NAME = 'Application-Exercises-Week-1.pdf';
export const STARTER_ZIP = 'Week1StarterFiles.zip';
export const INSTRUCTOR_ZIP = 'Week1InstructorMaterials.zip';
export const WEEK_FOLDER = 'Week 1';
export const pageName = (chapter) => `week-1-chapter-${chapter}.html`;

export const HOW_TEXT = 'Each time you press Run, the page opens your database file, runs your SQL from top to bottom, and saves the file again. The first time you use Python the page downloads it (about 12 MB, once). Your work and your database are kept inside this browser on this computer. They are not kept if you use a different browser or computer, and any other local web page opened in this browser can see them, so on a shared computer: Export, Download, then Clear my work before you leave. Nothing is uploaded.';
export const NO_DB_DEFAULT = 'No database yet — run the import in the Database panel first.';
// The status line after Reset database when the content does not say otherwise (chapters 1 and 2 name their own step).
export function afterResetDefault(content) {
  return content.seedDb ? `Database reset to the original ${H.basename(content.primaryDb)}` : 'Database removed — run the import again to recreate it';
}
// A CSS string literal for an inline <style> — a raw-text element, so entities are not decoded and "</style" must never appear.
export function cssString(s) {
  const t = String(s);
  if (/<\/style/i.test(t)) throw new Error('a CSS string must not contain "</style"');
  return `"${t.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\r?\n/g, '\\a ')}"`;
}
export const footerText = (content, handout) => `Week ${content.week} · Chapter ${content.chapter} · version ${handout.version}`;

// ---------------------------------------------------------------------------------------------
// Assets
// ---------------------------------------------------------------------------------------------
export function serializePageData(value) {
  return JSON.stringify(value).replace(/</g, "\\u003c").replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029");
}
export function assertInlineSafe(code, label) {
  if (/<\/script/i.test(code)) throw new Error(`${label} contains "</script" and cannot be inlined`);
  if (/<!--/.test(code)) throw new Error(`${label} contains "<!--" and cannot be inlined`);
  return code;
}
export function loadAssets({ srcDir = SRC_DIR, weekDir = DEFAULTS.weekDir } = {}) {
  const css = readFileSync(join(srcDir, 'page.css'), 'utf8');
  const helpersJs = assertInlineSafe(readFileSync(join(srcDir, 'helpers.js'), 'utf8'), 'helpers.js');
  const runtimeJs = assertInlineSafe(readFileSync(join(srcDir, 'runtime.js'), 'utf8'), 'runtime.js');
  const cdn = JSON.parse(readFileSync(join(srcDir, 'cdn.json'), 'utf8'));
  const files = {};
  const fileBytes = {};
  for (const rel of ALLOW_LIST) {
    const abs = join(weekDir, rel);
    if (!existsSync(abs)) throw new Error(`embedded file missing: ${abs}`);
    const buf = readFileSync(abs);
    fileBytes[rel] = buf;
    files[rel] = TEXT_FILE.test(rel) ? { kind: 'text', body: buf.toString('utf8') } : { kind: 'base64', body: buf.toString('base64') };
  }
  return { css, helpersJs, runtimeJs, cdn, files, fileBytes };
}
export async function loadContent(contentDir = DEFAULTS.contentDir) {
  const names = readdirSync(contentDir).filter((n) => /^chapter-\d+\.mjs$/.test(n)).sort((a, b) => Number(a.match(/\d+/)[0]) - Number(b.match(/\d+/)[0]));
  if (!names.length) throw new Error(`no chapter-N.mjs files in ${contentDir}`);
  const chapters = [];
  for (const n of names) chapters.push((await import(pathToFileURL(join(contentDir, n)).href)).default);
  const handoutPath = join(contentDir, 'handout.mjs');
  if (!existsSync(handoutPath)) throw new Error(`missing ${handoutPath}`);
  const handout = (await import(pathToFileURL(handoutPath).href)).default;
  return { chapters, handout };
}
export function validateAll({ chapters, handout }) {
  const errors = [];
  for (const c of chapters) { const r = validate(c, { allowedFiles: ALLOW_LIST }); if (!r.ok) errors.push(...r.errors.map((e) => `${c && c.id ? c.id : 'chapter'}: ${e}`)); }
  const hr = validateHandout(handout);
  if (!hr.ok) errors.push(...hr.errors);
  if (errors.length) throw new Error(`content is invalid:\n  ${errors.join('\n  ')}`);
}

// ---------------------------------------------------------------------------------------------
// Page data (window.HW_PAGE): only what the runtime needs, never the prose
// ---------------------------------------------------------------------------------------------
export function pageData(content, handout, assets) {
  const workspaces = collectWorkspaces(content).map((w) => {
    const out = { id: w.id, tool: w.tool, stepLabel: w.stepLabel, exerciseId: w.exerciseId };
    if (w.tool === 'terminal') out.command = w.command;
    if (w.tool === 'python') out.snippet = w.snippet;
    if (w.tool === 'sql' && w.starter) out.starter = w.starter;
    if (w.optional) out.optional = true;
    return out;
  });
  return {
    id: content.id,
    chapter: content.chapter,
    version: handout.version,
    primaryDb: content.primaryDb,
    seedDb: content.seedDb || null,
    workspaces,
    files: assets.files,
    cdn: { sqljs: assets.cdn.sqljs, pyodide: assets.cdn.pyodide },
    pythonStarter: content.pythonStarter,
    confirmTexts: content.confirmTexts,
    // the short UI strings that differ per chapter (see README "Content schema"); every key is always present
    messages: {
      noDb: (content.messages && content.messages.noDb) || NO_DB_DEFAULT,
      afterReset: (content.messages && content.messages.afterReset) || afterResetDefault(content),
      wrongName: (content.messages && content.messages.wrongName) || H.WRONG_NAME_ADVICE,
      sideDbs: content.messages && content.messages.sideDbs ? { ...content.messages.sideDbs } : {},
      // Optional: turns the "no database yet" line into one button that runs this chapter's import for the
      // student. null on chapters whose database is created by their own SQL or seeded from the starter file.
      noDbAction: content.messages && content.messages.noDbAction
        ? { label: content.messages.noDbAction.label, ws: content.messages.noDbAction.ws }
        : null,
    },
    exportName: content.exportName || H.exportFileName(content.chapter),
  };
}

// ---------------------------------------------------------------------------------------------
// Rendering (static prose is rendered here, at build time)
// ---------------------------------------------------------------------------------------------
const esc = escapeHtml;
const isNumericLabel = (label) => /^\d+[a-z]?$/i.test(label);
const stepLabelText = (label) => (isNumericLabel(label) ? label : label.charAt(0).toUpperCase() + label.slice(1));

export function renderChips(ws) {
  if (!ws.expect || !ws.expect.length) return '';
  // a named list, not a named generic (ARIA prohibits aria-label on a plain div)
  return `<div class="expect" role="list" aria-label="What to expect">${ws.expect.map((c) => `<span role="listitem">${esc(c)}</span>`).join('')}</div>`;
}
// "step 5a" for numeric labels, "the notice step" for word labels — used in accessible names so the many
// identical-looking buttons (Run SQL, Clear, Put this command…) are distinguishable in a screen reader's list.
const stepName = (label) => (isNumericLabel(String(label)) ? `step ${label}` : `the ${String(label)} step`);
// A second box in the same step (the optional s2-37-4b) gets its own accessible name, so "Run SQL for step 4"
// never names two buttons on one page.
const boxName = (ws, step) => (ws.optional ? `the optional box in ${stepName(step.label)}` : stepName(step.label));
// "the step 1 command" / "the explore step code": the Put-this… buttons refer to the page's single Terminal / Python
// cell, never to a second box, so their names never carry the optional-box wording.
const refName = (label) => (isNumericLabel(String(label)) ? `the step ${label}` : `the ${String(label)} step`);
// The visible label: the content author's `label` when given, else the generic "SQL for step N" / "Your answer for step N".
export function workspaceLabel(ws, step) {
  if (ws.label) return String(ws.label);
  const numeric = isNumericLabel(String(step.label));
  if (ws.tool === 'sql') return numeric ? `${ws.optional ? 'Optional SQL' : 'SQL'} for step ${step.label}` : (ws.optional ? 'Optional SQL' : 'SQL');
  return numeric ? `Your answer for step ${step.label}` : 'Your answer';
}
// The print stylesheet shows this mirror instead of the textarea (runtime.js fills it at beforeprint): a <pre>
// re-wraps at print width and fragments across pages, a form control does neither.
const printMirror = (id) => `<pre class="print-text" data-print-for="${id}" aria-hidden="true"></pre>`;
export function renderWorkspace(rawWs, step) {
  // a workspace is optional when it or its step is (collectWorkspaces() merges the flags the same way)
  const ws = { ...rawWs, optional: !!(rawWs.optional || step.optional) };
  const id = esc(ws.id);
  const name = esc(boxName(ws, step));
  const chips = renderChips(ws);
  switch (ws.tool) {
    case 'sql':
      return `${chips}<div class="ws ws-sql${ws.optional ? ' is-optional' : ''}" id="ws-${id}" data-ws="${id}" data-tool="sql"${ws.optional ? ' data-optional="true"' : ''}>` +
        `<label class="ws-label" for="${id}">${esc(workspaceLabel(ws, step))}</label>` +
        `<textarea id="${id}" class="editor sql-editor" data-ws-text spellcheck="false" placeholder="${esc(ws.placeholder != null ? ws.placeholder : `-- ${step.label}`)}">${esc(ws.starter || '')}</textarea>${printMirror(id)}` +
        `<div class="ws-actions"><button type="button" class="btn run" data-action="run-sql" data-ws="${id}" data-engine-button aria-label="Run SQL for ${name}">Run SQL</button>` +
        `<button type="button" class="btn ghost" data-action="clear-sql" data-ws="${id}" aria-label="Clear the SQL for ${name}">Clear</button><span class="shortcut">Ctrl/⌘ + Enter runs</span></div>` +
        `<div class="output" id="out-${id}" data-output="${id}" data-state="idle" aria-live="polite"></div></div>`;
    case 'text':
      return `${chips}<div class="ws ws-text${ws.optional ? ' is-optional' : ''}" id="ws-${id}" data-ws="${id}" data-tool="text"${ws.optional ? ' data-optional="true"' : ''}>` +
        `<label class="ws-label" for="${id}">${esc(workspaceLabel(ws, step))}</label>` +
        `<textarea id="${id}" class="editor text-editor" data-ws-text rows="${ws.rows || 4}" style="--rows:${Number(ws.rows) || 4}" placeholder="${esc(ws.placeholder || 'Write your answer here')}"></textarea>${printMirror(id)}</div>`;
    case 'terminal':
      return `${chips}<div class="ws ws-ref ws-terminal" id="${id}" data-ws="${id}" data-tool="terminal">` +
        `<span class="ws-label">In the Terminal, run</span><pre class="cmd"><code>${esc(ws.command)}</code></pre>` +
        `<button type="button" class="btn ghost" data-action="put-terminal" data-ws="${id}" aria-label="Put ${esc(refName(step.label))} command in the terminal">Put this command in the terminal</button></div>`;
    case 'python':
      return `${chips}<div class="ws ws-ref ws-python" id="${id}" data-ws="${id}" data-tool="python">` +
        `<span class="ws-label">In the Python cell</span><pre class="snippet"><code>${esc(ws.snippet)}</code></pre>` +
        `<button type="button" class="btn ghost" data-action="put-python" data-ws="${id}" aria-label="Put ${esc(refName(step.label))} code in the Python cell">Put this code in the Python cell</button></div>`;
    default:
      throw new Error(`unknown tool ${ws.tool}`);
  }
}
export function renderStep(step, exercise) {
  const label = String(step.label);
  const word = !isNumericLabel(label);
  const ws = (step.workspaces || []).map((w) => renderWorkspace(w, step)).join('');
  return `<li class="step${step.optional ? ' is-optional' : ''}" id="step-${esc(exercise.id)}-${esc(label)}" data-step="${esc(label)}">` +
    // visually-hidden "Step " is read by every screen reader; aria-label on a plain span is not
    `<span class="step-label${word ? ' is-word' : ''}">${word ? '' : '<span class="sr-only">Step </span>'}${esc(stepLabelText(label))}</span>` +
    `<div class="step-body">${step.html || ''}${ws}</div></li>`;
}
export function renderExercise(exercise) {
  const id = esc(exercise.id);
  const kindLabel = exercise.kind === 'spreadsheet' ? 'Spreadsheet exercise' : 'Database exercise';
  const mainSteps = exercise.steps.filter((s) => String(s.label) !== 'notice');
  const noticeSteps = exercise.steps.filter((s) => String(s.label) === 'notice');
  let html = `<section class="card exercise" id="ex-${id}" data-exercise="${id}" data-kind="${esc(exercise.kind)}" aria-labelledby="ex-${id}-title">` +
    `<span class="section-label">${kindLabel} · ${id}</span><h2 id="ex-${id}-title">${esc(exercise.title)}</h2>` +
    `<h3>Scenario</h3>${exercise.scenario}<h3>Data</h3>${exercise.data}` +
    `<h3>Steps</h3><ol class="steps">${mainSteps.map((s) => renderStep(s, exercise)).join('')}</ol>` +
    `<h3>Submit</h3>${exercise.submit}`;
  if (exercise.notice || noticeSteps.length) {
    html += `<h3>One thing to notice</h3>${exercise.notice || ''}`;
    if (noticeSteps.length) html += `<ol class="steps">${noticeSteps.map((s) => renderStep(s, exercise)).join('')}</ol>`;
  }
  return `${html}</section>`;
}
function fileTree(paths) {
  const root = { dirs: new Map(), files: [] };
  for (const p of paths) {
    const parts = p.split('/');
    let node = root;
    for (const seg of parts.slice(0, -1)) { if (!node.dirs.has(seg)) node.dirs.set(seg, { dirs: new Map(), files: [] }); node = node.dirs.get(seg); }
    node.files.push(p);
  }
  return root;
}
export function renderFiles(content, assets) {
  const shown = new Set(content.filesShown || []);
  const render = (node) => {
    let out = '<ul>';
    for (const [name, child] of [...node.dirs.entries()].sort()) out += `<li><span class="file-folder">${esc(name)}/</span>${render(child)}</li>`;
    for (const p of node.files.sort()) {
      const size = assets.fileBytes[p] ? H.humanBytes(assets.fileBytes[p].length) : '';
      const viewable = TEXT_FILE.test(p) && basename(p) === 'load_data.py';
      out += `<li><div class="file-row${shown.has(p) ? ' is-current' : ''}" data-file="${esc(p)}"><span class="file-name">${esc(basename(p))}</span><span class="file-size">${esc(size)}</span>` +
        `<span class="file-actions"><button type="button" class="btn ghost small" data-action="download-file" data-path="${esc(p)}" aria-label="Download the starter file ${esc(basename(p))}">Download</button>` +
        (viewable ? `<button type="button" class="btn ghost small" data-action="view-file" data-path="${esc(p)}" aria-expanded="false" aria-label="View ${esc(basename(p))}">View</button>` : '') +
        `</span></div>${viewable ? `<pre class="file-view" data-path="${esc(p)}" hidden></pre>` : ''}</li>`;
    }
    return `${out}</ul>`;
  };
  return `<ul class="file-tree" id="files"><li><span class="file-folder">${esc(WEEK_FOLDER)}/</span>${render(fileTree(Object.keys(assets.files)))}</li></ul>`;
}
export function renderDatabasePanel(content, assets) {
  const primary = H.basename(content.primaryDb);
  return `<section class="card db-panel" id="database" aria-labelledby="database-title">` +
    `<span class="section-label">Database panel</span><h2 id="database-title">Your database: <span id="dbName">${esc(primary)}</span></h2>` +
    `<div class="engine" id="engineStrip">` +
    `<div class="engine-item" id="engineSqlite" data-state="loading"><span class="engine-dot" aria-hidden="true"></span><strong>Loading SQLite…</strong><span class="engine-detail"></span><button type="button" class="btn ghost small" data-engine-button hidden>Retry SQLite</button></div>` +
    `<div class="engine-item" id="enginePython" data-state="idle"><span class="engine-dot" aria-hidden="true"></span><strong>Python not loaded yet</strong><span class="engine-detail"></span><button type="button" class="btn ghost small" data-engine-button hidden>Retry Python</button></div>` +
    `</div>` +
    `<div class="db-select-row" id="dbSelectRow" hidden><label for="dbSelect">Database the SQL boxes use</label><select id="dbSelect"></select></div>` +
    `<p class="notice warn" id="dbNameNotice" role="status" hidden></p>` +
    `<h3>Tables</h3><div class="db-tables" id="dbTables"></div><div class="db-detail" id="dbDetail"></div>` +
    `<h3>Terminal</h3><div class="terminal" id="terminal" data-state="idle">` +
    `<div class="transcript" id="terminalTranscript" role="log" aria-live="polite" aria-label="Terminal transcript"></div>` +
    `<div class="term-status" id="terminalStatus" aria-live="polite"></div>` +
    `<div class="term-row"><span class="prompt" aria-hidden="true">$</span><label class="sr-only" for="terminalInput">Terminal command</label>` +
    `<input id="terminalInput" type="text" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="python load_data.py …">` +
    `<button type="button" class="btn run" id="terminalRunBtn" data-engine-button>Run</button></div></div>` +
    `<h3>Python</h3><div class="ws ws-pycell" id="pythonCell"><label class="ws-label" for="pythonCode">Python cell</label>` +
    `<textarea id="pythonCode" class="editor code-editor" data-ws-text spellcheck="false">${esc(content.pythonStarter)}</textarea>${printMirror('pythonCode')}` +
    `<div class="ws-actions"><button type="button" class="btn run" id="pythonRunBtn" data-engine-button>Run Python</button><button type="button" class="btn ghost" id="pythonClearBtn">Clear</button><span class="shortcut">Ctrl/⌘ + Enter runs</span></div>` +
    `<div class="output" id="pythonOutput" data-output="python" data-state="idle" aria-live="polite"></div></div>` +
    `<h3>Files</h3><p class="mini">The same files as the starter folder. Download any of them; <code>load_data.py</code> can also be read here.</p>${renderFiles(content, assets)}` +
    `<div class="danger-zone" id="startOver"><h3>Start over</h3><p>Both buttons ask first. Download your database and Export my work before using them if you want to keep anything.</p>` +
    `<div class="danger-actions"><button type="button" class="btn danger" id="resetDbBtn" data-engine-button>Reset database</button><button type="button" class="btn danger" id="clearWorkBtn" data-engine-button>Clear my work</button></div></div>` +
    `</section>`;
}
export function renderGrading(handout) {
  return `<section class="card" id="grading" aria-labelledby="grading-title"><span class="section-label">Grading</span><h2 id="grading-title">How each exercise is graded</h2>` +
    gradingTable(handout.grading) + (handout.gradingNotes || '') + `</section>`;
}
// "Getting unstuck": the chapter's own entries first, then the handout's shared browser-edition entries.
export function unstuckHtml(...sources) {
  const parts = [];
  const items = [];
  for (const src of sources.map(normaliseUnstuck)) {
    if (src == null) continue;
    if (typeof src === 'string') { if (items.length) { parts.push(`<dl class="unstuck">${items.splice(0).join('')}</dl>`); } parts.push(src); }
    else for (const e of src) items.push(`<dt>${e.q}</dt><dd>${e.a}</dd>`);
  }
  if (items.length) parts.push(`<dl class="unstuck">${items.join('')}</dl>`);
  return parts.join('');
}
export function renderUnstuck(content, handout) {
  const body = unstuckHtml(content.unstuck, handout.unstuck);
  if (!body) return '';
  return `<section class="card" id="unstuck" aria-labelledby="unstuck-title"><span class="section-label">Help</span><h2 id="unstuck-title">Getting unstuck</h2>${body}</section>`;
}
export function renderHero(content) {
  const n = content.exercises.length;
  return `<header class="hero"><div class="wrap"><span class="eyebrow">Week ${esc(content.week)} · Chapter ${esc(content.chapter)}</span><h1>${esc(content.title)}</h1>` +
    `<div class="lede">${content.lede}</div>` +
    `<div class="chips" role="list" aria-label="At a glance"><span class="chip" role="listitem">${n} ${n === 1 ? 'exercise' : 'exercises'}</span><span class="chip" role="listitem">100 points each</span><span class="chip" role="listitem">runs in your browser</span><span class="chip" role="listitem">nothing is uploaded</span></div>` +
    // print only (the toolbar's name field does not print); runtime.js fills it at beforeprint
    `<p class="print-name">Student: <span id="printName"></span></p></div></header>`;
}
export function renderToolbar(content) {
  const primary = H.basename(content.primaryDb);
  return `<div class="toolbar" role="toolbar" aria-label="Page tools"><div class="wrap toolbar-inner">` +
    `<label class="name-field">Student name <input type="text" id="studentName" autocomplete="name" placeholder="Your name"></label>` +
    `<span class="save-status" id="saveStatus" role="status" aria-live="polite">Your work saves in this browser.</span>` +
    `<button type="button" class="btn ghost" id="downloadDbBtn">Download ${esc(primary)}</button>` +
    `<button type="button" class="btn ghost" id="openDbBtn" data-engine-button>Open a .db file…</button><input type="file" id="openDbInput" accept=".db,.sqlite,.sqlite3,application/vnd.sqlite3,application/x-sqlite3" hidden aria-label="Choose a .db file">` +
    `<button type="button" class="btn" id="exportBtn" data-engine-button>Export my work</button>` +
    `<button type="button" class="btn ghost" id="printBtn">Print / Save PDF</button></div></div>`;
}
export function scriptTag(entry) {
  return `<script src="${esc(entry.url)}" integrity="${esc(entry.integrity)}" crossorigin="anonymous"></script>`;
}

export function assemblePage(content, handout, assets) {
  const data = pageData(content, handout, assets);
  const spreadsheets = content.exercises.filter((e) => e.kind === 'spreadsheet');
  const databases = content.exercises.filter((e) => e.kind === 'database');
  const title = `Week ${content.week} · Chapter ${content.chapter} · ${content.title}`;
  const body =
    `<a class="skip" href="#main">Skip to main content</a>\n` +
    `<noscript><p class="no-script"><b>The SQL and Python tools on this page need JavaScript.</b> The exercise text below is complete and can still be read and printed.</p></noscript>\n` +
    renderHero(content) + '\n' + renderToolbar(content) + '\n' +
    `<main id="main" tabindex="-1"><div class="wrap">\n` +
    `<section class="card how" id="how" aria-labelledby="how-title"><span class="section-label">Before you start</span><h2 id="how-title">How this page works</h2><p>${esc(HOW_TEXT)}</p></section>\n` +
    spreadsheets.map(renderExercise).join('\n') + '\n' +
    renderDatabasePanel(content, assets) + '\n' +
    databases.map(renderExercise).join('\n') + '\n' +
    renderGrading(handout) + '\n' + renderUnstuck(content, handout) + '\n' +
    `</div></main>\n` +
    `<footer class="page-foot"><div class="wrap">${esc(footerText(content, handout))}</div></footer>\n`;
  return `<!DOCTYPE html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1">\n` +
    `<title>${esc(title)}</title>\n<meta name="description" content="${esc(`Week ${content.week} chapter ${content.chapter} application exercises: a spreadsheet exercise in Excel and a database exercise that runs SQLite and Python in the browser.`)}">\n` +
    // the second <style> feeds the print stylesheet's running footer (@page @bottom-center{content:var(--print-foot)})
    `<style>\n${assets.css}\n</style>\n<style>:root{--print-foot:${cssString(footerText(content, handout))}}</style>\n${scriptTag(assets.cdn.sqljs.loader)}\n${scriptTag(assets.cdn.pyodide.loader)}\n</head>\n<body>\n${body}` +
    `<script>window.HW_PAGE = ${serializePageData(data)};</script>\n<script>\n${assets.helpersJs}\n</script>\n<script>\n${assets.runtimeJs}\n</script>\n</body>\n</html>\n`;
}

// ---------------------------------------------------------------------------------------------
// Handout print HTML (→ PDF by make-pdf.mjs)
// ---------------------------------------------------------------------------------------------
export const PRINT_CSS = `
@page{size:Letter; margin:.6in}
*,*::before,*::after{box-sizing:border-box}
html{color-scheme:light}
body{margin:0; background:#fff; color:#000; font:10.5pt/1.5 -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif}
h1{font-size:22pt; margin:0 0 4pt; letter-spacing:-.01em} h2{font-size:15pt; margin:18pt 0 6pt; border-bottom:2px solid #000; padding-bottom:3pt} h3{font-size:12pt; margin:12pt 0 4pt} h4{font-size:10.5pt; margin:9pt 0 3pt; text-transform:uppercase; letter-spacing:.06em}
p{margin:0 0 7pt} ul,ol{margin:0 0 7pt; padding-left:18pt} li{margin:2pt 0}
code,pre{font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace; font-size:9.5pt} code{background:#f1f1f1; padding:0 2pt}
pre{background:#f4f4f4; border:1px solid #bbb; padding:6pt 8pt; white-space:pre-wrap; overflow-wrap:anywhere; margin:4pt 0 7pt}
a{color:#000}
.subtitle{color:#333; margin:0 0 14pt; font-size:11pt}
.front,.back{margin-bottom:12pt}
.exercise{break-inside:avoid-page; margin:0 0 14pt}
.exercise h3{break-after:avoid}
.chips{color:#333; font-size:9.5pt; margin:0 0 4pt} .chips span::before{content:"expect: "; font-weight:700}
ol.steps{list-style:none; padding:0; margin:0 0 8pt}
ol.steps > li{display:grid; grid-template-columns:34pt 1fr; gap:6pt; margin:0 0 6pt; break-inside:avoid}
.step-label{font-weight:800; font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace}
.answer-box{border:1px solid #888; min-height:54pt; margin:4pt 0 8pt}
.ws-note{color:#333; font-size:9.5pt; margin:2pt 0 6pt}
.tbl-wrap{margin:4pt 0 8pt} table.tbl{width:100%; border-collapse:collapse; font-size:9.5pt}
table.tbl caption{text-align:left; font-weight:700; padding:2pt 0 3pt}
table.tbl th,table.tbl td{border:1px solid #888; padding:3pt 5pt; text-align:left; vertical-align:top}
table.tbl thead th{background:#eee}
dl.unstuck dt{font-weight:700; margin-top:6pt} dl.unstuck dd{margin:0 0 3pt 0}
footer{margin-top:16pt; padding-top:6pt; border-top:1px solid #888; font-size:9pt; color:#333}
`;
export function renderStepPrint(step, exercise) {
  const label = String(step.label);
  let ws = '';
  for (const w of step.workspaces || []) {
    const chips = w.expect && w.expect.length ? `<p class="chips">${w.expect.map((c) => `<span>${esc(c)}</span>`).join(' · ')}</p>` : '';
    const optional = !!(w.optional || step.optional);
    if (w.tool === 'sql') ws += `${chips}<p class="ws-note">${optional ? 'Optional second SQL box' : 'SQL box'} on the web page (step ${esc(label)}).</p>`;
    else if (w.tool === 'text') ws += `${chips}${w.label ? `<p class="ws-note">${esc(w.label)}</p>` : ''}<div class="answer-box" aria-hidden="true"></div>`;
    else if (w.tool === 'terminal') ws += `${chips}<pre>$ ${esc(w.command)}</pre>`;
    else if (w.tool === 'python') ws += `${chips}<pre>${esc(w.snippet)}</pre>`;
  }
  return `<li id="print-${esc(exercise.id)}-${esc(label)}"><span class="step-label">${esc(stepLabelText(label))}</span><div>${step.html || ''}${ws}</div></li>`;
}
export function renderExercisePrint(exercise) {
  const main = exercise.steps.filter((s) => String(s.label) !== 'notice');
  const notice = exercise.steps.filter((s) => String(s.label) === 'notice');
  let html = `<section class="exercise"><h3>Exercise ${esc(exercise.id)} · ${esc(exercise.title)}</h3>` +
    `<h4>Scenario</h4>${exercise.scenario}<h4>Data</h4>${exercise.data}<h4>Steps</h4><ol class="steps">${main.map((s) => renderStepPrint(s, exercise)).join('')}</ol><h4>Submit</h4>${exercise.submit}`;
  if (exercise.notice || notice.length) html += `<h4>One thing to notice</h4>${exercise.notice || ''}${notice.length ? `<ol class="steps">${notice.map((s) => renderStepPrint(s, exercise)).join('')}</ol>` : ''}`;
  return `${html}</section>`;
}
// Print order: front matter → chapters (each with its own Getting-unstuck entries, if any) → back matter ("What to
// hand in") → "How each exercise is graded" (the same gradingTable() + gradingNotes the pages render) → the shared
// Getting unstuck list → footer. handout.back must not render the grading table itself.
export function assemblePrint(chapters, handout) {
  const body =
    `<h1>Week ${esc(chapters[0].week)} Application Exercises</h1><p class="subtitle">${esc(chapters[0].title)} · version ${esc(handout.version)}</p>` +
    `<section class="front">${handout.front}</section>` +
    chapters.map((c) => `<section class="chapter"><h2>Chapter ${esc(c.chapter)}</h2><div class="lede">${c.lede}</div>${c.exercises.map(renderExercisePrint).join('')}${c.unstuck != null ? `<h3>Getting unstuck · Chapter ${esc(c.chapter)}</h3>${unstuckHtml(c.unstuck)}` : ''}</section>`).join('') +
    `<section class="back">${handout.back}</section>` +
    `<section class="grading"><h2>How each exercise is graded</h2>${gradingTable(handout.grading)}${handout.gradingNotes || ''}</section>` +
    (handout.unstuck != null ? `<section class="unstuck"><h2>Getting unstuck</h2>${unstuckHtml(handout.unstuck)}</section>` : '') +
    `<footer>Week ${esc(chapters[0].week)} Application Exercises · version ${esc(handout.version)}</footer>`;
  return `<!DOCTYPE html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n<title>Week ${esc(chapters[0].week)} Application Exercises</title>\n<style>${PRINT_CSS}</style>\n</head>\n<body>\n${body}\n</body>\n</html>\n`;
}

// ---------------------------------------------------------------------------------------------
// Zips
// ---------------------------------------------------------------------------------------------
export function starterZipEntries({ pages, assets, pdfBytes }) {
  const entries = [];
  for (const rel of ALLOW_LIST) entries.push({ name: `${WEEK_FOLDER}/${rel}`, data: assets.fileBytes[rel] });
  for (const p of pages) entries.push({ name: `${WEEK_FOLDER}/${p.name}`, data: Buffer.from(p.html, 'utf8') });
  entries.push({ name: `${WEEK_FOLDER}/${PDF_NAME}`, data: pdfBytes });
  return entries;
}
function walkDir(dir, prefix = '') {
  const out = [];
  for (const name of readdirSync(dir).sort()) {
    if (name === '.DS_Store' || name.startsWith('._')) continue;
    const abs = join(dir, name);
    const rel = prefix ? `${prefix}/${name}` : name;
    if (statSync(abs).isDirectory()) out.push(...walkDir(abs, rel)); else out.push({ rel, abs });
  }
  return out;
}
export function instructorZipEntries(instructorDir = DEFAULTS.instructorDir) {
  const entries = walkDir(instructorDir).map(({ rel, abs }) => ({ name: `instructor/${rel}`, data: readFileSync(abs) }));
  for (const e of entries) if (/week-1-chapter-\d+\.html$/i.test(e.name)) throw new Error(`the instructor zip must never contain a student page (${e.name})`);
  return entries;
}

// ---------------------------------------------------------------------------------------------
// Orchestration
// ---------------------------------------------------------------------------------------------
export async function buildAll(opts = {}) {
  const o = { ...DEFAULTS, printOut: null, noZip: false, zipOnly: false, quiet: false, ...opts };
  const assets = loadAssets({ srcDir: o.srcDir || SRC_DIR, weekDir: o.weekDir });
  const content = await loadContent(o.contentDir);
  validateAll(content);
  const pages = content.chapters.map((c) => ({ name: pageName(c.chapter), html: assemblePage(c, content.handout, assets) }));
  const printHtml = assemblePrint(content.chapters, content.handout);
  const written = [];
  if (!o.zipOnly) {
    mkdirSync(o.outDir, { recursive: true });
    for (const p of pages) { const abs = join(o.outDir, p.name); writeFileSync(abs, p.html); written.push(abs); }
    if (o.printOut) { mkdirSync(dirname(o.printOut), { recursive: true }); writeFileSync(o.printOut, printHtml); written.push(o.printOut); }
  }
  const zips = [];
  if (!o.noZip) {
    const pdfPath = join(o.weekDir, PDF_NAME);
    if (!existsSync(pdfPath)) throw new Error(`${pdfPath} is missing — run make-pdf.mjs first (or pass --no-zip)`);
    const starter = createZip(starterZipEntries({ pages, assets, pdfBytes: readFileSync(pdfPath) }));
    const instructor = createZip(instructorZipEntries(o.instructorDir));
    mkdirSync(o.zipDir, { recursive: true });
    for (const [name, buf] of [[STARTER_ZIP, starter], [INSTRUCTOR_ZIP, instructor]]) { const abs = join(o.zipDir, name); writeFileSync(abs, buf); zips.push(abs); written.push(abs); }
  }
  if (!o.quiet) for (const w of written) console.log(`wrote ${w}`);
  return { pages, printHtml, written, zips, chapters: content.chapters, handout: content.handout, assets };
}

export function parseArgs(argv) {
  const o = {};
  const take = (i) => { const v = argv[i + 1]; if (v === undefined || v.startsWith('--')) throw new Error(`${argv[i]} needs a value`); return v; };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    const eq = a.indexOf('=');
    const key = eq > 0 ? a.slice(0, eq) : a;
    const val = () => (eq > 0 ? a.slice(eq + 1) : take(i++));
    switch (key) {
      case '--content-dir': o.contentDir = resolve(val()); break;
      case '--out-dir': o.outDir = resolve(val()); break;
      case '--week-dir': o.weekDir = resolve(val()); break;
      case '--instructor-dir': o.instructorDir = resolve(val()); break;
      case '--zip-dir': o.zipDir = resolve(val()); break;
      case '--print-out': o.printOut = resolve(val()); break;
      case '--no-zip': o.noZip = true; break;
      case '--zip-only': o.zipOnly = true; break;
      case '--quiet': o.quiet = true; break;
      case '--help': case '-h': o.help = true; break;
      default: throw new Error(`unknown option ${a}`);
    }
  }
  return o;
}

async function main() {
  let opts;
  try { opts = parseArgs(process.argv.slice(2)); } catch (e) { console.error(e.message); process.exit(2); }
  if (opts.help) {
    console.log('usage: node build.mjs [--content-dir D] [--out-dir D] [--week-dir D] [--instructor-dir D] [--zip-dir D] [--print-out FILE] [--no-zip] [--zip-only] [--quiet]');
    return;
  }
  try { await buildAll(opts); }
  catch (e) { console.error(`build failed: ${e.message}`); process.exit(1); }
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) main();
