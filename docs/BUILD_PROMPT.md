# Top Up: Claude Code Build Prompt

**How to use this file**
1. Phase 0 creates the GitHub repo and the Vercel project for you (every branch gets a preview URL). You only need an existing GitHub login and the Vercel GitHub app installed on that account.
2. Save **Part A** as `CLAUDE.md` in the repo root. Claude Code reads it every session.
3. Paste the **Part B** phase prompts one at a time. Review the Vercel preview after each phase before starting the next.
4. **Part C** holds the copy deck and the sources file. Claude Code copies these into `src/content/`.

---

# PART A: CLAUDE.md

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

---

# PART B: PHASE PROMPTS

## Phase 0: Research and setup
> Read `CLAUDE.md` fully. Then:
> 0. **Automation setup.** Using the connected GitHub and Vercel access:
>    a. Create a new private GitHub repo named `top-up-website` (ask me if that name or the owner should differ). Set `main` as the default branch.
>    b. Create a Vercel project linked to that repo, so every push to `main` deploys to production and every other branch gets a preview URL. Framework preset: Next.js.
>    c. Add the env var `FORM_ENDPOINT` (empty for now) to Preview and Production, and note in `docs/open-questions.md` that it needs a real value.
>    d. Do not buy or attach a domain, and do not enable branch protection or merge anything without asking me. Report back the repo URL, the Vercel project name and the first preview URL.
>    e. If any step fails because of missing access (GitHub app not installed, token scope), stop, say exactly what is missing, and wait.
> 1. Initialise Next.js (App Router, TypeScript strict, Tailwind) in this repo. Add GSAP, `@gsap/react`, Lenis, MapLibre GL, zod, `@vercel/analytics`.
> 2. Research inspiration: search GitHub for 3 to 5 well-regarded repos or demos covering (a) GSAP ScrollTrigger scroll-story or pinned-section sites, (b) Lenis + GSAP integration, (c) SVG water or wave animation. Check each licence. **Study techniques only; do not copy code.** Write findings to `docs/references.md`: repo, what it teaches, which of our sections it informs.
> 3. Create the folder structure from `CLAUDE.md`, `tokens.css`, and empty `copy.ts` / `sources.ts` seeded from Part C.
> 4. Create `docs/open-questions.md` with: vector logo needed from the client, domain name, shack-owner consent for naming, bottle spec (material and liner), form destination, real centre list, any photos.
> 5. Commit, push, and confirm the Vercel preview deploys.

## Phase 1: Foundation
> Build the app shell: layout, fonts, tokens, `SmoothScroll` (Lenis + GSAP ticker, disabled under reduced motion), sticky minimal header (logo, "Find a refill point", "Become a Top Up Centre" button) that becomes a compact bar on scroll, footer skeleton, and the UI primitives: `Button`, `Cite` (superscript number linking to the Sources section, with focus and hover states), `Counter` (GSAP-driven number, final value readable by screen readers), `Drop` (logo recreated as inline SVG, placeholder until the client sends the vector).
> Add a `Sources` section component that renders everything from `sources.ts`, in order of first citation.
> Acceptance: page renders at 360px and 1440px, header works, Lighthouse mobile ≥ 90 on the empty shell.

## Phase 2: Hero and "The bottle is the expensive part"
> **Hero ("Fill it up").** The Drop sits alone on sand. A pinned ScrollTrigger scrubs a water level (`Wave`: two layered sine-wave SVG paths, 200% wide, looping x-translate, level driven by scrubbed y) rising inside the drop, then expanding to fill the viewport in blue. As the water rises, the headline resolves word by word: "Every litre you refill is a bottle that never exists." Sub-copy and both CTAs fade in at the end. Total pinned scroll about 150vh on desktop and about 100vh on mobile.
> Reduced motion: show the filled state and headline immediately, no pin.
>
> **Problem section.** Four short beats, each with a small SVG visual and a `<Cite>`:
> 1. Water: one drop pours into a bottle, and two more drops appear beside it. "It takes about 3 litres of water to make 1 litre of bottled water."
> 2. Energy: a bar comparison, bottled vs treated tap, labelled with the sourced range. Animate the bottled bar growing on scroll.
> 3. Recycling, honestly: "India recycles most of its PET bottles. But making and moving them uses water and energy first, so the best bottle is the one you never need."
> 4. Oceans: slow rotating ring of tiny dots. Caption states that garbage patches are mostly tiny plastic fragments, not floating islands, and that plastic makes up most marine debris.
> Use the exact copy and source ids in Part C.
>
> Then the **Hierarchy** strip: Rethink → **Reduce** → Reuse → Recycle as a ladder, with "Reduce" highlighted by a scrubbed underline and the line "Reduce comes first. It means using fewer resources in the first place."
> Acceptance: 60fps feel on a mid-range phone, counters and bars work, every stat has a working citation link.

