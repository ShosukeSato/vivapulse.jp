import type { MetadataRoute } from "next";
import { cityPlaces } from "@/data/city";
import { ports } from "@/data/content";

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
    {
      url: "https://vivapulse.jp/shosuke",
      lastModified: updatedAt,
      changeFrequency: "monthly",
      priority: .9,
    },
    ...cityPlaces.map((place) => ({
      url: `https://vivapulse.jp${place.path}`,
      lastModified: updatedAt,
      changeFrequency: "monthly" as const,
      priority: .8,
    })),
    ...ports.map((port) => ({
      url: `https://vivapulse.jp/ports/${port.slug}`,
      lastModified: updatedAt,
      changeFrequency: "weekly" as const,
      priority: .7,
    })),
  ];
}
