import { z } from "zod";

// Shared by the forms (client) and /api/lead (server), so both sides validate the same way.

export const JOIN_TYPES = {
  business: ["Beach shack", "Restaurant", "Hotel or guesthouse", "Other"],
  institution: ["School", "Company", "Other institution"],
} as const;

const text = (max: number) => z.string().trim().max(max);
const required = (max: number, msg: string) => text(max).min(1, msg);

// Phone or email, one field. Loose on purpose: we only want to catch obvious mistakes.
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE = /^\+?[0-9][0-9\s()-]{6,18}$/;
const contact = required(120, "Please add a phone number or email.").refine(
  (v) => EMAIL.test(v) || PHONE.test(v),
  "That doesn't look like a phone number or email.",
);

// Honeypot: real people never see or fill this. Bots usually do.
const honeypot = z.string().max(200).optional().default("");

export const joinSchema = z.object({
  type: z.literal("join"),
  audience: z.enum(["business", "institution"]),
  name: required(100, "Please tell us your name."),
  venue: required(120, "Please tell us the name of the place."),
  venueType: required(60, "Please choose a type."),
  town: required(120, "Please add the town and state."),
  contact,
  message: text(1000).optional().default(""),
  website: honeypot,
});

export const suggestSchema = z.object({
  type: z.literal("suggest"),
  name: required(120, "Please tell us the shack's name or what to call it."),
  place: required(120, "Please tell us where it is."),
  contact: required(200, "Please add a link or contact."),
  website: honeypot,
});

export const leadSchema = z.discriminatedUnion("type", [joinSchema, suggestSchema]);

export type JoinInput = z.input<typeof joinSchema>;
export type LeadInput = z.infer<typeof leadSchema>;
export type FieldErrors = Record<string, string[] | undefined>;
