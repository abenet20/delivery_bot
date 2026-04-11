require("dotenv").config();
const login = require("../controllers/login");

const webAppUrl = process.env.miniApp;

function handleLogin(chatId, msg, loginCre, bot) {
  const state = loginCre[chatId];
  if (!state) return;

  if (state.step === "phone") {
    state.phone = msg.text.trim();
    if (!state.phone) {
      bot.sendMessage(
        chatId,
        "Phone cannot be empty. Please enter your phone number:",
      );
      return;
    }
    state.step = "password";
    bot.sendMessage(chatId, "Please enter your password:");
  } else if (state.step === "password") {
    state.password = msg.text.trim();
    if (!state.password) {
      bot.sendMessage(
        chatId,
        "Password cannot be empty. Please enter your password:",
      );
      return;
    }
    const telegramId = chatId;
    const phone = state.phone;
    const password = state.password;

    login(phone, telegramId, password)
      .then((user) => {
        if (user) {
          const userData = `?userId=${user._id}&name=${encodeURIComponent(user.name)}&phone=${encodeURIComponent(user.phone)}&role=${encodeURIComponent(user.role)}`;
          bot.sendMessage(chatId, "You're successfully logged in.", {
            reply_markup: {
              inline_keyboard: [
                [{ text: "Open Menu", web_app: { url: webAppUrl + userData } }],
              ],
            },
          });
        } else {
          bot.sendMessage(
            chatId,
            "Login unsuccessful. Check your phone and password.",
          );
        }
        delete loginCre[chatId];
      })
      .catch((error) => {
        console.error("Login failed:", error);
        bot.sendMessage(chatId, "Login failed. Please try again later.");
        delete loginCre[chatId];
      });
  }
}

module.exports = handleLogin;
