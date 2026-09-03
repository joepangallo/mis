// schema.test.mjs — content schema validation: accept the fixture and the real chapters, reject the classic mistakes.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { validate, validateHandout, table, gradingTable, collectWorkspaces, hygieneFindings, tableMarkupFindings, normaliseUnstuck } from '../schema.mjs';
import { ALLOW_LIST, DEFAULTS, loadContent } from '../build.mjs';
import { makeChapters, makeChapter1, makeChapter2, makeChapter3, makeHandout } from './fixture.mjs';

const opts = { allowedFiles: ALLOW_LIST };
const clone = (x) => structuredClone(x);
const rejects = (content, re, label) => {
  const r = validate(content, opts);
  assert.equal(r.ok, false, `${label}: expected rejection`);
  assert.ok(r.errors.some((e) => re.test(e)), `${label}: errors were ${JSON.stringify(r.errors)}`);
};

test('table() emits caption + th scope="col", escapes cells and refuses bad input', () => {
  const html = table({ caption: 'Cap <1>', head: ['A', 'B'], rows: [['x<', { html: '<b>raw</b>' }]] });
  assert.match(html, /<table class="tbl"><caption>Cap &lt;1&gt;<\/caption><thead><tr><th scope="col">A<\/th><th scope="col">B<\/th><\/tr><\/thead>/);
  assert.match(html, /<td>x&lt;<\/td><td><b>raw<\/b><\/td>/);
  assert.throws(() => table({ head: ['A'], rows: [] }), /caption/);
  assert.throws(() => table({ caption: 'c', head: [], rows: [] }), /head/);
  assert.throws(() => table({ caption: 'c', head: ['A'], rows: [['1', '2']] }), /every row needs 1 cells/);
  assert.deepEqual(tableMarkupFindings(html), []);
});

test('the fixture chapters and handout validate', () => {
  for (const c of makeChapters()) assert.deepEqual(validate(c, opts).errors, [], c.id);
  assert.deepEqual(validateHandout(makeHandout()).errors, []);
});

test('the real chapters and handout validate (when the content directory exists)', { skip: !existsSync(DEFAULTS.contentDir) }, async () => {
  const { chapters, handout } = await loadContent(DEFAULTS.contentDir);
  assert.equal(chapters.length, 3);
  for (const c of chapters) assert.deepEqual(validate(c, opts).errors, [], c.id);
  assert.deepEqual(validateHandout(handout).errors, []);
  const ids = chapters.flatMap((c) => collectWorkspaces(c).map((w) => w.id));
  assert.equal(new Set(ids).size, ids.length, 'workspace ids are unique across the three pages');
  for (const must of ['t1-35-1', 's1-35-5a', 's1-35-7', 'p1-35-explore', 's2-37-4', 'a2-37-4', 's2-37-4b', 's3-41-3', 'a3-41-6']) assert.ok(ids.includes(must), must);
});

test('rejects duplicate workspace ids and duplicate step labels', () => {
  const c = makeChapter1();
  c.exercises[1].steps[3].workspaces[0].id = 'a1-35-3';
  rejects(c, /duplicate workspace id a1-35-3/, 'duplicate id');
  const d = makeChapter1();
  d.exercises[1].steps[1].label = '1';
  rejects(d, /duplicate label "1"/, 'duplicate label');
});

test('rejects bad tools, terminal without command, python without snippet, sql in a spreadsheet', () => {
  const c = makeChapter1();
  c.exercises[1].steps[3].workspaces[0].tool = 'excel';
  rejects(c, /tool must be one of/, 'bad tool');
  const t = makeChapter1();
  delete t.exercises[1].steps[0].workspaces[0].command;
  rejects(t, /terminal workspace needs a command/, 'terminal');
  const p = makeChapter1();
  p.exercises[1].steps[5].workspaces[0].snippet = '';
  rejects(p, /python workspace needs a snippet/, 'python');
  const s = makeChapter1();
  s.exercises[0].steps[2].workspaces[0].tool = 'sql';
  rejects(s, /spreadsheet exercises may only carry text workspaces/, 'sql in spreadsheet');
});

