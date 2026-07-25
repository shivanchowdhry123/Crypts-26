/* ============================================================
   CRYPTS 5.0 — SCRIPT ENGINE
   ============================================================ */

// ============================================================
// GOOGLE SHEETS CONFIGURATION
// ============================================================
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxUt5jwpOGtOksKnoFBx7S2kFWre1py_mf3QlyImNrrp02eMoOxi5m4hVyrtLfWLdWu5Q/exec";

// ============================================================
// TERMINAL ENGINE
// ============================================================
const terminalOutput = document.getElementById('terminal-output');
const terminalBody   = document.getElementById('terminal-body');
const inputLine      = document.getElementById('input-line');
const terminalInput  = document.getElementById('terminal-input');
const timestampEl    = document.getElementById('timestamp');

const initialLogs = [
    { text: "> RELAYING STRUCTURE UPDATE...",              color: "text-[#00f3ff] font-bold" },
    { text: "> INDEXING 01_BRIEFING THROUGH 07_OPERATORS", color: "text-white/60" },
    { text: "> PARTICLE_GRID INITIALIZED.",                color: "text-white/40" },
    { text: "> ENCRYPTION_LAYER: ACTIVE.",                 color: "text-white/40" },
    { text: "------------------------------------------------", color: "text-white/10" },
    { text: "CRYPTS 5.0 Terminal  [AUTHORIZED_SESSION]",   color: "text-[#ff00c1]" },
    { text: "Type 'help' for available commands.",          color: "text-white/30" },
];

function updateTimestamp() {
    if (!timestampEl) return;
    timestampEl.innerText = new Date().toISOString().replace('T', ' ').split('.')[0] + " UTC";
}

