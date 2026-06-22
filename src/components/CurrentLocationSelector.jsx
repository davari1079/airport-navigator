export default function CurrentLocationSelector({ airport, value, onChange }) {
  return (
    <div className="field-group">
      <label htmlFor="current-location">Current location</label>
      <select
        id="current-location"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      >
        <option value="">Select where you are now</option>
        {airport.nodes.map((node) => (
          <option key={node.id} value={node.id}>
            {node.label}
          </option>
        ))}
      </select>
    </div>
  );
}
