import cloneRegexp from 'clone-regexp';


const isDigit = char => /^\d+$/.test(char);
const isLetter = char => char.toUpperCase() !== char.toLowerCase() || char.codePointAt(0) > 127;
const isLetterOrDigit = char => isLetter(char) || isDigit(char);


export default function indicesOf(
  text,
  searchStringOrRegex,
  { caseSensitive = false, diacriticsSensitive = false, wholeWordMatch = false } = {},
) {
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
    strCpy = strCpy.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    searchStringCpy = searchStringCpy.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  let startIndex = 0;
  let index = strCpy.indexOf(searchStringCpy, startIndex);
  while (index > -1) {
    startIndex = index + searchStringLen;
    indices.push([index, startIndex]);

    index = strCpy.indexOf(searchStringCpy, index + 1);
  }

  if (wholeWordMatch) {
    const strLength = strCpy.length;
    return indices.filter((range) => {
      const [start, end] = range;
      const idxBefore = start - 1;
      const idxAfter = end;
      const idxBeforeIsLetterOrDigit = idxBefore > 0 && isLetterOrDigit(strCpy[idxBefore]);
      const idxAfterIsLetterOrDigit = idxAfter < strLength && isLetterOrDigit(strCpy[idxAfter]);
      return !(idxAfterIsLetterOrDigit || idxBeforeIsLetterOrDigit);
    });
  }

  return indices;
}
