/* Builds the printable study companion from the page's JavaScript-free layer:
   the complete lesson, every activity's answer summary, the full vocabulary,
   and the final-challenge key. Interactive widgets have nothing to contribute
   on paper, so the scripts are stripped and the static content is printed. */
import { readFileSync, writeFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const SRC = process.argv[2];
const OUT = process.argv[3];

const raw = readFileSync(SRC);
/* Stamp the print source with a short digest of the page it was made from, so the printed
   companion can be tied back to one exact build. check-pdf.mjs recomputes it and refuses a
   PDF printed from a different page, which is the only tripwire that catches a stale PDF
   after a prose-only edit. */
const EDITION = createHash("sha256").update(raw).digest("hex").slice(0, 12);
let s = raw.toString("utf8");
s = s.replace(/<script\b[\s\S]*?<\/script>/g, "");
s = s.replace(/<noscript>[\s\S]*?<\/noscript>/g, "");

/* Print typography: the screen page is a two-column app; on paper it is a
   document. Force the light palette, drop the chrome, and let the content run. */
const printCss = `
<style>
:root{color-scheme:light}
html[data-theme="dark"]{color-scheme:light}
.topbar,.sidebar,.act-foot,.icon-btn,.skip,.section-reset,.gloss-tools{display:none !important}
.shell{display:block !important; max-width:none; padding:0 22px}
body{background:#fff; font-size:10.5pt; line-height:1.5}
h1{font-size:24pt} h2{font-size:16pt} h3{font-size:12pt} h4{font-size:11pt}
.chapter{break-before:page; padding-top:6pt}
.chapter:first-of-type{break-before:auto}
/* These transitions previously stranded a few lines on otherwise empty pages.
   Let the next major section use that remaining space before continuing. */
#s14,#glossary,#final{break-before:auto}
.card,.callout,.activity,.tbl-wrap,.hero,.gloss-card,.q{box-shadow:none}
/* Tall blocks must be allowed to split across pages, or a card that is 60% of a
   page height pushes itself to the next one and leaves the rest of the current
   page blank. Keep the small units atomic instead: a list item, a question, a
   glossary entry, and a table row each stay whole. */
.card,.activity,.tbl-wrap,.hero{break-inside:auto}
.callout,.gloss-card,.char,.dc-box,.obj,.sim-entry{break-inside:avoid}
.activity li,.activity .q,.activity p,.card li,table.tbl tr{break-inside:avoid}
ul.keys > li,ol.steps > li,ul.split > li,p.takeaway{break-inside:avoid}
.code-task{break-inside:avoid}
.code-test{break-inside:avoid; background:#f7f3ea}
textarea.code-editor{background:#fff; min-height:auto}
.code-entry{background:#fff; border:1px solid #c9bda6}
.sql-table{background:#f7f3ea}
.sql-table[open] summary{margin-bottom:6px}
.sql-table summary{list-style:none}
ul.keys > li{background:#f7f3ea; border-left-color:#17506f}
ol.steps > li::before{background:#17506f}
h1,h2,h3,h4,h5,.act-head,.eyebrow{break-after:avoid}
.act-head+.act-how,.act-how+.act-body{break-before:avoid}
.activity{border:1px solid #c9bda6; background:#faf7f1; margin:14pt 0}
.act-kind{background:#17506f}
.act-body p.mini{color:#6b6153}
#final .act-body>p{margin-bottom:.55em}
#final .act-body>ul{margin-bottom:.8em}
#final .act-body>ul>li{margin:.28em 0}
.gloss-list{display:grid; grid-template-columns:1fr 1fr; gap:8pt}
.gloss-card{break-inside:avoid; background:#f7f3ea}
.obj-grid{grid-template-columns:1fr 1fr}
.grid.g4,.grid.g3{grid-template-columns:1fr 1fr}
a{color:#17506f; text-decoration:none}
.module-foot{break-inside:avoid}
.print-edition{break-before:avoid; margin:6pt 0 0; font-size:7.5pt; color:#6b6153; letter-spacing:.04em}
@page{size:letter; margin:15mm 14mm 16mm}
</style>`;
s = s.replace("</head>", printCss + "\n</head>");
s = s.replace("</main>", `  <p class="print-edition">Print edition ${EDITION}</p>\n  </main>`);
writeFileSync(OUT, s, "utf8");
console.log("print source written:", OUT, s.length, "bytes");
