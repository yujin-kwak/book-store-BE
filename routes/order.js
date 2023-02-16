const express = require('express');
const router = express.Router();
const OrderService = require('../services/orderService');
const IDGenerator = require('./idGenerator');

router.post('/create', async (req, res, next) => {
  console.log(req.body);
  const idGenerator = new IDGenerator('order', 0);
  const orderId = await idGenerator.getID();
  const { userName, orderItems, address, phone, email, totalPrice } = req.body;
  const orderService = new OrderService({
    orderId,
    userName,
    orderItems,
    address,
    phone,
    email,
    totalPrice
  });

  try {
    const savedOrder = await orderService.createOrder();
    res.json({ result: 'completed' });
  } catch (err) {
    res.json({ errorMessage: err });
    console.log(err);
  }

  try {
    const savedOrderItem = await orderService.createOrderItem();
    res.json({ result: 'completed' });
  } catch (err) {
    res.json({ errorMessage: err });
    console.log(err);
  }

  // const savedOrder = await order.save();
  // savedOrder.then(() => {
  //   res.json({ result: 'completed' });
  // });
  // const savedOrder = await order.save()

  // const post1 = new OrderItemModel({
  //     OrderId: savedOrder._id,

  //   })
});

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

module.exports = router;
