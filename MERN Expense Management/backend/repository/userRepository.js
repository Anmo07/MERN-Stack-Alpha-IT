import mongoose from "mongoose";
import User from "../models/userModel.js";
import { checkDbConnection } from "../config/db.js";

const memoryUsers = [];

class UserRepository {
  async findByEmail(email) {
    if (checkDbConnection()) {
      return await User.findOne({ email });
    }
    return memoryUsers.find((u) => u.email.toLowerCase() === email.toLowerCase()) || null;
  }

  async findById(id) {
    if (checkDbConnection()) {
      return await User.findById(id).select("-password");
    }
    const found = memoryUsers.find((u) => u._id.toString() === id.toString());
    if (!found) return null;
    const { password, ...userWithoutPassword } = found;
    return userWithoutPassword;
  }

  async create(userData) {
    if (checkDbConnection()) {
      const user = new User(userData);
      return await user.save();
    }
    const newUser = {
      _id: new mongoose.Types.ObjectId().toString(),
      name: userData.name,
      email: userData.email,
      password: userData.password,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    memoryUsers.push(newUser);
    return newUser;
  }

  async update(id, updateData) {
    if (checkDbConnection()) {
      return await User.findByIdAndUpdate(id, updateData, { new: true }).select("-password");
    }
    const index = memoryUsers.findIndex((u) => u._id.toString() === id.toString());
    if (index === -1) return null;
    memoryUsers[index] = { ...memoryUsers[index], ...updateData, updatedAt: new Date() };
    const { password, ...userWithoutPassword } = memoryUsers[index];
    return userWithoutPassword;
  }

  async delete(id) {
    if (checkDbConnection()) {
      return await User.findByIdAndDelete(id);
    }
    const index = memoryUsers.findIndex((u) => u._id.toString() === id.toString());
    if (index === -1) return null;
    const deleted = memoryUsers.splice(index, 1);
    return deleted[0];
  }
}

export default new UserRepository();
