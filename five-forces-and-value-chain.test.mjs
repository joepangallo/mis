/* Contract tests for the self-contained Five Forces and Value Chain review.
 *
 * Node standard library only — there is no package.json in this repository and
 * the page deliberately has no dependencies of its own.
 *
 * The page keeps every piece of teaching data in two declaration-only inline
 * scripts, so the tests evaluate those two blocks whole in a sandbox rather
 * than regex-parsing individual fields, which would break the moment a case
 * brief contained a brace or a quotation mark.
 *
 * Run: node --test five-forces-and-value-chain.test.mjs
 */
import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = dirname(fileURLToPath(import.meta.url));
const PAGE = "five-forces-and-value-chain.html";
const html = readFileSync(join(ROOT, PAGE), "utf8");

const FORCE_IDS = ["rivalry", "entrants", "buyers", "suppliers", "substitutes"];

/* ============================================================================
   EXTRACTION
   ========================================================================== */
function inlineScripts(source){
  return [...source.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/gi)].map(m => m[1]);
}

/* The data blocks are the ones opening with the FORCES and QUIZ declarations.
   Evaluating them together yields every dataset the page teaches from. */
function pageData(){
  const blocks = inlineScripts(html);
  const dataBlocks = blocks.filter(b => /^\s*\/\*[\s\S]*?\*\/\s*var (FORCES|QUIZ)\b/.test(b) ||
                                        /\bvar (FORCES|QUIZ) =/.test(b) && !/document\./.test(b));
  assert.equal(dataBlocks.length, 2, "expected exactly two declaration-only data blocks");
  return new Function(
    `"use strict";\n${dataBlocks.join("\n")}\n` +
    "return { FORCES, DRIVERS, SCENARIOS, EVIDENCE, CHAIN, SIM_OPTIONS, PLACEMENTS, CASES, QUIZ, GLOSSARY };"
  )();
}

const data = pageData();
const chainIds = data.CHAIN.map(a => a.id);
const nonEmpty = v => typeof v === "string" && v.trim().length > 0;
const band = avg => avg < 2 ? "Weak" : (avg < 3.5 ? "Moderate" : "Strong");
const avg = list => list.reduce((a, b) => a + b, 0) / list.length;

/* ============================================================================
   THE FIVE FORCES
   ========================================================================== */
test("all five forces are present, once each, and fully described", () => {
  assert.deepEqual(data.FORCES.map(f => f.id).sort(), [...FORCE_IDS].sort());
  for(const f of data.FORCES){
    assert.ok(nonEmpty(f.name) && nonEmpty(f.question) && nonEmpty(f.means),
      `${f.id} is missing its name, question or definition`);
    assert.ok(f.strongWhen.length >= 3, `${f.id} needs at least three "strong when" signals`);
    assert.ok(f.systems.length >= 2, `${f.id} needs at least two answering systems`);
    assert.ok(nonEmpty(f.internet), `${f.id} must say what the internet did to it`);
    assert.ok(nonEmpty(f.confuse), `${f.id} must say what it is confused with`);
  }
});

test("exactly one force occupies the centre of the diagram", () => {
  assert.equal(data.FORCES.filter(f => f.pos === "mid").length, 1);
  assert.deepEqual(data.FORCES.map(f => f.pos).sort(), ["buy", "ent", "mid", "sub", "sup"]);
});

test("every force is rated from four drivers", () => {
  assert.deepEqual(Object.keys(data.DRIVERS).sort(), [...FORCE_IDS].sort());
  for(const id of FORCE_IDS){
    assert.equal(data.DRIVERS[id].length, 4, `${id} must have four drivers`);
    for(const d of data.DRIVERS[id]) assert.ok(nonEmpty(d));
  }
});

/* ============================================================================
   RATER SCENARIOS
   ========================================================================== */
test("each scenario rates all five forces on a 0-5 scale", () => {
  assert.ok(data.SCENARIOS.length >= 4, "at least four situations to rate");
  for(const s of data.SCENARIOS){
    assert.ok(nonEmpty(s.brief) && s.brief.split(/\s+/).length >= 40,
      `${s.id}: the brief must carry enough evidence to rate from`);
    assert.deepEqual(Object.keys(s.analyst).sort(), [...FORCE_IDS].sort());
    for(const id of FORCE_IDS){
      assert.equal(s.analyst[id].length, 4, `${s.id}/${id}: one value per driver`);
      for(const v of s.analyst[id]){
        assert.ok(Number.isInteger(v) && v >= 0 && v <= 5, `${s.id}/${id}: ${v} is off the scale`);
      }
      assert.ok(nonEmpty(s.notes[id]), `${s.id}/${id}: the analyst must explain the rating`);
    }
  }
});

