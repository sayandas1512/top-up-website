// The real domain is not chosen yet (docs/open-questions.md). Until then the site URL comes from
// NEXT_PUBLIC_SITE_URL if set, else Vercel's production URL, else localhost.
export function siteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  const productionHost = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  // Previews use their own address, so their social links and sitemap point at themselves, not at production.
  const deploymentHost = process.env.VERCEL_URL?.trim();
  const raw =
    explicit ||
    (process.env.VERCEL_ENV === "production" && productionHost ? `https://${productionHost}` : "") ||
    (deploymentHost ? `https://${deploymentHost}` : "") ||
    "http://localhost:3000";
  return raw.replace(/\/$/, "");
}

/**
 * Search engines are asked to stay away unless this is a production deploy AND ALLOW_INDEXING=true is set in Vercel.
 * Production starts out noindex, because the real domain is not chosen yet. Set ALLOW_INDEXING=true when it is.
 */
export const isIndexable = process.env.VERCEL_ENV === "production" && process.env.ALLOW_INDEXING === "true";
