import slugify from 'slugify';

export const GOOGLE_ANALYTICS_TRACKING_ID = 'G-XXXXXXXXXX';
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
