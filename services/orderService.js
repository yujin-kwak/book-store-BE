const mongoose = require('mongoose');
const OrderModel = require('../models/schemas/order');
const OrderItemModel = require('../models/schemas/orderItem');
const BookModel = require('../models/schemas/book');

class OrderService {
  static async createOrder({ orderId, userId, orderItemIdList, address, phone, email, totalPrice }) {
    const order = new OrderModel({
      orderId,
      userId,
      orderItemIdList,
      address,
      phone,
      email,
      totalPrice
    });

    await order.save();
    return order;
  }

  static async createOrderItem({ orderId, orderItemList, status }) {
    for (const order of orderItemList) {
      try {
        const orderItem = new OrderItemModel({
          orderId,
          bookId: order.bookId,
          bookTitle: order.title,
          quantity: order.quantity,
          price: order.price,
          status
        });

        await orderItem.save();
        return orderItem;
      } catch (err) {
        console.log(err);
      }
    }
  }

  static async readOrder(userId) {
    const result = await OrderModel.findOne({ userId: userId }).populate('userId');

    return result;
  }

  static async updateOrder({ _id, orderId, userId, orderItemsIds, address, phone, email, totalPrice, date }) {
    await OrderModel.updateOne({ _id: _id }, { orderId, userId, orderItemsIds, address, phone, email, totalPrice, date });
  }

  async deleteOrder() {
    await OrderModel.deleteOne({ _id: this.id });
  }
}

module.exports = OrderService;
