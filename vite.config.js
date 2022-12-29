// vite.config.js
import { resolve } from 'path';
import { defineConfig } from 'vite';
import inject from '@rollup/plugin-inject';

const outDir = resolve(__dirname, 'dist');

export default defineConfig({
  build: {
    outDir,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        nested: resolve(__dirname, 'nested/index.html'),
      },
    },
  },
  plugins: [
    inject({
      $: 'jquery',
      jQuery: 'jquery',
    }),
  ],
});
