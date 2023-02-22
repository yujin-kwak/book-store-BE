const express = require('express');
const router = express.Router();
const UserService = require('../services/userService');
const asyncHandler = require('../utils/asyncHandler');
const hashPassword = require('../utils/hashPassword');
const passport = require('passport');

router.post(
  '/create',
  asyncHandler(async (req, res) => {
    const { name, email, password, phone, address } = req.body;
    if (!name || !email || !password || !phone || !address) throw new Error('Missing required fields');

    const result = await UserService.createUser({ name, email, password, phone, address });
    res.status(200).json(result);
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
    const { id, name, email, password, phone, address } = req.body;
    if (!id || !name || !email || !password || !phone || !address) throw new Error('Missing required fields');

    const result = await UserService.updateUser({ id, name, email, password, phone, address });
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
