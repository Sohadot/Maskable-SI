# Maskable.si — Possession is not permission

An independent, future-facing concept study of **capability maskability** for advanced AI and superintelligence. The domain completes the brand: **Maskable** + **.si** (Superintelligence).

## Status

This is a concept and strategic-positioning landing page with an interactive, browser-only **12-capability mask register**, a proposed Grant / Enforce / Verify model, and a non-standard M0–M4 conceptual vocabulary. It is **not** a deployed frontier-AI system, a containment layer, an AI alignment solution, a certified solution, or proof of control over superintelligence. No clients, integrations, market value, or endorsements are claimed.

The register cycles locally through masked, review and exposed states. It does not execute an AI model, run any tool, enforce actual permissions, or substantiate that external capability boundaries control internal model abilities. It makes no network requests, collects no data, and has no state persistence.

## Preview

Serve the project root via a static HTTP server, e.g. `python3 -m http.server 8080`, and open `http://localhost:8080`.

## Source hierarchy

- `index.html` — principal editorial and interactive landing page
- `assets/styles.css` — accessible responsive design
- `assets/app.js` — browser-only interactive 12-capability register
- `assets/social-card.svg` and `assets/social-card.png` — exact branded social preview graphic, 1200 × 630
- `acquire/index.html` — separate, noindex strategic inquiries with optional independent escrow
- `tests/smoke.mjs` — structural and behavior tests
- `robots.txt`, `sitemap.xml` — homepage discovery, acquisition excluded

## Evidence basis

- [NIST AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework)
- [UK AI Security Institute: evaluating frontier-AI misuse safeguards](https://www.aisi.gov.uk/research/principles-for-evaluating-misuse-safeguards-of-frontier-ai-systems)
- [OpenAI: updated Preparedness Framework](https://openai.com/index/updating-our-preparedness-framework/)

These references inform the concept but do not endorse it. The `.si` extension technically remains Slovenia's ccTLD in the DNS system; its **brand meaning** in this project is explicitly **Superintelligence**. Domain configuration and publication are separate from this repository work.

## Social preview behavior

The homepage declares Open Graph and X/Twitter metadata with an **absolute HTTPS PNG URL**, dimensions, MIME type and alternative text. After the site and the PNG are publicly accessible at `maskable.si`, social platforms may fetch and cache this preview. Rendering varies by platform; setting metadata does not guarantee instant rich previews, and already-cached cards may require a recrawl.

## Optional escrow

The `/acquire/` route offers qualified parties the possibility of an independent escrow process **only by mutual agreement**, subject to the provider's eligibility requirements and fees. It does not initiate an escrow transaction or imply affiliation with Escrow.com. The inquiry route stays excluded from the sitemap, but crawlers are not blocked from reading its `noindex` directive.

© 2026 Sohadot.
