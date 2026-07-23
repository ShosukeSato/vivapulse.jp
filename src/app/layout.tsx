import type { Metadata, Viewport } from "next";
import "@fontsource/ibm-plex-mono/latin-400.css";
import "@fontsource/ibm-plex-mono/latin-600.css";
import "./globals.css";

const title = "CITY 01 — さとうしょうすけの、制作と旅の街。";
const description =
  "世界を旅しながら、アプリをつくり、映像を撮り、文章を書く。さとうしょうすけのポートフォリオ都市。";

export const metadata: Metadata = {
  metadataBase: new URL("https://vivapulse.jp"),
  title,
  description,
  alternates: { canonical: "/" },
  openGraph: {
    title,
    description,
    url: "/",
    siteName: "CITY 01 / SHOSUKE SATO",
    locale: "ja_JP",
    type: "website",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "CITY 01 — さとうしょうすけの制作と旅のポートフォリオ都市",
        type: "image/png",
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

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#081923",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja" data-scroll-behavior="smooth">
      <body>{children}</body>
    </html>
  );
}
