import { extensionOf } from "@/lib/audio/validation";
import type { AudioMetadata } from "@/types/audio";

export const EMPTY_METADATA: AudioMetadata = {
  duration: null,
  sampleRate: null,
  bitrate: null,
  channels: null,
  title: null,
  artist: null,
};

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

function cleanText(value: string): string | null {
  const cleaned = value.replace(/\0/g, "").replace(/\s+/g, " ").trim();
  return cleaned.length > 0 ? cleaned.slice(0, 200) : null;
}

function decodeLatin1(data: Uint8Array): string | null {
  let text = "";
  for (const byte of data) {
    if (byte === 0) {
      break;
    }
    text += String.fromCharCode(byte);
  }
  return cleanText(text);
}

function decodeId3Text(data: Uint8Array): string | null {
  if (data.length === 0) {
    return null;
  }
  const encoding = data[0];
  const bytes = data.subarray(1);
  try {
    if (encoding === 0) {
      return decodeLatin1(bytes);
    }
    if (encoding === 3) {
      return cleanText(new TextDecoder("utf-8").decode(bytes));
    }
    if (encoding === 1 || encoding === 2) {
      const hasBom = bytes.length >= 2 && bytes[0] === 0xff && bytes[1] === 0xfe;
      const view = encoding === 1 && hasBom ? bytes.subarray(2) : bytes;
      const label = encoding === 2 || !hasBom ? "utf-16be" : "utf-16le";
      return cleanText(new TextDecoder(label).decode(view));
    }
  } catch {
    return null;
  }
  return null;
}

function syncsafe(data: Uint8Array, offset: number): number {
  return (
    ((data[offset] & 0x7f) << 21) |
    ((data[offset + 1] & 0x7f) << 14) |
    ((data[offset + 2] & 0x7f) << 7) |
    (data[offset + 3] & 0x7f)
  );
}

function parseId3v2(data: Uint8Array): { title: string | null; artist: string | null; audioOffset: number } | null {
  if (ascii(data, 0, 3) !== "ID3" || data.length < 10) {
    return null;
  }
  const version = data[3] ?? 0;
  const flags = data[5] ?? 0;
  const size = syncsafe(data, 6);
  const audioOffset = 10 + size;
  if (flags & 0x80) {
    return { title: null, artist: null, audioOffset };
  }

  let offset = 10;
  const end = Math.min(data.length, audioOffset);
  let title: string | null = null;
  let artist: string | null = null;

  while (offset + 10 <= end && (title == null || artist == null)) {
    const id = ascii(data, offset, 4);
    if (!/^[A-Z0-9]{4}$/.test(id)) {
      break;
    }
    const frameSize =
      version === 4
        ? syncsafe(data, offset + 4)
        : new DataView(data.buffer, data.byteOffset + offset + 4, 4).getUint32(0);
    const start = offset + 10;
    if (frameSize <= 0 || start + frameSize > data.length) {
      break;
    }
    const frame = data.subarray(start, start + frameSize);
    if (id === "TIT2") {
      title = decodeId3Text(frame);
    }
    if (id === "TPE1") {
      artist = decodeId3Text(frame);
    }
    offset = start + frameSize;
  }

  return { title, artist, audioOffset };
}

function parseId3v1(data: Uint8Array): { title: string | null; artist: string | null } | null {
  if (data.length < 128) {
    return null;
  }
  const start = data.length - 128;
  if (ascii(data, start, 3) !== "TAG") {
    return null;
  }
  return {
    title: decodeLatin1(data.subarray(start + 3, start + 33)),
    artist: decodeLatin1(data.subarray(start + 33, start + 63)),
  };
}

function parseWav(data: Uint8Array): AudioMetadata | null {
  if (ascii(data, 0, 4) !== "RIFF" || ascii(data, 8, 4) !== "WAVE" || data.length < 44) {
    return null;
  }
  const view = new DataView(data.buffer, data.byteOffset, data.byteLength);
  let offset = 12;
  let sampleRate: number | null = null;
  let channels: number | null = null;
  let byteRate: number | null = null;
  let dataSize: number | null = null;

  while (offset + 8 <= data.length) {
    const id = ascii(data, offset, 4);
    const size = view.getUint32(offset + 4, true);
    const start = offset + 8;
    if (id === "fmt " && size >= 16 && start + 16 <= data.length) {
      channels = view.getUint16(start + 2, true);
      sampleRate = view.getUint32(start + 4, true);
      byteRate = view.getUint32(start + 8, true);
    } else if (id === "data") {
      dataSize = size;
      break;
    }
    const step = 8 + size + (size % 2);
    if (step <= 0) {
      break;
    }
    offset += step;
  }

  const duration = dataSize != null && byteRate ? dataSize / byteRate : null;
  const bitrate = byteRate ? Math.round((byteRate * 8) / 1000) : null;
  if (!sampleRate) {
    return null;
  }
  return { duration, sampleRate, bitrate, channels, title: null, artist: null };
}

