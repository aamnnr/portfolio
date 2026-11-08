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

/** @id tetap untuk node Person di JSON-LD, dirujuk dari halaman mana pun. */
export const personId = (site: URL | undefined): string => `${absolute(localePath('en'), site)}#person`;

/**
 * Potong deskripsi meta di batas kata agar tidak terpotong Google (~160 karakter).
 * Kalimat utuh diutamakan; bila tidak muat, dipotong di spasi terakhir dan diberi elipsis.
 */
export function clampDescription(text: string, max = 158): string {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  const sentence = cut.lastIndexOf('. ');
  if (sentence > max * 0.6) return cut.slice(0, sentence + 1);
  return `${cut.slice(0, cut.lastIndexOf(' ')).replace(/[\s,;:—–-]+$/, '')}…`;
}
