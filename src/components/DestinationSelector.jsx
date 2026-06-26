export default function DestinationSelector({ airport, value, currentLocation, onChange, t }) {
  return (
    <div className="field-group">
      <label htmlFor="destination">{t.destinationLabel}</label>
      <select id="destination" value={value} onChange={(event) => onChange(event.target.value)}>
        <option value="">{t.selectDestination}</option>
        {airport.nodes.map((node) => (
          <option key={node.id} value={node.id} disabled={node.id === currentLocation}>
            {node.label}
          </option>
        ))}
      </select>
    </div>
  );
}
