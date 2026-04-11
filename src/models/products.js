const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: String,
  status: String,
  category: String,
  quantity: Number,
  photo: String,
});

module.exports = mongoose.model("Product", productSchema);
