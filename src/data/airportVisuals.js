export const airportVisuals = {
  ATL: { src: '/airport-visuals/atl.webp', position: '72% center', label: 'Atlanta skyline hero art' },
  LAX: { src: '/airport-visuals/lax.webp', position: '70% center', label: 'Los Angeles skyline hero art' },
  DFW: { src: '/airport-visuals/dfw.webp', position: '64% center', label: 'Dallas skyline hero art' },
  DEN: { src: '/airport-visuals/den.webp', position: '60% center', label: 'Denver skyline hero art' },
  ORD: { src: '/airport-visuals/ord.webp', position: '68% center', label: 'Chicago skyline hero art' },
  JFK: { src: '/airport-visuals/jfk.webp', position: '72% center', label: 'New York skyline hero art' },
  MCO: { src: '/airport-visuals/mco.webp', position: '68% center', label: 'Orlando skyline hero art' },
  LAS: { src: '/airport-visuals/las.webp', position: '74% center', label: 'Las Vegas skyline hero art' },
  CLT: { src: '/airport-visuals/clt.webp', position: '70% center', label: 'Charlotte skyline hero art' },
  MIA: { src: '/airport-visuals/mia.webp', position: '70% center', label: 'Miami beach hero art' },
  SEA: { src: '/airport-visuals/sea.webp', position: '68% center', label: 'Seattle skyline hero art' },
  EWR: { src: '/airport-visuals/ewr.webp', position: '72% center', label: 'Newark skyline hero art' },
  SFO: { src: '/airport-visuals/sfo.webp', position: '68% center', label: 'San Francisco skyline hero art' },
  PHX: { src: '/airport-visuals/phx.webp', position: '68% center', label: 'Phoenix skyline hero art' },
  IAH: { src: '/airport-visuals/iah.webp', position: '70% center', label: 'Houston skyline hero art' },
  BOS: { src: '/airport-visuals/bos.webp', position: '74% center', label: 'Boston skyline hero art' },
  FLL: { src: '/airport-visuals/fll.webp', position: '66% center', label: 'Fort Lauderdale hero art' },
  MSP: { src: '/airport-visuals/msp.webp', position: '66% center', label: 'Minneapolis–Saint Paul skyline hero art' },
  LGA: { src: '/airport-visuals/lga.webp', position: '72% center', label: 'New York skyline hero art' },
  DTW: { src: '/airport-visuals/dtw.webp', position: '74% center', label: 'Detroit skyline hero art' },
};

export function getAirportVisual(code) {
  return code ? airportVisuals[code] || null : null;
}
