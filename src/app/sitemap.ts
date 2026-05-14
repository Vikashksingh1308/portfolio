import type { MetadataRoute } from "next";
import { PROJECTS } from "@/lib/projects";

const BASE = "https://vikashksingh.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  const projectUrls = PROJECTS.map((p) => ({
    url: `${BASE}/projects/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    { url: BASE, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${BASE}/projects`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/upcoming`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/open-source`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE}/contact`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.6 },
    ...projectUrls,
  ];
}
