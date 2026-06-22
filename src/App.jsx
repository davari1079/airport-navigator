import { useMemo, useState } from 'react';
import AppShell from './components/AppShell.jsx';
import AirportSelector from './components/AirportSelector.jsx';
import CurrentLocationSelector from './components/CurrentLocationSelector.jsx';
import DestinationSelector from './components/DestinationSelector.jsx';
import RouteResult from './components/RouteResult.jsx';
import AirportMapSchematic from './components/AirportMapSchematic.jsx';
import { airportGraphs } from './data/airportGraphs.js';
import { dijkstra } from './utils/dijkstra.js';
import { formatRoute } from './utils/routeFormatter.js';

export default function App() {
  const [airportCode, setAirportCode] = useState('');
  const [currentLocation, setCurrentLocation] = useState('');
  const [destination, setDestination] = useState('');
  const [route, setRoute] = useState(null);

  const airport = useMemo(() => airportGraphs[airportCode], [airportCode]);

  function handleAirportChange(code) {
    setAirportCode(code);
    setCurrentLocation('');
    setDestination('');
    setRoute(null);
  }

  function handleFindRoute() {
    if (!airport || airport.status !== 'mapped' || !currentLocation || !destination) return;

    const result = dijkstra({
      nodes: airport.nodes,
      edges: airport.edges,
      startId: currentLocation,
      destinationId: destination,
    });
    const formattedRoute = formatRoute(result.edges, airport.nodeMap);

    setRoute({
      start: currentLocation,
      destination,
      totalMinutes: formattedRoute.totalMinutes,
      fallbackMinutes: formattedRoute.fallbackMinutes ?? result.fallbackMinutes,
      hasUnknownTime: formattedRoute.hasUnknownTime,
      path: result.path,
      steps: formattedRoute.steps,
    });
  }

  function resetApp() {
    setAirportCode('');
    setCurrentLocation('');
    setDestination('');
    setRoute(null);
  }

  return (
    <AppShell>
      <section className="hero-card">
        <span className="eyebrow">Travel Guide MVP</span>
        <h1>Airport Navigator</h1>
        <p>Find your way through major U.S. airports with confidence.</p>
      </section>

      <AirportSelector value={airportCode} onChange={handleAirportChange} />

      {airportCode && airport?.status !== 'mapped' && (
        <section className="guide-card coming-soon-card">
          <h2>Functional airport guide pending</h2>
          <p>{airport?.name || airportCode} is listed, but route graph data is not ready yet.</p>
          <p>
            This app will not create a fake route. Please check official airport maps, posted signage,
            security access rules, and your airline app.
          </p>
        </section>
      )}

      {airport?.status === 'mapped' && !route && (
        <section className="guide-card">
          <div className="airport-heading">
            <span className="airport-code">{airport.code}</span>
            <div>
              <h2>{airport.name}</h2>
              <p>{airport.summary}</p>
            </div>
          </div>

          <CurrentLocationSelector
            airport={airport}
            value={currentLocation}
            onChange={setCurrentLocation}
          />

          <DestinationSelector
            airport={airport}
            value={destination}
            currentLocation={currentLocation}
            onChange={setDestination}
          />

          <button
            className="primary-button"
            disabled={!currentLocation || !destination || currentLocation === destination}
            onClick={handleFindRoute}
          >
            Calculate Route
          </button>
        </section>
      )}

      {airport?.status === 'mapped' && route && (
        <>
          <AirportMapSchematic airport={airport} path={route.path} />
          <RouteResult
            airport={airport}
            route={route}
            onChangeRoute={() => setRoute(null)}
            onReset={resetApp}
          />
        </>
      )}
    </AppShell>
  );
}
