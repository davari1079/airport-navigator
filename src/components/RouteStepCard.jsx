const iconForMode = {
  walk: '🚶',
  train: '🚆',
  tram: '🚊',
  shuttle: '🚌',
  bus: '🚌',
  transfer: '➡️',
};

export default function RouteStepCard({ step, index, t }) {
  const showWait = step.waitTime && step.waitTime.max > 0;

  return (
    <article className={`step-card step-mode-${step.mode || 'move'}`}>
      <div className="step-number">{index}</div>
      <div className="step-content">
        <div className="step-mode">
          <span aria-hidden="true">{iconForMode[step.mode] || '➡️'}</span>
          <strong>{step.modeLabel}</strong>
        </div>
        <p>{step.instruction}</p>
        <div className="step-meta">
          <small>{t.navigationTime}: {step.timeLabel}</small>
          {showWait && <small>{t.expectedWait}: {step.waitTimeLabel}</small>}
        </div>
        {step.note && <em>{step.note}</em>}
      </div>
    </article>
  );
}
