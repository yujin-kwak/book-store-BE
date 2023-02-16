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

router.get('/read', async (req, res, next) => {
  const result = await BookModel.find({});
  res.send(result);
});

const formModified = new formidable.IncomingForm();
router.put('/update', async (req, res, next) => {
  formModified.parse(req, async (err, fields, files) => {
    const { id, title, author, category, image, price, score, quantity, condition, publishedDate, publisher } = fields;
    console.log(fields);
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
  console.log(id);
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
