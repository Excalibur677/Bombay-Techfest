# Techfest CA Program — Cyberpunk Landing Page
**College Ambassador Program | Techfest, IIT Bombay**

A responsive cyberpunk-themed landing page built as part of the Techfest 2026 College Ambassador Program task — Interface Design (TASK_003).

---

## Live Preview
[GitHub Repository](https://github.com/Excalibur677/Bombay-Techfest)

---

## About the Project

The page is built around a single narrative concept: the visitor is a candidate being scanned, recruited, and augmented by Techfest. Every section is a phase of that augmentation sequence, creating an immersive experience rather than a standard information page.

---

## Features

- Cyberpunk/cyborg aesthetic with custom color system
- Glitch animation on hero title triggered at random intervals
- HUD typing animation cycling through system status lines
- Animated scan line traversing the hero section
- Count-up animation on stats triggered on scroll
- 3D card tilt effect on mouse movement
- Diagonal section dividers using CSS clip-path
- Scroll-triggered entrance animations via IntersectionObserver
- Fully responsive down to 375px mobile width
- Zero dependencies — pure HTML, CSS, and Vanilla JS

---

## Sections

| Section | Purpose |
|---|---|
| Hero | Full-viewport boot sequence with HUD overlays |
| Briefing | Animated statistics — 175K+ attendees, 2500+ colleges |
| Augmentation | 4 benefit cards with 3D tilt and glow on hover |
| Mission Files | CA task cards with status indicators |
| Reward Matrix | 5-tier reward list with amber badges |
| Initiation | CTA section linking to ca.techfest.org |

---

## Tech Stack

- HTML5
- CSS3 (custom properties, clip-path, keyframe animations)
- Vanilla JavaScript (IntersectionObserver, requestAnimationFrame)
- Google Fonts — Bebas Neue, Chakra Petch, JetBrains Mono

---

## Color System

| Token | Value | Role |
|---|---|---|
| `--bg` | `#020810` | Page background |
| `--cyan` | `#00F0FF` | Primary accent |
| `--magenta` | `#FF0055` | Secondary accent / CTA |
| `--amber` | `#FFB800` | Tier badges |
| `--text` | `#C8D8E8` | Body text |

---

## Run Locally

No build tools required.

```bash
git clone https://github.com/Excalibur677/Bombay-Techfest.git
cd Bombay-Techfest
```

Open `index.html` with Live Server in VS Code or any local server.

---

## Project Structure

```
techfest-ca/
├── index.html
├── style.css
├── main.js
└── assets/
    ├── images/
    └── icons/
```

---

Built by Sumit | Techfest CA Program 2026 | IIT Bombay
