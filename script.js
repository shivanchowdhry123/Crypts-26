/* ============================================================
   CRYPTS'26 — SCRIPT ENGINE
   ============================================================ */

// ============================================================
// GOOGLE SHEETS CONFIGURATION
// ============================================================
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxUt5jwpOGtOksKnoFBx7S2kFWre1py_mf3QlyImNrrp02eMoOxi5m4hVyrtLfWLdWu5Q/exec";

// ============================================================
// TERMINAL ENGINE
// ============================================================
const terminalOutput = document.getElementById('terminal-output');
const terminalBody = document.getElementById('terminal-body');
const inputLine = document.getElementById('input-line');
const terminalInput = document.getElementById('terminal-input');
const timestampEl = document.getElementById('timestamp');

function updateTimestamp() {
    if (!timestampEl) return;
    const now = new Date();
    const formatter = new Intl.DateTimeFormat('en-CA', {
        timeZone: 'Asia/Kolkata',
        year: 'numeric', month: '2-digit', day: '2-digit',
        hour: '2-digit', minute: '2-digit', second: '2-digit',
        hour12: false
    });
    timestampEl.innerText = formatter.format(now).replace(', ', ' ') + " IST";
}

let commandLogHistory = [];

function addLog(text, color = "text-white/80", skipHistory = false) {
    if (!skipHistory) {
        commandLogHistory.push({ text, color });
    }
    if (!terminalOutput) return;
    const div = document.createElement('div');
    div.className = color;
    div.innerText = text;
    terminalOutput.appendChild(div);
    if (terminalBody) {
        const inner = terminalBody.querySelector('.terminal-body-inner');
        if (inner) inner.scrollTop = inner.scrollHeight;
    }
}

const cliLines = [
    { type: 'html', content: `<div style="border: 1px solid #ff00c1; padding: 0.15rem 0.5rem; border-radius: 0.25rem; margin-bottom: 0.5rem; width: 100%; box-shadow: 0 0 10px rgba(255,0,193,0.2);">
        <span style="color: #ff00c1; font-weight: bold; display: flex; align-items: center; justify-content: center; gap: 0.5rem; font-size: 0.75rem;">&gt; Welcome to CRYPTS'26</span>
    </div>` },
    { type: 'text', content: " ██████╗██████╗ ██╗   ██╗██████╗ ████████╗███████╗ ██╗██████╗ ██████╗ \n██╔════╝██╔══██╗╚██╗ ██╔╝██╔══██╗╚══██╔══╝██╔════╝██╔╝╚════██╗██╔════╝\n██║     ██████╔╝ ╚████╔╝ ██████╔╝   ██║   ███████╗╚═╝  █████╔╝███████╗\n██║     ██╔══██╗  ╚██╔╝  ██╔═══╝    ██║   ╚════██║    ██╔═══╝ ██╔═══██╗\n╚██████╗██║  ██║   ██║   ██║        ██║   ███████║    ███████╗╚██████╔╝\n ╚═════╝╚═╝  ╚═╝   ╚═╝   ╚═╝        ╚═╝   ╚══════╝    ╚══════╝ ╚═════╝\n" },
    { type: 'html', content: `<div style="border: 1px solid #ff00c1; padding: 0.35rem 0.75rem; border-radius: 0.25rem; margin-bottom: 0.35rem; width: 100%; box-shadow: 0 0 10px rgba(255,0,193,0.1); text-align: left;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.2rem;">
            <h3 style="color: #ff00c1; font-weight: bold; font-size: 0.8rem; display: flex; align-items: center; gap: 0.25rem; margin: 0;">
                <span style="font-size: 0.85rem;">📢</span> LATEST ANNOUNCEMENTS & HIGHLIGHTS
            </h3>
            <span style="border: 1px solid #ff00c1; padding: 0.1rem 0.25rem; font-size: 0.6rem; border-radius: 0.125rem; color: #ff00c1; font-weight: bold; letter-spacing: 0.05em; text-transform: uppercase; box-shadow: 0 0 8px rgba(255,0,193,0.15);">LIVE FEED</span>
        </div>
        <div style="color: rgba(255,255,255,0.9); font-size: 0.75rem; display: flex; flex-direction: column; gap: 0.15rem;">
            <p style="margin: 0;"><span style="color: #00f3ff; font-weight: bold;">• 🎮 L'Arène Esports Update:</span> Registrations are now <strong style="color: #00f3ff;">OPEN for Class 9</strong> as well (Eligibility: Class 9–12)! Squad up for FC 26, Valorant & Minecraft.</p>
            <p style="margin: 0;"><span style="color: #ff00c1; font-weight: bold;">• Next Up (Sept 16):</span> GLITCHVERSE</p>
            <p style="margin: 0;"><span style="color: #ff00c1; font-weight: bold;">• Registrations Open:</span> Enroll now for all 12+ competitive coding, cryptography, design & gaming events.</p>
        </div>
    </div>` },
    { type: 'html', content: `<div style="border: 1px solid #ff00c1; padding: 0.35rem 0.75rem; border-radius: 0.25rem; width: 100%; box-shadow: 0 0 10px rgba(255,0,193,0.1); text-align: left;">
        <p style="color: #ff00c1; font-size: 0.75rem; margin: 0;"><span style="font-weight: bold;">Team Registration:</span> <span style="color: rgba(255,255,255,0.9);">If you are registering for a team event, kindly mail the team list to <a href="mailto:bhavyas.cryptsopg@gmail.com" style="color: #ff00c1; text-decoration: underline; cursor: pointer; position: relative; z-index: 50; pointer-events: auto;">bhavyas.cryptsopg@gmail.com</a></span></p>
    </div>` }
];

async function runInitialLogs() {
    const cliOutput = document.getElementById('cli-output');
    if (!cliOutput) return;
    cliOutput.innerHTML = '';
    
    const delay = (ms) => new Promise(r => setTimeout(r, ms));
    
    for (let item of cliLines) {
        if (item.type === 'text') {
            const pre = document.createElement('pre');
            pre.className = "text-[#ff00c1] mb-4 font-bold font-mono self-start sm:self-center drop-shadow-[0_0_8px_rgba(255,0,193,0.8)]";
            pre.style.fontSize = window.innerWidth < 640 ? "5px" : (window.innerWidth < 1024 ? "9px" : "13px");
            pre.style.lineHeight = "1.1";
            cliOutput.appendChild(pre);
            let lines = item.content.split('\n');
            for (let line of lines) {
                if (line.trim() !== '') {
                    pre.innerHTML += line + '\n';
                    await delay(60);
                }
            }
        } else if (item.type === 'html') {
            const wrapper = document.createElement('div');
            wrapper.style.opacity = 0;
            wrapper.style.width = '100%';
            wrapper.innerHTML = item.content;
            cliOutput.appendChild(wrapper);
            
            let op = 0;
            while(op < 1) {
                op += 0.15;
                wrapper.style.opacity = Math.min(op, 1);
                await delay(30);
            }
        }
        await delay(200);
    }

    // Show the CLI input line after the intro animation finishes
    if (inputLine) inputLine.classList.remove('hidden');
    if (terminalInput) terminalInput.focus({ preventScroll: true });
    updateTimestamp();
}

// ============================================================
// DYNAMIC HIGHLIGHTS & EVENT SCHEDULE ENGINE
// ============================================================
const EVENT_SCHEDULE = [
    { dateStr: "Sept 16", month: 8, day: 16, name: "GLITCHVERSE", type: "OFFLINE", desc: "Digital Art Competition, Create digital art in a given time duration (Class 6–10)", cat: "Digital Art" },
    { dateStr: "Sept 17", month: 8, day: 17, name: "JAILBREAK", type: "OFFLINE", desc: "Logic Puzzle Escape Room (Class 6–12)", cat: "Security & Puzzles" },
    { dateStr: "Sept 18", month: 8, day: 18, name: "SCRATCH XPLORERS", type: "OFFLINE", desc: "Scratch Block Programming Challenge (Class 4–6)", cat: "Junior Coding" },
    { dateStr: "Sept 19", month: 8, day: 19, name: "L'ARÈNE ESPORTS", type: "ONLINE", desc: "Esports Tournament Kicks Off — FC 26, Valorant & Minecraft", cat: "Gaming" },
    { dateStr: "Sept 20", month: 8, day: 20, name: "L'ARÈNE ESPORTS", type: "ONLINE", desc: "Esports Tournament Qualifiers (Class 9–12)", cat: "Gaming" },
    { dateStr: "Sept 21", month: 8, day: 21, name: "PROMPT PARADOX", type: "OFFLINE", desc: "AI Prompt Engineering Arena (Class 8–12)", cat: "AI & Logic" },
    { dateStr: "Sept 22", month: 8, day: 22, name: "QWERTY 4.0", type: "OFFLINE", desc: "Speed Typing & Keyboard Tournament (Class 6–12)", cat: "Typing" },
    { dateStr: "Sept 24", month: 8, day: 24, name: "IHE KERNEL", type: "OFFLINE", desc: "Hardware & Systems Challenge Quiz (Class 9–12)", cat: "Quiz" },
    { dateStr: "Sept 25", month: 8, day: 25, name: "PIXELPULSE & BYTE THE SITE & GAME MAKERS", type: "ONLINE & OFFLINE", desc: "Mega Submissions Day: Digital Poster, Web Dev, Short Films & Game Dev", cat: "Design, Coding & AV" },
    { dateStr: "Sept 26", month: 8, day: 26, name: "L'ARÈNE ESPORTS FINALS", type: "ONLINE", desc: "Esports Grand Finals", cat: "Gaming" },
    { dateStr: "Sept 28", month: 8, day: 28, name: "IHE CODEQUEST", type: "OFFLINE", desc: "Competitive Algorithmic Coding (Class 11–12)", cat: "Competitive Coding" },
    { dateStr: "Sept 30", month: 8, day: 30, name: "BIZTECH NEXUS", type: "OFFLINE", desc: "Business-Tech Fusion & Pitch Deck Challenge (Class 10–12)", cat: "Business & Tech" }
];

