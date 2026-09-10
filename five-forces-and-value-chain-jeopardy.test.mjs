/* Contract tests for the self-contained Five Forces and Value Chain review game.
 *
 * Node standard library only — there is no package.json in this repository and
 * the game deliberately has no dependencies of its own.
 *
 * Board data is extracted by slicing the declaration block out of the page's
 * inline script and evaluating it in a sandbox, never by regex-parsing
 * individual fields, so a clue whose text happens to contain a brace or a
 * quote cannot silently break the tests.
 *
 * Run: node --test five-forces-and-value-chain-jeopardy.test.mjs
 */
import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = dirname(fileURLToPath(import.meta.url));
const PAGE = "five-forces-and-value-chain-jeopardy.html";
const html = readFileSync(join(ROOT, PAGE), "utf8");

/* The four course objectives two strategy frameworks can honestly claim. The
   board says so on its intro screen and must not quietly claim more. */
const COVERED_OBJECTIVES = [2, 3, 5, 7];

const FORCE_ANSWERS = [
  "rivalry among existing competitors",
  "the threat of new entrants",
  "the bargaining power of buyers",
  "the bargaining power of suppliers",
  "the threat of substitute"
];

/* ============================================================================
   EXTRACTORS
   ========================================================================== */
function inlineScripts(source){
  return [...source.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/gi)].map(m => m[1]);
}

function boardData(){
  const start = html.indexOf("var OBJECTIVES");
  assert.ok(start >= 0, "missing the OBJECTIVES declaration");
  const bestIdx = html.indexOf("var BEST_KEY", start);
  assert.ok(bestIdx > start, "missing the BEST_KEY declaration after OBJECTIVES");
  const end = html.indexOf(";", bestIdx);
  assert.ok(end > bestIdx, "unterminated BEST_KEY statement");
  return new Function(
    `"use strict";\n${html.slice(start, end + 1)}\n` +
    "return { OBJECTIVES, SOURCES, SOURCE_ORDER, ROUND1, ROUND2, ROUNDS, FINAL, THEME_KEY, BEST_KEY };"
  )();
}

const data = boardData();

function nonEmptyString(value){
  return typeof value === "string" && value.trim().length > 0;
}
function everyClue(){
  return data.ROUNDS.flatMap(round =>
    round.cats.flatMap(cat => cat.clues.map(clue => ({ round, cat, clue }))));
}

/* ============================================================================
   THE PAGE ITSELF
   ========================================================================== */
test("inline scripts parse as valid JavaScript", () => {
  const scripts = inlineScripts(html);
  assert.ok(scripts.length >= 1, "no inline script found");
  for(const script of scripts){
    assert.doesNotThrow(() => new Function(script), "inline script does not parse");
  }
});

test("every src and href is a relative link to a file that exists", () => {
  /* Markup only. Links the script builds at runtime (the results table's topic
     rows) are checked against SOURCES further down, where the real path is
     known rather than the concatenation that produces it. */
  const markup = html.replace(/<script(?:\s[^>]*)?>[\s\S]*?<\/script>/gi, "");
  const refs = [...markup.matchAll(/(?:src|href)="([^"]*)"/g)].map(m => m[1]);
  assert.ok(refs.length >= 3, "expected links back to the workshop, the quiz and a module");
  for(const ref of refs){
    assert.ok(!/^[a-zA-Z][a-zA-Z0-9+.-]*:/.test(ref) && !ref.startsWith("//"),
      `external reference "${ref}" breaks the offline, self-contained contract`);
    const path = ref.split("#")[0].split("?")[0];
    if(path === "") continue;
    assert.ok(existsSync(join(ROOT, path)), `link target "${path}" does not exist`);
  }
});

test("the How-to-play panel sits on the intro screen, before either board", () => {
  const howTo = html.indexOf("<h2>How to play</h2>");
  assert.ok(howTo >= 0, 'missing the "How to play" panel');
  const intro = html.indexOf('id="screenIntro"');
  assert.ok(intro >= 0 && intro < howTo, "How-to panel must sit on the intro screen");
  assert.ok(html.indexOf('id="screenBoard"') > howTo, "How-to panel must come before the board");
});

