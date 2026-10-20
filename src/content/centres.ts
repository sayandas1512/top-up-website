import raw from "./centres.json";

// Real centres only (see CLAUDE.md rule 5). No business names until consent is confirmed (rule 6).
export type Centre = {
  id: string;
  kind: "pilot" | "centre";
  place: string;
  lat: number;
  lng: number;
  /** True when the point is a village or area, not the exact spot. */
  approximate: boolean;
};

export const centres = raw as Centre[];
