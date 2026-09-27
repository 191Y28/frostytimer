/**
 * Game Operations Hub Modal
 * - Tab 0: Home Launcher (Choose between Copy List, Auto Set Rankings, Slop Filter)
 * - Tab 1: Copy List (Chunked by Letter #, A-Z with AI rating prompt + exact title & filename)
 * - Tab 2: Auto Set Rankings (Paste AI output -> parses -> sets 0-10 rankings -> popup only on unmatched errors)
 * - Tab 3: Auto Slop Filter (AI slop detection -> move low-effort games to Slop Games vault)
 */

import React, { useState, useMemo } from 'react';
import {
  X,
  Home,
  Copy,
  Check,
  Star,
  Trash2,
  AlertTriangle,
  Sparkles,
  ArrowRight,
  Filter,
  CheckCircle2,
  FileText,
  RotateCcw,
  Flame,
  Bomb,
} from 'lucide-react';
import { GameItem } from '../types';
import { sound } from '../utils/audio';
import { STANDARD_GENRES, normalizeGenre } from '../utils/eliteCodeSanitizer';

export type HubTab = 'home' | 'copy' | 'rankings' | 'slop';

interface GameOperationsHubModalProps {
  games: GameItem[];
  onClose: () => void;
  onUpdateBatchRankings: (
    rankingsMap: Map<string, number>,
    genresMap?: Map<string, string>,
    slopMap?: Map<string, boolean>
  ) => Promise<{
    updatedCount: number;
    unmatched: string[];
  }>;
  onMoveGamesToSlop: (gameIds: string[]) => Promise<number>;
  onClearAllGames?: () => Promise<void>;
  initialTab?: HubTab;
}

