import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
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
    outDir: "sitemap",
  },
  css: {
    modules: {
      localsConvention: "camelCase",
    },
  },
});
