import matter from 'gray-matter';

export interface Roundtable {
  id: string;
  title: string;
  description: string;
  date: string;
  time?: string;
  location?: string;
  category: string;
  image: string;
  seatsRemaining?: number;
  attendeesCount?: number;
  content?: string;
}

export interface Cocreation {
  id: string;
  number?: string;
  title: string;
  goal?: string;
  year?: string;
  status: 'active' | 'completed';
  outputs?: string[];
  participants?: number;
  image: string;
  color: 'primary' | 'secondary' | 'tertiary';
  wikiUrl?: string;
  content?: string;
}

export interface Guide {
  id: string;
  title: string;
  shortTitle: string;
  type: 'personal-data' | 'algorithm' | 'ai-society';
  description: string;
  goal: string;
  videoUrl?: string;
  pptUrl?: string;
  materials: {
    name: string;
    url: string;
    type: string;
  }[];
  participants: number;
  image: string;
  color: 'primary' | 'secondary' | 'tertiary';
  content?: string;
}

export interface Opinion {
  id: string;
  title: string;
  excerpt: string;
  content?: string;
  author: string;
  date: string;
  readTime: string;
  category?: string;
  image: string;
  featured?: boolean;
  tips?: {
    title: string;
    content: string;
    image: string;
  };
  type?: 'biweekly' | 'monthly' | 'article';
  issue?: string;
}

export interface Play {
  id: string;
  title: string;
  description: string;
  type: 'game' | 'tool' | 'assessment';
  url: string;
  image: string;
  githubUrl?: string;
}

const roundtableModules = import.meta.glob('/src/content/roundtable/*.md', { query: '?raw', import: 'default', eager: true }) as Record<string, string>;
const cocreationModules = import.meta.glob('/src/content/cocreation/*.md', { query: '?raw', import: 'default', eager: true }) as Record<string, string>;
const guideModules = import.meta.glob('/src/content/guide/*.md', { query: '?raw', import: 'default', eager: true }) as Record<string, string>;
const opinionModules = import.meta.glob('/src/content/opinions/*.md', { query: '?raw', import: 'default', eager: true }) as Record<string, string>;

function parseRoundtable(): Roundtable[] {
  return Object.values(roundtableModules).map((raw) => {
    const { data, content } = matter(raw as string);
    return {
      ...(data as Partial<Roundtable>),
      content: content.trim(),
    } as Roundtable;
  }).sort((a, b) => a.id.localeCompare(b.id));
}

function parseCocreation(): Cocreation[] {
  return Object.values(cocreationModules).map((raw) => {
    const { data, content } = matter(raw as string);
    return {
      ...(data as Partial<Cocreation>),
      content: content.trim(),
    } as Cocreation;
  }).sort((a, b) => a.id.localeCompare(b.id));
}

function parseGuide(): Guide[] {
  return Object.values(guideModules).map((raw) => {
    const { data, content } = matter(raw as string);
    return {
      ...(data as Partial<Guide>),
      content: content.trim(),
    } as Guide;
  }).sort((a, b) => a.id.localeCompare(b.id));
}

function parseOpinion(): Opinion[] {
  return Object.values(opinionModules).map((raw) => {
    const { data, content } = matter(raw as string);
    return {
      ...(data as Partial<Opinion>),
      content: content.trim(),
    } as Opinion;
  }).sort((a, b) => a.id.localeCompare(b.id));
}

export const roundtables: Roundtable[] = parseRoundtable();
export const cocreations: Cocreation[] = parseCocreation();
export const guides: Guide[] = parseGuide();
export const opinions: Opinion[] = parseOpinion();

export function getRoundtableById(id: string): Roundtable | undefined {
  return roundtables.find(r => r.id === id);
}

export function getCocreationById(id: string): Cocreation | undefined {
  return cocreations.find(c => c.id === id);
}

export function getGuideById(id: string): Guide | undefined {
  return guides.find(g => g.id === id);
}

export function getOpinionById(id: string): Opinion | undefined {
  return opinions.find(o => o.id === id);
}

export function getFeaturedOpinions(limit: number = 3): Opinion[] {
  const featured = opinions.filter(o => o.featured);
  if (featured.length >= limit) {
    return featured.slice(0, limit);
  }
  const remaining = limit - featured.length;
  const nonFeatured = opinions.filter(o => !o.featured);
  return [...featured, ...nonFeatured.slice(0, remaining)];
}
