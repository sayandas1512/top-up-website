"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useRef, useState } from "react";
import { copy } from "@/content/copy";

// MapLibre (about 200 KB) is imported only inside this dynamic chunk, which is requested only once the
// section is near the viewport. Nothing from it is in the initial bundle.
const MapView = dynamic(() => import("./MapView"), { ssr: false });

export default function MapLoader() {
  const holder = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(false);
  const [failed, setFailed] = useState(false);
  const onFail = useCallback(() => setFailed(true), []);

  useEffect(() => {
    const el = holder.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNear(true);
          io.disconnect();
        }
      },
      { rootMargin: "600px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    // Fixed height from the start, so the map arriving never shifts the page.
    <div ref={holder} className="relative h-[360px] overflow-hidden rounded-3xl border-2 border-navy bg-drop/20 sm:h-[440px]">
      {failed ? (
        <p className="grid h-full place-items-center px-6 text-center font-semibold">{copy.find.mapError}</p>
      ) : near ? (
        <MapView onFail={onFail} />
      ) : null}
    </div>
  );
}
