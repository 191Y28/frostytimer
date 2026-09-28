/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { CloakTimer } from './components/CloakTimer';
import { CloakCalculator } from './components/CloakCalculator';
import { PortalHeader } from './components/PortalHeader';
import { GamesView } from './components/GamesView';
import { GamePlayerModal } from './components/GamePlayerModal';
import { BatchUploaderModal } from './components/BatchUploaderModal';
import { AIView } from './components/AIView';
import { VideosView } from './components/VideosView';
import { TabCloakModal, CloakPreset } from './components/TabCloakModal';
import { ArchiveBackupModal } from './components/ArchiveBackupModal';
import { CloudSyncModal } from './components/CloudSyncModal';
import { GitHubDeployModal } from './components/GitHubDeployModal';
import { EvasionSettingsModal } from './components/EvasionSettingsModal';
import { DeveloperRenameModal } from './components/DeveloperRenameModal';
import { DeveloperDeleteModal } from './components/DeveloperDeleteModal';
import { GameOperationsHubModal, HubTab } from './components/GameOperationsHubModal';
import { GameItem } from './types';
import { DEFAULT_GAMES } from './utils/defaultGames';
import { sanitizeAndRepairHtml } from './utils/eliteCodeSanitizer';
import {
  getAllGamesFromDB,
  getGameByIdFromDB,
  saveGameToDB,
  saveMultipleGamesToDB,
  deleteGameFromDB,
  updateGameInDB,
  updateGameRankingInDB,
  clearAllGamesFromDB,
} from './utils/indexedDB';
import {
  getAllGamesFromFirestore,
  saveMultipleGamesToFirestore,
  saveGameToFirestore,
  deleteGameFromFirestore,
  clearAllGamesFromFirestore,
  subscribeToGames,
  testConnection
} from './utils/firebaseStorage';
import { sound } from './utils/audio';
import { extractDriveFileId } from './utils/linkExtractorImporter';

