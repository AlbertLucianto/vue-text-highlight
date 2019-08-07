import cloneRegexp from 'clone-regexp';
import diacritics from 'diacritics';

export default function indicesOf(
  text, searchStringOrRegex, caseSensitive = false, diacriticsSensitive = false) {
  if (searchStringOrRegex instanceof RegExp) {
    const re = cloneRegexp(searchStringOrRegex, { global: true });
    const indices = [];

    let match = re.exec(text);
    while (match) {
      const offset = match.index + match[0].length;
      indices.push([match.index, offset]);
      match = re.exec(text);
    }
    return indices;
  }
  const searchStringLen = searchStringOrRegex.length;

  if (searchStringLen === 0) {
    return [];
  }

  const indices = [];

  let strCpy = text;
  let searchStringCpy = searchStringOrRegex;
  if (!caseSensitive) {
    strCpy = text.toLocaleLowerCase();
    searchStringCpy = searchStringOrRegex.toLocaleLowerCase();
  }

  if (!diacriticsSensitive) {
    strCpy = diacritics.remove(strCpy);
    searchStringCpy = diacritics.remove(searchStringCpy);
  }

  let startIndex = 0;
  let index = strCpy.indexOf(searchStringCpy, startIndex);
  while (index > -1) {
    startIndex = index + searchStringLen;
    indices.push([index, startIndex]);

    index = strCpy.indexOf(searchStringCpy, index + 1);
  }

  return indices;
}
