# 📄 iloveresume

### The free, open-source resume generator that respects your privacy.

**Create professional, ATS-friendly resumes in minutes — no sign-up, no server, no paywall.**
Everything runs in your browser. Your data never leaves your device.

[![Live Demo](https://img.shields.io/badge/Live_Demo-Try_Now-4f6ef7?style=for-the-badge&logo=googlechrome&logoColor=white)](https://uolav.github.io/iloveresume/)
[![License: CC BY 4.0](https://img.shields.io/badge/License-CC%20BY%204.0-green?style=for-the-badge)](LICENSE)
[![Templates](https://img.shields.io/badge/Templates-4-orange?style=for-the-badge)](#-templates)
[![Languages](https://img.shields.io/badge/Languages-4-blue?style=for-the-badge)](#-at-a-glance)

[![Zero install](https://img.shields.io/badge/Zero_Install-Just_open_a_URL-333?style=flat-square)]()
[![Works offline](https://img.shields.io/badge/Works_Offline-Service_Worker-333?style=flat-square)]()
[![100% private](https://img.shields.io/badge/100%25_Private-localStorage_only-333?style=flat-square)]()
[![Vanilla JS](https://img.shields.io/badge/No_Framework-Vanilla_JS-333?style=flat-square)]()

## 💡 Why iloveresume?

Most resume builders require an account, store your data on their servers, or lock templates behind a paywall.

| | iloveresume | Typical SaaS |
|---|---|---|
| **Price** | Free forever | Free trial → $10+/mo |
| **Privacy** | 100% local | Your data on their servers |
| **Account required** | No | Yes |
| **Offline support** | Yes | No |
| **Open source** | CC BY 4.0 | Proprietary |
| **Ads** | None | Usually |
| **Watermark on PDF** | Never | Often on free tier |

## ⚡ At a Glance

| | |
|---|---|
| 🎨 **4 templates** | Modern · Classic · Bold · Compact — each with custom accent colors |
| 🗣️ **4 languages** | French · English · German · Spanish |
| 📄 **PDF export** | High-fidelity A4, multi-page with continuation headers |
| 🌙 **Dark mode** | Full dark theme for comfortable editing |
| 📱 **Mobile friendly** | Responsive design with mobile CV preview |
| 📦 **0 dependencies** | Just open `index.html` — no build, no install |

## ✨ Features

### 📝 Complete Resume Sections
Personal info · Professional summary · Work experience · Education · Skills (with proficiency levels) · Languages · Certifications · Interests · **Projects** · **Volunteer work** · **Custom sections** (unlimited, freeform).

### 🎨 4 Templates

- **Modern** — Clean sidebar layout with accent color highlights
- **Classic** — Traditional two-column, professional and timeless
- **Bold** — Eye-catching headers with colored accents
- **Compact** — Dense, space-efficient for experienced professionals

Each template supports custom accent colors and adapts to all sections dynamically.

### 📑 Professional PDF Export
High-fidelity A4 PDFs with smart multi-page detection and continuation headers. Print-ready, ATS-compatible formatting.

### 🔗 Share & Export
**Share by link** — generate a compressed URL containing your entire resume. Recipients see a live preview and can download the PDF. No server needed.

**JSON import/export** — save your resume as a `.json` file, reload it anytime.

### 🕐 History & Versioning
Automatic save after every change · up to 20 snapshots in local history · restore any previous version with one click.

### 🎨 Modern Interface
Live A4 preview · 5-step guided stepper · dark mode toggle · floating label inputs · debounced rendering · PWA installable.

## 🚀 Getting Started

**Use online** (recommended):

> **[uolav.github.io/iloveresume](https://uolav.github.io/iloveresume/)** — works instantly, no install.

**Self-host:**

```bash
git clone https://github.com/uolaV/iloveresume.git
cd iloveresume
open index.html   # or: npx serve .
```

No build step. No `npm install`. Zero configuration.

## 🏗️ Architecture

```
iloveresume/
├── index.html      → Structure, forms, modals, stepper
├── style.css       → Custom styles (floating labels, stepper, A4 preview, dark mode…)
├── templates.js    → 4 resume templates (pure functions → HTML strings)
├── app.js          → All logic — state, rendering, PDF export, i18n, share
└── sw.js           → Service Worker for offline support
```

**Stack:** Vanilla JS · Tailwind CSS (CDN) · html2pdf.js · pako · Google Fonts (Inter)

## 🔒 Privacy & Data

All resume data is stored **exclusively in your browser's localStorage**. Nothing is ever sent to a server.

| Service | Purpose | When |
|---|---|---|
| CDN (Google Fonts, Tailwind, html2pdf) | Static assets | On page load |

That's it. No analytics, no tracking, no cookies.

## ❓ FAQ

<details>
<summary><strong>Is iloveresume really free?</strong></summary>
Yes. 100% free, open-source (CC BY 4.0), no premium plan, no feature limits, no ads. Forever.
</details>

<details>
<summary><strong>Where is my data stored?</strong></summary>
Entirely in your browser's localStorage. Your resume and settings never leave your device. There is no server, no database, no account.
</details>

<details>
<summary><strong>Can I use it offline?</strong></summary>
Yes. After your first visit, the Service Worker caches all assets. You can create and download resumes without an internet connection.
</details>

<details>
<summary><strong>Does it work on mobile?</strong></summary>
Yes. The interface is fully responsive. A floating button lets you preview your CV fullscreen on small screens.
</details>

<details>
<summary><strong>Are the PDFs ATS-friendly?</strong></summary>
Yes. Templates use clean HTML structure with standard fonts, no tables-for-layout, and proper heading hierarchy — optimized for Applicant Tracking Systems.
</details>

<details>
<summary><strong>Can I share my resume without generating a PDF?</strong></summary>
Yes. Use the Share button to copy a link that contains your full resume state (gzip compressed). The recipient sees a live preview and can download the PDF themselves.
</details>

<details>
<summary><strong>How many resumes can I create?</strong></summary>
Currently one at a time, stored in localStorage. You can export/import JSON files to manage multiple versions.
</details>

## 🧾 Also by uolaV

| Project | Description | |
|---|---|---|
| **[iloveinvoice](https://github.com/uolaV/iloveinvoice)** | Free, open-source invoice generator — 64 countries, 10 languages, full tax compliance. Same philosophy: no sign-up, no server, 100% private. | [Try it →](https://uolav.github.io/iloveinvoice/) |

## 🤝 Contributing

Contributions are welcome! Fork the repo, make your changes, and open a pull request. No build tools needed — just edit the source files.

## 📄 License

[CC BY 4.0](LICENSE) — free to use, share, and adapt. Attribution required: credit **uolaV** and link back to this repository.

---

**Made with ❤️ for job seekers who value simplicity and privacy.**

[Try iloveresume →](https://uolav.github.io/iloveresume/)
