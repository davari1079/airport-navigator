import DisclaimerBanner from './DisclaimerBanner.jsx';
import { getAirportTheme, getThemeStyle } from '../data/airportThemes.js';

export default function AppShell({ children, t, airport }) {
  const theme = getAirportTheme(airport?.code);
  const codeClass = airport?.code ? `theme-${airport.code.toLowerCase()}` : 'theme-default';

  return (
    <main
      className={`app-shell ${codeClass}`}
      lang={t.htmlLang || t.lang}
      dir={t.dir || 'ltr'}
      style={getThemeStyle(theme)}
    >
      <div className="sky-atmosphere" aria-hidden="true">
        <span className="atmosphere-glow glow-one" />
        <span className="atmosphere-glow glow-two" />
        <span className="atmosphere-flight-path" />
      </div>
      {children}
      <DisclaimerBanner t={t} />
    </main>
  );
}
