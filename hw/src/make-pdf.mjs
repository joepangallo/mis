#!/usr/bin/env node
// make-pdf.mjs — handout print HTML → PDF via headless Chrome, validated with pdfinfo/pdftotext before it is
// allowed to replace the shipped handout.
//
//   node hw/src/make-pdf.mjs                       # assemble the print HTML from content/, print, validate, write
//                                                  # hw/Week 1/Application-Exercises-Week-1.pdf
//   node hw/src/make-pdf.mjs --html FILE --out FILE [--chrome PATH] [--content-dir DIR] [--keep] [--scratch DIR]
//   node hw/src/make-pdf.mjs --check FILE          # only validate an existing PDF against the content
//
// Checks: pdfinfo says Letter (612 x 792 pts); the whitespace-normalised text carries every exercise title,
// "What to hand in", every grading row and the version; every step's opening text, every expect chip, every
// terminal command, the first line of every Python snippet, every Getting-unstuck question and a "Chapter N"
// heading per chapter are present (compared with all whitespace removed, so -layout column spacing cannot hide a
// match); the hygiene regexes match neither the text nor the HTML source; no unrendered entities (&amp; &lt; …),
// no missing glyphs (U+FFFD / private-use), no sparse pages. The PASS/FAIL list is printed from the checks that
// actually ran (pdfChecks), one line per named check.
// The PDF is written to the output path only when every check passes (the previous file is left alone otherwise).
// Exit codes: 0 · 1 a check failed · 2 environment (Chrome or poppler missing, print did not produce a file).
import { spawn, execFileSync, spawnSync } from 'node:child_process';
import { mkdtempSync, rmSync, readFileSync, existsSync, mkdirSync, writeFileSync, copyFileSync, statSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { hygieneFindings, tableMarkupFindings } from './schema.mjs';
import { DEFAULTS, PDF_NAME, loadAssets, loadContent, validateAll, assemblePrint } from './build.mjs';

export const DEFAULT_CHROME = process.env.CHROME || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
export const SPARSE_PAGE_CHARS = 80;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const norm = (s) => String(s).replace(/\s+/g, ' ').trim();
const decodeEntities = (t) => t.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&nbsp;/g, ' ');
// Block-level tags become a space, inline tags (<code>, <b>, <a>…) vanish, so "(<code>miles</code>)" reads "(miles)" as printed.
const stripTags = (html) => decodeEntities(String(html).replace(/<style[\s\S]*?<\/style>/gi, ' ').replace(/<\/?(?:p|li|ul|ol|div|br|h[1-6]|tr|td|th|caption|table|thead|tbody|dt|dd|dl|pre|section|blockquote)\b[^>]*>/gi, ' ').replace(/<[^>]+>/g, ''));
// Whitespace-free comparison: pdftotext -layout pads columns and wraps lines wherever the page did.
export const squash = (s) => String(s).replace(/\s+/g, '');
export const STEP_SNIPPET_CHARS = 60;
// The opening text of a step as printed: tables are skipped (their cells come out column-wise), the first
// STEP_SNIPPET_CHARS characters otherwise; a table-only step falls back to its caption.
export function stepSnippet(html) {
  const noTables = String(html || '').replace(/<table[\s\S]*?<\/table>/gi, ' ');
  let text = norm(stripTags(noTables));
  if (!text) { const cap = /<caption[^>]*>([\s\S]*?)<\/caption>/i.exec(String(html || '')); text = cap ? norm(stripTags(cap[1])) : ''; }
  return text.slice(0, STEP_SNIPPET_CHARS);
}

class EnvError extends Error {}

function tool(name) {
  const r = spawnSync(name, ['-v'], { encoding: 'utf8' });
  if (r.error) throw new EnvError(`${name} is not installed (poppler): ${r.error.message}`);
  return name;
}

