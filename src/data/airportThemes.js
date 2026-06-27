const defaultTheme = {
  code: 'default',
  accent: '#0b65b9',
  accentDark: '#073b78',
  accentSoft: '#e4f3ff',
  warmth: '#d8a928',
  glow: 'rgba(11, 101, 185, 0.24)',
  sky: '#edf8ff',
  horizon: '#f7fbff',
  motif: 'gate',
  icon: '✈',
};

export const airportThemes = {
  ATL: { accent: '#0b5a8f', accentDark: '#083a63', accentSoft: '#e7f4ff', warmth: '#f2b84b', glow: 'rgba(242, 184, 75, 0.32)', sky: '#eef9ff', horizon: '#fff7ea', motif: 'atlanta-gateway', icon: '🍑' },
  LAX: { accent: '#1469b8', accentDark: '#073d78', accentSoft: '#e8f4ff', warmth: '#ffb36b', glow: 'rgba(255, 179, 107, 0.32)', sky: '#eaf8ff', horizon: '#fff0df', motif: 'pacific-sunset', icon: '🌴' },
  DFW: { accent: '#0d5f8f', accentDark: '#073f61', accentSoft: '#e6f5ff', warmth: '#d6a04b', glow: 'rgba(214, 160, 75, 0.3)', sky: '#edf8ff', horizon: '#fff7e9', motif: 'texas-hub', icon: '⭐' },
  DEN: { accent: '#12658d', accentDark: '#073f5c', accentSoft: '#e6f7ff', warmth: '#c6d8ef', glow: 'rgba(144, 190, 222, 0.34)', sky: '#edfaff', horizon: '#f3f7fb', motif: 'rocky-mountains', icon: '🏔️' },
  ORD: { accent: '#0b5da8', accentDark: '#07345f', accentSoft: '#e8f3ff', warmth: '#b8d8ff', glow: 'rgba(88, 158, 223, 0.3)', sky: '#eef7ff', horizon: '#f5fbff', motif: 'chicago-skyline', icon: '🌆' },
  JFK: { accent: '#0b5594', accentDark: '#062f5c', accentSoft: '#e8f2ff', warmth: '#ffd166', glow: 'rgba(255, 209, 102, 0.28)', sky: '#eef8ff', horizon: '#fff8e4', motif: 'nyc-gateway', icon: '🗽' },
  MCO: { accent: '#0875a8', accentDark: '#06476b', accentSoft: '#e2f8ff', warmth: '#ffcf5a', glow: 'rgba(255, 207, 90, 0.34)', sky: '#e9fbff', horizon: '#fff8dc', motif: 'orlando-sun', icon: '☀️' },
  LAS: { accent: '#6a3bbf', accentDark: '#351d6d', accentSoft: '#f2eaff', warmth: '#ffbe4d', glow: 'rgba(154, 87, 255, 0.35)', sky: '#f5efff', horizon: '#fff5df', motif: 'neon-desert', icon: '🎲' },
  CLT: { accent: '#114f8f', accentDark: '#092c59', accentSoft: '#e9f3ff', warmth: '#d4a73e', glow: 'rgba(212, 167, 62, 0.28)', sky: '#f0f8ff', horizon: '#fff8e9', motif: 'queen-city', icon: '👑' },
  MIA: { accent: '#008aa8', accentDark: '#064d64', accentSoft: '#e2fbff', warmth: '#ff8f7a', glow: 'rgba(255, 143, 122, 0.32)', sky: '#eaffff', horizon: '#fff0ea', motif: 'art-deco-coast', icon: '🌊' },
  SEA: { accent: '#0a6d77', accentDark: '#063e4a', accentSoft: '#e5f8f8', warmth: '#91c7b1', glow: 'rgba(99, 178, 166, 0.3)', sky: '#ecfbfb', horizon: '#eef8f4', motif: 'evergreen-rain', icon: '🌲' },
  EWR: { accent: '#0b5b91', accentDark: '#07385d', accentSoft: '#e8f5ff', warmth: '#ced7e4', glow: 'rgba(93, 147, 188, 0.28)', sky: '#eef7ff', horizon: '#f7fbff', motif: 'newark-harbor', icon: '🌉' },
  SFO: { accent: '#0a6f98', accentDark: '#08425f', accentSoft: '#e5f6ff', warmth: '#e27d5f', glow: 'rgba(226, 125, 95, 0.3)', sky: '#eef9ff', horizon: '#fff2ee', motif: 'bay-bridge-fog', icon: '🌁' },
  PHX: { accent: '#b75b25', accentDark: '#743315', accentSoft: '#fff1e7', warmth: '#f5bf4f', glow: 'rgba(245, 191, 79, 0.36)', sky: '#fff4e8', horizon: '#fffaf0', motif: 'desert-sky', icon: '🌵' },
  IAH: { accent: '#0b608c', accentDark: '#073854', accentSoft: '#e6f6ff', warmth: '#7ab8ff', glow: 'rgba(122, 184, 255, 0.3)', sky: '#eef8ff', horizon: '#f5fbff', motif: 'space-city', icon: '🚀' },
  BOS: { accent: '#0b5a8e', accentDark: '#073759', accentSoft: '#e8f5ff', warmth: '#b84d3e', glow: 'rgba(184, 77, 62, 0.25)', sky: '#f0f8ff', horizon: '#fff2ef', motif: 'harbor-brick', icon: '🧱' },
  FLL: { accent: '#0086a8', accentDark: '#074c61', accentSoft: '#e0fbff', warmth: '#ffd166', glow: 'rgba(255, 209, 102, 0.35)', sky: '#e8ffff', horizon: '#fff7da', motif: 'beach-cruise', icon: '🏖️' },
  MSP: { accent: '#0b668f', accentDark: '#073d59', accentSoft: '#e4f7ff', warmth: '#9cc9e8', glow: 'rgba(156, 201, 232, 0.32)', sky: '#eefaff', horizon: '#f4fbff', motif: 'lakes-north', icon: '❄️' },
  LGA: { accent: '#0a5c9f', accentDark: '#073a63', accentSoft: '#e7f3ff', warmth: '#f0c15a', glow: 'rgba(240, 193, 90, 0.28)', sky: '#eef8ff', horizon: '#fff7e5', motif: 'queens-gateway', icon: '🌉' },
  DTW: { accent: '#0b5b84', accentDark: '#07364f', accentSoft: '#e6f6ff', warmth: '#9aa7b1', glow: 'rgba(154, 167, 177, 0.3)', sky: '#eef8ff', horizon: '#f4f7fa', motif: 'motor-city', icon: '⚙️' },
};

export function getAirportTheme(code) {
  return { ...defaultTheme, ...(airportThemes[code] || {}) };
}

export function getThemeStyle(theme) {
  return {
    '--theme-accent': theme.accent,
    '--theme-accent-dark': theme.accentDark,
    '--theme-accent-soft': theme.accentSoft,
    '--theme-warmth': theme.warmth,
    '--theme-glow': theme.glow,
    '--theme-sky': theme.sky,
    '--theme-horizon': theme.horizon,
  };
}