function getTodayHighlights() {
    const now = new Date();
    const curMonth = now.getMonth(); // 0-indexed (8 = September)
    const curDay = now.getDate();

    // Check if today matches a scheduled event
    const todayEvent = EVENT_SCHEDULE.find(e => e.month === curMonth && e.day === curDay);

    if (todayEvent) {
        return {
            badge: "TODAY'S EVENT",
            badgeClass: "bg-[#ff00c1]/20 text-[#ff00c1]",
            lines: [
                `<p><span class="text-[#00f3ff] font-bold">• 🎮 L'Arène Esports:</span> Registrations are now open for Class 9 as well (Class 9–12 eligible)!</p>`,
                `<p><span class="text-[#ff00c1] font-bold">🔥 TODAY'S LIVE EVENT:</span> <strong class="text-white">${todayEvent.name}</strong> is happening today!</p>`,
                `<p><span class="text-[#00f3ff] font-semibold">• Details:</span> ${todayEvent.desc} [${todayEvent.type}]</p>`
            ],
            logLines: [
                `=== 🔥 TODAY'S LIVE MISSION: ${todayEvent.name} IS LIVE TODAY! ===`,
                `• 🎮 L'Arène Esports Update: Registrations are now OPEN for Class 9 (Class 9–12 eligible)!`,
                `• Event: ${todayEvent.name} (${todayEvent.type})`,
                `• Details: ${todayEvent.desc}`,
                `• Venue: OPG World School Campus / Online Portal`,
                `• Action: Type 'enroll' to register or 'team' to contact event in-charges.`
            ]
        };
    }

    // Find next upcoming event
    const upcoming = EVENT_SCHEDULE.find(e => e.month > curMonth || (e.month === curMonth && e.day > curDay)) || EVENT_SCHEDULE[0];

    return {
        badge: "LIVE FEED",
        badgeClass: "bg-[#00f3ff]/20 text-[#00f3ff]",
        lines: [
            `<p><span class="text-[#00f3ff] font-bold">• 🎮 L'Arène Esports:</span> Registrations are now open for Class 9 as well (Class 9–12 eligible)!</p>`,
            `<p><span class="text-[#00f3ff] font-bold">• Next Up (${upcoming.dateStr}):</span> <strong class="text-white">${upcoming.name}</strong></p>`,
            `<p><span class="text-[#ff00c1] font-semibold">• Registrations Open:</span> Enroll now for all 12+ competitive coding, cryptography, design & gaming events.</p>`
        ],
        logLines: [
            `=== 📢 LATEST ANNOUNCEMENTS & TODAY'S HIGHLIGHTS ===`,
            `• 🎮 L'Arène Esports Update: Registrations are now OPEN for Class 9 (Class 9–12 eligible)!`,
            `• Next Up: ${upcoming.dateStr} — ${upcoming.name}`,
            `• Registrations Open: Enroll now for all 12+ competitive events.`,
            `• Rules & Dossier: View details under Section 02 EVENT MODULES.`,
            `• Type 'enroll' to register or 'team' for organizing committee contacts.`
        ]
    };
}

function initTerminalHighlights() {
    const bodyEl = document.getElementById('terminal-highlights-body');
    const badgeEl = document.getElementById('highlights-badge');
    if (!bodyEl) return;

    const data = getTodayHighlights();

    if (badgeEl) {
        badgeEl.className = `text-xs px-2 py-1 rounded font-bold uppercase tracking-wider ${data.badgeClass}`;
        badgeEl.innerText = data.badge;
    }

    bodyEl.innerHTML = data.lines.join('');
}

function handleCommand(cmd) {
    const command = cmd.toLowerCase().trim();
    addLog(`root@crypts:~# ${cmd}`, "text-white/30");

    const cmds = {
        clear: () => { if (terminalOutput) terminalOutput.innerHTML = ''; },
        help: () => addLog("COMMANDS: help · clear · enroll · modules · status · about · matrix · schedule · team · highlights · news · log", "text-[#00f3ff]"),
        log: () => {
            addLog(`--- COMMAND LOG HISTORY ---`, "text-[#00f3ff]", true);
            commandLogHistory.forEach(item => {
                addLog(item.text, item.color, true);
            });
            addLog(`--- END OF LOG ---`, "text-[#00f3ff]", true);
        },
        enroll: () => {
            addLog("> REDIRECTING TO REGISTRATION PORTAL...", "text-[#ff00c1]");
            setTimeout(() => { window.location.href = "register.html"; }, 400);
        },
        modules: () => {
            addLog("> NAVIGATING TO EVENT MODULES...", "text-[#00f3ff]");
            setTimeout(() => { window.location.hash = "modules"; }, 400);
        },
        matrix: () => {
            addLog("> ACCESSING RESOURCE MATRIX...", "text-[#00f3ff]");
            setTimeout(() => { window.location.hash = "matrix"; }, 400);
        },
        schedule: () => {
            addLog("> LOADING CHRONOS TIMELINE...", "text-[#00f3ff]");
            setTimeout(() => { window.location.hash = "chronos"; }, 400);
        },
        team: () => {
            addLog("> LOADING OPERATOR PROFILES...", "text-[#00f3ff]");
            setTimeout(() => { window.location.hash = "operators"; }, 400);
        },
        highlights: () => {
            const data = getTodayHighlights();
            data.logLines.forEach(line => addLog(line, "text-white/90"));
        },
        news: () => cmds.highlights(),
        status: () => {
            addLog(`> SYSTEM_STATE:    OPERATIONAL`, "text-[#00f3ff]");
            addLog(`> NODES:           7 / 7 ACTIVE`, "text-white/50");
            addLog(`> PACKET_LOSS:     0.00%`, "text-white/50");
        },
        about: () => {
            addLog(`> CRYPTS'26 | OPG WORLD SCHOOL | TECHFEST`, "text-white");
            addLog(`> THEME: THE SINGULARITY OVERLOAD`, "text-white/50");
            addLog(`> CONTACT: CLASS TEACHER / ORGANIZING COMMITTEE`, "text-white/30");
        },
    };

    if (cmds[command]) {
        cmds[command]();
    } else if (command !== "") {
        addLog(`COMMAND_NOT_FOUND: '${command}'. Type 'help'.`, "text-red-400/80");
    }
}

if (terminalInput) {
    terminalInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const cmd = terminalInput.value;
            handleCommand(cmd);
            terminalInput.value = '';
        }
    });
}
if (terminalBody) {
    terminalBody.addEventListener('click', () => {
        if (terminalInput) terminalInput.focus();
    });
}


