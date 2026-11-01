import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { AdSlot } from "@/components/layout/AdSlot";
import { SupportBanner } from "@/components/layout/SupportBanner";
import { Converter } from "@/components/converter/Converter";
import { Hero } from "@/components/home/Hero";
import { fr } from "@/i18n/fr";
import { getSiteUrl } from "@/lib/site";

const Features = dynamic(() => import("@/components/home/Features").then((mod) => mod.Features));
const Formats = dynamic(() => import("@/components/home/Formats").then((mod) => mod.Formats));
const FAQ = dynamic(() => import("@/components/home/FAQ").then((mod) => mod.FAQ));

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: { url: "/" },
};

export default function HomePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Audiova",
    applicationCategory: "MultimediaApplication",
    operatingSystem: "Web",
    inLanguage: "fr",
    url: getSiteUrl(),
    description: fr.meta.description,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "EUR",
    },
    browserRequirements: "Requires JavaScript",
  };

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <Hero />
      <Converter />
      <SupportBanner />
      <AdSlot placement="below-converter" />
      <Features />
      <Formats />
      <FAQ />
    </main>
  );
}
