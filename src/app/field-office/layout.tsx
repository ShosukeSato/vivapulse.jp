import type { Metadata } from "next";
import "./field-office.css";

const title = "Shosuke Sato — Field Office";
const description = "Research-led websites for local businesses, by Shosuke Sato.";

export const metadata: Metadata = {
  metadataBase: new URL("https://vivapulse.jp"),
  title,
  description,
  alternates: { canonical: "/field-office" },
  robots: { index: true, follow: true },
  openGraph: {
    title,
    description,
    url: "/field-office",
    type: "website",
    images: [{ url: "/field-office/og.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/field-office/og.png"],
  },
};

export default function FieldOfficeLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
