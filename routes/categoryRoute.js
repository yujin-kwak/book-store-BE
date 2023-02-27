const express = require('express');
const router = express.Router();
const BookService = require('../services/bookService');
const asyncHandler = require('../utils/asyncHandler');
const { route } = require('./orderRoute');
const apiUrl = 'http://elice.iptime.org:8080/';

router.post(
  '/',
  asyncHandler(async (req, res) => {
    const { category, description } = req.query;

    if (!category) throw new Error('Params(/:category) is missing');
    const result = await BookService.createCategory(category, description);
    res.json(result);
  })
);

router.get(
  '/',
  asyncHandler(async (req, res) => {
    const result = await BookService.readCategory();
    res.json(result);
  })
);

router.put(
  '/',
  asyncHandler(async (req, res) => {
    const { categoryID: id } = req.query;
    const { category, description } = req.body;
    console.log(req.params);
    if (!id || !category) throw new Error('Params(/:id/:category) is missing');
    const result = await BookService.updateCategory(id, category,description);
    res.json({ result: result });
  })
);

router.delete(
  '/',
  asyncHandler(async (req, res) => {
    const { categoryID: id } = req.query;
    if (!id) throw new Error('Params(/:id) is missing');
    const result = await BookService.deleteCategory(id);
    res.status(200).json({ result: `${id} is deleted ${result}` });
  })
);

module.exports = router;
