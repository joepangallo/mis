/* Contract tests for Rocks in the River, the Chapter 8 learning game.
 *
 * Node standard library only — there is no package.json in this repository and
 * the game deliberately has no dependencies of its own.
 *
 * The page's data and its pure functions are reached by evaluating the whole
 * inline script against a small DOM stub, rather than by regex-parsing fields,
 * so a briefing whose text happens to contain a brace or a quote cannot break
 * the tests. Everything the page computes — the cost of a re-keyed order, the
 * total cost of ownership, the amplification of a demand blip four tiers up,
 * the value of a retained customer — is then recomputed here from first
 * principles and compared, so a tuned constant that quietly breaks a lesson
 * fails the build.
 *
 * Run: node --test games/rocks-in-the-river.test.mjs
 */
import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, "..");
const PAGE = "rocks-in-the-river.html";
const html = readFileSync(join(HERE, PAGE), "utf8");

/* The page wraps long sentences across string concatenations to keep its own
   lines short, so a phrase the reader sees whole is "…take back all " + "but
   one…" on disk. Any test matching PROSE should match this instead of `html`,
   or it fails on where the author happened to break the line. */
const prose = html.replace(/"\s*\+\s*"/g, "");


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

  const node = () => ({
    textContent: "", innerHTML: "", value: "", checked: false, disabled: false,
    hidden: false, className: "", style: {}, firstChild: null,
    classList: { add(){}, remove(){}, toggle(){}, contains(){ return false; } },
    setAttribute(){}, getAttribute(){ return null; }, removeAttribute(){},
    addEventListener(){}, removeEventListener(){}, dispatchEvent(){},
    appendChild(){}, removeChild(){}, insertBefore(){}, closest(){ return null; },
    querySelector(){ return null; }, querySelectorAll(){ return []; },
    getBoundingClientRect(){ return { width:0, height:0 }; }
  });
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

  const exported = ["LOS", "COURSE_OBJECTIVES", "FIRM", "BUYERS", "START", "THEME_KEY", "BEST_KEY", "CLAIMS", "ENDINGS", "newCarry", "carryLines", "$", "stage", "el", "money", "dollars", "pct", "announce", "clamp", "esc", "applyTheme", "loadBest", "saveBest", "game", "newGame", "spend", "moveTrust", "moveIntegration", "scoreSoFar", "refreshMeters", "renderRail", "renderBrief", "renderManual", "clearStage", "liveRound", "showRound", "numberQuestions", "showDebrief", "ROUNDS", "pillGroup", "optionStack", "enableCommit", "nextAction", "refreshNext", "item", "Questions", "repairPills", "pillQuestion", "choiceQuestion", "assignBoard", "CHAIN_CORE", "CHAIN_SUPPORT", "CHAIN_ALL", "chainActivity", "isCoreActivity", "renderChainBoard", "SERIES_COLOURS", "lineChart", "whipRun", "whipAmplification", "whipPeak", "whipTrough", "whipCost", "DEMO", "GESTURE", "showGesture", "showIntro", "verdictFor", "showReview", "O2C_STEPS", "O2C_ORDER", "P2P_DECOYS", "O2C_RULES", "STRAY_COST", "o2cViolations", "o2cStrays", "o2cMissing", "o2cCost", "o2cStep", "CHAIN_COSTS", "SYSTEMS", "SYSTEM_TRAY", "systemById", "chainTotal", "chainShare", "chainRanked", "chainSum", "chainNames", "placeScore", "placedOn", "WIRE_DAYS", "WIRE_ERROR_COST", "WIRE_ERRORS", "WIRE_CAP", "WIRE_LATENCY", "WIRE_MODES", "WIRE_MODE_LABEL", "CROSSINGS", "crossingById", "wireRecords", "wireAnnual", "wireBill", "wireCapital", "wirePayback", "wirePaybackRange", "wireAllOn", "wireMovedOff", "wireIntegration", "wireScore", "wireSetPill", "ERP_QUOTE", "erpQuoteTotal", "ERP_CUSTOMIZE_BUILD", "ERP_REPROGRAM_SHARE", "ERP_RELEASES", "ERP_CONFIG_DAYS", "ERP_CONFIG_RATE", "erpReprogramPerRelease", "erpCustomizeFiveYear", "erpConfigureFiveYear", "erpModeFiveYear", "ERP_MODULES", "erpModule", "erpCountMode", "erpFiveYearTotal", "erpAllSet", "erpCustomScore", "erpPatchable", "ERP_TCO_LINES", "erpTcoLine", "erpOngoingFiveYear", "erpTcoAmount", "erpFixedThree", "erpForgotten", "erpForgottenPct", "erpSwitchedTotal", "erpTcoScore", "erpYear1", "ERP_BINS", "ERP_SYSTEMS", "erpSystem", "erpBin", "erpModulesRight", "erpModuleScore", "erpArchScore", "erpCutScore", "erpTrustDelta", "erpIntegrationDelta", "ERP_BUDGET_CUT", "R4_ON_HAND", "R4_ALLOCATED", "R4_ASKED", "R4_ASK_DAYS", "R4_DRIFT_PER_HOUR", "R4_REPAIR_LATENCY", "R4_REPAIR_WANTED", "R4_SHORT_COST", "r4TrueAvailable", "r4Drift", "r4OnHandShown", "r4AllocatedShown", "r4Displayed", "r4Stale", "r4Confirmed", "r4Shortfall", "r4ShortCost", "r4PromisePoints", "r4Trust", "R4_ENQUIRIES", "r4DeskPoints", "r4PlainText", "r4List", "R4_DROP_PCT", "R4_WEEKS_LIVE", "R4_SPREADSHEET_SUPERVISORS", "R4_CUSTOMIZE_BUILD", "R4_REPROGRAM_SHARE", "R4_RELEASES", "r4ReprogramPerRelease", "r4CustomizeFiveYear", "WHIP_DEMAND", "WHIP_BASE", "WHIP_WEEKS", "WHIP_TIERS", "WHIP_HOLD_PER_UNIT_WEEK", "WHIP_SHORT_PER_TIER_WEEK", "WHIP_K_MIN", "WHIP_K_TIGHT", "WHIP_K_STEADY", "WHIP_K_LADDER", "WHIP_FULL", "WHIP_CALM_PCT", "whipFlat", "whipAll", "whipEveryShared", "whipSharedCount", "whipNum", "whipPctText", "whipWeekLabels", "whipScene", "whipToday", "whipTimesNormal", "whipScore", "whipSum", "whipZeroWeeks", "whipCountWord", "whipCap", "whipWeekList", "whipIncoming", "whipBiggestJump", "whipTrace", "whipTableHtml", "whipReadoutHtml", "whipSeriesTableHtml", "R6_FLOWS", "R6_CHECK_AMOUNT", "R6_CARDS", "r6Card", "r6Flow", "r6FlowRight", "r6FlowWrong", "r6FlowPoints", "r6FlowMax", "R6_DEALERS", "R6_KINDS", "R6_SITUATIONS", "r6Kind", "r6PortalRight", "R6_WEEK_UNITS", "R6_LOT_RUNS", "R6_BAD_LOT", "R6_SERIAL_BASE", "R6_CUSTOMER_CYCLE", "r6Register", "R6_REG", "r6UnitsOn", "r6WeeksOn", "r6CustomersOn", "r6Lots", "r6Customers", "r6WeekSweepUnits", "R6_WELD_WEEKS", "r6WeldRows", "r6WeldLots", "r6WeldCustomers", "R6_PER_UNIT", "R6_GOODWILL", "R6_FIELD_FAIL", "r6PerCabinet", "r6RecallCost", "r6DoNothingCost", "r6Unnecessary", "r6RecallUnits", "r6ScopeCost", "r6RecallScore", "DESK", "DESK_LEVERS", "MERGE_COST", "LTV", "WINBACK", "ltvMerged", "ltvClears", "deskLever", "deskPreset", "deskModel", "deskToday", "DESK_BANDS", "deskScore", "FORCE_BINS", "FORCE_CARDS", "FORCE_MISS", "forceCard", "forceBin", "forceScore", "aOpts", "answerOption", "answerScore", "CRM_PARTS", "CRM_STEMS", "CRM_MISS", "crmPart", "crmScore"];
  const keys = Object.keys(sandbox);
  const fn = new Function(...keys,
    `"use strict";\n${code}\nreturn { ${exported.join(", ")} };`);
  return fn(...keys.map(k => sandbox[k]));
}

const G = loadGame();

function nonEmpty(v){ return typeof v === "string" && v.trim().length > 0; }
function close(a, b, tol = 1e-9){ return Math.abs(a - b) <= tol; }

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
  assert.ok(refs.length >= 3, "expected links back to the reading and the sibling pages");
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
  for(const taken of ["mis-ch1-theme-v1", "mis-jeopardy-theme-v1", "mis-ffvc-jeopardy-theme-v1",
                      "mis-decision-engine-theme-v1"]){
    assert.notEqual(G.THEME_KEY, taken, `THEME_KEY collides with ${taken}`);
  }
  for(const taken of ["mis-jeopardy-best-v1", "mis-ffvc-jeopardy-best-v1", "mis-decision-engine-best-v1"]){
    assert.notEqual(G.BEST_KEY, taken, `BEST_KEY collides with ${taken}`);
  }
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

test("the page has exactly one stylesheet and no CSS has leaked into the body", () => {
  /* The stylesheet is assembled from several files. If any of them carries its
     own closing tag, the parser ends the style element early and every rule
     after it is rendered as text at the top of the page. It looks like a wall
     of comment banners and it is invisible to a parse check, so it is a test. */
  assert.equal((html.match(/<style\b/gi) || []).length, 1, "there must be exactly one style element");
  assert.equal((html.match(/<\/style>/gi) || []).length, 1, "there must be exactly one closing style tag");
  const bodyAt = html.indexOf("<body>");
  assert.ok(bodyAt > 0, "the page needs a body");
  const body = html.slice(bodyAt).replace(/<script[\s\S]*?<\/script>/gi, "");
  assert.doesNotMatch(body, /\/\*\s*={10,}/, "a CSS comment banner has leaked into the body as text");
  assert.doesNotMatch(body, /\{[^}]*:[^}]*;[^}]*\}/,
    "what looks like a CSS rule is sitting in the body outside the script");
  /* And the style element must close before the body opens. */
  assert.ok(html.indexOf("</style>") < bodyAt, "the stylesheet must close before the body");
});

