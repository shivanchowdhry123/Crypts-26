# CRYPTS 5.0 | OPG World School TechFest
[![Netlify Status](https://api.netlify.com/api/v1/badges/077b6f09-3495-42d0-9483-4f949b5b6a46/deploy-status)](https://app.netlify.com/projects/crypts5/deploys)
[![Deploy static content to Pages](https://github.com/shivanchowdhry123/Crypts-5.0/actions/workflows/static.yml/badge.svg)](https://github.com/shivanchowdhry123/Crypts-5.0/actions/workflows/static.yml)
![Vercel Deploy](https://deploy-badge.vercel.app/vercel/crypts5)

Welcome to the official repository for the **CRYPTS 5.0** (Cryptic Realms of Yielding Problem Solving) TechFest landing page and interactive terminal platform. Hosted by **OPG World School**, CRYPTS 5.0 is an intra-school event and technical festival designed for students in Classes 4–12.

Themed around *"Born From Chaos, Built for Innovation"*, the platform emphasizes logic, security, system efficiency, hardware resilience, and terminal-first aesthetics.

---

## 🚀 Key Features

* **Cyberpunk HUD Design System**: Chamfered cut-corner card frames, dual-tone gradient borders, monogram event badges, Python-style code decorators, and brochure-accurate status pills.
* **Interactive Command Line Terminal**: An interactive terminal directly on the landing page where users can input system commands (like `help`, `status`, `about`, and `enroll`).
* **Animated Circuit Board Grid**: Faint pulsing grid overlay with animated opacity cycling for the PCB-trace cyberpunk aesthetic.
* **Noise/Grain Texture Overlay**: Subtle film grain across all pages for tactile depth.
* **Scroll-Triggered Section Color Transitions**: Ambient blob colors shift per-section (cyan → magenta → violet) as you scroll.
* **Tagline Typing Animation**: *"BORN FROM CHAOS, BUILT FOR INNOVATION"* typed character-by-character with blinking cursor, followed by gradient sub-tagline reveal.
* **Event Detail Modals**: Click any event card to open a HUD-framed modal with full rules, judgment criteria, date, and contact info (sourced from the official brochure).
* **Smart Registration Form**: 13 event tag chips with class-based eligibility filtering — only shows events you're eligible for based on your selected class.
* **Futuristic Glitch Aesthetics**: Curated color palette including Dark Void backgrounds, neon cyan accents, magenta core glows, purple neon, gold accents, and linear scanline animations.
* **Structured Information Matrix**: Seven distinct operational modules showcasing briefings, missions, temporal timelines, rulebooks, and team profiles.

---

## 🎯 Event Lineup (13 Events)

| # | Event | Mode | Eligibility | Date |
|---|-------|------|-------------|------|
| 1 | **Glitchverse** | Offline | Class 6–10 | Sept 17 |
| 2 | **PixelPulse** | Online | Class 8–12 | Sept 25 |
| 3 | **Byte the Site** | Online | Class 6–12 | Sept 25 |
| 4 | **Scratch Xplorers** | Offline | Class 4–6 | Sept 18 |
| 5 | **IHE CinePrism** | Online | Class 6–12 | Sept 25 |
| 6 | **Prompt Paradox** | Offline | Class 8–12 | Sept 21 |
| 7 | **QWERTY 4.0** | Offline | Class 6–12 | Sept 22 |
| 8 | **Jailbreak** | Offline | Class 6–12 | Sept 23 |
| 9 | **IHE CodeQuest** | Offline | Class 11–12 | Sept 28 |
| 10 | **IHE Kernel** | Offline | Class 9–12 | Sept 24 |
| 11 | **Game Makers** | Offline | Class 10–12 | Sept 25 |
| 12 | **L'Arène Esports** | Online | Class 10–12 | Sept 19–26 |
| 13 | **BizTech Nexus** | Offline | Class 10–12 | Sept 30 |

---

## 📁 File Structure

```
├── index.html           # Main single-page application (7 core sections)
├── register.html        # Standalone registration portal with smart event filtering
├── style.css            # Cyberpunk animations, HUD frames, design tokens, overlays
├── script.js            # Terminal CLI, event modals, typing animation, scroll observer
├── doPost.gs            # Google Apps Script backend for database insertion & email notifications
├── logo/
│   └── logo.png         # Official CRYPTS 5.0 transparent PNG emblem
├── For AI/
│   ├── AGENT_CONTEXT_PROMPT.md   # Developer guide for AI agents
│   ├── DESIGN_REVAMP_PLAN.md     # Design benchmark & roadmap reference
│   └── CRYPTS 5.0.pdf            # Official 31-page event brochure
└── README.md            # This document
```

---

## 🎨 Visual System & Themes

| Element | Hex Code / Value | Description |
| :--- | :--- | :--- |
| **Dark Void** | `#02030a` | Main background void |
| **Dark Card** | `#051024` / `rgba(5, 8, 24, 0.85)` | Background for panels and components |
| **Neon Cyan** | `#00f3ff` | Primary interactive highlights & glows |
| **Magenta Hot** | `#ff007f` / `#d900bc` | Secondary accents, badges, and alerts |
| **Purple Neon** | `#8b00ff` | Tertiary accent for section transitions |
| **Gold Accent** | `#ffd700` | Date badges and highlight elements |
| **Typography** | `JetBrains Mono, monospace` | The official technical monospaced font family |
| **Noise Overlay** | SVG feTurbulence @ 3.5% opacity | Film grain texture across all pages |
| **Circuit Grid** | `repeating-linear-gradient` @ 40px | Animated PCB grid pulsing at 8s cycle |

---

## ⌨️ Command Line Interface (CLI) Engine

The integrated terminal simulation (`script.js`) allows users to query system configurations and navigate using the following commands:

| Command | Action |
| :--- | :--- |
| `help` | Lists all available console commands |
| `clear` | Clears all text outputs from the console |
| `enroll` | Redirects to the Registration Portal |
| `modules` | Navigates to Event Modules section |
| `matrix` | Navigates to Resource Matrix section |
| `schedule` | Navigates to Chronos Schedule section |
| `team` | Navigates to Operators section |
| `status` | Checks and prints simulated system operational status |
| `about` | Displays system information and TechFest metadata |

---

## ☁️ Backend Integration (Google Apps Script)

The registration workflow submits payload packets directly to a **Google Apps Script Web App Endpoint** (`doPost.gs`).

### Registration Data Schema:
```json
{
  "email": "student@node.edu",
  "name": "Operator Name",
  "class": "10",
  "section": "A",
  "events": "glitchverse, jailbreak, ihe_codequest",
  "timestamp": "ISO-8601 Timestamp"
}
```

> [!NOTE]
> Upon submission, the Apps Script writes the data to the central Google Sheet (`CRYPTS_5.0_FORMS_DATABASE`), triggers email confirmations to the participant, and notifies all listed administrative organizers.

---

## 🛠️ Local Development & Deployment

### Run Locally:
1. Clone the repository:
   ```bash
   git clone https://github.com/shivanchowdhry123/Crypts-5.0.git
   ```
2. Open `index.html` directly in your web browser, or serve it using any local development server (e.g., Live Server in VS Code, or Python's `http.server`):
   ```bash
   python -m http.server 8000
   ```

### Deployment:
The site is configured for automated builds and static hosting deployments:
* **Netlify**: Auto-deployed on git commits.
* **GitHub Pages**: Automated deployment workflow is setup under `.github/workflows/static.yml`.
* **Vercel**: Deployable as a static project.

### Google Apps Script Integration Note

- **Local File (`doPost.gs`):** The `doPost.gs` file in the root directory is a local copy of the code currently running in the Google Apps Script editor.
- **Hosting & Execution:** This `.gs` file is ignored by static hosts like Vercel and Netlify. Actual requests from `script.js` execute remotely on Google's infrastructure via the `SCRIPT_URL`.
- **Workflow:** Updates to backend logic should be maintained in `doPost.gs` and manually pasted/deployed into the Google Apps Script project console when deploying changes.