"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import CustomCursor from "@/components/CustomCursor";
import Navigation from "@/components/Navigation";
import WebGLBackground from "@/components/WebGLBackground";
import HeroSection from "@/components/HeroSection";
import EventModules from "@/components/EventModules";
import AdditionalSections from "@/components/AdditionalSections";
import LoadingScreen from "@/components/LoadingScreen";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      {!isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <CustomCursor />
          <Navigation />
          <WebGLBackground />
          
          <main className="relative z-10 w-full flex flex-col">
            <HeroSection />
            <EventModules />
            <AdditionalSections />
          </main>

          <footer className="relative z-10 border-t border-[var(--border-subtle)] bg-[var(--dark-surface)] py-8 text-center text-sm text-gray-500">
            <p>© 2026 CRYPTS'26. ALL SYSTEMS OPERATIONAL.</p>
            <p className="mt-2 text-[var(--cyan-accent)]">OPG WORLD SCHOOL</p>
          </footer>
        </motion.div>
      )}
    </>
  );
}
