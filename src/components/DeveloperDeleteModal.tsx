/**
 * Developer Delete Tool Modal
 * Allows developers to search, manage, and delete individual games or batches.
 * Saves changes immediately to state, IndexedDB, and Firestore Cloud.
 */

import React, { useState } from 'react';
import { X, Search, Trash2, Check, AlertTriangle } from 'lucide-react';
import { GameItem } from '../types';
import { sound } from '../utils/audio';
import { searchAndSortGames } from '../utils/searchHelper';

interface DeveloperDeleteModalProps {
  games: GameItem[];
  onDeleteGame: (id: string) => void;
  onClose: () => void;
}

export const DeveloperDeleteModal: React.FC<DeveloperDeleteModalProps> = ({
  games,
  onDeleteGame,
  onClose,
}) => {
  const [search, setSearch] = useState('');
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const filteredGames = searchAndSortGames(games, search);

  const handleDelete = (id: string) => {
    sound.playTrash();
    onDeleteGame(id);
    setConfirmDeleteId(null);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-xl shadow-2xl flex flex-col max-h-[85vh] animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-rose-950/80 border border-rose-500/40 flex items-center justify-center text-rose-300">
              <Trash2 className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white tracking-tight">
                Developer Delete Tool
              </h2>
              <p className="text-xs text-slate-400">
                Permanently remove unwanted games from the archive
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              sound.playKeypress();
              onClose();
            }}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Search */}
        <div className="p-4 border-b border-slate-800 bg-slate-950/40">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search games to delete..."
              className="w-full pl-9 pr-4 py-2 bg-slate-900 border border-slate-700/80 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-rose-500/60 transition-colors"
            />
          </div>
        </div>

        {/* Game List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {filteredGames.length === 0 ? (
            <div className="text-center py-12 text-slate-500 text-xs">
              No games found matching "{search}"
            </div>
          ) : (
            filteredGames.map((game) => (
              <div
                key={game.id}
                className="flex items-center justify-between p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 hover:border-slate-700 transition-colors"
              >
                <div className="min-w-0 flex-1 pr-3">
                  <h4 className="text-xs font-semibold text-white truncate">
                    {game.title}
                  </h4>
                  <div className="flex items-center gap-2 text-[10px] text-slate-500 mt-0.5">
                    <span className="uppercase">{game.type}</span>
                    <span>·</span>
                    <span>{(game.fileSize / 1024).toFixed(0)} KB</span>
                    {game.isSlop && (
                      <>
                        <span>·</span>
                        <span className="text-amber-400">Slop Vault</span>
                      </>
                    )}
                  </div>
                </div>

                {confirmDeleteId === game.id ? (
                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={() => setConfirmDeleteId(null)}
                      className="px-2.5 py-1 text-[11px] font-semibold text-slate-400 hover:text-white bg-slate-800 rounded-lg cursor-pointer transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleDelete(game.id)}
                      className="px-2.5 py-1 text-[11px] font-bold text-white bg-rose-600 hover:bg-rose-500 rounded-lg cursor-pointer transition-colors shadow-sm"
                    >
                      Confirm Delete
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      sound.playKeypress();
                      setConfirmDeleteId(game.id);
                    }}
                    className="p-2 text-slate-400 hover:text-rose-400 hover:bg-rose-950/40 rounded-lg border border-transparent hover:border-rose-900/60 transition-colors cursor-pointer"
                    title="Delete game"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-800 bg-slate-950/60 flex items-center justify-between text-xs text-slate-400">
          <span>{filteredGames.length} games available</span>
          <button
            onClick={() => {
              sound.playKeypress();
              onClose();
            }}
            className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-xl transition-colors cursor-pointer text-xs"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
