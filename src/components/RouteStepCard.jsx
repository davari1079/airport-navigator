import React from 'react';

/*
 * RouteStepCard displays a single step in the navigation route.  It
 * includes the step number, a descriptive instruction, any note
 * associated with the edge and the estimated time for that leg of the
 * journey.
 */
const RouteStepCard = ({ step, index }) => {
  return (
    <div className="card route-step">
      <strong>Step {index}</strong>
      <p>{step.instruction}</p>
      {step.note && <p className="note">{step.note}</p>}
      <p className="time">~{step.time} min</p>
    </div>
  );
};

export default RouteStepCard;