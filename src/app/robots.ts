import type { MetadataRoute } from "next";
import { isProduction, siteUrl } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  if (!isProduction) {
    // Preview and local builds are not for search engines.
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/api/" },
    sitemap: `${siteUrl()}/sitemap.xml`,
  };
}
