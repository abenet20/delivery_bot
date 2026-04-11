require("dotenv").config();
const TelegramBot = require("node-telegram-bot-api");
const handleSignup = require("./handlers/signupHandler");
const handleLogin = require("./handlers/loginHandler");
const orderHandler = require("./handlers/orderHandler");

const token = process.env.botToken;
const bot = new TelegramBot(token, { polling: true });

const runBot = async () => {
  try {
    const userState = {};
    const loginCre = {};

    bot.onText(/\/start/, (msg) => {
      bot.sendMessage(msg.chat.id, "Welcome to our Delivery Service!", {
        reply_markup: {
          inline_keyboard: [
            [{ text: "signup", callback_data: "signup" }],
            [{ text: "login", callback_data: "login" }],
          ],
        },
      });
    });

    bot.on("callback_query", (query) => {
      const chatId = query.message.chat.id;
      const data = query.data;

      if (data === "signup") {
        userState[chatId] = { step: "name" };
        bot.sendMessage(chatId, "please enter your name:");
      } else if (data === "login") {
        loginCre[chatId] = { step: "phone" };
        bot.sendMessage(
          chatId,
          "Welcome back! please enter your phone number:",
        );
      }
    });

    bot.on("message", async (msg) => {
      const chatId = msg.chat.id;

      if (userState[chatId]) {
        handleSignup(chatId, msg, userState, bot);
      } else if (loginCre[chatId]) {
        handleLogin(chatId, msg, loginCre, bot);
      } else if (msg.web_app_data) {
        let webAppData = null;
        try {
          webAppData = JSON.parse(msg.web_app_data.data);
        } catch (err) {
          console.error(
            "Failed to parse web app data:",
            err,
            msg.web_app_data.data,
          );
        }

        console.log(
          "Received web app data:",
          webAppData ?? msg.web_app_data.data,
        );

        if (webAppData && webAppData.type === "order") {
          await orderHandler(chatId, msg, bot);
        }
      }
    });

    console.log("bot is running.....");
  } catch (error) {
    console.error("unable to run the bot", error);
  }
};

module.exports = runBot;
