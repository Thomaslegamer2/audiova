import { describe, expect, it } from "vitest";
import { MAX_FILE_BYTES } from "@/lib/constants";
import { extensionOf, safeInputName, validateFile } from "@/lib/audio/validation";

function file(name: string, size: number, type = ""): File {
  const bytes = new Uint8Array(size);
  return new File([bytes], name, { type });
}

describe("validation des fichiers", () => {
  it("accepte un wav et refuse le reste des cas limites", () => {
    expect(validateFile(file("note.wav", 44))).toBeNull();
    expect(validateFile(file("note.WAV", 44))).toBeNull();
    expect(validateFile(file("clip.mp4", 1000))).toBeNull();
    expect(validateFile(file("vide.txt", 10))).toBe("unsupported");
    expect(validateFile(file("sans-extension", 10))).toBe("unsupported");
    expect(validateFile(file("vide.mp3", 0))).toBe("empty");
    expect(validateFile(file("gros.wav", MAX_FILE_BYTES + 1))).toBe("too-large");
  });

  it("ne garde que l'extension finale et fabrique un nom interne sûr", () => {
    expect(extensionOf("dossier/mon fichier.MP3")).toBe("mp3");
    expect(extensionOf("archive.tar.wav")).toBe("wav");
    expect(extensionOf("../secret.txt")).toBe("txt");
    expect(safeInputName("wav")).toBe("input.wav");
    expect(safeInputName("exe")).toBe("input.bin");
    expect(safeInputName("../mp3")).toBe("input.mp3");
  });
});
