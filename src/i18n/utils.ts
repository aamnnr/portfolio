import type { Lang } from '../data/site';

/** Ambil nilai bilingual. */
export const t = <V,>(entry: Record<Lang, V>, lang: Lang): V => entry[lang];

/** Path root untuk sebuah bahasa, sudah menghormati `base` di astro.config. */
export function localePath(lang: Lang): string {
  const base = import.meta.env.BASE_URL; // selalu diakhiri '/'
  return lang === 'en' ? base : `${base}id/`;
}

/** URL absolut — dipakai untuk canonical, og:url, dan hreflang. */
export function absolute(path: string, site: URL | undefined): string {
  return new URL(path, site ?? 'http://localhost').toString();
}

export const otherLang = (lang: Lang): Lang => (lang === 'en' ? 'id' : 'en');

/** Path halaman detail proyek. Segmen rutenya ikut diterjemahkan. */
export function projectPath(slug: string, lang: Lang): string {
  return lang === 'en' ? `${localePath('en')}projects/${slug}/` : `${localePath('id')}proyek/${slug}/`;
}
