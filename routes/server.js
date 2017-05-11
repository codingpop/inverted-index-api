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

app.post('/api/create', upload.array('file'), (req, res) => {
  const books = req.files;
  let content;
  let fileName;

  const populateIndex = () => {
    return new Promise((resolve, reject) => {
      books.forEach((book) => {
        fileSystem.readFile(book.path, 'utf8', (err, data) => {
          if (err) {
            res.send(err.message);
          } else {
            fileName = book.originalname;
            try {
              content = JSON.parse(data);
              runApp.createIndex(fileName, content);
              resolve('Success!');
            } catch (err) {
              if (err instanceof SyntaxError) {
                reject('Not a JSON file!');
              } else if (err) {
                reject(err.message);
              }
            }
          }
        });
      });
    });
  };

  populateIndex().then(() => {
    if (req.files.length === 1) {
      res.status(200).json(runApp.indices[fileName]);
    } else {
      res.status(200).json(runApp.indices);
    }
  }).catch((fromReject) => {
    res.status(400).send(fromReject);
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
