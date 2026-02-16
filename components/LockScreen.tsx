
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Lock, ArrowRight, AlertCircle, ShieldCheck, UserCircle, Globe, Activity, Clock, Terminal, Cpu } from 'lucide-react';

interface LockScreenProps {
  onLogin: () => void;
}

type LoginMode = 'standard' | 'admin' | 'guest';

const SideBox: React.FC<{ title: string; icon: React.ReactNode; children: React.ReactNode }> = ({ title, icon, children }) => (
  <motion.div 
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    className="w-72 h-52 bg-black/80 backdrop-blur-md border border-[#00ff41]/30 rounded-lg p-4 flex flex-col gap-2 overflow-hidden shadow-[0_0_15px_rgba(0,255,65,0.1)] group hover:border-[#00ff41]/60 transition-colors relative"
  >
    {/* Decorative corner accents */}
    <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#00ff41]" />
    <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#00ff41]" />
    <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#00ff41]" />
    <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#00ff41]" />
    
    <div className="flex items-center gap-2 border-b border-[#00ff41]/20 pb-2 text-[#00ff41]">
      {icon}
      <span className="text-[10px] font-black tracking-[0.2em] uppercase italic">{title}</span>
    </div>
    <div className="flex-grow font-mono text-[9px] text-[#00ff41]/80 overflow-hidden leading-relaxed">
      {children}
    </div>
  </motion.div>
);

