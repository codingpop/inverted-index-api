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
      if (result === true) break;
    }
    return result;
  }

  /**
   * Breaks a string of text into unique word tokens
   * @param {string} text - the string to be broken
   * @returns {array} - an array of unique tokens
   */
  tokenize(text) {
    text = new Set(text.toLowerCase().split(' '));
    return Array.from(text);
  }

  /**
   * Reads the file and creates an index of the words in it
   * @param {string} fileName - the name of the book to be indexed
   * @param {string} fileContent - the content of the file
   * @returns {string|object} - returns an object or a string
   */
  createIndex(fileName, fileContent) {

    if (!this.isValid()) {
      return 'The uploaded file is invalid';
    }

    if (this.isMalformed()) {
      return 'The JSON file is malformed';
    }

    const book1Text = this.tokenize(fileContent[0].text);
    const book2Text = this.tokenize(fileContent[1].text);
  }

  searchIndex() {
    
  }
}

module.exports = InvertedIndex;