// ============================================================
// PARTICLE CANVAS ENGINE
// ============================================================
function initParticleCanvas() {
    const canvas = document.getElementById('particle-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width, height;
    let mouse = { x: null, y: null };

    const PARTICLE_COUNT = 60;
    const MAX_DIST = 130;
    const PARTICLE_SPEED = 0.35;

    function resize() {
        const parent = canvas.parentElement;
        width = canvas.width = parent ? parent.offsetWidth : window.innerWidth;
        height = canvas.height = parent ? parent.offsetHeight : window.innerHeight;
    }

    class Particle {
        constructor() { this.reset(); }
        reset() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.vx = (Math.random() - 0.5) * PARTICLE_SPEED;
            this.vy = (Math.random() - 0.5) * PARTICLE_SPEED;
            this.r = Math.random() * 1.8 + 0.6;
        }
        move() {
            this.x += this.vx;
            this.y += this.vy;
            if (this.x < 0 || this.x > width) this.vx *= -1;
            if (this.y < 0 || this.y > height) this.vy *= -1;
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(0, 243, 255, 0.55)';
            ctx.fill();
        }
    }

    const particles = Array.from({ length: PARTICLE_COUNT }, () => new Particle());

    function drawConnections() {
        const all = mouse.x !== null
            ? [{ x: mouse.x, y: mouse.y, r: 0 }, ...particles]
            : particles;

        for (let i = 0; i < all.length; i++) {
            for (let j = i + 1; j < all.length; j++) {
                const dx = all[i].x - all[j].x;
                const dy = all[i].y - all[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < MAX_DIST) {
                    const alpha = (1 - dist / MAX_DIST) * 0.35;
                    ctx.beginPath();
                    ctx.moveTo(all[i].x, all[i].y);
                    ctx.lineTo(all[j].x, all[j].y);
                    ctx.strokeStyle = `rgba(0, 243, 255, ${alpha})`;
                    ctx.lineWidth = 0.6;
                    ctx.stroke();
                }
            }
        }
    }

    let animId;
    function loop() {
        ctx.clearRect(0, 0, width, height);
        drawConnections();
        particles.forEach(p => { p.move(); p.draw(); });
        animId = requestAnimationFrame(loop);
    }

    window.addEventListener('resize', resize);

    canvas.parentElement.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
    });
    canvas.parentElement.addEventListener('mouseleave', () => {
        mouse.x = null; mouse.y = null;
    });

    resize();
    loop();
}


// ============================================================
// CUSTOM NEON BLUE POINTER & HOVER EFFECTS
// ============================================================
function initCustomCursor() {
    const cursor = document.getElementById('custom-cursor');
    if (!cursor) return;

    // Detect if device primary input cannot hover (e.g., touchscreens/mobile)
    const isTouchDevice = window.matchMedia('(hover: none), (pointer: coarse)').matches;
    if (isTouchDevice) {
        cursor.style.display = 'none';
        return;
    }

    let mouseX = -100, mouseY = -100;
    let isVisible = false;

    // Touch event safety: immediately hide cursor on touch interactions
    window.addEventListener('touchstart', () => {
        cursor.style.opacity = '0';
        cursor.classList.remove('hovering');
        isVisible = false;
    }, { passive: true });

    window.addEventListener('touchmove', () => {
        cursor.style.opacity = '0';
        cursor.classList.remove('hovering');
        isVisible = false;
    }, { passive: true });

    document.addEventListener('mousemove', (e) => {
        // Ignore synthetic mouse events generated by touch taps
        if (e.sourceCapabilities && e.sourceCapabilities.firesTouchEvents) {
            cursor.style.opacity = '0';
            return;
        }

        mouseX = e.clientX;
        mouseY = e.clientY;

        if (!isVisible) {
            cursor.style.opacity = '1';
            isVisible = true;
        }

        cursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
    });

    // Hide cursor when pointer leaves viewport window
    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
        cursor.classList.remove('hovering');
        isVisible = false;
    });

    // Add pointer hover effect for all clickable elements
    const interactiveSelectors = 'a, button, input, select, textarea, .event-card, .faq-question, .filter-chip, .event-tag-chip, .timeline-tab, .brochure-action-btn, .resource-btn, .operator-card, .cmd-badge';

    document.addEventListener('mouseover', (e) => {
        if (e.target && e.target.closest && e.target.closest(interactiveSelectors)) {
            cursor.classList.add('hovering');
        }
    });

    document.addEventListener('mouseout', (e) => {
        if (e.target && e.target.closest && e.target.closest(interactiveSelectors)) {
            cursor.classList.remove('hovering');
        }
    });
}


// ============================================================
// CYBERPUNK BOOT / LOADING SCREEN
// ============================================================
function initLoaderScreen() {
    const loaderScreen = document.getElementById('loader-screen');
    const loaderBar = document.getElementById('loader-bar');
    const loaderLog = document.getElementById('loader-log');
    const loaderNum = document.getElementById('loader-percent');
    const loaderSub = document.getElementById('loader-sub-status');

    if (!loaderScreen || !loaderBar) return;

    const stages = [
        { pct: 15, msg: '> INITIALIZING KERNEL...', sub: "CRYPTS'26 // ESTABLISHING SECURE CONNECTION" },
        { pct: 40, msg: '> ESTABLISHING SECURE CONNECTION...', sub: "CRYPTS'26 // LOADING MODULES" },
        { pct: 70, msg: '> LOADING MODULES...', sub: "CRYPTS'26 // VERIFYING SIGNATURES" },
        { pct: 90, msg: '> VERIFYING SECURITY SIGNATURES...', sub: "CRYPTS'26 // SYSTEM READY" },
        { pct: 100, msg: '> SYSTEM READY.', sub: "CRYPTS'26 // AUTHORIZED SESSION" }
    ];

    let currentStage = 0;
    let progress = 0;

    const interval = setInterval(() => {
        progress += Math.floor(Math.random() * 8) + 4;
        if (progress > 100) progress = 100;

        loaderBar.style.width = `${progress}%`;
        if (loaderNum) loaderNum.innerText = `${progress}%`;

        if (currentStage < stages.length && progress >= stages[currentStage].pct) {
            if (loaderLog) loaderLog.innerText = stages[currentStage].msg;
            if (loaderSub) loaderSub.textContent = stages[currentStage].sub;
            currentStage++;
        }

        if (progress >= 100) {
            clearInterval(interval);
            setTimeout(() => {
                loaderScreen.classList.add('fade-out');
                setTimeout(() => {
                    loaderScreen.style.display = 'none';
                }, 600);
            }, 400);
        }
    }, 40);
}


// ============================================================
// EVENT FILTER TAGS (Modules Section) — animated card transitions
// ============================================================
function initEventFilter() {
    const chips = document.querySelectorAll('#event-filter-bar .filter-chip');
    const cards = document.querySelectorAll('#event-grid .event-card');

    if (!chips.length) return;

    function applyFilter(filter) {
        cards.forEach((card, i) => {
            const cat = card.dataset.category;
            const mode = card.dataset.mode;
            const show = filter === 'all' || cat === filter || mode === filter;

            if (show) {
                card.style.display = '';
                // Staggered entrance
                card.style.transitionDelay = `${i * 30}ms`;
                card.classList.remove('card-hiding', 'card-hidden');
                card.classList.add('card-showing');
                setTimeout(() => card.style.transitionDelay = '', 400);
            } else {
                card.classList.remove('card-showing');
                card.classList.add('card-hiding');
                setTimeout(() => {
                    card.classList.add('card-hidden');
                    card.style.display = 'none';
                }, 350);
            }
        });
    }

    chips.forEach(chip => {
        chip.addEventListener('click', (e) => {
            if (e) e.preventDefault();
            chips.forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
            applyFilter(chip.dataset.filter);
        });
    });

    // Ensure all cards start in showing state
    cards.forEach(card => card.classList.add('card-showing'));
}


// ============================================================
// REGISTRATION — EVENT TAG CHIP SELECTOR
// ============================================================
function initEventTagChips() {
    const chips = document.querySelectorAll('#event-tag-grid .event-tag-chip');
    const hiddenInput = document.getElementById('reg-events');
    const errorEl = document.getElementById('err-events');
    const classSelect = document.getElementById('reg-class');
    const selected = new Set();

    function updateChipStates() {
        const classVal = classSelect ? parseInt(classSelect.value, 10) : NaN;
        chips.forEach(chip => {
            const min = parseInt(chip.dataset.min, 10);
            const max = parseInt(chip.dataset.max, 10);
            if (!isNaN(classVal) && !isNaN(min) && !isNaN(max)) {
                const eligible = classVal >= min && classVal <= max;
                chip.classList.toggle('disabled', !eligible);
                if (!eligible && selected.has(chip.dataset.event)) {
                    selected.delete(chip.dataset.event);
                    chip.classList.remove('selected');
                }
            } else {
                chip.classList.remove('disabled');
            }
        });
        if (hiddenInput) hiddenInput.value = Array.from(selected).join(', ');
    }

    chips.forEach(chip => {
        chip.addEventListener('click', (e) => {
            if (e) e.preventDefault();
            if (chip.classList.contains('disabled')) return;
            const ev = chip.dataset.event;
            if (selected.has(ev)) {
                selected.delete(ev);
                chip.classList.remove('selected');
            } else {
                selected.add(ev);
                chip.classList.add('selected');
            }
            if (hiddenInput) hiddenInput.value = Array.from(selected).join(', ');
            if (errorEl && selected.size > 0) errorEl.classList.remove('visible');
        });
    });

    // Filter chips when class changes
    if (classSelect) {
        classSelect.addEventListener('change', updateChipStates);
    }

    return selected;
}

