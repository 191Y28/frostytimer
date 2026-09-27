/**
 * Smart Search, Fuzzy Matcher, and Relevance Sorter
 * Provides space-agnostic, symbol-friendly, tokenized, and acronym-aware search with intelligent relevance ranking.
 */

import { GameItem } from '../types';

// Common gaming acronyms and aliases
const ACRONYM_MAP: Record<string, string[]> = {
  fnaf: ["five nights at freddy's", 'five nights at freddys', 'five nights'],
  fnf: ['friday night funkin', "friday night funkin'"],
  gta: ['grand theft auto'],
  mc: ['minecraft', 'eaglercraft'],
  sm64: ['super mario 64', 'mario 64'],
  smb: ['super mario bros', 'super mario brother'],
  btd: ['bloons tower defense', 'bloons td'],
  btd5: ['bloons tower defense 5', 'bloons td 5'],
  btd6: ['bloons tower defense 6', 'bloons td 6'],
  gd: ['geometry dash'],
  pvz: ['plants vs zombies', 'plants versus zombies'],
  sf: ['street fighter'],
  mk: ['mortal kombat', 'mario kart'],
  cs: ['counter strike', 'counter-strike'],
  tf2: ['team fortress 2'],
  dk: ['donkey kong'],
  papaspizzeria: ["papa's pizzeria", 'papas pizzeria'],
  motox3m: ['moto x3m', 'moto x 3m', 'motox 3m'],
};

/**
 * Normalizes text by lowercasing and stripping all whitespace, punctuation, hyphens, etc.
 * e.g., "Moto X3M: Winter!" -> "motox3mwinter"
 */
export function normalizeForSearch(text: string): string {
  if (!text) return '';
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // remove diacritics / accents
    .replace(/[^a-z0-9]/g, ''); // strip everything except letters & numbers
}

/**
 * Normalizes Roman numerals to Arabic numbers for comparison
 */
function normalizeNumerals(text: string): string {
  return text
    .replace(/\b(viii)\b/gi, '8')
    .replace(/\b(vii)\b/gi, '7')
    .replace(/\b(vi)\b/gi, '6')
    .replace(/\b(iv)\b/gi, '4')
    .replace(/\b(v)\b/gi, '5')
    .replace(/\b(iii)\b/gi, '3')
    .replace(/\b(ii)\b/gi, '2')
    .replace(/\b(i)\b/gi, '1');
}

/**
 * Calculate search relevance score for a game.
 * Higher score = higher ranking in search results. 0 = no match.
 */
export function getSearchScore(game: GameItem, rawQuery: string): number {
  if (!rawQuery || !rawQuery.trim()) return 1;

  const query = rawQuery.trim().toLowerCase();
  const normQuery = normalizeForSearch(query);

  const title = (game.title || '').trim().toLowerCase();
  const normTitle = normalizeForSearch(title);
  const fileName = (game.fileName || '').trim().toLowerCase();
  const normFileName = normalizeForSearch(fileName);
  const desc = (game.description || '').toLowerCase();
  const normDesc = normalizeForSearch(desc);
  const engine = (game.detectedEngine || '').toLowerCase();
  const normEngine = normalizeForSearch(engine);
  const category = (game.category || '').toLowerCase();

  let score = 0;

  // 1. Exact direct matches (highest priority)
  if (title === query || fileName === query) {
    return 10000;
  }
  if (normQuery && normTitle === normQuery) {
    return 8000;
  }
  if (normQuery && normFileName === normQuery) {
    return 7000;
  }

  // 2. Starts with query
  if (title.startsWith(query)) {
    score += 4000;
  } else if (normQuery && normTitle.startsWith(normQuery)) {
    score += 3000;
  }

  if (fileName.startsWith(query)) {
    score += 2500;
  } else if (normQuery && normFileName.startsWith(normQuery)) {
    score += 2000;
  }

  // 3. Word boundary starts with query
  const titleWords = title.split(/[\s\-_:,.]+/);
  if (titleWords.some((w) => w === query)) {
    score += 2500;
  } else if (titleWords.some((w) => w.startsWith(query))) {
    score += 1500;
  }

  // 4. Substring inclusions
  if (title.includes(query)) {
    score += 1000;
  } else if (normQuery && normTitle.includes(normQuery)) {
    score += 800;
  }

  if (fileName.includes(query)) {
    score += 500;
  } else if (normQuery && normFileName.includes(normQuery)) {
    score += 400;
  }

  // 5. Roman numerals check
  const numQuery = normalizeForSearch(normalizeNumerals(query));
  const numTitle = normalizeForSearch(normalizeNumerals(title));
  if (numQuery && numTitle && numTitle.includes(numQuery)) {
    score += 600;
  }

  // 6. Token matching for multi-word queries (e.g. "moto pool")
  const tokens = query
    .split(/[\s\-_:,.]+/)
    .map((t) => normalizeForSearch(t))
    .filter((t) => t.length > 0);

  if (tokens.length > 1) {
    const matchedTokens = tokens.filter(
      (tok) =>
        normTitle.includes(tok) ||
        normFileName.includes(tok) ||
        normDesc.includes(tok) ||
        normEngine.includes(tok)
    );
    if (matchedTokens.length === tokens.length) {
      score += 700;
    } else if (matchedTokens.length > 0) {
      score += matchedTokens.length * 100;
    }
  }

  // 7. Acronym matching (e.g., "fnaf", "fnf", "mc", "sm64")
  for (const [acronym, expansions] of Object.entries(ACRONYM_MAP)) {
    if (normQuery === acronym || normQuery.startsWith(acronym)) {
      for (const exp of expansions) {
        const normExp = normalizeForSearch(exp);
        if (normTitle.includes(normExp) || normFileName.includes(normExp)) {
          score += 650;
        }
      }
    }
    if (normTitle.includes(acronym)) {
      for (const exp of expansions) {
        const normExp = normalizeForSearch(exp);
        if (normQuery.includes(normExp)) {
          score += 650;
        }
      }
    }
  }

  // 8. Description, Engine, Category matches
  if (desc.includes(query) || (normQuery && normalizeForSearch(desc).includes(normQuery))) {
    score += 150;
  }
  if (engine.includes(query) || (normQuery && normalizeForSearch(engine).includes(normQuery))) {
    score += 100;
  }
  if (category.includes(query)) {
    score += 50;
  }

  return score;
}

/**
 * Determines whether a game matches a user's search query.
 */
export function matchesSearchQuery(game: GameItem, rawQuery: string): boolean {
  if (!rawQuery || !rawQuery.trim()) return true;
  return getSearchScore(game, rawQuery) > 0;
}

/**
 * Filters and sorts games by relevance ranking.
 * If search is empty, sorts cleanly alphabetically with natural numbers.
 */
export function searchAndSortGames(games: GameItem[], rawQuery: string): GameItem[] {
  const query = (rawQuery || '').trim();

  if (!query) {
    return [...games].sort((a, b) =>
      a.title.localeCompare(b.title, undefined, { numeric: true, sensitivity: 'base' })
    );
  }

  const scored = games
    .map((game) => ({ game, score: getSearchScore(game, query) }))
    .filter((item) => item.score > 0);

  scored.sort((a, b) => {
    if (b.score !== a.score) {
      return b.score - a.score;
    }
    return a.game.title.localeCompare(b.game.title, undefined, {
      numeric: true,
      sensitivity: 'base',
    });
  });

  return scored.map((item) => item.game);
}
