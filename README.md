# Maskable.si — Possession is not permission

An independent, future-facing concept study of **capability maskability** for advanced AI and superintelligence. The domain completes the brand: **Maskable** + **.si** (Superintelligence).

## Status

This is a concept and strategic-positioning landing page with an interactive, browser-only **12-capability mask register**, a proposed Grant / Enforce / Verify model, and a non-standard M0–M4 conceptual vocabulary. It is **not** a deployed frontier-AI system, a containment layer, an AI alignment solution, a certified solution, or proof of control over superintelligence. No clients, integrations, market value, or endorsements are claimed.

## Operational definition: Maskability v0.1

The separately citable page at **`/maskability/`** proposes an operational definition of *maskability*: the degree to which an AI deployment can independently scope, enforce, revoke and evaluate external action permissions through specified boundaries. This is an **independent Sohadot proposal**, not an adopted industry standard. It explicitly excludes claims to modify model-internal capabilities.

The page is paired with:

- `maskability/contract.v0.1.json` — machine-readable illustrative decision contract and 8 case fixtures
- `examples/reference-policy.mjs` — minimal deterministic pure-function example; **not secure authorization software**
- `tests/policy.mjs` — reproducible assertion runner for the 8 case fixtures, plus ambiguous-grant and invalid-input defenses

Run the checks with `node tests/smoke.mjs` and `node tests/policy.mjs`. A passing test only establishes the behavior of the reference code on its inputs. It does **not** demonstrate tool interception, identity trust, independent approval verification, real revocation, production performance, bypass resistance or model safety. These remain development and external-review tasks. The new content is deliberately usable as a research reference while keeping the acquisition route separate.

The register cycles locally through masked, review and exposed states. It does not execute an AI model, run any tool, enforce actual permissions, or substantiate that external capability boundaries control internal model abilities. It makes no network requests, collects no data, and has no state persistence.

## Preview

Serve the project root via a static HTTP server, e.g. `python3 -m http.server 8080`, and open `http://localhost:8080`.

## Source hierarchy

- `index.html` — principal editorial and interactive landing page
- `maskability/index.html` — independently indexable operational definition, threat boundary and reproducible evaluation guide
- `maskability/contract.v0.1.json` — proposed example specification and fixtures
- `examples/reference-policy.mjs`, `tests/policy.mjs` — demonstrative decision logic and executable tests
- `assets/styles.css` — accessible responsive design
- `assets/app.js` — browser-only interactive 12-capability register
- `assets/social-card.svg` and `assets/social-card.png` — original branded social preview graphic, 1200 × 630
- `assets/social-card-v2.jpg` — standard true-color JPEG of that same graphic, with a distinct URL for social re-fetch compatibility
- `acquire/index.html` — separate, noindex strategic inquiries with optional independent escrow
- `tests/smoke.mjs` — structural and behavior tests
- `robots.txt`, `sitemap.xml` — homepage discovery, acquisition excluded

## Evidence basis

- [NIST AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework)
- [OWASP LLM06:2025 Excessive Agency](https://genai.owasp.org/llmrisk/llm062025-excessive-agency/)
- [UK AI Security Institute: evaluating frontier-AI misuse safeguards](https://www.aisi.gov.uk/research/principles-for-evaluating-misuse-safeguards-of-frontier-ai-systems)
- [OpenAI: updated Preparedness Framework](https://openai.com/index/updating-our-preparedness-framework/)

These references inform the concept but do not endorse it. The `.si` extension technically remains Slovenia's ccTLD in the DNS system; its **brand meaning** in this project is explicitly **Superintelligence**. Domain configuration and publication are separate from this repository work.

## Social preview behavior

The homepage and reference page declare Open Graph and X/Twitter metadata with an **absolute HTTPS JPEG URL**, dimensions, MIME type and alternative text. The original PNG remains available; `social-card-v2.jpg` preserves its visual design while using a widely supported true-color format and a fresh URL. Social platforms may fetch and cache the new preview, but rendering varies by platform. Metadata cannot guarantee instant rich previews, and already-cached page cards may require a recrawl. WhatsApp also allows senders to disable link previews in their privacy settings; the site cannot override that choice.

## Optional escrow

The `/acquire/` route offers qualified parties the possibility of an independent escrow process **only by mutual agreement**, subject to the provider's eligibility requirements and fees. It does not initiate an escrow transaction or imply affiliation with Escrow.com. The inquiry route stays excluded from the sitemap, but crawlers are not blocked from reading its `noindex` directive.

© 2026 Sohadot.
