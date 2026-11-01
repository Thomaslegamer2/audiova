import type { Metadata } from "next";
import { LegalContent } from "@/components/layout/LegalContent";
import { fr } from "@/i18n/fr";

export const metadata: Metadata = {
  title: fr.legal.metaTitle,
  description: fr.legal.metaDescription,
  alternates: { canonical: "/legal" },
  openGraph: {
    title: fr.legal.metaTitle,
    description: fr.legal.metaDescription,
    url: "/legal",
  },
};

export default function LegalPage() {
  return (
    <main>
      <LegalContent />
    </main>
  );
}
