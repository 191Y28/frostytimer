/**
 * AI-Powered Game Title Resolver
 * Uses Groq Llama 3.3 70B at ultra-fast speeds and smart franchise heuristics.
 */

import { askAI } from './aiClient';
import { cleanTitleFromFilename } from './gameInspector';

export interface AIResolvedTitle {
  originalName: string;
  resolvedTitle: string;
  confidence: 'high' | 'medium' | 'low';
  suggestedTags: string[];
  suggestedCategory: 'arcade' | 'action' | 'puzzle' | 'retro' | 'custom';
}

const KNOWN_GAME_SIGNATURES: {
  pattern: RegExp;
  title: string;
  category: 'arcade' | 'action' | 'puzzle' | 'retro' | 'custom';
  tags: string[];
}[] = [
  { pattern: /3.*pandas.*fantasy/i, title: '3 Pandas in Fantasy', category: 'puzzle', tags: ['Panda', 'Point & Click', 'Puzzle'] },
  { pattern: /3.*pandas.*japan/i, title: '3 Pandas in Japan', category: 'puzzle', tags: ['Panda', 'Adventure', 'Puzzle'] },
  { pattern: /3.*pandas.*brazil/i, title: '3 Pandas in Brazil', category: 'puzzle', tags: ['Panda', 'Escape', 'Puzzle'] },
  { pattern: /3.*pandas.*night/i, title: '3 Pandas: Night', category: 'puzzle', tags: ['Panda', 'Night', 'Puzzle'] },
  { pattern: /3.*pandas/i, title: '3 Pandas', category: 'puzzle', tags: ['Panda', 'Puzzle', 'Classic'] },
  { pattern: /sfiii|street.*fighter.*(3|iii|second|impact)/i, title: 'Street Fighter III: 2nd Impact', category: 'action', tags: ['Capcom', 'Fighting', 'Arcade', 'CPS-3'] },
  { pattern: /10.*bullet/i, title: '10 Bullets', category: 'action', tags: ['Flash', 'Chain Reaction', 'Defense', 'Ruffle'] },
  { pattern: /2048.*ai/i, title: '2048 (AI Solver Edition)', category: 'puzzle', tags: ['Puzzle', 'AI Solver', 'Grid', 'Classic'] },
  { pattern: /slope/i, title: 'Slope', category: 'arcade', tags: ['3D Runner', 'Arcade', 'Fast-Paced'] },
  { pattern: /retro.*bowl/i, title: 'Retro Bowl', category: 'arcade', tags: ['Sports', 'Retro', 'Pixel'] },
  { pattern: /1v1(\.|\s|-)?lol/i, title: '1v1.LOL', category: 'action', tags: ['Shooter', 'Multiplayer', 'Build'] },
  { pattern: /run(\s|-)?3/i, title: 'Run 3', category: 'arcade', tags: ['Platformer', 'Runner', 'Tunnel'] },
  { pattern: /cookie.*clicker/i, title: 'Cookie Clicker', category: 'arcade', tags: ['Idle', 'Clicker', 'Casual'] },
  { pattern: /geometry.*dash/i, title: 'Geometry Dash Lite', category: 'arcade', tags: ['Rhythm', 'Runner', 'Hard'] },
  { pattern: /flappy/i, title: 'Flappy Bird', category: 'arcade', tags: ['Arcade', 'Retro', 'Endless'] },
  { pattern: /fireboy.*watergirl.*forest/i, title: 'Fireboy & Watergirl: Forest Temple', category: 'puzzle', tags: ['Co-op', 'Puzzle', 'Platformer'] },
  { pattern: /fireboy.*watergirl.*light/i, title: 'Fireboy & Watergirl: Light Temple', category: 'puzzle', tags: ['Co-op', 'Puzzle', 'Platformer'] },
  { pattern: /fireboy.*watergirl.*ice/i, title: 'Fireboy & Watergirl: Ice Temple', category: 'puzzle', tags: ['Co-op', 'Puzzle', 'Platformer'] },
  { pattern: /fireboy.*watergirl/i, title: 'Fireboy & Watergirl', category: 'puzzle', tags: ['Co-op', 'Puzzle'] },
  { pattern: /crossy.*road/i, title: 'Crossy Road', category: 'arcade', tags: ['Voxel', 'Endless', 'Casual'] },
  { pattern: /happy.*wheels/i, title: 'Happy Wheels', category: 'action', tags: ['Physics', 'Ragdoll', 'Classic'] },
  { pattern: /subway.*surfers/i, title: 'Subway Surfers', category: 'arcade', tags: ['Runner', '3D', 'Action'] },
  { pattern: /temple.*run/i, title: 'Temple Run 2', category: 'arcade', tags: ['Runner', '3D', 'Adventure'] },
];

export async function resolveGameTitleWithAI(
  fileName: string,
  codeSnippet: string = ''
): Promise<AIResolvedTitle> {
  // 1. Check known signatures first for instant zero-latency match
  const combined = `${fileName} ${codeSnippet.slice(0, 500)}`;
  for (const sig of KNOWN_GAME_SIGNATURES) {
    if (sig.pattern.test(combined)) {
      return {
        originalName: fileName,
        resolvedTitle: sig.title,
        confidence: 'high',
        suggestedTags: sig.tags,
        suggestedCategory: sig.category,
      };
    }
  }

  // 2. Query Ultra-Fast AI (Groq Llama 3.3 70B ~150ms or Gemini)
  try {
    const sample = (codeSnippet || '').slice(0, 1000);
    const prompt = `Identify the real official video game title for this unblocked web game file:
Filename: "${fileName}"
Code/URL Excerpt:
"""${sample}"""

Important:
- Expand abbreviations (e.g. "3pandasfantasy" -> "3 Pandas in Fantasy", "3pandasbrazil" -> "3 Pandas in Brazil", "3pandasjapan" -> "3 Pandas in Japan", "cl10bullets" -> "10 Bullets").
- Return a strict JSON object with NO markdown quotes:
{"title": "Canonical Game Title", "category": "arcade"|"action"|"puzzle"|"retro", "tags": ["tag1", "tag2"]}`;

    const raw = await askAI(prompt, 'You are an unblocked video games archivist. Output only valid JSON.');
    const cleaned = raw.replace(/^```json/i, '').replace(/^```/, '').replace(/```$/, '').trim();
    const parsed = JSON.parse(cleaned);

    if (parsed.title && parsed.title.length > 1) {
      return {
        originalName: fileName,
        resolvedTitle: parsed.title,
        confidence: 'high',
        suggestedTags: Array.isArray(parsed.tags) ? parsed.tags : ['Unblocked', 'Web Game'],
        suggestedCategory: parsed.category || 'action',
      };
    }
  } catch (err) {
    // Graceful fallback to smart heuristic
  }

  // 3. Fallback to smart heuristic cleanTitleFromFilename
  const cleanedTitle = cleanTitleFromFilename(fileName);
  return {
    originalName: fileName,
    resolvedTitle: cleanedTitle,
    confidence: 'high',
    suggestedTags: ['Web Game', 'Flash'],
    suggestedCategory: 'action',
  };
}
