// schema.mjs — content schema helpers and validation shared by build.mjs, check.mjs and the tests.
// Zero dependencies. `table()` emits accessible table markup; `validate()` returns every problem it finds.

export const TOOLS = ['sql', 'text', 'terminal', 'python'];
export const KINDS = ['spreadsheet', 'database'];

// Student-facing hygiene: none of these may appear in any content string, page or print HTML.
export const HYGIENE = [
  [/keiser/i, 'school name'],
  [/\bCGS\s*3300\b/i, 'course code'],
  [/\/Users\//, 'local file path'],
  [/answer key/i, 'the phrase "answer key"'],
  [/instructor/i, 'the word "instructor"'],
  [/micropip|pypi|pythonhosted/i, 'a pip/PyPI reference'],
];

// Steps whose graded answer is the interpretation of a count: their chips must not state the count.
export const INTERPRETATION_CHIP_RULES = {
  's3-41-3': [/\d+\s*rows?/i, 'a row count'],
};

const WS_ID = /^[a-z][a-z0-9-]*$/;
const DB_PATH = /^[A-Za-z0-9_.\-]+(?:\/[A-Za-z0-9_.\-]+)*\.db$/;
// content.messages: noDb (Tables list / Download with no database), afterReset (status after Reset database),
// wrongName (the advice sentence of the wrong-name notice), sideDbs ({path: note} for a db a step creates on purpose)
export const MESSAGE_KEYS = ['noDb', 'afterReset', 'wrongName', 'sideDbs', 'noDbAction'];

export function escapeHtml(value) {
  return String(value == null ? '' : value).replace(/[&<>"']/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));
}

// table({ caption, head, rows }) → '<div class="tbl-wrap"><table class="tbl"><caption>…</caption><thead>…'
// Cells are escaped; pass { html: '<b>…</b>' } as a cell to insert trusted markup from content.
export function table({ caption, head, rows, className = 'tbl' }) {
  if (!caption || typeof caption !== 'string') throw new Error('table(): caption is required');
  if (!Array.isArray(head) || !head.length) throw new Error('table(): head must be a non-empty array');
  if (!Array.isArray(rows)) throw new Error('table(): rows must be an array');
  const cell = (v) => (v && typeof v === 'object' && typeof v.html === 'string') ? v.html : escapeHtml(v);
  const ths = head.map((h) => `<th scope="col">${cell(h)}</th>`).join('');
  const trs = rows.map((r) => {
    if (!Array.isArray(r) || r.length !== head.length) throw new Error(`table(): every row needs ${head.length} cells (caption "${caption}")`);
    return `<tr>${r.map((v) => `<td>${cell(v)}</td>`).join('')}</tr>`;
  }).join('');
  return `<div class="tbl-wrap"><table class="${escapeHtml(className)}"><caption>${escapeHtml(caption)}</caption><thead><tr>${ths}</tr></thead><tbody>${trs}</tbody></table></div>`;
}

// gradingTable(grading) → the grading table with a "Total per exercise" row (the sum of the points) appended.
// build.mjs uses it for the student pages and content/handout.mjs for the printed handout, so the two tables are
// identical by construction.
export function gradingTable(grading, { caption = 'Points per exercise' } = {}) {
  if (!Array.isArray(grading) || !grading.length) throw new Error('gradingTable(): grading must be a non-empty array');
  const total = grading.reduce((n, row) => n + Number(row[1]), 0);
  const rows = grading.map(([c, p]) => [c, String(p)]);
  rows.push([{ html: '<strong>Total per exercise</strong>' }, { html: `<strong>${escapeHtml(String(total))}</strong>` }]);
  return table({ caption, head: ['Criterion', 'Points'], rows });
}

export function hygieneFindings(text, label = 'text') {
  const out = [];
  const s = String(text == null ? '' : text);
  for (const [re, what] of HYGIENE) {
    const m = re.exec(s);
    if (m) out.push(`${label}: contains ${what} ("${m[0]}")`);
  }
  return out;
}

// Every <table> in a content html string must carry a <caption> and every <th> a scope attribute.
export function tableMarkupFindings(html, label = 'html') {
  const out = [];
  const s = String(html == null ? '' : html);
  const re = /<table\b[^>]*>([\s\S]*?)<\/table>/gi;
  let m; let n = 0;
  while ((m = re.exec(s))) {
    n++;
    const body = m[1];
    if (!/<caption\b/i.test(body)) out.push(`${label}: table ${n} has no <caption>`);
    const ths = body.match(/<th\b[^>]*>/gi) || [];
    for (const th of ths) if (!/\bscope\s*=\s*["'](col|row)["']/i.test(th)) out.push(`${label}: table ${n} has a <th> without scope="col"`);
  }
  if ((s.match(/<table\b/gi) || []).length !== n) out.push(`${label}: an unclosed <table>`);
  return out;
}

function isStr(x) { return typeof x === 'string'; }
function isNonEmptyStr(x) { return typeof x === 'string' && x.trim().length > 0; }

// "Getting unstuck" entries: an html string, [{ q, a }, …] or [[q, a], …] (q = symptom, a = advice; both html).
export function isValidUnstuck(u) {
  if (isStr(u)) return true;
  if (!Array.isArray(u)) return false;
  return u.every((e) => (Array.isArray(e) && e.length === 2 && isNonEmptyStr(e[0]) && isNonEmptyStr(e[1])) || (e && !Array.isArray(e) && isNonEmptyStr(e.q) && isNonEmptyStr(e.a)));
}
export function normaliseUnstuck(u) {
  if (u == null || isStr(u)) return u == null ? null : u;
  return u.map((e) => (Array.isArray(e) ? { q: e[0], a: e[1] } : { q: e.q, a: e.a }));
}

// Flatten every workspace with the labels the runtime needs: [{ id, tool, stepLabel, exerciseId, ... }]
export function collectWorkspaces(content) {
  const out = [];
  for (const ex of content.exercises || []) {
    for (const step of ex.steps || []) {
      for (const ws of step.workspaces || []) {
        out.push({ ...ws, stepLabel: String(step.label), exerciseId: ex.id, exerciseKind: ex.kind, optional: !!(ws.optional || step.optional) });
      }
    }
  }
  return out;
}

// Walk every string in the content tree (for hygiene) and report where it was found.
function* strings(value, path = 'content') {
  if (typeof value === 'string') { yield [path, value]; return; }
  if (Array.isArray(value)) { for (let i = 0; i < value.length; i++) yield* strings(value[i], `${path}[${i}]`); return; }
  if (value && typeof value === 'object') { for (const k of Object.keys(value)) yield* strings(value[k], `${path}.${k}`); }
}

export function validate(content, { allowedFiles = null } = {}) {
  const errors = [];
  const err = (m) => errors.push(m);
  if (!content || typeof content !== 'object') return { ok: false, errors: ['content is not an object'] };

  if (!isStr(content.id) || !/^chapter-\d+$/.test(content.id)) err('id must look like "chapter-1"');
  if (!Number.isInteger(content.week) || content.week < 1) err('week must be a positive integer');
  if (!Number.isInteger(content.chapter) || content.chapter < 1) err('chapter must be a positive integer');
  if (isStr(content.id) && Number.isInteger(content.chapter) && content.id !== `chapter-${content.chapter}`) err('id and chapter disagree');
  if (!isNonEmptyStr(content.title)) err('title is required');
  if (!isNonEmptyStr(content.lede)) err('lede is required');
  if (!isStr(content.primaryDb) || !DB_PATH.test(content.primaryDb) || content.primaryDb.includes('..')) err('primaryDb must be a relative path ending in .db');
  if (content.seedDb != null) {
    if (!isStr(content.seedDb) || !DB_PATH.test(content.seedDb)) err('seedDb must be null or a relative .db path');
    else if (allowedFiles && !allowedFiles.includes(content.seedDb)) err(`seedDb ${content.seedDb} is not an embedded file`);
  }
  if (!Array.isArray(content.filesShown) || !content.filesShown.every(isStr)) err('filesShown must be an array of paths');
  else if (allowedFiles) for (const f of content.filesShown) if (!allowedFiles.includes(f)) err(`filesShown: ${f} is not an embedded file`);
  if (!isNonEmptyStr(content.pythonStarter)) err('pythonStarter is required');
  const ct = content.confirmTexts;
  if (!ct || typeof ct !== 'object') err('confirmTexts {reset, clear, replace} is required');
  else for (const k of ['reset', 'clear', 'replace']) if (!isNonEmptyStr(ct[k])) err(`confirmTexts.${k} is required`);
  // messages: the short per-chapter UI strings the runtime shows (every key optional; build.mjs supplies the defaults)
  if (content.messages != null) {
    const m = content.messages;
    if (typeof m !== 'object' || Array.isArray(m)) err('messages must be an object');
    else {
      for (const k of Object.keys(m)) if (!MESSAGE_KEYS.includes(k)) err(`messages.${k} is not a known message (${MESSAGE_KEYS.join(', ')})`);
      for (const k of ['noDb', 'afterReset', 'wrongName']) if (m[k] != null && !isNonEmptyStr(m[k])) err(`messages.${k} must be a non-empty string when present`);
      // noDbAction turns the "no database yet" message into one button that runs the chapter's import for the
      // student. It must name a terminal workspace, so the button can only ever run a command the page already
      // shows in the step it belongs to.
      if (m.noDbAction != null) {
        const a = m.noDbAction;
        if (!a || typeof a !== 'object' || Array.isArray(a)) err('messages.noDbAction must be an object');
        else {
          if (!isNonEmptyStr(a.label)) err('messages.noDbAction.label must be a non-empty string');
          if (!isNonEmptyStr(a.ws)) err('messages.noDbAction.ws must name a terminal workspace');
          else {
            const target = collectWorkspaces(content).find((w) => w.id === a.ws);
            if (!target) err(`messages.noDbAction.ws "${a.ws}" is not a workspace on this page`);
            else if (target.tool !== 'terminal') err(`messages.noDbAction.ws "${a.ws}" must be a terminal workspace, not ${target.tool}`);
          }
        }
      }
      if (m.sideDbs != null) {
        if (typeof m.sideDbs !== 'object' || Array.isArray(m.sideDbs)) err('messages.sideDbs must be an object of db path → note');
        else for (const [p, t] of Object.entries(m.sideDbs)) {
          if (!DB_PATH.test(p) || p.includes('..')) err(`messages.sideDbs: "${p}" is not a relative .db path`);
          else if (p === content.primaryDb) err('messages.sideDbs must not name primaryDb');
          if (!isNonEmptyStr(t)) err(`messages.sideDbs["${p}"] must be a non-empty string`);
        }
      }
    }
  }
  if (content.exportName != null && (!isStr(content.exportName) || !/^[a-z0-9][a-z0-9-]*\.md$/.test(content.exportName))) err('exportName must look like "ch1-queries.md"');
  if (content.unstuck != null && !isValidUnstuck(content.unstuck)) err('unstuck must be an html string, an array of {q, a} or an array of [q, a] pairs');

  if (!Array.isArray(content.exercises) || !content.exercises.length) err('exercises must be a non-empty array');
  const wsIds = new Set();
  const exIds = new Set();
  let idx = 0;
  for (const ex of content.exercises || []) {
    const at = `exercises[${idx++}]`;
    if (!ex || typeof ex !== 'object') { err(`${at}: not an object`); continue; }
    if (!isNonEmptyStr(ex.id)) err(`${at}: id is required`);
    else if (exIds.has(ex.id)) err(`${at}: duplicate exercise id ${ex.id}`); else exIds.add(ex.id);
    if (!KINDS.includes(ex.kind)) err(`${at}: kind must be one of ${KINDS.join(', ')}`);
    if (!isNonEmptyStr(ex.title)) err(`${at}: title is required`);
    for (const k of ['scenario', 'data', 'submit']) if (!isNonEmptyStr(ex[k])) err(`${at}: ${k} is required`);
    if (ex.notice != null && !isStr(ex.notice)) err(`${at}: notice must be a string`);
    if (!Array.isArray(ex.steps) || !ex.steps.length) { err(`${at}: steps must be a non-empty array`); continue; }
    const labels = new Set();
    let si = 0;
    for (const step of ex.steps) {
      const sat = `${at}.steps[${si++}]`;
      if (!step || typeof step !== 'object') { err(`${sat}: not an object`); continue; }
      const label = step.label == null ? '' : String(step.label);
      if (!label.trim()) err(`${sat}: label is required`);
      else if (labels.has(label)) err(`${sat}: duplicate label "${label}" in exercise ${ex.id}`); else labels.add(label);
      if (!isStr(step.html)) err(`${sat}: html must be a string`);
      if (step.optional != null && typeof step.optional !== 'boolean') err(`${sat}: optional must be boolean`);
      if (step.workspaces == null) continue;
      if (!Array.isArray(step.workspaces)) { err(`${sat}: workspaces must be an array`); continue; }
      let wi = 0;
      for (const ws of step.workspaces) {
        const wat = `${sat}.workspaces[${wi++}]`;
        if (!ws || typeof ws !== 'object') { err(`${wat}: not an object`); continue; }
        if (!TOOLS.includes(ws.tool)) err(`${wat}: tool must be one of ${TOOLS.join(', ')}`);
        if (!isStr(ws.id) || !WS_ID.test(ws.id)) err(`${wat}: id must match ${WS_ID}`);
        else if (wsIds.has(ws.id)) err(`${wat}: duplicate workspace id ${ws.id}`); else wsIds.add(ws.id);
        if (ex.kind === 'spreadsheet' && ws.tool !== 'text') err(`${wat}: spreadsheet exercises may only carry text workspaces`);
        if (ws.tool === 'terminal' && !isNonEmptyStr(ws.command)) err(`${wat}: terminal workspace needs a command`);
        if (ws.tool === 'python' && !isNonEmptyStr(ws.snippet)) err(`${wat}: python workspace needs a snippet`);
        if (ws.tool === 'sql') {
          if (ws.starter != null && !isStr(ws.starter)) err(`${wat}: starter must be a string`);
          if (ws.placeholder != null && !isStr(ws.placeholder)) err(`${wat}: placeholder must be a string`);
        }
        if (ws.tool === 'text' && ws.rows != null && !(Number.isInteger(ws.rows) && ws.rows > 0)) err(`${wat}: rows must be a positive integer`);
        if (ws.expect != null) {
          if (!Array.isArray(ws.expect) || !ws.expect.every(isNonEmptyStr)) err(`${wat}: expect must be an array of strings`);
          else if (isStr(ws.id) && INTERPRETATION_CHIP_RULES[ws.id]) {
            const [re, what] = INTERPRETATION_CHIP_RULES[ws.id];
            for (const chip of ws.expect) if (re.test(chip)) err(`${wat}: chip "${chip}" states ${what}, which is the graded interpretation for ${ws.id}`);
          }
        }
      }
    }
  }

  for (const [path, s] of strings(content)) {
    for (const f of hygieneFindings(s, path)) err(f);
    if (/<table\b/i.test(s)) for (const f of tableMarkupFindings(s, path)) err(f);
  }
  return { ok: errors.length === 0, errors };
}

export function assertValid(content, opts) {
  const r = validate(content, opts);
  if (!r.ok) throw new Error(`content ${content && content.id ? content.id : ''} is invalid:\n  ${r.errors.join('\n  ')}`);
  return content;
}

export function validateHandout(handout) {
  const errors = [];
  if (!handout || typeof handout !== 'object') return { ok: false, errors: ['handout is not an object'] };
  if (!isStr(handout.version) || !/^\d{4}-\d{2}-\d{2}$/.test(handout.version)) errors.push('handout.version must be a YYYY-MM-DD string constant');
  if (!isNonEmptyStr(handout.front)) errors.push('handout.front (html) is required');
  if (!isNonEmptyStr(handout.back)) errors.push('handout.back (html) is required');
  if (!Array.isArray(handout.grading) || !handout.grading.length || !handout.grading.every((r) => Array.isArray(r) && r.length === 2 && isNonEmptyStr(r[0]))) errors.push('handout.grading must be [[criterion, points], …]');
  if (handout.unstuck != null && !isValidUnstuck(handout.unstuck)) errors.push('handout.unstuck must be an html string, an array of {q, a} or an array of [q, a] pairs');
  if (handout.gradingNotes != null && !isStr(handout.gradingNotes)) errors.push('handout.gradingNotes must be an html string when present');
  if (isStr(handout.back) && /Total per exercise/.test(handout.back)) errors.push('handout.back must not render the grading table itself (the build renders it from handout.grading)');
  for (const [path, s] of strings(handout, 'handout')) {
    for (const f of hygieneFindings(s, path)) errors.push(f);
    if (/<table\b/i.test(s)) for (const f of tableMarkupFindings(s, path)) errors.push(f);
  }
  return { ok: errors.length === 0, errors };
}
