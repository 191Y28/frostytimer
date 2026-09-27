/**
 * Frosty Timer & Arcade Engine Types
 */

export type CoverTheme = 'aurora' | 'iceberg' | 'frostbite' | 'permafrost';

export type GameType = 'html' | 'swf' | 'built-in';

export interface GameItem {
  id: string;
  title: string;
  type: GameType;
  coverTheme: CoverTheme;
  codeOrData?: string; // HTML string or base64 SWF
  driveUrl?: string;
  fileName?: string;
  fileSize: number;
  addedAt: number;
  isFavorite?: boolean;
  playCount?: number;
  description?: string;
  detectedEngine?: string;
  category?: string; // Genre (e.g. Action, Arcade, Platformer, Shooter, Sports, etc.)
  genre?: string; // Standardized genre alias
  healthScore?: number;
  ranking?: number; // 0.0 to 10.0 score (1 decimal place)
  isSlop?: boolean; // Flagged as low-quality/slop, isolated in Slop Games vault
  issuesFixed?: string[];
  isEliteProtected?: boolean;
}

export interface StagedUpload {
  id: string;
  file: File;
  title: string;
  type: GameType;
  fileSize: number;
  detectedEngine: string;
  coverTheme: CoverTheme;
  codeOrData?: string;
  driveUrl?: string;
  status: 'inspecting' | 'ready' | 'error';
  errorMessage?: string;
  healthScore?: number;
  ranking?: number;
  issuesFixed?: string[];
  isEliteProtected?: boolean;
}

export type TabCloakPreset = 'frosty' | 'classroom' | 'drive' | 'canvas' | 'desmos';

export interface TabCloakConfig {
  id: TabCloakPreset;
  title: string;
  favicon: string;
}

export const DECOY_CODES = [
  'NOCHEUFC',
  'ROBBIELAWLERISTHEGOAT',
  'UFC331',
  'MOBBDEEP', // The only one that unlocks the portal!
  'BOXING',
  'MUAY THAI',
  'BJJ',
  'WRESTLING',
  'KARATE',
  'GMAIL',
  'SECRETJOIN'
] as const;

export const UNLOCK_CODE = 'MOBBDEEP';