test("the head is well formed: one title, one description, one viewport", () => {
  for(const [tag, pattern] of [["title", /<title>/g], ["description", /<meta name="description"/g],
                               ["viewport", /<meta name="viewport"/g], ["charset", /<meta charset/g]]){
    assert.equal((html.match(pattern) || []).length, 1, `there should be exactly one ${tag}`);
  }
  assert.doesNotMatch(html, /__[A-Z_]+__/, "a build placeholder was left in the page");
});

test("no real company is named anywhere on the page", () => {
  /* The rule for this repository is that practice situations are invented and
     say so. The sibling game allows one real name inside a card marked as the
     chapter's own example; this one does not need even that, so it has none. */
  const names = ["SAP", "Oracle", "Microsoft", "Salesforce", "HubSpot", "Dell", "Amazon", "Walmart",
                 "Apple", "Toyota", "Boeing", "Nike", "Starbucks", "Alibaba", "Kinaxis", "Popeye",
                 "Tencent", "WeChat", "Southwest", "Onapsis", "PayPal", "Klarna", "Hootsuite",
                 "Facebook", "LinkedIn", "YouTube", "TikTok", "Google"];
  for(const n of names){
    assert.doesNotMatch(html, new RegExp("\\b" + n + "\\b"),
      `${n} is a real company and this page names only invented ones`);
  }
});
/* ============================================================================
   THE SHAPE OF THE GAME
   ========================================================================== */
test("seven rounds, numbered in order, each fully written", () => {
  assert.equal(G.ROUNDS.length, 7, "the game is seven rounds");
  G.ROUNDS.forEach((m, i) => {
    assert.equal(m.round, i + 1, `round ${i} is numbered ${m.round}`);
    assert.ok(Object.prototype.hasOwnProperty.call(G.LOS, m.lo),
      `round ${m.round} claims objective ${m.lo}, which is not one of the chapter's`);
    for(const field of ["name", "railName", "teaches", "commitNote", "task"]){
      assert.ok(nonEmpty(m[field]), `round ${m.round} is missing ${field}`);
    }
    assert.ok(nonEmpty(m.brief.from), `round ${m.round}'s briefing has no sender`);
    assert.ok(nonEmpty(m.brief.title), `round ${m.round}'s briefing has no title`);
    assert.ok(Array.isArray(m.brief.body) && m.brief.body.length >= 2,
      `round ${m.round}'s briefing needs at least two paragraphs`);
    assert.ok(nonEmpty(m.brief.ask), `round ${m.round} does not say what the board needs`);
    assert.ok(nonEmpty(m.manual.title) && nonEmpty(m.manual.body),
      `round ${m.round} has no field manual`);
    assert.ok(m.manual.body.length >= 900,
      `round ${m.round}'s field manual is too thin to rescue a stuck reader`);
    assert.ok(Array.isArray(m.howTo) && m.howTo.length >= 3,
      `round ${m.round} does not tell the reader what to do on the screen`);
    assert.equal(typeof m.build, "function", `round ${m.round} has no builder`);
    assert.equal(typeof m.submit, "function", `round ${m.round} has no grader`);
  });
});

test("every round states its job in one sentence, and every how-to line tells you to do something", () => {
  /* The task line is the fix for the one piece of feedback the sibling game got
     twice: a reader who reads nothing else must still know what to do. */
  for(const m of G.ROUNDS){
    assert.ok(m.task.length >= 40, `round ${m.round}'s task line is too short to be a job`);
    assert.ok(m.task.length <= 260, `round ${m.round}'s task line has become a paragraph`);
    const sentences = m.task.split(/(?<=[.!?])\s+/).filter(s => s.trim().length > 0);
    assert.ok(sentences.length <= 2, `round ${m.round}'s task line is ${sentences.length} sentences`);
    for(const line of m.howTo){
      const text = line.replace(/<[^>]*>/g, "").trim();
      assert.ok(/^(Press|Put|Set|Choose|Pick|Place|Read|Answer|Switch|Slide|Move|Take|Sort|Drag|Work|Decide|Name|Run|Leave|Type|Confirm|Open|Check|Watch|Keep|Use|Add|Give|Tell|Wire|Fill|Turn|Lock|Match|Build|File|Rate|Weigh|Compare|Settle|Start|Find|Look|Say)\b/i.test(text),
        `round ${m.round} how-to line does not tell the reader to do anything: "${text.slice(0, 70)}"`);
    }
  }
});

test("all five of the chapter's objectives are played, and none is a token", () => {
  const counts = {};
  for(const key of Object.keys(G.LOS)) counts[key] = 0;
  for(const m of G.ROUNDS) counts[m.lo]++;
  for(const [key, n] of Object.entries(counts)){
    assert.ok(n >= 1, `objective ${key} is never the subject of a round`);
  }
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
  /* Objective 6 is the one a reader could most plausibly think this covers,
     since the game buys and installs a system, so the page has to say why. */
  const six = G.COURSE_OBJECTIVES.notClaimed.find(o => o.n === 6);
  assert.ok(six && /next chapter|life cycle|acquir/i.test(six.text),
    "objective 6 must be disclaimed with a reason, since the game does install a system");
});

test("the firms are invented and the page says so", () => {
  assert.match(html, /Every organization, person and figure in this game is invented\./,
    "the page must say plainly that its firms are invented");
});

test("the ending bands cover every percentage and are ordered", () => {
  assert.ok(G.ENDINGS.length >= 4, "there should be several endings");
  assert.equal(G.ENDINGS[G.ENDINGS.length - 1].min, 0, "the last band must catch everything");
  for(let i = 1; i < G.ENDINGS.length; i++){
    assert.ok(G.ENDINGS[i].min < G.ENDINGS[i - 1].min, "ending bands must descend");
  }
  for(const e of G.ENDINGS){
    for(const f of ["rank", "title", "body"]) assert.ok(nonEmpty(e[f]), `an ending is missing ${f}`);
  }
  for(let p = 0; p <= 100; p++){
    assert.ok(G.verdictFor(p), `no ending matches ${p}%`);
  }
  assert.equal(G.verdictFor(100).rank, G.ENDINGS[0].rank);
  assert.equal(G.verdictFor(0).rank, G.ENDINGS[G.ENDINGS.length - 1].rank);
});

test("there is one claim printed per round, in order", () => {
  assert.equal(G.CLAIMS.length, G.ROUNDS.length,
    "the closing table must have one line per round");
  G.CLAIMS.forEach((c, i) => {
    assert.equal(c.n, i + 1);
    assert.ok(c.claim.length > 60, `claim ${c.n} is too short to be a claim`);
  });
});

/* ============================================================================
   THE OPENING SCREEN
   The sibling game was told twice by its first reader that it was not obvious
   how to play. What fixed it was letting them play before they read. These are
   the guards on that.
   ========================================================================== */
test("the opening screen lets you answer something before it asks you to read anything", () => {
  const start = html.indexOf("function showIntro()");
  assert.ok(start > 0, "showIntro must exist");
  const end = html.indexOf("ROUNDS.push(", start);
  assert.ok(end > start, "the rounds must be declared after the opening screen");
  const intro = html.slice(start, end);
  const tryAt = intro.indexOf('class:"tryit"');
  const panelAt = intro.indexOf('class:"panel"');
  assert.ok(tryAt > 0, "the opening screen must carry a try-it card");
  assert.ok(panelAt < 0 || tryAt < panelAt,
    "the try-it card must come before any panel of prose");
});

