const express = require('express');
const router = express.Router();
const UserService = require('../services/userService');
const asyncHandler = require('../utils/asyncHandler');
const hashPassword = require('../utils/hashPassword');
const passport = require('passport');
const OrderService = require('../services/orderService');
router.post(
  '/',
  asyncHandler(async (req, res) => {
    const { name, email, password, phone, address } = req.body;
    if (!name || !email || !password || !phone || !address) throw new Error('Missing required fields');

    const result = await UserService.createUser({ name, email, password, phone, address });
    res.status(200).json(result);
  })
);

router.get(
  '/',
  asyncHandler(async (req, res) => {
    const result = await UserService.readUser();
    res.status(200).json(result);
  })
);

router.patch(
  '/',
  asyncHandler(async (req, res) => {
    const { userID: id } = req.query;
    const { name, password, phone, address } = req.body;
    if (!id || !name || !password || !phone || !address) throw new Error('Missing required fields');

    const result = await UserService.updateUser({ id, name, password, phone, address });
    res.status(200).json(result);
  })
);

router.delete(
  '/',
  asyncHandler(async (req, res) => {
    const { userID: id } = req.query;
    if (!id) throw new Error('Missing required fields');
    const result = await UserService.deleteUser(id);
    res.status(200).json(result);
  })
);

router.get(
  '/orders',
  asyncHandler(async (req, res) => {
    const { userID: id } = req.query;
    if (!id) throw new Error('Missing required fields');
    const result = await OrderService.readOrderByUser(id);
    res.status(200).json(result);
  })
);

module.exports = router;
