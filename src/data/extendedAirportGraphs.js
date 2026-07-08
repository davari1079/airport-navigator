import { airportGraphs as baseAirportGraphs, topAirports as baseTopAirports } from './airportGraphs.js';

const createNodeMap = (nodes) =>
  nodes.reduce((map, node) => {
    map[node.id] = node;
    return map;
  }, {});

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
  sourceNote: 'Travel time not specified; app uses this only for routing order.',
  sourceConfidence: 'official_map_available_time_unspecified',
};

const mapAirport = (airport) => ({
  ...airport,
  status: 'mapped',
  nodeMap: createNodeMap(airport.nodes),
});

const additionalAirports = {
  MEM: mapAirport({
    code: 'MEM',
    name: 'Memphis International Airport',
    city: 'Memphis',
    summary: 'Single-terminal Memphis airport layout with concourses, baggage claim, ground transportation, rideshare, rental cars, and parking connections.',
    layoutSummary: 'Terminal and concourse areas connected by walking routes with landside baggage and ground transportation links.',
    officialMapResource: 'https://flymemphis.com/',
    officialTraversalResource: 'https://flymemphis.com/',
    currentAdvisory: 'Confirm current airline check-in area, TSA checkpoint access, and gate assignment before moving.',
    sourceConfidence: 'basic_safe_guidance',
    nodes: [
      n('terminal', 'Terminal', 'Terminal'),
      n('security', 'Security', 'Security'),
      n('concourse-a', 'Concourse A', 'A'),
      n('concourse-b', 'Concourse B', 'B'),
      n('concourse-c', 'Concourse C', 'C'),
      n('baggage-claim', 'Baggage Claim', 'Bags'),
      n('ground-transportation', 'Ground Transportation', 'Ground'),
      n('rental-cars', 'Rental Cars', 'Rental'),
      n('rideshare-pickup', 'Rideshare Pickup', 'Ride'),
      n('parking', 'Parking', 'Parking'),
    ],
    edges: [
      edge('terminal', 'security', 'walk', 4, 'Proceed from the terminal toward security screening.', officialUnknown),
      edge('security', 'concourse-a', 'walk', 5, 'After security, follow signs to Concourse A.', officialUnknown),
      edge('security', 'concourse-b', 'walk', 5, 'After security, follow signs to Concourse B.', officialUnknown),
      edge('security', 'concourse-c', 'walk', 6, 'After security, follow signs to Concourse C.', officialUnknown),
      edge('terminal', 'baggage-claim', 'walk', 4, 'Follow baggage claim signs from the terminal.', officialUnknown),
      edge('baggage-claim', 'ground-transportation', 'walk', 3, 'Follow ground transportation signs from baggage claim.', officialUnknown),
      edge('ground-transportation', 'rental-cars', 'walk', 5, 'Follow rental car signs from ground transportation.', officialUnknown),
      edge('ground-transportation', 'rideshare-pickup', 'walk', 3, 'Follow rideshare pickup signs.', officialUnknown),
      edge('ground-transportation', 'parking', 'walk', 4, 'Follow parking signs.', officialUnknown),
    ],
    schematic: ['terminal', 'security', 'concourse-a', 'concourse-b', 'concourse-c', 'baggage-claim', 'ground-transportation'],
    beforeMoveTip: 'Confirm your airline, checkpoint, and gate assignment before leaving the terminal area.',
    watchOutTip: 'Use posted airport signs and current airline guidance for exact gate and pickup locations.',
    securityNotes: 'Concourse movements are modeled as post-security; baggage claim, rental cars, rideshare, and parking are landside.',
  }),



  AVL: mapAirport({
    code: 'AVL',
    name: 'Asheville Regional Airport',
    city: 'Asheville',
    summary: 'Asheville airport layout with terminal, security, gate area, baggage claim, ground transportation, rideshare, rental cars, and parking connections.',
    layoutSummary: 'Compact terminal layout with a central terminal, post-security gate area, and landside baggage and ground transportation access.',
    officialMapResource: 'https://flyavl.com/',
    officialTraversalResource: 'https://flyavl.com/',
    currentAdvisory: 'Confirm current checkpoint access, gate assignment, and pickup location before moving.',
    sourceConfidence: 'basic_safe_guidance',
    nodes: [
      n('terminal', 'Terminal', 'Terminal'),
      n('security', 'Security', 'Security'),
      n('gates', 'Gates / Boarding Area', 'Gates'),
      n('baggage-claim', 'Baggage Claim', 'Bags'),
      n('ground-transportation', 'Ground Transportation', 'Ground'),
      n('rental-cars', 'Rental Cars', 'Rental'),
      n('rideshare-pickup', 'Rideshare Pickup', 'Ride'),
      n('parking', 'Parking', 'Parking'),
    ],
    edges: [
      edge('terminal', 'security', 'walk', 3, 'Proceed from the terminal toward security screening.', officialUnknown),
      edge('security', 'gates', 'walk', 4, 'After security, continue to the gates and boarding area.', officialUnknown),
      edge('terminal', 'baggage-claim', 'walk', 3, 'Follow baggage claim signs from the terminal.', officialUnknown),
      edge('baggage-claim', 'ground-transportation', 'walk', 2, 'Follow ground transportation signs from baggage claim.', officialUnknown),
      edge('ground-transportation', 'rental-cars', 'walk', 4, 'Follow rental car signs from ground transportation.', officialUnknown),
      edge('ground-transportation', 'rideshare-pickup', 'walk', 3, 'Follow rideshare pickup signs.', officialUnknown),
      edge('ground-transportation', 'parking', 'walk', 3, 'Follow parking signs.', officialUnknown),
    ],
    schematic: ['terminal', 'security', 'gates', 'baggage-claim', 'ground-transportation'],
    beforeMoveTip: 'Confirm your checkpoint, gate, and pickup area before leaving the terminal area.',
    watchOutTip: 'Use posted airport signs and current airport guidance for exact gate and pickup locations.',
    securityNotes: 'Gate-area movements are modeled as post-security; baggage claim, rental cars, rideshare, and parking are landside.',
  }),

  BNA: mapAirport({
    code: 'BNA',
    name: 'Nashville International Airport',
    city: 'Nashville',
    summary: 'Nashville airport terminal layout with concourses, baggage claim, ground transportation, rideshare, rental cars, parking, and public transportation links.',
    layoutSummary: 'Central terminal with concourses connected by walking routes and landside ground transportation services.',
    officialMapResource: 'https://flynashville.com/',
    officialTraversalResource: 'https://flynashville.com/',
    currentAdvisory: 'Confirm current terminal construction, checkpoint routing, and gate assignment before moving.',
    sourceConfidence: 'basic_safe_guidance',
    nodes: [
      n('terminal', 'Terminal', 'Terminal'),
      n('security', 'Security', 'Security'),
      n('concourse-a', 'Concourse A', 'A'),
      n('concourse-b', 'Concourse B', 'B'),
      n('concourse-c', 'Concourse C', 'C'),
      n('concourse-d', 'Concourse D', 'D'),
      n('baggage-claim', 'Baggage Claim', 'Bags'),
      n('ground-transportation', 'Ground Transportation', 'Ground'),
      n('rental-cars', 'Rental Cars', 'Rental'),
      n('rideshare-pickup', 'Rideshare Pickup', 'Ride'),
      n('parking', 'Parking', 'Parking'),
      n('public-transit', 'Public Transit / Shuttles', 'Transit'),
    ],
    edges: [
      edge('terminal', 'security', 'walk', 4, 'Proceed from the terminal toward security screening.', officialUnknown),
      edge('security', 'concourse-a', 'walk', 5, 'After security, follow signs to Concourse A.', officialUnknown),
      edge('security', 'concourse-b', 'walk', 5, 'After security, follow signs to Concourse B.', officialUnknown),
      edge('security', 'concourse-c', 'walk', 6, 'After security, follow signs to Concourse C.', officialUnknown),
      edge('security', 'concourse-d', 'walk', 7, 'After security, follow signs to Concourse D.', officialUnknown),
      edge('terminal', 'baggage-claim', 'walk', 4, 'Follow baggage claim signs from the terminal.', officialUnknown),
      edge('baggage-claim', 'ground-transportation', 'walk', 3, 'Follow ground transportation signs from baggage claim.', officialUnknown),
      edge('ground-transportation', 'rental-cars', 'walk', 5, 'Follow rental car signs from ground transportation.', officialUnknown),
      edge('ground-transportation', 'rideshare-pickup', 'walk', 3, 'Follow rideshare pickup signs.', officialUnknown),
      edge('ground-transportation', 'parking', 'walk', 4, 'Follow parking signs.', officialUnknown),
      edge('ground-transportation', 'public-transit', 'walk', 4, 'Follow public transportation and shuttle signs.', officialUnknown),
    ],
    schematic: ['terminal', 'security', 'concourse-a', 'concourse-b', 'concourse-c', 'concourse-d', 'baggage-claim', 'ground-transportation'],
    beforeMoveTip: 'Confirm current construction routing, your checkpoint, and your gate before leaving the terminal area.',
    watchOutTip: 'Terminal construction and roadway changes can affect the best walking or pickup route.',
    securityNotes: 'Concourse movements are modeled as post-security; baggage claim, rental cars, rideshare, public transit, and parking are landside.',
  }),
};

export const airportGraphs = {
  ...baseAirportGraphs,
  ...additionalAirports,
};

export const topAirports = [
  ...baseTopAirports,
  { code: 'MEM', name: 'Memphis International Airport' },
  { code: 'BNA', name: 'Nashville International Airport' },
  { code: 'AVL', name: 'Asheville Regional Airport' },
];
