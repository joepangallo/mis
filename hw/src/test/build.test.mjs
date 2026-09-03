// build.test.mjs — page assembly to a temp dir (deterministic), the HW_PAGE contract, zips from a build.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, readFileSync, rmSync, existsSync, writeFileSync, mkdirSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import {
  buildAll, loadAssets, loadContent, assemblePage, assemblePrint, serializePageData, assertInlineSafe, instructorZipEntries,
  pageData, DEFAULTS, ALLOW_LIST, STARTER_ZIP, INSTRUCTOR_ZIP, PDF_NAME, WEEK_FOLDER, parseArgs, pageName,
  afterResetDefault, cssString, footerText,
} from '../build.mjs';
import { listZip, readZipEntry } from '../zip.mjs';
import { hygieneFindings, collectWorkspaces } from '../schema.mjs';
import { pageFindings, extractPageData, domRuleFindings, buttonNames } from '../check.mjs';
import { writeContentDir, writeInstructorDir, writeWeekDir, makeChapters, makeHandout } from './fixture.mjs';

const UNZIP = '/usr/bin/unzip';
let tmp;
test.before(() => { tmp = mkdtempSync(join(tmpdir(), 'hw-build-')); });
test.after(() => { rmSync(tmp, { recursive: true, force: true, maxRetries: 3 }); });

test('serializePageData escapes "<" and the line separators; assertInlineSafe refuses script terminators', () => {
  const s = serializePageData({ a: '</script><!-- \u2028\u2029' });
  assert.equal(s.includes('<'), false);
  assert.equal(s, '{"a":"\\u003c/script>\\u003c!-- \\u2028\\u2029"}');
  assert.deepEqual(JSON.parse(s), { a: '</script><!-- \u2028\u2029' });
  assert.throws(() => assertInlineSafe('var x = "</script>";', 'x'), /<\/script/);
  assert.throws(() => assertInlineSafe('<!-- c', 'x'), /<!--/);
  assert.equal(assertInlineSafe('ok', 'x'), 'ok');
});

test('building twice from the fixture is byte-identical (pages + print HTML)', async () => {
  const contentDir = writeContentDir(join(tmp, 'content'));
  const a = await buildAll({ contentDir, outDir: join(tmp, 'out-a'), printOut: join(tmp, 'out-a', 'print', 'handout.html'), noZip: true, quiet: true });
  const b = await buildAll({ contentDir, outDir: join(tmp, 'out-b'), printOut: join(tmp, 'out-b', 'print', 'handout.html'), noZip: true, quiet: true });
  assert.equal(a.pages.length, 3);
  for (let i = 0; i < 3; i++) {
    const name = a.pages[i].name;
    assert.equal(name, pageName(i + 1));
    assert.ok(readFileSync(join(tmp, 'out-a', name)).equals(readFileSync(join(tmp, 'out-b', name))), name);
    assert.equal(a.pages[i].html, b.pages[i].html);
  }
  assert.equal(a.printHtml, b.printHtml);
  assert.ok(readFileSync(join(tmp, 'out-a', 'print', 'handout.html')).equals(readFileSync(join(tmp, 'out-b', 'print', 'handout.html'))));
  assert.equal(a.zips.length, 0);
});

