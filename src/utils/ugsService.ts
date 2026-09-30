/**
 * UGS SingleFile Service
 * Manages fetching, caching, and launching 2,956 games from the
 * official bubbls/ugs-singlefile repository via jsDelivr CDN.
 * 100% Google Drive free, zero MCPS school account restrictions.
 */

export function normalizeUgsFileName(name: string): string {
  if (name.includes('.') && name.lastIndexOf('.') > 0) return name;
  return `${name}.html`;
}

export function getUgsCdnUrl(file: string): string {
  const normalized = normalizeUgsFileName(file);
  const encoded = encodeURIComponent(normalized);
  return `https://cdn.jsdelivr.net/gh/bubbls/ugs-singlefile/UGS-Files/${encoded}`;
}

export function getUgsFallbackUrl(file: string): string {
  const normalized = normalizeUgsFileName(file);
  const encoded = encodeURIComponent(normalized);
  return `https://raw.githubusercontent.com/bubbls/ugs-singlefile/main/UGS-Files/${encoded}`;
}

/**
 * Fetches game HTML from jsDelivr CDN with fallback to raw GitHub
 */
export async function fetchUgsGameHtml(file: string): Promise<string> {
  const primaryUrl = `${getUgsCdnUrl(file)}?t=${Date.now()}`;
  const fallbackUrl = getUgsFallbackUrl(file);

  try {
    const res = await fetch(primaryUrl);
    if (res.ok) {
      const text = await res.text();
      if (text && text.length > 30) {
        return text;
      }
    }
  } catch {}

  // Fallback to raw GitHub
  const fallbackRes = await fetch(fallbackUrl);
  if (!fallbackRes.ok) {
    throw new Error(`Failed to load "${file}" from UGS repository (HTTP ${fallbackRes.status})`);
  }
  const fallbackText = await fallbackRes.text();
  if (!fallbackText || fallbackText.length < 30) {
    throw new Error(`Game content for "${file}" was empty.`);
  }
  return fallbackText;
}

/**
 * Launches game in an untraceable about:blank stealth window (Anti-Lightspeed)
 * Exactly like clSINGLEFILE.html
 */
export async function launchInAboutBlankStealth(file: string, title?: string): Promise<void> {
  const win = window.open('about:blank', '_blank');
  if (!win) {
    alert('Popup blocked. Please allow popups for about:blank stealth mode.');
    return;
  }

  const displayName = title || file;

  win.document.open();
  win.document.write(`<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>${displayName}</title>
  <style>
    body {
      margin: 0;
      background: #111827;
      color: #38bdf8;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100vh;
      overflow: hidden;
    }
    .spinner {
      width: 44px;
      height: 44px;
      border: 4px solid rgba(56, 189, 248, 0.2);
      border-top-color: #38bdf8;
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
      margin-bottom: 20px;
    }
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
    h2 { margin: 0 0 8px; font-size: 20px; font-weight: 600; }
    p { margin: 0; color: #94a3b8; font-size: 13px; }
  </style>
</head>
<body>
  <div class="spinner"></div>
  <h2>⚡ Launching ${displayName}...</h2>
  <p>Fetching game from UGS CDN (bypassing filters)...</p>
</body>
</html>`);
  win.document.close();

  try {
    const html = await fetchUgsGameHtml(file);
    win.document.open();
    win.document.write(html);
    win.document.close();
  } catch (err: any) {
    if (win && !win.closed) {
      win.document.open();
      win.document.write(`<!DOCTYPE html>
<html>
<head><title>Load Error</title></head>
<body style="background:#0f172a;color:#f87171;font-family:sans-serif;text-align:center;padding:50px;">
  <h2>Failed to load ${displayName}</h2>
  <p style="color:#94a3b8;">${err?.message || 'Network error occurred while fetching game.'}</p>
</body>
</html>`);
      win.document.close();
    }
  }
}