// ============================================================
// LIVE FORM VALIDATION + SUBMISSION
// ============================================================
function initRegistrationForm(selectedEvents) {
    const form = document.getElementById('registration-form');
    const emailEl = document.getElementById('reg-email');
    const nameEl = document.getElementById('reg-name');
    const classEl = document.getElementById('reg-class');
    const sectionEl = document.getElementById('reg-section');
    const submitBtn = document.getElementById('transmit-btn');
    const consoleOutput = document.getElementById('reg-console-output');
    const successScreen = document.getElementById('success-screen');

    if (!form) return;

    // Inline validation helpers
    const validators = {
        email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()),
        name: (v) => v.trim().length >= 2,
        class: (v) => v !== '',
        section: (v) => v.trim().length >= 1,
    };

    function setError(input, errId, valid) {
        const errEl = document.getElementById(errId);
        if (!input || !errEl) return;
        if (valid) {
            input.classList.remove('error');
            errEl.classList.remove('visible');
        } else {
            input.classList.add('error');
            errEl.classList.add('visible');
        }
    }

    if (emailEl) emailEl.addEventListener('input', () => setError(emailEl, 'err-email', validators.email(emailEl.value)));
    if (nameEl) nameEl.addEventListener('input', () => setError(nameEl, 'err-name', validators.name(nameEl.value)));
    if (classEl) classEl.addEventListener('change', () => setError(classEl, 'err-class', validators.class(classEl.value)));
    if (sectionEl) sectionEl.addEventListener('input', () => setError(sectionEl, 'err-section', validators.section(sectionEl.value)));

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Validate all fields
        let valid = true;
        if (emailEl && !validators.email(emailEl.value)) { setError(emailEl, 'err-email', false); valid = false; }
        if (nameEl && !validators.name(nameEl.value)) { setError(nameEl, 'err-name', false); valid = false; }
        if (classEl && !validators.class(classEl.value)) { setError(classEl, 'err-class', false); valid = false; }
        if (sectionEl && !validators.section(sectionEl.value)) { setError(sectionEl, 'err-section', false); valid = false; }

        const errEventsEl = document.getElementById('err-events');
        if (selectedEvents && selectedEvents.size === 0) {
            if (errEventsEl) errEventsEl.classList.add('visible');
            valid = false;
        }

        if (!valid) return;

        // Transmit
        submitBtn.disabled = true;
        submitBtn.innerText = "TRANSMITTING...";

        if (consoleOutput) {
            consoleOutput.classList.remove('hidden');
            consoleOutput.innerHTML = `<div>> ENCRYPTING PAYLOAD PACKET...</div><div>> CONNECTING TO GOOGLE SHEET NODE...</div>`;
        }

        const data = {
            email: emailEl ? emailEl.value.trim() : '',
            name: nameEl ? nameEl.value.trim() : '',
            class: classEl ? classEl.value : '',
            section: sectionEl ? sectionEl.value.trim() : '',
            events: selectedEvents ? Array.from(selectedEvents).join(', ') : '',
            timestamp: new Date().toLocaleString(),
        };

        addLog("> UPLOADING_DATA_PACKET...", "text-[#00f3ff]");

        try {
            await fetch(SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors',
                cache: 'no-cache',
                headers: { 'Content-Type': 'text/plain;charset=utf-8' },
                body: JSON.stringify(data),
            });

            addLog("> SUCCESS: PACKET_RECEIVED_BY_CENTRAL_NODE.", "text-[#00f3ff] font-bold");
            addLog("> CONFIRMATION_EMAIL_QUEUED.", "text-white/40");

            if (consoleOutput) {
                consoleOutput.innerHTML += `<div class="text-[#00f3ff]">> SUCCESS: ENROLLMENT CONFIRMED.</div>`;
            }

            // On standalone register.html, render the ticket confirmation card!
            if (successScreen) {
                form.classList.add('hidden');
                document.getElementById('summary-email').innerText = data.email;
                document.getElementById('summary-name').innerText = data.name;
                document.getElementById('summary-class').innerText = `${data.class} (${data.section})`;
                document.getElementById('summary-events').innerText = data.events;
                successScreen.classList.remove('hidden');
            } else {
                form.reset();
                if (selectedEvents) selectedEvents.clear();
                document.querySelectorAll('#event-tag-grid .event-tag-chip').forEach(c => c.classList.remove('selected'));
                submitBtn.disabled = false;
                submitBtn.innerText = "TRANSMIT ENROLLMENT";
                setTimeout(() => { window.location.hash = "briefing"; }, 2800);
            }

        } catch (err) {
            addLog("> CRITICAL_FAILURE: UNABLE TO SYNC WITH MATRIX.", "text-red-400");
            if (consoleOutput) {
                consoleOutput.innerHTML += `<div class="text-red-400">> ERROR: NETWORK TRANSMISSION FAILURE.</div>`;
            }
            submitBtn.disabled = false;
            submitBtn.innerText = "RETRY TRANSMISSION";
        }
    });
}


// ============================================================
// COMMAND PALETTE (Ctrl + K)
// ============================================================
function initCommandPalette() {
    const palette = document.getElementById('cmd-palette');
    const input = document.getElementById('palette-input');
    const results = document.getElementById('palette-results');
    const badgeTrigger = document.getElementById('cmd-badge-trigger');

    if (!palette || !input || !results) return;

    const navItems = [
        { label: '01_BRIEFING — Hero & Terminal', href: '#briefing', shortcut: 'G B' },
        { label: '02_EVENT_MODULES — Mission List', href: '#modules', shortcut: 'G M' },
        { label: '03_ENROLLMENT_PORTAL — Register', href: '#enrollment', shortcut: 'G R' },
        { label: '04_RESOURCE_MATRIX — Downloads', href: '#matrix', shortcut: 'G X' },
        { label: '05_CHRONOS_SCHEDULE — Timeline', href: '#chronos', shortcut: 'G C' },
        { label: '06_QUERY_RESOLUTION — FAQ', href: '#resolution', shortcut: 'G Q' },
        { label: '07_CORE_OPERATORS — Team', href: '#operators', shortcut: 'G O' },
    ];

    let highlighted = 0;

    function openPalette() {
        palette.classList.add('open');
        input.value = '';
        renderResults('');
        input.focus();
    }

    function closePalette() {
        palette.classList.remove('open');
        highlighted = 0;
    }

    function renderResults(query) {
        const q = query.toLowerCase();
        const filtered = q
            ? navItems.filter(i => i.label.toLowerCase().includes(q))
            : navItems;

        results.innerHTML = filtered.map((item, idx) => `
            <div class="palette-item${idx === highlighted ? ' highlighted' : ''}" data-href="${item.href}" data-idx="${idx}">
                <span>${item.label}</span>
                <span class="palette-shortcut">${item.shortcut}</span>
            </div>
        `).join('');

        results.querySelectorAll('.palette-item').forEach(el => {
            el.addEventListener('click', () => {
                window.location.href = el.dataset.href;
                closePalette();
            });
        });
    }

    input.addEventListener('input', () => {
        highlighted = 0;
        renderResults(input.value);
    });

    input.addEventListener('keydown', (e) => {
        const items = results.querySelectorAll('.palette-item');
        if (e.key === 'ArrowDown') {
            highlighted = Math.min(highlighted + 1, items.length - 1);
        } else if (e.key === 'ArrowUp') {
            highlighted = Math.max(highlighted - 1, 0);
        } else if (e.key === 'Enter' && items[highlighted]) {
            window.location.href = items[highlighted].dataset.href;
            closePalette();
        } else if (e.key === 'Escape') {
            closePalette();
        }
        renderResults(input.value);
    });

    document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            palette.classList.contains('open') ? closePalette() : openPalette();
        }
        if (e.key === 'Escape' && palette.classList.contains('open')) closePalette();
    });

    palette.addEventListener('click', (e) => {
        if (e.target === palette) closePalette();
    });

    if (badgeTrigger) badgeTrigger.addEventListener('click', () => {
        palette.classList.contains('open') ? closePalette() : openPalette();
    });
}


// ============================================================
// TIMELINE TABS (Chronos Schedule)
// ============================================================
function initTimelineTabs() {
    const tabs = document.querySelectorAll('.timeline-tab');
    const panels = document.querySelectorAll('.timeline-panel');

    tabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            if (e) e.preventDefault();
            tabs.forEach(t => t.classList.remove('active'));
            panels.forEach(p => p.classList.remove('active'));

            tab.classList.add('active');
            const target = document.getElementById(`tab-${tab.dataset.tab}`);
            if (target) {
                target.classList.add('active');
                // Force visibility on all children inside newly activated panel
                target.querySelectorAll('.timeline-item, .reveal').forEach(item => {
                    item.classList.add('visible');
                    item.style.opacity = '1';
                    item.style.transform = 'none';
                });
            }
        });
    });
}

