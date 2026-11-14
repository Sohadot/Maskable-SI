import assert from "node:assert/strict";
import fs from "node:fs";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { CAPABILITIES, DEFAULT, STATES, nextState, countStates, applyPreset } = require("../assets/app.js");
const read = path => fs.readFileSync(new URL("../" + path, import.meta.url));
const home = read("index.html").toString();
const acquire = read("acquire/index.html").toString();
const sitemap = read("sitemap.xml").toString();
const robots = read("robots.txt").toString();
const script = read("assets/app.js").toString();
const readme = read("README.md").toString();
const png = read("assets/social-card.png");

for (const id of ["register", "capability-grid", "thesis", "model", "levels", "evidence", "preset-mask", "preset-scoped", "preset-reset"]) {
  assert.ok(home.includes('id="' + id + '"'), "Missing element " + id);
}
assert.match(home, /Possession is/);
assert.match(home, /not permission/);
assert.match(home, /Superintelligence/);
assert.match(home, /Grant\. Enforce\. Verify\./);
assert.match(home, /Maskability levels/);
assert.match(home, /A proposed control principle|proposed capability-governance concept|proposed vocabulary/i);
assert.doesNotMatch(home + readme + acquire, /MaskableSI\.com/i);
assert.match(home, /rel="canonical" href="https:\/\/maskable\.si\//);
assert.match(home, /name="description"/);
assert.match(home, /<html lang="en">/);

// Social platform unfurling: accessible HTTPS image with explicit 1200x630 PNG metadata.
assert.match(home, /property="og:image" content="https:\/\/maskable\.si\/assets\/social-card\.png"/);
assert.match(home, /property="og:image:type" content="image\/png"/);
assert.match(home, /property="og:image:width" content="1200"/);
assert.match(home, /property="og:image:height" content="630"/);
assert.match(home, /property="og:image:alt"/);
assert.match(home, /name="twitter:card" content="summary_large_image"/);
assert.match(home, /name="twitter:image" content="https:\/\/maskable\.si\/assets\/social-card\.png"/);
assert.equal(png.readUInt32BE(16), 1200);
assert.equal(png.readUInt32BE(20), 630);
assert.equal(png.subarray(1, 4).toString(), "PNG");

// Acquisition remains informational and not indexed; escrow is strictly optional.
assert.match(acquire, /noindex, follow/);
assert.match(acquire, /escrow provider/i);
assert.match(acquire, /mutually agreed/i);
assert.match(acquire, /escrow\.com\/domains\/how-it-works/);
assert.match(acquire, /No escrow transaction has been initiated/);
assert.doesNotMatch(sitemap, /acquire/);
assert.match(robots, /Allow: \/\s/);
assert.doesNotMatch(robots, /Disallow: \/acquire\//);

// Transparent, fully local UI simulation with no telemetry or real actuation.
assert.equal(CAPABILITIES.length, 12);
assert.equal(new Set(CAPABILITIES.map(x => x.id)).size, 12);
assert.deepEqual(STATES, ["masked", "review", "exposed"]);
assert.equal(nextState("masked"), "review");
assert.equal(nextState("review"), "exposed");
assert.equal(nextState("exposed"), "masked");
assert.deepEqual(countStates(DEFAULT), { masked: 7, review: 3, exposed: 2 });
assert.deepEqual(countStates(applyPreset("mask")), { masked: 12, review: 0, exposed: 0 });
assert.deepEqual(countStates(applyPreset("scoped")), { masked: 8, review: 3, exposed: 1 });
assert.deepEqual(applyPreset("reset"), DEFAULT);
assert.equal(Object.keys(applyPreset("reset")).length, 12);
assert.doesNotMatch(script, /fetch\s*\(|XMLHttpRequest|sendBeacon|localStorage|sessionStorage/);

console.log("PASS: 12-capability register, social PNG metadata, noindex acquisition, optional escrow, local-only operation");
