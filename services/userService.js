const mongoose = require('mongoose');
const UserModel = require('../models/schemas/user');
const hashPassword = require('../utils/hashPassword');

class UserService {
  static async createUser({ name, email, password, phone, address, role }) {
    const result = await UserModel.find({ email: email });
    console.log(result);
    if (result.length > 0) throw new Error('User already exists');

    const hashedPassword = hashPassword(password);
    const user = new UserModel({
      name,
      email,
      password: hashedPassword,
      phone,
      address,
      role
    });

    await user.save();
    return user;
  }

  static async readUser() {
    const result = await UserModel.find({}).sort({ name: 1 });

    return result;
  }
  static async readUserById(id) {
    const result = await UserModel.find({ _id: id });
    console.log('readUserById', result);
    return result ? result : null;
  }

  static async updateUser({ userID, name, password, phone, address, role }) {
    console.log('phone', userID);
    const hashedPassword = hashPassword(password);
    const userModified = await UserModel.updateOne({ _id: userID }, { name, password: hashedPassword, phone, address, role });
    console.log(userModified);
    return userModified;
  }

  static async updateUserPassword({ userID, currentPassword, newPassword }) {
    console.log('phone', userID);
    const hashedCurrentPassword = hashPassword(currentPassword);
    console.group('hashedPassword', hashedCurrentPassword);
    const user = await UserModel.find({ _id: userID });

    if (user[0].password !== hashedCurrentPassword) throw new Error('Your password is incorrect');
    const hashedNewPassword = hashPassword(newPassword);
    const userModified = await UserModel.updateOne({ _id: userID }, { password: hashedNewPassword });
    console.log(userModified);
    return userModified;
  }

  static async deleteUser(id) {
    const result = await UserModel.deleteOne({ _id: id });
    console.log(result);
    return result;
  }

  //authRotuer.js에서 사용
  static async getUserById(email) {
    const result = await UserModel.findOne({ email });
    console.log('getUserById_result', { result, Date: new Date() });
    return result;
  }
}

module.exports = UserService;
