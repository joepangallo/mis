/* runtime.js — in-page runtime for the Week 1 homework pages. Plain script (IIFE), inlined by build.mjs
   after helpers.js and the window.HW_PAGE JSON. Every piece of DOM this file creates goes through h()
   and textContent: no HTML strings are ever parsed and no code is ever generated at run time.
   See DOM-CONTRACT.md for the ids, data-attributes and states. */
(function () {
  'use strict';
  var H = window.HWHelpers;
  var PAGE = window.HW_PAGE;
  if (!H || !PAGE || !PAGE.workspaces) return;

  // ---------------------------------------------------------------------------------------------
  // DOM helpers
  // ---------------------------------------------------------------------------------------------
  function h(tag, attrs) {
    var el = document.createElement(tag);
    if (attrs) {
      Object.keys(attrs).forEach(function (k) {
        var v = attrs[k];
        if (v === null || v === undefined || v === false) return;
        if (k === 'class') el.className = v;
        else if (k === 'text') el.textContent = v;
        else if (/^on/i.test(k)) { if (typeof v === 'function') el.addEventListener(k.slice(2), v); }   // never an inline on* attribute
        else if (v === true) el.setAttribute(k, '');
        else el.setAttribute(k, String(v));
      });
    }
    for (var i = 2; i < arguments.length; i++) append(el, arguments[i]);
    return el;
  }
  function append(el, child) {
    if (child === null || child === undefined || child === false) return;
    if (Array.isArray(child)) { child.forEach(function (c) { append(el, c); }); return; }
    if (child instanceof Node) { el.appendChild(child); return; }
    el.appendChild(document.createTextNode(String(child)));
  }
  function clear(el) { while (el && el.firstChild) el.removeChild(el.firstChild); }
  function $(id) { return document.getElementById(id); }
  function qsa(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
  function nowIso() { return new Date().toISOString(); }
  function timeNow() { return new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }); }
  // Editors grow with their content through CSS `field-sizing: content` where the browser supports it; the
  // JS measurement below is only the fallback (and is re-run on resize so a re-wrap can never hide a line).
  var FIELD_SIZING = (function () { try { return typeof CSS !== 'undefined' && !!CSS.supports && CSS.supports('field-sizing', 'content'); } catch (e) { return false; } })();
  function autoSize(el) {
    if (!el || el.tagName !== 'TEXTAREA') return;
    if (FIELD_SIZING) { el.style.height = ''; return; }
    el.style.height = 'auto';
    el.style.height = Math.max(el.classList.contains('text-editor') ? 0 : 96, el.scrollHeight + 2) + 'px';
  }
  function autoSizeAll() { qsa('textarea.editor').forEach(autoSize); }
  // Print mirrors: every editor has a sibling pre.print-text that the print stylesheet shows instead of the
  // textarea — a form control cannot fragment across pages and re-wraps at print width, a <pre> does both.
  function fillPrintMirrors() {
    qsa('pre.print-text[data-print-for]').forEach(function (pre) {
      var ta = $(pre.getAttribute('data-print-for'));
      pre.textContent = ta ? ta.value : '';
    });
    // the student's name lives in the toolbar, which does not print: the hero's print-only line carries it
    var pn = $('printName');
    if (pn) pn.textContent = (els.name && els.name.value.trim()) || '(no name entered)';
  }

  // ---------------------------------------------------------------------------------------------
  // State
  // ---------------------------------------------------------------------------------------------
  var KEYS = H.storageKeys(PAGE.chapter);
  var ROOT = H.PYTHON_ROOT;
  var CDN = PAGE.cdn;
  var PRIMARY = PAGE.primaryDb;
  var PRIMARY_NAME = H.basename(PRIMARY);
  var NO_DB_TEXT = (PAGE.messages && PAGE.messages.noDb) || 'No database yet — run the import first.';
  var NO_DB_ACTION = (PAGE.messages && PAGE.messages.noDbAction) || null;
  var AFTER_RESET_TEXT = (PAGE.messages && PAGE.messages.afterReset) || (PAGE.seedDb ? 'Database reset to the original ' + PRIMARY_NAME : 'Database removed — run the import again to recreate it');
  var WRONG_NAME_ADVICE = (PAGE.messages && PAGE.messages.wrongName) || null;   // null → the helper's chapter-1 wording
  var SIDE_DBS = (PAGE.messages && PAGE.messages.sideDbs) || {};                  // path → note for a db one of the page's own steps creates on purpose
  var SQL = null, sqlPromise = null;
  var py = null, pyPromise = null, pyHw = null;
  var store = new Map();          // relative path → Uint8Array (non-empty means "exists")
  var embeddedCache = Object.create(null);   // relative path → Uint8Array (null prototype: `cat constructor` must miss)
  var state = H.emptyState();
  var selectedDb = PRIMARY;
  var busy = false;
  var focusReturn = null;         // the [data-engine-button] that had focus when the page went busy
  var focusParked = null;         // the output that holds keyboard focus while that button is disabled
  var noticeKind = null;          // what #dbNameNotice shows: 'nodb' | 'wrongname' | 'side' | 'bad' | null (hidden)
  var saveTimer = null;
  var saveDegraded = 0;           // 0 = the whole state fits in localStorage; 1/2 = saved with outputs dropped (H.slimState)
  var statusSticky = false;       // a status carrying an action (Undo) is not replaced by the routine "Saved locally" tick …
  var statusStickyUntil = 0;      // … for STICKY_MS, so a save warning can never be hidden for long
  var STICKY_MS = 60000;
  var lastTickAt = 0, lastTickLevel = -1;
  var TICK_THROTTLE_MS = 10000;   // the "Saved locally" live-region tick is announced at most this often
  var lastCleared = {};           // workspace id (or 'python') → { text, record } for Undo after Clear
  var pyFailures = 0;             // consecutive loadPyodide failures on this page
  var pendingDbRestore = [];
  var fsDbPaths = new Set();      // db paths this page has written into the Python FS
  var noticedDbs = new Set();
  var capture = { out: '', err: '', decOut: null, decErr: null };
  var WS = {};                    // id → workspace descriptor
  PAGE.workspaces.forEach(function (w) { WS[w.id] = w; });

  var els = {
    root: document.documentElement,
    name: $('studentName'), status: $('saveStatus'),
    downloadDb: $('downloadDbBtn'), openDb: $('openDbBtn'), openInput: $('openDbInput'),
    exportBtn: $('exportBtn'), printBtn: $('printBtn'),
    dbName: $('dbName'), dbSelectRow: $('dbSelectRow'), dbSelect: $('dbSelect'), dbNotice: $('dbNameNotice'),
    engSql: $('engineSqlite'), engPy: $('enginePython'),
    dbTables: $('dbTables'), dbDetail: $('dbDetail'),
    terminal: $('terminal'), transcript: $('terminalTranscript'), termStatus: $('terminalStatus'), termInput: $('terminalInput'), termRun: $('terminalRunBtn'),
    pyCode: $('pythonCode'), pyRun: $('pythonRunBtn'), pyClear: $('pythonClearBtn'), pyOut: $('pythonOutput'),
    resetDb: $('resetDbBtn'), clearWork: $('clearWorkBtn')
  };

  // ---------------------------------------------------------------------------------------------
  // Status line, busy flag
  // ---------------------------------------------------------------------------------------------
  // action: optional { label, onclick } rendered as a small button after the text (used for Undo after Clear).
  function setStatus(text, level, strongText, action) {
    clear(els.status);
    statusSticky = !!action;
    statusStickyUntil = action ? Date.now() + STICKY_MS : 0;
    els.status.className = 'save-status' + (level === 'warn' ? ' is-warn' : level === 'bad' ? ' is-bad' : '');
    var span = h('span', { class: 'status-text' });
    if (strongText) { append(span, h('strong', { text: strongText })); append(span, ' · '); }
    append(span, text);
    els.status.appendChild(span);
    if (action) els.status.appendChild(h('button', { type: 'button', class: 'btn ghost small status-action', onclick: function () { statusSticky = false; action.onclick(); } }, action.label));
  }
  // The routine save tick: never replaces a status that carries an action, and is re-announced at most every
  // TICK_THROTTLE_MS so a screen reader is not interrupted on every keystroke. Says so when outputs were dropped.
  function savedStatus() {
    var now = Date.now();
    if (statusSticky && now < statusStickyUntil) return;
    statusSticky = false;
    var isTick = els.status.classList.contains('is-tick');
    if (isTick && lastTickLevel === saveDegraded && now - lastTickAt < TICK_THROTTLE_MS) return;
    lastTickAt = now; lastTickLevel = saveDegraded;
    if (saveDegraded) setStatus(H.saveFallbackStatus(saveDegraded), 'warn', 'Saved partly');
    else setStatus(timeNow(), '', 'Saved locally');
    els.status.classList.add('is-tick');
  }
  // Where keyboard focus waits while the activated engine button is disabled: the output that shows "Running…" /
  // "Downloading Python…" for that button (a box's output, the terminal status line, the Python output, the engine
  // item for a Retry), so Tab does not restart from the top and a screen reader reads the progress.
  function busyFocusTarget(btn) {
    var ws = btn.getAttribute('data-ws');
    if (ws) return $('out-' + ws);
    if (btn === els.termRun) return els.termStatus || els.terminal;
    if (btn === els.pyRun) return els.pyOut;
    var item = btn.closest ? btn.closest('.engine-item') : null;
    return item || els.status;
  }
  function focusQuietly(el) { try { el.focus({ preventScroll: true }); } catch (e) { el.focus(); } }
  function setBusy(on) {
    busy = on;
    els.root.setAttribute('aria-busy', on ? 'true' : 'false');
    if (on) { var a = document.activeElement; focusReturn = a && a.hasAttribute && a.hasAttribute('data-engine-button') ? a : null; }
    qsa('[data-engine-button]').forEach(function (b) { b.disabled = on; });
    if (on && focusReturn) {
      // disabling the activated button drops keyboard focus to <body> (lazily — Chrome's focus fixup runs at the next
      // render, so activeElement still reads the button here): park focus on the button's output for the run
      var t = busyFocusTarget(focusReturn);
      if (t) { t.tabIndex = -1; focusQuietly(t); if (document.activeElement === t) focusParked = t; }
    }
    if (!on && focusReturn) {
      // the run is over: put focus back on the button it started from, unless the student moved it meanwhile
      var f = focusReturn, p = focusParked, cur = document.activeElement; focusReturn = null; focusParked = null;
      if (f.isConnected && !f.disabled && !f.hidden && (cur === document.body || cur === p)) focusQuietly(f);
    }
  }
  function withEngine(fn) {
    setBusy(true);
    return Promise.resolve().then(fn).then(function (v) { setBusy(false); return v; }, function (e) { setBusy(false); throw e; });
  }
  function waitMessage() { return (!SQL && sqlPromise) ? 'Wait for SQLite to finish loading.' : 'Wait for the current run to finish.'; }

  // ---------------------------------------------------------------------------------------------
  // Embedded files
  // ---------------------------------------------------------------------------------------------
  // PAGE.files is a plain JSON object, so a bare `PAGE.files[name]` also finds Object.prototype's own members:
  // `ls constructor`, `cat toString` and `ls __proto__` would all behave as if such a file existed. Every lookup
  // goes through hasFile()/embeddedFile(), which only ever see the page's own keys.
  function hasFile(path) { return Object.prototype.hasOwnProperty.call(PAGE.files, path); }
  function embeddedFile(path) { return hasFile(path) ? PAGE.files[path] : null; }
  function fileBytes(path) {
    if (embeddedCache[path]) return embeddedCache[path];
    var f = embeddedFile(path);
    if (!f) return null;
    var bytes = f.kind === 'text' ? new TextEncoder().encode(f.body) : H.base64ToBytes(f.body);
    embeddedCache[path] = bytes;
    return bytes;
  }
  function fileText(path) {
    var f = embeddedFile(path);
    if (!f) return null;
    return f.kind === 'text' ? f.body : null;
  }
  function download(name, data, type) {
    var blob = new Blob([data], { type: type || 'application/octet-stream' });
    var url = URL.createObjectURL(blob);
    var a = h('a', { href: url, download: H.safeFileName(name) });
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(function () { URL.revokeObjectURL(url); }, 2000);
  }

  // ---------------------------------------------------------------------------------------------
  // Engine strip
  // ---------------------------------------------------------------------------------------------
  // retryFn runs when the strip's button is pressed; retryLabel is its visible name ("Retry SQLite" / "Reload page").
  function engineState(el, stateName, title, detail, retryFn, retryLabel) {
    if (!el) return;
    el.setAttribute('data-state', stateName);
    var strong = el.querySelector('strong'), det = el.querySelector('.engine-detail'), btn = el.querySelector('button');
    if (strong) strong.textContent = title;
    if (det) det.textContent = detail || '';
    if (btn) { btn.hidden = !retryFn; btn.onclick = retryFn || null; if (retryFn) btn.textContent = retryLabel || 'Retry'; }
  }
  function probe(url) {
    return fetch(url, { mode: 'cors', cache: 'no-store' }).then(function (r) { return r.ok; }, function () { return false; });
  }
  // A loader <script> tag that failed when the page opened (offline) is never re-fetched by the browser; Retry
  // adds a fresh tag with the same src, integrity and crossorigin so the pinned hash still applies.
  function injectLoader(entry) {
    return new Promise(function (resolve, reject) {
      var s = h('script', { src: entry.url, integrity: entry.integrity, crossorigin: 'anonymous' });
      s.addEventListener('load', function () { resolve(); });
      s.addEventListener('error', function () { s.remove(); reject(new Error('The loader script could not be downloaded.')); });
      document.head.appendChild(s);
    });
  }
  // stage: 'loader' / 'wasm' = a hash-pinned download failed; 'init' / 'runtime' = the files arrived but did not start.
  function failureMessage(engine, reachable, stage) {
    if (engine === 'sqlite') {
      if (!reachable) return 'SQLite could not be downloaded. Check your internet connection, then press Retry. Offline alternative: DB Browser for SQLite with the files in the Files list.';
      return stage === 'init'
        ? 'SQLite’s files are reachable but did not start — press Retry; if it keeps failing, reload this page (your work is saved) and tell your professor.'
        : 'The file on the CDN does not match this page’s build — tell your professor.';
    }
    if (!reachable) return 'Python could not be downloaded. Check your internet connection, then press Retry. Offline alternative: a locally installed Python 3 with the files in the Files list.';
    return stage === 'loader'
      ? 'The file on the CDN does not match this page’s build — tell your professor.'
      : 'Python’s files are reachable but did not load — press Retry; if it keeps failing, reload this page (your work is saved) and tell your professor.';
  }
  var PY_RELOAD_MESSAGE = 'Python’s files did not finish downloading. Reload this page and press Run again — your work is saved.';
  var PY_RELOAD_REPEAT = 'Python’s files are reachable but did not load twice — reload this page (your work is saved); if it keeps failing, tell your professor.';
  function reloadPage() { flush(); window.location.reload(); }

  // ---------------------------------------------------------------------------------------------
  // sql.js
  // ---------------------------------------------------------------------------------------------
  function retrySql() { withEngine(ensureSql).catch(function () { /* the strip shows the reason */ }); }
  function ensureSql() {
    if (SQL) return Promise.resolve(SQL);
    if (sqlPromise) return sqlPromise;
    engineState(els.engSql, 'loading', 'Loading SQLite…', 'about 0.7 MB, cached by the browser');
    var probeUrl = CDN.sqljs.loader.url, stage = 'loader';
    sqlPromise = Promise.resolve().then(function () {
      if (typeof window.initSqlJs === 'function') return null;
      return injectLoader(CDN.sqljs.loader);
    }).then(function () {
      if (typeof window.initSqlJs !== 'function') throw new Error('The SQLite loader script did not load.');
      stage = 'wasm';
      probeUrl = CDN.sqljs.wasm.url;
      return fetch(CDN.sqljs.wasm.url, { integrity: CDN.sqljs.wasm.integrity, mode: 'cors' });
    }).then(function (resp) {
      if (!resp.ok) throw new Error('SQLite download failed (' + resp.status + ').');
      return resp.arrayBuffer();
    }).then(function (wasmBinary) {
      stage = 'init';
      return window.initSqlJs({ wasmBinary: wasmBinary });
    }).then(function (lib) {
      SQL = lib;
      var ver = '';
      try { var t = new SQL.Database(); ver = String(t.exec('SELECT sqlite_version()')[0].values[0][0]); t.close(); } catch (e) { ver = '?'; }
      engineState(els.engSql, 'ready', 'SQLite ready', 'SQLite ' + ver + ' · every Run opens your database file, runs the box, and saves the file again');
      applyPendingDbRestore();
      refreshDbUi();
      return SQL;
    }).catch(function (err) {
      sqlPromise = null;
      return probe(probeUrl).then(function (reachable) {
        var msg = failureMessage('sqlite', reachable, stage) + ' (' + (err && err.message ? err.message : String(err)) + ')';
        engineState(els.engSql, 'error', 'SQLite did not load', msg, retrySql, 'Retry SQLite');
        renderTablesMessage(msg, 'error');
        throw new Error(msg);
      });
    });
    return sqlPromise;
  }

  // ---------------------------------------------------------------------------------------------
  // Database store
  // ---------------------------------------------------------------------------------------------
  function dbExists(path) { var b = store.get(path); return !!(b && b.length > 0); }
  function dbPaths() { return Array.from(store.keys()).filter(dbExists).sort(); }
  function checkDbBytes(bytes) {
    if (!bytes) return { ok: false, reason: 'no data' };
    if (bytes.length > H.DB_MAX_BYTES) return { ok: false, reason: 'larger than ' + H.humanBytes(H.DB_MAX_BYTES) };
    if (bytes.length === 0) return { ok: true, empty: true };
    if (!H.isSqliteHeader(bytes)) return { ok: false, reason: 'the SQLite file header is missing' };
    if (!SQL) return { ok: false, reason: 'SQLite is not loaded yet' };
    var db = null;
    try {
      db = new SQL.Database(bytes);
      var r = db.exec('PRAGMA quick_check');
      var v = r.length && r[0].values.length ? String(r[0].values[0][0]) : 'no result';
      if (v === 'ok') return { ok: true };
      // quick_check on a damaged file is a multi-line dump; the status line gets its first line only
      var lines = v.split('\n');
      return { ok: false, reason: lines[0] + (lines.length > 1 ? ' …' : '') };
    } catch (e) {
      return { ok: false, reason: e && e.message ? e.message : String(e) };
    } finally {
      if (db) { try { db.close(); } catch (e) { /* nothing left to release */ } }
    }
  }
  function seedStore() {
    store = new Map();
    if (PAGE.seedDb) { var seed = fileBytes(PAGE.seedDb); if (seed && seed.length) store.set(PRIMARY, new Uint8Array(seed)); }
  }
  function applyPendingDbRestore() {
    if (!pendingDbRestore.length) return;
    var bad = [];
    pendingDbRestore.forEach(function (pair) {
      var chk = checkDbBytes(pair[1]);
      if (chk.ok && !chk.empty) store.set(pair[0], pair[1]); else bad.push(pair[0]);
    });
    pendingDbRestore = [];
    // the saved selection only means something once the store holds that file
    if (state.selectedDb && dbExists(state.selectedDb)) selectedDb = state.selectedDb;
    if (bad.length) { setStatus(H.SAVED_DB_UNUSABLE, 'bad'); showDbNotice(H.SAVED_DB_UNUSABLE + ' (' + bad.join(', ') + ')', 'bad'); }
  }
  // kind: 'nodb' (hidden again by refreshDbUi() once the database exists) | 'wrongname' | 'side' | 'bad'
  function showDbNotice(text, level, kind) {
    if (!els.dbNotice) return;
    noticeKind = kind || 'bad';
    els.dbNotice.className = 'notice ' + (level || 'warn');
    els.dbNotice.hidden = false;
    els.dbNotice.textContent = '';
    // the live region is unhidden first and receives its text on the next task, so it is actually announced
    setTimeout(function () { if (!els.dbNotice.hidden && noticeKind) els.dbNotice.textContent = text; }, 0);
  }
  function hideDbNotice() { noticeKind = null; if (els.dbNotice) { els.dbNotice.hidden = true; els.dbNotice.textContent = ''; } }

  function refreshDbUi() {
    var paths = dbPaths();
    if (!dbExists(selectedDb)) selectedDb = PRIMARY;
    // the "No database yet" notice has done its job once the database exists
    if (noticeKind === 'nodb' && dbExists(selectedDb)) hideDbNotice();
    // the file name, or the full path when another db in the store shares that name (employees.db vs chapter-03/employees.db)
    var shown = H.dbDisplayName(selectedDb, paths);
    if (els.dbName) els.dbName.textContent = shown;
    if (els.downloadDb) els.downloadDb.textContent = 'Download ' + shown;
    if (els.dbSelectRow && els.dbSelect) {
      var options = paths.indexOf(PRIMARY) >= 0 ? paths : [PRIMARY].concat(paths);
      var show = options.length > 1;
      els.dbSelectRow.hidden = !show;
      clear(els.dbSelect);
      if (show) {
        options.forEach(function (p) {
          var label = H.dbOptionLabel(p, p === PRIMARY, dbExists(p));
          els.dbSelect.appendChild(h('option', { value: p, selected: p === selectedDb || null, text: label }));
        });
        els.dbSelect.value = selectedDb;
      }
    }
    renderTables();
  }

  // ---------------------------------------------------------------------------------------------
  // Tables panel (always reopened from stored bytes)
  // ---------------------------------------------------------------------------------------------
  function openStored(path) { var b = store.get(path); return new SQL.Database(b && b.length ? b : undefined); }
  // The one gate in front of every COUNT(*). A view can be defined over a join of joins whose row count is
  // astronomically larger than the 8 MB file that defines it, and counting it runs on the main thread — the page
  // freezes for good, because the database that defines the view is already saved.
  function isRealTable(db, name) {
    var st = null;
    try {
      st = db.prepare('SELECT type FROM sqlite_master WHERE name = ?');
      st.bind([name]);
      return st.step() ? String(st.get()[0]) === 'table' : false;
    } catch (e) { return false; }
    finally { if (st) { try { st.free(); } catch (e2) { /* already freed */ } } }
  }
  function listTables(path) {
    var db = openStored(path);
    try {
      var res = db.exec("SELECT name, type, sql FROM sqlite_master WHERE type IN ('table','view') AND name NOT LIKE 'sqlite_%' ORDER BY type, name");
      var out = res.length ? res[0].values.map(function (r) { return { name: String(r[0]), type: String(r[1]), sql: r[2] == null ? '' : String(r[2]), rows: null }; }) : [];
      // Only real tables are counted. A view can be defined over a join of joins whose row count is astronomically
      // larger than the 8 MB file that defines it, and COUNT(*) on it would run on the main thread on every load —
      // freezing the page for good, because the database that defines the view is already saved. Views show no count.
      out.forEach(function (t) {
        if (t.type !== 'table') { t.rows = null; return; }
        try { t.rows = Number(db.exec('SELECT COUNT(*) FROM ' + H.quoteIdent(t.name))[0].values[0][0]); } catch (e) { t.rows = null; }
      });
      return out;
    } finally { db.close(); }
  }
  function renderTablesMessage(text, level, action) {
    if (!els.dbTables) return;
    clear(els.dbTables);
    var box = h('div', { class: 'db-empty' + (level === 'error' ? ' is-error' : '') }, h('span', { text: text }));
    // When the chapter says how its database is first created, offer that as one button rather than leaving the
    // student to find the step, copy the command and press Run. It runs the SAME command the step shows, so the
    // transcript, the printed schema and the export are identical either way.
    if (action && WS[action.ws]) {
      box.appendChild(h('button', {
        type: 'button', class: 'btn small db-empty-action', 'data-action': 'load-data', 'data-engine-button': true,
        onclick: function () { putInTerminal(action.ws); runTerminal(WS[action.ws].command || ''); },
      }, action.label));
    }
    els.dbTables.appendChild(box);
  }
  function renderTables() {
    if (!els.dbTables) return;
    clear(els.dbDetail);
    if (!SQL) { renderTablesMessage(sqlPromise ? 'Loading SQLite…' : 'SQLite is not loaded.'); return; }
    if (!dbExists(selectedDb)) { renderTablesMessage(NO_DB_TEXT, null, selectedDb === PRIMARY ? NO_DB_ACTION : null); return; }
    var tables;
    try { tables = listTables(selectedDb); } catch (e) { renderTablesMessage('The database could not be opened (' + (e.message || e) + '). Reset database to start over.', 'error'); return; }
    clear(els.dbTables);
    if (!tables.length) { renderTablesMessage('The file exists but has no tables yet.'); return; }
    tables.forEach(function (t) {
      var row = h('div', { class: 'db-table-row', 'data-table': t.name },
        h('span', { class: 'name', text: t.name }),
        t.type === 'view' ? h('span', { class: 'pill', text: 'view' }) : null,
        h('span', { class: 'count', text: t.rows === null ? '' : t.rows + ' ' + H.plural(t.rows, 'row', 'rows') }),
        h('button', { type: 'button', class: 'btn ghost small', 'data-action': 'browse', 'data-table': t.name, 'aria-label': 'Browse ' + t.name, onclick: function () { browseTable(t.name); } }, 'Browse'),
        h('button', { type: 'button', class: 'btn ghost small', 'data-action': 'structure', 'data-table': t.name, 'aria-label': 'Structure of ' + t.name, onclick: function () { structureTable(t.name); } }, 'Structure'));
      els.dbTables.appendChild(row);
    });
  }
  function detailBox(title) {
    clear(els.dbDetail);
    var box = h('div', { class: 'output', 'data-state': 'done', id: 'dbDetailOutput', 'aria-live': 'polite' });
    box.appendChild(h('div', { class: 'out-head', text: title }));
    els.dbDetail.appendChild(box);
    return box;
  }
  function browseTable(name) {
    if (!SQL) return;
    var db = null;
    try {
      db = openStored(selectedDb);
      var stmt = db.prepare('SELECT * FROM ' + H.quoteIdent(name) + ' LIMIT ' + H.BROWSE_ROWS);
      var columns = stmt.getColumnNames(), rows = [];
      while (stmt.step()) rows.push(stmt.get());
      stmt.free();
      // Same rule as listTables(): never COUNT(*) a view (see isRealTable). The LIMITed read still shows its rows.
      var total = null;
      if (isRealTable(db, name)) { try { total = Number(db.exec('SELECT COUNT(*) FROM ' + H.quoteIdent(name))[0].values[0][0]); } catch (e) { total = null; } }
      var box = detailBox('Browse ' + name + (total !== null ? ' · ' + (total > rows.length ? 'first ' + rows.length + ' of ' + total : total + ' ' + H.plural(total, 'row', 'rows')) : ''));
      box.appendChild(resultTable(columns, rows, 'Browse ' + name));
    } catch (e) {
      var eb = detailBox('Browse ' + name);
      eb.appendChild(h('div', { class: 'out-msg error', text: 'Could not read the table: ' + (e.message || e) }));
      eb.setAttribute('data-state', 'error');
    } finally { if (db) { try { db.close(); } catch (e) { /* already closed */ } } }
  }
  function structureTable(name) {
    if (!SQL) return;
    var db = null;
    try {
      db = openStored(selectedDb);
      var res = db.exec("SELECT sql FROM sqlite_master WHERE name = ? AND sql IS NOT NULL", [name]);
      var sql = res.length && res[0].values.length ? String(res[0].values[0][0]) : '(no SQL recorded)';
      var idx = db.exec("SELECT sql FROM sqlite_master WHERE type = 'index' AND tbl_name = ? AND sql IS NOT NULL", [name]);
      var box = detailBox('Structure of ' + name);
      box.appendChild(h('pre', { class: 'out-code', text: sql + (idx.length ? '\n\n' + idx[0].values.map(function (r) { return String(r[0]) + ';'; }).join('\n') : '') }));
    } catch (e) {
      var eb = detailBox('Structure of ' + name);
      eb.appendChild(h('div', { class: 'out-msg error', text: 'Could not read the structure: ' + (e.message || e) }));
      eb.setAttribute('data-state', 'error');
    } finally { if (db) { try { db.close(); } catch (e) { /* already closed */ } } }
  }

  // ---------------------------------------------------------------------------------------------
  // Result rendering
  // ---------------------------------------------------------------------------------------------
  function resultTable(columns, rows, captionText) {
    var table = h('table', { class: 'result' });
    table.appendChild(h('caption', { text: captionText }));
    var tr = h('tr');
    columns.forEach(function (c) { tr.appendChild(h('th', { scope: 'col', text: String(c) })); });
    table.appendChild(h('thead', null, tr));
    var tbody = h('tbody');
    if (!rows.length) {
      tbody.appendChild(h('tr', null, h('td', { class: 'empty', colspan: String(Math.max(1, columns.length)), text: '0 rows' })));
    } else {
      rows.forEach(function (r) {
        var row = h('tr');
        r.forEach(function (v) {
          var f = H.formatCell(v);
          row.appendChild(f === null ? h('td', { class: 'null', text: 'NULL' }) : h('td', { text: H.truncateCell(f, H.CELL_CAP) }));
        });
        tbody.appendChild(row);
      });
    }
    table.appendChild(tbody);
    return h('div', { class: 'out-scroll' }, table);
  }
  function renderRunning(out, text) {
    clear(out);
    out.setAttribute('data-state', 'running');
    out.appendChild(h('div', { class: 'out-msg running', text: text || 'Running…' }));
  }
  function renderSqlRecord(out, rec, restored) {
    clear(out);
    if (restored) out.appendChild(h('div', { class: 'out-caption', text: H.restoredCaption(rec.ts) }));
    (rec.items || []).forEach(function (it) {
      if (it.type === 'result') {
        var head = H.resultHeading(it.k, it.total);
        if (it.total > it.rows.length) head += ' · ' + H.showingFirst(it.total, it.rows.length);
        out.appendChild(h('div', { class: 'out-head', text: head }));
        out.appendChild(resultTable(it.columns, it.rows, head));
      } else {
        out.appendChild(h('div', { class: 'out-msg ' + (it.level || 'ok'), text: it.text }));
      }
    });
    if (rec.error) {
      out.appendChild(h('div', { class: 'out-msg error', text: H.errorHeadline(rec.error.statement, rec.error.message) }));
      if (rec.error.remaining) out.appendChild(h('pre', { class: 'out-code', text: rec.error.remaining }));
    } else if (rec.nothing) {
      out.appendChild(h('div', { class: 'out-msg error', text: H.NOTHING_TO_RUN }));
    }
    // trailing notes (the COMMIT note) come after the failure headline, so the student reads them in order
    (rec.notes || []).forEach(function (n) { out.appendChild(h('div', { class: 'out-msg note', text: n })); });
    out.setAttribute('data-state', restored ? 'restored' : (rec.error || rec.nothing ? 'error' : 'done'));
  }
  function renderPythonRecord(out, rec, restored) {
    clear(out);
    if (restored) out.appendChild(h('div', { class: 'out-caption', text: H.restoredCaption(rec.ts) }));
    var any = false;
    if (rec.stdout) { out.appendChild(h('pre', { class: 'out-text', text: rec.stdout })); any = true; }
    if (rec.stderr) { out.appendChild(h('pre', { class: 'out-text stderr', text: rec.stderr })); any = true; }
    if (rec.error) { out.appendChild(h('pre', { class: 'out-text stderr', text: H.formatTraceback(rec.error.text, rec.error.frames) })); any = true; }
    (rec.notes || []).forEach(function (n) { out.appendChild(h('div', { class: 'out-msg note', text: n })); any = true; });
    if (!any) out.appendChild(h('div', { class: 'out-msg ok', text: 'Finished with no output.' }));
    out.setAttribute('data-state', restored ? 'restored' : (rec.error ? 'error' : 'done'));
  }
  function renderErrorOutput(out, text) {
    clear(out);
    out.appendChild(h('div', { class: 'out-msg error', text: text }));
    out.setAttribute('data-state', 'error');
  }

  // ---------------------------------------------------------------------------------------------
  // SQL execution (the statement loop)
  // ---------------------------------------------------------------------------------------------
  function totalChanges(db) { return Number(db.exec('SELECT total_changes()')[0].values[0][0]); }
  function executeSql(text, bytes) {
    var db = new SQL.Database(bytes && bytes.length ? bytes : undefined);
    var items = [], started = 0, insideBody = false, resultIndex = 0, error = null, it = null;
    try {
      it = db.iterateStatements(text);
      for (;;) {
        insideBody = false;
        var r = it.next();
        if (r.done) break;
        started++; insideBody = true;
        var stmt = r.value;
        var sqlText = '';
        try { sqlText = stmt.getSQL(); } catch (e) { sqlText = ''; }
        var kw = H.firstKeyword(sqlText);
        var isChange = H.isChangeKeyword(kw);
        var dropNote = null;
        if (kw === 'DROP') {
          var target = H.dropTableTarget(sqlText);
          // `DROP TABLE myview` is an error in SQLite, but the count would run before the drop — and counting a
          // view can hang the page (see isRealTable), so the note is only ever taken for a real table
          if (target && isRealTable(db, target)) {
            try {
              var n = Number(db.exec('SELECT COUNT(*) FROM ' + H.quoteIdent(target))[0].values[0][0]);
              if (n > 0) dropNote = H.droppedMessage(target, n);
            } catch (e) { dropNote = null; }
          }
        }
        var before = isChange ? totalChanges(db) : 0;
        var columns = stmt.getColumnNames();
        var rows = [], total = 0;
        while (stmt.step()) { total++; if (rows.length < H.ROW_CAP) rows.push(stmt.get()); }
        if (columns.length) items.push({ type: 'result', k: ++resultIndex, columns: columns, rows: rows, total: total });
        else if (isChange) items.push({ type: 'message', level: 'ok', text: H.changedMessage(totalChanges(db) - before) });
        else items.push({ type: 'message', level: 'ok', text: 'OK' });
        if (dropNote) items.push({ type: 'message', level: 'note', text: dropNote });
      }
    } catch (e) {
      var remaining = '';
      try { remaining = it ? it.getRemainingSQL() : ''; } catch (e2) { remaining = ''; }
      error = { statement: H.failingStatementNumber(started, insideBody), message: e && e.message ? e.message : String(e), remaining: String(remaining || '').trim() };
    }
    var committed = false, notes = [];
    try { db.exec('COMMIT'); committed = true; } catch (e) { committed = false; }
    if (committed) notes.push(H.COMMIT_NOTE);
    var exported = null;
    try { exported = db.export(); } finally { try { db.close(); } catch (e) { /* closed by export */ } }
    return { items: items, started: started, error: error, notes: notes, exported: exported };
  }
  function runSql(wsId) {
    var ws = WS[wsId];
    var ta = $(wsId), out = $('out-' + wsId);
    if (!ws || !ta || !out) return Promise.resolve();
    if (busy) { setStatus(waitMessage(), 'warn'); return Promise.resolve(); }
    var text = ta.value;
    renderRunning(out);
    var path = selectedDb;
    return withEngine(function () {
      return ensureSql().then(function () {
        var res;
        try { res = executeSql(text, store.get(path)); }
        catch (e) { renderErrorOutput(out, 'The database could not be opened (' + (e.message || e) + '). Reset database to start over.'); return; }
        var rec = { kind: 'sql', ts: nowIso(), source: text, statements: res.started, items: res.items, error: res.error, notes: res.notes, nothing: res.started === 0 && !res.error };
        if (res.exported && res.exported.length > 0) {
          store.set(path, res.exported);
          if (py) syncStoreToFs();
        }
        if (rec.nothing) delete state.outputs[wsId]; else state.outputs[wsId] = H.storableRecord(rec);
        renderSqlRecord(out, rec, false);
        saveNow(true);
        refreshDbUi();
      }, function (e) {
        renderErrorOutput(out, (e && e.message) ? e.message : String(e));
      });
    });
  }

  // ---------------------------------------------------------------------------------------------
  // Persistence
  // ---------------------------------------------------------------------------------------------
  function collectTexts() {
    var texts = {};
    PAGE.workspaces.forEach(function (w) { if (w.tool === 'sql' || w.tool === 'text') { var el = $(w.id); if (el) texts[w.id] = el.value; } });
    return texts;
  }
  // Is the whole file:// bucket full, or is it just this page's record that no longer fits? Every local page
  // shares one ~5 M-char bucket, so the honest advice differs: free space on other pages, or clear a big output
  // here. A one-character write under KEYS.probe answers it; the finally always removes it again.
  function bucketFull() {
    try { localStorage.setItem(KEYS.probe, 'x'); return false; }
    catch (e) { return true; }
    finally { try { localStorage.removeItem(KEYS.probe); } catch (e2) { /* nothing to remove */ } }
  }
  function writeMain(s) { localStorage.setItem(KEYS.main, H.encodeState(s)); }
  // Saves the main record. When it no longer fits (a huge output), retries with the Python/Terminal records
  // dropped, then with every output dropped, so the student's text and SQL results keep saving; the status
  // line says which outputs were too big to keep and how to fix it (saveDegraded → savedStatus()).
  function saveState() {
    state.name = els.name ? els.name.value : '';
    state.texts = collectTexts();
    state.python = els.pyCode ? els.pyCode.value : null;
    state.selectedDb = selectedDb;
    try { writeMain(state); saveDegraded = 0; return true; } catch (e) { /* try smaller */ }
    for (var level = 1; level <= 2; level++) {
      try { writeMain(H.slimState(state, level).state); saveDegraded = level; return true; } catch (e) { /* smaller still */ }
    }
    saveDegraded = 3;
    setStatus(H.chooseSaveStatus(bucketFull(), 3), 'bad');
    return false;
  }
  function savedDbHas(json, path) {
    try { var o = JSON.parse(json); return !!(o && typeof o === 'object' && typeof o[path] === 'string' && o[path].length); } catch (e) { return false; }
  }
  // Writes the :db key. A db over the auto-save cap is skipped but its previously saved copy is carried over
  // (never deleted); if the write itself throws, the largest db is likewise replaced by its saved copy and the
  // write retried once. Returns true when every db was saved fresh.
  function saveDb() {
    var prev = null;
    try { prev = localStorage.getItem(KEYS.db); } catch (e) { prev = null; }
    var entries = Array.from(store.entries());
    var enc = H.encodeDbStore(entries, H.DB_AUTOSAVE_MAX_B64, prev);
    var wrote = false;
    try { localStorage.setItem(KEYS.db, enc.json); wrote = true; } catch (e) { wrote = false; }
    if (!wrote) {
      var largest = null;
      entries.forEach(function (p) { if (p[1] && p[1].length && (!largest || p[1].length > largest[1].length)) largest = p; });
      if (largest) {
        var retry = H.encodeDbStore(entries, Math.max(1, H.bytesToBase64(largest[1]).length - 1), prev);
        try { localStorage.setItem(KEYS.db, retry.json); enc = retry; wrote = true; } catch (e2) { wrote = false; }
        if (!wrote) { setStatus(H.chooseDbSaveStatus(bucketFull(), largest[1].length, savedDbHas(prev, largest[0])), 'warn'); return false; }
      } else { return true; }
    }
    if (enc.skipped.length) { var s = enc.skipped[0]; setStatus(H.tooLargeToSave(s.bytes, enc.kept.indexOf(s.path) >= 0), 'warn'); return false; }
    return true;
  }
  function saveNow(withDb) {
    if (saveTimer) { clearTimeout(saveTimer); saveTimer = null; }
    var ok = saveState();
    if (withDb) { if (!saveDb()) return; }
    if (ok) savedStatus();
  }
  // Debounced text save. No "Saving…" announcement: the live region only changes on real transitions.
  function queueSave() {
    if (saveTimer) clearTimeout(saveTimer);
    saveTimer = setTimeout(function () { saveTimer = null; if (saveState()) savedStatus(); }, H.TEXT_SAVE_DEBOUNCE_MS);
  }
  function flush() { if (saveTimer) { clearTimeout(saveTimer); saveTimer = null; saveState(); } }
  // Every stored output is rendered inside its own try/catch: a record that another local page corrupted is
  // dropped, never allowed to stop the rest of the restore (and never the engine load, see init()).
  function restoreState() {
    var raw = null;
    try { raw = localStorage.getItem(KEYS.main); } catch (e) { raw = null; }
    state = H.decodeState(raw);
    if (els.name) els.name.value = state.name || '';
    PAGE.workspaces.forEach(function (w) {
      var el = $(w.id);
      if (!el) return;
      if (Object.prototype.hasOwnProperty.call(state.texts, w.id)) el.value = state.texts[w.id];
      autoSize(el);
      var rec = state.outputs[w.id];
      var out = $('out-' + w.id);
      if (rec && out && rec.kind === 'sql') {
        try { renderSqlRecord(out, rec, true); }
        catch (e) { delete state.outputs[w.id]; clear(out); out.setAttribute('data-state', 'idle'); }
      }
    });
    if (els.pyCode) { if (state.python !== null && state.python !== undefined) els.pyCode.value = state.python; autoSize(els.pyCode); }
    if (state.outputs.python && els.pyOut) {
      try { renderPythonRecord(els.pyOut, state.outputs.python, true); }
      catch (e) { delete state.outputs.python; clear(els.pyOut); els.pyOut.setAttribute('data-state', 'idle'); }
    }
    if (state.selectedDb) selectedDb = state.selectedDb;
    try { renderTranscript(); } catch (e) { state.transcript = []; renderTranscript(); }
  }
  // The :db key is read on its own so a bad main record can never cost the database.
  function restoreDbKey() {
    var rawDb = null;
    try { rawDb = localStorage.getItem(KEYS.db); } catch (e) { rawDb = null; }
    var all = H.decodeDbStore(rawDb);
    var bad = (all.dropped || []).slice();
    pendingDbRestore = all.filter(function (pair) {
      var ok = pair[1].length > 0 && pair[1].length <= H.DB_MAX_BYTES && H.isSqliteHeader(pair[1]);
      if (!ok) bad.push(pair[0]);
      return ok;
    });
    if (bad.length) { setStatus(H.SAVED_DB_UNUSABLE, 'bad'); showDbNotice(H.SAVED_DB_UNUSABLE + ' (' + bad.join(', ') + ')', 'bad'); }
  }

  // ---------------------------------------------------------------------------------------------
  // Python (Pyodide)
  // ---------------------------------------------------------------------------------------------
  var PRELUDE = [
    'import sys, os, builtins, runpy, traceback, gc, types, linecache, sqlite3',
    'def _no_input(prompt=""):',
    '    raise RuntimeError(' + JSON.stringify(H.INPUT_ERROR) + ')',
    'builtins.input = _no_input',
    '_hw = types.ModuleType("_hw")',
    '_hw.PY_VERSION = "%d.%d" % (sys.version_info.major, sys.version_info.minor)',
    // Every sqlite3 connection the student opens is remembered for the run: a connection that still has an open
    // transaction when the code ends (forgotten conn.commit()) is reported, whether it is closed explicitly,
    // closed by the end-of-run gc, or left dangling. The names come back to JS as the 4th element of the result.
    '_conns = []',
    '_notes = []',
    'def _note(name):',
    '    if name not in _notes:',
    '        _notes.append(name)',
    'class _Conn(sqlite3.Connection):',
    '    _hw_name = "?"',
    '    def close(self):',
    '        try:',
    '            if self.in_transaction:',
    '                _note(self._hw_name)',
    '        except Exception:',
    '            pass',
    '        return sqlite3.Connection.close(self)',
    '_orig_connect = sqlite3.connect',
    'def _connect(*a, **k):',
    '    if "factory" not in k:',
    '        k["factory"] = _Conn',
    '    c = _orig_connect(*a, **k)',
    '    try:',
    '        name = str(a[0] if a else k.get("database", "?"))',
    '        c._hw_name = name',
    '        _conns.append((c, name))',
    '    except Exception:',
    '        pass',
    '    return c',
    'sqlite3.connect = _connect',
    'def _uncommitted():',
    '    for c, name in _conns:',
    '        try:',
    '            if c.in_transaction:',
    '                _note(name)',
    '        except Exception:',
    '            pass',
    '    del _conns[:]',
    '    out = list(_notes)',
    '    del _notes[:]',
    '    return out',
    'def _frames(tb):',
    '    out = []',
    '    for f in traceback.extract_tb(tb):',
    '        fn = f.filename or ""',
    '        if fn.startswith("/lib/") or (fn.startswith("<") and fn != "<cell>"):',
    '            continue',
    '        out.append((fn, f.lineno or 0, f.name or "", f.line or ""))',
    '    return out',
    'def _flush():',
    '    for s in (sys.stdout, sys.stderr):',
    '        try:',
    '            s.flush()',
    '        except Exception:',
    '            pass',
    'def _run(fn):',
    '    try:',
    '        fn()',
    '        return ("ok", None, None, _uncommitted())',
    '    except SystemExit as e:',
    '        return ("exit", e.code, None, _uncommitted())',
    '    except BaseException as e:',
    '        return ("error", "".join(traceback.format_exception_only(type(e), e)).strip(), _frames(e.__traceback__), _uncommitted())',
    '    finally:',
    '        _flush()',
    'def run_script(path, argv):',
    '    argv = list(argv)',
    '    if not os.path.isfile(path):',
    '        _flush()',
    '        return ("exit", "python: can\'t open file %r: [Errno 2] No such file or directory" % (path,), None, [])',
    '    old = sys.argv',
    '    sys.argv = argv if argv else [path]',
    '    try:',
    '        return _run(lambda: runpy.run_path(path, run_name="__main__"))',
    '    finally:',
    '        sys.argv = old',
    '        gc.collect()',
    'def run_cell(code):',
    '    ns = {"__name__": "__main__", "__builtins__": builtins}',
    '    linecache.cache["<cell>"] = (len(code), None, code.splitlines(True), "<cell>")',
    '    def go():',
    '        exec(compile(code, "<cell>", "exec"), ns)',
    '    try:',
    '        return _run(go)',
    '    finally:',
    '        ns.clear()',
    '        gc.collect()',
    'def collect():',
    '    gc.collect()',
    '_hw.run_script = run_script',
    '_hw.run_cell = run_cell',
    '_hw.collect = collect',
    'sys.modules["_hw"] = _hw',
    ''
  ].join('\n');

  function fsExists(path) { try { return py.FS.analyzePath(path).exists; } catch (e) { return false; } }
  function fsIsDir(path) { try { return py.FS.isDir(py.FS.stat(path).mode); } catch (e) { return false; } }
  function fsUnlinkIfExists(path) { if (fsExists(path)) { try { py.FS.unlink(path); } catch (e) { /* nothing to remove */ } } }
  function fsWrite(rel, bytes) {
    var full = ROOT + '/' + rel;
    var dir = H.dirname(full);
    if (dir) py.FS.mkdirTree(dir);
    py.FS.writeFile(full, bytes);
  }
  function fsRead(rel) { try { return py.FS.readFile(ROOT + '/' + rel); } catch (e) { return null; } }
  function walkFs(dir, prefix, out) {
    var names;
    try { names = py.FS.readdir(dir); } catch (e) { return out; }
    names.forEach(function (n) {
      if (n === '.' || n === '..') return;
      var full = dir + '/' + n, rel = prefix ? prefix + '/' + n : n;
      if (fsIsDir(full)) walkFs(full, rel, out); else out.push(rel);
    });
    return out;
  }
  function setPyStatus(text) { if (els.termStatus) els.termStatus.textContent = text || ''; }
  function retryPy() { withEngine(ensurePy).catch(function () { /* the strip shows the reason */ }); }
  function ensurePy() {
    if (py) return Promise.resolve(py);
    if (pyPromise) return pyPromise;
    engineState(els.engPy, 'loading', 'Downloading Python (about 12 MB, one time)…', 'this happens once per browser; later runs start straight away');
    var probeUrl = CDN.pyodide.loader.url, stage = 'loader';
    pyPromise = Promise.resolve().then(function () {
      if (typeof window.loadPyodide === 'function') return null;
      return injectLoader(CDN.pyodide.loader);
    }).then(function () {
      if (typeof window.loadPyodide !== 'function') throw new Error('The Python loader script did not load.');
      stage = 'runtime';
      probeUrl = CDN.pyodide.base + 'pyodide-lock.json';
      return window.loadPyodide({ indexURL: CDN.pyodide.base });
    }).then(function (p) {
      py = p;
      py.FS.mkdirTree(ROOT);
      Object.keys(PAGE.files).sort().forEach(function (rel) { fsWrite(rel, fileBytes(rel)); });
      py.FS.chdir(ROOT);
      py.runPython(PRELUDE);
      py.setStdin({ error: true });
      py.setStdout({ write: function (buf) { capture.out += (capture.decOut || (capture.decOut = new TextDecoder())).decode(buf, { stream: true }); return buf.length; } });
      py.setStderr({ write: function (buf) { capture.err += (capture.decErr || (capture.decErr = new TextDecoder())).decode(buf, { stream: true }); return buf.length; } });
      pyHw = py.pyimport('_hw');
      syncStoreToFs();
      pyFailures = 0;
      engineState(els.engPy, 'ready', 'Python ready · ' + String(pyHw.PY_VERSION), 'sqlite3 and csv are built in; input() is not available');
      return py;
    }).catch(function (err) {
      pyPromise = null; py = null; pyHw = null;
      pyFailures++;
      var text = err && err.message ? String(err.message).split('\n')[0] : String(err);
      // A failed dynamic import of pyodide.asm.mjs is cached by the browser's module map for the life of the
      // page, so no later loadPyodide() can succeed: the only honest button is "Reload page" (the work is saved).
      var poisoned = stage === 'runtime' && /dynamically imported module|import\(\)|module script/i.test(text);
      return probe(probeUrl).then(function (reachable) {
        var needsReload = poisoned || (reachable && pyFailures >= 2);
        var msg = (poisoned ? PY_RELOAD_MESSAGE : needsReload ? PY_RELOAD_REPEAT : failureMessage('python', reachable, stage)) + ' (' + text + ')';
        engineState(els.engPy, 'error', 'Python did not load', msg, needsReload ? reloadPage : retryPy, needsReload ? 'Reload page' : 'Retry Python');
        throw new Error(msg);
      });
    });
    return pyPromise;
  }
  // Store → FS before a run (only paths whose bytes differ); stale journals are removed first.
  function syncStoreToFs() {
    if (!py) return;
    store.forEach(function (bytes, rel) {
      if (!bytes || !bytes.length) return;
      var current = fsRead(rel);
      if (current && H.bytesEqual(current, bytes)) return;
      fsUnlinkIfExists(ROOT + '/' + rel + '-journal');
      fsUnlinkIfExists(ROOT + '/' + rel + '-wal');
      fsWrite(rel, bytes);
      fsDbPaths.add(rel);
    });
  }
  function removeDbFromFs(rel) {
    if (!py) return;
    fsUnlinkIfExists(ROOT + '/' + rel + '-journal');
    fsUnlinkIfExists(ROOT + '/' + rel + '-wal');
    fsUnlinkIfExists(ROOT + '/' + rel);
    fsDbPaths.delete(rel);
  }
  // FS → store after a run. Returns notes for the output; never copies a db that has a journal.
  function syncFsToStore() {
    var notes = [], changed = false;
    if (!py) return { notes: notes, changed: changed };
    var files = walkFs(ROOT, '', []);
    var journaled = {};
    files.forEach(function (rel) {
      var m = /^(.*\.db)-(journal|wal)$/.exec(rel);
      if (m) journaled[m[1]] = true;
    });
    if (Object.keys(journaled).length) notes.push(H.JOURNAL_WARNING);
    files.forEach(function (rel) {
      if (!/\.db$/i.test(rel) || journaled[rel]) return;
      var bytes = fsRead(rel);
      if (!bytes || !bytes.length) return;
      var original = hasFile(rel) ? fileBytes(rel) : null;
      if (original && H.bytesEqual(bytes, original) && !store.has(rel)) return;
      var current = store.get(rel);
      if (current && H.bytesEqual(current, bytes)) return;
      var chk = checkDbBytes(bytes);
      if (!chk.ok) { notes.push(rel + ' was written but is not a usable SQLite database (' + chk.reason + '); it was not kept.'); return; }
      var isNew = !dbExists(rel);
      store.set(rel, new Uint8Array(bytes));
      fsDbPaths.add(rel);
      changed = true;
      notes.push((isNew ? 'Created ' : 'Updated ') + rel);
      if (isNew && rel !== PRIMARY && !noticedDbs.has(rel)) {
        noticedDbs.add(rel);
        // a db the page's own optional step creates (chapter 2's scratch.db) gets an information note, anything
        // else the wrong-name warning with the page's advice
        var side = Object.prototype.hasOwnProperty.call(SIDE_DBS, rel) ? String(SIDE_DBS[rel]) : null;
        var note = side || H.wrongNameNotice(rel, PRIMARY, WRONG_NAME_ADVICE);
        showDbNotice(note, side ? 'info' : 'warn', side ? 'side' : 'wrongname');
        notes.push(note);
      }
    });
    return { notes: notes, changed: changed };
  }
  function startCapture() { capture = { out: '', err: '', decOut: new TextDecoder(), decErr: new TextDecoder() }; }
  function endCapture() {
    var out = capture.out + (capture.decOut ? capture.decOut.decode() : '');
    var err = capture.err + (capture.decErr ? capture.decErr.decode() : '');
    capture = { out: '', err: '', decOut: null, decErr: null };
    return { stdout: out, stderr: err };
  }
  function toJsResult(proxy) {
    var r;
    try { r = proxy.toJs({ dict_converter: Object.fromEntries, create_pyproxies: false }); }
    finally { if (proxy && typeof proxy.destroy === 'function') { try { proxy.destroy(); } catch (e) { /* already destroyed */ } } }
    return r;
  }
  function normaliseResult(r) {
    var kind = r && r[0], code = r && r[1], frames = r && r[2];
    var uncommitted = (r && Array.isArray(r[3]) ? r[3] : []).map(function (n) { return H.uncommittedNote(String(n)); });
    if (kind === 'exit') return { exit: code === undefined ? null : (typeof code === 'bigint' ? Number(code) : code), error: null, notes: uncommitted };
    if (kind === 'error') return { exit: null, error: { text: String(code || 'Error'), frames: (frames || []).map(function (f) { return [String(f[0]), Number(f[1]), String(f[2]), String(f[3])]; }) }, notes: uncommitted };
    return { exit: null, error: null, notes: uncommitted };
  }
  function runPythonCell() {
    var out = els.pyOut, ta = els.pyCode;
    if (!out || !ta) return Promise.resolve();
    if (busy) { setStatus(waitMessage(), 'warn'); return Promise.resolve(); }
    var code = ta.value;
    renderRunning(out, py ? 'Running…' : 'Running… (downloading Python first, about 12 MB, one time)');
    return withEngine(function () {
      return ensurePy().then(function () {
        syncStoreToFs();
        startCapture();
        var result;
        try { result = normaliseResult(toJsResult(pyHw.run_cell(code))); }
        catch (e) { var c0 = endCapture(); renderErrorOutput(out, 'Python could not run the cell: ' + (e.message || e) + (c0.stderr ? '\n' + c0.stderr : '')); return; }
        var cap = endCapture();
        try { pyHw.collect(); } catch (e) { /* gc is best-effort */ }
        var sync = syncFsToStore();
        var rec = { kind: 'python', ts: nowIso(), source: code, stdout: cap.stdout, stderr: cap.stderr + (result.exit !== null && H.exitLine(result.exit) ? (cap.stderr ? '\n' : '') + H.exitLine(result.exit) : ''), error: result.error, notes: sync.notes.concat(result.notes) };
        state.outputs.python = H.storableRecord(rec);
        PAGE.workspaces.forEach(function (w) { if (w.tool === 'python' && H.sameSource(w.snippet, code)) state.outputs[w.id] = H.storableRecord(rec); });
        renderPythonRecord(out, rec, false);
        saveNow(sync.changed);
        if (sync.changed) refreshDbUi();
      }, function (e) {
        renderErrorOutput(out, (e && e.message) ? e.message : String(e));
      });
    });
  }

  // ---------------------------------------------------------------------------------------------
  // Terminal
  // ---------------------------------------------------------------------------------------------
  function renderTranscript() {
    if (!els.transcript) return;
    clear(els.transcript);
    state.transcript.forEach(function (e, i) {
      var entry = h('div', { class: 'term-entry', 'data-entry': String(i + 1) });
      entry.appendChild(h('div', { class: 'term-cmd', text: '$ ' + e.cmd }));
      if (e.stdout) entry.appendChild(h('div', { class: 'term-stdout', text: e.stdout.replace(/\n$/, '') }));
      if (e.stderr) entry.appendChild(h('div', { class: 'term-stderr', text: e.stderr.replace(/\n$/, '') }));
      var x = H.exitLine(e.exit);
      if (x) entry.appendChild(h('div', { class: 'term-exit', text: x }));
      // file-sync notes ("Created campus_travel.db") in the note colour, not the stderr colour
      (e.notes || []).forEach(function (n) { entry.appendChild(h('div', { class: 'term-note', text: n })); });
      els.transcript.appendChild(entry);
    });
    els.transcript.scrollTop = els.transcript.scrollHeight;
  }
  function virtualListing(dirRel) {
    var names = new Set();
    var prefix = dirRel ? dirRel + '/' : '';
    var all = Object.keys(PAGE.files).concat(dbPaths());
    all.forEach(function (p) {
      if (p.indexOf(prefix) !== 0) return;
      var rest = p.slice(prefix.length);
      if (!rest) return;
      var i = rest.indexOf('/');
      names.add(i < 0 ? rest : rest.slice(0, i) + '/');
    });
    return Array.from(names).sort();
  }
  function cmdLs(pathArg) {
    var rel = H.resolveVirtualPath(pathArg);
    if (rel === null) return { stderr: 'ls: cannot access \'' + pathArg + '\': outside the Week 1 folder' };
    if (py) {
      var full = rel ? ROOT + '/' + rel : ROOT;
      if (!fsExists(full)) return { stderr: 'ls: cannot access \'' + pathArg + '\': No such file or directory' };
      if (!fsIsDir(full)) return { stdout: rel + '\n' };
      var names = py.FS.readdir(full).filter(function (n) { return n !== '.' && n !== '..'; }).sort().map(function (n) { return fsIsDir(full + '/' + n) ? n + '/' : n; });
      return { stdout: names.join('\n') + '\n' };
    }
    if (rel && hasFile(rel)) return { stdout: rel + '\n' };
    var list = virtualListing(rel);
    if (!list.length) return { stderr: 'ls: cannot access \'' + pathArg + '\': No such file or directory' };
    return { stdout: list.join('\n') + '\n' };
  }
  function cmdCat(pathArg) {
    var rel = H.resolveVirtualPath(pathArg);
    if (rel === null || !rel) return { stderr: 'cat: ' + pathArg + ': No such file or directory' };
    if (/\.(db|xlsx)$/i.test(rel)) return { stderr: 'cat: ' + rel + ' is a binary file' + (/\.db$/i.test(rel) ? ' — use the Database panel to look inside it' : '') };
    if (py) {
      var full = ROOT + '/' + rel;
      if (!fsExists(full)) return { stderr: 'cat: ' + pathArg + ': No such file or directory' };
      if (fsIsDir(full)) return { stderr: 'cat: ' + pathArg + ': Is a directory' };
      try { return { stdout: py.FS.readFile(full, { encoding: 'utf8' }) }; } catch (e) { return { stderr: 'cat: ' + pathArg + ': ' + (e.message || e) }; }
    }
    var text = fileText(rel);
    if (text === null) return { stderr: 'cat: ' + pathArg + ': No such file or directory' };
    return { stdout: text };
  }
  function runTerminal(line) {
    var cmdLine = String(line || '').trim();
    var parsed = H.parseCommand(cmdLine);
    if (parsed.kind === 'empty') return Promise.resolve();
    if (busy) { setStatus(waitMessage(), 'warn'); return Promise.resolve(); }
    els.terminal.setAttribute('data-state', 'running');
    setPyStatus('Running…');
    if (els.termInput) els.termInput.value = '';
    if (parsed.kind === 'clear') {
      state.transcript = [];
      renderTranscript();
      saveNow(false);
      setPyStatus('');
      els.terminal.setAttribute('data-state', 'done');
      return Promise.resolve();
    }
    var entry = { cmd: cmdLine, stdout: '', stderr: '', exit: null, ts: nowIso(), notes: [] };
    function finish(dbChanged, isError) {
      state.transcript = H.capTranscript(state.transcript.concat([entry]), H.TRANSCRIPT_CAP);
      var rec = H.storableRecord({ kind: 'terminal', ts: entry.ts, cmd: entry.cmd, stdout: entry.stdout, stderr: entry.stderr, exit: entry.exit, notes: entry.notes });
      state.outputs.terminal = rec;
      // `python3 …`, extra spaces or quotes still count as the step's command
      PAGE.workspaces.forEach(function (w) { if (w.tool === 'terminal' && H.sameCommand(w.command, cmdLine)) state.outputs[w.id] = rec; });
      renderTranscript();
      saveNow(!!dbChanged);
      if (dbChanged) refreshDbUi();
      setPyStatus('');
      els.terminal.setAttribute('data-state', isError ? 'error' : 'done');
    }
    var r;
    switch (parsed.kind) {
      case 'help': entry.stdout = H.HELP_TEXT + '\n'; finish(false); return Promise.resolve();
      case 'pwd': entry.stdout = ROOT + '\n'; finish(false); return Promise.resolve();
      case 'pip': entry.stderr = H.PIP_MESSAGE + '\n'; finish(false); return Promise.resolve();
      case 'unknown': entry.stderr = H.commandNotFound(parsed.name) + '\n'; finish(false); return Promise.resolve();
      case 'python-usage': entry.stderr = 'usage: python <script> [args...]\n' + H.HELP_ONE_LINE + '\n'; finish(false); return Promise.resolve();
      case 'python-flag': entry.stderr = 'python: the ' + parsed.flag + ' option is not available here. Run a script file instead: python <script> [args...]\n'; finish(false); return Promise.resolve();
      case 'cat-usage': entry.stderr = 'usage: cat <file>\n'; finish(false); return Promise.resolve();
      case 'ls': r = cmdLs(parsed.path); entry.stdout = r.stdout || ''; entry.stderr = r.stderr ? r.stderr + '\n' : ''; finish(false); return Promise.resolve();
      case 'cat': r = cmdCat(parsed.path); entry.stdout = r.stdout || ''; entry.stderr = r.stderr ? r.stderr + '\n' : ''; finish(false); return Promise.resolve();
      default: break;
    }
    if (!py) setPyStatus('Downloading Python (about 12 MB, one time)…');
    return withEngine(function () {
      return ensurePy().then(function () {
        setPyStatus('Running…');
        syncStoreToFs();
        startCapture();
        var argv = py.toPy(parsed.argv);
        var result;
        try { result = normaliseResult(toJsResult(pyHw.run_script(parsed.script, argv))); }
        catch (e) { var c0 = endCapture(); entry.stdout = c0.stdout; entry.stderr = c0.stderr + 'Python could not run the script: ' + (e.message || e) + '\n'; finish(false, true); return; }
        finally { try { argv.destroy(); } catch (e) { /* not a proxy */ } }
        var cap = endCapture();
        try { pyHw.collect(); } catch (e) { /* best-effort */ }
        entry.stdout = cap.stdout;
        entry.stderr = cap.stderr;
        if (result.error) entry.stderr += (entry.stderr && !/\n$/.test(entry.stderr) ? '\n' : '') + H.formatTraceback(result.error.text, result.error.frames) + '\n';
        entry.exit = result.exit;
        var sync = syncFsToStore();
        entry.notes = sync.notes.concat(result.notes);
        finish(sync.changed, false);
      }, function (e) {
        entry.stderr = ((e && e.message) ? e.message : String(e)) + '\n';
        finish(false, true);
      });
    });
  }

  // ---------------------------------------------------------------------------------------------
  // Export
  // ---------------------------------------------------------------------------------------------
  function exerciseTitle(id) {
    var el = document.querySelector('[data-exercise="' + id + '"] h2');
    return el ? el.textContent.trim() : '';
  }
  function pageTitle() {
    var eyebrow = document.querySelector('.eyebrow'), h1 = document.querySelector('h1');
    return (eyebrow ? eyebrow.textContent.trim() + ' · ' : '') + (h1 ? h1.textContent.trim() : 'Homework');
  }
  function buildExportModel() {
    var exercises = [], byEx = {};
    PAGE.workspaces.forEach(function (w) {
      var ex = byEx[w.exerciseId];
      if (!ex) { ex = byEx[w.exerciseId] = { id: w.exerciseId, title: exerciseTitle(w.exerciseId), steps: [], bySteps: {} }; exercises.push(ex); }
      var step = ex.bySteps[w.stepLabel];
      if (!step) { step = ex.bySteps[w.stepLabel] = { label: w.stepLabel, workspaces: [] }; ex.steps.push(step); }
      var el = $(w.id);
      step.workspaces.push({ id: w.id, tool: w.tool, optional: !!w.optional, text: el ? el.value : '', command: w.command || '', snippet: w.snippet || '', record: state.outputs[w.id] || null });
    });
    var databases = null, databaseNote = null;
    if (SQL) {
      databases = [];
      dbPaths().forEach(function (p) {
        try { databases.push({ path: p, tables: listTables(p).map(function (t) { return { name: t.name, rows: t.rows === null ? 0 : t.rows, sql: t.sql }; }) }); }
        catch (e) { databases.push({ path: p, tables: [] }); }
      });
      if (!databases.length) { databases = null; databaseNote = '_(no database yet)_'; }
    } else {
      databaseNote = '_(SQLite was not loaded when this file was exported, so the table summary is missing)_';
    }
    return { title: pageTitle(), name: els.name ? els.name.value.trim() : '', exportedAt: nowIso(), exercises: exercises, transcript: state.transcript, python: { text: els.pyCode ? els.pyCode.value : '', record: state.outputs.python || null }, databases: databases, databaseNote: databaseNote };
  }
  function exportWork() {
    saveNow(false);
    var unrun = H.countUnrun(PAGE.workspaces, collectTexts(), state.outputs);
    setStatus(H.exportingStatus(unrun), unrun ? 'warn' : '');
    var md = H.exportMarkdown(buildExportModel());
    var name = PAGE.exportName || H.exportFileName(PAGE.chapter);
    download(name, md, 'text/markdown;charset=utf-8');
    setStatus('Exported ' + name + (unrun ? ' — ' + unrun + ' ' + (unrun === 1 ? 'box has' : 'boxes have') + ' SQL but no result yet' : ''), unrun ? 'warn' : '');
  }

  // ---------------------------------------------------------------------------------------------
  // Toolbar actions: download, open, reset, clear, print
  // ---------------------------------------------------------------------------------------------
  function downloadDb() {
    if (!dbExists(selectedDb)) { setStatus(NO_DB_TEXT, 'warn'); showDbNotice(NO_DB_TEXT, 'warn', 'nodb'); return; }
    download(H.basename(selectedDb), store.get(selectedDb), 'application/vnd.sqlite3');
    setStatus('Downloaded ' + H.basename(selectedDb));
  }
  function cancelled() { setStatus('Cancelled — nothing changed', 'warn'); }
  function openDbClick() {
    if (busy) return;
    if (dbExists(selectedDb) && !window.confirm(PAGE.confirmTexts.replace)) { cancelled(); return; }
    els.openInput.value = '';
    els.openInput.click();
  }
  // Every refusal says the same one line in both places: the status line scrolls away with the toolbar, while
  // #dbNameNotice sits in the panel — a branch that set only one of the two left the PREVIOUS refusal's reason
  // standing next to the new one.
  function refuseDb(reason) { var text = H.unusableDb(reason); setStatus(text, 'bad'); showDbNotice(text, 'bad', 'bad'); }
  function openDbChosen() {
    var file = els.openInput.files && els.openInput.files[0];
    if (!file) return;
    if (file.size > H.DB_MAX_BYTES) { refuseDb('larger than ' + H.humanBytes(H.DB_MAX_BYTES)); return; }
    setStatus('Opening ' + file.name + '…');
    withEngine(function () {
      return ensureSql().then(function () { return file.arrayBuffer(); }).then(function (buf) {
        var bytes = new Uint8Array(buf);
        var chk = checkDbBytes(bytes);
        if (!chk.ok) { refuseDb(chk.reason); return; }
        if (chk.empty) { refuseDb('the file is empty'); return; }
        store.set(selectedDb, bytes);
        if (py) syncStoreToFs();
        hideDbNotice();
        saveNow(true);
        refreshDbUi();
        setStatus('Opened ' + file.name + ' as ' + H.basename(selectedDb));
      });
    }).catch(function (e) {
      // the engine itself failed: same rule, both places say the same thing rather than one of them keeping an
      // older refusal's reason
      var text = (e && e.message) ? e.message : String(e);
      setStatus(text, 'bad');
      showDbNotice(text, 'bad', 'bad');
    });
  }
  function resetDatabase() {
    if (busy) return;
    if (!window.confirm(PAGE.confirmTexts.reset)) { cancelled(); return; }
    withEngine(function () {
      pendingDbRestore = [];   // a saved copy still waiting for SQLite must not come back after the reset
      var old = Array.from(store.keys());
      seedStore();
      selectedDb = PRIMARY;
      noticedDbs = new Set();
      hideDbNotice();
      if (py) { old.forEach(function (p) { if (!store.has(p)) removeDbFromFs(p); }); syncStoreToFs(); }
      saveNow(true);
      refreshDbUi();
      setStatus(AFTER_RESET_TEXT);
      return Promise.resolve();
    }).catch(function (e) { setStatus((e && e.message) ? e.message : String(e), 'bad'); });
  }
  function clearWork() {
    if (busy) return;
    if (!window.confirm(PAGE.confirmTexts.clear)) { cancelled(); return; }
    withEngine(function () {
      pendingDbRestore = [];   // see resetDatabase()
      lastCleared = {};
      saveDegraded = 0;
      if (saveTimer) { clearTimeout(saveTimer); saveTimer = null; }
      try { localStorage.removeItem(KEYS.main); localStorage.removeItem(KEYS.db); localStorage.removeItem(KEYS.probe); } catch (e) { /* storage unavailable: memory is still cleared */ }
      var old = Array.from(store.keys());
      state = H.emptyState();
      if (els.name) els.name.value = '';
      PAGE.workspaces.forEach(function (w) {
        var el = $(w.id);
        if (el) { el.value = w.tool === 'sql' ? (w.starter || '') : ''; autoSize(el); }
        var out = $('out-' + w.id);
        if (out) { clear(out); out.setAttribute('data-state', 'idle'); }
      });
      if (els.pyCode) { els.pyCode.value = PAGE.pythonStarter || ''; autoSize(els.pyCode); }
      if (els.pyOut) { clear(els.pyOut); els.pyOut.setAttribute('data-state', 'idle'); }
      renderTranscript();
      seedStore();
      selectedDb = PRIMARY;
      noticedDbs = new Set();
      hideDbNotice();
      if (py) { old.forEach(function (p) { if (!store.has(p)) removeDbFromFs(p); }); syncStoreToFs(); }
      refreshDbUi();
      setStatus('Work cleared — this page is back to its starting state');
      return Promise.resolve();
    }).catch(function (e) { setStatus((e && e.message) ? e.message : String(e), 'bad'); });
  }
  function printPage() {
    fillPrintMirrors();
    autoSizeAll();
    window.print();
  }

  // ---------------------------------------------------------------------------------------------
  // Files card
  // ---------------------------------------------------------------------------------------------
  function downloadFile(path) {
    var bytes = fileBytes(path);
    if (!bytes) { setStatus('That file is not on this page.', 'bad'); return; }
    var type = /\.db$/i.test(path) ? 'application/vnd.sqlite3' : /\.xlsx$/i.test(path) ? 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' : 'text/plain;charset=utf-8';
    download(H.basename(path), bytes, type);
    setStatus('Downloaded ' + H.basename(path));
  }
  function toggleView(path, btn) {
    var pre = document.querySelector('pre.file-view[data-path="' + path + '"]');
    if (!pre) return;
    var name = H.basename(path);
    if (pre.hidden) {
      var text = fileText(path);
      pre.textContent = text === null ? '(binary file)' : text;
      pre.hidden = false;
      btn.textContent = 'Hide';
      btn.setAttribute('aria-label', 'Hide ' + name);
      btn.setAttribute('aria-expanded', 'true');
    } else {
      pre.hidden = true;
      btn.textContent = 'View';
      btn.setAttribute('aria-label', 'View ' + name);
      btn.setAttribute('aria-expanded', 'false');
    }
  }

  // ---------------------------------------------------------------------------------------------
  // Clear (a box, the Python cell) with Undo — a programmatic value reset empties the browser's undo stack
  // ---------------------------------------------------------------------------------------------
  function wsLabel(wsId) {
    var w = WS[wsId];
    if (!w) return wsId;
    return /^\d+[a-z]?$/i.test(String(w.stepLabel)) ? 'step ' + w.stepLabel : String(w.stepLabel);
  }
  function clearSqlBox(wsId) {
    var ta = $(wsId), out = $('out-' + wsId);
    if (!ta) return;
    var had = { text: ta.value, record: state.outputs[wsId] || null };
    ta.value = ''; autoSize(ta); ta.focus();
    if (out) { clear(out); out.setAttribute('data-state', 'idle'); }
    delete state.outputs[wsId];
    queueSave();
    if (had.text.trim() || had.record) {
      lastCleared[wsId] = had;
      setStatus(H.clearedStatus(wsLabel(wsId)), 'warn', null, { label: 'Undo', onclick: function () { undoClearSql(wsId); } });
    }
  }
  function undoClearSql(wsId) {
    var had = lastCleared[wsId];
    if (!had) return;
    delete lastCleared[wsId];
    var ta = $(wsId), out = $('out-' + wsId);
    if (ta) { ta.value = had.text; autoSize(ta); ta.focus(); }
    if (had.record) { state.outputs[wsId] = had.record; if (out) renderSqlRecord(out, had.record, true); }
    saveNow(false);
    setStatus('Restored ' + wsLabel(wsId));
  }
  function clearPythonCell() {
    var had = { text: els.pyCode.value, record: state.outputs.python || null };
    els.pyCode.value = ''; autoSize(els.pyCode);
    if (els.pyOut) { clear(els.pyOut); els.pyOut.setAttribute('data-state', 'idle'); }
    delete state.outputs.python;
    queueSave();
    els.pyCode.focus();
    if (had.text.trim() || had.record) {
      lastCleared.python = had;
      setStatus(H.clearedStatus('the Python cell'), 'warn', null, { label: 'Undo', onclick: undoClearPython });
    }
  }
  function undoClearPython() {
    var had = lastCleared.python;
    if (!had) return;
    delete lastCleared.python;
    els.pyCode.value = had.text; autoSize(els.pyCode); els.pyCode.focus();
    if (had.record) { state.outputs.python = had.record; if (els.pyOut) renderPythonRecord(els.pyOut, had.record, true); }
    saveNow(false);
    setStatus('Restored the Python cell');
  }

  // ---------------------------------------------------------------------------------------------
  // Wiring
  // ---------------------------------------------------------------------------------------------
  function putInTerminal(wsId) {
    var w = WS[wsId];
    if (!w || !els.termInput) return;
    els.termInput.value = w.command || '';
    els.terminal.scrollIntoView({ block: 'center' });
    els.termInput.focus();
    setStatus('Command ready — press Run in the Terminal');
  }
  function putInPython(wsId) {
    var w = WS[wsId];
    if (!w || !els.pyCode) return;
    els.pyCode.value = w.snippet || '';
    autoSize(els.pyCode);
    queueSave();
    els.pyCode.scrollIntoView({ block: 'center' });
    els.pyCode.focus();
    setStatus('Code ready — press Run Python');
  }
  function wire() {
    PAGE.workspaces.forEach(function (w) {
      var el = $(w.id);
      if (el && (w.tool === 'sql' || w.tool === 'text')) {
        el.addEventListener('input', function () { autoSize(el); queueSave(); });
        if (w.tool === 'sql') el.addEventListener('keydown', function (e) { if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') { e.preventDefault(); runSql(w.id); } });
      }
    });
    qsa('[data-action]').forEach(function (btn) {
      var action = btn.getAttribute('data-action'), ws = btn.getAttribute('data-ws'), path = btn.getAttribute('data-path');
      if (action === 'run-sql') btn.addEventListener('click', function () { runSql(ws); });
      else if (action === 'clear-sql') btn.addEventListener('click', function () { clearSqlBox(ws); });
      else if (action === 'put-terminal') btn.addEventListener('click', function () { putInTerminal(ws); });
      else if (action === 'put-python') btn.addEventListener('click', function () { putInPython(ws); });
      else if (action === 'download-file') btn.addEventListener('click', function () { downloadFile(path); });
      else if (action === 'view-file') btn.addEventListener('click', function () { toggleView(path, btn); });
    });
    if (els.name) els.name.addEventListener('input', queueSave);
    if (els.pyCode) {
      els.pyCode.addEventListener('input', function () { autoSize(els.pyCode); queueSave(); });
      els.pyCode.addEventListener('keydown', function (e) { if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') { e.preventDefault(); runPythonCell(); } });
    }
    if (els.pyRun) els.pyRun.addEventListener('click', function () { runPythonCell(); });
    if (els.pyClear) els.pyClear.addEventListener('click', clearPythonCell);
    if (els.termRun) els.termRun.addEventListener('click', function () { runTerminal(els.termInput.value); });
    if (els.termInput) els.termInput.addEventListener('keydown', function (e) { if (e.key === 'Enter') { e.preventDefault(); runTerminal(els.termInput.value); } });
    if (els.downloadDb) els.downloadDb.addEventListener('click', downloadDb);
    if (els.openDb) els.openDb.addEventListener('click', openDbClick);
    if (els.openInput) els.openInput.addEventListener('change', openDbChosen);
    if (els.exportBtn) els.exportBtn.addEventListener('click', exportWork);
    if (els.printBtn) els.printBtn.addEventListener('click', printPage);
    if (els.resetDb) els.resetDb.addEventListener('click', resetDatabase);
    if (els.clearWork) els.clearWork.addEventListener('click', clearWork);
    if (els.dbSelect) els.dbSelect.addEventListener('change', function () { selectedDb = els.dbSelect.value; if (selectedDb !== PRIMARY) hideDbNotice(); state.selectedDb = selectedDb; queueSave(); refreshDbUi(); });
    window.addEventListener('pagehide', flush);
    document.addEventListener('visibilitychange', function () { if (document.visibilityState === 'hidden') flush(); });
    window.addEventListener('beforeprint', function () { fillPrintMirrors(); autoSizeAll(); });
    if (!FIELD_SIZING) {
      var resizeTimer = null;
      window.addEventListener('resize', function () { clearTimeout(resizeTimer); resizeTimer = setTimeout(autoSizeAll, 150); });
    }
  }

  function init() {
    setStatus('Your work saves in this browser as you type.');
    wire();
    seedStore();
    var restoreFailed = false;
    try { restoreState(); } catch (e) { restoreFailed = true; }
    try { restoreDbKey(); } catch (e) { pendingDbRestore = []; }
    if (restoreFailed) setStatus(H.SAVED_WORK_UNREADABLE, 'bad');
    engineState(els.engPy, 'idle', 'Python not loaded yet', 'it downloads (about 12 MB, once) the first time you press Run in the Terminal or the Python cell');
    refreshDbUi();
    // the initial load holds the mutex: Reset / Clear / Open / Export wait until the engine and the restore have settled
    withEngine(ensureSql).catch(function () { /* the engine strip and the Tables list already show the reason */ });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
