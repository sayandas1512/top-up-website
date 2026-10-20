import { NextResponse } from "next/server";
import { z } from "zod";
import { leadSchema } from "@/lib/lead";

// Rate limit: in memory, per instance. Good enough to slow down casual abuse; it is NOT shared between
// serverless instances, so treat it as a speed bump (see docs/open-questions.md).
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function tooMany(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) {
    for (const [k, v] of hits) if (v.every((t) => now - t >= WINDOW_MS)) hits.delete(k);
  }
  return recent.length > MAX_PER_WINDOW;
}

// Formspree (and similar services) email each submission. A clear subject helps you sort them, and a field named
// "email" lets you hit Reply. Our "contact" field can be an email or a phone number, so only copy it when it is an email.
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function subjectFor(lead: { type: string; audience?: string; interest?: string }): string {
  if (lead.type === "join") return `Top Up: new Centre enquiry (${lead.audience === "institution" ? "school, company or institution" : "shack, restaurant or hotel"})`;
  if (lead.type === "bottle") return `Top Up: bottle ${lead.interest === "bulk" ? "bulk enquiry" : "launch notification"}`;
  return "Top Up: shack suggestion for the map";
}

const json = (body: Record<string, unknown>, status: number) => NextResponse.json(body, { status });

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (tooMany(ip)) {
    return json({ ok: false, error: "Too many requests. Please try again in a few minutes." }, 429);
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return json({ ok: false, error: "That request could not be read." }, 400);
  }

  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    return json({ ok: false, error: "Please check the form.", fields: z.flattenError(parsed.error).fieldErrors }, 400);
  }

  const { website, ...lead } = parsed.data;
  // Honeypot filled: pretend it worked so the bot learns nothing, and forward nothing.
  if (website) return json({ ok: true }, 200);

  const endpoint = process.env.FORM_ENDPOINT?.trim();
  if (!endpoint) {
    const dev = process.env.NODE_ENV !== "production";
    return json(
      {
        ok: false,
        error: dev
          ? "FORM_ENDPOINT is not set. Add it to .env.local (see docs/open-questions.md)."
          : "The form isn't switched on yet. Please try again later.",
      },
      503,
    );
  }

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        _subject: subjectFor(lead),
        ...(EMAIL.test(lead.contact) ? { email: lead.contact } : {}),
        ...lead,
        submittedAt: new Date().toISOString(),
        source: "top-up-website",
      }),
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) return json({ ok: false, error: "We couldn't send that just now. Please try again." }, 502);
    return json({ ok: true }, 200);
  } catch {
    return json({ ok: false, error: "We couldn't send that just now. Please try again." }, 502);
  }
}
