"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { EVENTS_DATA, EventData } from "@/data/events";
import EventModal from "./EventModal";

const FILTERS = [
  { id: "all", label: "ALL_MODULES" },
  { id: "offline", label: "OFFLINE_ONLY" },
  { id: "online", label: "ONLINE_ONLY" },
  { id: "coding", label: "CODING" },
  { id: "design", label: "DESIGN" },
  { id: "security", label: "SECURITY" },
  { id: "av", label: "A/V" },
  { id: "gaming", label: "GAMING" },
  { id: "biz", label: "BUSINESS" },
];

export default function EventModules() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedEvent, setSelectedEvent] = useState<EventData | null>(null);

  const eventsList = Object.values(EVENTS_DATA).sort((a, b) => 
    a.name.localeCompare(b.name)
  );

  const filteredEvents = eventsList.filter((event) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "offline" || activeFilter === "online") return event.mode === activeFilter;
    return event.cat === activeFilter;
  });

  return (
    <section id="modules" className="py-24 relative z-10 bg-[var(--dark-void)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-12">
          <div className="flex items-center space-x-4 mb-4">
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white">
              02_<span className="text-[var(--cyan-accent)] drop-shadow-[0_0_10px_var(--cyan-glow)]">EVENT_MODULES</span>
            </h2>
            <div className="h-[2px] flex-grow bg-gradient-to-r from-[var(--cyan-accent)] to-transparent opacity-50" />
          </div>
          <p className="text-gray-400 font-medium max-w-2xl">
            Select a module to view mission briefing, rules of engagement, and judgment criteria.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-12">
          {FILTERS.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-4 py-2 text-xs md:text-sm font-bold tracking-widest uppercase transition-all duration-300 border ${
                activeFilter === filter.id
                  ? "bg-[var(--cyan-dim)] border-[var(--cyan-accent)] text-[var(--cyan-accent)] shadow-[0_0_10px_var(--cyan-glow)]"
                  : "bg-[var(--dark-surface)] border-[var(--border-subtle)] text-gray-400 hover:border-[var(--cyan-glow)] hover:text-white"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Flex Auto-Fill Grid */}
        <motion.div 
          layout
          className="flex flex-wrap gap-6 lg:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredEvents.map((event) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                key={event.id}
                onClick={() => setSelectedEvent(event)}
                className="group relative bg-[var(--card-bg)] border border-[var(--border-subtle)] hover:border-[var(--cyan-accent)] p-8 rounded-sm cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_var(--cyan-dim)] hover:-translate-y-2 flex flex-col flex-1 min-w-[300px] lg:min-w-[350px] max-w-full"
              >
                {/* Accent line */}
                <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${event.cat === 'security' || event.cat === 'ai' ? 'from-[var(--magenta-hot)] to-[var(--magenta-core)]' : 'from-[var(--cyan-accent)] to-[var(--cyan-electric)]'} opacity-50 group-hover:opacity-100 transition-opacity`} />
                
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 shrink-0 rounded-sm flex items-center justify-center text-lg font-bold bg-[var(--dark-surface)] border border-[var(--border-subtle)] ${event.cat === 'security' || event.cat === 'ai' ? 'text-[var(--magenta-hot)]' : 'text-[var(--cyan-accent)]'} group-hover:scale-110 transition-transform`}>
                    {event.icon}
                  </div>
                  <span className={`px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest rounded-sm ${event.mode === 'online' ? 'bg-[#00f3ff]/10 text-[#00f3ff]' : 'bg-[#ff00c1]/10 text-[#ff00c1]'}`}>
                    {event.mode}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[var(--cyan-accent)] transition-colors line-clamp-1">
                  {event.name}
                </h3>
                
                <div className="text-xs text-gray-500 font-medium mb-4 flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-500" />
                  <span>{event.eligibility}</span>
                </div>

                <p className="text-sm text-gray-400 line-clamp-3 mb-6 flex-grow group-hover:text-gray-300 transition-colors">
                  {event.desc}
                </p>

                <div className="mt-auto flex items-center text-[var(--cyan-accent)] text-xs font-bold tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 duration-300">
                  <span>[ ACCESS_DATA ]</span>
                  <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredEvents.length === 0 && (
          <div className="py-20 text-center border border-dashed border-[var(--border-subtle)]">
            <p className="text-gray-500 font-mono">NO_MODULES_FOUND_FOR_CURRENT_FILTER</p>
          </div>
        )}

      </div>

      <EventModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />
    </section>
  );
}
