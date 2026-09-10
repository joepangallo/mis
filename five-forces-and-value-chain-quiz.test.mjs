/* Contract tests for the self-contained Five Forces and Value Chain quiz.
 *
 * Node standard library only — there is no package.json in this repository and
 * the quiz deliberately has no dependencies of its own.
 *
 * The question bank is extracted by slicing the declaration block out of the
 * page's inline script and evaluating it in a sandbox, never by regex-parsing
 * individual fields, so a question whose text happens to contain a brace or a
 * quote cannot silently break the tests.
 *
 * Run: node --test five-forces-and-value-chain-quiz.test.mjs
 */
import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = dirname(fileURLToPath(import.meta.url));
const PAGE = "five-forces-and-value-chain-quiz.html";
const html = readFileSync(join(ROOT, PAGE), "utf8");

/* The four course objectives two strategy frameworks can honestly claim. The
   quiz says so on its intro screen and must not quietly claim more. */
const COVERED_OBJECTIVES = [2, 3, 5, 7];

/* ============================================================================
   EXTRACTORS
   ========================================================================== */
function inlineScripts(source){
  return [...source.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/gi)].map(m => m[1]);
}

/* Slice from the first data declaration through the end of the BEST_KEY
   statement, which the page declares last, and evaluate that block alone. */
function quizData(){
  const start = html.indexOf("var OBJECTIVES");
  assert.ok(start >= 0, "missing the OBJECTIVES declaration");
  const bestIdx = html.indexOf("var BEST_KEY", start);
  assert.ok(bestIdx > start, "missing the BEST_KEY declaration after OBJECTIVES");
  const end = html.indexOf(";", bestIdx);
  assert.ok(end > bestIdx, "unterminated BEST_KEY statement");
  return new Function(
    `"use strict";\n${html.slice(start, end + 1)}\n` +
    "return { OBJECTIVES, TOPICS, QUESTIONS, THEME_KEY, BEST_KEY };"
  )();
}

const data = quizData();

function nonEmptyString(value){
  return typeof value === "string" && value.trim().length > 0;
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
     rows) are checked against TOPICS further down, where the real path is
     known rather than the concatenation that produces it. */
  const markup = html.replace(/<script(?:\s[^>]*)?>[\s\S]*?<\/script>/gi, "");
  const refs = [...markup.matchAll(/(?:src|href)="([^"]*)"/g)].map(m => m[1]);
  assert.ok(refs.length >= 3, "expected links back to the workshop and the review game");
  for(const ref of refs){
    assert.ok(!/^[a-zA-Z][a-zA-Z0-9+.-]*:/.test(ref) && !ref.startsWith("//"),
      `external reference "${ref}" breaks the offline, self-contained contract`);
    const path = ref.split("#")[0].split("?")[0];
    if(path === "") continue;
    assert.ok(existsSync(join(ROOT, path)), `link target "${path}" does not exist`);
  }
});

test("the reader is told how it works before the first question", () => {
  const howTo = html.indexOf("<h2>How this works</h2>");
  assert.ok(howTo >= 0, 'missing the "How this works" panel');
  const intro = html.indexOf('id="screenIntro"');
  assert.ok(intro >= 0 && intro < howTo, "the panel must sit on the intro screen");
  assert.ok(html.indexOf('id="screenQuiz"') > howTo, "the panel must come before the question screen");
  assert.match(html, /Immediate feedback/, "the intro must promise the feedback the page is for");
});

test("accessibility baseline: a polite live region and a labelled theme toggle", () => {
  assert.match(html, /role="status" aria-live="polite" id="liveStatus"/,
    "liveStatus must be a polite status live region");
  assert.match(html, /id="themeBtn" aria-label="/, "theme toggle needs an aria-label");
  assert.match(html, /id="opts" role="group" aria-label="Answer options"/,
    "the options need a labelled group so they are not read as loose buttons");
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
    "the quiz's own theme override must not overwrite the modules' theme key");
});

/* ============================================================================
   THE QUESTION BANK
   ========================================================================== */
