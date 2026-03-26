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
  tips?: {
    title: string;
    content: string;
    image: string;
  };
}

const eventModules = import.meta.glob('/content/events/*.md', { as: 'raw', eager: true }) as Record<string, string>;
const seasonModules = import.meta.glob('/content/seasons/*.md', { as: 'raw', eager: true }) as Record<string, string>;
const articleModules = import.meta.glob('/content/articles/*.md', { as: 'raw', eager: true }) as Record<string, string>;

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

export const events: Event[] = parseEvents();
export const seasons: Season[] = parseSeasons();
export const articles: Article[] = parseArticles();

export function getEventById(id: string): Event | undefined {
  return events.find(e => e.id === id);
}

export function getSeasonById(id: string): Season | undefined {
  return seasons.find(s => s.id === id);
}

export function getArticleById(id: string): Article | undefined {
  return articles.find(a => a.id === id);
}
