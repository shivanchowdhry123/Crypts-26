"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { EVENTS_DATA } from "@/data/events";
import CustomCursor from "@/components/CustomCursor";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    class: "",
    section: "",
    events: [] as string[]
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const eventsList = Object.values(EVENTS_DATA).sort((a, b) => a.name.localeCompare(b.name));

  const toggleEvent = (eventName: string, minClass: number, maxClass: number) => {
    const selectedClass = parseInt(formData.class);
    
    if (selectedClass) {
      if (selectedClass < minClass || selectedClass > maxClass) {
        setErrorMessage(`Class ${selectedClass} is not eligible for ${eventName}. Eligibility: Class ${minClass}-${maxClass}.`);
        setTimeout(() => setErrorMessage(""), 4000);
        return;
      }
    }

    setFormData(prev => ({
      ...prev,
      events: prev.events.includes(eventName) 
        ? prev.events.filter(e => e !== eventName)
        : [...prev.events, eventName]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.events.length === 0) {
      setErrorMessage("⚠ Select at least one event module.");
      return;
    }
    
    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to transmit enrollment");
      }

      setStatus("success");
    } catch (err: any) {
      setStatus("error");
      setErrorMessage(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--dark-void)] text-white relative overflow-hidden flex flex-col font-mono">
      <CustomCursor />
      
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-20">
        <div className="absolute top-[20%] left-[10%] w-96 h-96 bg-[var(--cyan-glow)] rounded-full blur-[100px]" />
        <div className="absolute bottom-[20%] right-[10%] w-96 h-96 bg-[var(--magenta-hot)] rounded-full blur-[100px]" />
      </div>
      
      {/* Navbar */}
      <nav className="relative z-50 border-b border-[var(--border-subtle)] bg-black/50 backdrop-blur-md">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center group">
            <span className="text-[var(--cyan-accent)] font-bold tracking-widest text-lg md:text-xl group-hover:text-white transition-colors">
              CRYPTS_<span className="text-[var(--magenta-hot)]">'26</span>
            </span>
          </Link>
          <div className="flex items-center space-x-6">
            <span className="hidden md:inline-block text-[9px] tracking-[0.2em] text-[var(--cyan-accent)] opacity-70 animate-pulse">NODE_STATUS: ONLINE</span>
            <Link href="/" className="text-gray-400 hover:text-[var(--cyan-accent)] text-xs md:text-sm flex items-center transition-colors">
              <span className="mr-2">←</span> MAIN_TERMINAL
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center relative z-10 px-4 py-12">
        <div className="w-full max-w-2xl bg-[var(--card-bg)] border border-[var(--border-subtle)] p-8 md:p-12 relative">
          
          <div className="mb-8 border-b border-[var(--border-subtle)] pb-6 flex justify-between items-end">
            <div>
              <span className="text-xs text-[var(--cyan-accent)] tracking-widest uppercase">// REGISTRATION_PROTOCOL</span>
              <h1 className="text-2xl md:text-4xl font-black mt-2 tracking-tighter text-white">03_ENROLLMENT<span className="text-[var(--magenta-hot)]">_PORTAL</span></h1>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {status === "success" ? (
              <motion.div 
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12 space-y-8"
              >
                <div className="w-20 h-20 bg-[var(--cyan-dim)] border-2 border-[var(--cyan-accent)] rounded-full flex items-center justify-center mx-auto text-3xl shadow-[0_0_30px_var(--cyan-glow)] text-[var(--cyan-accent)]">
                  ✓
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-[var(--cyan-accent)] uppercase tracking-wide">TRANSMISSION CONFIRMED</h3>
                  <p className="text-gray-400 text-sm mt-3 max-w-md mx-auto">Your enrollment payload has been successfully verified. A confirmation email has been dispatched to {formData.email}.</p>
                </div>
                <div className="p-5 bg-black/50 border border-[var(--border-subtle)] text-[11px] font-mono text-left max-w-sm mx-auto space-y-2 rounded">
                  <div className="text-[var(--magenta-hot)] font-bold border-b border-[var(--border-subtle)] pb-2 mb-3">// TICKET_SUMMARY</div>
                  <div><span className="text-gray-500 w-24 inline-block">STATUS:</span> <span className="text-green-400">CONFIRMED</span></div>
                  <div><span className="text-gray-500 w-24 inline-block">OPERATOR:</span> <span className="text-white">{formData.name}</span></div>
                  <div><span className="text-gray-500 w-24 inline-block">CLASS/SEC:</span> <span className="text-white">{formData.class} - {formData.section}</span></div>
                  <div><span className="text-gray-500 w-24 inline-block">MODULES:</span> <span className="text-[var(--cyan-accent)]">{formData.events.length} Selected</span></div>
                </div>
                <Link href="/" className="inline-block bg-[var(--cyan-accent)] text-black font-bold px-10 py-4 uppercase tracking-widest text-xs hover:shadow-[0_0_20px_var(--cyan-glow)] transition-all">
                  RETURN TO TERMINAL →
                </Link>
              </motion.div>
            ) : (
              <motion.form 
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onSubmit={handleSubmit} 
                className="space-y-6"
              >

                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Email Address <span className="text-[var(--magenta-hot)]">*</span></label>
                  <input 
                    type="email" 
                    required 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="operator@domain.edu" 
                    className="w-full bg-black/50 border border-[var(--border-subtle)] focus:border-[var(--cyan-accent)] outline-none px-4 py-3 text-white transition-colors placeholder:text-gray-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Full Name / Group Names <span className="text-[var(--magenta-hot)]">*</span></label>
                  <input 
                    type="text" 
                    required 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="John Doe, Jane Doe..." 
                    className="w-full bg-black/50 border border-[var(--border-subtle)] focus:border-[var(--cyan-accent)] outline-none px-4 py-3 text-white transition-colors placeholder:text-gray-600"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Class <span className="text-[var(--magenta-hot)]">*</span></label>
                    <select 
                      required 
                      value={formData.class}
                      onChange={(e) => setFormData({...formData, class: e.target.value})}
                      className="w-full bg-black/50 border border-[var(--border-subtle)] focus:border-[var(--cyan-accent)] outline-none px-4 py-3 text-white transition-colors appearance-none"
                    >
                      <option value="" disabled>Select Class</option>
                      {[4,5,6,7,8,9,10,11,12].map(c => <option key={c} value={c}>Class {c}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Section <span className="text-[var(--magenta-hot)]">*</span></label>
                    <input 
                      type="text" 
                      required 
                      value={formData.section}
                      onChange={(e) => setFormData({...formData, section: e.target.value})}
                      placeholder="e.g. A" 
                      className="w-full bg-black/50 border border-[var(--border-subtle)] focus:border-[var(--cyan-accent)] outline-none px-4 py-3 text-white transition-colors placeholder:text-gray-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
                    Select Event Modules <span className="text-gray-600 font-normal">(Filtered by class)</span> <span className="text-[var(--magenta-hot)]">*</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {eventsList.map(event => {
                      const isSelected = formData.events.includes(event.name);
                      return (
                        <button
                          type="button"
                          key={event.id}
                          onClick={() => toggleEvent(event.name, event.classRange[0], event.classRange[1])}
                          className={`px-3 py-2 text-[10px] font-bold tracking-widest uppercase transition-all duration-300 border ${
                            isSelected
                              ? "bg-[var(--cyan-dim)] border-[var(--cyan-accent)] text-[var(--cyan-accent)] shadow-[0_0_10px_var(--cyan-glow)]"
                              : "bg-[var(--dark-surface)] border-[var(--border-subtle)] text-gray-500 hover:border-gray-500 hover:text-white"
                          }`}
                        >
                          {event.name}
                        </button>
                      );
                    })}
                  </div>
                  
                  <div className="mt-4 p-3 bg-[var(--cyan-dim)] border border-[var(--cyan-accent)]/20 rounded text-[10px] text-gray-400 flex items-start gap-3">
                    <span className="text-[var(--cyan-accent)] text-lg leading-none">ℹ</span>
                    <div>
                      <span className="text-[var(--cyan-accent)] font-bold block mb-1">NOTE FOR IHE EVENTS:</span> 
                      In case you wish to participate in Inter-House Events (IHE), kindly contact your respective House Wardens.
                    </div>
                  </div>
                </div>

                {errorMessage && (
                  <div className="mt-6 p-4 bg-red-500/10 border border-red-500/50 text-red-400 text-xs font-bold tracking-wider rounded flex items-start gap-3">
                    <span className="text-xl leading-none">⚠</span>
                    <span>{errorMessage}</span>
                  </div>
                )}

                <button 
                  type="submit" 
                  disabled={status === "loading"}
                  className="w-full mt-4 bg-[var(--magenta-hot)] text-white hover:bg-[var(--magenta-core)] px-8 py-4 font-bold tracking-widest uppercase transition-colors shadow-[0_0_20px_rgba(255,0,127,0.3)] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === "loading" ? "TRANSMITTING..." : "TRANSMIT ENROLLMENT"}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
