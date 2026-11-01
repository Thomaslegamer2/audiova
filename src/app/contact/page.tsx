import type { Metadata } from "next";
import { ContactContent } from "@/components/layout/LegalContent";
import { fr } from "@/i18n/fr";
import { contactEmail } from "@/lib/site";

export const metadata: Metadata = {
  title: fr.contact.metaTitle,
  description: fr.contact.metaDescription,
  alternates: { canonical: "/contact" },
  openGraph: {
    title: fr.contact.metaTitle,
    description: fr.contact.metaDescription,
    url: "/contact",
  },
};

export default function ContactPage() {
  return (
    <main>
      <ContactContent email={contactEmail()} />
    </main>
  );
}
