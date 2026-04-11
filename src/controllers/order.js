const Order = require("../models/orders");

const saveOrder = async (
  userId,
  productId,
  quantity,
  date,
  status,
  category,
  payment,
) => {
  try {
    const savedOrder = await Order.create({
      userId,
      productId,
      quantity,
      date,
      status,
      category,
      payment,
    });

    return savedOrder;
  } catch (error) {
    console.error("savin error", error);
    throw error;
  }
};

module.exports = saveOrder;
