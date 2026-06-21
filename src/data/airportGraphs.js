const createNodeMap = (nodes) =>
  nodes.reduce((map, node) => {
    map[node.id] = node;
    return map;
  }, {});

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

const atlNodes = [
  { id: 'domestic-terminal', label: 'Domestic Terminal', shortLabel: 'Domestic' },
  { id: 'domestic-north', label: 'Domestic North', shortLabel: 'North' },
  { id: 'domestic-south', label: 'Domestic South', shortLabel: 'South' },
  { id: 'security', label: 'Security', shortLabel: 'Security' },
  { id: 'concourse-t', label: 'Concourse T', shortLabel: 'T' },
  { id: 'concourse-a', label: 'Concourse A', shortLabel: 'A' },
  { id: 'concourse-b', label: 'Concourse B', shortLabel: 'B' },
  { id: 'concourse-c', label: 'Concourse C', shortLabel: 'C' },
  { id: 'concourse-d', label: 'Concourse D', shortLabel: 'D' },
  { id: 'concourse-e', label: 'Concourse E', shortLabel: 'E' },
  { id: 'concourse-f', label: 'Concourse F', shortLabel: 'F' },
  { id: 'international-terminal', label: 'International Terminal', shortLabel: 'Intl' },
  { id: 'baggage-claim', label: 'Baggage Claim', shortLabel: 'Bags' },
  { id: 'marta', label: 'MARTA', shortLabel: 'MARTA' },
  { id: 'ground-transportation', label: 'Ground Transportation', shortLabel: 'Ground' },
  { id: 'rental-car-center', label: 'Rental Car Center', shortLabel: 'Rental' },
  { id: 'rideshare-pickup', label: 'Rideshare Pickup', shortLabel: 'Ride' },
  { id: 'parking', label: 'Parking', shortLabel: 'Parking' },
];

const atlNodeMap = createNodeMap(atlNodes);

const atlEdges = [
  edge('domestic-terminal', 'domestic-north', 'walk', 2, 'Walk between the Domestic Terminal and Domestic North check-in area.'),
  edge('domestic-terminal', 'domestic-south', 'walk', 2, 'Walk between the Domestic Terminal and Domestic South check-in area.'),
  edge('domestic-terminal', 'security', 'walk', 5, 'Follow signs from the Domestic Terminal toward security screening.'),
  edge('security', 'concourse-t', 'walk', 5, 'After security, continue toward Concourse T.'),
  edge('concourse-t', 'concourse-a', 'walk', 5, 'Walk through the transportation mall from Concourse T to Concourse A.'),
  edge('concourse-a', 'concourse-b', 'walk', 5, 'Walk through the transportation mall from Concourse A to Concourse B.'),
  edge('concourse-b', 'concourse-c', 'walk', 5, 'Walk through the transportation mall from Concourse B to Concourse C.'),
  edge('concourse-c', 'concourse-d', 'walk', 5, 'Walk through the transportation mall from Concourse C to Concourse D.'),
  edge('concourse-d', 'concourse-e', 'walk', 5, 'Walk through the transportation mall from Concourse D to Concourse E.'),
  edge('concourse-e', 'concourse-f', 'walk', 10, 'Walk through the transportation mall from Concourse E to Concourse F.', 'E to F is a longer walk than adjacent ATL concourse moves.'),
  edge('concourse-t', 'concourse-a', 'train', 2, 'Take the Plane Train from Concourse T to Concourse A.', 'Plane Train time is an estimate and does not include waiting.'),
  edge('concourse-a', 'concourse-b', 'train', 2, 'Take the Plane Train from Concourse A to Concourse B.', 'Plane Train is usually preferred for longer concourse moves.'),
  edge('concourse-b', 'concourse-c', 'train', 2, 'Take the Plane Train from Concourse B to Concourse C.', 'Plane Train is usually preferred for longer concourse moves.'),
  edge('concourse-c', 'concourse-d', 'train', 2, 'Take the Plane Train from Concourse C to Concourse D.', 'Plane Train is usually preferred for longer concourse moves.'),
  edge('concourse-d', 'concourse-e', 'train', 2, 'Take the Plane Train from Concourse D to Concourse E.', 'Plane Train is usually preferred for longer concourse moves.'),
  edge('concourse-e', 'concourse-f', 'train', 2, 'Take the Plane Train from Concourse E to Concourse F.', 'Plane Train is usually preferred for E/F moves.'),
  edge('international-terminal', 'concourse-f', 'walk', 5, 'Follow International Terminal signs toward Concourse F.'),
  edge('domestic-terminal', 'baggage-claim', 'walk', 5, 'Follow baggage claim signs from the Domestic Terminal.'),
  edge('baggage-claim', 'ground-transportation', 'walk', 3, 'Follow ground transportation signs from baggage claim.'),
  edge('ground-transportation', 'rental-car-center', 'shuttle', 8, 'Use the rental car center shuttle connection.'),
  edge('ground-transportation', 'rideshare-pickup', 'walk', 3, 'Follow rideshare pickup signs from ground transportation.'),
  edge('ground-transportation', 'parking', 'walk', 3, 'Follow parking signs from ground transportation.'),
  edge('marta', 'domestic-terminal', 'walk', 2, 'Follow signs between MARTA and the Domestic Terminal.'),
];

