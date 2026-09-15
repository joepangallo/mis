/* Contract tests for the self-contained Module 6 review game.
 *
 * Node standard library only — there is no package.json in this repository and
 * the game deliberately has no dependencies of its own.
 *
 * Board data is extracted by slicing the declaration block out of the page's
 * inline script and evaluating it in a sandbox, never by regex-parsing
 * individual fields, so a clue whose text happens to contain a brace or a
 * quote cannot silently break the tests.
 *
 * Run: node --test module-06-jeopardy.test.mjs
 */
import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = dirname(fileURLToPath(import.meta.url));
const PAGE = "module-06-jeopardy.html";
const MODULE_PAGE = "../module-06-managing-data-and-business-intelligence.html";
const html = readFileSync(join(ROOT, PAGE), "utf8");

/* The five course objectives one chapter on data management can honestly
   claim. The board says so on its intro screen and must not quietly claim
   more, nor quietly stop asking about one it does claim. */
const COVERED_OBJECTIVES = [2, 3, 4, 7, 8];

/* Objectives the intro promises are NOT on this board, each paired with wording
   the callout has to contain so the promise cannot be deleted silently. */
const DISCLAIMED = [
  /information systems department does/i,
  /electronic commerce/i,
  /life cycle of an information system/i,
  /security breaches and computer crime/i,
  /database application and a\s+spreadsheet decision support system/i
];

const FORCE_ANSWERS = [
  "rivalry among existing competitors",
  "the threat of new entrants",
  "the bargaining power of buyers",
  "the bargaining power of suppliers",
  "the threat of substitutes"
];

