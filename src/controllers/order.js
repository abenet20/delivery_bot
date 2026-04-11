require("dotenv").config();
const { bot } = require("../bot");
const Order = require("../models/orders");

const saveOrder = async (req, res) => {
  try {
    const {
      userId,
      productId,
      quantity,
      date,
      status,
      category,
      payment,
      telegramId,
    } = req.body;
    const savedOrder = await Order.create({
      userId,
      productId,
      quantity,
      date,
      status,
      category,
      payment,
    });

    bot.sendMessage(telegramId, "order saved successfully");
    res
      .status(201)
      .json({ success: true, message: "order saved successfully", savedOrder });
  } catch (error) {
    console.error("saving error", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

const removeOrder = async (req, res) => {
  try {
    const { orderId, telegramId } = req.body;
    await Order.deleteOne({ _id: orderId });

    bot.sendMessage(telegramId, "order removed successfully");
    res
      .status(201)
      .json({ success: true, message: "order removed successfully" });
  } catch (error) {
    console.error("deleting error", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = { saveOrder, removeOrder };
