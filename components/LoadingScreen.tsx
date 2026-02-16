
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const BOOT_LOGS = [
  "Mounting /dev/sda1 on /root...",
  "[  OK  ] Started udev Kernel Device Manager.",
  "Starting Cryptography Setup for luks-kali...",
  "[  OK  ] Finished Cryptography Setup.",
  "Checking file systems...",
  "[  OK  ] Started Network Manager Script Dispatcher Service.",
  "Setting up networking...",
  "Initializing Kernel Modules...",
  "Loading Kali Linux Rolling 2024.1...",
  "Scanning for hardware peripherals...",
  "Detected Intel(R) Core(TM) i9-14900K",
  "NVIDIA Corporation GA102 [GeForce RTX 3090] driver loaded.",
  "Configuring Xorg server...",
  "Starting Light Display Manager...",
  "Starting accounts-daemon...",
  "Started TLP system startup/shutdown.",
  "Reached target Graphical Interface.",
  "Initializing Virtual File System (VFS)...",
  "Applying security patches...",
  "Starting Kali Security Services...",
  "Ready for login."
];

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [displayedLogs, setDisplayedLogs] = useState<string[]>([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < BOOT_LOGS.length) {
      const timeout = setTimeout(() => {
        setDisplayedLogs(prev => [...prev, BOOT_LOGS[index]]);
        setIndex(index + 1);
      }, Math.random() * 200 + 50);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(onComplete, 1000);
      return () => clearTimeout(timeout);
    }
  }, [index, onComplete]);

  return (
    <div className="fixed inset-0 bg-black z-[20000] p-8 font-mono overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-[#00ccff] mb-8 font-black text-xl tracking-widest"
        >
          <pre className="leading-tight">
{`
  ██╗  ██╗ █████╗ ██╗     ██╗    ██████╗  ██████╗  ██████╗ ████████╗
  ██║ ██╔╝██╔══██╗██║     ██║    ██╔══██╗██╔═══██╗██╔═══██╗╚══██╔══╝
  █████╔╝ ███████║██║     ██║    ██████╔╝██║   ██║██║   ██║   ██║   
  ██╔═██╗ ██╔══██║██║     ██║    ██╔══██╗██║   ██║██║   ██║   ██║   
  ██║  ██╗██║  ██║███████╗██║    ██████╔╝╚██████╔╝╚██████╔╝   ██║   
  ╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝╚═╝    ╚═════╝  ╚═════╝  ╚═════╝    ╚═╝   
`}
          </pre>
        </motion.div>
        
        <div className="space-y-1 text-sm">
          {displayedLogs.map((log, i) => (
            <motion.div 
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              key={i} 
              className={log.includes('[  OK  ]') ? 'text-green-500' : 'text-gray-400'}
            >
              <span className="mr-2 text-gray-600">[{new Date().toLocaleTimeString()}]</span>
              {log}
            </motion.div>
          ))}
          <div className="w-2 h-5 bg-[#00ff41] animate-pulse inline-block align-middle" />
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