const REPORT_ANSWERS = [
  "scheduled report",
  "exception report",
  "key-indicator report",
  "drill-down report",
  "ad hoc query"
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
  const lastIdx = html.indexOf("var PLAYERS_KEY", start);
  assert.ok(lastIdx > start, "missing the PLAYERS_KEY declaration after OBJECTIVES");
  const end = html.indexOf(";", lastIdx);
  assert.ok(end > lastIdx, "unterminated PLAYERS_KEY statement");
  return new Function(
    `"use strict";\n${html.slice(start, end + 1)}\n` +
    "return { OBJECTIVES, SOURCES, SOURCE_ORDER, ROUND1, ROUND2, ROUNDS, FINAL, KIND_LABELS," +
    " MAX_PLAYERS, MAX_NAME, THEME_KEY, BEST_KEY, PLAYERS_KEY };"
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
function answersIn(cats){
  return cats.flatMap(cat => cat.clues.map(c => c.answer.toLowerCase()));
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
  /* Markup only. Links the script builds at runtime (the results table's
     section rows) are checked against SOURCES further down, where the real
     path is known rather than the concatenation that produces it. */
  const markup = html.replace(/<script(?:\s[^>]*)?>[\s\S]*?<\/script>/gi, "");
  const refs = [...markup.matchAll(/(?:src|href)="([^"]*)"/g)].map(m => m[1]);
  assert.ok(refs.length >= 3, "expected links back to the module and the other boards");
  for(const ref of refs){
    assert.ok(!/^[a-zA-Z][a-zA-Z0-9+.-]*:/.test(ref) && !ref.startsWith("//"),
      `external reference "${ref}" breaks the offline, self-contained contract`);
    const path = ref.split("#")[0].split("?")[0];
    if(path === "") continue;
    assert.ok(existsSync(join(ROOT, path)), `link target "${path}" does not exist`);
  }
});

test("nothing on the page reaches the network", () => {
  assert.doesNotMatch(html, /https?:\/\//, "an absolute URL appears on a page that must work offline");
  assert.doesNotMatch(html, /fetch\(|XMLHttpRequest|navigator\.sendBeacon/,
    "the page must not contain any network call");
});

test("the How-to-play panel sits on the intro screen, before the board", () => {
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
  assert.match(html, /<div class="count-row" role="group" aria-label="Number of players">/,
    "the player-count buttons must be a labelled group");
  for(let i = 1; i <= 4; i++){
    assert.ok(html.includes(`<label for="pname${i}">`), `player ${i} name input needs a label`);
  }
});

test("the page inherits the study modules' theme and persists its own override", () => {
  assert.ok(html.includes('localStorage.getItem("mis-ch1-theme-v1")'),
    "must fall back to the shared module theme when it has no saved choice of its own");
  assert.ok(html.includes("localStorage.getItem(THEME_KEY)"),
    "must read its own saved theme before the shared fallback");
  assert.ok(html.includes("localStorage.setItem(THEME_KEY,"),
    "theme toggle must persist to THEME_KEY");
  for(const key of [data.THEME_KEY, data.BEST_KEY, data.PLAYERS_KEY]){
    assert.ok(key.startsWith("mis-"), `"${key}" must live in the mis- namespace`);
  }
  const keys = [data.THEME_KEY, data.BEST_KEY, data.PLAYERS_KEY];
  assert.equal(new Set(keys).size, keys.length, "this board's three storage keys must be distinct");
  /* The other two boards, and the modules, keep their own records. */
  const foreign = ["mis-ch1-theme-v1", "mis-jeopardy-theme-v1", "mis-jeopardy-best-v1",
                   "mis-ffvc-jeopardy-theme-v1", "mis-ffvc-jeopardy-best-v1"];
  for(const key of keys){
    assert.ok(!foreign.includes(key), `"${key}" collides with a key another page already owns`);
  }
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
      assert.ok(Object.prototype.hasOwnProperty.call(data.KIND_LABELS, cat.kind),
        `"${cat.name}" is tagged "${cat.kind}", which has no preview-chip label`);
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
  assert.ok(data.FINAL.why.length >= 60, "Final Jeopardy answer has no real explanation");
  assert.equal(everyClue().length + 1, 51, "the intro promises fifty-one clues");
  assert.match(html, /Fifty-one clues/, "the hero must say how many clues the board holds");
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
   COVERAGE — the board has to teach the chapter, not the memorable third of it
   ========================================================================== */
test("round one names the vocabulary the chapter cannot be discussed without", () => {
  const answers = answersIn(data.ROUND1);
  const required = [
    "data-driven organization", "data flows", "data silo", "data duplication", "data inconsistency",
    "entity", "attribute", "primary key", "foreign key", "data dictionary",
    "data model", "entity-relationship diagram", "one-to-many", "many-to-many", "normalization",
    "select", "where", "order by", "join", "group by",
    "big data", "volume", "variety", "velocity", "semistructured data"
  ];
  for(const term of required){
    assert.ok(answers.some(a => a.includes(term)), `round one never asks for ${term}`);
  }
});

test("round two asks every one of the five report types by its purpose", () => {
  const cat = data.ROUND2.find(c => c.name === "Which Report Do You Want?");
  assert.ok(cat, "the report category is missing from round two");
  const answers = cat.clues.map(c => c.answer.toLowerCase());
  for(const kind of REPORT_ANSWERS){
    assert.ok(answers.some(a => a.includes(kind)), `round two never asks for a ${kind}`);
  }
});

test("round two makes every force diagnosable from a situation", () => {
  const answers = answersIn(data.ROUND2);
  for(const force of FORCE_ANSWERS){
    assert.ok(answers.some(a => a.includes(force)),
      `round two never asks the reader to diagnose ${force} from evidence`);
  }
});

test("round two asks where the data should live, across all four repositories", () => {
  const answers = answersIn(data.ROUND2);
  for(const home of ["online transaction processing", "data warehouse",
                     "document data store", "data lake"]){
    assert.ok(answers.some(a => a.includes(home)), `round two never asks for ${home}`);
  }
  /* The swamp is the cautionary half of the lake and has to be asked separately,
     because the difference between the two is governance rather than contents. */
  assert.ok(answers.some(a => a.includes("data swamp")),
    "round two never asks what an ungoverned lake has become");
});

test("the closing category teaches the shape of the recommendation", () => {
  const cat = data.ROUND2.find(c => c.name === "Making the Case");
  assert.ok(cat, "the recommendation category is missing from round two");
  const text = cat.clues.map(c => `${c.clue} ${c.answer} ${c.why}`).join(" ").toLowerCase();
  for(const move of ["value chain", "procurement", "inbound logistics", "denominator", "review date"]){
    assert.ok(text.includes(move), `the category never mentions "${move}"`);
  }
  /* Two reports out of one activity is the double count the requirement for two
     genuinely different areas exists to catch, so it has to be on the board. */
  assert.ok(/two reports are not two activities/i.test(text),
    "the category must say why two reports from one activity do not count as two areas");
});

/* ============================================================================
   TAGGING
   ========================================================================== */
test("every clue names at least one course objective and a section to go back to", () => {
  for(const { cat, clue } of everyClue()){
    assert.ok(Array.isArray(clue.co) && clue.co.length >= 1,
      `"${cat.name}" $${clue.value} names no course objective`);
    for(const n of clue.co){
      assert.ok(Object.prototype.hasOwnProperty.call(data.OBJECTIVES, n),
        `"${cat.name}" $${clue.value} names unknown course objective ${n}`);
    }
    assert.ok(Object.prototype.hasOwnProperty.call(data.SOURCES, clue.src),
      `"${cat.name}" $${clue.value} names unknown section "${clue.src}"`);
  }
  assert.ok(data.FINAL.co.length >= 1, "Final Jeopardy names no course objective");
  assert.ok(Object.prototype.hasOwnProperty.call(data.SOURCES, data.FINAL.src),
    "Final Jeopardy names no section to go back to");
});

test("the five objectives it claims are each asked about, and no others are claimed", () => {
  const declared = Object.keys(data.OBJECTIVES).map(Number).sort((a, b) => a - b);
  assert.deepEqual(declared, COVERED_OBJECTIVES,
    "the objective list must hold exactly the five this chapter serves");
  const asked = new Set();
  for(const { clue } of everyClue()) clue.co.forEach(n => asked.add(n));
  data.FINAL.co.forEach(n => asked.add(n));
  for(const n of COVERED_OBJECTIVES){
    assert.ok(asked.has(n), `no clue on either board serves course objective ${n}`);
  }
});

test("the intro says plainly which objectives the board does not reach", () => {
  const at = html.indexOf("Not on this board");
  assert.ok(at > 0, "the intro must carry a callout naming what it leaves alone");
  const callout = html.slice(at, at + 1200);
  for(const pattern of DISCLAIMED){
    assert.match(callout, pattern, `the callout must name the objective matching ${pattern}`);
  }
});

test("every section bucket is used, carries real weight, and links where it says", () => {
  const counts = {};
  for(const { clue } of everyClue()) counts[clue.src] = (counts[clue.src] || 0) + 1;
  counts[data.FINAL.src] = (counts[data.FINAL.src] || 0) + 1;
  assert.deepEqual(data.SOURCE_ORDER.slice().sort(), Object.keys(data.SOURCES).sort(),
    "the results table must render every declared section and no others");
  for(const key of Object.keys(data.SOURCES)){
    const info = data.SOURCES[key];
    assert.ok(nonEmptyString(info.label), `section "${key}" has no label`);
    assert.ok(nonEmptyString(info.covers), `section "${key}" does not say what it covers`);
    const [path, hash] = info.href.split("#");
    assert.ok(existsSync(join(ROOT, path)), `section "${key}" links to missing file "${path}"`);
    assert.ok(hash, `section "${key}" should link to its own part of the module, not the top of it`);
    const target = readFileSync(join(ROOT, path), "utf8");
    assert.ok(target.includes(`id="${hash}"`),
      `section "${key}" links to #${hash}, which no longer exists in ${path}`);
    assert.ok((counts[key] || 0) >= 5,
      `section "${key}" carries only ${counts[key] || 0} clues — too thin to diagnose from`);
  }
});

/* ============================================================================
   UP TO FOUR PLAYERS
   The whole reason this board exists alongside the other two. The rules that
   make a shared screen fair are in the markup and the engine, so they are what
   gets pinned down here.
   ========================================================================== */
test("the roster is one to four players, and the setup offers exactly that", () => {
  assert.equal(data.MAX_PLAYERS, 4, "the board is built for at most four players");
  const counts = [...html.matchAll(/class="btn count" data-count="(\d)"/g)].map(m => Number(m[1]));
  assert.deepEqual(counts, [1, 2, 3, 4], "the setup must offer one through four and nothing else");
  const inputs = [...html.matchAll(/<input id="pname(\d)"/g)].map(m => Number(m[1]));
  assert.deepEqual(inputs, [1, 2, 3, 4], "there must be exactly four name inputs");
  assert.ok(html.includes(`maxlength="${data.MAX_NAME}"`),
    "the name inputs must cap length at MAX_NAME so a chip cannot be typed off the screen");
  assert.match(html, /aria-pressed="true"[\s\S]{0,40}data-count="2"|data-count="1" aria-pressed="true"/,
    "solo must be the default selection, so the page opens as a study tool");
});

test("player names are rendered as text, never as markup", () => {
  /* Names come from a text input and are echoed into the topbar, the buzzers,
     the turn bar, the wager screen and the standings. One innerHTML on that
     path would turn a typed name into markup. */
  const script = inlineScripts(html).join("\n");
  for(const line of script.split("\n")){
    if(!line.includes("innerHTML")) continue;
    assert.ok(!/\bname\b|players\[|\.name\b/.test(line),
      `a player name reaches innerHTML here: ${line.trim()}`);
  }
  assert.ok(script.includes('function nameNode(i, cls){ return el("span", cls || "who", state.players[i].name); }'),
    "names must go through the single text-node helper");
});

test("the buzzer keys are bounded by the roster and documented on the page", () => {
  const script = inlineScripts(html).join("\n");
  assert.ok(script.includes("if(!(n >= 1 && n <= MAX_PLAYERS)) return;"),
    "a key outside 1..MAX_PLAYERS must be ignored");
  assert.ok(script.includes("if(i >= playerCount() || state.lockedOut[i]) return;"),
    "a key for a seat nobody is sitting in, or for a player already locked out, must do nothing");
  assert.ok(script.includes('if(!clueDialog.open || $("ringStep").hidden) return;'),
    "the buzzers must only be live while a clue is waiting for somebody to ring in");
  assert.match(html, /Keyboard: <b>1<\/b>&ndash;<b>4<\/b> to ring in, <b>0<\/b> for nobody/,
    "the clue dialog must tell players which keys are the buzzers");
});

test("a wrong answer costs the value and reopens the clue, and the intro says so", () => {
  const script = inlineScripts(html).join("\n");
  assert.ok(/function judgeWrong\(\)\{[\s\S]*?p\.score -= q\.value;/.test(script),
    "a wrong answer must deduct the tile's value");
  assert.ok(/function judgeWrong\(\)\{[\s\S]*?state\.lockedOut\[i\] = true;/.test(script),
    "a player who has answered wrongly must not be able to ring in again on that clue");
  assert.ok(/function judgeWrong\(\)\{[\s\S]*?if\(left\.length > 0\)\{[\s\S]*?showRingStep\(\);/.test(script),
    "a wrong answer must reopen the clue to whoever has not tried it");
  assert.ok(/function judgeRight\(\)\{[\s\S]*?state\.control = i;/.test(script),
    "answering correctly must take control of the board");
  assert.match(html, /A wrong answer costs the tile&rsquo;s value and opens the clue to everybody else/,
    "the intro must state the penalty rule");
  assert.match(html, /<b>Alone, nothing is deducted<\/b>/,
    "the intro must state that solo play carries no penalty");
});

test("the printed answer stays hidden until a multiplayer clue is settled", () => {
  /* If the answer appeared before the steal, the steal would be worthless. */
  const script = inlineScripts(html).join("\n");
  const openClue = script.slice(script.indexOf("function openClue("), script.indexOf("function remainingPlayers("));
  assert.ok(openClue.includes("hideRevealBlocks();"), "opening a clue must hide any previous answer");
  const reveal = script.indexOf("function revealAndWait(");
  const judgeRight = script.indexOf("function judgeRight(");
  const judgeWrong = script.indexOf("function judgeWrong(");
  assert.ok(reveal > 0 && judgeRight > reveal && judgeWrong > reveal,
    "both verdicts must run through the single reveal step");
  const ringInBody = script.slice(script.indexOf("function ringIn("), script.indexOf("function recordResult("));
  assert.ok(ringInBody.length > 0 && !ringInBody.includes("clueAnswer") && !ringInBody.includes("clueWhy"),
    "ringing in must not reveal the answer");
});

test("Double Jeopardy opens with the player in last place", () => {
  const script = inlineScripts(html).join("\n");
  assert.ok(script.includes("if(!isSolo()) state.control = trailingPlayer();"),
    "round two must hand control to the trailing player");
  assert.ok(/function trailingPlayer\(\)\{[\s\S]*?state\.players\[i\]\.score < state\.players\[low\]\.score/.test(script),
    "trailingPlayer must pick the lowest score");
  assert.match(html, /The player in last place picks first/,
    "the round break must tell the table who opens Double Jeopardy");
});

test("Final Jeopardy wagers are taken one player at a time and capped at that player's score", () => {
  const script = inlineScripts(html).join("\n");
  assert.ok(/var maxWager = Math\.max\(0, p\.score\);[\s\S]{0,300}if\(w > maxWager\) w = maxWager;/.test(script),
    "a wager must be clamped to the wagering player's own score");
  assert.ok(script.includes("state.finalIdx += 1;"), "wagers must advance one player at a time");
  assert.ok(script.includes('box.appendChild(el("span", "tag", state.players[i].name + " — wager locked"));'),
    "a locked wager must show as locked without showing the amount");
  assert.ok(!/lockedList[\s\S]{0,200}fmt\(state\.players\[i\]\.wager\)/.test(script),
    "a wager must not be displayed to the players who have not wagered yet");
  assert.ok(/state\.players\.forEach\(function\(p\)\{\s*if\(p\.finalCorrect\)\{\s*p\.score \+= p\.wager;/.test(script),
    "each player's final wager must settle against their own answer");
});

/* The engine rebuilds several panels from scratch between games. An element with
   an id living inside one of them is destroyed the first time its container is
   rewritten, and every later lookup of that id returns null — which shows up not
   on the first game but on the second. Nothing the script clears may contain an
   id, and this is the test that says so. */
function innerMarkupOf(id){
  const at = html.indexOf(`id="${id}"`);
  if(at < 0) return null;
  const openAt = html.lastIndexOf("<", at);
  const tag = /^<([a-zA-Z][a-zA-Z0-9]*)/.exec(html.slice(openAt))[1];
  const bodyStart = html.indexOf(">", at) + 1;
  const scan = new RegExp(`</?${tag}\\b`, "g");
  scan.lastIndex = bodyStart;
  let depth = 1, m;
  while((m = scan.exec(html)) !== null){
    depth += m[0][1] === "/" ? -1 : 1;
    if(depth === 0) return html.slice(bodyStart, m.index);
  }
  return null;
}

/* Every clear() call site, resolved to the id it empties — either written out as
   clear($("id")) or reached through a local that was assigned $("id") earlier in
   the same script. */
function clearedIds(script){
  const ids = [];
  const calls = [...script.matchAll(/clear\(([A-Za-z0-9_$()"\s]+?)\);/g)];
  for(const call of calls){
    const arg = call[1].trim();
    const direct = /^\$\("([A-Za-z0-9_]+)"\)$/.exec(arg);
    if(direct){ ids.push(direct[1]); continue; }
    const before = script.slice(0, call.index);
    const assigned = [...before.matchAll(new RegExp(`\\b${arg}\\s*=\\s*\\$\\(("?[A-Za-z0-9_]+"?)\\)`, "g"))];
    assert.ok(assigned.length > 0, `clear(${arg}) empties something this test cannot resolve to an id`);
    const source = assigned[assigned.length - 1][1];
    if(source.startsWith('"')){ ids.push(source.slice(1, -1)); continue; }
    /* The id arrived as a parameter, so the ids are whatever the callers pass. */
    const fnName = [...before.matchAll(/function\s+([A-Za-z0-9_]+)\s*\(/g)].pop()[1];
    const callers = [...script.matchAll(new RegExp(`${fnName}\\("([A-Za-z0-9_]+)"`, "g"))].map(m => m[1]);
    assert.ok(callers.length > 0, `clear(${arg}) inside ${fnName} cannot be resolved to any id`);
    callers.forEach(id => ids.push(id));
  }
  return ids;
}

test("nothing the script rebuilds from scratch contains an element with an id", () => {
  const script = inlineScripts(html).join("\n");
  const cleared = clearedIds(script);
  assert.ok(cleared.length >= 15, "expected the engine to rebuild every one of its panels and tables");
  for(const id of new Set(cleared)){
    const inner = innerMarkupOf(id);
    assert.notEqual(inner, null, `#${id} is cleared by the script but is not in the markup`);
    assert.ok(!/\sid="/.test(inner),
      `#${id} is rebuilt from scratch, so the id it contains is destroyed after the first game`);
  }
});

test("the solo best score is kept for solo games only", () => {
  const script = inlineScripts(html).join("\n");
  assert.ok(script.includes("var soloContext = playerCount() === 0 || isSolo();"),
    "the best-score chip must be hidden once more than one person is playing");
  assert.ok(/if\(isSolo\(\)\)\{[\s\S]*?saveBest\(solo\.score\);/.test(script),
    "only a solo score may be written to the best-score record");
});

test("the results screen reports the table, and names every player", () => {
  assert.match(html, /<h2>Final standings<\/h2>/, "a multiplayer game needs a standings table");
  assert.match(html, /<h2>How the table did, by course objective<\/h2>/,
    "the objective breakdown is the table's, not one player's");
  const script = inlineScripts(html).join("\n");
  assert.ok(script.includes('$("resultsHeading").textContent = winners.length > 1 ? "It is a tie" : "Winner";'),
    "a tie must be reported as a tie rather than resolved arbitrarily");
  assert.ok(/correct:anyRight/.test(script),
    "a final clue counts as answered if anybody at the table had it");
});

/* ============================================================================
   ASSESSMENT HYGIENE
   The graded case's own wording never reaches a student-facing page in this
   repository. The board teaches the material, not the assessment.
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
  const list = join(ROOT, "..", "src", "forbidden.local.txt");
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

test("the firms in the situations are invented, and the board says so", () => {
  assert.match(html, /Every firm in a situation is invented, and every figure with it\./,
    "the board data must state that the firms and figures in its situations are hypothetical");
  assert.match(html, /No real\s+company is named anywhere on this board\./,
    "the board must state that it names no real company");
  /* Module 6 names Apache Hadoop as an example framework. It is a product, not
     a practice firm, and the board does not need it — but if it ever appears,
     it must not be inside an invented situation. */
  const situations = everyClue().map(({ clue }) => clue.clue).join(" ");
  for(const name of ["Amazon", "Walmart", "Google", "Apple", "Netflix", "Target", "Hadoop"]){
    assert.ok(!situations.includes(name),
      `${name} is named inside a practice situation, which dresses invention up as reported fact`);
  }
});

test("the glossary terms the board quotes match the module's own definitions", () => {
  /* Cheap drift guard: every answer that is a chapter term should be a term the
     module page actually teaches, spelled the way the module spells it. */
  if(!existsSync(join(ROOT, MODULE_PAGE))){
    assert.fail(`${MODULE_PAGE} is missing, so the board cannot be checked against it`);
  }
  const module6 = readFileSync(join(ROOT, MODULE_PAGE), "utf8").toLowerCase();
  const terms = ["data silo", "data duplication", "data inconsistency", "primary key", "foreign key",
                 "normalization", "master data management", "data warehouse", "data mart",
                 "document data store", "data lake", "data swamp", "semistructured data",
                 "exception reports", "drill-down reports", "key-indicator reports", "ad hoc queries"];
  for(const term of terms){
    assert.ok(module6.includes(term), `the board uses "${term}", which Module 6 does not`);
  }
});
