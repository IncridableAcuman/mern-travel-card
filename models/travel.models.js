const { Schema, model } = require("mongoose");

const travelSchema = new Schema(
  {
    author: {
      type: Schema.ObjectId,
      ref: "User",
    },
    picture: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
const Travel = model("Travel", travelSchema);
module.exports = Travel;
