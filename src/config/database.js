const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose
    .connect("mongodb://localhost:27017/delivery_bot")
    .then(() => console.log("Connected"))
    .catch((err) => console.log(err));
};

module.exports = connectDB;
