import highlightChunks from 'vue-text-highlighter/components/highlightChunks';

describe('highlightChunks', () => {
  test('should alternatingly push non-highlighted and highlighted', () => {
    const text = 'aBcd efg';
    const queries = ['abc', 'ef'];

    const chunks = highlightChunks(text, queries);

    expect(chunks).toEqual([
      {
        isHighlighted: true,
        text: 'aBc',
      },
      {
        isHighlighted: false,
        text: 'd ',
      },
      {
        isHighlighted: true,
        text: 'ef',
      },
      {
        isHighlighted: false,
        text: 'g',
      },
    ]);
  });

  test('should not merge adjacent', () => {
    const text = 'aBcAbc';
    const queries = ['abc'];

    const chunks = highlightChunks(text, queries);

    expect(chunks).toEqual([
      {
        isHighlighted: true,
        text: 'aBc',
      },
      {
        isHighlighted: true,
        text: 'Abc',
      },
    ]);
  });

  test('should accept string as queries', () => {
    const text = 'aBcd';
    const string = 'abc';

    const chunks = highlightChunks(text, string);

    expect(chunks).toEqual([
      {
        isHighlighted: true,
        text: 'aBc',
      },
      {
        isHighlighted: false,
        text: 'd',
      },
    ]);
  });

  test('should match case sensitive', () => {
    const text = 'aBcd';
    const string = 'abc';

    const chunks = highlightChunks(text, string, true);

    expect(chunks).toEqual([
      {
        isHighlighted: false,
        text: 'aBcd',
      },
    ]);
  });

  test('should accept string as queries', () => {
    const text = 'aBcd';
    const object = { test: 'abc' };

    expect(() => highlightChunks(text, object)).toThrow('queries must be');
  });

  test('should merge correctly using regex', () => {
    const text = 'abbcdeAbcd abbc';
    const queries = [/ab+c/i, 'cdeA'];

    const chunks = highlightChunks(text, queries);

    expect(chunks).toEqual([
      {
        isHighlighted: true,
        text: 'abbcdeAbc',
      },
      {
        isHighlighted: false,
        text: 'd ',
      },
      {
        isHighlighted: true,
        text: 'abbc',
      },
    ]);
  });
});