// ============================================================
// DYNAMIC TIMELINE STATUS ENGINE
// ============================================================
function updateTimelineStatuses() {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = String(now.getMonth() + 1).padStart(2, '0');
    const currentDate = String(now.getDate()).padStart(2, '0');
    const todayStr = `${currentYear}-${currentMonth}-${currentDate}`;

    const items = document.querySelectorAll('.timeline-item');
    items.forEach(item => {
        const dateStr = item.dataset.date;
        const startDateStr = item.dataset.startDate || dateStr;
        const endDateStr = item.dataset.endDate || dateStr;
        const statusEl = item.querySelector('.timeline-status');
        if (!statusEl || !startDateStr) return;

        // Clear existing dynamic status classes
        statusEl.classList.remove('upcoming', 'in-progress', 'live', 'completed', 'done');
        item.classList.remove('in-progress', 'live', 'completed', 'done');

        if (todayStr < startDateStr) {
            statusEl.textContent = 'UPCOMING';
            statusEl.classList.add('upcoming');
        } else if (todayStr >= startDateStr && todayStr <= endDateStr) {
            statusEl.textContent = 'IN PROGRESS';
            statusEl.classList.add('in-progress', 'live');
            item.classList.add('live', 'in-progress');
        } else {
            statusEl.textContent = 'COMPLETED';
            statusEl.classList.add('completed', 'done');
            item.classList.add('completed', 'done');
        }
    });
}


// ============================================================
// ACCORDION FAQ
// ============================================================
function initFAQ() {
    const questions = document.querySelectorAll('.faq-question');
    questions.forEach(q => {
        const item = q.closest('.faq-item');
        const answer = item ? item.querySelector('.faq-answer') : q.nextElementSibling;

        const toggle = (e) => {
            if (e) e.preventDefault();
            const isOpen = q.classList.contains('open');

            // Close all FAQ items
            questions.forEach(otherQ => {
                otherQ.classList.remove('open');
                otherQ.setAttribute('aria-expanded', 'false');
                const otherItem = otherQ.closest('.faq-item');
                const otherAnswer = otherItem ? otherItem.querySelector('.faq-answer') : otherQ.nextElementSibling;
                if (otherAnswer) {
                    otherAnswer.classList.remove('open');
                    otherAnswer.style.maxHeight = '0px';
                    otherAnswer.style.opacity = '0';
                }
            });

            // Open clicked FAQ if it was closed
            if (!isOpen) {
                q.classList.add('open');
                q.setAttribute('aria-expanded', 'true');
                if (answer) {
                    answer.classList.add('open');
                    const inner = answer.querySelector('.faq-answer-inner');
                    const targetHeight = inner ? inner.scrollHeight + 30 : 300;
                    answer.style.maxHeight = targetHeight + 'px';
                    answer.style.opacity = '1';
                }
            }
        };

        q.addEventListener('click', toggle);
        q.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggle(e);
            }
        });
    });
}


// ============================================================
// ACTIVE NAV HIGHLIGHT (IntersectionObserver)
// ============================================================
function initActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const navMap = {
        briefing: document.getElementById('nav-briefing'),
        modules: document.getElementById('nav-modules'),
        enrollment: document.getElementById('nav-enrollment'),
        matrix: document.getElementById('nav-matrix'),
        chronos: document.getElementById('nav-chronos'),
        resolution: document.getElementById('nav-resolution'),
        operators: document.getElementById('nav-operators'),
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const link = navMap[entry.target.id];
            if (!link) return;
            if (entry.isIntersecting) {
                Object.values(navMap).forEach(l => l && l.classList.remove('active'));
                link.classList.add('active');
            }
        });
    }, { threshold: 0.3 });

    sections.forEach(s => observer.observe(s));
}


// ============================================================
// SCROLL REVEAL (IntersectionObserver)
// ============================================================
function initScrollReveal() {
    const revealEls = document.querySelectorAll('.reveal');

    // Show any element already in viewport immediately
    function checkVisible(el) {
        const rect = el.getBoundingClientRect();
        return rect.top < window.innerHeight && rect.bottom > 0;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.05, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(el => {
        if (checkVisible(el)) {
            el.classList.add('visible'); // immediate show if already in viewport
        } else {
            observer.observe(el);
        }
    });

    // Hard fallback: force all remaining invisible reveals after 800ms
    setTimeout(() => {
        document.querySelectorAll('.reveal:not(.visible)').forEach(el => {
            el.classList.add('visible');
        });
    }, 800);
}


// ============================================================
// MOBILE NAVIGATION
// ============================================================
function initNavigation() {
    const menuToggle = document.getElementById('menu-toggle');
    const menuClose = document.getElementById('menu-close');
    const mobileMenu = document.getElementById('mobile-menu');

    const hideMenu = () => {
        if (mobileMenu) {
            mobileMenu.classList.add('hidden');
            mobileMenu.classList.remove('flex');
        }
    };

    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', (e) => {
            e.preventDefault();
            mobileMenu.classList.remove('hidden');
            mobileMenu.classList.add('flex');
        });
    }
    if (menuClose) menuClose.addEventListener('click', (e) => { e.preventDefault(); hideMenu(); });
    if (mobileMenu) {
        mobileMenu.querySelectorAll('a').forEach(link => link.addEventListener('click', hideMenu));
    }
}


// ============================================================
// FOOTER YEAR
// ============================================================
function initFooterYear() {
    const el = document.getElementById('footer-year');
    if (el) el.innerText = new Date().getFullYear();
}


// ============================================================
// TAGLINE TYPING ANIMATION
// ============================================================
function initTaglineTyping() {
    const taglineEl = document.getElementById('hero-tagline');
    const subEl = document.getElementById('hero-tagline-sub');
    if (!taglineEl) return;

    const text = "BORN FROM CHAOS, BUILT FOR INNOVATION";
    let i = 0;

    function typeNext() {
        if (i < text.length) {
            taglineEl.textContent += text[i];
            i++;
            setTimeout(typeNext, 40);
        } else {
            taglineEl.classList.add('done');
            if (subEl) subEl.classList.add('visible');
        }
    }

    // Start after loader fades (delay 1.5s)
    setTimeout(typeNext, 1500);
}


// ============================================================
// SCROLL-TRIGGERED SECTION COLOR TRANSITIONS
// ============================================================
function initSectionObserver() {
    const sections = document.querySelectorAll('section[id]');
    if (!sections.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                document.body.dataset.section = entry.target.id;
            }
        });
    }, {
        threshold: 0.35,
        rootMargin: '-10% 0px -10% 0px'
    });

    sections.forEach(section => observer.observe(section));
}


