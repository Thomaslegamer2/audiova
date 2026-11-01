export type ToolStatus = "live" | "planned";

export interface ToolDefinition {
  id: string;
  slug: string;
  title: string;
  description: string;
  status: ToolStatus;
  href: string;
  keywords: string[];
}

/**
 * Catalogue des outils Audiova.
 * Seuls les outils `live` doivent être présentés comme opérationnels.
 */
export const TOOL_REGISTRY: readonly ToolDefinition[] = [
  {
    id: "convert-mp3",
    slug: "convertisseur-mp3",
    title: "Convertisseur MP3",
    description: "Convertissez vos fichiers audio vers MP3 dans le navigateur.",
    status: "live",
    href: "/outils/convertisseur-mp3",
    keywords: ["mp3", "convertisseur", "audio"],
  },
  {
    id: "wav-mp3",
    slug: "wav-vers-mp3",
    title: "WAV vers MP3",
    description: "Réduisez la taille d’un WAV en MP3 avec débit réglable.",
    status: "live",
    href: "/outils/wav-vers-mp3",
    keywords: ["wav", "mp3"],
  },
  {
    id: "mp4-mp3",
    slug: "mp4-vers-mp3",
    title: "MP4 vers MP3",
    description: "Extrayez la piste audio d’une vidéo MP4 vers MP3.",
    status: "live",
    href: "/outils/mp4-vers-mp3",
    keywords: ["mp4", "mp3", "vidéo"],
  },
  {
    id: "flac-mp3",
    slug: "flac-vers-mp3",
    title: "FLAC vers MP3",
    description: "Passez d’un FLAC sans perte à un MP3 portable.",
    status: "live",
    href: "/outils/flac-vers-mp3",
    keywords: ["flac", "mp3"],
  },
  {
    id: "m4a-mp3",
    slug: "m4a-vers-mp3",
    title: "M4A vers MP3",
    description: "Convertissez un M4A/AAC en MP3 universel.",
    status: "live",
    href: "/outils/m4a-vers-mp3",
    keywords: ["m4a", "mp3", "aac"],
  },
  {
    id: "ogg-mp3",
    slug: "ogg-vers-mp3",
    title: "OGG vers MP3",
    description: "Convertissez un fichier OGG/Vorbis en MP3 portable.",
    status: "live",
    href: "/outils/ogg-vers-mp3",
    keywords: ["ogg", "mp3", "vorbis"],
  },
  {
    id: "aac-mp3",
    slug: "aac-vers-mp3",
    title: "AAC vers MP3",
    description: "Convertissez un fichier AAC en MP3 universel.",
    status: "live",
    href: "/outils/aac-vers-mp3",
    keywords: ["aac", "mp3", "convertisseur aac"],
  },
  {
    id: "aiff-mp3",
    slug: "aiff-vers-mp3",
    title: "AIFF vers MP3",
    description: "Passez d’un AIFF Apple à un MP3 compatible partout.",
    status: "live",
    href: "/outils/aiff-vers-mp3",
    keywords: ["aiff", "mp3", "aif"],
  },
  {
    id: "wma-mp3",
    slug: "wma-vers-mp3",
    title: "WMA vers MP3",
    description: "Convertissez un WMA Windows Media en MP3.",
    status: "live",
    href: "/outils/wma-vers-mp3",
    keywords: ["wma", "mp3"],
  },
  {
    id: "opus-mp3",
    slug: "opus-vers-mp3",
    title: "Opus vers MP3",
    description: "Convertissez un fichier Opus en MP3 portable.",
    status: "live",
    href: "/outils/opus-vers-mp3",
    keywords: ["opus", "mp3"],
  },
  {
    id: "mov-mp3",
    slug: "mov-vers-mp3",
    title: "MOV vers MP3",
    description: "Extrayez l’audio d’une vidéo QuickTime MOV vers MP3.",
    status: "live",
    href: "/outils/mov-vers-mp3",
    keywords: ["mov", "mp3", "quicktime"],
  },
  {
    id: "webm-mp3",
    slug: "webm-vers-mp3",
    title: "WebM vers MP3",
    description: "Extrayez la piste audio d’une vidéo WebM vers MP3.",
    status: "live",
    href: "/outils/webm-vers-mp3",
    keywords: ["webm", "mp3"],
  },
  {
    id: "mkv-mp3",
    slug: "mkv-vers-mp3",
    title: "MKV vers MP3",
    description: "Extrayez l’audio d’une vidéo MKV vers MP3.",
    status: "live",
    href: "/outils/mkv-vers-mp3",
    keywords: ["mkv", "mp3"],
  },
  {
    id: "video-audio",
    slug: "video-vers-audio",
    title: "Vidéo vers audio",
    description: "Extrayez l’audio de MP4, MOV, WebM ou MKV.",
    status: "live",
    href: "/outils/video-vers-audio",
    keywords: ["vidéo", "audio", "extraction"],
  },
  {
    id: "trim",
    slug: "decoupeur-mp3",
    title: "Découpeur MP3",
    description: "Découpez une plage audio. Architecture prête, outil à finaliser.",
    status: "planned",
    href: "/outils",
    keywords: ["découpe", "trim"],
  },
  {
    id: "merge",
    slug: "fusion-audio",
    title: "Fusion audio",
    description: "Fusionnez plusieurs pistes. Prévu dans une prochaine version.",
    status: "planned",
    href: "/outils",
    keywords: ["fusion", "merge"],
  },
  {
    id: "compress",
    slug: "compresseur-audio",
    title: "Compresseur audio",
    description: "Compression ciblée. Disponible via le choix de débit MP3 dès maintenant.",
    status: "live",
    href: "/#convertisseur",
    keywords: ["compression", "bitrate"],
  },
  {
    id: "metadata",
    slug: "editeur-metadonnees",
    title: "Éditeur de métadonnées",
    description: "Conservation titre/artiste déjà proposée ; édition avancée prévue.",
    status: "planned",
    href: "/outils",
    keywords: ["métadonnées", "tags"],
  },
];

export function liveTools(): ToolDefinition[] {
  return TOOL_REGISTRY.filter((tool) => tool.status === "live");
}

export function toolBySlug(slug: string): ToolDefinition | undefined {
  return TOOL_REGISTRY.find((tool) => tool.slug === slug);
}
