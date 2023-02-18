const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const upload = multer({ dest: '../uploads' });

router.post('/upload', upload.single('image'), (req, res, next) => {
  const file = req.body;

  if (!file) {
    const error = new Error('Please upload a file');
    error.httpStatusCode = 400;
    return next(error);
  }
  res.send(file);
});

router.get('/download', (req, res, next) => {
  const file = `${__dirname}/uploads/sample.pdf`;
  res.download(file);
});

router.get('/', (req, res, next) => {
  res.send('test');
});

module.exports = router;
