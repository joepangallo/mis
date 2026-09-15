/* Contract tests for the two homework case studies.
 *
 * Node standard library only. Both papers are generated from one template —
 * scenario, comparison company, four tasks, two deliverables — so one test file
 * covers both and additionally asserts they have not drifted apart. There are no
 * answer keys to gate on here: every task is an open analysis, and the marking
 * guidance lives in the gitignored instructor keys beside the pages.
 *
 * Run: node --test homework/homework-cases.test.mjs
 */
import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync, mkdtempSync, rmSync } from "node:fs";
import { dirname, join } from "node:path";
import { tmpdir } from "node:os";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, "..");

const PAPERS = [
  {
    file: "homework-06-data-and-business-intelligence-case.html",
    key: "homework-06-instructor-key.md",
    firm: "Ashgrove Pet Company",
    storage: "mis-homework-06-case-v2",
    cost: 38400000,
    avoidable: 1922000,
    /* One fact per force, so the grid can actually be filled from the brief. */
    evidence: [
      [/Five regional chains and about forty independents/, "rivalry"],
      [/Renting storefront software is now most of what it takes/, "the threat of new entrants"],
      [/switching costs a shopper nothing at all/, "buyer power"],
      [/One manufacturer holds the licence/, "supplier power"],
      [/Home-prepared and raw feeding meets the same need a different way/, "the threat of substitutes"]
    ],
    /* The chapter this case is built to be answered with. */
    reading: "module-06-managing-data-and-business-intelligence.html",
    /* The intended strongest force, and the alternative the key must accept. */
    strongest: "buyer power",
    fixtureSystem: "master data management running on the operational database",
    fixtureChapter: "The failure is data duplication, and it leaves the conflicting definitions of a customer untouched. The authoritative record becomes the product master, owned by the operations manager, who settles any disagreement about what one product is rather than deleting either department's meaning. An operational fix is needed because copying everything into one analytical store would settle the reporting and would not stop the wrong item being picked at the shelf. The corrected identifier reaches goods receipt and the webshop through the nightly catalog feed that both of them already read every night.",
    substitute: /home-prepared/i,
    cappedForce: /prescription range is <b>4 percent<\/b> of revenue/
  },
  {
    file: "homework-07-decision-making-and-analytics-case.html",
    key: "homework-07-instructor-key.md",
    firm: "Corwin Cycle Company",
    storage: "mis-homework-07-case-v2",
    cost: 50000000,
    avoidable: 1717000,
    evidence: [
      [/Five regional chains and about thirty independents/, "rivalry"],
      [/Renting a webshop and drop-shipping parts/, "the threat of new entrants"],
      [/compare every price in the region from a phone/, "buyer power"],
      [/only supplier certified/, "supplier power"],
      [/bike-share scheme/, "the threat of substitutes"]
    ],
    reading: "games/decision-engine.html",
    strongest: "supplier power",
    fixtureSystem: "a decision support system built on one margin model",
    fixtureChapter: "The method is a decision support system. The one input I can actually control is the quantity committed a quarter ahead, the constraint is the delivery capacity the stores actually have, and the what-if question a buyer would put to it is what happens to margin if the certified supplier raises the pack price another 9 percent. It is a model rather than a prediction, so there is no label and no held-back test set; what it needs instead is the buyer checking the assumptions each quarter before the order goes in.",
    substitute: /bike-share/i,
    cappedForce: /Parts are <b>21 percent<\/b>/
  }
];

const FORCES = [
  "Rivalry among existing competitors",
  "Threat of new entrants",
  "Bargaining power of buyers",
  "Bargaining power of suppliers",
  "Threat of substitutes"
];
const ACTIVITIES = ["Inbound logistics", "Operations", "Outbound logistics", "Sales and marketing",
                    "Service", "Procurement", "Technology development", "Human resources",
                    "Administration"];
const FIELD_KEYS = ["f1", "f2", "f3", "f4", "f5", "strongest", "a1", "a2", "t3", "t3b", "t4"];

for(const paper of PAPERS) paper.html = readFileSync(join(HERE, paper.file), "utf8");

