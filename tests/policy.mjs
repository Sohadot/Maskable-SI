import assert from "node:assert/strict";
import fs from "node:fs";
import { evaluate } from "../examples/reference-policy.mjs";

const contract = JSON.parse(fs.readFileSync(new URL("../maskability/contract.v0.1.json", import.meta.url), "utf8"));

assert.equal(contract.status, "independent_proposal_not_standard");
assert.equal(contract.cases.length, 8);
assert.equal(new Set(contract.cases.map(item => item.id)).size, contract.cases.length);

for (const fixture of contract.cases) {
  assert.deepEqual(evaluate(fixture.request, fixture.policy, fixture.trustedContext), fixture.expected, fixture.id);
}

const base = contract.cases.find(item => item.id === "MSI-02");
assert.deepEqual(evaluate(base.request, { grants: [base.policy.grants[0], base.policy.grants[0]] }, base.trustedContext), { decision: "DENY", reason: "AMBIGUOUS_GRANT" });
assert.deepEqual(evaluate(base.request, base.policy, {}), { decision: "DENY", reason: "INVALID_CONTEXT" });
assert.deepEqual(evaluate(base.request, {}, base.trustedContext), { decision: "DENY", reason: "INVALID_POLICY" });

console.log("PASS: 8 published reference cases plus ambiguity and invalid-input defenses; illustrative only");
