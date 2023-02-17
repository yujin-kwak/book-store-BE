const express = require('express');
const router = express.Router();
const OrderService = require('../services/orderService');
const IDGenerator = require('./idGenerator');

router.post('/create', async (req, res, next) => {
  const idGenerator = new IDGenerator('order', 0);
  const orderId = await idGenerator.getID();
  const { userId, orderItems, address, phone, email, totalPrice } = req.body;
  console.log('req.boddddy: ', req.body);
  console.log('orders: ', orderItems);
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

router.get('/read', async (req, res, next) => {
  const orderService = new OrderService();
  try {
    const result = await orderService.readOrder();
    res.json(result);
  } catch (err) {
    res.json({ errorMessage: err });
    console.log(err);
  }
});

module.exports = router;
