import assert from "node:assert/strict";
import fs from "node:fs";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { processText, EXAMPLE } = require("../assets/app.js");
const home = fs.readFileSync(new URL("../index.html", import.meta.url), "utf8");
const acquisition = fs.readFileSync(new URL("../acquire/index.html", import.meta.url), "utf8");
const sitemap = fs.readFileSync(new URL("../sitemap.xml", import.meta.url), "utf8");
const robots = fs.readFileSync(new URL("../robots.txt", import.meta.url), "utf8");
const script = fs.readFileSync(new URL("../assets/app.js", import.meta.url), "utf8");

for (const id of ["thesis", "framework", "workbench", "evidence", "source-text", "policy-select", "result-text"]) {
  assert.ok(home.includes('id="' + id + '"'), "Missing home element " + id);
}
assert.match(home, /<html lang="en">/);
assert.match(home, /rel="canonical" href="https:\/\/maskable\.si\//);
assert.match(home, /name="description"/);
assert.match(home, /NIST SP 800-188|De-Identifying Government Datasets/);
assert.match(acquisition, /noindex, follow/);
assert.doesNotMatch(sitemap, /acquire/);
assert.match(robots, /Allow: \/\s/);
assert.doesNotMatch(robots, /Disallow: \/acquire\//); // Crawlers must see the noindex directive.
assert.doesNotMatch(script, /fetch\s*\(|XMLHttpRequest|sendBeacon|localStorage|sessionStorage/);

const balanced = processText(EXAMPLE, "balanced");
assert.equal(balanced.detected, 4);
assert.equal(balanced.masked, 3);
assert.ok(balanced.output.includes("[SECRET]"));
assert.ok(balanced.output.includes("[EMAIL]"));
assert.ok(balanced.output.includes("[PHONE]"));
assert.ok(balanced.output.includes("192.0.2.18"));
assert.ok(!balanced.output.includes("maya.chen@example.com"));
const strict = processText(EXAMPLE, "strict");
assert.equal(strict.detected, 4);
assert.equal(strict.masked, 4);
assert.ok(strict.output.includes("[IP]"));
const minimal = processText(EXAMPLE, "minimal");
assert.equal(minimal.masked, 1);
assert.ok(minimal.output.includes("maya.chen@example.com"));
assert.equal(processText("hello world", "strict").detected, 0);
assert.equal(processText("hello world", "strict").output, "hello world");
assert.equal(processText("", "strict").output, "");
assert.equal(processText("api_key=sk_demo_12345", "strict").output, "[SECRET]");
console.log("PASS: landing structure, discovery policy, no network/storage behavior, and 3 masking policies");
