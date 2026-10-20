import Cite from "@/components/ui/Cite";
import { copy } from "@/content/copy";
import PilotStage from "./PilotStage";
import PilotTimeline from "./PilotTimeline";

const icon = {
  className: "size-7 shrink-0",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  focusable: false,
};

// One icon per benefit, in the same order as copy.pilot.benefits.
const BENEFIT_ICONS = [
  // noticed by aware tourists
  <svg key="eye" {...icon}>
    <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12Z" />
    <circle cx="12" cy="12" r="3" />
  </svg>,
  // goodwill
  <svg key="heart" {...icon}>
    <path d="M12 21s-8-5.5-8-11a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 10c0 5.5-8 11-8 11Z" />
  </svg>,
  // more food sold
  <svg key="plate" {...icon}>
    <circle cx="12" cy="12" r="8" />
    <circle cx="12" cy="12" r="4" />
  </svg>,
  // less waste
  <svg key="bin" {...icon}>
    <path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13M10 11v5M14 11v5" />
  </svg>,
];

export default function Pilot() {
  return (
    <section id="pilot" aria-labelledby="pilot-heading" className="bg-navy/[0.04] py-[var(--space-section)]">
      <div className="container-page">
        <p className="inline-block rounded-full border-2 border-navy px-4 py-1 text-[0.9em] font-semibold">
          {copy.pilot.label}
        </p>
        <h2 id="pilot-heading" className="mt-4 text-h2 font-bold">
          {copy.pilot.heading}
        </h2>
        <p className="mt-5 max-w-3xl text-lead">
          {copy.pilot.body}
          <Cite id={copy.pilot.cite} />
        </p>

        <div className="mt-12">
          <PilotStage />
        </div>

        <div className="mt-16">
          <PilotTimeline />
        </div>

        <ul className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {copy.pilot.benefits.map((b, i) => (
            <li key={b} className="flex items-start gap-3">
              {BENEFIT_ICONS[i]}
              <span>{b}</span>
            </li>
          ))}
        </ul>

        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {copy.pilot.insightCards.map((card) => (
            <p key={card} className="rounded-2xl bg-drop/30 px-6 py-5 font-display text-h3 font-bold leading-tight">
              {card}
            </p>
          ))}
        </div>
        <p className="mt-4 max-w-2xl">{copy.pilot.insights}</p>
      </div>
    </section>
  );
}
