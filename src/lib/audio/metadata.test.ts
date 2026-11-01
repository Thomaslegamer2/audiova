import { describe, expect, it } from "vitest";
import { metadataParsers, readMetadata } from "@/lib/audio/metadata";

function wavBytes(samples: number, sampleRate: number): Uint8Array {
  const dataSize = samples * 2;
  const buffer = new ArrayBuffer(44 + Math.min(dataSize, 8));
  const view = new DataView(buffer);
  const write = (offset: number, text: string) => {
    for (let index = 0; index < text.length; index += 1) {
      view.setUint8(offset + index, text.charCodeAt(index));
    }
  };
  write(0, "RIFF");
  view.setUint32(4, 36 + dataSize, true);
  write(8, "WAVE");
  write(12, "fmt ");
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, 1, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * 2, true);
  view.setUint16(32, 2, true);
  view.setUint16(34, 16, true);
  write(36, "data");
  view.setUint32(40, dataSize, true);
  return new Uint8Array(buffer);
}

function flacBytes(): Uint8Array {
  const bytes = new Uint8Array(42);
  bytes.set([0x66, 0x4c, 0x61, 0x43, 0x80, 0x00, 0x00, 0x22], 0);
  bytes[18] = 0x0a;
  bytes[19] = 0xc4;
  bytes[20] = 0x42;
  bytes[21] = 0xf0;
  bytes[24] = 0xac;
  bytes[25] = 0x44;
  return bytes;
}

describe("métadonnées audio", () => {
  it("lit la durée et la fréquence d'un WAV", async () => {
    const bytes = wavBytes(44100, 44100);
    const parsed = metadataParsers.parseWav(bytes);
    expect(parsed?.sampleRate).toBe(44100);
    expect(parsed?.channels).toBe(1);
    expect(parsed?.duration).toBeCloseTo(1, 2);

    const file = new File([bytes], "note.wav", { type: "audio/wav" });
    const metadata = await readMetadata(file);
    expect(metadata.sampleRate).toBe(44100);
    expect(metadata.duration).toBeCloseTo(1, 2);
  });

  it("lit l'en-tête FLAC", () => {
    const parsed = metadataParsers.parseFlac(flacBytes());
    expect(parsed?.sampleRate).toBe(44100);
    expect(parsed?.channels).toBe(2);
    expect(parsed?.duration).toBeCloseTo(1, 2);
  });

  it("lit le titre et l'artiste ID3", () => {
    const title = id3Frame("TIT2", "Soir");
    const artist = id3Frame("TPE1", "Nova");
    const frames = concat(title, artist);
    const header = new Uint8Array(10);
    header.set([0x49, 0x44, 0x33, 3, 0, 0]);
    writeSyncsafe(header, 6, frames.length);
    const tag = concat(header, frames, Uint8Array.from([0xff, 0xfb, 0x90, 0x00]));
    const parsed = metadataParsers.parseMp3(tag, tag, tag.length);
    expect(parsed?.title).toBe("Soir");
    expect(parsed?.artist).toBe("Nova");
    expect(parsed?.sampleRate).toBe(44100);
    expect(parsed?.bitrate).toBe(128);
  });
});

function id3Frame(id: string, text: string): Uint8Array {
  const body = new Uint8Array(1 + text.length);
  for (let index = 0; index < text.length; index += 1) {
    body[index + 1] = text.charCodeAt(index);
  }
  const frame = new Uint8Array(10 + body.length);
  for (let index = 0; index < 4; index += 1) {
    frame[index] = id.charCodeAt(index);
  }
  new DataView(frame.buffer).setUint32(4, body.length);
  frame.set(body, 10);
  return frame;
}

function writeSyncsafe(target: Uint8Array, offset: number, size: number) {
  target[offset] = (size >> 21) & 0x7f;
  target[offset + 1] = (size >> 14) & 0x7f;
  target[offset + 2] = (size >> 7) & 0x7f;
  target[offset + 3] = size & 0x7f;
}

function concat(...parts: Uint8Array[]): Uint8Array {
  const total = parts.reduce((sum, part) => sum + part.length, 0);
  const output = new Uint8Array(total);
  let offset = 0;
  for (const part of parts) {
    output.set(part, offset);
    offset += part.length;
  }
  return output;
}
