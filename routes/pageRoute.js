const express = require('express');
const router = express.Router();
const asyncHandler = require('../utils/asyncHandler');
const BookService = require('../services/bookService');

router.get(
  '/',
  asyncHandler(async (req, res) => {
    const page = Number(req.query.page || 1);
    const perPage = Number(req.query.perPage || 3);
    if (page < 1) throw new Error('Page should be greater than 0');

    const [count, displayPage] = await Promise.all([BookService.countBook(), BookService.readBookPerPage(page, perPage)]);
    const total = Math.ceil(count / perPage);
    res.json({ total, displayPage });

    // const total = await BookService.countBooks();
    // const displayPage = await BookService.readBooks().sort({ createdAt: -1 }).skip((page - 1) * perPage).limit(perPage);
  })
);

module.exports = router;
