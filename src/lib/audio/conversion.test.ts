import { describe, expect, it } from "vitest";
import { EMPTY_METADATA } from "@/lib/audio/metadata";
import {
  buildFfmpegArgs,
  classifyFfmpegFailure,
  hasValidSignature,
  outputFileName,
  sanitizeBaseName,
  uniqueOutputNames,
} from "@/lib/audio/conversion";
import type { ConversionSettings } from "@/types/audio";

const settings: ConversionSettings = {
  format: "mp3",
  bitrate: 192,
  sampleRate: "auto",
  keepMetadata: true,
  keepTitleArtist: true,
  outputBaseName: "",
};

describe("arguments FFmpeg", () => {
  it("encode un MP3 au débit choisi et ne passe jamais le nom utilisateur", () => {
    const args = buildFfmpegArgs({
      inputName: "input.wav",
      outputName: "output.mp3",
      settings: { ...settings, bitrate: 320, sampleRate: 22050 },
      metadata: { ...EMPTY_METADATA, title: "Titre\ninjecté", artist: "Artiste" },
    });

    expect(args).toContain("libmp3lame");
    expect(args).toContain("320k");
    expect(args).toContain("22050");
    expect(args).toContain("-map_metadata");
    expect(args).toContain("0");
    expect(args.join(" ")).not.toContain("injecté");
    expect(args.some((part) => part.includes("piste.wav"))).toBe(false);
    expect(args.at(-1)).toBe("output.mp3");
  });

  it("retire les métadonnées et ne garde le titre que si demandé", () => {
    const stripped = buildFfmpegArgs({
      inputName: "input.mp3",
      outputName: "output.mp3",
      settings: { ...settings, keepMetadata: false, keepTitleArtist: false },
      metadata: { ...EMPTY_METADATA, title: "Titre", artist: "Artiste" },
    });
    expect(stripped).toContain("-1");
    expect(stripped.some((part) => part.startsWith("title="))).toBe(false);

    const identity = buildFfmpegArgs({
      inputName: "input.mp3",
      outputName: "output.mp3",
      settings: { ...settings, keepMetadata: false, keepTitleArtist: true },
      metadata: { ...EMPTY_METADATA, title: "Soir", artist: "Nova" },
    });
    expect(identity).toContain("title=Soir");
    expect(identity).toContain("artist=Nova");
    expect(identity).toContain("-id3v2_version");
  });

  it("n'applique pas de débit au WAV ni au FLAC", () => {
    const wav = buildFfmpegArgs({
      inputName: "input.mp3",
      outputName: "output.wav",
      settings: { ...settings, format: "wav", bitrate: 64 },
      metadata: EMPTY_METADATA,
    });
    expect(wav).toContain("pcm_s16le");
    expect(wav.some((part) => part === "-b:a")).toBe(false);

    const flac = buildFfmpegArgs({
      inputName: "input.wav",
      outputName: "output.flac",
      settings: { ...settings, format: "flac" },
      metadata: EMPTY_METADATA,
    });
    expect(flac).toContain("flac");
    expect(flac.some((part) => part === "-b:a")).toBe(false);
  });

  it("prépare AAC, M4A et OGG avec leur codec réel", () => {
    const ogg = buildFfmpegArgs({
      inputName: "input.wav",
      outputName: "output.ogg",
      settings: { ...settings, format: "ogg", bitrate: 128 },
      metadata: EMPTY_METADATA,
    });
    expect(ogg).toContain("libvorbis");
    expect(ogg).toContain("128k");

    const m4a = buildFfmpegArgs({
      inputName: "input.wav",
      outputName: "output.m4a",
      settings: { ...settings, format: "m4a" },
      metadata: EMPTY_METADATA,
    });
    expect(m4a).toContain("+faststart");

    const aac = buildFfmpegArgs({
      inputName: "input.wav",
      outputName: "output.aac",
      settings: { ...settings, format: "aac" },
      metadata: EMPTY_METADATA,
    });
    expect(aac).toContain("adts");
  });

  it("nettoie le nom de téléchargement", () => {
    expect(sanitizeBaseName("../../concert?.wav")).toBe("concert");
    expect(outputFileName("ma piste.wav", "", "mp3")).toBe("ma piste.mp3");
    expect(outputFileName("ma piste.wav", "version finale.mp3", "mp3")).toBe("version finale.mp3");
    expect(uniqueOutputNames(["a.mp3", "a.mp3"])).toEqual(["a.mp3", "a (2).mp3"]);
  });

  it("reconnaît une signature et classe les erreurs", () => {
    expect(hasValidSignature("mp3", Uint8Array.from([0x49, 0x44, 0x33, 0, 0, 0, 0, 0, 0]))).toBe(true);
    expect(hasValidSignature("wav", new TextEncoder().encode("RIFF----WAVE"))).toBe(true);
    expect(hasValidSignature("mp3", new TextEncoder().encode("pas un mp3"))).toBe(false);
    expect(classifyFfmpegFailure("Output file #0 does not contain any stream")).toBe("no-audio");
    expect(classifyFfmpegFailure("Invalid data found when processing input")).toBe("damaged");
    expect(classifyFfmpegFailure("Cannot enlarge memory")).toBe("memory");
    expect(classifyFfmpegFailure("something else")).toBe("failed");
  });
});
