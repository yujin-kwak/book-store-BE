const express = require('express');
const router = express.Router();
// const formidable = require('formidable');
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

// router.post(
//   '/create',
//   upload.single('image'),
//   asyncHandler(async (req, res) => {
//     const { title, author, category, image, price, salePrice, score, quantity, condition, publishedDate, publisher } = req.body;
//     const { file } = req.file;

//     if (!title || !author || !category || !image || !price || !salePrice || !score || !quantity || !condition || !publishedDate || !publisher) throw new Error('Contents is missing, check elemnts ');

//     const book = await BookService.createBook({ title, author, category, image, price, salePrice, score, quantity, condition, publishedDate, publisher });

//     res.json({ result: 'completed', book });
//   })
// );

// router.post(
//   '/create',
//   upload.single('image'),
//   asyncHandler(async (req, res) => {
//     const { title, author, category, price, salePrice, score, quantity, condition, publishedDate, publisher } = req.body;
//     const { file } = req.file;
//     console.log('file123', file);
//     console.log('req.body', req.body);

//     // const imageUrl = apiUrl + 'book/image/' + file.filename;
//     // console.log('imageUrl', imageUrl);

//     if (!title || !author || !category || !image || !price || !salePrice || !score || !quantity || !condition || !publishedDate || !publisher) throw new Error('Contents is missing, check elemnts ');

//     const book = await BookService.createBook({ title, author, category, image, price, salePrice, score, quantity, condition, publishedDate, publisher });

//     res.json({ result: 'completed', book });
//   })
// );

router.post('/create', upload.single('image'), (req, res, next) => {
  try {
    const { title, author, category, price, salePrice, score, quantity, condition, publishedDate, publisher } = req.body;
    const { file } = req.file;
    console.log('file123', file);
    console.log('req.body', req.body);

    // const imageUrl = apiUrl + 'book/image/' + file.filename;
    // console.log('imageUrl', imageUrl);

    if (!title || !author || !category || !image || !price || !salePrice || !score || !quantity || !condition || !publishedDate || !publisher) throw new Error('Contents is missing, check elemnts ');

    const book = BookService.createBook({ title, author, category, image, price, salePrice, score, quantity, condition, publishedDate, publisher });

    res.json({ result: 'completed', book });
  } catch (err) {
    console.log(err);
  }
});

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

router.get(
  '/read',
  asyncHandler(async (req, res) => {
    const result = await BookService.readBook();

    res.json(result);
  })
);

router.get(
  '/read/:id',
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const result = await BookService.readBookById(id);

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
  '/createCategory/:category/:description',
  asyncHandler(async (req, res) => {
    console.log(req.params);
    const { category, description } = req.params;

    if (!category) throw new Error('Params(/:category) is missing');
    const result = await BookService.createCategory(category, description);
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
    res.status(200).json({ result: `${id} is deleted ${result}` });
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
