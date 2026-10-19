"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/components/motion/registerGsap";
import { useReducedMotion } from "@/components/motion/useReducedMotion";

type Props = {
  /** Final value. Always present in the DOM, so it reads correctly without JS or with a screen reader. */
  value: number;
  /** Start value for the count. Use a higher start to count down. */
  from?: number;
  duration?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
};

const fmt = (n: number, decimals: number) => n.toFixed(decimals);

export default function Counter({
  value,
  from = 0,
  duration = 1.6,
  decimals = 0,
  prefix = "",
  suffix = "",
  className,
}: Props) {
  const root = useRef<HTMLSpanElement>(null);
  const live = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();
  const finalText = `${prefix}${fmt(value, decimals)}${suffix}`;

  useGSAP(
    () => {
      if (reduced || !live.current) return;
      const el = live.current;
      const state = { n: from };
      el.textContent = `${prefix}${fmt(from, decimals)}${suffix}`;

      gsap.to(state, {
        n: value,
        duration,
        ease: "power2.out",
        scrollTrigger: { trigger: root.current, start: "top 85%", once: true },
        onUpdate: () => {
          el.textContent = `${prefix}${fmt(state.n, decimals)}${suffix}`;
        },
        onComplete: () => {
          el.textContent = finalText;
        },
      });
    },
    { scope: root, dependencies: [reduced, value, from, duration, decimals, prefix, suffix] },
  );

  return (
    <span ref={root} className={className}>
      {/* Screen readers get the final value only; the animated copy is hidden from them. */}
      <span className="sr-only">{finalText}</span>
      {/* The invisible copy reserves the final width so the count never shifts layout. */}
      <span className="inline-grid tabular-nums" aria-hidden="true">
        <span className="invisible col-start-1 row-start-1">{finalText}</span>
        <span ref={live} className="col-start-1 row-start-1">
          {finalText}
        </span>
      </span>
    </span>
  );
}
