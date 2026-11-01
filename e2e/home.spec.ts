import { expect, test } from "@playwright/test";

test("la page d'accueil présente le convertisseur", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));

  await page.goto("/");
  await expect(page).toHaveTitle(/Convertisseur MP3/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Votre audio.");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("MP3");
  await expect(page.getByRole("button", { name: "Choisir un fichier" })).toBeVisible();
  await expect(page.getByText("MP3, WAV, FLAC")).toBeVisible();

  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "Aller au contenu" })).toBeFocused();

  const faq = page.getByRole("button", { name: "Le convertisseur est-il gratuit ?" });
  await faq.click();
  await expect(faq).toHaveAttribute("aria-expanded", "true");
  await expect(page.getByText("100 Mo", { exact: false }).first()).toBeVisible();

  await page.getByRole("link", { name: "Confidentialité" }).click();
  await expect(page.getByRole("heading", { level: 1, name: "Confidentialité" })).toBeVisible();
  await page.goto("/legal");
  await expect(page.getByRole("heading", { level: 1, name: "Mentions légales" })).toBeVisible();
  await page.goto("/contact");
  await expect(page.getByText("Aucune adresse de contact n'est configurée.")).toBeVisible();

  for (const width of [360, 390, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow, `débordement à ${width}px`).toBeLessThanOrEqual(1);
  }

  expect(errors).toEqual([]);
});

test("un format non pris en charge est refusé sans conversion", async ({ page }) => {
  await page.goto("/");
  await page.locator('input[type="file"]').setInputFiles({
    name: "notes.txt",
    mimeType: "text/plain",
    buffer: Buffer.from("bonjour"),
  });
  await expect(page.getByText("Ce format n'est pas pris en charge.")).toBeVisible();
  await expect(page.getByRole("button", { name: "Convertir en MP3" })).toBeDisabled();
});
