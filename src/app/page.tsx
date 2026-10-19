import Button from "@/components/ui/Button";
import Cite from "@/components/ui/Cite";
import Counter from "@/components/ui/Counter";
import Sources from "@/components/sections/Sources";
import { copy } from "@/content/copy";

// Phase 1 shell. The hero, problem, pilot and other sections replace this in later phases.
export default function Home() {
  return (
    <main>
      <section aria-labelledby="intro-heading" className="py-[var(--space-section)]">
        <div className="container-page max-w-4xl">
          <h1 id="intro-heading" className="text-h1 font-bold">
            {copy.hero.h1}
          </h1>
          <p className="mt-6 max-w-2xl text-lead">{copy.hero.sub}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="#join">{copy.hero.ctaPrimary}</Button>
            <Button href="#find" variant="secondary">
              {copy.hero.ctaSecondary}
            </Button>
          </div>
        </div>
      </section>

      <section aria-labelledby="problem-heading" className="py-[var(--space-section)]">
        <div className="container-page max-w-4xl">
          <h2 id="problem-heading" className="text-h2 font-bold">
            {copy.problem.heading}
          </h2>
          <p className="mt-6 max-w-2xl text-lead">
            It takes about <Counter value={3} /> litres of water to make 1 litre of bottled water.
            <Cite id="pacinst-water-use" />
          </p>
        </div>
      </section>

      <section id="find" aria-labelledby="find-heading" className="py-[var(--space-section)]">
        <div className="container-page max-w-4xl">
          <h2 id="find-heading" className="text-h2 font-bold">
            {copy.hero.ctaSecondary}
          </h2>
          <p className="mt-4">The map arrives in a later phase.</p>
        </div>
      </section>

      <section id="join" aria-labelledby="join-heading" className="py-[var(--space-section)]">
        <div className="container-page max-w-4xl">
          <h2 id="join-heading" className="text-h2 font-bold">
            {copy.join.heading}
          </h2>
          <p className="mt-4 max-w-2xl">{copy.join.body}</p>
        </div>
      </section>

      <Sources />
    </main>
  );
}
