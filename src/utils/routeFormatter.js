const modeLabels = {
  walk: 'Walk',
  train: 'Plane Train',
  shuttle: 'Shuttle',
  bus: 'Bus / shuttle',
  transfer: 'Transfer',
};

export function formatRoute(edges, nodeMap = {}) {
  return edges.map((edge) => ({
    ...edge,
    modeLabel: modeLabels[edge.mode] || 'Move',
    instruction: edge.instruction || buildInstruction(edge, nodeMap),
  }));
}

function buildInstruction(edge, nodeMap) {
  const mode = modeLabels[edge.mode] || 'Move';
  const from = nodeMap[edge.from]?.label || edge.from;
  const to = nodeMap[edge.to]?.label || edge.to;
  return `${mode} from ${from} to ${to}.`;
}
