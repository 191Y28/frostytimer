/**
 * Games View - Hub of Unblocked Retro & Uploaded Games
 * Minimalist, uncluttered design with:
 * - Sleek Alphabet Ribbon (ALL, #, A-Z) without noisy badges
 * - Instant full display for letters (no annoying 1 2 3 pagination inside letters)
 * - Clean "Load More" progressive reveal for "ALL" view to keep memory lean (<40MB)
 * - Slop Games Vault isolation tab next to Favorites
 */

import React, { useState, useMemo, useEffect, useRef } from 'react';
import {
  Search,
  Star,
  Play,
  ListOrdered,
  Trash2,
  RotateCcw,
  Sparkles,
  ChevronDown,
  Flame,
  Compass,
  Gamepad2,
  Coffee,
  Swords,
  Users,
  Layers,
  Puzzle,
  Gauge,
  Tv,
  Crosshair,
  Cpu,
  Trophy,
  Crown,
  LayoutGrid,
} from 'lucide-react';
import { GameItem } from '../types';
import { sound } from '../utils/audio';
import { STANDARD_GENRES, normalizeGenre } from '../utils/eliteCodeSanitizer';
import { matchesSearchQuery, getSearchScore } from '../utils/searchHelper';

interface GamesViewProps {
  games: GameItem[];
  onPlayGame: (game: GameItem) => void;
  onToggleFavorite: (id: string) => void;
  onToggleSlop?: (id: string) => void;
  onOpenUpload: () => void;
  onUpdateGames?: (updatedGames: GameItem[]) => void;
  onUpdateRanking?: (id: string, ranking: number) => void;
  onDeleteGame?: (id: string) => void;
  isVoteMode: boolean;
  isDevMode?: boolean;
  filterType: 'all' | 'popular' | 'favorites' | 'slop';
  onSelectFilterType: (tab: 'all' | 'popular' | 'favorites' | 'slop') => void;
}

export function getGenreIcon(genre?: string) {
  const g = (genre || '').toLowerCase();
  if (g.includes('action')) return Flame;
  if (g.includes('adventure')) return Compass;
  if (g.includes('arcade')) return Gamepad2;
  if (g.includes('casual')) return Coffee;
  if (g.includes('fighting')) return Swords;
  if (g.includes('multiplayer')) return Users;
  if (g.includes('platformer')) return Layers;
  if (g.includes('puzzle')) return Puzzle;
  if (g.includes('racing')) return Gauge;
  if (g.includes('retro')) return Tv;
  if (g.includes('rpg')) return Sparkles;
  if (g.includes('shooter')) return Crosshair;
  if (g.includes('simulation')) return Cpu;
  if (g.includes('sports')) return Trophy;
  if (g.includes('strategy')) return Crown;
  return Gamepad2;
}

interface RankingInputProps {
  gameId: string;
  currentRanking?: number;
  isVoteMode: boolean;
  onSave: (ranking: number) => void;
}

