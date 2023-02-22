const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookSchema = new Schema(
  {
    id: Schema.Types.ObjectId,
    title: { type: String, required: true },
    author: { type: String, required: true },
    category: { type: Schema.Types.ObjectId, ref: 'BookCategoryModel' },
    image: { data: Buffer, type: String, required: true },
    price: { type: String, required: true },
    salePrice: { type: Number, required: true },
    score: { type: Number, default: 0, max: 100, min: 0, index: true },
    quantity: { type: Number, default: 0 },
    condition: { type: String, required: true },
    publishedDate: { type: Date, required: true },
    publisher: { type: String, required: true }
  },
  { timestamps: true }
);

BookSchema.index({ title: 1, author: 1, category: 1 });

const BookModel = mongoose.model('BookModel', BookSchema, 'books');
module.exports = BookModel;
