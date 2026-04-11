require("dotenv").config();
const { bot } = require("../bot");
const Product = require("../models/products");

const saveProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      status,
      category,
      quantity,
      photo,
      telegramId,
    } = req.body;
    const savedProduct = await Product.create({
      name,
      description,
      price,
      status,
      category,
      quantity,
      photo,
    });
    bot.sendMessage(telegramId, "product saved successfully");
    res.status(201).json({
      success: true,
      message: "product saved successfully",
      savedProduct,
    });
  } catch (error) {
    console.log("failed", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      status,
      category,
      quantity,
      photo,
      telegramId,
    } = req.body;
    const updatedProduct = await Product.updateOne(
      { _id: req.params.id },
      req.body,
    );
    bot.sendMessage(telegramId, "product updated successfully");
    res.status(201).json({
      success: true,
      message: "product updated successfully",
      updatedProduct,
    });
  } catch (error) {
    console.log("failed", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

const removeProduct = async (req, res) => {
  try {
    const { productId, telegramId } = req.body;
    const remove = await Product.deleteOne({ _id: productId });
    bot.sendMessage(telegramId, "product removed successfully");
    res.status(201).json({
      success: true,
      message: "product removed successfully",
      remove,
    });
  } catch (error) {
    console.log("failed", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = { saveProduct, updateProduct, removeProduct };
