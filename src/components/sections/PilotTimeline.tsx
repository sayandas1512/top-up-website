"use client";

import { useRef } from "react";
import { gsap } from "@/components/motion/registerGsap";
import { useGsapWhenIdle } from "@/components/motion/useGsapWhenIdle";
import { copy } from "@/content/copy";

/** Season 1, After one year, Season 2. A line draws as you scroll; each step fades up once. Final state is the default markup. */
export default function PilotTimeline() {
  const root = useRef<HTMLOListElement>(null);

  useGsapWhenIdle(() => {
      const el = root.current;
      if (!el) return;
      const line = el.querySelector("[data-line]");
      const steps = gsap.utils.toArray<HTMLElement>("[data-step]", el);
      const mm = gsap.matchMedia();

      mm.add(
        {
          wide: "(min-width: 640px) and (prefers-reduced-motion: no-preference)",
          narrow: "(max-width: 639px) and (prefers-reduced-motion: no-preference)",
        },
        (ctx) => {
          const wide = !!ctx.conditions?.wide;
          const scrollTrigger = { trigger: el, start: "top 80%", end: "bottom 60%", scrub: true };
          gsap.fromTo(line, wide ? { scaleX: 0 } : { scaleY: 0 }, { scaleX: 1, scaleY: 1, ease: "none", scrollTrigger });
          steps.forEach((s, i) => {
            gsap.fromTo(
              s,
              { opacity: 0, y: 18 },
              { opacity: 1, y: 0, duration: 0.5, ease: "power2.out", scrollTrigger: { trigger: s, start: "top 88%", once: true }, delay: wide ? i * 0.1 : 0 },
            );
          });
        },
      );
      return () => mm.revert();
    }, root);

  return (
    <ol ref={root} className="relative grid gap-8 sm:grid-cols-3 sm:gap-6">
      {/* Connecting line: horizontal on wide screens, vertical on narrow ones. Drawn by transform only. */}
      <span
        data-line
        aria-hidden="true"
        className="absolute left-[11px] top-3 h-[calc(100%-1.5rem)] w-0.5 origin-top bg-navy/30 sm:left-3 sm:right-3 sm:top-[11px] sm:h-0.5 sm:w-auto sm:origin-left"
      />
      {copy.pilot.timeline.map((t, i) => (
        <li key={t.when} data-step className="relative pl-9 sm:pl-0 sm:pt-9">
          <span
            aria-hidden="true"
            className="absolute left-0 top-0 flex size-6 items-center justify-center rounded-full bg-navy text-xs font-bold text-sand"
          >
            {i + 1}
          </span>
          <h3 className="font-display text-h3 font-bold">{t.when}</h3>
          <p className="mt-1">{t.text}</p>
        </li>
      ))}
    </ol>
  );
}
