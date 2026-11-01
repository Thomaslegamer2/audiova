import { localeTag } from "@/lib/locale-format";

export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}

export function fill(template: string, values: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => String(values[key] ?? ""));
}

export function formatBytes(bytes: number): string {
  if (!Number.isFinite(bytes) || bytes < 0) {
    return "—";
  }
  if (bytes < 1024) {
    return `${Math.round(bytes)} o`;
  }
  if (bytes < 1024 * 1024) {
    const value = bytes / 1024;
    return `${value.toLocaleString("fr-FR", { maximumFractionDigits: value < 10 ? 1 : 0 })} Ko`;
  }
  const value = bytes / (1024 * 1024);
  return `${value.toLocaleString("fr-FR", { maximumFractionDigits: value < 10 ? 1 : 1 })} Mo`;
}

export function formatDuration(seconds: number | null): string | null {
  if (seconds == null || !Number.isFinite(seconds) || seconds < 0) {
    return null;
  }
  const total = Math.round(seconds);
  const hours = Math.floor(total / 3600);
  const minutes = Math.floor((total % 3600) / 60);
  const secs = total % 60;
  if (hours > 0) {
    return `${hours}:${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  }
  return `${minutes}:${String(secs).padStart(2, "0")}`;
}

export function formatHertz(hz: number): string {
  return `${hz.toLocaleString("fr-FR")} Hz`;
}

export function formatBitrate(kbps: number): string {
  return `${kbps.toLocaleString("fr-FR")} kb/s`;
}

export function formatWhen(iso: string, locale = "fr"): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) {
    return iso;
  }
  return new Intl.DateTimeFormat(localeTag(locale), {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}
