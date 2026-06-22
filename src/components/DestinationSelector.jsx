import React from 'react';
import { airportGraphs } from '../data/airportGraphs';

/*
 * DestinationSelector prompts the user to choose where they want to go
 * within the selected airport.  It shares logic with
 * CurrentLocationSelector but maintains separate state and labels.
 */
const DestinationSelector = ({ airport, destination, setDestination }) => {
  const graph = airportGraphs[airport];
  const options = graph && !graph.unsupported ? graph.nodes : [];
  return (
    <div className="selector">
      <label htmlFor="destination-select">Destination</label>
      <select
        id="destination-select"
        value={destination}
        onChange={(e) => setDestination(e.target.value)}
      >
        <option value="">Select your destination</option>
        {options.map((node) => (
          <option key={node} value={node}>
            {node}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DestinationSelector;