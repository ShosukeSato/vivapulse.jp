import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { journey, ports } from "@/data/content";
import Port from "@/features/ports/Port";

type PageProps = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return ports.map((port) => ({ slug: port.slug }));
}

function portMeta(slug: string) {
  const port = ports.find((item) => item.slug === slug);
  if (!port) return null;

  const stop = journey.find((item) => item.place === port.place);
  const isLive = stop?.status === "now";
  const kind = port.role === "home" ? "母港の記録" : isLive ? "現在停泊中" : "寄港記録";
  const title = `${port.place} ${port.nameEn} — ${kind} | CITY 01`;
  const description = `${stop?.period ?? ""}、${stop?.note || "世界一周の航路上の寄港地。"}ROUTE TERMINALから船で渡る、${port.place}での実際の映像と記録。`;

  return { port, title, description };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const meta = portMeta(slug);
  if (!meta) return {};

  const path = `/ports/${slug}`;

  return {
    title: meta.title,
    description: meta.description,
    alternates: { canonical: path },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: path,
      siteName: "CITY 01 / SHOSUKE SATO",
      locale: "ja_JP",
      type: "website",
      images: [
        {
          url: "/opengraph-image.png",
          width: 1200,
          height: 630,
          alt: `${meta.port.place} — CITY 01 寄港地`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
      images: ["/opengraph-image.png"],
    },
  };
}

export default async function PortPage({ params }: PageProps) {
  const { slug } = await params;
  const port = ports.find((item) => item.slug === slug);
  if (!port) notFound();

  return <Port port={port} />;
}
