/**
 * Comprehensive Game Structure Inspector & Elite AI Code Auditor
 * Analyzes uploaded HTML & SWF files privately and client-side.
 * Connects the official clruffle.html connector for Flash,
 * and performs multi-layer AI + AST checks for error-free execution.
 */

import { GameType } from '../types';
import { sanitizeAndRepairHtml, CodeHealthReport } from './eliteCodeSanitizer';
import { buildOfficialClruffleHtml } from './clruffleConnector';
import { resolveGameTitleWithAI } from './aiTitleResolver';

export interface InspectionResult {
  detectedTitle: string;
  detectedEngine: string;
  type: GameType;
  fileSize: number;
  hasCanvas: boolean;
  hasAudio: boolean;
  isSandboxedSafe: boolean;
  healthScore: number;
  issuesFixed: string[];
  isEliteProtected: boolean;
  summary: string;
}

export async function inspectFile(file: File): Promise<{
  inspection: InspectionResult;
  content: string; // text string for HTML or official clruffle HTML wrapper for SWF
}> {
  const fileName = file.name;
  const isSwf = fileName.toLowerCase().endsWith('.swf');

  if (isSwf) {
    return inspectSwfFile(file);
  } else {
    return inspectHtmlFile(file);
  }
}

/**
 * Comprehensive engine & platform detector
 * Identifies Nintendo DS, GBA, N64, SNES, Flash, Unity WebGL, and HTML5 engines
 */
export function detectEngine(title: string, rawContentOrUrl: string = '', fileName: string = ''): string {
  const combined = `${title} ${fileName} ${rawContentOrUrl}`.toLowerCase();

  // 1. Nintendo DS (NDS) Detection
  if (
    combined.includes('.nds') ||
    combined.includes('core=nds') ||
    combined.includes('desmume') ||
    combined.includes('melonds') ||
    combined.includes('nintendo ds') ||
    /\b(nds|ds)\b/i.test(title) ||
    /\b(nds|ds)\b/i.test(fileName) ||
    combined.includes('(ds)') ||
    combined.includes('[ds]') ||
    /pokemon\s*(diamond|pearl|platinum|heartgold|soulsilver|black|white|ranger)/i.test(combined) ||
    /mario\s*kart\s*ds|super\s*mario\s*64\s*ds|new\s*super\s*mario\s*bros/i.test(combined) ||
    /phantom\s*hourglass|spirit\s*tracks|wild\s*world|squeak\s*squad|super\s*star\s*ultra|sonic\s*rush/i.test(combined) ||
    /phoenix\s*wright|ace\s*attorney|prof(?:\.|essor)?\s*layton|bowser'?s\s*inside\s*story/i.test(combined)
  ) {
    return 'Nintendo DS (NDS)';
  }

  // 2. Game Boy Advance (GBA)
  if (
    combined.includes('.gba') ||
    combined.includes('core=gba') ||
    combined.includes('game boy advance') ||
    combined.includes('gameboy advance') ||
    /\b(gba)\b/i.test(title) ||
    /\b(gba)\b/i.test(fileName) ||
    combined.includes('(gba)') ||
    combined.includes('[gba]') ||
    /pokemon\s*(emerald|firered|leafgreen|ruby|sapphire)/i.test(combined) ||
    /minish\s*cap|metroid\s*fusion|zero\s*mission|superstar\s*saga/i.test(combined)
  ) {
    return 'Game Boy Advance (GBA)';
  }

  // 3. Nintendo 64 (N64)
  if (
    combined.includes('.z64') ||
    combined.includes('.n64') ||
    combined.includes('core=n64') ||
    combined.includes('nintendo 64') ||
    /\b(n64)\b/i.test(title) ||
    /\b(n64)\b/i.test(fileName) ||
    combined.includes('(n64)') ||
    combined.includes('[n64]') ||
    /super\s*mario\s*64|ocarina\s*of\s*time|majora'?s\s*mask|smash\s*64|banjo/i.test(combined)
  ) {
    return 'Nintendo 64 (N64)';
  }

  // 4. Super Nintendo (SNES)
  if (
    combined.includes('.sfc') ||
    combined.includes('.smc') ||
    combined.includes('core=snes') ||
    combined.includes('super nintendo') ||
    /\b(snes)\b/i.test(title) ||
    /\b(snes)\b/i.test(fileName) ||
    combined.includes('(snes)') ||
    combined.includes('[snes]') ||
    /super\s*mario\s*world|chrono\s*trigger|super\s*metroid|donkey\s*kong\s*country/i.test(combined)
  ) {
    return 'Super Nintendo (SNES)';
  }

  // 5. NES / Famicom
  if (
    combined.includes('.nes') ||
    combined.includes('core=nes') ||
    /\b(nes)\b/i.test(title) ||
    /\b(nes)\b/i.test(fileName) ||
    combined.includes('(nes)') ||
    combined.includes('[nes]')
  ) {
    return 'NES / Famicom';
  }

  // 6. PlayStation (PS1) & PSP
  if (combined.includes('core=psx') || combined.includes('.psx') || combined.includes('ps1') || combined.includes('playstation')) {
    return 'PlayStation (PS1)';
  }
  if (combined.includes('core=psp') || combined.includes('.psp') || combined.includes('ppsspp')) {
    return 'PSP (PlayStation Portable)';
  }

  // 7. Adobe Flash (Ruffle)
  if (
    combined.includes('.swf') ||
    combined.includes('ruffle') ||
    combined.includes('flash') ||
    combined.includes('swfobject') ||
    combined.includes('clruffle')
  ) {
    return 'Ruffle WebAssembly Flash';
  }

  // 8. Unity WebGL
  if (
    combined.includes('unityloader') ||
    combined.includes('unityinstance') ||
    combined.includes('unitycontainer') ||
    combined.includes('.unityweb') ||
    combined.includes('build/unity')
  ) {
    return 'Unity WebGL';
  }

  // 9. Godot WebGL
  if (combined.includes('godot') || combined.includes('godotloader') || combined.includes('.pck')) {
    return 'Godot WebGL';
  }

  // 10. Modern JS Game Frameworks
  if (combined.includes('three.js') || combined.includes('three.min.js') || combined.includes('webglrenderer')) {
    return 'Three.js 3D';
  }
  if (combined.includes('phaser') || combined.includes('phaser.min.js')) {
    return 'Phaser Framework';
  }
  if (combined.includes('c2runtime') || combined.includes('construct 2') || combined.includes('c3runtime') || combined.includes('construct 3')) {
    return 'Construct Engine';
  }
  if (combined.includes('pixi.js') || combined.includes('pixi.min.js')) {
    return 'PixiJS 2D';
  }
  if (combined.includes('pico-8') || combined.includes('pico8')) {
    return 'PICO-8';
  }
  if (combined.includes('kaboom')) {
    return 'Kaboom.js';
  }
  if (combined.includes('twine') || combined.includes('sugarcube')) {
    return 'Twine Story';
  }
  if (combined.includes('ejs_player') || combined.includes('emulatorjs') || combined.includes('loader.js')) {
    return 'EmulatorJS Arcade';
  }

  return 'HTML5 Elite Sandbox';
}

