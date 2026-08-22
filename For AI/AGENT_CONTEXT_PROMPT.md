# SYSTEM CONTEXT & DEVELOPER GUIDE: CRYPTS'26 WEBSITE

## 1. PROJECT OVERVIEW
* **Project Name:** CRYPTS'26 Technical Symposium Website
* **Organization:** OPG World School
* **Core Concept:** An industrial cyberpunk-themed landing page and interactive terminal platform for an annual school tech fest.
* **Tagline/Theme:** *Born From Chaos, Built for Innovation* — *In Chaos We Create. Through Innovation We Evolve.*
* **Primary Target Audience:** Middle and High School students (Classes 4–12), school admins, and participating event teams.

## 2. TECH STACK & FILE ARCHITECTURE
The current project structure consists of the following key files:

```
├── index.html           # Main single-page application (7 core sections + event modal)
├── register.html        # Standalone registration portal with smart class-based event filtering
├── style.css            # Cyberpunk HUD frames, design tokens, noise/grid overlays, animations
├── script.js            # Terminal CLI, event modals, typing animation, scroll observer, registration
├── doPost.gs            # Google Apps Script backend for database insertion & email notifications
├── logo/
│   └── logo.png         # Official CRYPTS'26 transparent PNG emblem
├── For AI/
│   ├── AGENT_CONTEXT_PROMPT.md   # This file — developer guide for AI agents
│   ├── DESIGN_REVAMP_PLAN.md     # Design benchmark & architectural roadmap
│   └── CRYPTS 5.0.pdf            # Official 31-page event brochure (source of truth for event data)
└── README.md            # Public documentation
```

### Key CDN Dependencies:
* **Tailwind CSS:** `https://cdn.tailwindcss.com`
* **Google Fonts:** `JetBrains Mono` (`https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&display=swap`)

## 3. DESIGN SYSTEM & VISUAL DIRECTIVE
When adding or modifying components, strict adherence to the visual language is required:

### Color Palette:
* **Dark Void (Background):** `#02030a`
* **Dark Card (Surface):** `#051024` / `rgba(5, 8, 24, 0.85)`
* **Neon Cyan (Primary Accent):** `#00f3ff` (Glow: `rgba(0, 243, 255, 0.3)`)
* **Magenta Hot (Secondary Accent):** `#ff007f` / `#d900bc` / Bright `#ff3df2`
* **Purple Neon (Tertiary):** `#8b00ff` (Glow: `rgba(139, 0, 255, 0.3)`)
* **Gold Accent:** `#ffd700` (used for date badges)
* **Border Highlights:** `rgba(255, 255, 255, 0.05)` or `#1a2a44`

### Typography & Aesthetic Tokens:
* **Font Family:** `JetBrains Mono, monospace`
* **Scanlines:** Fixed overlays using linear gradients and `@keyframes scanline`.
* **Glitch Engine:** Applied via CSS attribute selectors `[data-text]` using pseudo-elements `::before` and `::after` with clip-path animations.
* **Noise/Grain Overlay:** SVG `feTurbulence` noise at 3.5% opacity on `body::after`, `mix-blend-mode: overlay`.
* **Circuit Board Grid:** `repeating-linear-gradient` grid at 40px intervals on `body::before`, animated via `@keyframes gridPulse` (8s cycle).
* **HUD Frames:** `.hud-frame` with `clip-path: polygon(...)` for chamfered corners, `.hud-cut-corner` with L-shaped bracket `::before`/`::after` indicators.
* **Scroll Color Transitions:** `body[data-section]` CSS overrides shift ambient blob colors per-section.
* **Tone:** Terminal-first, technical, low-overhead, cyberpunk UI/UX.

## 4. DOM STRUCTURE & SECTIONS
The site is organized into 7 sequential operational sections indexed via anchor links:
1. `01_BRIEFING` (`#briefing`): Hero banner, main logo render, live UTC clock, tagline typing animation, and interactive CLI terminal emulator (`#terminal-body`).
2. `02_EVENT_MODULES` (`#modules`): Grid display of 13 event cards with HUD frames, monogram badges, mode/eligibility pills, code prefixes, and click-to-expand modals. Events: *Glitchverse*, *PixelPulse*, *Byte the Site*, *Scratch Xplorers*, *IHE CinePrism*, *Prompt Paradox*, *QWERTY 4.0*, *Jailbreak*, *IHE CodeQuest*, *IHE Kernel*, *Game Makers*, *L'Arène Esports*, *BizTech Nexus*.
3. `03_ENROLLMENT_PORTAL` (`#enrollment`): Link to standalone registration portal (`register.html`).
4. `04_RESOURCE_MATRIX` (`#matrix`): Knowledge base and rules download center.
5. `05_CHRONOS_SCHEDULE` (`#chronos`): Timeline sequence / schedule grid with tabbed panels (Morning, Afternoon, Closing).
6. `06_QUERY_RESOLUTION` (`#resolution`): FAQ section with animated accordion widgets.
7. `07_CORE_OPERATORS` (`#operators`): Organizing team member bios and credits.

### Additional DOM Elements:
* **Event Detail Modal** (`#event-modal-overlay`): Full-screen overlay with HUD-framed panel, dynamically populated from `EVENTS_DATA` object in `script.js`.
* **Command Palette** (`#cmd-palette`): Raycast-style fuzzy search overlay triggered by `Ctrl+K`.

