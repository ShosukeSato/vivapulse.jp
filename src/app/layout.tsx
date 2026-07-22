import type { Metadata, Viewport } from "next";
import "./globals.css";

const title = "途中市 — さとうしょうすけの生きたポートフォリオ";
const description =
  "さとうしょうすけが何かを始めるたびに、建物が増え、道が延びる。アプリ、文章、映像、世界一周の記録からできた未完成の街。";

export const metadata: Metadata = {
  metadataBase: new URL("https://vivapulse.jp"),
  title,
  description,
  alternates: { canonical: "/" },
  openGraph: {
    title,
    description,
    url: "/",
    siteName: "途中市 / TOCHU CITY",
    locale: "ja_JP",
    type: "website",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "TOCHU CITY — A living portfolio by Shosuke Sato",
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
  themeColor: "#dff3fb",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
