import { useMemo, useState } from 'react';
import AppShell from './components/AppShell.jsx';
import AirportSelector from './components/AirportSelector.jsx';
import LanguageSelector from './components/LanguageSelector.jsx';
import CurrentLocationSelector from './components/CurrentLocationSelector.jsx';
import DestinationSelector from './components/DestinationSelector.jsx';
import RouteResult from './components/RouteResult.jsx';
import AirportMapSchematic from './components/AirportMapSchematic.jsx';
import { airportGraphs } from './data/airportGraphs.js';
import { dijkstra } from './utils/dijkstra.js';
import { formatRoute } from './utils/routeFormatter.js';
import { displayAirportText, getTranslations } from './i18n/translations.js';

export default function App() {
  const [airportCode, setAirportCode] = useState('');
  const [currentLocation, setCurrentLocation] = useState('');
  const [destination, setDestination] = useState('');
  const [route, setRoute] = useState(null);
  const [language, setLanguage] = useState('en');

  const t = getTranslations(language);
  const airport = useMemo(() => airportGraphs[airportCode], [airportCode]);

  const localizedRoute = useMemo(() => {
    if (!route || !airport?.nodeMap) return null;
    const formattedRoute = formatRoute(route.edges, airport.nodeMap, language);
    return {
      ...route,
      totalMinutes: formattedRoute.totalMinutes,
      fallbackMinutes: formattedRoute.fallbackMinutes ?? route.fallbackMinutes,
      hasUnknownTime: formattedRoute.hasUnknownTime,
      navigationTime: formattedRoute.navigationTime,
      timingBreakdown: formattedRoute.timingBreakdown,
      timeConfidence: formattedRoute.timeConfidence,
      timeConfidenceLabel: formattedRoute.timeConfidenceLabel,
      steps: formattedRoute.steps,
    };
  }, [route, airport, language]);

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

    setRoute({
      start: currentLocation,
      destination,
      fallbackMinutes: result.fallbackMinutes,
      path: result.path,
      edges: result.edges,
    });
  }

  function resetApp() {
    setAirportCode('');
    setCurrentLocation('');
    setDestination('');
    setRoute(null);
  }

  return (
    <AppShell t={t} airport={airport}>
      <section className="hero-card">
        <div className="hero-content">
          <span className="eyebrow">{t.travelGuideMVP}</span>
          {airport && (
            <span className="hero-context" aria-label={`${airport.city} ${airport.code}`}>
              {airport.city} · {airport.code}
            </span>
          )}
          <h1>{t.appTitle}</h1>
          <p>{t.heroSubtitle}</p>
        </div>
        <div className="hero-scene" aria-hidden="true">
          <span className="scene-sun" />
          <span className="scene-terminal" />
          <span className="scene-runway" />
          <span className="scene-plane">✈</span>
          <span className="scene-motif" />
        </div>
      </section>

      <LanguageSelector value={language} onChange={setLanguage} t={t} />

      <AirportSelector value={airportCode} onChange={handleAirportChange} t={t} />

      {airportCode && airport?.status !== 'mapped' && (
        <section className="guide-card coming-soon-card">
          <h2>{t.functionalGuidePending}</h2>
          <p>{airport?.name || airportCode} {t.routeGraphNotReady}</p>
          <p>{t.noFakeRoute}</p>
        </section>
      )}

      {airport?.status === 'mapped' && !localizedRoute && (
        <section className="guide-card">
          <div className="airport-heading">
            <span className="airport-code">{airport.code}</span>
            <div>
              <h2>{airport.name}</h2>
              <p>{displayAirportText(airport, 'summary', t)}</p>
            </div>
          </div>

          <CurrentLocationSelector
            airport={airport}
            value={currentLocation}
            onChange={setCurrentLocation}
            t={t}
          />

          <DestinationSelector
            airport={airport}
            value={destination}
            currentLocation={currentLocation}
            onChange={setDestination}
            t={t}
          />

          <button
            className="primary-button"
            disabled={!currentLocation || !destination || currentLocation === destination}
            onClick={handleFindRoute}
          >
            {t.calculateRoute}
          </button>
        </section>
      )}

      {airport?.status === 'mapped' && localizedRoute && (
        <>
          <AirportMapSchematic airport={airport} path={localizedRoute.path} t={t} />
          <RouteResult
            airport={airport}
            route={localizedRoute}
            onChangeRoute={() => setRoute(null)}
            onReset={resetApp}
            t={t}
          />
        </>
      )}
    </AppShell>
  );
}
