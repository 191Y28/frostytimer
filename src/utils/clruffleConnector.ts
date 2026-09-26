/**
 * High-Tier Official Ruffle Flash Connector Engine
 * Bulletproof WebAssembly Flash player initialization with dual CDN fallbacks,
 * 100vw/100vh full-screen coverage, letterboxing auto-fit, and anti-hang safety timers.
 */

export function buildOfficialClruffleHtml(swfData: string, gameTitle: string = 'Ruffle Player'): string {
  return `<!DOCTYPE html>
<!-- Ultimate Game Stash - High-Tier Frosty Ruffle Connector -->
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
        width: 100vw !important;
        height: 100vh !important;
        margin: 0 !important;
        padding: 0 !important;
        overflow: hidden !important;
        background: #000 !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
      }
      #player-host {
        width: 100vw !important;
        height: 100vh !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        background: #000;
      }
      ruffle-player, ruffle-embed, object, embed {
        width: 100vw !important;
        height: 100vh !important;
        display: block !important;
      }
      #loader-overlay {
        position: fixed;
        inset: 0;
        background: #020617;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        color: #38bdf8;
        font-family: system-ui, -apple-system, sans-serif;
        z-index: 99999;
        transition: opacity 0.3s ease, visibility 0.3s;
      }
      .spinner {
        width: 44px;
        height: 44px;
        border: 3px solid rgba(56, 189, 248, 0.15);
        border-top-color: #38bdf8;
        border-radius: 50%;
        animation: spin 0.8s linear infinite;
        margin-bottom: 14px;
      }
      @keyframes spin {
        to { transform: rotate(360deg); }
      }
    </style>
  </head>
  <body>
    <div id="loader-overlay">
      <div class="spinner"></div>
      <div style="font-weight: 700; font-size: 14px; letter-spacing: 0.5px;">Initializing Ruffle Flash Engine</div>
      <div id="status-msg" style="font-size: 11px; color: #94a3b8; margin-top: 6px;">Loading WebAssembly Virtual Machine...</div>
    </div>

    <div id="player-host"></div>

    <script>
      (function() {
        const swfPayload = ${JSON.stringify(swfData)};
        const host = document.getElementById('player-host');
        const loader = document.getElementById('loader-overlay');
        const statusMsg = document.getElementById('status-msg');
        let playerInstance = null;

        function dismissLoader() {
          if (loader && loader.style.display !== 'none') {
            loader.style.opacity = '0';
            setTimeout(function() {
              loader.style.display = 'none';
            }, 300);
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
          openUrlMode: "confirm",
          allowScriptAccess: true
        };

        function mountPlayer() {
          if (!window.RufflePlayer || typeof window.RufflePlayer.newest !== 'function') {
            // Secondary CDN fallback if unpkg was stalled
            if (statusMsg) statusMsg.textContent = 'Connecting via secondary CDN mirror...';
            const fallbackScript = document.createElement('script');
            fallbackScript.src = 'https://cdn.jsdelivr.net/npm/@ruffle-rs/ruffle';
            fallbackScript.onload = doLaunch;
            fallbackScript.onerror = function() {
              if (statusMsg) statusMsg.textContent = 'Ruffle mirror offline. Please check network connection.';
              setTimeout(dismissLoader, 3000);
            };
            document.head.appendChild(fallbackScript);
            return;
          }
          doLaunch();
        }

        function doLaunch() {
          try {
            if (statusMsg) statusMsg.textContent = 'Mounting Flash Virtual Machine...';
            const ruffle = window.RufflePlayer.newest();
            playerInstance = ruffle.createPlayer();
            playerInstance.style.width = '100vw';
            playerInstance.style.height = '100vh';

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
          } catch (err) {
            console.error('Ruffle mount error:', err);
            dismissLoader();
          }
        }

        if (document.readyState === 'complete' || document.readyState === 'interactive') {
          mountPlayer();
        } else {
          window.addEventListener('DOMContentLoaded', mountPlayer);
        }

        // Failsafe timer: NEVER stay stuck on loading screen under any circumstances
        setTimeout(dismissLoader, 2800);
      })();
    </script>
  </body>
</html>`;
}
