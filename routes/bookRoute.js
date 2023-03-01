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

const getUserFromJWT = require('../middlewares/getUserFromJWT');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'bookImages/');
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage, limits: { fileSize: 1000000 } });

router.post('/', getUserFromJWT, upload.single('file'), async (req, res, next) => {
  try {
    console.log('req.decodedpatch', req.decoded);
    const { id, role } = req.decoded;
    if (!id) throw new Error('Missing required fields or you are not user approved');
    if (role !== 'admin') throw new Error('You are not admin');
    const { title, author, category, price, salePrice, score, stock, condition, publishedDate, publisher } = req.body;
    const image = req.file;
    console.log('image', image);
    // formdata로 받은 image를 file로 저장
    const imageUrl = apiUrl + 'books/image/' + image.filename;
    if (!title || !author || !category || !imageUrl || !price || !salePrice || !score || !stock || !condition || !publishedDate || !publisher) throw new Error('Contents is missing, check elemnts ');

    const book = await BookService.createBook({ title, author, category, imageUrl, price, salePrice, score, stock, condition, publishedDate, publisher });
    console.log(book);
    res.json({ result: 'completed', book: book });
  } catch (err) {
    console.log(err);
  }
});

router.get(
  '/',
  asyncHandler(async (req, res) => {
    const { bookID } = req.query;
    console.log('bookID', bookID);
    const result = await BookService.readBookById(bookID);

    res.json(result);
  })
);

router.get(
  '/all',
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
  getUserFromJWT,
  upload.single('file'),

  asyncHandler(async (req, res) => {
    console.log('req.decodedpatch', req.decoded);
    const { id, role } = req.decoded;
    if (!id) throw new Error('Missing required fields or you are not user approved');
    if (role !== 'admin') throw new Error('You are not admin');
    const { bookID } = req.query;
    console.log('bookID', bookID);
    const { title, author, category, price, salePrice, score, stock, condition, publishedDate, publisher } = req.body;
    console.log(req.body);
    const image = req.file;
    console.log('image', image);
    if (image) {
      const imageUrl = apiUrl + 'book/image/' + image.filename;
      const book = await BookService.updateBook({ bookID, title, author, category, imageUrl, price, salePrice, score, stock, condition, publishedDate, publisher });
    }
    // if (!id || !title || !author || !category || !price || !salePrice || !score || !stock || !condition || !publishedDate || !publisher) throw new Error('Content is missing');
    const book = await BookService.updateBook({ bookID, title, author, category, price, salePrice, score, stock, condition, publishedDate, publisher });
    res.json({ result: 'completed', book: book });
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
  '/bookCategory',
  asyncHandler(async (req, res) => {
    const { category, page, perPage, sortedBy } = req.query;

    if (!category) throw new Error('Params category is missing');
    if (!page) throw new Error('Params page is missing');
    if (!perPage) throw new Error('Params perPage is missing');
    if (!sortedBy) throw new Error('Params perPage is missing');
    console.log(sortedBy);
    const result = await BookService.readBookPerPage(page, perPage, category, sortedBy);

    res.json(result);
  })
);

router.get(
  '/countBookByCategory/',
  asyncHandler(async (req, res) => {
    const { category } = req.query;
    console.log('readBookboodsddsddskbook', req.query);

    if (!category) throw new Error('Params category is missing');
    const count = await BookService.countBookByCategory(category);
    res.json(count);
  })
);

router.get(
  '/:author',
  asyncHandler(async (req, res) => {
    const { author } = req.params;
    if (!author) throw new Error('Params(/:author) is missing');
    const result = await BookService.readBookByAuthor(author);
    res.json(result);
  })
);

router.get(
  '/:category/:sort',
  asyncHandler(async (req, res) => {
    const { category, sort } = req.params;
    console.log('category', category, sort);
    if (!category || !sort) throw new Error('Params(/:category/:score) is missing');
    const result = await BookService.readBookByCategory(category, sort);
    res.json(result);
  })
);

module.exports = router;
