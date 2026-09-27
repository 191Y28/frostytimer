/**
 * High-Tier Official Ruffle Flash Connector Engine
 * Bulletproof WebAssembly Flash player initialization with dual CDN fallbacks,
 * 100vw/100vh full-screen coverage, letterboxing auto-fit, and anti-hang safety timers.
 */

export function buildOfficialClruffleHtml(swfBase64OrUrl: string, gameTitle: string = 'Flash Game'): string {
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    <title>${gameTitle}</title>
    <!-- Primary Ruffle CDN (Classic script avoids srcDoc ES module sandbox CORS blocks) -->
    <script src="https://unpkg.com/@ruffle-rs/ruffle"></script>
    <style>
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      html, body {
        width: 100vw;
        height: 100vh;
        margin: 0;
        padding: 0;
        overflow: hidden;
        background: #000000;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      #ruffle-host {
        width: 100vw;
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #000000;
      }
      ruffle-player {
        width: 100vw;
        height: 100vh;
        display: block;
      }
      #loading-overlay {
        position: fixed;
        inset: 0;
        background: #090d16;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        color: #38bdf8;
        font-family: system-ui, sans-serif;
        z-index: 99999;
        transition: opacity 0.4s ease;
      }
      .spinner {
        width: 48px;
        height: 48px;
        border: 4px solid rgba(56, 189, 248, 0.2);
        border-top-color: #38bdf8;
        border-radius: 50%;
        animation: spin 0.8s linear infinite;
        margin-bottom: 16px;
      }
      @keyframes spin {
        to { transform: rotate(360deg); }
      }
    </style>
  </head>
  <body>
    <div id="loading-overlay">
      <div class="spinner"></div>
      <div style="font-weight: 600; font-size: 15px;">Loading Flash Game...</div>
      <div id="status" style="font-size: 12px; color: #94a3b8; margin-top: 6px;">Initializing Ruffle Emulator</div>
    </div>

    <div id="ruffle-host"></div>

    <script>
      (function() {
        const swfPayload = ${JSON.stringify(swfBase64OrUrl)};
        let playerInstance = null;

        function dismissLoader() {
          const loader = document.getElementById('loading-overlay');
          if (loader) {
            loader.style.opacity = '0';
            setTimeout(function() {
              loader.style.display = 'none';
            }, 400);
          }
        }

        // Configure Ruffle defaults
        window.RufflePlayer = window.RufflePlayer || {};
        window.RufflePlayer.config = {
          letterbox: "on",
          autoplay: "on",
          unmuteOverlay: "hidden",
          quality: "high",
          scale: "showAll",
          forceScale: true,
          forceAlign: true,
          splashScreen: false,
          openUrlMode: "confirm",
          allowScriptAccess: true
        };

        function mountPlayer() {
          if (!window.RufflePlayer || typeof window.RufflePlayer.newest !== 'function') {
            return false;
          }
          try {
            var ruffle = window.RufflePlayer.newest();
            var playerInstance = ruffle.createPlayer();
            var host = document.getElementById('ruffle-host');
            if (!host) return false;
            host.innerHTML = '';
            host.appendChild(playerInstance);

            if (swfPayload) {
              playerInstance.load({ data: swfPayload })
                .then(function() {
                  dismissLoader();
                })
                .catch(function(err) {
                  console.warn('Ruffle load warning:', err);
                  dismissLoader();
                });
            } else {
              dismissLoader();
            }

            playerInstance.style.width = '100vw';
            playerInstance.style.height = '100vh';
            return true;
          } catch(e) {
            console.error('Ruffle init error:', e);
            dismissLoader();
            return false;
          }
        }

        function loadRuffleWithFallback() {
          if (mountPlayer()) return;

          var statusEl = document.getElementById('status');
          if (statusEl) statusEl.textContent = 'Loading backup Ruffle CDN...';

          var fallback = document.createElement('script');
          fallback.src = 'https://cdn.jsdelivr.net/npm/@ruffle-rs/ruffle';
          fallback.onload = function() {
            setTimeout(function() {
              if (!mountPlayer()) {
                dismissLoader();
              }
            }, 100);
          };
          fallback.onerror = function() {
            if (statusEl) statusEl.textContent = 'Failed to load Flash engine. Check internet connection.';
            setTimeout(dismissLoader, 3000);
          };
          document.head.appendChild(fallback);
        }

        if (document.readyState === 'loading') {
          document.addEventListener('DOMContentLoaded', loadRuffleWithFallback);
        } else {
          loadRuffleWithFallback();
        }

        // Failsafe timer: dismiss loader after 4 seconds max
        setTimeout(dismissLoader, 4000);
      })();
    </script>
  </body>
</html>`;
}