## Phase 3: The pilot and "How it works"
> **Pilot section ("We tested it on a beach in Goa").** The strongest section, so give it the most motion.
> Left: a grid of about 75 small bottle icons labelled "Empty bottles per day, before". On scroll, icons clear out in a staggered scrub to zero, labelled "after". A counter runs 75 → 0.
> Right: a 20-litre refill bottle illustration by a counter, with the refill price shown as Rs.10 per litre in the first season and Rs.5 per litre after one year (pilot figures from Part C).
> Below: a 3-step timeline: Season 1 (refill bottle placed by the counter), After one year (price lowered), Season 2 (stopped stocking one-litre bottles; guests bring their own bottles).
> Show the four benefits as icons: noticed by aware tourists, goodwill, more food sold, less waste. Add the two insights: "It's better for the environment" and "It's cheaper".
> Label the section clearly: "Pilot observation, one beach shack in Arambol, Goa." No owner or shack name (see rule 6).
>
> **How it works.** Three steps: 1 Spot the lamp. 2 Bring your bottle. 3 Top up and go. A cane `Lamp` SVG hangs from the top of the section and sways: `transform-origin` at the hook, with `gsap.quickTo` rotation driven by `ScrollTrigger.getVelocity()` plus a gentle idle swing. The blue drop on the lamp glows amber when its step is active.
> Acceptance: the pilot sequence is clear without reading; reduced-motion shows the "after" state.

## Phase 4: Find a refill point and Join
> **Find a refill point.** Lazy-load MapLibre. Read `centres.json` (real centres only; initially the Arambol, Goa pilot, with no business name). Custom blue-drop markers. Add a "More centres coming" empty state and a "Know a shack that should be on this map?" form (name, place, link or contact) that posts to `/api/lead` with `type: "suggest"`.
> **Join.** Two tabs: "Shack, restaurant or hotel" and "School, company or institution". Show what a centre gets (lamp and blue-drop signage, posters and stickers, a listing on the map, Top Up bottles to offer guests) and what we ask (clean filtered water, a visible refill point, the sign displayed). **No numbers about earnings.** Short form: name, venue, type, town and state, phone or email, message. Validate with zod, honeypot field, rate-limit in the route handler, success and error states, accessible labels.
> `/api/lead` forwards to `process.env.FORM_ENDPOINT` (Formspree or similar for now; Supabase in phase 2). If the env var is missing, return a clear 503 in dev.
> Acceptance: both forms work end to end on the Vercel preview.

## Phase 5: The bottle, roadmap, footer, SEO
> **Bottle.** Illustration of a reusable metal bottle with the Top Up mark, a short benefit list that makes no unconfirmed material claims (rule 3), the line "Pricing announced at launch", and a "Notify me / bulk enquiry" button that opens the lead form with `type: "bottle"`.
> **Roadmap.** One line: "Round 1: tourist hubs, starting with Goa. Then more places, one round at a time." Plain text, no targets, no figures.
> **Footer.** Logo, short mission line, links (Find, Join, Sources), contact, "Built with care in India". Privacy note for form data.
> **SEO.** Metadata, Open Graph image via `opengraph-image.tsx` (drop on sand with the headline), `sitemap.ts`, `robots.ts`, JSON-LD `Organization`, favicon from the Drop.

## Phase 6: Polish, performance, launch
> 1. Run Lighthouse (mobile) and fix to the budgets in `CLAUDE.md`.
> 2. Test on a throttled mid-range mobile profile. Reduce or drop anything that drops frames.
> 3. Accessibility pass: keyboard path through the whole page, focus order, contrast, reduced-motion, screen-reader read of the counters.
> 4. Content audit: grep the repo for currency symbols, "Rs", "₹", "revenue", "cost", "margin", "profit". The **only** allowed hits are the two pilot refill prices in the Pilot section. Confirm every stat has a `<Cite>`.
> 5. Fill `docs/open-questions.md` with what is still blocking launch.
> 6. Final summary: what shipped, what's pending from the client, suggested phase-2 items (Supabase centre listings, Hindi and Konkani, real photos, impact counter).

---

# PART C: CONTENT DECK

