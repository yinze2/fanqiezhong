import React, { useState } from 'react';
import PomodoroTimer from './components/PomodoroTimer.tsx';
import { TimerMode } from './types.ts';
import { MODE_BG_LIGHT } from './constants.ts';

const App: React.FC = () => {
  const [currentMode, setCurrentMode] = useState<TimerMode>(TimerMode.WORK);

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center transition-colors duration-1000 ${MODE_BG_LIGHT[currentMode]}`}>
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 p-6 flex justify-between items-center z-10">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center text-white shadow-lg">
            <i className="fas fa-clock text-xl"></i>
          </div>
          <h1 className="text-xl font-bold tracking-tight text-slate-800">ZenPomodoro</h1>
        </div>
        <div className="flex space-x-4">
          <button className="text-slate-400 hover:text-slate-600 transition-colors">
            <i className="fas fa-chart-line text-lg"></i>
          </button>
          <button className="text-slate-400 hover:text-slate-600 transition-colors">
            <i className="fas fa-cog text-lg"></i>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="w-full px-4 pt-20 pb-12">
        <PomodoroTimer 
          mode={currentMode} 
          onModeChange={(newMode) => setCurrentMode(newMode)} 
        />
      </main>

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 right-0 p-6 text-center text-slate-400 text-sm">
        <p className="flex items-center justify-center space-x-1">
          <span>Powered by</span>
          <span className="font-bold text-slate-600 tracking-tighter">Gemini 3 Flash</span>
        </p>
      </footer>
    </div>
  );
};

export default App;