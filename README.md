# Airport Navigator Beta 1.0 Baseline

Airport Navigator is a mobile-first React + Vite web app that helps travelers move through major U.S. airports with confidence.

## Baseline included in this package

- Airport Navigator Beta 1.0 branding
- Dynamic airport hero visuals
- Beta tester welcome pop-up
- Instructions and Feedback start-page tiles
- Email-based feedback submission to info@davarisolutions.com
- Route selection with dropdowns for airport, starting point, and destination
- Functional route guidance for the current airport list, including MEM and BNA
- Browser/mobile back-button friendly hash navigation
- Redundant route timing-breakdown and lower route-flow section removed from the route result screen
- Local public image assets for all airport hero visuals

## Current airport list

ATL, LAX, DFW, DEN, ORD, JFK, MCO, LAS, CLT, MIA, SEA, EWR, SFO, PHX, IAH, BOS, FLL, MSP, LGA, DTW, MEM, BNA

## Local run

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Vercel

This project uses Vite. Vercel settings:

- Framework Preset: Vite
- Build Command: `npm run build`
- Output Directory: `dist`
