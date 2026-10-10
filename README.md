# PLAYSTATE · High-Performance Outdoor Sports & AI Match Kit Planner

An ultra-modern outdoor sports storefront and AI match kit planner built with **Next.js (App Router)**, **React.js**, **Node.js**, **Express.js**, **Tailwind CSS**, **Python**, **LangChain**, **LangGraph**, **GSAP**, **Lenis**, and **Framer Motion**.

---

## ⚡ Core Features & Animations

- **Athletic Preloader**: Cinematic countdown ticker (0–100%) with vector brand mark animation and smooth curtain-up transition.
- **Parallax & Depth**: Multi-layer hero depth, rotating *OUTSIDE FIRST* circular badge stamp, floating coordinate badges, and scroll-triggered physics.
- **Smooth Scrolling (Lenis + GSAP)**: 60/120fps inertia scrolling integrated with `ScrollTrigger`.
- **Glassmorphism**: Frosted glass sticky header, acrylic interactive kit drawer, luminous card borders, and translucent modals.
- **Interactive 8 Disciplines Grid**: Handcrafted animated SVG sport icons (Cricket, Football, Hockey, Basketball, Tennis, Volleyball, Golf, Badminton) with live catalog filtering.
- **Gear Catalog Showcase**: 16 product concepts rendered with contact-sheet sprite systems, 3D tilt hover physics, live search, sport filter tabs, price/name sorting, and quick-view dialogs.
- **Cricket Pitch Spotlight**: Editorial dark-mode section featuring interactive equipment hotspot pins (Willow Bat, Red Seam Ball, Crease Batting Pads, Stumps) and match readiness checklists.
- **LangChain & LangGraph AI Match Strategist**: Multi-node Python reasoning graph that evaluates sport, skill tier, and playing surface to generate tailored gameplans, drills, and instant starter-pack presets.
- **Ultra-Modern Animated Footer**: Interactive waveform audio/motion equalizer bars, live sports marquee ticker, dispatch newsletter form, local system clock, and smooth Lenis back-to-top button.
- **Interactive Kit Drawer & Confetti**: Real-time quantity adjustments, price calculations, celebratory confetti bursts, and one-click `.txt` checklist download.

---

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| **Frontend Framework** | Next.js (App Router), React |
| **Styling** | Tailwind CSS, Glassmorphic CSS Design System |
| **Animation & Motion** | GSAP 3, Lenis Smooth Scroll, Framer Motion |
| **API Gateway** | Express.js, Node.js |
| **AI Reasoning Engine** | Python 3, LangChain, LangGraph (`StateGraph`), FastAPI, Uvicorn |
| **Micro-Interactions** | Canvas Confetti, Lucide Icons, Custom Animated SVGs |

---

## 🚀 Running Locally

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Full Stack (Next.js + Express API + Python LangGraph AI)
```bash
npm run dev
```

This concurrently starts:
- **Next.js Frontend**: [http://localhost:3000](http://localhost:3000)
- **Express Backend**: [http://localhost:5001](http://localhost:5001)
- **Python LangGraph Service**: [http://localhost:8000](http://localhost:8000)

### Or Run Individual Services:
```bash
# Next.js only
npm run dev:next

# Express API only
npm run dev:express

# Python LangGraph AI service only
npm run dev:ai
```

---

## 🏗️ Production Build

```bash
npm run build
npm start
```

---

## 🌐 Repository

- GitHub: [https://github.com/saptarshimasid/playstate](https://github.com/saptarshimasid/playstate)
