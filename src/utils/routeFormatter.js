import { displayNodeLabel, getTranslations, interpolate, translateDataNote } from '../i18n/translations.js';

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

  return { steps, totalMinutes, fallbackMinutes, hasUnknownTime };
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
  const notes = buildNotes(group, t);

  return {
    from: first.from,
    to: last.to,
    mode: first.mode,
    modeLabel: systemName,
    systemName,
    officialMinutes,
    estimatedMinutes,
    timeLabel: officialMinutes === null ? t.officialTimeNotSpecified : `${officialMinutes} ${t.minutes}`,
    instruction: buildInstruction({ first, last, from, to, systemName, intermediateStops, t }),
    note: notes.join(' '),
    airsideOrLandside: first.airsideOrLandside || null,
    sourceConfidence: first.sourceConfidence || 'official_map_available_time_unspecified',
  };
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

  if (group.some((edge) => edge.officialMinutes === null)) {
    notes.push(t.sourceTimeNotSpecifiedNote);
  }

  group.forEach((edge) => {
    const translatedSourceNote = translateDataNote(edge.sourceNote, t);
    const translatedNote = translateDataNote(edge.note, t);
    [translatedSourceNote, translatedNote].forEach((note) => {
      if (note && !notes.includes(note)) notes.push(note);
    });
  });
  return notes;
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
