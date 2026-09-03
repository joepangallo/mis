/* ============================================================================
   MODULE RUNTIME
   Every activity on the page is described by a plain data object in MIS_ACT.
   This file turns each of those objects into a working, keyboard-reachable
   widget, tracks what the reader has completed, and stores that progress in this
   browser only. Answers themselves are never stored -- reloading the page
   gives a clean slate to practise against while the completion record stays.
   ========================================================================== */
(function(){
"use strict";

var ACT = window.MIS_ACT || {};
var GLOSSARY = window.MIS_GLOSSARY || [];
var FINAL = window.MIS_FINAL || {questions:[]};
/* One key per module. It used to be a single shared constant, so activity keys that appear in more than one
   module (orgQuiz1, orgQuiz2, and __final__ in every module) bled across pages: a module could open already
   showing another module's answers as complete, and the Reset button — which promises to clear "this page" —
   emptied every module's progress at once. The id is injected by build.mjs from the module's sections.json. */
var MODULE_ID = (typeof window !== "undefined" && window.MIS_MODULE) || "01";
var STORE_KEY = "mis-m" + MODULE_ID + "-progress-v3";
var LEGACY_KEY = "mis-ch1-progress-v2";
var ADOPTED_KEY = "mis-m01-adopted-legacy-v1";
var THEME_KEY = "mis-ch1-theme-v1";

/* ---------------------------------------------------------------- helpers */
function el(tag, cls, html){
  var n = document.createElement(tag);
  if(cls) n.className = cls;
  if(html != null) n.innerHTML = html;
  return n;
}
function txt(s){ return String(s == null ? "" : s); }
/* txt() deliberately passes HTML through: activity labels are authored in the fragment files and rely on it
   to render entities. Anything the READER typed is different — the formula, SQL and code engines quote the
   reader's own text back inside their error messages, and a SELECT alias becomes a result header — so those
   strings must be escaped before they reach innerHTML. Use escHtml() for runtime data, txt() for authored. */
function escHtml(s){
  return String(s == null ? "" : s).replace(/[&<>"']/g, function(c){
    return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
  });
}
function shuffle(arr){
  var a = arr.slice(), i, j, t;
  for(i = a.length - 1; i > 0; i--){
    j = Math.floor(Math.random() * (i + 1));
    t = a[i]; a[i] = a[j]; a[j] = t;
  }
  return a;
}
/* A shuffle that is guaranteed to move at least one item, so a 4-item list
   never "shuffles" back into the order it was authored in. */
function shuffleHard(arr){
  if(arr.length < 2) return arr.slice();
  var out = shuffle(arr), i, same = true;
  for(i = 0; i < arr.length; i++){ if(out[i] !== arr[i]){ same = false; break; } }
  return same ? shuffleHard(arr) : out;
}
var LETTERS = ["A","B","C","D","E","F","G","H"];

/* An author who already opened an explanation with "Correct." should not get
   the badge printed twice; strip the redundant lead-in before prefixing. */
function whyText(s){
  return txt(s).replace(/^\s*(?:<b>)?\s*(?:That is )?correct[.!:,]?(?:<\/b>)?\s*(?:&mdash;|-|\u2014)?\s*/i, "");
}

/* Item labels in the fragment files are authored as HTML -- the printable
   fallback in build.mjs writes them straight into the page -- so the widgets
   render them with innerHTML too. Strings that are spoken rather than shown
   (aria-live status lines, aria-labels) need the same words without the markup,
   or a screen reader announces the entity instead of the character.

   THE INVARIANT THAT MAKES THAT SAFE: every string reaching an innerHTML sink
   in a renderer is authored at build time in the module's own fragment files.
   The fields are cfg.items[].t (sort), cfg.pairs[].l/.r (match), cfg.steps[].t
   (order) and cfg.blanks[].before/.after/.choices[] (fill). Do not route a
   reader-supplied value into any of them. What a reader types belongs in
   textContent, which is how the formula, sql and code renderers already handle
   typed cell values and query results -- keep it that way.

   Worth keeping strict even though the page is offline: Chrome and Edge report
   the same origin -- the bare local-file scheme, carrying no host -- for every
   page opened from disk, so a single localStorage bucket is shared by every
   local HTML file the browser has ever opened. Verified: an unrelated local
   page read this module's saved progress straight back. Script running in one
   local page can therefore reach the saved work of all of them. */
var decodeHost = null;
function plain(s){
  if(!decodeHost) decodeHost = document.createElement("div");
  decodeHost.innerHTML = txt(s);
  return decodeHost.textContent || "";
}

var store = (function(){
  var data = {};
  try{ data = JSON.parse(localStorage.getItem(STORE_KEY) || "{}") || {}; }catch(e){ data = {}; }
  /* One-time adoption for Module 1, whose progress is what the old shared key actually held. Modules 2 and 3
     deliberately start clean rather than inherit entries the collision had already scrambled.
     "One time" has to be recorded rather than inferred from an empty store. Reset empties the store and then
     reloads the page, so inferring it re-adopted the old blob on that very reload and handed the student back
     the answers they had just cleared -- the button appeared to do nothing. The flag is what makes adoption
     happen once; the legacy key itself is deliberately left in place, so a browser that has not opened
     Module 1 yet can still migrate later, and tidying it away would silently break that. */
  if(MODULE_ID === "01" && !Object.keys(data).length && !localStorage.getItem(ADOPTED_KEY)){
    try{
      var legacy = JSON.parse(localStorage.getItem(LEGACY_KEY) || "{}") || {};
      if(Object.keys(legacy).length){
        data = legacy;
        localStorage.setItem(STORE_KEY, JSON.stringify(data));
      }
      localStorage.setItem(ADOPTED_KEY, "1");
    }catch(e){ /* nothing to adopt */ }
  }
  return {
    get: function(k){ return data[k] || null; },
    set: function(k, v){
      var prev = data[k];
      if(prev && prev.done >= v.done && prev.total === v.total) return;
      data[k] = v;
      try{ localStorage.setItem(STORE_KEY, JSON.stringify(data)); }catch(e){}
    },
    clear: function(k){
      if(k) delete data[k]; else data = {};
      try{ localStorage.setItem(STORE_KEY, JSON.stringify(data)); }catch(e){}
    },
    all: function(){ return data; }
  };
})();

var toastEl = null, toastTimer = null;
function toast(msg){
  if(!toastEl){
    toastEl = el("div", "toast");
    toastEl.setAttribute("role", "status");
    document.body.appendChild(toastEl);
  }
  toastEl.textContent = msg;
  toastEl.classList.add("is-on");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(function(){ toastEl.classList.remove("is-on"); }, 2200);
}

/* ------------------------------------------------------- progress plumbing */
var registry = [];   /* {key, section, total, done, render} */

function findEntry(key){
  for(var i = 0; i < registry.length; i++){ if(registry[i].key === key) return registry[i]; }
  return null;
}
function report(key, done, total){
  var e = findEntry(key);
  if(!e) return;
  e.done = done; e.total = total;
  store.set(key, {done: done, total: total});
  paintProgress();
  var host = key === "__final__" ? document.getElementById("finalMount") : document.querySelector('[data-activity="' + key + '"]');
  if(host){
    var state = host.querySelector(".act-state");
    if(state){
      var saved = store.get(key);
      var shown = Math.max(done, saved ? saved.done : 0);
      if(total <= 0){ state.textContent = ""; }
      else if(shown >= total){ state.textContent = "Complete · " + shown + "/" + total; state.style.color = "var(--good)"; }
      else if(shown > 0){ state.textContent = shown + "/" + total; state.style.color = "var(--text-dim)"; }
      else { state.textContent = ""; }
    }
  }
}
function paintProgress(){
  var completedCount = 0, i;
  for(i = 0; i < registry.length; i++){
    var best = store.get(registry[i].key);
    var done = Math.max(registry[i].done || 0, best ? best.done : 0);
    if(registry[i].total > 0 && done >= registry[i].total) completedCount++;
  }
  var meter = document.getElementById("moduleProgress");
  var label = document.getElementById("progressLabel");
  var pct = registry.length ? Math.round(completedCount / registry.length * 100) : 0;
  if(meter){ meter.value = pct; meter.textContent = pct + "%"; }
  if(label) label.textContent = completedCount + " of " + registry.length + " complete";
  paintSidebarScores();
}
function paintSidebarScores(){
  var groups = {};
  registry.forEach(function(r){
    if(!groups[r.section]) groups[r.section] = {m: 0, t: 0};
    groups[r.section].t++;
    var best = store.get(r.key);
    var done = Math.max(r.done || 0, best ? best.done : 0);
    if(r.total > 0 && done >= r.total) groups[r.section].m++;
  });
  Object.keys(groups).forEach(function(sec){
    var node = document.querySelector('.side-score[data-for="' + sec + '"]');
    if(!node) return;
    var g = groups[sec];
    node.textContent = g.m ? g.m + "/" + g.t : "";
  });
}

/* =========================================================================
   ACTIVITY SHELL
   ====================================================================== */
function mount(host, key, cfg){
  host.innerHTML = "";
  var head = el("div", "act-head");
  head.appendChild(el("span", "act-kind", txt(cfg.label || "Activity")));
  var h = el("h4", "act-title", txt(cfg.title || ""));
  h.id = "act-" + key;
  head.appendChild(h);
  head.appendChild(el("span", "act-state", ""));
  host.appendChild(head);
  host.setAttribute("aria-labelledby", h.id);
  if(cfg.how) host.appendChild(el("p", "act-how", txt(cfg.how)));
  var body = el("div", "act-body");
  host.appendChild(body);
  var foot = el("div", "act-foot");
  var reset = el("button", "act-reset", "Start this over");
  reset.type = "button";
  foot.appendChild(reset);
  host.appendChild(foot);
  return {body: body, foot: foot, reset: reset};
}

function build(key, cfg, host){
  var parts = mount(host, key, cfg);
  var renderer = RENDER[cfg.kind];
  if(!renderer){ parts.body.appendChild(el("p", "hint", "This activity type is not available.")); return; }
  function draw(){
    parts.body.innerHTML = "";
    renderer(parts.body, cfg, key, draw);
  }
  parts.reset.addEventListener("click", function(){
    store.clear(key);
    var e = findEntry(key);
    if(e){ e.done = 0; }
    draw();
    paintProgress();
    toast("Activity reset.");
  });
  draw();
}

/* =========================================================================
   RENDERERS
   ====================================================================== */
var RENDER = {};

/* ---- quiz ---------------------------------------------------------------
   Multiple choice where every option explains itself after the answer lands,
   including the three that were not chosen. Knowing why a wrong answer is
   wrong is the part that transfers to the next question.                   */
RENDER.quiz = function(body, cfg, key){
  var qs = cfg.questions || [];
  var answered = new Array(qs.length).fill(null);

  qs.forEach(function(q, qi){
    var wrap = el("div", "q");
    var head = el("div", "q-head");
    head.appendChild(el("span", "q-num", String(qi + 1)));
    head.appendChild(el("span", "q-text", txt(q.q)));
    wrap.appendChild(head);

    var list = el("ul", "opts");
    var fb = el("div", "fb");
    fb.setAttribute("role", "status");
    fb.setAttribute("aria-live", "polite");
    fb.tabIndex = -1;
    fb.hidden = true;
    var buttons = [];

    q.opts.forEach(function(optText, oi){
      var li = el("li");
      var b = el("button", "opt");
      b.type = "button";
      b.appendChild(el("span", "opt-key", LETTERS[oi]));
      var span = el("span", null, txt(optText));
      b.appendChild(span);
      b.addEventListener("click", function(){
        if(answered[qi] !== null) return;
        answered[qi] = oi;
        var right = (oi === q.a);
        buttons.forEach(function(bb, bi){
          bb.disabled = true;
          bb.classList.add(bi === q.a ? "is-correct" : (bi === oi ? "is-wrong" : "is-muted"));
          if(q.why && q.why[bi]){
            var w = el("span", "opt-why", (bi === q.a ? "<b>Correct.</b> " + whyText(q.why[bi]) : txt(q.why[bi])));
            bb.querySelector("span:last-child").appendChild(w);
          }
        });
        fb.hidden = false;
        fb.className = "fb " + (right ? "ok" : "no");
        fb.innerHTML = right
          ? "<b>That is the one.</b> Read the other three as well &mdash; each says what it genuinely is."
          : "<b>Not quite.</b> The right answer is <b>" + LETTERS[q.a] + "</b>. Every option below now explains itself.";
        var again = el("button", "act-reset retry-question", "Try this question again");
        again.type = "button";
        again.addEventListener("click", function(){
          answered[qi] = null;
          buttons.forEach(function(bb, bi){
            bb.disabled = false;
            bb.className = "opt";
            var last = bb.querySelector("span:last-child");
            var w = last.querySelector(".opt-why");
            if(w) w.remove();
          });
          fb.hidden = true;
          fb.innerHTML = "";
          score();
        });
        fb.appendChild(again);
        score();
        fb.focus();
      });
      buttons.push(b);
      li.appendChild(b);
      list.appendChild(li);
    });

    wrap.appendChild(list);
    wrap.appendChild(fb);
    body.appendChild(wrap);
  });

  function score(){
    var n = 0;
    answered.forEach(function(a){ if(a !== null) n++; });
    report(key, n, qs.length);
  }
  report(key, 0, qs.length);
};

/* ---- sort ---------------------------------------------------------------
   Classification. Items start in a pool; a click picks one up and a click on
   a bucket drops it in. Drag and drop works too where the device supports it.
*/
RENDER.sort = function(body, cfg, key, redraw){
  var items = shuffleHard(cfg.items.map(function(it, i){ return {i: i, t: it.t, b: it.b, why: it.why}; }));
  var placed = {};            /* itemIndex -> bucketId */
  var picked = null;
  var graded = false;

  var pool = el("div", "pool");
  var bucketsWrap = el("div", "buckets");
  var bucketNodes = {};

  function bucketName(id){
    for(var i = 0; i < cfg.buckets.length; i++){ if(cfg.buckets[i].id === id) return cfg.buckets[i].name; }
    return id;
  }
  function makeChip(it){
    var b = el("button", "sort-item");
    b.type = "button";
    b.innerHTML = txt(it.t);
    b.setAttribute("draggable", "true");
    b.addEventListener("click", function(){
      if(graded) return;
      if(picked === it){ picked = null; }
      else { picked = it; }
      paint();
    });
    b.addEventListener("dragstart", function(ev){
      if(graded){ ev.preventDefault(); return; }
      picked = it;
      try{ ev.dataTransfer.setData("text/plain", String(it.i)); }catch(e){}
      ev.dataTransfer.effectAllowed = "move";
    });
    if(graded){
      var right = placed[it.i] === it.b;
      b.classList.add(right ? "is-right" : "is-wrong");
      b.disabled = true;
      b.appendChild(el("span", "sort-answer",
        (right ? "" : "<b>Belongs in " + bucketName(it.b) + ".</b> ") + txt(it.why)));
    } else if(picked === it){
      b.classList.add("is-picked");
    }
    return b;
  }
  function drop(bucketId){
    if(graded || !picked) return;
    placed[picked.i] = bucketId;
    picked = null;
    paint();
  }
  function paint(){
    pool.innerHTML = "";
    items.forEach(function(it){ if(placed[it.i] === undefined) pool.appendChild(makeChip(it)); });
    cfg.buckets.forEach(function(bk){
      var node = bucketNodes[bk.id];
      var host = node.querySelector(".bucket-items");
      host.innerHTML = "";
      items.forEach(function(it){ if(placed[it.i] === bk.id) host.appendChild(makeChip(it)); });
      node.classList.toggle("is-target", !!picked);
      node.querySelector(".bucket-target").setAttribute("aria-disabled", picked && !graded ? "false" : "true");
    });
    checkBtn.disabled = graded || Object.keys(placed).length < items.length;
    checkBtn.textContent = graded ? "Checked" : "Check my sorting";
  }

  body.appendChild(el("p", "hint", "Choose an item, then choose the group it belongs in. On a computer you can also drag it."));
  body.appendChild(pool);
  cfg.buckets.forEach(function(bk){
    var node = el("div", "bucket");
    var target = el("button", "bucket-target");
    target.type = "button";
    target.appendChild(el("span", "bucket-head", txt(bk.name)));
    if(bk.hint) target.appendChild(el("span", "bucket-sub", txt(bk.hint)));
    target.setAttribute("aria-label", "Place the selected item in " + bk.name);
    target.addEventListener("click", function(){ drop(bk.id); });
    node.appendChild(target);
    node.appendChild(el("div", "bucket-items"));
    node.addEventListener("dragover", function(ev){ ev.preventDefault(); ev.dataTransfer.dropEffect = "move"; });
    node.addEventListener("drop", function(ev){ ev.preventDefault(); drop(bk.id); });
    bucketNodes[bk.id] = node;
    bucketsWrap.appendChild(node);
  });
  body.appendChild(bucketsWrap);

  var row = el("div", "act-foot");
  row.style.padding = "12px 0 0";
  var checkBtn = el("button", "btn", "Check my sorting");
  checkBtn.type = "button";
  checkBtn.addEventListener("click", function(){
    graded = true;
    var n = 0;
    items.forEach(function(it){ if(placed[it.i] === it.b) n++; });
    report(key, items.length, items.length);
    paint();
    var again = el("button", "act-reset", "Shuffle and try again");
    again.type = "button";
    again.addEventListener("click", redraw);
    row.appendChild(again);
    checkBtn.disabled = true;
    toast(n + " of " + items.length + " placed correctly.");
  });
  row.appendChild(checkBtn);
  body.appendChild(row);

  report(key, 0, cfg.items.length);
  paint();
};

/* ---- match --------------------------------------------------------------
   Pick a term on the left, then the definition on the right. A correct pair
   locks green and shows the clarifying note; a wrong pair flashes and stays
   open so the reader can reason again rather than guess through it.        */
RENDER.match = function(body, cfg, key, redraw){
  var pairs = cfg.pairs || [];
  var left = shuffleHard(pairs.map(function(p, i){ return {i: i, t: p.l}; }));
  var right = shuffleHard(pairs.map(function(p, i){ return {i: i, t: p.r}; }));
  var solved = {};
  var pickL = null;
  var tries = 0;

  var grid = el("div", "match-grid");
  var colL = el("div", "match-col");
  var colR = el("div", "match-col");
  colL.setAttribute("role", "group");
  colL.setAttribute("aria-label", "Terms");
  colR.setAttribute("role", "group");
  colR.setAttribute("aria-label", "Definitions");
  var status = el("p", "match-status");
  status.setAttribute("role", "status");
  status.setAttribute("aria-live", "polite");
  var nodesL = {}, nodesR = {};

  function paint(){
    left.forEach(function(o){
      var n = nodesL[o.i];
      n.className = "match-item" + (solved[o.i] ? " is-done" : (pickL === o.i ? " is-picked" : ""));
      n.disabled = !!solved[o.i];
    });
    right.forEach(function(o){
      var n = nodesR[o.i];
      n.className = "match-item" + (solved[o.i] ? " is-done" : "");
      n.disabled = !!solved[o.i];
    });
    var n = Object.keys(solved).length;
    report(key, n, pairs.length);
    if(n === pairs.length && !body.querySelector(".match-done")){
      var d = el("div", "fb ok match-done",
        "<b>All matched.</b> You needed " + tries + " attempt" + (tries === 1 ? "" : "s") + " for " + pairs.length + " pairs.");
      var again = el("button", "act-reset retry-question", "Shuffle and try again");
      again.type = "button";
      again.addEventListener("click", redraw);
      d.appendChild(again);
      body.appendChild(d);
    }
  }

  left.forEach(function(o){
    var b = el("button", "match-item");
    b.type = "button";
    b.innerHTML = txt(o.t);
    b.addEventListener("click", function(){
      if(solved[o.i]) return;
      pickL = (pickL === o.i) ? null : o.i;
      status.textContent = pickL === null ? "Selection cleared." : "Selected " + plain(o.t) + ". Choose its definition.";
      paint();
    });
    nodesL[o.i] = b;
    colL.appendChild(b);
  });
  right.forEach(function(o){
    var b = el("button", "match-item");
    b.type = "button";
    b.innerHTML = txt(o.t);
    b.addEventListener("click", function(){
      if(pickL === null || solved[o.i]) return;
      tries++;
      if(pickL === o.i){
        solved[o.i] = true;
        var badge = el("span", "match-badge", "Matched");
        nodesL[o.i].insertBefore(badge, nodesL[o.i].firstChild);
        if(pairs[o.i].why) nodesR[o.i].appendChild(el("span", "match-why", txt(pairs[o.i].why)));
        status.textContent = "Matched " + plain(pairs[o.i].l) + " to " + plain(pairs[o.i].r) + ".";
        pickL = null;
        paint();
      } else {
        var miss = nodesR[o.i];
        status.textContent = nodesL[pickL].textContent + " does not match " + plain(o.t) + ". Try another definition.";
        miss.classList.add("is-miss");
        setTimeout(function(){ miss.classList.remove("is-miss"); }, 620);
      }
    });
    nodesR[o.i] = b;
    colR.appendChild(b);
  });

  body.appendChild(el("p", "hint", "Choose a term, then the definition that matches it."));
  body.appendChild(status);
  grid.appendChild(colL);
  grid.appendChild(colR);
  body.appendChild(grid);
  report(key, 0, pairs.length);
  paint();
};

/* ---- order --------------------------------------------------------------
   Sequencing. The steps arrive shuffled; the arrows move one row at a time so
   the reader has to commit to a position rather than drag vaguely.         */
RENDER.order = function(body, cfg, key, redraw){
  var steps = cfg.steps || [];
  var current = shuffleHard(steps.map(function(s, i){ return i; }));
  var graded = false;

  if(cfg.intro) body.appendChild(el("p", null, txt(cfg.intro)));
  var list = el("ol", "order-list");
  body.appendChild(list);
  var status = el("p", "match-status");
  status.setAttribute("role", "status");
  status.setAttribute("aria-live", "polite");
  body.appendChild(status);

  function move(si, pos, delta, direction){
    var swap = current[pos + delta];
    current[pos + delta] = current[pos];
    current[pos] = swap;
    paint();
    status.textContent = plain(steps[si].t) + " moved to position " + (pos + delta + 1) + ".";
    var moved = list.querySelector('[data-step="' + si + '"]');
    if(!moved) return;
    var control = moved.querySelector('[data-move="' + direction + '"]:not([disabled])') ||
      moved.querySelector("button:not([disabled])");
    if(control) control.focus(); else { moved.tabIndex = -1; moved.focus(); }
  }

  function paint(){
    list.innerHTML = "";
    current.forEach(function(si, pos){
      var row = el("li", "order-row");
      row.setAttribute("data-step", String(si));
      row.appendChild(el("span", "order-pos", String(pos + 1)));
      var t = el("span", "order-txt", txt(steps[si].t));
      if(graded){
        row.classList.add(si === pos ? "is-right" : "is-wrong");
        t.appendChild(el("span", "order-why",
          (si === pos ? "" : "<b>Belongs at position " + (si + 1) + ".</b> ") + txt(steps[si].why)));
      }
      row.appendChild(t);
      if(!graded){
        var btns = el("div", "order-btns");
        var up = el("button", null, "▲");
        up.type = "button"; up.title = "Move up"; up.setAttribute("aria-label", "Move " + plain(steps[si].t) + " up");
        up.setAttribute("data-move", "up");
        up.disabled = pos === 0;
        up.addEventListener("click", function(){
          move(si, pos, -1, "up");
        });
        var dn = el("button", null, "▼");
        dn.type = "button"; dn.title = "Move down"; dn.setAttribute("aria-label", "Move " + plain(steps[si].t) + " down");
        dn.setAttribute("data-move", "down");
        dn.disabled = pos === current.length - 1;
        dn.addEventListener("click", function(){
          move(si, pos, 1, "down");
        });
        btns.appendChild(up); btns.appendChild(dn);
        row.appendChild(btns);
      }
      list.appendChild(row);
    });
  }

  var row = el("div", "act-foot");
  row.style.padding = "0";
  var check = el("button", "btn", "Check the order");
  check.type = "button";
  check.addEventListener("click", function(){
    graded = true;
    var n = 0;
    current.forEach(function(si, pos){ if(si === pos) n++; });
    report(key, steps.length, steps.length);
    check.disabled = true;
    var again = el("button", "act-reset", "Shuffle and try again");
    again.type = "button";
    again.addEventListener("click", redraw);
    row.appendChild(again);
    paint();
    toast(n + " of " + steps.length + " in the right place.");
  });
  row.appendChild(check);
  body.appendChild(row);

  report(key, 0, steps.length);
  paint();
};

/* ---- fill ---------------------------------------------------------------
   Cloze. Choosing from a short list keeps the focus on discriminating between
   near-neighbour terms rather than on spelling.                            */
RENDER.fill = function(body, cfg, key){
  var blanks = cfg.blanks || [];
  var chosen = new Array(blanks.length).fill(null);

  blanks.forEach(function(bk, bi){
    var row = el("div", "fill-row");
    /* The text around the blank is authored HTML like every other label, so it
       is rendered rather than inserted as a literal string. */
    row.appendChild(el("span", null, txt(bk.before)));
    var sel = el("select", "fill-in");
    sel.setAttribute("aria-label", "Blank " + (bi + 1));
    var ph = el("option", null, "choose…");
    ph.value = "";
    sel.appendChild(ph);
    shuffleHard(bk.choices.map(function(c, ci){ return {c: c, ci: ci}; })).forEach(function(o){
      var op = el("option", null, txt(o.c));
      op.value = String(o.ci);
      sel.appendChild(op);
    });
    row.appendChild(sel);
    row.appendChild(el("span", null, txt(bk.after)));
    var why = el("span", "fill-why");
    why.setAttribute("role", "status");
    why.setAttribute("aria-live", "polite");
    why.hidden = true;
    row.appendChild(why);
    sel.addEventListener("change", function(){
      if(sel.value === ""){ chosen[bi] = null; sel.className = "fill-in"; why.hidden = true; score(); return; }
      var ci = parseInt(sel.value, 10);
      chosen[bi] = ci;
      var right = ci === bk.a;
      sel.className = "fill-in " + (right ? "is-right" : "is-wrong");
      why.hidden = false;
      why.innerHTML = (right ? "<b>Yes.</b> " : "<b>Not that one.</b> The blank takes <b>" + txt(bk.choices[bk.a]) + "</b>. ") + txt(bk.why);
      score();
    });
    body.appendChild(row);
  });

  function score(){
    var n = 0;
    chosen.forEach(function(c){ if(c !== null) n++; });
    report(key, n, blanks.length);
  }
  report(key, 0, blanks.length);
};

/* ---- explore ------------------------------------------------------------
   Reveal cards. Each card opens onto the same four questions, which is what
   makes the set comparable instead of just a pile of definitions.          */
RENDER.explore = function(body, cfg, key){
  var items = cfg.items || [];
  var labels = cfg.labels || ["What it is", "Where you see it", "Why it matters", "The catch"];
  var opened = {};
  var grid = el("div", "char-grid");

  items.forEach(function(it, i){
    var card = el("div", "char");
    var toggle = el("button", "char-toggle");
    toggle.type = "button";
    toggle.id = "explore-" + key + "-toggle-" + i;
    toggle.setAttribute("aria-expanded", "false");
    var top = el("span", "char-top");
    top.appendChild(el("span", "char-ico", txt(it.icon || "")));
    top.appendChild(el("span", "char-name", "<span>" + txt(it.sub || "") + "</span>" + txt(it.name)));
    toggle.appendChild(top);
    var detail = el("div", "char-detail");
    detail.id = "explore-" + key + "-detail-" + i;
    detail.setAttribute("role", "region");
    detail.setAttribute("aria-labelledby", toggle.id);
    toggle.setAttribute("aria-controls", detail.id);
    detail.hidden = true;
    [["what", 0], ["real", 1], ["absent", 2], ["why", 3]].forEach(function(pair){
      if(it[pair[0]] == null) return;
      detail.appendChild(el("div", null, "<b>" + txt(labels[pair[1]]) + "</b>" + txt(it[pair[0]])));
    });
    card.appendChild(toggle);
    card.appendChild(detail);
    toggle.addEventListener("click", function(){
      var open = detail.hidden;
      detail.hidden = !open;
      card.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      if(open) opened[i] = true;
      report(key, Object.keys(opened).length, items.length);
    });
    grid.appendChild(card);
  });

  body.appendChild(el("p", "hint", "Open every card. Each one answers the same four questions, so the set can be compared side by side."));
  body.appendChild(grid);
  report(key, 0, items.length);
};

/* ---- diagram ------------------------------------------------------------
   One idea redrawn several ways. Choosing a model swaps the boxes and the
   bullet points beneath them; visiting all of them is the completion bar.  */
RENDER.diagram = function(body, cfg, key){
  var models = cfg.models || [];
  var seen = {};
  var tabs = el("div", "dc-tabs");
  tabs.setAttribute("role", "tablist");
  tabs.setAttribute("aria-label", cfg.title || "Diagram views");
  var stage = el("div", "dc");
  stage.id = "diagram-" + key + "-panel";
  stage.setAttribute("role", "tabpanel");
  var tabBtns = [];

  function show(mi){
    seen[mi] = true;
    var m = models[mi];
    stage.setAttribute("aria-labelledby", "diagram-" + key + "-tab-" + mi);
    tabBtns.forEach(function(b, bi){
      b.setAttribute("aria-selected", bi === mi ? "true" : "false");
      b.classList.toggle("is-seen", !!seen[bi]);
      b.tabIndex = bi === mi ? 0 : -1;
    });
    stage.innerHTML = "";
    if(m.site) stage.appendChild(el("p", "dc-caption", txt(m.site)));
    var flow = el("div", "dc-flow");
    (m.boxes || []).forEach(function(bx, bi){
      if(bi > 0) flow.appendChild(el("div", "dc-arrow", "→"));
      var node = el("div", "dc-box c-" + (bx.c || "a"));
      node.appendChild(el("b", null, txt(bx.t)));
      if(bx.w) node.appendChild(el("span", null, txt(bx.w)));
      flow.appendChild(node);
    });
    stage.appendChild(flow);
    var ul = el("ul", "dc-points");
    (m.points || []).forEach(function(p){ ul.appendChild(el("li", null, txt(p))); });
    stage.appendChild(ul);
    report(key, Object.keys(seen).length, models.length);
  }

  models.forEach(function(m, mi){
    var b = el("button", "tab-btn", txt(m.name));
    b.type = "button";
    b.setAttribute("role", "tab");
    b.id = "diagram-" + key + "-tab-" + mi;
    b.setAttribute("aria-controls", stage.id);
    b.addEventListener("click", function(){ show(mi); });
    b.addEventListener("keydown", function(ev){
      var next = null;
      if(ev.key === "ArrowRight") next = (mi + 1) % models.length;
      if(ev.key === "ArrowLeft") next = (mi - 1 + models.length) % models.length;
      if(ev.key === "Home") next = 0;
      if(ev.key === "End") next = models.length - 1;
      if(next !== null){ ev.preventDefault(); tabBtns[next].focus(); show(next); }
    });
    tabBtns.push(b);
    tabs.appendChild(b);
  });

  body.appendChild(tabs);
  body.appendChild(stage);
  report(key, 0, models.length);
  if(models.length) show(0);
};

/* ---- sim ----------------------------------------------------------------
   A short chain of decisions. Every choice is answered with its consequence,
   including the ones that were not taken, and the run can be replayed.     */
RENDER.sim = function(body, cfg, key, redraw){
  var steps = cfg.steps || [];
  var at = 0, good = 0, awaitingContinue = false;
  var track = el("div", "sim-track");
  var stage = el("div", "sim-stage");
  var log = el("div", "sim-log");
  track.setAttribute("aria-label", "Decision progress");
  track.setAttribute("role", "progressbar");
  track.setAttribute("aria-valuemin", "0");
  track.setAttribute("aria-valuemax", String(steps.length));
  stage.tabIndex = -1;

  if(cfg.intro) body.appendChild(el("p", null, txt(cfg.intro)));
  body.appendChild(track);
  body.appendChild(stage);
  body.appendChild(log);

  function paintTrack(){
    track.innerHTML = "";
    track.setAttribute("aria-valuenow", String(at));
    track.setAttribute("aria-valuetext", at + " of " + steps.length + " decisions finished");
    steps.forEach(function(_, i){
      var d = el("span", "sim-dot" + (i < at ? " is-done" : (i === at ? " is-now" : "")));
      track.appendChild(d);
    });
  }
  function paintStage(){
    stage.innerHTML = "";
    if(at >= steps.length){
      stage.appendChild(el("p", "sim-situation",
        "<b>Run complete.</b> You made the stronger call on " + good + " of " + steps.length + " decisions."));
      var again = el("button", "btn ghost", "Run it again");
      again.type = "button";
      again.addEventListener("click", redraw);
      stage.appendChild(again);
      return;
    }
    var s = steps[at];
    stage.appendChild(el("p", "sim-situation", txt(s.situation)));
    var list = el("ul", "opts");
    var buttons = [];
    (s.opts || []).forEach(function(o, oi){
      var li = el("li");
      var b = el("button", "opt");
      b.type = "button";
      b.appendChild(el("span", "opt-key", LETTERS[oi]));
      b.appendChild(el("span", null, txt(o.t)));
      b.addEventListener("click", function(){
        if(awaitingContinue) return;
        awaitingContinue = true;
        if(o.ok) good++;
        buttons.forEach(function(bb, bi){
          bb.disabled = true;
          bb.classList.add(bi === oi ? (o.ok ? "is-correct" : "is-wrong") : "is-muted");
        });

        var entry = el("div", "sim-entry " + (o.ok ? "ok" : "no"));
        entry.appendChild(el("b", null, "Decision " + (at + 1) + " · " + (o.ok ? "stronger call" : "weaker call")));
        entry.appendChild(el("div", null, "<i>You chose:</i> " + txt(o.t) + "<br>" + txt(o.out)));
        log.appendChild(entry);

        var outcomes = el("div", "sim-outcomes");
        outcomes.setAttribute("role", "status");
        outcomes.setAttribute("aria-live", "polite");
        outcomes.tabIndex = -1;
        outcomes.appendChild(el("p", "sim-situation", "<b>Compare every outcome before continuing.</b>"));
        (s.opts || []).forEach(function(option, optionIndex){
          var outcome = el("div", "sim-entry " + (option.ok ? "ok" : "no") + (optionIndex === oi ? " is-chosen" : ""));
          outcome.appendChild(el("b", null, "Option " + LETTERS[optionIndex] + " · " + (option.ok ? "stronger call" : "weaker call") + (optionIndex === oi ? " · your choice" : "")));
          outcome.appendChild(el("div", null, "<strong>" + txt(option.t) + "</strong><br>" + txt(option.out)));
          outcomes.appendChild(outcome);
        });
        stage.appendChild(outcomes);

        var next = el("button", "btn sim-next", at + 1 < steps.length ? "Continue to the next decision" : "Finish the run");
        next.type = "button";
        next.addEventListener("click", function(){
          at++;
          awaitingContinue = false;
          paintTrack();
          paintStage();
          stage.focus();
        });
        stage.appendChild(next);
        report(key, at + 1, steps.length);
        outcomes.focus();
      });
      buttons.push(b);
      li.appendChild(b);
      list.appendChild(li);
    });
    stage.appendChild(list);
  }

  report(key, 0, steps.length);
  paintTrack();
  paintStage();
};

/* ---- selfcheck ----------------------------------------------------------
   Not graded. The value is in noticing which statements you cannot yet make
   truthfully, so the hint points straight back at the material.            */
RENDER.selfcheck = function(body, cfg, key){
  var items = cfg.items || [];
  var answered = {};

  items.forEach(function(it, i){
    var row = el("div", "sc-row");
    var t = el("div", "sc-txt", txt(it.t));
    var hint = el("span", "sc-hint", txt(it.hint));
    hint.hidden = true;
    t.appendChild(hint);
    var btns = el("div", "sc-btns");
    var yes = el("button", null, "Yes");
    var no = el("button", "no", "Not yet");
    yes.type = "button"; no.type = "button";
    yes.setAttribute("aria-label", "Yes: " + it.t);
    no.setAttribute("aria-label", "Not yet: " + it.t);
    yes.setAttribute("aria-pressed", "false");
    no.setAttribute("aria-pressed", "false");
    function pick(which){
      answered[i] = which;
      yes.setAttribute("aria-pressed", which === "y" ? "true" : "false");
      no.setAttribute("aria-pressed", which === "n" ? "true" : "false");
      hint.hidden = which !== "n";
      var ready = Object.keys(answered).filter(function(k){ return answered[k] === "y"; }).length;
      report(key, ready, items.length);
    }
    yes.addEventListener("click", function(){ pick("y"); });
    no.addEventListener("click", function(){ pick("n"); });
    btns.appendChild(yes); btns.appendChild(no);
    row.appendChild(t); row.appendChild(btns);
    body.appendChild(row);
  });
  report(key, 0, items.length);
};


/* =========================================================================
   CODE EXERCISES
   Two small interpreters let a reader write a real spreadsheet formula or a
   real SQL query and watch it run against data on the page. Neither is a full
   product: each covers what the chapter teaches and says so plainly when asked
   for something outside that, which is more useful to a learner than a blank
   result would be.
   ====================================================================== */
/* ============================================================================
   A small spreadsheet formula evaluator.
   Supports the text and arithmetic functions the chapter's spreadsheet exercise
   actually uses, so a reader types a real formula and watches it fill a real
   column. Deliberately not a full Excel: it covers what is taught, and says so
   plainly when a reader reaches for something it does not know.
   ========================================================================== */
function makeFormula(){
  "use strict";

  /* ---- lexer ------------------------------------------------------------ */
  function lex(src){
    var t = [], i = 0, s = src;
    var isD = function(c){ return c >= "0" && c <= "9"; };
    var isA = function(c){ return /[A-Za-z_$]/.test(c); };
    while(i < s.length){
      var c = s[i];
      if(c === " " || c === "\t" || c === "\n"){ i++; continue; }
      if(c === '"'){
        var j = i + 1, out = "";
        while(j < s.length){
          if(s[j] === '"' && s[j+1] === '"'){ out += '"'; j += 2; continue; }
          if(s[j] === '"'){ break; }
          out += s[j++];
        }
        if(j >= s.length) throw new Error("a double quote is never closed");
        t.push({k:"str", v:out}); i = j + 1; continue;
      }
      if(isD(c) || (c === "." && isD(s[i+1]))){
        var n = "";
        while(i < s.length && (isD(s[i]) || s[i] === ".")) n += s[i++];
        t.push({k:"num", v:parseFloat(n)}); continue;
      }
      if(isA(c)){
        var w = "";
        while(i < s.length && /[A-Za-z0-9_$.]/.test(s[i])) w += s[i++];
        t.push({k:"word", v:w}); continue;
      }
      if("+-*/^&%(),:<>=".indexOf(c) >= 0){
        if((c === "<" && (s[i+1] === "=" || s[i+1] === ">")) || (c === ">" && s[i+1] === "=")){
          t.push({k:"op", v:c + s[i+1]}); i += 2; continue;
        }
        t.push({k:"op", v:c}); i++; continue;
      }
      throw new Error('unexpected character "' + c + '"');
    }
    return t;
  }

  /* ---- parser (precedence climbing) ------------------------------------- */
  var BIN = {"<":1,">":1,"=":1,"<=":1,">=":1,"<>":1, "&":2, "+":3,"-":3, "*":4,"/":4, "^":5};
  function parse(tokens){
    var p = 0;
    function peek(){ return tokens[p]; }
    function eat(v){
      var t = tokens[p];
      if(!t || (v && t.v !== v)) throw new Error("expected " + (v || "more input"));
      p++; return t;
    }
    function primary(){
      var t = peek();
      if(!t) throw new Error("the formula ends too early");
      if(t.k === "num"){ p++; return {t:"num", v:t.v}; }
      if(t.k === "str"){ p++; return {t:"str", v:t.v}; }
      if(t.k === "op" && t.v === "-"){ p++; return {t:"neg", a:primary()}; }
      if(t.k === "op" && t.v === "+"){ p++; return primary(); }
      if(t.k === "op" && t.v === "("){ p++; var e = expr(0); eat(")"); return e; }
      if(t.k === "word"){
        p++;
        var nx = peek();
        if(nx && nx.k === "op" && nx.v === "("){
          p++;
          var args = [];
          if(peek() && !(peek().k === "op" && peek().v === ")")){
            args.push(expr(0));
            while(peek() && peek().k === "op" && peek().v === ","){ p++; args.push(expr(0)); }
          }
          eat(")");
          return {t:"call", name:t.v.toUpperCase(), args:args};
        }
        if(nx && nx.k === "op" && nx.v === ":" ){
          var second = tokens[p+1];
          if(second && second.k === "word"){ p += 2; return {t:"range", a:t.v, b:second.v}; }
        }
        return {t:"ref", v:t.v};
      }
      throw new Error("unexpected " + JSON.stringify(t.v));
    }
    function expr(min){
      var left = primary();
      while(true){
        var t = peek();
        if(!t || t.k !== "op" || !(t.v in BIN)) break;
        var prec = BIN[t.v];
        if(prec < min) break;
        p++;
        var right = expr(prec + 1);
        left = {t:"bin", op:t.v, a:left, b:right};
      }
      return left;
    }
    var out = expr(0);
    if(p < tokens.length) throw new Error("unexpected " + JSON.stringify(tokens[p].v) + " after the formula");
    return out;
  }

  /* ---- helpers ---------------------------------------------------------- */
  function colToIndex(letters){
    var n = 0;
    for(var i = 0; i < letters.length; i++) n = n * 26 + (letters.charCodeAt(i) - 64);
    return n - 1;
  }
  function splitRef(ref){
    var m = /^(\$?)([A-Za-z]+)(\$?)(\d+)$/.exec(ref);
    if(!m) return null;
    return {
      col: colToIndex(m[2].toUpperCase()),
      row: parseInt(m[4], 10) - 1,
      absCol: m[1] === "$",
      absRow: m[3] === "$"
    };
  }
  function num(v){
    if(typeof v === "number") return v;
    if(v === "" || v === null || v === undefined) return 0;
    var n = parseFloat(String(v).replace(/[$,]/g, ""));
    if(isNaN(n)) throw new Error("expected a number but found " + JSON.stringify(String(v)));
    return n;
  }
  function str(v){ return v === null || v === undefined ? "" : String(v); }

  /* ---- functions -------------------------------------------------------- */
  var FN = {
    TRIM: function(a){ return str(a[0]).replace(/\s+/g, " ").trim(); },
    CLEAN: function(a){ return str(a[0]).replace(/[\x00-\x1F\x7F]/g, ""); },
    LOWER: function(a){ return str(a[0]).toLowerCase(); },
    UPPER: function(a){ return str(a[0]).toUpperCase(); },
    PROPER: function(a){ return str(a[0]).toLowerCase().replace(/\b[a-z]/g, function(c){ return c.toUpperCase(); }); },
    LEN: function(a){ return str(a[0]).length; },
    LEFT: function(a){ return str(a[0]).slice(0, a.length > 1 ? num(a[1]) : 1); },
    RIGHT: function(a){ var n = a.length > 1 ? num(a[1]) : 1; return n <= 0 ? "" : str(a[0]).slice(-n); },
    MID: function(a){ var st = num(a[1]); return str(a[0]).substr(st - 1, num(a[2])); },
    FIND: function(a){
      var i = str(a[1]).indexOf(str(a[0]), a.length > 2 ? num(a[2]) - 1 : 0);
      if(i < 0) throw new Error("FIND could not locate " + JSON.stringify(str(a[0])));
      return i + 1;
    },
    SEARCH: function(a){
      var i = str(a[1]).toLowerCase().indexOf(str(a[0]).toLowerCase(), a.length > 2 ? num(a[2]) - 1 : 0);
      if(i < 0) throw new Error("SEARCH could not locate " + JSON.stringify(str(a[0])));
      return i + 1;
    },
    SUBSTITUTE: function(a){ return str(a[0]).split(str(a[1])).join(str(a[2])); },
    REPLACE: function(a){
      var s = str(a[0]), st = num(a[1]) - 1, n = num(a[2]);
      return s.slice(0, st) + str(a[3]) + s.slice(st + n);
    },
    CONCATENATE: function(a){ return a.map(str).join(""); },
    CONCAT: function(a){ return a.map(str).join(""); },
    IF: function(a){ return a[0] ? a[1] : (a.length > 2 ? a[2] : false); },
    ROUND: function(a){ var d = a.length > 1 ? num(a[1]) : 0, f = Math.pow(10, d); return Math.round(num(a[0]) * f) / f; },
    ABS: function(a){ return Math.abs(num(a[0])); },
    SUM: function(a){ return flat(a).reduce(function(t, v){ return t + (v === "" ? 0 : num(v)); }, 0); },
    AVERAGE: function(a){ var f = flat(a).filter(function(v){ return v !== ""; }); return f.reduce(function(t, v){ return t + num(v); }, 0) / (f.length || 1); },
    COUNT: function(a){ return flat(a).filter(function(v){ return v !== "" && !isNaN(parseFloat(v)); }).length; },
    COUNTA: function(a){ return flat(a).filter(function(v){ return v !== "" && v !== null; }).length; },
    MAX: function(a){ return Math.max.apply(null, flat(a).filter(function(v){ return v !== ""; }).map(num)); },
    MIN: function(a){ return Math.min.apply(null, flat(a).filter(function(v){ return v !== ""; }).map(num)); },
  };
  function flat(a){
    var out = [];
    a.forEach(function(v){ if(Array.isArray(v)) out = out.concat(flat(v)); else out.push(v); });
    return out;
  }

  /* ---- evaluator -------------------------------------------------------- */
  function evaluate(node, ctx){
    switch(node.t){
      case "num": return node.v;
      case "str": return node.v;
      case "neg": return -num(evaluate(node.a, ctx));
      case "ref": {
        var r = splitRef(node.v);
        if(!r) throw new Error(JSON.stringify(node.v) + " is not a cell this sheet has");
        return ctx.cell(r.absRow ? r.row : r.row + ctx.offset, r.col);
      }
      case "range": {
        var a = splitRef(node.a), b = splitRef(node.b);
        if(!a || !b) throw new Error("that range is not one this sheet has");
        var out = [];
        var ar = a.absRow ? a.row : a.row + ctx.offset, br = b.absRow ? b.row : b.row + ctx.offset;
        for(var r2 = Math.min(ar,br); r2 <= Math.max(ar,br); r2++)
          for(var c = Math.min(a.col,b.col); c <= Math.max(a.col,b.col); c++)
            out.push(ctx.cell(r2, c));
        return out;
      }
      case "call": {
        var f = FN[node.name];
        if(!f) throw new Error(node.name + " is not one of the functions this exercise supports");
        return f(node.args.map(function(x){ return evaluate(x, ctx); }));
      }
      case "bin": {
        var x = evaluate(node.a, ctx), y = evaluate(node.b, ctx);
        switch(node.op){
          case "&": return str(x) + str(y);
          case "+": return num(x) + num(y);
          case "-": return num(x) - num(y);
          case "*": return num(x) * num(y);
          case "/": {
            var d = num(y);
            if(d === 0) throw new Error("division by zero");
            return num(x) / d;
          }
          case "^": return Math.pow(num(x), num(y));
          case "=": return str(x).toLowerCase() === str(y).toLowerCase();
          case "<>": return str(x).toLowerCase() !== str(y).toLowerCase();
          case "<": return num(x) < num(y);
          case ">": return num(x) > num(y);
          case "<=": return num(x) <= num(y);
          case ">=": return num(x) >= num(y);
        }
      }
    }
    throw new Error("this formula uses something the exercise cannot evaluate");
  }

  /* ---- public ----------------------------------------------------------- */
  function run(formula, grid, rowIndex){
    var src = String(formula || "").trim();
    if(src[0] === "=") src = src.slice(1);
    if(!src) throw new Error("the cell is empty");
    var ast = parse(lex(src));
    return evaluate(ast, {
      offset: (rowIndex === undefined || rowIndex === null ? 1 : rowIndex) - 1,
      cell: function(r, c){
        var row = grid[r];
        if(!row) return "";
        var v = row[c];
        return v === undefined || v === null ? "" : v;
      }
    });
  }
  return {run: run, FN: FN};
}

/* ============================================================================
   A small SQL SELECT engine over in-page tables.
   Covers the shape of query a first database exercise asks for - projection,
   filtering, joining, grouping, aggregation, ordering and limiting - so the
   reader writes real SQL and sees a real result set. It refuses clearly when
   asked for something outside that, rather than failing quietly.
   ========================================================================== */
function makeSql(){
  "use strict";

  var KW = ["SELECT","DISTINCT","FROM","JOIN","INNER","LEFT","ON","WHERE","GROUP","BY","HAVING",
            "ORDER","ASC","DESC","LIMIT","AND","OR","NOT","AS","LIKE","IN","BETWEEN","IS","NULL","COUNT",
            "SUM","AVG","MIN","MAX"];

  function lex(s){
    var t = [], i = 0;
    while(i < s.length){
      var c = s[i];
      if(/\s/.test(c)){ i++; continue; }
      if(c === "-" && s[i+1] === "-"){ while(i < s.length && s[i] !== "\n") i++; continue; }
      if(c === "'" || c === '"'){
        var q = c, j = i + 1, out = "";
        while(j < s.length){
          if(s[j] === q && s[j+1] === q){ out += q; j += 2; continue; }
          if(s[j] === q) break;
          out += s[j++];
        }
        if(j >= s.length) throw new Error("a quoted value is never closed");
        t.push({k:"str", v:out}); i = j + 1; continue;
      }
      if(/[0-9]/.test(c) || (c === "." && /[0-9]/.test(s[i+1]))){
        var n = ""; while(i < s.length && /[0-9.]/.test(s[i])) n += s[i++];
        t.push({k:"num", v:parseFloat(n)}); continue;
      }
      if(/[A-Za-z_]/.test(c)){
        var w = ""; while(i < s.length && /[A-Za-z0-9_.]/.test(s[i])) w += s[i++];
        var up = w.toUpperCase();
        t.push(KW.indexOf(up) >= 0 ? {k:"kw", v:up} : {k:"id", v:w});
        continue;
      }
      if(s.substr(i,2) === "<>" || s.substr(i,2) === "!=" || s.substr(i,2) === "<=" || s.substr(i,2) === ">="){
        t.push({k:"op", v:s.substr(i,2) === "!=" ? "<>" : s.substr(i,2)}); i += 2; continue;
      }
      if("=<>+-*/(),".indexOf(c) >= 0){ t.push({k:"op", v:c}); i++; continue; }
      if(c === "*"){ t.push({k:"op", v:"*"}); i++; continue; }
      if(c === ";"){ i++; continue; }
      throw new Error('unexpected character "' + c + '"');
    }
    return t;
  }

  function parse(tokens){
    var p = 0;
    var at = function(k, v){ var t = tokens[p]; return !!t && t.k === k && (v === undefined || t.v === v); };
    var kw = function(v){ return at("kw", v); };
    function need(pred, what){ if(!pred) throw new Error("expected " + what); }
    function take(){ return tokens[p++]; }

    need(kw("SELECT"), "the query to start with SELECT"); p++;
    var distinct = false;
    if(kw("DISTINCT")){ distinct = true; p++; }

    var cols = [];
    do {
      if(at("op","*")){ p++; cols.push({kind:"all"}); }
      else {
        var e = expr();
        var alias = null;
        if(kw("AS")){ p++; need(at("id") || at("str"), "an alias"); alias = take().v; }
        else if(at("id") && !kw("FROM")) { alias = take().v; }
        cols.push({kind:"expr", e:e, alias:alias});
      }
      if(at("op",",")){ p++; continue; }
      break;
    } while(true);

    need(kw("FROM"), "FROM"); p++;
    need(at("id"), "a table name");
    var from = {table:take().v, alias:null};
    if(kw("AS")){ p++; from.alias = take().v; } else if(at("id")) from.alias = take().v;

    var joins = [];
    while(kw("JOIN") || kw("INNER") || kw("LEFT")){
      var type = "inner";
      if(kw("LEFT")){ type = "left"; p++; }
      if(kw("INNER")) p++;
      need(kw("JOIN"), "JOIN"); p++;
      need(at("id"), "a table name to join");
      var j = {table:take().v, alias:null, type:type};
      if(kw("AS")){ p++; j.alias = take().v; } else if(at("id") && !kw("ON")) j.alias = take().v;
      need(kw("ON"), "ON"); p++;
      j.on = expr();
      joins.push(j);
    }

    var where = null, group = null, having = null, order = null, limit = null;
    if(kw("WHERE")){ p++; where = expr(); }
    if(kw("GROUP")){ p++; need(kw("BY"), "BY"); p++; group = []; do { group.push(expr()); if(at("op",",")){p++;continue;} break; } while(true); }
    if(kw("HAVING")){ p++; having = expr(); }
    if(kw("ORDER")){
      p++; need(kw("BY"), "BY"); p++; order = [];
      do {
        var oe = expr(), dir = "asc";
        if(kw("ASC")){ p++; } else if(kw("DESC")){ p++; dir = "desc"; }
        order.push({e:oe, dir:dir});
        if(at("op",",")){ p++; continue; }
        break;
      } while(true);
    }
    if(kw("LIMIT")){ p++; need(at("num"), "a number after LIMIT"); limit = take().v; }
    if(p < tokens.length) throw new Error("unexpected " + JSON.stringify(String(tokens[p].v)) + " at the end of the query");
    return {distinct:distinct, cols:cols, from:from, joins:joins, where:where, group:group, having:having, order:order, limit:limit};

    /* expressions */
    function expr(){ return orX(); }
    function orX(){ var l = andX(); while(kw("OR")){ p++; l = {t:"or", a:l, b:andX()}; } return l; }
    function andX(){ var l = notX(); while(kw("AND")){ p++; l = {t:"and", a:l, b:notX()}; } return l; }
    function notX(){ if(kw("NOT")){ p++; return {t:"not", a:notX()}; } return cmp(); }
    function cmp(){
      var l = add();
      if(kw("IS")){
        p++; var neg = false;
        if(kw("NOT")){ neg = true; p++; }
        need(kw("NULL"), "NULL"); p++;
        return {t:"isnull", a:l, neg:neg};
      }
      if(kw("LIKE")){ p++; return {t:"like", a:l, b:add()}; }
      if(kw("BETWEEN")){ p++; var lo = add(); need(kw("AND"), "AND"); p++; return {t:"between", a:l, lo:lo, hi:add()}; }
      if(kw("NOT") && tokens[p+1] && tokens[p+1].v === "IN"){ p += 2; return {t:"not", a:inList(l)}; }
      if(kw("IN")){ p++; return inList(l); }
      if(at("op") && ["=","<>","<",">","<=",">="].indexOf(tokens[p].v) >= 0){
        var op = take().v; return {t:"cmp", op:op, a:l, b:add()};
      }
      return l;
    }
    function inList(l){
      need(at("op","("), "( after IN"); p++;
      var vals = [];
      do { vals.push(add()); if(at("op",",")){ p++; continue; } break; } while(true);
      need(at("op",")"), ") after IN list"); p++;
      return {t:"in", a:l, vals:vals};
    }
    function add(){
      var l = mul();
      while(at("op","+") || at("op","-")){ var o = take().v; l = {t:"arith", op:o, a:l, b:mul()}; }
      return l;
    }
    function mul(){
      var l = unary();
      while(at("op","*") || at("op","/")){ var o = take().v; l = {t:"arith", op:o, a:l, b:unary()}; }
      return l;
    }
    function unary(){
      if(at("op","-")){ p++; return {t:"neg", a:unary()}; }
      return atom();
    }
    function atom(){
      if(at("op","(")){ p++; var e = expr(); need(at("op",")"), ")"); p++; return e; }
      if(at("num")) return {t:"lit", v:take().v};
      if(at("str")) return {t:"lit", v:take().v};
      if(kw("NULL")){ p++; return {t:"lit", v:null}; }
      if(at("kw") && ["COUNT","SUM","AVG","MIN","MAX"].indexOf(tokens[p].v) >= 0){
        var fn = take().v;
        need(at("op","("), "( after " + fn); p++;
        var arg = null;
        if(at("op","*")){ p++; arg = {t:"star"}; }
        else { if(kw("DISTINCT")) p++; arg = expr(); }
        need(at("op",")"), ")"); p++;
        return {t:"agg", fn:fn, arg:arg};
      }
      if(at("id")) return {t:"col", name:take().v};
      throw new Error("expected a column, value or function but found " + JSON.stringify(String((tokens[p]||{}).v)));
    }
  }

  /* ---- evaluation ------------------------------------------------------- */
  function get(row, name){
    if(name in row) return row[name];
    var bare = name.indexOf(".") >= 0 ? name.split(".").pop() : name;
    if(bare in row) return row[bare];
    var lower = Object.keys(row).find(function(k){ return k.toLowerCase() === bare.toLowerCase(); });
    if(lower) return row[lower];
    throw new Error("there is no column called " + JSON.stringify(name));
  }
  function bare(row){
    var out = {};
    Object.keys(row).forEach(function(k){ if(k.indexOf(".") < 0) out[k] = row[k]; });
    return out;
  }
  function likeRe(pat){
    var esc = String(pat).replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replace(/%/g, ".*").replace(/_/g, ".");
    return new RegExp("^" + esc + "$", "i");
  }
  function cmpVals(a, b){
    if(a === null || b === null) return null;
    if(typeof a === "number" && typeof b === "number") return a < b ? -1 : a > b ? 1 : 0;
    var x = String(a).toLowerCase(), y = String(b).toLowerCase();
    return x < y ? -1 : x > y ? 1 : 0;
  }
  function ev(node, row, group){
    switch(node.t){
      case "lit": return node.v;
      case "col": return get(row, node.name);
      case "star": return 1;
      case "neg": return -Number(ev(node.a, row, group));
      case "arith": {
        var a = Number(ev(node.a, row, group)), b = Number(ev(node.b, row, group));
        if(node.op === "+") return a + b;
        if(node.op === "-") return a - b;
        if(node.op === "*") return a * b;
        if(b === 0) throw new Error("division by zero");
        return a / b;
      }
      case "cmp": {
        var c = cmpVals(ev(node.a, row, group), ev(node.b, row, group));
        if(c === null) return false;
        switch(node.op){
          case "=": return c === 0; case "<>": return c !== 0;
          case "<": return c < 0; case ">": return c > 0;
          case "<=": return c <= 0; case ">=": return c >= 0;
        }
        return false;
      }
      case "and": return !!ev(node.a, row, group) && !!ev(node.b, row, group);
      case "or": return !!ev(node.a, row, group) || !!ev(node.b, row, group);
      case "not": return !ev(node.a, row, group);
      case "isnull": { var v = ev(node.a, row, group); var isN = v === null || v === undefined || v === ""; return node.neg ? !isN : isN; }
      case "like": return likeRe(ev(node.b, row, group)).test(String(ev(node.a, row, group)));
      case "between": { var t = ev(node.a,row,group); return cmpVals(t, ev(node.lo,row,group)) >= 0 && cmpVals(t, ev(node.hi,row,group)) <= 0; }
      case "in": { var t2 = ev(node.a,row,group); return node.vals.some(function(x){ return cmpVals(t2, ev(x,row,group)) === 0; }); }
      case "agg": {
        if(!group) throw new Error(node.fn + " needs a GROUP BY, or must be the only kind of column selected");
        var vals = group.map(function(r){ return node.arg.t === "star" ? 1 : ev(node.arg, r, null); });
        if(node.fn === "COUNT") return node.arg.t === "star" ? vals.length : vals.filter(function(v){ return v !== null && v !== undefined && v !== ""; }).length;
        var nums = vals.filter(function(v){ return v !== null && v !== undefined && v !== ""; }).map(Number);
        if(!nums.length) return null;
        if(node.fn === "SUM") return nums.reduce(function(a,b){ return a+b; }, 0);
        if(node.fn === "AVG") return nums.reduce(function(a,b){ return a+b; }, 0) / nums.length;
        if(node.fn === "MIN") return Math.min.apply(null, nums);
        if(node.fn === "MAX") return Math.max.apply(null, nums);
      }
    }
    throw new Error("this query uses something the exercise cannot evaluate");
  }
  function hasAgg(n){
    if(!n || typeof n !== "object") return false;
    if(n.t === "agg") return true;
    return Object.keys(n).some(function(k){ return hasAgg(n[k]); });
  }
  function label(c, i){
    if(c.alias) return c.alias;
    if(c.e.t === "col") return c.e.name.indexOf(".") >= 0 ? c.e.name.split(".").pop() : c.e.name;
    if(c.e.t === "agg") return c.e.fn + "(" + (c.e.arg.t === "star" ? "*" : (c.e.arg.name || "")) + ")";
    return "col" + (i + 1);
  }

  function run(sql, tables){
    var q = parse(lex(String(sql || "").trim()));
    /* Every row carries its columns twice: bare, and prefixed with the table
       name and alias. Joining two tables that share a column name would
       otherwise let the right-hand value overwrite the left, quietly making
       `a.x = b.x` always true. Qualified copies never collide, and `get`
       checks the exact name first. */
    function tableRows(name, alias){
      var key = Object.keys(tables).find(function(k){ return k.toLowerCase() === String(name).toLowerCase(); });
      if(!key) throw new Error("there is no table called " + JSON.stringify(name));
      var prefixes = [String(key)];
      if(alias && alias.toLowerCase() !== String(key).toLowerCase()) prefixes.push(String(alias));
      return tables[key].rows.map(function(r){
        var out = {};
        Object.keys(r).forEach(function(c){
          out[c] = r[c];
          prefixes.forEach(function(px){ out[px + "." + c] = r[c]; });
        });
        return out;
      });
    }
    var rows = tableRows(q.from.table, q.from.alias);
    q.joins.forEach(function(j){
      var right = tableRows(j.table, j.alias), out = [];
      rows.forEach(function(l){
        var matched = false;
        right.forEach(function(r){
          var merged = Object.assign({}, l, r);
          if(ev(j.on, merged, null)){ out.push(merged); matched = true; }
        });
        if(!matched && j.type === "left") out.push(Object.assign({}, l));
      });
      rows = out;
    });
    if(q.where) rows = rows.filter(function(r){ return ev(q.where, r, null); });

    var result = [], headers;
    var selectsAgg = q.cols.some(function(c){ return c.kind === "expr" && hasAgg(c.e); });

    if(q.group || selectsAgg){
      var buckets = new Map();
      if(q.group){
        rows.forEach(function(r){
          var k = JSON.stringify(q.group.map(function(g){ return ev(g, r, null); }));
          if(!buckets.has(k)) buckets.set(k, []);
          buckets.get(k).push(r);
        });
      } else buckets.set("__all__", rows);
      headers = q.cols.map(function(c, i){ return c.kind === "all" ? "*" : label(c, i); });
      buckets.forEach(function(groupRows){
        var rep = groupRows[0] || {};
        if(q.having && !ev(q.having, rep, groupRows)) return;
        var out = {};
        q.cols.forEach(function(c, i){
          if(c.kind === "all") throw new Error("SELECT * cannot be combined with grouping");
          out[label(c, i)] = ev(c.e, rep, groupRows);
        });
        result.push(out);
      });
    } else {
      headers = null;
      result = rows.map(function(r){
        if(q.cols.length === 1 && q.cols[0].kind === "all") return bare(r);
        var out = {};
        q.cols.forEach(function(c, i){
          if(c.kind === "all"){ Object.assign(out, bare(r)); return; }
          out[label(c, i)] = ev(c.e, r, null);
        });
        return out;
      });
      headers = result.length ? Object.keys(result[0]) : (q.cols[0] && q.cols[0].kind === "all" ? Object.keys(bare(rows[0] || {})) : q.cols.map(label));
    }

    if(q.distinct){
      var seen = new Set(), ded = [];
      result.forEach(function(r){ var k = JSON.stringify(r); if(!seen.has(k)){ seen.add(k); ded.push(r); } });
      result = ded;
    }
    if(q.order){
      result = result.slice().sort(function(a, b){
        for(var i = 0; i < q.order.length; i++){
          var o = q.order[i];
          var av = o.e.t === "col" ? (function(){ try { return get(a, o.e.name); } catch(e){ return null; } })() : ev(o.e, a, null);
          var bv = o.e.t === "col" ? (function(){ try { return get(b, o.e.name); } catch(e){ return null; } })() : ev(o.e, b, null);
          var c = cmpVals(av, bv);
          if(c === null) c = 0;
          if(c !== 0) return o.dir === "desc" ? -c : c;
        }
        return 0;
      });
    }
    if(q.limit !== null && q.limit !== undefined) result = result.slice(0, q.limit);
    if(!headers || !headers.length) headers = result.length ? Object.keys(result[0]) : [];
    return {headers: headers, rows: result, ordered: !!q.order};
  }
  return {run: run};
}

var FORMULA = makeFormula();
var SQL = makeSql();

function colLetter(i){
  var s = "";
  i += 1;
  while(i > 0){ var m = (i - 1) % 26; s = String.fromCharCode(65 + m) + s; i = Math.floor((i - 1) / 26); }
  return s;
}

/* ---- formula ------------------------------------------------------------
   A spreadsheet with one column the reader fills in. The formula is entered
   once and applied down every row, which is how the function is actually used
   and where a wrong reference shows itself immediately.                    */
RENDER.formula = function(body, cfg, key, redraw){
  var tasks = cfg.tasks || [];
  var solved = {};
  var grid = [(cfg.headers || []).slice()].concat((cfg.data || []).map(function(r){ return r.slice(); }));

  function computeExpected(t){
    var out = [];
    for(var r = 1; r < grid.length; r++){
      try { out.push(FORMULA.run(t.expect.replace(/\{row\}/g, String(r + 1)), grid, r)); }
      catch(e){ out.push("#ERROR"); }
    }
    return out;
  }

  tasks.forEach(function(t, ti){
    var wrap = el("div", "code-task");
    var head = el("div", "code-task-head");
    head.appendChild(el("span", "q-num", String(ti + 1)));
    head.appendChild(el("span", "q-text", txt(t.prompt)));
    wrap.appendChild(head);
    if(t.note) wrap.appendChild(el("p", "mini", txt(t.note)));

    var targetCol = t.column;
    var expected = computeExpected(t);

    var bar = el("div", "code-input");
    var lab = el("label", "code-label");
    lab.textContent = colLetter(targetCol) + "2 =";
    lab.setAttribute("for", "f-" + key + "-" + ti);
    var input = el("input", "code-entry mono");
    input.type = "text";
    input.id = "f-" + key + "-" + ti;
    input.setAttribute("spellcheck", "false");
    input.setAttribute("autocapitalize", "off");
    input.placeholder = t.placeholder || "=FUNCTION(...)";
    var runBtn = el("button", "btn", "Fill the column");
    runBtn.type = "button";
    bar.appendChild(lab); bar.appendChild(input); bar.appendChild(runBtn);
    wrap.appendChild(bar);

    var msg = el("p", "code-msg");
    msg.setAttribute("role", "status");
    wrap.appendChild(msg);

    var tblWrap = el("div", "tbl-wrap");
    var tbl = el("table", "tbl code-sheet");
    tblWrap.appendChild(tbl);
    wrap.appendChild(tblWrap);

    function paint(values, errIndex){
      tbl.innerHTML = "";
      var thead = el("thead"), hr = el("tr");
      hr.appendChild(el("th", "code-rownum", ""));
      (cfg.headers || []).forEach(function(h, ci){
        var th = el("th", ci === targetCol ? "is-target" : null,
          "<span class=\"code-col\">" + colLetter(ci) + "</span>" + txt(h));
        hr.appendChild(th);
      });
      thead.appendChild(hr); tbl.appendChild(thead);
      var tb = el("tbody");
      (cfg.data || []).forEach(function(row, ri){
        var tr = el("tr");
        tr.appendChild(el("td", "code-rownum", String(ri + 2)));
        (cfg.headers || []).forEach(function(_, ci){
          if(ci === targetCol){
            var v = values ? values[ri] : "";
            var cell = el("td", "is-target" + (errIndex === ri ? " is-bad" : ""));
            cell.textContent = v === undefined || v === null ? "" : String(v);
            tr.appendChild(cell);
          } else {
            var td = el("td");
            td.textContent = row[ci] === undefined || row[ci] === null ? "" : String(row[ci]);
            tr.appendChild(td);
          }
        });
        tb.appendChild(tr);
      });
      tbl.appendChild(tb);
    }

    function attempt(){
      var src = input.value.trim();
      if(!src){ msg.className = "code-msg"; msg.textContent = ""; paint(null); return; }
      var values = [], firstErr = -1, errText = "";
      for(var r = 1; r < grid.length; r++){
        try { values.push(FORMULA.run(src, grid, r)); }
        catch(e){
          values.push("#ERROR");
          if(firstErr < 0){ firstErr = r - 1; errText = e.message; }
        }
      }
      paint(values, firstErr);
      /* Compare exactly. Trimming or folding case here would accept a formula
         that leaves the very whitespace and capitalisation the task is about. */
      var right = firstErr < 0 && values.length === expected.length && values.every(function(v, i){
        return String(v) === String(expected[i]);
      });
      if(firstErr >= 0){
        msg.className = "code-msg no";
        msg.innerHTML = "<b>Row " + (firstErr + 2) + " could not be worked out:</b> " + escHtml(errText);
      } else if(right){
        solved[ti] = true;
        msg.className = "code-msg ok";
        msg.innerHTML = "<b>That fills the column correctly.</b> " + txt(t.explain || "");
      } else {
        msg.className = "code-msg no";
        msg.innerHTML = "<b>It runs, but the column is not right yet.</b> " +
          txt(t.hint || "Compare the first row against what the task asks for.");
      }
      report(key, Object.keys(solved).length, tasks.length);
    }

    runBtn.addEventListener("click", attempt);
    input.addEventListener("keydown", function(ev){ if(ev.key === "Enter"){ ev.preventDefault(); attempt(); } });

    var foot = el("p", "code-foot");
    var reveal = el("button", "act-reset", "Show the formula");
    reveal.type = "button";
    reveal.addEventListener("click", function(){
      input.value = t.expect.replace(/\{row\}/g, "2");
      attempt();
    });
    foot.appendChild(reveal);
    wrap.appendChild(foot);

    paint(null);
    body.appendChild(wrap);
  });
  report(key, 0, tasks.length);
};

/* ---- sql ----------------------------------------------------------------
   The reader writes a SELECT against tables printed on the page. The result is
   compared with the result of the reference query rather than with its text, so
   any query that genuinely answers the question is accepted.               */
RENDER.sql = function(body, cfg, key){
  var tasks = cfg.tasks || [];
  var solved = {};
  var tables = cfg.tables || {};

  var schema = el("div", "sql-schema");
  schema.appendChild(el("p", "mini", "<b>Tables you can query.</b> Column names are shown with the first rows of data."));
  Object.keys(tables).forEach(function(name){
    var t = tables[name];
    var cols = t.rows.length ? Object.keys(t.rows[0]) : [];
    var box = el("details", "sql-table");
    var sum = el("summary", null, "<b class=\"mono\">" + txt(name) + "</b> <span class=\"mini\">" +
      t.rows.length + " rows &middot; " + cols.join(", ") + "</span>");
    box.appendChild(sum);
    var w = el("div", "tbl-wrap");
    var tb = el("table", "tbl");
    var th = el("thead"), hr = el("tr");
    cols.forEach(function(c){ hr.appendChild(el("th", null, txt(c))); });
    th.appendChild(hr); tb.appendChild(th);
    var bd = el("tbody");
    t.rows.slice(0, 8).forEach(function(r){
      var tr = el("tr");
      cols.forEach(function(c){ var td = el("td"); td.textContent = String(r[c]); tr.appendChild(td); });
      bd.appendChild(tr);
    });
    tb.appendChild(bd); w.appendChild(tb); box.appendChild(w);
    if(t.rows.length > 8) box.appendChild(el("p", "mini", "Showing the first 8 of " + t.rows.length + " rows; a query sees them all."));
    schema.appendChild(box);
  });
  body.appendChild(schema);

  function shape(res){
    return JSON.stringify({
      cols: res.headers.map(function(h){ return String(h).toLowerCase(); }),
      rows: (res.ordered ? res.rows : res.rows.slice().sort(function(a, b){
        return JSON.stringify(a) < JSON.stringify(b) ? -1 : 1;
      })).map(function(r){
        return res.headers.map(function(h){ return String(r[h]); });
      })
    });
  }

  tasks.forEach(function(t, ti){
    var wrap = el("div", "code-task");
    var head = el("div", "code-task-head");
    head.appendChild(el("span", "q-num", String(ti + 1)));
    head.appendChild(el("span", "q-text", txt(t.prompt)));
    wrap.appendChild(head);

    var ta = el("textarea", "code-entry mono sql-entry");
    ta.rows = 3;
    ta.setAttribute("spellcheck", "false");
    ta.id = "q-" + key + "-" + ti;
    ta.placeholder = "SELECT ... FROM ...";
    wrap.appendChild(ta);

    var bar = el("div", "code-input");
    var runBtn = el("button", "btn", "Run the query");
    runBtn.type = "button";
    bar.appendChild(runBtn);
    var reveal = el("button", "act-reset", "Show a query that works");
    reveal.type = "button";
    bar.appendChild(reveal);
    wrap.appendChild(bar);

    var msg = el("p", "code-msg");
    msg.setAttribute("role", "status");
    wrap.appendChild(msg);
    var out = el("div", "sql-result");
    wrap.appendChild(out);

    var expected;
    try { expected = SQL.run(t.expect, tables); }
    catch(e){ expected = null; }

    function attempt(){
      var src = ta.value.trim();
      out.innerHTML = "";
      if(!src){ msg.className = "code-msg"; msg.textContent = ""; return; }
      var res;
      try { res = SQL.run(src, tables); }
      catch(e){
        msg.className = "code-msg no";
        msg.innerHTML = "<b>That query could not run:</b> " + escHtml(e.message);
        return;
      }
      var w = el("div", "tbl-wrap");
      var tbl = el("table", "tbl");
      var th = el("thead"), hr = el("tr");
      res.headers.forEach(function(h){ hr.appendChild(el("th", null, escHtml(h))); });
      th.appendChild(hr); tbl.appendChild(th);
      var bd = el("tbody");
      res.rows.slice(0, 25).forEach(function(r){
        var tr = el("tr");
        res.headers.forEach(function(h){
          var td = el("td");
          var v = r[h];
          td.textContent = v === null || v === undefined ? "" : String(v);
          tr.appendChild(td);
        });
        bd.appendChild(tr);
      });
      tbl.appendChild(bd); w.appendChild(tbl); out.appendChild(w);
      out.appendChild(el("p", "mini", res.rows.length + " row" + (res.rows.length === 1 ? "" : "s") + " returned."));

      if(expected && shape(res) === shape(expected)){
        solved[ti] = true;
        msg.className = "code-msg ok";
        msg.innerHTML = "<b>That answers the question.</b> " + txt(t.explain || "");
      } else {
        msg.className = "code-msg no";
        msg.innerHTML = "<b>The query ran, but the result is not what was asked for.</b> " +
          txt(t.hint || "Check which columns are selected and which rows survive the filter.");
      }
      report(key, Object.keys(solved).length, tasks.length);
    }

    runBtn.addEventListener("click", attempt);
    ta.addEventListener("keydown", function(ev){
      if(ev.key === "Enter" && (ev.metaKey || ev.ctrlKey)){ ev.preventDefault(); attempt(); }
    });
    reveal.addEventListener("click", function(){ ta.value = t.expect; attempt(); });

    body.appendChild(wrap);
  });
  report(key, 0, tasks.length);
};


/* ---- code ---------------------------------------------------------------
   A JavaScript exercise: a stated contract, a starter stub, and a set of tests
   the reader has to make pass. Their code runs inside a Worker built from a
   blob, which works with no network and, crucially, can be terminated - so a
   loop that never ends costs a message rather than the whole page. Where a
   browser refuses to create that Worker the exercise still runs, on the main
   thread, and says so.                                                     */
var CODE_WORKER_SRC =
  "self.onmessage=function(ev){" +
  "var d=ev.data,results=[],run;" +
  "try{run=new Function('__call', d.code + '\\n;return eval(__call);');}" +
  "catch(err){self.postMessage({fatal:String(err&&err.message||err)});return;}" +
  "for(var i=0;i<d.tests.length;i++){" +
  "try{var got=run(d.tests[i]);results.push({ok:true,got:got===undefined?'__undefined__':JSON.parse(JSON.stringify(got===undefined?null:got))});}" +
  "catch(err){results.push({ok:false,err:String(err&&err.message||err)});}}" +
  "self.postMessage({results:results});};";

var CODE_WORKER_URL = null, CODE_WORKER_OK = null;
function codeWorkerUrl(){
  if(CODE_WORKER_URL !== null) return CODE_WORKER_URL;
  try{
    CODE_WORKER_URL = URL.createObjectURL(new Blob([CODE_WORKER_SRC], {type:"text/javascript"}));
  }catch(e){ CODE_WORKER_URL = false; }
  return CODE_WORKER_URL;
}

/* Same shape of answer whether it came from a Worker or from a direct call. */
function runCode(code, calls, done){
  var url = codeWorkerUrl(), settled = false;
  function finish(payload){ if(!settled){ settled = true; done(payload); } }
  if(url){
    var w;
    try{ w = new Worker(url); }
    catch(e){ w = null; CODE_WORKER_OK = false; }
    if(w){
      var timer = setTimeout(function(){
        try{ w.terminate(); }catch(e){}
        finish({timeout:true});
      }, 2000);
      w.onmessage = function(ev){
        clearTimeout(timer);
        CODE_WORKER_OK = true;
        try{ w.terminate(); }catch(e){}
        finish(ev.data);
      };
      w.onerror = function(err){
        clearTimeout(timer);
        try{ w.terminate(); }catch(e){}
        CODE_WORKER_OK = false;
        finish({fatal:String((err && err.message) || "the code could not be loaded")});
      };
      w.postMessage({code:code, tests:calls});
      return;
    }
  }
  /* No Worker available: run here instead, and let the reader know why an
     endless loop would be unrecoverable. */
  CODE_WORKER_OK = false;
  var results = [], run;
  try{ run = new Function("__call", code + "\n;return eval(__call);"); }
  catch(err){ finish({fatal:String(err && err.message || err), unsandboxed:true}); return; }
  for(var i = 0; i < calls.length; i++){
    try{
      var got = run(calls[i]);
      results.push({ok:true, got: got === undefined ? "__undefined__" : JSON.parse(JSON.stringify(got === undefined ? null : got))});
    }catch(err){ results.push({ok:false, err:String(err && err.message || err)}); }
  }
  finish({results:results, unsandboxed:true});
}

function sameValue(a, b){
  if(typeof a === "number" && typeof b === "number"){
    if(!isFinite(a) || !isFinite(b)) return a === b;
    return Math.abs(a - b) < 1e-9;
  }
  return JSON.stringify(a) === JSON.stringify(b);
}
function showValue(v){
  if(v === "__undefined__") return "undefined";
  return JSON.stringify(v);
}

RENDER.code = function(body, cfg, key){
  var exercises = cfg.exercises || [];
  var solved = {};

  exercises.forEach(function(ex, xi){
    var wrap = el("div", "code-task");
    var head = el("div", "code-task-head");
    head.appendChild(el("span", "q-num", String(xi + 1)));
    head.appendChild(el("span", "q-text", txt(ex.prompt)));
    wrap.appendChild(head);
    if(ex.signature) wrap.appendChild(el("p", "code-sig mono", txt(ex.signature)));
    if(ex.note) wrap.appendChild(el("p", "mini", txt(ex.note)));

    var ta = el("textarea", "code-entry mono code-editor");
    ta.rows = Math.min(16, Math.max(6, String(ex.starter || "").split("\n").length + 2));
    ta.setAttribute("spellcheck", "false");
    ta.value = ex.starter || "";
    ta.id = "c-" + key + "-" + xi;
    wrap.appendChild(ta);

    var bar = el("div", "code-input");
    var runBtn = el("button", "btn", "Run the tests");
    runBtn.type = "button";
    bar.appendChild(runBtn);
    var resetBtn = el("button", "act-reset", "Reset the stub");
    resetBtn.type = "button";
    resetBtn.addEventListener("click", function(){ ta.value = ex.starter || ""; });
    bar.appendChild(resetBtn);
    var solBtn = el("button", "act-reset", "Show a solution");
    solBtn.type = "button";
    solBtn.addEventListener("click", function(){ ta.value = ex.solution; attempt(); });
    bar.appendChild(solBtn);
    wrap.appendChild(bar);

    var msg = el("p", "code-msg");
    msg.setAttribute("role", "status");
    wrap.appendChild(msg);
    var list = el("div", "code-tests");
    wrap.appendChild(list);

    function paint(results, note){
      list.innerHTML = "";
      (ex.tests || []).forEach(function(t, ti){
        var r = results ? results[ti] : null;
        var pass = r && r.ok && sameValue(r.got, t.expect);
        var row = el("div", "code-test" + (r ? (pass ? " is-pass" : " is-fail") : ""));
        row.appendChild(el("span", "code-test-mark", r ? (pass ? "pass" : "fail") : "test"));
        var d = el("div", "code-test-body");
        d.appendChild(el("code", null, txt(t.call)));
        var want = el("span", "code-test-want", " → " + showValue(t.expect));
        d.appendChild(want);
        if(r && !pass){
          /* Both halves come back from the reader's own function -- the value it
             returned, or the message it threw -- so both are escaped. */
          d.appendChild(el("span", "code-test-got",
            r.ok ? "your code returned " + escHtml(showValue(r.got)) : "threw: " + escHtml(r.err)));
        }
        if(t.note) d.appendChild(el("span", "code-test-note", txt(t.note)));
        row.appendChild(d);
        list.appendChild(row);
      });
      if(note) list.appendChild(el("p", "mini", note));
    }

    function attempt(){
      msg.className = "code-msg";
      msg.textContent = "Running…";
      runCode(ta.value, (ex.tests || []).map(function(t){ return t.call; }), function(payload){
        if(payload.timeout){
          msg.className = "code-msg no";
          msg.innerHTML = "<b>Your code did not finish.</b> It was stopped after two seconds &mdash; the usual cause is a loop whose condition never becomes false.";
          paint(null);
          return;
        }
        if(payload.fatal){
          msg.className = "code-msg no";
          msg.innerHTML = "<b>That code could not be loaded:</b> " + escHtml(payload.fatal);
          paint(null);
          return;
        }
        var results = payload.results || [];
        var passed = (ex.tests || []).filter(function(t, ti){
          var r = results[ti];
          return r && r.ok && sameValue(r.got, t.expect);
        }).length;
        var total = (ex.tests || []).length;
        paint(results, payload.unsandboxed
          ? "This browser would not create a sandboxed worker, so the code ran on the page itself. Everything works the same, but a loop that never ends cannot be stopped here."
          : null);
        if(passed === total){
          solved[xi] = true;
          msg.className = "code-msg ok";
          msg.innerHTML = "<b>All " + total + " tests pass.</b> " + txt(ex.explain || "");
        } else {
          msg.className = "code-msg no";
          msg.innerHTML = "<b>" + passed + " of " + total + " tests pass.</b> " + txt(ex.hint || "");
        }
        report(key, Object.keys(solved).length, exercises.length);
      });
    }

    runBtn.addEventListener("click", attempt);
    ta.addEventListener("keydown", function(ev){
      if(ev.key === "Enter" && (ev.metaKey || ev.ctrlKey)){ ev.preventDefault(); attempt(); }
      if(ev.key === "Tab"){
        ev.preventDefault();
        var st = ta.selectionStart, en = ta.selectionEnd;
        ta.value = ta.value.slice(0, st) + "  " + ta.value.slice(en);
        ta.selectionStart = ta.selectionEnd = st + 2;
      }
    });

    paint(null);
    body.appendChild(wrap);
  });
  report(key, 0, exercises.length);
};

/* =========================================================================
   GLOSSARY
   ====================================================================== */
function buildGlossary(){
  var host = document.getElementById("glossaryMount");
  if(!host || !GLOSSARY.length) return;
  host.innerHTML = "";
  var tools = el("div", "gloss-tools");
  var search = el("input", "gloss-search");
  search.type = "search";
  search.placeholder = "Search the chapter vocabulary…";
  search.setAttribute("aria-label", "Search the chapter vocabulary");
  tools.appendChild(search);
  /* The tabs are derived from the objectives the terms in THIS module actually
     carry, so a module can never be handed a tab that filters to nothing, and
     the objective's own name from the module config becomes the spoken label. */
  var present = [];
  GLOSSARY.forEach(function(g){ if(g.lo && present.indexOf(g.lo) === -1) present.push(g.lo); });
  present.sort();
  var filters = ["all"].concat(present);
  var active = "all";
  var fBtns = [];
  filters.forEach(function(f){
    var b = el("button", "tab-btn", f === "all" ? "Every term" : "Objective " + f);
    b.type = "button";
    if(f !== "all"){
      var oName = OBJ_NAMES[f];
      b.setAttribute("aria-label", oName ? "Objective " + f + ": " + oName : "Objective " + f);
      if(oName) b.title = oName;
    }
    b.setAttribute("aria-selected", f === "all" ? "true" : "false");
    b.addEventListener("click", function(){
      active = f;
      fBtns.forEach(function(x, xi){ x.setAttribute("aria-selected", filters[xi] === f ? "true" : "false"); });
      paint();
    });
    fBtns.push(b);
    tools.appendChild(b);
  });
  host.appendChild(tools);
  var list = el("div", "gloss-list");
  host.appendChild(list);
  var count = el("p", "hint");
  host.appendChild(count);

  function paint(){
    var q = search.value.trim().toLowerCase();
    list.innerHTML = "";
    var shown = 0;
    GLOSSARY.forEach(function(g){
      if(active !== "all" && g.lo !== active) return;
      if(q && (g.t + " " + g.d + " " + (g.e || "")).toLowerCase().indexOf(q) === -1) return;
      shown++;
      var card = el("dl", "gloss-card");
      card.appendChild(el("dt", null, "<span class=\"gloss-lo\">" + txt(g.lo) + "</span>" + txt(g.t)));
      var dd = el("dd", null, txt(g.d));
      if(g.e) dd.appendChild(el("span", "gloss-ex", "<b>For example:</b> " + txt(g.e)));
      card.appendChild(dd);
      list.appendChild(card);
    });
    if(!shown) list.appendChild(el("p", "gloss-empty", "No term matches that search."));
    count.textContent = shown + " of " + GLOSSARY.length + " terms shown.";
  }
  search.addEventListener("input", paint);
  paint();
}

/* =========================================================================
   FINAL CHALLENGE
   Twenty-five situations, scored by objective rather than as one number, so a
   weak area is visible instead of averaged away.
   ====================================================================== */
/* Each module supplies its own objective names, so the per-objective breakdown
   works for any module rather than only the one this map was written for. */
var OBJ_NAMES = window.MIS_OBJECTIVES || {
  "1.1": "The digital world",
  "1.2": "What an information system is",
  "1.3": "The dual nature of information systems",
  "1.4": "Computer ethics, privacy, and property",
  "1.5": "Information systems and competitive strategy",
  "1.6": "Using AI to improve business workflows"
};
function buildFinal(){
  var host = document.getElementById("finalMount");
  if(!host || !FINAL.questions || !FINAL.questions.length) return;
  var qs = FINAL.questions;
  var answered = new Array(qs.length).fill(null);
  var order = qs.map(function(_, i){ return i; });

  host.innerHTML = "";
  var head = el("div", "act-head");
  head.appendChild(el("span", "act-kind", "Final challenge"));
  var h = el("h4", "act-title", txt(FINAL.title || "Final challenge"));
  h.id = "act-final";
  head.appendChild(h);
  head.appendChild(el("span", "act-state", ""));
  host.appendChild(head);
  host.setAttribute("aria-labelledby", h.id);
  host.appendChild(el("p", "act-how", txt(FINAL.how ||
    "Answer all twenty-five, then score. Each objective is reported separately so you can see exactly where to go back.")));
  var body = el("div", "act-body");
  host.appendChild(body);
  var foot = el("div", "act-foot");
  host.appendChild(foot);

  var progress = el("p", "hint");
  body.appendChild(progress);
  var qHost = el("div");
  body.appendChild(qHost);
  var result = el("div");
  result.style.marginTop = "16px";
  result.setAttribute("role", "status");
  result.setAttribute("aria-live", "polite");
  result.tabIndex = -1;
  body.appendChild(result);

  order.forEach(function(qi, pos){
    var q = qs[qi];
    var wrap = el("div", "q");
    var qh = el("div", "q-head");
    qh.appendChild(el("span", "q-num", String(pos + 1)));
    qh.appendChild(el("span", "q-text", txt(q.q)));
    wrap.appendChild(qh);
    var list = el("ul", "opts");
    var buttons = [];
    q.opts.forEach(function(o, oi){
      var li = el("li");
      var b = el("button", "opt");
      b.type = "button";
      b.appendChild(el("span", "opt-key", LETTERS[oi]));
      b.appendChild(el("span", null, txt(o)));
      b.addEventListener("click", function(){
        answered[qi] = oi;
        buttons.forEach(function(bb, bi){ bb.classList.toggle("is-picked-final", bi === oi); bb.style.borderColor = bi === oi ? "var(--accent)" : ""; bb.style.background = bi === oi ? "var(--accent-soft)" : ""; });
        paintProgressLine();
      });
      buttons.push(b);
      li.appendChild(b);
      list.appendChild(li);
    });
    wrap.appendChild(list);
    qHost.appendChild(wrap);
  });

  function paintProgressLine(){
    var n = answered.filter(function(a){ return a !== null; }).length;
    progress.textContent = n + " of " + qs.length + " answered.";
    scoreBtn.disabled = n < qs.length;
    scoreBtn.textContent = n < qs.length ? "Answer all " + qs.length + " to score" : "Score the challenge";
  }

  var scoreBtn = el("button", "btn", "");
  scoreBtn.type = "button";
  scoreBtn.addEventListener("click", function(){
    var byObj = {}, total = 0;
    qs.forEach(function(q, qi){
      var o = q.obj || "1.1";
      if(!byObj[o]) byObj[o] = {n: 0, t: 0};
      byObj[o].t++;
      if(answered[qi] === q.a){ byObj[o].n++; total++; }
    });
    var pct = Math.round(total / qs.length * 100);
    result.innerHTML = "";
    var v = el("div", "verdict");
    var ring = el("div", "score-ring");
    ring.style.setProperty("--pct", String(pct));
    ring.appendChild(el("span", "score-big", pct + "%"));
    v.appendChild(ring);
    v.appendChild(el("div", "score-note",
      "<b>" + total + " of " + qs.length + " correct.</b> Every question below now shows which answer was right and what each option genuinely was. The bars break the same score out by objective, because an average hides the one topic you actually need to reread."));
    result.appendChild(v);

    var bd = el("div", "breakdown");
    Object.keys(OBJ_NAMES).forEach(function(o){
      if(!byObj[o]) return;
      var row = el("div", "bd-row");
      row.appendChild(el("span", "bd-name", OBJ_NAMES[o]));
      var bar = el("span", "bd-bar");
      var fill = el("i");
      fill.style.width = Math.round(byObj[o].n / byObj[o].t * 100) + "%";
      bar.appendChild(fill);
      row.appendChild(bar);
      row.appendChild(el("span", "bd-val", byObj[o].n + "/" + byObj[o].t));
      bd.appendChild(row);
    });
    result.appendChild(bd);

    /* reveal every question */
    var wraps = qHost.querySelectorAll(".q");
    order.forEach(function(qi, pos){
      var q = qs[qi];
      var buttons = wraps[pos].querySelectorAll(".opt");
      Array.prototype.forEach.call(buttons, function(bb, bi){
        bb.disabled = true;
        bb.style.borderColor = ""; bb.style.background = "";
        bb.className = "opt " + (bi === q.a ? "is-correct" : (bi === answered[qi] ? "is-wrong" : "is-muted"));
        if(q.why && q.why[bi]){
          bb.querySelector("span:last-child").appendChild(
            el("span", "opt-why", (bi === q.a ? "<b>Correct.</b> " + whyText(q.why[bi]) : txt(q.why[bi]))));
        }
      });
    });
    report("__final__", qs.length, qs.length);
    scoreBtn.disabled = true;
    toast("Scored " + total + " of " + qs.length + ".");
    result.focus();
    result.scrollIntoView({block: "nearest"});
  });
  foot.appendChild(scoreBtn);
  var reset = el("button", "act-reset", "Clear and start the challenge over");
  reset.type = "button";
  reset.addEventListener("click", function(){
    store.clear("__final__");
    var entry = findEntry("__final__");
    if(entry) entry.done = 0;
    buildFinal();
    paintProgress();
    var fresh = document.getElementById("act-final");
    if(fresh){ fresh.tabIndex = -1; fresh.focus(); }
  });
  foot.appendChild(reset);

  var finalEntry = findEntry("__final__");
  if(finalEntry){ finalEntry.total = qs.length; }
  else registry.push({key: "__final__", section: "final", total: qs.length, done: 0});
  paintProgressLine();
}

/* =========================================================================
   PAGE WIRING
   ====================================================================== */
var sidebarController = null;

function buildSidebar(){
  var nav = document.getElementById("navList");
  if(!nav) return;
  nav.innerHTML = "";
  var secs = document.querySelectorAll("main .chapter");
  Array.prototype.forEach.call(secs, function(sec, i){
    var a = el("a", "side-link");
    a.href = "#" + sec.id;
    a.appendChild(el("span", "side-num", String(i + 1).padStart(2, "0")));
    a.appendChild(el("span", "side-txt", sec.getAttribute("data-title") || sec.id));
    var sc = el("span", "side-score");
    sc.setAttribute("data-for", sec.id);
    a.appendChild(sc);
    a.addEventListener("click", function(){
      if(sidebarController) sidebarController(false, false);
    });
    nav.appendChild(a);
  });

  if("IntersectionObserver" in window){
    var links = nav.querySelectorAll(".side-link");
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(en){
        if(!en.isIntersecting) return;
        Array.prototype.forEach.call(links, function(l){
          l.setAttribute("aria-current", l.getAttribute("href") === "#" + en.target.id ? "true" : "false");
        });
      });
    }, {rootMargin: "-80px 0px -70% 0px", threshold: 0});
    Array.prototype.forEach.call(secs, function(s){ io.observe(s); });
  }
}

