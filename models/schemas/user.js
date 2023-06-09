const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    id: Schema.Types.ObjectId,
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    role: { type: String, required: true }
  },
  { timestamps: true }
);

UserSchema.index({ userId: 1 });

const UserModel = mongoose.model('UserModel', UserSchema, 'users');
module.exports = UserModel;
