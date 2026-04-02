import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";
import config from "../config/index.js";
import crypto from "crypto";
import AuthRoles from "../utils/authRoles.js";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"],
      maxLength: [50, "name must be less than 50 chars"],
    },

    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
      index: { unique: true },
    },

    password: {
      type: String,
      required: [true, "password is required"],
      minLength: [8, "password must be atleast 8 chars"],
      select: false,
    },

    role: {
      type: String,
      enum: Object.values(AuthRoles),
      default: AuthRoles.USER,
    },

    contactNumber: {
      type: String,
      validate: {
        validator: function (v) {
          return /^\d{10}$/.test(v);
        },
        message: (props) =>
          `${props.value} is not a valid 10-digit contact number!`,
      },
    },

    address: {
      type: String,
    },

    forgotPasswordToken: String,
    forgotPasswordExpiry: Date,
  },
  { timestamps: true },
);

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  try {
    this.password = await bcrypt.hash(this.password, 10);
  } catch (error) {
    throw new Error("Password hashing failed");
  }
});

userSchema.methods = {
  comparePassword: async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
  },

  getJWTToken: function () {
    return JWT.sign({ _id: this._id, role: this.role }, config.JWT_SECRET, {
      expiresIn: config.JWT_EXPIRY,
    });
  },

  generateForgotPasswordToken: function () {
    const token = crypto.randomBytes(20).toString("hex");

    this.forgotPasswordToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    this.forgotPasswordExpiry = Date.now() + 20 * 60 * 1000;

    return token;
  },
};

export default mongoose.model("User", userSchema);
