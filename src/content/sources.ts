export const sources = [
  {
    id: "tandon-india-2014",
    claim: "In eight bottled water plants in Maharashtra, one litre of bottled water had a water footprint of 17.41 litres and an energy footprint of 7.08 MJ. This counts making the PET bottle and the carton, treating the water, and producing the energy.",
    title: "Water and Energy Footprint Assessment of Bottled Water Industries in India",
    publisher: "Tandon, Kolekar & Kumar, Natural Resources, Vol. 5, No. 2, 2014",
    url: "https://doi.org/10.4236/nr.2014.52007",
    note: "Eight plants in one Indian state, so it is not a national average."
  },
  {
    id: "ibwa-antea-2024",
    claim: "North American bottling plants used on average 1.41 litres of water, including the litre in the bottle, for every litre of bottled water. The data covers 101 facilities for 2017, 2020 and 2022.",
    title: "North American Bottled Water Industry Benchmarking Study: Executive Summary",
    publisher: "International Bottled Water Association, conducted by Antea Group, May 2024",
    url: "https://bottledwater.org/wp-content/uploads/2024/08/IBWA-Benchmarking-Executive-Summary_May-2024.pdf",
    note: "Industry-commissioned. It is facility-level data, so it does not include the water behind the bottle material."
  },
  {
    id: "gleick-cooley-energy",
    claim: "Producing bottled water takes roughly 5.6 to 10.2 MJ per litre, up to about 2,000 times the energy of producing tap water.",
    title: "Energy implications of bottled water",
    publisher: "Gleick & Cooley, Environmental Research Letters, 2009 (Pacific Institute)",
    url: "https://pacinst.org/press_center/press_releases/bottled_water_0209.html",
    note: "Compares bottled water with treated tap water. US-based analysis, 2009."
  },
  {
    id: "ncl-pace-pet",
    claim: "India recycles most of its PET bottles (a CSIR-NCL / PACE study put it at about 90%).",
    title: "India recycles 90% of its PET waste",
    publisher: "CSIR-National Chemical Laboratory & PACE, reported by Plastemart / Plasteurope, 2017",
    url: "https://www.plasteurope.com/news/PET_RECYCLING_t236441",
    note: "Industry-backed study."
  },
  {
    id: "petplanet-2025",
    claim: "In 2024-25, India's PET bottle use was 1.9 million tonnes and recycled PET use was 1.75 million tonnes (92%).",
    title: "PET recycling in India: Trends, challenges and opportunities",
    publisher: "PETplanet (Heidelberg Business Media), 8 October 2025, by consultant Rajesh Kumar Gera",
    url: "https://petpla.net/2025/10/08/pet-recycling-in-india-trends-challenges-and-opportunities/",
    note: "Trade magazine article. It gives no source or method for the figure."
  },
  {
    id: "cse-epr-2024",
    claim: "Some plastic waste processors in India have issued large volumes of fraudulent recycling certificates under the extended producer responsibility (EPR) system.",
    title: "Unpacking EPR for Plastic Packaging in India",
    publisher: "Centre for Science and Environment, 2024 (Singh, Chandra & Biswas)",
    url: "https://www.breakfreefromplastic.org/wp-content/uploads/2024/11/http___cdn.cseindia.org_attachments_0.31282200_1730173267_unpacking-epr-for-plastic-packaging-in-india.pdf",
    note: "About recycling certificates for plastic packaging in general, not PET only."
  },
  {
    id: "pib-beach-litter-2025",
    claim: "India's national beach litter assessments found plastic was 67% of beach litter in 2018 and 43% in 2024, and that tourism and recreation are the major sources. A survey of coastal mangroves in Goa found plastic was 66% of human-made litter.",
    title: "Parliament Question: Survey to assess microplastic and marine debris",
    publisher: "Ministry of Earth Sciences, via the Press Information Bureau, 6 August 2025",
    url: "https://www.pib.gov.in/PressReleasePage.aspx?PRID=2152990",
    note: "Written reply to Parliament summarising surveys by the National Centre for Coastal Research and the National Institute of Oceanography."
  },
  {
    id: "unep-marine-litter-2021",
    claim: "Plastics make up at least 85% of marine litter worldwide.",
    title: "From Pollution to Solution: A global assessment of marine litter and plastic pollution",
    publisher: "United Nations Environment Programme, 21 October 2021",
    url: "https://www.unep.org/resources/pollution-solution-global-assessment-marine-litter-and-plastic-pollution"
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

/**
 * Sources in order of first citation on the page. <Cite> numbers and the Sources section follow this list.
 * Add an id here when a new stat is first cited; <Cite> throws at build time if its id is missing.
 */
export const citationOrder: SourceId[] = [
  "tandon-india-2014",
  "ibwa-antea-2024",
  "gleick-cooley-energy",
  "ncl-pace-pet",
  "petplanet-2025",
  "cse-epr-2024",
  "pib-beach-litter-2025",
  "unep-marine-litter-2021",
  "si-marine-debris",
  "noaa-garbage-patch",
  "topup-pilot"
];
