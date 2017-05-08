'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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
   * Checks for valid JSON file
   * @param {object} jsonFile - the JSON file to be checked
   * @returns {boolean} - either true or false
   */


  _createClass(InvertedIndex, [{
    key: 'createIndex',


    /**
     * Reads the file and creates an index of the words in it
     * @param {string} fileName - the name of the book to be indexed
     * @param {string} fileContent - the content of the file (JSON array)
     * @returns {string} - returns a string
     */
    value: function createIndex(fileName, fileContent) {
      if (!InvertedIndex.isValid(fileContent)) {
        return 'The uploaded file is invalid';
      }
      if (InvertedIndex.isMalformed(fileContent)) {
        return 'The JSON file is malformed';
      }

      var index = {};
      var allContent = InvertedIndex.tokenize(InvertedIndex.flattenContent(fileContent));
      var eachContent = void 0;

      fileContent.forEach(function (book, i) {
        eachContent = book;
        eachContent = new Set(InvertedIndex.tokenize(eachContent.title + ' ' + eachContent.text));

        allContent.forEach(function (word) {
          if (eachContent.has(word)) {
            if (word in index) index[word].push(i);else index[word] = [i];
          }
        });
      });
      this.indices[fileName] = index;
      return JSON.stringify(index);
    }

    /**
     * Searches the already created index
     * @param {string} fileName - name of the file to be searched
     * @param {string|array} terms - search terms
     * @returns {object} - contains the location of each terms
     */

  }, {
    key: 'searchIndex',
    value: function searchIndex() {
      var fileName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'all';

      var indices = this.indices;
      var searchTerms = [];
      var result = {};

      for (var _len = arguments.length, terms = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        terms[_key - 1] = arguments[_key];
      }

      terms.forEach(function (term) {
        if (Array.isArray(term)) searchTerms.push.apply(searchTerms, _toConsumableArray(term));
        if (typeof term === 'string') searchTerms.push.apply(searchTerms, _toConsumableArray(term.split(' ')));
      });

      /**
       * Creates a property in result for each book
       * Initializes it to an empty object
       */
      Object.keys(indices).forEach(function (index) {
        result[index] = {};
      });

      Object.keys(indices).forEach(function (index) {
        searchTerms.forEach(function (word) {
          if (word in indices[index]) {
            result[index][word] = indices[index][word];
          } else {
            result[index][word] = [];
          }
        });
      });

      if (fileName === 'all') {
        return result;
      }
      return result[fileName];
    }
  }], [{
    key: 'isValid',
    value: function isValid(jsonFile) {
      return Array.isArray(jsonFile) && !!jsonFile.length;
    }

    /**
     * Checks for malformed JSON file
     * @param {object} jsonFile - the JSON file to be checked
     * @returns {boolean} - either true or false
     */

  }, {
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
      return flattenedContent.trim().toLowerCase();
    }
  }]);

  return InvertedIndex;
}();

exports.default = InvertedIndex;