import matter from 'gray-matter';

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  category: string;
  image: string;
  seatsRemaining?: number;
  attendeesCount?: number;
}

export interface Season {
  id: string;
  number: string;
  title: string;
  goal: string;
  outputs: string[];
  image: string;
  icon: string;
  color: 'primary' | 'secondary' | 'tertiary';
}

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  featured?: boolean;
  tips?: {
    title: string;
    content: string;
    image: string;
  };
}

export interface Publication {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  type: 'biweekly' | 'monthly';
  issue: string;
  date: string;
  readTime: string;
  author: string;
  image: string;
}

export interface Workshop {
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
}

export interface Campaign {
  id: string;
  title: string;
  year: string;
  status: 'active' | 'completed';
  goal: string;
  participants: number;
  outputs: {
    name: string;
    url: string;
    type: 'pdf' | 'ppt' | 'video' | 'article';
  }[];
  image: string;
  color: 'primary' | 'secondary' | 'tertiary';
  wikiUrl?: string;
}

const eventModules = import.meta.glob('/src/content/events/*.md', { as: 'raw', eager: true }) as Record<string, string>;
const seasonModules = import.meta.glob('/src/content/seasons/*.md', { as: 'raw', eager: true }) as Record<string, string>;
const articleModules = import.meta.glob('/src/content/articles/*.md', { as: 'raw', eager: true }) as Record<string, string>;
const publicationModules = import.meta.glob('/src/content/publications/*.md', { as: 'raw', eager: true }) as Record<string, string>;
const workshopModules = import.meta.glob('/src/content/workshops/*.md', { as: 'raw', eager: true }) as Record<string, string>;
const campaignModules = import.meta.glob('/src/content/campaigns/*.md', { as: 'raw', eager: true }) as Record<string, string>;

function parseEvents(): Event[] {
  return Object.values(eventModules).map((raw) => {
    const { data, content } = matter(raw as string);
    return {
      ...(data as Partial<Event>),
      content: content.trim(),
    } as Event;
  }).sort((a, b) => a.id.localeCompare(b.id));
}

function parseSeasons(): Season[] {
  return Object.values(seasonModules).map((raw) => {
    const { data, content } = matter(raw as string);
    return {
      ...(data as Partial<Season>),
      content: content.trim(),
    } as Season;
  }).sort((a, b) => a.id.localeCompare(b.id));
}

function parseArticles(): Article[] {
  return Object.values(articleModules).map((raw) => {
    const { data, content } = matter(raw as string);
    return {
      ...(data as Partial<Article>),
      content: content.trim(),
    } as Article;
  }).sort((a, b) => a.id.localeCompare(b.id));
}

function parsePublications(): Publication[] {
  return Object.values(publicationModules).map((raw) => {
    const { data, content } = matter(raw as string);
    return {
      ...(data as Partial<Publication>),
      content: content.trim(),
    } as Publication;
  }).sort((a, b) => a.id.localeCompare(b.id));
}

function parseWorkshops(): Workshop[] {
  return Object.values(workshopModules).map((raw) => {
    const { data, content } = matter(raw as string);
    return {
      ...(data as Partial<Workshop>),
      content: content.trim(),
    } as Workshop;
  }).sort((a, b) => a.id.localeCompare(b.id));
}

function parseCampaigns(): Campaign[] {
  return Object.values(campaignModules).map((raw) => {
    const { data, content } = matter(raw as string);
    return {
      ...(data as Partial<Campaign>),
      content: content.trim(),
    } as Campaign;
  }).sort((a, b) => a.id.localeCompare(b.id));
}

export const events: Event[] = parseEvents();
export const seasons: Season[] = parseSeasons();
export const articles: Article[] = parseArticles();
export const publications: Publication[] = parsePublications();
export const workshops: Workshop[] = parseWorkshops();
export const campaigns: Campaign[] = parseCampaigns();

export function getEventById(id: string): Event | undefined {
  return events.find(e => e.id === id);
}

export function getSeasonById(id: string): Season | undefined {
  return seasons.find(s => s.id === id);
}

export function getArticleById(id: string): Article | undefined {
  return articles.find(a => a.id === id);
}

export function getPublicationById(id: string): Publication | undefined {
  return publications.find(p => p.id === id);
}

export function getWorkshopById(id: string): Workshop | undefined {
  return workshops.find(w => w.id === id);
}

export function getCampaignById(id: string): Campaign | undefined {
  return campaigns.find(c => c.id === id);
}

export function getFeaturedArticles(limit: number = 3): Article[] {
  const featured = articles.filter(a => a.featured);
  if (featured.length >= limit) {
    return featured.slice(0, limit);
  }
  const remaining = limit - featured.length;
  const nonFeatured = articles.filter(a => !a.featured);
  return [...featured, ...nonFeatured.slice(0, remaining)];
}
