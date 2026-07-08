# AVL Detailed Terminal Map Update

This package updates Airport Navigator to include a more detailed AVL airport model based on the provided Asheville Regional Airport terminal map.

Changed areas:
- `src/data/extendedAirportGraphs.js`
  - Replaces generic `Gates / Boarding Area` with Gates 1-7.
  - Adds passenger drop-off, passenger pick-up, airline ticket counters/check-in, TSA screening, baggage claim, rental car counters, bus stop, guest services, business center, concessions, art gallery, pet relief area, restrooms, and family restrooms.
- `src/data/airportVisuals.js`
  - Keeps AVL hero mapping to `/airport-visuals/avl.webp`.
- `src/data/airportThemes.js`
  - Keeps AVL visual theme.
- `public/airport-visuals/avl.webp`
  - AVL hero image.

Manual GitHub update:
Upload/overwrite the package contents at the root of the `davari1079/airport-navigator` repository.
