
import React, { useState } from 'react';
import Taskbar from './components/Taskbar';
import Desktop from './components/Desktop';
import Dock from './components/Dock';
import SystemFooter from './components/SystemFooter';
import LoadingScreen from './components/LoadingScreen';
import LockScreen from './components/LockScreen';
import { AnimatePresence } from 'framer-motion';

type SystemStateView = 'loading' | 'locked' | 'desktop';

const App: React.FC = () => {
  const [view, setView] = useState<SystemStateView>('loading');

  return (
    <div className="h-screen w-screen flex flex-col bg-black overflow-hidden relative">
      <AnimatePresence mode="wait">
        {view === 'loading' && (
          <LoadingScreen key="loading" onComplete={() => setView('locked')} />
        )}

        {view === 'locked' && (
          <LockScreen key="locked" onLogin={() => setView('desktop')} />
        )}

        {view === 'desktop' && (
          <div key="desktop" className="h-full w-full flex flex-col relative">
            <Taskbar />
            <Desktop />
            
            {/* Dock moved slightly up to accommodate the SystemFooter */}
            <div className="mb-6">
              <Dock />
            </div>

            <SystemFooter />
            
            {/* Scanner Scanline Overlay - only visible on desktop */}
            <div className="fixed inset-0 pointer-events-none z-[10001] opacity-[0.03] overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/20 to-transparent h-1 bg-repeat-y animate-scan" 
                   style={{ backgroundSize: '100% 4px' }} />
            </div>
          </div>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes scan {
          from { transform: translateY(0); }
          to { transform: translateY(4px); }
        }
        .animate-scan {
          animation: scan 0.2s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default App;
