import { Router } from "express";
import authRoutes from "./authRoutes.js";
import expenseRoutes from "./expenseRoutes.js";

const apiRouter = Router();

apiRouter.use("/auth", authRoutes);
apiRouter.use("/expenses", expenseRoutes);

export default apiRouter;
