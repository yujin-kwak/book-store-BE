const express = require('express');
const router = express.Router();
const OrderService = require('../services/orderService');
const { randomUUID } = require('crypto');
const asyncHandler = require('../utils/asyncHandler');

// it will create order and orderItem
router.post('/create', async (req, res, next) => {
  const orderId = 'order' + randomUUID().split('-')[0];

  const { userDbId, userName, orderItemList, address, phone, totalPrice } = req.body;
  const status = 'pending';
  console.log('userDbId', userDbId);
  try {
    const savedOrder = await OrderService.createOrder({ orderId, userDbId, userName, address, phone, totalPrice, status });
    const savedOrderItem = await OrderService.createOrderItem(orderId, orderItemList);
    res.json({ message: 'completed', order: savedOrder, orderItem: savedOrderItem });
  } catch (err) {
    res.json({ errorMessage: err });
    console.log(err);
  }
});

router.get('/readAll', async (req, res, next) => {
  try {
    const result = await OrderService.readAllorder();
    console.log('readAllresult', result);
    res.status(200).json(result);
  } catch (err) {
    res.status(404).json({ errorMessage: err });
    console.log(err);
  }
});

// it will bring order and orderItem
router.get('/read/:id', async (req, res, next) => {
  const { id: userDbId } = req.params;

  try {
    const result = await OrderService.readOrder(userDbId);
    res.status(200).json({ result: result });
  } catch (err) {
    res.status(404).json({ errorMessage: err });
    console.log(err);
  }
});

router.get('/readNomemberOrder/:orderId', async (req, res, next) => {
  const { orderId } = req.params;
  const result = await OrderService.readNomemberOrder(orderId);
  res.status(200).json(result);
});

// it will update order only
router.put('/update', async (req, res, next) => {
  const { _id, orderId, userDbId, userName, address, phone, totalPrice, status } = req.body;

  try {
    const result = await OrderService.updateOrder({ _id, orderId, userDbId, userName, address, phone, totalPrice, status });
    res.json({ message: 'completed', order: result });
  } catch (err) {
    res.json({ errorMessage: err });
    console.log(err);
  }
});

// it will delete order and orderItem
router.delete('/delete/:id', async (req, res, next) => {
  const { id: orderId } = req.params;

  try {
    const result = await OrderService.deleteOrder(orderId);

    res.status(200).json(result);
  } catch (err) {
    res.status(404).json({ errorMessage: err });
    console.log(err);
  }
});

// it will bring orderItem only
router.get(
  '/readItem/:orderId',
  asyncHandler(async (req, res) => {
    const { orderId } = req.params;
    const result = await OrderService.readItem(orderId);
    res.status(200).json(result);
  })
);

// it will update orderItem only
router.put(
  '/updateItem',
  asyncHandler(async (req, res) => {
    console.log(req.body);
    const { _id, orderId, bookDbId, bookTitle, quantity, salePrice } = req.body;
    const result = await OrderService.updateItem({ _id, orderId, bookDbId, bookTitle, quantity, salePrice });
    res.status(200).json({ message: 'completed', order: result });
  })
);

//it will delete orderItem only
router.delete(
  '/deleteItem/:id',
  asyncHandler(async (req, res) => {
    const { _id } = req.params;
    const result = await OrderService.deleteItem(_id);
    res.status(200).json({ message: 'deleted', order: result });
  })
);

module.exports = router;
