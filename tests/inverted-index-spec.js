import InvertedIndex from '../inverted-index';
import valid from '../fixtures/valid.json';
import book1 from '../fixtures/book1.json';
import book2 from '../fixtures/book2.json';
import malformed from '../fixtures/malformed.json';
import bad from '../fixtures/bad.json';
import empty from '../fixtures/empty.json';
import book2Index from '../fixtures/book2Index.json';

const testInvertedIndex = new InvertedIndex();

describe('Inverted Index tests', () => {
  describe('Checks if file is valid', () => {
    it('should return `true` for a valid JSON file', () => {
      expect(InvertedIndex.isValid(valid)).toBe(true);
      expect(InvertedIndex.isValid(malformed)).toBe(true);
    });

    it('should return `false` for an invalid JSON file', () => {
      expect(InvertedIndex.isValid(empty)).toBe(false);
      expect(InvertedIndex.isValid(bad)).toBe(false);
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

    const validTokens1 = Array.from(new Set(text1.toLowerCase().split(' ')));
    const validTokens2 = Array.from(new Set(text2.toLowerCase().split(' ')));

    it('should return an array of unique tokens', () => {
      expect(InvertedIndex.tokenize(text1)).toBeTruthy();
      expect(InvertedIndex.tokenize(text1)).toEqual(validTokens1);
      expect(InvertedIndex.tokenize(text2)).toEqual(validTokens2);
    });
  });

  describe('Checks if a JSON file content is properly flattened', () => {
    const expected = 'hey you we are here on programming he laughs';

    it('should return a string of all titles and texts in a JSON file', () => {
      expect(InvertedIndex.flattenContent(book1)).toBe(expected);
    });
  });

  describe('Checks if index is properly created', () => {
    it('should return a valid index', () => {
      expect(testInvertedIndex.createIndex('book2.json', book2)).toEqual(book2Index);
    });
  });

  describe('Checks if the search index returns the appropriate results', () => {
    it('should return a valid search result', () => {
      expect(testInvertedIndex.searchIndex('indices', 'book1.json', ['crazy', 'tiger'])).toBe();
    });
  });
});
