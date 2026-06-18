import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import ServiceWorker from "@/components/ServiceWorker";

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
  metadataBase: new URL("https://the-pincio-demo.vercel.app"),
  title: "The Pincio — Pool · Bites · Bar · Estate 2027",
  description:
    "Sul colle, nel cuore del Montefeltro, The Pincio nasce come destinazione d'estate: piscina, aperitivi e sere a bordo acqua. Apertura estate 2027.",
  applicationName: "The Pincio",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    title: "The Pincio",
    statusBarStyle: "default",
  },
  icons: {
    icon: [
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  openGraph: {
    title: "The Pincio — L'estate ha un indirizzo",
    description:
      "Pool · Bites · Bar. Sul colle, a bordo piscina, nel Montefeltro. Apertura estate 2027.",
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
        <ServiceWorker />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
