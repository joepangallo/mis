/* ============================================================================
   Everything below runs in the reader's own browser. Nothing is uploaded, and
   nothing is graded here — the checklist reports the SHAPE of an analysis,
   which is the only part a page can verify without an instructor in the room.

   Two kinds of answer live on this page: written boxes and the five-row force
   grid, which is written boxes in a table. They are collected the same way so
   that saving, restoring, exporting and clearing do not need two code paths.

   This is the machinery the exam and the practice cases use. Keeping it
   identical is the point: the controls are the same ones on the paper.
   ========================================================================== */
(function(){
"use strict";

var KEY = "__STORAGE_KEY__";
var FIRM = "__FIRM__";
var ESSAY = "t4";
var EXHIBIT_FIGURES = __EXHIBIT_FIGURES__;
var BAND = { low: 150, high: 200 };

function $(id){ return document.getElementById(id); }
function words(s){ s = (s || "").trim(); return s ? s.split(/\s+/).length : 0; }
function text(node){ return node ? (node.textContent || "").replace(/\s+/g, " ").trim() : ""; }

/* ------------------------------------------------------------------ fields
   Built from the page itself, in document order, so a task that is added,
   renamed or moved cannot end up mislabelled in the exported file. */
var TASKS = [];

function rowLabel(el){
  var tr = el.closest("tr");
  if(!tr) return "";
  var cells = [].slice.call(tr.querySelectorAll("td")).filter(function(td){ return !td.contains(el); });
  return cells.map(text).join(". ");
}

(function collect(){
  var nodes = document.querySelectorAll(".task");
  for(var i = 0; i < nodes.length; i++){
    var node = nodes[i];
    var task = { heading: text(node.querySelector("h3")), fields: [] };
    var boxes = node.querySelectorAll("textarea[data-key]");
    for(var j = 0; j < boxes.length; j++){
      task.fields.push({ key: boxes[j].getAttribute("data-key"), el: boxes[j], row: rowLabel(boxes[j]) });
    }
    if(task.fields.length) TASKS.push(task);
  }
})();

function allFields(){
  return TASKS.reduce(function(list, task){ return list.concat(task.fields); }, []);
}

/* ------------------------------------------------------------- persistence */
function load(){
  var raw = null;
  try{ raw = localStorage.getItem(KEY); }catch(e){}
  if(!raw) return;
  var data = {};
  try{ data = JSON.parse(raw) || {}; }catch(e){ return; }
  if(typeof data.who === "string") $("who").value = data.who;
  allFields().forEach(function(f){ if(typeof data[f.key] === "string") f.el.value = data[f.key]; });
}
var saveTimer = null;
function save(){
  var data = { who: $("who").value };
  allFields().forEach(function(f){ data[f.key] = f.el.value; });
  try{
    localStorage.setItem(KEY, JSON.stringify(data));
    $("saveStatus").textContent = "Saved in this browser · " +
      new Date().toLocaleTimeString([], {hour:"numeric", minute:"2-digit"});
  }catch(e){
    $("saveStatus").textContent = "This browser is not saving — export before you close the tab.";
  }
}
function queueSave(){
  clearTimeout(saveTimer);
  $("saveStatus").textContent = "Saving…";
  saveTimer = setTimeout(save, 400);
}

/* --------------------------------------------------------------- autosize */
function autosize(el){ el.style.height = "auto"; el.style.height = (el.scrollHeight + 2) + "px"; }
function textareas(){ return [].slice.call(document.querySelectorAll("textarea[data-key]")); }

/* ------------------------------------------------- the printed name and date
   The name lives in the toolbar and the toolbar does not print, so a printed
   analysis would otherwise arrive with nobody's name on it. */
function refreshIdentity(){
  var name = $("who").value.trim();
  $("printIdentity").innerHTML = name
    ? "Name: " + name.replace(/[&<>]/g, function(c){ return {"&":"&amp;","<":"&lt;",">":"&gt;"}[c]; }) +
      "  ·  Printed: " + new Date().toLocaleDateString()
    : 'Name: <span class="rule">&nbsp;</span>';
}

/* ------------------------------------------------------------ word counter */
function refreshWordCount(){
  var n = words($(ESSAY).value);
  var badge = $("wcBadge"), msg = $("wcMsg");
  badge.textContent = n + (n === 1 ? " word" : " words");
  badge.className = "wc-badge" + (n === 0 ? "" : n < BAND.low ? " low" : n > BAND.high ? " high" : " ok");
  msg.textContent = n === 0 ? "Aim for " + BAND.low + "–" + BAND.high + " words."
    : n < BAND.low ? "Under the band — " + (BAND.low - n) + " more to reach " + BAND.low + "."
    : n > BAND.high ? "Over the band — cut " + (n - BAND.high) + " to get back under " + BAND.high + "."
    : "Inside the band.";
}

/* --------------------------------------------------- what is still unanswered */
function refreshUnanswered(){
  var missing = [];
  TASKS.forEach(function(task){
    var blank = task.fields.filter(function(f){ return f.el.value.trim() === ""; }).length;
    if(blank === 0) return;
    var label = (task.heading.match(/^Task \d+[a-z]?/) || [task.heading])[0];
    missing.push(task.fields.length > 1 ? label + " (" + blank + " of " + task.fields.length + " boxes)" : label);
  });
  $("unansweredMsg").textContent = missing.length === 0
    ? "Every task on this case has something in it."
    : "Nothing written yet in: " + missing.join(", ") + ".";
}

/* ---------------------------------------------------------- shape checklist */
var ACTIVITY_WORDS = [
  {label:"inbound logistics",  re:/\binbound\b/i},
  {label:"operations",         re:/\boperations\b/i},
  {label:"outbound logistics", re:/\boutbound\b/i},
  {label:"sales and marketing",re:/\b(sales|marketing)\b/i},
  {label:"service",            re:/\bservice\b(?!\s*(model|s\b))/i},
  {label:"administration",     re:/\badministration\b|\bfirm infrastructure\b/i},
  {label:"human resources",    re:/\bhuman resource|\bHR\b/i},
  {label:"technology development", re:/\btechnology development\b/i},
  {label:"procurement",        re:/\bprocurement\b/i}
];
var FORCE_WORDS = [
  {label:"rivalry",        re:/\brivalr/i},
  {label:"new entrants",   re:/\b(new entrant|entrant|barrier to entry|barriers to entry)/i},
  {label:"buyer power",    re:/\bbuyer|\bcustomer power|\bbargaining power of (the )?(buyers|customers)/i},
  {label:"supplier power", re:/\bsupplier/i},
  {label:"substitutes",    re:/\bsubstitut/i}
];
var SYSTEM_WORDS = __SYSTEM_WORDS__;
var RATING_RE = /\bweak\b|\bmoderate\b|\bstrong\b|\bhigh\b|\blow\b/i;
var NUM_RE = /\d|\b(no|none|zero|one|single|sole|only|both|half|third|quarter|fifth|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|twenty|thirty|forty|fifty|sixty|ninety|hundred)\b/i;
var TIME_RE = /\b(day|days|week|weeks|month|months|quarter|quarterly|year|years|annually|january|february|march|april|may|june|july|august|september|october|november|december|tender|renewal|season)\b|\d{4}-\d{2}-\d{2}|\b\d{1,2}\/\d{1,2}(\/\d{2,4})?\b|\bQ[1-4]\b/i;
/* Only phrases that are empty on their own. A single word like "leverage" has
   honest uses ("buyers gain leverage when promises fail") and rejecting a whole
   answer for containing one is how a correct recommendation gets marked vague. */
var VAGUE = ["improve our digital", "digital transformation", "drive synergy", "synergies",
             "modernize our", "modernise our", "best practices across", "cutting edge",
             "state of the art", "adopt ai", "leverage synergies", "leverage our data assets"];

var FORCE_KEYS = ["f1", "f2", "f3", "f4", "f5"];

function matched(list, value){
  return list.filter(function(item){ return item.re.test(value || ""); });
}
/* The activity a box leads with: the one whose name appears earliest in it. */
function firstActivity(value){
  value = value || "";
  var best = null, at = Infinity;
  for(var i = 0; i < ACTIVITY_WORDS.length; i++){
    var m = value.match(ACTIVITY_WORDS[i].re);
    if(m && m.index < at){ at = m.index; best = ACTIVITY_WORDS[i].label; }
  }
  return best;
}
function dollars(value){
  return ((value || "").match(/\$\s?\d[\d,]*/g) || []).length;
}
/* "$1" is not quoting the exhibit. Require a figure the exhibit actually prints. */
function quotesExhibit(value){
  value = (value || "").replace(/\s+/g, "");
  for(var i = 0; i < EXHIBIT_FIGURES.length; i++){
    if(value.indexOf(EXHIBIT_FIGURES[i].replace(/\s+/g, "")) !== -1) return true;
  }
  return false;
}
/* A named comparison company: a capitalised word the student typed that is not
   the start of a sentence and is not this case's own firm. It is a heuristic,
   and the label says so rather than claiming to have verified a company. */
function namesACompany(value){
  value = value || "";
  var firmWords = FIRM.toLowerCase().split(/\W+/).filter(Boolean);
  var STOP = /^(the|this|that|they|their|there|then|both|because|although|while|however|its|it|an|and|but|for|from|in|on|at|by|to|of|we|our|us|my|one|two|first|second|third|unlike|like|when|where|what|which|who|task|yes|no|not|if|so|as|is|was|are|were|has|have|had|would|could|should|will|can|may|might)$/i;
  var tokens = value.split(/\s+/);
  var opensSentence = true;
  for(var t = 0; t < tokens.length; t++){
    var raw = tokens[t];
    /* Strip surrounding punctuation but keep internal & \u2019 . - so that
       names like "Levi\u2019s", "H&M" and "Amazon.com" survive intact. */
    var word = raw.replace(/^[^A-Za-z0-9]+/, "").replace(/[^A-Za-z0-9&\u2019'.]+$/, "").replace(/\.$/, "");
    var ends = /[.!?]$/.test(raw);
    var wasOpening = opensSentence;
    opensSentence = ends;
    if(word.length < 2) continue;
    if(!/[A-Z]/.test(word)) continue;               /* eBay and IKEA both qualify */
    if(firmWords.indexOf(word.toLowerCase()) !== -1) continue;
    if(wasOpening && !/[A-Z].*[A-Z]/.test(word) && STOP.test(word)) continue;
    if(STOP.test(word)) continue;
    return true;
  }
  return false;
}

function namesACompanyLegacy(value){
  value = value || "";
  var firmWords = FIRM.toLowerCase().split(/\W+/).filter(Boolean);
  /* Take the capture group, not the whole match: the leading [^.!?]\s eats the
     last letter of the previous word, so "with Ashgrove" used to yield
     "h Ashgrove", which matched nothing and let the case's own firm through. */
  var re = /(?:^|[^.!?]\s)([A-Z][A-Za-z&'’.-]{2,})/g, m, found = [];
  while((m = re.exec(value)) !== null) found.push(m[1]);
  for(var i = 0; i < found.length; i++){
    var word = found[i];
    if(firmWords.indexOf(word.toLowerCase()) !== -1) continue;
    if(/^(The|This|That|They|Their|Both|Because|Although|While|However|Its|It|A|An|I|My|We|Our|One|Two|First|Second|Unlike|Like|By|For|In|On|At|When|Where|What|Which|Task)$/.test(word)) continue;
    return true;
  }
  return false;
}

var CHECKS = [
  {label:"Your name is on it",
   hint:"The export and the printout both put it at the top.",
   test:function(v){ return v.who.trim().length >= 2; }},

  {label:"Task 1 addresses all five forces",
   hint:function(v){
     var blank = FORCE_KEYS.filter(function(k){ return (v[k] || "").trim() === ""; }).length;
     return blank === 0 ? "All five rows have something in them."
                        : blank + " of the five rows are still empty.";
   },
   test:function(v){ return FORCE_KEYS.every(function(k){ return words(v[k]) >= 4; }); }},

  {label:"Task 1 rates each force rather than describing it",
   hint:"Weak, moderate or strong, in every row. A description with no rating is not an evaluation.",
   test:function(v){ return FORCE_KEYS.every(function(k){ return RATING_RE.test(v[k]); }); }},

  {label:"Task 1 cites something countable",
   hint:"A share, a count, a price move, a number of competitors — evidence from the scenario rather than an impression.",
   test:function(v){
     return FORCE_KEYS.filter(function(k){ return NUM_RE.test(v[k]); }).length >= 3;
   }},

  {label:"Task 1b names one force and argues it against another",
   hint:"Rating all five and naming none leaves the decision to the reader, which was your job.",
   test:function(v){
     var forces = matched(FORCE_WORDS, v.strongest).length;
     /* Either an explicit connective or a second force named — both are ways of
        saying "this one rather than that one". A semicolon contrast counts. */
     var argues = /because|since|beats|outweigh|more than|ahead of|whereas|while|compared|rather than|;/i
       .test(v.strongest);
     return forces >= 1 && words(v.strongest) >= 20 && (forces >= 2 || argues);
   }},

  {label:"Task 2 names two different activities",
   hint:function(v){
     var a = firstActivity(v.a1), b = firstActivity(v.a2);
     if(!a || !b) return "Name each area in the value chain's own words.";
     return a === b ? "Both areas lead with " + a + "." : "Area 1: " + a + ". Area 2: " + b + ".";
   },
   test:function(v){
     /* Compare the activity each box LEADS with. An area that also names the
        knock-on activity is a better answer, not a worse one, and the old
        set-difference test rejected exactly that. */
     var a = firstActivity(v.a1), b = firstActivity(v.a2);
     return !!a && !!b && a !== b;
   }},

  {label:"Task 2 quotes each area's figure from the exhibit",
   hint:"The figure exactly as the exhibit prints it, so a reader can trace it. Describe the driver in your own words.",
   test:function(v){ return quotesExhibit(v.a1) && quotesExhibit(v.a2); }},

  {label:"Task 3 is specific enough to cost",
   hint:"Concrete means somebody could cost it and later check whether it shipped. “Improve our digital capabilities” fails this.",
   test:function(v){
     if(words(v.t3) < 50) return false;
     var low = v.t3.toLowerCase();
     for(var i = 0; i < VAGUE.length; i++){ if(low.indexOf(VAGUE[i]) !== -1) return false; }
     return true;
   }},

  {label:"Task 3 names the kind of system, from the reading",
   hint:function(v){
     var found = matched(SYSTEM_WORDS, v.t3).map(function(s){ return s.label; });
     return found.length ? "Found: " + found.join(", ") + "." :
       "Name it in the reading's own words rather than by a product name.";
   },
   test:function(v){ return matched(SYSTEM_WORDS, v.t3).length >= 1; }},

  {label:"Task 3 ties back to an activity and to a force",
   hint:"A fix with no activity is not on the chain, and one with no pressure behind it is a preference.",
   test:function(v){
     return matched(ACTIVITY_WORDS, v.t3).length >= 1 && matched(FORCE_WORDS, v.t3).length >= 1;
   }},

  {label:"Task 3 gives a measure and a date",
   hint:"The number as it stands today, the number you expect instead, and when somebody should look.",
   test:function(v){ return NUM_RE.test(v.t3) && TIME_RE.test(v.t3); }},

  {label:"Task 3b answers the chapter's own question",
   hint:"__T3B_HINT__",
   test:function(v){ return words(v.t3b) >= 60 && matched(SYSTEM_WORDS, v.t3 + " " + v.t3b).length >= 1; }},

  {label:"Task 4 names the company it is comparing with",
   hint:"A real company, named. The checklist can only see that you typed a name — whether it is documented anywhere is on you.",
   test:function(v){ return namesACompany(v[ESSAY]); }},

  {label:"Task 4 says what transfers",
   hint:"A lesson that only works at that company's budget is not a lesson. Say what this firm should actually adapt.",
   test:function(v){ return /lesson|should|adapt|borrow|copy|take from|apply|transfer/i.test(v[ESSAY]); }},

  {label:"Task 4 connects the comparison to the initiative",
   hint:"The summary is the strategic alignment deliverable. It has to come back to what you recommended, and to what the firm has chosen to compete on.",
   test:function(v){
     /* A 160-word summary for a board is allowed to say "the model" rather than
        "the decision support system". Accept the reading's words, a value chain
        activity, OR a plain reference to the thing recommended — what this is
        really catching is a summary that admires a company and never returns to
        Task 3 at all. A browser found the plural: "separate ordering and
        warehouse systems" is exactly the sentence this wants, and \bsystem\b
        did not match it. */
     var namesIt = matched(SYSTEM_WORDS, v[ESSAY]).length +
                   matched(ACTIVITY_WORDS, v[ESSAY]).length > 0 ||
                   /\binitiative|\bmodel|\bsystems?\b|\bpilot\b|\bprogramme\b|\bprogram\b|\bassistant\b|\brecommend|\bdashboard|\bforecast|\brecord\b|\bcomponent\b|\bmodule\b/i.test(v[ESSAY]);
     return namesIt && /alig|strateg|position|compet|advantage|promise|in stock|on time|what (it|we) sell|wins on|never been the cheapest/i.test(v[ESSAY]);
   }},

  {label:"Task 4 is inside the 150 to 200 word band",
   hint:function(v){
     var n = words(v[ESSAY]);
     return n === 0 ? BAND.low + " to " + BAND.high + " words." :
       n < BAND.low ? (BAND.low - n) + " words short of the band." :
       n > BAND.high ? (n - BAND.high) + " words over the band." : "Inside the band.";
   },
   test:function(v){ var n = words(v[ESSAY]); return n >= BAND.low && n <= BAND.high; }}
];

function values(){
  var v = { who: $("who").value };
  allFields().forEach(function(f){ v[f.key] = f.el.value; });
  return v;
}

function renderChecks(){
  var v = values();
  var list = $("checkList");
  list.innerHTML = "";
  CHECKS.forEach(function(check){
    var ok = false;
    try{ ok = !!check.test(v); }catch(e){ ok = false; }
    var li = document.createElement("li");
    li.className = ok ? "ok" : "";
    var mark = document.createElement("span");
    mark.className = "mark";
    mark.textContent = ok ? "✓" : "•";
    var body = document.createElement("div");
    var strong = document.createElement("b");
    strong.textContent = check.label;
    body.appendChild(strong);
    var hint = typeof check.hint === "function" ? check.hint(v) : check.hint;
    if(hint){
      var small = document.createElement("small");
      small.textContent = hint;
      body.appendChild(small);
    }
    li.appendChild(mark);
    li.appendChild(body);
    list.appendChild(li);
  });
}

/* -------------------------------------------------------------- the export */
function exportText(){
  save();
  var name = $("who").value.trim();
  var lines = [
    "__EXPORT_TITLE__",
    "Name: " + (name || "(no name entered)"),
    "Exported: " + new Date().toLocaleString(),
    ""
  ];
  TASKS.forEach(function(task){
    var head = "## " + task.heading;
    if(task.fields.length === 1 && task.fields[0].key === ESSAY){
      head += "  (" + words(task.fields[0].el.value) + " words)";
    }
    lines.push(head, "");
    task.fields.forEach(function(f){
      var value = f.el.value.trim();
      lines.push(f.row ? f.row + "  ->  " + (value || "(nothing written)")
                       : (value || "(nothing written)"));
    });
    lines.push("");
  });
  var blob = new Blob([lines.join("\n")], {type:"text/plain;charset=utf-8"});
  var safe = (name || "student").replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "").toLowerCase() || "student";
  var a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = safe + "-__EXPORT_SLUG__.txt";
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(function(){ URL.revokeObjectURL(a.href); }, 1000);
}

/* --------------------------------------------------------------- wiring up */
document.addEventListener("input", function(e){
  if(!e.target.matches("textarea[data-key]")) return;
  autosize(e.target);
  queueSave();
  refreshWordCount();
  refreshUnanswered();
  renderChecks();
});
$("who").addEventListener("input", function(){ queueSave(); renderChecks(); refreshIdentity(); });

$("exportBtn").addEventListener("click", exportText);

$("printBtn").addEventListener("click", function(){
  textareas().forEach(autosize);
  refreshIdentity();
  window.print();
});

$("clearBtn").addEventListener("click", function(){
  if(!window.confirm("Clear your name and every answer on this case? This cannot be undone.")) return;
  try{ localStorage.removeItem(KEY); }catch(e){}
  $("who").value = "";
  allFields().forEach(function(f){ f.el.value = ""; autosize(f.el); });
  refreshWordCount();
  refreshUnanswered();
  refreshIdentity();
  renderChecks();
  $("saveStatus").textContent = "Cleared.";
});

/* Print from the keyboard still needs the boxes grown, or the printed copy
   shows the first few lines of every answer and nothing else. */
window.addEventListener("beforeprint", function(){
  textareas().forEach(autosize);
  refreshIdentity();
});

/* Saving is debounced while typing, which leaves a window of a few hundred
   milliseconds in which a closed tab loses the last sentence written. Flush
   the moment the page is hidden or unloaded — pagehide fires where
   beforeunload does not, and visibilitychange covers a phone being locked. */
function flush(){ clearTimeout(saveTimer); save(); }
window.addEventListener("pagehide", flush);
document.addEventListener("visibilitychange", function(){
  if(document.visibilityState === "hidden") flush();
});

load();
textareas().forEach(autosize);
refreshWordCount();
refreshIdentity();
refreshUnanswered();
renderChecks();
})();