test('a fixture page satisfies every static rule check.mjs enforces', async () => {
  const assets = loadAssets({ weekDir: DEFAULTS.weekDir });
  const handout = makeHandout();
  for (const c of makeChapters()) {
    const html = assemblePage(c, handout, assets);
    assert.deepEqual(pageFindings(html, { content: c, handout, cdn: assets.cdn, fileBytes: assets.fileBytes, label: c.id }), []);
    const { raw, data } = extractPageData(html);
    assert.equal(raw.includes('<'), false);
    assert.deepEqual(Object.keys(data.files).sort(), [...ALLOW_LIST]);
    for (const p of ALLOW_LIST) {
      const f = data.files[p];
      const bytes = f.kind === 'text' ? Buffer.from(f.body, 'utf8') : Buffer.from(f.body, 'base64');
      assert.ok(bytes.equals(assets.fileBytes[p]), p);
    }
    assert.deepEqual(data.workspaces.map((w) => w.id), collectWorkspaces(c).map((w) => w.id));
    assert.equal(data.version, handout.version);
    assert.equal(data.primaryDb, c.primaryDb);
    assert.ok(!('exercises' in data) && !('lede' in data), 'no prose in HW_PAGE');
    assert.ok(html.includes(`version ${handout.version}`));
    assert.equal((html.match(/<script src=/g) || []).length, 2);
    assert.ok(html.includes(`integrity="${assets.cdn.sqljs.loader.integrity}" crossorigin="anonymous"`));
    assert.ok(html.includes(`integrity="${assets.cdn.pyodide.loader.integrity}" crossorigin="anonymous"`));
    assert.ok(html.includes('Each time you press Run, the page opens your database file'));
    assert.deepEqual(hygieneFindings(html), []);
  }
  assert.deepEqual(domRuleFindings(assets.runtimeJs, 'runtime.js'), []);
  assert.deepEqual(domRuleFindings(assets.helpersJs, 'helpers.js'), []);
});

test('the real content builds deterministically and passes the static rules (when present)', { skip: !existsSync(DEFAULTS.contentDir) }, async () => {
  const assets = loadAssets({ weekDir: DEFAULTS.weekDir });
  const { chapters, handout } = await loadContent(DEFAULTS.contentDir);
  for (const c of chapters) {
    const html = assemblePage(c, handout, assets);
    assert.equal(html, assemblePage(c, handout, assets));
    assert.deepEqual(pageFindings(html, { content: c, handout, cdn: assets.cdn, fileBytes: assets.fileBytes, label: c.id }), []);
  }
  const print = assemblePrint(chapters, handout);
  assert.deepEqual(hygieneFindings(print), []);
  for (const c of chapters) for (const ex of c.exercises) assert.ok(print.includes(`Exercise ${ex.id} · `), ex.id);
  assert.ok(print.includes('What to hand in'));
});

test('pageData carries only what the runtime needs', () => {
  const assets = loadAssets({ weekDir: DEFAULTS.weekDir });
  const d = pageData(makeChapters()[0], makeHandout(), assets);
  assert.deepEqual(Object.keys(d).sort(), ['cdn', 'chapter', 'confirmTexts', 'exportName', 'files', 'id', 'messages', 'primaryDb', 'pythonStarter', 'seedDb', 'version', 'workspaces']);
  assert.equal(d.exportName, 'ch1-queries.md');
  assert.equal(d.messages.noDb, 'No database yet — run the import in 1-35 step 1');
  const term = d.workspaces.find((w) => w.id === 't1-35-1');
  assert.deepEqual(Object.keys(term).sort(), ['command', 'exerciseId', 'id', 'stepLabel', 'tool']);
});

