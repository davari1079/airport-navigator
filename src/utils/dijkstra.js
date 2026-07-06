/*
 * Implementation of Dijkstra's shortest path algorithm for airport graphs.
 *
 * The graph parameter is expected to have a `nodes` array and an `edges`
 * array.  Each edge must include `from`, `to`, `time` (weight) and may
 * include additional properties such as `mode`, `instruction` and `note`.
 *
 * The algorithm treats edges as bidirectional: walking, train and shuttle
 * connections typically allow travel in both directions.  If this is not
 * desired for a particular connection, duplicate edges must be omitted
 * from the graph definition.
 */

export function dijkstra(graph, start, end) {
  // Build an adjacency list from edges.  For undirected graphs we add
  // both forward and reverse edges.
  const adj = {};
  graph.nodes.forEach((node) => {
    adj[node] = [];
  });
  graph.edges.forEach((edge) => {
    adj[edge.from].push({ ...edge });
    // Add reverse connection with swapped from/to and copy other props
    adj[edge.to].push({
      ...edge,
      from: edge.to,
      to: edge.from,
    });
  });

  // Initialize distances and previous maps.
  const dist = {};
  const visited = {};
  const prev = {};
  const prevEdge = {};

  graph.nodes.forEach((node) => {
    dist[node] = Infinity;
    visited[node] = false;
    prev[node] = null;
    prevEdge[node] = null;
  });
  dist[start] = 0;

  // Helper to find the unvisited node with the smallest tentative distance.
  function smallestUnvisited() {
    let minNode = null;
    let minDist = Infinity;
    for (const node of graph.nodes) {
      if (!visited[node] && dist[node] < minDist) {
        minDist = dist[node];
        minNode = node;
      }
    }
    return minNode;
  }

  // Main loop
  while (true) {
    const u = smallestUnvisited();
    if (u === null) break; // no reachable nodes left
    if (u === end) break;
    visited[u] = true;
    const neighbors = adj[u] || [];
    neighbors.forEach((edge) => {
      const v = edge.to;
      if (visited[v]) return;
      const alt = dist[u] + edge.time;
      if (alt < dist[v]) {
        dist[v] = alt;
        prev[v] = u;
        prevEdge[v] = edge;
      }
    });
  }

  // Reconstruct path.
  const pathEdges = [];
  let current = end;
  if (!prev[current] && current !== start) {
    // No path found; return empty result
    return { totalTime: Infinity, edges: [] };
  }
  while (current !== start && prev[current] !== null) {
    const edge = prevEdge[current];
    if (edge) pathEdges.push(edge);
    current = prev[current];
  }
  pathEdges.reverse();
  return {
    totalTime: dist[end] === Infinity ? 0 : dist[end],
    edges: pathEdges,
  };
}