function wireChrome(){
  var themeBtn = document.getElementById("themeBtn");
  function applyTheme(t){
    if(t === "dark") document.documentElement.setAttribute("data-theme", "dark");
    else document.documentElement.removeAttribute("data-theme");
    if(themeBtn){
      themeBtn.textContent = t === "dark" ? "Light" : "Dark";
      themeBtn.setAttribute("aria-label", t === "dark" ? "Switch to the light theme" : "Switch to the dark theme");
    }
  }
  var saved = null;
  try{ saved = localStorage.getItem(THEME_KEY); }catch(e){}
  applyTheme(saved === "dark" ? "dark" : "light");
  if(themeBtn) themeBtn.addEventListener("click", function(){
    var now = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
    applyTheme(now);
    try{ localStorage.setItem(THEME_KEY, now); }catch(e){}
  });

  var menuBtn = document.getElementById("menuBtn");
  var sidebar = document.getElementById("sidebar");
  var mobileNav = window.matchMedia("(max-width: 1000px)");
  if(menuBtn && sidebar){
    sidebarController = function(open, returnFocus){
      var canOpen = mobileNav.matches && open;
      sidebar.classList.toggle("is-open", canOpen);
      menuBtn.setAttribute("aria-expanded", canOpen ? "true" : "false");
      if(mobileNav.matches && !canOpen){
        sidebar.setAttribute("inert", "");
        sidebar.setAttribute("aria-hidden", "true");
      } else {
        sidebar.removeAttribute("inert");
        sidebar.removeAttribute("aria-hidden");
      }
      if(returnFocus) menuBtn.focus();
      if(canOpen){
        setTimeout(function(){
          var first = sidebar.querySelector("a,button,[tabindex]:not([tabindex='-1'])");
          if(first) first.focus();
        }, 0);
      }
    };
    menuBtn.addEventListener("click", function(){
      sidebarController(!sidebar.classList.contains("is-open"), false);
    });
    var syncNav = function(){ sidebarController(false, false); };
    if(mobileNav.addEventListener) mobileNav.addEventListener("change", syncNav);
    else if(mobileNav.addListener) mobileNav.addListener(syncNav);
    syncNav();
  }

  var resetBtn = document.getElementById("resetBtn");
  if(resetBtn) resetBtn.addEventListener("click", function(){
    if(!window.confirm("Clear every answer and every saved result on this page?")) return;
    store.clear();
    location.reload();
  });

  document.addEventListener("keydown", function(ev){
    if(ev.key === "Escape" && sidebarController && sidebar && sidebar.classList.contains("is-open")) sidebarController(false, true);
  });

  var bar = document.querySelector(".topbar");
  if(bar){
    var setH = function(){
      document.documentElement.style.setProperty("--topbar-h", bar.offsetHeight + "px");
    };
    setH();
    window.addEventListener("resize", setH);
  }
}

function boot(){
  wireChrome();
  var hosts = document.querySelectorAll("[data-activity]");
  Array.prototype.forEach.call(hosts, function(host){
    var key = host.getAttribute("data-activity");
    var cfg = ACT[key];
    if(!cfg) return;
    var sec = host.closest(".chapter");
    registry.push({key: key, section: sec ? sec.id : "?", total: 0, done: 0});
    build(key, cfg, host);
  });
  buildGlossary();
  buildFinal();
  buildSidebar();
  paintProgress();

  /* per-section reset buttons */
  Array.prototype.forEach.call(document.querySelectorAll("[data-reset-section]"), function(btn){
    btn.addEventListener("click", function(){
      var sid = btn.getAttribute("data-reset-section");
      registry.forEach(function(r){ if(r.section === sid){ store.clear(r.key); r.done = 0; } });
      location.hash = "#" + sid;
      location.reload();
    });
  });
}

if(document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
else boot();
})();