export const GameOperationsHubModal: React.FC<GameOperationsHubModalProps> = ({
  games,
  onClose,
  onUpdateBatchRankings,
  onMoveGamesToSlop,
  initialTab = 'home',
}) => {
  const [activeTab, setActiveTab] = useState<HubTab>(initialTab);

  // --- Copy List Tab State ---
  const [selectedFormat, setSelectedFormat] = useState<'all' | 'html' | 'swf'>('all');
  const [selectedLetter, setSelectedLetter] = useState<string>('A');
  const [stripRankings, setStripRankings] = useState<boolean>(true);
  const [onlyUnrankedFilter, setOnlyUnrankedFilter] = useState<boolean>(false);
  const [isCopiedPrompt, setIsCopiedPrompt] = useState<boolean>(false);
  const [isCopiedListOnly, setIsCopiedListOnly] = useState<boolean>(false);

  // --- Auto Set Rankings Tab State ---
  const [rankingInputText, setRankingInputText] = useState<string>('');
  const [isApplyingRankings, setIsApplyingRankings] = useState<boolean>(false);
  const [rankingSuccessMessage, setRankingSuccessMessage] = useState<string | null>(null);
  const [unmatchedPopupList, setUnmatchedPopupList] = useState<string[] | null>(null);

  // --- Slop Filter Tab State ---
  const [slopLetter, setSlopLetter] = useState<string>('A');
  const [isCopiedSlopPrompt, setIsCopiedSlopPrompt] = useState<boolean>(false);
  const [slopInputText, setSlopInputText] = useState<string>('');
  const [isMovingSlop, setIsMovingSlop] = useState<boolean>(false);
  const [slopSuccessMessage, setSlopSuccessMessage] = useState<string | null>(null);
  const [slopUnmatchedList, setSlopUnmatchedList] = useState<string[] | null>(null);

  // Letters list: # (Numbers/Symbols), A through Z, ALL
  const alphabet = useMemo(() => {
    const list = ['#'];
    for (let i = 65; i <= 90; i++) {
      list.push(String.fromCharCode(i));
    }
    list.push('ALL');
    return list;
  }, []);

  // Filter games by letter bucket, format, and optional unranked filter
  const getGamesForLetter = (
    letter: string,
    format: 'all' | 'html' | 'swf' = selectedFormat,
    onlyUnranked: boolean = false
  ) => {
    let list = games;
    if (format === 'html') {
      list = list.filter((g) => g.type !== 'swf');
    } else if (format === 'swf') {
      list = list.filter((g) => g.type === 'swf');
    }

    if (onlyUnranked) {
      list = list.filter((g) => g.ranking === undefined || g.ranking === null || g.ranking === 0);
    }

    if (letter === 'ALL') return list;
    if (letter === '#') {
      return list.filter((g) => {
        const first = g.title.trim()[0]?.toUpperCase() || '';
        return !/^[A-Z]$/.test(first);
      });
    }
    return list.filter((g) => g.title.trim().toUpperCase().startsWith(letter));
  };

  const selectedLetterGames = useMemo(() => {
    return getGamesForLetter(selectedLetter, selectedFormat, onlyUnrankedFilter);
  }, [games, selectedLetter, selectedFormat, onlyUnrankedFilter]);

  const slopLetterGames = useMemo(() => {
    return getGamesForLetter(slopLetter, 'all', false);
  }, [games, slopLetter]);

  // Generate Unified AI Ranking + Slop Detection Prompt & List
  const generatedRankingPrompt = useMemo(() => {
    const formatLabel =
      selectedFormat === 'html'
        ? 'HTML5'
        : selectedFormat === 'swf'
        ? 'Flash / Ruffle'
        : 'All Formats';

    const letterLabel =
      selectedLetter === 'ALL'
        ? 'All Games'
        : selectedLetter === '#'
        ? 'Numbers & Symbols'
        : `Letter '${selectedLetter}'`;

    const unrankedLabel = onlyUnrankedFilter ? ' (Unranked Games Only)' : '';

    const lines = selectedLetterGames.map((g, idx) => {
      const fileName = g.fileName || `${g.title.toLowerCase().replace(/\s+/g, '_')}.html`;
      return `${idx + 1}. ${g.title} | ${fileName}`;
    });

    return `You are an expert game critic, gaming historian, and arcade curator.
I am providing a list of ${formatLabel} games starting with ${letterLabel}${unrankedLabel} (${selectedLetterGames.length} games).

CRITICAL INSTRUCTION:
You MUST rate and evaluate EVERY SINGLE GAME in the list without skipping any items!
There are ${selectedLetterGames.length} games in total. Ensure your output has exactly ${selectedLetterGames.length} rated lines.

YOUR GOAL:
For every game in the list, evaluate:
1. RATING (1.0 to 10.0 using EXACTLY 1 decimal place, e.g. 8.5, 9.0, 7.2 - NEVER .000):
   - 9.0 to 10.0: Legendary masterpiece / all-time classic (e.g. Super Mario 64, Doom, Slope, Smash Flash)
   - 8.0 to 8.9: Excellent, highly engaging, polished game
   - 7.0 to 7.9: Solid, fun game with good mechanics
   - 5.0 to 6.9: Average or decent casual game
   - 3.0 to 4.9: Repetitive, clunky, or mediocre game
   - 1.0 to 2.9: Poor, broken, or low-effort slop

2. GENRE:
   Assign the best match from standard genres (listed in priority order):
   - Fighting: Martial arts, boxing, MMA, wrestling, brawlers, karate, kung fu, street combat, and hand-to-hand combat games (e.g. Boxing Physics, Street Fighter, Super Smash Flash, Punch-Out, Stickman Fighter, Beat 'Em Up). Weapon-based melee combat (swords, fencing, gladiator) can also be included here, but ALWAYS filter out gun/firearm games into Shooter, and general survival/adventure into Action.
   - Action: General combat adventure, survival, hack-and-slash, stealth.
   - Adventure: Exploration, narrative quests, dungeon crawlers.
   - Arcade: Fast-paced classic arcade reflexes, score attack, endless runners.
   - Casual: Relaxing, clickers, idle, simple web toys.
   - Multiplayer: .io games, 2-player local co-op, PvP battle arenas.
   - Platformer: Side-scrollers, jumping puzzles, precision parkour (Mario, Sonic, VVVVVV).
   - Puzzle: Logic, match-3, physics brain teasers, trivia, chess, 2048, Tetris.
   - Racing: Cars, motorcycles, drift, kart racing, vehicle obstacle courses.
   - Retro: Authentic 8-bit/16-bit NES, SNES, GBA, Sega Genesis retro ports.
   - RPG: Role-playing, turn-based combat, leveling, monster catching.
   - Shooter: Gunplay, FPS, sniper, bullet hell, archery, tank cannons, artillery (filter OUT from Fighting).
   - Simulation: Physics simulators, tycoon management, flight, vehicle sandbox.
   - Sports: Traditional non-combat sports (Soccer, Basketball, Football, Golf, Baseball, Tennis, Pool, Bowling - NOTE: Boxing/MMA belongs in Fighting).
   - Strategy: Tower defense, RTS, tactical grid warfare, chess variants.

3. SLOP CLASSIFICATION (true or false):
   - true: The game is low-effort slop, non-functional/broken, an unplayable asset flip, or unfunny junk (typically rating < 4.0).
   - false: The game is playable, decent, fun, or a classic arcade title.

STRICT FORMATTING RULES:
1. Output EXACTLY one line per game.
2. Format MUST BE strictly pipe-separated:
[Exact Game Title] | [Filename] | [Rating] | [Genre] | [isSlop: true/false]
3. Rating must be formatted with 1 decimal place (e.g. 9.1, 8.5, 7.0).
4. Slop value must be strictly 'true' or 'false'.
5. Do NOT skip any games from the list.

EXAMPLE OUTPUT:
Super Mario 64 | mario64.html | 9.8 | Platformer | false
Basketball Stars | basketball_stars.html | 8.9 | Sports | false
Slope | slope.html | 9.1 | Arcade | false
Generic Flappy Bird Clone | flappy_clone.html | 2.1 | Arcade | true
Bad Ice Cream | bad_ice_cream.html | 8.7 | Arcade | false
Broken Clicker Test | broken_clicker.html | 1.5 | Casual | true

GAMES TO RATE & CLASSIFY (${selectedLetterGames.length} GAMES):
${lines.join('\n')}`;
  }, [selectedLetterGames, selectedLetter, selectedFormat, onlyUnrankedFilter]);

  // Copy Prompt + List
  const handleCopyPromptAndList = async () => {
    sound.playUnlock();
    try {
      await navigator.clipboard.writeText(generatedRankingPrompt);
      setIsCopiedPrompt(true);
      setTimeout(() => setIsCopiedPrompt(false), 2500);
    } catch {}
  };

  // Copy List Only
  const handleCopyListOnly = async () => {
    sound.playUnlock();
    const listOnly = selectedLetterGames
      .map((g, idx) => {
        const fileName = g.fileName || `${g.title.toLowerCase().replace(/\s+/g, '_')}.html`;
        const rankStr =
          !stripRankings && g.ranking !== undefined && g.ranking !== null
            ? ` | ${g.ranking.toFixed(1)}`
            : '';
        return `${idx + 1}. ${g.title} | ${fileName}${rankStr}`;
      })
      .join('\n');

    try {
      await navigator.clipboard.writeText(listOnly);
      setIsCopiedListOnly(true);
      setTimeout(() => setIsCopiedListOnly(false), 2500);
    } catch {}
  };

  // Helper to normalize Roman numerals and numbers for rock-solid title matching
  const normalizeRomanAndNumbers = (str: string) => {
    return str
      .toLowerCase()
      .replace(/\bviii\b/g, '8')
      .replace(/\bvii\b/g, '7')
      .replace(/\bvi\b/g, '6')
      .replace(/\biv\b/g, '4')
      .replace(/\bv\b/g, '5')
      .replace(/\biii\b/g, '3')
      .replace(/\bii\b/g, '2')
      .replace(/\bi\b/g, '1')
      .replace(/\bix\b/g, '9')
      .replace(/\bx\b/g, '10')
      .replace(/[^a-z0-9]/g, '');
  };

  const cleanKey = (str: string) =>
    str
      .toLowerCase()
      .replace(/^\d+[\.\)\-\:\s]+/, '')
      .replace(/[^a-z0-9]/g, '');

  const sanitizeCandidate = (str: string) =>
    str
      .replace(/^\d+[\.\)\-\:\s]+/, '')
      .replace(/^[\*\_\"\'\`\#\-\|\s]+/, '')
      .replace(/[\*\_\"\'\`\#\-\|\s]+$/, '')
      .trim();

  // --- Auto Set Rankings & Unified Slop Processor ---
  const handleApplyRankings = async () => {
    sound.playKeypress();
    if (!rankingInputText.trim()) return;

    setIsApplyingRankings(true);
    setRankingSuccessMessage(null);
    setUnmatchedPopupList(null);

    try {
      const rawLines = rankingInputText
        .split('\n')
        .map((l) => l.trim())
        .filter((l) => {
          if (!l) return false;
          // Filter out markdown table separator rows like |---|---|
          if (/^\|?\s*[-:\s|]+\s*\|?$/.test(l)) return false;
          // Filter out table header rows
          if (/^\|?\s*(game|title|filename|rating|score|genre|slop)/i.test(l.replace(/[\*\#\`]/g, ''))) return false;
          return true;
        });

      const rankingsMap = new Map<string, number>();
      const genresMap = new Map<string, string>();
      const slopMap = new Map<string, boolean>();
      const unmatchedLines: string[] = [];

      // Create rich lookup maps for games
      const exactTitleMap = new Map<string, string>();
      const romanNormalizedTitleMap = new Map<string, string>();
      const fileToId = new Map<string, string>();

      games.forEach((g) => {
        const k1 = cleanKey(g.title);
        const k2 = normalizeRomanAndNumbers(g.title);
        exactTitleMap.set(k1, g.id);
        romanNormalizedTitleMap.set(k2, g.id);

        if (g.fileName) {
          fileToId.set(cleanKey(g.fileName), g.id);
          const baseName = g.fileName.replace(/\.[^/.]+$/, '');
          fileToId.set(cleanKey(baseName), g.id);
        }
      });

      // Match game by all intelligent strategies
      const findGameId = (titleCand: string, fileCand: string, lineIndex: number): string | undefined => {
        // Strategy 1: Exact cleaned title match
        if (titleCand) {
          const k = cleanKey(titleCand);
          if (exactTitleMap.has(k)) return exactTitleMap.get(k);

          const rk = normalizeRomanAndNumbers(titleCand);
          if (romanNormalizedTitleMap.has(rk)) return romanNormalizedTitleMap.get(rk);
        }

        // Strategy 2: Cleaned filename match
        if (fileCand) {
          const fk = cleanKey(fileCand);
          if (fileToId.has(fk)) return fileToId.get(fk);
          const rfk = normalizeRomanAndNumbers(fileCand);
          if (romanNormalizedTitleMap.has(rfk)) return romanNormalizedTitleMap.get(rfk);
        }

        // Strategy 3: Substring / Prefix match across library
        if (titleCand) {
          const candClean = cleanKey(titleCand);
          const candRoman = normalizeRomanAndNumbers(titleCand);

          for (const g of games) {
            const gClean = cleanKey(g.title);
            const gRoman = normalizeRomanAndNumbers(g.title);
            if (
              (candClean.length >= 4 && (gClean.startsWith(candClean) || candClean.startsWith(gClean))) ||
              (candRoman.length >= 4 && (gRoman.startsWith(candRoman) || candRoman.startsWith(gRoman)))
            ) {
              return g.id;
            }
          }
        }

        // Strategy 4: Direct prompt list index match (e.g. if the line is #3 in the selected letter list)
        if (lineIndex >= 0 && lineIndex < selectedLetterGames.length) {
          const expectedGame = selectedLetterGames[lineIndex];
          if (expectedGame) return expectedGame.id;
        }

        return undefined;
      };

      for (let lineIdx = 0; lineIdx < rawLines.length; lineIdx++) {
        const line = rawLines[lineIdx];

        // Extract line index number if present (e.g. "1. FIFA 99" -> index 0)
        const leadingNumMatch = line.match(/^(\d+)[\.\)\-\:\s]+/);
        const explicitIndex = leadingNumMatch ? parseInt(leadingNumMatch[1], 10) - 1 : lineIdx;

        let titleCandidate = '';
        let fileCandidate = '';
        let ratingCandidate: number | null = null;
        let genreCandidate = '';
        let slopCandidate: boolean | null = null;

        if (line.includes('|')) {
          // Clean table borders
          let parts = line.split('|').map((p) => p.trim());
          if (parts[0] === '') parts.shift();
          if (parts[parts.length - 1] === '') parts.pop();

          if (parts.length >= 5) {
            titleCandidate = sanitizeCandidate(parts[0]);
            fileCandidate = sanitizeCandidate(parts[1]);
            const num = parseFloat(parts[2].replace(/[^\d.]/g, ''));
            if (!isNaN(num)) ratingCandidate = num;
            genreCandidate = parts[3];
            const rawSlop = parts[4].toLowerCase();
            slopCandidate = rawSlop.includes('true') || rawSlop === 'slop' || rawSlop === 'yes' || rawSlop === '1';
          } else if (parts.length === 4) {
            titleCandidate = sanitizeCandidate(parts[0]);
            const part3 = parts[3].toLowerCase();
            const isPart3Slop = part3.includes('true') || part3.includes('false') || part3 === 'slop' || part3 === 'clean';

            const num1 = parseFloat(parts[1].replace(/[^\d.]/g, ''));
            const num2 = parseFloat(parts[2].replace(/[^\d.]/g, ''));

            if (!isNaN(num2)) {
              fileCandidate = sanitizeCandidate(parts[1]);
              ratingCandidate = num2;
              if (isPart3Slop) {
                slopCandidate = part3.includes('true') || part3 === 'slop' || part3 === 'yes';
              } else {
                genreCandidate = parts[3];
              }
            } else if (!isNaN(num1)) {
              ratingCandidate = num1;
              genreCandidate = parts[2];
              if (isPart3Slop) {
                slopCandidate = part3.includes('true') || part3 === 'slop' || part3 === 'yes';
              }
            } else {
              fileCandidate = sanitizeCandidate(parts[1]);
              genreCandidate = parts[3];
            }
          } else if (parts.length === 3) {
            titleCandidate = sanitizeCandidate(parts[0]);
            const numPart1 = parseFloat(parts[1].replace(/[^\d.]/g, ''));
            const numPart2 = parseFloat(parts[2].replace(/[^\d.]/g, ''));
            const part2Lower = parts[2].toLowerCase();
            const isPart2Slop = part2Lower.includes('true') || part2Lower.includes('false') || part2Lower === 'slop' || part2Lower === 'clean';

            if (!isNaN(numPart2)) {
              fileCandidate = sanitizeCandidate(parts[1]);
              ratingCandidate = numPart2;
            } else if (!isNaN(numPart1)) {
              ratingCandidate = numPart1;
              if (isPart2Slop) {
                slopCandidate = part2Lower.includes('true') || part2Lower === 'slop' || part2Lower === 'yes';
              } else {
                genreCandidate = parts[2];
              }
            } else {
              fileCandidate = sanitizeCandidate(parts[1]);
            }
          } else if (parts.length === 2) {
            titleCandidate = sanitizeCandidate(parts[0]);
            const num = parseFloat(parts[1].replace(/[^\d.]/g, ''));
            if (!isNaN(num)) ratingCandidate = num;
          }
        } else {
          // Regex for Title - 8.5 or Title: 8.5 or Title = 8.5
          const match = line.match(/^(?:\d+[\.\)\-\:\s]*)?(.+?)(?:\s*[-:=]|\s{2,})\s*([0-9]+(?:\.[0-9]+)?)(?:\s*\/\s*10)?(?:\s*[-|,]\s*(.+))?$/);
          if (match) {
            titleCandidate = sanitizeCandidate(match[1]);
            const num = parseFloat(match[2]);
            if (!isNaN(num)) ratingCandidate = num;
            if (match[3]) {
              const extra = match[3].trim().toLowerCase();
              if (extra.includes('true') || extra.includes('false') || extra === 'slop') {
                slopCandidate = extra.includes('true') || extra === 'slop';
              } else {
                genreCandidate = match[3].trim();
              }
            }
          } else {
            // Check if line is just "Title (8.5)"
            const parenMatch = line.match(/^(.+?)\s*\(([0-9]+(?:\.[0-9]+)?)\)/);
            if (parenMatch) {
              titleCandidate = sanitizeCandidate(parenMatch[1]);
              const num = parseFloat(parenMatch[2]);
              if (!isNaN(num)) ratingCandidate = num;
            }
          }
        }

        if (ratingCandidate !== null) {
          // Normalize score to 0.0 - 10.0 scale (1 decimal place)
          if (ratingCandidate > 10 && ratingCandidate <= 100) {
            ratingCandidate = ratingCandidate / 10;
          }
          ratingCandidate = Math.min(10, Math.max(0, ratingCandidate));
          ratingCandidate = Math.round(ratingCandidate * 10) / 10;

          // Auto-infer slop if rating is very low and slopCandidate wasn't explicitly set
          if (slopCandidate === null && ratingCandidate <= 2.5) {
            slopCandidate = true;
          }

          // Robust ID Resolution
          const matchedId = findGameId(titleCandidate, fileCandidate, explicitIndex);

          if (matchedId) {
            rankingsMap.set(matchedId, ratingCandidate);
            if (genreCandidate) {
              const cleanGenre = normalizeGenre(genreCandidate);
              genresMap.set(matchedId, cleanGenre);
            }
            if (slopCandidate !== null) {
              slopMap.set(matchedId, slopCandidate);
            }
          } else {
            unmatchedLines.push(line);
          }
        } else {
          unmatchedLines.push(line);
        }
      }

      if (rankingsMap.size > 0) {
        sound.playUnlock();
        const res = await onUpdateBatchRankings(rankingsMap, genresMap, slopMap);
        const slopCount = Array.from(slopMap.values()).filter(Boolean).length;
        setRankingSuccessMessage(
          `Successfully updated ${res.updatedCount} games! (Scores, Genres & ${slopCount} Slop games isolated in Vault)`
        );

        const allUnmatched = [...unmatchedLines, ...res.unmatched];
        if (allUnmatched.length > 0) {
          setUnmatchedPopupList(allUnmatched);
        }
      } else {
        sound.playLock();
        setUnmatchedPopupList(
          unmatchedLines.length > 0 ? unmatchedLines : ['Could not detect any valid ratings in pasted text.']
        );
      }
    } catch (err: any) {
      sound.playLock();
      setUnmatchedPopupList([`Processing error: ${err?.message || 'Unknown error'}`]);
    } finally {
      setIsApplyingRankings(false);
    }
  };

  // --- Slop Filter Processor ---
  const generatedSlopPrompt = useMemo(() => {
    const letterLabel =
      slopLetter === 'ALL'
        ? 'All Games'
        : slopLetter === '#'
        ? 'Numbers & Symbols'
        : `Letter '${slopLetter}'`;

    const lines = slopLetterGames.map((g, idx) => `${idx + 1}. ${g.title}`);

    return `You are a strict game quality inspector.
Review the following list of arcade games from category ${letterLabel} (${slopLetterGames.length} games).
Identify and isolate ONLY the games that are low-effort "slop", completely broken, non-functional, asset flips, or unfunny junk that clutter a clean arcade library.

CRITICAL RULES:
1. Output ONLY the exact names of the slop games, one per line.
2. Do NOT output numbers, bullets, markdown formatting, or commentary.
3. Do NOT include classics, popular titles, or decent fun games.
4. If a game is even moderately playable or fun, DO NOT include it.

GAMES TO INSPECT:
${lines.join('\n')}`;
  }, [slopLetterGames, slopLetter]);

  const handleCopySlopPrompt = async () => {
    sound.playUnlock();
    try {
      await navigator.clipboard.writeText(generatedSlopPrompt);
      setIsCopiedSlopPrompt(true);
      setTimeout(() => setIsCopiedSlopPrompt(false), 2500);
    } catch {}
  };

  const handleMoveToSlop = async () => {
    sound.playKeypress();
    if (!slopInputText.trim()) return;

    setIsMovingSlop(true);
    setSlopSuccessMessage(null);
    setSlopUnmatchedList(null);

    try {
      const cleanKey = (str: string) => str.toLowerCase().replace(/[^a-z0-9]/g, '');
      const titleToId = new Map<string, string>();
      games.forEach((g) => {
        titleToId.set(cleanKey(g.title), g.id);
        if (g.fileName) {
          titleToId.set(cleanKey(g.fileName.replace(/\.[^/.]+$/, '')), g.id);
        }
      });

      const lines = slopInputText.split('\n').map((l) => l.trim()).filter(Boolean);
      const matchedIds: string[] = [];
      const unmatched: string[] = [];

      for (const line of lines) {
        // Strip leading numbers or bullets like "1. ", "- "
        const cleanedTitle = line.replace(/^\d+[\.\)]\s*|-\s*/, '').trim();
        const id = titleToId.get(cleanKey(cleanedTitle));
        if (id) {
          matchedIds.push(id);
        } else {
          unmatched.push(cleanedTitle);
        }
      }

      if (matchedIds.length > 0) {
        sound.playUnlock();
        const movedCount = await onMoveGamesToSlop(matchedIds);
        setSlopSuccessMessage(
          `Moved ${movedCount} games into the 'Slop Games' vault! They are now hidden from the main library.`
        );
        if (unmatched.length > 0) {
          setSlopUnmatchedList(unmatched);
        }
      } else {
        sound.playLock();
        setSlopUnmatchedList(
          unmatched.length > 0 ? unmatched : ['No matching game titles found in the pasted list.']
        );
      }
    } catch (err: any) {
      sound.playLock();
      setSlopUnmatchedList([`Error: ${err?.message || 'Failed to move games to slop'}`]);
    } finally {
      setIsMovingSlop(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-3xl shadow-2xl flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-150 overflow-hidden relative">
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800/80 bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-cyan-950/60 border border-cyan-800/40 text-cyan-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
                <span>Game Operations Hub</span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
                  {games.length} Games
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Chunked AI Export, Smart Auto-Ranker & Slop Vault Isolation
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              sound.playKeypress();
              onClose();
            }}
            className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body - Tab Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* TAB 0: HOME */}
          {activeTab === 'home' && (
            <div className="space-y-6">
              <div className="p-4 rounded-xl bg-linear-to-r from-blue-950/60 to-slate-900 border border-blue-900/40">
                <h3 className="text-sm font-bold text-cyan-200 mb-1">
                  AI-Powered Library Management Suite
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Manage hundreds or thousands of games without token overflows or manual input.
                  Export games in small letter-based chunks (50-150 games), rate them with any LLM,
                  and isolate unwanted games into a secondary vault.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Card 1: Copy List */}
                <div
                  onClick={() => {
                    sound.playKeypress();
                    setActiveTab('copy');
                  }}
                  className="p-5 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-cyan-500/50 hover:bg-slate-950/90 transition-all cursor-pointer group flex flex-col justify-between shadow-md"
                >
                  <div>
                    <div className="w-10 h-10 rounded-lg bg-cyan-950/80 border border-cyan-800/40 text-cyan-400 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                      <Copy className="w-5 h-5" />
                    </div>
                    <h4 className="text-sm font-bold text-white group-hover:text-cyan-300 mb-1 flex items-center gap-1.5">
                      <span>1. Copy List (Unified)</span>
                      <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Export games chunked by letter (#, A-Z) with the unified AI prompt for <strong>Rankings (1-10)</strong>, <strong>Genres</strong>, and <strong>Slop (true/false)</strong>.
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between text-[11px] font-semibold text-cyan-400">
                    <span>Export Chunks</span>
                    <span>→</span>
                  </div>
                </div>

                {/* Card 2: Auto Set Rankings & Slop */}
                <div
                  onClick={() => {
                    sound.playKeypress();
                    setActiveTab('rankings');
                  }}
                  className="p-5 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-cyan-500/50 hover:bg-slate-950/90 transition-all cursor-pointer group flex flex-col justify-between shadow-md"
                >
                  <div>
                    <div className="w-10 h-10 rounded-lg bg-blue-950/80 border border-blue-800/40 text-blue-400 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                      <Star className="w-5 h-5" />
                    </div>
                    <h4 className="text-sm font-bold text-white group-hover:text-cyan-300 mb-1 flex items-center gap-1.5">
                      <span>2. Auto Set Rankings & Slop</span>
                      <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Paste the AI's output to automatically apply 1.0 - 10.0 rankings, categorize genres, and isolate slop games simultaneously.
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between text-[11px] font-semibold text-cyan-400">
                    <span>Import Scores & Slop</span>
                    <span>→</span>
                  </div>
                </div>

                {/* Card 3: Auto Slop Filter */}
                <div
                  onClick={() => {
                    sound.playKeypress();
                    setActiveTab('slop');
                  }}
                  className="p-5 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-cyan-500/50 hover:bg-slate-950/90 transition-all cursor-pointer group flex flex-col justify-between shadow-md"
                >
                  <div>
                    <div className="w-10 h-10 rounded-lg bg-amber-950/80 border border-amber-800/40 text-amber-400 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                      <Trash2 className="w-5 h-5" />
                    </div>
                    <h4 className="text-sm font-bold text-white group-hover:text-amber-300 mb-1 flex items-center gap-1.5">
                      <span>3. Slop Vault Organizer</span>
                      <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Review or manually manage games isolated into the secondary 'Slop Games' vault.
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between text-[11px] font-semibold text-amber-400">
                    <span>Manage Vault</span>
                    <span>→</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 1: COPY LIST */}
          {activeTab === 'copy' && (
            <div className="space-y-5">
              <div className="flex flex-col gap-3 p-4 rounded-xl bg-slate-950/80 border border-slate-800">
                {/* Format Filter & Chunk Filter */}
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-slate-300">Format:</span>
                    <div className="flex items-center gap-1 p-0.5 bg-slate-900 border border-slate-700/80 rounded-lg">
                      <button
                        onClick={() => {
                          sound.playKeypress();
                          setSelectedFormat('all');
                        }}
                        className={`px-2.5 py-1 text-[11px] font-semibold rounded-md transition-colors cursor-pointer ${
                          selectedFormat === 'all'
                            ? 'bg-slate-800 text-cyan-300 shadow-xs'
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        All Formats
                      </button>
                      <button
                        onClick={() => {
                          sound.playKeypress();
                          setSelectedFormat('html');
                        }}
                        className={`px-2.5 py-1 text-[11px] font-semibold rounded-md transition-colors cursor-pointer ${
                          selectedFormat === 'html'
                            ? 'bg-slate-800 text-cyan-300 shadow-xs'
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        HTML5 Only
                      </button>
                      <button
                        onClick={() => {
                          sound.playKeypress();
                          setSelectedFormat('swf');
                        }}
                        className={`px-2.5 py-1 text-[11px] font-semibold rounded-md transition-colors cursor-pointer ${
                          selectedFormat === 'swf'
                            ? 'bg-slate-800 text-cyan-300 shadow-xs'
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        Flash / Ruffle Only
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <label className="text-xs text-slate-400 flex items-center gap-1.5 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={stripRankings}
                        onChange={(e) => setStripRankings(e.target.checked)}
                        className="rounded border-slate-700 text-cyan-500 focus:ring-0 cursor-pointer"
                      />
                      <span>Strip existing scores</span>
                    </label>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-2 border-t border-slate-800/60">
                  <div className="text-xs font-semibold text-slate-300">Letter Chunk:</div>
                  <select
                    value={selectedLetter}
                    onChange={(e) => {
                      sound.playKeypress();
                      setSelectedLetter(e.target.value);
                    }}
                    className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs font-bold text-cyan-300 focus:outline-none focus:border-cyan-500 cursor-pointer"
                  >
                    {alphabet.map((l) => {
                      const count = getGamesForLetter(l, selectedFormat).length;
                      return (
                        <option key={l} value={l}>
                          {l === 'ALL'
                            ? `ALL GAMES (${count})`
                            : l === '#'
                            ? `# Numbers & Symbols (${count})`
                            : `Letter ${l} (${count})`}
                        </option>
                      );
                    })}
                  </select>
                  <span className="text-xs text-slate-400">
                    ({selectedLetterGames.length} games ready to export)
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={handleCopyPromptAndList}
                  className="px-4 py-2.5 bg-linear-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs rounded-xl shadow-lg transition-all flex items-center gap-2 cursor-pointer"
                >
                  {isCopiedPrompt ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-200" />
                      <span>Copied Prompt + {selectedLetterGames.length} Games!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>Copy AI Prompt & Games List ({selectedLetterGames.length})</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleCopyListOnly}
                  className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-semibold text-xs rounded-xl border border-slate-700 transition-all flex items-center gap-2 cursor-pointer"
                >
                  {isCopiedListOnly ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span>Copied List Only!</span>
                    </>
                  ) : (
                    <>
                      <FileText className="w-4 h-4 text-slate-400" />
                      <span>Copy Games List Only</span>
                    </>
                  )}
                </button>
              </div>

              {/* Preview Window */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span className="font-semibold">Prompt Preview for AI:</span>
                  <span>{selectedLetterGames.length} Games in Chunk</span>
                </div>
                <pre className="p-4 bg-slate-950 border border-slate-800 rounded-xl text-[11px] font-mono text-slate-300 max-h-64 overflow-y-auto whitespace-pre-wrap leading-relaxed select-all">
                  {generatedRankingPrompt}
                </pre>
              </div>
            </div>
          )}

          {/* TAB 2: AUTO SET RANKINGS */}
          {activeTab === 'rankings' && (
            <div className="space-y-5">
              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
                <h3 className="text-xs font-bold text-cyan-300 flex items-center gap-1.5">
                  <Star className="w-4 h-4 text-cyan-400" />
                  <span>Paste Unified AI Output (Ratings, Genres & Slop)</span>
                </h3>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Paste the response generated by your AI model. The system will automatically parse{' '}
                  <code className="text-cyan-200">Title | Filename | Rating | Genre | isSlop</code> (or standard formats),
                  apply 1.0 - 10.0 ratings, assign official genres, and automatically isolate slop games into the Slop Vault!
                </p>
              </div>

              <textarea
                value={rankingInputText}
                onChange={(e) => setRankingInputText(e.target.value)}
                placeholder={`Example lines:\nSuper Mario 64 | mario64.html | 9.8 | Platformer | false\nBasketball Stars | basketball_stars.html | 8.9 | Sports | false\nSlope | slope.html | 9.1 | Arcade | false\nGeneric Flappy Clone | flappy_bad.html | 2.1 | Arcade | true\nBad Ice Cream | bad_ice_cream.html | 8.7 | Arcade | false`}
                rows={8}
                className="w-full p-4 bg-slate-950 border border-slate-800 rounded-xl text-xs font-mono text-slate-200 placeholder-slate-600 focus:outline-none focus:border-cyan-500/60 leading-relaxed"
              />

              <div className="flex items-center justify-between gap-3">
                <div className="text-xs text-slate-500 font-mono">
                  {rankingInputText.split('\n').filter((l) => l.trim()).length} lines pasted
                </div>

                <button
                  disabled={!rankingInputText.trim() || isApplyingRankings}
                  onClick={handleApplyRankings}
                  className="px-5 py-2.5 bg-linear-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 disabled:opacity-50 text-white font-bold text-xs rounded-xl shadow-lg transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Star className="w-4 h-4" />
                  <span>{isApplyingRankings ? 'Applying...' : 'Apply Ratings, Genres & Slop to Library'}</span>
                </button>
              </div>

              {/* Success Banner */}
              {rankingSuccessMessage && (
                <div className="p-3.5 rounded-xl bg-emerald-950/60 border border-emerald-800/60 text-emerald-300 text-xs font-semibold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{rankingSuccessMessage}</span>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: SLOP FILTER */}
          {activeTab === 'slop' && (
            <div className="space-y-5">
              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
                <h3 className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                  <Trash2 className="w-4 h-4 text-amber-400" />
                  <span>Isolate Low-Quality / Slop Games into Secondary Vault</span>
                </h3>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Games flagged as slop are <strong>NOT deleted</strong>. They are safely moved into the
                  dedicated <strong className="text-amber-300">"Slop Games"</strong> tab right next to
                  Favorites, keeping your main arcade clean while ensuring every game remains playable.
                </p>
              </div>

              {/* Step 1: Export Prompt for AI */}
              <div className="flex items-center justify-between gap-3 p-3 bg-slate-950 border border-slate-800/80 rounded-xl">
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <span>Step 1: Chunk:</span>
                  <select
                    value={slopLetter}
                    onChange={(e) => setSlopLetter(e.target.value)}
                    className="bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1 text-xs font-bold text-amber-300 cursor-pointer"
                  >
                    {alphabet.map((l) => (
                      <option key={l} value={l}>
                        {l === 'ALL'
                          ? `ALL (${getGamesForLetter(l).length})`
                          : `${l} (${getGamesForLetter(l).length})`}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  onClick={handleCopySlopPrompt}
                  className="px-3.5 py-1.5 bg-amber-950/80 hover:bg-amber-900 border border-amber-800/60 text-amber-300 text-xs font-semibold rounded-lg flex items-center gap-1.5 cursor-pointer transition-all"
                >
                  {isCopiedSlopPrompt ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Copied Slop Prompt!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy AI Slop Prompt</span>
                    </>
                  )}
                </button>
              </div>

              {/* Step 2: Paste AI Output */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">
                  Step 2: Paste AI List of Slop Games (One title per line):
                </label>
                <textarea
                  value={slopInputText}
                  onChange={(e) => setSlopInputText(e.target.value)}
                  placeholder={`Example lines:\nBoring Clicker\nBad Flappy Bird Clone\nBroken Physics Game`}
                  rows={6}
                  className="w-full p-4 bg-slate-950 border border-slate-800 rounded-xl text-xs font-mono text-slate-200 placeholder-slate-600 focus:outline-none focus:border-amber-500/60 leading-relaxed"
                />
              </div>

              <div className="flex items-center justify-end">
                <button
                  disabled={!slopInputText.trim() || isMovingSlop}
                  onClick={handleMoveToSlop}
                  className="px-5 py-2.5 bg-amber-600 hover:bg-amber-500 disabled:opacity-50 text-slate-950 font-bold text-xs rounded-xl shadow-lg transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>{isMovingSlop ? 'Moving...' : 'Move to Slop Games Vault'}</span>
                </button>
              </div>

              {slopSuccessMessage && (
                <div className="p-3.5 rounded-xl bg-amber-950/60 border border-amber-800/60 text-amber-300 text-xs font-semibold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>{slopSuccessMessage}</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* BOTTOM TABS NAVIGATION */}
        <div className="p-3 border-t border-slate-800/80 bg-slate-950/80 flex items-center justify-around gap-2">
          <button
            onClick={() => {
              sound.playKeypress();
              setActiveTab('home');
            }}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeTab === 'home'
                ? 'bg-slate-800 text-cyan-300 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
            }`}
          >
            <Home className="w-4 h-4" />
            <span>Home</span>
          </button>

          <button
            onClick={() => {
              sound.playKeypress();
              setActiveTab('copy');
            }}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeTab === 'copy'
                ? 'bg-slate-800 text-cyan-300 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
            }`}
          >
            <Copy className="w-4 h-4" />
            <span>Copy List</span>
          </button>

          <button
            onClick={() => {
              sound.playKeypress();
              setActiveTab('rankings');
            }}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeTab === 'rankings'
                ? 'bg-slate-800 text-cyan-300 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
            }`}
          >
            <Star className="w-4 h-4" />
            <span>Auto Set Rankings</span>
          </button>

          <button
            onClick={() => {
              sound.playKeypress();
              setActiveTab('slop');
            }}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeTab === 'slop'
                ? 'bg-amber-950/70 border border-amber-800/50 text-amber-300 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
            }`}
          >
            <Trash2 className="w-4 h-4" />
            <span>Slop Organizer</span>
          </button>
        </div>

        {/* UNMATCHED GAMES POPUP (Only shown if games failed to match as specifically requested!) */}
        {unmatchedPopupList && unmatchedPopupList.length > 0 && (
          <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-md rounded-2xl flex items-center justify-center p-6 z-50 animate-in fade-in zoom-in-95 duration-100">
            <div className="bg-slate-900 border border-rose-800/80 rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-4">
              <div className="flex items-center gap-3 text-rose-400">
                <AlertTriangle className="w-6 h-6 shrink-0" />
                <div>
                  <h3 className="text-sm font-bold text-white">Unmatched Games / Errors</h3>
                  <p className="text-[11px] text-slate-400">
                    The following {unmatchedPopupList.length} items could not be matched to games in your library:
                  </p>
                </div>
              </div>

              <div className="max-h-48 overflow-y-auto p-3 bg-slate-950 rounded-xl border border-slate-800 text-[11px] font-mono text-rose-300 space-y-1">
                {unmatchedPopupList.map((item, idx) => (
                  <div key={idx} className="truncate">
                    • {item}
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-end pt-2">
                <button
                  onClick={() => setUnmatchedPopupList(null)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded-xl cursor-pointer transition-colors"
                >
                  Dismiss
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
