import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

  app.use(express.json({ limit: '100mb' }));
  app.use(express.urlencoded({ extended: true, limit: '100mb' }));

  // Fast fetch single URL with abort timeout
  async function fetchWithTimeout(url: string, headers: Record<string, string>, timeoutMs = 3500): Promise<string> {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    try {
      const response = await fetch(url, {
        headers,
        redirect: 'follow',
        signal: controller.signal,
      });
      clearTimeout(timer);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const text = await response.text();
      if (!text || text.length < 30 || text.includes('Sign in - Google Accounts')) {
        throw new Error('Empty or invalid response');
      }
      return text;
    } catch (e) {
      clearTimeout(timer);
      throw e;
    }
  }

  // Helper to fetch Google Drive files reliably and swiftly with racing
  async function fetchGoogleDriveContent(driveId: string): Promise<string> {
    const urls = [
      `https://drive.usercontent.google.com/download?id=${driveId}&export=download&confirm=t`,
      `https://drive.google.com/uc?export=download&id=${driveId}&confirm=t`,
      `https://drive.google.com/uc?export=view&id=${driveId}`,
      `https://docs.google.com/uc?export=download&id=${driveId}`,
    ];

    const headers = {
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      'Accept-Language': 'en-US,en;q=0.9',
    };

    // Race first 2 most direct endpoints simultaneously
    try {
      const text = await Promise.any(
        urls.slice(0, 2).map((u) => fetchWithTimeout(u, headers, 3500))
      );
      if (text.includes('Google Drive - Virus scan warning') || text.includes('confirm=')) {
        const confirmMatch =
          text.match(/confirm=([a-zA-Z0-9_-]+)/i) ||
          text.match(/name="confirm"\s+value="([^"]+)"/i);
        if (confirmMatch && confirmMatch[1]) {
          const confirmUrl = `https://drive.usercontent.google.com/download?id=${driveId}&export=download&confirm=${confirmMatch[1]}`;
          return await fetchWithTimeout(confirmUrl, headers, 3500);
        }
      }
      return text;
    } catch {
      // Fall back to remaining candidate URLs
      return await Promise.any(
        urls.slice(2).map((u) => fetchWithTimeout(u, headers, 3500))
      );
    }
  }

  // Helper to fetch any web link
  async function fetchWebLink(url: string): Promise<string> {
    const headers = {
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      Accept: '*/*',
    };
    return await fetchWithTimeout(url, headers, 4000);
  }

  // Single game download proxy endpoint
  app.post('/api/download-game', async (req, res) => {
    try {
      const { url, driveFileId } = req.body;
      if (!url && !driveFileId) {
        return res.status(400).json({ error: 'Missing url or driveFileId' });
      }

      let content = '';
      if (driveFileId) {
        content = await fetchGoogleDriveContent(driveFileId);
      } else if (url) {
        // Check if URL is Google Drive
        const driveMatch = url.match(/\/d\/([a-zA-Z0-9_-]+)/) || url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
        if (driveMatch && driveMatch[1]) {
          content = await fetchGoogleDriveContent(driveMatch[1]);
        } else {
          content = await fetchWebLink(url);
        }
      }

      // Title detection from HTML (skip generic placeholders)
      let detectedTitle: string | undefined;
      const titleMatch = content.match(/<title[^>]*>(.*?)<\/title>/i);
      if (titleMatch && titleMatch[1]) {
        const raw = titleMatch[1].trim();
        if (
          !/^(google drive|document|untitled|really\s*cool.*|flash\s*game.*|html5\s*game.*|unblocked.*|free\s*game.*|play\s*game.*|new\s*page|home)$/i.test(
            raw
          ) &&
          !raw.toLowerCase().includes('reallycool')
        ) {
          detectedTitle = raw.replace(/[-|].*$/, '').trim();
        }
      }

      return res.json({
        success: true,
        content,
        detectedTitle,
        size: content.length,
      });
    } catch (err: any) {
      return res.status(500).json({
        success: false,
        error: err?.message || 'Download failed',
      });
    }
  });

  // Batch download proxy endpoint for hyper-fast parallel imports
  app.post('/api/batch-download-games', async (req, res) => {
    try {
      const { items } = req.body; // array of { id, url, driveFileId, title }
      if (!Array.isArray(items) || items.length === 0) {
        return res.status(400).json({ error: 'items array is required' });
      }

      const results = await Promise.allSettled(
        items.map(async (item) => {
          let content = '';
          if (item.driveFileId) {
            content = await fetchGoogleDriveContent(item.driveFileId);
          } else if (item.url) {
            const driveMatch =
              item.url.match(/\/d\/([a-zA-Z0-9_-]+)/) ||
              item.url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
            if (driveMatch && driveMatch[1]) {
              content = await fetchGoogleDriveContent(driveMatch[1]);
            } else {
              content = await fetchWebLink(item.url);
            }
          }

          let detectedTitle: string | undefined;
          const titleMatch = content.match(/<title[^>]*>(.*?)<\/title>/i);
          if (titleMatch && titleMatch[1]) {
            const raw = titleMatch[1].trim();
            if (
              !/^(google drive|document|untitled|really\s*cool.*|flash\s*game.*|html5\s*game.*|unblocked.*|free\s*game.*|play\s*game.*|new\s*page|home)$/i.test(
                raw
              ) &&
              !raw.toLowerCase().includes('reallycool')
            ) {
              detectedTitle = raw.replace(/[-|].*$/, '').trim();
            }
          }

          return {
            id: item.id,
            content,
            detectedTitle,
            size: content.length,
          };
        })
      );

      const downloaded = results.map((r, idx) => {
        if (r.status === 'fulfilled') {
          return {
            ...r.value,
            success: true,
          };
        } else {
          return {
            id: items[idx].id,
            success: false,
            error: r.reason?.message || 'Failed to download',
          };
        }
      });

      return res.json({ success: true, results: downloaded });
    } catch (err: any) {
      return res.status(500).json({ success: false, error: err?.message });
    }
  });

  // Mount Vite middleware in development
  const isProd = process.env.NODE_ENV === 'production';
  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'docs')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'docs', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Frosty Server started on http://0.0.0.0:${PORT}`);
  });
}

startServer();
