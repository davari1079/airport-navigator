import { useMemo } from 'react';
import { displayNodeLabel } from '../i18n/translations.js';

export default function AirportMapSchematic({ airport, path, t }) {
  if (!airport.schematic?.length) return null;

  const activePath = useMemo(() => new Set(path || []), [path]);
  const routeKey = (path || []).join('>');

  return (
    <section className="guide-card schematic-card route-preview-card" data-route-key={routeKey}>
      <div className="schematic-heading">
        <span>{t.simpleRoutePreview}</span>
        <strong>{airport.code}</strong>
      </div>
      <div className="schematic-stage" aria-hidden="true">
        <span className="schematic-runway-line" />
        <span className="schematic-moving-plane">✈</span>
      </div>
      <div className="schematic-track" aria-label={t.simpleRoutePreview}>
        {airport.schematic.map((nodeId, index) => {
          const active = activePath.has(nodeId);
          return (
            <div key={`${routeKey}-${nodeId}`} className={`schematic-node ${active ? 'active' : ''}`} style={{ '--node-index': index }}>
              {displayNodeLabel(nodeId, airport.nodeMap, t, true)}
            </div>
          );
        })}
      </div>
    </section>
  );
}
