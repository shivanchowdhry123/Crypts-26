"use client";

import { motion, AnimatePresence } from "framer-motion";
import { EventData } from "@/data/events";

interface EventModalProps {
  event: EventData | null;
  onClose: () => void;
}

export default function EventModal({ event, onClose }: EventModalProps) {
  if (!event) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-[var(--dark-void)]/90 backdrop-blur-sm p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-[var(--card-bg)] border border-[var(--border-subtle)] shadow-[0_0_30px_var(--magenta-dim)]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Modal Header */}
          <div className="sticky top-0 z-10 bg-[var(--card-bg)]/95 backdrop-blur-md border-b border-[var(--border-subtle)] p-6 flex items-start gap-4">
            <div className={`w-16 h-16 shrink-0 rounded-sm flex items-center justify-center text-xl font-bold bg-[var(--dark-surface)] border border-[var(--border-subtle)] text-${event.cat === 'security' || event.cat === 'ai' ? '[var(--magenta-hot)]' : '[var(--cyan-accent)]'}`}>
              {event.icon}
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 truncate">
                {event.name}
              </h2>
              <div className="flex flex-wrap gap-2">
                <span className={`px-2 py-0.5 text-xs font-bold uppercase tracking-wider rounded-sm ${event.mode === 'online' ? 'bg-[#00f3ff]/20 text-[#00f3ff]' : 'bg-[#ff00c1]/20 text-[#ff00c1]'}`}>
                  {event.mode}
                </span>
                <span className="px-2 py-0.5 text-xs font-medium bg-[var(--dark-surface)] text-gray-300 border border-[var(--border-faint)] rounded-sm">
                  {event.eligibility}
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white p-2 transition-colors focus:outline-none"
              aria-label="Close modal"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Modal Body */}
          <div className="p-6 space-y-6">
            <p className="text-gray-300 text-sm md:text-base leading-relaxed">
              {event.desc}
            </p>

            <div className="space-y-4">
              <div className="bg-[var(--dark-surface)] border border-[var(--border-faint)] p-4 rounded-sm relative overflow-hidden group hover:border-[var(--cyan-glow)] transition-colors">
                <div className="absolute top-0 left-0 w-1 h-full bg-[var(--cyan-accent)]" />
                <h3 className="text-xs font-bold text-[var(--cyan-accent)] tracking-widest mb-2">&gt;&gt; DATE & TIME</h3>
                <p className="text-white font-medium">{event.date}</p>
              </div>

              <div className="bg-[var(--dark-surface)] border border-[var(--border-faint)] p-4 rounded-sm relative overflow-hidden group hover:border-[var(--magenta-glow)] transition-colors">
                <div className="absolute top-0 left-0 w-1 h-full bg-[var(--magenta-hot)]" />
                <h3 className="text-xs font-bold text-[var(--magenta-hot)] tracking-widest mb-3">&gt;&gt; RULES</h3>
                <ul className="space-y-2">
                  {event.rules.map((rule, idx) => (
                    <li key={idx} className="flex items-start text-sm text-gray-300">
                      <span className="text-[var(--magenta-hot)] mr-2 mt-0.5">▪</span>
                      {rule}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-[var(--dark-surface)] border border-[var(--border-faint)] p-4 rounded-sm relative overflow-hidden group hover:border-[var(--gold-glow)] transition-colors">
                <div className="absolute top-0 left-0 w-1 h-full bg-[var(--gold-accent)]" />
                <h3 className="text-xs font-bold text-[var(--gold-accent)] tracking-widest mb-3">&gt;&gt; JUDGMENT CRITERIA</h3>
                <ul className="space-y-2">
                  {event.criteria.map((criteria, idx) => (
                    <li key={idx} className="flex items-start text-sm text-gray-300">
                      <span className="text-[var(--gold-accent)] mr-2 mt-0.5">▪</span>
                      {criteria}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-[var(--dark-surface)] border border-[var(--border-faint)] p-4 rounded-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-gray-500" />
                <h3 className="text-xs font-bold text-gray-400 tracking-widest mb-2">&gt;&gt; EVENT IN-CHARGE</h3>
                <p className="text-white text-sm">{event.contact}</p>
              </div>
            </div>
            
            <div className="pt-4 text-center">
              <button 
                onClick={onClose}
                className="px-6 py-2 border border-[var(--border-subtle)] text-gray-300 text-sm tracking-widest uppercase hover:bg-white/5 transition-colors"
              >
                [ CLOSE_MODULE ]
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
