/// <reference types="vitest" />

import { resolve } from "path";
import { defineConfig } from "vitest/config";

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    environment: "happy-dom",
    exclude: [
      "**/node_modules/**",
      "e2e/**",
      "src/utils/api/test/integration/**",
    ],
    globals: true,
  },
  resolve: {
    alias: {
      "~": resolve(__dirname, "./src"),
    },
  },
});
