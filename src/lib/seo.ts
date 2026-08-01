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

interface SeoMetadataOptions {
  title?: string;
  description?: string;
  path: string;
  appendSiteTitle?: boolean;
}

/**
 * Build consistent canonical, Open Graph, and Twitter metadata for a page.
 */
export function buildSeoMetadata({
  title = SITE_TITLE,
  description = SITE_DESCRIPTION,
  path,
  appendSiteTitle = true,
}: SeoMetadataOptions): Metadata {
  const metadataTitle = appendSiteTitle ? buildTitle(title) : title;

  return {
    title: metadataTitle,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: 'website',
      url: path,
      siteName: SITE_TITLE,
      title: metadataTitle,
      description,
    },
    twitter: {
      card: 'summary',
      title: metadataTitle,
      description,
    },
  };
}
