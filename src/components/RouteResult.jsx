import RouteStepCard from './RouteStepCard.jsx';

export default function RouteResult({ airport, route, onChangeRoute, onReset, t }) {
  const start = airport.nodeMap[route.start]?.label || route.start;
  const destination = airport.nodeMap[route.destination]?.label || route.destination;
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
          <span key={nodeId}>{airport.nodeMap[nodeId]?.shortLabel || airport.nodeMap[nodeId]?.label || nodeId}</span>
        ))}
      </div>

      <div className="tip-card">
        <span>{t.beforeMove}</span>
        <p>{airport.beforeMoveTip}</p>
      </div>

      {airport.securityNotes && (
        <div className="tip-card">
          <span>{t.securityNote}</span>
          <p>{airport.securityNotes}</p>
        </div>
      )}

      <div className="steps-list">
        {route.steps.map((step, index) => (
          <RouteStepCard key={`${step.from}-${step.to}-${index}`} step={step} index={index + 1} t={t} />
        ))}
      </div>

      <div className="tip-card watch">
        <span>{t.watchOutTip}</span>
        <p>{airport.watchOutTip}</p>
      </div>

      {airport.currentAdvisory && (
        <div className="safety-note">
          <strong>{t.currentAdvisory}:</strong> {airport.currentAdvisory}
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
