const express = require('express');
const router = express.Router();
const OrderService = require('../services/orderService');
const { randomUUID } = require('crypto');
const asyncHandler = require('../utils/asyncHandler');
const getUserFromJWT = require('../middlewares/getUserFromJWT');

// it will create order and orderItem
router.post('/create', getUserFromJWT, async (req, res, next) => {
  console.log('req.decodedbyJwt', req.decoded);
  const orderId = 'order' + randomUUID().split('-')[0];
  // userDBId should be removed!!!!!!
  const { userDbId, userName, email, orderItemList, address, phone, totalPrice } = req.body;
  const status = '주문확인중';

  try {
    const savedOrder = await OrderService.createOrder({ orderId, userDbId, userName, email, address, phone, totalPrice, status });
    const savedOrderItem = await OrderService.createOrderItem(orderId, orderItemList);
    res.json({ message: 'completed', order: savedOrder, orderItem: savedOrderItem });
    console.log('savedOrder', savedOrderItem);
  } catch (err) {
    res.json({ errorMessage: err });
    console.log(err);
  }
});

router.get('/', async (req, res, next) => {
  try {
    const result = await OrderService.readAllorder();

    res.status(200).json(result);
  } catch (err) {
    res.status(404).json({ errorMessage: err });
    console.log(err);
  }
});

// it will bring order and orderItem

router.get('/read', async (req, res, next) => {
  let command = req.query;
  console.log('command', Object.keys(command)[0]);
  console.log('command', command);
  try {
    const result = await OrderService.readOrder(command);
    console.log('read/id', result);
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
  const { _id, orderId, userDbId, userName, email, address, phone, totalPrice, status } = req.body;

  try {
    const result = await OrderService.updateOrder({ _id, orderId, userDbId, userName, email, address, phone, totalPrice, status });
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
  getUserFromJWT,
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
