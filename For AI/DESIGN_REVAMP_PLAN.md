# 🌐 CRYPTS 5.0 — Design Revamp Plan & Technical Benchmarks

**Project:** OPG World School TechFest (CRYPTS 5.0)  
**Target Aesthetic:** Cyberpunk HUD / Dark Industrial Tech  
**Document Purpose:** Strategic blueprint and architectural reference for AI agents and developers for the CRYPTS 5.0 website UI/UX.

---

## 1. Executive Summary & Design Vision

The objective of this design revamp is to elevate the CRYPTS 5.0 web platform into a world-class, high-contrast, interactive cyberpunk web application directly aligned with the official 31-page brochure ([CRYPTS 5.0.pdf](file:///Users/sarangchowdhry/repos/Other/Crypts-5.0/For%20AI/CRYPTS%205.0.pdf)). Drawing design principles from top-tier industry benchmarks (Awwwards, Linear, Vercel, Raycast, HackMIT, ETHGlobal, Devfolio, Lusion), the updated site features seamless motion design, multi-layered HUD framing, dynamic interactive event modals, and smart class-based registration.

---

## 2. Design Inspiration & Technical Benchmarks

### A. High-Contrast Cyberpunk & Dark Tech Aesthetics

1. **Awwwards: Cyberpunk Gallery** (`https://www.awwwards.com/websites/cyberpunk/`)
   * **Color Gradients:** Pitch-black void background (`#02030a`) paired with high-frequency neon cyan (`#00f3ff`), hot cyber magenta (`#ff007f` / `#d900bc`), and neon purple (`#8b00ff`).
   * **Micro-Interactions:** Custom glowing cursor trail and hover-triggered chromatic aberration / glitch effects on event cards.

2. **Official Brochure Visual Language**
   * **HUD Framing:** Chamfered cut corners (`clip-path`), L-shaped corner brackets (`.hud-cut-corner`), and telemetry tags (`[ 08BU1B779 ]`, `EVT-001`).
   * **Brochure-Accurate Badges:** High-contrast `MODE: OFFLINE` (pill with green pulsing LED) & `MODE: ONLINE` (electric cyan/magenta outline with cyan pulsing LED), glowing `ELIGIBILITY: CLASS X–Y` pills, and gold `DATE` badges.
   * **Monogram Badges:** `.event-icon-badge` with category-specific gradient fills (`GV`, `PP`, `BTS`, `SX`, `CP`, `PX`, `QW`, `JB`, `CQ`, `KR`, `GM`, `ES`, `BN`).
   * **Code Syntactic Decorators:** `#loading events`, `def event_x():` syntax banners.

3. **21st.dev Component Hub** (`https://21st.dev`)
   * **UI Mechanics:** Pre-engineered glowing border cards, animated gradient badges, and technical readouts.
   * **Card Depth:** Multi-layered z-index depth with subtle glassmorphism and interactive backdrop blurs.

---

### B. Terminal Intros & Motion Architectures

1. **Linear.app** (`https://linear.app`)
   * **Motion Design:** Subpixel smooth transitions and subtle dark-mode ambient background lighting / glow spots.
   * **Performance:** High-performance, low-overhead animation loops running at 60 FPS on mobile GPUs.

2. **Vercel Design System** (`https://vercel.com/design`)
   * **Typography:** Rigorous monospaced grid systems (`JetBrains Mono`) for technical readouts, metadata tags, and status displays.
   * **Viewport Adaptability:** Flawless responsive scaling across mobile, tablet, desktop, and ultra-wide viewports.

3. **Raycast** (`https://www.raycast.com`)
   * **CLI Styling:** Sleek command-palette interface doubling as an interactive quick navigation search bar (triggered via `Ctrl + K`).

---

### C. Interactive Event Platforms & Dynamic Portals

1. **HackMIT** (`https://hackmit.org`)
   * **Schedule Interface:** Interactive, tabbed timeline cards with real-time status indicators (*"LIVE NOW"*, *"UPCOMING"*, *"COMPLETED"*).
   * **FAQ Architecture:** High-contrast accordion widgets matching the broader dark industrial theme.

2. **ETHGlobal** (`https://ethglobal.com`)
   * **Phase-Gated Navigation:** Structural transition handling between **Pre-Event**, **Active Mode**, and **Post-Event**.

3. **Devfolio** (`https://devfolio.co`)
   * **Registration UX:** Multi-select category tags, smart class-based eligibility filtering, inline field validation, and responsive feedback state.

4. **Lusion.co** (`https://lusion.co`)
   * **Atmosphere:** Real-time particle grid canvas, noise/grain texture overlay, and pulsing circuit board grid.

---

## 3. Current Implementation Status

| Feature Area | Current State in CRYPTS 5.0 | Status |
| :--- | :--- | :--- |
| **Background & Atmosphere** | Interactive particle grid + animated 40px circuit board grid + SVG noise grain overlay | ✅ Complete |
| **Card Mechanics** | HUD chamfered cut-corner frames (`.hud-cut-corner`), animated gradient glow borders, telemetry tags | ✅ Complete |
| **CLI / Terminal** | Append-only interactive terminal + Raycast-style command palette (`Ctrl+K`) | ✅ Complete |
| **Schedule & FAQs** | HackMIT interactive tabbed timeline (Morning/Afternoon/Closing) + animated FAQ accordions | ✅ Complete |
| **Event Modules** | 13 brochure-accurate events with monogram badges, code decorators, mode/eligibility pills | ✅ Complete |
| **Event Detail Modals** | Full-screen HUD modal with complete brochure data (rules, criteria, dates, contacts) | ✅ Complete |
| **Tagline Animation** | Character-by-character typewriter animation + gradient sub-tagline reveal | ✅ Complete |
| **Section Transitions** | Scroll-triggered `body[data-section]` observer transitioning ambient blob colors | ✅ Complete |
| **Registration Form** | 13 brochure event chips + smart class-based filtering (`data-min`/`data-max`) + live validation | ✅ Complete |

---

## 4. Architectural Revamp Roadmap

### Phase 1: Core Design System & Aesthetic Tokens (`style.css`)
* [x] **Color Palette Lockdown:**
  * Background Void: `#02030a`
  * Card Surface: `rgba(5, 8, 24, 0.85)` with `backdrop-filter: blur(12px)`
  * Neon Cyan Primary: `#00f3ff` (Glow: `0 0 20px rgba(0, 243, 255, 0.4)`)
  * Cyber Magenta Secondary: `#ff007f` / `#d900bc`
  * Purple Neon Tertiary: `#8b00ff`
  * Gold Accent: `#ffd700`
* [x] **Typography & Grid Hygiene:**
  * `JetBrains Mono` enforced across all headers, status badges, and buttons.
  * Standardized section padding, grid gutters, and card aspect ratios.
* [x] **Card Depth & Micro-Interactions:**
  * HUD cut-corner frames with L-shaped brackets and telemetry tags.
  * Custom cursor ring and trail tracking.

### Phase 2: Atmospheric Overlays & Motion Engine (`style.css` + `script.js`)
* [x] **Particle Grid Canvas:** Light-weight canvas particle network reacting to mouse pointer movement.
* [x] **Noise / Grain Overlay:** SVG `feTurbulence` noise overlay on `body::after` (3.5% opacity, `mix-blend-mode: overlay`).
* [x] **Animated Circuit Grid:** `repeating-linear-gradient` grid at 40px with `@keyframes gridPulse` (8s cycle).
* [x] **Tagline Typing Animation:** Character-by-character typewriter for *"BORN FROM CHAOS, BUILT FOR INNOVATION"*.
* [x] **Scroll Section Color Transitions:** `IntersectionObserver` syncing `body[data-section]` with CSS ambient blob shifts.

### Phase 3: Modernized Terminal & Raycast Command Palette (`index.html` & `script.js`)
* [x] `#terminal-body` interactive CLI with navigation commands (`help`, `clear`, `enroll`, `modules`, `matrix`, `schedule`, `team`, `status`, `about`).
* [x] Keyboard shortcut overlay (`Ctrl + K`) command palette.

### Phase 4: Interactive Module & Content Sections Expansion
* [x] **Section 02 (`#modules`):** 13 brochure-accurate event cards with monogram badges, code syntax prefixes, mode pills, and date badges.
* [x] **Event Detail Modals:** Click-to-expand HUD modals populated from `EVENTS_DATA` with full rules, judging criteria, dates, and contacts.
* [x] **Section 04 (`#matrix`):** Interactive Resource Matrix with downloadable rulebooks & asset kits.
* [x] **Section 05 (`#chronos`):** Tabbed timeline schedule with real-time status highlights.
* [x] **Section 06 (`#resolution`):** Accordion FAQ system.
* [x] **Section 07 (`#operators`):** Team bios with holographic hover effect.

### Phase 5: Enrollment Portal & Registration UX Overhaul (`register.html` + `script.js`)
* [x] 13 brochure event chips replacing the old 6 events.
* [x] Smart class-based eligibility filtering (`data-min`/`data-max`) automatically disabling ineligible events on class selection.
* [x] Real-time input validation feedback before submitting payload to Google Apps Script (`doPost.gs`).

---

## 5. Developer & AI Agent Execution Instructions

When implementing future features:
1. **Never Compromise Monospaced Integrity:** Keep the technical aesthetic crisp and clean using `JetBrains Mono`.
2. **Prioritize Smooth Performance:** Keep JS scroll listeners throttled using `requestAnimationFrame` and `IntersectionObserver`.
3. **Reference Brochure PDF:** Sourced from `For AI/CRYPTS 5.0.pdf` for all event metadata, dates, and contacts.
