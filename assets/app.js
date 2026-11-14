/**
 * Capability Mask Register — educational UI simulation only.
 * No model, authorization server, real-world enforcement, telemetry,
 * network requests, storage, or access to operating-system capabilities.
 */
(function () {
  "use strict";

  const CAPABILITIES = Object.freeze([
    { id: "code", name: "Code execution" },
    { id: "network", name: "Network access" },
    { id: "tools", name: "Tool invocation" },
    { id: "memory", name: "Persistent memory" },
    { id: "delegation", name: "Autonomous delegation" },
    { id: "physical", name: "Physical actuation" },
    { id: "self_mod", name: "Self-modification" },
    { id: "authorization", name: "Self-authorization" },
    { id: "identity", name: "Credential use" },
    { id: "external", name: "External write" },
    { id: "resources", name: "Resource acquisition" },
    { id: "deployment", name: "Model deployment" }
  ]);

  const STATES = Object.freeze(["masked", "review", "exposed"]);
  const DEFAULT = Object.freeze({
    code: "review",
    network: "exposed",
    tools: "review",
    memory: "exposed",
    delegation: "masked",
    physical: "masked",
    self_mod: "masked",
    authorization: "masked",
    identity: "masked",
    external: "review",
    resources: "masked",
    deployment: "masked"
  });
  const SCOPED = Object.freeze({
    ...Object.fromEntries(CAPABILITIES.map(({ id }) => [id, "masked"])),
    code: "exposed",
    network: "review",
    tools: "review",
    memory: "review"
  });

  function nextState(state) {
    const index = STATES.indexOf(state);
    return STATES[(index + 1) % STATES.length];
  }
  function countStates(register) {
    const counts = { masked: 0, review: 0, exposed: 0 };
    for (const capability of CAPABILITIES) {
      const state = register[capability.id];
      if (Object.prototype.hasOwnProperty.call(counts, state)) counts[state] += 1;
    }
    return counts;
  }
  function applyPreset(name) {
    if (name === "mask") return Object.fromEntries(CAPABILITIES.map(({ id }) => [id, "masked"]));
    if (name === "scoped") return { ...SCOPED };
    return { ...DEFAULT };
  }

  function initRegister() {
    const grid = document.getElementById("capability-grid");
    const countMasked = document.getElementById("count-masked");
    const countReview = document.getElementById("count-review");
    const countExposed = document.getElementById("count-exposed");
    if (!grid || !countMasked || !countReview || !countExposed) return;

    let state = applyPreset("reset");
    const buttons = new Map();
    for (const item of CAPABILITIES) {
      const button = grid.querySelector('[data-id="' + item.id + '"]');
      if (!button) continue;
      buttons.set(item.id, button);
      button.addEventListener("click", () => {
        state = { ...state, [item.id]: nextState(state[item.id]) };
        render();
      });
    }

    function render() {
      for (const item of CAPABILITIES) {
        const button = buttons.get(item.id);
        if (!button) continue;
        const status = state[item.id];
        button.classList.remove("state-masked", "state-review", "state-exposed");
        button.classList.add("state-" + status);
        button.querySelector(".cap-status").textContent = status === "review" ? "REVIEW" : status.toUpperCase();
        button.setAttribute("aria-label", item.name + ": " + (status === "review" ? "review required" : status) + ". Activate to change the simulated permission state.");
        button.title = item.name + " — " + (status === "review" ? "Review required" : status);
      }
      const counts = countStates(state);
      countMasked.textContent = String(counts.masked);
      countReview.textContent = String(counts.review);
      countExposed.textContent = String(counts.exposed);
    }

    const presets = { "preset-mask": "mask", "preset-scoped": "scoped", "preset-reset": "reset" };
    for (const [buttonId, preset] of Object.entries(presets)) {
      document.getElementById(buttonId)?.addEventListener("click", () => {
        state = applyPreset(preset);
        render();
      });
    }
    render();
  }

  if (typeof module !== "undefined" && module.exports) {
    module.exports = { CAPABILITIES, STATES, DEFAULT, SCOPED, nextState, countStates, applyPreset };
  }
  if (typeof document !== "undefined") {
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", initRegister);
    else initRegister();
  }
})();
