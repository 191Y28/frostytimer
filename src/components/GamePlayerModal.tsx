/**
 * Game Player Modal - Isolated Sandboxed Execution
 * Seamlessly executes HTML5 standalone games and Adobe Flash (.swf) via Ruffle.
 * Completely immune to Lightspeed/network filter injection.
 */

import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  X,
  Maximize2,
  Minimize2,
  RotateCcw,
  ShieldCheck,
  EyeOff,
  ExternalLink,
  Zap,
  Loader2,
} from 'lucide-react';
import { GameItem } from '../types';
import { buildOfficialClruffleHtml } from '../utils/clruffleConnector';
import { sanitizeAndRepairHtml } from '../utils/eliteCodeSanitizer';
import {
  AutoClickerSettings,
  DEFAULT_AUTOCLICKER_SETTINGS,
  injectModsIntoHtml,
} from '../utils/modEngine';
import { ModSettingsModal } from './ModSettingsModal';
import { sound } from '../utils/audio';
import { getGameByIdFromDB, saveGameToDB } from '../utils/indexedDB';
import { fastDownloadGame } from '../utils/fastGameFetcher';
import { extractDriveFileId } from '../utils/linkExtractorImporter';

interface GamePlayerModalProps {
  game: GameItem;
  onClose: () => void;
  onStealthLock: () => void;
}

