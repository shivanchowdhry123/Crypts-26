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
    const loaderBar    = document.getElementById('loader-bar');
    const loaderLog    = document.getElementById('loader-log');
    const loaderNum    = document.getElementById('loader-percent');

    if (!loaderScreen || !loaderBar) return;

    const stages = [
        { pct: 15,  msg: "> INITIALIZING SYSTEM CORE..." },
        { pct: 40,  msg: "> ESTABLISHING SECURE GATEWAY..." },
        { pct: 70,  msg: "> INDEXING EVENT MODULE MATRIX..." },
        { pct: 90,  msg: "> VERIFYING SECURITY SIGNATURES..." },
        { pct: 100, msg: "> SYSTEM READY. WELCOME TO CRYPTS 5.0" }
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
            currentStage++;
        }

        if (progress >= 100) {
            clearInterval(interval);
            setTimeout(() => {
                loaderScreen.classList.add('fade-out');
                setTimeout(() => {
                    loaderScreen.style.display = 'none';
                }, 600);
            }, 300);
        }
    }, 45);
}


// ============================================================
// EVENT FILTER TAGS (Modules Section)
// ============================================================
function initEventFilter() {
    const chips = document.querySelectorAll('.filter-chip');
    const cards = document.querySelectorAll('#event-grid .event-card');

    chips.forEach(chip => {
        chip.addEventListener('click', (e) => {
            if (e) e.preventDefault();
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
    const form          = document.getElementById('registration-form');
    const emailEl       = document.getElementById('reg-email');
    const nameEl        = document.getElementById('reg-name');
    const classEl       = document.getElementById('reg-class');
    const sectionEl     = document.getElementById('reg-section');
    const submitBtn     = document.getElementById('transmit-btn');
    const consoleOutput = document.getElementById('reg-console-output');
    const successScreen = document.getElementById('success-screen');

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
            email:     emailEl ? emailEl.value.trim() : '',
            name:      nameEl  ? nameEl.value.trim()  : '',
            class:     classEl ? classEl.value        : '',
            section:   sectionEl ? sectionEl.value.trim() : '',
            events:    selectedEvents ? Array.from(selectedEvents).join(', ') : '',
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
                document.getElementById('summary-email').innerText  = data.email;
                document.getElementById('summary-name').innerText   = data.name;
                document.getElementById('summary-class').innerText  = `${data.class} (${data.section})`;
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
// EVENT FILTER TAGS (Modules Section)
// ============================================================
function initEventFilter() {
    const chips = document.querySelectorAll('.filter-chip');
    const cards = document.querySelectorAll('#event-grid .event-card');

    chips.forEach(chip => {
        chip.addEventListener('click', (e) => {
            if (e) e.preventDefault();
            chips.forEach(c => c.classList.remove('active'));
            chip.classList.add('active');

            const filter = chip.dataset.filter;
            cards.forEach(card => {
                const cat = card.dataset.category;
                const show = (filter === 'all' || cat === filter);
                if (show) {
                    card.style.display = 'block';
                    card.classList.add('visible');
                    card.style.opacity = '1';
                    card.style.transform = 'none';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// ============================================================
// TIMELINE TABS (Chronos Schedule)
// ============================================================
function initTimelineTabs() {
    const tabs   = document.querySelectorAll('.timeline-tab');
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
        rules: ["Teams of 2 participants", "Multiple rounds of increasing difficulty", "No external devices or internet access", "Time-limited per round"],
        criteria: ["Accuracy of solutions", "Speed of completion", "Logical approach and methodology"],
        contact: "Event In-Charge (see brochure)"
    },
    pixelpulse: {
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
                <div class="sub-panel-label">&gt;&gt; DATE &amp; TIME</div>
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
                <div class="sub-panel-content">${data.contact}</div>
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
// BOOT SEQUENCE
// ============================================================
function bootApp() {
    const safe = (name, fn) => {
        try { fn(); }
        catch (e) { console.error(`[CRYPTS] ${name} failed:`, e); }
    };

    safe('loaderScreen',   () => initLoaderScreen());
    safe('customCursor',   () => initCustomCursor());
    safe('navigation',     () => initNavigation());
    safe('timestamp',      () => {
        setInterval(updateTimestamp, 1000);
        updateTimestamp();
    });
    safe('terminal',       () => runInitialLogs());
    safe('particleCanvas', () => initParticleCanvas());
    safe('eventFilter',    () => initEventFilter());
    let selectedEvents = new Set();
    safe('eventTagChips',  () => { selectedEvents = initEventTagChips(); });
    safe('regForm',        () => initRegistrationForm(selectedEvents));
    safe('cmdPalette',     () => initCommandPalette());
    safe('faq',            () => initFAQ());
    safe('timelineTabs',   () => initTimelineTabs());
    safe('timelineStatus', () => updateTimelineStatuses());
    safe('activeNav',      () => initActiveNav());
    safe('scrollReveal',   () => initScrollReveal());
    safe('footerYear',     () => initFooterYear());
    safe('taglineTyping',  () => initTaglineTyping());
    safe('sectionObserver',() => initSectionObserver());
    safe('eventModal',     () => initEventModal());
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bootApp);
} else {
    bootApp();
}