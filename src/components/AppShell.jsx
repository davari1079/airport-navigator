import React from 'react';
import DisclaimerBanner from './DisclaimerBanner';

/*
 * AppShell wraps the entire application to provide consistent padding
 * and an optional disclaimer banner at the bottom.  The disclaimer is
 * displayed on every page to remind users that airport information can
 * change and they should consult official resources.
 */
const AppShell = ({ children }) => {
  return (
    <div className="app-shell">
      {children}
      <DisclaimerBanner />
    </div>
  );
};

export default AppShell;