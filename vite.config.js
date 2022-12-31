// vite.config.js
import { resolve, dirname } from 'pathe';
import { defineConfig } from 'vite';
import inject from '@rollup/plugin-inject';
import { createHtmlPlugin } from 'vite-plugin-html';

const outDir = resolve(dirname, 'dist');

console.log('outDir', outDir);

export default defineConfig({
  resolve: {
    alias: {
      '~bootstrap': resolve(dirname, 'node_modules/bootstrap'),
    },
  },
  build: {
    outDir,
  },
  plugins: [
    inject({
      $: 'jquery',
      jQuery: 'jquery',
    }),
    createHtmlPlugin({
      minify: true,
      pages: [
        {
          entry: resolve(dirname, './main.js'),
          filename: 'index.html',
          template: resolve(dirname, 'public/index.html'),
          injectOptions: {
            data: {
              title: 'index',
              injectScript: `<script src="./inject.js"></script>`,
            },
            tags: [
              {
                injectTo: 'body-prepend',
                tag: 'div',
                attrs: {
                  id: 'tag1',
                },
              },
            ],
          },
        },
        {
          entry: resolve(dirname, 'nested/nested.js'),
          filename: 'index.html',
          template: resolve(dirname, 'public/index.html'),
          injectOptions: {
            data: {
              title: 'other page',
              injectScript: `<script src="./inject.js"></script>`,
            },
            tags: [
              {
                injectTo: 'body-prepend',
                tag: 'div',
                attrs: {
                  id: 'tag2',
                },
              },
            ],
          },
        },
      ],
    }),
  ],
});
