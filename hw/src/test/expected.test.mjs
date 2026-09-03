// expected.test.mjs — the instructor-side verification contract:
// solutions-chN.sql @step blocks ⇄ expected/chapter-N.json actions ⇄ content workspace ids (+ chips ⇄ rows).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { DEFAULTS, loadContent } from '../build.mjs';
import { parseSolutionBlocks, blockSql, requiredSqlWorkspaces, expectedConsistencyFindings, expectedShapeFindings, loadExpected, loadSolutionBlocks, actionKind } from '../check.mjs';
import { makeChapters, SOLUTIONS, EXPECTED } from './fixture.mjs';

const fixtureBlocks = (n) => parseSolutionBlocks(SOLUTIONS[n]);

test('parseSolutionBlocks splits on @step / @alt markers; a block runs to the next marker or EOF', () => {
  const blocks = parseSolutionBlocks('-- header\nSELECT 0;\n-- @step a\nSELECT 1;\n\n-- @alt a-example\nSELECT 2;\n-- @step b\n-- comment\nSELECT 3;\n');
  assert.deepEqual(blocks.map((b) => [b.kind, b.id, b.line]), [['step', 'a', 3], ['alt', 'a-example', 6], ['step', 'b', 8]]);
  assert.equal(blocks[0].sql, 'SELECT 1;\n');
  assert.equal(blocks[2].sql, '-- comment\nSELECT 3;\n');
  assert.equal(blockSql(blocks, 'b'), '-- comment\nSELECT 3;\n');
  assert.throws(() => blockSql(blocks, 'a-example'), /no @step block/);
  assert.throws(() => blockSql(blocks, 'zzz'), /no @step block/);
});

test('requiredSqlWorkspaces excludes optional workspaces and workspaces in optional steps', () => {
  const [c1, c2, c3] = makeChapters();
  assert.deepEqual(requiredSqlWorkspaces(c1), ['s1-35-5a', 's1-35-6']);
  assert.deepEqual(requiredSqlWorkspaces(c2), ['s2-37-2', 's2-37-3', 's2-37-4', 's2-37-5b']);
  assert.deepEqual(requiredSqlWorkspaces(c3), ['s3-41-2a', 's3-41-3', 's3-41-5']);
});

test('the fixture contract is consistent', () => {
  makeChapters().forEach((c, i) => {
    assert.deepEqual(expectedConsistencyFindings({ content: c, blocks: fixtureBlocks(i + 1), expected: EXPECTED[i + 1] }), [], c.id);
  });
});

test('every action kind is recognised exactly once per action', () => {
  assert.equal(actionKind({ sql: 'x', block: 'x' }), 'sql');
  assert.equal(actionKind({ tables: {} }), 'tables');
  assert.equal(actionKind({ offline: true }), 'offline');
  assert.equal(actionKind({ sql: 'x', terminal: 'y' }), null);
  assert.equal(actionKind({}), null);
});

