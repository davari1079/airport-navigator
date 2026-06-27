import { displayAirportText, displayNodeLabel } from '../i18n/translations.js';
import RouteStepCard from './RouteStepCard.jsx';

export default function RouteResult({ airport, route, onChangeRoute, onReset, t }) {
  const start = displayNodeLabel(route.start, airport.nodeMap, t);
  const destination = displayNodeLabel(route.destination, airport.nodeMap, t);
  const timeSummary = route.navigationTime?.label
    || (route.totalMinutes === null ? t.timeUnknownSummary : `${route.totalMinutes} ${t.minutes}`);
  const breakdown = route.timingBreakdown;

  return (
    <section className="route-result route-result-dynamic">
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
        <div className="summary-card wide navigation-time-card">
          <span>{t.estimatedNavigationTime}</span>
          <strong>{timeSummary}</strong>
          <small>{t.timingRangeHelper}</small>
          {route.timeConfidenceLabel && (
            <span className={`confidence-badge confidence-${route.timeConfidence || 'estimated'}`}>
              {t.timeConfidence}: {route.timeConfidenceLabel}
            </span>
          )}
        </div>
      </div>

      {breakdown && (
        <div className="timing-breakdown" aria-label={t.timingBreakdown}>
          <div className="timing-heading">
            <h3>{t.timingBreakdown}</h3>
          </div>
          <div className="timing-grid">
            <div className="timing-item">
              <span>{t.walkingTime}</span>
              <strong>{breakdown.walking.label}</strong>
            </div>
            <div className="timing-item">
              <span>{t.rideTime}</span>
              <strong>{breakdown.ride.label}</strong>
            </div>
            <div className="timing-item">
              <span>{t.expectedWait}</span>
              <strong>{breakdown.wait.label}</strong>
            </div>
          </div>
          <p>{t.navigationTimeDisclaimer}</p>
        </div>
      )}

      <div className="route-flow" aria-label={t.recommendedPath}>
        <div className="route-flow-line" aria-hidden="true">
          <span className="route-flow-plane">✈</span>
        </div>
        <div className="path-pill">
          {route.path.map((nodeId, index) => (
            <span key={nodeId} style={{ '--pill-index': index }}>{displayNodeLabel(nodeId, airport.nodeMap, t, true)}</span>
          ))}
        </div>
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
