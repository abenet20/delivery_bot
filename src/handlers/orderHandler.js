const saveOrder = require("../controllers/order");

async function orderHandler(chatId, msg, bot) {
  const data = JSON.parse(msg.web_app_data.data);
  console.log("Received data from mini app:", data);

  const productId = data.productId || data.product_id;
  const quantity = data.quantity || 1;
  const category = data.category || "food";
  const payment = data.payment || "cash";

  try {
    const savedOrder = await saveOrder(
      data.userId,
      productId,
      quantity,
      new Date(),
      "pending",
      category,
      payment,
    );
    bot.sendMessage(
      chatId,
      `Order saved successfully! Order ID: ${savedOrder._id}`,
    );
  } catch (error) {
    console.error("Error saving order:", error);
    bot.sendMessage(chatId, "Failed to save order. Please try again.");
  }
}

module.exports = orderHandler;
