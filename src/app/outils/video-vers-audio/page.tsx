import type { Metadata } from "next";
import { ToolPage } from "@/components/tools/ToolPage";
import { toolBySlug } from "@/lib/tools/registry";

const tool = toolBySlug("video-vers-audio")!;

export const metadata: Metadata = {
  title: "Vidéo vers audio (MP4, MOV, WebM, MKV)",
  description: "Extrayez la piste audio d’une vidéo compatible vers MP3, WAV, FLAC, AAC, OGG ou M4A.",
  alternates: { canonical: tool.href },
  openGraph: {
    title: "Vidéo vers audio (MP4, MOV, WebM, MKV)",
    description: "Extrayez la piste audio d’une vidéo compatible vers MP3, WAV, FLAC, AAC, OGG ou M4A.",
    url: tool.href,
  },
};

export default function Page() {
  return (
    <ToolPage
      tool={tool}
      guide={[
        "Importez MP4, MOV, WebM ou MKV.",
        "Choisissez le format audio de sortie.",
        "Convertissez : seule la piste audio est traitée.",
      ]}
      faq={[
        {
          q: "Quels conteneurs vidéo ?",
          a: "MP4, MOV, WebM et MKV lorsqu’une piste audio est présente.",
        },
      ]}
    />
  );
}
