## Project
Top Up is a campaign website for refillable drinking water across India, starting with tourist areas (Goa pilot).
The brand mark is a sky-blue water drop with "top up" inside it. Refill points are marked by a hanging cane lamp and a blue drop.

**Audiences**
1. Tourists: find a refill point and understand why it matters.
2. Shacks, restaurants, hotels, schools and institutions: join as a Top Up Centre.

**Primary CTA:** "Become a Top Up Centre". **Secondary CTA:** "Find a refill point".

**Site goals:** simple, efficient, informative. Fast on a phone over 4G. Motion explains the idea; it never delays the content.

## Hard content rules (never break these)
1. **No financial figures anywhere on the site.** No costs, revenue, margins, profit, investment, funding, or bottle prices. This covers copy, alt text, metadata, comments, JSON and seed data. Where a bottle price would go, show "Pricing announced at launch".
2. **Every statistic is cited.** Render stats with `<Cite id="..." />`, which links to the Sources section. A stat needs an entry in `src/content/sources.ts`. If you cannot source a claim, do not publish it. Add it to `docs/open-questions.md` instead.
3. **No health claims about bottled water or BPA.** The only BPA-related statement allowed is that the Top Up bottle's material and liner spec is confirmed by the supplier. Until that is confirmed, make no "BPA-free" claim.
4. **Pilot data is labelled as a pilot:** "Pilot observation, one beach shack in Arambol, Goa." Never present it as a study or a general result.
5. **No fake content.** No invented centres, testimonials, partner logos, or counts. Sample map pins are not allowed in production. Show the pilot location plus a "More centres coming" state.
6. **Names of real people and businesses** (the shack owner and the shack name) stay out of the site until the client confirms consent. Use "a beach shack in Arambol, Goa".
7. **Be honest about recycling.** India's PET bottle recycling rate is high (industry-backed estimates of about 90%). Never say "80% of bottles are thrown away". The argument is: making and moving a bottle costs water and energy before it is ever recycled, so reduce comes first.

## Stack
- Next.js (App Router) + TypeScript (strict) + Tailwind CSS
- GSAP + ScrollTrigger (use `@gsap/react` `useGSAP`) and Lenis for smooth scroll
- MapLibre GL JS for the map (no API key needed; use a free open tile style)
- Zod for form validation
- Vercel for hosting and `@vercel/analytics`. GitHub for version control.
- Phase 2 (later, not now): Supabase for centre listings and form submissions.
- Do not add other dependencies without saying why in the PR description.

## Structure
```
src/
  app/
    layout.tsx, page.tsx, globals.css
    api/lead/route.ts          # validates with zod, forwards to FORM_ENDPOINT
    opengraph-image.tsx
  components/
    sections/ Hero, Problem, Hierarchy, Pilot, HowItWorks, FindCentre, Join, Bottle, Footer
    ui/ Button, Cite, Counter, Drop (logo SVG), Lamp (SVG), Wave (SVG)
    motion/ SmoothScroll.tsx, useReducedMotion.ts, registerGsap.ts
  content/
    copy.ts                    # all user-facing text (i18n-ready, Hindi later)
    sources.ts                 # every citation
    centres.json               # real centres only
  styles/tokens.css
docs/
  open-questions.md            # unsourced claims, asset requests, client decisions
```

## Design system
- **Colours (tokens in `tokens.css`):** drop blue `#3FBFEF` (fills and graphics only), deep navy `#0B2545` (all text), sand `#F6F0E4` (page background), lamp amber `#F5A524` (single accent, used sparingly). Check contrast: blue text on sand fails, so never use it for text.
- **Type:** Bricolage Grotesque for display, Inter for body, both via `next/font`. Fluid type scale with `clamp()`. Body at least 17px on mobile.
- **Layout:** mobile-first at 360px. Generous space. One idea per screen. Max content width 1200px.
- **Tone:** warm, plain, confident. Short sentences. No guilt-tripping and no jargon.
- **Imagery:** SVG illustration only for v1. No stock photos and no video, so the first load stays light. Leave `<figure>` slots for real photos from the client later.

## Motion rules
- Register plugins once in `registerGsap.ts`. Animate only `transform` and `opacity`. No layout-thrashing properties.
- Lenis + ScrollTrigger wiring: `lenis.on('scroll', ScrollTrigger.update)`, `gsap.ticker.add(t => lenis.raf(t * 1000))`, `gsap.ticker.lagSmoothing(0)`.
- Use `ScrollTrigger.matchMedia` / `gsap.matchMedia()`. Mobile gets lighter versions (fewer layers, no pin where it hurts).
- **`prefers-reduced-motion`:** no scrubbing, no pinning, no parallax. Show final states instantly, and the site must still read perfectly. Lenis is off.
- Progressive enhancement: content is in the DOM and readable without JS. Set hidden initial states from GSAP, not CSS.
- Call `ScrollTrigger.refresh()` after fonts load. Clean up with `useGSAP` scope.
- Every animation has one job: explain, guide, or reward. Cut anything decorative that costs more than ~2 KB or a measurable frame drop.

## Performance and accessibility budgets
- Lighthouse mobile: Performance ≥ 90, Accessibility ≥ 95, SEO ≥ 95. LCP < 2.5s on slow 4G. CLS < 0.05.
- Initial JS as small as practical. Lazy-load MapLibre only when the map section nears the viewport.
- Semantic landmarks, visible focus states, 44px touch targets, alt text on meaningful graphics, `aria-hidden` on decorative ones. Counters expose their final value to screen readers.

## Workflow rules for Claude Code
- Plan before you code. For each phase, state the plan in a few lines, then build.
- One branch per phase (`phase-1-foundation`, ...). Small commits with clear messages. Open a PR so Vercel creates a preview.
- Before saying a phase is done: `npm run lint && npm run build` pass, the page is checked at 360px and 1440px, and reduced-motion is checked.
- Never invent data. Put gaps in `docs/open-questions.md` and keep going.
- If a decision is genuinely the client's (brand, legal, pricing, names), ask me. Otherwise pick a sensible default and note it.
