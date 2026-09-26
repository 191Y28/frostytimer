/**
 * Frosty Scientific Calculator - Decoy Gate
 * Genuine math evaluation combined with decoy code handling.
 * Unlocks the portal ONLY on MOBBDEEP.
 */

import React, { useState, useEffect } from 'react';
import { ArrowLeft, Delete, Sparkles, AlertCircle } from 'lucide-react';
import { sound } from '../utils/audio';
import { UNLOCK_CODE } from '../types';

interface CloakCalculatorProps {
  onBackToTimer: () => void;
  onUnlock: () => void;
}

export const CloakCalculator: React.FC<CloakCalculatorProps> = ({ onBackToTimer, onUnlock }) => {
  const [display, setDisplay] = useState<string>('0');
  const [history, setHistory] = useState<string>('');
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [isUnlocking, setIsUnlocking] = useState<boolean>(false);

  // Decoy messages map
  const DECOY_RESPONSES: Record<string, string> = {
    NOCHEUFC: 'SYNTAX ERROR: 0x94A',
    ROBBIELAWLERISTHEGOAT: 'OVERFLOW: BUFF_CAP_EXCEEDED',
    UFC331: '331.00000',
    BOXING: 'NaN (INVALID OPERAND)',
    'MUAY THAI': 'ERR: DOMAIN OUT OF RANGE',
    BJJ: 'SUBMISSION: EVAL_FAILED',
    WRESTLING: 'PIN: ZERO_DIVISION',
    KARATE: 'KEY INVALID: 0x00FF',
    GMAIL: 'TIMEOUT: SERVER_UNREACHABLE',
    SECRETJOIN: 'ACCESS DENIED: REQ_AUTH_LEVEL_4',
  };

  const checkCodeTrigger = (val: string) => {
    const normalized = val.trim().toUpperCase();

    if (normalized === UNLOCK_CODE) {
      sound.playUnlock();
      setIsUnlocking(true);
      setStatusMessage('FROST ENCRYPTION BROKEN · DECRYPTING ARCHIVE...');
      setTimeout(() => {
        onUnlock();
      }, 1000);
      return true;
    }

    if (DECOY_RESPONSES[normalized]) {
      sound.playLock();
      setDisplay(DECOY_RESPONSES[normalized]);
      setStatusMessage(`System: Evaluated "${normalized}"`);
      return true;
    }

    return false;
  };

  const handleInput = (char: string) => {
    sound.playKeypress();
    setStatusMessage(null);

    if (display === '0' || display.includes('ERROR') || display.includes('DENIED') || display.includes('NaN')) {
      setDisplay(char);
    } else {
      setDisplay((prev) => prev + char);
    }
  };

  const handleClear = () => {
    sound.playKeypress();
    setDisplay('0');
    setHistory('');
    setStatusMessage(null);
  };

  const handleDelete = () => {
    sound.playKeypress();
    setStatusMessage(null);
    if (display.length > 1) {
      setDisplay((prev) => prev.slice(0, -1));
    } else {
      setDisplay('0');
    }
  };

  const handleCalculate = () => {
    sound.playKeypress();

    // First check if user typed a secret or decoy code
    const isSpecial = checkCodeTrigger(display);
    if (isSpecial) return;

    // Normal safe math evaluation
    try {
      // sanitize math expression
      const sanitized = display.replace(/×/g, '*').replace(/÷/g, '/');
      if (!/^[0-9+\-*/(). %^]+$/.test(sanitized)) {
        setDisplay('SYNTAX ERROR');
        return;
      }
      // eslint-disable-next-line no-eval
      const result = Function(`'use strict'; return (${sanitized})`)();
      setHistory(display + ' =');
      setDisplay(Number.isFinite(result) ? String(result) : 'ERROR');
    } catch {
      setDisplay('SYNTAX ERROR');
    }
  };

  // Keyboard listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isUnlocking) return;

      if (e.key >= '0' && e.key <= '9') {
        handleInput(e.key);
      } else if (['+', '-', '*', '/'].includes(e.key)) {
        handleInput(e.key === '*' ? '×' : e.key === '/' ? '÷' : e.key);
      } else if (e.key === 'Enter' || e.key === '=') {
        e.preventDefault();
        handleCalculate();
      } else if (e.key === 'Backspace') {
        handleDelete();
      } else if (e.key === 'Escape') {
        handleClear();
      } else if (/^[a-zA-Z]$/.test(e.key)) {
        // Allow typing alphanumeric secret codes directly
        handleInput(e.key.toUpperCase());
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [display, isUnlocking]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-4 selection:bg-cyan-500/20">
      {/* Top back affordance */}
      <div className="w-full max-w-sm flex items-center justify-between mb-4">
        <button
          onClick={() => {
            sound.playKeypress();
            onBackToTimer();
          }}
          className="flex items-center gap-1.5 text-xs font-medium text-slate-400 hover:text-slate-200 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Timer</span>
        </button>

        <span className="text-xs font-mono text-slate-600">FX-991ES</span>
      </div>

      {/* Main Calculator Body */}
      <div className="w-full max-w-sm bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-2xl backdrop-blur-xl relative overflow-hidden">
        {/* Frost shatter flash overlay when unlocking */}
        {isUnlocking && (
          <div className="absolute inset-0 bg-cyan-500/20 backdrop-blur-sm z-5xl flex flex-col items-center justify-center text-center p-6 animate-pulse">
            <Sparkles className="w-10 h-10 text-cyan-300 animate-spin" />
            <span className="text-sm font-bold text-white mt-3 tracking-wider">
              PORTAL UNLOCKED
            </span>
          </div>
        )}

        {/* Display Screen */}
        <div className="bg-slate-950/80 border border-slate-800/80 rounded-xl p-4 mb-4 text-right">
          <div className="text-xs font-mono text-slate-500 h-4 truncate tabular-nums">
            {history}
          </div>
          <div className="text-2xl font-bold font-mono tracking-tight text-white mt-1 overflow-x-auto whitespace-nowrap scrollbar-none tabular-nums">
            {display}
          </div>
        </div>

        {/* Status notice */}
        {statusMessage && (
          <div className="mb-3 text-xs font-mono text-amber-400 bg-amber-950/30 border border-amber-800/40 rounded-lg px-2.5 py-1.5 flex items-center gap-1.5">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">{statusMessage}</span>
          </div>
        )}

        {/* Keypad Grid */}
        <div className="grid grid-cols-4 gap-2">
          {/* Row 1 */}
          <button
            onClick={handleClear}
            className="py-3 text-xs font-semibold text-rose-400 bg-slate-800/60 hover:bg-rose-950/40 hover:text-rose-300 rounded-lg border border-slate-700/40 transition-colors"
          >
            AC
          </button>
          <button
            onClick={() => handleInput('(')}
            className="py-3 text-sm font-medium text-slate-300 bg-slate-800/40 hover:bg-slate-800 rounded-lg border border-slate-700/40 transition-colors"
          >
            (
          </button>
          <button
            onClick={() => handleInput(')')}
            className="py-3 text-sm font-medium text-slate-300 bg-slate-800/40 hover:bg-slate-800 rounded-lg border border-slate-700/40 transition-colors"
          >
            )
          </button>
          <button
            onClick={() => handleInput('÷')}
            className="py-3 text-base font-medium text-cyan-400 bg-cyan-950/30 hover:bg-cyan-900/40 rounded-lg border border-cyan-800/30 transition-colors"
          >
            ÷
          </button>

          {/* Row 2 */}
          <button
            onClick={() => handleInput('7')}
            className="py-3 text-base font-semibold text-slate-100 bg-slate-800/40 hover:bg-slate-800 rounded-lg border border-slate-700/40 transition-colors"
          >
            7
          </button>
          <button
            onClick={() => handleInput('8')}
            className="py-3 text-base font-semibold text-slate-100 bg-slate-800/40 hover:bg-slate-800 rounded-lg border border-slate-700/40 transition-colors"
          >
            8
          </button>
          <button
            onClick={() => handleInput('9')}
            className="py-3 text-base font-semibold text-slate-100 bg-slate-800/40 hover:bg-slate-800 rounded-lg border border-slate-700/40 transition-colors"
          >
            9
          </button>
          <button
            onClick={() => handleInput('×')}
            className="py-3 text-base font-medium text-cyan-400 bg-cyan-950/30 hover:bg-cyan-900/40 rounded-lg border border-cyan-800/30 transition-colors"
          >
            ×
          </button>

          {/* Row 3 */}
          <button
            onClick={() => handleInput('4')}
            className="py-3 text-base font-semibold text-slate-100 bg-slate-800/40 hover:bg-slate-800 rounded-lg border border-slate-700/40 transition-colors"
          >
            4
          </button>
          <button
            onClick={() => handleInput('5')}
            className="py-3 text-base font-semibold text-slate-100 bg-slate-800/40 hover:bg-slate-800 rounded-lg border border-slate-700/40 transition-colors"
          >
            5
          </button>
          <button
            onClick={() => handleInput('6')}
            className="py-3 text-base font-semibold text-slate-100 bg-slate-800/40 hover:bg-slate-800 rounded-lg border border-slate-700/40 transition-colors"
          >
            6
          </button>
          <button
            onClick={() => handleInput('-')}
            className="py-3 text-base font-medium text-cyan-400 bg-cyan-950/30 hover:bg-cyan-900/40 rounded-lg border border-cyan-800/30 transition-colors"
          >
            -
          </button>

          {/* Row 4 */}
          <button
            onClick={() => handleInput('1')}
            className="py-3 text-base font-semibold text-slate-100 bg-slate-800/40 hover:bg-slate-800 rounded-lg border border-slate-700/40 transition-colors"
          >
            1
          </button>
          <button
            onClick={() => handleInput('2')}
            className="py-3 text-base font-semibold text-slate-100 bg-slate-800/40 hover:bg-slate-800 rounded-lg border border-slate-700/40 transition-colors"
          >
            2
          </button>
          <button
            onClick={() => handleInput('3')}
            className="py-3 text-base font-semibold text-slate-100 bg-slate-800/40 hover:bg-slate-800 rounded-lg border border-slate-700/40 transition-colors"
          >
            3
          </button>
          <button
            onClick={() => handleInput('+')}
            className="py-3 text-base font-medium text-cyan-400 bg-cyan-950/30 hover:bg-cyan-900/40 rounded-lg border border-cyan-800/30 transition-colors"
          >
            +
          </button>

          {/* Row 5 */}
          <button
            onClick={() => handleInput('0')}
            className="py-3 text-base font-semibold text-slate-100 bg-slate-800/40 hover:bg-slate-800 rounded-lg border border-slate-700/40 transition-colors"
          >
            0
          </button>
          <button
            onClick={() => handleInput('.')}
            className="py-3 text-base font-semibold text-slate-100 bg-slate-800/40 hover:bg-slate-800 rounded-lg border border-slate-700/40 transition-colors"
          >
            .
          </button>
          <button
            onClick={handleDelete}
            className="py-3 flex items-center justify-center text-slate-400 bg-slate-800/40 hover:bg-slate-800 rounded-lg border border-slate-700/40 transition-colors"
          >
            <Delete className="w-4 h-4" />
          </button>
          <button
            onClick={handleCalculate}
            className="py-3 text-lg font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg shadow-lg shadow-cyan-500/20 transition-all"
          >
            =
          </button>
        </div>
      </div>

      <div className="mt-6 text-xs text-slate-600">
        Scientific Mode Active · Enter formula or registered string
      </div>
    </div>
  );
};
