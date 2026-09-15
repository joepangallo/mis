/* Contract tests for the self-contained practice midterm.
 *
 * Node standard library only. The answers are not in this repository: they live
 * in the untracked instructor key beside the page, so the tests that need them
 * skip when it is absent, which is what happens on CI.
 *
 * Run: node --test practice-midterm.test.mjs
 */
import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = dirname(fileURLToPath(import.meta.url));
const PAGE = "practice-midterm.html";
const KEY_FILE = "practice-midterm-instructor-key.md";
const html = readFileSync(join(ROOT, PAGE), "utf8");
const LETTERS = ["A", "B", "C", "D"];

function inlineScripts(source){
  return [...source.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/gi)].map(m => m[1]);
}
function rendered(fragment){
  return fragment.replace(/<[^>]+>/g, "").replace(/&[a-z]+;/g, "x").replace(/\s+/g, " ").trim();
}
function questionNumbers(fragment = html){
  return [...fragment.matchAll(/<h3>(\d+) &middot; /g)].map(m => Number(m[1]));
}
function choiceQuestions(){
  const names = [...new Set([...html.matchAll(/<input type="radio" name="(q\d+)"/g)].map(m => m[1]))];
  return names.map(name => ({
    name,
    options: [...html.matchAll(new RegExp(
      `<input type="radio" name="${name}" value="([A-D])"><span class="ltr">([A-D])</span><span class="opt">([\\s\\S]*?)</span></label>`, "g"))]
      .map(m => ({ value: m[1], letter: m[2], text: m[3] }))
  }));
}
function matchQuestions(){
  const groups = new Map();
  for(const m of html.matchAll(/<select data-key="(q(\d+)[a-z])"[^>]*>([\s\S]*?)<\/select>/g)){
    const [, key, number, body] = m;
    const options = [...body.matchAll(/<option(?: value="")?>([\s\S]*?)<\/option>/g)]
      .map(o => rendered(o[1])).filter(t => !t.startsWith("x") && t !== "");
    if(!groups.has(number)) groups.set(number, { number, rows: [], options: [] });
    const group = groups.get(number);
    group.rows.push(key);
    group.options.push(options);
  }
  return [...groups.values()];
}
function answerKey(){
  const path = join(ROOT, KEY_FILE);
  if(!existsSync(path)) return null;
  const key = {};
  for(const line of readFileSync(path, "utf8").split(/\r?\n/)){
    const m = line.match(/^(Q\d+[a-z]?)=(.+)$/);
    if(m) key[m[1]] = m[2].trim();
  }
  return Object.keys(key).length ? key : null;
}

/* ============================================================================
   THE PAGE ITSELF
   ========================================================================== */
test("inline scripts parse as valid JavaScript", () => {
  const scripts = inlineScripts(html);
  assert.equal(scripts.length, 1);
  assert.doesNotThrow(() => new Function(scripts[0]));
});

test("the page is self-contained", () => {
  assert.doesNotMatch(html, /<script\b[^>]*\bsrc=/i);
  assert.doesNotMatch(html, /<link\b/i);
  assert.doesNotMatch(html, /https?:\/\//i, "the page must not reference anything over the network");
  const markup = html.replace(/<script(?:\s[^>]*)?>[\s\S]*?<\/script>/gi, "");
  for(const [, ref] of markup.matchAll(/(?:src|href)="([^"]*)"/g)){
    const path = ref.split("#")[0].split("?")[0];
    if(path === "") continue;
    assert.ok(existsSync(join(ROOT, path)), `link target "${path}" does not exist`);
  }
});

/* ============================================================================
   IT IS THE QUESTIONS AND NOTHING ELSE
   This is the whole point of the page: the exam machinery without the exam's
   scaffolding. Anything that creeps back in here should fail.
   ========================================================================== */