## Copy (put in `src/content/copy.ts`)
**Hero H1:** Every litre you refill is a bottle that never exists.
**Hero sub:** Top Up is a plan to make refill drinking water the easy choice across India, starting where bottles pile up fastest: tourist beaches, towns and trails.
**CTAs:** Become a Top Up Centre · Find a refill point

**Problem heading:** The bottle is the expensive part.
**Beat 1:** It takes about 3 litres of water to make 1 litre of bottled water.
**Beat 2:** Bottled water takes far more energy than treated tap water, once you count making the bottle, filling it and moving it.
**Beat 3:** India already recycles most of its PET bottles. But making and moving a bottle costs water and energy first. The best bottle is the one you never need.
**Beat 4:** Plastic makes up most of the debris found in the world's oceans. The "garbage patches" are mostly tiny plastic fragments, which is why they are so hard to clean up.

**Hierarchy:** Rethink, Reduce, Reuse, Recycle. Reduce comes first. It means using fewer resources in the first place.

**Pilot heading:** We tested it on a beach in Goa.
**Pilot body:** A small beach shack in Arambol sold about 60 to 90 bottles of mineral water a day and was left with about 75 empty bottles daily. The owner placed a 20-litre refill bottle by the counter and offered refills at Rs.10 per litre. After a year he lowered the price to Rs.5 per litre. By the end of the second season he had stopped stocking one-litre bottles, and guests now bring their own.
**Benefits:** Aware travellers noticed the shack and talked about it. It earned goodwill as an eco-friendly initiative. More food was sold. Far less waste.
**Insights:** Aware tourists switch because it is better for the environment, and because it is cheaper.
**Pilot label:** Pilot observation, one beach shack in Arambol, Goa.

**How it works:** 1 Spot the lamp (a hanging cane lamp and a blue drop mark every Top Up point). 2 Bring your bottle. 3 Top up and go.

**Join heading:** Become a Top Up Centre.
**Join body:** Individuals and businesses make the difference when they feel inspired, encouraged and supported. We'll help you set up a visible refill point and spread the word.

**Closing line:** Top Up is a plan to encourage refill drinking water across India, beginning with tourist areas, for high impact.

## Sources (put in `src/content/sources.ts`)
```ts
export const sources = [
  {
    id: "pacinst-water-use",
    claim: "About 3 litres of water are needed to produce 1 litre of bottled water (2006 US estimate).",
    title: "Bottled Water and Energy: A Pacific Institute Fact Sheet",
    publisher: "Pacific Institute",
    url: "https://pacinst.org/wp-content/uploads/2013/02/bottled_water_and_energy.pdf",
    note: "US data, 2006."
  },
  {
    id: "gleick-cooley-energy",
    claim: "Producing bottled water takes roughly 5.6 to 10.2 MJ per litre, up to about 2,000 times the energy of producing tap water.",
    title: "Energy implications of bottled water",
    publisher: "Gleick & Cooley, Environmental Research Letters, 2009 (Pacific Institute)",
    url: "https://pacinst.org/press_center/press_releases/bottled_water_0209.html",
    note: "Compares bottled water with treated tap water; US-based analysis."
  },
  {
    id: "ncl-pace-pet",
    claim: "India recycles most of its PET bottles (a CSIR-NCL / PACE study put it at about 90%).",
    title: "India recycles 90% of its PET waste",
    publisher: "CSIR-National Chemical Laboratory & PACE, reported by Plastemart / Plasteurope, 2017",
    url: "https://www.plasteurope.com/news/PET_RECYCLING_t236441",
    note: "Industry-backed study. A 2025 industry review reports about 92%: https://petpla.net/assets/ebooks/PP202510/22/"
  },
  {
    id: "noaa-garbage-patch",
    claim: "Garbage patches are not solid islands; most debris in them is small pieces of plastic.",
    title: "How Big Is the Great Pacific Garbage Patch?",
    publisher: "NOAA Marine Debris Program",
    url: "https://response.restoration.noaa.gov/node/506"
  },
  {
    id: "si-marine-debris",
    claim: "Plastic makes up the majority of marine debris on shorelines and floating in oceans worldwide.",
    title: "Ocean Trash Plaguing Our Sea",
    publisher: "Smithsonian Ocean",
    url: "https://ocean.si.edu/planet-ocean/tides-currents/ocean-trash-plaguing-our-sea"
  },
  {
    id: "topup-pilot",
    claim: "Pilot observations from one beach shack in Arambol, Goa.",
    title: "Top Up pilot, Arambol, Goa",
    publisher: "Top Up (own observation, not a controlled study)",
    url: ""
  }
] as const;
```
