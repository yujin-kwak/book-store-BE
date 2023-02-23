const express = require('express');
const router = express.Router();
const BookService = require('../services/bookService');
const BookModel = require('../models/schemas/book');
const asyncHandler = require('../utils/asyncHandler');
const multer = require('multer');
const { route } = require('./orderRoute');
const apiUrl = 'http://elice.iptime.org:8080/';
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'bookImages/');
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage, limits: { fileSize: 1000000 } });

router.post('/', upload.single('file'), async (req, res, next) => {
  try {
    const { title, author, category, price, salePrice, score, quantity, condition, publishedDate, publisher } = req.body;
    const image = req.file;
    const imageUrl = apiUrl + 'books/image/' + image.filename;
    if (!title || !author || !category || !imageUrl || !price || !salePrice || !score || !quantity || !condition || !publishedDate || !publisher)
      throw new Error('Contents is missing, check elemnts ');

    const book = await BookService.createBook({ title, author, category, imageUrl, price, salePrice, score, quantity, condition, publishedDate, publisher });
    console.log(book);
    res.json({ result: 'completed', book: book });
  } catch (err) {
    console.log(err);
  }
});

router.get(
  '/',
  asyncHandler(async (req, res) => {
    console.log('read', req.body);
    const result = await BookService.readBook();

    res.json(result);
  })
);

router.get('/image/:name', (req, res, next) => {
  const { name } = req.params;
  console.log('imageName', name);
  const filePath = `${__dirname}/../bookImages/`;
  console.log('filePath', filePath);
  res.download(filePath + name, name, (err) => {
    if (err) {
      console.log('err', err);
    } else {
      console.log('success');
    }
  });
});

router.put(
  '/',
  upload.single('file'),
  asyncHandler(async (req, res) => {
    const { bookID: id } = req.query;
    const { title, author, category, price, salePrice, score, quantity, condition, publishedDate, publisher } = req.body;
    console.log(req.body);
    const image = req.file;
    console.log('image', image);
    const imageUrl = apiUrl + 'book/image/' + image.filename;
    if (!id || !title || !author || !category || !price || !imageUrl || !salePrice || !score || !quantity || !condition || !publishedDate || !publisher) throw new Error('Content is missing');
    const book = await BookService.updateBook({ id, title, author, category, imageUrl, price, salePrice, score, quantity, condition, publishedDate, publisher });
    res.json({ result: 'completed', book });
  })
);

router.delete(
  '/',
  asyncHandler(async (req, res) => {
    const { bookID: id } = req.query;
    if (!id) throw new Error('Params(/:id) is missing');
    const result = await BookService.deleteBook(id);
    res.json({ result: `${id} is deleted` });
  })
);

router.get(
  '/readBookByCategory/:category',
  asyncHandler(async (req, res) => {
    const { category } = req.params;

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
