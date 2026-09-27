import expenseService from "../services/expenseService.js";

class ExpenseController {
  async createExpense(req, res, next) {
    try {
      const expense = await expenseService.createExpense(req.user.id, req.body);
      return res.status(201).json({
        success: true,
        message: "Expense created successfully",
        data: expense
      });
    } catch (error) {
      next(error);
    }
  }

  async getExpenses(req, res, next) {
    try {
      const expenses = await expenseService.getExpenses(req.user.id, req.query);
      return res.status(200).json({
        success: true,
        count: expenses.length,
        data: expenses
      });
    } catch (error) {
      next(error);
    }
  }

  async getExpenseById(req, res, next) {
    try {
      const expense = await expenseService.getExpenseById(req.params.id, req.user.id);
      return res.status(200).json({
        success: true,
        data: expense
      });
    } catch (error) {
      next(error);
    }
  }

  async updateExpense(req, res, next) {
    try {
      const updatedExpense = await expenseService.updateExpense(
        req.params.id,
        req.user.id,
        req.body
      );
      return res.status(200).json({
        success: true,
        message: "Expense updated successfully",
        data: updatedExpense
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteExpense(req, res, next) {
    try {
      await expenseService.deleteExpense(req.params.id, req.user.id);
      return res.status(200).json({
        success: true,
        message: "Expense deleted successfully"
      });
    } catch (error) {
      next(error);
    }
  }

  async getSummary(req, res, next) {
    try {
      const summary = await expenseService.getSummary(req.user.id);
      return res.status(200).json({
        success: true,
        data: summary
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new ExpenseController();
