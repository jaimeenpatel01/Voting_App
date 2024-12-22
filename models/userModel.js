const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
    age: {
      type: Number,
      require: true,
    },
    aadharNumber: {
      type: Number,
      require: true,
      unique: true,
    },
    role: {
      type: String,
      enum: ["admin", "voter"],
    },

    isVoted: {
      type: Boolean,
      default: false,
    },
  },
  {
    validateBeforeSave: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
