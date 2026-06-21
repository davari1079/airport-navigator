const createNodeMap = (nodes) =>
  nodes.reduce((map, node) => {
    map[node.id] = node;
    return map;
  }, {});

export const topAirports = [
  { code: 'ATL', name: 'Hartsfield-Jackson Atlanta International Airport' },
  { code: 'LAX', name: 'Los Angeles International Airport' },
  { code: 'DFW', name: 'Dallas/Fort Worth International Airport' },
  { code: 'DEN', name: 'Denver International