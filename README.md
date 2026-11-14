# Maskable — Sensitive Information Control

An independent concept study of purpose-bound disclosure for enterprise data and AI systems, presented at **Maskable.si**.

## Status

This is a concept landing page with a small, working, browser-only demonstrator. It is **not** an enterprise security product, an anonymisation service, a certified solution, or a regulatory compliance assessment. No clients, integrations, market value, or approvals are claimed.

The demonstrator uses simple regular expressions; it misses many kinds of sensitive information. Use synthetic examples only. Input remains in the browser and is neither uploaded nor stored by the page.

## Preview

Serve the project root via a static HTTP server, e.g. `python3 -m http.server 8080`, and open `http://localhost:8080`.

## Source hierarchy

- `index.html` — principal editorial and interactive landing page
- `assets/styles.css` — accessible responsive design
- `assets/app.js` — browser-only masking demonstration
- `acquire/index.html` — separate, noindex strategic inquiries
- `tests/smoke.mjs` — structural and behavior tests
- `robots.txt`, `sitemap.xml` — homepage discovery, acquisition excluded

## Evidence basis

- [NIST SP 800-188](https://csrc.nist.gov/pubs/sp/800/188/final)
- [OWASP LLM02:2025](https://genai.owasp.org/llmrisk/llm022025-sensitive-information-disclosure/)
- [UK ICO anonymisation guidance](https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/data-sharing/anonymisation/introduction-to-anonymisation/)

These references inform the concept but do not endorse it. The `maskable.si` hostname is assumed from the repository name and requires owner verification before DNS attachment.

© 2026 Sohadot.
