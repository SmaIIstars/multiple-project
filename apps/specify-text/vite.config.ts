import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/specify-text",
  plugins: [react()],
  css: { modules: { localsConvention: "camelCase" } },
  build: { outDir: "specify-text" },
});
