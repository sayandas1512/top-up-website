"use client";

import { useEffect, useRef, useState } from "react";
import * as maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { DROP_PATH } from "@/components/ui/Drop";
import { centres } from "@/content/centres";
import { copy } from "@/content/copy";

// Free open tiles, no API key. Attribution (OpenStreetMap, OpenMapTiles, OpenFreeMap) stays on the map.
const STYLE_URL = "https://tiles.openfreemap.org/styles/liberty";

// The worker is copied into /public at build time (scripts/copy-maplibre-worker.mjs).
maplibregl.setWorkerUrl("/maplibre-gl-worker.mjs");

function markerElement(label: string): HTMLButtonElement {
  const el = document.createElement("button");
  el.type = "button";
  el.setAttribute("aria-label", label);
  // 44px wide and tall so the marker is an easy touch target; the drop is centred inside it.
  el.style.cssText = "width:44px;height:48px;padding:0;border:0;background:none;cursor:pointer;display:flex;align-items:flex-end;justify-content:center";
  el.innerHTML = `<svg viewBox="0 0 100 124" width="34" height="42" aria-hidden="true" focusable="false"><path d="${DROP_PATH}" fill="#3FBFEF" stroke="#0B2545" stroke-width="5" stroke-linejoin="round"/></svg>`;
  return el;
}

/** Only ever loaded by MapLoader, when the section is close to the viewport. */
export default function MapView({
  onFail,
  onReady,
  focusOnReady = false,
}: {
  onFail: () => void;
  onReady: () => void;
  focusOnReady?: boolean;
}) {
  const box = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const el = box.current;
    if (!el || centres.length === 0) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let map: maplibregl.Map;
    try {
      map = new maplibregl.Map({
        container: el,
        style: STYLE_URL,
        center: [centres[0].lng, centres[0].lat],
        zoom: 10,
        attributionControl: { compact: true },
        // Two-finger or ctrl+scroll to move the map, so it never traps page scrolling.
        cooperativeGestures: true,
        fadeDuration: reduced ? 0 : 300,
      });
    } catch {
      onFail();
      return;
    }

    map.addControl(new maplibregl.NavigationControl({ showCompass: false }), "top-right");
    map.on("load", () => {
      setReady(true);
      // Asked for with the keyboard: put focus on the first control so it is not lost when the placeholder goes.
      if (focusOnReady) el.querySelector<HTMLElement>(".maplibregl-marker, .maplibregl-ctrl button")?.focus();
      onReady();
    });
    map.on("error", (e) => {
      // A failed style means no map at all; a single missing tile is not worth giving up for.
      if (!map.isStyleLoaded() && String(e.error?.message ?? "").includes("style")) onFail();
    });

    centres.forEach((c) => {
      const label = `${copy.find.pilotKind}, ${c.place}`;
      const popup = new maplibregl.Popup({ offset: 28, closeButton: true }).setHTML(
        `<strong>${copy.find.pilotKind}</strong><br>${c.place}${c.approximate ? `<br><small>${copy.find.approxNote}</small>` : ""}`,
      );
      new maplibregl.Marker({ element: markerElement(label), anchor: "bottom" })
        .setLngLat([c.lng, c.lat])
        .setPopup(popup)
        .addTo(map);
    });

    return () => map.remove();
    // focusOnReady is only read once, when the map first loads.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onFail, onReady]);

  return (
    <div
      ref={box}
      data-ready={ready}
      className="h-full w-full"
      role="region"
      aria-label={copy.find.mapLabel}
    />
  );
}