const laxNodes = [
  { id: 'terminal-1', label: 'Terminal 1', shortLabel: 'T1' },
  { id: 'terminal-2', label: 'Terminal 2', shortLabel: 'T2' },
  { id: 'terminal-3', label: 'Terminal 3', shortLabel: 'T3' },
  { id: 'tbit', label: 'TBIT', shortLabel: 'TBIT' },
  { id: 'terminal-4', label: 'Terminal 4', shortLabel: 'T4' },
  { id: 'terminal-5', label: 'Terminal 5', shortLabel: 'T5' },
  { id: 'terminal-6', label: 'Terminal 6', shortLabel: 'T6' },
  { id: 'terminal-7', label: 'Terminal 7', shortLabel: 'T7' },
  { id: 'terminal-8', label: 'Terminal 8', shortLabel: 'T8' },
  { id: 'baggage-claim', label: 'Baggage Claim', shortLabel: 'Bags' },
  { id: 'ground-transportation', label: 'Ground Transportation', shortLabel: 'Ground' },
  { id: 'rideshare-pickup', label: 'Rideshare Pickup', shortLabel: 'Ride' },
  { id: 'parking', label: 'Parking', shortLabel: 'Parking' },
  { id: 'shuttle-stop', label: 'Shuttle Stop', shortLabel: 'Shuttle' },
];

const laxNodeMap = createNodeMap(laxNodes);

const laxEdges = [
  edge('terminal-1', 'terminal-2', 'walk', 5, 'Walk between Terminal 1 and Terminal 2 using airport signs.'),
  edge('terminal-2', 'terminal-3', 'walk', 5, 'Walk between Terminal 2 and Terminal 3.'),
  edge('terminal-3', 'tbit', 'walk', 5, 'Use the airside connector between Terminal 3 and TBIT.'),
  edge('tbit', 'terminal-4', 'walk', 5, 'Use the airside connector between TBIT and Terminal 4.'),
  edge('terminal-3', 'terminal-4', 'walk', 5, 'Use the airside connector from Terminal 3 toward Terminal 4.'),
  edge('terminal-4', 'terminal-5', 'walk', 5, 'Walk airside from Terminal 4 to Terminal 5.'),
  edge('terminal-5', 'terminal-6', 'walk', 5, 'Walk airside from Terminal 5 to Terminal 6.'),
  edge('terminal-6', 'terminal-7', 'walk', 6, 'Walk airside from Terminal 6 to Terminal 7.'),
  edge('terminal-7', 'terminal-8', 'walk', 6, 'Walk airside from Terminal 7 to Terminal 8.'),
  edge('terminal-1', 'tbit', 'bus', 10, 'Use the shuttle/bus-style connection from Terminal 1 toward TBIT.', 'Check posted signs for the latest Terminal 1 to TBIT shuttle access.'),
  edge('terminal-1', 'baggage-claim', 'walk', 5, 'Follow baggage claim signs from Terminal 1.'),
  edge('terminal-2', 'baggage-claim', 'walk', 5, 'Follow baggage claim signs from Terminal 2.'),
  edge('terminal-3', 'baggage-claim', 'walk', 5, 'Follow baggage claim signs from Terminal 3.'),
  edge('tbit', 'baggage-claim', 'walk', 5, 'Follow baggage claim signs from TBIT.'),
  edge('terminal-4', 'baggage-claim', 'walk', 5, 'Follow baggage claim signs from Terminal 4.'),
  edge('terminal-5', 'baggage-claim', 'walk', 5, 'Follow baggage claim signs from Terminal 5.'),
  edge('terminal-6', 'baggage-claim', 'walk', 5, 'Follow baggage claim signs from Terminal 6.'),
  edge('terminal-7', 'baggage-claim', 'walk', 5, 'Follow baggage claim signs from Terminal 7.'),
  edge('terminal-8', 'baggage-claim', 'walk', 5, 'Follow baggage claim signs from Terminal 8.'),
  edge('baggage-claim', 'ground-transportation', 'walk', 3, 'Follow ground transportation signs from baggage claim.'),
  edge('ground-transportation', 'rideshare-pickup', 'walk', 3, 'Follow rideshare pickup signs from ground transportation.'),
  edge('ground-transportation', 'parking', 'walk', 5, 'Follow parking signs from ground transportation.'),
  edge('ground-transportation', 'shuttle-stop', 'walk', 5, 'Follow shuttle signs from ground transportation.'),
];