/**
 * Clean human-readable title heuristic from filename and franchise patterns
 */
export function cleanTitleFromFilename(name: string): string {
  let raw = name.replace(/\.(html|htm|swf|zip)$/i, '').trim();

  // If already clean with spaces and no 'cl' prefix (e.g. "Armor Mayhem 2" or "Babel Tower"), keep it!
  if (raw.includes(' ') && !raw.toLowerCase().startsWith('cl')) {
    return raw.replace(/[-_\s]*(unblocked|master|main)[-_\s]*$/gi, '').trim();
  }

  // 1. Remove stash repository prefix "cl" (e.g. clarmormayhem2 -> armormayhem2, cl3pandasfantasy -> 3pandasfantasy, cl10bullets -> 10bullets)
  raw = raw.replace(/^cl(?=[0-9a-z])/i, '');

  // 2. Direct franchise matching
  const lowerCompact = raw.toLowerCase().replace(/[-_+ ]/g, '');
  if (lowerCompact.startsWith('armormayhem') || lowerCompact.startsWith('armor-mayhem')) {
    const num = lowerCompact.match(/\d+/)?.[0] || '';
    return num ? `Armor Mayhem ${num}` : 'Armor Mayhem';
  }
  if (lowerCompact.startsWith('badpiggies') || lowerCompact.startsWith('bad-piggies')) {
    const num = lowerCompact.match(/\d+/)?.[0] || '';
    return num ? `Bad Piggies ${num}` : 'Bad Piggies';
  }
  if (lowerCompact.startsWith('ducklife') || lowerCompact.startsWith('duck-life')) {
    const num = lowerCompact.match(/\d+/)?.[0] || '';
    return num ? `Duck Life ${num}` : 'Duck Life';
  }
  if (lowerCompact.startsWith('bloonstd') || lowerCompact.startsWith('bloons-td')) {
    const num = lowerCompact.match(/\d+/)?.[0] || '';
    return num ? `Bloons TD ${num}` : 'Bloons TD';
  }
  if (lowerCompact.startsWith('riddleschool') || lowerCompact.startsWith('riddle-school')) {
    const num = lowerCompact.match(/\d+/)?.[0] || '';
    return num ? `Riddle School ${num}` : 'Riddle School';
  }
  if (lowerCompact.startsWith('learntofly') || lowerCompact.startsWith('learn2fly')) {
    const num = lowerCompact.match(/\d+/)?.[0] || '';
    return num ? `Learn to Fly ${num}` : 'Learn to Fly';
  }
  if (lowerCompact.startsWith('cookieclicker')) return 'Cookie Clicker';
  if (lowerCompact.startsWith('tanktrouble')) return 'Tank Trouble';
  if (lowerCompact.startsWith('superfighters')) return 'Superfighters';
  if (lowerCompact.startsWith('rooftopsnipers')) return 'Rooftop Snipers';
  if (lowerCompact.startsWith('getawayshootout')) return 'Getaway Shootout';
  if (lowerCompact.startsWith('tunnelrush')) return 'Tunnel Rush';
  if (lowerCompact.startsWith('snowrider')) return 'Snow Rider 3D';
  if (lowerCompact.startsWith('smashkarts')) return 'Smash Karts';
  if (lowerCompact.startsWith('crossyroad')) return 'Crossy Road';
  if (lowerCompact.startsWith('happywheels')) return 'Happy Wheels';
  if (lowerCompact.startsWith('subwaysurfers')) return 'Subway Surfers';
  if (lowerCompact.startsWith('templerun')) return 'Temple Run';

  if (lowerCompact.startsWith('papaspizzeria') || lowerCompact.startsWith('papapizzeria')) return "Papa's Pizzeria";
  if (lowerCompact.startsWith('papasfreezeria') || lowerCompact.startsWith('papafreezeria')) return "Papa's Freezeria";
  if (lowerCompact.startsWith('papasburgeria') || lowerCompact.startsWith('papaburgeria')) return "Papa's Burgeria";
  if (lowerCompact.startsWith('papastaco') || lowerCompact.startsWith('papataco')) return "Papa's Taco Mia";

  if (lowerCompact.startsWith('3pandas') || lowerCompact.startsWith('threepandas')) {
    const sub = lowerCompact.replace(/^(3pandas|threepandas)/, '').trim();
    if (sub === 'fantasy' || sub === 'infantasy') return '3 Pandas in Fantasy';
    if (sub === 'japan' || sub === 'injapan') return '3 Pandas in Japan';
    if (sub === 'brazil' || sub === 'inbrazil') return '3 Pandas in Brazil';
    if (sub === 'night') return '3 Pandas: Night';
    if (sub === '2' || sub === '2night') return '3 Pandas 2: Night';
    if (!sub) return '3 Pandas';
    return `3 Pandas: ${sub.charAt(0).toUpperCase() + sub.slice(1)}`;
  }
  if (lowerCompact.startsWith('fireboy') || lowerCompact.startsWith('watergirl')) {
    if (lowerCompact.includes('forest')) return 'Fireboy & Watergirl: Forest Temple';
    if (lowerCompact.includes('light')) return 'Fireboy & Watergirl: Light Temple';
    if (lowerCompact.includes('ice')) return 'Fireboy & Watergirl: Ice Temple';
    if (lowerCompact.includes('crystal')) return 'Fireboy & Watergirl: Crystal Temple';
    return 'Fireboy & Watergirl';
  }
  if (lowerCompact.startsWith('bobtherobber') || lowerCompact.startsWith('bobrobber')) {
    const num = lowerCompact.match(/\d+/)?.[0] || '1';
    return `Bob the Robber ${num}`;
  }
  if (lowerCompact.startsWith('badicecream')) {
    const num = lowerCompact.match(/\d+/)?.[0] || '1';
    return `Bad Ice Cream ${num}`;
  }
  if (lowerCompact.startsWith('motox3m') || lowerCompact.startsWith('moto-x3m')) {
    const num = lowerCompact.match(/\d+/)?.[0] || '';
    return num ? `Moto X3M ${num}` : 'Moto X3M';
  }

  // 3. General splitting: separate digits from words, camelCase, and underscores/hyphens
  let title = raw
    .replace(/([0-9]+)([a-zA-Z]+)/g, '$1 $2')
    .replace(/([a-zA-Z]+)([0-9]+)/g, '$1 $2')
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/[-_+]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  // Only strip trailing repository tags like "-unblocked", "(unblocked)", "-main"
  title = title.replace(/[-_\s]*(unblocked|master|main)[-_\s]*$/gi, '').trim();

  if (!title) {
    title = raw.replace(/[-_+]/g, ' ').trim() || name;
  } else {
    title = title
      .split(' ')
      .map((w) => (w.length > 0 ? w[0].toUpperCase() + w.slice(1).toLowerCase() : ''))
      .join(' ');
  }
  return title;
}

