const InvertedIndex = require('../src/inverted-index');
const valid = require('../fixtures/valid');
const book1 = require('../fixtures/book1');
const malformed = require('../fixtures/malformed');
const bad = require('../fixtures/bad');
const empty = require('../fixtures/empty');

const testInvertedIndex = new InvertedIndex();

describe('Inverted Index tests', () => {
  describe('Checks if file is valid', () => {
    it('should return `true` for a valid JSON file', () => {
      expect(testInvertedIndex.isValid(valid)).toBe(true);
      expect(testInvertedIndex.isValid(malformed)).toBe(true);
    });

    it('should return `false` for an invalid JSON file', () => {
      expect(testInvertedIndex.isValid(empty)).toBe(false);
      expect(testInvertedIndex.isValid(bad)).toBe(false);
    });
  });

  describe('Checks if file is malformed', () => {
    it('should return `true` for malformed JSON file', () => {
      expect(testInvertedIndex.isMalformed(malformed)).toBe(true);
    });

    it('should return `false` for a valid JSON array', () => {
      expect(testInvertedIndex.isMalformed(valid)).toBe(false);
    });
  });

  describe('Checks if text is properly tokenized', () => {
    const text1 = valid[0].text;
    const text2 = valid[1].text;

    const validTokens1 = Array.from(new Set(text1.toLowerCase().split(' ')));
    const validTokens2 = Array.from(new Set(text2.toLowerCase().split(' ')));

    it('should return an array of unique tokens', () => {
      expect(testInvertedIndex.tokenize(text1)).toBeTruthy();
      expect(testInvertedIndex.tokenize(text1)).toEqual(validTokens1);
      expect(testInvertedIndex.tokenize(text2)).toEqual(validTokens2);
    });
  });

  describe('Checks if a JSON file content is properly flattened', () => {
    const expected = 'Hey You We are here On Programming He laughs';

    it('should return a string of all titles and texts in a JSON file', () => {
      expect(testInvertedIndex.flattenContent(book1)).toBe(expected);
    });
  });
});
