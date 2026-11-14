/**
 * Maskability v0.1 — minimal, deterministic decision example.
 *
 * This function evaluates objects in memory. It does not authenticate actors,
 * intercept tool calls, validate approval signatures, revoke running sessions,
 * generate durable audit events, or enforce policy in a real AI deployment.
 * Never put this illustrative function in a security boundary as-is.
 */

const stringPresent = value => typeof value === "string" && value.length > 0;

export function evaluate(request, policy, trustedContext) {
  const deny = reason => ({ decision: "DENY", reason });

  if (
    !request ||
    !["actor", "capability", "operation", "resource", "scope"].every(key => stringPresent(request[key])) ||
    !Number.isInteger(request.delegationDepth) ||
    request.delegationDepth < 0
  ) return deny("INVALID_REQUEST");

  if (!policy || !Array.isArray(policy.grants)) return deny("INVALID_POLICY");
  if (!trustedContext || !Number.isFinite(trustedContext.now)) return deny("INVALID_CONTEXT");

  const matches = policy.grants.filter(grant =>
    grant &&
    stringPresent(grant.id) &&
    grant.actor === request.actor &&
    grant.capability === request.capability &&
    grant.operation === request.operation &&
    grant.resource === request.resource &&
    grant.scope === request.scope &&
    Number.isFinite(grant.expiresAt) &&
    Number.isInteger(grant.maxDelegationDepth) &&
    grant.maxDelegationDepth >= 0 &&
    typeof grant.requiresApproval === "boolean"
  );

  if (matches.length === 0) return deny("NO_MATCHING_GRANT");
  // Ambiguous overlapping grants should not silently expand authority.
  if (matches.length !== 1) return deny("AMBIGUOUS_GRANT");

  const grant = matches[0];
  if (trustedContext.now >= grant.expiresAt) return deny("EXPIRED_GRANT");
  if (request.delegationDepth > grant.maxDelegationDepth) return deny("DELEGATION_EXCEEDED");

  if (grant.requiresApproval && !(
    Array.isArray(trustedContext.verifiedApprovals) &&
    trustedContext.verifiedApprovals.includes(grant.id)
  )) return { decision: "REVIEW", reason: "VERIFIED_APPROVAL_REQUIRED" };

  return { decision: "ALLOW", reason: "MATCHING_GRANT" };
}
