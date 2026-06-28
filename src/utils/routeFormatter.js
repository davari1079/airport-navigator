import { displayNodeLabel, getTranslations, interpolate, translateDataNote } from '../i18n/translations.js';

const confidenceRank = {
  official: 0,
  high: 1,
  estimated: 2,
  limited: 3,
};

const timedMovementModes = new Set(['train', 'tram', 'shuttle', 'bus']);

export function formatRoute(edges, nodeMap = {}, language = 'en') {
  const t = getTranslations(language);
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

    steps.push(formatStep(group, nodeMap, t));
    cursor = nextIndex;
  }

  const hasUnknownTime = steps.some((step) => step.officialMinutes === null);
  const totalMinutes = hasUnknownTime
    ? null
    : steps.reduce((sum, step) => sum + step.officialMinutes, 0);
  const fallbackMinutes = steps.reduce((sum, step) => sum + step.estimatedMinutes, 0);
  const timingSummary = summarizeTiming(steps, t);

  return {
    steps,
    totalMinutes,
    fallbackMinutes,
    hasUnknownTime,
    navigationTime: timingSummary.navigationTime,
    timingBreakdown: timingSummary.breakdown,
    timeConfidence: timingSummary.confidence,
    timeConfidenceLabel: confidenceLabel(timingSummary.confidence, t),
  };
}

function shouldMerge(previous, next) {
  if (!previous.canMergeWithSameSystem || !next.canMergeWithSameSystem) return false;
  if (previous.mode !== next.mode) return false;
  if ((previous.systemName || '') !== (next.systemName || '')) return false;
  if (previous.to !== next.from) return false;
  return previous.mode !== 'walk';
}

function formatStep(group, nodeMap, t) {
  const first = group[0];
  const last = group[group.length - 1];
  const from = labelFor(first.from, nodeMap, t);
  const to = labelFor(last.to, nodeMap, t);
  const officialKnown = group.every((edge) => typeof edge.officialMinutes === 'number');
  const officialMinutes = officialKnown
    ? group.reduce((sum, edge) => sum + edge.officialMinutes, 0)
    : null;
  const estimatedMinutes = group.reduce((sum, edge) => sum + getEstimatedMinutes(edge), 0);
  const systemName = translateSystemName(first.systemName || t.modes[first.mode] || t.modes.move, t);
  const intermediateStops = group.slice(1).map((edge) => labelFor(edge.from, nodeMap, t));
  const timing = estimateGroupTiming(group, t);
  const notes = buildNotes(group, t);

  return {
    from: first.from,
    to: last.to,
    mode: first.mode,
    modeLabel: systemName,
    systemName,
    officialMinutes,
    estimatedMinutes,
    movementTime: timing.movement,
    waitTime: timing.wait,
    totalTime: timing.total,
    timeLabel: formatAverageMinutes(timing.total, t),
    movementTimeLabel: formatAverageMinutes(timing.movement, t),
    waitTimeLabel: formatAverageMinutes(timing.wait, t),
    timeConfidence: timing.confidence,
    timeConfidenceLabel: confidenceLabel(timing.confidence, t),
    instruction: buildInstruction({ first, last, from, to, systemName, intermediateStops, t }),
    note: notes.join(' '),
    airsideOrLandside: first.airsideOrLandside || null,
    sourceConfidence: first.sourceConfidence || 'official_map_available_time_unspecified',
  };
}

function estimateGroupTiming(group, t) {
  const movement = group.reduce(
    (range, edge) => addRanges(range, estimateEdgeMovement(edge)),
    { min: 0, max: 0 },
  );
  const wait = estimateWaitRange(group[0]);
  const total = addRanges(movement, wait);
  const confidence = determineStepConfidence(group, wait);

  return {
    movement,
    wait,
    total,
    confidence,
    totalLabel: formatMinuteRange(total, t),
  };
}

function estimateEdgeMovement(edge) {
  const explicitRange = parseRangeText(edge.note) || parseRangeText(edge.sourceNote);
  if (explicitRange) return explicitRange;

  const base = getEstimatedMinutes(edge);
  const hasOfficialTime = typeof edge.officialMinutes === 'number';

  if (hasOfficialTime) {
    return {
      min: Math.max(1, Math.floor(base)),
      max: Math.max(Math.floor(base), Math.ceil(base * 1.15)),
    };
  }

  const spread = edge.mode === 'walk' ? 0.45 : 0.35;
  return {
    min: Math.max(1, Math.floor(base * 0.8)),
    max: Math.max(1, Math.ceil(base * (1 + spread))),
  };
}

function estimateWaitRange(edge) {
  if (!timedMovementModes.has(edge.mode)) return { min: 0, max: 0 };

  const frequencyMax = parseFrequencyMax(edge.frequency);
  if (frequencyMax !== null) return { min: 0, max: frequencyMax };

  if (edge.frequency) return { min: 0, max: 8 };
  return { min: 0, max: 5 };
}

