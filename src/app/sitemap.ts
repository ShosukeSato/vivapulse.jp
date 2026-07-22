import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://vivapulse.jp",
      lastModified: new Date("2026-07-22T00:00:00+09:00"),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