export async function printToPdf({ html, chrome = DEFAULT_CHROME, scratch, timeoutMs = 120000 }) {
  if (!existsSync(chrome)) throw new EnvError(`Chrome not found at ${chrome} (pass --chrome PATH)`);
  const htmlPath = join(scratch, 'handout.html');
  const pdfPath = join(scratch, 'handout.pdf');
  const profile = join(scratch, 'profile');
  mkdirSync(profile, { recursive: true });
  writeFileSync(htmlPath, html);
  rmSync(pdfPath, { force: true });
  const args = ['--headless', '--disable-gpu', '--no-first-run', '--no-default-browser-check', `--user-data-dir=${profile}`,
    '--run-all-compositor-stages-before-draw', '--virtual-time-budget=15000', '--no-pdf-header-footer', `--print-to-pdf=${pdfPath}`, pathToFileURL(htmlPath).href];
  const proc = spawn(chrome, args, { stdio: 'ignore' });
  let exited = false;
  proc.once('exit', () => { exited = true; });
  const t0 = Date.now();
  let stableSince = 0; let lastSize = -1;
  // Chrome sometimes lingers after writing the file: wait for the file to appear and stay the same size, then let
  // Chrome a few seconds to exit on its own before killing it.
  for (;;) {
    if (existsSync(pdfPath)) {
      const size = statSync(pdfPath).size;
      if (size > 0 && size === lastSize) { if (!stableSince) stableSince = Date.now(); } else { stableSince = 0; lastSize = size; }
      if (stableSince && (exited || Date.now() - stableSince > 5000)) break;
    }
    if (exited && !existsSync(pdfPath)) { await sleep(500); if (!existsSync(pdfPath)) throw new EnvError('Chrome exited without writing the PDF'); }
    if (Date.now() - t0 > timeoutMs) { try { proc.kill('SIGKILL'); } catch { /* gone */ } throw new EnvError(`Chrome did not finish printing within ${timeoutMs} ms`); }
    await sleep(250);
  }
  if (!exited) { try { proc.kill(); } catch { /* gone */ } await sleep(500); if (!exited) { try { proc.kill('SIGKILL'); } catch { /* gone */ } } }
  return pdfPath;
}

export function pdfInfo(pdfPath) {
  // stderr is captured, not inherited: poppler's complaint about a bad file belongs in the thrown error, not
  // interleaved into a test run's output.
  const out = execFileSync('pdfinfo', [pdfPath], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] });
  const pages = Number((/^Pages:\s+(\d+)/m.exec(out) || [])[1] || 0);
  const size = (/^Page size:\s+(.+)$/m.exec(out) || [])[1] || '';
  return { pages, size, raw: out };
}
export function pdfText(pdfPath, page) {
  const args = ['-layout'];
  if (page) args.push('-f', String(page), '-l', String(page));
  return execFileSync('pdftotext', [...args, pdfPath, '-'], { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024, stdio: ['ignore', 'pipe', 'pipe'] });
}

