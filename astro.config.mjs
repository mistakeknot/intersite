// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import node from '@astrojs/node';

export default defineConfig({
  site: 'https://generalsystemsventures.com',
  output: 'static',
  adapter: node({ mode: 'standalone' }),
  vite: { plugins: [tailwindcss()] },
  integrations: [mdx(), sitemap()],
});
