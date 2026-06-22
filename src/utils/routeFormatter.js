const modeLabels = {
  walk: 'Walk',
  train: 'Train / people mover',
  tram: 'Tram',
  shuttle: 'Shuttle',
  bus: 'Bus / shuttle',
  transfer: 'Transfer',
};

export function formatRoute(edges, nodeMap = {}) {
  const steps = [];
  let cursor = 0;

  while (cursor < edges.length) {
    const first = edges[cursor];
    const group = [first];
    let nextIndex = cursor + 1;

    while (nextIndex < edges.length && shouldMerge(group[group.length - 1], edges[nextIndex])) {
      group.push(edges[nextIndex]);
      nextIndex += 1;
    }

    steps.push(formatStep(group, nodeMap));
    cursor = nextIndex;
  }

  const hasUnknownTime = steps.some((step) => step.officialMinutes === null);
  const totalMinutes = hasUnknownTime
    ? null
    : steps.reduce((sum, step) => sum + step.officialMinutes, 0);
  const fallbackMinutes = steps.reduce((sum, step) => sum + step.estimatedMinutes, 0);

  return { steps, totalMinutes, fallbackMinutes, hasUnknownTime };
}

function shouldMerge(previous, next) {
  if (!previous.canMergeWithSameSystem || !next.canMergeWithSameSystem) return false;
  if (previous.mode !== next.mode) return false;
  if ((previous.systemName || '') !== (next.systemName || '')) return false;
  if (previous.to !== next.from) return false;
  return previous.mode !== 'walk';
}

function formatStep(group, nodeMap) {
  const first = group[0];
  const last = group[group.length - 1];
  const from = labelFor(first.from, nodeMap);
  const to = labelFor(last.to, nodeMap);
  const officialKnown = group.every((edge) => typeof edge.officialMinutes === 'number');
  const officialMinutes = officialKnown
    ? group.reduce((sum, edge) => sum + edge.officialMinutes, 0)
    : null;
  const estimatedMinutes = group.reduce((sum, edge) => sum + getEstimatedMinutes(edge), 0);
  const systemName = first.systemName || modeLabels[first.mode] || 'connection';
  const intermediateStops = group.slice(1).map((edge) => labelFor(edge.from, nodeMap));
  const notes = buildNotes(group);

  return {
    from: first.from,
    to: last.to,
    mode: first.mode,
    modeLabel: first.systemName || modeLabels[first.mode] || 'Move',
    systemName,
    officialMinutes,
    estimatedMinutes,
    timeLabel: officialMinutes === null ? 'Official time not specified' : `${officialMinutes} minutes`,
    instruction: buildInstruction({ first, last, from, to, systemName, intermediateStops, nodeMap }),
    note: notes.join(' '),
    airsideOrLandside: first.airsideOrLandside || null,
    sourceConfidence: first.sourceConfidence || 'official_map_available_time_unspecified',
  };
}

function buildInstruction({ first, last, from, to, systemName, intermediateStops, nodeMap }) {
  if (first.mode === 'walk' && first.instruction && first.from !== last.to) {
    return replaceNodeIds(first.instruction, nodeMap);
  }

  if (first.mode === 'walk') {
    return `Walk from ${from} to ${to}. Follow posted airport signs and confirm the route before moving.`;
  }

  let text = `Take the ${systemName} from ${from} to ${to}.`;
  if (intermediateStops.length > 0) {
    text += ` Stay on through ${formatStopList(intermediateStops)}. Exit at ${to}.`;
  }
  return text;
}

function buildNotes(group) {
  const notes = [];
  const first = group[0];
  if (first.frequency) notes.push(`Frequency: ${first.frequency}.`);
  if (first.operatingHours) notes.push(`Hours: ${first.operatingHours}.`);
  if (first.airsideOrLandside) notes.push(`${capitalize(first.airsideOrLandside)} connection.`);
  if (first.sourceNote) notes.push(first.sourceNote);
  group.forEach((edge) => {
    if (edge.note && !notes.includes(edge.note)) notes.push(edge.note);
  });
  return notes;
}

function labelFor(id, nodeMap) {
  return nodeMap[id]?.label || id;
}

function getEstimatedMinutes(edge) {
  if (typeof edge.estimatedMinutes === 'number') return edge.estimatedMinutes;
  if (typeof edge.officialMinutes === 'number') return edge.officialMinutes;
  return 8;
}

function formatStopList(stops) {
  if (stops.length <= 1) return stops.join('');
  if (stops.length === 2) return `${stops[0]} and ${stops[1]}`;
  return `${stops.slice(0, -1).join(', ')}, and ${stops[stops.length - 1]}`;
}

function replaceNodeIds(text, nodeMap) {
  return Object.values(nodeMap).reduce((output, node) => output.replaceAll(node.id, node.label), text);
}

function capitalize(value) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}
