const mongoose = require('mongoose');
const OrderModel = require('../models/schemas/order');
const OrderItemModel = require('../models/schemas/orderItem');
const BookModel = require('../models/schemas/book');

class OrderService {
  static async createOrder({ orderId, userDbId, address, phone, totalPrice, status }) {
    const order = new OrderModel({
      orderId,
      userDbId,
      address,
      phone,
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
          bookDbId: order.bookDbId,
          bookTitle: order.title,
          quantity: order.quantity,
          salePrice: order.salePrice
        });

        await orderItem.save();
        return orderItem;
      } catch (err) {
        console.log(err);
      }
    });
  }

  static async readOrder(userDbId) {
    const result = await OrderModel.findOne({ userDbId: userDbId }).populate('userDbId');
    console.log('orderItem', result);
    const orderItemList = await OrderItemModel.find({ orderId: result.orderId }).populate('bookDbId');

    return { result, orderItemList };
  }

  static async updateOrder({ _id, orderId, userDbId, address, phone, totalPrice, status }) {
    await OrderModel.updateOne({ _id: _id }, { orderId, userDbId, address, phone, totalPrice, status });
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