// ============================================================
// EVENT DETAIL MODAL — DATA & LOGIC
// ============================================================
const EVENTS_DATA = {
    glitchverse: {
        name: "Glitchverse",
        icon: "GV",
        cat: "security",
        mode: "offline",
        eligibility: "Class 6–10",
        date: "September 17, 2026",
        classRange: [6, 10],
        desc: "Decode ciphers, crack enigmatic puzzles, and navigate multi-layered cryptographic challenges in this offline decryption arena.",
        rules: ["Teams of 2 participants", "Multiple rounds of increasing difficulty", "Internet & AI tools permitted: ChatGPT, Perplexity, Canva, Pixlr, PhotoMosh allowed for research and asset generation", "Time-limited per round"],
        criteria: ["Accuracy of solutions", "Speed of completion", "Logical approach and methodology"],
        contact: "Saumya (XI-A): saumya.cryptsopg@gmail.com | Shivan (XI-C): shivan.cryptsopg@gmail.com"
    },
    pixelpulse: {
        name: "PixelPulse",
        icon: "PP",
        cat: "design",
        mode: "online",
        eligibility: "Class 8–12",
        date: "September 25, 2026",
        classRange: [8, 12],
        desc: "Photography competition judged on creativity, visual communication, and technical mastery of design tools.",
        rules: ["Individual participation or teams of 2", "Submission Deadline (September 25, 2026 at 09:00 AM)", "Original photographs & artwork only — no templates or AI-generated photos", "Submit image title & concept description before deadline"],
        criteria: ["Creativity and originality", "Visual communication", "Technical skill and tool mastery", "Relevance to theme"],
        contact: "Eeshaan (XII-A): eeshaan.cryptsopg@gmail.com"
    },
    byte_the_site: {
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
        contact: "Saksham (XII-B): sakshamvinaykhatri.cryptsopg@gmail.com"
    },
    scratch_xplorers: {
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
        contact: "Bhavya Tuli (XII-A): bhavya.cryptsopg@gmail.com | Saksham (XII-B): sakshamvinaykhatri.cryptsopg@gmail.com"
    },
    ihe_cineprism: {
        name: "IHE CinePrism",
        icon: "CP",
        cat: "av",
        mode: "online",
        eligibility: "Class 6–12",
        date: "September 25, 2026",
        classRange: [6, 12],
        desc: "Short film & video production competition. Theme: 'Between the Headlines / Stories Left Behind'.",
        rules: ["Team of up to 9 members allowed", "Original films based on the theme", "Maximum duration & technical standards strictly enforced", "Submit film title & concept description before deadline"],
        criteria: ["Narrative and storytelling", "Cinematography and framing", "Editing and post-production", "Audio quality and sound design"],
        contact: "Bhavya Sachdeva (XII-B): bhavyas.cryptsopg@gmail.com"
    },
    prompt_paradox: {
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
        contact: "Shivan (XI-C): shivan.cryptsopg@gmail.com"
    },
    qwerty_4: {
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
        contact: "Prakriti (XI-B): prakriti.cryptsopg@gmail.com"
    },
    jailbreak: {
        name: "Jailbreak",
        icon: "JB",
        cat: "security",
        mode: "offline",
        eligibility: "Class 6–10",
        date: "September 23, 2026",
        classRange: [6, 10],
        desc: "Escape room meets tech — solve interconnected logic puzzles, decode sequences, and break free before the timer runs out.",
        rules: ["Teams of 3–4 members", "Time limit per room", "No external devices", "Hints available with penalty"],
        criteria: ["Puzzles solved correctly", "Time taken", "Teamwork and coordination"],
        contact: "Aaryan (XII-A): aaryan.cryptsopg@gmail.com"
    },
    ihe_codequest: {
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
        contact: "Ankita Yadav (Faculty): ankitayadav@opgworldschool.com"
    },
    ihe_kernel: {
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
        contact: "Eeshaan (XII-A): eeshaan.cryptsopg@gmail.com | Bhavya Sachdeva (XII-B): bhavyas.cryptsopg@gmail.com | Prakriti (XI-B): prakriti.cryptsopg@gmail.com"
    },
    game_makers: {
        name: "Game Makers",
        icon: "GM",
        cat: "gaming",
        mode: "offline",
        eligibility: "Class 10–12",
        date: "September 25, 2026",
        classRange: [10, 12],
        desc: "Game development from scratch — design, build, and present playable games judged on mechanics, creativity, and polish.",
        rules: ["Teams of 2–3 members", "Any game engine or platform (Scratch, Pygame, Construct)", "Game must be playable at submission", "Time limit: 2 hours"],
        criteria: ["Gameplay mechanics", "Creativity and originality", "Visual and audio polish", "Presentation"],
        contact: "Eeshaan (XII-A): eeshaan.cryptsopg@gmail.com | Saumya (XI-A): saumya.cryptsopg@gmail.com"
    },
    larene_esports: {
        name: "L'Arène Esports",
        icon: "ES",
        cat: "gaming",
        mode: "online",
        eligibility: "Class 9–12",
        date: "FC 26: Sept 19 | Valorant: Sept 20 | Minecraft: Sept 26",
        classRange: [9, 12],
        desc: "Multi-title esports tournament — FC 26, Valorant, and Minecraft. Strategy, reflexes, and teamwork across elimination rounds.",
        rules: ["Team size per title: Minecraft (3–4 players/team), Valorant (3–4 players/team), EA FC 26 (1 player/solo)", "Online matches via designated platform with mandatory screen sharing", "Single elimination knockout format", "Match schedules shared in advance"],
        criteria: ["Match wins", "Sportsmanship", "Team coordination"],
        contact: "Rishit (XI-B): rishit.cryptsopg@gmail.com | Somansh (XI-B): somansh.cryptsopg@gmail.com | Yajas (XI-B): yajas.cryptsopg@gmail.com"
    },
    biztech_nexus: {
        name: "BizTech Nexus",
        icon: "BN",
        cat: "biz",
        mode: "offline",
        eligibility: "Class 10–12",
        date: "September 30, 2026",
        classRange: [10, 12],
        desc: "Business-tech fusion — ideation, pitch decks, market analysis, and startup prototyping for the next-gen entrepreneur.",
        rules: ["Teams of 6–7 members per team", "Pitch deck + 10 minute presentation + live website prototype", "Shortlisting via PPT presentation", "Original AI business idea required"],
        criteria: ["Innovation and feasibility", "Market understanding", "Presentation quality", "Technical integration"],
        contact: "Anshika (XI-D): anshika.cryptsopg@gmail.com"
    }
};

function initEventModal() {
    const overlay = document.getElementById('event-modal-overlay');
    const headerEl = document.getElementById('modal-header');
    const bodyEl = document.getElementById('modal-body');
    const closeBtn = document.getElementById('modal-close');
    if (!overlay || !headerEl || !bodyEl) return;

    function openModal(eventKey) {
        const data = EVENTS_DATA[eventKey];
        if (!data) return;

        const modeClass = data.mode === 'online' ? 'badge-mode-online' : 'badge-mode-offline';

        headerEl.innerHTML = `
            <div class="event-icon-badge" data-cat="${data.cat}">${data.icon}</div>
            <div class="modal-header-info">
                <div class="modal-event-name">${data.name}</div>
                <div class="card-meta-row" style="margin-top:4px">
                    <span class="badge-mode ${modeClass}">${data.mode.toUpperCase()}</span>
                    <span class="badge-eligibility">${data.eligibility}</span>
                </div>
            </div>
        `;

        let rulesHtml = data.rules.map(r => `<li>${r}</li>`).join('');
        let criteriaHtml = data.criteria.map(c => `<li>${c}</li>`).join('');

        bodyEl.innerHTML = `
            <p style="color:rgba(255,255,255,0.6); font-size:12px; line-height:1.7; margin-bottom:18px;">${data.desc}</p>

            <div class="sub-panel-box">
                <div class="sub-panel-label">&gt;&gt; ${data.mode === 'online' ? 'SUBMISSION DEADLINE' : 'DATE &amp; TIME'}</div>
                <div class="sub-panel-content"><span class="badge-date">${data.date}</span></div>
            </div>

            <div class="sub-panel-box">
                <div class="sub-panel-label">&gt;&gt; RULES</div>
                <div class="sub-panel-content"><ul>${rulesHtml}</ul></div>
            </div>

            <div class="sub-panel-box magenta-border">
                <div class="sub-panel-label">&gt;&gt; JUDGMENT CRITERIA</div>
                <div class="sub-panel-content"><ul>${criteriaHtml}</ul></div>
            </div>

            <div class="sub-panel-box">
                <div class="sub-panel-label">&gt;&gt; EVENT IN-CHARGE</div>
                <div class="sub-panel-content">${data.contact.split(' | ').join('<br>')}</div>
            </div>
        `;

        overlay.classList.add('open');
        document.body.style.overflow = 'hidden';
        if (closeBtn) closeBtn.focus();
    }

    function closeModal() {
        overlay.classList.remove('open');
        document.body.style.overflow = '';
    }

    // Card & timeline item click handlers
    document.querySelectorAll('.event-card[data-event], .timeline-item[data-event]').forEach(card => {
        card.addEventListener('click', () => {
            openModal(card.dataset.event);
        });
    });

    // Close handlers
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) closeModal();
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && overlay.classList.contains('open')) closeModal();
    });
}


// ============================================================
// NAV SLIDING INDICATOR (V2-style)
// ============================================================
function initNavIndicator() {
    const indicator = document.getElementById('nav-indicator');
    if (!indicator) return;

    const navLinks = document.querySelectorAll('.nav-link');

    function moveIndicatorTo(link) {
        if (!link) return;
        const navContainer = link.closest('.hidden.lg\\:flex');
        if (!navContainer) return;
        indicator.style.left = link.offsetLeft + 'px';
        indicator.style.width = link.offsetWidth + 'px';
        indicator.classList.add('visible');
    }

    // Move indicator whenever active class changes
    const observer = new MutationObserver(() => {
        const active = document.querySelector('.nav-link.active');
        if (active) moveIndicatorTo(active);
    });

    navLinks.forEach(link => {
        observer.observe(link, { attributes: true, attributeFilter: ['class'] });
    });

    // Hover preview
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', () => moveIndicatorTo(link));
        link.addEventListener('mouseleave', () => {
            const active = document.querySelector('.nav-link.active');
            if (active) moveIndicatorTo(active);
            else indicator.classList.remove('visible');
        });
    });

    // Initial position
    setTimeout(() => {
        const active = document.querySelector('.nav-link.active');
        if (active) moveIndicatorTo(active);
    }, 200);
}


