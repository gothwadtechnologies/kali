
import React, { useState, useEffect } from 'react';
import { useSystemStore } from '../store/useSystemStore';
import { Activity, Cpu, Globe, Terminal, Shield, Cpu as Processor } from 'lucide-react';

const SystemFooter: React.FC = () => {
  const { openWindows, focusWindow, focusedWindowId } = useSystemStore();
  const [logs, setLogs] = useState<string[]>(["[  OK  ] Reached target Multi-User System.", "[  OK  ] Started Login Service."]);
  const [network, setNetwork] = useState({ rx: 0, tx: 0 });

  // Simulate logs and network traffic
  useEffect(() => {
    const logPool = [
      "INTRUSION_DETECTION: Blocked packet from 192.168.1.44",
      "SYS_INFO: Kernel version 6.5.0-kali-amd64",
      "WIFI: Signal strength 88%",
      "TEMP_MON: CPU Core 0: 42°C",
      "DHCP: Requesting lease on eth0...",
      "FS_CHECK: /dev/nvme0n1p2 clean",
      "SERVICE: Postgresql-15 started successfully",
    ];

    const interval = setInterval(() => {
      setLogs(prev => [...prev.slice(-1), logPool[Math.floor(Math.random() * logPool.length)]]);
      setNetwork({
        rx: Math.floor(Math.random() * 500),
        tx: Math.floor(Math.random() * 100),
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-6 bg-[#0f111a]/90 backdrop-blur-md border-t border-[#00ccff]/30 flex items-center justify-between px-3 text-[9px] font-mono text-gray-400 z-[10002] fixed bottom-0 left-0 right-0">
      
      {/* Left: Kernel Logs */}
      <div className="flex items-center gap-3 overflow-hidden whitespace-nowrap w-1/4">
        <span className="text-[#00ccff] font-bold">[KNL]</span>
        <div className="flex gap-4 animate-marquee">
          {logs.map((log, i) => (
            <span key={i} className={log.includes('WARN') || log.includes('INTRUSION') ? 'text-red-400' : 'text-gray-500'}>
              {log}
            </span>
          ))}
        </div>
      </div>

      {/* Center: Active Nodes (Window Links) */}
      <div className="flex items-center gap-1 justify-center flex-1 max-w-[50%] overflow-x-auto no-scrollbar">
        <span className="text-[#00ccff] mr-2 flex items-center gap-1">
          <Activity size={10} /> NODES:
        </span>
        {openWindows.length === 0 && <span className="text-gray-600 italic">No active sessions</span>}
        {openWindows.map((win) => (
          <button
            key={win.id}
            onClick={() => focusWindow(win.id)}
            className={`px-2 py-0.5 border rounded-sm transition-all flex items-center gap-1.5 whitespace-nowrap ${
              focusedWindowId === win.id 
                ? 'bg-[#00ccff]/20 border-[#00ccff] text-white shadow-[0_0_8px_rgba(0,204,255,0.4)]' 
                : 'bg-transparent border-white/10 text-gray-500 hover:border-white/30 hover:text-gray-300'
            }`}
          >
            <div className={`w-1 h-1 rounded-full ${focusedWindowId === win.id ? 'bg-[#00ccff] animate-pulse' : 'bg-gray-600'}`} />
            {win.title.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Right: Telemetry */}
      <div className="flex items-center gap-4 w-1/4 justify-end">
        <div className="flex items-center gap-2">
           <span className="text-gray-600">IP:</span>
           <span className="text-[#00ccff]">10.0.0.155</span>
        </div>
        <div className="flex items-center gap-2">
           <span className="text-gray-600">RX:</span>
           <span className="text-green-500 w-10 text-right">{network.rx}Kb/s</span>
        </div>
        <div className="flex items-center gap-2">
           <span className="text-gray-600">TX:</span>
           <span className="text-blue-500 w-10 text-right">{network.tx}Kb/s</span>
        </div>
        <div className="flex items-center gap-2 ml-2">
          <Processor size={12} className="text-[#00ccff]" />
          <div className="w-16 h-1.5 bg-gray-800 rounded-full overflow-hidden border border-white/5">
            <div className="h-full bg-[#00ccff] animate-pulse" style={{ width: '65%' }} />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default SystemFooter;
