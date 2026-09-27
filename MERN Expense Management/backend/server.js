import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import apiRouter from "./routes/index.js";
import { notFoundHandler, errorHandler } from "./middlewares/errorMiddleware.js";

const app = express();
const PORT = process.env.PORT || 5001;

await connectDB();

app.use(cors({
  origin: true,
  credentials: true
}));

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    status: "ok",
    message: "Expense Management API is running"
  });
});

app.use("/api", apiRouter);

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
