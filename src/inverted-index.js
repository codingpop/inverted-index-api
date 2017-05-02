class InvertedIndex {
  constructor() {
    this.indices = {};
  }

  isValid(jsonFile) {
    return Array.isArray(jsonFile) && !!jsonFile.length;
  }

  isMalformed(jsonFile) {
    let result = false;
    for (let i = 0; i < jsonFile.length; i += 1) {
      result = !('title' in jsonFile[i] && 'text' in jsonFile[i]);
      if (result === true) break;
    }
    return result;
  }

  tokenize(text) {
    text = new Set(text.toLowerCase().split(' '));
    return Array.from(text);
  }

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
