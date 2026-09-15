/* Refuse to ship an archive that carries answers.
 *
 * This repository is public, and every other leak check here works on file
 * names: .gitignore rules, the reserved-term scan, the per-page contract tests.
 * A .zip defeats all of them. `hw/Week1InstructorMaterials.zip` was tracked for
 * months carrying ANSWER-KEY.md and three .sql solution files, and nothing in
 * the build noticed, because from the outside it is one opaque blob.
 *
 * So: look inside every tracked archive, and fail on an entry whose name says
 * it holds answers. Node's standard library only — this reads the zip central
 * directory directly rather than shelling out to unzip, so it runs the same on
 * CI as it does here.
 *
 * Run: node src/check-archives.mjs
 */
import { readFileSync } from "node:fs";
import { execFileSync } from "node:child_process";

const FORBIDDEN = [
  /answer[-_ ]?key/i,
  /\banswers?\b/i,
  /\bsolutions?\b/i,
  /\binstructor\b/i,
  /\bmarking\b/i,
  /\bblackboard\b/i,
  /\bgrading\b/i,
  /\brubric\b/i
];

/* The names in a zip's central directory, without unpacking anything. The
   central directory is at the end of the file; each entry starts with the
   signature below and carries its name length at a fixed offset. */
function zipEntryNames(buffer){
  const SIGNATURE = 0x02014b50;
  const names = [];
  for(let i = 0; i + 46 <= buffer.length; i++){
    if(buffer.readUInt32LE(i) !== SIGNATURE) continue;
    const nameLength = buffer.readUInt16LE(i + 28);
    const extraLength = buffer.readUInt16LE(i + 30);
    const commentLength = buffer.readUInt16LE(i + 32);
    const start = i + 46;
    if(start + nameLength > buffer.length) continue;
    names.push(buffer.toString("utf8", start, start + nameLength));
    i = start + nameLength + extraLength + commentLength - 1;
  }
  return names;
}

const tracked = execFileSync("git", ["ls-files", "-z"], { encoding: "utf8" })
  .split("\0")
  .filter(Boolean)
  .filter(path => /\.(zip|jar|tgz|tar\.gz)$/i.test(path));

let failed = false;
if(tracked.length === 0){
  console.log("No tracked archives.");
}
for(const path of tracked){
  let names;
  try{
    names = zipEntryNames(readFileSync(path));
  }catch(error){
    console.error(`Could not read ${path}: ${error.message}`);
    failed = true;
    continue;
  }
  const offending = names.filter(name => FORBIDDEN.some(pattern => pattern.test(name)));
  if(offending.length){
    failed = true;
    console.error(`\n${path} is tracked in a public repository and contains:`);
    for(const name of offending) console.error(`    ${name}`);
    console.error(`  Untrack it (git rm --cached "${path}"), ignore it, and rebuild the student`);
    console.error("  archive without the instructor material.");
  } else {
    console.log(`${path}: ${names.length} entries, none of them answers.`);
  }
}

if(failed){
  console.error("\nAn archive in this repository carries answers. Refusing to pass.");
  process.exit(1);
}
console.log("No tracked archive carries answers.");
