import type { MetadataRoute } from "next";
import { cityPlaces } from "@/data/city";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const updatedAt = new Date("2026-07-23T00:00:00+09:00");
  return [
    {
      url: "https://vivapulse.jp",
      lastModified: updatedAt,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...cityPlaces.map((place) => ({
      url: `https://vivapulse.jp${place.path}`,
      lastModified: updatedAt,
      changeFrequency: "monthly" as const,
      priority: .8,
    })),
  ];
}