function summarizeTiming(steps, t) {
  const breakdown = {
    walking: { min: 0, max: 0 },
    ride: { min: 0, max: 0 },
    wait: { min: 0, max: 0 },
  };

  let confidence = 'official';

  steps.forEach((step) => {
    if (step.mode === 'walk') {
      breakdown.walking = addRanges(breakdown.walking, step.movementTime);
    } else {
      breakdown.ride = addRanges(breakdown.ride, step.movementTime);
    }
    breakdown.wait = addRanges(breakdown.wait, step.waitTime);
    confidence = worseConfidence(confidence, step.timeConfidence);
  });

  const navigationTime = addRanges(addRanges(breakdown.walking, breakdown.ride), breakdown.wait);

  return {
    navigationTime: {
      ...navigationTime,
      label: formatAverageMinutes(navigationTime, t),
    },
    breakdown: {
      walking: { ...breakdown.walking, label: formatAverageMinutes(breakdown.walking, t) },
      ride: { ...breakdown.ride, label: formatAverageMinutes(breakdown.ride, t) },
      wait: { ...breakdown.wait, label: formatAverageMinutes(breakdown.wait, t) },
    },
    confidence,
  };
}

function determineStepConfidence(group, waitRange) {
  const hasBasicGuidance = group.some((edge) => edge.sourceConfidence === 'basic_safe_guidance');
  const allOfficial = group.every((edge) => typeof edge.officialMinutes === 'number');
  const allVerified = group.every((edge) => edge.sourceConfidence === 'verified_official_detail');
  const hasManualVerificationNote = group.some((edge) => {
    const noteText = `${edge.note || ''} ${edge.sourceNote || ''}`.toLowerCase();
    return noteText.includes('manual') || noteText.includes('verify') || noteText.includes('verification');
  });

  if (hasBasicGuidance || hasManualVerificationNote) return 'limited';
  if (allOfficial && allVerified && waitRange.max === 0) return 'official';
  if (allVerified) return 'high';
  return 'estimated';
}

function worseConfidence(current, candidate) {
  return confidenceRank[candidate] > confidenceRank[current] ? candidate : current;
}

function addRanges(a, b) {
  return {
    min: (a?.min || 0) + (b?.min || 0),
    max: (a?.max || 0) + (b?.max || 0),
  };
}

function formatMinuteRange(range, t) {
  const min = Math.max(0, Math.round(range.min || 0));
  const max = Math.max(min, Math.round(range.max || 0));
  if (max === 0) return `0 ${t.minutes}`;
  if (min === max) return `${max} ${t.minutes}`;
  return `${min}–${max} ${t.minutes}`;
}

function formatAverageMinutes(range, t) {
  const min = Math.max(0, Number(range?.min || 0));
  const max = Math.max(min, Number(range?.max || 0));
  const average = Math.round((min + max) / 2);
  return `${t.avgTimeLabel || 'Avg. time'} ${average} ${t.minutes}`;
}

function confidenceLabel(confidence, t) {
  const labels = {
    official: t.confidenceOfficial,
    high: t.confidenceHigh,
    estimated: t.confidenceEstimated,
    limited: t.confidenceLimited,
  };
  return labels[confidence] || confidence;
}

function translateSystemName(systemName, t) {
  if (!systemName) return t.modes.move;
  if (t.lang === 'en') return systemName;
  return t.systemNames?.[systemName] || t.nodeLabels?.[systemName] || systemName;
}

function buildInstruction({ first, from, to, systemName, intermediateStops, t }) {
  if (first.mode === 'walk') {
    return interpolate(t.routePhrases.walkFrom, { from, to });
  }

  let text = interpolate(t.routePhrases.takeFrom, { systemName, from, to });
  if (intermediateStops.length > 0) {
    text += ` ${interpolate(t.routePhrases.stayOnThrough, { stops: formatStopList(intermediateStops, t.routePhrases.and) })}`;
    text += ` ${interpolate(t.routePhrases.exitAt, { to })}`;
  }
  return text;
}

function buildNotes(group, t) {
  const notes = [];
  const first = group[0];
  if (first.frequency) notes.push(`${t.frequency}: ${translateTimingText(first.frequency, t)}.`);
  if (first.operatingHours) notes.push(`${t.hours}: ${translateTimingText(first.operatingHours, t)}.`);
  if (first.airsideOrLandside) notes.push(interpolate(t.connectionSidePhrase, { side: translateConnectionSide(first.airsideOrLandside, t) }) + '.');


  group.forEach((edge) => {
    const translatedSourceNote = translateDataNote(edge.sourceNote, t);
    const translatedNote = translateDataNote(edge.note, t);
    [translatedSourceNote, translatedNote].forEach((note) => {
      if (note && !isOfficialTimeStatement(note) && !notes.includes(note)) notes.push(note);
    });
  });
  return notes;
}

