/**
 * IndexedDB storage engine for Frosty Arcade
 * Keeps games safely stored client-side in the browser.
 * Compatible with static GitHub Pages deployments.
 */

import { GameItem } from '../types';

const DB_NAME = 'frosty_arcade_db';
const DB_VERSION = 1;
const STORE_GAMES = 'games';
const STORE_SETTINGS = 'settings';

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_GAMES)) {
        db.createObjectStore(STORE_GAMES, { keyPath: 'id' });
      }
      if (!db.objectStoreNames.contains(STORE_SETTINGS)) {
        db.createObjectStore(STORE_SETTINGS, { keyPath: 'key' });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function saveGameToDB(game: GameItem): Promise<void> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_GAMES, 'readwrite');
    const store = tx.objectStore(STORE_GAMES);
    const req = store.put(game);
    req.onsuccess = () => resolve();
    req.onerror = () => reject(req.error);
  });
}

export async function saveMultipleGamesToDB(games: GameItem[]): Promise<void> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_GAMES, 'readwrite');
    const store = tx.objectStore(STORE_GAMES);
    for (const game of games) {
      store.put(game);
    }
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

export async function getGameByIdFromDB(id: string): Promise<GameItem | null> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_GAMES, 'readonly');
    const store = tx.objectStore(STORE_GAMES);
    const req = store.get(id);
    req.onsuccess = () => resolve(req.result || null);
    req.onerror = () => reject(req.error);
  });
}

export async function getAllGamesFromDB(): Promise<GameItem[]> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_GAMES, 'readonly');
    const store = tx.objectStore(STORE_GAMES);
    const req = store.getAll();
    req.onsuccess = () => {
      // Strip heavy codeOrData from in-memory library to keep React V8 heap < 10 MB
      const list = (req.result || []).map((item: GameItem) => {
        const { codeOrData, ...metadata } = item;
        return metadata as GameItem;
      });
      resolve(list);
    };
    req.onerror = () => reject(req.error);
  });
}

export async function deleteGameFromDB(id: string): Promise<void> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_GAMES, 'readwrite');
    const store = tx.objectStore(STORE_GAMES);
    const req = store.delete(id);
    req.onsuccess = () => resolve();
    req.onerror = () => reject(req.error);
  });
}

export async function updateGameInDB(game: GameItem): Promise<void> {
  return saveGameToDB(game);
}

export async function updateGameRankingInDB(id: string, ranking: number): Promise<void> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_GAMES, 'readwrite');
    const store = tx.objectStore(STORE_GAMES);
    const getReq = store.get(id);
    getReq.onsuccess = () => {
      const existing = getReq.result;
      if (existing) {
        existing.ranking = ranking;
        store.put(existing);
      }
      resolve();
    };
    getReq.onerror = () => reject(getReq.error);
  });
}

export async function getStorageStats(): Promise<{ count: number; totalBytes: number }> {
  const games = await getAllGamesFromDB();
  let totalBytes = 0;
  for (const g of games) {
    totalBytes += g.fileSize || 0;
  }
  return {
    count: games.length,
    totalBytes,
  };
}
