import Cite from "@/components/ui/Cite";
import Counter from "@/components/ui/Counter";
import { copy } from "@/content/copy";
import type { SourceId } from "@/content/sources";
import { EnergyBars, OceanRing, RecyclingVisual, WaterVisual } from "./ProblemVisuals";

const [beatWater, beatEnergy, beatRecycling, beatOceans] = copy.problem.beats;

// The "17" in the first beat is the sourced figure, so it is the one that counts up.
const [waterBefore, waterAfter] = beatWater.text.split("17");

function Cites({ ids }: { ids: readonly SourceId[] }) {
  return ids.map((id) => <Cite key={id} id={id} />);
}

function Beat({ visual, children }: { visual: React.ReactNode; children: React.ReactNode }) {
  return (
    <article className="grid items-center gap-6 py-10 sm:grid-cols-[minmax(0,340px)_1fr] sm:gap-10 md:gap-16">
      <div className="flex min-h-[120px] items-center sm:justify-center">{visual}</div>
      <div className="max-w-xl">{children}</div>
    </article>
  );
}

/** Older, wider or caveating context for a beat: smaller text, and cited like everything else. */
function Note({ text, ids }: { text: string; ids: readonly SourceId[] }) {
  return (
    <p className="mt-4 text-[0.95em] opacity-90">
      {text}
      <Cites ids={ids} />
    </p>
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
              <Counter value={17} />
              {waterAfter}
              <Cites ids={beatWater.cite} />
            </p>
            <Note text={beatWater.note} ids={beatWater.noteCite} />
          </Beat>

          <Beat visual={<EnergyBars />}>
            <p className="text-lead">
              {beatEnergy.text}
              <Cites ids={beatEnergy.cite} />
            </p>
          </Beat>

          <Beat visual={<RecyclingVisual />}>
            <p className="text-lead">
              {beatRecycling.text}
              <Cites ids={beatRecycling.cite} />
            </p>
            <Note text={beatRecycling.note} ids={beatRecycling.noteCite} />
          </Beat>

          <Beat visual={<OceanRing />}>
            <p className="text-lead">
              {beatOceans.text}
              <Cites ids={beatOceans.cite} />
            </p>
            <Note text={beatOceans.note} ids={beatOceans.noteCite} />
          </Beat>
        </div>
      </div>
    </section>
  );
}
