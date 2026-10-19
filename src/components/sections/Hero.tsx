"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/components/motion/registerGsap";
import Button from "@/components/ui/Button";
import { DROP_PATH } from "@/components/ui/Drop";
import Wave from "@/components/ui/Wave";
import { copy } from "@/content/copy";

const WORDS = copy.hero.h1.split(" ");

/**
 * Hero ("Fill it up"). The default markup is the FINAL state: drop full, headline readable, screen blue.
 * GSAP sets the hidden starting states and scrubs them while the section is pinned.
 * Reduced motion: nothing below runs, so the final state simply stays.
 */
export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = root.current;
      if (!section) return;
      const q = (sel: string) => section.querySelector<HTMLElement>(sel)!;
      const qa = (sel: string) => gsap.utils.toArray<HTMLElement>(sel, section);

      const mm = gsap.matchMedia();

      mm.add(
        {
          desktop: "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
          mobile: "(max-width: 767px) and (prefers-reduced-motion: no-preference)",
        },
        (ctx) => {
          const isDesktop = !!ctx.conditions?.desktop;
          const water = q("[data-water]");
          const fill = q("[data-fill]");
          const drop = q("[data-drop]");
          const words = qa("[data-word]");
          const reveal = qa("[data-reveal]");

          // Looping wave drift. Only transform. Paused while the hero is off screen.
          const drifts = [
            gsap.to(section.querySelector('[data-wave="1"]'), { xPercent: -50, duration: 5, ease: "none", repeat: -1 }),
          ];
          const back = section.querySelector('[data-wave="2"]');
          if (isDesktop && back) {
            drifts.push(gsap.fromTo(back, { xPercent: -50 }, { xPercent: 0, duration: 8, ease: "none", repeat: -1 }));
          }
          ScrollTrigger.create({
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            onToggle: (self) => drifts.forEach((d) => (self.isActive ? d.play() : d.pause())),
          });

          // The fill circle is 150vmax wide; start it just inside the drop body.
          const startScale = () => Math.max(0.02, (drop.offsetWidth * 0.5) / fill.offsetWidth);

          const tl = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: isDesktop ? "+=150%" : "+=100%",
              pin: true,
              scrub: 0.5,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });

          tl.fromTo(water, { yPercent: 110 }, { yPercent: 0, duration: 0.55 }, 0)
            .fromTo(words, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.12, stagger: 0.045 }, 0.1)
            .fromTo(fill, { scale: startScale, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.35 }, 0.5)
            .fromTo(reveal, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.15 }, 0.85);
        },
      );

      // Fonts change line breaks and heights, so measure again once they are ready.
      document.fonts.ready.then(() => ScrollTrigger.refresh());

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="hero"
      aria-labelledby="hero-heading"
      className="relative isolate flex min-h-svh flex-col items-center justify-center overflow-hidden px-[var(--gutter)] pb-10 pt-[calc(var(--header-h)+1rem)] text-center"
    >
      {/* Expanding fill: a blue circle scaled up from the drop. Final state = scale 1 = whole screen blue. */}
      <div className="absolute inset-0 -z-10 flex items-center justify-center" aria-hidden="true">
        <div
          data-fill
          className="aspect-square w-[150vmax] shrink-0 rounded-full bg-drop will-change-transform"
        />
      </div>

      <div className="relative z-10 flex w-full max-w-4xl flex-col items-center">
        {/* The drop: outline, water clipped to the drop shape, and the mark's text. */}
        <div
          data-drop
          className="relative shrink-0"
          style={{ width: "clamp(120px, 22svh, 280px)", aspectRatio: "100 / 124" }}
        >
          <svg width="0" height="0" aria-hidden="true" className="absolute" focusable="false">
            <defs>
              <clipPath id="hero-drop-clip" clipPathUnits="objectBoundingBox">
                <path d={DROP_PATH} transform="scale(0.01 0.0080645)" />
              </clipPath>
            </defs>
          </svg>

          <div className="absolute inset-0 [clip-path:url(#hero-drop-clip)]" aria-hidden="true">
            <div data-water className="absolute inset-0 will-change-transform">
              <Wave className="absolute inset-x-0 bottom-full h-[9%]" />
              <div className="absolute inset-0 bg-drop" />
            </div>
          </div>

          <svg viewBox="0 0 100 124" className="absolute inset-0 h-full w-full" focusable="false" aria-hidden="true">
            <path d={DROP_PATH} fill="none" stroke="var(--navy)" strokeWidth="2.5" strokeLinejoin="round" />
            <text
              x="50"
              y="88"
              textAnchor="middle"
              fontSize="19"
              fontWeight="700"
              fill="var(--navy)"
              style={{ fontFamily: "var(--ff-display)" }}
            >
              top up
            </text>
          </svg>
        </div>

        <h1 id="hero-heading" className="mt-6 text-h1 font-bold">
          {WORDS.map((word, i) => (
            <span key={i}>
              <span data-word className="inline-block">
                {word}
              </span>
              {i < WORDS.length - 1 ? " " : null}
            </span>
          ))}
        </h1>

        <p data-reveal className="mt-5 max-w-2xl text-lead">
          {copy.hero.sub}
        </p>
        <div data-reveal className="mt-7 flex flex-wrap items-center justify-center gap-3">
          <Button href="#join">{copy.hero.ctaPrimary}</Button>
          <Button href="#find" variant="secondary">
            {copy.hero.ctaSecondary}
          </Button>
        </div>
      </div>
    </section>
  );
}
