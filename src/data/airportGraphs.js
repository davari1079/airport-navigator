const createNodeMap = (nodes) => nodes.reduce((map, node) => ({ ...map, [node.id]: node }), {});
const n = (id, label, shortLabel = label) => ({ id, label, shortLabel });
const edge = (from, to, mode, estimatedMinutes, instruction, options = {}) => ({
  from,
  to,
  mode,
  estimatedMinutes,
  officialMinutes: options.officialMinutes === undefined ? estimatedMinutes : options.officialMinutes,
  systemName: options.systemName || null,
  frequency: options.frequency || null,
  operatingHours: options.operatingHours || null,
  airsideOrLandside: options.airsideOrLandside || null,
  instruction,
  reverseInstruction: options.reverseInstruction || null,
  note: options.note || null,
  sourceNote: options.sourceNote || null,
  sourceConfidence: options.sourceConfidence || 'official_map_available_time_unspecified',
  canMergeWithSameSystem: Boolean(options.canMergeWithSameSystem),
  bidirectional: options.bidirectional !== false,
});

const officialUnknown = {
  officialMinutes: null,
  sourceNote: 'Travel time not specified by the extracted official source; app uses this only for routing order.',
  sourceConfidence: 'official_map_available_time_unspecified',
};

const mapAirport = (airport) => ({ ...airport, status: 'mapped', nodeMap: createNodeMap(airport.nodes) });

export const topAirports = [
  { code: 'ATL', name: 'Hartsfield-Jackson Atlanta International Airport' },
  { code: 'LAX', name: 'Los Angeles International Airport' },
  { code: 'DFW', name: 'Dallas/Fort Worth International Airport' },
  { code: 'DEN', name: 'Denver International Airport' },
  { code: 'ORD', name: "Chicago O'Hare International Airport" },
  { code: 'JFK', name: 'New York John F. Kennedy International Airport' },
  { code: 'MCO', name: 'Orlando International Airport' },
  { code: 'LAS', name: 'Las Vegas Harry Reid International Airport' },
  { code: 'CLT', name: 'Charlotte Douglas International Airport' },
  { code: 'MIA', name: 'Miami International Airport' },
  { code: 'SEA', name: 'Seattle-Tacoma International Airport' },
  { code: 'EWR', name: 'Newark Liberty International Airport' },
  { code: 'SFO', name: 'San Francisco International Airport' },
  { code: 'PHX', name: 'Phoenix Sky Harbor International Airport' },
  { code: 'IAH', name: 'Houston George Bush Intercontinental Airport' },
  { code: 'BOS', name: 'Boston Logan International Airport' },
  { code: 'FLL', name: 'Fort Lauderdale-Hollywood International Airport' },
  { code: 'MSP', name: 'Minneapolis-Saint Paul International Airport' },
  { code: 'LGA', name: 'New York LaGuardia Airport' },
  { code: 'DTW', name: 'Detroit Metropolitan Wayne County Airport' },
];

function commonGroundEdges(terminalId = 'terminal') {
  return [
    edge(terminalId, 'baggage-claim', 'walk', 4, 'Follow baggage claim signs from the terminal.', officialUnknown),
    edge('baggage-claim', 'ground-transportation', 'walk', 3, 'Follow ground transportation signs from baggage claim.', officialUnknown),
    edge('ground-transportation', 'rideshare-pickup', 'walk', 3, 'Follow rideshare pickup signs.', officialUnknown),
    edge('ground-transportation', 'rental-cars', 'walk', 5, 'Follow rental car signs from ground transportation.', officialUnknown),
    edge('ground-transportation', 'parking', 'walk', 4, 'Follow parking signs.', officialUnknown),
  ];
}

