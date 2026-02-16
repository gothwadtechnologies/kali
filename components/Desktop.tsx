
import React, { useState } from 'react';
import { useSystemStore } from '../store/useSystemStore';
import Window from './Window';
import Terminal from './Terminal';
import CMatrixBackground from './CMatrixBackground';
import { AnimatePresence } from 'framer-motion';

const ICON_URLS = {
  folder: "https://raw.githubusercontent.com/PapirusDevelopmentTeam/papirus-icon-theme/master/Papirus/64x64/places/folder-blue.svg",
  home: "https://raw.githubusercontent.com/PapirusDevelopmentTeam/papirus-icon-theme/master/Papirus/64x64/places/user-home.svg",
  file: "https://raw.githubusercontent.com/PapirusDevelopmentTeam/papirus-icon-theme/master/Papirus/64x64/mimetypes/text-x-generic.svg",
  kali: "https://www.kali.org/images/kali-dragon-icon.svg",
  app: "https://raw.githubusercontent.com/PapirusDevelopmentTeam/papirus-icon-theme/master/Papirus/64x64/apps/system-run.svg"
};

// Tool definitions (Expanded to 60)
const LEFT_TOOLS = [
  { id: 'nmap', name: 'Nmap', icon: "https://raw.githubusercontent.com/PapirusDevelopmentTeam/papirus-icon-theme/master/Papirus/64x64/apps/nmap.svg", type: 'terminal' },
  { id: 'wireshark', name: 'Wireshark', icon: "https://raw.githubusercontent.com/PapirusDevelopmentTeam/papirus-icon-theme/master/Papirus/64x64/apps/wireshark.svg", type: 'browser' },
  { id: 'burp', name: 'Burp Suite', icon: "https://raw.githubusercontent.com/PapirusDevelopmentTeam/papirus-icon-theme/master/Papirus/64x64/apps/burpsuite.svg", type: 'browser' },
  { id: 'john', name: 'John the Ripper', icon: "https://raw.githubusercontent.com/PapirusDevelopmentTeam/papirus-icon-theme/master/Papirus/64x64/apps/john-the-ripper.svg", type: 'terminal' },
  { id: 'aircrack', name: 'Aircrack-ng', icon: "https://raw.githubusercontent.com/PapirusDevelopmentTeam/papirus-icon-theme/master/Papirus/64x64/apps/aircrack-ng.svg", type: 'terminal' },
  { id: 'hydra', name: 'Hydra', icon: "https://raw.githubusercontent.com/PapirusDevelopmentTeam/papirus-icon-theme/master/Papirus/64x64/apps/hydra.svg", type: 'terminal' },
  { id: 'sqlmap', name: 'SQLMap', icon: "https://raw.githubusercontent.com/PapirusDevelopmentTeam/papirus-icon-theme/master/Papirus/64x64/apps/sqlmap.svg", type: 'terminal' },
  { id: 'beef', name: 'BeEF', icon: "https://raw.githubusercontent.com/PapirusDevelopmentTeam/papirus-icon-theme/master/Papirus/64x64/apps/beef.svg", type: 'browser' },
  { id: 'autopsy', name: 'Autopsy', icon: "https://raw.githubusercontent.com/PapirusDevelopmentTeam/papirus-icon-theme/master/Papirus/64x64/apps/autopsy.svg", type: 'fileExplorer' },
  { id: 'maltego', name: 'Maltego', icon: "https://raw.githubusercontent.com/PapirusDevelopmentTeam/papirus-icon-theme/master/Papirus/64x64/apps/maltego.svg", type: 'browser' },
  { id: 'ghidra', name: 'Ghidra', icon: "https://raw.githubusercontent.com/PapirusDevelopmentTeam/papirus-icon-theme/master/Papirus/64x64/apps/ghidra.svg", type: 'terminal' },
  { id: 'ettercap', name: 'Ettercap', icon: "https://raw.githubusercontent.com/PapirusDevelopmentTeam/papirus-icon-theme/master/Papirus/64x64/apps/ettercap.svg", type: 'terminal' },
  { id: 'nikto', name: 'Nikto', icon: "https://raw.githubusercontent.com/PapirusDevelopmentTeam/papirus-icon-theme/master/Papirus/64x64/apps/nikto.svg", type: 'terminal' },
  { id: 'zap', name: 'OWASP ZAP', icon: "https://raw.githubusercontent.com/PapirusDevelopmentTeam/papirus-icon-theme/master/Papirus/64x64/apps/zaproxy.svg", type: 'browser' },
  { id: 'setoolkit', name: 'SET', icon: "https://raw.githubusercontent.com/PapirusDevelopmentTeam/papirus-icon-theme/master/Papirus/64x64/apps/setoolkit.svg", type: 'terminal' },
  { id: 'hashcat', name: 'Hashcat', icon: "https://raw.githubusercontent.com/PapirusDevelopmentTeam/papirus-icon-theme/master/Papirus/64x64/apps/hashcat.svg", type: 'terminal' },
  { id: 'responder', name: 'Responder', icon: "https://raw.githubusercontent.com/PapirusDevelopmentTeam/papirus-icon-theme/master/Papirus/64x64/apps/network-wired.svg", type: 'terminal' },
  { id: 'bloodhound', name: 'BloodHound', icon: "https://raw.githubusercontent.com/PapirusDevelopmentTeam/papirus-icon-theme/master/Papirus/64x64/apps/bloodhound.svg", type: 'browser' },
  { id: 'airgeddon', name: 'Airgeddon', icon: "https://raw.githubusercontent.com/PapirusDevelopmentTeam/papirus-icon-theme/master/Papirus/64x64/apps/airgeddon.svg", type: 'terminal' },
  { id: 'bettercap', name: 'Bettercap', icon: "https://raw.githubusercontent.com/PapirusDevelopmentTeam/papirus-icon-theme/master/Papirus/64x64/apps/bettercap.svg", type: 'terminal' },
  { id: 'gobuster', name: 'Gobuster', icon: "https://raw.githubusercontent.com/PapirusDevelopmentTeam/papirus-icon-theme/master/Papirus/64x64/apps/gobuster.svg", type: 'terminal' },
  { id: 'wifite', name: 'Wifite', icon: "https://raw.githubusercontent.com/PapirusDevelopmentTeam/papirus-icon-theme/master/Papirus/64x64/apps/wifite.svg", type: 'terminal' },
  { id: 'searchsploit', name: 'Searchsploit', icon: "https://raw.githubusercontent.com/PapirusDevelopmentTeam/papirus-icon-theme/master/Papirus/64x64/apps/searchsploit.svg", type: 'terminal' },
  { id: 'armitage', name: 'Armitage', icon: "https://raw.githubusercontent.com/PapirusDevelopmentTeam/papirus-icon-theme/master/Papirus/64x64/apps/armitage.svg", type: 'terminal' },
  { id: 'commix', name: 'Commix', icon: "https://raw.githubusercontent.com/PapirusDevelopmentTeam/papirus-icon-theme/master/Papirus/64x64/apps/commix.svg", type: 'terminal' },
  { id: 'skipfish', name: 'Skipfish', icon: "https://raw.githubusercontent.com/PapirusDevelopmentTeam/papirus-icon-theme/master/Papirus/64x64/apps/skipfish.svg", type: 'terminal' },
  { id: 'dirb', name: 'DIRB', icon: "https://raw.githubusercontent.com/PapirusDevelopmentTeam/papirus-icon-theme/master/Papirus/64x64/apps/dirb.svg", type: 'terminal' },
  { id: 'medusa', name: 'Medusa', icon: "https://raw.githubusercontent.com/PapirusDevelopmentTeam/papirus-icon-theme/master/Papirus/64x64/apps/medusa.svg", type: 'terminal' },
  { id: 'reconng', name: 'Recon-ng', icon: "https://raw.githubusercontent.com/PapirusDevelopmentTeam/papirus-icon-theme/master/Papirus/64x64/apps/recon-ng.svg", type: 'terminal' },
  { id: 'msfvenom', name: 'MSFVenom', icon: "https://raw.githubusercontent.com/PapirusDevelopmentTeam/papirus-icon-theme/master/Papirus/64x64/apps/metasploit.svg", type: 'terminal' },
];

