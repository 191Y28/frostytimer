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
import { GitHubDeployModal } from './components/GitHubDeployModal';
import { EvasionSettingsModal } from './components/EvasionSettingsModal';
import { DeveloperRenameModal } from './components/DeveloperRenameModal';
import { DeveloperDeleteModal } from './components/DeveloperDeleteModal';
import { GameItem } from './types';
import { DEFAULT_GAMES } from './utils/defaultGames';
import {
  getAllGamesFromDB,
  getGameByIdFromDB,
  saveGameToDB,
  saveMultipleGamesToDB,
  deleteGameFromDB,
  updateGameInDB,
  updateGameRankingInDB,
} from './utils/indexedDB';
import { sound } from './utils/audio';

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
  const [showDeployModal, setShowDeployModal] = useState<boolean>(false);
  const [showEvasionModal, setShowEvasionModal] = useState<boolean>(false);

  // Developer Mode
  const [isDevMode, setIsDevMode] = useState<boolean>(false);
  const [showDevRenameModal, setShowDevRenameModal] = useState<boolean>(false);
  const [showDevDeleteModal, setShowDevDeleteModal] = useState<boolean>(false);

  // Voting and Ranking Mode & Filter Type
  const [isVoteMode, setIsVoteMode] = useState<boolean>(false);
  const [filterType, setFilterType] = useState<'all' | 'popular' | 'favorites'>('all');
  const [isCopied, setIsCopied] = useState<boolean>(false);

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

    // Initialize games
    const loadGames = async () => {
      try {
        const storedGames = await getAllGamesFromDB();
        // Check if stored games contain legacy fillers
        const hasLegacyFillers = storedGames.some(
          (g) => g.id === 'frosty-snake' || g.id === 'frosty-flappy' || g.id === 'frosty-space' || g.id === 'frosty-slope'
        );

        if (hasLegacyFillers || storedGames.length === 0) {
          // Remove old fillers, preserve any custom user uploaded games, add new premier games
          const customUserGames = storedGames.filter((g) => g.type !== 'built-in' && !g.id.startsWith('frosty-'));
          const combined = [...DEFAULT_GAMES, ...customUserGames];
          await saveMultipleGamesToDB(combined);
          setGames(combined);
        } else {
          setGames(storedGames);
        }
      } catch (err) {
        // Fallback to in-memory defaults
        setGames(DEFAULT_GAMES);
      }
    };
    loadGames();
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
    const updated = [...newGames, ...games];
    setGames(updated);
    await saveMultipleGamesToDB(newGames);
  };

  const handleDeleteGame = async (id: string) => {
    setGames((prev) => prev.filter((g) => g.id !== id));
    await deleteGameFromDB(id);
  };

  const handleRenameGame = async (id: string, newTitle: string) => {
    const trimmed = newTitle.trim();
    if (!trimmed) return;
    const target = games.find((g) => g.id === id);
    if (!target) return;
    const updatedGame: GameItem = { ...target, title: trimmed };
    setGames((prev) => prev.map((g) => (g.id === id ? updatedGame : g)));
    await updateGameInDB(updatedGame);
  };

  const handleUpdateGames = async (updatedGames: GameItem[]) => {
    setGames(updatedGames);
    await saveMultipleGamesToDB(updatedGames);
  };

  const handleToggleFavorite = async (id: string) => {
    const target = games.find((g) => g.id === id);
    if (!target) return;
    const updatedGame: GameItem = { ...target, isFavorite: !target.isFavorite };
    setGames((prev) => prev.map((g) => (g.id === id ? updatedGame : g)));
    await updateGameInDB(updatedGame);
  };

  const handleUpdateRanking = async (id: string, ranking: number) => {
    setGames((prev) =>
      prev.map((g) => (g.id === id ? { ...g, ranking } : g))
    );
    await updateGameRankingInDB(id, ranking);
  };

  const handleCopyList = () => {
    let sorted = [...games];
    if (filterType === 'popular') {
      sorted.sort((a, b) => {
        const aScore = a.ranking ?? -1;
        const bScore = b.ranking ?? -1;
        if (bScore !== aScore) return bScore - aScore;
        return (b.playCount || 0) - (a.playCount || 0);
      });
    } else if (filterType === 'favorites') {
      sorted = sorted.filter((g) => !!g.isFavorite);
    } else {
      sorted.sort((a, b) => a.title.localeCompare(b.title));
    }

    const lines = sorted.map((game, index) => {
      const rankStr =
        game.ranking !== undefined && game.ranking !== null
          ? `★ ${game.ranking.toFixed(3)}/10`
          : `Unranked`;
      return `${index + 1}. ${game.title} — ${rankStr}`;
    });

    const headerTitle =
      filterType === 'popular'
        ? 'FROSTY GAMES - POPULAR / RANKED LIST'
        : filterType === 'favorites'
        ? 'FROSTY GAMES - FAVORITES'
        : 'FROSTY GAMES - ALPHABETICAL LIST (A-Z)';

    const fullText = `${headerTitle}\nTotal Games: ${sorted.length}\n${'='.repeat(40)}\n` + lines.join('\n');

    navigator.clipboard.writeText(fullText).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2500);
    });
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
            onDeleteGame={handleDeleteGame}
            onToggleFavorite={handleToggleFavorite}
            onOpenUpload={() => setShowUploadModal(true)}
            onUpdateGames={handleUpdateGames}
            onUpdateRanking={handleUpdateRanking}
            isVoteMode={isVoteMode}
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

      {/* Developer Delete Tool Modal (with confirmation) */}
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

      {/* Static GitHub Pages Deploy Guide Modal */}
      {showDeployModal && (
        <GitHubDeployModal onClose={() => setShowDeployModal(false)} />
      )}

      {/* Filter Evasion & Countermeasures Modal */}
      {showEvasionModal && (
        <EvasionSettingsModal onClose={() => setShowEvasionModal(false)} />
      )}
    </div>
  );
}
