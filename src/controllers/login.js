const User = require("../models/users");
const bcrypt = require("bcrypt");

const login = async (phone, telegramId, password) => {
  try {
    const user = await User.findOne({ phone, telegramId });
    if (!user) {
      return null; // User not found
    }

    const matched = await bcrypt.compare(password, user.password);
    return matched ? user : null;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

module.exports = login;
