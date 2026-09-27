/**
 * Game Mod Settings Modal
 * Configure Auto-Clicker speed (Chromebook optimized), keybinds, and click type.
 */

import React, { useState } from 'react';
import { X, Zap, Cpu, Keyboard, Sliders, Check, ShieldAlert } from 'lucide-react';
import {
  AutoClickerSettings,
  DEFAULT_AUTOCLICKER_SETTINGS,
  KEYBOARD_PRESETS
} from '../utils/modEngine';
import { sound } from '../utils/audio';

interface ModSettingsModalProps {
  settings: AutoClickerSettings;
  onSave: (newSettings: AutoClickerSettings) => void;
  onClose: () => void;
}

export const ModSettingsModal: React.FC<ModSettingsModalProps> = ({
  settings: initialSettings,
  onSave,
  onClose,
}) => {
  const [settings, setSettings] = useState<AutoClickerSettings>(initialSettings);
  const [isListeningForKey, setIsListeningForKey] = useState<boolean>(false);

  const handleToggle = () => {
    sound.playKeypress();
    setSettings((prev) => ({ ...prev, enabled: !prev.enabled }));
  };

  const handleCpsChange = (newCps: number) => {
    setSettings((prev) => ({ ...prev, cps: newCps }));
  };

  const handleSelectPreset = (presetId: string) => {
    sound.playKeypress();
    const preset = KEYBOARD_PRESETS.find((p) => p.id === presetId);
    if (preset) {
      setSettings((prev) => ({
        ...prev,
        keyboardPreset: presetId as any,
        keybind: preset.keybind,
        keybindLabel: preset.label,
      }));
    }
  };

  const handleStartKeybindListen = () => {
    sound.playKeypress();
    setIsListeningForKey(true);

    const onKey = (e: KeyboardEvent) => {
      e.preventDefault();
      e.stopPropagation();
      sound.playUnlock();
      setSettings((prev) => ({
        ...prev,
        keybind: e.code,
        keybindLabel: e.key.toUpperCase(),
        keyboardPreset: 'custom',
      }));
      setIsListeningForKey(false);
      window.removeEventListener('keydown', onKey);
    };

    window.addEventListener('keydown', onKey, { once: true });
  };

  const handleSaveAndApply = () => {
    sound.playUnlock();
    localStorage.setItem('frosty_mods_autoclicker', JSON.stringify(settings));
    onSave(settings);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg p-6 shadow-2xl space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-cyan-400" />
            <div>
              <h2 className="text-base font-bold text-white tracking-tight">
                Game Mods: Auto Clicker Engine
              </h2>
              <span className="text-[11px] text-slate-400">
                School Chromebook & Intel 4GB RAM Optimized
              </span>
            </div>
          </div>
          <button
            onClick={() => {
              sound.playKeypress();
              onClose();
            }}
            className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Master Enable Toggle */}
        <div className="flex items-center justify-between p-3.5 bg-slate-950/60 border border-slate-800 rounded-xl">
          <div className="flex items-center gap-3">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${settings.enabled ? 'bg-cyan-500/20 text-cyan-300' : 'bg-slate-800 text-slate-500'}`}>
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">Enable Auto Clicker Mod</div>
              <div className="text-[11px] text-slate-400">
                Injects fast-clicker listener into all playable game frames
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={handleToggle}
            className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
              settings.enabled ? 'bg-cyan-500' : 'bg-slate-800'
            }`}
          >
            <span
              className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                settings.enabled ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* CPS Click Speed Slider */}
        <div className="p-3.5 bg-slate-950/60 border border-slate-800 rounded-xl space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-white flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-cyan-400" />
              <span>Clicks Per Second (CPS)</span>
            </span>
            <span className="text-sm font-bold font-mono text-cyan-300">
              {settings.cps} CPS
            </span>
          </div>

          <input
            type="range"
            min={5}
            max={80}
            step={5}
            value={settings.cps}
            onChange={(e) => handleCpsChange(Number(e.target.value))}
            className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
          />

          <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono">
            <span>5 CPS (Research Safe)</span>
            <span className="text-emerald-400 font-semibold">25 CPS (Chromebook Best)</span>
            <span>80 CPS (Insane Speed)</span>
          </div>
        </div>

        {/* Keyboard Preset Trigger */}
        <div className="p-3.5 bg-slate-950/60 border border-slate-800 rounded-xl space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-white flex items-center gap-1.5">
              <Keyboard className="w-3.5 h-3.5 text-cyan-400" />
              <span>Activation Hotkey / Keyboard Preset</span>
            </span>
            <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
              [{settings.keybindLabel}]
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {KEYBOARD_PRESETS.map((preset) => (
              <button
                key={preset.id}
                type="button"
                onClick={() => handleSelectPreset(preset.id)}
                className={`p-2 rounded-lg border text-left transition-colors cursor-pointer ${
                  settings.keyboardPreset === preset.id
                    ? 'bg-cyan-500/15 border-cyan-500/50 text-white'
                    : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800'
                }`}
              >
                <div className="text-xs font-semibold">{preset.name}</div>
                <div className="text-[10px] text-slate-500">{preset.desc}</div>
              </button>
            ))}
          </div>

          {/* Custom keybind listener */}
          <button
            type="button"
            onClick={handleStartKeybindListen}
            className={`w-full py-1.5 border border-dashed rounded-lg text-xs font-medium transition-all ${
              isListeningForKey
                ? 'border-cyan-400 bg-cyan-950/40 text-cyan-300 animate-pulse'
                : 'border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
            }`}
          >
            {isListeningForKey ? 'Press ANY key on your keyboard now...' : 'Click to Set Custom Keybind'}
          </button>
        </div>

        {/* Hardware Guardrail Note */}
        <div className="p-2.5 bg-cyan-950/30 border border-cyan-800/40 rounded-xl flex items-center gap-2 text-[11px] text-cyan-300">
          <Cpu className="w-4 h-4 shrink-0 text-cyan-400" />
          <span>
            Throttled for Lenovo 4GB RAM Chromebooks: Uses event synthesis to prevent browser tab crashing while achieving ultra-fast click outputs.
          </span>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 border-t border-slate-800 flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-3.5 py-1.5 text-xs font-semibold text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSaveAndApply}
            className="flex items-center gap-1.5 px-4 py-1.5 bg-cyan-400 hover:bg-cyan-300 text-slate-950 text-xs font-bold rounded-lg shadow-md transition-colors cursor-pointer"
          >
            <Check className="w-3.5 h-3.5" />
            <span>Apply Mod</span>
          </button>
        </div>
      </div>
    </div>
  );
};
