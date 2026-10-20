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

## Technical notes
- **Total blocking time is the main performance problem.** With real throttling (slow 4G, 4x CPU) TBT is about 1.1 to 1.3 s and Performance about 73 to 76, with LCP about 0.9 s. It is the same on the Phase 3 branch and with the bottle-motion branch, so it came from the hero and pilot work (GSAP and ScrollTrigger setup, 75 pilot tweens, hydration), not from the ambient CSS loops. Phase 6 should look at lazy-initialising below-the-fold ScrollTriggers, a single stagger tween for the pilot bottles instead of 75, and code-splitting.
- **Hero first paint.** The default markup is the final state (water full, screen blue) so the page reads without JS and under reduced motion. `CLAUDE.md` says hidden start states come from GSAP, not CSS, so on a slow phone a visitor may briefly see the blue state before JS hydrates and resets it to the empty drop. If that flash is unacceptable, the fix is a small CSS start state gated on a `js` class set by an inline script. That bends the "GSAP not CSS" rule, so it needs a decision.
- **Frame rate on a real phone is unverified.** Headless Chrome caps at 30 fps, so scrubbing smoothness (pinned hero, 60 fps target) still needs a check on a real mid-range phone.
- The header's secondary link ("Find a refill point") is hidden below 640px so the primary button fits on a 360px phone. It stays in the hero and footer. Confirm this is acceptable.
- `experimental.inlineCss` is on in `next.config.ts`. It inlines the roughly 6 KB stylesheet to remove a render-blocking request. Experimental flag; revisit if it causes trouble on a Next upgrade.
- Vercel's default deployment protection is on for this project, so preview URLs require a Vercel login. Decide whether previews should be public for client review.
- `npm audit` reports a high-severity advisory in `braces` (via ESLint tooling). It is dev-only, not shipped, and has no non-breaking fix yet. Revisit when `eslint-config-next` updates.
- `AGENTS.md` was generated by create-next-app and is kept as is.
