
import React from 'react';
import { motion } from 'framer-motion';
import { useSystemStore } from '../store/useSystemStore';
import { AppId } from '../types';

const ICON_URLS = {
  terminal: "https://raw.githubusercontent.com/PapirusDevelopmentTeam/papirus-icon-theme/master/Papirus/64x64/apps/utilities-terminal.svg",
  browser: "https://raw.githubusercontent.com/PapirusDevelopmentTeam/papirus-icon-theme/master/Papirus/64x64/apps/firefox.svg",
  fileExplorer: "https://raw.githubusercontent.com/PapirusDevelopmentTeam/papirus-icon-theme/master/Papirus/64x64/apps/system-file-manager.svg",
  metasploit: "https://raw.githubusercontent.com/PapirusDevelopmentTeam/papirus-icon-theme/master/Papirus/64x64/apps/cs-shield.svg",
  settings: "https://raw.githubusercontent.com/PapirusDevelopmentTeam/papirus-icon-theme/master/Papirus/64x64/apps/gnome-settings.svg"
};

const DockItem: React.FC<{ icon: string; label: string; onClick: () => void; isActive?: boolean }> = ({ icon, label, onClick, isActive }) => (
  <motion.div
    whileHover={{ y: -8, scale: 1.15 }}
    whileTap={{ scale: 0.9 }}
    onClick={onClick}
    className="relative group flex flex-col items-center"
  >
    <div className={`p-1.5 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 group-hover:bg-white/15 transition-all cursor-pointer shadow-lg ${isActive ? 'ring-1 ring-[#00ccff]' : ''}`}>
      <img src={icon} alt={label} className="w-10 h-10 object-contain drop-shadow-md" />
    </div>
    {isActive && (
      <div className="absolute -bottom-1.5 w-1.5 h-1.5 bg-[#00ccff] rounded-full shadow-[0_0_5px_#00ccff]" />
    )}
    <div className="absolute -top-10 scale-0 group-hover:scale-100 transition-transform bg-[#0f111a] text-white text-[10px] px-2 py-1 rounded border border-white/10 pointer-events-none whitespace-nowrap shadow-xl">
      {label}
    </div>
  </motion.div>
);

const Dock: React.FC = () => {
  const { openApp, openWindows } = useSystemStore();

  const isAppOpen = (appId: AppId) => openWindows.some(w => w.appId === appId);

  return (
    <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[9999]">
      <div className="flex items-center gap-3 px-4 py-3 bg-[#0f111a]/50 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl">
        <DockItem 
          icon={ICON_URLS.terminal} 
          label="Terminal" 
          onClick={() => openApp('terminal', 'QTerminal')} 
          isActive={isAppOpen('terminal')}
        />
        <DockItem 
          icon={ICON_URLS.browser} 
          label="Firefox ESR" 
          onClick={() => openApp('browser', 'Firefox Web Browser')} 
          isActive={isAppOpen('browser')}
        />
        <DockItem 
          icon={ICON_URLS.fileExplorer} 
          label="File Manager" 
          onClick={() => openApp('fileExplorer', 'Thunar')} 
          isActive={isAppOpen('fileExplorer')}
        />
        <DockItem 
          icon={ICON_URLS.metasploit} 
          label="Metasploit" 
          onClick={() => openApp('metasploit', 'MSF Console')} 
          isActive={isAppOpen('metasploit')}
        />
        <div className="w-px h-10 bg-white/10 mx-1" />
        <DockItem 
          icon={ICON_URLS.settings} 
          label="Settings" 
          onClick={() => openApp('settings', 'System Settings')} 
          isActive={isAppOpen('settings')}
        />
      </div>
    </div>
  );
};

export default Dock;
