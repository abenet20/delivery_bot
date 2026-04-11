const connectDB = require("./src/config/database");
const runBot = require("./src/bot");

connectDB();
runBot();
