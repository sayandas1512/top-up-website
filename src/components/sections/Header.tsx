"use client";

import { useEffect, useRef, useState } from "react";
import Button from "@/components/ui/Button";
import Drop from "@/components/ui/Drop";
import { copy } from "@/content/copy";

/**
 * Sticky header. It becomes a compact bar once the page scrolls past a sentinel at the top.
 * Only transform and opacity change, and the header height is fixed, so nothing below it moves.
 */
export default function Header() {
  const sentinel = useRef<HTMLDivElement>(null);
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    const el = sentinel.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setCompact(!entry.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <>
      <div ref={sentinel} aria-hidden="true" className="pointer-events-none absolute top-0 h-12 w-px" />
      <header
        data-compact={compact}
        className="group sticky top-0 z-40 h-[var(--header-h)]"
      >
        {/* Backdrop fades in when compact. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-sand/95 opacity-0 shadow-[0_1px_0_rgba(11,37,69,0.12)] transition-opacity duration-200 group-data-[compact=true]:opacity-100"
        />
        <div className="container-page relative flex h-full items-center justify-between gap-3">
          <a href="#top" aria-label="Top Up, back to top" className="flex items-center origin-left transition-transform duration-200 group-data-[compact=true]:scale-90">
            <Drop size={36} />
            <span className="ml-2 hidden whitespace-nowrap font-display text-xl font-bold sm:inline">Top Up</span>
          </a>
          <nav aria-label="Main" className="flex items-center gap-2 sm:gap-4">
            {/* Hidden on the narrowest phones so the primary button fits; the link is also in the hero and footer. */}
            <a
              href="#find"
              className="hidden min-h-11 items-center px-2 font-semibold underline-offset-4 hover:underline sm:inline-flex"
            >
              {copy.hero.ctaSecondary}
            </a>
            <Button href="#join" className="text-[0.95rem] sm:text-base">
              {copy.hero.ctaPrimary}
            </Button>
          </nav>
        </div>
      </header>
    </>
  );
}
