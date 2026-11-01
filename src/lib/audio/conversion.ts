import { outputFormatFor } from "@/lib/constants";
import type { AudioMetadata, ConversionSettings, ErrorCode, OutputFormatId } from "@/types/audio";

export class ConversionError extends Error {
  readonly code: ErrorCode;

  constructor(code: ErrorCode, detail?: string) {
    super(detail ?? code);
    this.name = "ConversionError";
    this.code = code;
  }
}

export function sanitizeBaseName(name: string): string {
  const segment = (name.split(/[/\\]/).pop() ?? "").replace(/^\.+/, "");
  const withoutExtension = segment.replace(/\.[^.]+$/, "");
  const cleaned = withoutExtension
    .replace(/[\u0000-\u001f\u007f]/g, "")
    .replace(/[\\/:*?"<>|]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 80);
  return cleaned || "audio";
}

export function sanitizeMetadataValue(value: string): string {
  return value
    .replace(/[\u0000-\u001f\u007f]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 200);
}

export function outputFileName(sourceName: string, customBase: string, format: OutputFormatId): string {
  const extension = outputFormatFor(format).extension;
  const base = customBase.trim() ? sanitizeBaseName(customBase) : sanitizeBaseName(sourceName);
  return `${base}.${extension}`;
}

export function uniqueOutputNames(names: string[]): string[] {
  const seen = new Map<string, number>();
  return names.map((name) => {
    const count = seen.get(name.toLowerCase()) ?? 0;
    seen.set(name.toLowerCase(), count + 1);
    if (count === 0) {
      return name;
    }
    const dot = name.lastIndexOf(".");
    const base = dot === -1 ? name : name.slice(0, dot);
    const extension = dot === -1 ? "" : name.slice(dot);
    return `${base} (${count + 1})${extension}`;
  });
}

export function buildFfmpegArgs(input: {
  inputName: string;
  outputName: string;
  settings: ConversionSettings;
  metadata: AudioMetadata;
}): string[] {
  const format = outputFormatFor(input.settings.format);
  const args = ["-i", input.inputName, "-vn"];

  if (input.settings.keepMetadata) {
    args.push("-map_metadata", "0");
  } else {
    args.push("-map_metadata", "-1");
  }

  const writeIdentity = !input.settings.keepMetadata && input.settings.keepTitleArtist;
  if (writeIdentity) {
    const title = input.metadata.title ? sanitizeMetadataValue(input.metadata.title) : "";
    const artist = input.metadata.artist ? sanitizeMetadataValue(input.metadata.artist) : "";
    if (title) {
      args.push("-metadata", `title=${title}`);
    }
    if (artist) {
      args.push("-metadata", `artist=${artist}`);
    }
  }

  if (input.settings.sampleRate !== "auto") {
    args.push("-ar", String(input.settings.sampleRate));
  }

  args.push("-c:a", format.codec);

  if (format.bitrate) {
    args.push("-b:a", `${input.settings.bitrate}k`);
  }

  const wroteTags =
    input.settings.keepMetadata ||
    (writeIdentity && Boolean(input.metadata.title || input.metadata.artist));

  if (format.id === "mp3" && wroteTags) {
    args.push("-id3v2_version", "3");
  }

  if (format.id === "m4a") {
    args.push("-movflags", "+faststart");
  }

  if (format.id === "aac") {
    args.push("-f", "adts");
  }

  args.push(input.outputName);
  return args;
}

function ascii(data: Uint8Array, offset: number, length: number): string {
  if (offset < 0 || offset + length > data.length) {
    return "";
  }
  let text = "";
  for (let index = 0; index < length; index += 1) {
    text += String.fromCharCode(data[offset + index] ?? 0);
  }
  return text;
}

export function hasValidSignature(format: OutputFormatId, data: Uint8Array): boolean {
  if (data.byteLength < 8) {
    return false;
  }

  switch (format) {
    case "mp3":
      return (
        ascii(data, 0, 3) === "ID3" ||
        (data[0] === 0xff && (data[1] & 0xe0) === 0xe0)
      );
    case "wav":
      return ascii(data, 0, 4) === "RIFF" && ascii(data, 8, 4) === "WAVE";
    case "flac":
      return ascii(data, 0, 4) === "fLaC";
    case "ogg":
      return ascii(data, 0, 4) === "OggS";
    case "m4a":
      return ascii(data, 4, 4) === "ftyp";
    case "aac":
      return data[0] === 0xff && (data[1] & 0xf6) === 0xf0;
    default:
      return false;
  }
}

export function classifyFfmpegFailure(logs: string): ErrorCode {
  const text = logs.toLowerCase();
  if (
    text.includes("out of memory") ||
    text.includes("cannot enlarge memory") ||
    text.includes("allocation failed") ||
    text.includes("oom")
  ) {
    return "memory";
  }
  if (
    text.includes("does not contain any stream") ||
    text.includes("matches no streams") ||
    text.includes("output file is empty") ||
    text.includes("no audio stream")
  ) {
    return "no-audio";
  }
  if (
    text.includes("invalid data") ||
    text.includes("error while decoding") ||
    text.includes("header missing") ||
    text.includes("invalid argument") ||
    text.includes("moov atom not found")
  ) {
    return "damaged";
  }
  return "failed";
}

export function logTechnical(code: string, detail?: string): void {
  if (process.env.NODE_ENV !== "development") {
    console.error(`[audiova] ${code}`);
    return;
  }
  console.error(`[audiova] ${code}`, detail ?? "");
}
