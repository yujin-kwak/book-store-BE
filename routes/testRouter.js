const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/');
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
//   }
// });

// const upload = multer({ storage: storage });

const upload = multer({ dest: 'imgStorage/' });

router.post('/upload', upload.single('image'), (req, res, next) => {
  try {
    console.log('dirname', path.dirname(__dirname));

    const { title, image } = req.body;
    console.log('image', image);
    if (!req.body) {
      const error = new Error('Please upload a file');
      error.httpStatusCode = 400;
      return next(error);
    }
    res.send(req.body);
  } catch (err) {
    console.log(err);
  }
});

router.get('/download', (req, res, next) => {
  const file = `${__dirname}/uploads/sample.pdf`;
  res.download(file);
});

router.get('/', (req, res, next) => {
  res.send('test');
});

module.exports = router;
