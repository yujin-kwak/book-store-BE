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
