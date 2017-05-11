import InvertedIndex from '../src/inverted-index';
import valid from '../fixtures/valid.json';
import book1 from '../fixtures/book1.json';
import book2 from '../fixtures/book2.json';
import malformed from '../fixtures/malformed.json';
import bad from '../fixtures/bad.json';
import empty from '../fixtures/empty.json';
import searchValid from '../fixtures/search-valid.json';
import searchAll from '../fixtures/search-all.json';

const testInvertedIndex = new InvertedIndex();

describe('Inverted Index tests', () => {
  describe('Checks if create index is properly called', () => {
    it('should return `Improper arguments`', () => {
      expect(testInvertedIndex.createIndex()).toBe('Improper arguments');
      expect(testInvertedIndex.createIndex(valid)).toBe('Improper arguments');
    });

    it('should return `Empty JSON array`', () => {
      expect(testInvertedIndex.createIndex('string', [])).toBe('Empty JSON array');
    });

    it('should return `Not JSON array`', () => {
      expect(testInvertedIndex.createIndex('string', 3)).toBe('Not JSON array');
      expect(testInvertedIndex.createIndex('string', {})).toBe('Not JSON array');
    });

    it('should return `Improper file name`', () => {
      expect(testInvertedIndex.createIndex([], [])).toBe('Improper file name');
    });

    it('should return `Malformed file`', () => {
      expect(testInvertedIndex.createIndex('string', ['title'])).toBe('Malformed file');
      expect(testInvertedIndex.createIndex('string', malformed)).toBe('Malformed file');
      expect(testInvertedIndex.createIndex('string', bad)).toBe('Malformed file');
    });
  });

  describe('Checks if file is malformed', () => {
    it('should return `true` for malformed JSON file', () => {
      expect(InvertedIndex.isMalformed(malformed)).toBe(true);
    });

    it('should return `false` for a valid JSON array', () => {
      expect(InvertedIndex.isMalformed(valid)).toBe(false);
    });
  });

  describe('Checks if text is properly tokenized', () => {
    const text1 = valid[0].text;
    const text2 = valid[1].text;

    const validTokens1 = Array
      .from(new Set(text1.toLowerCase().split(' ')));
    const validTokens2 = Array
      .from(new Set(text2.toLowerCase().split(' ')));

    it('should return an array of unique tokens', () => {
      expect(InvertedIndex.tokenize(text1))
        .toBeTruthy();
      expect(InvertedIndex.tokenize(text1))
        .toEqual(validTokens1);
      expect(InvertedIndex.tokenize(text2))
        .toEqual(validTokens2);
    });
  });

  describe('Checks if a JSON file content is properly flattened', () => {
    const expected = 'Coding is fun Yes we all love coding ' +
      'and laughs What is love He hates what love is';

    it('should return a string of all titles and texts', () => {
      expect(InvertedIndex.flattenContent(book1))
        .toBe(expected);
    });
  });

  describe('Checks if the searchIndex returns valid results', () => {
    testInvertedIndex.createIndex('valid.json', valid);
    testInvertedIndex.createIndex('book1.json', book1);

    const indices = testInvertedIndex.indices;
    it('should return a valid result for one file', () => {
      expect(InvertedIndex
        .searchIndex(indices, 'valid.json', 'laughs'))
        .toEqual(searchValid);
    });

    it('should return a valid result for all files', () => {
      expect(InvertedIndex
        .searchIndex(indices, 'laughs'))
        .toEqual(searchAll);
    });

    it('should return a valid result for all files', () => {
      expect(InvertedIndex
        .searchIndex(indices, ['laughs']))
        .toEqual(searchAll);
    });

    it('should return `try not in index`', () => {
      expect(InvertedIndex
        .searchIndex(indices, 'try.json', 'laughs'))
        .toBe('try.json not in index');
    });

    it('should return `{meh: []}`', () => {
      expect(InvertedIndex
        .searchIndex(indices, 'valid.json', 'meh'))
        .toEqual({ meh: [] });
    });

    const expected = {
      'valid.json': { meh: [] },
      'book1.json': { meh: [] }
    };

    it('should return appropriate result', () => {
      expect(InvertedIndex
        .searchIndex(indices, 'meh'))
        .toEqual(expected);
    });
  });
});