test('rejects every hygiene leak', () => {
  const cases = [
    ['Keiser University', /school name/],
    ['CGS 3300', /course code/],
    ['see /Users/joe/x', /local file path/],
    ['the answer key says', /"answer key"/],
    ['ask your instructor', /"instructor"/],
    ['pip install via micropip', /pip\/PyPI/],
  ];
  for (const [leak, re] of cases) {
    const c = makeChapter1();
    c.exercises[0].scenario = `<p>${leak}</p>`;
    rejects(c, re, leak);
    assert.equal(hygieneFindings(leak).length, 1);
  }
  assert.deepEqual(hygieneFindings('Your student Microsoft 365 account includes Excel'), []);
});

test('rejects an interpretation chip on s3-41-3 but accepts a shape chip', () => {
  const c = makeChapter3();
  c.exercises[1].steps[1].workspaces[0].expect = ['0 rows'];
  rejects(c, /chip "0 rows" states a row count/, 'row count chip');
  const ok = makeChapter3();
  ok.exercises[1].steps[1].workspaces[0].expect = ['one query', 'then 2–3 sentences about staffing at that office'];
  assert.equal(validate(ok, opts).ok, true);
});

test('rejects tables without caption or th scope', () => {
  const c = makeChapter1();
  c.exercises[0].steps[1].html = '<table><thead><tr><th>A</th></tr></thead><tbody><tr><td>1</td></tr></tbody></table>';
  const r = validate(c, opts);
  assert.equal(r.ok, false);
  assert.ok(r.errors.some((e) => /no <caption>/.test(e)));
  assert.ok(r.errors.some((e) => /<th> without scope/.test(e)));
});

test('rejects a seedDb or filesShown path that is not embedded, a missing confirm text, bad ids and bad db paths', () => {
  const c = makeChapter3();
  c.seedDb = 'chapter-03/other.db';
  rejects(c, /seedDb .* is not an embedded file/, 'seedDb');
  const f = makeChapter3();
  f.filesShown = ['nope.csv'];
  rejects(f, /filesShown: nope.csv/, 'filesShown');
  const k = makeChapter2();
  delete k.confirmTexts.replace;
  rejects(k, /confirmTexts.replace is required/, 'confirmTexts');
  const mk = makeChapter2();
  mk.messages.bogus = 'x';
  rejects(mk, /messages.bogus is not a known message/, 'unknown message key');
  const ms = makeChapter2();
  ms.messages.sideDbs = { 'mileage.db': 'x' };
  rejects(ms, /sideDbs must not name primaryDb/, 'sideDbs naming the primary db');
  const mp = makeChapter2();
  mp.messages.sideDbs = { '../x.db': 'x' };
  rejects(mp, /is not a relative \.db path/, 'sideDbs path');
  const me = makeChapter2();
  me.messages.afterReset = '';
  rejects(me, /messages.afterReset must be a non-empty string/, 'empty afterReset');
  const i = makeChapter2();
  i.exercises[1].steps[0].workspaces[0].id = 'S2 37';
  rejects(i, /id must match/, 'bad id');
  const d = makeChapter2();
  d.primaryDb = '../mileage.db';
  rejects(d, /primaryDb must be a relative path/, 'primaryDb');
  const m = makeChapter2();
  m.id = 'chapter-9';
  rejects(m, /id and chapter disagree/, 'id/chapter');
  const e = makeChapter2();
  e.exportName = 'Ch2.MD';
  rejects(e, /exportName/, 'exportName');
});

