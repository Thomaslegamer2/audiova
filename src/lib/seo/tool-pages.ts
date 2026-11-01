import type { ToolDefinition } from "@/lib/tools/registry";

export interface ToolSeoContent {
  slug: string;
  guide: string[];
  faq: Array<{ q: string; a: string }>;
  intro?: string;
  metaTitle: string;
  metaDescription: string;
}

const DEFAULT_GUIDE = [
  "Importez votre fichier audio ou vidéo dans le convertisseur.",
  "Sélectionnez MP3 et un débit (Podcast 128, Équilibré 192 ou Qualité maximale 320).",
  "Lancez la conversion locale, puis téléchargez le résultat.",
];

export const TOOL_SEO: Record<string, ToolSeoContent> = {
  "convertisseur-mp3": {
    slug: "convertisseur-mp3",
    metaTitle: "Convertisseur MP3 en ligne gratuit",
    metaDescription:
      "Convertisseur MP3 gratuit dans le navigateur. WAV, FLAC, M4A, OGG, AAC et vidéos. Sans compte, conversion locale.",
    guide: DEFAULT_GUIDE,
    faq: [
      {
        q: "Le fichier est-il envoyé sur un serveur ?",
        a: "Non pour un fichier choisi sur votre appareil. L’encodage est local via FFmpeg.wasm.",
      },
      {
        q: "Quelle qualité choisir ?",
        a: "320 kb/s pour la meilleure qualité MP3, 192 pour l’équilibre, 128 pour la voix.",
      },
    ],
  },
  "wav-vers-mp3": {
    slug: "wav-vers-mp3",
    metaTitle: "Convertisseur WAV vers MP3 gratuit",
    metaDescription:
      "Convertissez un WAV en MP3 en ligne, gratuitement. Débit réglable, conversion dans le navigateur, sans compte.",
    intro:
      "Le WAV est souvent non compressé. Passer en MP3 réduit fortement la taille tout en restant lisible partout.",
    guide: [
      "Importez un fichier .wav (PCM lisible).",
      "Sélectionnez la sortie MP3 et un débit adapté.",
      "Convertissez localement puis téléchargez le MP3.",
    ],
    faq: [
      {
        q: "Le WAV devient-il plus léger ?",
        a: "Oui en général : le WAV est souvent non compressé, le MP3 réduit fortement la taille selon le débit.",
      },
      {
        q: "Y a-t-il une perte ?",
        a: "Oui, le MP3 est avec perte. Pour du sans perte, gardez le WAV ou choisissez FLAC.",
      },
    ],
  },
  "flac-vers-mp3": {
    slug: "flac-vers-mp3",
    metaTitle: "Convertisseur FLAC vers MP3 gratuit",
    metaDescription: "Passez d’un FLAC sans perte à un MP3 portable, gratuitement et localement dans le navigateur.",
    intro: "Le FLAC conserve toute la qualité. Le MP3 est plus compatible et plus léger pour le partage.",
    guide: ["Importez un FLAC.", "Choisissez MP3 et un débit.", "Convertissez puis téléchargez."],
    faq: [
      {
        q: "Le FLAC est-il compressé ?",
        a: "Oui, mais sans perte. Le MP3 introduit une compression avec perte pour gagner en compatibilité.",
      },
    ],
  },
  "m4a-vers-mp3": {
    slug: "m4a-vers-mp3",
    metaTitle: "Convertisseur M4A vers MP3 gratuit",
    metaDescription: "Convertissez M4A/AAC en MP3 pour une lecture plus universelle. Gratuit, dans le navigateur.",
    guide: ["Ajoutez un fichier .m4a.", "Sélectionnez MP3.", "Convertissez localement."],
    faq: [
      {
        q: "Les métadonnées sont-elles gardées ?",
        a: "Oui lorsque l’option est active et que FFmpeg peut les recopier.",
      },
    ],
  },
  "ogg-vers-mp3": {
    slug: "ogg-vers-mp3",
    metaTitle: "Convertisseur OGG vers MP3 gratuit",
    metaDescription: "Convertissez OGG/Vorbis en MP3 en ligne. Gratuit, local, sans compte.",
    guide: DEFAULT_GUIDE,
    faq: [
      {
        q: "Pourquoi passer en MP3 ?",
        a: "Le MP3 est lu presque partout ; l’OGG reste excellent mais moins universel sur certains appareils.",
      },
    ],
  },
  "aac-vers-mp3": {
    slug: "aac-vers-mp3",
    metaTitle: "Convertisseur AAC vers MP3 gratuit",
    metaDescription: "Convertissez un fichier AAC en MP3 en ligne, gratuitement, dans votre navigateur.",
    guide: DEFAULT_GUIDE,
    faq: [
      {
        q: "AAC et M4A, quelle différence ?",
        a: "L’AAC est le codec ; le M4A est souvent le conteneur. Audiova lit les deux vers MP3.",
      },
    ],
  },
  "aiff-vers-mp3": {
    slug: "aiff-vers-mp3",
    metaTitle: "Convertisseur AIFF vers MP3 gratuit",
    metaDescription: "Convertissez un AIFF ou AIF en MP3 gratuitement dans le navigateur.",
    guide: DEFAULT_GUIDE,
    faq: [
      {
        q: "L’AIFF est-il sans perte ?",
        a: "Souvent oui (PCM). Le MP3 réduit la taille avec une compression avec perte.",
      },
    ],
  },
  "wma-vers-mp3": {
    slug: "wma-vers-mp3",
    metaTitle: "Convertisseur WMA vers MP3 gratuit",
    metaDescription: "Convertissez un WMA en MP3 en ligne pour une meilleure compatibilité.",
    guide: DEFAULT_GUIDE,
    faq: [
      {
        q: "Pourquoi convertir un WMA ?",
        a: "Le MP3 est supporté plus largement que le WMA sur téléphones et lecteurs.",
      },
    ],
  },
  "opus-vers-mp3": {
    slug: "opus-vers-mp3",
    metaTitle: "Convertisseur Opus vers MP3 gratuit",
    metaDescription: "Convertissez un fichier Opus en MP3 portable, gratuitement et localement.",
    guide: DEFAULT_GUIDE,
    faq: [
      {
        q: "Opus est-il meilleur que MP3 ?",
        a: "Souvent à débit égal, oui. Le MP3 reste plus compatible sur le matériel ancien.",
      },
    ],
  },
  "mp4-vers-mp3": {
    slug: "mp4-vers-mp3",
    metaTitle: "Convertisseur MP4 vers MP3 gratuit",
    metaDescription: "Extrayez l’audio d’une vidéo MP4 vers MP3 gratuitement dans le navigateur.",
    guide: [
      "Ajoutez un fichier MP4 contenant une piste audio.",
      "Choisissez MP3 et le débit souhaité.",
      "Lancez la conversion : l’image est ignorée.",
    ],
    faq: [
      {
        q: "Et si la vidéo n’a pas d’audio ?",
        a: "La conversion s’arrête avec un message clair indiquant l’absence de piste audio.",
      },
    ],
  },
  "mov-vers-mp3": {
    slug: "mov-vers-mp3",
    metaTitle: "Convertisseur MOV vers MP3 gratuit",
    metaDescription: "Extrayez l’audio d’une vidéo MOV (QuickTime) vers MP3 en ligne, gratuitement.",
    guide: DEFAULT_GUIDE,
    faq: [
      {
        q: "Le MOV Apple est-il accepté ?",
        a: "Oui si une piste audio est présente et lisible par le moteur.",
      },
    ],
  },
  "webm-vers-mp3": {
    slug: "webm-vers-mp3",
    metaTitle: "Convertisseur WebM vers MP3 gratuit",
    metaDescription: "Extrayez la piste audio d’une vidéo WebM vers MP3, gratuitement dans le navigateur.",
    guide: DEFAULT_GUIDE,
    faq: [
      {
        q: "WebM contient-il toujours de l’audio ?",
        a: "Non. Sans piste audio, Audiova l’indique clairement.",
      },
    ],
  },
  "mkv-vers-mp3": {
    slug: "mkv-vers-mp3",
    metaTitle: "Convertisseur MKV vers MP3 gratuit",
    metaDescription: "Extrayez l’audio d’une vidéo MKV vers MP3 en ligne, gratuitement.",
    guide: DEFAULT_GUIDE,
    faq: [
      {
        q: "Les pistes multiples MKV ?",
        a: "Le moteur traite la piste audio principale exploitable. Vérifiez le résultat avant de supprimer l’original.",
      },
    ],
  },
  "video-vers-audio": {
    slug: "video-vers-audio",
    metaTitle: "Vidéo vers audio (MP4, MOV, WebM, MKV)",
    metaDescription:
      "Extrayez la piste audio d’une vidéo compatible vers MP3, WAV, FLAC, AAC, OGG ou M4A.",
    guide: [
      "Importez MP4, MOV, WebM ou MKV.",
      "Choisissez le format audio de sortie.",
      "Convertissez : seule la piste audio est traitée.",
    ],
    faq: [
      {
        q: "Quels conteneurs vidéo ?",
        a: "MP4, MOV, WebM et MKV lorsqu’une piste audio est présente.",
      },
    ],
  },
};

export function toolSeoFor(tool: ToolDefinition): ToolSeoContent {
  return (
    TOOL_SEO[tool.slug] ?? {
      slug: tool.slug,
      metaTitle: `${tool.title} gratuit en ligne`,
      metaDescription: tool.description,
      guide: DEFAULT_GUIDE,
      faq: [
        {
          q: "La conversion est-elle gratuite ?",
          a: "Oui. Audiova est gratuit et sans compte pour cette version.",
        },
      ],
    }
  );
}
