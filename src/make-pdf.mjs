/* Builds the printable study companion from the page's JavaScript-free layer:
   the complete lesson, every activity's answer summary, the full vocabulary,
   and the final-challenge key. Interactive widgets have nothing to contribute
   on paper, so the scripts are stripped and the static content is printed. */
import { readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const SRC = process.argv[2];
const OUT = process.argv[3];

let s = readFileSync(SRC, "utf8");
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
.card,.callout,.activity,.tbl-wrap,.hero,.gloss-card,.q{box-shadow:none}
/* Tall blocks must be allowed to split across pages, or a card that is 60% of a
   page height pushes itself to the next one and leaves the rest of the current
   page blank. Keep the small units atomic instead: a list item, a question, a
   glossary entry, and a table row each stay whole. */
.card,.activity,.tbl-wrap,.hero{break-inside:auto}
.callout,.gloss-card,.char,.dc-box,.obj,.sim-entry{break-inside:avoid}
.activity li,.activity .q,.activity p,.card li,table.tbl tr{break-inside:avoid}
ul.keys > li,ol.steps > li,ul.split > li,p.takeaway{break-inside:avoid}
ul.keys > li{background:#f7f3ea; border-left-color:#17506f}
ol.steps > li::before{background:#17506f}
h1,h2,h3,h4,h5,.act-head,.eyebrow{break-after:avoid}
.act-head+.act-how,.act-how+.act-body{break-before:avoid}
.activity{border:1px solid #c9bda6; background:#faf7f1; margin:14pt 0}
.act-kind{background:#17506f}
.act-body p.mini{color:#6b6153}
.gloss-list{display:grid; grid-template-columns:1fr 1fr; gap:8pt}
.gloss-card{break-inside:avoid; background:#f7f3ea}
.obj-grid{grid-template-columns:1fr 1fr}
.grid.g4,.grid.g3{grid-template-columns:1fr 1fr}
a{color:#17506f; text-decoration:none}
.module-foot{break-inside:avoid}
@page{size:letter; margin:15mm 14mm 16mm}
</style>`;
s = s.replace("</head>", printCss + "\n</head>");
writeFileSync(OUT, s, "utf8");
console.log("print source written:", OUT, s.length, "bytes");
