import type { MetadataRoute } from 'next';
import { getAllPeopleSlugs, getVideos } from '@/lib/data';
import { canonicalUrl } from '@/lib/seo';

export const dynamic = 'force-static';

const staticRoutes: Array<{
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'];
  priority: number;
}> = [
  { path: '/', changeFrequency: 'weekly', priority: 1.0 },
  { path: '/gospel', changeFrequency: 'monthly', priority: 0.95 },
  { path: '/testimonies', changeFrequency: 'weekly', priority: 0.9 },
  { path: '/biographies', changeFrequency: 'weekly', priority: 0.9 },
  { path: '/scripture', changeFrequency: 'monthly', priority: 0.85 },
  { path: '/repentance', changeFrequency: 'monthly', priority: 0.85 },
  { path: '/selection-guidelines', changeFrequency: 'yearly', priority: 0.5 },
  { path: '/christianity-and-roman-catholicism', changeFrequency: 'yearly', priority: 0.7 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    ...staticRoutes,
    ...getAllPeopleSlugs().map((slug) => ({
      path: `/biographies/${slug}`,
      changeFrequency: 'monthly' as const,
      priority: 0.75,
    })),
    ...getVideos().map((video) => ({
      path: `/videos/${video.id}`,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ];

  return routes.map((route) => ({
    url: canonicalUrl(route.path),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