test('HW_PAGE.messages: every key present, chapter overrides win, seed/no-seed defaults otherwise', () => {
  const assets = loadAssets({ weekDir: DEFAULTS.weekDir });
  const [c1, c2, c3] = makeChapters();
  const d1 = pageData(c1, makeHandout(), assets);
  assert.deepEqual(Object.keys(d1.messages).sort(), ['afterReset', 'noDb', 'noDbAction', 'sideDbs', 'wrongName']);
  assert.equal(d1.messages.noDbAction, null, 'a chapter that declares no loader button gets null, not undefined');
  assert.equal(d1.messages.afterReset, 'Database removed — run the import in 1-35 step 1 to recreate it');
  assert.equal(d1.messages.wrongName, 'Re-run the import with the exact name, or pick the file here.');
  assert.deepEqual(d1.messages.sideDbs, {});
  const d2 = pageData(c2, makeHandout(), assets);
  assert.equal(d2.messages.afterReset, 'Database removed — run 2-37 step 2 again to recreate it');
  assert.equal(d2.messages.wrongName, 'Give the file the exact name mileage.db, or pick it here.');
  assert.deepEqual(Object.keys(d2.messages.sideDbs), ['scratch.db']);
  const d3 = pageData(c3, makeHandout(), assets);   // the fixture's chapter 3 sets no messages at all
  assert.equal(d3.messages.noDb, 'No database yet — run the import in the Database panel first.');
  assert.equal(d3.messages.afterReset, 'Database reset to the original employees.db');
  assert.equal(afterResetDefault({ seedDb: null, primaryDb: 'x.db' }), 'Database removed — run the import again to recreate it');
  assert.equal(afterResetDefault({ seedDb: 'a/b.db', primaryDb: 'a/b.db' }), 'Database reset to the original b.db');
  // A chapter that declares the one-click loader gets exactly {label, ws} through to the runtime.
  const withAction = { ...c1, messages: { ...c1.messages, noDbAction: { label: 'Load the data', ws: 't1-35-1', extra: 'dropped' } } };
  const dA = pageData(withAction, makeHandout(), assets);
  assert.deepEqual(dA.messages.noDbAction, { label: 'Load the data', ws: 't1-35-1' });
});

test('the real chapter 1 ships a one-click loader pointing at its own step-1 terminal command', async () => {
  const c1 = (await import('../content/chapter-1.mjs')).default;
  const action = c1.messages.noDbAction;
  assert.ok(action, 'chapter 1 declares messages.noDbAction');
  assert.match(action.label, /Load the data/);
  const target = c1.exercises.flatMap((e) => e.steps).flatMap((st) => st.workspaces || []).find((w) => w.id === action.ws);
  assert.ok(target, `${action.ws} is a workspace on the page`);
  assert.equal(target.tool, 'terminal', 'the button can only run a command the page already shows');
  assert.match(target.command, /^python load_data\.py .*campus_travel\.db$/, target.command);
});

test('accessible names: put-buttons name the step without doubled words; step labels, chips and expect lists carry no aria-label on a plain element; print-only name and running footer', () => {
  const assets = loadAssets({ weekDir: DEFAULTS.weekDir });
  const handout = makeHandout();
  for (const c of makeChapters()) {
    const html = assemblePage(c, handout, assets);
    const names = buttonNames(html);
    for (const n of names) assert.doesNotMatch(n, /\b(\w+) \1\b/i, `${c.id}: doubled word in "${n}"`);
    assert.ok(names.includes('Put the explore step code in the Python cell'), c.id);
    if (c.chapter === 1) assert.ok(names.includes('Put the step 1 command in the terminal'));
    // ARIA prohibits aria-label on a plain span/div: a named step-label / expect / chips element must carry a list or group role
    for (const m of html.matchAll(/<(?:span|div)\b[^>]*\baria-label="[^"]*"[^>]*>/g)) {
      if (/\bclass="(?:step-label[^"]*|expect|chips)"/.test(m[0])) assert.match(m[0], /\brole="(?:list|group)"/, `${c.id}: aria-label on a generic element: ${m[0]}`);
    }
    assert.equal(/<span class="step-label[^"]*"[^>]*aria-label=/.test(html), false, `${c.id}: step label carries aria-label`);
    assert.match(html, /<span class="step-label"><span class="sr-only">Step <\/span>\d+[a-z]?<\/span>/, `${c.id}: sr-only step prefix`);
    assert.ok(html.includes('<span class="step-label is-word">Explore</span>'), `${c.id}: word label without a prefix`);
    assert.ok(html.includes('<div class="expect" role="list" aria-label="What to expect"><span role="listitem">'), `${c.id}: expect list`);
    assert.ok(html.includes('<div class="chips" role="list" aria-label="At a glance"><span class="chip" role="listitem">'), `${c.id}: hero chips`);
    assert.ok(html.includes('<p class="print-name">Student: <span id="printName"></span></p>'), `${c.id}: print name line`);
    assert.equal(footerText(c, handout), `Week 1 · Chapter ${c.chapter} · version ${handout.version}`);
    assert.ok(html.includes(`<style>:root{--print-foot:"Week 1 · Chapter ${c.chapter} · version ${handout.version}"}</style>`), `${c.id}: running footer text`);
    assert.ok(html.includes(`<footer class="page-foot"><div class="wrap">Week 1 · Chapter ${c.chapter} · version ${handout.version}</div></footer>`), `${c.id}: footer`);
  }
  assert.equal(cssString('a"b\\c\nd'), '"a\\"b\\\\c\\a d"');
  assert.throws(() => cssString('x</style>'), /<\/style/);
});

