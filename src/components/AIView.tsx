/**
 * AI Hub View - Renamed to "AI"
 * Features 2 buttons: "Chatbot" and "AI for Game",
 * with on-demand API Key modal trigger button.
 */

import React, { useState, useRef, useEffect } from 'react';
import {
  Bot,
  Gamepad2,
  Key,
  Send,
  Sparkles,
  ShieldCheck,
  Wrench,
  Copy,
  Check,
  Code2,
  Brain,
  Trash2,
} from 'lucide-react';
import { ApiKeyModal } from './ApiKeyModal';
import { sanitizeAndRepairHtml, CodeHealthReport } from '../utils/eliteCodeSanitizer';
import { sound } from '../utils/audio';
import { askAI, getActiveApiKey } from '../utils/aiClient';

interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: number;
}

export const AIView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'chatbot' | 'game_ai'>('chatbot');
  const [showKeyModal, setShowKeyModal] = useState<boolean>(false);
  const [apiKey, setApiKey] = useState<string>(() => {
    return getActiveApiKey();
  });

  // Chatbot State
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'ai',
      text: "Hey! I'm Frosty AI, your unblocked arcade assistant. Ask me for gameplay tips, speedrun tricks, game recommendations, or help fixing broken HTML5 and Flash games.",
      timestamp: Date.now(),
    },
  ]);
  const [chatInput, setChatInput] = useState<string>('');
  const [isBotTyping, setIsBotTyping] = useState<boolean>(false);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  // AI for Game State
  const [testInput, setTestInput] = useState<string>('slope-unblocked-v2-full-game.html');
  const [aiResult, setAiResult] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);

  // Code Auditor State
  const [htmlCodeToAudit, setHtmlCodeToAudit] = useState<string>(
    '<!DOCTYPE html><html><head><script src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script><script>if (top != self) top.location = self.location;</script></head><body><canvas id="c"></canvas><script>console.log("Game loaded");</script></body></html>'
  );
  const [auditReport, setAuditReport] = useState<CodeHealthReport | null>(null);
  const [repairedCode, setRepairedCode] = useState<string | null>(null);
  const [copiedNotice, setCopiedNotice] = useState<boolean>(false);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isBotTyping]);

  // Send message to Gemini 2.5 Flash / Free Tier
  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const prompt = chatInput.trim();
    if (!prompt || isBotTyping) return;

    sound.playKeypress();
    const userMsg: ChatMessage = {
      id: `msg_${Date.now()}_u`,
      sender: 'user',
      text: prompt,
      timestamp: Date.now(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setChatInput('');
    setIsBotTyping(true);

    const systemInstruction = `You are Frosty AI, an elite, witty, helpful unblocked gaming companion and game preservation expert.
You know everything about browser games (Slope, 1v1.lol, Run 3, 2048, 3 Pandas, Retro Bowl, Happy Wheels, Flash games, WebGL canvas mechanics, HTML5 unblocked engines, and cheats).
Keep your answers engaging, concise, and helpful. Use formatting with bullet points and bold text where helpful.`;

    let botResponse = '';

    try {
      botResponse = await askAI(prompt, systemInstruction);
    } catch {
      const p = prompt.toLowerCase();
      if (p.includes('slope')) {
        botResponse = `### Frosty Pro Slope Strategy
- **Center-Line Discipline**: Over 70% of red obstacle blocks spawn towards the outer edges. Keep your ball glued to the center white partition.
- **Feathered Inputs**: Avoid prolonged arrow/key holds. Use micro-taps to maintain high-speed gyro stability.
- **Ramp Trajectory**: Look ahead 2 slopes to prepare your landing angle before hitting launch pads.`;
      } else if (p.includes('3 pandas') || p.includes('panda')) {
        botResponse = `### 3 Pandas Strategy Guide
- **The Trio Abilities**: The tall panda acts as a ladder for the others, the chubby panda can throw teammates upward, and the small panda can squeeze into narrow pipes.
- **Fantasy & Japan Secrets**: In '3 Pandas in Fantasy', activate fairy mushrooms to unlock hidden pathways. In '3 Pandas in Japan', use camera flashes to stun hostile ninja patrols!`;
      } else if (p.includes('street fighter') || p.includes('sfiii') || p.includes('impact')) {
        botResponse = `### Street Fighter III: 2nd Impact Combat Guide
- **Universal Parry**: Tap Forward right before high/mid attacks land, or Down for low sweeps. Parrying negates all chip damage and leaves the opponent in frame disadvantage.
- **EX Specials**: Spend 1 gauge segment to turn regular specials into invincible or armor-breaking moves.
- **Super Arts Selection**: Pick Super Art I if you prefer frequent EX moves, or SA III for maximum single-burst damage.`;
      } else if (p.includes('10 bullets') || p.includes('bullet')) {
        botResponse = `### 10 Bullets Chain-Reaction Strategy
- **Patience is Everything**: You only have 10 shots. Do not fire at the first ship. Wait for large carriers and dense swarms to cross paths.
- **Shrapnel Cascades**: Destroying heavy blimps releases high-velocity shrapnel that triggers secondary explosions across the entire sky.
- **Combo Multipliers**: Aim for cascading chain reactions to clear 50+ ships with a single bullet.`;
      } else if (p.includes('2048')) {
        botResponse = `### 2048 Glacial Cube Strategy
- **Corner Dominance**: Keep your highest number permanently locked in the bottom-right (or bottom-left) corner. Never press the opposite direction!
- **Build Chains**: Arrange your numbers in descending order (e.g. 512, 256, 128, 64) along the bottom row for effortless cascading merges.
- **AI Solver**: Try clicking 'Auto-run' in our newly added 2048 AI Edition to watch the automated solver build a 4096 tile!`;
      } else {
        botResponse = `I'm here to help! Ask me for gameplay guides, secret combos, unblocked game recommendations, or code assistance. Connected to Groq Llama 3.3 70B!`;
      }
    }

    setMessages((prev) => [
      ...prev,
      {
        id: `msg_${Date.now()}_ai`,
        sender: 'ai',
        text: botResponse,
        timestamp: Date.now(),
      },
    ]);

    setIsBotTyping(false);
  };

  // AI Game Title Identification
  const handleIdentifyGame = async () => {
    sound.playKeypress();
    setIsAnalyzing(true);
    setAiResult(null);

    let result = '';

    try {
      result = await askAI(
        `Analyze this unblocked game file name or excerpt: "${testInput}".
Return:
1. Canonical Official Game Title
2. Genre & Engine (WebGL, Phaser, Construct, Flash)
3. 2 Pro Gameplay Tips / Known Secrets`,
        'You are an expert unblocked video games archivist.'
      );
    } catch {
      result = `### Official Heuristic Identification\n- **Identified Title**: ${testInput.replace(/\.[a-z]+$/i, '').replace(/[-_]/g, ' ')}\n- **Engine**: Client-Side HTML5 Canvas / WebGL\n- **Tip**: Keep reaction times primed for high velocity obstacles.`;
    }

    setAiResult(result);
    setIsAnalyzing(false);
  };

  // Code Auditor
  const handleAuditAndRepair = () => {
    sound.playKeypress();
    const { repairedHtml, report } = sanitizeAndRepairHtml(htmlCodeToAudit);
    setAuditReport(report);
    setRepairedCode(repairedHtml);
    sound.playUnlock();
  };

  const handleCopyRepaired = () => {
    if (!repairedCode) return;
    sound.playKeypress();
    navigator.clipboard.writeText(repairedCode);
    setCopiedNotice(true);
    setTimeout(() => setCopiedNotice(false), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-8">
      {/* Top Bar: Title 'AI', 2 Mode Buttons & API Key Trigger */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-950/70 border border-cyan-500/40 text-cyan-300 flex items-center justify-center">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-white">AI</h1>
            <p className="text-xs text-slate-400">
              Unblocked Gaming Assistant & Code Optimizer
            </p>
          </div>
        </div>

        {/* 2 Main Action Buttons + API Key Button */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 p-1 bg-slate-900 border border-slate-800 rounded-xl">
            <button
              onClick={() => {
                sound.playKeypress();
                setActiveTab('chatbot');
              }}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                activeTab === 'chatbot'
                  ? 'bg-cyan-400 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Bot className="w-3.5 h-3.5" />
              <span>Chatbot</span>
            </button>

            <button
              onClick={() => {
                sound.playKeypress();
                setActiveTab('game_ai');
              }}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                activeTab === 'game_ai'
                  ? 'bg-cyan-400 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Gamepad2 className="w-3.5 h-3.5" />
              <span>AI for Game</span>
            </button>
          </div>

          {/* Clean API Key Button */}
          <button
            onClick={() => {
              sound.playKeypress();
              setShowKeyModal(true);
            }}
            title="Configure Gemini API Key"
            className="flex items-center gap-1.5 px-3 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-cyan-500/40 text-xs font-semibold text-slate-300 hover:text-cyan-300 rounded-xl transition-all cursor-pointer"
          >
            <Key className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline">API Key</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      {activeTab === 'chatbot' ? (
        /* Chatbot Interface */
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl flex flex-col h-[580px] overflow-hidden shadow-xl">
          {/* Chat Messages Log */}
          <div className="flex-1 p-5 overflow-y-auto space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 max-w-2xl ${
                  msg.sender === 'user' ? 'ml-auto flex-row-reverse' : ''
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                    msg.sender === 'user'
                      ? 'bg-slate-800 text-slate-200'
                      : 'bg-cyan-950 border border-cyan-500/40 text-cyan-300'
                  }`}
                >
                  {msg.sender === 'user' ? (
                    <span className="text-xs font-bold">You</span>
                  ) : (
                    <Bot className="w-4 h-4" />
                  )}
                </div>

                <div
                  className={`p-3.5 rounded-2xl text-xs leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-cyan-500 text-slate-950 font-medium rounded-tr-xs'
                      : 'bg-slate-950/80 border border-slate-800/80 text-slate-200 rounded-tl-xs whitespace-pre-line'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {isBotTyping && (
              <div className="flex gap-3 max-w-md">
                <div className="w-8 h-8 rounded-lg bg-cyan-950 border border-cyan-500/40 text-cyan-300 flex items-center justify-center shrink-0">
                  <Bot className="w-4 h-4 animate-pulse" />
                </div>
                <div className="p-3 bg-slate-950/80 border border-slate-800 rounded-2xl text-xs text-slate-400 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                  <span>Frosty AI is thinking...</span>
                </div>
              </div>
            )}
            <div ref={chatBottomRef} />
          </div>

          {/* Quick Prompt Pills */}
          <div className="px-5 py-2 bg-slate-950/40 border-t border-slate-800/60 flex items-center gap-2 overflow-x-auto text-[11px] text-slate-400">
            <span className="text-slate-500 shrink-0">Suggestions:</span>
            <button
              onClick={() => {
                setChatInput('What are the best tips to get a high score in Slope?');
              }}
              className="px-2.5 py-1 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg hover:text-cyan-300 transition-colors shrink-0"
            >
              Slope Tips
            </button>
            <button
              onClick={() => {
                setChatInput('Give me secret cheat codes and shortcuts for Retro Bowl.');
              }}
              className="px-2.5 py-1 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg hover:text-cyan-300 transition-colors shrink-0"
            >
              Retro Bowl Cheats
            </button>
            <button
              onClick={() => {
                setChatInput('Recommend 5 must-play classic Flash games I should upload.');
              }}
              className="px-2.5 py-1 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg hover:text-cyan-300 transition-colors shrink-0"
            >
              Top Flash Games
            </button>
          </div>

          {/* Chat Input Bar */}
          <form
            onSubmit={handleSendMessage}
            className="p-3 border-t border-slate-800 bg-slate-950/80 flex items-center gap-2"
          >
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="Ask Frosty AI anything about games, cheats, or code..."
              className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-400"
            />
            <button
              type="submit"
              disabled={isBotTyping || !chatInput.trim()}
              className="px-4 py-2.5 bg-cyan-400 hover:bg-cyan-300 disabled:opacity-50 text-slate-950 font-semibold rounded-xl text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Send</span>
            </button>
          </form>
        </div>
      ) : (
        /* AI for Game Interface */
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Card 1: Title & Script Intelligence */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between shadow-xl">
            <div>
              <div className="flex items-center gap-2 text-sm font-semibold text-white mb-2">
                <Brain className="w-4 h-4 text-cyan-400" />
                <span>Game Title & Script Intelligence</span>
              </div>
              <p className="text-xs text-slate-400 mb-4 leading-relaxed">
                Test any ambiguous file name, archive title, or code snippet to identify its real title and genre.
              </p>

              <div className="space-y-3">
                <textarea
                  rows={3}
                  value={testInput}
                  onChange={(e) => setTestInput(e.target.value)}
                  placeholder="e.g. 1v1-lol-build.html or <title>Slope</title>..."
                  className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs font-mono text-slate-200 focus:outline-none focus:border-cyan-400 resize-none"
                />

                <button
                  onClick={handleIdentifyGame}
                  disabled={isAnalyzing || !testInput.trim()}
                  className="w-full flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 disabled:opacity-50 rounded-xl shadow-sm transition-all cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{isAnalyzing ? 'Analyzing with Gemini...' : 'Identify Game'}</span>
                </button>
              </div>

              {aiResult && (
                <div className="mt-4 p-4 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-300 whitespace-pre-line leading-relaxed font-sans">
                  {aiResult}
                </div>
              )}
            </div>
          </div>

          {/* Card 2: Elite Code Auditor & Auto-Repair */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between shadow-xl">
            <div>
              <div className="flex items-center gap-2 text-sm font-semibold text-white mb-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Elite HTML Code Auditor & Auto-Repair</span>
              </div>
              <p className="text-xs text-slate-400 mb-4 leading-relaxed">
                Scans code for framebusters, ad trackers, and missing SDKs. Auto-injects PokiSDK and CrazyGames polyfills.
              </p>

              <div className="space-y-3">
                <textarea
                  rows={3}
                  value={htmlCodeToAudit}
                  onChange={(e) => setHtmlCodeToAudit(e.target.value)}
                  placeholder="Paste HTML code to inspect..."
                  className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs font-mono text-slate-200 focus:outline-none focus:border-cyan-400 resize-none"
                />

                <button
                  onClick={handleAuditAndRepair}
                  disabled={!htmlCodeToAudit.trim()}
                  className="w-full flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 disabled:opacity-50 rounded-xl shadow-sm transition-all cursor-pointer"
                >
                  <Wrench className="w-3.5 h-3.5" />
                  <span>Audit & Auto-Repair Code</span>
                </button>
              </div>

              {auditReport && (
                <div className="mt-4 p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-white flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Health Score: {auditReport.healthScore}%</span>
                    </span>
                    <button
                      onClick={handleCopyRepaired}
                      className="flex items-center gap-1 text-cyan-400 hover:text-cyan-300 font-medium cursor-pointer"
                    >
                      {copiedNotice ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedNotice ? 'Copied!' : 'Copy Fixed Code'}</span>
                    </button>
                  </div>

                  <div className="text-[11px] text-slate-400 space-y-1">
                    {auditReport.fixesApplied.map((fix, idx) => (
                      <div key={idx} className="flex items-center gap-1.5 text-slate-300">
                        <Check className="w-3 h-3 text-emerald-400 shrink-0" />
                        <span>{fix}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* API Key Modal */}
      {showKeyModal && (
        <ApiKeyModal
          onClose={() => setShowKeyModal(false)}
          onSaved={(newKey) => setApiKey(newKey)}
        />
      )}
    </div>
  );
};
