/**
 * Google Drive / Link Extractor Batch Importer for Ultimate Game Stash
 * Converts Google Drive share links, direct download links, or pasted URL text
 * into playable offline/online games and syncs them directly to Firebase Firestore.
 */

import { GameItem, CoverTheme } from '../types';
import { cleanTitleFromFilename } from './gameInspector';

export interface ExtractedGameLink {
  id: string;
  originalText: string;
  title: string;
  url: string;
  driveFileId?: string;
  downloadUrl?: string;
  status: 'pending' | 'downloading' | 'ready' | 'error';
  progress?: number;
  errorMessage?: string;
  gameData?: string;
  fileSize?: number;
}

/**
 * Extracts Google Drive file ID from URLs like:
 * - https://drive.google.com/file/d/1G1RuNSeOepgR87vfZYuQy3Q8Lg9EnDa_/view?usp=sharing
 * - https://drive.google.com/uc?id=1G1RuNSeOepgR87vfZYuQy3Q8Lg9EnDa_
 * - 1G1RuNSeOepgR87vfZYuQy3Q8Lg9EnDa_
 */
export function extractDriveFileId(urlOrText: string): string | null {
  if (!urlOrText) return null;
  const match =
    urlOrText.match(/\/d\/([a-zA-Z0-9_-]{20,})/i) ||
    urlOrText.match(/[?&]id=([a-zA-Z0-9_-]{20,})/i) ||
    urlOrText.match(/([a-zA-Z0-9_-]{28,})/);
  return match ? match[1] : null;
}

/**
 * Formats a clean direct-download URL from a Google Drive File ID
 */
export function getDriveDirectDownloadUrls(fileId: string): string[] {
  return [
    `https://drive.usercontent.google.com/download?id=${fileId}&export=download&confirm=t`,
    `https://drive.google.com/uc?export=download&id=${fileId}`,
    `https://docs.google.com/uc?export=download&id=${fileId}`,
  ];
}

/**
 * Extracts the real human-typed game title before any lazy html filenames
 * E.g. "Armor Mayhem 2: clarmormayhem2.html:" -> "Armor Mayhem 2"
 * "Duck Life 4 (clducklife4.html):" -> "Duck Life 4"
 */
export function extractBestTitleFromPrefix(prefix: string): string {
  if (!prefix) return '';

  // Remove trailing colons, dashes, tabs, arrows, equals
  let cleaned = prefix.replace(/[:–—>=|\t\s]+$/, '').trim();

  // Split by colons, tabs, dashes, or pipes
  const segments = cleaned
    .split(/[:–—|\t]|\s+-\s+/)
    .map((s) => s.trim())
    .filter(Boolean);

  if (segments.length === 0) return '';

  // 1. If any segment is a clean human name (e.g. "Armor Mayhem 2" or "Duck Life 4"), prioritize it!
  for (const seg of segments) {
    const withoutParens = seg
      .replace(/\s*\([^)]*\.html?\)/i, '')
      .replace(/\s*\[[^\]]*\.html?\]/i, '')
      .replace(/[:–—>=]/g, '')
      .trim();

    if (
      withoutParens.length > 1 &&
      !withoutParens.toLowerCase().endsWith('.html') &&
      !withoutParens.toLowerCase().endsWith('.swf') &&
      !/^cl[a-z0-9]/i.test(withoutParens)
    ) {
      return cleanTitleFromFilename(withoutParens);
    }
  }

  // 2. Otherwise clean the first segment
  const first = segments[0]
    .replace(/\s*\([^)]*\.html?\)/i, '')
    .replace(/[:–—>=]/g, '')
    .trim();
  return cleanTitleFromFilename(first);
}

/**
 * Parses raw text or rich HTML extracted from Google Docs / Link Grabber extension
 * Accurately extracts the human-typed name BEFORE the colon (':')
 * E.g. "Jacksmith: cljackssmithencryptedorsmthn.html" -> Title: "Jacksmith"
 * "Learn to Fly 3 (debug): clLearntoFly3Debug.html" -> Title: "Learn to Fly 3 (debug)"
 */
