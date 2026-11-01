import type { Metadata } from "next";
import { ToolPage } from "@/components/tools/ToolPage";
import { toolBySlug } from "@/lib/tools/registry";

const tool = toolBySlug("convertisseur-mp3")!;

export const metadata: Metadata = {
  title: tool.title,
  description: tool.description,
  alternates: { canonical: tool.href },
  openGraph: { title: tool.title, description: tool.description, url: tool.href },
};

export default function Page() {
  return (
    <ToolPage
      tool={tool}
      guide={[
        "Ouvrez le convertisseur ci-dessous et ajoutez un fichier audio ou une vidéo.",
        "Laissez MP3 sélectionné, puis choisissez un débit (192 kb/s par défaut).",
        "Lancez la conversion : elle s’exécute dans votre navigateur.",
        "Téléchargez le fichier MP3 produit.",
      ]}
      faq={[
        {
          q: "Le fichier est-il envoyé sur un serveur ?",
          a: "Non pour un fichier choisi sur votre appareil. L’encodage est local via FFmpeg.wasm.",
        },
        {
          q: "Quelle qualité choisir ?",
          a: "192 kb/s convient à la plupart des usages. 128 kb/s pour la voix, 320 kb/s pour conserver plus de détail.",
        },
      ]}
    />
  );
}
