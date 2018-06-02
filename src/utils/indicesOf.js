export default function indicesOf(searchStr, str, caseSensitive = false) {
  const searchStrLen = searchStr.length;

  if (searchStrLen === 0) {
    return [];
  }

  const indices = [];

  let strCpy = str;
  let searchStrCpy = searchStr;
  if (!caseSensitive) {
    strCpy = str.toLowerCase();
    searchStrCpy = searchStr.toLowerCase();
  }

  let endIndex = 0;
  let index = strCpy.indexOf(searchStrCpy, endIndex);
  while (index > -1) {
    endIndex = index + searchStrLen;
    indices.push([index, endIndex]);

    index = strCpy.indexOf(searchStrCpy, index + 1);
  }

  return indices;
}
