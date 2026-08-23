"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Scroll to top on mount just in case
    window.scrollTo(0, 0);
    
    const duration = 2000; // 2 seconds
    const intervalTime = 40;
    const steps = duration / intervalTime;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      setProgress(Math.min((currentStep / steps) * 100, 100));
      
      if (currentStep >= steps) {
        clearInterval(timer);
        setTimeout(onComplete, 400); // Brief pause at 100% before fading out
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#02030a] text-white"
    >
      <div className="relative flex flex-col items-center w-full px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative mb-16"
        >
          <img 
            src="/logo/d1fae019-3222-451f-8174-ffd6737710eb.png" 
            alt="CRYPTS'26"
            className="h-28 md:h-40 object-contain filter drop-shadow-[0_0_25px_rgba(0,243,255,0.6)] animate-pulse"
          />
        </motion.div>

        <div className="w-full max-w-sm h-[2px] bg-white/10 relative overflow-hidden mb-6">
          <motion.div 
            className="absolute top-0 left-0 h-full bg-[var(--cyan-accent)] shadow-[0_0_15px_var(--cyan-glow)]"
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: "linear", duration: 0.1 }}
          />
        </div>

        <div className="flex flex-col items-center gap-2 font-mono">
          <span className="text-[var(--cyan-accent)] text-xs md:text-sm tracking-widest font-bold uppercase">
            {progress < 30 ? "Initializing Kernel..." : progress < 70 ? "Establishing Secure Connection..." : progress < 99 ? "Loading Modules..." : "System Ready"}
          </span>
          <span className="text-gray-500 text-[9px] md:text-[10px] tracking-[0.3em] uppercase">
            SINGULARITY OVERLOAD // {Math.floor(progress)}%
          </span>
        </div>
      </div>
    </motion.div>
  );
}