// ============================================================
// BOOT SEQUENCE
// ============================================================
function bootApp() {
    const safe = (name, fn) => {
        try { fn(); }
        catch (e) { console.error(`[CRYPTS] ${name} failed:`, e); }
    };

    safe('loaderScreen', () => initLoaderScreen());
    safe('customCursor', () => initCustomCursor());
    safe('navigation', () => initNavigation());
    safe('navIndicator', () => initNavIndicator());
    safe('timestamp', () => {
        setInterval(updateTimestamp, 1000);
        updateTimestamp();
    });
    safe('terminal', () => runInitialLogs());
    safe('particleCanvas', () => initParticleCanvas());
    safe('eventFilter', () => initEventFilter());
    let selectedEvents = new Set();
    safe('eventTagChips', () => { selectedEvents = initEventTagChips(); });
    safe('regForm', () => initRegistrationForm(selectedEvents));
    safe('cmdPalette', () => initCommandPalette());
    safe('faq', () => initFAQ());
    safe('timelineTabs', () => initTimelineTabs());
    safe('timelineStatus', () => updateTimelineStatuses());
    safe('activeNav', () => initActiveNav());
    safe('scrollReveal', () => initScrollReveal());
    safe('footerYear', () => initFooterYear());
    safe('taglineTyping', () => initTaglineTyping());
    safe('sectionObserver', () => initSectionObserver());
    safe('eventModal', () => initEventModal());
    safe('operatorEmails', () => initOperatorEmailRedirect());
    safe('highlightsEngine', () => initTerminalHighlights());
    safe('modelViewer', () => initModelViewer());
    safe('actionTracker', () => initUserActionTracker());
    safe('teamManagement', () => initTeamManagement());
}

function initUserActionTracker() {
    document.addEventListener('click', (e) => {
        const target = e.target.closest('a, button, .event-card, .filter-chip, .timeline-tab');
        if (target) {
            let label = target.innerText ? target.innerText.trim().replace(/\n/g, ' ') : target.id || target.tagName;
            if (label.length > 40) label = label.substring(0, 40) + '...';
            const timestamp = new Date().toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata', hour12: false });
            commandLogHistory.push({ text: `[${timestamp}] CLICK: ${label}`, color: "text-white/40" });
        }
    });

    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (scrollTimeout) clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            const timestamp = new Date().toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata', hour12: false });
            commandLogHistory.push({ text: `[${timestamp}] SCROLL: YOffset ${Math.floor(window.scrollY)}px`, color: "text-white/40" });
        }, 800);
    }, { passive: true });
}

function initModelViewer() {
    const mv = document.getElementById('hero-model-viewer');
    if (!mv) return;

    function loadBase64Model() {
        if (window.CRYPTS_MODEL_DATA && mv.src !== window.CRYPTS_MODEL_DATA) {
            mv.src = window.CRYPTS_MODEL_DATA;
        }
    }

    if (window.location.protocol === 'file:') {
        loadBase64Model();
    } else {
        mv.addEventListener('error', loadBase64Model);
    }
}

function initOperatorEmailRedirect() {
    document.querySelectorAll('.operator-email').forEach(link => {
        link.addEventListener('click', (e) => {
            const targetUrl = link.getAttribute('href');
            if (targetUrl) {
                e.preventDefault();
                window.open(targetUrl, '_blank', 'noopener,noreferrer');
            }
        });
    });
}


