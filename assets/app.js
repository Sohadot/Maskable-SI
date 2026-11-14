/*
 * Educational browser-only pattern masker.
 * Deliberately NOT a production DLP engine or anonymisation system.
 * No input persistence, telemetry, network calls or external dependencies.
 */
(function () {
  "use strict";

  const EXAMPLE = [
    "Case: CX-2841",
    "Account: Orion Labs",
    "Contact: maya.chen@example.com",
    "Phone: +1 202-555-0184",
    "Host: 192.0.2.18",
    "api_key=sk_demo_48Xa777",
    "Request: Summarize the case without disclosing contact details."
  ].join("\n");

  const TYPES = [
    { type: "SECRET", pattern: /\b(?:api[_-]?key|access[_-]?token|secret|password)\s*[:=]\s*["']?[\w.-]{5,}["']?/gi },
    { type: "EMAIL", pattern: /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/gi },
    { type: "PHONE", pattern: /(?:\+?\d[\d ()-]{8,}\d)/g },
    { type: "IP", pattern: /\b(?:\d{1,3}\.){3}\d{1,3}\b/g }
  ];
  const POLICIES = {
    balanced: {
      mask: ["SECRET", "EMAIL", "PHONE"],
      help: "Balanced mode masks sample emails, phone numbers and credential assignments. IP addresses are preserved."
    },
    strict: {
      mask: ["SECRET", "EMAIL", "PHONE", "IP"],
      help: "Restricted mode masks all four types of recognized text patterns in this small demonstration."
    },
    minimal: {
      mask: ["SECRET"],
      help: "Credentials-only mode leaves contact details and IP addresses visible. It is intentionally unsuitable for privacy protection."
    }
  };

  function processText(source, policyName = "balanced") {
    const input = String(source);
    const policy = POLICIES[policyName] || POLICIES.balanced;
    const matches = [];
    // All matching is against the original input; no placeholder can be rescanned.
    TYPES.forEach(({ type, pattern }) => {
      const scanner = new RegExp(pattern.source, pattern.flags);
      let match;
      while ((match = scanner.exec(input)) !== null) {
        matches.push({ type, start: match.index, end: match.index + match[0].length });
        if (match[0].length === 0) scanner.lastIndex += 1;
      }
    });

    // Longer matches take precedence at identical positions (e.g. credentials).
    matches.sort((a, b) => a.start - b.start || b.end - a.end);
    const distinct = [];
    let latestEnd = 0;
    for (const match of matches) {
      if (match.start >= latestEnd) {
        distinct.push(match);
        latestEnd = match.end;
      }
    }

    let cursor = 0;
    let output = "";
    let masked = 0;
    for (const match of distinct) {
      output += input.slice(cursor, match.start);
      if (policy.mask.includes(match.type)) {
        output += "[" + match.type + "]";
        masked += 1;
      } else {
        output += input.slice(match.start, match.end);
      }
      cursor = match.end;
    }
    output += input.slice(cursor);
    return { output, detected: distinct.length, masked };
  }

  function setupWorkbench() {
    const source = document.getElementById("source-text");
    const result = document.getElementById("result-text");
    const chooser = document.getElementById("policy-select");
    const info = document.getElementById("policy-help");
    const detected = document.getElementById("detected-count");
    const masked = document.getElementById("masked-count");
    const reset = document.getElementById("load-sample");
    const copy = document.getElementById("copy-output");
    if (!source || !result || !chooser || !info || !detected || !masked || !reset || !copy) return;

    function render() {
      const policy = POLICIES[chooser.value] || POLICIES.balanced;
      const sample = processText(source.value, chooser.value);
      result.textContent = sample.output;
      detected.textContent = String(sample.detected);
      masked.textContent = String(sample.masked);
      info.textContent = policy.help;
      copy.textContent = "Copy output ↗";
    }
    source.addEventListener("input", render);
    chooser.addEventListener("change", render);
    reset.addEventListener("click", () => {
      source.value = EXAMPLE;
      chooser.value = "balanced";
      render();
      source.focus();
    });
    copy.addEventListener("click", async () => {
      if (!navigator.clipboard || !navigator.clipboard.writeText) {
        copy.textContent = "Clipboard unavailable";
        return;
      }
      try {
        await navigator.clipboard.writeText(result.textContent);
        copy.textContent = "Copied ✓";
      } catch {
        copy.textContent = "Copy unavailable";
      }
    });
    render();
  }

  if (typeof module !== "undefined" && module.exports) {
    module.exports = { processText, EXAMPLE, POLICIES };
  }
  if (typeof document !== "undefined") {
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", setupWorkbench);
    else setupWorkbench();
  }
})();
