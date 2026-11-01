export interface GuidePage {
  slug: string;
  href: string;
  title: string;
  description: string;
  keywords: string[];
  intro: string;
  sections: Array<{ heading: string; paragraphs: string[] }>;
  cta: { label: string; href: string };
}

export const GUIDE_PAGES: readonly GuidePage[] = [
  {
    slug: "convertir-audio-en-mp3",
    href: "/guides/convertir-audio-en-mp3",
    title: "Comment convertir un fichier audio en MP3",
    description:
      "Guide simple pour convertir WAV, FLAC, M4A ou OGG en MP3 en ligne, gratuitement, dans le navigateur avec Audiova.",
    keywords: ["convertir audio en mp3", "convertisseur mp3", "wav en mp3", "flac en mp3"],
    intro:
      "Convertir un fichier audio en MP3 permet de le lire presque partout et de réduire sa taille. Avec Audiova, la conversion se fait dans votre navigateur : pas de compte, et vos fichiers locaux ne sont pas envoyés à un serveur de conversion.",
    sections: [
      {
        heading: "Pourquoi passer en MP3 ?",
        paragraphs: [
          "Le MP3 reste le format le plus compatible : téléphones, voitures, lecteurs portables, logiciels d’édition. Un WAV ou un FLAC est souvent plus lourd ; le MP3 réduit la taille selon le débit choisi (128, 192 ou 320 kb/s).",
        ],
      },
      {
        heading: "Étapes avec Audiova",
        paragraphs: [
          "1. Ouvrez le convertisseur et importez votre fichier (ou un dossier).",
          "2. Laissez MP3 sélectionné, choisissez un preset (Podcast 128, Équilibré 192 ou Qualité maximale 320).",
          "3. Lancez la conversion, puis téléchargez le fichier produit.",
        ],
      },
      {
        heading: "Formats acceptés",
        paragraphs: [
          "Audiova lit notamment WAV, FLAC, M4A, AAC, OGG, Opus, AIFF, WMA, ainsi que les pistes audio de MP4, MOV, WebM et MKV.",
        ],
      },
    ],
    cta: { label: "Convertir en MP3 maintenant", href: "/#convertisseur" },
  },
  {
    slug: "choisir-debit-mp3",
    href: "/guides/choisir-debit-mp3",
    title: "Quel débit MP3 choisir : 128, 192 ou 320 kb/s ?",
    description:
      "Comparatif des débits MP3 pour podcast, musique et archive. Conseils pour choisir 128, 192 ou 320 kb/s avec Audiova.",
    keywords: ["débit mp3", "128 kb/s", "192 kb/s", "320 kb/s", "qualité mp3"],
    intro:
      "Le débit (bitrate) détermine la quantité de données audio conservées chaque seconde. Plus il est élevé, plus le fichier est fidèle… et lourd.",
    sections: [
      {
        heading: "128 kb/s — Podcast / voix",
        paragraphs: [
          "Idéal pour la parole, les podcasts et les fichiers destinés au web. Fichier léger, qualité suffisante pour la voix.",
        ],
      },
      {
        heading: "192 kb/s — Équilibre",
        paragraphs: [
          "Bon compromis musique / taille pour un usage quotidien. Souvent indiscernable du 320 kb/s sur des écouteurs classiques.",
        ],
      },
      {
        heading: "320 kb/s — Qualité maximale MP3",
        paragraphs: [
          "Le plafond MP3. À privilégier si vous archivez ou écoutez sur un bon casque. Pour une fidélité sans perte, choisissez plutôt FLAC ou WAV.",
        ],
      },
    ],
    cta: { label: "Essayer les presets Audiova", href: "/#convertisseur" },
  },
  {
    slug: "conversion-locale-confidentialite",
    href: "/guides/conversion-locale-confidentialite",
    title: "Conversion audio locale : confidentialité et navigateur",
    description:
      "Comment Audiova convertit vos fichiers audio dans le navigateur avec FFmpeg.wasm, sans téléversement pour le mode fichier.",
    keywords: ["conversion locale", "ffmpeg.wasm", "confidentialité audio", "sans upload"],
    intro:
      "Beaucoup de convertisseurs en ligne envoient votre fichier sur un serveur. Audiova encode localement via FFmpeg.wasm lorsque vous choisissez un fichier sur votre appareil.",
    sections: [
      {
        heading: "Mode fichier = local",
        paragraphs: [
          "Votre navigateur lit le fichier et le moteur WebAssembly l’encode sur votre appareil. Aucune copie n’est conservée sur un serveur de conversion.",
        ],
      },
      {
        heading: "Mode lien = exception",
        paragraphs: [
          "Si vous collez une URL, le serveur télécharge temporairement le média pour le renvoyer au navigateur. Ce n’est pas un mode « sans envoi ». Les plateformes de streaming interdites sont bloquées.",
        ],
      },
      {
        heading: "Moteur FFmpeg",
        paragraphs: [
          "À la première conversion, environ 32 Mo de moteur sont chargés depuis ce site. Cela concerne le programme d’encodage, pas votre audio.",
        ],
      },
    ],
    cta: { label: "Lire la page confidentialité", href: "/privacy" },
  },
  {
    slug: "extraire-audio-d-une-video",
    href: "/guides/extraire-audio-d-une-video",
    title: "Extraire l’audio d’une vidéo (MP4, MOV, WebM, MKV)",
    description:
      "Comment extraire la piste audio d’une vidéo vers MP3 en ligne, gratuitement, avec Audiova.",
    keywords: ["extraire audio vidéo", "mp4 vers mp3", "vidéo vers mp3", "extraire son"],
    intro:
      "Vous avez une vidéo et voulez uniquement le son ? Audiova ignore l’image et convertit la piste audio vers MP3 (ou un autre format).",
    sections: [
      {
        heading: "Conteneurs pris en charge",
        paragraphs: ["MP4, MOV, WebM et MKV lorsqu’une piste audio est présente."],
      },
      {
        heading: "Méthode",
        paragraphs: [
          "Importez la vidéo, choisissez MP3 et un débit, lancez la conversion, puis téléchargez le fichier audio.",
        ],
      },
      {
        heading: "Sans piste audio",
        paragraphs: [
          "Si le fichier n’a pas de son exploitable, Audiova affiche un message clair en français et n’invente pas de résultat.",
        ],
      },
    ],
    cta: { label: "Ouvrir MP4 vers MP3", href: "/outils/mp4-vers-mp3" },
  },
];

export function guideBySlug(slug: string): GuidePage | undefined {
  return GUIDE_PAGES.find((guide) => guide.slug === slug);
}
