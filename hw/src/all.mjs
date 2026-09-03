#!/usr/bin/env node
// all.mjs — the whole regeneration + verification sequence in the one order that respects how the artefacts
// depend on each other. Stops at the first non-zero exit and exits with that code. Zero dependencies.
//
//   node hw/src/all.mjs [--skip-browser] [--chrome PATH]
//
//   1. build.mjs --no-zip     pages + the print HTML (to a scratch path); no zips yet, because the PDF one of them
//                             embeds has not been printed
//   2. make-pdf.mjs           prints and validates Week 1/Application-Exercises-Week-1.pdf from that print HTML
//   3. build.mjs              the same pages again, and now the zips, carrying the PDF that step 2 just wrote
//   4. check.mjs              static checks: freshness, hygiene, DOM rules, HW_PAGE, CDN pins, a11y, ids, contract,
//                             the handout PDF (make-pdf's full validation) and the zips
//   5. node --test            unit tests (helpers, schema, build assembly, zip, export format, expected/@step)
//   6. verify-browser.mjs     the REAL pages in headless Chrome, driven by the solutions + expected scripts
//   7. check.mjs              nothing drifted while the browser run was in flight
//
// The PDF is printed BEFORE the check that validates it: check.mjs now runs make-pdf.mjs's per-step / chip /
// command / unstuck checks against the file on disk, so any content edit makes a stale PDF fail step 4 — and
// with the PDF last (the old order) the sequence would stop there and never reach make-pdf.mjs at all.
import { spawnSync } from 'node:child_process';
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const SRC = dirname(fileURLToPath(import.meta.url));
const HW = resolve(SRC, '..');

function parseArgs(argv) {
  const o = { skipBrowser: false, chrome: null };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--skip-browser') o.skipBrowser = true;
    else if (a === '--chrome') { o.chrome = argv[++i]; if (!o.chrome) throw new Error('--chrome needs a value'); }
    else if (a.startsWith('--chrome=')) o.chrome = a.slice('--chrome='.length);
    else if (a === '--help' || a === '-h') o.help = true;
    else throw new Error(`unknown option ${a}`);
  }
  return o;
}

let o;
try { o = parseArgs(process.argv.slice(2)); } catch (e) { console.error(e.message); process.exit(2); }
if (o.help) { console.log('usage: node all.mjs [--skip-browser] [--chrome PATH]'); process.exit(0); }

const chromeArgs = o.chrome ? ['--chrome', o.chrome] : [];
const scratch = mkdtempSync(join(tmpdir(), 'hw-all-'));
const printOut = join(scratch, 'handout.html');
const steps = [
  ['build.mjs --no-zip (pages + print HTML)', [join(SRC, 'build.mjs'), '--no-zip', '--print-out', printOut]],
  ['make-pdf.mjs (the handout the check and the zip both read)', [join(SRC, 'make-pdf.mjs'), '--html', printOut, ...chromeArgs]],
  ['build.mjs (pages + the zips, carrying the fresh PDF)', [join(SRC, 'build.mjs'), '--print-out', printOut]],
  ['check.mjs', [join(SRC, 'check.mjs')]],
  ['node --test', ['--test', join(SRC, 'test', '*.test.mjs')]],
];
if (!o.skipBrowser) steps.push(['verify-browser.mjs', [join(SRC, 'verify-browser.mjs'), ...chromeArgs]]);
steps.push(['check.mjs (after the browser run)', [join(SRC, 'check.mjs')]]);

const results = [];
let failed = 0;
try {
  for (const [label, args] of steps) {
    console.log(`\n=== ${label} ===`);
    const t0 = Date.now();
    const r = spawnSync(process.execPath, args, { stdio: 'inherit', cwd: HW });
    const code = r.status == null ? 1 : r.status;
    results.push([label, code, Math.round((Date.now() - t0) / 100) / 10]);
    if (code !== 0) { failed = code; console.error(`\n${label} exited ${code}${r.signal ? ` (${r.signal})` : ''} — stopping.`); break; }
  }
} finally {
  rmSync(scratch, { recursive: true, force: true, maxRetries: 5, retryDelay: 200 });
}
console.log('\nSummary');
for (const [label, code, secs] of results) console.log(`  ${code === 0 ? 'ok  ' : 'FAIL'}  ${label} (${secs}s)`);
const missing = steps.slice(results.length).map(([label]) => label);
if (missing.length) console.log(`  not run: ${missing.join(', ')}`);
process.exit(failed);