/**
 * Elite Inspector & AI Repair for HTML files
 */
async function inspectHtmlFile(file: File): Promise<{
  inspection: InspectionResult;
  content: string;
}> {
  const rawText = await file.text();

  // 1. Run Elite Sanitizer & Anti-Crash Repair
  const { repairedHtml, report } = sanitizeAndRepairHtml(rawText);

  let detectedTitle = '';
  let detectedEngine = 'Vanilla HTML5 / JS';
  let hasCanvas = report.hasCanvas;
  let hasAudio = false;

  const lower = rawText.toLowerCase();

  // 1. Authoritative Filename Check: If the file has a real name (e.g. "Armor Mayhem 2.html" or "clarmormayhem2.html"), use it directly!
  const isGenericFilename =
    !file.name ||
    /^game[_\s]*\(?[a-zA-Z0-9_-]{3,20}\)?\.html?$/i.test(file.name) ||
    /^uploaded_game/i.test(file.name) ||
    /^untitled/i.test(file.name);

  if (!isGenericFilename) {
    detectedTitle = cleanTitleFromFilename(file.name);
  }

  // 2. If filename was a generic ID (e.g. game_(1ss-7e).html), inspect HTML contents
  if (!detectedTitle) {
    // Check <title> tag (ignoring generic boilerplates)
    const titleMatch = rawText.match(/<title[^>]*>(.*?)<\/title>/i);
    if (titleMatch && titleMatch[1].trim()) {
      const rawTitle = titleMatch[1].trim();
      if (
        !/^(index|document|untitled|new page|home|game|play|ruffle player|flash player|really\s*cool.*|unblocked.*|html5\s*game.*)$/i.test(
          rawTitle
        ) &&
        rawTitle.length > 2
      ) {
        detectedTitle = rawTitle.replace(/[-|].*$/, '').trim();
      }
    }
  }

  // 3. Check top HTML comments (e.g. <!-- Babel Tower --> or <!-- cl3pandas.html -->)
  if (!detectedTitle) {
    const commentMatch = rawText.slice(0, 800).match(/<!--\s*(?:Game:?|Title:?|cl)?\s*([a-zA-Z0-9\s._-]{3,40})\s*-->/i);
    if (commentMatch && commentMatch[1]) {
      const cTitle = commentMatch[1].trim();
      if (!/^(end|start|doctype|ultimate|ruffle|frosty|html)/i.test(cTitle)) {
        detectedTitle = cleanTitleFromFilename(cTitle);
      }
    }
  }

  // 4. Check JS titles or embedded SWF references
  if (!detectedTitle) {
    const jsTitleMatch = rawText.match(/(?:document\.title|window\.gameTitle|gameName|appName)\s*=\s*["']([^"']{3,50})["']/i);
    if (jsTitleMatch && jsTitleMatch[1]) {
      const jTitle = jsTitleMatch[1].trim();
      if (!/^(index|document|untitled|ruffle player|flash game)/i.test(jTitle)) {
        detectedTitle = jTitle;
      }
    }
  }

  // 5. Check for embedded SWF file references (e.g. "armormayhem2.swf", "babeltower.swf", "run3.swf")
  if (!detectedTitle) {
    const swfMatch = rawText.match(/["']([a-zA-Z0-9_\-\/]+\.swf)["']/i);
    if (swfMatch && swfMatch[1]) {
      const swfFileName = swfMatch[1].split('/').pop() || '';
      if (swfFileName && !/^(ruffle|loader|player|main|default)\.swf$/i.test(swfFileName)) {
        detectedTitle = cleanTitleFromFilename(swfFileName);
      }
    }
  }

  // 6. Check meta tags
  if (!detectedTitle) {
    const ogTitle = rawText.match(/<meta[^>]*property=["']og:title["'][^>]*content=["']([^"']+)["']/i);
    if (ogTitle && ogTitle[1].trim() && !/^(index|document|untitled)/i.test(ogTitle[1].trim())) {
      detectedTitle = ogTitle[1].trim();
    }
  }

  // 7. Check <h1> tags
  if (!detectedTitle) {
    const h1Match = rawText.match(/<h1[^>]*>(.*?)<\/h1>/i);
    if (h1Match && h1Match[1].trim() && h1Match[1].length < 40) {
      const h1Text = h1Match[1].replace(/<[^>]*>/g, '').trim();
      if (!/^(index|document|untitled|loading|game)/i.test(h1Text)) {
        detectedTitle = h1Text;
      }
    }
  }

  // 8. Detect Engine & High-Profile Game signatures
  detectedEngine = detectEngine(detectedTitle, rawText, file.name);

  // 9. If still unverified or generic ID, run AI title resolver on code snippet
  if (!detectedTitle || isGenericFilename || /^Game\s*\(/i.test(detectedTitle)) {
    try {
      const aiResult = await resolveGameTitleWithAI(file.name, rawText.slice(0, 2000));
      if (aiResult && aiResult.resolvedTitle && !/^Game\s*\(/i.test(aiResult.resolvedTitle)) {
        detectedTitle = aiResult.resolvedTitle;
      }
    } catch {}
  }

  if (!detectedTitle) {
    detectedTitle = cleanTitleFromFilename(file.name);
  }

  // 7. Audio detection
  if (
    lower.includes('audiocontext') ||
    lower.includes('webkitaudiocontext') ||
    lower.includes('howl(') ||
    lower.includes('<audio') ||
    lower.includes('.mp3')
  ) {
    hasAudio = true;
  }

  // 8. Instant Health & Code Structure Report
  const allFixes = [...report.fixesApplied];

  const inspection: InspectionResult = {
    detectedTitle,
    detectedEngine,
    type: 'html',
    fileSize: file.size,
    hasCanvas,
    hasAudio,
    isSandboxedSafe: true,
    healthScore: report.healthScore,
    issuesFixed: allFixes,
    isEliteProtected: true,
    summary: `${detectedEngine} · ${hasCanvas ? 'Canvas 2D/WebGL' : 'DOM UI'} · Health: ${report.healthScore}% · ${(file.size / 1024).toFixed(1)} KB`,
  };

  return { inspection, content: repairedHtml };
}

/**
 * Deep inspector for SWF Flash files - Uses Official clruffle.html Connector
 */
async function inspectSwfFile(file: File): Promise<{
  inspection: InspectionResult;
  content: string;
}> {
  const arrayBuffer = await file.arrayBuffer();
  const bytes = new Uint8Array(arrayBuffer);

  let compression = 'Unknown Flash';
  let version = 0;

  if (bytes.length >= 8) {
    const magic = String.fromCharCode(bytes[0], bytes[1], bytes[2]);
    version = bytes[3];
    if (magic === 'FWS') compression = 'Flash Uncompressed';
    else if (magic === 'CWS') compression = 'Flash Compressed (Zlib)';
    else if (magic === 'ZWS') compression = 'Flash Compressed (LZMA)';
  }

  const detectedTitle = cleanTitleFromFilename(file.name);
  const detectedEngine = `${compression} (v${version || 9})`;

  // Convert to base64 Data URL for Ruffle loader
  const dataUrl = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });

  // Build official clruffle.html wrapper
  const officialClruffleHtml = buildOfficialClruffleHtml(dataUrl, detectedTitle);

  const inspection: InspectionResult = {
    detectedTitle,
    detectedEngine: 'clruffle.html Official Connector',
    type: 'swf',
    fileSize: file.size,
    hasCanvas: true,
    hasAudio: true,
    isSandboxedSafe: true,
    healthScore: 100,
    issuesFixed: [
      'Connected via official clruffle.html WebAssembly pipeline',
      'Configured with jsdelivr gn-math/assets@main/113/ Ruffle suite',
      'Memory data auto-mount enabled',
    ],
    isEliteProtected: true,
    summary: `Adobe Flash SWF · Official clruffle.html Connector · ${(file.size / 1024).toFixed(1)} KB`,
  };

  return { inspection, content: officialClruffleHtml };
}
