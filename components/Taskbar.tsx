
import React, { useState, useEffect } from 'react';
import { useSystemStore } from '../store/useSystemStore';
import { 
  Wifi, 
  Battery, 
  Volume2, 
  ChevronDown, 
  Monitor, 
  Terminal as TerminalIcon, 
  Globe, 
  Folder, 
  Power,
  Bell
} from 'lucide-react';

const Taskbar: React.FC = () => {
  const [time, setTime] = useState(new Date());
  const { openApp, openWindows, focusWindow, focusedWindowId } = useSystemStore();

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="h-10 bg-[#1a1b26]/95 backdrop-blur-md border-b border-black/50 flex items-center justify-between px-2 text-[12px] font-sans text-gray-200 z-[9999] shadow-xl select-none">
      {/* Left Side: App Menu & Launchers */}
      <div className="flex items-center h-full gap-1">
        <button className="flex items-center justify-center hover:bg-white/10 px-2 h-8 rounded-md transition-all group">
          <img 
            src="https://www.kali.org/images/kali-dragon-icon.svg" 
            alt="Kali" 
            className="w-6 h-6 drop-shadow-[0_0_5px_#00ccff]"
          />
          <span className="ml-2 font-bold text-[11px] text-white/95 uppercase tracking-wider">Applications</span>
        </button>

        <div className="w-px h-6 bg-white/10 mx-1" />

        {/* Quick Launchers */}
        <button onClick={() => openApp('terminal', 'QTerminal')} className="p-1.5 hover:bg-white/10 rounded-md group transition-colors" title="Terminal Emulator">
          <TerminalIcon size={18} className="text-gray-400 group-hover:text-[#00ccff]" />
        </button>
        <button onClick={() => openApp('fileExplorer', 'Thunar')} className="p-1.5 hover:bg-white/10 rounded-md group transition-colors" title="File Manager">
          <Folder size={18} className="text-gray-400 group-hover:text-[#00ccff]" />
        </button>
        <button onClick={() => openApp('browser', 'Firefox')} className="p-1.5 hover:bg-white/10 rounded-md group transition-colors" title="Web Browser">
          <Globe size={18} className="text-gray-400 group-hover:text-[#00ccff]" />
        </button>

        <div className="w-px h-6 bg-white/10 mx-1" />

        {/* Task List */}
        <div className="flex items-center gap-1.5 overflow-hidden max-w-[500px]">
          {openWindows.map(win => (
            <button
              key={win.id}
              onClick={() => focusWindow(win.id)}
              className={`px-3 py-1 rounded-md text-[11px] border flex items-center gap-2 max-w-[150px] transition-all ${
                focusedWindowId === win.id 
                  ? 'bg-white/10 border-white/20 text-white shadow-[0_0_10px_rgba(0,204,255,0.1)]' 
                  : 'hover:bg-white/5 border-transparent text-gray-400'
              }`}
            >
               <span className="truncate font-medium">{win.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Right Side: System Tray & Clock */}
      <div className="flex items-center h-full gap-3">
        <div className="flex items-center gap-4 px-3 text-gray-400">
          <Bell size={16} className="hover:text-white cursor-pointer transition-colors" />
          <Wifi size={16} className="text-[#00ccff] cursor-pointer" />
          <div className="flex items-center gap-1 cursor-pointer hover:text-white transition-colors">
            <Volume2 size={16} />
          </div>
          <div className="flex items-center gap-1.5 cursor-pointer hover:text-white transition-colors">
            <Battery size={16} className="text-green-500" />
            <span className="text-[10px] font-bold">92%</span>
          </div>
        </div>

        <div className="w-px h-6 bg-white/10" />

        <div className="flex items-center gap-2 px-3 cursor-default group hover:bg-white/5 h-full rounded transition-colors">
          <span className="text-white font-bold tracking-tight">
            {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
          <span className="text-[11px] text-gray-500 font-medium">
            {time.toLocaleDateString([], { month: 'short', day: 'numeric' })}
          </span>
        </div>

        <button className="flex items-center justify-center p-2 hover:bg-red-500/20 rounded-md group transition-colors mr-1">
          <Power size={18} className="text-gray-500 group-hover:text-red-400" />
        </button>
      </div>
    </div>
  );
};

export default Taskbar;
