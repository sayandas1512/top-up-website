"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/components/motion/registerGsap";
import Button from "@/components/ui/Button";
import { DROP_PATH } from "@/components/ui/Drop";
import { BOTTLE } from "@/components/ui/paths";
import Wave from "@/components/ui/Wave";
import { copy } from "@/content/copy";

const WORDS = copy.hero.h1.split(" ");

// Outlined "ghost" bottles around the drop. They dissolve as the water rises: the bottle that never exists.
const GHOSTS = [
  { left: "7%", top: "24%", w: 38, rot: -14, small: true },
  { left: "20%", top: "64%", w: 30, rot: 10, small: false },
  { left: "31%", top: "10%", w: 26, rot: 18, small: false },
  { left: "69%", top: "12%", w: 30, rot: -10, small: false },
  { left: "80%", top: "58%", w: 40, rot: 12, small: true },
  { left: "90%", top: "26%", w: 28, rot: -18, small: true },
];

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
          const ghosts = qa("[data-ghost]");
          const floats = qa("[data-float]");
          const rings = qa("[data-ring]");
          const bubbles = qa("[data-bubble]");

          // Looping wave drift. Only transform. Paused while the hero is off screen.
          const drifts = [
            gsap.to(section.querySelector('[data-wave="1"]'), { xPercent: -50, duration: 5, ease: "none", repeat: -1 }),
          ];
          const back = section.querySelector('[data-wave="2"]');
          if (isDesktop && back) {
            drifts.push(gsap.fromTo(back, { xPercent: -50 }, { xPercent: 0, duration: 8, ease: "none", repeat: -1 }));
          }
          // Ghost bottles drift gently; bubbles rise inside the water. Both pause with the waves when off screen.
          drifts.push(
            gsap.to(floats, {
              y: "random(-10, 10)",
              rotation: "random(-6, 6)",
              duration: "random(2.4, 4)",
              ease: "sine.inOut",
              repeat: -1,
              yoyo: true,
            }),
          );
          bubbles.forEach((b) => {
            drifts.push(
              gsap.fromTo(
                b,
                { yPercent: 0, opacity: 0 },
                {
                  keyframes: { yPercent: [0, -420, -900], opacity: [0, 0.8, 0], easeEach: "none" },
                  duration: "random(2.2, 3.6)",
                  delay: "random(0, 2.5)",
                  ease: "none",
                  repeat: -1,
                },
              ),
            );
          });

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
            // The bottles that "never exist": each fades and shrinks away as the water rises.
            .fromTo(ghosts, { opacity: 1, scale: 1, y: 0 }, { opacity: 0, scale: 0.6, y: -28, duration: 0.2, stagger: 0.07 }, 0.15)
            // Ripples leave the drop as the screen fills.
            .fromTo(
              rings,
              { scale: 0.7, opacity: 0 },
              { scale: 2.6, keyframes: { opacity: [0, 0.45, 0] }, duration: 0.3, stagger: 0.07 },
              0.5,
            )
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
      className="relative isolate -mt-[var(--header-h)] flex min-h-svh flex-col items-center justify-center overflow-hidden px-[var(--gutter)] pb-6 pt-[calc(var(--header-h)+0.5rem)] text-center sm:pb-10"
    >
      {/* Ghost bottles. Hidden under reduced motion, where the hero shows its filled end state. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 motion-reduce:hidden">
        {GHOSTS.map((g, i) => (
          <span
            key={i}
            data-ghost
            className={`absolute block ${g.small ? "max-sm:hidden" : ""}`}
            style={{ left: g.left, top: g.top, width: g.w, transform: `rotate(${g.rot}deg)` }}
          >
            <svg data-float viewBox="26 4 58 122" className="h-auto w-full" focusable="false">
              <path d={BOTTLE} fill="none" stroke="var(--navy)" strokeOpacity="0.4" strokeWidth="3" strokeDasharray="6 6" strokeLinejoin="round" />
            </svg>
          </span>
        ))}
      </div>

      <div className="relative z-10 flex w-full max-w-4xl flex-col items-center">
        {/* The drop: outline, water clipped to the drop shape, and the mark's text. */}
        <div
          data-drop
          className="relative shrink-0"
          style={{ width: "clamp(110px, 19svh, 280px)", aspectRatio: "100 / 124" }}
        >
          {/* Expanding fill: a blue circle scaled up from the middle of the drop body. Final state (scale 1) is the
              whole screen blue. 220vmax is enough to reach every corner from the drop. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-[66%] -z-10 -translate-x-1/2 -translate-y-1/2"
          >
            <div data-fill className="aspect-square w-[220vmax] shrink-0 rounded-full bg-drop" />
          </div>

          <svg width="0" height="0" aria-hidden="true" className="absolute" focusable="false">
            <defs>
              <clipPath id="hero-drop-clip" clipPathUnits="objectBoundingBox">
                <path d={DROP_PATH} transform="scale(0.01 0.0080645)" />
              </clipPath>
            </defs>
          </svg>

          {/* Ripples that leave the drop as the screen fills. Invisible until the timeline plays them. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-[66%] w-[130%] -translate-x-1/2 -translate-y-1/2"
          >
            {[0, 1, 2].map((i) => (
              <div key={i} data-ring className="absolute inset-0 aspect-square rounded-full border-2 border-navy opacity-0" />
            ))}
            <div className="aspect-square" />
          </div>

          <div className="absolute inset-0 [clip-path:url(#hero-drop-clip)]" aria-hidden="true">
            <div data-water className="absolute inset-0">
              <Wave className="absolute inset-x-0 bottom-full h-[9%]" />
              <div className="absolute inset-0 bg-drop" />
              {/* Bubbles rise through the water. Invisible until GSAP starts them. */}
              {[22, 38, 55, 70, 46].map((x, i) => (
                <span
                  key={i}
                  data-bubble
                  className="absolute bottom-[8%] block size-2 rounded-full bg-sand/70 opacity-0"
                  style={{ left: `${x}%` }}
                />
              ))}
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

        <h1 id="hero-heading" className="mt-4 text-h1 font-bold sm:mt-6">
          {WORDS.map((word, i) => (
            <span key={i}>
              <span data-word className="inline-block">
                {word}
              </span>
              {i < WORDS.length - 1 ? " " : null}
            </span>
          ))}
        </h1>

        <p data-reveal className="mt-4 max-w-2xl text-lead sm:mt-5">
          {copy.hero.sub}
        </p>
        <div data-reveal className="mt-5 flex sm:mt-7 flex-wrap items-center justify-center gap-3">
          <Button href="#join">{copy.hero.ctaPrimary}</Button>
          <Button href="#find" variant="secondary">
            {copy.hero.ctaSecondary}
          </Button>
        </div>
      </div>
    </section>
  );
}
