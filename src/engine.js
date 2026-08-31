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
var STORE_KEY = "mis-ch1-progress-v2";
var THEME_KEY = "mis-ch1-theme-v1";

/* ---------------------------------------------------------------- helpers */
function el(tag, cls, html){
  var n = document.createElement(tag);
  if(cls) n.className = cls;
  if(html != null) n.innerHTML = html;
  return n;
}
function txt(s){ return String(s == null ? "" : s); }
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

var store = (function(){
  var data = {};
  try{ data = JSON.parse(localStorage.getItem(STORE_KEY) || "{}") || {}; }catch(e){ data = {}; }
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
    b.textContent = it.t;
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
    b.textContent = o.t;
    b.addEventListener("click", function(){
      if(solved[o.i]) return;
      pickL = (pickL === o.i) ? null : o.i;
      status.textContent = pickL === null ? "Selection cleared." : "Selected " + o.t + ". Choose its definition.";
      paint();
    });
    nodesL[o.i] = b;
    colL.appendChild(b);
  });
  right.forEach(function(o){
    var b = el("button", "match-item");
    b.type = "button";
    b.textContent = o.t;
    b.addEventListener("click", function(){
      if(pickL === null || solved[o.i]) return;
      tries++;
      if(pickL === o.i){
        solved[o.i] = true;
        var badge = el("span", "match-badge", "Matched");
        nodesL[o.i].insertBefore(badge, nodesL[o.i].firstChild);
        if(pairs[o.i].why) nodesR[o.i].appendChild(el("span", "match-why", txt(pairs[o.i].why)));
        status.textContent = "Matched " + pairs[o.i].l + " to " + pairs[o.i].r + ".";
        pickL = null;
        paint();
      } else {
        var miss = nodesR[o.i];
        status.textContent = nodesL[pickL].textContent + " does not match " + o.t + ". Try another definition.";
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
    status.textContent = steps[si].t + " moved to position " + (pos + delta + 1) + ".";
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
        up.type = "button"; up.title = "Move up"; up.setAttribute("aria-label", "Move " + steps[si].t + " up");
        up.setAttribute("data-move", "up");
        up.disabled = pos === 0;
        up.addEventListener("click", function(){
          move(si, pos, -1, "up");
        });
        var dn = el("button", null, "▼");
        dn.type = "button"; dn.title = "Move down"; dn.setAttribute("aria-label", "Move " + steps[si].t + " down");
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
    row.appendChild(document.createTextNode(txt(bk.before)));
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
    row.appendChild(document.createTextNode(txt(bk.after)));
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
  var filters = ["all", "1.1", "1.2", "1.3", "1.4"];
  var active = "all";
  var fBtns = [];
  filters.forEach(function(f){
    var b = el("button", "tab-btn", f === "all" ? "Every term" : "Objective " + f);
    b.type = "button";
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
var OBJ_NAMES = {
  "1.1": "The digital world",
  "1.2": "What an information system is",
  "1.3": "The dual nature of information systems",
  "1.4": "Computer ethics, privacy, and property",
  "1.5": "Information systems and competitive strategy"
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