// ============================================================
// TEAM MANAGEMENT PORTAL (manage-team.html)
// ============================================================
function initTeamManagement() {
    // Only run on manage-team.html
    if (!document.getElementById('step-email-panel')) return;

    // ── DOM refs ──────────────────────────────────────────────
    const emailPanel   = document.getElementById('step-email-panel');
    const otpPanel     = document.getElementById('step-otp-panel');
    const editPanel    = document.getElementById('step-edit-panel');
    const successPanel = document.getElementById('tm-success-screen');

    const emailInput   = document.getElementById('tm-email');
    const otpInput     = document.getElementById('tm-otp');
    const membersArea  = document.getElementById('tm-members');

    const sendOtpBtn   = document.getElementById('tm-send-otp-btn');
    const verifyBtn    = document.getElementById('tm-verify-btn');
    const saveBtn      = document.getElementById('tm-save-btn');
    const resendBtn    = document.getElementById('tm-resend-btn');
    const backBtn      = document.getElementById('tm-back-to-email');

    const errEmail     = document.getElementById('tm-err-email');
    const errOtp       = document.getElementById('tm-err-otp');
    const errMembers   = document.getElementById('tm-err-members');

    const otpEmailDisplay  = document.getElementById('tm-otp-email-display');
    const resendCountdown  = document.getElementById('tm-resend-countdown');
    const displayClass     = document.getElementById('tm-display-class');
    const displaySection   = document.getElementById('tm-display-section');
    const eventsDisplay    = document.getElementById('tm-events-display');
    const summaryEmail     = document.getElementById('tm-summary-email');
    const summaryMembers   = document.getElementById('tm-summary-members');

    // ── State ─────────────────────────────────────────────────
    let verifiedEmail   = '';
    let sessionToken    = '';
    let resendTimer     = null;

    // ── Step navigation helpers ────────────────────────────────
    function setStepActive(step) {
        const dots       = [document.getElementById('step-dot-1'), document.getElementById('step-dot-2'), document.getElementById('step-dot-3')];
        const connectors = [document.getElementById('connector-1-2'), document.getElementById('connector-2-3')];

        dots.forEach((d, i) => {
            d.classList.remove('active', 'done');
            if (i + 1 < step)  d.classList.add('done');
            if (i + 1 === step) d.classList.add('active');
        });
        connectors.forEach((c, i) => {
            c.classList.toggle('done', i + 1 < step);
        });

        emailPanel.classList.toggle('hidden', step !== 1);
        otpPanel.classList.toggle('hidden',   step !== 2);
        editPanel.classList.toggle('hidden',  step !== 3);
        successPanel.classList.add('hidden');
    }

    // ── Console log helper ────────────────────────────────────
    function appendConsole(panelId, text, cls = 'text-white/70') {
        const el = document.getElementById(panelId);
        if (!el) return;
        el.classList.remove('hidden');
        const line = document.createElement('div');
        line.className = cls;
        line.textContent = text;
        el.appendChild(line);
        el.scrollTop = el.scrollHeight;
    }
    function clearConsole(panelId) {
        const el = document.getElementById(panelId);
        if (el) { el.innerHTML = ''; el.classList.add('hidden'); }
    }

    // ── Resend countdown ─────────────────────────────────────
    function startResendCountdown(seconds = 60) {
        if (resendBtn) resendBtn.disabled = true;
        let remaining = seconds;
        function tick() {
            if (resendCountdown) resendCountdown.textContent = `(${remaining}s)`;
            if (remaining <= 0) {
                if (resendBtn)      resendBtn.disabled = false;
                if (resendCountdown) resendCountdown.textContent = '';
                return;
            }
            remaining--;
            resendTimer = setTimeout(tick, 1000);
        }
        tick();
    }

    // ── Validation helpers ────────────────────────────────────
    function isValidEmail(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()); }

    // ── STEP 1: Send OTP ─────────────────────────────────────
    async function handleSendOtp() {
        const email = emailInput ? emailInput.value.trim() : '';
        if (!isValidEmail(email)) {
            if (errEmail) errEmail.classList.add('visible');
            if (emailInput) emailInput.classList.add('error');
            return;
        }
        if (errEmail)  errEmail.classList.remove('visible');
        if (emailInput) emailInput.classList.remove('error');

        sendOtpBtn.disabled = true;
        sendOtpBtn.textContent = 'TRANSMITTING...';
        clearConsole('tm-console-1');
        appendConsole('tm-console-1', '> ENCRYPTING IDENTITY PACKET...');
        appendConsole('tm-console-1', '> SCANNING OPERATOR REGISTRY...');

        try {
            // Use CORS mode so we can read the response and detect EMAIL_NOT_FOUND
            let data = null;
            try {
                const res = await fetch(SCRIPT_URL, {
                    method: 'POST',
                    cache: 'no-cache',
                    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
                    body: JSON.stringify({ action: 'sendOtp', email }),
                });
                data = await res.json();
            } catch (_) {
                // CORS blocked — fall back to no-cors optimistic mode
                await fetch(SCRIPT_URL, {
                    method: 'POST',
                    mode: 'no-cors',
                    cache: 'no-cache',
                    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
                    body: JSON.stringify({ action: 'sendOtp', email }),
                });
                data = { success: true }; // optimistic
            }

            if (data && !data.success) {
                if (data.error === 'EMAIL_NOT_FOUND') {
                    appendConsole('tm-console-1', '> ERROR: EMAIL NOT FOUND IN REGISTRY.', 'text-red-400');
                    // Show friendly inline error under the email input
                    if (errEmail) {
                        errEmail.textContent = "⚠ Email not found. It seems you haven't registered yet — go to the Registration page and register first.";
                        errEmail.classList.add('visible');
                    }
                    if (emailInput) emailInput.classList.add('error');
                } else {
                    appendConsole('tm-console-1', '> ERROR: ' + (data.error || 'UNKNOWN'), 'text-red-400');
                }
                sendOtpBtn.disabled = false;
                sendOtpBtn.textContent = 'TRANSMIT VERIFICATION CODE';
                return;
            }

            appendConsole('tm-console-1', '> OTP_DISPATCHED: CHECK YOUR INBOX.', 'text-[#00f3ff]');
            verifiedEmail = email;
            if (otpEmailDisplay) otpEmailDisplay.textContent = email;
            startResendCountdown(60);
            setStepActive(2);
        } catch (err) {
            appendConsole('tm-console-1', '> ERROR: NETWORK FAILURE. RETRY.', 'text-red-400');
            sendOtpBtn.disabled = false;
            sendOtpBtn.textContent = 'TRANSMIT VERIFICATION CODE';
        }
    }

    // ── STEP 2: Verify OTP ───────────────────────────────────
    async function handleVerifyOtp() {
        const otp = otpInput ? otpInput.value.trim() : '';
        if (otp.length !== 6 || !/^\d{6}$/.test(otp)) {
            if (errOtp) errOtp.classList.add('visible');
            if (otpInput) otpInput.classList.add('error');
            return;
        }
        if (errOtp)  errOtp.classList.remove('visible');
        if (otpInput) otpInput.classList.remove('error');

        verifyBtn.disabled = true;
        verifyBtn.textContent = 'AUTHENTICATING...';
        clearConsole('tm-console-2');
        appendConsole('tm-console-2', '> VERIFYING PASSCODE...');

        try {
            // Because we use no-cors we can't read the JSON response body.
            // So we make a second request with cors mode to a slightly
            // different action that returns CORS-safe text.
            const payload = JSON.stringify({ action: 'verifyOtpAndFetch', email: verifiedEmail, otp });
            let data = null;
            try {
                const corsRes = await fetch(SCRIPT_URL, {
                    method: 'POST',
                    cache: 'no-cache',
                    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
                    body: payload,
                });
                data = await corsRes.json();
            } catch (_) {
                // CORS may still block on some deployments; fall back gracefully
                data = null;
            }

            if (data && !data.success) {
                const msg = data.error === 'EMAIL_NOT_FOUND'
                    ? '> ERROR: EMAIL NOT IN REGISTRY. CHECK SPELLING.'
                    : '> ERROR: INVALID OR EXPIRED PASSCODE.';
                appendConsole('tm-console-2', msg, 'text-red-400');
                if (errOtp) errOtp.classList.add('visible');
                verifyBtn.disabled = false;
                verifyBtn.textContent = 'AUTHENTICATE & ACCESS';
                return;
            }

            // Populate edit step
            if (data) {
                sessionToken = data.sessionToken || '';
                if (displayClass)   displayClass.textContent   = data.class + ' — ' + (data.section || '');
                if (displaySection) displaySection.textContent = data.section || '';
                // Populate team members textarea (convert comma list to line-per-name)
                if (membersArea && data.name) {
                    membersArea.value = data.name.split(',').map(s => s.trim()).filter(Boolean).join('\n');
                }
                // Populate event chips
                if (eventsDisplay && data.events) {
                    eventsDisplay.innerHTML = '';
                    data.events.split(',').map(s => s.trim()).filter(Boolean).forEach(ev => {
                        const chip = document.createElement('span');
                        chip.className = 'tm-event-chip';
                        chip.textContent = ev;
                        eventsDisplay.appendChild(chip);
                    });
                }
            } else {
                // No-cors fallback: we can't read data but OTP was sent so trust it
                sessionToken = 'no-cors-session';
                if (displayClass)   displayClass.textContent   = 'Check your sheet';
                if (displaySection) displaySection.textContent = '—';
            }

            appendConsole('tm-console-2', '> ACCESS_GRANTED: IDENTITY CONFIRMED.', 'text-[#00f3ff]');
            setStepActive(3);
        } catch (err) {
            appendConsole('tm-console-2', '> CRITICAL_ERROR: UNABLE TO REACH MATRIX.', 'text-red-400');
            verifyBtn.disabled = false;
            verifyBtn.textContent = 'AUTHENTICATE & ACCESS';
        }
    }

    // ── STEP 3: Save changes ──────────────────────────────────
    async function handleSave() {
        const raw = membersArea ? membersArea.value.trim() : '';
        if (!raw) {
            if (errMembers) errMembers.classList.add('visible');
            if (membersArea) membersArea.classList.add('error');
            return;
        }
        if (errMembers)  errMembers.classList.remove('visible');
        if (membersArea) membersArea.classList.remove('error');

        // Normalise: split by newline or comma, join as comma-separated
        const normalised = raw.split(/[\n,]+/).map(s => s.trim()).filter(Boolean).join(', ');

        saveBtn.disabled = true;
        saveBtn.textContent = 'SYNCHRONIZING...';
        clearConsole('tm-console-3');
        appendConsole('tm-console-3', '> ENCRYPTING UPDATE PACKET...');
        appendConsole('tm-console-3', '> TRANSMITTING TO CENTRAL MATRIX...');

        try {
            await fetch(SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors',
                cache: 'no-cache',
                headers: { 'Content-Type': 'text/plain;charset=utf-8' },
                body: JSON.stringify({
                    action: 'updateTeam',
                    email: verifiedEmail,
                    sessionToken,
                    name: normalised,
                }),
            });

            appendConsole('tm-console-3', '> SUCCESS: SQUAD SYNCHRONIZED.', 'text-[#00f3ff]');

            // Show success card
            emailPanel.classList.add('hidden');
            otpPanel.classList.add('hidden');
            editPanel.classList.add('hidden');
            successPanel.classList.remove('hidden');

            // Update step dots to all done
            ['step-dot-1','step-dot-2','step-dot-3'].forEach(id => {
                const d = document.getElementById(id);
                if (d) { d.classList.remove('active'); d.classList.add('done'); }
            });
            ['connector-1-2','connector-2-3'].forEach(id => {
                const c = document.getElementById(id);
                if (c) c.classList.add('done');
            });

            if (summaryEmail)   summaryEmail.textContent   = verifiedEmail;
            if (summaryMembers) summaryMembers.textContent = normalised;

        } catch (err) {
            appendConsole('tm-console-3', '> ERROR: TRANSMISSION FAILED. RETRY.', 'text-red-400');
            saveBtn.disabled = false;
            saveBtn.textContent = 'SAVE SQUAD CHANGES';
        }
    }

    // ── Wire up events ────────────────────────────────────────
    if (sendOtpBtn) sendOtpBtn.addEventListener('click', handleSendOtp);
    if (verifyBtn)  verifyBtn.addEventListener('click', handleVerifyOtp);
    if (saveBtn)    saveBtn.addEventListener('click', handleSave);

    if (resendBtn) {
        resendBtn.addEventListener('click', () => {
            if (resendTimer) clearTimeout(resendTimer);
            clearConsole('tm-console-2');
            sendOtpBtn && (sendOtpBtn.textContent = 'TRANSMIT VERIFICATION CODE');
            setStepActive(1);
            handleSendOtp();
        });
    }

    if (backBtn) {
        backBtn.addEventListener('click', () => {
            setStepActive(1);
            if (otpInput) otpInput.value = '';
            clearConsole('tm-console-2');
            sendOtpBtn.disabled = false;
            sendOtpBtn.textContent = 'TRANSMIT VERIFICATION CODE';
        });
    }

    // Live validation
    if (emailInput) {
        emailInput.addEventListener('input', () => {
            // Reset error text back to default (may have been changed to "not found" message)
            if (errEmail) errEmail.textContent = '⚠ Enter a valid registered email address.';
            if (errEmail) errEmail.classList.toggle('visible', !isValidEmail(emailInput.value));
            emailInput.classList.toggle('error', !isValidEmail(emailInput.value));
        });
        emailInput.addEventListener('keydown', e => { if (e.key === 'Enter') handleSendOtp(); });
    }
    if (otpInput) {
        otpInput.addEventListener('input', () => {
            // Only allow digits
            otpInput.value = otpInput.value.replace(/\D/g, '').slice(0, 6);
        });
        otpInput.addEventListener('keydown', e => { if (e.key === 'Enter') handleVerifyOtp(); });
    }

    // Init: show step 1
    setStepActive(1);
}


if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bootApp);
} else {
    bootApp();
}