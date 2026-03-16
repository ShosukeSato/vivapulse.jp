import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "vivapulse.jp — Shosuke Sato",
  description:
    "AI時代に、自分の独自性をつくる方法を探求し続ける旅人 — Shosuke Sato のポートフォリオ",
  openGraph: {
    title: "vivapulse.jp — Shosuke Sato",
    description: "AI時代に、自分の独自性をつくる方法を探求し続ける旅人",
    siteName: "vivapulse.jp",
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "vivapulse.jp — Shosuke Sato",
    description: "AI時代に、自分の独自性をつくる方法を探求し続ける旅人",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className="antialiased font-sans">{children}</body>
    </html>
  );
}
