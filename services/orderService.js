const mongoose = require('mongoose');
const OrderModel = require('../models/schemas/order');
const OrderItemModel = require('../models/schemas/orderItem');
const BookModel = require('../models/schemas/book');

class OrderService {
  static async createOrder({ orderId, userDbId, userName, email, address, phone, totalPrice, status }) {
    const order = new OrderModel({
      orderId,
      userDbId,
      userName,
      email,
      address,
      phone,
      totalPrice,
      status
    });

    await order.save();
    return order;
  }

  // static async createOrderItem(orderId, orderItemList) {
  //   console.log('order', orderItemList);
  //   return orderItemList.map(async (order) => {
  //     try {
  //       const orderItem = new OrderItemModel({
  //         orderId,
  //         bookDbId: order.bookDbId,
  //         bookTitle: order.title,
  //         quantity: order.quantity,
  //         salePrice: order.salePrice
  //       });

  //       await orderItem.save();
  //       return orderItem;
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   });
  // }

  static async createOrderItem(orderId, orderItemList) {
    let orderItemAll = [];
    for (const order of orderItemList) {
      try {
        const orderItem = new OrderItemModel({
          orderId,
          bookDbId: order.bookDbId,
          bookTitle: order.title,
          quantity: order.quantity,
          salePrice: order.salePrice
        });

        const itemSaved = await orderItem.save();
        orderItemAll.push(itemSaved);
      } catch (err) {
        console.log(err);
      }
    }
    return orderItemAll;
  }

  static async readAllorder() {
    const orderList = await OrderModel.find({}).populate('userDbId');
    let orderListAll = [];
    for (const order of orderList) {
      const orderItemList = await OrderItemModel.find({ orderId: order.orderId }).populate('bookDbId');
      console.log('orderItemList', orderItemList);
      orderListAll.push({ order, orderItemList });
    }
    console.log('orderListAll', orderListAll);
    return orderListAll;
  }

  // static async readAllorder() {
  //   const orderList = await OrderModel.find({}).populate('userDbId');
  //   let orderListAll = [];
  //   const orderItemlist = orderList.map(async (order) => {
  //     await OrderItemModel.find({ orderId: order.orderId })
  //       .populate('bookDbId')
  //       .then((orderItemList) => {
  //         orderListAll.push({ order, orderItemList });
  //       });
  //   });
  //   await Promise.all(orderItemlist);
  //   console.log('orderListAll', orderListAll);
  //   return orderListAll;
  // }

  static async readOrder(command) {
    const orderList = await OrderModel.find(command).populate('userDbId').sort({ createdAt: -1 });
    let orderListAll = [];
    for (const order of orderList) {
      const orderItemList = await OrderItemModel.find({}).populate('bookDbId').sort({ createdAt: -1 });
      console.log('orderItemList', orderItemList);
      orderListAll.push({ order, orderItemList });
    }
    console.log('orderListAll', orderListAll);
    return orderListAll;
  }

  // static async readOrderByUser(userDbId) {
  //   const result = await OrderModel.find({ userDbId: userDbId }).populate('userDbId').sort({ createdAt: -1 });
  //   console.log('orderItem', result);
  //   const orderItemList = await OrderItemModel.find({ userDbId: userDbId }).populate('bookDbId');
  //   console.log('orderItem', orderItemList);
  //   return { result, orderItemList };
  // }

  static async readNomemberOrder(orderId) {
    const orderList = await OrderModel.find({ orderId: orderId }).populate('userDbId');
    const orderItemList = await OrderItemModel.find({ orderId: orderId }).populate('bookDbId');

    return { orderList, orderItemList };
  }

  static async updateOrder({ _id, orderId, userDbId, userName, email, address, phone, totalPrice, status }) {
    await OrderModel.updateOne({ _id: _id }, { orderId, userDbId, userName, email, address, phone, totalPrice, status });
  }

  static async deleteOrder(orderId) {
    await OrderModel.deleteOne({ orderId: orderId });
    await OrderItemModel.deleteMany({ orderId: orderId });
    return 'deleted';
  }

  static async readItem(orderId) {
    const result = await OrderItemModel.find({ orderId: orderId }).populate('bookDbId');

    return result;
  }

  static async updateItem({ _id, orderId, bookDbId, bookTitle, quantity, price }) {
    const orderItemModified = await OrderItemModel.updateOne({ _id: _id }, { $set: { orderId, bookDbId, bookTitle, quantity, price } });

    return orderItemModified;
  }
  static async deleteItem(_id) {
    await OrderItemModel.deleteOne({ _id: _id });
    return 'deleted';
  }
}

module.exports = OrderService;
