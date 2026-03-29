export type YouTubeThumbnailSize =
  | 'default'
  | 'mqdefault'
  | 'hqdefault'
  | 'sddefault'
  | 'maxresdefault';

/**
 * Returns the URL for a locally cached YouTube thumbnail.
 * Images are downloaded by scripts/resolve-thumbnails.mjs
 * and committed under public/thumbnails/.
 */
export function youTubeThumbnailUrl(videoId: string): string {
  return `/thumbnails/${videoId}.jpg`;
}

export function youTubeEmbedUrl(videoId: string): string {
  return `https://www.youtube.com/embed/${videoId}`;
}