test("the analyst's note never contradicts the band its own numbers produce", () => {
  for(const s of data.SCENARIOS){
    for(const id of FORCE_IDS){
      const computed = band(avg(s.analyst[id]));
      const opener = s.notes[id].split(/[\s,.:]+/)[0].toLowerCase();
      const claimed = opener.startsWith("strong") ? "Strong"
        : opener.startsWith("weak") || opener === "very" ? "Weak"
        : opener.startsWith("moderate") ? "Moderate" : null;
      if(claimed) assert.equal(claimed, computed,
        `${s.id}/${id}: the note opens "${opener}" but the numbers say ${computed}`);
    }
  }
});

test("every scenario has one clear strongest force, and between them the set covers all five", () => {
  const winners = new Set();
  for(const s of data.SCENARIOS){
    const scored = FORCE_IDS.map(id => ({id, v:avg(s.analyst[id])})).sort((a, b) => b.v - a.v);
    assert.ok(scored[0].v - scored[1].v >= 0.2,
      `${s.id}: the strongest force must be unambiguous for the comparison to teach anything`);
    assert.ok(scored[0].v >= 3.5, `${s.id}: the strongest force should actually rate as strong`);
    assert.ok(/strongest/i.test(s.notes[scored[0].id]),
      `${s.id}: the note on ${scored[0].id} should say it is the strongest`);
    winners.add(scored[0].id);
  }
  assert.deepEqual([...winners].sort(), [...FORCE_IDS].sort(),
    "each of the five forces should be the strongest in some situation");
});

/* ============================================================================
   EVIDENCE SORT
   ========================================================================== */
test("every observation belongs to a real force and explains itself both ways", () => {
  assert.ok(data.EVIDENCE.length >= 6);
  for(const e of data.EVIDENCE){
    assert.ok(FORCE_IDS.includes(e.f), `unknown force: ${e.f}`);
    assert.ok(nonEmpty(e.why) && nonEmpty(e.trap), "each observation needs a reason and a trap note");
    assert.ok(!/\b(rivalry|substitutes?|buyer power|supplier power|new entrants)\b/i.test(e.t),
      "an observation must not name the force it demonstrates, or the sort answers itself");
  }
  const used = new Set(data.EVIDENCE.map(e => e.f));
  assert.ok(used.size >= 4, "the sort should exercise at least four of the five forces");
});

/* ============================================================================
   THE VALUE CHAIN
   ========================================================================== */
test("the chain carries five primary activities and four support bands", () => {
  assert.equal(data.CHAIN.filter(a => a.band === "primary").length, 5);
  assert.equal(data.CHAIN.filter(a => a.band === "support").length, 4);
  assert.equal(new Set(chainIds).size, data.CHAIN.length, "activity ids must be unique");
  for(const a of data.CHAIN){
    assert.ok(nonEmpty(a.means) && nonEmpty(a.service), `${a.id} needs a definition and a service reading`);
    assert.ok(a.drivers.length >= 2, `${a.id} needs cost drivers`);
    assert.ok(a.systems.length >= 2, `${a.id} needs example systems`);
  }
});

test("the primary flow is in the order a product travels", () => {
  assert.deepEqual(
    data.CHAIN.filter(a => a.band === "primary").map(a => a.id),
    ["inbound", "operations", "outbound", "marketing", "service"]);
});

/* ============================================================================
   INVESTMENT SIMULATOR
   ========================================================================== */
test("the simulator can be solved, and cannot be solved by buying everything", () => {
  const BUDGET = Number(html.match(/var BUDGET = (\d+);/)[1]);
  assert.equal(BUDGET, 150000);
  const total = data.SIM_OPTIONS.reduce((s, o) => s + o.cost, 0);
  assert.ok(total > BUDGET, "funding every proposal must be impossible, or there is no decision to make");
  const affordable = data.SIM_OPTIONS.filter(o => o.cost <= BUDGET);
  assert.ok(affordable.length >= 4, "most proposals must be individually affordable");
  const answers = data.SIM_OPTIONS.filter(o => o.answersForce);
  assert.ok(answers.length >= 1 && answers.length < data.SIM_OPTIONS.length,
    "some but not all proposals must answer the strongest force, or the lesson is free");
});

