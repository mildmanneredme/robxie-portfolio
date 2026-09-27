import { defineConfig } from "@playwright/test";

// BASE_URL=https://robxie-portfolio.vercel.app npm run e2e  tests production instead of a local build.
const baseURL = process.env.BASE_URL ?? "http://localhost:3123";

export default defineConfig({
  testDir: "tests",
  use: { baseURL },
  webServer: process.env.BASE_URL
    ? undefined
    : { command: "npx next start -p 3123", port: 3123, reuseExistingServer: true },
  projects: [
    { name: "desktop", use: { viewport: { width: 1440, height: 900 } } },
    { name: "mobile", use: { viewport: { width: 390, height: 844 }, isMobile: true } },
  ],
});
