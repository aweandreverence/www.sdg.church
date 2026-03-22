import contentData from '@data/content.json';

export interface Testimony {
  id: string;
  videoId: string;
  title: string;
  description: string;
  tags: string[];
}

export interface Scripture {
  reference: string;
  text: string;
  theme: string;
  order: number;
}

export interface GospelSection {
  title: string;
  content: string;
  icon: string;
}

export interface Video {
  id: string;
  videoId: string;
  title: string;
  description: string;
  tags: string[];
  type: string;
}

const data = contentData as {
  testimonies: Testimony[];
  scripture: Scripture[];
  gospel: { sections: GospelSection[] };
  videos: Video[];
};

export function getTestimonies(): Testimony[] {
  return data.testimonies;
}

export function getScriptures(): Scripture[] {
  return data.scripture.sort((a, b) => a.order - b.order);
}

export function getScripturesByTheme(theme: string): Scripture[] {
  return data.scripture
    .filter((s) => s.theme === theme)
    .sort((a, b) => a.order - b.order);
}

export function getScriptureThemes(): string[] {
  return [...new Set(data.scripture.map((s) => s.theme))];
}

export function getGospelSections(): GospelSection[] {
  return data.gospel.sections;
}

export function getVideos(): Video[] {
  return data.videos;
}

export function getVideoById(id: string): Video | undefined {
  return data.videos.find((v) => v.id === id);
}

export function getVideoByVideoId(videoId: string): Video | undefined {
  return data.videos.find((v) => v.videoId === videoId);
}
