import Hero from "@/components/sections/Hero";
import Problem from "@/components/sections/Problem";
import Hierarchy from "@/components/sections/Hierarchy";
import Pilot from "@/components/sections/Pilot";
import HowItWorks from "@/components/sections/HowItWorks";
import FindCentre from "@/components/sections/FindCentre";
import Join from "@/components/sections/Join";
import Sources from "@/components/sections/Sources";

export default function Home() {
  return (
    <main>
      <Hero />
      <Problem />
      <Hierarchy />
      <Pilot />
      <HowItWorks />

      <FindCentre />
      <Join />

      <Sources />
    </main>
  );
}
