"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/components/motion/registerGsap";
import Lamp from "@/components/ui/Lamp";
import { DROP_PATH } from "@/components/ui/Drop";
import { copy } from "@/content/copy";

/**
 * Three steps under a swaying cane lamp. The lamp's drop glows amber while step 1 is active, and each step's own
 * drop badge lights up while that step is active. The sway has two parts so they never fight over `rotation`:
 * an outer idle swing and an inner swing driven by scroll velocity (gsap.quickTo).
 * Reduced motion keeps the highlight (an opacity change) but drops all swaying.
 */
export default function HowItWorks() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = root.current;
      if (!section) return;
      const q = (sel: string) => section.querySelector<HTMLElement>(sel)!;
      const steps = gsap.utils.toArray<HTMLElement>("[data-how-step]", section);
      const badges = gsap.utils.toArray<HTMLElement>("[data-badge-amber]", section);
      const lampLit = [q("[data-lamp-glow]"), q("[data-lamp-amber]")];

      // Which step is active: light its badge, and light the lamp while step 1 is active.
      const apply = (active: number) => {
        badges.forEach((b, i) => gsap.to(b, { opacity: i === active ? 1 : 0, duration: 0.3, overwrite: true }));
        gsap.to(lampLit, { opacity: (i: number) => (active === 0 ? (i === 0 ? 0.45 : 1) : 0), duration: 0.3, overwrite: true });
      };
      apply(-1);

      steps.forEach((s, i) => {
        ScrollTrigger.create({
          trigger: s,
          start: "top 65%",
          end: "bottom 45%",
          onToggle: (self) => self.isActive && apply(i),
        });
      });
      ScrollTrigger.create({ trigger: section, start: "top 80%", onLeaveBack: () => apply(-1) });

      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const idle = q("[data-idle]");
        const sway = q("[data-sway]");
        gsap.set([idle, sway], { transformOrigin: "50% 0%" });

        gsap.fromTo(idle, { rotation: -2.2 }, { rotation: 2.2, duration: 3.2, ease: "sine.inOut", yoyo: true, repeat: -1 });

        const swayTo = gsap.quickTo(sway, "rotation", { duration: 0.9, ease: "power3.out" });
        const settle = gsap.delayedCall(0.12, () => swayTo(0)).pause();
        ScrollTrigger.create({
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          onUpdate: (self) => {
            swayTo(gsap.utils.clamp(-12, 12, self.getVelocity() / -300));
            settle.restart(true);
          },
        });
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} id="how" aria-labelledby="how-heading" className="relative overflow-hidden py-[var(--space-section)]">
      {/* The lamp hangs from the top edge of the section. */}
      <div aria-hidden="true" className="pointer-events-none absolute right-[6%] top-0 z-0 md:right-[12%]">
        <div data-idle>
          <div data-sway>
            <div className="mx-auto h-10 w-0.5 bg-navy sm:h-16 md:h-20" />
            <Lamp className="w-[84px] sm:w-[110px] md:w-[130px]" />
          </div>
        </div>
      </div>

      <div className="container-page relative z-10">
        <h2 id="how-heading" className="text-h2 font-bold">
          {copy.howItWorks.heading}
        </h2>

        <ol className="mt-24 grid max-w-xl gap-10 sm:mt-28 md:mt-16">
          {copy.howItWorks.steps.map((step) => (
            <li key={step.n} data-how-step className="flex items-start gap-5">
              <svg viewBox="0 0 100 124" className="mt-1 w-12 shrink-0" aria-hidden="true" focusable="false">
                <path d={DROP_PATH} fill="var(--drop)" />
                <path data-badge-amber d={DROP_PATH} fill="var(--amber)" opacity="0" />
                <text
                  x="50"
                  y="92"
                  textAnchor="middle"
                  fontSize="46"
                  fontWeight="700"
                  fill="var(--navy)"
                  style={{ fontFamily: "var(--ff-display)" }}
                >
                  {step.n}
                </text>
              </svg>
              <div>
                <h3 className="font-display text-h3 font-bold">{step.title}</h3>
                {step.text ? <p className="mt-1 text-lead">{step.text}</p> : null}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
