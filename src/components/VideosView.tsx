/**
 * Videos View - Placeholder State
 * Displays a clean "No videos added yet - Videos Coming Soon" message.
 */

import React from 'react';
import { Video, Film, Sparkles } from 'lucide-react';

export const VideosView: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16 flex flex-col items-center justify-center text-center">
      <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-slate-800 text-cyan-400 flex items-center justify-center mb-5 shadow-xl">
        <Video className="w-8 h-8" />
      </div>

      <h1 className="text-xl font-bold tracking-tight text-white mb-2">
        Videos Coming Soon
      </h1>

      <p className="text-xs text-slate-400 max-w-sm leading-relaxed mb-6">
        No videos added yet. Game walkthroughs, speedruns, and arcade gameplay clips will appear here soon.
      </p>

      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-slate-800 text-[11px] text-slate-400">
        <Film className="w-3.5 h-3.5 text-cyan-400" />
        <span>Media streamer module currently in standby</span>
      </div>
    </div>
  );
};
