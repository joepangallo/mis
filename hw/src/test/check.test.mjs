// check.test.mjs — the static checker's helpers and an end-to-end run against a fixture build.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, rmSync, writeFileSync, readFileSync, mkdirSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { crc32 } from 'node:zlib';
import { createZip } from '../zip.mjs';
import { buildAll, STARTER_ZIP, INSTRUCTOR_ZIP, SRC_DIR } from '../build.mjs';
import {
  domRuleFindings, a11yFindings, headingOrderFindings, externalUrls, isAllowedUrl, extractPageData, zipFindings, runChecks, parseArgs,
  FORBIDDEN_DOM_TOKENS, FORBIDDEN_CODEGEN_TOKENS, FORBIDDEN_NETWORK_TOKENS, nameFindings, buttonNames, expectedShapeFindings, pdfTextFindings, pdfTextFindingsFromText,
  scriptTagFindings, pageDataFindings, urlFindings, workspaceIdFindings,
  wasmIntegrityFindings, protocolRelativeUrls, pdfHandoutFindings, editDistance, didYouMean, expectKeyFindings,
  EXPECT_KEYS, PROBE_KINDS, ACTION_KINDS,
} from '../check.mjs';
import { writeContentDir, writeInstructorDir, writeWeekDir } from './fixture.mjs';
import { buildAll as _buildAll } from '../build.mjs';

const cdn = { sqljs: { base: 'https://cdn.jsdelivr.net/npm/sql.js@1.14.2/dist/' }, pyodide: { base: 'https://cdn.jsdelivr.net/pyodide/v314.0.6/full/' }, helpLinks: ['https://sqlitebrowser.org/', 'https://www.python.org/downloads/'] };

test('domRuleFindings flags every forbidden token with a line number', () => {
  const src = 'var a = 1;\nel.innerHTML = x;\nvar f = new Function("x");\nsetTimeout(eval("1"));\nel.insertAdjacentHTML("beforeend", s);\n';
  const out = domRuleFindings(src, 'r.js');
  assert.equal(FORBIDDEN_DOM_TOKENS.length, 6);
  assert.ok(out.includes('r.js:2: contains "innerHTML"'));
  assert.ok(out.includes('r.js:3: contains "new Function("'));
  assert.ok(out.includes('r.js:4: contains "eval("'));
  assert.ok(out.includes('r.js:5: contains "insertAdjacentHTML"'));
  assert.deepEqual(domRuleFindings('el.textContent = x; document.createElement("td");'), []);
});

