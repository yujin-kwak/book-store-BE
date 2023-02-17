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

  async readOrder() {
    const result = await OrderModel.find({});
    return result;
  }

  async updateOrder() {
    await OrderModel.updateOne(
      { _id: this.id },
      { orderId: this.orderId, userId: this.userId, orderItems: this.orderItems, address: this.address, phone: this.phone, email: this.email, totalPrice: this.totalPrice }
    );
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
