/* Structural, schema, and hygiene checks over the assembled page and the data
   that produced it. Run after every build. */
import { readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";

const HERE = dirname(fileURLToPath(import.meta.url));
const SP = HERE;
const PAGE = process.argv[2] || join(HERE, "..", "module-01-managing-in-the-digital-world.html");
const IDS = ["s11a","s11b","s12a","s12b","s12c","s13","s14","s15"];

const fail = [], warn = [];
const bad = (m) => fail.push(m);
const meh = (m) => warn.push(m);

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

/* ---- activity schema ---- */
const need = (cond, msg) => { if (!cond) bad(msg); };
const OBJ = new Set(["1.1","1.2","1.3","1.4","1.5"]);
for (const [k, a] of Object.entries(ACT)) {
  const at = `${k} (${a.kind})`;
  need(a.kind, `${k}: no kind`);
  need(a.label && a.title && a.how, `${at}: missing label/title/how`);
  need(OBJ.has(a.objective), `${at}: objective is ${JSON.stringify(a.objective)}`);
  if (a.kind === "quiz") {
    need(Array.isArray(a.questions) && a.questions.length, `${at}: no questions`);
    (a.questions || []).forEach((q, i) => {
      need(Array.isArray(q.opts) && q.opts.length === 4, `${at} q${i+1}: opts is not 4`);
      need(Array.isArray(q.why) && q.why.length === 4, `${at} q${i+1}: why is not 4`);
      need(Number.isInteger(q.a) && q.a >= 0 && q.a < 4, `${at} q${i+1}: bad answer index ${q.a}`);
      (q.opts || []).forEach((o, oi) => {
        if (/\b(always|never|only|all of the above|none of the above)\b/i.test(String(o)) && oi !== q.a)
          meh(`${at} q${i+1} opt ${oi}: absolute wording may give it away`);
      });
    });
  } else if (a.kind === "sort") {
    const ids = new Set((a.buckets||[]).map(b => b.id));
    need(ids.size >= 2, `${at}: fewer than 2 buckets`);
    (a.items||[]).forEach((it, i) => need(ids.has(it.b), `${at} item ${i}: bucket "${it.b}" not declared`));
    for (const b of ids) need((a.items||[]).some(it => it.b === b), `${at}: bucket "${b}" has no items`);
  } else if (a.kind === "match") {
    (a.pairs||[]).forEach((p,i) => need(p.l && p.r, `${at} pair ${i}: missing l/r`));
    need((a.pairs||[]).length >= 4, `${at}: fewer than 4 pairs`);
  } else if (a.kind === "order") {
    need((a.steps||[]).length >= 3, `${at}: fewer than 3 steps`);
    (a.steps||[]).forEach((s,i) => need(s.t && s.why, `${at} step ${i}: missing t/why`));
  } else if (a.kind === "fill") {
    (a.blanks||[]).forEach((b,i) => {
      need(typeof b.before === "string" && typeof b.after === "string", `${at} blank ${i}: missing before/after`);
      need(Array.isArray(b.choices) && b.choices.length >= 2, `${at} blank ${i}: needs 2+ choices`);
      need(Number.isInteger(b.a) && b.a >= 0 && b.a < (b.choices||[]).length, `${at} blank ${i}: bad answer index`);
    });
  } else if (a.kind === "explore") {
    need((a.labels||[]).length === 4, `${at}: labels is not 4`);
    (a.items||[]).forEach((it,i) => need(it.name && it.what && it.real && it.absent && it.why, `${at} item ${i}: missing a facet`));
  } else if (a.kind === "diagram") {
    (a.models||[]).forEach((m,i) => {
      need(m.id && m.name && (m.boxes||[]).length && (m.points||[]).length, `${at} model ${i}: incomplete`);
      (m.boxes||[]).forEach((b,bi) => need(["a","b","c","d"].includes(b.c), `${at} model ${i} box ${bi}: c="${b.c}"`));
    });
  } else if (a.kind === "sim") {
    (a.steps||[]).forEach((s,i) => {
      const oks = (s.opts||[]).filter(o => o.ok).length;
      need(oks === 1, `${at} step ${i}: ${oks} options flagged ok (need exactly 1)`);
      (s.opts||[]).forEach((o,oi) => need(o.t && o.out, `${at} step ${i} opt ${oi}: missing t/out`));
    });
  } else if (a.kind === "selfcheck") {
    (a.items||[]).forEach((it,i) => need(it.t && it.hint, `${at} item ${i}: missing t/hint`));
  } else bad(`${at}: unknown kind`);
}

/* ---- mounts ---- */
const mounted = new Map();
const density = {};
for (const id of IDS) {
  const html = PROSE[id];
  if (!html) { bad(`PROSE.${id} missing`); continue; }
  for (const m of html.matchAll(/data-activity="([A-Za-z0-9_]+)"/g)) {
    const k = m[1];
    if (mounted.has(k)) bad(`activity ${k} mounted twice (${mounted.get(k)} and ${id})`);
    mounted.set(k, id);
    if (!ACT[k]) bad(`${id} mounts ${k}, which has no data`);
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

/* ---- glossary + final ---- */
need(GLOSSARY.length >= 45, `glossary has only ${GLOSSARY.length} terms`);
const seenTerm = new Set();
GLOSSARY.forEach(g => {
  need(g.t && g.d, `glossary entry missing t/d: ${JSON.stringify(g).slice(0,60)}`);
  if (seenTerm.has(g.t)) bad(`glossary term duplicated: ${g.t}`);
  seenTerm.add(g.t);
  if (g.d && g.t && new RegExp("^\\s*" + g.t.replace(/[.*+?^${}()|[\]\\]/g,"\\$&") + "\\b", "i").test(g.d))
    meh(`glossary "${g.t}": definition restates the term`);
});
const fq = FINAL.questions || [];
need(fq.length >= 20, `final has only ${fq.length} questions`);
const byObj = {}, byPos = {0:0,1:0,2:0,3:0};
fq.forEach((q,i) => {
  need(Array.isArray(q.opts) && q.opts.length === 4, `final q${i+1}: opts is not 4`);
  need(Array.isArray(q.why) && q.why.length === 4, `final q${i+1}: why is not 4`);
  need(Number.isInteger(q.a) && q.a >= 0 && q.a < 4, `final q${i+1}: bad answer index`);
  need(OBJ.has(q.obj), `final q${i+1}: obj is ${JSON.stringify(q.obj)}`);
  byObj[q.obj] = (byObj[q.obj]||0)+1;
  if (Number.isInteger(q.a)) byPos[q.a]++;
});
for (const o of OBJ) need((byObj[o]||0) >= 3, `final has only ${byObj[o]||0} questions for objective ${o}`);
for (const p of [0,1,2,3]) if (byPos[p] > fq.length * 0.45) meh(`final: ${byPos[p]}/${fq.length} answers sit at position ${"ABCD"[p]}`);

/* ---- rendered page hygiene ---- */
if (!existsSync(PAGE)) { bad(`page not built: ${PAGE}`); }
else {
  const page = readFileSync(PAGE, "utf8");
  const forbidden = [
    [/keiser/i, "school name"],
    [/\bCGS\s*3300\b/i, "course code"],
    [/\bsyllabus\b/i, "syllabus reference"],
    [/\brubric\b/i, "rubric reference"],
    [/\bclaude\b/i, "AI attribution"],
    [/\bgenerated by AI\b/i, "AI attribution"],
    [/\/Users\//, "local filesystem path"],
    [/\bworth \d+ points\b/i, "points"],
    [/\bthis assignment\b/i, "assignment reference"],
  ];
  /* Terms specific to a live assessment - the company named in a graded case,
     for instance - must never appear in the page, but naming them here would
     put them in version control, which is the same leak by another route. Keep
     them one per line in an untracked `src/forbidden.local.txt` instead. */
  const localList = join(SP, "forbidden.local.txt");
  if (existsSync(localList)) {
    for (const term of readFileSync(localList, "utf8").split(/\r?\n/).map((t) => t.trim()).filter(Boolean))
      forbidden.push([new RegExp("\\b" + term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "\\b", "i"), "a reserved assessment term"]);
  } else {
    meh("src/forbidden.local.txt not present - assessment-specific terms are not being checked");
  }
  for (const [re, what] of forbidden) { const m = page.match(re); if (m) bad(`page contains ${what}: ${JSON.stringify(m[0])}`); }
  need(!/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/u.test(page), "page contains emoji");
  need(page.includes('id="main"'), "no main landmark");
  need(page.includes("<noscript>"), "no noscript fallback");
  need((page.match(/class="chapter"/g)||[]).length === 10, "expected 10 chapter sections");
  need(!/<script[^>]+src=/.test(page), "page loads an external script (must be self-contained)");
  need(!/<link[^>]+stylesheet/.test(page), "page loads an external stylesheet (must be self-contained)");
  need(!/https?:\/\/(?!www\.w3\.org)/.test(page.replace(/https?:\/\/[^"'\s]*shutterstock[^"'\s]*/gi,"")), "page references an external URL");
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
