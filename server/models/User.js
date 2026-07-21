const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/\S+@\S+\.\S+/, "Please enter a valid email address"],
    },

    password: {
      type: String,
      required: [true, "Password is required"],
    },

    // Stripe Subscription

    isPremium: {
      type: Boolean,
      default: false,
    },

    plan: {
      type: String,
      enum: ["Free", "Premium"],
      default: "Free",
    },

    paymentDate: {
      type: Date,
      default: null,
    },

    stripeSessionId: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);