'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// const valid = require('../fixtures/valid');
// const book1 = require('../fixtures/book1');

/**
 * The Inverted Index class
 * @author Babatunde Adeyemi <tundewrites@gmail.com>
 * @class
 */
var InvertedIndex = function () {

  /**
   * Initializes indices to an empty object
   * @constructor
   */
  function InvertedIndex() {
    _classCallCheck(this, InvertedIndex);

    this.indices = {};
  }

  /**
   * Checks for malformed JSON file
   * @param {object} jsonFile - the JSON file to be checked
   * @returns {boolean} - either true or false
   */


  _createClass(InvertedIndex, [{
    key: 'createIndex',


    /**
     * Reads the file and creates an index of the words in it
     * @param {string} fileName - the name of the book to be indexed
     * @param {string} fileContent - the content of the JSON array
     * @returns {string} - returns a string
     */
    value: function createIndex(fileName, fileContent) {
      if (!fileName || fileContent === undefined) {
        return 'Improper arguments';
      }

      if (!Array.isArray(fileContent)) {
        return 'Not JSON array';
      }

      if (typeof fileName !== 'string') {
        return 'Improper file name';
      }

      if (!fileContent.length) {
        return 'Empty JSON array';
      }

      try {
        if (InvertedIndex.isMalformed(fileContent)) {
          return 'Malformed file';
        }
      } catch (TypeError) {
        return 'Malformed file';
      }

      var index = {};
      var allContent = InvertedIndex.tokenize(InvertedIndex.flattenContent(fileContent));
      var eachContent = void 0;

      fileContent.forEach(function (book, location) {
        eachContent = book;
        eachContent = new Set(InvertedIndex.tokenize(eachContent.title + ' ' + eachContent.text));

        allContent.forEach(function (word) {
          if (eachContent.has(word)) {
            if (word in index) index[word].push(location);else index[word] = [location];
          }
        });
      });
      this.indices[fileName] = index;
      return JSON.stringify(index);
    }

    /**
     * Searches the already created index
     * @param {object} indices - indices to be search
     * @param {string} fileName - name of the file to be searched
     * @param {string|array} terms - search terms
     * @returns {object} - contains the location of each terms
     */

  }], [{
    key: 'isMalformed',
    value: function isMalformed(jsonFile) {
      var result = false;
      for (var i = 0; i < jsonFile.length; i += 1) {
        result = !('title' in jsonFile[i] && 'text' in jsonFile[i]);
        if (result) break;
      }
      return result;
    }

    /**
     * Breaks a string of text into unique word tokens
     * @param {string} text - the string to be broken
     * @returns {set} - a set of unique tokens
     */

  }, {
    key: 'tokenize',
    value: function tokenize(text) {
      text = new Set(text.toLowerCase().split(' '));
      return Array.from(text);
    }

    /**
     * Gets all the content of JSON file
     * @param {array} jsonFile - array of book objects
     * @returns {string} - a string mashup of both title and text
     */

  }, {
    key: 'flattenContent',
    value: function flattenContent(jsonFile) {
      var flattenedContent = '';
      jsonFile.forEach(function (book) {
        flattenedContent += book.title + ' ' + book.text + ' ';
      });
      return flattenedContent.trim();
    }
  }, {
    key: 'searchIndex',
    value: function searchIndex(indices) {
      var searchTerms = [];
      var result = {};
      var keys = Object.keys(indices);

      for (var _len = arguments.length, terms = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        terms[_key - 1] = arguments[_key];
      }

      terms.forEach(function (term) {
        if (Array.isArray(term)) {
          searchTerms.push.apply(searchTerms, _toConsumableArray(term));
        }
        if (typeof term === 'string') {
          searchTerms.push.apply(searchTerms, _toConsumableArray(term.split(' ')));
        }
      });

      keys(indices).forEach(function (index) {
        result[index] = {};
      });

      keys(indices).forEach(function (index) {
        searchTerms.forEach(function (word) {
          if (word in indices[index]) {
            result[index][word] = indices[index][word];
          } else {
            result[index][word] = [];
          }
        });
      });

      var fileName = void 0;
      if (searchTerms[0].endsWith('.json')) {
        fileName = searchTerms.shift();
      } else {
        fileName = 'all';
      }

      if (!(fileName in indices) && fileName !== 'all') {
        return fileName + ' not in index';
      }

      if (fileName === 'all') {
        return result;
      }
      return result[fileName];
    }
  }]);

  return InvertedIndex;
}();

// const test = new InvertedIndex();

// console.log(test.createIndex('valid.json', valid));
// console.log(test.createIndex('book1.json', book1));

// console.log(test.searchIndex('valid.json', 'laughs'));
// console.log(test.indices);


exports.default = InvertedIndex;