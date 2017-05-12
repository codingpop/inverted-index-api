import InvertedIndex from '../src/inverted-index';
import valid from '../fixtures/valid.json';
import book1 from '../fixtures/book1.json';
import malformed from '../fixtures/malformed.json';
import bad from '../fixtures/bad.json';
import searchValid from '../fixtures/search-valid.json';
import searchAll from '../fixtures/search-all.json';

const testInvertedIndex = new InvertedIndex();

describe('Inverted Index tests', () => {
  describe('Is createIndex() properly called?', () => {
    it('should throw `Improper arguments`', () => {
      expect(() => { testInvertedIndex.createIndex(); })
        .toThrow('Improper arguments');
      expect(() => { testInvertedIndex.createIndex(valid); })
        .toThrow('Improper arguments');
    });

    it('should throw `Empty JSON array`', () => {
      expect(() => {
        testInvertedIndex
          .createIndex('string', []);
      })
        .toThrow('Empty JSON array');
    });

    it('should throw `Not JSON array`', () => {
      expect(() => {
        testInvertedIndex
          .createIndex('string', 3);
      })
        .toThrow('Not JSON array');
      expect(() => {
        testInvertedIndex
          .createIndex('string', {});
      })
        .toThrow('Not JSON array');
    });

    it('should throw `Improper file name`', () => {
      expect(() => {
        testInvertedIndex
          .createIndex([], []);
      })
        .toThrow('Improper file name');
    });

    it('should throw `Malformed file`', () => {
      expect(() => {
        testInvertedIndex
          .createIndex('string', ['title']);
      })
        .toThrow('Malformed file');
      expect(() => {
        testInvertedIndex
          .createIndex('string', malformed);
      })
        .toThrow('Malformed file');
      expect(() => {
        testInvertedIndex
          .createIndex('string', bad);
      })
        .toThrow(Error('Malformed file'));
    });
  });

  describe('Checks if file is malformed', () => {
    it('should return `true` for malformed JSON file', () => {
      expect(InvertedIndex
        .isMalformed(malformed)).toBe(true);
    });

    it('should return `false` for a valid JSON array', () => {
      expect(InvertedIndex
        .isMalformed(valid)).toBe(false);
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

  describe('Is JSON content is properly flattened?', () => {
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
