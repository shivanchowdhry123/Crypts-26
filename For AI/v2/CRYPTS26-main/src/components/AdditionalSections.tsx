"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function AdditionalSections() {
  const [activeTab, setActiveTab] = useState("week1");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const WEEK_1 = [
    { date: "17th September", name: "Glitchverse", desc: "Decode ciphers, crack enigmatic puzzles, and navigate multi-layered cryptographic challenges in this offline decryption arena." },
    { date: "18th September", name: "Scratch Xplorers", desc: "Block-based programming challenge for junior coders — build interactive projects, games, and animations using Scratch." },
    { date: "19th September", name: "L'Arène Esports — FC 26 Prelims", desc: "EA Sports FC 26 bracket kickoff — tactical precision and knockout fixtures in the online gaming arena." },
    { date: "20th September", name: "L'Arène Esports — Valorant Tactical", desc: "5v5 tactical shooter showdown — team coordination, site executes, and high-stakes elimination matches." },
  ];

  const WEEK_2 = [
    { date: "21st September", name: "Prompt Paradox", desc: "AI prompt engineering challenge — craft precise, creative prompts to generate outputs matching specific goals and constraints." },
    { date: "22nd September", name: "QWERTY 4.0", desc: "Speed typing tournament — accuracy, WPM, and consistency under pressure. Keyboard warriors, assemble." },
    { date: "23rd September", name: "Jailbreak", desc: "Escape room meets tech — solve interconnected logic puzzles, decode sequences, and break free before the timer runs out." },
    { date: "24th September", name: "IHE Kernel", desc: "Inter-house hardware and systems challenge — circuit design, component identification, and technical diagnostics." },
    { date: "25th September", name: "PixelPulse", desc: "Digital poster design competition judged on creativity, visual communication, and technical mastery of design tools." },
    { date: "25th September", name: "Byte the Site", desc: "Frontend web development challenge — build responsive, visually stunning websites under time constraints using HTML, CSS & JS." },
    { date: "25th September", name: "IHE CinePrism", desc: "Short film and video production competition — narrative structure, cinematography, pacing, and post-production judged." },
    { date: "25th September", name: "Game Makers", desc: "Game development from scratch — design, build, and present playable games judged on mechanics, creativity, and polish." },
    { date: "26th September", name: "L'Arène Esports — Minecraft & Finals", desc: "Minecraft build-off and multi-title esports championship finals — crowning the supreme gaming champions." },
  ];

  const WEEK_3 = [
    { date: "28th September", name: "IHE CodeQuest", desc: "Competitive programming — algorithmic complexity and optimization under clock pressure. Solve. Optimize. Execute." },
    { date: "30th September", name: "BizTech Nexus", desc: "Business-tech fusion — ideation, pitch decks, market analysis, and startup prototyping for the next-gen entrepreneur." },
    { date: "30th September", name: "Grand Deliberation & Awards Ceremony", desc: "Official judging aggregation, merit recognition, trophy felicitations, and the CRYPTS'26 closing ceremony." },
  ];

  const FAQS = [
    { q: "Who can participate in CRYPTS'26?", a: "CRYPTS'26 is open to all students of OPG World School from Classes 4 through 12. Different events have specific class compatibility ranges — check each event card for eligibility details." },
    { q: "Can I register for multiple events?", a: "Yes — you can select multiple events during registration using the tag chip selector. However, ensure that selected events do not have conflicting time slots in the schedule before enrolling." },
    { q: "Is registration free?", a: "Registration for CRYPTS'26 is completely free for all OPG World School students. Simply fill out the enrollment form on this site and await your confirmation email." },
    { q: "How will I know if my registration was successful?", a: "Upon successful submission, you will receive a confirmation email at the address provided during registration. You can also check the terminal output on this site immediately after submitting for confirmation." },
    { q: "Are the events individual or team-based?", a: "Most events in CRYPTS'26 are individually registered — however, certain events like CIRCUIT_BREAKER may allow team participation. Refer to the Event Rulebook in the Resource Matrix for specific team size allowances per event." },
    { q: "What should I bring on the day of the fest?", a: "Bring your school ID card and a printed or digital copy of your registration confirmation. Additional materials vary by event — consult the Participant Guide in the Resource Matrix section for event-specific requirements." },
    { q: "Will there be prizes?", a: "No Cash prizes or trophies as of now. Only certificates, no special award either" },
    { q: "Who do I contact for queries?", a: "Reach out to the organizing team directly through your class teacher or the CRYPTS organizing committee. You can also use the `help` command in the terminal above — type `about` for contact information." },
  ];

  const OPERATORS = [
    { name: "Eeshaan Chhabra", cls: "CLASS XII-A", email: "eeshaan.cryptsopg@gmail.com" },
    { name: "Bhavya Sachdeva", cls: "CLASS XII-B", email: "bhavyas.cryptsopg@gmail.com" },
    { name: "Aaryan Yadav", cls: "CLASS XII-A", email: "aaryan.cryptsopg@gmail.com" },
    { name: "Bhavya Tuli", cls: "CLASS XII-A", email: "bhavya.cryptsopg@gmail.com" },
    { name: "Saksham Khatri", cls: "CLASS XII-B", email: "sakshamvinaykhatri.cryptsopg@gmail.com" },
    { name: "Anshika Yadav", cls: "CLASS XI-D", email: "anshika.cryptsopg@gmail.com" },
    { name: "Prakriti Chaturvedi", cls: "CLASS XI-B", email: "prakriti.cryptsopg@gmail.com" },
    { name: "Rishit Jain", cls: "CLASS XI-B", email: "rishit.cryptsopg@gmail.com" },
    { name: "Saumya Tyagi", cls: "CLASS XI-A", email: "saumya.cryptsopg@gmail.com" },
    { name: "Shivan Chowdhry", cls: "CLASS XI-C", email: "shivan.cryptsopg@gmail.com" },
    { name: "Somansh Kumar", cls: "CLASS XI-B", email: "somansh.cryptsopg@gmail.com" },
    { name: "Yajas Yashasvi", cls: "CLASS XI-B", email: "yajas.cryptsopg@gmail.com" },
  ];

  return (
    <>
      {/* 03_ENROLLMENT_PORTAL */}
      <section id="enrollment" className="py-24 px-6 border-t border-[var(--border-subtle)] bg-[var(--dark-void)]">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <span className="text-[var(--cyan-accent)] text-xs font-mono uppercase tracking-widest">// REGISTRATION_PROTOCOL</span>
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-[var(--cyan-accent)] drop-shadow-[0_0_10px_var(--cyan-glow)]">03_ENROLLMENT_PORTAL</h2>
          </div>

          <div className="mt-4 p-10 md:p-14 text-center relative overflow-hidden bg-[var(--dark-surface)] border border-[var(--border-subtle)] rounded-sm">
            <div className="inline-block text-[9px] tracking-[0.3em] text-[var(--cyan-accent)] border border-[var(--cyan-accent)] bg-[#00f3ff]/10 px-4 py-1.5 rounded uppercase mb-6 font-bold">
              STANDALONE TRANSMISSION NODE
            </div>
            
            <h3 className="text-3xl font-bold tracking-tight text-white uppercase mb-4">
              Ready to Enter the Singularity?
            </h3>
            
            <p className="text-gray-400 text-sm max-w-xl mx-auto leading-relaxed mb-8">
              Official registration for all 12+ competitive missions is hosted on a dedicated, encrypted portal. Select your modules and claim your operator status.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/register" className="bg-[var(--magenta-hot)] text-white hover:bg-[var(--magenta-core)] px-10 py-4 inline-flex items-center justify-center font-bold tracking-widest uppercase transition-colors shadow-[0_0_30px_rgba(255,0,127,0.4)]">
                INITIALIZE REGISTRATION →
              </Link>
            </div>

            <div className="mt-8 pt-6 border-t border-[var(--border-subtle)] flex flex-wrap justify-center items-center gap-6 text-[10px] text-gray-500 uppercase tracking-widest font-mono">
              <span>⚡ 256-BIT ENCRYPTION</span>
              <span>•</span>
              <span>🔒 SECURE FORM</span>
              <span>•</span>
              <span>📧 INSTANT EMAIL RECEIPT</span>
            </div>
          </div>
        </div>
      </section>

      {/* 04_RESOURCE_MATRIX */}
      <section id="matrix" className="py-24 px-6 border-t border-[var(--border-subtle)] bg-[var(--dark-surface)]">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <span className="text-[var(--cyan-accent)] text-xs font-mono uppercase tracking-widest">// KNOWLEDGE_DATABASE</span>
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-[var(--cyan-accent)] drop-shadow-[0_0_10px_var(--cyan-glow)]">04_RESOURCE_MATRIX</h2>
            <p className="text-xs text-gray-500 tracking-wider mt-2 font-mono">// OFFICIAL TECHFEST BROCHURE & COMPREHENSIVE EVENT DOSSIER</p>
          </div>

          <div className="relative overflow-hidden mt-6 border border-[var(--border-subtle)] bg-black/40 rounded-sm">
            {/* HUD Top Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-3.5 border-b border-[var(--border-subtle)] bg-white/5">
              <div className="flex items-center gap-3">
                <span className="inline-block w-2 h-2 rounded-full bg-[var(--cyan-accent)] animate-pulse"></span>
                <span className="text-[11px] font-mono tracking-widest text-[var(--cyan-accent)] font-bold">CRYPTS_26_BROCHURE.pdf</span>
                <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-white/5 border border-[var(--border-subtle)] text-gray-400 uppercase">LOCAL SECURE VIEWER</span>
              </div>
              <div className="flex items-center gap-2">
                <a href="/crypts-5-brochure.pdf" download className="text-xs text-[var(--cyan-accent)] hover:text-white transition-colors flex items-center gap-1">
                  <span>↓ DOWNLOAD SECURE COPY</span>
                </a>
              </div>
            </div>

            {/* PDF Viewer Container */}
            <div className="relative w-full py-20 flex flex-col items-center justify-center border-t border-[var(--border-subtle)] bg-black/40">
                <div className="text-center text-gray-400">
                  <p className="mb-4">PDF preview disabled for performance.</p>
                  <a href="/crypts-5-brochure.pdf" className="text-[var(--cyan-accent)] hover:underline">Click here to download it directly.</a>
                </div>
            </div>

            {/* HUD Bottom Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-3 border-t border-[var(--border-subtle)] bg-black/40 text-[10px] text-gray-500 font-mono">
              <div className="flex items-center gap-3">
                <span>⚡ TRANSMISSION: ACTIVE</span>
                <span>•</span>
                <span>CRYPTS'26 OFFICIAL RESOURCE</span>
              </div>
              <div>
                <span className="text-[var(--cyan-accent)]/70">USE CONTROLS INSIDE VIEWER TO FLIP PAGES & TOGGLE FULLSCREEN</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 05_CHRONOS_SCHEDULE */}
      <section id="chronos" className="py-24 px-6 border-t border-[var(--border-subtle)] bg-[var(--dark-void)]">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <span className="text-[var(--cyan-accent)] text-xs font-mono uppercase tracking-widest">// TEMPORAL_SEQUENCE</span>
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-[var(--cyan-accent)] drop-shadow-[0_0_10px_var(--cyan-glow)]">05_CHRONOS_SCHEDULE</h2>
          </div>

          {/* Timeline Tabs */}
          <div className="flex space-x-2 md:space-x-4 mb-8 border-b border-[var(--border-subtle)]">
            {[
              { id: "week1", label: "WEEK - 1" },
              { id: "week2", label: "WEEK - 2" },
              { id: "week3", label: "WEEK - 3" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`pb-3 px-4 text-sm font-bold tracking-widest uppercase transition-colors ${
                  activeTab === tab.id
                    ? "text-[var(--cyan-accent)] border-b-2 border-[var(--cyan-accent)]"
                    : "text-gray-500 hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Timeline Panel */}
          <div className="relative pl-6 md:pl-10 border-l border-[var(--border-subtle)] space-y-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-8"
              >
                {(activeTab === "week1" ? WEEK_1 : activeTab === "week2" ? WEEK_2 : WEEK_3).map((item, i) => (
                  <div key={i} className="relative group">
                    <div className="absolute -left-[35px] md:-left-[49px] top-1 w-3 h-3 rounded-full bg-[var(--dark-surface)] border-2 border-[var(--cyan-accent)] group-hover:bg-[var(--cyan-accent)] group-hover:shadow-[0_0_10px_var(--cyan-glow)] transition-all"></div>
                    <div className="text-[var(--cyan-accent)] text-xs font-mono mb-1">{item.date}</div>
                    <div className="text-xl font-bold text-white mb-2">{item.name}</div>
                    <div className="text-sm text-gray-400 leading-relaxed max-w-2xl">{item.desc}</div>
                    <span className="inline-block mt-3 text-[9px] font-bold tracking-widest uppercase text-[var(--magenta-hot)] bg-[#ff007f]/10 px-2 py-1 rounded-sm border border-[#ff007f]/30">UPCOMING</span>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* 06_QUERY_RESOLUTION */}
      <section id="resolution" className="py-24 px-6 border-t border-[var(--border-subtle)] bg-[var(--dark-surface)]">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12">
            <span className="text-[var(--cyan-accent)] text-xs font-mono uppercase tracking-widest">// QUERY_RESOLUTION</span>
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-[var(--cyan-accent)] drop-shadow-[0_0_10px_var(--cyan-glow)]">06_QUERY_RESOLUTION</h2>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, i) => (
              <div key={i} className="border border-[var(--border-subtle)] bg-[var(--card-bg)]">
                <button
                  onClick={() => toggleFaq(i)}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-white/5 transition-colors focus:outline-none"
                >
                  <span className="font-bold text-white md:text-lg pr-8">{faq.q}</span>
                  <span className={`text-[var(--cyan-accent)] font-mono text-xl transform transition-transform duration-300 ${openFaq === i ? "rotate-180" : ""}`}>
                    ▾
                  </span>
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="p-5 pt-0 text-gray-400 text-sm leading-relaxed border-t border-white/5 mt-2">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 07_CORE_OPERATORS */}
      <section id="operators" className="py-24 px-6 border-t border-[var(--border-subtle)] bg-[var(--dark-void)]">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <span className="text-[var(--cyan-accent)] text-xs font-mono uppercase tracking-widest">// OPERATOR_PROFILES</span>
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-[var(--cyan-accent)] drop-shadow-[0_0_10px_var(--cyan-glow)]">07_CORE_OPERATORS</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {OPERATORS.map((operator, i) => (
              <div key={i} className="group relative bg-[var(--card-bg)] border border-[var(--border-subtle)] hover:border-[var(--magenta-hot)] p-6 flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_20px_var(--magenta-dim)]">
                <div className="w-16 h-16 rounded-full bg-[var(--dark-surface)] border border-[var(--border-subtle)] mb-4 flex items-center justify-center text-2xl group-hover:border-[var(--magenta-hot)] transition-colors">
                  👤
                </div>
                <h3 className="text-lg font-bold text-white mb-1 group-hover:text-[var(--magenta-hot)] transition-colors">{operator.name}</h3>
                <span className="text-[10px] font-mono tracking-widest text-gray-500 bg-white/5 px-2 py-1 rounded-sm mb-3 uppercase border border-white/10">{operator.cls}</span>
                <a href={`https://mail.google.com/mail/?view=cm&fs=1&to=${operator.email}`} target="_blank" rel="noopener noreferrer" className="text-xs text-[var(--cyan-accent)] hover:text-white transition-colors truncate w-full" title={operator.email}>
                  {operator.email}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
