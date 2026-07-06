export function dijkstra({ nodes, edges, startId, destinationId }) {
  const adjacency = buildAdjacency(nodes, edges);
  const distances = new Map();
  const previousNode = new Map();
  const previousEdge = new Map();
  const unvisited = new Set(nodes.map((node) => node.id));

  nodes.forEach((node) => distances.set(node.id, Number.POSITIVE_INFINITY));
  distances.set(startId, 0);

  while (unvisited.size > 0) {
    const current = [...unvisited].reduce((best, nodeId) => {
      if (!best) return nodeId;
      return distances.get(nodeId) < distances.get(best) ? nodeId : best;
    }, null);

    if (!current || distances.get(current) === Number.POSITIVE_INFINITY) break;
    if (current === destinationId) break;

    unvisited.delete(current);

    for (const edge of adjacency.get(current) || []) {
      if (!unvisited.has(edge.to)) continue;

      const weight = getEdgeWeight(edge);
      const candidateDistance = distances.get(current) + weight;
      if (candidateDistance < distances.get(edge.to)) {
        distances.set(edge.to, candidateDistance);
        previousNode.set(edge.to, current);
        previousEdge.set(edge.to, edge);
      }
    }
  }

  const path = [];
  const routeEdges = [];
  let cursor = destinationId;

  if (!previousNode.has(cursor) && cursor !== startId) {
    return { totalMinutes: null, path: [], edges: [] };
  }

  while (cursor) {
    path.unshift(cursor);
    const edge = previousEdge.get(cursor);
    if (edge) routeEdges.unshift(edge);
    cursor = previousNode.get(cursor);
  }

  const allOfficialTimes = routeEdges.every((edge) => typeof edge.officialMinutes === 'number');

  return {
    totalMinutes: allOfficialTimes
      ? routeEdges.reduce((sum, edge) => sum + edge.officialMinutes, 0)
      : null,
    fallbackMinutes: routeEdges.reduce((sum, edge) => sum + getEdgeWeight(edge), 0),
    path,
    edges: routeEdges,
  };
}

function buildAdjacency(nodes, edges) {
  const adjacency = new Map(nodes.map((node) => [node.id, []]));

  edges.forEach((edge) => {
    adjacency.get(edge.from)?.push(edge);

    if (edge.bidirectional !== false) {
      adjacency.get(edge.to)?.push({
        ...edge,
        from: edge.to,
        to: edge.from,
        instruction: reverseInstruction(edge),
      });
    }
  });

  return adjacency;
}

function getEdgeWeight(edge) {
  if (typeof edge.estimatedMinutes === 'number') return edge.estimatedMinutes;
  if (typeof edge.officialMinutes === 'number') return edge.officialMinutes;
  return 8;
}

function reverseInstruction(edge) {
  if (!edge.instruction) return undefined;
  return edge.reverseInstruction || edge.instruction;
}
