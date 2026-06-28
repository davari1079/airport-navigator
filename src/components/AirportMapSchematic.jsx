import { useMemo } from 'react';
import { displayNodeLabel } from '../i18n/translations.js';

export default function AirportMapSchematic({ airport, path, t }) {
  const routePath = useMemo(() => {
    const cleanPath = Array.isArray(path) ? path.filter(Boolean) : [];
    return cleanPath.length ? cleanPath : [];
  }, [path]);

  if (!routePath.length) return null;

  const routeKey = routePath.join('>');

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
        {routePath.map((nodeId, index) => (
          <div
            key={`${routeKey}-${nodeId}-${index}`}
            className="schematic-node active"
            style={{ '--node-index': index }}
          >
            {displayNodeLabel(nodeId, airport.nodeMap, t, true)}
          </div>
        ))}
      </div>
    </section>
  );
}
