import { expect, test } from "@playwright/test";

function sineWav(seconds = 1, sampleRate = 44100): Buffer {
  const samples = seconds * sampleRate;
  const dataSize = samples * 2;
  const buffer = Buffer.alloc(44 + dataSize);
  buffer.write("RIFF", 0);
  buffer.writeUInt32LE(36 + dataSize, 4);
  buffer.write("WAVE", 8);
  buffer.write("fmt ", 12);
  buffer.writeUInt32LE(16, 16);
  buffer.writeUInt16LE(1, 20);
  buffer.writeUInt16LE(1, 22);
  buffer.writeUInt32LE(sampleRate, 24);
  buffer.writeUInt32LE(sampleRate * 2, 28);
  buffer.writeUInt16LE(2, 32);
  buffer.writeUInt16LE(16, 34);
  buffer.write("data", 36);
  buffer.writeUInt32LE(dataSize, 40);
  for (let index = 0; index < samples; index += 1) {
    const value = Math.round(Math.sin((2 * Math.PI * 440 * index) / sampleRate) * 12000);
    buffer.writeInt16LE(value, 44 + index * 2);
  }
  return buffer;
}

function mp3FrameInfo(data: Buffer): { bitrate: number; sampleRate: number } | null {
  let offset = 0;
  if (data.subarray(0, 3).toString("latin1") === "ID3") {
    const size =
      ((data[6] & 0x7f) << 21) |
      ((data[7] & 0x7f) << 14) |
      ((data[8] & 0x7f) << 7) |
      (data[9] & 0x7f);
    offset = 10 + size;
  }
  const mpeg1 = [0, 32, 40, 48, 56, 64, 80, 96, 112, 128, 160, 192, 224, 256, 320, 0];
  const mpeg2 = [0, 8, 16, 24, 32, 40, 48, 56, 64, 80, 96, 112, 128, 144, 160, 0];
  const rates: Record<number, number[]> = {
    3: [44100, 48000, 32000],
    2: [22050, 24000, 16000],
    0: [11025, 12000, 8000],
  };
  for (let index = offset; index < Math.min(data.length - 4, offset + 8192); index += 1) {
    if (data[index] !== 0xff || (data[index + 1] & 0xe0) !== 0xe0) {
      continue;
    }
    const version = (data[index + 1] >> 3) & 0x3;
    const layer = (data[index + 1] >> 1) & 0x3;
    const bitrateIndex = (data[index + 2] >> 4) & 0xf;
    const sampleIndex = (data[index + 2] >> 2) & 0x3;
    if (layer !== 1 || bitrateIndex === 0 || bitrateIndex === 15 || sampleIndex === 3) {
      continue;
    }
    const bitrate = (version === 3 ? mpeg1 : mpeg2)[bitrateIndex];
    const sampleRate = rates[version]?.[sampleIndex];
    if (bitrate && sampleRate) {
      return { bitrate, sampleRate };
    }
  }
  return null;
}

test("convertit un WAV en MP3 avec le débit et la fréquence choisis", async ({ page }) => {
  test.setTimeout(180_000);
  const pageErrors: string[] = [];
  page.on("pageerror", (error) => pageErrors.push(error.message));

  await page.goto("/");
  await page.locator('input[type="file"]').setInputFiles({
    name: "note.wav",
    mimeType: "audio/wav",
    buffer: sineWav(),
  });

  await expect(page.getByText("note.wav")).toBeVisible();
  await expect(page.getByText(/44\s*100 Hz/).first()).toBeVisible();
  await page.getByRole("button", { name: "128 kb/s" }).click();
  await page.getByRole("button", { name: /22\s*050 Hz/ }).click();
  await page.getByRole("button", { name: "Convertir en MP3" }).click();

  const downloadButton = page.getByRole("button", { name: "Télécharger le MP3" });
  await expect(downloadButton).toBeVisible({ timeout: 150_000 });
  await expect(page.locator("span").filter({ hasText: /^Terminé$/ })).toBeVisible();

  const [download] = await Promise.all([
    page.waitForEvent("download"),
    downloadButton.click(),
  ]);
  const stream = await download.createReadStream();
  const chunks: Buffer[] = [];
  for await (const chunk of stream) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  }
  const mp3 = Buffer.concat(chunks);
  expect(download.suggestedFilename()).toMatch(/\.mp3$/);
  const info = mp3FrameInfo(mp3);
  expect(info).not.toBeNull();
  expect(info?.bitrate).toBe(128);
  expect(info?.sampleRate).toBe(22050);
  expect(mp3.length).toBeGreaterThan(4000);
  expect(mp3.length).toBeLessThan(40000);

  await page.getByRole("button", { name: "Écouter le résultat" }).click();
  await page.getByRole("button", { name: "Lecture" }).click();
  await expect.poll(async () => page.locator("audio").evaluate((element: HTMLAudioElement) => element.paused)).toBe(false);
  await page.getByRole("button", { name: "Pause" }).click();

  await page.getByRole("button", { name: "Convertir un autre fichier" }).click();
  await expect(page.getByRole("button", { name: "Choisir un fichier" })).toBeVisible();

  await page.locator('input[type="file"]').setInputFiles({
    name: "casse.mp3",
    mimeType: "audio/mpeg",
    buffer: Buffer.from("ceci n'est pas un mp3 valide mais assez long"),
  });
  await page.getByRole("button", { name: "Convertir en MP3" }).click();
  await expect(page.getByRole("alert").filter({ hasText: "endommagé" })).toBeVisible();

  expect(pageErrors).toEqual([]);
});
