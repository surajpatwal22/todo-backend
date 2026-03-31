import mongoose from "mongoose";
import config from "./index.js";

const connectDB = async () => {
  const { MONGODB_URL } = config;
  try {
    await mongoose.connect(MONGODB_URL);
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("DB Error:", error);
    process.exit(1);
  }
};

export default connectDB;
