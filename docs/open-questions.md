# Open questions

Gaps, unsourced claims, asset requests and client decisions. Add to this file instead of inventing data.

## Launch checklist

**Blocks launch (needs a decision or an input from you or the client)**
1. **A real `FORM_ENDPOINT`.** Empty on Vercel (Preview and Production), so every form shows an error until it is set. Details under "Phase 4 notes".
2. **The real domain.** For now the site lives at `top-up-website-projects.vercel.app`, noindex. When the client's domain is chosen: attach it in Vercel, update `NEXT_PUBLIC_SITE_URL`, then set `ALLOW_INDEXING=true`.
3. **Client sign-off on wording I wrote** (page title, Open Graph subtitle, bottle copy, footer contact line, the "It's cheaper" card), and on the two pilot prices (Rs.10, Rs.5). Also their decision on the optional India-specific sources (draft PR #7).
4. **The vector logo.** The drop, favicon, Apple icon and social image are recreations of a placeholder.
5. **A public contact route.** There is no email or phone, so the footer points to the form. Fine for launch if the client is happy with that.
6. **Privacy and analytics.** The footer states only what forms do. Decide where details are stored and for how long, whether a fuller privacy note is needed, and whether to switch on Web Analytics.
7. **Real-device checks I could not do:** frame rate and feel of the pinned hero and pilot on a mid-range phone, the map's two-finger gestures on touch, and a pass with a real screen reader (VoiceOver and TalkBack). Everything automated passes (see "Phase 6 results").
8. **Publishing:** nothing is merged yet and production still shows the Phase 0 starter. Decide the merge order, and whether to enable branch protection.

**Can wait (nice to have or later phases)**
- Shack-owner consent (the shack is unnamed, so launch is fine without it), real centre list, photos, bottle spec and price (copy says "announced at launch").
- Descriptions for steps 2 and 3 of "How it works".
- Hindi and Konkani, a stronger spam defence, a paid or self-hosted map tile provider.

## Phase 6 results
- **Performance (mobile, Lighthouse), Phase 5 branch vs now, run side by side:** simulated Performance 76 to 87 became **94 to 97**, simulated TBT 470 to 520 ms became **30 to 40 ms**; with real throttling (slow 4G, 4x CPU) Performance 73 to 74 became **89 to 94**, TBT 1.2 to 1.3 s became **0.27 to 0.42 s**. CLS 0 to 0.002. Real-throttled LCP is 0.8 to 1.0 s. **Simulated LCP is 2.4 to 3.1 s and noisy**: the browser's own timing shows the text painting almost immediately, so this is Lighthouse's CPU model of the hydration work, but it means the 2.5 s LCP budget is only reliably met under real throttling.
- **What fixed it:** one ScrollTrigger refresh instead of several; one tween for the 75 pilot bottles; forms and zod loaded only when needed; below-the-fold animations set up when the browser is idle (one short task per section) instead of all in one long task during hydration. The cost was GSAP's own style reads, repeated for about 100 animated elements.
- **Accessibility:** axe-core reports 0 violations in four states (desktop, mobile, reduced motion, forms open with errors); Lighthouse 100. The colour pairings axe could not resolve were calculated by hand: all pass (lowest is 4.08:1 for large Hierarchy text, which needs 3:1). Keyboard walk-through: every control reachable once and in order, with a visible focus indicator; screen-reader tree checked for the counters.
- **Fixed in this phase:** hero CTAs could be focused while invisible (focusing one now jumps to the end of the pinned scroll); no skip link (added); header logo name did not match its text; lazy-loaded forms and the map were skipped by keyboard users (they now mount after load, and the map placeholder is a focusable control); the map stole focus once loaded (now only if it still has it); pilot figures lacked their own citations (added).
- **Frame rate:** headless Chrome caps at 30 fps, so true fps could not be measured. Main-thread use while scrolling under CPU throttling was 38 to 46% on desktop (4x) and 51 to 68% on a phone-sized screen (4x), mostly paint in software-rendered Chrome. This is directional only.

## Needed from the client
| Item | Why it matters | Status |
|---|---|---|
| Vector logo (SVG or AI) | The `Drop` component is a placeholder recreation until we have the real mark. Also needed for the favicon and Open Graph image. | Open |
| Domain name | No domain is bought or attached. Needed for production, `metadataBase`, sitemap and robots. | Open |
| Shack-owner consent to name the shack | Until consent is confirmed, the site says "a beach shack in Arambol, Goa" (rule 6). | Open |
| Bottle spec: material and liner | Rule 3: no "BPA-free" or other material claim until the supplier confirms the spec. Phase 5 bottle copy depends on it. | Open |
| Form destination | Where lead and suggestion forms should go (Formspree, email, Google Sheet, or Supabase in Phase 2). | Open |
| Real centre list | `src/content/centres.json` is empty on purpose (rule 5). Needs real centres, with consent, and coordinates for the Arambol pilot pin. | Open |
| Photos | Layout leaves `<figure>` slots. Photos need consent and credit lines. | Open |
| Contact details for the footer | Phase 1 footer has no email or phone. Needs a real address the client wants public. | Open |
| A real value for `FORM_ENDPOINT` | The Vercel env var exists (Preview and Production) but is empty. `/api/lead` returns a 503 until it is set. | Open |

## Content questions
- **Pilot refill prices (Rs.10, then Rs.5 per litre).** Rule 1 bans financial figures, but the brief's Pilot section and the Phase 6 audit allow exactly these two pilot refill prices. Confirm the client is happy to publish them, labelled as a pilot observation.
- **Pilot numbers are unsourced beyond the client's own observation.** About 60 to 90 bottles a day, about 75 empty bottles, and the 20-litre refill bottle come from the pilot only. They are labelled "Pilot observation, one beach shack in Arambol, Goa." and cite `topup-pilot` (which has no URL). Ask the client whether there are dates, a season range or any records we may reference.
- **"Aware tourists switch because it is better for the environment, and because it is cheaper."** This is a pilot insight, not a general result. Keep it inside the pilot label.
- **Energy bar (Phase 2).** The 5.6 to 10.2 MJ per litre figures come from a US analysis. The comparison to tap water ("up to about 2,000 times") is in the source note but the site copy does not state it. Decide whether to show the range, and label it as US data.
- **Water figure.** "About 3 litres" is a 2006 US estimate. It is labelled that way in the source note. Check whether an India-specific figure exists before launch.
- **Recycling figure.** The 90% figure is industry-backed (2017) and a 2025 industry review reports about 92%. Copy says "most", not a number.
- **Hindi and Konkani.** `copy.ts` is structured for translation. Translations and who reviews them are undecided.

## Phase 3 notes
- **"Bring your bottle" and "Top up and go" have no description.** Part C gives text only for step 1. Steps 2 and 3 show their title only. Want a one-line description for each?
- **Pilot timeline wording** is built only from the pilot paragraph (refill bottle placed; price lowered; one-litre bottles dropped and guests bring their own). The "It's cheaper" insight card is the client's pilot insight, shown inside the pilot label. Confirm they are happy with "cheaper" with no figure beside it.
- **Phase 6 audit:** the word "costs" appears once in the recycling beat ("costs water and energy"). That is resource use, not money, so it should stay, but the grep will flag it.

## Phase 5 notes
- **Bottle spec.** The illustration shows a metal bottle, as the brief says, and is only illustrative. The copy makes no claim about material, liner, capacity or health (rule 3) and says "Pricing announced at launch" and "Full details announced at launch." Replace the illustration and add spec lines only once the supplier confirms the material and liner.
- **Contact details.** There is no public email or phone, so the footer sends people to the form in "Become a Top Up Centre". The Organization structured data also has no contact point. Needs a real address the client wants public.
- **Domain.** The project's production address is now `https://top-up-website-projects.vercel.app` (a free Vercel name, set as `NEXT_PUBLIC_SITE_URL` in Production). Canonical URLs, Open Graph, the sitemap and robots use it. **Production is `noindex` until you set `ALLOW_INDEXING=true` in Vercel** (do this when the real domain is live and `NEXT_PUBLIC_SITE_URL` points at it). Previews and local builds are always noindex.
- **Logo and favicon.** The favicon, Apple icon and Open Graph drop are recreations of the placeholder mark. Swap them when the client sends the vector logo. The Organization data has no logo URL for the same reason.
- **Wording I wrote, needs client approval.** Page title "Top Up: refill drinking water across India", the Open Graph subtitle "Refill drinking water across India", the bottle intro and three benefit lines, "Full details announced at launch.", and the footer contact line. The meta description reuses the client's hero sub-copy.
- **Analytics.** `@vercel/analytics` is in the code. Web Analytics also has to be switched on in the Vercel project, and the client should decide whether a consent or fuller privacy note is needed. The footer only states what forms do with details.
- **Bottle and notify list.** The "Notify me / bulk enquiry" form posts to the same `FORM_ENDPOINT` as the other forms (still empty). Decide whether notify sign-ups should go somewhere separate.
- **Social image font.** The Open Graph image uses Bricolage Grotesque Bold, bundled under the SIL Open Font License (`src/assets/fonts/`).

## Phase 4 notes
- **Forms need a real `FORM_ENDPOINT` to work live.** It is empty on Vercel (Preview and Production), so on the deployed preview both forms validate and submit but then show an error ("The form isn't switched on yet"). Locally the full flow was tested against a mock endpoint. Set it to a Formspree URL (or similar) and the forms start working with no code change.
- **Pilot map pin is village level.** `centres.json` has the pilot at roughly Arambol village (15.6879, 73.7056, from OpenStreetMap place data), marked `approximate`. The map and list both say "Shown at village level, not the exact spot". The client should say whether that is how they want it shown, or supply a point they are happy to publish.
- **Privacy wording.** The forms say "Your details are sent to the Top Up team so we can reply to you." That is a factual description of what happens, not a policy. The client still needs to decide where details are stored, for how long, and whether a fuller privacy note is required (Phase 5 footer).
- **Map tiles.** The map uses OpenFreeMap, a free open service with no API key and no uptime guarantee. Attribution (OpenFreeMap, OpenMapTiles, OpenStreetMap) must stay on the map. For launch, decide whether that is acceptable or whether to self-host or use a paid provider.
- **Spam protection is a honeypot plus a per-instance rate limit** (5 requests per 10 minutes per IP, in memory). The limit is not shared across serverless instances, so it is a speed bump only. If spam shows up, add a CAPTCHA (for example Turnstile) or a shared store (Phase 2 Supabase).
- **MapLibre worker workaround.** MapLibre's web worker fails to load under the Next bundler, so `scripts/copy-maplibre-worker.mjs` copies it into `public/` before dev and build, and `MapView` points at it. The copy is git-ignored. Revisit on a MapLibre or Next upgrade.

## Technical notes
- **Hero first paint.** The default markup is the final state (water full, screen blue) so the page reads without JS and under reduced motion. `CLAUDE.md` says hidden start states come from GSAP, not CSS, so on a slow phone a visitor may briefly see the blue state before JS hydrates and resets it to the empty drop. If that flash is unacceptable, the fix is a small CSS start state gated on a `js` class set by an inline script. That bends the "GSAP not CSS" rule, so it needs a decision.
- The header's secondary link ("Find a refill point") is hidden below 640px so the primary button fits on a 360px phone. It stays in the hero and footer. Confirm this is acceptable.
- `experimental.inlineCss` is on in `next.config.ts`. It inlines the roughly 6 KB stylesheet to remove a render-blocking request. Experimental flag; revisit if it causes trouble on a Next upgrade.
- Vercel deployment protection was switched off at the client-facing request, so every `*.vercel.app` URL for this project, including production, is public. Re-enable it (or password-protect) if the site should stay private until launch.
- `npm audit` reports a high-severity advisory in `braces` (via ESLint tooling). It is dev-only, not shipped, and has no non-breaking fix yet. Revisit when `eslint-config-next` updates.
- `AGENTS.md` was generated by create-next-app and is kept as is.

## Optional: newer, India-specific sources for the problem section
The site keeps the client's original Part C wording and sources. Several of those sources are old or US-based: water ("about 3 litres", 2006, US), energy (2009, US), recycling (2017). If the client wants newer and India-specific wording, a ready-made version is in **draft PR #7** (`india-sources`, preview available). It leads with an Indian study (about 17 litres of water and 7.08 MJ per litre, eight Maharashtra plants, 2014), adds an October 2025 industry recycling figure with a caution, and uses a Ministry of Earth Sciences reply to Parliament (6 Aug 2025) for beach litter, plus UNEP 2021 for the global figure. Its limits are listed in that PR: the Indian figures are from 2014 and one state, no Indian tap-water figure was found, the 2025 recycling figure is unsourced, and UNEP's own page could not be opened. **Do not merge it unless the client approves the wording change.**
