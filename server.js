const TelegramBot = require("node-telegram-bot-api");
const signup = require("./src/controllers/signup");
const login = require("./src/controllers/login");

const token = "5879491791:AAEhgkFG0PMa-9wYiwB4pHEMvmSkqYUkmr0";
const ADMIN_CHAT_ID = 1786112880;
const bot = new TelegramBot(token, { polling: true });
const webAppUrl = "https://your-mini-app-url.com";
const generator = require("generate-password");

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, "Welcome to our Delivery Service!", {
    reply_markup: {
      inline_keyboard: [
        // [{ text: 'Open Menu', web_app: { url: webAppUrl } }]
        [{ text: "signup", callback_data: "signup" }],
        [{ text: "login", callback_data: "login" }],
      ],
    },
  });
});

bot.on("callback_query", (query) => {
  const chatId = query.message.chat.id;
  const data = query.data;
  const userState = {};
  const loginCre = {};

  if (data === "signup") {
    userState[chatId] = { step: "name" };
    bot.sendMessage(chatId, "please enter your name:");

    bot.on("message", (msg) => {
      const state = userState[chatId];
      if (!state) return;
      if (state.step === "name") {
        state.name = msg.text;
        state.step = "phone";

        bot.sendMessage(chatId, "please enter your phone:");
      } else if (state.step === "phone") {
        state.phone = msg.text;

        const password = generator.generate({
          length: 8,
          numbers: true,
          symbols: false,
          uppercase: false,
          lowercase: true,
        });
        const telegramId = chatId;
        const name = state.name;
        const phone = state.phone;

        bot.sendMessage(
          chatId,
          `${state.name} you're successfully registered. usee your phone ${state.phone} and ${password} as your login credentials`,
        );
        signup(name, phone, telegramId, password);

        delete userState[chatId];
      }
    });
  } else if (data === "login") {
    loginCre[chatId] = { step: "phone" };
    bot.sendMessage(chatId, "Welcome back! please enter your phone number:");

    bot.on("message", (msg) => {
      const state = loginCre[chatId];
      if (!state) return;
      if (state.step === "phone") {
        state.phone = msg.text;
        state.step = "password";

        bot.sendMessage(chatId, "please enter your password:");
      } else if (state.step === "password") {
        state.password = msg.text;
        const telegramId = chatId;
        login(phone, telegramId, password);

        if (login) {
          bot.sendMessage(
            chatId,
            `${state.name} you're successfully logged in.`,
          );
        } else {
          bot.sendMessage(chatId, `unsuccessful`);
        }

        delete loginCre[chatId];
      }
    });
  }
});

bot.on("message", (msg) => {
  if (msg.web_app_data) {
    const data = JSON.parse(msg.web_app_data.data);
    bot.sendMessage(msg.chat.id, `Order received! You ordered: ${data.item}`);
  }
});

console.log("bot is running.....");
