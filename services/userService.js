const mongoose = require('mongoose');
const UserModel = require('../models/schemas/user');

class UserService {
  static async createUser({ name, email, password, phone, address, point }) {
    const user = new UserModel({
      name,
      email,
      password,
      phone,
      address,
      point
    });

    await user.save();
    return user;
  }

  static async readUser() {
    const result = await UserModel.find({});

    return result;
  }

  static async updateUser({ id, name, email, password, phone, address, point }) {
    const userModified = await UserModel.updateOne({ _id: id }, { $set: { name, email, password, phone, address, point } });

    return userModified;
  }

  static async deleteUser(id) {
    const result = await UserModel.deleteOne({ _id: id });
    console.log(result);
    return result;
  }
}

module.exports = UserService;

// class OrderService {
//   static async createOrder({ orderId, userId, orderItemIdList, address, phone, email, totalPrice }) {
//     const order = new OrderModel({
//       orderId,
//       userId,
//       orderItemIdList,
//       address,
//       phone,
//       email,
//       totalPrice
//     });

//     await order.save();
//     return order;
//   }

//   static async createOrderItem({ orderId, orderItemList, status }) {
//     for (const order of orderItemList) {
//       try {
//         const orderItem = new OrderItemModel({
//           orderId,
//           bookId: order.bookId,
//           bookTitle: order.title,
//           quantity: order.quantity,
//           price: order.price,
//           status
//         });

//         await orderItem.save();
//         return orderItem;
//       } catch (err) {
//         console.log(err);
//       }
//     }
//   }

//   static async readOrder(userId) {
//     const result = await OrderModel.findOne({ userId: userId }).populate('userId');

//     return result;
//   }

//   static async updateOrder({ _id, orderId, userId, orderItemsIds, address, phone, email, totalPrice, date }) {
//     await OrderModel.updateOne({ _id: _id }, { orderId, userId, orderItemsIds, address, phone, email, totalPrice, date });
//   }

//   async deleteOrder() {
//     await OrderModel.deleteOne({ _id: this.id });
//   }
// }

// module.exports = OrderService;
