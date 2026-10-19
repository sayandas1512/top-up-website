# Reference research (Phase 0)

Techniques only. No code is copied from any of these. Licences were checked on GitHub / npm on 2026-10-20.
Review depth is noted per entry, so nobody assumes more was studied than was.

| # | Repo / demo | Licence | Covers |
|---|---|---|---|
| 1 | [darkroomengineering/lenis](https://github.com/darkroomengineering/lenis) | MIT | (b) Lenis + GSAP |
| 2 | [greensock/GSAP](https://github.com/greensock/GSAP) (docs and ScrollTrigger demos at gsap.com) | GSAP "Standard 'no charge' licence" (https://gsap.com/standard-license). Free to use, including commercial use, with restrictions. Not an OSI open-source licence. | (a) ScrollTrigger |
| 3 | [pixelgridui/animated-bottle-scroll](https://github.com/pixelgridui/animated-bottle-scroll) | **None declared** (all rights reserved by default) | (a) pinned scroll story |
| 4 | [mzebley/dynamowaves](https://github.com/mzebley/dynamowaves) | MIT | (c) SVG waves |
| 5 | [f820602h/vue-surf](https://github.com/f820602h/vue-surf) | MIT | (c) SVG waves |

Entry 3 has no licence, so it is looked at for ideas only. Nothing is copied or adapted, and the project does not depend on it.

## 1. darkroomengineering/lenis (MIT) — Lenis + GSAP
- **Reviewed:** README, including the GSAP ScrollTrigger section and troubleshooting notes.
- **Teaches:** Lenis runs on native scroll, so `position: sticky`, anchors and accessibility keep working. The sync recipe is three lines: `lenis.on('scroll', ScrollTrigger.update)`, `gsap.ticker.add(t => lenis.raf(t * 1000))`, `gsap.ticker.lagSmoothing(0)`. Lenis must be updated from the GSAP ticker, with no second rAF loop. It also recommends the supplied `lenis.css`.
- **Informs:** `motion/SmoothScroll.tsx` and the header and anchor links (Phase 1). It also affects every pinned section (Hero, Pilot), because Lenis and pinning must share one clock. It matches the recipe already in `CLAUDE.md`.
- **Note for us:** under `prefers-reduced-motion` we do not create Lenis at all.

## 2. greensock/GSAP + ScrollTrigger docs (Standard no-charge licence)
- **Reviewed:** repo layout and licence field in `package.json` (3.15.0). The docs and demos were not re-read in this pass; the behaviours below come from the ScrollTrigger API we already plan to use.
- **Teaches:** `scrub` and `pin` on a timeline, `pinSpacing`, `gsap.matchMedia()` for desktop and mobile variants, `ScrollTrigger.getVelocity()`, and `refresh()` after fonts and layout change. The `@gsap/react` `useGSAP` hook handles scoped cleanup.
- **Informs:** Hero (pinned water-rise), Pilot (staggered scrub of about 75 icons), How it works (velocity-driven lamp sway via `gsap.quickTo`).
- **Licence note:** GSAP is free under the no-charge licence, which has restrictions on competing no-code animation builders. Our use as a website animation library is within it. Worth a one-line check if the client ever resells the site as a product.

## 3. pixelgridui/animated-bottle-scroll (no licence) — pinned scroll story
- **Reviewed:** structure of `main.js` only (a keyword scan of the ScrollTrigger usage), not a line-by-line read.
- **Teaches:** one pinned "hero object" (a bottle) that stays fixed while a timeline of text entries scrolls past. A small helper wraps `scrub: true` and `pin` in one config. Desktop and mobile differ through `ScrollTrigger.matchMedia`, so mobile can skip pinning.
- **Informs:** Hero (one pinned object whose state scrubs), Pilot (bottle illustration beside the timeline), and the rule that mobile gets a lighter version.
- **Licence:** none declared, so ideas only.

## 4. mzebley/dynamowaves (MIT) — SVG waves
- **Reviewed:** README.
- **Teaches:** waves as generated SVG `path` data (a seed gives a repeatable shape), animation that reacts to `prefers-reduced-motion` live, and cancelling observers and animation when detached. The generated-path idea is useful for building our two layered sine paths once, at build time or on mount.
- **Informs:** `ui/Wave` and the Hero water level, and the reduced-motion behaviour there.
- **Not adopted:** the custom-element runtime. Our wave is two fixed paths with a looping x-translate, which costs less than a library.

## 5. f820602h/vue-surf (MIT) — SVG waves
- **Reviewed:** repo layout and description only (a Vue component for animated SVG waves). Source not read in depth.
- **Teaches:** a wave as a small, parameterised component (amplitude, frequency, speed, layers). Layering several waves at different speeds gives depth cheaply.
- **Informs:** `ui/Wave` parameter design, and the choice of two layers on desktop and one on mobile.

## Considered and dropped
- `Cuberto/scroll-sequence-demo`: no licence, last updated 2022, and image-sequence scrubbing is heavier than our SVG-only brief allows.
- Many other "gsap scrolltrigger" repos returned by search have no licence and little relevance.

## Gap to close in Phase 2
None of these is a water-level-inside-a-shape demo. The Hero (water rising inside the drop, then filling the viewport) will be built from the ideas above plus a `clipPath` or mask approach. A CodePen or two on "SVG liquid fill" would be worth a look then, with licences checked first.
