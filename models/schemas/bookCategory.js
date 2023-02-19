const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookCategorySchema = new Schema(
  {
    id: Schema.Types.ObjectId,
    category: { type: String, required: true, unique: true },
    description: { type: String }
  },
  { timestamps: true }
);

BookCategorySchema.index({ name: 1 });

const BookCategoryModel = mongoose.model('BookCategoryModel', BookCategorySchema, 'bookCategories');

module.exports = BookCategoryModel;
