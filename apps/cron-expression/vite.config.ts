import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
  base: "/cron-expression",
  plugins: [react()],
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      "~@": resolve("../../"),
      "@": resolve(__dirname, "src"),
    },
  },
  build: {
    outDir: "cron-expression",
  },
});