test("the opening screen is short enough to be read by somebody who is lost", () => {
  const start = html.indexOf("function showIntro()");
  const foldAt = html.indexOf('el("details", { class:"manual" })', start);
  assert.ok(foldAt > start, "everything past the hero must be folded behind one details element");
  const beforeFold = html.slice(start, foldAt);
  const words = beforeFold
    .replace(/<[^>]*>/g, " ")
    .replace(/[^A-Za-z'’ ]+/g, " ")
    .split(/\s+/).filter(w => w.length > 1);
  assert.ok(words.length > 60,
    "the word count anchor matched too little of the intro to mean anything");
  assert.ok(words.length < 460,
    `the intro is ${words.length} words before the fold; a reader who is lost will not read that`);
});

test("the try-it card has exactly one right answer and explains all four", () => {
  assert.equal(G.DEMO.options.length, 4);
  const right = G.DEMO.options.filter(o => o.ok);
  assert.equal(right.length, 1, "exactly one option may be the right one");
  assert.equal(right[0].id, G.DEMO.answer, "DEMO.answer must name the option marked ok");
  for(const o of G.DEMO.options){
    assert.ok(nonEmpty(o.label), "an option has no label");
    assert.ok(o.why && o.why.length > 200,
      `option "${o.label}" is not explained at the depth the others are`);
  }
  /* The half-right option is the teaching one: ringing somebody up is honest
     and is exactly the work an enterprise system exists to remove. */
  assert.ok(G.DEMO.options.some(o => o.partial && !o.ok),
    "one option should be honest-but-wrong rather than simply wrong");
});

/* ============================================================================
   MARKING
   ========================================================================== */
test("a question is marked and locked the moment it is answered", () => {
  assert.match(html, /Questions\.prototype\.mark\s*=/, "there must be a mark() on the Questions runtime");
  const markStart = html.indexOf("Questions.prototype.mark");
  const markEnd = html.indexOf("Questions.prototype.items");
  const mark = html.slice(markStart, markEnd);
  assert.ok(/if\(this\.isAnswered\(key\)\) return;/.test(mark),
    "marking twice must be impossible: the first answer is the one that counts");
  assert.ok(/querySelectorAll\(/.test(mark) && /disabled = true/.test(mark),
    "marking must lock every control inside the card");
  assert.ok(/game\.ledger\.push/.test(mark), "marking must record the item in the ledger");
  assert.ok(/refreshMeters\(\)/.test(mark), "the running score must move as the reader works");
});

test("only the score is in the top bar", () => {
  const bar = html.slice(html.indexOf('<div class="meters"'), html.indexOf("</header>"));
  const meters = [...bar.matchAll(/class="meter"/g)];
  assert.equal(meters.length, 1,
    "cash, trust and integration are consequences, not marks, so only the score belongs up there");
  assert.ok(bar.includes('id="mScore"'));
});

/* ============================================================================
   ACCESSIBILITY AND THE ABSENCE OF DRAG AND DROP
   ========================================================================== */
test("nothing on the page depends on dragging", () => {
  for(const pattern of [/\bdraggable\b/, /"dragstart"/, /"dragover"/, /"drop"/, /"dragend"/,
                        /DataTransfer/, /\.setDragImage\b/]){
    assert.doesNotMatch(html, pattern,
      `${pattern} makes the page unusable on a phone and invisible to a screen reader`);
  }
});

test("every control the reader presses is a real button or has a role and a tab stop", () => {
  /* The chips inside a placed activity are spans, so they carry the role and
     the tabindex by hand. Everything else is a button element. */
  const chip = html.slice(html.indexOf('var chip = el("span"'), html.indexOf("holder.appendChild(chip)"));
  assert.ok(chip.includes('setAttribute("role", "button")'), "a chip must announce itself as a button");
  assert.ok(chip.includes('setAttribute("tabindex"'), "a chip must be reachable by keyboard");
  assert.ok(chip.includes('e.key === "Enter"') && chip.includes('e.key === " "'),
    "a chip must respond to Enter and Space, not only to a click");
});

test("the page still works when localStorage throws", () => {
  /* A private window, or a browser with site data blocked, throws on access
     rather than returning null. Every read and write must be guarded. */
  const accesses = [...html.matchAll(/localStorage\.(getItem|setItem|removeItem)/g)];
  assert.ok(accesses.length >= 4, "expected the theme and the best run to use localStorage");
  for(const m of accesses){
    const around = html.slice(Math.max(0, m.index - 220), m.index + 60);
    assert.ok(/try\s*\{/.test(around),
      `an unguarded localStorage access at index ${m.index} will throw in a private window`);
  }
});

/* ============================================================================
   THE VALUE CHAIN, AS THIS CHAPTER DRAWS IT
   ========================================================================== */
test("five core activities and five support activities, in the chapter's own order", () => {
  assert.deepEqual(G.CHAIN_CORE.map(a => a.id),
    ["inbound", "operations", "outbound", "marketing", "service"]);
  assert.deepEqual(G.CHAIN_SUPPORT.map(a => a.id),
    ["admin", "infra", "hr", "tech", "procure"]);
  for(const a of [...G.CHAIN_CORE, ...G.CHAIN_SUPPORT]){
    assert.ok(nonEmpty(a.name) && nonEmpty(a.short) && nonEmpty(a.detail),
      `${a.id} is not fully described`);
  }
});

test("the page says why this chapter draws ten activities where the original draws nine", () => {
  /* The workshop page elsewhere in this course teaches nine. A reader who has
     met both must not be left thinking one of them is wrong. */
  assert.match(html, /administration/i);
  assert.ok(/1985|original framework|folds? administration/i.test(html),
    "somewhere on the page must reconcile the five support activities with the original four");
});

/* ============================================================================
   ROUND 1 — THE ORDER, RECOMPUTED
   ========================================================================== */
test("the correct order-to-cash sequence breaks no rule and costs nothing", () => {
  assert.deepEqual(G.O2C_ORDER, ["cust","credit","order","alloc","ship","invoice","collect"]);
  assert.deepEqual(G.o2cViolations(G.O2C_ORDER), []);
  assert.deepEqual(G.o2cStrays(G.O2C_ORDER), []);
  assert.deepEqual(G.o2cMissing(G.O2C_ORDER), []);
  assert.equal(G.o2cCost(G.O2C_ORDER), 0);
});

test("every ordering rule can actually be broken, and each one costs something", () => {
  for(const rule of G.O2C_RULES){
    assert.ok(G.O2C_ORDER.indexOf(rule.before) < G.O2C_ORDER.indexOf(rule.after),
      `rule ${rule.id} is not a constraint the right answer satisfies`);
    const swapped = G.O2C_ORDER.slice();
    const a = swapped.indexOf(rule.before), b = swapped.indexOf(rule.after);
    swapped[a] = rule.after; swapped[b] = rule.before;
    const broken = G.o2cViolations(swapped).map(r => r.id);
    assert.ok(broken.includes(rule.id), `swapping ${rule.before} and ${rule.after} does not break ${rule.id}`);
    assert.ok(rule.cost > 0, `rule ${rule.id} costs nothing, so breaking it teaches nothing`);
    assert.ok(rule.what.length > 80, `rule ${rule.id} does not say what actually goes wrong`);
  }
});

test("the cost of a sequence is the sum of what it broke, recomputed independently", () => {
  const cases = [
    ["ship","cust","credit","order","alloc","invoice","collect"],
    ["collect","invoice","ship","alloc","order","credit","cust"],
    ["cust","credit","order","po","alloc","ship","invoice"],
    ["cust","order","credit","alloc","ship","invoice","collect"]
  ];
  for(const seq of cases){
    let expected = 0;
    const pos = {};
    seq.forEach((id, i) => { pos[id] = i; });
    for(const rule of G.O2C_RULES){
      if(pos[rule.before] == null || pos[rule.after] == null) continue;
      if(pos[rule.before] > pos[rule.after]) expected += rule.cost;
    }
    const strays = seq.filter(id => G.O2C_ORDER.indexOf(id) < 0);
    expected += strays.length * 2600;
    assert.equal(G.o2cCost(seq), expected, `cost of ${seq.join(">")} does not recompute`);
  }
});

test("the two silent faults are reachable and only from the sequence that causes them", () => {
  const flagged = G.O2C_RULES.filter(r => r.flag);
  assert.equal(flagged.length, 2, "two faults should set a flag that detonates in a later round");
  const ids = flagged.map(r => r.flag).sort();
  assert.deepEqual(ids, ["duplicateCustomer", "phantomStock"]);
  /* Neither may fire on the right answer. */
  for(const rule of flagged){
    assert.ok(!G.o2cViolations(G.O2C_ORDER).some(r => r.flag === rule.flag),
      `${rule.flag} fires even when the reader is right`);
  }
});

test("the two spare cards are the chapter's procure-to-pay steps and nothing else", () => {
  assert.equal(G.P2P_DECOYS.length, 2);
  const labels = G.P2P_DECOYS.map(d => d.label.toLowerCase());
  assert.ok(labels.some(l => l.includes("purchase order")));
  assert.ok(labels.some(l => l.includes("receive the goods")));
  for(const d of G.P2P_DECOYS){
    assert.ok(G.O2C_ORDER.indexOf(d.id) < 0, "a decoy must not be part of the right answer");
  }
});

/* ============================================================================
   ROUND 5 — THE SUPPLY CHAIN, RECOMPUTED FROM THE PRINTED RULE
   ========================================================================== */
const WHIP_DEMAND = [100,100,100,100,110,110,110,110,100,100,118,100];

function refWhip(demand, ks, shared){
  /* An independent implementation of the rule the page prints, written from
     the rule rather than from the page's code. */
  const series = [];
  let incoming = demand.slice();
  for(let i = 0; i < ks.length; i++){
    const out = [];
    for(let t = 0; t < demand.length; t++){
      const prev = t ? incoming[t - 1] : incoming[0];
      const delta = shared[i] ? (t ? demand[t] - demand[t - 1] : 0) : (incoming[t] - prev);
      out.push(Math.max(0, Math.round((incoming[t] + ks[i] * delta) * 10) / 10));
    }
    series.push(out);
    incoming = out;
  }
  return series;
}

test("the supply chain rule is the one printed on the page", () => {
  const cases = [
    { ks:[1.4,1.4,1.4,1.4], shared:[false,false,false,false] },
    { ks:[1.4,1.4,1.4,1.4], shared:[true,true,true,true] },
    { ks:[0.3,0.3,0.3,0.3], shared:[true,true,true,true] },
    { ks:[0.5,0.5,0.5,0.5], shared:[false,false,false,false] },
    { ks:[0.0,0.9,1.7,0.2], shared:[false,true,false,true] }
  ];
  for(const c of cases){
    const run = G.whipRun(WHIP_DEMAND, c.ks, c.shared);
    assert.deepEqual(run.series, refWhip(WHIP_DEMAND, c.ks, c.shared),
      `the chain does not follow its own rule at k=${c.ks.join(",")}`);
  }
});

test("a cautious safety stock is what produces the whip, and sharing the demand signal damps it", () => {
  const cautious = G.whipRun(WHIP_DEMAND, [1.4,1.4,1.4,1.4], [false,false,false,false]);
  const shared = G.whipRun(WHIP_DEMAND, [1.4,1.4,1.4,1.4], [true,true,true,true]);
  const both = G.whipRun(WHIP_DEMAND, [0.3,0.3,0.3,0.3], [true,true,true,true]);

  assert.equal(G.whipPeak(cautious, 3), 512.9);
  assert.equal(G.whipAmplification(cautious, 100), 412.9);
  assert.equal(G.whipPeak(shared, 3), 218.8);
  assert.equal(G.whipAmplification(shared, 100), 118.8);
  assert.equal(G.whipPeak(both, 3), 139.6);
  assert.equal(G.whipAmplification(both, 100), 39.6);

  /* The lesson only holds if neither lever works on its own. */
  assert.ok(G.whipAmplification(shared, 100) > 100,
    "sharing alone must not be enough, or the round has one lever instead of two");
  assert.ok(G.whipAmplification(both, 100) < G.whipAmplification(shared, 100) / 2,
    "the two together must be dramatically better than either alone");

  /* A 10 per cent blip at the shelf: the far tier's swing is several times it. */
  const blip = (Math.max(...WHIP_DEMAND) - 100) / 100;
  assert.equal(Math.round(blip * 100), 18, "the demand series peaks 18 per cent above steady");
  assert.ok(G.whipAmplification(cautious, 100) / (blip * 100) > 20,
    "the amplification is not dramatic enough to be worth a round");
});

test("the whip's zero weeks are real, not a rounding artefact", () => {
  const run = G.whipRun(WHIP_DEMAND, [1.4,1.4,1.4,1.4], [false,false,false,false]);
  const far = run.series[3];
  const zeros = far.filter(v => v === 0).length;
  assert.ok(zeros >= 2,
    "the far tier should be told to ship nothing in at least two weeks, which is the sight the round is for");
  /* And customers never stopped buying. */
  assert.ok(Math.min(...WHIP_DEMAND) >= 85, "demand at the shelf never collapses");
});

test("carrying stock and running out are both priced, and both can win", () => {
  const cheap = G.whipRun(WHIP_DEMAND, [0.1,0.1,0.1,0.1], [true,true,true,true]);
  const safe = G.whipRun(WHIP_DEMAND, [1.4,1.4,1.4,1.4], [true,true,true,true]);
  const cheapCost = G.whipCost(cheap, [0.1,0.1,0.1,0.1], 100, 34, 41000, 12);
  const safeCost = G.whipCost(safe, [1.4,1.4,1.4,1.4], 100, 34, 41000, 12);
  assert.ok(cheapCost.carry < safeCost.carry, "holding less must cost less to hold");
  assert.ok(cheapCost.short > safeCost.short, "holding less must risk more");
  assert.equal(safeCost.carry, Math.round(1.4 * 100 * 34 * 12 * 4));
});

/* ============================================================================
   TELLING THE READER WHAT TO PRESS

   The sibling game was told twice by its first reader that it was not obvious
   how to play, and the fix that failed was adding prose. This one was told the
   same thing once. These guard the things that replaced the prose: an
   instruction next to the control it is about, a page that visibly changes
   when something is in hand, and one bar that always names the next press.
   ========================================================================== */
test("a bar along the bottom always names the next press, and hides outside a round", () => {
  assert.match(html, /id="nextBar"/, "there must be a next-press bar in the chrome");
  assert.match(html, /function nextAction\(\)/, "and something that works out what that press is");
  /* It must be driven from the one place every round already reports to, so a
     round cannot forget to update it. */
  const ec = html.slice(html.indexOf("function enableCommit("), html.indexOf("function nextAction("));
  assert.match(ec, /refreshNext\(/, "enableCommit must drive the bar");
  /* And it must go away when there is no round in progress. */
  const cs = html.slice(html.indexOf("function clearStage()"), html.indexOf("function clearStage()") + 400);
  assert.match(cs, /nextBar/, "clearing the stage must hide the bar");
});

test("the next press is worked out by reading the page in the order it is read", () => {
  const fn = html.slice(html.indexOf("function nextAction()"), html.indexOf("function refreshNext("));
  assert.match(fn, /flowstep\.held/, "something in hand must win over everything else");
  assert.match(fn, /querySelectorAll\(["']\.qcard["']\)/,
    "it must walk the questions rather than guess which board comes first");
  assert.match(fn, /\.seq/, "a sequence board needs its own wording");
  assert.match(fn, /data-hint/, "a question may carry its own wording for a control the page cannot read");
  /* Following the DOM is the whole point: a round whose first question sits
     above its tray must not be told to go to the tray. */
  const qcardAt = fn.indexOf('querySelectorAll(".qcard")');
  const trayAt = fn.indexOf('.flowline');
  assert.ok(qcardAt > 0 && trayAt > qcardAt,
    "the tray must be looked for inside a question, not before the questions");
});

test("every tray says what to do with it, right above the tray", () => {
  /* The instruction used to live in a list at the top of the round, four
     screens from the cards it was about. */
  const ab = html.slice(html.indexOf("function assignBoard("), html.indexOf("function renderChainBoard"));
  assert.match(ab, /class:"traybar"/, "a board must put a strip above its own tray");
  assert.match(ab, /insertBefore\(bar, opts\.tray\)/, "and that strip goes above the tray, not below it");
  assert.match(ab, /function say\(\)/, "the strip must restate itself as the state changes");
  assert.match(ab, /Holding/, "and say what is in hand while something is");
  /* Every round that uses a board gives it wording of its own, so the second
     press is named in that round's terms. */
  const prompts = [...html.matchAll(/placePrompt:\s*"([^"]+)"/g)].map(m => m[1]);
  assert.ok(prompts.length >= 4, `only ${prompts.length} boards name their destination`);
  assert.equal(new Set(prompts).size, prompts.length, "each board should name its own destination");
});

test("the page visibly changes when a card is in hand", () => {
  const ab = html.slice(html.indexOf("function assignBoard("), html.indexOf("function renderChainBoard"));
  assert.match(ab, /function arm\(/, "every destination must light up while a card is held");
  assert.match(ab, /bin-armed/, "with a class the stylesheet can see");
  assert.match(html, /\.bin-armed\{/, "and the stylesheet must actually style it");
  /* The animation is a cue, not a requirement: it has to be off for anyone who
     has asked for less motion. */
  const rm = html.slice(html.indexOf("@media (prefers-reduced-motion:reduce)"));
  assert.ok(/animation:\s*none/.test(rm), "the pulse must be off under reduced motion");
});

test("one word for marking one question, everywhere", () => {
  /* Four rounds used four different verbs for the same gesture, which is four
     things to learn instead of one. */
  for(const stale of ["Settle the wiring", "Lock these settings in", "Put this budget to the board",
                      "Lock in this plan"]){
    assert.ok(!html.includes('"' + stale + '"'),
      `"${stale}" is a fifth name for pressing the same kind of button`);
  }
  const marks = [...html.matchAll(/"Mark this answer"/g)];
  assert.ok(marks.length >= 4, "the in-question commit buttons should share one label");
  assert.match(html, /"Submit my answers"/, "and the round-level button keeps its own");
});

test("each question says which one of how many it is", () => {
  assert.match(html, /function numberQuestions\(/, "the questions must be numbered");
  assert.match(html, /Question " \+ \(i \+ 1\) \+ " of "/, "as one of a known total");
  assert.match(html, /qnum done/, "and grow a tick when answered");
  assert.ok(/\.qnum\.done::after\{content:/.test(html), "which the stylesheet draws");
});

test("the instructions at the top of a round are short enough to be read", () => {
  /* They are no longer the only thing telling the reader what to do, so they
     do not have to carry everything. Three lines is the budget. */
  for(const m of G.ROUNDS){
    assert.ok(m.howTo.length <= 3,
      `round ${m.round} has ${m.howTo.length} instruction lines; the bar carries the rest`);
    for(const line of m.howTo){
      const words = line.replace(/<[^>]*>/g, "").split(/\s+/).filter(Boolean).length;
      assert.ok(words <= 32, `a how-to line in round ${m.round} runs to ${words} words`);
    }
  }
});

test("a reader who wants to press something first can skip the briefing", () => {
  assert.match(html, /class:"jump"/, "the round header needs a way past the fiction");
  assert.match(html, /Start pressing/, "and it should say what it is for");
});

test("the gesture four rounds depend on is rehearsed before any of them", () => {
  /* Press a card, press a place. It is obvious once done and opaque until
     then, so the opening screen has the reader do it once for no marks. */
  assert.match(html, /function showGesture\(/, "the opening screen must rehearse the gesture");
  assert.ok(G.GESTURE && Array.isArray(G.GESTURE.cards) && Array.isArray(G.GESTURE.bins),
    "the rehearsal needs cards and places");
  assert.equal(G.GESTURE.cards.length, 2, "two cards is enough to show the gesture");
  assert.equal(G.GESTURE.bins.length, 2);
  for(const c of G.GESTURE.cards){
    assert.ok(G.GESTURE.bins.some(b => b.id === c.where),
      `${c.id} has nowhere correct to go`);
  }
  /* It uses the same component the real rounds use, so what is rehearsed is
     what happens. */
  const g = html.slice(html.indexOf("function showGesture()"), html.indexOf("function showIntro()"));
  assert.match(g, /assignBoard\(/, "the rehearsal must be the real board, not a mock-up");
  assert.ok(/marks|counts|nothing counts/i.test(g), "and must say that nothing here is scored");
});

/* ============================================================================
   THE REPAIR CYCLE

   An external review's central criticism was that a first-answer-counts page
   marks what the reader knew BEFORE the teaching, and leaves the explanation
   with no job. A question may now carry a second instance of the same idea,
   built only when the first answer was wrong. These are the guards on it.
   ========================================================================== */
test("the runtime opens a repair only on a wrong answer, and only once", () => {
  const mark = html.slice(html.indexOf("Questions.prototype.mark"),
                          html.indexOf("Questions.prototype.openRepair"));
  assert.match(mark, /it\.points < it\.max && spec\.repair/,
    "a repair must open only when the answer did not earn full marks");
  const open = html.slice(html.indexOf("Questions.prototype.openRepair"),
                          html.indexOf("Questions.prototype.resolveRepair"));
  assert.match(open, /if\(!spec \|\| !spec\.repair \|\| spec\.repairOpen\) return;/,
    "opening twice must be impossible");
  const res = html.slice(html.indexOf("Questions.prototype.resolveRepair"),
                         html.indexOf("Questions.prototype.repairPending"));
  assert.match(res, /if\(!spec \|\| spec\.repairDone\) return;/,
    "resolving twice must be impossible, or a repair double-scores");
});

test("a repair recovers all but one point, and never more than full marks", () => {
  const res = html.slice(html.indexOf("Questions.prototype.resolveRepair"),
                         html.indexOf("Questions.prototype.repairPending"));
  assert.match(res, /Math\.max\(before, Math\.max\(1, it\.max - 1\)\)/,
    "the recovery must be max-1, floored at 1, and never below what the first answer earned");
  assert.match(res, /entry\.points = after/,
    "the ledger row already pushed must be revised, not a second row added");
  assert.match(res, /refreshMeters\(\)/, "the running score must move when a repair lands");
});

test("a round cannot be submitted while a repair is unanswered", () => {
  const ec = html.slice(html.indexOf("function enableCommit("), html.indexOf("function nextAction("));
  assert.match(ec, /repairPending\(\)/,
    "the commit gate must be central, so no round can forget it");
  assert.match(html, /Questions\.prototype\.repairPending/, "and that check must exist");
});

test("every round has exactly one repair, on a question worth having one", () => {
  /* One per round: enough that the mechanic is the page's habit rather than a
     special case, few enough that a struggling reader is not buried. */
  const starts = [...html.matchAll(/ROUNDS\.push\(\{/g)].map(m => m.index);
  assert.equal(starts.length, 7);
  let total = 0;
  for(let i = 0; i < starts.length; i++){
    const chunk = html.slice(starts[i], starts[i + 1] || html.length);
    const repairs = [...chunk.matchAll(/\bbuild:\s*function\s*\(\s*host\s*,\s*done\s*\)/g)];
    assert.equal(repairs.length, 1,
      `round ${i + 1} declares ${repairs.length} repairs; one per round is the design`);
    total += repairs.length;
    /* and it must be attached to a question rather than floating */
    assert.match(chunk, /lead:\s*"/, `round ${i + 1}'s repair has no framing line`);
  }
  assert.equal(total, 7);
});

test("every repair resolves itself on every path", () => {
  /* A repair that never calls done() locks the round forever, because the
     commit is gated on it. One that calls done() twice double-scores. */
  const starts = [...html.matchAll(/build:\s*function\s*\(\s*host\s*,\s*done\s*\)/g)].map(m => m.index);
  assert.equal(starts.length, 7);
  for(let i = 0; i < starts.length; i++){
    const chunk = html.slice(starts[i], starts[i + 1] || html.length);
    const calls = [...chunk.matchAll(/\bdone\s*\(/g)];
    assert.ok(calls.length >= 1, "a repair that never calls done() locks the round");
    assert.ok(calls.length <= 4,
      "several done() calls is a sign of a branch that can fire twice; check it by hand");
  }
});

test("a repair is a different instance, not the same question again", () => {
  /* The cheap failure is to re-ask the question. Note that reusing the option
     SET is often right — "vanilla, configure or customize" applied to a fourth
     module is a new case, not a repeat — so what has to be new is the
     SITUATION the reader is reasoning about. */
  const starts = [...html.matchAll(/ROUNDS\.push\(\{/g)].map(m => m.index);
  for(let i = 0; i < starts.length; i++){
    const chunk = html.slice(starts[i], starts[i + 1] || html.length);
    const at = chunk.search(/build:\s*function\s*\(\s*host\s*,\s*done\s*\)/);
    assert.ok(at > 0, `round ${i + 1} has no repair`);
    /* A repair is the fifth argument of one q.register call, so it ends where
       the next question begins. Slicing to the end of the round instead would
       let the round's LATER questions supply the "new" wording and the check
       would pass without reading the repair at all. */
    const ends = chunk.indexOf("q.register(", at);
    const before = chunk.slice(0, at);
    const repair = chunk.slice(at, ends > at ? ends : chunk.length);

    /* the new situation: the longest string literals the repair introduces */
    const strings = [...repair.matchAll(/"([^"\\]{40,})"/g)].map(m => m[1]);
    assert.ok(strings.length >= 2,
      `round ${i + 1}'s repair does not describe a new situation at any length`);
    const fresh = strings.filter(t => !before.includes(t));
    assert.ok(fresh.length >= 2,
      `round ${i + 1}'s repair reuses its parent's wording rather than posing a new case`);

    /* and it has to teach, not just mark */
    assert.ok(/why/.test(repair) || /done\(/.test(repair),
      `round ${i + 1}'s repair returns no explanation`);
  }
});

test("the second buyer asks for more than the screen shows, on either branch", () => {
  /* The repair flips the staleness, so the figure on the screen is 21 on one
     branch and 26 on the other. If what the buyer asks for equals either of
     them, "confirm all of it" and "confirm what the screen shows" collapse
     into one answer and the option set no longer has a single right answer. */
  const shown = [0, G.R4_REPAIR_LATENCY].map(lat => G.r4Displayed(lat, 0));
  assert.deepEqual(shown, [21, 26], "the two branches still show these figures");
  for(const s of shown){
    assert.ok(G.R4_REPAIR_WANTED > s,
      `the second buyer asks for ${G.R4_REPAIR_WANTED}, which does not exceed the ${s} on screen`);
  }
});

test("the repair panel explains itself and says what it is for", () => {
  const open = prose.slice(prose.indexOf("Questions.prototype.openRepair"),
                           prose.indexOf("Questions.prototype.resolveRepair"));
  assert.match(open, /Put it right/, "the panel needs a label saying what it is");
  assert.match(open, /take back all but one/, "and must say what getting it right is worth");
  const res = prose.slice(prose.indexOf("Questions.prototype.resolveRepair"),
                          prose.indexOf("Questions.prototype.repairPending"));
  assert.match(res, /did not know that when you arrived/,
    "a recovered question should say plainly what the mark now means");
});
/* ============================================================================
   ROUND 2 — THE CHAIN AND THE CROSSINGS, RECOMPUTED

   Every figure the wiring panel prints is recomputed here from the crossing
   table and the two rates, and the "best under the cap" claim is checked by
   brute force over all 729 wirings rather than taken on trust.
   ========================================================================== */
test("every system has one home on the value chain, and two activities are deliberately empty", () => {
  assert.equal(G.SYSTEMS.length, 8, "eight departmental systems");
  const homes = G.SYSTEMS.map(s => s.activity);
  assert.equal(new Set(homes).size, 8, "no two systems may serve the same activity");
  for(const s of G.SYSTEMS){
    assert.ok(G.chainActivity(s.activity), `${s.id} is placed on ${s.activity}, which is not an activity`);
    assert.ok(nonEmpty(s.does) && nonEmpty(s.dept), `${s.id} is not described`);
  }
  /* Three of the eight are support activities, which is what makes the board
     worth playing: procurement is not inbound logistics. */
  const support = homes.filter(h => !G.isCoreActivity(h));
  assert.equal(support.length, 3, "three of the eight should sit on support activities");
  assert.ok(support.includes("procure"), "the purchasing system belongs to procurement, not inbound logistics");
  const empty = G.CHAIN_ALL.map(a => a.id).filter(id => homes.indexOf(id) < 0);
  assert.deepEqual(empty.sort(), ["infra", "tech"],
    "firm infrastructure and technology development are the two that take no application");
});

test("the tray holds every system exactly once and is not the answer order", () => {
  assert.equal(G.SYSTEM_TRAY.length, G.SYSTEMS.length);
  assert.deepEqual([...G.SYSTEM_TRAY].sort(), G.SYSTEMS.map(s => s.id).sort());
  const answerOrder = G.CHAIN_ALL.map(a => G.SYSTEMS.find(s => s.activity === a.id))
    .filter(Boolean).map(s => s.id);
  assert.notDeepEqual(G.SYSTEM_TRAY, answerOrder, "the tray must not be laid out in the answer's order");
});

test("the biggest activity is not the one worth attacking", () => {
  let biggest = null, mostAvoidable = null;
  for(const id of Object.keys(G.CHAIN_COSTS)){
    if(!biggest || G.CHAIN_COSTS[id].annual > G.CHAIN_COSTS[biggest].annual) biggest = id;
    if(!mostAvoidable || G.CHAIN_COSTS[id].avoidable > G.CHAIN_COSTS[mostAvoidable].avoidable) mostAvoidable = id;
  }
  assert.notEqual(biggest, mostAvoidable,
    "if the largest cost were also the most avoidable, the exhibit would teach the wrong reflex");
  const share = G.CHAIN_COSTS[biggest].avoidable / G.CHAIN_COSTS[biggest].annual;
  assert.ok(share < 0.02, "the biggest activity should carry almost none of the avoidable cost");
});

function refCrossingAnnual(c, mode, rates, errorCost, days){
  const n = c.perDay * days;
  return n * c[mode] + n * rates[mode] * errorCost;
}

test("the annual cost of a crossing is its records times its rate plus its mistakes", () => {
  for(const c of G.CROSSINGS){
    for(const mode of ["rekey", "file", "live"]){
      assert.ok(close(G.wireAnnual(c, mode),
        refCrossingAnnual(c, mode, G.WIRE_ERRORS, G.WIRE_ERROR_COST, G.WIRE_DAYS), 1e-6),
        `${c.id} on ${mode} does not recompute`);
    }
    assert.ok(G.wireAnnual(c, "rekey") > G.wireAnnual(c, "file"),
      `${c.id} should be dearer to re-key than to send as a file`);
    assert.ok(G.wireAnnual(c, "file") > G.wireAnnual(c, "live"),
      `${c.id} should be dearer as a file than as a live link`);
  }
});

test("today's bill, the free answer, and the answer the cap will not buy", () => {
  assert.equal(Math.round(G.wireBill(G.wireAllOn("rekey"))), 368602);
  assert.equal(Math.round(G.wireBill(G.wireAllOn("file"))), 111549);
  assert.equal(Math.round(G.wireBill(G.wireAllOn("live"))), 5618);
  assert.equal(G.wireCapital(G.wireAllOn("rekey")), 0);
  assert.equal(G.wireCapital(G.wireAllOn("file")), 0);
  assert.ok(G.wireCapital(G.wireAllOn("live")) > G.WIRE_CAP,
    "wiring everything live must be out of reach, or the round has no decision in it");
  assert.equal(G.wireCapital(G.wireAllOn("live")), 530000);
});

test("no live link pays for itself quickly, which is the round's actual lesson", () => {
  /* If any crossing paid back inside a year the honest answer would simply be
     "wire everything", and the point — that the spreadsheet has no column for
     how old a number is or which fields a person does not copy — would be
     lost. */
  for(const c of G.CROSSINGS){
    const years = G.wirePayback(c);
    assert.ok(years > 3, `${c.id} pays back in ${years.toFixed(2)} years, which makes the choice obvious`);
    assert.ok(years < 10, `${c.id} pays back in ${years.toFixed(2)} years, which makes it absurd`);
  }
  const range = G.wirePaybackRange();
  assert.ok(close(range.lo, Math.min(...G.CROSSINGS.map(c => G.wirePayback(c))), 1e-9));
  assert.ok(close(range.hi, Math.max(...G.CROSSINGS.map(c => G.wirePayback(c))), 1e-9));
});

test("the best wiring under the cap is the one the marking rewards, found by brute force", () => {
  const modes = ["rekey", "file", "live"];
  let best = null;
  const n = G.CROSSINGS.length;
  const total = Math.pow(3, n);
  for(let code = 0; code < total; code++){
    const pick = {};
    let c = code;
    for(let i = 0; i < n; i++){ pick[G.CROSSINGS[i].id] = modes[c % 3]; c = Math.floor(c / 3); }
    if(G.wireCapital(pick) > G.WIRE_CAP) continue;
    const bill = G.wireBill(pick);
    if(!best || bill < best.bill) best = { pick, bill, capital: G.wireCapital(pick) };
  }
  assert.equal(Math.round(best.bill), 49388, "the cheapest wiring the cap allows");
  assert.equal(best.capital, 268000);
  const live = Object.keys(best.pick).filter(k => best.pick[k] === "live").sort();
  assert.deepEqual(live, ["buy-yard", "plant-tail", "tail-quote"]);
  assert.equal(G.wireScore(best.pick), 4, "the cheapest allowed wiring must score full marks");
  assert.equal(G.wireScore(G.wireAllOn("rekey")), 0, "changing nothing must score nothing");
  assert.ok(G.wireScore(G.wireAllOn("file")) >= 2,
    "the free answer is a good answer and must be marked as one");
});

test("the two crossings that decide a later round do so for a stated reason", () => {
  /* Latency comes from the crossing that carries what shipped back to the
     order desk. A person re-typing does it inside the shift; a nightly file
     waits for the night; a live link is current. */
  assert.deepEqual(Object.keys(G.WIRE_LATENCY).sort(), ["file", "live", "rekey"]);
  assert.equal(G.WIRE_LATENCY.live, 0);
  assert.ok(G.WIRE_LATENCY.rekey > 0 && G.WIRE_LATENCY.rekey < G.WIRE_LATENCY.file,
    "re-keying is quicker than waiting for a nightly file, and that is the counter-intuitive part");
  assert.ok(G.crossingById("tail-quote"), "the crossing that sets the stock figure's age must exist");
  assert.ok(G.crossingById("plant-case"), "the crossing that carries the build record must exist");
});

/* ============================================================================
   ROUND 3 — THE FIVE-YEAR BILL, RECOMPUTED
   ========================================================================== */
test("a customized module is charged for every release it has to be re-done for", () => {
  assert.equal(G.erpReprogramPerRelease(), Math.round(G.ERP_CUSTOMIZE_BUILD * G.ERP_REPROGRAM_SHARE));
  assert.equal(G.erpCustomizeFiveYear(),
    G.ERP_CUSTOMIZE_BUILD + G.ERP_RELEASES * G.erpReprogramPerRelease());
  assert.equal(G.erpCustomizeFiveYear(), 504000);
  assert.equal(G.erpConfigureFiveYear(), G.ERP_CONFIG_DAYS * G.ERP_CONFIG_RATE);
  assert.equal(G.erpConfigureFiveYear(), 65250);
  assert.ok(G.erpCustomizeFiveYear() > G.erpConfigureFiveYear() * 5,
    "customizing must be dramatically dearer than configuring, which is the chapter's warning");
  assert.equal(G.erpModeFiveYear("vanilla"), 0);
});

test("the module worth customizing is the one the firm wins on, and only that one", () => {
  const ids = G.ERP_MODULES.map(m => m.id);
  assert.equal(ids.length, 3);
  const all = mode => { const o = {}; ids.forEach(id => { o[id] = mode; }); return o; };
  const right = { config:"customize", month:"configure", warranty:"configure" };
  assert.equal(G.erpCustomScore(right), 4, "customizing the differentiator and configuring the rest is the answer");
  assert.ok(G.erpCustomScore(all("configure")) < 4,
    "configuring everything gives away the thing the firm is better at");
  assert.ok(G.erpCustomScore(all("vanilla")) < G.erpCustomScore(all("configure")),
    "vanilla everywhere should mark below configuring everywhere");
  assert.equal(G.erpCustomScore({ config:"configure", month:"customize", warranty:"configure" }), 0,
    "paying to change an ordinary process while leaving the differentiator alone is the worst call");
  /* And the money must not settle it: the two serious answers have to be close
     enough that the competitive question is what decides. */
  assert.ok(G.erpFiveYearTotal(right) > G.erpFiveYearTotal(all("configure")),
    "the right answer is not the cheap one");
});

test("a heavily customized estate is the one that cannot take an update", () => {
  assert.equal(G.erpPatchable({ config:"vanilla", month:"vanilla", warranty:"vanilla" }), true);
  assert.equal(G.erpPatchable({ config:"customize", month:"configure", warranty:"configure" }), true);
  assert.equal(G.erpPatchable({ config:"customize", month:"customize", warranty:"configure" }), false);
  assert.equal(G.erpPatchable({ config:"customize", month:"customize", warranty:"customize" }), false);
});

test("four of the eight budget lines belong in a total cost of ownership and four do not", () => {
  const belongs = G.ERP_TCO_LINES.filter(l => l.belongs);
  assert.equal(belongs.length, 4, "the chapter names exactly four overlooked costs");
  assert.equal(G.ERP_TCO_LINES.length - belongs.length, 4, "and there should be four decoys");
  for(const l of G.ERP_TCO_LINES){
    assert.ok(nonEmpty(l.title), "a budget line has no title");
    assert.ok(nonEmpty(l.note), `the line "${l.title}" does not say why it does or does not belong`);
  }
  const ids = belongs.map(l => l.id).sort();
  assert.deepEqual(ids, ["govern", "ongoing", "study", "training"]);
  /* Marking: exactly the four scores four, and every miss or false positive
     costs one. */
  const on = {}; belongs.forEach(l => { on[l.id] = true; });
  assert.equal(G.erpTcoScore(on), 4);
  const plusOne = Object.assign({}, on); plusOne[G.ERP_TCO_LINES.find(l => !l.belongs).id] = true;
  assert.equal(G.erpTcoScore(plusOne), 3);
  assert.equal(G.erpTcoScore({}), 0);
});

test("the lines nobody quoted are a large fraction of the quote, computed rather than asserted", () => {
  const vanilla = { config:"vanilla", month:"vanilla", warranty:"vanilla" };
  const right = { config:"customize", month:"configure", warranty:"configure" };
  const worst = { config:"customize", month:"customize", warranty:"customize" };
  assert.equal(G.erpQuoteTotal(), 1600000);
  assert.equal(G.erpForgotten(vanilla), 780000);
  assert.equal(G.erpForgottenPct(vanilla), 49);
  assert.equal(G.erpForgotten(right), 780000 + G.erpCustomizeFiveYear());
  assert.equal(G.erpForgottenPct(worst), 143);
  assert.ok(G.erpForgottenPct(vanilla) >= 40,
    "even with nothing customized the overlooked lines must be worth noticing");
});

test("the year-one bill is payable out of what the board gave you, and can also break the budget", () => {
  const cheapest = G.erpYear1({ config:"vanilla", month:"vanilla", warranty:"vanilla" }, false);
  const dearest = G.erpYear1({ config:"customize", month:"customize", warranty:"customize" }, true);
  assert.ok(cheapest < G.START.cash, "the cheapest way through must be affordable");
  assert.ok(dearest < G.START.cash, "even the dearest single round must not bankrupt the run on its own");
  assert.ok(dearest > cheapest * 1.2, "the choices must be worth real money");
});

/* ============================================================================
   ROUND 4 — THE PROMISE DESK
   ========================================================================== */
test("available to promise is on hand minus what is already spoken for", () => {
  assert.equal(G.r4TrueAvailable(), G.R4_ON_HAND - G.R4_ALLOCATED);
  assert.ok(G.R4_ON_HAND > G.r4TrueAvailable(),
    "the point of the round is that the two numbers differ");
  assert.equal(G.r4Drift(0), 0, "a live figure has not drifted");
  assert.ok(G.r4Drift(20) > G.r4Drift(6), "a staler figure has drifted further");
});

test("what the screen shows is the truth plus the reader's own two mistakes", () => {
  assert.equal(G.r4Displayed(0, 0), G.r4TrueAvailable(), "wired live and run cleanly, the screen is the truth");
  assert.equal(G.r4Stale(0, 0), false);
  for(const [lat, ph] of [[6,0],[20,0],[0,14],[20,14]]){
    assert.ok(G.r4Displayed(lat, ph) > G.r4TrueAvailable(),
      `latency ${lat} phantom ${ph} must overstate what is available`);
    assert.equal(G.r4Stale(lat, ph), true);
  }
  /* The worst case is the one a reader reaches by making both earlier
     mistakes, and it has to be bad enough to be worth the round. */
  assert.ok(G.r4Displayed(20, 14) >= 40,
    "with a nightly file and a phantom allocation the screen must invite the whole order");
});

test("the right answer at the promise desk changes with the reader's own wiring", () => {
  const live = ["a","b","c","d"].map(id => G.r4PromisePoints(id, false));
  const stale = ["a","b","c","d"].map(id => G.r4PromisePoints(id, true));
  assert.equal(Math.max(...live), 4);
  assert.equal(Math.max(...stale), 4);
  assert.equal(live.indexOf(4), 1, "with a current figure, confirming what the screen shows is right");
  assert.equal(stale.indexOf(4), 2, "with a stale figure, stopping to count is right");
  assert.notEqual(live.indexOf(4), stale.indexOf(4),
    "if the same option were right either way the round would not be about the wiring");
  /* Exactly one full-mark answer in each state. */
  assert.equal(live.filter(p => p === 4).length, 1);
  assert.equal(stale.filter(p => p === 4).length, 1);
  assert.equal(G.r4PromisePoints("a", false), 0, "promising the whole order is never right");
  assert.equal(G.r4PromisePoints("a", true), 0);
});

test("promising more than exists costs money in proportion to the overreach", () => {
  const displayed = G.r4Displayed(20, 14);
  assert.equal(G.r4Shortfall("a", displayed), 40 - G.r4TrueAvailable());
  assert.equal(G.r4Shortfall("b", displayed), displayed - G.r4TrueAvailable());
  assert.equal(G.r4Shortfall("c", displayed), 0);
  assert.equal(G.r4Shortfall("d", displayed), 0);
  assert.equal(G.r4Shortfall("b", G.r4Displayed(0, 0)), 0, "a clean run promises nothing that does not exist");
  assert.ok(G.r4ShortCost(1) > 0);
  assert.equal(G.r4ShortCost(3), 3 * G.r4ShortCost(1));
});

/* ============================================================================
   ROUND 6 — THE FLOWS AND THE RECALL
   ========================================================================== */
test("ten movements, three flows, and two of them run backwards", () => {
  assert.equal(G.R6_CARDS.length, 10);
  const byFlow = {};
  for(const c of G.R6_CARDS){
    assert.ok(G.r6Flow(c.flow), `${c.id} is filed under ${c.flow}, which is not a flow`);
    byFlow[c.flow] = (byFlow[c.flow] || 0) + 1;
    assert.ok(nonEmpty(c.label), `${c.id} has no description`);
    assert.ok(nonEmpty(c.short), `${c.id} does not explain itself`);
  }
  for(const f of G.R6_FLOWS){
    assert.ok(byFlow[f.id] >= 2, `${f.id} carries only ${byFlow[f.id] || 0} cards`);
  }
  const reverse = G.R6_CARDS.filter(c => c.back);
  assert.equal(reverse.length, 2, "two cards should be reverse logistics");
  for(const c of reverse) assert.equal(c.flow, "product", "reverse logistics is a product flow");
});

test("the recall is priced per cabinet and the register agrees with itself", () => {
  assert.equal(G.r6PerCabinet(), G.R6_PER_UNIT + G.R6_GOODWILL);
  assert.equal(G.R6_REG.length, 240);
  const lots = G.r6Lots();
  assert.equal(lots.length, 3, "three compressor lots");
  let sum = 0;
  for(const lot of lots) sum += G.r6UnitsOn(lot);
  assert.equal(sum, G.R6_REG.length, "every cabinet in the register is on exactly one lot");
  assert.equal(G.r6UnitsOn(G.R6_BAD_LOT), 96, "the failing lot");
  assert.equal(G.r6RecallCost(96), 211200);
  assert.equal(G.r6RecallCost(240), 528000);
  assert.equal(G.r6Unnecessary(), 528000 - 211200);
});

test("what the recall costs is decided by a crossing wired four rounds earlier", () => {
  assert.equal(G.r6RecallUnits("lot", true), 96);
  assert.equal(G.r6RecallUnits("lot", false), 240,
    "without the lot number on the build record you cannot name the 96");
  assert.equal(G.r6RecallScore("lot", true), 6);
  assert.equal(G.r6RecallScore("all", false), 6,
    "recalling everything is the right answer when you genuinely cannot narrow it");
  assert.ok(G.r6RecallScore("all", true) < 6,
    "recalling everything when you could have named 96 is not full marks");
  assert.equal(G.r6RecallScore("none", true), 0);
  assert.equal(G.r6RecallScore("none", false), 0);
  const gap = G.r6ScopeCost("all", false) - G.r6ScopeCost("lot", true);
  assert.equal(gap, 316800);
  assert.ok(gap > G.crossingById("plant-case").oneOff * 3,
    "the bill for not wiring that crossing must dwarf what wiring it would have cost");
});

/* The recall question's repair asks which single field separates the 96 from
   the other 144. It has exactly one defensible answer only while the register
   keeps three properties, and all three are properties of the DATA rather than
   of the prose, so a tuned constant could quietly open a second right answer
   without any sentence on the page becoming false. Lock them here. */
test("the welder fault is bounded by time and by nothing else", () => {
  /* The repair on question 3 only has one defensible answer if the second
     fault is genuinely a PROCESS fault: the build week must cut it exactly,
     and the compressor lot must fail both halves of the same test. If the
     register or the weeks were ever retuned so the welder's cabinets fell
     inside one lot, "the compressor lot number" would become a second right
     answer and every sentence in the repair would still read true. */
  const weld = G.r6WeldRows();
  assert.ok(weld.length > 0, "the welder has to have touched something");

  /* 1. The build week cuts it exactly, by construction of the question: every
        cabinet inside those weeks and no cabinet outside them. */
  for(const row of G.R6_REG){
    assert.equal(G.R6_WELD_WEEKS.includes(row.week), weld.includes(row),
      "the welder's set must be exactly the cabinets built in its weeks");
  }

  /* 2. The lot number misses some and over-collects others — the refutation
        the repair prints, recomputed here rather than trusted. */
  const lots = G.r6WeldLots();
  assert.ok(lots.length >= 2,
    "the welder must have run across more than one compressor lot, or the lot number cuts it too");
  const top = lots[0];
  assert.ok(weld.length - top.n > 0,
    "the biggest lot in those weeks must still miss some of the affected cabinets");
  assert.ok(G.r6UnitsOn(top.lot) - top.n > 0,
    "and it must also collect cabinets built outside those weeks");

  /* 3. No sale-side field separates them either. */
  const cu = G.r6WeldCustomers();
  assert.equal(cu.mixed, cu.names,
    "every name must hold cabinets from inside and outside the welder's weeks");

  /* 4. The two faults must not be the same cabinets, or the repair is the
        first question again with different words. */
  const bad = new Set(G.R6_REG.filter(r => r.lot === G.R6_BAD_LOT));
  const overlap = weld.filter(r => bad.has(r)).length;
  assert.ok(overlap < weld.length,
    "the welder's cabinets cannot all be the failing lot's cabinets");
});

test("no field but the lot number isolates the failing cabinets", () => {
  const bad = G.r6UnitsOn(G.R6_BAD_LOT);

  /* 1. The build week must over-collect. If the failing lot ever fell inside a
        set of whole build weeks, "the build week" would be a second right
        answer to question 3 and the question would be broken. */
  assert.ok(G.r6WeekSweepUnits() > bad,
    "the failing lot must straddle its build weeks, or the build week isolates it too");
  const perWeek = {};
  for(const row of G.R6_REG){
    perWeek[row.week] = perWeek[row.week] || { bad: 0, all: 0 };
    perWeek[row.week].all++;
    if(row.lot === G.R6_BAD_LOT) perWeek[row.week].bad++;
  }
  const mixedWeeks = G.r6WeeksOn(G.R6_BAD_LOT).filter(w => perWeek[w].all > perWeek[w].bad);
  assert.ok(mixedWeeks.length > 0,
    "at least one affected week must hold sound cabinets too, or the week is a clean cut");

  /* 2. The model must divide nothing: one model code across the whole register,
        which is what the repair's refutation of "the model number" counts. */
  const prefixes = new Set(G.R6_REG.map(r => r.serial.split("-")[0]));
  assert.equal(prefixes.size, 1, "one model on the register, or the model number becomes a real cut");

  /* 3. Every name in the who-bought-it column must hold bad and sound cabinets
        together, or a sale-side field would separate them and "the dealer who
        sold it" would survive a bright student's defence. */
  const perCust = {};
  for(const row of G.R6_REG){
    perCust[row.customer] = perCust[row.customer] || { bad: 0, all: 0 };
    perCust[row.customer].all++;
    if(row.lot === G.R6_BAD_LOT) perCust[row.customer].bad++;
  }
  for(const [name, c] of Object.entries(perCust)){
    assert.ok(c.bad > 0 && c.bad < c.all,
      `${name} holds only one kind of cabinet, so who bought it would isolate the fault`);
  }
});

/* ============================================================================
   ROUND 7 — THE FORCES AND THE SERVICE DESK
   ========================================================================== */
test("five pieces of evidence, five forces, one each", () => {
  assert.equal(G.FORCE_BINS.length, 5);
  assert.equal(G.FORCE_CARDS.length, 5);
  const used = G.FORCE_CARDS.map(c => c.force).sort();
  assert.deepEqual(used, G.FORCE_BINS.map(b => b.id).sort(),
    "each force must be the answer to exactly one exhibit");
  for(const c of G.FORCE_CARDS){
    assert.ok(nonEmpty(c.evidence), `${c.id} has no evidence`);
    assert.ok(nonEmpty(c.label) && nonEmpty(c.tag), `${c.id} is not labelled`);
  }
  /* Every wrong placement is explained, not just the right one: four wrong
     forces for each of five exhibits is twenty explanations. */
  let misses = 0;
  for(const c of G.FORCE_CARDS){
    for(const b of G.FORCE_BINS){
      if(b.id === c.force) continue;
      const key = c.id + ":" + b.id;
      assert.ok(nonEmpty(G.FORCE_MISS[key]),
        `putting ${c.id} on ${b.id} is not explained`);
      misses++;
    }
  }
  assert.equal(misses, 20, "five exhibits times four wrong forces");
  const perfect = {};
  G.FORCE_CARDS.forEach(c => { perfect[c.id] = c.force; });
  assert.equal(G.forceScore(perfect), 5);
  const swapped = Object.assign({}, perfect);
  const a = G.FORCE_CARDS[0], b = G.FORCE_CARDS[1];
  swapped[a.id] = b.force; swapped[b.id] = a.force;
  assert.equal(G.forceScore(swapped), 3, "one point per exhibit on the right force");
});

test("the two confusions the round is built on are both answered", () => {
  /* Labour is an input, so engineers who can walk are supplier power, not a
     human resources problem; and a substitute is a different way of getting
     the job done, while an entrant sells you the same thing. */
  const supplier = G.FORCE_CARDS.find(c => c.force === "suppliers");
  assert.ok(/employee|engineer|labour|labor|staff|people/i.test(supplier.evidence),
    "the supplier-power exhibit should be about people, which is what makes it hard");
  const sub = G.FORCE_CARDS.find(c => c.force === "substitutes");
  const ent = G.FORCE_CARDS.find(c => c.force === "entrants");
  assert.match(G.FORCE_MISS[sub.id + ":entrants"], /entrant/i,
    "the substitute exhibit must say why it is not a new entrant");
  assert.match(G.FORCE_MISS[ent.id + ":substitutes"], /entrant/i,
    "calling the new entrant a substitute must be answered by naming what it actually is");
  assert.match(G.FORCE_MISS[sub.id + ":entrants"], /same thing|different thing|no factory/i,
    "and the answer has to turn on what the customer ends up with");
});

test("a contact that does not resolve comes back, so resolution is a multiplier on volume", () => {
  const nothing = G.deskModel(G.deskPreset([]), false, false);
  const kb = G.deskModel(G.deskPreset(["kb"]), false, false);
  const agents = G.deskModel(G.deskPreset(["agents"]), false, false);
  assert.equal(agents.fcr, nothing.fcr, "hiring agents must not change first-contact resolution");
  assert.equal(Math.round(agents.assisted), Math.round(nothing.assisted),
    "hiring agents must not change how many contacts there are");
  assert.ok(kb.assisted < nothing.assisted,
    "resolving more of them on the first contact must reduce the total");
  /* The arithmetic itself: issues that are not resolved on the first contact
     come back, so the number of contacts is the number of issues over the
     resolution rate. */
  const expected = (G.DESK.issues - G.DESK.issues * nothing.self) / nothing.fcr;
  assert.ok(close(nothing.assisted, expected, 1e-6), "the contact count does not recompute");
});

test("a chatbot with nothing behind it makes first-contact resolution worse", () => {
  const nothing = G.deskModel(G.deskPreset([]), false, false);
  const botOnly = G.deskModel(G.deskPreset(["bot"]), false, false);
  const botAndBase = G.deskModel(G.deskPreset(["kb", "bot"]), false, false);
  const baseOnly = G.deskModel(G.deskPreset(["kb"]), false, false);
  assert.ok(botOnly.fcr < nothing.fcr,
    "deflecting without resolving must cost resolution, which is the round's sharpest lesson");
  assert.ok(botAndBase.fcr > baseOnly.fcr, "with something behind it, the same bot helps");
});

test("the service desk has an optimum, and it is not buying everything", () => {
  const ids = G.DESK_LEVERS.map(l => l.id);
  let best = null;
  for(let mask = 0; mask < (1 << ids.length); mask++){
    const on = {};
    ids.forEach((id, i) => { if(mask & (1 << i)) on[id] = true; });
    const m = G.deskModel(on, false, false);
    if(!best || m.annual < best.annual) best = { on: Object.keys(on), annual: m.annual, mask: mask };
  }
  const everything = G.deskModel(G.deskPreset(ids), false, false);
  assert.ok(best.annual < everything.annual,
    "if buying every lever were optimal the console would be a shopping list, not a decision");
  assert.ok(best.on.indexOf("agents") < 0,
    "the instinctive answer, more agents, must not be in the best plan");
  assert.ok(best.on.indexOf("kb") >= 0, "the knowledge base must be in the best plan");
  assert.equal(G.deskScore(best.annual), 4, "the best plan must score full marks");
  assert.equal(G.deskScore(G.deskToday().annual), 0, "doing nothing must score nothing");
  assert.ok(G.deskToday().annual > 5000000 && best.annual < 3000000,
    "the spread between doing nothing and doing the right thing must be worth a round");
});

test("one customer on file twice clears the top-account line neither time", () => {
  assert.ok(G.LTV.asTradingName < G.LTV.topTwentyLine,
    "neither half of a split account may clear the line on its own");
  assert.ok(G.LTV.asSiteAddress < G.LTV.topTwentyLine);
  assert.ok(G.ltvMerged() > G.LTV.topTwentyLine,
    "the whole account must clear it comfortably, or the lesson does not land");
  assert.equal(G.ltvMerged(), G.LTV.asTradingName + G.LTV.asSiteAddress);
  assert.equal(G.ltvClears(false), 0, "neither half of the split account clears the line");
  assert.equal(G.ltvClears(true), 1, "merged, it clears it once");
});

/* ============================================================================
   THE WHOLE BOARD
   ========================================================================== */
test("the game is worth about a hundred points and no round dominates", () => {
  /* The points are declared per question inside each round's builder, so the
     total is counted from the source rather than stated anywhere. */
  const perRound = [];
  const src = html;
  const roundStarts = [...src.matchAll(/ROUNDS\.push\(\{/g)].map(m => m.index);
  assert.equal(roundStarts.length, 7);
  for(let i = 0; i < roundStarts.length; i++){
    const chunk = src.slice(roundStarts[i], roundStarts[i + 1] || src.length);
    /* A question is registered either directly or through one of the two
       helpers, and all three carry the point value in the same position. */
    const direct = [...chunk.matchAll(/q\.register\(\s*"[^"]+"\s*,\s*[A-Za-z_$][\w$]*\s*,\s*([A-Za-z_$][\w$]*\(\)|\d+)/g)];
    const helped = [...chunk.matchAll(/(?:choiceQuestion|pillQuestion)\(\s*q\s*,\s*[A-Za-z_$][\w$]*\s*,\s*"[^"]+"\s*,\s*([A-Za-z_$][\w$]*\(\)|\d+)/g)];
    const worths = [...direct, ...helped]
      .map(m => (/^\d+$/.test(m[1]) ? Number(m[1]) : G[m[1].slice(0, -2)]()));
    assert.ok(worths.length >= 3, `round ${i + 1} has only ${worths.length} scored questions`);
    perRound.push(worths.reduce((a, b) => a + b, 0));
  }
  const total = perRound.reduce((a, b) => a + b, 0);
  assert.ok(total >= 90 && total <= 120, `the game is worth ${total} points`);
  const most = Math.max(...perRound);
  assert.ok(most <= total * 0.25, `one round is worth ${most} of ${total}, which is too much of the game`);
  const least = Math.min(...perRound);
  assert.ok(least >= 10, `one round is worth only ${least} points`);
});

test("no multiple choice answers in the same position every time", () => {
  /* A reader who notices that the first option is always the right one has
     learned something, and it is not Chapter 8. Each choice array marks its
     correct option with right:true, so the spread is checked from the source
     rather than guessed at. The arrays live inside their round's builder, so
     this reads the page rather than the loaded globals. */
  const arrays = [...html.matchAll(/(\/\* conditional:[^*]*\*\/\s*)?var\s+([A-Za-z_$][\w$]*Opts)\s*=\s*\[([\s\S]*?)\n\s*\];/g)]
    .filter(m => !m[1])
    .map(m => [m[0], m[2], m[3]]);
  assert.ok(arrays.length >= 10, `only found ${arrays.length} choice arrays on the page`);
  const counts = [0, 0, 0, 0];
  let checked = 0;
  for(const [, name, body] of arrays){
    /* split into top-level objects the same way the source lays them out */
    const blocks = [];
    let depth = 0, start = -1, quote = null;
    for(let i = 0; i < body.length; i++){
      const c = body[i];
      if(quote){ if(c === "\\") i++; else if(c === quote) quote = null; continue; }
      if(c === '"' || c === "'"){ quote = c; continue; }
      if(c === "{"){ if(depth === 0) start = i; depth++; }
      else if(c === "}"){ depth--; if(depth === 0) blocks.push(body.slice(start, i + 1)); }
    }
    if(blocks.length < 2) continue;
    const at = blocks.findIndex(b => /\bright\s*:\s*true\b/.test(b));
    assert.ok(at >= 0, `${name} does not mark which of its options is the right one`);
    assert.equal(blocks.filter(b => /\bright\s*:\s*true\b/.test(b)).length, 1,
      `${name} marks more than one option as right`);
    assert.ok(blocks.length >= 3, `${name} offers only ${blocks.length} options`);
    counts[Math.min(at, 3)]++;
    checked++;
  }
  assert.ok(checked >= 10, `only ${checked} choice questions declare their answer`);
  for(let i = 0; i < 4; i++){
    assert.ok(counts[i] >= 1, `no question has its answer in position ${i + 1}`);
    assert.ok(counts[i] <= Math.ceil(checked / 2),
      `${counts[i]} of ${checked} answers sit in position ${i + 1}`);
  }
});
