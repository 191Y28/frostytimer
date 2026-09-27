import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  doc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  writeBatch,
  onSnapshot,
  getDocFromServer
} from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';
import { GameItem } from '../types';

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const db = firebaseConfig.firestoreDatabaseId
  ? getFirestore(app, firebaseConfig.firestoreDatabaseId)
  : getFirestore(app);

const GAMES_COLLECTION = 'games';

/**
 * Validate connection to Firestore at startup
 */
export async function testConnection(): Promise<boolean> {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
    return true;
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.warn('Firestore is operating in offline mode.');
    }
    return false;
  }
}

/**
 * Fetch all games metadata from Firestore cloud
 */
export async function getAllGamesFromFirestore(): Promise<GameItem[]> {
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
    console.error('Error fetching games from Firestore:', err);
    return [];
  }
}

/**
 * Save a single game to Firestore (metadata only, zero memory bloat)
 */
export async function saveGameToFirestore(game: GameItem): Promise<void> {
  try {
    const cleanGame = sanitizeGameData(game);
    await setDoc(doc(db, GAMES_COLLECTION, game.id), cleanGame);
  } catch (err) {
    console.error(`Error saving game ${game.id} to Firestore:`, err);
  }
}

/**
 * Update game ranking directly in Firestore
 */
export async function updateGameRankingInFirestore(id: string, ranking: number): Promise<void> {
  try {
    const gameDocRef = doc(db, GAMES_COLLECTION, id);
    await updateDoc(gameDocRef, { ranking });
  } catch (err) {
    console.error(`Error updating ranking for ${id} in Firestore:`, err);
  }
}

/**
 * Save multiple games in batches of 400 (Firestore max 500 per batch)
 */
export async function saveMultipleGamesToFirestore(games: GameItem[]): Promise<void> {
  if (!games.length) return;
  try {
    const CHUNK_SIZE = 400;
    for (let i = 0; i < games.length; i += CHUNK_SIZE) {
      const chunk = games.slice(i, i + CHUNK_SIZE);
      const batch = writeBatch(db);
      for (const game of chunk) {
        const cleanGame = sanitizeGameData(game);
        batch.set(doc(db, GAMES_COLLECTION, game.id), cleanGame);
      }
      await batch.commit();
    }
  } catch (err) {
    console.error('Error saving batch games to Firestore:', err);
  }
}

/**
 * Delete a game from Firestore
 */
export async function deleteGameFromFirestore(id: string): Promise<void> {
  try {
    await deleteDoc(doc(db, GAMES_COLLECTION, id));
  } catch (err) {
    console.error(`Error deleting game ${id} from Firestore:`, err);
  }
}

/**
 * Clear all games from Firestore (batches of 300 until completely empty)
 */
export async function clearAllGamesFromFirestore(): Promise<void> {
  try {
    const colRef = collection(db, GAMES_COLLECTION);
    let snapshot = await getDocs(colRef);
    while (snapshot.docs.length > 0) {
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
    console.error('Error clearing all games from Firestore:', err);
  }
}

/**
 * Subscribe to real-time game updates from Firestore
 */
export function subscribeToGames(callback: (games: GameItem[]) => void): () => void {
  const colRef = collection(db, GAMES_COLLECTION);
  return onSnapshot(
    colRef,
    (snapshot) => {
      const games: GameItem[] = [];
      snapshot.forEach((d) => {
        const data = d.data() as GameItem;
        games.push({ ...data, id: data.id || d.id });
      });
      callback(games);
    },
    (err) => {
      console.warn('Firestore subscription error (will rely on local/direct fetch):', err);
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
