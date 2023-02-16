const OrderModel = require('../models/schemas/order');
const OrderItemModel = require('../models/schemas/orderItem');
const BookModel = require('../models/schemas/book');

class OrderService {
  constructor({ orderId, userName, orderItems, address, phone, email, totalPrice }) {
    this.orderId = orderId;
    this.userName = userName;
    this.orderItems = orderItems;
    this.address = address;
    this.phone = phone;
    this.email = email;
    this.totalPrice = totalPrice;
  }

  async createOrder() {
    const order = new OrderModel({
      orderId: this.orderId,
      userName: this.userName,
      orderItems: this.orderItems,
      address: this.address,
      phone: this.phone,
      email: this.email,
      totalPrice: this.totalPrice
    });
    await order.save();
    return order;
  }

  async createOrderItem() {
    for (const orderItem of this.orderItems) {
      try {
        const book = await OrderModel.findById(orderItem.id);
        const orderItem = new OrderItemModel({
          orderId: this.orderId,
          quantity: orderItem.quantity,
          price: book.price
        });
        await orderItem.save();
        return orderItem;
      } catch (err) {
        console.log(err);
      }
    }
  }
}

module.exports = OrderService;
