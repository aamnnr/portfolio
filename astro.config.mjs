// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// Dipakai untuk sitemap, canonical & og:url.
export const SITE = 'https://nur-amin.vercel.app';

// Situs disajikan di akar domain. Kalau suatu saat pindah ke hosting yang
// menaruhnya di dalam subfolder (mis. GitHub Pages di /portfolio/), nilai ini
// harus ikut berubah — kalau tidak, setiap CSS dan tautan menunjuk folder yang
// tidak ada dan halaman tampil tanpa gaya sama sekali.
export const BASE = '/';

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
