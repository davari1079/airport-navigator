import RouteStepCard from './RouteStepCard.jsx';

export default function RouteResult({ airport, route, onChangeRoute, onReset }) {
  const start = airport.nodeMap[route.start]?.label || route.start;
  const destination = airport.nodeMap[route.destination]?.label || route.destination;

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
          <span>Estimated travel time</span>
          <strong>{route.totalMinutes} minutes</strong>
          <small>Approximate estimate only. Add time for crowds, security, elevators, train waits, and gate changes.</small>
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

      <div className="steps-list">
        {route.steps.map((step, index) => (
          <RouteStepCard key={`${step.from}-${step.to}-${index}`} step={step} index={index + 1} />
        ))}
      </div>

      <div className="tip-card watch">
        <span>Watch-out tip</span>
        <p>{airport.watchOutTip}</p>
      </div>

      <div className="safety-note">
        <strong>Reminder:</strong> Confirm this route with airport signs, official airport resources, and your airline app before you start moving.
      </div>

      <div className="button-row">
        <button className="secondary-button" onClick={onChangeRoute}>Change route</button>
        <button className="primary-button" onClick={onReset}>Start over</button>
      </div>
    </section>
  );
}
