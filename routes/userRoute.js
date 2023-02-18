const express = require('express');
const router = express.Router();
const UserModel = require('../models/schemas/user');

router.post('/create', async (req, res, next) => {
  const { name, email, password, phone, address, point } = req.body;
  const post = new UserModel({
    name,
    email,
    password,
    phone,
    address,
    point
  });

  await post
    .save()
    .then(() => {
      res.json({ result: 'completed' });
    })
    .catch((err) => {
      res.json({ errorMessage: err });
      console.log(err);
    });
});

router.get('/read', async (req, res, next) => {
  const result = await UserModel.find({});
  res.send(result);
});

router.put('/update', async (req, res, next) => {
  const { id, name, email, password, phone, address, point } = req.body;
  console.log(req.body);
  await UserModel.updateOne({ _id: id }, { name, email, password, phone, address, point })
    .then(() => {
      res.json({ result: 'completed' });
    })
    .catch((err) => {
      res.json({ errorMessage: err });
      console.log(err);
    });
});

router.delete('/delete/:id', async (req, res, next) => {
  const { id } = req.params;

  await UserModel.deleteOne({ _id: id })
    .then(() => {
      res.json({ result: 'completed' });
    })
    .catch((err) => {
      res.json({ errorMessage: err });
      console.log(err);
    });
});

module.exports = router;
