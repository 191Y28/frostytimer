import fs from 'fs';
import path from 'path';

const BACKUP_PATH = path.resolve('frosty-archive-backup-2026-09-28.frosty.json');
const PUBLIC_PATH = path.resolve('public/frosty-archive-backup-2026-09-28.frosty.json');

async function fetchWithTimeout(url, headers, timeoutMs = 5000) {
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

async function fetchGameCode(driveId) {
  const urls = [
    `https://drive.usercontent.google.com/download?id=${driveId}&export=download&confirm=t`,
    `https://drive.google.com/uc?export=download&id=${driveId}&confirm=t`,
  ];

  const headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
    Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
  };

  for (const url of urls) {
    try {
      const text = await fetchWithTimeout(url, headers, 4000);
      if (text && text.length > 30 && !text.includes('Sign in - Google Accounts')) {
        if (text.includes('Google Drive - Virus scan warning') || text.includes('confirm=')) {
          const match = text.match(/confirm=([a-zA-Z0-9_-]+)/i) || text.match(/name="confirm"\s+value="([^"]+)"/i);
          if (match && match[1]) {
            const confirmedUrl = `https://drive.usercontent.google.com/download?id=${driveId}&export=download&confirm=${match[1]}`;
            const confirmedText = await fetchWithTimeout(confirmedUrl, headers, 4000);
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

function extractDriveId(url) {
  if (!url) return null;
  const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/) || url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  return match ? match[1] : null;
}

function sanitizeSimple(rawHtml) {
  if (!rawHtml) return '';
  let code = rawHtml;
  // Strip leading comments
  code = code.replace(/^(?:\s*<!--[\s\S]*?-->\s*)+/gi, '').trim();

  // CDATA unboxing
  if (code.includes('<![CDATA[')) {
    const cdataMatch = code.match(/<!\[CDATA\[([\s\S]*?)\]\]>/i);
    if (cdataMatch && cdataMatch[1] && cdataMatch[1].trim().length > 20) {
      code = cdataMatch[1].trim();
    }
  }

  // Strip Gadget XML tags
  code = code
    .replace(/<\/?Module[^>]*>/gi, '')
    .replace(/<\/?ModulePrefs[^>]*>/gi, '')
    .replace(/<\/?Content[^>]*>/gi, '')
    .replace(/<!\[CDATA\[/gi, '')
    .replace(/\]\]>/gi, '')
    .trim();

  // Strip leading comments again if exposed
  code = code.replace(/^(?:\s*<!--[\s\S]*?-->\s*)+/gi, '').trim();

  // Polyfills for Ruffle / EmuJS
  const lower = code.toLowerCase();
  const hasRuffleOrFlash = lower.includes('ruffle') || lower.includes('.swf') || lower.includes('<embed') || lower.includes('<object');
  if (hasRuffleOrFlash && !lower.includes('@ruffle-rs/ruffle') && !lower.includes('unpkg.com/@ruffle-rs')) {
    code = `<script src="https://unpkg.com/@ruffle-rs/ruffle"></script>\n` + code;
  }

  if ((lower.includes('window.gameconfig') || lower.includes('gameconfig')) && !lower.includes('loader.js') && !lower.includes('emujs')) {
    code += `\n<div id="emulator" style="width:100vw;height:100vh;position:absolute;top:0;left:0;background:#000;z-index:9999;"></div>\n<script src="https://cdn.jsdelivr.net/gh/ethanaobrien/emujs@main/loader.js"></script>\n`;
  }

  // Rewrite relative loader.js
  code = code.replace(/src=["'](?:\.\/)?loader\.js["']/gi, 'src="https://cdn.jsdelivr.net/gh/ethanaobrien/emujs@main/loader.js"');

  // Stubs for maeExportApis_
  const stubs = `<script>
  window.maeExportApis_ = window.maeExportApis_ || function() {};
  try { if (window.parent) window.parent.maeExportApis_ = window.parent.maeExportApis_ || function() {}; } catch(e){}
  window.gadgets = window.gadgets || { util: { registerOnLoadHandler: function(fn) { try { fn(); } catch(e){} } } };
</script>`;

  if (/<head[^>]*>/i.test(code)) {
    code = code.replace(/<head[^>]*>/i, `$&${stubs}`);
  } else if (/<html[^>]*>/i.test(code)) {
    code = code.replace(/<html[^>]*>/i, `$&<head>${stubs}</head>`);
  } else {
    code = `<!DOCTYPE html><html><head>${stubs}</head><body>${code}</body></html>`;
  }

  if (!/^\s*<!DOCTYPE\s+html/i.test(code)) {
    code = `<!DOCTYPE html>\n` + code;
  }

  return code;
}

async function run() {
  console.log('Reading ' + BACKUP_PATH);
  const data = JSON.parse(fs.readFileSync(BACKUP_PATH, 'utf-8'));
  const games = data.games || [];
  console.log(`Loaded ${games.length} games.`);

  const toDownload = games.filter(g => !g.codeOrData || g.codeOrData.length <= 50);
  console.log(`${toDownload.length} games need code downloaded.`);

  const CONCURRENCY = 40;
  let successCount = 0;
  let failCount = 0;

  for (let i = 0; i < toDownload.length; i += CONCURRENCY) {
    const chunk = toDownload.slice(i, i + CONCURRENCY);
    await Promise.all(chunk.map(async (g) => {
      const driveId = extractDriveId(g.driveUrl || '');
      if (!driveId) {
        failCount++;
        return;
      }
      const raw = await fetchGameCode(driveId);
      if (raw && raw.length > 20) {
        g.codeOrData = sanitizeSimple(raw);
        successCount++;
      } else {
        failCount++;
      }
    }));

    const processed = Math.min(i + CONCURRENCY, toDownload.length);
    console.log(`[${processed}/${toDownload.length}] Success: ${successCount}, Fail: ${failCount}`);

    // Save every 120 games
    if (i > 0 && i % 120 === 0) {
      console.log('Writing checkpoint to disk...');
      const out = JSON.stringify(data, null, 2);
      fs.writeFileSync(BACKUP_PATH, out);
      fs.writeFileSync(PUBLIC_PATH, out);
    }
  }

  console.log('Saving final packed catalog...');
  const finalJson = JSON.stringify(data, null, 2);
  fs.writeFileSync(BACKUP_PATH, finalJson);
  fs.writeFileSync(PUBLIC_PATH, finalJson);
  console.log(`COMPLETED! Packed ${successCount} games. Failed: ${failCount}`);
}

run().catch(console.error);
