import { readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const workerPath = join(
  dirname(fileURLToPath(import.meta.url)),
  "..",
  "node_modules",
  "@ffmpeg",
  "ffmpeg",
  "dist",
  "esm",
  "worker.js",
);

const replacement =
  'self.createFFmpegCore = (await new Function("url", "return import(url)")(_coreURL)).default;';

const source = await readFile(workerPath, "utf8");

if (source.includes(replacement)) {
  console.log("Audiova: worker FFmpeg déjà compatible avec Webpack.");
} else {
  const updated = source.replace(
    /self\.createFFmpegCore = \(await import\([\s\S]*?_coreURL\)\)\.default;/,
    replacement,
  );
  if (updated === source) {
    throw new Error("Le worker FFmpeg a changé : import dynamique introuvable.");
  }
  await writeFile(workerPath, updated);
  console.log("Audiova: import du cœur FFmpeg laissé au navigateur.");
}
