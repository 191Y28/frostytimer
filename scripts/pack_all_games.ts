import fs from 'fs';
import path from 'path';
import { sanitizeAndRepairHtml } from '../src/utils/eliteCodeSanitizer.js';

interface GameItem {
  id: string;
  title: string;
  driveUrl?: string;
  codeOrData?: string;
  [key: string]: any;
}

const BACKUP_PATH = path.resolve('frosty-archive-backup-2026-09-28.frosty.json');
const PUBLIC_PATH = path.resolve('public/frosty-archive-backup-2026-09-28.frosty.json');

async function fetchWithTimeout(url: string, headers: Record<string, string>, timeoutMs = 6000): Promise<string> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, { headers, signal: controller.signal });
    clearTimeout(timer);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const text = await res.text();
    return text;
  } catch (err) {
    clearTimeout(timer);
    throw err;
  }
}

async function fetchGameCode(driveId: string): Promise<string | null> {
  const urls = [
    `https://drive.usercontent.google.com/download?id=${driveId}&export=download&confirm=t`,
    `https://drive.google.com/uc?export=download&id=${driveId}&confirm=t`,
    `https://docs.google.com/uc?export=download&id=${driveId}`,
  ];

  const headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
    Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
  };

  for (const url of urls) {
    try {
      const text = await fetchWithTimeout(url, headers, 5000);
      if (text && text.length > 30 && !text.includes('Sign in - Google Accounts')) {
        // Check for virus scan warning with confirm token
        if (text.includes('Google Drive - Virus scan warning') || text.includes('confirm=')) {
          const match = text.match(/confirm=([a-zA-Z0-9_-]+)/i) || text.match(/name="confirm"\s+value="([^"]+)"/i);
          if (match && match[1]) {
            const confirmedUrl = `https://drive.usercontent.google.com/download?id=${driveId}&export=download&confirm=${match[1]}`;
            const confirmedText = await fetchWithTimeout(confirmedUrl, headers, 5000);
            if (confirmedText && confirmedText.length > 50) return confirmedText;
          }
        }
        return text;
      }
    } catch {
      // Try next candidate
    }
  }
  return null;
}

function extractDriveId(url: string): string | null {
  if (!url) return null;
  const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/) || url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  return match ? match[1] : null;
}

async function run() {
  console.log('Loading backup JSON...');
  const raw = fs.readFileSync(BACKUP_PATH, 'utf-8');
  const data = JSON.parse(raw);
  const games: GameItem[] = data.games || [];
  console.log(`Total games in catalog: ${games.length}`);

  let downloadedCount = 0;
  let alreadyHasCode = 0;
  let failedCount = 0;

  for (const g of games) {
    if (g.codeOrData && g.codeOrData.length > 50) {
      alreadyHasCode++;
    }
  }

  console.log(`Already packed: ${alreadyHasCode}, Remaining to pack: ${games.length - alreadyHasCode}`);

  const CONCURRENCY = 25;
  const toProcess = games.filter((g) => !g.codeOrData || g.codeOrData.length <= 50);

  for (let i = 0; i < toProcess.length; i += CONCURRENCY) {
    const batch = toProcess.slice(i, i + CONCURRENCY);
    await Promise.all(
      batch.map(async (game) => {
        const driveId = extractDriveId(game.driveUrl || '');
        if (!driveId) {
          failedCount++;
          return;
        }

        const rawCode = await fetchGameCode(driveId);
        if (rawCode && rawCode.length > 20) {
          const { repairedHtml } = sanitizeAndRepairHtml(rawCode);
          game.codeOrData = repairedHtml || rawCode;
          downloadedCount++;
        } else {
          failedCount++;
        }
      })
    );

    const progress = Math.min(i + CONCURRENCY, toProcess.length);
    console.log(`[${progress}/${toProcess.length}] Downloaded: ${downloadedCount}, Failed: ${failedCount}`);

    // Save intermediate progress every 200 games
    if (i % 200 === 0 && i > 0) {
      console.log('Saving intermediate progress to file...');
      const payload = JSON.stringify(data, null, 2);
      fs.writeFileSync(BACKUP_PATH, payload);
      fs.writeFileSync(PUBLIC_PATH, payload);
    }
  }

  console.log('Final save to disk...');
  const finalPayload = JSON.stringify(data, null, 2);
  fs.writeFileSync(BACKUP_PATH, finalPayload);
  fs.writeFileSync(PUBLIC_PATH, finalPayload);
  console.log(`DONE! Successfully packed ${downloadedCount} games. Total with code: ${alreadyHasCode + downloadedCount}, Failed: ${failedCount}`);
}

run().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