export const GamePlayerModal: React.FC<GamePlayerModalProps> = ({
  game,
  onClose,
  onStealthLock,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [keySeed, setKeySeed] = useState<number>(0);
  const [showModModal, setShowModModal] = useState<boolean>(false);
  const [loadedCode, setLoadedCode] = useState<string>(game.codeOrData || '');
  const [isLoadingCode, setIsLoadingCode] = useState<boolean>(!game.codeOrData);
  const [modSettings, setModSettings] = useState<AutoClickerSettings>(() => {
    try {
      const saved = localStorage.getItem('frosty_mods_autoclicker');
      return saved ? JSON.parse(saved) : DEFAULT_AUTOCLICKER_SETTINGS;
    } catch {
      return DEFAULT_AUTOCLICKER_SETTINGS;
    }
  });

  // Lock document body and html scrolling while game is active so zero scrolling bars ever show
  useEffect(() => {
    const originalBodyOverflow = document.body.style.overflow;
    const originalDocOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalBodyOverflow;
      document.documentElement.style.overflow = originalDocOverflow;
    };
  }, []);

  // Autofocus the iframe whenever loaded or when user clicks
  const focusGameIframe = () => {
    try {
      if (iframeRef.current) {
        iframeRef.current.focus();
        iframeRef.current.contentWindow?.focus();
      }
    } catch {}
  };

  // Global Keyboard listener: Forward game keys (WASD, Arrows, Space, etc.) directly to iframe if focus is on modal container
  useEffect(() => {
    const handleForwardKeyEvent = (e: KeyboardEvent) => {
      // Don't forward panic key ~ or Esc if closing
      if (e.key === '`' || e.key === '~' || e.key === 'Escape') return;

      const iframe = iframeRef.current;
      if (!iframe || !iframe.contentWindow) return;

      // If document.activeElement is not the iframe, send key event to iframe
      if (document.activeElement !== iframe) {
        try {
          iframe.contentWindow.postMessage(
            {
              type: 'FROSTY_DISPATCH_KEY',
              eventType: e.type,
              keyData: {
                key: e.key,
                code: e.code,
                keyCode: e.keyCode,
                which: e.which,
                bubbles: true,
                cancelable: true,
                altKey: e.altKey,
                ctrlKey: e.ctrlKey,
                shiftKey: e.shiftKey,
                metaKey: e.metaKey,
              },
            },
            '*'
          );
        } catch {}
      }
    };

    window.addEventListener('keydown', handleForwardKeyEvent);
    window.addEventListener('keyup', handleForwardKeyEvent);
    return () => {
      window.removeEventListener('keydown', handleForwardKeyEvent);
      window.removeEventListener('keyup', handleForwardKeyEvent);
    };
  }, []);

  // Ensure game code is loaded from IndexedDB or recovered via driveUrl if missing
  useEffect(() => {
    let isMounted = true;
    if (!game.codeOrData) {
      setIsLoadingCode(true);
      getGameByIdFromDB(game.id)
        .then(async (dbGame) => {
          if (!isMounted) return;
          if (dbGame && dbGame.codeOrData) {
            setLoadedCode(dbGame.codeOrData);
            setIsLoadingCode(false);
            return;
          }

          // If code was not in IndexedDB but driveUrl is known, recover on the fly!
          if (game.driveUrl) {
            try {
              const driveId = extractDriveFileId(game.driveUrl);
              const downloadRes = await fastDownloadGame({
                id: game.id,
                title: game.title,
                url: game.driveUrl,
                originalText: game.driveUrl,
                status: 'pending',
                driveFileId: driveId || undefined,
              });
              if (downloadRes && downloadRes.content && isMounted) {
                setLoadedCode(downloadRes.content);
                await saveGameToDB({ ...game, codeOrData: downloadRes.content });
                setIsLoadingCode(false);
                return;
              }
            } catch (err) {
              console.warn('Could not recover game from driveUrl:', err);
            }
          }

          if (isMounted) setIsLoadingCode(false);
        })
        .catch(() => {
          if (isMounted) setIsLoadingCode(false);
        });
    } else {
      setLoadedCode(game.codeOrData);
      setIsLoadingCode(false);
    }
    return () => {
      isMounted = false;
    };
  }, [game.id, game.codeOrData, game.driveUrl, keySeed]);

  // Toggle fullscreen (hides header completely and fills whole screen)
  const toggleFullscreen = () => {
    sound.playKeypress();
    if (!isFullscreen) {
      setIsFullscreen(true);
      if (!document.fullscreenElement && containerRef.current) {
        containerRef.current.requestFullscreen().catch(() => {
          // Viewport fallback: isFullscreen remains true, filling 100vw/100vh
        });
      }
    } else {
      setIsFullscreen(false);
      if (document.fullscreenElement) {
        document.exitFullscreen().catch(() => {});
      }
    }
  };

  // Sync fullscreen state with browser events
  useEffect(() => {
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        setIsFullscreen(false);
      }
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Keyboard shortcut to exit fullscreen via Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isFullscreen) {
        if (document.fullscreenElement) {
          document.exitFullscreen().catch(() => {});
        }
        setIsFullscreen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFullscreen]);

  // Immediate WebGL/Memory garbage collection on unmount
  useEffect(() => {
    return () => {
      if (iframeRef.current) {
        try {
          iframeRef.current.srcdoc = '';
          iframeRef.current.src = 'about:blank';
        } catch {}
      }
    };
  }, []);

  // Reload current game
  const reloadGame = () => {
    sound.playKeypress();
    setKeySeed((prev) => prev + 1);
  };

  // Prepare game execution HTML
  const executableHtml = useMemo(() => {
    let baseHtml = '';
    if (game.type === 'swf') {
      if (loadedCode && loadedCode.includes('clruffle')) {
        baseHtml = loadedCode;
      } else {
        baseHtml = buildOfficialClruffleHtml(loadedCode || '', game.title);
      }
    } else {
      if (loadedCode && loadedCode.trim().length > 20) {
        const { repairedHtml } = sanitizeAndRepairHtml(loadedCode);
        baseHtml = repairedHtml;
      } else {
        baseHtml = '';
      }
    }

    // Inject Mods (Auto Clicker)
    return injectModsIntoHtml(baseHtml, modSettings);
  }, [game.type, game.title, loadedCode, modSettings]);

  // Generate Blob URL to ensure full WebGL, WebAssembly, Canvas, and Worker access without opaque origin blocks
  const blobUrl = useMemo(() => {
    if (!executableHtml) return '';
    try {
      const blob = new Blob([executableHtml], { type: 'text/html;charset=utf-8' });
      return URL.createObjectURL(blob);
    } catch {
      return '';
    }
  }, [executableHtml, keySeed]);

  // Revoke Blob URL when dependencies change or on unmount
  useEffect(() => {
    return () => {
      if (blobUrl) {
        try {
          URL.revokeObjectURL(blobUrl);
        } catch {}
      }
    };
  }, [blobUrl]);

  // Autofocus the iframe whenever loaded or when user switches/reloads
  useEffect(() => {
    const timer = setTimeout(focusGameIframe, 300);
    return () => clearTimeout(timer);
  }, [blobUrl, keySeed]);

  // Extract Google Drive File ID for fallback preview engine
  const driveFileId = useMemo(() => {
    return (
      extractDriveFileId(game.driveUrl || '') ||
      extractDriveFileId(game.id || '') ||
      extractDriveFileId(game.fileName || '')
    );
  }, [game.driveUrl, game.id, game.fileName]);

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
    doc.write(executableHtml);
    doc.close();
  };

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 bg-slate-950 flex flex-col overflow-hidden"
    >
      {/* Player Header Bar - Hidden when in Fullscreen so game fills entire screen */}
      {!isFullscreen && (
        <div className="flex items-center justify-between px-6 py-3 border-b border-slate-800 bg-slate-900/90 text-slate-100 shrink-0 select-none">
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
            {/* Mods Engine Button */}
            <button
              onClick={() => {
                sound.playKeypress();
                setShowModModal(true);
              }}
              title="Open Game Mods (Auto Clicker)"
              className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                modSettings.enabled
                  ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50 shadow-sm ring-1 ring-cyan-500/30 animate-pulse'
                  : 'bg-slate-800/80 text-slate-300 border-slate-700/80 hover:bg-slate-700'
              }`}
            >
              <Zap className={`w-3.5 h-3.5 ${modSettings.enabled ? 'text-cyan-400 fill-cyan-400' : 'text-slate-400'}`} />
              <span>Mods {modSettings.enabled ? `(${modSettings.cps} CPS)` : ''}</span>
            </button>

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
      )}

      {/* Floating Exit & Cloak Controls when in Fullscreen */}
      {isFullscreen && (
        <div className="fixed top-3 right-3 z-50 flex items-center gap-1.5 p-1.5 rounded-xl bg-slate-950/85 backdrop-blur-md border border-slate-700/80 text-slate-200 shadow-2xl transition-all duration-150">
          <button
            onClick={toggleFullscreen}
            title="Exit Fullscreen (or press Esc)"
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-200 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg cursor-pointer transition-colors shadow-xs"
          >
            <Minimize2 className="w-3.5 h-3.5 text-cyan-400" />
            <span>Exit Fullscreen</span>
          </button>
          <button
            onClick={() => {
              sound.playLock();
              onStealthLock();
            }}
            title="Instant Panic Cloak (~)"
            className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded-lg cursor-pointer transition-colors"
          >
            <EyeOff className="w-4 h-4" />
          </button>
          <button
            onClick={() => {
              sound.playKeypress();
              if (document.fullscreenElement) {
                document.exitFullscreen().catch(() => {});
              }
              onClose();
            }}
            title="Close Game"
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg cursor-pointer transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Game Stage Area - Zero Scrollbars, Pure Immersion */}
      <div className="flex-1 w-full min-h-0 relative bg-black flex flex-col items-center justify-center overflow-hidden">
        {isLoadingCode ? (
          <div className="flex flex-col items-center gap-3 text-cyan-300">
            <Loader2 className="w-9 h-9 animate-spin text-cyan-400" />
            <p className="text-sm font-semibold tracking-wide text-cyan-200">
              ⚡ Loading game into local sandbox...
            </p>
            <p className="text-xs font-mono text-slate-400">
              Bypassing Google Drive restrictions & isolating game binary...
            </p>
          </div>
        ) : executableHtml ? (
          <iframe
            key={`${game.id}_${keySeed}`}
            ref={iframeRef}
            srcDoc={executableHtml}
            title={game.title}
            scrolling="no"
            allow="autoplay; fullscreen; gamepad; clipboard-read; clipboard-write; microphone; camera; focus-without-user-activation; cross-origin-isolated"
            className="w-full h-full flex-1 border-0 block bg-black overflow-hidden"
            style={{ overflow: 'hidden' }}
          />
        ) : (
          <div className="flex flex-col items-center gap-4 text-center max-w-md p-6 bg-slate-900 border border-slate-800 rounded-2xl">
            <ShieldCheck className="w-10 h-10 text-amber-400" />
            <div>
              <h3 className="text-base font-bold text-white mb-1">Local Sandbox Execution</h3>
              <p className="text-xs text-slate-400">
                Could not automatically retrieve offline game binary for "{game.title}". Your school network filter may be blocking the download endpoint.
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2">
              <button
                onClick={() => {
                  sound.playKeypress();
                  setIsLoadingCode(true);
                  setKeySeed((prev) => prev + 1);
                }}
                className="px-3 py-1.5 text-xs font-semibold text-cyan-300 bg-cyan-950 hover:bg-cyan-900 border border-cyan-800 rounded-lg cursor-pointer"
              >
                Retry Bypass Download
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Mods Settings Modal */}
      {showModModal && (
        <ModSettingsModal
          settings={modSettings}
          onSave={(newSettings) => {
            setModSettings(newSettings);
            reloadGame();
          }}
          onClose={() => setShowModModal(false)}
        />
      )}
    </div>
  );
};
