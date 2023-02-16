const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderItemSchema = new Schema(
  {
    id: Schema.Types.ObjectId,
    orderId: { type: Schema.Types.ObjectId, ref: 'OrderModel' },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true }
  },
  { timestamps: true }
);

OrderItemSchema.index({ bookId: 1 });

const OrderItemModel = mongoose.model('OrderItemModel', OrderItemSchema, 'orderItems');

module.exports = OrderItemModel;
