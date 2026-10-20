"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/components/motion/registerGsap";
import { DROP_PATH } from "@/components/ui/Drop";
import { BOTTLE, sinePath } from "@/components/ui/paths";
import Cite from "@/components/ui/Cite";
import { copy } from "@/content/copy";

// Every visual's default markup is its final state. GSAP sets the starting state and plays once
// when the visual scrolls into view. Reduced motion never enters the matchMedia block.
const MOTION_OK = "(prefers-reduced-motion: no-preference)";
const ENTER = "top 80%";

function DropShape({ className, ...rest }: { className?: string } & React.SVGProps<SVGGElement>) {
  return (
    <g className={className} {...rest}>
      <path d={DROP_PATH} fill="var(--drop)" />
    </g>
  );
}


/** Beat 1: one drop pours into a bottle (1 litre), then 16 more appear beside it: about 17 litres in all. */
export function WaterVisual() {
  const root = useRef<SVGSVGElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const pour = el.querySelector("[data-pour]");
        const level = el.querySelector("[data-level]");
        const bottle = el.querySelector("[data-bottle-body]");
        const extras = el.querySelectorAll("[data-extra]");
        gsap
          .timeline({ scrollTrigger: { trigger: el, start: ENTER, once: true } })
          .fromTo(pour, { y: -34, opacity: 1 }, { y: 30, opacity: 0, duration: 0.7, ease: "power1.in" })
          .fromTo(level, { y: 70 }, { y: 0, duration: 0.5, ease: "power1.out" }, 0.45)
          // The bottle gives a small wobble when the drop lands in it.
          .fromTo(
            bottle,
            { rotation: 0 },
            { keyframes: { rotation: [0, -5, 4, -2, 0] }, svgOrigin: "65 125", duration: 0.7, ease: "sine.inOut" },
            0.55,
          )
          .fromTo(extras, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, stagger: 0.06, ease: "back.out(2)" }, 1.0);
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <svg ref={root} viewBox="0 0 200 130" className="h-auto w-full max-w-[220px]" aria-hidden="true" focusable="false">
      <defs>
        <clipPath id="bottle-clip">
          <path d={BOTTLE} />
        </clipPath>
      </defs>
      <g transform="translate(10 0)">
        <g data-bottle-body>
        <g clipPath="url(#bottle-clip)">
          <g data-level>
            <rect x="20" y="64" width="70" height="70" fill="var(--drop)" />
            {/* Surface: one wave period is 35 units, so sliding it by 35 loops seamlessly. */}
            <path
              d={sinePath(5, 35, 4, 2.5, 64, 68)}
              fill="var(--drop)"
              className="motion-safe:animate-[wave-drift_2.2s_linear_infinite]"
            />
          </g>
        </g>
        <path d={BOTTLE} fill="none" stroke="var(--navy)" strokeWidth="3" strokeLinejoin="round" />
        </g>
        {/* The drop that pours in. It ends faded out, inside the bottle. */}
        <g data-pour opacity="0" transform="translate(55 -2)">
          <g transform="scale(0.14) translate(-50 0)">
            <DropShape />
          </g>
        </g>
      </g>
      {/* The other 16 litres: a 4 by 4 block of drops. */}
      {Array.from({ length: 16 }, (_, i) => (
        <g key={i} transform={`translate(${112 + (i % 4) * 21} ${14 + Math.floor(i / 4) * 27})`}>
          <g data-extra style={{ transformBox: "fill-box", transformOrigin: "center" }}>
            <g transform="scale(0.17)">
              <DropShape />
            </g>
          </g>
        </g>
      ))}
    </svg>
  );
}

/**
 * Beat 2: bottled water in India (7.08 MJ per litre, Tandon et al. 2014), the US range (5.6 to 10.2 MJ, Gleick & Cooley
 * 2009) and a tap marker. All bars share one scale, with 10.2 MJ as the full width.
 */