test("thirty questions, six topics, five each", () => {
  assert.equal(data.QUESTIONS.length, 30, "the quiz must hold exactly thirty questions");
  assert.equal(Object.keys(data.TOPICS).length, 6, "there must be exactly six topics");
  const counts = {};
  for(const q of data.QUESTIONS) counts[q.topic] = (counts[q.topic] || 0) + 1;
  for(const key of Object.keys(data.TOPICS)){
    assert.equal(counts[key], 5, `topic "${key}" carries ${counts[key] || 0} questions, not 5`);
    const t = data.TOPICS[key];
    assert.ok(nonEmptyString(t.label), `topic "${key}" has no label`);
    assert.ok(nonEmptyString(t.asks), `topic "${key}" does not say what it asks of the reader`);
    assert.ok(nonEmptyString(t.where), `topic "${key}" does not say where to go back to`);
    assert.ok(["force", "chain", "both"].includes(t.kind),
      `topic "${key}" must be tagged as a force, chain or both topic for its chip colour`);
    assert.ok(existsSync(join(ROOT, t.href)), `topic "${key}" links to missing file "${t.href}"`);
  }
});

test("every question is fully written: four options, four explanations, a key point", () => {
  const ids = new Set();
  for(const q of data.QUESTIONS){
    assert.ok(nonEmptyString(q.id), "a question has no id");
    assert.ok(!ids.has(q.id), `duplicate question id "${q.id}"`);
    ids.add(q.id);
    assert.ok(Object.prototype.hasOwnProperty.call(data.TOPICS, q.topic),
      `${q.id} names unknown topic "${q.topic}"`);
    assert.ok(q.q.length >= 40, `${q.id} asks a question too short to be a situation`);
    assert.equal(q.opts.length, 4, `${q.id} must offer exactly four options`);
    assert.equal(q.why.length, 4, `${q.id} must explain all four options`);
    assert.equal(new Set(q.opts.map(o => o.trim().toLowerCase())).size, 4,
      `${q.id} repeats an option`);
    assert.ok(Number.isInteger(q.a) && q.a >= 0 && q.a <= 3, `${q.id} has no valid answer index`);
    for(let i = 0; i < 4; i++){
      assert.ok(nonEmptyString(q.opts[i]), `${q.id} option ${i} is empty`);
      assert.ok(q.why[i].length >= 60,
        `${q.id} option ${i} is not explained properly — every option has to teach something`);
    }
    assert.ok(q.key.length >= 60, `${q.id} has no usable key point`);
  }
});

test("no two questions ask the same thing", () => {
  const seen = new Set();
  for(const q of data.QUESTIONS){
    const text = q.q.trim().toLowerCase();
    assert.ok(!seen.has(text), `${q.id} repeats an earlier question`);
    seen.add(text);
  }
});

test("the right answer is not always in the same place", () => {
  const counts = [0, 0, 0, 0];
  for(const q of data.QUESTIONS) counts[q.a] += 1;
  for(let i = 0; i < 4; i++){
    assert.ok(counts[i] >= 4,
      `only ${counts[i]} correct answers sit in position ${i + 1} — a reader could pass by pattern`);
  }
});

test("the longest option is not a reliable tell", () => {
  /* Measured as the reader sees it: entities and any markup resolve to text
     before the lengths are compared, so &rsquo; does not count as six. */
  const rendered = (s) => s.replace(/&[a-z]+;/g, "x").replace(/<[^>]+>/g, "").length;
  let longest = 0;
  for(const q of data.QUESTIONS){
    const lengths = q.opts.map(rendered);
    if(lengths.indexOf(Math.max(...lengths)) === q.a) longest += 1;
  }
  assert.ok(longest <= Math.ceil(data.QUESTIONS.length / 2),
    `${longest} of ${data.QUESTIONS.length} correct answers are the longest option — that is a pattern, not a question`);
});