const RankingInput: React.FC<RankingInputProps> = ({
  gameId,
  currentRanking,
  isVoteMode,
  onSave,
}) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>(
    currentRanking !== undefined && currentRanking !== null
      ? currentRanking.toFixed(1)
      : ''
  );
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setInputValue(
      currentRanking !== undefined && currentRanking !== null
        ? currentRanking.toFixed(1)
        : ''
    );
  }, [currentRanking]);

  const commitValue = (raw: string) => {
    if (raw.trim() === '') {
      setIsEditing(false);
      return;
    }

    const num = parseFloat(raw);
    if (!isNaN(num)) {
      const clamped = Math.min(10, Math.max(0, num));
      const rounded = Math.round(clamped * 10) / 10;
      onSave(rounded);
      setInputValue(rounded.toFixed(1));
      sound.playUnlock();
    }
    setIsEditing(false);
  };

  if (!isVoteMode) {
    if (currentRanking !== undefined && currentRanking !== null) {
      return (
        <span
          title="Ranking score (Enable Vote Mode to edit)"
          className="px-2 py-0.5 rounded bg-blue-950/60 border border-blue-800/40 text-[10px] font-semibold text-cyan-300 flex items-center gap-1 shadow-xs select-none"
        >
          <span className="text-cyan-400 font-bold">★</span>
          <span>{currentRanking.toFixed(1)}</span>
          <span className="text-[9px] text-cyan-400/60 font-medium">/10</span>
        </span>
      );
    }
    return (
      <span
        title="Unranked (Enable Vote Mode to vote)"
        className="px-2 py-0.5 rounded bg-slate-900/60 border border-slate-800 text-[9px] font-medium text-slate-500 select-none"
      >
        Unranked
      </span>
    );
  }

  if (isEditing) {
    return (
      <div
        onClick={(e) => e.stopPropagation()}
        className="flex items-center gap-1 bg-slate-950/95 border border-cyan-500/70 rounded px-1.5 py-0.5 shadow-md ring-1 ring-cyan-500/30"
      >
        <span className="text-cyan-400 text-[10px] font-bold">★</span>
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          placeholder="0-10.0"
          autoFocus={isEditing}
          onChange={(e) => {
            const v = e.target.value;
            if (/^(\d{0,2}(\.\d{0,1})?)?$/.test(v)) {
              setInputValue(v);
            }
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              commitValue(inputValue);
            } else if (e.key === 'Escape') {
              setIsEditing(false);
              setInputValue(
                currentRanking !== undefined && currentRanking !== null
                  ? currentRanking.toFixed(1)
                  : ''
              );
            }
          }}
          onBlur={() => commitValue(inputValue)}
          className="w-11 bg-transparent text-[10px] font-mono font-bold text-cyan-200 focus:outline-none text-center"
        />
        <span className="text-[9px] text-slate-500 font-semibold select-none">/10</span>
      </div>
    );
  }

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        sound.playKeypress();
        setIsEditing(true);
      }}
      title="Click to edit ranking (0.0 to 10.0)"
      className="px-2 py-0.5 rounded bg-blue-950/80 border border-cyan-600/50 text-[9px] font-bold text-cyan-300 hover:text-white hover:border-cyan-400 hover:bg-blue-900/90 flex items-center gap-1 transition-all cursor-pointer shadow-xs"
    >
      <span className="text-cyan-400 font-bold">★</span>
      <span>
        {currentRanking !== undefined && currentRanking !== null
          ? currentRanking.toFixed(1)
          : 'VOTE'}
      </span>
    </button>
  );
};

