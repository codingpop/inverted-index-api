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
  static isValid(jsonFile) {
    return Array.isArray(jsonFile) && !!jsonFile.length;
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
    return flattenedContent.trim().toLowerCase();
  }

  /**
   * Reads the file and creates an index of the words in it
   * @param {string} fileName - the name of the book to be indexed
   * @param {string} fileContent - the content of the file (JSON array)
   * @returns {string} - returns a string
   */
  createIndex(fileName, fileContent) {
    if (!InvertedIndex.isValid(fileContent)) return 'The uploaded file is invalid';
    if (InvertedIndex.isMalformed(fileContent)) return 'The JSON file is malformed';

    const index = {};
    const allContent = InvertedIndex.tokenize(InvertedIndex.flattenContent(fileContent));
    let eachContent;

    fileContent.forEach((book, i) => {
      eachContent = book;
      eachContent = new Set(InvertedIndex.tokenize(`${eachContent.title} ${eachContent.text}`));

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

  /**
   * Searches the already created index
   * @param {string} fileName - name of the file to be searched
   * @param {string|array} terms - search terms
   * @returns {object} - contains the location of each terms
   */
  searchIndex(fileName = 'all', ...terms) {
    const indices = this.indices;
    const searchTerms = [];
    const result = {};

    terms.forEach((term) => {
      if (Array.isArray(term)) searchTerms.push(...term);
      if (typeof term === 'string') searchTerms.push(...term.split(' '));
    });

    /**
     * Creates a property in result for each book
     * Initializes it to an empty object
     */
    Object.keys(indices).forEach((index) => {
      result[index] = {};
    });

    Object.keys(indices).forEach((index) => {
      searchTerms.forEach((word) => {
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
}

module.exports = InvertedIndex;
