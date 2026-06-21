# Airport Navigator MVP

Airport Navigator is a clean, mobile-first React + Vite web app that helps travelers move through major U.S. airports with confidence. The MVP does not include deployment or payment. It focuses on the core travel-guide flow: select an airport, select a current location, select a destination, calculate a route, and show practical step-by-step airport navigation cards.

## What the app does

- Shows a hero screen: “Airport Navigator — Find your way through major U.S. airports with confidence.”
- Lists the top 20 U.S. airports in the airport selector.
- Fully implements ATL first.
- Fully implements LAX second.
- Shows “Basic Guide Mode Coming Soon” for unmapped airports.
- Uses airport graph data with nodes and weighted edges.
- Uses Dijkstra shortest-path routing.
- Shows starting point, destination, recommended path, estimated travel time, step-by-step instructions, before-you-move tip, watch-out tip, and a reminder to verify with airport signs, official airport resources, and the airline app.
- Uses mobile-first blue, white, and gold styling inspired by travel-guide cards.

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

## Fully implemented airports

### ATL — Hartsfield-Jackson Atlanta International Airport

Implemented nodes include Domestic Terminal, Domestic North, Domestic South, Security, Concourses T through F, International Terminal, Baggage Claim, MARTA, Ground Transportation, Rental Car Center, Rideshare Pickup, and Parking.

Routing includes:
- Domestic Terminal to Security to Concourse T.
- Concourse walking chain T → A → B → C → D → E → F.
- Adjacent walking times of about 5 minutes, except E to F at about 10 minutes.
- Faster Plane Train edges across T, A, B, C, D, E, and F.
- MARTA connected to Domestic Terminal.
- International Terminal connected to Concourse F.
- Domestic-side ground transportation, rideshare, parking, baggage claim, and rental car connections.

### LAX — Los Angeles International Airport

Implemented nodes include Terminals 1 through 8, TBIT, Baggage Claim, Ground Transportation, Rideshare Pickup, Parking, and Shuttle Stop.

Routing includes:
- Airside walking connections for Terminal 3, TBIT, Terminal 4, Terminal 5, Terminal 6, Terminal 7, and Terminal 8.
- Terminal 1 connection to Terminal 2.
- Terminal 1 to TBIT bus/shuttle-style connection.
- Approximate times clearly treated as estimates.

## Basic guide mode airports

The remaining top 20 airports are listed but not deeply routed yet:

DFW, DEN, ORD, JFK, MCO, LAS, CLT, MIA, SEA, EWR, SFO, PHX, IAH, BOS, FLL, MSP, LGA, and DTW.

For these, the app does not generate fake routes. It shows a safe message advising travelers to use official airport maps, signage, security rules, and airline app guidance.

## Project structure

```text
src/
  components/
    AppShell.jsx
    AirportSelector.jsx
    CurrentLocationSelector.jsx
    DestinationSelector.jsx
    RouteResult.jsx
    RouteStepCard.jsx
    AirportMapSchematic.jsx
    DisclaimerBanner.jsx
  data/
    airportGraphs.js
  utils/
    dijkstra.js
    routeFormatter.js
  App.jsx
  main.jsx
  styles.css
```

## Next steps

- Add payment later using Stripe Checkout, Payment Request API, or another provider.
- Deploy later to Vercel or another static hosting provider.
- Expand airport graph data using verified official airport resources.
- Add simplified original SVG schematics for each fully mapped airport.
- Add optional browser geolocation only as a helper, while keeping manual airport/location selection as the main MVP flow.
- Add live gate, terminal, and airline data only where licensing and reliability are clear.

## Important limitation

Airport layouts, gates, security access, transportation details, and walking times can change. This MVP provides estimated guide-style navigation only and should always be cross-checked with airport signage, official airport resources, and the traveler’s airline app.
