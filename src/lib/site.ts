// The real domain is not chosen yet (docs/open-questions.md). Until then the site URL comes from
// NEXT_PUBLIC_SITE_URL if set, else Vercel's production URL, else localhost.
export function siteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  const raw = explicit || (vercel ? `https://${vercel}` : "http://localhost:3000");
  return raw.replace(/\/$/, "");
}

/** Only real production deploys are indexable. Previews and local builds ask search engines to stay away. */
export const isProduction = process.env.VERCEL_ENV === "production";
