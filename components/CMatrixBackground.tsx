
import React, { useEffect, useRef } from 'react';

const CMatrixBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener('resize', resize);

    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$+-*/=%\"'#&_(),.;:?!\\|{}<>[]^~";
    const fontSize = 16;
    const columns = Math.floor(canvas.width / fontSize);
    const drops: number[] = new Array(columns).fill(1);

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#0F0';
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 33);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-black">
      {/* The Matrix Rain Canvas */}
      <canvas ref={canvasRef} className="opacity-40" />
      
      {/* Enhanced Kali Dragon Overlay */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <img 
          src="https://www.kali.org/images/kali-dragon-icon.svg" 
          alt="Background Logo" 
          className="w-[500px] h-[500px] opacity-25 drop-shadow-[0_0_80px_rgba(0,204,255,0.6)] animate-pulse-slow transition-opacity duration-1000"
        />
      </div>

      <style>{`
        @keyframes pulse-slow {
          0%, 100% { 
            transform: scale(1);
            filter: drop-shadow(0 0 40px rgba(0,204,255,0.3));
          }
          50% { 
            transform: scale(1.02);
            filter: drop-shadow(0 0 100px rgba(0,204,255,0.7));
          }
        }
        .animate-pulse-slow {
          animation: pulse-slow 8s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default CMatrixBackground;
