export default function AirportMapSchematic({ airport, path, t }) {
  if (!airport.schematic?.length) return null;

  return (
    <section className="guide-card schematic-card">
      <div className="schematic-heading">
        <span>{t.simpleRoutePreview}</span>
        <strong>{airport.code}</strong>
      </div>
      <div className="schematic-track">
        {airport.schematic.map((nodeId) => (
          <div key={nodeId} className={`schematic-node ${path.includes(nodeId) ? 'active' : ''}`}>
            {airport.nodeMap[nodeId]?.shortLabel || airport.nodeMap[nodeId]?.label || nodeId}
          </div>
        ))}
      </div>
    </section>
  );
}
