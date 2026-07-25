# SYSTEM CONTEXT & DEVELOPER GUIDE: CRYPTS 5.0 WEBSITE

## 1. PROJECT OVERVIEW
* **Project Name:** CRYPTS 5.0 Technical Symposium Website
* **Organization:** OPG World School
* **Core Concept:** An industrial cyberpunk-themed landing page and interactive terminal platform for an annual school tech fest.
* **Tagline/Theme:** *The Singularity Overload* — Highlighting efficiency, logic, security, hardware, and AI resilience.
* **Primary Target Audience:** Middle and High School students (Classes 4–12), school admins, and participating event teams.

## 2. TECH STACK & FILE ARCHITECTURE
The current project structure consists of the following key files:

```
├── index.html           # Main single-page application (7 core sections)
├── style.css            # Cyberpunk animations, custom CSS variables, glitch effects
├── script.js            # Interactive CLI, navigation logic, and Apps Script POST requests
├── doPost.gs            # Google Apps Script backend for database insertion & email notifications
├── logo/
│   └── logo.png         # Official CRYPTS 5.0 transparent PNG emblem
├── event_proposal.md    # Official module breakdown and rebranded event list
├── event_proposal.tex   # LaTeX compilation file for formal PDF submission
└── proposal_print.tex   # Clean printable version of the proposal
```

### Key CDN Dependencies:
* **Tailwind CSS:** `https://cdn.tailwindcss.com`
* **Google Fonts:** `JetBrains Mono` (`https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&display=swap`)

## 3. DESIGN SYSTEM & VISUAL DIRECTIVE
When adding or modifying components, strict adherence to the visual language is required:

### Color Palette:
* **Dark Void (Background):** `#020712`
* **Dark Card (Surface):** `#051024` / `#080808`
* **Neon Cyan (Primary Accent):** `#00f3ff` (Glow: `rgba(0, 243, 255, 0.3)`)
* **Magenta Core (Secondary Accent):** `#d900bc` / Bright Magenta `#ff00c1`
* **Border Highlights:** `rgba(255, 255, 255, 0.05)` or `#1a2a44`

### Typography & Aesthetic Tokens:
* **Font Family:** `JetBrains Mono, monospace`
* **Scanlines:** Fixed overlays using linear gradients and `@keyframes scanline`.
* **Glitch Engine:** Applied via CSS attribute selectors `[data-text]` using pseudo-elements `::before` and `::after` with clip-path animations.
* **Tone:** Terminal-first, technical, low-overhead, cyberpunk UI/UX.

## 4. DOM STRUCTURE & SECTIONS
The site is organized into 7 sequential operational sections indexed via anchor links:
1. `01_BRIEFING` (`#briefing`): Hero banner, main logo render, live UTC clock, and interactive CLI terminal emulator (`#terminal-body`).
2. `02_EVENT_MODULES` (`#modules`): Grid display of event categories (*MISSION_DECRYPT*, *CODEQUEST*, *WEB_WERKZ*, etc.).
3. `03_ENROLLMENT_PORTAL` (`#enrollment`): Interactive multi-field registration form.
4. `04_RESOURCE_MATRIX` (`#matrix`): Knowledge base and rules download center (currently placeholder).
5. `05_CHRONOS_SCHEDULE` (`#chronos`): Timeline sequence / schedule grid (currently placeholder).
6. `06_QUERY_RESOLUTION` (`#resolution`): FAQ section and contact modal (currently placeholder).
7. `07_CORE_OPERATORS` (`#operators`): Organizing team member bios and credits (currently placeholder).

## 5. EXISTING INTERACTIVE SYSTEMS

### A. Terminal CLI Engine (`script.js`)
* Real-time scrolling terminal box located in `#briefing`.
* Listens to keydown events on `#terminal-input`.
* Supported commands:
  * `help` - Lists commands.
  * `clear` - Clears logs.
  * `enroll` - Smooth scrolls to `#enrollment`.
  * `status` - Displays simulated system operational state.
  * `about` - Displays fest metadata.

### B. Google Sheets / Apps Script Integration (`doPost.gs` + `script.js`)
* **Form POST target:** Google Apps Script Web App Endpoint URL (`SCRIPT_URL`).
* **Payload Structure:**
```json
{
  "email": "string",
  "name": "string",
  "class": "string",
  "section": "string",
  "events": "string (comma-separated)",
  "timestamp": "ISO String / Localized string"
}
```
* **Apps Script Actions (`doPost.gs`):**
  1. Appends record to `CRYPTS_5.0_FORMS_DATABASE` sheet.
  2. Dynamically pulls organizer emails from an `ORGANISERS` sheet.
  3. Dispatches user confirmation email via `GmailApp.sendEmail`.
  4. Sends real-time notification emails to all listed admin organizers.

## 6. DEVELOPMENT INSTRUCTIONS FOR AGENTIC IDE
When tasked with generating new features or refactoring, follow these operational directives:
1. **Maintain Aesthetic Consistency:** Never introduce generic modern UI elements (e.g., standard rounded blue buttons, sans-serif fonts, or soft pastels). Everything must remain monospaced, dark, glowing, and terminal-inspired.
2. **Defensive DOM Operations:** Ensure all JS querying handles null checks gracefully (`if (element) { ... }`) to prevent console exceptions.
3. **Responsive Mobile Compatibility:** Test mobile views carefully. Mobile navigation uses a full-screen `#mobile-menu` modal triggered by `#menu-toggle`.
4. **Data Validation:** Ensure all form controls maintain `required` attributes and sanitize inputs before submitting payload packets to Google Apps Script.

## 7. UPCOMING ROADMAP & FEATURE OBJECTIVES
Use these guidelines when expanding the codebase:
* [ ] **Populate Sections 04–07:** Replace placeholder text in `#matrix`, `#chronos`, `#resolution`, and `#operators` with interactive components (e.g., downloadable PDF rulebooks, accordion FAQs, schedule timelines, and team cards).
* [ ] **Terminal CTF / Mini-Games:** Expand `script.js` command parser to allow mini terminal Easter eggs, hidden decoding challenges, or interactive cipher games directly in the CLI box.
* [ ] **Live Event Search & Filter:** Add real-time search/category filtering for the `#modules` section.
* [ ] **Form Enhancements:** Add multi-step verification or dynamic class-based event filtering to the `#enrollment` portal.

## 8. BACKEND ARCHITECTURE & APPS SCRIPT SYNCHRONIZATION

* **Local `doPost.gs` File:** The `doPost.gs` file in this repository root is a static code replica of the backend logic hosted on Google Apps Script.
* **Execution Environment:** This file is NOT executed by Vercel or any static web host. The live application communicates with the Google Apps Script Web App Endpoint defined via `SCRIPT_URL` in `script.js`.
* **Development Directive:** When modifying `doPost.gs`, treat it as the single source of truth for the Google Apps Script backend. Assume any changes made to `doPost.gs` in this workspace will be manually deployed to the live Google Apps Script project by the developer.