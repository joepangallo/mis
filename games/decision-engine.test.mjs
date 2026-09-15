/* Contract tests for Decision Engine, the Chapter 7 management game.
 *
 * Node standard library only — there is no package.json in this repository and
 * the game deliberately has no dependencies of its own.
 *
 * The page's data and its pure functions are reached by evaluating the whole
 * inline script against a small DOM stub, rather than by regex-parsing fields,
 * so a briefing whose text happens to contain a brace or a quote cannot break
 * the tests. Everything the page computes — cube answers, model accuracy, the
 * cost of a review gate — is then recomputed here from first principles and
 * compared, so a tuned constant that quietly breaks a lesson fails the build.
 *
 * Run: node --test games/decision-engine.test.mjs
 */
import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, "..");
const PAGE = "decision-engine.html";
const html = readFileSync(join(HERE, PAGE), "utf8");

/* ============================================================================
   LOADING THE GAME
   ========================================================================== */
function inlineScripts(source){
  return [...source.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/gi)].map(m => m[1]);
}

/* A DOM barely real enough for the handful of statements that run when the
   script loads. The boot call itself is removed: the test wants the data and
   the arithmetic, not a rendered page. */
function loadGame(){
  const scripts = inlineScripts(html);
  assert.equal(scripts.length, 1, "the game should ship as exactly one inline script");
  let code = scripts[0];
  assert.ok(/\nshowIntro\(\);\s*$/.test(code.trimEnd() + "\n"),
    "the script must end by booting with showIntro(), so the test knows what to strip");
  code = code.replace(/\nshowIntro\(\);\s*$/, "\n");

  const node = () => {
    const n = {
      textContent: "", innerHTML: "", value: "", checked: false, disabled: false,
      hidden: false, className: "", style: {}, firstChild: null,
      classList: { add(){}, remove(){}, toggle(){}, contains(){ return false; } },
      setAttribute(){}, getAttribute(){ return null; }, removeAttribute(){},
      addEventListener(){}, removeEventListener(){}, dispatchEvent(){},
      appendChild(){}, removeChild(){}, insertBefore(){}, closest(){ return null; },
      querySelector(){ return null; }, querySelectorAll(){ return []; },
      getBoundingClientRect(){ return { width:0, height:0 }; }
    };
    return n;
  };
  const store = new Map();
  const sandbox = {
    document: {
      documentElement: node(),
      body: node(),
      getElementById(){ return node(); },
      createElement(){ return node(); },
      querySelector(){ return null; },
      querySelectorAll(){ return []; }
    },
    localStorage: {
      getItem: k => (store.has(k) ? store.get(k) : null),
      setItem: (k, v) => store.set(k, String(v)),
      removeItem: k => store.delete(k)
    },
    window: { scrollTo(){}, confirm(){ return true; } },
    setTimeout, clearTimeout, console
  };

  const exported = [
    "LOS", "COURSE_OBJECTIVES", "DEMO", "CUBE", "BASKET_ITEMS", "BASKETS", "FIRM", "START",
    "THEME_KEY", "BEST_KEY", "MISSIONS", "KINDS", "REQUESTS", "PRIORITY",
    "cubeSum", "cubeValue", "CUBE_ANSWERS", "TILES", "DSS", "DSS_ANSWERS",
    "dssMargin", "dssAttainable", "RULE_BAR", "support", "confidence",
    "basketCount", "basketBoth", "FUEL_ROWS", "FUEL_THRESHOLD", "CLUSTERS",
    "CLUSTER_READINGS", "ML", "ML_PROBLEMS", "ML_SOURCES", "ML_CLEAN", "ML_LABELS",
    "mlTrueAccuracy", "mlSplitBand", "mlMatrix", "DEPLOYMENTS", "GENAI_TASKS",
    "CONTROLS", "CLAIM_LINES", "AGENT", "PIPELINE", "GATES", "AGENT_FACTS",
    "MAP_LAYERS", "SITES", "POSTCODES", "MOST_ORDERS", "MOST_DENSE", "PEOPLE",
    "TIES", "degreeOf", "MOST_CONNECTED", "THE_BRIDGE", "KNOWLEDGE",
    "KM_CHALLENGES", "ENDINGS", "verdictFor"
  ];
  const keys = Object.keys(sandbox);
  const fn = new Function(...keys,
    `"use strict";\n${code}\nreturn { ${exported.join(", ")} };`);
  return fn(...keys.map(k => sandbox[k]));
}

const G = loadGame();

function nonEmpty(v){ return typeof v === "string" && v.trim().length > 0; }

/* ============================================================================
   THE PAGE ITSELF
   ========================================================================== */
test("the inline script parses as valid JavaScript", () => {
  for(const script of inlineScripts(html)){
    assert.doesNotThrow(() => new Function(script), "inline script does not parse");
  }
});

test("every src and href is a relative link to a file that exists", () => {
  const markup = html.replace(/<script(?:\s[^>]*)?>[\s\S]*?<\/script>/gi, "");
  const refs = [...markup.matchAll(/(?:src|href)="([^"]*)"/g)].map(m => m[1]);
  assert.ok(refs.length >= 3, "expected links back to a module and the other pages");
  for(const ref of refs){
    assert.ok(!/^[a-zA-Z][a-zA-Z0-9+.-]*:/.test(ref) && !ref.startsWith("//"),
      `external reference "${ref}" breaks the offline, self-contained contract`);
    const path = ref.split("#")[0].split("?")[0];
    if(path === "") continue;
    assert.ok(existsSync(join(HERE, path)), `link target "${path}" does not exist`);
  }
});

