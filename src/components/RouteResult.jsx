import React from 'react';
import RouteStepCard from './RouteStepCard';
import { airportGraphs } from '../data/airportGraphs';

/*
 * RouteResult renders the navigation result screen.  It shows the
 * starting point, destination, total estimated time, a list of
 * RouteStepCards and contextual tips.  A button allows the user to
 * restart the flow.
 */
const RouteResult = ({ route, airport, reset }) => {
  const graph = airportGraphs[airport];
  if (route.unsupported) {
    return (
      <div className="unsupported">
        <p className="warning">Functional airport guide</p>
        <p>
          Detailed gate‑to‑gate timing may not be specified by official
          sources.  Use this guide for terminal, transit, baggage claim,
          rideshare, rental car and ground transportation orientation, then
          confirm directions with official airport signage and your airline app.
        </p>
        <button className="primary-btn" onClick={reset}>Back</button>
      </div>
    );
  }
  return (
    <div className="route-result">
      <h2>
        {route.start} → {route.end}
      </h2>
      <p className="total-time">
        {route.totalTime !== null && route.totalTime !== undefined
          ? `Estimated time: ${route.totalTime} min`
          : 'Estimated time: time not specified by official source'}
      </p>
      <div className="steps">
        {route.steps.map((step, idx) => (
          <RouteStepCard key={idx} step={step} index={idx + 1} />
        ))}
      </div>
      <div className="tips">
        <h3>Before you move</h3>
        <p>
          {graph?.beforeTips
            ? graph.beforeTips[Math.floor(Math.random() * graph.beforeTips.length)]
            : 'Double‑check your departure time and gate information.'}
        </p>
        <h3>Watch out</h3>
        <p>
          {graph?.watchTips
            ? graph.watchTips[Math.floor(Math.random() * graph.watchTips.length)]
            : 'Allow extra time for security lines or crowds.'}
        </p>
        <h3>Reminder</h3>
        <p>
          Please confirm directions with official airport signage, maps and your
          airline app.
        </p>
      </div>
      <button className="primary-btn" onClick={reset}>Start Over</button>
    </div>
  );
};

export default RouteResult;