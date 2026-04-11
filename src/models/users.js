const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  telegramId: String,
  name: String,
  phone: Number,
  password: String,
  role: String,
});

module.exports = mongoose.model("User", userSchema);
