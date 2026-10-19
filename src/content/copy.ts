// All user-facing text lives here (i18n-ready; Hindi and Konkani later).
// Seeded from Part C of docs/BUILD_PROMPT.md. Stats must be rendered with <Cite id="..." />.
import type { SourceId } from "./sources";

export const copy = {
  hero: {
    h1: "Every litre you refill is a bottle that never exists.",
    sub: "Top Up is a plan to make refill drinking water the easy choice across India, starting where bottles pile up fastest: tourist beaches, towns and trails.",
    ctaPrimary: "Become a Top Up Centre",
    ctaSecondary: "Find a refill point"
  },
  problem: {
    heading: "The bottle is the expensive part.",
    beats: [
      {
        id: "water",
        text: "It takes about 3 litres of water to make 1 litre of bottled water.",
        cite: "pacinst-water-use" as SourceId
      },
      {
        id: "energy",
        text: "Bottled water takes far more energy than treated tap water, once you count making the bottle, filling it and moving it.",
        cite: "gleick-cooley-energy" as SourceId
      },
      {
        id: "recycling",
        text: "India already recycles most of its PET bottles. But making and moving a bottle costs water and energy first. The best bottle is the one you never need.",
        cite: "ncl-pace-pet" as SourceId
      },
      {
        id: "oceans",
        text: "Plastic makes up most of the debris found in the world's oceans. The \"garbage patches\" are mostly tiny plastic fragments, which is why they are so hard to clean up.",
        cite: ["si-marine-debris", "noaa-garbage-patch"] as SourceId[]
      }
    ]
  },
  hierarchy: {
    steps: ["Rethink", "Reduce", "Reuse", "Recycle"],
    line: "Reduce comes first. It means using fewer resources in the first place."
  },
  pilot: {
    heading: "We tested it on a beach in Goa.",
    // Pilot refill prices are the only permitted price figures on the site (see docs/open-questions.md).
    body: "A small beach shack in Arambol sold about 60 to 90 bottles of mineral water a day and was left with about 75 empty bottles daily. The owner placed a 20-litre refill bottle by the counter and offered refills at Rs.10 per litre. After a year he lowered the price to Rs.5 per litre. By the end of the second season he had stopped stocking one-litre bottles, and guests now bring their own.",
    benefits: [
      "Aware travellers noticed the shack and talked about it.",
      "It earned goodwill as an eco-friendly initiative.",
      "More food was sold.",
      "Far less waste."
    ],
    insights: "Aware tourists switch because it is better for the environment, and because it is cheaper.",
    label: "Pilot observation, one beach shack in Arambol, Goa.",
    cite: "topup-pilot" as SourceId
  },
  howItWorks: {
    steps: [
      { n: 1, title: "Spot the lamp", text: "A hanging cane lamp and a blue drop mark every Top Up point." },
      { n: 2, title: "Bring your bottle", text: "" },
      { n: 3, title: "Top up and go", text: "" }
    ]
  },
  join: {
    heading: "Become a Top Up Centre.",
    body: "Individuals and businesses make the difference when they feel inspired, encouraged and supported. We'll help you set up a visible refill point and spread the word."
  },
  closing: "Top Up is a plan to encourage refill drinking water across India, beginning with tourist areas, for high impact."
} as const;