test("nothing on the page reaches the network", () => {
  assert.doesNotMatch(html, /\b(?:fetch|XMLHttpRequest|WebSocket|EventSource)\s*\(/,
    "the game must not make a network request of any kind");
  assert.doesNotMatch(html, /https?:\/\//, "no absolute URL may appear on the page");
});

test("accessibility baseline: a polite live region and a labelled theme toggle", () => {
  assert.match(html, /role="status" aria-live="polite" id="liveStatus"/,
    "liveStatus must be a polite status live region");
  assert.match(html, /id="themeBtn" aria-label="/, "the theme toggle needs an aria-label");
  assert.match(html, /\[hidden\]\{display:none !important\}/,
    "a display rule on a flex container beats the user agent's [hidden] rule, so the page must restate it");
});

test("the page inherits the study modules' theme and persists its own override", () => {
  assert.ok(html.includes('localStorage.getItem("mis-ch1-theme-v1")'),
    "must fall back to the shared module theme when it has no saved choice of its own");
  assert.ok(html.includes("localStorage.getItem(THEME_KEY)"),
    "must read its own saved theme before the shared fallback");
  assert.ok(html.includes("localStorage.setItem(THEME_KEY,"),
    "the theme toggle must persist to THEME_KEY");
  for(const key of [G.THEME_KEY, G.BEST_KEY]){
    assert.ok(key.startsWith("mis-"), `${key} must live in the mis- namespace`);
  }
  assert.notEqual(G.THEME_KEY, G.BEST_KEY);
  for(const taken of ["mis-ch1-theme-v1", "mis-jeopardy-theme-v1", "mis-ffvc-jeopardy-theme-v1"]){
    assert.notEqual(G.THEME_KEY, taken, `THEME_KEY collides with ${taken}`);
  }
  assert.notEqual(G.BEST_KEY, "mis-jeopardy-best-v1");
  assert.notEqual(G.BEST_KEY, "mis-ffvc-jeopardy-best-v1");
});

/* ============================================================================
   ASSESSMENT AND ATTRIBUTION HYGIENE
   ========================================================================== */
test("no institutional, course-code, or local-path wording reaches the page", () => {
  const forbidden = [
    /\bKeiser\b/i, /\bCGS\s*-?\s*3300\b/i, /\bsignature assignment\b/i,
    /\bSLO\s*-?\s*1\b/i, /\bbenchmark grade\b/i, /\/Users\//, /\bC:\\/
  ];
  for(const pattern of forbidden){
    assert.doesNotMatch(html, pattern, `forbidden wording ${pattern} appears on the page`);
  }
});

test("no reserved assessment term reaches the page", (t) => {
  const list = join(ROOT, "src", "forbidden.local.txt");
  if(!existsSync(list)){
    t.skip("src/forbidden.local.txt is not present, so assessment-specific terms are not being checked");
    return;
  }
  const terms = readFileSync(list, "utf8").split(/\r?\n/).map(s => s.trim()).filter(Boolean);
  if(terms.length === 0){ t.skip("no reserved terms listed"); return; }
  for(const term of terms){
    const pattern = new RegExp("\\b" + term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "\\b", "i");
    assert.doesNotMatch(html, pattern, "the page contains a reserved assessment term");
  }
});

test("the firms are invented, and the only real company named is the chapter's own example", () => {
  assert.match(html, /Every organization, person and figure in this game is invented\./,
    "the page must say plainly that its firms are invented");
  /* The chapter illustrates automated prescriptive analytics with one named
     company. It may appear once, inside a card marked as the chapter's, and a
     second real company would be a practice situation dressed as reported fact. */
  const occurrences = [...html.matchAll(/\bUber\b/g)];
  assert.equal(occurrences.length, 1, "the chapter's named example should appear exactly once");
  const note = html.slice(Math.max(0, occurrences[0].index - 400), occurrences[0].index);
  assert.ok(note.includes("chapter-note"),
    "a real company may only be named inside a note marked as the chapter's own");
});

/* ============================================================================
   THE SHAPE OF THE GAME
   ========================================================================== */
test("eight quarters, numbered in order, each fully written", () => {
  assert.equal(G.MISSIONS.length, 8, "the game is eight quarters");
  G.MISSIONS.forEach((m, i) => {
    assert.equal(m.quarter, i + 1, `mission ${i} is numbered ${m.quarter}`);
    assert.ok(Object.prototype.hasOwnProperty.call(G.LOS, m.lo),
      `quarter ${m.quarter} claims objective ${m.lo}, which is not one of the chapter's`);
    for(const field of ["name", "railName", "teaches", "commitNote"]){
      assert.ok(nonEmpty(m[field]), `quarter ${m.quarter} is missing ${field}`);
    }
    assert.ok(nonEmpty(m.brief.from), `quarter ${m.quarter} briefing has no sender`);
    assert.ok(nonEmpty(m.brief.title), `quarter ${m.quarter} briefing has no title`);
    assert.ok(Array.isArray(m.brief.body) && m.brief.body.length >= 2,
      `quarter ${m.quarter} briefing needs at least two paragraphs`);
    assert.ok(nonEmpty(m.brief.ask), `quarter ${m.quarter} does not say what the board needs`);
    assert.ok(nonEmpty(m.manual.title) && nonEmpty(m.manual.body),
      `quarter ${m.quarter} has no field manual`);
    assert.ok(m.manual.body.length >= 400,
      `quarter ${m.quarter}'s field manual is too thin to rescue a stuck reader`);
    assert.equal(typeof m.build, "function", `quarter ${m.quarter} has no builder`);
    assert.equal(typeof m.submit, "function", `quarter ${m.quarter} has no grader`);
  });
});

test("all four of the chapter's objectives are played, and none is a token", () => {
  const counts = {};
  for(const key of Object.keys(G.LOS)) counts[key] = 0;
  for(const m of G.MISSIONS) counts[m.lo]++;
  for(const [key, n] of Object.entries(counts)){
    assert.ok(n >= 1, `objective ${key} is never the subject of a quarter`);
  }
  /* The chapter's second objective carries business intelligence and the whole
     of machine learning, so it is expected to dominate — but not to be alone. */
  assert.ok(counts["7.2"] >= 3, "objective 7.2 should carry several quarters");
  assert.ok(counts["7.2"] <= 5, "objective 7.2 should not swallow the whole game");
});

test("the course objectives claimed and disclaimed partition the eleven exactly", () => {
  const claimed = G.COURSE_OBJECTIVES.claimed.map(o => o.n);
  const not = G.COURSE_OBJECTIVES.notClaimed.map(o => o.n);
  const all = [...claimed, ...not].sort((a, b) => a - b);
  assert.deepEqual(all, [1,2,3,4,5,6,7,8,9,10,11],
    "every course objective must be either claimed or explicitly disclaimed, exactly once");
  for(const o of [...G.COURSE_OBJECTIVES.claimed, ...G.COURSE_OBJECTIVES.notClaimed]){
    assert.ok(nonEmpty(o.text), `course objective ${o.n} has no wording`);
  }
  /* The spreadsheet objective is the one a reader could most plausibly think
     this game covers, so the page has to say why it does not. */
  const eleven = G.COURSE_OBJECTIVES.notClaimed.find(o => o.n === 11);
  assert.ok(eleven && /spreadsheet/i.test(eleven.text),
    "objective 11 must be disclaimed with a reason, since the game does teach what a DSS is");
});

/* ============================================================================
   TELLING THE READER HOW TO PLAY
   The first version of this page explained what the game was about and never
   what to physically do, and the first reader said so. These are the guards.
   ========================================================================== */
test("the intro screen lets you play a round before it asks you to read anything", () => {
  /* The first two versions of this page opened with several hundred words of
     scenario. A confused reader was answered with more prose, twice. The fix is
     that the first thing on the screen is a decision you can actually make. */
  const introStart = html.indexOf("function showIntro()");
  const introEnd = html.indexOf("function showMission(");
  const intro = html.slice(introStart, introEnd);

  const tryCard = intro.indexOf('class:"tryit"');
  const firstPanel = intro.indexOf('class:"panel"');
  assert.ok(tryCard >= 0, "the intro must carry a playable try-it card");
  assert.ok(firstPanel === -1 || tryCard < firstPanel,
    "the try-it card must come before any panel of explanation");

  const startBtn = intro.indexOf('id:"startBtn"');
  assert.ok(startBtn > tryCard, "the start button sits under the card you just played");
  /* And everything heavy is folded away rather than stacked in front. */
  assert.ok(intro.includes('el("details", { class:"manual" })'),
    "the scenario, the meters and the coverage must be foldable, not stacked on the intro");

  assert.ok(nonEmpty(G.DEMO.text) && nonEmpty(G.DEMO.from), "the try-it card needs a real request");
  assert.ok(G.KINDS.some(k => k.id === G.DEMO.answer), "the try-it answer must be one of the four kinds");
  assert.ok(G.DEMO.right.length >= 80 && G.DEMO.wrong.length >= 80,
    "both outcomes of the try-it card must teach, not just mark");
});

test("the try-it request is not one of the eight the first quarter uses", () => {
  const norm = t => t.replace(/\s+/g, " ").trim().toLowerCase();
  for(const r of G.REQUESTS){
    assert.notEqual(norm(r.text), norm(G.DEMO.text),
      "the demo must not spend one of quarter one's own requests");
  }
});

test("the intro is short enough to be read by someone who is lost", () => {
  /* Measured as the words a reader meets before the start button, with the
     folded detail excluded. The first version of this page had about 550. */
  const introAt = html.indexOf("function showIntro()");
  const foldAt = html.indexOf('el("details", { class:"manual" })', introAt);
  assert.ok(foldAt > introAt, "the folded detail block must sit inside showIntro");
  const intro = html.slice(introAt, foldAt);
  const count = t => t.replace(/<[^>]+>/g, " ").replace(/[^A-Za-z ]/g, " ")
    .split(/\s+/).filter(Boolean).length;
  const all = count((intro.match(/"[^"]{20,}"/g) || []).join(" "));
  /* Only one of the try-it card's two outcomes is ever on screen, so counting
     both overstates what a reader actually meets. */
  const shown = all - count(G.DEMO.right) - count(G.DEMO.wrong)
    + Math.max(count(G.DEMO.right), count(G.DEMO.wrong));
  assert.ok(shown > 40, `only ${shown} words found before the fold — the measurement is not reading the intro`);
  assert.ok(shown < 240,
    `the intro shows about ${shown} words before the fold; a confused reader needs far fewer`);
});

test("how to play is still available, folded, for a reader who wants it", () => {
  assert.ok(html.includes("<h3 style=\\\"margin:12px 0 6px\\\">How to play</h3>") ||
            html.includes("How to play</h3>"),
    "the four-step loop must still be written down somewhere");
  for(const phrase of ["Read the briefing", "Do the work on the page",
                       "Press the button at the bottom right", "Read what it cost you"]){
    assert.ok(html.includes(phrase), `the loop must name the step "${phrase}"`);
  }
  assert.match(html, /field manual/i, "a stuck reader must be pointed at the field manual");
  assert.match(html, /one-way/i, "committing must be described as one-way");
  for(const meter of ["Cash", "Trust", "Capability", "Score"]){
    assert.ok(html.includes(`<b>${meter}</b>`), `the ${meter} meter must be explained somewhere`);
  }
  /* The button's label and the scoring it triggers must both be spelled out. */
  assert.ok(html.includes("How you are scored</h3>"),
    "the folded detail must explain how answers are scored");
  assert.match(html, /Submit my answers/,
    "the button must say what it does in plain words rather than 'commit'");
  assert.doesNotMatch(html, /Commit the quarter/,
    "the old jargon label must be gone everywhere, including the instructions");
});

test("every quarter states its job in one sentence, before any scenario", () => {
  for(const m of G.MISSIONS){
    assert.ok(nonEmpty(m.task), `quarter ${m.quarter} does not say what the job is in one line`);
    assert.ok(m.task.length >= 45 && m.task.length <= 150,
      `quarter ${m.quarter}'s one-line job is ${m.task.length} characters; it should be one readable sentence`);
    assert.ok(!/\.\s+[A-Z]/.test(m.task.replace(/\.$/, "")),
      `quarter ${m.quarter}'s job line is more than one sentence`);
  }
  const build = html.slice(html.indexOf("function showMission("), html.indexOf("/* A quarter's result"));
  const bar = build.indexOf('class:"qbar"');
  const brief = build.indexOf("renderBrief(m)");
  assert.ok(bar >= 0 && brief >= 0, "both the job bar and the briefing must render");
  assert.ok(bar < brief, "the one-line job must come before the briefing, not after it");
  assert.match(build, /Quarter " \+ m\.quarter \+ " of " \+ MISSIONS\.length/,
    "the reader must be able to see how far through the eight they are");
});

test("every quarter says what to do on its own screen, in order", () => {
  for(const m of G.MISSIONS){
    assert.ok(Array.isArray(m.howTo) && m.howTo.length >= 3,
      `quarter ${m.quarter} does not tell the reader what to do on the screen`);
    for(const step of m.howTo){
      assert.ok(nonEmpty(step) && step.length >= 40,
        `quarter ${m.quarter} has an instruction too terse to follow: "${step}"`);
      /* An instruction is a thing to do, not a thing to know. */
      assert.match(step, /\b(?:click|press|pick|choose|answer|read|use|tick|set|move|work|switch|sort|say|decide|tell|in the|below)\b/i,
        `quarter ${m.quarter} has an instruction that does not tell the reader to do anything: "${step}"`);
    }
    assert.ok(nonEmpty(m.commitNote),
      `quarter ${m.quarter} has nothing to show in the badge beside the commit button`);
  }
});

test("the instructions sit above the field manual, not below it", () => {
  const build = html.slice(html.indexOf("function showMission("), html.indexOf("/* A quarter's result"));
  const steps = build.indexOf('class:"howto"');
  const manual = build.indexOf("renderManual(m)");
  assert.ok(steps >= 0 && manual >= 0, "both the steps strip and the manual must be rendered");
  assert.ok(steps < manual,
    "what to do on this screen must come before the concept behind it");
});

test("the badge beside the commit button reports readiness both ways", () => {
  assert.match(html, /n\.className = "todo" \+ \(on \? " ready" : ""\)/,
    "the outstanding-work badge must change state when the quarter becomes committable");
  assert.match(html, /\.todo\.ready\{/, "the ready state needs its own styling");
});

/* ============================================================================
   QUARTER 1 — THE CONTINUUM
   ========================================================================== */
test("the inbox covers all four kinds of analysis and never names them in the request", () => {
  const kinds = G.KINDS.map(k => k.id);
  assert.deepEqual(kinds, ["desc", "diag", "pred", "pres"], "the continuum runs in order");
  const used = new Set(G.REQUESTS.map(r => r.kind));
  for(const k of kinds) assert.ok(used.has(k), `no request is ${k}`);
  assert.equal(G.REQUESTS.length, 8, "eight requests");
  for(const r of G.REQUESTS){
    assert.ok(nonEmpty(r.from) && nonEmpty(r.text), "a request is incomplete");
    assert.ok(r.why.length >= 80, `the reason for "${r.text.slice(0, 40)}" is too short to teach`);
    /* The giveaway must be the shape of the question, not a keyword. */
    assert.doesNotMatch(r.text, /\b(descriptive|diagnostic|predictive|prescriptive)\b/i,
      `request "${r.text.slice(0, 40)}" names the answer in the question`);
  }
});

test("the two requests worth building first are the ones the board actually named", () => {
  assert.equal(G.PRIORITY.length, 2, "exactly two are built first");
  const chosen = G.PRIORITY.map(id => G.REQUESTS.find(r => r.id === id));
  for(const r of chosen) assert.ok(r, "a priority id does not match a request");
  /* They form a chain: forecast the shortage, then act on the forecast. */
  const kinds = chosen.map(r => r.kind).sort();
  assert.deepEqual(kinds, ["pred", "pres"],
    "the pair the board asked for is a prediction and the action taken on it");
  for(const r of chosen){
    assert.match(r.text, /East|40 depots/,
      "a priority request must visibly concern the stockout the briefing names");
  }
});

/* ============================================================================
   QUARTER 2 — THE CUBE
   ========================================================================== */
test("the cube is complete, and every number in it is a positive integer", () => {
  assert.equal(G.CUBE.products.length, 4);
  assert.equal(G.CUBE.regions.length, 4);
  assert.equal(G.CUBE.quarters.length, 4);
  for(const measure of G.CUBE.measures.map(m => m.id)){
    const grid = G.CUBE[measure];
    assert.equal(grid.length, 4, `${measure} is missing a product`);
    for(const byRegion of grid){
      assert.equal(byRegion.length, 4, `${measure} is missing a region`);
      for(const byQuarter of byRegion){
        assert.equal(byQuarter.length, 4, `${measure} is missing a quarter`);
        for(const v of byQuarter){
          assert.ok(Number.isInteger(v) && v > 0, `${measure} holds ${v}`);
        }
      }
    }
  }
});

test("every stated cube answer is recomputed independently and matches", () => {
  /* Recomputed here from the raw arrays rather than through the page's own
     helper, so a broken helper cannot agree with itself. */
  const { rev, mar, products, regions, quarters } = G.CUBE;
  const pi = n => products.indexOf(n), ri = n => regions.indexOf(n);

  assert.equal(G.CUBE_ANSWERS.cell, rev[pi("Frozen")][ri("West")][quarters.indexOf("Q3")],
    "the single-cell answer is not the cell it names");

  let dice = 0;
  for(const p of ["Chilled", "Frozen"]) for(const r of ["North", "East"]) for(const q of [1, 2]){
    dice += rev[pi(p)][ri(r)][q];
  }
  assert.equal(G.CUBE_ANSWERS.dice, dice, "the diced block does not total what the page claims");

  const yearBy = (grid, product) => regions.map((r, i) => ({
    region: r, total: grid[pi(product)][i].reduce((a, b) => a + b, 0)
  }));
  const byRev = yearBy(rev, "Chilled").sort((a, b) => b.total - a.total);
  const byMar = yearBy(mar, "Chilled").sort((a, b) => b.total - a.total);
  assert.equal(G.CUBE_ANSWERS.topRev, byRev[0].region);
  assert.equal(G.CUBE_ANSWERS.topMar, byMar[0].region);
  assert.ok(byRev[0].total > byRev[1].total, "the revenue answer is a tie");
  assert.ok(byMar[0].total > byMar[1].total, "the margin answer is a tie");
});

test("the measure you choose changes the answer, which is the whole lesson", () => {
  assert.notEqual(G.CUBE_ANSWERS.topRev, G.CUBE_ANSWERS.topMar,
    "if the same region wins on revenue and on margin, quarter two teaches nothing");
});

/* ============================================================================
   QUARTER 3 — THE DASHBOARD AND THE MODEL
   ========================================================================== */
test("the dashboard offers exactly six tiles worth having, for six slots", () => {
  assert.equal(G.TILES.filter(t => t.good).length, 6, "six good tiles for six slots");
  assert.equal(G.TILES.filter(t => !t.good).length, 6, "and six that should not be chosen");
  for(const t of G.TILES){
    assert.ok(nonEmpty(t.title), "a tile has no title");
    assert.ok(t.why.length >= 60, `tile "${t.title}" does not explain itself`);
  }
  /* A screen with neither of these is a report, and the debrief says so. */
  for(const id of ["alerts", "drill"]){
    const tile = G.TILES.find(t => t.id === id);
    assert.ok(tile && tile.good, `the ${id} tile must exist and be one of the right answers`);
  }
});

test("the decision support model computes the four analyses it claims", () => {
  const { fixedCost, baseVariable, contractVolume, target, priceCap, fuel } = G.DSS;
  const margin = (p, v, c) => v * (p - c) - fixedCost;

  /* Goal seeking: the stated price hits the target exactly at the contract volume. */
  assert.equal(
    Math.round(margin(G.DSS_ANSWERS.goalSeekPrice, contractVolume, baseVariable)),
    target, "the goal-seek price does not produce the board's target");

  /* What-if: the fuel rise figure is the model's own arithmetic. */
  assert.ok(Math.abs(G.DSS_ANSWERS.whatIf -
    margin(G.DSS_ANSWERS.goalSeekPrice, contractVolume, fuel.rise.cost)) < 1,
    "the what-if answer is not what the model produces");

  /* Sensitivity: probabilities sum to one, and the expectation is the weighted sum. */
  const ps = ["rise", "flat", "fall"].map(k => fuel[k].p);
  assert.ok(Math.abs(ps.reduce((a, b) => a + b, 0) - 1) < 1e-9,
    "the fuel scenario probabilities do not sum to 1");
  const expected = ["rise", "flat", "fall"]
    .reduce((sum, k) => sum + fuel[k].p * margin(G.DSS_ANSWERS.goalSeekPrice, contractVolume, fuel[k].cost), 0);
  assert.equal(G.DSS_ANSWERS.expected, Math.round(expected));

  /* And the lesson: the point estimate hits the target while the expectation misses. */
  assert.ok(G.DSS_ANSWERS.expected < target,
    "if the probability-weighted margin also clears the target, the sensitivity question teaches nothing");
});

test("the optimisation has a genuine interior optimum with both constraints live", () => {
  const { baseVariable, priceCap, fleetCap, demandIntercept, demandSlope } = G.DSS;
  const attainable = p => Math.min(fleetCap, Math.round(demandIntercept - demandSlope * p));
  const margin = p => attainable(p) * (p - baseVariable) - G.DSS.fixedCost;

  let best = null, bestPrice = null, ties = 0;
  for(let p = 34; p <= priceCap + 1e-9; p += 0.5){
    const m = margin(p);
    if(best === null || m > best){ best = m; bestPrice = Math.round(p * 2) / 2; ties = 0; }
    else if(m === best) ties++;
  }
  assert.equal(G.DSS_ANSWERS.bestPrice, bestPrice, "the stated best price is not the best price");
  assert.equal(G.DSS_ANSWERS.bestMargin, best);
  assert.ok(bestPrice < priceCap,
    "the optimum must sit inside the competitor's ceiling, or the answer is just 'charge the maximum'");
  assert.ok(bestPrice > 34,
    "the optimum must sit above the bottom of the slider, or the answer is just 'charge the minimum'");

  /* The fleet limit has to bite somewhere in range, or it is decoration. */
  const capBinds = [];
  for(let p = 34; p <= priceCap + 1e-9; p += 0.5){
    if(demandIntercept - demandSlope * p > fleetCap) capBinds.push(p);
  }
  assert.ok(capBinds.length > 0, "the fleet limit never binds, so it is not a constraint");
  assert.ok(capBinds.every(p => p < bestPrice),
    "the fleet limit should bind below the optimum, so the two constraints squeeze from opposite sides");
});

test("the goal-seek volume is one the demand curve will not actually give you", () => {
  /* This mismatch is the fifth question in quarter three, and it only teaches
     if the numbers really disagree. */
  const attainable = G.dssAttainable(G.DSS_ANSWERS.goalSeekPrice);
  assert.ok(attainable < G.DSS.contractVolume,
    "at the goal-seek price the demand curve must fall short of the volume the goal seek assumed");
});

/* ============================================================================
   QUARTER 4 — UNSUPERVISED
   ========================================================================== */
test("support and confidence are computed the way the chapter defines them", () => {
  const n = G.BASKETS.length;
  for(const a of G.BASKET_ITEMS) for(const b of G.BASKET_ITEMS){
    if(a === b) continue;
    const both = G.BASKETS.filter(x => x.includes(a) && x.includes(b)).length;
    const countA = G.BASKETS.filter(x => x.includes(a)).length;
    assert.ok(Math.abs(G.support(a, b) - both / n) < 1e-12, `support(${a},${b})`);
    const expected = countA ? both / countA : 0;
    assert.ok(Math.abs(G.confidence(a, b) - expected) < 1e-12, `confidence(${a},${b})`);
  }
});

test("a rule clearing both bars exists, and is not the only pair that looks good", () => {
  const passing = [];
  for(const a of G.BASKET_ITEMS) for(const b of G.BASKET_ITEMS){
    if(a === b) continue;
    if(G.support(a, b) >= G.RULE_BAR.support - 1e-9 &&
       G.confidence(a, b) >= G.RULE_BAR.confidence - 1e-9) passing.push(`${a}->${b}`);
  }
  assert.ok(passing.length >= 2,
    "the hunt needs more than one answer, or it is a guess rather than a search");
  /* And the bar has to exclude something, or it is not a bar. */
  const failing = [];
  for(const a of G.BASKET_ITEMS) for(const b of G.BASKET_ITEMS){
    if(a === b) continue;
    if(G.confidence(a, b) >= G.RULE_BAR.confidence && G.support(a, b) < G.RULE_BAR.support){
      failing.push(`${a}->${b}`);
    }
  }
  assert.ok(failing.length >= 1,
    "at least one reliable-but-rare rule must exist, or the support bar never does any work");
});

test("the hundred-per-cent rule really does rest on a single order", () => {
  assert.equal(G.confidence("Saffron", "Cooking oil"), 1,
    "the trap rule must have perfect confidence");
  assert.ok(G.support("Saffron", "Cooking oil") < G.RULE_BAR.support,
    "the trap rule must fail the support bar");
  assert.equal(G.basketCount("Saffron"), 1,
    "the trap is only vivid if the item appears exactly once");
});

test("support is symmetric and confidence is not, on the pair the question asks about", () => {
  const ab = { s: G.support("Chicken", "Cooking oil"), c: G.confidence("Chicken", "Cooking oil") };
  const ba = { s: G.support("Cooking oil", "Chicken"), c: G.confidence("Cooking oil", "Chicken") };
  assert.equal(ab.s, ba.s, "support must read the same in both directions");
  assert.notEqual(ab.c, ba.c, "confidence must differ, or the direction question has no answer");
  assert.ok(Math.abs(ab.c - ba.c) > 0.2,
    "the two confidences must differ visibly, not by a rounding error");
});

test("the fuel card anomaly is a pattern rather than a depot, and has decoys", () => {
  const odd = G.FUEL_ROWS.filter(r => r.odd);
  assert.equal(odd.length, 3, "three transactions form the pattern");
  const depots = new Set(odd.map(r => r.depot));
  assert.equal(depots.size, 1, "the pattern should sit on one card");
  for(const r of odd){
    assert.ok(r.amount < G.FUEL_THRESHOLD, "each fill must sit under the approval threshold");
    assert.ok(G.FUEL_THRESHOLD - r.amount <= 5, "and suspiciously close to it");
  }
  /* The same depot must also appear with an ordinary transaction, so a reader
     who flags "depot 23" rather than the pattern is marked wrong for a reason. */
  const depot = odd[0].depot;
  assert.ok(G.FUEL_ROWS.some(r => r.depot === depot && !r.odd),
    "the flagged depot needs an ordinary row, or the answer is the depot rather than the pattern");
  /* And a near-threshold single fill elsewhere, so size alone is not the tell. */
  assert.ok(G.FUEL_ROWS.some(r => !r.odd && r.amount > G.FUEL_THRESHOLD * 0.9),
    "a large but legitimate fill must exist, or the tell is simply the amount");
});

test("each cluster has a distinct reading, and every reading is used", () => {
  const rights = G.CLUSTERS.map(c => c.right);
  assert.equal(new Set(rights).size, G.CLUSTERS.length, "two clusters share an answer");
  assert.deepEqual(rights.slice().sort(), G.CLUSTER_READINGS.map(t => t.id).sort(),
    "the readings and the clusters must correspond exactly, so the rows a reader is sure of settle the rest");
  for(const t of G.CLUSTER_READINGS){
    assert.ok(nonEmpty(t.label) && t.action.length >= 40, `reading ${t.id} is incomplete`);
  }
});

/* ============================================================================
   QUARTER 5 — THE MODEL
   ========================================================================== */
test("every step of the workflow has exactly one best answer", () => {
  assert.equal(G.ML_PROBLEMS.filter(p => p.ok).length, 1, "one problem is the right problem");
  assert.equal(G.ML_LABELS.filter(l => l.best).length, 1, "one label definition is right");
  assert.equal(G.KM_CHALLENGES.filter(c => c.best).length, 1, "one challenge is the right one");
  for(const row of G.ML_CLEAN){
    assert.equal(row.options.filter(o => o.best).length, 1,
      `cleaning step "${row.id}" does not have exactly one best option`);
    const best = row.options.find(o => o.best);
    for(const o of row.options){
      if(o === best) continue;
      assert.ok(o.gain < best.gain,
        `in "${row.id}" the option marked best is not the one worth most`);
    }
    assert.ok(row.why.length >= 100, `cleaning step "${row.id}" does not explain itself`);
  }
  for(const p of G.ML_PROBLEMS) assert.ok(p.why.length >= 80, "a problem option has no reasoning");
  for(const l of G.ML_LABELS) assert.ok(l.why.length >= 80, "a label option has no reasoning");
});

test("the ground truth that is merely convenient scores worse than none of it", () => {
  const complaint = G.ML_LABELS.find(l => /complained/i.test(l.title));
  assert.ok(complaint, "the complaint-based label must be offered");
  assert.ok(complaint.gain < 0,
    "a biased label must actively cost accuracy, not merely fail to add any");
});

test("careful play clears the bar, careless play is nowhere near it", () => {
  const bestClean = {};
  const worstClean = {};
  for(const row of G.ML_CLEAN){
    bestClean[row.id] = row.options.find(o => o.best).id;
    worstClean[row.id] = row.options.slice().sort((a, b) => a.gain - b.gain)[0].id;
  }
  const goodSources = G.ML_SOURCES.filter(s => !s.fixed && s.good).map(s => s.id);
  const bestLabel = G.ML_LABELS.find(l => l.best).id;
  const worstLabel = G.ML_LABELS.slice().sort((a, b) => a.gain - b.gain)[0].id;

  const high = G.mlTrueAccuracy(goodSources, bestClean, bestLabel);
  const low = G.mlTrueAccuracy([], worstClean, worstLabel);
  assert.ok(high >= G.ML.threshold,
    `perfect play reaches ${high}%, which does not clear the ${G.ML.threshold}% bar the briefing sets`);
  assert.ok(low < 70,
    `careless play reaches ${low}%, which is not low enough to make stopping the project the right call`);
  /* And the middle band has to be reachable, since going back for more data is
     the decision the workflow diagram's dashed arrow exists for. */
  /* Buying no outside data, but doing everything else right, is the ordinary
     way to land just under the bar. */
  const middle = G.mlTrueAccuracy([], bestClean, bestLabel);
  assert.ok(middle >= 70 && middle < G.ML.threshold,
    `no ordinary set of choices lands between 70% and the bar (got ${middle}%), so one of the three decisions is unreachable`);
});

test("testing on the training data reports a better number than the model has", () => {
  const leak = G.mlSplitBand(100);
  assert.equal(leak.leak, true, "a 100% training split must be flagged as leakage");
  assert.equal(leak.points, 0, "and must score nothing");
  for(const pct of [70, 75, 80]){
    const band = G.mlSplitBand(pct);
    assert.equal(band.leak, false, `${pct}% must not be flagged as leakage`);
    assert.equal(band.points, 2, `${pct}% is the split the chapter recommends and should score full marks`);
  }
  for(const pct of [50, 60, 85, 90, 95]){
    assert.equal(G.mlSplitBand(pct).points, 1, `${pct}% is honest but not ideal`);
  }
});

test("the confusion matrix always adds up to the test set", () => {
  for(const testN of [480, 600, 720, 2400]){
    for(const acc of [45, 58, 72, 85, 92, 99]){
      const m = G.mlMatrix(testN, acc);
      assert.equal(m.tp + m.fn + m.tn + m.fp, testN, `matrix does not sum at ${acc}% on ${testN}`);
      assert.equal(m.tp + m.fn, m.actualLate);
      assert.equal(m.tn + m.fp, m.actualOn);
      for(const v of [m.tp, m.fn, m.tn, m.fp]){
        assert.ok(v >= 0, `a negative cell at ${acc}% on ${testN}`);
      }
      const shown = Math.round((m.tp + m.tn) / testN * 100);
      assert.ok(Math.abs(shown - acc) <= 1,
        `the matrix reads ${shown}% where the headline says ${acc}%`);
    }
  }
});

/* ============================================================================
   QUARTER 6 — GENERATIVE AI
   ========================================================================== */
test("the deployment ladder is a menu rather than a ranking", () => {
  const bests = G.GENAI_TASKS.map(t => t.best);
  assert.equal(new Set(bests).size, G.GENAI_TASKS.length,
    "if two tasks share a right answer, the ladder reads as a hierarchy");
  const costs = G.DEPLOYMENTS.map(d => d.cost);
  assert.deepEqual(costs.slice().sort((a, b) => a - b), costs, "the ladder must be listed cheapest first");
  /* The cheapest rung has to be right somewhere, or the lesson is 'spend more'. */
  const cheapest = G.DEPLOYMENTS[0].id;
  assert.ok(bests.includes(cheapest),
    "one task must be best served by the free option, or the ladder is just a price list");
  /* And the most expensive rung must never be the answer. */
  const dearest = G.DEPLOYMENTS[G.DEPLOYMENTS.length - 1].id;
  assert.ok(!bests.includes(dearest), "building your own model is never the right answer here");
});

test("every deployment returns a written answer, and the wrong ones are visibly wrong", () => {
  for(const task of G.GENAI_TASKS){
    assert.ok(task.why.length >= 150, `task ${task.id} does not explain its answer`);
    for(const d of G.DEPLOYMENTS){
      const out = task.outputs[d.id];
      assert.ok(out && nonEmpty(out.text), `task ${task.id} has no output for ${d.id}`);
      assert.ok(out.verdict.length >= 40, `task ${task.id}/${d.id} has no verdict`);
      assert.equal(typeof out.bad, "boolean", `task ${task.id}/${d.id} is not marked good or bad`);
    }
    assert.equal(task.outputs[task.best].bad, false,
      `task ${task.id}'s own best deployment is marked as a bad answer`);
  }
  /* The policy question must hallucinate on a public tool: that is the moment
     the reader sees a confident invention rather than reading about one. */
  const policy = G.GENAI_TASKS.find(t => t.best === "rag");
  assert.ok(policy, "one task must need retrieval");
  assert.equal(policy.outputs.public.bad, true,
    "the public tool must get the policy question wrong");
  assert.equal(policy.outputs.tune.bad, true,
    "a fine-tuned model must be stale on a policy that changes, or the ladder collapses");
});

test("governance offers four real controls and one that makes things worse", () => {
  assert.equal(G.CONTROLS.filter(c => c.good).length, 4);
  const bad = G.CONTROLS.filter(c => !c.good);
  assert.ok(bad.length >= 1, "there must be a tempting wrong answer");
  const ban = G.CONTROLS.find(c => /\bban\b/i.test(c.title));
  assert.ok(ban && !ban.good, "an outright ban must be offered and must be wrong");
  assert.match(ban.why, /workaround|own devices|own accounts/i,
    "the ban must be refused for the chapter's reason, not merely asserted to be wrong");
  for(const c of G.CONTROLS) assert.ok(c.why.length >= 80, `control ${c.id} does not explain itself`);
});

test("the draft mixes fabrications with claims that are true", () => {
  const fake = G.CLAIM_LINES.filter(l => l.fake);
  const real = G.CLAIM_LINES.filter(l => !l.fake);
  assert.ok(fake.length >= 3, "at least three fabrications");
  assert.ok(real.length >= 2, "and at least two true statements, or clicking everything wins");
  for(const l of G.CLAIM_LINES) assert.ok(l.why.length >= 60, `claim ${l.id} does not explain itself`);
  /* One fabrication should be a statistic and one a regulation: the two classes
     that do different kinds of damage. */
  assert.ok(fake.some(l => /%|\d/.test(l.text)), "one fabrication should be a number");
  assert.ok(fake.some(l => /licen[cs]e|regulation|act\b/i.test(l.text)),
    "one fabrication should be a legal or regulatory claim");
});

/* ============================================================================
   QUARTER 7 — THE AGENT
   ========================================================================== */
test("the pipeline has a gate for every join, plus the option of none", () => {
  assert.equal(G.PIPELINE.length, 5, "five steps");
  const afters = G.GATES.filter(g => g.after).map(g => g.after);
  assert.deepEqual(afters, G.PIPELINE.slice(0, 4).map(s => s.id),
    "there must be a gate position after every step but the last");
  assert.ok(G.GATES.some(g => g.after === null && g.cost === 0 && g.catch === 0),
    "leaving the agent unattended must be an option");
  for(const g of G.GATES) assert.ok(g.why.length >= 80, `gate ${g.id} does not explain itself`);
});

test("no gate is never the cheapest option, at any accuracy the model can reach", () => {
  /* The debrief states this as a fact, so it has to be one. */
  const cost = (g, misroutes) => g.cost + Math.round(misroutes * (1 - g.catch) * G.AGENT.costPerMisroute);
  const none = G.GATES.find(g => g.after === null);
  for(let acc = 45; acc <= 95; acc++){
    const misroutes = Math.round(G.AGENT.exceptions * (100 - acc) / 100 * G.AGENT.misrouteShare);
    const cheapest = G.GATES.slice().sort((a, b) => cost(a, misroutes) - cost(b, misroutes))[0];
    assert.notEqual(cheapest.id, none.id,
      `at ${acc}% accuracy, running unattended is the cheapest option — the debrief's claim is false`);
  }
});

test("a gate placed before the machine has judged is never the cheapest either", () => {
  const cost = (g, m) => g.cost + Math.round(m * (1 - g.catch) * G.AGENT.costPerMisroute);
  const early = G.GATES.filter(g => g.after === "s1" || g.after === "s2").map(g => g.id);
  assert.equal(early.length, 2, "two gate positions sit before the decision step");
  for(let acc = 45; acc <= 95; acc++){
    const m = Math.round(G.AGENT.exceptions * (100 - acc) / 100 * G.AGENT.misrouteShare);
    const cheapest = G.GATES.slice().sort((a, b) => cost(a, m) - cost(b, m))[0];
    assert.ok(!early.includes(cheapest.id),
      `at ${acc}% a gate before the decision is cheapest, which contradicts the debrief`);
  }
});

test("which of the two late gates wins genuinely depends on the model's accuracy", () => {
  /* This is what makes quarter five reach into quarter seven. If one gate won
     everywhere, the answer would not depend on anything the reader did. */
  const cost = (g, m) => g.cost + Math.round(m * (1 - g.catch) * G.AGENT.costPerMisroute);
  const winners = new Set();
  for(let acc = 45; acc <= 95; acc++){
    const m = Math.round(G.AGENT.exceptions * (100 - acc) / 100 * G.AGENT.misrouteShare);
    winners.add(G.GATES.slice().sort((a, b) => cost(a, m) - cost(b, m))[0].id);
  }
  assert.equal(winners.size, 2,
    `exactly two gate positions should ever be optimal across the reachable range, got ${[...winners].join(", ")}`);
  const winnerAfters = [...winners].map(id => G.GATES.find(g => g.id === id).after);
  assert.ok(winnerAfters.includes("s3") && winnerAfters.includes("s4"),
    "the two that can win should be the gate on the decision and the gate on the draft");
});

test("no gate is left carrying a hardcoded best flag", () => {
  /* The right answer is computed from the reader's own accuracy; a stale flag
     in the data would silently override it. */
  for(const g of G.GATES){
    assert.equal(g.best, undefined, `gate ${g.id} still carries a fixed best flag`);
  }
});

test("the tool-against-agent statements are split and each has a side", () => {
  assert.equal(G.AGENT_FACTS.length, 4, "four statements, one per difference");
  const sides = G.AGENT_FACTS.map(f => f.right);
  assert.ok(sides.includes("tool") && sides.includes("agent"), "both sides must be used");
  assert.equal(sides.filter(s => s === "agent").length, 2, "an even split, so guessing one side is worthless");
  for(const f of G.AGENT_FACTS) assert.ok(nonEmpty(f.text));
});

/* ============================================================================
   QUARTER 8 — THE MAP AND THE NETWORK
   ========================================================================== */
test("exactly one site clears every layer, and it is not the best-looking one", () => {
  assert.equal(G.SITES.filter(s => s.ok).length, 1, "one site is the answer");
  for(const s of G.SITES) assert.ok(s.verdict.length >= 100, `site ${s.id} does not explain itself`);
  const trap = G.SITES.find(s => !s.ok && /density|densit/i.test(s.verdict) && /floodplain/i.test(s.verdict));
  assert.ok(trap, "a site that looks best on the obvious layer and fails on a hidden one must exist");
  assert.ok(G.MAP_LAYERS.some(l => l.id === "flood"), "the disqualifying layer must be switchable");
  for(const l of G.MAP_LAYERS){
    assert.equal(l.on, false, "every layer must start switched off, which is the point of the exercise");
  }
});

test("the postcode with the most orders is not the densest", () => {
  assert.notEqual(G.MOST_ORDERS, G.MOST_DENSE,
    "quantities and densities must disagree, or the question teaches nothing");
  const byOrders = G.POSTCODES.slice().sort((a, b) => b.orders - a.orders);
  const byDensity = G.POSTCODES.slice().sort((a, b) => b.orders / b.area - a.orders / a.area);
  assert.equal(G.MOST_ORDERS, byOrders[0].code);
  assert.equal(G.MOST_DENSE, byDensity[0].code);
  assert.ok(byOrders[0].orders > byOrders[1].orders, "the orders answer is a tie");
  assert.ok(byDensity[0].orders / byDensity[0].area > byDensity[1].orders / byDensity[1].area,
    "the density answer is a tie");
  /* The sharpest version: the densest district has the fewest orders. */
  assert.equal(G.MOST_DENSE, G.POSTCODES.slice().sort((a, b) => a.orders - b.orders)[0].code,
    "the densest postcode should also be the smallest by raw count, which is what makes the point land");
});

test("the network has one clear connector and one irreplaceable bridge", () => {
  const degrees = G.PEOPLE.map(p => ({ id: p.id, d: G.degreeOf(p.id) }))
    .sort((a, b) => b.d - a.d);
  assert.equal(G.MOST_CONNECTED, degrees[0].id, "the stated connector is not the most connected");
  assert.ok(degrees[0].d > degrees[1].d, "the connector is a tie, so the question has two answers");

  /* Removing the bridge must actually disconnect the graph, and removing anyone
     else must not — otherwise there is more than one defensible answer. */
  function componentsWithout(excluded){
    const nodes = G.PEOPLE.map(p => p.id).filter(id => id !== excluded);
    const adjacency = new Map(nodes.map(id => [id, []]));
    for(const [a, b] of G.TIES){
      if(a === excluded || b === excluded) continue;
      adjacency.get(a).push(b);
      adjacency.get(b).push(a);
    }
    const seen = new Set();
    let count = 0;
    for(const start of nodes){
      if(seen.has(start)) continue;
      count++;
      const stack = [start];
      while(stack.length){
        const cur = stack.pop();
        if(seen.has(cur)) continue;
        seen.add(cur);
        for(const nxt of adjacency.get(cur)) if(!seen.has(nxt)) stack.push(nxt);
      }
    }
    return count;
  }
  assert.equal(componentsWithout(null), 1, "the network should start as one connected group");
  assert.ok(componentsWithout(G.THE_BRIDGE) > 1,
    "removing the named bridge must actually split the network");
  for(const p of G.PEOPLE){
    if(p.id === G.THE_BRIDGE) continue;
    assert.equal(componentsWithout(p.id), 1,
      `removing ${p.id} also splits the network, so the bridge question has more than one answer`);
  }
  assert.notEqual(G.THE_BRIDGE, G.MOST_CONNECTED,
    "the bridge and the connector must be different people, which is the finding");
});

test("the knowledge items use both kinds, and each explains itself", () => {
  const rights = G.KNOWLEDGE.map(k => k.right);
  assert.ok(rights.includes("explicit") && rights.includes("tacit"), "both kinds must appear");
  for(const k of G.KNOWLEDGE){
    assert.ok(["explicit", "tacit"].includes(k.right), `${k.id} has an odd answer`);
    assert.ok(k.why.length >= 80, `${k.id} does not explain itself`);
  }
  for(const c of G.KM_CHALLENGES) assert.ok(c.why.length >= 80, `challenge ${c.id} does not explain itself`);
});

/* ============================================================================
   MARKING AS YOU GO
   The instructor asked three times how answers were assessed. The answer is now
   structural: every question marks itself the moment it is answered.
   ========================================================================== */
test("every quarter registers its questions with the marking runtime", () => {
  const missions = html.slice(html.indexOf("var MISSIONS = [];"), html.indexOf("function showReview"));
  const builds = [...missions.matchAll(/build:function\(root\)\{([\s\S]*?)\n  \},\n  submit:/g)].map(m => m[1]);
  assert.equal(builds.length, 8, `expected eight builders, found ${builds.length}`);
  for(const body of builds){
    assert.match(body, /q\.register\(/, "a quarter builds no registered questions");
    assert.match(body, /q\.mark\(/, "a quarter never marks anything as the reader answers");
  }
});

test("every grader returns the marked items rather than regrading at the end", () => {
  const missions = html.slice(html.indexOf("var MISSIONS = [];"), html.indexOf("function showReview"));
  const submits = [...missions.matchAll(/submit:function\(\)\{([\s\S]*?)\n  \}\n\}\);/g)].map(m => m[1]);
  assert.equal(submits.length, 8, `expected eight graders, found ${submits.length}`);
  for(const body of submits){
    assert.match(body, /q\.items\(\)/, "a grader does not take its items from what was already marked");
    assert.match(body, /live:\s*true/,
      "a grader must declare its items are already in the ledger, or they are counted twice");
  }
});

test("a marked question locks, so the first answer is the one that counts", () => {
  const runtime = html.slice(html.indexOf("Questions.prototype.mark"), html.indexOf("Questions.prototype.items"));
  assert.match(runtime, /if\(this\.isAnswered\(key\)\) return;/, "a question must not be markable twice");
  assert.match(runtime, /controls\[i\]|c\.disabled = true/, "marking must disable the controls in the card");
  assert.match(runtime, /game\.ledger\.push/, "a marked question must reach the ledger immediately");
  assert.match(runtime, /refreshMeters\(\)/, "the running score must move as the reader answers");
});

test("each question shows what it is worth before it is answered", () => {
  const reg = html.slice(html.indexOf("Questions.prototype.register"), html.indexOf("Questions.prototype.isAnswered"));
  assert.match(reg, /class:"worth"/, "a question must display its point value");
  assert.match(reg, /worth === 1 \? " point" : " points"/, "and pluralise it correctly");
});

test("the ledger is never charged for the same decision twice", () => {
  /* showDebrief pushes result.items only when the quarter did not mark them live. */
  const start = html.indexOf("function showDebrief");
  const debrief = html.slice(start, html.indexOf("function showReview", start));
  assert.match(debrief, /if\(!result\.live\) game\.ledger\.push\(it\);/,
    "items already marked during the quarter must not be pushed again");
});

test("the top bar reports the score and nothing that is not a score", () => {
  const bar = html.slice(html.indexOf('<div class="meters"'), html.indexOf("</div>", html.indexOf('<div class="meters"')));
  assert.match(bar, /id="mScore"/, "the score must be in the top bar");
  for(const gone of ["mCash", "mTrust", "mCap"]){
    assert.ok(!bar.includes(gone),
      `${gone} is back in the top bar; three meters that do not decide the ending read as three more marks`);
  }
  /* They must still be reported where they belong: in the quarter's results. */
  assert.match(html, /<h2>What it moved<\/h2>/, "cash and trust must still be reported per quarter");
});

/* ============================================================================
   REGRESSIONS
   Every one of these was a real defect an external review found in a build that
   passed all the tests above. They are written as guards, not as history.
   ========================================================================== */
test("a quarter's cost is charged once, not once by the mission and again by the engine", () => {
  /* showDebrief spends result.cash for every quarter. A mission that also calls
     spend() directly bills the reader twice for one mistake. */
  const missions = html.slice(html.indexOf("var MISSIONS = [];"), html.indexOf("function showReview"));
  const submits = [...missions.matchAll(/submit:function\(\)\{([\s\S]*?)\n  \}\n\}\);/g)].map(m => m[1]);
  assert.ok(submits.length >= 6, `expected to find the mission graders, found ${submits.length}`);
  for(const raw of submits){
    /* Comments may well discuss spend(); only real calls count. */
    const body = raw.replace(/\/\*[\s\S]*?\*\//g, " ").replace(/\/\/[^\n]*/g, " ");
    const returnsCash = /\bcash:\s*-?[A-Za-z0-9_.()\s*+-]+,/.test(body);
    const spendsDirectly = /\bspend\s*\(/.test(body);
    assert.ok(!(returnsCash && spendsDirectly),
      "a grader both returns a cash figure and calls spend() itself, which charges the reader twice");
  }
});

test("the board's verdict calls points points, not decisions", () => {
  const review = html.slice(html.indexOf("function showReview"));
  assert.doesNotMatch(review, /decisions right/,
    "the final verdict must not describe a points total as a count of decisions");
  assert.match(review, /out of " \+ total\.max \+ " points/,
    "the final verdict must report points");
});

test("quarter one never congratulates a reader on a pair they did not pick", () => {
  const q1 = html.slice(html.indexOf("quarter:1, lo:"), html.indexOf("quarter:2, lo:"));
  const praise = "You also picked the pair that answers the board's actual question";
  assert.ok(q1.includes(praise), "the praise line should still exist for the reader who earns it");
  /* It must be gated on the picks, not on the classifications. */
  assert.match(q1, /prioRight === 2\s*\?/,
    "the praise must be conditional on how many of the priority picks were right");
  assert.ok(q1.includes("Neither of the two you chose"),
    "there must be a line for the reader who picked neither");
});

test("a training run can never describe choices the reader has since changed", () => {
  /* The original defect was that inputs stayed editable while the stored result
     stayed frozen. Marking as you go closes it at the root: every input locks
     when it is marked, so there is nothing left that can go stale. */
  const q5 = html.slice(html.indexOf("quarter:5, lo:"), html.indexOf("quarter:6, lo:"));
  for(const guard of ['q.isAnswered("problem")', 'q.isAnswered("sources")', 'q.isAnswered("label")',
                      'q.isAnswered("split")']){
    assert.ok(q5.includes(guard), `quarter five must refuse to change an answered step: ${guard}`);
  }
  assert.match(q5, /if\(!v \|\| q\.isAnswered\(row\.id\)\) return;/,
    "a cleaning decision must lock once it has been marked");
  assert.match(q5, /splitInp\.disabled = true/,
    "the split must lock once the model has been trained on it");
  /* And training must be impossible until every input that feeds it is settled. */
  assert.ok(q5.includes("function stepsOutstanding()"),
    "quarter five must know which steps are still outstanding");
  assert.match(q5, /trainBtn\.disabled = left\.length > 0/,
    "the train button must stay disabled while any step is unanswered");
});

test("pressing train too early says so on the screen, not only to a screen reader", () => {
  const q5 = html.slice(html.indexOf("quarter:5, lo:"), html.indexOf("quarter:6, lo:"));
  const guard = q5.slice(q5.indexOf("var left = stepsOutstanding();", q5.indexOf("trainBtn.addEventListener")));
  assert.ok(guard.includes("result.innerHTML"),
    "an unfinished train attempt must render a visible message");
  assert.ok(guard.includes("announce("),
    "and still announce it for a screen reader");
  const steps = q5.slice(q5.indexOf("function stepsOutstanding()"));
  assert.ok(steps.includes("step one") && steps.includes("step three") && steps.includes("step four"),
    "the message must name which steps are unfinished");
});

test("going back for more data never claims a deployment it did not earn", () => {
  const q5 = html.slice(html.indexOf("quarter:5, lo:"), html.indexOf("quarter:6, lo:"));
  const summaryAt = q5.indexOf('} else if(self.decision === "back"){');
  assert.ok(summaryAt > 0, "the summary branch for another pass at the data is missing");
  const back = q5.slice(summaryAt, summaryAt + 900);
  assert.match(back, /finalAcc >= ML\.threshold/,
    "the narrative after another pass at the data must check the bar before claiming it shipped");
  assert.match(back, /not gone to dispatch/,
    "and must say plainly when the model still falls short");
});

/* ============================================================================
   THE ENDING
   ========================================================================== */
test("the board's verdicts cover every score, in order, without a gap", () => {
  assert.ok(G.ENDINGS.length >= 4, "a game wants more than two outcomes");
  for(let i = 1; i < G.ENDINGS.length; i++){
    assert.ok(G.ENDINGS[i].min < G.ENDINGS[i - 1].min, "verdicts must be listed highest first");
  }
  assert.equal(G.ENDINGS[G.ENDINGS.length - 1].min, 0, "there must be a verdict for a score of zero");
  for(const e of G.ENDINGS){
    assert.ok(nonEmpty(e.rank) && nonEmpty(e.title) && e.body.length >= 60, "a verdict is incomplete");
  }
  for(let p = 0; p <= 100; p++){
    assert.ok(G.verdictFor(p), `no verdict for ${p}%`);
  }
  assert.equal(G.verdictFor(100).rank, G.ENDINGS[0].rank);
  assert.equal(G.verdictFor(0).rank, G.ENDINGS[G.ENDINGS.length - 1].rank);
});

test("the starting position leaves room to fail as well as to succeed", () => {
  assert.ok(G.START.cash > 0 && G.START.trust > 0 && G.START.capability >= 0);
  assert.ok(G.START.trust < 100 && G.START.capability < 100,
    "starting at full marks leaves the meters nothing to report");
});
