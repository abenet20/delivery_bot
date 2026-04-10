const User = require("../models/users");
const bcrypt = require("bcrypt");

const signup = async (name, phone, telegramId, password) => {
  try {
    const hashed = await bcrypt.hash(password, 10);
    const existingUser = await User.findOne({ phone });
    if (existingUser) {
      // throw new Error("User with this phone number already exists.");
      return false;
    }

    const newUser = await User.create({
      name,
      phone,
      telegramId,
      password: hashed,
    });
    return newUser;
  } catch (error) {
    console.error("Signup error:", error);
    throw error;
  }
};

module.exports = signup;
