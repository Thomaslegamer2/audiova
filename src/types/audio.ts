export const OUTPUT_FORMAT_IDS = ["mp3", "wav", "flac", "aac", "ogg", "m4a"] as const;

export type OutputFormatId = (typeof OUTPUT_FORMAT_IDS)[number];

export const BITRATES = [64, 96, 128, 192, 256, 320] as const;

export type Bitrate = (typeof BITRATES)[number];

export const SAMPLE_RATES = ["auto", 22050, 44100, 48000] as const;

export type SampleRateOption = (typeof SAMPLE_RATES)[number];

export interface AudioMetadata {
  duration: number | null;
  sampleRate: number | null;
  bitrate: number | null;
  channels: number | null;
  title: string | null;
  artist: string | null;
}

export interface ConversionSettings {
  format: OutputFormatId;
  bitrate: Bitrate;
  sampleRate: SampleRateOption;
  keepMetadata: boolean;
  keepTitleArtist: boolean;
  outputBaseName: string;
}

export type JobStatus =
  | "analyzing"
  | "ready"
  | "queued"
  | "converting"
  | "finalizing"
  | "done"
  | "error"
  | "cancelled";

export type ErrorCode =
  | "unsupported"
  | "damaged"
  | "memory"
  | "failed"
  | "too-large"
  | "empty"
  | "no-audio"
  | "engine"
  | "too-many"
  | "timeout"
  | "url-invalid"
  | "url-blocked"
  | "url-fetch"
  | "url-unavailable"
  | "url-busy"
  | "url-rate";

export interface ConversionOutput {
  blob: Blob;
  name: string;
  size: number;
  format: OutputFormatId;
  bitrate: number | null;
  duration: number | null;
}

export interface ConversionJob {
  id: string;
  file: File;
  extension: string;
  metadata: AudioMetadata;
  status: JobStatus;
  progress: number | null;
  errorCode: ErrorCode | null;
  output: ConversionOutput | null;
}

export type EngineStage =
  | { stage: "download"; progress: number | null }
  | { stage: "compile" };

export interface HistoryEntry {
  id: string;
  fileName: string;
  convertedAt: string;
  format: OutputFormatId;
  bitrate: number | null;
  sampleRate: SampleRateOption;
}
