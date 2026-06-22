# Airport Navigator MVP

Airport Navigator is a mobile-first React + Vite web app that helps travelers move through major U.S. airports with confidence. This build keeps the original MVP scope—no deployment and no payment—but expands the app from a small proof of concept into a Top 20 airport navigation dataset using the attached U.S. Airport Navigation Research Packet.

## What changed in this build

- Expanded the app to include functional route graphs for all current Top 20 project-scope airports.
- Replaced guide-only messaging with safe, source-backed functional routing wherever the research packet provided enough official-source structure.
- Added richer airport metadata: city, layout summary, official map resource, official traversal resource, current advisory, security notes, source confidence, and traveler tips.
- Added richer edge data: mode, system name, estimated routing weight, official minutes, frequency, operating hours, airside/landside status, traveler instructions, source notes, and merge behavior.
- Improved route formatting so consecutive same-system movements merge into one customer-friendly step. For example, multiple Plane Train, Skylink, ATS, AirTrain, Sky Train, or Skyway hops display as one instruction with intermediate stops.
- Preserved “official time not specified” behavior when the research packet did not identify an official transfer time.
- Added advisories for construction, closure, security, or manual-verification issues where the packet identified them.

## Install

```bash
npm install
```

## Run locally

```bash
npm run dev
```

Vite will print a local development URL, usually:

```bash
http://localhost:5173
```

## Build

```bash
npm run build
```

## Airport coverage in this build

| Code | Airport | Build status |
| --- | --- | --- |
| ATL | Hartsfield-Jackson Atlanta International Airport | Functional route graph, hardened with Domestic/International, Plane Train, pedestrian walkway, MARTA, shuttle, and advisories |
| LAX | Los Angeles International Airport | Functional route graph, hardened with terminals, LAX-it, Metro Connector, rental-car signage, and Terminal 5 closure advisory |
| DFW | Dallas/Fort Worth International Airport | Functional route graph, hardened with Skylink and Terminal Link inside/outside security logic |
| DEN | Denver International Airport | Functional route graph with Jeppesen, A/B/C concourses, Train to Gates, Airport Transit Center, RTD, and construction notes |
| ORD | Chicago O'Hare International Airport | Functional route graph with T1/T2/T3 airside walking, ATS, TTB rules, MMF, CTA, and temporary TTB stop note |
| JFK | New York John F. Kennedy International Airport | Functional safe graph using AirTrain and terminal scope; flagged for manual official verification before publication-grade precision |
| MCO | Orlando International Airport | Functional safe graph using A/B/C, Airsides 1-4, Gate Link, Terminal Link, Intermodal/Brightline; flagged for manual official verification |
| LAS | Las Vegas Harry Reid International Airport | Functional route graph with T1/T3/D Gates, tram, inter-terminal shuttle, ground transportation, rental cars, rideshare |
| CLT | Charlotte Douglas International Airport | Functional walkable concourse graph with A/B/C/D/E, security, baggage, and ground transportation |
| MIA | Miami International Airport | Functional route graph with North/Central/South, Concourse D Skytrain, MIA Mover, Metrorail advisory, and ground transportation |
| SEA | Seattle-Tacoma International Airport | Functional route graph with main terminal, concourses, satellites, SEA Underground, Link light rail, and busy-season advisory |
| EWR | Newark Liberty International Airport | Functional safe graph using A/B/C and AirTrain; flagged for manual official verification of maintenance and stop details |
| SFO | San Francisco International Airport | Functional route graph with terminals, International A/G, AirTrain Red/Blue, BART, rental car center, alerts |
| PHX | Phoenix Sky Harbor International Airport | Functional route graph with T3/T4, PHX Sky Train, rental car center, parking, Valley Metro Rail, roadway restriction note |
| IAH | George Bush Intercontinental Airport | Functional route graph with A/B/C/D/E, Skyway, Subway, Terminal E international arrivals, METRO/Downtown Direct |
| BOS | Boston Logan International Airport | Functional safe graph using A/B/C/E, shuttle, Silver Line, B-C connector; flagged for manual official verification |
| FLL | Fort Lauderdale-Hollywood International Airport | Functional route graph with terminals, RCC, Tri-Rail shuttle, rideshare, parking, ground transportation |
| MSP | Minneapolis-Saint Paul International Airport | Functional route graph with T1/T2, inter-terminal LRT, accessible shuttle, METRO Blue Line, ground transportation |
| LGA | New York LaGuardia Airport | Functional safe graph using current terminal scope, all-terminal shuttle, Q70/MTA links; flagged for manual official verification |
| DTW | Detroit Metropolitan Wayne County Airport | Functional route graph with McNamara/Evans, ExpressTram only in Concourse A, B/C walking note, public transit and rideshare |

## Why some timings show “official time not specified”

The research packet explicitly instructed that, when official sources do not publish a travel time, the app should not infer one as a customer-facing promise. For graph routing, the app may still use an internal estimated routing weight so Dijkstra can choose a path. The user-facing cards only show official time when the source supports it; otherwise they state “Official time not specified.”

## Route behavior

Airport Navigator still uses graph-based Dijkstra routing, but now formats results for real travelers instead of showing raw graph hops. Consecutive movements on the same transit system are merged into a single route step when the traveler should stay on the same train, tram, shuttle, or people mover.

Examples:

- ATL Plane Train from Concourse T to Concourse F becomes one step with intermediate stops.
- DFW Skylink terminal-to-terminal movement becomes one step.
- ORD ATS and IAH Skyway movements merge when the same system continues across multiple stops.
- PHX Sky Train, MSP LRT, SFO AirTrain, and SEA Underground are modeled as named systems rather than generic transfers.

## Important limitations

- This app does not embed copyrighted airport maps.
- This app does not promise indoor GPS accuracy.
- This app does not invent gate-to-gate directions.
- Some airports are source-linked but flagged for manual verification where official pages were JavaScript-heavy or not machine-readable in the research crawl.
- Airport layouts, gate assignments, construction detours, security access, transportation details, and walking times can change. Always confirm with airport signs, official airport resources, and your airline app.

## Next steps

- Push this build to GitHub and confirm repository file updates.
- Deploy later to Vercel after review.
- Add payment later after the navigation MVP is stable.
- Add live official advisories, where source permissions and reliability are clear.
- Add browser-assisted verification for JFK, EWR, LGA, MCO, and BOS.
- Add source audit details into the UI or an admin data layer.
- Add official API/map integration where airports expose stable public data.
