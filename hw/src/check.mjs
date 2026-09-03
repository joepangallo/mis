#!/usr/bin/env node
// check.mjs — zero-dependency static checks for the Week 1 homework build.
//
//   node hw/src/check.mjs                 # checks hw/Week 1/*.html, the two zips in hw/, content, instructor scripts
//   node hw/src/check.mjs --pages-dir DIR --zip-dir DIR --content-dir DIR --instructor-dir DIR [--no-zip] [--json FILE] [--quiet]
//
// What it proves (see README "Verification matrix"):
//   freshness   the three pages rebuild byte-identically to what is on disk; building twice is deterministic
//   zips        listing + per-entry CRC against the sources (pages rebuilt, files on disk, the PDF on disk); no .DS_Store;
//               the instructor zip never carries a student page
//   hygiene     no school name / course code / local path / "answer key" / "instructor" / pip reference on any page or the print HTML
//   DOM rules   runtime.js + helpers.js contain none of innerHTML/outerHTML/insertAdjacentHTML/document.write/eval(/new Function(
//               nor the other code-generation / HTML-string APIs (Function(, DOMParser, createContextualFragment, srcdoc,
//               setAttribute('on…, string setTimeout/setInterval, javascript:) nor any transport (WebSocket, EventSource,
//               sendBeacon, XMLHttpRequest, Worker, importScripts) — a token scan; computed property access is out of scope
//   HW_PAGE     inline JSON has no literal "<", only the allowed keys, every embedded file decodes to the file on disk,
//               the path set equals the allow-list
//   CDN         exactly two external <script src> tags, equal to cdn.json with integrity + crossorigin; no other external
//               URL except the CDN bases and the explicit help links — protocol-relative (//host/x) included, because
//               on a file:// page it resolves to file://host/x
//   wasm SRI    runtime.js still fetches the sql.js wasm with the sha384 from cdn.json (no <script integrity> covers
//               it), and that sha384 is a well-formed SRI value
//   a11y        lang, one h1, sane heading order, labelled inputs, type=button, aria-live outputs, captions + th scope, skip link,
//               no two boxes in one step with the same visible label, no two buttons on a page with the same accessible name
//   PDF         the handout PDF on disk (the same bytes the starter zip carries) put through make-pdf.mjs's OWN
//               validators — page size, every exercise title, every step's opening text, every chip, terminal
//               command and Python snippet, Getting-unstuck, grading rows, version, hygiene, glyphs, sparse pages.
//               A content edit therefore fails here until make-pdf.mjs has been re-run (visible WARN, not a
//               failure, when poppler is absent)
//   ids         every workspace id in content appears exactly once as an element id (and once as its output id)
//   contract    solutions-chN.sql @step blocks ⇄ expected/chapter-N.json actions ⇄ content workspace ids (also a unit
//               test): every terminal command AND every python snippet / pythonStarter is driven verbatim, and every
//               `expect` key is one a reader actually looks at (a typo would make the action assert nothing)
// The parent repo's "N points" rule is deliberately NOT applied to these pages.
// Exit codes: 0 all checks pass · 1 at least one check failed · 2 environment (content missing, build threw, unreadable inputs).
// Every check function is exported; main() runs only when this file is invoked directly.
import { readFileSync, existsSync, readdirSync, statSync, writeFileSync, mkdirSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { crc32 } from 'node:zlib';
import { hygieneFindings, tableMarkupFindings, collectWorkspaces } from './schema.mjs';
import { listZip } from './zip.mjs';
import {
  SRC_DIR, DEFAULTS, ALLOW_LIST, PDF_NAME, STARTER_ZIP, INSTRUCTOR_ZIP, pageName,
  loadAssets, loadContent, validateAll, assemblePage, assemblePrint, starterZipEntries, instructorZipEntries,
} from './build.mjs';
import { validatePdf } from './make-pdf.mjs';
import './helpers.js';

// The spec's six DOM tokens …
export const FORBIDDEN_DOM_TOKENS = ['innerHTML', 'outerHTML', 'insertAdjacentHTML', 'document.write', 'eval(', 'new Function('];
// … plus the other ways of turning a string into markup or code (a RegExp entry is tested per line) …
export const FORBIDDEN_CODEGEN_TOKENS = ['Function(', 'createContextualFragment', 'DOMParser', 'srcdoc', /setAttribute\(\s*['"]on/i, "setTimeout('", 'setTimeout("', "setInterval('", 'setInterval("', 'javascript:'];
// … and every transport the page must not open (the request allow-list in verify-browser.mjs is the runtime half).
export const FORBIDDEN_NETWORK_TOKENS = ['new WebSocket(', 'EventSource(', 'sendBeacon(', 'XMLHttpRequest(', 'new Worker(', 'SharedWorker(', 'importScripts(', 'serviceWorker.register'];
export const HW_PAGE_KEYS = ['id', 'chapter', 'version', 'primaryDb', 'seedDb', 'workspaces', 'files', 'cdn', 'pythonStarter', 'confirmTexts', 'messages', 'exportName'];
export const HW_PAGE_WS_KEYS = ['id', 'tool', 'stepLabel', 'exerciseId', 'command', 'snippet', 'starter', 'optional'];
// Namespaces are not fetched; everything else external must be a CDN base or an explicit help link.
export const NAMESPACE_URLS = ['http://www.w3.org/2000/svg', 'http://www.w3.org/1999/xhtml'];
export const ACTION_KINDS = ['terminal', 'sql', 'tables', 'downloadDb', 'export', 'reload', 'python', 'reset', 'xssCanary', 'probe', 'print', 'cancel', 'openDb', 'clear', 'offline'];
export const CANCEL_TARGETS = ['reset', 'clear', 'openDb'];
export const OPEN_DB_KINDS = ['sqlite', 'text'];
// {"probe": [...]}: spec'd runtime behaviours with no other proof, run as hard-coded SQL in a scratch box.
export const PROBE_KINDS = ['rowCap', 'cellCap', 'emptyBox', 'openTransaction', 'syntaxError'];
// Every `expect` key verify-browser.mjs actually READS, per action kind. A key outside this set is a typo, and a
// typo makes the action assert nothing at all — so it is an error here, not a silently ignored extra.
export const EXPECT_KEYS = {
  terminal: ['stdoutIncludes', 'stderrIncludes', 'exit'],
  sql: ['results', 'changed', 'errorIncludes', 'messageIncludes', 'tables', 'structure'],
  python: ['stdoutIncludes', 'stderrIncludes', 'errorIncludes', 'notesInclude', 'notesExclude', 'tables', 'structure'],
  tables: [],
  downloadDb: ['sqlite3'],
  export: ['includes', 'excludes'],
  reload: ['restored', 'tables', 'structure'],
  reset: ['tables', 'structure'],
  clear: ['tables', 'structure'],
  openDb: ['statusIncludes', 'tables', 'structure'],
  cancel: [],
  probe: [],
  print: [],
  xssCanary: [],
  offline: [],
};
// The four list/scalar expect keys whose type verify-browser cannot police at runtime: a bare string handed to
// `for (const s of ex.notesInclude)` is iterated CHARACTER BY CHARACTER, which reduces the assertion to
// "the notes contain each letter" — a check that can never fail.
export const STRING_LIST_EXPECT_KEYS = ['notesInclude', 'notesExclude', 'messageIncludes'];
export const SRI_RE = /^sha384-[A-Za-z0-9+/]{64}$/;
// The sql.js wasm is the one CDN file no <script integrity> covers: runtime.js must fetch it itself with the
// sha384 from cdn.json (SPEC "Proven runtime facts"). These two shapes are what that fetch has to look like.
export const WASM_FETCH_RE = /fetch\(\s*([A-Za-z_$][\w$]*(?:\.[\w$]+)*\.wasm\.url)\s*,\s*\{([^{}]*)\}/;
export const WASM_INTEGRITY_OPT_RE = /(^|[,{\s])integrity\s*:\s*[A-Za-z_$][\w$]*(?:\.[\w$]+)*\.wasm\.integrity\s*(,|$)/;

// ---------------------------------------------------------------------------------------------
// Small pure helpers (unit-tested)
// ---------------------------------------------------------------------------------------------
export function domRuleFindings(source, label = 'source') {
  const out = [];
  const lines = String(source).split(/\r?\n/);
  for (const token of [...FORBIDDEN_DOM_TOKENS, ...FORBIDDEN_CODEGEN_TOKENS, ...FORBIDDEN_NETWORK_TOKENS]) {
    const hit = token instanceof RegExp ? (line) => token.test(line) : (line) => line.includes(token);
    lines.forEach((line, i) => { if (hit(line)) out.push(`${label}:${i + 1}: contains "${token instanceof RegExp ? token.source : token}"`); });
  }
  return out;
}

// The inline `window.HW_PAGE = {...};` script → { raw, data } (raw is the JSON text as written into the page).
export function extractPageData(html) {
  const m = /<script>window\.HW_PAGE = ([\s\S]*?);<\/script>/.exec(html);
  if (!m) throw new Error('window.HW_PAGE script not found');
  return { raw: m[1], data: JSON.parse(m[1]) };
}

// Protocol-relative references are invisible to a scheme-anchored scan and are NEVER safe here: on a file:// page
// `//host/x` resolves to `file://host/x`, i.e. an SMB/UNC fetch on Windows and a hard failure elsewhere. Matched in
// the two places a browser would follow one: a URL-bearing attribute and a CSS url().
export const PROTOCOL_RELATIVE_ATTRS = ['src', 'href', 'action', 'poster', 'data', 'srcset', 'formaction', 'cite', 'background'];
export function protocolRelativeUrls(text) {
  const out = new Set();
  const attr = new RegExp(`\\b(?:${PROTOCOL_RELATIVE_ATTRS.join('|')})\\s*=\\s*(?:"(//[^"]*)"|'(//[^']*)'|(//[^\\s">]+))`, 'gi');
  let m;
  while ((m = attr.exec(text))) out.add((m[1] ?? m[2] ?? m[3]).trim());
  const css = /url\(\s*(?:"(\/\/[^"]*)"|'(\/\/[^']*)'|(\/\/[^\s)]+))/gi;
  while ((m = css.exec(text))) out.add((m[1] ?? m[2] ?? m[3]).trim());
  return [...out].sort();
}
export function externalUrls(text) {
  const out = new Set();
  const re = /(?:https?|wss?|ftp):\/\/[^\s"'<>()\\]+/g;
  let m;
  while ((m = re.exec(text))) out.add(m[0]);
  for (const u of protocolRelativeUrls(text)) out.add(u);
  return [...out].sort();
}

// runtime.js must still fetch the sql.js wasm with the sha384 from cdn.json, and that sha384 must be well formed.
// Deleting the `integrity` option leaves every other check in this file green: the two <script> tags are
// untouched, HW_PAGE.cdn still equals cdn.json, and the page still works — with an unverified 658 KB binary.
export function wasmIntegrityFindings(runtimeJs, cdn, label = 'runtime.js') {
  const out = [];
  const wasm = cdn && cdn.sqljs && cdn.sqljs.wasm;
  if (!wasm || typeof wasm !== 'object') out.push('cdn.json: sqljs.wasm is missing');
  else {
    if (!SRI_RE.test(String(wasm.integrity || ''))) out.push(`cdn.json: sqljs.wasm.integrity ${JSON.stringify(wasm.integrity)} is not a well-formed sha384 SRI value (sha384- + 64 base64 characters)`);
    if (!/^https:\/\/\S+\.wasm$/.test(String(wasm.url || ''))) out.push(`cdn.json: sqljs.wasm.url ${JSON.stringify(wasm.url)} is not an https .wasm URL`);
    if (String(wasm.url || '').indexOf(String((cdn.sqljs && cdn.sqljs.base) || '\u0000')) !== 0) out.push('cdn.json: sqljs.wasm.url is not under sqljs.base');
  }
  const src = String(runtimeJs);
  const m = WASM_FETCH_RE.exec(src);
  if (!m) out.push(`${label}: no fetch(<cdn>.sqljs.wasm.url, { … }) — the wasm must be fetched by the runtime, not located by sql.js (SPEC: pass initSqlJs({wasmBinary}))`);
  else if (!WASM_INTEGRITY_OPT_RE.test(m[2])) out.push(`${label}: the wasm fetch does not pass { integrity: <cdn>.sqljs.wasm.integrity } — options were { ${m[2].trim()} }`);
  // any OTHER fetch of the wasm (a retry path, a fallback) must carry integrity too
  for (const line of src.split(/\r?\n/).map((l, i) => ({ n: i + 1, text: l })).filter((l) => /fetch\(/.test(l.text) && /\.wasm\.url|\.wasm['"]?\s*\)/.test(l.text))) {
    if (!/integrity/.test(line.text)) out.push(`${label}:${line.n}: fetches the wasm without an integrity option: ${line.text.trim().slice(0, 120)}`);
  }
  if (/locateFile\s*:/.test(src)) out.push(`${label}: initSqlJs is given a locateFile option — sql.js would then fetch the wasm itself, unverified`);
  return out;
}
// The help links are allowed by host (sqlitebrowser.org, python.org — with or without "www."), the CDN by base URL.
function hostOf(url) { try { return new URL(url).hostname.replace(/^www\./, ''); } catch { return null; } }
export function isAllowedUrl(url, cdn) {
  if (/^\/\//.test(url)) return false;   // protocol-relative: always file://host on a file:// page
  const bases = [cdn.sqljs.base, cdn.pyodide.base];
  if (bases.some((b) => url.startsWith(b))) return true;
  const helpHosts = (cdn.helpLinks || []).map(hostOf).filter(Boolean);
  const host = hostOf(url);
  if (host && helpHosts.includes(host) && /^https:/.test(url)) return true;
  return NAMESPACE_URLS.includes(url);
}

function attrs(tag) {
  const out = {};
  const re = /([a-zA-Z_:][-a-zA-Z0-9_:.]*)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'>]+)))?/g;
  const body = tag.replace(/^<[a-zA-Z0-9]+/, '').replace(/\/?>$/, '');
  let m;
  while ((m = re.exec(body))) out[m[1].toLowerCase()] = m[2] ?? m[3] ?? m[4] ?? '';
  return out;
}

export function headingOrderFindings(html, label = 'page') {
  const out = [];
  const body = html.slice(html.indexOf('<body'));
  const re = /<h([1-6])\b/gi;
  let prev = 0; let m; let n = 0;
  while ((m = re.exec(body))) {
    const level = Number(m[1]);
    n++;
    if (n === 1 && level !== 1) out.push(`${label}: first heading is h${level}, not h1`);
    if (prev && level > prev + 1) out.push(`${label}: heading jumps from h${prev} to h${level}`);
    prev = level;
  }
  return out;
}

export function a11yFindings(html, label = 'page') {
  const out = [];
  if (!/<html\b[^>]*\blang="en"/.test(html)) out.push(`${label}: <html lang="en"> missing`);
  const h1s = (html.match(/<h1\b/gi) || []).length;
  if (h1s !== 1) out.push(`${label}: expected exactly one <h1>, found ${h1s}`);
  out.push(...headingOrderFindings(html, label));
  if (!/<a class="skip" href="#main">/.test(html)) out.push(`${label}: skip link a.skip[href="#main"] missing`);
  if (!/<main id="main"/.test(html)) out.push(`${label}: <main id="main"> missing`);
  if (!/:focus-visible/.test(html)) out.push(`${label}: no :focus-visible rule in the stylesheet`);
  // labelled form controls
  const labelFor = new Set([...html.matchAll(/<label\b[^>]*\bfor="([^"]+)"/g)].map((m) => m[1]));
  const controls = /<(input|textarea|select)\b[^>]*>/g;
  let m;
  while ((m = controls.exec(html))) {
    const a = attrs(m[0]);
    if (a.type === 'hidden') continue;
    const before = html.slice(Math.max(0, m.index - 400), m.index);
    const wrapped = before.lastIndexOf('<label') > before.lastIndexOf('</label>');
    if (a['aria-label'] || a['aria-labelledby'] || (a.id && labelFor.has(a.id)) || wrapped) continue;
    out.push(`${label}: unlabelled <${m[1]}${a.id ? ' id=' + a.id : ''}>`);
  }
  const buttons = html.match(/<button\b[^>]*>/g) || [];
  for (const b of buttons) if (!/\btype="button"/.test(b)) out.push(`${label}: <button> without type="button": ${b.slice(0, 80)}`);
  const outputs = html.match(/<div class="output"[^>]*>/g) || [];
  for (const o of outputs) if (!/aria-live="polite"/.test(o)) out.push(`${label}: output without aria-live="polite": ${o.slice(0, 80)}`);
  out.push(...tableMarkupFindings(html, label));
  return out;
}

// The accessible name of every <button>: aria-label when present, else its text content.
export function buttonNames(html) {
  const out = [];
  for (const m of html.matchAll(/<button\b([^>]*)>([\s\S]*?)<\/button>/g)) {
    const a = attrs(`<button${m[1]}>`);
    out.push(a['aria-label'] != null ? a['aria-label'] : m[2].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim());
  }
  return out;
}
export function nameFindings(html, label = 'page') {
  const out = [];
  const seen = new Map();
  for (const n of buttonNames(html)) seen.set(n, (seen.get(n) || 0) + 1);
  for (const [n, k] of seen) if (k > 1) out.push(`${label}: ${k} buttons share the accessible name "${n}"`);
  // visible box labels must differ within one step (an optional second box must not read like the required one)
  const perStep = new Map();
  for (const m of html.matchAll(/<label class="ws-label" for="[^"]+">([^<]*)<\/label>/g)) {
    const before = html.slice(0, m.index);
    const step = (before.match(/id="step-[^"]+"/g) || []).pop() || '(no step)';
    const key = `${step}::${m[1].trim()}`;
    perStep.set(key, (perStep.get(key) || 0) + 1);
  }
  for (const [key, k] of perStep) if (k > 1) { const [step, text] = key.split('::'); out.push(`${label}: ${k} boxes in ${step} share the label "${text}"`); }
  return out;
}

export function workspaceIdFindings(html, content, label = 'page') {
  const out = [];
  const count = (id) => (html.match(new RegExp(`\\bid="${id.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"`, 'g')) || []).length;
  for (const ws of collectWorkspaces(content)) {
    const n = count(ws.id);
    if (n !== 1) out.push(`${label}: workspace id "${ws.id}" appears ${n} times as an element id (expected 1)`);
    if (ws.tool === 'sql') { const o = count(`out-${ws.id}`); if (o !== 1) out.push(`${label}: output id "out-${ws.id}" appears ${o} times (expected 1)`); }
  }
  return out;
}

export function scriptTagFindings(html, cdn, label = 'page') {
  const out = [];
  const tags = html.match(/<script\b[^>]*\bsrc=[^>]*>/g) || [];
  const want = [cdn.sqljs.loader, cdn.pyodide.loader];
  if (tags.length !== 2) out.push(`${label}: expected exactly 2 external <script src> tags, found ${tags.length}`);
  tags.forEach((t, i) => {
    const a = attrs(t);
    const w = want[i];
    if (!w) return;
    if (a.src !== w.url) out.push(`${label}: script ${i + 1} src is ${a.src}, cdn.json says ${w.url}`);
    if (a.integrity !== w.integrity) out.push(`${label}: script ${i + 1} integrity does not match cdn.json`);
    if (!SRI_RE.test(a.integrity || '')) out.push(`${label}: script ${i + 1} integrity is not a sha384 value`);
    if (a.crossorigin !== 'anonymous') out.push(`${label}: script ${i + 1} lacks crossorigin="anonymous"`);
  });
  return out;
}

export function pageDataFindings(html, { cdn, fileBytes, content, label = 'page' }) {
  const out = [];
  let raw; let data;
  try { ({ raw, data } = extractPageData(html)); } catch (e) { return [`${label}: ${e.message}`]; }
  if (raw.includes('<')) out.push(`${label}: HW_PAGE JSON contains a literal "<"`);
  if (/[\u2028\u2029]/.test(raw)) out.push(`${label}: HW_PAGE JSON contains a raw U+2028/U+2029`);
  const keys = Object.keys(data).sort();
  const extra = keys.filter((k) => !HW_PAGE_KEYS.includes(k));
  const missing = HW_PAGE_KEYS.filter((k) => !keys.includes(k));
  if (extra.length) out.push(`${label}: HW_PAGE carries unexpected keys ${extra.join(', ')}`);
  if (missing.length) out.push(`${label}: HW_PAGE lacks keys ${missing.join(', ')}`);
  for (const w of data.workspaces || []) {
    const bad = Object.keys(w).filter((k) => !HW_PAGE_WS_KEYS.includes(k));
    if (bad.length) out.push(`${label}: HW_PAGE workspace ${w.id} carries unexpected keys ${bad.join(', ')}`);
  }
  if (content) {
    const want = collectWorkspaces(content).map((w) => w.id);
    const got = (data.workspaces || []).map((w) => w.id);
    if (JSON.stringify(want) !== JSON.stringify(got)) out.push(`${label}: HW_PAGE.workspaces ids differ from content (${got.join(' ')})`);
    if (data.primaryDb !== content.primaryDb) out.push(`${label}: HW_PAGE.primaryDb ${data.primaryDb} ≠ content ${content.primaryDb}`);
    if ((data.seedDb || null) !== (content.seedDb || null)) out.push(`${label}: HW_PAGE.seedDb ≠ content`);
  }
  const paths = Object.keys(data.files || {}).sort();
  if (JSON.stringify(paths) !== JSON.stringify([...ALLOW_LIST])) out.push(`${label}: HW_PAGE.files paths ${paths.join(', ')} ≠ allow-list`);
  for (const p of paths) {
    const f = data.files[p];
    const disk = fileBytes[p];
    if (!disk) { out.push(`${label}: no file on disk for ${p}`); continue; }
    let bytes;
    try { bytes = f.kind === 'text' ? Buffer.from(f.body, 'utf8') : Buffer.from(f.body, 'base64'); } catch (e) { out.push(`${label}: ${p} does not decode (${e.message})`); continue; }
    if (!bytes.equals(disk)) out.push(`${label}: embedded ${p} differs from the file on disk`);
    if (f.kind !== (/\.(py|txt|csv)$/i.test(p) ? 'text' : 'base64')) out.push(`${label}: ${p} has kind ${f.kind}`);
  }
  if (JSON.stringify(data.cdn) !== JSON.stringify({ sqljs: cdn.sqljs, pyodide: cdn.pyodide })) out.push(`${label}: HW_PAGE.cdn ≠ cdn.json`);
  return out;
}

export function urlFindings(html, cdn, label = 'page') {
  return externalUrls(html).filter((u) => !isAllowedUrl(u, cdn))
    .map((u) => (/^\/\//.test(u)
      ? `${label}: protocol-relative URL ${u} resolves to file:${u} on a file:// page`
      : `${label}: external URL not allowed: ${u}`));
}

// Every static rule for one built page.
export function pageFindings(html, { content, handout, cdn, fileBytes, label }) {
  const out = [];
  out.push(...hygieneFindings(html, label));
  out.push(...scriptTagFindings(html, cdn, label));
  out.push(...urlFindings(html, cdn, label));
  out.push(...pageDataFindings(html, { cdn, fileBytes, content, label }));
  out.push(...a11yFindings(html, label));
  out.push(...nameFindings(html, label));
  out.push(...workspaceIdFindings(html, content, label));
  if (!html.includes(`version ${handout.version}`)) out.push(`${label}: footer does not carry version ${handout.version}`);
  // the build emits each inline <script> at the start of a line (helpers' help text mentions "<script>" mid-line)
  const inline = html.split(/^<script>/m).slice(1).map((s) => s.slice(0, s.indexOf('</script>')));
  if (inline.length !== 3) out.push(`${label}: expected 3 inline scripts (HW_PAGE, helpers, runtime), found ${inline.length}`);
  inline.forEach((s, i) => { if (/<!--/.test(s)) out.push(`${label}: inline script ${i + 1} contains "<!--"`); });
  return out;
}

// ---------------------------------------------------------------------------------------------
// Solutions blocks and expected scripts (the instructor-side contract)
// ---------------------------------------------------------------------------------------------
// `-- @step <id>` / `-- @alt <id>` markers → [{ kind, id, sql, line }]; a block ends at the next marker or EOF.
export function parseSolutionBlocks(sqlText) {
  const lines = String(sqlText).split(/\r?\n/);
  const blocks = [];
  let cur = null;
  lines.forEach((line, i) => {
    const m = /^--\s*@(step|alt)\s+(\S+)\s*$/.exec(line);
    if (m) { cur = { kind: m[1], id: m[2], line: i + 1, lines: [] }; blocks.push(cur); return; }
    if (cur) cur.lines.push(line);
  });
  return blocks.map((b) => ({ kind: b.kind, id: b.id, line: b.line, sql: b.lines.join('\n').trim() + '\n' }));
}
export function blockSql(blocks, id) {
  const b = blocks.find((x) => x.kind === 'step' && x.id === id);
  if (!b) throw new Error(`no @step block "${id}"`);
  return b.sql;
}

// sql workspaces that must be driven: not optional themselves and not inside an optional step.
// (collectWorkspaces() replaces a workspace-level `optional` with the step's flag, so walk the content directly.)
export function requiredSqlWorkspaces(content) {
  const out = [];
  for (const ex of content.exercises || []) {
    for (const step of ex.steps || []) {
      if (step.optional) continue;
      for (const ws of step.workspaces || []) if (ws.tool === 'sql' && ws.optional !== true) out.push(ws.id);
    }
  }
  return out;
}
export function sqlWorkspaceIds(content) { return collectWorkspaces(content).filter((w) => w.tool === 'sql').map((w) => w.id); }

export function actionKind(action) {
  const kinds = ACTION_KINDS.filter((k) => Object.prototype.hasOwnProperty.call(action || {}, k));
  return kinds.length === 1 ? kinds[0] : null;
}

function isInt(x) { return Number.isInteger(x); }
function isStringList(x) { return Array.isArray(x) && x.every((s) => typeof s === 'string'); }

// Levenshtein, small and exact — used only to turn "notesIncludes" into 'did you mean "notesInclude"?'.
export function editDistance(a, b) {
  const m = a.length; const n = b.length;
  let prev = Array.from({ length: n + 1 }, (_, j) => j);
  for (let i = 1; i <= m; i++) {
    const cur = [i];
    for (let j = 1; j <= n; j++) cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    prev = cur;
  }
  return prev[n];
}
export function didYouMean(key, allowed) {
  let best = null; let bestD = Infinity;
  for (const a of allowed) { const d = editDistance(String(key).toLowerCase(), a.toLowerCase()); if (d < bestD) { bestD = d; best = a; } }
  return best !== null && bestD <= Math.max(2, Math.ceil(best.length / 3)) ? best : null;
}
// An `expect` key no reader looks at means the action asserts nothing — the most dangerous kind of green check.
export function expectKeyFindings(ex, kind, at) {
  if (!ex || typeof ex !== 'object' || Array.isArray(ex) || !kind) return [];
  const allowed = EXPECT_KEYS[kind] || [];
  return Object.keys(ex).filter((k) => !allowed.includes(k)).map((k) => {
    const s = didYouMean(k, allowed);
    if (s) return `${at}: expect.${k} is not read for ${kind} actions — did you mean "${s}"?`;
    return `${at}: expect.${k} is not read for ${kind} actions${allowed.length ? ` (allowed: ${allowed.join(', ')})` : ' (this action kind reads no expect keys)'}`;
  });
}

export function expectedShapeFindings(expected, chapter, label = 'expected') {
  const out = [];
  if (!expected || typeof expected !== 'object') return [`${label}: not an object`];
  if (expected.chapter !== chapter) out.push(`${label}: chapter is ${expected.chapter}, expected ${chapter}`);
  if (expected.page !== pageName(chapter)) out.push(`${label}: page is ${expected.page}, expected ${pageName(chapter)}`);
  if (!Array.isArray(expected.actions) || !expected.actions.length) return [...out, `${label}: actions must be a non-empty array`];
  expected.actions.forEach((a, i) => {
    const at = `${label}: actions[${i}]`;
    const kind = actionKind(a);
    if (!kind) { out.push(`${at}: must have exactly one of ${ACTION_KINDS.join(', ')}`); return; }
    const ex = a.expect;
    if (ex != null && (typeof ex !== 'object' || Array.isArray(ex))) out.push(`${at}: expect must be an object`);
    out.push(...expectKeyFindings(ex, kind, at));
    switch (kind) {
      case 'terminal': if (typeof a.terminal !== 'string' || !a.terminal.trim()) out.push(`${at}: terminal must be a command string`); break;
      case 'python': if (typeof a.python !== 'string' || !a.python.trim()) out.push(`${at}: python must be a code string`); break;
      case 'sql':
        if (typeof a.sql !== 'string') out.push(`${at}: sql must be a workspace id`);
        if (typeof a.block !== 'string') out.push(`${at}: sql action needs a block id`);
        break;
      case 'tables': if (!a.tables || typeof a.tables !== 'object' || Array.isArray(a.tables)) out.push(`${at}: tables must be an object of name → rows`); break;
      case 'reload': if (ex && ex.restored != null && !(Array.isArray(ex.restored) && ex.restored.every((s) => typeof s === 'string'))) out.push(`${at}: expect.restored must be an array of ids`); break;
      case 'downloadDb': if (ex && ex.sqlite3 != null && !(Array.isArray(ex.sqlite3) && ex.sqlite3.every((p) => Array.isArray(p) && p.length === 2 && typeof p[0] === 'string' && typeof p[1] === 'string'))) out.push(`${at}: expect.sqlite3 must be [[sql, expected], …]`); break;
      case 'export':
        for (const k of ['includes', 'excludes']) if (ex && ex[k] != null && !(Array.isArray(ex[k]) && ex[k].every((s) => typeof s === 'string'))) out.push(`${at}: expect.${k} must be an array of strings`);
        // A path exclude has ONE backslash (C:\); a value with two consecutive backslashes (the JSON "C:\\\\") is the
        // inert 4-char string C:\\ that never matches a real Windows path — flag it.
        for (const s of (ex && Array.isArray(ex.excludes)) ? ex.excludes : []) if (/\\\\/.test(s)) out.push(`${at}: expect.excludes entry ${JSON.stringify(s)} has two consecutive backslashes and can never match a real path (write "C:\\\\" in JSON for C:\\)`);
        break;
      case 'cancel': if (!CANCEL_TARGETS.includes(a.cancel)) out.push(`${at}: cancel must be one of ${CANCEL_TARGETS.join(', ')}`); break;
      case 'probe':
        if (!Array.isArray(a.probe) || !a.probe.length) out.push(`${at}: probe must be a non-empty array of ${PROBE_KINDS.join(', ')}`);
        else {
          for (const p of a.probe) if (!PROBE_KINDS.includes(p)) out.push(`${at}: unknown probe ${JSON.stringify(p)} (allowed: ${PROBE_KINDS.join(', ')})`);
          if (new Set(a.probe).size !== a.probe.length) out.push(`${at}: probe lists the same probe twice`);
        }
        if (a.ws != null && typeof a.ws !== 'string') out.push(`${at}: probe's optional ws must be a sql workspace id`);
        break;
      case 'openDb': if (!OPEN_DB_KINDS.includes(a.openDb)) out.push(`${at}: openDb must be one of ${OPEN_DB_KINDS.join(', ')}`); break;
      case 'clear': case 'print': case 'xssCanary': case 'offline': case 'reset': case 'downloadDb':
        if (a[kind] !== true) out.push(`${at}: ${kind} must be true`);
        break;
      default: break;
    }
    if (kind === 'reload' && a.corrupt != null && !(Array.isArray(a.corrupt) && a.corrupt.every((s) => typeof s === 'string'))) out.push(`${at}: corrupt must be an array of sql workspace ids`);
    if (ex) {
      if (ex.results != null) {
        if (!Array.isArray(ex.results)) out.push(`${at}: expect.results must be an array`);
        else ex.results.forEach((r, k) => {
          if (!r || !isInt(r.rows) || r.rows < 0) out.push(`${at}: results[${k}].rows must be a non-negative integer`);
          if (r && r.cell != null && !(Array.isArray(r.cell) && r.cell.length === 3 && isInt(r.cell[0]) && isInt(r.cell[1]))) out.push(`${at}: results[${k}].cell must be [row, col, value]`);
          if (r && r.cell && isInt(r.rows) && r.cell[0] >= r.rows) out.push(`${at}: results[${k}].cell row ${r.cell[0]} is outside ${r.rows} rows`);
        });
      }
      if (ex.changed != null && !(isInt(ex.changed) && ex.changed >= 0)) out.push(`${at}: expect.changed must be a non-negative integer`);
      if (ex.errorIncludes != null && typeof ex.errorIncludes !== 'string') out.push(`${at}: expect.errorIncludes must be a string`);
      for (const k of ['stdoutIncludes', 'stderrIncludes']) if (ex[k] != null && !(Array.isArray(ex[k]) && ex[k].every((s) => typeof s === 'string'))) out.push(`${at}: expect.${k} must be an array of strings`);
      if (ex.tables != null && (typeof ex.tables !== 'object' || Array.isArray(ex.tables))) out.push(`${at}: expect.tables must be an object`);
      if (ex.structure != null) {
        if (typeof ex.structure !== 'object' || Array.isArray(ex.structure)) out.push(`${at}: expect.structure must be {table: {includes, excludes}}`);
        else for (const [t, rule] of Object.entries(ex.structure)) {
          if (!rule || typeof rule !== 'object' || Array.isArray(rule)) { out.push(`${at}: expect.structure.${t} must be an object`); continue; }
          for (const k of ['includes', 'excludes']) if (rule[k] != null && !(Array.isArray(rule[k]) && rule[k].every((s) => typeof s === 'string'))) out.push(`${at}: expect.structure.${t}.${k} must be an array of strings`);
        }
      }
      if (ex.statusIncludes != null && typeof ex.statusIncludes !== 'string') out.push(`${at}: expect.statusIncludes must be a string`);
      // A bare string here is iterated character by character by verify-browser, which asserts nothing.
      for (const k of STRING_LIST_EXPECT_KEYS) {
        if (ex[k] == null) continue;
        if (typeof ex[k] === 'string') out.push(`${at}: expect.${k} must be an ARRAY of strings — a bare string is iterated character by character, so the assertion becomes "contains each letter"`);
        else if (!isStringList(ex[k])) out.push(`${at}: expect.${k} must be an array of strings`);
      }
      if (ex.exit != null && typeof ex.exit !== 'string') out.push(`${at}: expect.exit must be the transcript's exit line as a string (e.g. "exit status 2")`);
    }
  });
  const kinds = expected.actions.map(actionKind);
  if (kinds[kinds.length - 1] !== 'offline') out.push(`${label}: the last action must be {"offline": true}`);
  if (kinds.filter((k) => k === 'offline').length !== 1) out.push(`${label}: exactly one offline action`);
  if (kinds.filter((k) => k === 'xssCanary').length !== 1) out.push(`${label}: exactly one xssCanary action`);
  return out;
}

// The consistency rules the spec assigns to node --test: required sql workspace ⇄ @step blocks ⇄ actions, chips ⇄ rows.
export function expectedConsistencyFindings({ content, blocks, expected, label }) {
  const lab = label || (content && content.id) || 'chapter';
  const out = expectedShapeFindings(expected, content.chapter, lab);
  const actions = Array.isArray(expected && expected.actions) ? expected.actions : [];
  const stepBlocks = blocks.filter((b) => b.kind === 'step');
  const altIds = new Set(blocks.filter((b) => b.kind === 'alt').map((b) => b.id));
  const seen = new Map();
  for (const b of blocks) { if (seen.has(b.id)) out.push(`${lab}: block id "${b.id}" is declared twice (lines ${seen.get(b.id)} and ${b.line})`); else seen.set(b.id, b.line); }
  const allSql = sqlWorkspaceIds(content);
  const required = requiredSqlWorkspaces(content);
  const sqlActions = actions.filter((a) => actionKind(a) === 'sql');
  const usedBlocks = new Map();
  for (const a of sqlActions) {
    usedBlocks.set(a.block, (usedBlocks.get(a.block) || 0) + 1);
    if (!allSql.includes(a.sql)) out.push(`${lab}: action drives "${a.sql}", which is not a sql workspace on the page`);
    if (altIds.has(a.block)) out.push(`${lab}: action references @alt block "${a.block}" — alt blocks are never driven`);
    else if (!stepBlocks.some((b) => b.id === a.block)) out.push(`${lab}: action references block "${a.block}", which does not exist`);
    if (typeof a.block === 'string' && typeof a.sql === 'string' && a.block !== a.sql && !a.block.startsWith(`${a.sql}-`)) out.push(`${lab}: block "${a.block}" is driven into "${a.sql}" but is not named "${a.sql}" or "${a.sql}-<part>"`);
  }
  for (const [id, n] of usedBlocks) if (n > 1) out.push(`${lab}: block "${id}" is driven ${n} times (expected once)`);
  for (const b of stepBlocks) if (!usedBlocks.has(b.id)) out.push(`${lab}: @step block "${b.id}" (line ${b.line}) is never driven by an action`);
  for (const ws of required) {
    const own = stepBlocks.filter((b) => b.id === ws);
    const subs = stepBlocks.filter((b) => b.id.startsWith(`${ws}-`));
    if (!own.length && !subs.length) { out.push(`${lab}: required sql workspace "${ws}" has no @step block`); continue; }
    if (own.length > 1) out.push(`${lab}: workspace "${ws}" has ${own.length} @step blocks`);
    if (own.length && subs.length) out.push(`${lab}: workspace "${ws}" has both a whole block and part blocks (${subs.map((b) => b.id).join(', ')})`);
    const wantBlocks = [...own, ...subs].map((b) => b.id).sort();
    const gotBlocks = sqlActions.filter((a) => a.sql === ws).map((a) => a.block).sort();
    if (JSON.stringify(wantBlocks) !== JSON.stringify(gotBlocks)) out.push(`${lab}: workspace "${ws}" blocks [${wantBlocks.join(', ')}] vs actions [${gotBlocks.join(', ')}]`);
  }
  // chips: "N row(s)…" ⇄ expect.results[0].rows; "OK · N rows changed" ⇄ expect.changed (single-block actions only)
  for (const w of collectWorkspaces(content)) {
    if (w.tool !== 'sql' || !Array.isArray(w.expect)) continue;
    const act = sqlActions.find((a) => a.sql === w.id && a.block === w.id);
    if (!act || !act.expect) continue;
    for (const chip of w.expect) {
      const rows = /^(\d+)\s*rows?\b/.exec(chip);
      if (rows && Array.isArray(act.expect.results) && act.expect.results[0] && isInt(act.expect.results[0].rows) && Number(rows[1]) !== act.expect.results[0].rows) out.push(`${lab}: chip "${chip}" on ${w.id} disagrees with expect.results[0].rows = ${act.expect.results[0].rows}`);
      const changed = /^OK · (\d+) rows? changed$/.exec(chip);
      if (changed && isInt(act.expect.changed) && Number(changed[1]) !== act.expect.changed) out.push(`${lab}: chip "${chip}" on ${w.id} disagrees with expect.changed = ${act.expect.changed}`);
    }
  }
  // every terminal workspace command is driven at least once
  for (const w of collectWorkspaces(content)) {
    if (w.tool !== 'terminal' || w.optional) continue;
    if (!actions.some((a) => actionKind(a) === 'terminal' && a.terminal.trim() === String(w.command).trim())) out.push(`${lab}: terminal workspace ${w.id}'s command is never driven: ${w.command}`);
  }
  // every python workspace snippet AND the page's pythonStarter must be driven VERBATIM. A comment-stripped or
  // reformatted variant proves the engine runs, not that the code the student is handed runs — the comments in
  // chapter 2's snippets are what tell them it writes to scratch.db.
  const pyNorm = (s) => String(s == null ? '' : s).replace(/\r\n/g, '\n').replace(/\s+$/, '');
  const pyDriven = actions.filter((a) => actionKind(a) === 'python').map((a) => pyNorm(a.python));
  for (const w of collectWorkspaces(content)) {
    if (w.tool !== 'python') continue;
    if (!pyDriven.includes(pyNorm(w.snippet))) out.push(`${lab}: python workspace ${w.id}'s snippet is never driven verbatim by a {"python": …} action`);
  }
  if (pyNorm(content.pythonStarter) && !pyDriven.includes(pyNorm(content.pythonStarter))) out.push(`${lab}: the page's pythonStarter is never driven verbatim by a {"python": …} action`);
  return out;
}

// The version + exercise-title pair. runChecks no longer runs this on its own — pdfHandoutFindings above runs
// make-pdf.mjs's whole validator set instead, because these two rules alone pass a handout printed before the
// last content edit (every exercise TITLE survives an edit to a step). Kept exported: it is the cheap, pure
// check other tooling can run on already-extracted text, and its unit test documents the gap.
// Pure: the version + exercise-title findings for already-extracted PDF text (unit-testable without a real PDF).
export function pdfTextFindingsFromText(text, chapters, handout) {
  const norm = (x) => String(x).replace(/\s+/g, ' ').trim();
  const t = norm(text);
  const out = [];
  if (!t.includes(`version ${handout.version}`)) out.push(`the PDF does not carry "version ${handout.version}" — run make-pdf.mjs, then build.mjs --zip-only`);
  for (const c of chapters) for (const ex of c.exercises) {
    const title = norm(String(ex.title).replace(/<[^>]+>/g, ' '));
    if (!t.includes(`Exercise ${ex.id}`) || !t.includes(title)) out.push(`the PDF lacks "Exercise ${ex.id} · ${title}"`);
  }
  return out;
}
// The full make-pdf validation, run against the PDF that is actually on disk (and therefore against the copy the
// starter zip carries). pdfTextFindings' version+titles pair passes a handout printed before the last content
// edit; make-pdf's per-step / chip / command / unstuck checks do not. make-pdf.mjs imports only build.mjs and
// schema.mjs, so importing it here is not a cycle.
export async function pdfHandoutFindings(pdfPath, { chapters, handout, html = null }) {
  if (!existsSync(pdfPath)) return [`${pdfPath} is missing — run make-pdf.mjs`];
  for (const bin of ['pdfinfo', 'pdftotext']) {
    const probe = spawnSync(bin, ['-v'], { encoding: 'utf8' });
    if (probe.error && probe.error.code === 'ENOENT') return [`WARNING: ${bin} (poppler) not found — the handout PDF was not checked`];
  }
  let checks;
  try { ({ checks } = await validatePdf(pdfPath, { chapters, handout, html })); }
  catch (e) { return [`could not validate ${pdfPath}: ${String(e.message).split('\n')[0].slice(0, 200)} — run make-pdf.mjs to regenerate it`]; }
  return checks.flatMap((c) => c.findings.map((f) => `${c.name}: ${f} — run make-pdf.mjs, then build.mjs --zip-only`));
}
export function pdfTextFindings(pdfPath, chapters, handout) {
  if (!existsSync(pdfPath)) return [`${pdfPath} is missing — run make-pdf.mjs`];
  const r = spawnSync('pdftotext', ['-layout', pdfPath, '-'], { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });
  if (r.error && r.error.code === 'ENOENT') return ['WARNING: pdftotext (poppler) not found — the PDF text was not checked'];
  if (r.status !== 0) return [`pdftotext could not read ${pdfPath}: ${(r.stderr || '').trim().split('\n')[0].slice(0, 160)} — run make-pdf.mjs to regenerate it`];
  return pdfTextFindingsFromText(r.stdout, chapters, handout);
}

export function loadExpected(instructorDir, chapter) {
  const p = join(instructorDir, 'expected', `chapter-${chapter}.json`);
  return JSON.parse(readFileSync(p, 'utf8'));
}
export function loadSolutionBlocks(instructorDir, chapter) {
  return parseSolutionBlocks(readFileSync(join(instructorDir, `solutions-ch${chapter}.sql`), 'utf8'));
}

// ---------------------------------------------------------------------------------------------
// Zips
// ---------------------------------------------------------------------------------------------
function walk(dir, prefix = '') {
  const out = [];
  for (const name of readdirSync(dir).sort()) {
    if (name === '.DS_Store' || name.startsWith('._')) continue;
    const abs = join(dir, name);
    const rel = prefix ? `${prefix}/${name}` : name;
    if (statSync(abs).isDirectory()) out.push(...walk(abs, rel)); else out.push({ rel, abs });
  }
  return out;
}
export function zipFindings(zipPath, expectedEntries, label) {
  const out = [];
  if (!existsSync(zipPath)) return [`${label}: ${zipPath} is missing — run build.mjs --zip-only`];
  let entries;
  try { entries = listZip(readFileSync(zipPath)); } catch (e) { return [`${label}: unreadable zip (${e.message})`]; }
  const got = new Map(entries.map((e) => [e.name, e]));
  const want = new Map(expectedEntries.map((e) => [e.name, e]));
  for (const name of got.keys()) {
    if (/(^|\/)\.DS_Store$|(^|\/)\._/.test(name)) out.push(`${label}: stray entry ${name}`);
    else if (!want.has(name)) out.push(`${label}: unexpected entry ${name}`);
  }
  for (const [name, e] of want) {
    const g = got.get(name);
    if (!g) { out.push(`${label}: missing entry ${name}`); continue; }
    const crc = crc32(e.data) >>> 0;
    if (g.crc !== crc || g.size !== e.data.length) out.push(`${label}: ${name} differs from its source (CRC ${g.crc.toString(16)} vs ${crc.toString(16)})${name.endsWith('.pdf') ? ' — the PDF on disk changed after the zip was made; run build.mjs --zip-only' : ''}`);
  }
  return out;
}

// ---------------------------------------------------------------------------------------------
// Orchestration
// ---------------------------------------------------------------------------------------------
export async function runChecks(opts = {}) {
  const o = { ...DEFAULTS, pagesDir: DEFAULTS.outDir, noZip: false, ...opts };
  const results = [];
  // A findings list that is ONLY "WARNING: …" lines (a missing optional tool) stays a visible warning, never a
  // silent pass and never a hard failure.
  const add = (name, findings, detail) => {
    const warnOnly = findings.length > 0 && findings.every((f) => /^WARNING\b/.test(String(f)));
    results.push({ name, ok: findings.length === 0 || warnOnly, detail: findings.length ? findings : (detail || 'ok') });
  };

  let assets; let content;
  try {
    assets = loadAssets({ srcDir: SRC_DIR, weekDir: o.weekDir });
    content = await loadContent(o.contentDir);
    validateAll(content);
  } catch (e) {
    return { results, env: `could not load content/assets: ${e.message}` };
  }
  const { chapters, handout } = content;
  const cdn = assets.cdn;
  results.push({ name: 'content schema (validate + validateHandout)', ok: true, detail: `${chapters.length} chapters, handout version ${handout.version}` });

  // DOM rules on the runtime sources
  add('DOM rules: runtime.js / helpers.js free of HTML-string APIs', [...domRuleFindings(assets.runtimeJs, 'runtime.js'), ...domRuleFindings(assets.helpersJs, 'helpers.js')]);
  const buildSrc = readFileSync(join(SRC_DIR, 'build.mjs'), 'utf8');
  add('build.mjs uses no Date (pages carry only the version constant)', /\bDate\b/.test(buildSrc) ? ['build.mjs references Date'] : []);
  add('runtime.js never calls localStorage.clear()', /localStorage\.clear\s*\(/.test(assets.runtimeJs) ? ['runtime.js calls localStorage.clear()'] : []);
  add('sql.js wasm: runtime.js fetches it with the sha384 from cdn.json', wasmIntegrityFindings(assets.runtimeJs, cdn), 'fetch(CDN.sqljs.wasm.url, { integrity: … })');

  // pages: rebuild, determinism, freshness, static rules
  const pages = chapters.map((c) => ({ chapter: c.chapter, content: c, name: pageName(c.chapter), html: assemblePage(c, handout, assets) }));
  const again = chapters.map((c) => assemblePage(c, handout, assets));
  add('deterministic assembly (two builds byte-equal)', pages.filter((p, i) => p.html !== again[i]).map((p) => `${p.name} differs between two builds`));
  for (const p of pages) {
    const onDisk = join(o.pagesDir, p.name);
    if (!existsSync(onDisk)) add(`freshness: ${p.name}`, [`${onDisk} is not built — run build.mjs`]);
    else {
      const disk = readFileSync(onDisk, 'utf8');
      add(`freshness: ${p.name}`, disk === p.html ? [] : [`${onDisk} differs from a fresh build (${disk.length} vs ${p.html.length} chars) — run build.mjs`]);
    }
    add(`static rules: ${p.name}`, pageFindings(p.html, { content: p.content, handout, cdn, fileBytes: assets.fileBytes, label: p.name }), 'hygiene, SRI, URLs, HW_PAGE, a11y, ids');
  }

  // print HTML
  const printHtml = assemblePrint(chapters, handout);
  const pf = [...hygieneFindings(printHtml, 'print'), ...tableMarkupFindings(printHtml, 'print'), ...urlFindings(printHtml, cdn, 'print')];
  for (const c of chapters) for (const ex of c.exercises) if (!printHtml.includes(`Exercise ${ex.id} · `)) pf.push(`print: exercise ${ex.id} heading missing`);
  if (!/What to hand in/.test(printHtml)) pf.push('print: "What to hand in" missing');
  add('print HTML: hygiene, tables, every exercise, "What to hand in"', pf);

  // instructor contract
  for (const c of chapters) {
    let findings = [];
    try {
      const blocks = loadSolutionBlocks(o.instructorDir, c.chapter);
      const expected = loadExpected(o.instructorDir, c.chapter);
      findings = expectedConsistencyFindings({ content: c, blocks, expected });
    } catch (e) { findings = [`${c.id}: ${e.message}`]; }
    add(`contract: solutions-ch${c.chapter}.sql @step blocks ⇄ expected/chapter-${c.chapter}.json ⇄ content ids`, findings);
  }
  const instructorFiles = existsSync(o.instructorDir) ? walk(o.instructorDir) : [];
  add('instructor/ carries no student page', instructorFiles.filter((f) => /week-1-chapter-\d+\.html$/i.test(f.rel)).map((f) => `instructor/${f.rel} is a student page`));

  // the handout PDF on disk: does its text carry the current version and every exercise title? (skipped when there is
  // no real handout — e.g. the test fixture ships a placeholder; the real check.mjs run always has one)
  if (!o.noPdfText) add('handout PDF: make-pdf.mjs\'s full validation against the file on disk', await pdfHandoutFindings(join(o.weekDir, PDF_NAME), { chapters, handout, html: printHtml }), 'size, titles, every step, chips, commands, unstuck, grading, version, hygiene, glyphs');

  // zips
  if (!o.noZip) {
    const pdfPath = join(o.weekDir, PDF_NAME);
    if (!existsSync(pdfPath)) add(`zip: ${STARTER_ZIP}`, [`${pdfPath} is missing — run make-pdf.mjs, then build.mjs --zip-only`]);
    else add(`zip: ${STARTER_ZIP} (listing + per-entry CRC)`, zipFindings(join(o.zipDir, STARTER_ZIP), starterZipEntries({ pages, assets, pdfBytes: readFileSync(pdfPath) }), STARTER_ZIP));
    let instrEntries = [];
    try { instrEntries = instructorZipEntries(o.instructorDir); add(`zip: ${INSTRUCTOR_ZIP} (listing + per-entry CRC)`, zipFindings(join(o.zipDir, INSTRUCTOR_ZIP), instrEntries, INSTRUCTOR_ZIP)); }
    catch (e) { add(`zip: ${INSTRUCTOR_ZIP}`, [e.message]); }
  } else {
    results.push({ name: 'zips', ok: true, detail: 'skipped (--no-zip)' });
  }
  results.push({ name: 'note', ok: true, detail: 'the parent repo\'s "N points" rule is deliberately not applied to these pages' });
  return { results, env: null };
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
      case '--pages-dir': o.pagesDir = resolve(val()); break;
      case '--week-dir': o.weekDir = resolve(val()); break;
      case '--instructor-dir': o.instructorDir = resolve(val()); break;
      case '--zip-dir': o.zipDir = resolve(val()); break;
      case '--json': o.json = resolve(val()); break;
      case '--no-zip': o.noZip = true; break;
      case '--no-pdf-text': o.noPdfText = true; break;
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
    console.log('usage: node check.mjs [--content-dir D] [--pages-dir D] [--week-dir D] [--instructor-dir D] [--zip-dir D] [--no-zip] [--no-pdf-text] [--json FILE] [--quiet]');
    return;
  }
  const { results, env } = await runChecks(opts);
  if (env) { console.error(`check: environment problem — ${env}`); process.exit(2); }
  let failed = 0;
  for (const r of results) {
    if (!r.ok) failed++;
    if (opts.quiet && r.ok) continue;
    const detail = Array.isArray(r.detail) ? r.detail : [r.detail];
    console.log(`${r.ok ? 'PASS' : 'FAIL'}  ${r.name}`);
    if (!r.ok || !opts.quiet) for (const d of detail) if (d !== 'ok') console.log(`      ${d}`);
  }
  if (opts.json) { mkdirSync(dirname(opts.json), { recursive: true }); writeFileSync(opts.json, JSON.stringify({ passed: results.length - failed, failed, results }, null, 2)); }
  console.log(`\n${results.length - failed} passed, ${failed} failed`);
  process.exit(failed ? 1 : 0);
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) main();
