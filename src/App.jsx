import React, { useState } from 'react';
import AppShell from './components/AppShell';
import AirportSelector from './components/AirportSelector';
import CurrentLocationSelector from './components/CurrentLocationSelector';
import DestinationSelector from './components/DestinationSelector';
import RouteResult from './components/RouteResult';
import { airportGraphs } from './data/airportGraphs';
import { dijkstra } from './utils/dijkstra';
import { formatRoute } from './utils/routeFormatter';

// The top‑level application component controls the navigation flow.
// Users first choose an airport, then their current location and
// destination.  After computing the route, a result screen is shown
// with step‑by‑step instructions and helpful tips.
const App = () => {
  const [airport, setAirport] = useState('');
  const [current, setCurrent] = useState('');
  const [destination, setDestination] = useState('');
  const [route, setRoute] = useState(null);

  // Compute the route using Dijkstra's algorithm and format it for
  // presentation.  If an unsupported airport is selected we set a flag
  // so that the UI can show a placeholder message.
  const handleFindRoute = () => {
    if (!airport || !current || !destination) return;
    const graph = airportGraphs[airport];
    if (!graph || graph.unsupported) {
      setRoute({ unsupported: true });
      return;
    }
    const result = dijkstra(graph, current, destination);
    // Use the enhanced route formatter, which returns merged steps and time info
    const formatted = formatRoute(result.edges);
    setRoute({
      start: current,
      end: destination,
      totalTime: formatted.totalTime,
      steps: formatted.steps,
      hasUnknownTime: formatted.hasUnknownTime,
      unsupported: false,
    });
  };

  const reset = () => {
    setAirport('');
    setCurrent('');
    setDestination('');
    setRoute(null);
  };

  return (
    <AppShell>
      {!airport ? (
        // Hero screen before the user selects an airport.
        <div className="hero">
          <h1>Airport Navigator</h1>
          <p>Find your way through major U.S. airports with confidence.</p>
          <AirportSelector airport={airport} setAirport={setAirport} />
        </div>
      ) : route ? (
        // Show the route result once computed.
        <RouteResult route={route} airport={airport} reset={reset} />
      ) : (
        // Location and destination selection for the chosen airport.
        <div className="selection">
          <h2>{airportGraphs[airport]?.name || airport}</h2>
          {airportGraphs[airport]?.unsupported ? (
            <div className="unsupported">
              <p className="warning">Functional airport guide</p>
              <p>
                Detailed gate‑to‑gate timing may not be specified by
                official sources.  Use this guide for terminal, transit,
                baggage claim, rideshare, rental car and ground
                transportation orientation, then confirm directions with
                official airport signage and your airline app.
              </p>
              <button className="primary-btn" onClick={reset}>Back</button>
            </div>
          ) : (
            <>
              <CurrentLocationSelector
                airport={airport}
                current={current}
                setCurrent={setCurrent}
              />
              <DestinationSelector
                airport={airport}
                destination={destination}
                setDestination={setDestination}
              />
              <button
                className="primary-btn"
                onClick={handleFindRoute}
                disabled={!current || !destination}
              >
                Get Route
              </button>
              <button className="secondary-btn" onClick={reset}>
                Choose Different Airport
              </button>
            </>
          )}
        </div>
      )}
    </AppShell>
  );
};

export default App;