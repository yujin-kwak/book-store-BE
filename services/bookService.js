const mongoose = require('mongoose');
const BookModel = require('../models/schemas/book');

class BookService {
  static async createBook({ title, author, category, image, price, score, quantity, condition, publishedDate, publisher }) {
    const book = new BookModel({
      title,
      author,
      category,
      image,
      price,
      score,
      quantity,
      condition,
      publishedDate,
      publisher
    });
    await book.save();
    return book;
  }

  static async readBook() {
    const result = await BookModel.find({});
    return result;
  }

  static async updateBook({ id, title, author, category, image, price, score, quantity, condition, publishedDate, publisher }) {
    const bookModified = await BookModel.updateOne({ _id: id }, { $set: { title, author, category, image, price, score, quantity, condition, publishedDate, publisher } });

    return bookModified;
  }

  static async deleteBook(id) {
    const result = await BookModel.deleteOne({ _id: id });
    console.log(result);
    return result;
  }
}

module.exports = BookService;

// class OrderService {
//   async createOrder({ orderId, userId, orderItemIdList, address, phone, email, totalPrice }) {
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

//   async createOrderItem({ orderId, orderItemList, status }) {
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

//   async readOrder(userId) {
//     const result = await OrderModel.findOne({ userId: userId }).populate('userId');

//     return result;
//   }

//   async updateOrder({ _id, orderId, userId, orderItemsIds, address, phone, email, totalPrice, date }) {
//     await OrderModel.updateOne({ _id: _id }, { orderId, userId, orderItemsIds, address, phone, email, totalPrice, date });
//   }

//   async deleteOrder() {
//     await OrderModel.deleteOne({ _id: this.id });
//   }
// }

// module.exports = OrderService;
