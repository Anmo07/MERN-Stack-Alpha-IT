import mongoose from "mongoose";
import expenseRepository from "../repository/expenseRepository.js";

const VALID_CATEGORIES = [
  "Food",
  "Travel",
  "Shopping",
  "Bills",
  "Entertainment",
  "Health",
  "Education",
  "Other"
];

const VALID_PAYMENT_METHODS = [
  "Cash",
  "Credit Card",
  "Debit Card",
  "UPI",
  "Net Banking",
  "Other"
];

class ExpenseService {
  validateExpenseData(data) {
    const { title, amount, category, date, paymentMethod } = data;

    if (!title || typeof title !== "string" || !title.trim()) {
      const error = new Error("Expense title is required");
      error.statusCode = 400;
      throw error;
    }

    const numericAmount = Number(amount);
    if (isNaN(numericAmount) || numericAmount <= 0) {
      const error = new Error("Amount must be a valid positive number greater than 0");
      error.statusCode = 400;
      throw error;
    }

    if (!category || !VALID_CATEGORIES.includes(category)) {
      const error = new Error(`Category is required and must be one of: ${VALID_CATEGORIES.join(", ")}`);
      error.statusCode = 400;
      throw error;
    }

    if (!date || isNaN(new Date(date).getTime())) {
      const error = new Error("Valid date is required");
      error.statusCode = 400;
      throw error;
    }

    if (!paymentMethod || !VALID_PAYMENT_METHODS.includes(paymentMethod)) {
      const error = new Error(`Payment method is required and must be one of: ${VALID_PAYMENT_METHODS.join(", ")}`);
      error.statusCode = 400;
      throw error;
    }
  }

  async createExpense(userId, data) {
    this.validateExpenseData(data);

    const expenseData = {
      user: userId,
      title: data.title.trim(),
      amount: Number(data.amount),
      category: data.category,
      date: new Date(data.date),
      paymentMethod: data.paymentMethod,
      description: data.description ? data.description.trim() : ""
    };

    return await expenseRepository.create(expenseData);
  }

  async getExpenses(userId, query = {}) {
    const filter = { user: userId };

    if (query.search && query.search.trim()) {
      const searchRegex = new RegExp(query.search.trim(), "i");
      filter.$or = [
        { title: searchRegex },
        { description: searchRegex }
      ];
    }

    if (query.category && query.category !== "All") {
      filter.category = query.category;
    }

    if (query.paymentMethod && query.paymentMethod !== "All") {
      filter.paymentMethod = query.paymentMethod;
    }

    if (query.startDate || query.endDate) {
      filter.date = {};
      if (query.startDate) {
        filter.date.$gte = new Date(query.startDate);
      }
      if (query.endDate) {
        const end = new Date(query.endDate);
        end.setHours(23, 59, 59, 999);
        filter.date.$lte = end;
      }
    }

    let sortOption = { date: -1, createdAt: -1 };
    if (query.sortBy === "amount-asc") {
      sortOption = { amount: 1 };
    } else if (query.sortBy === "amount-desc") {
      sortOption = { amount: -1 };
    } else if (query.sortBy === "date-asc") {
      sortOption = { date: 1 };
    } else if (query.sortBy === "date-desc") {
      sortOption = { date: -1 };
    }

    return await expenseRepository.findAll(filter, sortOption);
  }

  async getExpenseById(id, userId) {
    const expense = await expenseRepository.findById(id, userId);
    if (!expense) {
      const error = new Error("Expense not found");
      error.statusCode = 404;
      throw error;
    }

    return expense;
  }

  async updateExpense(id, userId, data) {
    this.validateExpenseData(data);

    const updateData = {
      title: data.title.trim(),
      amount: Number(data.amount),
      category: data.category,
      date: new Date(data.date),
      paymentMethod: data.paymentMethod,
      description: data.description ? data.description.trim() : ""
    };

    const updatedExpense = await expenseRepository.update(id, userId, updateData);
    if (!updatedExpense) {
      const error = new Error("Expense not found or unauthorized");
      error.statusCode = 404;
      throw error;
    }

    return updatedExpense;
  }

  async deleteExpense(id, userId) {
    const deletedExpense = await expenseRepository.delete(id, userId);
    if (!deletedExpense) {
      const error = new Error("Expense not found or unauthorized");
      error.statusCode = 404;
      throw error;
    }

    return deletedExpense;
  }

  async getSummary(userId) {
    const userTarget = mongoose.Types.ObjectId.isValid(userId)
      ? new mongoose.Types.ObjectId(userId)
      : userId;

    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);

    const totalStats = await expenseRepository.aggregate([
      { $match: { user: userTarget } },
      {
        $group: {
          _id: null,
          totalAmount: { $sum: "$amount" },
          count: { $sum: 1 }
        }
      }
    ]);

    const monthStats = await expenseRepository.aggregate([
      {
        $match: {
          user: userTarget,
          date: { $gte: startOfMonth, $lte: endOfMonth }
        }
      },
      {
        $group: {
          _id: null,
          currentMonthTotal: { $sum: "$amount" },
          currentMonthCount: { $sum: 1 }
        }
      }
    ]);

    const categoryStats = await expenseRepository.aggregate([
      { $match: { user: userTarget } },
      {
        $group: {
          _id: "$category",
          total: { $sum: "$amount" },
          count: { $sum: 1 }
        }
      },
      { $sort: { total: -1 } }
    ]);

    const paymentMethodStats = await expenseRepository.aggregate([
      { $match: { user: userTarget } },
      {
        $group: {
          _id: "$paymentMethod",
          total: { $sum: "$amount" },
          count: { $sum: 1 }
        }
      },
      { $sort: { total: -1 } }
    ]);

    const recentExpenses = await expenseRepository.findAll(
      { user: userId },
      { date: -1, createdAt: -1 }
    );

    return {
      totalAmount: totalStats.length > 0 ? totalStats[0].totalAmount : 0,
      totalCount: totalStats.length > 0 ? totalStats[0].count : 0,
      currentMonthSpending: monthStats.length > 0 ? monthStats[0].currentMonthTotal : 0,
      currentMonthCount: monthStats.length > 0 ? monthStats[0].currentMonthCount : 0,
      categorySpending: categoryStats.map((item) => ({
        category: item._id,
        total: item.total,
        count: item.count
      })),
      paymentMethodSpending: paymentMethodStats.map((item) => ({
        paymentMethod: item._id,
        total: item.total,
        count: item.count
      })),
      recentExpenses: recentExpenses.slice(0, 5)
    };
  }
}

export default new ExpenseService();
