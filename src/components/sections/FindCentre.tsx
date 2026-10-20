import { centres } from "@/content/centres";
import { copy } from "@/content/copy";
import MapLoader from "./MapLoader";
import { SuggestForm } from "./LeadForms";

export default function FindCentre() {
  return (
    <section id="find" aria-labelledby="find-heading" className="bg-navy/[0.04] py-[var(--space-section)]">
      <div className="container-page">
        <h2 id="find-heading" className="text-h2 font-bold">
          {copy.hero.ctaSecondary}
        </h2>
        <p className="mt-4 max-w-2xl text-lead">{copy.find.intro}</p>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1.6fr_1fr] lg:gap-14">
          <div>
            <MapLoader />
            {/* The same information as text, for anyone the map does not work for. */}
            <h3 className="mt-8 font-display text-h3 font-bold">{copy.find.listHeading}</h3>
            <ul className="mt-3 grid gap-3">
              {centres.map((c) => (
                <li key={c.id} className="rounded-2xl border-2 border-navy px-5 py-3">
                  <p className="font-semibold">{c.kind === "pilot" ? copy.find.pilotKind : "Top Up Centre"}</p>
                  <p>{c.place}</p>
                  {c.approximate ? <p className="text-[0.9em] opacity-80">{copy.find.approxNote}</p> : null}
                </li>
              ))}
              <li className="rounded-2xl border-2 border-dashed border-navy px-5 py-3">
                <p className="font-semibold">{copy.find.comingSoon}</p>
                <p className="text-[0.95em]">{copy.find.comingSoonText}</p>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-display text-h3 font-bold">{copy.find.suggestHeading}</h3>
            <p className="mt-2 mb-5">{copy.find.suggestIntro}</p>
            <SuggestForm />
          </div>
        </div>
      </div>
    </section>
  );
}