test('zips: deterministic bytes, expected entries, CRC round-trip, unzip agrees; the instructor zip refuses a student page', async () => {
  const contentDir = writeContentDir(join(tmp, 'zcontent'));
  const weekDir = writeWeekDir(join(tmp, 'week'));
  const instructorDir = writeInstructorDir(join(tmp, 'instructor'));
  const a = await buildAll({ contentDir, weekDir, instructorDir, outDir: join(tmp, 'zout-a'), zipDir: join(tmp, 'zip-a'), quiet: true });
  const b = await buildAll({ contentDir, weekDir, instructorDir, outDir: join(tmp, 'zout-b'), zipDir: join(tmp, 'zip-b'), quiet: true });
  for (const name of [STARTER_ZIP, INSTRUCTOR_ZIP]) assert.ok(readFileSync(join(tmp, 'zip-a', name)).equals(readFileSync(join(tmp, 'zip-b', name))), name);
  assert.equal(a.zips.length, 2);
  assert.equal(b.zips.length, 2);
  const starter = readFileSync(join(tmp, 'zip-a', STARTER_ZIP));
  const names = listZip(starter).map((e) => e.name);
  const want = [...ALLOW_LIST.map((p) => `${WEEK_FOLDER}/${p}`), ...[1, 2, 3].map((n) => `${WEEK_FOLDER}/${pageName(n)}`), `${WEEK_FOLDER}/${PDF_NAME}`].sort();
  assert.deepEqual(names, want);
  assert.ok(!names.some((n) => /\.DS_Store/.test(n)));
  assert.ok(readZipEntry(starter, `${WEEK_FOLDER}/load_data.py`).equals(readFileSync(join(weekDir, 'load_data.py'))));
  assert.equal(readZipEntry(starter, `${WEEK_FOLDER}/${pageName(1)}`).toString('utf8'), a.pages[0].html);
  const instr = readFileSync(join(tmp, 'zip-a', INSTRUCTOR_ZIP));
  const inames = listZip(instr).map((e) => e.name);
  assert.deepEqual(inames, ['instructor/ANSWER-KEY.md', 'instructor/README-INSTRUCTOR.md', 'instructor/expected/chapter-1.json', 'instructor/expected/chapter-2.json', 'instructor/expected/chapter-3.json', 'instructor/solutions-ch1.sql', 'instructor/solutions-ch2.sql', 'instructor/solutions-ch3.sql']);
  assert.ok(!inames.some((n) => /week-1-chapter-\d\.html/.test(n)));
  if (existsSync(UNZIP)) {
    const listing = execFileSync(UNZIP, ['-l', join(tmp, 'zip-a', STARTER_ZIP)]).toString();
    for (const n of want) assert.ok(listing.includes(n), n);
    assert.match(execFileSync(UNZIP, ['-t', join(tmp, 'zip-a', INSTRUCTOR_ZIP)]).toString(), /No errors detected/);
  }
  const bad = join(tmp, 'bad-instructor');
  mkdirSync(bad, { recursive: true });
  writeFileSync(join(bad, 'week-1-chapter-1.html'), '<html></html>');
  assert.throws(() => instructorZipEntries(bad), /must never contain a student page/);
  await assert.rejects(buildAll({ contentDir, weekDir: writeWeekDir(join(tmp, 'week-nopdf'), { pdf: false }), instructorDir, outDir: join(tmp, 'zout-c'), zipDir: join(tmp, 'zip-c'), quiet: true }), /missing — run make-pdf.mjs/);
});