function scripts(html){
  return [...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/gi)].map(m => m[1]);
}
function plain(fragment){
  return fragment.replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&").replace(/&rsquo;/g, "'").replace(/&ldquo;|&rdquo;/g, '"')
    .replace(/&mdash;/g, "—").replace(/&middot;/g, "·").replace(/&nbsp;/g, " ")
    .replace(/&[a-z]+;/g, " ").replace(/\s+/g, " ").trim();
}
function taskNames(html){
  return [...html.matchAll(/<h3>(Task[^<]*)<\/h3>/g)].map(m => plain(m[1]));
}
function task(html, label){
  const start = html.indexOf(`<h3>${label}`);
  assert.ok(start > 0, `${label} is missing`);
  const rest = html.slice(start);
  const end = rest.indexOf('<div class="task">');
  return end === -1 ? rest.split("</section>")[0] : rest.slice(0, end);
}
function money(text){
  return Number(String(text).replace(/[$,]/g, ""));
}
/* The exhibit, as rows of {activity, cost, avoidable}, plus its printed totals. */
function exhibit(html){
  const at = html.indexOf("Exhibit &mdash;");
  assert.ok(at > 0, "the case has no exhibit");
  const table = html.slice(at, html.indexOf("</table>", at));
  const rows = [...table.matchAll(
    /<tr><td>([\s\S]*?)<\/td><td class="num">\$([\d,]+)<\/td><td class="num">([\s\S]*?)<\/td>/g)]
    .map(m => ({
      activity: plain(m[1]).replace(/\s*\(support\)$/, ""),
      cost: money(m[2]),
      avoidable: m[3].trim().startsWith("$") ? money(m[3]) : null
    }));
  const foot = table.slice(table.indexOf("<tfoot>"))
    .match(/\$([\d,]+)<\/td>\s*<td class="num">\$([\d,]+)/);
  assert.ok(foot, "the exhibit has no total row carrying both columns");
  return { rows, totalCost: money(foot[1]), totalAvoidable: money(foot[2]) };
}

/* ============================================================================
   EACH PAPER
   ========================================================================== */
