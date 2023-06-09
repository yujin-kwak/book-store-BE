const mongoose = require('mongoose');
const BookModel = require('../models/schemas/book');
const BookCategoryModel = require('../models/schemas/bookCategory');

class BookService {
  static async createBook({ title, author, category, imageUrl, price, salePrice, score, stock, condition, publishedDate, publisher }) {
    const book = new BookModel({
      title,
      author,
      category,
      imageUrl,
      price,
      salePrice,
      score,
      stock,
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
    const array = await BookModel.find({}).populate('category', 'category').sort({ createdAt: -1 });
    // const arrayFrom = Array.from(array);
    // console.log(arrayFrom);
    // return arrayFrom;
    return array;
  }

  static async readBookById(bookID) {
    const result = await BookModel.findById({ _id: bookID }).populate('category', 'category').sort({ createdAt: -1 });
    return result;
  }

  static async updateBook({ bookID, title, author, category, price, salePrice, imageUrl, score, stock, condition, publishedDate, publisher }) {
    const bookModified = await BookModel.updateOne({ _id: bookID }, { title, author, category, price, salePrice, score, imageUrl, stock, condition, publishedDate, publisher });

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

  static async readCategoryById(id) {
    const result = await BookCategoryModel.findById(id).populate('category', 'category');
    console.log('result', result);
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

  static async readBookByCategory(category, sort) {
    switch (sort) {
      case 'price':
        const price = await BookModel.find({ category: category }).sort({ price: 1 }).populate('category', 'category');
        return price;
        break;

      case 'score':
        const score = await BookModel.find({ category: category }).sort({ score: -1 }).populate('category', 'category');
        return score;
        break;

      case 'createdAt':
        const createdAt = await BookModel.find({ category: category }).sort({ createdAt: -1 }).populate('category', 'category');
        return createdAt;
        break;
      default:
    }
  }

  static async readBookPerPage(page, perPage, category, sortedBy) {
    let currentSort = { createdAt: -1 };
    if (sortedBy == 1) {
      currentSort = { score: -1 };
    } else if (sortedBy == 2) {
      currentSort = { salePrice: 1 };
    } else if (sortedBy == 3) {
      currentSort = { salePrice: -1 };
    }

    const array = await BookModel.find({ category: category })
      .populate('category', 'category')
      .sort(currentSort)
      .skip((page - 1) * perPage)
      .limit(perPage);
    // const arrayFrom = Array.from(array);
    // console.log(arrayFrom);
    // return arrayFrom;
    return array;
  }

  static async countBookByCategory(category) {
    const result = await BookModel.countDocuments({ category: category });
    return result;
  }

  static async countBook() {
    const result = await BookModel.countDocuments({});
    return result;
  }
}

module.exports = BookService;
