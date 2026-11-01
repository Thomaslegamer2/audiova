import type { Metadata } from "next";
import { PrivacyContent } from "@/components/layout/LegalContent";
import { fr } from "@/i18n/fr";

export const metadata: Metadata = {
  title: fr.privacy.metaTitle,
  description: fr.privacy.metaDescription,
  alternates: { canonical: "/privacy" },
  openGraph: {
    title: fr.privacy.metaTitle,
    description: fr.privacy.metaDescription,
    url: "/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <main>
      <PrivacyContent />
    </main>
  );
}
