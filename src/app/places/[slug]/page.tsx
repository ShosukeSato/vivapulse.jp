import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { cityPlaces, type CityPlace } from "@/data/city";
import Archive from "@/features/facilities/archive/Archive";
import B2 from "@/features/facilities/b2/B2";
import Central from "@/features/facilities/central/Central";
import Cinema from "@/features/facilities/cinema/Cinema";
import Haku from "@/features/facilities/haku/Haku";
import Harbor from "@/features/facilities/harbor/Harbor";
import Stocka from "@/features/facilities/stocka/Stocka";
import TripVlog from "@/features/facilities/tripvlog/TripVlog";
import Yard from "@/features/facilities/yard/Yard";

type PageProps = { params: Promise<{ slug: string }> };

const slugFor = (place: CityPlace) => place.path.split("/").filter(Boolean).at(-1) ?? place.id;

export const dynamicParams = false;

export function generateStaticParams() {
  return cityPlaces.map((place) => ({ slug: slugFor(place) }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const place = cityPlaces.find((item) => slugFor(item) === slug);
  if (!place) return {};

  const title = `${place.name} | CITY 01`;
  const description = place.summary;

  return {
    title,
    description,
    alternates: { canonical: place.path },
    openGraph: {
      title,
      description,
      url: place.path,
      siteName: "CITY 01 / SHOSUKE SATO",
      locale: "ja_JP",
      type: "website",
      images: [
        {
          url: "/opengraph-image.png",
          width: 1200,
          height: 630,
          alt: `${place.name} — CITY 01`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/opengraph-image.png"],
    },
  };
}

function Facility({ place }: { place: CityPlace }) {
  switch (place.id) {
    case "construction":
      return <Yard place={place} />;
    case "tripvlog":
      return <TripVlog place={place} />;
    case "haku":
      return <Haku place={place} />;
    case "stocka":
      return <Stocka place={place} />;
    case "station":
      return <Central place={place} />;
    case "cinema":
      return <Cinema place={place} />;
    case "strategy":
      return <B2 place={place} />;
    case "library":
      return <Archive place={place} />;
    case "harbor":
      return <Harbor place={place} />;
    default:
      return null;
  }
}

export default async function PlacePage({ params }: PageProps) {
  const { slug } = await params;
  const place = cityPlaces.find((item) => slugFor(item) === slug);
  if (!place) notFound();

  return <Facility place={place} />;
}
