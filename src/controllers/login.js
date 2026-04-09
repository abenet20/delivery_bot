const user = require("../models/users");
const bcrypt = require("bcrypt");

const login = async (phone, telegramId, password) => {

    const hashed = bcrypt.hash(password, 10);
 
    const data = await user.findOne({
        phone,
        telegramId,
        hashed
     });

     return data;
};

module.exports = login;