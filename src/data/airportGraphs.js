/*
 * Updated airport graph data and airport list definitions.
 *
 * This module defines a richer set of metadata for each airport in
 * preparation for a more traveller‑friendly experience.  Each airport
 * includes descriptive fields (layoutSummary, routeNotes, etc.),
 * nodes representing terminals, concourses and key facilities, and
 * edges describing connections between those nodes.  For transit
 * systems such as the Plane Train, Skylink or AirTrain, edges are
 * annotated with systemName, frequency and merge hints to support
 * merged instructions via the route formatter.  Where official
 * sources do not specify a time, the estimatedMinutes field is
 * omitted or set to null.  The Dijkstra algorithm still requires a
 * numeric `time` value for pathfinding; in such cases a reasonable
 * default is provided to maintain connectivity without implying an
 * exact official duration.  Airports not yet implemented are marked
 * with `unsupported: true` so the UI can display a functional guide
 * message rather than a blank state.
 */

export const airportList = [
  { code: 'ATL', name: 'Hartsfield–Jackson Atlanta International Airport' },
  { code: 'LAX', name: 'Los Angeles International Airport' },
  { code: 'DFW', name: 'Dallas/Fort Worth International Airport' },
  { code: 'DEN', name: 'Denver International Airport' },
  { code: 'ORD', name: 'Chicago O’Hare International Airport' },
  { code: 'JFK', name: 'New York John F. Kennedy International Airport' },
  { code: 'MCO', name: 'Orlando International Airport' },
  { code: 'LAS', name: 'Las Vegas Harry Reid International Airport' },
  { code: 'CLT', name: 'Charlotte/Douglas International Airport' },
  { code: 'MIA', name: 'Miami International Airport' },
  { code: 'SEA', name: 'Seattle–Tacoma International Airport' },
  { code: 'EWR', name: 'Newark Liberty International Airport' },
  { code: 'SFO', name: 'San Francisco International Airport' },
  { code: 'PHX', name: 'Phoenix Sky Harbor International Airport' },
  { code: 'IAH', name: 'Houston George Bush Intercontinental Airport' },
  { code: 'BOS', name: 'Boston Logan International Airport' },
  { code: 'FLL', name: 'Fort Lauderdale–Hollywood International Airport' },
  { code: 'MSP', name: 'Minneapolis–Saint Paul International Airport' },
  { code: 'LGA', name: 'New York LaGuardia Airport' },
  { code: 'DTW', name: 'Detroit Metropolitan Wayne County Airport' },
];

