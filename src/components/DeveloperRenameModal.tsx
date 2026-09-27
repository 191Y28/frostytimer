/**
 * Developer Rename Tool Modal
 * Allows developers to search and rename any game title in the archive.
 * Saves changes to state and persistent IndexedDB.
 */

import React, { useState } from 'react';
import { X, Search, Edit3, Check, Gamepad2 } from 'lucide-react';
import { GameItem } from '../types';
import { sound } from '../utils/audio';
import { searchAndSortGames } from '../utils/searchHelper';

interface DeveloperRenameModalProps {
  games: GameItem[];
  onRenameGame: (id: string, newTitle: string) => void;
  onClose: () => void;
}

export const DeveloperRenameModal: React.FC<DeveloperRenameModalProps> = ({
  games,
  onRenameGame,
  onClose,
}) => {
  const [search, setSearch] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newTitle, setNewTitle] = useState('');
  const [savedId, setSavedId] = useState<string | null>(null);

  const filteredGames = searchAndSortGames(games, search);

  const startEditing = (game: GameItem) => {
    sound.playKeypress();
    setEditingId(game.id);
    setNewTitle(game.title);
  };

  const handleSave = (id: string) => {
    const trimmed = newTitle.trim();
    if (!trimmed) return;
    sound.playUnlock();
    onRenameGame(id, trimmed);
    setEditingId(null);
    setSavedId(id);
    setTimeout(() => setSavedId(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-xl shadow-2xl flex flex-col max-h-[85vh] animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-950/80 border border-cyan-500/40 flex items-center justify-center text-cyan-300">
              <Edit3 className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white tracking-tight">
                Developer Rename Tool
              </h2>
              <p className="text-xs text-slate-400">
                Rename games in the persistent archive
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              sound.playKeypress();
              onClose();
            }}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Search */}
        <div className="p-4 border-b border-slate-800/80">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Search games to rename..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500/50"
            />
          </div>
        </div>

        {/* Games List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2.5">
          {filteredGames.length === 0 ? (
            <div className="text-center py-12 text-slate-500 text-xs">
              No games found matching your search.
            </div>
          ) : (
            filteredGames.map((game) => {
              const isEditing = editingId === game.id;
              const isJustSaved = savedId === game.id;

              return (
                <div
                  key={game.id}
                  className="p-3 bg-slate-950/60 border border-slate-800/80 rounded-xl flex items-center justify-between gap-3 hover:border-slate-700/60 transition-colors"
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center shrink-0 text-slate-400">
                      <Gamepad2 className="w-4 h-4" />
                    </div>

                    {isEditing ? (
                      <input
                        type="text"
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') handleSave(game.id);
                          if (e.key === 'Escape') setEditingId(null);
                        }}
                        autoFocus
                        className="flex-1 px-2.5 py-1.5 bg-slate-900 border border-cyan-500/60 rounded-lg text-xs font-semibold text-white focus:outline-none"
                      />
                    ) : (
                      <div className="truncate flex-1">
                        <span className="text-xs font-semibold text-white truncate block">
                          {game.title}
                        </span>
                        <span className="text-[10px] text-slate-500 uppercase tracking-wider">
                          {game.type} · {(game.fileSize / 1024).toFixed(0)} KB
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {isJustSaved && (
                      <span className="text-[10px] font-semibold text-emerald-400 flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" /> Saved
                      </span>
                    )}

                    {isEditing ? (
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => handleSave(game.id)}
                          className="px-3 py-1 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs rounded-lg transition-colors cursor-pointer"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditingId(null)}
                          className="px-2.5 py-1 text-slate-400 hover:text-slate-200 text-xs rounded-lg transition-colors cursor-pointer"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => startEditing(game)}
                        className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-lg border border-slate-700 transition-colors flex items-center gap-1.5 cursor-pointer"
                      >
                        <Edit3 className="w-3.5 h-3.5 text-cyan-400" />
                        <span>Rename</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-500">
          <span>{games.length} games in archive</span>
          <button
            onClick={() => {
              sound.playKeypress();
              onClose();
            }}
            className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium rounded-lg transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
