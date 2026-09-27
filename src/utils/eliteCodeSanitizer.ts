/**
 * Elite HTML Code Sanitizer & Runtime Protector
 * Eliminates framebusters, polyfills missing SDKs (Poki, CrazyGames, GameDistribution),
 * forces 100% black immersive background (zero white margins/bars),
 * fixes Ruffle Flash & WebAssembly controls/focus, and unlocks emulators.
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

export const STANDARD_GENRES = [
  'Fighting',
  'Action',
  'Adventure',
  'Arcade',
  'Casual',
  'Multiplayer',
  'Platformer',
  'Puzzle',
  'Racing',
  'Retro',
  'RPG',
  'Shooter',
  'Simulation',
  'Sports',
  'Strategy',
] as const;

export type StandardGenre = (typeof STANDARD_GENRES)[number];

/**
 * Normalizes any free-form category/genre into the strict 15 standard genres
 */
export function normalizeGenre(input?: string): StandardGenre {
  if (!input || !input.trim()) return 'Arcade';
  const lower = input.toLowerCase().trim();

  // 1. Fighting (Boxing, MMA, Martial Arts, Hand-to-Hand Combat, Brawlers, Melee)
  if (
    lower.includes('fight') ||
    lower.includes('brawl') ||
    lower.includes('combat') ||
    lower.includes('boxing') ||
    lower.includes('boxer') ||
    lower.includes('mma') ||
    lower.includes('ufc') ||
    lower.includes('martial') ||
    lower.includes('karate') ||
    lower.includes('judo') ||
    lower.includes('taekwondo') ||
    lower.includes('kungfu') ||
    lower.includes('kung fu') ||
    lower.includes('wrestl') ||
    lower.includes('smash flash') ||
    lower.includes('ninja') ||
    lower.includes('gladiator') ||
    lower.includes('fencing') ||
    lower.includes('sword') ||
    lower.includes('punch') ||
    lower.includes('beat em up') ||
    lower.includes('beat-em-up')
  ) {
    return 'Fighting';
  }

  // 2. Shooter (Gun, FPS, Sniper, Bullet, Artillery) - explicitly separate from hand-to-hand combat
  if (
    lower.includes('shoot') ||
    lower.includes('gun') ||
    lower.includes('fps') ||
    lower.includes('sniper') ||
    lower.includes('bullet') ||
    lower.includes('artillery')
  ) {
    return 'Shooter';
  }

  if (lower.includes('sport') || lower.includes('soccer') || lower.includes('basket') || lower.includes('foot') || lower.includes('golf') || lower.includes('baseball') || lower.includes('tennis') || lower.includes('skate') || lower.includes('pool') || lower.includes('billiard') || lower.includes('bowling')) return 'Sports';
  if (lower.includes('race') || lower.includes('racing') || lower.includes('car') || lower.includes('moto') || lower.includes('drive') || lower.includes('drift') || lower.includes('bike')) return 'Racing';
  if (lower.includes('plat') || lower.includes('jump') || lower.includes('runner') || lower.includes('parkour') || lower.includes('mario') || lower.includes('sonic')) return 'Platformer';
  if (lower.includes('puzz') || lower.includes('logic') || lower.includes('match') || lower.includes('brain') || lower.includes('trivia') || lower.includes('word') || lower.includes('chess') || lower.includes('2048') || lower.includes('tetris')) return 'Puzzle';
  if (lower.includes('strat') || lower.includes('tower') || lower.includes('defense') || lower.includes('rts') || lower.includes('tact')) return 'Strategy';
  if (lower.includes('rpg') || lower.includes('role') || lower.includes('quest') || lower.includes('dungeon') || lower.includes('pokemon')) return 'RPG';
  if (lower.includes('sim') || lower.includes('manage') || lower.includes('build') || lower.includes('tycoon') || lower.includes('craft') || lower.includes('fly') || lower.includes('flight')) return 'Simulation';
  if (lower.includes('advent') || lower.includes('story') || lower.includes('explore') || lower.includes('zelda')) return 'Adventure';
  if (lower.includes('retro') || lower.includes('8-bit') || lower.includes('16-bit') || lower.includes('nes') || lower.includes('snes') || lower.includes('gba') || lower.includes('genesis')) return 'Retro';
  if (lower.includes('multi') || lower.includes('io') || lower.includes('.io') || lower.includes('2 player') || lower.includes('coop') || lower.includes('pvp')) return 'Multiplayer';
  if (lower.includes('cas') || lower.includes('idle') || lower.includes('clicker') || lower.includes('simple') || lower.includes('relax')) return 'Casual';
  if (lower.includes('act') || lower.includes('surviv') || lower.includes('zombie') || lower.includes('stealth')) return 'Action';

  // Capitalize check
  const matched = STANDARD_GENRES.find((g) => g.toLowerCase() === lower);
  if (matched) return matched;

  return 'Arcade';
}

