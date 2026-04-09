<p align="center">
  <a href="https://vanshsingh1203.vercel.app/">
    <img src="https://img.shields.io/badge/🚀%20Live%20Site-vanshsingh1203.vercel.app-ff4757?style=for-the-badge" alt="Live Site" />
  </a>
  &nbsp;
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React" />
  <img src="https://img.shields.io/badge/Framer_Motion-11-FF0066?style=for-the-badge&logo=framer&logoColor=white" alt="Framer Motion" />
  <img src="https://img.shields.io/badge/License-MIT-22c55e?style=for-the-badge" alt="License" />
</p>

<h1 align="center">Vansh Singh — Portfolio</h1>

<p align="center">
  Personal portfolio built with an <strong>Industrial Skeuomorphism</strong> design language — neumorphic surfaces,
  physical control-room metaphors, and a precision CNC cursor. Covers supply chain analytics, operations engineering,
  and full-stack development work.
</p>

---

## Design Philosophy

> *"Every surface should feel like it was machined, not printed."*

**Industrial Skeuomorphism** marries the tactile depth of skeuomorphic design with the utility of industrial equipment UI:

| Principle | Implementation |
|-----------|---------------|
| **Neumorphic depth** | Dual-shadow system — one dark shadow below-right, one light highlight above-left, simulating a single top-left light source |
| **Physical metaphors** | Corner screws, ventilation slots, LED status indicators, recessed readout panels |
| **Safety orange accent** | `#ff4757` — inspired by hazard markings and control-room warning lights |
| **Monospace type** | JetBrains Mono for all labels, readouts, and micro-copy |
| **Chassis texture** | SVG fractalNoise overlay at 2.5% opacity for matte plastic feel |

Both **light** (silver chassis) and **dark** (anthracite chassis) modes share identical shadow logic — only the base color shifts.

---

## Features

- **Industrial Skeuomorphic UI** — neumorphic cards, screws, vent slots, LED indicators throughout
- **Dark / Light chassis toggle** — persistent via `localStorage`, smooth 0.4 s transition
- **Canvas mouse trail** — CNC precision reticle with spark particles and XY coordinate readout
- **Live visitor counter** — real-time hit counter via `counterapi.dev`, amber→green LED on load
- **Framer Motion animations** — mechanical spring easing, stagger reveals, `whileTap` press feedback
- **Fully responsive** — mobile (<768 px), tablet (768–1023 px), desktop (1024 px+) breakpoints
- **Working contact form** — Formspree backend, LED focus rings, recessed input styling
- **Accessible** — `:focus-visible` rings, 44 px+ touch targets, `pointer: fine` cursor guard

---

## Tech Stack

| Category | Technologies |
|----------|-------------|
| **Framework** | React 19 |
| **Animations** | Framer Motion 11 |
| **Icons** | Lucide React |
| **Styling** | CSS-in-JS + CSS Custom Properties |
| **Fonts** | Inter (body) · JetBrains Mono (labels) via Google Fonts |
| **Contact** | Formspree |
| **Hit Counter** | counterapi.dev |
| **Deployment** | Vercel |

---

## Project Structure

```
portfolio/
├── public/
│   ├── index.html          # Google Fonts, meta tags
│   └── resume.pdf
└── src/
    ├── App.js              # Root — theme state, intersection observer
    ├── index.js            # Entry point
    ├── index.css           # CSS custom properties, keyframes, global rules
    ├── tokens.js           # LIGHT / DARK color token objects
    ├── data.js             # NAV, PROJECTS, SKILLS, TOOLS, EXPERIENCES
    ├── components/
    │   ├── ui/
    │   │   ├── Card.jsx        # Neumorphic card (screws + vent slots)
    │   │   ├── Section.jsx     # Responsive section wrapper
    │   │   └── SectionTitle.jsx
    │   ├── Header.jsx          # Fixed nav, LED logo, mobile drawer
    │   ├── Hero.jsx            # Control-room intro + DevicePanel metrics
    │   ├── About.jsx           # Stat cards, education, availability panel
    │   ├── Projects.jsx        # Featured + academic project cards
    │   ├── Skills.jsx          # Skill bars, tools grid, certifications
    │   ├── Experience.jsx      # Vertical timeline with pipe connector
    │   ├── Resume.jsx          # Download + preview CTAs
    │   ├── Contact.jsx         # Formspree form with LED inputs
    │   ├── Footer.jsx          # Visitor counter + social links
    │   └── MouseTrail.jsx      # Canvas reticle + spark particles
    └── hooks/
        ├── useBreakpoint.js    # { isSmall, isMobile, isTablet, width }
        └── useVisitorCount.js  # counterapi.dev hit counter
```

