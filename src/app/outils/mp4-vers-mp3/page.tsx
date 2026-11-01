import type { Metadata } from "next";
import { ToolPage } from "@/components/tools/ToolPage";
import { toolBySlug } from "@/lib/tools/registry";

const tool = toolBySlug("mp4-vers-mp3")!;

export const metadata: Metadata = {
  title: "Convertisseur MP4 vers MP3",
  description: "Extrayez l’audio d’une vidéo MP4 vers MP3 gratuitement dans le navigateur.",
  alternates: { canonical: tool.href },
};

export default function Page() {
  return (
    <ToolPage
      tool={tool}
      guide={[
        "Ajoutez un fichier MP4 contenant une piste audio.",
        "Choisissez MP3 et le débit souhaité.",
        "Lancez la conversion : l’image est ignorée, seule l’audio est conservée.",
      ]}
      faq={[
        {
          q: "Et si la vidéo n’a pas d’audio ?",
          a: "La conversion s’arrête avec un message clair indiquant l’absence de piste audio.",
        },
        {
          q: "Puis-je utiliser un lien vidéo ?",
          a: "Oui via l’onglet Lien du convertisseur, pour les contenus que vous avez le droit de télécharger.",
        },
      ]}
    />
  );
}