## 5. EXISTING INTERACTIVE SYSTEMS

### A. Terminal CLI Engine (`script.js`)
* Real-time scrolling terminal box located in `#briefing`.
* Listens to keydown events on `#terminal-input`.
* Supported commands:
  * `help` - Lists commands.
  * `clear` - Clears logs.
  * `enroll` - Redirects to `register.html`.
  * `modules` - Scrolls to `#modules`.
  * `matrix` - Scrolls to `#matrix`.
  * `schedule` - Scrolls to `#chronos`.
  * `team` - Scrolls to `#operators`.
  * `status` - Displays simulated system operational state.
  * `about` - Displays fest metadata.

### B. Tagline Typing Animation (`script.js`)
* Types out *"BORN FROM CHAOS, BUILT FOR INNOVATION"* character-by-character (~40ms/char) into `#hero-tagline`.
* Triggered 1.5s after page load.
* On completion, cursor blinks 3× then fades, and gradient sub-tagline slides in.

### C. Scroll-Triggered Section Color Observer (`script.js`)
* `IntersectionObserver` watches each `<section>` at 35% threshold.
* Sets `document.body.dataset.section` to the active section ID.
* CSS responds via `body[data-section="..."]` custom property overrides, transitioning ambient blob colors.

### D. Event Detail Modals (`script.js`)
* `EVENTS_DATA` object contains all 13 events with name, icon, category, mode, eligibility, date, class range, description, rules, criteria, and contact.
* Click handler on `.event-card[data-event]` → populates modal → opens with slide-up animation.
* Closes on `Escape`, overlay click, or close button.

### E. Smart Registration Form (`register.html` + `script.js`)
* 13 event tag chips with `data-min`/`data-max` class eligibility attributes.
* On `#reg-class` change, ineligible chips get `.disabled` class (grayed out, non-selectable).
* Previously selected ineligible events are automatically deselected.

### F. Google Sheets / Apps Script Integration (`doPost.gs` + `script.js`)
* **Form POST target:** Google Apps Script Web App Endpoint URL (`SCRIPT_URL`).
* **Payload Structure:**
```json
{
  "email": "string",
  "name": "string",
  "class": "string",
  "section": "string",
  "events": "string (comma-separated, e.g., 'glitchverse, jailbreak, ihe_codequest')",
  "timestamp": "ISO String / Localized string"
}
```
* **Apps Script Actions (`doPost.gs`):**
  1. Appends record to `CRYPTS_26_FORMS_DATABASE` sheet.
  2. Dynamically pulls organizer emails from an `ORGANISERS` sheet.
  3. Dispatches user confirmation email via `GmailApp.sendEmail`.
  4. Sends real-time notification emails to all listed admin organizers.

## 6. DEVELOPMENT INSTRUCTIONS FOR AGENTIC IDE
When tasked with generating new features or refactoring, follow these operational directives:
1. **Maintain Aesthetic Consistency:** Never introduce generic modern UI elements (e.g., standard rounded blue buttons, sans-serif fonts, or soft pastels). Everything must remain monospaced, dark, glowing, and terminal-inspired with HUD framing.
2. **Use HUD Components:** All new cards and containers should use `.hud-cut-corner` or `.hud-frame` classes with appropriate `.hud-tag` telemetry indicators.
3. **Defensive DOM Operations:** Ensure all JS querying handles null checks gracefully (`if (element) { ... }`) to prevent console exceptions.
4. **Responsive Mobile Compatibility:** Test mobile views carefully. Mobile navigation uses a full-screen `#mobile-menu` modal triggered by `#menu-toggle`.
5. **Data Validation:** Ensure all form controls maintain `required` attributes and sanitize inputs before submitting payload packets to Google Apps Script.
6. **Event Data Source of Truth:** The `EVENTS_DATA` object in `script.js` is the single source of truth for all event information. Keep it in sync with the brochure PDF.

## 7. UPCOMING ROADMAP & FEATURE OBJECTIVES
Use these guidelines when expanding the codebase:
* [x] **Populate Sections 04–07:** Resource Matrix, Chronos Schedule, FAQ, and Operators sections are now populated with interactive components.
* [x] **Terminal CTF / Mini-Games:** Terminal command parser expanded with navigation commands.
* [x] **Live Event Search & Filter:** Event cards support category filtering.
* [x] **Form Enhancements:** Smart class-based event filtering on registration portal.
* [ ] **Event Countdown Timers:** Add live countdown chips on each event card.
* [ ] **Phase-Gated Navigation:** Pre-Event → Live Event → Post-Event mode transitions.

## 8. BACKEND ARCHITECTURE & APPS SCRIPT SYNCHRONIZATION

* **Local `doPost.gs` File:** The `doPost.gs` file in this repository root is a static code replica of the backend logic hosted on Google Apps Script.
* **Execution Environment:** This file is NOT executed by Vercel or any static web host. The live application communicates with the Google Apps Script Web App Endpoint defined via `SCRIPT_URL` in `script.js`.
* **Development Directive:** When modifying `doPost.gs`, treat it as the single source of truth for the Google Apps Script backend. Assume any changes made to `doPost.gs` in this workspace will be manually deployed to the live Google Apps Script project by the developer.