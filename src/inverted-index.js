const valid = require('../fixtures/valid');
const book2 = require('../fixtures/book2');

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
   * Checks for valid JSON file
   * @param {object} jsonFile - the JSON file to be checked
   * @returns {boolean} - either true or false
   */
  isValid(jsonFile) {
    return Array.isArray(jsonFile) && !!jsonFile.length;
  }

  /**
   * Checks for malformed JSON file
   * @param {object} jsonFile - the JSON file to be checked
   * @returns {boolean} - either true or false
   */
  isMalformed(jsonFile) {
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
  tokenize(text) {
    text = new Set(text.toLowerCase().split(' '));
    return Array.from(text);
  }

  /**
   * Gets all the content of JSON file
   * @param {array} jsonFile - array of book objects
   * @returns {string} - a string mashup of both title and text
   */
  flattenContent(jsonFile) {
    let flattenedContent = '';
    jsonFile.forEach((book) => {
      flattenedContent += `${book.title} ${book.text} `;
    });
    return flattenedContent.trim().toLowerCase();
  }

  /**
   * Reads the file and creates an index of the words in it
   * @param {string} fileName - the name of the book to be indexed
   * @param {string} fileContent - the content of the file (JSON array)
   * @returns {string} - returns a string
   */
  createIndex(fileName, fileContent) {
    if (!this.isValid(fileContent)) return 'The uploaded file is invalid';

    if (this.isMalformed(fileContent)) return 'The JSON file is malformed';

    const index = {};
    const allContent = this.tokenize(this.flattenContent(fileContent));
    let eachContent;

    fileContent.forEach((book, i) => {
      eachContent = book;
      eachContent = new Set(this.tokenize(`${eachContent.title} ${eachContent.text}`));

      allContent.forEach((word) => {
        if (eachContent.has(word)) {
          if (word in index) index[word].push(i);
          else index[word] = [i];
        }
      });
    });
    this.indices[fileName] = index;
    return JSON.stringify(index);
  }

}

const iIndex = new InvertedIndex();

iIndex.createIndex('book1.json', valid);
iIndex.createIndex('book2.json', book2);
// console.log(iIndex.searchIndex('index', 'book1.json', 'wire tiger'));

console.log(iIndex.indices);

module.exports = InvertedIndex;
