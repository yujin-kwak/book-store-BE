const express = require('express');
const router = express.Router();
const OrderService = require('../services/orderService');
const { randomUUID } = require('crypto');

router.post('/create', async (req, res, next) => {
  const orderId = 'order' + randomUUID().split('-')[0];

  const { userId, orderItemList, address, phone, email, totalPrice } = req.body;
  const status = 'pending';

  const orderItemIdList = orderItemList.map((order) => order.bookId);

  try {
    const savedOrder = await OrderService.createOrder({ orderId, userId, address, phone, email, totalPrice, status });
    const savedOrderItem = await OrderService.createOrderItem({ orderId, orderItemList });
    res.json({ message: 'completed', order: savedOrder, orderItem: savedOrderItem });
  } catch (err) {
    res.json({ errorMessage: err });
    console.log(err);
  }
});

router.get('/read/:id', async (req, res, next) => {
  const { id: userId } = req.params;

  try {
    const result = await OrderService.readOrder(userId);
    res.status(200).json(result);
  } catch (err) {
    res.status(404).json({ errorMessage: err });
    console.log(err);
  }
});

router.put('/update', async (req, res, next) => {
  const { _id, orderId, userId, orderItemList, address, phone, email, totalPrice } = req.body;

  try {
    await OrderService.updateOrder({ _id, orderId, userId, orderItemList, address, phone, email, totalPrice });
    res.json({ message: 'completed' });
  } catch (err) {
    res.json({ errorMessage: err });
    console.log(err);
  }
});

router.delete('/delete/:id', async (req, res, next) => {
  const { id: orderId } = req.params;

  try {
    await OrderService.deleteOrder(orderId);
    const result = await OrderService.deleteOrderItem(orderId);

    res.status(200).json(result);
  } catch (err) {
    res.status(404).json({ errorMessage: err });
    console.log(err);
  }
});

module.exports = router;
