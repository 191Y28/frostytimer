import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  initializeFirestore,
  getFirestore,
  collection,
  doc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  writeBatch,
  onSnapshot,
} from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';
import { GameItem } from '../types';

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const db = (() => {
  try {
    const dbId = firebaseConfig.firestoreDatabaseId || '(default)';
    return initializeFirestore(app, {
      experimentalAutoDetectLongPolling: true,
    }, dbId);
  } catch {
    return firebaseConfig.firestoreDatabaseId
      ? getFirestore(app, firebaseConfig.firestoreDatabaseId)
      : getFirestore(app);
  }
})();

const GAMES_COLLECTION = 'games';

let isQuotaExceeded = false;

export function getIsQuotaExceeded(): boolean {
  return isQuotaExceeded;
}

function handleFirestoreError(err: any, context: string) {
  const msg = err?.message || String(err);
  if (msg.includes('Quota limit exceeded') || err?.code === 'resource-exhausted') {
    isQuotaExceeded = true;
    console.warn(`Firestore Quota Limit Exceeded in [${context}]. Falling back seamlessly to local IndexedDB storage.`);
  } else {
    console.warn(`Firestore notice in [${context}]:`, msg);
  }
}

/**
 * Validate connection to Firestore at startup with fast timeout
 */
export async function testConnection(): Promise<boolean> {
  if (isQuotaExceeded) return false;
  try {
    const timeoutPromise = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error('Connection check timeout')), 2500)
    );
    await Promise.race([
      getDocs(collection(db, GAMES_COLLECTION)),
      timeoutPromise
    ]);
    return true;
  } catch (error) {
    handleFirestoreError(error, 'testConnection');
    return false;
  }
}

/**
 * Fetch all games metadata from Firestore cloud
 */
export async function getAllGamesFromFirestore(): Promise<GameItem[]> {
  if (isQuotaExceeded) return [];
  try {
    const colRef = collection(db, GAMES_COLLECTION);
    const snapshot = await getDocs(colRef);
    const games: GameItem[] = [];
    snapshot.forEach((d) => {
      const data = d.data() as GameItem;
      games.push({ ...data, id: data.id || d.id });
    });
    return games;
  } catch (err) {
    handleFirestoreError(err, 'getAllGamesFromFirestore');
    return [];
  }
}

/**
 * Save a single game to Firestore (metadata only, zero memory bloat)
 */
export async function saveGameToFirestore(game: GameItem): Promise<void> {
  if (isQuotaExceeded) return;
  try {
    const cleanGame = sanitizeGameData(game);
    await setDoc(doc(db, GAMES_COLLECTION, game.id), cleanGame);
  } catch (err) {
    handleFirestoreError(err, `saveGameToFirestore:${game.id}`);
  }
}

/**
 * Update game ranking directly in Firestore
 */
export async function updateGameRankingInFirestore(id: string, ranking: number): Promise<void> {
  if (isQuotaExceeded) return;
  try {
    const gameDocRef = doc(db, GAMES_COLLECTION, id);
    await updateDoc(gameDocRef, { ranking });
  } catch (err) {
    handleFirestoreError(err, `updateGameRankingInFirestore:${id}`);
  }
}

/**
 * Save multiple games in batches of 400 (Firestore max 500 per batch)
 */
export async function saveMultipleGamesToFirestore(games: GameItem[]): Promise<void> {
  if (isQuotaExceeded || !games.length) return;
  try {
    const CHUNK_SIZE = 400;
    for (let i = 0; i < games.length; i += CHUNK_SIZE) {
      if (isQuotaExceeded) break;
      const chunk = games.slice(i, i + CHUNK_SIZE);
      const batch = writeBatch(db);
      for (const game of chunk) {
        const cleanGame = sanitizeGameData(game);
        batch.set(doc(db, GAMES_COLLECTION, game.id), cleanGame);
      }
      await batch.commit();
    }
  } catch (err) {
    handleFirestoreError(err, 'saveMultipleGamesToFirestore');
  }
}

/**
 * Delete a game from Firestore
 */
export async function deleteGameFromFirestore(id: string): Promise<void> {
  if (isQuotaExceeded) return;
  try {
    await deleteDoc(doc(db, GAMES_COLLECTION, id));
  } catch (err) {
    handleFirestoreError(err, `deleteGameFromFirestore:${id}`);
  }
}

/**
 * Clear all games from Firestore (batches of 300 until completely empty)
 */
export async function clearAllGamesFromFirestore(): Promise<void> {
  if (isQuotaExceeded) return;
  try {
    const colRef = collection(db, GAMES_COLLECTION);
    let snapshot = await getDocs(colRef);
    while (snapshot.docs.length > 0 && !isQuotaExceeded) {
      const docs = snapshot.docs;
      const CHUNK_SIZE = 300;
      for (let i = 0; i < docs.length; i += CHUNK_SIZE) {
        const chunk = docs.slice(i, i + CHUNK_SIZE);
        const batch = writeBatch(db);
        for (const d of chunk) {
          batch.delete(d.ref);
        }
        await batch.commit();
      }
      snapshot = await getDocs(colRef);
    }
  } catch (err) {
    handleFirestoreError(err, 'clearAllGamesFromFirestore');
  }
}

/**
 * Subscribe to real-time game updates from Firestore
 */
export function subscribeToGames(callback: (games: GameItem[]) => void): () => void {
  if (isQuotaExceeded) {
    return () => {};
  }
  const colRef = collection(db, GAMES_COLLECTION);
  return onSnapshot(
    colRef,
    (snapshot) => {
      if (isQuotaExceeded) return;
      const games: GameItem[] = [];
      snapshot.forEach((d) => {
        const data = d.data() as GameItem;
        games.push({ ...data, id: data.id || d.id });
      });
      callback(games);
    },
    (err) => {
      handleFirestoreError(err, 'subscribeToGames');
    }
  );
}

/**
 * Remove undefined values that Firestore rejects
 * Store codeOrData up to 800KB safely in Firestore (well below 1MB limit)
 */
function sanitizeGameData(game: GameItem): Record<string, any> {
  const result: Record<string, any> = {};
  for (const [key, value] of Object.entries(game)) {
    if (key === 'codeOrData') {
      if (typeof value === 'string' && value.length < 800000) {
        result[key] = value;
      }
      continue;
    }
    if (value !== undefined) {
      result[key] = value;
    }
  }
  return result;
}