test("the correct explanation confirms and the wrong ones do not", () => {
  for(const q of data.QUESTIONS){
    assert.match(q.why[q.a], /^Right[.,]/,
      `${q.id}: the explanation of the right answer must confirm it plainly`);
    q.why.forEach((w, i) => {
      if(i === q.a) return;
      assert.doesNotMatch(w, /^Right\b/, `${q.id}: option ${i} is wrong but its explanation agrees with it`);
    });
  }
});

/* ============================================================================
   COURSE OBJECTIVE TAGGING
   ========================================================================== */
test("every question names at least one course objective, and only real ones", () => {
  for(const q of data.QUESTIONS){
    assert.ok(Array.isArray(q.co) && q.co.length >= 1, `${q.id} names no course objective`);
    for(const n of q.co){
      assert.ok(Object.prototype.hasOwnProperty.call(data.OBJECTIVES, n),
        `${q.id} names course objective ${n}, which this quiz does not declare`);
    }
  }
});

test("the four objectives it claims are each asked about, and no others are claimed", () => {
  const declared = Object.keys(data.OBJECTIVES).map(Number).sort((a, b) => a - b);
  assert.deepEqual(declared, COVERED_OBJECTIVES,
    "the objective list must hold exactly the four these frameworks serve");
  const asked = new Set();
  for(const q of data.QUESTIONS) q.co.forEach(n => asked.add(n));
  for(const n of COVERED_OBJECTIVES){
    assert.ok(asked.has(n), `no question serves course objective ${n}`);
  }
});

test("the intro says plainly which objectives the quiz does not reach", () => {
  const callout = html.slice(html.indexOf("Not on this quiz"), html.indexOf("Not on this quiz") + 700);
  assert.ok(callout.includes("life cycle"), "the callout must name the life-cycle objective it leaves alone");
  assert.ok(/database technology|networks/.test(callout),
    "the callout must name the infrastructure objective it leaves alone");
});

/* ============================================================================
   THE TEACHING THE QUIZ IS FOR
   ========================================================================== */
test("both frameworks are genuinely covered, not just the memorable one", () => {
  const forceTopics = Object.keys(data.TOPICS).filter(k => data.TOPICS[k].kind === "force");
  const chainTopics = Object.keys(data.TOPICS).filter(k => data.TOPICS[k].kind === "chain");
  assert.ok(forceTopics.length >= 1 && chainTopics.length >= 1,
    "the quiz must carry topics belonging to each framework");
  const text = data.QUESTIONS.map(q => `${q.q} ${q.opts.join(" ")} ${q.why.join(" ")} ${q.key}`).join(" ").toLowerCase();
  for(const force of ["rivalry", "new entrants", "bargaining power of buyers",
                      "bargaining power of suppliers", "substitute"]){
    assert.ok(text.includes(force), `no question anywhere mentions ${force}`);
  }
  for(const activity of ["inbound logistics", "operations", "outbound logistics",
                         "sales and marketing", "service", "human resources",
                         "technology development", "procurement", "administration"]){
    assert.ok(text.includes(activity), `no question anywhere mentions ${activity}`);
  }
});

test("the closing topic teaches the shape of the written analysis", () => {
  const write = data.QUESTIONS.filter(q => q.topic === "write");
  assert.equal(write.length, 5, "the written-analysis topic must carry five questions");
  const text = write.map(q => `${q.q} ${q.opts.join(" ")} ${q.why.join(" ")} ${q.key}`).join(" ").toLowerCase();
  for(const move of ["all five", "two", "one", "150 to 200 words", "measure"]){
    assert.ok(text.includes(move), `the written-analysis topic never mentions "${move}"`);
  }
  assert.ok(/date|when you will look|reviewed at/.test(text),
    "the written-analysis topic must require a timeframe as well as a measure");
});

/* ============================================================================
   ASSESSMENT HYGIENE
   The graded case's own wording never reaches a student-facing page in this
   repository. The quiz teaches the shape of the deliverable, not the case.
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

test("the firms in the questions are invented and the page says so", () => {
  assert.match(html, /Every firm below is invented\. None of them is a real company\./,
    "the question bank must state that its firms are hypothetical");
});
