import type { Metadata } from "next";
import { ToolPage } from "@/components/tools/ToolPage";
import { toolBySlug } from "@/lib/tools/registry";

const tool = toolBySlug("flac-vers-mp3")!;

export const metadata: Metadata = {
  title: "Convertisseur FLAC vers MP3",
  description: "Passez d’un FLAC sans perte à un MP3 portable, gratuitement et localement.",
  alternates: { canonical: tool.href },
  openGraph: {
    title: "Convertisseur FLAC vers MP3",
    description: "Passez d’un FLAC sans perte à un MP3 portable, gratuitement et localement.",
    url: tool.href,
  },
};

export default function Page() {
  return (
    <ToolPage
      tool={tool}
      guide={["Importez un FLAC.", "Choisissez MP3 et un débit.", "Convertissez puis téléchargez."]}
      faq={[
        {
          q: "Le FLAC est-il compressé ?",
          a: "Oui, mais sans perte. Le MP3 introduit une compression avec perte pour gagner en compatibilité et en poids.",
        },
      ]}
    />
  );
}
