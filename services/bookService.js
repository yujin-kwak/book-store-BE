const mongoose = require('mongoose');
const BookModel = require('../models/schemas/book');
const BookCategoryModel = require('../models/schemas/bookCategory');

class BookService {
  static async createBook({ title, author, category, imageUrl, price, salePrice, score, quantity, condition, publishedDate, publisher }) {
    const book = new BookModel({
      title,
      author,
      category,
      imageUrl,
      price,
      salePrice,
      score,
      quantity,
      condition,
      publishedDate,
      publisher
    });
    try {
      await book.save();
      return book;
    } catch (error) {
      console.log('BookService Create Error', error);
    }
  }

  static async readBook() {
    const result = await BookModel.find({}).populate('category', 'category');
    return result;
  }

  static async readBookById(id) {
    const result = await BookModel.findById(id).populate('category', 'category');
    return result;
  }

  static async updateBook({ id, title, author, category, imageUrl, price, salePrice, score, quantity, condition, publishedDate, publisher }) {
    const bookModified = await BookModel.updateOne({ _id: id }, { $set: { title, author, category, imageUrl, price, salePrice, score, quantity, condition, publishedDate, publisher } });

    return bookModified;
  }

  static async deleteBook(id) {
    const result = await BookModel.deleteOne({ _id: id });
    console.log(result);
    return result;
  }

  static async createCategory(category, description) {
    const bookCategory = new BookCategoryModel({ category, description });
    await bookCategory.save();
    return bookCategory;
  }

  static async readCategory() {
    const result = await BookCategoryModel.find({});
    return result;
  }

  static async updateCategory(id, category) {
    const bookCategoryModified = await BookCategoryModel.updateOne({ _id: id }, { $set: { category: category } });

    return bookCategoryModified;
  }

  static async deleteCategory(id) {
    const result = await BookCategoryModel.deleteOne({ _id: id });
    console.log(result);
    return result;
  }

  static async readBookByCategory(category) {
    const result = await BookModel.find({ category: category }).populate('category', 'category');

    return result;
  }

  static async countBooks() {
    const result = await BookModel.countDocuments({});
    return result;
  }
}

module.exports = BookService;
