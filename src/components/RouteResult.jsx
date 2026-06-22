import RouteStepCard from './RouteStepCard.jsx';

export default function RouteResult({ airport, route, onChangeRoute, onReset }) {
  const start = airport.nodeMap[route.start]?.label || route.start;
  const destination = airport.nodeMap[route.destination]?.label || route.destination;
  const timeSummary = route.totalMinutes === null
    ? 'Official time not specified for one or more segments'
    : `${route.totalMinutes} minutes`;

  return (
    <section className="route-result">
      <div className="airport-heading">
        <span className="airport-code">{airport.code}</span>
        <div>
          <h2>Recommended Route</h2>
          <p>{start} to {destination}</p>
        </div>
      </div>

      <div className="summary-grid">
        <div className="summary-card">
          <span>Starting point</span>
          <strong>{start}</strong>
        </div>
        <div className="summary-card">
          <span>Destination</span>
          <strong>{destination}</strong>
        </div>
        <div className="summary-card wide">
          <span>Travel time</span>
          <strong>{timeSummary}</strong>
          <small>
            The app only displays official timing when the source supports it. Add time for crowds,
            security, elevators, train waits, shuttle waits, closures, and gate changes.
          </small>
        </div>
      </div>

      <div className="path-pill" aria-label="Recommended path">
        {route.path.map((nodeId) => (
          <span key={nodeId}>{airport.nodeMap[nodeId]?.shortLabel || airport.nodeMap[nodeId]?.label || nodeId}</span>
        ))}
      </div>

      <div className="tip-card">
        <span>Before you move</span>
        <p>{airport.beforeMoveTip}</p>
      </div>

      {airport.securityNotes && (
        <div className="tip-card">
          <span>Security note</span>
          <p>{airport.securityNotes}</p>
        </div>
      )}

      <div className="steps-list">
        {route.steps.map((step, index) => (
          <RouteStepCard key={`${step.from}-${step.to}-${index}`} step={step} index={index + 1} />
        ))}
      </div>

      <div className="tip-card watch">
        <span>Watch-out tip</span>
        <p>{airport.watchOutTip}</p>
      </div>

      {airport.currentAdvisory && (
        <div className="safety-note">
          <strong>Current advisory:</strong> {airport.currentAdvisory}
        </div>
      )}

      <div className="safety-note">
        <strong>Reminder:</strong> Confirm this route with airport signs, official airport resources,
        current airport advisories, and your airline app before you start moving.
      </div>

      <div className="button-row">
        <button className="secondary-button" onClick={onChangeRoute}>Change route</button>
        <button className="primary-button" onClick={onReset}>Start over</button>
      </div>
    </section>
  );
}
