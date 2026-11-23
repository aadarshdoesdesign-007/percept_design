# PERCEPT · Visual Intelligence & Design Aptitude Laboratory

> A precision-engineered design intelligence platform synthesizing **Swiss editorial design × scientific field manual × contemporary design journal**.

![PERCEPT Canvas](public/assets/mascot/mascot_front.png)

---

## Overview

**PERCEPT** is an interactive, authentic design-learning laboratory and visual discovery platform built for design students, practitioners, and competitive design entrance aspirants (CEED, UCEED, NID DAT). 

Unlike generic gamified apps, PERCEPT focuses on genuine perceptual discrimination, optical rhythm, spatial net deduction, and deep historical design lineage.

### The Four Core Pillars

1. **LEARN (Design Archive & Field Manual)**: Six curated exploration tracks spanning Design Movements, Pioneers & Practitioners, Typography & Micro-Form, Industrial Culture, Architecture, and Visual Culture. Includes specimen analysis and study archiving.
2. **PLAY (Aptitude Minigames & Daily Expeditions)**: Interactive precision challenges including *The Optical Kerning Lab*, *Visual GeoGuessr*, *Spatial Cube Net Alignment*, and *Rogue Margin & Grid Hunter*.
3. **THINK (Aptitude Lab & Examination Suite)**: Structured aptitude drills across Visual, Spatial, Logical, Analytical, and Creative reasoning, paired with a full-length timed mock examination engine with question navigation, score analysis, and axiomatic explanations.
4. **EXPLORE (Look Again / Field Journal)**: Real-world observation missions and personal field logging to calibrate everyday perceptual acuity and habit formation.

---

## Design System & Aesthetic Principles

- **Canvas & Palette**: `#0A0A0A` deep canvas, `#141414` / `#111111` structural surfaces, `#292929` hairline borders, `#D99535` amber accent, `#EDEDED` high-contrast typography.
- **Corner Architecture**: Strict `0px` radius corners reflecting brutalist and Swiss modernist principles.
- **Typography**: 
  - Display: *Space Grotesk*
  - Body: *Manrope / Inter*
  - Monospace & Metadata: *JetBrains Mono*
- **Ethos**: Zero decorative AI gimmicks, zero fabricated bot leaderboards, 100% deterministic algorithms and evidence-backed skill telemetry.

---

## Tech Stack

- **Framework**: React 19 + TypeScript + Vite
- **Styling**: Tailwind CSS v4 (via `@tailwindcss/vite`)
- **Routing**: React Router v7 with SPA rewrites
- **Icons**: Lucide React + Custom SVG technical glyphs
- **Animation & Physics**: Framer Motion & Canvas Confetti
- **Audio Engine**: Synthesized Web Audio API sound generator with persistent local settings
- **Deployment**: Vercel ready (includes `vercel.json` SPA rewrite configuration)

---

## Local Development

```bash
# Clone the repository
git clone https://github.com/aadarshdoesdesign-007/percept_design.git
cd percept_design

# Install dependencies
npm install

# Start development server
npm run dev

# Run type check
npx tsc --noEmit

# Build for production
npm run build
```

---

## Production Deployment (Vercel)

PERCEPT includes out-of-the-box configuration for Vercel in `vercel.json`:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

Import `aadarshdoesdesign-007/percept_design` into Vercel:
- **Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`

---

## License

Created by **aadarshdoesdesign-007**. All rights reserved.
