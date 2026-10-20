"use client";

import { useRef } from "react";
import { gsap } from "@/components/motion/registerGsap";
import { useGsapWhenIdle } from "@/components/motion/useGsapWhenIdle";
import { DROP_PATH } from "@/components/ui/Drop";
import { BOTTLE, sinePath } from "@/components/ui/paths";
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


/** Beat 1: one drop pours into a bottle, two more drops appear beside it. */
export function WaterVisual() {
  const root = useRef<SVGSVGElement>(null);

  useGsapWhenIdle(() => {
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
          .fromTo(extras, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, stagger: 0.18, ease: "back.out(2)" }, 1.0);
      });
      return () => mm.revert();
    }, root);

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
      <g transform="translate(118 20)">
        <g data-extra style={{ transformBox: "fill-box", transformOrigin: "center" }}>
          <g transform="scale(0.34)">
            <DropShape />
          </g>
        </g>
      </g>
      <g transform="translate(152 60)">
        <g data-extra style={{ transformBox: "fill-box", transformOrigin: "center" }}>
          <g transform="scale(0.34)">
            <DropShape />
          </g>
        </g>
      </g>
    </svg>
  );
}

/** Beat 2: bottled vs treated tap, drawn to scale from the sourced range. */
export function EnergyBars() {
  const root = useRef<HTMLDivElement>(null);

  useGsapWhenIdle(() => {
      const el = root.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.fromTo(
          el.querySelector("[data-bottled]"),
          { scaleX: 0 },
          { scaleX: 1, duration: 1.2, ease: "power2.out", scrollTrigger: { trigger: el, start: ENTER, once: true } },
        );
      });
      return () => mm.revert();
    }, root);

  // 5.6 and 10.2 MJ per litre, as fractions of the 10.2 maximum.
  const solid = (5.6 / 10.2) * 100;

  return (
    <div ref={root} className="w-full max-w-md">
      <p className="text-[0.95em] font-semibold">{copy.energy.bottledLabel}</p>
      <div className="mt-2 h-8 w-full">
        <div data-bottled className="flex h-full origin-left will-change-transform">
          <div className="h-full rounded-l bg-drop" style={{ width: `${solid}%` }} />
          {/* The lighter section is the rest of the sourced range, up to 10.2. */}
          <div className="h-full rounded-r bg-drop/45" style={{ width: `${100 - solid}%` }} />
        </div>
      </div>
      <p className="mt-5 text-[0.95em] font-semibold">{copy.energy.tapLabel}</p>
      <div className="mt-2 h-8 w-full">
        <div className="h-full w-1 rounded bg-navy" />
      </div>
      <p className="mt-4 font-semibold">{copy.energy.ratio}</p>
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
