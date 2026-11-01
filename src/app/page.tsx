import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { AdSlot } from "@/components/layout/AdSlot";
import { SupportBanner } from "@/components/layout/SupportBanner";
import { Converter } from "@/components/converter/Converter";
import { Hero } from "@/components/home/Hero";
import { SeoConversions } from "@/components/home/SeoConversions";
import { fr } from "@/i18n/fr";
import { faqPageLd, jsonLdScript, organizationLd, webApplicationLd, websiteLd } from "@/lib/seo/json-ld";
import { buildPageMetadata } from "@/lib/seo/metadata";

const Features = dynamic(() => import("@/components/home/Features").then((mod) => mod.Features));
const Formats = dynamic(() => import("@/components/home/Formats").then((mod) => mod.Formats));
const FAQ = dynamic(() => import("@/components/home/FAQ").then((mod) => mod.FAQ));

export const metadata: Metadata = {
  ...buildPageMetadata({
    title: "Convertisseur MP3 en ligne gratuit — Audiova",
    description: fr.meta.description,
    path: "/",
    keywords: [
      "convertisseur mp3",
      "convertir en mp3",
      "wav vers mp3",
      "flac vers mp3",
      "mp4 vers mp3",
      "convertisseur audio gratuit",
      "ffmpeg navigateur",
    ],
  }),
  title: {
    absolute: "Convertisseur MP3 en ligne gratuit — Audiova",
  },
};

export default function HomePage() {
  const faqLd = faqPageLd(
    fr.faq.items.slice(0, 8).map((item) => ({
      question: item.question,
      answer: item.answer.join(" "),
    })),
  );

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(webApplicationLd()) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(organizationLd()) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(websiteLd()) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(faqLd) }} />
      <Hero />
      <Converter />
      <SupportBanner />
      <AdSlot placement="below-converter" />
      <SeoConversions />
      <Features />
      <Formats />
      <FAQ />
    </main>
  );
}
