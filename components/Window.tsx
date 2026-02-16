
import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { X, Minus, Square } from 'lucide-react';
import { useSystemStore } from '../store/useSystemStore';
import { AppId } from '../types';

interface WindowProps {
  id: string;
  appId: AppId;
  title: string;
  isMinimized: boolean;
  zIndex: number;
  children: ReactNode;
}

const ICON_URLS = {
  terminal: "https://raw.githubusercontent.com/PapirusDevelopmentTeam/papirus-icon-theme/master/Papirus/64x64/apps/utilities-terminal.svg",
  browser: "https://raw.githubusercontent.com/PapirusDevelopmentTeam/papirus-icon-theme/master/Papirus/64x64/apps/firefox.svg",
  fileExplorer: "https://raw.githubusercontent.com/PapirusDevelopmentTeam/papirus-icon-theme/master/Papirus/64x64/apps/system-file-manager.svg",
  metasploit: "https://raw.githubusercontent.com/PapirusDevelopmentTeam/papirus-icon-theme/master/Papirus/64x64/apps/cs-shield.svg",
  settings: "https://raw.githubusercontent.com/PapirusDevelopmentTeam/papirus-icon-theme/master/Papirus/64x64/apps/gnome-settings.svg"
};

const Window: React.FC<WindowProps> = ({ id, appId, title, isMinimized, zIndex, children }) => {
  const { closeWindow, minimizeWindow, focusWindow, focusedWindowId } = useSystemStore();
  const isFocused = focusedWindowId === id;

  if (isMinimized) return null;

  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.95, opacity: 0 }}
      style={{ zIndex }}
      drag
      dragMomentum={false}
      onPointerDown={() => focusWindow(id)}
      className={`absolute w-[750px] h-[500px] bg-[#0f111a] border ${isFocused ? 'border-[#00ccff]/50 shadow-[0_0_30px_rgba(0,204,255,0.15)]' : 'border-gray-800 shadow-2xl'} rounded-xl flex flex-col overflow-hidden transition-shadow duration-300`}
    >
      {/* Thicker Title Bar */}
      <div className={`h-12 flex items-center justify-between px-4 cursor-move transition-colors duration-200 ${isFocused ? 'bg-[#1a1c2e]' : 'bg-[#12141d]'} border-b border-black/40`}>
        <div className="flex items-center gap-3">
          <div className="relative">
            <img src={ICON_URLS[appId]} alt={title} className="w-6 h-6 object-contain drop-shadow-md" />
            {isFocused && (
              <div className="absolute -inset-1 bg-[#00ccff]/10 rounded-full animate-pulse pointer-events-none" />
            )}
          </div>
          <div className="flex flex-col -gap-1">
            <span className={`text-[11px] font-black tracking-[0.1em] transition-colors ${isFocused ? 'text-white' : 'text-gray-400'}`}>
              {title.toUpperCase()}
            </span>
            <span className="text-[8px] text-gray-500 font-mono tracking-tighter uppercase opacity-60">Session-ID: {id.slice(-4)}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex items-center bg-black/20 rounded-lg p-0.5 border border-white/5">
            <button 
              onClick={(e) => { e.stopPropagation(); minimizeWindow(id); }}
              className="p-1.5 hover:bg-white/10 rounded transition-colors group"
            >
              <Minus size={16} className="text-gray-400 group-hover:text-white" />
            </button>
            <button className="p-1.5 hover:bg-white/10 rounded transition-colors group">
              <Square size={12} className="text-gray-400 group-hover:text-white" />
            </button>
          </div>
          <button 
            onClick={(e) => { e.stopPropagation(); closeWindow(id); }}
            className="p-2 hover:bg-red-500/90 group rounded-lg transition-all border border-transparent hover:border-red-400/50 bg-red-500/10"
          >
            <X size={18} className="text-red-400 group-hover:text-white" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-grow relative overflow-hidden bg-black/10">
        {children}
      </div>
      
      {/* Window Status Bar (Subtle Bottom Edge) */}
      <div className="h-1 bg-black/40 flex items-center justify-end px-2">
         <div className={`w-1 h-1 rounded-full ${isFocused ? 'bg-[#00ccff]' : 'bg-gray-700'}`} />
      </div>
    </motion.div>
  );
};

export default Window;
