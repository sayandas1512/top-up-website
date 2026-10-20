# Top Up: launch summary

Status after Phase 6. Everything is on stacked pull requests; **nothing is merged and production still shows the Phase 0 starter page.** The latest build is on the Phase 6 preview.

## What shipped
- **Hero ("Fill it up"):** pinned, scrubbed water rising in the drop, headline resolving word by word, ghost bottles dissolving, ripples and bubbles, then the screen filling blue and the CTAs arriving. Reduced motion shows the finished state.
- **The bottle is the expensive part:** four cited beats (water, energy, recycling, oceans) with SVG visuals, then the Rethink / Reduce / Reuse / Recycle ladder. Client's original Part C wording and sources.
- **The pilot:** labelled as one beach shack in Arambol, Goa, with no names. 75 bottles clearing to zero, the 20-litre refill bottle, the two pilot prices, a 3-step timeline, four benefits and two insight cards.
- **How it works:** a swaying cane lamp whose drop glows amber with the active step.
- **Find a refill point:** lazy-loaded map (free open tiles) with the pilot at village level, a text list, a "More centres coming" state, and a "suggest a shack" form.
- **Become a Top Up Centre:** two tabs, what a centre gets and what we ask, and a validated form.
- **The Top Up bottle:** illustration, three claim-free benefits, "Pricing announced at launch", and a notify / bulk enquiry form.
- **Roadmap, footer, SEO:** one-line roadmap; footer with links, privacy note and "Built with care in India"; metadata, Open Graph image, sitemap, robots (production only), Organization data, favicon.
- **Forms backend:** `/api/lead` with zod validation, honeypot, rate limit and forwarding to `FORM_ENDPOINT`.
- **Quality:** Lighthouse mobile Performance 94 to 97 (simulated) and 89 to 94 (real throttling), Accessibility 100, SEO 100 in production mode, CLS 0 to 0.002; axe-core 0 violations in four states; keyboard path and contrast checked; every statistic carries a citation; the only currency figures are the two pilot prices.

## Pending from the client
See "Launch checklist" in `open-questions.md`: a real form destination, the domain, sign-off on wording written here and on the pilot prices, the vector logo, a public contact route, a privacy and analytics decision, the bottle spec, real centres and photos, shack-owner consent (only needed to name the shack).

## Optional change waiting on the client
Newer, India-specific sources for the problem section are ready in **draft PR #7**. The site keeps the client's original wording unless they approve it.

## Suggested phase 2
- **Supabase** for centre listings and form submissions, replacing the single `FORM_ENDPOINT`, with proper spam protection.
- **Real centres on the map** with exact points the owners agree to publish, and a centre page each.
- **Hindi and Konkani** (the copy is already in one file, `src/content/copy.ts`).
- **Real photos** in the reserved `<figure>` slots.
- **An impact counter** once there are real, sourced numbers to show.
- **Re-check the performance budget on real devices**, and decide on the hero's first-paint flash.
