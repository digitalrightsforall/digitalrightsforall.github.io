import matter from 'gray-matter';

export interface Topic {
  id: string;
  title: string;
  description: string;
  order: number;
  projects?: string[];
  homeFeatured?: boolean;
  homeOrder?: number;
  content?: string;
}

export interface Project {
  id: string;
  topicId: string;
  title: string;
  year?: string;
  status: 'active' | 'completed';
  goal?: string;
  participants?: number;
  image?: string;
  outputs?: {
    name: string;
    url: string;
    type: string;
  }[];
  articles?: {
    title: string;
    url: string;
    date: string;
  }[];
  wikiUrl?: string;
  color: 'primary' | 'secondary' | 'tertiary';
  homeFeatured?: boolean;
  homeOrder?: number;
  content?: string;
}

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
  topicId?: string;
  projectId?: string;
  content?: string;
}

export interface Cocreation {
  id: string;
  number?: string;
  title: string;
  goal?: string;
  year?: string;
  status: 'active' | 'completed';
  outputs?: {
    name: string;
    url: string;
    type: string;
  }[];
  articles?: {
    title: string;
    url: string;
    date: string;
  }[];
  participants?: number;
  image: string;
  color: 'primary' | 'secondary' | 'tertiary';
  wikiUrl?: string;
  topicId?: string;
  projectId?: string;
  content?: string;
  homeFeatured?: boolean;
  homeOrder?: number;
}

export interface Guide {
  id: string;
  title: string;
  shortTitle: string;
  type: 'personal-data' | 'algorithm' | 'ai-society';
  description: string;
  goal: string;
  participants: number;
  image?: string;
  color: 'primary' | 'secondary' | 'tertiary';
  topicId?: string;
  projectId?: string;
  homeFeatured?: boolean;
  homeOrder?: number;
  feishuUrl?: string;
  videoUrl?: string;
  materials?: Array<{
    name: string;
    url: string;
    type: string;
  }>;
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
  topicId?: string;
  projectId?: string;
  homeFeatured?: boolean;
  homeOrder?: number;
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

const topicModules = import.meta.glob('/src/content/topics/*.md', { query: '?raw', import: 'default', eager: true }) as Record<string, string>;
const projectModules = import.meta.glob('/src/content/projects/*.md', { query: '?raw', import: 'default', eager: true }) as Record<string, string>;
const roundtableModules = import.meta.glob('/src/content/roundtable/*.md', { query: '?raw', import: 'default', eager: true }) as Record<string, string>;
const cocreationModules = import.meta.glob('/src/content/cocreation/*.md', { query: '?raw', import: 'default', eager: true }) as Record<string, string>;
const guideModules = import.meta.glob('/src/content/guide/*.md', { query: '?raw', import: 'default', eager: true }) as Record<string, string>;
const opinionModules = import.meta.glob('/src/content/opinions/*.md', { query: '?raw', import: 'default', eager: true }) as Record<string, string>;

function parseTopic(): Topic[] {
  return Object.values(topicModules).map((raw) => {
    const { data, content } = matter(raw as string);
    return {
      ...(data as Partial<Topic>),
      content: content.trim(),
    } as Topic;
  }).sort((a, b) => a.order - b.order);
}

function parseProject(): Project[] {
  return Object.values(projectModules).map((raw) => {
    const { data, content } = matter(raw as string);
    return {
      ...(data as Partial<Project>),
      content: content.trim(),
    } as Project;
  }).sort((a, b) => a.id.localeCompare(b.id));
}

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

export const topics: Topic[] = parseTopic();
export const projects: Project[] = parseProject();
export const roundtables: Roundtable[] = parseRoundtable();
export const cocreations: Cocreation[] = parseCocreation();
export const guides: Guide[] = parseGuide();
export const opinions: Opinion[] = parseOpinion();

export function getTopicById(id: string): Topic | undefined {
  return topics.find(t => t.id === id);
}

export function getProjectById(id: string): Project | undefined {
  return projects.find(p => p.id === id);
}

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

export function getProjectsByTopic(topicId: string): Project[] {
  return projects.filter(p => p.topicId === topicId);
}

export function getProjectsByIds(ids: string[]): Project[] {
  return ids.map(id => getProjectById(id)).filter((p): p is Project => p !== undefined);
}

export function getOpinionsByProject(projectId: string): Opinion[] {
  return opinions.filter(o => o.projectId === projectId);
}

export function getOpinionsByTopic(topicId: string): Opinion[] {
  return opinions.filter(o => o.topicId === topicId);
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

export function getFeaturedCarouselItems(): Array<{ type: 'topic' | 'project' | 'opinion' | 'guide' | 'cocreation'; item: any }> {
  const items: Array<{ type: 'topic' | 'project' | 'opinion' | 'guide' | 'cocreation'; item: any }> = [];

  topics.filter(t => t.order <= 3).forEach(topic => {
    items.push({ type: 'topic', item: topic });
  });

  projects.filter(p => p.status === 'completed').forEach(project => {
    items.push({ type: 'project', item: project });
  });

  return items;
}

export function parseTopicLinks(content: string): string {
  return content.replace(/\{\%topic\s+(\w+(?:-\w+)*)\%\}/g, (match, topicId) => {
    const topic = getTopicById(topicId);
    if (topic) {
      return `<a href="/topic/${topicId}" class="text-primary hover:underline font-medium">${topic.title}</a>`;
    }
    return match;
  });
}

export function parseContentLinks(content: string): string {
  let result = content;
  
  result = result.replace(/\{\%topic\s+(\w+(?:-\w+)*)\%\}/g, (match, id) => {
    const item = getTopicById(id);
    return item ? `<a href="/topic/${id}" class="text-primary hover:underline font-medium">${item.title}</a>` : match;
  });
  
  result = result.replace(/\{\%project\s+(\w+(?:-\w+)*)\%\}/g, (match, id) => {
    const item = getProjectById(id);
    return item ? `<a href="/project/${id}" class="text-primary hover:underline font-medium">${item.title}</a>` : match;
  });
  
  result = result.replace(/\{\%cocreation\s+(\w+(?:-\w+)*)\%\}/g, (match, id) => {
    const item = getCocreationById(id);
    return item ? `<a href="/cocreation/${id}" class="text-primary hover:underline font-medium">${item.title}</a>` : match;
  });
  
  result = result.replace(/\{\%roundtable\s+(\w+(?:-\w+)*)\%\}/g, (match, id) => {
    const item = getRoundtableById(id);
    return item ? `<a href="/roundtable" class="text-primary hover:underline font-medium">${item.title}</a>` : match;
  });
  
  result = result.replace(/\{\%guide\s+(\w+(?:-\w+)*)\%\}/g, (match, id) => {
    const item = getGuideById(id);
    return item ? `<a href="/guide" class="text-primary hover:underline font-medium">${item.title}</a>` : match;
  });
  
  result = result.replace(/\{\%opinion\s+(\w+(?:-\w+)*)\%\}/g, (match, id) => {
    const item = getOpinionById(id);
    return item ? `<a href="/opinions/${id}" class="text-primary hover:underline font-medium">${item.title}</a>` : match;
  });
  
  return result;
}
