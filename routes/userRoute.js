const express = require('express');
router = express.Router();
UserService = require('../services/userService');
asyncHandler = require('../utils/asyncHandler');

router.post(
  '/create',
  asyncHandler(async (req, res) => {
    const { name, email, password, phone, address, point } = req.body;
    if (!name || !email || !password || !phone || !address || !point) throw new Error('Missing required fields');
    const user = await UserService.createUser({ name, email, password, phone, address, point });
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
    const { id, name, email, password, phone, address, point } = req.body;
    if (!id || !name || !email || !password || !phone || !address || !point) throw new Error('Missing required fields');

    const result = await UserService.updateUser({ id, name, email, password, phone, address, point });
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
