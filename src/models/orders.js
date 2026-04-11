const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: String,
  productId: String,
  quantity: Number,
  date: Date,
  status: String,
  category: String,
  payment: String,
  address: String,
  total: Number,
});

module.exports = mongoose.model("Order", orderSchema);
