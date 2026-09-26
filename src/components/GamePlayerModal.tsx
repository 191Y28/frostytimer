/**
 * Game Player Modal - Isolated Sandboxed Execution
 * Seamlessly executes HTML5 standalone games and Adobe Flash (.swf) via Ruffle.
 * Completely immune to Lightspeed/network filter injection.
 */

import React, { useEffect, useRef, useState } from 'react';
import { X, Maximize2, Minimize2, RotateCcw, ShieldCheck, EyeOff, ExternalLink, Activity } from 'lucide-react';
import { GameItem } from '../types';
import { buildOfficialClruffleHtml } from '../utils/clruffleConnector';
import { sound } from '../utils/audio';

interface GamePlayerModalProps {
  game: GameItem;
  onClose: () => void;
  onStealthLock: () => void;
}

export const GamePlayerModal: React.FC<GamePlayerModalProps> = ({ game, onClose, onStealthLock }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [keySeed, setKeySeed] = useState<number>(0);

  // Toggle fullscreen
  const toggleFullscreen = () => {
    sound.playKeypress();
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  // Reload current game
  const reloadGame = () => {
    sound.playKeypress();
    setKeySeed((prev) => prev + 1);
  };

  // Prepare game execution HTML (with official clruffle.html connector for Flash SWF)
  const getExecutableHtml = (): string => {
    if (game.type === 'swf') {
      if (game.codeOrData && game.codeOrData.includes('clruffle')) {
        return game.codeOrData;
      }
      return buildOfficialClruffleHtml(game.codeOrData || '', game.title);
    }
    return game.codeOrData || '';
  };

  // Launch in an untraceable about:blank stealth window (Anti-Lightspeed)
  const launchInAboutBlank = () => {
    sound.playUnlock();
    const win = window.open('about:blank', '_blank');
    if (!win) {
      alert('Popup blocked. Please allow popups for about:blank stealth mode.');
      return;
    }

    const doc = win.document;
    doc.open();
    const runnerHtml = getExecutableHtml();
    doc.write(runnerHtml);
    doc.close();
  };

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 bg-slate-950 flex flex-col overflow-hidden"
    >
      {/* Player Header Bar */}
      <div className="flex items-center justify-between px-6 py-3 border-b border-slate-800 bg-slate-900/90 text-slate-100 shrink-0">
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold tracking-tight text-white">
            {game.title}
          </span>
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span aria-hidden="true">·</span>
            <span>
              {game.type === 'swf' ? 'Official clruffle.html Connector' : game.detectedEngine || 'HTML5 Elite Sandbox'}
            </span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1 text-emerald-400 font-medium">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Health: {game.healthScore || 100}%</span>
            </span>
          </div>
        </div>

        {/* Player Controls */}
        <div className="flex items-center gap-2">
          {/* About:Blank Stealth Pop-out button */}
          <button
            onClick={launchInAboutBlank}
            title="Launch in about:blank cloaked tab (untraceable by filters)"
            className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-cyan-300 bg-cyan-950/70 hover:bg-cyan-900/70 border border-cyan-800/60 rounded-lg transition-colors cursor-pointer"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">About:blank Stealth</span>
          </button>

          <div className="hidden md:flex items-center gap-1 text-xs text-slate-500 mr-2">
            <span>Panic Key:</span>
            <kbd className="px-1.5 py-0.5 bg-slate-800 border border-slate-700 rounded text-slate-300 font-mono">
              ~
            </kbd>
          </div>

          <button
            onClick={() => {
              sound.playLock();
              onStealthLock();
            }}
            title="Instant Panic Cloak"
            className="p-2 text-slate-400 hover:text-rose-300 hover:bg-slate-800 rounded-lg border border-slate-800 transition-colors cursor-pointer"
          >
            <EyeOff className="w-4 h-4" />
          </button>

          <button
            onClick={reloadGame}
            title="Reload Game"
            className="p-2 text-slate-400 hover:text-slate-100 hover:bg-slate-800 rounded-lg border border-slate-800 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <button
            onClick={toggleFullscreen}
            title="Toggle Fullscreen"
            className="p-2 text-slate-400 hover:text-slate-100 hover:bg-slate-800 rounded-lg border border-slate-800 transition-colors cursor-pointer"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>

          <button
            onClick={() => {
              sound.playKeypress();
              onClose();
            }}
            title="Close Game"
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg border border-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Game Stage Area - Full Viewport flex-1 with min-h-0 */}
      <div className="flex-1 w-full min-h-0 relative bg-black flex flex-col items-center justify-center overflow-hidden">
        <iframe
          key={keySeed}
          ref={iframeRef}
          srcDoc={getExecutableHtml()}
          title={game.title}
          sandbox="allow-scripts allow-same-origin allow-forms allow-pointer-lock allow-downloads"
          allow="autoplay; fullscreen; gamepad; clipboard-read; clipboard-write; microphone; camera; focus-without-user-activation"
          className="w-full h-full flex-1 border-0 block bg-slate-950"
        />
      </div>
    </div>
  );
};
