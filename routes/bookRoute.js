const express = require('express');
const router = express.Router();
const formidable = require('formidable');
const form = new formidable.IncomingForm();
const BookService = require('../services/bookService');
const BookModel = require('../models/schemas/book');
const asyncHandler = require('../utils/asyncHandler');

// router.post('/create', async (req, res, next) => {
//   form.parse(req, async (err, fields, files) => {
//     const { title, author, category, image, price, score, quantity, condition, publishedDate, publisher } = fields;

//     if (!title) {
//       next(new Error('Title is required'));
//       return;
//     }

//     try {
//       const bookService = new BookService();
//       const book = await bookService.createBook({ title, author, category, image, price, score, quantity, condition, publishedDate, publisher });
//       res.json({ result: 'completed', book });
//     } catch (err) {
//       res.json({ errorMessage: err });
//       console.log(err);
//     }
//   });
// });

router.post(
  './create',
  asyncHandler(async (req, res) => {
    form.parse(req, async (err, fields, files) => {
      const { title, author, category, image, price, score, quantity, condition, publishedDate, publisher } = fields;
      if (!title || !author || !category || !image || !price || !condition || !publishedDate || !publisher) {
        throw new Error('Title is required');
      }

      // try {
      //   const bookService = new BookService();
      //   const book = await bookService.createBook({ title, author, category, image, price, score, quantity, condition, publishedDate, publisher });
      //   res.json({ result: 'completed', book });
      // } catch (err) {
      //   res.json({ errorMessage: err });
      //   console.log(err);
      // }
    });
  })
);

router.get('/read', async (req, res, next) => {
  const result = await BookModel.find({});
  res.send(result);
});

const formModified = new formidable.IncomingForm();
router.put('/update', async (req, res, next) => {
  formModified.parse(req, async (err, fields, files) => {
    const { id, title, author, category, image, price, score, quantity, condition, publishedDate, publisher } = fields;

    await BookModel.updateOne({ _id: id }, { title, author, category, image, price, score, quantity, condition, publishedDate, publisher })
      .then(() => {
        res.json({ result: 'completed' });
      })
      .catch((err) => {
        res.json({ errorMessage: err });
        console.log(err);
      });
  });
});

router.delete('/delete/:id', async (req, res, next) => {
  const { id } = req.params;

  await BookModel.deleteOne({ _id: id })
    .then(() => {
      res.json({ result: 'completed' });
    })
    .catch((err) => {
      res.json({ errorMessage: err });
      console.log(err);
    });
});

module.exports = router;
