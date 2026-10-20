"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Renders its children only once it is within `rootMargin` of the viewport. Used to keep below-the-fold code
 * (form validation, for example) out of the first load. The box keeps a minimum height until then, so
 * nothing shifts when the content arrives.
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
    return () => io.disconnect();
  }, [rootMargin]);

  return (
    <div ref={ref} style={near ? undefined : { minHeight }}>
      {near ? children : null}
    </div>
  );
}