export function EnergyBars() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.fromTo(
          el.querySelectorAll("[data-grow]"),
          { scaleX: 0 },
          { scaleX: 1, duration: 1.2, ease: "power2.out", stagger: 0.25, scrollTrigger: { trigger: el, start: ENTER, once: true } },
        );
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  const MAX = 10.2;
  const india = (7.08 / MAX) * 100;
  const usFrom = (5.6 / MAX) * 100;

  return (
    <div ref={root} className="w-full max-w-md">
      <p className="text-[0.95em] font-semibold">
        {copy.energy.indiaLabel}
        <Cite id="tandon-india-2014" />
      </p>
      <div className="mt-2 h-8 w-full">
        <div data-grow className="h-full origin-left rounded bg-drop will-change-transform" style={{ width: `${india}%` }} />
      </div>

      <p className="mt-5 text-[0.95em] font-semibold">
        {copy.energy.usLabel}
        <Cite id="gleick-cooley-energy" />
      </p>
      <div className="mt-2 h-8 w-full">
        {/* The US range as a lighter band from 5.6 to 10.2. */}
        <div data-grow className="h-full origin-left will-change-transform" style={{ marginLeft: `${usFrom}%`, width: `${100 - usFrom}%` }}>
          <div className="h-full rounded bg-drop/45" />
        </div>
      </div>

      <p className="mt-5 text-[0.95em] font-semibold">{copy.energy.tapLabel}</p>
      <div className="mt-2 h-8 w-full">
        <div className="h-full w-1 rounded bg-navy" />
      </div>
      <p className="mt-4 font-semibold">
        {copy.energy.ratio}
        <Cite id="gleick-cooley-energy" />
      </p>
      <p className="mt-1 text-[0.9em] opacity-80">{copy.energy.note}</p>
    </div>
  );
}

/** Beat 3: the bottle that is never needed, shown as a dashed outline beside a solid one. */
export function RecyclingVisual() {
  return (
    <svg viewBox="0 0 200 130" className="h-auto w-full max-w-[220px]" aria-hidden="true" focusable="false">
      <g transform="translate(14 0)">
        <path d={BOTTLE} fill="var(--drop)" fillOpacity="0.45" stroke="var(--navy)" strokeWidth="3" strokeLinejoin="round" />
      </g>
      <g transform="translate(104 0)">
        {/* The bottle you never need: it floats, never quite arriving. */}
        <g className="origin-bottom [transform-box:fill-box] motion-safe:animate-[bob_3.6s_ease-in-out_infinite]">
          <path d={BOTTLE} fill="none" stroke="var(--navy)" strokeWidth="3" strokeDasharray="6 7" strokeLinejoin="round" />
        </g>
      </g>
    </svg>
  );
}

// Deterministic ring of tiny dots, so server and client render the same thing.
const RING = Array.from({ length: 44 }, (_, i) => {
  const a = (i / 44) * Math.PI * 2;
  const r = 62 + Math.sin(i * 2.7) * 8;
  return { x: 90 + Math.cos(a) * r, y: 90 + Math.sin(a) * r, s: 1.2 + ((i * 7) % 5) * 0.55 };
});
const SCATTER = Array.from({ length: 18 }, (_, i) => {
  const a = i * 2.399;
  const r = 14 + ((i * 11) % 30);
  return { x: 90 + Math.cos(a) * r, y: 90 + Math.sin(a) * r, s: 1 + ((i * 5) % 3) * 0.5 };
});

/** Beat 4: a slow rotating ring of tiny dots. Rotation is a CSS transform and is off under reduced motion. */
export function OceanRing() {
  return (
    <svg viewBox="0 0 180 180" className="h-auto w-full max-w-[200px]" aria-hidden="true" focusable="false">
      {/* A rolling water line under the ring; the svg edge crops it. */}
      <path
        d={sinePath(-40, 40, 8, 4, 168, 180)}
        fill="var(--drop)"
        fillOpacity="0.35"
        className="motion-safe:animate-[wave-drift_5s_linear_infinite] [--wave-shift:-40px]"
      />
      <g className="origin-center [transform-box:fill-box] motion-safe:animate-[spin_90s_linear_infinite]">
        {RING.map((d, i) => (
          <circle key={`r${i}`} cx={d.x} cy={d.y} r={d.s} fill="var(--navy)" />
        ))}
        {SCATTER.map((d, i) => (
          <circle key={`s${i}`} cx={d.x} cy={d.y} r={d.s} fill="var(--drop)" />
        ))}
      </g>
    </svg>
  );
}