export const GamesView: React.FC<GamesViewProps> = ({
  games,
  onPlayGame,
  onToggleFavorite,
  onToggleSlop,
  onOpenUpload,
  onUpdateGames,
  onUpdateRanking,
  onDeleteGame,
  isVoteMode,
  isDevMode = false,
  filterType,
  onSelectFilterType,
}) => {
  const [search, setSearch] = useState('');
  const [selectedLetter, setSelectedLetter] = useState<string>('ALL');
  const [selectedGenre, setSelectedGenre] = useState<string>('all');
  // Progressive reveal count for ALL view (starts at 60 to prevent DOM spikes, loads in 60-item chunks)
  const [visibleCount, setVisibleCount] = useState<number>(60);
  const CHUNK_SIZE = 60;

  // Dynamically extract all available genres from indexed games
  const availableGenres = useMemo(() => {
    const set = new Set<string>();
    games.forEach((g) => {
      const gCategory = g.category || g.genre;
      if (gCategory && gCategory.trim()) {
        const trimmed = gCategory.trim();
        const formatted = trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
        if (formatted !== 'Fighting') {
          set.add(formatted);
        }
      }
    });
    const remainingSorted = Array.from(set).sort();
    return ['All Genres', 'Fighting', ...remainingSorted];
  }, [games]);

  // Alphabet list for letter jump ribbon: ALL, #, A-Z
  const alphabet = useMemo(() => {
    const list = ['ALL', '#'];
    for (let i = 65; i <= 90; i++) {
      list.push(String.fromCharCode(i));
    }
    return list;
  }, []);

  const handleSaveRanking = (gameId: string, ranking: number) => {
    if (onUpdateRanking) {
      onUpdateRanking(gameId, ranking);
    } else if (onUpdateGames) {
      const updated = games.map((g) => (g.id === gameId ? { ...g, ranking } : g));
      onUpdateGames(updated);
    }
  };

  const unrankedCount = useMemo(() => {
    return games.filter((g) => !g.isSlop && (g.ranking === undefined || g.ranking === null)).length;
  }, [games]);

  const slopCount = useMemo(() => {
    return games.filter((g) => !!g.isSlop).length;
  }, [games]);

  const favoritesCount = useMemo(() => {
    return games.filter((g) => !g.isSlop && !!g.isFavorite).length;
  }, [games]);

  // Letter count mapping for hover tooltips
  const letterCounts = useMemo(() => {
    const counts = new Map<string, number>();
    counts.set('ALL', 0);
    counts.set('#', 0);

    for (let i = 65; i <= 90; i++) {
      counts.set(String.fromCharCode(i), 0);
    }

    games.forEach((g) => {
      const isTarget = filterType === 'slop' ? !!g.isSlop : !g.isSlop;
      if (!isTarget) return;
      if (filterType === 'favorites' && !g.isFavorite) return;

      if (selectedGenre !== 'all' && selectedGenre !== 'All Genres') {
        const cat = (g.category || g.genre || 'Arcade').toLowerCase();
        if (cat !== selectedGenre.toLowerCase()) return;
      }

      counts.set('ALL', (counts.get('ALL') || 0) + 1);
      const first = g.title.trim()[0]?.toUpperCase() || '';
      if (/^[A-Z]$/.test(first)) {
        counts.set(first, (counts.get(first) || 0) + 1);
      } else {
        counts.set('#', (counts.get('#') || 0) + 1);
      }
    });

    return counts;
  }, [games, filterType, selectedGenre]);

  // Reset visibleCount whenever search, filter, genre, or letter changes
  useEffect(() => {
    setVisibleCount(60);
  }, [search, filterType, selectedLetter, selectedGenre]);

  const filteredGames = useMemo(() => {
    let list = games.filter((game) => {
      // 1. Slop Isolation Rule
      if (filterType === 'slop') {
        if (!game.isSlop) return false;
      } else {
        if (game.isSlop) return false;
      }

      // 2. Favorites Filter
      if (filterType === 'favorites') {
        if (!game.isFavorite) return false;
      }

      // 3. Genre Filter
      if (selectedGenre !== 'all' && selectedGenre !== 'All Genres') {
        const cat = (game.category || game.genre || 'Arcade').toLowerCase();
        if (cat !== selectedGenre.toLowerCase()) {
          return false;
        }
      }

      // 3. Smart Search Query (Handles spaces, symbols, acronyms like 'moto x3m' matching 'motox3m', 'fnaf', roman numerals, tokens)
      const query = search.trim();
      if (query) {
        if (!matchesSearchQuery(game, query)) {
          return false;
        }
      }

      // 4. Letter Filter (applied when search is empty)
      if (selectedLetter !== 'ALL') {
        const first = game.title.trim()[0]?.toUpperCase() || '';
        if (selectedLetter === '#') {
          if (/^[A-Z]$/.test(first)) return false;
        } else {
          if (first !== selectedLetter) return false;
        }
      }

      return true;
    });

    if (search.trim()) {
      const q = search.trim();
      list.sort((a, b) => {
        const scoreB = getSearchScore(b, q);
        const scoreA = getSearchScore(a, q);
        if (scoreB !== scoreA) return scoreB - scoreA;
        return a.title.localeCompare(b.title, undefined, { numeric: true, sensitivity: 'base' });
      });
    } else if (isVoteMode) {
      list.sort((a, b) => {
        const aUnranked = a.ranking === undefined || a.ranking === null;
        const bUnranked = b.ranking === undefined || b.ranking === null;

        if (aUnranked && !bUnranked) return -1;
        if (!aUnranked && bUnranked) return 1;
        if (aUnranked && bUnranked) {
          return a.title.localeCompare(b.title, undefined, { numeric: true, sensitivity: 'base' });
        }

        return (b.ranking || 0) - (a.ranking || 0);
      });
    } else if (filterType === 'popular') {
      list.sort((a, b) => {
        const aScore = a.ranking ?? -1;
        const bScore = b.ranking ?? -1;
        if (bScore !== aScore) return bScore - aScore;
        return (b.playCount || 0) - (a.playCount || 0);
      });
    } else {
      list.sort((a, b) =>
        a.title.localeCompare(b.title, undefined, { numeric: true, sensitivity: 'base' })
      );
    }

    return list;
  }, [games, search, filterType, selectedLetter, selectedGenre, isVoteMode]);

  // When a specific letter is picked (#, A-Z), display ALL games for that letter without limits!
  // When browsing ALL (or when list > 100), progressively reveal to keep browser smooth.
  const displayedGames = useMemo(() => {
    if (selectedLetter !== 'ALL' && !search) {
      return filteredGames;
    }
    return filteredGames.slice(0, visibleCount);
  }, [filteredGames, selectedLetter, search, visibleCount]);

  const hasMore = displayedGames.length < filteredGames.length;

  return (
    <div className="max-w-7xl mx-auto px-6 py-6 space-y-6">
      {/* Top Header & Integrated Filter Bar */}
      <div className="flex flex-col gap-4 pb-4 border-b border-slate-800/80">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-2.5">
              <span>Frosty Archive</span>
              {isVoteMode && (
                <span className="px-2 py-0.5 rounded-full bg-blue-950/80 border border-cyan-500/40 text-[11px] font-semibold text-cyan-300 flex items-center gap-1">
                  <ListOrdered className="w-3 h-3 text-cyan-400" />
                  <span>Vote Mode ({unrankedCount} unranked)</span>
                </span>
              )}
              {filterType === 'slop' && (
                <span className="px-2 py-0.5 rounded-full bg-amber-950/80 border border-amber-600/40 text-[11px] font-semibold text-amber-300 flex items-center gap-1">
                  <Trash2 className="w-3 h-3 text-amber-400" />
                  <span>Slop Vault ({slopCount})</span>
                </span>
              )}
            </h1>
            <p className="text-xs text-slate-400 mt-0.5">
              {games.length - slopCount} Main Games
              {slopCount > 0 && ` · ${slopCount} in Slop Vault`}
              {selectedLetter !== 'ALL' && !search && (
                <span className="text-cyan-400 font-semibold">
                  {' '}· Letter '{selectedLetter}' ({filteredGames.length} games)
                </span>
              )}
            </p>
          </div>

          {/* Clean Unified Category Tabs */}
          <div
            className="flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-xl overflow-x-auto max-w-full shrink-0"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            <button
              onClick={() => {
                sound.playKeypress();
                onSelectFilterType('all');
              }}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer shrink-0 ${
                filterType === 'all'
                  ? 'bg-slate-800 text-cyan-300 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              All (A-Z)
            </button>

            <button
              onClick={() => {
                sound.playKeypress();
                onSelectFilterType('popular');
              }}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer shrink-0 ${
                filterType === 'popular'
                  ? 'bg-slate-800 text-cyan-300 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Popular / Ranked
            </button>

            <button
              onClick={() => {
                sound.playKeypress();
                onSelectFilterType('favorites');
              }}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer shrink-0 flex items-center gap-1.5 ${
                filterType === 'favorites'
                  ? 'bg-slate-800 text-amber-300 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <span>Favorites</span>
              {favoritesCount > 0 && (
                <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-amber-950 text-amber-300 border border-amber-800/40">
                  {favoritesCount}
                </span>
              )}
            </button>

            {/* Slop Games Tab right next to Favorites */}
            <button
              onClick={() => {
                sound.playKeypress();
                onSelectFilterType('slop');
              }}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer shrink-0 flex items-center gap-1.5 ${
                filterType === 'slop'
                  ? 'bg-amber-950/80 text-amber-300 border border-amber-700/60 shadow-sm'
                  : 'text-slate-400 hover:text-amber-300'
              }`}
              title="View and play isolated slop games"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Slop Vault</span>
              {slopCount > 0 && (
                <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-amber-950 text-amber-300 border border-amber-800/60">
                  {slopCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Search Bar + Genre Selector + Result Counter */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
          <div className="flex items-center gap-2 flex-1 max-w-2xl">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                placeholder="Search across all games by title, file, or engine..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-slate-900/80 border border-slate-800 rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500/50"
              />
            </div>

            {/* Genre Dropdown right next to search */}
            <div className="relative shrink-0">
              <select
                value={selectedGenre}
                onChange={(e) => {
                  sound.playKeypress();
                  setSelectedGenre(e.target.value);
                }}
                className="bg-slate-900/90 border border-slate-800 hover:border-cyan-500/50 rounded-xl pl-3 pr-8 py-2 text-xs font-semibold text-cyan-300 focus:outline-none focus:border-cyan-500/60 cursor-pointer appearance-none transition-colors"
                title="Filter by Genre"
              >
                {availableGenres.map((genre) => (
                  <option key={genre} value={genre === 'All Genres' ? 'all' : genre} className="bg-slate-900 text-slate-200">
                    {genre === 'All Genres' ? '🎮 All Genres' : `🎯 ${genre}`}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 absolute right-2.5 top-1/2 -translate-y-1/2 text-cyan-400 pointer-events-none" />
            </div>
          </div>

          <div className="text-xs text-slate-400 font-medium">
            Showing <strong className="text-cyan-300 font-bold">{displayedGames.length}</strong> of{' '}
            <strong className="text-slate-200">{filteredGames.length}</strong> games
          </div>
        </div>

        {/* Minimalist Alphabet Ribbon (Uncluttered, clean typography, hover counters) */}
        {!search && (
          <div className="pt-2">
            <div
              className="flex items-center gap-1 overflow-x-auto pb-1 select-none"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {alphabet.map((letter) => {
                const count = letterCounts.get(letter) || 0;
                const isSelected = selectedLetter === letter;
                return (
                  <button
                    key={letter}
                    onClick={() => {
                      sound.playKeypress();
                      setSelectedLetter(letter);
                    }}
                    disabled={count === 0 && letter !== 'ALL'}
                    className={`px-2.5 py-1 text-xs font-mono font-bold rounded-lg shrink-0 transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-cyan-500 text-slate-950 shadow-sm'
                        : count > 0
                        ? 'text-slate-400 hover:text-white hover:bg-slate-800/80'
                        : 'text-slate-600 opacity-30 cursor-not-allowed'
                    }`}
                    title={
                      letter === 'ALL'
                        ? `All Games (${count})`
                        : `${letter}: ${count} games available`
                    }
                  >
                    {letter}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Grid of Games */}
      {displayedGames.length === 0 ? (
        <div className="text-center py-16 bg-slate-900/30 border border-slate-800 rounded-2xl p-8 space-y-4 max-w-md mx-auto">
          <p className="text-slate-200 text-sm font-semibold">
            {filterType === 'slop' ? 'Slop Vault is Empty' : 'No Games Found'}
          </p>
          <p className="text-slate-400 text-xs leading-relaxed">
            {filterType === 'slop'
              ? 'No games are currently isolated in the slop vault.'
              : search
              ? `No games matched "${search}".`
              : `No games found under "${selectedLetter}".`}
          </p>
          {(search || selectedLetter !== 'ALL') && (
            <button
              onClick={() => {
                sound.playKeypress();
                setSearch('');
                setSelectedLetter('ALL');
              }}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl transition-all cursor-pointer"
            >
              Reset Search & Filter
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {displayedGames.map((game) => {
            return (
              <div
                key={game.id}
                className="group relative bg-slate-900/80 border border-slate-800/90 hover:border-cyan-500/50 rounded-xl overflow-hidden shadow-md transition-all duration-150 flex flex-col justify-between"
              >
                {/* Pure CSS Dark Blue Minimalist Cover */}
                <div className="relative aspect-4/3 w-full bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 flex flex-col justify-between p-4 select-none overflow-hidden border-b border-slate-800/80">
                  {/* Top Bar: Engine Badge & Favorite/Restore Button */}
                  <div className="flex items-center justify-between relative z-30 pointer-events-auto">
                    <div className="flex items-center gap-1.5">
                      <span className="px-2 py-0.5 rounded bg-blue-950/90 border border-cyan-500/30 text-[10px] font-bold text-cyan-300 uppercase tracking-wider shadow-xs">
                        {game.type === 'swf' ? 'FLASH' : game.detectedEngine || 'HTML5'}
                      </span>
                      {game.isSlop && (
                        <span className="px-1.5 py-0.5 rounded bg-amber-950/90 border border-amber-600/40 text-[9px] font-bold text-amber-300 uppercase tracking-wider">
                          SLOP
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-1">
                      {/* Restore Button when in Slop Vault */}
                      {game.isSlop && onToggleSlop && (
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            sound.playUnlock();
                            onToggleSlop(game.id);
                          }}
                          className="p-1.5 rounded-lg bg-slate-950/90 hover:bg-emerald-950 border border-slate-700/80 hover:border-emerald-700 text-slate-400 hover:text-emerald-300 transition-all cursor-pointer shadow-md"
                          title="Restore to Main Library"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                        </button>
                      )}

                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          sound.playKeypress();
                          onToggleFavorite(game.id);
                        }}
                        className="p-1.5 rounded-lg bg-slate-950/90 hover:bg-slate-800 border border-slate-700/80 text-slate-400 hover:text-amber-400 active:scale-95 transition-all cursor-pointer shadow-md"
                        title={game.isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
                      >
                        <Star
                          className={`w-4 h-4 ${
                            game.isFavorite ? 'text-amber-400 fill-amber-400' : ''
                          }`}
                        />
                      </button>

                      {/* Developer Mode Delete Button */}
                      {isDevMode && onDeleteGame && (
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            sound.playTrash();
                            if (window.confirm(`Developer Action: Delete "${game.title}" permanently?`)) {
                              onDeleteGame(game.id);
                            }
                          }}
                          className="p-1.5 rounded-lg bg-rose-950/80 hover:bg-rose-900 border border-rose-800/80 text-rose-300 hover:text-white active:scale-95 transition-all cursor-pointer shadow-md"
                          title="Developer Delete: Remove game permanently"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Centered Game Title Plaque */}
                  <div className="text-center my-auto px-2 relative z-10 pointer-events-none">
                    <h4 className="text-lg font-bold text-white tracking-tight line-clamp-2 drop-shadow-sm group-hover:text-cyan-300 transition-colors">
                      {game.title}
                    </h4>
                    {(() => {
                      const cat = normalizeGenre(game.category || game.genre);
                      const GenreIcon = getGenreIcon(cat);
                      return (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedGenre(cat);
                          }}
                          className="inline-flex items-center gap-1 mt-1.5 px-2 py-0.5 rounded-md bg-cyan-950/40 border border-cyan-800/40 text-[10px] font-semibold text-cyan-300 hover:text-cyan-100 hover:border-cyan-500/60 uppercase tracking-wider pointer-events-auto cursor-pointer transition-all shadow-xs"
                          title={`Filter by genre: ${cat}`}
                        >
                          <GenreIcon className="w-3 h-3 text-cyan-400" />
                          <span>{cat}</span>
                        </button>
                      );
                    })()}
                  </div>

                  {/* Bottom Stats: File Size | Detailed Ranking (0.0-10.0) | Health */}
                  <div className="flex items-center justify-between text-[10px] text-slate-400 font-medium z-30 pointer-events-auto border-t border-slate-800/60 pt-2 gap-1.5 relative">
                    <span className="shrink-0">{(game.fileSize / 1024).toFixed(0)} KB</span>

                    <div className="flex items-center justify-center shrink-0">
                      <RankingInput
                        gameId={game.id}
                        currentRanking={game.ranking}
                        isVoteMode={isVoteMode}
                        onSave={(score) => handleSaveRanking(game.id, score)}
                      />
                    </div>

                    <span
                      className="text-emerald-400 cursor-help shrink-0"
                      title="Health Score"
                    >
                      Health {game.healthScore || 100}%
                    </span>
                  </div>

                  {/* Play Overlay */}
                  {!isVoteMode && (
                    <button
                      onClick={() => {
                        sound.playKeypress();
                        onPlayGame(game);
                      }}
                      className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity backdrop-blur-xs cursor-pointer z-20"
                    >
                      <div className="w-12 h-12 rounded-full bg-cyan-400 text-slate-950 flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                        <Play className="w-5 h-5 fill-current ml-0.5" />
                      </div>
                    </button>
                  )}
                </div>

                {/* Card Bottom Controls */}
                <div className="p-3 bg-slate-900/60 flex items-center justify-between">
                  <span className="text-xs text-slate-400 truncate max-w-[190px]" title={game.title}>
                    {game.title}
                  </span>
                  {!isVoteMode ? (
                    <button
                      onClick={() => {
                        sound.playKeypress();
                        onPlayGame(game);
                      }}
                      className="px-3 py-1 text-xs font-semibold text-cyan-300 hover:text-cyan-200 bg-cyan-950/60 hover:bg-cyan-900/70 rounded-md border border-cyan-800/40 transition-colors cursor-pointer"
                    >
                      Play
                    </button>
                  ) : (
                    <span className="px-2.5 py-0.5 text-[11px] font-bold text-cyan-300 bg-blue-950/60 rounded border border-cyan-800/50">
                      {game.ranking !== undefined && game.ranking !== null
                        ? `★ ${game.ranking.toFixed(1)}`
                        : 'Unranked'}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Progressive Load More (Only in ALL / Search when more items exist, ZERO clutter) */}
      {hasMore && (
        <div className="pt-6 flex flex-col items-center justify-center gap-2">
          <button
            onClick={() => {
              sound.playKeypress();
              setVisibleCount((prev) => prev + CHUNK_SIZE);
            }}
            className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-cyan-500/50 text-slate-200 hover:text-cyan-300 text-xs font-bold rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
          >
            <span>Load More Games</span>
            <ChevronDown className="w-4 h-4" />
          </button>
          <div className="text-[11px] text-slate-500">
            Showing {displayedGames.length} of {filteredGames.length} games
          </div>
        </div>
      )}
    </div>
  );
};
