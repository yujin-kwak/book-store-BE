const mongoose = require('mongoose');
const OrderModel = require('./order');
const Schema = mongoose.Schema;

const OrderItemSchema = new Schema(
  {
    id: Schema.Types.ObjectId,
    orderID: { type: Schema.Types.ObjectId, ref: OrderModel, required: true },
    bookID: { type: Schema.Types.ObjectId, ref: 'BookModel' },
    bookTitle: { type: String, required: true },
    quantity: { type: Number, required: true },
    salePrice: { type: Number, required: true }
  },
  { timestamps: true }
);

OrderItemSchema.index({ bookDbId: 1 });

const OrderItemModel = mongoose.model('OrderItemModel', OrderItemSchema, 'orderItems');

module.exports = OrderItemModel;