function parseFlac(data: Uint8Array): AudioMetadata | null {
  if (ascii(data, 0, 4) !== "fLaC" || data.length < 42 || (data[4] & 0x7f) !== 0) {
    return null;
  }
  const info = 8;
  const sampleRate = ((data[info + 10] ?? 0) << 12) | ((data[info + 11] ?? 0) << 4) | ((data[info + 12] ?? 0) >> 4);
  const channels = (((data[info + 12] ?? 0) >> 1) & 0x7) + 1;
  const totalSamples =
    ((data[info + 13] & 0x0f) * 2 ** 32) +
    ((data[info + 14] ?? 0) * 2 ** 24) +
    ((data[info + 15] ?? 0) * 2 ** 16) +
    ((data[info + 16] ?? 0) * 2 ** 8) +
    (data[info + 17] ?? 0);
  if (!sampleRate) {
    return null;
  }
  return {
    duration: totalSamples > 0 ? totalSamples / sampleRate : null,
    sampleRate,
    bitrate: null,
    channels,
    title: null,
    artist: null,
  };
}

const MPEG1_L3 = [0, 32, 40, 48, 56, 64, 80, 96, 112, 128, 160, 192, 224, 256, 320, 0];
const MPEG2_L3 = [0, 8, 16, 24, 32, 40, 48, 56, 64, 80, 96, 112, 128, 144, 160, 0];
const MPEG1_RATES = [44100, 48000, 32000];
const MPEG2_RATES = [22050, 24000, 16000];
const MPEG25_RATES = [11025, 12000, 8000];

function parseMp3Frame(data: Uint8Array, offset: number): {
  bitrate: number;
  sampleRate: number;
  samples: number;
  frameSize: number;
  sideInfo: number;
} | null {
  if (offset + 4 > data.length || data[offset] !== 0xff || ((data[offset + 1] ?? 0) & 0xe0) !== 0xe0) {
    return null;
  }
  const versionBits = ((data[offset + 1] ?? 0) >> 3) & 0x3;
  const layerBits = ((data[offset + 1] ?? 0) >> 1) & 0x3;
  const bitrateIndex = ((data[offset + 2] ?? 0) >> 4) & 0xf;
  const sampleIndex = ((data[offset + 2] ?? 0) >> 2) & 0x3;
  const padding = ((data[offset + 2] ?? 0) >> 1) & 0x1;
  const channelMode = ((data[offset + 3] ?? 0) >> 6) & 0x3;
  if (versionBits === 1 || layerBits !== 1 || bitrateIndex === 0 || bitrateIndex === 15 || sampleIndex === 3) {
    return null;
  }

  const mpeg1 = versionBits === 3;
  const bitrate = (mpeg1 ? MPEG1_L3 : MPEG2_L3)[bitrateIndex] ?? 0;
  const sampleRate = (mpeg1 ? MPEG1_RATES : versionBits === 2 ? MPEG2_RATES : MPEG25_RATES)[sampleIndex] ?? 0;
  if (!bitrate || !sampleRate) {
    return null;
  }
  const samples = mpeg1 ? 1152 : 576;
  const frameSize = Math.floor(((mpeg1 ? 144 : 72) * bitrate * 1000) / sampleRate) + padding;
  const sideInfo = mpeg1 ? (channelMode === 3 ? 17 : 32) : channelMode === 3 ? 9 : 17;
  return { bitrate, sampleRate, samples, frameSize, sideInfo };
}

