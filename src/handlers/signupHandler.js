require("dotenv").config();
const signup = require("../controllers/signup");
const generator = require("generate-password");

const webAppUrl = process.env.miniApp;

function handleSignup(chatId, msg, userState, bot) {
  const state = userState[chatId];
  if (!state) return;

  if (state.step === "name") {
    state.name = msg.text.trim();
    if (!state.name) {
      bot.sendMessage(chatId, "Name cannot be empty. Please enter your name:");
      return;
    }
    state.step = "phone";
    bot.sendMessage(chatId, "Please enter your phone:");
  } else if (state.step === "phone") {
    state.phone = msg.text.trim();
    if (!state.phone || !/^\d{10,15}$/.test(state.phone)) {
      bot.sendMessage(
        chatId,
        "Please enter a valid phone number (10-15 digits).",
      );
      return;
    }
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

    signup(name, phone, telegramId, password)
      .then((result) => {
        if (result === false) {
          bot.sendMessage(
            chatId,
            "User with this phone number already exists. Please try logging in.",
          );
        } else {
          bot.sendMessage(
            chatId,
            `${name} you're successfully registered. Use phone ${phone} and ${password} as your login credentials.`,
            {
              reply_markup: {
                inline_keyboard: [
                  [{ text: "Open Menu", web_app: { url: webAppUrl } }],
                ],
              },
            },
          );
        }
        delete userState[chatId];
      })
      .catch((error) => {
        console.error("Signup failed:", error);
        bot.sendMessage(chatId, "Registration failed. Please try again later.");
        delete userState[chatId];
      });
  }
}

module.exports = handleSignup;
