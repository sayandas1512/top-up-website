"use client";

import { useEffect, useId, useRef, useState } from "react";
import { gsap, useGSAP } from "@/components/motion/registerGsap";
import Button from "@/components/ui/Button";
import { DROP_PATH } from "@/components/ui/Drop";
import { copy } from "@/content/copy";
import { BottleForm } from "./LeadForms";

const BODY = "M62 56h36v16c0 10 24 14 24 36v176a14 14 0 0 1-14 14H52a14 14 0 0 1-14-14V108c0-22 24-26 24-36Z";

/**
 * Reusable metal bottle with the Top Up mark. Default markup is the finished state; GSAP lifts it in and
 * sweeps a highlight across once when it scrolls into view. Reduced motion never enters the block.
 */
function BottleArt() {
  const root = useRef<SVGSVGElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const scrollTrigger = { trigger: el, start: "top 80%", once: true };
        gsap.fromTo(el.querySelector("[data-bottle-art]"), { y: 28, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: "power2.out", scrollTrigger });
        gsap.fromTo(el.querySelector("[data-sweep]"), { x: -40 }, { x: 150, duration: 1.2, ease: "power1.inOut", delay: 0.5, scrollTrigger });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <svg
      ref={root}
      viewBox="0 0 160 320"
      role="img"
      aria-label={copy.bottle.illustrationAlt}
      className="h-auto w-full max-w-[200px] md:max-w-[240px]"
    >
      <defs>
        <clipPath id="bottle-art-clip">
          <path d={BODY} />
        </clipPath>
        <linearGradient id="bottle-metal" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="var(--navy)" stopOpacity="0.16" />
          <stop offset="0.35" stopColor="#fff" stopOpacity="0.75" />
          <stop offset="1" stopColor="var(--navy)" stopOpacity="0.2" />
        </linearGradient>
      </defs>
      <g data-bottle-art className="origin-bottom [transform-box:fill-box] motion-safe:animate-[bob_6s_ease-in-out_infinite]">
        {/* Cap */}
        <rect x="56" y="10" width="48" height="30" rx="7" fill="var(--navy)" />
        <rect x="62" y="40" width="36" height="16" fill="var(--navy)" opacity="0.85" />
        {/* Body */}
        <path d={BODY} fill="url(#bottle-metal)" />
        <g clipPath="url(#bottle-art-clip)">
          <rect x="38" y="104" width="84" height="7" fill="var(--navy)" opacity="0.85" />
          {/* One-off highlight sweep. Sits off screen when finished. */}
          <rect data-sweep x="-40" y="40" width="22" height="300" fill="#fff" opacity="0.55" transform="skewX(-12)" />
        </g>
        <path d={BODY} fill="none" stroke="var(--navy)" strokeWidth="3" strokeLinejoin="round" />
        {/* Top Up mark */}
        <g transform="translate(46 150) scale(0.68)">
          <path d={DROP_PATH} fill="var(--drop)" stroke="var(--navy)" strokeWidth="4" strokeLinejoin="round" />
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
        </g>
      </g>
    </svg>
  );
}

export default function Bottle() {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const firstField = `${panelId}-interest`.replace(/:/g, "");
  const first = useRef(true);

  // Move focus into the form when it opens, so keyboard and screen-reader users land in it.
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    if (open) document.getElementById(firstField)?.focus();
  }, [open, firstField]);

  return (
    <section id="bottle" aria-labelledby="bottle-heading" className="bg-navy/[0.04] py-[var(--space-section)]">
      <div className="container-page grid items-start gap-10 md:grid-cols-[minmax(0,300px)_1fr] md:gap-16">
        <div className="flex justify-center md:justify-start">
          <BottleArt />
        </div>

        <div className="max-w-2xl">
          <h2 id="bottle-heading" className="text-h2 font-bold">
            {copy.bottle.heading}
          </h2>
          <p className="mt-4 text-lead">{copy.bottle.intro}</p>

          <ul className="mt-6 grid gap-2">
            {copy.bottle.benefits.map((b) => (
              <li key={b} className="flex items-start gap-3">
                <span aria-hidden="true" className="mt-2 block size-2 shrink-0 rounded-full bg-drop" />
                {b}
              </li>
            ))}
          </ul>

          <p className="mt-8 font-display text-h3 font-bold leading-tight">{copy.bottle.pricing}</p>
          <p className="mt-1">{copy.bottle.details}</p>

          <div className="mt-6">
            <Button aria-expanded={open} aria-controls={panelId} onClick={() => setOpen((v) => !v)}>
              {copy.bottle.cta}
            </Button>
          </div>

          {open ? (
            <div id={panelId} role="group" aria-labelledby={`${panelId}-h`} className="mt-8 rounded-3xl border-2 border-navy p-6">
              <h3 id={`${panelId}-h`} className="font-display text-h3 font-bold">
                {copy.bottle.formHeading}
              </h3>
              <div className="mt-5">
                <BottleForm firstFieldId={firstField} />
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
