import type { Lang } from './site';
import { site } from './site';
import { mediaSrc, type Project } from './projects';
import { ogImage } from './media';
import { absolute, localePath, personId, projectPath } from '../i18n/utils';

/** Props SEO untuk halaman detail proyek — dipakai bersama oleh rute EN dan ID. */
export async function projectSeo(project: Project, lang: Lang, siteUrl: URL | undefined) {
  const url = absolute(projectPath(project.slug, lang), siteUrl);
  const cover = project.media?.[0];
  const image = cover ? { ...(await ogImage(mediaSrc(cover.src, lang))), alt: cover.alt[lang] } : undefined;

  const work = {
    '@type': 'CreativeWork',
    '@id': `${url}#work`,
    name: project.title[lang],
    alternateName: project.codename,
    description: project.summary[lang],
    inLanguage: lang,
    dateCreated: project.year,
    keywords: project.stack.join(', '),
    author: { '@id': personId(siteUrl) },
    url,
    ...(image ? { image: absolute(image.src, siteUrl) } : {}),
    ...(project.repo ? { codeRepository: project.repo } : {}),
    ...(project.live ? { sameAs: project.live } : {}),
  };

  const breadcrumb = {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: site.name, item: absolute(localePath(lang), siteUrl) },
      { '@type': 'ListItem', position: 2, name: project.title[lang], item: url },
    ],
  };

  return {
    lang,
    title: `${project.title[lang]} — ${site.name}`,
    description: project.summary[lang],
    pathEn: projectPath(project.slug, 'en'),
    pathId: projectPath(project.slug, 'id'),
    extraLd: [work, breadcrumb],
    image,
    ogType: 'article' as const,
  };
}
