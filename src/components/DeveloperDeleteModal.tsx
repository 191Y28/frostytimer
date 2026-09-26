/**
 * Developer Delete Tool Modal
 * Allows developers to safely delete games from the archive.
 * ALWAYS requires explicit user confirmation before permanent deletion.
 */

import React, { useState } from 'react';
import { X, Search, Trash2, AlertTriangle, Gamepad2, ShieldAlert } from 'lucide-react';
import { GameItem } from '../types';
import { sound } from '../utils/audio';

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
  const [confirmingGame, setConfirmingGame] = useState<GameItem | null>(null);

  const filteredGames = games.filter((game) =>
    game.title.toLowerCase().includes(search.toLowerCase())
  );

  const handlePromptDelete = (game: GameItem) => {
    sound.playKeypress();
    setConfirmingGame(game);
  };

  const handleConfirmDelete = () => {
    if (!confirmingGame) return;
    sound.playLock();
    onDeleteGame(confirmingGame.id);
    setConfirmingGame(null);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-xl shadow-2xl flex flex-col max-h-[85vh] animate-in fade-in zoom-in-95 duration-150 relative">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-rose-950/80 border border-rose-500/40 flex items-center justify-center text-rose-400">
              <Trash2 className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white tracking-tight">
                Developer Delete Tool
              </h2>
              <p className="text-xs text-slate-400">
                Permanently purge games from the archive
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
              placeholder="Search games to delete..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-rose-500/50"
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
            filteredGames.map((game) => (
              <div
                key={game.id}
                className="p-3 bg-slate-950/60 border border-slate-800/80 rounded-xl flex items-center justify-between gap-3 hover:border-rose-900/40 transition-colors"
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center shrink-0 text-slate-400">
                    <Gamepad2 className="w-4 h-4" />
                  </div>
                  <div className="truncate flex-1">
                    <span className="text-xs font-semibold text-white truncate block">
                      {game.title}
                    </span>
                    <span className="text-[10px] text-slate-500 uppercase tracking-wider">
                      {game.type} · {(game.fileSize / 1024).toFixed(0)} KB
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => handlePromptDelete(game)}
                  className="px-3 py-1.5 bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 hover:text-white text-xs font-medium rounded-lg border border-rose-800/40 hover:border-rose-600 transition-colors flex items-center gap-1.5 cursor-pointer shrink-0"
                >
                  <Trash2 className="w-3.5 h-3.5 text-rose-400" />
                  <span>Delete</span>
                </button>
              </div>
            ))
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

        {/* Confirmation Modal Overlay */}
        {confirmingGame && (
          <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-md rounded-2xl flex items-center justify-center p-6 z-20 animate-in fade-in zoom-in-95 duration-100">
            <div className="bg-slate-900 border border-rose-800/60 rounded-xl p-6 max-w-sm w-full text-center shadow-2xl">
              <div className="w-12 h-12 rounded-full bg-rose-950 border border-rose-500/40 text-rose-400 flex items-center justify-center mx-auto mb-3">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white mb-1">
                Confirm Game Deletion
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-1">
                Are you sure you want to permanently delete:
              </p>
              <div className="text-sm font-bold text-rose-300 bg-rose-950/40 border border-rose-900/60 rounded-lg py-2 px-3 my-2 truncate">
                {confirmingGame.title}
              </div>
              <p className="text-[11px] text-slate-400 mb-5">
                This action is permanent and cannot be undone.
              </p>

              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={() => setConfirmingGame(null)}
                  className="px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmDelete}
                  className="px-4 py-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-500 rounded-lg shadow-lg shadow-rose-600/20 transition-all cursor-pointer"
                >
                  Confirm Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
