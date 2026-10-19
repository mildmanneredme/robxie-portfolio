import { expect, test } from "@playwright/test";

for (const route of ["/", "/projects/lumen"]) {
  test(`${route} links to the private Lumen reading room`, async ({ page }) => {
    await page.goto(route);
    const link = page.getByRole("link", { name: "Visit reading room (access code required)" });
    await expect(link).toHaveAttribute("href", "https://lumen-phi-five.vercel.app/");
    await expect(link).toHaveAttribute("target", "_blank");
    await link.scrollIntoViewIfNeeded();
    await expect(link).toBeVisible();
    expect(await link.evaluate((a) => a.parentElement?.closest("a") === null)).toBe(true);
    expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(0);
  });
}

for (const route of ["/", "/projects/nimblip"]) {
  test(`${route} plays uncropped gameplay and pauses off screen`, async ({ page }) => {
    await page.goto(route);
    const video = page.locator('video[src="/projects/nimblip/gameplay.mp4"]');
    await video.scrollIntoViewIfNeeded();
    await expect(video).toHaveCSS("object-fit", "contain");
    await expect(video).toHaveAttribute("poster", "/projects/nimblip/gameplay-poster.webp");
    await expect.poll(() => video.evaluate((v: HTMLVideoElement) => v.currentTime), { timeout: 15_000 }).toBeGreaterThan(0);
    expect(await video.evaluate((v: HTMLVideoElement) => ({ width: v.videoWidth, height: v.videoHeight, muted: v.muted, inline: v.playsInline }))).toEqual({ width: 1280, height: 720, muted: true, inline: true });
    await page.locator("footer").scrollIntoViewIfNeeded();
    await expect.poll(() => video.evaluate((v: HTMLVideoElement) => v.paused)).toBe(true);
  });
}

test("reduced motion keeps the gameplay poster still", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/projects/nimblip");
  const video = page.locator('video[src="/projects/nimblip/gameplay.mp4"]');
  await video.scrollIntoViewIfNeeded();
  await expect(video).toBeVisible();
  await expect(video).toHaveAttribute("poster", "/projects/nimblip/gameplay-poster.webp");
  await page.waitForTimeout(1000);
  expect(await video.evaluate((v: HTMLVideoElement) => ({ paused: v.paused, currentTime: v.currentTime }))).toEqual({ paused: true, currentTime: 0 });
});
