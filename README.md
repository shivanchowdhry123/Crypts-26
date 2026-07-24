# CRYPTS 5.0 | OPG World School Technical Symposium
[![Netlify Status](https://api.netlify.com/api/v1/badges/077b6f09-3495-42d0-9483-4f949b5b6a46/deploy-status)](https://app.netlify.com/projects/crypts5/deploys)
[![Deploy static content to Pages](https://github.com/shivanchowdhry123/Crypts-5.0/actions/workflows/static.yml/badge.svg)](https://github.com/shivanchowdhry123/Crypts-5.0/actions/workflows/static.yml)
![Vercel Deploy](https://deploy-badge.vercel.app/vercel/crypts5)

Welcome to the official repository for the **CRYPTS 5.0** (Cryptic Realms of Yielding Problem Solving) Technical Symposium landing page and interactive terminal platform. Hosted by **OPG World School**, CRYPTS 5.0 is an intra-school event and technical festival designed for students in Classes 4–12.

Themed around *"The Singularity Overload"*, the platform emphasizes logic, security, system efficiency, hardware resilience, and terminal-first aesthetics.

---

## 🚀 Key Features

* **Cyberpunk Command Line Terminal Emulator**: An interactive terminal directly on the landing page where users can input system commands (like `help`, `status`, `about`, and `enroll`).
* **Interactive Enrollment Portal**: A fully integrated registration interface connected to a secure Google Apps Script backend.
* **Futuristic Glitch Aesthetics**: Curated color palette including Dark Void backgrounds, neon cyan accents, magenta core glows, and linear scanline animations.
* **Structured Information Matrix**: Seven distinct operational modules showcasing briefings, missions, temporal timelines, rulebooks, and team profiles.

---

## 📁 File Structure

```
├── index.html           # Main single-page application (7 core sections)
├── style.css            # Cyberpunk animations, custom CSS variables, glitch effects
├── script.js            # Interactive CLI, navigation logic, and Apps Script POST requests
├── doPost.gs            # Google Apps Script backend for database insertion & email notifications
├── logo/
│   └── logo.png         # Official CRYPTS 5.0 transparent PNG emblem
├── event_proposal.md    # Official module breakdown and rebranded event list
└── README.md            # This document
```

---

## 🎨 Visual System & Themes

| Element | Hex Code / Value | Description |
| :--- | :--- | :--- |
| **Dark Void** | `#020712` | Main background void |
| **Dark Card** | `#051024` / `#080808` | Background for panels and components |
| **Neon Cyan** | `#00f3ff` | Primary interactive highlights & glows |
| **Magenta Core**| `#d900bc` / `#ff00c1` | Secondary accents and alerts |
| **Typography** | `JetBrains Mono, monospace` | The official technical monospaced font family |

---

## ⌨️ Command Line Interface (CLI) Engine

The integrated terminal simulation (`script.js`) allows users to query system configurations and navigate using the following commands:

| Command | Action |
| :--- | :--- |
| `help` | Lists all available console commands |
| `clear` | Clears all text outputs from the console |
| `enroll` | Triggers a smooth scroll to the Enrollment Portal |
| `status` | Checks and prints simulated system operational status |
| `about` | Displays system information and symposium metadata |

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
  "events": "mission_decrypt, codequest",
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