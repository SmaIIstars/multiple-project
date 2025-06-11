import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { defineConfig } from "vite";
import { viteMockServe } from "vite-plugin-mock";
import svgr from "vite-plugin-svgr";

export default defineConfig({
  base: "/react-demo",
  plugins: [
    react(),
    svgr({
      svgrOptions: {
        icon: true,
        exportType: "default",
        ref: true,
        svgo: false,
        titleProp: true,
      },
    }),
    viteMockServe({
      mockPath: "./src/mock",
      logger: true,
      prodEnabled: true,
      injectCode: `import { createProdMockServer } from "./src/mockProdServer.js"; setupProdMockServer();`,
    }),
  ],
  resolve: {
    alias: {
      "~@": resolve("../../"),
      "@": resolve(__dirname, "src"),
      pages: resolve("@/pages"),
      components: resolve("@/components"),
      routes: resolve("@/routes"),
      service: resolve("@/service"),
      utils: resolve("@/utils"),
      store: resolve("@/store"),
    },
  },
  server: {
    proxy: {
      "/blogApi": {
        target: "http://blog.smallstars.top",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/blogApi/, ""),
      },
    },
  },
  css: {
    modules: {
      localsConvention: "camelCase",
      scopeBehaviour: "local",
    },
  },
  build: {
    outDir: "react-demo",
    sourcemap: true,
  },
});
