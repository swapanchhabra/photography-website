// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://pose-and-say-cheese.de',
  output: 'static',
  redirects: {
    '/about': '/ueber-mich',
    '/about/': '/ueber-mich',
    '/pricing': '/preise',
    '/pricing/': '/preise',
    '/new-born': '/',
    '/new-born/': '/',
    '/fashion': '/',
    '/fashion/': '/',
    '/family': '/',
    '/family/': '/',
  },
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'de',
        locales: { de: 'de-DE' },
      },
    }),
  ],
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp',
    },
  },
});
