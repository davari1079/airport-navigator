export default function CurrentLocationSelector({ airport, value, onChange, t }) {
  return (
    <div className="field-group">
      <label htmlFor="current-location">{t.currentLocationLabel}</label>
      <select
        id="current-location"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      >
        <option value="">{t.selectCurrentLocation}</option>
        {airport.nodes.map((node) => (
          <option key={node.id} value={node.id}>
            {node.label}
          </option>
        ))}
      </select>
    </div>
  );
}
