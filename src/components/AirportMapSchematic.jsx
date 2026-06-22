import React from 'react';

/*
 * AirportMapSchematic is a placeholder component.  In future
 * iterations it could render simplified SVG schematics of the airport
 * layout, but for the MVP we simply display the airport code and a
 * message inviting the user to follow the step‑by‑step instructions.
 */
const AirportMapSchematic = ({ airport }) => {
  return (
    <div className="map-schematic">
      <p>Map view for {airport} will appear here in a future update.</p>
    </div>
  );
};

export default AirportMapSchematic;