test('validateHandout enforces the version constant, front/back, grading rows and hygiene', () => {
  const h = makeHandout();
  h.version = 'today';
  assert.ok(validateHandout(h).errors.some((e) => /version/.test(e)));
  const g = makeHandout();
  g.grading = [['only one', 'x', 'y']];
  assert.ok(validateHandout(g).errors.some((e) => /grading/.test(e)));
  const gb = makeHandout(); gb.back += '<p>Total per exercise 100</p>';
  assert.ok(validateHandout(gb).errors.some((e) => /must not render the grading table/.test(e)));
  const gn = makeHandout(); gn.gradingNotes = 42;
  assert.ok(validateHandout(gn).errors.some((e) => /gradingNotes/.test(e)));
  const l = makeHandout();
  l.back += '<p>Keiser</p>';
  assert.ok(validateHandout(l).errors.some((e) => /school name/.test(e)));
  assert.deepEqual(normaliseUnstuck([['q', 'a'], { q: 'x', a: 'y' }]), [{ q: 'q', a: 'a' }, { q: 'x', a: 'y' }]);
  assert.equal(normaliseUnstuck('<p>x</p>'), '<p>x</p>');
});

test('collectWorkspaces flattens in page order with step labels and exercise ids', () => {
  const ws = collectWorkspaces(makeChapter1());
  assert.deepEqual(ws.map((w) => w.id), ['a1-34-notice', 't1-35-1', 'a1-35-3', 's1-35-5a', 's1-35-6', 'p1-35-explore']);
  assert.equal(ws[1].stepLabel, '1');
  assert.equal(ws[1].exerciseId, '1-35');
  assert.equal(ws[5].optional, true);
});

test('gradingTable appends a Total row equal to the sum of the points and keeps the accessible markup', () => {
  const html = gradingTable([['A <b>', 15], ['B', 40], ['C', 45]]);
  assert.match(html, /<table class="tbl"><caption>Points per exercise<\/caption><thead><tr><th scope="col">Criterion<\/th><th scope="col">Points<\/th>/);
  assert.match(html, /<td>A &lt;b&gt;<\/td><td>15<\/td>/);
  assert.match(html, /<td><strong>Total per exercise<\/strong><\/td><td><strong>100<\/strong><\/td><\/tr><\/tbody>/);
  assert.equal((html.match(/<tr>/g) || []).length, 5);
  assert.ok(gradingTable([['x', 1]], { caption: 'Other' }).includes('<caption>Other</caption>'));
  assert.throws(() => gradingTable([]), /non-empty/);
});

test('collectWorkspaces keeps a workspace-level optional flag as well as the step-level one', () => {
  const c = makeChapter2();
  const step = c.exercises[1].steps.find((s) => s.workspaces && s.workspaces.length);
  step.workspaces.push({ tool: 'sql', id: 's-extra-opt', optional: true });
  const ws = collectWorkspaces(c);
  assert.equal(ws.find((w) => w.id === 's-extra-opt').optional, true);
  assert.equal(ws.find((w) => w.id === step.workspaces[0].id).optional, !!step.optional);
});

test('messages.noDbAction must name a terminal workspace on the same page', () => {
  const base = makeChapter1();
  const ws = collectWorkspaces(base);
  const termId = ws.find((w) => w.tool === 'terminal').id;
  const sqlId = ws.find((w) => w.tool === 'sql').id;
  const withMessages = (noDbAction) => ({ ...base, messages: { ...(base.messages || {}), noDbAction } });

  assert.deepEqual(validate(withMessages({ label: 'Load the data', ws: termId })).errors, [], 'a terminal workspace is accepted');
  assert.match(validate(withMessages({ ws: termId })).errors.join(' '), /noDbAction\.label/);
  assert.match(validate(withMessages({ label: 'x', ws: 'does-not-exist' })).errors.join(' '), /is not a workspace on this page/);
  assert.match(validate(withMessages({ label: 'x', ws: sqlId })).errors.join(' '), /must be a terminal workspace/);
  assert.match(validate(withMessages('not an object')).errors.join(' '), /must be an object/);
});
