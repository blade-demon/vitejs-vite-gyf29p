// vite.config.js
import { defineConfig } from "vite";
import { resolve, dirname } from "pathe";
import inject from "@rollup/plugin-inject";
import { createHtmlPlugin } from "vite-plugin-html";
import Inspect from "vite-plugin-inspect";

const outDir = resolve(dirname(), "dist");
const bootstrapDir = resolve(dirname(), "node_modules", "bootstrap");

const pages = [
  {
    entry: "src/js/main/main.js",
    filename: "main.html",
    template: "main.html",
    injectOptions: {
      data: {
        title: "index",
        injectScript: `<script src="./src/js/main.js"></script>`,
      },
    },
  },
  {
    entry: "src/js/nested/nested.js",
    filename: "nested.html",
    template: "nested.html",
    injectOptions: {
      data: {
        title: "nested",
        injectScript: `<script src="./src/js/nested.js"></script>`,
      },
    },
  },
];

export default defineConfig({
  resolve: {
    alias: {
      "~bootstrap": bootstrapDir,
    },
  },
  build: {
    outDir,
    rollupOptions: {
      external: "",
    },
  },
  plugins: [
    Inspect(),
    inject({
      $: "jquery",
      jQuery: "jquery",
    }),
    createHtmlPlugin({
      minify: true,
      pages,
    }),
  ],
});
