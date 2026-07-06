import { displayNodeLabel } from '../i18n/translations.js';

export default function RouteStepCard({ step, index, t }) {
  const connectionType = step.airsideOrLandside === 'airside'
    ? t.airsideConnection
    : step.airsideOrLandside === 'landside'
      ? t.landsideConnection
      : null;

  return (
    <article className="route-step-card">
      <div className="step-number">{index}</div>
      <div>
        <p>{step.instruction}</p>
        <div className="step-meta">
          <span>{step.timeLabel}</span>
          {connectionType && <span>{connectionType}</span>}
          {step.frequency && <span>{t.frequency}: {step.frequency}</span>}
        </div>
        {step.note && <small>{step.note}</small>}
      </div>
    </article>
  );
}
