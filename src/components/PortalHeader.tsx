/**
 * Frosty Top Bar Navigation - Streamlined Minimalist Header
 * Every button is an actual styled button with clean hover tooltips.
 * Far-right Developer Mode secured with passcode 'NOCHEUFC'.
 */

import React, { useState, useRef, useEffect } from 'react';
import {
  Gamepad2,
  Bot,
  Video,
  UploadCloud,
  EyeOff,
  ShieldCheck,
  HardDrive,
  Cloud,
  Github,
  ShieldAlert,
  ListOrdered,
  Copy,
  Check,
  X,
  Edit3,
  Trash2,
  LogOut,
  Lock,
  Zap,
  Terminal,
  SlidersHorizontal,
  ChevronDown,
  RefreshCw,
} from 'lucide-react';
import { sound } from '../utils/audio';

interface PortalHeaderProps {
  currentTab: 'games' | 'ai' | 'videos';
  onSelectTab: (tab: 'games' | 'ai' | 'videos') => void;
  onOpenUpload: () => void;
  isVoteMode: boolean;
  onToggleVoteMode: () => void;
  onCopyList: () => void;
  isCopied?: boolean;
  onOpenCloakSettings: () => void;
  onOpenBackup: () => void;
  onOpenCloudSync: () => void;
  onOpenGitHubDeploy: () => void;
  onOpenEvasion: () => void;
  onStealthLock: () => void;
  // Developer Mode Props
  isDevMode: boolean;
  onSetDevMode: (active: boolean) => void;
  onOpenRenameTool: () => void;
  onOpenDeleteTool?: () => void;
  onWipeCacheAndReset?: () => void;
}

interface TooltipButtonProps {
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
  variant?: 'primary' | 'danger' | 'ghost';
}

const TooltipButton: React.FC<TooltipButtonProps> = ({
  onClick,
  icon,
  label,
  isActive = false,
  variant = 'ghost',
}) => {
  const [showTooltip, setShowTooltip] = useState(false);

  let variantStyles =
    'bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border-slate-800/90';
  if (variant === 'primary') {
    variantStyles =
      'bg-cyan-950/60 hover:bg-cyan-900/80 text-cyan-300 hover:text-cyan-100 border-cyan-800/60 hover:border-cyan-500/50';
  } else if (variant === 'danger') {
    variantStyles =
      'bg-slate-900/80 hover:bg-rose-950/60 text-slate-400 hover:text-rose-300 border-slate-800 hover:border-rose-800/60';
  }

  if (isActive) {
    variantStyles =
      'bg-blue-950/90 border-cyan-500/60 text-cyan-300 shadow-xs ring-1 ring-cyan-500/30';
  }

  return (
    <div className="relative inline-flex items-center">
      <button
        onClick={onClick}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        aria-label={label}
        className={`p-2.5 rounded-xl border transition-all duration-150 flex items-center justify-center cursor-pointer ${variantStyles}`}
      >
        {icon}
      </button>

      {/* Floating Hover Tooltip */}
      {showTooltip && (
        <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 z-50 px-2.5 py-1 text-[11px] font-medium text-slate-200 bg-slate-950 border border-slate-800 rounded-lg shadow-xl whitespace-nowrap pointer-events-none animate-in fade-in zoom-in-95 duration-100">
          {label}
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-950 border-t border-l border-slate-800 rotate-45" />
        </div>
      )}
    </div>
  );
};

