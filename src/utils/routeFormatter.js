import { displayNodeLabel } from '../i18n/translations.js';

function edgeMinutes(edge) {
  if (typeof edge.estimatedMinutes === 'number') return edge.estimatedMinutes;
  if (typeof edge.officialMinutes === 'number') return edge.officialMinutes;
  return 0;
}

function timeLabel(minutes) {
  return `Avg. time ${Math.max(0, Math.round(minutes))} minutes`;
}

function modeBucket(mode = '') {
  if (mode === 'walk') return 'walking';
  if (['train', 'shuttle', 'bus', 'ride'].includes(mode)) return 'ride';
  return 'ride';
}

function buildInstruction(edge, nodeMap) {
  const from = displayNodeLabel(edge.from, nodeMap);
  const to = displayNodeLabel(edge.to, nodeMap);
  if (edge.instruction) return edge.instruction;
  if (edge.mode === 'walk') return `Walk from ${from} to ${to}.`;
  const system = edge.systemName || edge.mode || 'airport connection';
  return `Take the ${system} from ${from} to ${to}.`;
}

function mergeEdges(edges, nodeMap) {
  const merged = [];
  let index = 0;

  while (index < edges.length) {
    const first = edges[index];
    let last = first;
    let minutes = edgeMinutes(first);
    const intermediateStops = [];
    let cursor = index + 1;

    while (cursor < edges.length) {
      const next = edges[cursor];
      const sameSystem = first.mode === next.mode && (first.systemName || '') === (next.systemName || '');
      if (!sameSystem || !first.canMergeWithSameSystem || !next.canMergeWithSameSystem) break;
      intermediateStops.push(displayNodeLabel(next.from, nodeMap, null, true));
      minutes += edgeMinutes(next);
      last = next;
      cursor += 1;
    }

    const fromLabel = displayNodeLabel(first.from, nodeMap);
    const toLabel = displayNodeLabel(last.to, nodeMap);
    const system = first.systemName || first.mode;
    let instruction = buildInstruction(first, nodeMap);

    if (last !== first) {
      instruction = `Take the ${system} from ${fromLabel} to ${toLabel}.`;
      if (intermediateStops.length) {
        instruction += ` Stay on through ${intermediateStops.join(', ')}.`;
      }
    }

    merged.push({
      from: first.from,
      to: last.to,
      mode: first.mode,
      systemName: system,
      instruction,
      note: first.note || null,
      frequency: first.frequency || null,
      operatingHours: first.operatingHours || null,
      airsideOrLandside: first.airsideOrLandside || null,
      sourceNote: first.sourceNote || null,
      sourceConfidence: first.sourceConfidence || 'estimated',
      time: minutes,
      timeLabel: timeLabel(minutes),
    });

    index = cursor;
  }

  return merged;
}

export function formatRoute(edges, nodeMap) {
  const steps = mergeEdges(edges, nodeMap);
  const totalMinutes = steps.reduce((sum, step) => sum + (step.time || 0), 0);
  const walking = steps.filter((step) => modeBucket(step.mode) === 'walking').reduce((sum, step) => sum + (step.time || 0), 0);
  const ride = steps.filter((step) => modeBucket(step.mode) === 'ride').reduce((sum, step) => sum + (step.time || 0), 0);
  const wait = steps.some((step) => ['train', 'shuttle', 'bus'].includes(step.mode)) ? 3 : 0;

  const hasVerified = edges.some((edge) => edge.sourceConfidence === 'verified_official_detail');
  const timeConfidence = hasVerified ? 'source-backed' : 'estimated';
  const timeConfidenceLabel = hasVerified ? 'Source-backed' : 'Estimated';

  return {
    steps,
    totalMinutes,
    fallbackMinutes: totalMinutes,
    hasUnknownTime: false,
    navigationTime: {
      label: timeLabel(totalMinutes),
      minutes: totalMinutes,
    },
    timingBreakdown: {
      walking: { minutes: walking, label: timeLabel(walking) },
      ride: { minutes: ride, label: timeLabel(ride) },
      wait: { minutes: wait, label: timeLabel(wait) },
    },
    timeConfidence,
    timeConfidenceLabel,
  };
}
