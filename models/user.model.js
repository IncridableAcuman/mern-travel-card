const { Schema, model } = require("mongoose");
const userModel = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    isActivated: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
const User = model("User", userModel);
module.exports = User;
