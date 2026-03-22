export type YouTubeThumbnailSize =
  | 'default'
  | 'mqdefault'
  | 'hqdefault'
  | 'sddefault'
  | 'maxresdefault';

export function youTubeThumbnailUrl(
  videoId: string,
  size: YouTubeThumbnailSize = 'sddefault'
): string {
  return `https://img.youtube.com/vi/${videoId}/${size}.jpg`;
}

export function youTubeEmbedUrl(videoId: string): string {
  return `https://www.youtube.com/embed/${videoId}`;
}
