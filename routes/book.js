const express = require('express');
const router = express.Router();
const BookModel = require('../models/schemas/book');
const formidable = require('formidable');

const form = new formidable.IncomingForm();

router.post('/create', (req, res, next) => {
  form.parse(req, async (err, fields, files) => {
    const { title, author, category, image, price, score, quantity, condition, publishedDate, publisher } = fields;

    const post = new BookModel({
      title,
      author,
      category,
      image,
      price,
      score,
      quantity,
      condition,
      publishedDate,
      publisher
    });
    await post.save().then(() => {
      res.json({ a: 'done' });
    });
  });
});

module.exports = router;

router.get('/read', async (req, res, next) => {
  const result = await BookModel.find({});
  res.send(result);
});
