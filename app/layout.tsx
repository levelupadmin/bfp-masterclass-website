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

const SITE_TITLE = "Start your filmmaking career in 2026";
const SITE_DESCRIPTION =
  "Learn how to start your filmmaking career today — a free 2-hour live masterclass with the founder of India's largest filmmaking community.";

export const metadata: Metadata = {
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  metadataBase: new URL("https://bfp.leveluplearning.in"),
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    type: "website",
    siteName: "LevelUp Learning",
    url: "https://bfp.leveluplearning.in",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const eventJsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: "BFP Masterclass — How to start your filmmaking career in 2026",
    startDate: "2026-05-17T11:00:00+05:30",
    endDate: "2026-05-17T13:15:00+05:30",
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