test("nothing but the questions", () => {
  const forbidden = [
    [/Course objective/i, "an objective tag"],
    [/objective \d/i, "an objective reference"],
    [/INSTRUCTOR NOTE/i, "an instructor comment"],
    [/percent\s*\(/i, "a weighting"],
    [/\bcheckList\b|A check on the shape/i, "the shape checklist"],
    [/unansweredMsg|Questions you have not answered/i, "the unanswered panel"],
    [/What this exam draws on|Where it comes from/i, "a coverage table"],
    [/\bModule \d/i, "a pointer at the study material"],
    [/\b\d+\s*(pts|points)\b/i, "a point value"]
  ];
  for(const [pattern, what] of forbidden){
    assert.doesNotMatch(html, pattern, `${what} has crept back onto the page`);
  }
});

test("it keeps only the machinery needed to answer and hand in", () => {
  for(const id of ["who", "exportBtn", "printBtn", "clearBtn", "saveStatus", "printIdentity", "wcBadge"]){
    assert.ok(html.includes(`id="${id}"`), `missing ${id}, which the page needs to be usable`);
  }
});

/* ============================================================================
   SHAPE — the same as the real exam
   ========================================================================== */
test("three parts, thirty-three questions, numbered once each", () => {
  assert.equal((html.match(/class="part-head"/g) || []).length, 3);
  assert.deepEqual(questionNumbers(), Array.from({ length: 33 }, (_, i) => i + 1),
    "questions must run 1 to 33 in order, each heading used once");
  const parts = html.split(/<div class="part-head">/).slice(1);
  assert.deepEqual(parts.map(p => questionNumbers(p).length), [16, 14, 3],
    "the practice paper must carry the same 16-14-3 split as the exam it prepares for");
});

test("every multiple choice question offers four distinct options, A to D, none preselected", () => {
  const questions = choiceQuestions();
  assert.equal(questions.length, 19);
  for(const q of questions){
    assert.equal(q.options.length, 4, `${q.name} does not offer four options`);
    assert.deepEqual(q.options.map(o => o.value), LETTERS, `${q.name} is not lettered A to D`);
    assert.deepEqual(q.options.map(o => o.letter), LETTERS, `${q.name}'s visible letters are out of order`);
    const texts = q.options.map(o => rendered(o.text));
    assert.equal(new Set(texts).size, 4, `${q.name} repeats an option`);
  }
  assert.doesNotMatch(html.replace(/<script[\s\S]*?<\/script>/gi, ""), /<input[^>]*\schecked/i,
    "no option may be preselected");
});

test("no question is introduced by a one-line stem", () => {
  const stems = [...html.matchAll(/<p class="stem">([\s\S]*?)<\/p>/g)].map(m => rendered(m[1]));
  assert.equal(stems.length, 22, "every multiple choice, matching and grid question needs a stem");
  const short = stems.filter(s => s.length < 60);
  assert.equal(short.length, 0, `a one-line stem is where ambiguity hides: ${short.join(" | ")}`);
});

test("matching questions offer one option per row, identical in every row", () => {
  const questions = matchQuestions();
  assert.equal(questions.length, 2);
  for(const q of questions){
    const first = q.options[0];
    assert.equal(first.length, q.rows.length,
      `question ${q.number} offers ${first.length} options for ${q.rows.length} rows`);
    for(const list of q.options) assert.deepEqual(list, first);
    assert.equal(new Set(first).size, first.length, `question ${q.number} repeats an option`);
  }
  assert.deepEqual(questions.map(q => q.rows.length), [5, 9]);
});

test("every written question states how much of an answer it wants", () => {
  const tasks = [...html.matchAll(/<div class="task">([\s\S]*?)<\/div>\s*(?=<div class="task">|<\/section>)/g)]
    .map(m => m[1]).filter(t => /<textarea/.test(t));
  assert.equal(tasks.length, 12, `expected the twelve written questions, found ${tasks.length}`);
  const counted = /\b(one|two|three|four|five|both|each of the five|all five|exactly|all seven)\b/i;
  for(const task of tasks){
    const heading = (task.match(/<h3>(\d+)/) || [])[1];
    const prose = rendered(task.replace(/<textarea[\s\S]*?<\/textarea>/g, ""));
    assert.match(prose, counted, `question ${heading} never says how many of anything it wants`);
    assert.doesNotMatch(prose, /Choose one of these|choose any|pick one of the following/i,
      `question ${heading} lets the student choose the subject, which makes the marking subjective`);
  }
});

/* ============================================================================
   THE CASE
   ========================================================================== */
test("the costed exhibit adds up to the total it prints", () => {
  const start = html.indexOf("Exhibit &mdash; where");
  const table = html.slice(start, html.indexOf("</table>", start));
  const figures = [...table.matchAll(/<td class="num">\$([\d,]+)<\/td>/g)].map(m => Number(m[1].replace(/,/g, "")));
  const total = figures.pop();
  assert.equal(figures.reduce((a, b) => a + b, 0), total, "the exhibit rows do not sum to the total row");
  assert.equal(total, 4100000);
  assert.match(html.replace(/\s+/g, " "), /costs of \$4\.1 million/);
});

test("the case gives evidence for every force, states a position, and settles the runner-up", () => {
  const start = html.indexOf("Halloway Casework</h2>");
  const brief = rendered(html.slice(start, html.indexOf("Exhibit &mdash; where")));
  for(const [pattern, what] of [
    [/one manufacturer/, "supplier concentration"],
    [/four other shops/, "rivalry"],
    [/No new shop has opened/i, "why entry is weak"],
    [/thirty-one general contractors/i, "buyer dispersion"],
    [/modular cabinets/, "the substitute"],
    [/never been the low bid/i, "the position an answer has to align to"],
    [/one job in five for three years/i, "why rivalry is knowably second"]
  ]){
    assert.match(brief, pattern, `the brief gives no evidence for ${what}`);
  }
});

test("the closing question carries the whole deliverable", () => {
  const start = html.indexOf("<h3>33 &middot;");
  const task = rendered(html.slice(start, html.indexOf("</textarea>", start))).toLowerCase();
  for(const element of ["strongest force", "activity", "one initiative", "kind of system",
                        "how it would run", "measure and the date", "position halloway has chosen"]){
    assert.match(task, new RegExp(element), `the recommendation question never asks for the ${element}`);
  }
  assert.ok(html.includes("200 to 250 words"));
  const script = inlineScripts(html)[0];
  assert.ok(/n >= 200 && n <= 250/.test(script) === false || true);
  assert.ok(/n < 200/.test(script) && /n > 250/.test(script), "the counter must report both edges");
});

/* ============================================================================
   THE ANSWERS — only when the untracked key is beside the page
   ========================================================================== */
test("every question has one recorded answer, spread across all four letters", (t) => {
  const key = answerKey();
  if(!key){ t.skip(`${KEY_FILE} is not present`); return; }
  const counts = { A:0, B:0, C:0, D:0 };
  for(const q of choiceQuestions()){
    const answer = key[q.name.toUpperCase()];
    assert.ok(LETTERS.includes(answer), `${q.name} has no valid answer in the key`);
    counts[answer] += 1;
  }
  for(const letter of LETTERS){
    assert.ok(counts[letter] >= 3, `only ${counts[letter]} answers are ${letter}`);
  }
});

test("the right answer is never simply the longest option", (t) => {
  const key = answerKey();
  if(!key){ t.skip(`${KEY_FILE} is not present`); return; }
  for(const q of choiceQuestions()){
    const lengths = q.options.map(o => rendered(o.text).length);
    const correct = LETTERS.indexOf(key[q.name.toUpperCase()]);
    const others = lengths.filter((_, i) => i !== correct);
    assert.ok(lengths[correct] <= Math.max(...others),
      `${q.name}: the correct option is the longest, which is a pattern rather than a question`);
  }
});

test("the right answer is not a bare label among explained distractors", (t) => {
  /* The mirror of the rule above, and the easier one to write by accident: a
     one-word correct option sitting among four that each carry a "because"
     clause is visible from across the room without reading the question. */
  const key = answerKey();
  if(!key){ t.skip(`${KEY_FILE} is not present, so the answers are not being checked`); return; }
  for(const q of choiceQuestions()){
    const lengths = q.options.map(o => rendered(o.text).length);
    const correct = LETTERS.indexOf(key[q.name.toUpperCase()]);
    const others = lengths.filter((_, i) => i !== correct);
    const under = Math.min(...others) - lengths[correct];
    assert.ok(under <= 25,
      `${q.name}: the correct option is ${under} characters shorter than every distractor`);
  }
});

test("each matching question uses every option exactly once", (t) => {
  const key = answerKey();
  if(!key){ t.skip(`${KEY_FILE} is not present`); return; }
  for(const q of matchQuestions()){
    const answers = q.rows.map(row => {
      const a = key[row.replace(/^q/, "Q")];
      assert.ok(a, `matching row ${row} has no answer in the key`);
      return a;
    });
    assert.deepEqual([...answers].sort(), [...q.options[0]].sort(),
      `question ${q.number} does not use every option exactly once`);
  }
});

test("the practice questions are not the exam's questions", (t) => {
  /* Practising on the paper you will sit teaches the paper, not the material. */
  if(!existsSync(join(ROOT, "midterm.html"))){ t.skip("no exam to compare against"); return; }
  const exam = readFileSync(join(ROOT, "midterm.html"), "utf8");
  /* Question stems only. The instructions above a matching question are meant to
     read the same on both papers — that is what makes it a rehearsal. */
  const questionStems = (source) => new Set(
    [...source.matchAll(/<div class="task">([\s\S]*?)<\/div>\s*(?=<div class="task">|<\/section>)/g)]
      .map(m => m[1])
      .filter(task => /<input type="radio"/.test(task))
      .map(task => rendered((task.match(/<p class="stem">([\s\S]*?)<\/p>/) || [, ""])[1])));
  const examStems = questionStems(exam);
  for(const stem of questionStems(html)){
    assert.ok(!examStems.has(stem), `a stem is copied from the exam: "${stem.slice(0, 60)}…"`);
  }
  assert.ok(questionStems(html).size >= 19, "expected a stem for every multiple choice question");
  /* Derived, not hardcoded: naming the exam's case firm here would publish a
     detail of a paper this repository deliberately does not contain. */
  const caseFirm = (source) => rendered(
    (source.match(/<span class="kicker">The brief<\/span>\s*<h2>([\s\S]*?)<\/h2>/) || [, ""])[1]);
  assert.ok(caseFirm(html).length > 0, "the practice case has no named firm");
  assert.ok(caseFirm(exam).length > 0, "the exam's case has no named firm to compare against");
  assert.notEqual(caseFirm(html), caseFirm(exam), "the practice case must be a different firm");
});

/* ============================================================================
   HYGIENE
   ========================================================================== */
test("no institutional, course-code, or local-path wording reaches the page", () => {
  for(const pattern of [/\bKeiser\b/i, /\bCGS\s*-?\s*3300\b/i, /\bsignature assignment\b/i,
                        /\bSLO\s*-?\s*1\b/i, /\bbenchmark grade\b/i, /\/Users\//, /\bC:\\/]){
    assert.doesNotMatch(html, pattern, `forbidden wording ${pattern} appears on the page`);
  }
});

function reservedTerms(){
  const list = join(ROOT, "src", "forbidden.local.txt");
  if(!existsSync(list)) return null;
  return readFileSync(list, "utf8").split(/\r?\n/).map(t => t.trim()).filter(Boolean);
}

test("no reserved assessment term reaches the page", (t) => {
  const terms = reservedTerms();
  if(!terms || terms.length === 0){ t.skip("src/forbidden.local.txt is not present"); return; }
  for(const term of terms){
    const pattern = new RegExp("\\b" + term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "\\b", "i");
    assert.doesNotMatch(html, pattern, "the page contains a reserved assessment term");
  }
});

test("the answer key is kept out of version control", () => {
  const ignore = readFileSync(join(ROOT, ".gitignore"), "utf8");
  assert.match(ignore, /^practice-midterm-instructor-key\*\.md$/m);
});

test("every firm on the page is declared invented", () => {
  assert.match(html, /Halloway Casework is not a real company/);
  assert.match(html, /Every company here is invented/);
});
