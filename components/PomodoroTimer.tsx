
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { TimerMode, Quote } from '../types';
import { DEFAULT_SETTINGS, MODE_COLORS, MODE_TEXT } from '../constants';
import { fetchMotivationalQuote } from '../services/geminiService';

interface PomodoroTimerProps {
  mode: TimerMode;
  onModeChange: (newMode: TimerMode) => void;
}

const PomodoroTimer: React.FC<PomodoroTimerProps> = ({ mode, onModeChange }) => {
  const [timeLeft, setTimeLeft] = useState(DEFAULT_SETTINGS[mode]);
  const [isActive, setIsActive] = useState(false);
  const [quote, setQuote] = useState<Quote | null>(null);
  const [isLoadingQuote, setIsLoadingQuote] = useState(false);
  
  // Fix: Replacing NodeJS.Timeout with ReturnType<typeof setInterval> for browser environment compatibility
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const getNewQuote = useCallback(async () => {
    setIsLoadingQuote(true);
    const newQuote = await fetchMotivationalQuote(mode);
    setQuote(newQuote);
    setIsLoadingQuote(false);
  }, [mode]);

  useEffect(() => {
    setTimeLeft(DEFAULT_SETTINGS[mode]);
    setIsActive(false);
    getNewQuote();
  }, [mode, getNewQuote]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(DEFAULT_SETTINGS[mode]);
  };

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      // Play a simple beep notification if needed (using browser notification API or audio)
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isActive, timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = ((DEFAULT_SETTINGS[mode] - timeLeft) / DEFAULT_SETTINGS[mode]) * 100;

  return (
    <div className="flex flex-col items-center w-full max-w-md mx-auto p-8 rounded-3xl bg-white shadow-2xl transition-all duration-500 transform hover:scale-[1.01]">
      <div className="flex space-x-2 mb-8 p-1 bg-slate-100 rounded-xl w-full">
        {(Object.keys(TimerMode) as Array<keyof typeof TimerMode>).map((m) => (
          <button
            key={m}
            onClick={() => onModeChange(TimerMode[m])}
            className={`flex-1 py-2 px-3 text-sm font-semibold rounded-lg transition-all duration-300 ${
              mode === TimerMode[m]
                ? `${MODE_COLORS[TimerMode[m]]} text-white shadow-md`
                : 'text-slate-500 hover:bg-slate-200'
            }`}
          >
            {MODE_TEXT[TimerMode[m]]}
          </button>
        ))}
      </div>

      <div className="relative w-64 h-64 mb-10 group">
        {/* Progress Ring */}
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="128"
            cy="128"
            r="120"
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            className="text-slate-100"
          />
          <circle
            cx="128"
            cy="128"
            r="120"
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            strokeDasharray={754}
            strokeDashoffset={754 - (754 * progress) / 100}
            strokeLinecap="round"
            className={`${MODE_COLORS[mode].replace('bg-', 'text-')} transition-all duration-1000 ease-linear`}
          />
        </svg>
        
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-6xl font-black tracking-tighter text-slate-800 tabular-nums">
            {formatTime(timeLeft)}
          </span>
          <span className="text-sm font-medium text-slate-400 uppercase tracking-widest mt-2">
            {isActive ? 'Keep going' : 'Paused'}
          </span>
        </div>
      </div>

      <div className="flex space-x-4 w-full mb-8">
        <button
          onClick={toggleTimer}
          className={`flex-1 py-4 px-6 rounded-2xl font-bold text-lg transition-all active:scale-95 shadow-lg ${
            isActive 
            ? 'bg-slate-800 text-white hover:bg-slate-700' 
            : `${MODE_COLORS[mode]} text-white hover:opacity-90`
          }`}
        >
          {isActive ? <i className="fas fa-pause mr-2"></i> : <i className="fas fa-play mr-2"></i>}
          {isActive ? 'Pause' : 'Start'}
        </button>
        <button
          onClick={resetTimer}
          className="p-4 bg-slate-100 text-slate-500 rounded-2xl hover:bg-slate-200 transition-colors"
          title="Reset Timer"
        >
          <i className="fas fa-redo-alt text-xl"></i>
        </button>
      </div>

      <div className="w-full mt-4 p-6 bg-slate-50 rounded-2xl border border-slate-100 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1 h-full bg-rose-400 opacity-20"></div>
        {isLoadingQuote ? (
          <div className="animate-pulse space-y-2">
            <div className="h-4 bg-slate-200 rounded w-3/4"></div>
            <div className="h-4 bg-slate-200 rounded w-1/2"></div>
          </div>
        ) : (
          <>
            <p className="text-slate-700 italic text-sm leading-relaxed mb-3">
              "{quote?.text}"
            </p>
            <p className="text-slate-400 text-xs font-semibold text-right">
              — {quote?.author}
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default PomodoroTimer;
