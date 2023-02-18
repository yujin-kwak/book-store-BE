const express = require('express');
const router = express.Router();
// const formidable = require('formidable');
const BookService = require('../services/bookService');
const BookModel = require('../models/schemas/book');
const asyncHandler = require('../utils/asyncHandler');
const multer = require('multer');
const { route } = require('./orderRoute');
const upload = multer({ dest: 'uploads/' });

router.post(
  '/test',
  upload.single(),
  asyncHandler(async (req, res) => {
    const { title, author, category, image, price, score, quantity, condition, publishedDate, publisher } = req.body;

    if (!title || !author || !category || !image || !price || !score || !quantity || !condition || !publishedDate || !publisher) throw new Error('Contents is missing, check elemnts ');

    const book = await BookService.createBook({ title, author, category, image, price, score, quantity, condition, publishedDate, publisher });
    res.json({ result: 'completed', book });
  })
);

router.get('/read', async (req, res, next) => {
  const result = await BookModel.find({});
  res.send(result);
});

router.put('/update', upload.single(), async (req, res, next) => {
  const { id, title, author, category, image, price, score, quantity, condition, publishedDate, publisher } = req.body;
  console.log(req.body);
  if (!id || !title || !author || !category || !image || !price || !score || !quantity || !condition || !publishedDate || !publisher) throw new Error('Content is missing');

  const book = await BookService.updateBook({ id, title, author, category, image, price, score, quantity, condition, publishedDate, publisher });
  res.json({ result: 'completed', book });
});

router.delete(
  '/delete/:id',
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (!id) throw new Error('Params(/:id) is missing');
    const result = await BookService.deleteBook(id);
    res.json({ result: `${id} is deleted` });
  })
);

// router.post('/test', upload.single(), (req, res) => {
//   console.log(req.body.author);
//   res.send('test');
// });

// router.delete('/delete/:id', async (req, res, next) => {
//   const { id } = req.params;

//   await BookModel.deleteOne({ _id: id })
//     .then(() => {
//       res.json({ result: 'completed' });
//     })
//     .catch((err) => {
//       res.json({ errorMessage: err });
//       console.log(err);
//     });
// });

// router.post(
//   '/create',
//   upload.single(),
//   asyncHandler(async (req, res) => {
//     const form = new formidable.IncomingForm();
//     const fields = form.parse(req, async (err, fields, files) => {
//       return fields;
//     });
//     console.log('sdfsflsjflsjflsd;', req.body);
//     const { title, author, category, image, price, score, quantity, condition, publishedDate, publisher } = fields;
//     console.log(title);

//     if (!title || !author || !category || !image || !price || !score || !quantity || !condition || !publishedDate || !publisher) throw new Error('Contents is missing, check elemnts ');

//     const bookService = new BookService();
//     const book = await bookService.createBook({ title, author, category, image, price, score, quantity, condition, publishedDate, publisher });
//     res.json({ result: 'completed', book });
//   })
// );

module.exports = router;
