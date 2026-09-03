/* Structural, schema, and hygiene checks over the assembled page and the data
   that produced it. Run after every build. */
import { readFileSync, existsSync, mkdtempSync, rmSync } from "node:fs";
import { join, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { tmpdir } from "node:os";
import { spawnSync } from "node:child_process";
import vm from "node:vm";

const HERE = dirname(fileURLToPath(import.meta.url));
const args = process.argv.slice(2);
const RELEASE = args.includes("--release");

/* `--module=<dir>` checks another module in the same shape. Without it every
   path resolves exactly where Module 1 keeps them, so its checks are unchanged. */
const modArg = args.find((a) => a.startsWith("--module="));
const SP = modArg ? join(HERE, modArg.slice("--module=".length)) : HERE;
const CFG_PATH = join(SP, "sections.json");
const CFG = existsSync(CFG_PATH) ? JSON.parse(readFileSync(CFG_PATH, "utf8")) : null;
/* Some provenance rules assert facts true only of Module 1's sources. */
const IS_M1 = !CFG || CFG.id === "01";

const pageArg = args.find((a) => !a.startsWith("--"));
const PAGE = pageArg
  ? resolve(pageArg)
  : join(HERE, "..", CFG ? CFG.outputFile : "module-01-managing-in-the-digital-world.html");
const IDS = CFG ? CFG.sections.map((s) => s.id)
                : ["s11a","s11b","s12a","s12b","s12c","s13","s14","s15","s16"];
const PREFIX = CFG ? Object.fromEntries(CFG.sections.map((s) => [s.id, s.prefix]))
                   : {s11a:"dw",s11b:"dd",s12a:"isd",s12b:"ppl",s12c:"org",s13:"dual",s14:"eth",s15:"str",s16:"ai"};

const fail = [], warn = [];
const bad = (m) => fail.push(m);
const meh = (m) => warn.push(m);
const need = (cond, msg) => { if (!cond) bad(msg); };
const nonempty = (v) => typeof v === "string" && v.trim().length > 0;
const plain = (v) => String(v == null ? "" : v).replace(/<[^>]*>/g, " ").replace(/&[A-Za-z0-9#]+;/g, " ").replace(/\s+/g, " ").trim().toLowerCase();
const distinct = (values) => new Set(values.map(plain)).size === values.length;
const words = (v) => plain(v).split(/\s+/).filter(Boolean).length;
const OBJ = new Set(CFG ? CFG.objectives : ["1.1","1.2","1.3","1.4","1.5","1.6"]);
const GIVEAWAY = /\b(?:always|all of the above|none of the above)\b|\bnever\s+(?:can|will|is|are|does|do|counts?|qualifies?)\b|\bonly\s+(?:ever|one|way)\b/i;

function readJson(name) {
  const p = join(SP, name);
  if (!existsSync(p)) { bad(`${name} missing`); return {}; }
  try { return JSON.parse(readFileSync(p, "utf8")); }
  catch (e) { bad(`${name} is not valid JSON: ${e.message}`); return {}; }
}
const MANIFEST = readJson("module.manifest.json");
const PROVENANCE = readJson("provenance.json");

/* ---- load the data exactly the way the build does ---- */
const sb = { ACT:{}, PROSE:{}, GLOSSARY:[], FINAL:{questions:[]}, console };
vm.createContext(sb);
for (const id of [...IDS, "glossary", "final"]) {
  const p = join(SP, "frag", id + ".js");
  if (!existsSync(p)) { bad(`fragment missing: ${id}.js`); continue; }
  try { vm.runInContext(readFileSync(p, "utf8"), sb, { filename: p }); }
  catch (e) { bad(`fragment ${id}.js does not evaluate: ${e.message}`); }
}
const { ACT, PROSE, GLOSSARY, FINAL } = sb;

/* ---- release manifest and source provenance ---- */
const sameArray = (a, b) => Array.isArray(a) && Array.isArray(b) && a.length === b.length && a.every((v, i) => v === b[i]);
const sameSet = (a, b) => Array.isArray(a) && Array.isArray(b) && a.length === b.length && a.every((v) => b.includes(v));
need(sameArray(MANIFEST.sections, IDS), "module.manifest.json sections do not match the required order");
need(sameArray(MANIFEST.objectives, [...OBJ]), "module.manifest.json objectives do not match the module's declared objectives");
need(sameSet(MANIFEST.activityKeys, Object.keys(ACT)), "activity keys differ from module.manifest.json");
need(MANIFEST.finalQuestionCount === (FINAL.questions || []).length, "final question count differs from module.manifest.json");
need(sameArray(MANIFEST.glossaryTerms, GLOSSARY.map((g) => g.t)), "glossary terms or their order differ from module.manifest.json");
const actualKinds = {};
Object.values(ACT).forEach((a) => { actualKinds[a.kind] = (actualKinds[a.kind] || 0) + 1; });
const kindNames = new Set([...Object.keys(actualKinds), ...Object.keys(MANIFEST.activityKinds || {})]);
need([...kindNames].every((k) => actualKinds[k] === MANIFEST.activityKinds?.[k]), "activity-kind counts differ from module.manifest.json");

need(PROVENANCE.policy && nonempty(PROVENANCE.policy.core) && nonempty(PROVENANCE.policy.supplement) && nonempty(PROVENANCE.policy.hypotheticals) && nonempty(PROVENANCE.policy.currentLaw), "provenance.json policy is incomplete");
const sourceIds = new Set(Object.keys(PROVENANCE.sources || {}));
if (IS_M1) {
  need(sourceIds.has("chapter1") && sourceIds.has("porter1985") && sourceIds.has("porterMillar1985"), "provenance.json is missing a required textbook or Porter source");
  need(sourceIds.has("ftcPrivacy") && sourceIds.has("ccpa2026"), "provenance.json is missing an official privacy source");
} else {
  need([...sourceIds].some((id) => /^chapter\d+$/.test(id)), "provenance.json names no textbook chapter source");
}
for (const [id, source] of Object.entries(PROVENANCE.sources || {})) {
  need(nonempty(source.citation), `provenance source ${id} has no citation`);
  if (source.url) {
    need(/^https:\/\//.test(source.url), `provenance source ${id} does not use HTTPS`);
    need(/^\d{4}-\d{2}-\d{2}$/.test(source.checked || ""), `provenance source ${id} has no checked date`);
  }
}
for (const obj of (IS_M1 ? ["1.1","1.2","1.3","1.4"] : [])) {
  const locator = PROVENANCE.chapterLocators?.[obj];
  need(nonempty(locator?.pdfPages) && nonempty(locator?.heading), `chapter locator ${obj} is incomplete`);
}
if (IS_M1) need(nonempty(PROVENANCE.chapterLocators?.porterReferences?.pdfPage) && nonempty(PROVENANCE.chapterLocators?.porterReferences?.heading), "Porter bibliography locator is incomplete");
for (const id of [...IDS, "glossary", "final"]) {
  const refs = (PROVENANCE.fragments || {})[id];
  need(Array.isArray(refs) && refs.length > 0, `provenance has no sources for ${id}`);
  (refs || []).forEach((ref) => need(sourceIds.has(ref), `provenance for ${id} cites unknown source ${ref}`));
}
for (const obj of OBJ) {
  const refs = (PROVENANCE.objectives || {})[obj];
  need(Array.isArray(refs) && refs.length > 0, `provenance has no sources for objective ${obj}`);
  (refs || []).forEach((ref) => need(sourceIds.has(ref), `objective ${obj} cites unknown source ${ref}`));
}
if (IS_M1) need((PROVENANCE.fragments?.s15 || []).includes("porter1985") && (PROVENANCE.fragments?.s15 || []).includes("porterMillar1985"), "strategy supplement does not cite both Porter sources");
if (IS_M1) need((PROVENANCE.fragments?.s14 || []).includes("ftcPrivacy") && (PROVENANCE.fragments?.s14 || []).includes("ccpa2026"), "privacy section does not cite both official current-law sources");
if (RELEASE) {
  const chapterKey = Object.keys(PROVENANCE.sources || {}).find((k) => /^chapter\d+$/.test(k));
  const chapterPath = PROVENANCE.sources?.[chapterKey]?.localFile;
  need(nonempty(chapterPath) && existsSync(resolve(SP, chapterPath)), "release check requires the local Chapter 1 PDF named in provenance.json");
}

/* A correct option that is reliably the longest is answerable without reading the stem at
   all. The cause is structural rather than careless: the correct option carries the
   chapter's qualifying clauses while the distractors get trimmed to a single idea. Both
   the per-question gap and the share across a pool are worth reporting, because either one
   on its own can be defended and the two together are a scoring strategy. */
const optChars = (o) => String(o).replace(/<[^>]*>/g, "").replace(/&(?:[A-Za-z]+|#\d+);/g, "x").length;
function lengthTell(label, items) {
  let longest = 0;
  for (const { q, at } of items) {
    if (!Array.isArray(q.opts) || !Number.isInteger(q.a) || !q.opts[q.a]) continue;
    const lens = q.opts.map(optChars);
    const correct = lens[q.a];
    const maxOther = Math.max(...lens.filter((_, i) => i !== q.a));
    if (correct > maxOther) longest++;
    if (correct - maxOther > 40)
      meh(`${at}: correct option is ${correct - maxOther} characters longer than the longest distractor`);
  }
  if (items.length && longest > items.length * 0.45)
    meh(`${label}: the correct option is the longest in ${longest}/${items.length} questions - long enough to be answerable without reading the stem`);
}
const inlineQuizItems = [];

/* ---- activity schema ---- */
for (const [k, a] of Object.entries(ACT)) {
  const at = `${k} (${a.kind})`;
  need(nonempty(a.kind), `${k}: no kind`);
  need(nonempty(a.label) && nonempty(a.title) && nonempty(a.how), `${at}: missing label/title/how`);
  need(OBJ.has(a.objective), `${at}: objective is ${JSON.stringify(a.objective)}`);
  if (a.kind === "quiz") {
    need(Array.isArray(a.questions) && a.questions.length, `${at}: no questions`);
    (a.questions || []).forEach((q, i) => {
      need(nonempty(q.q), `${at} q${i+1}: question is empty`);
      need(Array.isArray(q.opts) && q.opts.length === 4, `${at} q${i+1}: opts is not 4`);
      need(Array.isArray(q.why) && q.why.length === 4, `${at} q${i+1}: why is not 4`);
      need(Number.isInteger(q.a) && q.a >= 0 && q.a < 4, `${at} q${i+1}: bad answer index ${q.a}`);
      need((q.opts || []).every(nonempty), `${at} q${i+1}: an option is empty`);
      need((q.why || []).every(nonempty), `${at} q${i+1}: an explanation is empty`);
      need(distinct(q.opts || []), `${at} q${i+1}: options are not distinct`);
      need(distinct(q.why || []), `${at} q${i+1}: explanations are not distinct`);
      (q.why || []).forEach((w, wi) => need(words(w) >= 10, `${at} q${i+1} why ${wi}: explanation is too thin to teach the misconception`));
      (q.opts || []).forEach((o, oi) => {
        if (GIVEAWAY.test(String(o)) && oi !== q.a)
          meh(`${at} q${i+1} opt ${oi}: absolute wording may give it away`);
      });
      inlineQuizItems.push({ q, at: `${at} q${i+1}` });
    });
  } else if (a.kind === "sort") {
    need(Array.isArray(a.buckets) && a.buckets.length >= 2, `${at}: fewer than 2 buckets`);
    need(Array.isArray(a.items) && a.items.length >= 2, `${at}: fewer than 2 items`);
    (a.buckets || []).forEach((b, i) => need(nonempty(b.id) && nonempty(b.name) && nonempty(b.hint), `${at} bucket ${i}: missing id/name/hint`));
    const ids = new Set((a.buckets||[]).map(b => b.id));
    need(ids.size >= 2, `${at}: fewer than 2 buckets`);
    need(ids.size === (a.buckets || []).length, `${at}: duplicate bucket id`);
    need(distinct((a.buckets || []).map((b) => b.name)), `${at}: duplicate bucket name`);
    (a.items||[]).forEach((it, i) => {
      need(nonempty(it.t) && nonempty(it.why), `${at} item ${i}: missing t/why`);
      need(ids.has(it.b), `${at} item ${i}: bucket "${it.b}" not declared`);
    });
    need(distinct((a.items || []).map((it) => it.t)), `${at}: duplicate item text`);
    for (const b of ids) need((a.items||[]).some(it => it.b === b), `${at}: bucket "${b}" has no items`);
  } else if (a.kind === "match") {
    (a.pairs||[]).forEach((p,i) => need(nonempty(p.l) && nonempty(p.r) && nonempty(p.why), `${at} pair ${i}: missing l/r/why`));
    need((a.pairs||[]).length >= 4, `${at}: fewer than 4 pairs`);
    need(distinct((a.pairs || []).map((p) => p.l)), `${at}: duplicate left-side match`);
    need(distinct((a.pairs || []).map((p) => p.r)), `${at}: duplicate right-side match`);
  } else if (a.kind === "order") {
    need((a.steps||[]).length >= 3, `${at}: fewer than 3 steps`);
    (a.steps||[]).forEach((s,i) => need(nonempty(s.t) && nonempty(s.why), `${at} step ${i}: missing t/why`));
    need(distinct((a.steps || []).map((s) => s.t)), `${at}: duplicate step text`);
  } else if (a.kind === "fill") {
    need(Array.isArray(a.blanks) && a.blanks.length > 0, `${at}: no blanks`);
    (a.blanks||[]).forEach((b,i) => {
      need(typeof b.before === "string" && typeof b.after === "string", `${at} blank ${i}: missing before/after`);
      need(Array.isArray(b.choices) && b.choices.length >= 2, `${at} blank ${i}: needs 2+ choices`);
      need((b.choices || []).every(nonempty) && distinct(b.choices || []), `${at} blank ${i}: choices must be nonempty and distinct`);
      need(Number.isInteger(b.a) && b.a >= 0 && b.a < (b.choices||[]).length, `${at} blank ${i}: bad answer index`);
      need(nonempty(b.why), `${at} blank ${i}: missing why`);
    });
  } else if (a.kind === "explore") {
    need((a.labels||[]).length === 4, `${at}: labels is not 4`);
    need((a.labels || []).every(nonempty) && distinct(a.labels || []), `${at}: labels must be nonempty and distinct`);
    need(Array.isArray(a.items) && a.items.length > 0, `${at}: no items`);
    (a.items||[]).forEach((it,i) => need(nonempty(it.icon) && nonempty(it.name) && nonempty(it.sub) && nonempty(it.what) && nonempty(it.real) && nonempty(it.absent) && nonempty(it.why), `${at} item ${i}: missing icon/name/sub/facet`));
    need(distinct((a.items || []).map((it) => it.name)), `${at}: duplicate item name`);
  } else if (a.kind === "diagram") {
    need(Array.isArray(a.models) && a.models.length > 0, `${at}: no models`);
    (a.models||[]).forEach((m,i) => {
      need(nonempty(m.id) && nonempty(m.name) && nonempty(m.site) && (m.boxes||[]).length && (m.points||[]).length, `${at} model ${i}: incomplete`);
      (m.boxes||[]).forEach((b,bi) => {
        need(["a","b","c","d"].includes(b.c), `${at} model ${i} box ${bi}: c="${b.c}"`);
        need(nonempty(b.t) && nonempty(b.w), `${at} model ${i} box ${bi}: missing t/w`);
      });
      need((m.points || []).every(nonempty), `${at} model ${i}: empty point`);
    });
    need(distinct((a.models || []).map((m) => m.id)), `${at}: duplicate model id`);
    need(distinct((a.models || []).map((m) => m.name)), `${at}: duplicate model name`);
  } else if (a.kind === "sim") {
    need(Array.isArray(a.steps) && a.steps.length > 0, `${at}: no steps`);
    (a.steps||[]).forEach((s,i) => {
      need(nonempty(s.situation), `${at} step ${i}: missing situation`);
      need(Array.isArray(s.opts) && s.opts.length >= 2, `${at} step ${i}: fewer than 2 options`);
      const oks = (s.opts||[]).filter(o => o.ok).length;
      need(oks === 1, `${at} step ${i}: ${oks} options flagged ok (need exactly 1)`);
      (s.opts||[]).forEach((o,oi) => need(nonempty(o.t) && nonempty(o.out), `${at} step ${i} opt ${oi}: missing t/out`));
      need(distinct((s.opts || []).map((o) => o.t)), `${at} step ${i}: duplicate option text`);
      need(distinct((s.opts || []).map((o) => o.out)), `${at} step ${i}: duplicate outcomes`);
    });
  } else if (a.kind === "formula") {
    need(Array.isArray(a.headers) && a.headers.length >= 2, `${at}: needs a headers row`);
    need(Array.isArray(a.data) && a.data.length >= 2, `${at}: needs at least two data rows`);
    (a.data || []).forEach((row, i) => need(Array.isArray(row) && row.length === (a.headers || []).length,
      `${at} row ${i}: has ${(row || []).length} cells, headers declare ${(a.headers || []).length}`));
    need(Array.isArray(a.tasks) && a.tasks.length, `${at}: no tasks`);
    (a.tasks || []).forEach((t, i) => {
      need(nonempty(t.prompt), `${at} task ${i}: no prompt`);
      need(nonempty(t.expect) && /^=/.test(t.expect.trim()), `${at} task ${i}: expect must be a formula starting with =`);
      need(Number.isInteger(t.column) && t.column >= 0 && t.column < (a.headers || []).length,
        `${at} task ${i}: column ${t.column} is outside the sheet`);
      need(nonempty(t.explain), `${at} task ${i}: no explanation for a correct answer`);
      need(nonempty(t.hint), `${at} task ${i}: no hint for a wrong answer`);
    });
  } else if (a.kind === "code") {
    need(Array.isArray(a.exercises) && a.exercises.length, `${at}: no exercises`);
    (a.exercises || []).forEach((ex, i) => {
      need(nonempty(ex.prompt), `${at} exercise ${i}: no prompt`);
      need(nonempty(ex.starter), `${at} exercise ${i}: no starter stub`);
      need(nonempty(ex.solution), `${at} exercise ${i}: no reference solution`);
      need(nonempty(ex.hint), `${at} exercise ${i}: no hint for a failing attempt`);
      need(nonempty(ex.explain), `${at} exercise ${i}: no explanation for a passing attempt`);
      need(Array.isArray(ex.tests) && ex.tests.length >= 3, `${at} exercise ${i}: needs at least three tests`);
      (ex.tests || []).forEach((t, ti) => {
        need(nonempty(t.call), `${at} exercise ${i} test ${ti}: no call`);
        need("expect" in t, `${at} exercise ${i} test ${ti}: no expected value`);
      });
      need(String(ex.starter) !== String(ex.solution), `${at} exercise ${i}: the stub gives the answer away`);
    });
  } else if (a.kind === "sql") {
    need(a.tables && Object.keys(a.tables).length, `${at}: no tables`);
    for (const [tn, t] of Object.entries(a.tables || {})) {
      need(Array.isArray(t.rows) && t.rows.length >= 3, `${at}: table ${tn} needs at least three rows`);
      const cols = Object.keys(t.rows[0] || {});
      need(cols.length >= 2, `${at}: table ${tn} needs at least two columns`);
      (t.rows || []).forEach((r, i) => need(Object.keys(r).length === cols.length,
        `${at}: table ${tn} row ${i} has different columns from the first row`));
    }
    need(Array.isArray(a.tasks) && a.tasks.length, `${at}: no tasks`);
    (a.tasks || []).forEach((t, i) => {
      need(nonempty(t.prompt), `${at} task ${i}: no prompt`);
      need(nonempty(t.expect) && /^\s*SELECT\b/i.test(t.expect), `${at} task ${i}: expect must be a SELECT query`);
      need(nonempty(t.explain), `${at} task ${i}: no explanation for a correct answer`);
      need(nonempty(t.hint), `${at} task ${i}: no hint for a wrong answer`);
    });
  } else if (a.kind === "selfcheck") {
    need(Array.isArray(a.items) && a.items.length > 0, `${at}: no items`);
    (a.items||[]).forEach((it,i) => need(nonempty(it.t) && nonempty(it.hint), `${at} item ${i}: missing t/hint`));
    need(distinct((a.items || []).map((it) => it.t)), `${at}: duplicate item text`);
  } else bad(`${at}: unknown kind`);
}

/* ---- mounts ---- */
const mounted = new Map();
const density = {};
const ALLOWED_PROSE_CLASSES = new Set(["lede","card","grid","g2","g3","g4","callout","tip","warn","info","exam","eyebrow","tagline","tbl-wrap","tbl","mini","pill","chip","hint","service-card","list-tight","wide","term","keys","steps","split","takeaway","activity"]);
const SECTION_OBJECTIVE = CFG ? Object.fromEntries(CFG.sections.map((s) => [s.id, s.objective]))
  : {s11a:"1.1",s11b:"1.1",s12a:"1.2",s12b:"1.2",s12c:"1.2",s13:"1.3",s14:"1.4",s15:"1.5",s16:"1.6"};
for (const id of IDS) {
  const html = PROSE[id];
  if (!html) { bad(`PROSE.${id} missing`); continue; }
  const refs = [...html.matchAll(/data-activity="([A-Za-z0-9_]+)"/g)];
  const canonical = [...html.matchAll(/<div class="activity" data-activity="([A-Za-z0-9_]+)"><\/div>/g)];
  need(refs.length === canonical.length, `${id}: every activity mount must use the exact empty canonical div`);
  for (const m of canonical) {
    const k = m[1];
    if (mounted.has(k)) bad(`activity ${k} mounted twice (${mounted.get(k)} and ${id})`);
    mounted.set(k, id);
    if (!ACT[k]) bad(`${id} mounts ${k}, which has no data`);
    need(k.startsWith(PREFIX[id]), `${id} mounts ${k}, which does not use its ${PREFIX[id]} prefix`);
    if (ACT[k]) need(ACT[k].objective === SECTION_OBJECTIVE[id], `${id} mounts ${k} with objective ${ACT[k].objective}`);
  }
  for (const cm of html.matchAll(/\bclass="([^"]*)"/g)) {
    for (const token of cm[1].trim().split(/\s+/).filter(Boolean))
      need(ALLOWED_PROSE_CLASSES.has(token), `${id}: prose uses unapproved class "${token}"`);
  }
  const words = html.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;
  if (words < 700) meh(`${id}: only ${words} words of prose`);

  /* Readability: the page should alternate short prose with real lists rather
     than running as a wall of either one. */
  const paras = [...html.matchAll(/<p(?: class="[^"]*")?>([\s\S]*?)<\/p>/g)]
    .map((m) => m[1].replace(/<[^>]+>/g, "").trim())
    .filter(Boolean);
  const wc = (t) => t.split(/\s+/).filter(Boolean).length;
  const longest = paras.reduce((n, t) => Math.max(n, wc(t)), 0);
  const over90 = paras.filter((t) => wc(t) > 90).length;
  const items = (html.match(/<li>/g) || []).length;
  const listWords = [...html.matchAll(/<li>([\s\S]*?)<\/li>/g)]
    .reduce((n, m) => n + wc(m[1].replace(/<[^>]+>/g, "")), 0);
  const share = words ? Math.round((listWords / words) * 100) : 0;
  density[id] = { paras: paras.length, items, longest, over90, share };

  if (longest > 130) bad(`${id}: a paragraph runs ${longest} words — split it or make it a list`);
  else if (over90) meh(`${id}: ${over90} paragraph(s) over 90 words (longest ${longest})`);
  if (items === 0) bad(`${id}: no list items at all — the section is a wall of prose`);
  if (share > 65) bad(`${id}: ${share}% of the body is list items — over-bulleted, restore some prose`);
  else if (share < 20) meh(`${id}: only ${share}% of the body is list items`);

  /* A list needs a prose lead-in, and two lists must not sit back to back. */
  const stacked = (html.match(/<\/[uo]l>\s*<[uo]l/g) || []).length;
  if (stacked) bad(`${id}: ${stacked} list(s) immediately follow another list with no prose between`);
  const headingOnList = (html.match(/<\/h[234]>\s*<[uo]l/g) || []).length;
  if (headingOnList) bad(`${id}: ${headingOnList} list(s) sit directly under a heading with no lead-in sentence`);
  /* A genuine nested list opens a <ul>/<ol> before its <li> closes. Matching on
     mere proximity counts the next sibling list as nested, which it is not. */
  const nested = (html.match(/<li>(?:(?!<\/li>)[\s\S])*?<[uo]l/g) || []).length;
  if (nested) meh(`${id}: ${nested} nested list(s) — flatten if possible`);
  const takeaways = (html.match(/class="takeaway"/g) || []).length;
  if (takeaways > 2) meh(`${id}: ${takeaways} takeaway paragraphs (keep it to two)`);

  /* Bullets must stay full thoughts, not compressed fragments. */
  /* A short item is fine in a `split` list of parallel options, and a defect in a
     `keys` list, whose whole job is name-then-explanation. Judge them apart. */
  const keysBlocks = [...html.matchAll(/<ul class="keys">([\s\S]*?)<\/ul>/g)].map((m) => m[1]);
  const keyStubs = keysBlocks
    .flatMap((b) => [...b.matchAll(/<li>([\s\S]*?)<\/li>/g)].map((m) => m[1]))
    .map((t) => t.replace(/<[^>]+>/g, "").trim())
    .filter((t) => wc(t) > 0 && wc(t) < 10);
  if (keyStubs.length) bad(`${id}: ${keyStubs.length} key-list item(s) are bare fragments, e.g. ${JSON.stringify(keyStubs[0].slice(0, 60))}`);
  const noLead = keysBlocks.length && !/<b>|<strong>/.test(keysBlocks[0].slice(0, 40));
  if (noLead) meh(`${id}: first key-list item does not open with a bolded name`);
}
for (const k of Object.keys(ACT)) if (!mounted.has(k)) bad(`activity ${k} is never mounted`);
for (const sup of (CFG ? (CFG.supplements || []) : ["s15", "s16"])) {
  need(/Application supplement/i.test(PROSE[sup] || ""), `${sup} is not visibly labeled as an application supplement`);
  need(/hypothetical/i.test(PROSE[sup] || ""), `${sup} does not identify its practice situation as hypothetical`);
}
need(/hypothetical/i.test(FINAL.how || ""), "final challenge does not identify its invented practice situations as hypothetical");
need(!/Harborline/i.test(JSON.stringify({ACT, PROSE, FINAL})), "fictional Harborline company remains in student-facing source");

/* ---- glossary + final ---- */
need(GLOSSARY.length === MANIFEST.glossaryTerms?.length, `glossary has ${GLOSSARY.length} terms; manifest requires ${MANIFEST.glossaryTerms?.length}`);
const seenTerm = new Set();
GLOSSARY.forEach(g => {
  need(nonempty(g.t) && nonempty(g.d) && nonempty(g.e), `glossary entry missing t/d/e: ${JSON.stringify(g).slice(0,60)}`);
  const supplementObjectives = CFG
    ? new Set((CFG.supplements || []).map((id) => SECTION_OBJECTIVE[id]))
    : new Set(["1.5", "1.6"]);
  need(OBJ.has(g.lo) && !supplementObjectives.has(g.lo), `glossary "${g.t}" has invalid chapter objective ${JSON.stringify(g.lo)}`);
  const termKey = plain(g.t);
  if (seenTerm.has(termKey)) bad(`glossary term duplicated: ${g.t}`);
  seenTerm.add(termKey);
  if (g.d && g.t && new RegExp("^\\s*" + g.t.replace(/[.*+?^${}()|[\]\\]/g,"\\$&") + "\\b", "i").test(g.d))
    meh(`glossary "${g.t}": definition restates the term`);
});
const fq = FINAL.questions || [];
need(fq.length === MANIFEST.finalQuestionCount, `final has ${fq.length} questions; manifest requires ${MANIFEST.finalQuestionCount}`);
const byObj = {}, byPos = {0:0,1:0,2:0,3:0};
fq.forEach((q,i) => {
  need(nonempty(q.q), `final q${i+1}: question is empty`);
  need(Array.isArray(q.opts) && q.opts.length === 4, `final q${i+1}: opts is not 4`);
  need(Array.isArray(q.why) && q.why.length === 4, `final q${i+1}: why is not 4`);
  need((q.opts || []).every(nonempty) && distinct(q.opts || []), `final q${i+1}: options must be nonempty and distinct`);
  need((q.why || []).every(nonempty) && distinct(q.why || []), `final q${i+1}: explanations must be nonempty and distinct`);
  (q.why || []).forEach((w, wi) => need(words(w) >= 10, `final q${i+1} why ${wi}: explanation is too thin to teach the misconception`));
  need(Number.isInteger(q.a) && q.a >= 0 && q.a < 4, `final q${i+1}: bad answer index`);
  need(OBJ.has(q.obj), `final q${i+1}: obj is ${JSON.stringify(q.obj)}`);
  (q.opts || []).forEach((o, oi) => {
    if (GIVEAWAY.test(String(o)) && oi !== q.a)
      meh(`final q${i+1} opt ${oi}: absolute wording may give it away`);
  });
  byObj[q.obj] = (byObj[q.obj]||0)+1;
  if (Number.isInteger(q.a)) byPos[q.a]++;
});
for (const o of OBJ) need((byObj[o]||0) === MANIFEST.finalByObjective?.[o], `final has ${byObj[o]||0} questions for objective ${o}; manifest requires ${MANIFEST.finalByObjective?.[o]}`);
for (const p of [0,1,2,3]) if (byPos[p] > fq.length * 0.45) meh(`final: ${byPos[p]}/${fq.length} answers sit at position ${"ABCD"[p]}`);
for (const o of OBJ) if ((byObj[o] || 0) < 4) meh(`final: objective ${o} carries only ${byObj[o] || 0} question(s) - too few to tell a weak area from a lucky guess`);
lengthTell("final", fq.map((q, i) => ({ q, at: `final q${i+1}` })));
lengthTell("inline quizzes", inlineQuizItems);

/* ---- rendered page hygiene ---- */
let freshPage = null;
const scratch = mkdtempSync(join(tmpdir(), "mis-check-"));
const freshPath = join(scratch, "module.html");
try {
  const buildArgs = [join(HERE, "build.mjs")];
  if (modArg) buildArgs.push(modArg);
  buildArgs.push(freshPath);
  const built = spawnSync(process.execPath, buildArgs, {encoding:"utf8", maxBuffer:10_000_000});
  if (built.status !== 0) bad(`fresh build failed:\n${(built.stderr || built.stdout || "no output").trim()}`);
  else freshPage = readFileSync(freshPath, "utf8");
} finally {
  rmSync(scratch, {recursive:true, force:true});
}

if (!existsSync(PAGE)) { bad(`page not built: ${PAGE}`); }
else {
  const page = readFileSync(PAGE, "utf8");
  if (freshPage != null) need(page === freshPage, `generated page is stale; run node src/build.mjs${modArg ? " " + modArg : ""}`);
  const forbidden = [
    [/keiser/i, "school name"],
    [/\bCGS\s*3300\b/i, "course code"],
    [/\bsyllabus\b/i, "syllabus reference"],
    [/\brubric\b/i, "rubric reference"],
    [/\b(?:written|created|generated|assisted|produced)\s+(?:with|by)\s+(?:AI|ChatGPT|Claude|OpenAI|Codex)\b/i, "AI attribution"],
    [/\bAI[- ]generated\b/i, "AI attribution"],
    [/\/Users\//, "local filesystem path"],
    [/[A-Za-z]:\\(?:Users|Documents|Desktop)\\/i, "local filesystem path"],
    [/\bfile:\/\//i, "local file URL"],
    [/\bHarborline\b/i, "invented company name"],
    [/\bworth \d+ points\b/i, "points"],
    [/\b\d+\s*points?\b/i, "point value"],
    [/\bthis assignment\b/i, "assignment reference"],
  ];
  /* Terms specific to a live assessment - the company named in a graded case,
     for instance - must never appear in the page, but naming them here would
     put them in version control, which is the same leak by another route. Keep
     them one per line in an untracked `src/forbidden.local.txt` instead. */
  const localList = [join(SP, "forbidden.local.txt"), join(HERE, "forbidden.local.txt")]
    .find((p) => existsSync(p)) || join(HERE, "forbidden.local.txt");
  if (existsSync(localList)) {
    for (const term of readFileSync(localList, "utf8").split(/\r?\n/).map((t) => t.trim()).filter(Boolean))
      forbidden.push([new RegExp("\\b" + term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "\\b", "i"), "a reserved assessment term"]);
  } else {
    if (RELEASE) bad("release check requires src/forbidden.local.txt");
    else meh("src/forbidden.local.txt not present - assessment-specific terms are not being checked");
  }
  for (const [re, what] of forbidden) { const m = page.match(re); if (m) bad(`page contains ${what}: ${JSON.stringify(m[0])}`); }
  need(!/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/u.test(page), "page contains emoji");
  need(page.includes('id="main"'), "no main landmark");
  need(page.includes("<noscript>"), "no noscript fallback");
  need((page.match(/class="chapter"/g)||[]).length === IDS.length + 2, `expected ${IDS.length + 2} chapter sections`);
  need(!/<script\b[^>]*\bsrc\s*=/i.test(page), "page loads a script by src (must be self-contained)");
  need(!/<link\b/i.test(page), "page contains a link element (styles and icons must be self-contained)");
  need(!/<base\b/i.test(page), "page contains a base element that can redirect local links");
  need(!/https?:\/\//i.test(page), "page references an external URL");
  need(!/@import\b/i.test(page), "page CSS contains @import");
  need(!/@font-face\b/i.test(page), "page embeds a custom font instead of using the self-contained system stack");
  /* A url() must be a data: URI. Rejecting only http:// and // let a *relative* url()
     through - in module.css or in an inline style attribute - and a relative url() names a
     file that does not travel beside a single-file page, so the flash-drive copy renders
     without it and no error is reported anywhere. */
  for (const m of page.matchAll(/(?<![\w-])url\(\s*(["']?)([^"')]*)\1\s*\)/gi)) {
    const value = m[2].trim();
    if (!/^data:/i.test(value)) bad(`page CSS contains a url() that is not a data: URI: ${JSON.stringify(value.slice(0, 100))}`);
  }
  need(!/\b(?:fetch|XMLHttpRequest|WebSocket|EventSource)\s*\(/.test(page), "page runtime contains a network API call");
  need(!/\.sendBeacon\s*\(/.test(page), "page runtime contains a beacon call");
  /* The reader's own formula, query and code text is quoted back inside the evaluators' error messages, a
     SELECT alias becomes a result header, and a failing test prints whatever the reader's own function returned
     or threw. Those strings reach innerHTML, so they must be escaped: txt() passes
     HTML through on purpose, for authored labels. Escaping the wrong one re-breaks entities; escaping neither
     lets a reader inject markup into their own page, and every local page shares one storage origin. */
  for (const [sink, what] of [
    [/txt\(errText\)/, "the spreadsheet evaluator's error text"],
    [/txt\(e\.message\)/, "the SQL evaluator's error text"],
    [/el\("th", null, txt\(h\)\)/, "SQL result headers, which carry reader-chosen aliases"],
    [/txt\(payload\.fatal\)/, "the code runner's fatal message"],
    [/"your code returned " \+ showValue\(r\.got\)/, "the value the reader's own function returned"],
    [/"threw: " \+ txt\(r\.err\)/, "the message the reader's own function threw"],
  ]) if (sink.test(page)) bad(`page renders ${what} with txt() instead of escHtml() — reader input can inject markup`);
  need(/function escHtml\(/.test(page), "page runtime is missing the escHtml() helper that escapes reader input");
  /* The rules above are negative: they catch the old unescaped expression coming back. On their own a rename
     (errText, payload.fatal, r.err) would slip past them, so each site is also asserted positively. A rename is
     then forced to update this list, which is the point — the list is the record of which strings are reader
     input. */
  for (const [present, what] of [
    [/escHtml\(errText\)/, "spreadsheet evaluator error text"],
    [/escHtml\(e\.message\)/, "SQL evaluator error text"],
    [/el\("th", null, escHtml\(h\)\)/, "SQL result headers"],
    [/escHtml\(payload\.fatal\)/, "code runner fatal message"],
    [/escHtml\(showValue\(r\.got\)\)/, "value the reader's function returned"],
    [/escHtml\(r\.err\)/, "message the reader's function threw"],
  ]) need(present.test(page), `page no longer escapes ${what} — if this moved or was renamed, update this list`);
  for (const m of page.matchAll(/\b(?:src|href|poster|data|action|formaction)\s*=\s*(["'])(.*?)\1/gi)) {
    const value = m[2].trim();
    if (value && !value.startsWith("#") && !value.startsWith("data:")) bad(`page attribute contains a non-local reference: ${JSON.stringify(value.slice(0,100))}`);
  }
  /* srcset is a comma-separated candidate list, so it needs splitting before each URL is
     judged; left unchecked it was a live network request the rest of these rules could not see. */
  for (const m of page.matchAll(/\bsrcset\s*=\s*(["'])(.*?)\1/gi)) {
    for (const candidate of m[2].split(",")) {
      const value = candidate.trim().split(/\s+/)[0] || "";
      if (value && !value.startsWith("#") && !value.startsWith("data:")) bad(`page srcset contains a non-local reference: ${JSON.stringify(value.slice(0,100))}`);
    }
  }
  need(!/<div class="activity" data-activity=/i.test(page), "a raw source activity mount survived the build");
  for (const key of MANIFEST.activityKeys || []) {
    const safe = key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    need((page.match(new RegExp(`<section class="activity" data-activity="${safe}"`, "g")) || []).length === 1, `built fallback for ${key} is not present exactly once`);
    need((page.match(new RegExp(`id="act-${safe}"`, "g")) || []).length === 1, `built activity title for ${key} is not present exactly once`);
  }
  need((page.match(/<section class="activity" id="finalMount"/g) || []).length === 1, "final challenge mount is not present exactly once");
  need((page.match(/<b>Lesson and answer summary<\/b>/g) || []).length === Object.keys(ACT).length, "JavaScript-free activity summaries are incomplete");
  need((page.match(/<b>Answer key<\/b>/g) || []).length === 1, "JavaScript-free final answer key is missing or duplicated");
  need(page.includes('aria-label="Module completion progress"'), "progress meter is not labeled as completion");
  need(page.includes('stage.setAttribute("role", "tabpanel")'), "diagram runtime lacks tabpanel semantics");
  need(page.includes('toggle.setAttribute("aria-controls", detail.id)'), "explore runtime lacks aria-controls");
  need(page.includes('sidebar.setAttribute("inert", "")'), "closed mobile navigation is not removed from keyboard focus");
  need(page.includes('var outcomes = el("div", "sim-outcomes")'), "simulations do not reveal all option outcomes");
  need(page.includes('if(finalEntry){ finalEntry.total = qs.length; }'), "final registry entry is not guarded against reset duplication");
  const ids = new Map();
  for (const m of page.matchAll(/\sid="([^"]+)"/g)) ids.set(m[1], (ids.get(m[1]) || 0) + 1);
  for (const [id, count] of ids) if (count > 1) bad(`built page has duplicate id "${id}" (${count} times)`);
  const opens = (page.match(/<section/g)||[]).length, closes = (page.match(/<\/section>/g)||[]).length;
  need(opens === closes, `unbalanced <section> tags: ${opens} open, ${closes} close`);
  const dopens = (page.match(/<div/g)||[]).length, dcloses = (page.match(/<\/div>/g)||[]).length;
  need(dopens === dcloses, `unbalanced <div> tags: ${dopens} open, ${dcloses} close`);
}

console.log(`activities: ${Object.keys(ACT).length}   glossary: ${GLOSSARY.length}   final: ${fq.length}   final by objective: ${JSON.stringify(byObj)}   answer positions: ${JSON.stringify(byPos)}`);
console.log("\nreadability by section (paragraphs / list items / longest paragraph / list share):");
for (const [id, d] of Object.entries(density))
  console.log(`  ${id.padEnd(6)} ${String(d.paras).padStart(3)} paras  ${String(d.items).padStart(3)} items  longest ${String(d.longest).padStart(3)}w  ${String(d.share).padStart(2)}% list`);
if (warn.length) { console.log(`\n${warn.length} warning(s):`); warn.forEach(w => console.log("  ~ " + w)); }
if (fail.length) { console.log(`\n${fail.length} FAILURE(s):`); fail.forEach(f => console.log("  ! " + f)); process.exitCode = 1; }
else console.log("\nAll structural checks passed.");
