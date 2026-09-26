/**
 * Tab Cloak & Disguise Settings
 * Changes document.title and favicon dynamically to fool visual sniffers.
 */

import React from 'react';
import { X, ShieldCheck, Check } from 'lucide-react';
import { sound } from '../utils/audio';

export type CloakPreset = 'frosty' | 'classroom' | 'drive' | 'canvas' | 'desmos';

interface TabCloakModalProps {
  currentPreset: CloakPreset;
  onSelectPreset: (preset: CloakPreset) => void;
  onClose: () => void;
}

const PRESETS: { id: CloakPreset; label: string; title: string; subtitle: string; iconBg: string }[] = [
  {
    id: 'frosty',
    label: 'Default Frosty Timer',
    title: 'Frosty Timer',
    subtitle: 'Standard clean productivity disguise',
    iconBg: 'bg-cyan-500/20 text-cyan-400',
  },
  {
    id: 'classroom',
    label: 'Google Classroom',
    title: 'Classes',
    subtitle: 'Tab appears as active school assignment page',
    iconBg: 'bg-emerald-500/20 text-emerald-400',
  },
  {
    id: 'drive',
    label: 'Google Drive',
    title: 'My Drive - Google Drive',
    subtitle: 'Tab appears as student cloud document folder',
    iconBg: 'bg-amber-500/20 text-amber-400',
  },
  {
    id: 'canvas',
    label: 'Canvas LMS',
    title: 'Dashboard - Canvas',
    subtitle: 'Tab appears as school learning portal',
    iconBg: 'bg-rose-500/20 text-rose-400',
  },
  {
    id: 'desmos',
    label: 'Desmos Calculator',
    title: 'Desmos | Graphing Calculator',
    subtitle: 'Tab appears as online STEM graphing tool',
    iconBg: 'bg-indigo-500/20 text-indigo-400',
  },
];

export const TabCloakModal: React.FC<TabCloakModalProps> = ({
  currentPreset,
  onSelectPreset,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md p-6 shadow-2xl">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-cyan-400" />
            <h2 className="text-base font-bold text-white tracking-tight">Tab Disguise Cloak</h2>
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
          Disguises browser tab titles and icons instantly in the browser bar so prying eyes don't detect gaming activity.
        </p>

        <div className="space-y-2">
          {PRESETS.map((p) => {
            const isSelected = currentPreset === p.id;
            return (
              <button
                key={p.id}
                onClick={() => {
                  sound.playKeypress();
                  onSelectPreset(p.id);
                }}
                className={`w-full flex items-center justify-between p-3 rounded-xl border text-left transition-all ${
                  isSelected
                    ? 'bg-cyan-950/40 border-cyan-500/40 text-white shadow-sm'
                    : 'bg-slate-950/40 border-slate-800/80 text-slate-300 hover:border-slate-700 hover:bg-slate-900'
                }`}
              >
                <div>
                  <div className="text-xs font-semibold text-white">{p.label}</div>
                  <div className="text-xs text-slate-400 mt-0.5">{p.subtitle}</div>
                </div>

                {isSelected && (
                  <div className="w-5 h-5 rounded-full bg-cyan-400 text-slate-950 flex items-center justify-center">
                    <Check className="w-3 h-3 stroke-3" />
                  </div>
                )}
              </button>
            );
          })}
        </div>

        <div className="mt-5 pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-500">
          <span>Quick Panic Key: <kbd className="px-1.5 py-0.5 bg-slate-800 border border-slate-700 rounded text-slate-300 font-mono">~</kbd> or <kbd className="px-1.5 py-0.5 bg-slate-800 border border-slate-700 rounded text-slate-300 font-mono">Esc</kbd></span>
          <button
            onClick={onClose}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold rounded-lg transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
