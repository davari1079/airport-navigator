import React from 'react';
import { airportList } from '../data/airportGraphs';

/*
 * AirportSelector renders a dropdown list of airport codes and names.
 * Users choose the airport they want to navigate.  The list includes
 * all top 20 U.S. airports so that future expansions can be added
 * without changing this component.
 */
const AirportSelector = ({ airport, setAirport }) => {
  return (
    <div className="selector">
      <label htmlFor="airport-select">Airport</label>
      <select
        id="airport-select"
        value={airport}
        onChange={(e) => setAirport(e.target.value)}
      >
        <option value="">Select an airport</option>
        {airportList.map((item) => (
          <option key={item.code} value={item.code}>
            {item.code} – {item.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default AirportSelector;