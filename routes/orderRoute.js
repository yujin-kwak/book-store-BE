const express = require('express');
const router = express.Router();
const OrderService = require('../services/orderService');
const { randomUUID } = require('crypto');
const asyncHandler = require('../utils/asyncHandler');
const getUserFromJWT = require('../middlewares/getUserFromJWT');

// it will create order and orderItem
router.post('/', getUserFromJWT, async (req, res, next) => {
  try {
    const { userName, email, orderItemList, address, phone, totalPrice } = req.body;
    const status = '주문확인중';
    const userID = req.decoded.id;
    const userRole = req.decoded.role;
    console.log('userID', userID);
    console.log('userRole', userRole);
    const savedOrder = await OrderService.createOrder({ userID, userName, email, address, phone, totalPrice, status });
    const orderID = savedOrder._id;
    const savedOrderItem = await OrderService.createOrderItem(orderID, orderItemList);
    res.json({ message: 'completed', order: savedOrder, orderItem: savedOrderItem });
  } catch (err) {
    res.json({ errorMessage: err });
    console.log(err);
  }
});

router.post('/noMemberOrder', async (req, res, next) => {
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

router.get('/', getUserFromJWT, async (req, res, next) => {
  try {
    console.log('req.decoded', req.decoded);
    const { id, role } = req.decoded;
    if (!id) throw new Error('Missing required fields: id or you are not admin');
    if (role !== 'admin') throw new Error('You are not admin');

    const result = await OrderService.readAllorder();
    res.status(200).json(result);
  } catch (err) {
    res.status(404).json({ errorMessage: err });
    console.log(err);
  }
});

// it will bring order and orderItem

router.get('/:orderID', getUserFromJWT, async (req, res, next) => {
  const { orderID } = req.params;
  try {
    const result = await OrderService.readOrder(orderID);
    res.status(200).json({ result: result });
  } catch (err) {
    res.status(404).json({ errorMessage: err });
    console.log(err);
  }
});

router.get('/noMemberOrder/:orderID', async (req, res, next) => {
  const { orderID } = req.params;
  console.log('orderID no member', orderID);
  const result = await OrderService.readNomemberOrder(orderID);
  console.log('result', result);
  res.status(200).json(result);
});

// ********** 2021-08-04  order result return xx **********
// it will update order only
router.put('/', getUserFromJWT, async (req, res, next) => {
  try {
    console.log('req.decoded', req.decoded);

    const { id: userID, role } = req.decoded;

    const { orderID: id } = req.query;

    const { userName, email, address, phone, totalPrice, status } = req.body;
    const result = await OrderService.updateOrder({ id, userID, userName, email, address, phone, totalPrice, status });
    res.json({ messsage: 'completed', order: result });
  } catch (err) {
    res.json({ errorMessage: err });
    console.log(err);
  }
});

router.put('/noMemberOrder', async (req, res, next) => {
  try {
    const { orderID: id } = req.query;

    const { userName, email, address, phone, totalPrice, status } = req.body;
    const result = await OrderService.updateOrderNoMember({ id, userName, email, address, phone, totalPrice, status });
    res.json({ messsage: 'completed', order: result });
  } catch (err) {
    res.json({ errorMessage: err });
    console.log(err);
  }
});

// it will delete order and orderItem
router.delete('/', async (req, res, next) => {
  try {
    console.log('req.decoded', req.decoded);
    const { id: userID, role } = req.decoded;
    const { orderID: id } = req.query;
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
  '/item/:orderID',
  asyncHandler(async (req, res) => {
    console.log('req.params: ', req.params);
    console.log('req.query: ', req.query);
    const { orderID } = req.params;
    const result = await OrderService.readItem(orderID);
    res.status(200).json(result);
  })
);

// it will update orderItem only
router.put(
  '/items',
  asyncHandler(async (req, res) => {
    const { orderID } = req.query;
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
