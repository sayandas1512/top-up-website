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
  // Labels for the energy bars. Figures come from gleick-cooley-energy; no tap value is stated beyond the source.
  energy: {
    bottledLabel: "Bottled water: 5.6 to 10.2 megajoules (MJ) per litre",
    tapLabel: "Treated tap water: a tiny fraction of that",
    ratio: "Bottled water takes up to about 2,000 times more energy.",
    note: "US analysis. Bars are drawn to scale. The tap bar would be thinner than a pixel, so it is shown as a marker."
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
  bottle: {
    heading: "The Top Up bottle.",
    intro: "A reusable bottle with the Top Up mark. Bring it to a Top Up point and top up.",
    // No claims about material, liner, capacity or health until the supplier spec is confirmed (CLAUDE.md rule 3).
    benefits: [
      "Made to be refilled again and again.",
      "Carries the Top Up mark.",
      "One bottle in place of many single-use ones."
    ],
    pricing: "Pricing announced at launch",
    details: "Full details announced at launch.",
    illustrationAlt: "Illustration of a reusable metal bottle with the Top Up mark",
    cta: "Notify me / bulk enquiry",
    formHeading: "Notify me, or ask about a bulk order",
    form: {
      interest: "What are you after?",
      name: "Your name",
      contact: "Phone or email",
      contactHint: "We will use this to get back to you.",
      message: "Anything we should know? For a bulk enquiry, say how many and what for (optional).",
      submit: "Send",
      done: "Thank you. We have your details and will be in touch about the bottle."
    }
  },
  roadmap: {
    label: "Roadmap",
    line: "Round 1: tourist hubs, starting with Goa. Then more places, one round at a time."
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
  footer: {
    navLabel: "Footer",
    links: [
      { href: "#find", label: "Find a refill point" },
      { href: "#join", label: "Become a Top Up Centre" },
      { href: "#bottle", label: "The Top Up bottle" },
      { href: "#sources", label: "Sources" }
    ],
    contactIntro: "Questions, or want to get involved? Use the form here:",
    contactLink: "Become a Top Up Centre",
    privacy: "Details you send in a form go to the Top Up team so we can reply to you.",
    built: "Built with care in India"
  },
  closing: "Top Up is a plan to encourage refill drinking water across India, beginning with tourist areas, for high impact."
} as const;