function addLog(text, color = "text-white/80") {
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

async function runInitialLogs() {
    for (const log of initialLogs) {
        addLog(log.text, log.color);
        await new Promise(r => setTimeout(r, 280));
    }
    if (inputLine) inputLine.classList.remove('hidden');
    if (terminalInput) terminalInput.focus();
}

function handleCommand(cmd) {
    const command = cmd.toLowerCase().trim();
    addLog(`root@crypts:~# ${cmd}`, "text-white/30");

    const cmds = {
        clear: () => { if (terminalOutput) terminalOutput.innerHTML = ''; },
        help: () => addLog("COMMANDS: help · clear · enroll · modules · status · about · matrix · schedule · team", "text-[#00f3ff]"),
        enroll: () => {
            addLog("> REDIRECTING TO ENROLLMENT PORTAL...", "text-[#ff00c1]");
            setTimeout(() => { window.location.hash = "enrollment"; }, 400);
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
        status: () => {
            addLog(`> SYSTEM_STATE:    OPERATIONAL`, "text-[#00f3ff]");
            addLog(`> NODES:           7 / 7 ACTIVE`, "text-white/50");
            addLog(`> PACKET_LOSS:     0.00%`, "text-white/50");
        },
        about: () => {
            addLog(`> CRYPTS 5.0 | OPG WORLD SCHOOL | TECHNICAL SYMPOSIUM`, "text-white");
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
        width  = canvas.width  = parent ? parent.offsetWidth  : window.innerWidth;
        height = canvas.height = parent ? parent.offsetHeight : window.innerHeight;
    }

    class Particle {
        constructor() { this.reset(); }
        reset() {
            this.x  = Math.random() * width;
            this.y  = Math.random() * height;
            this.vx = (Math.random() - 0.5) * PARTICLE_SPEED;
            this.vy = (Math.random() - 0.5) * PARTICLE_SPEED;
            this.r  = Math.random() * 1.8 + 0.6;
        }
        move() {
            this.x += this.vx;
            this.y += this.vy;
            if (this.x < 0 || this.x > width)  this.vx *= -1;
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
// CURSOR TRAIL
// ============================================================
function initCursorTrail() {
    const trail = document.getElementById('cursor-trail');
    if (!trail) return;

    let targetX = 0, targetY = 0;
    let currentX = 0, currentY = 0;
    let visible = false;

    document.addEventListener('mousemove', (e) => {
        targetX = e.clientX;
        targetY = e.clientY;
        if (!visible) { trail.style.opacity = '1'; visible = true; }
    });
    document.addEventListener('mouseleave', () => {
        trail.style.opacity = '0'; visible = false;
    });

    function animate() {
        currentX += (targetX - currentX) * 0.12;
        currentY += (targetY - currentY) * 0.12;
        trail.style.transform = `translate3d(${currentX - 6}px, ${currentY - 6}px, 0)`;
        requestAnimationFrame(animate);
    }
    animate();
}


// ============================================================
// EVENT FILTER TAGS (Modules Section)
// ============================================================
function initEventFilter() {
    const chips = document.querySelectorAll('.filter-chip');
    const cards = document.querySelectorAll('#event-grid .event-card');

    chips.forEach(chip => {
        chip.addEventListener('click', () => {
            chips.forEach(c => c.classList.remove('active'));
            chip.classList.add('active');

            const filter = chip.dataset.filter;
            cards.forEach(card => {
                const cat = card.dataset.category;
                const show = filter === 'all' || cat === filter;
                card.style.display = show ? '' : 'none';
            });
        });
    });
}


// ============================================================
// REGISTRATION — EVENT TAG CHIP SELECTOR
// ============================================================
function initEventTagChips() {
    const chips = document.querySelectorAll('#event-tag-grid .event-tag-chip');
    const hiddenInput = document.getElementById('reg-events');
    const errorEl = document.getElementById('err-events');
    const selected = new Set();

    chips.forEach(chip => {
        chip.addEventListener('click', () => {
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

    return selected;
}


// ============================================================
// LIVE FORM VALIDATION + SUBMISSION
// ============================================================
function initRegistrationForm(selectedEvents) {
    const form     = document.getElementById('registration-form');
    const emailEl  = document.getElementById('reg-email');
    const nameEl   = document.getElementById('reg-name');
    const classEl  = document.getElementById('reg-class');
    const sectionEl= document.getElementById('reg-section');
    const submitBtn= document.getElementById('transmit-btn');

    if (!form) return;

    // Inline validation helpers
    const validators = {
        email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()),
        name:  (v) => v.trim().length >= 2,
        class: (v) => v !== '',
        section:(v)=> v.trim().length >= 1,
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

    if (emailEl)   emailEl.addEventListener('input',   () => setError(emailEl,   'err-email',   validators.email(emailEl.value)));
    if (nameEl)    nameEl.addEventListener('input',    () => setError(nameEl,    'err-name',    validators.name(nameEl.value)));
    if (classEl)   classEl.addEventListener('change',  () => setError(classEl,   'err-class',   validators.class(classEl.value)));
    if (sectionEl) sectionEl.addEventListener('input', () => setError(sectionEl, 'err-section', validators.section(sectionEl.value)));

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Validate all fields
        let valid = true;
        if (emailEl   && !validators.email(emailEl.value))    { setError(emailEl,   'err-email',   false); valid = false; }
        if (nameEl    && !validators.name(nameEl.value))      { setError(nameEl,    'err-name',    false); valid = false; }
        if (classEl   && !validators.class(classEl.value))    { setError(classEl,   'err-class',   false); valid = false; }
        if (sectionEl && !validators.section(sectionEl.value)){ setError(sectionEl, 'err-section', false); valid = false; }

        const errEventsEl = document.getElementById('err-events');
        if (selectedEvents.size === 0) {
            if (errEventsEl) errEventsEl.classList.add('visible');
            valid = false;
        }

        if (!valid) return;

        // Transmit
        submitBtn.disabled = true;
        submitBtn.innerText = "TRANSMITTING...";

        const data = {
            email:     emailEl ? emailEl.value.trim() : '',
            name:      nameEl  ? nameEl.value.trim()  : '',
            class:     classEl ? classEl.value        : '',
            section:   sectionEl ? sectionEl.value.trim() : '',
            events:    Array.from(selectedEvents).join(', '),
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

            form.reset();
            selectedEvents.clear();
            document.querySelectorAll('#event-tag-grid .event-tag-chip').forEach(c => c.classList.remove('selected'));
            submitBtn.disabled = false;
            submitBtn.innerText = "TRANSMIT ENROLLMENT";

            setTimeout(() => { window.location.hash = "briefing"; }, 2800);

        } catch (err) {
            addLog("> CRITICAL_FAILURE: UNABLE TO SYNC WITH MATRIX.", "text-red-400");
            submitBtn.disabled = false;
            submitBtn.innerText = "RETRY TRANSMISSION";
        }
    });
}


// ============================================================
// COMMAND PALETTE (Ctrl + K)
// ============================================================
function initCommandPalette() {
    const palette     = document.getElementById('cmd-palette');
    const input       = document.getElementById('palette-input');
    const results     = document.getElementById('palette-results');
    const badgeTrigger= document.getElementById('cmd-badge-trigger');

    if (!palette || !input || !results) return;

    const navItems = [
        { label: '01_BRIEFING — Hero & Terminal',      href: '#briefing',   shortcut: 'G B' },
        { label: '02_EVENT_MODULES — Mission List',    href: '#modules',    shortcut: 'G M' },
        { label: '03_ENROLLMENT_PORTAL — Register',   href: '#enrollment', shortcut: 'G R' },
        { label: '04_RESOURCE_MATRIX — Downloads',    href: '#matrix',     shortcut: 'G X' },
        { label: '05_CHRONOS_SCHEDULE — Timeline',    href: '#chronos',    shortcut: 'G C' },
        { label: '06_QUERY_RESOLUTION — FAQ',         href: '#resolution', shortcut: 'G Q' },
        { label: '07_CORE_OPERATORS — Team',          href: '#operators',  shortcut: 'G O' },
    ];

    let highlighted = 0;

    function open() {
        palette.classList.add('open');
        input.value = '';
        renderResults('');
        input.focus();
    }

    function close() {
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
                close();
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
            close();
        } else if (e.key === 'Escape') {
            close();
        }
        renderResults(input.value);
    });

    document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            palette.classList.contains('open') ? close() : open();
        }
        if (e.key === 'Escape' && palette.classList.contains('open')) close();
    });

    palette.addEventListener('click', (e) => {
        if (e.target === palette) close();
    });

    if (badgeTrigger) badgeTrigger.addEventListener('click', () => {
        palette.classList.contains('open') ? close() : open();
    });
}


// ============================================================
// ACCORDION FAQ
// ============================================================
function initFAQ() {
    const questions = document.querySelectorAll('.faq-question');
    questions.forEach(q => {
        const answer = q.nextElementSibling;

        const toggle = () => {
            const isOpen = q.classList.contains('open');
            // Close all
            questions.forEach(other => {
                other.classList.remove('open');
                other.setAttribute('aria-expanded', 'false');
                if (other.nextElementSibling) other.nextElementSibling.classList.remove('open');
            });
            // Open clicked if it was closed
            if (!isOpen) {
                q.classList.add('open');
                q.setAttribute('aria-expanded', 'true');
                if (answer) answer.classList.add('open');
            }
        };

        q.addEventListener('click', toggle);
        q.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); }
        });
    });
}


