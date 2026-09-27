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

let cachedDBPromise: Promise<IDBDatabase> | null = null;

function openDB(): Promise<IDBDatabase> {
  if (cachedDBPromise) {
    return cachedDBPromise;
  }

  cachedDBPromise = new Promise((resolve, reject) => {
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

    request.onsuccess = () => {
      const db = request.result;
      db.onclose = () => {
        cachedDBPromise = null;
      };
      db.onerror = () => {
        cachedDBPromise = null;
      };
      resolve(db);
    };

    request.onerror = () => {
      cachedDBPromise = null;
      reject(request.error);
    };
  });

  return cachedDBPromise;
}

// Queue write operations sequentially to prevent transaction collisions and "transaction has finished" aborts
let writeQueue: Promise<any> = Promise.resolve();
function runInWriteQueue<T>(task: () => Promise<T>): Promise<T> {
  const result = writeQueue.then(task, task);
  writeQueue = result.catch(() => {});
  return result;
}

function sanitizeForIDB(game: GameItem): GameItem {
  if (!game || typeof game !== 'object') {
    return {
      id: `game_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
      title: 'Unknown Game',
      type: 'html',
      coverTheme: 'iceberg',
    } as GameItem;
  }

  const safeId = game.id || `game_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
  const clean: Record<string, any> = { id: safeId };

  for (const [k, v] of Object.entries(game)) {
    if (v !== undefined && typeof v !== 'function') {
      clean[k] = v;
    }
  }

  return clean as GameItem;
}

export async function saveGameToDB(game: GameItem): Promise<void> {
  return runInWriteQueue(async () => {
    const cleanGame = sanitizeForIDB(game);
    const db = await openDB();
    return new Promise((resolve, reject) => {
      try {
        const tx = db.transaction(STORE_GAMES, 'readwrite');
        const store = tx.objectStore(STORE_GAMES);

        tx.oncomplete = () => resolve();
        tx.onerror = () => reject(tx.error);
        tx.onabort = () => reject(tx.error || new Error('Transaction aborted'));

        store.put(cleanGame);
      } catch (err) {
        reject(err);
      }
    });
  });
}

export async function saveMultipleGamesToDB(games: GameItem[]): Promise<void> {
  if (!games || games.length === 0) return;

  return runInWriteQueue(async () => {
    const db = await openDB();
    // Batch in chunks of 50 to prevent single-transaction timeout or resource exhaustion
    const CHUNK_SIZE = 50;

    for (let i = 0; i < games.length; i += CHUNK_SIZE) {
      const chunk = games.slice(i, i + CHUNK_SIZE);

      await new Promise<void>((resolve, reject) => {
        try {
          const tx = db.transaction(STORE_GAMES, 'readwrite');
          const store = tx.objectStore(STORE_GAMES);

          tx.oncomplete = () => resolve();
          tx.onerror = () => reject(tx.error);
          tx.onabort = () => reject(tx.error || new Error('Transaction aborted'));

          for (const game of chunk) {
            if (game) {
              store.put(sanitizeForIDB(game));
            }
          }
        } catch (err) {
          reject(err);
        }
      }).catch(async (err) => {
        console.warn('Batch chunk put encountered error, falling back to individual puts:', err);
        // Fallback: put items one-by-one so one corrupted game does not fail the batch
        for (const game of chunk) {
          if (!game) continue;
          try {
            const cleanGame = sanitizeForIDB(game);
            await new Promise<void>((res, rej) => {
              try {
                const singleTx = db.transaction(STORE_GAMES, 'readwrite');
                singleTx.oncomplete = () => res();
                singleTx.onerror = () => rej(singleTx.error);
                singleTx.objectStore(STORE_GAMES).put(cleanGame);
              } catch (e) {
                rej(e);
              }
            });
          } catch {}
        }
      });
    }
  });
}

export async function getGameByIdFromDB(id: string): Promise<GameItem | null> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    try {
      const tx = db.transaction(STORE_GAMES, 'readonly');
      const store = tx.objectStore(STORE_GAMES);
      const req = store.get(id);
      req.onsuccess = () => resolve(req.result || null);
      req.onerror = () => reject(req.error);
    } catch (err) {
      reject(err);
    }
  });
}

export async function getAllGamesFromDB(): Promise<GameItem[]> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    try {
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
    } catch (err) {
      reject(err);
    }
  });
}

export async function deleteGameFromDB(id: string): Promise<void> {
  return runInWriteQueue(async () => {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      try {
        const tx = db.transaction(STORE_GAMES, 'readwrite');
        const store = tx.objectStore(STORE_GAMES);
        tx.oncomplete = () => resolve();
        tx.onerror = () => reject(tx.error);
        tx.onabort = () => reject(tx.error || new Error('Transaction aborted'));
        store.delete(id);
      } catch (err) {
        reject(err);
      }
    });
  });
}

export async function updateGameInDB(game: GameItem): Promise<void> {
  return saveGameToDB(game);
}

export async function updateGameRankingInDB(id: string, ranking: number): Promise<void> {
  const existing = await getGameByIdFromDB(id);
  if (existing) {
    existing.ranking = ranking;
    await saveGameToDB(existing);
  }
}

export async function clearAllGamesFromDB(): Promise<void> {
  return runInWriteQueue(async () => {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      try {
        const tx = db.transaction(STORE_GAMES, 'readwrite');
        const store = tx.objectStore(STORE_GAMES);
        tx.oncomplete = () => resolve();
        tx.onerror = () => reject(tx.error);
        tx.onabort = () => reject(tx.error || new Error('Transaction aborted'));
        store.clear();
      } catch (err) {
        reject(err);
      }
    });
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
