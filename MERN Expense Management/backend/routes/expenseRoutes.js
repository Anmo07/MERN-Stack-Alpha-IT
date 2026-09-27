import { Router } from "express";
import expenseController from "../controllers/expenseController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import { validateExpense } from "../middlewares/validateMiddleware.js";

const router = Router();

router.use(authMiddleware);

router.post("/", validateExpense, expenseController.createExpense);
router.get("/", expenseController.getExpenses);
router.get("/summary", expenseController.getSummary);
router.get("/:id", expenseController.getExpenseById);
router.put("/:id", validateExpense, expenseController.updateExpense);
router.delete("/:id", expenseController.deleteExpense);

export default router;
