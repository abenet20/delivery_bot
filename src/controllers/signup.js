const user = require("../models/users");
const bcrypt = require("bcrypt");

const signup = async (name, phone, telegramId, password) => {

    const hashed = bcrypt.hash(password, 10);
 
     await user({
        name,
        phone,
        telegramId,
        hashed
     });
};

module.exports = signup;