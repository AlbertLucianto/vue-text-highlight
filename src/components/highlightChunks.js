import { indicesOf, mergeRange } from '../utils';

export default function highlightChunks(text, queriesOrString, caseSensitive = false) {
  let queries = queriesOrString;
  if (typeof queriesOrString === 'string') {
    queries = [queriesOrString];
  } else if (!Array.isArray(queriesOrString)) {
    throw new Error('queries must be either string or array of strings.');
  }

  const matches = [];

  queries.forEach((query) => {
    matches.push(...indicesOf(query, text, caseSensitive));
  });

  const highlights = mergeRange(matches);

  const chunks = [];
  let lastEnd = 0;

  highlights.forEach(([start, end]) => {
    chunks.push({
      isHighlighted: false,
      text: text.slice(lastEnd, start),
    });
    chunks.push({
      isHighlighted: true,
      text: text.slice(start, end),
    });

    lastEnd = end;
  });

  chunks.push({
    isHighlighted: false,
    text: text.slice(lastEnd),
  });

  return chunks;
}
