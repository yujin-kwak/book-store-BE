const mongoose = require('mongoose');
const OrderModel = require('../models/schemas/order');
const OrderItemModel = require('../models/schemas/orderItem');
const BookModel = require('../models/schemas/book');

class OrderService {
  async createOrder({ orderId, userId, orderItemsIds, address, phone, email, totalPrice }) {
    const order = new OrderModel({
      orderId,
      userId,
      orderItemsIds,
      address,
      phone,
      email,
      totalPrice
    });

    await order.save();
    return order;
  }

  async createOrderItem({ orderId, orderItems, status }) {
    for (const order of orderItems) {
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

  async readOrder(userId) {
    const result = await OrderModel.findOne({ userId: userId }).populate('userId');
    console.log('populated result: ', result);
    return result;
  }

  async updateOrder({ _id, orderId, userId, orderItemsIds, address, phone, email, totalPrice, date }) {
    await OrderModel.updateOne({ _id: _id }, { orderId, userId, orderItemsIds, address, phone, email, totalPrice, date });
  }

  async deleteOrder() {
    await OrderModel.deleteOne({ _id: this.id });
  }

  async readOrderItem() {
    const result = await OrderItemModel.find({});
    return result;
  }

  async updateOrderItem() {
    await OrderItemModel.updateOne({ _id: this.id }, { orderId: this.orderId, quantity: this.quantity, price: this.price });
  }

  async deleteOrderItem() {
    await OrderItemModel.deleteOne({ _id: this.id });
  }
}

module.exports = OrderService;