const RIGHT_TOOLS = [
  { id: 'amass', name: 'Amass', icon: "https://raw.githubusercontent.com/PapirusDevelopmentTeam/papirus-icon-theme/master/Papirus/64x64/apps/amass.svg", type: 'terminal' },
  { id: 'subfinder', name: 'Subfinder', icon: "https://raw.githubusercontent.com/PapirusDevelopmentTeam/papirus-icon-theme/master/Papirus/64x64/apps/subfinder.svg", type: 'terminal' },
  { id: 'kismet', name: 'Kismet', icon: "https://raw.githubusercontent.com/PapirusDevelopmentTeam/papirus-icon-theme/master/Papirus/64x64/apps/kismet.svg", type: 'terminal' },
  { id: 'wpscan', name: 'WPScan', icon: "https://raw.githubusercontent.com/PapirusDevelopmentTeam/papirus-icon-theme/master/Papirus/64x64/apps/wpscan.svg", type: 'terminal' },
  { id: 'masscan', name: 'Masscan', icon: "https://raw.githubusercontent.com/PapirusDevelopmentTeam/papirus-icon-theme/master/Papirus/64x64/apps/masscan.svg", type: 'terminal' },
  { id: 'dnsenum', name: 'Dnsenum', icon: "https://raw.githubusercontent.com/PapirusDevelopmentTeam/papirus-icon-theme/master/Papirus/64x64/apps/dnsenum.svg", type: 'terminal' },
  { id: 'proxychains', name: 'ProxyChains', icon: "https://raw.githubusercontent.com/PapirusDevelopmentTeam/papirus-icon-theme/master/Papirus/64x64/apps/proxychains.svg", type: 'terminal' },
  { id: 'tor', name: 'Tor Browser', icon: "https://raw.githubusercontent.com/PapirusDevelopmentTeam/papirus-icon-theme/master/Papirus/64x64/apps/tor-browser.svg", type: 'browser' },
  { id: 'macchanger', name: 'MacChanger', icon: "https://raw.githubusercontent.com/PapirusDevelopmentTeam/papirus-icon-theme/master/Papirus/64x64/apps/macchanger.svg", type: 'terminal' },
  { id: 'crackmapexec', name: 'CME', icon: "https://raw.githubusercontent.com/PapirusDevelopmentTeam/papirus-icon-theme/master/Papirus/64x64/apps/crackmapexec.svg", type: 'terminal' },
  { id: 'impacket', name: 'Impacket', icon: "https://raw.githubusercontent.com/PapirusDevelopmentTeam/papirus-icon-theme/master/Papirus/64x64/apps/impacket.svg", type: 'terminal' },
  { id: 'evilwinrm', name: 'Evil-WinRM', icon: "https://raw.githubusercontent.com/PapirusDevelopmentTeam/papirus-icon-theme/master/Papirus/64x64/apps/evil-winrm.svg", type: 'terminal' },
  { id: 'mimikatz', name: 'Mimikatz', icon: "https://raw.githubusercontent.com/PapirusDevelopmentTeam/papirus-icon-theme/master/Papirus/64x64/apps/mimikatz.svg", type: 'terminal' },
  { id: 'rubeus', name: 'Rubeus', icon: "https://raw.githubusercontent.com/PapirusDevelopmentTeam/papirus-icon-theme/master/Papirus/64x64/apps/rubeus.svg", type: 'terminal' },
  { id: 'empire', name: 'Empire', icon: "https://raw.githubusercontent.com/PapirusDevelopmentTeam/papirus-icon-theme/master/Papirus/64x64/apps/empire.svg", type: 'terminal' },
  { id: 'starkiller', name: 'Starkiller', icon: "https://raw.githubusercontent.com/PapirusDevelopmentTeam/papirus-icon-theme/master/Papirus/64x64/apps/starkiller.svg", type: 'browser' },
  { id: 'cherrytree', name: 'CherryTree', icon: "https://raw.githubusercontent.com/PapirusDevelopmentTeam/papirus-icon-theme/master/Papirus/64x64/apps/cherrytree.svg", type: 'browser' },
  { id: 'keepassxc', name: 'KeePassXC', icon: "https://raw.githubusercontent.com/PapirusDevelopmentTeam/papirus-icon-theme/master/Papirus/64x64/apps/keepassxc.svg", type: 'browser' },
  { id: 'steghide', name: 'Steghide', icon: "https://raw.githubusercontent.com/PapirusDevelopmentTeam/papirus-icon-theme/master/Papirus/64x64/apps/steghide.svg", type: 'terminal' },
  { id: 'fping', name: 'Fping', icon: "https://raw.githubusercontent.com/PapirusDevelopmentTeam/papirus-icon-theme/master/Papirus/64x64/apps/fping.svg", type: 'terminal' },
  { id: 'hping3', name: 'Hping3', icon: "https://raw.githubusercontent.com/PapirusDevelopmentTeam/papirus-icon-theme/master/Papirus/64x64/apps/hping3.svg", type: 'terminal' },
  { id: 'dig', name: 'Dig', icon: "https://raw.githubusercontent.com/PapirusDevelopmentTeam/papirus-icon-theme/master/Papirus/64x64/apps/dig.svg", type: 'terminal' },
  { id: 'nslookup', name: 'Nslookup', icon: "https://raw.githubusercontent.com/PapirusDevelopmentTeam/papirus-icon-theme/master/Papirus/64x64/apps/nslookup.svg", type: 'terminal' },
  { id: 'veil', name: 'Veil', icon: "https://raw.githubusercontent.com/PapirusDevelopmentTeam/papirus-icon-theme/master/Papirus/64x64/apps/veil.svg", type: 'terminal' },
  { id: 'cobaltstrike', name: 'CobaltStrike', icon: "https://raw.githubusercontent.com/PapirusDevelopmentTeam/papirus-icon-theme/master/Papirus/64x64/apps/cobaltstrike.svg", type: 'browser' },
  { id: 'powersploit', name: 'PowerSploit', icon: "https://raw.githubusercontent.com/PapirusDevelopmentTeam/papirus-icon-theme/master/Papirus/64x64/apps/powersploit.svg", type: 'terminal' },
  { id: 'ghidra_gui', name: 'Ghidra GUI', icon: "https://raw.githubusercontent.com/PapirusDevelopmentTeam/papirus-icon-theme/master/Papirus/64x64/apps/ghidra.svg", type: 'browser' },
  { id: 'radare2', name: 'Radare2', icon: "https://raw.githubusercontent.com/PapirusDevelopmentTeam/papirus-icon-theme/master/Papirus/64x64/apps/radare2.svg", type: 'terminal' },
  { id: 'binwalk', name: 'Binwalk', icon: "https://raw.githubusercontent.com/PapirusDevelopmentTeam/papirus-icon-theme/master/Papirus/64x64/apps/binwalk.svg", type: 'terminal' },
  { id: 'foremost', name: 'Foremost', icon: "https://raw.githubusercontent.com/PapirusDevelopmentTeam/papirus-icon-theme/master/Papirus/64x64/apps/foremost.svg", type: 'terminal' },
];

