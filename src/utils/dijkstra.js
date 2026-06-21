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

      const candidateDistance = distances.get(current) + edge.estimatedMinutes;
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
    return { totalMinutes: 0, path: [], edges: [] };
  }

  while (cursor) {
    path.unshift(cursor);
    const edge = previousEdge.get(cursor);
    if (edge) routeEdges.unshift(edge);
    cursor = previousNode.get(cursor);
  }

  return {
    totalMinutes: distances.get(destinationId),
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

function reverseInstruction(edge) {
  if (!edge.instruction) return undefined;

  const from = edge.from.replaceAll('-', ' ');
  const to = edge.to.replaceAll('-', ' ');
  return edge.instruction.includes('from')
    ? edge.instruction.replace(new RegExp(from, 'i'), to)
    : edge.instruction;
}
