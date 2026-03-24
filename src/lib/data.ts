import fs from 'fs';
import path from 'path';
import contentData from '@data/content.json';

// Load biography data from split files at build time
function loadBiographiesData() {
  const dataDir = path.join(process.cwd(), 'data', 'notable-christians');
  const index = JSON.parse(fs.readFileSync(path.join(dataDir, '_index.json'), 'utf-8'));

  for (const cat of index.categories) {
    for (const sub of cat.subcategories) {
      sub.people = sub.people.map((ref: { $ref: string }) => {
        const personPath = path.join(dataDir, ref.$ref);
        return JSON.parse(fs.readFileSync(personPath, 'utf-8'));
      });
    }
  }

  return index;
}

const biographiesData = loadBiographiesData();

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

export interface PersonVideo {
  title: string;
  url: string;
  platform: string;
  note?: string;
}

export interface PersonSource {
  type: string;
  title: string;
  url?: string;
  note?: string;
}

export interface Person {
  name: string;
  years: string;
  title: string;
  bio: string;
  faith: string;
  slug: string;
  tagline: string;
  image: string;
  videos: PersonVideo[];
  sources: PersonSource[];
  categoryName: string;
  subcategoryName: string;
}

export interface BiographySubcategory {
  id: string;
  name: string;
  people: Person[];
}

export interface BiographyCategory {
  id: string;
  name: string;
  description: string;
  subcategories: BiographySubcategory[];
}

const bioData = biographiesData as unknown as {
  lastUpdated: string;
  categories: Array<{
    id: string;
    name: string;
    description: string;
    subcategories: Array<{
      id: string;
      name: string;
      people: Array<{
        name: string;
        years: string;
        title: string;
        bio: string;
        faith: string;
        slug: string;
        tagline: string;
        image: string;
        videos: PersonVideo[];
        sources: PersonSource[];
      }>;
    }>;
  }>;
};

function buildAllPeople(): Person[] {
  const people: Person[] = [];
  for (const cat of bioData.categories) {
    for (const sub of cat.subcategories) {
      for (const p of sub.people) {
        people.push({
          ...p,
          categoryName: cat.name,
          subcategoryName: sub.name,
        });
      }
    }
  }
  return people;
}

const _allPeople = buildAllPeople();

export function getAllPeople(): Person[] {
  return _allPeople;
}

export function getAllPeopleSlugs(): string[] {
  return _allPeople.map((p) => p.slug);
}

export function getPersonBySlug(slug: string): Person | undefined {
  return _allPeople.find((p) => p.slug === slug);
}

export function getPrevNextPerson(slug: string): { prev: Person | null; next: Person | null } {
  const idx = _allPeople.findIndex((p) => p.slug === slug);
  if (idx === -1) return { prev: null, next: null };
  return {
    prev: idx > 0 ? _allPeople[idx - 1] : null,
    next: idx < _allPeople.length - 1 ? _allPeople[idx + 1] : null,
  };
}

export function getBiographyCategories(): BiographyCategory[] {
  return bioData.categories.map((cat) => ({
    id: cat.id,
    name: cat.name,
    description: cat.description,
    subcategories: cat.subcategories.map((sub) => ({
      id: sub.id,
      name: sub.name,
      people: sub.people.map((p) => ({
        ...p,
        categoryName: cat.name,
        subcategoryName: sub.name,
      })),
    })),
  }));
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