test('parseArgs understands every option and rejects unknown ones', () => {
  const o = parseArgs(['--content-dir', 'c', '--out-dir=o', '--no-zip', '--print-out', 'p.html', '--quiet']);
  assert.ok(o.contentDir.endsWith('/c'));
  assert.ok(o.outDir.endsWith('/o'));
  assert.equal(o.noZip, true);
  assert.ok(o.printOut.endsWith('/p.html'));
  assert.equal(o.quiet, true);
  assert.throws(() => parseArgs(['--bogus']), /unknown option/);
  assert.throws(() => parseArgs(['--out-dir']), /needs a value/);
});

test('pages and print carry the grading total row, the shared Getting-unstuck list after the chapter entries, and styled tables', async () => {
  const assets = loadAssets({ weekDir: DEFAULTS.weekDir });
  const handout = makeHandout();
  const [c1] = makeChapters();
  const page = assemblePage(c1, handout, assets);
  assert.ok(page.includes('<strong>Total per exercise</strong></td><td><strong>100</strong>'), 'total row on the page');
  const own = page.indexOf('The misspelling came back');
  const shared = page.indexOf('input() is not available</dt>');
  assert.ok(own > 0 && shared > own, 'chapter entry first, then the handout entry');
  assert.ok(page.indexOf('<section class="card" id="unstuck"') < own, 'both live in #unstuck');
  assert.equal(/<table>/.test(page), false, 'every content table carries the tbl class');
  const print = assemblePrint(makeChapters(), handout);
  assert.equal((print.match(/Total per exercise/g) || []).length, 1, 'the print renders the grading table once');
  assert.ok(print.indexOf('What to hand in') < print.indexOf('<h2>Getting unstuck</h2>'), 'shared unstuck list after the back matter');
  assert.ok(print.indexOf('Getting unstuck · Chapter 1') < print.indexOf('What to hand in'), 'chapter entries inside the chapter');
  assert.equal(/<table>/.test(print), false);
});

test('the real handout exports the shared unstuck list and its back matter renders the grading table exactly once (when present)', { skip: !existsSync(DEFAULTS.contentDir) }, async () => {
  const assets = loadAssets({ weekDir: DEFAULTS.weekDir });
  const { chapters, handout } = await loadContent(DEFAULTS.contentDir);
  assert.ok(Array.isArray(handout.unstuck) && handout.unstuck.length >= 10, 'browser-edition entries');
  assert.equal(/Total per exercise/.test(handout.back), false, 'the build owns the grading table');
  assert.equal(typeof handout.gradingNotes, 'string');
  assert.equal(handout.grading.reduce((n, [, p]) => n + p, 0), 100);
  const print = assemblePrint(chapters, handout);
  assert.equal((print.match(/Total per exercise/g) || []).length, 1);
  assert.equal((print.match(/<h2>Getting unstuck<\/h2>/g) || []).length, 1);
  assert.ok(print.indexOf('What to hand in') < print.indexOf('<h2>How each exercise is graded</h2>') && print.indexOf('<h2>How each exercise is graded</h2>') < print.indexOf('<h2>Getting unstuck</h2>'), 'hand in → grading → unstuck');
  assert.equal((print.match(/Two notes on grading/g) || []).length, 1);
  for (const c of chapters) {
    const page = assemblePage(c, handout, assets);
    assert.ok(page.includes('<strong>Total per exercise</strong>'), c.id);
    assert.ok(page.includes('Two notes on grading'), `${c.id}: grading notes`);
    for (const [q] of handout.unstuck) assert.ok(page.includes(`<dt>${q}</dt>`), `${c.id} lacks unstuck entry ${q}`);
    assert.equal(/<table>/.test(page), false, `${c.id}: bare <table>`);
  }
});
