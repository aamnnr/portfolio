// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// Ganti ke domain final sebelum deploy (dipakai untuk sitemap, canonical & og:url).
export const SITE = 'https://aamnnr.github.io';
export const BASE = '/portfolio';

export default defineConfig({
  site: SITE,
  base: BASE,
  trailingSlash: 'always',
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'id'],
    routing: { prefixDefaultLocale: false },
  },
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'en',
        locales: { en: 'en-US', id: 'id-ID' },
      },
      // Segmen rute proyek diterjemahkan (`projects/` vs `id/proyek/`), sehingga
      // pemetaan bawaan tidak mengenalinya sebagai pasangan. Dipasangkan manual.
      serialize(item) {
        const match = item.url.match(/\/(?:projects|id\/proyek)\/([^/]+)\/$/);
        if (match) {
          const root = item.url.slice(0, item.url.indexOf(match[0]));
          item.links = [
            { lang: 'en-US', url: `${root}/projects/${match[1]}/` },
            { lang: 'id-ID', url: `${root}/id/proyek/${match[1]}/` },
          ];
        }
        return item;
      },
    }),
  ],
  vite: { plugins: [tailwindcss()] },
});
