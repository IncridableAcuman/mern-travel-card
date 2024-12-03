const { Schema, model } = require("mongoose");

const tokenModel = new Schema({
  user: {
    type: Schema.ObjectId,
    ref: "User",
  },
  refreshToken: {
    type: String,
    required: true,
  },
});
const Token = model("Token", tokenModel);

module.exports = Token;
