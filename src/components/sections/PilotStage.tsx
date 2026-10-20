"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/components/motion/registerGsap";
import { BOTTLE, sinePath } from "@/components/ui/paths";
import { copy } from "@/content/copy";

const TOTAL = 75; // "about 75 empty bottles daily" (pilot observation)
const START = 0.1; // timeline position where clearing begins
const SPAN = 0.8; // timeline length over which all bottles clear
const STEP = SPAN / TOTAL;

// Fixed shuffle so the order is stable between renders: bottles clear in a scattered, not row-by-row, pattern.
const ORDER = (() => {
  const idx = Array.from({ length: TOTAL }, (_, i) => i);
  let seed = 7;
  for (let i = idx.length - 1; i > 0; i--) {
    seed = (seed * 1664525 + 1013904223) % 4294967296;
    const j = seed % (i + 1);
    [idx[i], idx[j]] = [idx[j], idx[i]];
  }
  return idx; // ORDER[rank] = bottle index cleared at that rank
})();
const RANK_OF = ORDER.reduce<number[]>((acc, bottle, rank) => ((acc[bottle] = rank), acc), []);

const JUG = "M40 10h40v14c0 8 22 10 22 34v80a14 14 0 0 1-14 14H32a14 14 0 0 1-14-14V58c0-24 22-26 22-34Z";

/**
 * Left: 75 empty bottles clear out to zero as you scroll. Right: the 20-litre refill bottle and the two pilot prices.
 * The default markup is the "before" picture so it reads without JS. Under reduced motion, JS jumps straight to "after".
 */
