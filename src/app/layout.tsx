import type { Metadata } from "next";
import { Shippori_Mincho_B1, Zen_Kaku_Gothic_New } from "next/font/google";
import "./globals.css";

const mincho = Shippori_Mincho_B1({
  weight: ["400", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-mincho",
  display: "swap",
});

const zen = Zen_Kaku_Gothic_New({
  weight: ["400", "500", "700", "900"],
  subsets: ["latin"],
  variable: "--font-zen",
  display: "swap",
});

const description =
  "旅の途中で、アプリをつくり、文章を書き、映像を撮る。世界一周をしながら制作を続ける、さとうしょうすけの作品集。";

export const metadata: Metadata = {
  title: "さとうしょうすけ — 旅の途中で、つくる。",
  description,
  openGraph: {
    title: "さとうしょうすけ — 旅の途中で、つくる。",
    description,
    siteName: "vivapulse.jp",
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "さとうしょうすけ — 旅の途中で、つくる。",
    description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={`${mincho.variable} ${zen.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
