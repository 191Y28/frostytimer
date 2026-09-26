/**
 * Elite HTML Code Sanitizer & Runtime Protector
 * Eliminates framebusters, polyfills missing SDKs (Poki, CrazyGames, GameDistribution),
 * suppresses blocking errors, and enforces responsive canvas fit.
 */

export interface CodeHealthReport {
  healthScore: number; // 0 - 100
  issuesFound: string[];
  fixesApplied: string[];
  hasFramebusters: boolean;
  hasBlockedTrackers: boolean;
  hasMissingSdk: boolean;
  hasCanvas: boolean;
  isSanitized: boolean;
}

export function sanitizeAndRepairHtml(rawHtml: string): {
  repairedHtml: string;
  report: CodeHealthReport;
} {
  const issuesFound: string[] = [];
  const fixesApplied: string[] = [];
  let code = rawHtml;

  // 1. Detect & Neutralize Framebusters (Anti-Iframe Breakout)
  const framebusterRegex = /(top|parent|window\.top|window\.parent)\.location(\s*=\s*|\.replace\(|\.href\s*=\s*)/gi;
  let hasFramebusters = false;
  if (framebusterRegex.test(code)) {
    hasFramebusters = true;
    issuesFound.push('Detected framebuster redirect that attempts to break out of iframe/sandboxing');
    code = code.replace(
      framebusterRegex,
      '/* [Frosty Protector: Neutralized Framebuster] */ void '
    );
    fixesApplied.push('Neutralized window.top/parent redirects');
  }

  // 2. Detect & Neutralize Blocked Trackers / Ad Networks that cause network halts
  let hasBlockedTrackers = false;
  const trackerRegex = /<script[^>]*src=["'][^"']*(google-analytics|googlesyndication|googletagmanager|pagead|analytics|yandex|clarity|hotjar)[^"']*["'][^>]*>.*?<\/script>/gi;
  if (trackerRegex.test(code)) {
    hasBlockedTrackers = true;
    issuesFound.push('External ad/analytics scripts detected that get blocked by school firewalls');
    code = code.replace(trackerRegex, '<!-- [Frosty: Removed Firewall-Blocked Ad Tracker] -->');
    fixesApplied.push('Stripped 3rd-party ad trackers to guarantee offline compatibility');
  }

  // 3. Detect Missing SDK dependencies (Poki, CrazyGames, GameDistribution)
  let hasMissingSdk = false;
  const lower = code.toLowerCase();
  if (
    lower.includes('pokisdk') ||
    lower.includes('crazygames') ||
    lower.includes('gdsdk') ||
    lower.includes('c2runtime') ||
    lower.includes('gameanalytics')
  ) {
    hasMissingSdk = true;
    issuesFound.push('Proprietary publisher SDK calls detected (may crash when unblocked)');
    fixesApplied.push('Injected universal mock SDK polyfills (PokiSDK, CrazyGames, GDSDK)');
  }

  // 4. Check for Canvas Presence
  const hasCanvas = lower.includes('<canvas') || lower.includes('getcontext(') || lower.includes('createelement("canvas")');

  // 5. Inject Elite Polyfill & Runtime Protection Header
  const protectiveRuntimeHeader = `
<!-- [Frosty Arcades Elite Protection Suite] -->
<script>
(function() {
  'use strict';
  // 1. Mock Common Publisher Game SDKs to prevent unhandled rejections
  window.PokiSDK = {
    init: function() { return Promise.resolve(); },
    commercialBreak: function() { return Promise.resolve(); },
    rewardedBreak: function() { return Promise.resolve(true); },
    gameplayStart: function() {},
    gameplayStop: function() {},
    setDebug: function() {},
    captureError: function() {}
  };

  window.CrazyGames = {
    SDK: {
      init: function() { return Promise.resolve(); },
      requestBanner: function() { return Promise.resolve(); },
      requestAd: function() { return Promise.resolve(); },
      gameplayStart: function() {},
      gameplayStop: function() {},
      happytime: function() {}
    }
  };

  window.gdsdk = {
    showBanner: function() {},
    play: function() {},
    cancel: function() {}
  };

  // Google Analytics & Tag stubs to prevent school firewall block crashes
  window.ga = window.ga || function() {};
  window.gtag = window.gtag || function() {};
  window.dataLayer = window.dataLayer || [];
  window.GoogleAnalyticsObject = window.GoogleAnalyticsObject || "ga";

  // 2. Global Error Shield - Prevents minor audio or tracker errors from halting game loop
  window.addEventListener('error', function(e) {
    if (e.message && (
      e.message.indexOf('PokiSDK') !== -1 ||
      e.message.indexOf('CrazyGames') !== -1 ||
      e.message.indexOf('analytics') !== -1 ||
      e.message.indexOf('AudioContext') !== -1 ||
      e.message.indexOf('Script error') !== -1
    )) {
      e.preventDefault();
      return true;
    }
  });

  // 3. AudioContext Autoplay Unlocker
  function unlockAudio() {
    var AudioContext = window.AudioContext || window.webkitAudioContext;
    if (AudioContext) {
      if (window.__frostyAudioCtx && window.__frostyAudioCtx.state === 'suspended') {
        window.__frostyAudioCtx.resume();
      }
    }
    window.removeEventListener('pointerdown', unlockAudio);
    window.removeEventListener('keydown', unlockAudio);
  }
  window.addEventListener('pointerdown', unlockAudio);
  window.addEventListener('keydown', unlockAudio);
})();
</script>
<style>
  /* Frosty Viewport Reset & Auto-Scale - Non-destructive */
  html, body {
    margin: 0 !important;
    padding: 0 !important;
    width: 100% !important;
    height: 100% !important;
    background: #020617;
    overflow: hidden;
  }
  /* Fullscreen scale for standalone canvases */
  body > canvas:only-child, #canvas, #game-canvas, #canvas-container {
    width: 100vw !important;
    height: 100vh !important;
    display: block !important;
    object-fit: contain !important;
  }
</style>
<!-- [End Frosty Arcades Elite Protection Suite] -->
`;

  // Inject right after <head> or at the beginning of document
  if (/<head[^>]*>/i.test(code)) {
    code = code.replace(/<head[^>]*>/i, `$&${protectiveRuntimeHeader}`);
  } else if (/<html[^>]*>/i.test(code)) {
    code = code.replace(/<html[^>]*>/i, `$&<head>${protectiveRuntimeHeader}</head>`);
  } else {
    code = `<!DOCTYPE html><html><head>${protectiveRuntimeHeader}</head><body>${code}</body></html>`;
  }

  // Calculate Health Score
  let score = 100;
  if (hasFramebusters) score -= 15;
  if (hasBlockedTrackers) score -= 10;
  if (!code.includes('<!DOCTYPE html>')) score -= 5;
  if (!hasCanvas && !lower.includes('<body')) score -= 10;

  const report: CodeHealthReport = {
    healthScore: Math.max(70, score),
    issuesFound,
    fixesApplied,
    hasFramebusters,
    hasBlockedTrackers,
    hasMissingSdk,
    hasCanvas,
    isSanitized: true,
  };

  return { repairedHtml: code, report };
}
