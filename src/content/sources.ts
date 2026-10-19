export const sources = [
  {
    id: "pacinst-water-use",
    claim: "About 3 litres of water are needed to produce 1 litre of bottled water (2006 US estimate).",
    title: "Bottled Water and Energy: A Pacific Institute Fact Sheet",
    publisher: "Pacific Institute",
    url: "https://pacinst.org/wp-content/uploads/2013/02/bottled_water_and_energy.pdf",
    note: "US data, 2006."
  },
  {
    id: "gleick-cooley-energy",
    claim: "Producing bottled water takes roughly 5.6 to 10.2 MJ per litre, up to about 2,000 times the energy of producing tap water.",
    title: "Energy implications of bottled water",
    publisher: "Gleick & Cooley, Environmental Research Letters, 2009 (Pacific Institute)",
    url: "https://pacinst.org/press_center/press_releases/bottled_water_0209.html",
    note: "Compares bottled water with treated tap water; US-based analysis."
  },
  {
    id: "ncl-pace-pet",
    claim: "India recycles most of its PET bottles (a CSIR-NCL / PACE study put it at about 90%).",
    title: "India recycles 90% of its PET waste",
    publisher: "CSIR-National Chemical Laboratory & PACE, reported by Plastemart / Plasteurope, 2017",
    url: "https://www.plasteurope.com/news/PET_RECYCLING_t236441",
    note: "Industry-backed study. A 2025 industry review reports about 92%: https://petpla.net/assets/ebooks/PP202510/22/"
  },
  {
    id: "noaa-garbage-patch",
    claim: "Garbage patches are not solid islands; most debris in them is small pieces of plastic.",
    title: "How Big Is the Great Pacific Garbage Patch?",
    publisher: "NOAA Marine Debris Program",
    url: "https://response.restoration.noaa.gov/node/506"
  },
  {
    id: "si-marine-debris",
    claim: "Plastic makes up the majority of marine debris on shorelines and floating in oceans worldwide.",
    title: "Ocean Trash Plaguing Our Sea",
    publisher: "Smithsonian Ocean",
    url: "https://ocean.si.edu/planet-ocean/tides-currents/ocean-trash-plaguing-our-sea"
  },
  {
    id: "topup-pilot",
    claim: "Pilot observations from one beach shack in Arambol, Goa.",
    title: "Top Up pilot, Arambol, Goa",
    publisher: "Top Up (own observation, not a controlled study)",
    url: ""
  }
] as const;

export type SourceId = (typeof sources)[number]["id"];
