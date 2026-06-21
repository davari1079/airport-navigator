export default function DestinationSelector({ airport, value, currentLocation, onChange }) {
  return (
    <div className="field-group">
      <label htmlFor="destination">Destination</label>
      <select id="destination" value={value} onChange={(event) => onChange(event.target.value)}>
        <option value="">Select where you need to go</option>
        {airport.nodes.map((node) => (
          <option key={node.id} value={node.id} disabled={node.id === currentLocation}>
            {node.label}
          </option>
        ))}
      </select>
    </div>
  );
}
