/* Assembles the single self-contained module page from:
   - module.css                the design system
   - engine.js                 the activity runtime
   - shell.json                hero, glossary and final section prose
   - frag/<id>.js              per-section prose + activity data (authored separately)
   Output is one HTML file that works with JavaScript on (full interactivity)
   and with JavaScript off (a complete lesson plus every answer, so the page is
   also printable and study-able offline). */
import { readFileSync, writeFileSync, existsSync, renameSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";

const HERE = dirname(fileURLToPath(import.meta.url));
const SP = HERE;
const OUT = process.argv[2] || join(HERE, "..", "module-01-managing-in-the-digital-world.html");

const SECTIONS = [
  { id: "s11a", title: "The digital world" },
  { id: "s11b", title: "Digital density" },
  { id: "s12a", title: "What an information system is" },
  { id: "s12b", title: "The people in information systems" },
  { id: "s12c", title: "Systems inside an organization" },
  { id: "s13",  title: "When systems succeed and fail" },
  { id: "s14",  title: "Ethics, privacy, and property" },
  { id: "s15",  title: "Strategy: forces and value" },
];
let problems = 0;

/* ---------------------------------------------------------------- load data */
const sandbox = { ACT: {}, PROSE: {}, GLOSSARY: [], FINAL: { questions: [] }, console };
vm.createContext(sandbox);

for (const s of SECTIONS) {
  const p = join(SP, "frag", s.id + ".js");
  if (!existsSync(p)) { console.warn("MISSING fragment:", p); problems++; continue; }
  vm.runInContext(readFileSync(p, "utf8"), sandbox, { filename: p });
}
for (const extra of ["glossary", "final"]) {
  const p = join(SP, "frag", extra + ".js");
  if (!existsSync(p)) { console.warn("MISSING fragment:", p); problems++; continue; }
  vm.runInContext(readFileSync(p, "utf8"), sandbox, { filename: p });
}
const { ACT, PROSE, GLOSSARY, FINAL } = sandbox;

/* ------------------------------------------------------------ static output */
const esc = (s) => String(s == null ? "" : s);
const L = ["A", "B", "C", "D", "E", "F", "G", "H"];
const whyText = (s) => String(s == null ? "" : s).replace(/^\s*(?:<b>)?\s*(?:That is )?correct[.!:,]?(?:<\/b>)?\s*(?:&mdash;|-|\u2014)?\s*/i, "");

function fallback(key, a) {
  const parts = [];
  const K = a.kind;
  if (K === "quiz") {
    (a.questions || []).forEach((q, i) => {
      parts.push(`<p><b>${i + 1}.</b> ${esc(q.q)}</p><ul>` +
        q.opts.map((o, oi) =>
          `<li><b>${L[oi]}.</b> ${esc(o)}${oi === q.a ? " <b>&mdash; correct.</b> " : " &mdash; "}${oi === q.a ? whyText((q.why || [])[oi]) : esc((q.why || [])[oi])}</li>`
        ).join("") + `</ul>`);
    });
  } else if (K === "sort") {
    (a.buckets || []).forEach((b) => {
      parts.push(`<p><b>${esc(b.name)}</b>${b.hint ? ` &mdash; ${esc(b.hint)}` : ""}</p><ul>` +
        (a.items || []).filter((it) => it.b === b.id)
          .map((it) => `<li>${esc(it.t)} &mdash; ${esc(it.why)}</li>`).join("") + `</ul>`);
    });
  } else if (K === "match") {
    parts.push(`<dl>` + (a.pairs || []).map((p) =>
      `<dt><b>${esc(p.l)}</b></dt><dd>${esc(p.r)}${p.why ? ` <span class="mini">${esc(p.why)}</span>` : ""}</dd>`).join("") + `</dl>`);
  } else if (K === "order") {
    if (a.intro) parts.push(`<p>${esc(a.intro)}</p>`);
    parts.push(`<ol>` + (a.steps || []).map((s) =>
      `<li><b>${esc(s.t)}</b> &mdash; ${esc(s.why)}</li>`).join("") + `</ol>`);
  } else if (K === "fill") {
    parts.push(`<ul>` + (a.blanks || []).map((b) =>
      `<li>${esc(b.before)}<b>${esc(b.choices[b.a])}</b>${esc(b.after)} <span class="mini">${esc(b.why)}</span></li>`).join("") + `</ul>`);
  } else if (K === "explore") {
    const lab = a.labels || [];
    (a.items || []).forEach((it) => {
      parts.push(`<p><b>${esc(it.name)}</b>${it.sub ? ` &middot; ${esc(it.sub)}` : ""}</p><ul>` +
        [["what", 0], ["real", 1], ["absent", 2], ["why", 3]]
          .filter(([k]) => it[k] != null)
          .map(([k, i]) => `<li><b>${esc(lab[i])}:</b> ${esc(it[k])}</li>`).join("") + `</ul>`);
    });
  } else if (K === "diagram") {
    (a.models || []).forEach((m) => {
      parts.push(`<p><b>${esc(m.name)}</b>${m.site ? ` &mdash; ${esc(m.site)}` : ""}</p>` +
        `<p class="mini">${(m.boxes || []).map((b) => `${esc(b.t)}${b.w ? ` (${esc(b.w)})` : ""}`).join(" &rarr; ")}</p>` +
        `<ul>` + (m.points || []).map((p) => `<li>${esc(p)}</li>`).join("") + `</ul>`);
    });
  } else if (K === "sim") {
    if (a.intro) parts.push(`<p>${esc(a.intro)}</p>`);
    (a.steps || []).forEach((s, i) => {
      const best = (s.opts || []).find((o) => o.ok);
      parts.push(`<p><b>Decision ${i + 1}.</b> ${esc(s.situation)}</p><ul>` +
        (s.opts || []).map((o) => `<li>${esc(o.t)}${o.ok ? " <b>&mdash; the stronger call.</b> " : " &mdash; "}${esc(o.out)}</li>`).join("") + `</ul>`);
    });
  } else if (K === "selfcheck") {
    parts.push(`<ul>` + (a.items || []).map((it) =>
      `<li>${esc(it.t)} <span class="mini">${esc(it.hint)}</span></li>`).join("") + `</ul>`);
  }
  return `<div class="act-head"><span class="act-kind">${esc(a.label || "Activity")}</span>` +
    `<h4 class="act-title" id="act-${key}">${esc(a.title || "")}</h4></div>` +
    (a.how ? `<p class="act-how">${esc(a.how)}</p>` : "") +
    `<div class="act-body"><p class="mini"><b>Lesson and answer summary</b> &mdash; the interactive version of this ` +
    `activity loads when scripting is available.</p>${parts.join("")}</div>`;
}

/* Replace every mount in the prose with the mount plus its static fallback. */
function inflate(html) {
  const seen = [];
  const out = html.replace(/<div\b([^>]*)>\s*<\/div>/gi, (m, attrs) => {
    const classMatch = attrs.match(/\bclass\s*=\s*(["'])(.*?)\1/i);
    const classes = classMatch ? classMatch[2].trim().split(/\s+/) : [];
    if (!classes.includes("activity")) return m;
    const keyMatch = attrs.match(/\bdata-activity\s*=\s*(["'])([A-Za-z0-9_]+)\1/i);
    if (!keyMatch) { console.warn("  ! activity mount has no valid data-activity key:", m); problems++; return m; }
    const key = keyMatch[2];
    seen.push(key);
    const a = ACT[key];
    if (!a) { console.warn("  ! mount with no activity data:", key); problems++; return m; }
    return `<section class="activity" data-activity="${key}" aria-labelledby="act-${key}">${fallback(key, a)}</section>`;
  });
  return { html: out, seen };
}

/* ------------------------------------------------------------- consistency */
const mounted = new Set();
const bodies = [];
for (const s of SECTIONS) {
  const raw = PROSE[s.id];
  if (!raw) { console.warn("MISSING prose:", s.id); problems++; continue; }
  const { html, seen } = inflate(raw);
  seen.forEach((k) => {
    if (mounted.has(k)) { console.warn("  ! duplicate mount:", k); problems++; }
    mounted.add(k);
  });
  bodies.push({ id: s.id, title: s.title, html });
}
for (const k of Object.keys(ACT)) {
  if (!mounted.has(k)) { console.warn("  ! activity never mounted:", k); problems++; }
}
if (problems) {
  console.error(`build stopped: ${problems} structural problem${problems === 1 ? "" : "s"}; existing output was not changed`);
  process.exit(1);
}

/* --------------------------------------------------------------- assemble */
const css = readFileSync(join(HERE, "module.css"), "utf8");
const engine = readFileSync(join(HERE, "engine.js"), "utf8");
const shell = JSON.parse(readFileSync(join(HERE, "shell.json"), "utf8"));

const jsonSafe = (o) => JSON.stringify(o).replace(/</g, "\\u003c").replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029");

const sectionHtml = bodies.map((b) =>
  `    <section class="chapter" id="${b.id}" data-title="${esc(b.title)}">\n${b.html}\n` +
  `      <p class="section-reset"><button type="button" class="act-reset" data-reset-section="${b.id}">Clear this section and start it over</button></p>\n` +
  `    </section>`).join("\n\n");

const glossaryFallback = `<div class="gloss-list">` + GLOSSARY.map((g) =>
  `<dl class="gloss-card"><dt><span class="gloss-lo">${esc(g.lo)}</span>${esc(g.t)}</dt>` +
  `<dd>${esc(g.d)}${g.e ? `<span class="gloss-ex"><b>For example:</b> ${esc(g.e)}</span>` : ""}</dd></dl>`).join("") + `</div>`;

const finalFallback = `<div class="act-head"><span class="act-kind">Final challenge</span>` +
  `<h4 class="act-title" id="act-final">${esc(FINAL.title || "Final challenge")}</h4></div>` +
  `<div class="act-body"><p class="mini"><b>Answer key</b> &mdash; the interactive, self-scoring version loads when scripting is available.</p>` +
  (FINAL.questions || []).map((q, i) =>
    `<p><b>${i + 1}.</b> <span class="pill">${esc(q.obj)}</span> ${esc(q.q)}</p><ul>` +
    q.opts.map((o, oi) => `<li><b>${L[oi]}.</b> ${esc(o)}${oi === q.a ? " <b>&mdash; correct.</b> " : " &mdash; "}${oi === q.a ? whyText((q.why || [])[oi]) : esc((q.why || [])[oi])}</li>`).join("") +
    `</ul>`).join("") + `</div>`;

const page = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${shell.title}</title>
<meta name="description" content="${shell.description}">
<script>
(function(){"use strict";document.documentElement.classList.add("js");try{if(localStorage.getItem("mis-ch1-theme-v1")==="dark"){document.documentElement.setAttribute("data-theme","dark");}}catch(e){}})();
<\/script>
<style>
${css}
</style>
</head>
<body>
<a class="skip" href="#main">Skip to main content</a>
<noscript><p class="no-script"><b>The interactive activities need JavaScript.</b> The complete lesson, every activity summary, and every answer are printed below, so the page is still fully usable for reading and printing.</p></noscript>

<header class="topbar">
  <div class="topbar-inner">
    <div class="brand">
      <div class="brand-mark" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="2" y="4" width="20" height="13" rx="2"/><path d="M8 21h8M12 17v4"/><path d="M6 9h5M6 12.5h8"/>
        </svg>
      </div>
      <div class="brand-text">
        <b>${shell.brand}</b>
        <span>${shell.brandSub}</span>
      </div>
    </div>
    <div class="topbar-spacer"></div>
    <div class="progress-wrap">
      <progress class="progress-meter" id="moduleProgress" max="100" value="0" aria-label="Module completion progress" aria-describedby="progressLabel">0%</progress>
      <span class="progress-label" id="progressLabel">0 of 0 complete</span>
    </div>
    <button type="button" class="icon-btn menu-btn" id="menuBtn" aria-expanded="false" aria-controls="sidebar">Contents</button>
    <button type="button" class="icon-btn" id="themeBtn" aria-label="Switch to the dark theme">Dark</button>
    <button type="button" class="icon-btn" id="resetBtn" title="Clear every answer and start over">Reset</button>
  </div>
</header>

<div class="shell">
  <nav class="sidebar" id="sidebar" aria-label="Module contents">
    <p class="side-title">Module contents</p>
    <div id="navList"></div>
    <div class="side-foot">
      Your progress is saved in this browser only &mdash; nothing is submitted or sent anywhere. Answers clear when you reload, and you can restart any activity, any section, or the whole page at any time.
    </div>
  </nav>

  <main id="main" tabindex="-1">
${shell.hero}

${sectionHtml}

    <section class="chapter" id="glossary" data-title="Chapter vocabulary">
${shell.glossaryIntro}
      <div id="glossaryMount">${glossaryFallback}</div>
    </section>

    <section class="chapter" id="final" data-title="Final challenge">
${shell.finalIntro}
      <section class="activity" id="finalMount" aria-labelledby="act-final">${finalFallback}</section>
    </section>

    <div class="module-foot">
${shell.foot}
    </div>
  </main>
</div>

<script>
window.MIS_ACT = ${jsonSafe(ACT)};
window.MIS_GLOSSARY = ${jsonSafe(GLOSSARY)};
window.MIS_FINAL = ${jsonSafe(FINAL)};
<\/script>
<script>
${engine}
<\/script>
</body>
</html>
`;

const tempOut = OUT.replace(/\.html$/i, "") + `.${process.pid}.tmp.html`;
writeFileSync(tempOut, page, "utf8");
renameSync(tempOut, OUT);
const actCount = Object.keys(ACT).length;
console.log(`built ${OUT}`);
console.log(`  sections: ${bodies.length}/${SECTIONS.length}   activities: ${actCount}   glossary: ${GLOSSARY.length}   final: ${(FINAL.questions||[]).length}`);
console.log(`  bytes: ${page.length}   warnings: 0`);
