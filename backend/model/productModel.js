const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  discountPercentage: { type: Number, default: 0 },
  rating: { type: Number, default: 0 },
  stock: { type: Number, default: 0 },
  thumbnail: { type: String, required: true },
  brand: { type: mongoose.Schema.Types.ObjectId, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, required: true },
  features: { type: String, required: true },
  width: { type: Number, default: 0 },
  height: { type: Number, default: 0 },
  depth: { type: Number, default: true },
  images: { type: Array, default: [] },
});

const ProductModel = mongoose.model("products", ProductSchema);
module.exports = ProductModel;
