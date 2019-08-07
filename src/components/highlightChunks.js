import { indicesOf, mergeRange } from '../utils';

export default function highlightChunks(
  text, queriesOrQuery, caseSensitive = false, diacriticsSensitive = false) {
  let queries = queriesOrQuery;
  if (typeof queriesOrQuery === 'string' || queriesOrQuery instanceof RegExp) {
    queries = [queriesOrQuery];
  } else if (!Array.isArray(queriesOrQuery)) {
    if (process.env.NODE_ENV !== 'production') {
      throw new Error('queries must be either string, array of strings or regex.');
    } else {
      return [];
    }
  }

  const matches = [];

  queries.forEach((query) => {
    matches.push(...indicesOf(text, query, caseSensitive, diacriticsSensitive));
  });

  const highlights = mergeRange(matches);

  const chunks = [];
  let lastEnd = 0;

  highlights.forEach(([start, end], index) => {
    if (lastEnd !== start) {
      chunks.push({
        isHighlighted: false,
        text: text.slice(lastEnd, start),
      });
    }
    chunks.push({
      isHighlighted: true,
      text: text.slice(start, end),
      highlightIndex: index,
    });

    lastEnd = end;
  });

  if (lastEnd !== text.length) {
    chunks.push({
      isHighlighted: false,
      text: text.slice(lastEnd),
    });
  }

  return chunks;
}