export default function PilotStage() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      const q = (sel: string) => el.querySelector<HTMLElement>(sel)!;
      const bottles = gsap.utils.toArray<HTMLElement>("[data-bottle]", el);
      const count = q("[data-count]");
      const label = q("[data-stage-label]");
      const jug = q("[data-jug]");
      const prices = gsap.utils.toArray<HTMLElement>("[data-price]", el);

      const show = (remaining: number) => {
        count.textContent = String(remaining);
        label.textContent = remaining === 0 ? copy.pilot.afterLabel : copy.pilot.beforeLabel;
      };

      const mm = gsap.matchMedia();

      // Reduced motion: no scrub, no pin. Show the "after" state straight away.
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(bottles, { opacity: 0 });
        show(0);
      });

      mm.add(
        {
          desktop: "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
          mobile: "(max-width: 767px) and (prefers-reduced-motion: no-preference)",
        },
        (ctx) => {
          const isDesktop = !!ctx.conditions?.desktop;
          const tl = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: el,
              start: isDesktop ? "center center" : "top 75%",
              end: isDesktop ? "+=110%" : "bottom 35%",
              pin: isDesktop,
              scrub: 0.6,
              invalidateOnRefresh: true,
            },
            onUpdate: () => {
              // Count follows the bottles that have actually cleared, so number and picture agree.
              const t = tl.time();
              const cleared = Math.min(TOTAL, Math.max(0, Math.floor((t - START - STEP / 2) / STEP) + 1));
              show(TOTAL - cleared);
            },
          });

          bottles.forEach((b, i) => {
            // Each bottle tumbles and lifts as it goes, so clearing reads as "lifted away", not just "deleted".
            const turn = (i % 2 ? 1 : -1) * (14 + ((i * 7) % 18));
            tl.fromTo(
              b,
              { opacity: 1, scale: 1, rotation: 0, y: 0 },
              { opacity: 0, scale: 0.3, rotation: turn, y: -16, duration: STEP * 3 },
              START + RANK_OF[i] * STEP,
            );
          });
          tl.fromTo(jug, { x: 36, opacity: 0 }, { x: 0, opacity: 1, duration: 0.15 }, 0)
            .fromTo(prices[0], { y: 14, opacity: 0 }, { y: 0, opacity: 1, duration: 0.12 }, 0.15)
            .fromTo(prices[1], { y: 14, opacity: 0 }, { y: 0, opacity: 1, duration: 0.12 }, 0.6)
            .set({}, {}, 1); // make the timeline exactly 1 long

          show(TOTAL); // opening state
        },
      );

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <div ref={root} className="grid items-start gap-10 md:grid-cols-[1.5fr_1fr] md:gap-14">
      {/* Before and after: empty bottles per day */}
      <div>
        <svg width="0" height="0" aria-hidden="true" className="absolute" focusable="false">
          <symbol id="pilot-bottle" viewBox="26 4 58 122">
            <path d={BOTTLE} fill="var(--drop)" fillOpacity="0.5" stroke="var(--navy)" strokeWidth="5" strokeLinejoin="round" />
          </symbol>
        </svg>

        <div className="flex items-baseline gap-3">
          <span aria-hidden="true" className="font-display text-h1 font-bold leading-none tabular-nums">
            <span data-count>{TOTAL}</span>
          </span>
          <span aria-hidden="true" data-stage-label className="font-semibold">
            {copy.pilot.beforeLabel}
          </span>
        </div>
        {/* Screen readers get both states at once, not the changing number. */}
        <p className="sr-only">
          About {TOTAL} empty bottles a day before the refill bottle, and none after.
        </p>

        <div
          aria-hidden="true"
          className="mt-6 grid grid-cols-10 gap-x-1 gap-y-2 md:grid-cols-[repeat(15,minmax(0,1fr))]"
        >
          {Array.from({ length: TOTAL }, (_, i) => (
            <span key={i} data-bottle className="block aspect-[58/122] w-full">
              {/* Faint sway that ripples across the columns. Desktop only, and off under reduced motion. */}
              <svg
                viewBox="26 4 58 122"
                className="h-full w-full origin-bottom md:motion-safe:animate-[bob_3.4s_ease-in-out_infinite]"
                style={{ animationDelay: `${(i % 15) * 0.14}s` }}
                focusable="false"
              >
                <use href="#pilot-bottle" />
              </svg>
            </span>
          ))}
        </div>
      </div>

      {/* The refill bottle by the counter, and the two pilot prices */}
      <figure className="m-0">
        <div data-jug>
          <div className="mx-auto w-full max-w-[200px] md:max-w-[220px]">
            <svg
              viewBox="0 0 120 168"
              className="h-auto w-full"
              role="img"
              aria-label={copy.pilot.refillCaption}
            >
              <defs>
                <clipPath id="jug-clip">
                  <path d={JUG} />
                </clipPath>
              </defs>
              {/* Only the bottle bobs; the counter stays put. */}
              <g className="origin-bottom [transform-box:fill-box] motion-safe:animate-[bob_5s_ease-in-out_infinite]">
              <g clipPath="url(#jug-clip)">
                <rect x="0" y="64" width="120" height="110" fill="var(--drop)" />
                {/* Surface slosh: period 40, so sliding by 40 loops seamlessly. */}
                <path
                  d={sinePath(-40, 40, 6, 3, 64, 68)}
                  fill="var(--drop)"
                  className="motion-safe:animate-[wave-drift_2.6s_linear_infinite] [--wave-shift:-40px]"
                />
              </g>
              <path d={JUG} fill="none" stroke="var(--navy)" strokeWidth="3.5" strokeLinejoin="round" />
              <path d="M38 6h44" stroke="var(--navy)" strokeWidth="5" strokeLinecap="round" />
              </g>
              {/* The counter */}
              <rect x="0" y="152" width="120" height="14" rx="3" fill="var(--navy)" />
            </svg>
          </div>
          <figcaption className="mt-3 text-center text-[0.95em]">{copy.pilot.refillCaption}</figcaption>
        </div>

        <ul className="mt-6 grid gap-3">
          {copy.pilot.prices.map((p) => (
            <li key={p.when} data-price className="rounded-2xl border-2 border-navy px-5 py-3">
              <p className="text-[0.9em] font-semibold">{p.when}</p>
              <p className="font-display text-h3 font-bold leading-tight">{p.price}</p>
            </li>
          ))}
        </ul>
      </figure>
    </div>
  );
}