export function parseExtractedLinks(rawText: string, htmlClipboard?: string): ExtractedGameLink[] {
  const results: ExtractedGameLink[] = [];
  const seenUrls = new Set<string>();

  // 1. First priority: Parse Google Docs rich HTML clipboard
  if (htmlClipboard && htmlClipboard.includes('<a') && typeof DOMParser !== 'undefined') {
    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlClipboard, 'text/html');
      const anchors = Array.from(doc.querySelectorAll('a[href]'));

      for (const a of anchors) {
        const url = a.getAttribute('href')?.trim() || '';
        if (!url || seenUrls.has(url)) continue;
        if (!url.includes('drive.google.com') && !url.startsWith('http')) continue;

        // Container paragraph or list item in Google Docs
        const container = a.closest('p, li, tr, div, td') || a.parentElement;
        const fullText = container ? container.textContent?.trim() || '' : a.textContent?.trim() || '';

        let title = '';
        // Extract text strictly BEFORE the first colon ':'
        if (fullText.includes(':')) {
          title = fullText.split(':')[0].trim();
        } else if (fullText.includes('–') || fullText.includes('—') || fullText.includes(' - ')) {
          title = fullText.split(/[\–\—]|\s+\-\s+/)[0].trim();
        } else if (fullText.includes('\t')) {
          title = fullText.split('\t')[0].trim();
        } else {
          // If no colon in full text, check text node immediately before the <a> tag
          let prevText = a.previousSibling?.textContent?.trim() || '';
          if (prevText) {
            title = prevText.replace(/[:–—\s]+$/, '').trim();
          }
        }

        // If still no title before colon, fallback to anchor text
        if (!title) {
          title = cleanTitleFromFilename(a.textContent?.trim() || '');
        }

        seenUrls.add(url);
        const driveId = extractDriveFileId(url);
        results.push(createExtractedItem(fullText || title, title, url, driveId));
      }

      if (results.length > 0) {
        return results;
      }
    } catch (err) {
      console.warn('HTML clipboard parsing error:', err);
    }
  }

  // 2. Parse plain text line by line
  const lines = rawText.split('\n');

  for (let i = 0; i < lines.length; i++) {
    const trimmed = lines[i].trim();
    if (!trimmed) continue;

    // A. Check for markdown link [Title](URL)
    const mdMatch = trimmed.match(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/i);
    if (mdMatch) {
      const title = mdMatch[1].trim();
      const url = mdMatch[2].trim();
      if (!seenUrls.has(url)) {
        seenUrls.add(url);
        const driveId = extractDriveFileId(url);
        results.push(createExtractedItem(trimmed, title, url, driveId));
      }
      continue;
    }

    // B. Check for line containing a URL
    const urlMatch = trimmed.match(/(https?:\/\/[^\s"'<>]+)/i);
    if (urlMatch) {
      const url = urlMatch[1].trim();
      if (!seenUrls.has(url)) {
        seenUrls.add(url);
        const driveId = extractDriveFileId(url);

        // Get everything BEFORE the URL
        const beforeUrl = trimmed.substring(0, trimmed.indexOf(url)).trim();

        let title = '';
        // Take everything BEFORE the FIRST colon!
        // E.g. "Jacksmith: cljackssmithencryptedorsmthn.html:" -> "Jacksmith"
        if (beforeUrl.includes(':')) {
          title = beforeUrl.split(':')[0].trim();
        } else if (beforeUrl.includes('\t')) {
          title = beforeUrl.split('\t')[0].trim();
        } else if (beforeUrl.includes(' – ') || beforeUrl.includes(' — ') || beforeUrl.includes(' - ')) {
          title = beforeUrl.split(/[\–\—]|\s+\-\s+/)[0].trim();
        } else if (beforeUrl) {
          title = beforeUrl.replace(/[:–—>=]/g, '').trim();
        }

        // If prefix was empty, check if previous line had the title
        if (!title && i > 0 && !lines[i - 1].trim().startsWith('http')) {
          const prevLine = lines[i - 1].trim();
          title = prevLine.includes(':') ? prevLine.split(':')[0].trim() : prevLine;
        }

        const finalTitle = title || (driveId ? `Game (${driveId.slice(0, 6)})` : 'Uploaded Game');
        results.push(createExtractedItem(trimmed, finalTitle, url, driveId));
      }
      continue;
    }

    // C. Multi-line alternating (Line i: "Jacksmith: cljackssmithencryptedorsmthn.html", Line i+1: URL)
    if (!trimmed.startsWith('http')) {
      if (i + 1 < lines.length && /^https?:\/\//i.test(lines[i + 1].trim())) {
        const nextUrl = lines[i + 1].trim();
        if (!seenUrls.has(nextUrl)) {
          seenUrls.add(nextUrl);
          const driveId = extractDriveFileId(nextUrl);
          const title = trimmed.includes(':') ? trimmed.split(':')[0].trim() : trimmed;
          results.push(createExtractedItem(trimmed, title || trimmed, nextUrl, driveId));
          i++;
          continue;
        }
      }
    }
  }

  return results;
}

function createExtractedItem(
  originalText: string,
  title: string,
  url: string,
  driveId: string | null
): ExtractedGameLink {
  // Use smart title cleaner (handles "clarmormayhem2.html" -> "Armor Mayhem 2", "cl10bullets" -> "10 Bullets", etc.)
  let cleanTitle = cleanTitleFromFilename(title);

  return {
    id: `link_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    originalText,
    title: cleanTitle || 'Untitled Game',
    url,
    driveFileId: driveId || undefined,
    downloadUrl: driveId ? getDriveDirectDownloadUrls(driveId)[0] : url,
    status: 'pending',
  };
}

/**
 * Downloads game HTML from Google Drive or Direct URL
 * Prioritizes fast server-side download proxy, falling back to multi-tier CORS proxies
 */
export async function downloadGameContent(
  item: ExtractedGameLink
): Promise<{ content: string; detectedTitle?: string }> {
  // 1. First attempt: Dedicated Server Proxy endpoint
  try {
    const proxyRes = await fetch('/api/download-game', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: item.url,
        driveFileId: item.driveFileId,
      }),
    });

    if (proxyRes.ok) {
      const data = await proxyRes.json();
      if (data.success && data.content && data.content.length > 30) {
        return processGameHtml(data.content, data.detectedTitle);
      }
    }
  } catch {
    // Continue to client-side fallback if server proxy is unavailable
  }

  // 2. Client-side fallback: Fast concurrent racing across direct & CORS proxies
  const urlsToTry: string[] = [];

  if (item.driveFileId) {
    const directUrls = getDriveDirectDownloadUrls(item.driveFileId);
    for (const dUrl of directUrls) {
      urlsToTry.push(dUrl);
      urlsToTry.push(`https://corsproxy.io/?url=${encodeURIComponent(dUrl)}`);
      urlsToTry.push(`https://api.allorigins.win/raw?url=${encodeURIComponent(dUrl)}`);
      urlsToTry.push(`https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(dUrl)}`);
    }
  } else {
    urlsToTry.push(item.url);
    urlsToTry.push(`https://corsproxy.io/?url=${encodeURIComponent(item.url)}`);
    urlsToTry.push(`https://api.allorigins.win/raw?url=${encodeURIComponent(item.url)}`);
    urlsToTry.push(`https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(item.url)}`);
  }

  const fetchSingle = async (url: string): Promise<{ content: string; detectedTitle?: string }> => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3500);
    try {
      const res = await fetch(url, { signal: controller.signal });
      clearTimeout(timeoutId);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const text = await res.text();
      if (!text || text.length < 30 || text.includes('Error 404 (Not Found)')) {
        throw new Error('Invalid response');
      }
      if (text.includes('Google Drive - Virus scan warning') && item.driveFileId) {
        const confirmMatch =
          text.match(/confirm=([a-zA-Z0-9_-]+)/i) ||
          text.match(/name="confirm"\s+value="([^"]+)"/i);
        if (confirmMatch && confirmMatch[1]) {
          const confirmUrl = `https://drive.usercontent.google.com/download?id=${item.driveFileId}&export=download&confirm=${confirmMatch[1]}`;
          const confirmRes = await fetch(`https://corsproxy.io/?url=${encodeURIComponent(confirmUrl)}`);
          if (confirmRes.ok) {
            const confirmedText = await confirmRes.text();
            if (confirmedText.length > 50) {
              return processGameHtml(confirmedText);
            }
          }
        }
      }
      return processGameHtml(text);
    } catch (e) {
      clearTimeout(timeoutId);
      throw e;
    }
  };

  try {
    return await Promise.any(urlsToTry.slice(0, 4).map(fetchSingle));
  } catch {
    if (urlsToTry.length > 4) {
      return await Promise.any(urlsToTry.slice(4).map(fetchSingle));
    }
    throw new Error(`Could not download file from link: ${item.title}`);
  }
}

/**
 * Extracts real title from HTML <title> tag if available and sanitizes content
 */
function processGameHtml(
  html: string,
  preDetectedTitle?: string
): { content: string; detectedTitle?: string } {
  let detectedTitle = preDetectedTitle;

  if (!detectedTitle) {
    const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
    if (titleMatch && titleMatch[1]) {
      const raw = titleMatch[1].trim();
      if (!raw.toLowerCase().includes('google drive') && !raw.toLowerCase().includes('document')) {
        detectedTitle = raw.replace(/[-|].*$/, '').trim();
      }
    }
  }

  return {
    content: html,
    detectedTitle,
  };
}
