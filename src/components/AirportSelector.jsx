import { topAirports } from '../data/airportGraphs.js';

export default function AirportSelector({ value, onChange }) {
  return (
    <section className="guide-card selector-card">
      <label htmlFor="airport">Airport</label>
      <select id="airport" value={value} onChange={(event) => onChange(event.target.value)}>
        <option value="">Select an airport</option>
        {topAirports.map((airport) => (
          <option key={airport.code} value={airport.code}>
            {airport.code} — {airport.name}
          </option>
        ))}
      </select>
    </section>
  );
}
