/**
 * Advanced Lightspeed & Securly Evasion Settings
 * Configures History Scrambler, Tab Unload Protection, and Ephemeral Blob URLs.
 */

import React, { useState } from 'react';
import { X, ShieldAlert, History, Lock, BellOff, Check } from 'lucide-react';
import { sound } from '../utils/audio';

interface EvasionSettingsModalProps {
  onClose: () => void;
}

export const EvasionSettingsModal: React.FC<EvasionSettingsModalProps> = ({ onClose }) => {
  const [historyScramble, setHistoryScramble] = useState<boolean>(() => {
    return localStorage.getItem('frosty_history_scramble') === 'true';
  });
  const [tabCloseProtection, setTabCloseProtection] = useState<boolean>(() => {
    return localStorage.getItem('frosty_tab_protection') === 'true';
  });
  const [blobMode, setBlobMode] = useState<boolean>(() => {
    return localStorage.getItem('frosty_blob_mode') !== 'false';
  });
  const [savedNotice, setSavedNotice] = useState<boolean>(false);

  const handleToggleHistory = () => {
    sound.playKeypress();
    const next = !historyScramble;
    setHistoryScramble(next);
    localStorage.setItem('frosty_history_scramble', String(next));

    if (next && typeof window !== 'undefined') {
      // Push decoy history states
      window.history.pushState({}, 'Classes', '#/classroom/dashboard');
      window.history.pushState({}, 'Frosty Timer', '#/focus/timer');
    }
    showSaved();
  };

  const handleToggleTabProtection = () => {
    sound.playKeypress();
    const next = !tabCloseProtection;
    setTabCloseProtection(next);
    localStorage.setItem('frosty_tab_protection', String(next));

    if (next) {
      window.onbeforeunload = () => 'Do you really want to leave this productivity session?';
    } else {
      window.onbeforeunload = null;
    }
    showSaved();
  };

  const handleToggleBlob = () => {
    sound.playKeypress();
    const next = !blobMode;
    setBlobMode(next);
    localStorage.setItem('frosty_blob_mode', String(next));
    showSaved();
  };

  const showSaved = () => {
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md p-6 shadow-2xl">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-cyan-400" />
            <h2 className="text-base font-bold text-white tracking-tight">
              Anti-Lightspeed Filter Evasion
            </h2>
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

        <p className="text-xs text-slate-400 mt-3 mb-4 leading-relaxed">
          High-tier stealth countermeasures against web filters (Lightspeed, Securly, GoGuardian, Fortinet) to ensure seamless, undetectable emulation.
        </p>

        {savedNotice && (
          <div className="mb-3 p-2.5 bg-cyan-950/60 border border-cyan-800/80 rounded-xl text-xs text-cyan-300 flex items-center gap-1.5">
            <Check className="w-3.5 h-3.5" />
            <span>Stealth parameter updated</span>
          </div>
        )}

        <div className="space-y-3 text-xs">
          {/* History Scrambler */}
          <div
            onClick={handleToggleHistory}
            className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
              historyScramble
                ? 'bg-cyan-950/30 border-cyan-500/40 text-white'
                : 'bg-slate-950/40 border-slate-800 text-slate-300'
            }`}
          >
            <div className="flex items-start gap-2.5">
              <History className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
              <div>
                <div className="font-semibold">Browser History Scrambler</div>
                <div className="text-[11px] text-slate-400 mt-0.5">
                  Pressing the browser "Back" button jumps to a decoy school page instead of your game history.
                </div>
              </div>
            </div>
            <div
              className={`w-9 h-5 rounded-full p-0.5 transition-colors shrink-0 ml-3 ${
                historyScramble ? 'bg-cyan-400' : 'bg-slate-800'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-slate-950 transition-transform ${
                  historyScramble ? 'translate-x-4' : 'translate-x-0'
                }`}
              />
            </div>
          </div>

          {/* Prevent Accidental Tab Close */}
          <div
            onClick={handleToggleTabProtection}
            className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
              tabCloseProtection
                ? 'bg-cyan-950/30 border-cyan-500/40 text-white'
                : 'bg-slate-950/40 border-slate-800 text-slate-300'
            }`}
          >
            <div className="flex items-start gap-2.5">
              <Lock className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
              <div>
                <div className="font-semibold">Tab Unload Protection</div>
                <div className="text-[11px] text-slate-400 mt-0.5">
                  Warns before closing or navigating away, protecting game state against misclicks.
                </div>
              </div>
            </div>
            <div
              className={`w-9 h-5 rounded-full p-0.5 transition-colors shrink-0 ml-3 ${
                tabCloseProtection ? 'bg-cyan-400' : 'bg-slate-800'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-slate-950 transition-transform ${
                  tabCloseProtection ? 'translate-x-4' : 'translate-x-0'
                }`}
              />
            </div>
          </div>

          {/* Ephemeral Memory Execution */}
          <div
            onClick={handleToggleBlob}
            className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
              blobMode
                ? 'bg-cyan-950/30 border-cyan-500/40 text-white'
                : 'bg-slate-950/40 border-slate-800 text-slate-300'
            }`}
          >
            <div className="flex items-start gap-2.5">
              <BellOff className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
              <div>
                <div className="font-semibold">Ephemeral In-Memory Execution</div>
                <div className="text-[11px] text-slate-400 mt-0.5">
                  Games execute in zero-trace memory blobs without saving unencrypted cache files to disk.
                </div>
              </div>
            </div>
            <div
              className={`w-9 h-5 rounded-full p-0.5 transition-colors shrink-0 ml-3 ${
                blobMode ? 'bg-cyan-400' : 'bg-slate-800'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-slate-950 transition-transform ${
                  blobMode ? 'translate-x-4' : 'translate-x-0'
                }`}
              />
            </div>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-500">
          <span>Active Panic Key: <kbd className="px-1.5 py-0.5 bg-slate-800 border border-slate-700 rounded text-slate-300 font-mono">~</kbd> or <kbd className="px-1.5 py-0.5 bg-slate-800 border border-slate-700 rounded text-slate-300 font-mono">Esc</kbd></span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-semibold rounded-lg transition-colors"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};
