import assert from "node:assert/strict";
import fs from "node:fs";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { CAPABILITIES, DEFAULT, STATES, nextState, countStates, applyPreset } = require("../assets/app.js");
const read = path => fs.readFileSync(new URL("../" + path, import.meta.url));
const home = read("index.html").toString();
const reference = read("maskability/index.html").toString();
const contract = JSON.parse(read("maskability/contract.v0.1.json").toString());
const acquire = read("acquire/index.html").toString();
const sitemap = read("sitemap.xml").toString();
const robots = read("robots.txt").toString();
const script = read("assets/app.js").toString();
const readme = read("README.md").toString();
const png = read("assets/social-card.png");
const jpeg = read("assets/social-card-v2.jpg");

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
assert.match(home, /href="\/maskability\/"/);

// A separately indexable, accurate, substantive technical reference.
assert.match(reference, /<html lang="en">/);
assert.match(reference, /rel="canonical" href="https:\/\/maskable\.si\/maskability\/"/);
assert.match(reference, /What Is Maskability\?/);
assert.match(reference, /proposed|proposal/i);
assert.match(reference, /not an industry standard/i);
assert.match(reference, /No ability to erase, hide or suppress a model/);
assert.match(reference, /not test tool interception/i);
assert.match(reference, /contract\.v0\.1\.json/);
assert.match(reference, /og:image/);
assert.ok(reference.length > 9000, "Reference must contain substantial independently usable detail");
assert.match(sitemap, /https:\/\/maskable\.si\/maskability\//);
assert.equal(contract.cases.length, 8);
assert.equal(contract.status, "independent_proposal_not_standard");
assert.doesNotMatch(reference + JSON.stringify(contract), /MaskableSI\.com/i);

// Social platform unfurling: accessible HTTPS image with explicit 1200x630 PNG metadata.
assert.match(home, /property="og:image" content="https:\/\/maskable\.si\/assets\/social-card-v2\.jpg"/);
assert.match(home, /property="og:image:url" content="https:\/\/maskable\.si\/assets\/social-card-v2\.jpg"/);
assert.match(home, /property="og:image:secure_url" content="https:\/\/maskable\.si\/assets\/social-card-v2\.jpg"/);
assert.match(home, /property="og:image:type" content="image\/jpeg"/);
assert.match(home, /property="og:image:width" content="1200"/);
assert.match(home, /property="og:image:height" content="630"/);
assert.match(home, /property="og:image:alt"/);
assert.match(home, /name="twitter:card" content="summary_large_image"/);
assert.match(home, /name="twitter:image" content="https:\/\/maskable\.si\/assets\/social-card-v2\.jpg"/);
assert.match(reference, /property="og:image" content="https:\/\/maskable\.si\/assets\/social-card-v2\.jpg"/);
assert.match(reference, /property="og:image:type" content="image\/jpeg"/);
assert.equal(png.readUInt32BE(16), 1200);
assert.equal(png.readUInt32BE(20), 630);
assert.equal(png.subarray(1, 4).toString(), "PNG");
assert.equal(jpeg.readUInt16BE(0), 0xffd8);
assert.equal(jpeg.readUInt16BE(jpeg.length - 2), 0xffd9);

// Check the on-disk JPEG dimensions from its start-of-frame segment.
function jpegDimensions(buffer) {
  let cursor = 2;
  while (cursor + 8 < buffer.length) {
    if (buffer[cursor++] !== 0xff) continue;
    while (buffer[cursor] === 0xff) cursor++;
    const marker = buffer[cursor++];
    if (marker === 0xd8 || marker === 0x01 || (marker >= 0xd0 && marker <= 0xd7)) continue;
    if (marker === 0xd9 || marker === 0xda) break;
    const length = buffer.readUInt16BE(cursor);
    if (length < 2) throw new Error("Invalid JPEG segment length");
    if ([0xc0, 0xc1, 0xc2, 0xc3].includes(marker)) {
      return { height: buffer.readUInt16BE(cursor + 3), width: buffer.readUInt16BE(cursor + 5) };
    }
    cursor += length;
  }
  throw new Error("JPEG start-of-frame not found");
}
assert.deepEqual(jpegDimensions(jpeg), { width: 1200, height: 630 });

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

console.log("PASS: 12-capability register, social JPEG metadata and dimensions, noindex acquisition, optional escrow, local-only operation");
