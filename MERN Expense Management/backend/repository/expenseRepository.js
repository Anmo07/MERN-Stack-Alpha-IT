import mongoose from "mongoose";
import Expense from "../models/expenseModel.js";
import { checkDbConnection } from "../config/db.js";

const memoryExpenses = [];

class ExpenseRepository {
  async create(expenseData) {
    if (checkDbConnection()) {
      const expense = new Expense(expenseData);
      return await expense.save();
    }
    const newExpense = {
      _id: new mongoose.Types.ObjectId().toString(),
      user: expenseData.user.toString(),
      title: expenseData.title,
      amount: Number(expenseData.amount),
      category: expenseData.category,
      date: new Date(expenseData.date),
      paymentMethod: expenseData.paymentMethod,
      description: expenseData.description || "",
      createdAt: new Date(),
      updatedAt: new Date()
    };
    memoryExpenses.push(newExpense);
    return newExpense;
  }

  async findAll(filter = {}, sortOption = { date: -1 }) {
    if (checkDbConnection()) {
      return await Expense.find(filter).sort(sortOption);
    }

    let results = memoryExpenses.filter((item) => {
      if (filter.user && item.user.toString() !== filter.user.toString()) {
        return false;
      }

      if (filter.category && item.category !== filter.category) {
        return false;
      }

      if (filter.paymentMethod && item.paymentMethod !== filter.paymentMethod) {
        return false;
      }

      if (filter.date) {
        const itemDate = new Date(item.date).getTime();
        if (filter.date.$gte && itemDate < new Date(filter.date.$gte).getTime()) {
          return false;
        }
        if (filter.date.$lte && itemDate > new Date(filter.date.$lte).getTime()) {
          return false;
        }
      }

      if (filter.$or && Array.isArray(filter.$or)) {
        const matchesAny = filter.$or.some((condition) => {
          if (condition.title && condition.title instanceof RegExp) {
            return condition.title.test(item.title);
          }
          if (condition.description && condition.description instanceof RegExp) {
            return condition.description.test(item.description || "");
          }
          return false;
        });
        if (!matchesAny) return false;
      }

      return true;
    });

    results.sort((a, b) => {
      if (sortOption.amount) {
        return sortOption.amount === 1 ? a.amount - b.amount : b.amount - a.amount;
      }
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortOption.date === 1 ? dateA - dateB : dateB - dateA;
    });

    return results;
  }

  async findById(id, userId) {
    if (checkDbConnection()) {
      return await Expense.findOne({ _id: id, user: userId });
    }
    return (
      memoryExpenses.find(
        (item) => item._id.toString() === id.toString() && item.user.toString() === userId.toString()
      ) || null
    );
  }

  async update(id, userId, updateData) {
    if (checkDbConnection()) {
      return await Expense.findOneAndUpdate(
        { _id: id, user: userId },
        updateData,
        { new: true, runValidators: true }
      );
    }
    const index = memoryExpenses.findIndex(
      (item) => item._id.toString() === id.toString() && item.user.toString() === userId.toString()
    );
    if (index === -1) return null;

    memoryExpenses[index] = {
      ...memoryExpenses[index],
      ...updateData,
      amount: updateData.amount !== undefined ? Number(updateData.amount) : memoryExpenses[index].amount,
      date: updateData.date ? new Date(updateData.date) : memoryExpenses[index].date,
      updatedAt: new Date()
    };
    return memoryExpenses[index];
  }

  async delete(id, userId) {
    if (checkDbConnection()) {
      return await Expense.findOneAndDelete({ _id: id, user: userId });
    }
    const index = memoryExpenses.findIndex(
      (item) => item._id.toString() === id.toString() && item.user.toString() === userId.toString()
    );
    if (index === -1) return null;
    const deleted = memoryExpenses.splice(index, 1);
    return deleted[0];
  }

  async count(filter = {}) {
    if (checkDbConnection()) {
      return await Expense.countDocuments(filter);
    }
    const all = await this.findAll(filter);
    return all.length;
  }

  async aggregate(pipeline) {
    if (checkDbConnection()) {
      return await Expense.aggregate(pipeline);
    }

    let currentData = [...memoryExpenses];

    for (const stage of pipeline) {
      if (stage.$match) {
        const match = stage.$match;
        currentData = currentData.filter((item) => {
          if (match.user && item.user.toString() !== match.user.toString()) {
            return false;
          }
          if (match.date) {
            const itemTime = new Date(item.date).getTime();
            if (match.date.$gte && itemTime < new Date(match.date.$gte).getTime()) {
              return false;
            }
            if (match.date.$lte && itemTime > new Date(match.date.$lte).getTime()) {
              return false;
            }
          }
          return true;
        });
      }

      if (stage.$group) {
        const groupKey = stage.$group._id;
        const groups = {};

        for (const item of currentData) {
          let keyVal = null;
          if (typeof groupKey === "string" && groupKey.startsWith("$")) {
            const field = groupKey.slice(1);
            keyVal = item[field];
          }

          const key = keyVal === null ? "null" : String(keyVal);
          if (!groups[key]) {
            groups[key] = { _id: keyVal, totalAmount: 0, currentMonthTotal: 0, total: 0, count: 0 };
          }
          groups[key].totalAmount += item.amount;
          groups[key].currentMonthTotal += item.amount;
          groups[key].total += item.amount;
          groups[key].count += 1;
        }

        currentData = Object.values(groups);
      }

      if (stage.$sort) {
        const sortField = Object.keys(stage.$sort)[0];
        const dir = stage.$sort[sortField];
        currentData.sort((a, b) => (dir === 1 ? a[sortField] - b[sortField] : b[sortField] - a[sortField]));
      }
    }

    return currentData;
  }
}

export default new ExpenseRepository();
