/* Contract tests for the self-contained Modules 1-3 review game.
 *
 * Node standard library only — there is no package.json in this repository and
 * the game deliberately has no dependencies of its own.
 *
 * Board data is extracted by slicing the declaration block out of the page's
 * inline script and evaluating it in a sandbox, never by regex-parsing
 * individual fields, so a clue whose text happens to contain a brace or a
 * quote cannot silently break the tests.
 *
 * Run: node --test modules-1-3-jeopardy.test.mjs
 */
import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = dirname(fileURLToPath(import.meta.url));
const PAGE = "modules-1-3-jeopardy.html";
const html = readFileSync(join(ROOT, PAGE), "utf8");

/* The eleven course objectives. 6, 10 and 11 are not taught in Modules 1-3, so
   the board must not claim them; the other eight must each be reachable. */
const COVERED_OBJECTIVES = [1, 2, 3, 4, 5, 7, 8, 9];
const UNCOVERED_OBJECTIVES = [6, 10, 11];

/* ============================================================================
   EXTRACTORS
   ========================================================================== */
function inlineScripts(source){
  return [...source.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/gi)].map(m => m[1]);
}

/* Slice from the first data declaration through the end of the BEST_KEY
   statement, which the page declares last, and evaluate the block alone. */
function boardData(){
  const start = html.indexOf("var OBJECTIVES");
  assert.ok(start >= 0, "missing the OBJECTIVES declaration");
  const bestIdx = html.indexOf("var BEST_KEY", start);
  assert.ok(bestIdx > start, "missing the BEST_KEY declaration after OBJECTIVES");
  const end = html.indexOf(";", bestIdx);
  assert.ok(end > bestIdx, "unterminated BEST_KEY statement");
  const src = html.slice(start, end + 1);
  return new Function(
    `"use strict";\n${src}\n` +
    "return { OBJECTIVES, MODULES, ROUND1, ROUND2, ROUNDS, FINAL, THEME_KEY, BEST_KEY };"
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
  /* Markup only. Links the script builds at runtime (the results table's module
     rows) are checked against MODULES further down, where the real path is
     known rather than the concatenation that produces it. */
  const markup = html.replace(/<script(?:\s[^>]*)?>[\s\S]*?<\/script>/gi, "");
  const refs = [...markup.matchAll(/(?:src|href)="([^"]*)"/g)].map(m => m[1]);
  assert.ok(refs.length >= 3, "expected links back to the study modules");
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

test("no clue and no answer is duplicated anywhere on either board", () => {
  const clues = new Set(), answers = new Set();
  for(const { cat, clue } of everyClue()){
    const c = clue.clue.trim().toLowerCase();
    const a = clue.answer.trim().toLowerCase();
    assert.ok(!clues.has(c), `"${cat.name}" $${clue.value} repeats an earlier clue`);
    assert.ok(!answers.has(a), `"${cat.name}" $${clue.value} repeats an earlier answer: ${clue.answer}`);
    clues.add(c); answers.add(a);
  }
  assert.ok(!answers.has(data.FINAL.answer.trim().toLowerCase()),
    "the Final Jeopardy answer already appears on a board");
});

/* ============================================================================
   COURSE OBJECTIVE AND MODULE TAGGING
   ========================================================================== */
test("every clue names at least one course objective and a module to reread", () => {
  for(const { cat, clue } of everyClue()){
    assert.ok(Array.isArray(clue.co) && clue.co.length >= 1,
      `"${cat.name}" $${clue.value} names no course objective`);
    for(const n of clue.co){
      assert.ok(Object.prototype.hasOwnProperty.call(data.OBJECTIVES, n),
        `"${cat.name}" $${clue.value} names unknown course objective ${n}`);
    }
    assert.ok(Object.prototype.hasOwnProperty.call(data.MODULES, clue.mod),
      `"${cat.name}" $${clue.value} names unknown module ${clue.mod}`);
  }
  assert.ok(data.FINAL.co.length >= 1, "Final Jeopardy names no course objective");
});

test("the eight objectives Modules 1-3 cover are each asked about, and only those", () => {
  const declared = Object.keys(data.OBJECTIVES).map(Number).sort((a, b) => a - b);
  assert.deepEqual(declared, COVERED_OBJECTIVES,
    "the objective list must hold exactly the eight this board can honestly claim");
  for(const n of UNCOVERED_OBJECTIVES){
    assert.ok(!declared.includes(n),
      `objective ${n} is not taught in Modules 1-3 and must not be scored here`);
  }
  const asked = new Set();
  for(const { clue } of everyClue()) clue.co.forEach(n => asked.add(n));
  data.FINAL.co.forEach(n => asked.add(n));
  for(const n of COVERED_OBJECTIVES){
    assert.ok(asked.has(n), `no clue on either board serves course objective ${n}`);
  }
});

test("the intro says plainly which objectives the board does not reach", () => {
  for(const n of UNCOVERED_OBJECTIVES){
    assert.match(html, new RegExp(`<b>Objectives? ${n}</b>`),
      `the "Not on this board" callout must name objective ${n}`);
  }
});

test("every module is exercised, including the framework-analysis category", () => {
  const used = new Set(everyClue().map(({ clue }) => clue.mod));
  for(const key of Object.keys(data.MODULES).map(Number)){
    assert.ok(used.has(key), `module bucket ${key} is declared but never the source of a clue`);
    assert.ok(nonEmptyString(data.MODULES[key].label));
    assert.ok(nonEmptyString(data.MODULES[key].covers));
    assert.ok(existsSync(join(ROOT, data.MODULES[key].href)),
      `module bucket ${key} links to missing file "${data.MODULES[key].href}"`);
  }
});

test("all three reading modules and the deliverable get real coverage", () => {
  const counts = {};
  for(const { clue } of everyClue()) counts[clue.mod] = (counts[clue.mod] || 0) + 1;
  for(const key of [1, 2, 3, 0]){
    assert.ok((counts[key] || 0) >= 5,
      `module bucket ${key} carries only ${counts[key] || 0} clues — too thin to diagnose from`);
  }
});

/* ============================================================================
   ASSESSMENT HYGIENE
   The graded case's own wording never reaches a student-facing page in this
   repository. The board teaches the shape of the deliverable, not the case.
   ========================================================================== */
test("no institutional, course-code, or graded-case wording reaches the page", () => {
  const forbidden = [
    /\bKeiser\b/i,
    /\bCGS\s*-?\s*3300\b/i,
    /\bWestline\b/i,
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

test("the framework-analysis category teaches the four moves the deliverable asks for", () => {
  const cat = data.ROUND2.find(c => c.name === "Building the Recommendation");
  assert.ok(cat, "the framework-analysis category is missing from round two");
  const text = cat.clues.map(c => `${c.clue} ${c.answer} ${c.why}`).join(" ").toLowerCase();
  for(const move of ["five forces", "value chain", "150 to 200 words", "timeframe"]){
    assert.ok(text.includes(move), `the category never mentions "${move}"`);
  }
  const one = cat.clues.find(c => /^what is one\?$/i.test(c.answer.trim()));
  assert.ok(one, "the category must establish that exactly one initiative is recommended");
});
