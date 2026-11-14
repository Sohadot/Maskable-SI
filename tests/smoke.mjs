import assert from "node:assert/strict";
import fs from "node:fs";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { CAPABILITIES, POLICIES, evaluateEnvelope, formatEnvelope } = require("../assets/app.js");
const home = fs.readFileSync(new URL("../index.html", import.meta.url), "utf8");
const acquisition = fs.readFileSync(new URL("../acquire/index.html", import.meta.url), "utf8");
const sitemap = fs.readFileSync(new URL("../sitemap.xml", import.meta.url), "utf8");
const robots = fs.readFileSync(new URL("../robots.txt", import.meta.url), "utf8");
const script = fs.readFileSync(new URL("../assets/app.js", import.meta.url), "utf8");
const readme = fs.readFileSync(new URL("../README.md", import.meta.url), "utf8");

for (const id of ["thesis", "framework", "workbench", "evidence", "capability-catalog", "policy-select", "result-text"]) {
  assert.ok(home.includes('id="' + id + '"'), "Missing home element " + id);
}
assert.match(home, /Maskable Superintelligence|Superintelligence/);
assert.match(readme, /Maskable.*Superintelligence/);
assert.doesNotMatch(home + readme + acquisition, /MaskableSI\.com/i, "Do not publicly connect the separate name");
assert.match(home, /<html lang="en">/);
assert.match(home, /rel="canonical" href="https:\/\/maskable\.si\//);
assert.match(home, /name="description"/);
assert.match(home, /AI Risk Management Framework/);
assert.match(home, /AI Security Institute|frontier-AI misuse safeguards/);
assert.match(acquisition, /noindex, follow/);
assert.doesNotMatch(sitemap, /acquire/);
assert.match(robots, /Allow: \/\s/);
assert.doesNotMatch(robots, /Disallow: \/acquire\//);
assert.doesNotMatch(script, /fetch\s*\(|XMLHttpRequest|sendBeacon|localStorage|sessionStorage/);

assert.equal(CAPABILITIES.length, 6);
assert.deepEqual(Object.keys(POLICIES).sort(), ["isolated", "research", "reviewed"]);

const research = evaluateEnvelope("research");
assert.deepEqual([research.available, research.reviewed, research.withheld], [3, 0, 3]);
assert.equal(research.decisions.find(x => x.id === "credentials").status, "WITHHELD");
const reviewed = evaluateEnvelope("reviewed");
assert.deepEqual([reviewed.available, reviewed.reviewed, reviewed.withheld], [3, 2, 1]);
assert.equal(reviewed.decisions.find(x => x.id === "act").status, "REVIEW REQUIRED");
const isolated = evaluateEnvelope("isolated");
assert.deepEqual([isolated.available, isolated.reviewed, isolated.withheld], [2, 0, 4]);
assert.equal(isolated.decisions.find(x => x.id === "retrieve").status, "WITHHELD");
assert.deepEqual(evaluateEnvelope("unknown"), research);
assert.match(formatEnvelope(research), /ILLUSTRATION ONLY/);
assert.match(formatEnvelope(isolated), /ISOLATED \/ OFFLINE/);

console.log("PASS: superintelligence positioning, domain isolation, discovery policy, no network/storage, 3 capability envelopes");
