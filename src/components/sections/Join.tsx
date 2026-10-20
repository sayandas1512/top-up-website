"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { copy } from "@/content/copy";
import { JoinForm } from "./LeadForms";

const TABS = ["business", "institution"] as const;
type Tab = (typeof TABS)[number];

function List({ heading, items }: { heading: string; items: readonly string[] }) {
  return (
    <div>
      <h3 className="font-display text-h3 font-bold">{heading}</h3>
      <ul className="mt-3 grid gap-2">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-3">
            <span aria-hidden="true" className="mt-2 block size-2 shrink-0 rounded-full bg-drop" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Join() {
  const [tab, setTab] = useState<Tab>("business");
  const refs = useRef<Record<Tab, HTMLButtonElement | null>>({ business: null, institution: null });

  // Arrow keys, Home and End move between tabs, as in the ARIA tabs pattern.
  function onKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    const i = TABS.indexOf(tab);
    let next: number | null = null;
    if (e.key === "ArrowRight") next = (i + 1) % TABS.length;
    if (e.key === "ArrowLeft") next = (i - 1 + TABS.length) % TABS.length;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = TABS.length - 1;
    if (next === null) return;
    e.preventDefault();
    setTab(TABS[next]);
    refs.current[TABS[next]]?.focus();
  }

  return (
    <section id="join" aria-labelledby="join-heading" className="py-[var(--space-section)]">
      <div className="container-page">
        <h2 id="join-heading" className="text-h2 font-bold">
          {copy.join.heading}
        </h2>
        <p className="mt-4 max-w-2xl text-lead">{copy.join.body}</p>

        <div role="tablist" aria-label="Who is joining" onKeyDown={onKeyDown} className="mt-10 flex flex-wrap gap-2">
          {TABS.map((t) => (
            <button
              key={t}
              ref={(el) => {
                refs.current[t] = el;
              }}
              role="tab"
              id={`join-tab-${t}`}
              aria-selected={tab === t}
              aria-controls="join-panel"
              tabIndex={tab === t ? 0 : -1}
              onClick={() => setTab(t)}
              className={`min-h-11 rounded-full border-2 border-navy px-5 py-2 font-semibold ${
                tab === t ? "bg-navy text-sand" : "hover:bg-navy/10"
              }`}
            >
              {copy.join.tabs[t]}
            </button>
          ))}
        </div>

        <div
          role="tabpanel"
          id="join-panel"
          aria-labelledby={`join-tab-${tab}`}
          className="mt-8 grid gap-10 md:grid-cols-[1fr_1.2fr] md:gap-16"
        >
          <div className="grid content-start gap-8">
            <List heading={copy.join.gets.heading} items={copy.join.gets.items} />
            <List heading={copy.join.asks.heading} items={copy.join.asks.items} />
          </div>
          <JoinForm audience={tab} />
        </div>
      </div>
    </section>
  );
}