// ============================================================
// TIMELINE TABS
// ============================================================
function initTimelineTabs() {
    const tabs   = document.querySelectorAll('.timeline-tab');
    const panels = document.querySelectorAll('.timeline-panel');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            panels.forEach(p => p.classList.remove('active'));
            tab.classList.add('active');
            const target = document.getElementById(`tab-${tab.dataset.tab}`);
            if (target) target.classList.add('active');
        });
    });
}


// ============================================================
// ACTIVE NAV HIGHLIGHT (IntersectionObserver)
// ============================================================
function initActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const navMap = {
        briefing:   document.getElementById('nav-briefing'),
        modules:    document.getElementById('nav-modules'),
        enrollment: document.getElementById('nav-enrollment'),
        matrix:     document.getElementById('nav-matrix'),
        chronos:    document.getElementById('nav-chronos'),
        resolution: document.getElementById('nav-resolution'),
        operators:  document.getElementById('nav-operators'),
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
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });
    revealEls.forEach(el => observer.observe(el));
}


// ============================================================
// MOBILE NAVIGATION
// ============================================================
function initNavigation() {
    const menuToggle = document.getElementById('menu-toggle');
    const menuClose  = document.getElementById('menu-close');
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
// BOOT SEQUENCE
// ============================================================
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initNavigation);
} else {
    initNavigation();
}

window.onload = () => {
    // Timestamp ticker
    setInterval(updateTimestamp, 1000);
    updateTimestamp();

    // Terminal boot
    runInitialLogs();

    // Visual systems
    initParticleCanvas();
    initCursorTrail();

    // Interactivity
    initEventFilter();
    const selectedEvents = initEventTagChips();
    initRegistrationForm(selectedEvents);
    initCommandPalette();
    initFAQ();
    initTimelineTabs();

    // Navigation & reveal
    initActiveNav();
    initScrollReveal();

    // Footer
    initFooterYear();
};