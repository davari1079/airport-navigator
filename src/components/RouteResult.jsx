import { displayAirportText, displayNodeLabel } from '../i18n/translations.js';
import RouteStepCard from './RouteStepCard.jsx';

export default function RouteResult({ airport, route, onChangeRoute, onReset, t }) {
  const start = displayNodeLabel(route.start, airport.nodeMap, t);
  const destination = displayNodeLabel(route.destination, airport.nodeMap, t);
  const timeSummary = route.totalMinutes === null
    ? t.timeUnknownSummary
    : `${route.totalMinutes} ${t.minutes}`;

  return (
    <section className="route-result">
      <div className="airport-heading">
        <span className="airport-code">{airport.code}</span>
        <div>
          <h2>{t.recommendedRoute}</h2>
          <p>{start} {t.to} {destination}</p>
        </div>
      </div>

      <div className="summary-grid">
        <div className="summary-card">
          <span>{t.startingPoint}</span>
          <strong>{start}</strong>
        </div>
        <div className="summary-card">
          <span>{t.destinationLabel}</span>
          <strong>{destination}</strong>
        </div>
        <div className="summary-card wide">
          <span>{t.travelTime}</span>
          <strong>{timeSummary}</strong>
          <small>{t.timingHelper}</small>
        </div>
      </div>

      <div className="path-pill" aria-label={t.recommendedPath}>
        {route.path.map((nodeId) => (
          <span key={nodeId}>{displayNodeLabel(nodeId, airport.nodeMap, t, true)}</span>
        ))}
      </div>

      <div className="tip-card">
        <span>{t.beforeMove}</span>
        <p>{displayAirportText(airport, 'beforeMoveTip', t)}</p>
      </div>

      {airport.securityNotes && (
        <div className="tip-card">
          <span>{t.securityNote}</span>
          <p>{displayAirportText(airport, 'securityNotes', t)}</p>
        </div>
      )}

      <div className="steps-list">
        {route.steps.map((step, index) => (
          <RouteStepCard key={`${step.from}-${step.to}-${index}`} step={step} index={index + 1} t={t} />
        ))}
      </div>

      <div className="tip-card watch">
        <span>{t.watchOutTip}</span>
        <p>{displayAirportText(airport, 'watchOutTip', t)}</p>
      </div>

      {airport.currentAdvisory && (
        <div className="safety-note">
          <strong>{t.currentAdvisory}:</strong> {displayAirportText(airport, 'currentAdvisory', t)}
        </div>
      )}

      <div className="safety-note">
        <strong>{t.reminder}:</strong> {t.routeReminder}
      </div>

      <div className="button-row">
        <button className="secondary-button" onClick={onChangeRoute}>{t.changeRoute}</button>
        <button className="primary-button" onClick={onReset}>{t.startOver}</button>
      </div>
    </section>
  );
}
