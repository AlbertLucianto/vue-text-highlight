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
        highlightIndex: 0,
      },
      {
        isHighlighted: false,
        text: 'd ',
      },
      {
        isHighlighted: true,
        text: 'ef',
        highlightIndex: 1,
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
        highlightIndex: 0,
      },
      {
        isHighlighted: true,
        text: 'Abc',
        highlightIndex: 1,
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
        highlightIndex: 0,
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

    const currEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = 'production';

    expect(highlightChunks(text, object)).toEqual([]);

    process.env.NODE_ENV = currEnv;
  });

  test('should merge correctly using regex', () => {
    const text = 'abbcdeAbcd abbc';
    const queries = [/ab+c/i, 'cdeA'];

    const chunks = highlightChunks(text, queries);

    expect(chunks).toEqual([
      {
        isHighlighted: true,
        text: 'abbcdeAbc',
        highlightIndex: 0,
      },
      {
        isHighlighted: false,
        text: 'd ',
      },
      {
        isHighlighted: true,
        text: 'abbc',
        highlightIndex: 1,
      },
    ]);
  });
});
