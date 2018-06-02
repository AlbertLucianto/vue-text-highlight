import highlightChunks from 'vue-text-highlighter/components/highlightChunks';

describe('highlightChunks', () => {
  test('should alternatingly push non-highlighted and highlighted', () => {
    const text = 'aBcd efg';
    const queries = ['abc', 'ef'];

    const chunks = highlightChunks(text, queries);

    expect(chunks).toEqual([
      {
        isHighlighted: false,
        text: '',
      },
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
        isHighlighted: false,
        text: '',
      },
      {
        isHighlighted: true,
        text: 'aBc',
      },
      {
        isHighlighted: false,
        text: '',
      },
      {
        isHighlighted: true,
        text: 'Abc',
      },
      {
        isHighlighted: false,
        text: '',
      },
    ]);
  });

  test('should accept string as queries', () => {
    const text = 'aBcd';
    const string = 'abc';

    const chunks = highlightChunks(text, string);

    expect(chunks).toEqual([
      {
        isHighlighted: false,
        text: '',
      },
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

    expect(() => highlightChunks(text, object)).toThrow('either string or array');
  });
});
