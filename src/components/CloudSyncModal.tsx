/**
 * Cloud Sync & Firebase Firestore Bridge
 * Direct live connection to Firebase Firestore database.
 */

import React, { useState, useEffect } from 'react';
import { X, Cloud, RefreshCw, Check, Database, Shield, CheckCircle2 } from 'lucide-react';
import { getStorageStats, getAllGamesFromDB, saveMultipleGamesToDB } from '../utils/indexedDB';
import {
  getAllGamesFromFirestore,
  saveMultipleGamesToFirestore,
  testConnection,
  getIsQuotaExceeded
} from '../utils/firebaseStorage';
import firebaseConfig from '../../firebase-applet-config.json';
import { sound } from '../utils/audio';
import { GameItem } from '../types';

interface CloudSyncModalProps {
  onClose: () => void;
  onRefreshGames?: (games: GameItem[]) => void;
}

export const CloudSyncModal: React.FC<CloudSyncModalProps> = ({ onClose, onRefreshGames }) => {
  const [stats, setStats] = useState<{ count: number; totalBytes: number }>({ count: 0, totalBytes: 0 });
  const [cloudCount, setCloudCount] = useState<number | null>(null);
  const [syncStatus, setSyncStatus] = useState<string | null>(null);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [isConnected, setIsConnected] = useState<boolean>(true);

  useEffect(() => {
    getStorageStats().then(setStats);
    testConnection().then((connected) => {
      setIsConnected(connected);
      if (connected) {
        getAllGamesFromFirestore().then((cloudGames) => {
          setCloudCount(cloudGames.length);
        });
      }
    });
  }, []);

  // Force push all local games into Firestore cloud
  const handlePushToCloud = async () => {
    sound.playKeypress();
    setIsSyncing(true);
    setSyncStatus('Pushing all local games to Firebase Firestore...');

    try {
      const localGames = await getAllGamesFromDB();
      await saveMultipleGamesToFirestore(localGames);
      const updatedCloud = await getAllGamesFromFirestore();
      setCloudCount(updatedCloud.length);
      sound.playUnlock();
      setSyncStatus(`Successfully backed up ${localGames.length} games to Cloud Firestore!`);
    } catch (err) {
      console.error(err);
      setSyncStatus('Failed to upload to Firestore. Check network connection.');
    } finally {
      setIsSyncing(false);
    }
  };

  // Force pull all games from Firestore cloud to local storage
  const handlePullFromCloud = async () => {
    sound.playKeypress();
    setIsSyncing(true);
    setSyncStatus('Fetching games from Firebase Firestore Cloud...');

    try {
      const cloudGames = await getAllGamesFromFirestore();
      if (cloudGames.length > 0) {
        await saveMultipleGamesToDB(cloudGames);
        const newStats = await getStorageStats();
        setStats(newStats);
        setCloudCount(cloudGames.length);
        if (onRefreshGames) {
          onRefreshGames(cloudGames);
        }
        sound.playUnlock();
        setSyncStatus(`Successfully pulled ${cloudGames.length} games from Cloud Firestore!`);
      } else {
        setSyncStatus('Firestore is currently empty. Upload games first.');
      }
    } catch (err) {
      console.error(err);
      setSyncStatus('Failed to fetch from Firestore.');
    } finally {
      setIsSyncing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg p-6 shadow-2xl">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Cloud className="w-5 h-5 text-cyan-400" />
            <h2 className="text-base font-bold text-white tracking-tight">
              Firebase Firestore Cloud Sync
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

        {/* Live Cloud Status Banner */}
        {getIsQuotaExceeded() ? (
          <div className="mt-4 p-4 bg-amber-950/40 border border-amber-800/80 rounded-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-semibold text-amber-300">
                  Firestore Daily Quota Limit Reached
                </span>
              </div>
              <span className="text-[11px] font-mono text-amber-400 bg-amber-950/80 px-2 py-0.5 rounded border border-amber-800">
                IndexedDB Active
              </span>
            </div>
            <p className="text-[11px] text-slate-300 mt-2 leading-relaxed">
              Google Cloud Firestore reached its free daily read/write quota for today. Your games and updates are stored safely in local browser IndexedDB and will sync to Cloud when quota resets.
            </p>
          </div>
        ) : (
          <div className="mt-4 p-4 bg-emerald-950/30 border border-emerald-800/60 rounded-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-semibold text-emerald-300">
                  Connected to Firebase Project
                </span>
              </div>
              <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800">
                {firebaseConfig.projectId}
              </span>
            </div>
            <p className="text-[11px] text-slate-400 mt-2 leading-relaxed">
              All newly uploaded games, titles, and rankings are automatically mirrored to Firebase Firestore so they survive browser cache cleans, incognito resets, or hard reloads.
            </p>
          </div>
        )}

        {/* Storage Comparison */}
        <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
          <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800">
            <span className="text-slate-400 flex items-center gap-1.5 mb-1">
              <Database className="w-3.5 h-3.5 text-cyan-400" />
              <span>Local Browser Games</span>
            </span>
            <span className="text-base font-bold text-white font-mono">{stats.count} games</span>
            <span className="text-[10px] text-slate-500 block mt-0.5">
              {(stats.totalBytes / 1024).toFixed(1)} KB stored locally
            </span>
          </div>

          <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800">
            <span className="text-slate-400 flex items-center gap-1.5 mb-1">
              <Cloud className="w-3.5 h-3.5 text-emerald-400" />
              <span>Firestore Cloud Games</span>
            </span>
            <span className="text-base font-bold text-emerald-300 font-mono">
              {cloudCount !== null ? `${cloudCount} games` : 'Checking...'}
            </span>
            <span className="text-[10px] text-slate-500 block mt-0.5">
              Synced to Google Cloud
            </span>
          </div>
        </div>

        {/* Manual Sync Actions */}
        <div className="mt-4 space-y-2">
          <div className="flex gap-2">
            <button
              onClick={handlePushToCloud}
              disabled={isSyncing}
              className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/40 text-cyan-200 text-xs font-semibold rounded-lg transition-colors"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
              <span>Push Local to Cloud</span>
            </button>

            <button
              onClick={handlePullFromCloud}
              disabled={isSyncing}
              className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 text-emerald-200 text-xs font-semibold rounded-lg transition-colors"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
              <span>Pull Cloud to Local</span>
            </button>
          </div>
        </div>

        {syncStatus && (
          <div className="mt-3 p-2.5 bg-cyan-950/40 border border-cyan-800/60 rounded-lg text-xs text-cyan-200 flex items-center gap-2">
            <Check className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>{syncStatus}</span>
          </div>
        )}

        <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-500">
          <span>Real-time listener is active</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold rounded-lg transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
