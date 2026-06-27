# Airport Navigator MVP

Airport Navigator is a mobile-first React + Vite web app that helps travelers move through major U.S. airports with confidence. This build keeps the original MVP scope—no deployment and no payment—but expands the app from a small proof of concept into a Top 20 airport navigation dataset using the attached U.S. Airport Navigation Research Packet.

## What changed in this build

- Expanded the app to include functional route graphs for all current Top 20 project-scope airports.
- Replaced guide-only messaging with safe, source-backed functional routing wherever the research packet provided enough official-source structure.
- Added richer airport metadata: city, layout summary, official map resource, official traversal resource, current advisory, security notes, source confidence, and traveler tips.
- Added richer edge data: mode, system name, estimated routing weight, official minutes, frequency, operating hours, airside/landside status, traveler instructions, source notes, and merge behavior.
- Improved route formatting so consecutive same-system movements merge into one customer-friendly step. For example, multiple Plane Train, Skylink, ATS, AirTrain, Sky Train, or Skyway hops display as one instruction with intermediate stops.
- Preserved source-safe timing behavior while adding a source-safe estimated navigation-time range for each calculated route.
- Added timing breakdowns for walking, train/shuttle/ride movement, and expected wait based on stored route data and published frequency where available.
- Added time-confidence labels: Official, High, Estimated, or Limited.
- Added advisories for construction, closure, security, or manual-verification issues where the packet identified them.
- Fixed retest connectivity gaps for SFO AirTrain Red, MSP Inter-terminal LRT Station, and LGA All-Terminals Shuttle so every mapped node can route to every other mapped node.
- Removed the visible static-data badge from the timing breakdown card while keeping the source-safe static timing model.


## Language support

This build supports eight language options:

- English
- Spanish
- French
- Simplified Chinese
- Portuguese
- German
- Japanese
- Korean

The language layer localizes the main interface, dropdown labels, common airport nodes, short route-preview labels, route-step phrases, timing labels, safety reminders, advisory copy, and known data notes. Official airport names and branded transit-system names may remain unchanged where they function as proper names, such as Plane Train, Skylink, AirTrain, ATS, Skyway, PHX Sky Train, or MIA Mover.

Language QA notes:

- The route is re-formatted from source edges whenever the language changes, preventing stale Spanish/French/etc. route text from appearing after switching languages.
- Missing official timing remains localized as the language equivalent of “Official time not specified.”
- Airport-specific long English source copy is replaced with localized safe guidance unless a verified localized phrase exists.
- A production build was run after this update.

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


## Navigation time feature

This build adds a marketable source-safe navigation-time feature. The app now displays an estimated navigation-time range, a timing breakdown, and a confidence label for each calculated route.

The timing estimate is intentionally not dependent on live feeds. It uses:

- stored walking and movement estimates inside the airport graph;
- official or source-backed train, tram, shuttle, people-mover, and bus frequencies where available;
- conservative static buffers for movement and expected wait time; and
- source-confidence flags from the airport data.

The app does not include TSA wait, airline check-in, baggage wait, customs/immigration, elevator delays, crowds, closures, gate changes, or unexpected disruptions in the navigation-time estimate. Those items remain traveler reminders and future live-data opportunities.

Time-confidence labels:

| Label | Meaning |
| --- | --- |
| Official | The route segment has official timing support in the data. |
| High | Strong official-source support exists, but the displayed range still uses conservative app formatting or frequency-based wait. |
| Estimated | The route is source-backed, but one or more timing values are app-calculated static estimates. |
| Limited | The route is usable, but official timing or current source detail still needs manual verification. |

## Visual design refresh for beta testers

This build includes a beta-facing UI refresh intended to make the app feel more dynamic, welcoming, and airport-themed without changing the routing logic.

Design updates:

- Dynamic airport theming that changes the visual atmosphere when an airport is selected.
- Airport-specific CSS-only motifs, such as skyline, coastline, mountain, desert, harbor, or terminal-inspired cues.
- Warmer glass-style cards and refreshed shadows for a more polished mobile-app feel.
- Animated hero scene with terminal, runway, and aircraft movement.
- Animated route preview and route-flow treatments to make airport movement feel more realistic.
- Subtle hover and entrance transitions for cards, buttons, route chips, and step cards.
- Motion respects reduced-motion accessibility preferences.
- No external images or copyrighted airport maps are embedded.

Functional safeguard:

The UI refresh is presentation-only. It does not change the airport graph data, routing algorithm, timing model, translations, or source-safety rules.

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

## Why timing is shown as an estimated range

The app now separates official timing from navigation-time planning. When an official travel time or frequency is available, the route uses it as part of the timing model. When a precise official travel time is not available, the app uses conservative static estimates already stored in the graph so travelers still get useful navigation planning guidance. The UI clearly labels the estimate and confidence level rather than presenting it as live or guaranteed.

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
- Add live official advisories later, where source permissions and reliability are clear.
- Consider a future premium layer for live TSA waits, shuttle/train outages, construction alerts, and delay-aware routing.
- Add browser-assisted verification for JFK, EWR, LGA, MCO, and BOS.
- Add source audit details into the UI or an admin data layer.
- Add official API/map integration where airports expose stable public data.
