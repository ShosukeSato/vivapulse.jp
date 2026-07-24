import type { Metadata } from "next";
import Traveler from "@/features/traveler/Traveler";

const title = "旅人SHOSUKE — さとうしょうすけ | CITY 01";
const description =
  "2004年神奈川生まれ。東京大学大学院を休学して世界一周の旅を続けながら、アプリをつくり、映像を撮り、文章を書く。CITY 01をつくった旅人、さとうしょうすけのプロフィール。";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/shosuke" },
  openGraph: {
    title,
    description,
    url: "/shosuke",
    siteName: "CITY 01 / SHOSUKE SATO",
    locale: "ja_JP",
    type: "profile",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "旅人SHOSUKE — CITY 01",
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

export default function ShosukePage() {
  return <Traveler />;
}
