# Airport Navigator MVP

**Airport Navigator** is a mobile‑first web application that helps travellers find their way through major U.S. airports.  The MVP focuses on a clean, confidence‑building user experience: choose your airport, pick where you are and where you need to go, and get a step‑by‑step route with merged transit segments and estimated times.  This version is powered by a 63‑airport research corpus compiled from official airport maps and traversal guides.  For each airport we either provide a fully routed experience using available transit systems or a safe functional guide when detailed timing is not available.

## Features

* **Airport selector** – choose from the top 20 U.S. airports by passenger volume.  Airports that are not yet mapped display a friendly “Basic Guide Mode Coming Soon” message.
* **Current location and destination selectors** – select your starting point and destination within the airport.  Options include terminals, concourses, baggage claim, ground transportation, parking and more.
* **Traveller‑friendly routing** – the app uses Dijkstra’s algorithm to compute the quickest path between two points in the airport graph.  A post‑processing formatter merges consecutive segments on the same transit system (e.g. multiple Plane Train hops) into a single, easy‑to‑understand instruction.
* **Step‑by‑step instructions** – view a clear list of steps with estimated times, notes and helpful tips.  Times derived from official sources are summed; when an official time is not specified the app notes this instead of guessing.
* **Mobile‑first design** – styled in blue, white and gold with large touch‑friendly buttons and cards inspired by travel guides.
* **Disclaimer banner** – reminds travellers that airport layouts, gate assignments and travel times can change, and encourages consulting official airport resources and airline apps.

## Supported airports

| Code | Airport | Status |
| --- | --- | --- |
| **ATL** | Hartsfield–Jackson Atlanta International Airport | Fully routed (Plane Train & tunnel implemented) |
| **LAX** | Los Angeles International Airport | Fully routed (airside connectors and shuttle implemented) |
| **DFW** | Dallas/Fort Worth International Airport | Functional routing (Skylink & Terminal Link implemented) |
| **DEN** | Denver International Airport | Functional routing (Train to Gates implemented) |
| **ORD** | Chicago O’Hare International Airport | Functional routing (walkway connectors & ATS implemented) |
| **JFK** | New York John F. Kennedy International Airport | Functional routing (AirTrain loop implemented) |
| **MCO**, **LAS**, **CLT**, **MIA**, **SEA**, **EWR**, **SFO**, **PHX**, **IAH**, **BOS**, **FLL**, **MSP**, **LGA**, **DTW** | Safe functional guide mode – high‑level orientation only |

## Getting started

1. Ensure you have a recent version of **Node.js** installed.
2. Clone this repository and install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

   Vite will start a local server (typically on `http://localhost:5173`) and rebuild the app on changes.

4. Open your browser to the provided local URL.  The app should display a hero screen prompting you to select an airport.

## Project structure

```
airport-navigator/
├── index.html               # Entry point loaded by Vite
├── package.json             # Project metadata and scripts
├── vite.config.js           # Vite configuration with React plugin
├── src/
│   ├── App.jsx              # Top‑level application component
│   ├── main.jsx             # React entry point
│   ├── styles.css           # Global styles and variables
│   ├── data/
│   │   └── airportGraphs.js # Graph definitions for each airport
│   ├── utils/
│   │   ├── dijkstra.js      # Shortest‑path algorithm
│   │   └── routeFormatter.js# Human‑friendly route formatting
│   └── components/
│       ├── AppShell.jsx     # Layout wrapper and disclaimer
│       ├── AirportSelector.jsx
│       ├── CurrentLocationSelector.jsx
│       ├── DestinationSelector.jsx
│       ├── RouteResult.jsx
│       ├── RouteStepCard.jsx
│       ├── AirportMapSchematic.jsx
│       └── DisclaimerBanner.jsx
```

## Next steps

The MVP is intentionally simple to get travellers moving quickly.  Future enhancements may include:

* **Payment integration** – prompt users for a one‑time or per‑use fee and persist their purchase in local storage.
* **Real‑time geolocation** – use the browser’s geolocation API to automatically determine the current airport and location.
* **Expanded airport coverage** – add detailed graphs for the remaining airports in the research corpus and extend to other hubs worldwide.
* **Official map API verification** – integrate directly with airport map APIs where available to keep layouts, gate assignments and timings current.
* **Live alerts and advisories** – surface real‑time construction notices, service changes or delays within the airport.
* **Schematic maps** – embed simplified SVG maps or diagrams to accompany the text‑based instructions.
* **Deployment** – deploy the app to a cloud host (e.g. Vercel) and enable offline caching for travellers without reliable data connections.

---

This project implements the basic navigation flow described in the accompanying product requirements document【fileciteturn0file0】 and serves as a foundation for more advanced functionality.