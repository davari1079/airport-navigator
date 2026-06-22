import React from 'react';
import { airportGraphs } from '../data/airportGraphs';

/*
 * CurrentLocationSelector prompts the user to choose where they are
 * starting from within the selected airport.  It reads the list of
 * available nodes from the airport graph and renders a dropdown.
 */
const CurrentLocationSelector = ({ airport, current, setCurrent }) => {
  const graph = airportGraphs[airport];
  const options = graph && !graph.unsupported ? graph.nodes : [];
  return (
    <div className="selector">
      <label htmlFor="current-select">Current location</label>
      <select
        id="current-select"
        value={current}
        onChange={(e) => setCurrent(e.target.value)}
      >
        <option value="">Select your current location</option>
        {options.map((node) => (
          <option key={node} value={node}>
            {node}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CurrentLocationSelector;