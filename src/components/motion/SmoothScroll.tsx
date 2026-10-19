"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "./registerGsap";

/**
 * Lenis smooth scroll driven by the GSAP ticker, so ScrollTrigger and Lenis share one clock.
 * Not created at all under prefers-reduced-motion; native scroll is used instead.
 */
export default function SmoothScroll() {
  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const lenis = new Lenis();
      const onTick = (time: number) => lenis.raf(time * 1000);

      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add(onTick);
      gsap.ticker.lagSmoothing(0);

      return () => {
        gsap.ticker.remove(onTick);
        lenis.destroy();
      };
    });

    // Fonts change layout, so trigger positions must be measured again once they load.
    let cancelled = false;
    document.fonts.ready.then(() => {
      if (!cancelled) ScrollTrigger.refresh();
    });

    return () => {
      cancelled = true;
      mm.revert();
    };
  }, []);

  return null;
}