function parseMp3(head: Uint8Array, tail: Uint8Array, fileSize: number): AudioMetadata | null {
  const id3 = parseId3v2(head);
  const legacy = parseId3v1(tail);
  const audioOffset = id3?.audioOffset ?? 0;
  let frame: ReturnType<typeof parseMp3Frame> = null;
  const scanEnd = Math.min(head.length - 3, audioOffset + 8192);
  for (let offset = Math.min(audioOffset, head.length); offset < scanEnd; offset += 1) {
    frame = parseMp3Frame(head, offset);
    if (frame) {
      break;
    }
  }
  if (!frame && ascii(head, 0, 3) !== "ID3") {
    return null;
  }

  let duration: number | null = null;
  if (frame) {
    const markerAt = Math.min(head.length, audioOffset + frame.sideInfo + 4);
    for (let offset = audioOffset; offset + frame.sideInfo + 16 < head.length && offset < markerAt + 64; offset += 1) {
      const found = parseMp3Frame(head, offset);
      if (!found) {
        continue;
      }
      const tag = ascii(head, offset + 4 + found.sideInfo, 4);
      if ((tag === "Xing" || tag === "Info") && offset + 4 + found.sideInfo + 12 <= head.length) {
        const flags = new DataView(head.buffer, head.byteOffset + offset + 8 + found.sideInfo, 4).getUint32(0);
        if (flags & 1) {
          const frames = new DataView(head.buffer, head.byteOffset + offset + 12 + found.sideInfo, 4).getUint32(0);
          if (frames > 0) {
            duration = (frames * found.samples) / found.sampleRate;
          }
        }
      }
      break;
    }
    if (duration == null && fileSize > audioOffset) {
      const audioBytes = Math.max(0, fileSize - audioOffset - (legacy ? 128 : 0));
      duration = audioBytes > 0 ? (audioBytes * 8) / (frame.bitrate * 1000) : null;
    }
  }

  return {
    duration,
    sampleRate: frame?.sampleRate ?? null,
    bitrate: frame?.bitrate ?? null,
    channels: null,
    title: id3?.title ?? legacy?.title ?? null,
    artist: id3?.artist ?? legacy?.artist ?? null,
  };
}

function readExtended80(data: Uint8Array, offset: number): number {
  if (offset + 10 > data.length) {
    return 0;
  }
  const exponent = ((data[offset] & 0x7f) << 8) | (data[offset + 1] ?? 0);
  if (exponent === 0) {
    return 0;
  }
  const high = new DataView(data.buffer, data.byteOffset + offset + 2, 4).getUint32(0);
  return high * 2 ** (exponent - 16383 - 31);
}

function parseAiff(data: Uint8Array): AudioMetadata | null {
  if (ascii(data, 0, 4) !== "FORM" || data.length < 24) {
    return null;
  }
  const form = ascii(data, 8, 4);
  if (form !== "AIFF" && form !== "AIFC") {
    return null;
  }
  const view = new DataView(data.buffer, data.byteOffset, data.byteLength);
  let offset = 12;
  let channels: number | null = null;
  let sampleRate: number | null = null;
  let duration: number | null = null;
  let title: string | null = null;
  let artist: string | null = null;

  while (offset + 8 <= data.length) {
    const id = ascii(data, offset, 4);
    const size = view.getUint32(offset + 4, false);
    const start = offset + 8;
    if (size < 0 || start > data.length) {
      break;
    }
    const end = Math.min(data.length, start + size);
    if (id === "COMM" && size >= 18) {
      channels = view.getUint16(start, false);
      const frames = view.getUint32(start + 2, false);
      const rate = readExtended80(data, start + 8);
      sampleRate = Math.round(rate);
      duration = sampleRate > 0 ? frames / sampleRate : null;
    } else if (id === "NAME") {
      title = decodeLatin1(data.subarray(start, end));
    } else if (id === "AUTH") {
      artist = decodeLatin1(data.subarray(start, end));
    }
    const step = 8 + size + (size % 2);
    if (step <= 0) {
      break;
    }
    offset += step;
  }

  if (!sampleRate) {
    return null;
  }
  const bitrate = channels ? Math.round((sampleRate * channels * 16) / 1000) : null;
  return { duration, sampleRate, bitrate, channels, title, artist };
}

function findTextAtom(data: Uint8Array, marker: number[]): string | null {
  outer: for (let index = 0; index < data.length - 24; index += 1) {
    for (let cursor = 0; cursor < marker.length; cursor += 1) {
      if (data[index + cursor] !== marker[cursor]) {
        continue outer;
      }
    }
    const windowEnd = Math.min(data.length - 8, index + 48);
    for (let cursor = index + marker.length; cursor < windowEnd; cursor += 1) {
      if (ascii(data, cursor, 4) !== "data" || cursor < 4) {
        continue;
      }
      const size = new DataView(data.buffer, data.byteOffset + cursor - 4, 4).getUint32(0);
      const textStart = cursor + 16;
      const textLength = size - 16;
      if (textLength <= 0 || textLength > 400 || textStart + textLength > data.length) {
        return null;
      }
      return cleanText(new TextDecoder("utf-8").decode(data.subarray(textStart, textStart + textLength)));
    }
  }
  return null;
}

