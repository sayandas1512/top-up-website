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
    // India-first. Each stat has a source id; `note` carries the wider or older context, also cited.
    beats: [
      {
        id: "water",
        text: "In one study of eight Indian bottling plants, it took about 17 litres of water to make 1 litre of bottled water. That counts the bottle, the carton and the energy.",
        cite: ["tandon-india-2014"] as SourceId[],
        note: "Plant operations alone use far less: about 1.4 litres per litre in a 2024 industry study of North American bottling plants, which looks only at the plants' own work.",
        noteCite: ["ibwa-antea-2024"] as SourceId[]
      },
      {
        id: "energy",
        text: "Bottled water takes far more energy than treated tap water, once you count making the bottle, filling it and moving it.",
        cite: ["tandon-india-2014", "gleick-cooley-energy"] as SourceId[]
      },
      {
        id: "recycling",
        text: "India already recycles most of its PET bottles. But making and moving a bottle costs water and energy first. The best bottle is the one you never need.",
        cite: ["ncl-pace-pet"] as SourceId[],
        note: "Industry reports put the rate at about 92% in 2024-25. Treat exact figures with care: a 2024 report from the Centre for Science and Environment found some plastic waste processors issuing fraudulent recycling certificates.",
        noteCite: ["petplanet-2025", "cse-epr-2024"] as SourceId[]
      },
      {
        id: "oceans",
        text: "On India's beaches, tourism and recreation are the main sources of litter. Plastic was 43% of beach litter in 2024, down from 67% in 2018. A survey of coastal mangroves in Goa found plastic was 66% of human-made litter.",
        cite: ["pib-beach-litter-2025"] as SourceId[],
        note: "Worldwide, plastic is at least 85% of marine litter. The \"garbage patches\" are mostly tiny plastic fragments, which is why they are so hard to clean up.",
        noteCite: ["unep-marine-litter-2021", "si-marine-debris", "noaa-garbage-patch"] as SourceId[]
      }
    ]
  },
  // Labels for the energy bars. India figure: tandon-india-2014. US range and ratio: gleick-cooley-energy.
  energy: {
    indiaLabel: "Bottled water in India: about 7.1 megajoules (MJ) per litre",
    usLabel: "US analysis: 5.6 to 10.2 MJ per litre",
    tapLabel: "Treated tap water: a tiny fraction of that",
    ratio: "In the US analysis, bottled water took up to about 2,000 times more energy than tap water.",
    note: "We found no Indian figure for tap water, so the tap comparison is the US one. Bars are drawn to scale. The tap bar would be thinner than a pixel, so it is shown as a marker."
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
    // Everything below is taken from the pilot body text above; nothing new is claimed.
    beforeLabel: "Empty bottles per day, before",
    afterLabel: "Empty bottles per day, after",
    refillCaption: "A 20-litre refill bottle by the counter",
    prices: [
      { when: "First season", price: "Rs.10 per litre" },
      { when: "After one year", price: "Rs.5 per litre" }
    ],
    timeline: [
      { when: "Season 1", text: "A 20-litre refill bottle is placed by the counter." },
      { when: "After one year", text: "The refill price is lowered." },
      { when: "Season 2", text: "One-litre bottles are no longer stocked. Guests bring their own." }
    ],
    insightCards: ["It's better for the environment", "It's cheaper"],
    cite: "topup-pilot" as SourceId
  },
  howItWorks: {
    heading: "How it works",
    steps: [
      { n: 1, title: "Spot the lamp", text: "A hanging cane lamp and a blue drop mark every Top Up point." },
      { n: 2, title: "Bring your bottle", text: "" },
      { n: 3, title: "Top up and go", text: "" }
    ]
  },
  find: {
    intro: "Look for the hanging cane lamp and the blue drop.",
    mapLabel: "Map of Top Up refill points",
    listHeading: "Refill points",
    pilotPlace: "Arambol, Goa",
    pilotKind: "Pilot refill point",
    approxNote: "Shown at village level, not the exact spot.",
    comingSoon: "More centres coming",
    comingSoonText: "Refill points will appear here as centres join.",
    mapError: "The map couldn't load. The list below has the same information.",
    suggestHeading: "Know a shack that should be on this map?",
    suggestIntro: "Tell us where it is and we will get in touch.",
    suggestSubmit: "Send suggestion",
    suggestDone: "Thank you. We have your suggestion.",
    fields: {
      name: "Shack or place name",
      place: "Where is it?",
      contact: "Link or contact"
    }
  },
  join: {
    gets: {
      heading: "What a centre gets",
      items: [
        "Lamp and blue-drop signage",
        "Posters and stickers",
        "A listing on the map",
        "Top Up bottles to offer guests"
      ]
    },
    asks: {
      heading: "What we ask",
      items: ["Clean filtered water", "A visible refill point", "The sign displayed"]
    },
    tabs: {
      business: "Shack, restaurant or hotel",
      institution: "School, company or institution"
    },
    form: {
      name: "Your name",
      venue: "Name of the place",
      venueType: "Type of place",
      town: "Town and state",
      contact: "Phone or email",
      contactHint: "We will use this to get back to you.",
      message: "Anything you'd like us to know (optional)",
      submit: "Send",
      sending: "Sending...",
      done: "Thank you. We have your details and will get in touch.",
      error: "Something went wrong. Please try again.",
      privacy: "Your details are sent to the Top Up team so we can reply to you."
    },
    heading: "Become a Top Up Centre.",
    body: "Individuals and businesses make the difference when they feel inspired, encouraged and supported. We'll help you set up a visible refill point and spread the word."
  },
  closing: "Top Up is a plan to encourage refill drinking water across India, beginning with tourist areas, for high impact."
} as const;
