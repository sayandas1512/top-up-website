"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Renders its children once it is within `rootMargin` of the viewport, or shortly after the page has loaded,
 * whichever comes first. That keeps below-the-fold code (form validation, for example) out of the critical first
 * load, while the "or shortly after" means a keyboard user, who can Tab past it without ever scrolling near it,
 * can still reach what is inside. The box keeps a minimum height until then, so nothing shifts.
 */
export default function WhenNear({
  children,
  minHeight,
  rootMargin = "800px 0px",
}: {
  children: ReactNode;
  minHeight: number;
  rootMargin?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNear(true);
          io.disconnect();
        }
      },
      { rootMargin },
    );
    io.observe(el);

    // Not near yet? Mount anyway a moment after load, when the browser is idle.
    let idleHandle: number | undefined;
    const timer = window.setTimeout(() => {
      const mount = () => setNear(true);
      if (typeof window.requestIdleCallback === "function") idleHandle = window.requestIdleCallback(mount);
      else mount();
    }, 2500);

    return () => {
      io.disconnect();
      window.clearTimeout(timer);
      if (idleHandle !== undefined) window.cancelIdleCallback(idleHandle);
    };
  }, [rootMargin]);

  return (
    <div ref={ref} style={near ? undefined : { minHeight }}>
      {near ? children : null}
    </div>
  );
}
