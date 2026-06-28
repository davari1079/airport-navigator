import { useEffect, useMemo, useState } from 'react';
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
import { getAirportVisual } from './data/airportVisuals.js';
import BetaResourceTiles from './components/BetaResourceTiles.jsx';
import InstructionsPage from './components/InstructionsPage.jsx';
import FeedbackPage from './components/FeedbackPage.jsx';

export default function App() {
  const [airportCode, setAirportCode] = useState('');
  const [currentLocation, setCurrentLocation] = useState('');
  const [destination, setDestination] = useState('');
  const [route, setRoute] = useState(null);
  const [language, setLanguage] = useState('en');
  const [page, setPage] = useState(() => {
    const hash = window.location.hash.replace('#', '');
    return hash === 'instructions' || hash === 'feedback' ? hash : 'start';
  });

  const t = getTranslations(language);
  const airport = useMemo(() => airportGraphs[airportCode], [airportCode]);
  const heroVisual = useMemo(() => getAirportVisual(airportCode), [airportCode]);
  const pageVisual = heroVisual || {
    src: '/airport-visuals/welcome.webp',
    position: 'center center',
    label: 'Travelers in an airport terminal',
  };


  useEffect(() => {
    if (!pageVisual?.src) return;
    const image = new Image();
    image.decoding = 'async';
    image.src = pageVisual.src;
  }, [pageVisual.src]);

  useEffect(() => {
    function syncPageFromHash() {
      const hash = window.location.hash.replace('#', '');
      if (hash === 'instructions' || hash === 'feedback') {
        setPage(hash);
        setRoute(null);
        return;
      }
      setPage('start');
      if (hash !== 'route') {
        setRoute(null);
      }
    }

    window.addEventListener('hashchange', syncPageFromHash);
    window.addEventListener('popstate', syncPageFromHash);
    return () => {
      window.removeEventListener('hashchange', syncPageFromHash);
      window.removeEventListener('popstate', syncPageFromHash);
    };
  }, []);

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
    if (page !== 'start') {
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    }
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
      id: `${airportCode}:${currentLocation}:${destination}:${result.path.join('>')}`,
      start: currentLocation,
      destination,
      fallbackMinutes: result.fallbackMinutes,
      path: result.path,
      edges: result.edges,
    });

    if (window.location.hash !== '#route') {
      window.location.hash = 'route';
    }
  }

  function resetApp() {
    setAirportCode('');
    setCurrentLocation('');
    setDestination('');
    setRoute(null);
    setPage('start');
    window.history.replaceState(null, '', window.location.pathname + window.location.search);
  }

  function handleChangeRoute() {
    setCurrentLocation('');
    setDestination('');
    setRoute(null);
    setPage('start');
    window.history.replaceState(null, '', window.location.pathname + window.location.search);
  }

  return (
    <AppShell t={t} airport={airport}>
      <section
        className={`hero-card hero-card-photo ${heroVisual ? 'hero-card-airport' : 'hero-card-welcome'}`}
        style={{
          '--hero-image': `url(${pageVisual.src})`,
          '--hero-position': pageVisual.position,
        }}
      >
        <div className="hero-card-media" aria-hidden="true">
          <span className="hero-card-scrim" />
          <span className="hero-card-highlight" />
          <span className="scene-plane">✈</span>
        </div>
        <div className="hero-content hero-content-overlay">
          <span className="eyebrow">{t.travelGuideMVP}</span>
          {airport ? (
            <span className="hero-context" aria-label={`${airport.city} ${airport.code}`}>
              {airport.code} · {airport.city}
            </span>
          ) : (
            <span className="hero-context hero-context-soft">{t.airportLabel}</span>
          )}
          <h1>{t.appTitle}</h1>
          <p>{t.heroSubtitle}</p>
        </div>
        {airport && (
          <div className="hero-card-note" aria-hidden="true">
            <strong>{airport.name}</strong>
            <span>{airport.city}</span>
          </div>
        )}
      </section>

      <LanguageSelector value={language} onChange={setLanguage} t={t} />

      {page === 'start' && (
        <AirportSelector value={airportCode} onChange={handleAirportChange} t={t} />
      )}

      {!airportCode && page === 'start' && <BetaResourceTiles />}

      {page === 'instructions' && !airportCode && <InstructionsPage />}

      {page === 'feedback' && !airportCode && <FeedbackPage />}

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
          <AirportMapSchematic key={`preview-${localizedRoute.id || localizedRoute.path.join('-')}`} airport={airport} path={localizedRoute.path} t={t} />
          <RouteResult
            key={`result-${localizedRoute.id || localizedRoute.path.join('-')}`}
            airport={airport}
            route={localizedRoute}
            onChangeRoute={handleChangeRoute}
            onReset={resetApp}
            t={t}
          />
        </>
      )}
    </AppShell>
  );
}