function simpleConcourseAirport({ code, name, city, concourses, systemName = null, extraNodes = [], extraEdges = [], advisory = 'Confirm your terminal, checkpoint, airline, gate, and official airport signs before moving.' }) {
  const nodes = [n('terminal', 'Terminal', 'Terminal'), n('security', 'Security', 'Security'), ...concourses.map((c) => n(`concourse-${c.toLowerCase()}`, `Concourse ${c}`, c)), n('baggage-claim', 'Baggage Claim', 'Bags'), n('ground-transportation', 'Ground Transportation', 'Ground'), n('rideshare-pickup', 'Rideshare Pickup', 'Ride'), n('rental-cars', 'Rental Cars', 'Rental'), n('parking', 'Parking', 'Parking'), ...extraNodes];
  const edges = [edge('terminal', 'security', 'walk', 4, 'Proceed from the terminal toward security screening.', officialUnknown), ...concourses.map((c, i) => edge('security', `concourse-${c.toLowerCase()}`, systemName ? 'train' : 'walk', 5 + i, systemName ? `Use ${systemName} or posted signs toward Concourse ${c}.` : `After security, follow signs to Concourse ${c}.`, systemName ? { ...officialUnknown, systemName, airsideOrLandside: 'airside', canMergeWithSameSystem: true } : officialUnknown)), ...commonGroundEdges('terminal'), ...extraEdges];
  return mapAirport({
    code, name, city,
    summary: `${city} airport route guide with terminal, concourse, baggage, ground transportation, rideshare, rental cars, and parking connections.`,
    layoutSummary: 'Terminal and concourse areas connected by walking routes and available airport transit systems.',
    officialMapResource: '#', officialTraversalResource: '#', currentAdvisory: advisory, sourceConfidence: 'basic_safe_guidance',
    nodes, edges,
    schematic: ['terminal', 'security', ...concourses.map((c) => `concourse-${c.toLowerCase()}`), 'baggage-claim', 'ground-transportation'],
    beforeMoveTip: 'Confirm the correct terminal, security checkpoint, airline gate, and official airport signage before starting.',
    watchOutTip: 'Airport construction, security access, gate changes, crowds, and roadway changes can affect the best route.',
    securityNotes: 'Concourse movements are modeled as post-security unless the route uses baggage claim, rental cars, rideshare, parking, or public transit.',
  });
}

function terminalAirport({ code, name, city, terminals, systemName = 'Inter-terminal Shuttle', transitNode = null, advisory }) {
  const nodes = [...terminals.map((t) => n(`terminal-${t.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`, `Terminal ${t}`, t)), n('baggage-claim', 'Baggage Claim', 'Bags'), n('ground-transportation', 'Ground Transportation', 'Ground'), n('rideshare-pickup', 'Rideshare Pickup', 'Ride'), n('rental-cars', 'Rental Cars', 'Rental'), n('parking', 'Parking', 'Parking'), ...(transitNode ? [transitNode] : [])];
  const termIds = terminals.map((t) => `terminal-${t.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`);
  const edges = [];
  for (let i = 0; i < termIds.length - 1; i += 1) {
    edges.push(edge(termIds[i], termIds[i + 1], systemName.toLowerCase().includes('train') || systemName.toLowerCase().includes('airtrain') ? 'train' : 'shuttle', 5, `Use ${systemName} or posted terminal connector signs between ${nodes[i].label} and ${nodes[i + 1].label}.`, { ...officialUnknown, systemName, airsideOrLandside: 'landside', canMergeWithSameSystem: true }));
  }
  termIds.forEach((id) => edges.push(edge(id, 'baggage-claim', 'walk', 5, 'Follow baggage claim signs from your terminal.', officialUnknown)));
  edges.push(...commonGroundEdges('baggage-claim'));
  if (transitNode) edges.push(edge('ground-transportation', transitNode.id, 'walk', 5, `Follow signs to ${transitNode.label}.`, officialUnknown));
  return mapAirport({
    code, name, city,
    summary: `${city} airport route guide with terminals, baggage claim, ground transportation, rideshare, rental cars, parking, and transit connections.`,
    layoutSummary: 'Multiple terminal areas connected by airport shuttle, train, or posted walking routes.',
    officialMapResource: '#', officialTraversalResource: '#', currentAdvisory: advisory || 'Confirm terminal assignments, checkpoint access, roadway routing, and official airport signage before moving.', sourceConfidence: 'basic_safe_guidance',
    nodes, edges, schematic: [...termIds, 'baggage-claim', 'ground-transportation'],
    beforeMoveTip: 'Confirm your terminal, gate, security access, and whether your transfer is airside or landside before moving.',
    watchOutTip: 'Terminal links can change due to construction, security status, or operating schedules.',
    securityNotes: `${systemName} is modeled as a terminal connector; confirm whether you must re-clear TSA before entering another gate area.`,
  });
}

