import type { Metadata } from "next";
import { ToolPage } from "@/components/tools/ToolPage";
import { toolBySlug } from "@/lib/tools/registry";

const tool = toolBySlug("ogg-vers-mp3")!;

export const metadata: Metadata = {
  title: "Convertisseur OGG vers MP3 gratuit",
  description:
    "Convertissez un fichier OGG ou Vorbis en MP3 en ligne, gratuitement, dans votre navigateur. Débit réglable, sans compte.",
  alternates: { canonical: tool.href },
  openGraph: {
    title: "Convertisseur OGG vers MP3 gratuit",
    description:
      "Passez d’un OGG/Vorbis à un MP3 universel. Conversion locale via FFmpeg.wasm.",
    url: tool.href,
  },
};

export default function Page() {
  return (
    <ToolPage
      tool={tool}
      guide={[
        "Importez un fichier .ogg ou .oga.",
        "Sélectionnez la sortie MP3 et un débit (Podcast 128, Équilibré 192 ou Qualité maximale 320).",
        "Lancez la conversion locale, puis téléchargez le MP3.",
      ]}
      faq={[
        {
          q: "Pourquoi passer en MP3 ?",
          a: "Le MP3 est lu presque partout. L’OGG/Vorbis reste excellent, mais moins universel sur certains appareils.",
        },
        {
          q: "Y a-t-il une perte ?",
          a: "Oui : le MP3 est avec perte. Choisissez 320 kb/s pour limiter l’écart, ou gardez l’OGG si votre lecteur le prend en charge.",
        },
      ]}
    />
  );
}
