import { displayNodeLabel } from '../i18n/translations.js';

export default function CurrentLocationSelector({ airport, value, onChange, t }) {
  return (
    <label className="field-stack" htmlFor="current-location">
      <span>{t.currentLocationLabel}</span>
      <select id="current-location" value={value} onChange={(event) => onChange(event.target.value)}>
        <option value="">{t.selectCurrentLocation}</option>
        {airport.nodes.map((node) => (
          <option key={node.id} value={node.id}>{displayNodeLabel(node.id, airport.nodeMap, t)}</option>
        ))}
      </select>
    </label>
  );
}
