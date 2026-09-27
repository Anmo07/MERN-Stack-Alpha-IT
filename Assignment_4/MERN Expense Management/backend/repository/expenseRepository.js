import Expense from "../models/expenseModel.js";

class ExpenseRepository {
  async create(expenseData) {
    const expense = new Expense(expenseData);
    return await expense.save();
  }

  async findAll(filter = {}, sortOption = { date: -1 }) {
    return await Expense.find(filter).sort(sortOption);
  }

  async findById(id, userId) {
    return await Expense.findOne({ _id: id, user: userId });
  }

  async update(id, userId, updateData) {
    return await Expense.findOneAndUpdate(
      { _id: id, user: userId },
      updateData,
      { new: true, runValidators: true }
    );
  }

  async delete(id, userId) {
    return await Expense.findOneAndDelete({ _id: id, user: userId });
  }

  async count(filter = {}) {
    return await Expense.countDocuments(filter);
  }

  async aggregate(pipeline) {
    return await Expense.aggregate(pipeline);
  }
}

export default new ExpenseRepository();
