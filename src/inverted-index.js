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
   * @returns {array} - a set of unique tokens
   */
  static tokenize(text) {
    text = new Set(text.toLowerCase().match(/\w+/g));
    return Array.from(text).sort();
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
   * Reads the file and and verify if it's valid
   * Then creates an index of the words in it
   * @param {string} fileName - the name of the book to be indexed
   * @param {string} fileContent - the content of the JSON array
   * @returns {object} - returns a string
   */
  createIndex(fileName, fileContent) {
    if (!fileName || fileContent === undefined) {
      throw new Error('Improper arguments');
    }

    if (!Array.isArray(fileContent)) {
      throw new Error('Not JSON array');
    }

    if (typeof fileName !== 'string') {
      throw new Error('Improper file name');
    }

    if (!fileContent.length) {
      throw new Error('Empty JSON array');
    }
    try {
      if (InvertedIndex.isMalformed(fileContent)) {
        throw new Error('Malformed file');
      }
    } catch (err) {
      throw new Error('Malformed file');
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
    let searchTerms = [];
    const result = {};
    const keys = Object.keys(indices);

    terms.forEach((term) => {
      if (Array.isArray(term)) {
        searchTerms.push(...term);
      }
      if (typeof term === 'string') {
        searchTerms.push(...InvertedIndex.tokenize(term));
      }
    });

    keys.forEach((index) => {
      result[index] = {};
    });

    let fileName;
    if (searchTerms[1] === 'json') {
      fileName = `${searchTerms[0]}.json`;
      searchTerms = searchTerms.slice(2);
    } else {
      fileName = 'all';
    }

    keys.forEach((index) => {
      searchTerms.forEach((word) => {
        if (word in indices[index]) {
          result[index][word] = indices[index][word];
        } else {
          result[index][word] = [];
        }
      });
    });

    if (!(fileName in indices) && fileName !== 'all') {
      return `${fileName} not in index`;
    }

    if (fileName === 'all') {
      return result;
    }
    return result[fileName];
  }
}

export default InvertedIndex;
