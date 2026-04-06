// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import clerk from '@clerk/astro';

let adapter;
if (process.env.VERCEL) {
  const { default: vercel } = await import('@astrojs/vercel');
  adapter = vercel();
} else {
  const { default: node } = await import('@astrojs/node');
  adapter = node({ mode: 'standalone' });
}

export default defineConfig({
  site: process.env.INTERSITE_SITE_URL || 'https://example.com',
  output: 'static',
  adapter,
  vite: { plugins: [tailwindcss()] },
  integrations: [mdx(), sitemap(), clerk()],
});
