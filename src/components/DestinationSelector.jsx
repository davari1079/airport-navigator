import { displayNodeLabel } from '../i18n/translations.js';

export default function DestinationSelector({ airport, value, currentLocation, onChange, t }) {
  return (
    <label className="field-stack" htmlFor="destination">
      <span>{t.destinationLabel}</span>
      <select id="destination" value={value} onChange={(event) => onChange(event.target.value)}>
        <option value="">{t.selectDestination}</option>
        {airport.nodes
          .filter((node) => node.id !== currentLocation)
          .map((node) => (
            <option key={node.id} value={node.id}>{displayNodeLabel(node.id, airport.nodeMap, t)}</option>
          ))}
      </select>
    </label>
  );
}