test("each proposal names a real activity, a fit under both strategies, and a reason", () => {
  const names = data.CHAIN.map(a => a.name);
  for(const o of data.SIM_OPTIONS){
    assert.ok(names.includes(o.act), `${o.id}: "${o.act}" is not a value chain activity`);
    for(const fit of [o.fitLow, o.fitDiff]){
      assert.ok(Number.isInteger(fit) && fit >= 0 && fit <= 3, `${o.id}: fit ${fit} is off the 0-3 scale`);
    }
    assert.ok(o.cost > 0 && o.benefit > 0, `${o.id}: needs a cost and a benefit`);
    assert.ok(nonEmpty(o.why), `${o.id}: needs an argument`);
  }
});

test("the two strategies genuinely disagree about what is worth building", () => {
  const disagreements = data.SIM_OPTIONS.filter(o => Math.abs(o.fitLow - o.fitDiff) >= 2);
  assert.ok(disagreements.length >= 2,
    "at least two proposals must be worth clearly more under one strategy than the other");
});

/* ============================================================================
   PLACEMENT DRILL
   ========================================================================== */
test("every system places into a real activity, and the drill covers the whole chain", () => {
  for(const p of data.PLACEMENTS){
    assert.ok(chainIds.includes(p.a), `unknown activity: ${p.a}`);
    assert.ok(nonEmpty(p.why), "each placement needs its reason");
  }
  assert.deepEqual([...new Set(data.PLACEMENTS.map(p => p.a))].sort(), [...chainIds].sort(),
    "each of the nine activities should be drilled once");
});

/* ============================================================================
   CASE STUDIES
   ========================================================================== */
test("every case carries a brief, facts, a costed exhibit and decisions", () => {
  assert.ok(data.CASES.length >= 3, "three cases at least");
  for(const c of data.CASES){
    assert.ok(nonEmpty(c.name) && nonEmpty(c.brief), `${c.id}: needs a name and a brief`);
    assert.ok(c.brief.split(/\s+/).length >= 40, `${c.id}: the brief must carry enough to reason from`);
    assert.ok(c.facts.length >= 3, `${c.id}: needs a strip of facts`);
    assert.ok(c.exhibit.rows.length >= 5, `${c.id}: the exhibit must cost most of the chain`);
    for(const row of c.exhibit.rows){
      assert.equal(row.length, c.exhibit.cols.length, `${c.id}: an exhibit row does not match its columns`);
    }
    assert.ok(c.decisions.length >= 3, `${c.id}: at least three decisions`);
  }
});

test("every case needs BOTH frameworks, and its model answer is checkable", () => {
  for(const c of data.CASES){
    const text = c.decisions.map(d => d.q + " " + d.opts.join(" ")).join(" ").toLowerCase();
    assert.ok(/force|rivalry|entrant|buyer|supplier|substitut/.test(text),
      `${c.id}: no decision asks which force is at work`);
    assert.ok(/logistics|operations|marketing|service|procurement|human resources|band/.test(text),
      `${c.id}: no decision asks where on the value chain the answer lives`);
    assert.ok(/\d/.test(c.debrief.model), `${c.id}: the model answer must carry a number`);
    assert.ok(/(month|year|quarter|tender|review)/i.test(c.debrief.model),
      `${c.id}: the model answer must say when the result gets checked`);
  }
});

test("every case decision is answerable and explains all four options", () => {
  for(const c of data.CASES){
    for(const d of c.decisions){
      assert.equal(d.opts.length, 4, `${c.id}: four options expected`);
      assert.equal(d.why.length, 4, `${c.id}: every option must explain itself`);
      assert.ok(Number.isInteger(d.a) && d.a >= 0 && d.a < 4, `${c.id}: invalid answer index`);
      assert.ok(/right/i.test(d.why[d.a]), `${c.id}: the correct option should confirm itself`);
    }
    assert.ok(new Set(c.decisions.map(d => d.a)).size >= 2,
      `${c.id}: the answer sits in the same position in every decision`);
  }
});

