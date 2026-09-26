/**
 * Frosty Timer - Genuine Productivity Cloak
 * Features full Pomodoro timer, stopwatch with laps, audio alert chime,
 * and an innocent button leading to the Calculator decoy gate.
 */

import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Calculator, Volume2, VolumeX, Snowflake, Clock, Timer as TimerIcon } from 'lucide-react';
import { sound } from '../utils/audio';

interface CloakTimerProps {
  onOpenCalculator: () => void;
}

export const CloakTimer: React.FC<CloakTimerProps> = ({ onOpenCalculator }) => {
  const [mode, setMode] = useState<'timer' | 'stopwatch'>('timer');
  
  // Timer state
  const [initialSeconds, setInitialSeconds] = useState<number>(25 * 60);
  const [timeLeft, setTimeLeft] = useState<number>(25 * 60);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [customMinutes, setCustomMinutes] = useState<string>('25');

  // Stopwatch state
  const [stopwatchTime, setStopwatchTime] = useState<number>(0);
  const [isStopwatchRunning, setIsStopwatchRunning] = useState<boolean>(false);
  const [laps, setLaps] = useState<number[]>([]);

  // Sound toggle
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  // Preset choices
  const presets = [
    { label: 'Pomodoro', minutes: 25 },
    { label: 'Short Break', minutes: 5 },
    { label: 'Long Break', minutes: 15 },
    { label: 'Deep Focus', minutes: 50 },
  ];

  // Timer loop
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isTimerRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            sound.playAlarm();
            setIsTimerRunning(false);
            return 0;
          }
          if (prev % 60 === 0) {
            sound.playTick();
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning, timeLeft]);

  // Stopwatch loop
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isStopwatchRunning) {
      interval = setInterval(() => {
        setStopwatchTime((prev) => prev + 10);
      }, 10);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isStopwatchRunning]);

  const toggleTimer = () => {
    sound.playKeypress();
    if (timeLeft === 0) {
      setTimeLeft(initialSeconds);
    }
    setIsTimerRunning(!isTimerRunning);
  };

  const resetTimer = () => {
    sound.playKeypress();
    setIsTimerRunning(false);
    setTimeLeft(initialSeconds);
  };

  const selectPreset = (mins: number) => {
    sound.playKeypress();
    setIsTimerRunning(false);
    const secs = mins * 60;
    setInitialSeconds(secs);
    setTimeLeft(secs);
    setCustomMinutes(mins.toString());
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mins = Math.max(1, Math.min(720, parseInt(customMinutes, 10) || 25));
    selectPreset(mins);
  };

  // Stopwatch controls
  const toggleStopwatch = () => {
    sound.playKeypress();
    setIsStopwatchRunning(!isStopwatchRunning);
  };

  const resetStopwatch = () => {
    sound.playKeypress();
    setIsStopwatchRunning(false);
    setStopwatchTime(0);
    setLaps([]);
  };

  const recordLap = () => {
    sound.playKeypress();
    if (stopwatchTime > 0) {
      setLaps([stopwatchTime, ...laps]);
    }
  };

  // Formatting helpers
  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const formatStopwatch = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const centis = Math.floor((ms % 1000) / 10);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${centis.toString().padStart(2, '0')}`;
  };

  const progressPercent = initialSeconds > 0 ? ((initialSeconds - timeLeft) / initialSeconds) * 100 : 0;
  const radius = 120;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progressPercent / 100) * circumference;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between selection:bg-cyan-500/20">
      {/* Top Bar - Clean 3-zone contract */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-slate-800/80 bg-slate-900/50 backdrop-blur-md">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-cyan-950/80 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shadow-sm">
            <Snowflake className="w-4 h-4 animate-spin-slow" />
          </div>
          <span className="text-base font-semibold tracking-tight text-slate-100">
            Frosty Timer
          </span>
        </div>

        {/* Mode selector */}
        <div className="flex items-center gap-1 p-1 bg-slate-800/60 rounded-lg border border-slate-700/50">
          <button
            onClick={() => {
              sound.playKeypress();
              setMode('timer');
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              mode === 'timer'
                ? 'bg-slate-700 text-cyan-300 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <TimerIcon className="w-3.5 h-3.5" />
            <span>Timer</span>
          </button>
          <button
            onClick={() => {
              sound.playKeypress();
              setMode('stopwatch');
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              mode === 'stopwatch'
                ? 'bg-slate-700 text-cyan-300 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>Stopwatch</span>
          </button>
        </div>

        {/* Innocent Calculator button & audio toggle */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              const next = !soundEnabled;
              setSoundEnabled(next);
              sound.enabled = next;
            }}
            title="Toggle Sound"
            className="p-2 text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 rounded-lg border border-transparent hover:border-slate-700/50 transition-colors"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-cyan-400" /> : <VolumeX className="w-4 h-4" />}
          </button>

          <button
            onClick={() => {
              sound.playKeypress();
              onOpenCalculator();
            }}
            title="Open Scientific Calculator"
            className="flex items-center gap-2 px-3.5 py-1.5 text-xs font-medium text-slate-200 bg-slate-800/90 hover:bg-slate-700 hover:text-white rounded-lg border border-slate-700/80 shadow-sm transition-all hover:border-cyan-500/30"
          >
            <Calculator className="w-3.5 h-3.5 text-cyan-400" />
            <span>Calculator</span>
          </button>
        </div>
      </header>

      {/* Main Focus Clock Body */}
      <main className="flex-1 flex flex-col items-center justify-center p-6 max-w-xl mx-auto w-full">
        {mode === 'timer' ? (
          <div className="w-full flex flex-col items-center">
            {/* Presets */}
            <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
              {presets.map((preset) => {
                const isSelected = initialSeconds === preset.minutes * 60;
                return (
                  <button
                    key={preset.label}
                    onClick={() => selectPreset(preset.minutes)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all ${
                      isSelected
                        ? 'bg-cyan-950/60 border-cyan-500/50 text-cyan-300 shadow-sm shadow-cyan-500/10'
                        : 'bg-slate-900/40 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                    }`}
                  >
                    {preset.label} ({preset.minutes}m)
                  </button>
                );
              })}
            </div>

            {/* Circular Timer Display */}
            <div className="relative w-72 h-72 flex items-center justify-center my-4">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 280 280">
                <circle
                  cx="140"
                  cy="140"
                  r={radius}
                  className="stroke-slate-800/60"
                  strokeWidth="8"
                  fill="transparent"
                />
                <circle
                  cx="140"
                  cy="140"
                  r={radius}
                  className="stroke-cyan-400 transition-all duration-500 ease-linear"
                  strokeWidth="8"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  fill="transparent"
                />
              </svg>

              {/* Digital Time Center */}
              <div className="absolute flex flex-col items-center justify-center">
                <span className="text-5xl font-extrabold tracking-tight text-white font-mono tabular-nums drop-shadow-md">
                  {formatTime(timeLeft)}
                </span>
                <span className="text-xs uppercase tracking-widest text-slate-400 mt-2 font-medium">
                  {isTimerRunning ? 'Session In Progress' : timeLeft === 0 ? 'Completed' : 'Ready'}
                </span>
              </div>
            </div>

            {/* Timer Controls */}
            <div className="flex items-center gap-4 mt-8">
              <button
                onClick={resetTimer}
                title="Reset Timer"
                className="p-3 text-slate-400 hover:text-slate-100 hover:bg-slate-800/80 rounded-xl border border-slate-800 transition-all"
              >
                <RotateCcw className="w-5 h-5" />
              </button>

              <button
                onClick={toggleTimer}
                className={`flex items-center gap-2 px-8 py-3.5 text-sm font-semibold rounded-xl shadow-lg transition-all ${
                  isTimerRunning
                    ? 'bg-slate-800 text-slate-100 border border-slate-700 hover:bg-slate-750'
                    : 'bg-cyan-500 text-slate-950 font-bold hover:bg-cyan-400 shadow-cyan-500/20'
                }`}
              >
                {isTimerRunning ? (
                  <>
                    <Pause className="w-4 h-4 fill-current" />
                    <span>Pause</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-current" />
                    <span>Start Session</span>
                  </>
                )}
              </button>
            </div>

            {/* Custom Minutes Input */}
            <form onSubmit={handleCustomSubmit} className="mt-8 flex items-center gap-2">
              <span className="text-xs text-slate-500">Custom:</span>
              <input
                type="number"
                min="1"
                max="720"
                value={customMinutes}
                onChange={(e) => setCustomMinutes(e.target.value)}
                className="w-16 px-2.5 py-1 text-xs bg-slate-900 border border-slate-800 rounded-md text-slate-200 text-center focus:outline-none focus:border-cyan-500/50"
              />
              <span className="text-xs text-slate-500">mins</span>
              <button
                type="submit"
                className="px-2.5 py-1 text-xs text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-md transition-colors"
              >
                Set
              </button>
            </form>
          </div>
        ) : (
          /* Stopwatch Mode */
          <div className="w-full flex flex-col items-center">
            <div className="text-6xl font-extrabold tracking-tight text-white font-mono tabular-nums my-12 drop-shadow-md">
              {formatStopwatch(stopwatchTime)}
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={resetStopwatch}
                disabled={stopwatchTime === 0}
                className="p-3 text-slate-400 hover:text-slate-100 hover:bg-slate-800 rounded-xl border border-slate-800 disabled:opacity-40 disabled:hover:bg-transparent transition-all"
              >
                <RotateCcw className="w-5 h-5" />
              </button>

              <button
                onClick={toggleStopwatch}
                className={`flex items-center gap-2 px-8 py-3.5 text-sm font-semibold rounded-xl shadow-lg transition-all ${
                  isStopwatchRunning
                    ? 'bg-slate-800 text-slate-100 border border-slate-700 hover:bg-slate-750'
                    : 'bg-cyan-500 text-slate-950 font-bold hover:bg-cyan-400 shadow-cyan-500/20'
                }`}
              >
                {isStopwatchRunning ? (
                  <>
                    <Pause className="w-4 h-4 fill-current" />
                    <span>Stop</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-current" />
                    <span>Start</span>
                  </>
                )}
              </button>

              <button
                onClick={recordLap}
                disabled={!isStopwatchRunning}
                className="px-4 py-3.5 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700 rounded-xl border border-slate-700 disabled:opacity-40 transition-all"
              >
                Lap
              </button>
            </div>

            {/* Laps List */}
            {laps.length > 0 && (
              <div className="w-full max-w-xs mt-8 bg-slate-900/60 border border-slate-800 rounded-xl p-4 max-h-48 overflow-y-auto">
                <div className="text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wider">
                  Recorded Laps
                </div>
                <div className="space-y-1.5">
                  {laps.map((lap, idx) => (
                    <div
                      key={idx}
                      className="flex justify-between text-xs font-mono text-slate-300 py-1 border-b border-slate-800/50 last:border-none"
                    >
                      <span className="text-slate-500">Lap {laps.length - idx}</span>
                      <span className="tabular-nums">{formatStopwatch(lap)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Subtle Footer with clean unboxed metadata */}
      <footer className="px-6 py-4 border-t border-slate-900 flex items-center justify-between text-xs text-slate-600">
        <div>Frosty Productivity Systems</div>
        <div className="flex items-center gap-2">
          <span>Client-Side Offline Engine</span>
          <span aria-hidden="true">·</span>
          <span>v2.4</span>
        </div>
      </footer>
    </div>
  );
};
