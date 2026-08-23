"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "model-viewer": any;
    }
  }
}

const INITIAL_LOGS = [
  { text: "> RELAYING STRUCTURE UPDATE...", color: "text-[var(--cyan-accent)] font-bold" },
  { text: "> INDEXING 01_BRIEFING THROUGH 07_OPERATORS", color: "text-white/60" },
  { text: "> PARTICLE_GRID INITIALIZED.", color: "text-white/40" },
  { text: "> ENCRYPTION_LAYER: ACTIVE.", color: "text-white/40" },
  { text: "------------------------------------------------", color: "text-white/10" },
  { text: "CRYPTS'26 Terminal  [AUTHORIZED_SESSION]", color: "text-[var(--magenta-hot)]" },
  { text: "Type 'help' for available commands.", color: "text-white/30" },
];

export default function HeroSection() {
  const [logs, setLogs] = useState<{ text: string; color: string }[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [typedTagline, setTypedTagline] = useState("");
  const terminalEndRef = useRef<HTMLDivElement>(null);
  
  const fullTagline = "BORN FROM CHAOS, BUILT FOR INNOVATION";

  useEffect(() => {
    let currentLogIndex = 0;
    const interval = setInterval(() => {
      if (currentLogIndex < INITIAL_LOGS.length) {
        const newLog = INITIAL_LOGS[currentLogIndex];
        setLogs((prev) => [...prev, newLog]);
        currentLogIndex++;
      } else {
        clearInterval(interval);
      }
    }, 280);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let i = 0;
    let currentString = "";
    const typingInterval = setInterval(() => {
      if (i < fullTagline.length) {
        currentString += fullTagline.charAt(i);
        setTypedTagline(currentString);
        i++;
      } else {
        clearInterval(typingInterval);
      }
    }, 40);

    return () => clearInterval(typingInterval);
  }, []);

  // Removed automatic scroll on load to prevent jumping to terminal

  const handleCommand = (cmd: string) => {
    const command = cmd.toLowerCase().trim();
    if (!command) return;

    setLogs((prev) => [...prev, { text: `root@crypts:~# ${cmd}`, color: "text-white/30" }]);
    
    setTimeout(() => {
      let response = { text: "", color: "" };
      
      switch (command) {
        case "help":
          response = { text: "COMMANDS: help · clear · enroll · modules · status · about", color: "text-[var(--cyan-accent)]" };
          break;
        case "clear":
          setLogs([]);
          return;
        case "status":
          setLogs((prev) => [
            ...prev,
            { text: "> SYSTEM_STATE:    OPERATIONAL", color: "text-[var(--cyan-accent)]" },
            { text: "> NODES:           7 / 7 ACTIVE", color: "text-white/50" },
            { text: "> PACKET_LOSS:     0.00%", color: "text-white/50" }
          ]);
          return;
        case "about":
          setLogs((prev) => [
            ...prev,
            { text: "> CRYPTS'26 | OPG WORLD SCHOOL | TECHFEST", color: "text-white" },
            { text: "> THEME: THE SINGULARITY OVERLOAD", color: "text-white/50" }
          ]);
          return;
        case "enroll":
        case "modules":
          const id = command === "enroll" ? "enrollment" : "modules";
          response = { text: `> REDIRECTING TO ${command.toUpperCase()}...`, color: "text-[var(--magenta-hot)]" };
          setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }), 400);
          break;
        default:
          response = { text: `COMMAND_NOT_FOUND: '${command}'. Type 'help'.`, color: "text-red-400/80" };
      }
      
      if (response.text) {
        setLogs((prev) => [...prev, response]);
      }
    }, 300);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCommand(inputValue);
      setInputValue("");
    }
  };

  return (
    <section id="briefing" className="relative min-h-screen flex items-center justify-center pt-24 pb-12 overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Column: Hero Text & Branding */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col space-y-6"
        >
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-[var(--cyan-dim)] border border-[var(--cyan-glow)] rounded-sm w-fit">
            <span className="w-2 h-2 rounded-full bg-[var(--cyan-accent)] animate-pulse" />
            <span className="text-xs font-bold tracking-widest text-[var(--cyan-accent)]">SYSTEM ONLINE // v26.0.0</span>
          </div>
          
          <div className="relative">
             <img src="/logo/d1fae019-3222-451f-8174-ffd6737710eb.png" alt="CRYPTS'26 Logo" className="h-24 md:h-32 lg:h-40 object-contain mb-4 filter drop-shadow-[0_0_15px_rgba(255,0,127,0.5)]" />
             <h1 className="text-5xl md:text-7xl font-black uppercase leading-none tracking-tighter">
                <span className="glitch glitch-hero" data-text="THE SINGULARITY">THE SINGULARITY</span><br/>
                <span className="text-[var(--cyan-accent)] font-outline-2 drop-shadow-[0_0_10px_var(--cyan-glow)]">OVERLOAD</span>
             </h1>
          </div>

          <div className="min-h-[80px]">
            <p className="text-lg md:text-xl text-gray-300 font-medium">
              {typedTagline}
              <span className="animate-pulse text-[var(--magenta-bright)] ml-1">_</span>
            </p>
            {typedTagline.length === fullTagline.length && (
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-sm md:text-lg mt-2 font-mono italic font-bold tracking-wide bg-gradient-to-r from-[var(--cyan-accent)] to-[var(--magenta-hot)] text-transparent bg-clip-text"
              >
                In Chaos We Create. Through Innovation We Evolve.
              </motion.p>
            )}
          </div>
          
          <div className="flex flex-wrap gap-4 pt-4">
            <button 
              onClick={() => document.getElementById("enrollment")?.scrollIntoView({ behavior: "smooth" })}
              className="px-8 py-3 bg-transparent border-2 border-[var(--magenta-hot)] text-[var(--magenta-hot)] font-bold tracking-widest uppercase hover:bg-[var(--magenta-hot)] hover:text-white transition-all shadow-[0_0_15px_var(--magenta-glow)] hover:shadow-[0_0_25px_var(--magenta-glow)]"
            >
              INITIALIZE_LINK()
            </button>
            <button 
              onClick={() => document.getElementById("modules")?.scrollIntoView({ behavior: "smooth" })}
              className="px-8 py-3 bg-[var(--dark-glass)] border border-[var(--border-subtle)] text-white font-medium tracking-wide hover:bg-[var(--cyan-dim)] hover:border-[var(--cyan-glow)] hover:text-[var(--cyan-accent)] transition-all"
            >
              VIEW_MODULES
            </button>
          </div>
        </motion.div>

        {/* Right Column: 3D Interactive Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, type: "spring" }}
          className="w-full flex justify-center items-center relative -mt-8 md:-mt-20 lg:-mt-24"
        >
          {/* Subtle Glowing Magenta Backdrop Filter effect behind the model */}
          <div className="absolute w-[200px] h-[200px] md:w-[350px] md:h-[350px] rounded-full bg-[var(--magenta-hot)]/20 blur-[80px] pointer-events-none" />
          
          {/* @ts-ignore */}
          <model-viewer
            src="/new_logo.glb"
            camera-controls
            auto-rotate
            disable-zoom
            interaction-prompt="none"
            suppressHydrationWarning
            className="w-[80%] max-w-[400px] h-[300px] md:h-[400px] bg-transparent outline-none cursor-grab active:cursor-grabbing mx-auto"
            style={{ backgroundColor: "transparent" }}
          />
        </motion.div>
      </div>
    </section>
  );
}
