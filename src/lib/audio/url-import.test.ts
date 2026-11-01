import { describe, expect, it } from "vitest";
import { classifyYtDlpFailure, parseImportUrl, sanitizeDownloadBaseName } from "@/lib/audio/url-import";

describe("import depuis une URL", () => {
  it("accepte une URL publique https", () => {
    const parsed = parseImportUrl(" https://www.youtube.com/watch?v=dQw4w9WgXcQ ");
    expect(parsed.ok).toBe(true);
    if (parsed.ok) {
      expect(parsed.url.hostname).toBe("www.youtube.com");
    }
  });

  it("refuse les adresses locales et les schémas dangereux", () => {
    expect(parseImportUrl("ftp://example.com/a.mp3").ok).toBe(false);
    expect(parseImportUrl("http://127.0.0.1/secret").ok).toBe(false);
    expect(parseImportUrl("http://localhost/x").ok).toBe(false);
    expect(parseImportUrl("http://192.168.1.10/a").ok).toBe(false);
    expect(parseImportUrl("http://user:pass@example.com/a").ok).toBe(false);
  });

  it("nettoie le nom de fichier et classe les erreurs yt-dlp", () => {
    expect(sanitizeDownloadBaseName("../../concert?.wav")).toBe("concert .wav");
    expect(sanitizeDownloadBaseName("Live Set")).toBe("Live Set");
    expect(sanitizeDownloadBaseName("")).toBe("audio");
    expect(classifyYtDlpFailure("ERROR: File is larger than max-filesize")).toBe("too-large");
    expect(classifyYtDlpFailure("ERROR: Unsupported URL")).toBe("url-unavailable");
    expect(classifyYtDlpFailure("ERROR: Private video")).toBe("url-unavailable");
  });
});
