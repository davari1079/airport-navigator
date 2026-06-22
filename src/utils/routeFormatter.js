/*
 * Convert a list of edges into human‑readable instructions.  Each step
 * includes an instruction string, an estimated time and any notes.
 */

/**
 * Convert a list of graph edges into human‑friendly route steps.  The function
 * merges consecutive segments that belong to the same transit system (e.g.
 * Skylink, AirTrain) when the traveller is expected to stay on through
 * intermediate stops.  Walking segments remain separate unless explicitly
 * marked mergeable.  Each returned step includes a plain‑English
 * instruction, the summed estimated time (or null if any segment lacks
 * an official time) and any contextual metadata.  A totalTime value is
 * returned to help upstream components decide whether a definitive
 * estimate can be shown.  If one or more steps have an unknown time the
 * overall totalTime will be null.
 *
 * The edges argument should already include properties such as
 * `mode`, `systemName`, `estimatedMinutes`, `frequency`,
 * `airsideOrLandside`, `instruction`, `sourceNote` and `canMergeWithSameSystem`.
 */
export function formatRoute(edges) {
  const merged = [];
  let i = 0;
  while (i < edges.length) {
    const edge = edges[i];
    // initialise aggregated step parameters
    let from = edge.from;
    let to = edge.to;
    const mode = edge.mode;
    // systemName may be provided on the edge or inferred from the note
    const baseSystem = edge.systemName || edge.note || null;
    let totalMinutes = 0;
    let hasUnknown = false;
    const intermediateStops = [];
    // accumulate time for the first edge
    if (edge.estimatedMinutes !== undefined && edge.estimatedMinutes !== null) {
      totalMinutes += edge.estimatedMinutes;
    } else {
      hasUnknown = true;
    }
    // merge subsequent edges if they share the same mode and system and are
    // marked as mergeable.  This allows a single instruction like
    // “Take the Skylink from Terminal A to Terminal D. Stay on through B, C.”
    let j = i + 1;
    while (j < edges.length) {
      const next = edges[j];
      // check for same mode and systemName, and that both edges allow merging
      const nextSystem = next.systemName || next.note || null;
      if (
        next.mode === mode &&
        nextSystem === baseSystem &&
        edge.canMergeWithSameSystem &&
        next.canMergeWithSameSystem
      ) {
        // record the intermediate stop (the 'from' of the next edge)
        intermediateStops.push(next.from);
        if (next.estimatedMinutes !== undefined && next.estimatedMinutes !== null) {
          totalMinutes += next.estimatedMinutes;
        } else {
          hasUnknown = true;
        }
        to = next.to;
        j++;
      } else {
        break;
      }
    }
    // Construct a user‑facing instruction.  Mode‑specific phrasing with
    // intermediate stops if necessary.
    let instruction = '';
    if (mode === 'walk') {
      instruction = `Walk from ${from} to ${to}`;
    } else {
      const sysLabel = baseSystem || mode;
      instruction = `Take the ${sysLabel} from ${from} to ${to}`;
      if (intermediateStops.length > 0) {
        instruction += `. Stay on through ${intermediateStops.join(', ')}. Exit at ${to}.`;
      }
    }
    merged.push({
      from,
      to,
      mode,
      systemName: baseSystem,
      time: hasUnknown ? null : totalMinutes,
      instruction,
      note: edge.note || null,
      frequency: edge.frequency || null,
      airsideOrLandside: edge.airsideOrLandside || null,
      sourceNote: edge.sourceNote || null,
    });
    i = j;
  }
  // Determine total route time.  If any step lacks a time, return null.
  let routeTime = 0;
  let unknownFound = false;
  merged.forEach((step) => {
    if (step.time !== null && step.time !== undefined) {
      routeTime += step.time;
    } else {
      unknownFound = true;
    }
  });
  return {
    steps: merged,
    totalTime: unknownFound ? null : routeTime,
    hasUnknownTime: unknownFound,
  };
}