import { displayNodeLabel } from '../i18n/translations.js';

export default function AirportMapSchematic({ airport, path = [], t }) {
  if (!airport?.schematic?.length) return null;
  const active = new Set(path);
  return (
    <section className="schematic-card" aria-label={t.recommendedPath}>
      <div className="schematic-topline">
        <strong>{t.recommendedPath}</strong>
        <span>{airport.code}</span>
      </div>
      <div className="schematic-line" aria-hidden="true"><span>✈</span></div>
      <div className="schematic-pills">
        {airport.schematic.map((nodeId) => (
          <span key={nodeId} className={active.has(nodeId) ? 'active' : ''}>{displayNodeLabel(nodeId, airport.nodeMap, t, true)}</span>
        ))}
      </div>
    </section>
  );
}