---

## Quick Start

**Prerequisites:** Node.js 18+, npm

```bash
# Clone
git clone https://github.com/Vanshsingh1203/portfolio.git
cd portfolio

# Install
npm install

# Dev server → http://localhost:3000
npm start

# Production build
npm run build
```

> Dev visits are tracked under a separate `portfolio-v1-dev` counter key so localhost hits never inflate the production count.

---

## Design System — Shadow Reference

```css
/* Light chassis (bg: #e0e5ec) */
--shadow-card:     8px 8px 16px #babecc, -8px -8px 16px #ffffff;
--shadow-floating: 12px 12px 24px #babecc, -12px -12px 24px #ffffff,
                   inset 1px 1px 0 rgba(255,255,255,0.6);
--shadow-pressed:  inset 6px 6px 12px #babecc, inset -6px -6px 12px #ffffff;
--shadow-recessed: inset 4px 4px 8px #babecc, inset -4px -4px 8px #ffffff;

/* Dark chassis (bg: #1e2235) */
--shadow-card:     8px 8px 16px #151929, -8px -8px 16px #27304f;
--shadow-floating: 12px 12px 24px #151929, -12px -12px 24px #27304f,
                   inset 1px 1px 0 rgba(255,255,255,0.04);
--shadow-pressed:  inset 6px 6px 12px #151929, inset -6px -6px 12px #27304f;
--shadow-recessed: inset 4px 4px 8px #151929, inset -4px -4px 8px #27304f;
```

---

## Featured Projects

| Project | Description | Stack |
|---------|-------------|-------|
| **[Manufacturing Operations Platform](https://github.com/Vanshsingh1203)** | Real-time OEE tracking, predictive maintenance, SQL analytics | React · PostgreSQL · FastAPI |
| **[NGO Inventory System](https://ngo-inventory-v2.vercel.app)** | Full-stack donation tracking for non-profits | React · Node.js · MongoDB |
| **[ChainGuard](https://vanshsingh1203.github.io/chainguard-pharma-dashboard)** | Pharma cold-chain compliance dashboard | React · Python · IoT |
| **[Demand Forecasting Tool](https://demand-forecast-9hjy8sujmqrpxzcxnlgacb.streamlit.app/)** | ML-powered inventory optimization | Python · Streamlit · scikit-learn |

---

## Author

**Vansh Singh** — Supply Chain & Operations Analytics @ Northeastern University

<p>
  <a href="https://www.linkedin.com/in/vansh-singh1203">
    <img src="https://img.shields.io/badge/LinkedIn-vansh--singh1203-0077B5?style=flat-square&logo=linkedin" alt="LinkedIn" />
  </a>
  &nbsp;
  <a href="https://github.com/Vanshsingh1203">
    <img src="https://img.shields.io/badge/GitHub-Vanshsingh1203-181717?style=flat-square&logo=github" alt="GitHub" />
  </a>
  &nbsp;
  <a href="mailto:singh.v2@northeastern.edu">
    <img src="https://img.shields.io/badge/Email-singh.v2@northeastern.edu-ff4757?style=flat-square&logo=gmail&logoColor=white" alt="Email" />
  </a>
</p>

---

## License

Open source under the [MIT License](LICENSE).

---

<p align="center">
  <sub>Designed & built by Vansh Singh · Boston, MA</sub>
</p>