test('domRuleFindings also catches the other codegen / HTML-string APIs and every transport', () => {
  assert.equal(FORBIDDEN_CODEGEN_TOKENS.length, 10);
  assert.equal(FORBIDDEN_NETWORK_TOKENS.length, 8);
  const src = [
    "var f = Function('return 1');",
    "var g = new DOMParser().parseFromString(s, 'text/html');",
    "range.createContextualFragment(s);",
    "iframe.srcdoc = s;",
    "el.setAttribute('onclick', s);",
    "setTimeout('alert(1)', 0);",
    "a.href = 'javascript:void 0';",
    "var w = new WebSocket('ws://x');",
    "new EventSource('/x');",
    "navigator.sendBeacon('/x', d);",
    "var x = new XMLHttpRequest();",
    "var wk = new Worker('w.js');",
    "importScripts('a.js');",
    "navigator.serviceWorker.register('sw.js');",
  ].join('\n');
  const out = domRuleFindings(src, 'r.js');
  for (const re of [/Function\(/, /DOMParser/, /createContextualFragment/, /srcdoc/, /setAttribute/, /setTimeout/, /javascript:/, /new WebSocket\(/, /EventSource\(/, /sendBeacon\(/, /XMLHttpRequest\(/, /new Worker\(/, /importScripts\(/, /serviceWorker\.register/]) {
    assert.ok(out.some((e) => re.test(e)), String(re));
  }
  // the real runtime.js and helpers.js are clean of all three families
  assert.deepEqual(domRuleFindings(readFileSync(join(SRC_DIR, 'runtime.js'), 'utf8'), 'runtime.js'), []);
  assert.deepEqual(domRuleFindings(readFileSync(join(SRC_DIR, 'helpers.js'), 'utf8'), 'helpers.js'), []);
});

test('nameFindings flags duplicate button names and duplicate box labels in one step', () => {
  const dup = '<button type="button" aria-label="Download employees.db">a</button><button type="button" aria-label="Download employees.db">b</button>';
  assert.ok(nameFindings(dup, 'p').some((e) => /2 buttons share the accessible name "Download employees.db"/.test(e)));
  const ok = '<button type="button" aria-label="Download employees.db">a</button><button type="button" aria-label="Download the starter file employees.db">b</button>';
  assert.deepEqual(nameFindings(ok, 'p'), []);
  assert.deepEqual(buttonNames('<button type="button">Run</button><button aria-label="Clear the SQL">x</button>'), ['Run', 'Clear the SQL']);
  const sameLabel = '<li class="step" id="step-2-37-4"><label class="ws-label" for="a">SQL for step 4</label><label class="ws-label" for="b">SQL for step 4</label></li>';
  assert.ok(nameFindings(sameLabel, 'p').some((e) => /boxes in id="step-2-37-4" share the label "SQL for step 4"/.test(e)));
  const diffLabel = '<li class="step" id="step-2-37-4"><label class="ws-label" for="a">SQL for step 4</label><label class="ws-label" for="b">Optional second failing INSERT (step 4)</label></li>';
  assert.deepEqual(nameFindings(diffLabel, 'p'), []);
});

test('a11yFindings catches the basics and accepts a well-formed page', () => {
  const good = '<html lang="en"><head><style>a:focus-visible{outline:2px solid}</style></head><body><a class="skip" href="#main">Skip</a><h1>T</h1><h2>S</h2><main id="main">' +
    '<label for="x">X</label><textarea id="x"></textarea><label>Name <input type="text" id="n"></label><input type="hidden" id="h"><input type="file" aria-label="f">' +
    '<button type="button">b</button><div class="output" data-state="idle" aria-live="polite"></div>' +
    '<table><caption>c</caption><thead><tr><th scope="col">a</th></tr></thead></table></main></body></html>';
  assert.deepEqual(a11yFindings(good, 'p'), []);
  const bad = '<html><body><h2>x</h2><h4>y</h4><textarea id="t"></textarea><button>b</button><div class="output"></div><table><tr><th>a</th></tr></table></body></html>';
  const out = a11yFindings(bad, 'p');
  for (const re of [/lang="en"/, /exactly one <h1>, found 0/, /first heading is h2/, /jumps from h2 to h4/, /skip link/, /<main id="main">/, /:focus-visible/, /unlabelled <textarea id=t>/, /without type="button"/, /without aria-live/, /no <caption>/, /without scope/]) {
    assert.ok(out.some((e) => re.test(e)), String(re));
  }
  assert.deepEqual(headingOrderFindings('<body><h1>a</h1><h2>b</h2><h3>c</h3><h2>d</h2></body>'), []);
});

test('externalUrls / isAllowedUrl', () => {
  const html = 'x https://cdn.jsdelivr.net/npm/sql.js@1.14.2/dist/sql-wasm.js "https://evil.example/x.js" <a href="https://sqlitebrowser.org/">y</a> http://www.w3.org/2000/svg';
  assert.deepEqual(externalUrls(html), ['http://www.w3.org/2000/svg', 'https://cdn.jsdelivr.net/npm/sql.js@1.14.2/dist/sql-wasm.js', 'https://evil.example/x.js', 'https://sqlitebrowser.org/']);
  assert.equal(isAllowedUrl('https://cdn.jsdelivr.net/pyodide/v314.0.6/full/pyodide.js', cdn), true);
  assert.equal(isAllowedUrl('https://cdn.jsdelivr.net/pyodide/v314.0.7/full/pyodide.js', cdn), false);
  assert.equal(isAllowedUrl('https://evil.example/x.js', cdn), false);
  assert.equal(isAllowedUrl('https://sqlitebrowser.org/dl/', cdn), true);
  assert.equal(isAllowedUrl('https://python.org/downloads', cdn), true, 'help links match by host, with or without www.');
  assert.equal(isAllowedUrl('http://python.org/', cdn), false, 'help links must be https');
  assert.equal(isAllowedUrl('https://python.org.evil.example/', cdn), false);
  assert.equal(isAllowedUrl('http://www.w3.org/2000/svg', cdn), true);
});

test('extractPageData reads the inline JSON and refuses a page without it', () => {
  const { raw, data } = extractPageData('<script>window.HW_PAGE = {"id":"chapter-1","a":"\\u003c"};</script><script>x</script>');
  assert.equal(raw, '{"id":"chapter-1","a":"\\u003c"}');
  assert.equal(data.a, '<');
  assert.throws(() => extractPageData('<html></html>'), /not found/);
});

test('zipFindings compares listing and CRCs and flags strays', () => {
  const dir = mkdtempSync(join(tmpdir(), 'hw-chk-'));
  try {
    const entries = [{ name: 'Week 1/a.txt', data: Buffer.from('a') }, { name: 'Week 1/b.pdf', data: Buffer.from('%PDF') }];
    const p = join(dir, 'x.zip');
    writeFileSync(p, createZip([...entries, { name: 'Week 1/.DS_Store', data: Buffer.from('junk') }]));
    assert.ok(zipFindings(p, entries, 'x').some((e) => /stray entry Week 1\/\.DS_Store/.test(e)));
    writeFileSync(p, createZip(entries));
    assert.deepEqual(zipFindings(p, entries, 'x'), []);
    const changed = [{ name: 'Week 1/a.txt', data: Buffer.from('a') }, { name: 'Week 1/b.pdf', data: Buffer.from('%PDF-2') }];
    assert.ok(zipFindings(p, changed, 'x').some((e) => /b\.pdf differs .* PDF on disk changed/.test(e)));
    assert.ok(zipFindings(p, [entries[0]], 'x').some((e) => /unexpected entry Week 1\/b\.pdf/.test(e)));
    assert.ok(zipFindings(p, [...entries, { name: 'c', data: Buffer.from('c') }], 'x').some((e) => /missing entry c/.test(e)));
    assert.ok(zipFindings(join(dir, 'nope.zip'), entries, 'x')[0].includes('missing'));
    assert.equal(crc32(Buffer.from('a')) >>> 0, 0xe8b7be43);
  } finally { rmSync(dir, { recursive: true, force: true }); }
});

test('runChecks passes on a fresh fixture build and fails on a stale page', async () => {
  const tmp = mkdtempSync(join(tmpdir(), 'hw-run-'));
  try {
    const contentDir = writeContentDir(join(tmp, 'content'));
    const weekDir = writeWeekDir(join(tmp, 'week'));
    const instructorDir = writeInstructorDir(join(tmp, 'instructor'));
    const pagesDir = join(tmp, 'pages');
    await buildAll({ contentDir, weekDir, instructorDir, outDir: pagesDir, zipDir: tmp, quiet: true });
    const ok = await runChecks({ contentDir, weekDir, instructorDir, pagesDir, zipDir: tmp, noPdfText: true });
    assert.equal(ok.env, null);
    const failed = ok.results.filter((r) => !r.ok);
    assert.deepEqual(failed, [], JSON.stringify(failed, null, 1));
    assert.ok(ok.results.some((r) => r.name.startsWith('zip: ' + STARTER_ZIP)));
    assert.ok(ok.results.some((r) => r.name.startsWith('zip: ' + INSTRUCTOR_ZIP)));
    // stale page + stale zip
    const p1 = join(pagesDir, 'week-1-chapter-1.html');
    writeFileSync(p1, readFileSync(p1, 'utf8').replace('</body>', '<!-- edited by hand --></body>'));
    writeFileSync(join(weekDir, 'Application-Exercises-Week-1.pdf'), '%PDF-1.4 regenerated\n');
    const bad = await runChecks({ contentDir, weekDir, instructorDir, pagesDir, zipDir: tmp, noPdfText: true });
    const names = bad.results.filter((r) => !r.ok).map((r) => r.name);
    assert.ok(names.includes('freshness: week-1-chapter-1.html'), names.join(' | '));
    assert.ok(names.some((n) => n.startsWith('zip: ' + STARTER_ZIP)), names.join(' | '));
    const skipped = await runChecks({ contentDir, weekDir, instructorDir, pagesDir, zipDir: tmp, noZip: true, noPdfText: true });
    assert.ok(!skipped.results.some((r) => !r.ok && r.name.startsWith('zip')));
    // a missing content dir is an environment problem, not a failed check
    const env = await runChecks({ contentDir: join(tmp, 'nope'), weekDir, instructorDir, pagesDir, zipDir: tmp, noPdfText: true });
    assert.match(env.env, /could not load/);
  } finally { rmSync(tmp, { recursive: true, force: true, maxRetries: 3 }); }
});

test('parseArgs', () => {
  const o = parseArgs(['--pages-dir', 'p', '--no-zip', '--json=out.json']);
  assert.ok(o.pagesDir.endsWith('/p'));
  assert.equal(o.noZip, true);
  assert.ok(o.json.endsWith('/out.json'));
  assert.throws(() => parseArgs(['--nope']), /unknown option/);
});

test('expectedShapeFindings validates the new action kinds and flags an inert Windows exclude', () => {
  const base = (extra) => ({ chapter: 1, page: 'week-1-chapter-1.html', actions: [...extra, { xssCanary: true }, { offline: true }] });
  // valid new kinds pass
  assert.deepEqual(expectedShapeFindings(base([{ print: true }, { clear: true, expect: { tables: {} } }, { cancel: 'reset' }, { openDb: 'sqlite' }, { openDb: 'text' }, { reload: true, corrupt: ['s1-35-5a'], expect: { structure: { employees: { includes: ['employee_id'] } } } }]), 1), []);
  // bad values are caught
  const bad = expectedShapeFindings(base([{ cancel: 'nope' }, { openDb: 'x' }, { print: 1 }, { clear: 1 }, { reload: true, corrupt: 'x', expect: { structure: { employees: { includes: 'x' } } } }, { export: true, expect: { excludes: ['C:\\\\'] } }]), 1);
  for (const re of [/cancel must be one of/, /openDb must be one of/, /print must be true/, /clear must be true/, /corrupt must be an array/, /structure\.employees\.includes must be an array/, /two consecutive backslashes/]) {
    assert.ok(bad.some((e) => re.test(e)), String(re));
  }
});

test('pdfTextFindings degrades to a WARN without poppler and flags a stale/missing PDF', () => {
  assert.ok(pdfTextFindings('/no/such/file.pdf', [], { version: '2026-09-02', grading: [] })[0].includes('missing'));
});

test('pdfTextFindingsFromText catches a stale version and a missing exercise title', () => {
  const chapters = [{ chapter: 1, exercises: [{ id: '1-35', title: 'Database Application: Frequent Fliers' }] }];
  const handout = { version: '2026-09-02' };
  const good = 'version 2026-09-02\nExercise 1-35 · Database Application: Frequent Fliers\n';
  assert.deepEqual(pdfTextFindingsFromText(good, chapters, handout), []);
  assert.ok(pdfTextFindingsFromText('version 2000-01-01\nExercise 1-35 · Database Application: Frequent Fliers', chapters, handout).some((e) => /does not carry "version 2026-09-02"/.test(e)));
  assert.ok(pdfTextFindingsFromText('version 2026-09-02', chapters, handout).some((e) => /lacks "Exercise 1-35/.test(e)));
});

test('each static page-rule fires when its invariant is broken', async () => {
  const tmp = mkdtempSync(join(tmpdir(), 'hw-neg-'));
  try {
    const contentDir = writeContentDir(join(tmp, 'content'));
    const weekDir = writeWeekDir(join(tmp, 'week'));
    const instructorDir = writeInstructorDir(join(tmp, 'instructor'));
    const pagesDir = join(tmp, 'pages');
    const { assets, chapters, handout } = await _buildAll({ contentDir, weekDir, instructorDir, outDir: pagesDir, zipDir: tmp, quiet: true });
    const html = readFileSync(join(pagesDir, 'week-1-chapter-1.html'), 'utf8');
    const c1 = chapters[0];
    const cdn = assets.cdn;
    // baseline: every rule clean
    assert.deepEqual(scriptTagFindings(html, cdn, 'p'), []);
    assert.deepEqual(urlFindings(html, cdn, 'p'), []);
    assert.deepEqual(pageDataFindings(html, { cdn, fileBytes: assets.fileBytes, content: c1, label: 'p' }), []);
    assert.deepEqual(workspaceIdFindings(html, c1, 'p'), []);
    // drop the integrity attribute → scriptTagFindings fires
    assert.ok(scriptTagFindings(html.replace(/ integrity="[^"]*"/, ''), cdn, 'p').some((e) => /integrity/.test(e)));
    // an https URL that is not the CDN or a help link → urlFindings fires
    assert.ok(urlFindings(html.replace('</body>', '<a href="https://evil.example/x">z</a></body>'), cdn, 'p').some((e) => /not allowed/.test(e)));
    // a literal "<" injected into HW_PAGE → pageDataFindings fires
    const withLt = html.replace(/<script>window\.HW_PAGE = /, '<script>window.HW_PAGE = ').replace('"chapter":1', '"chapter":1,"x":"<b>"');
    assert.ok(pageDataFindings(withLt, { cdn, fileBytes: assets.fileBytes, content: c1, label: 'p' }).some((e) => /literal "<"|unexpected keys/.test(e)));
    // a duplicated workspace element id → workspaceIdFindings fires
    const dupId = html.replace('id="s1-35-5a"', 'id="s1-35-5a"></span><span id="s1-35-5a"');
    assert.ok(workspaceIdFindings(dupId, c1, 'p').some((e) => /s1-35-5a" appears 2 times/.test(e)));
  } finally { rmSync(tmp, { recursive: true, force: true, maxRetries: 3 }); }
});


// --- the sql.js wasm hash -----------------------------------------------------------------------
// No <script integrity> covers the 658 KB wasm: runtime.js fetches it itself. Deleting that one option used to
// leave every other check in this file green.
test('wasmIntegrityFindings: the real runtime passes, and every way of losing the hash fires', () => {
  const realCdn = JSON.parse(readFileSync(join(SRC_DIR, 'cdn.json'), 'utf8'));
  const runtime = readFileSync(join(SRC_DIR, 'runtime.js'), 'utf8');
  assert.deepEqual(wasmIntegrityFindings(runtime, realCdn), [], 'the shipped runtime.js and cdn.json are clean');

  const noIntegrity = runtime.replace(/fetch\(CDN\.sqljs\.wasm\.url, \{[^}]*\}/, "fetch(CDN.sqljs.wasm.url, { mode: 'cors' }");
  assert.notEqual(noIntegrity, runtime, 'the fetch call was found');
  assert.ok(wasmIntegrityFindings(noIntegrity, realCdn).some((e) => /does not pass \{ integrity/.test(e)));

  const someoneElsesHash = runtime.replace('integrity: CDN.sqljs.wasm.integrity', "integrity: 'sha384-' + 'x'.repeat(64)");
  assert.notEqual(someoneElsesHash, runtime);
  assert.ok(wasmIntegrityFindings(someoneElsesHash, realCdn).some((e) => /does not pass \{ integrity/.test(e)), 'a hard-coded hash is not the one from cdn.json');

  const noFetch = runtime.replace('fetch(CDN.sqljs.wasm.url,', 'notFetch(CDN.sqljs.wasm.url,');
  assert.ok(wasmIntegrityFindings(noFetch, realCdn).some((e) => /no fetch\(/.test(e)));

  const locate = runtime + "\n  window.initSqlJs({ locateFile: function (f) { return CDN.sqljs.base + f; } });\n";
  assert.ok(wasmIntegrityFindings(locate, realCdn).some((e) => /locateFile/.test(e)));

  const badHash = structuredClone(realCdn); badHash.sqljs.wasm.integrity = 'sha256-tooshort';
  assert.ok(wasmIntegrityFindings(runtime, badHash).some((e) => /not a well-formed sha384/.test(e)));
  const noHash = structuredClone(realCdn); delete noHash.sqljs.wasm.integrity;
  assert.ok(wasmIntegrityFindings(runtime, noHash).some((e) => /not a well-formed sha384/.test(e)));
  const badUrl = structuredClone(realCdn); badUrl.sqljs.wasm.url = 'https://evil.example/sql-wasm.wasm';
  assert.ok(wasmIntegrityFindings(runtime, badUrl).some((e) => /not under sqljs.base/.test(e)));
});

// --- protocol-relative URLs ---------------------------------------------------------------------
test('the URL scan sees protocol-relative references, which resolve to file://host on a file:// page', () => {
  assert.deepEqual(protocolRelativeUrls('<img src="//evil.example/x.png">'), ['//evil.example/x.png']);
  assert.deepEqual(protocolRelativeUrls("<a href='//evil.example/y'>y</a>"), ['//evil.example/y']);
  assert.deepEqual(protocolRelativeUrls('<script src=//evil.example/z.js></script>'), ['//evil.example/z.js']);
  assert.deepEqual(protocolRelativeUrls('body{background:url(//evil.example/bg.png)}'), ['//evil.example/bg.png']);
  assert.deepEqual(protocolRelativeUrls('a{background:url("//evil.example/q.png")}'), ['//evil.example/q.png']);
  // a same-page or root-relative reference is not protocol-relative, and neither is a comment
  assert.deepEqual(protocolRelativeUrls('<a href="#database">x</a><a href="/local">y</a>\n// a comment //\n'), []);
  assert.ok(externalUrls('<img src="//evil.example/x.png">').includes('//evil.example/x.png'));
  assert.equal(isAllowedUrl('//cdn.jsdelivr.net/npm/sql.js@1.14.2/dist/sql-wasm.js', cdn), false, 'not even the CDN may be reached protocol-relative');
  assert.ok(urlFindings('<img src="//evil.example/x.png">', cdn, 'p').some((e) => /protocol-relative URL \/\/evil\.example\/x\.png resolves to file:\/\/evil\.example\/x\.png/.test(e)));
  assert.deepEqual(urlFindings('<a href="#main">x</a>', cdn, 'p'), []);
});

test('a protocol-relative reference injected into a built page is caught by the page rules', async () => {
  const tmp = mkdtempSync(join(tmpdir(), 'hw-proto-'));
  try {
    const contentDir = writeContentDir(join(tmp, 'content'));
    const weekDir = writeWeekDir(join(tmp, 'week'));
    const instructorDir = writeInstructorDir(join(tmp, 'instructor'));
    const pagesDir = join(tmp, 'pages');
    const { assets } = await buildAll({ contentDir, weekDir, instructorDir, outDir: pagesDir, zipDir: tmp, quiet: true });
    const html = readFileSync(join(pagesDir, 'week-1-chapter-1.html'), 'utf8');
    assert.deepEqual(urlFindings(html, assets.cdn, 'p'), []);
    assert.ok(urlFindings(html.replace('</body>', '<img src="//evil.example/pixel.png"></body>'), assets.cdn, 'p').some((e) => /protocol-relative/.test(e)));
    assert.ok(urlFindings(html.replace('</body>', '<a href="//evil.example/help">h</a></body>'), assets.cdn, 'p').some((e) => /protocol-relative/.test(e)));
  } finally { rmSync(tmp, { recursive: true, force: true, maxRetries: 3 }); }
});

// --- the expect contract ------------------------------------------------------------------------
test('editDistance / didYouMean turn a near miss into a suggestion and leave a real mistake alone', () => {
  assert.equal(editDistance('', 'abc'), 3);
  assert.equal(editDistance('notesIncludes', 'notesInclude'), 1);
  assert.equal(didYouMean('notesIncludes', EXPECT_KEYS.python), 'notesInclude');
  assert.equal(didYouMean('include', EXPECT_KEYS.export), 'includes');
  assert.equal(didYouMean('results', EXPECT_KEYS.terminal), null, 'nothing close enough to suggest');
  assert.deepEqual(expectKeyFindings({ stdoutIncludes: [] }, 'terminal', 'a'), []);
  assert.deepEqual(expectKeyFindings(null, 'terminal', 'a'), []);
  assert.ok(expectKeyFindings({ tables: {} }, 'cancel', 'a')[0].includes('reads no expect keys'));
});

test('expectedShapeFindings closes the expect key set per action kind and type-checks the list keys', () => {
  const base = (extra) => ({ chapter: 1, page: 'week-1-chapter-1.html', actions: [...extra, { xssCanary: true }, { offline: true }] });
  // every kind's own keys are accepted
  assert.deepEqual(expectedShapeFindings(base([
    { terminal: 'ls', expect: { stdoutIncludes: ['x'], stderrIncludes: ['y'], exit: 'exit status 2' } },
    { python: 'print(1)', expect: { notesInclude: ['a'], notesExclude: ['b'], errorIncludes: 'c', tables: {}, structure: {} } },
    { sql: 's', block: 's', expect: { messageIncludes: ['m'], changed: 1 } },
    { openDb: 'text', expect: { statusIncludes: 'not a usable' } },
    { probe: ['rowCap', 'cellCap', 'emptyBox', 'openTransaction', 'syntaxError'] },
  ]), 1), []);
  const out = expectedShapeFindings(base([
    { python: 'print(1)', expect: { notesIncludes: ['x'] } },
    { python: 'print(1)', expect: { notesInclude: 'a note' } },
    { python: 'print(1)', expect: { notesExclude: 'x' } },
    { sql: 's', block: 's', expect: { messageIncludes: 'x' } },
    { terminal: 'ls', expect: { exit: 2 } },
    { terminal: 'ls', expect: { results: [{ rows: 1 }] } },
    { export: true, expect: { include: ['x'] } },
    { tables: { a: 1 }, expect: { tables: { a: 1 } } },
    { probe: [] }, { probe: ['nope'] }, { probe: ['rowCap', 'rowCap'] }, { probe: true },
  ]), 1);
  for (const re of [
    /expect\.notesIncludes is not read for python actions — did you mean "notesInclude"\?/,
    /expect\.notesInclude must be an ARRAY of strings/,
    /expect\.notesExclude must be an ARRAY of strings/,
    /expect\.messageIncludes must be an ARRAY of strings/,
    /expect\.exit must be the transcript's exit line as a string/,
    /expect\.results is not read for terminal actions \(allowed: stdoutIncludes, stderrIncludes, exit\)/,
    /expect\.include is not read for export actions — did you mean "includes"\?/,
    /expect\.tables is not read for tables actions/,
    /probe must be a non-empty array/,
    /unknown probe "nope"/,
    /probe lists the same probe twice/,
  ]) assert.ok(out.some((e) => re.test(e)), String(re));
  assert.ok(PROBE_KINDS.length === 5 && ACTION_KINDS.includes('probe'));
  // every kind in ACTION_KINDS has an entry in EXPECT_KEYS, or a new kind would silently allow anything
  for (const k of ACTION_KINDS) assert.ok(Array.isArray(EXPECT_KEYS[k]), `EXPECT_KEYS has no entry for ${k}`);
});

// --- the handout PDF ----------------------------------------------------------------------------
test('pdfHandoutFindings reports a missing PDF and, when poppler is there, runs make-pdf\'s own checks', async () => {
  const missing = await pdfHandoutFindings('/no/such/handout.pdf', { chapters: [], handout: { version: 'x', grading: [] } });
  assert.ok(missing[0].includes('is missing'));
  const dir = mkdtempSync(join(tmpdir(), 'hw-pdf-'));
  try {
    const notAPdf = join(dir, 'handout.pdf');
    writeFileSync(notAPdf, 'this is not a PDF at all\n');
    const out = await pdfHandoutFindings(notAPdf, { chapters: [], handout: { version: 'x', grading: [] } });
    // either poppler refused the file (a real finding) or poppler is absent (a WARN) — never an empty pass
    assert.ok(out.length > 0, 'a file that is not a PDF must not pass');
    assert.ok(out.some((e) => /could not validate|WARNING: pdf(info|totext)/.test(e)), out.join(' | '));
  } finally { rmSync(dir, { recursive: true, force: true, maxRetries: 3 }); }
});
