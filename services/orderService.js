const mongoose = require('mongoose');
const OrderModel = require('../models/schemas/order');
const OrderItemModel = require('../models/schemas/orderItem');
const BookModel = require('../models/schemas/book');

class OrderService {
  static async createOrder({ userID, userName, email, address, phone, totalPrice, status }) {
    const order = new OrderModel({
      userID,
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

  static async createOrderItem(orderID, orderItemList) {
    let orderItemAll = [];
    for (const order of orderItemList) {
      try {
        const orderItem = new OrderItemModel({
          orderID,
          bookID: order.bookID,
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
    const orderList = await OrderModel.find({}).populate('userID');

    let orderListAll = [];
    for (const order of orderList) {
      const orderItemList = await OrderItemModel.find({ orderID: order._id }).populate('bookID');
      orderListAll.push({ order, orderItemList });
    }
    console.log('orderListAll', orderListAll);
    return orderListAll;
  }

  static async readOrder(orderID) {
    const orderList = await OrderModel.find({ _id: orderID }).populate('userID').sort({ createdAt: -1 });
    let orderListAll = [];
    for (const order of orderList) {
      const orderItemList = await OrderItemModel.find({ orderID: order._id }).populate('bookID').sort({ createdAt: -1 });

      orderListAll.push({ order, orderItemList });
    }

    return orderListAll;
  }

  static async readOrderByUser(userID) {
    const orderList = await OrderModel.find({ userID }).populate('userID').sort({ createdAt: -1 });
    let orderListAll = [];
    for (const order of orderList) {
      const orderItemList = await OrderItemModel.find({ orderID: order._id }).populate('bookID').sort({ createdAt: -1 });

      orderListAll.push({ order, orderItemList });
    }

    return orderListAll;
  }

  // static async readNomemberOrder(orderID) {
  //   const orderList = await OrderModel.find({ _id: orderID }).populate('userID');
  //   const orderItemList = await OrderItemModel.find({ orderID: orderID }).populate('bookID');

  //   return { orderList, orderItemList };
  // }
  static async readNomemberOrder(orderID) {
    const orderList = await OrderModel.find({ _id: orderID }).populate('userID').sort({ createdAt: -1 });
    let orderListAll = [];
    for (const order of orderList) {
      const orderItemList = await OrderItemModel.find({ orderID: order._id }).populate('bookID').sort({ createdAt: -1 });

      orderListAll.push({ order, orderItemList });
    }

    return orderListAll;
  }

  static async updateOrder({ id, userID, userName, email, address, phone, totalPrice, status }) {
    await OrderModel.updateOne({ _id: id }, { userID, userName, email, address, phone, totalPrice, status });
  }

  static async updateOrderNoMember({ id, userName, email, address, phone, totalPrice, status }) {
    await OrderModel.updateOne({ _id: id }, { userName, email, address, phone, totalPrice, status });
  }

  static async deleteOrder(id) {
    await OrderModel.deleteOne({ _id: id });
    await OrderItemModel.deleteMany({ orderID: id });
    return 'deleted';
  }

  static async readItem(orderID) {
    console.log(orderID);
    console.log('readItemresult', orderID);
    const id = mongoose.Types.ObjectId(orderID);
    console.log(id);
    console.log('readItemresult2', typeof id);
    const result = await OrderItemModel.find({ orderID: id });
    return result;
  }

  static async updateItem({ orderID, bookID, bookTitle, quantity, salePrice }) {
    const orderItemModified = await OrderItemModel.updateOne({ orderID: orderID }, { $set: { bookID, bookTitle, quantity, salePrice } });

    return orderItemModified;
  }
  static async deleteItem(orderID) {
    await OrderItemModel.deleteMany({ orderID: orderID });
    return 'deleted';
  }
}

module.exports = OrderService;
