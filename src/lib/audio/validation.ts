import { INPUT_FORMATS, MAX_FILE_BYTES, inputFormatFor } from "@/lib/constants";
import type { ErrorCode } from "@/types/audio";

export function extensionOf(name: string): string {
  const base = name.split(/[/\\]/).pop() ?? "";
  const match = /\.([a-z0-9]{1,8})$/i.exec(base);
  return match ? match[1].toLowerCase() : "";
}

export function displayName(name: string): string {
  const base = (name.split(/[/\\]/).pop() ?? "audio")
    .replace(/[\u0000-\u001f\u007f]/g, "")
    .trim();
  return base.slice(0, 180) || "audio";
}

export function validateFile(file: File): Extract<ErrorCode, "empty" | "too-large" | "unsupported"> | null {
  if (file.size <= 0) {
    return "empty";
  }
  if (file.size > MAX_FILE_BYTES) {
    return "too-large";
  }
  const extension = extensionOf(file.name);
  if (!inputFormatFor(extension)) {
    return "unsupported";
  }
  return null;
}

export function isVideoExtension(extension: string): boolean {
  return INPUT_FORMATS.some((format) => format.video && format.extensions.includes(extension));
}

export function safeInputName(extension: string): string {
  const clean = extension.toLowerCase().replace(/[^a-z0-9]/g, "");
  if (!inputFormatFor(clean)) {
    return "input.bin";
  }
  return `input.${clean}`;
}
