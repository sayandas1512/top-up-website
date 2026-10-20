import { copy } from "@/content/copy";

// One plain line. No targets, no figures.
export default function Roadmap() {
  return (
    <section aria-labelledby="roadmap-label" className="py-16">
      <div className="container-page">
        <p id="roadmap-label" className="text-[0.9em] font-semibold uppercase tracking-wide opacity-80">
          {copy.roadmap.label}
        </p>
        <p className="mt-2 max-w-3xl font-display text-h3 font-bold leading-tight">{copy.roadmap.line}</p>
      </div>
    </section>
  );
}
