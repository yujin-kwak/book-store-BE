const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    console.log('file', file.originalname);
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage, limits: { fileSize: 1000000 } });

router.post('/upload', upload.single('image'), async (req, res, next) => {
  try {
    const image = req.file;
    const { text } = req.body;

    console.log('text', text);
    console.log('req.file', req.file);
    console.log('image', image);
    // if (!req.body) {
    //   const error = new Error('Please upload a file');
    //   error.httpStatusCode = 400;
    //   return next(error);
    // }
    res.send('done');
  } catch (err) {
    console.log(err);
  }
});

router.get('/download', (req, res, next) => {
  console.log('download', __dirname);
  // const file = `${__dirname}/../uploads/`;
  const filePath = `${__dirname}/../uploads/`;
  console.log('filePath', filePath);
  fs.readdir(
    filePath,
    function (err, files) {
      if (err) {
        res.status(500).send({
          message: 'Unable to scan files!'
        });
      }

      let fileInfos = [];

      files.forEach((file) => {
        fileInfos.push({
          name: file,
          url: 'http://elice.iptime.org:8080/test/download/' + file
        });
      });

      res.status(200).send(fileInfos);
    }
    // res.download(file);
  );
});

router.get('/download/:name', (req, res, next) => {
  const { name } = req.params;
  console.log('imageName', name);
  const filePath = `${__dirname}/../uploads/`;
  console.log('filePath', filePath);
  res.download(filePath + name, name, (err) => {
    if (err) {
      console.log('err', err);
    } else {
      console.log('success');
    }
  });
});

router.get('/', (req, res, next) => {
  res.send('test');
});

module.exports = router;
