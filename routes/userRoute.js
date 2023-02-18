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

// const express = require('express');
// const router = express.Router();
// const UserModel = require('../models/schemas/user');

// router.post('/create', async (req, res, next) => {
//   const { name, email, password, phone, address, point } = req.body;
//   const post = new UserModel({
//     name,
//     email,
//     password,
//     phone,
//     address,
//     point
//   });

//   await post
//     .save()
//     .then(() => {
//       res.json({ result: 'completed' });
//     })
//     .catch((err) => {
//       res.json({ errorMessage: err });
//       console.log(err);
//     });
// });

// router.get('/read', async (req, res, next) => {
//   const result = await UserModel.find({});
//   res.send(result);
// });

// router.put('/update', async (req, res, next) => {
//   const { id, name, email, password, phone, address, point } = req.body;
//   console.log(req.body);
//   await UserModel.updateOne({ _id: id }, { name, email, password, phone, address, point })
//     .then(() => {
//       res.json({ result: 'completed' });
//     })
//     .catch((err) => {
//       res.json({ errorMessage: err });
//       console.log(err);
//     });
// });

// router.delete('/delete/:id', async (req, res, next) => {
//   const { id } = req.params;

//   await UserModel.deleteOne({ _id: id })
//     .then(() => {
//       res.json({ result: 'completed' });
//     })
//     .catch((err) => {
//       res.json({ errorMessage: err });
//       console.log(err);
//     });
// });

// module.exports = router;
