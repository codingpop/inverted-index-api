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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import book2Index from '../fixtures/book2Index.json';

var testInvertedIndex = new _invertedIndex2.default();

describe('Inverted Index tests', function () {
  describe('Checks if file is valid', function () {
    it('should return `true` for a valid JSON file', function () {
      expect(_invertedIndex2.default.isValid(_valid2.default)).toBe(true);
      expect(_invertedIndex2.default.isValid(_malformed2.default)).toBe(true);
    });

    it('should return `false` for an invalid JSON file', function () {
      expect(_invertedIndex2.default.isValid(_empty2.default)).toBe(false);
      expect(_invertedIndex2.default.isValid(_bad2.default)).toBe(false);
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
    var expected = 'hey you we are here on programming he laughs';

    it('should return a string of all titles and texts in a JSON file', function () {
      expect(_invertedIndex2.default.flattenContent(_book2.default)).toBe(expected);
    });
  });

  // describe('Checks if index is properly created', () => {
  //   it('should return a valid index', () => {
  //     expect(testInvertedIndex.createIndex('book2.json', book2)).toEqual(book2Index);
  //   });
  // });

  describe('Checks if the search index returns the appropriate results', function () {
    it('should return a valid search result', function () {
      expect(testInvertedIndex.searchIndex('indices', 'book1.json', ['crazy', 'tiger'])).toBe();
    });
  });
});