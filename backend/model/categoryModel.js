const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
  title: { type: String, required: true },
  image: { type: String, required: true },
});

const CategoryModel = mongoose.model("categories", CategorySchema);
module.exports = CategoryModel;
