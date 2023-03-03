const express = require('express');
const router = express.Router();
const UserService = require('../services/userService');
const asyncHandler = require('../utils/asyncHandler');
const hashPassword = require('../utils/hashPassword');
const passport = require('passport');
const OrderService = require('../services/orderService');
const getUserFromJWT = require('../middlewares/getUserFromJWT');

// checked
router.post(
  '/',
  asyncHandler(async (req, res) => {
    const { name, email, password, phone, address, role } = req.body;
    console.log('req.body_post', req.body);
    if (!name || !email || !password || !phone || !address || !role) throw new Error('Missing required fields');
    const result = await UserService.createUser({ name, email, password, phone, address, role });
    console.log('result', result);
    res.status(200).json(result);
  })
);
// checked
router.get(
  '/',
  getUserFromJWT,
  asyncHandler(async (req, res) => {
    console.log('req.decoded', req.decoded);
    const { id, role } = req.decoded;
    if (!id) throw new Error('Missing required fields: id or you are not admin');
    if (role !== 'admin') throw new Error('You are not admin');
    const result = await UserService.readUser();
    res.status(200).json(result);
  })
);
// checked
router.get(
  '/user/:userID',
  getUserFromJWT,
  asyncHandler(async (req, res) => {
    console.log('req.decoded', req.decoded);
    const { userID } = req.params;
    const { id, role } = req.decoded;
    if (!id) throw new Error('Missing required fields: id or you are not admin');
    if (role !== 'admin') throw new Error('You are not admin');
    const result = await UserService.readUserById(userID);
    res.status(200).json(result);
  })
);

// checked
router.get(
  '/mydetail',
  getUserFromJWT,
  asyncHandler(async (req, res) => {
    console.log('req.decoded', req.decoded);
    const { id, role } = req.decoded;
    if (!id) throw new Error('Missing required fields or you are not user approved');
    const result = await UserService.readUserById(id);
    res.status(200).json(result);
  })
);
// checked
router.put(
  '/user/:userID',
  getUserFromJWT,
  asyncHandler(async (req, res) => {
    console.log('req.decodedpatch', req.decoded);
    const { id, role } = req.decoded;
    const { userID } = req.params;
    console.log('userIDDDD', userID);
    if (!id) throw new Error('Missing required fields or you are not user approved');
    if (role !== 'admin') throw new Error('You are not admin');
    const { name, password, phone, address, role: userRole } = req.body;

    if (!userID || !name || !password || !phone || !address || !userRole) throw new Error('Missing required fields');
    const result = await UserService.updateUser({ userID, name, password, phone, address, userRole });
    console.log('result', result);
    res.status(200).json(result);
  })
);

router.delete(
  '/user/:userID',
  getUserFromJWT,
  asyncHandler(async (req, res) => {
    console.log('req.decoded', req.decoded);
    const { id, role } = req.decoded;
    const { userID } = req.params;
    if (!id) throw new Error('Missing required fields or you are not user approved');
    if (!id) throw new Error('Missing required fields');
    const result = await UserService.deleteUser(userID);
    res.status(200).json(result);
  })
);

// checked
router.put(
  '/mydetail',
  getUserFromJWT,
  asyncHandler(async (req, res) => {
    console.log('req.decoded', req.decoded);
    const { id, role } = req.decoded;
    if (!id) throw new Error('Missing required fields or you are not user approved');
    const { name, password, phone, address } = req.body;
    console.log(req.body);
    if (!id || !name || !phone || !address) throw new Error('Missing required fields!!!');
    const result = await UserService.updateUser({ userID: id, name, password, phone, address, role });
    res.status(200).json(result);
  })
);

router.put(
  '/mydetail/password',
  getUserFromJWT,
  asyncHandler(async (req, res) => {
    console.log('req.decoded', req.decoded);
    const { id: userID, role } = req.decoded;
    if (!userID) throw new Error('Missing required fields or you are not user approved');
    const { currentPassword, newPassword } = req.body;
    console.log('fda.xljvlxcvj', req.body);
    if (!currentPassword || !newPassword) throw new Error('Missing required fields!!!');
    const result = await UserService.updateUserPassword({ userID, currentPassword, newPassword });
    res.status(200).json(result);
  })
);

router.delete(
  '/mydetail',
  getUserFromJWT,
  asyncHandler(async (req, res) => {
    console.log('req.decoded', req.decoded);
    const { id, role } = req.decoded;
    if (!id) throw new Error('Missing required fields or you are not user approved');
    if (!id) throw new Error('Missing required fields');
    const result = await UserService.deleteUser(id);
    res.status(200).json(result);
  })
);

router.get(
  '/mydetail/orders',
  getUserFromJWT,
  asyncHandler(async (req, res) => {
    console.log('req.decoded on users/orders', req.decoded);
    const { id: userID, role } = req.decoded;

    if (!userID) throw new Error('Missing required fields or you are not user approved');

    if (!userID) throw new Error('Missing required fields');

    const result = await OrderService.readOrderByUser(userID);
    console.log('result', result);
    res.status(200).json(result);
  })
);

router.get(
  '/orders',
  getUserFromJWT,
  asyncHandler(async (req, res) => {
    console.log('req.decoded on users/orders', req.decoded);
    const { id, role } = req.decoded;
    const { userID } = req.query;
    if (!id) throw new Error('Missing required fields or you are not user approved');

    if (!id) throw new Error('Missing required fields');

    const result = await OrderService.readOrderByUser(userID);
    console.log('result', result);
    res.status(200).json(result);
  })
);

module.exports = router;
