import type { MetadataRoute } from 'next';

import { getAllPeopleSlugs, getVideos } from '@/lib/data';
import { SITE_URL } from '@/lib/seo';

export const dynamic = 'force-static';

const STATIC_ROUTES = [
  '',
  'gospel',
  'repentance',
  'scripture',
  'testimonies',
  'biographies',
  'selection-guidelines',
  'christianity-and-roman-catholicism',
];

function route(
  path: string,
  priority: number,
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'] = 'monthly',
) {
  return {
    url: path ? `${SITE_URL}/${path}/` : `${SITE_URL}/`,
    changeFrequency,
    priority,
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = STATIC_ROUTES.map((path) => route(path, path === '' ? 1 : 0.8));
  const biographyRoutes = getAllPeopleSlugs().map((slug) => route(`biographies/${slug}`, 0.7));
  const videoRoutes = getVideos().map((video) => route(`videos/${video.id}`, 0.7));

  return [...staticRoutes, ...biographyRoutes, ...videoRoutes];
}
