const TelegramBot = require('node-telegram-bot-api');

const token = "5879491791:AAEhgkFG0PMa-9wYiwB4pHEMvmSkqYUkmr0";
const ADMIN_CHAT_ID = 1786112880;
const bot = new TelegramBot(token, { polling: true });
const webAppUrl = 'https://your-mini-app-url.com'; 

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, 'Welcome to our Delivery Service!', {
    reply_markup: {
      inline_keyboard: [
        [{ text: 'Open Menu', web_app: { url: webAppUrl } }]
      ]
    }
  });
});

bot.on('message', (msg) => {
  if (msg.web_app_data) {
    const data = JSON.parse(msg.web_app_data.data);
    bot.sendMessage(msg.chat.id, `Order received! You ordered: ${data.item}`);
    
  }
});
