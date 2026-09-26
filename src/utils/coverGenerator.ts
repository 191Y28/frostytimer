/**
 * Ultra-Lightweight Zero-Memory Cover Generator
 * Produces tiny, instant SVG data strings with zero canvas and zero memory leaks.
 */

import { CoverTheme } from '../types';

export const THEME_DETAILS: Record<
  CoverTheme,
  { name: string; subtitle: string; primary: string; secondary: string; dark: string; border: string }
> = {
  aurora: {
    name: 'Glacial Aurora',
    subtitle: 'Northern Lights Glow',
    primary: '#2dd4bf',
    secondary: '#06b6d4',
    dark: '#020b1e',
    border: '#0d9488',
  },
  iceberg: {
    name: 'Deep Iceberg',
    subtitle: 'Sapphire Crystalline',
    primary: '#38bdf8',
    secondary: '#2563eb',
    dark: '#030712',
    border: '#1d4ed8',
  },
  frostbite: {
    name: 'Frostbite Neon',
    subtitle: 'Cyber Cryo Lattice',
    primary: '#67e8f9',
    secondary: '#818cf8',
    dark: '#081a2e',
    border: '#4338ca',
  },
  permafrost: {
    name: 'Permafrost Glass',
    subtitle: 'Diamond Ice Mist',
    primary: '#e0f2fe',
    secondary: '#94a3b8',
    dark: '#0f172a',
    border: '#475569',
  },
};

export function generateCoverDataUrl(
  title: string,
  theme: CoverTheme = 'iceberg',
  badgeText?: string
): string {
  const safeTitle = (title || 'Game').slice(0, 32).replace(/[<>&"]/g, '');
  const safeBadge = (badgeText || 'GAME').slice(0, 16).toUpperCase().replace(/[<>&"]/g, '');
  const themeInfo = THEME_DETAILS[theme] || THEME_DETAILS.iceberg;

  // Ultra-lightweight ~200 byte SVG data URI: no filters, no blur, no canvas
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 260" width="400" height="260"><rect width="100%" height="100%" fill="${themeInfo.dark}"/><rect x="16" y="16" width="${safeBadge.length * 8 + 16}" height="20" rx="4" fill="#020617" stroke="${themeInfo.border}" stroke-width="1"/><text x="24" y="30" fill="${themeInfo.primary}" font-family="sans-serif" font-size="10" font-weight="bold">${safeBadge}</text><text x="50%" y="55%" text-anchor="middle" fill="#ffffff" font-family="sans-serif" font-size="20" font-weight="bold">${safeTitle}</text></svg>`;

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}
