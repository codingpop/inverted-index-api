import express from 'express';
import dotenv from 'dotenv';
import multer from 'multer';
import fileSystem from 'fs';
import Promise from 'promise';
import InvertedIndex from '../src/inverted-index';

const runApp = new InvertedIndex();

dotenv.config();

const upload = multer({ dest: 'fixtures/uploads' });
const port = process.env.PORT;
const app = express();

app.post('/api/create', upload.array('jsonfile'), (req, res) => {
  const books = req.files;
  let content;
  let fileName;
  const indexed = [];

  const bookNum = books.length;
  books.forEach((book, index) => {
    fileSystem.readFile(book.path, 'utf8', (err, data) => {
      if (err) {
        res.send(err.message);
      } else {
        fileName = book.originalname;
        try {
          content = JSON.parse(data);
          runApp.createIndex(fileName, content);
          indexed.push(fileName);
          if (index === bookNum - 1) {
            res.status(200).json(runApp.indices);
          }
        } catch (err) {
          if (err instanceof SyntaxError) {
            res.send('Not a JSON file');
          }
        }
      }
    });
  });
});

app.post('/api/search', (req, res) => {
  res.status(200).send('Searching index');
});

app.all('*', (req, res) => {
  res.status(400).send('400 Bad Request');
});

app.listen(port, () => {

});