export default function App() {
  // Cloak state: 'timer' | 'calculator' | 'unlocked'
  const [cloakState, setCloakState] = useState<'timer' | 'calculator' | 'unlocked'>('timer');
  const [activeTab, setActiveTab] = useState<'games' | 'ai' | 'videos'>('games');
  const [games, setGames] = useState<GameItem[]>([]);
  const [activeGame, setActiveGame] = useState<GameItem | null>(null);

  // Modals
  const [showUploadModal, setShowUploadModal] = useState<boolean>(false);
  const [showCloakSettings, setShowCloakSettings] = useState<boolean>(false);
  const [showBackupModal, setShowBackupModal] = useState<boolean>(false);
  const [showCloudSyncModal, setShowCloudSyncModal] = useState<boolean>(false);
  const [showDeployModal, setShowDeployModal] = useState<boolean>(false);
  const [showEvasionModal, setShowEvasionModal] = useState<boolean>(false);

  // Developer Mode
  const [isDevMode, setIsDevMode] = useState<boolean>(false);
  const [showDevRenameModal, setShowDevRenameModal] = useState<boolean>(false);
  const [showDevDeleteModal, setShowDevDeleteModal] = useState<boolean>(false);

  // Voting and Ranking Mode & Filter Type
  const [isVoteMode, setIsVoteMode] = useState<boolean>(false);
  const [filterType, setFilterType] = useState<'all' | 'popular' | 'favorites' | 'slop'>('all');
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [showOperationsHub, setShowOperationsHub] = useState<boolean>(false);
  const [operationsHubInitialTab, setOperationsHubInitialTab] = useState<HubTab>('home');

  // Tab cloak preset
  const [tabPreset, setTabPreset] = useState<CloakPreset>('frosty');

  // Load persistent unlock state and games from IndexedDB
  useEffect(() => {
    const isUnlocked = localStorage.getItem('frosty_cloak_unlocked') === 'true';
    if (isUnlocked) {
      setCloakState('unlocked');
    }

    const savedTabPreset = (localStorage.getItem('frosty_tab_preset') as CloakPreset) || 'frosty';
    applyTabCloak(savedTabPreset);

    // Initialize games with real Firestore Cloud persistence + local IndexedDB fallback
    const loadGames = async () => {
      try {
        testConnection();

        // 1. Get stored games from IndexedDB first for instant UI loading
        const storedGames = await getAllGamesFromDB();

        const storedCodeMap = new Map<string, string>();
        const storedDriveMap = new Map<string, string>();
        storedGames.forEach((g) => {
          if (g.codeOrData) storedCodeMap.set(g.id, g.codeOrData);
          if (g.driveUrl) storedDriveMap.set(g.id, g.driveUrl);
        });

        // Helper to auto-repair games containing raw Google Gadget XML, comments, or broken loader references
        const repairGame = (g: GameItem): GameItem => {
          let code = g.codeOrData || storedCodeMap.get(g.id) || '';
          if (code && typeof code === 'string' && code.length > 20) {
            const { repairedHtml } = sanitizeAndRepairHtml(code);
            if (repairedHtml) {
              code = repairedHtml;
            }
          }
          return {
            ...g,
            codeOrData: code,
            driveUrl: g.driveUrl || storedDriveMap.get(g.id) || '',
          };
        };

        if (storedGames.length > 0) {
          const repairedStored = storedGames.map(repairGame);
          setGames(repairedStored);
        }

        // 2. Asynchronously sync from Firebase Firestore Cloud if available
        const cloudGames = await getAllGamesFromFirestore();
        if (cloudGames && cloudGames.length > 0) {
          const cleanCloudGames = cloudGames.map(repairGame);
          setGames(cleanCloudGames);
          await saveMultipleGamesToDB(cleanCloudGames);
          return;
        }

        // 3. Fallback: If both IndexedDB and Firestore are empty (e.g. first visit on GitHub Pages)
        if (storedGames.length === 0 && (!cloudGames || cloudGames.length === 0)) {
          try {
            const masterRes = await fetch('./frosty-archive-backup-2026-09-28.frosty.json');
            if (masterRes.ok) {
              const masterData = await masterRes.json();
              const masterGames: GameItem[] = masterData.games || [];
              if (masterGames.length > 0) {
                setGames(masterGames);
                await saveMultipleGamesToDB(masterGames);
                return;
              }
            }
          } catch {}

          if (DEFAULT_GAMES.length > 0) {
            setGames(DEFAULT_GAMES);
            await saveMultipleGamesToDB(DEFAULT_GAMES);
            await saveMultipleGamesToFirestore(DEFAULT_GAMES);
          }
        } else if (storedGames.length > 0) {
          // Check if existing stored games are missing standalone code
          const missingCodeCount = storedGames.filter(g => !g.codeOrData || g.codeOrData.length < 50).length;
          if (missingCodeCount > 50) {
            // Asynchronously hydrate game code from master catalog in the background
            fetch('./frosty-archive-backup-2026-09-28.frosty.json')
              .then(res => res.json())
              .then(async (masterData) => {
                if (masterData && Array.isArray(masterData.games)) {
                  const masterCodeMap = new Map<string, string>();
                  masterData.games.forEach((mg: any) => {
                    if (mg.codeOrData && mg.codeOrData.length > 50) {
                      masterCodeMap.set(mg.id, mg.codeOrData);
                      if (mg.title) masterCodeMap.set(mg.title, mg.codeOrData);
                    }
                  });

                  if (masterCodeMap.size > 0) {
                    setGames((currentGames) => {
                      const updated = currentGames.map((g) => {
                        if (!g.codeOrData || g.codeOrData.length < 50) {
                          const code = masterCodeMap.get(g.id) || masterCodeMap.get(g.title) || '';
                          if (code) return { ...g, codeOrData: code };
                        }
                        return g;
                      });
                      saveMultipleGamesToDB(updated).catch(() => {});
                      return updated;
                    });
                  }
                }
              })
              .catch(() => {});
          }
        }
      } catch (err) {
        console.warn('Initial game load warning:', err);
      }
    };

    loadGames();

    // Setup real-time Firestore listener with safe local code preservation
    const unsubscribe = subscribeToGames(async (incomingGames) => {
      try {
        if (!incomingGames || incomingGames.length === 0) {
          // Do not wipe local database when Firestore is empty or quota is exceeded
          return;
        }

        const storedGames = await getAllGamesFromDB();
        const storedCodeMap = new Map<string, string>();
        const storedDriveMap = new Map<string, string>();
        storedGames.forEach((g) => {
          if (g.codeOrData) storedCodeMap.set(g.id, g.codeOrData);
          if (g.driveUrl) storedDriveMap.set(g.id, g.driveUrl);
        });

        const cleanIncoming = incomingGames.map((cg) => {
          let code = cg.codeOrData || storedCodeMap.get(cg.id) || '';
          if (code && typeof code === 'string' && code.length > 20) {
            const { repairedHtml } = sanitizeAndRepairHtml(code);
            if (repairedHtml) {
              code = repairedHtml;
            }
          }
          return {
            ...cg,
            codeOrData: code,
            driveUrl: cg.driveUrl || storedDriveMap.get(cg.id) || '',
          };
        });
        setGames(cleanIncoming);
        await saveMultipleGamesToDB(cleanIncoming);
      } catch (err) {
        console.warn('Firestore subscription sync warning:', err);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  // Panic Cloak keyboard listener: Press `~` (tilde) or `Escape` to snap back into timer
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '`' || e.key === '~') {
        e.preventDefault();
        sound.playLock();
        setActiveGame(null);
        setShowUploadModal(false);
        setShowCloakSettings(false);
        setCloakState('timer');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Apply browser tab title & favicon disguise
  const applyTabCloak = (preset: CloakPreset) => {
    setTabPreset(preset);
    localStorage.setItem('frosty_tab_preset', preset);

    let title = 'Frosty Timer';
    let iconSvg = '';

    if (preset === 'classroom') {
      title = 'Classes';
      iconSvg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%2310b981'><path d='M12 3L1 9l11 6 9-4.91V17h2V9L12 3z'/></svg>`;
    } else if (preset === 'drive') {
      title = 'My Drive - Google Drive';
      iconSvg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23f59e0b'><polygon points='12 2 2 19 22 19'/></svg>`;
    } else if (preset === 'canvas') {
      title = 'Dashboard - Canvas';
      iconSvg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23ef4444'><circle cx='12' cy='12' r='10'/></svg>`;
    } else if (preset === 'desmos') {
      title = 'Desmos | Graphing Calculator';
      iconSvg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%236366f1'><rect width='18' height='18' x='3' y='3' rx='2'/></svg>`;
    } else {
      title = 'Frosty Timer';
      iconSvg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2338bdf8' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><circle cx='12' cy='12' r='10'/><polyline points='12 6 12 12 16 14'/></svg>`;
    }

    document.title = title;
    const link: HTMLLinkElement | null = document.querySelector("link[rel*='icon']");
    if (link && iconSvg) {
      link.href = `data:image/svg+xml,${encodeURIComponent(iconSvg)}`;
    }
  };

  // Handlers for unlocking & locking
  const handleUnlock = () => {
    localStorage.setItem('frosty_cloak_unlocked', 'true');
    setCloakState('unlocked');
  };

  const handleStealthLock = () => {
    setActiveGame(null);
    setShowUploadModal(false);
    setShowCloakSettings(false);
    setCloakState('timer');
  };

  const handlePlayGame = async (game: GameItem) => {
    sound.playKeypress();
    let fullGame = game;
    if (!game.codeOrData) {
      const fromDb = await getGameByIdFromDB(game.id);
      if (fromDb && fromDb.codeOrData) {
        fullGame = fromDb;
      }
    }
    setActiveGame(fullGame);
  };

  const handleBatchSave = async (newGames: GameItem[]) => {
    sound.playUnlock();
    // Ultra-Efficient Duplicate Replacement: Matches by Title, File Name, Base Filename, or Drive ID
    const updatedGames = [...games];
    const savedItems: GameItem[] = [];

    const normalizeKey = (s?: string) => (s || '').toLowerCase().replace(/[^a-z0-9]/g, '');

    newGames.forEach((newG) => {
      const normTitle = normalizeKey(newG.title);
      const normFile = normalizeKey(newG.fileName);
      const newFileBase = normalizeKey((newG.fileName || '').replace(/\.[^/.]+$/, ''));
      const newDriveId = newG.driveUrl ? extractDriveFileId(newG.driveUrl) : null;

      const existingIdx = updatedGames.findIndex((existing) => {
        const existTitle = normalizeKey(existing.title);
        const existFile = normalizeKey(existing.fileName);
        const existFileBase = normalizeKey((existing.fileName || '').replace(/\.[^/.]+$/, ''));
        const existDriveId = existing.driveUrl ? extractDriveFileId(existing.driveUrl) : null;

        // 1. Title match
        if (normTitle && normTitle === existTitle) return true;
        // 2. Exact File Name match
        if (normFile && normFile.length > 3 && normFile === existFile) return true;
        // 3. Filename base matched against title
        if (newFileBase && newFileBase.length > 2 && (newFileBase === existTitle || normTitle === existFileBase)) return true;
        // 4. Drive ID match
        if (newDriveId && existDriveId && newDriveId === existDriveId) return true;

        return false;
      });

      if (existingIdx !== -1) {
        // Overwrite old game entry with fresh working upload, retaining original ID
        const replaced: GameItem = {
          ...newG,
          id: updatedGames[existingIdx].id,
          coverTheme: updatedGames[existingIdx].coverTheme || newG.coverTheme,
        };
        updatedGames[existingIdx] = replaced;
        savedItems.push(replaced);
      } else {
        updatedGames.unshift(newG);
        savedItems.push(newG);
      }
    });

    setGames(updatedGames);
    await saveMultipleGamesToDB(savedItems);
    await saveMultipleGamesToFirestore(savedItems);
  };

  const handleDeleteGame = async (id: string) => {
    setGames((prev) => prev.filter((g) => g.id !== id));
    await deleteGameFromDB(id);
    await deleteGameFromFirestore(id);
    sound.playTrash();
  };

  const handleRenameGame = async (id: string, newTitle: string) => {
    const trimmed = newTitle.trim();
    if (!trimmed) return;
    const target = games.find((g) => g.id === id);
    if (!target) return;
    const updatedGame: GameItem = { ...target, title: trimmed };
    setGames((prev) => prev.map((g) => (g.id === id ? updatedGame : g)));
    await updateGameInDB(updatedGame);
    await saveGameToFirestore(updatedGame);
  };

  const handleUpdateGames = async (updatedGames: GameItem[]) => {
    setGames(updatedGames);
    await saveMultipleGamesToDB(updatedGames);
    await saveMultipleGamesToFirestore(updatedGames);
  };

  const handleToggleFavorite = async (id: string) => {
    const target = games.find((g) => g.id === id);
    if (!target) return;
    const updatedGame: GameItem = { ...target, isFavorite: !target.isFavorite };
    setGames((prev) => prev.map((g) => (g.id === id ? updatedGame : g)));
    await updateGameInDB(updatedGame);
    await saveGameToFirestore(updatedGame);
  };

  const handleToggleSlop = async (id: string) => {
    sound.playUnlock();
    const target = games.find((g) => g.id === id);
    if (!target) return;
    const updatedGame: GameItem = { ...target, isSlop: !target.isSlop };
    setGames((prev) => prev.map((g) => (g.id === id ? updatedGame : g)));
    await updateGameInDB(updatedGame);
    await saveGameToFirestore(updatedGame);
  };

  const handleUpdateBatchRankings = async (
    rankingsMap: Map<string, number>,
    genresMap?: Map<string, string>,
    slopMap?: Map<string, boolean>
  ) => {
    const updatedGames = games.map((g) => {
      let updated = { ...g };
      if (rankingsMap.has(g.id)) {
        updated.ranking = rankingsMap.get(g.id)!;
      }
      if (genresMap && genresMap.has(g.id)) {
        const assignedGenre = genresMap.get(g.id);
        updated.category = assignedGenre;
        updated.genre = assignedGenre;
      }
      if (slopMap && slopMap.has(g.id)) {
        updated.isSlop = slopMap.get(g.id)!;
      }
      return updated;
    });

    const modifiedList = updatedGames.filter(
      (g) =>
        rankingsMap.has(g.id) ||
        (genresMap && genresMap.has(g.id)) ||
        (slopMap && slopMap.has(g.id))
    );
    setGames(updatedGames);
    await saveMultipleGamesToDB(modifiedList);
    await saveMultipleGamesToFirestore(modifiedList);

    return {
      updatedCount: modifiedList.length,
      unmatched: [],
    };
  };

  const handleMoveGamesToSlop = async (gameIds: string[]) => {
    const idSet = new Set(gameIds);
    const updatedGames = games.map((g) => {
      if (idSet.has(g.id)) {
        return { ...g, isSlop: true };
      }
      return g;
    });

    const modifiedList = updatedGames.filter((g) => idSet.has(g.id));
    setGames(updatedGames);
    await saveMultipleGamesToDB(modifiedList);
    await saveMultipleGamesToFirestore(modifiedList);

    return modifiedList.length;
  };

  const handleClearAllGames = async () => {
    try {
      await clearAllGamesFromDB();
      await clearAllGamesFromFirestore();
      setGames([]);
      setActiveGame(null);
      sound.playLock();
    } catch (err) {
      console.error('Failed to clear library:', err);
    }
  };

  const handleUpdateRanking = async (id: string, ranking: number) => {
    setGames((prev) =>
      prev.map((g) => (g.id === id ? { ...g, ranking } : g))
    );
    await updateGameRankingInDB(id, ranking);
    const target = games.find((g) => g.id === id);
    if (target) {
      await saveGameToFirestore({ ...target, ranking });
    }
  };

  const handleCopyList = () => {
    sound.playUnlock();
    setOperationsHubInitialTab('home');
    setShowOperationsHub(true);
  };

  // If Cloaked as Timer
  if (cloakState === 'timer') {
    return (
      <CloakTimer
        onOpenCalculator={() => {
          setCloakState('calculator');
        }}
      />
    );
  }

  // If Cloaked as Calculator
  if (cloakState === 'calculator') {
    return (
      <CloakCalculator
        onBackToTimer={() => setCloakState('timer')}
        onUnlock={handleUnlock}
      />
    );
  }

  // Unlocked Portal
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-cyan-500/20">
      {/* Strict 3-zone Header */}
      <PortalHeader
        currentTab={activeTab}
        onSelectTab={setActiveTab}
        onOpenUpload={() => setShowUploadModal(true)}
        isVoteMode={isVoteMode}
        onToggleVoteMode={() => setIsVoteMode((prev) => !prev)}
        onCopyList={handleCopyList}
        isCopied={isCopied}
        onOpenCloakSettings={() => setShowCloakSettings(true)}
        onOpenBackup={() => setShowBackupModal(true)}
        onOpenCloudSync={() => setShowCloudSyncModal(true)}
        onOpenGitHubDeploy={() => setShowDeployModal(true)}
        onOpenEvasion={() => setShowEvasionModal(true)}
        onStealthLock={handleStealthLock}
        isDevMode={isDevMode}
        onSetDevMode={setIsDevMode}
        onOpenRenameTool={() => setShowDevRenameModal(true)}
        onOpenDeleteTool={() => setShowDevDeleteModal(true)}
      />

      {/* Main Tab View */}
      <main className="flex-1 pb-16">
        {activeTab === 'games' && (
          <GamesView
            games={games}
            onPlayGame={handlePlayGame}
            onToggleFavorite={handleToggleFavorite}
            onToggleSlop={handleToggleSlop}
            onOpenUpload={() => setShowUploadModal(true)}
            onUpdateGames={handleUpdateGames}
            onUpdateRanking={handleUpdateRanking}
            onDeleteGame={handleDeleteGame}
            isVoteMode={isVoteMode}
            isDevMode={isDevMode}
            filterType={filterType}
            onSelectFilterType={setFilterType}
          />
        )}

        {activeTab === 'ai' && <AIView />}

        {activeTab === 'videos' && <VideosView />}
      </main>

      {/* Sandboxed Game Player Modal */}
      {activeGame && (
        <GamePlayerModal
          game={activeGame}
          onClose={() => setActiveGame(null)}
          onStealthLock={handleStealthLock}
        />
      )}

      {/* Batch Game Uploader */}
      {showUploadModal && (
        <BatchUploaderModal
          currentTotalGames={games.length}
          onClose={() => setShowUploadModal(false)}
          onSaveBatch={handleBatchSave}
        />
      )}

      {/* Developer Rename Tool Modal */}
      {showDevRenameModal && (
        <DeveloperRenameModal
          games={games}
          onRenameGame={handleRenameGame}
          onClose={() => setShowDevRenameModal(false)}
        />
      )}

      {/* Developer Delete Tool Modal */}
      {showDevDeleteModal && (
        <DeveloperDeleteModal
          games={games}
          onDeleteGame={handleDeleteGame}
          onClose={() => setShowDevDeleteModal(false)}
        />
      )}

      {/* Tab Disguise Cloak Modal */}
      {showCloakSettings && (
        <TabCloakModal
          currentPreset={tabPreset}
          onSelectPreset={applyTabCloak}
          onClose={() => setShowCloakSettings(false)}
        />
      )}

      {/* Archive Backup & Restore Modal */}
      {showBackupModal && (
        <ArchiveBackupModal
          onClose={() => setShowBackupModal(false)}
          onRefreshGames={async () => {
            const reloaded = await getAllGamesFromDB();
            setGames(reloaded);
          }}
        />
      )}

      {/* Cloud Sync Firebase Modal */}
      {showCloudSyncModal && (
        <CloudSyncModal
          onClose={() => setShowCloudSyncModal(false)}
          onRefreshGames={(cloudGames) => {
            setGames(cloudGames);
          }}
        />
      )}

      {/* Static GitHub Pages Deploy Guide Modal */}
      {showDeployModal && (
        <GitHubDeployModal onClose={() => setShowDeployModal(false)} />
      )}

      {/* Filter Evasion & Countermeasures Modal */}
      {showEvasionModal && (
        <EvasionSettingsModal onClose={() => setShowEvasionModal(false)} />
      )}

      {/* Game Operations Hub (Copy List, Auto Ranker & Slop Filter) */}
      {showOperationsHub && (
        <GameOperationsHubModal
          games={games}
          onClose={() => setShowOperationsHub(false)}
          onUpdateBatchRankings={handleUpdateBatchRankings}
          onMoveGamesToSlop={handleMoveGamesToSlop}
          onClearAllGames={handleClearAllGames}
          initialTab={operationsHubInitialTab}
        />
      )}
    </div>
  );
}