export const airportGraphs = {
  ATL: simpleConcourseAirport({ code: 'ATL', name: 'Hartsfield-Jackson Atlanta International Airport', city: 'Atlanta', concourses: ['T', 'A', 'B', 'C', 'D', 'E', 'F'], systemName: 'Plane Train', extraNodes: [n('marta', 'MARTA Airport Station', 'MARTA')], extraEdges: [edge('ground-transportation', 'marta', 'walk', 3, 'Follow MARTA signs from ground transportation.', officialUnknown)] }),
  LAX: terminalAirport({ code: 'LAX', name: 'Los Angeles International Airport', city: 'Los Angeles', terminals: ['1', '2', '3', 'B / TBIT', '4', '5', '6', '7', '8'], systemName: 'Inter-terminal Shuttle', transitNode: n('lax-it', 'LAX-it Rideshare Pickup', 'LAX-it'), advisory: 'Terminal construction and LAX-it routing can affect the best pickup route.' }),
  DFW: terminalAirport({ code: 'DFW', name: 'Dallas/Fort Worth International Airport', city: 'Dallas-Fort Worth', terminals: ['A', 'B', 'C', 'D', 'E'], systemName: 'Skylink', transitNode: n('dart-station', 'DART Station', 'DART') }),
  DEN: simpleConcourseAirport({ code: 'DEN', name: 'Denver International Airport', city: 'Denver', concourses: ['A', 'B', 'C'], systemName: 'Train to the Gates', extraNodes: [n('rtd-a-line', 'RTD A Line Station', 'RTD')], extraEdges: [edge('ground-transportation', 'rtd-a-line', 'walk', 5, 'Follow Transit Center signs to the RTD A Line.', officialUnknown)] }),
  ORD: terminalAirport({ code: 'ORD', name: "Chicago O'Hare International Airport", city: 'Chicago', terminals: ['1', '2', '3', '5'], systemName: 'Airport Transit System', transitNode: n('cta-blue-line', 'CTA Blue Line Station', 'CTA') }),
  JFK: terminalAirport({ code: 'JFK', name: 'New York John F. Kennedy International Airport', city: 'New York', terminals: ['1', '4', '5', '7', '8'], systemName: 'AirTrain JFK', transitNode: n('jamaica-station', 'Jamaica Station / LIRR / Subway', 'Jamaica') }),
  MCO: terminalAirport({ code: 'MCO', name: 'Orlando International Airport', city: 'Orlando', terminals: ['A', 'B', 'C'], systemName: 'Terminal Link / Shuttle', transitNode: n('brightline', 'Brightline Station', 'Brightline') }),
  LAS: terminalAirport({ code: 'LAS', name: 'Las Vegas Harry Reid International Airport', city: 'Las Vegas', terminals: ['1', '3'], systemName: 'Inter-terminal Shuttle' }),
  CLT: simpleConcourseAirport({ code: 'CLT', name: 'Charlotte Douglas International Airport', city: 'Charlotte', concourses: ['A', 'B', 'C', 'D', 'E'] }),
  MIA: simpleConcourseAirport({ code: 'MIA', name: 'Miami International Airport', city: 'Miami', concourses: ['D', 'E', 'F', 'G', 'H', 'J'], systemName: 'Skytrain / Moving Walkway', extraNodes: [n('mia-mover', 'MIA Mover / Rental Car Center', 'MIA Mover')], extraEdges: [edge('ground-transportation', 'mia-mover', 'train', 5, 'Follow MIA Mover signs for rental car and transit connections.', { ...officialUnknown, systemName: 'MIA Mover', airsideOrLandside: 'landside' })] }),
  SEA: simpleConcourseAirport({ code: 'SEA', name: 'Seattle-Tacoma International Airport', city: 'Seattle', concourses: ['A', 'B', 'C', 'D'], systemName: 'SEA Underground Train', extraNodes: [n('north-satellite', 'North Satellite', 'N'), n('south-satellite', 'South Satellite', 'S'), n('link-light-rail', 'Link Light Rail', 'Link')], extraEdges: [edge('concourse-c', 'north-satellite', 'train', 5, 'Use SEA Underground Train toward North Satellite.', { ...officialUnknown, systemName: 'SEA Underground Train', airsideOrLandside: 'airside' }), edge('concourse-a', 'south-satellite', 'train', 5, 'Use SEA Underground Train toward South Satellite.', { ...officialUnknown, systemName: 'SEA Underground Train', airsideOrLandside: 'airside' }), edge('ground-transportation', 'link-light-rail', 'walk', 8, 'Follow Link Light Rail signs.', officialUnknown)] }),
  EWR: terminalAirport({ code: 'EWR', name: 'Newark Liberty International Airport', city: 'Newark', terminals: ['A', 'B', 'C'], systemName: 'AirTrain Newark', transitNode: n('rail-link', 'NJ Transit / Regional Rail', 'Rail') }),
  SFO: terminalAirport({ code: 'SFO', name: 'San Francisco International Airport', city: 'San Francisco', terminals: ['1', '2', '3', 'International A', 'International G'], systemName: 'AirTrain', transitNode: n('bart-station', 'BART Station', 'BART') }),
  PHX: terminalAirport({ code: 'PHX', name: 'Phoenix Sky Harbor International Airport', city: 'Phoenix', terminals: ['3', '4'], systemName: 'PHX Sky Train', transitNode: n('44th-street', '44th Street / Valley Metro Rail', '44th') }),
  IAH: terminalAirport({ code: 'IAH', name: 'Houston George Bush Intercontinental Airport', city: 'Houston', terminals: ['A', 'B', 'C', 'D', 'E'], systemName: 'Skyway / Subway', transitNode: n('metro', 'METRO / Downtown Direct', 'METRO') }),
  BOS: terminalAirport({ code: 'BOS', name: 'Boston Logan International Airport', city: 'Boston', terminals: ['A', 'B', 'C', 'E'], systemName: 'Terminal Shuttle', transitNode: n('silver-line', 'MBTA Silver Line', 'Silver') }),
  FLL: terminalAirport({ code: 'FLL', name: 'Fort Lauderdale-Hollywood International Airport', city: 'Fort Lauderdale', terminals: ['1', '2', '3', '4'], systemName: 'Terminal Shuttle', transitNode: n('tri-rail', 'Tri-Rail Shuttle', 'Tri-Rail') }),
  MSP: terminalAirport({ code: 'MSP', name: 'Minneapolis-Saint Paul International Airport', city: 'Minneapolis-Saint Paul', terminals: ['1', '2'], systemName: 'METRO Blue Line', transitNode: n('metro-blue-line', 'METRO Blue Line', 'Metro') }),
  LGA: terminalAirport({ code: 'LGA', name: 'New York LaGuardia Airport', city: 'New York', terminals: ['A', 'B', 'C'], systemName: 'All-Terminals Shuttle', transitNode: n('q70-bus', 'Q70 / MTA Bus Link', 'Q70') }),
  DTW: terminalAirport({ code: 'DTW', name: 'Detroit Metropolitan Wayne County Airport', city: 'Detroit', terminals: ['McNamara', 'Evans'], systemName: 'Terminal Shuttle' }),
};
