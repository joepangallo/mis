#!/usr/bin/env node
// verify-browser.mjs — headless Chrome end-to-end verification of the REAL student pages, driven by
// instructor/expected/chapter-N.json and the `-- @step` blocks of instructor/solutions-chN.sql.
//
//   node hw/src/verify-browser.mjs [--chapter N] [--chrome PATH] [--keep] [--pages-dir DIR] [--instructor-dir DIR]
//                                  [--scratch DIR] [--budget SECONDS] [--json FILE]
//
// One Chrome per run (--remote-debugging-port=0, port read from DevToolsActivePort, never restarted), downloads
// redirected to a scratch dir, every CDP send has a timeout, confirm() is auto-accepted while alert()/prompt()
// FAIL the run, every Network.requestWillBeSent URL AND every WebSocket handshake (Network.webSocketCreated /
// webSocketWillSendHandshakeRequest — Chrome does not report sockets as requests) is recorded and must be file://,
// the sql.js base or the Pyodide base, text is set with `el.value = …; el.dispatchEvent(new Event('input'))`,
// buttons are clicked with `.click()`, and outputs are polled on data-state. A download is matched to the click
// that started it (records created after the click only — Chrome overwrites same-named files in the download dir).
// Pages run sequentially and each target is closed after its script.
// The page is driven only through the DOM contract (DOM-CONTRACT.md) — there are no production test hooks.
// Exit codes: 0 every assertion passed · 1 assertion failures · 2 environment (Chrome, pages or scripts unavailable).
import { spawn, execFileSync } from 'node:child_process';
import { mkdtempSync, rmSync, readFileSync, existsSync, mkdirSync, writeFileSync, statSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { DEFAULTS, SRC_DIR, pageName } from './build.mjs';
import { loadExpected, loadSolutionBlocks, blockSql, actionKind } from './check.mjs';
import './helpers.js';

const H = globalThis.HWHelpers;
export const DEFAULT_CHROME = process.env.CHROME || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
export const SQLITE3 = '/usr/bin/sqlite3';
export const FIRST_PYTHON_TIMEOUT_MS = 120000;
export const STEP_TIMEOUT_MS = 60000;
export const CANARY = {
  table: '<img src=x onerror=window.__xss=1>',
  column: '</td><td onclick=x>',
  value: '<img src=x onerror=window.__xss=2>',
  python: '<img src=x onerror=window.__xss=3>',
  terminal: 'echo <b>',
};
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const J = JSON.stringify;

class EnvError extends Error {}

// ---------------------------------------------------------------------------------------------
// CDP driver
// ---------------------------------------------------------------------------------------------
export async function launchChrome({ chrome = DEFAULT_CHROME, scratch, keep = false, log }) {
  if (!existsSync(chrome)) throw new EnvError(`Chrome not found at ${chrome} (pass --chrome PATH)`);
  const profile = join(scratch, 'profile');
  const downloadDir = join(scratch, 'downloads');
  mkdirSync(profile, { recursive: true });
  mkdirSync(downloadDir, { recursive: true });
  const proc = spawn(chrome, ['--headless=new', '--disable-gpu', '--no-first-run', '--no-default-browser-check', `--user-data-dir=${profile}`, '--remote-debugging-port=0', '--remote-allow-origins=*', 'about:blank'], { stdio: 'ignore' });
  const exited = new Promise((r) => proc.once('exit', r));
  let spawnError = null;
  proc.once('error', (e) => { spawnError = e; });
  const portFile = join(profile, 'DevToolsActivePort');
  let port = 0; let wsPath = '';
  for (let i = 0; i < 300 && !port; i++) {
    if (spawnError) throw new EnvError(`Chrome could not be started: ${spawnError.message}`);
    if (existsSync(portFile)) { const [p, path] = readFileSync(portFile, 'utf8').split('\n'); if (p && path) { port = Number(p); wsPath = path.trim(); } }
    if (!port) await sleep(100);
  }
  if (!port) { proc.kill(); throw new EnvError('Chrome did not write DevToolsActivePort within 30 s'); }
  const ws = new WebSocket(`ws://127.0.0.1:${port}${wsPath}`);
  await new Promise((res, rej) => { ws.onopen = res; ws.onerror = () => rej(new EnvError('could not connect to the DevTools websocket')); });
  let nextId = 0;
  const pending = new Map();
  const listeners = [];
  const dialogAnswers = [];
  ws.onmessage = (m) => {
    const d = JSON.parse(m.data);
    if (d.id && pending.has(d.id)) {
      const { res, rej, timer } = pending.get(d.id);
      clearTimeout(timer); pending.delete(d.id);
      if (d.error) rej(new Error(d.error.message)); else res(d.result);
      return;
    }
    const sid = d.sessionId || '';
    switch (d.method) {
      case 'Network.requestWillBeSent': log.requests.push({ url: d.params.request.url, session: sid }); break;
      // WebSocket handshakes never appear as requestWillBeSent; both socket events feed the same allow-list
      case 'Network.webSocketCreated': log.requests.push({ url: d.params.url, session: sid, socket: true }); break;
      case 'Network.webSocketWillSendHandshakeRequest': log.requests.push({ url: `ws-handshake:${d.params.requestId}`, session: sid, socket: true, handshake: true }); break;
      case 'Page.javascriptDialogOpening': {
        const ans = dialogAnswers.length ? dialogAnswers.shift() : { accept: true };
        const entry = { type: d.params.type, message: d.params.message, accepted: !!ans.accept, session: sid };
        log.dialogs.push(entry);
        if (d.params.type === 'alert' || d.params.type === 'prompt') log.forbiddenDialogs.push(entry);
        send('Page.handleJavaScriptDialog', { accept: !!ans.accept, promptText: '' }, sid).catch(() => {});
        break;
      }
      case 'Browser.downloadWillBegin': log.downloads.push({ guid: d.params.guid, name: d.params.suggestedFilename, state: 'begin', filePath: null }); break;
      case 'Browser.downloadProgress': { const e = log.downloads.find((x) => x.guid === d.params.guid); if (e) { e.state = d.params.state; if (d.params.filePath) e.filePath = d.params.filePath; } break; }
      case 'Runtime.exceptionThrown': { const ex = d.params.exceptionDetails; log.exceptions.push({ session: sid, text: ((ex.exception && ex.exception.description) || ex.text || '').slice(0, 600) }); break; }
      case 'Runtime.consoleAPICalled': log.console.push(`${d.params.type}: ${(d.params.args || []).map((a) => a.value ?? a.description ?? '').join(' ')}`.slice(0, 400)); break;
      case 'Log.entryAdded': log.console.push(`${d.params.entry.level}: ${d.params.entry.text}`.slice(0, 400)); break;
      default: break;
    }
    for (const fn of listeners) fn(d.method, d.params, sid);
  };
  ws.onclose = () => { for (const [, p] of pending) { clearTimeout(p.timer); p.rej(new Error('DevTools connection closed')); } pending.clear(); };
  function send(method, params = {}, sessionId, timeoutMs = 30000) {
    return new Promise((res, rej) => {
      const id = ++nextId;
      const timer = setTimeout(() => { pending.delete(id); rej(new Error(`CDP timeout after ${timeoutMs} ms: ${method}`)); }, timeoutMs);
      pending.set(id, { res, rej, timer });
      try { ws.send(JSON.stringify({ id, method, params, sessionId })); } catch (e) { clearTimeout(timer); pending.delete(id); rej(e); }
    });
  }
  await send('Browser.setDownloadBehavior', { behavior: 'allow', downloadPath: downloadDir, eventsEnabled: true });
  const version = await send('Browser.getVersion');
  log.chrome = version.product;

  function waitEvent(method, sessionId, timeoutMs) {
    return new Promise((res, rej) => {
      const timer = setTimeout(() => { listeners.splice(listeners.indexOf(fn), 1); rej(new Error(`timeout waiting for ${method}`)); }, timeoutMs);
      const fn = (m, params, sid) => { if (m === method && sid === sessionId) { clearTimeout(timer); listeners.splice(listeners.indexOf(fn), 1); res(params); } };
      listeners.push(fn);
    });
  }

  async function newPage(url, { blocked = [] } = {}) {
    const { targetId } = await send('Target.createTarget', { url: 'about:blank' });
    const { sessionId } = await send('Target.attachToTarget', { targetId, flatten: true });
    await send('Runtime.enable', {}, sessionId);
    await send('Page.enable', {}, sessionId);
    await send('Network.enable', {}, sessionId);
    await send('Log.enable', {}, sessionId);
    if (blocked.length) await send('Network.setBlockedURLs', { urls: blocked }, sessionId);
    const loaded = waitEvent('Page.loadEventFired', sessionId, 60000);
    await send('Page.navigate', { url }, sessionId);
    await loaded;
    const page = {
      sessionId, targetId,
      async eval(expr, timeoutMs = 30000) {
        const r = await send('Runtime.evaluate', { expression: expr, returnByValue: true, awaitPromise: true }, sessionId, timeoutMs);
        if (r.exceptionDetails) throw new Error(`page evaluate failed: ${(r.exceptionDetails.exception && r.exceptionDetails.exception.description) || r.exceptionDetails.text}`);
        return r.result.value;
      },
      setText(sel, value) { return page.eval(`(() => { const el = document.querySelector(${J(sel)}); if (!el) throw new Error('no element ' + ${J(sel)}); el.value = ${J(value)}; el.dispatchEvent(new Event('input', { bubbles: true })); return true; })()`); },
      click(sel) { return page.eval(`(() => { const el = document.querySelector(${J(sel)}); if (!el) throw new Error('no element ' + ${J(sel)}); if (el.disabled) throw new Error('button is disabled: ' + ${J(sel)}); el.click(); return true; })()`); },
      text(sel) { return page.eval(`(() => { const el = document.querySelector(${J(sel)}); return el ? el.textContent : null; })()`); },
      attr(sel, name) { return page.eval(`(() => { const el = document.querySelector(${J(sel)}); return el ? el.getAttribute(${J(name)}) : null; })()`); },
      async waitFor(expr, timeoutMs, interval = 100) {
        const t0 = Date.now();
        for (;;) {
          const v = await page.eval(expr);
          if (v) return v;
          if (Date.now() - t0 > timeoutMs) return null;
          await sleep(interval);
        }
      },
      waitState(sel, states, timeoutMs) {
        return page.waitFor(`(() => { const el = document.querySelector(${J(sel)}); const s = el && el.getAttribute('data-state'); return ${J(states)}.includes(s) ? s : null; })()`, timeoutMs);
      },
      async reload() { const p = waitEvent('Page.loadEventFired', sessionId, 60000); await send('Page.reload', {}, sessionId); await p; },
      answerNextDialog(accept) { dialogAnswers.push({ accept }); },
      unblock() { return send('Network.setBlockedURLs', { urls: [] }, sessionId); },
      // print the page as the viewer would: Page.printToPDF (the page's beforeprint handler fills the print mirrors)
      async printToPdf(path) { const r = await send('Page.printToPDF', { printBackground: true, paperWidth: 8.5, paperHeight: 11 }, sessionId, 60000); writeFileSync(path, Buffer.from(r.data, 'base64')); return path; },
      // Open a .db file…: click the button (its confirm() is auto-accepted when a db exists), then hand #openDbInput
      // a real file and fire 'change' — the DOM contract's documented path (Page.fileChooserOpened does not fire for
      // a programmatic click under headless, so the chooser is bypassed, exactly as a driver must).
      async chooseFile(clickSel, filePath) {
        await page.click(clickSel);
        await sleep(200);
        await send('DOM.enable', {}, sessionId);
        const doc = await send('DOM.getDocument', { depth: 0 }, sessionId);
        const q = await send('DOM.querySelector', { nodeId: doc.root.nodeId, selector: '#openDbInput' }, sessionId);
        if (!q.nodeId) throw new Error('no #openDbInput');
        await send('DOM.setFileInputFiles', { files: [filePath], nodeId: q.nodeId }, sessionId);
        await page.eval(`document.getElementById('openDbInput').dispatchEvent(new Event('change', { bubbles: true })); true`);
      },
      close() { return send('Target.closeTarget', { targetId }); },
    };
    return page;
  }
  async function close() {
    try { await send('Browser.close', {}, undefined, 5000); } catch { try { proc.kill(); } catch { /* already gone */ } }
    await Promise.race([exited, sleep(8000)]);
    try { ws.close(); } catch { /* closed */ }
    if (proc.exitCode === null) { try { proc.kill('SIGKILL'); } catch { /* gone */ } await Promise.race([exited, sleep(2000)]); }
    if (!keep) rmSync(scratch, { recursive: true, force: true, maxRetries: 5, retryDelay: 200 });
  }
  return { newPage, close, downloadDir, send };
}

// Pure: the first COMPLETED download record with this name that began at index >= start (records before the
// click belong to an earlier download of the same name, whose file Chrome has since overwritten).
export function pickDownload(downloads, name, start = 0) {
  for (let i = start; i < downloads.length; i++) { const d = downloads[i]; if (d.name === name && d.state === 'completed') return d; }
  return null;
}
async function waitDownload(log, name, timeoutMs, downloadDir, start = 0) {
  const t0 = Date.now();
  for (;;) {
    const d = pickDownload(log.downloads, name, start);
    if (d) {
      const path = d.filePath && existsSync(d.filePath) ? d.filePath : join(downloadDir, name);
      if (existsSync(path)) { await sleep(50); return { path, bytes: readFileSync(path) }; }
    }
    if (Date.now() - t0 > timeoutMs) throw new Error(`download "${name}" did not complete after the click (${J(log.downloads.slice(start).filter((x) => x.name === name))})`);
    await sleep(100);
  }
}
// The request allow-list: file:/about:/blob:/data: URLs, the two CDN bases; nothing else — no socket either.
// A file: URL counts only when its HOST is empty: `file://host/x` (what a protocol-relative `//host/x` resolves
// to on a file:// page) is an SMB/UNC fetch off this machine, not a local read.
export function isAllowedRequest(url, cdn) {
  if (/^file:/i.test(url)) { try { return new URL(url).host === ''; } catch { return false; } }
  return /^(about:|blob:|data:)/.test(url) || url.startsWith(cdn.sqljs.base) || url.startsWith(cdn.pyodide.base);
}
export function tool(path) { return existsSync(path) ? path : null; }
export const PDFTOTEXT = ['/usr/bin/pdftotext', '/opt/homebrew/bin/pdftotext', '/usr/local/bin/pdftotext'].find((p) => existsSync(p)) || null;

// ---------------------------------------------------------------------------------------------
// Assertions
// ---------------------------------------------------------------------------------------------
export function makeReporter(json) {
  const results = [];
  return {
    results,
    check(name, ok, detail) {
      const d = String(detail ?? '').replace(/\s+/g, ' ').trim().slice(0, 700);
      results.push({ name, ok: !!ok, detail: d });
      if (!json) console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}${d ? '  — ' + d.slice(0, 260) : ''}`);
      return !!ok;
    },
    failed() { return results.filter((r) => !r.ok).length; },
  };
}

const rowsLabel = (n) => `${n} ${H.plural(n, 'row', 'rows')}`;

// ---------------------------------------------------------------------------------------------
// Page-level helpers built on the DOM contract
// ---------------------------------------------------------------------------------------------
async function pyReady(page) { return (await page.attr('#enginePython', 'data-state')) === 'ready'; }
function pyTimeout(ready, ctx) { return Math.min(ready ? STEP_TIMEOUT_MS : FIRST_PYTHON_TIMEOUT_MS, ctx.remaining()); }

async function readTables(page) {
  return page.eval(`(() => { const o = {}; document.querySelectorAll('#dbTables .db-table-row').forEach((r) => { o[r.getAttribute('data-table')] = (r.querySelector('.count') || {}).textContent || ''; }); const e = document.querySelector('#dbTables .db-empty'); return { tables: o, empty: e ? e.textContent : null }; })()`);
}
// A top-level {"tables": …} action (and any empty map) is exact: the panel lists exactly these tables.
// `expect.tables` inside another action is a subset: every listed table must show that count.
async function assertTables(page, expected, R, label, { exact = true } = {}) {
  const got = await readTables(page);
  const want = {};
  for (const [name, n] of Object.entries(expected)) want[name] = rowsLabel(n);
  const strict = exact || Object.keys(want).length === 0;
  const ok = strict
    ? JSON.stringify(Object.entries(got.tables).sort()) === JSON.stringify(Object.entries(want).sort())
    : Object.entries(want).every(([name, count]) => got.tables[name] === count);
  R.check(`${label}: Tables ${strict ? '=' : '⊇'} ${J(expected)}`, ok, ok ? (got.empty || '') : `got ${J(got.tables)}${got.empty ? ' / ' + got.empty : ''}`);
}

// expect.structure = { table: { includes: [...], excludes: [...] } } — clicks Structure on each table and reads #dbDetail.
async function assertStructure(page, expected, R, label) {
  for (const [table, rule] of Object.entries(expected || {})) {
    const clicked = await page.eval(`(() => { const b = Array.from(document.querySelectorAll('[data-action="structure"]')).find((x) => x.getAttribute('data-table') === ${J(table)}); if (!b) return false; b.click(); return true; })()`);
    const text = clicked ? await page.text('#dbDetail') : '';
    R.check(`${label}: Structure of ${table} is shown`, clicked && /^Structure of /.test(text.trim()), clicked ? text.slice(0, 120) : `no Structure button for ${table}`);
    for (const x of rule.includes || []) R.check(`${label}: structure of ${table} includes ${J(x)}`, text.includes(x), text.slice(0, 200));
    for (const x of rule.excludes || []) R.check(`${label}: structure of ${table} excludes ${J(x)}`, !text.includes(x), text.slice(0, 200));
  }
}
async function assertExpectTail(page, ex, R, label) {
  if (ex.tables) await assertTables(page, ex.tables, R, label, { exact: false });
  if (ex.structure) await assertStructure(page, ex.structure, R, label);
}

async function readSqlOutput(page, ws) {
  return page.eval(`(() => { const o = document.getElementById('out-' + ${J(ws)}); if (!o) return null; return {
    state: o.getAttribute('data-state'), text: o.textContent,
    heads: Array.from(o.querySelectorAll('.out-head')).map((e) => e.textContent),
    tables: Array.from(o.querySelectorAll('table.result')).map((t) => Array.from(t.querySelectorAll('tbody tr')).map((tr) => Array.from(tr.children).map((td) => td.textContent))),
    msgs: Array.from(o.querySelectorAll('.out-msg')).map((m) => ({ cls: m.className, text: m.textContent })),
    caption: (o.querySelector('.out-caption') || {}).textContent || null,
    remaining: (o.querySelector('pre.out-code') || {}).textContent || '' }; })()`);
}

// Set a SQL box, click Run (asserting the synchronous busy contract), wait, and return the parsed output.
async function runSqlBox(page, ws, sql, ctx, R, label) {
  const sync = await page.eval(`(() => { const ta = document.getElementById(${J(ws)}); if (!ta) throw new Error('no textarea #' + ${J(ws)});
    ta.value = ${J(sql)}; ta.dispatchEvent(new Event('input', { bubbles: true }));
    const btn = document.querySelector('[data-action="run-sql"][data-ws=' + ${J(J(ws))} + ']'); if (!btn) throw new Error('no Run button for ' + ${J(ws)}); if (btn.disabled) throw new Error('Run button disabled for ' + ${J(ws)});
    btn.click();
    return { state: document.getElementById('out-' + ${J(ws)}).getAttribute('data-state'), busy: document.documentElement.getAttribute('aria-busy'), enabled: Array.from(document.querySelectorAll('[data-engine-button]')).filter((b) => !b.disabled).length }; })()`);
  R.check(`${label}: Run sets data-state=running + aria-busy synchronously and disables every engine button`, sync.state === 'running' && sync.busy === 'true' && sync.enabled === 0, J(sync));
  ctx.driven[ws] = sql;
  const state = await page.waitState(`#out-${ws}`, ['done', 'error'], Math.min(STEP_TIMEOUT_MS, ctx.remaining()));
  const out = await readSqlOutput(page, ws);
  if (!state) R.check(`${label}: finished within the step timeout`, false, `state stayed ${out && out.state}`);
  return out;
}

async function runPythonCell(page, code, ctx, R, label) {
  const ready = await pyReady(page);
  const sync = await page.eval(`(() => { const ta = document.getElementById('pythonCode'); ta.value = ${J(code)}; ta.dispatchEvent(new Event('input', { bubbles: true }));
    const btn = document.getElementById('pythonRunBtn'); if (btn.disabled) throw new Error('Run Python is disabled'); btn.click();
    return { state: document.getElementById('pythonOutput').getAttribute('data-state'), busy: document.documentElement.getAttribute('aria-busy'), enabled: Array.from(document.querySelectorAll('[data-engine-button]')).filter((b) => !b.disabled).length }; })()`);
  R.check(`${label}: Run Python sets data-state=running + aria-busy synchronously`, sync.state === 'running' && sync.busy === 'true' && sync.enabled === 0, J(sync));
  const state = await page.waitState('#pythonOutput', ['done', 'error'], pyTimeout(ready, ctx));
  const out = await page.eval(`(() => { const o = document.getElementById('pythonOutput'); return { state: o.getAttribute('data-state'), text: o.textContent,
    stdout: Array.from(o.querySelectorAll('pre.out-text:not(.stderr)')).map((e) => e.textContent).join(''),
    stderr: Array.from(o.querySelectorAll('pre.out-text.stderr')).map((e) => e.textContent).join('\\n'),
    notes: Array.from(o.querySelectorAll('.out-msg.note')).map((e) => e.textContent) }; })()`);
  if (!state) R.check(`${label}: Python finished within ${ready ? STEP_TIMEOUT_MS : FIRST_PYTHON_TIMEOUT_MS} ms`, false, `state stayed ${out.state}; ${await page.text('#enginePython')}`);
  return out;
}

async function runTerminal(page, cmd, ctx, R, label) {
  const isPython = /^(python|python3|py)\s+\S/.test(cmd.trim()) && !/^(python|python3|py)\s+-m\s+pip/.test(cmd.trim());
  const ready = await pyReady(page);
  const sync = await page.eval(`(() => { const i = document.getElementById('terminalInput'); i.value = ${J(cmd)}; i.dispatchEvent(new Event('input', { bubbles: true }));
    const btn = document.getElementById('terminalRunBtn'); if (btn.disabled) throw new Error('terminal Run is disabled'); btn.click();
    return { state: document.getElementById('terminal').getAttribute('data-state'), busy: document.documentElement.getAttribute('aria-busy'), enabled: Array.from(document.querySelectorAll('[data-engine-button]')).filter((b) => !b.disabled).length }; })()`);
  if (isPython) R.check(`${label}: terminal Run sets data-state=running + aria-busy synchronously`, sync.state === 'running' && sync.busy === 'true' && sync.enabled === 0, J(sync));
  else R.check(`${label}: terminal processed the command`, sync.state === 'done' || sync.state === 'running', J(sync));
  const state = await page.waitState('#terminal', ['done', 'error'], isPython ? pyTimeout(ready, ctx) : Math.min(STEP_TIMEOUT_MS, ctx.remaining()));
  const out = await page.eval(`(() => { const e = document.querySelector('#terminalTranscript .term-entry:last-child'); const t = document.getElementById('terminal'); if (!e) return { state: t.getAttribute('data-state'), cmd: null, stdout: '', stderr: '', exit: null };
    const g = (s) => (e.querySelector(s) || {}).textContent || ''; return { state: t.getAttribute('data-state'), cmd: g('.term-cmd'), stdout: g('.term-stdout'), stderr: g('.term-stderr'), exit: g('.term-exit') || null }; })()`);
  if (!state) R.check(`${label}: terminal finished within the timeout`, false, `state stayed ${out.state}; ${await page.text('#terminalStatus')}`);
  return out;
}

// ---------------------------------------------------------------------------------------------
// Actions
// ---------------------------------------------------------------------------------------------
async function doTerminal(page, action, ctx, R, label) {
  const out = await runTerminal(page, action.terminal, ctx, R, label);
  R.check(`${label}: transcript echoes "$ ${action.terminal}"`, out.cmd === `$ ${action.terminal}`, out.cmd);
  R.check(`${label}: data-state=done`, out.state === 'done', `${out.state}; stderr: ${out.stderr.slice(0, 200)}`);
  const ex = action.expect || {};
  for (const s of ex.stdoutIncludes || []) R.check(`${label}: stdout includes ${J(s)}`, out.stdout.includes(s), out.stdout.slice(0, 300));
  for (const s of ex.stderrIncludes || []) R.check(`${label}: stderr includes ${J(s)}`, out.stderr.includes(s), out.stderr.slice(0, 300));
  if (ex.exit != null) R.check(`${label}: exit line is ${J(ex.exit)}`, out.exit === ex.exit, String(out.exit));
  else R.check(`${label}: no exit line (the script finished normally)`, !out.exit, String(out.exit));
  // stderr may carry the page's file-sync notes ("Created campus_travel.db"); a traceback is only fine when expected
  if (!ex.stderrIncludes) R.check(`${label}: no traceback on stderr`, !/Traceback \(most recent call last\)|Error:/.test(out.stderr), out.stderr.slice(0, 200));
}

async function doSql(page, action, ctx, R, label) {
  let sql;
  try { sql = blockSql(ctx.blocks, action.block); } catch (e) { R.check(`${label}: block ${action.block} exists in solutions-ch${ctx.chapter}.sql`, false, e.message); return; }
  const out = await runSqlBox(page, action.sql, sql, ctx, R, label);
  if (!out) { R.check(`${label}: output element exists`, false, `#out-${action.sql}`); return; }
  const ex = action.expect || {};
  // the LAST run of a box is the one whose record the export carries (chapter 2 drives s2-37-4 six times)
  ctx.sqlRuns.set(action.sql, { block: action.block, expect: ex, sql });
  const errMsg = out.msgs.find((m) => /\berror\b/.test(m.cls));
  if (ex.errorIncludes) {
    R.check(`${label}: data-state=error with "${ex.errorIncludes}"`, out.state === 'error' && !!errMsg && errMsg.text.includes(ex.errorIncludes), `${out.state}: ${(errMsg && errMsg.text) || out.text.slice(0, 200)}`);
    R.check(`${label}: the error names the statement and what was applied`, !!errMsg && /^Statement \d+ failed: .*\. (No earlier statements were applied|Statement 1 was applied|Statements 1–\d+ were applied); the rest was not run:$/.test(errMsg.text), errMsg && errMsg.text);
  } else {
    R.check(`${label}: data-state=done`, out.state === 'done', `${out.state}: ${(errMsg && errMsg.text) || out.text.slice(0, 200)}`);
  }
  if (Array.isArray(ex.results)) {
    ex.results.forEach((r, k) => {
      const head = out.heads[k] || '';
      const want = H.resultHeading(k + 1, r.rows);
      R.check(`${label}: ${want}`, head.startsWith(want), head || '(no result heading)');
      const rows = out.tables[k] || [];
      if (r.rows === 0) R.check(`${label}: result ${k + 1} renders the "0 rows" cell`, rows.length === 1 && rows[0][0] === '0 rows', J(rows));
      else R.check(`${label}: result ${k + 1} renders ${Math.min(r.rows, H.ROW_CAP)} rows`, rows.length === Math.min(r.rows, H.ROW_CAP), `${rows.length} rows rendered`);
      if (r.cell) {
        const [ri, ci, v] = r.cell;
        const got = rows[ri] ? rows[ri][ci] : undefined;
        R.check(`${label}: result ${k + 1} cell [${ri},${ci}] = ${J(v)}`, got === String(v), `got ${J(got)}`);
      }
    });
  }
  if (ex.changed != null) {
    const want = H.changedMessage(ex.changed);
    R.check(`${label}: "${want}"`, out.msgs.some((m) => /\bok\b/.test(m.cls) && m.text === want), out.msgs.map((m) => m.text).join(' | '));
  }
  if (ex.messageIncludes) for (const s of [].concat(ex.messageIncludes)) R.check(`${label}: output includes ${J(s)}`, out.text.includes(s), out.text.slice(0, 300));
  await assertExpectTail(page, ex, R, label);
}

async function doPython(page, action, ctx, R, label) {
  const out = await runPythonCell(page, action.python, ctx, R, label);
  const ex = action.expect || {};
  if (ex.errorIncludes) R.check(`${label}: data-state=error with "${ex.errorIncludes}"`, out.state === 'error' && out.stderr.includes(ex.errorIncludes), `${out.state}: ${out.stderr.slice(0, 300)}`);
  else R.check(`${label}: data-state=done`, out.state === 'done', `${out.state}: ${out.stderr.slice(0, 300) || out.text.slice(0, 200)}`);
  for (const s of ex.stdoutIncludes || []) R.check(`${label}: stdout includes ${J(s)}`, out.stdout.includes(s), out.stdout.slice(0, 300));
  for (const s of ex.stderrIncludes || []) R.check(`${label}: stderr includes ${J(s)}`, out.stderr.includes(s), out.stderr.slice(0, 300));
  for (const s of ex.notesInclude || []) R.check(`${label}: notes include ${J(s)}`, out.notes.some((n) => n.includes(s)), out.notes.join(' | '));
  if (ex.notesExclude) for (const s of ex.notesExclude) R.check(`${label}: notes exclude ${J(s)}`, !out.notes.some((n) => n.includes(s)), out.notes.join(' | '));
  R.check(`${label}: Python engine strip reports ready with a version`, /^Python ready · 3\.\d+/.test(await page.text('#enginePython strong')), await page.text('#enginePython strong'));
  await assertExpectTail(page, ex, R, label);
}

async function doDownloadDb(page, action, ctx, R, label) {
  const name = await page.text('#dbName');
  const before = ctx.log.downloads.length;
  await page.click('#downloadDbBtn');
  let file;
  try { file = await waitDownload(ctx.log, name, 15000, ctx.downloadDir, before); } catch (e) { R.check(`${label}: ${name} downloads`, false, `${e.message}; status: ${await page.text('#saveStatus')}`); return; }
  R.check(`${label}: ${name} is a real download started by this click (${file.bytes.length} bytes)`, ctx.log.downloads.length > before && file.bytes.length > 0, file.path);
  R.check(`${label}: ${name} carries the SQLite header`, H.isSqliteHeader(new Uint8Array(file.bytes)), '');
  R.check(`${label}: status says Downloaded ${name}`, (await page.text('#saveStatus')) === `Downloaded ${name}`, await page.text('#saveStatus'));
  const ex = action.expect || {};
  if (Array.isArray(ex.sqlite3) && ex.sqlite3.length) {
    if (!existsSync(SQLITE3)) { R.check(`${label}: sqlite3 checks`, true, `WARNING: ${SQLITE3} not found — ${ex.sqlite3.length} sub-checks skipped`); return; }
    const copy = join(ctx.scratch, `dl-${ctx.chapter}-${Date.now()}-${H.basename(name)}`);
    writeFileSync(copy, file.bytes);
    for (const [sql, want] of ex.sqlite3) {
      let got;
      try { got = execFileSync(SQLITE3, ['-batch', copy, sql], { encoding: 'utf8' }).trim(); } catch (e) { got = `ERROR ${(e.stderr || e.message).toString().trim()}`; }
      R.check(`${label}: sqlite3 ${J(sql)} → ${J(want)}`, got === want, `got ${J(got)}`);
    }
  }
}

// The exported .md is the graded artefact, so every `includes` string in expected/chapter-N.json is satisfied by
// text that is present whether or not a single box was ever RUN (the SQL the driver typed, the terminal record,
// the "Database at export time" section). These helpers read the export the way a grader does: per box, the
// heading, then the result BLOCK that belongs to it.
// The section of the export that belongs to one "### …" heading: everything up to the next "### " heading.
export function exportSection(md, heading) {
  const at = md.indexOf(`\n${heading}\n`);
  if (at < 0) return null;
  const rest = md.slice(at + heading.length + 2);
  const next = rest.indexOf('\n### ');
  return next < 0 ? rest : rest.slice(0, next);
}
// The markdown table that follows "**Result k · n rows**" inside a section → its data rows as string cells.
export function exportResultRows(section, headingLine) {
  const at = section.indexOf(`**${headingLine}**`);
  if (at < 0) return null;
  const lines = section.slice(at + headingLine.length + 4).split('\n');
  const rows = [];
  let seen = 0;
  for (const line of lines) {
    if (!line.startsWith('|')) { if (rows.length || seen >= 2) break; if (line.trim() === '') continue; break; }
    seen++;
    if (seen <= 2) continue;                       // header row, then the |---|---| separator
    rows.push(line.split('|').slice(1, -1).map((c) => c.trim()));
  }
  return { rows, header: seen > 0 };
}

async function doExport(page, action, ctx, R, label) {
  const name = await page.eval('window.HW_PAGE.exportName') || H.exportFileName(ctx.chapter);
  const before = ctx.log.downloads.length;
  await page.click('#exportBtn');
  let file;
  try { file = await waitDownload(ctx.log, name, 15000, ctx.downloadDir, before); } catch (e) { R.check(`${label}: ${name} downloads`, false, e.message); return; }
  const md = file.bytes.toString('utf8');
  R.check(`${label}: ${name} is a real download (${md.length} chars)`, md.length > 0, file.path);
  R.check(`${label}: status says Exported ${name}`, (await page.text('#saveStatus')).startsWith(`Exported ${name}`), await page.text('#saveStatus'));
  const ex = action.expect || {};
  for (const s of ex.includes || []) R.check(`${label}: export includes ${J(s)}`, md.includes(s), md.includes(s) ? '' : md.slice(0, 200));
  for (const s of ex.excludes || []) R.check(`${label}: export excludes ${J(s)}`, !md.includes(s), md.includes(s) ? `found at ${md.indexOf(s)}: …${md.slice(Math.max(0, md.indexOf(s) - 40), md.indexOf(s) + 60)}…` : '');
  R.check(`${label}: export never mentions location.*, file:// or a drive letter path`, !/location\.|file:\/\/|[A-Za-z]:\\/.test(md), '');
  R.check(`${label}: an unused optional box is marked "optional — not attempted", never "no answer"`, !/\(optional\) — [^\n]+\n\n_\(no answer\)_/.test(md), '');
  R.check(`${label}: export starts with the page title and the student line`, /^# Week 1 · Chapter \d · .+\n\nStudent: /.test(md), md.slice(0, 80));
  for (const ws of Object.keys(ctx.driven)) R.check(`${label}: export carries the SQL of ${ws}`, md.includes(ctx.driven[ws].trim()), '');

  // The RESULT of every box driven so far must be in the file, under that box's own heading. Without this an
  // export in which every SQL box reads "_(written but never run …)_" satisfies every `includes` string.
  const meta = await page.eval(`window.HW_PAGE.workspaces.map((w) => ({ id: w.id, tool: w.tool, stepLabel: w.stepLabel, optional: !!w.optional }))`);
  const headingOf = (w) => `### Step ${w.stepLabel}${w.optional ? ' (optional)' : ''} — SQL (${w.id})`;
  for (const id of Object.keys(ctx.driven)) {
    const w = meta.find((x) => x.id === id);
    if (!w) { R.check(`${label}: ${id} is a workspace on the page`, false, 'not in HW_PAGE.workspaces'); continue; }
    const heading = headingOf(w);
    const section = exportSection(md, heading);
    if (!R.check(`${label}: export has "${heading}"`, section !== null, `heading not found in ${md.length} chars`)) continue;
    R.check(`${label}: ${id} is not marked "written but never run"`, !section.includes('_(written but never run'), section.slice(0, 200));
    R.check(`${label}: ${id}'s result is not stale ("from an earlier version of the box")`, !section.includes('an earlier version of the box'), section.slice(0, 200));
    const run = ctx.sqlRuns.get(id);
    if (!run) continue;
    const ex = run.expect || {};
    if (Array.isArray(ex.results)) {
      ex.results.forEach((r, k) => {
        const want = H.resultHeading(k + 1, r.rows);
        const got = exportResultRows(section, want);
        if (!R.check(`${label}: ${id} exports "**${want}**"`, !!got, section.slice(0, 300))) return;
        const shown = Math.min(r.rows, H.STORED_ROW_CAP);
        R.check(`${label}: ${id} result ${k + 1} exports ${shown} table rows`, got.rows.length === shown, `${got.rows.length} rows in the exported table`);
        if (r.cell) {
          const [ri, ci, v] = r.cell;
          const cell = got.rows[ri] ? got.rows[ri][ci] : undefined;
          R.check(`${label}: ${id} exported cell [${ri},${ci}] = ${J(v)}`, cell === String(v), `got ${J(cell)}`);
        }
      });
    }
    if (ex.changed != null) R.check(`${label}: ${id} exports "${H.changedMessage(ex.changed)}"`, section.includes(H.changedMessage(ex.changed)), section.slice(0, 300));
    if (!Array.isArray(ex.results) && ex.changed == null && ex.errorIncludes) {
      R.check(`${label}: ${id} exports the error "${ex.errorIncludes}"`, section.includes(ex.errorIncludes), section.slice(0, 300));
    }
  }
  writeFileSync(join(ctx.scratch, `export-${ctx.chapter}-${name}`), md);
}

// A malformed stored record (another local page on the shared file:// origin can write this key): the page must
// still come up with SQLite ready, every text restored and only that record dropped.
const CORRUPT_RECORD = { kind: 'sql', ts: '2026-01-01T00:00:00.000Z', items: [{ type: 'result', k: 1, rows: [], total: 0 }], error: null };
const RELOAD_MARKER = 'reload marker — this text must survive the reload';
export const markerFor = (id) => `${id} · ${RELOAD_MARKER}`;

// Everything the reload has to bring back, read straight off the page.
async function reloadSnapshot(page, restored) {
  return page.eval(`(() => {
    const texts = {};
    document.querySelectorAll('textarea[data-ws-text]').forEach((t) => { texts[t.id] = t.value; });
    const entries = Array.from(document.querySelectorAll('#terminalTranscript .term-entry'));
    const last = entries[entries.length - 1];
    const g = (e, s) => (e.querySelector(s) || {}).textContent || '';
    const results = {};
    for (const id of ${J(restored)}) {
      const o = document.getElementById('out-' + id);
      results[id] = o ? { head: (o.querySelector('.out-head') || {}).textContent || '', rows: (o.querySelector('table.result') ? o.querySelectorAll('table.result tbody tr').length : -1) } : null;
    }
    return {
      name: document.getElementById('studentName').value,
      python: document.getElementById('pythonCode').value,
      pythonState: document.getElementById('pythonOutput').getAttribute('data-state'),
      pythonOut: Array.from(document.querySelectorAll('#pythonOutput pre.out-text')).map((e) => e.textContent).join('\\n'),
      texts: texts,
      transcript: entries.length,
      lastCmd: last ? g(last, '.term-cmd') : null,
      lastOut: last ? g(last, '.term-stdout') : null,
      results: results,
    };
  })()`);
}

async function doReload(page, action, ctx, R, label) {
  const ex = action.expect || {};
  const restored = ex.restored || [];
  // Give the driver a name and every written-answer box a marker of its own, so "the reload restored the text"
  // is an assertion about real content and not about two empty strings matching.
  const NAME = 'Verification Driver';
  await page.setText('#studentName', NAME);
  const textIds = await page.eval(`window.HW_PAGE.workspaces.filter((w) => w.tool === 'text').map((w) => w.id)`);
  for (const id of textIds) await page.setText(`#${id}`, markerFor(id));
  R.check(`${label}: every written-answer box carries a marker before the reload (${textIds.length} boxes)`, textIds.length > 0, J(textIds));
  await sleep(H.TEXT_SAVE_DEBOUNCE_MS + 300);   // let the debounced text save land before the reload
  const snap = await reloadSnapshot(page, restored);
  let markerWs = null;
  if (Array.isArray(action.corrupt) && action.corrupt.length) {
    markerWs = textIds[0] || null;
    const main = H.storageKeys(ctx.chapter).main;
    const done = await page.eval(`(() => { const s = JSON.parse(localStorage.getItem(${J(main)})); if (!s || !s.outputs) return false; for (const id of ${J(action.corrupt)}) s.outputs[id] = ${J(CORRUPT_RECORD)}; localStorage.setItem(${J(main)}, JSON.stringify(s)); return true; })()`);
    R.check(`${label}: stored records ${action.corrupt.join(', ')} replaced by a malformed shape before the reload`, done, '');
  }
  const nEx = ctx.log.exceptions.length;
  await page.reload();
  const eng = await page.waitState('#engineSqlite', ['ready', 'error'], Math.min(STEP_TIMEOUT_MS, ctx.remaining()));
  R.check(`${label}: SQLite ready after reload`, eng === 'ready', await page.text('#engineSqlite'));
  await page.waitFor(`!!document.querySelector('#dbTables .db-table-row, #dbTables .db-empty')`, 10000);
  if (Array.isArray(action.corrupt) && action.corrupt.length) {
    for (const id of action.corrupt) R.check(`${label}: #out-${id} (corrupted record) is idle, not rendered`, (await page.attr(`#out-${id}`, 'data-state')) === 'idle', await page.attr(`#out-${id}`, 'data-state'));
    if (markerWs) R.check(`${label}: text in ${markerWs} survived the corrupted record`, (await page.eval(`document.getElementById(${J(markerWs)}).value`)) === markerFor(markerWs), '');
    R.check(`${label}: no uncaught exception while restoring the corrupted record`, ctx.log.exceptions.length === nEx, J(ctx.log.exceptions.slice(nEx)));
    R.check(`${label}: the status line does not report unreadable work (only the one record was dropped)`, !/could not be read/.test(await page.text('#saveStatus')), await page.text('#saveStatus'));
  }
  for (const id of restored) {
    const out = await readSqlOutput(page, id);
    const text = await page.eval(`(document.getElementById(${J(id)}) || {}).value`);
    R.check(`${label}: #out-${id} restored with caption`, !!out && out.state === 'restored' && /^Result from .+ — Run again to refresh$/.test(out.caption || ''), out ? `${out.state} / ${out.caption}` : 'no output');
    if (ctx.driven[id] !== undefined) R.check(`${label}: ${id} text restored`, text === ctx.driven[id], `${(text || '').slice(0, 60)}`);
  }
  // Everything else the snapshot recorded: the name, the Python cell and its output, EVERY box (not only the
  // ones named in `restored`), the transcript, and the rows each restored result still holds.
  const after = await reloadSnapshot(page, restored);
  R.check(`${label}: the student name survived the reload`, after.name === snap.name && after.name === NAME, `${J(after.name)} vs ${J(snap.name)}`);
  R.check(`${label}: the Python cell text survived the reload`, after.python === snap.python, `${J(after.python.slice(0, 60))} vs ${J(snap.python.slice(0, 60))}`);
  const wantPyState = snap.pythonState === 'idle' ? 'idle' : 'restored';
  R.check(`${label}: #pythonOutput is ${wantPyState} after the reload (it was ${snap.pythonState})`, after.pythonState === wantPyState, `${after.pythonState}`);
  if (snap.pythonState !== 'idle') {
    R.check(`${label}: the restored Python output still carries the same text (${snap.pythonOut.length} chars)`, snap.pythonOut.length > 0 && after.pythonOut === snap.pythonOut, `${J(after.pythonOut.slice(0, 120))} vs ${J(snap.pythonOut.slice(0, 120))}`);
  }
  const changedTexts = Object.keys(snap.texts).filter((id) => after.texts[id] !== snap.texts[id]);
  R.check(`${label}: every textarea[data-ws-text] (${Object.keys(snap.texts).length}) came back with the same value`, changedTexts.length === 0, changedTexts.map((id) => `${id}: ${J(String(after.texts[id]).slice(0, 40))} ≠ ${J(String(snap.texts[id]).slice(0, 40))}`).join(' | '));
  for (const id of textIds) R.check(`${label}: written answer ${id} came back as its marker`, after.texts[id] === markerFor(id), J(String(after.texts[id]).slice(0, 60)));
  R.check(`${label}: the terminal transcript kept its ${snap.transcript} entries and its last command`, after.transcript === snap.transcript && after.lastCmd === snap.lastCmd && after.lastOut === snap.lastOut, `${after.transcript} entries, last ${J(after.lastCmd)}`);
  for (const id of restored) {
    const b = snap.results[id]; const a = after.results[id];
    if (!b || !a) { R.check(`${label}: #out-${id} exists before and after the reload`, false, J({ before: b, after: a })); continue; }
    R.check(`${label}: #out-${id} kept its result heading ${J(b.head)}`, a.head === b.head, `got ${J(a.head)}`);
    const wantRows = b.rows < 0 ? b.rows : Math.min(b.rows, H.STORED_ROW_CAP);
    R.check(`${label}: #out-${id} still renders ${wantRows} rows`, a.rows === wantRows, `got ${a.rows}`);
  }
  await assertExpectTail(page, ex, R, label);
  const keys = await page.eval('Object.keys(localStorage).sort()');
  const mine = H.storageKeys(ctx.chapter);
  R.check(`${label}: localStorage keys are only hw-week1-chapter-*-v1[:db] and include this page's key`, keys.every((k) => /^hw-week1-chapter-\d+-v1(:db)?$/.test(k)) && keys.includes(mine.main), J(keys));
  R.check(`${label}: no save failure after reload`, !/Could not save|could not be opened/.test(await page.text('#saveStatus')), await page.text('#saveStatus'));
}

async function doReset(page, action, ctx, R, label) {
  const confirmTexts = await page.eval('window.HW_PAGE.confirmTexts');
  const nDialogs = ctx.log.dialogs.length;
  ctx.dialogsExpected++;
  await page.click('#resetDbBtn');
  const status = await page.waitFor(`(() => { const s = document.getElementById('saveStatus').textContent; return /^Database (reset to the original|removed)/.test(s) ? s : null; })()`, 10000);
  const dialog = ctx.log.dialogs[nDialogs];
  R.check(`${label}: confirm() shown with confirmTexts.reset`, !!dialog && dialog.type === 'confirm' && dialog.message === confirmTexts.reset, dialog ? `${dialog.type}: ${dialog.message.slice(0, 100)}` : 'no dialog');
  R.check(`${label}: status reports the reset`, !!status, await page.text('#saveStatus'));
  const ex = action.expect || {};
  await assertExpectTail(page, ex, R, label);
  R.check(`${label}: page not busy after reset`, (await page.attr('html', 'aria-busy')) !== 'true', '');
}

// {"cancel": "reset"|"clear"|"openDb"}: confirm() answered false → "Cancelled — nothing changed", nothing else moves.
async function doCancel(page, action, ctx, R, label) {
  const target = action.cancel;
  const confirmTexts = await page.eval('window.HW_PAGE.confirmTexts');
  const wantText = confirmTexts[target === 'openDb' ? 'replace' : target];
  const sel = { reset: '#resetDbBtn', clear: '#clearWorkBtn', openDb: '#openDbBtn' }[target];
  const before = { tables: J(await readTables(page)), keys: await page.eval('Object.keys(localStorage).sort()'), texts: await page.eval(`Array.from(document.querySelectorAll('textarea[data-ws-text]')).map((t) => t.value)`) };
  if (target === 'openDb') {
    const hasDb = await page.eval(`Array.from(document.querySelectorAll('#dbTables .db-table-row')).length > 0 || !document.querySelector('#dbTables .db-empty')`);
    if (!hasDb) { R.check(`${label}: a database exists (Open only confirms when one does)`, false, await page.text('#dbTables')); return; }
  }
  const nDialogs = ctx.log.dialogs.length;
  ctx.dialogsExpected++;
  page.answerNextDialog(false);
  await page.click(sel);
  const status = await page.waitFor(`(() => { const s = document.getElementById('saveStatus').textContent; return s === 'Cancelled — nothing changed' ? s : null; })()`, 10000);
  const dialog = ctx.log.dialogs[nDialogs];
  R.check(`${label}: confirm() shown with confirmTexts.${target === 'openDb' ? 'replace' : target} and answered false`, !!dialog && dialog.type === 'confirm' && dialog.message === wantText && dialog.accepted === false, dialog ? `${dialog.type}: ${dialog.message.slice(0, 100)} accepted=${dialog.accepted}` : 'no dialog');
  R.check(`${label}: status says "Cancelled — nothing changed"`, !!status, await page.text('#saveStatus'));
  const after = { tables: J(await readTables(page)), keys: await page.eval('Object.keys(localStorage).sort()'), texts: await page.eval(`Array.from(document.querySelectorAll('textarea[data-ws-text]')).map((t) => t.value)`) };
  R.check(`${label}: Tables unchanged`, after.tables === before.tables, after.tables.slice(0, 120));
  R.check(`${label}: localStorage keys unchanged`, J(after.keys) === J(before.keys), J(after.keys));
  R.check(`${label}: every box unchanged`, J(after.texts) === J(before.texts), '');
  R.check(`${label}: page not busy`, (await page.attr('html', 'aria-busy')) !== 'true', '');
}

// {"openDb": "sqlite"|"text"}: Open a .db file… with a real file through the native chooser (intercepted via CDP).
let openCounter = 0;
async function doOpenDb(page, action, ctx, R, label) {
  const kind = action.openDb;
  const ex = action.expect || {};
  openCounter++;
  let filePath;
  if (kind === 'sqlite') {
    if (!existsSync(SQLITE3)) { R.check(`${label}: open a real .db`, true, `WARNING: ${SQLITE3} not found — skipped`); return; }
    filePath = join(ctx.scratch, `open-${ctx.chapter}-${openCounter}.db`);
    execFileSync(SQLITE3, ['-batch', filePath, 'CREATE TABLE opened(x INTEGER); INSERT INTO opened VALUES (1), (2);'], { encoding: 'utf8' });
  } else {
    filePath = join(ctx.scratch, `not-a-db-${ctx.chapter}-${openCounter}.db`);
    writeFileSync(filePath, 'hello — this is a text file, not a SQLite database\n');
  }
  const fileName = H.basename(filePath);
  const confirmTexts = await page.eval('window.HW_PAGE.confirmTexts');
  const hadDb = await page.eval(`Array.from(document.querySelectorAll('#dbTables .db-table-row')).length > 0 || (!!document.querySelector('#dbTables .db-empty') && !/No database|not created|run the import/i.test(document.querySelector('#dbTables .db-empty').textContent))`);
  const before = J(await readTables(page));
  const nDialogs = ctx.log.dialogs.length;
  if (hadDb) ctx.dialogsExpected++;   // Open only confirms when there is a database to replace
  const selected = await page.text('#dbName');
  await page.chooseFile('#openDbBtn', filePath);
  const status = await page.waitFor(`(() => { const s = document.getElementById('saveStatus').textContent; return /^(Opened |That file is not a usable SQLite database)/.test(s) ? s : null; })()`, 15000);
  if (hadDb) { const d = ctx.log.dialogs[nDialogs]; R.check(`${label}: confirm() shown with confirmTexts.replace`, !!d && d.type === 'confirm' && d.message === confirmTexts.replace, d ? `${d.type}: ${d.message.slice(0, 100)}` : 'no dialog'); }
  else R.check(`${label}: no confirm() when there is no database to replace`, ctx.log.dialogs.length === nDialogs, J(ctx.log.dialogs.slice(nDialogs)));
  if (kind === 'sqlite') {
    R.check(`${label}: status says Opened ${fileName} as ${selected}`, status === `Opened ${fileName} as ${selected}`, await page.text('#saveStatus'));
    R.check(`${label}: Tables shows the opened file's table`, (await readTables(page)).tables.opened === rowsLabel(2), J(await readTables(page)));
    R.check(`${label}: no database notice`, await page.eval(`document.getElementById('dbNameNotice').hidden`), await page.text('#dbNameNotice'));
  } else {
    const want = ex.statusIncludes || 'That file is not a usable SQLite database (';
    R.check(`${label}: status refuses the file: ${J(want)}`, !!status && status.includes(want), await page.text('#saveStatus'));
    R.check(`${label}: the reason is one line, not an integrity dump`, !!status && !/\n/.test(status) && status.length < 200, String(status).slice(0, 200));
    R.check(`${label}: Tables unchanged (the current database is kept)`, J(await readTables(page)) === before, J(await readTables(page)));
    R.check(`${label}: the notice shows the same message`, !(await page.eval(`document.getElementById('dbNameNotice').hidden`)) && (await page.text('#dbNameNotice')).includes(want), await page.text('#dbNameNotice'));
  }
  R.check(`${label}: page not busy after Open`, (await page.attr('html', 'aria-busy')) !== 'true', '');
  await assertExpectTail(page, ex, R, label);
}

// {"clear": true}: Clear my work removes exactly this page's two keys, nothing else, and the page is back to start.
async function doClear(page, action, ctx, R, label) {
  const ex = action.expect || {};
  const confirmTexts = await page.eval('window.HW_PAGE.confirmTexts');
  const keys = H.storageKeys(ctx.chapter);
  const sibling = 'hw-week1-chapter-9-v1';   // another page's key on the shared origin must survive
  await page.eval(`localStorage.setItem(${J(sibling)}, 'sibling page'); true`);
  const hadMain = await page.eval(`localStorage.getItem(${J(keys.main)}) !== null`);
  const nDialogs = ctx.log.dialogs.length;
  ctx.dialogsExpected++;
  await page.click('#clearWorkBtn');
  const status = await page.waitFor(`(() => { const s = document.getElementById('saveStatus').textContent; return /^Work cleared/.test(s) ? s : null; })()`, 15000);
  const dialog = ctx.log.dialogs[nDialogs];
  R.check(`${label}: confirm() shown with confirmTexts.clear`, !!dialog && dialog.type === 'confirm' && dialog.message === confirmTexts.clear, dialog ? `${dialog.type}: ${dialog.message.slice(0, 100)}` : 'no dialog');
  R.check(`${label}: status reports the clear`, !!status, await page.text('#saveStatus'));
  const after = await page.eval(`({ main: localStorage.getItem(${J(keys.main)}), db: localStorage.getItem(${J(keys.db)}), sibling: localStorage.getItem(${J(sibling)}) })`);
  R.check(`${label}: both of this page's keys are removed (main existed before: ${hadMain})`, after.main === null && after.db === null, J({ main: after.main && after.main.slice(0, 40), db: after.db && after.db.slice(0, 40) }));
  R.check(`${label}: another page's key on the shared origin survives (never localStorage.clear())`, after.sibling === 'sibling page', String(after.sibling));
  await page.eval(`localStorage.removeItem(${J(sibling)}); true`);
  const state = await page.eval(`(() => { const W = window.HW_PAGE; const boxes = W.workspaces.filter((w) => w.tool === 'sql' || w.tool === 'text').map((w) => { const el = document.getElementById(w.id); return [w.id, el ? el.value : null, w.starter || '', w.tool === 'sql' ? document.getElementById('out-' + w.id).getAttribute('data-state') : 'idle']; });
    return { name: document.getElementById('studentName').value, boxes, python: document.getElementById('pythonCode').value === W.pythonStarter, pyOut: document.getElementById('pythonOutput').getAttribute('data-state'), transcript: document.querySelectorAll('#terminalTranscript .term-entry').length }; })()`);
  R.check(`${label}: name empty, every box back to its starter, every output idle`, state.name === '' && state.boxes.every((b) => b[1] === b[2] && b[3] === 'idle'), J(state.boxes.filter((b) => b[1] !== b[2] || b[3] !== 'idle')).slice(0, 300));
  R.check(`${label}: Python cell back to the starter, output idle, transcript empty`, state.python && state.pyOut === 'idle' && state.transcript === 0, J({ python: state.python, pyOut: state.pyOut, transcript: state.transcript }));
  const seed = await page.eval('window.HW_PAGE.seedDb');
  if (ex.tables) await assertTables(page, ex.tables, R, label, { exact: true });
  else if (!seed) await assertTables(page, {}, R, label);
  if (ex.structure) await assertStructure(page, ex.structure, R, label);
  R.check(`${label}: page not busy after clear`, (await page.attr('html', 'aria-busy')) !== 'true', '');
  ctx.driven = {};
  ctx.sqlRuns.clear();
}

// {"print": true}: a long written answer and a long SQL box are printed with Page.printToPDF; the PDF text must
// carry their last lines (the print mirrors, filled at beforeprint) and none of the screen-only chrome.
const PRINT_MARKER = 'LASTLINE-MARKER-XYZ';
async function doPrint(page, action, ctx, R, label) {
  if (!PDFTOTEXT) { R.check(`${label}: print check`, true, 'WARNING: pdftotext not found — skipped'); return; }
  const ids = await page.eval(`(() => { const W = window.HW_PAGE.workspaces; const t = W.find((w) => w.tool === 'text'); const sqls = W.filter((w) => w.tool === 'sql' && !w.optional); return { text: t ? t.id : null, sql: sqls.length ? sqls[sqls.length - 1].id : null }; })()`);
  if (!ids.text || !ids.sql) { R.check(`${label}: a text box and a sql box exist`, false, J(ids)); return; }
  const para = (i) => `Paragraph ${i}: ` + 'the regional manager would want the weighted average because it accounts for the number of tickets sold at each price rather than treating every fare equally. '.repeat(2);
  const answer = Array.from({ length: 10 }, (_, i) => para(i + 1)).join('\n') + '\n' + PRINT_MARKER;
  const sqlLast = 'SELECT 21 AS n21;';
  const sql = '-- print check\n' + Array.from({ length: 21 }, (_, i) => `SELECT ${i} AS n${i};`).join('\n') + '\n' + sqlLast;
  const saved = await page.eval(`({ text: document.getElementById(${J(ids.text)}).value, sql: document.getElementById(${J(ids.sql)}).value })`);
  try {
    await page.setText(`#${ids.text}`, answer);
    await page.setText(`#${ids.sql}`, sql);
    const pdf = join(ctx.scratch, `print-${ctx.chapter}.pdf`);
    await page.printToPdf(pdf);
    const text = execFileSync(PDFTOTEXT, ['-layout', pdf, '-'], { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });
    const sq = text.replace(/\s+/g, '');
    R.check(`${label}: the printed PDF has every line of a 10-paragraph answer (last line present)`, sq.includes(PRINT_MARKER) && sq.includes('Paragraph10:'), `${text.length} chars of text`);
    R.check(`${label}: the printed PDF has every line of a 23-line SQL box`, sq.includes(sqlLast.replace(/\s+/g, '')), '');
    R.check(`${label}: the printed PDF hides the toolbar and the Run-button shortcut hint`, !text.includes('Print / Save PDF') && !text.includes('Ctrl/⌘ + Enter runs'), text.includes('Print / Save PDF') ? 'toolbar present' : 'shortcut hint present');
    R.check(`${label}: the printed PDF keeps the exercise headings`, /Exercise|Scenario/.test(text), text.slice(0, 120));
  } finally {
    await page.setText(`#${ids.text}`, saved.text);
    await page.setText(`#${ids.sql}`, saved.sql);
  }
}

// {"probe": ["rowCap", …]}: the spec'd runtime behaviours nothing else exercises — the render caps, the empty
// box, the COMMIT note and the prepare-time statement number. Hard-coded SQL in a scratch box (never the
// student's, never the solutions'), cleared again afterwards, exactly like the XSS canary.
export const PROBE_TABLE = 'probe_tx';
export const PROBE_SQL = {
  rowCap: 'WITH RECURSIVE n(x) AS (SELECT 1 UNION ALL SELECT x + 1 FROM n WHERE x < 600)\nSELECT x FROM n;',
  cellCap: "SELECT replace(hex(zeroblob(1300)), '0', 'x') AS wide;",
  emptyBox: '',
  openTransaction: `BEGIN;\nCREATE TABLE ${PROBE_TABLE} (x INTEGER);\nINSERT INTO ${PROBE_TABLE} VALUES (1);`,
  openTransactionCleanup: `DROP TABLE ${PROBE_TABLE};`,
  syntaxError: 'SELECT 1 AS ok;\nSELEC 2;',
};
const PROBES = {
  async rowCap(page, ws, ctx, R, label) {
    const out = await runSqlBox(page, ws, PROBE_SQL.rowCap, ctx, R, label);
    if (!out) return;
    const want = `${H.resultHeading(1, 600)} · ${H.showingFirst(600, H.ROW_CAP)}`;
    R.check(`${label}: 600 rows are headed "${want}"`, out.state === 'done' && (out.heads[0] || '') === want, `${out.state}: ${J(out.heads[0])}`);
    R.check(`${label}: only ${H.ROW_CAP} rows are rendered`, (out.tables[0] || []).length === H.ROW_CAP, `${(out.tables[0] || []).length} rows in the DOM`);
  },
  async cellCap(page, ws, ctx, R, label) {
    const out = await runSqlBox(page, ws, PROBE_SQL.cellCap, ctx, R, label);
    if (!out) return;
    const cell = out.tables[0] && out.tables[0][0] ? out.tables[0][0][0] : '';
    R.check(`${label}: a 2,600-character cell is rendered as ${H.CELL_CAP} characters + an ellipsis`, out.state === 'done' && cell.length === H.CELL_CAP + 1 && cell.endsWith('…') && /^x+…$/.test(cell), `${out.state}: ${cell.length} characters, ends ${J(cell.slice(-3))}`);
  },
  async emptyBox(page, ws, ctx, R, label) {
    const out = await runSqlBox(page, ws, PROBE_SQL.emptyBox, ctx, R, label);
    if (!out) return;
    R.check(`${label}: an empty box answers "${H.NOTHING_TO_RUN}"`, out.state === 'error' && out.msgs.some((m) => m.text === H.NOTHING_TO_RUN), `${out.state}: ${out.msgs.map((m) => m.text).join(' | ') || out.text.slice(0, 120)}`);
    R.check(`${label}: nothing was rendered as a result`, out.heads.length === 0 && out.tables.length === 0, J(out.heads));
  },
  async openTransaction(page, ws, ctx, R, label) {
    const out = await runSqlBox(page, ws, PROBE_SQL.openTransaction, ctx, R, label);
    if (!out) return;
    R.check(`${label}: a script that leaves a transaction open is committed with a note`, out.state === 'done' && out.msgs.some((m) => m.text === H.COMMIT_NOTE), `${out.state}: ${out.msgs.map((m) => m.text).join(' | ')}`);
    R.check(`${label}: the INSERT inside the transaction reported "${H.changedMessage(1)}"`, out.msgs.some((m) => m.text === H.changedMessage(1)), out.msgs.map((m) => m.text).join(' | '));
    await assertTables(page, { [PROBE_TABLE]: 1 }, R, `${label} (committed)`, { exact: false });
    const drop = await runSqlBox(page, ws, PROBE_SQL.openTransactionCleanup, ctx, R, `${label} (cleanup)`);
    R.check(`${label}: dropping it notes the row it discarded`, !!drop && drop.state === 'done' && drop.msgs.some((m) => m.text === H.droppedMessage(PROBE_TABLE, 1)), drop ? drop.msgs.map((m) => m.text).join(' | ') : '');
    const still = await readTables(page);
    R.check(`${label}: ${PROBE_TABLE} is gone from the Tables list`, !(PROBE_TABLE in still.tables), J(still.tables));
  },
  async syntaxError(page, ws, ctx, R, label) {
    const out = await runSqlBox(page, ws, PROBE_SQL.syntaxError, ctx, R, label);
    if (!out) return;
    const err = out.msgs.find((m) => /\berror\b/.test(m.cls));
    R.check(`${label}: a prepare-time error is numbered started + 1 (statement 2, not 1)`, out.state === 'error' && !!err && /^Statement 2 failed: /.test(err.text) && /Statement 1 was applied; the rest was not run:$/.test(err.text), `${out.state}: ${(err && err.text) || out.text.slice(0, 200)}`);
    R.check(`${label}: statement 1 still produced its result`, (out.heads[0] || '').startsWith(H.resultHeading(1, 1)), J(out.heads));
    R.check(`${label}: the un-run tail is shown`, /SELEC 2;/.test(out.remaining || ''), J((out.remaining || '').slice(0, 80)));
  },
};
async function doProbe(page, action, ctx, R, label) {
  const wsIds = await page.eval(`window.HW_PAGE.workspaces.filter((w) => w.tool === 'sql').map((w) => w.id)`);
  const ws = action.ws || wsIds[wsIds.length - 1];
  try {
    for (const name of action.probe) {
      const fn = PROBES[name];
      if (!fn) { R.check(`${label}: ${name} is a known probe`, false, Object.keys(PROBES).join(', ')); continue; }
      await fn(page, ws, ctx, R, `${label} ${name}`);
    }
  } finally {
    await page.click(`[data-action="clear-sql"][data-ws="${ws}"]`);
    delete ctx.driven[ws];
    ctx.sqlRuns.delete(ws);
  }
}

async function doXssCanary(page, action, ctx, R, label) {
  const wsIds = await page.eval(`window.HW_PAGE.workspaces.filter((w) => w.tool === 'sql').map((w) => w.id)`);
  const ws = action.ws || wsIds[wsIds.length - 1];
  const q = (s) => `"${s.replace(/"/g, '""')}"`;
  const sql = `CREATE TABLE ${q(CANARY.table)}(${q(CANARY.column)} TEXT);\nINSERT INTO ${q(CANARY.table)} VALUES ('${CANARY.value}');\nSELECT * FROM ${q(CANARY.table)};`;
  const out = await runSqlBox(page, ws, sql, ctx, R, `${label} (SQL)`);
  R.check(`${label}: canary SQL ran (done)`, !!out && out.state === 'done', out ? out.text.slice(0, 200) : '');
  R.check(`${label}: result cell shows the literal payload as text`, !!out && out.tables[0] && out.tables[0][0] && out.tables[0][0][0] === CANARY.value, out ? J(out.tables[0]) : '');
  R.check(`${label}: column header shows the literal "</td><td onclick=x>"`, await page.eval(`Array.from(document.querySelectorAll('#out-${ws} th')).some((th) => th.textContent === ${J(CANARY.column)})`), '');
  const clicked = await page.eval(`(() => { const b = Array.from(document.querySelectorAll('[data-action="browse"]')).find((x) => x.getAttribute('data-table') === ${J(CANARY.table)}); if (!b) return false; b.click(); return true; })()`);
  R.check(`${label}: Browse shows the payload as text`, clicked && (await page.text('#dbDetail')).includes(CANARY.value), (await page.text('#dbDetail')).slice(0, 160));
  const clicked2 = await page.eval(`(() => { const b = Array.from(document.querySelectorAll('[data-action="structure"]')).find((x) => x.getAttribute('data-table') === ${J(CANARY.table)}); if (!b) return false; b.click(); return true; })()`);
  R.check(`${label}: Structure shows the CREATE TABLE as text`, clicked2 && (await page.text('#dbDetail')).includes(`CREATE TABLE ${q(CANARY.table)}`), (await page.text('#dbDetail')).slice(0, 160));
  const py = await runPythonCell(page, `print(${J(CANARY.python)})`, ctx, R, `${label} (Python)`);
  R.check(`${label}: Python print renders the payload as text`, py.state === 'done' && py.stdout === `${CANARY.python}\n`, `${py.state}: ${py.stdout || py.stderr.slice(0, 200)}`);
  const term = await runTerminal(page, CANARY.terminal, ctx, R, `${label} (terminal)`);
  R.check(`${label}: terminal echoes "$ ${CANARY.terminal}" as text and reports command not found`, term.cmd === `$ ${CANARY.terminal}` && term.stderr.includes('command not found: echo'), `${term.cmd} | ${term.stderr.slice(0, 120)}`);
  const xss = await page.eval(`typeof window.__xss`);
  R.check(`${label}: window.__xss is undefined`, xss === 'undefined', xss);
  R.check(`${label}: no <img> element was created anywhere on the page`, (await page.eval(`document.querySelectorAll('img').length`)) === 0, '');
  const drop = await runSqlBox(page, ws, `DROP TABLE ${q(CANARY.table)};`, ctx, R, `${label} (cleanup)`);
  R.check(`${label}: cleanup DROP notes the dropped row`, !!drop && drop.state === 'done' && drop.msgs.some((m) => m.text === H.droppedMessage(CANARY.table, 1)), drop ? drop.msgs.map((m) => m.text).join(' | ') : '');
  await page.click(`[data-action="clear-sql"][data-ws="${ws}"]`);
  delete ctx.driven[ws];
}

async function doOffline(browser, url, ctx, R, label) {
  const nEx = ctx.log.exceptions.length;
  const page = await browser.newPage(url, { blocked: ['*cdn.jsdelivr.net*'] });
  try {
    const state = await page.waitState('#engineSqlite', ['ready', 'error'], Math.min(STEP_TIMEOUT_MS, ctx.remaining()));
    const text = await page.text('#engineSqlite');
    R.check(`${label}: with the CDN blocked the SQLite strip reports an honest failure`, state === 'error' && text.includes('SQLite could not be downloaded. Check your internet connection, then press Retry.') && text.includes('Offline alternative'), `${state}: ${text.slice(0, 220)}`);
    R.check(`${label}: Retry button visible`, (await page.eval(`(() => { const b = document.querySelector('#engineSqlite button'); return !!b && !b.hidden; })()`)), '');
    R.check(`${label}: Tables list shows the reason`, /could not be downloaded/.test(await page.text('#dbTables')), (await page.text('#dbTables')).slice(0, 120));
    R.check(`${label}: no uncaught exception while failing`, ctx.log.exceptions.length === nEx, J(ctx.log.exceptions.slice(nEx)));
    R.check(`${label}: no alert()/prompt()`, ctx.log.forbiddenDialogs.length === 0, J(ctx.log.forbiddenDialogs));
    // Python's own failure text, through the Terminal (the loader tag failed too)
    const term = await runTerminal(page, 'python load_data.py', ctx, R, `${label} (python offline)`);
    const pyText = await page.text('#enginePython');
    R.check(`${label}: with the CDN blocked a Python command reports an honest failure in the transcript and the strip`, term.state === 'error' && term.stderr.includes('Python could not be downloaded. Check your internet connection, then press Retry.') && (await page.attr('#enginePython', 'data-state')) === 'error' && pyText.includes('Python could not be downloaded'), `${term.state}: ${term.stderr.slice(0, 160)} | ${pyText.slice(0, 120)}`);
    R.check(`${label}: Retry Python visible`, (await page.eval(`(() => { const b = document.querySelector('#enginePython button'); return !!b && !b.hidden && b.textContent.trim() === 'Retry Python'; })()`)), await page.text('#enginePython button'));
    // the network comes back: Retry must reach ready without a reload (the loader tags are re-inserted)
    await page.unblock();
    await page.click('#engineSqlite button');
    const sq = await page.waitState('#engineSqlite', ['ready', 'error'], Math.min(STEP_TIMEOUT_MS, ctx.remaining()));
    R.check(`${label}: Retry SQLite reaches ready after the CDN is reachable again`, sq === 'ready' && (await page.eval('typeof window.initSqlJs')) === 'function', await page.text('#engineSqlite'));
    await page.waitFor(`!!document.querySelector('#dbTables .db-table-row, #dbTables .db-empty')`, 10000);
    R.check(`${label}: Tables list no longer shows the failure`, !/could not be downloaded/.test(await page.text('#dbTables')), (await page.text('#dbTables')).slice(0, 120));
    const out = await runSqlBox(page, await page.eval(`window.HW_PAGE.workspaces.filter((w) => w.tool === 'sql').map((w) => w.id)[0]`), 'SELECT 1 AS after_retry;', ctx, R, `${label} (after retry)`);
    R.check(`${label}: a SQL box runs after Retry`, !!out && out.state === 'done' && out.tables[0] && out.tables[0][0] && out.tables[0][0][0] === '1', out ? out.text.slice(0, 120) : '');
    const wasBusyBefore = await page.attr('html', 'aria-busy');
    await page.click('#enginePython button');
    const py = await page.waitState('#enginePython', ['ready', 'error'], pyTimeout(false, ctx));
    R.check(`${label}: Retry Python reaches ready after the CDN is reachable again`, py === 'ready' && /^Python ready · 3\.\d+/.test(await page.text('#enginePython strong')), `${await page.text('#enginePython')} (busy before: ${wasBusyBefore})`);
    const cell = await runPythonCell(page, "print('after retry')", ctx, R, `${label} (python after retry)`);
    R.check(`${label}: the Python cell runs after Retry`, cell.state === 'done' && cell.stdout === 'after retry\n', `${cell.state}: ${cell.stdout || cell.stderr.slice(0, 120)}`);
    R.check(`${label}: page not busy after the retries`, (await page.attr('html', 'aria-busy')) !== 'true', '');
  } finally { await page.close(); }
}

// ---------------------------------------------------------------------------------------------
// One page
// ---------------------------------------------------------------------------------------------
async function verifyChapter(browser, chapter, opts, R, log) {
  const pagePath = join(opts.pagesDir, pageName(chapter));
  if (!existsSync(pagePath)) throw new EnvError(`${pagePath} does not exist — build the pages first`);
  let expected; let blocks;
  try { expected = loadExpected(opts.instructorDir, chapter); } catch (e) { throw new EnvError(`expected/chapter-${chapter}.json: ${e.message}`); }
  try { blocks = loadSolutionBlocks(opts.instructorDir, chapter); } catch (e) { throw new EnvError(`solutions-ch${chapter}.sql: ${e.message}`); }
  const url = pathToFileURL(pagePath).href;
  const ctx = { chapter, blocks, log, scratch: opts.scratch, downloadDir: browser.downloadDir, driven: {}, sqlRuns: new Map(), dialogsExpected: 0, remaining: () => Math.max(0, opts.deadline - Date.now()) };
  const L = `ch${chapter}`;
  console.log(`\n== Chapter ${chapter}: ${pageName(chapter)} (${expected.actions.length} actions) ==`);
  const nEx = log.exceptions.length;
  const nDialogs = log.dialogs.length;
  const page = await browser.newPage(url);
  try {
    const eng = await page.waitState('#engineSqlite', ['ready', 'error'], Math.min(STEP_TIMEOUT_MS, ctx.remaining()));
    R.check(`${L}: page loads with SQLite ready`, eng === 'ready', await page.text('#engineSqlite'));
    R.check(`${L}: exactly one h1 and the version footer`, (await page.eval(`document.querySelectorAll('h1').length`)) === 1 && /version \d{4}-\d{2}-\d{2}$/.test((await page.text('.page-foot')).trim()), (await page.text('.page-foot')).trim());
    R.check(`${L}: both loader tags carry SRI + crossorigin`, await page.eval(`Array.from(document.querySelectorAll('script[src]')).every((s) => s.integrity.startsWith('sha384-') && s.crossOrigin === 'anonymous') && document.querySelectorAll('script[src]').length === 2`), '');
    if (eng !== 'ready') return;
    let i = 0;
    for (const action of expected.actions) {
      i++;
      const kind = actionKind(action);
      const label = `${L} #${i} ${kind}${kind === 'sql' ? ` ${action.sql} ← ${action.block}` : kind === 'terminal' ? ` ${action.terminal.slice(0, 40)}` : kind === 'cancel' || kind === 'openDb' ? ` ${action[kind]}` : ''}`;
      if (ctx.remaining() <= 0) { R.check(`${label}: total budget`, false, 'total time budget exhausted before this action'); break; }
      if (kind === 'offline') { await doOffline(browser, url, ctx, R, label); continue; }
      try {
        switch (kind) {
          case 'terminal': await doTerminal(page, action, ctx, R, label); break;
          case 'sql': await doSql(page, action, ctx, R, label); break;
          case 'tables': await assertTables(page, action.tables, R, label); break;
          case 'downloadDb': await doDownloadDb(page, action, ctx, R, label); break;
          case 'export': await doExport(page, action, ctx, R, label); break;
          case 'reload': await doReload(page, action, ctx, R, label); break;
          case 'python': await doPython(page, action, ctx, R, label); break;
          case 'reset': await doReset(page, action, ctx, R, label); break;
          case 'xssCanary': await doXssCanary(page, action, ctx, R, label); break;
          case 'probe': await doProbe(page, action, ctx, R, label); break;
          case 'print': await doPrint(page, action, ctx, R, label); break;
          case 'cancel': await doCancel(page, action, ctx, R, label); break;
          case 'openDb': await doOpenDb(page, action, ctx, R, label); break;
          case 'clear': await doClear(page, action, ctx, R, label); break;
          default: R.check(label, false, `unknown action ${J(action)}`);
        }
      } catch (e) {
        R.check(`${label}: action completed`, false, e.message);
      }
    }
    R.check(`${L}: no uncaught page exceptions`, log.exceptions.length === nEx, J(log.exceptions.slice(nEx, nEx + 3)));
    R.check(`${L}: no alert()/prompt() dialogs`, log.forbiddenDialogs.length === 0, J(log.forbiddenDialogs.slice(0, 3)));
    // Dialog accounting: confirm() is auto-accepted, so a confirm() added to Run or Export would otherwise pass
    // unnoticed. The page may raise exactly one per destructive action driven, and no other.
    const dialogs = log.dialogs.slice(nDialogs);
    R.check(`${L}: exactly ${ctx.dialogsExpected} confirm() dialogs — one per destructive action driven, none anywhere else`, dialogs.length === ctx.dialogsExpected, `${dialogs.length}: ${J(dialogs.map((d) => `${d.type}: ${String(d.message).slice(0, 50)}`))}`);
    const texts = Object.values(await page.eval('window.HW_PAGE.confirmTexts'));
    const rogue = dialogs.filter((d) => d.type !== 'confirm' || !texts.includes(d.message));
    R.check(`${L}: every dialog was a confirm() carrying one of the page's confirmTexts`, rogue.length === 0, J(rogue.map((d) => `${d.type}: ${String(d.message).slice(0, 80)}`).slice(0, 3)));
  } finally { await page.close(); }
}

// ---------------------------------------------------------------------------------------------
// CLI
// ---------------------------------------------------------------------------------------------
export function parseArgs(argv) {
  const o = { chapters: [], chrome: DEFAULT_CHROME, keep: false, pagesDir: DEFAULTS.outDir, instructorDir: DEFAULTS.instructorDir, scratch: null, budget: 1500, json: null };
  const take = (i) => { const v = argv[i + 1]; if (v === undefined || v.startsWith('--')) throw new Error(`${argv[i]} needs a value`); return v; };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    const eq = a.indexOf('=');
    const key = eq > 0 ? a.slice(0, eq) : a;
    const val = () => (eq > 0 ? a.slice(eq + 1) : take(i++));
    switch (key) {
      case '--chapter': for (const n of val().split(',')) { const c = Number(n); if (!Number.isInteger(c) || c < 1) throw new Error(`bad chapter ${n}`); o.chapters.push(c); } break;
      case '--chrome': o.chrome = val(); break;
      case '--keep': o.keep = true; break;
      case '--pages-dir': o.pagesDir = resolve(val()); break;
      case '--instructor-dir': o.instructorDir = resolve(val()); break;
      case '--scratch': o.scratch = resolve(val()); break;
      case '--budget': o.budget = Number(val()); if (!(o.budget > 0)) throw new Error('--budget needs seconds'); break;
      case '--json': o.json = resolve(val()); break;
      case '--help': case '-h': o.help = true; break;
      default: throw new Error(`unknown option ${a}`);
    }
  }
  if (!o.chapters.length) o.chapters = [1, 2, 3];
  return o;
}

export async function main(argv = process.argv.slice(2)) {
  let opts;
  try { opts = parseArgs(argv); } catch (e) { console.error(e.message); return 2; }
  if (opts.help) {
    console.log('usage: node verify-browser.mjs [--chapter N[,N]] [--chrome PATH] [--keep] [--pages-dir D] [--instructor-dir D] [--scratch D] [--budget SECONDS] [--json FILE]');
    return 0;
  }
  const scratch = opts.scratch || mkdtempSync(join(tmpdir(), 'hw-verify-'));
  mkdirSync(scratch, { recursive: true });
  opts.scratch = scratch;
  opts.deadline = Date.now() + opts.budget * 1000;
  const log = { requests: [], dialogs: [], forbiddenDialogs: [], downloads: [], exceptions: [], console: [], chrome: '' };
  const R = makeReporter(false);
  const cdn = JSON.parse(readFileSync(join(SRC_DIR, 'cdn.json'), 'utf8'));
  const allowed = (u) => isAllowedRequest(u, cdn);
  let browser; let envError = null;
  const t0 = Date.now();
  try {
    browser = await launchChrome({ chrome: opts.chrome, scratch, keep: opts.keep, log });
    console.log(`${log.chrome} · pages ${opts.pagesDir} · scripts ${opts.instructorDir} · scratch ${scratch}`);
    for (const chapter of opts.chapters) {
      try { await verifyChapter(browser, chapter, opts, R, log); }
      catch (e) { if (e instanceof EnvError) { envError = e.message; break; } R.check(`ch${chapter}: script completed`, false, e.stack || e.message); }
    }
    const bad = log.requests.filter((r) => !allowed(r.url)).map((r) => r.url);
    R.check('every network request was file://, the sql.js base or the Pyodide base', bad.length === 0, J([...new Set(bad)].slice(0, 5)));
    R.check('no WebSocket was opened by any page', !log.requests.some((r) => r.socket), J(log.requests.filter((r) => r.socket).map((r) => r.url).slice(0, 5)));
    R.check('no alert()/prompt() anywhere in the run', log.forbiddenDialogs.length === 0, J(log.forbiddenDialogs.slice(0, 3)));
  } catch (e) {
    if (e instanceof EnvError) envError = e.message; else R.check('run completed', false, e.stack || e.message);
  } finally {
    const summary = { chrome: log.chrome, seconds: Math.round((Date.now() - t0) / 1000), passed: R.results.filter((r) => r.ok).length, failed: R.failed(), envError, results: R.results, requests: [...new Set(log.requests.map((r) => r.url))].slice(0, 200), console: log.console.slice(0, 50), exceptions: log.exceptions.slice(0, 20) };
    try { writeFileSync(join(scratch, 'verify-results.json'), JSON.stringify(summary, null, 2)); } catch { /* scratch gone */ }
    if (opts.json) { mkdirSync(dirname(opts.json), { recursive: true }); writeFileSync(opts.json, JSON.stringify(summary, null, 2)); }
    if (browser) await browser.close();
    if (opts.keep) console.log(`scratch kept at ${scratch}`);
    console.log(`\n${summary.passed} passed, ${summary.failed} failed in ${summary.seconds}s${envError ? ` — environment: ${envError}` : ''}`);
  }
  if (envError) return 2;
  return R.failed() ? 1 : 0;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) main().then((code) => process.exit(code));