test("the case firms are hypothetical and no real company is given invented facts", () => {
  assert.ok(/hypothetical/i.test(html), "the page must say the case firms are hypothetical");
  const prose = data.CASES.map(c => c.brief + " " + c.facts.join(" ")).join(" ");
  assert.equal(prose.match(/\b(Amazon|Netflix|Walmart|Google|Apple|Uber|Airbnb|Marriott|Hilton)\b/), null,
    "a case must not attribute facts to a real company");
});

test("a case debrief cannot be read before its decisions are made", () => {
  assert.ok(html.includes('id="deb-'), "each case renders a debrief button");
  assert.ok(html.includes('" disabled>Show the debrief</button>'), "the debrief button renders disabled");
  assert.ok(html.includes("btn.disabled = done < total"),
    "the debrief must stay shut until every decision in that case is answered");
});

/* ============================================================================
   SELF-CHECK
   ========================================================================== */
test("every question has four options, a valid answer, and an explanation for each option", () => {
  assert.ok(data.QUIZ.length >= 8);
  for(const q of data.QUIZ){
    assert.equal(q.opts.length, 4, `four options expected: ${q.q.slice(0, 50)}`);
    assert.equal(q.why.length, 4, "every option must explain itself, including the ones not chosen");
    assert.ok(Number.isInteger(q.a) && q.a >= 0 && q.a < 4, "the answer index must be valid");
    assert.ok(/right/i.test(q.why[q.a]), "the correct option's explanation should confirm it");
    for(const w of q.why) assert.ok(nonEmpty(w));
  }
});

test("the answer is not always in the same place", () => {
  const spread = new Set(data.QUIZ.map(q => q.a));
  assert.equal(spread.size, 4, "correct answers must use all four positions");
});

test("the self-check topics line up with the questions", () => {
  const topics = new Function(`"use strict";${html.match(/var QUIZ_TOPICS = \[[\s\S]*?\];/)[0]}return QUIZ_TOPICS;`)();
  assert.equal(topics.length, data.QUIZ.length, "one topic per question");
  assert.deepEqual([...new Set(topics)].sort(),
    ["Putting them together", "The five forces", "The value chain"]);
});

/* ============================================================================
   REFERENCE AND HYGIENE
   ========================================================================== */
test("every reference entry defines a term and shows it in use", () => {
  assert.ok(data.GLOSSARY.length >= 20);
  const terms = data.GLOSSARY.map(g => g.t.toLowerCase());
  assert.equal(new Set(terms).size, terms.length, "no duplicated terms");
  for(const g of data.GLOSSARY){
    assert.ok(nonEmpty(g.d) && nonEmpty(g.e), `${g.t} needs a definition and an example`);
  }
  for(const needed of ["value chain", "switching cost", "business/it alignment", "cost driver"]){
    assert.ok(terms.includes(needed), `the reference should define "${needed}"`);
  }
});

test("the page is self-contained: no network of any kind", () => {
  assert.equal(html.match(/<script[^>]+src=/i), null, "no external scripts");
  assert.equal(html.match(/<link[^>]+href=["'](?!#)/i), null, "no external stylesheets or fonts");
  assert.equal(html.match(/https?:\/\/(?!www\.w3\.org)/i), null, "no absolute URLs");
  assert.equal(html.match(/\b(fetch|XMLHttpRequest|WebSocket|import\()/), null, "no network calls");
});

test("nothing institution-specific, and every link resolves", () => {
  for(const banned of [/keiser/i, /\bCGS\s?\d/i, /rubric/i, /\/Users\//, /localhost/i]){
    assert.equal(html.match(banned), null, `student-facing page must not contain ${banned}`);
  }
  const links = [...html.matchAll(/href="([^"#][^"]*)"/g)].map(m => m[1]);
  assert.ok(links.length > 0, "the page should link back to the modules");
  for(const href of links){
    assert.ok(existsSync(join(ROOT, href)), `broken link: ${href}`);
  }
});

test("all seven activities are wired to the progress counter", () => {
  const sections = new Function(`"use strict";${html.match(/var SECTIONS = \[[\s\S]*?\];/)[0]}return SECTIONS;`)();
  const activities = sections.filter(s => s.act).map(s => s.id);
  assert.equal(activities.length, 7, "the header promises seven activities");
  for(const id of activities){
    assert.ok(html.includes(`markDone("${id}")`), `${id} never marks itself complete`);
    assert.ok(html.includes(`id="sec-${id}"`), `${id} has no section`);
  }
});
