/**
 * Games View - Hub of Unblocked Retro & Uploaded Games
 * Detailed Ranking & Voting System (0.000 to 10.000), Pure CSS cards, Anti-slop UX.
 */

import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Search, Star, Play, ListOrdered } from 'lucide-react';
import { GameItem } from '../types';
import { sound } from '../utils/audio';

interface GamesViewProps {
  games: GameItem[];
  onPlayGame: (game: GameItem) => void;
  onDeleteGame: (id: string) => void;
  onToggleFavorite: (id: string) => void;
  onOpenUpload: () => void;
  onUpdateGames?: (updatedGames: GameItem[]) => void;
  onUpdateRanking?: (id: string, ranking: number) => void;
  isVoteMode: boolean;
  filterType: 'all' | 'popular' | 'favorites';
  onSelectFilterType: (tab: 'all' | 'popular' | 'favorites') => void;
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
      ? currentRanking.toFixed(3)
      : ''
  );
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setInputValue(
      currentRanking !== undefined && currentRanking !== null
        ? currentRanking.toFixed(3)
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
      // Clamp between 0.000 and 10.000, rounded to 3 decimal places
      const clamped = Math.min(10, Math.max(0, num));
      const rounded = Math.round(clamped * 1000) / 1000;
      onSave(rounded);
      setInputValue(rounded.toFixed(3));
      sound.playUnlock();
    }
    setIsEditing(false);
  };

  // When NOT in Vote Mode: Purely Read-Only (Cannot edit or click to vote without Vote Mode)
  if (!isVoteMode) {
    if (currentRanking !== undefined && currentRanking !== null) {
      return (
        <span
          title="Ranking score (Enable Vote Mode from header to edit)"
          className="px-2 py-0.5 rounded bg-blue-950/60 border border-blue-800/40 text-[10px] font-semibold text-cyan-300 flex items-center gap-1 shadow-xs select-none"
        >
          <span className="text-cyan-400 font-bold">★</span>
          <span>{currentRanking.toFixed(3)}</span>
          <span className="text-[9px] text-cyan-400/60 font-medium">/10</span>
        </span>
      );
    }
    return (
      <span
        title="Unranked (Enable Vote Mode from header to vote)"
        className="px-2 py-0.5 rounded bg-slate-900/60 border border-slate-800 text-[9px] font-medium text-slate-500 select-none"
      >
        Unranked
      </span>
    );
  }

  // IN VOTE MODE: Editable inputs with sleek Blue/Cyan Styling
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
          placeholder="0-10.000"
          autoFocus={isEditing}
          onChange={(e) => {
            const v = e.target.value;
            // Allow numbers, single dot, and up to 3 decimal digits
            if (/^(\d{0,2}(\.\d{0,3})?)?$/.test(v)) {
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
                  ? currentRanking.toFixed(3)
                  : ''
              );
            }
          }}
          onBlur={() => commitValue(inputValue)}
          className="w-13 bg-transparent text-[10px] font-mono font-bold text-cyan-200 focus:outline-none text-center"
        />
        <span className="text-[9px] text-slate-500 font-semibold select-none">/10</span>
      </div>
    );
  }

  // Display ranked score in Vote Mode (click to edit)
  if (currentRanking !== undefined && currentRanking !== null) {
    return (
      <button
        onClick={(e) => {
          e.stopPropagation();
          sound.playKeypress();
          setIsEditing(true);
        }}
        title="Click to edit ranking (0.000 to 10.000)"
        className="px-2 py-0.5 rounded bg-blue-950/90 border border-cyan-500/50 text-[10px] font-bold text-cyan-300 flex items-center gap-1 hover:border-cyan-400 hover:bg-blue-900/80 transition-all cursor-pointer shadow-xs"
      >
        <span className="text-cyan-400 font-bold">★</span>
        <span>{currentRanking.toFixed(3)}</span>
        <span className="text-[9px] text-cyan-400/60 font-medium">/10</span>
      </button>
    );
  }

  // Display unranked 'Vote' pill in Vote Mode (click to score)
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        sound.playKeypress();
        setIsEditing(true);
      }}
      title="Click to vote/rank this game (0.000 to 10.000)"
      className="px-2 py-0.5 rounded bg-blue-950/80 border border-cyan-600/50 text-[9px] font-bold text-cyan-300 hover:text-white hover:border-cyan-400 hover:bg-blue-900/90 flex items-center gap-1 transition-all cursor-pointer shadow-xs"
    >
      <span className="text-cyan-400 font-bold">★</span>
      <span>VOTE</span>
    </button>
  );
};

