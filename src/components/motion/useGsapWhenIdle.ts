"use client";

import { useEffect, type RefObject } from "react";
import { gsap } from "./registerGsap";

/**
 * Like useGSAP, but the setup runs when the browser is idle instead of during hydration. Each section's setup
 * then lands in its own short task, so a page with many animated sections never blocks the main thread in one
 * long task. Use it for anything below the fold; the hero sets up immediately.
 *
 * `setup` may return a cleanup function. Everything created inside is scoped to `scope` and reverted on unmount.
 */
export function useGsapWhenIdle(
  setup: () => void | (() => void),
  scope: RefObject<Element | null>,
  deps: readonly unknown[] = [],
) {
  useEffect(() => {
    const el = scope.current;
    if (!el) return;

    let ctx: gsap.Context | undefined;
    let cleanup: void | (() => void);
    const run = () => {
      ctx = gsap.context(() => {
        cleanup = setup();
      }, el);
    };

    const idle = typeof window.requestIdleCallback === "function";
    const handle = idle ? window.requestIdleCallback(run, { timeout: 1500 }) : window.setTimeout(run, 0);

    return () => {
      if (idle) window.cancelIdleCallback(handle);
      else window.clearTimeout(handle);
      if (typeof cleanup === "function") cleanup();
      ctx?.revert();
    };
    // `setup` is recreated every render; the caller controls when to re-run through `deps`.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
