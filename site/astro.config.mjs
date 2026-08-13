// @ts-check
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';

export default defineConfig({
  site: 'https://www.theconesleeves.com',
  trailingSlash: 'always',
  build: {
    format: 'directory',
    inlineStylesheets: 'never',
  },
  adapter: vercel(),
  output: 'static',
  vite: {
    build: {
      assetsInlineLimit: 0,
    },
  },
});