export const GamesView: React.FC<GamesViewProps> = ({
  games,
  onPlayGame,
  onDeleteGame,
  onToggleFavorite,
  onOpenUpload,
  onUpdateGames,
  onUpdateRanking,
  isVoteMode,
  filterType,
  onSelectFilterType,
}) => {
  const [search, setSearch] = useState('');

  const handleSaveRanking = (gameId: string, ranking: number) => {
    if (onUpdateRanking) {
      onUpdateRanking(gameId, ranking);
    } else if (onUpdateGames) {
      const updated = games.map((g) => (g.id === gameId ? { ...g, ranking } : g));
      onUpdateGames(updated);
    }
  };

  const unrankedCount = useMemo(() => {
    return games.filter((g) => g.ranking === undefined || g.ranking === null).length;
  }, [games]);

  const filteredGames = useMemo(() => {
    let list = games.filter((game) => {
      const matchSearch =
        game.title.toLowerCase().includes(search.toLowerCase()) ||
        (game.description && game.description.toLowerCase().includes(search.toLowerCase()));

      if (!matchSearch) return false;

      if (filterType === 'favorites') return !!game.isFavorite;

      return true;
    });

    if (isVoteMode) {
      // In VOTE MODE:
      // ALL UNRANKED GAMES ARE ALWAYS AT THE VERY TOP!
      // Once you give a number, it automatically moves down into the sorted ranked list.
      list.sort((a, b) => {
        const aUnranked = a.ranking === undefined || a.ranking === null;
        const bUnranked = b.ranking === undefined || b.ranking === null;

        if (aUnranked && !bUnranked) return -1;
        if (!aUnranked && bUnranked) return 1;
        if (aUnranked && bUnranked) return a.title.localeCompare(b.title);

        // Ranked games sorted descending (10.000 -> 0.000)
        return (b.ranking || 0) - (a.ranking || 0);
      });
    } else if (filterType === 'popular') {
      // Popular filter: highest ranked games first (10.000 -> 0.000), then play count
      list.sort((a, b) => {
        const aScore = a.ranking ?? -1;
        const bScore = b.ranking ?? -1;
        if (bScore !== aScore) return bScore - aScore;
        return (b.playCount || 0) - (a.playCount || 0);
      });
    } else {
      // All tab: clean alphabetical sort A-Z
      list.sort((a, b) => a.title.localeCompare(b.title));
    }

    return list;
  }, [games, search, filterType, isVoteMode]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      {/* Top Hero Showcase / Stats */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white mb-2 flex items-center gap-3">
              <span>Frosty Archive</span>
              {isVoteMode && (
                <span className="px-2.5 py-0.5 rounded-full bg-blue-950/80 border border-cyan-500/40 text-xs font-semibold text-cyan-300 flex items-center gap-1.5">
                  <ListOrdered className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Vote Mode ({unrankedCount} unranked on top)</span>
                </span>
              )}
            </h1>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span>{games.length} Games Indexed</span>
              <span aria-hidden="true">·</span>
              <span>Detailed 0.000 - 10.000 Rankings</span>
              <span aria-hidden="true">·</span>
              <span>Filter-Bypassing Blob Emulation</span>
            </div>
          </div>

          {/* Clean 3 Filter Tabs: All (Alphabetical), Popular, Favorites */}
          <div className="flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-lg">
            {(['all', 'popular', 'favorites'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  sound.playKeypress();
                  onSelectFilterType(tab);
                }}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-md capitalize transition-colors cursor-pointer ${
                  filterType === tab
                    ? 'bg-slate-800 text-cyan-300 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {tab === 'all' ? 'All (A-Z)' : tab === 'popular' ? 'Popular / Top Ranked' : 'Favorites'}
              </button>
            ))}
          </div>
        </div>

        {/* Clean Search Bar */}
        <div className="mt-6 flex items-center justify-between gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Search games by title, engine, or category..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-900/80 border border-slate-800 rounded-xl text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500/50"
            />
          </div>

          <div className="text-xs text-slate-400 font-medium">
            Showing <span className="text-cyan-300 font-bold">{filteredGames.length}</span> of {games.length} games
          </div>
        </div>
      </div>

      {/* Grid of Games */}
      {filteredGames.length === 0 ? (
        <div className="text-center py-16 bg-slate-900/40 border border-slate-800 rounded-2xl p-8">
          <p className="text-slate-400 text-sm font-medium">No games found matching your filter.</p>
          <button
            onClick={() => {
              setSearch('');
              onSelectFilterType('all');
            }}
            className="mt-3 text-xs text-cyan-400 hover:underline font-semibold"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {filteredGames.map((game) => {
            return (
              <div
                key={game.id}
                className="group relative bg-slate-900/80 border border-slate-800/90 hover:border-cyan-500/50 rounded-xl overflow-hidden shadow-md transition-all duration-150 flex flex-col justify-between"
              >
                {/* Pure CSS Dark Blue Minimalist Cover */}
                <div className="relative aspect-4/3 w-full bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 flex flex-col justify-between p-4 select-none overflow-hidden border-b border-slate-800/80">
                  <div className="flex items-center justify-between z-10">
                    <span className="px-2 py-0.5 rounded bg-blue-950/90 border border-cyan-500/30 text-[10px] font-bold text-cyan-300 uppercase tracking-wider">
                      {game.type === 'swf' ? 'FLASH' : game.detectedEngine || 'HTML5'}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        sound.playKeypress();
                        onToggleFavorite(game.id);
                      }}
                      className="p-1.5 rounded-lg bg-slate-950/80 border border-slate-800 text-slate-400 hover:text-amber-400 transition-colors cursor-pointer"
                      title="Favorite"
                    >
                      <Star
                        className={`w-3.5 h-3.5 ${
                          game.isFavorite ? 'text-amber-400 fill-amber-400' : ''
                        }`}
                      />
                    </button>
                  </div>

                  {/* Centered Game Title Plaque */}
                  <div className="text-center my-auto px-2 z-10">
                    <h4 className="text-lg font-bold text-white tracking-tight line-clamp-2 drop-shadow-sm group-hover:text-cyan-300 transition-colors">
                      {game.title}
                    </h4>
                    <span className="inline-block mt-1 text-[11px] font-semibold text-cyan-400/80 uppercase tracking-widest">
                      {game.category || 'Arcade'}
                    </span>
                  </div>

                  {/* Bottom Stats: 1 KB | Detailed Ranking (0-10.000) | Health 100% */}
                  <div className="flex items-center justify-between text-[10px] text-slate-400 font-medium z-30 pointer-events-auto border-t border-slate-800/60 pt-2 gap-1.5 relative">
                    <span className="shrink-0">{(game.fileSize / 1024).toFixed(0)} KB</span>

                    {/* RIGHT SMACK IN THE MIDDLE: Detailed Ranking 0.000 to 10.000 */}
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
                      title="Health Score: Verifies script safety, no external redirect crashes, and preserved engine loops."
                    >
                      Health {game.healthScore || 100}%
                    </span>
                  </div>

                  {/* Play Overlay - Completely disabled and removed in Vote Mode */}
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
                  <span className="text-xs text-slate-400 truncate max-w-[190px]">
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
                        ? `★ ${game.ranking.toFixed(3)}`
                        : 'Unranked'}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
