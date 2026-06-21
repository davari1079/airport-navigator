const iconForMode = {
  walk: '🚶',
  train: '🚆',
  shuttle: '🚌',
  bus: '🚌',
  transfer: '➡️',
};

export default function RouteStepCard({ step, index }) {
  return (
    <article className="step-card">
      <div className="step-number">{index}</div>
      <div className="step-content">
        <div className="step-mode">
          <span aria-hidden="true">{iconForMode[step.mode] || '➡️'}</span>
          <strong>{step.modeLabel}</strong>
        </div>
        <p>{step.instruction}</p>
        <small>Estimated time: {step.estimatedMinutes} minutes</small>
        {step.note && <em>{step.note}</em>}
      </div>
    </article>
  );
}
