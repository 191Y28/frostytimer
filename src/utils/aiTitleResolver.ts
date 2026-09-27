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
  { pattern: /babel.*tower/i, title: 'Babel Tower', category: 'arcade', tags: ['Idle', 'Tower', 'Management'] },
  { pattern: /3.*pandas.*fantasy/i, title: '3 Pandas in Fantasy', category: 'puzzle', tags: ['Panda', 'Point & Click', 'Puzzle'] },
  { pattern: /3.*pandas.*japan/i, title: '3 Pandas in Japan', category: 'puzzle', tags: ['Panda', 'Adventure', 'Puzzle'] },
  { pattern: /3.*pandas.*brazil/i, title: '3 Pandas in Brazil', category: 'puzzle', tags: ['Panda', 'Escape', 'Puzzle'] },
  { pattern: /3.*pandas.*night/i, title: '3 Pandas: Night', category: 'puzzle', tags: ['Panda', 'Night', 'Puzzle'] },
  { pattern: /3.*pandas/i, title: '3 Pandas', category: 'puzzle', tags: ['Panda', 'Puzzle', 'Classic'] },
  { pattern: /duck.*life.*4/i, title: 'Duck Life 4', category: 'arcade', tags: ['Training', 'Duck', 'Adventure'] },
  { pattern: /duck.*life.*3/i, title: 'Duck Life 3: Evolution', category: 'arcade', tags: ['Training', 'Duck', 'Evolution'] },
  { pattern: /duck.*life.*2/i, title: 'Duck Life 2', category: 'arcade', tags: ['Training', 'Duck', 'Racing'] },
  { pattern: /duck.*life/i, title: 'Duck Life', category: 'arcade', tags: ['Training', 'Duck', 'Classic'] },
  { pattern: /bloons.*(tower.*defense|td).*5/i, title: 'Bloons TD 5', category: 'action', tags: ['Tower Defense', 'Monkey', 'Balloons'] },
  { pattern: /bloons.*(tower.*defense|td).*4/i, title: 'Bloons TD 4', category: 'action', tags: ['Tower Defense', 'Monkey', 'Balloons'] },
  { pattern: /bloons/i, title: 'Bloons Tower Defense', category: 'action', tags: ['Tower Defense', 'Monkey'] },
  { pattern: /papa.*freezeria/i, title: "Papa's Freezeria", category: 'arcade', tags: ['Cooking', 'Time Management', 'Restaurant'] },
  { pattern: /papa.*pizzeria/i, title: "Papa's Pizzeria", category: 'arcade', tags: ['Cooking', 'Pizza', 'Restaurant'] },
  { pattern: /papa.*burgeria/i, title: "Papa's Burgeria", category: 'arcade', tags: ['Cooking', 'Burger', 'Restaurant'] },
  { pattern: /papa.*taco/i, title: "Papa's Taco Mia", category: 'arcade', tags: ['Cooking', 'Tacos', 'Restaurant'] },
  { pattern: /papa.*cupcakeria/i, title: "Papa's Cupcakeria", category: 'arcade', tags: ['Cooking', 'Bakery', 'Restaurant'] },
  { pattern: /riddle.*school.*(7|transfer.*2)/i, title: 'Riddle Transfer 2', category: 'puzzle', tags: ['Escape', 'Point & Click', 'School'] },
  { pattern: /riddle.*school.*(6|transfer)/i, title: 'Riddle Transfer', category: 'puzzle', tags: ['Escape', 'Point & Click', 'School'] },
  { pattern: /riddle.*school.*5/i, title: 'Riddle School 5', category: 'puzzle', tags: ['Escape', 'Point & Click', 'School'] },
  { pattern: /riddle.*school.*4/i, title: 'Riddle School 4', category: 'puzzle', tags: ['Escape', 'Point & Click', 'School'] },
  { pattern: /riddle.*school.*3/i, title: 'Riddle School 3', category: 'puzzle', tags: ['Escape', 'Point & Click', 'School'] },
  { pattern: /riddle.*school.*2/i, title: 'Riddle School 2', category: 'puzzle', tags: ['Escape', 'Point & Click', 'School'] },
  { pattern: /riddle.*school/i, title: 'Riddle School', category: 'puzzle', tags: ['Escape', 'Point & Click', 'Classic'] },
  { pattern: /learn.*to.*fly.*3/i, title: 'Learn to Fly 3', category: 'arcade', tags: ['Penguin', 'Upgrade', 'Launch'] },
  { pattern: /learn.*to.*fly.*2/i, title: 'Learn to Fly 2', category: 'arcade', tags: ['Penguin', 'Upgrade', 'Launch'] },
  { pattern: /learn.*to.*fly/i, title: 'Learn to Fly', category: 'arcade', tags: ['Penguin', 'Upgrade', 'Launch'] },
  { pattern: /super.*smash.*flash.*2|ssf2/i, title: 'Super Smash Flash 2', category: 'action', tags: ['Fighting', 'Nintendo', 'Anime'] },
  { pattern: /super.*smash.*flash/i, title: 'Super Smash Flash', category: 'action', tags: ['Fighting', 'Nintendo', 'Classic'] },
  { pattern: /1.*on.*1.*basketball/i, title: '1 On 1 Basketball', category: 'arcade', tags: ['Sports', 'Basketball', '2 Player'] },
  { pattern: /1.*on.*1.*soccer/i, title: '1 On 1 Soccer', category: 'arcade', tags: ['Sports', 'Soccer', '2 Player'] },
  { pattern: /basketball.*stars/i, title: 'Basketball Stars', category: 'arcade', tags: ['Sports', 'Basketball', 'Head to Head'] },
  { pattern: /drift.*(boss|hunters)/i, title: 'Drift Boss', category: 'arcade', tags: ['Cars', 'Drifting', '3D'] },
  { pattern: /vex.*7/i, title: 'Vex 7', category: 'action', tags: ['Parkour', 'Platformer', 'Stickman'] },
  { pattern: /vex.*6/i, title: 'Vex 6', category: 'action', tags: ['Parkour', 'Platformer', 'Stickman'] },
  { pattern: /vex.*5/i, title: 'Vex 5', category: 'action', tags: ['Parkour', 'Platformer', 'Stickman'] },
  { pattern: /vex.*4/i, title: 'Vex 4', category: 'action', tags: ['Parkour', 'Platformer', 'Stickman'] },
  { pattern: /vex.*3/i, title: 'Vex 3', category: 'action', tags: ['Parkour', 'Platformer', 'Stickman'] },
  { pattern: /bitlife/i, title: 'BitLife Life Simulator', category: 'puzzle', tags: ['Simulation', 'Text', 'Choices'] },
  { pattern: /tank.*trouble/i, title: 'Tank Trouble', category: 'action', tags: ['Tanks', 'Maze', 'Multiplayer'] },
  { pattern: /world.*s?.*hardest.*game/i, title: "The World's Hardest Game", category: 'puzzle', tags: ['Hard', 'Skill', 'Precision'] },
  { pattern: /age.*of.*war.*2/i, title: 'Age of War 2', category: 'action', tags: ['Strategy', 'War', 'Defense'] },
  { pattern: /age.*of.*war/i, title: 'Age of War', category: 'action', tags: ['Strategy', 'War', 'Defense'] },
  { pattern: /stick.*hook/i, title: 'Stickman Hook', category: 'arcade', tags: ['Physics', 'Swing', 'Skill'] },
  { pattern: /stick.*war/i, title: 'Stick War', category: 'action', tags: ['Strategy', 'Stickman', 'Army'] },
  { pattern: /rooftop.*snipers/i, title: 'Rooftop Snipers', category: 'action', tags: ['Physics', '2 Player', 'Ragdoll'] },
  { pattern: /getaway.*shootout/i, title: 'Getaway Shootout', category: 'action', tags: ['Physics', '2 Player', 'Race'] },
  { pattern: /tunnel.*rush/i, title: 'Tunnel Rush', category: 'arcade', tags: ['3D', 'Speed', 'Fast-Paced'] },
  { pattern: /snow.*rider/i, title: 'Snow Rider 3D', category: 'arcade', tags: ['3D', 'Snow', 'Runner'] },
  { pattern: /smash.*karts/i, title: 'Smash Karts', category: 'action', tags: ['3D', 'Kart', 'Battle'] },
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
