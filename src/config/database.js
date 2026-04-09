const mongoose = require('mongoose');

const connectDB = async () => {
   await mongoose.connect('mongodb://localhost:27017/testDB')
  .then(() => console.log("Connected"))
  .catch(err => console.log(err));
};

module.exports = connectDB;