function edge(from, to, mode, estimatedMinutes, instruction, note) {
  return { from, to, mode, estimatedMinutes, instruction, note };
}

function placeholder(code, name) {
  return {
    code,
    name,
    status: 'placeholder',
    nodes: [],
    edges: [],
  };
}

export const airportGraphs = {
  ATL: {
    code: 'ATL',
    name: 'Hartsfield-Jackson Atlanta International Airport',
    status: 'mapped',
    summary: 'ATL is mapped first with domestic, international, concourse, Plane Train, MARTA, baggage, rideshare, parking, and ground transportation nodes.',
    nodes: atlNodes,
    nodeMap: atlNodeMap,
    edges: atlEdges,
    schematic: ['domestic-terminal', 'security', 'concourse-t', 'concourse-a', 'concourse-b', 'concourse-c', 'concourse-d', 'concourse-e', 'concourse-f', 'international-terminal'],
    beforeMoveTip: 'Check your latest gate assignment, confirm whether you need domestic or international access, and keep your ID and boarding pass ready.',
    watchOutTip: 'For longer ATL concourse moves, especially toward E or F, the Plane Train is usually the better first option. Walking times are estimates.',
  },
  LAX: {
    code: 'LAX',
    name: 'Los Angeles International Airport',
    status: 'mapped',
    summary: 'LAX is mapped second with terminals, TBIT, airside walking connections, baggage, rideshare, parking, shuttle, and ground transportation nodes.',
    nodes: laxNodes,
    nodeMap: laxNodeMap,
    edges: laxEdges,
    schematic: ['terminal-1', 'terminal-2', 'terminal-3', 'tbit', 'terminal-4', 'terminal-5', 'terminal-6', 'terminal-7', 'terminal-8'],
    beforeMoveTip: 'Confirm your airline terminal and whether your route stays airside or requires exiting security. LAX terminal access can vary by airline and itinerary.',
    watchOutTip: 'LAX traffic and curbside pickup areas can slow you down. Use posted signs for current shuttle, rideshare, and ground transportation instructions.',
  },
  DFW: placeholder('DFW', 'Dallas/Fort Worth International Airport'),
  DEN: placeholder('DEN', 'Denver International Airport'),
  ORD: placeholder('ORD', "Chicago O'Hare International Airport"),
  JFK: placeholder('JFK', 'New York John F. Kennedy International Airport'),
  MCO: placeholder('MCO', 'Orlando International Airport'),
  LAS: placeholder('LAS', 'Las Vegas Harry Reid International Airport'),
  CLT: placeholder('CLT', 'Charlotte Douglas International Airport'),
  MIA: placeholder('MIA', 'Miami International Airport'),
  SEA: placeholder('SEA', 'Seattle-Tacoma International Airport'),
  EWR: placeholder('EWR', 'Newark Liberty International Airport'),
  SFO: placeholder('SFO', 'San Francisco International Airport'),
  PHX: placeholder('PHX', 'Phoenix Sky Harbor International Airport'),
  IAH: placeholder('IAH', 'Houston George Bush Intercontinental Airport'),
  BOS: placeholder('BOS', 'Boston Logan International Airport'),
  FLL: placeholder('FLL', 'Fort Lauderdale-Hollywood International Airport'),
  MSP: placeholder('MSP', 'Minneapolis-Saint Paul International Airport'),
  LGA: placeholder('LGA', 'New York LaGuardia Airport'),
  DTW: placeholder('DTW', 'Detroit Metropolitan Wayne County Airport'),
};
