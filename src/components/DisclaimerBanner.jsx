import React from 'react';

/*
 * DisclaimerBanner appears at the bottom of every page and reminds
 * travellers that airport layouts and services can change.  The
 * disclaimer encourages users to consult official resources when in
 * doubt.  Keeping it separate makes it easy to update without
 * touching other components.
 */
const DisclaimerBanner = () => {
  return (
    <div className="disclaimer">
      <p>
        Disclaimer: Airport layouts, gates, security access, transportation
        details and walking times can change. Always confirm with official
        airport resources and your airline.
      </p>
    </div>
  );
};

export default DisclaimerBanner;