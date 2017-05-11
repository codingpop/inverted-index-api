'use strict';

var _invertedIndex = require('../src/inverted-index');

var _invertedIndex2 = _interopRequireDefault(_invertedIndex);

var _valid = require('../fixtures/valid.json');

var _valid2 = _interopRequireDefault(_valid);

var _book = require('../fixtures/book1.json');

var _book2 = _interopRequireDefault(_book);

var _book3 = require('../fixtures/book2.json');

var _book4 = _interopRequireDefault(_book3);

var _malformed = require('../fixtures/malformed.json');

var _malformed2 = _interopRequireDefault(_malformed);

var _bad = require('../fixtures/bad.json');

var _bad2 = _interopRequireDefault(_bad);

var _empty = require('../fixtures/empty.json');

var _empty2 = _interopRequireDefault(_empty);

var _searchValid = require('../fixtures/search-valid.json');

var _searchValid2 = _interopRequireDefault(_searchValid);

var _searchAll = require('../fixtures/search-all.json');

var _searchAll2 = _interopRequireDefault(_searchAll);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var testInvertedIndex = new _invertedIndex2.default();

describe('Inverted Index tests', function () {
  describe('Checks if create index is properly called', function () {
    it('should return `Improper arguments`', function () {
      expect(testInvertedIndex.createIndex()).toBe('Improper arguments');
      expect(testInvertedIndex.createIndex(_valid2.default)).toBe('Improper arguments');
    });

    it('should return `Empty JSON array`', function () {
      expect(testInvertedIndex.createIndex('string', [])).toBe('Empty JSON array');
    });

    it('should return `Not JSON array`', function () {
      expect(testInvertedIndex.createIndex('string', 3)).toBe('Not JSON array');
      expect(testInvertedIndex.createIndex('string', {})).toBe('Not JSON array');
    });

    it('should return `Improper file name`', function () {
      expect(testInvertedIndex.createIndex([], [])).toBe('Improper file name');
    });

    it('should return `Malformed file`', function () {
      expect(testInvertedIndex.createIndex('string', ['title'])).toBe('Malformed file');
      expect(testInvertedIndex.createIndex('string', _malformed2.default)).toBe('Malformed file');
      expect(testInvertedIndex.createIndex('string', _bad2.default)).toBe('Malformed file');
    });
  });

  describe('Checks if file is malformed', function () {
    it('should return `true` for malformed JSON file', function () {
      expect(_invertedIndex2.default.isMalformed(_malformed2.default)).toBe(true);
    });

    it('should return `false` for a valid JSON array', function () {
      expect(_invertedIndex2.default.isMalformed(_valid2.default)).toBe(false);
    });
  });

  describe('Checks if text is properly tokenized', function () {
    var text1 = _valid2.default[0].text;
    var text2 = _valid2.default[1].text;

    var validTokens1 = Array.from(new Set(text1.toLowerCase().split(' ')));
    var validTokens2 = Array.from(new Set(text2.toLowerCase().split(' ')));

    it('should return an array of unique tokens', function () {
      expect(_invertedIndex2.default.tokenize(text1)).toBeTruthy();
      expect(_invertedIndex2.default.tokenize(text1)).toEqual(validTokens1);
      expect(_invertedIndex2.default.tokenize(text2)).toEqual(validTokens2);
    });
  });

  describe('Checks if a JSON file content is properly flattened', function () {
    var expected = 'Coding is fun Yes we all love coding ' + 'and laughs What is love He hates what love is';

    it('should return a string of all titles and texts', function () {
      expect(_invertedIndex2.default.flattenContent(_book2.default)).toBe(expected);
    });
  });

  describe('Checks if the searchIndex returns valid results', function () {
    testInvertedIndex.createIndex('valid.json', _valid2.default);
    testInvertedIndex.createIndex('book1.json', _book2.default);

    var indices = testInvertedIndex.indices;
    it('should return a valid result for one file', function () {
      expect(_invertedIndex2.default.searchIndex(indices, 'valid.json', 'laughs')).toEqual(_searchValid2.default);
    });

    it('should return a valid result for all files', function () {
      expect(_invertedIndex2.default.searchIndex(indices, 'laughs')).toEqual(_searchAll2.default);
    });

    it('should return a valid result for all files', function () {
      expect(_invertedIndex2.default.searchIndex(indices, ['laughs'])).toEqual(_searchAll2.default);
    });

    it('should return `try not in index`', function () {
      expect(_invertedIndex2.default.searchIndex(indices, 'try.json', 'laughs')).toBe('try.json not in index');
    });

    it('should return `{meh: []}`', function () {
      expect(_invertedIndex2.default.searchIndex(indices, 'valid.json', 'meh')).toEqual({ meh: [] });
    });

    var expected = {
      'valid.json': { meh: [] },
      'book1.json': { meh: [] }
    };

    it('should return appropriate result', function () {
      expect(_invertedIndex2.default.searchIndex(indices, 'meh')).toEqual(expected);
    });
  });
});