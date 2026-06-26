import { topAirports } from '../data/airportGraphs.js';

export default function AirportSelector({ value, onChange, t }) {
  return (
    <section className="guide-card selector-card">
      <label htmlFor="airport">{t.airportLabel}</label>
      <select id="airport" value={value} onChange={(event) => onChange(event.target.value)}>
        <option value="">{t.selectAirport}</option>
        {topAirports.map((airport) => (
          <option key={airport.code} value={airport.code}>
            {airport.code} — {airport.name}
          </option>
        ))}
      </select>
    </section>
  );
}
