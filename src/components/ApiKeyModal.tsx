/**
 * Gemini API Key Configuration Modal
 * Opens on-demand when clicking the "API Key" button.
 */

import React, { useState } from 'react';
import { X, Key, Check, ExternalLink, ShieldCheck, Zap } from 'lucide-react';
import { sound } from '../utils/audio';
import { setActiveApiKey, getActiveApiKey } from '../utils/aiClient';

interface ApiKeyModalProps {
  onClose: () => void;
  onSaved?: (newKey: string) => void;
}

export const ApiKeyModal: React.FC<ApiKeyModalProps> = ({ onClose, onSaved }) => {
  const [keyInput, setKeyInput] = useState<string>(() => {
    return getActiveApiKey();
  });
  const [isSaved, setIsSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sound.playKeypress();
    const cleanKey = keyInput.trim();
    setActiveApiKey(cleanKey);
    setIsSaved(true);
    if (onSaved) onSaved(cleanKey);
    setTimeout(() => {
      setIsSaved(false);
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-cyan-400" />
            <h2 className="text-base font-bold text-white tracking-tight">Groq Ultra-Fast AI Key</h2>
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
          Powered by Groq Llama-3.3-70B running at ~500 tokens/sec. Powers the Gaming Chatbot, instant title resolver, and game intelligence.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1.5">
              Groq API Key:
            </label>
            <input
              type="password"
              value={keyInput}
              onChange={(e) => setKeyInput(e.target.value)}
              placeholder="Enter your API key"
              className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs font-mono text-slate-200 focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div className="p-3 bg-slate-950/60 border border-slate-800 rounded-xl text-xs text-slate-400 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Stored securely in your local browser storage.</span>
          </div>

          <div className="flex items-center justify-between pt-2">
            <a
              href="https://console.groq.com/keys"
              target="_blank"
              rel="noreferrer"
              className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-medium"
            >
              <span>Groq Console</span>
              <ExternalLink className="w-3 h-3" />
            </a>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-3.5 py-2 text-xs font-semibold text-slate-400 hover:text-slate-200 bg-slate-800 rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-xl transition-colors"
              >
                {isSaved ? <Check className="w-4 h-4" /> : null}
                <span>{isSaved ? 'Saved!' : 'Save Key'}</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