const LockScreen: React.FC<LockScreenProps> = ({ onLogin }) => {
  const [mode, setMode] = useState<LoginMode>('standard');
  const [username, setUsername] = useState('kali');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [time, setTime] = useState(new Date());
  const [ip, setIp] = useState('192.168.1.1');

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    const ipTimer = setInterval(() => {
      setIp(`${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`);
    }, 1500);
    return () => {
      clearInterval(timer);
      clearInterval(ipTimer);
    };
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAuthenticating(true);
    setError(false);

    setTimeout(() => {
      let success = false;
      if (mode === 'standard' && username === 'kali' && password === 'kali') success = true;
      if (mode === 'admin' && email === 'pawangothwad@gmail.com' && password === 'Pawan3017@') success = true;
      if (mode === 'guest') success = true;

      if (success) {
        onLogin();
      } else {
        setError(true);
        setIsAuthenticating(false);
        setPassword('');
      }
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[15000] flex items-center justify-center bg-black overflow-hidden font-mono">
      {/* Matrix-like Scanline Overlay */}
      <div className="absolute inset-0 pointer-events-none z-50 opacity-10 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />
      
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-20 pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#00ff41 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }} />

      {/* Pulsing Glitch Circle */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-[#00ff41]/5 rounded-full animate-pulse pointer-events-none" />

      <div className="container mx-auto h-full flex items-center justify-between px-12 relative z-10">
        
        {/* Left Side Column */}
        <div className="flex flex-col gap-8">
          <SideBox title="CHRONOS_WATCH" icon={<Clock size={14} />}>
            <div className="flex flex-col items-center justify-center h-full gap-2">
              <span className="text-4xl font-black text-[#00ff41] drop-shadow-[0_0_10px_rgba(0,255,65,0.5)]">
                {time.toLocaleTimeString([], { hour12: false })}
              </span>
              <div className="flex flex-col items-center text-[8px] tracking-[0.3em] text-[#00ff41]/60 uppercase">
                <span>{time.toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                <span className="mt-1 text-[#00ff41]">Sync: Stratum-1 Verified</span>
              </div>
              <div className="w-full h-0.5 bg-[#00ff41]/10 mt-2 relative overflow-hidden">
                <motion.div 
                  className="absolute inset-0 bg-[#00ff41]"
                  animate={{ left: ['-100%', '100%'] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                />
              </div>
            </div>
          </SideBox>

          <SideBox title="NET_INFILTRATION" icon={<Terminal size={14} />}>
            <div className="flex flex-col gap-1 leading-tight text-[8px]">
              <p className="text-[#00ff41] animate-pulse">&gt; Initializing backchannel...</p>
              <p className="text-[#00ff41]/60">&gt; SSH_Brute_Force: Attempt 402/1000</p>
              <p className="text-yellow-500">&gt; WARNING: Honeypot detected at node_4</p>
              <p className="text-red-500 font-bold">&gt; ALERT: Intrusion Countermeasures Active</p>
              <p className="text-[#00ff41]/40">&gt; Dumping hashes to /tmp/.exfil...</p>
              <div className="flex gap-1 mt-1">
                {[...Array(20)].map((_, i) => (
                   <div key={i} className={`w-1 h-3 ${Math.random() > 0.7 ? 'bg-[#00ff41]' : 'bg-[#00ff41]/20'}`} />
                ))}
              </div>
            </div>
          </SideBox>
        </div>

        {/* Central Auth Interface */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md p-1 bg-black/40 backdrop-blur-3xl border border-[#00ff41]/20 rounded shadow-[0_0_100px_rgba(0,255,65,0.05)] overflow-hidden relative"
        >
          {/* Scanning Line Effect */}
          <motion.div 
            className="absolute left-0 right-0 h-px bg-[#00ff41]/50 z-20 pointer-events-none"
            animate={{ top: ['0%', '100%', '0%'] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          />

          <div className="p-8 border border-[#00ff41]/10 rounded bg-black/90">
            <div className="flex flex-col items-center mb-10">
              <div className="relative mb-6">
                <img 
                  src="https://www.kali.org/images/kali-dragon-icon.svg" 
                  alt="Kali" 
                  className="w-24 h-24 drop-shadow-[0_0_15px_rgba(0,255,65,0.4)] brightness-125"
                />
                <div className="absolute -inset-4 border border-[#00ff41]/20 rounded-full animate-spin-slow pointer-events-none" />
              </div>
              <h1 className="text-[#00ff41] text-2xl font-black tracking-[0.4em] uppercase mb-1 drop-shadow-[0_0_8px_rgba(0,255,65,0.3)]">
                {mode === 'admin' ? 'ROOT_OVERRIDE' : mode === 'guest' ? 'GUEST_ACCESS' : 'SYSTEM_LOGIN'}
              </h1>
              <div className="h-0.5 w-12 bg-[#00ff41] mt-2 mb-2" />
              <p className="text-[#00ff41]/40 text-[9px] tracking-widest uppercase italic">
                {mode === 'admin' ? 'Direct Kernel Memory Access' : 'Encrypted Handshake Required'}
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <AnimatePresence mode="wait">
                {mode === 'standard' && (
                  <motion.div 
                    key="standard"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="relative"
                  >
                    <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#00ff41]/40" />
                    <input 
                      type="text" 
                      placeholder="USER_ID"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full bg-black border border-[#00ff41]/30 rounded-none py-4 pl-12 pr-4 text-[#00ff41] placeholder:text-[#00ff41]/20 focus:outline-none focus:border-[#00ff41] focus:ring-1 focus:ring-[#00ff41]/50 transition-all text-sm uppercase"
                    />
                  </motion.div>
                )}

                {mode === 'admin' && (
                  <motion.div 
                    key="admin"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="relative"
                  >
                    <UserCircle size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#00ff41]/40" />
                    <input 
                      type="email" 
                      placeholder="ROOT_EMAIL_ID"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-black border border-[#00ff41]/30 rounded-none py-4 pl-12 pr-4 text-[#00ff41] placeholder:text-[#00ff41]/20 focus:outline-none focus:border-[#00ff41] focus:ring-1 focus:ring-[#00ff41]/50 transition-all text-sm uppercase"
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              {mode !== 'guest' && (
                <div className="relative">
                  <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#00ff41]/40" />
                  <input 
                    type="password" 
                    placeholder="SECURE_PASSCODE"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-black border border-[#00ff41]/30 rounded-none py-4 pl-12 pr-4 text-[#00ff41] placeholder:text-[#00ff41]/20 focus:outline-none focus:border-[#00ff41] focus:ring-1 focus:ring-[#00ff41]/50 transition-all text-sm uppercase"
                  />
                </div>
              )}

              <AnimatePresence>
                {error && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center gap-2 text-red-500 text-[9px] uppercase font-bold tracking-tighter"
                  >
                    <AlertCircle size={12} />
                    Authentication Failed. Identity Mismatch.
                  </motion.div>
                )}
              </AnimatePresence>

              <button 
                type="submit"
                disabled={isAuthenticating}
                className="w-full bg-[#00ff41] text-black font-black py-4 rounded-none transition-all flex items-center justify-center gap-2 hover:bg-[#00ff41]/80 hover:shadow-[0_0_20px_rgba(0,255,65,0.4)] disabled:opacity-50 uppercase tracking-[0.2em]"
              >
                {isAuthenticating ? (
                  <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                ) : (
                  <>
                    DECRYPT & CONNECT
                    <ArrowRight size={18} />
                  </>
                )}
              </button>

              <div className="flex flex-col items-center gap-4 pt-2">
                <button 
                  type="button"
                  onClick={() => setMode(mode === 'admin' ? 'standard' : 'admin')}
                  className="text-[#00ff41]/60 hover:text-[#00ff41] text-[10px] font-bold uppercase tracking-widest underline decoration-transparent hover:decoration-[#00ff41] transition-all"
                >
                  {mode === 'admin' ? '[!] Switch to User Login' : '[!] Authenticate as Root'}
                </button>
                
                <button 
                  type="button"
                  onClick={() => { setMode('guest'); handleLogin({ preventDefault: () => {} } as any); }}
                  className="text-[#00ff41]/30 hover:text-[#00ff41]/60 text-[9px] uppercase tracking-tighter transition-colors"
                >
                  Proceed with Limited Guest Privileges
                </button>
              </div>
            </form>
          </div>
        </motion.div>

        {/* Right Side Column */}
        <div className="flex flex-col gap-8">
          <SideBox title="GEO_LOKI_TRACER" icon={<Globe size={14} />}>
            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center bg-[#00ff41]/5 p-2 border-l-2 border-[#00ff41]">
                <span className="text-[#00ff41]/60">TARGET_IP:</span>
                <span className="text-[#00ff41] font-bold animate-pulse">{ip}</span>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-[7px] text-[#00ff41]/40 uppercase">
                  <span>Packet Intercept</span>
                  <span>Active</span>
                </div>
                <div className="flex gap-0.5">
                  {[...Array(24)].map((_, i) => (
                    <div key={i} className={`h-1.5 flex-1 ${Math.random() > 0.4 ? 'bg-[#00ff41]/40' : 'bg-transparent border border-[#00ff41]/10'}`} />
                  ))}
                </div>
              </div>
              <div className="text-[7px] text-[#00ff41]/50 flex items-center gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
                TRACING PACKET ORIGIN: [ENCRYPTED]
              </div>
            </div>
          </SideBox>

          <SideBox title="CORE_LOAD_BALANCER" icon={<Cpu size={14} />}>
            <div className="space-y-4 pt-2">
              <div className="space-y-1.5">
                <div className="flex justify-between text-[7px] text-[#00ff41]/60 font-bold">
                  <span>CPU_KERNEL_LOAD</span>
                  <span>{Math.floor(Math.random() * 30 + 10)}%</span>
                </div>
                <div className="w-full h-1 bg-[#00ff41]/5 border border-[#00ff41]/20">
                  <motion.div 
                    animate={{ width: ['10%', '40%', '25%'] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="h-full bg-[#00ff41]" 
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <div className="flex justify-between text-[7px] text-[#00ff41]/60 font-bold">
                  <span>MEM_RESERVATION</span>
                  <span>1.4 GB / 16 GB</span>
                </div>
                <div className="w-full h-1 bg-[#00ff41]/5 border border-[#00ff41]/20">
                  <motion.div 
                    initial={{ width: '8.7%' }}
                    className="h-full bg-blue-500" 
                  />
                </div>
              </div>
              <div className="flex items-center gap-2 text-[7px] text-green-500/40 border-t border-[#00ff41]/10 pt-3">
                <ShieldCheck size={10} />
                <span>FIREWALL STATUS: AGGRESSIVE</span>
              </div>
            </div>
          </SideBox>
        </div>
      </div>

      {/* Retro Versioning Banner */}
      <div className="fixed bottom-6 left-0 right-0 flex items-center justify-center gap-6 text-[#00ff41]/20 text-[8px] font-mono tracking-[0.5em] uppercase pointer-events-none z-20">
        <span className="flex items-center gap-1"><Activity size={10} /> BUS_CLK: 3.2GHZ</span>
        <span className="bg-[#00ff41]/10 px-2 py-0.5">KALI_OS_LOCKED</span>
        <span>BUILD_VER: 2024.1_STABLE</span>
      </div>

      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 12s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default LockScreen;
