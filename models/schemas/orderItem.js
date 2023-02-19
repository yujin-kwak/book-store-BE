const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderItemSchema = new Schema(
  {
    id: Schema.Types.ObjectId,
    orderId: { type: String, required: true },
    bookId: { type: Schema.Types.ObjectId, ref: 'BookModel' },
    bookTitle: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true }
  },
  { timestamps: true }
);

OrderItemSchema.index({ bookId: 1 });

const OrderItemModel = mongoose.model('OrderItemModel', OrderItemSchema, 'orderItems');

module.exports = OrderItemModel;