function parseMvhd(data: Uint8Array): number | null {
  const tag = [0x6d, 0x76, 0x68, 0x64];
  for (let index = 0; index < data.length - 24; index += 1) {
    if (tag.some((byte, offset) => data[index + offset] !== byte)) {
      continue;
    }
    const version = data[index + 4] ?? 0;
    const view = new DataView(data.buffer, data.byteOffset + index, Math.min(40, data.length - index));
    if (version === 0 && view.byteLength >= 24) {
      const timescale = view.getUint32(16);
      const duration = view.getUint32(20);
      return timescale > 0 ? duration / timescale : null;
    }
    if (version === 1 && view.byteLength >= 36) {
      const timescale = view.getUint32(24);
      const high = view.getUint32(28);
      const low = view.getUint32(32);
      const duration = high * 2 ** 32 + low;
      return timescale > 0 ? duration / timescale : null;
    }
  }
  return null;
}

function parseMp4(head: Uint8Array, tail: Uint8Array): AudioMetadata | null {
  const isContainer = ascii(head, 4, 4) === "ftyp" || ascii(tail, 4, 4) === "ftyp";
  const duration = parseMvhd(head) ?? parseMvhd(tail);
  const title = findTextAtom(head, [0xa9, 0x6e, 0x61, 0x6d]) ?? findTextAtom(tail, [0xa9, 0x6e, 0x61, 0x6d]);
  const artist = findTextAtom(head, [0xa9, 0x41, 0x52, 0x54]) ?? findTextAtom(tail, [0xa9, 0x41, 0x52, 0x54]);
  if (!isContainer && duration == null && !title && !artist) {
    return null;
  }
  return {
    duration,
    sampleRate: null,
    bitrate: null,
    channels: null,
    title,
    artist,
  };
}

function parseOgg(data: Uint8Array): AudioMetadata | null {
  if (ascii(data, 0, 4) !== "OggS") {
    return null;
  }
  let sampleRate: number | null = null;
  let channels: number | null = null;
  for (let index = 0; index < data.length - 16; index += 1) {
    if (ascii(data, index, 6) === "vorbis" && index >= 1 && data[index - 1] === 1) {
      channels = data[index + 10] ?? null;
      sampleRate = new DataView(data.buffer, data.byteOffset + index + 11, 4).getUint32(0, true);
      break;
    }
    if (ascii(data, index, 8) === "OpusHead" && index + 16 <= data.length) {
      channels = data[index + 9] ?? null;
      sampleRate = new DataView(data.buffer, data.byteOffset + index + 12, 4).getUint32(0, true);
      break;
    }
  }
  if (!sampleRate) {
    return { ...EMPTY_METADATA };
  }
  return { duration: null, sampleRate, bitrate: null, channels, title: null, artist: null };
}

export async function readMetadata(file: File): Promise<AudioMetadata> {
  try {
    const head = new Uint8Array(await file.slice(0, 256 * 1024).arrayBuffer());
    const tailStart = Math.max(0, file.size - 512 * 1024);
    const tail = new Uint8Array(await file.slice(tailStart).arrayBuffer());
    const extension = extensionOf(file.name);

    const wav = parseWav(head);
    if (wav || extension === "wav" || extension === "wave") {
      return wav ?? { ...EMPTY_METADATA };
    }
    const flac = parseFlac(head);
    if (flac || extension === "flac") {
      return flac ?? { ...EMPTY_METADATA };
    }
    const aiff = parseAiff(head);
    if (aiff || extension === "aiff" || extension === "aif") {
      return aiff ?? { ...EMPTY_METADATA };
    }
    if (ascii(head, 0, 4) === "OggS" || extension === "ogg" || extension === "oga" || extension === "opus") {
      return { ...EMPTY_METADATA, ...parseOgg(head) };
    }
    if (
      ascii(head, 4, 4) === "ftyp" ||
      ["m4a", "m4b", "mp4", "m4v", "mov", "alac"].includes(extension)
    ) {
      return parseMp4(head, tail) ?? { ...EMPTY_METADATA };
    }
    const mp3 = parseMp3(head, tail, file.size);
    if (mp3 || extension === "mp3") {
      return mp3 ?? { ...EMPTY_METADATA };
    }
    return { ...EMPTY_METADATA };
  } catch {
    return { ...EMPTY_METADATA };
  }
}

export const metadataParsers = {
  parseWav,
  parseFlac,
  parseMp3,
  parseAiff,
};
