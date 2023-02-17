const express = require('express');
const router = express.Router();
const OrderService = require('../services/orderService');
const { randomUUID } = require('crypto');

router.post('/create', async (req, res, next) => {
  const orderId = 'order' + randomUUID().split('-')[0];

  const { userId, orderItems, address, phone, email, totalPrice } = req.body;

  const status = 'pending';
  const orderService = new OrderService();
  const orderItemsIds = orderItems.map((order) => order.bookId);

  try {
    const savedOrder = await orderService.createOrder({ orderId, userId, orderItemsIds, address, phone, email, totalPrice });
    const savedOrderItem = await orderService.createOrderItem({ orderId, orderItems, status });
    res.json({ result: 'completed' });
  } catch (err) {
    res.json({ errorMessage: err });
    console.log(err);
  }
});

router.get('/read/:id', async (req, res, next) => {
  const orderService = new OrderService();
  const { id: userId } = req.params;
  console.log('userId: ', req.params);
  try {
    const result = await orderService.readOrder(userId);
    res.json(result);
  } catch (err) {
    res.json({ errorMessage: err });
    console.log(err);
  }
});

router.put('/update', async (req, res, next) => {
  const { _id, orderId, userId, orderItemsIds, address, phone, email, totalPrice, date } = req.body;
  console.log(req.body);
  const orderService = new OrderService();

  try {
    await orderService.updateOrder({ _id, orderId, userId, orderItemsIds, address, phone, email, totalPrice, date });
    res.json({ result: 'completed' });
  } catch (err) {
    res.json({ errorMessage: err });
    console.log(err);
  }
});

module.exports = router;
