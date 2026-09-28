/**
 * Archive Backup & Restore
 * Exports and imports the complete game library to a .frosty JSON file.
 * Portable across machines, school devices, and GitHub Pages deployments.
 */

import React, { useRef, useState } from 'react';
import { X, Download, Upload, HardDrive, Check, AlertCircle } from 'lucide-react';
import { GameItem } from '../types';
import { getAllGamesFromDB, saveMultipleGamesToDB } from '../utils/indexedDB';
import { saveMultipleGamesToFirestore } from '../utils/firebaseStorage';
import { sanitizeAndRepairHtml, normalizeGenre } from '../utils/eliteCodeSanitizer';
import { sound } from '../utils/audio';

interface ArchiveBackupModalProps {
  onClose: () => void;
  onRefreshGames: () => void;
}

export const ArchiveBackupModal: React.FC<ArchiveBackupModalProps> = ({ onClose, onRefreshGames }) => {
  const [statusMsg, setStatusMsg] = useState<string | null>(null);
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [isImporting, setIsImporting] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExport = async () => {
    sound.playKeypress();
    setIsExporting(true);
    setStatusMsg(null);

    try {
      const games = await getAllGamesFromDB();
      const exportPayload = {
        version: 1,
        exportedAt: Date.now(),
        app: 'Frosty Arcades',
        games,
      };

      const blob = new Blob([JSON.stringify(exportPayload, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `frosty-archive-backup-${new Date().toISOString().slice(0, 10)}.frosty.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      sound.playUnlock();
      setStatusMsg(`Successfully exported ${games.length} games to backup file.`);
    } catch {
      setStatusMsg('Failed to export games.');
    }

    setIsExporting(false);
  };

  const handleCustomFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    sound.playKeypress();
    setIsImporting(true);
    setStatusMsg('Processing local JSON backup and sanitizing games...');

    const reader = new FileReader();
    reader.onload = async (evt) => {
      try {
        const text = evt.target?.result as string;
        const parsed = JSON.parse(text);

        const rawList: any[] = Array.isArray(parsed)
          ? parsed
          : Array.isArray(parsed.games)
          ? parsed.games
          : Array.isArray(parsed.data)
          ? parsed.data
          : [];

        if (rawList.length > 0) {
          const sanitizedGames: GameItem[] = rawList.map((g, idx) => {
            let code = g.codeOrData || g.code || g.html || '';
            if (code && typeof code === 'string' && code.length > 20) {
              const { repairedHtml } = sanitizeAndRepairHtml(code);
              code = repairedHtml;
            }

            const category = normalizeGenre(g.category || g.genre);

            return {
              id: g.id || `imported_${Date.now()}_${idx}`,
              title: g.title || g.name || `Game ${idx + 1}`,
              type: g.type || 'html',
              coverTheme: g.coverTheme || 'aurora',
              category,
              genre: category,
              ranking: typeof g.ranking === 'number' ? g.ranking : 9.0,
              healthScore: typeof g.healthScore === 'number' ? g.healthScore : 100,
              fileSize: g.fileSize || (code ? new Blob([code]).size : 1024 * 50),
              addedAt: g.addedAt || Date.now() - idx * 1000,
              isFavorite: !!g.isFavorite,
              isSlop: !!g.isSlop,
              codeOrData: code,
              driveUrl: g.driveUrl || g.url || '',
              detectedEngine: g.detectedEngine || 'HTML5 Engine',
              isEliteProtected: true,
            };
          });

          // Save locally to IndexedDB
          await saveMultipleGamesToDB(sanitizedGames);

          // Sync directly to Firebase Firestore Cloud
          setStatusMsg(`Syncing ${sanitizedGames.length} games to Firebase Firestore...`);
          await saveMultipleGamesToFirestore(sanitizedGames);

          sound.playUnlock();
          setStatusMsg(`Successfully restored and synced ${sanitizedGames.length} games!`);
          onRefreshGames();
        } else {
          setStatusMsg('Invalid JSON format.');
        }
      } catch (err) {
        console.error('Custom file import error:', err);
        setStatusMsg('Error parsing JSON backup file.');
      }
      setIsImporting(false);
    };

    reader.readAsText(file);
  };

  const handleImportBuiltInCatalog = async () => {
    sound.playKeypress();
    setIsImporting(true);
    setStatusMsg('Fetching built-in 2,368 game master catalog...');

    try {
      const response = await fetch('./frosty-archive-backup-2026-09-28.frosty.json');
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const text = await response.text();
      const parsed = JSON.parse(text);

      const rawList: any[] = Array.isArray(parsed)
        ? parsed
        : Array.isArray(parsed.games)
        ? parsed.games
        : Array.isArray(parsed.data)
        ? parsed.data
        : [];

      if (rawList.length > 0) {
        setStatusMsg(`Sanitizing and processing ${rawList.length} master games...`);
        const sanitizedGames: GameItem[] = rawList.map((g, idx) => {
          let code = g.codeOrData || g.code || g.html || '';
          if (code && typeof code === 'string' && code.length > 20) {
            const { repairedHtml } = sanitizeAndRepairHtml(code);
            code = repairedHtml;
          }

          const category = normalizeGenre(g.category || g.genre);

          return {
            id: g.id || `master_${Date.now()}_${idx}`,
            title: g.title || g.name || `Game ${idx + 1}`,
            type: g.type || 'html',
            coverTheme: g.coverTheme || 'aurora',
            category,
            genre: category,
            ranking: typeof g.ranking === 'number' ? g.ranking : 9.0,
            healthScore: typeof g.healthScore === 'number' ? g.healthScore : 100,
            fileSize: g.fileSize || (code ? new Blob([code]).size : 1024 * 50),
            addedAt: g.addedAt || Date.now() - idx * 1000,
            isFavorite: !!g.isFavorite,
            isSlop: !!g.isSlop,
            codeOrData: code,
            driveUrl: g.driveUrl || g.url || '',
            detectedEngine: g.detectedEngine || 'HTML5 Engine',
            isEliteProtected: true,
          };
        });

        // Save locally to IndexedDB
        await saveMultipleGamesToDB(sanitizedGames);

        // Sync directly to Firebase Firestore Cloud
        setStatusMsg(`Syncing ${sanitizedGames.length} games to Firebase Firestore...`);
        await saveMultipleGamesToFirestore(sanitizedGames);

        sound.playUnlock();
        setStatusMsg(`Successfully imported and synced built-in master catalog (${sanitizedGames.length} games)!`);
        onRefreshGames();
      } else {
        setStatusMsg('Master JSON file empty or invalid.');
      }
    } catch (err) {
      console.error('Built-in master import error:', err);
      setStatusMsg('Error downloading built-in master catalog file.');
    }

    setIsImporting(false);
  };

  const handleDownloadMasterJson = async () => {
    sound.playKeypress();
    try {
      const response = await fetch('./frosty-archive-backup-2026-09-28.frosty.json');
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'frosty-archive-backup-2026-09-28.frosty.json';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      sound.playUnlock();
      setStatusMsg('Downloaded master JSON backup file to device!');
    } catch {
      setStatusMsg('Failed to download master JSON file.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md p-6 shadow-2xl">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <HardDrive className="w-5 h-5 text-cyan-400" />
            <h2 className="text-base font-bold text-white tracking-tight">Archive Backup & Transfer</h2>
          </div>
          <button
            onClick={() => {
              sound.playKeypress();
              onClose();
            }}
            className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-xs text-slate-400 mt-3 mb-5 leading-relaxed">
          Export your entire library of uploaded HTML5 and Flash games into a single portable backup file, or restore games on any device.
        </p>

        {statusMsg && (
          <div className="mb-4 p-3 bg-cyan-950/40 border border-cyan-800/60 rounded-xl text-xs text-cyan-200 flex items-center gap-2">
            <Check className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>{statusMsg}</span>
          </div>
        )}

        <div className="space-y-3">
          {/* 1-Click Built-In Master Import Button */}
          <button
            onClick={handleImportBuiltInCatalog}
            disabled={isImporting}
            className="w-full flex items-center justify-between p-3.5 bg-cyan-950/40 hover:bg-cyan-900/50 border border-cyan-800/80 hover:border-cyan-500/60 rounded-xl text-left transition-all group cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-cyan-900/60 border border-cyan-400/40 text-cyan-300 flex items-center justify-center shrink-0">
                <HardDrive className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors flex items-center gap-1.5">
                  <span>Import Built-In Master Catalog</span>
                  <span className="px-1.5 py-0.2 font-mono text-[10px] bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 rounded">2,368 Games</span>
                </div>
                <div className="text-[11px] text-cyan-200/70 mt-0.5">
                  Load pre-saved master catalog directly on Chromebooks
                </div>
              </div>
            </div>
          </button>

          {/* Download Built-In Master JSON File */}
          <button
            onClick={handleDownloadMasterJson}
            disabled={isImporting}
            className="w-full flex items-center justify-between p-3.5 bg-slate-950/60 hover:bg-slate-800/80 border border-slate-800 hover:border-cyan-500/40 rounded-xl text-left transition-all group cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 flex items-center justify-center shrink-0">
                <Download className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-semibold text-white group-hover:text-emerald-300 transition-colors">
                  Download Master JSON File
                </div>
                <div className="text-xs text-slate-500 mt-0.5">
                  Save frosty-archive-backup-2026-09-28.frosty.json to device
                </div>
              </div>
            </div>
          </button>

          {/* Export Button */}
          <button
            onClick={handleExport}
            disabled={isExporting}
            className="w-full flex items-center justify-between p-3.5 bg-slate-950/60 hover:bg-slate-800/80 border border-slate-800 hover:border-cyan-500/40 rounded-xl text-left transition-all group cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 flex items-center justify-center shrink-0">
                <Download className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-semibold text-white group-hover:text-cyan-300 transition-colors">
                  Export Library Backup
                </div>
                <div className="text-xs text-slate-500 mt-0.5">
                  Save all games, covers, and code to .frosty file
                </div>
              </div>
            </div>
          </button>

          {/* Custom File Upload Import Button */}
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={isImporting}
            className="w-full flex items-center justify-between p-3.5 bg-slate-950/60 hover:bg-slate-800/80 border border-slate-800 hover:border-cyan-500/40 rounded-xl text-left transition-all group cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 flex items-center justify-center shrink-0">
                <Upload className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-semibold text-white group-hover:text-cyan-300 transition-colors">
                  Restore from Custom File
                </div>
                <div className="text-xs text-slate-500 mt-0.5">
                  Upload local .frosty or .json backup file
                </div>
              </div>
            </div>
            <input
              type="file"
              ref={fileInputRef}
              accept=".json,.frosty"
              onChange={handleCustomFileUpload}
              className="hidden"
            />
          </button>
        </div>

        <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-500">
          <span>Client-Side Local Storage</span>
          <button
            onClick={onClose}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold rounded-lg transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
