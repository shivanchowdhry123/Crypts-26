export type EventData = {
    id: string;
    name: string;
    icon: string;
    cat: string;
    mode: "online" | "offline";
    eligibility: string;
    date: string;
    classRange: [number, number];
    desc: string;
    rules: string[];
    criteria: string[];
    contact: string;
};

export const EVENTS_DATA: Record<string, EventData> = {
    glitchverse: {
        id: "glitchverse",
        name: "Glitchverse",
        icon: "GV",
        cat: "security",
        mode: "offline",
        eligibility: "Class 6–10",
        date: "September 17, 2026",
        classRange: [6, 10],
        desc: "Decode ciphers, crack enigmatic puzzles, and navigate multi-layered cryptographic challenges in this offline decryption arena.",
        rules: ["Teams of 2 participants", "Multiple rounds of increasing difficulty", "No external devices or internet access", "Time-limited per round"],
        criteria: ["Accuracy of solutions", "Speed of completion", "Logical approach and methodology"],
        contact: "Event In-Charge (see brochure)"
    },
    pixelpulse: {
        id: "pixelpulse",
        name: "PixelPulse",
        icon: "PP",
        cat: "design",
        mode: "online",
        eligibility: "Class 8–12",
        date: "September 25, 2026",
        classRange: [8, 12],
        desc: "Digital poster design competition judged on creativity, visual communication, and technical mastery of design tools.",
        rules: ["Individual participation", "Topic revealed on event day", "Original work only — no templates", "Submit within deadline"],
        criteria: ["Creativity and originality", "Visual communication", "Technical skill and tool mastery", "Relevance to theme"],
        contact: "Event In-Charge (see brochure)"
    },
    byte_the_site: {
        id: "byte_the_site",
        name: "Byte the Site",
        icon: "BTS",
        cat: "coding",
        mode: "online",
        eligibility: "Class 6–12",
        date: "September 25, 2026",
        classRange: [6, 12],
        desc: "Frontend web development challenge — build responsive, visually stunning websites under time constraints using HTML, CSS & JS.",
        rules: ["Individual or team of 2", "HTML, CSS, and JavaScript only", "No frameworks or libraries", "Submit via provided link"],
        criteria: ["Design aesthetics and UI/UX", "Responsiveness", "Code quality and structure", "Creativity"],
        contact: "Event In-Charge (see brochure)"
    },
    scratch_xplorers: {
        id: "scratch_xplorers",
        name: "Scratch Xplorers",
        icon: "SX",
        cat: "coding",
        mode: "offline",
        eligibility: "Class 4–6",
        date: "September 18, 2026",
        classRange: [4, 6],
        desc: "Block-based programming challenge for junior coders — build interactive projects, games, and animations using Scratch.",
        rules: ["Individual participation", "Scratch platform only", "Project built from scratch during event", "Time limit: 90 minutes"],
        criteria: ["Creativity of project", "Use of Scratch features", "Interactivity", "Presentation"],
        contact: "Event In-Charge (see brochure)"
    },
    ihe_cineprism: {
        id: "ihe_cineprism",
        name: "IHE CinePrism",
        icon: "CP",
        cat: "av",
        mode: "online",
        eligibility: "Class 6–12",
        date: "September 25, 2026",
        classRange: [6, 12],
        desc: "Short film and video production competition — narrative structure, cinematography, pacing, and post-production judged.",
        rules: ["Team of up to 4 members", "Maximum duration: 5 minutes", "Original content only", "Submit before deadline"],
        criteria: ["Narrative and storytelling", "Cinematography and framing", "Editing and post-production", "Audio quality and sound design"],
        contact: "Event In-Charge (see brochure)"
    },
    prompt_paradox: {
        id: "prompt_paradox",
        name: "Prompt Paradox",
        icon: "PX",
        cat: "ai",
        mode: "offline",
        eligibility: "Class 8–12",
        date: "September 21, 2026",
        classRange: [8, 12],
        desc: "AI prompt engineering challenge — craft precise, creative prompts to generate outputs matching specific goals and constraints.",
        rules: ["Individual participation", "Multiple rounds", "AI tools provided on-site", "No pre-prepared prompts"],
        criteria: ["Prompt precision and clarity", "Output quality and relevance", "Creative problem-solving", "Efficiency of approach"],
        contact: "Event In-Charge (see brochure)"
    },
    qwerty_4: {
        id: "qwerty_4",
        name: "QWERTY 4.0",
        icon: "QW",
        cat: "coding",
        mode: "offline",
        eligibility: "Class 6–12",
        date: "September 22, 2026",
        classRange: [6, 12],
        desc: "Speed typing tournament — accuracy, WPM, and consistency under pressure. Keyboard warriors, assemble.",
        rules: ["Individual participation", "Standard QWERTY keyboard", "Multiple timed rounds", "No auto-correct or predictive text"],
        criteria: ["Words per minute (WPM)", "Accuracy percentage", "Consistency across rounds"],
        contact: "Event In-Charge (see brochure)"
    },
    jailbreak: {
        id: "jailbreak",
        name: "Jailbreak",
        icon: "JB",
        cat: "security",
        mode: "offline",
        eligibility: "Class 6–12",
        date: "September 23, 2026",
        classRange: [6, 12],
        desc: "Escape room meets tech — solve interconnected logic puzzles, decode sequences, and break free before the timer runs out.",
        rules: ["Teams of 3–4 members", "Time limit per room", "No external devices", "Hints available with penalty"],
        criteria: ["Puzzles solved correctly", "Time taken", "Teamwork and coordination"],
        contact: "Event In-Charge (see brochure)"
    },
    ihe_codequest: {
        id: "ihe_codequest",
        name: "IHE CodeQuest",
        icon: "CQ",
        cat: "coding",
        mode: "offline",
        eligibility: "Class 11–12",
        date: "September 28, 2026",
        classRange: [11, 12],
        desc: "Competitive programming — algorithmic complexity and optimization under clock pressure. Solve. Optimize. Execute.",
        rules: ["Individual participation", "C++, Python, or Java", "Multiple problems of varying difficulty", "Standard competitive programming format"],
        criteria: ["Problems solved correctly", "Time and space efficiency", "Partial scores for sub-tasks"],
        contact: "Event In-Charge (see brochure)"
    },
    ihe_kernel: {
        id: "ihe_kernel",
        name: "IHE Kernel",
        icon: "KR",
        cat: "coding",
        mode: "offline",
        eligibility: "Class 9–12",
        date: "September 24, 2026",
        classRange: [9, 12],
        desc: "Inter-house hardware and systems challenge — circuit design, component identification, and technical diagnostics.",
        rules: ["Inter-house teams", "Multiple rounds: theory + practical", "Components and tools provided", "No external resources"],
        criteria: ["Technical accuracy", "Speed of completion", "Understanding of concepts"],
        contact: "Event In-Charge (see brochure)"
    },
    game_makers: {
        id: "game_makers",
        name: "Game Makers",
        icon: "GM",
        cat: "gaming",
        mode: "offline",
        eligibility: "Class 10–12",
        date: "September 25, 2026",
        classRange: [10, 12],
        desc: "Game development from scratch — design, build, and present playable games judged on mechanics, creativity, and polish.",
        rules: ["Teams of 2–3 members", "Any game engine or platform", "Game must be playable at submission", "Time limit: 4 hours"],
        criteria: ["Gameplay mechanics", "Creativity and originality", "Visual and audio polish", "Presentation"],
        contact: "Event In-Charge (see brochure)"
    },
    larene_esports: {
        id: "larene_esports",
        name: "L'Arène Esports",
        icon: "ES",
        cat: "gaming",
        mode: "online",
        eligibility: "Class 10–12",
        date: "FC 26: Sept 19 | Valorant: Sept 20 | Minecraft: Sept 26",
        classRange: [10, 12],
        desc: "Multi-title esports tournament — FC 26, Valorant, and Minecraft. Strategy, reflexes, and teamwork across elimination rounds.",
        rules: ["Team-based (size varies by title)", "Online matches via designated platform", "Single elimination format", "Match schedules shared in advance"],
        criteria: ["Match wins", "Sportsmanship", "Team coordination"],
        contact: "Event In-Charge (see brochure)"
    },
    biztech_nexus: {
        id: "biztech_nexus",
        name: "BizTech Nexus",
        icon: "BN",
        cat: "biz",
        mode: "offline",
        eligibility: "Class 10–12",
        date: "September 30, 2026",
        classRange: [10, 12],
        desc: "Business-tech fusion — ideation, pitch decks, market analysis, and startup prototyping for the next-gen entrepreneur.",
        rules: ["Teams of 2–4 members", "Pitch deck + live presentation", "Time limit: 10 minutes + Q&A", "Original business idea required"],
        criteria: ["Innovation and feasibility", "Market understanding", "Presentation quality", "Technical integration"],
        contact: "Event In-Charge (see brochure)"
    }
};
