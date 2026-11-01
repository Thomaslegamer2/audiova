import { CONVERSION_TIMEOUT_MS } from "@/lib/constants";
import {
  ConversionError,
  classifyFfmpegFailure,
  hasValidSignature,
  logTechnical,
} from "@/lib/audio/conversion";
import type { EngineStage, OutputFormatId } from "@/types/audio";

const CORE_JS = "/ffmpeg/ffmpeg-core.js";
const CORE_WASM = "/ffmpeg/ffmpeg-core.wasm";

interface ConvertRequest {
  file: File;
  inputName: string;
  outputName: string;
  args: string[];
  format: OutputFormatId;
  onProgress: (progress: number | null) => void;
}

async function fetchBlobUrl(
  url: string,
  mime: string,
  onProgress: (received: number, total: number) => void,
): Promise<string> {
  const response = await fetch(url);
  if (!response.ok || !response.body) {
    throw new ConversionError("engine");
  }
  const total = Number(response.headers.get("content-length") || 0);
  const reader = response.body.getReader();
  const chunks: Uint8Array[] = [];
  let received = 0;

  while (true) {
    const { done, value } = await reader.read();
    if (done) {
      break;
    }
    chunks.push(value);
    received += value.byteLength;
    onProgress(received, total);
  }

  const data = new Uint8Array(received);
  let offset = 0;
  for (const chunk of chunks) {
    data.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return URL.createObjectURL(new Blob([data.buffer], { type: mime }));
}

function normalizeProgress(progress: number): number | null {
  if (!Number.isFinite(progress) || progress < 0) {
    return null;
  }
  if (progress > 1 && progress <= 100) {
    return progress / 100;
  }
  return Math.min(1, progress);
}

/**
 * Moteur local mono-thread. Le build multithread exigerait une isolation
 * cross-origin qui casse une partie des navigateurs mobiles, dont Safari.
 * L'instance FFmpeg tourne déjà dans un worker : l'interface reste réactive.
 */
export class FfmpegEngine {
  private ffmpeg: import("@ffmpeg/ffmpeg").FFmpeg | null = null;
  private coreUrl: string | null = null;
  private wasmUrl: string | null = null;
  private loading: Promise<void> | null = null;
  private logs: string[] = [];

  isLoaded(): boolean {
    return Boolean(this.ffmpeg?.loaded);
  }

  load(onStage: (stage: EngineStage) => void): Promise<void> {
    if (this.ffmpeg?.loaded) {
      return Promise.resolve();
    }
    if (!this.loading) {
      this.loading = this.loadInner(onStage).finally(() => {
        this.loading = null;
      });
    }
    return this.loading;
  }

  private async loadInner(onStage: (stage: EngineStage) => void): Promise<void> {
    onStage({ stage: "download", progress: 0 });
    try {
      if (!this.coreUrl || !this.wasmUrl) {
        this.coreUrl = await fetchBlobUrl(CORE_JS, "text/javascript", (received, total) => {
          onStage({
            stage: "download",
            progress: total > 0 ? (received / total) * 0.04 : null,
          });
        });
        this.wasmUrl = await fetchBlobUrl(CORE_WASM, "application/wasm", (received, total) => {
          onStage({
            stage: "download",
            progress: total > 0 ? 0.04 + (received / total) * 0.96 : null,
          });
        });
      }

      const { FFmpeg } = await import("@ffmpeg/ffmpeg");
      const ffmpeg = new FFmpeg();
      this.ffmpeg = ffmpeg;
      onStage({ stage: "compile" });
      await ffmpeg.load({
        coreURL: this.coreUrl,
        wasmURL: this.wasmUrl,
      });
    } catch (error) {
      const detail = error instanceof Error ? `${error.name}: ${error.message}` : String(error);
      logTechnical("engine", detail);
      this.ffmpeg = null;
      throw new ConversionError("engine");
    }
  }

  async convert(request: ConvertRequest): Promise<Uint8Array> {
    const ffmpeg = this.ffmpeg;
    if (!ffmpeg?.loaded) {
      throw new ConversionError("engine");
    }

    const { fetchFile } = await import("@ffmpeg/util");
    this.logs = [];
    const onLog = ({ message }: { message: string }) => {
      if (this.logs.length < 60) {
        this.logs.push(message);
      }
    };
    const onProgress = ({ progress }: { progress: number }) => {
      request.onProgress(normalizeProgress(progress));
    };

    ffmpeg.on("log", onLog);
    ffmpeg.on("progress", onProgress);
    const started = performance.now();

    try {
      request.onProgress(null);
      const bytes = await fetchFile(request.file);
      await ffmpeg.writeFile(request.inputName, bytes);
      const code = await ffmpeg.exec(request.args, CONVERSION_TIMEOUT_MS);
      if (code !== 0) {
        const detail = this.logs.join("\n");
        logTechnical("ffmpeg", detail);
        if (detail.includes("Aborted()")) {
          this.terminate();
        }
        if (performance.now() - started >= CONVERSION_TIMEOUT_MS - 1500) {
          throw new ConversionError("timeout");
        }
        throw new ConversionError(classifyFfmpegFailure(detail));
      }

      const raw = await ffmpeg.readFile(request.outputName);
      if (typeof raw === "string") {
        throw new ConversionError("failed");
      }
      const copy = new Uint8Array(raw.byteLength);
      copy.set(raw);
      if (!hasValidSignature(request.format, copy)) {
        throw new ConversionError("failed");
      }
      return copy;
    } catch (error) {
      if (error instanceof ConversionError) {
        throw error;
      }
      const message = error instanceof Error ? error.message : "";
      logTechnical("ffmpeg", message);
      if (/Aborted\(\)/.test(message) || this.logs.some((line) => line.includes("Aborted()"))) {
        this.terminate();
      }
      if (/memory|out of bounds|allocate|oom/i.test(message)) {
        throw new ConversionError("memory");
      }
      throw new ConversionError("failed");
    } finally {
      try {
        ffmpeg.off("log", onLog);
        ffmpeg.off("progress", onProgress);
        if (this.ffmpeg) {
          await ffmpeg.deleteFile(request.inputName);
          await ffmpeg.deleteFile(request.outputName);
        }
      } catch {
        // Le worker a déjà été arrêté.
      }
    }
  }

  terminate(): void {
    const current = this.ffmpeg;
    this.ffmpeg = null;
    current?.terminate();
  }

  dispose(): void {
    this.terminate();
    if (this.coreUrl) {
      URL.revokeObjectURL(this.coreUrl);
    }
    if (this.wasmUrl) {
      URL.revokeObjectURL(this.wasmUrl);
    }
    this.coreUrl = null;
    this.wasmUrl = null;
  }
}
