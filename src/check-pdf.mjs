/* Text, hygiene, and pagination checks for the rendered printable companion.
   Requires Poppler's `pdfinfo` and `pdftotext`, which are also used for visual
   QA during release work. */
import { readFileSync, existsSync } from "node:fs";
import { join, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const HERE = dirname(fileURLToPath(import.meta.url));
const PDF = resolve(process.argv[2] || join(HERE, "..", "module-01-managing-in-the-digital-world.pdf"));
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
  need((text.match(/Lesson and answer summary/g) || []).length === 41, "PDF does not contain all 41 static activity summaries");
  need((text.match(/Answer key/g) || []).length === 1, "PDF final answer key is missing or duplicated");
  need(/Application supplement\s*·\s*1[–-]5/i.test(text), "strategy section is not visibly labeled as a supplement in the PDF");
  need(text.includes("clearly hypothetical organizational situation"), "final challenge does not identify hypothetical situations in the PDF");

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
  const localList = join(HERE, "forbidden.local.txt");
  if (existsSync(localList)) {
    for (const term of readFileSync(localList, "utf8").split(/\r?\n/).map((t) => t.trim()).filter(Boolean)) {
      const safe = term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      forbidden.push([new RegExp(`\\b${safe}\\b`, "i"), "reserved assessment term"]);
    }
  } else meh("src/forbidden.local.txt not present - assessment-specific PDF terms are not being checked");
  for (const [re, label] of forbidden) {
    const hit = text.match(re);
    if (hit) bad(`PDF contains ${label}: ${JSON.stringify(hit[0])}`);
  }

  pages.forEach((page, index) => {
    const count = words(page);
    if (count < 70) bad(`page ${index + 1} is sparse (${count} words)`);
    else if (count < 100) meh(`page ${index + 1} is light (${count} words)`);
  });
}

console.log(`PDF: ${PDF}`);
console.log(`pages: ${pageCount || 0}   words: ${text ? words(text) : 0}`);
if (warn.length) { console.log(`\n${warn.length} warning(s):`); warn.forEach((m) => console.log("  ~ " + m)); }
if (fail.length) { console.log(`\n${fail.length} FAILURE(s):`); fail.forEach((m) => console.log("  ! " + m)); process.exitCode = 1; }
else console.log("\nAll PDF checks passed.");
