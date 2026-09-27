import { expect, test } from "@playwright/test";
import { projects } from "../content/index.ts";

const routes = ["/", ...projects.map((p) => `/projects/${p.slug}`)];

for (const route of routes) {
  test(`${route} renders cleanly`, async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (e) => errors.push(e.message));
    page.on("console", (m) => m.type() === "error" && errors.push(m.text()));

    await page.goto(route, { waitUntil: "networkidle" });
    await expect(page.locator("h1")).toBeVisible();

    // Load every lazy image, then check none are broken.
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 500) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 50));
      }
    });
    await expect
      .poll(() => page.$$eval("img", (imgs) => imgs.filter((i) => !i.complete).length), { timeout: 15_000 })
      .toBe(0);
    const broken = await page.$$eval("img", (imgs) => imgs.filter((i) => i.naturalWidth === 0).map((i) => i.src));
    expect(broken).toEqual([]);

    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow).toBeLessThanOrEqual(0);
    expect(errors).toEqual([]);
  });
}

test("unknown project is a 404", async ({ page }) => {
  const res = await page.goto("/projects/nope");
  expect(res?.status()).toBe(404);
});
