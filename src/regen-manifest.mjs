/* Regenerate a module's module.manifest.json from the fragments on disk.
   The manifest is a tripwire against accidental drift, so this is only correct
   when the change is deliberate: it prints what moved and lets a human read it.
   Usage: node src/regen-manifest.mjs [--module=modules/02] */
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";

const HERE = dirname(fileURLToPath(import.meta.url));
const modArg = process.argv.slice(2).find((a) => a.startsWith("--module="));
const SP = modArg ? join(HERE, modArg.slice("--module=".length)) : HERE;
const cfgPath = join(SP, "sections.json");
const CFG = existsSync(cfgPath) ? JSON.parse(readFileSync(cfgPath, "utf8")) : null;
const IDS = CFG ? CFG.sections.map((s) => s.id)
                : ["s11a","s11b","s12a","s12b","s12c","s13","s14","s15","s16"];
const OBJECTIVES = CFG ? CFG.objectives : ["1.1","1.2","1.3","1.4","1.5","1.6"];

const sb = { ACT:{}, PROSE:{}, GLOSSARY:[], FINAL:{questions:[]}, console };
vm.createContext(sb);
for (const id of [...IDS, "glossary", "final"]) {
  const p = join(SP, "frag", id + ".js");
  if (!existsSync(p)) { console.error("missing fragment:", id); process.exit(1); }
  vm.runInContext(readFileSync(p, "utf8"), sb, { filename: p });
}
const { ACT, GLOSSARY, FINAL } = sb;

const kinds = {};
for (const a of Object.values(ACT)) kinds[a.kind] = (kinds[a.kind] || 0) + 1;
const byObj = {};
for (const q of FINAL.questions) byObj[q.obj] = (byObj[q.obj] || 0) + 1;

const next = {
  sections: IDS,
  objectives: OBJECTIVES,
  activityKeys: Object.keys(ACT),
  activityKinds: Object.fromEntries(Object.entries(kinds).sort()),
  glossaryTerms: GLOSSARY.map((g) => g.t),
  finalQuestionCount: FINAL.questions.length,
  finalByObjective: Object.fromEntries(Object.entries(byObj).sort()),
};

const out = join(SP, "module.manifest.json");
if (existsSync(out)) {
  const prev = JSON.parse(readFileSync(out, "utf8"));
  console.log("manifest changes:");
  for (const k of Object.keys(next)) {
    const a = JSON.stringify(prev[k]), b = JSON.stringify(next[k]);
    if (a === b) { console.log(`  ${k}: unchanged`); continue; }
    if (Array.isArray(next[k])) {
      const added = next[k].filter((v) => !(prev[k] || []).includes(v));
      const removed = (prev[k] || []).filter((v) => !next[k].includes(v));
      console.log(`  ${k}: +${added.length} -${removed.length}${added.length ? "  added " + JSON.stringify(added.slice(0, 8)) : ""}${removed.length ? "  REMOVED " + JSON.stringify(removed) : ""}`);
    } else console.log(`  ${k}: ${a}  ->  ${b}`);
  }
} else {
  console.log("creating a new manifest:");
  console.log(`  ${next.sections.length} sections, ${next.activityKeys.length} activities, ${next.glossaryTerms.length} glossary terms, ${next.finalQuestionCount} final questions`);
}
writeFileSync(out, JSON.stringify(next, null, 2) + "\n", "utf8");
console.log("written:", out);
