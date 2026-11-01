import type { Metadata } from "next";
import { ToolPage } from "@/components/tools/ToolPage";
import { toolBySlug } from "@/lib/tools/registry";

const tool = toolBySlug("wav-vers-mp3")!;

export const metadata: Metadata = {
  title: "Convertisseur WAV vers MP3 gratuit",
  description: "Convertissez un fichier WAV en MP3 en ligne, gratuitement, dans votre navigateur. Débit réglable, sans compte.",
  alternates: { canonical: tool.href },
  openGraph: {
    title: "Convertisseur WAV vers MP3 gratuit",
    description: "Convertissez un fichier WAV en MP3 en ligne, gratuitement, dans votre navigateur.",
    url: tool.href,
  },
};

export default function Page() {
  return (
    <ToolPage
      tool={tool}
      guide={[
        "Importez un fichier .wav (PCM lisible).",
        "Sélectionnez la sortie MP3 et un débit adapté.",
        "Convertissez localement puis téléchargez le MP3.",
      ]}
      faq={[
        {
          q: "Le WAV devient-il plus léger ?",
          a: "Oui en général : le WAV est souvent non compressé, le MP3 réduit fortement la taille selon le débit.",
        },
        {
          q: "Y a-t-il une perte ?",
          a: "Oui, le MP3 est avec perte. Pour conserver la qualité sans perte, gardez le WAV ou choisissez FLAC.",
        },
      ]}
    />
  );
}