export function sanitizeAndRepairHtml(rawHtml: string): {
  repairedHtml: string;
  report: CodeHealthReport;
} {
  const issuesFound: string[] = [];
  const fixesApplied: string[] = [];
  let code = rawHtml;

  // Check if code is already protected by Frosty Arcades Elite Protection Suite
  if (code.includes('[Frosty Arcades Elite Protection Suite]')) {
    return {
      repairedHtml: code,
      report: {
        healthScore: 100,
        issuesFound: [],
        fixesApplied: ['Already protected by Frosty Suite'],
        hasFramebusters: false,
        hasBlockedTrackers: false,
        hasMissingSdk: false,
        hasCanvas: true,
        isSanitized: true,
      },
    };
  }

  // Strip corrupted duplicate outer doctype / html / body wrappers accumulated from prior passes
  let cleanBodyContent = code;
  while (
    /^\s*(?:<!doctype\s+html[^>]*>|<html>|<head><\/head>|<body>)+\s*<!doctype/i.test(cleanBodyContent)
  ) {
    cleanBodyContent = cleanBodyContent.replace(/^\s*(?:<!doctype\s+html[^>]*>|<html>|<head><\/head>|<body>)+\s*/i, '');
  }

  code = cleanBodyContent;

  // 0a. Strip leading HTML comments and preamble whitespace that break browser MIME type sniffing
  code = code.replace(/^(?:\s*<!--[\s\S]*?-->\s*)+/gi, '').trim();

  // 0b. Detect if rawHtml is actually a Google Drive login / virus scan warning page
  if (
    rawHtml.includes('Sign in - Google Accounts') ||
    (rawHtml.includes('Google Drive - Virus scan warning') && rawHtml.includes('download_warning'))
  ) {
    return {
      repairedHtml: rawHtml,
      report: {
        healthScore: 50,
        issuesFound: ['Downloaded content is a Google Drive confirmation shell page'],
        fixesApplied: ['Preserved raw html payload'],
        hasFramebusters: false,
        hasBlockedTrackers: false,
        hasMissingSdk: false,
        hasCanvas: false,
        isSanitized: false,
      },
    };
  }

  // 0c. Google Gadget XML & <Module> Unboxing (Strips XML wrapper tags & extracts CDATA payload)
  if (
    code.includes('<Module') ||
    code.includes('<Content') ||
    code.includes('<![CDATA[') ||
    code.includes('</Module>')
  ) {
    const cdataMatch = code.match(/<!\[CDATA\[([\s\S]*?)\]\]>/i);
    if (cdataMatch && cdataMatch[1] && cdataMatch[1].trim().length > 20) {
      code = cdataMatch[1].trim();
      fixesApplied.push('Unwrapped Google Gadget CDATA HTML payload');
    } else {
      code = code
        .replace(/<\/?Module[^>]*>/gi, '')
        .replace(/<\/?ModulePrefs[^>]*>/gi, '')
        .replace(/<\/?Content[^>]*>/gi, '')
        .replace(/<!\[CDATA\[/gi, '')
        .replace(/\]\]>/gi, '')
        .trim();
      fixesApplied.push('Stripped Google Gadget XML tags (<Module>, <Content>)');
    }
  }

  // Strip any newly exposed leading comments after XML unboxing
  code = code.replace(/^(?:\s*<!--[\s\S]*?-->\s*)+/gi, '').trim();

  // 1. Strip all white / bright bgcolor attributes that cause white borders & side bars
  code = code
    .replace(/\s*bgcolor=["']?[^"'>\s]+["']?/gi, ' bgcolor="#000000"')
    .replace(/\s*background=["']?[^"'>\s]+["']?/gi, '');

  // 2. Auto-rewrite relative common game library scripts to robust CDN URLs
  code = code
    .replace(/src=["'](?:\.\/)?phaser(?:\.min)?\.js["']/gi, 'src="https://cdnjs.cloudflare.com/ajax/libs/phaser/3.55.2/phaser.min.js"')
    .replace(/src=["'](?:\.\/)?three(?:\.min)?\.js["']/gi, 'src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"')
    .replace(/src=["'](?:\.\/)?jquery(?:\.min)?\.js["']/gi, 'src="https://code.jquery.com/jquery-3.6.0.min.js"')
    .replace(/src=["'](?:\.\/)?howler(?:\.min)?\.js["']/gi, 'src="https://cdnjs.cloudflare.com/ajax/libs/howler/2.2.3/howler.min.js"')
    .replace(/src=["'](?:\.\/)?pixi(?:\.min)?\.js["']/gi, 'src="https://cdnjs.cloudflare.com/ajax/libs/pixi.js/6.5.8/pixi.min.js"')
    // Replace broken relative Ruffle references with official CDN
    .replace(/src=["'](?:\.\/)?ruffle(?:\.js)?["']/gi, 'src="https://unpkg.com/@ruffle-rs/ruffle"')
    // Replace broken relative EmuJS loader scripts with official jsdelivr CDN
    .replace(/src=["'](?:\.\/)?loader\.js["']/gi, 'src="https://cdn.jsdelivr.net/gh/ethanaobrien/emujs@main/loader.js"');

  // 3. Detect & Neutralize Framebusters (Anti-Iframe Breakout)
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

  // 4. Detect & Neutralize Blocked Trackers / Ad Networks that cause network halts
  let hasBlockedTrackers = false;
  const trackerRegex = /<script[^>]*src=["'][^"']*(google-analytics|googlesyndication|googletagmanager|pagead|analytics|yandex|clarity|hotjar)[^"']*["'][^>]*>.*?<\/script>/gi;
  if (trackerRegex.test(code)) {
    hasBlockedTrackers = true;
    issuesFound.push('External ad/analytics scripts detected that get blocked by school firewalls');
    code = code.replace(trackerRegex, '<!-- [Frosty: Removed Firewall-Blocked Ad Tracker] -->');
    fixesApplied.push('Stripped 3rd-party ad trackers to guarantee offline compatibility');
  }

  // 5. Detect Missing SDK dependencies (Poki, CrazyGames, GameDistribution)
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

  // 6. Check for Canvas Presence or Flash/SWF/Ruffle/Emulator Presence
  const hasCanvas = lower.includes('<canvas') || lower.includes('getcontext(') || lower.includes('createelement("canvas")');
  const hasRuffleOrFlash = lower.includes('ruffle') || lower.includes('.swf') || lower.includes('<embed') || lower.includes('<object');
  const hasEmulator = lower.includes('emulatorjs') || lower.includes('jsdos') || lower.includes('dosbox') || lower.includes('wasm') || lower.includes('gameconfig');

  // If Flash is detected but no Ruffle script is in the file, inject Ruffle script automatically
  if (hasRuffleOrFlash && !lower.includes('@ruffle-rs/ruffle') && !lower.includes('unpkg.com/@ruffle-rs')) {
    code = `<script src="https://unpkg.com/@ruffle-rs/ruffle"></script>\n` + code;
    fixesApplied.push('Injected Ruffle WebAssembly Flash runtime engine');
  }

  // If EmuJS Retro GameConfig is detected but loader.js is missing, inject loader and viewport
  if ((lower.includes('window.gameconfig') || lower.includes('gameconfig')) && !lower.includes('loader.js') && !lower.includes('emujs')) {
    code += `\n<div id="emulator" style="width:100vw;height:100vh;position:absolute;top:0;left:0;background:#000;z-index:9999;"></div>\n<script src="https://cdn.jsdelivr.net/gh/ethanaobrien/emujs@main/loader.js"></script>\n`;
    fixesApplied.push('Injected EmuJS Arcade Retro Loader & Viewport Container');
  }

  // 7. Inject Elite Polyfill & Runtime Protection Header
  const protectiveRuntimeHeader = `
<!-- [Frosty Arcades Elite Protection Suite] -->
<script>
(function() {
  'use strict';

  // Google Gadget & Workspace JSAPI Stubs to prevent unhandled function crashes
  window.maeExportApis_ = window.maeExportApis_ || function() {};
  try {
    if (window.parent) {
      window.parent.maeExportApis_ = window.parent.maeExportApis_ || function() {};
    }
  } catch (e) {}

  window.gadgets = window.gadgets || {
    util: {
      registerOnLoadHandler: function(fn) {
        if (typeof fn === 'function') {
          try { fn(); } catch(err) {}
        }
      }
    }
  };

  // 1. Ruffle Configuration (Autoplay on, letterboxing on, forceScale true, quality high)
  window.RufflePlayer = window.RufflePlayer || {};
  window.RufflePlayer.config = window.RufflePlayer.config || {};
  window.RufflePlayer.config = Object.assign({
    autoplay: "on",
    unmuteOverlay: "hidden",
    letterbox: "on",
    quality: "high",
    scale: "showAll",
    forceScale: true,
    forceAlign: true,
    splashScreen: false,
    openUrlMode: "confirm",
    allowScriptAccess: true
  }, window.RufflePlayer.config);

  // 2. Safe In-Memory Storage Polyfill (prevents SecurityError in sandboxed iframe)
  try {
    var testKey = '__frosty_probe__';
    window.localStorage.setItem(testKey, '1');
    window.localStorage.removeItem(testKey);
  } catch (storageErr) {
    var memStore = {};
    var storageShim = {
      getItem: function(k) { return memStore.hasOwnProperty(k) ? memStore[k] : null; },
      setItem: function(k, v) { memStore[k] = String(v); },
      removeItem: function(k) { delete memStore[k]; },
      clear: function() { memStore = {}; },
      key: function(i) { return Object.keys(memStore)[i] || null; },
      get length() { return Object.keys(memStore).length; }
    };
    try {
      Object.defineProperty(window, 'localStorage', { value: storageShim, configurable: true, writable: true });
      Object.defineProperty(window, 'sessionStorage', { value: storageShim, configurable: true, writable: true });
    } catch (e) {
      window.localStorage = storageShim;
      window.sessionStorage = storageShim;
    }
  }

  // 3. Mock Common Publisher Game SDKs to prevent unhandled rejections
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

  // 4. Global Error Shield - Prevents minor audio, SDK or tracker errors from halting game loop
  window.addEventListener('error', function(e) {
    if (e.message && (
      e.message.indexOf('PokiSDK') !== -1 ||
      e.message.indexOf('CrazyGames') !== -1 ||
      e.message.indexOf('analytics') !== -1 ||
      e.message.indexOf('AudioContext') !== -1 ||
      e.message.indexOf('localStorage') !== -1 ||
      e.message.indexOf('Script error') !== -1 ||
      e.message.indexOf('swfobject') !== -1
    )) {
      e.preventDefault();
      return true;
    }
  });

  // 5. AudioContext Autoplay Unlocker
  function unlockAudio() {
    var AudioContext = window.AudioContext || window.webkitAudioContext;
    if (AudioContext) {
      if (window.__frostyAudioCtx && window.__frostyAudioCtx.state === 'suspended') {
        window.__frostyAudioCtx.resume().catch(function() {});
      }
    }
    window.removeEventListener('pointerdown', unlockAudio);
    window.removeEventListener('keydown', unlockAudio);
  }
  window.addEventListener('pointerdown', unlockAudio);
  window.addEventListener('keydown', unlockAudio);

  // 6. Keyboard & Focus Auto-Capture (Guarantees arrow keys / WASD / controls work instantly)
  function enforceGameFocus() {
    try {
      window.focus();
      if (document.body) {
        document.body.tabIndex = 0;
        document.body.focus();
      }
      var target = document.querySelector('canvas, ruffle-player, embed, object, #canvas, #game, div[tabindex]');
      if (target && typeof target.focus === 'function') {
        target.tabIndex = 0;
        target.focus();
      }
    } catch (err) {}
  }

  window.addEventListener('load', enforceGameFocus);
  document.addEventListener('DOMContentLoaded', enforceGameFocus);
  window.addEventListener('pointerdown', enforceGameFocus);
  window.addEventListener('mousedown', enforceGameFocus);
  window.addEventListener('touchstart', enforceGameFocus);
  window.addEventListener('keydown', enforceGameFocus);

  // Receive forwarded keyboard events from parent frame if focus was on top container
  window.addEventListener('message', function(event) {
    if (event.data && event.data.type === 'FROSTY_DISPATCH_KEY') {
      try {
        var keyEvt = new KeyboardEvent(event.data.eventType, event.data.keyData);
        window.dispatchEvent(keyEvt);
        document.dispatchEvent(keyEvt);
        var activeEl = document.activeElement || document.querySelector('canvas, ruffle-player, embed, object');
        if (activeEl) {
          activeEl.dispatchEvent(keyEvt);
        }
      } catch (e) {}
    }
  });
})();
</script>
<style>
  /* Frosty Viewport Reset - Clean black background, zero scrollbars */
  html, body {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-color: #000000;
    color: #ffffff;
    scrollbar-width: none;
    -ms-overflow-style: none;
  }

  ::-webkit-scrollbar, *::-webkit-scrollbar {
    display: none !important;
    width: 0 !important;
    height: 0 !important;
  }

  * {
    scrollbar-width: none !important;
    -ms-overflow-style: none !important;
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
    code = `<html><head>${protectiveRuntimeHeader}</head><body>${code}</body></html>`;
  }

  // Ensure strict <!DOCTYPE html> at line 1
  if (!/^\s*<!DOCTYPE\s+html/i.test(code)) {
    code = `<!DOCTYPE html>\n` + code;
  }

  // Calculate Health Score
  let score = 100;
  if (hasFramebusters) score -= 15;
  if (hasBlockedTrackers) score -= 10;
  if (!code.includes('<!DOCTYPE html>')) score -= 5;
  if (!hasCanvas && !hasRuffleOrFlash && !hasEmulator && !lower.includes('<body')) score -= 10;

  const report: CodeHealthReport = {
    healthScore: Math.max(70, score),
    issuesFound,
    fixesApplied,
    hasFramebusters,
    hasBlockedTrackers,
    hasMissingSdk,
    hasCanvas: hasCanvas || hasRuffleOrFlash || hasEmulator,
    isSanitized: true,
  };

  return { repairedHtml: code, report };
}

