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
- **Hindi and Konkani.** `copy.ts` is structured for translation. Translations and who reviews them are undecided.

## Sources and copy (India-specific update)
The problem-section copy was rewritten India-first, which **changes the client's Part C wording**, so it needs client sign-off. Old wording and sources are in `docs/BUILD_PROMPT.md`.
- **Water.** "About 3 litres" (Pacific Institute, 2006, US) is gone. It now leads with one Indian study (Tandon et al., 2014: about 17 litres per litre across eight Maharashtra plants, counting the bottle, carton and energy), with the 2024 industry benchmark (about 1.4 litres per litre, North American plants) as cited context. The two differ because they count different things. The Indian study is the best India-specific source found, but it is from 2014 and covers one state. A newer Indian study would be better. I read the 2024 industry benchmark's scope as facility-level (it says "facility processes" and "on site"); that reading of what it leaves out is mine.
- **Energy.** Now shows the Indian figure (7.08 MJ per litre, same 2014 study) beside the US range (5.6 to 10.2 MJ, 2009). **No Indian figure for treated tap water was found**, so the tap comparison and the "up to about 2,000 times" line are still the US analysis, and the page says so. A source for tap-water energy in India would close this gap.
- **Recycling.** Keeps "most" (2017 study) and adds the October 2025 industry figure (about 92% in 2024-25). That article is a trade-magazine piece with no source or method, so the page says "industry reports" and adds a caution citing CSE's 2024 report on fraudulent recycling certificates. The CSE point is about EPR certificates for plastic packaging in general, not PET only. A government or independent rate for PET would be better; none was found.
- **Oceans.** Now India first: Ministry of Earth Sciences reply to Parliament, 6 Aug 2025 (plastic 67% of beach litter in 2018, 43% in 2024; tourism and recreation are the major sources; plastic 66% of human-made litter in Goa's coastal mangroves). The mangrove survey's year is not given in the reply. The global line now cites UNEP (2021, at least 85% of marine litter) alongside NOAA and Smithsonian. **I could not open UNEP's own page** (it blocked the fetch) and confirmed the 85% figure through secondary summaries that quote it. Worth a direct check before launch.
- **Unverified on purpose, so not used:** Indian beach-litter figures from older or single-site papers that disagreed with each other (for example a 2013-14 national survey putting plastic at a much lower share), and news items on Goa and Ooty refill or bottle policy (one quotes a refill price, which rule 1 would not allow on the site anyway).

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
