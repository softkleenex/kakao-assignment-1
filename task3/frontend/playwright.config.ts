import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  timeout: 30_000,
  fullyParallel: false,
  use: {
    baseURL: "http://127.0.0.1:3000",
    channel: process.env.PLAYWRIGHT_USE_SYSTEM_CHROME === "1" ? "chrome" : undefined,
    trace: "on-first-retry",
  },
  webServer: [
    {
      command:
        "cd ../backend && .venv/bin/uvicorn main:app --host 127.0.0.1 --port 18080",
      url: "http://127.0.0.1:18080",
      reuseExistingServer: false,
      timeout: 30_000,
    },
    {
      command:
        "BACKEND_URL=http://127.0.0.1:18080 npm run dev -- --hostname 127.0.0.1 --port 3000",
      url: "http://127.0.0.1:3000/todos",
      reuseExistingServer: true,
      timeout: 60_000,
    },
  ],
});
