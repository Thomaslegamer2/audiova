import { BITRATES, SAMPLE_RATES, type Bitrate, type OutputFormatId, type SampleRateOption } from "@/types/audio";

export { BITRATES, SAMPLE_RATES };

export const MAX_FILE_BYTES = 100 * 1024 * 1024;
export const MAX_FILES = 5;
export const MAX_HISTORY = 12;
export const CONVERSION_TIMEOUT_MS = 15 * 60 * 1000;
export const WAVEFORM_MAX_BYTES = 6 * 1024 * 1024;
export const COPYRIGHT_YEAR = 2026;

export const DEFAULT_BITRATE: Bitrate = 192;

export interface InputFormat {
  id: string;
  extensions: readonly string[];
  label: string;
  detail: string;
  video: boolean;
}

export const INPUT_FORMATS: readonly InputFormat[] = [
  { id: "mp3", extensions: ["mp3"], label: "MP3", detail: "MPEG Audio Layer III", video: false },
  { id: "wav", extensions: ["wav", "wave"], label: "WAV", detail: "PCM", video: false },
  { id: "flac", extensions: ["flac"], label: "FLAC", detail: "Sans perte", video: false },
  { id: "ogg", extensions: ["ogg", "oga"], label: "OGG", detail: "Vorbis", video: false },
  { id: "opus", extensions: ["opus"], label: "Opus", detail: "Opus dans Ogg", video: false },
  { id: "aac", extensions: ["aac"], label: "AAC", detail: "ADTS", video: false },
  { id: "m4a", extensions: ["m4a", "m4b"], label: "M4A", detail: "AAC ou ALAC", video: false },
  { id: "aiff", extensions: ["aiff", "aif"], label: "AIFF", detail: "PCM Apple", video: false },
  { id: "caf", extensions: ["caf"], label: "CAF", detail: "Core Audio", video: false },
  { id: "wma", extensions: ["wma"], label: "WMA", detail: "Windows Media Audio 2", video: false },
  { id: "alac", extensions: ["alac"], label: "ALAC", detail: "Apple Lossless", video: false },
  { id: "mp4", extensions: ["mp4", "m4v"], label: "MP4", detail: "Piste audio extraite, image ignorée", video: true },
  { id: "mov", extensions: ["mov"], label: "MOV", detail: "Piste audio extraite, image ignorée", video: true },
  { id: "webm", extensions: ["webm"], label: "WebM", detail: "Piste audio extraite, image ignorée", video: true },
  { id: "mkv", extensions: ["mkv"], label: "MKV", detail: "Piste audio extraite, image ignorée", video: true },
];

export interface OutputFormat {
  id: OutputFormatId;
  label: string;
  extension: string;
  mime: string;
  codec: string;
  bitrate: boolean;
  detail: string;
}

export const OUTPUT_FORMATS: readonly OutputFormat[] = [
  {
    id: "mp3",
    label: "MP3",
    extension: "mp3",
    mime: "audio/mpeg",
    codec: "libmp3lame",
    bitrate: true,
    detail: "Lecture presque universelle. Le débit se règle de 64 à 320 kb/s.",
  },
  {
    id: "wav",
    label: "WAV",
    extension: "wav",
    mime: "audio/wav",
    codec: "pcm_s16le",
    bitrate: false,
    detail: "PCM 16 bits, sans compression. Le débit n'est pas réglable.",
  },
  {
    id: "flac",
    label: "FLAC",
    extension: "flac",
    mime: "audio/flac",
    codec: "flac",
    bitrate: false,
    detail: "Compression sans perte. Le débit n'est pas réglable.",
  },
  {
    id: "aac",
    label: "AAC",
    extension: "aac",
    mime: "audio/aac",
    codec: "aac",
    bitrate: true,
    detail: "Encodeur AAC natif, fichier ADTS.",
  },
  {
    id: "ogg",
    label: "OGG",
    extension: "ogg",
    mime: "audio/ogg",
    codec: "libvorbis",
    bitrate: true,
    detail: "Vorbis, courant sur le web et les logiciels libres.",
  },
  {
    id: "m4a",
    label: "M4A",
    extension: "m4a",
    mime: "audio/mp4",
    codec: "aac",
    bitrate: true,
    detail: "AAC dans un conteneur MP4, adapté aux bibliothèques Apple.",
  },
];

const extensionMap = new Map<string, InputFormat>();

for (const format of INPUT_FORMATS) {
  for (const extension of format.extensions) {
    extensionMap.set(extension, format);
  }
}

export function inputFormatFor(extension: string): InputFormat | undefined {
  return extensionMap.get(extension);
}

export function outputFormatFor(id: OutputFormatId): OutputFormat {
  const format = OUTPUT_FORMATS.find((item) => item.id === id);
  if (!format) {
    throw new Error(`Format de sortie inconnu : ${id}`);
  }
  return format;
}

export function isOutputFormatId(value: unknown): value is OutputFormatId {
  return typeof value === "string" && OUTPUT_FORMATS.some((format) => format.id === value);
}

export function isSampleRateOption(value: unknown): value is SampleRateOption {
  return value === "auto" || value === 22050 || value === 44100 || value === 48000;
}

export function isBitrate(value: unknown): value is Bitrate {
  return typeof value === "number" && (BITRATES as readonly number[]).includes(value);
}

export const ACCEPTED_EXTENSIONS = INPUT_FORMATS.flatMap((format) =>
  format.extensions.map((extension) => `.${extension}`),
).join(",");

export function audioInputSummary(): string {
  return INPUT_FORMATS.filter((format) => !format.video)
    .map((format) => format.label)
    .join(", ");
}

export function videoInputSummary(): string {
  return INPUT_FORMATS.filter((format) => format.video)
    .map((format) => format.label)
    .join(", ");
}
