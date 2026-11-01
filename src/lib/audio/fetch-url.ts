import { mkdtemp, readdir, readFile, rm, stat } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { create as createYoutubeDl } from "youtube-dl-exec";
import { MAX_FILE_BYTES, inputFormatFor } from "@/lib/constants";
import {
  URL_IMPORT_TIMEOUT_MS,
  assertWithinSize,
  classifyYtDlpFailure,
  sanitizeDownloadBaseName,
  type UrlImportErrorCode,
} from "@/lib/audio/url-import";
import { assertPublicHostname } from "@/lib/audio/ssrf";
import { extensionOf } from "@/lib/audio/validation";

const youtubedl = createYoutubeDl(
  join(process.cwd(), "node_modules", "youtube-dl-exec", "bin", process.platform === "win32" ? "yt-dlp.exe" : "yt-dlp"),
);

export interface FetchedMedia {
  bytes: Uint8Array;
  fileName: string;
  extension: string;
  mime: string;
  title: string | null;
}

export class UrlFetchError extends Error {
  readonly code: UrlImportErrorCode;

  constructor(code: UrlImportErrorCode, detail?: string) {
    super(detail ?? code);
    this.name = "UrlFetchError";
    this.code = code;
  }
}

function mimeFor(extension: string): string {
  switch (extension) {
    case "mp3":
      return "audio/mpeg";
    case "wav":
    case "wave":
      return "audio/wav";
    case "flac":
      return "audio/flac";
    case "ogg":
    case "oga":
    case "opus":
      return "audio/ogg";
    case "aac":
      return "audio/aac";
    case "m4a":
    case "m4b":
      return "audio/mp4";
    case "mp4":
    case "m4v":
      return "video/mp4";
    case "webm":
      return "video/webm";
    case "mkv":
      return "video/x-matroska";
    case "mov":
      return "video/quicktime";
    default:
      return "application/octet-stream";
  }
}

async function pickDownloadedFile(directory: string): Promise<string> {
  const entries = await readdir(directory);
  const files = [];
  for (const name of entries) {
    if (name.endsWith(".part") || name.endsWith(".ytdl") || name.endsWith(".json")) {
      continue;
    }
    const full = join(directory, name);
    const info = await stat(full);
    if (info.isFile() && info.size > 0) {
      files.push({ full, size: info.size, mtime: info.mtimeMs });
    }
  }
  files.sort((a, b) => b.mtime - a.mtime);
  const chosen = files[0];
  if (!chosen) {
    throw new UrlFetchError("url-fetch", "Aucun fichier téléchargé.");
  }
  return chosen.full;
}

export async function fetchMediaFromUrl(pageUrl: string): Promise<FetchedMedia> {
  let parsed: URL;
  try {
    parsed = new URL(pageUrl);
  } catch {
    throw new UrlFetchError("url-invalid");
  }

  try {
    await assertPublicHostname(parsed.hostname);
  } catch {
    throw new UrlFetchError("url-blocked", "Hôte non autorisé.");
  }

  const directory = await mkdtemp(join(tmpdir(), "audiova-url-"));
  try {
    const outputTemplate = join(directory, "%(title).80B.%(ext)s");
    try {
      await youtubedl(
        pageUrl,
        {
          output: outputTemplate,
          format: "bestaudio/best",
          noPlaylist: true,
          maxFilesize: `${MAX_FILE_BYTES}`,
          restrictFilenames: true,
          noWarnings: true,
          preferFreeFormats: true,
          // Certificats TLS vérifiés (ne pas désactiver).
        },
        {
          timeout: URL_IMPORT_TIMEOUT_MS,
          killSignal: "SIGKILL",
        },
      );
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      throw new UrlFetchError(classifyYtDlpFailure(message), message);
    }

    const filePath = await pickDownloadedFile(directory);
    const info = await stat(filePath);
    const sizeError = assertWithinSize(info.size);
    if (sizeError) {
      throw new UrlFetchError(sizeError);
    }

    const base = filePath.split(/[/\\]/).pop() ?? "audio.bin";
    const extension = extensionOf(base);
    if (!inputFormatFor(extension)) {
      throw new UrlFetchError("unsupported");
    }

    const bytes = new Uint8Array(await readFile(filePath));
    const title = sanitizeDownloadBaseName(base.replace(/\.[^.]+$/, ""));
    const fileName = `${title}.${extension}`;

    return {
      bytes,
      fileName,
      extension,
      mime: mimeFor(extension),
      title,
    };
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
}
