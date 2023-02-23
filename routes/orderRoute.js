const express = require('express');
const router = express.Router();
const OrderService = require('../services/orderService');
const { randomUUID } = require('crypto');
const asyncHandler = require('../utils/asyncHandler');
const getUserFromJWT = require('../middlewares/getUserFromJWT');

// it will create order and orderItem
router.post('/', async (req, res, next) => {
  const { userID, userName, email, orderItemList, address, phone, totalPrice } = req.body;
  const status = '주문확인중';

  try {
    const savedOrder = await OrderService.createOrder({ userID, userName, email, address, phone, totalPrice, status });
    const orderID = savedOrder._id;

    const savedOrderItem = await OrderService.createOrderItem(orderID, orderItemList);
    res.json({ message: 'completed', order: savedOrder, orderItem: savedOrderItem });
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

router.get('/:orderID', async (req, res, next) => {
  const { orderID } = req.params;

  try {
    const result = await OrderService.readOrder(orderID);
    res.status(200).json({ result: result });
  } catch (err) {
    res.status(404).json({ errorMessage: err });
    console.log(err);
  }
});

router.get('/noMemberOrder', async (req, res, next) => {
  const { orderId } = req.query;
  const result = await OrderService.readNomemberOrder(orderId);
  res.status(200).json(result);
});

// it will update order only
router.put('/', async (req, res, next) => {
  const { orderID: id } = req.query;

  const { userID, userName, email, address, phone, totalPrice, status } = req.body;
  try {
    const result = await OrderService.updateOrder({ id, userID, userName, email, address, phone, totalPrice, status });
    res.json({ messsage: 'completed', order: result });
  } catch (err) {
    res.json({ errorMessage: err });
    console.log(err);
  }
});

// it will delete order and orderItem
router.delete('/', async (req, res, next) => {
  const { orderID: id } = req.query;
  try {
    const result = await OrderService.deleteOrder(id);
    res.status(200).json(result);
  } catch (err) {
    res.status(404).json({ errorMessage: err });
    console.log(err);
  }
});

// it will bring orderItem only
// router.get(
//   '/items',
//   asyncHandler(async (req, res) => {
//     console.log('req.query: ', req.quer);
//     const { orderID } = req.query;

//     const result = await OrderService.readItem(orderID);
//     res.status(200).json(result);
//   })
// );

router.get(
  '/items',
  asyncHandler(async (req, res) => {
    const { orderID } = req.query;
    const result = await OrderService.readItem(orderID);
    res.status(200).json(result);
  })
);

// it will update orderItem only
router.put(
  '/items',
  asyncHandler(async (req, res) => {
    const { orderID } = req.params;
    const { bookID, bookTitle, quantity, salePrice } = req.body;
    const result = await OrderService.updateItem({ orderID, bookID, bookTitle, quantity, salePrice });
    res.status(200).json({ message: 'completed', order: result });
  })
);

//it will delete orderItem only
router.delete(
  '/items',
  asyncHandler(async (req, res) => {
    const { orderID } = req.query;
    const result = await OrderService.deleteItem(orderID);
    res.status(200).json({ message: 'deleted', order: result });
  })
);

module.exports = router;
