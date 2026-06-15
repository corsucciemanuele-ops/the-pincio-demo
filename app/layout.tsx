import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const sans = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "The Pincio — Pool · Bites · Bar · Estate 2027",
  description:
    "L'estate ha un indirizzo. The Pincio: pool, bites e bar con vista sul Lago di Mercatale, nel Montefeltro. Apertura estate 2027.",
  openGraph: {
    title: "The Pincio — L'estate ha un indirizzo",
    description:
      "Pool · Bites · Bar. Vista Lago di Mercatale, Montefeltro. Apertura estate 2027.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#F5F0E6",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="it" className={`${display.variable} ${sans.variable}`}>
      <body className="bg-cream text-ink antialiased">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
