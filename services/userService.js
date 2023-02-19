const mongoose = require('mongoose');
const UserModel = require('../models/schemas/user');

class UserService {
  static async createUser({ name, email, password, phone, address, point }) {
    const user = new UserModel({
      name,
      email,
      password,
      phone,
      address,
      point
    });

    await user.save();
    return user;
  }

  static async readUser() {
    const result = await UserModel.find({});

    return result;
  }

  static async updateUser({ id, name, email, password, phone, address, point }) {
    const userModified = await UserModel.updateOne({ _id: id }, { $set: { name, email, password, phone, address, point } });

    return userModified;
  }

  static async deleteUser(id) {
    const result = await UserModel.deleteOne({ _id: id });
    console.log(result);
    return result;
  }
}

module.exports = UserService;
