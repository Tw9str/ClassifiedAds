const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    imgSrc: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
