const express = require('express');
const router = express.Router();
// const formidable = require('formidable');
const BookService = require('../services/bookService');
const BookModel = require('../models/schemas/book');
const asyncHandler = require('../utils/asyncHandler');
const multer = require('multer');
const { route } = require('./orderRoute');
const upload = multer({ dest: './imgStorage' });

router.post(
  '/create',
  upload.single(),
  asyncHandler(async (req, res) => {
    const { title, author, category, image, price, score, quantity, condition, publishedDate, publisher } = req.body;

    console.log('req.fidddle', req.file);
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

module.exports = router;
