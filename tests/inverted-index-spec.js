const myBook = require('../src/inverted-index');

describe('Inverted Index tests ', () => {
  it('should return `0` for an empty JSON array', () => {
    expect(myBook.validateBook([]).toBe('empty'));
  });
});
