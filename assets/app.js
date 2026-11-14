/*
 * Maskable Superintelligence: interactive capability-envelope concept.
 * Purely illustrative policy mapping; no AI model, security enforcement,
 * external calls, data collection or persistence.
 */
(function () {
  "use strict";
  const CAPABILITIES = [
    { id: "reason", label: "Analytical reasoning" },
    { id: "retrieve", label: "Public information retrieval" },
    { id: "compute", label: "Sandboxed computation" },
    { id: "act", label: "External system actions" },
    { id: "credentials", label: "Credential access" },
    { id: "delegate", label: "Autonomous delegation" }
  ];

  const POLICIES = {
    research: {
      title: "RESEARCH / SCOPED",
      allow: ["reason", "retrieve", "compute"],
      review: [],
      help: "Scoped research offers analysis, public retrieval and sandboxed computation; higher-impact actions remain withheld."
    },
    reviewed: {
      title: "OPERATIONS / HUMAN REVIEW",
      allow: ["reason", "retrieve", "compute"],
      review: ["act", "delegate"],
      help: "Reviewed operations put external actions and delegation behind hypothetical explicit human approval; credentials remain withheld."
    },
    isolated: {
      title: "ISOLATED / OFFLINE",
      allow: ["reason", "compute"],
      review: [],
      help: "Isolated analysis grants reasoning and sandboxed computation only. External access, privileged actions and delegation are withheld."
    }
  };

  function evaluateEnvelope(policyName = "research") {
    const policy = POLICIES[policyName] || POLICIES.research;
    const decisions = CAPABILITIES.map((capability) => ({
      ...capability,
      status: policy.allow.includes(capability.id)
        ? "AVAILABLE"
        : policy.review.includes(capability.id)
          ? "REVIEW REQUIRED"
          : "WITHHELD"
    }));
    return {
      title: policy.title,
      decisions,
      withheld: decisions.filter(item => item.status === "WITHHELD").length,
      reviewed: decisions.filter(item => item.status === "REVIEW REQUIRED").length,
      available: decisions.filter(item => item.status === "AVAILABLE").length
    };
  }

  function formatEnvelope(envelope) {
    return [
      "CAPABILITY ENVELOPE",
      envelope.title,
      "────────────────────────────────",
      ...envelope.decisions.map((item) => {
        const pad = " ".repeat(Math.max(1, 30 - item.label.length));
        return item.label + pad + item.status;
      }),
      "────────────────────────────────",
      "ILLUSTRATION ONLY · NO ENFORCEMENT"
    ].join("\n");
  }

  function setup() {
    const chooser = document.getElementById("policy-select");
    const output = document.getElementById("result-text");
    const help = document.getElementById("policy-help");
    const count = document.getElementById("detected-count");
    const withheld = document.getElementById("masked-count");
    const reset = document.getElementById("load-sample");
    const copy = document.getElementById("copy-output");
    if (!chooser || !output || !help || !count || !withheld || !reset || !copy) return;

    function render() {
      const envelope = evaluateEnvelope(chooser.value);
      output.textContent = formatEnvelope(envelope);
      help.textContent = (POLICIES[chooser.value] || POLICIES.research).help;
      count.textContent = String(envelope.decisions.length);
      withheld.textContent = String(envelope.withheld);
      copy.textContent = "Copy envelope ↗";
    }
    chooser.addEventListener("change", render);
    reset.addEventListener("click", () => {
      chooser.value = "research";
      render();
      chooser.focus();
    });
    copy.addEventListener("click", async () => {
      if (!navigator.clipboard?.writeText) {
        copy.textContent = "Clipboard unavailable";
        return;
      }
      try {
        await navigator.clipboard.writeText(output.textContent);
        copy.textContent = "Copied ✓";
      } catch {
        copy.textContent = "Copy unavailable";
      }
    });
    render();
  }

  if (typeof module !== "undefined" && module.exports) {
    module.exports = { CAPABILITIES, POLICIES, evaluateEnvelope, formatEnvelope };
  }
  if (typeof document !== "undefined") {
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", setup);
    else setup();
  }
})();