test("accessibility baseline: a polite live region and a labelled theme toggle", () => {
  assert.match(html, /role="status" aria-live="polite" id="liveStatus"/,
    "liveStatus must be a polite status live region");
  assert.match(html, /id="themeBtn" aria-label="/, "theme toggle needs an aria-label");
});

test("the page inherits the study modules' theme and persists its own override", () => {
  assert.ok(html.includes('localStorage.getItem("mis-ch1-theme-v1")'),
    "must fall back to the shared module theme when it has no saved choice of its own");
  assert.ok(html.includes("localStorage.getItem(THEME_KEY)"),
    "must read its own saved theme before the shared fallback");
  assert.ok(html.includes("localStorage.setItem(THEME_KEY,"),
    "theme toggle must persist to THEME_KEY");
  assert.ok(data.THEME_KEY.startsWith("mis-"), "THEME_KEY must live in the mis- namespace");
  assert.ok(data.BEST_KEY.startsWith("mis-"), "BEST_KEY must live in the mis- namespace");
  assert.notEqual(data.THEME_KEY, data.BEST_KEY);
  assert.notEqual(data.THEME_KEY, "mis-ch1-theme-v1",
    "the game's own theme override must not overwrite the modules' theme key");
  assert.notEqual(data.THEME_KEY, "mis-jeopardy-theme-v1",
    "and it must not collide with the Modules 1-3 board's key either");
  assert.notEqual(data.BEST_KEY, "mis-jeopardy-best-v1",
    "the two boards keep separate best scores");
});

/* ============================================================================
   BOARD CONTRACT
   ========================================================================== */
test("two rounds of 5x5, plus a Final Jeopardy clue, all fully written", () => {
  assert.equal(data.ROUNDS.length, 2, "the game must have exactly two rounds");
  for(const round of data.ROUNDS){
    assert.ok(nonEmptyString(round.title), "a round is missing its title");
    assert.ok(nonEmptyString(round.sub), `"${round.title}" is missing its subtitle`);
    assert.equal(round.cats.length, 5, `"${round.title}" must have exactly 5 categories`);
    for(const cat of round.cats){
      assert.ok(nonEmptyString(cat.name), `"${round.title}" has a category with no name`);
      assert.ok(["force", "chain"].includes(cat.kind),
        `"${cat.name}" must be tagged force or chain so its preview chip is coloured`);
      assert.equal(cat.clues.length, 5, `"${cat.name}" must have exactly 5 clues`);
      let prev = 0;
      for(const clue of cat.clues){
        assert.ok(Number.isInteger(clue.value) && clue.value > 0,
          `"${cat.name}" has a clue without a positive integer value`);
        assert.ok(clue.value > prev,
          `"${cat.name}" values must strictly ascend (${prev} then ${clue.value})`);
        prev = clue.value;
        assert.ok(nonEmptyString(clue.clue), `"${cat.name}" $${clue.value} has empty clue text`);
        assert.ok(nonEmptyString(clue.answer), `"${cat.name}" $${clue.value} has empty answer text`);
        assert.ok(nonEmptyString(clue.why), `"${cat.name}" $${clue.value} has no "why" explanation`);
        assert.ok(clue.why.length >= 60,
          `"${cat.name}" $${clue.value} does not explain why it is that answer and not the one next to it`);
      }
    }
  }
  assert.ok(nonEmptyString(data.FINAL.category), "Final Jeopardy category is empty");
  assert.ok(nonEmptyString(data.FINAL.clue), "Final Jeopardy clue is empty");
  assert.ok(nonEmptyString(data.FINAL.answer), "Final Jeopardy answer is empty");
  assert.ok(nonEmptyString(data.FINAL.why), "Final Jeopardy answer has no explanation");
});

test("round two is worth double round one, tile for tile", () => {
  const [one, two] = data.ROUNDS;
  for(let row = 0; row < 5; row++){
    const first = one.cats[0].clues[row].value;
    for(const cat of two.cats){
      assert.equal(cat.clues[row].value, first * 2,
        `"${cat.name}" row ${row + 1} should be double round one's ${first}`);
    }
  }
});

test("every answer is phrased as a question, the way the show requires", () => {
  for(const { cat, clue } of everyClue()){
    assert.match(clue.answer, /^(What|Who|Where|When|Why|How)\b/,
      `"${cat.name}" $${clue.value}: answer must be phrased as a question`);
    assert.ok(clue.answer.trim().endsWith("?"),
      `"${cat.name}" $${clue.value}: answer must end with a question mark`);
  }
  assert.match(data.FINAL.answer, /^What\b/);
  assert.ok(data.FINAL.answer.trim().endsWith("?"));
});

test("no clue is written twice anywhere on either board", () => {
  const clues = new Set();
  for(const { cat, clue } of everyClue()){
    const c = clue.clue.trim().toLowerCase();
    assert.ok(!clues.has(c), `"${cat.name}" $${clue.value} repeats an earlier clue`);
    clues.add(c);
  }
  assert.ok(!clues.has(data.FINAL.clue.trim().toLowerCase()),
    "the Final Jeopardy clue already appears on a board");
});

test("no answer is repeated inside a round", () => {
  /* Across the two rounds a term may well appear twice, and that is the design:
     round one asks you to define it, round two asks you to reach for it from
     evidence. Twice in the same round is a wasted tile, so that is what fails. */
  for(const round of data.ROUNDS){
    const seen = new Map();
    for(const cat of round.cats){
      for(const clue of cat.clues){
        const a = clue.answer.trim().toLowerCase();
        assert.ok(!seen.has(a),
          `"${round.title}": "${clue.answer}" is the answer in both ${seen.get(a)} and ${cat.name}`);
        seen.set(a, cat.name);
      }
    }
  }
  const finalAnswer = data.FINAL.answer.trim().toLowerCase();
  const onBoard = everyClue().some(({ clue }) => clue.answer.trim().toLowerCase() === finalAnswer);
  assert.ok(!onBoard, "the Final Jeopardy answer has already been given away on a board");
});

test("a round-two clue never simply reprints its round-one definition", () => {
  const round1 = new Map();
  for(const cat of data.ROUND1) for(const clue of cat.clues) round1.set(clue.answer.trim().toLowerCase(), clue.clue);
  for(const cat of data.ROUND2){
    for(const clue of cat.clues){
      const twin = round1.get(clue.answer.trim().toLowerCase());
      if(!twin) continue;
      assert.notEqual(clue.clue.trim(), twin.trim(),
        `"${cat.name}" $${clue.value} reuses the round-one clue for the same answer`);
    }
  }
});

/* ============================================================================
   COVERAGE — the board has to teach both frameworks, not the memorable one
   ========================================================================== */
test("round one names all five forces and all nine value chain activities", () => {
  const answers = data.ROUND1.flatMap(cat => cat.clues.map(c => c.answer.toLowerCase()));
  for(const force of FORCE_ANSWERS){
    assert.ok(answers.some(a => a.includes(force)), `round one never asks for ${force}`);
  }
  for(const activity of ["inbound logistics", "operations", "outbound logistics",
                         "sales and marketing", "service", "administration and firm infrastructure",
                         "human resources", "technology development", "procurement"]){
    assert.ok(answers.some(a => a.includes(activity)), `round one never asks for ${activity}`);
  }
});

test("round two makes every force diagnosable from a situation", () => {
  const answers = data.ROUND2.flatMap(cat => cat.clues.map(c => c.answer.toLowerCase()));
  for(const force of FORCE_ANSWERS){
    assert.ok(answers.some(a => a.includes(force)),
      `round two never asks the reader to diagnose ${force} from evidence`);
  }
});

test("the closing category teaches the shape of the written analysis", () => {
  const cat = data.ROUND2.find(c => c.name === "Writing the Analysis");
  assert.ok(cat, "the written-analysis category is missing from round two");
  const text = cat.clues.map(c => `${c.clue} ${c.answer} ${c.why}`).join(" ").toLowerCase();
  for(const move of ["five forces", "value chain", "150 to 200 words", "measure and a date"]){
    assert.ok(text.includes(move), `the category never mentions "${move}"`);
  }
  const one = cat.clues.find(c => /^what is one\?$/i.test(c.answer.trim()));
  assert.ok(one, "the category must establish that exactly one initiative is recommended");
});

/* ============================================================================
   TAGGING
   ========================================================================== */
test("every clue names at least one course objective and a topic to go back to", () => {
  for(const { cat, clue } of everyClue()){
    assert.ok(Array.isArray(clue.co) && clue.co.length >= 1,
      `"${cat.name}" $${clue.value} names no course objective`);
    for(const n of clue.co){
      assert.ok(Object.prototype.hasOwnProperty.call(data.OBJECTIVES, n),
        `"${cat.name}" $${clue.value} names unknown course objective ${n}`);
    }
    assert.ok(Object.prototype.hasOwnProperty.call(data.SOURCES, clue.src),
      `"${cat.name}" $${clue.value} names unknown topic "${clue.src}"`);
  }
  assert.ok(data.FINAL.co.length >= 1, "Final Jeopardy names no course objective");
  assert.ok(Object.prototype.hasOwnProperty.call(data.SOURCES, data.FINAL.src),
    "Final Jeopardy names no topic to go back to");
});

test("the four objectives it claims are each asked about, and no others are claimed", () => {
  const declared = Object.keys(data.OBJECTIVES).map(Number).sort((a, b) => a - b);
  assert.deepEqual(declared, COVERED_OBJECTIVES,
    "the objective list must hold exactly the four these frameworks serve");
  const asked = new Set();
  for(const { clue } of everyClue()) clue.co.forEach(n => asked.add(n));
  data.FINAL.co.forEach(n => asked.add(n));
  for(const n of COVERED_OBJECTIVES){
    assert.ok(asked.has(n), `no clue on either board serves course objective ${n}`);
  }
});

test("the intro says plainly which objectives the board does not reach", () => {
  const callout = html.slice(html.indexOf("Not on this board"), html.indexOf("Not on this board") + 800);
  assert.ok(callout.includes("life cycle"), "the callout must name the life-cycle objective it leaves alone");
  assert.ok(/database technology|networks/.test(callout),
    "the callout must name the infrastructure objective it leaves alone");
  assert.ok(/security breaches|computer crime/.test(callout),
    "the callout must name the security objective it leaves alone");
});

test("every topic bucket is used, carries real weight, and links where it says", () => {
  const counts = {};
  for(const { clue } of everyClue()) counts[clue.src] = (counts[clue.src] || 0) + 1;
  counts[data.FINAL.src] = (counts[data.FINAL.src] || 0) + 1;
  assert.deepEqual(data.SOURCE_ORDER.slice().sort(), Object.keys(data.SOURCES).sort(),
    "the results table must render every declared topic and no others");
  for(const key of Object.keys(data.SOURCES)){
    const info = data.SOURCES[key];
    assert.ok(nonEmptyString(info.label), `topic "${key}" has no label`);
    assert.ok(nonEmptyString(info.covers), `topic "${key}" does not say what it covers`);
    assert.ok(existsSync(join(ROOT, info.href)), `topic "${key}" links to missing file "${info.href}"`);
    assert.ok((counts[key] || 0) >= 5,
      `topic "${key}" carries only ${counts[key] || 0} clues — too thin to diagnose from`);
  }
});

/* ============================================================================
   ASSESSMENT HYGIENE
   The graded case's own wording never reaches a student-facing page in this
   repository. The board teaches the shape of the deliverable, not the case.
   ========================================================================== */
test("no institutional, course-code, or local-path wording reaches the page", () => {
  const forbidden = [
    /\bKeiser\b/i,
    /\bCGS\s*-?\s*3300\b/i,
    /\bsignature assignment\b/i,
    /\bSLO\s*-?\s*1\b/i,
    /\bbenchmark grade\b/i,
    /\/Users\//,
    /\bC:\\/
  ];
  for(const pattern of forbidden){
    assert.doesNotMatch(html, pattern, `forbidden wording ${pattern} appears on the page`);
  }
});

/* The graded case's own vocabulary is not written down here. This repository is
   public, so the reserved terms live in the untracked src/forbidden.local.txt
   that src/check.mjs already reads, and this test reads the same file. Without
   it the check reports itself as not run rather than passing quietly. */
function reservedTerms(){
  const list = join(ROOT, "src", "forbidden.local.txt");
  if(!existsSync(list)) return null;
  return readFileSync(list, "utf8").split(/\r?\n/).map(t => t.trim()).filter(Boolean);
}

test("no reserved assessment term reaches the page", (t) => {
  const terms = reservedTerms();
  if(!terms || terms.length === 0){
    t.skip("src/forbidden.local.txt is not present, so assessment-specific terms are not being checked");
    return;
  }
  for(const term of terms){
    const pattern = new RegExp("\\b" + term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "\\b", "i");
    assert.doesNotMatch(html, pattern, "the page contains a reserved assessment term");
  }
});

test("the firms in the situations are invented, and the real ones are the chapter's own", () => {
  assert.match(html, /Every firm in a situation is invented\./,
    "the board data must state that the firms in its situations are hypothetical");
  /* The chapter illustrates the generic strategies with four named companies.
     Those four may appear because the chapter names them; any other real
     company would be a practice situation dressed up as reported fact. */
  const allowed = ["Walmart", "Porsche", "Nordstrom", "Dell"];
  const strategy = data.ROUND1.find(c => c.name === "Strategy Words");
  assert.ok(strategy, "the generic-strategy category is missing from round one");
  const strategyText = strategy.clues.map(c => `${c.clue} ${c.answer} ${c.why}`).join(" ");
  for(const name of allowed){
    const everywhere = [...html.matchAll(new RegExp(`\\b${name}\\b`, "g"))].length;
    if(everywhere === 0) continue;
    assert.ok(strategyText.includes(name),
      `${name} is named outside the category that quotes the chapter's own examples`);
    assert.equal(everywhere, 1, `${name} should be named once, where the chapter names it`);
  }
});
