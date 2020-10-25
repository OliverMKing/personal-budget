const mongoose = require("mongoose");

const budgetItemsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      unique: true,
      required: true,
    },
    value: {
      type: Number,
      required: true,
    },
    color: {
      type: String,
      trim: true,
      required: true,
      minlength: 6,
    },
  },
  {
    collection: "budget_items",
  }
);

module.exports = mongoose.model("budget_items", budgetItemsSchema);
