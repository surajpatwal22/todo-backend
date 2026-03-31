import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    password: String,
    contact: String,
    address: String,
    role: {
      type: String,
      default: "user",
    },
  },
  { timestamps: true },
);

export default mongoose.model("User", userSchema);
