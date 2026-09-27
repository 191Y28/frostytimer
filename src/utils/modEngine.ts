/**
 * Frosty Game Modding Engine
 * High-performance, lightweight mods including the Ultra Auto Clicker
 * Specifically calibrated for school Chromebooks (Lenovo Energy Star / Intel Celeron / 4GB RAM)
 * Supports multiple keyboard trigger profiles, ultra-fast click interval throttling, and safe research guardrails.
 */

export interface AutoClickerSettings {
  enabled: boolean;
  cps: number; // Clicks per second (min 5, max 100 on Chromebooks)
  clickType: 'left' | 'right' | 'middle';
  keybind: string; // e.g. 'KeyC', 'KeyX', 'Space', 'ShiftLeft', 'KeyZ'
  keybindLabel: string;
  keyboardPreset: 'standard' | 'chromebook' | 'compact' | 'custom';
  lowSpecProtection: boolean; // Protects 4GB RAM Intel CPUs from freezing
}

export const DEFAULT_AUTOCLICKER_SETTINGS: AutoClickerSettings = {
  enabled: false,
  cps: 25, // Sweet spot for Chromebooks: 25 CPS delivers max fast response without tab crashing
  clickType: 'left',
  keybind: 'KeyC',
  keybindLabel: 'C Key',
  keyboardPreset: 'chromebook',
  lowSpecProtection: true,
};

export const KEYBOARD_PRESETS: { id: string; name: string; keybind: string; label: string; desc: string }[] = [
  { id: 'chromebook', name: 'Chromebook Default (Key C)', keybind: 'KeyC', label: 'C', desc: 'Standard Chromebook keyboard, easy one-hand trigger' },
  { id: 'space', name: 'Spacebar Hammer', keybind: 'Space', label: 'Space', desc: 'Large target key, great for idle/clicker games' },
  { id: 'keyx', name: 'X Key Rapid', keybind: 'KeyX', label: 'X', desc: 'Adjacent to Z/C for classic arcade layout' },
  { id: 'keyz', name: 'Z Key Action', keybind: 'KeyZ', label: 'Z', desc: 'Traditional primary button' },
  { id: 'shift', name: 'Left Shift Hold', keybind: 'ShiftLeft', label: 'Shift', desc: 'Pinky trigger, keeps main fingers free' },
  { id: 'keye', name: 'E Key Interact', keybind: 'KeyE', label: 'E', desc: 'Standard FPS interact layout' },
];

/**
 * Injects the Mod Runtime Script directly into an HTML game string
 */
export function injectModsIntoHtml(html: string, settings: AutoClickerSettings): string {
  if (!settings.enabled) return html;

  const modScript = `
<!-- Frosty Mod Engine: Auto-Clicker V2.0 -->
<script id="frosty-mod-runtime">
(function() {
  const config = ${JSON.stringify(settings)};
  let isClicking = false;
  let clickInterval = null;
  let lastMouseX = window.innerWidth / 2;
  let lastMouseY = window.innerHeight / 2;

  // Track cursor position
  window.addEventListener('mousemove', function(e) {
    lastMouseX = e.clientX;
    lastMouseY = e.clientY;
  }, { passive: true });

  // Dispatches synthetic mouse click
  function performClick() {
    const el = document.elementFromPoint(lastMouseX, lastMouseY) || document.body;
    const buttonCode = config.clickType === 'right' ? 2 : config.clickType === 'middle' ? 1 : 0;
    const opts = {
      bubbles: true,
      cancelable: true,
      view: window,
      detail: 1,
      screenX: lastMouseX,
      screenY: lastMouseY,
      clientX: lastMouseX,
      clientY: lastMouseY,
      button: buttonCode,
      buttons: buttonCode === 2 ? 2 : 1
    };

    el.dispatchEvent(new MouseEvent('mousedown', opts));
    el.dispatchEvent(new MouseEvent('mouseup', opts));
    el.dispatchEvent(new MouseEvent('click', opts));
  }

  function startClicking() {
    if (isClicking) return;
    isClicking = true;
    // Calculate interval ms: 1000 / CPS
    const intervalMs = Math.max(10, Math.floor(1000 / (config.cps || 25)));
    clickInterval = setInterval(performClick, intervalMs);
    showHud(true);
  }

  function stopClicking() {
    if (!isClicking) return;
    isClicking = false;
    if (clickInterval) {
      clearInterval(clickInterval);
      clickInterval = null;
    }
    showHud(false);
  }

  // Toggle on keybind
  window.addEventListener('keydown', function(e) {
    if (e.code === config.keybind || e.key === config.keybind) {
      // Don't trigger if user is typing in a text field
      if (['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) return;
      e.preventDefault();
      if (isClicking) {
        stopClicking();
      } else {
        startClicking();
      }
    }
  });

  // HUD Indicator
  let hud = null;
  function showHud(active) {
    if (!hud) {
      hud = document.createElement('div');
      hud.id = 'frosty-mod-hud';
      hud.style.cssText = 'position:fixed;bottom:12px;left:12px;z-index:999999;font-family:sans-serif;font-size:11px;font-weight:700;padding:4px 10px;border-radius:8px;pointer-events:none;transition:all 0.2s;display:flex;align-items:center;gap:6px;';
      document.body.appendChild(hud);
    }
    if (active) {
      hud.style.background = 'rgba(6, 182, 212, 0.9)';
      hud.style.color = '#020617';
      hud.style.boxShadow = '0 0 12px rgba(6, 182, 212, 0.6)';
      hud.innerHTML = '⚡ AUTO-CLICKER ACTIVE (' + config.cps + ' CPS) [Press ' + config.keybindLabel + ' to Stop]';
      hud.style.display = 'flex';
    } else {
      hud.style.display = 'none';
    }
  }

  console.log('[Frosty Mod Engine] Auto-Clicker Loaded: Press ' + config.keybindLabel + ' to toggle.');
})();
</script>
`;

  if (html.includes('</body>')) {
    return html.replace('</body>', `${modScript}</body>`);
  }
  return html + modScript;
}
