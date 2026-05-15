import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isValidImage(imageUrl?: string): boolean {
  if (!imageUrl) return true;
  const trimmedUrl = imageUrl.trim().toLowerCase();
  const placeholderPatterns = [
    'placeholder',
    '#',
    'null',
    'undefined',
    'none',
    '',
    'http://placeholder',
    'https://placeholder',
    '/placeholder',
    './placeholder',
  ];
  return !placeholderPatterns.some(pattern => trimmedUrl.includes(pattern));
}
