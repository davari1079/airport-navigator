export const languages = [
  { code: 'en', label: 'English' },
  { code: 'es', label: 'Español' },
  { code: 'fr', label: 'Français' },
  { code: 'zh', label: '中文（简体）' },
  { code: 'pt', label: 'Português' },
  { code: 'de', label: 'Deutsch' },
  { code: 'ja', label: '日本語' },
  { code: 'ko', label: '한국어' },
];

const base = {
  travelGuideMVP: 'Travel Guide Beta',
  airportLabel: 'Airport',
  appTitle: 'Airport Navigator',
  heroSubtitle: 'Find your way through major U.S. airports with confidence.',
  language: 'Language',
  selectAirport: 'Select an airport',
  currentLocationLabel: 'Starting point',
  selectCurrentLocation: 'Select starting point',
  destinationLabel: 'Destination',
  selectDestination: 'Select destination',
  calculateRoute: 'Calculate Route',
  functionalGuidePending: 'Functional guide pending',
  routeGraphNotReady: 'route graph is not ready yet.',
  noFakeRoute: 'No fake route will be shown. This airport needs source-backed route data before beta routing.',
  recommendedRoute: 'Recommended Route',
  to: 'to',
  startingPoint: 'Starting Point',
  estimatedNavigationTime: 'Estimated Navigation Time',
  timingRangeHelper: 'Avg. time uses the midpoint of the low and high stored estimate. It is not live data.',
  timeConfidence: 'Time Confidence',
  timeUnknownSummary: 'Time estimate unavailable',
  minutes: 'minutes',
  beforeMove: 'Before you move',
  securityNote: 'Security note',
  watchOutTip: 'Watch out tip',
  currentAdvisory: 'Current advisory',
  reminder: 'Reminder',
  routeReminder: 'Confirm signs, airline/gate information, security access, construction changes, and official airport guidance before moving.',
  changeRoute: 'Change Route',
  startOver: 'Start Over',
  recommendedPath: 'Simple route preview',
  timingBreakdown: 'Timing breakdown',
  walkingTime: 'Walking',
  rideTime: 'Train / Shuttle / Ride',
  expectedWait: 'Expected wait',
  navigationTimeDisclaimer: 'This estimate does not include TSA wait, airline check-in, baggage wait, customs/immigration, elevator delays, crowds, closures, or gate changes.',
  step: 'Step',
  frequency: 'Frequency',
  operatingHours: 'Operating hours',
  airsideConnection: 'Airside connection',
  landsideConnection: 'Landside connection',
};

const partials = {
  es: { language: 'Idioma', airportLabel: 'Aeropuerto', selectAirport: 'Seleccione un aeropuerto', appTitle: 'Navegador del aeropuerto', calculateRoute: 'Calcular ruta', recommendedRoute: 'Ruta recomendada', startingPoint: 'Punto de inicio', destinationLabel: 'Destino', changeRoute: 'Cambiar ruta', startOver: 'Empezar de nuevo' },
  fr: { language: 'Langue', airportLabel: 'Aéroport', selectAirport: 'Sélectionner un aéroport', appTitle: 'Navigateur d’aéroport', calculateRoute: 'Calculer l’itinéraire', recommendedRoute: 'Itinéraire recommandé', startingPoint: 'Point de départ', destinationLabel: 'Destination', changeRoute: 'Changer l’itinéraire', startOver: 'Recommencer' },
  zh: { language: '语言', airportLabel: '机场', selectAirport: '选择机场', appTitle: '机场导航', calculateRoute: '计算路线', recommendedRoute: '推荐路线', startingPoint: '起点', destinationLabel: '目的地', changeRoute: '更改路线', startOver: '重新开始' },
  pt: { language: 'Idioma', airportLabel: 'Aeroporto', selectAirport: 'Selecione um aeroporto', appTitle: 'Navegador do aeroporto', calculateRoute: 'Calcular rota', recommendedRoute: 'Rota recomendada', startingPoint: 'Ponto de partida', destinationLabel: 'Destino', changeRoute: 'Alterar rota', startOver: 'Recomeçar' },
  de: { language: 'Sprache', airportLabel: 'Flughafen', selectAirport: 'Flughafen auswählen', appTitle: 'Flughafen-Navigator', calculateRoute: 'Route berechnen', recommendedRoute: 'Empfohlene Route', startingPoint: 'Startpunkt', destinationLabel: 'Ziel', changeRoute: 'Route ändern', startOver: 'Neu starten' },
  ja: { language: '言語', airportLabel: '空港', selectAirport: '空港を選択', appTitle: '空港ナビゲーター', calculateRoute: 'ルートを計算', recommendedRoute: 'おすすめルート', startingPoint: '出発地点', destinationLabel: '目的地', changeRoute: 'ルート変更', startOver: 'やり直す' },
  ko: { language: '언어', airportLabel: '공항', selectAirport: '공항 선택', appTitle: '공항 내비게이터', calculateRoute: '경로 계산', recommendedRoute: '추천 경로', startingPoint: '출발지', destinationLabel: '목적지', changeRoute: '경로 변경', startOver: '처음부터' },
};

export function getTranslations(language = 'en') {
  return { ...base, ...(partials[language] || {}) };
}

export function displayNodeLabel(nodeId, nodeMap, _t = null, short = false) {
  const node = nodeMap?.[nodeId];
  if (!node) return nodeId;
  return short ? (node.shortLabel || node.label) : node.label;
}

export function displayAirportText(airport, key) {
  return airport?.[key] || '';
}
