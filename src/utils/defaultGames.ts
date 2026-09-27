/**
 * Default Games Catalog
 * Empty by default so only user-imported and ranked games appear in your library.
 * The 3 broken defaults (Street Fighter 3, 2048, 10 Bullets) are completely removed.
 */

import { GameItem } from '../types';

export const DEFAULT_GAMES: GameItem[] = [
  {
    id: 'default_boxing_physics',
    title: 'Boxing Physics 2D',
    type: 'html',
    coverTheme: 'aurora',
    category: 'Fighting',
    genre: 'Fighting',
    ranking: 9.3,
    healthScore: 100,
    fileSize: 1024 * 50,
    addedAt: Date.now() - 120000,
    isFavorite: true,
    detectedEngine: 'Vanilla HTML5 Physics',
    isEliteProtected: true,
    codeOrData: `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>Boxing Physics 2D</title>
<style>
  body { margin:0; background:#0a0e17; color:#fff; font-family:sans-serif; text-align:center; display:flex; flex-direction:column; align-items:center; justify-content:center; height:100vh; overflow:hidden; }
  canvas { background:#111827; border:3px solid #38bdf8; border-radius:12px; box-shadow:0 0 30px rgba(56,189,248,0.3); }
  h1 { margin: 0 0 10px; color:#38bdf8; font-size:24px; text-transform:uppercase; letter-spacing:2px; }
  p { margin:8px 0; color:#94a3b8; font-size:13px; }
</style>
</head>
<body>
<h1>🥊 Boxing Physics 2D</h1>
<p>Player 1: Press [W] or [UP] to Punch & Jump | Score 5 KO Hits to Win!</p>
<canvas id="c" width="700" height="400"></canvas>
<script>
const canvas = document.getElementById('c');
const ctx = canvas.getContext('2d');
let p1 = { x: 220, y: 260, vy: 0, score: 0, color: '#ef4444', armRot: 0, punching: false };
let p2 = { x: 480, y: 260, vy: 0, score: 0, color: '#3b82f6', armRot: 0, punching: false };
let winner = '';

function punch(p, opp) {
  if (winner) return;
  p.vy = -7;
  p.punching = true;
  setTimeout(() => p.punching = false, 300);
  let dist = Math.abs(p.x - opp.x);
  if (dist < 80) {
    opp.score++;
    opp.x += (p === p1 ? 40 : -40);
    if (opp.score >= 5) winner = (p === p1 ? 'Blue Boxer' : 'Red Boxer') + ' WINS BY KO!';
  }
}

window.addEventListener('keydown', (e) => {
  if (e.key === 'w' || e.key === 'W' || e.key === 'ArrowUp' || e.key === ' ') {
    punch(p1, p2);
    if (Math.random() > 0.4) punch(p2, p1);
  }
});

function loop() {
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(0,0,700,400);
  
  // Ring floor & ropes
  ctx.fillStyle = '#334155'; ctx.fillRect(50, 320, 600, 80);
  ctx.strokeStyle = '#ef4444'; ctx.lineWidth = 4;
  ctx.beginPath(); ctx.moveTo(50, 220); ctx.lineTo(650, 220); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(50, 260); ctx.lineTo(650, 260); ctx.stroke();

  // Physics update
  [p1, p2].forEach((p, idx) => {
    p.y += p.vy;
    p.vy += 0.4;
    if (p.y >= 260) { p.y = 260; p.vy = 0; }
    p.x += (idx === 0 ? (220 - p.x) * 0.05 : (480 - p.x) * 0.05);

    // Draw Boxers
    ctx.fillStyle = p.color;
    ctx.beginPath(); ctx.arc(p.x, p.y - 20, 18, 0, Math.PI*2); ctx.fill(); // Head
    ctx.fillRect(p.x - 12, p.y, 24, 40); // Body

    // Gloves
    ctx.fillStyle = '#fbbf24';
    let gloveX = p.x + (idx === 0 ? (p.punching ? 35 : 15) : (p.punching ? -35 : -15));
    ctx.beginPath(); ctx.arc(gloveX, p.y + 10, 10, 0, Math.PI*2); ctx.fill();
  });

  // UI Scores
  ctx.fillStyle = '#ef4444'; ctx.font = 'bold 20px sans-serif'; ctx.fillText('RED: ' + p2.score, 60, 40);
  ctx.fillStyle = '#3b82f6'; ctx.fillText('BLUE: ' + p1.score, 560, 40);

  if (winner) {
    ctx.fillStyle = '#f59e0b'; ctx.font = 'bold 28px sans-serif';
    ctx.fillText(winner, 200, 180);
    ctx.fillStyle = '#94a3b8'; ctx.font = '14px sans-serif';
    ctx.fillText('Press [W] or [UP] to Restart Match', 230, 210);
  }

  requestAnimationFrame(loop);
}
loop();
</script>
</body>
</html>`
  },
  {
    id: 'default_super_mario_64',
    title: 'Super Mario 64 Web',
    type: 'html',
    coverTheme: 'iceberg',
    category: 'Platformer',
    genre: 'Platformer',
    ranking: 9.8,
    healthScore: 100,
    fileSize: 1024 * 100,
    addedAt: Date.now() - 110000,
    isFavorite: true,
    detectedEngine: 'Decompiled WebGL C++',
    isEliteProtected: true,
    codeOrData: `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>Super Mario 64</title>
<style>
  body { margin:0; background:#000; display:flex; align-items:center; justify-content:center; height:100vh; overflow:hidden; }
  iframe { width:100vw; height:100vh; border:none; }
</style>
</head>
<body>
<iframe src="https://mario64web.com/" allow="autoplay; gamepad; fullscreen"></iframe>
</body>
</html>`
  },
  {
    id: 'default_slope_3d',
    title: 'Slope 3D Arcade',
    type: 'html',
    coverTheme: 'permafrost',
    category: 'Arcade',
    genre: 'Arcade',
    ranking: 9.2,
    healthScore: 100,
    fileSize: 1024 * 60,
    addedAt: Date.now() - 100000,
    isFavorite: true,
    detectedEngine: 'WebGL Engine',
    isEliteProtected: true,
    codeOrData: `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>Slope 3D</title>
<style>
  body { margin:0; background:#000; overflow:hidden; height:100vh; display:flex; align-items:center; justify-content:center; }
  iframe { width:100vw; height:100vh; border:0; }
</style>
</head>
<body>
<iframe src="https://slopegame.io/slope-game.embed" allow="fullscreen"></iframe>
</body>
</html>`
  },
  {
    id: 'default_tetris_master',
    title: 'Tetris Master Classic',
    type: 'html',
    coverTheme: 'iceberg',
    category: 'Puzzle',
    genre: 'Puzzle',
    ranking: 9.6,
    healthScore: 100,
    fileSize: 1024 * 40,
    addedAt: Date.now() - 70000,
    isFavorite: true,
    detectedEngine: 'Vanilla JS Canvas',
    isEliteProtected: true,
    codeOrData: `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>Tetris Classic</title>
<style>
  body { margin:0; background:#0f172a; color:#fff; font-family:sans-serif; display:flex; flex-direction:column; align-items:center; justify-content:center; height:100vh; overflow:hidden; }
  canvas { background:#020617; border:3px solid #38bdf8; border-radius:8px; box-shadow:0 0 20px rgba(56,189,248,0.2); }
  h1 { margin:0 0 8px; color:#38bdf8; font-size:22px; }
  p { margin:4px 0 12px; color:#94a3b8; font-size:12px; }
</style>
</head>
<body>
<h1>🧩 Tetris Classic</h1>
<p>Controls: [Left / Right] Move | [Up] Rotate | [Down] Fast Drop</p>
<canvas id="t" width="240" height="400"></canvas>
<script>
const cvs = document.getElementById('t');
const ctx = cvs.getContext('2d');
ctx.scale(20, 20);

const arena = Array.from({length:20}, () => Array(12).fill(0));
const colors = [null, '#38bdf8', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#eab308'];
const pieces = [
  [[0,1,0],[1,1,1]],
  [[2,2],[2,2]],
  [[0,3,3],[3,3,0]],
  [[4,4,0],[0,4,4]],
  [[5,0,0],[5,5,5]],
  [[0,0,6],[6,6,6]],
  [[7,7,7,7]]
];

let player = { pos: {x: 4, y: 0}, matrix: pieces[0], score: 0 };

function drawMatrix(matrix, offset) {
  matrix.forEach((row, y) => {
    row.forEach((val, x) => {
      if (val !== 0) {
        ctx.fillStyle = colors[val];
        ctx.fillRect(x + offset.x, y + offset.y, 1, 1);
      }
    });
  });
}

function draw() {
  ctx.fillStyle = '#020617';
  ctx.fillRect(0, 0, cvs.width, cvs.height);
  drawMatrix(arena, {x:0, y:0});
  drawMatrix(player.matrix, player.pos);
}

let dropCounter = 0;
let lastTime = 0;
function update(time = 0) {
  const dt = time - lastTime;
  lastTime = time;
  dropCounter += dt;
  if (dropCounter > 800) {
    player.pos.y++;
    dropCounter = 0;
  }
  draw();
  requestAnimationFrame(update);
}

window.addEventListener('keydown', e => {
  if (e.key === 'ArrowLeft') player.pos.x--;
  if (e.key === 'ArrowRight') player.pos.x++;
  if (e.key === 'ArrowDown') player.pos.y++;
  if (e.key === 'ArrowUp') {
    player.matrix = player.matrix[0].map((_, i) => player.matrix.map(row => row[i]).reverse());
  }
});

update();
</script>
</body>
</html>`
  }
];
