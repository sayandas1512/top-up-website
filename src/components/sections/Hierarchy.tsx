"use client";

import { useRef } from "react";
import { gsap } from "@/components/motion/registerGsap";
import { useGsapWhenIdle } from "@/components/motion/useGsapWhenIdle";
import { copy } from "@/content/copy";

/**
 * Rethink > Reduce > Reuse > Recycle as a ladder. "Reduce" is highlighted by an underline that is
 * scrubbed with scroll. The underline is fully drawn by default; GSAP sets the empty start state.
 */
export default function Hierarchy() {
  const root = useRef<HTMLElement>(null);

  useGsapWhenIdle(() => {
      const el = root.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          el.querySelector("[data-underline]"),
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: "none",
            scrollTrigger: { trigger: el, start: "top 75%", end: "top 35%", scrub: true },
          },
        );
      });
      return () => mm.revert();
    }, root);

  return (
    <section ref={root} id="hierarchy" aria-labelledby="hierarchy-heading" className="py-[var(--space-section)]">
      <div className="container-page">
        <h2 id="hierarchy-heading" className="sr-only">
          {copy.hierarchy.steps.join(", ")}
        </h2>
        <ol className="grid gap-3 sm:grid-cols-4 sm:gap-4">
          {copy.hierarchy.steps.map((step, i) => {
            const isReduce = step === "Reduce";
            return (
              <li
                key={step}
                // Each step sits a little lower than the last, so the row reads as a ladder going down.
                style={{ ["--step" as string]: i }}
                className="sm:mt-[calc(var(--step)*1.25rem)]"
              >
                <span className="block text-sm font-semibold opacity-70">{i + 1}</span>
                <span
                  className={`relative inline-block font-display text-h2 font-bold ${isReduce ? "" : "opacity-60"}`}
                >
                  {step}
                  {isReduce ? (
                    <span
                      data-underline
                      aria-hidden="true"
                      className="absolute -bottom-1 left-0 h-1.5 w-full origin-left rounded bg-amber will-change-transform"
                    />
                  ) : null}
                </span>
              </li>
            );
          })}
        </ol>
        <p className="mt-12 max-w-2xl text-lead sm:mt-20">{copy.hierarchy.line}</p>
      </div>
    </section>
  );
}
