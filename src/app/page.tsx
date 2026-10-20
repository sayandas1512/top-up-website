import Hero from "@/components/sections/Hero";
import Problem from "@/components/sections/Problem";
import Hierarchy from "@/components/sections/Hierarchy";
import Pilot from "@/components/sections/Pilot";
import HowItWorks from "@/components/sections/HowItWorks";
import Sources from "@/components/sections/Sources";
import { copy } from "@/content/copy";

// Find and Join are placeholders until Phase 4.
export default function Home() {
  return (
    <main>
      <Hero />
      <Problem />
      <Hierarchy />
      <Pilot />
      <HowItWorks />

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
