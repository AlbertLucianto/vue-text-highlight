import cloneRegexp from 'clone-regexp';

export default function indicesOf(text, searchStringOrRegex, caseSensitive = false) {
  if (searchStringOrRegex instanceof RegExp) {
    const re = cloneRegexp(searchStringOrRegex, { global: true });
    const indices = [];

    let match = null;
    while (match = re.exec(text)) {
      let offset = match.index + match[0].length;
      indices.push([match.index, offset]);
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

  let startIndex = 0;
  let index = strCpy.indexOf(searchStringCpy, startIndex);
  while (index > -1) {
    startIndex = index + searchStringLen;
    indices.push([index, startIndex]);

    index = strCpy.indexOf(searchStringCpy, index + 1);
  }

  return indices;
}