export const PortalHeader: React.FC<PortalHeaderProps> = ({
  currentTab,
  onSelectTab,
  onOpenUpload,
  isVoteMode,
  onToggleVoteMode,
  onCopyList,
  isCopied = false,
  onOpenCloakSettings,
  onOpenBackup,
  onOpenCloudSync,
  onOpenGitHubDeploy,
  onOpenEvasion,
  onStealthLock,
  isDevMode,
  onSetDevMode,
  onOpenRenameTool,
  onOpenDeleteTool,
  onWipeCacheAndReset,
}) => {
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);
  const [showDevPassModal, setShowDevPassModal] = useState<boolean>(false);
  const [devCodeInput, setDevCodeInput] = useState<string>('');
  const [devError, setDevError] = useState<string | null>(null);
  const [isDevDropdownOpen, setIsDevDropdownOpen] = useState<boolean>(false);
  const [isOperationsDropdownOpen, setIsOperationsDropdownOpen] = useState<boolean>(false);
  const [showWipeConfirmModal, setShowWipeConfirmModal] = useState<boolean>(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const operationsRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDevDropdownOpen(false);
      }
      if (operationsRef.current && !operationsRef.current.contains(e.target as Node)) {
        setIsOperationsDropdownOpen(false);
      }
    };
    if (isDevDropdownOpen || isOperationsDropdownOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isDevDropdownOpen, isOperationsDropdownOpen]);

  const handleVoteButtonClick = () => {
    sound.playKeypress();
    setShowConfirmModal(true);
  };

  const handleConfirmVoteMode = () => {
    sound.playUnlock();
    setShowConfirmModal(false);
    onToggleVoteMode();
  };

  // Developer Mode Trigger
  const handleDevModeButtonClick = () => {
    sound.playKeypress();
    if (!isDevMode) {
      setDevCodeInput('');
      setDevError(null);
      setShowDevPassModal(true);
    } else {
      setIsDevDropdownOpen((prev) => !prev);
    }
  };

  const handleVerifyDevCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (devCodeInput.trim().toUpperCase() === 'NOCHEUFC') {
      sound.playUnlock();
      onSetDevMode(true);
      setShowDevPassModal(false);
      setDevCodeInput('');
      setDevError(null);
      setIsDevDropdownOpen(true);
    } else {
      sound.playLock();
      setDevError('Incorrect passcode. Access denied.');
    }
  };

  const handleExitDevMode = () => {
    sound.playLock();
    onSetDevMode(false);
    setIsDevDropdownOpen(false);
  };

  return (
    <>
      <header className="flex items-center justify-between px-6 py-3.5 border-b border-slate-800/80 bg-slate-900/60 backdrop-blur-md sticky top-0 z-40">
        {/* Zone 1: Wordmark */}
        <div className="flex items-center gap-3">
          <a
            href="#games"
            onClick={(e) => {
              e.preventDefault();
              sound.playKeypress();
              onSelectTab('games');
            }}
            className="text-lg font-bold tracking-tight text-white hover:text-cyan-300 transition-colors flex items-center gap-1.5"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse shadow-sm" />
            <span>Frosty</span>
          </a>
        </div>

        {/* Zone 2: Navigation Section Buttons with Tooltips */}
        <nav className="flex items-center gap-2">
          <TooltipButton
            onClick={() => {
              sound.playKeypress();
              onSelectTab('games');
            }}
            icon={<Gamepad2 className="w-4 h-4" />}
            label="Games"
            isActive={currentTab === 'games'}
          />

          <TooltipButton
            onClick={() => {
              sound.playKeypress();
              onSelectTab('ai');
            }}
            icon={<Bot className="w-4 h-4" />}
            label="AI"
            isActive={currentTab === 'ai'}
          />

          <TooltipButton
            onClick={() => {
              sound.playKeypress();
              onSelectTab('videos');
            }}
            icon={<Video className="w-4 h-4" />}
            label="Videos"
            isActive={currentTab === 'videos'}
          />
        </nav>

        {/* Zone 3: Action Buttons with Hover Tooltips */}
        <div className="flex items-center gap-2">
          {/* Upload Button */}
          <TooltipButton
            onClick={() => {
              sound.playKeypress();
              onOpenUpload();
            }}
            icon={<UploadCloud className="w-4 h-4" />}
            label="Upload Games"
            variant="primary"
          />

          {/* VOTE & Ranking Button */}
          <TooltipButton
            onClick={handleVoteButtonClick}
            icon={<ListOrdered className="w-4 h-4 text-cyan-300" />}
            label={isVoteMode ? "Exit Vote Mode" : "Vote & Rank Games (0-10)"}
            isActive={isVoteMode}
          />

          {/* Copy List Button */}
          <TooltipButton
            onClick={() => {
              sound.playUnlock();
              onCopyList();
            }}
            icon={isCopied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-cyan-300" />}
            label={isCopied ? "List Copied!" : "Copy Game List (with Rankings)"}
          />

          {/* Disguise Browser Tab */}
          <TooltipButton
            onClick={() => {
              sound.playKeypress();
              onOpenCloakSettings();
            }}
            icon={<ShieldCheck className="w-4 h-4" />}
            label="Disguise Browser Tab"
          />

          {/* Panic Cloak */}
          <TooltipButton
            onClick={() => {
              sound.playLock();
              onStealthLock();
            }}
            icon={<EyeOff className="w-4 h-4" />}
            label="Instant Panic Cloak (~ or Esc)"
            variant="danger"
          />

          {/* Consolidated Tools & Operations Dropdown */}
          <div className="relative inline-flex items-center ml-1" ref={operationsRef}>
            <TooltipButton
              onClick={() => {
                sound.playKeypress();
                setIsOperationsDropdownOpen((prev) => !prev);
              }}
              icon={<SlidersHorizontal className="w-4 h-4 text-cyan-300" />}
              label="Tools & Operations"
              isActive={isOperationsDropdownOpen}
            />

            {/* Dropdown Menu */}
            {isOperationsDropdownOpen && (
              <div className="absolute right-0 top-full mt-2 w-64 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95 duration-100">
                <div className="px-2.5 py-1 text-[10px] font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-800/80 mb-1">
                  Tools & Operations
                </div>

                {/* 1. GitHub Pages Deploy */}
                <button
                  type="button"
                  onClick={() => {
                    sound.playKeypress();
                    setIsOperationsDropdownOpen(false);
                    onOpenGitHubDeploy();
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-200 hover:text-white hover:bg-slate-800/80 rounded-lg transition-colors cursor-pointer text-left"
                >
                  <Github className="w-4 h-4 text-slate-300" />
                  <span>Deploy to GitHub Pages</span>
                </button>

                {/* 2. Archive Backup (.frosty) */}
                <button
                  type="button"
                  onClick={() => {
                    sound.playKeypress();
                    setIsOperationsDropdownOpen(false);
                    onOpenBackup();
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-200 hover:text-white hover:bg-slate-800/80 rounded-lg transition-colors cursor-pointer text-left"
                >
                  <HardDrive className="w-4 h-4 text-cyan-400" />
                  <span>Archive Backup (.frosty)</span>
                </button>

                {/* 3. Firebase Cloud Sync */}
                <button
                  type="button"
                  onClick={() => {
                    sound.playKeypress();
                    setIsOperationsDropdownOpen(false);
                    onOpenCloudSync();
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-200 hover:text-white hover:bg-slate-800/80 rounded-lg transition-colors cursor-pointer text-left"
                >
                  <Cloud className="w-4 h-4 text-cyan-400" />
                  <span>Firebase Cloud Sync</span>
                </button>

                {/* 4. Stealth Countermeasures */}
                <button
                  type="button"
                  onClick={() => {
                    sound.playKeypress();
                    setIsOperationsDropdownOpen(false);
                    onOpenEvasion();
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-200 hover:text-white hover:bg-slate-800/80 rounded-lg transition-colors cursor-pointer text-left"
                >
                  <ShieldAlert className="w-4 h-4 text-emerald-400" />
                  <span>Stealth Countermeasures</span>
                </button>

                <div className="border-t border-slate-800 my-1" />

                {/* 5. Developer Mode */}
                <button
                  type="button"
                  onClick={() => {
                    sound.playKeypress();
                    setIsOperationsDropdownOpen(false);
                    if (!isDevMode) {
                      setDevCodeInput('');
                      setDevError(null);
                      setShowDevPassModal(true);
                    } else {
                      setIsDevDropdownOpen(true);
                    }
                  }}
                  className="w-full flex items-center justify-between px-3 py-2 text-xs font-medium text-slate-200 hover:text-white hover:bg-slate-800/80 rounded-lg transition-colors cursor-pointer text-left"
                >
                  <div className="flex items-center gap-2.5">
                    <Terminal className="w-4 h-4 text-amber-400" />
                    <span>Developer Mode</span>
                  </div>
                  {isDevMode && (
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-cyan-950 text-cyan-300 border border-cyan-800">
                      ACTIVE
                    </span>
                  )}
                </button>

                {isDevMode && (
                  <div className="pl-3 pr-1 py-1 space-y-1 bg-slate-950/40 rounded-lg my-1">
                    <button
                      type="button"
                      onClick={() => {
                        sound.playKeypress();
                        setIsOperationsDropdownOpen(false);
                        onOpenRenameTool();
                      }}
                      className="w-full flex items-center gap-2 px-2.5 py-1.5 text-xs text-slate-300 hover:text-white hover:bg-slate-800 rounded transition cursor-pointer"
                    >
                      <Edit3 className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Rename Tool</span>
                    </button>
                    {onOpenDeleteTool && (
                      <button
                        type="button"
                        onClick={() => {
                          sound.playKeypress();
                          setIsOperationsDropdownOpen(false);
                          onOpenDeleteTool();
                        }}
                        className="w-full flex items-center gap-2 px-2.5 py-1.5 text-xs text-rose-300 hover:text-rose-100 hover:bg-rose-950/60 rounded transition cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5 text-rose-400" />
                        <span>Delete Game Tool</span>
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => {
                        sound.playLock();
                        setIsOperationsDropdownOpen(false);
                        onSetDevMode(false);
                      }}
                      className="w-full flex items-center gap-2 px-2.5 py-1.5 text-xs text-slate-400 hover:text-white hover:bg-slate-800 rounded transition cursor-pointer"
                    >
                      <LogOut className="w-3.5 h-3.5 text-slate-400" />
                      <span>Exit Dev Mode</span>
                    </button>
                  </div>
                )}

                <div className="border-t border-slate-800 my-1" />

                {/* 6. Wipe Cache & Reset Library (Requested Button) */}
                <button
                  type="button"
                  onClick={() => {
                    sound.playKeypress();
                    setIsOperationsDropdownOpen(false);
                    setShowWipeConfirmModal(true);
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-rose-300 hover:text-rose-100 hover:bg-rose-950/70 rounded-lg transition-colors cursor-pointer text-left"
                >
                  <Trash2 className="w-4 h-4 text-rose-400" />
                  <span>Delete All Games & Wipe Cache</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Developer Passcode Modal ('NOCHEUFC') */}
      {showDevPassModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-sm w-full p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2 text-cyan-300">
                <Lock className="w-4 h-4 text-cyan-400" />
                <h3 className="text-base font-bold text-white">Developer Mode</h3>
              </div>
              <button
                onClick={() => {
                  sound.playKeypress();
                  setShowDevPassModal(false);
                }}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed mt-3 mb-4">
              Enter the master developer passcode to unlock archive management tools.
            </p>

            <form onSubmit={handleVerifyDevCode} className="space-y-4">
              <div>
                <input
                  type="password"
                  autoFocus
                  placeholder="Enter passcode..."
                  value={devCodeInput}
                  onChange={(e) => {
                    setDevCodeInput(e.target.value);
                    setDevError(null);
                  }}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs font-mono text-center tracking-widest text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500/50"
                />
                {devError && (
                  <p className="text-[11px] text-rose-400 font-medium mt-1.5 text-center">
                    {devError}
                  </p>
                )}
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-1">
                <button
                  type="button"
                  onClick={() => setShowDevPassModal(false)}
                  className="px-3.5 py-2 text-xs font-semibold text-slate-400 hover:text-slate-200 bg-slate-800/80 hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-xl transition-colors cursor-pointer shadow-sm"
                >
                  Authenticate
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Confirmation Modal for Vote Mode */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2 text-cyan-300">
                <ListOrdered className="w-5 h-5 text-cyan-400" />
                <h3 className="text-base font-bold text-white">
                  {isVoteMode ? "Exit Vote & Ranking Mode?" : "Enter Vote & Ranking Mode?"}
                </h3>
              </div>
              <button
                onClick={() => setShowConfirmModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed mt-4">
              {isVoteMode
                ? "Exiting Vote Mode will lock editing for rankings and restore normal play overlays. Your current scores remain securely saved."
                : "Entering Vote Mode allows you to vote and edit precision rankings (0.000 - 10.000) for each game. Unranked games will automatically be pinned to the top for rapid scoring."}
            </p>

            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-slate-200 bg-slate-800/80 hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmVoteMode}
                className="px-4 py-2 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-xl transition-colors cursor-pointer shadow-sm"
              >
                {isVoteMode ? "Confirm & Exit" : "Confirm & Enter Vote Mode"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal for Delete All Games & Wipe Cache */}
      {showWipeConfirmModal && (
        <div className="fixed inset-0 bg-slate-950/85 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-rose-700/60 rounded-2xl max-w-md w-full p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2.5 text-rose-400">
                <Trash2 className="w-5 h-5 text-rose-400" />
                <h3 className="text-base font-bold text-white">Delete All Games & Wipe Cache?</h3>
              </div>
              <button
                onClick={() => setShowWipeConfirmModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="mt-4 space-y-3">
              <p className="text-xs text-slate-300 leading-relaxed">
                This will completely wipe all local cached games from your browser/Chromebook, purge any old legacy Google Drive records, and re-sync the fresh, verified <strong>2,824 UGS games catalog</strong>.
              </p>
              <div className="p-3 bg-rose-950/30 border border-rose-800/40 rounded-xl text-[11px] text-rose-300 leading-relaxed font-mono">
                ⚠️ Resolves the 5,154 games duplication issue and restores standard titles.
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowWipeConfirmModal(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-slate-200 bg-slate-800/80 hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowWipeConfirmModal(false);
                  if (onWipeCacheAndReset) {
                    onWipeCacheAndReset();
                  }
                }}
                className="px-4 py-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-500 shadow-lg shadow-rose-900/30 rounded-xl transition-colors cursor-pointer"
              >
                Confirm & Wipe Everything
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
