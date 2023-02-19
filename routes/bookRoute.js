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
    const { title, author, category, image, price, salePrice, score, quantity, condition, publishedDate, publisher } = req.body;

    console.log('req.fidddle', req.body);
    if (!title || !author || !category || !image || !price || !salePrice || !score || !quantity || !condition || !publishedDate || !publisher) throw new Error('Contents is missing, check elemnts ');

    const book = await BookService.createBook({ title, author, category, image, price, salePrice, score, quantity, condition, publishedDate, publisher });
    console.log(book);
    res.json({ result: 'completed', book });
  })
);

router.get(
  '/read',
  asyncHandler(async (req, res) => {
    const result = await BookService.readBook();
    console.log(result);
    res.json(result);
  })
);

// router.put('/update', upload.single(), async (req, res, next) => {
//   const { id, title, author, category, image, price, salePrice, score, quantity, condition, publishedDate, publisher } = req.body;
//   console.log(req.body);
//   if (!id || !title || !author || !category || !image || !price || !salePrice || !score || !quantity || !condition || !publishedDate || !publisher) throw new Error('Content is missing');
//   const book = await BookService.updateBook({ id, title, author, category, image, price, salePrice, score, quantity, condition, publishedDate, publisher });
//   res.json({ result: 'completed', book });
// });

router.put(
  '/update',
  upload.single(),
  asyncHandler(async (req, res) => {
    const { id, title, author, category, image, price, salePrice, score, quantity, condition, publishedDate, publisher } = req.body;
    console.log(req.body);
    if (!id || !title || !author || !category || !image || !price || !salePrice || !score || !quantity || !condition || !publishedDate || !publisher) throw new Error('Content is missing');
    const book = await BookService.updateBook({ id, title, author, category, image, price, salePrice, score, quantity, condition, publishedDate, publisher });
    res.json({ result: 'completed', book });
  })
);

router.delete(
  '/delete/:id',
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (!id) throw new Error('Params(/:id) is missing');
    const result = await BookService.deleteBook(id);
    res.json({ result: `${id} is deleted` });
  })
);

router.post(
  '/createCategory/:category',
  asyncHandler(async (req, res) => {
    const { category } = req.params;
    if (!category) throw new Error('Params(/:category) is missing');
    const result = await BookService.createCategory(category);
    res.json(result);
  })
);

router.get(
  '/readCategory',
  asyncHandler(async (req, res) => {
    const result = await BookService.readCategory();
    res.json(result);
  })
);

router.put(
  '/updateCategory/:id/:category',
  asyncHandler(async (req, res) => {
    const { id, category } = req.params;
    console.log(req.params);
    if (!id || !category) throw new Error('Params(/:id/:category) is missing');
    const result = await BookService.updateCategory(id, category);
    res.json(result);
  })
);

router.delete(
  '/deleteCategory/:id',
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (!id) throw new Error('Params(/:id) is missing');
    const result = await BookService.deleteBookByCategory(id);
    res.json(result);
  })
);

router.get(
  '/readBookByCategory/:category',
  asyncHandler(async (req, res) => {
    const { category } = req.params;
    console.log(category);
    if (!category) throw new Error('Params(/:category) is missing');
    const result = await BookService.readBookByCategory(category);
    res.json(result);
  })
);

router.get(
  '/readBookByAuthor/:author',
  asyncHandler(async (req, res) => {
    const { author } = req.params;
    if (!author) throw new Error('Params(/:author) is missing');
    const result = await BookService.readBookByAuthor(author);
    res.json(result);
  })
);

module.exports = router;
