import type { Metadata } from 'next';
import slugify from 'slugify';

export const GOOGLE_ANALYTICS_TRACKING_ID = 'G-H3170C5SMW';
export const SITE_URL = 'https://www.sdg.church';
export const SITE_TITLE = 'Soli Deo Gloria';
export const SITE_DESCRIPTION =
  'Glory to God alone — a symphony of testimonies from every nation, tribe, and tongue. The gospel of Jesus Christ, Scripture, and real stories of lives transformed.';

/**
 * Convert a name to a URL-safe slug
 */
export function toSlug(name: string): string {
  return slugify(name, {
    lower: true,
    remove: /[*+~.()'"!:@?]/g,
  });
}

/**
 * Build page title with site name suffix
 */
export function buildTitle(title: string): string {
  return `${title} | ${SITE_TITLE}`;
}

export function canonicalUrl(path = '/'): string {
  const normalizedPath = path === '/' ? '/' : `${path.replace(/\/$/, '')}/`;
  return `${SITE_URL}${normalizedPath}`;
}

type MetadataImages = NonNullable<Metadata['openGraph']>['images'];

export function siteMetadata({
  title,
  description,
  path = '/',
  images,
}: {
  title?: string;
  description?: string;
  path?: string;
  images?: MetadataImages;
} = {}): Metadata {
  const pageTitle = title ? buildTitle(title) : SITE_TITLE;
  const pageDescription = description || SITE_DESCRIPTION;
  const canonical = canonicalUrl(path);

  return {
    metadataBase: new URL(SITE_URL),
    title: pageTitle,
    description: pageDescription,
    alternates: {
      canonical,
    },
    openGraph: {
      type: 'website',
      locale: 'en_US',
      siteName: SITE_TITLE,
      title: pageTitle,
      description: pageDescription,
      url: canonical,
      images,
    },
    twitter: {
      card: images ? 'summary_large_image' : 'summary',
      title: pageTitle,
      description: pageDescription,
      images,
    },
  };
}
