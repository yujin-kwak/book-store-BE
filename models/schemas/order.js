const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema(
  {
    id: Schema.Types.ObjectId,
    userID: {
      type: Schema.Types.ObjectId,
      ref: 'UserModel',
      required: false
    },
    userName: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    totalPrice: { type: Number, required: true },
    status: { type: String, required: true }
  },
  { timestamps: true }
);

OrderSchema.index({ userId: 1, bookId: 1 });

const OrderModel = mongoose.model('OrderModel', OrderSchema, 'orders');

module.exports = OrderModel;
