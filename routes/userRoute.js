const express = require('express');
const router = express.Router();
const UserService = require('../services/userService');
const asyncHandler = require('../utils/asyncHandler');
const hashPassword = require('../utils/hashPassword');
const passport = require('passport');

router.post(
  '/create',
  asyncHandler(async (req, res) => {
    const { name, userId, password, phone, address } = req.body;
    if (!name || !userId || !password || !phone || !address) throw new Error('Missing required fields');

    const user = await UserService.createUser({ name, userId, password, phone, address });
    res.status(200).json(user);
  })
);

router.get(
  '/read',
  asyncHandler(async (req, res) => {
    const result = await UserService.readUser();
    res.status(200).json(result);
  })
);

router.put(
  '/update',
  asyncHandler(async (req, res) => {
    const { id, name, userId, password, phone, address } = req.body;
    if (!id || !name || !userId || !password || !phone || !address) throw new Error('Missing required fields');

    const result = await UserService.updateUser({ id, name, userId, password, phone, address });
    res.status(200).json(result);
  })
);

router.delete(
  '/delete/:id',
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (!id) throw new Error('Missing required fields');
    const result = await UserService.deleteUser(id);
    res.status(200).json(result);
  })
);

module.exports = router;
