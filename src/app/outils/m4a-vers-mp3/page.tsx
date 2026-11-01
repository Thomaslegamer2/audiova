import type { Metadata } from "next";
import { ToolPage } from "@/components/tools/ToolPage";
import { toolBySlug } from "@/lib/tools/registry";

const tool = toolBySlug("m4a-vers-mp3")!;

export const metadata: Metadata = {
  title: "Convertisseur M4A vers MP3",
  description: "Convertissez M4A/AAC en MP3 pour une lecture plus universelle.",
  alternates: { canonical: tool.href },
};

export default function Page() {
  return (
    <ToolPage
      tool={tool}
      guide={["Ajoutez un fichier .m4a.", "Sélectionnez MP3.", "Convertissez localement."]}
      faq={[{ q: "Les métadonnées sont-elles gardées ?", a: "Oui lorsque l’option est active et que FFmpeg peut les recopier." }]}
    />
  );
}
