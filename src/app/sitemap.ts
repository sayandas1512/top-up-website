import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

// One page for now. Add routes here as they appear.
export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: `${siteUrl()}/`, changeFrequency: "monthly", priority: 1 }];
}
