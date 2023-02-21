const mongoose = require('mongoose');
const UserModel = require('../models/schemas/user');
const hashPassword = require('../utils/hashPassword');

class UserService {
  static async createUser({ name, userId, password, phone, address }) {
    const hashedPassword = hashPassword(password);
    const user = new UserModel({
      name,
      userId,
      password: hashedPassword,
      phone,
      address
    });

    await user.save();
    return user;
  }

  static async readUser() {
    const result = await UserModel.find({});

    return result;
  }

  static async updateUser({ id, name, userId, password, phone, address }) {
    const userModified = await UserModel.updateOne({ _id: id }, { $set: { name, userId, password, phone, address } });

    return userModified;
  }

  static async deleteUser(id) {
    const result = await UserModel.deleteOne({ _id: id });
    console.log(result);
    return result;
  }

  //authRotuer.js에서 사용
  static async getUserByUserId(userId) {
    const result = await UserModel.findOne({ userId });
    return result;
  }
}

module.exports = UserService;
