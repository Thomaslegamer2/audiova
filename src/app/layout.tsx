import type { Metadata, Viewport } from "next";
import { Geist_Mono, Manrope } from "next/font/google";
import { PwaRegister } from "@/components/layout/PwaRegister";
import { SiteShell } from "@/components/layout/SiteShell";
import { ThemeSync } from "@/components/layout/ThemeSync";
import { AppProviders } from "@/components/providers";
import { fr } from "@/i18n/fr";
import { getSiteUrl } from "@/lib/site";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: fr.meta.title,
    template: "%s — Audiova",
  },
  description: fr.meta.description,
  applicationName: "Audiova",
  category: "technology",
  keywords: [
    "convertisseur mp3",
    "convertir audio en mp3",
    "wav vers mp3",
    "flac vers mp3",
    "mp4 vers mp3",
    "convertisseur audio en ligne gratuit",
  ],
  authors: [{ name: "Audiova", url: siteUrl }],
  creator: "Audiova",
  publisher: "Audiova",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Audiova",
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "Audiova",
    title: fr.meta.title,
    description: fr.meta.description,
    url: siteUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: fr.meta.title,
    description: fr.meta.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#050510",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  // Thème saisonnier appliqué côté client (ThemeSync) — pas de `new Date()` au prerender.
  return (
    <html
      lang="fr"
      data-theme="default"
      data-scroll-behavior="smooth"
      className={`${manrope.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full bg-canvas font-sans text-ink" suppressHydrationWarning>
        <div className="atmosphere pointer-events-none fixed inset-0 z-0" aria-hidden="true" />
        <AppProviders>
          <ThemeSync />
          <PwaRegister />
          <SiteShell>{children}</SiteShell>
        </AppProviders>
      </body>
    </html>
  );
}
