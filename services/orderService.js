const mongoose = require('mongoose');
const OrderModel = require('../models/schemas/order');
const OrderItemModel = require('../models/schemas/orderItem');
const BookModel = require('../models/schemas/book');

class OrderService {
  static async createOrder({ orderId, userId, address, phone, email, totalPrice, status }) {
    const order = new OrderModel({
      orderId,
      userId,
      address,
      phone,
      email,
      totalPrice,
      status
    });

    await order.save();
    return order;
  }

  static async createOrderItem(orderId, orderItemList) {
    console.log('order', orderItemList);
    orderItemList.map(async (order) => {
      try {
        const orderItem = new OrderItemModel({
          orderId,
          bookId: order.bookId,
          bookTitle: order.title,
          quantity: order.quantity,
          price: order.price
        });

        await orderItem.save();
        return orderItem;
      } catch (err) {
        console.log(err);
      }
    });
  }

  static async readOrder(userId) {
    const result = await OrderModel.findOne({ userId: userId }).populate('userId');

    return result;
  }

  static async updateOrder({ _id, orderId, userId, orderItemList, address, phone, email, totalPrice }) {
    await OrderModel.updateOne({ _id: _id }, { orderId, userId, orderItemList, address, phone, email, totalPrice });
  }

  static async deleteOrder(orderId) {
    await OrderModel.deleteOne({ _id: orderId });
    await OrderItemModel.deleteMany({ orderId: orderId });
    return 'deleted';
  }

  static async readItem(orderId) {
    const result = await OrderItemModel.find({ orderId: orderId }).populate('bookId');

    return result;
  }

  static async updateItem(id) {
    const orderItemModified = await OrderItemModel.updateOne({ _id: _id }, { $set: { orderId, bookId, bookTitle, quantity, price } });

    return orderItemModified;
  }
  static async deleteItem(orderId) {
    await OrderItemModel.deleteMany({ orderId: orderId });
    return 'deleted';
  }
}

module.exports = OrderService;