// Pure: every named check for a PDF given its info/text and the content it should contain → [{ name, findings }].
export function pdfChecks({ info, text, pageTexts, chapters, handout, html }) {
  const checks = [];
  const check = (name, fn) => { const out = []; fn(out); checks.push({ name, findings: out }); };
  const t = norm(text);
  const sq = squash(text);
  const has = (snippet) => sq.includes(squash(snippet));
  check('Letter page size', (out) => { if (!/^612 x 792 pts(?: \(letter\))?$/i.test(info.size.trim())) out.push(`page size is "${info.size}", expected 612 x 792 pts (Letter)`); if (info.pages < 2) out.push(`only ${info.pages} page(s)`); });
  check('every exercise title', (out) => {
    for (const c of chapters) for (const ex of c.exercises) {
      const title = norm(stripTags(ex.title));
      if (!t.includes(`Exercise ${ex.id}`)) out.push(`exercise ${ex.id} heading missing from the PDF text`);
      if (!t.includes(title)) out.push(`exercise ${ex.id} title "${title}" missing from the PDF text`);
    }
  });
  check('a "Chapter N" heading per chapter', (out) => { for (const c of chapters) if (!t.includes(`Chapter ${c.chapter}`)) out.push(`"Chapter ${c.chapter}" heading missing`); });
  check('every step\'s opening text', (out) => {
    for (const c of chapters) for (const ex of c.exercises) for (const step of ex.steps || []) {
      const snip = stepSnippet(step.html);
      if (snip && !has(snip)) out.push(`${ex.id} step ${step.label}: "${snip}" missing from the PDF text`);
    }
  });
  check('every expect chip, terminal command and Python snippet', (out) => {
    for (const c of chapters) for (const ex of c.exercises) for (const step of ex.steps || []) for (const ws of step.workspaces || []) {
      for (const chip of ws.expect || []) if (!has(chip)) out.push(`${ex.id} step ${step.label}: chip "${chip}" missing`);
      if (ws.tool === 'terminal' && !has(ws.command)) out.push(`${ex.id} step ${step.label}: terminal command "${ws.command}" missing`);
      if (ws.tool === 'python') { const first = String(ws.snippet || '').split(/\r?\n/).find((l) => l.trim()); if (first && !has(first)) out.push(`${ex.id} step ${step.label}: Python snippet line "${first}" missing`); }
    }
  });
  check('every Getting-unstuck question', (out) => {
    const dts = [];
    for (const src of [...chapters.map((c) => c.unstuck), handout.unstuck]) {
      if (Array.isArray(src)) for (const e of src) dts.push(Array.isArray(e) ? e[0] : (e && e.q));
      else if (typeof src === 'string') for (const m of src.matchAll(/<dt[^>]*>([\s\S]*?)<\/dt>/gi)) dts.push(m[1]);
    }
    for (const q of dts.filter(Boolean)) { const snip = norm(stripTags(q)).slice(0, STEP_SNIPPET_CHARS); if (!has(snip)) out.push(`Getting unstuck entry "${snip}" missing`); }
  });
  check('"What to hand in"', (out) => { if (!t.includes('What to hand in')) out.push('"What to hand in" missing'); });
  check('grading rows', (out) => {
    for (const [criterion, points] of handout.grading) {
      const crit = norm(stripTags(String(criterion)));
      if (!t.includes(crit)) out.push(`grading row "${crit}" missing`);
      if (!new RegExp(`${crit.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s+${String(points)}\\b`).test(t)) out.push(`grading row "${crit}" is not followed by its points (${points})`);
    }
  });
  check('version', (out) => { if (!t.includes(`version ${handout.version}`)) out.push(`version ${handout.version} missing`); });
  check('hygiene (text + html)', (out) => { out.push(...hygieneFindings(text, 'pdf text')); if (html != null) { out.push(...hygieneFindings(html, 'print html')); out.push(...tableMarkupFindings(html, 'print html')); } });
  check('no unrendered entities', (out) => { const ent = /&(amp|lt|gt|quot|nbsp|#\d+|#x[0-9a-f]+);/i.exec(text); if (ent) out.push(`unrendered entity "${ent[0]}" in the PDF text`); });
  check('no missing glyphs', (out) => { const glyph = /[\uFFFD\uE000-\uF8FF]/.exec(text); if (glyph) out.push(`missing glyph (U+${glyph[0].charCodeAt(0).toString(16).toUpperCase()}) in the PDF text`); });
  check('no sparse pages', (out) => { pageTexts.forEach((pt, i) => { const n = pt.replace(/\s+/g, '').length; if (n < SPARSE_PAGE_CHARS) out.push(`page ${i + 1} is sparse (${n} characters)`); }); });
  return checks;
}
// Flat list of findings (every check's findings concatenated).
export function pdfFindings(args) { return pdfChecks(args).flatMap((c) => c.findings); }

export async function validatePdf(pdfPath, { chapters, handout, html = null }) {
  const info = pdfInfo(pdfPath);
  const text = pdfText(pdfPath);
  const pageTexts = [];
  for (let p = 1; p <= info.pages; p++) pageTexts.push(pdfText(pdfPath, p));
  const checks = pdfChecks({ info, text, pageTexts, chapters, handout, html });
  return { info, checks, findings: checks.flatMap((c) => c.findings) };
}

export function parseArgs(argv) {
  const o = { chrome: DEFAULT_CHROME, html: null, out: join(DEFAULTS.weekDir, PDF_NAME), contentDir: DEFAULTS.contentDir, weekDir: DEFAULTS.weekDir, keep: false, scratch: null, check: null };
  const take = (i) => { const v = argv[i + 1]; if (v === undefined || v.startsWith('--')) throw new Error(`${argv[i]} needs a value`); return v; };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    const eq = a.indexOf('=');
    const key = eq > 0 ? a.slice(0, eq) : a;
    const val = () => (eq > 0 ? a.slice(eq + 1) : take(i++));
    switch (key) {
      case '--chrome': o.chrome = val(); break;
      case '--html': o.html = resolve(val()); break;
      case '--out': o.out = resolve(val()); break;
      case '--content-dir': o.contentDir = resolve(val()); break;
      case '--week-dir': o.weekDir = resolve(val()); break;
      case '--scratch': o.scratch = resolve(val()); break;
      case '--check': o.check = resolve(val()); break;
      case '--keep': o.keep = true; break;
      case '--help': case '-h': o.help = true; break;
      default: throw new Error(`unknown option ${a}`);
    }
  }
  return o;
}

export async function main(argv = process.argv.slice(2)) {
  let o;
  try { o = parseArgs(argv); } catch (e) { console.error(e.message); return 2; }
  if (o.help) { console.log('usage: node make-pdf.mjs [--html FILE] [--out FILE] [--chrome PATH] [--content-dir D] [--week-dir D] [--scratch D] [--keep] | --check PDF'); return 0; }
  const scratch = o.scratch || mkdtempSync(join(tmpdir(), 'hw-pdf-'));
  mkdirSync(scratch, { recursive: true });
  let code = 0;
  try {
    tool('pdfinfo'); tool('pdftotext');
    const content = await loadContent(o.contentDir);
    validateAll(content);
    let html;
    if (o.html) html = readFileSync(o.html, 'utf8');
    else {
      // --check validates an existing PDF: the embedded data files are not needed for that
      if (!o.check) loadAssets({ weekDir: o.weekDir });
      html = assemblePrint(content.chapters, content.handout);
    }
    let pdfPath = o.check;
    if (!pdfPath) {
      const t0 = Date.now();
      pdfPath = await printToPdf({ html, chrome: o.chrome, scratch });
      console.log(`printed ${pdfPath} (${statSync(pdfPath).size} bytes) in ${Math.round((Date.now() - t0) / 1000)}s`);
    }
    const { info, checks, findings } = await validatePdf(pdfPath, { chapters: content.chapters, handout: content.handout, html });
    console.log(`pdfinfo: ${info.pages} pages, ${info.size}`);
    for (const c of checks) {
      console.log(`${c.findings.length ? 'FAIL' : 'PASS'}  ${c.name}`);
      for (const f of c.findings) console.log(`      ${f}`);
    }
    if (findings.length) code = 1;
    if (!o.check && !findings.length) {
      mkdirSync(dirname(o.out), { recursive: true });
      copyFileSync(pdfPath, o.out);
      console.log(`wrote ${o.out}`);
    } else if (!o.check) console.log(`NOT written: ${o.out} left unchanged; the rejected PDF is ${o.keep ? pdfPath : 'discarded (use --keep)'}`);
  } catch (e) {
    console.error(`make-pdf: ${e instanceof EnvError ? 'environment problem — ' : ''}${e.message}`);
    code = e instanceof EnvError ? 2 : (e.message && /is invalid/.test(e.message) ? 1 : 2);
  } finally {
    if (o.keep) console.log(`scratch kept at ${scratch}`); else rmSync(scratch, { recursive: true, force: true, maxRetries: 5, retryDelay: 200 });
  }
  return code;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) main().then((c) => process.exit(c));
