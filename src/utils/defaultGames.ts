/**
 * Premier Unblocked Games - No Fillers
 * Only genuine, high-quality games:
 * 1. Street Fighter III: 2nd Impact (EmulatorJS Arcade CPS3)
 * 2. 10 Bullets (Ruffle WebAssembly Flash)
 * 3. 2048 with AI Solver (HTML5 Canvas & AI Solver)
 */

import { GameItem } from '../types';

export const DEFAULT_GAMES: GameItem[] = [
  {
    id: 'frosty-sfiii2',
    title: 'Street Fighter III: 2nd Impact',
    type: 'html',
    coverTheme: 'frostbite',
    category: 'action',
    fileSize: 4103,
    addedAt: Date.now() - 3600000 * 48,
    detectedEngine: 'EmulatorJS Arcade (CPS-3)',
    healthScore: 100,
    isEliteProtected: true,
    description: 'Capcom legendary fighting masterpiece running on EmulatorJS Arcade core with multi-part ROM streaming.',
    codeOrData: `<!-- Ultimate Game Stash file-->
<!-- For regularly updating doc go to https://docs.google.com/document/d/1_FmH3BlSBQI7FGgAQL59-ZPe8eCxs35wel6JUyVaG8Q/ -->
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Street Fighter 3: Second Impact</title>
    <script>
      window.gameconfig = {
        name: "Street Fighter 3: Second Impact",
        romName: "sfiii2.zip", 
        url: "https://cdn.jsdelivr.net/gh/Ray52511/Emujsgames@main/sfiii2/sfiii2.zip",
        core: "arcade",
        min: 1,
        max: 3,
      };
    </script>

    <script>
      async function mergeFiles(fileParts, onProgress) {
        const buffers = [];
        for (let index = 0; index < fileParts.length; index++) {
          const response = await fetch(fileParts[index]);
          if (!response.ok) {
            throw new Error(\`Failed to download \${fileParts[index]}: \${response.status}\`);
          }
          buffers.push(await response.arrayBuffer());
          onProgress(index + 1);
        }
        const mergedBlob = new Blob(buffers, { type: "application/zip" });
        return new File([mergedBlob], window.gameconfig.romName, { type: "application/zip" });
      }

      function getParts(file, start, end) {
        const parts = [];
        for (let i = start; i <= end; i++) {
          parts.push(\`\${file}.part\${i}\`);
        }
        return parts;
      }
    </script>

    <style>
      body, html {
        margin: 0;
        padding: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        background-color: #020617;
        color: white;
        font-family: Arial, sans-serif;
        overflow: hidden;
      }
      #game-container {
        text-align: center;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }
      #game {
        width: 100%;
        height: 100%;
      }
      #loading-progress {
        font-size: 16px;
        margin-top: 20px;
        padding: 10px 20px;
        background: rgba(30, 41, 59, 0.8);
        border: 1px solid rgba(56, 189, 248, 0.3);
        border-radius: 8px;
        display: inline-block;
        color: #38bdf8;
      }
      #first-time {
        font-size: 12px;
        color: #94a3b8;
        margin-top: 8px;
      }
    </style>
  </head>
  <body>
    <div id="game-container">
      <div id="game"></div>
      <div id="loading-progress">Loading: 0/3</div>
      <div id="first-time">Streaming Arcade ROM partitions...</div>
    </div>

    <script>
      const parts = getParts(window.gameconfig.url, window.gameconfig.min, window.gameconfig.max);
      const totalParts = parts.length;

      function updateLoadingProgress(loaded) {
        const progressElement = document.getElementById("loading-progress");
        if (progressElement) progressElement.textContent = \`Loading ROM: \${loaded}/\${totalParts}\`;
      }

      updateLoadingProgress(0);

      mergeFiles(parts, updateLoadingProgress)
        .then((gameFile) => {
          const lp = document.getElementById("loading-progress");
          const ft = document.getElementById("first-time");
          if (lp) lp.remove();
          if (ft) ft.remove();

          window.EJS_player = "#game";
          window.EJS_core = window.gameconfig.core;
          window.EJS_gameName = window.gameconfig.name;
          window.EJS_color = "#38bdf8";
          window.EJS_startOnLoaded = true;
          window.EJS_pathtodata = "https://cdn.jsdelivr.net/gh/bubblfan/emu@master/";
          window.EJS_gameUrl = gameFile;
          window.EJS_defaultOptions = { vsync: "disabled" };

          const script = document.createElement("script");
          script.src = "https://cdn.jsdelivr.net/gh/bubblfan/emu@master/loader.js";
          document.body.appendChild(script);
        })
        .catch((error) => {
          const progressElement = document.getElementById("loading-progress");
          if (progressElement) progressElement.textContent = \`Error loading game: \${error.message}\`;
        });
    </script>
  </body>
</html>`,
  },
  {
    id: 'frosty-10bullets',
    title: '10 Bullets',
    type: 'html',
    coverTheme: 'permafrost',
    category: 'action',
    fileSize: 2331,
    addedAt: Date.now() - 3600000 * 24,
    detectedEngine: 'Ruffle WebAssembly Flash (.swf)',
    healthScore: 100,
    isEliteProtected: true,
    description: 'Iconic arcade chain-reaction defense game. You only get 10 bullets to create massive aerial combos.',
    codeOrData: `<!DOCTYPE html>
<!-- Ultimate Game Stash - 10 Bullets -->
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
  <title>10 Bullets</title>
  <style>
    html, body {
      margin: 0;
      padding: 0;
      background: black;
      overflow: hidden;
      height: 100%;
      width: 100%;
    }
    #flash-container {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: black;
    }
    ruffle-player {
      width: 100%;
      height: 100%;
      background: black;
      display: block;
    }
  </style>
  <script src="https://unpkg.com/@ruffle-rs/ruffle"></script>
</head>
<body>
  <div id="flash-container"></div>
  <script>
    const container = document.getElementById("flash-container");
    function resizeGame() {
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      const aspectRatio = 16 / 9;
      let width = Math.floor(windowWidth);
      let height = Math.floor(windowWidth / aspectRatio);
      if (height > windowHeight) {
        height = Math.floor(windowHeight);
        width = Math.floor(height * aspectRatio);
      }
      container.style.width = width + "px";
      container.style.height = height + "px";
    }
    window.addEventListener("resize", resizeGame);
    window.addEventListener("DOMContentLoaded", () => {
      resizeGame();
      const ruffle = window.RufflePlayer?.newest() || window.RufflePlayer?.createPlayer();
      if (ruffle && container) {
        const player = ruffle.createPlayer();
        player.style.width = "100%";
        player.style.height = "100%";
        player.style.background = "black";
        container.appendChild(player);
        player.load("https://cdn.jsdelivr.net/gh/ap-math-class/exams@main/swf/10Bullets.swf");
      }
    });
  </script>
</body>
</html>`,
  },
  {
    id: 'frosty-2048-ai',
    title: '2048 (AI Solver Edition)',
    type: 'html',
    coverTheme: 'aurora',
    category: 'puzzle',
    fileSize: 5233,
    addedAt: Date.now() - 3600000 * 12,
    detectedEngine: 'HTML5 Canvas & AI Solver',
    healthScore: 100,
    isEliteProtected: true,
    description: 'The definitive 2048 puzzle game equipped with an automated Monte Carlo tree-search AI solver.',
    codeOrData: `<!DOCTYPE html>
<!-- Ultimate Game Stash - 2048 AI Edition -->
<html>
<head>
  <meta charset="utf-8">
  <base href="https://cdn.jsdelivr.net/gh/ovolve/2048-AI@master/">
  <title>2048</title>
  <link href="style/main.css" rel="stylesheet" type="text/css">
  <link href="style/ai.css" rel="stylesheet" type="text/css">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no">
  <style>
    body { background: #020617 !important; color: #f8fafc !important; }
    .container { margin: 0 auto !important; }
  </style>
</head>
<body>
  <div class="container">
    <div class="heading">
      <h1 class="title">2048</h1>
      <div class="score-container">0</div>
    </div>
    <p class="game-intro">Join the numbers and get to the <strong>2048 tile!</strong></p>

    <div class="controls">
      <div id="hint-button-container">
        <button id="hint-button" class="ai-button">Get Hint</button>
      </div>
      <div id="feedback-container"> </div>
      <div id="run-button-container">
        <button id="run-button" class="ai-button">Auto-run</button>
      </div>
    </div>

    <div class="game-container">
      <div class="game-message">
        <p></p>
        <div class="lower">
          <a class="retry-button">Try again</a>
          <div class="score-sharing"></div>
        </div>
      </div>

      <div class="grid-container">
        <div class="grid-row"><div class="grid-cell"></div><div class="grid-cell"></div><div class="grid-cell"></div><div class="grid-cell"></div></div>
        <div class="grid-row"><div class="grid-cell"></div><div class="grid-cell"></div><div class="grid-cell"></div><div class="grid-cell"></div></div>
        <div class="grid-row"><div class="grid-cell"></div><div class="grid-cell"></div><div class="grid-cell"></div><div class="grid-cell"></div></div>
        <div class="grid-row"><div class="grid-cell"></div><div class="grid-cell"></div><div class="grid-cell"></div><div class="grid-cell"></div></div>
      </div>
      <div class="tile-container"></div>
    </div>
    <p class="game-explanation">
      Use <strong>arrow keys</strong> to slide tiles or click <strong>Auto-run</strong> to watch the AI play!
    </p>
  </div>

  <script src="js/animframe_polyfill.js"></script>
  <script src="js/hammer.min.js"></script>
  <script src="js/keyboard_input_manager.js"></script>
  <script src="js/html_actuator.js"></script>
  <script src="js/grid.js"></script>
  <script src="js/tile.js"></script>
  <script src="js/ai.js"></script>
  <script src="js/game_manager.js"></script>
  <script src="js/application.js"></script>
</body>
</html>`,
  },
];
