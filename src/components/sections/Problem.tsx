import Cite from "@/components/ui/Cite";
import Counter from "@/components/ui/Counter";
import { copy } from "@/content/copy";
import { EnergyBars, OceanRing, RecyclingVisual, WaterVisual } from "./ProblemVisuals";

const [beatWater, beatEnergy, beatRecycling, beatOceans] = copy.problem.beats;

// The "3" in the first beat is the sourced figure, so it is the one that counts up.
const [waterBefore, waterAfter] = beatWater.text.split("3");

function Beat({ visual, children }: { visual: React.ReactNode; children: React.ReactNode }) {
  return (
    <article className="grid items-center gap-6 py-10 sm:grid-cols-[minmax(0,240px)_1fr] sm:gap-10 md:gap-16">
      <div className="flex min-h-[120px] items-center sm:justify-center">{visual}</div>
      <div className="max-w-xl">{children}</div>
    </article>
  );
}

export default function Problem() {
  return (
    <section id="problem" aria-labelledby="problem-heading" className="py-[var(--space-section)]">
      <div className="container-page">
        <h2 id="problem-heading" className="text-h2 font-bold">
          {copy.problem.heading}
        </h2>

        <div className="mt-6 divide-y divide-navy/15">
          <Beat visual={<WaterVisual />}>
            <p className="text-lead">
              {waterBefore}
              <Counter value={3} />
              {waterAfter}
              <Cite id={beatWater.cite} />
            </p>
          </Beat>

          <Beat visual={<EnergyBars />}>
            <p className="text-lead">
              {beatEnergy.text}
              <Cite id={beatEnergy.cite} />
            </p>
          </Beat>

          <Beat visual={<RecyclingVisual />}>
            <p className="text-lead">
              {beatRecycling.text}
              <Cite id={beatRecycling.cite} />
            </p>
          </Beat>

          <Beat visual={<OceanRing />}>
            <p className="text-lead">
              {beatOceans.text}
              {beatOceans.cite.map((id) => (
                <Cite key={id} id={id} />
              ))}
            </p>
          </Beat>
        </div>
      </div>
    </section>
  );
}
