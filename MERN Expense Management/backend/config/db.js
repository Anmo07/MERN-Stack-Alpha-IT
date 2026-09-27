import mongoose from "mongoose";

let isDbConnected = false;

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/expense_tracker", {
      serverSelectionTimeoutMS: 5000
    });
    isDbConnected = true;
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    isDbConnected = false;
    console.log(`Notice: Database connection notice (${error.message}). Active with in-memory persistence fallback.`);
  }
};

export const checkDbConnection = () => {
  return isDbConnected && mongoose.connection.readyState === 1;
};

export default connectDB;