for(const paper of PAPERS){
  const html = paper.html;
  const name = paper.file.replace(/\.html$/, "");

  test(`${name}: the inline script parses as valid JavaScript`, () => {
    assert.equal(scripts(html).length, 1);
    assert.doesNotThrow(() => new Function(scripts(html)[0]));
  });

  test(`${name}: the page is self-contained and every link resolves`, () => {
    assert.doesNotMatch(html, /<script\b[^>]*\bsrc=/i);
    assert.doesNotMatch(html, /<link\b/i);
    assert.doesNotMatch(html, /https?:\/\//i, "the page must not reference anything over the network");
    const markup = html.replace(/<script(?:\s[^>]*)?>[\s\S]*?<\/script>/gi, "");
    const refs = [...markup.matchAll(/(?:src|href)="([^"]*)"/g)].map(m => m[1]);
    for(const ref of refs){
      const path = ref.split("#")[0].split("?")[0];
      if(path === "") continue;
      assert.ok(existsSync(join(HERE, path)), `link target "${path}" does not exist`);
    }
    assert.ok(refs.some(r => r.endsWith(paper.reading)),
      `the case has to point at ${paper.reading}, which is the material it is answered with`);
    assert.ok(refs.some(r => r.endsWith("five-forces-and-value-chain.html")),
      "the case has to point at the frameworks workshop, because it is a frameworks assignment");
  });

  test(`${name}: it carries the machinery a student needs to work and hand in`, () => {
    for(const id of ["who", "exportBtn", "printBtn", "clearBtn", "saveStatus", "printIdentity",
                     "wcBadge", "wcMsg", "checkList", "unansweredMsg"]){
      assert.ok(html.includes(`id="${id}"`), `missing ${id}, which the page needs to be usable`);
    }
    const script = scripts(html)[0];
    assert.match(script, /pagehide/, "the debounced save must flush on pagehide");
    assert.match(script, /visibilitychange/, "the debounced save must flush when the page is hidden");
    assert.ok(script.includes(`"${paper.storage}"`), "the paper needs its own storage key");
  });

  /* ==========================================================================
     THE ASSIGNMENT'S SHAPE
     These assertions are the point of the rebuild: this is a case study in the
     signature assignment's shape, not a worksheet with a case bolted on.
     ======================================================================== */
  test(`${name}: it is the assignment's four tasks, in the assignment's order`, () => {
    assert.deepEqual(taskNames(html), [
      "Task 1 · Apply the five competitive forces",
      "Task 1b · Name the single strongest force",
      "Task 2 · Use the value chain to find the opportunities",
      "Task 3 · Recommend exactly one IT initiative",
      taskNames(html)[4],   /* Task 3b · <the chapter's own question>, which differs per case */
      "Task 4 · The written summary, in 150 to 200 words"
    ]);
    assert.match(taskNames(html)[4], /^Task 3b · /,
      "the chapter-specific task must sit between the recommendation and the summary");
  });

  test(`${name}: it keeps the assignment's own wording for what is being asked`, () => {
    const page = plain(html.replace(/<script[\s\S]*?<\/script>/gi, ""));
    for(const [pattern, what] of [
      [/five competitive forces/i, "Porter's five forces as the first task"],
      [/at least two internal areas/i, "the value chain's \"at least two internal areas\""],
      [/operational or customer-focused/i, "the kind of advantage the assignment asks for"],
      [/one real retail or e-commerce company/i, "the comparison company"],
      [/150 to 200 words/, "the summary's word band"],
      [/Two deliverables/i, "the two deliverables"],
      [/framework analysis/i, "the first deliverable"],
      [/written summary/i, "the second deliverable"],
      [/strategic alignment/i, "what the written summary is for"]
    ]){
      assert.match(page, pattern, `the page no longer asks for ${what}`);
    }
  });

  test(`${name}: Task 1 is a five-row grid, one row per force`, () => {
    const grid = task(html, "Task 1 &middot;");
    const labels = [...grid.matchAll(/<td class="num">\d<\/td><td>([^<]+)<\/td>/g)].map(m => m[1]);
    assert.deepEqual(labels, FORCES, "every force needs its own row, or four can be skipped silently");
    const boxes = [...grid.matchAll(/data-key="(f\d)"/g)].map(m => m[1]);
    assert.deepEqual(boxes, ["f1", "f2", "f3", "f4", "f5"]);
  });

  test(`${name}: Task 2 gives two separate boxes, so one idea cannot be written twice`, () => {
    const t2 = task(html, "Task 2 &middot;");
    const boxes = [...t2.matchAll(/data-key="(a\d)"/g)].map(m => m[1]);
    assert.deepEqual(boxes, ["a1", "a2"]);
    assert.match(plain(t2), /genuinely different/i,
      "the second area has to be required to differ, or both boxes hold one idea");
    assert.match(plain(t2), /exactly as the exhibit prints it/i,
      "the figure has to be traceable to the exhibit, or the area cannot be marked");
    assert.match(plain(t2), /in your own words/i,
      "requiring the driver verbatim rewards copying; only the figure needs quoting");
  });

  test(`${name}: Task 3 asks for all six elements of a recommendation`, () => {
    const t3 = plain(task(html, "Task 3 &middot;")).toLowerCase();
    for(const element of ["what it does", "what kind of system it is", "which activity it belongs to",
                          "which force it answers", "how it would run", "how you would know it worked"]){
      assert.ok(t3.includes(element), `Task 3 never asks for "${element}"`);
    }
    assert.match(t3, /exactly one|one initiative is a decision/,
      "a shortlist is the commonest way this task goes wrong, and it has to be ruled out in the prose");
  });

  test(`${name}: Task 4 asks for all five elements of the summary`, () => {
    const t4 = plain(task(html, "Task 4 &middot;")).toLowerCase();
    for(const element of ["named", "worth comparing", "one lesson", "decline", "aligns"]){
      assert.ok(t4.includes(element), `Task 4 never asks for "${element}"`);
    }
    const script = scripts(html)[0];
    assert.match(script, /low:\s*150/, "the counter must know the bottom of the band");
    assert.match(script, /high:\s*200/, "the counter must know the top of the band");
  });

  test(`${name}: every writing box is reachable and named`, () => {
    const keys = [...html.matchAll(/data-key="([a-z0-9]+)"/g)].map(m => m[1]);
    assert.deepEqual(keys, FIELD_KEYS);
    for(const key of FIELD_KEYS){
      assert.ok(html.includes(`id="${key}" data-key="${key}"`), `${key} has no id, so nothing can find it`);
    }
  });

  /* ==========================================================================
     THE EXHIBIT — the thing that makes Task 2 markable
     ======================================================================== */
  test(`${name}: the exhibit covers all nine value chain activities`, () => {
    const { rows } = exhibit(html);
    assert.deepEqual(rows.map(r => r.activity), ACTIVITIES,
      "a student asked to scan the whole chain needs the whole chain in front of them");
  });

  test(`${name}: both exhibit columns add up to the totals they print`, () => {
    const { rows, totalCost, totalAvoidable } = exhibit(html);
    assert.equal(rows.reduce((a, r) => a + r.cost, 0), totalCost, "the cost column does not sum");
    assert.equal(rows.reduce((a, r) => a + (r.avoidable || 0), 0), totalAvoidable,
      "the avoidable column does not sum");
    assert.equal(totalCost, paper.cost);
    assert.equal(totalAvoidable, paper.avoidable);
  });

  test(`${name}: the largest cost is not the largest opportunity`, () => {
    /* The page says this in a callout, so it has to be true of the numbers.
       If it ever stops being true, the callout is teaching the wrong lesson. */
    const { rows } = exhibit(html);
    const byCost = [...rows].sort((a, b) => b.cost - a.cost);
    const withAvoidable = rows.filter(r => r.avoidable !== null);
    const byAvoidable = [...withAvoidable].sort((a, b) => b.avoidable - a.avoidable);
    assert.equal(byCost[0].avoidable, null,
      `${byCost[0].activity} is the largest cost and carries avoidable cost, which the page says it does not`);
    assert.notEqual(byCost[0].activity, byAvoidable[0].activity);
    assert.ok(byAvoidable[0].cost < byCost[0].cost / 2,
      "the largest avoidable figure should sit in a visibly smaller activity, or the point is muted");
    /* No tie on either measure, or "the largest" has two answers. */
    assert.equal(new Set(withAvoidable.map(r => r.avoidable)).size, withAvoidable.length,
      "two activities carry the same avoidable figure, so the biggest one is ambiguous");
  });

  /* ==========================================================================
     THE BRIEF
     ======================================================================== */
  test(`${name}: the brief gives evidence for every one of the five forces`, () => {
    const start = html.indexOf("What the executives have told you");
    const facts = plain(html.slice(start, html.indexOf("</ul>", start)));
    for(const [pattern, what] of paper.evidence){
      assert.match(facts, pattern, `the brief gives nothing a student could rate ${what} from`);
    }
  });

  test(`${name}: the brief states a position the summary can be aligned to`, () => {
    const start = html.indexOf("What the executives have told you");
    const facts = plain(html.slice(start, html.indexOf("</ul>", start)));
    assert.match(facts, /has never been the cheapest/i,
      "Task 4 asks how the initiative aligns with what the firm competes on, so the brief has to say");
  });

  test(`${name}: the chapter is required, not decorative`, () => {
    /* The risk this guards: a generic strategy assignment with a chapter's name
       on it. Task 3b is what makes the reading non-optional, so it has to exist,
       ask several things, and ask them of the reading rather than of strategy. */
    const t3b = plain(task(html, "Task 3b &middot;"));
    assert.ok(t3b.length > 400, "Task 3b is too thin to make the reading necessary");
    const parts = (task(html, "Task 3b &middot;").match(/<li>/g) || []).length;
    assert.ok(parts >= 4, `Task 3b asks only ${parts} things`);
    assert.ok(html.includes('data-key="t3b"'), "Task 3b has no box to answer in");
    const start = html.indexOf("What the executives have told you");
    const facts = html.slice(start, html.indexOf("</ul>", start));
    assert.ok(facts.length > 1500, "the brief is too thin to support a five-force analysis");
  });

  test(`${name}: no force's evidence is doing double duty`, () => {
    /* Porter's substitutes are a different way of meeting the need, not the same
       product through another channel. Using one competitor set as evidence for
       rivalry, entry AND substitution is the commonest way these go wrong. */
    const start = html.indexOf("What the executives have told you");
    const facts = plain(html.slice(start, html.indexOf("</ul>", start)));
    assert.match(facts, paper.substitute,
      "the substitutes evidence must be a different way of meeting the need");
    assert.match(html, paper.cappedForce,
      "a force the brief does not intend as strongest needs a stated ceiling, or the case is ambiguous");
  });

  /* ==========================================================================
     STUDENT-FACING HYGIENE
     ======================================================================== */
  test(`${name}: no point value, rubric or weighting appears anywhere in the file`, () => {
    /* Not "outside the comments": View Source is student-visible, so the whole
       file is student-facing. The weights live in the gitignored key instead. */
    const studentFacing = html;
    for(const [pattern, what] of [
      [/\b\d+\s*(pts|points|marks)\b/i, "a point value"],
      [/\bworth\s+\d+/i, "a weighting"],
      [/\bweighted at\b|\bcarries\s+\d+\s*percent\b|\bof the (grade|mark|total marks)\b/i, "a weighting"],
      [/\brubric\b/i, "a rubric"],
      [/\bestimated time\b|\bshould take you about\b/i, "a time estimate"],
      [/\bbenchmark grade\b/i, "the institutional grading language"]
    ]){
      assert.doesNotMatch(studentFacing, pattern, `${what} has reached the student-facing page`);
    }
    assert.doesNotMatch(html, /\bINSTRUCTOR NOTE\b/,
      "weights and marking guidance belong in the gitignored key, not in a comment anyone can read");
  });

  test(`${name}: no comment in the file carries a model answer`, () => {
    const comments = [...html.matchAll(/<!--([\s\S]*?)-->/g)].map(m => m[1]).join("\n");
    for(const pattern of [/\bthe strongest force is\b/i, /\bthe answer is\b/i, /\bmodel answer/i,
                          /\bbuyer power\b/i, /\bsupplier power\b/i]){
      assert.doesNotMatch(comments, pattern, "a comment in the page is leaking an answer");
    }
  });

  test(`${name}: no institutional, course-code or local-path wording reaches the page`, () => {
    for(const pattern of [/\bKeiser\b/i, /\bCGS\s*-?\s*3300\b/i, /\bsignature assignment\b/i,
                          /\bSLO\s*-?\s*1\b/i, /\/Users\//, /\bC:\\/]){
      assert.doesNotMatch(html, pattern, `forbidden wording ${pattern} appears on the page`);
    }
  });

  test(`${name}: no reserved assessment term reaches the page`, (t) => {
    const list = join(ROOT, "src", "forbidden.local.txt");
    if(!existsSync(list)){ t.skip("src/forbidden.local.txt is not present"); return; }
    const terms = readFileSync(list, "utf8").split(/\r?\n/).map(s => s.trim()).filter(Boolean);
    if(terms.length === 0){ t.skip("no reserved terms listed"); return; }
    for(const term of terms){
      const pattern = new RegExp("\\b" + term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "\\b", "i");
      assert.doesNotMatch(html, pattern, "the page contains a term reserved to the live assessment");
    }
  });

  test(`${name}: every figure the instructor key quotes is one the exhibit prints`, (t) => {
    /* This is the bug that prompted the test. The exhibit was rebalanced and the
       key was not, so it cited $214,000 for an activity the page showed at
       $340,000 — which would have marked down a student who read the page
       correctly. The key is gitignored, so this skips on CI and runs locally,
       which is where grading actually happens. */
    const keyPath = join(HERE, paper.key);
    if(!existsSync(keyPath)){ t.skip(`${paper.key} is not present`); return; }
    const key = readFileSync(keyPath, "utf8");
    const { rows, totalCost, totalAvoidable } = exhibit(paper.html);
    const printed = new Set();
    for(const row of rows){
      printed.add(`$${row.cost.toLocaleString()}`);
      if(row.avoidable !== null) printed.add(`$${row.avoidable.toLocaleString()}`);
    }
    printed.add(`$${totalCost.toLocaleString()}`);
    printed.add(`$${totalAvoidable.toLocaleString()}`);
    /* Sums of two printed avoidable figures are legitimate derivations. */
    const avoidable = rows.filter(r => r.avoidable !== null).map(r => r.avoidable);
    for(const a of avoidable){
      for(const b of avoidable){ if(a !== b) printed.add(`$${(a + b).toLocaleString()}`); }
    }
    const quoted = [...new Set([...key.matchAll(/\$[\d,]{5,}/g)].map(m => m[0]))];
    assert.ok(quoted.length >= 4, "the key should be citing the exhibit it marks against");
    const stale = quoted.filter(f => !printed.has(f));
    assert.deepEqual(stale, [],
      `the key quotes ${stale.join(", ")}, which this paper's exhibit does not print`);
  });

  test(`${name}: the instructor key does not overclaim a single right answer`, (t) => {
    /* An evaluate task has more than one defensible reading. The key has to say
       which alternatives earn full marks, not declare a runner-up settled. */
    const keyPath = join(HERE, paper.key);
    if(!existsSync(keyPath)){ t.skip(`${paper.key} is not present`); return; }
    const key = readFileSync(keyPath, "utf8");
    /* The phrase may appear, but only inside the instruction forbidding it. */
    for(const m of key.matchAll(/knowably second/gi)){
      const before = key.slice(Math.max(0, m.index - 60), m.index);
      assert.match(before, /Do not treat any runner-up as\s*"?$/i,
        "a runner-up is being declared settled, which is the overclaim this rewrite removed");
    }
    assert.match(key, /Do not treat any runner-up as/i,
      "the key must tell a marker which alternatives are acceptable");
    assert.match(key, /Mark the evidence, not the label/i,
      "an evaluate task is marked on evidence");
  });

  test(`${name}: the instructor key is not tracked by git`, () => {
    /* Asking git is the only answer that means anything: a .gitignore rule does
       nothing for a file that was already added. */
    const tracked = spawnSync("git", ["ls-files", "--error-unmatch", `homework/${paper.key}`],
      { cwd: ROOT, encoding: "utf8" });
    assert.notEqual(tracked.status, 0,
      `homework/${paper.key} is TRACKED — it holds the marking guidance and this repo is public`);
    if(existsSync(join(HERE, paper.key))){
      const ignored = spawnSync("git", ["check-ignore", "-q", `homework/${paper.key}`],
        { cwd: ROOT, encoding: "utf8" });
      assert.equal(ignored.status, 0, `homework/${paper.key} exists but is not ignored`);
    }
  });

  test(`${name}: the firm is declared invented`, () => {
    assert.ok(html.includes(`${paper.firm} is not a real company`));
    assert.match(html, /Every company on this assignment is invented/);
    assert.match(html, /Nothing here is drawn from a real company/);
  });
}

/* ============================================================================
   THE CHECKLIST ITSELF
   The checklist is the only part of these pages a student is actually steered
   by, and its failure mode is not a crash — it is marking a complete answer
   incomplete, which sends somebody off to add words they did not need. Two of
   those were found in a browser during the build. So the predicates are lifted
   out of the page and run against answers that should pass and answers that
   should not.

   The harness is the one the Chapter 7 game's tests use: load the whole inline
   script in `new Function` against a DOM stub small enough to read, and return
   the globals. That reaches every predicate rather than grepping for regexes.
   ========================================================================== */
function loadChecks(paper){
  const script = scripts(paper.html)[0];
  /* The script opens with a comment block, so slice on the IIFE itself rather
     than anchoring at the start of the string. */
  const open = script.indexOf("(function(){");
  const close = script.lastIndexOf("})();");
  assert.ok(open !== -1 && close > open, "the page script is no longer a single IIFE");
  const body = script.slice(open + "(function(){".length, close);

  const fields = [...paper.html.matchAll(/data-key="([a-z0-9]+)"/g)].map(m => m[1]);
  const el = () => {
    const node = {
      value: "", textContent: "", innerHTML: "", className: "", style: {}, scrollHeight: 0,
      setAttribute(){}, getAttribute(k){ return this[k === "data-key" ? "_key" : k] ?? null; },
      addEventListener(){}, appendChild(){}, removeChild(){}, remove(){},
      closest(){ return null; }, matches(){ return false; },
      querySelector(){ return null; }, querySelectorAll(){ return []; },
      insertBefore(){}, parentNode: { insertBefore(){} }
    };
    return node;
  };
  const boxes = new Map(fields.map(key => {
    const node = el();
    node._key = key;
    node.getAttribute = k => (k === "data-key" ? key : null);
    return [key, node];
  }));

  /* One .task node per heading, carrying the boxes that live inside it. */
  const taskChunks = paper.html.split(/<div class="task">/).slice(1)
    .map(chunk => chunk.split(/<\/section>/)[0]);
  const tasks = taskChunks.map(chunk => {
    const heading = (chunk.match(/<h3>([\s\S]*?)<\/h3>/) || [, ""])[1];
    const keys = [...chunk.matchAll(/data-key="([a-z0-9]+)"/g)].map(m => m[1]);
    const node = el();
    node.querySelector = sel => (sel === "h3" ? { textContent: plain(heading) } : null);
    node.querySelectorAll = () => keys.map(k => boxes.get(k));
    return node;
  });

  const byId = new Map([...boxes]);
  for(const id of ["who", "saveStatus", "wcBadge", "wcMsg", "checkList", "unansweredMsg",
                   "printIdentity", "exportBtn", "printBtn", "clearBtn"]){
    byId.set(id, el());
  }
  const documentStub = {
    /* A real DOM returns null for an unknown id. The old stub handed back a
       fresh element, which would hide a predicate that dereferences something
       the page does not have. */
    getElementById: id => (byId.has(id) ? byId.get(id) : null),
    querySelectorAll: sel => (sel === ".task" ? tasks : []),
    querySelector: () => null,
    createElement: el,
    addEventListener(){},
    body: el(),
    visibilityState: "visible"
  };
  const store = new Map();
  const localStorageStub = {
    getItem: k => (store.has(k) ? store.get(k) : null),
    setItem: (k, v) => store.set(k, v),
    removeItem: k => store.delete(k)
  };
  const windowStub = { addEventListener(){}, print(){}, confirm: () => true };

  const fn = new Function("document", "window", "localStorage", "Blob", "URL",
    body + "\nreturn { CHECKS: CHECKS, words: words };");
  const api = fn(documentStub, windowStub, localStorageStub, function(){}, { createObjectURL(){}, revokeObjectURL(){} });
  const find = label => {
    const check = api.CHECKS.find(c => c.label.includes(label));
    assert.ok(check, `no checklist item matching "${label}"`);
    return v => !!check.test(v);
  };
  return { all: api.CHECKS, find };
}

for(const paper of PAPERS){
  const name = paper.file.replace(/\.html$/, "");

  test(`${name}: the checklist loads and covers every task`, () => {
    const { all } = loadChecks(paper);
    assert.ok(all.length >= 14, `only ${all.length} checks, which cannot cover five tasks`);
    for(const task of ["Task 1", "Task 2", "Task 3", "Task 4"]){
      assert.ok(all.some(c => c.label.startsWith(task)), `nothing on the checklist checks ${task}`);
    }
    for(const check of all){
      assert.equal(typeof check.test, "function", `"${check.label}" has no test`);
      assert.doesNotThrow(() => check.test({ who: "" }), `"${check.label}" throws on an empty page`);
    }
  });

  test(`${name}: the checklist passes a complete answer and fails an incomplete one`, () => {
    const { find } = loadChecks(paper);

    /* "Where the human stands" and "connects to the initiative" were both marked
       missing on answers that plainly contained them, because the pattern wanted
       one exact phrase. These are the answers that caught it. */
    const connects = find("connects the comparison to the initiative");
    for(const good of [
      "It aligns with what the firm competes on, and the model I recommended is what makes that true.",
      "The lesson is to model the commitment rather than fight the contract, which is the position the firm has chosen.",
      "That initiative is what defends the advantage this business actually sells."
    ]){
      assert.ok(connects({ t4: good }), `a summary that does connect was marked as not: "${good}"`);
    }
    assert.ok(!connects({ t4: "It grew quickly and is admired for its logistics and its enormous warehouses." }),
      "a summary that never returns to the recommendation was passed");

    const named = find("names the company it is comparing with");
    assert.ok(named({ t4: "The company I am comparing with is Redgate Supply, which published how it did it." }));
    assert.ok(!named({ t4: "the firm should look at what other retailers have done and take the lesson." }),
      "a summary naming no company at all was passed");
    assert.ok(!named({ t4: `I compared it with ${paper.firm} itself, which is this case's own firm.` }),
      "the case's own firm was accepted as the comparison company");

    const twoAreas = find("two different activities");
    assert.ok(twoAreas({ a1: "Inbound logistics, where receiving is booked wrong.",
                         a2: "Sales and marketing, where the campaign list is wrong." }));
    assert.ok(!twoAreas({ a1: "Sales and marketing, where the campaign list is wrong.",
                          a2: "Sales and marketing again, described a second way." }),
      "one activity written twice was accepted as two areas");
    assert.ok(twoAreas({ a1: "Inbound logistics, and the same fault also drives outbound logistics.",
                         a2: "Outbound logistics, caused by that same inbound fault." }),
      "an area that names its knock-on activity was rejected, which punishes the better answer");
    assert.ok(!twoAreas({ a1: "The bit where things go wrong.", a2: "The other bit." }),
      "areas not named in the value chain's words were accepted");

    const rated = find("rates each force");
    const rows = { f1: "Strong, because x", f2: "Weak, because x", f3: "Moderate, because x",
                   f4: "Strong, because x", f5: "Weak, because x" };
    assert.ok(rated(rows));
    assert.ok(!rated({ ...rows, f3: "Shoppers can move elsewhere and many of them did." }),
      "a force described but never rated was accepted");

    /* Deliberately not this case's answer: a public test file is a bad place to
       publish one. Any force name plus an argument is what the check is for. */
    const strongest = find("names one force and argues it against another");
    assert.ok(strongest({ strongest: "Rivalry is the one that matters most here, because the evidence in the brief points at it more sharply than it points at the threat of substitutes." }));
    assert.ok(strongest({ strongest: "Rivalry outweighs supplier power here; the brief gives a count for one of them and nothing comparable for the other, which settles it for me." }),
      "a semicolon contrast naming two forces is an argument");
    assert.ok(!strongest({ strongest: "This is clearly the biggest problem and it beats everything else by a wide margin." }),
      "an answer naming no force was accepted");

    const concrete = find("specific enough to cost");
    assert.ok(!concrete({ t3: "We should improve our digital capabilities and modernize how we work with data across every part of the business this year." }),
      "a vague initiative was accepted");
  });
}

for(const paper of PAPERS){
  const name = paper.file.replace(/\.html$/, "");

  test(`${name}: a complete analysis passes every check, end to end`, () => {
    /* The suite had no end-to-end fixture: it tested predicates on snippets, so a
       paper could ship where no single answer could satisfy everything at once.
       The two figures come out of this paper's own exhibit, avoidable column. */
    const { all } = loadChecks(paper);
    const rows = exhibit(paper.html).rows.filter(r => r.avoidable !== null);
    assert.ok(rows.length >= 2, "the exhibit needs two quotable figures");
    const fig = n => `$${rows[n].avoidable.toLocaleString()}`;
    const complete = {
      who: "A Student",
      f1: "Moderate to strong. Five regional chains and about thirty independents compete here, though nobody is discounting heavily at all.",
      f2: "Moderate. Several new sellers arrived this year and took about 3 percent of the volume between them.",
      f3: "Strong. Switching costs a customer nothing at all, and a fifth of them did not come back last year.",
      f4: "Strong. One supplier holds the only licence that counts and raised its prices 9 percent in March.",
      f5: "Moderate. About 12 percent now meet the same need a different way, up from 7 percent three years ago.",
      strongest: "Buyer power is the strongest force here, because a fifth of last year's customers left at no cost to themselves whatsoever. It beats rivalry, since nobody in this market is discounting heavily and the pressure is plainly coming from customers rather than from competitors cutting their prices.",
      a1: `${rows[0].activity}. The exhibit prints ${fig(0)} of avoidable cost there, and the weakness is that the work is being done twice, so a system that got the record right once would stop it.`,
      a2: `${rows[1].activity}. The exhibit prints ${fig(1)} of avoidable cost there, and the weakness is a different one, so the two areas are not one idea written out twice.`,
      t3: `The initiative is one programme, scoped to the records that cause the trouble and enforced at the point they are first captured. It is ${paper.fixtureSystem}, and it would be bought as a service rather than hosted here, which costs some control over the release schedule. It sits in ${rows[0].activity.toLowerCase()} and the saving also appears in ${rows[1].activity.toLowerCase()}. It answers buyer power, because a customer let down once has no cost at all to leave. We stand at 3,100 today; the target is under 200 by March, reviewed on the first of that month, and the guardrail is that nothing is lost when two records are merged.`,
      t3b: paper.fixtureChapter,
      t4: "The company I am comparing with is Redgate Supply, which documented building one authoritative record before it launched delivery. The mechanism matters rather than its size: it found that its stores and its website disagreed about what a product was, and it fixed that before touching anything customers could see. That is the position here, at a far smaller scale. The lesson that transfers is the ordering of the work, not the size of the platform it was built on. What I would decline to copy is its recommendation engine, which there is nowhere near the traffic here to feed. The alignment is direct, because this firm competes on keeping the promise it makes about availability, and a record that is wrong makes that promise untrue at the shelf. Money spent instead on cutting prices would buy share in the one thing it has never won on, and would leave the promise it does make unreliable."
    };
    const failing = all.filter(c => !c.test(complete)).map(c => c.label);
    assert.deepEqual(failing, [],
      `a complete analysis was marked incomplete on: ${failing.join(" | ")}`);
  });

  test(`${name}: filler with the right trigger words does not pass everything`, () => {
    /* A structural checklist cannot judge reasoning, and should not pretend to.
       What it must not do is wave through text with no content at all. */
    const { all } = loadChecks(paper);
    const filler = "banana ".repeat(40) +
      " strong because inbound logistics buyer power master data $1 by March aligns lesson initiative";
    const values = { who: "X" };
    for(const key of FIELD_KEYS) values[key] = filler;
    const passing = all.filter(c => c.test(values)).map(c => c.label);
    assert.ok(passing.length < all.length - 4,
      `filler passed ${passing.length} of ${all.length} checks, which makes the checklist decorative`);
    for(const label of ["quotes each area", "two different activities", "word band"]){
      assert.ok(!passing.some(l => l.includes(label)), `filler passed "${label}"`);
    }
  });
}

/* ============================================================================
   THE TWO TOGETHER
   They are generated from one template, so drift between them is a defect
   rather than a variation.
   ========================================================================== */
test("both papers have the same tasks, boxes and checklist", () => {
  const [a, b] = PAPERS;
  /* Task 3b is the one heading that is meant to differ: it asks each chapter's
     own question. Everything around it has to match. */
  const shape = html => taskNames(html).map(t => t.startsWith("Task 3b") ? "Task 3b" : t);
  assert.deepEqual(shape(a.html), shape(b.html), "the two papers ask different tasks");
  assert.notEqual(taskNames(a.html)[4], taskNames(b.html)[4],
    "both chapter tasks ask the same thing, so one of them is not about its chapter");
  const keys = html => [...html.matchAll(/data-key="([a-z0-9]+)"/g)].map(m => m[1]);
  assert.deepEqual(keys(a.html), keys(b.html), "the two papers collect different fields");
  const labels = html => [...scripts(html)[0].matchAll(/\{label:"([^"]+)"/g)]
    .map(m => m[1]).filter(l => /^(Your name|Task)/.test(l));
  assert.deepEqual(labels(a.html), labels(b.html), "the two checklists check different things");
  assert.ok(labels(a.html).length >= 12, "the checklist should cover every element both tasks ask for");
});

test("the two papers share no scenario, no firm and no exhibit", () => {
  const [a, b] = PAPERS;
  assert.notEqual(a.firm, b.firm);
  assert.ok(!a.html.includes(b.firm) && !b.html.includes(a.firm),
    "one paper names the other's firm");
  assert.notEqual(a.cost, b.cost);
  assert.notEqual(a.storage, b.storage,
    "sharing a storage key would make one paper overwrite the other in the same browser");
  /* No fact may be copied verbatim between the two briefs. */
  const facts = paper => {
    const start = paper.html.indexOf("What the executives have told you");
    return new Set([...paper.html.slice(start, paper.html.indexOf("</ul>", start))
      .matchAll(/<li>([\s\S]*?)<\/li>/g)].map(m => plain(m[1])));
  };
  const theirs = facts(b);
  for(const fact of facts(a)){
    assert.ok(!theirs.has(fact), `a fact is copied between the two briefs: "${fact.slice(0, 60)}…"`);
  }
});

test("the committed pages are byte-identical to what the generator produces", () => {
  /* These pages are generated. The old version of this test compared a few
     marker strings, which would pass while the committed HTML was stale. Run the
     generator into a temp directory and compare the bytes. */
  const gen = join(HERE, "src", "build.py");
  assert.ok(existsSync(gen), "the generator is missing, so the pages cannot be rebuilt");
  for(const part of ["page.css.html", "case-script.js"]){
    assert.ok(existsSync(join(HERE, "src", part)), `src/${part} is missing`);
  }
  const out = mkdtempSync(join(tmpdir(), "mis-homework-"));
  try{
    const run = spawnSync("python3", [gen, "--out", out, "--quiet"], { encoding: "utf8" });
    if(run.error || run.status !== 0){
      assert.fail(`the generator did not run: ${run.stderr || run.error}`);
    }
    for(const paper of PAPERS){
      const fresh = readFileSync(join(out, paper.file), "utf8");
      assert.equal(fresh, paper.html,
        `${paper.file} on disk differs from what the generator produces — rebuild it`);
    }
  } finally {
    rmSync(out, { recursive: true, force: true });
  }
});

test("neither paper reuses a firm from the exam, the practice papers or the game", () => {
  /* A student who pattern-matches a case they have already worked gets the
     wrong answer, which is worse than not having seen it. */
  /* The graded assessment's own firm is deliberately absent from this list: this
     file is public, and naming it here would republish what the list protects.
     src/forbidden.local.txt carries it and the reserved-term test above uses it. */
  const others = ["Ridgeline", "Halloway", "Harbor", "Riverside", "Fairmount"];
  for(const paper of PAPERS){
    for(const firm of others){
      assert.doesNotMatch(paper.html, new RegExp("\\b" + firm + "\\b", "i"),
        `${paper.file} reuses ${firm}, a firm from another paper in this repository`);
    }
  }
});
