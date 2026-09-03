/* Text, hygiene, and pagination checks for the rendered printable companion.
   Requires Poppler's `pdfinfo` and `pdftotext`, which are also used for visual
   QA during release work. */
import { readFileSync, existsSync } from "node:fs";
import { join, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";

const HERE = dirname(fileURLToPath(import.meta.url));
const args = process.argv.slice(2);
const modArg = args.find((a) => a.startsWith("--module="));
const SP = modArg ? join(HERE, modArg.slice("--module=".length)) : HERE;
const cfgPath = join(SP, "sections.json");
const CFG = existsSync(cfgPath) ? JSON.parse(readFileSync(cfgPath, "utf8")) : null;
const RELEASE = args.includes("--release");
const pdfArg = args.find((a) => !a.startsWith("--"));
const PDF = resolve(pdfArg || join(HERE, "..", (CFG ? CFG.outputFile : "module-01-managing-in-the-digital-world.html").replace(/\.html$/, ".pdf")));
const fail = [], warn = [];
const bad = (m) => fail.push(m);
const meh = (m) => warn.push(m);
const need = (ok, m) => { if (!ok) bad(m); };

function run(name, args) {
  const r = spawnSync(name, args, {encoding:"utf8", maxBuffer:50_000_000});
  if (r.error) { bad(`${name} is unavailable: ${r.error.message}`); return ""; }
  if (r.status !== 0) { bad(`${name} failed: ${(r.stderr || r.stdout || "no output").trim()}`); return ""; }
  return r.stdout;
}

if (!existsSync(PDF)) bad(`PDF not found: ${PDF}`);
const info = fail.length ? "" : run("pdfinfo", [PDF]);
const text = fail.length ? "" : run("pdftotext", ["-layout", PDF, "-"]);
const pageCount = Number((info.match(/^Pages:\s+(\d+)/m) || [])[1]);
const pages = text ? text.split("\f").filter((p, i, a) => p.trim() || i < a.length - 1) : [];
const words = (s) => s.trim().split(/\s+/).filter(Boolean).length;

if (info) {
  need(Number.isInteger(pageCount) && pageCount > 0, "pdfinfo did not report a valid page count");
  need(/Page size:\s+612 x 792 pts \(letter\)/i.test(info), "PDF is not US Letter size");
  need(!/^Encrypted:\s+yes/im.test(info), "PDF is unexpectedly encrypted");
}
if (text) {
  need(pages.length === pageCount, `pdftotext found ${pages.length} pages but pdfinfo reports ${pageCount}`);
  need(words(text) > 12_000, `PDF contains only ${words(text)} words; lesson content may be missing`);
  /* Take the expected count from the manifest rather than a literal, so adding a
     section cannot leave this check silently asserting a stale number. */
  const manifestPath = join(SP, "module.manifest.json");
  const expectedActivities = existsSync(manifestPath)
    ? (JSON.parse(readFileSync(manifestPath, "utf8")).activityKeys || []).length
    : 0;
  need(expectedActivities > 0, "module.manifest.json has no activityKeys to check the PDF against");
  const summaries = (text.match(/Lesson and answer summary/g) || []).length;
  need(summaries === expectedActivities, `PDF has ${summaries} static activity summaries, expected ${expectedActivities}`);
  need((text.match(/Answer key/g) || []).length === 1, "PDF final answer key is missing or duplicated");
  const supplementCount = CFG ? (CFG.supplements || []).length : 1;
  const labelled = (text.match(/Application supplement/gi) || []).length;
  need(labelled >= supplementCount,
    `PDF shows ${labelled} "Application supplement" labels, expected at least ${supplementCount}`);
  need(/hypothetical/i.test(text), "final challenge does not identify hypothetical situations in the PDF");

  /* Nothing else here reads the page the PDF is a companion of, so a prose-only edit used to
     leave a stale PDF passing every check. make-pdf.mjs stamps the print source with the first
     twelve hex characters of the sha-256 of the HTML it was handed; if that token is missing or
     belongs to an older page, this PDF was printed from a different build. */
  const htmlName = (CFG ? CFG.outputFile : "module-01-managing-in-the-digital-world.html");
  const htmlPath = join(dirname(PDF), htmlName);
  if (!existsSync(htmlPath)) bad(`cannot verify PDF freshness: page not found beside the PDF: ${htmlPath}`);
  else {
    const stamp = createHash("sha256").update(readFileSync(htmlPath)).digest("hex").slice(0, 12);
    const printed = (text.match(/Print edition ([0-9a-f]{12})/) || [])[1];
    if (!printed) bad("PDF carries no print-edition stamp; re-run make-pdf.mjs and reprint");
    else need(printed === stamp, `PDF was printed from a different build of ${htmlName} (stamp ${printed}, page is ${stamp}); reprint it`);
  }

  const forbidden = [
    [/keiser/i, "school name"],
    [/\bCGS\s*3300\b/i, "course code"],
    [/\bsyllabus\b/i, "syllabus reference"],
    [/\brubric\b/i, "rubric reference"],
    [/\b\d+\s*points?\b/i, "point value"],
    [/\b(?:written|created|generated|assisted|produced)\s+(?:with|by)\s+(?:AI|ChatGPT|Claude|OpenAI|Codex)\b/i, "AI attribution"],
    [/\bAI[- ]generated\b/i, "AI attribution"],
    [/\/Users\//, "local filesystem path"],
    [/[A-Za-z]:\\(?:Users|Documents|Desktop)\\/i, "local filesystem path"],
    [/\bfile:\/\//i, "local file URL"],
    [/https?:\/\//i, "external URL"],
    [/\bHarborline\b/i, "invented company name"],
    [/&(?:[A-Za-z][A-Za-z0-9]+|#\d+|#x[0-9A-Fa-f]+);/, "unrendered HTML entity"],
    [/\uFFFD|□|▯/, "missing-glyph marker"],
  ];
  /* Same lookup order as check.mjs: a module may carry its own list, and src/ is the
     fallback. Looking only in src/ would let one checker honour a per-module list that the
     other silently ignored. */
  const localList = [join(SP, "forbidden.local.txt"), join(HERE, "forbidden.local.txt")]
    .find((p) => existsSync(p)) || join(HERE, "forbidden.local.txt");
  if (existsSync(localList)) {
    for (const term of readFileSync(localList, "utf8").split(/\r?\n/).map((t) => t.trim()).filter(Boolean)) {
      const safe = term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      forbidden.push([new RegExp(`\\b${safe}\\b`, "i"), "reserved assessment term"]);
    }
  } else if (RELEASE) bad("release check requires src/forbidden.local.txt");
  else meh("src/forbidden.local.txt not present - assessment-specific PDF terms are not being checked");
  for (const [re, label] of forbidden) {
    const hit = text.match(re);
    if (hit) bad(`PDF contains ${label}: ${JSON.stringify(hit[0])}`);
  }

  /* Each section starts on a fresh page, so the page that ends a section is
     legitimately short - the same as a chapter ending high on a page in a
     printed book. Only flag a thin page when it is NOT a section boundary,
     which is where a genuinely unsplittable block would show up. */
  const startsSection = (t) => /^\s*(?:SECTION\s+\d|APPLICATION SUPPLEMENT|MODULE\s+\d|Reference\b|Put it together\b)/i.test(String(t || "").trim());
  pages.forEach((page, index) => {
    const count = words(page);
    const endsASection = index + 1 < pages.length && startsSection(pages[index + 1]);
    if (count < 70 && !endsASection) bad(`page ${index + 1} is sparse (${count} words)`);
    else if (count < 70) meh(`page ${index + 1} is short (${count} words) but ends a section`);
    else if (count < 100) meh(`page ${index + 1} is light (${count} words)`);
  });
}

console.log(`PDF: ${PDF}`);
console.log(`pages: ${pageCount || 0}   words: ${text ? words(text) : 0}`);
if (warn.length) { console.log(`\n${warn.length} warning(s):`); warn.forEach((m) => console.log("  ~ " + m)); }
if (fail.length) { console.log(`\n${fail.length} FAILURE(s):`); fail.forEach((m) => console.log("  ! " + m)); process.exitCode = 1; }
else console.log("\nAll PDF checks passed.");
