/**
 * GitHub Pages Static Deployment Guide & Exporter Modal
 */

import React from 'react';
import { X, Github, Download, Check, ExternalLink, ShieldCheck, Terminal } from 'lucide-react';
import { generateGitHubPagesExport } from '../utils/githubPagesDeploy';
import { sound } from '../utils/audio';

interface GitHubDeployModalProps {
  onClose: () => void;
}

export const GitHubDeployModal: React.FC<GitHubDeployModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg p-6 shadow-2xl">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Github className="w-5 h-5 text-white" />
            <h2 className="text-base font-bold text-white tracking-tight">
              Static GitHub Pages Deployment
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
          Host Frosty Timer permanently on GitHub Pages for free. Because all games and emulation run 100% in client-side HTML, CSS, and JS with IndexedDB, no server backend or database subscription is needed!
        </p>

        {/* 4 Steps */}
        <div className="space-y-2.5 text-xs text-slate-300">
          <div className="p-3 bg-slate-950/60 border border-slate-800 rounded-xl">
            <div className="font-semibold text-white mb-1 flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-cyan-950 border border-cyan-500/40 text-cyan-300 text-[11px] flex items-center justify-center">1</span>
              <span>Create GitHub Repo</span>
            </div>
            <p className="text-slate-400 text-[11px] ml-6.5">
              Create a new repository named <code className="text-cyan-300 font-mono">frosty-timer</code> on github.com.
            </p>
          </div>

          <div className="p-3 bg-slate-950/60 border border-slate-800 rounded-xl">
            <div className="font-semibold text-white mb-1 flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-cyan-950 border border-cyan-500/40 text-cyan-300 text-[11px] flex items-center justify-center">2</span>
              <span>Push Source / Build Files</span>
            </div>
            <p className="text-slate-400 text-[11px] ml-6.5">
              Push this repository or run <code className="text-cyan-300 font-mono">npm run build</code> and push the <code className="text-cyan-300 font-mono">dist</code> output to the repository's main branch.
            </p>
          </div>

          <div className="p-3 bg-slate-950/60 border border-slate-800 rounded-xl">
            <div className="font-semibold text-white mb-1 flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-cyan-950 border border-cyan-500/40 text-cyan-300 text-[11px] flex items-center justify-center">3</span>
              <span>Enable GitHub Pages</span>
            </div>
            <p className="text-slate-400 text-[11px] ml-6.5">
              In repository <strong>Settings</strong> → <strong>Pages</strong>, select branch <strong>main</strong> (root) and hit Save.
            </p>
          </div>

          <div className="p-3 bg-slate-950/60 border border-slate-800 rounded-xl">
            <div className="font-semibold text-white mb-1 flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-cyan-950 border border-cyan-500/40 text-cyan-300 text-[11px] flex items-center justify-center">4</span>
              <span>Access Your Filter-Proof Archive</span>
            </div>
            <p className="text-slate-400 text-[11px] ml-6.5">
              Your site is live at <code className="text-cyan-300 font-mono">username.github.io/frosty-timer/</code>, disguised behind the genuine timer and calculator cloak code <code className="text-cyan-300 font-mono">MOBBDEEP</code>.
            </p>
          </div>
        </div>

        <div className="mt-5 pt-4 border-t border-slate-800 flex items-center justify-between">
          <button
            onClick={() => {
              sound.playKeypress();
              generateGitHubPagesExport();
            }}
            className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-lg border border-slate-700 transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-cyan-400" />
            <span>Download Deploy Guide (.md)</span>
          </button>

          <button
            onClick={onClose}
            className="px-4 py-2 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-semibold text-xs rounded-lg transition-colors"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
};
