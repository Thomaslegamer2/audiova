import { getSiteUrl } from "@/lib/site";
import { fr } from "@/i18n/fr";

export function jsonLdScript(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export function webApplicationLd() {
  const site = getSiteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Audiova",
    alternateName: "Convertisseur MP3 Audiova",
    url: site,
    applicationCategory: "MultimediaApplication",
    operatingSystem: "Web",
    inLanguage: "fr",
    description: fr.meta.description,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "EUR",
    },
    browserRequirements: "Requires JavaScript and WebAssembly",
    featureList: [
      "Conversion audio vers MP3 dans le navigateur",
      "WAV, FLAC, M4A, OGG, AAC vers MP3",
      "Extraction audio depuis MP4, MOV, WebM, MKV",
      "Sans compte",
      "Conversion locale via FFmpeg.wasm",
    ],
  };
}

export function organizationLd() {
  const site = getSiteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Audiova",
    url: site,
    logo: `${site}/icon`,
    description: fr.meta.description,
  };
}

export function websiteLd() {
  const site = getSiteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Audiova",
    url: site,
    inLanguage: "fr",
    description: fr.meta.description,
  };
}

export function faqPageLd(items: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function breadcrumbLd(items: Array<{ name: string; path: string }>) {
  const site = getSiteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.path.startsWith("http") ? item.path : `${site}${item.path}`,
    })),
  };
}

export function howToLd({
  name,
  description,
  steps,
  path,
}: {
  name: string;
  description: string;
  steps: string[];
  path: string;
}) {
  const site = getSiteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name,
    description,
    url: `${site}${path}`,
    inLanguage: "fr",
    step: steps.map((text, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: `Étape ${index + 1}`,
      text,
    })),
  };
}
