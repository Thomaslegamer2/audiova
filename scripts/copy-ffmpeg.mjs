import { copyFile, mkdir, stat } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const source = join(root, "node_modules", "@ffmpeg", "core", "dist", "esm");
const destination = join(root, "public", "ffmpeg");

await mkdir(destination, { recursive: true });

const files = ["ffmpeg-core.js", "ffmpeg-core.wasm"];

for (const file of files) {
  await copyFile(join(source, file), join(destination, file));
}

const wasm = await stat(join(destination, "ffmpeg-core.wasm"));
const megabytes = (wasm.size / (1024 * 1024)).toFixed(1);
console.log(`Audiova: moteur audio local prêt (${megabytes} Mo).`);