function isOfficialTimeStatement(note) {
  const normalized = String(note || '').toLowerCase();
  return (
    normalized.includes('official time')
    || normalized.includes('official travel time')
    || normalized.includes('official per-segment')
    || normalized.includes('official range')
    || normalized.includes('official system average')
    || normalized.includes('official t1')
    || normalized.includes('tiempo oficial')
    || normalized.includes('rango oficial')
    || normalized.includes('temps officiel')
    || normalized.includes('plage officielle')
    || normalized.includes('官方时间')
    || normalized.includes('官方范围')
    || normalized.includes('공식 시간')
    || normalized.includes('공식 범위')
    || normalized.includes('公式時間')
    || normalized.includes('公式範囲')
    || normalized.includes('offizielle zeit')
    || normalized.includes('offizieller bereich')
    || normalized.includes('tempo oficial')
    || normalized.includes('faixa oficial')
    || normalized.includes('viagem oficial')
    || normalized.includes('travel time not specified')
    || normalized.includes('tempo de viagem não especificado')
    || normalized.includes('所要時間')
    || normalized.includes('tiempo de viaje no especificado')
    || normalized.includes('temps de trajet non précisé')
    || normalized.includes('旅行时间未指定')
    || normalized.includes('行程时间')
    || normalized.includes('reisezeit')
    || normalized.includes('移動時間')
    || normalized.includes('이동 시간이')
    || normalized.includes('이동 시간')
  );
}

function translateConnectionSide(side, t) {
  if (side === 'airside') return t.airside;
  if (side === 'landside') return t.landside;
  return capitalize(side);
}

function labelFor(id, nodeMap, t) {
  return displayNodeLabel(id, nodeMap, t);
}

function getEstimatedMinutes(edge) {
  if (typeof edge.estimatedMinutes === 'number') return edge.estimatedMinutes;
  if (typeof edge.officialMinutes === 'number') return edge.officialMinutes;
  return 8;
}

function parseRangeText(text) {
  if (!text) return null;
  const match = String(text).match(/(\d+)\s*[-–]\s*(\d+)\s*(?:min|minute|minutes)/i);
  if (!match) return null;
  const min = Number(match[1]);
  const max = Number(match[2]);
  if (!Number.isFinite(min) || !Number.isFinite(max)) return null;
  return { min: Math.min(min, max), max: Math.max(min, max) };
}

function parseFrequencyMax(text) {
  if (!text) return null;
  const normalized = String(text).toLowerCase();

  const rangeMatch = normalized.match(/every\s+(\d+)\s*[-–]\s*(\d+)\s*min/)
    || normalized.match(/about\s+every\s+(\d+)\s*[-–]\s*(\d+)\s*min/)
    || normalized.match(/around\s+every\s+(\d+)\s*[-–]\s*(\d+)\s*min/);
  if (rangeMatch) return Number(rangeMatch[2]);

  const singleMatch = normalized.match(/every\s+(\d+)\s*min/)
    || normalized.match(/about\s+every\s+(\d+)\s*min/)
    || normalized.match(/around\s+every\s+(\d+)\s*min/)
    || normalized.match(/averages\s+every\s+(\d+)\s*min/)
    || normalized.match(/arrives\s+every\s+(\d+)\s*min/)
    || normalized.match(/shuttle\s+every\s+(\d+)\s*min/);
  if (singleMatch) return Number(singleMatch[1]);

  return null;
}

function formatStopList(stops, andWord) {
  if (stops.length <= 1) return stops.join('');
  if (stops.length === 2) return `${stops[0]} ${andWord} ${stops[1]}`;
  return `${stops.slice(0, -1).join(', ')} ${andWord} ${stops[stops.length - 1]}`;
}

function translateTimingText(text, t) {
  if (!text) return '';
  const source = String(text);
  if (t.lang === 'en') return source;
  if (t.timingText?.[source]) return t.timingText[source];

  if (t.lang === 'es' || t.lang === 'fr') {
    return source
      .replaceAll('Every', t.lang === 'es' ? 'Cada' : 'Toutes les')
      .replaceAll('every', t.lang === 'es' ? 'cada' : 'toutes les')
      .replaceAll('minutes', t.minutes)
      .replaceAll('minute', t.lang === 'es' ? 'minuto' : 'minute')
      .replaceAll('hours', t.hours.toLowerCase())
      .replaceAll('hour', t.lang === 'es' ? 'hora' : 'heure')
      .replaceAll('Prior research indicates about', t.lang === 'es' ? 'La investigación previa indica aproximadamente' : 'La recherche précédente indique environ')
      .replaceAll('current page frequency needs verification', t.lang === 'es' ? 'la frecuencia actual necesita verificación' : 'la fréquence actuelle doit être vérifiée');
  }

  return t.officialTimeNotSpecified;
}

function capitalize(value) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}
