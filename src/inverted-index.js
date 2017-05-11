// const valid = require('../fixtures/valid');
// const book1 = require('../fixtures/book1');

/**
 * The Inverted Index class
 * @author Babatunde Adeyemi <tundewrites@gmail.com>
 * @class
 */
class InvertedIndex {

  /**
   * Initializes indices to an empty object
   * @constructor
   */
  constructor() {
    this.indices = {};
  }

  /**
   * Checks for malformed JSON file
   * @param {object} jsonFile - the JSON file to be checked
   * @returns {boolean} - either true or false
   */
  static isMalformed(jsonFile) {
    let result = false;
    for (let i = 0; i < jsonFile.length; i += 1) {
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
  static tokenize(text) {
    text = new Set(text.toLowerCase().split(' '));
    return Array.from(text);
  }

  /**
   * Gets all the content of JSON file
   * @param {array} jsonFile - array of book objects
   * @returns {string} - a string mashup of both title and text
   */
  static flattenContent(jsonFile) {
    let flattenedContent = '';
    jsonFile.forEach((book) => {
      flattenedContent += `${book.title} ${book.text} `;
    });
    return flattenedContent.trim();
  }

  /**
   * Reads the file and creates an index of the words in it
   * @param {string} fileName - the name of the book to be indexed
   * @param {string} fileContent - the content of the JSON array
   * @returns {string} - returns a string
   */
  createIndex(fileName, fileContent) {
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

    const index = {};
    const allContent = InvertedIndex
    .tokenize(InvertedIndex.flattenContent(fileContent));
    let eachContent;

    fileContent.forEach((book, location) => {
      eachContent = book;
      eachContent = new Set(InvertedIndex
      .tokenize(`${eachContent.title} ${eachContent.text}`));

      allContent.forEach((word) => {
        if (eachContent.has(word)) {
          if (word in index) index[word].push(location);
          else index[word] = [location];
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
  static searchIndex(indices, ...terms) {
    const searchTerms = [];
    const result = {};
    const keys = Object.keys(indices);

    terms.forEach((term) => {
      if (Array.isArray(term)) {
        searchTerms.push(...term);
      }
      if (typeof term === 'string') {
        searchTerms.push(...term.split(' '));
      }
    });

    keys(indices).forEach((index) => {
      result[index] = {};
    });

    keys(indices).forEach((index) => {
      searchTerms.forEach((word) => {
        if (word in indices[index]) {
          result[index][word] = indices[index][word];
        } else {
          result[index][word] = [];
        }
      });
    });

    let fileName;
    if (searchTerms[0].endsWith('.json')) {
      fileName = searchTerms.shift();
    } else {
      fileName = 'all';
    }

    if (!(fileName in indices) && fileName !== 'all') {
      return `${fileName} not in index`;
    }

    if (fileName === 'all') {
      return result;
    }
    return result[fileName];
  }
}


// const test = new InvertedIndex();

// console.log(test.createIndex('valid.json', valid));
// console.log(test.createIndex('book1.json', book1));

// console.log(test.searchIndex('valid.json', 'laughs'));
// console.log(test.indices);
export default InvertedIndex;