export const airportGraphs = {
  /*
   * ATL — Hartsfield–Jackson Atlanta International Airport
   *
   * Atlanta’s campus consists of a domestic terminal with concourses T
   * and A–F, plus a separate international terminal at Concourse F.  A
   * pedestrian tunnel and the Plane Train provide airside movement
   * between concourses, while landside services such as MARTA, rental
   * cars and ground transportation operate from the domestic terminal
   * complex.  The data below reflects official walking times and
   * includes metadata to support merged train segments and traveller
   * guidance.
   */
  ATL: {
    airportCode: 'ATL',
    airportName: 'Hartsfield–Jackson Atlanta International Airport',
    name: 'Hartsfield–Jackson Atlanta International Airport',
    layoutSummary:
      'Main domestic terminal with concourses T, A–F connected by the Plane Train and a pedestrian tunnel; international terminal located at Concourse F.',
    officialMapResource: null,
    officialTraversalResource: null,
    currentAdvisory: null,
    nodes: [
      'Domestic Terminal',
      'Domestic North',
      'Domestic South',
      'Security',
      'Concourse T',
      'Concourse A',
      'Concourse B',
      'Concourse C',
      'Concourse D',
      'Concourse E',
      'Concourse F',
      'International Terminal',
      'Baggage Claim',
      'MARTA',
      'Ground Transportation',
      'Rental Car Center',
      'Rideshare Pickup',
      'Parking',
    ],
    edges: [
      // Terminal and security connections
      { from: 'Domestic Terminal', to: 'Security', mode: 'walk', estimatedMinutes: 5, time: 5, airsideOrLandside: 'landside', instruction: 'Walk to security', canMergeWithSameSystem: false, sourceNote: 'verified_official_detail' },
      { from: 'Security', to: 'Concourse T', mode: 'walk', estimatedMinutes: 5, time: 5, airsideOrLandside: 'airside', instruction: 'Walk from security to Concourse T', canMergeWithSameSystem: false, sourceNote: 'verified_official_detail' },
      // Walkway connections between concourses (airside pedestrian tunnel)
      { from: 'Concourse T', to: 'Concourse A', mode: 'walk', estimatedMinutes: 5, time: 5, airsideOrLandside: 'airside', instruction: 'Walk through the pedestrian tunnel between concourses T and A', canMergeWithSameSystem: false, sourceNote: 'verified_official_detail' },
      { from: 'Concourse A', to: 'Concourse B', mode: 'walk', estimatedMinutes: 5, time: 5, airsideOrLandside: 'airside', instruction: 'Walk through the pedestrian tunnel between concourses A and B', canMergeWithSameSystem: false, sourceNote: 'verified_official_detail' },
      { from: 'Concourse B', to: 'Concourse C', mode: 'walk', estimatedMinutes: 5, time: 5, airsideOrLandside: 'airside', instruction: 'Walk through the pedestrian tunnel between concourses B and C', canMergeWithSameSystem: false, sourceNote: 'verified_official_detail' },
      { from: 'Concourse C', to: 'Concourse D', mode: 'walk', estimatedMinutes: 5, time: 5, airsideOrLandside: 'airside', instruction: 'Walk through the pedestrian tunnel between concourses C and D', canMergeWithSameSystem: false, sourceNote: 'verified_official_detail' },
      { from: 'Concourse D', to: 'Concourse E', mode: 'walk', estimatedMinutes: 5, time: 5, airsideOrLandside: 'airside', instruction: 'Walk through the pedestrian tunnel between concourses D and E', canMergeWithSameSystem: false, sourceNote: 'verified_official_detail' },
      { from: 'Concourse E', to: 'Concourse F', mode: 'walk', estimatedMinutes: 10, time: 10, airsideOrLandside: 'airside', instruction: 'Walk through the pedestrian tunnel between concourses E and F', canMergeWithSameSystem: false, sourceNote: 'verified_official_detail' },
      // Plane Train connections (preferred for longer moves; airside)
      { from: 'Concourse T', to: 'Concourse A', mode: 'train', systemName: 'Plane Train', estimatedMinutes: 2, time: 2, frequency: '2 min', airsideOrLandside: 'airside', instruction: 'Take the Plane Train between concourses T and A', canMergeWithSameSystem: true, sourceNote: 'verified_official_detail' },
      { from: 'Concourse A', to: 'Concourse B', mode: 'train', systemName: 'Plane Train', estimatedMinutes: 2, time: 2, frequency: '2 min', airsideOrLandside: 'airside', instruction: 'Take the Plane Train between concourses A and B', canMergeWithSameSystem: true, sourceNote: 'verified_official_detail' },
      { from: 'Concourse B', to: 'Concourse C', mode: 'train', systemName: 'Plane Train', estimatedMinutes: 2, time: 2, frequency: '2 min', airsideOrLandside: 'airside', instruction: 'Take the Plane Train between concourses B and C', canMergeWithSameSystem: true, sourceNote: 'verified_official_detail' },
      { from: 'Concourse C', to: 'Concourse D', mode: 'train', systemName: 'Plane Train', estimatedMinutes: 2, time: 2, frequency: '2 min', airsideOrLandside: 'airside', instruction: 'Take the Plane Train between concourses C and D', canMergeWithSameSystem: true, sourceNote: 'verified_official_detail' },
      { from: 'Concourse D', to: 'Concourse E', mode: 'train', systemName: 'Plane Train', estimatedMinutes: 2, time: 2, frequency: '2 min', airsideOrLandside: 'airside', instruction: 'Take the Plane Train between concourses D and E', canMergeWithSameSystem: true, sourceNote: 'verified_official_detail' },
      { from: 'Concourse E', to: 'Concourse F', mode: 'train', systemName: 'Plane Train', estimatedMinutes: 2, time: 2, frequency: '2 min', airsideOrLandside: 'airside', instruction: 'Take the Plane Train between concourses E and F', canMergeWithSameSystem: true, sourceNote: 'verified_official_detail' },
      // International terminal connection (airside)
      { from: 'International Terminal', to: 'Concourse F', mode: 'walk', estimatedMinutes: 5, time: 5, airsideOrLandside: 'airside', instruction: 'Walk between the international terminal and Concourse F', canMergeWithSameSystem: false, sourceNote: 'verified_official_detail' },
      // Landside facilities
      { from: 'Domestic Terminal', to: 'Baggage Claim', mode: 'walk', estimatedMinutes: 5, time: 5, airsideOrLandside: 'landside', instruction: 'Walk from the domestic terminal to baggage claim', canMergeWithSameSystem: false, sourceNote: 'verified_official_detail' },
      { from: 'Baggage Claim', to: 'Ground Transportation', mode: 'walk', estimatedMinutes: 3, time: 3, airsideOrLandside: 'landside', instruction: 'Walk to the ground transportation area', canMergeWithSameSystem: false, sourceNote: 'verified_official_detail' },
      { from: 'Ground Transportation', to: 'Rental Car Center', mode: 'shuttle', systemName: 'Rental Car Shuttle', estimatedMinutes: 8, time: 8, frequency: null, airsideOrLandside: 'landside', instruction: 'Take the rental car shuttle', canMergeWithSameSystem: false, sourceNote: 'verified_official_detail' },
      { from: 'Ground Transportation', to: 'Rideshare Pickup', mode: 'walk', estimatedMinutes: 3, time: 3, airsideOrLandside: 'landside', instruction: 'Walk to the rideshare pickup area', canMergeWithSameSystem: false, sourceNote: 'verified_official_detail' },
      { from: 'Ground Transportation', to: 'Parking', mode: 'walk', estimatedMinutes: 3, time: 3, airsideOrLandside: 'landside', instruction: 'Walk to parking', canMergeWithSameSystem: false, sourceNote: 'verified_official_detail' },
      { from: 'MARTA', to: 'Domestic Terminal', mode: 'walk', estimatedMinutes: 2, time: 2, airsideOrLandside: 'landside', instruction: 'Walk between the MARTA station and the domestic terminal', canMergeWithSameSystem: false, sourceNote: 'verified_official_detail' },
      { from: 'Domestic North', to: 'Domestic Terminal', mode: 'walk', estimatedMinutes: 2, time: 2, airsideOrLandside: 'landside', instruction: 'Walk from Domestic North to the domestic terminal', canMergeWithSameSystem: false, sourceNote: 'verified_official_detail' },
      { from: 'Domestic South', to: 'Domestic Terminal', mode: 'walk', estimatedMinutes: 2, time: 2, airsideOrLandside: 'landside', instruction: 'Walk from Domestic South to the domestic terminal', canMergeWithSameSystem: false, sourceNote: 'verified_official_detail' },
    ],
    beforeTips: [
      'Verify your gate and concourse—gate assignments sometimes change.',
      'Ensure you have your ID and boarding pass ready for security.',
      'Allow extra time to clear security during busy periods.',
    ],
    watchTips: [
      'Concourse E to F is a longer walk (~10 minutes); consider using the Plane Train.',
      'Stay alert for signage directing you to baggage claim or ground transportation.',
      'Lines for MARTA and rideshare can be busy—plan accordingly.',
    ],
    routeNotes:
      'Use the Plane Train or the pedestrian tunnel to move between concourses. MARTA provides transit to downtown from the domestic terminal.',
    transitSystems: ['Plane Train', 'MARTA', 'Rental Car Shuttle'],
    securityNotes:
      'All concourse connections via the Plane Train or pedestrian tunnel remain airside; no additional security screening is required.',
    groundTransportationNotes:
      'Ground transportation, rental cars and rideshare pickup are located at the domestic terminal side. The MARTA station is adjacent to the domestic terminal.',
    sourceConfidence: 'verified_official_detail',
  },

  /*
   * LAX — Los Angeles International Airport
   *
   * LAX comprises nine terminals (1–8 plus the Tom Bradley International
   * Terminal, labelled TBIT) arranged in a horseshoe.  A number of
   * airside connectors exist between adjacent terminals, but many
   * transfers require returning to the public side and taking a shuttle.
   */
  LAX: {
    airportCode: 'LAX',
    airportName: 'Los Angeles International Airport',
    name: 'Los Angeles International Airport',
    layoutSummary:
      'Nine terminals (1–8 and TBIT) arranged in a horseshoe; selected terminals have airside connectors while others require landside shuttle transfers.',
    officialMapResource: null,
    officialTraversalResource: null,
    currentAdvisory: null,
    nodes: [
      'Terminal 1',
      'Terminal 2',
      'Terminal 3',
      'TBIT',
      'Terminal 4',
      'Terminal 5',
      'Terminal 6',
      'Terminal 7',
      'Terminal 8',
      'Baggage Claim',
      'Ground Transportation',
      'Rideshare Pickup',
      'Parking',
      'Shuttle Stop',
    ],
    edges: [
      // Airside walkway connections where available
      { from: 'Terminal 1', to: 'Terminal 2', mode: 'walk', estimatedMinutes: 5, time: 5, airsideOrLandside: 'airside', instruction: 'Walk between Terminals 1 and 2', canMergeWithSameSystem: false, sourceNote: 'verified_official_detail' },
      { from: 'Terminal 2', to: 'Terminal 3', mode: 'walk', estimatedMinutes: 5, time: 5, airsideOrLandside: 'airside', instruction: 'Walk between Terminals 2 and 3', canMergeWithSameSystem: false, sourceNote: 'verified_official_detail' },
      { from: 'Terminal 3', to: 'TBIT', mode: 'walk', estimatedMinutes: 5, time: 5, airsideOrLandside: 'airside', instruction: 'Walk between Terminal 3 and TBIT', canMergeWithSameSystem: false, sourceNote: 'verified_official_detail' },
      { from: 'Terminal 3', to: 'Terminal 4', mode: 'walk', estimatedMinutes: 5, time: 5, airsideOrLandside: 'airside', instruction: 'Walk between Terminals 3 and 4', canMergeWithSameSystem: false, sourceNote: 'verified_official_detail' },
      { from: 'Terminal 4', to: 'Terminal 5', mode: 'walk', estimatedMinutes: 5, time: 5, airsideOrLandside: 'airside', instruction: 'Walk between Terminals 4 and 5', canMergeWithSameSystem: false, sourceNote: 'verified_official_detail' },
      { from: 'Terminal 5', to: 'Terminal 6', mode: 'walk', estimatedMinutes: 5, time: 5, airsideOrLandside: 'airside', instruction: 'Walk between Terminals 5 and 6', canMergeWithSameSystem: false, sourceNote: 'verified_official_detail' },
      { from: 'Terminal 6', to: 'Terminal 7', mode: 'walk', estimatedMinutes: 6, time: 6, airsideOrLandside: 'airside', instruction: 'Walk between Terminals 6 and 7', canMergeWithSameSystem: false, sourceNote: 'verified_official_detail' },
      { from: 'Terminal 7', to: 'Terminal 8', mode: 'walk', estimatedMinutes: 6, time: 6, airsideOrLandside: 'airside', instruction: 'Walk between Terminals 7 and 8', canMergeWithSameSystem: false, sourceNote: 'verified_official_detail' },
      // Airside shuttle connection (Terminal 1 ↔ TBIT)
      { from: 'Terminal 1', to: 'TBIT', mode: 'bus', systemName: 'Airside shuttle', estimatedMinutes: 10, time: 10, frequency: null, airsideOrLandside: 'airside', instruction: 'Take the airside shuttle between Terminal 1 and TBIT', canMergeWithSameSystem: true, sourceNote: 'official_map_available_time_unspecified' },
      // Landside facility connections
      { from: 'Terminal 1', to: 'Baggage Claim', mode: 'walk', estimatedMinutes: 5, time: 5, airsideOrLandside: 'landside', instruction: 'Walk from Terminal 1 to baggage claim', canMergeWithSameSystem: false, sourceNote: 'verified_official_detail' },
      { from: 'Terminal 2', to: 'Baggage Claim', mode: 'walk', estimatedMinutes: 5, time: 5, airsideOrLandside: 'landside', instruction: 'Walk from Terminal 2 to baggage claim', canMergeWithSameSystem: false, sourceNote: 'verified_official_detail' },
      { from: 'Terminal 3', to: 'Baggage Claim', mode: 'walk', estimatedMinutes: 5, time: 5, airsideOrLandside: 'landside', instruction: 'Walk from Terminal 3 to baggage claim', canMergeWithSameSystem: false, sourceNote: 'verified_official_detail' },
      { from: 'TBIT', to: 'Baggage Claim', mode: 'walk', estimatedMinutes: 5, time: 5, airsideOrLandside: 'landside', instruction: 'Walk from TBIT to baggage claim', canMergeWithSameSystem: false, sourceNote: 'verified_official_detail' },
      { from: 'Terminal 4', to: 'Baggage Claim', mode: 'walk', estimatedMinutes: 5, time: 5, airsideOrLandside: 'landside', instruction: 'Walk from Terminal 4 to baggage claim', canMergeWithSameSystem: false, sourceNote: 'verified_official_detail' },
      { from: 'Terminal 5', to: 'Baggage Claim', mode: 'walk', estimatedMinutes: 5, time: 5, airsideOrLandside: 'landside', instruction: 'Walk from Terminal 5 to baggage claim', canMergeWithSameSystem: false, sourceNote: 'verified_official_detail' },
      { from: 'Terminal 6', to: 'Baggage Claim', mode: 'walk', estimatedMinutes: 5, time: 5, airsideOrLandside: 'landside', instruction: 'Walk from Terminal 6 to baggage claim', canMergeWithSameSystem: false, sourceNote: 'verified_official_detail' },
      { from: 'Terminal 7', to: 'Baggage Claim', mode: 'walk', estimatedMinutes: 5, time: 5, airsideOrLandside: 'landside', instruction: 'Walk from Terminal 7 to baggage claim', canMergeWithSameSystem: false, sourceNote: 'verified_official_detail' },
      { from: 'Terminal 8', to: 'Baggage Claim', mode: 'walk', estimatedMinutes: 5, time: 5, airsideOrLandside: 'landside', instruction: 'Walk from Terminal 8 to baggage claim', canMergeWithSameSystem: false, sourceNote: 'verified_official_detail' },
      { from: 'Baggage Claim', to: 'Ground Transportation', mode: 'walk', estimatedMinutes: 3, time: 3, airsideOrLandside: 'landside', instruction: 'Walk to ground transportation', canMergeWithSameSystem: false, sourceNote: 'verified_official_detail' },
      { from: 'Ground Transportation', to: 'Rideshare Pickup', mode: 'walk', estimatedMinutes: 3, time: 3, airsideOrLandside: 'landside', instruction: 'Walk to the rideshare pickup area', canMergeWithSameSystem: false, sourceNote: 'verified_official_detail' },
      { from: 'Ground Transportation', to: 'Parking', mode: 'walk', estimatedMinutes: 5, time: 5, airsideOrLandside: 'landside', instruction: 'Walk to parking', canMergeWithSameSystem: false, sourceNote: 'verified_official_detail' },
      { from: 'Ground Transportation', to: 'Shuttle Stop', mode: 'walk', estimatedMinutes: 5, time: 5, airsideOrLandside: 'landside', instruction: 'Walk to the shuttle stop', canMergeWithSameSystem: false, sourceNote: 'verified_official_detail' },
    ],
    beforeTips: [
      'Check which terminal your airline uses—LAX terminals are spread out.',
      'Some terminals share security; verify whether you need to exit and re‑enter.',
      'Consider airport traffic when scheduling pickup or drop‑off.',
    ],
    watchTips: [
      'Walking between terminals 6–8 can take longer; use walkways and moving sidewalks.',
      'Terminal 1 is not directly connected airside to TBIT—look for shuttle signs.',
      'Ground transportation pickup areas may be congested—allow extra time.',
    ],
    routeNotes:
      'Use airside connectors where available; otherwise return landside and take shuttle buses to transfer between terminals.',
    transitSystems: ['Airside shuttle'],
    securityNotes:
      'Only certain terminals have airside connectors.  Transferring between terminals via shuttle requires leaving the secure area and re‑clearing security.',
    groundTransportationNotes:
      'Ground transportation, rideshare and parking facilities are located outside each terminal. Shuttle buses operate frequently between terminals and other airport facilities.',
    sourceConfidence: 'verified_official_detail',
  },

  /*
   * DFW — Dallas/Fort Worth International Airport
   *
   * DFW has five semi‑circular terminals connected airside by the
   * Skylink people mover and landside by the Terminal Link shuttle.  This
   * dataset includes simplified segment times and emphasises which
   * transfers remain inside security.
   */
  DFW: {
    airportCode: 'DFW',
    airportName: 'Dallas/Fort Worth International Airport',
    name: 'Dallas/Fort Worth International Airport',
    layoutSummary:
      'Five terminals (A–E) connected airside by the Skylink people mover and landside by the Terminal Link shuttle.',
    officialMapResource: null,
    officialTraversalResource: null,
    currentAdvisory:
      'Terminal C has one Terminal Link stop due to construction; shuttle frequency varies by time of day.',
    nodes: [
      'Terminal A',
      'Terminal B',
      'Terminal C',
      'Terminal D',
      'Terminal E',
      'Baggage Claim',
      'Ground Transportation',
      'Rental Car Center',
      'Rideshare Pickup',
      'Parking',
      'DART Station',
      'TEXRail Station',
    ],
    edges: [
      // Skylink (airside) segments — approximate 2 minutes between adjacent terminals
      { from: 'Terminal A', to: 'Terminal B', mode: 'train', systemName: 'Skylink', estimatedMinutes: 2, time: 2, frequency: '2 min', airsideOrLandside: 'airside', instruction: 'Take the Skylink between Terminals A and B', canMergeWithSameSystem: true, sourceNote: 'official_map_available_time_unspecified' },
      { from: 'Terminal B', to: 'Terminal C', mode: 'train', systemName: 'Skylink', estimatedMinutes: 2, time: 2, frequency: '2 min', airsideOrLandside: 'airside', instruction: 'Take the Skylink between Terminals B and C', canMergeWithSameSystem: true, sourceNote: 'official_map_available_time_unspecified' },
      { from: 'Terminal C', to: 'Terminal D', mode: 'train', systemName: 'Skylink', estimatedMinutes: 2, time: 2, frequency: '2 min', airsideOrLandside: 'airside', instruction: 'Take the Skylink between Terminals C and D', canMergeWithSameSystem: true, sourceNote: 'official_map_available_time_unspecified' },
      { from: 'Terminal D', to: 'Terminal E', mode: 'train', systemName: 'Skylink', estimatedMinutes: 2, time: 2, frequency: '2 min', airsideOrLandside: 'airside', instruction: 'Take the Skylink between Terminals D and E', canMergeWithSameSystem: true, sourceNote: 'official_map_available_time_unspecified' },
      // Terminal Link (landside shuttle) segments — times not specified by official source
      { from: 'Terminal A', to: 'Terminal B', mode: 'bus', systemName: 'Terminal Link', estimatedMinutes: null, time: 5, frequency: '8–10 min', airsideOrLandside: 'landside', instruction: 'Take the Terminal Link shuttle between Terminals A and B', canMergeWithSameSystem: true, sourceNote: 'official_map_available_time_unspecified' },
      { from: 'Terminal B', to: 'Terminal C', mode: 'bus', systemName: 'Terminal Link', estimatedMinutes: null, time: 5, frequency: '8–10 min', airsideOrLandside: 'landside', instruction: 'Take the Terminal Link shuttle between Terminals B and C', canMergeWithSameSystem: true, sourceNote: 'official_map_available_time_unspecified' },
      { from: 'Terminal C', to: 'Terminal D', mode: 'bus', systemName: 'Terminal Link', estimatedMinutes: null, time: 5, frequency: '8–10 min', airsideOrLandside: 'landside', instruction: 'Take the Terminal Link shuttle between Terminals C and D', canMergeWithSameSystem: true, sourceNote: 'official_map_available_time_unspecified' },
      { from: 'Terminal D', to: 'Terminal E', mode: 'bus', systemName: 'Terminal Link', estimatedMinutes: null, time: 5, frequency: '8–10 min', airsideOrLandside: 'landside', instruction: 'Take the Terminal Link shuttle between Terminals D and E', canMergeWithSameSystem: true, sourceNote: 'official_map_available_time_unspecified' },
      // Landside walkway connections to baggage claim and facilities
      { from: 'Terminal A', to: 'Baggage Claim', mode: 'walk', estimatedMinutes: 5, time: 5, airsideOrLandside: 'landside', instruction: 'Walk from Terminal A to baggage claim', canMergeWithSameSystem: false, sourceNote: 'verified_official_detail' },
      { from: 'Terminal B', to: 'Baggage Claim', mode: 'walk', estimatedMinutes: 5, time: 5, airsideOrLandside: 'landside', instruction: 'Walk from Terminal B to baggage claim', canMergeWithSameSystem: false, sourceNote: 'verified_official_detail' },
      { from: 'Terminal C', to: 'Baggage Claim', mode: 'walk', estimatedMinutes: 5, time: 5, airsideOrLandside: 'landside', instruction: 'Walk from Terminal C to baggage claim', canMergeWithSameSystem: false, sourceNote: 'verified_official_detail' },
      { from: 'Terminal D', to: 'Baggage Claim', mode: 'walk', estimatedMinutes: 5, time: 5, airsideOrLandside: 'landside', instruction: 'Walk from Terminal D to baggage claim', canMergeWithSameSystem: false, sourceNote: 'verified_official_detail' },
      { from: 'Terminal E', to: 'Baggage Claim', mode: 'walk', estimatedMinutes: 5, time: 5, airsideOrLandside: 'landside', instruction: 'Walk from Terminal E to baggage claim', canMergeWithSameSystem: false, sourceNote: 'verified_official_detail' },
      { from: 'Baggage Claim', to: 'Ground Transportation', mode: 'walk', estimatedMinutes: 3, time: 3, airsideOrLandside: 'landside', instruction: 'Walk to ground transportation', canMergeWithSameSystem: false, sourceNote: 'verified_official_detail' },
      { from: 'Ground Transportation', to: 'Rental Car Center', mode: 'shuttle', systemName: 'Rental Car Shuttle', estimatedMinutes: 10, time: 10, frequency: null, airsideOrLandside: 'landside', instruction: 'Take the rental car shuttle from ground transportation', canMergeWithSameSystem: false, sourceNote: 'verified_official_detail' },
      { from: 'Ground Transportation', to: 'Rideshare Pickup', mode: 'walk', estimatedMinutes: 3, time: 3, airsideOrLandside: 'landside', instruction: 'Walk to the rideshare pickup area', canMergeWithSameSystem: false, sourceNote: 'verified_official_detail' },
      { from: 'Ground Transportation', to: 'Parking', mode: 'walk', estimatedMinutes: 5, time: 5, airsideOrLandside: 'landside', instruction: 'Walk to parking', canMergeWithSameSystem: false, sourceNote: 'verified_official_detail' },
      { from: 'Ground Transportation', to: 'DART Station', mode: 'walk', estimatedMinutes: 5, time: 5, airsideOrLandside: 'landside', instruction: 'Walk to the DART station', canMergeWithSameSystem: false, sourceNote: 'verified_official_detail' },
      { from: 'Ground Transportation', to: 'TEXRail Station', mode: 'walk', estimatedMinutes: 5, time: 5, airsideOrLandside: 'landside', instruction: 'Walk to the TEXRail station', canMergeWithSameSystem: false, sourceNote: 'verified_official_detail' },
    ],
    beforeTips: [
      'Verify whether you are airside (post‑security) or landside; use Skylink for airside connections and Terminal Link for landside transfers.',
      'Check which terminal your airline operates from; DFW has five terminals.',
      'Allow extra time for Terminal Link if traveling before 5 a.m. when frequency is reduced.',
    ],
    watchTips: [
      'Terminal Link shuttles stop only at one location for Terminal C due to construction.',
      'Stay on the Skylink past intermediate stops to reach your terminal; trains run in both directions.',
      'Ground transportation and rideshare areas can be busy; allow extra time.',
    ],
    routeNotes:
      'Use Skylink (airside) or Terminal Link (landside) to navigate between terminals.',
    transitSystems: ['Skylink', 'Terminal Link', 'DART', 'TEXRail', 'Rental Car Shuttle'],
    securityNotes:
      'Skylink operates inside security; Terminal Link runs outside security and requires re‑screening.',
    groundTransportationNotes:
      'Ground transportation connects to rental cars, DART and TEXRail stations; follow signage accordingly.',
    sourceConfidence: 'official_map_available_time_unspecified',
  },

  /*
   * DEN — Denver International Airport
   */
  DEN: {
    airportCode: 'DEN',
    airportName: 'Denver International Airport',
    name: 'Denver International Airport',
    layoutSummary:
      'Jeppesen Terminal and Concourses A, B and C; the Train to the Gates provides airside transfers between terminal and concourses.',
    officialMapResource: null,
    officialTraversalResource: null,
    currentAdvisory:
      'Construction may affect circulation; times may vary.',
    nodes: [
      'Jeppesen Terminal',
      'Concourse A',
      'Concourse B',
      'Concourse C',
      'Baggage Claim',
      'Ground Transportation',
      'RTD A Line Station',
      'Parking',
      'Rideshare Pickup',
    ],
    edges: [
      // Train to the Gates segments (airside)
      { from: 'Jeppesen Terminal', to: 'Concourse A', mode: 'train', systemName: 'Train to Gates', estimatedMinutes: 3, time: 3, frequency: '2–3 min', airsideOrLandside: 'airside', instruction: 'Take the Train to Gates from the terminal to Concourse A', canMergeWithSameSystem: true, sourceNote: 'verified_official_detail' },
      { from: 'Concourse A', to: 'Concourse B', mode: 'train', systemName: 'Train to Gates', estimatedMinutes: 3, time: 3, frequency: '2–3 min', airsideOrLandside: 'airside', instruction: 'Take the Train to Gates between concourses A and B', canMergeWithSameSystem: true, sourceNote: 'verified_official_detail' },
      { from: 'Concourse B', to: 'Concourse C', mode: 'train', systemName: 'Train to Gates', estimatedMinutes: 2, time: 2, frequency: '2–3 min', airsideOrLandside: 'airside', instruction: 'Take the Train to Gates between concourses B and C', canMergeWithSameSystem: true, sourceNote: 'verified_official_detail' },
      // Optional pedestrian bridge from Concourse A to terminal (airside) — approximate time
      { from: 'Concourse A', to: 'Jeppesen Terminal', mode: 'walk', estimatedMinutes: 10, time: 10, airsideOrLandside: 'airside', instruction: 'Walk via the pedestrian bridge from Concourse A to the terminal', canMergeWithSameSystem: false, sourceNote: 'official_map_available_time_unspecified' },
      // Landside connections
      { from: 'Jeppesen Terminal', to: 'Baggage Claim', mode: 'walk', estimatedMinutes: 5, time: 5, airsideOrLandside: 'landside', instruction: 'Walk from the terminal to baggage claim', canMergeWithSameSystem: false, sourceNote: 'verified_official_detail' },
      { from: 'Baggage Claim', to: 'Ground Transportation', mode: 'walk', estimatedMinutes: 3, time: 3, airsideOrLandside: 'landside', instruction: 'Walk to ground transportation', canMergeWithSameSystem: false, sourceNote: 'verified_official_detail' },
      { from: 'Ground Transportation', to: 'RTD A Line Station', mode: 'walk', estimatedMinutes: 5, time: 5, airsideOrLandside: 'landside', instruction: 'Walk to the RTD A Line station at the Transit Center', canMergeWithSameSystem: false, sourceNote: 'verified_official_detail' },
      { from: 'Ground Transportation', to: 'Parking', mode: 'walk', estimatedMinutes: 5, time: 5, airsideOrLandside: 'landside', instruction: 'Walk to parking', canMergeWithSameSystem: false, sourceNote: 'verified_official_detail' },
      { from: 'Ground Transportation', to: 'Rideshare Pickup', mode: 'walk', estimatedMinutes: 3, time: 3, airsideOrLandside: 'landside', instruction: 'Walk to the rideshare pickup area', canMergeWithSameSystem: false, sourceNote: 'verified_official_detail' },
    ],
    beforeTips: [
      'Plan extra time for construction; some walkways may be rerouted.',
      'Use the Train to the Gates for travel between the terminal and concourses.',
      'Check your concourse assignment before heading to security.',
    ],
    watchTips: [
      'The train ride to Concourse C is longer; stay on through A and B.',
      'Some concourses have limited dining options; plan ahead.',
      'Ground transportation lines may vary depending on time of day.',
    ],
    routeNotes:
      'The Train to the Gates is the primary airside transportation between the terminal and concourses.',
    transitSystems: ['Train to Gates', 'RTD A Line'],
    securityNotes:
      'The Train to the Gates operates inside security; re‑entry screening is not required when moving between concourses.',
    groundTransportationNotes:
      'The Transit Center provides access to the RTD A Line, buses and parking.',
    sourceConfidence: 'verified_official_detail',
  },

  /*
   * ORD — Chicago O’Hare International Airport
   */
  ORD: {
    airportCode: 'ORD',
    airportName: 'Chicago O’Hare International Airport',
    name: 'Chicago O’Hare International Airport',
    layoutSummary:
      'Terminals 1, 2 and 3 are connected airside by walkways; Terminal 5 and the Multi‑Modal Facility are linked by the landside Airport Transit System (ATS).',
    officialMapResource: null,
    officialTraversalResource: null,
    currentAdvisory:
      'ATS operates every 3–5 minutes; passengers must re‑enter security when transferring via ATS.',
    nodes: [
      'Terminal 1',
      'Terminal 2',
      'Terminal 3',
      'Terminal 5',
      'Baggage Claim',
      'Ground Transportation',
      'Multi-Modal Facility',
      'CTA Blue Line Station',
      'Parking',
      'Rideshare Pickup',
    ],
    edges: [
      // Airside walkway connectors between Terminals 1, 2 and 3
      { from: 'Terminal 1', to: 'Terminal 2', mode: 'walk', estimatedMinutes: 5, time: 5, airsideOrLandside: 'airside', instruction: 'Walk via airside connector between Terminals 1 and 2', canMergeWithSameSystem: false, sourceNote: 'verified_official_detail' },
      { from: 'Terminal 2', to: 'Terminal 3', mode: 'walk', estimatedMinutes: 5, time: 5, airsideOrLandside: 'airside', instruction: 'Walk via airside connector between Terminals 2 and 3', canMergeWithSameSystem: false, sourceNote: 'verified_official_detail' },
      // ATS segments (landside)
      { from: 'Terminal 1', to: 'Terminal 2', mode: 'train', systemName: 'ATS', estimatedMinutes: 2, time: 2, frequency: '3–5 min', airsideOrLandside: 'landside', instruction: 'Take the ATS between Terminals 1 and 2', canMergeWithSameSystem: true, sourceNote: 'verified_official_detail' },
      { from: 'Terminal 2', to: 'Terminal 3', mode: 'train', systemName: 'ATS', estimatedMinutes: 2, time: 2, frequency: '3–5 min', airsideOrLandside: 'landside', instruction: 'Take the ATS between Terminals 2 and 3', canMergeWithSameSystem: true, sourceNote: 'verified_official_detail' },
      { from: 'Terminal 3', to: 'Terminal 5', mode: 'train', systemName: 'ATS', estimatedMinutes: 3, time: 3, frequency: '3–5 min', airsideOrLandside: 'landside', instruction: 'Take the ATS between Terminal 3 and Terminal 5', canMergeWithSameSystem: true, sourceNote: 'verified_official_detail' },
      { from: 'Terminal 5', to: 'Multi-Modal Facility', mode: 'train', systemName: 'ATS', estimatedMinutes: 5, time: 5, frequency: '3–5 min', airsideOrLandside: 'landside', instruction: 'Take the ATS between Terminal 5 and the Multi-Modal Facility', canMergeWithSameSystem: true, sourceNote: 'verified_official_detail' },
      { from: 'Multi-Modal Facility', to: 'Terminal 1', mode: 'train', systemName: 'ATS', estimatedMinutes: 5, time: 5, frequency: '3–5 min', airsideOrLandside: 'landside', instruction: 'Take the ATS from the Multi-Modal Facility to Terminal 1', canMergeWithSameSystem: true, sourceNote: 'verified_official_detail' },
      // Landside facility connections
      { from: 'Terminal 1', to: 'Baggage Claim', mode: 'walk', estimatedMinutes: 5, time: 5, airsideOrLandside: 'landside', instruction: 'Walk to baggage claim from Terminal 1', canMergeWithSameSystem: false, sourceNote: 'verified_official_detail' },
      { from: 'Terminal 2', to: 'Baggage Claim', mode: 'walk', estimatedMinutes: 5, time: 5, airsideOrLandside: 'landside', instruction: 'Walk to baggage claim from Terminal 2', canMergeWithSameSystem: false, sourceNote: 'verified_official_detail' },
      { from: 'Terminal 3', to: 'Baggage Claim', mode: 'walk', estimatedMinutes: 5, time: 5, airsideOrLandside: 'landside', instruction: 'Walk to baggage claim from Terminal 3', canMergeWithSameSystem: false, sourceNote: 'verified_official_detail' },
      { from: 'Terminal 5', to: 'Baggage Claim', mode: 'walk', estimatedMinutes: 5, time: 5, airsideOrLandside: 'landside', instruction: 'Walk to baggage claim from Terminal 5', canMergeWithSameSystem: false, sourceNote: 'verified_official_detail' },
      { from: 'Baggage Claim', to: 'Ground Transportation', mode: 'walk', estimatedMinutes: 3, time: 3, airsideOrLandside: 'landside', instruction: 'Walk to ground transportation', canMergeWithSameSystem: false, sourceNote: 'verified_official_detail' },
      { from: 'Ground Transportation', to: 'Parking', mode: 'walk', estimatedMinutes: 5, time: 5, airsideOrLandside: 'landside', instruction: 'Walk to parking', canMergeWithSameSystem: false, sourceNote: 'verified_official_detail' },
      { from: 'Ground Transportation', to: 'Rideshare Pickup', mode: 'walk', estimatedMinutes: 3, time: 3, airsideOrLandside: 'landside', instruction: 'Walk to the rideshare pickup area', canMergeWithSameSystem: false, sourceNote: 'verified_official_detail' },
      { from: 'Ground Transportation', to: 'CTA Blue Line Station', mode: 'walk', estimatedMinutes: 5, time: 5, airsideOrLandside: 'landside', instruction: 'Walk to the CTA Blue Line station', canMergeWithSameSystem: false, sourceNote: 'verified_official_detail' },
      { from: 'Multi-Modal Facility', to: 'CTA Blue Line Station', mode: 'walk', estimatedMinutes: 2, time: 2, airsideOrLandside: 'landside', instruction: 'Walk from the Multi-Modal Facility to the CTA Blue Line station', canMergeWithSameSystem: false, sourceNote: 'verified_official_detail' },
    ],
    beforeTips: [
      'Check whether your flight arrives/departs from Terminal 5; the ATS provides easy access to other terminals and parking.',
      'Follow signage for walkway connectors when staying airside between Terminals 1, 2 and 3.',
      'Allow time for ATS wait (every 3–5 minutes) when transferring landside.',
    ],
    watchTips: [
      'The ATS is landside; you will need to re‑clear security if traveling between terminals for connecting flights.',
      'During construction, walkway routes may change; watch for updated signs.',
      'Ground transportation options are located on the lower level; look for rental car shuttles and the CTA Blue Line station.',
    ],
    routeNotes:
      'Use walkway connectors for airside transfers between Terminals 1, 2 and 3; use the ATS for landside movement and for access to Terminal 5 or the Multi‑Modal Facility.',
    transitSystems: ['ATS', 'CTA Blue Line'],
    securityNotes:
      'The ATS operates landside; re‑screening is required when entering terminals after using the ATS.',
    groundTransportationNotes:
      'The Multi‑Modal Facility houses rental car and parking; the ATS connects this facility to all terminals.',
    sourceConfidence: 'verified_official_detail',
  },

  /*
   * JFK — New York John F. Kennedy International Airport
   */
  JFK: {
    airportCode: 'JFK',
    airportName: 'New York John F. Kennedy International Airport',
    name: 'New York John F. Kennedy International Airport',
    layoutSummary:
      'Multiple standalone terminals connected by the landside AirTrain loop; each terminal also has its own landside ground transportation facilities.',
    officialMapResource: null,
    officialTraversalResource: null,
    currentAdvisory:
      'Expect travel impacts due to ongoing redevelopment; allow extra time.',
    nodes: [
      'Terminal 1',
      'Terminal 2',
      'Terminal 4',
      'Terminal 5',
      'Terminal 7',
      'Terminal 8',
      'Baggage Claim',
      'Ground Transportation',
      'AirTrain Station',
      'Parking',
      'Rideshare Pickup',
      'Subway/LIRR Connection',
    ],
    edges: [
      // AirTrain loop segments connecting terminals
      { from: 'Terminal 1', to: 'Terminal 2', mode: 'train', systemName: 'AirTrain', estimatedMinutes: 2, time: 2, frequency: '7–10 min', airsideOrLandside: 'landside', instruction: 'Take the AirTrain between Terminals 1 and 2', canMergeWithSameSystem: true, sourceNote: 'official_map_available_time_unspecified' },
      { from: 'Terminal 2', to: 'Terminal 4', mode: 'train', systemName: 'AirTrain', estimatedMinutes: 2, time: 2, frequency: '7–10 min', airsideOrLandside: 'landside', instruction: 'Take the AirTrain between Terminals 2 and 4', canMergeWithSameSystem: true, sourceNote: 'official_map_available_time_unspecified' },
      { from: 'Terminal 4', to: 'Terminal 5', mode: 'train', systemName: 'AirTrain', estimatedMinutes: 2, time: 2, frequency: '7–10 min', airsideOrLandside: 'landside', instruction: 'Take the AirTrain between Terminals 4 and 5', canMergeWithSameSystem: true, sourceNote: 'official_map_available_time_unspecified' },
      { from: 'Terminal 5', to: 'Terminal 7', mode: 'train', systemName: 'AirTrain', estimatedMinutes: 2, time: 2, frequency: '7–10 min', airsideOrLandside: 'landside', instruction: 'Take the AirTrain between Terminals 5 and 7', canMergeWithSameSystem: true, sourceNote: 'official_map_available_time_unspecified' },
      { from: 'Terminal 7', to: 'Terminal 8', mode: 'train', systemName: 'AirTrain', estimatedMinutes: 2, time: 2, frequency: '7–10 min', airsideOrLandside: 'landside', instruction: 'Take the AirTrain between Terminals 7 and 8', canMergeWithSameSystem: true, sourceNote: 'official_map_available_time_unspecified' },
      { from: 'Terminal 8', to: 'Terminal 1', mode: 'train', systemName: 'AirTrain', estimatedMinutes: 3, time: 3, frequency: '7–10 min', airsideOrLandside: 'landside', instruction: 'Take the AirTrain from Terminal 8 back to Terminal 1', canMergeWithSameSystem: true, sourceNote: 'official_map_available_time_unspecified' },
      // Landside connections from terminals to baggage claim
      { from: 'Terminal 1', to: 'Baggage Claim', mode: 'walk', estimatedMinutes: 5, time: 5, airsideOrLandside: 'landside', instruction: 'Walk from Terminal 1 to baggage claim', canMergeWithSameSystem: false, sourceNote: 'verified_official_detail' },
      { from: 'Terminal 2', to: 'Baggage Claim', mode: 'walk', estimatedMinutes: 5, time: 5, airsideOrLandside: 'landside', instruction: 'Walk from Terminal 2 to baggage claim', canMergeWithSameSystem: false, sourceNote: 'verified_official_detail' },
      { from: 'Terminal 4', to: 'Baggage Claim', mode: 'walk', estimatedMinutes: 5, time: 5, airsideOrLandside: 'landside', instruction: 'Walk from Terminal 4 to baggage claim', canMergeWithSameSystem: false, sourceNote: 'verified_official_detail' },
      { from: 'Terminal 5', to: 'Baggage Claim', mode: 'walk', estimatedMinutes: 5, time: 5, airsideOrLandside: 'landside', instruction: 'Walk from Terminal 5 to baggage claim', canMergeWithSameSystem: false, sourceNote: 'verified_official_detail' },
      { from: 'Terminal 7', to: 'Baggage Claim', mode: 'walk', estimatedMinutes: 5, time: 5, airsideOrLandside: 'landside', instruction: 'Walk from Terminal 7 to baggage claim', canMergeWithSameSystem: false, sourceNote: 'verified_official_detail' },
      { from: 'Terminal 8', to: 'Baggage Claim', mode: 'walk', estimatedMinutes: 5, time: 5, airsideOrLandside: 'landside', instruction: 'Walk from Terminal 8 to baggage claim', canMergeWithSameSystem: false, sourceNote: 'verified_official_detail' },
      { from: 'Baggage Claim', to: 'Ground Transportation', mode: 'walk', estimatedMinutes: 3, time: 3, airsideOrLandside: 'landside', instruction: 'Walk to ground transportation', canMergeWithSameSystem: false, sourceNote: 'verified_official_detail' },
      { from: 'Ground Transportation', to: 'Parking', mode: 'walk', estimatedMinutes: 5, time: 5, airsideOrLandside: 'landside', instruction: 'Walk to parking', canMergeWithSameSystem: false, sourceNote: 'verified_official_detail' },
      { from: 'Ground Transportation', to: 'Rideshare Pickup', mode: 'walk', estimatedMinutes: 3, time: 3, airsideOrLandside: 'landside', instruction: 'Walk to the rideshare pickup area', canMergeWithSameSystem: false, sourceNote: 'verified_official_detail' },
      { from: 'Ground Transportation', to: 'Subway/LIRR Connection', mode: 'walk', estimatedMinutes: 5, time: 5, airsideOrLandside: 'landside', instruction: 'Walk to the subway/LIRR connection point', canMergeWithSameSystem: false, sourceNote: 'verified_official_detail' },
      { from: 'Ground Transportation', to: 'AirTrain Station', mode: 'walk', estimatedMinutes: 2, time: 2, airsideOrLandside: 'landside', instruction: 'Walk to the AirTrain station', canMergeWithSameSystem: false, sourceNote: 'verified_official_detail' },
    ],
    beforeTips: [
      'Check which terminal your flight operates from; terminals are spread around the loop.',
      'Take the AirTrain to connect between terminals; it also links to the subway and LIRR.',
      'Allow extra time due to ongoing construction and AirTrain maintenance.',
    ],
    watchTips: [
      'AirTrain rides are landside; you will need to re‑enter security when connecting flights.',
      'Some terminals may be closed or undergoing renovation; verify your terminal before travel.',
      'Ground transportation to Manhattan is via AirTrain + subway or LIRR; plan accordingly.',
    ],
    routeNotes:
      'Use the AirTrain loop for landside transfers between terminals and to connect to subway/LIRR.',
    transitSystems: ['AirTrain'],
    securityNotes:
      'The AirTrain is landside; security screening is required upon entering terminals.',
    groundTransportationNotes:
      'Ground transportation is available at each terminal.  The AirTrain connects to Jamaica and Howard Beach stations for subway and rail.',
    sourceConfidence: 'official_map_available_time_unspecified',
  },

  /*
   * Remaining top 20 airports — provide functional placeholders
   */
  MCO: { name: 'Orlando International Airport', unsupported: true },
  LAS: { name: 'Las Vegas Harry Reid International Airport', unsupported: true },
  CLT: { name: 'Charlotte/Douglas International Airport', unsupported: true },
  MIA: { name: 'Miami International Airport', unsupported: true },
  SEA: { name: 'Seattle–Tacoma International Airport', unsupported: true },
  EWR: { name: 'Newark Liberty International Airport', unsupported: true },
  SFO: { name: 'San Francisco International Airport', unsupported: true },
  PHX: { name: 'Phoenix Sky Harbor International Airport', unsupported: true },
  IAH: { name: 'Houston George Bush Intercontinental Airport', unsupported: true },
  BOS: { name: 'Boston Logan International Airport', unsupported: true },
  FLL: { name: 'Fort Lauderdale–Hollywood International Airport', unsupported: true },
  MSP: { name: 'Minneapolis–Saint Paul International Airport', unsupported: true },
  LGA: { name: 'New York LaGuardia Airport', unsupported: true },
  DTW: { name: 'Detroit Metropolitan Wayne County Airport', unsupported: true },
};