import { indicesOf } from 'vue-text-highlighter/utils';

describe('indicesOf', () => {
  it('should return two indices with case sensitive off', () => {
    const text = 'abcd efgh bCde';
    const search = 'bcd';

    const indice = indicesOf(text, search);

    expect(indice).toEqual([[1, 4], [10, 13]]);
  });

  it('should return two indices with case sensitive on', () => {
    const text = 'abcd efgh bCde';
    const search = 'bcd';

    const indice = indicesOf(text, search, true);

    expect(indice).toEqual([[1, 4]]);
  });

  it('should also return overlappings matches', () => {
    const text = 'ababab';
    const search = 'aba';

    const indice = indicesOf(text, search);

    expect(indice).toEqual([[0, 3], [2, 5]]);
  });

  it('should directly return empty match if search empty string', () => {
    const text = 'abcd efgh';
    const search = '';

    const indice = indicesOf(text, search);

    expect(indice).toEqual([]);
  });

  it('should work correctly with regex', () => {
    const text = 'abbc deAbcd abbc';
    const search = /ab+c/i;

    const indice = indicesOf(text, search);

    expect(indice).toEqual([
      [0, 4], [12, 16],
      [7, 10],
      [0, 4], [12, 16],
    ]);
  });

  it('should return empty array when no match with regex', () => {
    const text = 'abbc deAbcd abbc';
    const search = /efg/;

    const indice = indicesOf(text, search);

    expect(indice).toEqual([]);
  });
});
