# Open questions

Gaps, unsourced claims, asset requests and client decisions. Add to this file instead of inventing data.

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

## Phase 4 notes
- **Forms need a real `FORM_ENDPOINT` to work live.** It is empty on Vercel (Preview and Production), so on the deployed preview both forms validate and submit but then show an error ("The form isn't switched on yet"). Locally the full flow was tested against a mock endpoint. Set it to a Formspree URL (or similar) and the forms start working with no code change.
- **Pilot map pin is village level.** `centres.json` has the pilot at roughly Arambol village (15.6879, 73.7056, from OpenStreetMap place data), marked `approximate`. The map and list both say "Shown at village level, not the exact spot". The client should say whether that is how they want it shown, or supply a point they are happy to publish.
- **Privacy wording.** The forms say "Your details are sent to the Top Up team so we can reply to you." That is a factual description of what happens, not a policy. The client still needs to decide where details are stored, for how long, and whether a fuller privacy note is required (Phase 5 footer).
- **Map tiles.** The map uses OpenFreeMap, a free open service with no API key and no uptime guarantee. Attribution (OpenFreeMap, OpenMapTiles, OpenStreetMap) must stay on the map. For launch, decide whether that is acceptable or whether to self-host or use a paid provider.
- **Spam protection is a honeypot plus a per-instance rate limit** (5 requests per 10 minutes per IP, in memory). The limit is not shared across serverless instances, so it is a speed bump only. If spam shows up, add a CAPTCHA (for example Turnstile) or a shared store (Phase 2 Supabase).
- **MapLibre worker workaround.** MapLibre's web worker fails to load under the Next bundler, so `scripts/copy-maplibre-worker.mjs` copies it into `public/` before dev and build, and `MapView` points at it. The copy is git-ignored. Revisit on a MapLibre or Next upgrade.

## Technical notes
- **Total blocking time is the main performance problem.** With real throttling (slow 4G, 4x CPU) TBT is about 1.1 to 1.3 s and Performance about 73 to 76, with LCP about 0.9 s. It is the same on the Phase 3 branch and with the bottle-motion branch, so it came from the hero and pilot work (GSAP and ScrollTrigger setup, 75 pilot tweens, hydration), not from the ambient CSS loops. Phase 6 should look at lazy-initialising below-the-fold ScrollTriggers, a single stagger tween for the pilot bottles instead of 75, and code-splitting.
- **Hero first paint.** The default markup is the final state (water full, screen blue) so the page reads without JS and under reduced motion. `CLAUDE.md` says hidden start states come from GSAP, not CSS, so on a slow phone a visitor may briefly see the blue state before JS hydrates and resets it to the empty drop. If that flash is unacceptable, the fix is a small CSS start state gated on a `js` class set by an inline script. That bends the "GSAP not CSS" rule, so it needs a decision.
- **Frame rate on a real phone is unverified.** Headless Chrome caps at 30 fps, so scrubbing smoothness (pinned hero, 60 fps target) still needs a check on a real mid-range phone.
- The header's secondary link ("Find a refill point") is hidden below 640px so the primary button fits on a 360px phone. It stays in the hero and footer. Confirm this is acceptable.
- `experimental.inlineCss` is on in `next.config.ts`. It inlines the roughly 6 KB stylesheet to remove a render-blocking request. Experimental flag; revisit if it causes trouble on a Next upgrade.
- Vercel's default deployment protection is on for this project, so preview URLs require a Vercel login. Decide whether previews should be public for client review.
- `npm audit` reports a high-severity advisory in `braces` (via ESLint tooling). It is dev-only, not shipped, and has no non-breaking fix yet. Revisit when `eslint-config-next` updates.
- `AGENTS.md` was generated by create-next-app and is kept as is.

## Optional: newer, India-specific sources for the problem section
The site keeps the client's original Part C wording and sources. Several of those sources are old or US-based: water ("about 3 litres", 2006, US), energy (2009, US), recycling (2017). If the client wants newer and India-specific wording, a ready-made version is in **draft PR #7** (`india-sources`, preview available). It leads with an Indian study (about 17 litres of water and 7.08 MJ per litre, eight Maharashtra plants, 2014), adds an October 2025 industry recycling figure with a caution, and uses a Ministry of Earth Sciences reply to Parliament (6 Aug 2025) for beach litter, plus UNEP 2021 for the global figure. Its limits are listed in that PR: the Indian figures are from 2014 and one state, no Indian tap-water figure was found, the 2025 recycling figure is unsourced, and UNEP's own page could not be opened. **Do not merge it unless the client approves the wording change.**
