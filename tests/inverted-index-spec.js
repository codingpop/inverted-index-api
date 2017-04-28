const InvertedIndex = require('../src/inverted-index');
const valid = require('../fixtures/valid');
const malformed = require('../fixtures/malformed');
const bad = require('../fixtures/bad');
const empty = require('../fixtures/empty');

const testInvertedIndex = new InvertedIndex();

describe('Inverted Index tests', () => {
  describe('Checks if file is valid', () => {
    it('should return `true` for a valid JSON file', () => {
      expect(testInvertedIndex.isValid(valid)).toBe(true);
      expect(testInvertedIndex.isValid(malformed)).toBe(true);
      expect(testInvertedIndex.isValid(empty)).toBe(false);
      expect(testInvertedIndex.isValid(bad)).toBe(false);
    });
  });

  describe('Checks if file is malformed', () => {
    it('should return `true` for malformed JSON file', () => {
      expect(testInvertedIndex.isMalformed(malformed)).toBe(true);
      expect(testInvertedIndex.isMalformed(valid)).toBe(false);
    });
  });
});
