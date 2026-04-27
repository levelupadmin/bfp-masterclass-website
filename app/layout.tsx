import type { Metadata } from "next";
import localFont from "next/font/local";
import { Spectral, JetBrains_Mono } from "next/font/google";
import { content } from "@/lib/content";
import { Analytics } from "@/components/Analytics";
import "./globals.css";

// Brand font — Aileron handles BOTH body text and display headings.
// Display headings use weight 700/Bold for impact; body uses 400/Regular.
const aileron = localFont({
  src: [
    { path: "./fonts/Aileron-Thin.woff2", weight: "100", style: "normal" },
    { path: "./fonts/Aileron-ThinItalic.woff2", weight: "100", style: "italic" },
    { path: "./fonts/Aileron-Light.woff2", weight: "300", style: "normal" },
    { path: "./fonts/Aileron-LightItalic.woff2", weight: "300", style: "italic" },
    { path: "./fonts/Aileron-Regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/Aileron-Italic.woff2", weight: "400", style: "italic" },
    { path: "./fonts/Aileron-SemiBold.woff2", weight: "600", style: "normal" },
    { path: "./fonts/Aileron-SemiBoldItalic.woff2", weight: "600", style: "italic" },
    { path: "./fonts/Aileron-Bold.woff2", weight: "700", style: "normal" },
    { path: "./fonts/Aileron-BoldItalic.woff2", weight: "700", style: "italic" },
  ],
  variable: "--font-sans",
  display: "swap",
});
const aileronDisplay = localFont({
  src: [
    { path: "./fonts/Aileron-Regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/Aileron-SemiBold.woff2", weight: "600", style: "normal" },
    { path: "./fonts/Aileron-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-display",
  display: "swap",
});

// Kept for the italic accent in the hero ("2026.") and for body italics.
const spectral = Spectral({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});
const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "BFP Masterclass — Start your filmmaking career in 2026",
  description: content.hero.sub,
  metadataBase: new URL("https://bfpmasterclass.example.com"),
  openGraph: {
    title: "BFP Masterclass — Start your filmmaking career in 2026",
    description: content.hero.sub,
    type: "website",
    images: ["/assets/rahul-portrait.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "BFP Masterclass — Start your filmmaking career in 2026",
    description: content.hero.sub,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const eventJsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: "BFP Masterclass — How to start your filmmaking career in 2026",
    startDate: "2026-05-03T11:00:00+05:30",
    endDate: "2026-05-03T13:15:00+05:30",
    eventAttendanceMode: "https://schema.org/OnlineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    location: {
      "@type": "VirtualLocation",
      url: "https://zoom.us",
    },
    organizer: {
      "@type": "Organization",
      name: "LevelUp Learning",
    },
    description: content.hero.sub,
    isAccessibleForFree: true,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <html
      lang="en"
      className={`${aileron.variable} ${aileronDisplay.variable} ${spectral.variable} ${jetbrains.variable}`}
    >
      <head>
        <link rel="preconnect" href="https://videos.pexels.com" />
        <link rel="preconnect" href="https://images.pexels.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(eventJsonLd) }}
        />
      </head>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