test('findings: missing block, duplicate block, dead block, alt referenced, wrong workspace, chip mismatch, no offline', () => {
  const c = makeChapters()[0];
  const good = EXPECTED[1];
  const f = (blocks, expected) => expectedConsistencyFindings({ content: c, blocks: parseSolutionBlocks(blocks), expected });
  assert.ok(f('-- @step s1-35-5a\nSELECT 1;\n', good).some((e) => /required sql workspace "s1-35-6" has no @step block/.test(e)));
  assert.ok(f(SOLUTIONS[1] + '\n-- @step s1-35-5a\nSELECT 2;\n', good).some((e) => /declared twice/.test(e)));
  assert.ok(f(SOLUTIONS[1] + '\n-- @step s1-35-extra\nSELECT 2;\n', good).some((e) => /"s1-35-extra".*never driven/.test(e)));
  const alt = structuredClone(good);
  alt.actions[2].block = '1-35-7-example';
  assert.ok(f(SOLUTIONS[1], alt).some((e) => /@alt block "1-35-7-example"/.test(e)));
  const wrongWs = structuredClone(good);
  wrongWs.actions[2].sql = 'a1-35-3';
  assert.ok(f(SOLUTIONS[1], wrongWs).some((e) => /not a sql workspace/.test(e)));
  const chip = structuredClone(good);
  chip.actions[2].expect.results[0].rows = 12;
  assert.ok(f(SOLUTIONS[1], chip).some((e) => /chip "13 rows" on s1-35-5a disagrees with expect.results\[0\].rows = 12/.test(e)));
  const changed = structuredClone(good);
  changed.actions[3].expect.changed = 5;
  assert.ok(f(SOLUTIONS[1], changed).some((e) => /chip "OK · 6 rows changed" on s1-35-6 disagrees with expect.changed = 5/.test(e)));
  const twice = structuredClone(good);
  twice.actions.splice(3, 0, structuredClone(good.actions[2]));
  assert.ok(f(SOLUTIONS[1], twice).some((e) => /block "s1-35-5a" is driven 2 times/.test(e)));
  const noOffline = structuredClone(good);
  noOffline.actions.pop();
  assert.ok(f(SOLUTIONS[1], noOffline).some((e) => /last action must be/.test(e)));
  const noTerminal = structuredClone(good);
  noTerminal.actions.shift();
  assert.ok(f(SOLUTIONS[1], noTerminal).some((e) => /terminal workspace t1-35-1's command is never driven/.test(e)));
});

test('expectedShapeFindings validates action shapes', () => {
  assert.ok(expectedShapeFindings({ chapter: 2, page: 'week-1-chapter-1.html', actions: [{ offline: true }, { xssCanary: true }] }, 1).some((e) => /chapter is 2/.test(e)));
  const bad = { chapter: 1, page: 'week-1-chapter-1.html', actions: [
    { sql: 's1' }, { tables: [] }, { python: '' }, { sql: 's', block: 'b', expect: { results: [{ rows: 2, cell: [5, 0, 'x'] }] } }, { reload: true, expect: { restored: 'x' } }, { downloadDb: true, expect: { sqlite3: ['x'] } }, { xssCanary: true }, { offline: true },
  ] };
  const out = expectedShapeFindings(bad, 1);
  for (const re of [/needs a block id/, /tables must be an object/, /python must be a code string/, /outside 2 rows/, /restored must be an array/, /sqlite3 must be/]) assert.ok(out.some((e) => re.test(e)), String(re));
  assert.deepEqual(expectedShapeFindings(EXPECTED[3], 3), []);
});

test('the REAL solutions and expected scripts agree with the real content (when present)', { skip: !existsSync(DEFAULTS.contentDir) || !existsSync(DEFAULTS.instructorDir) }, async () => {
  const { chapters } = await loadContent(DEFAULTS.contentDir);
  for (const c of chapters) {
    const blocks = loadSolutionBlocks(DEFAULTS.instructorDir, c.chapter);
    const expected = loadExpected(DEFAULTS.instructorDir, c.chapter);
    assert.deepEqual(expectedConsistencyFindings({ content: c, blocks, expected }), [], c.id);
    for (const id of requiredSqlWorkspaces(c)) {
      const own = blocks.filter((b) => b.kind === 'step' && (b.id === id || b.id.startsWith(`${id}-`)));
      assert.ok(own.length >= 1, `${c.id}: ${id} has a block`);
      for (const b of own) assert.ok(b.sql.trim().length > 0, `${b.id} is not empty`);
    }
  }
  // the spec's named special blocks for chapter 2 step 4
  const ch2 = loadSolutionBlocks(DEFAULTS.instructorDir, 2).filter((b) => b.kind === 'step').map((b) => b.id);
  for (const id of ['s2-37-4-check', 's2-37-4-unique', 's2-37-4-fk-nopragma', 's2-37-4-fk-pragma', 's2-37-4-orphan-check', 's2-37-4-cleanup']) assert.ok(ch2.includes(id), id);
  assert.match(blockSql(loadSolutionBlocks(DEFAULTS.instructorDir, 2), 's2-37-4-fk-pragma'), /PRAGMA foreign_keys = ON;/);
  assert.match(blockSql(loadSolutionBlocks(DEFAULTS.instructorDir, 2), 's2-37-4-orphan-check'), /PRAGMA foreign_key_check/);
  const ch1 = loadSolutionBlocks(DEFAULTS.instructorDir, 1);
  assert.match(blockSql(ch1, 's1-35-6'), /UPDATE[\s\S]*SELECT/, 'the step-6 block includes the re-run of (e)');
  assert.match(blockSql(ch1, 's1-35-7'), /^--/, 'step 7 starts with the question as a SQL comment');
  // no export `excludes` entry may carry a doubled backslash — the inert 4-char "C:\\" never matches a real path
  for (const c of chapters) {
    const expected = loadExpected(DEFAULTS.instructorDir, c.chapter);
    for (const a of expected.actions) for (const s of (a.expect && a.expect.excludes) || []) {
      assert.ok(!/\\\\/.test(s), `${c.id}: export exclude ${JSON.stringify(s)} has two consecutive backslashes`);
    }
  }
});


// A python snippet the page hands the student that no action ever runs is a snippet nobody has proved runs;
// so is a comment-stripped "equivalent" of it.
test('a python snippet or pythonStarter that is not driven verbatim is a finding', () => {
  const c = makeChapters()[0];
  const f = (expected) => expectedConsistencyFindings({ content: c, blocks: fixtureBlocks(1), expected });
  assert.deepEqual(f(EXPECTED[1]), []);
  const dropped = structuredClone(EXPECTED[1]);
  dropped.actions = dropped.actions.filter((a) => !('python' in a));
  const out = f(dropped);
  assert.ok(out.some((e) => /python workspace p1-35-explore's snippet is never driven verbatim/.test(e)), out.join(' | '));
  assert.ok(out.some((e) => /pythonStarter is never driven verbatim/.test(e)), out.join(' | '));
  // a reformatted variant does not count
  const stripped = structuredClone(EXPECTED[1]);
  const py = stripped.actions.find((a) => 'python' in a);
  py.python = py.python.split('\n').filter((l) => !l.trim().startsWith('#')).join('\n').replace(/\n{2,}/g, '\n') + '\n# extra\n';
  assert.ok(f(stripped).some((e) => /never driven verbatim/.test(e)));
  // trailing whitespace is not a difference
  const padded = structuredClone(EXPECTED[1]);
  padded.actions.find((a) => 'python' in a).python += '\n\n';
  assert.deepEqual(f(padded), []);
});

test('the REAL expected scripts drive every python snippet and every pythonStarter verbatim', { skip: !existsSync(DEFAULTS.contentDir) || !existsSync(DEFAULTS.instructorDir) }, async () => {
  const { chapters } = await loadContent(DEFAULTS.contentDir);
  for (const c of chapters) {
    const driven = loadExpected(DEFAULTS.instructorDir, c.chapter).actions.filter((a) => 'python' in a).map((a) => a.python.replace(/\s+$/, ''));
    assert.ok(driven.includes(String(c.pythonStarter).replace(/\s+$/, '')), `${c.id}: pythonStarter`);
    for (const ex of c.exercises) for (const st of ex.steps || []) for (const w of st.workspaces || []) {
      if (w.tool === 'python') assert.ok(driven.includes(String(w.snippet).replace(/\s+$/, '')), `${c.id}: ${w.id}`);
    }
  }
});

// The three export scripts no longer claim the .md excludes "/home/": the terminal's pwd prints
// /home/pyodide/week1 (the in-browser MEMFS root) and the whole transcript is exported, so the claim was only
// true because nothing ran pwd. Chapter 1 now runs it before the export, which is what makes that honest.
test('no export action claims to exclude the in-browser /home/ root, and chapter 1 proves why', { skip: !existsSync(DEFAULTS.instructorDir) }, () => {
  for (const n of [1, 2, 3]) {
    for (const a of loadExpected(DEFAULTS.instructorDir, n).actions) {
      for (const s of (a.expect && a.expect.excludes) || []) assert.notEqual(s, '/home/', `chapter ${n} still excludes /home/`);
    }
    // the host-path exclusions that ARE true are still there
    const exp = loadExpected(DEFAULTS.instructorDir, n).actions.find((a) => a.export === true);
    assert.ok(exp.expect.excludes.includes('file://') && exp.expect.excludes.includes('/Users/'), `chapter ${n} keeps the host-path exclusions`);
  }
  const ch1 = loadExpected(DEFAULTS.instructorDir, 1).actions;
  const pwd = ch1.findIndex((a) => a.terminal === 'pwd');
  const exportAt = ch1.findIndex((a) => a.export === true);
  assert.ok(pwd >= 0 && pwd < exportAt, 'chapter 1 runs pwd before the export');
  assert.deepEqual(ch1[pwd].expect.stdoutIncludes, ['/home/pyodide/week1']);
});