const DesktopIcon: React.FC<{ icon: string; label: string; onClick?: () => void }> = ({ icon, label, onClick }) => {
  const [imgError, setImgError] = useState(false);

  return (
    <div 
      onClick={onClick}
      className="flex flex-col items-center gap-1 w-[72px] p-2 hover:bg-white/10 rounded-sm cursor-pointer group transition-colors border border-transparent hover:border-white/5"
    >
      <div className="group-hover:scale-110 transition-transform drop-shadow-xl flex items-center justify-center h-10 w-10">
        <img 
          src={imgError ? ICON_URLS.file : icon} 
          alt={label} 
          className="w-10 h-10 object-contain pointer-events-none" 
          onError={() => setImgError(true)}
        />
      </div>
      <span className="text-white text-[9.5px] font-medium text-center drop-shadow-[0_1.5px_1.5px_rgba(0,0,0,0.9)] select-none leading-[1.1] h-8 overflow-hidden line-clamp-2">
        {label}
      </span>
    </div>
  );
};

const Desktop: React.FC = () => {
  const { openWindows, wallpaper, openApp } = useSystemStore();
  const [contextMenu, setContextMenu] = useState<{ x: number, y: number } | null>(null);

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY });
  };

  const closeContextMenu = () => setContextMenu(null);

  return (
    <div 
      className="relative flex-grow h-full w-full overflow-hidden select-none"
      onContextMenu={handleContextMenu}
      onClick={closeContextMenu}
    >
      {/* Background Layer */}
      {wallpaper === 'cmatrix' && <CMatrixBackground />}
      
      {/* Left Side Icons Grid */}
      <div className="absolute top-4 left-2 grid grid-flow-col grid-rows-[repeat(auto-fill,84px)] gap-x-2 gap-y-1 z-10 max-h-[calc(100vh-80px)]">
        <DesktopIcon icon={ICON_URLS.folder} label="File System" onClick={() => openApp('fileExplorer', 'File System')} />
        <DesktopIcon icon={ICON_URLS.home} label="Home" onClick={() => openApp('fileExplorer', 'Home')} />
        <DesktopIcon icon={ICON_URLS.file} label="readme.txt" onClick={() => openApp('terminal', 'readme.txt Viewer')} />
        <DesktopIcon icon={ICON_URLS.kali} label="Kali Docs" onClick={() => openApp('browser', 'Kali Documentation')} />
        
        {LEFT_TOOLS.map((tool) => (
          <DesktopIcon 
            key={tool.id}
            icon={tool.icon} 
            label={tool.name} 
            onClick={() => openApp(tool.type as any, tool.name)} 
          />
        ))}
      </div>

      {/* Right Side Icons Grid */}
      <div className="absolute top-4 right-2 grid grid-flow-col grid-rows-[repeat(auto-fill,84px)] gap-x-2 gap-y-1 z-10 max-h-[calc(100vh-80px)] items-end">
        {RIGHT_TOOLS.map((tool) => (
          <DesktopIcon 
            key={tool.id}
            icon={tool.icon} 
            label={tool.name} 
            onClick={() => openApp(tool.type as any, tool.name)} 
          />
        ))}
      </div>

      {/* Windows Rendering */}
      <AnimatePresence>
        {openWindows.map((win) => (
          <Window 
            key={win.id} 
            id={win.id} 
            appId={win.appId} 
            title={win.title} 
            isMinimized={win.isMinimized}
            zIndex={win.zIndex}
          >
            {win.appId === 'terminal' && <Terminal />}
            {win.appId === 'browser' && (
              <div className="bg-[#12141d] h-full w-full flex flex-col font-mono">
                <div className="h-8 bg-[#1a1c2e] border-b border-black/40 flex items-center px-4 gap-2">
                  <div className="flex-grow bg-black/40 h-5 rounded px-2 text-[9px] flex items-center text-gray-400 overflow-hidden whitespace-nowrap border border-white/5">
                    https://kali.org/tools/{win.title.toLowerCase().replace(/\s+/g, '-')}
                  </div>
                </div>
                <div className="flex-grow flex flex-col items-center justify-center text-white p-8 text-center bg-[#0f111a]">
                  <img src={ICON_URLS.kali} className="w-16 h-16 mb-6 opacity-30" />
                  <h2 className="text-lg font-black mb-2 tracking-tighter text-[#00ccff] uppercase">{win.title}</h2>
                  <div className="w-12 h-0.5 bg-[#00ccff]/30 mb-4" />
                  <p className="text-gray-500 text-[10px] max-w-xs font-mono leading-relaxed">
                    Executing remote shell interface for <span className="text-[#00ccff]">{win.title}</span>.
                    <br/><br/>
                    <span className="text-green-500 animate-pulse">[ SECURE CONNECTION ACTIVE ]</span>
                  </p>
                </div>
              </div>
            )}
            {win.appId === 'fileExplorer' && (
              <div className="bg-[#1a1c2e] h-full w-full p-4 text-white grid grid-cols-4 gap-4 auto-rows-max overflow-y-auto">
                {['Documents', 'Downloads', 'Music', 'Pictures', 'Videos', 'Templates'].map(folder => (
                  <div key={folder} className="flex flex-col items-center gap-2 cursor-pointer hover:bg-white/5 p-2 rounded transition-colors group">
                    <img src={ICON_URLS.folder} alt={folder} className="w-10 h-10 object-contain group-hover:scale-105 transition-transform" />
                    <span className="text-[10px] font-medium">{folder}</span>
                  </div>
                ))}
              </div>
            )}
          </Window>
        ))}
      </AnimatePresence>

      {/* Context Menu */}
      {contextMenu && (
        <div 
          className="fixed bg-[#1a1b26]/95 backdrop-blur-xl border border-white/10 rounded shadow-2xl p-1 z-[10000] text-[11px] text-gray-300 w-44"
          style={{ top: contextMenu.y, left: contextMenu.x }}
        >
          <div className="px-3 py-1.5 hover:bg-[#00ccff]/20 hover:text-white rounded-sm cursor-pointer transition-colors flex items-center gap-2">
            Create Folder
          </div>
          <div className="px-3 py-1.5 hover:bg-[#00ccff]/20 hover:text-white rounded-sm cursor-pointer transition-colors flex items-center gap-2">
            Open Terminal Here
          </div>
          <div className="h-px bg-white/5 my-1 mx-1" />
          <div className="px-3 py-1.5 hover:bg-[#00ccff]/20 hover:text-white rounded-sm cursor-pointer transition-colors">Desktop Settings...</div>
        </div>
      )}
    </div>
  );
};

export default Desktop;
